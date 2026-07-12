/**
 * tests/gamification.test.mjs — Pruebas del motor de gamificacion (core puro).
 * Correr con:  node tests/gamification.test.mjs
 */
import assert from "node:assert/strict";
import { skillProgress, totalXp, playerLevel, achievements, bonusMedals } from "../src/core/gamification.js";

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

const decks = [
  { id: "d1", medalTitle: "Uno", items: [{ id: "a" }, { id: "b" }] },
  { id: "d2", medalTitle: "Dos", items: [{ id: "c" }] },
];

test("bonusMedals: mazo dominado cuando todos los items >= MASTER_REPS", () => {
  const cardMap = { a: { reps: 2 }, b: { reps: 3 }, c: { reps: 0 } };
  const m = bonusMedals(decks, cardMap);
  const d1 = m.find((x) => x.deck.id === "d1");
  const d2 = m.find((x) => x.deck.id === "d2");
  assert.equal(d1.done, 2);
  assert.equal(d1.total, 2);
  assert.equal(d1.mastered, true);
  assert.equal(d1.pct, 100);
  assert.equal(d2.mastered, false);
  assert.equal(d2.pct, 0);
});

test("bonusMedals: sin progreso (cardMap vacio) nada esta dominado", () => {
  const m = bonusMedals(decks, {});
  assert.equal(m.every((x) => x.mastered === false), true);
  assert.equal(m.find((x) => x.deck.id === "d1").done, 0);
});

console.log(`\n${passed} pruebas en verde.`);
