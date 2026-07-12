/**
 * data/units/global-issues-c1.js — Unidad tematica "Global issues" (C1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: subjunctive.
 */

export const GLOBAL_ISSUES_C1 = {
  id: "global-issues-c1",
  language: "en",
  level: "C1",
  title: "Global issues",
  subtitle: "Debatir problemas globales y usar el subjuntivo",

  cando: [
    "Puedo debatir problemas globales complejos.",
    "Puedo usar el subjuntivo (I suggest that he be...).",
    "Puedo expresar propuestas y demandas formales.",
    "Puedo escribir sobre soluciones globales.",
  ],

  vocab: [
    { id: "c1gi-1", term: "poverty", translation: "pobreza", example: "Poverty affects millions." },
    { id: "c1gi-2", term: "inequality", translation: "desigualdad", example: "Inequality is growing." },
    { id: "c1gi-3", term: "crisis", translation: "crisis", example: "The world faces a crisis." },
    { id: "c1gi-4", term: "aid", translation: "ayuda (humanitaria)", example: "They sent aid quickly." },
    { id: "c1gi-5", term: "refugee", translation: "refugiado", example: "Refugees need support." },
    { id: "c1gi-6", term: "to tackle", translation: "abordar / afrontar", example: "We must tackle hunger." },
    { id: "c1gi-7", term: "sustainable", translation: "sostenible", example: "Sustainable growth is key." },
    { id: "c1gi-8", term: "policy", translation: "politica / medida", example: "A new policy is needed." },
    { id: "c1gi-9", term: "to demand", translation: "exigir", example: "Citizens demand action." },
    { id: "c1gi-10", term: "cooperation", translation: "cooperacion", example: "Global cooperation is vital." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1gi-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: un mundo mejor",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "The report recommends that every country tackle poverty and inequality. Experts demand that " +
          "aid be sent faster to regions in crisis. It is essential that governments cooperate and that " +
          "each policy be sustainable. The UN suggests that no refugee be left without support. Many " +
          "insist that action be taken now, before the crisis worsens. Only through global cooperation, " +
          "they argue, can real change be achieved.",
        keyPhrases: [
          "Fijate en el subjuntivo: recommends that ... tackle, demand that aid be sent, suggests that ... be.",
          "Tras suggest/demand/insist/essential that, el verbo va en forma base (subjuntivo).",
        ],
        check: [
          { prompt: "What does the report recommend?", choices: ["Tackling poverty and inequality", "Ignoring it", "More taxes"], answer: 0 },
          { prompt: "What do experts demand?", choices: ["Aid be sent faster", "Less aid", "Nothing"], answer: 0 },
          { prompt: "What must each policy be?", choices: ["Sustainable", "Cheap", "Secret"], answer: 0 },
          { prompt: "How can real change be achieved?", choices: ["Global cooperation", "Isolation", "Doing nothing"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c1gi-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: problemas globales",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "poverty / inequality", translation: "pobreza / desigualdad" },
        { term: "crisis / aid", translation: "crisis / ayuda" },
        { term: "refugee", translation: "refugiado" },
        { term: "to tackle / to demand", translation: "abordar / exigir" },
        { term: "sustainable / policy", translation: "sostenible / politica" },
        { term: "cooperation", translation: "cooperacion" },
      ],
      activities: [
        {
          id: "c1gi-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "crisis", right: "crisis" },
            { left: "aid", right: "ayuda" },
            { left: "policy", right: "politica" },
          ] },
        },
        {
          id: "c1gi-vocab-a2", type: "cloze",
          prompt: "Completa: 'We must ___ hunger.' (abordar)",
          payload: { answer: "tackle" },
          explain: "'To tackle' = abordar / afrontar.",
        },
        {
          id: "c1gi-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'exigir'?",
          payload: { choices: ["to tackle", "to demand", "to send"], answer: 1 },
          explain: "'To demand' = exigir.",
        },
        {
          id: "c1gi-vocab-a4", type: "cloze",
          prompt: "Completa: 'Global ___ is vital.' (cooperacion)",
          payload: { answer: "cooperation" },
          explain: "'Cooperation' = cooperacion.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c1gi-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: subjuntivo",
      intro: "Competencia de GRAMATICA. Aprende el subjuntivo en propuestas y demandas.",
      grammar: {
        title: "The subjunctive",
        form: "suggest/demand/insist/recommend + that + sujeto + verbo BASE (be, tackle, go...)",
        examples: ["I suggest that he be present.", "They demand that aid be sent.", "It is essential that she attend."],
        mistakes: [
          { wrong: "I suggest that he is present.", right: "I suggest that he be present." },
          { wrong: "They demand that aid is sent.", right: "They demand that aid be sent." },
        ],
      },
      activities: [
        {
          id: "c1gi-gram-a1", type: "cloze",
          prompt: "Completa: 'They demand that aid ___ sent.' (subjuntivo de be)",
          payload: { answer: "be" },
          explain: "Tras 'demand that', verbo en base: 'be sent'.",
        },
        {
          id: "c1gi-gram-a2", type: "cloze",
          prompt: "Completa: 'I suggest that he ___ present.' (be/is)",
          payload: { answer: "be" },
          explain: "Subjuntivo: 'that he be' (no 'is').",
        },
        {
          id: "c1gi-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct subjunctive:",
          payload: { choices: [
            "It is essential that she attends.",
            "It is essential that she attend.",
            "It is essential that she attending.",
          ], answer: 1 },
          explain: "Subjuntivo: 'that she attend' (base, sin -s).",
        },
        {
          id: "c1gi-gram-a4", type: "word_bank",
          prompt: "Ordena la frase (subjuntivo):",
          payload: { words: ["that", "I", "he", "suggest", "go"], answer: ["I", "suggest", "that", "he", "go"] },
          explain: "Subjuntivo: 'I suggest that he go' (verbo base, sin -s).",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c1gi-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: propon soluciones",
      intro: "Competencia de ESCRITURA. Construye frases con subjuntivo. Ordena cada frase.",
      activities: [
        {
          id: "c1gi-write-a1", type: "word_bank",
          prompt: "Exige que se envie la ayuda:",
          payload: { words: ["that", "We", "aid", "demand", "sent", "be"], answer: ["We", "demand", "that", "aid", "be", "sent"] },
        },
        {
          id: "c1gi-write-a2", type: "word_bank",
          prompt: "Di que los ciudadanos exigen accion:",
          payload: { words: ["action", "Citizens", "demand"], answer: ["Citizens", "demand", "action"] },
        },
        {
          id: "c1gi-write-a3", type: "word_bank",
          prompt: "Di que debemos afrontar la pobreza:",
          payload: { words: ["poverty", "We", "tackle", "must"], answer: ["We", "must", "tackle", "poverty"] },
        },
        {
          id: "c1gi-write-a4", type: "multiple_choice",
          prompt: "After 'demand that', the verb is...",
          payload: { choices: ["in past", "in base form (subjunctive)", "with -ing"], answer: 1 },
        },
      ],
    },
  ],
};
