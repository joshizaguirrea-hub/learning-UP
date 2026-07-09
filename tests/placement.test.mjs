/**
 * tests/placement.test.mjs — Pruebas de los motores de examen y plan (core puro).
 *
 * Correr con:  node tests/placement.test.mjs
 */
import assert from "node:assert/strict";
import {
  createSession, nextQuestion, answer, result,
} from "../src/core/placement.js";
import { generatePlan } from "../src/core/plan.js";
import { PLACEMENT_QUESTIONS } from "../src/data/placement-questions.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

/** Simula un examen respondiendo con una estrategia dada. */
function runExam(strategy, maxQuestions = 8) {
  const s = createSession(PLACEMENT_QUESTIONS, { maxQuestions });
  let q;
  while ((q = nextQuestion(s))) {
    const choice = strategy(q); // devuelve el indice elegido
    answer(s, q, choice);
  }
  return result(s);
}

test("todo correcto => nivel alto (B1 o B2)", () => {
  const r = runExam((q) => q.answer); // siempre la correcta
  assert.equal(r.correct, r.total);
  assert.ok(["B1", "B2"].includes(r.cefr), `esperaba B1/B2, fue ${r.cefr}`);
});

test("todo incorrecto => A1", () => {
  const r = runExam((q) => (q.answer === 0 ? 1 : 0)); // siempre la equivocada
  assert.equal(r.correct, 0);
  assert.equal(r.cefr, "A1");
});

test("el examen respeta el maximo de preguntas", () => {
  const r = runExam((q) => q.answer, 6);
  assert.equal(r.total, 6);
});

test("no repite preguntas", () => {
  const s = createSession(PLACEMENT_QUESTIONS, { maxQuestions: 8 });
  const seen = new Set();
  let q;
  while ((q = nextQuestion(s))) {
    assert.ok(!seen.has(q.id), `pregunta repetida: ${q.id}`);
    seen.add(q.id);
    answer(s, q, q.answer);
  }
});

test("generatePlan crea modulos desde el nivel hacia el siguiente", () => {
  const plan = generatePlan("A2");
  assert.equal(plan.fromLevel, "A2");
  assert.equal(plan.targetLevel, "B1");
  assert.ok(plan.modules.length > 0);
  assert.ok(plan.modules.every((m) => m.status === "pending"));
});

test("generatePlan respeta un targetLevel explicito", () => {
  const plan = generatePlan("A1", { targetLevel: "B1" });
  assert.equal(plan.fromLevel, "A1");
  assert.equal(plan.targetLevel, "B1");
});

console.log(`\n${passed} pruebas en verde.`);
