/**
 * features/speaking.js — Practica de SPEAKING (pronunciacion) estilo Duolingo.
 *
 * A diferencia de la CONVERSACION con IA (charla libre), aqui el alumno LEE una
 * frase modelo, la ESCUCHA (voz real), y luego la DICE al microfono. Usamos el
 * reconocimiento de voz del navegador (mic.js, gratis) para transcribir lo que
 * dijo y lo comparamos con la frase objetivo -> puntaje de pronunciacion.
 *
 * Contenido: se arma de los EJEMPLOS del vocabulario de la unidad (frases reales
 * ya niveladas). DRY: no duplica datos, reutiliza lo que la unidad ya trae.
 */
import { el } from "../ui/dom.js";
import { normalize } from "../core/activities.js";
import { speak } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { speechSupported, createDictation } from "../ui/mic.js";
import { ICONS } from "../ui/icons.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { completeLesson } from "../services/course.js";

const PASS = 0.6; // proporcion de palabras acertadas para aprobar la frase

/**
 * Coach avanzado: marca palabra por palabra si se reconocio o no.
 * @returns {{score:number, marks:Array<{word:string, hit:boolean}>}}
 */
function scoreDetail(target, heard) {
  const wantRaw = String(target).split(/\s+/).filter(Boolean);
  const got = new Set(normalize(heard).split(" ").filter(Boolean));
  const marks = wantRaw.map((w) => ({ word: w, hit: got.has(normalize(w)) }));
  const norm = marks.filter((m) => normalize(m.word)); // ignora signos sueltos
  const hits = norm.filter((m) => m.hit).length;
  return { score: norm.length ? hits / norm.length : 0, marks };
}

/** Frases modelo de la unidad (ejemplos de vocab con texto en ingles). */
function phrasesOf(unit) {
  return (unit.vocab || [])
    .map((v) => v.example)
    .filter((t) => t && /[a-z]/i.test(t))
    .slice(0, 8);
}

/**
 * Abre la practica de speaking (pronunciacion) para una unidad.
 * @param {object} unit - { title, level, vocab }
 * @param {object} [opts] - { userId, progressId, onComplete } para GUARDAR que se
 *   completo la competencia Speaking de la unidad (y marcar su check). Opcional:
 *   desde el mapa o el modo supervivencia se abre sin persistir.
 */
