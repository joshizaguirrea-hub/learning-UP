/**
 * data/units/ja3-mainichi.js — Unidad A1 japones "まいにち (Mainichi)" --
 * rutina diaria, el presente educado -ます (-masu) y expresiones de tiempo.
 */

export const JA3_MAINICHI = {
  id: "ja3-mainichi",
  language: "ja",
  level: "A1",
  title: "\u307e\u3044\u306b\u3061 (Mainichi)",
  subtitle: "Hablar de tu rutina con el presente -\u307e\u3059 (-masu)",

  cando: [
    "Puedo decir a que hora me levanto, como/trabajo y duermo.",
    "Puedo usar verbos en la forma -\u307e\u3059 (masu) en presente.",
    "Puedo usar \u306b (ni) con la hora y \u3092 (wo) con el objeto del verbo.",
    "Puedo preguntar la hora y responder con ella.",
  ],

  vocab: [
    { id: "ja3m-1", term: "\u304a\u304d\u307e\u3059 (okimasu)", translation: "me levanto", example: "\u307e\u3044\u3042\u3055\u3001\u3057\u3061\u3058\u306b \u304a\u304d\u307e\u3059\u3002(Mai-asa, shichi-ji ni okimasu.)" },
    { id: "ja3m-2", term: "\u306d\u307e\u3059 (nemasu)", translation: "me acuesto / duermo", example: "\u307e\u3044\u3070\u3093\u3001\u3058\u3085\u3046\u3044\u3061\u3058\u306b \u306d\u307e\u3059\u3002(Mai-ban, j\u016bichi-ji ni nemasu.)" },
    { id: "ja3m-3", term: "\u305f\u3079\u307e\u3059 (tabemasu)", translation: "como", example: "\u3042\u3055\u3054\u306f\u3093\u3092 \u305f\u3079\u307e\u3059\u3002(Asa-gohan o tabemasu.)" },
    { id: "ja3m-4", term: "\u306e\u307f\u307e\u3059 (nomimasu)", translation: "bebo", example: "\u3053\u30fc\u3072\u30fc\u3092 \u306e\u307f\u307e\u3059\u3002(K\u014dh\u012b o nomimasu.)" },
    { id: "ja3m-5", term: "\u3044\u304d\u307e\u3059 (ikimasu)", translation: "voy", example: "\u304c\u3063\u3053\u3046\u306b \u3044\u304d\u307e\u3059\u3002(Gakk\u014d ni ikimasu.)" },
    { id: "ja3m-6", term: "\u3079\u3093\u304d\u3087\u3046\u3057\u307e\u3059 (benky\u014d shimasu)", translation: "estudio", example: "\u3084\u304b\u3093\u3001\u306b\u307b\u3093\u3054\u3092 \u3079\u3093\u304d\u3087\u3046\u3057\u307e\u3059\u3002(Yoru, nihongo o benky\u014d shimasu.)" },
    { id: "ja3m-7", term: "\u306f\u305f\u3089\u304d\u307e\u3059 (hatarakimasu)", translation: "trabajo", example: "\u304b\u3044\u3057\u3083\u3067 \u306f\u305f\u3089\u304d\u307e\u3059\u3002(Kaisha de hatarakimasu.)" },
    { id: "ja3m-8", term: "\u304b\u3048\u308a\u307e\u3059 (kaerimasu)", translation: "regreso / vuelvo", example: "\u3054\u3054\u308d\u304f\u3058\u306b \u3044\u3048\u306b \u304b\u3048\u308a\u307e\u3059\u3002(Gogo roku-ji ni ie ni kaerimasu.)" },
    { id: "ja3m-9", term: "\u307e\u3044\u3042\u3055 / \u307e\u3044\u3070\u3093 (mai-asa / mai-ban)", translation: "cada manana / cada noche", example: "\u307e\u3044\u3042\u3055\u3001\u30b7\u30e3\u30ef\u30fc\u3092 \u3042\u3073\u307e\u3059\u3002(Mai-asa, shaw\u0101 o abimasu.)" },
    { id: "ja3m-10", term: "\u306a\u3093\u3058\u3067\u3059\u304b (nan-ji desu ka)", translation: "que hora es?", example: "\u3044\u307e\u3001\u306a\u3093\u3058\u3067\u3059\u304b\u3002(Ima, nan-ji desu ka.)" },
    { id: "ja3m-11", term: "\u3054\u305c\u3093 / \u3054\u3054 (gozen / gogo)", translation: "AM (manana) / PM (tarde)", example: "\u3054\u3054\u3057\u3061\u3058\u306b \u304f\u308a\u307e\u3059\u3002(Gogo shichi-ji ni kurimasu.)" },
    { id: "ja3m-12", term: "\u307e\u3044\u306b\u3061 (mainichi)", translation: "cada dia, diariamente", example: "\u307e\u3044\u306b\u3061\u3001\u306f\u305f\u3089\u304d\u307e\u3059\u3002(Mainichi, hatarakimasu.)" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "ja3m-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: \u307e\u3044\u306b\u3061\u306e \u3055\u3044\u304b\u3064 (la rutina diaria)",
      intro: "Competencia de LECTURA. Lee DOS textos en japones (con romaji de apoyo) y responde las preguntas.",
      content: {
        reading:
          "\u3076\u3093\u3057\u3087\u3046 1 - \u3086\u304d\u3055\u3093\u306e \u3044\u3061\u306b\u3061 (un dia de Yuki)\n" +
          "\u3086\u304d\u3055\u3093\u306f \u307e\u3044\u3042\u3055\u3001\u3057\u3061\u3058\u306b \u304a\u304d\u307e\u3059\u3002\u305d\u308c\u304b\u3089\u3001\u3042\u3055\u3054\u306f\u3093\u3092 \u305f\u3079\u307e\u3059\u3002\n" +
          "(Yuki-san wa mai-asa, shichi-ji ni okimasu. Sorekara, asa-gohan o tabemasu.)\n" +
          "\u306f\u3061\u3058\u306b \u304c\u3063\u3053\u3046\u306b \u3044\u304d\u307e\u3059\u3002\u3054\u3054\u3001\u3060\u3044\u304c\u304f\u3067 \u3079\u3093\u304d\u3087\u3046\u3057\u307e\u3059\u3002\n" +
          "(Hachi-ji ni gakk\u014d ni ikimasu. Gogo, daigaku de benky\u014d shimasu.)\n" +
          "\u3054\u3054\u3054\u3058\u306b \u3044\u3048\u306b \u304b\u3048\u308a\u307e\u3059\u3002\u3088\u308b\u3001\u3058\u3085\u3046\u3044\u3061\u3058\u306b \u306d\u307e\u3059\u3002\n" +
          "(Gogo go-ji ni ie ni kaerimasu. Yoru, j\u016bichi-ji ni nemasu.)\n\n" +
          "\u3076\u3093\u3057\u3087\u3046 2 - \u3058\u3083\u3042\u3093\u3092 \u304d\u304f (preguntar por la rutina)\n" +
          "A: \u307e\u3044\u3042\u3055\u3001\u306a\u3093\u3058\u306b \u304a\u304d\u307e\u3059\u304b\u3002(Mai-asa, nan-ji ni okimasu ka.)\n" +
          "B: \u3057\u3061\u3058\u306f\u3093\u306b \u304a\u304d\u307e\u3059\u3002(Shichi-ji han ni okimasu.)\n" +
          "A: \u3042\u3055\u3054\u306f\u3093\u306f \u305f\u3079\u307e\u3059\u304b\u3002(Asa-gohan wa tabemasu ka.)\n" +
          "B: \u306f\u3044\u3001\u305f\u3079\u307e\u3059\u3002\u3053\u30fc\u3072\u30fc\u3082 \u306e\u307f\u307e\u3059\u3002(Hai, tabemasu. K\u014dh\u012b mo nomimasu.)\n" +
          "A: \u4f55\u6642\u306b \u306f\u305f\u3089\u304d\u307e\u3059\u304b\u3002(Nan-ji ni hatarakimasu ka.)\n" +
          "B: \u304f\u3058\u306b \u306f\u305f\u3089\u304d\u307e\u3059\u3002(Ku-ji ni hatarakimasu.)",
        readingEs: [
          "Texto 1 - un d\u00eda de Yuki",
          "Yuki se levanta cada ma\u00f1ana a las 7. Luego, desayuna.",
          "Va a la escuela a las 8. Por la tarde, estudia en la universidad.",
          "Regresa a casa a las 5 de la tarde. Por la noche, se duerme a las 11.",
          "Texto 2 - preguntar por la rutina",
          "A: \u00bfA qu\u00e9 hora te levantas cada ma\u00f1ana?",
          "B: Me levanto a las 7:30.",
          "A: \u00bfDesayunas?",
          "B: S\u00ed, desayuno. Tambi\u00e9n tomo caf\u00e9.",
          "A: \u00bfA qu\u00e9 hora trabajas?",
          "B: Trabajo a las 9.",
        ],
        glossary: [
          { term: "\u305d\u308c\u304b\u3089 (sorekara)", translation: "despues de eso, luego" },
          { term: "\u3042\u3055\u3054\u306f\u3093 (asa-gohan)", translation: "desayuno" },
          { term: "\u3088\u308b (yoru)", translation: "la noche" },
          { term: "\u3082 (mo)", translation: "tambien" },
          { term: "\u3057\u3061\u3058\u306f\u3093 (shichi-ji han)", translation: "siete y media" },
        ],
        keyPhrases: [
          "Busca la HORA de cada actividad: \u306b (ni) va pegado a la hora, no al verbo.",
          "El orden tipico es: [hora] + \u306b + [lugar/cosa] + \u3092/\u306b + [verbo].",
        ],
        check: [
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3086\u304d\u3055\u3093\u306f \u306a\u3093\u3058\u306b \u304a\u304d\u307e\u3059\u304b\u3002", choices: ["\u3057\u3061\u3058 (7)", "\u306f\u3061\u3058 (8)", "\u304f\u3058 (9)"], answer: 0 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3086\u304d\u3055\u3093\u306f \u306a\u3093\u3058\u306b \u304c\u3063\u3053\u3046\u306b \u3044\u304d\u307e\u3059\u304b\u3002", choices: ["\u3057\u3061\u3058 (7)", "\u306f\u3061\u3058 (8)", "\u304f\u3058 (9)"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3086\u304d\u3055\u3093\u306f \u306a\u3093\u3058\u306b \u306d\u307e\u3059\u304b\u3002", choices: ["\u3058\u3085\u3046\u3058 (10)", "\u3058\u3085\u3046\u3044\u3061\u3058 (11)", "\u3058\u3085\u3046\u306b\u3058 (12)"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: B\u3055\u3093\u306f \u306a\u3093\u3058\u306b \u304a\u304d\u307e\u3059\u304b\u3002", choices: ["\u3057\u3061\u3058 (7)", "\u3057\u3061\u3058\u306f\u3093 (7:30)", "\u306f\u3061\u3058 (8)"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: B\u3055\u3093\u306f \u30b3\u30fc\u30d2\u30fc\u3092 \u306e\u307f\u307e\u3059\u304b\u3002", choices: ["\u306f\u3044\u3001\u306e\u307f\u307e\u3059", "\u3044\u3044\u3048\u3001\u306e\u307f\u307e\u305b\u3093", "\u308f\u304b\u308a\u307e\u305b\u3093"], answer: 0 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: B\u3055\u3093\u306f \u306a\u3093\u3058\u306b \u306f\u305f\u3089\u304d\u307e\u3059\u304b\u3002", choices: ["\u306f\u3061\u3058 (8)", "\u304f\u3058 (9)", "\u3058\u3085\u3046\u3058 (10)"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "ja3m-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: \u307e\u3044\u306b\u3061\u306e \u3053\u3046\u3069\u3046 (acciones diarias)",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "\u304a\u304d\u307e\u3059 / \u306d\u307e\u3059 (okimasu / nemasu)", translation: "me levanto / me acuesto" },
        { term: "\u305f\u3079\u307e\u3059 / \u306e\u307f\u307e\u3059 (tabemasu / nomimasu)", translation: "como / bebo" },
        { term: "\u3044\u304d\u307e\u3059 (ikimasu)", translation: "voy" },
        { term: "\u3079\u3093\u304d\u3087\u3046\u3057\u307e\u3059 (benky\u014d shimasu)", translation: "estudio" },
        { term: "\u306f\u305f\u3089\u304d\u307e\u3059 (hatarakimasu)", translation: "trabajo" },
        { term: "\u304b\u3048\u308a\u307e\u3059 (kaerimasu)", translation: "regreso" },
        { term: "\u307e\u3044\u3042\u3055 / \u307e\u3044\u3070\u3093 (mai-asa / mai-ban)", translation: "cada manana / cada noche" },
        { term: "\u306a\u3093\u3058\u3067\u3059\u304b (nan-ji desu ka)", translation: "que hora es?" },
      ],
      activities: [
        {
          id: "ja3m-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "\u304a\u304d\u307e\u3059 (okimasu)", right: "Me levanto" },
            { left: "\u306d\u307e\u3059 (nemasu)", right: "Me acuesto" },
            { left: "\u305f\u3079\u307e\u3059 (tabemasu)", right: "Como" },
            { left: "\u306e\u307f\u307e\u3059 (nomimasu)", right: "Bebo" },
          ] },
        },
        {
          id: "ja3m-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "\u3044\u304d\u307e\u3059 (ikimasu)", right: "Voy" },
            { left: "\u306f\u305f\u3089\u304d\u307e\u3059 (hatarakimasu)", right: "Trabajo" },
            { left: "\u304b\u3048\u308a\u307e\u3059 (kaerimasu)", right: "Regreso" },
            { left: "\u3079\u3093\u304d\u3087\u3046\u3057\u307e\u3059 (benky\u014d shimasu)", right: "Estudio" },
          ] },
        },
        {
          id: "ja3m-vocab-a3", type: "multiple_choice",
          prompt: "Cual verbo usas para 'desayunar'?",
          payload: { choices: ["\u306e\u307f\u307e\u3059 (nomimasu)", "\u305f\u3079\u307e\u3059 (tabemasu)", "\u3044\u304d\u307e\u3059 (ikimasu)"], answer: 1 },
          explain: "\u305f\u3079\u307e\u3059 (tabemasu) = comer.",
        },
        {
          id: "ja3m-vocab-a4", type: "multiple_choice",
          prompt: "Cual palabra significa 'cada manana'?",
          payload: { choices: ["\u307e\u3044\u3070\u3093 (mai-ban)", "\u307e\u3044\u3042\u3055 (mai-asa)", "\u307e\u3044\u306b\u3061 (mainichi)"], answer: 1 },
          explain: "\u307e\u3044\u3042\u3055 (mai-asa) = cada manana. \u307e\u3044\u3070\u3093 (mai-ban) = cada noche.",
        },
        {
          id: "ja3m-vocab-a5", type: "multiple_choice",
          prompt: "Como preguntas 'que hora es?'",
          payload: { choices: ["\u306a\u3093\u3058\u3067\u3059\u304b (nan-ji desu ka)", "\u306a\u3093\u306b\u3093\u3067\u3059\u304b (nan-nin desu ka)", "\u304a\u3052\u3093\u304d\u3067\u3059\u304b (o-genki desu ka)"], answer: 0 },
          explain: "\u306a\u3093\u3058\u3067\u3059\u304b (nan-ji desu ka) = que hora es?",
        },
        {
          id: "ja3m-vocab-a6", type: "multiple_choice",
          prompt: "Cual verbo significa 'trabajar'?",
          payload: { choices: ["\u3079\u3093\u304d\u3087\u3046\u3057\u307e\u3059 (benky\u014d shimasu)", "\u306f\u305f\u3089\u304d\u307e\u3059 (hatarakimasu)", "\u304b\u3048\u308a\u307e\u3059 (kaerimasu)"], answer: 1 },
          explain: "\u306f\u305f\u3089\u304d\u307e\u3059 (hatarakimasu) = trabajar.",
        },
        {
          id: "ja3m-vocab-a7", type: "multiple_choice",
          prompt: "Cual verbo significa 'regresar/volver'?",
          payload: { choices: ["\u3044\u304d\u307e\u3059 (ikimasu)", "\u304b\u3048\u308a\u307e\u3059 (kaerimasu)", "\u306d\u307e\u3059 (nemasu)"], answer: 1 },
          explain: "\u304b\u3048\u308a\u307e\u3059 (kaerimasu) = regresar (a casa).",
        },
        {
          id: "ja3m-vocab-a8", type: "multiple_choice",
          prompt: "\u3054\u3054 (gogo) significa:",
          payload: { choices: ["AM (manana)", "PM (tarde/noche)", "cada dia"], answer: 1 },
          explain: "\u3054\u3054 (gogo) = PM. \u3054\u305c\u3093 (gozen) = AM.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "ja3m-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: el presente -\u307e\u3059 (masu) + \u306b/\u3092",
      intro: "Competencia de GRAMATICA. Aprende la forma -\u307e\u3059 (masu) y las particulas \u306b (hora) y \u3092 (objeto).",
      grammar: {
        title: "El presente educado -\u307e\u3059 (-masu)",
        form: "[hora] + \u306b (ni) + [verbo-\u307e\u3059]   /   [cosa] + \u3092 (wo) + [verbo-\u307e\u3059]",
        desc: "Sirve para hablar de acciones habituales o del futuro cercano, en forma EDUCADA (polite).",
        rule: "Todos los verbos en japones educado terminan en -\u307e\u3059 (masu) en presente afirmativo. La particula \u306b (ni) marca LA HORA exacta ('7\u3058\u306b' = a las 7); la particula \u3092 (wo, se escribe \u3092 pero suena 'o') marca el OBJETO directo del verbo ('\u3054\u306f\u3093\u3092 \u305f\u3079\u307e\u3059' = como arroz/comida). El negativo de -\u307e\u3059 es -\u307e\u305b\u3093 (masen).",
        table: {
          headers: ["Forma", "Significado", "Ejemplo"],
          rows: [
            ["-\u307e\u3059 (masu)", "presente afirmativo", "\u305f\u3079\u307e\u3059 (como)"],
            ["-\u307e\u305b\u3093 (masen)", "presente negativo", "\u305f\u3079\u307e\u305b\u3093 (no como)"],
            ["\u306b (ni) + hora", "A las... (hora exacta)", "\u3057\u3061\u3058\u306b (a las 7)"],
          ],
        },
        examples: [
          "\u307e\u3044\u3042\u3055\u3001\u3057\u3061\u3058*\u306b* \u304a\u304d\u307e\u3059\u3002 (Mai-asa, shichi-ji ni okimasu.)",
          "\u3042\u3055\u3054\u306f\u3093*\u3092* \u305f\u3079\u307e\u3059\u3002 (Asa-gohan o tabemasu.)",
          "\u3088\u308b\u306f \u305f\u3079\u307e\u305b\u3093\u3002 (Yoru wa tabemasen.)",
          "\u304f\u3058*\u306b* \u306f\u305f\u3089\u304d\u307e\u3059\u3002 (Ku-ji ni hatarakimasu.)",
        ],
        explain: { tr: ["Cada manana me levanto a las 7.", "Desayuno (como el desayuno).", "En la noche no como.", "Trabajo a las 9."] },
        mistakes: [
          { wrong: "\u3057\u3061\u3058 \u304a\u304d\u307e\u3059\u3002 (sin \u306b)", right: "\u3057\u3061\u3058\u306b \u304a\u304d\u307e\u3059\u3002" },
          { wrong: "\u3054\u306f\u3093\u306f \u305f\u3079\u307e\u3059\u3002 (\u3092 cambiado por \u306f)", right: "\u3054\u306f\u3093\u3092 \u305f\u3079\u307e\u3059\u3002" },
          { wrong: "\u305f\u3079\u307e\u3059\u3093 (negativo mal formado)", right: "\u305f\u3079\u307e\u305b\u3093" },
        ],
      },
      activities: [
        {
          id: "ja3m-gram-a1", type: "cloze",
          prompt: "Completa: '\u3057\u3061\u3058___ \u304a\u304d\u307e\u3059\u3002' (particula de hora: ni)",
          payload: { answer: "\u306b" },
          explain: "\u306b marca la hora exacta de una accion.",
        },
        {
          id: "ja3m-gram-a2", type: "cloze",
          prompt: "Completa: '\u3042\u3055\u3054\u306f\u3093___ \u305f\u3079\u307e\u3059\u3002' (particula de objeto: wo)",
          payload: { answer: "\u3092" },
          explain: "\u3092 marca el objeto directo del verbo (lo que se come).",
        },
        {
          id: "ja3m-gram-a3", type: "multiple_choice",
          prompt: "Cual es el NEGATIVO de \u305f\u3079\u307e\u3059 (como)?",
          payload: { choices: ["\u305f\u3079\u307e\u3057\u305f", "\u305f\u3079\u307e\u305b\u3093", "\u305f\u3079\u306a\u3044"], answer: 1 },
          explain: "El negativo de -\u307e\u3059 es -\u307e\u305b\u3093 (masen).",
        },
        {
          id: "ja3m-gram-a4", type: "multiple_choice",
          prompt: "Elige la frase CORRECTA:",
          payload: { choices: ["\u304f\u3058 \u306f\u305f\u3089\u304d\u307e\u3059\u3002", "\u304f\u3058\u306b \u306f\u305f\u3089\u304d\u307e\u3059\u3002", "\u306f\u305f\u3089\u304d\u307e\u3059 \u304f\u3058\u306b\u3002"], answer: 1 },
          explain: "Orden: [hora] + \u306b + [verbo].",
        },
        {
          id: "ja3m-gram-a5", type: "word_bank",
          prompt: "Ordena: 'Me levanto a las 7' (shichi-ji/ni/okimasu):",
          payload: { words: ["\u304a\u304d\u307e\u3059", "\u3057\u3061\u3058", "\u306b"], answer: ["\u3057\u3061\u3058", "\u306b", "\u304a\u304d\u307e\u3059"] },
          explain: "Orden: \u3057\u3061\u3058 + \u306b + \u304a\u304d\u307e\u3059.",
        },
        {
          id: "ja3m-gram-a6", type: "word_bank",
          prompt: "Ordena: 'Como el desayuno' (asa-gohan/wo/tabemasu):",
          payload: { words: ["\u305f\u3079\u307e\u3059", "\u3042\u3055\u3054\u306f\u3093", "\u3092"], answer: ["\u3042\u3055\u3054\u306f\u3093", "\u3092", "\u305f\u3079\u307e\u3059"] },
          explain: "Orden: \u3042\u3055\u3054\u306f\u3093 + \u3092 + \u305f\u3079\u307e\u3059.",
        },
        {
          id: "ja3m-gram-a7", type: "multiple_choice",
          prompt: "'\u3088\u308b\u306f \u305f\u3079\u307e\u305b\u3093\u3002' significa:",
          payload: { choices: ["Como en la noche.", "En la noche no como.", "Como todas las noches."], answer: 1 },
          explain: "-\u307e\u305b\u3093 es el negativo: 'no como'.",
        },
        {
          id: "ja3m-gram-a8", type: "multiple_choice",
          prompt: "Como preguntas 'a que hora te levantas?'",
          payload: { choices: ["\u306a\u3093\u3058\u306b \u304a\u304d\u307e\u3059\u304b\u3002", "\u306a\u3093\u3058\u3067\u3059\u304b\u3002", "\u3044\u3064 \u304a\u304d\u307e\u3059\u304b\u3002"], answer: 0 },
          explain: "\u306a\u3093\u3058\u306b + \u304a\u304d\u307e\u3059\u304b = a que hora te levantas?",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "ja3m-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: \u308f\u305f\u3057\u306e \u3044\u3061\u306b\u3061 (mi dia)",
      intro: "Competencia de ESCRITURA. Describe tu rutina diaria, frase por frase.",
      activities: [
        {
          id: "ja3m-write-a1", type: "word_bank",
          prompt: "1. Di que te levantas a las 7:",
          payload: { words: ["\u304a\u304d\u307e\u3059", "\u3057\u3061\u3058", "\u306b"], answer: ["\u3057\u3061\u3058", "\u306b", "\u304a\u304d\u307e\u3059"] },
        },
        {
          id: "ja3m-write-a2", type: "word_bank",
          prompt: "2. Di que comes el desayuno:",
          payload: { words: ["\u305f\u3079\u307e\u3059", "\u3042\u3055\u3054\u306f\u3093", "\u3092"], answer: ["\u3042\u3055\u3054\u306f\u3093", "\u3092", "\u305f\u3079\u307e\u3059"] },
        },
        {
          id: "ja3m-write-a3", type: "word_bank",
          prompt: "3. Di que vas a la escuela:",
          payload: { words: ["\u3044\u304d\u307e\u3059", "\u304c\u3063\u3053\u3046", "\u306b"], answer: ["\u304c\u3063\u3053\u3046", "\u306b", "\u3044\u304d\u307e\u3059"] },
        },
        {
          id: "ja3m-write-a4", type: "word_bank",
          prompt: "4. Di que trabajas a las 9:",
          payload: { words: ["\u306f\u305f\u3089\u304d\u307e\u3059", "\u304f\u3058", "\u306b"], answer: ["\u304f\u3058", "\u306b", "\u306f\u305f\u3089\u304d\u307e\u3059"] },
        },
        {
          id: "ja3m-write-a5", type: "word_bank",
          prompt: "5. Di que te acuestas a las 11:",
          payload: { words: ["\u306d\u307e\u3059", "\u3058\u3085\u3046\u3044\u3061\u3058", "\u306b"], answer: ["\u3058\u3085\u3046\u3044\u3061\u3058", "\u306b", "\u306d\u307e\u3059"] },
        },
        {
          id: "ja3m-write-a6", type: "multiple_choice",
          prompt: "6. Alguien pregunta '\u4f55\u6642\u306b \u304a\u304d\u307e\u3059\u304b'. Respondes con:",
          payload: { choices: ["\u3057\u3061\u3058\u306b \u304a\u304d\u307e\u3059\u3002", "\u304c\u304f\u305b\u3044\u3067\u3059\u3002", "\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059\u3002"], answer: 0 },
        },
        {
          id: "ja3m-write-a7", type: "multiple_choice",
          prompt: "7. Cual pregunta usarias para saber la rutina de alguien?",
          payload: { choices: ["\u307e\u3044\u3042\u3055\u3001\u306a\u3093\u3058\u306b \u304a\u304d\u307e\u3059\u304b\u3002", "\u304a\u306a\u307e\u3048\u306f\uff1f", "\u3055\u3088\u3046\u306a\u3089\u3002"], answer: 0 },
        },
        {
          id: "ja3m-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase esta BIEN formada?",
          payload: { choices: ["\u3054\u306f\u3093\u3092 \u305f\u3079\u307e\u3059\u3002", "\u3054\u306f\u3093\u306f \u305f\u3079\u307e\u3059\u3092\u3002", "\u305f\u3079\u307e\u3059 \u3054\u306f\u3093\u3092\u3002"], answer: 0 },
        },
      ],
    },
  ],
};
