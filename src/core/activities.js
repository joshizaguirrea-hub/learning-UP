/**
 * core/activities.js — Motor de calificacion de actividades variadas.
 *
 * Logica PURA (sin I/O, sin DOM) => testeable. Cada actividad tiene un `type`
 * y un `payload`; aqui vive SOLO como se califica (no como se pinta).
 *
 * Tipos soportados (todos auto-corregibles, sin IA):
 *   - multiple_choice: elegir la opcion correcta
 *   - cloze:           escribir la palabra que falta
 *   - word_bank:       ordenar palabras para formar la frase
 *   - matching:        emparejar izquierda-derecha
 */

/** Normaliza texto para comparar respuestas escritas (case/espacios/acentos). */
export function normalize(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/\s+/g, " ");
}

/**
 * Califica una actividad.
 * @param {object} activity - { type, payload }
 * @param {*} response - respuesta del usuario (formato segun tipo)
 * @returns {boolean} correcta o no
 */
export function grade(activity, response) {
  switch (activity.type) {
    case "multiple_choice":
      return response === activity.payload.answer;

    case "cloze": {
      const accepted = [activity.payload.answer, ...(activity.payload.alt || [])];
      return accepted.some((a) => normalize(a) === normalize(response ?? ""));
    }

    case "word_bank": {
      // response: array de palabras en el orden elegido por el usuario.
      const expected = activity.payload.answer; // array correcto
      if (!Array.isArray(response) || response.length !== expected.length) return false;
      return response.every((w, i) => normalize(w) === normalize(expected[i]));
    }

    case "matching": {
      // response: objeto { leftId: rightId }. payload.pairs: [{left, right}]
      const pairs = activity.payload.pairs;
      return pairs.every((p, i) => response?.[i] === p.right);
    }

    default:
      return false;
  }
}

/**
 * Califica una lista de actividades.
 * @param {Array} activities
 * @param {Array} responses - respuesta por actividad (mismo orden)
 * @returns {{correct, total, ratio, passed}}
 */
export function gradeAll(activities, responses, passRatio = 0.6) {
  const total = activities.length;
  if (total === 0) return { correct: 0, total: 0, ratio: 0, passed: false };
  let correct = 0;
  activities.forEach((a, i) => {
    if (grade(a, responses[i])) correct++;
  });
  const ratio = correct / total;
  return { correct, total, ratio, passed: ratio >= passRatio };
}
