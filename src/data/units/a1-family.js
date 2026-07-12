/**
 * data/units/a1-family.js — Unidad tematica "My family" (A1).
 *
 * Datos PUROS. Describir la familia y usar posesivos + have got. Sigue el ciclo
 * PPP del estandar de calidad (ver PLAN-DE-ESTUDIO.md).
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
    // ---------------- APRENDE ----------------
    {
      id: "a1f-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: la familia de Maria",
      intro:
        "Lee la descripcion de una familia y estudia el vocabulario y los posesivos. " +
        "Aqui solo se lee y se aprende.",
      teachesVocab: true,
      content: {
        reading:
          "This is Maria and her family. Her father is Carlos and her mother is Elena. " +
          "Maria has got one brother, Diego, and one sister, Lucia. Her grandmother lives " +
          "with them. Carlos is a teacher and Elena is a doctor. They are a happy family. " +
          "Maria loves her family very much.",
        glossary: [
          { term: "her father", translation: "su padre (de ella)" },
          { term: "her mother", translation: "su madre (de ella)" },
          { term: "has got", translation: "tiene" },
          { term: "lives with", translation: "vive con" },
          { term: "happy", translation: "feliz" },
          { term: "family", translation: "familia" },
        ],
        keyPhrases: [
          "This is my... (Este/esta es mi...)",
          "I have got... (Yo tengo...)",
          "Her/His name is... (Su nombre es...)",
          "They are a happy family. (Son una familia feliz.)",
        ],
        note:
          "Adjetivos posesivos: my (mi), your (tu), his (de el), her (de ella), our (nuestro), " +
          "their (de ellos). Van SIEMPRE antes del sustantivo: 'my brother', 'her mother'.",
        grammar: {
          title: "have got (tener)",
          form: "I/you/we/they + have got · he/she/it + has got",
          examples: [
            "I have got two brothers.",
            "She has got one sister.",
          ],
          mistakes: [
            { wrong: "She have got a son.", right: "She has got a son." },
            { wrong: "I has got a sister.", right: "I have got a sister." },
          ],
        },
        check: [
          { prompt: "Who is Maria's brother?", choices: ["Carlos", "Diego", "Lucia"], answer: 1 },
          { prompt: "What is Elena's job?", choices: ["Teacher", "Doctor", "Student"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ---------------- PRESENTACION ----------------
    {
      id: "a1f-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: hablar de la familia",
      intro:
        "Usamos posesivos y 'have got' para hablar de la familia. Lee el dialogo.",
      dialogue: [
        "A: Have you got any brothers or sisters?",
        "B: Yes, I have got one sister. Her name is Lucia.",
        "A: Nice! And your parents?",
        "B: My father is a teacher and my mother is a doctor.",
      ],
      activities: [
        {
          id: "a1f-l1-a1", type: "multiple_choice",
          prompt: "'Her name is Lucia' means the name belongs to:",
          payload: { choices: ["A man", "A woman", "A place"], answer: 1 },
          explain: "'Her' = de ella. Se usa para una mujer o nina.",
        },
        {
          id: "a1f-l1-a2", type: "matching",
          prompt: "Empareja cada palabra con su significado:",
          payload: { pairs: [
            { left: "mother", right: "madre" },
            { left: "brother", right: "hermano" },
            { left: "daughter", right: "hija" },
          ] },
        },
      ],
    },

    // ---------------- PRACTICA ----------------
    {
      id: "a1f-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: posesivos y have got",
      intro: "Completa, elige y ordena para practicar.",
      activities: [
        {
          id: "a1f-l2-a1", type: "cloze",
          prompt: "Completa: 'He ___ got two children.' (tiene)",
          payload: { answer: "has" },
          explain: "Con he/she/it usamos 'has got'.",
        },
        {
          id: "a1f-l2-a2", type: "cloze",
          prompt: "Completa: 'This is ___ sister.' (mi)",
          payload: { answer: "my" },
          explain: "'My' = mi. Va antes del sustantivo: my sister.",
        },
        {
          id: "a1f-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "I have got a brother.",
            "I has got a brother.",
            "I have get a brother.",
          ], answer: 0 },
          explain: "Con 'I' usamos 'have got'. La forma es 'have got', no 'have get'.",
        },
        {
          id: "a1f-l2-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["mother", "is", "My", "a", "doctor"], answer: ["My", "mother", "is", "a", "doctor"] },
          explain: "Orden: My + mother + is + a + doctor.",
        },
        {
          id: "a1f-l2-a5", type: "cloze",
          prompt: "Completa: 'Her ___ is very kind.' (abuela)",
          payload: { answer: "grandmother" },
          explain: "'Grandmother' = abuela.",
        },
      ],
    },

    // ---------------- PRODUCCION ----------------
    {
      id: "a1f-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: describe tu familia",
      intro:
        "Tarea real: construye frases para describir a tu familia. Ordena cada frase.",
      activities: [
        {
          id: "a1f-l3-a1", type: "word_bank",
          prompt: "Di cuantos hermanos tienes:",
          payload: { words: ["got", "one", "I", "have", "brother"], answer: ["I", "have", "got", "one", "brother"] },
        },
        {
          id: "a1f-l3-a2", type: "word_bank",
          prompt: "Presenta a tu madre:",
          payload: { words: ["mother", "This", "my", "is"], answer: ["This", "is", "my", "mother"] },
        },
        {
          id: "a1f-l3-a3", type: "word_bank",
          prompt: "Di el trabajo de tu padre:",
          payload: { words: ["father", "a", "My", "teacher", "is"], answer: ["My", "father", "is", "a", "teacher"] },
        },
        {
          id: "a1f-l3-a4", type: "multiple_choice",
          prompt: "Which word means 'hijos/ninos'?",
          payload: { choices: ["children", "friends", "teachers"], answer: 0 },
        },
      ],
    },
  ],
};
