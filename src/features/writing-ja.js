/**
 * features/writing-ja.js — "Escritura" para JAPONES: puente al Laboratorio de
 * Hiragana en vez del hub generico de ensayos libres (features/writing.js).
 *
 * POR QUE (pedido directo de Joshua, mismo ADR-008 -- "sigue el mismo
 * formato" que los demas idiomas): el hub generico de Writing asume que el
 * alumno YA puede TECLEAR el idioma meta letra por letra (fill-in-blanks,
 * ensayos, correos, reordenar oraciones...) -- perfecto para ingles/
 * portugues/italiano/frances, absurdo para japones si el alumno ni siquiera
 * puede LEER kana todavia (y casi nadie tiene teclado japones a mano).
 *
 * "Escribir japones de verdad" empieza por aprender el SISTEMA de escritura,
 * que ya vive en su propio segmento independiente (features/kana-lab.js,
 * ruta /escritura). Este POP es un puente corto: explica el por que y manda
 * directo al Laboratorio -- NUNCA el mismo menu de ensayos que los demas
 * idiomas.
 *
 * Marca la leccion de Writing de ESTA unidad como completa al entrar: la
 * maestria REAL de kana se mide aparte, en el SRS propio del Laboratorio
 * (services/srs.js, independiente del avance por unidades) -- no tiene
 * sentido bloquear el boletin de la unidad esperando que el alumno domine
 * todo el silabario primero.
 */
import { el } from "../ui/dom.js";
import { teacherFace } from "../ui/bymax-mascot.js";
import { robotName } from "../ui/robot.js";
import { completeLesson } from "../services/course.js";
import { lessonForSkill } from "./skill-class.js";
import { go } from "../ui/router.js";

/**
 * Abre el puente de Escritura japonesa para una unidad.
 * @param {object} unit - unidad { title, lessons }
 * @param {object} [opts] - { userId, onComplete }
 */
export function openJaWriting(unit, opts = {}) {
  const name = robotName();
  const lesson = lessonForSkill(unit, "writing");
  const close = () => overlay.remove();

  const goToLab = () => {
    if (lesson?.id && opts.userId) completeLesson(opts.userId, lesson.id, 100).catch(() => {});
    if (typeof opts.onComplete === "function") opts.onComplete();
    close();
    go("/escritura");
  };

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl",
    role: "dialog", "aria-label": "Escritura japonesa", "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-12 shrink-0" }, teacherFace("sm")),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-rose-300" }, "Escritura \u00b7 " + (unit.title || "")),
        el("p", { class: "text-xs text-slate-400" }, "El japones se escribe muy distinto")),
      el("button", {
        class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg",
        "aria-label": "Cerrar", onclick: close,
      }, "\u2715")),
    el("div", { class: "mt-4 space-y-3" },
      el("p", { class: "text-sm text-slate-300 leading-relaxed" },
        "Para escribir japon\u00e9s de verdad primero hay que conocer el ",
        el("b", { class: "text-slate-100" }, "kana"),
        " (hiragana/katakana): no se teclea letra por letra como el espa\u00f1ol, " +
        "y casi nadie tiene un teclado japon\u00e9s a la mano."),
      el("p", { class: "text-sm text-slate-300 leading-relaxed" },
        "Por eso " + name + " te manda directo al ",
        el("b", { class: "text-rose-300" }, "Laboratorio de Hiragana"),
        ": ah\u00ed aprendes a reconocer cada car\u00e1cter a tu propio ritmo, " +
        "independiente del avance de esta unidad."),
      el("button", {
        type: "button",
        class: "mt-2 w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold px-5 py-3 " +
          "rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-rose-400",
        onclick: goToLab,
      }, "Ir al Laboratorio de Hiragana \u2192")));

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);
}
