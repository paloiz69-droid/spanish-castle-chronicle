import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-kdronazo.jpg";
import { PageShell } from "@/components/site/PageShell";
import { CastilloCard } from "@/components/site/CastilloCard";
import { SobreKdronazo } from "@/components/site/SobreKdronazo";
import {
  CASTILLOS,
  CATEGORIAS,
  countByCategoria,
  getCastillosByCategoria,
} from "@/data/castillos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kdronazo — Castillos de España a vista de dron" },
      { name: "description", content: "Plataforma documental de castillos de España: fotografía aérea, historia, cronologías y vídeos del canal Kdronazo." },
      { property: "og:title", content: "Kdronazo — Castillos de España" },
      { property: "og:description", content: "Explora castillos conservados y en ruinas a través de fotografía aérea y fichas históricas." },
    ],
    links: [{ rel: "canonical", href: "https://kdronazo.com/" }],
  }),
  component: Index,
});

function Index() {
  const destacados = [
    ...getCastillosByCategoria("conservado").slice(0, 2),
    ...getCastillosByCategoria("semirruina").slice(0, 2),
    ...getCastillosByCategoria("ruina-arqueologica").slice(0, 2),
  ].slice(0, 6);
  return (
    <PageShell interior={false}>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Castillo al atardecer"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/85" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
          <span className="mb-4 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/90 backdrop-blur">
            Patrimonio · Fotografía aérea · Documental
          </span>
          <h1 className="font-display text-5xl font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] sm:text-6xl md:text-7xl">
            Castillos de España<br />
            <span
              className="block text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.85), 0 0 2px rgba(0,0,0,0.9)" }}
            >
              a vista de dron
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/85 sm:text-lg">
            Una plataforma documental dedicada al patrimonio histórico español. Explora fortalezas conservadas, ruinas legendarias y vídeos aéreos del canal Kdronazo.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/categorias" className="rounded-md bg-white px-5 py-3 text-sm font-medium text-foreground shadow-sm transition-transform hover:scale-[1.02]">
              🏛️ Ver todas las categorías
            </Link>
            <Link to="/mapa" className="rounded-md border border-white/40 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20">
              🗺️ Mapa Interactivo
            </Link>
          </div>
        </div>
      </section>

      <SobreKdronazo />

      <div className="kd-stone-section">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { k: CASTILLOS.length, l: "Castillos catalogados" },
              { k: new Set(CASTILLOS.map((c) => c.provincia)).size, l: "Provincias" },
              { k: CATEGORIAS.length, l: "Categorías de conservación" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-border/70 bg-card p-6 text-center">
                <div className="font-display text-4xl text-primary">{s.k}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">🏛️ Categorías por estado de conservación</h2>
            <p className="mt-1 text-sm text-muted-foreground">Filtra los castillos por su nivel real de conservación.</p>
          </div>
          <Link to="/categorias" className="text-sm font-medium text-primary hover:underline">Ver todas →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIAS.map((c) => (
            <Link
              key={c.slug}
              to="/categoria/$slug"
              params={{ slug: c.slug }}
              className="group rounded-xl border border-border/70 bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
            >
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: c.color }}
              >
                {c.emoji}
              </span>
              <h3 className="mt-3 font-display text-lg text-foreground">{c.label}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{countByCategoria(c.slug)} castillos</p>
              <p className="mt-2 text-xs leading-snug text-foreground/75">{c.descripcion}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">📷 Castillos destacados</h2>
          <p className="mt-1 text-sm text-muted-foreground">Una selección del archivo visual de Kdronazo.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((c) => <CastilloCard key={c.slug} castillo={c} />)}
        </div>
      </section>
      </div>
    </PageShell>
  );
}
