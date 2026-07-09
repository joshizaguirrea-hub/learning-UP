/**
 * services/activity.js — Dias activos del estudiante (para el mapa de calor).
 */
import { supabase } from "../config/supabase.js";

/**
 * Devuelve un Set con los dias activos (ISO 'YYYY-MM-DD') desde `sinceISO`.
 * @param {string} userId
 * @param {string} sinceISO - fecha ISO desde la cual traer (inclusive)
 * @returns {Promise<Set<string>>}
 */
export async function getActiveDays(userId, sinceISO) {
  const { data, error } = await supabase
    .from("activity_days")
    .select("day")
    .eq("user_id", userId)
    .gte("day", sinceISO);
  if (error || !data) return new Set();
  return new Set(data.map((r) => r.day));
}
