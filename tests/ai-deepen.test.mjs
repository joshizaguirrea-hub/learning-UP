/**
 * tests/ai-deepen.test.mjs — Pruebas del parser de "profundizar" (IA).
 * Correr con:  node tests/ai-deepen.test.mjs
 */
import assert from "node:assert/strict";
import {
  stripMd, parseDeepenAnswer, parseExampleItems, highlightFirstMatch, expandVerbForms,
} from "../src/core/ai-deepen.js";

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

test("parseDeepenAnswer tolera que la IA copie el parentesis del header (bug real)", () => {
  // La IA a veces repite literal "NOTA GRAMATICAL (sin asteriscos ni markdown
  // aqui):" en vez de solo "NOTA GRAMATICAL:" -- un indexOf exacto fallaba
  // aqui y mandaba TODO (incluida la nota) a "examples", dejando "grammar"
  // vacio (la pantalla mostraba "Sin nota esta vez." con la IA ya contestando bien).
  const text = "EJEMPLOS:\n1. foo\n\n" +
    "NOTA GRAMATICAL (sin asteriscos ni markdown aqui):\nes un verbo transitivo";
  const out = parseDeepenAnswer(text);
  assert.equal(out.examples, "1. foo");
  assert.equal(out.grammar, "es un verbo transitivo");
});

test("texto vacio o nulo no revienta", () => {
  assert.deepEqual(parseDeepenAnswer(""), { examples: "", grammar: "", conjugation: "" });
  assert.deepEqual(parseDeepenAnswer(undefined), { examples: "", grammar: "", conjugation: "" });
});

test("parseExampleItems separa cada ejemplo numerado en {phrase, translation}", () => {
  const text = "1. I applied for a new job.\n   = Quiero postularme para un nuevo trabajo.\n" +
    "2. She applied to three universities.\n   = Ella se postulo a tres universidades.";
  const out = parseExampleItems(text);
  assert.equal(out.length, 2);
  assert.equal(out[0].phrase, "I applied for a new job.");
  assert.equal(out[0].translation, "Quiero postularme para un nuevo trabajo.");
  assert.equal(out[1].phrase, "She applied to three universities.");
  assert.equal(out[1].translation, "Ella se postulo a tres universidades.");
});

test("parseExampleItems lee ESTRUCTURA y REGLA cuando vienen", () => {
  const text = "1. I applied for a new job.\n   = Quiero postularme para un nuevo trabajo.\n" +
    "   ESTRUCTURA: Sujeto = I | Verbo = applied (pasado simple) | Objeto = for a new job\n" +
    "   REGLA: El pasado simple de verbos regulares termina en -ed.";
  const out = parseExampleItems(text);
  assert.equal(out.length, 1);
  assert.equal(out[0].structure, "Sujeto = I | Verbo = applied (pasado simple) | Objeto = for a new job");
  assert.equal(out[0].rule, "El pasado simple de verbos regulares termina en -ed.");
});

test("parseExampleItems trata REGLA: - como 'sin regla' (no se muestra nada inventado)", () => {
  const text = "1. I applied for a new job.\n   = Quiero postularme.\n" +
    "   ESTRUCTURA: Sujeto = I | Verbo = applied | Objeto = -\n   REGLA: -";
  const out = parseExampleItems(text);
  assert.equal(out[0].rule, "");
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

test("highlightFirstMatch envuelve la PRIMERA forma que aparece, con limite de palabra", () => {
  assert.equal(
    highlightFirstMatch("She applied to three universities.", ["applied", "apply"]),
    "She *applied* to three universities."
  );
});

test("highlightFirstMatch no encuentra nada -> devuelve la frase igual (nunca mal puesto)", () => {
  assert.equal(highlightFirstMatch("He went home.", ["apply", "applied"]), "He went home.");
});

test("expandVerbForms: consonante + 'y' -> 'ies' en 3a persona (apply -> applies)", () => {
  const forms = expandVerbForms("apply");
  assert.ok(forms.includes("applies"));
  assert.ok(forms.includes("applying"));
});

test("expandVerbForms + highlightFirstMatch resuelven el caso real 'apply' -> 'applies'", () => {
  const forms = expandVerbForms("apply");
  assert.equal(
    highlightFirstMatch("She always applies for new jobs.", forms),
    "She always *applies* for new jobs."
  );
});

test("expandVerbForms: verbo terminado en 'e' muda -> 'liking', no 'likeing'", () => {
  const forms = expandVerbForms("like");
  assert.ok(forms.includes("liking"));
  assert.ok(forms.includes("likes"));
});

console.log(`\n${passed} pruebas en verde.`);
