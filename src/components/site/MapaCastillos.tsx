import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { CASTILLOS } from "@/data/castillos";
import { Link } from "@tanstack/react-router";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function MapaCastillos() {
  useEffect(() => {
    // ensure leaflet css applied
  }, []);
  return (
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
        {CASTILLOS.map((c) => (
          <Marker key={c.slug} position={c.coordenadas} icon={icon}>
            <Popup>
              <div style={{ width: 220 }}>
                <img src={c.imagen} alt={c.nombre} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 6 }} />
                <div style={{ marginTop: 8, fontWeight: 600 }}>{c.nombre}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{c.provincia}</div>
                <Link
                  to="/castillo/$slug"
                  params={{ slug: c.slug }}
                  style={{ display: "inline-block", marginTop: 8, color: "#8B4513", fontWeight: 500 }}
                >
                  Ver ficha completa →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}