import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { CastilloCard } from "@/components/site/CastilloCard";
import { getCastillosEnRuinas } from "@/data/castillos";

export const Route = createFileRoute("/ruinas")({
  head: () => ({
    meta: [
      { title: "Castillos en Ruinas — Kdronazo" },
      { name: "description", content: "Castillos en ruinas de España: fortalezas que el tiempo y la historia transformaron en memoria de piedra." },
      { property: "og:title", content: "Castillos en Ruinas — Kdronazo" },
      { property: "og:description", content: "Fortalezas españolas en estado de ruina, vigías silenciosos del paisaje." },
    ],
  }),
  component: Page,
});

function Page() {
  const castillos = getCastillosEnRuinas();
  return (
    <PageShell>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Categoría</p>
          <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">🏚️ Castillos en Ruinas</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Fortalezas que el paso del tiempo ha convertido en testigos silenciosos del paisaje. Memoria, piedra y leyenda.
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