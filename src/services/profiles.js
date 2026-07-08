/**
 * services/profiles.js — Perfiles de estudiante y profesor (I/O con Supabase).
 *
 * Capa de servicios. Encapsula todo el acceso a las tablas `profiles`,
 * `student_profiles` y `teacher_profiles`.
 */
import { supabase } from "../config/supabase.js";

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
