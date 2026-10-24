/**
 * features/vocab-help.js — POP "Palabras que puedes usar" dentro de una clase.
 *
 * El problema que resuelve: en un idioma nuevo (fr/it/pt) la profe pide producir
 * una frase y el alumno se atora porque NO CONOCE LA PALABRA, no porque falle la
 * gramatica. Pedir ayuda por chat funciona, pero rompe el ritmo y obliga a
 * confesar que no sabes. Esto lo pone a la vista ANTES de atorarse.
 *
 * Pedagogia: es un andamio (scaffolding), no una chuleta. Muestra el vocabulario
 * que la unidad YA presento -- nada nuevo -- con su traduccion y su audio. Si la
 * palabra que busca no esta, el boton del diccionario la cubre.
 *
 * Capa de feature: solo presentacion. No habla con el Worker ni guarda estado.
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { speakButton } from "../ui/speech.js";
import { prefetchCloud, cloudTtsEnabled } from "../ui/cloud-tts.js";
import { micCode } from "../data/languages.js";
import { openDictionary } from "./dictionary.js";

/**
 * Abre el panel de vocabulario de apoyo.
 * @param {object[]} vocab - items { term, translation, example } de la unidad
 * @param {string} lang - codigo ISO del idioma meta (fr, it, pt...)
 * @param {string} [unitTitle] - titulo de la unidad, para dar contexto
 */
export function openVocabHelp(vocab, lang, unitTitle) {
  const items = (vocab || []).filter((v) => v && v.term);
  const voz = micCode(lang);

  // PRECARGA. En idiomas que no son es/en la voz viene de la nube: la primera
  // vez hay que pedirle el mp3 al Worker y eso tarda. Como el alumno abre el
  // panel ANTES de tocar ningun altavoz, aprovechamos esos segundos para bajar
  // el audio en segundo plano. Cuando toque, ya esta en cache y suena al vuelo.
  // De dos en dos para no abrir 12 peticiones de golpe. Silencioso: si falla,
  // el boton lo pide igual (y ahora muestra su spinner).
  //
  // La clave de cache tiene que ser IDENTICA a la que usa speakButton (misma
  // base de idioma, mismo rate 0.95) o la precarga no sirve de nada.
  const base = String(lang || "en").slice(0, 2).toLowerCase();
  if (cloudTtsEnabled() && items.length) {
    (async () => {
      for (let i = 0; i < items.length; i += 2) {
        await Promise.all(items.slice(i, i + 2)
          .map((v) => prefetchCloud(v.term, base, { rate: 0.95 })));
      }
    })();
  }

  const fila = (v) => el("li", {
    class: "flex items-center gap-2 py-2 border-b border-slate-800 last:border-0",
  },
    el("div", { class: "flex-1 min-w-0" },
      el("p", { class: "font-semibold text-indigo-300 truncate" }, v.term),
      el("p", { class: "text-xs text-slate-400 truncate" }, v.translation || ""),
      v.example
        ? el("p", { class: "text-xs text-slate-500 italic truncate mt-0.5" }, v.example)
        : null),
    speakButton(v.term, { lang: voz, cls: "w-8 h-8 shrink-0" }));

  const lista = items.length
    ? el("ul", { class: "mt-2" }, ...items.map(fila))
    : el("p", { class: "mt-3 text-sm text-slate-400" },
        "Esta unidad todavia no tiene glosario. Usa el diccionario.");

  const cerrar = () => overlay.remove();

  const panel = el("div", {
    class: "max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl " +
      "flex flex-col max-h-[85dvh]",
    role: "dialog", "aria-modal": "true", "aria-label": "Palabras que puedes usar",
    onclick: (e) => e.stopPropagation(),
  },
    el("div", { class: "flex items-start gap-3" },
      el("div", { class: "flex-1" },
        el("h2", { class: "font-bold text-lg text-slate-100" }, "Palabras que puedes usar"),
        el("p", { class: "text-xs text-slate-400 mt-0.5" },
          unitTitle ? "De la unidad \"" + unitTitle + "\". Toca el altavoz para oirlas."
                    : "Toca el altavoz para oirlas.")),
      el("button", {
        type: "button",
        class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 " +
          "hover:bg-white/10 text-lg focus:outline focus:outline-2 focus:outline-indigo-400",
        "aria-label": "Cerrar", onclick: cerrar,
      }, "\u2715")),

    el("div", { class: "mt-2 flex-1 min-h-0 overflow-y-auto pr-1" }, lista),

    // Salida para lo que el glosario no cubre: el alumno no se queda atascado.
    el("button", {
      type: "button",
      class: "mt-3 w-full inline-flex items-center justify-center gap-2 text-sm rounded-xl " +
        "border border-indigo-500/40 bg-indigo-500/10 text-indigo-200 px-3 py-2.5 " +
        "hover:bg-indigo-500/20 focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => { cerrar(); openDictionary("", lang); },
    }, el("span", { class: "w-4 h-4", html: ICONS.book }), "Buscar otra palabra"));

  const overlay = el("div", {
    class: "fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm grid place-items-center p-4",
    onclick: cerrar,
  }, panel);

  document.addEventListener("keydown", function esc(e) {
    if (e.key === "Escape") { cerrar(); document.removeEventListener("keydown", esc); }
  });

  document.body.append(overlay);
}
