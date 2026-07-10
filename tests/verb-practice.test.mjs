/**
 * tests/verb-practice.test.mjs — Pruebas del generador de practicas por verbo.
 * Correr con:  node tests/verb-practice.test.mjs
 */
import assert from "node:assert/strict";
import { buildPractice } from "../src/core/verb-practice.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

const irregular = {
  front: "go", past: "went", participle: "gone", back: "went / gone",
  examples: [
    { en: "I go every day.", es: "Voy cada dia." },
    { en: "She went home early.", es: "Se fue temprano." },
    { en: "They have gone already.", es: "Ya se han ido." },
  ],
};

const regular = {
  front: "work", back: "worked",
  examples: [
    { en: "I work from home.", es: "Trabajo desde casa." },
    { en: "We worked late yesterday.", es: "Trabajamos tarde ayer." },
  ],
};

test("irregular genera 3 practicas (facil/intermedio/dificil)", () => {
  const ex = buildPractice(irregular);
  assert.equal(ex.length, 3);
  assert.deepEqual(ex.map((e) => e.level), ["Facil", "Intermedio", "Dificil"]);
});

test("la opcion correcta del facil es el pasado", () => {
  const facil = buildPractice(irregular)[0];
  assert.equal(facil.choices[facil.answer], "went");
});

test("intermedio pide el pasado con hueco", () => {
  const inter = buildPractice(irregular)[1];
  assert.equal(inter.answer, "went");
  assert.ok(inter.prompt.includes("_____"));
});

test("dificil pide el participio", () => {
  const dif = buildPractice(irregular)[2];
  assert.equal(dif.answer, "gone");
});

test("regular no genera practica de participio", () => {
  const ex = buildPractice(regular);
  assert.ok(!ex.some((e) => e.level === "Dificil"));
  assert.equal(ex[0].choices[ex[0].answer], "worked");
});

test("todas las practicas traen explicacion y por que", () => {
  for (const e of buildPractice(irregular)) {
    assert.ok(e.explain && e.explain.length > 0);
    assert.ok(e.why && e.why.length > 0);
  }
});

console.log(`\n${passed} pruebas en verde.`);
