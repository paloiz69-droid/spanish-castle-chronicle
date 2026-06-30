import { supabase } from "@/integrations/supabase/client";
import {
  getStatsCastilloFn,
  getRankingFn,
  type CastilloStats,
  type RankingRow,
} from "@/lib/visitas-stats.functions";

export type { CastilloStats, RankingRow };

// Stats and rankings are now proxied through trusted server functions
// (the underlying SECURITY DEFINER RPCs are no longer callable by anon/authenticated).
export async function fetchStatsCastillo(slug: string): Promise<CastilloStats> {
  try {
    return await getStatsCastilloFn({ data: { slug } });
  } catch {
    return { total: 0, ult30: 0, prev30: 0, unicos: 0 };
  }
}

export async function fetchRanking(): Promise<RankingRow[]> {
  try {
    return await getRankingFn();
  } catch {
    return [];
  }
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