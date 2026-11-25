/**
 * data/units/ja5-ie.js — Unidad A1 japones "いえ (Ie)" -- la casa,
 * あります/ありません (haber/tener para cosas) y las particulas de lugar.
 */

export const JA5_IE = {
  id: "ja5-ie",
  language: "ja",
  level: "A1",
  title: "\u3044\u3048 (Ie)",
  subtitle: "Describir tu casa con \u3042\u308a\u307e\u3059/\u3042\u308a\u307e\u305b\u3093",

  cando: [
    "Puedo nombrar cuartos y muebles de la casa.",
    "Puedo usar \u3042\u308a\u307e\u3059/\u3042\u308a\u307e\u305b\u3093 para decir que hay o no hay algo (cosas).",
    "Puedo diferenciar \u3042\u308a\u307e\u3059 (cosas) de \u3044\u307e\u3059 (personas/animales).",
    "Puedo decir donde esta algo con \u3046\u3048/\u3057\u305f/\u306a\u304b.",
  ],

  vocab: [
    { id: "ja5i-1", term: "\u3044\u3048 (ie)", translation: "casa", example: "\u3053\u308c\u306f \u308f\u305f\u3057\u306e \u3044\u3048\u3067\u3059\u3002(Kore wa watashi no ie desu.)" },
    { id: "ja5i-2", term: "\u3078\u3084 (heya)", translation: "cuarto / habitacion", example: "\u3078\u3084\u306b \u30d9\u30c3\u30c9\u304c \u3042\u308a\u307e\u3059\u3002(Heya ni beddo ga arimasu.)" },
    { id: "ja5i-3", term: "\u30c6\u30fc\u30d6\u30eb (t\u0113buru)", translation: "mesa", example: "\u30c6\u30fc\u30d6\u30eb\u306e \u3046\u3048\u306b \u307b\u3093\u304c \u3042\u308a\u307e\u3059\u3002(T\u0113buru no ue ni hon ga arimasu.)" },
    { id: "ja5i-4", term: "\u3044\u3059 (isu)", translation: "silla", example: "\u3044\u3059\u304c \u3086\u3063\u3064 \u3042\u308a\u307e\u3059\u3002(Isu ga mittsu arimasu.)" },
    { id: "ja5i-5", term: "\u30d9\u30c3\u30c9 (beddo)", translation: "cama", example: "\u30d9\u30c3\u30c9\u306e \u3057\u305f\u306b \u306d\u3053\u304c \u3044\u307e\u3059\u3002(Beddo no shita ni neko ga imasu.)" },
    { id: "ja5i-6", term: "\u30c6\u30ec\u30d3 (terebi)", translation: "television", example: "\u30c6\u30ec\u30d3\u304c \u3042\u308a\u307e\u3059\u3002(Terebi ga arimasu.)" },
    { id: "ja5i-7", term: "\u307b\u3093 (hon)", translation: "libro", example: "\u3064\u304f\u3048\u306e \u3046\u3048\u306b \u307b\u3093\u304c \u3042\u308a\u307e\u3059\u3002(Tsukue no ue ni hon ga arimasu.)" },
    { id: "ja5i-8", term: "\u3064\u304f\u3048 (tsukue)", translation: "escritorio", example: "\u3064\u304f\u3048\u306f \u3078\u3084\u306e \u306a\u304b\u306b \u3042\u308a\u307e\u3059\u3002(Tsukue wa heya no naka ni arimasu.)" },
    { id: "ja5i-9", term: "\u3042\u308a\u307e\u3059 / \u3042\u308a\u307e\u305b\u3093 (arimasu / arimasen)", translation: "hay (cosas) / no hay", example: "\u30c6\u30fc\u30d6\u30eb\u304c \u3042\u308a\u307e\u305b\u3093\u3002(T\u0113buru ga arimasen.)" },
    { id: "ja5i-10", term: "\u3069\u3053 (doko)", translation: "donde", example: "\u307b\u3093\u306f \u3069\u3053\u306b \u3042\u308a\u307e\u3059\u304b\u3002(Hon wa doko ni arimasu ka.)" },
    { id: "ja5i-11", term: "\u3046\u3048 / \u3057\u305f (ue / shita)", translation: "arriba (de) / abajo (de)", example: "\u3044\u3059\u306e \u3057\u305f\u306b \u306d\u3053\u304c \u3044\u307e\u3059\u3002(Isu no shita ni neko ga imasu.)" },
    { id: "ja5i-12", term: "\u306a\u304b (naka)", translation: "dentro (de)", example: "\u3078\u3084\u306e \u306a\u304b\u306b \u30c6\u30fc\u30d6\u30eb\u304c \u3042\u308a\u307e\u3059\u3002(Heya no naka ni t\u0113buru ga arimasu.)" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "ja5i-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: \u308f\u305f\u3057\u306e \u3078\u3084 (mi cuarto)",
      intro: "Competencia de LECTURA. Lee DOS textos en japones (con romaji de apoyo) y responde las preguntas.",
      content: {
        reading:
          "\u3076\u3093\u3057\u3087\u3046 1 - \u30de\u30ea\u30a2\u3055\u3093\u306e \u3078\u3084 (el cuarto de Maria)\n" +
          "\u3053\u308c\u306f \u308f\u305f\u3057\u306e \u3078\u3084\u3067\u3059\u3002\u3078\u3084\u306e \u306a\u304b\u306b \u30c6\u30fc\u30d6\u30eb\u3068 \u3044\u3059\u304c \u3042\u308a\u307e\u3059\u3002\n" +
          "(Kore wa watashi no heya desu. Heya no naka ni t\u0113buru to isu ga arimasu.)\n" +
          "\u30c6\u30fc\u30d6\u30eb\u306e \u3046\u3048\u306b \u307b\u3093\u304c \u305f\u304f\u3055\u3093 \u3042\u308a\u307e\u3059\u3002\u30c6\u30ec\u30d3\u306f \u3042\u308a\u307e\u305b\u3093\u3002\n" +
          "(T\u0113buru no ue ni hon ga takusan arimasu. Terebi wa arimasen.)\n" +
          "\u30d9\u30c3\u30c9\u306e \u3057\u305f\u306b \u306d\u3053\u304c \u3044\u307e\u3059\u3002\u306d\u3053\u306e \u306a\u307e\u3048\u306f \u30df\u30fc\u30ab\u30fc\u3067\u3059\u3002\n" +
          "(Beddo no shita ni neko ga imasu. Neko no namae wa M\u012bk\u0101 desu.)\n\n" +
          "\u3076\u3093\u3057\u3087\u3046 2 - \u307b\u3093\u3092 \u3055\u304c\u3059 (buscando el libro)\n" +
          "A: \u3059\u307f\u307e\u305b\u3093\u3002\u307b\u3093\u306f \u3069\u3053\u306b \u3042\u308a\u307e\u3059\u304b\u3002(Sumimasen. Hon wa doko ni arimasu ka.)\n" +
          "B: \u30c6\u30fc\u30d6\u30eb\u306e \u3046\u3048\u306b \u3042\u308a\u307e\u3059\u3088\u3002(T\u0113buru no ue ni arimasu yo.)\n" +
          "A: \u3042\u3001 \u3042\u308a\u307e\u3057\u305f\u3002\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059\u3002(A, arimashita. Arigat\u014d gozaimasu.)\n" +
          "B: \u3069\u3046\u3044\u305f\u3057\u307e\u3057\u3066\u3002\u306d\u3053\u3082 \u3044\u307e\u3059\u304b\u3002(D\u014d itashimashite. Neko mo imasu ka.)\n" +
          "A: \u306f\u3044\u3001\u30d9\u30c3\u30c9\u306e \u3057\u305f\u306b \u3044\u307e\u3059\u3002(Hai, beddo no shita ni imasu.)",
        readingEs: [
          "Texto 1 - el cuarto de Mar\u00eda",
          "Este es mi cuarto. Dentro del cuarto hay una mesa y una silla.",
          "Sobre la mesa hay muchos libros. No hay televisi\u00f3n.",
          "Debajo de la cama hay un gato. El gato se llama Mika.",
          "Texto 2 - buscando el libro",
          "A: Disculpa. \u00bfD\u00f3nde est\u00e1 el libro?",
          "B: Est\u00e1 sobre la mesa.",
          "A: Ah, lo encontr\u00e9. Muchas gracias.",
          "B: De nada. \u00bfTambi\u00e9n hay un gato?",
          "A: S\u00ed, est\u00e1 debajo de la cama.",
        ],
        glossary: [
          { term: "\u305f\u304f\u3055\u3093 (takusan)", translation: "muchos/muchas" },
          { term: "\u306d\u3053 (neko)", translation: "gato" },
          { term: "\u3059\u307f\u307e\u305b\u3093 (sumimasen)", translation: "disculpe" },
          { term: "\u3088 (yo)", translation: "particula final (enfasis, aviso)" },
          { term: "\u3042\u308a\u307e\u3057\u305f (arimashita)", translation: "pasado de arimasu: lo encontre/habia" },
          { term: "\u3069\u3046\u3044\u305f\u3057\u307e\u3057\u3066 (d\u014d itashimashite)", translation: "de nada" },
        ],
        keyPhrases: [
          "Fijate: los OBJETOS (libro, mesa) usan \u3042\u308a\u307e\u3059; el GATO (ser vivo) usa \u3044\u307e\u3059.",
          "\u3046\u3048/\u3057\u305f/\u306a\u304b + \u306b marcan DONDE esta algo.",
        ],
        check: [
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3078\u3084\u306e \u306a\u304b\u306b \u4f55\u304c \u3042\u308a\u307e\u3059\u304b\u3002", choices: ["\u30c6\u30ec\u30d3\u3060\u3051", "\u30c6\u30fc\u30d6\u30eb\u3068\u3044\u3059", "\u30d9\u30c3\u30c9\u3060\u3051"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u30c6\u30ec\u30d3\u306f \u3042\u308a\u307e\u3059\u304b\u3002", choices: ["\u306f\u3044\u3001\u3042\u308a\u307e\u3059", "\u3044\u3044\u3048\u3001\u3042\u308a\u307e\u305b\u3093", "\u308f\u304b\u308a\u307e\u305b\u3093"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u306d\u3053\u306f \u3069\u3053\u306b \u3044\u307e\u3059\u304b\u3002", choices: ["\u30c6\u30fc\u30d6\u30eb\u306e \u3046\u3048", "\u30d9\u30c3\u30c9\u306e \u3057\u305f", "\u3078\u3084\u306e \u306a\u304b"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: \u307b\u3093\u306f \u3069\u3053\u306b \u3042\u308a\u307e\u3059\u304b\u3002", choices: ["\u3044\u3059\u306e \u3057\u305f", "\u30c6\u30fc\u30d6\u30eb\u306e \u3046\u3048", "\u30d9\u30c3\u30c9\u306e \u3057\u305f"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: A\u3055\u3093\u306f \u307b\u3093\u3092 \u898b\u3064\u3051\u307e\u3057\u305f\u304b\u3002", choices: ["\u306f\u3044", "\u3044\u3044\u3048", "\u308f\u304b\u308a\u307e\u305b\u3093"], answer: 0 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: \u306d\u3053\u306f \u3069\u3053\u306b \u3044\u307e\u3059\u304b\u3002", choices: ["\u30c6\u30fc\u30d6\u30eb\u306e \u3046\u3048", "\u30d9\u30c3\u30c9\u306e \u3057\u305f", "\u3078\u3084\u306e \u306a\u304b"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "ja5i-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: \u3044\u3048\u306e \u306a\u304b (dentro de la casa)",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "\u3044\u3048 / \u3078\u3084 (ie / heya)", translation: "casa / cuarto" },
        { term: "\u30c6\u30fc\u30d6\u30eb / \u3044\u3059 (t\u0113buru / isu)", translation: "mesa / silla" },
        { term: "\u30d9\u30c3\u30c9 (beddo)", translation: "cama" },
        { term: "\u30c6\u30ec\u30d3 (terebi)", translation: "television" },
        { term: "\u307b\u3093 / \u3064\u304f\u3048 (hon / tsukue)", translation: "libro / escritorio" },
        { term: "\u3042\u308a\u307e\u3059 / \u3042\u308a\u307e\u305b\u3093 (arimasu / arimasen)", translation: "hay (cosas) / no hay" },
        { term: "\u3069\u3053 (doko)", translation: "donde" },
        { term: "\u3046\u3048 / \u3057\u305f / \u306a\u304b (ue / shita / naka)", translation: "arriba / abajo / dentro" },
      ],
      activities: [
        {
          id: "ja5i-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "\u3044\u3048 (ie)", right: "Casa" },
            { left: "\u3078\u3084 (heya)", right: "Cuarto" },
            { left: "\u30c6\u30fc\u30d6\u30eb (t\u0113buru)", right: "Mesa" },
            { left: "\u3044\u3059 (isu)", right: "Silla" },
          ] },
        },
        {
          id: "ja5i-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "\u30d9\u30c3\u30c9 (beddo)", right: "Cama" },
            { left: "\u30c6\u30ec\u30d3 (terebi)", right: "Television" },
            { left: "\u307b\u3093 (hon)", right: "Libro" },
            { left: "\u3064\u304f\u3048 (tsukue)", right: "Escritorio" },
          ] },
        },
        {
          id: "ja5i-vocab-a3", type: "multiple_choice",
          prompt: "Para OBJETOS (cosas) usas:",
          payload: { choices: ["\u3044\u307e\u3059 (imasu)", "\u3042\u308a\u307e\u3059 (arimasu)", "\u3067\u3059 (desu)"], answer: 1 },
          explain: "\u3042\u308a\u307e\u3059 = haber/tener, para cosas sin vida.",
        },
        {
          id: "ja5i-vocab-a4", type: "multiple_choice",
          prompt: "Cual palabra significa 'donde'?",
          payload: { choices: ["\u3060\u308c (dare)", "\u3069\u3053 (doko)", "\u306a\u3093 (nan)"], answer: 1 },
          explain: "\u3069\u3053 (doko) = donde. \u3060\u308c (dare) = quien.",
        },
        {
          id: "ja5i-vocab-a5", type: "multiple_choice",
          prompt: "Cual palabra significa 'dentro de'?",
          payload: { choices: ["\u3046\u3048 (ue)", "\u3057\u305f (shita)", "\u306a\u304b (naka)"], answer: 2 },
          explain: "\u306a\u304b (naka) = dentro de.",
        },
        {
          id: "ja5i-vocab-a6", type: "multiple_choice",
          prompt: "Cual palabra significa 'abajo de'?",
          payload: { choices: ["\u3046\u3048 (ue)", "\u3057\u305f (shita)", "\u306a\u304b (naka)"], answer: 1 },
          explain: "\u3057\u305f (shita) = abajo de. \u3046\u3048 (ue) = arriba de.",
        },
        {
          id: "ja5i-vocab-a7", type: "multiple_choice",
          prompt: "Negativo de \u3042\u308a\u307e\u3059:",
          payload: { choices: ["\u3042\u308a\u307e\u305b\u3093 (arimasen)", "\u3042\u308a\u307e\u3057\u305f (arimashita)", "\u3044\u307e\u305b\u3093 (imasen)"], answer: 0 },
          explain: "\u3042\u308a\u307e\u305b\u3093 (arimasen) = no hay (cosas).",
        },
        {
          id: "ja5i-vocab-a8", type: "multiple_choice",
          prompt: "Cual es 'cuarto/habitacion'?",
          payload: { choices: ["\u3044\u3048 (ie)", "\u3078\u3084 (heya)", "\u3064\u304f\u3048 (tsukue)"], answer: 1 },
          explain: "\u3078\u3084 (heya) = cuarto. \u3044\u3048 (ie) = la casa entera.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "ja5i-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: \u3042\u308a\u307e\u3059 (haber, para cosas) + lugar",
      intro: "Competencia de GRAMATICA. Aprende \u3042\u308a\u307e\u3059/\u3042\u308a\u307e\u305b\u3093 y las palabras de lugar \u3046\u3048/\u3057\u305f/\u306a\u304b.",
      grammar: {
        title: "\u3042\u308a\u307e\u3059 (haber/tener, cosas) + lugar + \u306b",
        form: "[lugar] + \u306b (ni) + [cosa] + \u304c (ga) + \u3042\u308a\u307e\u3059",
        desc: "Sirve para decir que hay algo (un objeto) en un lugar, y donde esta.",
        rule: "\u3042\u308a\u307e\u3059 se usa para COSAS (libros, mesas, sillas); \u3044\u307e\u3059 (ya visto en la unidad de familia) se usa para PERSONAS y animales. Para decir DONDE, se usa [lugar] + \u306b (ni): '\u3078\u3084\u306b' (en el cuarto). Las palabras \u3046\u3048 (arriba), \u3057\u305f (abajo) y \u306a\u304b (dentro) se conectan con \u306e: '\u30c6\u30fc\u30d6\u30eb\u306e\u3046\u3048' (arriba de la mesa).",
        table: {
          headers: ["Para...", "Verbo", "Ejemplo"],
          rows: [
            ["cosas (libros, mesas)", "\u3042\u308a\u307e\u3059 / \u3042\u308a\u307e\u305b\u3093", "\u307b\u3093\u304c \u3042\u308a\u307e\u3059 (hay un libro)"],
            ["personas/animales", "\u3044\u307e\u3059 / \u3044\u307e\u305b\u3093", "\u306d\u3053\u304c \u3044\u307e\u3059 (hay un gato)"],
            ["lugar + \u306e + \u3046\u3048/\u3057\u305f/\u306a\u304b", "donde esta algo", "\u3064\u304f\u3048\u306e\u3046\u3048 (arriba del escritorio)"],
          ],
        },
        examples: [
          "\u3078\u3084*\u306b* \u30c6\u30fc\u30d6\u30eb\u304c \u3042\u308a\u307e\u3059\u3002 (Heya ni t\u0113buru ga arimasu.)",
          "\u30c6\u30fc\u30d6\u30eb\u306e *\u3046\u3048\u306b* \u307b\u3093\u304c \u3042\u308a\u307e\u3059\u3002 (T\u0113buru no ue ni hon ga arimasu.)",
          "\u30d9\u30c3\u30c9\u306e *\u3057\u305f\u306b* \u306d\u3053\u304c \u3044\u307e\u3059\u3002 (Beddo no shita ni neko ga imasu.)",
          "\u30c6\u30ec\u30d3\u306f *\u3042\u308a\u307e\u305b\u3093*\u3002 (Terebi wa arimasen.)",
        ],
        explain: { tr: ["Hay una mesa en el cuarto.", "Hay un libro encima de la mesa.", "Hay un gato debajo de la cama.", "No hay television."] },
        mistakes: [
          { wrong: "\u307b\u3093\u304c \u3044\u307e\u3059\u3002 (\u3044\u307e\u3059 para un objeto)", right: "\u307b\u3093\u304c \u3042\u308a\u307e\u3059\u3002" },
          { wrong: "\u306d\u3053\u304c \u3042\u308a\u307e\u3059\u3002 (\u3042\u308a\u307e\u3059 para un ser vivo)", right: "\u306d\u3053\u304c \u3044\u307e\u3059\u3002" },
          { wrong: "\u30c6\u30fc\u30d6\u30eb \u3046\u3048\u306b \u307b\u3093\u304c \u3042\u308a\u307e\u3059\u3002 (falta \u306e)", right: "\u30c6\u30fc\u30d6\u30eb\u306e \u3046\u3048\u306b \u307b\u3093\u304c \u3042\u308a\u307e\u3059\u3002" },
        ],
      },
      activities: [
        {
          id: "ja5i-gram-a1", type: "multiple_choice",
          prompt: "Para un LIBRO (objeto) usas:",
          payload: { choices: ["\u3044\u307e\u3059", "\u3042\u308a\u307e\u3059", "\u3067\u3059"], answer: 1 },
          explain: "Los objetos usan \u3042\u308a\u307e\u3059.",
        },
        {
          id: "ja5i-gram-a2", type: "multiple_choice",
          prompt: "Para un GATO (animal) usas:",
          payload: { choices: ["\u3044\u307e\u3059", "\u3042\u308a\u307e\u3059", "\u304b\u3044\u307e\u3059"], answer: 0 },
          explain: "Los seres vivos usan \u3044\u307e\u3059.",
        },
        {
          id: "ja5i-gram-a3", type: "cloze",
          prompt: "Completa: '\u3064\u304f\u3048\u306e___ \u307b\u3093\u304c \u3042\u308a\u307e\u3059\u3002' (arriba de)",
          payload: { answer: "\u3046\u3048" },
          explain: "\u3046\u3048 = arriba de.",
        },
        {
          id: "ja5i-gram-a4", type: "multiple_choice",
          prompt: "Elige la frase CORRECTA:",
          payload: { choices: ["\u3078\u3084\u306b \u30c6\u30fc\u30d6\u30eb\u304c \u3042\u308a\u307e\u3059\u3002", "\u3078\u3084\u306f \u30c6\u30fc\u30d6\u30eb\u3092 \u3042\u308a\u307e\u3059\u3002", "\u30c6\u30fc\u30d6\u30eb\u306b \u3078\u3084\u304c \u3042\u308a\u307e\u3059\u3002"], answer: 0 },
          explain: "Orden: [lugar] + \u306b + [cosa] + \u304c + \u3042\u308a\u307e\u3059.",
        },
        {
          id: "ja5i-gram-a5", type: "word_bank",
          prompt: "Ordena: 'Hay una mesa en el cuarto' (heya/ni/teburu/ga/arimasu):",
          payload: { words: ["\u3042\u308a\u307e\u3059", "\u3078\u3084", "\u306b", "\u30c6\u30fc\u30d6\u30eb", "\u304c"], answer: ["\u3078\u3084", "\u306b", "\u30c6\u30fc\u30d6\u30eb", "\u304c", "\u3042\u308a\u307e\u3059"] },
          explain: "Orden: \u3078\u3084 + \u306b + \u30c6\u30fc\u30d6\u30eb + \u304c + \u3042\u308a\u307e\u3059.",
        },
        {
          id: "ja5i-gram-a6", type: "word_bank",
          prompt: "Ordena: 'Hay un gato debajo de la cama' (beddo/no/shita/ni/neko/ga/imasu):",
          payload: { words: ["\u3044\u307e\u3059", "\u30d9\u30c3\u30c9\u306e", "\u3057\u305f", "\u306b", "\u306d\u3053", "\u304c"], answer: ["\u30d9\u30c3\u30c9\u306e", "\u3057\u305f", "\u306b", "\u306d\u3053", "\u304c", "\u3044\u307e\u3059"] },
          explain: "Orden: \u30d9\u30c3\u30c9\u306e + \u3057\u305f + \u306b + \u306d\u3053 + \u304c + \u3044\u307e\u3059.",
        },
        {
          id: "ja5i-gram-a7", type: "multiple_choice",
          prompt: "Como preguntas 'donde esta el libro?'",
          payload: { choices: ["\u307b\u3093\u306f \u3069\u3053\u306b \u3042\u308a\u307e\u3059\u304b\u3002", "\u307b\u3093\u306f \u3060\u308c\u3067\u3059\u304b\u3002", "\u307b\u3093\u306f \u306a\u3093\u3067\u3059\u304b\u3002"], answer: 0 },
        },
        {
          id: "ja5i-gram-a8", type: "multiple_choice",
          prompt: "'\u30c6\u30ec\u30d3\u306f \u3042\u308a\u307e\u305b\u3093\u3002' significa:",
          payload: { choices: ["Hay una television.", "No hay television.", "Veo television."], answer: 1 },
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "ja5i-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: \u308f\u305f\u3057\u306e \u3078\u3084 (describe tu cuarto)",
      intro: "Competencia de ESCRITURA. Describe tu cuarto, frase por frase.",
      activities: [
        {
          id: "ja5i-write-a1", type: "word_bank",
          prompt: "1. Di que hay una mesa en tu cuarto:",
          payload: { words: ["\u3042\u308a\u307e\u3059", "\u3078\u3084\u306b", "\u30c6\u30fc\u30d6\u30eb\u304c"], answer: ["\u3078\u3084\u306b", "\u30c6\u30fc\u30d6\u30eb\u304c", "\u3042\u308a\u307e\u3059"] },
        },
        {
          id: "ja5i-write-a2", type: "word_bank",
          prompt: "2. Di que hay un libro encima de la mesa:",
          payload: { words: ["\u3042\u308a\u307e\u3059", "\u30c6\u30fc\u30d6\u30eb\u306e\u3046\u3048\u306b", "\u307b\u3093\u304c"], answer: ["\u30c6\u30fc\u30d6\u30eb\u306e\u3046\u3048\u306b", "\u307b\u3093\u304c", "\u3042\u308a\u307e\u3059"] },
        },
        {
          id: "ja5i-write-a3", type: "word_bank",
          prompt: "3. Di que no hay television:",
          payload: { words: ["\u3042\u308a\u307e\u305b\u3093", "\u30c6\u30ec\u30d3\u306f"], answer: ["\u30c6\u30ec\u30d3\u306f", "\u3042\u308a\u307e\u305b\u3093"] },
        },
        {
          id: "ja5i-write-a4", type: "word_bank",
          prompt: "4. Di que hay un gato debajo de la cama:",
          payload: { words: ["\u3044\u307e\u3059", "\u30d9\u30c3\u30c9\u306e\u3057\u305f\u306b", "\u306d\u3053\u304c"], answer: ["\u30d9\u30c3\u30c9\u306e\u3057\u305f\u306b", "\u306d\u3053\u304c", "\u3044\u307e\u3059"] },
        },
        {
          id: "ja5i-write-a5", type: "word_bank",
          prompt: "5. Pregunta donde esta el libro:",
          payload: { words: ["\u3042\u308a\u307e\u3059\u304b", "\u307b\u3093\u306f", "\u3069\u3053\u306b"], answer: ["\u307b\u3093\u306f", "\u3069\u3053\u306b", "\u3042\u308a\u307e\u3059\u304b"] },
        },
        {
          id: "ja5i-write-a6", type: "multiple_choice",
          prompt: "6. Alguien pregunta '\u307b\u3093\u306f\u3069\u3053\u306b\u3042\u308a\u307e\u3059\u304b'. Respondes 'esta encima de la mesa':",
          payload: { choices: ["\u30c6\u30fc\u30d6\u30eb\u306e\u3046\u3048\u306b \u3042\u308a\u307e\u3059\u3002", "\u30c6\u30fc\u30d6\u30eb\u304c \u3059\u304d\u3067\u3059\u3002", "\u30c6\u30fc\u30d6\u30eb\u3067\u3059\u304b\u3002"], answer: 0 },
        },
        {
          id: "ja5i-write-a7", type: "multiple_choice",
          prompt: "7. Cual pregunta usarias para saber si hay un gato?",
          payload: { choices: ["\u306d\u3053\u304c \u3044\u307e\u3059\u304b\u3002", "\u306d\u3053\u306f \u304a\u3044\u3057\u3044\u3067\u3059\u304b\u3002", "\u306d\u3053\u306f \u3069\u3053\u3067\u3059\u304b\u3002"], answer: 0 },
        },
        {
          id: "ja5i-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase esta BIEN formada?",
          payload: { choices: ["\u3078\u3084\u306b \u30c6\u30fc\u30d6\u30eb\u304c \u3042\u308a\u307e\u3059\u3002", "\u3078\u3084\u304c \u30c6\u30fc\u30d6\u30eb\u306b \u3044\u307e\u3059\u3002", "\u30c6\u30fc\u30d6\u30eb \u3078\u3084\u306b\u304c \u3042\u308a\u307e\u3059\u3002"], answer: 0 },
        },
      ],
    },
  ],
};
