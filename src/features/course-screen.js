/**
 * features/course-screen.js — Pantalla exclusiva "Tu curso" (#/curso).
 *
 * El corazon de la app en su propio espacio: mosaico de unidades del nivel +
 * los BONOS del curso (verbos, vocabulario). Antes los bonos vivian sueltos en
 * el inicio; ahora pertenecen aqui, donde el estudiante estudia. Mas orden.
 */
import { getStudentProfile } from "../services/profiles.js";
import { getCourseProgress } from "../services/course.js";
import { unitsForLevel } from "../data/units/index.js";
import { ICONS } from "../ui/icons.js";
import { el, mount } from "../ui/dom.js";
import { accentGrad } from "../ui/theme.js";
import { focusMainHeading } from "../ui/a11y.js";
import { backHome, screenHeader } from "../ui/hub-ui.js";
import { courseCards } from "./course-cards.js";

export async function renderCourse(container, user) {
  const profile = await getStudentProfile(user.id);
  if (!profile || !profile.placement_done) {
    mount(container, el("div", { class: "max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center" },
      backHome(),
      el("p", { class: "mt-3 text-slate-300" }, "Primero haz tu examen de ubicacion para desbloquear el curso.")));
    focusMainHeading(container);
    return;
  }

  const progressMap = await getCourseProgress(user.id);
  const units = unitsForLevel(profile.cefr_level);

  mount(container, el("div", { class: "max-w-4xl mx-auto space-y-6" },
    backHome(),
    screenHeader({
      icon: ICONS.book, grad: accentGrad("brand"),
      title: "Tu curso", subtitle: `${profile.cefr_level} - ${units.length} temas`,
    }),
    courseCards(units, progressMap),
    bonusCard()));
  focusMainHeading(container);
}

/** Acceso a los bonos DENTRO del curso (verbos, vocabulario, medallas). */
function bonusCard() {
  return el("a", {
    href: "#/bonus",
    class: "group relative block overflow-hidden rounded-2xl shadow-lg " +
      "transition duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline focus:outline-2 focus:outline-white/70",
    "aria-label": "Bonos del curso",
  },
    el("div", { class: `absolute inset-0 bg-gradient-to-r ${accentGrad("reward")}`, "aria-hidden": "true" }),
    el("div", { class: "card-sheen absolute inset-0", "aria-hidden": "true" }),
    el("div", { class: "absolute inset-0 bg-gradient-to-t from-black/30 to-transparent", "aria-hidden": "true" }),
    el("div", { class: "relative flex items-center gap-4 p-5" },
      el("span", { class: "w-11 h-11 rounded-xl bg-white/20 backdrop-blur grid place-items-center text-white shrink-0", html: ICONS.star }),
      el("div", { class: "flex-1 min-w-0" },
        el("p", { class: "font-bold text-white text-lg leading-tight drop-shadow" }, "Bonos del curso"),
        el("p", { class: "text-white/90 text-sm" }, "Verbos irregulares, vocabulario y medallas de tu nivel")),
      el("span", { class: "text-white font-semibold text-sm shrink-0" }, "Ir \u2192")));
}
