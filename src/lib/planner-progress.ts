/**
 * Plan en curso y última parada abierta, guardados en el navegador con una
 * clave propia: nunca modifica las rutas guardadas por el usuario.
 */
export const PROGRESO_KEY = "kdronazo_planner_progress_v1";

export interface ProgresoPlanificador {
  slugs: string[];
  origen: string;
  volver: boolean;
  /** Índice (0 = parada 1) de la última etapa abierta y firma del itinerario en ese momento. */
  ultima?: { indice: number; firma: string };
}

/** Identifica el itinerario: si cambian paradas, orden, origen o regreso, la firma cambia. */
export function firmaItinerario(slugs: string[], origen: string, volver: boolean): string {
  return JSON.stringify([slugs, origen.trim(), volver && Boolean(origen.trim())]);
}

/**
 * Índice de la siguiente etapa pendiente (paradas + regreso opcional), o null si
 * ya se abrió la última. Si el itinerario cambió, vuelve a empezar por la 1.
 */
export function siguienteEtapa(
  ultima: ProgresoPlanificador["ultima"],
  firmaActual: string,
  totalEtapas: number,
): number | null {
  if (totalEtapas <= 0) return null;
  if (!ultima || ultima.firma !== firmaActual) return 0;
  const siguiente = ultima.indice + 1;
  return siguiente < totalEtapas ? siguiente : null;
}

export function leerProgreso(): ProgresoPlanificador | null {
  try {
    const raw = window.localStorage.getItem(PROGRESO_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (!p || !Array.isArray(p.slugs)) return null;
    return {
      slugs: p.slugs.filter((s: unknown): s is string => typeof s === "string"),
      origen: typeof p.origen === "string" ? p.origen : "",
      volver: Boolean(p.volver),
      ultima:
        p.ultima && typeof p.ultima.indice === "number" && typeof p.ultima.firma === "string"
          ? { indice: p.ultima.indice, firma: p.ultima.firma }
          : undefined,
    };
  } catch {
    return null;
  }
}

export function escribirProgreso(p: ProgresoPlanificador): void {
  try {
    window.localStorage.setItem(PROGRESO_KEY, JSON.stringify(p));
  } catch {
    /* almacenamiento no disponible: el planificador sigue funcionando */
  }
}
