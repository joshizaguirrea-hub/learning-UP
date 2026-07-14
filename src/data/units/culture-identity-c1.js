/**
 * data/units/culture-identity-c1.js — Unidad tematica "Culture & identity" (C1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: ellipsis y sustitucion.
 */

export const CULTURE_IDENTITY_C1 = {
  id: "culture-identity-c1",
  language: "en",
  level: "C1",
  title: "Culture & identity",
  subtitle: "Hablar de cultura e identidad con naturalidad (ellipsis)",

  cando: [
    "Puedo hablar de cultura, tradiciones e identidad.",
    "Puedo usar la elipsis y la sustitucion para evitar repetir.",
    "Puedo sonar mas natural en conversacion y escritura.",
    "Puedo escribir sobre mi identidad cultural.",
  ],

  vocab: [
    { id: "c1cu-1", term: "identity", translation: "identidad", example: "Language is part of identity." },
    { id: "c1cu-2", term: "heritage", translation: "herencia / legado", example: "She is proud of her heritage." },
    { id: "c1cu-3", term: "tradition", translation: "tradicion", example: "It's an old tradition." },
    { id: "c1cu-4", term: "to belong", translation: "pertenecer", example: "We all want to belong." },
    { id: "c1cu-5", term: "diverse", translation: "diverso", example: "The city is very diverse." },
    { id: "c1cu-6", term: "roots", translation: "raices", example: "She never forgot her roots." },
    { id: "c1cu-7", term: "custom", translation: "costumbre", example: "It's a local custom." },
    { id: "c1cu-8", term: "to preserve", translation: "preservar", example: "We must preserve our culture." },
    { id: "c1cu-9", term: "ancestor", translation: "antepasado", example: "Her ancestors came from Peru." },
    { id: "c1cu-10", term: "sense of belonging", translation: "sentido de pertenencia", example: "A strong sense of belonging." },
    { id: "c1cu-11", term: "multicultural", translation: "multicultural", example: "It's a multicultural society." },
    { id: "c1cu-12", term: "to value", translation: "valorar", example: "We value our traditions." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1cu-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: raices e identidad",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Maya's roots\n" +
          "Maya loves her culture, and so does her brother. Some people forget their roots; others never " +
          "do. 'I could visit my ancestors' village, and I will,' she says. Her heritage matters to her, " +
                 "and it should to everyone. When asked about tradition, she says she preserves it because her " +
          "grandmother did. Her diverse community keeps old customs alive.\n\n" +
          "TEXT 2 - Belonging\n" +
          "A: Do you feel a sense of belonging here? B: Yes, I do. And you? A: I don't, honestly. B: Really? " +
          "Neither did I at first. A: This city is so multicultural. B: It is, isn't it? We should value " +
          "that. A: We do. So does everyone I know.",
        glossary: [
          { term: "so does her brother", translation: "su hermano tambien" },
          { term: "others never do", translation: "otros nunca lo hacen" },
          { term: "and I will / it should", translation: "y lo hare / deberia" },
          { term: "Neither did I", translation: "yo tampoco" },
          { term: "identity / heritage", translation: "identidad / herencia" },
          { term: "roots / ancestor", translation: "raices / antepasado" },
          { term: "diverse / multicultural", translation: "diverso / multicultural" },
          { term: "to preserve / to value", translation: "preservar / valorar" },
        ],
        keyPhrases: [
          "Fijate en la elipsis/sustitucion: so does her brother, others never do, Neither did I, We do.",
          "Evitan repetir el verbo completo, sonando mas natural.",
        ],
        check: [
          { prompt: "T1: Who else loves the culture?", choices: ["Her brother", "Nobody", "Her boss"], answer: 0 },
          { prompt: "T1: Does Maya forget her roots?", choices: ["Yes", "No, she never does", "Sometimes"], answer: 1 },
          { prompt: "T1: Why does she preserve tradition?", choices: ["Because her grandmother did", "For money", "By accident"], answer: 0 },
          { prompt: "T2: Does B feel a sense of belonging?", choices: ["Yes", "No", "Not sure"], answer: 0 },
          { prompt: "T2: Did A feel it at first?", choices: ["Yes", "No, and neither did B", "Always"], answer: 1 },
          { prompt: "T2: What should they value?", choices: ["The multicultural city", "Money", "Nothing"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c1cu-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: cultura e identidad",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "identity / heritage", translation: "identidad / herencia" },
        { term: "tradition / custom", translation: "tradicion / costumbre" },
        { term: "to belong / sense of belonging", translation: "pertenecer / sentido de pertenencia" },
        { term: "diverse / multicultural", translation: "diverso / multicultural" },
        { term: "roots / ancestor", translation: "raices / antepasado" },
        { term: "to preserve / to value", translation: "preservar / valorar" },
      ],
      activities: [
        {
          id: "c1cu-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "identity", right: "identidad" },
            { left: "roots", right: "raices" },
            { left: "custom", right: "costumbre" },
            { left: "heritage", right: "herencia" },
          ] },
        },
        {
          id: "c1cu-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "diverse", right: "diverso" },
            { left: "multicultural", right: "multicultural" },
            { left: "to preserve", right: "preservar" },
            { left: "to value", right: "valorar" },
          ] },
        },
        {
          id: "c1cu-vocab-a3", type: "cloze",
          prompt: "Completa: 'She is proud of her ___.' (herencia)",
          payload: { answer: "heritage" },
          explain: "'Heritage' = herencia / legado.",
        },
        {
          id: "c1cu-vocab-a4", type: "cloze",
          prompt: "Completa: 'Her ___ came from Peru.' (antepasados)",
          payload: { answer: "ancestors" },
          explain: "'Ancestors' = antepasados.",
        },
        {
          id: "c1cu-vocab-a5", type: "cloze",
          prompt: "Completa: 'We ___ our traditions.' (valorar)",
          payload: { answer: "value" },
          explain: "'To value' = valorar.",
        },
        {
          id: "c1cu-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'diverso'?",
          payload: { choices: ["diverse", "custom", "root"], answer: 0 },
          explain: "'Diverse' = diverso.",
        },
        {
          id: "c1cu-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'pertenecer'?",
          payload: { choices: ["to belong", "to value", "to preserve"], answer: 0 },
          explain: "'To belong' = pertenecer.",
        },
        {
          id: "c1cu-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["culture", "We", "our", "preserve", "must"], answer: ["We", "must", "preserve", "our", "culture"] },
          explain: "We + must + preserve + our + culture.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c1cu-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: elipsis y sustitucion",
      intro: "Competencia de GRAMATICA. Aprende a evitar repeticiones con elipsis/sustitucion.",
      grammar: {
        title: "Ellipsis & substitution",
        form: "so/neither + auxiliar + sujeto · do/one como sustitutos · respuestas cortas (Yes, I do)",
        desc: "Sirve para mostrar acuerdo, evitar repetir y responder de forma natural.",
        rule: "'So + auxiliar + sujeto' para coincidir en afirmativo (So do I) y 'neither + auxiliar + sujeto' en negativo (Neither do I). Usa 'do' y 'one' para no repetir; en respuestas cortas repite el auxiliar (Yes, I do).",
        examples: ["I love it, and so does she.", "I don't, and neither does he.", "Do you? Yes, I do."],
        explain: { tr: ["Me encanta, y a ella tambi\u00e9n.", "Yo no, y \u00e9l tampoco.", "\u00bfT\u00fa s\u00ed? S\u00ed, yo s\u00ed."] },
        mistakes: [
          { wrong: "I love it, and so she loves.", right: "I love it, and so does she." },
          { wrong: "I can't, and neither he can.", right: "I can't, and neither can he." },
        ],
      },
      activities: [
        {
          id: "c1cu-gram-a1", type: "cloze",
          prompt: "Completa: 'She loves it, and so ___ he.' (auxiliar)",
          payload: { answer: "does" },
          explain: "'so does he' = el tambien (evita repetir 'loves').",
        },
        {
          id: "c1cu-gram-a2", type: "cloze",
          prompt: "Completa: 'I don't, and ___ does he.' (tampoco)",
          payload: { answer: "neither" },
          explain: "'neither does he' = el tampoco.",
        },
        {
          id: "c1cu-gram-a3", type: "multiple_choice",
          prompt: "Choose the natural short answer to 'Do you like it?':",
          payload: { choices: ["Yes, I like it very much do.", "Yes, I do.", "Yes, I am."], answer: 1 },
          explain: "Respuesta corta con el auxiliar: 'Yes, I do.'",
        },
        {
          id: "c1cu-gram-a4", type: "multiple_choice",
          prompt: "Ellipsis and substitution help you...",
          payload: { choices: ["repeat more", "avoid repetition and sound natural", "make errors"], answer: 1 },
          explain: "Evitan la repeticion y suenan naturales.",
        },
        {
          id: "c1cu-gram-a5", type: "cloze",
          prompt: "Completa: 'I didn't feel it, and ___ did he.' (tampoco)",
          payload: { answer: "neither" },
          explain: "'neither did he' = el tampoco (pasado).",
        },
        {
          id: "c1cu-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["so", "I", "do", "and", "agree,", "they"], answer: ["I", "agree,", "and", "so", "do", "they"] },
          explain: "I + agree, + and + so + do + they.",
        },
        {
          id: "c1cu-gram-a7", type: "word_bank",
          prompt: "Ordena la frase con 'neither':",
          payload: { words: ["can", "I", "neither", "can't,", "he", "and"], answer: ["I", "can't,", "and", "neither", "can", "he"] },
          explain: "I + can't, + and + neither + can + he.",
        },
        {
          id: "c1cu-gram-a8", type: "cloze",
          prompt: "Respuesta corta: 'Do you value it?' 'Yes, I ___.'",
          payload: { answer: "do" },
          explain: "Respuesta corta con auxiliar: 'Yes, I do.'",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c1cu-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: tu identidad cultural",
      intro: "Competencia de ESCRITURA. Construye frases con elipsis/sustitucion.",
      activities: [
        {
          id: "c1cu-write-a1", type: "word_bank",
          prompt: "1. Di que tu estas de acuerdo y ellos tambien:",
          payload: { words: ["so", "I", "do", "and", "agree,", "they"], answer: ["I", "agree,", "and", "so", "do", "they"] },
        },
        {
          id: "c1cu-write-a2", type: "word_bank",
          prompt: "2. Di que debemos preservar nuestra cultura:",
          payload: { words: ["culture", "We", "our", "preserve", "must"], answer: ["We", "must", "preserve", "our", "culture"] },
        },
        {
          id: "c1cu-write-a3", type: "word_bank",
          prompt: "3. Di que ella nunca olvido sus raices:",
          payload: { words: ["roots", "She", "forgot", "her", "never"], answer: ["She", "never", "forgot", "her", "roots"] },
        },
        {
          id: "c1cu-write-a4", type: "word_bank",
          prompt: "4. Di que valoras tu herencia:",
          payload: { words: ["heritage", "I", "my", "value"], answer: ["I", "value", "my", "heritage"] },
        },
        {
          id: "c1cu-write-a5", type: "word_bank",
          prompt: "5. Di que la ciudad es muy diversa:",
          payload: { words: ["diverse", "The", "very", "city", "is"], answer: ["The", "city", "is", "very", "diverse"] },
        },
        {
          id: "c1cu-write-a6", type: "multiple_choice",
          prompt: "6. Ellipsis and substitution help you...",
          payload: { choices: ["repeat more", "avoid repetition and sound natural", "make errors"], answer: 1 },
        },
        {
          id: "c1cu-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["I like it, and so does she.", "I like it, and so she does like.", "I like it, so likes she."], answer: 0 },
        },
        {
          id: "c1cu-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'sentido de pertenencia'?",
          payload: { choices: ["sense of belonging", "heritage", "custom"], answer: 0 },
        },
      ],
    },
  ],
};