export function openSpeaking(unit, opts = {}) {
  const { userId, progressId, onComplete } = opts;
  const phrases = phrasesOf(unit);
  const supported = speechSupported();
  let idx = 0;
  let passed = 0;
  let dictation = null;
  let listening = false;

  const close = () => { dictation?.abort(); cancelCloud(); overlay.remove(); };

  // --- Zona dinamica (una frase a la vez) ---------------------------------
  const stage = el("div", { class: "mt-4 flex-1 min-h-0 overflow-y-auto" });

  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-purple-400 to-fuchsia-500 h-2 rounded-full transition-all", style: "width:0%" }));
  const setProgress = () => {
    progress.firstChild.style.width = Math.round((idx / phrases.length) * 100) + "%";
  };

  function renderPhrase() {
    setProgress();
    if (idx >= phrases.length) return renderDone();
    const target = phrases[idx];

    const phraseText = el("p", { class: "text-xl font-semibold text-slate-100 leading-relaxed" }, target);
    const heardBox = el("p", { class: "mt-3 text-sm text-slate-400 min-h-[1.5rem]" }, "");
    const fb = el("div", { class: "mt-3" });

    const listenBtn = el("button", {
      type: "button",
      class: "inline-flex items-center gap-2 border border-white/15 bg-white/5 text-slate-200 px-4 py-2.5 " +
        "rounded-xl hover:bg-white/10 focus:outline focus:outline-2 focus:outline-fuchsia-400 transition",
      onclick: () => speak(target, "en-US", { rate: 0.9 }),
    }, el("span", { class: "w-5 h-5", html: ICONS.sound }), "Escuchar modelo");

    const micBtn = el("button", {
      type: "button",
      class: "inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white " +
        "font-semibold px-5 py-2.5 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-fuchsia-300 transition",
    }, el("span", { class: "w-5 h-5", html: ICONS.mic || ICONS.sound }), "Toca y habla");

    const nextBtn = el("button", {
      type: "button",
      class: "hidden mt-4 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold " +
        "px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => { idx++; renderPhrase(); },
    }, idx === phrases.length - 1 ? "Terminar" : "Siguiente frase ->");

    function grade(heard) {
      const { score: s, marks } = scoreDetail(target, heard);
      const ok = s >= PASS;
      if (ok) passed++;
      ok ? playCorrect() : playWrong();
      // Frase coloreada palabra por palabra (coach visual).
      const colored = el("p", { class: "mt-2 leading-relaxed" }, ...marks.map((m) => el("span", {
        class: (m.hit ? "text-emerald-300" : "text-amber-300 underline decoration-amber-400/70") + " mr-1",
      }, m.word + " ")));
      // Palabras a repasar (tocar = oir lento).
      const missed = marks.filter((m) => !m.hit && normalize(m.word));
      const drill = missed.length ? el("div", { class: "mt-2" },
        el("p", { class: "text-xs opacity-90" }, "Toca para o\u00edrlas lento:"),
        el("div", { class: "mt-1 flex flex-wrap gap-1.5" }, ...missed.slice(0, 6).map((m) => el("button", {
          type: "button",
          class: "text-xs px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-100 hover:bg-amber-500/30",
          onclick: () => speak(m.word, "en-US", { rate: 0.65 }),
        }, m.word)))) : null;
      fb.replaceChildren(el("div", {
        class: "rounded-xl px-4 py-3 text-sm " + (ok
          ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-200"
          : "bg-amber-500/15 border border-amber-500/40 text-amber-200"),
      },
        el("p", { class: "font-semibold" }, ok ? "\u00a1Muy bien! " + Math.round(s * 100) + "% de acierto" : "Casi... " + Math.round(s * 100) + "% de acierto"),
        colored,
        drill || el("p", { class: "mt-1 opacity-90" }, "Tu pronunciaci\u00f3n se entendi\u00f3 muy bien.")));
      nextBtn.classList.remove("hidden");
    }

    if (supported) {
      micBtn.onclick = () => {
        if (listening) { dictation?.stop(); return; }
        heardBox.textContent = "";
        dictation = createDictation({
          lang: "en-US",
          onStart: () => { listening = true; micBtn.classList.add("animate-pulse"); micBtn.lastChild.textContent = "Escuchando... (toca para parar)"; },
          onInterim: (t) => { heardBox.textContent = "\u201c" + t + "\u201d"; },
          onEnd: (finalText) => {
            listening = false; micBtn.classList.remove("animate-pulse"); micBtn.lastChild.textContent = "Toca y habla";
            if (finalText) { heardBox.textContent = "T\u00fa dijiste: \u201c" + finalText + "\u201d"; grade(finalText); }
            else heardBox.textContent = "No te escuche. Intenta de nuevo.";
          },
          onError: () => { listening = false; micBtn.classList.remove("animate-pulse"); micBtn.lastChild.textContent = "Toca y habla"; heardBox.textContent = "No pude usar el microfono (permiso denegado?)."; },
        });
        dictation.start();
      };
    }

    stage.replaceChildren(
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" }, "Frase " + (idx + 1) + " de " + phrases.length),
      el("div", { class: "mt-2 rounded-2xl bg-white/5 border border-white/10 p-4" }, phraseText, heardBox),
      el("div", { class: "mt-4 flex flex-wrap gap-2" }, listenBtn, ...(supported ? [micBtn] : [])),
      supported ? null : el("p", { class: "mt-3 text-sm text-amber-300" }, "Tu navegador no soporta microfono. Usa Chrome en PC o Android para practicar hablando. Igual puedes escuchar el modelo y repetir en voz alta."),
      fb, nextBtn);
    // Escucha el modelo automaticamente al mostrar la frase.
    setTimeout(() => speak(target, "en-US", { rate: 0.9 }), 300);
  }

  function renderDone() {
    progress.firstChild.style.width = "100%";
    const pct = Math.round((passed / Math.max(1, phrases.length)) * 100);
    // GUARDA que se completo la practica de Speaking de la unidad (upsert
    // idempotente). Terminar la practica basta para el check (el reconocimiento
    // de voz del navegador es exigente; no penalizamos al alumno por el mic).
    if (userId && progressId) {
      completeLesson(userId, progressId, pct).catch(() => {});
    }
    if (typeof onComplete === "function") onComplete(pct);
    stage.replaceChildren(el("div", { class: "text-center py-6" },
      el("div", { class: "text-5xl mb-2" }, pct >= 60 ? "\uD83C\uDF89" : "\uD83D\uDCAA"),
      el("h3", { class: "text-xl font-bold text-slate-100" }, "\u00a1Practica terminada!"),
      el("p", { class: "mt-2 text-slate-300" }, "Pronunciaste bien " + passed + " de " + phrases.length + " frases (" + pct + "%)."),
      el("button", {
        class: "mt-5 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110",
        onclick: () => { idx = 0; passed = 0; renderPhrase(); },
      }, "Practicar otra vez")));
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh] min-h-0",
    role: "dialog", "aria-label": "Practica de pronunciacion", "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-700 grid place-items-center text-white", html: ICONS.mic || ICONS.sound }),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-fuchsia-300" }, "Speaking \u00b7 " + (unit.title || "")),
        el("p", { class: "text-xs text-slate-400" }, "Escucha y repite \u00b7 nivel " + (unit.level || ""))),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    progress, stage);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);

  if (!phrases.length) {
    stage.replaceChildren(el("p", { class: "text-slate-400 py-6 text-center" }, "Esta unidad aun no tiene frases para practicar."));
  } else {
    renderPhrase();
  }
}
