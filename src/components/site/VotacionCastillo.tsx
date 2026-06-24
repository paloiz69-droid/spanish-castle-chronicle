import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Opcion = "visitado" | "pendiente";

const STORAGE_KEY = "kdronazo_voter_id";

function getVoterId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

export function VotacionCastillo({ slug }: { slug: string }) {
  const [voterId, setVoterId] = useState<string>("");
  const [miVoto, setMiVoto] = useState<Opcion | null>(null);
  const [visitado, setVisitado] = useState(0);
  const [pendiente, setPendiente] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<Opcion | null>(null);

  useEffect(() => {
    const id = getVoterId();
    setVoterId(id);
    let cancelado = false;

    (async () => {
      const [{ data: todos }, { data: mio }] = await Promise.all([
        supabase
          .from("castillo_votos")
          .select("opcion")
          .eq("castillo_slug", slug),
        supabase
          .from("castillo_votos")
          .select("opcion")
          .eq("castillo_slug", slug)
          .eq("voter_id", id)
          .maybeSingle(),
      ]);
      if (cancelado) return;
      if (todos) {
        setVisitado(todos.filter((v) => v.opcion === "visitado").length);
        setPendiente(todos.filter((v) => v.opcion === "pendiente").length);
      }
      if (mio?.opcion === "visitado" || mio?.opcion === "pendiente") {
        setMiVoto(mio.opcion as Opcion);
      }
      setLoading(false);
    })();

    return () => {
      cancelado = true;
    };
  }, [slug]);

  async function votar(opcion: Opcion) {
    if (!voterId || submitting) return;
    setSubmitting(opcion);
    const anterior = miVoto;

    // Optimista
    setMiVoto(opcion);
    if (opcion === "visitado") {
      setVisitado((n) => n + (anterior === "visitado" ? 0 : 1));
      if (anterior === "pendiente") setPendiente((n) => Math.max(0, n - 1));
    } else {
      setPendiente((n) => n + (anterior === "pendiente" ? 0 : 1));
      if (anterior === "visitado") setVisitado((n) => Math.max(0, n - 1));
    }

    const { error } = await supabase
      .from("castillo_votos")
      .upsert(
        { castillo_slug: slug, voter_id: voterId, opcion },
        { onConflict: "castillo_slug,voter_id" },
      );

    if (error) {
      // Revertir
      setMiVoto(anterior);
      if (opcion === "visitado") {
        setVisitado((n) => Math.max(0, n - (anterior === "visitado" ? 0 : 1)));
        if (anterior === "pendiente") setPendiente((n) => n + 1);
      } else {
        setPendiente((n) => Math.max(0, n - (anterior === "pendiente" ? 0 : 1)));
        if (anterior === "visitado") setVisitado((n) => n + 1);
      }
    }
    setSubmitting(null);
  }

  const baseBtn =
    "flex-1 inline-flex items-center justify-center gap-2 rounded-md border px-4 py-3 text-sm font-medium transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100";

  return (
    <div className="rounded-xl border border-border/70 bg-gradient-to-br from-card to-secondary/40 p-5 sm:p-6">
      <h3 className="font-display text-xl text-foreground sm:text-2xl">
        ¿Has visitado este castillo?
      </h3>
      <p className="mt-1 text-xs italic text-muted-foreground">
        Tu voto se guarda de forma anónima en este dispositivo.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => votar("visitado")}
          disabled={!voterId || submitting !== null}
          aria-pressed={miVoto === "visitado"}
          className={`${baseBtn} ${
            miVoto === "visitado"
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border/70 bg-background hover:border-primary/60"
          }`}
        >
          <span aria-hidden>👍</span> Sí, lo he visitado
        </button>
        <button
          type="button"
          onClick={() => votar("pendiente")}
          disabled={!voterId || submitting !== null}
          aria-pressed={miVoto === "pendiente"}
          className={`${baseBtn} ${
            miVoto === "pendiente"
              ? "border-accent bg-accent text-accent-foreground shadow-sm"
              : "border-border/70 bg-background hover:border-accent/60"
          }`}
        >
          <span aria-hidden>📍</span> Está en mi lista pendiente
        </button>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-foreground/85 sm:grid-cols-2">
        <p>
          <span aria-hidden>👍</span>{" "}
          <span className="font-semibold">Lo han visitado:</span>{" "}
          {loading ? "…" : `${visitado} ${visitado === 1 ? "persona" : "personas"}`}
        </p>
        <p>
          <span aria-hidden>📍</span>{" "}
          <span className="font-semibold">Lo tienen pendiente:</span>{" "}
          {loading ? "…" : `${pendiente} ${pendiente === 1 ? "persona" : "personas"}`}
        </p>
      </div>

      {miVoto && (
        <p className="mt-3 text-xs text-muted-foreground">
          ¡Gracias por tu voto! Puedes cambiarlo cuando quieras.
        </p>
      )}
    </div>
  );
}