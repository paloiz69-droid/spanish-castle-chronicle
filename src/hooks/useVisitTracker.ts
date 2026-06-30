import { useEffect } from "react";
import { getVisitorId } from "@/lib/visit-utils";

const SENT_KEY_PREFIX = "kdronazo_visita_enviada:";
const COOLDOWN_MS = 30 * 60 * 1000; // 30 min

/**
 * Registra una visita a la ficha cuando el usuario haya permanecido
 * al menos `delayMs` o haya interactuado mediante scroll.
 * Evita duplicar visitas del mismo dispositivo en una ventana de 30 minutos.
 */
export function useVisitTracker(slug: string, delayMs = 12_000) {
  useEffect(() => {
    if (typeof window === "undefined" || !slug) return;

    const localKey = `${SENT_KEY_PREFIX}${slug}`;
    const last = Number(window.localStorage.getItem(localKey) || 0);
    if (last && Date.now() - last < COOLDOWN_MS) return;

    let sent = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let scrolled = false;

    const send = () => {
      if (sent) return;
      sent = true;
      const visitorId = getVisitorId();
      window.localStorage.setItem(localKey, String(Date.now()));
      const payload = JSON.stringify({ slug, visitor_id: visitorId });
      try {
        if ("sendBeacon" in navigator) {
          const blob = new Blob([payload], { type: "application/json" });
          navigator.sendBeacon("/api/public/visita", blob);
        } else {
          fetch("/api/public/visita", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true,
          }).catch(() => undefined);
        }
      } catch {
        /* noop */
      }
    };

    timer = setTimeout(send, delayMs);

    const onScroll = () => {
      if (!scrolled && window.scrollY > 300) {
        scrolled = true;
        // Tras scroll significativo + 3s
        setTimeout(send, 3000);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [slug, delayMs]);
}