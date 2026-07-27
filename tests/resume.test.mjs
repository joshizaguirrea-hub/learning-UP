/**
 * tests/resume.test.mjs — Pruebas de la logica pura de autosave/continuar.
 * Correr con:  node tests/resume.test.mjs
 */
import assert from "node:assert/strict";

// Shim minimo de localStorage antes de importar el modulo (no hay en Node).
const _mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (_mem.has(k) ? _mem.get(k) : null),
  setItem: (k, v) => { _mem.set(k, String(v)); },
  removeItem: (k) => { _mem.delete(k); },
};

const { makeResumeKey, saveProgress, loadProgress, clearProgress } =
  await import("../src/core/resume.js");

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("makeResumeKey junta partes y sanea caracteres raros", () => {
  assert.equal(makeResumeKey("user 1", "a1-food", "vocablab"), "user_1.a1-food.vocablab");
  assert.equal(makeResumeKey(undefined, "u"), "anon.u"); // undefined -> 'anon'
});

test("save + load devuelve el estado guardado", () => {
  const key = makeResumeKey("u", "unit", "ex");
  saveProgress(key, { idx: 3, correct: 2 });
  assert.deepEqual(loadProgress(key), { idx: 3, correct: 2 });
});

test("clearProgress borra el estado", () => {
  const key = makeResumeKey("u", "unit", "ex2");
  saveProgress(key, { idx: 1 });
  clearProgress(key);
  assert.equal(loadProgress(key), null);
});

test("loadProgress devuelve null si no hay nada", () => {
  assert.equal(loadProgress(makeResumeKey("nada")), null);
});

test("loadProgress ignora (y limpia) un avance expirado (>2 dias)", () => {
  const key = makeResumeKey("u", "viejo");
  const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
  // Escribe a mano un registro con sello de tiempo viejo.
  globalThis.localStorage.setItem("linguapath.resume." + key,
    JSON.stringify({ ts: Date.now() - THREE_DAYS, state: { idx: 9 } }));
  assert.equal(loadProgress(key), null);
  // y ademas lo borro
  assert.equal(globalThis.localStorage.getItem("linguapath.resume." + key), null);
});

test("save/load/clear no rompen sin clave", () => {
  assert.equal(loadProgress(""), null);
  saveProgress("", { idx: 1 }); // no debe lanzar
  clearProgress("");            // no debe lanzar
});

console.log(`\n${passed} pruebas en verde.`);
