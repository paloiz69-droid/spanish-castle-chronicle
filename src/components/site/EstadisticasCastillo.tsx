import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, TrendingUp, TrendingDown, Minus, Trophy, ThumbsUp, MapPin, Sparkles } from "lucide-react";
import { fetchStatsCastillo, fetchRanking, fetchVotosCastillo, type CastilloStats, type VotosCounts } from "@/lib/visitas-stats";
import { calcularTendencia } from "@/lib/visit-utils";

export function EstadisticasCastillo({ slug }: { slug: string }) {
  const [stats, setStats] = useState<CastilloStats | null>(null);
  const [votos, setVotos] = useState<VotosCounts | null>(null);
  const [posicion, setPosicion] = useState<{ rank: number; total: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      const [s, v, ranking] = await Promise.all([
        fetchStatsCastillo(slug),
        fetchVotosCastillo(slug),
        fetchRanking(),
      ]);
      if (cancelado) return;
      setStats(s);
      setVotos(v);
      const ordenado = [...ranking].sort((a, b) => b.total - a.total);
      const idx = ordenado.findIndex((r) => r.castillo_slug === slug);
      setPosicion({
        rank: idx === -1 ? ordenado.length + 1 : idx + 1,
        total: Math.max(ordenado.length, 1),
      });
      setLoading(false);
    })();
    return () => {
      cancelado = true;
    };
  }, [slug]);

  const tendencia = stats ? calcularTendencia(stats.ult30, stats.prev30) : null;
  const TIcon =
    tendencia?.tipo === "sube"
      ? TrendingUp
      : tendencia?.tipo === "baja"
        ? TrendingDown
        : tendencia?.tipo === "nuevo"
          ? Sparkles
          : Minus;

  return (
    <section>
      <h2 className="font-display text-2xl text-foreground sm:text-3xl">
        📊 Estadísticas del castillo
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<Eye className="h-5 w-5" />}
          label="Visitas totales a la ficha"
          value={loading ? "…" : (stats?.total ?? 0).toLocaleString("es-ES")}
          hint={loading ? "" : `${stats?.unicos ?? 0} visitantes únicos`}
        />
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
          icon={<Trophy className="h-5 w-5" />}
          label="Ranking nacional"
          value={loading || !posicion ? "…" : `#${posicion.rank}`}
          hint={loading || !posicion ? "" : `de ${posicion.total} castillos`}
        />
        <StatCard
          icon={<TIcon className="h-5 w-5" />}
          label="Tendencia (30 días)"
          value={loading || !tendencia ? "…" : tendencia.etiqueta}
          hint={
            loading
              ? ""
              : `Últimos 30 días: ${stats?.ult30 ?? 0} · 30 anteriores: ${stats?.prev30 ?? 0}`
          }
          accent={
            tendencia?.tipo === "sube"
              ? "text-emerald-600"
              : tendencia?.tipo === "baja"
                ? "text-rose-600"
                : tendencia?.tipo === "nuevo"
                  ? "text-blue-600"
                  : undefined
          }
        />
        <Link
          to="/ranking-castillos"
          className="flex items-center justify-between rounded-xl border border-border/70 bg-card p-4 text-sm transition-colors hover:bg-secondary/60"
        >
          <span className="flex items-center gap-2 text-foreground/80">
            <Trophy className="h-5 w-5 text-amber-500" /> Ver ranking completo
          </span>
          <span aria-hidden>→</span>
        </Link>
      </div>
      <p className="mt-3 text-xs italic text-muted-foreground">
        Estadísticas anónimas: contamos visitas a la ficha sin almacenar datos personales (cumplimos RGPD).
      </p>
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