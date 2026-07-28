/**
 * tests/role-play.test.mjs — Pruebas del motor PURO del Reading role-play.
 * Correr con:  node tests/role-play.test.mjs
 */
import assert from "node:assert/strict";
import {
  parseDialogue, dialogueSpeakers, isDialogue, buildScript, scoreLine, sessionScore,
} from "../src/core/role-play.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

const BOOK_CLUB =
  "A: What did you think of the book? B: The characters, many of whom felt real, were amazing. " +
  "A: And the ending? B: The final chapter, in which everything changes, was brilliant.";

test("parseDialogue separa turnos en linea (varios por linea)", () => {
  const turns = parseDialogue(BOOK_CLUB);
  assert.equal(turns.length, 4);
  assert.equal(turns[0].speaker, "A");
  assert.equal(turns[0].line, "What did you think of the book?");
  assert.equal(turns[1].speaker, "B");
  assert.ok(turns[1].line.startsWith("The characters"));
});

test("parseDialogue con nombres propios como hablante", () => {
  const turns = parseDialogue("Maria: Hello there.\nTom: Hi Maria, how are you?");
  assert.equal(turns.length, 2);
  assert.deepEqual(turns.map((t) => t.speaker), ["Maria", "Tom"]);
});

test("parseDialogue devuelve [] si no hay dialogo real", () => {
  assert.deepEqual(parseDialogue("The novel has many characters and themes."), []);
});

test("dialogueSpeakers en orden de aparicion, sin repetir", () => {
  assert.deepEqual(dialogueSpeakers(parseDialogue(BOOK_CLUB)), ["A", "B"]);
});

test("isDialogue distingue dialogo de prosa", () => {
  assert.equal(isDialogue(BOOK_CLUB), true);
  assert.equal(isDialogue("Just a plain paragraph with no speakers."), false);
});

test("buildScript marca las lineas del personaje elegido", () => {
  const script = buildScript(parseDialogue(BOOK_CLUB), "B");
  assert.equal(script.length, 4);
  assert.deepEqual(script.map((s) => s.isUser), [false, true, false, true]);
});

test("scoreLine puntua lo dicho vs el objetivo", () => {
  const perfect = scoreLine("And the ending", "and the ending");
  assert.equal(perfect.pct, 100);
  const half = scoreLine("And the ending now", "and the");
  assert.ok(half.pct > 0 && half.pct < 100);
  assert.ok(half.missing.length >= 1);
});

test("sessionScore promedia proporciones a 0..100", () => {
  assert.equal(sessionScore([1, 0.5, 0.5]), 67);
  assert.equal(sessionScore([]), 0);
});

console.log(`\n${passed} pruebas en verde.`);
