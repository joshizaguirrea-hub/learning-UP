/**
 * features/anti-errors.js — "Modo Anti-errores del hispanohablante".
 *
 * Practica enfocada en las trampas es->en (ver data/anti-errors.js). Bymax te
 * caza en TUS errores tipicos y te explica el porque. Este es el diferencial que
 * una app global no tiene. Reusa voz (speak), sonidos y Bymax vivo (bymaxEmote).
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { speak } from "../ui/speech.js";
import { robotAvatar } from "../ui/robot.js";
import { bymaxEmote } from "../ui/avatars.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { confettiBurst } from "../ui/confetti.js";
import { pickAntiErrors } from "../data/anti-errors.js";

export function openAntiErrors() {
  const items = pickAntiErrors(8);
  let idx = 0;
  let correct = 0;

  const close = () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); overlay.remove(); };

  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-rose-400 to-orange-500 h-2 rounded-full transition-all", style: "width:0%" }));
  const stage = el("div", { class: "mt-4" });

  function setProgress() { progress.firstChild.style.width = Math.round((idx / items.length) * 100) + "%"; }

  function renderItem() {
    setProgress();
    if (idx >= items.length) return renderDone();
    const it = items[idx];
    const fb = el("div", { class: "mt-4" });
    const nextBtn = el("button", {
      class: "hidden mt-4 w-full bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-rose-300",
      onclick: () => { idx++; renderItem(); },
    }, idx === items.length - 1 ? "Ver resultado" : "Siguiente \u2192");

    const optionBtns = [];
    it.options.forEach((opt, i) => {
      const btn = el("button", {
        type: "button",
        class: "w-full text-left p-4 rounded-xl border border-white/12 bg-white/5 text-slate-100 " +
          "hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-rose-400",
        onclick: () => choose(i),
      }, opt);
      optionBtns.push(btn);
    });

    function choose(i) {
      const ok = i === it.answer;
      if (ok) correct++;
      ok ? playCorrect() : playWrong();
      bymaxEmote(ok ? "happy" : "sad");
      optionBtns.forEach((b, bi) => {
        b.disabled = true;
        if (bi === it.answer) b.classList.add("border-emerald-400", "bg-emerald-500/20");
        else if (bi === i) b.classList.add("border-red-400", "bg-red-500/20");
        else b.classList.add("opacity-50");
      });
      // Pronuncia la forma CORRECTA (en ingles) para reforzar el oido.
      const rightText = it.options[it.answer];
      if (/[a-z]/i.test(rightText)) setTimeout(() => speak(rightText.replace(/[^a-zA-Z' ]/g, " "), "en-US", { rate: 0.95 }), 200);
      fb.replaceChildren(el("div", { class: "rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4 flex items-start gap-3" },
        robotAvatar("md"),
        el("div", {},
          el("p", { class: "font-bold " + (ok ? "text-emerald-300" : "text-amber-300") }, ok ? "\u00a1Correcto!" : "Ojo con esta trampa"),
          el("p", { class: "mt-1 text-sm text-slate-200" }, it.explain))));
      nextBtn.classList.remove("hidden");
    }

    stage.replaceChildren(
      el("div", { class: "flex items-center justify-between" },
        el("span", { class: "text-xs uppercase tracking-wide text-rose-300" }, it.cat),
        el("span", { class: "text-xs text-slate-500" }, (idx + 1) + " / " + items.length)),
      el("p", { class: "mt-2 text-lg font-semibold text-slate-100" }, it.prompt),
      el("div", { class: "mt-4 space-y-2" }, ...optionBtns),
      fb, nextBtn);
  }

  function renderDone() {
    progress.firstChild.style.width = "100%";
    const pct = Math.round((correct / items.length) * 100);
    if (pct >= 70) confettiBurst({ count: 120 });
    bymaxEmote("happy");
    stage.replaceChildren(el("div", { class: "text-center py-6" },
      el("div", { class: "flex justify-center mb-2" }, robotAvatar("lg")),
      el("h3", { class: "text-xl font-bold text-slate-100" }, "\u00a1Trampas superadas!"),
      el("p", { class: "mt-2 text-slate-300" }, "Esquivaste " + correct + " de " + items.length + " trampas (" + pct + "%)."),
      el("p", { class: "mt-1 text-sm text-slate-400" }, pct >= 70 ? "\u00a1Ya piensas m\u00e1s en ingl\u00e9s que en espa\u00f1ol!" : "Estas trampas enga\u00f1an a much\u00edsimos. Repite para dominarlas."),
      el("button", {
        class: "mt-5 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110",
        onclick: () => { idx = 0; correct = 0; renderItem(); },
      }, "Jugar otra vez")));
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh]",
    role: "dialog", "aria-label": "Modo anti-errores", "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-orange-600 grid place-items-center text-white", html: ICONS.bulb }),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-rose-300" }, "Modo Anti-errores"),
        el("p", { class: "text-xs text-slate-400" }, "Las trampas t\u00edpicas del espa\u00f1ol \u2192 ingl\u00e9s")),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    progress,
    el("div", { class: "mt-1 overflow-y-auto pr-1", style: "max-height:70vh" }, stage));

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);
  renderItem();
}
