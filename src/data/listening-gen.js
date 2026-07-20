/**
 * data/listening-gen.js — Generador de lecciones de LISTENING (datos puros).
 *
 * DRY + escala A1..C2: en vez de escribir a mano una leccion de comprension
 * auditiva por unidad, la GENERAMOS a partir del VOCABULARIO que cada unidad ya
 * tiene (term + example). El alumno escucha la frase (voz real Chirp3-HD) con el
 * texto OCULTO y elige la palabra clave que oyo -> entrena el oido y el vocab.
 *
 * No toca DOM ni red. Se aplica en data/units/index.js sobre cada unidad que
 * todavia NO tenga una leccion de listening (respeta las hechas a mano).
 */

/** Escapa una cadena para usarla dentro de un RegExp. */
function escapeRe(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Palabra principal de un termino ("to book" -> "book", "boarding pass" -> "boarding"). */
function mainWord(term) {
  return String(term).replace(/^to\s+/i, "").trim().split(/\s+/)[0] || String(term);
}

/** True si el ejemplo CONTIENE (audible) la palabra clave del termino. */
function exampleHasTerm(v) {
  if (!v.example || !v.term) return false;
  const w = mainWord(v.term);
  return new RegExp("\\b" + escapeRe(w), "i").test(v.example);
}

/** Inserta `value` en la posicion `pos` de una copia de `arr`. */
function insertAt(arr, value, pos) {
  const copy = [...arr];
  copy.splice(Math.min(pos, copy.length), 0, value);
  return copy;
}

/**
 * Construye la leccion de listening de una unidad a partir de su vocab.
 * @returns {object|null} la leccion, o null si no hay material suficiente.
 */
export function buildListeningLesson(unit) {
  const usable = (unit.vocab || []).filter(exampleHasTerm);
  if (usable.length < 3) return null;

  const chosen = usable.slice(0, 6);
  const activities = [];

  chosen.forEach((v, i) => {
    // Distractores: otros terminos cuya palabra principal NO aparece en el
    // ejemplo (para que haya UNA sola respuesta correcta y audible).
    const wOfV = mainWord(v.term).toLowerCase();
    const pool = usable
      .filter((o) => mainWord(o.term).toLowerCase() !== wOfV)
      .filter((o) => !new RegExp("\\b" + escapeRe(mainWord(o.term)), "i").test(v.example))
      .map((o) => o.term);

    // Elige 2 distractores distintos (reparto deterministico por indice).
    const distractors = [];
    for (let k = 0; k < pool.length && distractors.length < 2; k++) {
      const cand = pool[(i + k) % pool.length];
      if (cand && !distractors.includes(cand)) distractors.push(cand);
    }
    if (distractors.length < 2) return; // sin buenos distractores, saltamos

    const choices = insertAt(distractors, v.term, i % 3); // rota la posicion correcta
    const answer = choices.indexOf(v.term);

    activities.push({
      id: unit.id + "-listen-a" + (i + 1),
      type: "listening",
      prompt: (i + 1) + ". Escucha y responde:",
      payload: {
        audio: v.example,
        lang: "en-US",
        question: "\u00bfQu\u00e9 palabra clave escuchaste en la frase?",
        choices,
        answer,
        transcript: v.example,
      },
    });
  });

  if (activities.length < 3) return null;

  return {
    id: unit.id + "-listen",
    order: 90, // siempre al final del recorrido de la unidad
    phase: "practice",
    skills: ["listening"],
    title: "Listening: entrena tu o\u00eddo",
    intro:
      "Competencia de LISTENING (comprension auditiva). Escucha cada frase con voz " +
      "real las veces que necesites y elige la palabra clave que oiste. El texto esta " +
      "OCULTO a proposito; puedes abrir la transcripcion despues de responder.",
    activities,
  };
}

/**
 * Devuelve la unidad asegurando que tenga una leccion de listening. Si ya tiene
 * una (hecha a mano), NO agrega nada. Muta la unidad (mantiene referencias).
 */
export function withListening(unit) {
  const already = (unit.lessons || []).some((l) => (l.skills || []).includes("listening"));
  if (!already) {
    const lesson = buildListeningLesson(unit);
    if (lesson) unit.lessons.push(lesson);
  }
  return unit;
}
