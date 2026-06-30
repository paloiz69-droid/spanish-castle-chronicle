import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { CASTILLOS, type Castillo } from "@/data/castillos";
import { fetchRanking, type RankingRow } from "@/lib/visitas-stats";
import { slugifyRegion } from "@/lib/visit-utils";

type RegionInfo = {
  tipo: "comunidad" | "provincia";
  nombre: string;
  castillos: Castillo[];
};

function findRegion(slug: string): RegionInfo | null {
  for (const c of CASTILLOS) {
    if (slugifyRegion(c.comunidad) === slug) {
      return {
        tipo: "comunidad",
        nombre: c.comunidad,
        castillos: CASTILLOS.filter((x) => x.comunidad === c.comunidad),
      };
    }
  }
  for (const c of CASTILLOS) {
    if (slugifyRegion(c.provincia) === slug) {
      return {
        tipo: "provincia",
        nombre: c.provincia,
        castillos: CASTILLOS.filter((x) => x.provincia === c.provincia),
      };
    }
  }
  return null;
}

export const Route = createFileRoute("/ranking/$slug")({
  loader: ({ params }) => {
    const region = findRegion(params.slug);
    if (!region) throw notFound();
    return { region };
  },
  head: ({ loaderData, params }) => ({
    meta: loaderData
      ? [
          {
            title: `Castillos más visitados de ${loaderData.region.nombre} — Kdronazo`,
          },
          {
            name: "description",
            content: `Ranking actualizado de los castillos más visitados y deseados de ${loaderData.region.nombre} en Kdronazo.`,
          },
          {
            property: "og:title",
            content: `Ranking — Castillos de ${loaderData.region.nombre}`,
          },
          {
            property: "og:description",
            content: `Los castillos de ${loaderData.region.nombre} ordenados por visitas reales a sus fichas en Kdronazo.`,
          },
        ]
      : [],
    links: [{ rel: "canonical", href: `https://kdronazo.com/ranking/${params.slug}` }],
  }),
  component: Page,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Región no encontrada</h1>
        <Link to="/ranking-castillos" className="mt-4 inline-block text-primary hover:underline">
          Volver al ranking general
        </Link>
      </div>
    </PageShell>
  ),
});

function Page() {
  const { region } = Route.useLoaderData() as { region: RegionInfo };
  const [ranking, setRanking] = useState<RankingRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchRanking().then((r) => {
      if (!alive) return;
      setRanking(r);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  const filas = useMemo(() => {
    const byCast = new Map(ranking.map((r) => [r.castillo_slug, r]));
    return region.castillos
      .map((c) => ({
        castillo: c,
        total: byCast.get(c.slug)?.total ?? 0,
        ult30: byCast.get(c.slug)?.ult30 ?? 0,
      }))
      .sort((a, b) => b.total - a.total);
  }, [region, ranking]);

  return (
    <PageShell>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {region.tipo === "comunidad" ? "Comunidad autónoma" : "Provincia"}
          </p>
          <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">
            🏆 Castillos más visitados de {region.nombre}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {region.castillos.length} castillos · Datos actualizados en tiempo real.
          </p>
          <Link
            to="/ranking-castillos"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            ← Ranking nacional
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {loading ? (
          <p className="text-sm text-muted-foreground">Cargando datos…</p>
        ) : (
          <ol className="space-y-2">
            {filas.map((f, i) => (
              <li key={f.castillo.slug}>
                <Link
                  to="/castillo/$slug"
                  params={{ slug: f.castillo.slug }}
                  className="flex items-center gap-3 rounded-md border border-border/70 bg-card px-3 py-3 hover:bg-secondary"
                >
                  <span className="w-8 text-right font-display text-lg text-muted-foreground">
                    {i + 1}.
                  </span>
                  <img
                    src={f.castillo.imagen}
                    alt=""
                    className="h-12 w-12 rounded object-cover"
                    loading="lazy"
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-foreground">
                      {f.castillo.nombre}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {f.castillo.provincia}
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block text-sm font-semibold">
                      {f.total.toLocaleString("es-ES")}
                    </span>
                    <span className="block text-[10px] uppercase tracking-wide text-muted-foreground">
                      visitas
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>
    </PageShell>
  );
}