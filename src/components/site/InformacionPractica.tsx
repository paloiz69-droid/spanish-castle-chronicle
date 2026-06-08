import { MapPin, Info } from "lucide-react";
import {
  getAccesoInfo,
  getPrecioInfo,
  getAparcamientoInfo,
  NOTA_DRONES,
  type Castillo,
} from "@/data/castillos";

function Badge({
  color,
  emoji,
  label,
  sub,
}: {
  color: string;
  emoji: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-card p-3">
      <span
        className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-base text-white"
        style={{ backgroundColor: color }}
        aria-hidden
      >
        {emoji}
      </span>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-foreground">{label}</div>
        {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
      </div>
    </div>
  );
}

export function InformacionPractica({ castillo }: { castillo: Castillo }) {
  const acceso = getAccesoInfo(castillo.acceso);
  const precio = getPrecioInfo(castillo.precio);
  const aparcamiento = getAparcamientoInfo(castillo.aparcamiento);
  const direccionesUrl = getDireccionesUrl(castillo);
  const [lat, lng] = castillo.coordenadas;

  const tieneAlgo =
    acceso ||
    precio ||
    aparcamiento ||
    castillo.comoLlegar ||
    castillo.infoPractica ||
    castillo.notaDrones;

  // Si todavía no hay datos prácticos cargados, no mostramos la sección.
  if (!tieneAlgo) return null;

  return (
    <section>
      <h2 className="font-display text-2xl text-foreground sm:text-3xl">
        Información práctica para la visita
      </h2>
      <div className="mt-4 space-y-5">
        {(acceso || precio || aparcamiento) && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {acceso && (
              <Badge
                color={acceso.color}
                emoji={acceso.emoji}
                label={acceso.label}
                sub={acceso.descripcion}
              />
            )}
            {precio && (
              <Badge
                color={precio.color}
                emoji={precio.emoji}
                label={precio.label}
                sub={precio.descripcion}
              />
            )}
            {aparcamiento && (
              <Badge
                color={aparcamiento.color}
                emoji={aparcamiento.emoji}
                label={`Aparcamiento: ${aparcamiento.label}`}
                sub={aparcamiento.descripcion}
              />
            )}
          </div>
        )}

        <div className="rounded-lg border border-border/70 bg-card p-4">
          <h3 className="flex items-center gap-2 font-display text-lg text-foreground">
            <MapPin className="h-4 w-4 text-primary" /> Coordenadas GPS
          </h3>
          <p className="mt-1 font-mono text-sm text-foreground/85">
            {lat.toFixed(6)}, {lng.toFixed(6)}
          </p>
          <a
            href={direccionesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            <Navigation className="h-4 w-4" /> Cómo llegar en Google Maps
          </a>
        </div>

        {castillo.comoLlegar && (
          <div className="rounded-lg border border-border/70 bg-card p-4">
            <h3 className="font-display text-lg text-foreground">Cómo llegar</h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
              {castillo.comoLlegar}
            </p>
          </div>
        )}

        {castillo.infoPractica && (
          <div className="rounded-lg border border-border/70 bg-card p-4">
            <h3 className="font-display text-lg text-foreground">Notas para la visita</h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
              {castillo.infoPractica}
            </p>
          </div>
        )}

        <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-foreground/85">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
          <p>{castillo.notaDrones ?? NOTA_DRONES}</p>
        </div>
      </div>
    </section>
  );
}