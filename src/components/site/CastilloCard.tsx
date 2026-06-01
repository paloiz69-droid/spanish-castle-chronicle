import { Link } from "@tanstack/react-router";
import type { Castillo } from "@/data/castillos";

export function CastilloCard({ castillo }: { castillo: Castillo }) {
  const badge = castillo.estado === "ruinas" ? "🏚️ En Ruinas" : "🏰 Conservado";
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
      <Link to="/castillo/$slug" params={{ slug: castillo.slug }} className="block aspect-[16/10] overflow-hidden">
        <img
          src={castillo.imagen}
          alt={castillo.nombre}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            {badge}
          </span>
          <span className="text-xs uppercase tracking-wider text-muted-foreground">{castillo.provincia}</span>
        </div>
        <h3 className="font-display text-xl text-foreground">{castillo.nombre}</h3>
        <p className="mt-1 text-xs italic text-muted-foreground">{castillo.estadoDescripcion}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/80">{castillo.descripcionBreve}</p>
        <Link
          to="/castillo/$slug"
          params={{ slug: castillo.slug }}
          className="mt-5 inline-flex w-fit items-center gap-1 rounded-md border border-primary/40 bg-primary/5 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Ver ficha completa →
        </Link>
      </div>
    </article>
  );
}