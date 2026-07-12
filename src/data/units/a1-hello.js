/**
 * data/units/a1-hello.js — Unidad tematica "Hello!" (A1).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA (ver work-career-b1.js):
 * 1 leccion = 1 competencia, contenido unico. Listening/Speaking con audio/IA.
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
    // ================= READING =================
    {
      id: "a1h-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: saludos y presentaciones",
      intro: "Competencia de LECTURA. Lee la historia y comprueba que entendiste.",
      content: {
        reading:
          "Hi! My name is Ana. I am from Mexico. I am a student. This is my friend, Tom. " +
          "He is from Canada. He is a teacher. Nice to meet you! We are happy to learn English. " +
          "Hello and welcome!",
        keyPhrases: [
          "Busca datos: de donde es Ana? y Tom?",
          "Identifica quien es estudiante y quien profesor.",
        ],
        check: [
          { prompt: "Where is Ana from?", choices: ["Canada", "Mexico", "Spain"], answer: 1 },
          { prompt: "What is Tom's job?", choices: ["Student", "Teacher", "Doctor"], answer: 1 },
          { prompt: "What is Ana's job?", choices: ["Teacher", "Student", "Doctor"], answer: 1 },
          { prompt: "Where is Tom from?", choices: ["Mexico", "Canada", "Brazil"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a1h-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: saludos y personas",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "hello / goodbye", translation: "hola / adios" },
        { term: "nice to meet you", translation: "mucho gusto" },
        { term: "please / thank you", translation: "por favor / gracias" },
        { term: "friend", translation: "amigo/a" },
        { term: "teacher / student", translation: "profesor / estudiante" },
        { term: "country", translation: "pais" },
      ],
      activities: [
        {
          id: "a1h-vocab-a1", type: "matching",
          prompt: "Empareja el saludo con su significado:",
          payload: { pairs: [
            { left: "Hello", right: "Hola" },
            { left: "Goodbye", right: "Adios" },
            { left: "Thank you", right: "Gracias" },
          ] },
        },
        {
          id: "a1h-vocab-a2", type: "cloze",
          prompt: "Completa el saludo: 'Nice to ___ you.' (conocer)",
          payload: { answer: "meet" },
          explain: "'Nice to meet you' = Mucho gusto.",
        },
        {
          id: "a1h-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'profesor/a'?",
          payload: { choices: ["student", "teacher", "friend"], answer: 1 },
          explain: "'Teacher' = profesor/a.",
        },
        {
          id: "a1h-vocab-a4", type: "cloze",
          prompt: "Completa: 'A coffee, ___.' (por favor)",
          payload: { answer: "please" },
          explain: "'Please' = por favor.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a1h-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: el verbo 'to be'",
      intro: "Competencia de GRAMATICA. Aprende el verbo 'to be' y practicalo.",
      grammar: {
        title: "El verbo 'to be' (presente)",
        form: "I am / you are / he-she-it is / we-they are",
        examples: ["I am a student.", "She is from Canada.", "We are friends."],
        mistakes: [
          { wrong: "I is from Mexico.", right: "I am from Mexico." },
          { wrong: "He are a teacher.", right: "He is a teacher." },
        ],
      },
      activities: [
        {
          id: "a1h-gram-a1", type: "cloze",
          prompt: "Completa: 'I ___ a student.' (soy)",
          payload: { answer: "am" },
          explain: "Con 'I' siempre 'am': I am / I'm.",
        },
        {
          id: "a1h-gram-a2", type: "cloze",
          prompt: "Completa: 'She ___ from Canada.' (es)",
          payload: { answer: "is" },
          explain: "Con he/she/it usamos 'is'.",
        },
        {
          id: "a1h-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["We is friends.", "We are friends.", "We am friends."], answer: 1 },
          explain: "Con we/you/they usamos 'are'.",
        },
        {
          id: "a1h-gram-a4", type: "word_bank",
          prompt: "Ordena para presentarte:",
          payload: { words: ["name", "My", "Ana", "is"], answer: ["My", "name", "is", "Ana"] },
          explain: "Orden: My + name + is + (nombre).",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a1h-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: preséntate",
      intro: "Competencia de ESCRITURA. Construye las frases para presentarte. Ordena cada frase.",
      activities: [
        {
          id: "a1h-write-a1", type: "word_bank",
          prompt: "Saluda y di tu nombre:",
          payload: { words: ["I'm", "Hello,", "Leo"], answer: ["Hello,", "I'm", "Leo"] },
        },
        {
          id: "a1h-write-a2", type: "word_bank",
          prompt: "Di de donde eres:",
          payload: { words: ["from", "I'm", "Mexico"], answer: ["I'm", "from", "Mexico"] },
        },
        {
          id: "a1h-write-a3", type: "word_bank",
          prompt: "Pregunta el nombre de la otra persona:",
          payload: { words: ["your", "What's", "name?"], answer: ["What's", "your", "name?"] },
        },
        {
          id: "a1h-write-a4", type: "multiple_choice",
          prompt: "Best way to say goodbye:",
          payload: { choices: ["Hello!", "Goodbye, see you!", "My name is."], answer: 1 },
        },
      ],
    },
  ],
};
