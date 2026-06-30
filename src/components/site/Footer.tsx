import { Link } from "@tanstack/react-router";
import { CATEGORIAS } from "@/data/castillos";

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
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Categorías</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {CATEGORIAS.map((c) => (
              <li key={c.slug}>
                <Link to="/categoria/$slug" params={{ slug: c.slug }} className="text-muted-foreground hover:text-foreground">
                  {c.emoji} {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Explorar</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/categorias" className="text-muted-foreground hover:text-foreground">🏛️ Todas las categorías</Link></li>
            <li><Link to="/mapa" className="text-muted-foreground hover:text-foreground">🗺️ Mapa Interactivo</Link></li>
            <li><Link to="/favoritos" className="text-muted-foreground hover:text-foreground">❤️ Mis favoritos</Link></li>
            <li><Link to="/recomendar" className="text-muted-foreground hover:text-foreground">🏰 Recomienda un castillo</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 bg-secondary/30">
        <p className="mx-auto max-w-5xl px-4 py-5 text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Todos los castillos, fotografías y material visual mostrados en esta web han sido
          visitados, fotografiados y documentados personalmente por <span className="font-semibold text-foreground">Kdronazo</span>.
        </p>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Kdronazo · Castillos de España a vista de dron</div>
        <div className="mt-3">
          <Link
            to="/admin/estadisticas"
            className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/60 px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition hover:text-foreground hover:border-border"
          >
            🔒 Acceso estadísticas
          </Link>
        </div>
      </div>
    </footer>
  );
}