/**
 * services/profiles.js — Perfiles de estudiante y profesor (I/O con Supabase).
 *
 * Capa de servicios. Encapsula todo el acceso a las tablas `profiles`,
 * `student_profiles` y `teacher_profiles`.
 */
import { supabase } from "../config/supabase.js";
import { computeStreak } from "../core/streak.js";

/**
 * Crea el perfil base + el perfil especifico del rol.
 * @returns {{ok: boolean, error?: string}}
 */
export async function createProfile({ userId, fullName, role }) {
  const { error: pErr } = await supabase
    .from("profiles")
    .insert({ id: userId, full_name: fullName, role });
  if (pErr) return { ok: false, error: pErr.message };

  if (role === "student") {
    const { error } = await supabase.from("student_profiles").insert({ user_id: userId });
    if (error) return { ok: false, error: error.message };
  } else if (role === "teacher") {
    const { error } = await supabase.from("teacher_profiles").insert({ user_id: userId });
    if (error) return { ok: false, error: error.message };
  }
  return { ok: true };
}

/** Devuelve el perfil base (con rol) del usuario. */
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) return null;
  return data;
}

/** Devuelve el perfil de estudiante. */
export async function getStudentProfile(userId) {
  const { data } = await supabase
    .from("student_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  return data || null;
}

/** Devuelve el perfil de profesor. */
export async function getTeacherProfile(userId) {
  const { data } = await supabase
    .from("teacher_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  return data || null;
}

/**
 * Registra actividad de hoy y actualiza la racha (habito).
 * Idempotente por dia: si ya estudio hoy, no cambia nada.
 * Tambien registra el dia en activity_days (heatmap) y la mejor racha.
 * @returns {{streak, changed}} racha nueva y si hoy conto como dia nuevo.
 */
export async function recordActivity(userId) {
  const profile = await getStudentProfile(userId);
  if (!profile) return { streak: 0, changed: false };
  const { streak, changed, today } = computeStreak(profile.last_active, profile.streak || 0);
  if (changed) {
    const best = Math.max(profile.best_streak || 0, streak);
    await supabase
      .from("student_profiles")
      .update({ streak, last_active: today, best_streak: best })
      .eq("user_id", userId);
    // Registra el dia para el mapa de calor (upsert sobre la PK user_id+day).
    await supabase
      .from("activity_days")
      .upsert({ user_id: userId, day: today, count: 1 }, { onConflict: "user_id,day" });
  }
  return { streak, changed };
}

/** Actualiza campos editables del perfil de estudiante (bio, metas, etc.). */
export async function updateStudentProfile(userId, fields) {
  const { error } = await supabase
    .from("student_profiles")
    .update(fields)
    .eq("user_id", userId);
  return error ? { ok: false, error: error.message } : { ok: true };
}
