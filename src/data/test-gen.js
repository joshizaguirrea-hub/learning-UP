/**
 * data/test-gen.js — Generador del EXAMEN COMPLETO de cada unidad (datos puros).
 *
 * DRY al maximo: el examen NO es un motor nuevo. Es una LECCION mas (kind:"test")
 * que reune actividades ya existentes de la unidad + preguntas auto-generadas de
 * los mazos de bonos (verbos, idioms, tiempo) + una seccion de WRITING y otra de
 * SPEAKING. Al ser una leccion normal, fluye por el lesson-player y la ruta
 * /leccion/:id que YA existen: misma calificacion, mismo progreso, mismo
 * desbloqueo. Aprobar (>=60%) marca `${unit.id}-test` como completado y ofrece
 * una charla final opcional con Bymax.
 *
 * Cobertura del examen (una unidad de verdad):
 *   - Conocimiento (~15): grammar, vocabulary, reading, listening de la unidad +
 *     repaso acumulado (verbos regulares/irregulares, idioms, expresiones de
 *     tiempo) auto-generado de los bonos, para A2 en adelante.
 *   - Writing: texto libre con minimo de palabras y palabras clave del tema.
 *   - Speaking: practica de pronunciacion (escucha y repite).
 */
import { BONUS_DECKS } from "./bonus-decks.js";
import { isAtLeast } from "./cefr.js";

const GRADABLE = new Set(["multiple_choice", "cloze", "word_bank", "matching", "listening"]);
const TARGET = 15; // preguntas de conocimiento (grammar/vocab/reading/listening + bonos)

