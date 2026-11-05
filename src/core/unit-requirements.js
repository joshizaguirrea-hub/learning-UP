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
 * Decision v1 (ver BITACORA): en B1, el mazo de verbos del tema + Idioms +
 * Expresiones de tiempo pasaban a ser requisito. DURO ROLLBACK PARCIAL: al
 * probarlo, Idioms y Expresiones de tiempo resultaron ser mazos GENERICOS --
 * el MISMO mazo para las 12 unidades de B1, sin relacion con el tema de cada
 * una (ej. "once in a blue moon" no tiene nada que ver con Work & Career).
 * Exigirlos ahi rompia la promesa de "requisito = parte del tema" y encima
 * inflaba el desbloqueo a ~22 tarjetas ajenas al tema solo para avanzar.
 *
 * Decision v2 (esta): SOLO el mazo de verbos ATADO AL TEMA de la unidad
 * (data/topic-verb-decks.js) es requisito -- es el UNICO que de verdad
 * pertenece a esa unidad. Idioms y Expresiones de tiempo vuelven a ser
 * 100% opcionales (Bonos), para TODAS las unidades, sin excepcion.
 *
 * Este modulo sigue siendo la UNICA fuente de verdad de "que mazos exige esta
 * unidad". core/progression.js, features/map.js, features/course-cards.js y
 * features/unit-content.js lo consultan en vez de reinventar la regla cada
 * uno por su lado.
 */
import { topicVerbDeckFor } from "../data/topic-verb-decks.js";

/**
 * Ids de mazos Bonus (data/bonus-decks.js) que esta unidad exige dominar para
 * considerarse "pasada". Vacio si la unidad no tiene mazo de verbos por tema
 * (su bono sigue siendo opcional, sin cambios). SOLO el mazo DEL TEMA cuenta;
 * los genericos (idioms, expresiones de tiempo) nunca son requisito, en
 * ninguna unidad -- no pertenecen a ningun tema en particular.
 * @param {object} unit
 * @returns {string[]}
 */
export function requiredBonusDeckIds(unit) {
  const topicDeck = unit && topicVerbDeckFor(unit.id);
  return topicDeck ? [topicDeck.id] : [];
}

/** Prefijo de los ids sinteticos que representan "mazo Bonus dominado" dentro
 * del mismo Set `completed` que ya usan isUnitComplete()/unlockedUnitIds(). */
export const BONUS_DONE_PREFIX = "bonus:";

/** True si TODOS los mazos requeridos de la unidad ya estan dominados. */
export function requiredBonusSatisfied(unit, completed) {
  return requiredBonusDeckIds(unit).every((id) => completed.has(BONUS_DONE_PREFIX + id));
}
