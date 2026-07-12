/**
 * data/units/a2-free-time-sport.js — Unidad tematica "Free time & sport" (A2).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA. Listening/Speaking con audio/IA.
 */

export const A2_FREE_TIME_SPORT = {
  id: "a2-free-time-sport",
  language: "en",
  level: "A2",
  title: "Free time & sport",
  subtitle: "Hablar de deporte, con el primer condicional y adverbios",

  cando: [
    "Puedo hablar de deportes y actividades.",
    "Puedo usar el primer condicional (If + presente, will).",
    "Puedo usar adverbios de modo (well, badly, quickly).",
    "Puedo hablar de habilidades y resultados.",
  ],

  vocab: [
    { id: "a2fs-1", term: "team", translation: "equipo", example: "My team plays on Sundays." },
    { id: "a2fs-2", term: "to win", translation: "ganar", example: "If we train, we'll win." },
    { id: "a2fs-3", term: "to lose", translation: "perder", example: "We'll lose if we don't try." },
    { id: "a2fs-4", term: "to train", translation: "entrenar", example: "They train every day." },
    { id: "a2fs-5", term: "match", translation: "partido", example: "The match starts at five." },
    { id: "a2fs-6", term: "well", translation: "bien (adverbio)", example: "She plays very well." },
    { id: "a2fs-7", term: "badly", translation: "mal (adverbio)", example: "He played badly today." },
    { id: "a2fs-8", term: "quickly", translation: "rapidamente", example: "He runs quickly." },
    { id: "a2fs-9", term: "to score", translation: "anotar / marcar", example: "She scored two goals." },
    { id: "a2fs-10", term: "fit", translation: "en forma", example: "Exercise keeps you fit." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a2fs-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: el gran partido",
      intro: "Competencia de LECTURA. Lee la historia y comprueba que entendiste.",
      content: {
        reading:
          "Our team has an important match on Saturday. The coach says: 'If we train hard, we will " +
          "win. If we play badly, we will lose.' Our best player runs very quickly and scores well. " +
          "She practises every day to stay fit. 'If you believe in yourselves, you will play better,' " +
          "says the coach. Everyone is excited. If it doesn't rain, the match will be perfect!",
        keyPhrases: [
          "Busca las condiciones (If...) y sus resultados (will...).",
          "Fijate en los adverbios: quickly, well, badly.",
        ],
        check: [
          { prompt: "What happens if they train hard?", choices: ["They will lose", "They will win", "Nothing"], answer: 1 },
          { prompt: "How does the best player run?", choices: ["Slowly", "Quickly", "Badly"], answer: 1 },
          { prompt: "How often does she practise?", choices: ["Every day", "Once a week", "Never"], answer: 0 },
          { prompt: "When will the match be perfect?", choices: ["If it rains", "If it doesn't rain", "If they lose"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a2fs-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: deporte y resultados",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "team / match", translation: "equipo / partido" },
        { term: "to win / to lose", translation: "ganar / perder" },
        { term: "to train / to score", translation: "entrenar / anotar" },
        { term: "well / badly", translation: "bien / mal" },
        { term: "quickly", translation: "rapidamente" },
        { term: "fit", translation: "en forma" },
      ],
      activities: [
        {
          id: "a2fs-vocab-a1", type: "matching",
          prompt: "Empareja el adjetivo con su adverbio:",
          payload: { pairs: [
            { left: "good", right: "well" },
            { left: "quick", right: "quickly" },
            { left: "bad", right: "badly" },
          ] },
        },
        {
          id: "a2fs-vocab-a2", type: "multiple_choice",
          prompt: "Which word means 'ganar'?",
          payload: { choices: ["to lose", "to win", "to train"], answer: 1 },
          explain: "'To win' = ganar.",
        },
        {
          id: "a2fs-vocab-a3", type: "cloze",
          prompt: "Completa: 'She ___ two goals.' (score -> pasado)",
          payload: { answer: "scored" },
          explain: "Pasado regular: score -> scored.",
        },
        {
          id: "a2fs-vocab-a4", type: "multiple_choice",
          prompt: "Which word means 'en forma'?",
          payload: { choices: ["fit", "match", "team"], answer: 0 },
          explain: "'Fit' = en forma.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a2fs-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: primer condicional",
      intro: "Competencia de GRAMATICA. Aprende el primer condicional y los adverbios de modo.",
      grammar: {
        title: "Primer condicional / adverbios de modo",
        form: "If + present simple, subject + will + base · adjetivo + ly = adverbio",
        examples: ["If we train, we will win.", "She sings beautifully."],
        mistakes: [
          { wrong: "If we will train, we win.", right: "If we train, we will win." },
          { wrong: "He plays good.", right: "He plays well." },
        ],
      },
      activities: [
        {
          id: "a2fs-gram-a1", type: "cloze",
          prompt: "Completa: 'If we train, we ___ win.' (futuro)",
          payload: { answer: "will" },
          explain: "La consecuencia lleva 'will'.",
        },
        {
          id: "a2fs-gram-a2", type: "cloze",
          prompt: "Completa: 'He runs very ___.' (quick -> adverbio)",
          payload: { answer: "quickly" },
          explain: "Adverbio de modo: quick -> quickly.",
        },
        {
          id: "a2fs-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["She plays very good.", "She plays very well.", "She plays very goodly."], answer: 1 },
          explain: "El adverbio de 'good' es 'well'.",
        },
        {
          id: "a2fs-gram-a4", type: "word_bank",
          prompt: "Ordena el condicional:",
          payload: { words: ["rains,", "If", "stay", "it", "we'll", "home"], answer: ["If", "it", "rains,", "we'll", "stay", "home"] },
          explain: "Orden: If + it + rains, + we'll + stay + home.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a2fs-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: predice resultados",
      intro: "Competencia de ESCRITURA. Construye frases con el primer condicional. Ordena cada frase.",
      activities: [
        {
          id: "a2fs-write-a1", type: "word_bank",
          prompt: "Di que si entrenan, ganaran:",
          payload: { words: ["train,", "If", "we'll", "we", "win"], answer: ["If", "we", "train,", "we'll", "win"] },
        },
        {
          id: "a2fs-write-a2", type: "word_bank",
          prompt: "Di que ella juega muy bien:",
          payload: { words: ["well", "She", "very", "plays"], answer: ["She", "plays", "very", "well"] },
        },
        {
          id: "a2fs-write-a3", type: "word_bank",
          prompt: "Di que si llueve, se quedaran en casa:",
          payload: { words: ["rains,", "If", "stay", "it", "we'll", "home"], answer: ["If", "it", "rains,", "we'll", "stay", "home"] },
        },
        {
          id: "a2fs-write-a4", type: "multiple_choice",
          prompt: "Choose the correct first conditional:",
          payload: { choices: ["If we will study, we pass.", "If we study, we will pass.", "If we studying, we will pass."], answer: 1 },
        },
      ],
    },
  ],
};
