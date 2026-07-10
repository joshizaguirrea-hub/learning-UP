/**
 * core/verb-practice.js — Genera practicas breves para un item de verbo.
 *
 * Logica PURA (sin DOM/IO) => testeable. A partir de las formas del verbo y sus
 * ejemplos, arma hasta 3 ejercicios auto-corregibles por dificultad:
 *   - Facil     (choice): elegir el pasado correcto.
 *   - Intermedio (cloze): completar una frase en pasado.
 *   - Dificil   (cloze): completar una frase en participio (present perfect).
 *
 * Reutiliza los ejemplos del item (no duplica contenido). Si algo no se puede
 * generar (faltan datos), simplemente se omite.
 */
import { normalize } from "./activities.js";

function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Reemplaza la primera aparicion de `word` por un hueco. null si no aparece. */
function blank(sentence, word) {
  const re = new RegExp("\\b" + escapeRegex(word) + "\\b", "i");
  if (!re.test(sentence)) return null;
  return sentence.replace(re, "_____");
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

/**
 * @param {object} item - { front, past?, participle?, back, examples:[{en,es}] }
 * @returns {Array} ejercicios [{level, kind, prompt, ...}]
 */
export function buildPractice(item) {
  const out = [];
  const examples = item.examples || [];
  const past = item.past || (item.participle ? null : item.back); // regular: back = pasado
  const participle = item.participle || null;
  const irregular = !!item.participle; // los mazos irregulares definen participle

  // --- Facil: elegir el pasado ---------------------------------------------
  if (past && !String(past).includes("/")) {
    const distractors = [item.front, participle, item.front + "ed", item.front + "d"]
      .filter((d) => d && normalize(d) !== normalize(past));
    const choices = shuffle([past, ...shuffle(distractors).slice(0, 2)]);
    out.push({
      level: "Facil",
      kind: "choice",
      prompt: `Elige el PASADO de "${item.front}"`,
      choices,
      answer: choices.findIndex((c) => normalize(c) === normalize(past)),
      explain: `El pasado de "${item.front}" es "${past}".`,
      why: irregular
        ? `"${item.front}" es un verbo IRREGULAR: su pasado no se forma con -ed, hay que memorizarlo ("${past}").`
        : `"${item.front}" es REGULAR: el pasado se forma agregando -ed ("${past}").`,
    });
  }

  // --- Intermedio: completar frase en pasado -------------------------------
  if (past) {
    const ex = examples.find((e) => blank(e.en, past));
    if (ex) {
      out.push({
        level: "Intermedio",
        kind: "cloze",
        prompt: blank(ex.en, past),
        answer: past,
        es: ex.es,
        explain: `Respuesta: "${past}".`,
        why: `Usamos el PASADO SIMPLE porque la accion ya termino. ` +
          (irregular ? `Forma irregular: "${past}".` : `Regular con -ed: "${past}".`),
      });
    }
  }

  // --- Dificil: completar frase en participio (present perfect) -------------
  if (participle) {
    const ex = examples.find((e) => blank(e.en, participle));
    if (ex) {
      out.push({
        level: "Dificil",
        kind: "cloze",
        prompt: blank(ex.en, participle),
        answer: participle,
        es: ex.es,
        explain: `Respuesta: "${participle}".`,
        why: `Con el PRESENT PERFECT (have/has + PARTICIPIO) se usa el participio, no el pasado. ` +
          `Participio de "${item.front}": "${participle}".`,
      });
    }
  }

  return out.slice(0, 3);
}
