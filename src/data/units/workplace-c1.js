/**
 * data/units/workplace-c1.js — Unidad tematica "The workplace (advanced)" (C1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: discourse markers avanzados.
 */

export const WORKPLACE_C1 = {
  id: "workplace-c1",
  language: "en",
  level: "C1",
  title: "The workplace (advanced)",
  subtitle: "Comunicacion profesional con conectores del discurso avanzados",

  cando: [
    "Puedo comunicarme en contextos profesionales exigentes.",
    "Puedo usar discourse markers avanzados (nevertheless, whereas...).",
    "Puedo estructurar ideas con matiz y cohesion.",
    "Puedo escribir correos y informes profesionales.",
  ],

  vocab: [
    { id: "c1wp-1", term: "leadership", translation: "liderazgo", example: "Good leadership matters." },
    { id: "c1wp-2", term: "to delegate", translation: "delegar", example: "Learn to delegate tasks." },
    { id: "c1wp-3", term: "deadline", translation: "fecha limite", example: "We met the deadline." },
    { id: "c1wp-4", term: "stakeholder", translation: "parte interesada", example: "Inform the stakeholders." },
    { id: "c1wp-5", term: "efficient", translation: "eficiente", example: "The process is efficient." },
    { id: "c1wp-6", term: "to implement", translation: "implementar", example: "We implemented the plan." },
    { id: "c1wp-7", term: "outcome", translation: "resultado", example: "The outcome was positive." },
    { id: "c1wp-8", term: "collaboration", translation: "colaboracion", example: "Collaboration drives success." },
    { id: "c1wp-9", term: "to prioritise", translation: "priorizar", example: "Prioritise urgent tasks." },
    { id: "c1wp-10", term: "feedback", translation: "retroalimentacion", example: "Give constructive feedback." },
    { id: "c1wp-11", term: "strategy", translation: "estrategia", example: "We need a clear strategy." },
    { id: "c1wp-12", term: "productivity", translation: "productividad", example: "Productivity increased." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1wp-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: liderazgo moderno",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Modern leadership\n" +
          "Modern leadership requires collaboration. Whereas old managers controlled everything, today's " +
          "leaders delegate. Nevertheless, they must prioritise and meet deadlines. Consequently, teams " +
          "work more efficiently. Moreover, constructive feedback improves outcomes. That said, no plan " +
          "works without clear communication. In other words, leaders who listen implement better " +
          "solutions.\n\n" +
          "TEXT 2 - A team meeting\n" +
          "A: Productivity is low. B: True. Nevertheless, the team is motivated. A: Whereas last year we " +
          "missed deadlines, now we meet them. B: Consequently, our outcomes improved. A: Moreover, " +
          "clients are happy. B: We should keep this strategy. In other words, collaboration works.",
        glossary: [
          { term: "Whereas", translation: "mientras que (contraste)" },
          { term: "Nevertheless", translation: "sin embargo" },
          { term: "Consequently", translation: "por consiguiente" },
          { term: "Moreover / That said", translation: "ademas / dicho eso" },
          { term: "In other words", translation: "en otras palabras" },
          { term: "leadership / to delegate", translation: "liderazgo / delegar" },
          { term: "to prioritise / outcome", translation: "priorizar / resultado" },
          { term: "strategy / productivity", translation: "estrategia / productividad" },
        ],
        keyPhrases: [
          "Fijate en los discourse markers: Whereas, Nevertheless, Consequently, Moreover, That said, In other words.",
          "Conectan ideas con contraste, causa, adicion y aclaracion.",
        ],
        check: [
          { prompt: "T1: What does modern leadership require?", choices: ["Collaboration", "Control", "Silence"], answer: 0 },
          { prompt: "T1: What did old managers do?", choices: ["Controlled everything", "Delegated", "Listened"], answer: 0 },
          { prompt: "T1: What do leaders who listen do?", choices: ["Implement better solutions", "Fail", "Nothing"], answer: 0 },
          { prompt: "T2: How is the team, despite low productivity?", choices: ["Motivated", "Angry", "Absent"], answer: 0 },
          { prompt: "T2: What improved as a consequence?", choices: ["Their outcomes", "Nothing", "The weather"], answer: 0 },
          { prompt: "T2: What should they keep?", choices: ["This strategy", "The old ways", "Missing deadlines"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c1wp-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: trabajo avanzado",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "leadership / collaboration", translation: "liderazgo / colaboracion" },
        { term: "to delegate / to prioritise", translation: "delegar / priorizar" },
        { term: "stakeholder / outcome", translation: "parte interesada / resultado" },
        { term: "efficient / productivity", translation: "eficiente / productividad" },
        { term: "to implement / strategy", translation: "implementar / estrategia" },
        { term: "feedback / deadline", translation: "retroalimentacion / fecha limite" },
      ],
      activities: [
        {
          id: "c1wp-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "leadership", right: "liderazgo" },
            { left: "outcome", right: "resultado" },
            { left: "feedback", right: "retroalimentacion" },
            { left: "strategy", right: "estrategia" },
          ] },
        },
        {
          id: "c1wp-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to delegate", right: "delegar" },
            { left: "to prioritise", right: "priorizar" },
            { left: "efficient", right: "eficiente" },
            { left: "productivity", right: "productividad" },
          ] },
        },
        {
          id: "c1wp-vocab-a3", type: "cloze",
          prompt: "Completa: 'Learn to ___ tasks.' (delegar)",
          payload: { answer: "delegate" },
          explain: "'To delegate' = delegar.",
        },
        {
          id: "c1wp-vocab-a4", type: "cloze",
          prompt: "Completa: 'We ___ the plan.' (implementar -> pasado)",
          payload: { answer: "implemented" },
          explain: "'To implement' = implementar; pasado: implemented.",
        },
        {
          id: "c1wp-vocab-a5", type: "cloze",
          prompt: "Completa: 'We need a clear ___.' (estrategia)",
          payload: { answer: "strategy" },
          explain: "'Strategy' = estrategia.",
        },
        {
          id: "c1wp-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'priorizar'?",
          payload: { choices: ["to implement", "to prioritise", "to delegate"], answer: 1 },
          explain: "'To prioritise' = priorizar.",
        },
        {
          id: "c1wp-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'parte interesada'?",
          payload: { choices: ["stakeholder", "outcome", "feedback"], answer: 0 },
          explain: "'Stakeholder' = parte interesada.",
        },
        {
          id: "c1wp-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["success", "Collaboration", "drives"], answer: ["Collaboration", "drives", "success"] },
          explain: "'Collaboration drives success' = la colaboracion impulsa el exito.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c1wp-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: discourse markers",
      intro: "Competencia de GRAMATICA. Aprende conectores del discurso avanzados.",
      grammar: {
        title: "Advanced discourse markers",
        form: "contrast: whereas / nevertheless · cause: consequently · addition: moreover · clarification: in other words",
        desc: "Conectores formales para enlazar ideas en textos y correos de trabajo.",
        rule: "Contraste: 'whereas', 'nevertheless'. Causa/consecuencia: 'consequently'. Adicion: 'moreover'. Aclaracion: 'in other words'. Suelen ir al inicio de la oracion y con coma cuando encabezan la idea.",
        examples: ["Whereas he agrees, she doesn't.", "It rained; nevertheless, we went.", "Consequently, sales rose."],
        explain: { tr: ["Mientras que \u00e9l est\u00e1 de acuerdo, ella no.", "Llovi\u00f3; sin embargo, fuimos.", "En consecuencia, las ventas subieron."] },
        mistakes: [
          { wrong: "Whereas he agrees but she doesn't.", right: "Whereas he agrees, she doesn't." },
          { wrong: "Nevertheless of the rain, we went.", right: "Nevertheless, we went despite the rain." },
        ],
      },
      activities: [
        {
          id: "c1wp-gram-a1", type: "cloze",
          prompt: "Completa (contraste): '___ old managers controlled, new ones delegate.' (mientras que)",
          payload: { answer: "Whereas" },
          explain: "'Whereas' introduce un contraste entre dos ideas.",
        },
        {
          id: "c1wp-gram-a2", type: "cloze",
          prompt: "Completa (consecuencia): 'Sales rose; ___, profits grew.' (por consiguiente)",
          payload: { answer: "consequently" },
          explain: "'Consequently' = por consiguiente.",
        },
        {
          id: "c1wp-gram-a3", type: "multiple_choice",
          prompt: "Which marker adds information?",
          payload: { choices: ["nevertheless", "moreover", "whereas"], answer: 1 },
          explain: "'Moreover' = ademas (adicion).",
        },
        {
          id: "c1wp-gram-a4", type: "multiple_choice",
          prompt: "Which marker shows contrast between two ideas?",
          payload: { choices: ["moreover", "whereas", "consequently"], answer: 1 },
          explain: "'Whereas' = contraste entre dos ideas.",
        },
        {
          id: "c1wp-gram-a5", type: "cloze",
          prompt: "Completa (aclaracion): '___ other words, collaboration works.' (en)",
          payload: { answer: "In" },
          explain: "'In other words' = en otras palabras.",
        },
        {
          id: "c1wp-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["we", "Nevertheless,", "continued"], answer: ["Nevertheless,", "we", "continued"] },
          explain: "Nevertheless, + we + continued.",
        },
        {
          id: "c1wp-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["sales", "Consequently,", "rose"], answer: ["Consequently,", "sales", "rose"] },
          explain: "Consequently, + sales + rose.",
        },
        {
          id: "c1wp-gram-a8", type: "multiple_choice",
          prompt: "Which marker introduces a clarification?",
          payload: { choices: ["in other words", "whereas", "moreover"], answer: 0 },
          explain: "'In other words' aclara/reformula una idea.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c1wp-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: un informe profesional",
      intro: "Competencia de ESCRITURA. Construye frases con discourse markers.",
      activities: [
        {
          id: "c1wp-write-a1", type: "word_bank",
          prompt: "1. Usa 'nevertheless' para un contraste:",
          payload: { words: ["we", "Nevertheless,", "succeeded"], answer: ["Nevertheless,", "we", "succeeded"] },
        },
        {
          id: "c1wp-write-a2", type: "word_bank",
          prompt: "2. Di que la colaboracion impulsa el exito:",
          payload: { words: ["success", "Collaboration", "drives"], answer: ["Collaboration", "drives", "success"] },
        },
        {
          id: "c1wp-write-a3", type: "word_bank",
          prompt: "3. Aconseja dar retroalimentacion constructiva:",
          payload: { words: ["feedback", "Give", "constructive"], answer: ["Give", "constructive", "feedback"] },
        },
        {
          id: "c1wp-write-a4", type: "word_bank",
          prompt: "4. Usa 'consequently':",
          payload: { words: ["improved", "Consequently,", "outcomes", "our"], answer: ["Consequently,", "our", "outcomes", "improved"] },
        },
        {
          id: "c1wp-write-a5", type: "word_bank",
          prompt: "5. Di que necesitan una estrategia clara:",
          payload: { words: ["strategy", "We", "a", "need", "clear"], answer: ["We", "need", "a", "clear", "strategy"] },
        },
        {
          id: "c1wp-write-a6", type: "multiple_choice",
          prompt: "6. Which marker shows contrast between two ideas?",
          payload: { choices: ["moreover", "whereas", "consequently"], answer: 1 },
        },
        {
          id: "c1wp-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["Whereas he agrees but she doesn't.", "Whereas he agrees, she doesn't.", "Whereas but he agrees."], answer: 1 },
        },
        {
          id: "c1wp-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'delegar'?",
          payload: { choices: ["to prioritise", "to delegate", "to implement"], answer: 1 },
        },
      ],
    },
  ],
};
