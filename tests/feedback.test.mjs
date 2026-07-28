/**
 * tests/feedback.test.mjs — Pruebas del motor PURO de feedback de habla.
 * Correr con:  node tests/feedback.test.mjs
 */
import assert from "node:assert/strict";
import {
  buildFeedbackPrompt, parseFeedback, sectionBody, AREA_DEFS, FEEDBACK_TOKEN,
} from "../src/core/feedback.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("buildFeedbackPrompt SIEMPRE lleva el token evaluador y pide las areas clave", () => {
  assert.ok(buildFeedbackPrompt("speaking").startsWith(FEEDBACK_TOKEN));
  assert.ok(buildFeedbackPrompt("interview").startsWith(FEEDBACK_TOKEN));
  // El contexto cambia segun el tipo.
  assert.ok(buildFeedbackPrompt("speaking").includes("CONVERSACION"));
  assert.ok(buildFeedbackPrompt("interview").includes("ENTREVISTA"));
  // Ambos piden las areas clave que evalua un profe.
  const p = buildFeedbackPrompt("speaking");
  for (const k of ["GRAMATICA", "VOCABULARIO", "FLUIDEZ", "COHERENCIA", "PRONUNCIACION"]) {
    assert.ok(p.includes(k), "falta " + k);
  }
});

const RICH = `PUNTAJE: 78
GRAMATICA: 70
VOCABULARIO: 82
FLUIDEZ: 75
COHERENCIA: 80
PRONUNCIACION: 66

LO QUE HICISTE BIEN:
- Usaste bien el pasado simple.
- Buen vocabulario de viajes.
A MEJORAR:
- Cuida la concordancia sujeto-verbo.
ERRORES CLAVE:
- "He go" -> "He goes" (3a persona +s)
FRASES MODELO:
- "I'd love to travel there."
CONSEJO FINAL:
Vas muy bien, sigue hablando a diario.`;

test("parseFeedback extrae PUNTAJE global", () => {
  assert.equal(parseFeedback(RICH).score, 78);
});

test("parseFeedback extrae las 5 areas con sus valores", () => {
  const { areas } = parseFeedback(RICH);
  const map = Object.fromEntries(areas.map((a) => [a.key, a.value]));
  assert.equal(map.GRAMATICA, 70);
  assert.equal(map.VOCABULARIO, 82);
  assert.equal(map.FLUIDEZ, 75);
  assert.equal(map.COHERENCIA, 80);
  assert.equal(map.PRONUNCIACION, 66);
});

test("parseFeedback separa las secciones de texto", () => {
  const { sections } = parseFeedback(RICH);
  const titles = sections.map((s) => s.title);
  assert.ok(titles.includes("Lo que hiciste bien"));
  assert.ok(titles.includes("A mejorar"));
  assert.ok(titles.includes("Errores clave"));
  assert.ok(titles.includes("Frases modelo"));
  assert.ok(titles.includes("Consejo final"));
  // El cuerpo NO debe arrastrar el siguiente encabezado.
  assert.ok(!sectionBody(sections, "A mejorar").toUpperCase().includes("ERRORES CLAVE"));
});

test("parseFeedback tolera acentos en encabezados/areas", () => {
  const withAccents = "PUNTAJE: 90\nGRAMÁTICA: 88\nPRONUNCIACIÓN: 91\nCONSEJO FINAL:\n¡Excelente!";
  const { score, areas, sections } = parseFeedback(withAccents);
  assert.equal(score, 90);
  const map = Object.fromEntries(areas.map((a) => [a.key, a.value]));
  assert.equal(map.GRAMATICA, 88);
  assert.equal(map.PRONUNCIACION, 91);
  assert.equal(sectionBody(sections, "Consejo final"), "\u00a1Excelente!");
});

test("parseFeedback clamp a 0..100 y default 60 sin formato", () => {
  assert.equal(parseFeedback("PUNTAJE: 250").score, 100);
  assert.equal(parseFeedback("bla bla sin formato").score, 60);
  // Sin secciones reconocidas -> areas vacio, score default.
  assert.equal(parseFeedback("texto libre").areas.length, 0);
});

test("compat: formato viejo de entrevista (CONTENIDO/ESTRUCTURA)", () => {
  const old = "PUNTAJE: 65\nFLUIDEZ: 60\nCONTENIDO: 70\nESTRUCTURA: 55";
  const { areas } = parseFeedback(old);
  const map = Object.fromEntries(areas.map((a) => [a.key, a.value]));
  assert.equal(map.CONTENIDO, 70);
  assert.equal(map.ESTRUCTURA, 55);
});

test("AREA_DEFS incluye las dimensiones de un profe", () => {
  const keys = AREA_DEFS.map((a) => a.key);
  ["GRAMATICA", "VOCABULARIO", "FLUIDEZ", "COHERENCIA", "PRONUNCIACION"].forEach((k) =>
    assert.ok(keys.includes(k)));
});

console.log(`\n${passed} pruebas en verde.`);
