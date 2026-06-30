import { createServerFn } from "@tanstack/react-start";

const SLUG_RE = /^[a-z0-9-]{2,100}$/;

export interface CastilloStats {
  total: number;
  ult30: number;
  prev30: number;
  unicos: number;
}

export interface RankingRow {
  castillo_slug: string;
  total: number;
  ult30: number;
  prev30: number;
  unicos: number;
}

export const getStatsCastilloFn = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => {
    if (!SLUG_RE.test(d.slug)) throw new Error("Invalid slug");
    return d;
  })
  .handler(async ({ data }): Promise<CastilloStats> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin.rpc(
      "castillo_stats" as never,
      { p_slug: data.slug } as never,
    );
    if (error || !rows || !(rows as unknown[]).length) {
      return { total: 0, ult30: 0, prev30: 0, unicos: 0 };
    }
    const r = (rows as CastilloStats[])[0];
    return {
      total: Number(r.total) || 0,
      ult30: Number(r.ult30) || 0,
      prev30: Number(r.prev30) || 0,
      unicos: Number(r.unicos) || 0,
    };
  });

export const getRankingFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<RankingRow[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.rpc("castillo_ranking" as never);
    if (error || !data) return [];
    return (data as RankingRow[]).map((r) => ({
      castillo_slug: r.castillo_slug,
      total: Number(r.total) || 0,
      ult30: Number(r.ult30) || 0,
      prev30: Number(r.prev30) || 0,
      unicos: Number(r.unicos) || 0,
    }));
  },
);