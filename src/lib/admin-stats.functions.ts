import { createServerFn } from "@tanstack/react-start";
import { createHash, timingSafeEqual } from "node:crypto";

function checkPassword(input: string): boolean {
  const expected = process.env.KDRONAZO_ADMIN_PASSWORD;
  if (!expected) return false;
  try {
    const a = createHash("sha256").update(input, "utf8").digest();
    const b = createHash("sha256").update(expected, "utf8").digest();
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export const verificarPasswordAdmin = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => d)
  .handler(async ({ data }) => ({ ok: checkPassword(data.password) }));

export const fetchAdminStats = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string; dias?: number }) => d)
  .handler(async ({ data }) => {
    if (!checkPassword(data.password)) {
      throw new Error("Unauthorized");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const dias = Math.min(Math.max(data.dias ?? 90, 7), 365);

    const [{ data: serie }, { data: ranking }, { data: total }, { data: unicos }] = await Promise.all([
      supabaseAdmin.rpc("castillo_admin_timeseries" as never, { p_days: dias } as never),
      supabaseAdmin.rpc("castillo_ranking" as never),
      supabaseAdmin.from("castillo_visitas" as never).select("id", { count: "exact", head: true }),
      supabaseAdmin.from("castillo_visitas" as never).select("visitor_id", { head: false }),
    ]);

    const unicosCount = unicos
      ? new Set((unicos as Array<{ visitor_id: string }>).map((r) => r.visitor_id)).size
      : 0;

    return {
      timeseries: (serie ?? []) as Array<{ dia: string; visitas: number; unicos: number }>,
      ranking: (ranking ?? []) as Array<{
        castillo_slug: string;
        total: number;
        ult30: number;
        prev30: number;
        unicos: number;
      }>,
      totalVisitas: (total as unknown as { count: number })?.count ?? 0,
      totalUnicos: unicosCount,
    };
  });