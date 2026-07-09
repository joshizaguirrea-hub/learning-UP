/**
 * services/auth.js — Autenticacion (I/O con Supabase Auth).
 *
 * Capa de servicios: unico punto que habla con Supabase para auth.
 * Las features NO llaman a Supabase directamente; pasan por aqui.
 */
import { supabase } from "../config/supabase.js";
import { createProfile } from "./profiles.js";

/**
 * Registra un usuario nuevo y crea su perfil segun rol.
 * Politica de edad (ADR-004): exige confirmar mayoria de edad.
 * @returns {{ok: boolean, error?: string}}
 */
export async function register({ fullName, email, password, role, isAdult }) {
  if (!isAdult) {
    return { ok: false, error: "Debes confirmar que eres mayor de 18 anos." };
  }
  if (!["student", "teacher"].includes(role)) {
    return { ok: false, error: "Rol invalido." };
  }

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { ok: false, error: error.message };

  const userId = data.user?.id;
  if (!userId) {
    // Con confirmacion de email activada, el usuario puede quedar pendiente.
    return { ok: true, pendingConfirmation: true };
  }

  const profileResult = await createProfile({ userId, fullName, role });
  if (!profileResult.ok) return profileResult;

  return { ok: true };
}

/** Inicia sesion. */
export async function login({ email, password }) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: "Correo o contrasena incorrectos." };
  return { ok: true };
}

/** Cierra sesion. */
export async function logout() {
  await supabase.auth.signOut();
}

/** Actualiza el nombre visible del usuario (metadata de auth). */
export async function updateDisplayName(fullName) {
  const { error } = await supabase.auth.updateUser({ data: { full_name: fullName } });
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Devuelve el usuario autenticado actual (o null).
 *  Usa getSession() (lee la sesion persistida localmente): es instantaneo y
 *  confiable para guardias de ruta, a diferencia de getUser() que hace red. */
export async function currentUser() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
}

/** Suscribe a cambios de sesion (login/logout). Devuelve la subscripcion. */
export function onAuthChange(callback) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
}
