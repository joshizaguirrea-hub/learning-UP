/**
 * ui/es-accents.js — Corrector de tildes para TTS en espanol.
 *
 * Todo el contenido del proyecto esta escrito SIN tildes (convencion ASCII).
 * La voz lee mal las palabras sin acento ("condicion" en vez de "condicion").
 * Este modulo re-acentua el texto JUSTO ANTES de hablar (no toca los datos).
 *
 * Regla de oro: SOLO palabras/paterns INEQUIVOCOS. Nunca tocar palabras
 * ambiguas (tu/tu, el/el, si/si, se/se, esta/esta, tomo/tomo...) para no
 * introducir errores. Ante la duda, se deja igual.
 */

// Mapa de palabras comunes (clave sin tilde -> con tilde). Inequivocas.
const MAP = {
  // Adverbios / conectores
  "tambien": "tambi\u00e9n", "ademas": "adem\u00e1s", "despues": "despu\u00e9s",
  "asi": "as\u00ed", "aqui": "aqu\u00ed", "ahi": "ah\u00ed", "alli": "all\u00ed",
  "aca": "ac\u00e1", "alla": "all\u00e1", "segun": "seg\u00fan", "quizas": "quiz\u00e1s",
  "mas": "m\u00e1s", "jamas": "jam\u00e1s", "atras": "atr\u00e1s", "detras": "detr\u00e1s",
  "through": "through",
  // Idiomas / nacionalidades
  "ingles": "ingl\u00e9s", "frances": "franc\u00e9s", "portugues": "portugu\u00e9s",
  "japones": "japon\u00e9s", "interes": "inter\u00e9s",
  // Sustantivos frecuentes
  "pais": "pa\u00eds", "paises": "pa\u00edses", "dia": "d\u00eda", "dias": "d\u00edas",
  "linea": "l\u00ednea", "lineas": "l\u00edneas", "area": "\u00e1rea", "areas": "\u00e1reas",
  "practica": "pr\u00e1ctica", "gramatica": "gram\u00e1tica", "musica": "m\u00fasica",
  "numero": "n\u00famero", "numeros": "n\u00fameros", "publico": "p\u00fablico",
  "titulo": "t\u00edtulo", "parrafo": "p\u00e1rrafo", "silaba": "s\u00edlaba",
  "oracion": "oraci\u00f3n", "pagina": "p\u00e1gina", "arbol": "\u00e1rbol",
  "cafe": "caf\u00e9", "menu": "men\u00fa", "adios": "adi\u00f3s", "telefono": "tel\u00e9fono",
  "musico": "m\u00fasico", "medico": "m\u00e9dico", "rapido": "r\u00e1pido",
  // Adjetivos frecuentes
  "basico": "b\u00e1sico", "facil": "f\u00e1cil", "dificil": "dif\u00edcil",
  "util": "\u00fatil", "comun": "com\u00fan", "unico": "\u00fanico", "ultimo": "\u00faltimo",
  "proximo": "pr\u00f3ximo", "comico": "c\u00f3mico", "logico": "l\u00f3gico",
  // Verbos: condicional (-ria) y otros inequivocos
  "seria": "ser\u00eda", "estaria": "estar\u00eda", "tendria": "tendr\u00eda",
  "habria": "habr\u00eda", "haria": "har\u00eda", "podria": "podr\u00eda",
  "deberia": "deber\u00eda", "gustaria": "gustar\u00eda", "querria": "querr\u00eda",
  "pasaria": "pasar\u00eda", "ocurriria": "ocurrir\u00eda", "iria": "ir\u00eda",
  "vendria": "vendr\u00eda", "pondria": "pondr\u00eda", "saldria": "saldr\u00eda",
  "diria": "dir\u00eda", "viajaria": "viajar\u00eda", "compraria": "comprar\u00eda",
  "dejaria": "dejar\u00eda", "viviria": "vivir\u00eda", "cumpliera": "cumpliera",
  "estan": "est\u00e1n", "estas": "est\u00e1s",
  // Interrogativos frecuentes (en esta app suelen ser preguntas)
  "por que": "por qu\u00e9", "porque": "porque",
};

// Patrones inequivocos (sufijos que casi siempre llevan tilde).
function bySuffix(w) {
  if (/cion$/.test(w)) return w.replace(/cion$/, "ci\u00f3n"); // condicion -> condicion
  if (/sion$/.test(w)) return w.replace(/sion$/, "si\u00f3n"); // version -> version
  if (/logia$/.test(w)) return w.replace(/logia$/, "log\u00eda"); // tecnologia
  if (/grafia$/.test(w)) return w.replace(/grafia$/, "graf\u00eda"); // geografia
  return null;
}

/** Copia el patron de mayus/minus de `src` sobre `dst` (solo 1a letra). */
function preserveCase(src, dst) {
  if (src[0] === src[0].toUpperCase() && src[0] !== src[0].toLowerCase()) {
    return dst[0].toUpperCase() + dst.slice(1);
  }
  return dst;
}

/** Re-acentua un texto en espanol para que la voz lo lea bien. */
export function fixSpanishAccents(text) {
  return String(text).replace(/[A-Za-z\u00C0-\u00FF]+/g, (w) => {
    const lower = w.toLowerCase();
    const fixed = MAP[lower] || bySuffix(lower);
    return fixed ? preserveCase(w, fixed) : w;
  });
}
