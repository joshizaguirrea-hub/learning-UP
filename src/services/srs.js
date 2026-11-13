/**
 * services/srs.js — Tarjetas de repeticion espaciada (I/O Supabase).
 *
 * Capa de servicios. Crea tarjetas para el vocabulario, consulta las vencidas
 * y persiste el resultado de cada repaso (calculado por core/srs.js).
 */
import { supabase } from "../config/supabase.js";
import { newCard, isoDay } from "../core/srs.js";

/**
 * Crea tarjetas para una lista de vocab si el usuario aun no las tiene.
 * @param {string} userId
 * @param {Array} vocab - items del catalogo (con .id)
 */
export async function ensureCards(userId, vocab) {
  const base = newCard();
  const rows = vocab.map((v) => ({
    user_id: userId,
    vocab_id: v.id,
    ease: base.ease,
    interval: base.interval,
    reps: base.reps,
    due: base.due,
  }));
  // upsert con ignoreDuplicates: no pisa el progreso de tarjetas existentes.
  const { error } = await supabase
    .from("srs_cards")
    .upsert(rows, { onConflict: "user_id,vocab_id", ignoreDuplicates: true });
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Devuelve las tarjetas vencidas (due <= hoy) del usuario. */
export async function getDueCards(userId) {
  const { data } = await supabase
    .from("srs_cards")
    .select("*")
    .eq("user_id", userId)
    .lte("due", isoDay())
    .order("due", { ascending: true });
  return data || [];
}

/** Cuenta cuantas tarjetas hay para repasar hoy. */
export async function countDue(userId) {
  const { count } = await supabase
    .from("srs_cards")
    .select("vocab_id", { count: "exact", head: true })
    .eq("user_id", userId)
    .lte("due", isoDay());
  return count || 0;
}

/**
 * Guarda una tarjeta tras el repaso (valores ya calculados por core/srs.js).
 *
 * UPSERT, no UPDATE (fix de un bug real reportado: un alumno termino TODOS
 * los verbos de un mazo, la UI mostro "dominado" en los 10, pero al dia
 * siguiente la unidad seguia bloqueada). Causa: un UPDATE sobre una fila que
 * AUN no existe en `srs_cards` no da error en Supabase -- simplemente no
 * hace nada (0 filas afectadas, sin excepcion). Si por lo que sea `ensureCards`
 * no alcanzo a crear la fila antes (red lenta, carrera entre pestanas, RLS),
 * el progreso se "guardaba" en la UI (estado local optimista) pero NUNCA
 * llegaba a la base de datos -- se perdia en silencio. Con UPSERT, exista o
 * no la fila de antes, el guardado SIEMPRE queda.
 */
export async function saveCard(userId, vocabId, card) {
  const { error } = await supabase
    .from("srs_cards")
    .upsert(
      { user_id: userId, vocab_id: vocabId, ease: card.ease, interval: card.interval, reps: card.reps, due: card.due },
      { onConflict: "user_id,vocab_id" }
    );
  if (error) console.warn("[srs] saveCard fallo (progreso NO se guardo):", error.message);
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Borra TODAS las tarjetas SRS del usuario (reinicio del progreso). */
export async function resetSrsCards(userId) {
  const { data, error } = await supabase
    .from("srs_cards").delete().eq("user_id", userId).select("vocab_id");
  return error ? { ok: false, error: error.message } : { ok: true, count: (data || []).length };
}

/** Estadisticas del SRS: total de tarjetas y cuantas ya se han repasado. */
export async function srsStats(userId) {
  const { data } = await supabase
    .from("srs_cards")
    .select("reps")
    .eq("user_id", userId);
  const total = data?.length || 0;
  const learned = data?.filter((c) => c.reps >= 1).length || 0;
  return { total, learned };
}

/** Devuelve un mapa { vocab_id: card } para una lista de ids (mazos bonus). */
export async function getCardsByIds(userId, ids) {
  if (!ids || !ids.length) return {};
  const { data } = await supabase
    .from("srs_cards")
    .select("*")
    .eq("user_id", userId)
    .in("vocab_id", ids);
  const map = {};
  (data || []).forEach((c) => { map[c.vocab_id] = c; });
  return map;
}
