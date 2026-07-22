/**
 * data/units/decisions-b1.js — Unidad tematica "Making decisions" (B1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: first vs second conditional.
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
    { id: "dec-11", term: "to hesitate", translation: "dudar / titubear", example: "Don't hesitate to ask." },
    { id: "dec-12", term: "wise", translation: "sabio / sensato", example: "That was a wise decision." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "dec-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: una gran decision",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Nina's choice\n" +
          "Nina has a difficult choice. She has a job offer abroad. 'If I accept the job, I will earn more " +
          "money,' she thinks. 'But if I moved to another country, I would miss my family.' It's a great " +
          "opportunity, but also a risk. Her friend gives her advice: 'If I were you, I would consider all " +
          "the options.' Nina knows that if she doesn't try, she will regret it.\n\n" +
          "TEXT 2 - Two options\n" +
          "A: I don't know what to choose. B: Don't hesitate. If you think too much, you'll never decide. " +
          "A: But if I chose the wrong option, I would feel terrible. B: Every decision has a consequence. " +
          "Just make a wise choice and don't regret it. A: You're right. If I stay calm, I'll decide better.",
        glossary: [
          { term: "If I accept, I will...", translation: "Si acepto, yo... (real)" },
          { term: "If I moved, I would...", translation: "Si me mudara, yo... (imaginario)" },
          { term: "choice / option", translation: "eleccion / opcion" },
          { term: "consequence / risk", translation: "consecuencia / riesgo" },
          { term: "advice / opportunity", translation: "consejo / oportunidad" },
          { term: "to regret / to hesitate", translation: "arrepentirse / dudar" },
          { term: "wise", translation: "sensato" },
          { term: "to consider", translation: "considerar" },
        ],
        keyPhrases: [
          "Distingue primer condicional (real: If I accept, I will) del segundo (imaginario: If I moved, I would).",
          "Busca la oferta, el riesgo y el consejo del amigo.",
        ],
        check: [
          { prompt: "T1: What is Nina's choice about?", choices: ["A job offer abroad", "A new house", "A holiday"], answer: 0 },
          { prompt: "T1: What will happen if she accepts?", choices: ["She will earn more", "She will earn less", "Nothing"], answer: 0 },
          { prompt: "T1: What is her friend's advice?", choices: ["Refuse it", "Consider all options", "Ask for money"], answer: 1 },
          { prompt: "T2: What does B say about hesitating?", choices: ["Think a lot", "You'll never decide", "Give up"], answer: 1 },
          { prompt: "T2: What does every decision have?", choices: ["A consequence", "A prize", "A discount"], answer: 0 },
          { prompt: "T2: What will help A decide better?", choices: ["Staying calm", "Worrying", "Waiting years"], answer: 0 },
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
        { term: "consequence / risk", translation: "consecuencia / riesgo" },
        { term: "advice / opportunity", translation: "consejo / oportunidad" },
        { term: "to regret / to hesitate", translation: "arrepentirse / dudar" },
        { term: "to consider / wise", translation: "considerar / sensato" },
      ],
      activities: [
        {
          id: "dec-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "choice", right: "eleccion" },
            { left: "risk", right: "riesgo" },
            { left: "advice", right: "consejo" },
            { left: "option", right: "opcion" },
          ] },
        },
        {
          id: "dec-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to regret", right: "arrepentirse" },
            { left: "to consider", right: "considerar" },
            { left: "to hesitate", right: "dudar" },
            { left: "wise", right: "sensato" },
          ] },
        },
        {
          id: "dec-vocab-a3", type: "cloze",
          prompt: "Completa: 'It's a great ___.' (oportunidad)",
          payload: { answer: "opportunity" },
          explain: "'Opportunity' = oportunidad.",
        },
        {
          id: "dec-vocab-a4", type: "cloze",
          prompt: "Completa: 'Every choice has a ___.' (consecuencia)",
          payload: { answer: "consequence" },
          explain: "'Consequence' = consecuencia.",
        },
        {
          id: "dec-vocab-a5", type: "cloze",
          prompt: "Completa: 'That was a ___ decision.' (sensata)",
          payload: { answer: "wise" },
          explain: "'Wise' = sabio / sensato.",
        },
        {
          id: "dec-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'arrepentirse'?",
          payload: { choices: ["to consider", "to regret", "to choose"], answer: 1 },
          explain: "'To regret' = arrepentirse.",
        },
        {
          id: "dec-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'dudar/titubear'?",
          payload: { choices: ["to hesitate", "to decide", "to risk"], answer: 0 },
          explain: "'To hesitate' = dudar / titubear.",
        },
        {
          id: "dec-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["options", "Consider", "the", "all"], answer: ["Consider", "all", "the", "options"] },
          explain: "'Consider all the options' = considera todas las opciones.",
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
        form: "1st (real): If + present, will + base · 2nd (imaginary): If + past, would + base",
        desc: "Sirve para hablar de situaciones con condici\u00f3n: unas reales y otras imaginarias.",
        rule: "Primer condicional (real/probable): 'If + presente, will + base' (If I study, I will pass). Segundo condicional (imaginario): 'If + pasado simple, would + base' (If I studied, I would pass).",
        examples: ["If I accept, I will earn more. (probable)", "If I moved, I would miss my family. (imaginario)"],
        explain: { tr: ["Si acepto, ganar\u00e9 m\u00e1s. (probable)", "Si me mudara, extra\u00f1ar\u00eda a mi familia. (imaginario)"] },
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
          id: "dec-gram-a3", type: "cloze",
          prompt: "Completa: 'If she ___ the wrong option, she would feel bad.' (choose -> pasado)",
          payload: { answer: "chose" },
          explain: "Segundo condicional: el 'if' lleva pasado (chose).",
        },
        {
          id: "dec-gram-a4", type: "multiple_choice",
          prompt: "Which is a real/probable situation (first conditional)?",
          payload: { choices: ["If I studied, I would pass.", "If I study, I will pass.", "If I was rich, I would travel."], answer: 1 },
          explain: "Primer condicional = situacion real/probable.",
        },
        {
          id: "dec-gram-a5", type: "multiple_choice",
          prompt: "Which is a second (imaginary) conditional?",
          payload: { choices: ["If it rains, I will stay.", "If I were rich, I would help.", "I am going to decide."], answer: 1 },
          explain: "If + past, ... would + base = imaginario.",
        },
        {
          id: "dec-gram-a6", type: "word_bank",
          prompt: "Ordena el condicional real:",
          payload: { words: ["accept,", "If", "earn", "I", "I'll", "more"], answer: ["If", "I", "accept,", "I'll", "earn", "more"] },
          explain: "If + I + accept, + I'll + earn + more.",
        },
        {
          id: "dec-gram-a7", type: "word_bank",
          prompt: "Ordena el consejo hipotetico:",
          payload: { words: ["you,", "If", "I", "consider", "were", "I'd"], answer: ["If", "I", "were", "you,", "I'd", "consider"] },
          explain: "If + I + were + you, + I'd + consider.",
        },
        {
          id: "dec-gram-a8", type: "cloze",
          prompt: "Completa: 'If you think too much, you ___ never decide.' (futuro real)",
          payload: { answer: "will", alt: ["'ll"] },
          explain: "Primer condicional: consecuencia con 'will'.",
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
      intro: "Competencia de ESCRITURA. Construye frases sobre decisiones, frase por frase.",
      activities: [
        {
          id: "dec-write-a1", type: "word_bank",
          prompt: "1. Di que si aceptas ganaras mas (real):",
          payload: { words: ["accept,", "If", "earn", "I", "I'll", "more"], answer: ["If", "I", "accept,", "I'll", "earn", "more"] },
        },
        {
          id: "dec-write-a2", type: "word_bank",
          prompt: "2. Da un consejo hipotetico:",
          payload: { words: ["you,", "If", "I", "consider", "were", "I'd"], answer: ["If", "I", "were", "you,", "I'd", "consider"] },
        },
        {
          id: "dec-write-a3", type: "word_bank",
          prompt: "3. Di que necesitas decidir pronto:",
          payload: { words: ["decide", "I", "to", "need", "soon"], answer: ["I", "need", "to", "decide", "soon"] },
        },
        {
          id: "dec-write-a4", type: "word_bank",
          prompt: "4. Di que cada decision tiene una consecuencia:",
          payload: { words: ["a", "Every", "has", "decision", "consequence"], answer: ["Every", "decision", "has", "a", "consequence"] },
        },
        {
          id: "dec-write-a5", type: "word_bank",
          prompt: "5. Aconseja no dudar en preguntar:",
          payload: { words: ["ask", "Don't", "to", "hesitate"], answer: ["Don't", "hesitate", "to", "ask"] },
        },
        {
          id: "dec-write-a6", type: "multiple_choice",
          prompt: "6. Which is a second (imaginary) conditional?",
          payload: { choices: ["If it rains, I will stay.", "If I were rich, I would help.", "I am going to decide."], answer: 1 },
        },
        {
          id: "dec-write-a7", type: "multiple_choice",
          prompt: "7. Choose the real (first) conditional:",
          payload: { choices: ["If I study, I will pass.", "If I studied, I would pass.", "If I was studying, I pass."], answer: 0 },
        },
        {
          id: "dec-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'oportunidad'?",
          payload: { choices: ["risk", "opportunity", "advice"], answer: 1 },
        },
      ],
    },
  ],
};
