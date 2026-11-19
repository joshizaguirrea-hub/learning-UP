/**
 * data/units/ja7-jiyuujikan.js — Unidad A1 japones "じゆうじかん (Jiyuu jikan)"
 * -- tiempo libre, できます (poder hacer) y adverbios de frecuencia.
 */

export const JA7_JIYUUJIKAN = {
  id: "ja7-jiyuujikan",
  language: "ja",
  level: "A1",
  title: "\u3058\u3086\u3046\u3058\u304b\u3093 (Jiy\u016b jikan)",
  subtitle: "Hablar de pasatiempos con \u3067\u304d\u307e\u3059 y adverbios de frecuencia",

  cando: [
    "Puedo nombrar pasatiempos comunes.",
    "Puedo decir que puedo o no puedo hacer algo con \u3067\u304d\u307e\u3059.",
    "Puedo usar \u3088\u304f/\u3068\u304d\u3069\u304d/\u3042\u307e\u308a para decir con que frecuencia hago algo.",
    "Puedo preguntar que le gusta hacer a alguien en su tiempo libre.",
  ],

  vocab: [
    { id: "ja7j-1", term: "\u3057\u3085\u307f (shumi)", translation: "pasatiempo", example: "\u3057\u3085\u307f\u306f \u304a\u3093\u304c\u304f\u3067\u3059\u3002(Shumi wa ongaku desu.)" },
    { id: "ja7j-2", term: "\u304a\u3093\u304c\u304f (ongaku)", translation: "musica", example: "\u304a\u3093\u304c\u304f\u3092 \u304d\u304d\u307e\u3059\u3002(Ongaku o kikimasu.)" },
    { id: "ja7j-3", term: "\u3048\u3044\u304c (eiga)", translation: "pelicula", example: "\u3048\u3044\u304c\u3092 \u307f\u307e\u3059\u3002(Eiga o mimasu.)" },
    { id: "ja7j-4", term: "\u30b9\u30dd\u30fc\u30c4 (sup\u014dtsu)", translation: "deporte", example: "\u30b9\u30dd\u30fc\u30c4\u304c \u3059\u304d\u3067\u3059\u3002(Sup\u014dtsu ga suki desu.)" },
    { id: "ja7j-5", term: "\u307b\u3093\u3092 \u3088\u307f\u307e\u3059 (hon o yomimasu)", translation: "leer libros", example: "\u307b\u3093\u3092 \u3088\u304f \u3088\u307f\u307e\u3059\u3002(Hon o yoku yomimasu.)" },
    { id: "ja7j-6", term: "\u304a\u3088\u304e\u307e\u3059 (oyogimasu)", translation: "nadar", example: "\u304a\u3088\u304e\u307e\u3059\u304c\u3001\u3042\u307e\u308a \u3058\u3087\u3046\u305a\u3067\u306f \u3042\u308a\u307e\u305b\u3093\u3002(Oyogimasu ga, amari j\u014dzu de wa arimasen.)" },
    { id: "ja7j-7", term: "\u3067\u304d\u307e\u3059 / \u3067\u304d\u307e\u305b\u3093 (dekimasu / dekimasen)", translation: "poder hacer / no poder", example: "\u6cf3\u3050\u3053\u3068\u304c \u3067\u304d\u307e\u3059\u3002(Oyogu koto ga dekimasu.)" },
    { id: "ja7j-8", term: "\u3058\u3087\u3046\u305a(\u306a) (j\u014dzu na)", translation: "habil / bueno en algo", example: "\u3066\u306b\u3059\u304c \u3058\u3087\u3046\u305a\u3067\u3059\u3002(Tenisu ga j\u014dzu desu.)" },
    { id: "ja7j-9", term: "\u3088\u304f (yoku)", translation: "frecuentemente", example: "\u3088\u304f \u3048\u3044\u304c\u3092 \u307f\u307e\u3059\u3002(Yoku eiga o mimasu.)" },
    { id: "ja7j-10", term: "\u3068\u304d\u3069\u304d (tokidoki)", translation: "a veces", example: "\u3068\u304d\u3069\u304d \u304a\u3088\u304e\u307e\u3059\u3002(Tokidoki oyogimasu.)" },
    { id: "ja7j-11", term: "\u3042\u307e\u308a\u301c\u307e\u305b\u3093 (amari ~masen)", translation: "casi no / no mucho", example: "\u3042\u307e\u308a \u3059\u30dd\u30fc\u30c4\u3092 \u3057\u307e\u305b\u3093\u3002(Amari sup\u014dtsu o shimasen.)" },
    { id: "ja7j-12", term: "\u4f55\u304c \u3059\u304d\u3067\u3059\u304b (nani ga suki desu ka)", translation: "que te gusta?", example: "\u3058\u3086\u3046\u3058\u304b\u3093\u306b \u4f55\u304c \u3059\u304d\u3067\u3059\u304b\u3002(Jiy\u016b jikan ni nani ga suki desu ka.)" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "ja7j-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: \u3057\u3085\u307f (pasatiempos)",
      intro: "Competencia de LECTURA. Lee DOS textos en japones (con romaji de apoyo) y responde las preguntas.",
      content: {
        reading:
          "\u3076\u3093\u3057\u3087\u3046 1 - \u3086\u304d\u3055\u3093\u306e \u3057\u3085\u307f (los pasatiempos de Yuki)\n" +
          "\u3086\u304d\u3055\u3093\u306e \u3057\u3085\u307f\u306f \u304a\u3093\u304c\u304f\u3067\u3059\u3002\u3088\u304f \u304a\u3093\u304c\u304f\u3092 \u304d\u304d\u307e\u3059\u3002\n" +
          "(Yuki-san no shumi wa ongaku desu. Yoku ongaku o kikimasu.)\n" +
          "\u304a\u3088\u304e\u307e\u3059\u304c\u3001\u3042\u307e\u308a \u3058\u3087\u3046\u305a\u3067\u306f \u3042\u308a\u307e\u305b\u3093\u3002\u3067\u3082\u3001\u30c6\u30cb\u30b9\u304c \u3067\u304d\u307e\u3059\u3002\n" +
          "(Oyogimasu ga, amari j\u014dzu de wa arimasen. Demo, tenisu ga dekimasu.)\n" +
          "\u3068\u304d\u3069\u304d \u3048\u3044\u304c\u3082 \u307f\u307e\u3059\u3002\u3042\u307e\u308a \u30b9\u30dd\u30fc\u30c4\u3092 \u3057\u307e\u305b\u3093\u3002\n" +
          "(Tokidoki eiga mo mimasu. Amari sup\u014dtsu o shimasen.)\n\n" +
          "\u3076\u3093\u3057\u3087\u3046 2 - \u3057\u3085\u307f\u306b\u3064\u3044\u3066 \u306f\u306a\u3059 (hablando de pasatiempos)\n" +
          "A: \u3058\u3086\u3046\u3058\u304b\u3093\u306b \u4f55\u304c \u3059\u304d\u3067\u3059\u304b\u3002(Jiy\u016b jikan ni nani ga suki desu ka.)\n" +
          "B: \u672c\u3092 \u8aad\u3080\u3053\u3068\u304c \u3059\u304d\u3067\u3059\u3002\u3088\u304f \u8aad\u307f\u307e\u3059\u3002(Hon o yomu koto ga suki desu. Yoku yomimasu.)\n" +
          "A: \u30b9\u30dd\u30fc\u30c4\u306f \u3067\u304d\u307e\u3059\u304b\u3002(Sup\u014dtsu wa dekimasu ka.)\n" +
          "B: \u3044\u3044\u3048\u3001\u3042\u307e\u308a \u3067\u304d\u307e\u305b\u3093\u3002\u3067\u3082\u3001\u6cf3\u3050\u3053\u3068\u306f \u3067\u304d\u307e\u3059\u3002(Iie, amari dekimasen. Demo, oyogu koto wa dekimasu.)\n" +
          "A: \u305d\u3046\u3067\u3059\u304b\u3002\u3044\u3044\u3067\u3059\u306d\u3002(S\u014d desu ka. Ii desu ne.)",
        glossary: [
          { term: "\u304d\u304d\u307e\u3059 (kikimasu)", translation: "escuchar" },
          { term: "\u3053\u3068\u304c \u3059\u304d\u3067\u3059 (koto ga suki desu)", translation: "me gusta [verbo]+r (gusto por una accion)" },
          { term: "\u305d\u3046\u3067\u3059\u304b (s\u014d desu ka)", translation: "ah, entiendo / ya veo" },
          { term: "\u3044\u3044\u3067\u3059\u306d (ii desu ne)", translation: "que bien / se oye bien" },
        ],
        keyPhrases: [
          "Busca que SI puede hacer cada persona y que NO puede hacer bien.",
          "\u3053\u3068\u304c \u3059\u304d\u3067\u3059 convierte un VERBO en algo que 'gusta' (como un sustantivo).",
        ],
        check: [
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3086\u304d\u3055\u3093\u306e \u3057\u3085\u307f\u306f \u4f55\u3067\u3059\u304b\u3002", choices: ["\u30b9\u30dd\u30fc\u30c4", "\u304a\u3093\u304c\u304f", "\u6620\u753b"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3086\u304d\u3055\u3093\u306f \u304a\u3088\u304e\u304c \u3058\u3087\u3046\u305a\u3067\u3059\u304b\u3002", choices: ["\u306f\u3044\u3001\u3068\u3066\u3082 \u3058\u3087\u3046\u305a\u3067\u3059", "\u3044\u3044\u3048\u3001\u3042\u307e\u308a \u3058\u3087\u3046\u305a\u3067\u306f \u3042\u308a\u307e\u305b\u3093", "\u6cf3\u304e\u307e\u305b\u3093"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3086\u304d\u3055\u3093\u306f \u30c6\u30cb\u30b9\u304c \u3067\u304d\u307e\u3059\u304b\u3002", choices: ["\u306f\u3044\u3001\u3067\u304d\u307e\u3059", "\u3044\u3044\u3048\u3001\u3067\u304d\u307e\u305b\u3093", "\u308f\u304b\u308a\u307e\u305b\u3093"], answer: 0 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: B\u3055\u3093\u306f \u4f55\u304c \u3059\u304d\u3067\u3059\u304b\u3002", choices: ["\u6cf3\u3050\u3053\u3068", "\u672c\u3092 \u8aad\u3080\u3053\u3068", "\u30b9\u30dd\u30fc\u30c4"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: B\u3055\u3093\u306f \u30b9\u30dd\u30fc\u30c4\u304c \u3067\u304d\u307e\u3059\u304b\u3002", choices: ["\u306f\u3044\u3001\u3088\u304f \u3067\u304d\u307e\u3059", "\u3042\u307e\u308a \u3067\u304d\u307e\u305b\u3093\u304c\u3001\u6cf3\u3050\u3053\u3068\u306f \u3067\u304d\u307e\u3059", "\u3044\u3044\u3048\u3001\u5168\u7136 \u3067\u304d\u307e\u305b\u3093"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: A\u3055\u3093\u306f \u6700\u5f8c\u306b \u4f55\u3068 \u8a00\u3044\u307e\u3059\u304b\u3002", choices: ["\u3044\u3044\u3067\u3059\u306d", "\u3042\u308a\u304c\u3068\u3046", "\u3055\u3088\u3046\u306a\u3089"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "ja7j-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: \u3057\u3085\u307f (pasatiempos)",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "\u3057\u3085\u307f (shumi)", translation: "pasatiempo" },
        { term: "\u304a\u3093\u304c\u304f / \u3048\u3044\u304c (ongaku / eiga)", translation: "musica / pelicula" },
        { term: "\u30b9\u30dd\u30fc\u30c4 (sup\u014dtsu)", translation: "deporte" },
        { term: "\u304a\u3088\u304e\u307e\u3059 (oyogimasu)", translation: "nadar" },
        { term: "\u3067\u304d\u307e\u3059 / \u3067\u304d\u307e\u305b\u3093 (dekimasu / dekimasen)", translation: "poder hacer / no poder" },
        { term: "\u3058\u3087\u3046\u305a(\u306a) (j\u014dzu na)", translation: "habil" },
        { term: "\u3088\u304f / \u3068\u304d\u3069\u304d (yoku / tokidoki)", translation: "frecuentemente / a veces" },
        { term: "\u3042\u307e\u308a\u301c\u307e\u305b\u3093 (amari ~masen)", translation: "casi no" },
      ],
      activities: [
        {
          id: "ja7j-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "\u3057\u3085\u307f (shumi)", right: "Pasatiempo" },
            { left: "\u304a\u3093\u304c\u304f (ongaku)", right: "Musica" },
            { left: "\u3048\u3044\u304c (eiga)", right: "Pelicula" },
            { left: "\u30b9\u30dd\u30fc\u30c4 (sup\u014dtsu)", right: "Deporte" },
          ] },
        },
        {
          id: "ja7j-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "\u3088\u304f (yoku)", right: "Frecuentemente" },
            { left: "\u3068\u304d\u3069\u304d (tokidoki)", right: "A veces" },
            { left: "\u3067\u304d\u307e\u3059 (dekimasu)", right: "Poder hacer" },
            { left: "\u3058\u3087\u3046\u305a (j\u014dzu)", right: "Habil" },
          ] },
        },
        {
          id: "ja7j-vocab-a3", type: "multiple_choice",
          prompt: "Cual verbo significa 'nadar'?",
          payload: { choices: ["\u304d\u304d\u307e\u3059 (kikimasu)", "\u304a\u3088\u304e\u307e\u3059 (oyogimasu)", "\u307f\u307e\u3059 (mimasu)"], answer: 1 },
          explain: "\u304a\u3088\u304e\u307e\u3059 (oyogimasu) = nadar.",
        },
        {
          id: "ja7j-vocab-a4", type: "multiple_choice",
          prompt: "Cual palabra significa 'poder hacer algo'?",
          payload: { choices: ["\u3059\u304d (suki)", "\u3067\u304d\u307e\u3059 (dekimasu)", "\u3042\u308a\u307e\u3059 (arimasu)"], answer: 1 },
          explain: "\u3067\u304d\u307e\u3059 (dekimasu) = poder hacer.",
        },
        {
          id: "ja7j-vocab-a5", type: "multiple_choice",
          prompt: "Cual palabra significa 'habil/bueno en algo'?",
          payload: { choices: ["\u3058\u3087\u3046\u305a (j\u014dzu)", "\u304a\u3044\u3057\u3044 (oishii)", "\u305f\u304b\u3044 (takai)"], answer: 0 },
          explain: "\u3058\u3087\u3046\u305a (j\u014dzu) = habil.",
        },
        {
          id: "ja7j-vocab-a6", type: "multiple_choice",
          prompt: "Cual significa 'casi no' (con negativo)?",
          payload: { choices: ["\u3088\u304f (yoku)", "\u3068\u304d\u3069\u304d (tokidoki)", "\u3042\u307e\u308a (amari)"], answer: 2 },
          explain: "\u3042\u307e\u308a + negativo = casi no.",
        },
        {
          id: "ja7j-vocab-a7", type: "multiple_choice",
          prompt: "Cual palabra significa 'musica'?",
          payload: { choices: ["\u304a\u3093\u304c\u304f (ongaku)", "\u3048\u3044\u304c (eiga)", "\u3057\u3085\u307f (shumi)"], answer: 0 },
          explain: "\u304a\u3093\u304c\u304f (ongaku) = musica.",
        },
        {
          id: "ja7j-vocab-a8", type: "multiple_choice",
          prompt: "Como preguntas 'que te gusta (hacer) en tu tiempo libre)?'",
          payload: { choices: ["\u4f55\u304c \u3059\u304d\u3067\u3059\u304b\u3002", "\u3069\u3053\u306b \u3044\u304d\u307e\u3059\u304b\u3002", "\u3044\u304f\u3089\u3067\u3059\u304b\u3002"], answer: 0 },
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "ja7j-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: \u3067\u304d\u307e\u3059 (poder hacer) + frecuencia",
      intro: "Competencia de GRAMATICA. Aprende \u3067\u304d\u307e\u3059 con \u304c y los adverbios de frecuencia.",
      grammar: {
        title: "\u3067\u304d\u307e\u3059 (poder hacer algo)",
        form: "[actividad] + \u304c (ga) + \u3067\u304d\u307e\u3059",
        desc: "Sirve para decir que SABES o PUEDES hacer algo.",
        rule: "\u3067\u304d\u307e\u3059 funciona como \u3059\u304d: la cosa que puedes hacer lleva \u304c (ga), no \u3092. Para verbos de accion (como nadar), se agrega \u3053\u3068 (koto, 'el hecho de') antes de \u304c: '\u6cf3\u3050\u3053\u3068\u304c \u3067\u304d\u307e\u3059' = 'puedo nadar' (lit. 'el hecho de nadar es posible'). Los adverbios de frecuencia (\u3088\u304f, \u3068\u304d\u3069\u304d, \u3042\u307e\u308a) van ANTES del verbo.",
        table: {
          headers: ["Adverbio", "Frecuencia", "Ejemplo"],
          rows: [
            ["\u3088\u304f (yoku)", "frecuentemente", "\u3088\u304f \u8aad\u307f\u307e\u3059 (leo frecuentemente)"],
            ["\u3068\u304d\u3069\u304d (tokidoki)", "a veces", "\u3068\u304d\u3069\u304d \u304a\u3088\u304e\u307e\u3059 (a veces nado)"],
            ["\u3042\u307e\u308a\u301c\u307e\u305b\u3093 (amari~masen)", "casi no", "\u3042\u307e\u308a \u3057\u307e\u305b\u3093 (casi no lo hago)"],
          ],
        },
        examples: [
          "\u30c6\u30cb\u30b9*\u304c* \u3067\u304d\u307e\u3059\u3002 (Tenisu ga dekimasu.)",
          "\u6cf3\u3050*\u3053\u3068\u304c* \u3067\u304d\u307e\u3059\u3002 (Oyogu koto ga dekimasu.)",
          "\u3088\u304f \u304a\u3093\u304c\u304f\u3092 \u304d\u304d\u307e\u3059\u3002 (Yoku ongaku o kikimasu.)",
          "\u3042\u307e\u308a \u30b9\u30dd\u30fc\u30c4\u3092 \u3057\u307e\u305b\u3093\u3002 (Amari sup\u014dtsu o shimasen.)",
        ],
        explain: { tr: ["Puedo jugar tenis.", "Puedo nadar.", "Escucho musica frecuentemente.", "Casi no hago deporte."] },
        mistakes: [
          { wrong: "\u30c6\u30cb\u30b9\u3092 \u3067\u304d\u307e\u3059\u3002 (\u3092 en vez de \u304c)", right: "\u30c6\u30cb\u30b9\u304c \u3067\u304d\u307e\u3059\u3002" },
          { wrong: "\u6cf3\u3050\u304c \u3067\u304d\u307e\u3059\u3002 (falta \u3053\u3068)", right: "\u6cf3\u3050\u3053\u3068\u304c \u3067\u304d\u307e\u3059\u3002" },
          { wrong: "\u3042\u307e\u308a \u3057\u307e\u3059\u3002 (\u3042\u307e\u308a necesita negativo)", right: "\u3042\u307e\u308a \u3057\u307e\u305b\u3093\u3002" },
        ],
      },
      activities: [
        {
          id: "ja7j-gram-a1", type: "cloze",
          prompt: "Completa: '\u30c6\u30cb\u30b9___ \u3067\u304d\u307e\u3059\u3002' (particula: ga)",
          payload: { answer: "\u304c" },
          explain: "\u3067\u304d\u307e\u3059 usa \u304c, igual que \u3059\u304d.",
        },
        {
          id: "ja7j-gram-a2", type: "multiple_choice",
          prompt: "Para decir 'puedo nadar' (verbo de accion), necesitas:",
          payload: { choices: ["\u6cf3\u3050\u304c \u3067\u304d\u307e\u3059\u3002", "\u6cf3\u3050\u3053\u3068\u304c \u3067\u304d\u307e\u3059\u3002", "\u6cf3\u304e\u307e\u3059\u304c \u3067\u304d\u307e\u3059\u3002"], answer: 1 },
          explain: "Verbo + \u3053\u3068 + \u304c + \u3067\u304d\u307e\u3059.",
        },
        {
          id: "ja7j-gram-a3", type: "multiple_choice",
          prompt: "Cual va ANTES: el adverbio de frecuencia o el verbo?",
          payload: { choices: ["El adverbio", "El verbo", "No importa"], answer: 0 },
          explain: "\u3088\u304f/\u3068\u304d\u3069\u304d/\u3042\u307e\u308a van ANTES del verbo.",
        },
        {
          id: "ja7j-gram-a4", type: "word_bank",
          prompt: "Ordena: 'Puedo jugar tenis' (tenisu/ga/dekimasu):",
          payload: { words: ["\u3067\u304d\u307e\u3059", "\u30c6\u30cb\u30b9", "\u304c"], answer: ["\u30c6\u30cb\u30b9", "\u304c", "\u3067\u304d\u307e\u3059"] },
          explain: "Orden: \u30c6\u30cb\u30b9 + \u304c + \u3067\u304d\u307e\u3059.",
        },
        {
          id: "ja7j-gram-a5", type: "word_bank",
          prompt: "Ordena: 'Escucho musica frecuentemente' (yoku/ongaku/wo/kikimasu):",
          payload: { words: ["\u304d\u304d\u307e\u3059", "\u3088\u304f", "\u304a\u3093\u304c\u304f", "\u3092"], answer: ["\u3088\u304f", "\u304a\u3093\u304c\u304f", "\u3092", "\u304d\u304d\u307e\u3059"] },
          explain: "Orden: \u3088\u304f + \u304a\u3093\u304c\u304f + \u3092 + \u304d\u304d\u307e\u3059.",
        },
        {
          id: "ja7j-gram-a6", type: "multiple_choice",
          prompt: "'\u3042\u307e\u308a \u30b9\u30dd\u30fc\u30c4\u3092 \u3057\u307e\u305b\u3093\u3002' significa:",
          payload: { choices: ["Hago mucho deporte.", "Casi no hago deporte.", "Me gusta el deporte."], answer: 1 },
        },
        {
          id: "ja7j-gram-a7", type: "multiple_choice",
          prompt: "Negativo de \u3067\u304d\u307e\u3059:",
          payload: { choices: ["\u3067\u304d\u307e\u305b\u3093 (dekimasen)", "\u3067\u304d\u307e\u3057\u305f (dekimashita)", "\u3067\u304d\u306a\u3044 (dekinai)"], answer: 0 },
          explain: "\u3067\u304d\u307e\u305b\u3093 = no poder (presente educado).",
        },
        {
          id: "ja7j-gram-a8", type: "multiple_choice",
          prompt: "Elige la frase CORRECTA:",
          payload: { choices: ["\u304a\u3088\u304e\u307e\u3059\u304c\u3001\u3042\u307e\u308a \u3058\u3087\u3046\u305a\u3067\u306f \u3042\u308a\u307e\u305b\u3093\u3002", "\u304a\u3088\u304e\u307e\u3059\u3092\u3001\u3042\u307e\u308a \u3058\u3087\u3046\u305a\u3002", "\u3058\u3087\u3046\u305a \u304a\u3088\u304e\u307e\u3059\u304c\u3002"], answer: 0 },
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "ja7j-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: \u308f\u305f\u3057\u306e \u3057\u3085\u307f (tu pasatiempo)",
      intro: "Competencia de ESCRITURA. Describe tu pasatiempo, frase por frase.",
      activities: [
        {
          id: "ja7j-write-a1", type: "word_bank",
          prompt: "1. Di que tu pasatiempo es la musica:",
          payload: { words: ["\u3067\u3059", "\u304a\u3093\u304c\u304f", "\u3057\u3085\u307f\u306f"], answer: ["\u3057\u3085\u307f\u306f", "\u304a\u3093\u304c\u304f", "\u3067\u3059"] },
        },
        {
          id: "ja7j-write-a2", type: "word_bank",
          prompt: "2. Di que escuchas musica frecuentemente:",
          payload: { words: ["\u304d\u304d\u307e\u3059", "\u3088\u304f", "\u304a\u3093\u304c\u304f\u3092"], answer: ["\u3088\u304f", "\u304a\u3093\u304c\u304f\u3092", "\u304d\u304d\u307e\u3059"] },
        },
        {
          id: "ja7j-write-a3", type: "word_bank",
          prompt: "3. Di que puedes jugar tenis:",
          payload: { words: ["\u3067\u304d\u307e\u3059", "\u30c6\u30cb\u30b9\u304c"], answer: ["\u30c6\u30cb\u30b9\u304c", "\u3067\u304d\u307e\u3059"] },
        },
        {
          id: "ja7j-write-a4", type: "word_bank",
          prompt: "4. Di que casi no haces deporte:",
          payload: { words: ["\u3057\u307e\u305b\u3093", "\u3042\u307e\u308a", "\u30b9\u30dd\u30fc\u30c4\u3092"], answer: ["\u3042\u307e\u308a", "\u30b9\u30dd\u30fc\u30c4\u3092", "\u3057\u307e\u305b\u3093"] },
        },
        {
          id: "ja7j-write-a5", type: "word_bank",
          prompt: "5. Pregunta que le gusta hacer a alguien:",
          payload: { words: ["\u3059\u304d\u3067\u3059\u304b", "\u4f55\u304c"], answer: ["\u4f55\u304c", "\u3059\u304d\u3067\u3059\u304b"] },
        },
        {
          id: "ja7j-write-a6", type: "multiple_choice",
          prompt: "6. Alguien pregunta '\u30b9\u30dd\u30fc\u30c4\u306f \u3067\u304d\u307e\u3059\u304b'. No sabes jugar, respondes:",
          payload: { choices: ["\u306f\u3044\u3001\u3067\u304d\u307e\u3059\u3002", "\u3044\u3044\u3048\u3001\u3042\u307e\u308a \u3067\u304d\u307e\u305b\u3093\u3002", "\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059\u3002"], answer: 1 },
        },
        {
          id: "ja7j-write-a7", type: "multiple_choice",
          prompt: "7. Cual pregunta usarias para saber el pasatiempo de alguien?",
          payload: { choices: ["\u3057\u3085\u307f\u306f \u4f55\u3067\u3059\u304b\u3002", "\u3044\u304f\u3089\u3067\u3059\u304b\u3002", "\u3069\u3053\u306b \u3042\u308a\u307e\u3059\u304b\u3002"], answer: 0 },
        },
        {
          id: "ja7j-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase esta BIEN formada?",
          payload: { choices: ["\u6cf3\u3050\u3053\u3068\u304c \u3067\u304d\u307e\u3059\u3002", "\u6cf3\u3050\u3053\u3068\u3092 \u3067\u304d\u307e\u3059\u3002", "\u3067\u304d\u307e\u3059 \u6cf3\u3050\u3053\u3068\u304c\u3002"], answer: 0 },
        },
      ],
    },
  ],
};
