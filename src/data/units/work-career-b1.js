/**
 * data/units/work-career-b1.js — Unidad tematica "Work & Career" (B1).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA + CONTENIDO ENRIQUECIDO:
 * cada leccion entrena UNA competencia con contenido UNICO y ABUNDANTE
 * (lecturas mas largas, glosarios grandes, mas ejercicios, escritura guiada).
 * Este archivo es el "estandar de calidad enriquecido": las demas unidades
 * copiaran esta densidad. Listening/Speaking llegan con audio/IA.
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
    { id: "wc-11", term: "to hire", translation: "contratar", example: "They want to hire two engineers." },
    { id: "wc-12", term: "staff", translation: "personal / plantilla", example: "The staff is very friendly." },
  ],

  lessons: [
    // ================= READING (comprension, contenido rico) =================
    {
      id: "wc-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: el mundo del trabajo",
      intro:
        "Competencia de LECTURA. Lee DOS textos (una historia y un anuncio de empleo) y responde " +
        "las preguntas de comprension. Aqui entrenas solo la lectura.",
      content: {
        reading:
          "TEXT 1 - Laura's job\n" +
          "Meet Laura. She is a project manager at a tech company. She is in charge of a small team of " +
          "five people. Every morning she has a meeting with her colleagues to talk about their tasks " +
          "and deadlines. Laura has eight years of experience. Last month she got a promotion, so now " +
          "she also helps to hire new staff. She enjoys her job, but she says the deadlines can be " +
          "stressful. Next year she wants to apply for a director role.\n\n" +
          "TEXT 2 - Job advert\n" +
          "SALES ASSISTANT WANTED. We are looking for a friendly person to join our team. Experience is " +
          "useful but not necessary. Good communication skills are essential. The salary is competitive, " +
          "and there are real opportunities for promotion. To apply, send your CV before Friday. We hope " +
          "to hire the right person as soon as possible.",
        glossary: [
          { term: "in charge of", translation: "a cargo de" },
          { term: "colleagues", translation: "companeros de trabajo" },
          { term: "tasks / deadlines", translation: "tareas / fechas limite" },
          { term: "experience", translation: "experiencia" },
          { term: "promotion", translation: "ascenso" },
          { term: "to hire / staff", translation: "contratar / personal" },
          { term: "essential", translation: "esencial / imprescindible" },
          { term: "competitive salary", translation: "sueldo competitivo" },
        ],
        keyPhrases: [
          "Skim primero: capta la idea general de cada texto antes de los detalles.",
          "Scan despues: busca datos concretos (anos de experiencia, dia limite).",
          "Deduce por contexto: 'to hire' aparece junto a 'new staff' / 'the right person'.",
        ],
        check: [
          { prompt: "T1: What is Laura in charge of?", choices: ["A small team", "The whole company", "The kitchen"], answer: 0 },
          { prompt: "T1: What did Laura get last month?", choices: ["A raise only", "A promotion", "A new office"], answer: 1 },
          { prompt: "T1: How many years of experience does Laura have?", choices: ["Five", "Eight", "Ten"], answer: 1 },
          { prompt: "T2: Is experience necessary for the job?", choices: ["Yes, essential", "Useful but not necessary", "Not allowed"], answer: 1 },
          { prompt: "T2: What skill is essential?", choices: ["Cooking", "Communication", "Driving"], answer: 1 },
          { prompt: "T2: When should you apply?", choices: ["Before Friday", "Next month", "Anytime"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY (glosario grande + 8 ejercicios) =================
    {
      id: "wc-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: palabras del trabajo",
      intro:
        "Competencia de VOCABULARIO. Estudia el glosario y practica con varios tipos de ejercicio. " +
        "Al terminar, estas palabras entran a tu repaso diario (SRS).",
      teachesVocab: true,
      glossary: [
        { term: "colleague", translation: "companero de trabajo" },
        { term: "deadline", translation: "fecha limite" },
        { term: "meeting", translation: "reunion" },
        { term: "to be in charge of", translation: "estar a cargo de" },
        { term: "experience", translation: "experiencia" },
        { term: "to apply for", translation: "postular a" },
        { term: "promotion", translation: "ascenso" },
        { term: "salary", translation: "sueldo" },
        { term: "task", translation: "tarea" },
        { term: "to hire", translation: "contratar" },
        { term: "staff", translation: "personal" },
        { term: "skill", translation: "habilidad" },
      ],
      activities: [
        {
          id: "wc-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "deadline", right: "fecha limite" },
            { left: "colleague", right: "companero de trabajo" },
            { left: "salary", right: "sueldo" },
            { left: "promotion", right: "ascenso" },
          ] },
        },
        {
          id: "wc-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to hire", right: "contratar" },
            { left: "staff", right: "personal" },
            { left: "task", right: "tarea" },
            { left: "skill", right: "habilidad" },
          ] },
        },
        {
          id: "wc-vocab-a3", type: "cloze",
          prompt: "Completa: 'The ___ for the project is next Monday.' (fecha limite)",
          payload: { answer: "deadline" },
          explain: "'Deadline' = fecha limite para entregar algo.",
        },
        {
          id: "wc-vocab-a4", type: "cloze",
          prompt: "Completa: 'I want to ___ for a new job.' (postular)",
          payload: { answer: "apply", alt: ["apply for"] },
          explain: "'To apply for a job' = postular a un empleo.",
        },
        {
          id: "wc-vocab-a5", type: "cloze",
          prompt: "Completa: 'They want to ___ two new engineers.' (contratar)",
          payload: { answer: "hire" },
          explain: "'To hire' = contratar.",
        },
        {
          id: "wc-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'ascenso'?",
          payload: { choices: ["salary", "promotion", "meeting"], answer: 1 },
          explain: "'Promotion' = ascenso (subir de puesto).",
        },
        {
          id: "wc-vocab-a7", type: "multiple_choice",
          prompt: "Your 'colleagues' are your...",
          payload: { choices: ["family members", "co-workers", "customers"], answer: 1 },
          explain: "'Colleague' = companero de trabajo.",
        },
        {
          id: "wc-vocab-a8", type: "word_bank",
          prompt: "Ordena: usa 'in charge of':",
          payload: { words: ["charge", "I'm", "of", "in", "the", "staff"], answer: ["I'm", "in", "charge", "of", "the", "staff"] },
          explain: "'in charge of' + area/personas.",
        },
      ],
    },

    // ================= GRAMMAR (explicacion amplia + 8 ejercicios) =================
    {
      id: "wc-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: responsabilidades y experiencia",
      intro:
        "Competencia de GRAMATICA. Aprende a describir responsabilidades y experiencia, y practicalo " +
        "con varios ejercicios.",
      grammar: {
        title: "in charge of / responsible for + have experience",
        form: "be + in charge of / responsible for + (noun | -ing) · have + X years of experience (in/with)",
        examples: [
          "I'm in charge of the sales team.",
          "She is responsible for hiring new staff.",
          "I have five years of experience in marketing.",
        ],
        mistakes: [
          { wrong: "I'm in charge the team.", right: "I'm in charge of the team." },
          { wrong: "He is responsible of sales.", right: "He is responsible for sales." },
          { wrong: "I have experience of five years.", right: "I have five years of experience." },
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
          id: "wc-gram-a2", type: "cloze",
          prompt: "Completa: 'She is responsible ___ hiring new staff.' (preposicion)",
          payload: { answer: "for" },
          explain: "'responsible for' + area o actividad.",
        },
        {
          id: "wc-gram-a3", type: "cloze",
          prompt: "Completa: 'I'm in charge ___ the marketing team.' (preposicion)",
          payload: { answer: "of" },
          explain: "'in charge of' lleva 'of'.",
        },
        {
          id: "wc-gram-a4", type: "word_bank",
          prompt: "Ordena: 'in charge of':",
          payload: { words: ["charge", "I'm", "of", "in", "sales"], answer: ["I'm", "in", "charge", "of", "sales"] },
          explain: "Orden fijo: I'm + in charge of + area.",
        },
        {
          id: "wc-gram-a5", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "She have five years of experience.",
            "She has five years of experience.",
            "She having five years experience.",
          ], answer: 1 },
          explain: "Con she/he/it el verbo lleva -s: 'She has'.",
        },
        {
          id: "wc-gram-a6", type: "word_bank",
          prompt: "Ordena la frase de experiencia:",
          payload: { words: ["of", "I", "have", "experience", "three", "years"], answer: ["I", "have", "three", "years", "of", "experience"] },
          explain: "have + X years + of + experience.",
        },
        {
          id: "wc-gram-a7", type: "cloze",
          prompt: "Completa: 'He is responsible for ___ the reports.' (write -> -ing)",
          payload: { answer: "writing" },
          explain: "Tras 'responsible for' + gerundio (-ing).",
        },
        {
          id: "wc-gram-a8", type: "multiple_choice",
          prompt: "Choose the correct one:",
          payload: { choices: [
            "I have experience of five years.",
            "I have five years of experience.",
            "I have five years experience of.",
          ], answer: 1 },
          explain: "Orden natural: five years of experience.",
        },
      ],
    },

    // ================= WRITING (correo profesional guiado, 8 pasos) =================
    {
      id: "wc-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: tu correo profesional completo",
      intro:
        "Competencia de ESCRITURA. Vas a construir un correo COMPLETO para postular a un empleo, " +
        "frase por frase: saludo, motivo, experiencia, responsabilidades, peticion y despedida.",
      activities: [
        {
          id: "wc-write-a1", type: "word_bank",
          prompt: "1. Saludo formal:",
          payload: { words: ["Dear", "Team", "Hiring"], answer: ["Dear", "Hiring", "Team"] },
        },
        {
          id: "wc-write-a2", type: "word_bank",
          prompt: "2. Di por que escribes:",
          payload: { words: ["to", "apply", "I'm", "writing", "for", "the", "position"],
                     answer: ["I'm", "writing", "to", "apply", "for", "the", "position"] },
        },
        {
          id: "wc-write-a3", type: "word_bank",
          prompt: "3. Menciona tu experiencia:",
          payload: { words: ["years", "I", "have", "of", "three", "experience"],
                     answer: ["I", "have", "three", "years", "of", "experience"] },
        },
        {
          id: "wc-write-a4", type: "word_bank",
          prompt: "4. Describe una responsabilidad:",
          payload: { words: ["for", "I", "was", "a", "team", "responsible"],
                     answer: ["I", "was", "responsible", "for", "a", "team"] },
        },
        {
          id: "wc-write-a5", type: "multiple_choice",
          prompt: "5. Best sentence to show a strength:",
          payload: { choices: [
            "I have good communication skills.",
            "I have good communication skill's.",
            "I have goods communication skill.",
          ], answer: 0 },
          explain: "'Skills' en plural, sin apostrofo.",
        },
        {
          id: "wc-write-a6", type: "word_bank",
          prompt: "6. Pide una entrevista:",
          payload: { words: ["like", "I", "an", "interview", "would", "to", "arrange"],
                     answer: ["I", "would", "like", "to", "arrange", "an", "interview"] },
        },
        {
          id: "wc-write-a7", type: "multiple_choice",
          prompt: "7. Best formal closing:",
          payload: { choices: ["See ya!", "Best regards,", "Bye bye"], answer: 1 },
        },
        {
          id: "wc-write-a8", type: "multiple_choice",
          prompt: "8. A professional email should be...",
          payload: { choices: ["clear and polite", "full of slang", "very long and messy"], answer: 0 },
        },
      ],
    },
  ],
};
