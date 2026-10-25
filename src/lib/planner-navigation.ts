interface ParadaNavegable {
  nombre: string;
  coordenadas: [number, number];
  provincia?: string;
  visita?: { municipio?: string };
}

export interface NavegacionInmediata {
  url: string;
  titulo: string;
  hasta: string;
}

/** Google Maps resolves the device location; Kdronazo never requests geolocation. */
function urlNavegacion(destino: string): string {
  const params = new URLSearchParams({
    api: "1",
    destination: destino,
    travelmode: "driving",
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/** Official place-search URL: Google Maps opens the castle's place sheet with its native buttons. */
function urlLugar(parada: ParadaNavegable): string {
  const partes = [parada.nombre, parada.visita?.municipio, parada.provincia]
    .map((p) => p?.trim())
    .filter((p): p is string => Boolean(p));
  const unicas = partes.filter((p, i) => partes.findIndex((q) => q.toLowerCase() === p.toLowerCase()) === i);
  const params = new URLSearchParams({ api: "1", query: unicas.join(", ") });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}

export function construirNavegacionInmediata(
  paradas: ParadaNavegable[],
  origen: string,
  volver: boolean,
): NavegacionInmediata[] {
  const enlaces = paradas.map((parada, index) => ({
    url: urlLugar(parada),
    titulo: `Navegar a la parada ${index + 1}`,
    hasta: parada.nombre,
  }));
  if (enlaces.length && volver && origen.trim()) {
    enlaces.push({
      url: urlNavegacion(origen.trim()),
      titulo: "Regresar al origen",
      hasta: origen.trim(),
    });
  }
  return enlaces;
}