// -- utilidades puras --------------------------------------------------------
function shuffle(arr) {
  return arr.map((x) => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map((p) => p[1]);
}
function pick(arr, n) {
  return shuffle(arr).slice(0, n);
}
function deck(id) {
  return BONUS_DECKS.find((d) => d.id === id);
}

/** Preguntas de comprension de lectura de la unidad -> opcion multiple. */
function readingChecks(unit) {
  const out = [];
  for (const l of unit.lessons || []) {
    for (const q of (l.content?.check || [])) {
      out.push({ type: "multiple_choice", prompt: q.prompt, payload: { choices: q.choices, answer: q.answer } });
    }
  }
  return out;
}

/**
 * Pool de conocimiento de la UNIDAD, balanceado por competencia (round-robin):
 * toma 1 de cada grupo por vuelta -> mezcla reading/vocab/grammar/listening.
 */
function corePool(unit, max) {
  const groups = [];
  const rc = readingChecks(unit);
  if (rc.length) groups.push(rc);
  for (const l of unit.lessons || []) {
    if (l.kind === "test") continue;
    const acts = (l.activities || []).filter((a) => GRADABLE.has(a.type));
    if (acts.length) groups.push(acts);
  }
  const out = [];
  let added = true;
  for (let i = 0; added && out.length < max; i++) {
    added = false;
    for (const g of groups) {
      if (g[i]) { out.push(g[i]); added = true; if (out.length >= max) break; }
    }
  }
  return out;
}

// -- preguntas auto-generadas de los bonos (repaso acumulado) -----------------
/** MC del pasado simple de un verbo irregular, con distractores de otros verbos. */
function irregularQ() {
  const items = deck("irregular-verbs").items;
  const it = pick(items, 1)[0];
  const wrong = pick(items.filter((x) => x.past !== it.past), 2).map((x) => x.past);
  const choices = shuffle([it.past, ...wrong]);
  return {
    type: "multiple_choice",
    prompt: `Pasado simple de "${it.front}":`,
    payload: { choices, answer: choices.indexOf(it.past) },
    explain: `"${it.front}" -> ${it.past} (participio: ${it.participle}).`,
  };
}
/** MC del pasado -ed de un verbo regular. */
function regularQ() {
  const items = deck("regular-past").items;
  const it = pick(items, 1)[0];
  const wrong = pick(items.filter((x) => x.back !== it.back), 2).map((x) => x.back);
  const choices = shuffle([it.back, ...wrong]);
  return {
    type: "multiple_choice",
    prompt: `Pasado (-ed) de "${it.front}":`,
    payload: { choices, answer: choices.indexOf(it.back) },
    explain: `"${it.front}" -> ${it.back}.`,
  };
}
/** MC del significado de un idiom o expresion de tiempo. */
function meaningQ(deckId, label) {
  const items = deck(deckId).items;
  const it = pick(items, 1)[0];
  const wrong = pick(items.filter((x) => x.back !== it.back), 2).map((x) => x.back);
  const choices = shuffle([it.back, ...wrong]);
  return {
    type: "multiple_choice",
    prompt: `${label}: "${it.front}"`,
    payload: { choices, answer: choices.indexOf(it.back), speakLang: "es-MX" },
    explain: `"${it.front}" = ${it.back}.`,
  };
}

// -- secciones de produccion (writing + speaking) ----------------------------
function writingActivity(unit) {
  const keywords = pick((unit.vocab || []).map((v) => v.term).filter(Boolean), 4);
  const minWords = isAtLeast(unit.level, "B1") ? 40 : 20;
  return {
    type: "writing",
    prompt: `Escribe un texto corto en INGLES sobre "${unit.title}".`,
    payload: {
      topic: unit.title,
      minWords,
      keywords,
      hint: `Escribe al menos ${minWords} palabras e incluye al menos 2 de estas palabras: ${keywords.join(", ")}.`,
    },
  };
}
function speakingActivity(unit) {
  return {
    type: "speaking",
    prompt: "Pronunciacion: escucha cada frase y repitela en voz alta.",
    payload: { speakingUnit: { title: unit.title, level: unit.level, vocab: unit.vocab } },
  };
}

/** Construye la leccion-examen de una unidad, o null si no hay material. */
export function buildUnitTest(unit) {
  let knowledge;
  if (isAtLeast(unit.level, "A2")) {
    // Repaso acumulado GARANTIZADO (verbos, tiempo, idioms) + contenido de la unidad.
    const bonus = [
      irregularQ(),
      regularQ(),
      meaningQ("past-time", "Que significa"),
      meaningQ("idioms", "Que significa el modismo"),
    ];
    const core = corePool(unit, TARGET - bonus.length);
    knowledge = shuffle([...bonus, ...core]);
  } else {
    // A1: los bonos (B1-B2) serian muy dificiles -> solo contenido de la unidad.
    knowledge = corePool(unit, TARGET);
  }
  if (knowledge.length < 4) return null;

  const activities = knowledge.map((a, i) => ({
    ...a,
    id: unit.id + "-test-q" + (i + 1), // id propio para no chocar con el original
  }));
  // Produccion SIEMPRE al final: escribir y hablar.
  activities.push({ ...writingActivity(unit), id: unit.id + "-test-write" });
  activities.push({ ...speakingActivity(unit), id: unit.id + "-test-speak" });

  return {
    id: unit.id + "-test",
    kind: "test",
    order: 99, // siempre el ULTIMO paso de la unidad
    phase: "produce",
    skills: [], // no infla la matriz de competencias (no es una competencia)
    title: "Examen de unidad",
    intro:
      "EXAMEN COMPLETO de la unidad. Reune TODO lo que practicaste: gramatica, " +
      "vocabulario, lectura, listening, repaso de verbos, idioms y expresiones de " +
      "tiempo, y termina con escritura y pronunciacion. Necesitas 60% para aprobar " +
      "y desbloquear la siguiente unidad. Al final podras charlar con Bymax. \u00a1T\u00fa puedes!",
    activities,
  };
}

/**
 * Devuelve la unidad asegurando que tenga su examen final. Muta la unidad.
 * Debe correr DESPUES de withListening para incluir tambien el listening.
 */
export function withTest(unit) {
  const already = (unit.lessons || []).some((l) => l.kind === "test");
  if (!already) {
    const test = buildUnitTest(unit);
    if (test) unit.lessons.push(test);
  }
  return unit;
}
