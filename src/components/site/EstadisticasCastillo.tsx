import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, Minus, Trophy, ThumbsUp, MapPin, Sparkles, Star, Flame, Castle, Gem } from "lucide-react";
import { fetchStatsCastillo, fetchRanking, fetchVotosCastillo, type CastilloStats, type VotosCounts, type RankingRow } from "@/lib/visitas-stats";

const UMBRAL_RANKING_PUBLICO = 100;

type TendenciaPublica = "crecimiento" | "estable" | "menor";

function tendenciaPublica(ult30: number, prev30: number): TendenciaPublica {
  if (prev30 === 0 && ult30 === 0) return "estable";
  if (prev30 === 0 && ult30 > 0) return "crecimiento";
  const diff = ult30 - prev30;
  const ratio = diff / Math.max(prev30, 1);
  if (ratio >= 0.1) return "crecimiento";
  if (ratio <= -0.1) return "menor";
  return "estable";
}

type NivelPopularidad = {
  clave: "muy_popular" | "muy_consultado" | "crecimiento" | "descubrimiento" | "tesoro";
  emoji: string;
  etiqueta: string;
  Icono: React.ComponentType<{ className?: string }>;
  color: string;
};

function calcularNivel(params: {
  rank: number;
  total: number;
  tendencia: TendenciaPublica;
  totalVisitas: number;
}): NivelPopularidad {
  const { rank, total, tendencia, totalVisitas } = params;
  const percentil = total > 0 ? rank / total : 1; // 0 = mejor
  if (percentil <= 0.1 && totalVisitas > 0) {
    return { clave: "muy_popular", emoji: "⭐", etiqueta: "Muy popular", Icono: Star, color: "text-amber-500" };
  }
  if (percentil <= 0.25 && totalVisitas > 0) {
    return { clave: "muy_consultado", emoji: "🔥", etiqueta: "Muy consultado", Icono: Flame, color: "text-orange-500" };
  }
  if (tendencia === "crecimiento") {
    return { clave: "crecimiento", emoji: "📈", etiqueta: "En crecimiento", Icono: TrendingUp, color: "text-emerald-600" };
  }
  if (percentil <= 0.6) {
    return { clave: "descubrimiento", emoji: "🏰", etiqueta: "Descubrimiento recomendado", Icono: Castle, color: "text-sky-600" };
  }
  return { clave: "tesoro", emoji: "💎", etiqueta: "Tesoro oculto", Icono: Gem, color: "text-violet-600" };
}

export function EstadisticasCastillo({ slug }: { slug: string }) {
  const [stats, setStats] = useState<CastilloStats | null>(null);
  const [votos, setVotos] = useState<VotosCounts | null>(null);
  const [ranking, setRanking] = useState<RankingRow[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      const [s, v, r] = await Promise.all([
        fetchStatsCastillo(slug),
        fetchVotosCastillo(slug),
        fetchRanking(),
      ]);
      if (cancelado) return;
      setStats(s);
      setVotos(v);
      setRanking(r);
      setLoading(false);
    })();
    return () => {
      cancelado = true;
    };
  }, [slug]);

  const ordenado = ranking ? [...ranking].sort((a, b) => b.total - a.total) : [];
  const totalCatalogo = ordenado.length;
  const idx = ordenado.findIndex((r) => r.castillo_slug === slug);
  const rank = idx === -1 ? totalCatalogo + 1 : idx + 1;
  const mostrarRanking = totalCatalogo >= UMBRAL_RANKING_PUBLICO;

  const tend = stats ? tendenciaPublica(stats.ult30, stats.prev30) : "estable";
  const nivel = calcularNivel({
    rank,
    total: totalCatalogo,
    tendencia: tend,
    totalVisitas: stats?.total ?? 0,
  });

  const tendLabel =
    tend === "crecimiento" ? "En crecimiento" : tend === "menor" ? "Menor actividad" : "Estable";
  const TendIcono = tend === "crecimiento" ? TrendingUp : tend === "menor" ? TrendingDown : Minus;
  const tendColor =
    tend === "crecimiento" ? "text-emerald-600" : tend === "menor" ? "text-rose-600" : "text-muted-foreground";

  const NivelIcono = nivel.Icono;

  return (
    <section>
      <h2 className="font-display text-2xl text-foreground sm:text-3xl">
        🏅 Popularidad del castillo
      </h2>

      <div className="mt-4 rounded-xl border border-border/70 bg-card p-5">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden>{nivel.emoji}</span>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Nivel</div>
            <div className={`font-display text-2xl ${nivel.color}`}>
              {loading ? "…" : nivel.etiqueta}
            </div>
          </div>
          <NivelIcono className={`ml-auto h-8 w-8 ${nivel.color}`} aria-hidden />
        </div>
        {mostrarRanking && !loading ? (
          <div className="mt-3 flex items-center gap-2 text-sm text-foreground/80">
            <Trophy className="h-4 w-4 text-amber-500" />
            🏆 Puesto {rank} de {totalCatalogo} castillos
          </div>
        ) : null}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <StatCard
          icon={<ThumbsUp className="h-5 w-5" />}
          label="Lo han visitado"
          value={loading ? "…" : (votos?.visitado ?? 0).toLocaleString("es-ES")}
          hint="Personas que indican haber estado allí"
        />
        <StatCard
          icon={<MapPin className="h-5 w-5" />}
          label="Lo tienen pendiente"
          value={loading ? "…" : (votos?.pendiente ?? 0).toLocaleString("es-ES")}
          hint="Personas que desean visitarlo"
        />
        <StatCard
          icon={<TendIcono className="h-5 w-5" />}
          label="Tendencia de popularidad"
          value={loading ? "…" : tendLabel}
          hint="Evolución reciente del interés"
          accent={tendColor}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs italic text-muted-foreground">
          Datos anónimos y agregados. Sin métricas de tráfico (RGPD).
        </p>
        <Link
          to="/ranking-castillos"
          className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-card px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:bg-secondary/60"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Descubrir más castillos
        </Link>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
        <span className="text-foreground/70">{icon}</span>
        {label}
      </div>
      <div className={`mt-2 font-display text-2xl ${accent ?? "text-foreground"}`}>{value}</div>
      {hint ? <div className="mt-1 text-xs text-muted-foreground">{hint}</div> : null}
    </div>
  );
}
