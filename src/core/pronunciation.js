/**
 * core/pronunciation.js — Logica PURA del Laboratorio de Pronunciacion.
 *
 * Sin DOM ni red => testeable. Convierte un "paquete de sonidos" de un idioma
 * (data/*-pronunciation.js) en una lista ordenada de pasos:
 *
 *   - guide:       tarjeta de un sonido (tip en espanol + palabras para OIR)
 *   - discriminate: entrenamiento de OIDO: oyes una palabra de un par minimo y
 *                   eliges cual fue (percepcion antes que produccion, Flege).
 *
 * Por cada sonido se emite primero su GUIA y luego sus pares de discriminacion,
 * asi el alumno primero entiende el sonido y despues lo distingue de oido.
 */

/** Proporcion 0..1 -> porcentaje 0..100. */
export function scorePct(correct, total) {
  return total ? Math.round((correct / total) * 100) : 0;
}

/**
 * Arma el drill completo a partir de un paquete de sonidos.
 * @param {object} pack - { language, title, sounds: [{id,label,tip,examples,pairs}] }
 * @param {object} [opts] - { max } tope de pasos (def. 40)
 * @returns {Array} pasos ordenados (guide + discriminate)
 */
export function buildPronunciationDrill(pack, opts = {}) {
  const max = opts.max || 40;
  const sounds = (pack?.sounds || []).filter((s) => s && s.id && s.label);
  const steps = [];

  for (const s of sounds) {
    const examples = (s.examples || []).filter((e) => e && e.word);
    steps.push({
      kind: "guide",
      soundId: s.id,
      label: s.label,
      tip: s.tip || "",
      examples,
    });

    for (const p of s.pairs || []) {
      if (!p?.a?.word || !p?.b?.word) continue;
      // Ejercicio canonico y DETERMINISTA: se "dice" la opcion A; ambas son
      // opciones y solo A es la correcta. La UI puede re-aleatorizar cual suena.
      steps.push({
        kind: "discriminate",
        soundId: s.id,
        label: s.label,
        tip: p.tip || s.tip || "",
        say: p.a.word,
        options: [
          { word: p.a.word, es: p.a.es || "", correct: true },
          { word: p.b.word, es: p.b.es || "", correct: false },
        ],
      });
    }
  }

  return steps.slice(0, max);
}

/** Cuenta cuantos pasos son de discriminacion (los que puntuan). */
export function scorableSteps(drill) {
  return (drill || []).filter((s) => s.kind === "discriminate").length;
}
