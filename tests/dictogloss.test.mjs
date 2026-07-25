/**
 * tests/dictogloss.test.mjs — Pruebas de la logica pura del Dictogloss.
 * Correr con:  node tests/dictogloss.test.mjs
 */
import assert from "node:assert/strict";
import { dictationSentences, gradeDictation, sessionScore } from "../src/core/dictogloss.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

const UNIT = {
  id: "u",
  vocab: [
    { term: "deadline", example: "The deadline is next Friday." },
    { term: "meeting", example: "We have a meeting at ten." },
    { term: "salary", example: "They offered a good salary." },
    { term: "tiny", example: "Hi." },                       // muy corta -> se descarta
    { term: "dup", example: "We have a meeting at ten." },   // duplicada -> se descarta
    { term: "long", example: "one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen" }, // muy larga
  ],
  lessons: [{ content: { reading: "TEXT 1 - X\nShe went to the market yesterday." } }],
};

test("dictationSentences toma ejemplos de vocab, limpios y sin repetir", () => {
  const s = dictationSentences(UNIT);
  assert.ok(s.includes("The deadline is next Friday."));
  assert.ok(s.includes("We have a meeting at ten."));
  // solo UNA copia de la frase duplicada
  assert.equal(s.filter((x) => x === "We have a meeting at ten.").length, 1);
});

test("dictationSentences descarta frases muy cortas o muy largas", () => {
  const s = dictationSentences(UNIT);
  assert.ok(!s.includes("Hi."));
  assert.ok(!s.some((x) => x.split(/\s+/).length > 14));
});

test("dictationSentences usa el texto de lectura como respaldo (sin encabezado)", () => {
  const s = dictationSentences(UNIT, { max: 20 });
  assert.ok(s.includes("She went to the market yesterday."));
  assert.ok(!s.some((x) => /TEXT/i.test(x)));
});

test("gradeDictation da 100% con transcripcion exacta", () => {
  const r = gradeDictation("The deadline is next Friday.", "the deadline is next friday");
  assert.equal(r.score, 1);
  assert.deepEqual(r.missing, []);
});

test("gradeDictation marca las palabras que faltaron", () => {
  const r = gradeDictation("We have a meeting at ten", "we have meeting ten");
  assert.ok(r.score < 1 && r.score > 0);
  assert.deepEqual(r.missing, ["a", "at"]);
  const misses = r.marks.filter((m) => !m.hit).map((m) => m.word);
  assert.deepEqual(misses, ["a", "at"]);
});

test("gradeDictation ignora la puntuacion", () => {
  const r = gradeDictation("Hello, world!", "hello world");
  assert.equal(r.score, 1);
});

test("gradeDictation detecta palabras sobrantes", () => {
  const r = gradeDictation("I like coffee", "I really like hot coffee");
  assert.ok(r.extra.includes("really"));
  assert.ok(r.extra.includes("hot"));
});

test("gradeDictation respeta repeticiones (multiconjunto)", () => {
  const r = gradeDictation("bye bye now", "bye now");
  assert.deepEqual(r.missing, ["bye"]); // solo faltaba una de las dos 'bye'
});

test("sessionScore promedia a 0..100", () => {
  assert.equal(sessionScore([1, 0.5]), 75);
  assert.equal(sessionScore([]), 0);
});

console.log(`\n${passed} pruebas en verde.`);
