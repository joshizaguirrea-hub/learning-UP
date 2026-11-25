/**
 * tests/speaking-ja.test.mjs — Pruebas del Speaking escalonado (japones).
 * Correr con:  node tests/speaking-ja.test.mjs
 */
import assert from "node:assert/strict";
import { buildJaSpeakingDeck, scoreJaSpeech } from "../src/core/speaking-ja.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

const UNIT = {
  id: "ja1", language: "ja",
  vocab: [
    { id: "j1", term: "\u3053\u3093\u306b\u3061\u306f (Konnichiwa)", translation: "hola",
      example: "\u3053\u3093\u306b\u3061\u306f\u3001\u304a\u3052\u3093\u304d\u3067\u3059\u304b\u3002(Konnichiwa, o-genki desu ka?)" },
    { id: "j2", term: "\u3042\u308a\u304c\u3068\u3046 (Arigatou)", translation: "gracias" },
  ],
};

test("buildJaSpeakingDeck arma nivel 1 (palabras) y nivel 2 (frases)", () => {
  const deck = buildJaSpeakingDeck(UNIT);
  assert.ok(deck.some((it) => it.level === 1));
  assert.ok(deck.some((it) => it.level === 2));
});

test("nivel 1 usa SOLO vocab con ejemplo o no (siempre tiene palabra + significado)", () => {
  const deck = buildJaSpeakingDeck(UNIT);
  const words = deck.filter((it) => it.level === 1);
  assert.equal(words.length, 2); // ambos vocab items tienen term+translation
  for (const w of words) assert.ok(w.translation);
});

test("nivel 2 solo sale para vocab CON ejemplo, y trae pista (hint)", () => {
  const deck = buildJaSpeakingDeck(UNIT);
  const sentences = deck.filter((it) => it.level === 2);
  assert.equal(sentences.length, 1); // solo j1 tiene example
  assert.ok(sentences[0].hint.includes("Konnichiwa"));
  assert.ok(sentences[0].hint.includes("hola"));
});

test("kana de cada item NUNCA trae romaji pegado (parentesis)", () => {
  const deck = buildJaSpeakingDeck(UNIT);
  for (const it of deck) assert.ok(!it.kana.includes("("));
});

test("scoreJaSpeech: texto identico = 1.0 (aprueba)", () => {
  const r = scoreJaSpeech("\u3053\u3093\u306b\u3061\u306f", "\u3053\u3093\u306b\u3061\u306f");
  assert.equal(r.score, 1);
  assert.equal(r.ok, true);
});

test("scoreJaSpeech: muy distinto = score bajo (no aprueba)", () => {
  const r = scoreJaSpeech("\u3053\u3093\u306b\u3061\u306f", "\u3055\u3088\u3046\u306a\u3089");
  assert.ok(r.score < 0.6);
  assert.equal(r.ok, false);
});

test("scoreJaSpeech ignora puntuacion japonesa al comparar", () => {
  const r = scoreJaSpeech("\u3053\u3093\u306b\u3061\u306f\u3002", "\u3053\u3093\u306b\u3061\u306f");
  assert.equal(r.score, 1);
});

test("scoreJaSpeech: vacio no revienta (score 0)", () => {
  assert.equal(scoreJaSpeech("", "algo").score, 0);
  assert.equal(scoreJaSpeech("algo", "").score, 0);
});

console.log(`\n${passed} pruebas en verde.`);
