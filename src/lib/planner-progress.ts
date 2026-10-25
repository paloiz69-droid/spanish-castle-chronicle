/**
 * Plan en curso (paradas, origen y regreso), guardado en el navegador con una
 * clave propia: nunca modifica las rutas guardadas por el usuario.
 */
export const PROGRESO_KEY = "kdronazo_planner_progress_v1";

export interface ProgresoPlanificador {
  slugs: string[];
  origen: string;
  volver: boolean;
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
