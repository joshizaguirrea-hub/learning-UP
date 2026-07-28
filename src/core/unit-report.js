/**
 * core/unit-report.js — Motor PURO del "boletin de la unidad".
 *
 * Al terminar una unidad del curso, un buen profe no solo dice "aprobaste":
 * desglosa COMO te fue en cada competencia (grammar, vocabulary, reading,
 * listening, writing, speaking...), senala en QUE fallaste y que repasar.
 *
 * Este modulo solo CALCULA (sin DOM ni red) a partir de la unidad y el progreso
 * guardado (services/course.js -> { lessonId: {status, score} }). La UI vive en
 * features/unit-report.js y el guardado en ui/unit-report-store.js.
 */

/** Umbral de aprobado por competencia y global (0-100). */
export const PASS = 70;

/** Orden en que se muestran las competencias en el boletin. */
export const SKILL_ORDER = ["grammar", "vocabulary", "reading", "listening", "writing", "speaking", "literature"];

function clamp(n) { return Math.max(0, Math.min(100, Math.round(Number(n) || 0))); }
function avg(nums) { return nums.length ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : 0; }

/**
 * Construye el boletin de una unidad.
 * @param {object} unit - unidad del curso (con lessons[])
 * @param {Object} progressMap - { lessonId: {status, score} }
 * @returns {{unitId, title, level, score, passed, pass, doneLessons, totalLessons,
 *   skills: Array, grammarMistakes: Array, weakSkills: Array<string>}}
 */
export function buildUnitReport(unit, progressMap = {}) {
  const u = unit || {};
  // Lecciones de competencia (excluye el examen, kind === "test").
  const lessons = (u.lessons || []).filter((l) => l && l.kind !== "test" && Array.isArray(l.skills) && l.skills.length);

  const bySkill = {};
  const addLesson = (skill, entry) => {
    (bySkill[skill] = bySkill[skill] || []).push(entry);
  };

  for (const l of lessons) {
    const skill = l.skills[0];
    const p = progressMap[l.id] || {};
    const done = p.status === "done";
    const score = typeof p.score === "number" ? clamp(p.score) : null;
    addLesson(skill, { id: l.id, title: l.title || skill, done, score });
  }

  // Speaking usa un id sintetico (no es una leccion en el array).
  const spId = "speaking-" + u.id;
  if (progressMap[spId]) {
    const p = progressMap[spId];
    addLesson("speaking", {
      id: spId, title: "Speaking: escucha y repite",
      done: p.status === "done",
      score: typeof p.score === "number" ? clamp(p.score) : null,
    });
  }

  const presentSkills = SKILL_ORDER.filter((s) => bySkill[s]);
  const skills = presentSkills.map((id) => {
    const items = bySkill[id];
    const doneItems = items.filter((it) => it.done);
    const scored = doneItems.map((it) => it.score).filter((s) => s !== null);
    const value = scored.length ? avg(scored) : null;
    const pending = doneItems.length < items.length;
    const weak = value !== null && value < PASS;
    return { id, value, doneCount: doneItems.length, total: items.length, pending, weak, lessons: items };
  });

  // Puntaje global = promedio de TODAS las lecciones con nota (hechas).
  const allScored = skills.flatMap((s) => s.lessons.filter((l) => l.done && l.score !== null).map((l) => l.score));
  const score = allScored.length ? avg(allScored) : 0;

  const doneLessons = skills.reduce((n, s) => n + s.doneCount, 0);
  const totalLessons = skills.reduce((n, s) => n + s.total, 0);

  // Errores tipicos de gramatica de la unidad (para practicar desde el boletin).
  const gramLesson = (u.lessons || []).find((l) => Array.isArray(l.skills) && l.skills[0] === "grammar");
  const grammarMistakes = ((gramLesson && gramLesson.grammar && gramLesson.grammar.mistakes) || [])
    .filter((m) => m && m.wrong && m.right)
    .map((m) => ({ wrong: m.wrong, right: m.right, why: m.why || "" }));

  const weakSkills = skills.filter((s) => s.weak).map((s) => s.id);

  return {
    unitId: u.id, title: u.title || "", level: u.level || "",
    score, passed: score >= PASS, pass: PASS,
    doneLessons, totalLessons,
    skills, grammarMistakes, weakSkills,
  };
}

/** ¿La unidad esta "terminada" para mostrar el boletin? (todas las competencias
 * con leccion, hechas). Speaking cuenta solo si hay progreso sintetico. */
export function isUnitComplete(unit, progressMap = {}) {
  const r = buildUnitReport(unit, progressMap);
  return r.totalLessons > 0 && r.doneLessons >= r.totalLessons;
}
