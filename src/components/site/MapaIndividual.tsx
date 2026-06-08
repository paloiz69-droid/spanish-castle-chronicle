import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { getCategoriaInfo, type Castillo } from "@/data/castillos";

const makeIcon = (color: string, emoji: string) =>
  L.divIcon({
    className: "kdronazo-marker",
    html: `<div style="background:${color};color:white;width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.35);border:2px solid white;"><span style="transform:rotate(45deg);font-size:14px;line-height:1;">${emoji}</span></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 30],
    popupAnchor: [0, -28],
  });

export function MapaIndividual({ castillo }: { castillo: Castillo }) {
  const cat = getCategoriaInfo(castillo.categoria);
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
        icon={makeIcon(cat.color, cat.emoji)}
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
