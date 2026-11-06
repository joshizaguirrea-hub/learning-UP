/**
 * tests/ai-deepen.test.mjs — Pruebas del parser de "profundizar" (IA).
 * Correr con:  node tests/ai-deepen.test.mjs
 */
import assert from "node:assert/strict";
import { stripMd, parseDeepenAnswer } from "../src/core/ai-deepen.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("stripMd quita negritas, asteriscos sueltos y encabezados", () => {
  assert.equal(stripMd("**hola** *mundo* `code` # Titulo"), "hola mundo code Titulo");
});

test("parseDeepenAnswer separa las 3 secciones cuando estan completas", () => {
  const text = "EJEMPLOS:\n1. foo\n\nNOTA GRAMATICAL:\nes un sustantivo contable\n\n" +
    "CONJUGACION (esta palabra ES un verbo):\n- Presente: go";
  const out = parseDeepenAnswer(text);
  assert.equal(out.examples, "1. foo");
  assert.equal(out.grammar, "es un sustantivo contable");
  assert.ok(out.conjugation.startsWith("- Presente: go"));
});

test("sin NOTA GRAMATICAL, todo cae en examples (nunca se pierde contenido)", () => {
  const out = parseDeepenAnswer("EJEMPLOS:\n1. foo\n2. bar");
  assert.equal(out.examples, "1. foo\n2. bar");
  assert.equal(out.grammar, "");
  assert.equal(out.conjugation, "");
});

test("con NOTA GRAMATICAL pero sin CONJUGACION", () => {
  const out = parseDeepenAnswer("EJEMPLOS:\n1. foo\n\nNOTA GRAMATICAL:\nnota util");
  assert.equal(out.examples, "1. foo");
  assert.equal(out.grammar, "nota util");
  assert.equal(out.conjugation, "");
});

test("texto vacio o nulo no revienta", () => {
  assert.deepEqual(parseDeepenAnswer(""), { examples: "", grammar: "", conjugation: "" });
  assert.deepEqual(parseDeepenAnswer(undefined), { examples: "", grammar: "", conjugation: "" });
});

console.log(`\n${passed} pruebas en verde.`);
