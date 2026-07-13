/**
 * data/units/debate-mastery-c2.js — Unidad tematica "Debate mastery" (C2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: concesion y refutacion.
 */

export const DEBATE_MASTERY_C2 = {
  id: "debate-mastery-c2",
  language: "en",
  level: "C2",
  title: "Debate mastery",
  subtitle: "Conceder puntos y refutar con elegancia",

  cando: [
    "Puedo debatir a alto nivel con estructura.",
    "Puedo conceder un punto y luego refutarlo (concession + rebuttal).",
    "Puedo usar conectores de concesion (admittedly, granted, that said).",
    "Puedo escribir una refutacion razonada.",
  ],

  vocab: [
    { id: "c2dm-1", term: "admittedly", translation: "hay que admitir que", example: "Admittedly, it's expensive." },
    { id: "c2dm-2", term: "granted", translation: "de acuerdo / concedido", example: "Granted, you have a point." },
    { id: "c2dm-3", term: "that said", translation: "dicho eso", example: "That said, I disagree." },
    { id: "c2dm-4", term: "to refute", translation: "refutar", example: "She refuted the claim." },
    { id: "c2dm-5", term: "counterargument", translation: "contraargumento", example: "Prepare a counterargument." },
    { id: "c2dm-6", term: "valid", translation: "valido", example: "That's a valid concern." },
    { id: "c2dm-7", term: "nonetheless", translation: "no obstante", example: "Nonetheless, I object." },
    { id: "c2dm-8", term: "to concede", translation: "conceder / ceder", example: "I concede that point." },
    { id: "c2dm-9", term: "flaw", translation: "fallo / defecto", example: "The plan has a flaw." },
    { id: "c2dm-10", term: "persuasive", translation: "persuasivo", example: "A persuasive speaker." },
    { id: "c2dm-11", term: "to rebut", translation: "rebatir", example: "He rebutted the point." },
    { id: "c2dm-12", term: "on the contrary", translation: "por el contrario", example: "On the contrary, it works." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c2dm-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: conceder y refutar",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - A skilled debater\n" +
          "A skilled debater knows how to concede before they refute. 'Admittedly, the plan is expensive,' " +
          "she began. 'Granted, that is a valid concern. That said, the long-term savings are huge.' She " +
          "acknowledged the counterargument, then refuted it with data. Nonetheless, her opponent found a " +
          "flaw. On the contrary, she replied, the flaw strengthens my case.\n\n" +
          "TEXT 2 - A debate class\n" +
          "A: How do I sound more persuasive? B: First concede a point. Say 'Granted, you're right about " +
          "cost.' A: And then? B: Rebut it: 'That said, quality matters more.' A: What if they have data? " +
          "B: Refute it with better data. A: Admittedly, that's hard. B: Nonetheless, it works.",
        glossary: [
          { term: "admittedly / granted", translation: "hay que admitir / concedido" },
          { term: "that said / nonetheless", translation: "dicho eso / no obstante" },
          { term: "on the contrary", translation: "por el contrario" },
          { term: "to concede / to refute", translation: "conceder / refutar" },
          { term: "to rebut / counterargument", translation: "rebatir / contraargumento" },
          { term: "flaw / valid", translation: "fallo / valido" },
          { term: "persuasive", translation: "persuasivo" },
          { term: "long-term savings", translation: "ahorros a largo plazo" },
        ],
        keyPhrases: [
          "Estrategia: primero concede (Granted, Admittedly), luego refuta (That said, Nonetheless).",
          "Fijate en los conectores de concesion y contraste.",
        ],
        check: [
          { prompt: "T1: What does a skilled debater do first?", choices: ["Concede a point", "Attack", "Leave"], answer: 0 },
          { prompt: "T1: What did she use to refute?", choices: ["Data", "Jokes", "Silence"], answer: 0 },
          { prompt: "T1: What did she say the flaw does?", choices: ["Strengthens her case", "Ends the debate", "Nothing"], answer: 0 },
          { prompt: "T2: What should you do first to persuade?", choices: ["Concede a point", "Shout", "Repeat"], answer: 0 },
          { prompt: "T2: How do you rebut a point?", choices: ["That said, quality matters more", "By agreeing", "By leaving"], answer: 0 },
          { prompt: "T2: What do you use against their data?", choices: ["Better data", "Anger", "Nothing"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c2dm-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: debate avanzado",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "admittedly / granted", translation: "hay que admitir / concedido" },
        { term: "that said / nonetheless", translation: "dicho eso / no obstante" },
        { term: "to concede / to refute", translation: "conceder / refutar" },
        { term: "to rebut / counterargument", translation: "rebatir / contraargumento" },
        { term: "flaw / valid", translation: "fallo / valido" },
        { term: "persuasive / on the contrary", translation: "persuasivo / por el contrario" },
      ],
      activities: [
        {
          id: "c2dm-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "admittedly", right: "hay que admitir" },
            { left: "granted", right: "concedido" },
            { left: "nonetheless", right: "no obstante" },
            { left: "flaw", right: "fallo" },
          ] },
        },
        {
          id: "c2dm-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to refute", right: "refutar" },
            { left: "to concede", right: "conceder" },
            { left: "counterargument", right: "contraargumento" },
            { left: "persuasive", right: "persuasivo" },
          ] },
        },
        {
          id: "c2dm-vocab-a3", type: "cloze",
          prompt: "Completa: 'She ___ the claim.' (refutar -> pasado)",
          payload: { answer: "refuted" },
          explain: "'To refute' = refutar; pasado: refuted.",
        },
        {
          id: "c2dm-vocab-a4", type: "cloze",
          prompt: "Completa: 'The plan has a ___.' (fallo)",
          payload: { answer: "flaw" },
          explain: "'Flaw' = fallo / defecto.",
        },
        {
          id: "c2dm-vocab-a5", type: "cloze",
          prompt: "Completa: '___, it's expensive.' (hay que admitir que)",
          payload: { answer: "Admittedly" },
          explain: "'Admittedly' = hay que admitir que.",
        },
        {
          id: "c2dm-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'por el contrario'?",
          payload: { choices: ["on the contrary", "that said", "granted"], answer: 0 },
          explain: "'On the contrary' = por el contrario.",
        },
        {
          id: "c2dm-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'rebatir'?",
          payload: { choices: ["to concede", "to rebut", "to admit"], answer: 1 },
          explain: "'To rebut' = rebatir.",
        },
        {
          id: "c2dm-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["point", "I", "that", "concede"], answer: ["I", "concede", "that", "point"] },
          explain: "'I concede that point' = concedo ese punto.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c2dm-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: concesion + refutacion",
      intro: "Competencia de GRAMATICA. Aprende a conceder y luego refutar con conectores.",
      grammar: {
        title: "Concession + rebuttal connectors",
        form: "concesion: Admittedly / Granted / It is true that... · giro/refutacion: That said / Nonetheless / However",
        examples: ["Granted, it's costly. That said, it saves time.", "Admittedly, I was late. Nonetheless, I finished."],
        mistakes: [
          { wrong: "Granted but it's costly.", right: "Granted, it's costly, but it saves time." },
          { wrong: "Nonetheless of that, I object.", right: "Nonetheless, I object." },
        ],
      },
      activities: [
        {
          id: "c2dm-gram-a1", type: "cloze",
          prompt: "Completa (concesion): '___, you have a valid point.' (concedido)",
          payload: { answer: "Granted" },
          explain: "'Granted' concede un punto.",
        },
        {
          id: "c2dm-gram-a2", type: "cloze",
          prompt: "Completa (refutacion): 'That ___, I still disagree.' (dicho)",
          payload: { answer: "said" },
          explain: "'That said' introduce la refutacion.",
        },
        {
          id: "c2dm-gram-a3", type: "multiple_choice",
          prompt: "Which connector introduces a concession?",
          payload: { choices: ["Admittedly", "Therefore", "Firstly"], answer: 0 },
          explain: "'Admittedly' concede un punto.",
        },
        {
          id: "c2dm-gram-a4", type: "multiple_choice",
          prompt: "Which connector introduces a rebuttal (turn)?",
          payload: { choices: ["Nonetheless", "Admittedly", "Granted"], answer: 0 },
          explain: "'Nonetheless' = no obstante (giro/refutacion).",
        },
        {
          id: "c2dm-gram-a5", type: "cloze",
          prompt: "Completa: 'On the ___, the flaw helps my case.' (por el contrario)",
          payload: { answer: "contrary" },
          explain: "'On the contrary' contradice lo anterior.",
        },
        {
          id: "c2dm-gram-a6", type: "word_bank",
          prompt: "Ordena la concesion:",
          payload: { words: ["you're", "Granted,", "right"], answer: ["Granted,", "you're", "right"] },
          explain: "Granted, + you're + right.",
        },
        {
          id: "c2dm-gram-a7", type: "word_bank",
          prompt: "Ordena la refutacion:",
          payload: { words: ["said,", "That", "disagree", "I"], answer: ["That", "said,", "I", "disagree"] },
          explain: "That + said, + I + disagree.",
        },
        {
          id: "c2dm-gram-a8", type: "multiple_choice",
          prompt: "The best debate strategy is to...",
          payload: { choices: ["concede, then rebut", "only attack", "stay silent"], answer: 0 },
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c2dm-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: una refutacion razonada",
      intro: "Competencia de ESCRITURA. Construye una concesion + refutacion.",
      activities: [
        {
          id: "c2dm-write-a1", type: "word_bank",
          prompt: "1. Concede un punto:",
          payload: { words: ["you're", "Granted,", "right"], answer: ["Granted,", "you're", "right"] },
        },
        {
          id: "c2dm-write-a2", type: "word_bank",
          prompt: "2. Da el giro (refuta):",
          payload: { words: ["said,", "That", "disagree", "I"], answer: ["That", "said,", "I", "disagree"] },
        },
        {
          id: "c2dm-write-a3", type: "word_bank",
          prompt: "3. Di que concedes ese punto:",
          payload: { words: ["point", "I", "that", "concede"], answer: ["I", "concede", "that", "point"] },
        },
        {
          id: "c2dm-write-a4", type: "word_bank",
          prompt: "4. Di que el plan tiene un fallo:",
          payload: { words: ["flaw", "The", "a", "plan", "has"], answer: ["The", "plan", "has", "a", "flaw"] },
        },
        {
          id: "c2dm-write-a5", type: "word_bank",
          prompt: "5. Usa 'nonetheless' para objetar:",
          payload: { words: ["object", "Nonetheless,", "I"], answer: ["Nonetheless,", "I", "object"] },
        },
        {
          id: "c2dm-write-a6", type: "multiple_choice",
          prompt: "6. The best debate strategy is to...",
          payload: { choices: ["concede, then rebut", "only attack", "stay silent"], answer: 0 },
        },
        {
          id: "c2dm-write-a7", type: "multiple_choice",
          prompt: "7. Which introduces a concession?",
          payload: { choices: ["Admittedly", "Therefore", "Firstly"], answer: 0 },
        },
        {
          id: "c2dm-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'refutar'?",
          payload: { choices: ["to concede", "to refute", "to admit"], answer: 1 },
        },
      ],
    },
  ],
};
