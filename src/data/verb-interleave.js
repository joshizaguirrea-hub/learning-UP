/**
 * data/verb-interleave.js — Distribuye los verbos del tema en gramatica y
 * vocabulario de la unidad, en vez de aislarlos en un mazo aparte y obligatorio.
 *
 * POR QUE (decision v3, ver core/unit-requirements.js)
 * ------------------------------------------------------
 * Antes: topicVerbDeckFor(unit.id) (data/topic-verb-decks.js) solo vivia en un
 * mazo "Bonus" aparte que ademas BLOQUEABA el avance de la unidad. Feedback
 * directo del alumno: eso cansa -- es una tarea extra, separada de lo que ya
 * esta estudiando, justo lo opuesto al "interleaving" que ya promete
 * docs/PEDAGOGIA.md (seccion 1, punto 6).
 *
 * Ahora los verbos del tema se MEZCLAN donde el alumno YA esta, en el momento
 * en que tiene mas sentido verlos:
 *
 *   1. GRAMATICA: la leccion de gramatica anuncia (en su intro) que verbos vera
 *      ahi mismo, suma sus frases de ejemplo REALES a `grammar.examples` (mismo
 *      contenido que ya existia en el mazo, solo reubicado -- no se inventa
 *      nada) y agrega 1-2 ejercicios FACILES (generados por core/verb-practice.js)
 *      como calentamiento. NUNCA los 3 ejercicios completos del mazo: eso
 *      volveria a cansar. Micro-dosis, no un examen de verbos disfrazado.
 *
 *   2. VOCABULARIO: el pasado/participio de cada verbo entra a `unit.vocab`
 *      como una palabra mas -> se repasa en el SRS normal (services/srs.js),
 *      igual que cualquier otra palabra del tema. Por venir de ahi, aparece
 *      SOLO (cero codigo extra) en:
 *        - el Cuaderno de la unidad (features/notebook.js, pestana
 *          Vocabulario -> "Vocabulario del capitulo", lee unitVocabulary()).
 *        - el Boletin de la unidad (features/unit-report.js, tarjeta
 *          "Palabras para repasar" cuando Vocabulario esta flojo).
 *
 * El mazo "Verbos de este tema" (features/verb-challenge.js + verb-timeline.js)
 * SIGUE EXISTIENDO, pero 100% opcional (Bonus) -- ya no bloquea la unidad (ver
 * core/unit-requirements.js). Sirve de repaso/reto final para quien quiera el
 * mini-juego, no de primera exposicion: para cuando el alumno llega ahi, ya
 * vio esos verbos en su gramatica y los esta repasando en su SRS.
 *
 * Logica PURA (sin DOM/IO). Mismo patron y mismo punto de enganche que
 * cloze-gen.js / listening-gen.js / test-gen.js (ver data/units/index.js).
 */
import { topicVerbDeckFor } from "./topic-verb-decks.js";
import { buildPractice } from "../core/verb-practice.js";

const MAX_WARMUP = 2; // micro-dosis: nunca mas de 2 ejercicios extra en gramatica
const MAX_EXTRA_EXAMPLES = 2; // idem para las frases que se suman a la gramatica

/** La leccion de GRAMATICA principal de la unidad (si existe). */
function grammarLesson(unit) {
  return (unit.lessons || []).find(
    (l) => Array.isArray(l.skills) && l.skills[0] === "grammar" && l.grammar
  );
}

/** Cuantos verbos se nombran en el anuncio de la leccion (el resto se ve en
 * los ejemplos/vocabulario igual, pero sin convertir el intro en una lista
 * interminable -- esto sigue siendo micro-learning, no un indice). */
const MAX_ANNOUNCED_VERBS = 4;

/** Frase corta que ANUNCIA, dentro de la propia leccion, que verbos se veran
 * ahi mismo -- en vez de descubrirlos despues en un bloque aparte. */
function announce(items) {
  const shown = items.slice(0, MAX_ANNOUNCED_VERBS).map((it) => `"${it.front}"`).join(", ");
  const rest = items.length - MAX_ANNOUNCED_VERBS;
  const tail = rest > 0 ? ` y ${rest} mas` : "";
  return ` De paso, aprenderas a usar esta regla con verbos de este tema: ${shown}${tail}.`;
}

/** Suma frases de ejemplo REALES del mazo (mismo contenido, solo reubicado)
 * a los ejemplos de la gramatica. Muta `grammar`. */
function enrichExamples(grammar, items) {
  const extra = items
    .map((it) => (it.examples || [])[0])
    .filter(Boolean)
    .slice(0, MAX_EXTRA_EXAMPLES)
    .map((ex) => `${ex.en} (${ex.es})`);
  grammar.examples = [...(grammar.examples || []), ...extra];
}

/** 1-2 ejercicios FACILES (nunca el reto completo de 3) como calentamiento de
 * gramatica, generados con el MISMO motor que usa el mazo (core/verb-practice.js). */
function warmupActivities(items) {
  const acts = [];
  for (const it of items) {
    if (acts.length >= MAX_WARMUP) break;
    const [facil] = buildPractice(it);
    if (!facil || facil.kind !== "choice") continue;
    acts.push({
      id: `${it.id}-warmup`,
      type: "multiple_choice",
      prompt: facil.prompt,
      payload: { choices: facil.choices, answer: facil.answer },
      explain: facil.explain,
    });
  }
  return acts;
}

/** Pasado/participio de cada verbo del tema -> items de vocabulario normales
 * (entran al SRS como cualquier palabra). No duplica formas ya presentes en
 * el vocabulario de la unidad. Ids derivados del id (globalmente unico, ver
 * tools/check_topic_verbs.py) del propio item del mazo. */
function verbVocab(unit, items) {
  const seen = new Set((unit.vocab || []).map((v) => String(v.term || "").toLowerCase()));
  const extra = [];
  for (const it of items) {
    const forms = [
      { suffix: "past", term: it.past, label: "pasado" },
      it.participle ? { suffix: "ptc", term: it.participle, label: "participio" } : null,
    ].filter(Boolean);
    for (const f of forms) {
      const key = String(f.term || "").toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      const ex = (it.examples || [])[0];
      extra.push({
        id: `${it.id}-${f.suffix}`,
        term: f.term,
        translation: `${f.label} de "${it.front}"`,
        example: ex ? ex.en : "",
      });
    }
  }
  return extra;
}

/**
 * Distribuye los verbos del tema de la unidad en su gramatica y vocabulario.
 * Si la unidad no tiene mazo de verbos por tema, la deja intacta.
 * @param {object} unit
 * @returns {object} la misma unidad (mutada) -- mismo patron que withClozeChoices.
 */
export function withVerbInterleave(unit) {
  const deck = unit && topicVerbDeckFor(unit.id);
  const items = deck && deck.items;
  if (!items || !items.length) return unit;

  const gram = grammarLesson(unit);
  if (gram) {
    gram.intro = (gram.intro || "") + announce(items);
    enrichExamples(gram.grammar, items);
    gram.activities = [...(gram.activities || []), ...warmupActivities(items)];
  }

  const extraVocab = verbVocab(unit, items);
  if (extraVocab.length) unit.vocab = [...(unit.vocab || []), ...extraVocab];

  return unit;
}
