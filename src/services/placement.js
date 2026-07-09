/**
 * services/placement.js — Persistencia del examen de ubicacion (I/O Supabase).
 *
 * Capa de servicios. Registra el intento y fija el nivel del estudiante.
 * El aprendizaje se organiza por unidades del curso (ver services/course.js),
 * no por un plan de modulos aparte.
 */
import { supabase } from "../config/supabase.js";

/**
 * Guarda el resultado del examen: registra el intento y actualiza el nivel.
 * @param {string} userId
 * @param {object} examResult - salida de core/placement.js -> result()
 * @returns {{ok: boolean, error?: string}}
 */
export async function savePlacement(userId, examResult) {
  const { error: aErr } = await supabase.from("placement_attempts").insert({
    user_id: userId,
    cefr_result: examResult.cefr,
    correct: examResult.correct,
    total: examResult.total,
    details: examResult.byLevel,
  });
  if (aErr) return { ok: false, error: aErr.message };

  const { error: sErr } = await supabase
    .from("student_profiles")
    .update({ cefr_level: examResult.cefr, placement_done: true })
    .eq("user_id", userId);
  if (sErr) return { ok: false, error: sErr.message };

  return { ok: true };
}
