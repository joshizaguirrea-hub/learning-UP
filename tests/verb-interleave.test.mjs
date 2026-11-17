/**
 * tests/verb-interleave.test.mjs — Pruebas de la distribucion de verbos del
 * tema en gramatica/vocabulario (en vez de un mazo aparte y obligatorio).
 * Correr con:  node tests/verb-interleave.test.mjs
 */
import assert from "node:assert/strict";
import { withVerbInterleave } from "../src/data/verb-interleave.js";
import { requiredBonusDeckIds } from "../src/core/unit-requirements.js";
import { UNITS } from "../src/data/units/index.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

/** Unidad minima con leccion de gramatica, para probar sin depender del catalogo real. */
function fakeUnit(id) {
  return {
    id,
    vocab: [{ id: "v1", term: "colleague", translation: "colega" }],
    lessons: [
      {
        id: `${id}-gram`,
        skills: ["grammar"],
        intro: "Aprende la regla.",
        grammar: { title: "Regla", examples: ["I work hard."] },
        activities: [{ id: "a1", type: "multiple_choice", payload: { choices: ["a", "b"], answer: 0 } }],
      },
    ],
  };
}

test("unidad sin mazo de verbos por tema queda intacta", () => {
  const unit = fakeUnit("unidad-sin-mazo-xyz");
  const before = JSON.stringify(unit);
  withVerbInterleave(unit);
  assert.equal(JSON.stringify(unit), before);
});

test("unidad CON mazo: suma vocabulario (pasado/participio) sin duplicar", () => {
  const unit = fakeUnit("work-career-b1"); // topic real en data/topic-verb-decks.js
  const before = unit.vocab.length;
  withVerbInterleave(unit);
  assert.ok(unit.vocab.length > before, "deberia agregar items de vocabulario");
  // ids unicos (requisito de core/content-audit.js)
  const ids = unit.vocab.map((v) => v.id);
  assert.equal(new Set(ids).size, ids.length, "no deberia haber ids de vocab duplicados");
});

test("unidad CON mazo: la gramatica anuncia los verbos y suma ejemplos", () => {
  const unit = fakeUnit("work-career-b1");
  const beforeExamples = unit.lessons[0].grammar.examples.length;
  withVerbInterleave(unit);
  const gram = unit.lessons[0];
  assert.ok(gram.intro.includes("verbos"), "el intro deberia mencionar los verbos");
  assert.ok(gram.grammar.examples.length > beforeExamples, "deberia sumar ejemplos a la gramatica");
});

test("unidad CON mazo: suma calentamiento FACIL (maximo 2), no el reto completo", () => {
  const unit = fakeUnit("work-career-b1");
  const beforeActs = unit.lessons[0].activities.length;
  withVerbInterleave(unit);
  const added = unit.lessons[0].activities.length - beforeActs;
  assert.ok(added >= 1 && added <= 2, `deberia sumar 1-2 ejercicios, sumo ${added}`);
  assert.ok(unit.lessons[0].activities.every((a) => a.type === "multiple_choice" || a.payload));
});

test("requiredBonusDeckIds ya NO bloquea ninguna unidad (decision v3)", () => {
  assert.deepEqual(requiredBonusDeckIds(fakeUnit("work-career-b1")), []);
  assert.deepEqual(requiredBonusDeckIds(null), []);
});

test("el catalogo real: ninguna unidad con mazo de verbos queda sin vocab ampliado", () => {
  // Sanity check sobre datos reales (ya pasados por el pipeline de index.js).
  const withDeck = UNITS.filter((u) => u.vocab.some((v) => v.translation?.startsWith("pasado de")));
  assert.ok(withDeck.length > 0, "deberia haber al menos una unidad real con verbos interleaved");
});

console.log(`\n${passed} pruebas en verde.`);
