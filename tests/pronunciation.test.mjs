/**
 * tests/pronunciation.test.mjs — Pruebas de la logica pura del Pronuncia Lab.
 * Correr con:  node tests/pronunciation.test.mjs
 */
import assert from "node:assert/strict";
import { buildPronunciationDrill, scorePct, scorableSteps } from "../src/core/pronunciation.js";
import { pronunciationPackFor } from "../src/data/pt-pronunciation.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

const PACK = {
  language: "xx",
  title: "test",
  sounds: [
    {
      id: "s1", label: "Sonido 1", tip: "tip1",
      examples: [{ word: "aa", es: "a" }, { word: "bb", es: "b" }],
      pairs: [
        { a: { word: "pao", es: "pan" }, b: { word: "pau", es: "palo" }, tip: "nasal vs oral" },
      ],
    },
    {
      id: "s2", label: "Sonido 2", tip: "tip2",
      examples: [{ word: "cc", es: "c" }],
      pairs: [], // sonido solo de guia (sin pares)
    },
  ],
};

test("scorePct calcula porcentaje", () => {
  assert.equal(scorePct(3, 4), 75);
  assert.equal(scorePct(0, 0), 0);
});

test("buildPronunciationDrill emite guia antes de sus pares", () => {
  const drill = buildPronunciationDrill(PACK);
  assert.equal(drill[0].kind, "guide");
  assert.equal(drill[0].soundId, "s1");
  assert.equal(drill[1].kind, "discriminate");
  assert.equal(drill[1].soundId, "s1");
});

test("cada discriminate tiene exactamente una opcion correcta", () => {
  const drill = buildPronunciationDrill(PACK);
  for (const s of drill.filter((x) => x.kind === "discriminate")) {
    assert.equal(s.options.filter((o) => o.correct).length, 1);
    assert.ok(s.say, "debe traer una palabra que suena");
  }
});

test("un sonido sin pares emite solo su guia", () => {
  const drill = buildPronunciationDrill(PACK);
  const s2 = drill.filter((x) => x.soundId === "s2");
  assert.equal(s2.length, 1);
  assert.equal(s2[0].kind, "guide");
});

test("scorableSteps cuenta solo los de discriminacion", () => {
  const drill = buildPronunciationDrill(PACK);
  assert.equal(scorableSteps(drill), 1);
});

test("descarta pares invalidos (sin a/b)", () => {
  const bad = { sounds: [{ id: "x", label: "L", tip: "t", examples: [], pairs: [{ a: { word: "solo" } }] }] };
  const drill = buildPronunciationDrill(bad);
  assert.equal(scorableSteps(drill), 0); // el par invalido no cuenta
});

test("respeta el maximo", () => {
  assert.ok(buildPronunciationDrill(PACK, { max: 2 }).length <= 2);
});

test("tolera pack vacio o nulo", () => {
  assert.deepEqual(buildPronunciationDrill(null), []);
  assert.deepEqual(buildPronunciationDrill({}), []);
});

// --- El paquete REAL de portugues ---
test("el paquete pt existe y trae sonidos con ejemplos", () => {
  const pack = pronunciationPackFor("pt");
  assert.ok(pack, "debe existir el pack pt");
  assert.ok(pack.sounds.length >= 5, "al menos 5 sonidos");
  for (const s of pack.sounds) {
    assert.ok(s.id && s.label && s.tip, "cada sonido con id/label/tip");
    assert.ok((s.examples || []).length >= 1, "cada sonido con ejemplos para oir");
  }
  assert.equal(pronunciationPackFor("zz"), null); // idioma sin pack -> null
});

test("el drill pt tiene guias y discriminaciones", () => {
  const drill = buildPronunciationDrill(pronunciationPackFor("pt"));
  assert.ok(drill.some((s) => s.kind === "guide"));
  assert.ok(scorableSteps(drill) >= 3, "al menos 3 pares minimos para el oido");
});

console.log(`\n${passed} pruebas en verde.`);
