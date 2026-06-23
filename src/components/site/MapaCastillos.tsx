import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { CASTILLOS, CATEGORIAS, getCategoriaInfo, getComunidadesConCastillos, type CategoriaCastillo } from "@/data/castillos";
import { Link } from "@tanstack/react-router";

const makeIcon = (color: string, emoji: string) =>
  L.divIcon({
    className: "kdronazo-marker",
    html: `<div style="background:${color};color:white;width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.35);border:2px solid white;"><span style="transform:rotate(45deg);font-size:14px;line-height:1;">${emoji}</span></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 30],
    popupAnchor: [0, -28],
  });

export function MapaCastillos() {
  const [activas, setActivas] = useState<Set<CategoriaCastillo>>(
    new Set(CATEGORIAS.map((c) => c.slug)),
  );
  const [comunidad, setComunidad] = useState<string>("");
  const comunidades = useMemo(() => getComunidadesConCastillos(), []);
  const toggle = (slug: CategoriaCastillo) =>
    setActivas((prev) => {
      const n = new Set(prev);
      if (n.has(slug)) n.delete(slug);
      else n.add(slug);
      return n;
    });
  const visibles = useMemo(
    () =>
      CASTILLOS.filter(
        (c) => activas.has(c.categoria) && (!comunidad || c.comunidad === comunidad),
      ),
    [activas, comunidad],
  );
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Filtrar:</span>
        {CATEGORIAS.map((c) => {
          const active = activas.has(c.slug);
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => toggle(c.slug)}
              className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                backgroundColor: active ? c.color : "transparent",
                color: active ? "white" : "var(--color-foreground)",
                borderColor: c.color,
                opacity: active ? 1 : 0.6,
              }}
              aria-pressed={active}
            >
              {c.emoji} {c.label}
            </button>
          );
        })}
        <label className="ml-auto flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="uppercase tracking-wider">Comunidad:</span>
          <select
            value={comunidad}
            onChange={(e) => setComunidad(e.target.value)}
            className="h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground"
          >
            <option value="">Todas</option>
            {comunidades.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <span className="text-xs text-muted-foreground">
          {visibles.length} resultado{visibles.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="h-[70vh] w-full overflow-hidden rounded-xl border border-border/70 shadow-[var(--shadow-elegant)]">
      <MapContainer
        center={[40.0, -3.7]}
        zoom={6}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {visibles.map((c) => {
          const cat = getCategoriaInfo(c.categoria);
          return (
          <Marker key={c.slug} position={c.coordenadas} icon={makeIcon(cat.color, cat.emoji)}>
            <Popup>
              <div style={{ width: 220 }}>
                <img src={c.imagen} alt={c.nombre} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 6 }} />
                <div style={{ marginTop: 8, fontWeight: 600 }}>{c.nombre}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{c.provincia}</div>
                <div style={{ marginTop: 6, display: "inline-block", padding: "2px 8px", borderRadius: 999, backgroundColor: cat.color, color: "white", fontSize: 11, fontWeight: 600 }}>
                  {cat.emoji} {cat.label}
                </div>
                <Link
                  to="/castillo/$slug"
                  params={{ slug: c.slug }}
                  style={{ display: "block", marginTop: 8, color: "#8B4513", fontWeight: 500 }}
                >
                  Ver ficha completa →
                </Link>
              </div>
            </Popup>
          </Marker>
        );
        })}
      </MapContainer>
      </div>
    </div>
  );
}