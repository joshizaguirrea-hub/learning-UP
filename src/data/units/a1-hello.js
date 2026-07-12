/**
 * data/units/a1-hello.js — Unidad tematica "Hello!" (A1).
 *
 * Datos PUROS. Primer contacto con el idioma: saludar, presentarse y dar datos
 * personales basicos. Sigue el ciclo PPP (Aprende -> Presenta -> Practica ->
 * Produce) del estandar de calidad (ver docs/PEDAGOGIA.md y PLAN-DE-ESTUDIO.md).
 */

export const A1_HELLO = {
  id: "a1-hello",
  language: "en",
  level: "A1",
  title: "Hello!",
  subtitle: "Saludar, presentarte y dar tus datos personales",

  cando: [
    "Puedo saludar y despedirme.",
    "Puedo presentarme y decir mi nombre y nacionalidad.",
    "Puedo preguntar y responder datos personales basicos.",
    "Puedo usar el verbo 'to be' en frases simples.",
  ],

  vocab: [
    { id: "a1h-1", term: "hello", translation: "hola", example: "Hello! My name is Ana." },
    { id: "a1h-2", term: "goodbye", translation: "adios", example: "Goodbye! See you tomorrow." },
    { id: "a1h-3", term: "name", translation: "nombre", example: "What is your name?" },
    { id: "a1h-4", term: "nice to meet you", translation: "mucho gusto", example: "Nice to meet you, Tom." },
    { id: "a1h-5", term: "please", translation: "por favor", example: "A coffee, please." },
    { id: "a1h-6", term: "thank you", translation: "gracias", example: "Thank you very much!" },
    { id: "a1h-7", term: "country", translation: "pais", example: "What country are you from?" },
    { id: "a1h-8", term: "friend", translation: "amigo/a", example: "This is my friend, Sara." },
    { id: "a1h-9", term: "teacher", translation: "profesor/a", example: "She is my English teacher." },
    { id: "a1h-10", term: "student", translation: "estudiante", example: "I am a student." },
  ],

  lessons: [
    // ---------------- APRENDE ----------------
    {
      id: "a1h-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: saludos y presentaciones",
      intro:
        "Primero, aprende. Lee la historia, estudia el vocabulario y las frases clave. " +
        "Aqui no hay que responder nada; esto es lo que practicaras despues.",
      teachesVocab: true,
      content: {
        reading:
          "Hi! My name is Ana. I am from Mexico. I am a student. This is my friend, Tom. " +
          "He is from Canada. He is a teacher. Nice to meet you! We are happy to learn English. " +
          "Hello and welcome!",
        glossary: [
          { term: "my name is", translation: "mi nombre es / me llamo" },
          { term: "I am from", translation: "soy de" },
          { term: "this is", translation: "este/esta es" },
          { term: "he is / she is", translation: "el es / ella es" },
          { term: "we are", translation: "nosotros somos" },
          { term: "welcome", translation: "bienvenido/a" },
        ],
        keyPhrases: [
          "Hello, my name is... (Hola, me llamo...)",
          "I am from... (Soy de...)",
          "What is your name? (Como te llamas?)",
          "Nice to meet you. (Mucho gusto.)",
        ],
        note:
          "El verbo 'to be' (ser/estar) tiene 3 formas en presente: I am, you/we/they are, " +
          "he/she/it is. Casi siempre se contrae: I'm, you're, he's, she's.",
        grammar: {
          title: "El verbo 'to be' (presente)",
          form: "I am / you are / he-she-it is / we-they are",
          examples: [
            "I am a student.",
            "She is from Canada.",
            "We are friends.",
          ],
          mistakes: [
            { wrong: "I is from Mexico.", right: "I am from Mexico." },
            { wrong: "He are a teacher.", right: "He is a teacher." },
          ],
        },
        check: [
          { prompt: "Where is Ana from?", choices: ["Canada", "Mexico", "Spain"], answer: 1 },
          { prompt: "What is Tom's job?", choices: ["Student", "Teacher", "Doctor"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ---------------- PRESENTACION ----------------
    {
      id: "a1h-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: preguntar y responder",
      intro:
        "Para conocer a alguien usamos preguntas simples con 'to be': " +
        "'What's your name?', 'Where are you from?'. Lee el dialogo.",
      dialogue: [
        "A: Hello! What's your name?",
        "B: Hi! My name is Sara. And you?",
        "A: I'm Leo. Nice to meet you. Where are you from?",
        "B: I'm from Brazil. Nice to meet you too!",
      ],
      activities: [
        {
          id: "a1h-l1-a1", type: "multiple_choice",
          prompt: "How do you ask someone's name?",
          payload: { choices: ["What's your name?", "How old the name?", "Where name you?"], answer: 0 },
          explain: "'What's your name?' = Como te llamas? Es la pregunta estandar.",
        },
        {
          id: "a1h-l1-a2", type: "matching",
          prompt: "Empareja el saludo con su significado:",
          payload: { pairs: [
            { left: "Hello", right: "Hola" },
            { left: "Goodbye", right: "Adios" },
            { left: "Thank you", right: "Gracias" },
          ] },
        },
      ],
    },

    // ---------------- PRACTICA ----------------
    {
      id: "a1h-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: el verbo 'to be'",
      intro: "Ahora usa lo aprendido. Completa, elige y ordena.",
      activities: [
        {
          id: "a1h-l2-a1", type: "cloze",
          prompt: "Completa: 'I ___ a student.' (soy)",
          payload: { answer: "am" },
          explain: "Con 'I' siempre usamos 'am': I am / I'm.",
        },
        {
          id: "a1h-l2-a2", type: "cloze",
          prompt: "Completa: 'She ___ from Canada.' (es)",
          payload: { answer: "is" },
          explain: "Con he/she/it usamos 'is': She is / She's.",
        },
        {
          id: "a1h-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "We is friends.",
            "We are friends.",
            "We am friends.",
          ], answer: 1 },
          explain: "Con we/you/they usamos 'are': We are friends.",
        },
        {
          id: "a1h-l2-a4", type: "word_bank",
          prompt: "Ordena para presentarte:",
          payload: { words: ["name", "My", "Ana", "is"], answer: ["My", "name", "is", "Ana"] },
          explain: "Orden: My + name + is + (tu nombre).",
        },
        {
          id: "a1h-l2-a5", type: "cloze",
          prompt: "Completa el saludo: 'Nice to ___ you.' (conocer)",
          payload: { answer: "meet" },
          explain: "'Nice to meet you' = Mucho gusto (al conocer a alguien).",
        },
      ],
    },

    // ---------------- PRODUCCION ----------------
    {
      id: "a1h-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: preséntate",
      intro:
        "Tarea real: construye las frases para presentarte a alguien nuevo. " +
        "Ordena cada frase correctamente.",
      activities: [
        {
          id: "a1h-l3-a1", type: "word_bank",
          prompt: "Saluda y di tu nombre:",
          payload: { words: ["I'm", "Hello,", "Leo"], answer: ["Hello,", "I'm", "Leo"] },
        },
        {
          id: "a1h-l3-a2", type: "word_bank",
          prompt: "Di de donde eres:",
          payload: { words: ["from", "I'm", "Mexico"], answer: ["I'm", "from", "Mexico"] },
        },
        {
          id: "a1h-l3-a3", type: "word_bank",
          prompt: "Pregunta el nombre de la otra persona:",
          payload: { words: ["your", "What's", "name?"], answer: ["What's", "your", "name?"] },
        },
        {
          id: "a1h-l3-a4", type: "multiple_choice",
          prompt: "Best way to say goodbye:",
          payload: { choices: ["Hello!", "Goodbye, see you!", "My name is."], answer: 1 },
        },
      ],
    },
  ],
};
