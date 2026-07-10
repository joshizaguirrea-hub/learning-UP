/**
 * tests/example-gen.test.mjs — Pruebas del generador de ejemplos por nivel.
 * Correr con:  node tests/example-gen.test.mjs
 */
import assert from "node:assert/strict";
import { generateExamples, GEN_LEVELS } from "../src/core/example-gen.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

const irregular = { front: "go", past: "went", participle: "gone", back: "went / gone" };
const regular = { front: "work", back: "worked" };

test("genera la cantidad pedida", () => {
  const out = generateExamples(irregular, "intermedio", 2);
  assert.equal(out.length, 2);
});

test("no deja placeholders sin rellenar", () => {
  for (const lvl of GEN_LEVELS) {
    for (const ex of generateExamples(irregular, lvl.id, 5)) {
      assert.ok(!ex.en.includes("{"), `placeholder sin rellenar: ${ex.en}`);
    }
  }
});

test("la respuesta es una forma valida del verbo", () => {
  const forms = new Set(["go", "went", "gone"]);
  for (const ex of generateExamples(irregular, "avanzado", 6)) {
    assert.ok(forms.has(ex.answer), `answer inesperada: ${ex.answer}`);
  }
});

test("regular nunca usa participio (no hay 'part')", () => {
  // work solo tiene base y pasado; answer solo puede ser work o worked.
  const forms = new Set(["work", "worked"]);
  for (const ex of generateExamples(regular, "intermedio", 6)) {
    assert.ok(forms.has(ex.answer), `answer inesperada en regular: ${ex.answer}`);
  }
});

test("la respuesta aparece en la frase", () => {
  for (const ex of generateExamples(irregular, "basico", 6)) {
    assert.ok(ex.en.toLowerCase().includes(ex.answer.toLowerCase()),
      `la respuesta ${ex.answer} no esta en: ${ex.en}`);
  }
});

console.log(`\n${passed} pruebas en verde.`);
