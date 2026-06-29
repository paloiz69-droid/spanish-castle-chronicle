import { Phone, Mail, Globe, Ticket, Clock, Building2, Mail as MailIcon } from "lucide-react";
import type { Castillo } from "@/data/castillos";

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
        <div className="mt-0.5 break-words text-sm text-foreground/90">{children}</div>
      </div>
    </div>
  );
}

export function InformacionContacto({ castillo }: { castillo: Castillo }) {
  const c = castillo.contactoOficial;

  const hasAny =
    c &&
    (c.telefono ||
      c.telefonoSecundario ||
      c.email ||
      c.webOficial ||
      c.reservasUrl ||
      c.horarioAtencion ||
      c.gestor);

  return (
    <section>
      <h2 className="font-display text-2xl text-foreground sm:text-3xl">
        Información y contacto
      </h2>
      {!hasAny ? (
        <p className="mt-4 rounded-xl border border-border/70 bg-card/60 p-5 text-sm italic text-muted-foreground">
          Actualmente no existe un contacto oficial disponible para este castillo.
        </p>
      ) : (
        <div className="mt-4 space-y-5 rounded-xl border border-border/70 bg-card/60 p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {c!.gestor && (
              <Row icon={Building2} label="Gestión">
                {c!.gestor}
              </Row>
            )}
            {c!.telefono && (
              <Row icon={Phone} label={c!.telefono.tipo ? `Teléfono · ${c!.telefono.tipo}` : "Teléfono"}>
                <a href={`tel:${c!.telefono.valor.replace(/\s+/g, "")}`} className="hover:underline">
                  {c!.telefono.valor}
                </a>
              </Row>
            )}
            {c!.telefonoSecundario && (
              <Row
                icon={Phone}
                label={
                  c!.telefonoSecundario.tipo
                    ? `Teléfono · ${c!.telefonoSecundario.tipo}`
                    : "Teléfono secundario"
                }
              >
                <a
                  href={`tel:${c!.telefonoSecundario.valor.replace(/\s+/g, "")}`}
                  className="hover:underline"
                >
                  {c!.telefonoSecundario.valor}
                </a>
              </Row>
            )}
            {c!.email && (
              <Row icon={Mail} label="Correo electrónico">
                <a href={`mailto:${c!.email}`} className="hover:underline">
                  {c!.email}
                </a>
              </Row>
            )}
            {c!.webOficial && (
              <Row icon={Globe} label="Página web oficial">
                <a
                  href={c!.webOficial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {c!.webOficial.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              </Row>
            )}
            {c!.reservasUrl && (
              <Row icon={Ticket} label="Reservas y entradas">
                <a
                  href={c!.reservasUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {c!.reservasUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              </Row>
            )}
            {c!.horarioAtencion && (
              <Row icon={Clock} label="Horario de atención">
                {c!.horarioAtencion}
              </Row>
            )}
          </div>

          {c!.notas && (
            <p className="text-xs italic text-muted-foreground">{c!.notas}</p>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {c!.email && (
              <a
                href={`mailto:${c!.email}`}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:scale-[1.02]"
              >
                <MailIcon className="h-4 w-4" /> Contactar
              </a>
            )}
            {!c!.email && c!.webOficial && (
              <a
                href={c!.webOficial}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:scale-[1.02]"
              >
                <Globe className="h-4 w-4" /> Contactar
              </a>
            )}
            {c!.reservasUrl && (
              <a
                href={c!.reservasUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-background px-4 py-2 text-sm font-medium text-primary shadow-sm transition-transform hover:scale-[1.02]"
              >
                <Ticket className="h-4 w-4" /> Reservar / Entradas
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}