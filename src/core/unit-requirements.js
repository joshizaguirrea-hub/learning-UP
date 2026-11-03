/**
 * core/unit-requirements.js — Que mazos BONUS exige una unidad para pasar.
 *
 * POR QUE EXISTE
 * ---------------
 * Hasta ahora, "pasar una unidad" = completar las 6 competencias + aprobar el
 * examen (core/progression.js). Los mazos Bonus (verbos, idioms, expresiones)
 * eran 100% opcionales -- welcome-guide.js se lo promete al alumno, y
 * tools/check_onboarding.py lo vigila.
 *
 * Decision (a peticion directa, ver BITACORA): en las unidades de B1 que
 * tienen un mazo de verbos ATADO A SU TEMA (data/topic-verb-decks.js), ese
 * mazo + Idioms + Expresiones de tiempo pasan a ser REQUISITO real, al mismo
 * nivel que el examen. Las demas unidades (A1, A2, C1, C2 -- sin mazo de
 * verbos por tema) NO cambian: sus bonos siguen siendo 100% opcionales.
 *
 * Este modulo es la UNICA fuente de verdad de "que mazos exige esta unidad".
 * core/progression.js, features/map.js, features/course-cards.js y
 * features/unit-content.js lo consultan en vez de reinventar la regla cada
 * uno por su lado (eso fue justo el bug que freno antes: 3 copias del mismo
 * calculo de "unidad completa" ya conviven en el codigo).
 */
import { topicVerbDeckFor } from "../data/topic-verb-decks.js";

// Mazos genericos (no atados a tema) que se exigen JUNTO con el de verbos,
// cuando la unidad tiene uno. Viven una sola vez aqui: si manana cambia el id
// de "idioms" o se agrega otro mazo generico obligatorio, se edita en un solo sitio.
const GENERIC_REQUIRED_IDS = ["idioms", "past-time"];

/**
 * Ids de mazos Bonus (data/bonus-decks.js) que esta unidad exige dominar para
 * considerarse "pasada". Vacio si la unidad no tiene mazo de verbos por tema
 * (su bono sigue siendo opcional, sin cambios).
 * @param {object} unit
 * @returns {string[]}
 */
export function requiredBonusDeckIds(unit) {
  const topicDeck = unit && topicVerbDeckFor(unit.id);
  if (!topicDeck) return [];
  return [topicDeck.id, ...GENERIC_REQUIRED_IDS];
}

/** Prefijo de los ids sinteticos que representan "mazo Bonus dominado" dentro
 * del mismo Set `completed` que ya usan isUnitComplete()/unlockedUnitIds(). */
export const BONUS_DONE_PREFIX = "bonus:";

/** True si TODOS los mazos requeridos de la unidad ya estan dominados. */
export function requiredBonusSatisfied(unit, completed) {
  return requiredBonusDeckIds(unit).every((id) => completed.has(BONUS_DONE_PREFIX + id));
}
