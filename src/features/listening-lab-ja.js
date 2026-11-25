/**
 * features/listening-lab-ja.js — "Escucha" ESCALONADA para japones.
 *
 * Reemplaza, SOLO para japones, el Listening generico (features/listening-lab.js
 * -- historia de IA + 8 preguntas) como primer contacto: aqui se entrena oido
 * con vocabulario YA visto (ver core/listening-ja.js), en vez de examinar con
 * material nuevo que nadie puede entender todavia. La historia con IA sigue
 * disponible como reto OPCIONAL al final ("Reto avanzado").
 */
import { el, replaceKids } from "../ui/dom.js";
import { speakButton, speakMono } from "../ui/speech.js";
import { ICONS } from "../ui/icons.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { teacherFace } from "../ui/bymax-mascot.js";
import { robotName } from "../ui/robot.js";
import { completeLesson } from "../services/course.js";
import { lessonForSkill } from "./skill-class.js";
import { buildJaListeningLadder, scorePct } from "../core/listening-ja.js";
import { openListeningLab } from "./listening-lab.js";

const OK_CLS = "border-emerald-400 bg-emerald-500/25 text-emerald-100";
const BAD_CLS = "border-rose-400 bg-rose-500/25 text-rose-100";

/**
 * Abre el Listening escalonado de una unidad japonesa.
 * @param {object} unit - { title, level, vocab, lessons }
 * @param {object} [opts] - { userId, onComplete }
 */
export function openJaListeningLab(unit, opts = {}) {
  const { userId, onComplete } = opts;
  const lesson = lessonForSkill(unit, "listening");
  const name = robotName();

  const deck = buildJaListeningLadder(unit);
  let idx = 0;
  let correct = 0;

  const close = () => overlay.remove();
  const stage = el("div", { class: "mt-4" });
  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-sky-400 to-cyan-500 h-2 rounded-full transition-all", style: "width:0%" }));
  const setBar = (pct) => { progress.firstChild.style.width = pct + "%"; };

  function renderIntro() {
    setBar(0);
    replaceKids(stage,
      el("div", { class: "text-center py-6" },
        el("div", { class: "w-20 mx-auto" }, teacherFace("md")),
        el("h3", { class: "text-lg font-bold text-slate-100 mt-3" }, "Entrena tu o\u00eddo"),
        el("p", { class: "mt-2 text-sm text-slate-300 max-w-sm mx-auto" },
          "Vas a escuchar palabras y frases que ya viste en el Vocabulario de esta unidad. " +
          "Nada nuevo -- solo entrenamos reconocerlas por o\u00eddo."),
        el("button", {
          type: "button",
          class: "mt-5 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-cyan-300",
          onclick: () => { idx = 0; correct = 0; renderQuestion(); },
        }, "Empezar \u2192")));
  }

  function renderQuestion() {
    if (idx >= deck.length) return renderDone();
    setBar(Math.round((idx / deck.length) * 100));
    const q = deck[idx];
    let selected = null;
    let done = false;
    const fb = el("div");

    const btns = q.options.map((opt) => {
      const b = el("button", {
        type: "button",
        class: "block w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-200 " +
          "mt-2 hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-cyan-400",
        onclick: () => {
          if (done) return;
          selected = opt;
          btns.forEach((x) => x.classList.remove("border-cyan-400", "bg-cyan-500/25"));
          b.classList.add("border-cyan-400", "bg-cyan-500/25");
        },
      }, opt.text);
      b._opt = opt;
      return b;
    });

    const checkBtn = el("button", {
      type: "button",
      class: "mt-4 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-5 py-3 " +
        "rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-300",
      onclick: () => {
        if (done || !selected) return;
        done = true;
        const ok = !!selected.correct;
        if (ok) { correct++; playCorrect(); } else playWrong();
        btns.forEach((b) => {
          if (b._opt.correct) b.className += " " + OK_CLS;
          else if (b._opt === selected) b.className += " " + BAD_CLS;
          b.disabled = true;
        });
        fb.replaceChildren(el("p", { class: "mt-3 text-sm font-semibold " + (ok ? "text-emerald-300" : "text-amber-300") },
          ok ? "\u2714 \u00a1Correcto!" : "\u2717 Era: " + q.options.find((o) => o.correct).text));
        nextBtn.disabled = false;
      },
    }, "Comprobar");

    const nextBtn = el("button", {
      type: "button", disabled: true,
      class: "mt-2 w-full border border-white/15 bg-white/5 text-slate-200 font-semibold px-5 py-3 " +
        "rounded-xl hover:bg-white/10 disabled:opacity-40 focus:outline focus:outline-2 focus:outline-cyan-300",
      onclick: () => { idx++; renderQuestion(); },
    }, idx === deck.length - 1 ? "Ver resultado" : "Siguiente \u2192");

    replaceKids(stage,
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" },
        "Pregunta " + (idx + 1) + " de " + deck.length),
      el("div", { class: "mt-2 rounded-2xl bg-white/5 border border-white/10 p-4 text-center" },
        el("p", { class: "text-sm text-slate-300" }, q.prompt),
        el("div", { class: "mt-2 flex justify-center" }, speakButton(q.say, { lang: "ja" }))),
      el("div", { class: "mt-3" }, ...btns),
      fb, checkBtn, nextBtn);

    setTimeout(() => speakMono(q.say, "ja"), 350); // arranca el audio solo
  }

  async function renderDone() {
    setBar(100);
    const pct = scorePct(correct, deck.length);
    if (userId && lesson?.id) completeLesson(userId, lesson.id, pct).catch(() => {});
    if (typeof onComplete === "function") onComplete(pct);

    replaceKids(stage,
      el("div", { class: "text-center py-4" },
        el("div", { class: "w-20 mx-auto" }, teacherFace("lg")),
        el("h3", { class: "text-xl font-bold text-slate-100 mt-2" },
          pct >= 60 ? "\u00a1Buen o\u00eddo!" : "Sigue practicando"),
        el("p", { class: "mt-2 text-slate-300" }, "Acertaste " + correct + " de " + deck.length + " (" + pct + "%)."),
        el("div", { class: "mt-5 flex flex-col gap-2" },
          el("button", {
            class: "bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110",
            onclick: () => { idx = 0; correct = 0; renderQuestion(); },
          }, "Practicar otra vez"),
          el("button", {
            class: "border border-violet-400/40 bg-violet-500/10 text-violet-200 font-semibold px-6 py-3 rounded-xl hover:bg-violet-500/20",
            onclick: () => { close(); openListeningLab(unit, opts); },
          }, "Reto avanzado: historia con IA \u2192"),
          el("button", {
            class: "text-sm text-slate-400 hover:text-slate-200 underline",
            onclick: close,
          }, "Cerrar"))));
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl " +
      "max-h-[92dvh] overflow-y-auto",
    role: "dialog", "aria-label": "Escucha con " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center justify-between" },
      el("p", { class: "font-bold text-sky-300" }, "Escucha \u00b7 " + (unit.title || "")),
      el("button", {
        class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg",
        "aria-label": "Cerrar", onclick: close,
      }, "\u2715")),
    progress, stage);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);
  document.body.append(overlay);

  if (!deck.length) {
    replaceKids(stage, el("p", { class: "text-slate-400 py-6 text-center" },
      "Esta unidad a\u00fan no tiene suficiente vocabulario para practicar el o\u00eddo."));
  } else {
    renderIntro();
  }
}
