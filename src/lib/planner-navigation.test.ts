import { test } from "node:test";
import assert from "node:assert/strict";
import { construirNavegacionInmediata } from "./planner-navigation";

const paradas = [
  { nombre: "Castillo de Orgaz", coordenadas: [39.647877, -3.877740] as [number, number] },
  { nombre: "Castillo de Villalba", coordenadas: [39.9617, -4.4467] as [number, number] },
];

test("every immediate link retains its exact destination and stop order", () => {
  const enlaces = construirNavegacionInmediata(paradas, "Madrid, Plaza Mayor", false);
  assert.deepEqual(enlaces.map((e) => e.hasta), ["Castillo de Orgaz", "Castillo de Villalba"]);
  assert.deepEqual(enlaces.map((e) => e.titulo), ["Navegar a la parada 1", "Navegar a la parada 2"]);
  assert.deepEqual(enlaces.map((e) => new URL(e.url).searchParams.get("destination")), ["39.647877,-3.87774", "39.9617,-4.4467"]);
});

test("immediate links request official driving navigation without a fixed origin or waypoints", () => {
  for (const enlace of construirNavegacionInmediata(paradas, "Madrid", true)) {
    const url = new URL(enlace.url);
    assert.equal(url.origin + url.pathname, "https://www.google.com/maps/dir/");
    assert.equal(url.searchParams.get("api"), "1");
    assert.equal(url.searchParams.get("travelmode"), "driving");
    assert.equal(url.searchParams.get("dir_action"), "navigate");
    assert.equal(url.searchParams.has("origin"), false);
    assert.equal(url.searchParams.has("waypoints"), false);
  }
});

test("the first stop is navigable without a configured origin", () => {
  assert.equal(construirNavegacionInmediata(paradas.slice(0, 1), "", false).length, 1);
});

test("return navigation retains the configured origin as destination without mutating stops", () => {
  const before = JSON.stringify(paradas);
  const enlaces = construirNavegacionInmediata(paradas, " Madrid, Plaza Mayor ", true);
  assert.equal(enlaces.length, 3);
  assert.equal(enlaces[2].titulo, "Regresar al origen");
  assert.equal(new URL(enlaces[2].url).searchParams.get("destination"), "Madrid, Plaza Mayor");
  assert.equal(JSON.stringify(paradas), before);
  assert.equal(construirNavegacionInmediata(paradas, "", true).length, 2);
  assert.equal(construirNavegacionInmediata([], "Madrid", true).length, 0);
});