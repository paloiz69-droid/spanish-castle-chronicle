import { test } from "node:test";
import assert from "node:assert/strict";
import { MAPS_PLACE_TRIAL_URL } from "./maps-place-trial";

test("controlled trial requests La Coracera by name and locality, not driving directions", () => {
  const url = new URL(MAPS_PLACE_TRIAL_URL);
  assert.equal(url.origin + url.pathname, "https://www.google.com/maps/search/");
  assert.equal(url.searchParams.get("api"), "1");
  assert.equal(url.searchParams.get("query"), "Castillo de La Coracera, San Martín de Valdeiglesias, Madrid");
  assert.deepEqual([...url.searchParams.keys()].sort(), ["api", "query"]);
});

