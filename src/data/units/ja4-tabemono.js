/**
 * data/units/ja4-tabemono.js — Unidad A1 japones "たべもの (Tabemono)" --
 * comida, gustos con が すき/きらい です y pedir con ください.
 */

export const JA4_TABEMONO = {
  id: "ja4-tabemono",
  language: "ja",
  level: "A1",
  title: "\u305f\u3079\u3082\u306e (Tabemono)",
  subtitle: "Hablar de comida: \u304c \u3059\u304d/\u304d\u3089\u3044 \u3067\u3059 y pedir con \u304f\u3060\u3055\u3044",

  cando: [
    "Puedo nombrar comidas y bebidas basicas.",
    "Puedo decir que me gusta o no me gusta algo con \u304c \u3059\u304d/\u304d\u3089\u3044 \u3067\u3059.",
    "Puedo pedir algo en un restaurante con \u304f\u3060\u3055\u3044.",
    "Puedo decir que algo esta delicioso.",
  ],

  vocab: [
    { id: "ja4t-1", term: "\u3054\u306f\u3093 (gohan)", translation: "arroz / comida", example: "\u3054\u306f\u3093\u304c \u3059\u304d\u3067\u3059\u3002(Gohan ga suki desu.)" },
    { id: "ja4t-2", term: "\u30d1\u30f3 (pan)", translation: "pan", example: "\u307e\u3044\u3042\u3055\u3001\u30d1\u30f3\u3092 \u305f\u3079\u307e\u3059\u3002(Mai-asa, pan o tabemasu.)" },
    { id: "ja4t-3", term: "\u307f\u305a (mizu)", translation: "agua", example: "\u307f\u305a\u3092 \u306e\u307f\u307e\u3059\u3002(Mizu o nomimasu.)" },
    { id: "ja4t-4", term: "\u3055\u304b\u306a (sakana)", translation: "pescado", example: "\u3055\u304b\u306a\u304c \u304a\u3044\u3057\u3044\u3067\u3059\u3002(Sakana ga oishii desu.)" },
    { id: "ja4t-5", term: "\u306b\u304f (niku)", translation: "carne", example: "\u306b\u304f\u304c \u3059\u304d\u3067\u3059\u3002(Niku ga suki desu.)" },
    { id: "ja4t-6", term: "\u3084\u3055\u3044 (yasai)", translation: "verduras", example: "\u3084\u3055\u3044\u304c \u304d\u3089\u3044\u3067\u3059\u3002(Yasai ga kirai desu.)" },
    { id: "ja4t-7", term: "\u304f\u3060\u3082\u306e (kudamono)", translation: "fruta", example: "\u304f\u3060\u3082\u306e\u304c \u3059\u304d\u3067\u3059\u304b\u3002(Kudamono ga suki desu ka.)" },
    { id: "ja4t-8", term: "\u305f\u307e\u3054 (tamago)", translation: "huevo", example: "\u305f\u307e\u3054\u3092 \u305f\u3079\u307e\u3059\u3002(Tamago o tabemasu.)" },
    { id: "ja4t-9", term: "\u3059\u304d(\u306a) (suki na)", translation: "gustar", example: "\u3053\u30fc\u3072\u30fc\u304c \u3059\u304d\u3067\u3059\u3002(K\u014dh\u012b ga suki desu.)" },
    { id: "ja4t-10", term: "\u304d\u3089\u3044(\u306a) (kirai na)", translation: "no gustar / odiar", example: "\u306b\u304c\u3044\u304c \u304d\u3089\u3044\u3067\u3059\u3002(Nigai ga kirai desu.)" },
    { id: "ja4t-11", term: "\u304a\u3044\u3057\u3044 (oishii)", translation: "delicioso", example: "\u3053\u306e\u3089\u30fc\u3081\u3093\u306f \u304a\u3044\u3057\u3044\u3067\u3059\u3002(Kono r\u014dmen wa oishii desu.)" },
    { id: "ja4t-12", term: "\u304f\u3060\u3055\u3044 (kudasai)", translation: "por favor (deme)", example: "\u307f\u305a\u3092 \u304f\u3060\u3055\u3044\u3002(Mizu o kudasai.)" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "ja4t-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: \u305f\u3079\u3082\u306e\u3068 \u3059\u304d\u306a \u3082\u306e (comida y gustos)",
      intro: "Competencia de LECTURA. Lee DOS textos en japones (con romaji de apoyo) y responde las preguntas.",
      content: {
        reading:
          "\u3076\u3093\u3057\u3087\u3046 1 - \u30c8\u30e0\u3055\u3093\u306e \u3059\u304d\u306a \u305f\u3079\u3082\u306e (las comidas favoritas de Tom)\n" +
          "\u30c8\u30e0\u3055\u3093\u306f \u3055\u304b\u306a\u304c \u3059\u304d\u3067\u3059\u3002\u305d\u3057\u3066\u3001\u3084\u3055\u3044\u3082 \u3059\u304d\u3067\u3059\u3002\n" +
          "(Tomu-san wa sakana ga suki desu. Soshite, yasai mo suki desu.)\n" +
          "\u3067\u3082\u3001\u306b\u304f\u306f \u304d\u3089\u3044\u3067\u3059\u3002\u307e\u3044\u3042\u3055\u3001\u30d1\u30f3\u3068 \u305f\u307e\u3054\u3092 \u305f\u3079\u307e\u3059\u3002\n" +
          "(Demo, niku wa kirai desu. Mai-asa, pan to tamago o tabemasu.)\n" +
          "\u3053\u30fc\u3072\u30fc\u304c \u3059\u304d\u3067\u3059\u304c\u3001\u30df\u30eb\u30af\u306f \u3042\u307e\u308a \u306e\u307f\u307e\u305b\u3093\u3002\n" +
          "(K\u014dh\u012b ga suki desu ga, miruku wa amari nomimasen.)\n\n" +
          "\u3076\u3093\u3057\u3087\u3046 2 - \u30ec\u30b9\u30c8\u30e9\u30f3\u3067 (en el restaurante)\n" +
          "A: \u3044\u3089\u3063\u3057\u3083\u3044\u307e\u305b\u3002\u4f55\u306b \u3057\u307e\u3059\u304b\u3002(Irasshaimase. Nani ni shimasu ka.)\n" +
          "B: \u3055\u304b\u306a\u3068 \u3054\u306f\u3093\u3092 \u304f\u3060\u3055\u3044\u3002(Sakana to gohan o kudasai.)\n" +
          "A: \u306a\u306b\u304b \u306e\u307f\u307e\u3059\u304b\u3002(Nanika nomimasu ka.)\n" +
          "B: \u307f\u305a\u3092 \u304f\u3060\u3055\u3044\u3002(Mizu o kudasai.)\n" +
          "A: \u304b\u3057\u3053\u307e\u308a\u307e\u3057\u305f\u3002(Kashikomarimashita.)\n" +
          "B: (\u305f\u3079\u305f \u3042\u3068\u3067) \u3068\u3066\u3082 \u304a\u3044\u3057\u3044\u3067\u3059\uff01(Totemo oishii desu!)",
        readingEs: [
          "Texto 1 - las comidas favoritas de Tom",
          "A Tom le gusta el pescado. Y tambi\u00e9n le gustan las verduras.",
          "Pero no le gusta la carne. Cada ma\u00f1ana come pan y huevo.",
          "Le gusta el caf\u00e9, pero casi no toma leche.",
          "Texto 2 - en el restaurante",
          "A: Bienvenido. \u00bfQu\u00e9 va a pedir?",
          "B: Deme pescado y arroz, por favor.",
          "A: \u00bfVa a tomar algo?",
          "B: Deme agua, por favor.",
          "A: Entendido.",
          "B: (despu\u00e9s de comer) \u00a1Est\u00e1 muy delicioso!",
        ],
        glossary: [
          { term: "\u305d\u3057\u3066 (soshite)", translation: "y ademas" },
          { term: "\u3067\u3082 (demo)", translation: "pero" },
          { term: "\u3042\u307e\u308a \u3001\u301c\u307e\u305b\u3093 (amari ~masen)", translation: "casi no / no mucho (+negativo)" },
          { term: "\u3044\u3089\u3063\u3057\u3083\u3044\u307e\u305b (irasshaimase)", translation: "bienvenido (saludo de tienda/restaurante)" },
          { term: "\u306a\u306b\u304b (nanika)", translation: "algo" },
          { term: "\u304b\u3057\u3053\u307e\u308a\u307e\u3057\u305f (kashikomarimashita)", translation: "entendido (formal, al tomar un pedido)" },
        ],
        keyPhrases: [
          "Busca que le gusta y que NO le gusta a Tom.",
          "En un restaurante, \u304f\u3060\u3055\u3044 despues de la comida = 'deme X, por favor'.",
        ],
        check: [
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u30c8\u30e0\u3055\u3093\u306f \u306b\u304f\u304c \u3059\u304d\u3067\u3059\u304b\u3002", choices: ["\u306f\u3044\u3001\u3059\u304d\u3067\u3059", "\u3044\u3044\u3048\u3001\u304d\u3089\u3044\u3067\u3059", "\u308f\u304b\u308a\u307e\u305b\u3093"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u30c8\u30e0\u3055\u3093\u306f \u307e\u3044\u3042\u3055 \u4f55\u3092 \u305f\u3079\u307e\u3059\u304b\u3002", choices: ["\u3054\u306f\u3093\u3068\u3055\u304b\u306a", "\u30d1\u30f3\u3068\u305f\u307e\u3054", "\u3084\u3055\u3044\u3068\u306b\u304f"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u30c8\u30e0\u3055\u3093\u306f \u30df\u30eb\u30af\u3092 \u3088\u304f \u306e\u307f\u307e\u3059\u304b\u3002", choices: ["\u306f\u3044\u3001\u3088\u304f \u306e\u307f\u307e\u3059", "\u3044\u3044\u3048\u3001\u3042\u307e\u308a \u306e\u307f\u307e\u305b\u3093", "\u30df\u30eb\u30af\u306f \u304d\u3089\u3044\u3067\u3059"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: B\u3055\u3093\u306f \u4f55\u3092 \u6ce8\u6587\u3057\u307e\u3059\u304b\u3002", choices: ["\u3055\u304b\u306a\u3068\u3054\u306f\u3093", "\u306b\u304f\u3068\u30d1\u30f3", "\u304f\u3060\u3082\u306e\u3060\u3051"], answer: 0 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: B\u3055\u3093\u306f \u4f55\u3092 \u306e\u307f\u307e\u3059\u304b\u3002", choices: ["\u3053\u30fc\u3072\u30fc", "\u307f\u305a", "\u30df\u30eb\u30af"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: \u305f\u3079\u305f \u3042\u3068\u3001B\u3055\u3093\u306f \u4f55\u3068 \u8a00\u3044\u307e\u3059\u304b\u3002", choices: ["\u304d\u3089\u3044\u3067\u3059", "\u304a\u3044\u3057\u3044\u3067\u3059", "\u3042\u308a\u304c\u3068\u3046"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "ja4t-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: \u305f\u3079\u3082\u306e\u3068 \u306e\u307f\u3082\u306e (comida y bebida)",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "\u3054\u306f\u3093 / \u30d1\u30f3 (gohan / pan)", translation: "arroz-comida / pan" },
        { term: "\u307f\u305a (mizu)", translation: "agua" },
        { term: "\u3055\u304b\u306a / \u306b\u304f (sakana / niku)", translation: "pescado / carne" },
        { term: "\u3084\u3055\u3044 / \u304f\u3060\u3082\u306e (yasai / kudamono)", translation: "verduras / fruta" },
        { term: "\u305f\u307e\u3054 (tamago)", translation: "huevo" },
        { term: "\u3059\u304d(\u306a) / \u304d\u3089\u3044(\u306a) (suki na / kirai na)", translation: "gustar / no gustar" },
        { term: "\u304a\u3044\u3057\u3044 (oishii)", translation: "delicioso" },
        { term: "\u304f\u3060\u3055\u3044 (kudasai)", translation: "por favor (deme)" },
      ],
      activities: [
        {
          id: "ja4t-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "\u3054\u306f\u3093 (gohan)", right: "Arroz / comida" },
            { left: "\u307f\u305a (mizu)", right: "Agua" },
            { left: "\u3055\u304b\u306a (sakana)", right: "Pescado" },
            { left: "\u306b\u304f (niku)", right: "Carne" },
          ] },
        },
        {
          id: "ja4t-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "\u3084\u3055\u3044 (yasai)", right: "Verduras" },
            { left: "\u304f\u3060\u3082\u306e (kudamono)", right: "Fruta" },
            { left: "\u305f\u307e\u3054 (tamago)", right: "Huevo" },
            { left: "\u304a\u3044\u3057\u3044 (oishii)", right: "Delicioso" },
          ] },
        },
        {
          id: "ja4t-vocab-a3", type: "multiple_choice",
          prompt: "Cual palabra significa 'me gusta'?",
          payload: { choices: ["\u304d\u3089\u3044 (kirai)", "\u3059\u304d (suki)", "\u304a\u3044\u3057\u3044 (oishii)"], answer: 1 },
          explain: "\u3059\u304d (suki) = gustar.",
        },
        {
          id: "ja4t-vocab-a4", type: "multiple_choice",
          prompt: "Cual palabra significa 'no me gusta / odio'?",
          payload: { choices: ["\u3059\u304d (suki)", "\u304d\u3089\u3044 (kirai)", "\u3044\u304d\u307e\u3059 (ikimasu)"], answer: 1 },
          explain: "\u304d\u3089\u3044 (kirai) = no gustar/odiar.",
        },
        {
          id: "ja4t-vocab-a5", type: "multiple_choice",
          prompt: "Como pides agua en un restaurante?",
          payload: { choices: ["\u307f\u305a\u3092 \u304f\u3060\u3055\u3044\u3002", "\u307f\u305a\u304c \u3059\u304d\u3067\u3059\u3002", "\u307f\u305a\u3067\u3059\u304b\u3002"], answer: 0 },
          explain: "[cosa] + \u3092 + \u304f\u3060\u3055\u3044 = deme [cosa], por favor.",
        },
        {
          id: "ja4t-vocab-a6", type: "multiple_choice",
          prompt: "Cual palabra significa 'delicioso'?",
          payload: { choices: ["\u304a\u3044\u3057\u3044 (oishii)", "\u305f\u304b\u3044 (takai)", "\u3059\u304d (suki)"], answer: 0 },
          explain: "\u304a\u3044\u3057\u3044 (oishii) = delicioso.",
        },
        {
          id: "ja4t-vocab-a7", type: "multiple_choice",
          prompt: "Cual es 'fruta'?",
          payload: { choices: ["\u3084\u3055\u3044 (yasai)", "\u304f\u3060\u3082\u306e (kudamono)", "\u305f\u307e\u3054 (tamago)"], answer: 1 },
          explain: "\u304f\u3060\u3082\u306e (kudamono) = fruta.",
        },
        {
          id: "ja4t-vocab-a8", type: "multiple_choice",
          prompt: "Cual es 'verduras'?",
          payload: { choices: ["\u3084\u3055\u3044 (yasai)", "\u306b\u304f (niku)", "\u3055\u304b\u306a (sakana)"], answer: 0 },
          explain: "\u3084\u3055\u3044 (yasai) = verduras.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "ja4t-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: \u304c \u3059\u304d/\u304d\u3089\u3044 \u3067\u3059 (gustos)",
      intro: "Competencia de GRAMATICA. Aprende a decir que te gusta o no con \u304c \u3059\u304d/\u304d\u3089\u3044 \u3067\u3059.",
      grammar: {
        title: "\u304c \u3059\u304d/\u304d\u3089\u3044 \u3067\u3059 (gustos)",
        form: "[cosa] + \u304c (ga) + \u3059\u304d/\u304d\u3089\u3044 + \u3067\u3059",
        desc: "Sirve para decir que te gusta o no te gusta algo.",
        rule: "\u3059\u304d (gustar) y \u304d\u3089\u3044 (no gustar) son ADJETIVOS en japones, no verbos -- por eso la cosa que gusta lleva \u304c (ga), NO \u3092 (wo) como los verbos de la unidad anterior. '\u3055\u304b\u306a\u304c \u3059\u304d\u3067\u3059' literalmente es 'pescado + ES AGRADABLE' = 'me gusta el pescado'.",
        table: {
          headers: ["Patron", "Significado", "Ejemplo"],
          rows: [
            ["X \u304c \u3059\u304d\u3067\u3059", "me gusta X", "\u306b\u304f\u304c \u3059\u304d\u3067\u3059 (me gusta la carne)"],
            ["X \u304c \u304d\u3089\u3044\u3067\u3059", "no me gusta X", "\u3084\u3055\u3044\u304c \u304d\u3089\u3044\u3067\u3059 (no me gustan las verduras)"],
            ["X \u3092 \u304f\u3060\u3055\u3044", "deme X, por favor", "\u307f\u305a\u3092 \u304f\u3060\u3055\u3044 (deme agua)"],
          ],
        },
        examples: [
          "\u3055\u304b\u306a*\u304c* \u3059\u304d\u3067\u3059\u3002 (Sakana ga suki desu.)",
          "\u306b\u304f*\u304c* \u304d\u3089\u3044\u3067\u3059\u3002 (Niku ga kirai desu.)",
          "\u3053\u306e\u3054\u306f\u3093\u306f *\u304a\u3044\u3057\u3044* \u3067\u3059\u3002 (Kono gohan wa oishii desu.)",
          "\u3054\u306f\u3093\u3092 *\u304f\u3060\u3055\u3044*\u3002 (Gohan o kudasai.)",
        ],
        explain: { tr: ["Me gusta el pescado.", "No me gusta la carne.", "Esta comida esta deliciosa.", "Deme arroz, por favor."] },
        mistakes: [
          { wrong: "\u3055\u304b\u306a\u3092 \u3059\u304d\u3067\u3059\u3002 (\u3092 en vez de \u304c)", right: "\u3055\u304b\u306a\u304c \u3059\u304d\u3067\u3059\u3002" },
          { wrong: "\u3084\u3055\u3044 \u304d\u3089\u3044\u3067\u3059\u3002 (sin \u304c)", right: "\u3084\u3055\u3044\u304c \u304d\u3089\u3044\u3067\u3059\u3002" },
          { wrong: "\u307f\u305a\u304c \u304f\u3060\u3055\u3044\u3002 (\u304c en vez de \u3092)", right: "\u307f\u305a\u3092 \u304f\u3060\u3055\u3044\u3002" },
        ],
      },
      activities: [
        {
          id: "ja4t-gram-a1", type: "cloze",
          prompt: "Completa: '\u306b\u304f___ \u3059\u304d\u3067\u3059\u3002' (particula: ga)",
          payload: { answer: "\u304c" },
          explain: "\u3059\u304d/\u304d\u3089\u3044 siempre usan \u304c, no \u3092.",
        },
        {
          id: "ja4t-gram-a2", type: "cloze",
          prompt: "Completa: '\u3054\u306f\u3093___ \u304f\u3060\u3055\u3044\u3002' (particula: wo)",
          payload: { answer: "\u3092" },
          explain: "\u304f\u3060\u3055\u3044 pide el objeto con \u3092, como un verbo normal.",
        },
        {
          id: "ja4t-gram-a3", type: "multiple_choice",
          prompt: "Elige la frase CORRECTA para 'me gusta el pescado':",
          payload: { choices: ["\u3055\u304b\u306a\u3092 \u3059\u304d\u3067\u3059\u3002", "\u3055\u304b\u306a\u304c \u3059\u304d\u3067\u3059\u3002", "\u3055\u304b\u306a\u306f \u3059\u304d\u3067\u3059\u3092\u3002"], answer: 1 },
          explain: "\u3059\u304d usa \u304c, no \u3092.",
        },
        {
          id: "ja4t-gram-a4", type: "multiple_choice",
          prompt: "'\u3084\u3055\u3044\u304c \u304d\u3089\u3044\u3067\u3059\u3002' significa:",
          payload: { choices: ["Me gustan las verduras.", "No me gustan las verduras.", "Como verduras."], answer: 1 },
          explain: "\u304d\u3089\u3044 = no gustar.",
        },
        {
          id: "ja4t-gram-a5", type: "word_bank",
          prompt: "Ordena: 'Me gusta la carne' (niku/ga/suki/desu):",
          payload: { words: ["\u3067\u3059", "\u306b\u304f", "\u304c", "\u3059\u304d"], answer: ["\u306b\u304f", "\u304c", "\u3059\u304d", "\u3067\u3059"] },
          explain: "Orden: \u306b\u304f + \u304c + \u3059\u304d + \u3067\u3059.",
        },
        {
          id: "ja4t-gram-a6", type: "word_bank",
          prompt: "Ordena: 'Deme agua, por favor' (mizu/wo/kudasai):",
          payload: { words: ["\u307f\u305a", "\u3092", "\u304f\u3060\u3055\u3044"], answer: ["\u307f\u305a", "\u3092", "\u304f\u3060\u3055\u3044"] },
          explain: "Orden: \u307f\u305a + \u3092 + \u304f\u3060\u3055\u3044.",
        },
        {
          id: "ja4t-gram-a7", type: "multiple_choice",
          prompt: "Que tipo de palabra es \u3059\u304d en japones?",
          payload: { choices: ["Un verbo", "Un adjetivo", "Una particula"], answer: 1 },
          explain: "\u3059\u304d y \u304d\u3089\u3044 son adjetivos (na-adjetivos) -- por eso usan \u304c, no \u3092.",
        },
        {
          id: "ja4t-gram-a8", type: "multiple_choice",
          prompt: "Como dirias 'esta comida esta deliciosa'?",
          payload: { choices: ["\u3053\u306e\u3054\u306f\u3093\u306f \u304a\u3044\u3057\u3044\u3067\u3059\u3002", "\u3053\u306e\u3054\u306f\u3093\u304c \u304a\u3044\u3057\u3044\u3092\u3002", "\u304a\u3044\u3057\u3044 \u3053\u306e\u3054\u306f\u3093\u3067\u3059\u3002"], answer: 0 },
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "ja4t-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: \u304a\u307f\u305e\u306b \u3044\u304d\u307e\u3057\u3087\u3046 (vamos al restaurante)",
      intro: "Competencia de ESCRITURA. Construye una pequena escena de restaurante, frase por frase.",
      activities: [
        {
          id: "ja4t-write-a1", type: "word_bank",
          prompt: "1. Di que te gusta el pescado:",
          payload: { words: ["\u3059\u304d\u3067\u3059", "\u3055\u304b\u306a", "\u304c"], answer: ["\u3055\u304b\u306a", "\u304c", "\u3059\u304d\u3067\u3059"] },
        },
        {
          id: "ja4t-write-a2", type: "word_bank",
          prompt: "2. Di que no te gusta la carne:",
          payload: { words: ["\u304d\u3089\u3044\u3067\u3059", "\u306b\u304f", "\u304c"], answer: ["\u306b\u304f", "\u304c", "\u304d\u3089\u3044\u3067\u3059"] },
        },
        {
          id: "ja4t-write-a3", type: "word_bank",
          prompt: "3. Pide arroz, por favor:",
          payload: { words: ["\u304f\u3060\u3055\u3044", "\u3054\u306f\u3093", "\u3092"], answer: ["\u3054\u306f\u3093", "\u3092", "\u304f\u3060\u3055\u3044"] },
        },
        {
          id: "ja4t-write-a4", type: "word_bank",
          prompt: "4. Pide agua tambien, por favor:",
          payload: { words: ["\u304f\u3060\u3055\u3044", "\u307f\u305a", "\u3092"], answer: ["\u307f\u305a", "\u3092", "\u304f\u3060\u3055\u3044"] },
        },
        {
          id: "ja4t-write-a5", type: "word_bank",
          prompt: "5. Di que esta delicioso:",
          payload: { words: ["\u3067\u3059", "\u304a\u3044\u3057\u3044"], answer: ["\u304a\u3044\u3057\u3044", "\u3067\u3059"] },
        },
        {
          id: "ja4t-write-a6", type: "multiple_choice",
          prompt: "6. El mesero dice '\u4f55\u306b \u3057\u307e\u3059\u304b'. Tu pides pescado:",
          payload: { choices: ["\u3055\u304b\u306a\u3092 \u304f\u3060\u3055\u3044\u3002", "\u3055\u304b\u306a\u304c \u304d\u3089\u3044\u3067\u3059\u3002", "\u3055\u304b\u306a\u3067\u3059\u304b\u3002"], answer: 0 },
        },
        {
          id: "ja4t-write-a7", type: "multiple_choice",
          prompt: "7. Cual es un buen saludo de tienda/restaurante (lo dice el empleado)?",
          payload: { choices: ["\u3044\u3089\u3063\u3057\u3083\u3044\u307e\u305b\u3002", "\u3055\u3088\u3046\u306a\u3089\u3002", "\u304a\u3084\u3059\u307f\u306a\u3055\u3044\u3002"], answer: 0 },
        },
        {
          id: "ja4t-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase esta BIEN formada?",
          payload: { choices: ["\u3084\u3055\u3044\u304c \u3059\u304d\u3067\u3059\u3002", "\u3084\u3055\u3044\u3092 \u3059\u304d\u3067\u3059\u3002", "\u3059\u304d \u3084\u3055\u3044\u304c\u3067\u3059\u3002"], answer: 0 },
        },
      ],
    },
  ],
};
