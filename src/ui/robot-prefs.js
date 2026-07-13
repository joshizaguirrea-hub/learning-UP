/**
 * ui/robot-prefs.js — Preferencias del "Profe Robo" (nombre + avatar).
 *
 * Se guarda en localStorage (offline, sin migracion de base de datos). El alumno
 * elige el avatar y le pone nombre; se usa en todas las clases.
 */
const KEY = "linguapath.robot";
const DEFAULT = { name: "Profe Robo", avatar: "beep" };

/** Config actual del robot (con valores por defecto). */
export function getRobot() {
  try {
    return { ...DEFAULT, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return { ...DEFAULT };
  }
}

/** Guarda (fusiona) la config del robot. Devuelve la config resultante. */
export function setRobot(cfg) {
  const merged = { ...getRobot(), ...cfg };
  try { localStorage.setItem(KEY, JSON.stringify(merged)); } catch { /* ignore */ }
  return merged;
}

/** True si el alumno ya configuro su robot alguna vez. */
export function isRobotConfigured() {
  return !!localStorage.getItem(KEY);
}
