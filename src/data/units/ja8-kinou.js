/**
 * data/units/ja8-kinou.js — Unidad A1 japones "きのう (Kinou)" -- introduccion
 * al pasado: でした (pasado de です) y ました (pasado de -ます).
 */

export const JA8_KINOU = {
  id: "ja8-kinou",
  language: "ja",
  level: "A1",
  title: "\u304d\u306e\u3046 (Kin\u014d)",
  subtitle: "Hablar del pasado con \u3067\u3057\u305f y -\u307e\u3057\u305f",

  cando: [
    "Puedo decir que hice ayer con verbos en pasado (-\u307e\u3057\u305f).",
    "Puedo usar \u3067\u3057\u305f (pasado de \u3067\u3059) para describir como fue algo.",
    "Puedo preguntar '\u00bfcomo estuvo?' y responder.",
    "Puedo contar una actividad breve del pasado reciente.",
  ],

  vocab: [
    { id: "ja8k-1", term: "\u304d\u306e\u3046 (kin\u014d)", translation: "ayer", example: "\u304d\u306e\u3046\u3001\u3048\u3044\u304c\u3092 \u307f\u307e\u3057\u305f\u3002(Kin\u014d, eiga o mimashita.)" },
    { id: "ja8k-2", term: "\u305b\u3093\u3057\u3085\u3046 (senshuu)", translation: "la semana pasada", example: "\u305b\u3093\u3057\u3085\u3046\u3001\u3072\u307e\u3067\u3057\u305f\u3002(Senshuu, hima deshita.)" },
    { id: "ja8k-3", term: "\u3067\u3057\u305f (deshita)", translation: "era/fue/estuvo (pasado de desu)", example: "\u305f\u306e\u3057\u304b\u3063\u305f\u3067\u3059\u3002(Tanoshikatta desu.)" },
    { id: "ja8k-4", term: "-\u307e\u3057\u305f (-mashita)", translation: "pasado de -\u307e\u3059", example: "\u5b66\u6821\u306b \u3044\u304d\u307e\u3057\u305f\u3002(Gakk\u014d ni ikimashita.)" },
    { id: "ja8k-5", term: "\u305f\u306e\u3057\u304b\u3063\u305f(\u3067\u3059) (tanoshikatta desu)", translation: "fue divertido", example: "\u30d1\u30fc\u30c6\u30a3\u30fc\u306f \u305f\u306e\u3057\u304b\u3063\u305f\u3067\u3059\u3002(P\u0101t\u012b wa tanoshikatta desu.)" },
    { id: "ja8k-6", term: "\u3044\u304d\u307e\u3057\u305f (ikimashita)", translation: "fui", example: "\u304a\u307f\u305e\u306b \u3044\u304d\u307e\u3057\u305f\u3002(Omise ni ikimashita.)" },
    { id: "ja8k-7", term: "\u305f\u3079\u307e\u3057\u305f (tabemashita)", translation: "comi", example: "\u3059\u3057\u3092 \u305f\u3079\u307e\u3057\u305f\u3002(Sushi o tabemashita.)" },
    { id: "ja8k-8", term: "\u307f\u307e\u3057\u305f (mimashita)", translation: "vi", example: "\u3048\u3044\u304c\u3092 \u307f\u307e\u3057\u305f\u3002(Eiga o mimashita.)" },
    { id: "ja8k-9", term: "\u3069\u3046\u3067\u3057\u305f\u304b (d\u014d deshita ka)", translation: "como estuvo?", example: "\u30d1\u30fc\u30c6\u30a3\u30fc\u306f \u3069\u3046\u3067\u3057\u305f\u304b\u3002(P\u0101t\u012b wa d\u014d deshita ka.)" },
    { id: "ja8k-10", term: "\u305f\u306e\u3057\u3044 (tanoshii)", translation: "divertido", example: "\u3053\u306e\u3086\u3046\u3048\u3093\u306f \u305f\u306e\u3057\u3044\u3067\u3059\u3002(Kono y\u014dgi wa tanoshii desu.)" },
    { id: "ja8k-11", term: "\u3044\u305d\u304c\u3057\u3044 (isogashii)", translation: "ocupado", example: "\u304d\u306e\u3046\u306f \u3044\u305d\u304c\u3057\u304b\u3063\u305f\u3067\u3059\u3002(Kin\u014d wa isogashikatta desu.)" },
    { id: "ja8k-12", term: "\u3064\u304b\u308c\u307e\u3057\u305f (tsukaremashita)", translation: "me canse", example: "\u3068\u3066\u3082 \u3064\u304b\u308c\u307e\u3057\u305f\u3002(Totemo tsukaremashita.)" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "ja8k-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: \u304d\u306e\u3046\u306e \u3053\u3068 (lo de ayer)",
      intro: "Competencia de LECTURA. Lee DOS textos en japones (con romaji de apoyo) y responde las preguntas.",
      content: {
        reading:
          "\u3076\u3093\u3057\u3087\u3046 1 - \u3051\u3093\u3055\u3093\u306e \u304d\u306e\u3046 (el ayer de Ken)\n" +
          "\u304d\u306e\u3046\u306f \u3044\u305d\u304c\u3057\u304b\u3063\u305f\u3067\u3059\u3002\u3042\u3055\u3001\u304c\u3063\u3053\u3046\u306b \u3044\u304d\u307e\u3057\u305f\u3002\n" +
          "(Kin\u014d wa isogashikatta desu. Asa, gakk\u014d ni ikimashita.)\n" +
          "\u3072\u308b\u3001\u3068\u3082\u3060\u3061\u3068 \u3059\u3057\u3092 \u305f\u3079\u307e\u3057\u305f\u3002\u3068\u3066\u3082 \u304a\u3044\u3057\u304b\u3063\u305f\u3067\u3059\u3002\n" +
          "(Hiru, tomodachi to sushi o tabemashita. Totemo oishikatta desu.)\n" +
          "\u3088\u308b\u3001\u3048\u3044\u304c\u3092 \u307f\u307e\u3057\u305f\u3002\u305f\u306e\u3057\u304b\u3063\u305f\u3067\u3059\u304c\u3001\u3068\u3066\u3082 \u3064\u304b\u308c\u307e\u3057\u305f\u3002\n" +
          "(Yoru, eiga o mimashita. Tanoshikatta desu ga, totemo tsukaremashita.)\n\n" +
          "\u3076\u3093\u3057\u3087\u3046 2 - \u3057\u3085\u3046\u307e\u3064\u306e \u30d1\u30fc\u30c6\u30a3\u30fc (la fiesta del fin de semana)\n" +
          "A: \u305b\u3093\u3057\u3085\u3046\u306e \u30d1\u30fc\u30c6\u30a3\u30fc\u306f \u3069\u3046\u3067\u3057\u305f\u304b\u3002(Senshuu no p\u0101t\u012b wa d\u014d deshita ka.)\n" +
          "B: \u3068\u3066\u3082 \u305f\u306e\u3057\u304b\u3063\u305f\u3067\u3059\u3002(Totemo tanoshikatta desu.)\n" +
          "A: \u4f55\u3092 \u305f\u3079\u307e\u3057\u305f\u304b\u3002(Nani o tabemashita ka.)\n" +
          "B: \u30d4\u30b6\u3068 \u30b1\u30fc\u30ad\u3092 \u305f\u3079\u307e\u3057\u305f\u3002\u3059\u3054\u304f \u304a\u3044\u3057\u304b\u3063\u305f\u3067\u3059\u3002(Piza to k\u0113ki o tabemashita. Sugoku oishikatta desu.)\n" +
          "A: \u3044\u3044\u3067\u3059\u306d\uff01\u308f\u305f\u3057\u3082 \u3044\u304d\u305f\u304b\u3063\u305f\u3067\u3059\u3002(Ii desu ne! Watashi mo ikitakatta desu.)",
        glossary: [
          { term: "\u3072\u308b (hiru)", translation: "el medio dia" },
          { term: "\u3068\u3066\u3082 (totemo)", translation: "muy" },
          { term: "\u3059\u3054\u304f (sugoku)", translation: "muy / increiblemente (informal)" },
          { term: "\u30d1\u30fc\u30c6\u30a3\u30fc (p\u0101t\u012b)", translation: "fiesta" },
          { term: "\u3044\u304d\u305f\u304b\u3063\u305f\u3067\u3059 (ikitakatta desu)", translation: "queria ir (pasado de 'querer')" },
        ],
        keyPhrases: [
          "Fijate: los ADJETIVOS como \u304a\u3044\u3057\u3044/\u305f\u306e\u3057\u3044 cambian a \u3010\u3089\u3011\u304b\u3063\u305f en pasado (\u304a\u3044\u3057\u304b\u3063\u305f, \u305f\u306e\u3057\u304b\u3063\u305f) -- NO usan \u3067\u3057\u305f.",
          "Los VERBOS (-\u307e\u3059) cambian a -\u307e\u3057\u305f en pasado.",
        ],
        check: [
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3051\u3093\u3055\u3093\u306e \u304d\u306e\u3046\u306f \u3069\u3046 \u3067\u3057\u305f\u304b\u3002", choices: ["\u3072\u307e\u3067\u3057\u305f", "\u3044\u305d\u304c\u3057\u304b\u3063\u305f\u3067\u3059", "\u305f\u306e\u3057\u304b\u3063\u305f\u3067\u3059"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3051\u3093\u3055\u3093\u306f \u3072\u308b\u3001\u4f55\u3092 \u305f\u3079\u307e\u3057\u305f\u304b\u3002", choices: ["\u30d4\u30b6", "\u3059\u3057", "\u3054\u306f\u3093"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3088\u308b\u3001\u3051\u3093\u3055\u3093\u306f \u4f55\u3092 \u3057\u307e\u3057\u305f\u304b\u3002", choices: ["\u3048\u3044\u304c\u3092 \u307f\u307e\u3057\u305f", "\u672c\u3092 \u8aad\u307f\u307e\u3057\u305f", "\u306d\u307e\u3057\u305f"], answer: 0 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: \u305b\u3093\u3057\u3085\u3046\u306e \u30d1\u30fc\u30c6\u30a3\u30fc\u306f \u3069\u3046 \u3067\u3057\u305f\u304b\u3002", choices: ["\u3064\u307e\u3089\u306a\u304b\u3063\u305f\u3067\u3059", "\u305f\u306e\u3057\u304b\u3063\u305f\u3067\u3059", "\u3044\u305d\u304c\u3057\u304b\u3063\u305f\u3067\u3059"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: B\u3055\u3093\u306f \u4f55\u3092 \u305f\u3079\u307e\u3057\u305f\u304b\u3002", choices: ["\u30b1\u30fc\u30ad\u3060\u3051", "\u30d4\u30b6\u3068\u30b1\u30fc\u30ad", "\u3059\u3057\u3060\u3051"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: A\u3055\u3093\u306f \u30d1\u30fc\u30c6\u30a3\u30fc\u306b \u884c\u304d\u307e\u3057\u305f\u304b\u3002", choices: ["\u306f\u3044\u3001\u884c\u304d\u307e\u3057\u305f", "\u3044\u3044\u3048\u3001\u884c\u304d\u305f\u304b\u3063\u305f\u3067\u3059 (no fue, pero queria)", "\u308f\u304b\u308a\u307e\u305b\u3093"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "ja8k-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: \u304d\u306e\u3046\u3057\u305f \u3053\u3068 (lo que hiciste ayer)",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "\u304d\u306e\u3046 / \u305b\u3093\u3057\u3085\u3046 (kin\u014d / senshuu)", translation: "ayer / la semana pasada" },
        { term: "\u3067\u3057\u305f (deshita)", translation: "pasado de desu" },
        { term: "-\u307e\u3057\u305f (-mashita)", translation: "pasado de -masu" },
        { term: "\u3044\u304d\u307e\u3057\u305f / \u305f\u3079\u307e\u3057\u305f (ikimashita / tabemashita)", translation: "fui / comi" },
        { term: "\u307f\u307e\u3057\u305f (mimashita)", translation: "vi" },
        { term: "\u3069\u3046\u3067\u3057\u305f\u304b (d\u014d deshita ka)", translation: "como estuvo?" },
        { term: "\u305f\u306e\u3057\u3044 / \u3044\u305d\u304c\u3057\u3044 (tanoshii / isogashii)", translation: "divertido / ocupado" },
        { term: "\u3064\u304b\u308c\u307e\u3057\u305f (tsukaremashita)", translation: "me canse" },
      ],
      activities: [
        {
          id: "ja8k-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "\u304d\u306e\u3046 (kin\u014d)", right: "Ayer" },
            { left: "\u305b\u3093\u3057\u3085\u3046 (senshuu)", right: "La semana pasada" },
            { left: "\u3044\u304d\u307e\u3057\u305f (ikimashita)", right: "Fui" },
            { left: "\u305f\u3079\u307e\u3057\u305f (tabemashita)", right: "Comi" },
          ] },
        },
        {
          id: "ja8k-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "\u307f\u307e\u3057\u305f (mimashita)", right: "Vi" },
            { left: "\u305f\u306e\u3057\u3044 (tanoshii)", right: "Divertido" },
            { left: "\u3044\u305d\u304c\u3057\u3044 (isogashii)", right: "Ocupado" },
            { left: "\u3064\u304b\u308c\u307e\u3057\u305f (tsukaremashita)", right: "Me canse" },
          ] },
        },
        {
          id: "ja8k-vocab-a3", type: "multiple_choice",
          prompt: "Cual es el PASADO de \u3067\u3059?",
          payload: { choices: ["\u3067\u3057\u305f (deshita)", "\u3067\u3059\u304b (desu ka)", "\u3067\u304d\u307e\u3059 (dekimasu)"], answer: 0 },
          explain: "\u3067\u3057\u305f (deshita) = pasado de \u3067\u3059.",
        },
        {
          id: "ja8k-vocab-a4", type: "multiple_choice",
          prompt: "Como preguntas 'como estuvo?'",
          payload: { choices: ["\u3069\u3046\u3067\u3057\u305f\u304b (d\u014d deshita ka)", "\u3069\u3053\u3067\u3059\u304b (doko desu ka)", "\u3060\u308c\u3067\u3059\u304b (dare desu ka)"], answer: 0 },
          explain: "\u3069\u3046\u3067\u3057\u305f\u304b (d\u014d deshita ka) = como estuvo?",
        },
        {
          id: "ja8k-vocab-a5", type: "multiple_choice",
          prompt: "Pasado de \u3044\u304d\u307e\u3059 (voy):",
          payload: { choices: ["\u3044\u304d\u307e\u3059 (ikimasu)", "\u3044\u304d\u307e\u3057\u305f (ikimashita)", "\u3044\u304d\u307e\u305b\u3093 (ikimasen)"], answer: 1 },
          explain: "-\u307e\u3059 -> -\u307e\u3057\u305f en pasado.",
        },
        {
          id: "ja8k-vocab-a6", type: "multiple_choice",
          prompt: "Cual palabra significa 'divertido'?",
          payload: { choices: ["\u3044\u305d\u304c\u3057\u3044 (isogashii)", "\u305f\u306e\u3057\u3044 (tanoshii)", "\u304a\u3044\u3057\u3044 (oishii)"], answer: 1 },
          explain: "\u305f\u306e\u3057\u3044 (tanoshii) = divertido.",
        },
        {
          id: "ja8k-vocab-a7", type: "multiple_choice",
          prompt: "Cual palabra significa 'ocupado'?",
          payload: { choices: ["\u3044\u305d\u304c\u3057\u3044 (isogashii)", "\u3084\u3059\u3044 (yasui)", "\u3058\u3087\u3046\u305a (j\u014dzu)"], answer: 0 },
          explain: "\u3044\u305d\u304c\u3057\u3044 (isogashii) = ocupado.",
        },
        {
          id: "ja8k-vocab-a8", type: "multiple_choice",
          prompt: "Cual significa 'la semana pasada'?",
          payload: { choices: ["\u304d\u306e\u3046 (kin\u014d)", "\u305b\u3093\u3057\u3085\u3046 (senshuu)", "\u307e\u3044\u3070\u3093 (mai-ban)"], answer: 1 },
          explain: "\u305b\u3093\u3057\u3085\u3046 (senshuu) = la semana pasada. \u304d\u306e\u3046 (kin\u014d) = ayer.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "ja8k-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: el pasado -- \u3067\u3057\u305f y -\u307e\u3057\u305f",
      intro: "Competencia de GRAMATICA. Aprende a poner \u3067\u3059 y los verbos -\u307e\u3059 en pasado.",
      grammar: {
        title: "\u3067\u3057\u305f (pasado de \u3067\u3059) y -\u307e\u3057\u305f (pasado de -\u307e\u3059)",
        form: "\u3067\u3059 \u2192 *\u3067\u3057\u305f*   /   -\u307e\u3059 \u2192 *-\u307e\u3057\u305f*",
        desc: "Sirve para hablar de algo que paso en el pasado: ayer, la semana pasada, etc.",
        rule: "Para pasar al pasado, \u3067\u3059 se convierte en \u3067\u3057\u305f, y cualquier verbo en -\u307e\u3059 cambia su terminacion a -\u307e\u3057\u305f (\u305f\u3079\u307e\u3059 \u2192 \u305f\u3079\u307e\u3057\u305f). Igual que en presente, NO cambia por persona. Los ADJETIVOS que terminan en \u3044 (como \u304a\u3044\u3057\u3044, \u305f\u306e\u3057\u3044) son especiales: cambian la \u3044 final por \u304b\u3063\u305f (\u304a\u3044\u3057\u3044 \u2192 \u304a\u3044\u3057\u304b\u3063\u305f), NO usan \u3067\u3057\u305f.",
        table: {
          headers: ["Presente", "Pasado", "Ejemplo"],
          rows: [
            ["\u3067\u3059", "\u3067\u3057\u305f", "\u3072\u307e\u3067\u3057\u305f (estaba libre)"],
            ["-\u307e\u3059", "-\u307e\u3057\u305f", "\u3044\u304d\u307e\u3057\u305f (fui)"],
            ["\u3044 adjetivo", "\u3044\u2192\u304b\u3063\u305f", "\u305f\u306e\u3057\u304b\u3063\u305f (fue divertido)"],
          ],
        },
        examples: [
          "\u304d\u306e\u3046\u306f \u3072\u307e*\u3067\u3057\u305f*\u3002 (Kin\u014d wa hima deshita.)",
          "\u5b66\u6821\u306b *\u3044\u304d\u307e\u3057\u305f*\u3002 (Gakk\u014d ni ikimashita.)",
          "\u30d1\u30fc\u30c6\u30a3\u30fc\u306f *\u305f\u306e\u3057\u304b\u3063\u305f*\u3067\u3059\u3002 (P\u0101t\u012b wa tanoshikatta desu.)",
          "\u3068\u3066\u3082 *\u3064\u304b\u308c\u307e\u3057\u305f*\u3002 (Totemo tsukaremashita.)",
        ],
        explain: { tr: ["Ayer estaba libre (sin planes).", "Fui a la escuela.", "La fiesta fue divertida.", "Me cansé mucho."] },
        mistakes: [
          { wrong: "\u304d\u306e\u3046\u306f \u3072\u307e\u3067\u3059\u3002 (sin pasado)", right: "\u304d\u306e\u3046\u306f \u3072\u307e\u3067\u3057\u305f\u3002" },
          { wrong: "\u5b66\u6821\u306b \u3044\u304d\u307e\u3059\u3067\u3057\u305f\u3002 (mezcla mal)", right: "\u5b66\u6821\u306b \u3044\u304d\u307e\u3057\u305f\u3002" },
          { wrong: "\u305f\u306e\u3057\u3044\u3067\u3057\u305f\u3067\u3059\u3002 (\u3044-adjetivo con \u3067\u3057\u305f)", right: "\u305f\u306e\u3057\u304b\u3063\u305f\u3067\u3059\u3002" },
        ],
      },
      activities: [
        {
          id: "ja8k-gram-a1", type: "cloze",
          prompt: "Completa: '\u304d\u306e\u3046\u306f \u3072\u307e___\u3002' (pasado de desu)",
          payload: { answer: "\u3067\u3057\u305f" },
          explain: "\u3067\u3059 \u2192 \u3067\u3057\u305f en pasado.",
        },
        {
          id: "ja8k-gram-a2", type: "cloze",
          prompt: "Completa: '\u5b66\u6821\u306b \u3044\u304d___\u3002' (pasado de ikimasu)",
          payload: { answer: "\u307e\u3057\u305f" },
          explain: "-\u307e\u3059 \u2192 -\u307e\u3057\u305f en pasado.",
        },
        {
          id: "ja8k-gram-a3", type: "multiple_choice",
          prompt: "Pasado de \u304a\u3044\u3057\u3044 (delicioso):",
          payload: { choices: ["\u304a\u3044\u3057\u3044\u3067\u3057\u305f", "\u304a\u3044\u3057\u304b\u3063\u305f", "\u304a\u3044\u3057\u304b\u3063\u305f\u3067\u3059"], answer: 2 },
          explain: "Adjetivos en \u3044 \u2192 \u304b\u3063\u305f + \u3067\u3059 (opcional, mas educado con \u3067\u3059).",
        },
        {
          id: "ja8k-gram-a4", type: "multiple_choice",
          prompt: "Elige la frase CORRECTA:",
          payload: { choices: ["\u3048\u3044\u304c\u3092 \u307f\u307e\u3059\u3067\u3057\u305f\u3002", "\u3048\u3044\u304c\u3092 \u307f\u307e\u3057\u305f\u3002", "\u3048\u3044\u304c\u3092 \u307f\u3067\u3057\u305f\u3002"], answer: 1 },
        },
        {
          id: "ja8k-gram-a5", type: "word_bank",
          prompt: "Ordena: 'Comi sushi ayer' (kinou/sushi/wo/tabemashita):",
          payload: { words: ["\u305f\u3079\u307e\u3057\u305f", "\u304d\u306e\u3046", "\u3059\u3057", "\u3092"], answer: ["\u304d\u306e\u3046", "\u3059\u3057", "\u3092", "\u305f\u3079\u307e\u3057\u305f"] },
          explain: "Orden: \u304d\u306e\u3046 + \u3059\u3057 + \u3092 + \u305f\u3079\u307e\u3057\u305f.",
        },
        {
          id: "ja8k-gram-a6", type: "word_bank",
          prompt: "Ordena: 'La fiesta fue divertida' (pati/wa/tanoshikatta/desu):",
          payload: { words: ["\u3067\u3059", "\u30d1\u30fc\u30c6\u30a3\u30fc\u306f", "\u305f\u306e\u3057\u304b\u3063\u305f"], answer: ["\u30d1\u30fc\u30c6\u30a3\u30fc\u306f", "\u305f\u306e\u3057\u304b\u3063\u305f", "\u3067\u3059"] },
          explain: "Orden: \u30d1\u30fc\u30c6\u30a3\u30fc\u306f + \u305f\u306e\u3057\u304b\u3063\u305f + \u3067\u3059.",
        },
        {
          id: "ja8k-gram-a7", type: "multiple_choice",
          prompt: "Como preguntas 'como estuvo la fiesta?'",
          payload: { choices: ["\u30d1\u30fc\u30c6\u30a3\u30fc\u306f \u3069\u3046\u3067\u3057\u305f\u304b\u3002", "\u30d1\u30fc\u30c6\u30a3\u30fc\u306f \u3069\u3053\u3067\u3059\u304b\u3002", "\u30d1\u30fc\u30c6\u30a3\u30fc\u304c \u3059\u304d\u3067\u3059\u304b\u3002"], answer: 0 },
        },
        {
          id: "ja8k-gram-a8", type: "multiple_choice",
          prompt: "'\u3068\u3066\u3082 \u3064\u304b\u308c\u307e\u3057\u305f\u3002' significa:",
          payload: { choices: ["Estoy muy cansado (ahora).", "Me cansé mucho (ya paso).", "Nunca me canso."], answer: 1 },
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "ja8k-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: \u304d\u306e\u3046\u306e \u3053\u3068 (cuenta tu dia de ayer)",
      intro: "Competencia de ESCRITURA. Cuenta que hiciste ayer, frase por frase.",
      activities: [
        {
          id: "ja8k-write-a1", type: "word_bank",
          prompt: "1. Di que fuiste a la escuela (ayer):",
          payload: { words: ["\u3044\u304d\u307e\u3057\u305f", "\u5b66\u6821\u306b"], answer: ["\u5b66\u6821\u306b", "\u3044\u304d\u307e\u3057\u305f"] },
        },
        {
          id: "ja8k-write-a2", type: "word_bank",
          prompt: "2. Di que comiste sushi:",
          payload: { words: ["\u305f\u3079\u307e\u3057\u305f", "\u3059\u3057\u3092"], answer: ["\u3059\u3057\u3092", "\u305f\u3079\u307e\u3057\u305f"] },
        },
        {
          id: "ja8k-write-a3", type: "word_bank",
          prompt: "3. Di que viste una pelicula:",
          payload: { words: ["\u307f\u307e\u3057\u305f", "\u3048\u3044\u304c\u3092"], answer: ["\u3048\u3044\u304c\u3092", "\u307f\u307e\u3057\u305f"] },
        },
        {
          id: "ja8k-write-a4", type: "word_bank",
          prompt: "4. Di que fue divertido:",
          payload: { words: ["\u3067\u3059", "\u305f\u306e\u3057\u304b\u3063\u305f"], answer: ["\u305f\u306e\u3057\u304b\u3063\u305f", "\u3067\u3059"] },
        },
        {
          id: "ja8k-write-a5", type: "word_bank",
          prompt: "5. Pregunta como estuvo la fiesta:",
          payload: { words: ["\u3067\u3057\u305f\u304b", "\u30d1\u30fc\u30c6\u30a3\u30fc\u306f", "\u3069\u3046"], answer: ["\u30d1\u30fc\u30c6\u30a3\u30fc\u306f", "\u3069\u3046", "\u3067\u3057\u305f\u304b"] },
        },
        {
          id: "ja8k-write-a6", type: "multiple_choice",
          prompt: "6. Alguien pregunta '\u304d\u306e\u3046\u306f \u3069\u3046\u3067\u3057\u305f\u304b'. Di que fue divertido:",
          payload: { choices: ["\u305f\u306e\u3057\u304b\u3063\u305f\u3067\u3059\u3002", "\u305f\u306e\u3057\u3044\u3067\u3059\u3002", "\u305f\u306e\u3057\u307f\u307e\u3059\u3002"], answer: 0 },
        },
        {
          id: "ja8k-write-a7", type: "multiple_choice",
          prompt: "7. Cual pregunta usarias para saber que hizo alguien ayer?",
          payload: { choices: ["\u304d\u306e\u3046\u3001\u4f55\u3092 \u3057\u307e\u3057\u305f\u304b\u3002", "\u4eca\u3001\u4f55\u3092 \u3057\u307e\u3059\u304b\u3002", "\u3069\u3053\u306b \u3044\u304d\u307e\u3059\u304b\u3002"], answer: 0 },
        },
        {
          id: "ja8k-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase esta BIEN formada?",
          payload: { choices: ["\u304d\u306e\u3046\u3001\u3048\u3044\u304c\u3092 \u307f\u307e\u3057\u305f\u3002", "\u304d\u306e\u3046\u3001\u3048\u3044\u304c\u3092 \u307f\u307e\u3059\u3067\u3057\u305f\u3002", "\u307f\u307e\u3057\u305f \u304d\u306e\u3046\u3001\u3048\u3044\u304c\u3092\u3002"], answer: 0 },
        },
      ],
    },
  ],
};
