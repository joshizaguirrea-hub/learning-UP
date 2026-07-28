/**
 * core/study-plan.js — Genera el PLAN DE TRABAJO del estudiante. PURO y testeable.
 *
 * A partir del cuestionario de onboarding (meta + minutos/dia + autonivel) y del
 * nivel MCER final, el "profe" arma un plan: por donde EMPEZAR (que competencia),
 * el ORDEN recomendado de competencias segun la meta, y cuantas actividades caben
 * en la sesion diaria segun el tiempo elegido. Sin DOM ni red.
 */

// Las 6 competencias del curso (mismos ids que el examen de ubicacion).
export const SKILLS = ["vocabulary", "grammar", "reading", "literature", "writing", "speaking"];

export const SKILL_LABEL = {
  vocabulary: "Vocabulary",
  grammar: "Gram\u00e1tica",
  reading: "Reading",
  literature: "Literatura",
  writing: "Writing",
  speaking: "Speaking",
};

// Metas de estudio: cada una prioriza las competencias de forma distinta.
export const GOALS = {
  work: {
    label: "Ofertas laborales",
    emoji: "\uD83D\uDCBC",
    desc: "Entrevistas, correos y reuniones en ingl\u00e9s.",
    order: ["speaking", "vocabulary", "writing", "grammar", "reading", "literature"],
    tip: "Priorizamos Speaking y Writing: lo que m\u00e1s pesa en una entrevista y en el trabajo.",
  },
  travel: {
    label: "Viajes",
    emoji: "\u2708\uFE0F",
    desc: "Moverte, pedir y conversar en cualquier pa\u00eds.",
    order: ["speaking", "vocabulary", "reading", "grammar", "writing", "literature"],
    tip: "Enfocamos Speaking y Vocabulary para que te defiendas hablando desde el d\u00eda uno.",
  },
  study: {
    label: "Estudios / examen",
    emoji: "\uD83C\uDF93",
    desc: "Acad\u00e9mico, ex\u00e1menes o certificaci\u00f3n.",
    order: ["grammar", "reading", "writing", "vocabulary", "literature", "speaking"],
    tip: "Reforzamos Gram\u00e1tica, Reading y Writing: la base de cualquier examen oficial.",
  },
  culture: {
    label: "Cultura / entretenimiento",
    emoji: "\uD83C\uDFAC",
    desc: "Series, m\u00fasica, libros y pel\u00edculas.",
    order: ["literature", "reading", "vocabulary", "speaking", "grammar", "writing"],
    tip: "Damos peso a Literatura y Reading para que disfrutes el contenido en su idioma original.",
  },
  personal: {
    label: "Superaci\u00f3n personal",
    emoji: "\uD83C\uDF31",
    desc: "Aprender por gusto, sin prisa.",
    order: ["vocabulary", "grammar", "reading", "speaking", "literature", "writing"],
    tip: "Empezamos por Vocabulary y Gram\u00e1tica: la base para construir todo lo dem\u00e1s.",
  },
};

// Autonivel elegido en el cuestionario.
//  - basico / a2  -> nivel conocido, NO hace examen (empieza directo).
//  - intermedio / avanzado -> hace el examen adaptativo ("Prueba").
export const SELF_LEVELS = {
  basico: { label: "B\u00e1sico", desc: "Desconozco el idioma, empiezo de cero.", cefr: "A1", test: false, emoji: "\uD83C\uDF31" },
  a2: { label: "A2", desc: "S\u00e9 lo b\u00e1sico del d\u00eda a d\u00eda.", cefr: "A2", test: false, emoji: "\uD83C\uDF3F" },
  intermedio: { label: "Intermedio (Prueba)", desc: "Me defiendo; hago una prueba corta.", cefr: null, test: true, emoji: "\uD83D\uDE80" },
  avanzado: { label: "Avanzado (Prueba)", desc: "Nivel alto; hago una prueba para ubicarme.", cefr: null, test: true, emoji: "\uD83C\uDFAF" },
};

// Minutos/dia -> cuantas actividades caben en la sesion (una actividad ~5 min).
export const MINUTES = {
  5: { label: "5 min", perSession: 1, blurb: "Un mordisco diario. La constancia gana." },
  10: { label: "10 min", perSession: 2, blurb: "Ritmo c\u00f3modo para el d\u00eda a d\u00eda." },
  15: { label: "15 min", perSession: 3, blurb: "Buen equilibrio entre avance y vida." },
  30: { label: "30 min", perSession: 5, blurb: "Modo intensivo: vas a volar." },
};

/** ¿El autonivel requiere hacer el examen de ubicacion? */
export function needsTest(selfLevel) {
  return !!SELF_LEVELS[selfLevel]?.test;
}

/** CEFR de arranque para autoniveles SIN examen (basico/a2); null si hace prueba. */
export function cefrForSelfLevel(selfLevel) {
  return SELF_LEVELS[selfLevel]?.cefr || null;
}

/** Cuantas actividades por sesion segun los minutos elegidos. */
export function activitiesPerSession(minutes) {
  return MINUTES[minutes]?.perSession || 2;
}

/**
 * Construye el plan de trabajo completo.
 * @param {object} p { selfLevel, goal, minutes, cefr }
 *   - cefr: nivel MCER final (del examen, o el conocido para basico/a2)
 * @returns {{
 *   cefr, goal, goalLabel, goalTip, minutes, minutesLabel, perSession,
 *   skillOrder:string[], startSkill:string, startSkillLabel:string, summary:string
 * }}
 */
export function buildStudyPlan(p = {}) {
  const goalKey = GOALS[p.goal] ? p.goal : "personal";
  const goal = GOALS[goalKey];
  const cefr = p.cefr || cefrForSelfLevel(p.selfLevel) || "A1";
  const minutes = MINUTES[p.minutes] ? p.minutes : 10;
  const perSession = activitiesPerSession(minutes);

  // El orden de la meta, pero solo con competencias que el curso practica.
  const skillOrder = goal.order.filter((s) => SKILL_LABEL[s]);
  const startSkill = skillOrder[0] || "vocabulary";

  const summary =
    "Con " + MINUTES[minutes].label + " al d\u00eda (" + perSession +
    (perSession === 1 ? " actividad" : " actividades") + ") y tu meta \"" +
    goal.label + "\", empezaremos por " + SKILL_LABEL[startSkill] +
    " en tu nivel " + cefr + ".";

  return {
    cefr,
    goal: goalKey,
    goalLabel: goal.label,
    goalTip: goal.tip,
    minutes,
    minutesLabel: MINUTES[minutes].label,
    perSession,
    skillOrder,
    startSkill,
    startSkillLabel: SKILL_LABEL[startSkill],
    summary,
  };
}
