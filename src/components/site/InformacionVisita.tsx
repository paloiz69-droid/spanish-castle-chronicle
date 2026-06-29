import {
  Phone,
  Mail,
  Globe,
  User,
  Clock,
  CalendarX,
  Ticket,
  Users,
  CalendarCheck,
  MapPin,
  Building2,
  Map,
  Navigation,
  Car,
  ParkingCircle,
  Accessibility,
  Footprints,
  Timer,
  CloudSun,
  Backpack,
  ShieldAlert,
  Toilet,
  Info as InfoIcon,
  Trees,
  Utensils,
  Droplet,
  Tent,
  BookOpen,
} from "lucide-react";
import type {
  Castillo,
  InformacionVisita as VisitaInfo,
  ServiciosVisita,
} from "@/data/castillos";
import { getDireccionesUrl } from "@/data/castillos";

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-card p-3">
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
      <div className="min-w-0">
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
        <div className="mt-0.5 break-words text-sm text-foreground/90">{value}</div>
      </div>
    </div>
  );
}

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const arr = Array.isArray(children) ? children.filter(Boolean) : [children].filter(Boolean);
  if (arr.length === 0) return null;
  return (
    <div>
      <h3 className="font-display text-lg text-foreground">{title}</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">{arr}</div>
    </div>
  );
}

const SERVICIOS_META: {
  key: keyof ServiciosVisita;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "aparcamiento", label: "Aparcamiento", icon: ParkingCircle },
  { key: "aseos", label: "Aseos", icon: Toilet },
  { key: "centroInterpretacion", label: "Centro de interpretación", icon: BookOpen },
  { key: "areaRecreativa", label: "Área recreativa", icon: Trees },
  { key: "restauranteCercano", label: "Restaurante cercano", icon: Utensils },
  { key: "fuenteAgua", label: "Fuente de agua", icon: Droplet },
  { key: "zonaPicnic", label: "Zona de picnic", icon: Tent },
  { key: "puntoInformacion", label: "Punto de información", icon: InfoIcon },
];

function siNo(v?: boolean) {
  return v === undefined ? null : v ? "Sí" : "No";
}

