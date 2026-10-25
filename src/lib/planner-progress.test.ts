import { test } from "node:test";
import assert from "node:assert/strict";
import { firmaItinerario, siguienteEtapa } from "./planner-progress";

const firma = firmaItinerario(["a", "b", "c"], "Toledo", true);

test("after opening stop 1 the next stop is 2, then 3, then the return", () => {
  assert.equal(siguienteEtapa(undefined, firma, 4), 0);
  assert.equal(siguienteEtapa({ indice: 0, firma }, firma, 4), 1);
  assert.equal(siguienteEtapa({ indice: 1, firma }, firma, 4), 2);
  assert.equal(siguienteEtapa({ indice: 2, firma }, firma, 4), 3);
  assert.equal(siguienteEtapa({ indice: 3, firma }, firma, 4), null);
});

test("changing order, stops, origin or return restarts at stop 1", () => {
  const ultima = { indice: 1, firma };
  assert.equal(siguienteEtapa(ultima, firmaItinerario(["b", "a", "c"], "Toledo", true), 4), 0);
  assert.equal(siguienteEtapa(ultima, firmaItinerario(["a", "b"], "Toledo", true), 3), 0);
  assert.equal(siguienteEtapa(ultima, firmaItinerario(["a", "b", "c"], "Madrid", true), 4), 0);
  assert.equal(siguienteEtapa(ultima, firmaItinerario(["a", "b", "c"], "Toledo", false), 3), 0);
});
