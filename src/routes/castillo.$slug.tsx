import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Youtube, MapPin, ArrowLeft, Navigation } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { CastillosCercanos } from "@/components/site/CastillosCercanos";
import { InformacionPractica } from "@/components/site/InformacionPractica";
import { FavoriteButton } from "@/components/site/FavoriteButton";
import { Lightbox } from "@/components/site/Lightbox";
import { VotacionCastillo } from "@/components/site/VotacionCastillo";
import {
  getCastilloBySlug,
  getCategoriaInfo,
  toYoutubeWatchUrl,
  esCastilloNuevo,
  getDireccionesUrl,
  type Castillo,
} from "@/data/castillos";

const MapaIndividual = lazy(() =>
  import("@/components/site/MapaIndividual").then((m) => ({ default: m.MapaIndividual })),
);

export const Route = createFileRoute("/castillo/$slug")({
  loader: ({ params }) => {
    const castillo = getCastilloBySlug(params.slug);
    if (!castillo) throw notFound();
    return { castillo };
  },
  head: ({ loaderData, params }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.castillo.nombre} — Kdronazo` },
          { name: "description", content: loaderData.castillo.descripcionBreve },
          { property: "og:title", content: `${loaderData.castillo.nombre} — Kdronazo` },
          { property: "og:description", content: loaderData.castillo.descripcionBreve },
          { property: "og:image", content: loaderData.castillo.imagen },
          { property: "twitter:image", content: loaderData.castillo.imagen },
        ]
      : [],
    links: [{ rel: "canonical", href: `https://kdronazo.com/castillo/${params.slug}` }],
  }),
  component: Page,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Castillo no encontrado</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">Volver al inicio</Link>
      </div>
    </PageShell>
  ),
  errorComponent: ({ error }) => {
    if (typeof console !== "undefined") console.error("castillo route error", error);
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h1 className="font-display text-3xl">No se pudo cargar la ficha</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ha ocurrido un error inesperado. Inténtalo de nuevo.
          </p>
        </div>
      </PageShell>
    );
  },
});

