interface ParadaNavegable {
  nombre: string;
  coordenadas: [number, number];
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
    dir_action: "navigate",
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function construirNavegacionInmediata(
  paradas: ParadaNavegable[],
  origen: string,
  volver: boolean,
): NavegacionInmediata[] {
  const enlaces = paradas.map((parada, index) => ({
    url: urlNavegacion(`${parada.coordenadas[0]},${parada.coordenadas[1]}`),
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