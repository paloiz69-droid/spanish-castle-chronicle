import { Plane, MapPin, Info, AlertTriangle, ScrollText } from "lucide-react";
import {
  AVISO_LEGAL_DRON,
  getEntornoDronInfo,
  type Castillo,
} from "@/data/castillos";
import { getVueloDronInfo } from "@/data/castillos-extra";

export function InformacionDron({ castillo }: { castillo: Castillo }) {
  const dron = getVueloDronInfo(castillo.slug);
  if (!dron) return null;

  const info = getEntornoDronInfo(dron.entorno);
  if (!info) return null;

  const [lat, lng] = castillo.coordenadas;

  return (
    <section>
      <h2 className="flex items-center gap-2 font-display text-2xl text-foreground sm:text-3xl">
        <Plane className="h-6 w-6 text-primary" /> Información para vuelo con dron
      </h2>

      <div className="mt-4 space-y-4">
        {/* Estado */}
        <div
          className="flex items-start gap-3 rounded-lg border p-4"
          style={{ borderColor: `${info.color}66`, backgroundColor: `${info.color}14` }}
        >
          <span
            aria-hidden
            className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg text-white"
            style={{ backgroundColor: info.color }}
          >
            {info.emoji}
          </span>
          <div className="min-w-0">
            <div className="font-display text-lg text-foreground">{info.label}</div>
            <p className="mt-1 text-sm text-foreground/85">{info.descripcion}</p>
          </div>
        </div>

        {/* Datos */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/70 bg-card p-3">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Municipio
            </div>
            <div className="mt-0.5 text-sm text-foreground/90">{castillo.provincia}</div>
          </div>
          <div className="rounded-lg border border-border/70 bg-card p-3">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Provincia / Comunidad
            </div>
            <div className="mt-0.5 text-sm text-foreground/90">
              {castillo.provincia}, {castillo.comunidad}
            </div>
          </div>
          <div className="rounded-lg border border-border/70 bg-card p-3 sm:col-span-2">
            <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <MapPin className="h-3 w-3" /> Coordenadas GPS
            </div>
            <div className="mt-0.5 font-mono text-sm text-foreground/90">
              {lat.toFixed(6)}, {lng.toFixed(6)}
            </div>
          </div>
        </div>

        {/* Justificación */}
        <div className="rounded-lg border border-border/70 bg-card p-4">
          <h3 className="flex items-center gap-2 font-display text-lg text-foreground">
            <Info className="h-4 w-4 text-primary" /> Justificación
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">{dron.justificacion}</p>
          {dron.notas && (
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">{dron.notas}</p>
          )}
          <p className="mt-3 flex items-start gap-2 text-xs italic text-muted-foreground">
            <ScrollText className="mt-0.5 h-3 w-3 flex-shrink-0" />
            Clasificación realizada conforme al análisis del artículo 40 del Real Decreto
            517/2024, de 4 de junio.
          </p>
        </div>

        {/* Aviso legal */}
        <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-foreground/85">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
          <p>{AVISO_LEGAL_DRON}</p>
        </div>
      </div>
    </section>
  );
}