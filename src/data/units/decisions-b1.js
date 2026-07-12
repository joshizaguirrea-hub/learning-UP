/**
 * data/units/decisions-b1.js — Unidad tematica "Making decisions" (B1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: first vs second conditional.
 */

export const DECISIONS_B1 = {
  id: "decisions-b1",
  language: "en",
  level: "B1",
  title: "Making decisions",
  subtitle: "Tomar decisiones y hablar de consecuencias reales e imaginarias",

  cando: [
    "Puedo hablar de decisiones y sus consecuencias.",
    "Puedo usar el primer condicional (real) y el segundo (imaginario).",
    "Puedo distinguir situaciones probables de las hipoteticas.",
    "Puedo escribir sobre una decision importante.",
  ],

  vocab: [
    { id: "dec-1", term: "to decide", translation: "decidir", example: "I need to decide soon." },
    { id: "dec-2", term: "choice", translation: "eleccion / opcion", example: "It's a difficult choice." },
    { id: "dec-3", term: "to choose", translation: "elegir", example: "Choose the best option." },
    { id: "dec-4", term: "option", translation: "opcion", example: "There are two options." },
    { id: "dec-5", term: "consequence", translation: "consecuencia", example: "Every choice has a consequence." },
    { id: "dec-6", term: "advice", translation: "consejo", example: "Can you give me advice?" },
    { id: "dec-7", term: "to regret", translation: "arrepentirse", example: "I don't regret my choice." },
    { id: "dec-8", term: "risk", translation: "riesgo", example: "It's a big risk." },
    { id: "dec-9", term: "opportunity", translation: "oportunidad", example: "It's a great opportunity." },
    { id: "dec-10", term: "to consider", translation: "considerar", example: "Consider all the options." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "dec-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: una gran decision",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Nina has a difficult choice. She has a job offer abroad. 'If I accept the job, I will earn " +
          "more money,' she thinks. 'But if I moved to another country, I would miss my family.' It's a " +
          "great opportunity, but also a risk. Her friend gives her advice: 'If I were you, I would " +
          "consider all the options.' Nina knows that if she doesn't try, she will regret it. Every " +
          "decision has a consequence.",
        keyPhrases: [
          "Distingue primer condicional (real: If I accept, I will) del segundo (imaginario: If I moved, I would).",
          "Busca la oferta, el riesgo y el consejo del amigo.",
        ],
        check: [
          { prompt: "What is Nina's choice about?", choices: ["A job offer abroad", "A new house", "A holiday"], answer: 0 },
          { prompt: "What will happen if she accepts?", choices: ["She will earn more", "She will earn less", "Nothing"], answer: 0 },
          { prompt: "What is her friend's advice?", choices: ["Refuse it", "Consider all options", "Ask for money"], answer: 1 },
          { prompt: "What will she do if she doesn't try?", choices: ["Be happy", "Regret it", "Forget it"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "dec-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: decisiones",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "to decide / to choose", translation: "decidir / elegir" },
        { term: "choice / option", translation: "eleccion / opcion" },
        { term: "consequence", translation: "consecuencia" },
        { term: "advice", translation: "consejo" },
        { term: "risk / opportunity", translation: "riesgo / oportunidad" },
        { term: "to regret / to consider", translation: "arrepentirse / considerar" },
      ],
      activities: [
        {
          id: "dec-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "choice", right: "eleccion" },
            { left: "risk", right: "riesgo" },
            { left: "advice", right: "consejo" },
          ] },
        },
        {
          id: "dec-vocab-a2", type: "cloze",
          prompt: "Completa: 'It's a great ___.' (oportunidad)",
          payload: { answer: "opportunity" },
          explain: "'Opportunity' = oportunidad.",
        },
        {
          id: "dec-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'arrepentirse'?",
          payload: { choices: ["to consider", "to regret", "to choose"], answer: 1 },
          explain: "'To regret' = arrepentirse.",
        },
        {
          id: "dec-vocab-a4", type: "cloze",
          prompt: "Completa: 'Every choice has a ___.' (consecuencia)",
          payload: { answer: "consequence" },
          explain: "'Consequence' = consecuencia.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "dec-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: primer vs segundo condicional",
      intro: "Competencia de GRAMATICA. Aprende cuando usar el primer y el segundo condicional.",
      grammar: {
        title: "First vs second conditional",
        form: "1st (real): If + present, will + base · 2nd (imaginario): If + past, would + base",
        examples: ["If I accept, I will earn more. (real/probable)", "If I moved, I would miss my family. (imaginario)"],
        mistakes: [
          { wrong: "If I will accept, I earn more.", right: "If I accept, I will earn more." },
          { wrong: "If I moved, I will miss them.", right: "If I moved, I would miss them." },
        ],
      },
      activities: [
        {
          id: "dec-gram-a1", type: "cloze",
          prompt: "Completa (real): 'If I accept, I ___ earn more.' (will/would)",
          payload: { answer: "will" },
          explain: "Primer condicional (real): 'will'.",
        },
        {
          id: "dec-gram-a2", type: "cloze",
          prompt: "Completa (imaginario): 'If I moved, I ___ miss my family.' (will/would)",
          payload: { answer: "would" },
          explain: "Segundo condicional (imaginario): 'would'.",
        },
        {
          id: "dec-gram-a3", type: "multiple_choice",
          prompt: "Which is a real/probable situation (first conditional)?",
          payload: { choices: ["If I studied, I would pass.", "If I study, I will pass.", "If I was rich, I would travel."], answer: 1 },
          explain: "Primer condicional = situacion real/probable.",
        },
        {
          id: "dec-gram-a4", type: "word_bank",
          prompt: "Ordena el consejo hipotetico:",
          payload: { words: ["you,", "If", "I", "consider", "were", "I'd"], answer: ["If", "I", "were", "you,", "I'd", "consider"] },
          explain: "Orden: If + I + were + you, + I'd + consider.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "dec-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: una decision importante",
      intro: "Competencia de ESCRITURA. Construye frases sobre decisiones. Ordena cada frase.",
      activities: [
        {
          id: "dec-write-a1", type: "word_bank",
          prompt: "Di que si aceptas ganaras mas (real):",
          payload: { words: ["accept,", "If", "earn", "I", "I'll", "more"], answer: ["If", "I", "accept,", "I'll", "earn", "more"] },
        },
        {
          id: "dec-write-a2", type: "word_bank",
          prompt: "Da un consejo hipotetico:",
          payload: { words: ["you,", "If", "I", "consider", "were", "I'd"], answer: ["If", "I", "were", "you,", "I'd", "consider"] },
        },
        {
          id: "dec-write-a3", type: "word_bank",
          prompt: "Di que necesitas decidir pronto:",
          payload: { words: ["decide", "I", "to", "need", "soon"], answer: ["I", "need", "to", "decide", "soon"] },
        },
        {
          id: "dec-write-a4", type: "multiple_choice",
          prompt: "Which is a second (imaginary) conditional?",
          payload: { choices: ["If it rains, I will stay.", "If I were rich, I would help.", "I am going to decide."], answer: 1 },
        },
      ],
    },
  ],
};
