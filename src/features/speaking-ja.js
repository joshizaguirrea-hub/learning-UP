/**
 * features/speaking-ja.js — "Habla" ESCALONADA para japones.
 *
 * Reemplaza, SOLO para japones, el Speaking generico (features/speaking.js)
 * como primer contacto: en vez de repetir oraciones completas desde la frase
 * 1, calienta con PALABRAS sueltas ya conocidas (Nivel 1) antes de pasar a
 * frases completas (Nivel 2) -- Audio-Lingual Method clasico, de lo minimo a
 * lo completo. Romaji grande (se lee de inmediato), kana chiquito de
 * referencia, significado SIEMPRE visible. Calificacion por similitud de
 * caracteres (core/speaking-ja.js: scoreJaSpeech), no por palabras separadas
 * por espacio -- eso no aplica al japones.
 */
import { el, replaceKids } from "../ui/dom.js";
import { speakMono, speakRobot } from "../ui/speech.js";
import { unitTts, unitMic } from "../data/languages.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { speechSupported, createDictation } from "../ui/mic.js";
import { ICONS } from "../ui/icons.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { completeLesson } from "../services/course.js";
import { robotName } from "../ui/robot.js";
import { buildJaSpeakingDeck, scoreJaSpeech } from "../core/speaking-ja.js";

const LEVEL_LABEL = { 1: "Palabra suelta", 2: "Frase completa" };

/**
 * Abre la practica de Habla escalonada de una unidad japonesa.
 * @param {object} unit - { title, level, vocab }
 * @param {object} [opts] - { userId, progressId, onComplete }
 */
