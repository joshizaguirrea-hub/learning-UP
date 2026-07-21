/**
 * core/interview-log.js — Memoria del ENTRENADOR de entrevistas.
 *
 * Guarda cada entrevista (fecha, puesto, empresa, puntaje, mejoras y frases
 * modelo) y la "proxima cita" de entrenamiento. Con esto Bymax deja de ser solo
 * un reclutador de una sola vez: recuerda tus debilidades, mide tu progreso y te
 * agenda la siguiente sesion, como un coach personal.
 *
 * Persistencia simple en localStorage por usuario (sin backend para arrancar).
 */

const KEY = (userId) => `linguapath.interviews.${userId || "anon"}`;
const MAX_SESSIONS = 20;

/** Lee el log del usuario. Nunca lanza. */
export function getInterviewLog(userId) {
  const base = { sessions: [], nextAt: null };
  try {
    const raw = localStorage.getItem(KEY(userId));
    if (!raw) return base;
    return { ...base, ...JSON.parse(raw) };
  } catch {
    return base;
  }
}

function save(userId, log) {
  try { localStorage.setItem(KEY(userId), JSON.stringify(log)); }
  catch { /* sin storage: seguimos igual */ }
  return log;
}

/**
 * Registra una entrevista terminada.
 * @param {string} userId
 * @param {object} s - { role, company, seniority, score, improvements, tip }
 * @returns {{log, prev}} log actualizado y la sesion ANTERIOR (para comparar).
 */
export function recordInterview(userId, s) {
  const log = getInterviewLog(userId);
  const prev = log.sessions[0] || null; // la mas reciente antes de esta
  const entry = {
    at: new Date().toISOString(),
    role: s.role || "",
    company: s.company || "",
    seniority: s.seniority || "",
    score: Math.max(0, Math.min(100, Math.round(Number(s.score) || 0))),
    improvements: s.improvements || "",
    tip: s.tip || "",
  };
  log.sessions.unshift(entry); // mas reciente primero
  if (log.sessions.length > MAX_SESSIONS) log.sessions.length = MAX_SESSIONS;
  save(userId, log);
  return { log, prev };
}

/** Agenda la proxima cita de entrenamiento (ISO). */
export function setNextAppointment(userId, iso) {
  const log = getInterviewLog(userId);
  log.nextAt = iso;
  return save(userId, log);
}

/** Borra la proxima cita (ya cumplida o cancelada). */
export function clearNextAppointment(userId) {
  const log = getInterviewLog(userId);
  log.nextAt = null;
  return save(userId, log);
}

/** Texto de las areas de mejora de la ultima entrevista (para que el coach las retome). */
export function lastImprovements(userId) {
  const log = getInterviewLog(userId);
  return (log.sessions[0] && log.sessions[0].improvements) || "";
}

/**
 * Genera un archivo .ics (calendario) para la cita y dispara su descarga.
 * Universal: sirve para Google Calendar, Outlook, Apple Calendar, etc.
 */
export function downloadIcs({ startIso, title, description }) {
  const dt = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const start = dt(startIso);
  const end = dt(new Date(new Date(startIso).getTime() + 30 * 60000).toISOString());
  const uid = "int-" + Date.now() + "@learning-up";
  const esc = (t) => String(t || "").replace(/[,;\\]/g, (m) => "\\" + m).replace(/\n/g, "\\n");
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Learning UP//Coach//ES",
    "BEGIN:VEVENT", "UID:" + uid, "DTSTAMP:" + dt(new Date().toISOString()),
    "DTSTART:" + start, "DTEND:" + end,
    "SUMMARY:" + esc(title),
    "DESCRIPTION:" + esc(description),
    "BEGIN:VALARM", "TRIGGER:-PT30M", "ACTION:DISPLAY",
    "DESCRIPTION:" + esc(title), "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "entrevista-coach.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
