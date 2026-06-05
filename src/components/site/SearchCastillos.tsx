import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { CASTILLOS, getCategoriaInfo } from "@/data/castillos";

export function SearchCastillos({ compact = false }: { compact?: boolean }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const norm = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const results = useMemo(() => {
    const term = norm(q.trim());
    if (!term) return [];
    return CASTILLOS.filter((c) => {
      const cat = getCategoriaInfo(c.categoria);
      const hay = [
        c.nombre,
        c.provincia,
        c.comunidad,
        c.estado === "conservado" ? "conservado" : "ruinas",
        cat.label,
        cat.slug,
      ]
        .map(norm)
        .join(" | ");
      return hay.includes(term);
    }).slice(0, 8);
  }, [q]);

  function go(slug: string) {
    setOpen(false);
    setQ("");
    navigate({ to: "/castillo/$slug", params: { slug } });
  }

  return (
    <div ref={wrapRef} className={`relative ${compact ? "w-full" : "w-full max-w-md"}`}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => q && setOpen(true)}
          onKeyDown={(e) => {
            if (!open || results.length === 0) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((i) => (i + 1) % results.length);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) => (i - 1 + results.length) % results.length);
            } else if (e.key === "Enter") {
              e.preventDefault();
              go(results[active].slug);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Buscar castillo, provincia, estado…"
          className="h-9 w-full rounded-md border border-input bg-background/80 pl-9 pr-9 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
          aria-label="Buscar castillos"
        />
        {q && (
          <button
            type="button"
            onClick={() => { setQ(""); setOpen(false); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
            aria-label="Limpiar búsqueda"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && q && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg">
          {results.length === 0 ? (
            <div className="px-3 py-4 text-sm text-muted-foreground">Sin resultados para “{q}”.</div>
          ) : (
            <ul className="max-h-96 overflow-auto py-1">
              {results.map((c, i) => {
                const cat = getCategoriaInfo(c.categoria);
                return (
                  <li key={c.slug}>
                    <Link
                      to="/castillo/$slug"
                      params={{ slug: c.slug }}
                      onClick={() => { setOpen(false); setQ(""); }}
                      className={`flex items-center gap-3 px-3 py-2 text-sm ${
                        i === active ? "bg-accent text-accent-foreground" : "hover:bg-accent/60"
                      }`}
                      onMouseEnter={() => setActive(i)}
                    >
                      <img src={c.imagen} alt="" className="h-9 w-9 flex-shrink-0 rounded object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">{c.nombre}</div>
                        <div className="truncate text-xs text-muted-foreground">{c.provincia} · {c.comunidad}</div>
                      </div>
                      <span
                        className="ml-2 hidden whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium text-white sm:inline"
                        style={{ backgroundColor: cat.color }}
                      >
                        {cat.emoji} {cat.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}