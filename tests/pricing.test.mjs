/**
 * tests/pricing.test.mjs — Pruebas unitarias del motor de precios (core puro).
 *
 * Sin navegador, sin dependencias. Correr con:  node tests/pricing.test.mjs
 * Demuestra que la logica de negocio es testeable de forma aislada (ADR-003).
 */
import assert from "node:assert/strict";
import { priceCap, validateRate } from "../src/core/pricing.js";

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log(`  ok - ${name}`);
}

test("techo base por nivel", () => {
  assert.equal(priceCap("A1"), 8);
  assert.equal(priceCap("B2"), 14);
  assert.equal(priceCap("C1"), 22);
  assert.equal(priceCap("Native"), 30);
});

test("rating alto sube el techo (x1.3)", () => {
  assert.equal(priceCap("B2", 4.8), 18); // 14 * 1.3 = 18.2 -> 18
  assert.equal(priceCap("Native", 5), 39); // 30 * 1.3 = 39
});

test("rating bajo no aplica bonus", () => {
  assert.equal(priceCap("B2", 4.6), 14);
});

test("nivel desconocido => techo 0", () => {
  assert.equal(priceCap("Z9"), 0);
});

test("validateRate acepta tarifa dentro del techo", () => {
  const r = validateRate(12, "B2", 0);
  assert.equal(r.ok, true);
  assert.equal(r.cap, 14);
});

test("validateRate rechaza tarifa sobre el techo", () => {
  const r = validateRate(20, "B2", 0);
  assert.equal(r.ok, false);
  assert.match(r.reason, /techo/);
});

test("validateRate rechaza sin nivel asignado", () => {
  const r = validateRate(10, "Z9", 0);
  assert.equal(r.ok, false);
});

console.log(`\n${passed} pruebas en verde.`);
