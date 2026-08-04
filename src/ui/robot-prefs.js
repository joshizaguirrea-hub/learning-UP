/**
 * ui/robot-prefs.js — Preferencias de los "Teachers IA" (nombre + avatar).
 *
 * FUENTE UNICA DE VERDAD de los nombres de los profes IA. Hay TRES teachers,
 * uno por contexto, y cada alumno puede renombrarlos en Ajustes:
 *   - course    -> "Teacher Horus"  (da las clases y las pistas de los cursos)
 *   - speaking  -> "Teacher Jack"   (Speaking: la "Llamada" por voz manos libres)
 *   - interview -> "Teacher Lucien" (reclutador del simulador de entrevistas)
 *
 * Se guarda en localStorage (offline, sin migracion de BD). El teacher de CURSO
 * comparte el objeto historico `linguapath.robot` (nombre + avatar) por
 * compatibilidad; los otros dos viven en `linguapath.teachers`.
 */
const KEY = "linguapath.robot";        // teacher de CURSO (nombre + avatar) - historico
const TKEY = "linguapath.teachers";    // nombres de speaking + interview

/** Metadatos de los tres teachers (defaults + textos para Ajustes). */
export const TEACHER_ROLES = [
  { id: "course", defaultName: "Teacher Horus", label: "Cursos", desc: "Te da las clases y las pistas." },
  { id: "speaking", defaultName: "Teacher Jack", label: "Speaking (Llamada)", desc: "Tu profe para hablar por voz." },
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

// --- Profe 3D (avatar humano) -----------------------------------------------
// El alumno puede cambiar la "cara" del profe: el robot Bymax (default) o un
// humano 3D cartoon (Ready Player Me). Se guarda aparte para no tocar el objeto
// historico. { mode:"robot"|"human", gender:"F"|"M", url:"<glb>" }.
const T3DKEY = "linguapath.teacher3d";
const DEFAULT_3D = { mode: "robot", gender: "F", url: "", hairColor: null };

/** Config del profe 3D (con defaults). mode "robot" = Bymax de siempre. */
export function getTeacher3d() {
  try {
    return { ...DEFAULT_3D, ...JSON.parse(localStorage.getItem(T3DKEY) || "{}") };
  } catch {
    return { ...DEFAULT_3D };
  }
}

/** Guarda (fusiona) la config del profe 3D. Devuelve la config resultante. */
export function setTeacher3d(cfg) {
  const merged = { ...getTeacher3d(), ...cfg };
  try { localStorage.setItem(T3DKEY, JSON.stringify(merged)); } catch { /* ignore */ }
  return merged;
}

/** Lee el mapa {speaking, interview} de nombres personalizados. */
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
