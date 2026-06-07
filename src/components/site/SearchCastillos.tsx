import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X, SlidersHorizontal } from "lucide-react";
import {
  CASTILLOS,
  CATEGORIAS,
  getCategoriaInfo,
  getProvincias,
  type CategoriaCastillo,
} from "@/data/castillos";

export function SearchCastillos({ compact = false }: { compact?: boolean }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [provincia, setProvincia] = useState<string>("");
  const [categoria, setCategoria] = useState<CategoriaCastillo | "">("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const norm = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const results = useMemo(() => {
    const term = norm(q.trim());
    const hayFiltros = provincia !== "" || categoria !== "";
    if (!term && !hayFiltros) return [];
    return CASTILLOS.filter((c) => {
      if (provincia && c.provincia !== provincia) return false;
      if (categoria && c.categoria !== categoria) return false;
      if (!term) return true;
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
    }).slice(0, 12);
  }, [q, provincia, categoria]);

  const provincias = useMemo(() => getProvincias(), []);
  const filtrosActivos = (provincia ? 1 : 0) + (categoria ? 1 : 0);
  const hayDropdown = (q.trim().length > 0 || filtrosActivos > 0) && open;

  function go(slug: string) {
    setOpen(false);
    setQ("");
    navigate({ to: "/castillo/$slug", params: { slug } });
  }

  return (
    <div ref={wrapRef} className={`relative ${compact ? "w-full" : "w-full max-w-md"}`}>
      <div className="relative flex items-center gap-1">
        <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
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
        <button
          type="button"
          onClick={() => { setShowFilters((v) => !v); setOpen(true); }}
          className={`relative inline-flex h-9 items-center gap-1 rounded-md border border-input px-2 text-xs font-medium transition-colors ${showFilters || filtrosActivos > 0 ? "bg-primary text-primary-foreground" : "bg-background/80 text-foreground hover:bg-secondary"}`}
          aria-label="Filtros avanzados"
          aria-expanded={showFilters}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Filtros</span>
          {filtrosActivos > 0 && (
            <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-background/90 px-1 text-[10px] font-bold text-primary">
              {filtrosActivos}
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="absolute left-0 right-0 top-full z-[1100] mt-2 rounded-md border border-border bg-popover p-3 shadow-lg">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
              Provincia
              <select
                value={provincia}
                onChange={(e) => { setProvincia(e.target.value); setOpen(true); }}
                className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground"
              >
                <option value="">Todas</option>
                {provincias.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
              Estado de conservación
              <select
                value={categoria}
                onChange={(e) => { setCategoria(e.target.value as CategoriaCastillo | ""); setOpen(true); }}
                className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground"
              >
                <option value="">Todos</option>
                {CATEGORIAS.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.emoji} {c.label}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-3 flex items-center justify-between">
            {filtrosActivos > 0 ? (
              <button
                type="button"
                onClick={() => { setProvincia(""); setCategoria(""); }}
                className="text-xs text-primary hover:underline"
              >
                Limpiar filtros
              </button>
            ) : <span />}
            <span className="text-xs text-muted-foreground">
              {results.length} resultado{results.length === 1 ? "" : "s"}
            </span>
          </div>
          {(q.trim().length > 0 || filtrosActivos > 0) && (
            <div className="mt-2 max-h-72 overflow-auto border-t border-border pt-2">
              {results.length === 0 ? (
                <div className="px-1 py-3 text-sm text-muted-foreground">Sin resultados con los criterios seleccionados.</div>
              ) : (
                <ul className="space-y-1">
                  {results.map((c) => {
                    const cat = getCategoriaInfo(c.categoria);
                    return (
                      <li key={c.slug}>
                        <Link
                          to="/castillo/$slug"
                          params={{ slug: c.slug }}
                          onClick={() => { setOpen(false); setShowFilters(false); }}
                          className="flex items-center gap-3 rounded px-2 py-1.5 text-sm hover:bg-accent/60"
                        >
                          <img src={c.imagen} alt="" className="h-8 w-8 flex-shrink-0 rounded object-cover" />
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium">{c.nombre}</div>
                            <div className="truncate text-xs text-muted-foreground">{c.provincia}</div>
                          </div>
                          <span
                            className="ml-2 hidden whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium text-white sm:inline"
                            style={{ backgroundColor: cat.color }}
                          >
                            {cat.emoji}
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
      )}

      {hayDropdown && !showFilters && (
        <div className="absolute left-0 right-0 top-full z-[1100] mt-2 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg">
          {results.length === 0 ? (
            <div className="px-3 py-4 text-sm text-muted-foreground">
              Sin resultados{q ? ` para “${q}”` : ""}.
            </div>
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