/**
 * tests/difficulty.test.mjs — Pruebas de los niveles de practica 1..10 (PURO).
 * Correr con:  node tests/difficulty.test.mjs
 */
import assert from "node:assert/strict";
import {
  MIN_LEVEL, MAX_LEVEL, DEFAULT_LEVEL,
  clampLevel, levelInfo, levelLabel, allLevels,
  levelFromCefr, suggestNext, difficultyPrompt,
} from "../src/core/difficulty.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("clampLevel encierra en 1..10 y tolera basura", () => {
  assert.equal(clampLevel(5), 5);
  assert.equal(clampLevel(0), MIN_LEVEL);
  assert.equal(clampLevel(-7), MIN_LEVEL);
  assert.equal(clampLevel(99), MAX_LEVEL);
  assert.equal(clampLevel(3.6), 4);      // redondea
  assert.equal(clampLevel("7"), 7);      // string numerica
  assert.equal(clampLevel(NaN), DEFAULT_LEVEL);
  assert.equal(clampLevel(null), DEFAULT_LEVEL);
  assert.equal(clampLevel(undefined), DEFAULT_LEVEL);
});

test("hay exactamente 10 niveles, numerados 1..10 y completos", () => {
  const all = allLevels();
  assert.equal(all.length, 10);
  all.forEach((lv, i) => {
    assert.equal(lv.n, i + 1);
    assert.ok(lv.label && lv.label.length > 0, "label en nivel " + lv.n);
    assert.ok(lv.hint && lv.hint.length > 0, "hint en nivel " + lv.n);
    assert.ok(lv.prompt && lv.prompt.length > 20, "prompt util en nivel " + lv.n);
  });
});

test("allLevels devuelve una COPIA (no se puede mutar el original)", () => {
  const a = allLevels();
  a.pop();
  assert.equal(allLevels().length, 10);
});

test("levelInfo / levelLabel siempre devuelven algo valido", () => {
  assert.equal(levelInfo(1).n, 1);
  assert.equal(levelInfo(10).n, 10);
  assert.equal(levelInfo(999).n, 10);          // se encierra
  assert.equal(typeof levelLabel(4), "string");
  assert.ok(levelLabel(NaN).length > 0);       // no revienta
});

test("levelFromCefr mapea el nivel MCER a un escalon sensato", () => {
  assert.equal(levelFromCefr("A1"), 2);
  assert.equal(levelFromCefr("a1"), 2);        // case-insensitive
  assert.equal(levelFromCefr("B1"), 4);
  assert.equal(levelFromCefr("C2"), 9);
  assert.equal(levelFromCefr("XX"), DEFAULT_LEVEL);
  assert.equal(levelFromCefr(null), DEFAULT_LEVEL);
});

test("suggestNext sube si le fue bien y baja si le fue mal", () => {
  assert.equal(suggestNext(4, 95), 6);   // excelente -> +2
  assert.equal(suggestNext(4, 80), 5);   // bien      -> +1
  assert.equal(suggestNext(4, 65), 4);   // regular   -> igual
  assert.equal(suggestNext(4, 45), 3);   // flojo     -> -1
  assert.equal(suggestNext(4, 20), 2);   // mal       -> -2
});

test("suggestNext respeta los topes y la basura", () => {
  assert.equal(suggestNext(10, 100), 10);      // no pasa de 10
  assert.equal(suggestNext(1, 0), 1);          // no baja de 1
  assert.equal(suggestNext(9, 95), 10);
  assert.equal(suggestNext(5, NaN), 5);        // sin dato -> se queda
  assert.equal(suggestNext(5, null), 5);
});

test("difficultyPrompt incluye el numero, el nombre y las instrucciones", () => {
  const p = difficultyPrompt(10);
  assert.ok(p.includes("10 de 10"), "debe decir el escalon");
  assert.ok(p.includes("Nivel nativo"), "debe decir el nombre");
  assert.ok(p.length > 80, "debe llevar instrucciones reales para la IA");
  // Niveles distintos producen instrucciones distintas (si no, el selector es decorativo).
  assert.notEqual(difficultyPrompt(1), difficultyPrompt(10));
});

test("los 10 prompts son todos DISTINTOS entre si", () => {
  const prompts = new Set(allLevels().map((lv) => difficultyPrompt(lv.n)));
  assert.equal(prompts.size, 10);
});

console.log(`\n${passed} pruebas en verde.`);
