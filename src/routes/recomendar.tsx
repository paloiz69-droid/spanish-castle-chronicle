import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/recomendar")({
  head: () => ({
    meta: [
      { title: "Recomienda un castillo — Kdronazo" },
      { name: "description", content: "Propón un castillo para futuros reportajes aéreos del canal Kdronazo." },
    ],
  }),
  component: RecomendarPage,
});

const schema = z.object({
  nombre: z.string().trim().min(1, "Indica tu nombre").max(100),
  email: z.string().trim().email("Correo electrónico no válido").max(255),
  castillo: z.string().trim().min(1, "Indica el nombre del castillo").max(150),
  provincia: z.string().trim().min(1, "Indica la provincia").max(100),
  comentario: z.string().trim().max(2000).optional().or(z.literal("")),
});

function RecomendarPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/contactokdronazo@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `🏰 Nueva recomendación: ${parsed.data.castillo} (${parsed.data.provincia})`,
          _template: "table",
          _captcha: "false",
          Nombre: parsed.data.nombre,
          Email: parsed.data.email,
          Castillo: parsed.data.castillo,
          Provincia: parsed.data.provincia,
          Comentario: parsed.data.comentario || "(sin comentario)",
          Origen: "Web Kdronazo · Recomienda un castillo",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido");
      setStatus("error");
    }
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="font-display text-4xl text-foreground sm:text-5xl">🏰 Recomienda un castillo</h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            ¿Conoces un castillo interesante? ¿Una fortaleza olvidada? ¿Un lugar con historia que merece
            ser documentado? Envíame tu propuesta y podría formar parte de un futuro reportaje de Kdronazo.
          </p>
        </header>

        {status === "ok" ? (
          <div className="rounded-xl border border-primary/40 bg-primary/10 p-8 text-center">
            <div className="text-4xl">✅</div>
            <h2 className="mt-3 font-display text-2xl text-foreground">¡Gracias por tu propuesta!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Kdronazo ha recibido tu mensaje. Revisaremos tu recomendación para futuros reportajes.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Enviar otra recomendación
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-border/70 bg-card p-6 sm:p-8">
            <Field label="Tu nombre" name="nombre" error={errors.nombre} required />
            <Field label="Tu correo electrónico" name="email" type="email" error={errors.email} required />
            <Field label="Nombre del castillo recomendado" name="castillo" error={errors.castillo} required />
            <Field label="Provincia" name="provincia" error={errors.provincia} required />
            <div>
              <label className="block text-sm font-medium text-foreground">Comentario o información adicional</label>
              <textarea
                name="comentario"
                rows={5}
                maxLength={2000}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Ubicación aproximada, historia, estado actual, accesos…"
              />
              {errors.comentario && <p className="mt-1 text-xs text-destructive">{errors.comentario}</p>}
            </div>

            {status === "error" && (
              <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                No se pudo enviar el mensaje ({errorMsg}). Inténtalo de nuevo o escribe directamente a contactokdronazo@gmail.com.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {status === "sending" ? "Enviando…" : "📩 Enviar recomendación"}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Tu mensaje llegará a <span className="font-medium">contactokdronazo@gmail.com</span>.
            </p>
          </form>
        )}
      </section>
    </PageShell>
  );
}

function Field({
  label, name, type = "text", error, required,
}: { label: string; name: string; type?: string; error?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={255}
        className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}