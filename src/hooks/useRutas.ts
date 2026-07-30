import { useSyncExternalStore } from "react";

export const RUTAS_KEY = "kdronazo_custom_routes_v1";
const EVENT = "kdronazo:rutas:change";

export interface RutaGuardada {
  id: string;
  nombre: string;
  origen: string;
  volverAlOrigen: boolean;
  slugs: string[];
  fecha: string;
}

const EMPTY: RutaGuardada[] = [];
let cache: RutaGuardada[] = EMPTY;
let loaded = false;

function load(): RutaGuardada[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(RUTAS_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed.filter(
      (r) => r && typeof r.id === "string" && Array.isArray(r.slugs),
    ) as RutaGuardada[];
  } catch {
    return EMPTY;
  }
}

function read(): RutaGuardada[] {
  if (!loaded) {
    cache = load();
    loaded = true;
  }
  return cache;
}

function readServer(): RutaGuardada[] {
  return EMPTY;
}

function write(rutas: RutaGuardada[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RUTAS_KEY, JSON.stringify(rutas));
  cache = rutas;
  loaded = true;
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    cache = load();
    loaded = true;
    cb();
  };
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function useRutasGuardadas() {
  return useSyncExternalStore(subscribe, read, readServer);
}

export function guardarRuta(ruta: Omit<RutaGuardada, "id" | "fecha"> & { id?: string }) {
  const actuales = read();
  const id = ruta.id ?? `r-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const nueva: RutaGuardada = {
    id,
    nombre: ruta.nombre,
    origen: ruta.origen,
    volverAlOrigen: ruta.volverAlOrigen,
    slugs: ruta.slugs,
    fecha: new Date().toISOString(),
  };
  const existe = actuales.some((r) => r.id === id);
  write(existe ? actuales.map((r) => (r.id === id ? nueva : r)) : [...actuales, nueva]);
  return id;
}

export function eliminarRuta(id: string) {
  write(read().filter((r) => r.id !== id));
}

export function eliminarTodasLasRutas() {
  write([]);
}