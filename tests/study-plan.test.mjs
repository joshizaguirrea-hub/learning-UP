/**
 * tests/study-plan.test.mjs — Pruebas del generador de plan de trabajo (PURO).
 * Correr con:  node tests/study-plan.test.mjs
 */
import assert from "node:assert/strict";
import {
  buildStudyPlan, needsTest, cefrForSelfLevel, activitiesPerSession, GOALS, SKILL_LABEL,
} from "../src/core/study-plan.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("needsTest: basico/a2 no; intermedio/avanzado si", () => {
  assert.equal(needsTest("basico"), false);
  assert.equal(needsTest("a2"), false);
  assert.equal(needsTest("intermedio"), true);
  assert.equal(needsTest("avanzado"), true);
});

test("cefrForSelfLevel: conocido para basico/a2, null para prueba", () => {
  assert.equal(cefrForSelfLevel("basico"), "A1");
  assert.equal(cefrForSelfLevel("a2"), "A2");
  assert.equal(cefrForSelfLevel("intermedio"), null);
});

test("activitiesPerSession escala con los minutos", () => {
  assert.equal(activitiesPerSession(5), 1);
  assert.equal(activitiesPerSession(10), 2);
  assert.equal(activitiesPerSession(15), 3);
  assert.equal(activitiesPerSession(30), 5);
  assert.equal(activitiesPerSession(999), 2); // fallback
});

test("buildStudyPlan para meta trabajo empieza por Speaking", () => {
  const plan = buildStudyPlan({ selfLevel: "intermedio", goal: "work", minutes: 15, cefr: "B1" });
  assert.equal(plan.cefr, "B1");
  assert.equal(plan.goal, "work");
  assert.equal(plan.startSkill, "speaking");
  assert.equal(plan.startSkillLabel, SKILL_LABEL.speaking);
  assert.equal(plan.perSession, 3);
  assert.ok(plan.skillOrder.length === 6);
  assert.ok(plan.summary.includes("B1") && plan.summary.includes("15 min"));
});

test("buildStudyPlan para estudios empieza por Gramatica", () => {
  const plan = buildStudyPlan({ selfLevel: "avanzado", goal: "study", minutes: 30, cefr: "C1" });
  assert.equal(plan.startSkill, "grammar");
  assert.equal(plan.perSession, 5);
});

test("buildStudyPlan usa cefr del autonivel si no viene explicito", () => {
  const plan = buildStudyPlan({ selfLevel: "basico", goal: "travel", minutes: 5 });
  assert.equal(plan.cefr, "A1");
  assert.equal(plan.startSkill, "speaking");
});

test("buildStudyPlan defaults robustos ante entrada basura", () => {
  const plan = buildStudyPlan({ goal: "xxx", minutes: 7 });
  assert.equal(plan.goal, "personal");
  assert.equal(plan.cefr, "A1");
  assert.equal(plan.minutes, 10); // minutos invalidos -> 10
  assert.ok(GOALS[plan.goal]);
});

console.log(`\n${passed} pruebas en verde.`);
