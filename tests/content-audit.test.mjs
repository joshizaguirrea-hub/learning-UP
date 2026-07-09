/**
 * tests/content-audit.test.mjs — Pruebas del auditor de contenido (core puro).
 * Correr con:  node tests/content-audit.test.mjs
 */
import assert from "node:assert/strict";
import { auditContent } from "../src/core/content-audit.js";
import { UNITS } from "../src/data/units/index.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("el catalogo real no tiene errores de integridad", () => {
  const r = auditContent(UNITS);
  assert.equal(r.score.errorCount, 0, "Errores: " + JSON.stringify(r.integrity.filter(i => i.level === "error")));
});

test("detecta indice de opcion multiple invalido", () => {
  const bad = [{ id: "u", title: "U", level: "B1", cando: ["x"], vocab: [],
    lessons: [{ id: "x1", phase: "practice", skills: ["grammar"],
      activities: [{ id: "a", type: "multiple_choice", payload: { choices: ["a", "b"], answer: 5 } }] }] }];
  const r = auditContent(bad);
  assert.ok(r.score.errorCount >= 1);
});

test("detecta word_bank cuyo answer no coincide con words", () => {
  const bad = [{ id: "u", title: "U", level: "B1", cando: ["x"], vocab: [],
    lessons: [{ id: "x1", phase: "practice", skills: ["grammar"],
      activities: [{ id: "a", type: "word_bank", payload: { words: ["a", "b"], answer: ["a", "c"] } }] }] }];
  const r = auditContent(bad);
  assert.ok(r.score.errorCount >= 1);
});

test("calcula cobertura por nivel y competencia", () => {
  const r = auditContent(UNITS);
  assert.ok(r.coverage.byLevel["B1"]);
  assert.ok(r.coverage.byLevel["B1"].skills.grammar > 0);
});

test("puntaje entre 0 y 100", () => {
  const r = auditContent(UNITS);
  assert.ok(r.score.pct >= 0 && r.score.pct <= 100);
});

console.log(`\n${passed} pruebas en verde.`);
