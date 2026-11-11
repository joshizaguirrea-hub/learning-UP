/**
 * tests/ai-deepen.test.mjs — Pruebas del parser de "profundizar" (IA).
 * Correr con:  node tests/ai-deepen.test.mjs
 */
import assert from "node:assert/strict";
import { stripMd, parseDeepenAnswer, stripMdKeepHighlight, parseExampleItems } from "../src/core/ai-deepen.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("stripMd quita negritas, asteriscos sueltos y encabezados", () => {
  assert.equal(stripMd("**hola** *mundo* `code` # Titulo"), "hola mundo code Titulo");
});

test("parseDeepenAnswer separa las 3 secciones cuando estan completas", () => {
  const text = "EJEMPLOS:\n1. foo\n\nNOTA GRAMATICAL:\nes un sustantivo contable\n\n" +
    "CONJUGACION (esta palabra ES un verbo):\n- Presente: go";
  const out = parseDeepenAnswer(text);
  assert.equal(out.examples, "1. foo");
  assert.equal(out.grammar, "es un sustantivo contable");
  assert.ok(out.conjugation.startsWith("- Presente: go"));
});

test("sin NOTA GRAMATICAL, todo cae en examples (nunca se pierde contenido)", () => {
  const out = parseDeepenAnswer("EJEMPLOS:\n1. foo\n2. bar");
  assert.equal(out.examples, "1. foo\n2. bar");
  assert.equal(out.grammar, "");
  assert.equal(out.conjugation, "");
});

test("con NOTA GRAMATICAL pero sin CONJUGACION", () => {
  const out = parseDeepenAnswer("EJEMPLOS:\n1. foo\n\nNOTA GRAMATICAL:\nnota util");
  assert.equal(out.examples, "1. foo");
  assert.equal(out.grammar, "nota util");
  assert.equal(out.conjugation, "");
});

test("texto vacio o nulo no revienta", () => {
  assert.deepEqual(parseDeepenAnswer(""), { examples: "", grammar: "", conjugation: "" });
  assert.deepEqual(parseDeepenAnswer(undefined), { examples: "", grammar: "", conjugation: "" });
});

test("stripMdKeepHighlight quita negritas/backticks/encabezados pero DEJA el *resaltado* simple", () => {
  // El "#" de encabezado solo se quita al INICIO de linea (igual que stripMd);
  // por eso la prueba usa un salto de linea real para ese caso.
  assert.equal(
    stripMdKeepHighlight("# Titulo\n**Nota:** usa *applied* con `preposicion`."),
    "Titulo\nNota: usa *applied* con preposicion."
  );
});

test("parseExampleItems separa cada ejemplo numerado en {phrase, translation}", () => {
  const text = "1. I *applied* for a new job.\n   = Quiero postularme para un nuevo trabajo.\n" +
    "2. She *applied* to three universities.\n   = Ella se postulo a tres universidades.";
  const out = parseExampleItems(text);
  assert.equal(out.length, 2);
  assert.equal(out[0].phrase, "I *applied* for a new job.");
  assert.equal(out[0].translation, "Quiero postularme para un nuevo trabajo.");
  assert.equal(out[1].phrase, "She *applied* to three universities.");
  assert.equal(out[1].translation, "Ella se postulo a tres universidades.");
});

test("parseExampleItems tolera una linea mal formada (sin '=') sin perder contenido", () => {
  const out = parseExampleItems("1. Una frase sin traduccion aparte");
  assert.equal(out.length, 1);
  assert.equal(out[0].phrase, "Una frase sin traduccion aparte");
  assert.equal(out[0].translation, "");
});

test("parseExampleItems con texto vacio devuelve lista vacia", () => {
  assert.deepEqual(parseExampleItems(""), []);
  assert.deepEqual(parseExampleItems(undefined), []);
});

console.log(`\n${passed} pruebas en verde.`);
