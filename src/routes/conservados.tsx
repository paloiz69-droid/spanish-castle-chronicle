import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { CastilloCard } from "@/components/site/CastilloCard";
import { getCastillosConservados } from "@/data/castillos";

export const Route = createFileRoute("/conservados")({
  head: () => ({
    meta: [
      { title: "Castillos Conservados — Kdronazo" },
      { name: "description", content: "Catálogo de castillos conservados de España con fotografía aérea, historia y fichas completas." },
      { property: "og:title", content: "Castillos Conservados — Kdronazo" },
      { property: "og:description", content: "Fortalezas españolas en pie, visitables y restauradas." },
    ],
  }),
  component: Page,
});

function Page() {
  const castillos = getCastillosConservados();
  return (
    <PageShell>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Categoría</p>
          <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">🏰 Castillos Conservados</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Fortalezas que conservan su estructura original o han sido restauradas. Visitables, habitadas o reconvertidas en museos vivos del patrimonio español.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {castillos.map((c) => <CastilloCard key={c.slug} castillo={c} />)}
        </div>
      </section>
    </PageShell>
  );
}