/** Utilidades reutilizables para el sistema de estadísticas de visitas. */

export function slugifyRegion(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const VISITOR_KEY = "kdronazo_voter_id";

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export function detectDispositivo(ua: string): "movil" | "escritorio" | "tablet" {
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "movil";
  return "escritorio";
}

export function detectNavegador(ua: string): string {
  if (/Edg\//i.test(ua)) return "Edge";
  if (/OPR\//i.test(ua)) return "Opera";
  if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) return "Chrome";
  if (/Firefox\//i.test(ua)) return "Firefox";
  if (/Safari\//i.test(ua)) return "Safari";
  return "Otro";
}

/** Calcula la tendencia % entre últimos 30 días y los 30 anteriores. */
export function calcularTendencia(
  ult30: number,
  prev30: number,
): { tipo: "sube" | "baja" | "estable" | "nuevo"; pct: number; etiqueta: string } {
  if (prev30 === 0 && ult30 === 0) return { tipo: "estable", pct: 0, etiqueta: "Sin actividad" };
  if (prev30 === 0) return { tipo: "nuevo", pct: 100, etiqueta: "Nuevo interés" };
  const pct = Math.round(((ult30 - prev30) / prev30) * 100);
  if (pct >= 10) return { tipo: "sube", pct, etiqueta: `Sube ${pct}%` };
  if (pct <= -10) return { tipo: "baja", pct, etiqueta: `Baja ${Math.abs(pct)}%` };
  return { tipo: "estable", pct, etiqueta: "Estable" };
}