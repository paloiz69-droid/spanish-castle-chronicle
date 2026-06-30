
CREATE TABLE IF NOT EXISTS public.castillo_visitas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  castillo_slug text NOT NULL,
  visitor_id uuid NOT NULL,
  pais text,
  dispositivo text,
  navegador text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_castillo_visitas_slug ON public.castillo_visitas(castillo_slug);
CREATE INDEX IF NOT EXISTS idx_castillo_visitas_created ON public.castillo_visitas(created_at);
CREATE INDEX IF NOT EXISTS idx_castillo_visitas_slug_visitor_created ON public.castillo_visitas(castillo_slug, visitor_id, created_at DESC);

GRANT INSERT ON public.castillo_visitas TO anon, authenticated;
GRANT ALL ON public.castillo_visitas TO service_role;

ALTER TABLE public.castillo_visitas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can insert a visit"
  ON public.castillo_visitas FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Stats por castillo
CREATE OR REPLACE FUNCTION public.castillo_stats(p_slug text)
RETURNS TABLE(total bigint, ult30 bigint, prev30 bigint, unicos bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT
    count(*)::bigint,
    count(*) FILTER (WHERE created_at >= now() - interval '30 days')::bigint,
    count(*) FILTER (WHERE created_at >= now() - interval '60 days' AND created_at < now() - interval '30 days')::bigint,
    count(DISTINCT visitor_id)::bigint
  FROM public.castillo_visitas
  WHERE castillo_slug = p_slug;
$$;

-- Ranking global agregado
CREATE OR REPLACE FUNCTION public.castillo_ranking()
RETURNS TABLE(castillo_slug text, total bigint, ult30 bigint, prev30 bigint, unicos bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT
    castillo_slug,
    count(*)::bigint,
    count(*) FILTER (WHERE created_at >= now() - interval '30 days')::bigint,
    count(*) FILTER (WHERE created_at >= now() - interval '60 days' AND created_at < now() - interval '30 days')::bigint,
    count(DISTINCT visitor_id)::bigint
  FROM public.castillo_visitas
  GROUP BY castillo_slug;
$$;

-- Comprueba si el visitante ya visitó en los últimos N minutos (anti-recarga)
CREATE OR REPLACE FUNCTION public.castillo_visita_reciente(p_slug text, p_visitor uuid, p_minutes int DEFAULT 30)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.castillo_visitas
    WHERE castillo_slug = p_slug
      AND visitor_id = p_visitor
      AND created_at >= now() - make_interval(mins => p_minutes)
  );
$$;

-- Series temporales para admin
CREATE OR REPLACE FUNCTION public.castillo_admin_timeseries(p_days int DEFAULT 90)
RETURNS TABLE(dia date, visitas bigint, unicos bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT
    (created_at AT TIME ZONE 'UTC')::date AS dia,
    count(*)::bigint,
    count(DISTINCT visitor_id)::bigint
  FROM public.castillo_visitas
  WHERE created_at >= now() - make_interval(days => p_days)
  GROUP BY 1
  ORDER BY 1;
$$;

GRANT EXECUTE ON FUNCTION public.castillo_stats(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.castillo_ranking() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.castillo_visita_reciente(text, uuid, int) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.castillo_admin_timeseries(int) TO service_role;
