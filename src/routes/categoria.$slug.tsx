import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { CastilloCard } from "@/components/site/CastilloCard";
import {
  CATEGORIAS,
  getCastillosByCategoria,
  getCategoriaInfo,
  type Castillo,
  type CategoriaCastillo,
  type CategoriaInfo,
} from "@/data/castillos";

const VALID = new Set(CATEGORIAS.map((c) => c.slug));

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    if (!VALID.has(params.slug as CategoriaCastillo)) throw notFound();
    const cat = getCategoriaInfo(params.slug as CategoriaCastillo);
    const castillos = getCastillosByCategoria(cat.slug);
    return { cat, castillos };
  },
  head: ({ loaderData, params }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cat.emoji} ${loaderData.cat.label} — Castillos · Kdronazo` },
          { name: "description", content: `${loaderData.cat.label}: ${loaderData.cat.descripcion}` },
          { property: "og:title", content: `${loaderData.cat.emoji} ${loaderData.cat.label} — Kdronazo` },
          { property: "og:description", content: loaderData.cat.descripcion },
        ]
      : [],
    links: [{ rel: "canonical", href: `https://www.kdronazo.com/categoria/${params.slug}` }],
  }),
  component: Page,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Categoría no encontrada</h1>
        <Link to="/categorias" className="mt-4 inline-block text-primary hover:underline">Ver todas las categorías</Link>
      </div>
    </PageShell>
  ),
});

function Page() {
  const { cat, castillos } = Route.useLoaderData() as {
    cat: CategoriaInfo;
    castillos: Castillo[];
  };
  return (
    <PageShell>
      <section className="border-b border-border/60" style={{ backgroundColor: `${cat.color}15` }}>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Estado de conservación</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-white"
              style={{ backgroundColor: cat.color }}
            >
              {cat.emoji} {cat.label}
            </span>
            <span className="text-sm text-muted-foreground">{castillos.length} castillos</span>
          </div>
          <h1 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">{cat.label}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{cat.descripcion}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {castillos.length === 0 ? (
          <p className="text-center text-muted-foreground">No hay castillos en esta categoría todavía.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {castillos.map((c) => <CastilloCard key={c.slug} castillo={c} />)}
          </div>
        )}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {CATEGORIAS.filter((c) => c.slug !== cat.slug).map((c) => (
            <Link
              key={c.slug}
              to="/categoria/$slug"
              params={{ slug: c.slug }}
              className="rounded-full border border-border/70 bg-card px-4 py-2 text-xs font-medium text-foreground/80 hover:bg-secondary"
            >
              {c.emoji} {c.label}
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}