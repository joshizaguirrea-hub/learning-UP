/**
 * tests/streak.test.mjs — Pruebas del motor de rachas diarias.
 * Correr con:  node tests/streak.test.mjs
 */
import assert from "node:assert/strict";
import { computeStreak, streakAlive, didToday } from "../src/core/streak.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }
const today = new Date("2026-02-10");

test("primer dia inicia racha en 1", () => {
  const r = computeStreak(null, 0, today);
  assert.equal(r.streak, 1);
  assert.equal(r.changed, true);
});

test("activo ayer suma 1", () => {
  const r = computeStreak("2026-02-09", 4, today);
  assert.equal(r.streak, 5);
});

test("hueco (antier) reinicia a 1", () => {
  const r = computeStreak("2026-02-08", 4, today);
  assert.equal(r.streak, 1);
});

test("ya activo hoy no cambia", () => {
  const r = computeStreak("2026-02-10", 7, today);
  assert.equal(r.streak, 7);
  assert.equal(r.changed, false);
});

test("streakAlive y didToday", () => {
  assert.equal(didToday("2026-02-10", today), true);
  assert.equal(streakAlive("2026-02-09", today), true);
  assert.equal(streakAlive("2026-02-07", today), false);
});

console.log(`\n${passed} pruebas en verde.`);
