/**
 * tests/unit-report.test.mjs — Pruebas del motor PURO del boletin de la unidad.
 * Correr con:  node tests/unit-report.test.mjs
 */
import assert from "node:assert/strict";
import { buildUnitReport, isUnitComplete, PASS } from "../src/core/unit-report.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

const UNIT = {
  id: "u1", title: "Hello!", level: "A1",
  vocab: [{ term: "hello", translation: "hola" }],
  lessons: [
    { id: "r", order: 1, skills: ["reading"], title: "Reading" },
    { id: "v", order: 2, skills: ["vocabulary"], title: "Vocabulary" },
    {
      id: "g", order: 3, skills: ["grammar"], title: "Grammar",
      grammar: { mistakes: [{ wrong: "I is", right: "I am" }, { wrong: "He are", right: "He is" }] },
    },
    { id: "w", order: 4, skills: ["writing"], title: "Writing" },
    { id: "t", order: 5, kind: "test", skills: ["grammar"], title: "Examen" },
  ],
};

test("buildUnitReport promedia solo lecciones hechas y excluye el examen", () => {
  const map = {
    r: { status: "done", score: 90 },
    v: { status: "done", score: 50 },
    g: { status: "done", score: 80 },
    w: { status: "done", score: 100 },
    t: { status: "done", score: 100 }, // examen: NO cuenta como competencia
  };
  const rep = buildUnitReport(UNIT, map);
  assert.equal(rep.score, 80); // (90+50+80+100)/4
  assert.equal(rep.totalLessons, 4);
  assert.equal(rep.doneLessons, 4);
  assert.ok(rep.passed);
});

test("marca competencias debiles (< PASS) y las lista en weakSkills", () => {
  const map = { r: { status: "done", score: 90 }, v: { status: "done", score: 50 } };
  const rep = buildUnitReport(UNIT, map);
  const vocab = rep.skills.find((s) => s.id === "vocabulary");
  assert.equal(vocab.value, 50);
  assert.equal(vocab.weak, true);
  assert.ok(rep.weakSkills.includes("vocabulary"));
  const reading = rep.skills.find((s) => s.id === "reading");
  assert.equal(reading.weak, false);
});

test("competencia sin terminar queda pending, no weak", () => {
  const rep = buildUnitReport(UNIT, { r: { status: "done", score: 90 } });
  const vocab = rep.skills.find((s) => s.id === "vocabulary");
  assert.equal(vocab.pending, true);
  assert.equal(vocab.weak, false);
});

test("extrae los errores de gramatica de la unidad para practicar", () => {
  const rep = buildUnitReport(UNIT, {});
  assert.equal(rep.grammarMistakes.length, 2);
  assert.deepEqual(rep.grammarMistakes[0], { wrong: "I is", right: "I am", why: "" });
});

test("speaking sintetico (speaking-<unitId>) cuenta como competencia", () => {
  const map = { "speaking-u1": { status: "done", score: 70 } };
  const rep = buildUnitReport(UNIT, map);
  const sp = rep.skills.find((s) => s.id === "speaking");
  assert.ok(sp);
  assert.equal(sp.value, 70);
});

test("isUnitComplete: true solo cuando todas las competencias con leccion estan hechas", () => {
  const partial = { r: { status: "done" }, v: { status: "done" }, g: { status: "done" } };
  assert.equal(isUnitComplete(UNIT, partial), false);
  const full = { r: { status: "done" }, v: { status: "done" }, g: { status: "done" }, w: { status: "done" } };
  assert.equal(isUnitComplete(UNIT, full), true);
});

test("PASS es 70", () => { assert.equal(PASS, 70); });

console.log(`\n${passed} pruebas en verde.`);
