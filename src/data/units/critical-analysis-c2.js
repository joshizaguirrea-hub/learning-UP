/**
 * data/units/critical-analysis-c2.js — Unidad tematica "Critical analysis" (C2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: emphatic do/does/did.
 */

export const CRITICAL_ANALYSIS_C2 = {
  id: "critical-analysis-c2",
  language: "en",
  level: "C2",
  title: "Critical analysis",
  subtitle: "Analizar con rigor y dar enfasis con el 'do' enfatico",

  cando: [
    "Puedo analizar textos y argumentos con rigor.",
    "Puedo usar el 'do/does/did' enfatico para reforzar.",
    "Puedo evaluar fortalezas y debilidades de una idea.",
    "Puedo escribir una critica razonada.",
  ],

  vocab: [
    { id: "c2ca-1", term: "to evaluate", translation: "evaluar", example: "We must evaluate the claim." },
    { id: "c2ca-2", term: "flawed", translation: "defectuoso / con fallos", example: "The argument is flawed." },
    { id: "c2ca-3", term: "assumption", translation: "suposicion", example: "That's a weak assumption." },
    { id: "c2ca-4", term: "valid", translation: "valido", example: "It's a valid point." },
    { id: "c2ca-5", term: "to undermine", translation: "socavar / debilitar", example: "This undermines the theory." },
    { id: "c2ca-6", term: "coherent", translation: "coherente", example: "The essay is coherent." },
    { id: "c2ca-7", term: "to justify", translation: "justificar", example: "Justify your conclusion." },
    { id: "c2ca-8", term: "insight", translation: "perspicacia / idea profunda", example: "A brilliant insight." },
    { id: "c2ca-9", term: "to overlook", translation: "pasar por alto", example: "The author overlooks a key fact." },
    { id: "c2ca-10", term: "convincing", translation: "convincente", example: "The evidence is convincing." },
    { id: "c2ca-11", term: "rigorous", translation: "riguroso", example: "A rigorous analysis." },
    { id: "c2ca-12", term: "to acknowledge", translation: "reconocer", example: "She acknowledges the limits." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c2ca-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: leer con ojo critico",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - A critical review\n" +
          "The article does raise valid points, but its central argument is flawed. The author does " +
          "acknowledge some limits; however, he overlooks a key assumption. The evidence, though " +
          "convincing at first, actually undermines his own conclusion. I do admire the rigorous style, " +
          "yet the reasoning is not fully coherent. A good critic does justify every claim.\n\n" +
          "TEXT 2 - A discussion\n" +
          "A: Did you like the essay? B: I did enjoy it, but it has flaws. A: Such as? B: It does offer " +
          "insight, yet it overlooks the data. A: So the argument is weak? B: The conclusion doesn't quite " +
          "follow. A: But she does write well. B: True. Style does matter, but so does logic.",
        glossary: [
          { term: "does raise / does acknowledge", translation: "si plantea / si reconoce (enfasis)" },
          { term: "I do admire", translation: "de verdad admiro" },
          { term: "flawed / valid", translation: "defectuoso / valido" },
          { term: "assumption / insight", translation: "suposicion / perspicacia" },
          { term: "to undermine / to overlook", translation: "socavar / pasar por alto" },
          { term: "to justify / to acknowledge", translation: "justificar / reconocer" },
          { term: "coherent / convincing", translation: "coherente / convincente" },
          { term: "rigorous", translation: "riguroso" },
        ],
        keyPhrases: [
          "Fijate en el 'do' enfatico: does raise, does acknowledge, I do admire, does justify.",
          "Refuerza el verbo para dar enfasis o contraste.",
        ],
        check: [
          { prompt: "T1: What is flawed?", choices: ["The central argument", "The grammar", "The title"], answer: 0 },
          { prompt: "T1: What does the author overlook?", choices: ["A key assumption", "The date", "His name"], answer: 0 },
          { prompt: "T1: What does a good critic do?", choices: ["Justify every claim", "Ignore evidence", "Copy others"], answer: 0 },
          { prompt: "T2: Did B enjoy the essay?", choices: ["Yes, but it has flaws", "No", "Didn't read it"], answer: 0 },
          { prompt: "T2: What does the essay overlook?", choices: ["The data", "The margins", "The font"], answer: 0 },
          { prompt: "T2: What matters besides style?", choices: ["Logic", "Length", "Colour"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c2ca-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: analisis critico",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "to evaluate / to justify", translation: "evaluar / justificar" },
        { term: "flawed / valid", translation: "defectuoso / valido" },
        { term: "assumption / insight", translation: "suposicion / perspicacia" },
        { term: "to undermine / to overlook", translation: "socavar / pasar por alto" },
        { term: "coherent / convincing", translation: "coherente / convincente" },
        { term: "rigorous / to acknowledge", translation: "riguroso / reconocer" },
      ],
      activities: [
        {
          id: "c2ca-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "flawed", right: "defectuoso" },
            { left: "valid", right: "valido" },
            { left: "insight", right: "perspicacia" },
            { left: "rigorous", right: "riguroso" },
          ] },
        },
        {
          id: "c2ca-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to evaluate", right: "evaluar" },
            { left: "to undermine", right: "socavar" },
            { left: "to overlook", right: "pasar por alto" },
            { left: "convincing", right: "convincente" },
          ] },
        },
        {
          id: "c2ca-vocab-a3", type: "cloze",
          prompt: "Completa: 'The argument is ___.' (defectuoso)",
          payload: { answer: "flawed" },
          explain: "'Flawed' = defectuoso / con fallos.",
        },
        {
          id: "c2ca-vocab-a4", type: "cloze",
          prompt: "Completa: '___ your conclusion.' (justifica)",
          payload: { answer: "Justify" },
          explain: "'To justify' = justificar.",
        },
        {
          id: "c2ca-vocab-a5", type: "cloze",
          prompt: "Completa: 'The author ___ a key fact.' (pasar por alto)",
          payload: { answer: "overlooks" },
          explain: "'To overlook' = pasar por alto.",
        },
        {
          id: "c2ca-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'socavar/debilitar'?",
          payload: { choices: ["to justify", "to undermine", "to evaluate"], answer: 1 },
          explain: "'To undermine' = socavar.",
        },
        {
          id: "c2ca-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'suposicion'?",
          payload: { choices: ["assumption", "insight", "evidence"], answer: 0 },
          explain: "'Assumption' = suposicion.",
        },
        {
          id: "c2ca-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["point", "It's", "valid", "a"], answer: ["It's", "a", "valid", "point"] },
          explain: "'It's a valid point' = es un punto valido.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c2ca-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: el 'do' enfatico",
      intro: "Competencia de GRAMATICA. Aprende a reforzar con do/does/did enfatico.",
      grammar: {
        title: "Emphatic do / does / did",
        form: "do/does/did + base verb (to emphasize or contrast): I do agree. She does know. He did call.",
        desc: "Sirve para enfatizar o contrastar una afirmaci\u00f3n con fuerza.",
        rule: "Pon 'do/does/did + verbo base' delante del verbo para dar \u00e9nfasis: 'I do agree', 'She does know', 'He did call'. 'do/does' para presente y 'did' para pasado; el verbo va en base.",
        examples: ["I do like it (a pesar de todo).", "She does know the answer.", "He did call, I promise."],
        explain: { tr: ["S\u00ed que me gusta (a pesar de todo).", "Ella s\u00ed sabe la respuesta.", "\u00c9l s\u00ed llam\u00f3, lo prometo."] },
        mistakes: [
          { wrong: "I do liked it.", right: "I did like it." },
          { wrong: "She does knows it.", right: "She does know it." },
        ],
      },
      activities: [
        {
          id: "c2ca-gram-a1", type: "cloze",
          prompt: "Completa (enfasis, presente 3a p.): 'She ___ know the answer.' (does/do)",
          payload: { answer: "does" },
          explain: "Con she/he/it: 'does + verbo base'.",
        },
        {
          id: "c2ca-gram-a2", type: "cloze",
          prompt: "Completa (enfasis, pasado): 'He ___ call, I promise.' (did/does)",
          payload: { answer: "did" },
          explain: "Enfasis en pasado: 'did + verbo base'.",
        },
        {
          id: "c2ca-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct emphatic sentence:",
          payload: { choices: ["I do agree with you.", "I do agreed with you.", "I does agree with you."], answer: 0 },
          explain: "'do + verbo base' (agree).",
        },
        {
          id: "c2ca-gram-a4", type: "multiple_choice",
          prompt: "What is the emphatic 'do' used for?",
          payload: { choices: ["asking questions", "adding emphasis or contrast", "the future"], answer: 1 },
          explain: "Refuerza el verbo (enfasis/contraste).",
        },
        {
          id: "c2ca-gram-a5", type: "cloze",
          prompt: "Completa: 'The article ___ raise valid points.' (enfasis presente)",
          payload: { answer: "does" },
          explain: "'does raise' (con sujeto singular: the article).",
        },
        {
          id: "c2ca-gram-a6", type: "word_bank",
          prompt: "Ordena la frase enfatica:",
          payload: { words: ["it", "I", "like", "do"], answer: ["I", "do", "like", "it"] },
          explain: "I + do + like + it.",
        },
        {
          id: "c2ca-gram-a7", type: "word_bank",
          prompt: "Ordena la frase enfatica:",
          payload: { words: ["know", "She", "the", "answer", "does"], answer: ["She", "does", "know", "the", "answer"] },
          explain: "She + does + know + the + answer.",
        },
        {
          id: "c2ca-gram-a8", type: "multiple_choice",
          prompt: "Choose the correct one:",
          payload: { choices: ["He did called me.", "He did call me.", "He did calls me."], answer: 1 },
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c2ca-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: una critica razonada",
      intro: "Competencia de ESCRITURA. Construye frases criticas con enfasis.",
      activities: [
        {
          id: "c2ca-write-a1", type: "word_bank",
          prompt: "1. Enfatiza que si estas de acuerdo:",
          payload: { words: ["agree", "I", "do"], answer: ["I", "do", "agree"] },
        },
        {
          id: "c2ca-write-a2", type: "word_bank",
          prompt: "2. Di que el argumento es defectuoso:",
          payload: { words: ["flawed", "The", "is", "argument"], answer: ["The", "argument", "is", "flawed"] },
        },
        {
          id: "c2ca-write-a3", type: "word_bank",
          prompt: "3. Enfatiza que ella si sabe la respuesta:",
          payload: { words: ["know", "She", "the", "answer", "does"], answer: ["She", "does", "know", "the", "answer"] },
        },
        {
          id: "c2ca-write-a4", type: "word_bank",
          prompt: "4. Di que el autor pasa por alto un dato:",
          payload: { words: ["fact", "The", "a", "author", "overlooks"], answer: ["The", "author", "overlooks", "a", "fact"] },
        },
        {
          id: "c2ca-write-a5", type: "word_bank",
          prompt: "5. Di que debes justificar cada afirmacion:",
          payload: { words: ["claim", "Justify", "every"], answer: ["Justify", "every", "claim"] },
        },
        {
          id: "c2ca-write-a6", type: "multiple_choice",
          prompt: "6. What is the emphatic 'do' used for?",
          payload: { choices: ["asking questions", "adding emphasis or contrast", "the future"], answer: 1 },
        },
        {
          id: "c2ca-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["I do respect it.", "I do respected it.", "I does respect it."], answer: 0 },
        },
        {
          id: "c2ca-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'convincente'?",
          payload: { choices: ["flawed", "convincing", "valid"], answer: 1 },
        },
      ],
    },
  ],
};
