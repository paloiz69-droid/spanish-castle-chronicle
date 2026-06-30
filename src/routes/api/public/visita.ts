import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { detectDispositivo, detectNavegador } from "@/lib/visit-utils";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SLUG_RE = /^[a-z0-9-]{2,100}$/;

export const Route = createFileRoute("/api/public/visita")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { slug?: string; visitor_id?: string };
          const slug = (body.slug || "").trim();
          const visitorId = (body.visitor_id || "").trim();
          if (!SLUG_RE.test(slug) || !UUID_RE.test(visitorId)) {
            return new Response("Invalid payload", { status: 400 });
          }

          const ua = request.headers.get("user-agent") || "";
          // Filtro básico anti-bot
          if (/bot|crawler|spider|preview|facebookexternalhit|whatsapp|telegram/i.test(ua)) {
            return new Response(JSON.stringify({ skipped: "bot" }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }
          const pais =
            request.headers.get("cf-ipcountry") ||
            request.headers.get("x-vercel-ip-country") ||
            null;

          const supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_PUBLISHABLE_KEY!,
            { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
          );

          const { data: reciente } = await supabase.rpc("castillo_visita_reciente" as never, {
            p_slug: slug,
            p_visitor: visitorId,
            p_minutes: 30,
          });

          if (reciente === true) {
            return new Response(JSON.stringify({ skipped: "recent" }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          const { error } = await supabase.from("castillo_visitas" as never).insert({
            castillo_slug: slug,
            visitor_id: visitorId,
            pais: pais && pais !== "XX" ? pais : null,
            dispositivo: detectDispositivo(ua),
            navegador: detectNavegador(ua),
          } as never);

          if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }

          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: (e as Error).message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});