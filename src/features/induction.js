/**
 * features/induction.js - Induccion de entrada: "que incluye Learning UP".
 *
 * POR QUE EXISTE Y EN QUE SE DIFERENCIA DE welcome-guide.js
 * -----------------------------------------------------------
 * welcome-guide.js (#/guia) explica la MECANICA de una unidad (fases, % para
 * aprobar) y se muestra DESPUES del examen de ubicacion, cuando el alumno ya
 * tiene un plan. Esta pantalla es ANTERIOR: explica el CATALOGO completo del
 * producto -- de que va Learning UP antes de pedirle que haga el examen. Sin
 * esto, un alumno nuevo solo ve "clases" y nunca se entera de que tambien
 * incluye entrenador de entrevistas y reestructuracion de CV hasta que
 * tropieza con el menu "Mas".
 *
 * REGLA DE LA CASA: nada se promete de memoria. Cada pilar de abajo apunta a
 * un archivo real:
 *   - Clases por nivel / 6 competencias -> data/skill-meta.js (SKILL_META)
 *   - Tutor de IA del curso             -> ui/robot-prefs.js (role "course")
 *   - Profesores humanos (marketplace)  -> features/teachers.js (comingSoon)
 *   - Entrenamiento de entrevistas      -> features/interview.js (#/coach)
 *   - CV Coach / reestructuracion       -> features/cv-coach.js (#/cv)
 * tools/check_induction.py falla si alguno de estos deja de ser cierto.
 *
 * SE MUESTRA UNA SOLA VEZ (tras registrarte, antes del examen) y se puede
 * reabrir desde "Mas". Mismo patron que welcome-guide.js: ver-una-vez +
 * reabrir a peticion, nunca forzado en cada visita.
 */
import { el, mount } from "../ui/dom.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { ICONS } from "../ui/icons.js";
import { skillLabel, SKILL_META } from "../data/skill-meta.js";
import { getTeacherName } from "../ui/robot-prefs.js";

const SEEN_KEY = "lup.induction.seen";

/** True si el alumno ya vio la induccion de entrada alguna vez. */
export function hasSeenInduction() {
  return localStorage.getItem(SEEN_KEY) === "1";
}

/** Marca la induccion como vista (o la reabre si se pasa false). */
export function setInductionSeen(on = true) {
  if (on) localStorage.setItem(SEEN_KEY, "1");
  else localStorage.removeItem(SEEN_KEY);
}

function badge(text, cls) {
  return el("span", {
    class: "text-[10px] font-black tracking-widest px-2 py-1 rounded-full " + cls,
  }, text);
}

/** Tarjeta de un pilar del producto: icono + titulo + texto + badge opcional. */
function pilar({ icon, grad, title, text, badge: b }) {
  return el("div", { class: "flex gap-4 rounded-2xl bg-slate-900/70 border border-slate-800 p-4" },
    el("span", {
      class: "shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br " + grad +
        " grid place-items-center text-white",
      html: icon,
    }),
    el("div", { class: "min-w-0" },
      el("div", { class: "flex items-center gap-2 flex-wrap" },
        el("p", { class: "font-bold text-slate-100" }, title),
        b || null),
      el("p", { class: "text-sm text-slate-400 mt-0.5" }, text)));
}

// Las 6 competencias reales que trae cada curso (misma fuente que el
// dashboard y que welcome-guide.js: data/skill-meta.js). Si manana se agrega
// o quita una competencia, esta lista cambia sola.
function competenciasTexto() {
  return Object.keys(SKILL_META).map((k) => skillLabel(k, "es")).join(", ");
}

/**
 * Pinta la induccion de entrada.
 * @param {HTMLElement} container
 * @param {Function} onContinue - a donde seguir (examen de ubicacion o inicio)
 */
export function renderInduction(container, onContinue) {
  const courseName = getTeacherName("course");
  const interviewName = getTeacherName("interview");

  const vista = el("div", { class: "max-w-2xl mx-auto" },
    el("div", { class: "bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-7" },
      el("p", { class: "text-xs uppercase tracking-wide text-indigo-400" },
        "Bienvenido a Learning UP"),
      el("h1", { class: "text-2xl font-extrabold text-white mt-1" },
        "Esto es lo que incluye tu curso"),
      el("p", { class: "text-slate-400 mt-2 text-sm" },
        "Dos minutos de lectura antes de tu examen de ubicacion. Podras volver " +
        "a abrir esto cuando quieras desde \u201cMas\u201d."),

      el("div", { class: "mt-6 space-y-3" },
        pilar({
          icon: ICONS.book, grad: "from-sky-500 to-blue-600",
          title: "1. Clases por nivel, de verdad estructuradas",
          text: "Unidades organizadas por el estandar internacional MCER " +
            "(A1 a C2 en ingles) que trabajan " + competenciasTexto() +
            ". Cada unidad va de entender a producir, y termina con un examen.",
        }),
        pilar({
          icon: ICONS.chat, grad: "from-violet-500 to-purple-600",
          title: "2. " + courseName + ", tu tutor de IA",
          text: courseName + " te acompana en las lecciones, resuelve tus dudas " +
            "y corrige tu escritura y tu habla. Disponible mientras estudias, " +
            "no solo en horario de clase.",
        }),
        pilar({
          icon: ICONS.teachers, grad: "from-slate-500 to-slate-700",
          title: "3. Profesores humanos 1 a 1",
          badge: badge("MUY PRONTO", "bg-amber-500/20 text-amber-300 border border-amber-500/30"),
          text: "Marketplace de profesores verificados que retoman tu plan " +
            "exactamente donde lo dejaste. Lo estamos terminando: por ahora " +
            "aprendes con el curso y la IA.",
        }),
        pilar({
          icon: ICONS.briefcase, grad: "from-emerald-500 to-teal-600",
          title: "4. Entrenamiento de entrevistas laborales",
          badge: badge("ESTRELLA", "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"),
          text: interviewName + " hace de reclutador y te entrevista en ingles " +
            "para el puesto real al que aspiras: empresa, seniority y hasta " +
            "preguntas trampa. Al terminar te da feedback, un Speaking Score " +
            "y puedes agendar tu proxima practica.",
        }),
        pilar({
          icon: ICONS.download, grad: "from-fuchsia-500 to-pink-600",
          title: "5. Reestructuracion de tu CV con IA",
          text: "Sube tu CV, dinos el puesto y las skills que piden: te " +
            "devolvemos un CV completo en ingles, optimizado para los " +
            "filtros ATS. Tambien puedes pulir una parte a la vez (resumen, " +
            "logros con metricas, formato...). Es efimero: no se guarda en " +
            "tu cuenta.",
        })),

      el("p", { class: "mt-6 text-xs text-slate-500" },
        "Lo que sigue ahora: un examen corto para ubicar tu nivel y armar tu " +
        "plan de estudio."),

      el("button", {
        class: "mt-5 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 " +
          "text-white font-bold transition focus:outline focus:outline-2 " +
          "focus:outline-indigo-400",
        onclick: () => { setInductionSeen(true); onContinue(); },
      }, "Entendido, vamos a mi examen de ubicacion")));

  mount(container, vista);
  focusMainHeading(container);
  announce("Induccion de entrada: que incluye Learning UP.");
}
