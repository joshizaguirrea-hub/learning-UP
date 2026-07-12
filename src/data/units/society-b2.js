/**
 * data/units/society-b2.js — Unidad tematica "Society & change" (B2).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: third conditional.
 */

export const SOCIETY_B2 = {
  id: "society-b2",
  language: "en",
  level: "B2",
  title: "Society & change",
  subtitle: "Hablar de sociedad, cambios y situaciones hipoteticas del pasado",

  cando: [
    "Puedo hablar de temas sociales y cambios.",
    "Puedo usar el tercer condicional (pasado hipotetico).",
    "Puedo hablar de arrepentimientos y consecuencias pasadas.",
    "Puedo escribir sobre como algo pudo ser diferente.",
  ],

  vocab: [
    { id: "b2soc-1", term: "society", translation: "sociedad", example: "Society is changing fast." },
    { id: "b2soc-2", term: "equality", translation: "igualdad", example: "They fight for equality." },
    { id: "b2soc-3", term: "poverty", translation: "pobreza", example: "Poverty is a global issue." },
    { id: "b2soc-4", term: "rights", translation: "derechos", example: "Human rights matter." },
    { id: "b2soc-5", term: "to protest", translation: "protestar", example: "People protested peacefully." },
    { id: "b2soc-6", term: "law", translation: "ley", example: "The new law was approved." },
    { id: "b2soc-7", term: "generation", translation: "generacion", example: "The younger generation cares." },
    { id: "b2soc-8", term: "to improve", translation: "mejorar", example: "Life has improved a lot." },
    { id: "b2soc-9", term: "inequality", translation: "desigualdad", example: "Inequality is a problem." },
    { id: "b2soc-10", term: "community", translation: "comunidad", example: "The community came together." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2soc-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: lo que pudo cambiar",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Society has changed a lot in fifty years. Many people fought for equality and rights. " +
          "Historians say that if activists hadn't protested, some laws would never have changed. " +
          "If women hadn't demanded the vote, democracy would have been weaker. If the community " +
          "hadn't come together, poverty would have increased. Today, a new generation continues " +
          "the fight against inequality, hoping to improve life for everyone.",
        keyPhrases: [
          "Fijate en el tercer condicional: if + had + participio, would have + participio.",
          "Habla de un PASADO que no ocurrio (hipotetico).",
        ],
        check: [
          { prompt: "What did many people fight for?", choices: ["Equality and rights", "More money", "Less work"], answer: 0 },
          { prompt: "What would have happened without protests?", choices: ["Laws would never have changed", "Nothing", "Faster change"], answer: 0 },
          { prompt: "Who continues the fight today?", choices: ["A new generation", "Historians", "Nobody"], answer: 0 },
          { prompt: "What are they fighting against?", choices: ["Inequality", "Technology", "Education"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "b2soc-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: sociedad y cambio",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "society / community", translation: "sociedad / comunidad" },
        { term: "equality / inequality", translation: "igualdad / desigualdad" },
        { term: "poverty / rights", translation: "pobreza / derechos" },
        { term: "to protest / law", translation: "protestar / ley" },
        { term: "generation", translation: "generacion" },
        { term: "to improve", translation: "mejorar" },
      ],
      activities: [
        {
          id: "b2soc-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "society", right: "sociedad" },
            { left: "rights", right: "derechos" },
            { left: "poverty", right: "pobreza" },
          ] },
        },
        {
          id: "b2soc-vocab-a2", type: "cloze",
          prompt: "Completa: 'They fight for ___.' (igualdad)",
          payload: { answer: "equality" },
          explain: "'Equality' = igualdad.",
        },
        {
          id: "b2soc-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'protestar'?",
          payload: { choices: ["to improve", "to protest", "to approve"], answer: 1 },
          explain: "'To protest' = protestar.",
        },
        {
          id: "b2soc-vocab-a4", type: "cloze",
          prompt: "Completa: 'The new ___ was approved.' (ley)",
          payload: { answer: "law" },
          explain: "'Law' = ley.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "b2soc-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: tercer condicional",
      intro: "Competencia de GRAMATICA. Aprende el tercer condicional (pasado hipotetico).",
      grammar: {
        title: "Third conditional",
        form: "If + had + participio, ... would have + participio",
        examples: ["If they hadn't protested, laws wouldn't have changed.", "If I had studied, I would have passed."],
        mistakes: [
          { wrong: "If I would have studied, I passed.", right: "If I had studied, I would have passed." },
          { wrong: "If I studied, I would have passed.", right: "If I had studied, I would have passed." },
        ],
      },
      activities: [
        {
          id: "b2soc-gram-a1", type: "cloze",
          prompt: "Completa: 'If I ___ studied, I would have passed.' (had?)",
          payload: { answer: "had" },
          explain: "El 'if' del 3er condicional lleva 'had + participio'.",
        },
        {
          id: "b2soc-gram-a2", type: "cloze",
          prompt: "Completa: 'If they had trained, they ___ have won.' (would/will)",
          payload: { answer: "would" },
          explain: "La consecuencia lleva 'would have + participio'.",
        },
        {
          id: "b2soc-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct third conditional:",
          payload: { choices: [
            "If she had left earlier, she would have caught the train.",
            "If she left earlier, she would catch the train.",
            "If she would leave earlier, she caught the train.",
          ], answer: 0 },
          explain: "3er condicional: had + participio, ... would have + participio.",
        },
        {
          id: "b2soc-gram-a4", type: "word_bank",
          prompt: "Ordena el condicional:",
          payload: { words: ["studied,", "If", "I", "passed", "had", "I'd", "have"], answer: ["If", "I", "had", "studied,", "I'd", "have", "passed"] },
          explain: "Orden: If + I + had + studied, + I'd + have + passed.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "b2soc-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: como pudo ser diferente",
      intro: "Competencia de ESCRITURA. Construye frases con el tercer condicional. Ordena cada frase.",
      activities: [
        {
          id: "b2soc-write-a1", type: "word_bank",
          prompt: "Di que si hubieras estudiado, habrias aprobado:",
          payload: { words: ["studied,", "If", "I", "passed", "had", "I'd", "have"], answer: ["If", "I", "had", "studied,", "I'd", "have", "passed"] },
        },
        {
          id: "b2soc-write-a2", type: "word_bank",
          prompt: "Di que la sociedad ha cambiado mucho:",
          payload: { words: ["lot", "Society", "changed", "a", "has"], answer: ["Society", "has", "changed", "a", "lot"] },
        },
        {
          id: "b2soc-write-a3", type: "word_bank",
          prompt: "Di que la comunidad se unio:",
          payload: { words: ["together", "The", "came", "community"], answer: ["The", "community", "came", "together"] },
        },
        {
          id: "b2soc-write-a4", type: "multiple_choice",
          prompt: "The third conditional talks about...",
          payload: { choices: ["A real future", "An imaginary past", "A present habit"], answer: 1 },
        },
      ],
    },
  ],
};
