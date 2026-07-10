/**
 * data/bonus-decks.js — Mazos "Bonus" de conocimiento para memorizar.
 *
 * Datos PUROS. Cada mazo es una coleccion tematica (verbos irregulares, pasados
 * regulares, expresiones de tiempo...) con su MEDALLA. Se estudian como
 * flashcards y reutilizan el motor SRS (los ids llevan prefijo 'bv-'/'br-'/'bt-'
 * para no chocar con el vocabulario de las unidades).
 *
 * item: { id, front (ingles), back (respuesta), example }
 */

export const BONUS_DECKS = [
  {
    id: "irregular-verbs",
    title: "Verbos irregulares",
    subtitle: "Base - pasado - participio",
    gradient: "from-indigo-500 to-blue-600",
    medalTitle: "Maestro de irregulares",
    medalDesc: "Dominaste los verbos irregulares clave",
    items: [
      { id: "bv-go", front: "go", back: "went / gone", example: "Yesterday I went to work." },
      { id: "bv-eat", front: "eat", back: "ate / eaten", example: "She ate breakfast early." },
      { id: "bv-see", front: "see", back: "saw / seen", example: "I saw a great movie." },
      { id: "bv-come", front: "come", back: "came / come", example: "He came home late." },
      { id: "bv-take", front: "take", back: "took / taken", example: "We took the bus." },
      { id: "bv-make", front: "make", back: "made / made", example: "They made a cake." },
      { id: "bv-know", front: "know", back: "knew / known", example: "I knew the answer." },
      { id: "bv-get", front: "get", back: "got / gotten", example: "She got a new job." },
      { id: "bv-give", front: "give", back: "gave / given", example: "He gave me a gift." },
      { id: "bv-find", front: "find", back: "found / found", example: "I found my keys." },
      { id: "bv-think", front: "think", back: "thought / thought", example: "I thought about it." },
      { id: "bv-tell", front: "tell", back: "told / told", example: "She told the truth." },
      { id: "bv-buy", front: "buy", back: "bought / bought", example: "We bought tickets." },
      { id: "bv-bring", front: "bring", back: "brought / brought", example: "He brought food." },
      { id: "bv-write", front: "write", back: "wrote / written", example: "I wrote an email." },
      { id: "bv-read", front: "read", back: "read / read", example: "She read the book." },
      { id: "bv-run", front: "run", back: "ran / run", example: "They ran fast." },
      { id: "bv-speak", front: "speak", back: "spoke / spoken", example: "He spoke slowly." },
      { id: "bv-drink", front: "drink", back: "drank / drunk", example: "I drank water." },
      { id: "bv-become", front: "become", back: "became / become", example: "She became a doctor." },
    ],
  },
  {
    id: "regular-past",
    title: "Pasado regular (-ed)",
    subtitle: "Verbos regulares en pasado",
    gradient: "from-emerald-500 to-teal-600",
    medalTitle: "Rey del -ed",
    medalDesc: "Dominaste el pasado de verbos regulares",
    items: [
      { id: "br-work", front: "work", back: "worked", example: "I worked late yesterday." },
      { id: "br-play", front: "play", back: "played", example: "She played tennis." },
      { id: "br-study", front: "study", back: "studied", example: "He studied all night." },
      { id: "br-watch", front: "watch", back: "watched", example: "We watched a movie." },
      { id: "br-live", front: "live", back: "lived", example: "They lived in Peru." },
      { id: "br-travel", front: "travel", back: "traveled", example: "I traveled last month." },
      { id: "br-cook", front: "cook", back: "cooked", example: "She cooked dinner." },
      { id: "br-call", front: "call", back: "called", example: "He called me." },
      { id: "br-want", front: "want", back: "wanted", example: "I wanted to help." },
      { id: "br-start", front: "start", back: "started", example: "The class started at 9." },
      { id: "br-finish", front: "finish", back: "finished", example: "We finished the task." },
      { id: "br-stop", front: "stop", back: "stopped", example: "The bus stopped here." },
    ],
  },
  {
    id: "past-time",
    title: "Expresiones de tiempo (pasado)",
    subtitle: "Cuando paso algo",
    gradient: "from-amber-500 to-orange-600",
    medalTitle: "Viajero del tiempo",
    medalDesc: "Dominaste las expresiones de tiempo pasado",
    items: [
      { id: "bt-yesterday", front: "yesterday", back: "ayer", example: "I saw him yesterday." },
      { id: "bt-lastnight", front: "last night", back: "anoche", example: "We studied last night." },
      { id: "bt-lastweek", front: "last week", back: "la semana pasada", example: "She left last week." },
      { id: "bt-lastyear", front: "last year", back: "el ano pasado", example: "I traveled last year." },
      { id: "bt-ago", front: "two days ago", back: "hace dos dias", example: "He called two days ago." },
      { id: "bt-thismorning", front: "this morning", back: "esta manana", example: "I ran this morning." },
      { id: "bt-lastweekend", front: "last weekend", back: "el fin de semana pasado", example: "We relaxed last weekend." },
      { id: "bt-anhourago", front: "an hour ago", back: "hace una hora", example: "She arrived an hour ago." },
      { id: "bt-theotherday", front: "the other day", back: "el otro dia", example: "I met her the other day." },
      { id: "bt-in2010", front: "in 2010", back: "en 2010", example: "They married in 2010." },
    ],
  },
];

/** Devuelve un mazo por id (o null). */
export function bonusDeckById(id) {
  return BONUS_DECKS.find((d) => d.id === id) || null;
}
