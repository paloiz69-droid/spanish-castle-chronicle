import { test } from "node:test";
import assert from "node:assert/strict";
import { construirNavegacionInmediata } from "./planner-navigation";

const paradas = [
  { nombre: "Castillo de La Coracera", coordenadas: [40.36, -4.4] as [number, number], provincia: "Madrid", visita: { municipio: "San Martín de Valdeiglesias" } },
  { nombre: "Castillo de Orgaz", coordenadas: [39.647877, -3.87774] as [number, number], provincia: "Toledo" },
];

test("each stop opens the castle's place sheet by name, town and province, in order", () => {
  const enlaces = construirNavegacionInmediata(paradas, "Madrid", false);
  assert.deepEqual(enlaces.map((e) => e.titulo), ["Navegar a la parada 1", "Navegar a la parada 2"]);
  const urls = enlaces.map((e) => new URL(e.url));
  for (const u of urls) {
    assert.equal(u.origin + u.pathname, "https://www.google.com/maps/search/");
    assert.equal(u.searchParams.get("api"), "1");
    assert.equal(u.searchParams.has("destination"), false);
  }
  assert.equal(urls[0].searchParams.get("query"), "Castillo de La Coracera, San Martín de Valdeiglesias, Madrid");
  assert.equal(urls[1].searchParams.get("query"), "Castillo de Orgaz, Toledo");
});

test("return to origin keeps driving directions to the configured origin without mutating stops", () => {
  const before = JSON.stringify(paradas);
  const enlaces = construirNavegacionInmediata(paradas, " Madrid, Plaza Mayor ", true);
  assert.equal(enlaces.length, 3);
  const u = new URL(enlaces[2].url);
  assert.equal(u.searchParams.get("destination"), "Madrid, Plaza Mayor");
  assert.equal(u.searchParams.get("travelmode"), "driving");
  assert.equal(JSON.stringify(paradas), before);
  assert.equal(construirNavegacionInmediata([], "Madrid", true).length, 0);
});
