/**
 * data/units/ja2-kazoku.js — Unidad A1 japones "かぞく (Kazoku)" -- familia,
 * la particula の (no) de posesion, これ/それ/あれ y います/いません.
 *
 * Mismo esquema y convencion que ja1-konnichiwa.js (kana + romaji entre
 * parentesis en cada termino/ejemplo).
 */

export const JA2_KAZOKU = {
  id: "ja2-kazoku",
  language: "ja",
  level: "A1",
  title: "\u304b\u305e\u304f (Kazoku)",
  subtitle: "Hablar de tu familia con \u306e (no) y \u3053\u308c/\u305d\u308c/\u3042\u308c",

  cando: [
    "Puedo nombrar a los miembros de mi familia.",
    "Puedo usar \u306e (no) para decir 'mi/tu/su [algo]'.",
    "Puedo usar \u3053\u308c/\u305d\u308c/\u3042\u308c para senalar personas y objetos.",
    "Puedo preguntar y decir cuantas personas hay en mi familia.",
  ],

  vocab: [
    { id: "ja2k-1", term: "\u304b\u305e\u304f (kazoku)", translation: "familia", example: "\u308f\u305f\u3057\u306e\u304b\u305e\u304f\u306f\u3088\u306b\u3093\u3067\u3059\u3002(Watashi no kazoku wa yo-nin desu.)" },
    { id: "ja2k-2", term: "\u3061\u3061 (chichi)", translation: "mi papa", example: "\u3061\u3061\u306f\u305b\u3093\u305b\u3044\u3067\u3059\u3002(Chichi wa sensei desu.)" },
    { id: "ja2k-3", term: "\u306f\u306f (haha)", translation: "mi mama", example: "\u306f\u306f\u306f\u304b\u3044\u3057\u3083\u3044\u3093\u3067\u3059\u3002(Haha wa kaishain desu.)" },
    { id: "ja2k-4", term: "\u3042\u306b (ani)", translation: "hermano mayor", example: "\u3042\u306b\u306f\u3060\u3044\u304c\u304f\u305b\u3044\u3067\u3059\u3002(Ani wa daigakusei desu.)" },
    { id: "ja2k-5", term: "\u3042\u306d (ane)", translation: "hermana mayor", example: "\u3042\u306d\u306e\u306a\u307e\u3048\u306f\u3086\u304d\u3067\u3059\u3002(Ane no namae wa Yuki desu.)" },
    { id: "ja2k-6", term: "\u304a\u3068\u3046\u3068 (otouto)", translation: "hermano menor", example: "\u304a\u3068\u3046\u3068\u306f\u3044\u307e\u305b\u3093\u3002(Otouto wa imasen.)" },
    { id: "ja2k-7", term: "\u3044\u3082\u3046\u3068 (imouto)", translation: "hermana menor", example: "\u3044\u3082\u3046\u3068\u304c\u3072\u3068\u308a\u3044\u307e\u3059\u3002(Imouto ga hitori imasu.)" },
    { id: "ja2k-8", term: "\u308a\u3087\u3046\u3057\u3093 (ry\u014dshin)", translation: "padres", example: "\u308a\u3087\u3046\u3057\u3093\u306f\u3068\u3046\u304d\u3087\u3046\u306b\u3044\u307e\u3059\u3002(Ry\u014dshin wa T\u014dky\u014d ni imasu.)" },
    { id: "ja2k-9", term: "\u3053\u3069\u3082 (kodomo)", translation: "nino/a, hijo/a", example: "\u3042\u306e\u3072\u3068\u306f\u308f\u305f\u3057\u306e\u3053\u3069\u3082\u3067\u3059\u3002(Ano hito wa watashi no kodomo desu.)" },
    { id: "ja2k-10", term: "\u3053\u308c / \u305d\u308c / \u3042\u308c (kore / sore / are)", translation: "esto / eso / aquello", example: "\u3053\u308c\u306f\u304b\u305e\u304f\u306e\u3057\u3083\u3057\u3093\u3067\u3059\u3002(Kore wa kazoku no shashin desu.)" },
    { id: "ja2k-11", term: "\u306a\u3093\u306b\u3093\u3067\u3059\u304b (nan-nin desu ka)", translation: "cuantas personas?", example: "\u304b\u305e\u304f\u306f\u306a\u3093\u306b\u3093\u3067\u3059\u304b\u3002(Kazoku wa nan-nin desu ka?)" },
    { id: "ja2k-12", term: "\u3072\u3068\u308a\u3001\u3075\u305f\u308a\u3001\u3055\u3093\u306b\u3093 (hitori, futari, san-nin)", translation: "una, dos, tres personas", example: "\u304b\u305e\u304f\u306f\u3055\u3093\u306b\u3093\u3067\u3059\u3002(Kazoku wa san-nin desu.)" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "ja2k-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: \u308f\u305f\u3057\u306e \u304b\u305e\u304f (mi familia)",
      intro: "Competencia de LECTURA. Lee DOS textos en japones (con romaji de apoyo) y responde las preguntas.",
      content: {
        reading:
          "\u3076\u3093\u3057\u3087\u3046 1 - \u3051\u3093\u3055\u3093 (Ken-san)\n" +
          "\u306f\u3058\u3081\u307e\u3057\u3066\u3002\u308f\u305f\u3057\u306f\u3051\u3093\u3067\u3059\u3002\u308f\u305f\u3057\u306e\u304b\u305e\u304f\u306f\u3088\u306b\u3093\u3067\u3059\u3002\n" +
          "(Hajimemashite. Watashi wa Ken desu. Watashi no kazoku wa yo-nin desu.)\n" +
          "\u3061\u3061\u3068\u306f\u306f\u3068\u3042\u306d\u3068\u308f\u305f\u3057\u3067\u3059\u3002\u3061\u3061\u306f\u305b\u3093\u305b\u3044\u3067\u3059\u3002\u306f\u306f\u306f\u304b\u3044\u3057\u3083\u3044\u3093\u3067\u3059\u3002\n" +
          "(Chichi to haha to ane to watashi desu. Chichi wa sensei desu. Haha wa kaishain desu.)\n" +
          "\u3042\u306d\u306e\u306a\u307e\u3048\u306f\u3086\u304d\u3067\u3059\u3002\u3086\u304d\u306f\u3060\u3044\u304c\u304f\u305b\u3044\u3067\u3059\u3002\u3053\u308c\u306f\u304b\u305e\u304f\u306e\u3057\u3083\u3057\u3093\u3067\u3059\u3002\n" +
          "(Ane no namae wa Yuki desu. Yuki wa daigakusei desu. Kore wa kazoku no shashin desu.)\n\n" +
          "\u3076\u3093\u3057\u3087\u3046 2 - \u304b\u305e\u304f\u306b\u3064\u3044\u3066 \u306f\u306a\u3059 (hablando de la familia)\n" +
          "A: \u3051\u3093\u3055\u3093\u306e\u304b\u305e\u304f\u306f\u306a\u3093\u306b\u3093\u3067\u3059\u304b\u3002(Ken-san no kazoku wa nan-nin desu ka.)\n" +
          "B: \u3088\u306b\u3093\u3067\u3059\u3002\u3061\u3061\u3068\u306f\u306f\u3068\u3042\u306d\u3068\u308f\u305f\u3057\u3067\u3059\u3002(Yo-nin desu. Chichi to haha to ane to watashi desu.)\n" +
          "A: \u304a\u3068\u3046\u3068\u3084\u3044\u3082\u3046\u3068\u306f\u3044\u307e\u3059\u304b\u3002(Otouto ya imouto wa imasu ka.)\n" +
          "B: \u3044\u3044\u3048\u3001\u3044\u307e\u305b\u3093\u3002\u3042\u306d\u3060\u3051\u3067\u3059\u3002(Iie, imasen. Ane dake desu.)\n" +
          "A: \u3053\u308c\u306f\u3060\u308c\u3067\u3059\u304b\u3002(Kore wa dare desu ka.)\n" +
          "B: \u3053\u308c\u306f\u308f\u305f\u3057\u306e\u3042\u306d\u3067\u3059\u3002(Kore wa watashi no ane desu.)",
        glossary: [
          { term: "\u3068 (to)", translation: "y (entre sustantivos)" },
          { term: "\u3044\u307e\u3059 / \u3044\u307e\u305b\u3093 (imasu / imasen)", translation: "hay/tengo (persona) / no hay/no tengo" },
          { term: "\u3060\u308c\u3067\u3059\u304b (dare desu ka)", translation: "quien es?" },
          { term: "\u3060\u3051 (dake)", translation: "solamente" },
          { term: "\u3057\u3083\u3057\u3093 (shashin)", translation: "foto" },
        ],
        keyPhrases: [
          "Busca quien es cada miembro de la familia y su ocupacion.",
          "\u3044\u307e\u3059/\u3044\u307e\u305b\u3093 se usa para PERSONAS y animales (no para objetos).",
        ],
        check: [
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3051\u3093\u3055\u3093\u306e\u304b\u305e\u304f\u306f \u306a\u3093\u306b\u3093\u3067\u3059\u304b\u3002", choices: ["\u3055\u3093\u306b\u3093 (3)", "\u3088\u306b\u3093 (4)", "\u3054\u306b\u3093 (5)"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3061\u3061\u306e \u3057\u3054\u3068\u306f\uff1f", choices: ["\u305b\u3093\u305b\u3044 (profesor)", "\u304b\u3044\u3057\u3083\u3044\u3093 (empleado)", "\u304c\u304f\u305b\u3044 (estudiante)"], answer: 0 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u306f\u306f\u306e \u3057\u3054\u3068\u306f\uff1f", choices: ["\u305b\u3093\u305b\u3044", "\u304b\u3044\u3057\u3083\u3044\u3093", "\u3060\u3044\u304c\u304f\u305b\u3044"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3086\u304d\u3055\u3093\u306f \u3060\u308c\u3067\u3059\u304b\u3002", choices: ["\u3051\u3093\u3055\u3093\u306e\u306f\u306f", "\u3051\u3093\u3055\u3093\u306e\u3042\u306d", "\u3051\u3093\u3055\u3093\u306e\u3044\u3082\u3046\u3068"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: \u3051\u3093\u3055\u3093\u306f \u304a\u3068\u3046\u3068\u304c \u3044\u307e\u3059\u304b\u3002", choices: ["\u306f\u3044\u3001\u3044\u307e\u3059", "\u3044\u3044\u3048\u3001\u3044\u307e\u305b\u3093", "\u308f\u304b\u308a\u307e\u305b\u3093"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: \u6700\u5f8c\u306b B\u3055\u3093\u306f \u8ab0\u306e\u3053\u3068\u3092 \u8a00\u3044\u307e\u3059\u304b\u3002(Kore wa...)", choices: ["\u3061\u3061 (papa)", "\u3042\u306d (hermana mayor)", "\u306f\u306f (mama)"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "ja2k-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: \u304b\u305e\u304f (la familia)",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "\u304b\u305e\u304f (kazoku)", translation: "familia" },
        { term: "\u3061\u3061 / \u306f\u306f (chichi / haha)", translation: "papa / mama" },
        { term: "\u3042\u306b / \u3042\u306d (ani / ane)", translation: "hermano mayor / hermana mayor" },
        { term: "\u304a\u3068\u3046\u3068 / \u3044\u3082\u3046\u3068 (otouto / imouto)", translation: "hermano menor / hermana menor" },
        { term: "\u308a\u3087\u3046\u3057\u3093 (ry\u014dshin)", translation: "padres" },
        { term: "\u3053\u3069\u3082 (kodomo)", translation: "nino/a" },
        { term: "\u3053\u308c / \u305d\u308c / \u3042\u308c (kore / sore / are)", translation: "esto / eso / aquello" },
        { term: "\u306a\u3093\u306b\u3093\u3067\u3059\u304b (nan-nin desu ka)", translation: "cuantas personas?" },
      ],
      activities: [
        {
          id: "ja2k-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "\u3061\u3061 (chichi)", right: "Papa" },
            { left: "\u306f\u306f (haha)", right: "Mama" },
            { left: "\u3042\u306b (ani)", right: "Hermano mayor" },
            { left: "\u3042\u306d (ane)", right: "Hermana mayor" },
          ] },
        },
        {
          id: "ja2k-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "\u304a\u3068\u3046\u3068 (otouto)", right: "Hermano menor" },
            { left: "\u3044\u3082\u3046\u3068 (imouto)", right: "Hermana menor" },
            { left: "\u308a\u3087\u3046\u3057\u3093 (ry\u014dshin)", right: "Padres" },
            { left: "\u3053\u3069\u3082 (kodomo)", right: "Nino/a" },
          ] },
        },
        {
          id: "ja2k-vocab-a3", type: "multiple_choice",
          prompt: "Cual palabra significa 'hermano MAYOR'?",
          payload: { choices: ["\u304a\u3068\u3046\u3068 (otouto)", "\u3042\u306b (ani)", "\u3044\u3082\u3046\u3068 (imouto)"], answer: 1 },
          explain: "\u3042\u306b (ani) = hermano mayor. \u304a\u3068\u3046\u3068 (otouto) = hermano MENOR.",
        },
        {
          id: "ja2k-vocab-a4", type: "multiple_choice",
          prompt: "Cual palabra significa 'hermana MENOR'?",
          payload: { choices: ["\u3042\u306d (ane)", "\u3044\u3082\u3046\u3068 (imouto)", "\u304a\u3068\u3046\u3068 (otouto)"], answer: 1 },
          explain: "\u3044\u3082\u3046\u3068 (imouto) = hermana menor. \u3042\u306d (ane) = hermana MAYOR.",
        },
        {
          id: "ja2k-vocab-a5", type: "multiple_choice",
          prompt: "Como preguntas 'cuantas personas hay en tu familia?'",
          payload: { choices: ["\u304c\u304f\u305b\u3044\u3067\u3059\u304b\uff1f", "\u304b\u305e\u304f\u306f \u306a\u3093\u306b\u3093\u3067\u3059\u304b\uff1f", "\u304a\u306a\u307e\u3048\u306f\uff1f"], answer: 1 },
          explain: "'\u304b\u305e\u304f\u306f\u306a\u3093\u306b\u3093\u3067\u3059\u304b' (Kazoku wa nan-nin desu ka) = cuantas personas hay en tu familia?",
        },
        {
          id: "ja2k-vocab-a6", type: "multiple_choice",
          prompt: "Para senalar algo CERCA de ti usas:",
          payload: { choices: ["\u3042\u308c (are)", "\u305d\u308c (sore)", "\u3053\u308c (kore)"], answer: 2 },
          explain: "\u3053\u308c (kore) = esto (cerca de quien habla).",
        },
        {
          id: "ja2k-vocab-a7", type: "multiple_choice",
          prompt: "Para senalar algo LEJOS de los dos usas:",
          payload: { choices: ["\u3053\u308c (kore)", "\u305d\u308c (sore)", "\u3042\u308c (are)"], answer: 2 },
          explain: "\u3042\u308c (are) = aquello (lejos de ambos).",
        },
        {
          id: "ja2k-vocab-a8", type: "multiple_choice",
          prompt: "Cual palabra significa 'padres' (ambos)?",
          payload: { choices: ["\u304b\u305e\u304f (kazoku)", "\u308a\u3087\u3046\u3057\u3093 (ry\u014dshin)", "\u3053\u3069\u3082 (kodomo)"], answer: 1 },
          explain: "\u308a\u3087\u3046\u3057\u3093 (ry\u014dshin) = los padres (papa y mama juntos).",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "ja2k-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: \u306e (no) -- decir 'mi/tu/su...'",
      intro: "Competencia de GRAMATICA. Aprende \u306e (no) para posesion y las palabras \u3053\u308c/\u305d\u308c/\u3042\u308c.",
      grammar: {
        title: "\u306e (no) de posesion",
        form: "[persona] + \u306e (no) + [cosa]  \u2192  *\u308f\u305f\u3057\u306e* \u3061\u3061 (mi papa)",
        desc: "Sirve para decir 'mi/tu/su [algo]' y para presentar personas/objetos con \u3053\u308c/\u305d\u308c/\u3042\u308c.",
        rule: "\u306e conecta un poseedor con lo que posee, como el 'de' en espanol pero AL REVES: '\u308f\u305f\u3057\u306e\u307b\u3093' (watashi no hon) literalmente es 'yo + de + libro' = 'mi libro'. \u3053\u308c (esto, cerca de quien habla), \u305d\u308c (eso, cerca del oyente), \u3042\u308c (aquello, lejos de ambos) senalan cosas o personas.",
        table: {
          headers: ["Patron", "Significado", "Ejemplo"],
          rows: [
            ["\u308f\u305f\u3057\u306e + X (watashi no)", "mi X", "\u308f\u305f\u3057\u306e\u3061\u3061 (mi papa)"],
            ["\u3042\u306a\u305f\u306e + X (anata no)", "tu X", "\u3042\u306a\u305f\u306e\u304b\u305e\u304f (tu familia)"],
            ["[nombre]\u306e + X", "el/la X de [nombre]", "\u3051\u3093\u3055\u3093\u306e\u3042\u306d (la hermana de Ken)"],
          ],
        },
        examples: [
          "\u3053\u308c\u306f *\u308f\u305f\u3057\u306e* \u304b\u305e\u304f\u3067\u3059\u3002 (Kore wa watashi no kazoku desu.)",
          "\u305d\u308c\u306f *\u3042\u306a\u305f\u306e* \u307b\u3093\u3067\u3059\u304b\u3002 (Sore wa anata no hon desu ka.)",
          "\u3042\u308c\u306f *\u305b\u3093\u305b\u3044\u306e* \u304f\u308b\u307e\u3067\u3059\u3002 (Are wa sensei no kuruma desu.)",
          "\u3061\u3061\u306e *\u306a\u307e\u3048* \u306f\u305f\u308d\u3046\u3067\u3059\u3002 (Chichi no namae wa Tar\u014d desu.)",
        ],
        explain: { tr: ["Esta es mi familia.", "Eso, ¿es tu libro?", "Aquello es el carro del profesor.", "El nombre de mi papa es Taro."] },
        mistakes: [
          { wrong: "\u308f\u305f\u3057 \u3061\u3061\u306f \u305b\u3093\u305b\u3044\u3067\u3059\u3002 (sin \u306e)", right: "\u308f\u305f\u3057\u306e \u3061\u3061\u306f \u305b\u3093\u305b\u3044\u3067\u3059\u3002" },
          { wrong: "\u3053\u308c\u306f \u308f\u305f\u3057 \u304b\u305e\u304f\u3067\u3059\u3002 (sin \u306e)", right: "\u3053\u308c\u306f \u308f\u305f\u3057\u306e \u304b\u305e\u304f\u3067\u3059\u3002" },
          { wrong: "\u3042\u308c \u3060\u308c\u3067\u3059\u304b\u3002 (sin \u306f)", right: "\u3042\u308c\u306f \u3060\u308c\u3067\u3059\u304b\u3002" },
        ],
      },
      activities: [
        {
          id: "ja2k-gram-a1", type: "cloze",
          prompt: "Completa: '\u308f\u305f\u3057___ \u3061\u3061\u306f \u305b\u3093\u305b\u3044\u3067\u3059\u3002' (no)",
          payload: { answer: "\u306e" },
          explain: "\u306e conecta 'yo' con 'papa' = 'mi papa'.",
        },
        {
          id: "ja2k-gram-a2", type: "multiple_choice",
          prompt: "Elige la frase CORRECTA:",
          payload: { choices: ["\u3053\u308c\u306f \u308f\u305f\u3057 \u304b\u305e\u304f\u3067\u3059\u3002", "\u3053\u308c\u306f \u308f\u305f\u3057\u306e \u304b\u305e\u304f\u3067\u3059\u3002", "\u3053\u308c \u308f\u305f\u3057\u306e \u306f \u304b\u305e\u304f\u3067\u3059\u3002"], answer: 1 },
          explain: "Orden: \u3053\u308c\u306f + \u308f\u305f\u3057\u306e + \u304b\u305e\u304f + \u3067\u3059.",
        },
        {
          id: "ja2k-gram-a3", type: "multiple_choice",
          prompt: "Senalas algo CERCA del OYENTE (no de ti), usas:",
          payload: { choices: ["\u3053\u308c (kore)", "\u305d\u308c (sore)", "\u3042\u308c (are)"], answer: 1 },
          explain: "\u305d\u308c (sore) = eso, cerca de la otra persona.",
        },
        {
          id: "ja2k-gram-a4", type: "word_bank",
          prompt: "Ordena: 'Esta es mi familia' (kore/wa/watashi/no/kazoku/desu):",
          payload: { words: ["\u3067\u3059", "\u3053\u308c\u306f", "\u304b\u305e\u304f", "\u308f\u305f\u3057\u306e"], answer: ["\u3053\u308c\u306f", "\u308f\u305f\u3057\u306e", "\u304b\u305e\u304f", "\u3067\u3059"] },
          explain: "Orden: \u3053\u308c\u306f + \u308f\u305f\u3057\u306e + \u304b\u305e\u304f + \u3067\u3059.",
        },
        {
          id: "ja2k-gram-a5", type: "word_bank",
          prompt: "Ordena: 'El nombre de mi papa es Taro' (chichi/no/namae/wa/Tarou/desu):",
          payload: { words: ["\u3067\u3059", "\u3061\u3061\u306e", "\u306a\u307e\u3048\u306f", "\u305f\u308d\u3046"], answer: ["\u3061\u3061\u306e", "\u306a\u307e\u3048\u306f", "\u305f\u308d\u3046", "\u3067\u3059"] },
          explain: "Orden: \u3061\u3061\u306e + \u306a\u307e\u3048\u306f + \u305f\u308d\u3046 + \u3067\u3059.",
        },
        {
          id: "ja2k-gram-a6", type: "multiple_choice",
          prompt: "'\u3042\u306d\u306e \u306a\u307e\u3048\u306f \u3086\u304d\u3067\u3059\u3002' significa:",
          payload: { choices: ["Mi nombre es Yuki.", "El nombre de mi hermana mayor es Yuki.", "Mi hermana se llama como yo."], answer: 1 },
          explain: "\u3042\u306d\u306e\u306a\u307e\u3048 = el nombre de (mi) hermana mayor.",
        },
        {
          id: "ja2k-gram-a7", type: "multiple_choice",
          prompt: "Para personas/animales que 'hay' o 'tienes' usas:",
          payload: { choices: ["\u3042\u308a\u307e\u3059 (arimasu)", "\u3044\u307e\u3059 (imasu)", "\u3067\u3059 (desu)"], answer: 1 },
          explain: "\u3044\u307e\u3059 (imasu) se usa para seres vivos (personas/animales).",
        },
        {
          id: "ja2k-gram-a8", type: "cloze",
          prompt: "Completa (negativo de \u3044\u307e\u3059): '\u304a\u3068\u3046\u3068\u306f ___\u3002' (no tengo)",
          payload: { answer: "\u3044\u307e\u305b\u3093" },
          explain: "\u3044\u307e\u305b\u3093 (imasen) = negativo de \u3044\u307e\u3059.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "ja2k-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: \u304b\u305e\u304f\u3092 \u3057\u3087\u3046\u304b\u3044\u3057\u3088\u3046 (presenta a tu familia)",
      intro: "Competencia de ESCRITURA. Construye una presentacion de tu familia, frase por frase.",
      activities: [
        {
          id: "ja2k-write-a1", type: "word_bank",
          prompt: "1. Di cuantas personas hay en tu familia (4):",
          payload: { words: ["\u3067\u3059", "\u304b\u305e\u304f\u306f", "\u3088\u306b\u3093"], answer: ["\u304b\u305e\u304f\u306f", "\u3088\u306b\u3093", "\u3067\u3059"] },
        },
        {
          id: "ja2k-write-a2", type: "word_bank",
          prompt: "2. Presenta esto como tu familia:",
          payload: { words: ["\u3067\u3059", "\u3053\u308c\u306f", "\u304b\u305e\u304f", "\u308f\u305f\u3057\u306e"], answer: ["\u3053\u308c\u306f", "\u308f\u305f\u3057\u306e", "\u304b\u305e\u304f", "\u3067\u3059"] },
        },
        {
          id: "ja2k-write-a3", type: "word_bank",
          prompt: "3. Di que tu papa es profesor:",
          payload: { words: ["\u3067\u3059", "\u305b\u3093\u305b\u3044", "\u3061\u3061\u306f"], answer: ["\u3061\u3061\u306f", "\u305b\u3093\u305b\u3044", "\u3067\u3059"] },
        },
        {
          id: "ja2k-write-a4", type: "word_bank",
          prompt: "4. Di que no tienes hermano menor:",
          payload: { words: ["\u3044\u307e\u305b\u3093", "\u304a\u3068\u3046\u3068\u306f"], answer: ["\u304a\u3068\u3046\u3068\u306f", "\u3044\u307e\u305b\u3093"] },
        },
        {
          id: "ja2k-write-a5", type: "word_bank",
          prompt: "5. Pregunta cuantas personas hay en SU familia:",
          payload: { words: ["\u306a\u3093\u306b\u3093\u3067\u3059\u304b", "\u304b\u305e\u304f\u306f"], answer: ["\u304b\u305e\u304f\u306f", "\u306a\u3093\u306b\u3093\u3067\u3059\u304b"] },
        },
        {
          id: "ja2k-write-a6", type: "multiple_choice",
          prompt: "6. Alguien pregunta '\u3053\u308c\u306f\u3060\u308c\u3067\u3059\u304b'. Respondes:",
          payload: { choices: ["\u3053\u308c\u306f \u308f\u305f\u3057\u306e \u3042\u306d\u3067\u3059\u3002", "\u3088\u306b\u3093\u3067\u3059\u3002", "\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059\u3002"], answer: 0 },
        },
        {
          id: "ja2k-write-a7", type: "multiple_choice",
          prompt: "7. Cual es una buena forma de preguntar por el trabajo de alguien?",
          payload: { choices: ["\u304a\u3057\u3054\u3068\u306f \u306a\u3093\u3067\u3059\u304b\u3002", "\u304a\u306a\u307e\u3048\u306f\uff1f", "\u3055\u3088\u3046\u306a\u3089\u3002"], answer: 0 },
        },
        {
          id: "ja2k-write-a8", type: "multiple_choice",
          prompt: "8. Cual presentacion esta BIEN formada?",
          payload: { choices: ["\u308f\u305f\u3057\u306e \u304b\u305e\u304f\u306f \u3088\u306b\u3093\u3067\u3059\u3002", "\u304b\u305e\u304f \u308f\u305f\u3057\u306e \u306f \u3088\u306b\u3093\u3067\u3059\u3002", "\u3088\u306b\u3093 \u304b\u305e\u304f \u308f\u305f\u3057\u306e\u3067\u3059\u3002"], answer: 0 },
        },
      ],
    },
  ],
};
