/**
 * services/placement.js — Persistencia del examen y del plan (I/O con Supabase).
 *
 * Capa de servicios: unico punto que escribe el resultado del examen y el plan.
 * Recibe datos ya calculados por los motores de core/ (no calcula nada aqui).
 */
import { supabase } from "../config/supabase.js";

/**
 * Guarda el resultado del examen: registra el intento, actualiza el nivel del
 * estudiante y crea el plan con sus modulos.
 * @param {string} userId
 * @param {object} examResult - salida de core/placement.js -> result()
 * @param {object} plan - salida de core/plan.js -> generatePlan()
 * @returns {{ok: boolean, error?: string}}
 */
export async function savePlacement(userId, examResult, plan) {
  // 1) Registrar el intento.
  const { error: aErr } = await supabase.from("placement_attempts").insert({
    user_id: userId,
    cefr_result: examResult.cefr,
    correct: examResult.correct,
    total: examResult.total,
    details: examResult.byLevel,
  });
  if (aErr) return { ok: false, error: aErr.message };

  // 2) Actualizar el nivel del estudiante.
  const { error: sErr } = await supabase
    .from("student_profiles")
    .update({ cefr_level: examResult.cefr, placement_done: true })
    .eq("user_id", userId);
  if (sErr) return { ok: false, error: sErr.message };

  // 3) Crear el plan (borrando el anterior si existia: un plan activo a la vez).
  await supabase.from("study_plans").delete().eq("user_id", userId);
  const { data: planRow, error: pErr } = await supabase
    .from("study_plans")
    .insert({ user_id: userId, from_level: plan.fromLevel, target_level: plan.targetLevel })
    .select()
    .single();
  if (pErr) return { ok: false, error: pErr.message };

  // 4) Insertar los modulos del plan.
  const modules = plan.modules.map((m) => ({
    plan_id: planRow.id,
    order_no: m.order,
    level: m.level,
    skill: m.skill,
    title: m.title,
    status: m.status,
  }));
  const { error: mErr } = await supabase.from("plan_modules").insert(modules);
  if (mErr) return { ok: false, error: mErr.message };

  return { ok: true };
}

/** Devuelve el plan vigente del estudiante con sus modulos (o null). */
export async function getCurrentPlan(userId) {
  const { data: plan } = await supabase
    .from("study_plans")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!plan) return null;

  const { data: modules } = await supabase
    .from("plan_modules")
    .select("*")
    .eq("plan_id", plan.id)
    .order("order_no", { ascending: true });

  return { ...plan, modules: modules || [] };
}
