import { useEffect, useState } from "react";
import type { Castillo } from "@/data/castillos";
import { getCategoriaInfo } from "@/data/castillos";

function makeIcon(L: typeof import("leaflet"), color: string, emoji: string) {
  return L.divIcon({
    className: "kdronazo-marker",
    html: `<div style="background:${color};color:white;width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.35);border:2px solid white;"><span style="transform:rotate(45deg);font-size:14px;line-height:1;">${emoji}</span></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 30],
    popupAnchor: [0, -28],
  });
}

export function MapaIndividual({ castillo }: { castillo: Castillo }) {
  const [mods, setMods] = useState<{
    L: typeof import("leaflet");
    RL: typeof import("react-leaflet");
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([import("leaflet"), import("react-leaflet")]).then(([L, RL]) => {
      if (!cancelled) setMods({ L: L.default ?? L, RL });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const cat = getCategoriaInfo(castillo.categoria);
  if (!mods) {
    return <div className="h-full w-full animate-pulse bg-secondary" />;
  }
  const { L, RL } = mods;
  const { MapContainer, TileLayer, Marker, Popup } = RL;
  return (
    <MapContainer
      key={castillo.slug}
      center={castillo.coordenadas}
      zoom={14}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={castillo.coordenadas}
        icon={makeIcon(L, cat.color, cat.emoji)}
        eventHandlers={{
          mouseover: (e) => e.target.openPopup(),
          mouseout: (e) => e.target.closePopup(),
        }}
      >
        <Popup>
          <div style={{ width: 220 }}>
            <img
              src={castillo.imagen}
              alt={castillo.nombre}
              style={{
                width: "100%",
                height: 120,
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              {castillo.nombre}
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>
              {castillo.provincia}
            </div>
            <div
              style={{
                marginTop: 6,
                display: "inline-block",
                padding: "2px 8px",
                borderRadius: 999,
                backgroundColor: cat.color,
                color: "white",
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {cat.emoji} {cat.label}
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
