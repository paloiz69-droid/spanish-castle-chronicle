import {
  Car,
  ParkingCircle,
  Footprints,
  Clock,
  Mountain,
  Users,
  Baby,
  Accessibility,
  AlertTriangle,
  ShoppingBag,
  MapPin,
} from "lucide-react";
import {
  getFacilidadAccesoInfo,
  TERRENOS_LABEL,
  type Castillo,
} from "@/data/castillos";
import { getAccesoCastilloInfo } from "@/data/castillos-extra";

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-card p-3">
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
        <div className="mt-0.5 text-sm text-foreground/90">{children}</div>
      </div>
    </div>
  );
}

function YesNo({ value }: { value?: boolean }) {
  if (value === undefined) return <>Por confirmar</>;
  return <>{value ? "Sí" : "No"}</>;
}

export function AccesoCastillo({ castillo }: { castillo: Castillo }) {
  const acc = getAccesoCastilloInfo(castillo.slug);
  if (!acc) return null;

  const info = getFacilidadAccesoInfo(acc.facilidad);
  if (!info) return null;

  const aptitudes: { label: string; v?: boolean; icon: typeof Users }[] = [
    { label: "Personas mayores", v: acc.aptoMayores, icon: Users },
    { label: "Familias con niños", v: acc.aptoFamilias, icon: Baby },
    { label: "Movilidad reducida", v: acc.aptoMovilidadReducida, icon: Accessibility },
  ].filter((a) => a.v !== undefined);

  return (
    <section>
      <h2 className="flex items-center gap-2 font-display text-2xl text-foreground sm:text-3xl">
        <Footprints className="h-6 w-6 text-primary" /> Acceso al castillo
      </h2>

      <div className="mt-4 space-y-4">
        {/* Estado de facilidad */}
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

        {/* Datos clave */}
        <div className="grid gap-3 sm:grid-cols-2">
          {acc.cocheHastaEntrada !== undefined && (
            <Row icon={Car} label="Coche hasta la entrada">
              <YesNo value={acc.cocheHastaEntrada} />
            </Row>
          )}
          {acc.aparcamientoCercano !== undefined && (
            <Row icon={ParkingCircle} label="Aparcamiento cercano">
              <YesNo value={acc.aparcamientoCercano} />
            </Row>
          )}
          {acc.caminataMinutos && (
            <Row icon={Clock} label="Tiempo a pie">
              {acc.caminataMinutos}
            </Row>
          )}
          {acc.distanciaAPie && (
            <Row icon={Footprints} label="Distancia a pie">
              {acc.distanciaAPie}
            </Row>
          )}
          {acc.dificultadDescripcion && (
            <Row icon={Mountain} label="Dificultad">
              {acc.dificultadDescripcion}
            </Row>
          )}
          {acc.terreno && acc.terreno.length > 0 && (
            <Row icon={Mountain} label="Tipo de terreno">
              {acc.terreno.map((t) => TERRENOS_LABEL[t]).join(" · ")}
            </Row>
          )}
        </div>

        {/* Aptitud */}
        {aptitudes.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-3">
            {aptitudes.map((a) => (
              <Row key={a.label} icon={a.icon} label={a.label}>
                <YesNo value={a.v} />
              </Row>
            ))}
          </div>
        )}

        {/* Recomendaciones */}
        {(acc.calzadoRecomendado || acc.mejorAparcamiento || acc.coordenadasAparcamiento) && (
          <div className="grid gap-3 sm:grid-cols-2">
            {acc.calzadoRecomendado && (
              <Row icon={ShoppingBag} label="Calzado recomendado">
                {acc.calzadoRecomendado}
              </Row>
            )}
            {acc.mejorAparcamiento && (
              <Row icon={ParkingCircle} label="Mejor aparcamiento">
                {acc.mejorAparcamiento}
              </Row>
            )}
            {acc.coordenadasAparcamiento && (
              <Row icon={MapPin} label="Coordenadas del aparcamiento">
                <span className="font-mono">
                  {acc.coordenadasAparcamiento[0].toFixed(6)},{" "}
                  {acc.coordenadasAparcamiento[1].toFixed(6)}
                </span>
              </Row>
            )}
          </div>
        )}

        {/* Restricciones */}
        {acc.restricciones && (
          <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-card p-4 text-sm text-foreground/85">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            <p>{acc.restricciones}</p>
          </div>
        )}

        {/* Advertencias */}
        {acc.advertencias && (
          <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-foreground/85">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
            <p>{acc.advertencias}</p>
          </div>
        )}
      </div>
    </section>
  );
}