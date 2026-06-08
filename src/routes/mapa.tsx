import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { PageShell } from "@/components/site/PageShell";

const MapaCastillos = lazy(() =>
  import("@/components/site/MapaCastillos").then((m) => ({ default: m.MapaCastillos })),
);

export const Route = createFileRoute("/mapa")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mapa Interactivo de Castillos — Kdronazo" },
      { name: "description", content: "Mapa interactivo con la ubicación de todos los castillos catalogados en Kdronazo." },
      { property: "og:title", content: "Mapa Interactivo — Kdronazo" },
      { property: "og:description", content: "Explora los castillos de España sobre un mapa interactivo." },
    ],
    links: [{ rel: "canonical", href: "https://kdronazo.com/mapa" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Explora</p>
          <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">🗺️ Mapa Interactivo</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Pulsa sobre cada marcador para descubrir el castillo, su provincia y acceder a la ficha completa.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-[70vh] animate-pulse rounded-xl bg-secondary" />}>
          <MapaCastillos />
        </Suspense>
      </section>
    </PageShell>
  );
}