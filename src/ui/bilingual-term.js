/**
 * ui/bilingual-term.js — Presentacion ROMAJI-primero para contenido japones.
 *
 * Pedido de Joshua: en las clases de Habla/Vocabulario, el japones debe salir
 * "Kare wa gakusei desu" (romaji grande, lo que se lee y pronuncia de
 * inmediato) en vez de forzar al alumno a decodificar kana antes de poder
 * hablar. El kana original queda CHIQUITO al lado (referencia pasiva: el ojo
 * se va acostumbrando sin que haga falta leerlo para avanzar). Aprender a
 * LEER/ESCRIBIR kana de verdad vive en su propio segmento (features/kana-lab.js).
 *
 * DISEÑO: una sola funcion generica (`termDisplay`/`speakSource`) que los
 * componentes ya existentes (grammar-sidebar, example-card, vocab-class...)
 * llaman pasando `lang`. Para cualquier idioma que NO sea japones, o para
 * texto japones sin romaji entre parentesis, el comportamiento es IDENTICO
 * al de antes (richText/stripMarkup) -- cero riesgo de regresion en los
 * demas idiomas.
 */
import { el } from "./dom.js";
import { richText, stripMarkup } from "./richtext.js";
import { splitJa, jaSpeakText } from "../core/ja-script.js";

/** Nodo romaji-primero + kana secundario para un texto japones con parentesis. */
function jaNode(text, size, secondarySize) {
  const { jp, romaji } = splitJa(text);
  if (!romaji) return el("span", {}, richText(jp));
  return el("span", { class: "inline-flex flex-wrap items-baseline gap-x-1.5" },
    el("span", { class: size }, richText(romaji)),
    el("span", { class: secondarySize || "text-slate-400 text-[0.7em]" }, jp));
}

/**
 * Nodo listo para pintar: para japones separa romaji (grande)/kana (chico);
 * para los demas idiomas es exactamente `richText(text)` de siempre.
 * @param {string} text
 * @param {string} lang - codigo del idioma META ("ja" activa el modo bilingue)
 * @param {{size?: string, secondarySize?: string}} [opts] - clases de tamano
 *   (default: el romaji hereda el tamano del contenedor; el kana queda a 0.7em
 *   de ESE tamano -- en titulos gigantes conviene pasar `secondarySize` fijo,
 *   ver vocab-class.js, para que el kana si se vea "chiquito al lado" de verdad)
 */
export function termDisplay(text, lang, opts = {}) {
  if (lang !== "ja") return el("span", {}, richText(text));
  return jaNode(text, opts.size || "", opts.secondarySize);
}

/**
 * Texto seguro para pasarle a speakButton/speakMono: en japones SOLO el kana
 * (nunca el romaji -- evita que la voz japonesa intente leer letras latinas
 * pegadas al kana, bug real que sonaba duplicado/raro). Los demas idiomas
 * quedan igual que antes (stripMarkup).
 */
export function speakSource(text, lang) {
  return lang === "ja" ? stripMarkup(jaSpeakText(text)) : stripMarkup(text);
}
