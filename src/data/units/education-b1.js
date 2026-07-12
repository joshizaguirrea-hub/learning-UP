/**
 * data/units/education-b1.js — Unidad tematica "Education & learning" (B1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: relative clauses.
 */

export const EDUCATION_B1 = {
  id: "education-b1",
  language: "en",
  level: "B1",
  title: "Education & learning",
  subtitle: "Hablar de estudios, aprendizaje y experiencias academicas",

  cando: [
    "Puedo hablar de mis estudios y forma de aprender.",
    "Puedo usar oraciones de relativo (who/which/that).",
    "Puedo describir personas y cosas con mas detalle.",
    "Puedo escribir sobre mi experiencia aprendiendo.",
  ],

  vocab: [
    { id: "edu-1", term: "subject", translation: "materia / asignatura", example: "Maths is my favourite subject." },
    { id: "edu-2", term: "to learn", translation: "aprender", example: "I learn something new every day." },
    { id: "edu-3", term: "teacher", translation: "profesor/a", example: "The teacher who helped me was kind." },
    { id: "edu-4", term: "exam", translation: "examen", example: "The exam was difficult." },
    { id: "edu-5", term: "to pass", translation: "aprobar", example: "I passed the exam." },
    { id: "edu-6", term: "to fail", translation: "reprobar", example: "He failed the test." },
    { id: "edu-7", term: "degree", translation: "titulo / carrera", example: "She has a degree in biology." },
    { id: "edu-8", term: "knowledge", translation: "conocimiento", example: "Knowledge is power." },
    { id: "edu-9", term: "skill", translation: "habilidad", example: "Reading is a key skill." },
    { id: "edu-10", term: "homework", translation: "tarea", example: "I do my homework at night." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "edu-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: aprender de verdad",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Lucas is a student who loves learning. His favourite subject is history, which he finds " +
          "fascinating. Last year he had a teacher who changed his life. She was a person who never " +
          "gave up on her students. The book that she recommended helped him pass his exams. Lucas " +
          "believes that knowledge is the skill that opens doors. Now he wants a degree that will " +
          "help him become a teacher too.",
        keyPhrases: [
          "Fijate en who (personas), which/that (cosas).",
          "Busca que materia le gusta y que quiere ser.",
        ],
        check: [
          { prompt: "What is Lucas's favourite subject?", choices: ["History", "Maths", "Science"], answer: 0 },
          { prompt: "What did the teacher do?", choices: ["Gave up on students", "Changed his life", "Failed him"], answer: 1 },
          { prompt: "What helped him pass?", choices: ["A film", "The book she recommended", "Luck"], answer: 1 },
          { prompt: "What does Lucas want to become?", choices: ["A doctor", "A teacher", "An artist"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "edu-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: estudios y aprendizaje",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "subject", translation: "materia" },
        { term: "to learn / knowledge", translation: "aprender / conocimiento" },
        { term: "exam / homework", translation: "examen / tarea" },
        { term: "to pass / to fail", translation: "aprobar / reprobar" },
        { term: "degree", translation: "titulo / carrera" },
        { term: "skill", translation: "habilidad" },
      ],
      activities: [
        {
          id: "edu-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "subject", right: "materia" },
            { left: "exam", right: "examen" },
            { left: "degree", right: "titulo" },
          ] },
        },
        {
          id: "edu-vocab-a2", type: "cloze",
          prompt: "Completa: 'I ___ the exam!' (aprobar -> pasado)",
          payload: { answer: "passed" },
          explain: "'To pass' = aprobar; pasado: passed.",
        },
        {
          id: "edu-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'reprobar'?",
          payload: { choices: ["to pass", "to fail", "to learn"], answer: 1 },
          explain: "'To fail' = reprobar.",
        },
        {
          id: "edu-vocab-a4", type: "cloze",
          prompt: "Completa: 'I do my ___ at night.' (tarea)",
          payload: { answer: "homework" },
          explain: "'Homework' = tarea.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "edu-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: oraciones de relativo",
      intro: "Competencia de GRAMATICA. Aprende who/which/that para dar detalles.",
      grammar: {
        title: "Relative clauses (who / which / that)",
        form: "who = personas · which = cosas · that = personas o cosas",
        examples: ["The teacher who helped me.", "The book which she wrote.", "The film that we saw."],
        mistakes: [
          { wrong: "The man which helped me.", right: "The man who helped me." },
          { wrong: "The book who I read.", right: "The book which I read." },
        ],
      },
      activities: [
        {
          id: "edu-gram-a1", type: "cloze",
          prompt: "Completa: 'The teacher ___ helped me was kind.' (persona)",
          payload: { answer: "who" },
          explain: "'who' para personas.",
        },
        {
          id: "edu-gram-a2", type: "cloze",
          prompt: "Completa: 'The book ___ she wrote is great.' (cosa)",
          payload: { answer: "which", alt: ["that"] },
          explain: "'which' (o 'that') para cosas.",
        },
        {
          id: "edu-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["The man which called you.", "The man who called you.", "The man what called you."], answer: 1 },
          explain: "'who' para personas.",
        },
        {
          id: "edu-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["who", "person", "a", "She's", "helps"], answer: ["She's", "a", "person", "who", "helps"] },
          explain: "Orden: She's + a + person + who + helps.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "edu-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: describe con detalle",
      intro: "Competencia de ESCRITURA. Construye frases con oraciones de relativo. Ordena cada frase.",
      activities: [
        {
          id: "edu-write-a1", type: "word_bank",
          prompt: "Describe al profesor que te ayudo:",
          payload: { words: ["who", "The", "teacher", "me", "helped"], answer: ["The", "teacher", "who", "helped", "me"] },
        },
        {
          id: "edu-write-a2", type: "word_bank",
          prompt: "Describe el libro que leiste:",
          payload: { words: ["I", "book", "The", "read", "that"], answer: ["The", "book", "that", "I", "read"] },
        },
        {
          id: "edu-write-a3", type: "word_bank",
          prompt: "Di que aprobaste el examen:",
          payload: { words: ["the", "I", "exam", "passed"], answer: ["I", "passed", "the", "exam"] },
        },
        {
          id: "edu-write-a4", type: "multiple_choice",
          prompt: "Which relative pronoun is for things?",
          payload: { choices: ["who", "which", "whose"], answer: 1 },
        },
      ],
    },
  ],
};
