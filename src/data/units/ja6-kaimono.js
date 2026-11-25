/**
 * data/units/ja6-kaimono.js — Unidad A1 japones "かいもの (Kaimono)" --
 * compras, numeros/dinero (円) y いくらですか.
 */

export const JA6_KAIMONO = {
  id: "ja6-kaimono",
  language: "ja",
  level: "A1",
  title: "\u304b\u3044\u3082\u306e (Kaimono)",
  subtitle: "Ir de compras: precios, \u5186 (en) e \u3044\u304f\u3089\u3067\u3059\u304b",

  cando: [
    "Puedo preguntar el precio de algo con \u3044\u304f\u3089\u3067\u3059\u304b.",
    "Puedo entender y decir numeros grandes para el dinero (\u5186).",
    "Puedo decir que algo es caro o barato.",
    "Puedo pedir que me den algo con \u3053\u308c\u3092 \u304f\u3060\u3055\u3044.",
  ],

  vocab: [
    { id: "ja6k-1", term: "\u3044\u304f\u3089\u3067\u3059\u304b (ikura desu ka)", translation: "cuanto cuesta?", example: "\u3053\u306e\u304f\u3064\u306f \u3044\u304f\u3089\u3067\u3059\u304b\u3002(Kono kutsu wa ikura desu ka.)" },
    { id: "ja6k-2", term: "\u5186 (en)", translation: "yenes (moneda)", example: "\u305b\u3093\u3048\u3093\u3067\u3059\u3002(Sen-en desu.)" },
    { id: "ja6k-3", term: "\u305f\u304b\u3044 (takai)", translation: "caro", example: "\u3053\u306e\u3075\u304f\u306f \u305f\u304b\u3044\u3067\u3059\u3002(Kono fuku wa takai desu.)" },
    { id: "ja6k-4", term: "\u3084\u3059\u3044 (yasui)", translation: "barato", example: "\u3053\u306e\u304f\u3064\u306f \u3084\u3059\u3044\u3067\u3059\u3002(Kono kutsu wa yasui desu.)" },
    { id: "ja6k-5", term: "\u3072\u3083\u304f / \u305b\u3093 / \u307e\u3093 (hyaku / sen / man)", translation: "cien / mil / diez mil", example: "\u3054\u305b\u3093\u3048\u3093\u3067\u3059\u3002(Go-sen-en desu.)" },
    { id: "ja6k-6", term: "\u307f\u305b (mise)", translation: "tienda", example: "\u3053\u306e\u307f\u305b\u306f \u3084\u3059\u3044\u3067\u3059\u3002(Kono mise wa yasui desu.)" },
    { id: "ja6k-7", term: "\u304b\u3044\u307e\u3059 (kaimasu)", translation: "comprar", example: "\u3075\u304f\u3092 \u304b\u3044\u307e\u3059\u3002(Fuku o kaimasu.)" },
    { id: "ja6k-8", term: "\u3075\u304f (fuku)", translation: "ropa", example: "\u3053\u306e\u3075\u304f\u304c \u3059\u304d\u3067\u3059\u3002(Kono fuku ga suki desu.)" },
    { id: "ja6k-9", term: "\u304f\u3064 (kutsu)", translation: "zapatos", example: "\u304f\u3064\u3092 \u304b\u3044\u307e\u3059\u3002(Kutsu o kaimasu.)" },
    { id: "ja6k-10", term: "\u3053\u308c\u3092 \u304f\u3060\u3055\u3044 (kore o kudasai)", translation: "deme esto, por favor", example: "\u3053\u306e\u304f\u3064\u3092 \u304f\u3060\u3055\u3044\u3002(Kono kutsu o kudasai.)" },
    { id: "ja6k-11", term: "\u305c\u3093\u3076\u3067 (zenbu de)", translation: "en total", example: "\u305c\u3093\u3076\u3067 \u3044\u304f\u3089\u3067\u3059\u304b\u3002(Zenbu de ikura desu ka.)" },
    { id: "ja6k-12", term: "\u3061\u3087\u3046\u3069\u3044\u3044 (ch\u014ddo\u012b)", translation: "exacto (dinero justo)", example: "\u3061\u3087\u3046\u3069\u3044\u3044\u3067\u3059\u3002(Ch\u014dd\u014d\u012b desu.)" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "ja6k-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: \u307f\u305b\u3067 \u304b\u3044\u3082\u306e (de compras en la tienda)",
      intro: "Competencia de LECTURA. Lee DOS textos en japones (con romaji de apoyo) y responde las preguntas.",
      content: {
        reading:
          "\u3076\u3093\u3057\u3087\u3046 1 - \u304f\u3064\u306e \u307f\u305b (la zapateria)\n" +
          "\u3053\u306e\u307f\u305b\u306b \u304f\u3064\u304c \u305f\u304f\u3055\u3093 \u3042\u308a\u307e\u3059\u3002\u304a\u304b\u306a\u304f\u3064\u306f \u3044\u3061\u307e\u3093\u3048\u3093\u3067\u3059\u3002\n" +
          "(Kono mise ni kutsu ga takusan arimasu. Aka-i kutsu wa ichi-man-en desu.)\n" +
          "\u304d\u3044\u308d\u3044\u304f\u3064\u306f \u3054\u305b\u3093\u3048\u3093\u3067\u3059\u3002\u304d\u3044\u308d\u3044\u304f\u3064\u306e\u307b\u3046\u304c \u3084\u3059\u3044\u3067\u3059\u3002\n" +
          "(Kiiro-i kutsu wa go-sen-en desu. Kiiro-i kutsu no h\u014d ga yasui desu.)\n" +
          "\u3042\u304b\u3044\u304f\u3064\u306f \u305f\u304b\u3044\u3067\u3059\u304c\u3001\u3068\u3066\u3082 \u304b\u3063\u3053\u3044\u3044\u3067\u3059\u3002\n" +
          "(Aka-i kutsu wa takai desu ga, totemo kakkoii desu.)\n\n" +
          "\u3076\u3093\u3057\u3087\u3046 2 - \u304a\u307f\u305e\u3067 (en la caja)\n" +
          "A: \u3059\u307f\u307e\u305b\u3093\u3002\u3053\u306e\u304f\u3064\u306f \u3044\u304f\u3089\u3067\u3059\u304b\u3002(Sumimasen. Kono kutsu wa ikura desu ka.)\n" +
          "B: \u3054\u305b\u3093\u3048\u3093\u3067\u3059\u3002(Go-sen-en desu.)\n" +
          "A: \u3058\u3083\u3042\u3001\u3053\u308c\u3092 \u304f\u3060\u3055\u3044\u3002\u3075\u304f\u3082 \u3072\u3068\u3064 \u3044\u304b\u304c\u3067\u3059\u304b\u3002(Jaa, kore o kudasai. Fuku mo hitotsu ikaga desu ka.)\n" +
          "B: \u3044\u3044\u3048\u3001\u304f\u3064\u3060\u3051 \u3067\u3044\u3044\u3067\u3059\u3002\u305c\u3093\u3076\u3067 \u3044\u304f\u3089\u3067\u3059\u304b\u3002(Iie, kutsu dake de ii desu. Zenbu de ikura desu ka.)\n" +
          "A: \u3054\u305b\u3093\u3048\u3093\u3067\u3059\u3002(Go-sen-en desu.)",
        readingEs: [
          "Texto 1 - la zapater\u00eda",
          "En esta tienda hay muchos zapatos. Los zapatos rojos cuestan diez mil yenes.",
          "Los zapatos amarillos cuestan cinco mil yenes. Los zapatos amarillos son m\u00e1s baratos.",
          "Los zapatos rojos son caros, pero son muy elegantes.",
          "Texto 2 - en la caja",
          "A: Disculpe. \u00bfCu\u00e1nto cuestan estos zapatos?",
          "B: Cinco mil yenes.",
          "A: Entonces, deme estos. \u00bfQuiere tambi\u00e9n una prenda de ropa?",
          "B: No, con los zapatos est\u00e1 bien. \u00bfCu\u00e1nto es en total?",
          "A: Cinco mil yenes.",
        ],
        glossary: [
          { term: "\u305f\u304f\u3055\u3093 (takusan)", translation: "muchos/muchas" },
          { term: "\u306e\u307b\u3046\u304c (no h\u014d ga)", translation: "... es mas (comparacion)" },
          { term: "\u3067\u3059\u304c (desu ga)", translation: "pero" },
          { term: "\u304b\u3063\u3053\u3044\u3044 (kakkoii)", translation: "elegante / genial" },
          { term: "\u3058\u3083\u3042 (jaa)", translation: "entonces (informal)" },
          { term: "\u3067\u3044\u3044\u3067\u3059 (de ii desu)", translation: "con eso esta bien / asi esta bien" },
        ],
        keyPhrases: [
          "Busca los PRECIOS de cada cosa y compara cual es mas cara.",
          "\u3044\u304f\u3089\u3067\u3059\u304b se usa para UNA cosa; \u305c\u3093\u3076\u3067\u3044\u304f\u3089\u3067\u3059\u304b para el TOTAL.",
        ],
        check: [
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3042\u304b\u3044\u304f\u3064\u306f \u3044\u304f\u3089\u3067\u3059\u304b\u3002", choices: ["\u3054\u305b\u3093\u3048\u3093 (5,000)", "\u3044\u3061\u307e\u3093\u3048\u3093 (10,000)", "\u3072\u3083\u304f\u3048\u3093 (100)"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u304d\u3044\u308d\u3044\u304f\u3064\u306f \u3044\u304f\u3089\u3067\u3059\u304b\u3002", choices: ["\u3054\u305b\u3093\u3048\u3093 (5,000)", "\u3044\u3061\u307e\u3093\u3048\u3093 (10,000)", "\u305b\u3093\u3048\u3093 (1,000)"], answer: 0 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3069\u3061\u3089\u306e \u304f\u3064\u304c \u3084\u3059\u3044\u3067\u3059\u304b\u3002", choices: ["\u3042\u304b\u3044\u304f\u3064", "\u304d\u3044\u308d\u3044\u304f\u3064", "\u3069\u3061\u3089\u3082 \u304a\u306a\u3058"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: A\u3055\u3093\u306f \u4f55\u3092 \u304b\u3044\u307e\u3059\u304b\u3002", choices: ["\u304f\u3064\u3060\u3051", "\u3075\u304f\u3060\u3051", "\u304f\u3064\u3068\u3075\u304f"], answer: 0 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: \u304f\u3064\u306f \u3044\u304f\u3089\u3067\u3059\u304b\u3002", choices: ["\u3054\u305b\u3093\u3048\u3093", "\u3044\u3061\u307e\u3093\u3048\u3093", "\u305b\u3093\u3048\u3093"], answer: 0 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: \u305c\u3093\u3076\u3067 \u3044\u304f\u3089\u3067\u3059\u304b\u3002", choices: ["\u3044\u3061\u307e\u3093\u3048\u3093", "\u3054\u305b\u3093\u3048\u3093", "\u306b\u305b\u3093\u3048\u3093"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "ja6k-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: \u304a\u304b\u306d\u3068 \u304b\u3044\u3082\u306e (dinero y compras)",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "\u3044\u304f\u3089\u3067\u3059\u304b (ikura desu ka)", translation: "cuanto cuesta?" },
        { term: "\u5186 (en)", translation: "yenes" },
        { term: "\u305f\u304b\u3044 / \u3084\u3059\u3044 (takai / yasui)", translation: "caro / barato" },
        { term: "\u3072\u3083\u304f / \u305b\u3093 / \u307e\u3093 (hyaku / sen / man)", translation: "cien / mil / diez mil" },
        { term: "\u307f\u305b (mise)", translation: "tienda" },
        { term: "\u304b\u3044\u307e\u3059 (kaimasu)", translation: "comprar" },
        { term: "\u3075\u304f / \u304f\u3064 (fuku / kutsu)", translation: "ropa / zapatos" },
        { term: "\u305c\u3093\u3076\u3067 (zenbu de)", translation: "en total" },
      ],
      activities: [
        {
          id: "ja6k-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "\u305f\u304b\u3044 (takai)", right: "Caro" },
            { left: "\u3084\u3059\u3044 (yasui)", right: "Barato" },
            { left: "\u307f\u305b (mise)", right: "Tienda" },
            { left: "\u304b\u3044\u307e\u3059 (kaimasu)", right: "Comprar" },
          ] },
        },
        {
          id: "ja6k-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "\u3075\u304f (fuku)", right: "Ropa" },
            { left: "\u304f\u3064 (kutsu)", right: "Zapatos" },
            { left: "\u5186 (en)", right: "Yenes" },
            { left: "\u305c\u3093\u3076\u3067 (zenbu de)", right: "En total" },
          ] },
        },
        {
          id: "ja6k-vocab-a3", type: "multiple_choice",
          prompt: "Como preguntas 'cuanto cuesta'?",
          payload: { choices: ["\u306a\u3093\u3067\u3059\u304b (nan desu ka)", "\u3044\u304f\u3089\u3067\u3059\u304b (ikura desu ka)", "\u3069\u3053\u3067\u3059\u304b (doko desu ka)"], answer: 1 },
          explain: "\u3044\u304f\u3089\u3067\u3059\u304b (ikura desu ka) = cuanto cuesta?",
        },
        {
          id: "ja6k-vocab-a4", type: "multiple_choice",
          prompt: "Cual numero es \u305b\u3093 (sen)?",
          payload: { choices: ["100", "1,000", "10,000"], answer: 1 },
          explain: "\u3072\u3083\u304f=100, \u305b\u3093=1,000, \u307e\u3093=10,000.",
        },
        {
          id: "ja6k-vocab-a5", type: "multiple_choice",
          prompt: "Cual numero es \u307e\u3093 (man)?",
          payload: { choices: ["100", "1,000", "10,000"], answer: 2 },
          explain: "\u307e\u3093 (man) = 10,000.",
        },
        {
          id: "ja6k-vocab-a6", type: "multiple_choice",
          prompt: "Lo opuesto de \u305f\u304b\u3044 (caro) es:",
          payload: { choices: ["\u3084\u3059\u3044 (yasui)", "\u304a\u3044\u3057\u3044 (oishii)", "\u3059\u304d (suki)"], answer: 0 },
          explain: "\u3084\u3059\u3044 (yasui) = barato.",
        },
        {
          id: "ja6k-vocab-a7", type: "multiple_choice",
          prompt: "Cual es 'ropa'?",
          payload: { choices: ["\u304f\u3064 (kutsu)", "\u3075\u304f (fuku)", "\u307f\u305b (mise)"], answer: 1 },
          explain: "\u3075\u304f (fuku) = ropa.",
        },
        {
          id: "ja6k-vocab-a8", type: "multiple_choice",
          prompt: "Como pides el TOTAL de la cuenta?",
          payload: { choices: ["\u3044\u304f\u3089\u3067\u3059\u304b", "\u305c\u3093\u3076\u3067 \u3044\u304f\u3089\u3067\u3059\u304b", "\u3053\u308c\u306f \u306a\u3093\u3067\u3059\u304b"], answer: 1 },
          explain: "\u305c\u3093\u3076\u3067 \u3044\u304f\u3089\u3067\u3059\u304b = cuanto es en total?",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "ja6k-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: numeros para dinero + \u3053\u308c\u3092 \u304f\u3060\u3055\u3044",
      intro: "Competencia de GRAMATICA. Aprende a formar numeros grandes (\u5186) y a pedir algo para comprarlo.",
      grammar: {
        title: "Numeros + \u5186 (en) y \u3053\u308c/\u305d\u308c/\u3042\u308c\u3092 \u304f\u3060\u3055\u3044",
        form: "[numero] + \u5186 (en)   /   \u3053\u308c/\u305d\u308c/\u3042\u308c + \u3092 (wo) + \u304f\u3060\u3055\u3044",
        desc: "Sirve para decir precios y para pedir que te den algo en una tienda.",
        rule: "Los numeros japoneses se agrupan de 4 en 4 (no de 3 como en espanol): \u3072\u3083\u304f (100), \u305b\u3093 (1,000), \u307e\u3093 (10,000). '\u3054\u305b\u3093' (go-sen) = 5 x 1,000 = 5,000. Para pedir algo, se usa \u3053\u308c/\u305d\u308c/\u3042\u308c (de la unidad de familia) + \u3092 + \u304f\u3060\u3055\u3044: '\u3053\u308c\u3092 \u304f\u3060\u3055\u3044' = 'deme esto'.",
        table: {
          headers: ["Numero", "Valor", "Ejemplo con \u5186"],
          rows: [
            ["\u3072\u3083\u304f (hyaku)", "100", "\u3054\u3072\u3083\u304f\u3048\u3093 (500 yenes)"],
            ["\u305b\u3093 (sen)", "1,000", "\u3055\u3093\u305c\u3093\u3048\u3093 (3,000 yenes)"],
            ["\u307e\u3093 (man)", "10,000", "\u3044\u3061\u307e\u3093\u3048\u3093 (10,000 yenes)"],
          ],
        },
        examples: [
          "\u3053\u306e\u304f\u3064\u306f *\u3054\u305b\u3093\u3048\u3093* \u3067\u3059\u3002 (Kono kutsu wa go-sen-en desu.)",
          "\u3042\u304b\u3044\u3075\u304f\u306f *\u3044\u3061\u307e\u3093\u3048\u3093* \u3067\u3059\u3002 (Aka-i fuku wa ichi-man-en desu.)",
          "\u3053\u308c*\u3092* \u304f\u3060\u3055\u3044\u3002 (Kore o kudasai.)",
          "\u305c\u3093\u3076\u3067 \u3044\u304f\u3089\u3067\u3059\u304b\u3002 (Zenbu de ikura desu ka.)",
        ],
        explain: { tr: ["Estos zapatos cuestan 5,000 yenes.", "La ropa roja cuesta 10,000 yenes.", "Deme esto, por favor.", "¿Cuánto es en total?"] },
        mistakes: [
          { wrong: "\u3054\u305b\u3093 \u3048\u3093 \u3067\u3059\u3002 (separado mal)", right: "\u3054\u305b\u3093\u3048\u3093 \u3067\u3059\u3002" },
          { wrong: "\u3053\u308c\u304c \u304f\u3060\u3055\u3044\u3002 (\u304c en vez de \u3092)", right: "\u3053\u308c\u3092 \u304f\u3060\u3055\u3044\u3002" },
          { wrong: "\u3044\u304f\u3089 \u3067\u3059\u304b\u3002 (falta particula implicita, se oye incompleto)", right: "\u3044\u304f\u3089\u3067\u3059\u304b\u3002" },
        ],
      },
      activities: [
        {
          id: "ja6k-gram-a1", type: "multiple_choice",
          prompt: "\u3054\u305b\u3093\u3048\u3093 significa:",
          payload: { choices: ["500 yenes", "5,000 yenes", "50,000 yenes"], answer: 1 },
          explain: "\u3054 (go) = 5, \u305b\u3093 (sen) = 1,000 -> 5,000.",
        },
        {
          id: "ja6k-gram-a2", type: "multiple_choice",
          prompt: "\u3044\u3061\u307e\u3093\u3048\u3093 significa:",
          payload: { choices: ["1,000 yenes", "10,000 yenes", "100 yenes"], answer: 1 },
          explain: "\u3044\u3061 (ichi) = 1, \u307e\u3093 (man) = 10,000.",
        },
        {
          id: "ja6k-gram-a3", type: "cloze",
          prompt: "Completa: '\u3053\u308c___ \u304f\u3060\u3055\u3044\u3002' (particula: wo)",
          payload: { answer: "\u3092" },
          explain: "\u3053\u308c + \u3092 + \u304f\u3060\u3055\u3044 = deme esto.",
        },
        {
          id: "ja6k-gram-a4", type: "multiple_choice",
          prompt: "Elige la frase CORRECTA para pedir unos zapatos:",
          payload: { choices: ["\u304f\u3064\u304c \u304f\u3060\u3055\u3044\u3002", "\u304f\u3064\u3092 \u304f\u3060\u3055\u3044\u3002", "\u304f\u3064\u3067\u3059 \u304f\u3060\u3055\u3044\u3002"], answer: 1 },
        },
        {
          id: "ja6k-gram-a5", type: "word_bank",
          prompt: "Ordena: 'Cuanto cuestan los zapatos?' (kutsu/wa/ikura/desu/ka):",
          payload: { words: ["\u3067\u3059\u304b", "\u304f\u3064\u306f", "\u3044\u304f\u3089"], answer: ["\u304f\u3064\u306f", "\u3044\u304f\u3089", "\u3067\u3059\u304b"] },
          explain: "Orden: \u304f\u3064\u306f + \u3044\u304f\u3089 + \u3067\u3059\u304b.",
        },
        {
          id: "ja6k-gram-a6", type: "word_bank",
          prompt: "Ordena: 'Deme esta ropa, por favor' (kono/fuku/wo/kudasai):",
          payload: { words: ["\u304f\u3060\u3055\u3044", "\u3053\u306e\u3075\u304f", "\u3092"], answer: ["\u3053\u306e\u3075\u304f", "\u3092", "\u304f\u3060\u3055\u3044"] },
          explain: "Orden: \u3053\u306e\u3075\u304f + \u3092 + \u304f\u3060\u3055\u3044.",
        },
        {
          id: "ja6k-gram-a7", type: "multiple_choice",
          prompt: "Como preguntas el TOTAL de todo?",
          payload: { choices: ["\u3053\u308c\u306f \u3044\u304f\u3089\u3067\u3059\u304b", "\u305c\u3093\u3076\u3067 \u3044\u304f\u3089\u3067\u3059\u304b", "\u3069\u3053\u3067 \u304b\u3044\u307e\u3059\u304b"], answer: 1 },
        },
        {
          id: "ja6k-gram-a8", type: "multiple_choice",
          prompt: "'\u3053\u306e\u304f\u3064\u306f \u305f\u304b\u3044\u3067\u3059\u3002' significa:",
          payload: { choices: ["Estos zapatos son baratos.", "Estos zapatos son caros.", "Me gustan estos zapatos."], answer: 1 },
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "ja6k-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: \u307f\u305b\u3067\u306e \u304b\u3044\u3082\u306e (compra algo en la tienda)",
      intro: "Competencia de ESCRITURA. Construye una pequena escena de compras, frase por frase.",
      activities: [
        {
          id: "ja6k-write-a1", type: "word_bank",
          prompt: "1. Pregunta cuanto cuestan los zapatos:",
          payload: { words: ["\u3067\u3059\u304b", "\u304f\u3064\u306f", "\u3044\u304f\u3089"], answer: ["\u304f\u3064\u306f", "\u3044\u304f\u3089", "\u3067\u3059\u304b"] },
        },
        {
          id: "ja6k-write-a2", type: "word_bank",
          prompt: "2. Di que cuesta 5,000 yenes:",
          payload: { words: ["\u3067\u3059", "\u3054\u305b\u3093\u3048\u3093"], answer: ["\u3054\u305b\u3093\u3048\u3093", "\u3067\u3059"] },
        },
        {
          id: "ja6k-write-a3", type: "word_bank",
          prompt: "3. Pide eso (deme eso):",
          payload: { words: ["\u304f\u3060\u3055\u3044", "\u305d\u308c", "\u3092"], answer: ["\u305d\u308c", "\u3092", "\u304f\u3060\u3055\u3044"] },
        },
        {
          id: "ja6k-write-a4", type: "word_bank",
          prompt: "4. Di que es barato:",
          payload: { words: ["\u3067\u3059", "\u3084\u3059\u3044"], answer: ["\u3084\u3059\u3044", "\u3067\u3059"] },
        },
        {
          id: "ja6k-write-a5", type: "word_bank",
          prompt: "5. Pregunta el total:",
          payload: { words: ["\u3044\u304f\u3089\u3067\u3059\u304b", "\u305c\u3093\u3076\u3067"], answer: ["\u305c\u3093\u3076\u3067", "\u3044\u304f\u3089\u3067\u3059\u304b"] },
        },
        {
          id: "ja6k-write-a6", type: "multiple_choice",
          prompt: "6. El empleado dice '\u3054\u305b\u3093\u3048\u3093\u3067\u3059'. Tu quieres comprarlo:",
          payload: { choices: ["\u3053\u308c\u3092 \u304f\u3060\u3055\u3044\u3002", "\u3053\u308c\u304c \u304d\u3089\u3044\u3067\u3059\u3002", "\u3053\u308c\u306f \u304a\u3044\u3057\u3044\u3067\u3059\u3002"], answer: 0 },
        },
        {
          id: "ja6k-write-a7", type: "multiple_choice",
          prompt: "7. Cual es una buena forma de preguntar el precio de ALGO ESPECIFICO?",
          payload: { choices: ["\u3053\u306e\u304f\u3064\u306f \u3044\u304f\u3089\u3067\u3059\u304b\u3002", "\u304a\u306a\u307e\u3048\u306f\uff1f", "\u3069\u3053\u3067\u3059\u304b\u3002"], answer: 0 },
        },
        {
          id: "ja6k-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase esta BIEN formada?",
          payload: { choices: ["\u3053\u306e\u304f\u3064\u306f \u305f\u304b\u3044\u3067\u3059\u3002", "\u3053\u306e\u304f\u3064\u304c \u305f\u304b\u3044\u3092\u3002", "\u305f\u304b\u3044 \u3053\u306e\u304f\u3064\u3067\u3059\u3002"], answer: 0 },
        },
      ],
    },
  ],
};
