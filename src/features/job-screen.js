/**
 * features/job-screen.js — Pantalla "Prepara tu entrevista laboral" (#/trabajo).
 *
 * Segmento de preparacion laboral con identidad propia: el Coach de Habla
 * (simulacro de entrevista con IA, ya existente en #/coach) y el nuevo CV Coach
 * (arma tu CV en ingles con IA). Aqui es solo el hub del segmento.
 */
import { ICONS } from "../ui/icons.js";
import { el, mount } from "../ui/dom.js";
import { accentGrad } from "../ui/theme.js";
import { focusMainHeading } from "../ui/a11y.js";
import { backHome, screenHeader, hubCard } from "../ui/hub-ui.js";

// Los 10 modos del CV Coach (prompts guiados). Datos puros -> faciles de crecer.
export const CV_MODES = [
  { title: "Mejora tu resumen profesional", desc: "Reescribe tu summary para que sea conciso, atractivo y acorde al puesto." },
  { title: "Logros con metricas", desc: "Convierte responsabilidades genericas en logros medibles con verbos de accion y numeros." },
  { title: "Optimizar para ATS", desc: "Incluye palabras clave de la oferta de forma natural, legible para reclutadores." },
  { title: "Cambio de carrera", desc: "Resalta habilidades transferibles al pasar de un campo a otro." },
  { title: "Auditoria de CV", desc: "Detecta partes vagas, prolijas o sin impacto; mejora tono y estructura." },
  { title: "Formato moderno", desc: "Sugiere un diseno escaneable en 10 segundos que priorice lo reciente." },
  { title: "Alinear al puesto", desc: "Reestructura tu historial para que calce con las calificaciones que buscan." },
  { title: "Habilidades tecnicas", desc: "Arma la seccion de skills y herramientas que destaque para el reclutador." },
  { title: "Titular y subtitular", desc: "Un headline potente con tu propuesta de valor y que te hace destacar." },
  { title: "Actua como reclutador", desc: "Bymax revisa tu CV como hiring manager y te dice que cambiar para que te llamen." },
];

export async function renderJob(container) {
  mount(container, el("div", { class: "max-w-3xl mx-auto space-y-6" },
    backHome("text-emerald-300 hover:text-emerald-200"),
    screenHeader({
      icon: ICONS.briefcase, grad: "from-emerald-500 via-teal-600 to-teal-800",
      title: "Prepara tu entrevista laboral", subtitle: "Simulacro con IA y tu CV en ingles",
    }),
    el("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
      hubCard({
        href: "#/coach", grad: accentGrad("speak"), icon: ICONS.briefcase,
        title: "Coach de Habla", subtitle: "Simula la entrevista con IA y sube tu Speaking Score", badge: "TOP",
      }),
      hubCard({
        href: "#/cv", grad: accentGrad("story"), icon: ICONS.book,
        title: "CV Coach con IA", subtitle: "Resumen, logros con metricas, ATS... 10 modos", badge: "NUEVO",
      }))));
  focusMainHeading(container);
}

/** Pantalla del CV Coach: por ahora presenta los 10 modos (proximamente activos). */
export async function renderCvCoach(container) {
  const modes = CV_MODES.map((m, i) =>
    el("div", { class: "rounded-2xl bg-slate-900 border border-slate-800 p-4 flex gap-3" },
      el("span", { class: "w-8 h-8 shrink-0 grid place-items-center rounded-full bg-indigo-500/20 text-indigo-300 font-black" }, String(i + 1)),
      el("div", {},
        el("p", { class: "font-bold text-slate-100" }, m.title),
        el("p", { class: "text-sm text-slate-400 mt-0.5" }, m.desc))));

  mount(container, el("div", { class: "max-w-3xl mx-auto space-y-6" },
    backHome("text-fuchsia-300 hover:text-fuchsia-200"),
    screenHeader({
      icon: ICONS.book, grad: accentGrad("story"),
      title: "CV Coach con IA", subtitle: "Arma tu CV en ingles para la entrevista",
    }),
    el("div", { class: "rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4" },
      el("p", { class: "text-amber-200 text-sm" },
        "Proximamente: pega tu CV o describe tu experiencia y Bymax lo pule con IA. Estos son los 10 modos que tendras:")),
    el("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-3" }, ...modes)));
  focusMainHeading(container);
}
