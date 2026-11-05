/**
 * services/course.js — Progreso del curso por lecciones (I/O Supabase).
 *
 * Capa de servicios. Marca lecciones completadas y consulta el estado.
 */
import { supabase } from "../config/supabase.js";
import { getCardsByIds } from "./srs.js";
import { bonusDeckById } from "../data/bonus-decks.js";
import { bonusMedals } from "../core/gamification.js";
import { requiredBonusDeckIds, BONUS_DONE_PREFIX } from "../core/unit-requirements.js";

/** Devuelve un mapa { lesson_id: {status, score, completedAt} } del progreso. */
export async function getCourseProgress(userId) {
  const { data } = await supabase
    .from("course_progress")
    .select("lesson_id, status, score, completed_at")
    .eq("user_id", userId);
  const map = {};
  (data || []).forEach((r) => { map[r.lesson_id] = { status: r.status, score: r.score, completedAt: r.completed_at }; });
  return map;
}

/** Marca una leccion como completada (upsert). */
export async function completeLesson(userId, lessonId, score) {
  const { error } = await supabase.from("course_progress").upsert({
    user_id: userId,
    lesson_id: lessonId,
    status: "done",
    score,
    completed_at: new Date().toISOString(),
  });
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Borra TODO el progreso de lecciones del usuario (reinicio del curso). */
export async function resetCourseProgress(userId) {
  const { data, error } = await supabase
    .from("course_progress").delete().eq("user_id", userId).select("lesson_id");
  return error ? { ok: false, error: error.message } : { ok: true, count: (data || []).length };
}

/**
 * Ids sinteticos "bonus:<deckId>" de los mazos BONUS requeridos (ver
 * core/unit-requirements.js) que el usuario YA domina (medalla ganada: todos
 * sus items con reps >= MASTER_REPS). Se fusionan en el MISMO Set `completed`
 * que usan isUnitComplete()/unlockedUnitIds() para desbloquear la siguiente
 * unidad, sin cambiar su forma ni su firma.
 *
 * Para unidades SIN mazo de verbos por tema (requiredBonusDeckIds -> []) esto
 * no hace ninguna llamada de red: cero costo para A1/A2/C1/C2.
 * @param {string} userId
 * @param {Array} units - unidades del nivel (para saber que mazos exigen)
 * @returns {Promise<Set<string>>}
 */
export async function getRequiredBonusCompletion(userId, units) {
  const deckIds = new Set();
  (units || []).forEach((u) => requiredBonusDeckIds(u).forEach((id) => deckIds.add(id)));
  if (!deckIds.size) return new Set();

  const decks = [...deckIds].map(bonusDeckById).filter(Boolean);
  const allItemIds = decks.flatMap((d) => d.items.map((i) => i.id));
  const cardMap = await getCardsByIds(userId, allItemIds);

  const out = new Set();
  bonusMedals(decks, cardMap).forEach((m) => { if (m.passed) out.add(BONUS_DONE_PREFIX + m.deck.id); });
  return out;
}
