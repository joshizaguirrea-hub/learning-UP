/**
 * tests/fluency-42.test.mjs — Pruebas del motor PURO de la tecnica 4/3/2.
 * Correr con:  node tests/fluency-42.test.mjs
 */
import assert from "node:assert/strict";
import {
  ROUND_PLAN, countWords, countFillers, wpm, analyzeRound, summarize, fluencyScore,
} from "../src/core/fluency-42.js";

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`  ok - ${name}`); }

test("ROUND_PLAN es 4/3/2 minutos en segundos", () => {
  assert.deepEqual(ROUND_PLAN.map((r) => r.seconds), [240, 180, 120]);
});

test("countWords cuenta tokens alfabeticos (con apostrofe)", () => {
  assert.equal(countWords("I can't believe it works!"), 5);
  assert.equal(countWords("   "), 0);
});

test("countFillers detecta muletillas simples y de 2 palabras", () => {
  assert.equal(countFillers("um so, like, you know, I mean it"), 4); // um, like, you know, i mean
  assert.equal(countFillers("A clean sentence."), 0);
  // No confunde 'like' dentro de otra palabra.
  assert.equal(countFillers("I liked the likeness"), 0);
});

test("wpm calcula palabras por minuto", () => {
  assert.equal(wpm(120, 60), 120);
  assert.equal(wpm(60, 120), 30);
  assert.equal(wpm(50, 0), 0);
});

test("analyzeRound arma words/wpm/fillers/fillerRate", () => {
  const r = analyzeRound({ transcript: "um I really like coffee you know", seconds: 30 });
  assert.equal(r.words, 7);
  assert.equal(r.wpm, 14); // 7 / (30/60) = 14
  assert.equal(r.fillers, 3); // um, like, you know
  assert.equal(r.fillerRate, Math.round((3 / 7) * 100));
});

test("summarize detecta ganancia de fluidez (WPM sube)", () => {
  const rounds = [
    { words: 60, seconds: 60, wpm: 60, fillers: 6, fillerRate: 10 },
    { words: 60, seconds: 45, wpm: 80, fillers: 3, fillerRate: 5 },
    { words: 60, seconds: 36, wpm: 100, fillers: 1, fillerRate: 2 },
  ];
  const s = summarize(rounds);
  assert.deepEqual(s.wpmByRound, [60, 80, 100]);
  assert.equal(s.deltaWpm, 40);
  assert.equal(s.fillerDrop, 8);
  assert.equal(s.fluencyGain, true);
  assert.equal(s.bestWpm, 100);
});

test("summarize sin rondas no rompe", () => {
  const s = summarize([]);
  assert.equal(s.fluencyGain, false);
  assert.equal(s.bestWpm, 0);
});

test("fluencyScore premia ritmo alto + mejora, penaliza muletillas", () => {
  const good = [
    { wpm: 90, fillerRate: 8 },
    { wpm: 120, fillerRate: 2 },
  ];
  const bad = [
    { wpm: 40, fillerRate: 20 },
    { wpm: 40, fillerRate: 20 },
  ];
  const gScore = fluencyScore(good);
  const bScore = fluencyScore(bad);
  assert.ok(gScore > bScore, "buena sesion debe puntuar mas");
  assert.ok(gScore >= 0 && gScore <= 100);
  assert.ok(bScore >= 0 && bScore <= 100);
  assert.equal(fluencyScore([]), 0);
});

console.log(`\n${passed} pruebas en verde.`);
