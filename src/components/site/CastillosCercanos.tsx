import { Link } from "@tanstack/react-router";
import { CASTILLOS, type Castillo } from "@/data/castillos";

function distanciaKm(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function CastillosCercanos({ castillo }: { castillo: Castillo }) {
  const cercanos = CASTILLOS.filter((c) => c.slug !== castillo.slug)
    .map((c) => ({ c, km: distanciaKm(castillo.coordenadas, c.coordenadas) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 6);

  if (cercanos.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-2xl text-foreground sm:text-3xl">Castillos cercanos</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {cercanos.map(({ c, km }) => (
          <li key={c.slug}>
            <Link
              to="/castillo/$slug"
              params={{ slug: c.slug }}
              className="group flex items-center gap-3 rounded-lg border border-border/70 bg-card p-3 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]"
            >
              <img
                src={c.imagen}
                alt={c.nombre}
                loading="lazy"
                className="h-16 w-16 flex-none rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="truncate font-display text-base text-foreground group-hover:text-primary">
                  📍 {c.nombre}
                </div>
                <div className="text-xs text-muted-foreground">
                  {c.provincia} · {Math.round(km)} km
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}