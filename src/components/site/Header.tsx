import { Link } from "@tanstack/react-router";
import { Menu, X, Youtube, Instagram, Heart } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-kdronazo.jpeg";
import { CATEGORIAS } from "@/data/castillos";
import { SearchCastillos } from "./SearchCastillos";

const navLinks = [
  { to: "/categorias", label: "🏛️ Categorías" },
  { to: "/mapa", label: "🗺️ Mapa Interactivo" },
  { to: "/ranking-castillos", label: "🏆 Ranking" },
  { to: "/favoritos", label: "❤️ Favoritos" },
  { to: "/recomendar", label: "🏰 Recomendar" },
] as const;

const SOCIALES = [
  { href: "https://www.youtube.com/@kdronazo", label: "YouTube", icon: Youtube },
  { href: "https://www.instagram.com/kdronazo", label: "Instagram", icon: Instagram },
  {
    href: "https://www.tiktok.com/@kdronazo",
    label: "TikTok",
    // Icono TikTok personalizado (lucide no incluye TikTok)
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.01a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.44Z" />
      </svg>
    ),
  },
] as const;

function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {SOCIALES.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-[1000] border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-shrink-0 items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-foreground">
            <img src={logo} alt="Logo Kdronazo" className="h-10 w-10 rounded-md object-cover" />
            <span className="hidden sm:inline">Kdronazo</span>
          </Link>
          <SocialIcons className="hidden lg:flex" />
        </div>
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
      <div className="flex items-center gap-2 border-t border-border/40 bg-background/85 px-4 py-2 backdrop-blur md:hidden">
        <div className="flex-1"><SearchCastillos compact /></div>
        <SocialIcons />
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
            <Link to="/favoritos" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm text-foreground/90 hover:bg-secondary">
              <Heart className="mr-1 inline h-4 w-4" /> Mis favoritos
            </Link>
            <Link to="/recomendar" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold text-foreground hover:bg-secondary">
              🏰 Recomienda un castillo
            </Link>
            <div className="mt-2 flex items-center gap-2 border-t border-border/40 px-3 pt-3">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Síguenos</span>
              <SocialIcons />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}