export function InformacionVisita({ castillo }: { castillo: Castillo }) {
  const v: VisitaInfo | undefined = castillo.visita;
  if (!v) return null;

  const hasContacto = v.telefono || v.email || v.webOficial || v.gestor;
  const hasTuristica =
    v.horario ||
    v.diasCierre ||
    v.precioEntrada ||
    v.visitasGuiadas !== undefined ||
    v.reservaPrevia !== undefined;
  const hasLocalizacion = v.direccion || v.municipio;
  const hasAccesibilidad =
    v.accesoCoche || v.parking || v.movilidadReducida || v.dificultad || v.tiempoDesdeParking;
  const serviciosActivos = v.servicios
    ? SERVICIOS_META.filter((s) => v.servicios?.[s.key])
    : [];
  const hasPractica = v.mejorEpoca || v.duracionVisita || v.queLlevar || v.recomendaciones;

  if (
    !hasContacto &&
    !hasTuristica &&
    !hasLocalizacion &&
    !hasAccesibilidad &&
    serviciosActivos.length === 0 &&
    !hasPractica
  ) {
    return null;
  }

  const direccionesUrl = getDireccionesUrl(castillo);

  return (
    <section>
      <h2 className="font-display text-2xl text-foreground sm:text-3xl">
        Información para la visita
      </h2>
      <div className="mt-4 space-y-6 rounded-xl border border-border/70 bg-card/60 p-5 sm:p-6">
        {hasContacto && (
          <Group title="Contacto">
            {v.telefono && (
              <Field
                icon={Phone}
                label="Teléfono"
                value={
                  <a href={`tel:${v.telefono}`} className="hover:underline">
                    {v.telefono}
                  </a>
                }
              />
            )}
            {v.email && (
              <Field
                icon={Mail}
                label="Email"
                value={
                  <a href={`mailto:${v.email}`} className="hover:underline">
                    {v.email}
                  </a>
                }
              />
            )}
            {v.webOficial && (
              <Field
                icon={Globe}
                label="Web oficial"
                value={
                  <a
                    href={v.webOficial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {v.webOficial.replace(/^https?:\/\//, "")}
                  </a>
                }
              />
            )}
            {v.gestor && <Field icon={User} label="Gestión" value={v.gestor} />}
          </Group>
        )}

        {hasTuristica && (
          <Group title="Información turística">
            {v.horario && <Field icon={Clock} label="Horario" value={v.horario} />}
            {v.diasCierre && (
              <Field icon={CalendarX} label="Días de cierre" value={v.diasCierre} />
            )}
            {v.precioEntrada && (
              <Field icon={Ticket} label="Entrada" value={v.precioEntrada} />
            )}
            {v.visitasGuiadas !== undefined && (
              <Field icon={Users} label="Visitas guiadas" value={siNo(v.visitasGuiadas)} />
            )}
            {v.reservaPrevia !== undefined && (
              <Field
                icon={CalendarCheck}
                label="Reserva previa"
                value={siNo(v.reservaPrevia)}
              />
            )}
          </Group>
        )}

        {(hasLocalizacion || true) && (
          <Group title="Localización">
            {v.direccion && <Field icon={MapPin} label="Dirección" value={v.direccion} />}
            {v.municipio && (
              <Field icon={Building2} label="Municipio" value={v.municipio} />
            )}
            <Field
              icon={Map}
              label="Provincia"
              value={`${castillo.provincia} (${castillo.comunidad})`}
            />
            <Field
              icon={Navigation}
              label="Coordenadas GPS"
              value={
                <span className="font-mono text-xs">
                  {castillo.coordenadas[0].toFixed(6)}, {castillo.coordenadas[1].toFixed(6)}
                </span>
              }
            />
            <div className="sm:col-span-2">
              <a
                href={direccionesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:scale-[1.02]"
              >
                <Navigation className="h-4 w-4" /> Cómo llegar
              </a>
            </div>
          </Group>
        )}

        {hasAccesibilidad && (
          <Group title="Accesibilidad">
            {v.accesoCoche && (
              <Field icon={Car} label="Acceso en coche" value={v.accesoCoche} />
            )}
            {v.parking && (
              <Field icon={ParkingCircle} label="Aparcamiento" value={v.parking} />
            )}
            {v.movilidadReducida && (
              <Field
                icon={Accessibility}
                label="Movilidad reducida"
                value={v.movilidadReducida}
              />
            )}
            {v.dificultad && (
              <Field
                icon={Footprints}
                label="Dificultad"
                value={v.dificultad[0].toUpperCase() + v.dificultad.slice(1)}
              />
            )}
            {v.tiempoDesdeParking && (
              <Field
                icon={Timer}
                label="Tiempo desde el aparcamiento"
                value={v.tiempoDesdeParking}
              />
            )}
          </Group>
        )}

        {serviciosActivos.length > 0 && (
          <div>
            <h3 className="font-display text-lg text-foreground">Servicios</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {serviciosActivos.map(({ key, label, icon: Icon }) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/60 px-3 py-1 text-xs text-foreground/85"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" /> {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {hasPractica && (
          <Group title="Información práctica">
            {v.mejorEpoca && (
              <Field icon={CloudSun} label="Mejor época" value={v.mejorEpoca} />
            )}
            {v.duracionVisita && (
              <Field icon={Timer} label="Duración recomendada" value={v.duracionVisita} />
            )}
            {v.queLlevar && <Field icon={Backpack} label="Qué llevar" value={v.queLlevar} />}
            {v.recomendaciones && (
              <Field icon={ShieldAlert} label="Recomendaciones" value={v.recomendaciones} />
            )}
          </Group>
        )}
      </div>
    </section>
  );
}