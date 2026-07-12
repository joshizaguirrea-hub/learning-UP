/**
 * data/units/workplace-c1.js — Unidad tematica "The workplace (advanced)" (C1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: discourse markers avanzados.
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
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1wp-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: liderazgo moderno",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Modern leadership requires collaboration. Whereas old managers controlled everything, today's " +
          "leaders delegate. Nevertheless, they must prioritise and meet deadlines. Consequently, teams " +
          "work more efficiently. Moreover, constructive feedback improves outcomes. That said, no plan " +
          "works without clear communication. In other words, leaders who listen implement better " +
          "solutions and keep their stakeholders informed.",
        keyPhrases: [
          "Fijate en los discourse markers: Whereas, Nevertheless, Consequently, Moreover, That said, In other words.",
          "Conectan ideas con contraste, causa, adicion y aclaracion.",
        ],
        check: [
          { prompt: "What does modern leadership require?", choices: ["Collaboration", "Control", "Silence"], answer: 0 },
          { prompt: "What did old managers do?", choices: ["Controlled everything", "Delegated", "Listened"], answer: 0 },
          { prompt: "What improves outcomes?", choices: ["Constructive feedback", "Ignoring staff", "Delays"], answer: 0 },
          { prompt: "What do leaders who listen do?", choices: ["Implement better solutions", "Fail", "Nothing"], answer: 0 },
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
        { term: "efficient", translation: "eficiente" },
        { term: "to implement", translation: "implementar" },
        { term: "feedback / deadline", translation: "retroalimentacion / fecha limite" },
      ],
      activities: [
        {
          id: "c1wp-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "leadership", right: "liderazgo" },
            { left: "outcome", right: "resultado" },
            { left: "feedback", right: "retroalimentacion" },
          ] },
        },
        {
          id: "c1wp-vocab-a2", type: "cloze",
          prompt: "Completa: 'Learn to ___ tasks.' (delegar)",
          payload: { answer: "delegate" },
          explain: "'To delegate' = delegar.",
        },
        {
          id: "c1wp-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'priorizar'?",
          payload: { choices: ["to implement", "to prioritise", "to delegate"], answer: 1 },
          explain: "'To prioritise' = priorizar.",
        },
        {
          id: "c1wp-vocab-a4", type: "cloze",
          prompt: "Completa: 'We ___ the plan.' (implementar -> pasado)",
          payload: { answer: "implemented" },
          explain: "'To implement' = implementar; pasado: implemented.",
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
        form: "contraste: whereas / nevertheless · causa: consequently · adicion: moreover · aclaracion: in other words",
        examples: ["Whereas he agrees, she doesn't.", "It rained; nevertheless, we went.", "Consequently, sales rose."],
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
          id: "c1wp-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["we", "Nevertheless,", "continued"], answer: ["Nevertheless,", "we", "continued"] },
          explain: "Orden: Nevertheless, + we + continued.",
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
      intro: "Competencia de ESCRITURA. Construye frases con discourse markers. Ordena cada frase.",
      activities: [
        {
          id: "c1wp-write-a1", type: "word_bank",
          prompt: "Usa 'nevertheless' para un contraste:",
          payload: { words: ["we", "Nevertheless,", "succeeded"], answer: ["Nevertheless,", "we", "succeeded"] },
        },
        {
          id: "c1wp-write-a2", type: "word_bank",
          prompt: "Di que la colaboracion impulsa el exito:",
          payload: { words: ["success", "Collaboration", "drives"], answer: ["Collaboration", "drives", "success"] },
        },
        {
          id: "c1wp-write-a3", type: "word_bank",
          prompt: "Aconseja dar retroalimentacion constructiva:",
          payload: { words: ["feedback", "Give", "constructive"], answer: ["Give", "constructive", "feedback"] },
        },
        {
          id: "c1wp-write-a4", type: "multiple_choice",
          prompt: "Which marker shows contrast between two ideas?",
          payload: { choices: ["moreover", "whereas", "consequently"], answer: 1 },
        },
      ],
    },
  ],
};
