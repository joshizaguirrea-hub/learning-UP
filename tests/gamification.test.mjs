/**
 * tests/gamification.test.mjs — Pruebas del motor de gamificacion (core puro).
 * Correr con:  node tests/gamification.test.mjs
 */
import assert from "node:assert/strict";
import { skillProgress, totalXp, playerLevel, achievements } from "../src/core/gamification.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

const units = [{
  lessons: [
    { id: "l1", skills: ["grammar", "vocabulary"] },
    { id: "l2", skills: ["grammar"] },
    { id: "l3", skills: ["writing"] },
  ],
}];

test("skillProgress cuenta total y completadas por competencia", () => {
  const s = skillProgress(units, new Set(["l1"]));
  const grammar = s.find((x) => x.key === "grammar");
  assert.equal(grammar.total, 2);
  assert.equal(grammar.done, 1);
  assert.equal(grammar.pct, 50);
});

test("competencias sin contenido quedan locked", () => {
  const s = skillProgress(units, new Set());
  const listening = s.find((x) => x.key === "listening");
  assert.equal(listening.locked, true);
});

test("XP y nivel de jugador", () => {
  assert.equal(totalXp(3, 4), 3 * 20 + 4 * 5); // 80
  assert.equal(playerLevel(0), 1);
  assert.equal(playerLevel(150), 2);
});

test("logros se desbloquean por hitos", () => {
  const a = achievements({ placementDone: true, lessonsDone: 5, vocabLearned: 10, unitsCompleted: 1 });
  assert.equal(a.find((x) => x.id === "first_step").unlocked, true);
  assert.equal(a.find((x) => x.id === "dedicated").unlocked, true);
  assert.equal(a.find((x) => x.id === "on_fire").unlocked, false);
});

console.log(`\n${passed} pruebas en verde.`);
