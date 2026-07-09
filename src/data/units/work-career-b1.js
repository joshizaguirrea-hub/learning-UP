/**
 * data/units/work-career-b1.js — Unidad tematica "Work & Career" (B1).
 *
 * Datos PUROS. Contenido de curso profesional siguiendo el ciclo PPP
 * (Presentacion -> Practica -> Produccion) con actividades variadas y
 * vocabulario que alimenta el SRS. Ver docs/PEDAGOGIA.md.
 *
 * Este archivo es el "estandar de calidad": nuevas unidades copian su forma.
 */

export const WORK_CAREER_B1 = {
  id: "work-career-b1",
  language: "en",
  level: "B1",
  title: "Work & Career",
  subtitle: "Hablar de tu trabajo, experiencia y planes profesionales",

  // Objetivos "can-do" (MCER): que podras HACER al terminar.
  cando: [
    "Puedo describir mi trabajo y mis responsabilidades.",
    "Puedo hablar de mi experiencia laboral pasada.",
    "Puedo escribir un correo profesional sencillo.",
    "Puedo hablar de mis planes y metas de carrera.",
  ],

  // Vocabulario clave -> entra al SRS al completar la leccion de presentacion.
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
    // ---------------- PRESENTACION ----------------
    {
      id: "wc-l1",
      order: 1,
      phase: "present",
      title: "Presentacion: hablar de tu trabajo",
      intro:
        "En el trabajo usamos frases como 'I'm in charge of...', 'I work with my colleagues on...'. " +
        "Lee el dialogo y aprende el vocabulario clave (luego lo repasaras con tarjetas).",
      dialogue: [
        "A: What do you do?",
        "B: I'm a project manager. I'm in charge of a small team.",
        "A: Sounds busy! Do you have many meetings?",
        "B: Yes, and tight deadlines too. But I like the challenge.",
      ],
      teachesVocab: true, // al completar, crea las tarjetas SRS del vocab de la unidad
      activities: [
        {
          id: "wc-l1-a1", type: "multiple_choice",
          prompt: "'I'm in charge of the team' means:",
          payload: { choices: ["I lead the team", "I left the team", "I joined today"], answer: 0 },
        },
        {
          id: "wc-l1-a2", type: "matching",
          prompt: "Empareja cada palabra con su significado:",
          payload: { pairs: [
            { left: "deadline", right: "fecha limite" },
            { left: "colleague", right: "companero de trabajo" },
            { left: "salary", right: "sueldo" },
          ] },
        },
      ],
    },

    // ---------------- PRACTICA ----------------
    {
      id: "wc-l2",
      order: 2,
      phase: "practice",
      title: "Practica: vocabulario y estructuras",
      intro: "Ahora usa el vocabulario en contexto. Escribe, ordena y elige.",
      activities: [
        {
          id: "wc-l2-a1", type: "cloze",
          prompt: "Completa: 'The ___ for the project is next Monday.' (fecha limite)",
          payload: { answer: "deadline" },
        },
        {
          id: "wc-l2-a2", type: "cloze",
          prompt: "Completa: 'I want to ___ for a new job.' (postular)",
          payload: { answer: "apply", alt: ["apply for"] },
        },
        {
          id: "wc-l2-a3", type: "word_bank",
          prompt: "Ordena las palabras para formar la frase:",
          payload: { words: ["charge", "I'm", "of", "in", "sales"], answer: ["I'm", "in", "charge", "of", "sales"] },
        },
        {
          id: "wc-l2-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "She have five years of experience.",
            "She has five years of experience.",
            "She having five years experience.",
          ], answer: 1 },
        },
        {
          id: "wc-l2-a5", type: "cloze",
          prompt: "Completa: 'He got a ___ and now he is a manager.' (ascenso)",
          payload: { answer: "promotion" },
        },
      ],
    },

    // ---------------- PRODUCCION (tarea real, TBL) ----------------
    {
      id: "wc-l3",
      order: 3,
      phase: "produce",
      title: "Produccion: tu correo profesional",
      intro:
        "Tarea real: vas a construir las frases clave de un correo para postular a un trabajo. " +
        "Ordena cada frase correctamente.",
      activities: [
        {
          id: "wc-l3-a1", type: "word_bank",
          prompt: "Saludo formal:",
          payload: { words: ["Dear", "Team", "Hiring"], answer: ["Dear", "Hiring", "Team"] },
        },
        {
          id: "wc-l3-a2", type: "word_bank",
          prompt: "Di por que escribes:",
          payload: { words: ["to", "apply", "I'm", "writing", "for", "the", "position"],
                     answer: ["I'm", "writing", "to", "apply", "for", "the", "position"] },
        },
        {
          id: "wc-l3-a3", type: "word_bank",
          prompt: "Menciona tu experiencia:",
          payload: { words: ["years", "I", "have", "of", "three", "experience"],
                     answer: ["I", "have", "three", "years", "of", "experience"] },
        },
        {
          id: "wc-l3-a4", type: "multiple_choice",
          prompt: "Best formal closing:",
          payload: { choices: ["See ya!", "Best regards,", "Bye bye"], answer: 1 },
        },
      ],
    },
  ],
};
