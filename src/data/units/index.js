/**
 * data/units/index.js — Catalogo de unidades del curso.
 *
 * Datos puros. Registra todas las unidades disponibles. Agregar una unidad
 * nueva = crear su archivo y sumarla a esta lista (la logica no cambia).
 */
import { WORK_CAREER_B1 } from "./work-career-b1.js";
import { TRAVEL_PLANS_B1 } from "./travel-plans-b1.js";
import { A1_HELLO } from "./a1-hello.js";
import { A1_FAMILY } from "./a1-family.js";
import { A1_ROUTINE } from "./a1-routine.js";
import { A1_FOOD } from "./a1-food.js";
import { A1_HOME } from "./a1-home.js";
import { A1_SHOPPING } from "./a1-shopping.js";
import { A1_FREETIME } from "./a1-freetime.js";
import { A1_YESTERDAY } from "./a1-yesterday.js";
import { A2_LAST_WEEKEND } from "./a2-last-weekend.js";
import { A2_TRAVEL_STORIES } from "./a2-travel-stories.js";
import { A2_IN_THE_CITY } from "./a2-in-the-city.js";
import { A2_HEALTH } from "./a2-health.js";
import { A2_MAKING_PLANS } from "./a2-making-plans.js";
import { A2_COMPARISONS } from "./a2-comparisons.js";
import { A2_WORK_JOBS } from "./a2-work-jobs.js";
import { A2_FREE_TIME_SPORT } from "./a2-free-time-sport.js";
import { TECHNOLOGY_B1 } from "./technology-b1.js";
import { ENVIRONMENT_B1 } from "./environment-b1.js";
import { EDUCATION_B1 } from "./education-b1.js";
import { MONEY_B1 } from "./money-b1.js";
import { RELATIONSHIPS_B1 } from "./relationships-b1.js";
import { MEDIA_B1 } from "./media-b1.js";
import { LIFESTYLE_B1 } from "./lifestyle-b1.js";
import { EXPERIENCES_B1 } from "./experiences-b1.js";
import { DECISIONS_B1 } from "./decisions-b1.js";
import { REPORTING_B1 } from "./reporting-b1.js";
import { WORK_WORLD_B2 } from "./work-world-b2.js";
import { SCIENCE_B2 } from "./science-b2.js";
import { ARTS_B2 } from "./arts-b2.js";
import { SOCIETY_B2 } from "./society-b2.js";
import { MIND_B2 } from "./mind-b2.js";
import { MEDIA_INFLUENCE_B2 } from "./media-influence-b2.js";
import { SUSTAINABILITY_B2 } from "./sustainability-b2.js";
import { ETHICS_B2 } from "./ethics-b2.js";
import { ECONOMY_B2 } from "./economy-b2.js";
import { OPINION_ESSAYS_B2 } from "./opinion-essays-b2.js";
import { ACADEMIC_C1 } from "./academic-c1.js";
import { PERSUASION_C1 } from "./persuasion-c1.js";
import { GLOBAL_ISSUES_C1 } from "./global-issues-c1.js";
import { LANGUAGE_STYLE_C1 } from "./language-style-c1.js";
import { CULTURE_IDENTITY_C1 } from "./culture-identity-c1.js";
import { WORKPLACE_C1 } from "./workplace-c1.js";
import { LITERATURE_C1 } from "./literature-c1.js";
import { DATA_TRENDS_C1 } from "./data-trends-c1.js";
import { DEBATE_C1 } from "./debate-c1.js";
import { RESEARCH_C1 } from "./research-c1.js";

// Orden del catalogo: por nivel (A1 -> A2 -> B1 -> B2) y dentro del nivel, por tema.
export const UNITS = [
  // --- A1 ---
  A1_HELLO, A1_FAMILY, A1_ROUTINE, A1_FOOD, A1_HOME, A1_SHOPPING, A1_FREETIME, A1_YESTERDAY,
  // --- A2 ---
  A2_LAST_WEEKEND, A2_TRAVEL_STORIES, A2_IN_THE_CITY, A2_HEALTH,
  A2_MAKING_PLANS, A2_COMPARISONS, A2_WORK_JOBS, A2_FREE_TIME_SPORT,
  // --- B1 ---
  WORK_CAREER_B1, TRAVEL_PLANS_B1, TECHNOLOGY_B1, ENVIRONMENT_B1, EDUCATION_B1, MONEY_B1,
  RELATIONSHIPS_B1, MEDIA_B1, LIFESTYLE_B1, EXPERIENCES_B1, DECISIONS_B1, REPORTING_B1,
  // --- B2 ---
  WORK_WORLD_B2, SCIENCE_B2, ARTS_B2, SOCIETY_B2, MIND_B2, MEDIA_INFLUENCE_B2,
  SUSTAINABILITY_B2, ETHICS_B2, ECONOMY_B2, OPINION_ESSAYS_B2,
  // --- C1 ---
  ACADEMIC_C1, PERSUASION_C1, GLOBAL_ISSUES_C1, LANGUAGE_STYLE_C1, CULTURE_IDENTITY_C1, WORKPLACE_C1,
  LITERATURE_C1, DATA_TRENDS_C1, DEBATE_C1, RESEARCH_C1,
];

/** Unidades disponibles para un nivel MCER dado. */
export function unitsForLevel(level) {
  return UNITS.filter((u) => u.level === level);
}

/** Busca una unidad por su id. */
export function unitById(id) {
  return UNITS.find((u) => u.id === id) || null;
}

/** Busca una leccion (y su unidad) por el id de la leccion. */
export function findLesson(lessonId) {
  for (const unit of UNITS) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return { unit, lesson };
  }
  return null;
}

/** Busca un item de vocabulario por su id (en cualquier unidad). */
export function vocabById(vocabId) {
  for (const unit of UNITS) {
    const item = unit.vocab.find((v) => v.id === vocabId);
    if (item) return item;
  }
  return null;
}
