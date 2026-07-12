/**
 * data/units/a1-family.js — Unidad tematica "My family" (A1).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA. Listening/Speaking con audio/IA.
 */

export const A1_FAMILY = {
  id: "a1-family",
  language: "en",
  level: "A1",
  title: "My family",
  subtitle: "Hablar de tu familia y describir a las personas",

  cando: [
    "Puedo nombrar a los miembros de mi familia.",
    "Puedo usar adjetivos posesivos (my, your, his, her).",
    "Puedo usar 'have got' para hablar de lo que tengo.",
    "Puedo describir a una persona de forma simple.",
  ],

  vocab: [
    { id: "a1f-1", term: "mother", translation: "madre", example: "My mother is a doctor." },
    { id: "a1f-2", term: "father", translation: "padre", example: "His father works in a bank." },
    { id: "a1f-3", term: "brother", translation: "hermano", example: "I have got one brother." },
    { id: "a1f-4", term: "sister", translation: "hermana", example: "Her sister is ten years old." },
    { id: "a1f-5", term: "son", translation: "hijo", example: "They have got a son." },
    { id: "a1f-6", term: "daughter", translation: "hija", example: "My daughter loves music." },
    { id: "a1f-7", term: "grandmother", translation: "abuela", example: "My grandmother is very kind." },
    { id: "a1f-8", term: "husband", translation: "esposo", example: "Her husband is tall." },
    { id: "a1f-9", term: "wife", translation: "esposa", example: "His wife is a teacher." },
    { id: "a1f-10", term: "children", translation: "hijos / ninos", example: "They have got two children." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a1f-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: la familia de Maria",
      intro: "Competencia de LECTURA. Lee la descripcion y comprueba que entendiste.",
      content: {
        reading:
          "This is Maria and her family. Her father is Carlos and her mother is Elena. " +
          "Maria has got one brother, Diego, and one sister, Lucia. Her grandmother lives " +
          "with them. Carlos is a teacher and Elena is a doctor. They are a happy family. " +
          "Maria loves her family very much.",
        keyPhrases: [
          "Identifica los nombres de cada miembro.",
          "Busca los trabajos del padre y la madre.",
        ],
        check: [
          { prompt: "Who is Maria's brother?", choices: ["Carlos", "Diego", "Lucia"], answer: 1 },
          { prompt: "What is Elena's job?", choices: ["Teacher", "Doctor", "Student"], answer: 1 },
          { prompt: "Who lives with them?", choices: ["An uncle", "Her grandmother", "A friend"], answer: 1 },
          { prompt: "What is Carlos's job?", choices: ["Doctor", "Teacher", "Driver"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a1f-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: la familia",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "mother / father", translation: "madre / padre" },
        { term: "brother / sister", translation: "hermano / hermana" },
        { term: "son / daughter", translation: "hijo / hija" },
        { term: "grandmother", translation: "abuela" },
        { term: "husband / wife", translation: "esposo / esposa" },
        { term: "children", translation: "hijos / ninos" },
      ],
      activities: [
        {
          id: "a1f-vocab-a1", type: "matching",
          prompt: "Empareja cada palabra con su significado:",
          payload: { pairs: [
            { left: "mother", right: "madre" },
            { left: "brother", right: "hermano" },
            { left: "daughter", right: "hija" },
          ] },
        },
        {
          id: "a1f-vocab-a2", type: "multiple_choice",
          prompt: "Which word means 'hijos/ninos'?",
          payload: { choices: ["children", "friends", "teachers"], answer: 0 },
          explain: "'Children' = hijos / ninos (plural de child).",
        },
        {
          id: "a1f-vocab-a3", type: "cloze",
          prompt: "Completa: 'Her ___ is very kind.' (abuela)",
          payload: { answer: "grandmother" },
          explain: "'Grandmother' = abuela.",
        },
        {
          id: "a1f-vocab-a4", type: "multiple_choice",
          prompt: "Which word means 'esposa'?",
          payload: { choices: ["husband", "wife", "sister"], answer: 1 },
          explain: "'Wife' = esposa. 'Husband' = esposo.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a1f-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: posesivos y have got",
      intro: "Competencia de GRAMATICA. Aprende posesivos y 'have got' y practicalos.",
      grammar: {
        title: "have got (tener)",
        form: "I/you/we/they + have got · he/she/it + has got",
        examples: ["I have got two brothers.", "She has got one sister."],
        mistakes: [
          { wrong: "She have got a son.", right: "She has got a son." },
          { wrong: "I has got a sister.", right: "I have got a sister." },
        ],
      },
      activities: [
        {
          id: "a1f-gram-a1", type: "cloze",
          prompt: "Completa: 'He ___ got two children.' (tiene)",
          payload: { answer: "has" },
          explain: "Con he/she/it: 'has got'.",
        },
        {
          id: "a1f-gram-a2", type: "cloze",
          prompt: "Completa: 'This is ___ sister.' (mi)",
          payload: { answer: "my" },
          explain: "'My' = mi. Va antes del sustantivo.",
        },
        {
          id: "a1f-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["I have got a brother.", "I has got a brother.", "I have get a brother."], answer: 0 },
          explain: "Con 'I': 'have got'.",
        },
        {
          id: "a1f-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["mother", "is", "My", "a", "doctor"], answer: ["My", "mother", "is", "a", "doctor"] },
          explain: "Orden: My + mother + is + a + doctor.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a1f-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: describe tu familia",
      intro: "Competencia de ESCRITURA. Construye frases para describir a tu familia. Ordena cada frase.",
      activities: [
        {
          id: "a1f-write-a1", type: "word_bank",
          prompt: "Di cuantos hermanos tienes:",
          payload: { words: ["got", "one", "I", "have", "brother"], answer: ["I", "have", "got", "one", "brother"] },
        },
        {
          id: "a1f-write-a2", type: "word_bank",
          prompt: "Presenta a tu madre:",
          payload: { words: ["mother", "This", "my", "is"], answer: ["This", "is", "my", "mother"] },
        },
        {
          id: "a1f-write-a3", type: "word_bank",
          prompt: "Di el trabajo de tu padre:",
          payload: { words: ["father", "a", "My", "teacher", "is"], answer: ["My", "father", "is", "a", "teacher"] },
        },
        {
          id: "a1f-write-a4", type: "multiple_choice",
          prompt: "Which word means 'abuela'?",
          payload: { choices: ["mother", "grandmother", "sister"], answer: 1 },
        },
      ],
    },
  ],
};
