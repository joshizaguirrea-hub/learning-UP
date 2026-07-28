/**
 * tests/speech-split.test.mjs — Prueba del troceo fluido para TTS.
 * Correr con:  node tests/speech-split.test.mjs
 */
import assert from "node:assert/strict";
import { splitForSpeech } from "../src/ui/speech.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("parte por oraciones conservando el signo", () => {
  const p = splitForSpeech("Hola. Muy bien! Que tal?");
  assert.deepEqual(p, ["Hola.", "Muy bien!", "Que tal?"]);
});

test("texto vacio -> []", () => {
  assert.deepEqual(splitForSpeech("   "), []);
});

test("oracion muy larga se subdivide por comas", () => {
  const long = "Primero explico la regla con calma, luego te doy un ejemplo claro y sencillo, " +
    "despues practicas conmigo, y al final repasamos lo aprendido para que no se te olvide nunca.";
  const p = splitForSpeech(long, 60);
  assert.ok(p.length >= 2, "debe partirse en varios trozos");
  assert.ok(p.every((x) => x.length <= 90), "ningun trozo debe ser gigante");
});

test("frases cortas se quedan separadas (pausas naturales)", () => {
  assert.deepEqual(splitForSpeech("Bien. Ya."), ["Bien.", "Ya."]);
});

test("sin puntuacion devuelve el texto entero", () => {
  assert.deepEqual(splitForSpeech("una frase sin puntos"), ["una frase sin puntos"]);
});

console.log(`\n${passed} pruebas en verde.`);
