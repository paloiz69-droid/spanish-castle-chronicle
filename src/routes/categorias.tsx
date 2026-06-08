import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { CATEGORIAS, countByCategoria } from "@/data/castillos";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Categorías de Castillos — Kdronazo" },
      { name: "description", content: "Clasificación de castillos de España por estado de conservación: conservado, consolidado, semirruina, ruina avanzada y ruina arqueológica." },
      { property: "og:title", content: "Categorías de Castillos — Kdronazo" },
      { property: "og:description", content: "Explora los castillos de España por su nivel real de conservación." },
    ],
    links: [{ rel: "canonical", href: "https://kdronazo.com/categorias" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Clasificación</p>
          <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">🏛️ Categorías por estado de conservación</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Cada castillo se clasifica según su nivel real de conservación, desde fortalezas habitables hasta ruinas arqueológicas.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        {CATEGORIAS.map((c) => (
          <Link
            key={c.slug}
            to="/categoria/$slug"
            params={{ slug: c.slug }}
            className="group rounded-xl border border-border/70 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-lg text-white"
                style={{ backgroundColor: c.color }}
              >
                {c.emoji}
              </span>
              <h2 className="font-display text-2xl text-foreground">{c.label}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">{c.descripcion}</p>
            <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
              {countByCategoria(c.slug)} castillos · Ver categoría →
            </p>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}