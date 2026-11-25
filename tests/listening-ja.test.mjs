/**
 * tests/listening-ja.test.mjs — Pruebas del Listening escalonado (japones).
 * Correr con:  node tests/listening-ja.test.mjs
 */
import assert from "node:assert/strict";
import { buildJaListeningLadder, scorePct } from "../src/core/listening-ja.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

const UNIT = {
  id: "ja1", language: "ja",
  vocab: [
    { id: "j1", term: "\u3053\u3093\u306b\u3061\u306f (Konnichiwa)", translation: "hola",
      example: "\u3053\u3093\u306b\u3061\u306f\u3002(Konnichiwa.)" },
    { id: "j2", term: "\u3055\u3088\u3046\u306a\u3089 (Sayonara)", translation: "adios",
      example: "\u3055\u3088\u3046\u306a\u3089\u3002(Sayonara.)" },
    { id: "j3", term: "\u3042\u308a\u304c\u3068\u3046 (Arigatou)", translation: "gracias",
      example: "\u3042\u308a\u304c\u3068\u3046\u3002(Arigatou.)" },
  ],
};

test("buildJaListeningLadder arma ronda A (significado) y B (palabra)", () => {
  const ladder = buildJaListeningLadder(UNIT);
  assert.ok(ladder.some((it) => it.kind === "meaning"));
  assert.ok(ladder.some((it) => it.kind === "word"));
});

test("'say' en ronda A/B es SOLO kana (nunca el romaji, para el audio)", () => {
  const ladder = buildJaListeningLadder(UNIT);
  for (const it of ladder) assert.ok(!it.say.includes("("));
});

test("las opciones de la ronda B muestran ROMAJI (no kana, se puede leer)", () => {
  const ladder = buildJaListeningLadder(UNIT);
  const wordItems = ladder.filter((it) => it.kind === "word");
  for (const it of wordItems) {
    const correct = it.options.find((o) => o.correct);
    assert.ok(/^[A-Za-z]/.test(correct.text), "la opcion correcta deberia ser romaji: " + correct.text);
  }
});

test("cada item tiene exactamente una opcion correcta", () => {
  const ladder = buildJaListeningLadder(UNIT);
  for (const it of ladder) {
    assert.equal(it.options.filter((o) => o.correct).length, 1);
    assert.equal(it.options.length, 3);
  }
});

test("scorePct calcula porcentaje", () => {
  assert.equal(scorePct(2, 4), 50);
  assert.equal(scorePct(0, 0), 0);
});

console.log(`\n${passed} pruebas en verde.`);
