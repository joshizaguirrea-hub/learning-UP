/**
 * data/units/work-career-b1.js — Unidad tematica "Work & Career" (B1).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA: cada leccion entrena UNA
 * sola competencia con contenido UNICO, para que el progreso por competencia
 * (Reading, Vocabulary, Grammar, Writing) sea independiente y real.
 * Listening/Speaking llegan con audio/IA. Ver docs/PLAN-DE-ESTUDIO.md.
 *
 * Este archivo es el "estandar de calidad": nuevas unidades copian su forma.
 */

export const WORK_CAREER_B1 = {
  id: "work-career-b1",
  language: "en",
  level: "B1",
  title: "Work & Career",
  subtitle: "Hablar de tu trabajo, experiencia y planes profesionales",

  cando: [
    "Puedo describir mi trabajo y mis responsabilidades.",
    "Puedo hablar de mi experiencia laboral pasada.",
    "Puedo escribir un correo profesional sencillo.",
    "Puedo hablar de mis planes y metas de carrera.",
  ],

  // Vocabulario clave -> entra al SRS al completar la leccion de vocabulario.
  vocab: [
    { id: "wc-1", term: "colleague", translation: "colega / companero de trabajo", example: "My colleague helped me finish the report." },
    { id: "wc-2", term: "deadline", translation: "fecha limite", example: "The deadline is next Friday." },
    { id: "wc-3", term: "meeting", translation: "reunion", example: "We have a meeting at 10 a.m." },
    { id: "wc-4", term: "skill", translation: "habilidad", example: "Communication is an important skill." },
    { id: "wc-5", term: "to apply (for)", translation: "postular / aplicar (a)", example: "I want to apply for the manager position." },
    { id: "wc-6", term: "experience", translation: "experiencia", example: "She has five years of experience." },
    { id: "wc-7", term: "salary", translation: "salario / sueldo", example: "They offered a good salary." },
    { id: "wc-8", term: "to be in charge of", translation: "estar a cargo de", example: "I'm in charge of the sales team." },
    { id: "wc-9", term: "promotion", translation: "ascenso", example: "He got a promotion last month." },
    { id: "wc-10", term: "task", translation: "tarea", example: "My first task is to check emails." },
  ],

  lessons: [
    // ================= READING (comprension) =================
    {
      id: "wc-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: el mundo del trabajo",
      intro:
        "Competencia de LECTURA. Lee la historia de Laura y comprueba que entendiste. " +
        "Aqui te enfocas en entender un texto real de nivel B1.",
      content: {
        reading:
          "Meet Laura. She is a project manager at a tech company. She is in charge of a " +
          "small team of five people. Every morning she has a meeting with her colleagues to " +
          "talk about their tasks and deadlines. Laura has eight years of experience. Last month " +
          "she got a promotion, so now she also helps to hire new staff. She enjoys her job, but " +
          "she says the deadlines can be stressful. Next year she wants to apply for a director role.",
        keyPhrases: [
          "Skim primero: busca la idea general antes de los detalles.",
          "Deduce por contexto: 'to hire' aparece cerca de 'new staff'.",
          "Localiza datos: cuantos anos de experiencia? que consiguio?",
        ],
        check: [
          { prompt: "What is Laura in charge of?", choices: ["A small team", "The whole company", "The kitchen"], answer: 0 },
          { prompt: "What did Laura get last month?", choices: ["A raise only", "A promotion", "A new office"], answer: 1 },
          { prompt: "How many years of experience does Laura have?", choices: ["Five", "Eight", "Ten"], answer: 1 },
          { prompt: "What does Laura want to do next year?", choices: ["Change company", "Apply for a director role", "Stop working"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY (contenido propio + SRS) =================
    {
      id: "wc-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: palabras del trabajo",
      intro:
        "Competencia de VOCABULARIO. Estudia el glosario y practica las palabras clave. " +
        "Al terminar, estas palabras entran a tu repaso diario (SRS).",
      teachesVocab: true,
      glossary: [
        { term: "colleague", translation: "companero de trabajo" },
        { term: "deadline", translation: "fecha limite" },
        { term: "to be in charge of", translation: "estar a cargo de" },
        { term: "experience", translation: "experiencia" },
        { term: "to apply for", translation: "postular a" },
        { term: "promotion", translation: "ascenso" },
        { term: "salary", translation: "sueldo" },
        { term: "task", translation: "tarea" },
      ],
      activities: [
        {
          id: "wc-vocab-a1", type: "matching",
          prompt: "Empareja cada palabra con su significado:",
          payload: { pairs: [
            { left: "deadline", right: "fecha limite" },
            { left: "colleague", right: "companero de trabajo" },
            { left: "salary", right: "sueldo" },
            { left: "promotion", right: "ascenso" },
          ] },
        },
        {
          id: "wc-vocab-a2", type: "cloze",
          prompt: "Completa: 'The ___ for the project is next Monday.' (fecha limite)",
          payload: { answer: "deadline" },
          explain: "'Deadline' es la fecha limite para entregar algo.",
        },
        {
          id: "wc-vocab-a3", type: "cloze",
          prompt: "Completa: 'I want to ___ for a new job.' (postular)",
          payload: { answer: "apply", alt: ["apply for"] },
          explain: "'To apply for a job' = postular a un empleo. Casi siempre va con 'for'.",
        },
        {
          id: "wc-vocab-a4", type: "multiple_choice",
          prompt: "Which word means 'ascenso'?",
          payload: { choices: ["salary", "promotion", "meeting"], answer: 1 },
          explain: "'Promotion' = ascenso (subir de puesto).",
        },
      ],
    },

    // ================= GRAMMAR (contenido propio) =================
    {
      id: "wc-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: responsabilidades",
      intro:
        "Competencia de GRAMATICA. Aprende a describir responsabilidades y practica la estructura.",
      grammar: {
        title: "Hablar de responsabilidades",
        form: "subject + be + in charge of / responsible for + (noun | -ing)",
        examples: [
          "I'm in charge of the sales team.",
          "She is responsible for hiring new staff.",
        ],
        mistakes: [
          { wrong: "I'm in charge the team.", right: "I'm in charge of the team." },
          { wrong: "He is responsible of sales.", right: "He is responsible for sales." },
        ],
      },
      activities: [
        {
          id: "wc-gram-a1", type: "multiple_choice",
          prompt: "'I'm in charge of the team' means:",
          payload: { choices: ["I lead the team", "I left the team", "I joined today"], answer: 0 },
          explain: "'To be in charge of' = estar a cargo de / liderar.",
        },
        {
          id: "wc-gram-a2", type: "word_bank",
          prompt: "Ordena las palabras para formar la frase:",
          payload: { words: ["charge", "I'm", "of", "in", "sales"], answer: ["I'm", "in", "charge", "of", "sales"] },
          explain: "Orden fijo: 'in charge of' + area. 'I'm in charge of sales.'",
        },
        {
          id: "wc-gram-a3", type: "cloze",
          prompt: "Completa: 'She is responsible ___ hiring new staff.' (preposicion)",
          payload: { answer: "for" },
          explain: "'responsible for' + area o actividad. Ojo: NO 'responsible of'.",
        },
        {
          id: "wc-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "She have five years of experience.",
            "She has five years of experience.",
            "She having five years experience.",
          ], answer: 1 },
          explain: "Con 'she/he/it' el verbo lleva -s: 'She has'.",
        },
      ],
    },

    // ================= WRITING (produccion, tarea real) =================
    {
      id: "wc-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: tu correo profesional",
      intro:
        "Competencia de ESCRITURA. Tarea real: construye las frases clave de un correo para " +
        "postular a un trabajo. Ordena cada frase correctamente.",
      activities: [
        {
          id: "wc-write-a1", type: "word_bank",
          prompt: "Saludo formal:",
          payload: { words: ["Dear", "Team", "Hiring"], answer: ["Dear", "Hiring", "Team"] },
        },
        {
          id: "wc-write-a2", type: "word_bank",
          prompt: "Di por que escribes:",
          payload: { words: ["to", "apply", "I'm", "writing", "for", "the", "position"],
                     answer: ["I'm", "writing", "to", "apply", "for", "the", "position"] },
        },
        {
          id: "wc-write-a3", type: "word_bank",
          prompt: "Menciona tu experiencia:",
          payload: { words: ["years", "I", "have", "of", "three", "experience"],
                     answer: ["I", "have", "three", "years", "of", "experience"] },
        },
        {
          id: "wc-write-a4", type: "multiple_choice",
          prompt: "Best formal closing:",
          payload: { choices: ["See ya!", "Best regards,", "Bye bye"], answer: 1 },
        },
      ],
    },
  ],
};
