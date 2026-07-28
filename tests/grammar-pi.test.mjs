/**
 * tests/grammar-pi.test.mjs — Pruebas del Processing Instruction avanzado (PURO).
 * Correr con:  node tests/grammar-pi.test.mjs
 */
import assert from "node:assert/strict";
import { explicitInfo, buildAffectiveItems } from "../src/core/grammar-pi.js";
import { buildGrammarInput } from "../src/core/grammar-si.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

// Unidad ficticia con variedad de tiempos y polaridad (frases SIN adverbio de
// tiempo, para que el referencial de TIEMPO se active).
const UNIT = {
  id: "u-test", level: "B1", title: "Test unit",
  lessons: [{
    grammar: {
      title: "Mixed tenses",
      form: "verb forms",
      rule: "Look at the verb.",
      examples: ["She went to the market.", "He will call you.", "I don't like coffee."],
      mistakes: [{ wrong: "She go", right: "She goes every day." }],
    },
  }],
  vocab: [
    { term: "eat", example: "They ate a big lunch." },
    { term: "run", example: "We never run in the rain." },
  ],
};

test("explicitInfo devuelve la EI de las familias presentes", () => {
  const si = buildGrammarInput(UNIT);
  const ei = explicitInfo(si);
  const fams = ei.map((e) => e.family);
  assert.ok(fams.includes("tense"), "debe incluir tense");
  assert.ok(fams.includes("polarity"), "debe incluir polarity");
  for (const e of ei) {
    assert.ok(e.trap && e.fix && e.focus, "cada EI trae trap/fix/focus");
  }
});

test("explicitInfo vacio si no hay items", () => {
  assert.deepEqual(explicitInfo({ items: [] }), []);
});

test("buildAffectiveItems genera items con pregunta y opciones sin 'correct'", () => {
  const items = buildAffectiveItems(UNIT, { max: 4 });
  assert.ok(items.length > 0 && items.length <= 4);
  for (const it of items) {
    assert.ok(it.sentence && it.question && it.note);
    assert.ok(Array.isArray(it.options) && it.options.length >= 2);
    // afectivo = sin respuesta correcta
    assert.ok(it.options.every((o) => o.correct === undefined));
    assert.ok(["tense", "polarity"].includes(it.family));
  }
});

test("buildAffectiveItems etiqueta bien pasado y negacion", () => {
  const items = buildAffectiveItems(UNIT, { max: 8 });
  const past = items.find((it) => it.sentence.includes("went"));
  assert.ok(past && /pasado/.test(past.note));
  const neg = items.find((it) => it.sentence.includes("never"));
  assert.ok(neg && it_isNeg(neg));
  function it_isNeg(x) { return /NIEGA/.test(x.note); }
});

test("buildAffectiveItems respeta el max", () => {
  assert.ok(buildAffectiveItems(UNIT, { max: 2 }).length <= 2);
});

console.log(`\n${passed} pruebas en verde.`);
