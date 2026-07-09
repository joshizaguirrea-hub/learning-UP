/**
 * core/plan.js — Generador de plan de estudio personalizado.
 *
 * Logica PURA. A partir del nivel MCER resultante, arma una secuencia de
 * modulos ordenados por el principio i+1 (contenido un pelin arriba del nivel).
 *
 * Cada modulo balancea las 4 competencias: listening, speaking, reading, writing
 * (mas grammar/vocabulary como base). El plan es un andamiaje; el contenido real
 * de cada modulo se ira poblando en fases siguientes.
 */
import { CEFR_ORDER, CEFR_INFO } from "../data/cefr.js";

/** Competencias que todo nivel debe cubrir de forma balanceada. */
const SKILLS = ["grammar", "vocabulary", "reading", "listening", "writing", "speaking"];

const SKILL_LABEL = {
  grammar: "Gramatica",
  vocabulary: "Vocabulario",
  reading: "Lectura",
  listening: "Comprension auditiva",
  writing: "Escritura",
  speaking: "Conversacion",
};

/**
 * Genera un plan de estudio desde el nivel actual hasta el siguiente objetivo.
 * @param {string} currentLevel - nivel MCER de partida (ej. "A2").
 * @param {object} [opts] - { targetLevel } nivel meta (default: el siguiente).
 * @returns {{ fromLevel, targetLevel, modules: Array }}
 */
export function generatePlan(currentLevel, opts = {}) {
  const fromIdx = Math.max(0, CEFR_ORDER.indexOf(currentLevel));
  // Meta por defecto: el siguiente nivel (o el mismo si ya esta en el tope util).
  const defaultTargetIdx = Math.min(fromIdx + 1, CEFR_ORDER.indexOf("C2"));
  const targetIdx = opts.targetLevel
    ? CEFR_ORDER.indexOf(opts.targetLevel)
    : defaultTargetIdx;

  const modules = [];
  let order = 1;

  // Un bloque de modulos por cada nivel desde el actual hasta la meta.
  for (let lvl = fromIdx; lvl <= targetIdx; lvl++) {
    const levelCode = CEFR_ORDER[lvl];
    for (const skill of SKILLS) {
      modules.push({
        order: order++,
        level: levelCode,
        skill,
        title: `${SKILL_LABEL[skill]} - ${levelCode}`,
        description: `${SKILL_LABEL[skill]} nivel ${levelCode}: ${CEFR_INFO[levelCode]?.blurb || ""}`,
        status: "pending", // pending | in_progress | done
      });
    }
  }

  return {
    fromLevel: CEFR_ORDER[fromIdx],
    targetLevel: CEFR_ORDER[targetIdx],
    totalModules: modules.length,
    modules,
  };
}
