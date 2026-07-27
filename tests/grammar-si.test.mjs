/**
 * tests/grammar-si.test.mjs — Pruebas del Structured Input (PURO).
 * Correr con:  node tests/grammar-si.test.mjs
 */
import assert from "node:assert/strict";
import {
  detectTense, detectPolarity, hasTimeMarker, buildGrammarInput, grammarOf, scorePct,
} from "../src/core/grammar-si.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("detectTense: pasado regular (-ed) e irregular", () => {
  assert.equal(detectTense("She watched a movie."), "past");
  assert.equal(detectTense("They were happy."), "past");
  assert.equal(detectTense("We went to Peru."), "past");
});

test("detectTense: presente (be/aux/-s) y NO confunde adjetivos -ed", () => {
  assert.equal(detectTense("I am tired."), "present"); // 'tired' es adjetivo, no verbo
  assert.equal(detectTense("She works here."), "present");
  assert.equal(detectTense("They are excited."), "present");
});

test("detectTense: futuro (will / going to)", () => {
  assert.equal(detectTense("We will travel."), "future");
  assert.equal(detectTense("I am going to study."), "future");
});

test("detectPolarity: afirmativa vs negativa", () => {
  assert.equal(detectPolarity("She is happy."), "aff");
  assert.equal(detectPolarity("I don't like Mondays."), "neg");
  assert.equal(detectPolarity("He never smiles."), "neg");
});

test("hasTimeMarker detecta adverbios de tiempo", () => {
  assert.equal(hasTimeMarker("I was busy yesterday."), true);
  assert.equal(hasTimeMarker("We travel tomorrow."), true);
  assert.equal(hasTimeMarker("She watched a movie."), false);
});

const unit = {
  id: "u",
  vocab: [{ example: "I don't like Mondays." }, { example: "She plays tennis." }],
  lessons: [{
    grammar: {
      title: "Past simple",
      form: "was/were + verb-ed",
      rule: "Usa was/were y -ed para el pasado.",
      examples: ["I was at home.", "They were happy.", "She watched a movie.", "We will travel."],
      mistakes: [{ wrong: "I were tired.", right: "I was tired." }],
    },
  }],
};

test("grammarOf extrae el objeto grammar de la unidad", () => {
  assert.equal(grammarOf(unit).title, "Past simple");
  assert.equal(grammarOf({ lessons: [] }), null);
});

test("buildGrammarInput genera actividades referenciales con respuesta correcta", () => {
  const si = buildGrammarInput(unit);
  assert.equal(si.focus, "Past simple");
  assert.ok(si.items.length > 0, "debe generar items");
  // Toda actividad tiene EXACTAMENTE una opcion correcta.
  for (const it of si.items) {
    const oks = it.options.filter((o) => o.correct).length;
    assert.equal(oks, 1, "una sola correcta en: " + it.sentence);
  }
  // Hay item de futuro correcto para "We will travel."
  const fut = si.items.find((i) => i.family === "tense" && /will travel/i.test(i.sentence));
  assert.ok(fut && fut.options.find((o) => o.correct).text.includes("futuro"));
});

test("buildGrammarInput descarta TIEMPO si no hay variedad (todo presente)", () => {
  const flat = {
    id: "f", vocab: [],
    lessons: [{ grammar: { title: "Present", examples: ["She works.", "They play."], mistakes: [] } }],
  };
  const si = buildGrammarInput(flat);
  assert.equal(si.items.filter((i) => i.family === "tense").length, 0);
});

test("scorePct redondea", () => {
  assert.equal(scorePct(3, 4), 75);
  assert.equal(scorePct(0, 0), 0);
});

console.log(`\n${passed} pruebas en verde.`);
