import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { CASTILLOS } from "@/data/castillos";
import { fetchRanking, fetchVotosTodos, type RankingRow, type VotosCounts } from "@/lib/visitas-stats";
import { calcularTendencia, slugifyRegion } from "@/lib/visit-utils";
import { Trophy, TrendingUp, MapPin } from "lucide-react";

export const Route = createFileRoute("/ranking-castillos")({
  head: () => ({
    meta: [
      { title: "Ranking de castillos más visitados de España — Kdronazo" },
      {
        name: "description",
        content:
          "Descubre los castillos más visitados, los más deseados y los que más crecen en interés en Kdronazo. Rankings por comunidad y provincia.",
      },
      { property: "og:title", content: "Ranking de castillos más visitados — Kdronazo" },
      {
        property: "og:description",
        content:
          "Castillos más populares, más deseados y de mayor crecimiento, según los datos reales de las visitas en Kdronazo.",
      },
    ],
    links: [{ rel: "canonical", href: "https://kdronazo.com/ranking-castillos" }],
  }),
  component: RankingPage,
});

function RankingPage() {
  const [ranking, setRanking] = useState<RankingRow[]>([]);
  const [votos, setVotos] = useState<Map<string, VotosCounts>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    Promise.all([fetchRanking(), fetchVotosTodos()]).then(([r, v]) => {
      if (!alive) return;
      setRanking(r);
      setVotos(v);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  const enriched = useMemo(() => {
    const byCast = new Map(ranking.map((r) => [r.castillo_slug, r]));
    return CASTILLOS.map((c) => {
      const r = byCast.get(c.slug);
      const total = r?.total ?? 0;
      const ult30 = r?.ult30 ?? 0;
      const prev30 = r?.prev30 ?? 0;
      const v = votos.get(c.slug) || { visitado: 0, pendiente: 0 };
      return {
        castillo: c,
        total,
        ult30,
        unicos: r?.unicos ?? 0,
        crecimiento: ult30 - prev30,
        tendencia: calcularTendencia(ult30, prev30),
        visitado: v.visitado,
        pendiente: v.pendiente,
      };
    });
  }, [ranking, votos]);

  const topVisitados = [...enriched].sort((a, b) => b.total - a.total).slice(0, 20);
  const topCrecimiento = [...enriched].sort((a, b) => b.crecimiento - a.crecimiento).slice(0, 10);
  const topDeseados = [...enriched].sort((a, b) => b.pendiente - a.pendiente).slice(0, 10);
  const topVisitadosUsuarios = [...enriched].sort((a, b) => b.visitado - a.visitado).slice(0, 10);

  const comunidades = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of enriched) {
      map.set(e.castillo.comunidad, (map.get(e.castillo.comunidad) || 0) + e.total);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [enriched]);

  const provincias = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of enriched) {
      map.set(e.castillo.provincia, (map.get(e.castillo.provincia) || 0) + e.total);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [enriched]);

  return (
    <PageShell>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Estadísticas Kdronazo</p>
          <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">
            🏆 Ranking de castillos más visitados
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Los rankings se calculan en tiempo real con las visitas anónimas a cada ficha y los votos de la comunidad.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <RankingBlock
          title="Top 20 nacional — Más visitados"
          icon={<Trophy className="h-5 w-5 text-amber-500" />}
          rows={topVisitados.map((e) => ({
            slug: e.castillo.slug,
            nombre: e.castillo.nombre,
            sub: `${e.castillo.provincia} · ${e.castillo.comunidad}`,
            valor: e.total.toLocaleString("es-ES"),
            valorLabel: "visitas",
          }))}
          loading={loading}
        />
        <RankingBlock
          title="Mayor crecimiento (últimos 30 días)"
          icon={<TrendingUp className="h-5 w-5 text-emerald-600" />}
          rows={topCrecimiento.map((e) => ({
            slug: e.castillo.slug,
            nombre: e.castillo.nombre,
            sub: `${e.castillo.provincia}`,
            valor: e.tendencia.etiqueta,
            valorLabel: `${e.ult30} visitas (30d)`,
          }))}
          loading={loading}
        />
        <RankingBlock
          title="Más deseados (pendientes)"
          icon={<MapPin className="h-5 w-5 text-blue-600" />}
          rows={topDeseados.map((e) => ({
            slug: e.castillo.slug,
            nombre: e.castillo.nombre,
            sub: `${e.castillo.provincia}`,
            valor: e.pendiente.toLocaleString("es-ES"),
            valorLabel: "lo tienen pendiente",
          }))}
          loading={loading}
        />
        <RankingBlock
          title="Más visitados por los usuarios"
          icon={<Trophy className="h-5 w-5 text-rose-500" />}
          rows={topVisitadosUsuarios.map((e) => ({
            slug: e.castillo.slug,
            nombre: e.castillo.nombre,
            sub: `${e.castillo.provincia}`,
            valor: e.visitado.toLocaleString("es-ES"),
            valorLabel: "lo han visitado",
          }))}
          loading={loading}
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl text-foreground sm:text-3xl">Por comunidad autónoma</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {comunidades.map(([nombre, total]) => (
            <Link
              key={nombre}
              to="/ranking/$slug"
              params={{ slug: slugifyRegion(nombre) }}
              className="flex items-center justify-between rounded-lg border border-border/70 bg-card px-4 py-3 text-sm hover:bg-secondary"
            >
              <span>{nombre}</span>
              <span className="text-muted-foreground">{total.toLocaleString("es-ES")} visitas →</span>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl text-foreground sm:text-3xl">Por provincia</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {provincias.map(([nombre, total]) => (
            <Link
              key={nombre}
              to="/ranking/$slug"
              params={{ slug: slugifyRegion(nombre) }}
              className="flex items-center justify-between rounded-lg border border-border/70 bg-card px-4 py-3 text-sm hover:bg-secondary"
            >
              <span>{nombre}</span>
              <span className="text-muted-foreground">{total.toLocaleString("es-ES")} visitas →</span>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function RankingBlock({
  title,
  icon,
  rows,
  loading,
}: {
  title: string;
  icon: React.ReactNode;
  rows: { slug: string; nombre: string; sub: string; valor: string; valorLabel: string }[];
  loading: boolean;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-5">
      <h3 className="flex items-center gap-2 font-display text-xl">
        {icon} {title}
      </h3>
      {loading ? (
        <p className="mt-4 text-sm text-muted-foreground">Cargando datos…</p>
      ) : (
        <ol className="mt-4 space-y-2">
          {rows.map((r, i) => (
            <li key={r.slug}>
              <Link
                to="/castillo/$slug"
                params={{ slug: r.slug }}
                className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-secondary"
              >
                <span className="w-7 text-right font-display text-base text-muted-foreground">{i + 1}.</span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-foreground">{r.nombre}</span>
                  <span className="block text-xs text-muted-foreground">{r.sub}</span>
                </span>
                <span className="text-right">
                  <span className="block text-sm font-semibold">{r.valor}</span>
                  <span className="block text-[10px] uppercase tracking-wide text-muted-foreground">{r.valorLabel}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}