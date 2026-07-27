/**
 * tests/vocab-lab.test.mjs — Pruebas de la logica pura del Vocab Lab.
 * Correr con:  node tests/vocab-lab.test.mjs
 */
import assert from "node:assert/strict";
import {
  cleanTerm, acceptsFor, editDistance, firstHint, clozeExample,
  confusable, buildVocabLadder, scorePct, vocabTeachList,
} from "../src/core/vocab-lab.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

const UNIT = {
  id: "u",
  vocab: [
    { id: "v1", term: "to hire", translation: "contratar", example: "They want to hire two engineers." },
    { id: "v2", term: "deadline", translation: "fecha limite", example: "The deadline is next Friday." },
    { id: "v3", term: "meeting", translation: "reunion", example: "We have a meeting at ten." },
    { id: "v4", term: "salary", translation: "sueldo", example: "They offered a good salary." },
    { id: "v5", term: "colleague", translation: "colega", example: "My colleague helped me." },
  ],
};

test("cleanTerm quita 'to' y parentesis", () => {
  assert.equal(cleanTerm("to apply (for)"), "apply");
  assert.equal(cleanTerm("deadline"), "deadline");
});

test("acceptsFor acepta con y sin 'to'", () => {
  const a = acceptsFor("to hire");
  assert.ok(a.includes("hire"));
  assert.ok(a.includes("to hire"));
});

test("editDistance basico", () => {
  assert.equal(editDistance("cat", "cat"), 0);
  assert.equal(editDistance("cat", "cut"), 1);
  assert.equal(editDistance("ship", "sheep"), 2);
});

test("firstHint muestra inicial y largo", () => {
  const h = firstHint("deadline");
  assert.ok(h.startsWith("d"));
  assert.equal((h.match(/_/g) || []).length, 7); // 8 letras -> 7 huecos
});

test("clozeExample reemplaza la palabra por hueco", () => {
  const cz = clozeExample("The deadline is next Friday.", "deadline");
  assert.equal(cz.answer.toLowerCase(), "deadline");
  assert.ok(cz.sentence.includes("_____"));
  assert.ok(!/deadline/i.test(cz.sentence));
});

test("clozeExample devuelve null si la palabra no esta", () => {
  assert.equal(clozeExample("Something else entirely.", "deadline"), null);
});

test("confusable elige la palabra mas parecida (o null)", () => {
  assert.equal(confusable("ship", ["sheep", "banana"]), "sheep");
  assert.equal(confusable("deadline", ["banana", "elephant"]), null);
});

test("buildVocabLadder ordena por rondas (niveles crecientes)", () => {
  const deck = buildVocabLadder(UNIT, { max: 100 });
  const levels = deck.map((d) => d.level);
  const sorted = [...levels].sort((a, b) => a - b);
  assert.deepEqual(levels, sorted, "los niveles deben ir en orden creciente");
  // debe haber al menos reconocer(1), pista(2), colocacion(3), produccion(4)
  assert.ok(levels.includes(1) && levels.includes(2) && levels.includes(3) && levels.includes(4));
});

test("buildVocabLadder respeta el maximo", () => {
  assert.ok(buildVocabLadder(UNIT, { max: 5 }).length <= 5);
});

test("cada 'choose' tiene exactamente una opcion correcta", () => {
  const deck = buildVocabLadder(UNIT, { max: 100 });
  for (const ex of deck.filter((d) => d.kind === "choose" || d.kind === "audio")) {
    assert.equal(ex.options.filter((o) => o.correct).length, 1);
  }
});

test("scorePct calcula porcentaje", () => {
  assert.equal(scorePct(3, 4), 75);
  assert.equal(scorePct(0, 0), 0);
});

test("vocabTeachList limpia terminos y respeta el maximo", () => {
  const list = vocabTeachList(UNIT, { max: 3 });
  assert.equal(list.length, 3);
  assert.equal(list[0].clean, "hire");        // 'to hire' -> 'hire'
  assert.equal(list[0].translation, "contratar");
  assert.ok(list[0].example.includes("hire"));
  // cada item trae los campos que la clase necesita
  for (const w of list) {
    assert.ok(w.id && w.term && w.clean && w.translation);
  }
});

test("vocabTeachList descarta vocab sin term/translation y tolera unit vacio", () => {
  const dirty = { vocab: [{ id: "x", term: "cat" }, { id: "y", translation: "solo" }, { id: "z", term: "dog", translation: "perro" }] };
  const list = vocabTeachList(dirty);
  assert.equal(list.length, 1);
  assert.equal(list[0].clean, "dog");
  assert.deepEqual(vocabTeachList({}), []);
  assert.deepEqual(vocabTeachList(null), []);
});

console.log(`\n${passed} pruebas en verde.`);
