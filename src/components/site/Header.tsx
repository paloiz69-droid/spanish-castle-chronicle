import { Link } from "@tanstack/react-router";
import { Youtube, Menu, X } from "lucide-react";
import { useState } from "react";
import { YOUTUBE_URL } from "@/data/castillos";

const navLinks = [
  { to: "/conservados", label: "🏰 Castillos Conservados" },
  { to: "/ruinas", label: "🏚️ Castillos en Ruinas" },
  { to: "/mapa", label: "🗺️ Mapa Interactivo" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-foreground">
          <span className="text-2xl">🏰</span>
          <span>Kdronazo</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
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
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-2 rounded-md bg-[var(--youtube)] px-4 py-2 text-sm font-medium text-[var(--youtube-foreground)] shadow-sm transition-transform hover:scale-[1.02]"
          >
            <Youtube className="h-4 w-4" /> Ver Canal Kdronazo
          </a>
        </nav>
        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-md p-2 text-foreground md:hidden"
          aria-label="Menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-foreground/90 hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--youtube)] px-4 py-3 text-sm font-medium text-[var(--youtube-foreground)]"
            >
              <Youtube className="h-4 w-4" /> Ver Canal Kdronazo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}