export function openJaSpeaking(unit, opts = {}) {
  const { userId, progressId, onComplete } = opts;
  const tts = unitTts(unit); // "ja"
  const mic = unitMic(unit); // "ja-JP"
  const deck = buildJaSpeakingDeck(unit);
  const supported = speechSupported();
  const name = robotName();
  let idx = 0;
  let passed = 0;
  let dictation = null;
  let listening = false;

  const close = () => { dictation?.abort(); cancelCloud(); overlay.remove(); };
  const stage = el("div", { class: "mt-4 flex-1 min-h-0 overflow-y-auto" });
  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-purple-400 to-fuchsia-500 h-2 rounded-full transition-all", style: "width:0%" }));
  const setProgress = () => { progress.firstChild.style.width = Math.round((idx / deck.length) * 100) + "%"; };

  function renderItem() {
    setProgress();
    if (idx >= deck.length) return renderDone();
    const item = deck[idx];

    const heardBox = el("p", { class: "mt-3 text-sm text-slate-400 min-h-[1.5rem]" }, "");
    const fb = el("div", { class: "mt-3" });

    const listenBtn = el("button", {
      type: "button",
      class: "inline-flex items-center gap-2 border border-white/15 bg-white/5 text-slate-200 px-4 py-2.5 " +
        "rounded-xl hover:bg-white/10 focus:outline focus:outline-2 focus:outline-fuchsia-400 transition",
      onclick: () => speakMono(item.kana, tts),
    }, el("span", { class: "w-5 h-5", html: ICONS.sound }), "Escuchar a " + name);

    const micBtn = el("button", {
      type: "button",
      class: "inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white " +
        "font-semibold px-5 py-2.5 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-fuchsia-300 transition",
    }, el("span", { class: "w-5 h-5", html: ICONS.mic || ICONS.sound }), "Toca y habla");

    const goodBtn = el("button", {
      type: "button",
      class: "inline-flex items-center gap-2 border border-emerald-500/40 bg-emerald-500/10 text-emerald-200 " +
        "px-4 py-2.5 rounded-xl hover:bg-emerald-500/20 focus:outline focus:outline-2 focus:outline-emerald-300",
      onclick: () => {
        passed++;
        playCorrect();
        speakRobot("\u00a1Muy bien!", "es-MX");
        fb.replaceChildren(okBox("\u00a1Bien hecho! Sigue con la siguiente."));
        goodBtn.disabled = true;
        nextBtn.classList.remove("hidden");
      },
    }, el("span", { class: "w-5 h-5", html: ICONS.check }), "La dije bien");

    const nextBtn = el("button", {
      type: "button",
      class: "hidden mt-4 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold " +
        "px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => { idx++; renderItem(); },
    }, idx === deck.length - 1 ? "Terminar" : "Siguiente \u2192");

    function okBox(msg) {
      return el("div", { class: "rounded-xl px-4 py-3 text-sm bg-emerald-500/15 border border-emerald-500/40 text-emerald-200" },
        el("p", { class: "font-semibold" }, msg));
    }

    function grade(heard) {
      const { score, ok } = scoreJaSpeech(item.kana, heard);
      if (ok) passed++;
      ok ? playCorrect() : playWrong();
      fb.replaceChildren(el("div", {
        class: "rounded-xl px-4 py-3 text-sm " + (ok
          ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-200"
          : "bg-amber-500/15 border border-amber-500/40 text-amber-200"),
      },
        el("p", { class: "font-semibold" },
          (ok ? "\u00a1Muy bien! " : "Casi... ") + Math.round(score * 100) + "% de parecido"),
        !ok ? el("p", { class: "mt-1" }, "Escucha de nuevo e intenta otra vez.") : null));
      nextBtn.classList.remove("hidden");
    }

    if (supported) {
      micBtn.onclick = () => {
        if (listening) { dictation?.stop(); return; }
        cancelCloud();
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
        heardBox.textContent = "";
        dictation = createDictation({
          lang: mic,
          onStart: () => { listening = true; micBtn.classList.add("animate-pulse"); micBtn.lastChild.textContent = "Escuchando... (toca para parar)"; },
          onInterim: (t) => { heardBox.textContent = "\u201c" + t + "\u201d"; },
          onEnd: (finalText) => {
            listening = false; micBtn.classList.remove("animate-pulse"); micBtn.lastChild.textContent = "Toca y habla";
            if (finalText) { heardBox.textContent = "T\u00fa dijiste: \u201c" + finalText + "\u201d"; grade(finalText); }
            else heardBox.textContent = "No te escuch\u00e9. Intenta de nuevo.";
          },
          onError: () => { listening = false; micBtn.classList.remove("animate-pulse"); micBtn.lastChild.textContent = "Toca y habla"; heardBox.textContent = "No pude usar el micr\u00f3fono (\u00bfpermiso denegado?)."; },
        });
        dictation.start();
      };
    }

    replaceKids(stage,
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" },
        (idx + 1) + " de " + deck.length + " \u00b7 " + LEVEL_LABEL[item.level]),
      el("div", { class: "mt-2 rounded-2xl bg-white/5 border border-white/10 p-4" },
        el("p", { class: "text-2xl font-bold text-slate-100 leading-snug" }, item.romaji),
        el("p", { class: "text-xs text-slate-500 mt-1" }, item.kana),
        el("p", { class: "mt-2 text-sm text-emerald-300" }, item.translation ? item.translation : item.hint),
        el("p", { class: "mt-2 text-sm text-slate-400" },
          "Escucha a " + name + ", toca \"Toca y habla\" y dila. Te califica la pronunciaci\u00f3n."),
        heardBox),
      el("div", { class: "mt-4 flex flex-wrap gap-2" }, listenBtn, ...(supported ? [micBtn] : []), goodBtn),
      supported ? null : el("p", { class: "mt-3 text-xs text-amber-300" },
        "Tu navegador no soporta micr\u00f3fono. Usa Chrome (PC/Android) para que te califique al hablar."),
      fb, nextBtn);

    setTimeout(() => speakMono(item.kana, tts), 300);
  }

  async function renderDone() {
    progress.firstChild.style.width = "100%";
    const pct = Math.round((passed / Math.max(1, deck.length)) * 100);
    if (userId && progressId) completeLesson(userId, progressId, pct).catch(() => {});
    if (typeof onComplete === "function") onComplete(pct);

    stage.replaceChildren(el("div", { class: "text-center py-6" },
      el("div", { class: "text-5xl mb-2" }, pct >= 60 ? "\uD83C\uDF89" : "\uD83D\uDCAA"),
      el("h3", { class: "text-xl font-bold text-slate-100" }, "\u00a1Pr\u00e1ctica terminada!"),
      el("p", { class: "mt-2 text-slate-300" }, "Pronunciaste bien " + passed + " de " + deck.length + " (" + pct + "%)."),
      el("button", {
        class: "mt-5 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110",
        onclick: () => { idx = 0; passed = 0; renderItem(); },
      }, "Practicar otra vez")));
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92dvh] min-h-0",
    role: "dialog", "aria-label": "Habla con " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-700 grid place-items-center text-white", html: ICONS.mic || ICONS.sound }),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-fuchsia-300" }, "Habla \u00b7 " + (unit.title || "")),
        el("p", { class: "text-xs text-slate-400" }, "De palabras sueltas a frases \u00b7 nivel " + (unit.level || ""))),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    progress, stage);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);

  if (!deck.length) {
    stage.replaceChildren(el("p", { class: "text-slate-400 py-6 text-center" }, "Esta unidad a\u00fan no tiene vocabulario para practicar."));
  } else {
    renderItem();
  }
}
