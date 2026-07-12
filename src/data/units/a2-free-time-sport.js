/**
 * data/units/a2-free-time-sport.js — Unidad tematica "Free time & sport" (A2).
 *
 * Datos PUROS. Introduccion al primer condicional y adverbios de modo, con
 * vocabulario de deporte. Ciclo PPP del estandar de calidad (ver PLAN-DE-ESTUDIO.md).
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
    {
      id: "a2fs-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: el gran partido",
      intro:
        "Lee la historia y estudia el primer condicional y los adverbios. Aqui solo se lee y se aprende.",
      teachesVocab: true,
      content: {
        reading:
          "Our team has an important match on Saturday. The coach says: 'If we train hard, we will " +
          "win. If we play badly, we will lose.' Our best player runs very quickly and scores well. " +
          "She practises every day to stay fit. 'If you believe in yourselves, you will play better,' " +
          "says the coach. Everyone is excited. If it doesn't rain, the match will be perfect!",
        glossary: [
          { term: "If we train, we will win", translation: "Si entrenamos, ganaremos" },
          { term: "quickly", translation: "rapidamente" },
          { term: "well / badly", translation: "bien / mal" },
          { term: "to score", translation: "anotar" },
          { term: "fit", translation: "en forma" },
          { term: "coach", translation: "entrenador" },
        ],
        keyPhrases: [
          "If + present, ... will + verbo (primer condicional)",
          "She plays well / badly. (Juega bien / mal.)",
          "He runs quickly. (Corre rapidamente.)",
          "If it rains, we will stay home. (Si llueve, nos quedamos.)",
        ],
        note:
          "Primer condicional (situaciones reales del futuro): 'If + presente, ... will + verbo base'. " +
          "Los adverbios de modo dicen COMO se hace algo y suelen terminar en -ly: quick->quickly. " +
          "Ojo: 'good' es adjetivo, pero su adverbio es 'well'.",
        grammar: {
          title: "Primer condicional / adverbios de modo",
          form: "If + present simple, subject + will + base · adjetivo + ly = adverbio",
          examples: [
            "If we train, we will win.",
            "She sings beautifully.",
          ],
          mistakes: [
            { wrong: "If we will train, we win.", right: "If we train, we will win." },
            { wrong: "He plays good.", right: "He plays well." },
          ],
        },
        check: [
          { prompt: "What happens if they train hard?", choices: ["They will lose", "They will win", "Nothing"], answer: 1 },
          { prompt: "How does the best player run?", choices: ["Slowly", "Quickly", "Badly"], answer: 1 },
        ],
      },
      activities: [],
    },
    {
      id: "a2fs-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: hablar de resultados",
      intro: "Usamos el primer condicional para consecuencias reales. Lee el dialogo.",
      dialogue: [
        "A: Do you think we'll win on Saturday?",
        "B: If we train hard, we will win for sure.",
        "A: And if it rains?",
        "B: If it rains, the match will be difficult.",
      ],
      activities: [
        {
          id: "a2fs-l1-a1", type: "multiple_choice",
          prompt: "Choose the correct first conditional:",
          payload: { choices: [
            "If we will study, we pass.",
            "If we study, we will pass.",
            "If we studying, we will pass.",
          ], answer: 1 },
          explain: "If + presente, ... will + base. El 'if' NO lleva will.",
        },
        {
          id: "a2fs-l1-a2", type: "matching",
          prompt: "Empareja el adjetivo con su adverbio:",
          payload: { pairs: [
            { left: "good", right: "well" },
            { left: "quick", right: "quickly" },
            { left: "bad", right: "badly" },
          ] },
        },
      ],
    },
    {
      id: "a2fs-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: condicional y adverbios",
      intro: "Completa, elige y ordena para practicar.",
      activities: [
        {
          id: "a2fs-l2-a1", type: "cloze",
          prompt: "Completa: 'If we train, we ___ win.' (futuro)",
          payload: { answer: "will" },
          explain: "Primer condicional: la consecuencia lleva 'will'.",
        },
        {
          id: "a2fs-l2-a2", type: "cloze",
          prompt: "Completa: 'He runs very ___.' (quick -> adverbio)",
          payload: { answer: "quickly" },
          explain: "Adverbio de modo: quick -> quickly.",
        },
        {
          id: "a2fs-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "She plays very good.",
            "She plays very well.",
            "She plays very goodly.",
          ], answer: 1 },
          explain: "El adverbio de 'good' es 'well'.",
        },
        {
          id: "a2fs-l2-a4", type: "word_bank",
          prompt: "Ordena el condicional:",
          payload: { words: ["rains,", "If", "stay", "it", "we'll", "home"],
                     answer: ["If", "it", "rains,", "we'll", "stay", "home"] },
          explain: "Orden: If + it + rains, + we'll + stay + home.",
        },
        {
          id: "a2fs-l2-a5", type: "cloze",
          prompt: "Completa: 'She ___ two goals.' (score -> pasado)",
          payload: { answer: "scored" },
          explain: "Pasado regular: score -> scored.",
        },
      ],
    },
    {
      id: "a2fs-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: predice resultados",
      intro: "Tarea real: construye frases con el primer condicional. Ordena cada frase.",
      activities: [
        {
          id: "a2fs-l3-a1", type: "word_bank",
          prompt: "Di que si entrenan, ganaran:",
          payload: { words: ["train,", "If", "we'll", "we", "win"],
                     answer: ["If", "we", "train,", "we'll", "win"] },
        },
        {
          id: "a2fs-l3-a2", type: "word_bank",
          prompt: "Di que ella juega muy bien:",
          payload: { words: ["well", "She", "very", "plays"],
                     answer: ["She", "plays", "very", "well"] },
        },
        {
          id: "a2fs-l3-a3", type: "word_bank",
          prompt: "Di que si llueve, se quedaran en casa:",
          payload: { words: ["rains,", "If", "stay", "it", "we'll", "home"],
                     answer: ["If", "it", "rains,", "we'll", "stay", "home"] },
        },
        {
          id: "a2fs-l3-a4", type: "multiple_choice",
          prompt: "Which word means 'ganar'?",
          payload: { choices: ["to lose", "to win", "to train"], answer: 1 },
        },
      ],
    },
  ],
};
