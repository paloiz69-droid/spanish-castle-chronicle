import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  Map as MapIcon,
  Plus,
  Route as RouteIcon,
  Save,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import {
  CASTILLOS,
  CATEGORIAS,
  getCategoriaInfo,
  getProvincias,
  type CategoriaCastillo,
  type Castillo,
} from "@/data/castillos";
import { getAccesoCastilloInfo } from "@/data/castillos-extra";
import {
  eliminarRuta,
  eliminarTodasLasRutas,
  guardarRuta,
  useRutasGuardadas,
} from "@/hooks/useRutas";

export const Route = createFileRoute("/crea-tu-ruta")({
  head: () => ({
    meta: [
      { title: "Crea tu ruta de castillos — Kdronazo" },
      {
        name: "description",
        content:
          "Selecciona varios castillos de España, ordena las paradas y abre tu ruta personalizada en Google Maps. Todo se calcula en tu navegador.",
      },
      { property: "og:title", content: "Crea tu ruta de castillos — Kdronazo" },
      {
        property: "og:description",
        content:
          "Diseña tu propia ruta de castillos: elige paradas, ordénalas y ábrela en Google Maps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.kdronazo.com/crea-tu-ruta" }],
  }),
  component: Page,
});

const MAX_PARADAS_TRAMO = 10; // 1 destino + 9 waypoints por URL de Google Maps

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function distanciaKm(a: [number, number], b: [number, number]) {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const la1 = (a[0] * Math.PI) / 180;
  const la2 = (b[0] * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function ordenarPorProximidad(lista: Castillo[]): Castillo[] {
  if (lista.length < 3) return lista;
  const pendientes = [...lista];
  const orden: Castillo[] = [pendientes.shift()!];
  while (pendientes.length) {
    const ultimo = orden[orden.length - 1];
    let mejor = 0;
    let mejorD = Infinity;
    pendientes.forEach((c, i) => {
      const d = distanciaKm(ultimo.coordenadas, c.coordenadas);
      if (d < mejorD) {
        mejorD = d;
        mejor = i;
      }
    });
    orden.push(pendientes.splice(mejor, 1)[0]);
  }
  return orden;
}

function coord(c: Castillo) {
  return `${c.coordenadas[0]},${c.coordenadas[1]}`;
}

/** Divide la ruta en tramos que Google Maps puede abrir mediante URL estándar. */
function construirTramos(paradas: Castillo[], origen: string, volver: boolean) {
  const puntos: string[] = [];
  const origenLimpio = origen.trim();
  if (origenLimpio) puntos.push(origenLimpio);
  paradas.forEach((c) => puntos.push(coord(c)));
  if (volver && origenLimpio) puntos.push(origenLimpio);
  if (puntos.length < 2) return [];

  const tramos: string[] = [];
  let i = 0;
  while (i < puntos.length - 1) {
    const trozo = puntos.slice(i, i + MAX_PARADAS_TRAMO + 1);
    const inicio = trozo[0];
    const fin = trozo[trozo.length - 1];
    const medios = trozo.slice(1, -1);
    const params = new URLSearchParams({
      api: "1",
      origin: inicio,
      destination: fin,
      travelmode: "driving",
    });
    if (medios.length) params.set("waypoints", medios.join("|"));
    tramos.push(`https://www.google.com/maps/dir/?${params.toString()}`);
    i += trozo.length - 1;
  }
  return tramos;
}

function Page() {
  const [q, setQ] = useState("");
  const [provincia, setProvincia] = useState("");
  const [categoria, setCategoria] = useState<CategoriaCastillo | "">("");
  const [slugs, setSlugs] = useState<string[]>([]);
  const [origen, setOrigen] = useState("");
  const [volver, setVolver] = useState(false);
  const [nombreRuta, setNombreRuta] = useState("");
  const [aviso, setAviso] = useState<string | null>(null);
  const rutasGuardadas = useRutasGuardadas();
  const provincias = useMemo(() => getProvincias(), []);

  const resultados = useMemo(() => {
    const term = norm(q.trim());
    return CASTILLOS.filter((c) => {
      if (provincia && c.provincia !== provincia) return false;
      if (categoria && c.categoria !== categoria) return false;
      if (!term) return true;
      return norm(`${c.nombre} ${c.provincia} ${c.comunidad}`).includes(term);
    });
  }, [q, provincia, categoria]);

  const paradas = useMemo(
    () =>
      slugs
        .map((s) => CASTILLOS.find((c) => c.slug === s))
        .filter((c): c is Castillo => Boolean(c)),
    [slugs],
  );

  const tramos = useMemo(
    () => construirTramos(paradas, origen, volver),
    [paradas, origen, volver],
  );

  const distanciaTotal = useMemo(() => {
    let total = 0;
    for (let i = 1; i < paradas.length; i++) {
      total += distanciaKm(paradas[i - 1].coordenadas, paradas[i].coordenadas);
    }
    return Math.round(total);
  }, [paradas]);

  function toggle(slug: string) {
    setSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  function mover(index: number, delta: number) {
    setSlugs((prev) => {
      const next = [...prev];
      const destino = index + delta;
      if (destino < 0 || destino >= next.length) return prev;
      [next[index], next[destino]] = [next[destino], next[index]];
      return next;
    });
  }

  function sugerirOrden() {
    setSlugs(ordenarPorProximidad(paradas).map((c) => c.slug));
  }

  function abrirEnMaps() {
    if (!tramos.length) return;
    if (tramos.length > 1) {
      setAviso(
        `Tu ruta tiene más paradas de las que Google Maps admite en un solo enlace, así que se ha dividido en ${tramos.length} tramos. Ninguna parada se ha eliminado: abre cada tramo por separado.`,
      );
    } else {
      setAviso(null);
    }
    window.open(tramos[0], "_blank", "noopener,noreferrer");
  }

  function onGuardar() {
    const nombre = nombreRuta.trim() || `Mi ruta (${paradas.length} paradas)`;
    guardarRuta({ nombre, origen, volverAlOrigen: volver, slugs });
    setNombreRuta("");
    setAviso(`Ruta «${nombre}» guardada en este dispositivo.`);
  }

  return (
    <PageShell>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Planifica tu escapada
          </p>
          <h1 className="mt-2 flex items-center gap-3 font-display text-4xl text-foreground sm:text-5xl">
            <RouteIcon className="h-8 w-8 text-primary" /> Crea tu ruta
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Elige los castillos que quieres visitar, ordena las paradas a tu gusto y abre el
            recorrido en Google Maps. Todo se calcula en tu navegador, sin registro.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        {/* Selector */}
        <section aria-labelledby="seleccion-titulo">
          <h2 id="seleccion-titulo" className="font-display text-2xl text-foreground">
            1. Selecciona castillos
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
              Buscar por nombre
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Consuegra, Orgaz…"
                className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
              Provincia
              <select
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-2 text-sm text-foreground"
              >
                <option value="">Todas</option>
                {provincias.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
              Estado de conservación
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value as CategoriaCastillo | "")}
                className="h-10 rounded-md border border-input bg-background px-2 text-sm text-foreground"
              >
                <option value="">Todos</option>
                {CATEGORIAS.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.emoji} {c.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
            {resultados.length} castillo{resultados.length === 1 ? "" : "s"} ·{" "}
            <strong className="text-foreground">{slugs.length} seleccionado{slugs.length === 1 ? "" : "s"}</strong>
          </p>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {resultados.map((c) => {
              const cat = getCategoriaInfo(c.categoria);
              const acc = getAccesoCastilloInfo(c.slug);
              const seleccionado = slugs.includes(c.slug);
              return (
                <li
                  key={c.slug}
                  className={`flex gap-3 rounded-xl border bg-card p-3 transition-colors ${
                    seleccionado ? "border-primary ring-1 ring-primary/40" : "border-border"
                  }`}
                >
                  <img
                    src={c.imagen}
                    alt={`Castillo: ${c.nombre}`}
                    loading="lazy"
                    className="h-20 w-24 flex-shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium text-foreground">{c.nombre}</h3>
                    <p className="truncate text-xs text-muted-foreground">
                      {c.provincia} · {c.comunidad}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-1">
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
                        style={{ backgroundColor: cat.color }}
                      >
                        {cat.emoji} {cat.label}
                      </span>
                      {acc?.facilidad && (
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-foreground/80">
                          Acceso: {acc.facilidad}
                        </span>
                      )}
                      {c.acceso === "interior" && (
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-foreground/80">
                          Visita interior
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggle(c.slug)}
                        aria-pressed={seleccionado}
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                          seleccionado
                            ? "bg-primary text-primary-foreground"
                            : "border border-input bg-background text-foreground hover:bg-secondary"
                        }`}
                      >
                        {seleccionado ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                        {seleccionado ? "Quitar de la ruta" : "Añadir a mi ruta"}
                      </button>
                      <Link
                        to="/castillo/$slug"
                        params={{ slug: c.slug }}
                        className="text-xs text-primary hover:underline"
                      >
                        Ver ficha
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          {resultados.length === 0 && (
            <p className="mt-6 rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              No hay castillos con esos criterios.
            </p>
          )}
        </section>

        {/* Mi ruta */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-4">
            <h2 className="font-display text-2xl text-foreground">2. Mi ruta</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Esta ruta es temporal y desaparecerá cuando cierres o recargues la página.
            </p>

            <label className="mt-4 flex flex-col gap-1 text-xs font-medium text-muted-foreground">
              Lugar de origen
              <input
                type="text"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
                placeholder="Ej. Madrid, Plaza Mayor"
                className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
              />
            </label>
            <label className="mt-3 flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={volver}
                onChange={(e) => setVolver(e.target.checked)}
                className="h-4 w-4 rounded border-input"
              />
              Regresar al punto de origen
            </label>

            {paradas.length === 0 ? (
              <p className="mt-4 rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                Aún no has añadido paradas.
              </p>
            ) : (
              <ol className="mt-4 space-y-2">
                {paradas.map((c, i) => (
                  <li
                    key={c.slug}
                    className="flex items-center gap-2 rounded-lg border border-border bg-background p-2"
                  >
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{c.nombre}</p>
                      <p className="truncate text-xs text-muted-foreground">{c.provincia}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => mover(i, -1)}
                      disabled={i === 0}
                      aria-label={`Subir ${c.nombre}`}
                      className="rounded p-1 text-foreground/70 hover:bg-secondary disabled:opacity-30"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => mover(i, 1)}
                      disabled={i === paradas.length - 1}
                      aria-label={`Bajar ${c.nombre}`}
                      className="rounded p-1 text-foreground/70 hover:bg-secondary disabled:opacity-30"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggle(c.slug)}
                      aria-label={`Eliminar ${c.nombre} de la ruta`}
                      className="rounded p-1 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ol>
            )}

            {paradas.length > 1 && (
              <p className="mt-3 text-xs text-muted-foreground">
                Distancia aproximada en línea recta entre paradas: ~{distanciaTotal} km.
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={sugerirOrden}
                disabled={paradas.length < 3}
                className="inline-flex items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary disabled:opacity-40"
              >
                <Sparkles className="h-3.5 w-3.5" /> Sugerir un orden por proximidad
              </button>
              <button
                type="button"
                onClick={() => setSlugs([])}
                disabled={paradas.length === 0}
                className="inline-flex items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary disabled:opacity-40"
              >
                <Trash2 className="h-3.5 w-3.5" /> Vaciar ruta
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              La sugerencia por proximidad es solo una estimación por distancia en línea recta:
              no tiene en cuenta carreteras, tráfico, horarios ni tiempo real de conducción. Tu
              orden manual siempre manda.
            </p>

            <button
              type="button"
              onClick={abrirEnMaps}
              disabled={tramos.length === 0}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <MapIcon className="h-4 w-4" /> Abrir ruta en Google Maps
            </button>
            {tramos.length > 1 && (
              <div className="mt-3 rounded-md border border-border bg-secondary/40 p-3 text-xs text-foreground">
                <p className="font-medium">
                  Ruta dividida en {tramos.length} tramos (límite de Google Maps por enlace):
                </p>
                <ul className="mt-2 space-y-1">
                  {tramos.map((t, i) => (
                    <li key={t}>
                      <a
                        href={t}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" /> Abrir tramo {i + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {aviso && (
              <p className="mt-3 rounded-md bg-secondary/60 p-3 text-xs text-foreground" role="status">
                {aviso}
              </p>
            )}
          </div>

          {/* Guardado local */}
          <div className="mt-6 rounded-xl border border-border bg-card p-4">
            <h2 className="font-display text-xl text-foreground">
              Guardar esta ruta en este dispositivo
            </h2>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Tu ruta se guarda únicamente en este navegador. No se envía a Kdronazo ni se
              almacena en servidores. No podrás recuperarla desde otro dispositivo y desaparecerá
              si borras los datos del navegador.
            </p>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={nombreRuta}
                onChange={(e) => setNombreRuta(e.target.value)}
                placeholder="Nombre de la ruta"
                aria-label="Nombre de la ruta"
                className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm text-foreground"
              />
              <button
                type="button"
                onClick={onGuardar}
                disabled={paradas.length === 0}
                className="inline-flex items-center gap-1 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground hover:bg-secondary disabled:opacity-40"
              >
                <Save className="h-3.5 w-3.5" /> Guardar
              </button>
            </div>

            {rutasGuardadas.length > 0 && (
              <>
                <h3 className="mt-5 text-sm font-semibold text-foreground">Mis rutas guardadas</h3>
                <ul className="mt-2 space-y-2">
                  {rutasGuardadas.map((r) => (
                    <li
                      key={r.id}
                      className="flex items-center gap-2 rounded-lg border border-border bg-background p-2"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{r.nombre}</p>
                        <p className="text-xs text-muted-foreground">
                          {r.slugs.length} parada{r.slugs.length === 1 ? "" : "s"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSlugs(r.slugs);
                          setOrigen(r.origen);
                          setVolver(r.volverAlOrigen);
                          setNombreRuta(r.nombre);
                          setAviso(`Ruta «${r.nombre}» cargada. Puedes modificarla y volver a guardarla.`);
                        }}
                        className="rounded-md border border-input px-2 py-1 text-xs text-foreground hover:bg-secondary"
                      >
                        Abrir
                      </button>
                      <button
                        type="button"
                        onClick={() => eliminarRuta(r.id)}
                        aria-label={`Eliminar ruta ${r.nombre}`}
                        className="rounded p-1 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("¿Eliminar todas las rutas guardadas en este dispositivo?")) {
                      eliminarTodasLasRutas();
                    }
                  }}
                  className="mt-3 text-xs text-destructive hover:underline"
                >
                  Eliminar todas mis rutas guardadas
                </button>
              </>
            )}
          </div>
        </aside>
      </div>
    </PageShell>
  );
}