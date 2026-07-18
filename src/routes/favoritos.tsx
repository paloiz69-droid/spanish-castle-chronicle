import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { CastilloCard } from "@/components/site/CastilloCard";
import { useFavorites } from "@/hooks/useFavorites";
import { CASTILLOS } from "@/data/castillos";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Mis castillos favoritos — Kdronazo" },
      {
        name: "description",
        content:
          "Tu colección personal de castillos guardados en Kdronazo. Accede rápidamente a las fichas de tus castillos favoritos.",
      },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Mis castillos favoritos — Kdronazo" },
      {
        property: "og:description",
        content: "Tu colección personal de castillos guardados en Kdronazo.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.kdronazo.com/favoritos" }],
  }),
  component: Page,
});

function Page() {
  const favs = useFavorites();
  const castillos = favs
    .map((slug) => CASTILLOS.find((c) => c.slug === slug))
    .filter((c): c is (typeof CASTILLOS)[number] => Boolean(c));

  return (
    <PageShell>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tu colección</p>
          <h1 className="mt-2 flex items-center gap-3 font-display text-4xl text-foreground sm:text-5xl">
            <Heart className="h-8 w-8 fill-red-500 text-red-500" /> Mis castillos favoritos
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Los castillos que has guardado se almacenan en este navegador, sin necesidad de registro.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {castillos.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
            <h2 className="mt-4 font-display text-2xl text-foreground">
              Aún no tienes favoritos
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pulsa el icono <span className="inline-flex items-center"><Heart className="mx-1 inline h-4 w-4" /></span>
              en cualquier ficha de castillo para guardarlo aquí.
            </p>
            <Link
              to="/categorias"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Explorar castillos
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {castillos.map((c) => (
              <CastilloCard key={c.slug} castillo={c} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}