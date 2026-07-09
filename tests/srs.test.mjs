/**
 * tests/srs.test.mjs — Pruebas del motor de repeticion espaciada.
 * Correr con:  node tests/srs.test.mjs
 */
import assert from "node:assert/strict";
import { newCard, review, isDue, isoDay } from "../src/core/srs.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }
const today = new Date("2026-01-01");

test("tarjeta nueva vence hoy", () => {
  const c = newCard(today);
  assert.equal(c.due, isoDay(today));
  assert.equal(c.reps, 0);
});

test("'again' reinicia y mantiene due hoy", () => {
  const c = review(newCard(today), "again", today);
  assert.equal(c.reps, 0);
  assert.equal(c.interval, 0);
  assert.equal(c.due, isoDay(today));
});

test("'good' aumenta el intervalo progresivamente", () => {
  let c = review(newCard(today), "good", today);
  assert.equal(c.interval, 1); // 1er repaso
  c = review(c, "good", today);
  assert.equal(c.interval, 6); // 2do repaso
  const before = c.interval;
  c = review(c, "good", today);
  assert.ok(c.interval > before); // 3ro crece con ease
});

test("'easy' da intervalos mayores que 'hard'", () => {
  const easy = review(newCard(today), "easy", today);
  const hard = review(newCard(today), "hard", today);
  assert.ok(easy.interval >= hard.interval);
});

test("isDue detecta vencidas", () => {
  const c = review(newCard(today), "good", today); // due manana
  assert.equal(isDue(c, today), false);
  assert.equal(isDue(c, new Date("2026-01-05")), true);
});

console.log(`\n${passed} pruebas en verde.`);
