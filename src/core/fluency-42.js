/**
 * core/fluency-42.js — Motor PURO de la tecnica de fluidez 4/3/2 (Nation & Maurice).
 *
 * Idea pedagogica: cuentas la MISMA historia tres veces, con menos tiempo cada
 * vez (4 -> 3 -> 2 min). Al bajar el techo de tiempo pero mantener el contenido,
 * el cerebro AUTOMATIZA el habla: hablas mas rapido, con menos titubeos y menos
 * muletillas. La prueba de que funciono = tus palabras-por-minuto (WPM) SUBEN
 * ronda a ronda mientras las muletillas BAJAN.
 *
 * Este modulo solo mide y puntua (sin DOM ni red). La UI vive en
 * features/fluency-42.js y el microfono en ui/mic.js.
 */

/** Plan canonico de la tecnica: 4, 3 y 2 minutos (el techo de cada ronda). */
export const ROUND_PLAN = [
  { id: 1, seconds: 240, label: "4 min" },
  { id: 2, seconds: 180, label: "3 min" },
  { id: 3, seconds: 120, label: "2 min" },
];

/** Muletillas tipicas del ingles (incluye multi-palabra). Todo en minusculas. */
export const FILLERS = [
  "um", "uh", "er", "ah", "hmm", "like", "you know", "i mean",
  "kind of", "sort of", "basically", "actually", "literally",
];

/** Cuenta palabras reales (tokens alfabeticos, apostrofes incluidos). */
export function countWords(text) {
  const m = String(text || "").toLowerCase().match(/[a-z']+/g);
  return m ? m.length : 0;
}

/** Cuenta ocurrencias de muletillas (incluye frases de 2 palabras). */
export function countFillers(text) {
  const t = " " + String(text || "").toLowerCase().replace(/[^a-z' ]+/g, " ").replace(/\s+/g, " ") + " ";
  let n = 0;
  for (const f of FILLERS) {
    const re = new RegExp("(?:^| )" + f.replace(/ /g, " ") + "(?= |$)", "g");
    const hits = t.match(re);
    if (hits) n += hits.length;
  }
  return n;
}

/** Palabras por minuto: palabras / (segundos/60). 0 si no hubo tiempo. */
export function wpm(words, seconds) {
  const s = Number(seconds) || 0;
  if (s <= 0) return 0;
  return Math.round((Number(words) || 0) / (s / 60));
}

function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, Math.round(Number(n) || 0))); }

/**
 * Analiza una ronda: transcripcion + segundos hablados (los REALES, no el techo).
 * @returns {{words, seconds, wpm, fillers, fillerRate}}  fillerRate = muletillas por 100 palabras
 */
export function analyzeRound({ transcript, seconds }) {
  const words = countWords(transcript);
  const fillers = countFillers(transcript);
  const fillerRate = words > 0 ? Math.round((fillers / words) * 100) : 0;
  return { words, seconds: Number(seconds) || 0, wpm: wpm(words, seconds), fillers, fillerRate };
}

/**
 * Resume la sesion completa a partir de las rondas analizadas.
 * @param {Array} rounds - salida de analyzeRound por ronda (>=1)
 * @returns {{wpmByRound, fillerRateByRound, deltaWpm, fillerDrop, fluencyGain, bestWpm}}
 */
export function summarize(rounds) {
  const rs = Array.isArray(rounds) ? rounds.filter(Boolean) : [];
  if (!rs.length) {
    return { wpmByRound: [], fillerRateByRound: [], deltaWpm: 0, fillerDrop: 0, fluencyGain: false, bestWpm: 0 };
  }
  const first = rs[0];
  const last = rs[rs.length - 1];
  const wpmByRound = rs.map((r) => r.wpm);
  const fillerRateByRound = rs.map((r) => r.fillerRate);
  const deltaWpm = last.wpm - first.wpm;
  const fillerDrop = first.fillerRate - last.fillerRate;
  return {
    wpmByRound,
    fillerRateByRound,
    deltaWpm,
    fillerDrop,
    fluencyGain: deltaWpm > 0, // hablaste mas rapido pese a tener menos tiempo
    bestWpm: Math.max(...wpmByRound),
  };
}

/**
 * Puntaje de fluidez 0..100 para alimentar el Speaking Score.
 *  - Ritmo (0..70): WPM de la ultima ronda contra una meta conversacional (120).
 *  - Mejora (0..20): cuanto subieron tus WPM de la 1a a la ultima ronda.
 *  - Muletillas (0..-20): penaliza la tasa de muletillas de la ultima ronda.
 * @param {Array} rounds - rondas analizadas
 */
export function fluencyScore(rounds) {
  const rs = Array.isArray(rounds) ? rounds.filter(Boolean) : [];
  if (!rs.length) return 0;
  const last = rs[rs.length - 1];
  const first = rs[0];
  const TARGET_WPM = 120;
  const pace = clamp((last.wpm / TARGET_WPM) * 70, 0, 70);
  const improvement = clamp(last.wpm - first.wpm, 0, 20);
  const fillerPenalty = clamp(last.fillerRate, 0, 20);
  return clamp(pace + improvement - fillerPenalty, 0, 100);
}
