/**
 * services/progress.js — Progreso del estudiante en los modulos (I/O Supabase).
 *
 * Capa de servicios. Lee un modulo puntual y actualiza su estado
 * (pending -> in_progress -> done). RLS garantiza que solo el dueno pueda.
 */
import { supabase } from "../config/supabase.js";

/** Devuelve un modulo del plan por su id (o null). */
export async function getModule(moduleId) {
  const { data } = await supabase
    .from("plan_modules")
    .select("*")
    .eq("id", moduleId)
    .maybeSingle();
  return data || null;
}

/** Cambia el estado de un modulo. */
export async function setModuleStatus(moduleId, status) {
  const { error } = await supabase
    .from("plan_modules")
    .update({ status })
    .eq("id", moduleId);
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Cuenta modulos completados y totales de un plan (para la barra de progreso). */
export async function planProgress(planId) {
  const { data } = await supabase
    .from("plan_modules")
    .select("status")
    .eq("plan_id", planId);
  const total = data?.length || 0;
  const done = data?.filter((m) => m.status === "done").length || 0;
  return { done, total, ratio: total ? done / total : 0 };
}
