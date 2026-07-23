/**
 * features/job-screen.js — Pantalla "Prepara tu entrevista laboral" (#/trabajo).
 *
 * Hub del segmento laboral: el Coach de Habla (simulacro de entrevista con IA,
 * en #/coach) y el CV Coach con IA (#/cv, ver features/cv-coach.js).
 */
import { ICONS } from "../ui/icons.js";
import { el, mount } from "../ui/dom.js";
import { accentGrad } from "../ui/theme.js";
import { focusMainHeading } from "../ui/a11y.js";
import { backHome, screenHeader, hubCard } from "../ui/hub-ui.js";

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
