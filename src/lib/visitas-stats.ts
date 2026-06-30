import { supabase } from "@/integrations/supabase/client";

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

export async function fetchStatsCastillo(slug: string): Promise<CastilloStats> {
  const { data, error } = await supabase.rpc("castillo_stats" as never, { p_slug: slug } as never);
  if (error || !data || !(data as unknown[]).length) {
    return { total: 0, ult30: 0, prev30: 0, unicos: 0 };
  }
  const row = (data as CastilloStats[])[0];
  return {
    total: Number(row.total) || 0,
    ult30: Number(row.ult30) || 0,
    prev30: Number(row.prev30) || 0,
    unicos: Number(row.unicos) || 0,
  };
}

export async function fetchRanking(): Promise<RankingRow[]> {
  const { data, error } = await supabase.rpc("castillo_ranking" as never);
  if (error || !data) return [];
  return (data as RankingRow[]).map((r) => ({
    castillo_slug: r.castillo_slug,
    total: Number(r.total) || 0,
    ult30: Number(r.ult30) || 0,
    prev30: Number(r.prev30) || 0,
    unicos: Number(r.unicos) || 0,
  }));
}

/** Cuenta los votos "visitado" y "pendiente" para un castillo. */
export interface VotosCounts {
  visitado: number;
  pendiente: number;
}
export async function fetchVotosCastillo(slug: string): Promise<VotosCounts> {
  const { data } = await supabase
    .from("castillo_votos")
    .select("opcion")
    .eq("castillo_slug", slug);
  if (!data) return { visitado: 0, pendiente: 0 };
  return {
    visitado: data.filter((r) => r.opcion === "visitado").length,
    pendiente: data.filter((r) => r.opcion === "pendiente").length,
  };
}

export async function fetchVotosTodos(): Promise<Map<string, VotosCounts>> {
  const { data } = await supabase.from("castillo_votos").select("castillo_slug, opcion");
  const map = new Map<string, VotosCounts>();
  if (!data) return map;
  for (const r of data as Array<{ castillo_slug: string; opcion: string }>) {
    const cur = map.get(r.castillo_slug) || { visitado: 0, pendiente: 0 };
    if (r.opcion === "visitado") cur.visitado += 1;
    else if (r.opcion === "pendiente") cur.pendiente += 1;
    map.set(r.castillo_slug, cur);
  }
  return map;
}