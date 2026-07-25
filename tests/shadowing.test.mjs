/**
 * tests/shadowing.test.mjs — Pruebas de la logica pura de shadowing.
 * Correr con:  node tests/shadowing.test.mjs
 */
import assert from "node:assert/strict";
import { chunkPhrase, sessionScore } from "../src/core/shadowing.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("frase corta queda en un solo chunk", () => {
  assert.deepEqual(chunkPhrase("I like coffee"), ["I like coffee"]);
});

test("texto vacio -> arreglo vacio", () => {
  assert.deepEqual(chunkPhrase("   "), []);
  assert.deepEqual(chunkPhrase(""), []);
});

test("corta por coma conservando el signo", () => {
  const c = chunkPhrase("Yesterday I woke up, and then I went to work");
  assert.ok(c.length >= 2);
  assert.ok(c[0].endsWith(","));
});

test("frase larga sin puntuacion se parte en ventanas de <= max", () => {
  const long = "one two three four five six seven eight nine ten";
  const c = chunkPhrase(long, 4);
  assert.ok(c.length >= 2);
  for (const chunk of c) {
    assert.ok(chunk.split(/\s+/).length <= 4, `chunk muy largo: ${chunk}`);
  }
});

test("no pierde palabras al partir", () => {
  const text = "the quick brown fox jumps over the lazy dog today";
  const joined = chunkPhrase(text, 3).join(" ");
  assert.equal(joined.split(/\s+/).length, text.split(/\s+/).length);
});

test("cola huerfana de 1 palabra se fusiona con el anterior", () => {
  // 7 palabras con max 3 -> [3,3,1] pero la cola se pega -> [3,4]
  const c = chunkPhrase("alpha beta gamma delta epsilon zeta eta", 3);
  assert.ok(!c.some((ch) => ch.split(/\s+/).length === 1), "no debe haber chunk de 1 palabra");
});

test("sessionScore promedia proporciones a 0..100", () => {
  assert.equal(sessionScore([1, 0.5]), 75);
  assert.equal(sessionScore([]), 0);
  assert.equal(sessionScore([0.333, 0.333, 0.333]), 33);
});

console.log(`\n${passed} pruebas en verde.`);
