-- Lock down SECURITY DEFINER functions: only service_role can execute.
REVOKE ALL ON FUNCTION public.castillo_stats(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.castillo_ranking() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.castillo_visita_reciente(text, uuid, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.castillo_admin_timeseries(integer) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.castillo_stats(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.castillo_ranking() TO service_role;
GRANT EXECUTE ON FUNCTION public.castillo_visita_reciente(text, uuid, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.castillo_admin_timeseries(integer) TO service_role;

-- Remove anonymous direct INSERT into castillo_visitas; writes go through trusted server route using service role.
DROP POLICY IF EXISTS "anyone can insert a visit" ON public.castillo_visitas;
REVOKE INSERT, SELECT, UPDATE, DELETE ON public.castillo_visitas FROM anon, authenticated;
GRANT ALL ON public.castillo_visitas TO service_role;