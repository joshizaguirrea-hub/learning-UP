/**
 * data/units/education-b1.js — Unidad tematica "Education & learning" (B1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: relative clauses.
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
    { id: "edu-11", term: "to study", translation: "estudiar", example: "I study every evening." },
    { id: "edu-12", term: "classmate", translation: "companero de clase", example: "My classmates are friendly." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "edu-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: aprender de verdad",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Lucas the student\n" +
          "Lucas is a student who loves learning. His favourite subject is history, which he finds " +
          "fascinating. Last year he had a teacher who changed his life. She was a person who never gave " +
          "up on her students. The book that she recommended helped him pass his exams. Lucas believes " +
          "that knowledge is the skill that opens doors. Now he wants a degree that will help him become " +
          "a teacher too.\n\n" +
          "TEXT 2 - Study tips\n" +
          "A: I always fail the exams that I don't prepare for. B: You need a method that works for you. " +
          "A: Like what? B: Study with a classmate who is organised, and do the homework that the teacher " +
          "gives. A: That's the advice which I needed! B: And rest well the night before.",
        glossary: [
          { term: "who / which / that", translation: "que (personas / cosas)" },
          { term: "gave up on", translation: "se rindio con" },
          { term: "to pass / to fail", translation: "aprobar / reprobar" },
          { term: "degree / knowledge", translation: "titulo / conocimiento" },
          { term: "skill / subject", translation: "habilidad / materia" },
          { term: "classmate / homework", translation: "companero de clase / tarea" },
          { term: "method", translation: "metodo" },
          { term: "advice", translation: "consejo" },
        ],
        keyPhrases: [
          "Fijate en who (personas), which/that (cosas).",
          "Busca la materia favorita y el consejo de estudio.",
        ],
        check: [
          { prompt: "T1: What is Lucas's favourite subject?", choices: ["History", "Maths", "Science"], answer: 0 },
          { prompt: "T1: What did the teacher do?", choices: ["Gave up on students", "Changed his life", "Failed him"], answer: 1 },
          { prompt: "T1: What does Lucas want to become?", choices: ["A doctor", "A teacher", "An artist"], answer: 1 },
          { prompt: "T2: When does A fail exams?", choices: ["When unprepared", "Always", "Never"], answer: 0 },
          { prompt: "T2: Who should A study with?", choices: ["An organised classmate", "Nobody", "A teacher"], answer: 0 },
          { prompt: "T2: What should A do the night before?", choices: ["Study all night", "Rest well", "Party"], answer: 1 },
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
        { term: "subject / to study", translation: "materia / estudiar" },
        { term: "to learn / knowledge", translation: "aprender / conocimiento" },
        { term: "exam / homework", translation: "examen / tarea" },
        { term: "to pass / to fail", translation: "aprobar / reprobar" },
        { term: "degree / skill", translation: "titulo / habilidad" },
        { term: "teacher / classmate", translation: "profesor / companero" },
      ],
      activities: [
        {
          id: "edu-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "subject", right: "materia" },
            { left: "exam", right: "examen" },
            { left: "degree", right: "titulo" },
            { left: "skill", right: "habilidad" },
          ] },
        },
        {
          id: "edu-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to pass", right: "aprobar" },
            { left: "to fail", right: "reprobar" },
            { left: "homework", right: "tarea" },
            { left: "classmate", right: "companero de clase" },
          ] },
        },
        {
          id: "edu-vocab-a3", type: "cloze",
          prompt: "Completa: 'I ___ the exam!' (aprobar -> pasado)",
          payload: { answer: "passed" },
          explain: "'To pass' = aprobar; pasado: passed.",
        },
        {
          id: "edu-vocab-a4", type: "cloze",
          prompt: "Completa: 'I do my ___ at night.' (tarea)",
          payload: { answer: "homework" },
          explain: "'Homework' = tarea.",
        },
        {
          id: "edu-vocab-a5", type: "cloze",
          prompt: "Completa: 'She has a ___ in biology.' (titulo)",
          payload: { answer: "degree" },
          explain: "'Degree' = titulo / carrera.",
        },
        {
          id: "edu-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'reprobar'?",
          payload: { choices: ["to pass", "to fail", "to learn"], answer: 1 },
          explain: "'To fail' = reprobar.",
        },
        {
          id: "edu-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'conocimiento'?",
          payload: { choices: ["knowledge", "homework", "subject"], answer: 0 },
          explain: "'Knowledge' = conocimiento.",
        },
        {
          id: "edu-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["evening", "I", "every", "study"], answer: ["I", "study", "every", "evening"] },
          explain: "'I study every evening' = estudio cada tarde.",
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
          { wrong: "The person what called.", right: "The person who called." },
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
          id: "edu-gram-a3", type: "cloze",
          prompt: "Completa: 'This is the advice ___ I needed.' (cosa)",
          payload: { answer: "which", alt: ["that"] },
          explain: "'which/that' para cosas.",
        },
        {
          id: "edu-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["The man which called you.", "The man who called you.", "The man what called you."], answer: 1 },
          explain: "'who' para personas.",
        },
        {
          id: "edu-gram-a5", type: "multiple_choice",
          prompt: "Which relative pronoun is for things?",
          payload: { choices: ["who", "which", "whose"], answer: 1 },
          explain: "'which' para cosas.",
        },
        {
          id: "edu-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["who", "person", "a", "She's", "helps"], answer: ["She's", "a", "person", "who", "helps"] },
          explain: "She's + a + person + who + helps.",
        },
        {
          id: "edu-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["I", "book", "The", "read", "that"], answer: ["The", "book", "that", "I", "read"] },
          explain: "The + book + that + I + read.",
        },
        {
          id: "edu-gram-a8", type: "cloze",
          prompt: "Completa: 'Study with a classmate ___ is organised.' (persona)",
          payload: { answer: "who", alt: ["that"] },
          explain: "'who' (o 'that') para personas.",
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
      intro: "Competencia de ESCRITURA. Construye frases con oraciones de relativo.",
      activities: [
        {
          id: "edu-write-a1", type: "word_bank",
          prompt: "1. Describe al profesor que te ayudo:",
          payload: { words: ["who", "The", "teacher", "me", "helped"], answer: ["The", "teacher", "who", "helped", "me"] },
        },
        {
          id: "edu-write-a2", type: "word_bank",
          prompt: "2. Describe el libro que leiste:",
          payload: { words: ["I", "book", "The", "read", "that"], answer: ["The", "book", "that", "I", "read"] },
        },
        {
          id: "edu-write-a3", type: "word_bank",
          prompt: "3. Di que aprobaste el examen:",
          payload: { words: ["the", "I", "exam", "passed"], answer: ["I", "passed", "the", "exam"] },
        },
        {
          id: "edu-write-a4", type: "word_bank",
          prompt: "4. Di tu materia favorita:",
          payload: { words: ["subject", "My", "is", "favourite", "history"], answer: ["My", "favourite", "subject", "is", "history"] },
        },
        {
          id: "edu-write-a5", type: "word_bank",
          prompt: "5. Di que necesitas un metodo que funcione:",
          payload: { words: ["works", "I", "a", "need", "method", "that"], answer: ["I", "need", "a", "method", "that", "works"] },
        },
        {
          id: "edu-write-a6", type: "multiple_choice",
          prompt: "6. Which relative pronoun is for people?",
          payload: { choices: ["who", "which", "where"], answer: 0 },
        },
        {
          id: "edu-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["The car who I bought.", "The car which I bought.", "The car who bought I."], answer: 1 },
        },
        {
          id: "edu-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'aprobar'?",
          payload: { choices: ["to fail", "to pass", "to study"], answer: 1 },
        },
      ],
    },
  ],
};
