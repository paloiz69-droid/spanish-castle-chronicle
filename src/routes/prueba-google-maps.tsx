import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Info } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { castillos } from "@/data/castillos";
import { MAPS_PLACE_TRIAL_URL } from "@/lib/maps-place-trial";

export const Route = createFileRoute("/prueba-google-maps")({
  head: () => ({
    meta: [
      { title: "Prueba de apertura de La Coracera en Google Maps — Kdronazo" },
      { name: "description", content: "Prueba controlada para abrir la ficha del Castillo de La Coracera en Google Maps, independiente del recorrido planificado en Kdronazo." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Prueba de La Coracera en Google Maps — Kdronazo" },
      { property: "og:description", content: "Prueba de apertura de la ficha del castillo sin modificar el planificador de Kdronazo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MapsPlaceTrial,
});

function MapsPlaceTrial() {
  const castillo = castillos.find((item) => item.slug === "castillo-de-la-coracera");

  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
        <p className="mb-3 text-sm font-semibold text-muted-foreground">Prueba · Google Maps</p>
        <h1 className="font-display text-4xl text-foreground">Castillo de La Coracera</h1>
        <p className="mt-3 text-muted-foreground">San Martín de Valdeiglesias · Madrid</p>
        {castillo && (
          <img src={castillo.imagen} alt="Castillo de La Coracera" className="mt-6 aspect-video w-full rounded-md object-cover" />
        )}
        <Button asChild size="lg" className="mt-6 min-h-12 w-full whitespace-normal px-4 text-base font-semibold">
          <a href={MAPS_PLACE_TRIAL_URL}>
            <ExternalLink aria-hidden="true" />
            Abrir ficha de La Coracera en Google Maps
          </a>
        </Button>
        <div className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p>Este enlace busca la ficha del castillo, no el recorrido planificado. No transmite tu origen manual de Kdronazo. Al pulsar «Cómo llegar» o «Iniciar», Google Maps puede utilizar tu ubicación actual.</p>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Comprueba en tu Samsung si se abre la ficha sin la pantalla intermedia «Vista previa». La apertura en la aplicación y los controles disponibles dependen de Google Maps y del teléfono.</p>
      </section>
    </PageShell>
  );
}