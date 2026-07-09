/**
 * services/course.js — Progreso del curso por lecciones (I/O Supabase).
 *
 * Capa de servicios. Marca lecciones completadas y consulta el estado.
 */
import { supabase } from "../config/supabase.js";

/** Devuelve un mapa { lesson_id: {status, score} } del progreso del usuario. */
export async function getCourseProgress(userId) {
  const { data } = await supabase
    .from("course_progress")
    .select("lesson_id, status, score")
    .eq("user_id", userId);
  const map = {};
  (data || []).forEach((r) => { map[r.lesson_id] = { status: r.status, score: r.score }; });
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
