/**
 * tests/verb-tips.test.mjs — Pruebas del generador de "pops" de ayuda.
 * Correr con:  node tests/verb-tips.test.mjs
 */
import assert from "node:assert/strict";
import { generateTips } from "../src/core/verb-tips.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

const irregular = { front: "go", past: "went", participle: "gone", back: "went / gone" };
const regular = { front: "work", back: "worked" };
const withNote = { front: "read", past: "read", participle: "read", back: "read / read" };

test("irregular incluye regla, presente, pasado y present perfect", () => {
  const titles = generateTips(irregular).map((t) => t.title);
  assert.ok(titles.includes("La regla"));
  assert.ok(titles.includes("Presente simple"));
  assert.ok(titles.includes("Pasado simple"));
  assert.ok(titles.includes("Present perfect"));
});

test("la regla marca irregular", () => {
  const rule = generateTips(irregular).find((t) => t.tone === "rule");
  assert.ok(/IRREGULAR/.test(rule.body));
});

test("regular no tiene present perfect y marca -ed", () => {
  const tips = generateTips(regular);
  assert.ok(!tips.some((t) => t.title === "Present perfect"));
  const rule = tips.find((t) => t.tone === "rule");
  assert.ok(/REGULAR/.test(rule.body));
});

test("verbo con nota especial incluye un tip", () => {
  const tips = generateTips(withNote);
  assert.ok(tips.some((t) => t.tone === "note"));
});

test("cada tip trae icono y degradado (para los pops iOS)", () => {
  for (const t of generateTips(irregular)) {
    assert.ok(t.icon && t.icon.length > 0, "falta icon");
    assert.ok(t.grad && t.grad.includes("from-"), "falta grad");
  }
});

console.log(`\n${passed} pruebas en verde.`);
