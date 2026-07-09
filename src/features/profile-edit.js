/**
 * features/profile-edit.js — Edicion de bio, identidad y metas del estudiante.
 */
import { getStudentProfile, updateStudentProfile } from "../services/profiles.js";
import { MOTIVATIONS } from "../data/motivations.js";
import { CEFR_ORDER } from "../data/cefr.js";
import { el, mount } from "../ui/dom.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const PANEL = "bg-slate-900 border border-slate-800 rounded-2xl p-6";
const INPUT = "w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 " +
  "focus:outline focus:outline-2 focus:outline-indigo-500";
const PRIMARY = "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-5 py-2.5 rounded-lg " +
  "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400";
const LEVELS = CEFR_ORDER.filter((l) => l !== "Native" && l !== "A1"); // metas realistas

export async function renderProfileEdit(container, user) {
  const profile = (await getStudentProfile(user.id)) || {};

  const bio = el("textarea", { class: INPUT, rows: "3", "aria-label": "Bio" }, profile.bio || "");
  const nativeLang = el("input", { class: INPUT, type: "text", value: profile.native_language || "", "aria-label": "Idioma nativo" });
  const country = el("input", { class: INPUT, type: "text", value: profile.country || "", "aria-label": "Pais" });

  let reason = profile.goal_reason || "";
  const reasonBtns = MOTIVATIONS.map((m) => {
    const b = el("button", { type: "button",
      class: chipCls(m.id === reason),
      onclick: () => { reason = m.id; refreshReasons(); } }, `${m.emoji} ${m.label}`);
    b.dataset.id = m.id;
    return b;
  });
  const reasonWrap = el("div", { class: "mt-2 flex flex-wrap gap-2" }, ...reasonBtns);
  function refreshReasons() {
    reasonBtns.forEach((b) => { b.className = chipCls(b.dataset.id === reason); });
  }

  const dailyGoal = el("select", { class: INPUT, "aria-label": "Meta diaria" },
    ...[1, 2, 3, 5].map((n) => el("option", { value: String(n), selected: (profile.daily_goal || 1) === n ? "selected" : null }, `${n} leccion(es) / dia`)));

  const targetLevel = el("select", { class: INPUT, "aria-label": "Nivel objetivo" },
    el("option", { value: "" }, "Sin definir"),
    ...LEVELS.map((l) => el("option", { value: l, selected: profile.target_level === l ? "selected" : null }, l)));

  const msg = el("div", { class: "text-sm mt-2" });

  const save = el("button", { class: "mt-6 " + PRIMARY, onclick: async () => {
    const r = await updateStudentProfile(user.id, {
      bio: bio.value.trim() || null,
      native_language: nativeLang.value.trim() || null,
      country: country.value.trim() || null,
      goal_reason: reason || null,
      daily_goal: Number(dailyGoal.value) || 1,
      target_level: targetLevel.value || null,
    });
    if (r.ok) { announce("Perfil guardado."); go("/perfil"); }
    else mount(msg, el("span", { role: "alert", class: "text-amber-400" }, r.error));
  } }, "Guardar cambios");

  mount(container, el("div", { class: "max-w-xl mx-auto" },
    el("a", { href: "#/perfil", class: "text-sm text-indigo-400 hover:text-indigo-300" }, "< Volver al perfil"),
    el("h1", { class: "text-2xl font-bold mt-2 mb-4" }, "Editar perfil"),

    el("section", { class: PANEL },
      el("h2", { class: "font-bold" }, "Sobre ti"),
      field("Bio", bio),
      field("Idioma nativo", nativeLang),
      field("Pais", country)),

    el("section", { class: PANEL + " mt-6" },
      el("h2", { class: "font-bold" }, "Mis metas"),
      el("label", { class: "block text-sm text-slate-400 mt-4 mb-1" }, "Aprendo para..."),
      reasonWrap,
      field("Meta diaria", dailyGoal),
      field("Nivel objetivo", targetLevel)),

    save, msg));
  focusMainHeading(container);
}

function field(label, node) {
  return el("div", { class: "mt-4" },
    el("label", { class: "block text-sm text-slate-400 mb-1" }, label), node);
}
function chipCls(active) {
  return "text-sm px-3 py-1.5 rounded-full border " +
    (active ? "bg-indigo-500/30 border-indigo-400 text-indigo-100"
            : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700");
}
