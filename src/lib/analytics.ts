// GA4 helpers. The measurement ID is read from VITE_GA_MEASUREMENT_ID at build time.
// Si no se configura, los helpers son no-ops y no se carga ningún script.

export const GA_MEASUREMENT_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) ?? "";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

export function trackPageview(path: string, title?: string) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: title ?? document.title,
    send_to: GA_MEASUREMENT_ID,
  });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  gtag("event", name, { ...params, send_to: GA_MEASUREMENT_ID });
}

export function trackSearch(term: string, resultCount?: number) {
  trackEvent("search", { search_term: term, result_count: resultCount });
}

export function trackCastilloView(slug: string, nombre: string) {
  trackEvent("castillo_view", { slug, nombre });
}