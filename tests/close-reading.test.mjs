/**
 * tests/close-reading.test.mjs — Pruebas del motor PURO de close-reading.
 * Correr con:  node tests/close-reading.test.mjs
 */
import assert from "node:assert/strict";
import { LENSES, buildCloseReading, buildAnalysisPrompt } from "../src/core/close-reading.js";
import { FEEDBACK_TOKEN, parseFeedback } from "../src/core/feedback.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("LENSES cubre las lentes clave del close-reading", () => {
  const ids = LENSES.map((l) => l.id);
  ["tone", "diction", "subtext", "device", "theme"].forEach((k) => assert.ok(ids.includes(k)));
});

test("buildCloseReading limita por max y conserva title/body", () => {
  const cr = buildCloseReading({ title: "Layers", body: "The novel..." }, { max: 3 });
  assert.equal(cr.title, "Layers");
  assert.equal(cr.body, "The novel...");
  assert.equal(cr.questions.length, 3);
  assert.ok(cr.questions[0].q && cr.questions[0].hint && cr.questions[0].lens);
});

test("buildCloseReading acepta string plano y max minimo 1", () => {
  const cr = buildCloseReading("Just text", { max: 0 });
  assert.equal(cr.body, "Just text");
  assert.equal(cr.title, "");
  assert.equal(cr.questions.length, 1);
});

test("buildAnalysisPrompt lleva token, pasaje, respuestas y las 4 areas", () => {
  const prompt = buildAnalysisPrompt({
    passage: { title: "Layers", body: "The narrator is unreliable." },
    qa: [
      { q: "What tone?", answer: "Melancholic." },
      { q: "Subtext?", answer: "" },
    ],
  });
  assert.ok(prompt.startsWith(FEEDBACK_TOKEN));
  assert.ok(prompt.includes("The narrator is unreliable."));
  assert.ok(prompt.includes("Melancholic."));
  assert.ok(prompt.includes("(sin respuesta)")); // respuesta vacia se marca
  for (const k of ["COMPRENSION", "EVIDENCIA", "PROFUNDIDAD", "EXPRESION"]) {
    assert.ok(prompt.includes(k), "falta " + k);
  }
});

test("el feedback del close-reading es parseable por core/feedback", () => {
  const raw = "PUNTAJE: 82\nCOMPRENSION: 85\nEVIDENCIA: 70\nPROFUNDIDAD: 80\nEXPRESION: 88\n" +
    "LO QUE HICISTE BIEN:\n- Buen anclaje en el texto.\nA MEJORAR:\n- Profundiza el subtexto.\n" +
    "CONSEJO FINAL:\nVas muy bien.";
  const { score, areas } = parseFeedback(raw);
  assert.equal(score, 82);
  const map = Object.fromEntries(areas.map((a) => [a.key, a.value]));
  assert.equal(map.COMPRENSION, 85);
  assert.equal(map.EVIDENCIA, 70);
  assert.equal(map.PROFUNDIDAD, 80);
  assert.equal(map.EXPRESION, 88);
});

console.log(`\n${passed} pruebas en verde.`);
