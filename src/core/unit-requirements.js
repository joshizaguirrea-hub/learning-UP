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
 * Decision v2: SOLO el mazo de verbos ATADO AL TEMA de la unidad
 * (data/topic-verb-decks.js) era requisito -- el UNICO que de verdad
 * pertenecia a esa unidad.
 *
 * Decision v3 (esta, feedback directo del alumno): incluso ESE mazo, solo,
 * cansaba -- era una tarea extra y separada DESPUES de ya haber estudiado
 * toda la unidad. Los verbos del tema ahora se DISTRIBUYEN directamente en la
 * leccion de GRAMATICA (ejemplos + 1-2 ejercicios de calentamiento) y en el
 * VOCABULARIO de la unidad -> SRS normal (ver data/verb-interleave.js, que se
 * aplica a cada unidad en data/units/index.js). Por eso NINGUN mazo Bonus
 * bloquea ya el avance: todos (verbos, idioms, expresiones) son 100%
 * opcionales, para TODAS las unidades, sin excepcion. Esta funcion se
 * mantiene (en vez de borrarla y tocar cada llamador) para no romper
 * core/progression.js, features/map.js, features/course-cards.js y
 * features/unit-content.js, que la consultan como "fuente de verdad" de que
 * mazos exige una unidad -- ahora esa respuesta es, a proposito, siempre
 * ninguno.
 */

/**
 * Ids de mazos Bonus que esta unidad exige dominar para considerarse
 * "pasada". Siempre vacio (ver Decision v3 arriba): ningun mazo Bonus
 * bloquea el avance. Se mantiene la firma para no tocar a sus llamadores.
 * @param {object} _unit
 * @returns {string[]}
 */
export function requiredBonusDeckIds(_unit) {
  return [];
}

/** Prefijo de los ids sinteticos que representan "mazo Bonus dominado" dentro
 * del mismo Set `completed` que ya usan isUnitComplete()/unlockedUnitIds(). */
export const BONUS_DONE_PREFIX = "bonus:";

/** True si TODOS los mazos requeridos de la unidad ya estan dominados.
 * Con requiredBonusDeckIds() siempre vacio, esto siempre es true. */
export function requiredBonusSatisfied(unit, completed) {
  return requiredBonusDeckIds(unit).every((id) => completed.has(BONUS_DONE_PREFIX + id));
}
