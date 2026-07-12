/**
 * data/units/environment-b1.js — Unidad tematica "Environment" (B1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: passive voice.
 */

export const ENVIRONMENT_B1 = {
  id: "environment-b1",
  language: "en",
  level: "B1",
  title: "Environment",
  subtitle: "Hablar del medio ambiente y los problemas del planeta",

  cando: [
    "Puedo hablar de problemas ambientales y soluciones.",
    "Puedo usar la voz pasiva (presente y pasado).",
    "Puedo describir procesos y acciones sin decir quien.",
    "Puedo escribir sobre como cuidar el planeta.",
  ],

  vocab: [
    { id: "env-1", term: "pollution", translation: "contaminacion", example: "Air pollution is a big problem." },
    { id: "env-2", term: "to recycle", translation: "reciclar", example: "We recycle paper and glass." },
    { id: "env-3", term: "waste", translation: "residuos / basura", example: "We produce too much waste." },
    { id: "env-4", term: "energy", translation: "energia", example: "Solar energy is clean." },
    { id: "env-5", term: "to protect", translation: "proteger", example: "We must protect the forests." },
    { id: "env-6", term: "climate change", translation: "cambio climatico", example: "Climate change is real." },
    { id: "env-7", term: "to pollute", translation: "contaminar", example: "Factories pollute the river." },
    { id: "env-8", term: "planet", translation: "planeta", example: "We only have one planet." },
    { id: "env-9", term: "to save", translation: "ahorrar / salvar", example: "Save water every day." },
    { id: "env-10", term: "plastic", translation: "plastico", example: "Plastic harms the oceans." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "env-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: cuidar el planeta",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Our planet is in danger. Every year, millions of tons of waste are produced, and many " +
          "rivers are polluted by factories. Last month, a beautiful beach was covered with plastic. " +
          "But there is hope. Paper and glass are recycled in many cities, and clean energy is used " +
          "more than before. Trees are planted every spring. The environment must be protected, and " +
          "small actions are made by ordinary people every day.",
        keyPhrases: [
          "Fijate en las formas pasivas: are produced, was covered, are recycled.",
          "Busca los problemas y las soluciones.",
        ],
        check: [
          { prompt: "What is produced every year?", choices: ["Clean energy only", "Millions of tons of waste", "Trees"], answer: 1 },
          { prompt: "What was the beach covered with?", choices: ["Sand", "Plastic", "Trees"], answer: 1 },
          { prompt: "What is recycled in many cities?", choices: ["Paper and glass", "Plastic bags", "Cars"], answer: 0 },
          { prompt: "What happens every spring?", choices: ["Beaches close", "Trees are planted", "Rivers dry up"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "env-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: medio ambiente",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "pollution / to pollute", translation: "contaminacion / contaminar" },
        { term: "to recycle / waste", translation: "reciclar / residuos" },
        { term: "energy", translation: "energia" },
        { term: "to protect / to save", translation: "proteger / ahorrar" },
        { term: "climate change", translation: "cambio climatico" },
        { term: "planet / plastic", translation: "planeta / plastico" },
      ],
      activities: [
        {
          id: "env-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "pollution", right: "contaminacion" },
            { left: "waste", right: "residuos" },
            { left: "energy", right: "energia" },
          ] },
        },
        {
          id: "env-vocab-a2", type: "cloze",
          prompt: "Completa: 'We ___ paper and glass.' (reciclar)",
          payload: { answer: "recycle" },
          explain: "'To recycle' = reciclar.",
        },
        {
          id: "env-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'proteger'?",
          payload: { choices: ["to pollute", "to protect", "to waste"], answer: 1 },
          explain: "'To protect' = proteger.",
        },
        {
          id: "env-vocab-a4", type: "cloze",
          prompt: "Completa: '___ change is real.' (cambio climatico)",
          payload: { answer: "Climate" },
          explain: "'Climate change' = cambio climatico.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "env-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: voz pasiva",
      intro: "Competencia de GRAMATICA. Aprende la voz pasiva (presente y pasado).",
      grammar: {
        title: "Voz pasiva (present y past)",
        form: "presente: is/are + participio · pasado: was/were + participio",
        examples: ["Paper is recycled.", "The river was polluted.", "Trees are planted every year."],
        mistakes: [
          { wrong: "The river was pollute.", right: "The river was polluted." },
          { wrong: "Paper is recycle.", right: "Paper is recycled." },
        ],
      },
      activities: [
        {
          id: "env-gram-a1", type: "cloze",
          prompt: "Completa: 'Paper ___ recycled here.' (is/are, singular)",
          payload: { answer: "is" },
          explain: "Pasiva presente singular: 'is' + participio.",
        },
        {
          id: "env-gram-a2", type: "cloze",
          prompt: "Completa: 'The river was ___.' (pollute -> participio)",
          payload: { answer: "polluted" },
          explain: "Pasiva pasado: was + participio (polluted).",
        },
        {
          id: "env-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct passive sentence:",
          payload: { choices: ["Trees are plant every year.", "Trees are planted every year.", "Trees is planted every year."], answer: 1 },
          explain: "Plural: 'are' + participio (planted).",
        },
        {
          id: "env-gram-a4", type: "word_bank",
          prompt: "Ordena la frase pasiva:",
          payload: { words: ["is", "Glass", "recycled"], answer: ["Glass", "is", "recycled"] },
          explain: "Orden: Glass + is + recycled.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "env-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: cuida el planeta",
      intro: "Competencia de ESCRITURA. Construye frases sobre el medio ambiente. Ordena cada frase.",
      activities: [
        {
          id: "env-write-a1", type: "word_bank",
          prompt: "Di que el papel se recicla:",
          payload: { words: ["recycled", "Paper", "is"], answer: ["Paper", "is", "recycled"] },
        },
        {
          id: "env-write-a2", type: "word_bank",
          prompt: "Di que debemos proteger los bosques:",
          payload: { words: ["protect", "We", "the", "must", "forests"], answer: ["We", "must", "protect", "the", "forests"] },
        },
        {
          id: "env-write-a3", type: "word_bank",
          prompt: "Di que se debe ahorrar agua:",
          payload: { words: ["day", "Save", "every", "water"], answer: ["Save", "water", "every", "day"] },
        },
        {
          id: "env-write-a4", type: "multiple_choice",
          prompt: "Which is passive (past)?",
          payload: { choices: ["Factories pollute the river.", "The river was polluted.", "We recycle paper."], answer: 1 },
        },
      ],
    },
  ],
};
