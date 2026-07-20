/**
 * core/content-audit.js — Auditor de contenido (logica pura, testeable).
 *
 * Responde de forma OBJETIVA "que tan robusto y completo es el curso":
 *  - Integridad: cada actividad esta bien formada (respuestas validas, sin ids
 *    duplicados, huecos con solucion, etc.). Errores = contenido roto.
 *  - Cobertura: matriz nivel x competencia y fases del ciclo (Aprende/Practica/
 *    Produce) presentes en cada unidad.
 *  - Puntaje: un % de calidad derivado de las verificaciones anteriores.
 *
 * No toca DOM ni red. La UI (features/quality.js) solo pinta lo que aqui se calcula.
 */
import { SKILL_META } from "../data/skill-meta.js";

const ALL_SKILLS = Object.keys(SKILL_META);

/** Valida una actividad. Devuelve string de error o null si esta bien. */
function activityError(a) {
  const p = a.payload || {};
  switch (a.type) {
    case "multiple_choice":
      if (!Array.isArray(p.choices) || p.choices.length < 2) return "opciones insuficientes";
      if (!Number.isInteger(p.answer) || p.answer < 0 || p.answer >= p.choices.length) return "indice de respuesta invalido";
      return null;
    case "cloze":
      if (!p.answer || !String(p.answer).trim()) return "falta la respuesta";
      return null;
    case "word_bank": {
      if (!Array.isArray(p.words) || !Array.isArray(p.answer)) return "faltan words/answer";
      const a1 = [...p.words].sort().join("|");
      const a2 = [...p.answer].sort().join("|");
      if (a1 !== a2) return "words y answer no coinciden";
      return null;
    }
    case "matching":
      if (!Array.isArray(p.pairs) || p.pairs.length < 2) return "pares insuficientes";
      if (p.pairs.some((x) => !x.left || !x.right)) return "par incompleto";
      return null;
    case "listening": {
      if (!p.audio || !String(p.audio).trim()) return "falta el texto del audio";
      // Reusa las reglas de MC (si hay choices) o de cloze (texto libre).
      if (Array.isArray(p.choices)) {
        if (p.choices.length < 2) return "opciones insuficientes";
        if (!Number.isInteger(p.answer) || p.answer < 0 || p.answer >= p.choices.length) return "indice de respuesta invalido";
      } else if (!p.answer || !String(p.answer).trim()) {
        return "falta la respuesta";
      }
      return null;
    }
    default:
      return `tipo desconocido: ${a.type}`;
  }
}

/**
 * Audita todas las unidades.
 * @param {Array} units
 * @returns {object} reporte { units, integrity, coverage, score }
 */
export function auditContent(units) {
  const integrity = [];
  const lessonIds = new Set();
  const vocabIds = new Set();

  const unitReports = units.map((u) => {
    const phases = { learn: false, practice: false, produce: false };
    const skillsCovered = new Set();
    let activityCount = 0;

    for (const lesson of u.lessons) {
      if (lessonIds.has(lesson.id)) integrity.push({ level: "error", msg: `Leccion duplicada: ${lesson.id}` });
      lessonIds.add(lesson.id);
      if (phases[lesson.phase] !== undefined) phases[lesson.phase] = true;
      (lesson.skills || []).forEach((s) => skillsCovered.add(s));

      if (lesson.phase === "learn") {
        const c = lesson.content || {};
        if (!c.reading && !(c.glossary || []).length) {
          integrity.push({ level: "warn", msg: `${lesson.id}: fase Aprende sin lectura ni glosario` });
        }
      }
      for (const a of lesson.activities || []) {
        activityCount++;
        const err = activityError(a);
        if (err) integrity.push({ level: "error", msg: `${a.id || lesson.id}: ${err}` });
      }
    }

    for (const v of u.vocab || []) {
      if (vocabIds.has(v.id)) integrity.push({ level: "error", msg: `Vocab duplicado: ${v.id}` });
      vocabIds.add(v.id);
    }

    const checks = [
      { label: "Tiene fase Aprende (input)", ok: phases.learn },
      { label: "Tiene fase Practica", ok: phases.practice },
      { label: "Tiene fase Produccion", ok: phases.produce },
      { label: "Vocabulario suficiente (>=5)", ok: (u.vocab || []).length >= 5 },
      { label: "Objetivos can-do (>=1)", ok: (u.cando || []).length >= 1 },
      { label: "Suficientes actividades (>=6)", ok: activityCount >= 6 },
    ];

    return {
      id: u.id, title: u.title, level: u.level,
      checks, phases, activityCount,
      skillsCovered: [...skillsCovered],
    };
  });

  // Cobertura por nivel: cuenta lecciones que entrenan cada competencia.
  const byLevel = {};
  for (const u of units) {
    const lvl = (byLevel[u.level] ||= { unitCount: 0, skills: {} });
    lvl.unitCount++;
    for (const lesson of u.lessons) {
      for (const s of lesson.skills || []) lvl.skills[s] = (lvl.skills[s] || 0) + 1;
    }
  }

  const skillsCoveredGlobal = new Set();
  units.forEach((u) => u.lessons.forEach((l) => (l.skills || []).forEach((s) => skillsCoveredGlobal.add(s))));

  // Puntaje: integridad (40) + completitud media de unidades (30) + amplitud (30).
  const errorCount = integrity.filter((i) => i.level === "error").length;
  const integrityScore = errorCount === 0 ? 40 : Math.max(0, 40 - errorCount * 10);

  const completeness = unitReports.length
    ? unitReports.reduce((acc, r) => acc + r.checks.filter((c) => c.ok).length / r.checks.length, 0) / unitReports.length
    : 0;
  const completenessScore = Math.round(completeness * 30);

  const breadthScore = Math.round((skillsCoveredGlobal.size / ALL_SKILLS.length) * 30);

  const value = integrityScore + completenessScore + breadthScore;

  return {
    units: unitReports,
    integrity,
    coverage: { byLevel, allSkills: ALL_SKILLS, skillsCovered: [...skillsCoveredGlobal] },
    score: { value, max: 100, pct: value, errorCount },
  };
}
