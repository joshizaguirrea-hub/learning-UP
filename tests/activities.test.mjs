/**
 * tests/activities.test.mjs — Pruebas del motor de calificacion de actividades.
 * Correr con:  node tests/activities.test.mjs
 */
import assert from "node:assert/strict";
import { grade, gradeAll, normalize } from "../src/core/activities.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("normalize ignora mayusculas, espacios y acentos", () => {
  assert.equal(normalize("  Cafe "), normalize("cafe"));
  assert.equal(normalize("DEADLINE"), "deadline");
});

test("multiple_choice compara indice", () => {
  const a = { type: "multiple_choice", payload: { answer: 1 } };
  assert.equal(grade(a, 1), true);
  assert.equal(grade(a, 0), false);
});

test("cloze acepta respuesta y alternativas", () => {
  const a = { type: "cloze", payload: { answer: "apply", alt: ["apply for"] } };
  assert.equal(grade(a, "Apply"), true);
  assert.equal(grade(a, "apply for"), true);
  assert.equal(grade(a, "applied"), false);
});

test("word_bank exige el orden correcto", () => {
  const a = { type: "word_bank", payload: { answer: ["I'm", "in", "charge"] } };
  assert.equal(grade(a, ["I'm", "in", "charge"]), true);
  assert.equal(grade(a, ["in", "I'm", "charge"]), false);
});

test("matching exige todos los pares correctos", () => {
  const a = { type: "matching", payload: { pairs: [
    { left: "deadline", right: "fecha limite" },
    { left: "salary", right: "sueldo" },
  ] } };
  assert.equal(grade(a, ["fecha limite", "sueldo"]), true);
  assert.equal(grade(a, ["sueldo", "fecha limite"]), false);
});

test("gradeAll calcula proporcion y aprobado", () => {
  const acts = [
    { type: "multiple_choice", payload: { answer: 0 } },
    { type: "multiple_choice", payload: { answer: 1 } },
  ];
  const r = gradeAll(acts, [0, 1]);
  assert.equal(r.correct, 2);
  assert.equal(r.passed, true);
});

console.log(`\n${passed} pruebas en verde.`);
