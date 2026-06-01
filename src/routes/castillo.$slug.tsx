import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Youtube, MapPin, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { getCastilloBySlug, YOUTUBE_URL } from "@/data/castillos";

export const Route = createFileRoute("/castillo/$slug")({
  loader: ({ params }) => {
    const castillo = getCastilloBySlug(params.slug);
    if (!castillo) throw notFound();
    return { castillo };
  },
  head: ({ loaderData }) => ({
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
  errorComponent: ({ error }) => (
    <PageShell>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">No se pudo cargar la ficha</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </PageShell>
  ),
});

function Page() {
  const { castillo } = Route.useLoaderData();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const galeria = castillo.galeria?.length ? castillo.galeria : [castillo.imagen];
  const badge = castillo.estado === "ruinas" ? "🏚️ En Ruinas" : "🏰 Conservado";
  const backTo = castillo.estado === "ruinas" ? "/ruinas" : "/conservados";

  return (
    <PageShell>
      <section className="relative isolate h-[60vh] min-h-[420px] overflow-hidden">
        <img src={castillo.imagen} alt={castillo.nombre} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/85" />
        <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
          <Link to={backTo} className="mb-4 inline-flex w-fit items-center gap-1 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Volver
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">{badge}</span>
            <span className="inline-flex items-center gap-1 text-xs text-white/85">
              <MapPin className="h-3 w-3" /> {castillo.provincia}, {castillo.comunidad}
            </span>
          </div>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl md:text-6xl">{castillo.nombre}</h1>
          <p className="mt-3 max-w-2xl text-white/85">{castillo.descripcionBreve}</p>
        </div>
      </section>

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

          <Section title="Galería fotográfica">
            <div className="grid gap-4 sm:grid-cols-2">
              {galeria.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(src)}
                  className="group block aspect-[16/10] overflow-hidden rounded-lg border border-border/70"
                >
                  <img src={src} alt={`${castillo.nombre} ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </button>
              ))}
            </div>
          </Section>

          <Section title="Vídeo del canal">
            {castillo.youtubeId ? (
              <div className="aspect-video overflow-hidden rounded-lg border border-border/70">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${castillo.youtubeId}`}
                  title={`${castillo.nombre} — Kdronazo`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border bg-secondary/40 p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Próximamente publicaremos el vídeo aéreo de este castillo en el canal.
                </p>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-md bg-[var(--youtube)] px-4 py-2 text-sm font-medium text-[var(--youtube-foreground)]"
                >
                  <Youtube className="h-4 w-4" /> Ver Canal Kdronazo
                </a>
              </div>
            )}
          </Section>

          <Section title="Localización">
            <div className="aspect-video overflow-hidden rounded-lg border border-border/70">
              <iframe
                className="h-full w-full"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${castillo.coordenadas[1] - 0.05}%2C${castillo.coordenadas[0] - 0.03}%2C${castillo.coordenadas[1] + 0.05}%2C${castillo.coordenadas[0] + 0.03}&layer=mapnik&marker=${castillo.coordenadas[0]}%2C${castillo.coordenadas[1]}`}
                title={`Mapa de ${castillo.nombre}`}
              />
            </div>
            <a
              href={`https://www.openstreetmap.org/?mlat=${castillo.coordenadas[0]}&mlon=${castillo.coordenadas[1]}#map=14/${castillo.coordenadas[0]}/${castillo.coordenadas[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-primary hover:underline"
            >
              Ver en mapa ampliado →
            </a>
          </Section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border/70 bg-card p-5">
            <h3 className="font-display text-lg">Estado de conservación</h3>
            <p className="mt-2 text-sm text-foreground/85">{castillo.estadoDescripcion}</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card p-5">
            <h3 className="font-display text-lg">Ubicación</h3>
            <p className="mt-2 text-sm text-foreground/85">{castillo.provincia}</p>
            <p className="text-xs text-muted-foreground">{castillo.comunidad}</p>
          </div>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--youtube)] px-4 py-3 text-sm font-medium text-[var(--youtube-foreground)]"
          >
            <Youtube className="h-4 w-4" /> Ver Canal Kdronazo
          </a>
        </aside>
      </article>

      {lightbox && (
        <button
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          aria-label="Cerrar imagen"
        >
          <img src={lightbox} alt="" className="max-h-full max-w-full object-contain" />
        </button>
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