/**
 * features/feedback-practice.js — Practica desde TUS errores reales del feedback.
 *
 * A diferencia del "Modo Anti-errores" (dataset fijo), esto toma los errores que
 * el profe detecto en ESTA sesion (core/feedback.js -> parsed.errors: {wrong,
 * right, why}) y te hace corregirlos tu mismo: ves lo que dijiste mal, escribes
 * la forma correcta, y Bymax te la confirma, la pronuncia y explica el porque.
 * Cierra el ciclo: detectar -> entender -> PRACTICAR.
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { speak } from "../ui/speech.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { confettiBurst } from "../ui/confetti.js";

/** Normaliza para comparar con tolerancia (minusculas, sin puntuacion, 1 espacio). */
function norm(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9' ]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Abre la practica de errores en un overlay.
 * @param {Array<{wrong,right,why}>} errors
 */
export function openErrorPractice(errors) {
  const items = (errors || []).filter((e) => e && e.wrong && e.right);
  let idx = 0, correct = 0;

  const close = () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); overlay.remove(); };

  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-rose-400 to-orange-500 h-2 rounded-full transition-all", style: "width:0%" }));
  const stage = el("div", { class: "mt-4" });

  function renderItem() {
    progress.firstChild.style.width = Math.round((idx / items.length) * 100) + "%";
    if (idx >= items.length) return renderDone();
    const it = items[idx];
    let done = false;

    const input = el("input", {
      type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false",
      placeholder: "Escribe la forma correcta en ingl\u00e9s...",
      class: "w-full rounded-xl bg-slate-800 border border-slate-600 text-slate-100 px-4 py-3 " +
        "focus:outline focus:outline-2 focus:outline-rose-400",
      onkeydown: (e) => { if (e.key === "Enter") check(); },
    });
    const fb = el("div", { class: "mt-3" });
    const actions = el("div", { class: "mt-4 flex gap-2" });

    const checkBtn = el("button", {
      type: "button",
      class: "flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-rose-300",
      onclick: () => check(),
    }, "Comprobar");
    const revealBtn = el("button", {
      type: "button",
      class: "px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 focus:outline focus:outline-2 focus:outline-white",
      onclick: () => reveal(false),
    }, "Ver respuesta");
    actions.append(checkBtn, revealBtn);

    function nextControl() {
      return el("button", {
        type: "button",
        class: "mt-4 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-rose-300",
        onclick: () => { idx++; renderItem(); },
      }, idx === items.length - 1 ? "Ver resultado" : "Siguiente \u2192");
    }

    function settle(ok) {
      done = true;
      input.disabled = true;
      actions.replaceChildren();
      // Pronuncia la forma correcta (refuerza el oido).
      setTimeout(() => speak(it.right.replace(/[^a-zA-Z' ]/g, " "), "en-US", { rate: 0.95 }), 150);
      fb.replaceChildren(
        el("div", { class: "rounded-xl border p-4 " + (ok ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10") },
          el("p", { class: "font-bold " + (ok ? "text-emerald-300" : "text-amber-300") }, ok ? "\u2714 \u00a1Correcto!" : "As\u00ed se dice bien:"),
          el("p", { class: "mt-2 text-sm text-slate-300" },
            el("span", { class: "line-through text-rose-400" }, it.wrong),
            el("span", { class: "mx-2 text-slate-500" }, "\u2192"),
            el("span", { class: "text-emerald-300 font-semibold" }, it.right)),
          it.why ? el("p", { class: "mt-2 text-xs text-slate-400" }, "\uD83D\uDCA1 " + it.why) : null),
        nextControl());
    }
    function check() {
      if (done) return;
      const ok = norm(input.value) === norm(it.right);
      if (ok) { correct++; playCorrect(); } else playWrong();
      settle(ok);
    }
    function reveal() { if (!done) { playWrong(); settle(false); } }

    stage.replaceChildren(
      el("div", { class: "flex items-center justify-between" },
        el("span", { class: "text-xs uppercase tracking-wide text-rose-300" }, "Corrige tu error"),
        el("span", { class: "text-xs text-slate-500" }, (idx + 1) + " / " + items.length)),
      el("p", { class: "mt-2 text-sm text-slate-400" }, "Dijiste:"),
      el("p", { class: "mt-1 text-lg font-semibold text-rose-300 line-through" }, it.wrong),
      el("p", { class: "mt-3 text-sm text-slate-300" }, "\u00bfC\u00f3mo se dice correctamente?"),
      el("div", { class: "mt-2" }, input),
      actions, fb);
    setTimeout(() => input.focus(), 50);
  }

  function renderDone() {
    progress.firstChild.style.width = "100%";
    const pct = items.length ? Math.round((correct / items.length) * 100) : 0;
    if (pct >= 70) confettiBurst({ count: 120 });
    stage.replaceChildren(el("div", { class: "text-center py-6" },
      el("div", { class: "text-5xl", "aria-hidden": "true" }, pct >= 70 ? "\uD83C\uDF89" : "\uD83D\uDCAA"),
      el("h3", { class: "text-xl font-bold text-slate-100 mt-2" }, "\u00a1Errores practicados!"),
      el("p", { class: "mt-2 text-slate-300" }, "Corregiste " + correct + " de " + items.length + " (" + pct + "%)."),
      el("p", { class: "mt-1 text-sm text-slate-400" }, pct >= 70 ? "\u00a1As\u00ed se aprende de verdad!" : "Rep\u00edtelo hasta que te salga solo."),
      el("button", {
        type: "button",
        class: "mt-5 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110",
        onclick: () => { idx = 0; correct = 0; renderItem(); },
      }, "Practicar otra vez")));
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh]",
    role: "dialog", "aria-label": "Practicar mis errores", "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-orange-600 grid place-items-center text-white", html: ICONS.bulb }),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-rose-300" }, "Practica tus errores"),
        el("p", { class: "text-xs text-slate-400" }, "Corrige lo que dijiste mal en esta sesi\u00f3n")),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    progress,
    el("div", { class: "mt-1 overflow-y-auto pr-1", style: "max-height:70vh" }, stage));

  const overlay = el("div", {
    class: "fixed inset-0 z-[60] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);
  if (!items.length) {
    stage.replaceChildren(el("p", { class: "text-sm text-slate-300 py-6 text-center" },
      "No hubo errores puntuales que practicar esta vez. \u00a1Bien ah\u00ed!"));
    return;
  }
  renderItem();
}
