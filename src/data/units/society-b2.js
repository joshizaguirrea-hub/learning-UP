/**
 * data/units/society-b2.js — Unidad tematica "Society & change" (B2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: third conditional.
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
    { id: "b2soc-11", term: "to demand", translation: "exigir", example: "Citizens demanded change." },
    { id: "b2soc-12", term: "progress", translation: "progreso", example: "There has been real progress." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2soc-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: lo que pudo cambiar",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Fifty years of change\n" +
          "Society has changed a lot in fifty years. Many people fought for equality and rights. " +
          "Historians say that if activists hadn't protested, some laws would never have changed. If women " +
          "hadn't demanded the vote, democracy would have been weaker. If the community hadn't come " +
          "together, poverty would have increased. Today, a new generation continues the fight against " +
          "inequality.\n\n" +
          "TEXT 2 - A conversation\n" +
          "A: Do you think things have improved? B: Yes. But if people hadn't protested, nothing would " +
          "have changed. A: True. If my grandparents hadn't fought, I wouldn't have these rights. B: " +
          "Exactly. Progress happens when communities demand it. A: We should keep going.",
        glossary: [
          { term: "if ... hadn't protested", translation: "si no hubieran protestado" },
          { term: "would never have changed", translation: "nunca habrian cambiado" },
          { term: "equality / inequality", translation: "igualdad / desigualdad" },
          { term: "rights / law", translation: "derechos / ley" },
          { term: "to protest / to demand", translation: "protestar / exigir" },
          { term: "generation / community", translation: "generacion / comunidad" },
          { term: "progress", translation: "progreso" },
          { term: "poverty", translation: "pobreza" },
        ],
        keyPhrases: [
          "Fijate en el tercer condicional: if + had + participio, would have + participio.",
          "Habla de un PASADO que no ocurrio (hipotetico).",
        ],
        check: [
          { prompt: "T1: What did many people fight for?", choices: ["Equality and rights", "More money", "Less work"], answer: 0 },
          { prompt: "T1: What would have happened without protests?", choices: ["Laws would never have changed", "Nothing", "Faster change"], answer: 0 },
          { prompt: "T1: Who continues the fight today?", choices: ["A new generation", "Historians", "Nobody"], answer: 0 },
          { prompt: "T2: Do they think things have improved?", choices: ["Yes", "No", "Not sure"], answer: 0 },
          { prompt: "T2: What would have happened if people hadn't protested?", choices: ["Nothing would have changed", "Everything got better", "Laws changed"], answer: 0 },
          { prompt: "T2: When does progress happen?", choices: ["When communities demand it", "By luck", "Never"], answer: 0 },
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
        { term: "to protest / to demand", translation: "protestar / exigir" },
        { term: "generation / progress", translation: "generacion / progreso" },
        { term: "law / to improve", translation: "ley / mejorar" },
      ],
      activities: [
        {
          id: "b2soc-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "society", right: "sociedad" },
            { left: "rights", right: "derechos" },
            { left: "poverty", right: "pobreza" },
            { left: "law", right: "ley" },
          ] },
        },
        {
          id: "b2soc-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "equality", right: "igualdad" },
            { left: "inequality", right: "desigualdad" },
            { left: "progress", right: "progreso" },
            { left: "community", right: "comunidad" },
          ] },
        },
        {
          id: "b2soc-vocab-a3", type: "cloze",
          prompt: "Completa: 'They fight for ___.' (igualdad)",
          payload: { answer: "equality" },
          explain: "'Equality' = igualdad.",
        },
        {
          id: "b2soc-vocab-a4", type: "cloze",
          prompt: "Completa: 'The new ___ was approved.' (ley)",
          payload: { answer: "law" },
          explain: "'Law' = ley.",
        },
        {
          id: "b2soc-vocab-a5", type: "cloze",
          prompt: "Completa: 'Citizens ___ change.' (exigir -> pasado)",
          payload: { answer: "demanded" },
          explain: "'To demand' = exigir; pasado: demanded.",
        },
        {
          id: "b2soc-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'protestar'?",
          payload: { choices: ["to improve", "to protest", "to approve"], answer: 1 },
          explain: "'To protest' = protestar.",
        },
        {
          id: "b2soc-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'progreso'?",
          payload: { choices: ["progress", "poverty", "law"], answer: 0 },
          explain: "'Progress' = progreso.",
        },
        {
          id: "b2soc-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["together", "The", "came", "community"], answer: ["The", "community", "came", "together"] },
          explain: "'The community came together' = la comunidad se unio.",
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
          id: "b2soc-gram-a4", type: "multiple_choice",
          prompt: "The third conditional talks about...",
          payload: { choices: ["A real future", "An imaginary past", "A present habit"], answer: 1 },
          explain: "Es un pasado hipotetico que no ocurrio.",
        },
        {
          id: "b2soc-gram-a5", type: "cloze",
          prompt: "Completa: 'If people hadn't protested, nothing ___ have changed.' (would)",
          payload: { answer: "would" },
          explain: "would have + participio (changed).",
        },
        {
          id: "b2soc-gram-a6", type: "word_bank",
          prompt: "Ordena el condicional:",
          payload: { words: ["studied,", "If", "I", "passed", "had", "I'd", "have"], answer: ["If", "I", "had", "studied,", "I'd", "have", "passed"] },
          explain: "If + I + had + studied, + I'd + have + passed.",
        },
        {
          id: "b2soc-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["lot", "Society", "changed", "a", "has"], answer: ["Society", "has", "changed", "a", "lot"] },
          explain: "Society + has + changed + a + lot.",
        },
        {
          id: "b2soc-gram-a8", type: "cloze",
          prompt: "Completa: 'If women hadn't demanded the vote, democracy would have ___ weaker.' (be -> participio)",
          payload: { answer: "been" },
          explain: "would have + been (participio de be).",
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
      intro: "Competencia de ESCRITURA. Construye frases con el tercer condicional.",
      activities: [
        {
          id: "b2soc-write-a1", type: "word_bank",
          prompt: "1. Di que si hubieras estudiado, habrias aprobado:",
          payload: { words: ["studied,", "If", "I", "passed", "had", "I'd", "have"], answer: ["If", "I", "had", "studied,", "I'd", "have", "passed"] },
        },
        {
          id: "b2soc-write-a2", type: "word_bank",
          prompt: "2. Di que la sociedad ha cambiado mucho:",
          payload: { words: ["lot", "Society", "changed", "a", "has"], answer: ["Society", "has", "changed", "a", "lot"] },
        },
        {
          id: "b2soc-write-a3", type: "word_bank",
          prompt: "3. Di que la comunidad se unio:",
          payload: { words: ["together", "The", "came", "community"], answer: ["The", "community", "came", "together"] },
        },
        {
          id: "b2soc-write-a4", type: "word_bank",
          prompt: "4. Di que los ciudadanos exigieron cambio:",
          payload: { words: ["change", "Citizens", "demanded"], answer: ["Citizens", "demanded", "change"] },
        },
        {
          id: "b2soc-write-a5", type: "word_bank",
          prompt: "5. Di que luchan contra la desigualdad:",
          payload: { words: ["inequality", "They", "against", "fight"], answer: ["They", "fight", "against", "inequality"] },
        },
        {
          id: "b2soc-write-a6", type: "multiple_choice",
          prompt: "6. The third conditional talks about...",
          payload: { choices: ["A real future", "An imaginary past", "A present habit"], answer: 1 },
        },
        {
          id: "b2soc-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["If I had known, I would have helped.", "If I knew, I would have helped.", "If I would know, I helped."], answer: 0 },
        },
        {
          id: "b2soc-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'derechos'?",
          payload: { choices: ["rights", "laws", "progress"], answer: 0 },
        },
      ],
    },
  ],
};
