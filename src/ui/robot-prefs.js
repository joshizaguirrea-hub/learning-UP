/**
 * ui/robot-prefs.js — Preferencias de los "Teachers IA" (nombre + avatar).
 *
 * FUENTE UNICA DE VERDAD de los nombres de los profes IA. Hay TRES teachers,
 * uno por contexto, y cada alumno puede renombrarlos en Ajustes:
 *   - course    -> "Teacher Horus"  (da las clases y las pistas de los cursos)
 *   - chat      -> "Teacher Jack"   (companero para HABLAR con la IA)
 *   - interview -> "Teacher Lucien" (reclutador del simulador de entrevistas)
 *
 * Se guarda en localStorage (offline, sin migracion de BD). El teacher de CURSO
 * comparte el objeto historico `linguapath.robot` (nombre + avatar) por
 * compatibilidad; los otros dos viven en `linguapath.teachers`.
 */
const KEY = "linguapath.robot";        // teacher de CURSO (nombre + avatar) - historico
const TKEY = "linguapath.teachers";    // nombres de chat + interview

/** Metadatos de los tres teachers (defaults + textos para Ajustes). */
export const TEACHER_ROLES = [
  { id: "course", defaultName: "Teacher Horus", label: "Cursos", desc: "Te da las clases y las pistas." },
  { id: "chat", defaultName: "Teacher Jack", label: "Hablar con la IA", desc: "Tu companero de conversacion." },
  { id: "interview", defaultName: "Teacher Lucien", label: "Entrevistas", desc: "Tu reclutador de practica." },
];

const DEFAULT_NAME = (role) =>
  (TEACHER_ROLES.find((r) => r.id === role) || TEACHER_ROLES[0]).defaultName;

const DEFAULT = { name: DEFAULT_NAME("course"), avatar: "beep" };

/** Config actual del teacher de CURSO (nombre + avatar), con valores por defecto. */
export function getRobot() {
  try {
    return { ...DEFAULT, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return { ...DEFAULT };
  }
}

/** Guarda (fusiona) la config del teacher de curso. Devuelve la config resultante. */
export function setRobot(cfg) {
  const merged = { ...getRobot(), ...cfg };
  try { localStorage.setItem(KEY, JSON.stringify(merged)); } catch { /* ignore */ }
  return merged;
}

/** True si el alumno ya configuro su teacher de curso alguna vez. */
export function isRobotConfigured() {
  return !!localStorage.getItem(KEY);
}

/** Lee el mapa {chat, interview} de nombres personalizados (chat/interview). */
function readTeachers() {
  try { return JSON.parse(localStorage.getItem(TKEY) || "{}"); } catch { return {}; }
}

/**
 * Nombre del teacher para un contexto ("course" | "chat" | "interview").
 * Devuelve el nombre personalizado o el default estandar del rol.
 */
export function getTeacherName(role) {
  if (role === "course") return getRobot().name || DEFAULT_NAME("course");
  const custom = readTeachers()[role];
  return (custom && custom.trim()) || DEFAULT_NAME(role);
}

/** Renombra un teacher. Nombre vacio -> vuelve al default del rol. */
export function setTeacherName(role, name) {
  const clean = (name || "").trim();
  if (role === "course") { setRobot({ name: clean || DEFAULT_NAME("course") }); return; }
  const all = readTeachers();
  if (clean) all[role] = clean; else delete all[role];
  try { localStorage.setItem(TKEY, JSON.stringify(all)); } catch { /* ignore */ }
}
