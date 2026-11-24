/**
 * tests/kana-lab.test.mjs — Pruebas del laboratorio de Escritura (Hiragana).
 * Correr con:  node tests/kana-lab.test.mjs
 */
import assert from "node:assert/strict";
import { charsForRow, kanaRows, buildKanaQuiz, scorePct } from "../src/core/kana-lab.js";
import { HIRAGANA, hiraganaByRow, hiraganaById, GOJUON_TABLE, readyRows } from "../src/data/kana-hiragana.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("el catalogo de hiragana tiene ids/kana/romaji unicos", () => {
  const ids = new Set(HIRAGANA.map((k) => k.id));
  const kanas = new Set(HIRAGANA.map((k) => k.kana));
  assert.equal(ids.size, HIRAGANA.length);
  assert.equal(kanas.size, HIRAGANA.length);
  for (const k of HIRAGANA) assert.ok(k.mnemonic && k.example?.term);
});

test("kanaRows devuelve las filas en orden, sin repetir", () => {
  const rows = kanaRows();
  assert.deepEqual(rows, ["a", "ka", "sa"]);
});

test("charsForRow filtra por fila", () => {
  assert.equal(charsForRow("a").length, 5);
  assert.equal(charsForRow("ka").length, 5);
  assert.equal(charsForRow().length, HIRAGANA.length);
});

test("hiraganaByRow agrupa igual que charsForRow", () => {
  const map = hiraganaByRow();
  assert.equal(map.get("sa").length, 5);
});

test("hiraganaById encuentra o devuelve null", () => {
  assert.equal(hiraganaById("hira-a").kana, "\u3042");
  assert.equal(hiraganaById("no-existe"), null);
});

test("buildKanaQuiz arma 2 items por caracter (leer + buscar)", () => {
  const chars = charsForRow("a");
  const quiz = buildKanaQuiz(chars);
  assert.equal(quiz.length, chars.length * 2);
  assert.ok(quiz.every((q) => q.kind === "read" || q.kind === "find"));
});

test("cada item de quiz tiene exactamente una opcion correcta", () => {
  const quiz = buildKanaQuiz(charsForRow("ka"));
  for (const q of quiz) {
    assert.equal(q.options.filter((o) => o.correct).length, 1);
    assert.ok(q.options.length >= 2);
  }
});

test("buildKanaQuiz con lote chico igual arma opciones (tira del catalogo completo)", () => {
  const quiz = buildKanaQuiz(charsForRow("a").slice(0, 1), { maxOptions: 4 });
  assert.equal(quiz.length, 2);
  for (const q of quiz) assert.equal(q.options.length, 4);
});

test("scorePct calcula porcentaje", () => {
  assert.equal(scorePct(5, 10), 50);
  assert.equal(scorePct(0, 0), 0);
});

test("GOJUON_TABLE tiene las 11 filas del gojuon completo (46 sonidos)", () => {
  assert.equal(GOJUON_TABLE.length, 11);
  const total = GOJUON_TABLE.reduce((n, r) => n + r.cells.filter(Boolean).length, 0);
  assert.equal(total, 46);
});

test("readyRows refleja exactamente las filas que ya estan en HIRAGANA", () => {
  assert.deepEqual(readyRows(), ["a", "ka", "sa"]);
});

test("toda fila 'ready' existe tambien en GOJUON_TABLE (consistencia de datos)", () => {
  const tableRows = GOJUON_TABLE.map((r) => r.row);
  for (const row of readyRows()) assert.ok(tableRows.includes(row));
});

console.log(`\n${passed} pruebas en verde.`);
