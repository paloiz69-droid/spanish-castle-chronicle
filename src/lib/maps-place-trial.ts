// Controlled trial: only La Coracera's main stop button uses place search.
export const MAPS_PLACE_TRIAL_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Castillo de La Coracera, San Martín de Valdeiglesias, Madrid");

export function urlParadaDePrueba(slug: string | undefined, urlPlanificada: string): string {
  return slug === "castillo-de-la-coracera" ? MAPS_PLACE_TRIAL_URL : urlPlanificada;
}