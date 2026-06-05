import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-kdronazo.jpeg";
import { CATEGORIAS } from "@/data/castillos";
import { SearchCastillos } from "./SearchCastillos";

const navLinks = [
  { to: "/categorias", label: "🏛️ Categorías" },
  { to: "/mapa", label: "🗺️ Mapa Interactivo" },
  { to: "/recomendar", label: "🏰 Recomendar" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex flex-shrink-0 items-center gap-2 font-display text-xl font-semibold tracking-tight text-foreground">
          <img src={logo} alt="Logo Kdronazo" className="h-10 w-10 rounded-md object-cover" />
          <span className="hidden sm:inline">Kdronazo</span>
        </Link>
        <div className="hidden flex-1 justify-center md:flex">
          <SearchCastillos />
        </div>
        <nav className="hidden flex-shrink-0 items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setOpen((o) => !o)}
          className="ml-auto rounded-md p-2 text-foreground md:hidden"
          aria-label="Menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <div className="border-t border-border/40 bg-background/85 px-4 py-2 backdrop-blur md:hidden">
        <SearchCastillos compact />
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            <Link to="/categorias" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold text-foreground hover:bg-secondary">
              🏛️ Categorías
            </Link>
            {CATEGORIAS.map((c) => (
              <Link
                key={c.slug}
                to="/categoria/$slug"
                params={{ slug: c.slug }}
                onClick={() => setOpen(false)}
                className="rounded-md px-5 py-2 text-sm text-foreground/90 hover:bg-secondary"
              >
                {c.emoji} {c.label}
              </Link>
            ))}
            <Link to="/mapa" onClick={() => setOpen(false)} className="mt-1 rounded-md px-3 py-3 text-sm text-foreground/90 hover:bg-secondary">
              🗺️ Mapa Interactivo
            </Link>
            <Link to="/recomendar" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold text-foreground hover:bg-secondary">
              🏰 Recomienda un castillo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}