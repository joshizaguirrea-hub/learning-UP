/**
 * tests/checkpoint.test.mjs — Pruebas de la logica pura del Repaso acumulativo.
 * Correr con:  node tests/checkpoint.test.mjs
 */
import assert from "node:assert/strict";
import { buildCheckpoint, scorePct, unitsCovered } from "../src/core/checkpoint.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

const mkUnit = (id, words) => ({
  id, title: id.toUpperCase(), level: "A1", language: "pt",
  vocab: words.map((w, i) => ({ id: `${id}-v${i}`, term: w[0], translation: w[1], example: `${w[0]} exemplo.` })),
  lessons: [{
    skills: ["grammar"],
    activities: [
      { id: `${id}-g1`, type: "cloze", prompt: `Completa ${id}`, payload: { answer: "sou" } },
      { id: `${id}-g2`, type: "multiple_choice", prompt: `Elige ${id}`, payload: { choices: ["a", "b", "c"], answer: 1 } },
    ],
  }],
});

const U1 = mkUnit("u1", [["ola", "hola"], ["tchau", "adios"], ["nome", "nombre"], ["amigo", "amigo"]]);
const U2 = mkUnit("u2", [["casa", "casa"], ["mesa", "mesa"], ["porta", "puerta"], ["rua", "calle"]]);
const U3 = mkUnit("u3", [["gato", "gato"], ["livro", "libro"], ["agua", "agua"], ["pao", "pan"]]);

test("scorePct calcula porcentaje", () => {
  assert.equal(scorePct(6, 12), 50);
  assert.equal(scorePct(0, 0), 0);
});

test("buildCheckpoint mezcla varias unidades (interleaving, no en bloque)", () => {
  const deck = buildCheckpoint([U1, U2, U3], { max: 9, perUnit: 3 });
  // Los primeros 3 pasos deben venir de unidades DISTINTAS (round-robin).
  const firstThree = deck.slice(0, 3).map((i) => i.unitId);
  assert.equal(new Set(firstThree).size, 3, "los primeros 3 items son de 3 unidades distintas");
});

test("buildCheckpoint respeta el maximo", () => {
  assert.ok(buildCheckpoint([U1, U2, U3], { max: 5 }).length <= 5);
});

test("cada item choose tiene exactamente una opcion correcta", () => {
  const deck = buildCheckpoint([U1, U2, U3], { max: 30 });
  for (const it of deck.filter((d) => d.kind === "choose")) {
    assert.equal(it.options.filter((o) => o.correct).length, 1);
    assert.ok(it.refId, "vocab trae refId para el SRS");
  }
});

test("incluye gramatica de las unidades (mezcla de tipos)", () => {
  const deck = buildCheckpoint([U1, U2, U3], { max: 30, perUnit: 4 });
  assert.ok(deck.some((d) => d.kind === "grammar"), "debe haber items de gramatica");
  assert.ok(deck.some((d) => d.kind === "choose"), "debe haber items de vocabulario");
});

test("unitsCovered cuenta unidades distintas", () => {
  const deck = buildCheckpoint([U1, U2, U3], { max: 9, perUnit: 3 });
  assert.equal(unitsCovered(deck), 3);
});

test("tolera lista vacia o nula", () => {
  assert.deepEqual(buildCheckpoint([]), []);
  assert.deepEqual(buildCheckpoint(null), []);
});

test("con una sola unidad funciona (sin round-robin)", () => {
  const deck = buildCheckpoint([U1], { max: 10 });
  assert.ok(deck.length > 0);
  assert.equal(unitsCovered(deck), 1);
});

console.log(`\n${passed} pruebas en verde.`);
