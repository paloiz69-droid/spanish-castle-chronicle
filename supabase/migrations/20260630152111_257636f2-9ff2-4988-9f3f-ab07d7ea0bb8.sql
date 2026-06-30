DROP TABLE IF EXISTS public.castillo_visitas CASCADE;
DROP FUNCTION IF EXISTS public.castillo_stats(text);
DROP FUNCTION IF EXISTS public.castillo_ranking();
DROP FUNCTION IF EXISTS public.castillo_visita_reciente(text, uuid, integer);
DROP FUNCTION IF EXISTS public.castillo_admin_timeseries(integer);