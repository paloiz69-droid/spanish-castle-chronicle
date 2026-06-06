import { Link } from "@tanstack/react-router";
import { toYoutubeWatchUrl, getCategoriaInfo, esCastilloNuevo, type Castillo } from "@/data/castillos";

export function CastilloCard({ castillo }: { castillo: Castillo }) {
  const videoUrl = toYoutubeWatchUrl(castillo.youtubeUrl);
  const cat = getCategoriaInfo(castillo.categoria);
  const nuevo = esCastilloNuevo(castillo);
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
      <Link to="/castillo/$slug" params={{ slug: castillo.slug }} className="relative block aspect-[16/10] overflow-hidden">
        <img
          src={castillo.imagen}
          alt={castillo.nombre}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {nuevo && (
          <span className="badge-nuevo absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px]">
            🆕 NUEVO
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: cat.color }}
            title={cat.descripcion}
          >
            {cat.emoji} {cat.label}
          </span>
          <span className="text-xs uppercase tracking-wider text-muted-foreground">{castillo.provincia}</span>
        </div>
        <h3 className="font-display text-xl text-foreground">{castillo.nombre}</h3>
        <p className="mt-1 text-xs italic text-muted-foreground">{castillo.estadoDescripcion}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/80">{castillo.descripcionBreve}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            to="/castillo/$slug"
            params={{ slug: castillo.slug }}
            className="inline-flex w-fit items-center gap-1 rounded-md border border-primary/40 bg-primary/5 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Ver ficha →
          </Link>
          {videoUrl && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1 rounded-md bg-[var(--youtube)] px-3 py-2 text-sm font-medium text-[var(--youtube-foreground)] transition-transform hover:scale-[1.02]"
            >
              📺 Ver vídeo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}