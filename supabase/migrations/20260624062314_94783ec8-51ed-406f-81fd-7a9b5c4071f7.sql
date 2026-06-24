
CREATE TABLE public.castillo_votos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  castillo_slug text NOT NULL,
  voter_id uuid NOT NULL,
  opcion text NOT NULL CHECK (opcion IN ('visitado','pendiente')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (castillo_slug, voter_id)
);

CREATE INDEX castillo_votos_slug_idx ON public.castillo_votos (castillo_slug);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.castillo_votos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.castillo_votos TO authenticated;
GRANT ALL ON public.castillo_votos TO service_role;

ALTER TABLE public.castillo_votos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recuentos visibles para todos"
  ON public.castillo_votos FOR SELECT
  USING (true);

CREATE POLICY "Cualquiera puede votar"
  ON public.castillo_votos FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Cualquiera puede cambiar su voto"
  ON public.castillo_votos FOR UPDATE
  USING (true) WITH CHECK (true);

CREATE POLICY "Cualquiera puede eliminar su voto"
  ON public.castillo_votos FOR DELETE
  USING (true);

CREATE OR REPLACE FUNCTION public.castillo_votos_touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER castillo_votos_set_updated_at
  BEFORE UPDATE ON public.castillo_votos
  FOR EACH ROW EXECUTE FUNCTION public.castillo_votos_touch_updated_at();
