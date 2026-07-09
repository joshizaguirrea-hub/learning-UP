/**
 * tests/lesson.test.mjs — Pruebas del motor de lecciones (core puro).
 * Correr con:  node tests/lesson.test.mjs
 */
import assert from "node:assert/strict";
import { getLesson, scorePractice, PASS_RATIO } from "../src/core/lesson.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("getLesson devuelve contenido real cuando existe", () => {
  const l = getLesson("B1", "grammar");
  assert.equal(l.available, true);
  assert.ok(l.practice.length > 0);
  assert.ok(l.title.length > 0);
});

test("getLesson da fallback para competencias sin contenido", () => {
  const l = getLesson("B1", "listening");
  assert.equal(l.available, false);
  assert.equal(l.practice.length, 0);
});

test("scorePractice cuenta aciertos y aprueba con >=60%", () => {
  const lesson = getLesson("B1", "grammar"); // 3 preguntas
  const perfect = lesson.practice.map((q) => q.answer);
  const r = scorePractice(lesson, perfect);
  assert.equal(r.correct, r.total);
  assert.equal(r.passed, true);
});

test("scorePractice reprueba con menos del umbral", () => {
  const lesson = getLesson("B1", "grammar");
  const allWrong = lesson.practice.map((q) => (q.answer === 0 ? 1 : 0));
  const r = scorePractice(lesson, allWrong);
  assert.equal(r.correct, 0);
  assert.equal(r.passed, false);
});

test("PASS_RATIO es 0.6", () => {
  assert.equal(PASS_RATIO, 0.6);
});

console.log(`\n${passed} pruebas en verde.`);
