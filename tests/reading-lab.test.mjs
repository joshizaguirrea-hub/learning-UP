/**
 * tests/reading-lab.test.mjs — Pruebas de la logica pura del Reading Lab.
 * Correr con:  node tests/reading-lab.test.mjs
 */
import assert from "node:assert/strict";
import { splitTexts, vocabInText, buildQuestions, scorePct } from "../src/core/reading-lab.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

const READING =
  "TEXT 1 - Laura's job\n" +
  "Laura is a project manager. She has a meeting every morning with her colleague. " +
  "Last month she got a promotion.\n\n" +
  "TEXT 2 - Job advert\n" +
  "We want to hire a friendly person. The salary is competitive.";

const UNIT = {
  id: "work-career-b1",
  vocab: [
    { term: "colleague", translation: "colega" },
    { term: "meeting", translation: "reunion" },
    { term: "promotion", translation: "ascenso" },
    { term: "salary", translation: "sueldo" },
    { term: "to hire", translation: "contratar" },
    { term: "deadline", translation: "fecha limite" }, // NO aparece en el texto
  ],
};

const LESSON = {
  id: "wc-read",
  content: {
    reading: READING,
    check: [
      { prompt: "What is Laura?", choices: ["A manager", "A doctor", "A chef"], answer: 0 },
      { prompt: "When is the meeting?", choices: ["At night", "Every morning", "On Sunday"], answer: 1 },
    ],
  },
};

test("splitTexts separa por encabezados TEXT n", () => {
  const parts = splitTexts(READING);
  assert.equal(parts.length, 2);
  assert.equal(parts[0].title, "Laura's job");
  assert.ok(parts[0].body.includes("project manager"));
});

test("splitTexts sin encabezado -> un solo pasaje", () => {
  const parts = splitTexts("Just a plain paragraph without headers.");
  assert.equal(parts.length, 1);
  assert.equal(parts[0].title, "");
});

test("splitTexts vacio -> arreglo vacio", () => {
  assert.deepEqual(splitTexts(""), []);
  assert.deepEqual(splitTexts("   "), []);
});

test("vocabInText solo devuelve vocab que aparece en el texto", () => {
  const found = vocabInText(UNIT, READING).map((v) => v.term);
  assert.ok(found.includes("colleague"));
  assert.ok(found.includes("promotion"));
  assert.ok(found.includes("to hire")); // "hire" aparece
  assert.ok(!found.includes("deadline")); // no aparece -> excluida
});

test("buildQuestions usa las preguntas autoradas (content.check) primero", () => {
  const qs = buildQuestions(LESSON, UNIT);
  assert.equal(qs[0].kind, "comprehension");
  assert.equal(qs[0].q, "What is Laura?");
  // la opcion correcta esta marcada
  assert.equal(qs[0].options.find((o) => o.correct).text, "A manager");
});

test("buildQuestions agrega 'palabra en contexto' con 3 opciones", () => {
  const qs = buildQuestions(LESSON, UNIT);
  const vocabQ = qs.find((q) => q.kind === "vocab");
  assert.ok(vocabQ, "debe haber al menos una pregunta de vocab");
  assert.equal(vocabQ.options.length, 3);
  assert.equal(vocabQ.options.filter((o) => o.correct).length, 1);
});

test("buildQuestions respeta el maximo", () => {
  const qs = buildQuestions(LESSON, UNIT, { max: 3 });
  assert.ok(qs.length <= 3);
});

test("scorePct calcula porcentaje", () => {
  assert.equal(scorePct(3, 4), 75);
  assert.equal(scorePct(0, 0), 0);
  assert.equal(scorePct(1, 3), 33);
});

console.log(`\n${passed} pruebas en verde.`);
