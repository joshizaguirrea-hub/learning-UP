/**
 * tests/ja-script.test.mjs — Pruebas del separador kana/romaji (core puro).
 * Correr con:  node tests/ja-script.test.mjs
 */
import assert from "node:assert/strict";
import { splitJa, splitJaBlock, jaSpeakText } from "../src/core/ja-script.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("splitJa separa kana y romaji de un termino simple", () => {
  const r = splitJa("\u3053\u3093\u306b\u3061\u306f (Konnichiwa)");
  assert.equal(r.jp, "\u3053\u3093\u306b\u3061\u306f");
  assert.equal(r.romaji, "Konnichiwa");
});

test("splitJa conserva el marcado *foco* en ambas partes", () => {
  const r = splitJa("\u308f\u305f\u3057\u306f *\u304c\u304f\u305b\u3044* \u3067\u3059\u3002 (Watashi wa *gakusei* desu.)");
  assert.ok(r.jp.includes("*\u304c\u304f\u305b\u3044*"));
  assert.ok(r.romaji.includes("*gakusei*"));
});

test("splitJa sin parentesis devuelve romaji null (no rompe nada)", () => {
  const r = splitJa("\u3053\u3093\u306b\u3061\u306f");
  assert.equal(r.romaji, null);
  assert.equal(r.jp, "\u3053\u3093\u306b\u3061\u306f");
});

test("splitJaBlock empareja linea kana + linea romaji envuelta en parentesis", () => {
  const block = "\u306f\u3058\u3081\u307e\u3057\u3066\u3002\n(Hajimemashite.)\n\u3053\u308c\u306f\u30c8\u30e0\u3055\u3093\u3067\u3059\u3002\n(Kore wa Tomu-san desu.)";
  const r = splitJaBlock(block);
  assert.equal(r.length, 2);
  assert.equal(r[0].jp, "\u306f\u3058\u3081\u307e\u3057\u3066\u3002");
  assert.equal(r[0].romaji, "Hajimemashite.");
  assert.equal(r[1].romaji, "Kore wa Tomu-san desu.");
});

test("splitJaBlock soporta la convencion MISMA linea (dialogos)", () => {
  const block = "A: \u3053\u3093\u306b\u3061\u306f\u3002(Konnichiwa.)";
  const r = splitJaBlock(block);
  assert.equal(r.length, 1);
  assert.equal(r[0].jp, "A: \u3053\u3093\u306b\u3061\u306f\u3002");
  assert.equal(r[0].romaji, "Konnichiwa.");
});

test("splitJaBlock conserva lineas vacias como separadores (sin fundirlas)", () => {
  const r = splitJaBlock("a\n(A)\n\nb\n(B)");
  assert.equal(r.length, 3);
  assert.equal(r[0].romaji, "A");
  assert.equal(r[1].blank, true);
  assert.equal(r[2].romaji, "B");
});

test("jaSpeakText devuelve SOLO el kana (nunca el romaji, para el TTS)", () => {
  assert.equal(jaSpeakText("\u3053\u3093\u306b\u3061\u306f (Konnichiwa)"), "\u3053\u3093\u306b\u3061\u306f");
  assert.equal(jaSpeakText("\u3053\u3093\u306b\u3061\u306f"), "\u3053\u3093\u306b\u3061\u306f");
});

console.log(`\n${passed} pruebas en verde.`);
