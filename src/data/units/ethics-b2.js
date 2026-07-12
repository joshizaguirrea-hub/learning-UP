/**
 * data/units/ethics-b2.js — Unidad tematica "Ethics & decisions" (B2).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: mixed conditionals.
 */

export const ETHICS_B2 = {
  id: "ethics-b2",
  language: "en",
  level: "B2",
  title: "Ethics & decisions",
  subtitle: "Hablar de dilemas eticos y condicionales mixtos",

  cando: [
    "Puedo discutir dilemas eticos y decisiones dificiles.",
    "Puedo usar condicionales mixtos (pasado -> presente).",
    "Puedo conectar una accion pasada con un resultado actual.",
    "Puedo escribir sobre las consecuencias de una decision.",
  ],

  vocab: [
    { id: "b2eth-1", term: "honest", translation: "honesto", example: "Being honest is important." },
    { id: "b2eth-2", term: "fair", translation: "justo", example: "The decision was fair." },
    { id: "b2eth-3", term: "dilemma", translation: "dilema", example: "It's a moral dilemma." },
    { id: "b2eth-4", term: "responsibility", translation: "responsabilidad", example: "We share the responsibility." },
    { id: "b2eth-5", term: "to blame", translation: "culpar", example: "Don't blame others." },
    { id: "b2eth-6", term: "guilty", translation: "culpable", example: "He felt guilty." },
    { id: "b2eth-7", term: "to deserve", translation: "merecer", example: "She deserves a reward." },
    { id: "b2eth-8", term: "values", translation: "valores", example: "We share the same values." },
    { id: "b2eth-9", term: "to judge", translation: "juzgar", example: "Don't judge too quickly." },
    { id: "b2eth-10", term: "trust", translation: "confianza", example: "Trust must be earned." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2eth-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: un dilema moral",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Sara found a wallet full of money. It was a real dilemma. If she weren't so honest, she " +
          "would have kept it. But she returned it. If she had kept the money, she would feel guilty " +
          "now. Her friend said, 'If I were you, I would have done the same.' Being fair is part of her " +
          "values. If she hadn't returned it, the owner wouldn't trust people today. Sara believes we " +
          "all share the responsibility to do the right thing.",
        keyPhrases: [
          "Fijate en condicionales mixtos: If she had kept it (pasado), she would feel guilty now (presente).",
          "Conectan un pasado hipotetico con un resultado en el presente.",
        ],
        check: [
          { prompt: "What did Sara find?", choices: ["A wallet full of money", "A phone", "A dog"], answer: 0 },
          { prompt: "What did she do?", choices: ["Kept it", "Returned it", "Lost it"], answer: 1 },
          { prompt: "How would she feel now if she had kept it?", choices: ["Happy", "Guilty", "Proud"], answer: 1 },
          { prompt: "What is part of her values?", choices: ["Being fair", "Being rich", "Being fast"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "b2eth-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: etica y valores",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "honest / fair", translation: "honesto / justo" },
        { term: "dilemma / values", translation: "dilema / valores" },
        { term: "responsibility", translation: "responsabilidad" },
        { term: "to blame / guilty", translation: "culpar / culpable" },
        { term: "to deserve / to judge", translation: "merecer / juzgar" },
        { term: "trust", translation: "confianza" },
      ],
      activities: [
        {
          id: "b2eth-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "honest", right: "honesto" },
            { left: "guilty", right: "culpable" },
            { left: "trust", right: "confianza" },
          ] },
        },
        {
          id: "b2eth-vocab-a2", type: "cloze",
          prompt: "Completa: 'It's a moral ___.' (dilema)",
          payload: { answer: "dilemma" },
          explain: "'Dilemma' = dilema.",
        },
        {
          id: "b2eth-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'merecer'?",
          payload: { choices: ["to blame", "to deserve", "to judge"], answer: 1 },
          explain: "'To deserve' = merecer.",
        },
        {
          id: "b2eth-vocab-a4", type: "cloze",
          prompt: "Completa: 'The decision was ___.' (justo)",
          payload: { answer: "fair" },
          explain: "'Fair' = justo.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "b2eth-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: condicionales mixtos",
      intro: "Competencia de GRAMATICA. Aprende a conectar pasado y presente hipoteticos.",
      grammar: {
        title: "Mixed conditionals",
        form: "pasado -> presente: If + had + participio, ... would + base (ahora)",
        examples: ["If I had studied medicine, I would be a doctor now.", "If she hadn't left, she would be here today."],
        mistakes: [
          { wrong: "If I had studied, I would have be a doctor now.", right: "If I had studied, I would be a doctor now." },
          { wrong: "If I studied, I would be a doctor now (past cause).", right: "If I had studied, I would be a doctor now." },
        ],
      },
      activities: [
        {
          id: "b2eth-gram-a1", type: "cloze",
          prompt: "Completa: 'If I ___ studied medicine, I would be a doctor now.' (had?)",
          payload: { answer: "had" },
          explain: "La causa pasada lleva 'had + participio'.",
        },
        {
          id: "b2eth-gram-a2", type: "cloze",
          prompt: "Completa: 'If she hadn't left, she ___ be here now.' (would/will)",
          payload: { answer: "would" },
          explain: "El resultado presente lleva 'would + base'.",
        },
        {
          id: "b2eth-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct mixed conditional:",
          payload: { choices: [
            "If I had saved money, I would be rich now.",
            "If I saved money, I would have been rich now.",
            "If I save money, I would be rich now.",
          ], answer: 0 },
          explain: "Causa pasada (had saved) -> resultado presente (would be).",
        },
        {
          id: "b2eth-gram-a4", type: "word_bank",
          prompt: "Ordena el condicional mixto:",
          payload: { words: ["had", "If", "I", "tired", "slept,", "be", "wouldn't", "I"], answer: ["If", "I", "had", "slept,", "I", "wouldn't", "be", "tired"] },
          explain: "Orden: If + I + had + slept, + I + wouldn't + be + tired.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "b2eth-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: consecuencias de una decision",
      intro: "Competencia de ESCRITURA. Construye condicionales mixtos. Ordena cada frase.",
      activities: [
        {
          id: "b2eth-write-a1", type: "word_bank",
          prompt: "Di que si hubieras dormido, no estarias cansado:",
          payload: { words: ["had", "If", "I", "tired", "slept,", "be", "wouldn't", "I"], answer: ["If", "I", "had", "slept,", "I", "wouldn't", "be", "tired"] },
        },
        {
          id: "b2eth-write-a2", type: "word_bank",
          prompt: "Di que ella devolvio la billetera:",
          payload: { words: ["the", "She", "wallet", "returned"], answer: ["She", "returned", "the", "wallet"] },
        },
        {
          id: "b2eth-write-a3", type: "word_bank",
          prompt: "Di que todos compartimos la responsabilidad:",
          payload: { words: ["the", "We", "share", "responsibility", "all"], answer: ["We", "all", "share", "the", "responsibility"] },
        },
        {
          id: "b2eth-write-a4", type: "multiple_choice",
          prompt: "A mixed conditional connects...",
          payload: { choices: ["A past cause and a present result", "Two futures", "Two presents"], answer: 0 },
        },
      ],
    },
  ],
};
