/**
 * data/test-gen.js — Generador del TEST FINAL de cada unidad (datos puros).
 *
 * DRY al maximo: el "test final" NO es un motor nuevo. Es una LECCION mas
 * (kind:"test") que reune actividades ya existentes de las lecciones de la
 * unidad. Al ser una leccion normal, fluye por el lesson-player y la ruta
 * /leccion/:id que YA existen: misma calificacion, mismo progreso, mismo
 * desbloqueo. Aprobar el test (>=60%) marca `${unit.id}-test` como completado.
 */

const GRADABLE = new Set(["multiple_choice", "cloze", "word_bank", "matching", "listening"]);
const MAX_Q = 10;

/** Reune actividades calificables de las lecciones de contenido de la unidad. */
function poolOf(unit) {
  const byLesson = (unit.lessons || [])
    .filter((l) => l.kind !== "test")
    .map((l) => (l.activities || []).filter((a) => GRADABLE.has(a.type)));

  // Round-robin: toma 1 de cada leccion por vuelta -> mezcla de competencias.
  const out = [];
  let added = true;
  for (let i = 0; added && out.length < MAX_Q; i++) {
    added = false;
    for (const acts of byLesson) {
      if (acts[i]) { out.push(acts[i]); added = true; if (out.length >= MAX_Q) break; }
    }
  }
  return out;
}

/** Construye la leccion-test de una unidad, o null si no hay material. */
export function buildUnitTest(unit) {
  const pool = poolOf(unit);
  if (pool.length < 4) return null;

  const activities = pool.map((a, i) => ({
    ...a,
    id: unit.id + "-test-q" + (i + 1), // id propio para no chocar con el original
  }));

  return {
    id: unit.id + "-test",
    kind: "test",
    order: 99, // siempre el ULTIMO paso de la unidad
    phase: "produce",
    skills: [], // no infla la matriz de competencias (no es una competencia)
    title: "Test final",
    intro:
      "TEST FINAL de la unidad. Junta lo que practicaste (vocabulario, gramatica, " +
      "lectura, listening...). Necesitas 60% para aprobar y desbloquear la siguiente " +
      "unidad. \u00a1T\u00fa puedes!",
    activities,
  };
}

/**
 * Devuelve la unidad asegurando que tenga su test final. Muta la unidad.
 * Debe correr DESPUES de withListening para incluir tambien el listening.
 */
export function withTest(unit) {
  const already = (unit.lessons || []).some((l) => l.kind === "test");
  if (!already) {
    const test = buildUnitTest(unit);
    if (test) unit.lessons.push(test);
  }
  return unit;
}
