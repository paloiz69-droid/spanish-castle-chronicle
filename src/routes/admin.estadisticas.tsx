import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { CASTILLOS } from "@/data/castillos";
import { fetchAdminStats, verificarPasswordAdmin } from "@/lib/admin-stats.functions";

const PASS_KEY = "kdronazo_admin_pass";

export const Route = createFileRoute("/admin/estadisticas")({
  head: () => ({
    meta: [
      { title: "Panel de estadísticas — Kdronazo" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type AdminData = Awaited<ReturnType<typeof fetchAdminStats>>;

function AdminPage() {
  const verify = useServerFn(verificarPasswordAdmin);
  const getStats = useServerFn(fetchAdminStats);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(false);
  const [dias, setDias] = useState(90);

  // Auto-restore
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.sessionStorage.getItem(PASS_KEY);
    if (saved) {
      setPassword(saved);
      (async () => {
        const res = await verify({ data: { password: saved } });
        if (res.ok) setAuthed(true);
        else window.sessionStorage.removeItem(PASS_KEY);
      })();
    }
  }, [verify]);

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    getStats({ data: { password, dias } })
      .then((d) => setData(d as AdminData))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [authed, dias, password, getStats]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await verify({ data: { password } });
    if (res.ok) {
      window.sessionStorage.setItem(PASS_KEY, password);
      setAuthed(true);
    } else {
      setError("Contraseña incorrecta");
    }
  }

  const nombres = useMemo(() => new Map(CASTILLOS.map((c) => [c.slug, c.nombre])), []);
  const rankingOrd = useMemo(
    () => (data ? [...data.ranking].sort((a, b) => Number(b.total) - Number(a.total)) : []),
    [data],
  );
  const menosConsultados = useMemo(() => {
    if (!data) return [] as Array<{ slug: string; nombre: string; total: number }>;
    const conDatos = new Map(data.ranking.map((r) => [r.castillo_slug, r]));
    return CASTILLOS.map((c) => ({
      slug: c.slug,
      nombre: c.nombre,
      total: Number(conDatos.get(c.slug)?.total ?? 0),
    })).sort((a, b) => a.total - b.total);
  }, [data]);
  const maxVisitas = Math.max(1, ...(data?.timeseries.map((t) => Number(t.visitas)) ?? [1]));

  if (!authed) {
    return (
      <PageShell>
        <div className="mx-auto max-w-md px-4 py-24">
          <h1 className="font-display text-3xl">Panel de estadísticas</h1>
          <p className="mt-2 text-sm text-muted-foreground">Acceso restringido.</p>
          <form onSubmit={submit} className="mt-6 space-y-3">
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder="Contraseña"
            />
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Entrar
            </button>
          </form>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl">📊 Panel de estadísticas</h1>
          <div className="flex items-center gap-2 text-sm">
            <label>
              Rango:
              <select
                value={dias}
                onChange={(e) => setDias(Number(e.target.value))}
                className="ml-2 rounded-md border border-border bg-background px-2 py-1"
              >
                <option value={7}>7 días</option>
                <option value={30}>30 días</option>
                <option value={90}>90 días</option>
                <option value={365}>365 días</option>
              </select>
            </label>
            <button
              onClick={() => {
                window.sessionStorage.removeItem(PASS_KEY);
                setAuthed(false);
                setData(null);
              }}
              className="rounded-md border border-border px-3 py-1 hover:bg-secondary"
            >
              Salir
            </button>
          </div>
        </div>

        {loading && <p className="mt-6 text-sm text-muted-foreground">Cargando…</p>}

        {data && (
          <>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Stat label="Visitas totales" value={data.totalVisitas.toLocaleString("es-ES")} />
              <Stat label="Visitantes únicos" value={data.totalUnicos.toLocaleString("es-ES")} />
              <Stat label="Castillos con visitas" value={data.ranking.length.toLocaleString("es-ES")} />
            </div>

            <div className="mt-8 rounded-xl border border-border/70 bg-card p-5">
              <h2 className="font-display text-xl">Evolución temporal</h2>
              <div className="mt-4 flex h-48 items-end gap-1">
                {data.timeseries.map((t) => (
                  <div
                    key={t.dia}
                    title={`${t.dia}: ${t.visitas} visitas · ${t.unicos} únicos`}
                    className="flex-1 rounded-t bg-primary/70 hover:bg-primary"
                    style={{ height: `${(t.visitas / maxVisitas) * 100}%`, minHeight: "2px" }}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {data.timeseries.length} días · Pasa el ratón sobre las barras para ver los valores.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border/70 bg-card p-5">
                <h2 className="font-display text-xl">🏆 Más consultados</h2>
                <ol className="mt-3 space-y-1 text-sm">
                  {rankingOrd.slice(0, 25).map((r, i) => (
                    <li key={r.castillo_slug} className="flex justify-between gap-2 border-b border-border/40 py-1">
                      <span>
                        <span className="text-muted-foreground">{i + 1}.</span>{" "}
                        {nombres.get(r.castillo_slug) || r.castillo_slug}
                      </span>
                      <span className="font-semibold">{Number(r.total).toLocaleString("es-ES")}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-xl border border-border/70 bg-card p-5">
                <h2 className="font-display text-xl">📉 Menos consultados</h2>
                <ol className="mt-3 space-y-1 text-sm">
                  {menosConsultados.slice(0, 25).map((r, i) => (
                    <li key={r.slug} className="flex justify-between gap-2 border-b border-border/40 py-1">
                      <span>
                        <span className="text-muted-foreground">{i + 1}.</span> {r.nombre}
                      </span>
                      <span className="font-semibold">{r.total.toLocaleString("es-ES")}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-border/70 bg-card p-5">
              <h2 className="font-display text-xl">📈 Crecimiento (30d vs 30d anteriores)</h2>
              <table className="mt-3 w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-2">Castillo</th>
                    <th className="py-2 text-right">Últ. 30d</th>
                    <th className="py-2 text-right">30d anteriores</th>
                    <th className="py-2 text-right">% cambio</th>
                  </tr>
                </thead>
                <tbody>
                  {[...data.ranking]
                    .sort((a, b) => Number(b.ult30) - Number(a.ult30))
                    .slice(0, 20)
                    .map((r) => {
                      const ult = Number(r.ult30);
                      const prev = Number(r.prev30);
                      const pct = prev === 0 ? (ult > 0 ? 100 : 0) : Math.round(((ult - prev) / prev) * 100);
                      return (
                        <tr key={r.castillo_slug} className="border-b border-border/40">
                          <td className="py-1">{nombres.get(r.castillo_slug) || r.castillo_slug}</td>
                          <td className="py-1 text-right">{ult}</td>
                          <td className="py-1 text-right">{prev}</td>
                          <td
                            className={`py-1 text-right ${pct > 0 ? "text-emerald-600" : pct < 0 ? "text-rose-600" : ""}`}
                          >
                            {pct > 0 ? "+" : ""}
                            {pct}%
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </PageShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl">{value}</div>
    </div>
  );
}