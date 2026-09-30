/**
 * core/difficulty.js — Niveles de practica 1..10. PURO (sin DOM, sin red).
 *
 * Por que existe: el nivel MCER (A1..C2) dice DONDE esta el alumno, pero no
 * cuanto quiere sudar HOY. Son ejes distintos: un B1 puede querer una ronda
 * suave para calentar (3) o una brutal para exigirse (9) sin dejar de ser B1.
 * Este modulo define ese segundo eje, compartido por TODAS las competencias
 * (grammar, vocabulary, reading, listening, writing, speaking) -> una sola
 * definicion de "que tan dificil" en vez de una por feature.
 *
 * Solo datos + funciones puras: la presentacion vive en ui/session-end.js y la
 * inyeccion al prompt del Worker la hace quien abre la sesion.
 */

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 10;
export const DEFAULT_LEVEL = 4;

/**
 * Los 10 escalones. `label` para el selector, `hint` para que el alumno sepa
 * que esta eligiendo, y `prompt` son las instrucciones REALES que se le pasan
 * a la profe para que genere ejercicios de esa intensidad.
 */
const LEVELS = [
  {
    n: 1,
    label: "Primer paso",
    hint: "Frases de 3-4 palabras, con opciones para elegir.",
    prompt: "Frases de 3 a 4 palabras, vocabulario basiquisimo y muy frecuente. " +
      "Dale SIEMPRE dos opciones para elegir en vez de pedir produccion libre. " +
      "Repite la misma estructura varias veces para fijarla.",
  },
  {
    n: 2,
    label: "Muy facil",
    hint: "Frases cortas y una sola idea por frase.",
    prompt: "Frases de 4 a 5 palabras, una sola idea. Presente simple. " +
      "Ofrece pistas antes de que el alumno responda.",
  },
  {
    n: 3,
    label: "Facil",
    hint: "Frases simples, te doy pistas si dudas.",
    prompt: "Frases de 5 a 6 palabras con vocabulario cotidiano. " +
      "Da la primera palabra como pista cuando pidas traducir.",
  },
  {
    n: 4,
    label: "Normal",
    hint: "Frases completas del dia a dia, sin pistas.",
    prompt: "Frases completas de 6 a 8 palabras, situaciones cotidianas, " +
      "sin pistas salvo que el alumno se trabe.",
  },
  {
    n: 5,
    label: "Firme",
    hint: "Frases mas largas y dos tiempos verbales mezclados.",
    prompt: "Frases de 8 a 10 palabras. Mezcla DOS tiempos verbales en la misma " +
      "ronda para que el alumno tenga que elegir la forma correcta.",
  },
  {
    n: 6,
    label: "Exigente",
    hint: "Frases compuestas y conectores.",
    prompt: "Frases compuestas con conectores (because, although, while, so that). " +
      "Pide que el alumno una dos ideas en una sola frase.",
  },
  {
    n: 7,
    label: "Dificil",
    hint: "Matices, negaciones y preguntas complejas.",
    prompt: "Introduce negaciones, preguntas indirectas y matices de significado. " +
      "Pide reformular la misma idea de dos maneras distintas.",
  },
  {
    n: 8,
    label: "Muy dificil",
    hint: "Expresiones idiomaticas y registro formal.",
    prompt: "Usa expresiones idiomaticas y cambios de registro (formal/informal). " +
      "Pide al alumno adaptar la frase segun con quien habla.",
  },
  {
    n: 9,
    label: "Reto",
    hint: "Parrafos, ambiguedad y correccion estricta.",
    prompt: "Pide parrafos cortos, no frases sueltas. Introduce ambiguedad que el " +
      "alumno debe resolver. Corrige con severidad, incluyendo naturalidad y matiz.",
  },
  {
    n: 10,
    label: "Nivel nativo",
    hint: "Como con un hablante nativo. Sin concesiones.",
    prompt: "Habla como con un nativo: velocidad normal, modismos, ironia, phrasal " +
      "verbs poco comunes. No simplifiques nada. Corrige hasta el detalle mas fino " +
      "(colocaciones, ritmo, palabra exacta). Exige precision total.",
  },
];

/** Encierra `n` dentro de 1..10 (tolera basura: NaN, strings, null). */
export function clampLevel(n) {
  const v = Math.round(Number(n));
  if (!Number.isFinite(v)) return DEFAULT_LEVEL;
  return Math.min(MAX_LEVEL, Math.max(MIN_LEVEL, v));
}

/** Descriptor completo del nivel (siempre devuelve uno valido). */
export function levelInfo(n) {
  return LEVELS[clampLevel(n) - 1];
}

/** Nombre corto del nivel ("Normal", "Reto"...). */
export function levelLabel(n) {
  return levelInfo(n).label;
}

/** Los 10 descriptores, para pintar el selector. */
export function allLevels() {
  return LEVELS.slice();
}

/**
 * Nivel de arranque sugerido a partir del MCER: un A1 no deberia empezar en 4.
 * Es solo la PRIMERA sugerencia; a partir de ahi manda lo que elija el alumno.
 */
export function levelFromCefr(cefr) {
  const map = { A1: 2, A2: 3, B1: 4, B2: 6, C1: 8, C2: 9 };
  return map[String(cefr || "").toUpperCase()] || DEFAULT_LEVEL;
}

/**
 * Sugerencia para la SIGUIENTE ronda segun como le fue (0..100).
 * Se usa solo para PRESELECCIONAR el selector: la decision final es del alumno.
 * Muy bien -> sube; mal -> baja; en medio -> se queda donde esta.
 */
export function suggestNext(current, pct) {
  const now = clampLevel(current);
  const score = Number(pct);
  if (!Number.isFinite(score)) return now;
  if (score >= 90) return clampLevel(now + 2);
  if (score >= 75) return clampLevel(now + 1);
  if (score < 40) return clampLevel(now - 2);
  if (score < 55) return clampLevel(now - 1);
  return now;
}

/**
 * Instrucciones para la profe (IA) segun el nivel elegido. Se anexa al `topic`
 * de la sesion -> los ejercicios salen con esa intensidad.
 */
export function difficultyPrompt(n) {
  const lv = levelInfo(n);
  return `NIVEL DE PRACTICA ELEGIDO POR EL ALUMNO: ${lv.n} de 10 (${lv.label}). ` +
    `Ajusta TODOS los ejercicios a esta intensidad: ${lv.prompt}`;
}
