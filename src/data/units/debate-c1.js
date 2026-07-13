/**
 * data/units/debate-c1.js — Unidad tematica "Debate & negotiation" (C1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: hedging / modalidad atenuada.
 */

export const DEBATE_C1 = {
  id: "debate-c1",
  language: "en",
  level: "C1",
  title: "Debate & negotiation",
  subtitle: "Debatir y negociar con lenguaje atenuado (hedging)",

  cando: [
    "Puedo debatir y negociar con diplomacia.",
    "Puedo usar hedging para suavizar afirmaciones (tend to, it seems).",
    "Puedo expresar desacuerdo de forma educada.",
    "Puedo escribir de forma cauta y matizada.",
  ],

  vocab: [
    { id: "c1db-1", term: "to negotiate", translation: "negociar", example: "They negotiated a deal." },
    { id: "c1db-2", term: "compromise", translation: "acuerdo / concesion", example: "We reached a compromise." },
    { id: "c1db-3", term: "to concede", translation: "conceder / ceder", example: "He conceded the point." },
    { id: "c1db-4", term: "standpoint", translation: "postura", example: "From my standpoint, it's fair." },
    { id: "c1db-5", term: "to counter", translation: "rebatir", example: "She countered the argument." },
    { id: "c1db-6", term: "reasonable", translation: "razonable", example: "That's a reasonable offer." },
    { id: "c1db-7", term: "to reach an agreement", translation: "llegar a un acuerdo", example: "We reached an agreement." },
    { id: "c1db-8", term: "objection", translation: "objecion", example: "I have one objection." },
    { id: "c1db-9", term: "to acknowledge", translation: "reconocer", example: "I acknowledge your point." },
    { id: "c1db-10", term: "mutual", translation: "mutuo", example: "It was a mutual decision." },
    { id: "c1db-11", term: "to tend to", translation: "soler / tender a", example: "Prices tend to rise." },
    { id: "c1db-12", term: "diplomatic", translation: "diplomatico", example: "Be diplomatic in meetings." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1db-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: negociar con tacto",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - A good debate\n" +
          "In a good debate, people tend to disagree politely. 'It seems to me that the plan may be too " +
          "costly,' one said. 'That could be true, but it might also save time,' another countered. They " +
          "acknowledged each other's standpoints and, rather than argue, sought a compromise. It appears " +
          "that mutual respect helps. In the end, they reached a reasonable agreement.\n\n" +
          "TEXT 2 - A negotiation\n" +
          "A: I'm afraid this might be a problem. B: I see your point, but it could work. A: Perhaps we " +
          "could adjust the budget? B: That seems reasonable. A: I acknowledge your concerns. B: Let's be " +
          "diplomatic and reach an agreement. A: Agreed. It tends to be better to compromise.",
        glossary: [
          { term: "tend to / it seems", translation: "suelen / parece" },
          { term: "may be / could be / might", translation: "puede ser / podria ser / podria" },
          { term: "it appears / perhaps", translation: "parece que / quizas" },
          { term: "to concede / to counter", translation: "ceder / rebatir" },
          { term: "compromise / standpoint", translation: "acuerdo / postura" },
          { term: "to acknowledge / mutual", translation: "reconocer / mutuo" },
          { term: "reasonable / diplomatic", translation: "razonable / diplomatico" },
          { term: "to reach an agreement", translation: "llegar a un acuerdo" },
        ],
        keyPhrases: [
          "Fijate en el hedging: tend to, it seems, may be, could be, might, perhaps, it appears.",
          "Suavizan las afirmaciones para sonar diplomatico.",
        ],
        check: [
          { prompt: "T1: How do people tend to disagree in a good debate?", choices: ["Politely", "Angrily", "Loudly"], answer: 0 },
          { prompt: "T1: What did they seek instead of arguing?", choices: ["A compromise", "A fight", "Silence"], answer: 0 },
          { prompt: "T1: What did they reach in the end?", choices: ["A reasonable agreement", "A fight", "Nothing"], answer: 0 },
          { prompt: "T2: What does A suggest adjusting?", choices: ["The budget", "The time", "The team"], answer: 0 },
          { prompt: "T2: What does A acknowledge?", choices: ["B's concerns", "A mistake", "Nothing"], answer: 0 },
          { prompt: "T2: What tends to be better?", choices: ["To compromise", "To argue", "To leave"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c1db-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: debate y negociacion",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "to negotiate / compromise", translation: "negociar / acuerdo" },
        { term: "to concede / to counter", translation: "ceder / rebatir" },
        { term: "standpoint / objection", translation: "postura / objecion" },
        { term: "reasonable / mutual", translation: "razonable / mutuo" },
        { term: "to acknowledge / diplomatic", translation: "reconocer / diplomatico" },
        { term: "to tend to / to reach an agreement", translation: "soler / llegar a un acuerdo" },
      ],
      activities: [
        {
          id: "c1db-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "compromise", right: "acuerdo" },
            { left: "standpoint", right: "postura" },
            { left: "mutual", right: "mutuo" },
            { left: "objection", right: "objecion" },
          ] },
        },
        {
          id: "c1db-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to concede", right: "ceder" },
            { left: "to counter", right: "rebatir" },
            { left: "reasonable", right: "razonable" },
            { left: "diplomatic", right: "diplomatico" },
          ] },
        },
        {
          id: "c1db-vocab-a3", type: "cloze",
          prompt: "Completa: 'She ___ the argument.' (rebatir -> pasado)",
          payload: { answer: "countered" },
          explain: "'To counter' = rebatir; pasado: countered.",
        },
        {
          id: "c1db-vocab-a4", type: "cloze",
          prompt: "Completa: 'That's a ___ offer.' (razonable)",
          payload: { answer: "reasonable" },
          explain: "'Reasonable' = razonable.",
        },
        {
          id: "c1db-vocab-a5", type: "cloze",
          prompt: "Completa: 'Prices ___ to rise.' (soler)",
          payload: { answer: "tend" },
          explain: "'To tend to' = soler / tender a.",
        },
        {
          id: "c1db-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'reconocer (un punto)'?",
          payload: { choices: ["to concede", "to acknowledge", "to counter"], answer: 1 },
          explain: "'To acknowledge' = reconocer.",
        },
        {
          id: "c1db-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'diplomatico'?",
          payload: { choices: ["diplomatic", "mutual", "reasonable"], answer: 0 },
          explain: "'Diplomatic' = diplomatico.",
        },
        {
          id: "c1db-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["agreement", "We", "an", "reached"], answer: ["We", "reached", "an", "agreement"] },
          explain: "'We reached an agreement' = llegamos a un acuerdo.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c1db-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: hedging",
      intro: "Competencia de GRAMATICA. Aprende a suavizar afirmaciones (hedging).",
      grammar: {
        title: "Hedging / cautious language",
        form: "tend to + base · it seems/appears that... · may/might/could + base · perhaps",
        examples: ["Prices tend to rise.", "It seems that he is right.", "This may be a problem."],
        explain: { tr: ["Los precios tienden a subir.", "Parece que \u00e9l tiene raz\u00f3n.", "Esto podr\u00eda ser un problema."] },
        mistakes: [
          { wrong: "Prices tend rise.", right: "Prices tend to rise." },
          { wrong: "It seems he is right that.", right: "It seems that he is right." },
        ],
      },
      activities: [
        {
          id: "c1db-gram-a1", type: "cloze",
          prompt: "Completa: 'Prices tend ___ rise in winter.' (particula)",
          payload: { answer: "to" },
          explain: "'tend to + verbo base'.",
        },
        {
          id: "c1db-gram-a2", type: "cloze",
          prompt: "Completa: 'It ___ that he is right.' (seems)",
          payload: { answer: "seems" },
          explain: "'It seems that...' suaviza la afirmacion.",
        },
        {
          id: "c1db-gram-a3", type: "multiple_choice",
          prompt: "Which is the most cautious (hedged) statement?",
          payload: { choices: ["This is wrong.", "This may be a problem.", "This is definitely a disaster."], answer: 1 },
          explain: "'may be' suaviza y suena diplomatico.",
        },
        {
          id: "c1db-gram-a4", type: "multiple_choice",
          prompt: "Hedging is used to...",
          payload: { choices: ["sound aggressive", "soften statements and be diplomatic", "shout"], answer: 1 },
          explain: "Suaviza y da un tono diplomatico.",
        },
        {
          id: "c1db-gram-a5", type: "cloze",
          prompt: "Completa: '___ we could adjust the budget?' (quizas)",
          payload: { answer: "Perhaps" },
          explain: "'Perhaps' suaviza una sugerencia.",
        },
        {
          id: "c1db-gram-a6", type: "word_bank",
          prompt: "Ordena la frase atenuada:",
          payload: { words: ["be", "It", "could", "expensive", "too"], answer: ["It", "could", "be", "too", "expensive"] },
          explain: "It + could + be + too + expensive.",
        },
        {
          id: "c1db-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["to", "Prices", "rise", "tend"], answer: ["Prices", "tend", "to", "rise"] },
          explain: "Prices + tend + to + rise.",
        },
        {
          id: "c1db-gram-a8", type: "cloze",
          prompt: "Completa: 'It ___ that mutual respect helps.' (appears)",
          payload: { answer: "appears" },
          explain: "'It appears that...' es lenguaje cauto.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c1db-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: expresa desacuerdo con tacto",
      intro: "Competencia de ESCRITURA. Construye frases atenuadas.",
      activities: [
        {
          id: "c1db-write-a1", type: "word_bank",
          prompt: "1. Suaviza: podria ser demasiado caro:",
          payload: { words: ["be", "It", "could", "expensive", "too"], answer: ["It", "could", "be", "too", "expensive"] },
        },
        {
          id: "c1db-write-a2", type: "word_bank",
          prompt: "2. Di que reconoces su punto:",
          payload: { words: ["your", "I", "point", "acknowledge"], answer: ["I", "acknowledge", "your", "point"] },
        },
        {
          id: "c1db-write-a3", type: "word_bank",
          prompt: "3. Di que llegaron a un acuerdo:",
          payload: { words: ["an", "They", "agreement", "reached"], answer: ["They", "reached", "an", "agreement"] },
        },
        {
          id: "c1db-write-a4", type: "word_bank",
          prompt: "4. Suaviza una sugerencia con 'perhaps':",
          payload: { words: ["talk", "Perhaps", "could", "we"], answer: ["Perhaps", "we", "could", "talk"] },
        },
        {
          id: "c1db-write-a5", type: "word_bank",
          prompt: "5. Di que los precios suelen subir:",
          payload: { words: ["to", "Prices", "rise", "tend"], answer: ["Prices", "tend", "to", "rise"] },
        },
        {
          id: "c1db-write-a6", type: "multiple_choice",
          prompt: "6. Hedging is used to...",
          payload: { choices: ["sound aggressive", "soften statements and be diplomatic", "shout"], answer: 1 },
        },
        {
          id: "c1db-write-a7", type: "multiple_choice",
          prompt: "7. Which is the most diplomatic?",
          payload: { choices: ["You are wrong.", "I'm afraid I disagree.", "That's stupid."], answer: 1 },
        },
        {
          id: "c1db-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'llegar a un acuerdo'?",
          payload: { choices: ["to counter", "to reach an agreement", "to concede"], answer: 1 },
        },
      ],
    },
  ],
};