function Page() {
  const { castillo } = Route.useLoaderData() as { castillo: Castillo };
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galeria = castillo.galeria?.length ? castillo.galeria : [castillo.imagen];
  const cat = getCategoriaInfo(castillo.categoria);
  const videoUrl = toYoutubeWatchUrl(castillo.youtubeUrl);
  const nuevo = esCastilloNuevo(castillo);
  const direccionesUrl = getDireccionesUrl(castillo);

  return (
    <PageShell>
      <section className="relative isolate h-[60vh] min-h-[420px] overflow-hidden">
        <img src={castillo.imagen} alt={castillo.nombre} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/85" />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-3 select-none rounded bg-black/40 px-2 py-1 text-xs font-medium tracking-wide text-white/90 backdrop-blur-[2px]"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
        >
          © Kdronazo
        </span>
        <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
          <Link
            to="/categoria/$slug"
            params={{ slug: castillo.categoria }}
            className="mb-4 inline-flex w-fit items-center gap-1 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Volver
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: cat.color }}
            >
              {cat.emoji} {cat.label}
            </span>
            {nuevo && (
              <span className="badge-nuevo inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs">
                🆕 NUEVO
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-white/85">
              <MapPin className="h-3 w-3" /> {castillo.provincia}, {castillo.comunidad}
            </span>
          </div>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl md:text-6xl">{castillo.nombre}</h1>
          <p className="mt-3 max-w-2xl text-white/85">{castillo.descripcionBreve}</p>
        </div>
      </section>

      <p className="mx-auto max-w-6xl px-4 pt-6 text-center text-xs italic text-muted-foreground sm:px-6 sm:text-sm lg:px-8">
        📸 Fotografía original realizada por Kdronazo durante la visita al castillo.
      </p>

      {/* Acciones principales — justo debajo de la fotografía */}
      <div className="mx-auto flex max-w-6xl flex-wrap gap-3 px-4 pt-6 sm:px-6 lg:px-8">
        {videoUrl ? (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--youtube)] px-5 py-3 text-sm font-medium text-[var(--youtube-foreground)] shadow-sm transition-transform hover:scale-[1.02]"
          >
            <Youtube className="h-4 w-4" /> 📺 Ver vídeo de este castillo
          </a>
        ) : null}
        <a
          href={direccionesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:scale-[1.02]"
        >
          <Navigation className="h-4 w-4" /> 📍 Cómo llegar
        </a>
        <FavoriteButton variant="pill" slug={castillo.slug} nombre={castillo.nombre} />
      </div>
      {videoUrl && (
        <p className="mx-auto max-w-6xl px-4 pt-2 text-xs italic text-muted-foreground sm:px-6 lg:px-8">
          🎬 Vídeo grabado y producido por Kdronazo.
        </p>
      )}

      <article className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_280px] lg:px-8">
        <div className="space-y-12">
          <Section title="Historia">
            <p className="text-base leading-relaxed text-foreground/85">{castillo.historia}</p>
          </Section>

          <Section title="Cronología">
            <ol className="relative border-l-2 border-primary/30 pl-6">
              {castillo.cronologia.map((e) => (
                <li key={e.anio} className="mb-6 last:mb-0">
                  <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-primary" />
                  <div className="font-display text-lg text-primary">{e.anio}</div>
                  <div className="text-sm text-foreground/85">{e.evento}</div>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Curiosidades">
            <ul className="space-y-2">
              {castillo.curiosidades.map((c, i) => (
                <li key={i} className="flex gap-2 text-foreground/85">
                  <span className="text-accent">◆</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Section>

          {!videoUrl && (
            <Section title="Vídeo del Castillo">
              <div className="overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-card to-secondary/40 p-6 sm:p-8">
                <div className="flex flex-col items-start gap-4">
                  <span
                    aria-hidden
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--youtube)]/10 text-2xl"
                  >
                    🎬
                  </span>
                  <h3 className="font-display text-xl text-foreground sm:text-2xl">
                    Vídeo en preparación
                  </h3>
                  <div className="space-y-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
                    <p>
                      Actualmente estoy trabajando en el documental de este castillo
                      para el canal de YouTube Kdronazo.
                    </p>
                    <p>
                      Mientras tanto, puedes explorar la información histórica y las
                      fotografías de esta ficha.
                    </p>
                    <p>Suscríbete al canal para no perderte el estreno.</p>
                  </div>
                  <a
                    href="https://www.youtube.com/@Kdronazo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 rounded-md bg-[var(--youtube)] px-5 py-3 text-sm font-medium text-[var(--youtube-foreground)] shadow-sm transition-transform hover:scale-[1.02]"
                  >
                    <Youtube className="h-4 w-4" /> Ver canal de YouTube
                  </a>
                </div>
              </div>
            </Section>
          )}

          <Section title="Galería fotográfica">
            <div className="grid gap-4 sm:grid-cols-2">
              {galeria.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className="group relative block aspect-[16/10] overflow-hidden rounded-lg border border-border/70"
                  aria-label={`Ampliar imagen ${i + 1} de ${castillo.nombre}`}
                >
                  <img src={src} alt={`${castillo.nombre} ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-1.5 right-2 select-none rounded bg-black/30 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-white/90 backdrop-blur-[2px]"
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
                  >
                    © Kdronazo
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs italic text-muted-foreground">
              Pulsa cualquier fotografía para ampliarla. Usa las flechas o desliza para navegar.
            </p>
          </Section>

          <Section title="Localización">
            <div className="aspect-video overflow-hidden rounded-lg border border-border/70">
              <Suspense fallback={<div className="h-full w-full animate-pulse bg-secondary" />}>
                <MapaIndividual castillo={castillo} />
              </Suspense>
            </div>
            <a
              href={`https://www.google.com/maps?q=${castillo.coordenadas[0]},${castillo.coordenadas[1]}&z=15`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-primary hover:underline"
            >
              Ver en mapa ampliado →
            </a>
          </Section>

          <Section title="¿Has visitado este castillo?">
            <VotacionCastillo slug={castillo.slug} />
          </Section>

          <InformacionPractica castillo={castillo} />

          <CastillosCercanos castillo={castillo} />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border/70 bg-card p-5">
            <h3 className="font-display text-lg">Estado de conservación</h3>
            <p className="mt-2 flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: cat.color }}
              >
                {cat.emoji} {cat.label}
              </span>
            </p>
            <p className="mt-2 text-xs italic text-muted-foreground">{cat.descripcion}</p>
            <p className="mt-3 text-sm text-foreground/85">{castillo.estadoDescripcion}</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card p-5">
            <h3 className="font-display text-lg">Ubicación</h3>
            <p className="mt-2 text-sm text-foreground/85">{castillo.provincia}</p>
            <p className="text-xs text-muted-foreground">{castillo.comunidad}</p>
            <a
              href={direccionesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              <Navigation className="h-4 w-4" /> 📍 Cómo llegar
            </a>
          </div>
          {videoUrl && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[var(--youtube)] px-4 py-3 text-sm font-medium text-[var(--youtube-foreground)]"
            >
              <Youtube className="h-4 w-4" /> 📺 Ver vídeo de este castillo
            </a>
          )}
        </aside>
      </article>

      {lightboxIndex !== null && (
        <Lightbox
          images={galeria}
          initialIndex={lightboxIndex}
          alt={castillo.nombre}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl text-foreground sm:text-3xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}