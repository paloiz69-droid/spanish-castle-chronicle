import { Link } from "@tanstack/react-router";
import { Youtube } from "lucide-react";
import { YOUTUBE_URL } from "@/data/castillos";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <h3 className="font-display text-xl text-foreground">🏰 Kdronazo</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Explora los castillos de España a vista de dron. Patrimonio, historia y fotografía aérea.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Explorar</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/conservados" className="text-muted-foreground hover:text-foreground">🏰 Castillos Conservados</Link></li>
            <li><Link to="/ruinas" className="text-muted-foreground hover:text-foreground">🏚️ Castillos en Ruinas</Link></li>
            <li><Link to="/mapa" className="text-muted-foreground hover:text-foreground">🗺️ Mapa Interactivo</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Canal</h4>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-md bg-[var(--youtube)] px-4 py-2 text-sm font-medium text-[var(--youtube-foreground)]"
          >
            <Youtube className="h-4 w-4" /> Ver Canal Kdronazo
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kdronazo · Castillos de España a vista de dron
      </div>
    </footer>
  );
}