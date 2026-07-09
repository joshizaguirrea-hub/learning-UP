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

/** Guarda una tarjeta tras el repaso (valores ya calculados por core/srs.js). */
export async function saveCard(userId, vocabId, card) {
  const { error } = await supabase
    .from("srs_cards")
    .update({ ease: card.ease, interval: card.interval, reps: card.reps, due: card.due })
    .eq("user_id", userId)
    .eq("vocab_id", vocabId);
  return error ? { ok: false, error: error.message } : { ok: true };
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
