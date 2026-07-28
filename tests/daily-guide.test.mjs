/**
 * tests/daily-guide.test.mjs — Pruebas del coach del dia (PURO).
 * Correr con:  node tests/daily-guide.test.mjs
 */
import assert from "node:assert/strict";
import {
  greeting, firstNameOf, countDoneToday, pickTodayUnit, buildDailySession,
} from "../src/core/daily-guide.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

const at = (h) => new Date(2026, 0, 15, h, 0, 0);

test("greeting cambia con la hora", () => {
  assert.equal(greeting(at(8)), "Buenos d\u00edas");
  assert.equal(greeting(at(15)), "Buenas tardes");
  assert.equal(greeting(at(21)), "Buenas noches");
});

test("firstNameOf toma solo el primer nombre", () => {
  assert.equal(firstNameOf("Johsua Izaguirre"), "Johsua");
  assert.equal(firstNameOf("  "), "estudiante");
});

test("countDoneToday cuenta solo las de hoy", () => {
  const now = at(10);
  const today = new Date(2026, 0, 15, 9).toISOString();
  const yesterday = new Date(2026, 0, 14, 9).toISOString();
  assert.equal(countDoneToday([today, yesterday, today, null], now), 2);
});

const UNITS = [
  { id: "u1", title: "Hello", lessons: [{ id: "l1" }, { id: "l2" }] },
  { id: "u2", title: "Food", lessons: [{ id: "l3" }, { id: "l4" }] },
];

test("pickTodayUnit devuelve la primera unidad sin terminar", () => {
  const done = new Set(["l1", "l2"]); // u1 completa
  assert.equal(pickTodayUnit(UNITS, done).id, "u2");
});

test("pickTodayUnit null si el curso esta completo", () => {
  assert.equal(pickTodayUnit(UNITS, new Set(["l1", "l2", "l3", "l4"])), null);
});

const PLAN = { perSession: 3, startSkillLabel: "Speaking", skillOrder: ["speaking", "vocabulary"] };

test("buildDailySession: primera clase del dia saluda y da el tema", () => {
  const s = buildDailySession({ name: "Johsua Izaguirre", plan: PLAN, units: UNITS, completed: new Set(), doneToday: 0, now: at(8) });
  assert.equal(s.topic, "Hello");
  assert.equal(s.metGoal, false);
  assert.ok(s.speech.includes("Buenos d\u00edas") && s.speech.includes("Johsua") && s.speech.includes("Hello") && s.speech.includes("Speaking"));
});

test("buildDailySession: meta cumplida pregunta si seguir o descansar", () => {
  const s = buildDailySession({ name: "Ana", plan: PLAN, units: UNITS, completed: new Set(), doneToday: 3, now: at(18) });
  assert.equal(s.metGoal, true);
  assert.ok(/seguir/i.test(s.speech) && /descans/i.test(s.speech));
});

test("buildDailySession: a media sesion pregunta si avanzar", () => {
  const s = buildDailySession({ name: "Ana", plan: PLAN, units: UNITS, completed: new Set(), doneToday: 1, now: at(18) });
  assert.equal(s.remaining, 2);
  assert.ok(/avanzamos/i.test(s.speech));
});

test("buildDailySession: curso completo felicita", () => {
  const s = buildDailySession({ name: "Ana", plan: PLAN, units: UNITS, completed: new Set(["l1", "l2", "l3", "l4"]), doneToday: 0, now: at(9) });
  assert.equal(s.courseDone, true);
  assert.ok(/felicidades/i.test(s.speech));
});

console.log(`\n${passed} pruebas en verde.`);
