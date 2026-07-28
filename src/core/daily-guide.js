/**
 * core/daily-guide.js — El "coach del dia": arma la sesion guiada. PURO/testeable.
 *
 * Con el plan de trabajo (core/study-plan) + el progreso del curso, decide:
 *   - el saludo segun la hora (buenos dias/tardes/noches) + nombre,
 *   - el TEMA de hoy (primera unidad sin terminar),
 *   - por que competencia empezar (del plan),
 *   - cuanto llevas hoy vs la meta de minutos (actividades/dia),
 *   - y el mensaje que el profe DICE (fluido, en espanol).
 *
 * Sin DOM ni red. La presentacion (tarjeta + voz + botones) vive en features/.
 */

/** Saludo segun la hora local. */
export function greeting(now = new Date()) {
  const h = now.getHours();
  if (h < 12) return "Buenos d\u00edas";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

/** Primer nombre (limpio). */
export function firstNameOf(name) {
  return String(name || "").trim().split(/\s+/)[0] || "estudiante";
}

/** ¿Dos fechas caen el MISMO dia local? */
function sameLocalDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

/**
 * Cuenta cuantas actividades (lecciones) se completaron HOY.
 * @param {string[]} timestamps - ISO de completado (completed_at)
 * @param {Date} [now]
 */
export function countDoneToday(timestamps, now = new Date()) {
  let n = 0;
  for (const ts of timestamps || []) {
    if (!ts) continue;
    const d = new Date(ts);
    if (!isNaN(d) && sameLocalDay(d, now)) n++;
  }
  return n;
}

/**
 * Elige el TEMA de hoy: la primera unidad que no este 100% completada.
 * Como el curso es secuencial, esa es la unidad "actual".
 * @param {Array} units
 * @param {Set<string>} completed - ids de lecciones hechas
 * @returns {object|null} unidad o null si el curso esta completo
 */
export function pickTodayUnit(units, completed) {
  for (const u of units || []) {
    const total = (u.lessons || []).length;
    const done = (u.lessons || []).filter((l) => completed.has(l.id)).length;
    if (total === 0 || done < total) return u;
  }
  return null;
}

/**
 * Construye la sesion guiada del dia.
 * @param {object} p {
 *   name, plan, units, completed:Set, doneToday, now
 * }
 * @returns {{
 *   greeting, name, unit, topic, courseDone, startSkillLabel, order,
 *   budget, doneToday, remaining, metGoal, headline, subline, speech
 * }}
 */
export function buildDailySession(p = {}) {
  const now = p.now || new Date();
  const name = firstNameOf(p.name);
  const hi = greeting(now);
  const plan = p.plan || {};
  const budget = plan.perSession || 2;
  const doneToday = Math.max(0, p.doneToday || 0);
  const remaining = Math.max(0, budget - doneToday);
  const metGoal = doneToday >= budget;

  const unit = pickTodayUnit(p.units, p.completed || new Set());
  const courseDone = !unit;
  const topic = unit ? (unit.title || "tu curso") : null;
  const startSkillLabel = plan.startSkillLabel || "Vocabulary";

  let headline, subline, speech;

  if (courseDone) {
    headline = "\u00a1Completaste tu curso, " + name + "! \uD83C\uDF89";
    subline = "Puedes repasar cualquier tema o subir de nivel cuando quieras.";
    speech = hi + ", " + name + ". \u00a1Felicidades! Completaste todas las unidades de tu nivel. Hoy puedes repasar lo que quieras.";
  } else if (metGoal) {
    headline = "\u00a1Meta de hoy cumplida, " + name + "! \uD83C\uDFAF";
    subline = "Hiciste tus " + budget + (budget === 1 ? " actividad" : " actividades") + " de hoy. \u00bfSeguimos o descansas?";
    speech = "\u00a1Muy bien, " + name + "! Ya cumpliste tu meta de hoy. \u00bfQuieres seguir con otra clase, o lo dejamos por hoy y descansas?";
  } else if (doneToday > 0) {
    headline = hi + ", " + name;
    subline = "Vas " + doneToday + " de " + budget + " de hoy. Sigamos con \u201c" + topic + "\u201d.";
    speech = "\u00a1Vamos, " + name + "! Llevas " + doneToday + " de " + budget + ". Continuemos con " + topic + ". \u00bfAvanzamos a la siguiente clase?";
  } else {
    headline = hi + ", " + name;
    subline = "Hoy vamos a ver \u201c" + topic + "\u201d. Empezamos con " + startSkillLabel + ".";
    speech = hi + ", " + name + ". Para hoy vamos a ver " + topic + ". Empezamos con " + startSkillLabel + ". \u00a1Vamos con todo!";
  }

  return {
    greeting: hi, name, unit, topic, courseDone,
    startSkillLabel, order: plan.skillOrder || [],
    budget, doneToday, remaining, metGoal,
    headline, subline, speech,
  };
}
