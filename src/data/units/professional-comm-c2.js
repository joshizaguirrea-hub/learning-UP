/**
 * data/units/professional-comm-c2.js — Unidad tematica "Professional communication" (C2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: lenguaje diplomatico/formal.
 */

export const PROFESSIONAL_COMM_C2 = {
  id: "professional-comm-c2",
  language: "en",
  level: "C2",
  title: "Professional communication",
  subtitle: "Comunicar en el trabajo con diplomacia y formalidad",

  cando: [
    "Puedo comunicarme con maximo profesionalismo.",
    "Puedo usar peticiones y sugerencias diplomaticas.",
    "Puedo suavizar malas noticias y quejas con tacto.",
    "Puedo escribir correos formales impecables.",
  ],

  vocab: [
    { id: "c2pc-1", term: "to request", translation: "solicitar", example: "I would like to request a meeting." },
    { id: "c2pc-2", term: "in advance", translation: "por adelantado", example: "Thank you in advance." },
    { id: "c2pc-3", term: "at your earliest convenience", translation: "a la brevedad posible", example: "Reply at your earliest convenience." },
    { id: "c2pc-4", term: "to apologise", translation: "disculparse", example: "We apologise for the delay." },
    { id: "c2pc-5", term: "to enclose", translation: "adjuntar", example: "Please find enclosed the report." },
    { id: "c2pc-6", term: "regarding", translation: "en relacion con", example: "I am writing regarding your email." },
    { id: "c2pc-7", term: "to appreciate", translation: "agradecer / valorar", example: "I would appreciate your help." },
    { id: "c2pc-8", term: "concern", translation: "inquietud / preocupacion", example: "I have a small concern." },
    { id: "c2pc-9", term: "prompt", translation: "pronto / rapido", example: "Thank you for your prompt reply." },
    { id: "c2pc-10", term: "to clarify", translation: "aclarar", example: "Could you clarify this point?" },
    { id: "c2pc-11", term: "sincerely", translation: "atentamente", example: "Yours sincerely, Ana." },
    { id: "c2pc-12", term: "to follow up", translation: "dar seguimiento", example: "I'm following up on my request." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c2pc-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: un correo impecable",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - A formal email\n" +
          "Dear Mr Lopez, I am writing regarding the delayed shipment. I would appreciate it if you could " +
          "clarify the situation at your earliest convenience. We do apologise for any inconvenience. " +
          "Please find enclosed the updated invoice. I would be grateful for a prompt reply. Thank you in " +
          "advance. Yours sincerely, Ana Ruiz.\n\n" +
          "TEXT 2 - Softening a message\n" +
          "A: Can I just say 'Send it now'? B: In formal contexts, no. Say 'I would appreciate it if you " +
          "could send it soon.' A: And if there's a problem? B: Raise your concern politely: 'I'm afraid " +
          "there may be an issue.' A: I see. B: Always follow up with a polite closing.",
        glossary: [
          { term: "I am writing regarding", translation: "escribo en relacion con" },
          { term: "I would appreciate it if you could", translation: "agradeceria que pudiera" },
          { term: "at your earliest convenience", translation: "a la brevedad posible" },
          { term: "Please find enclosed", translation: "adjunto encontrara" },
          { term: "prompt reply / in advance", translation: "respuesta pronta / por adelantado" },
          { term: "to apologise / concern", translation: "disculparse / inquietud" },
          { term: "to clarify / to follow up", translation: "aclarar / dar seguimiento" },
          { term: "Yours sincerely", translation: "atentamente" },
        ],
        keyPhrases: [
          "Fijate en el lenguaje diplomatico: I would appreciate it if..., at your earliest convenience.",
          "Las peticiones formales son indirectas y corteses.",
        ],
        check: [
          { prompt: "T1: What is the email about?", choices: ["A delayed shipment", "A party", "A holiday"], answer: 0 },
          { prompt: "T1: What is enclosed?", choices: ["The updated invoice", "A photo", "A gift"], answer: 0 },
          { prompt: "T1: How does Ana sign off?", choices: ["Yours sincerely", "Cheers", "See ya"], answer: 0 },
          { prompt: "T2: Is 'Send it now' formal?", choices: ["No", "Yes", "Very"], answer: 0 },
          { prompt: "T2: How do you raise a problem?", choices: ["Politely", "Angrily", "Loudly"], answer: 0 },
          { prompt: "T2: What should you end with?", choices: ["A polite closing", "A demand", "Nothing"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c2pc-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: comunicacion profesional",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "to request / to clarify", translation: "solicitar / aclarar" },
        { term: "to apologise / to appreciate", translation: "disculparse / agradecer" },
        { term: "to enclose / to follow up", translation: "adjuntar / dar seguimiento" },
        { term: "regarding / in advance", translation: "en relacion con / por adelantado" },
        { term: "prompt / concern", translation: "pronto / inquietud" },
        { term: "sincerely / at your earliest convenience", translation: "atentamente / a la brevedad" },
      ],
      activities: [
        {
          id: "c2pc-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "to request", right: "solicitar" },
            { left: "to clarify", right: "aclarar" },
            { left: "to apologise", right: "disculparse" },
            { left: "concern", right: "inquietud" },
          ] },
        },
        {
          id: "c2pc-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to enclose", right: "adjuntar" },
            { left: "to follow up", right: "dar seguimiento" },
            { left: "prompt", right: "pronto" },
            { left: "sincerely", right: "atentamente" },
          ] },
        },
        {
          id: "c2pc-vocab-a3", type: "cloze",
          prompt: "Completa: 'I am writing ___ your email.' (en relacion con)",
          payload: { answer: "regarding" },
          explain: "'Regarding' = en relacion con.",
        },
        {
          id: "c2pc-vocab-a4", type: "cloze",
          prompt: "Completa: 'Thank you in ___.' (por adelantado)",
          payload: { answer: "advance" },
          explain: "'In advance' = por adelantado.",
        },
        {
          id: "c2pc-vocab-a5", type: "cloze",
          prompt: "Completa: 'Could you ___ this point?' (aclarar)",
          payload: { answer: "clarify" },
          explain: "'To clarify' = aclarar.",
        },
        {
          id: "c2pc-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'agradecer/valorar'?",
          payload: { choices: ["to appreciate", "to request", "to enclose"], answer: 0 },
          explain: "'To appreciate' = agradecer / valorar.",
        },
        {
          id: "c2pc-vocab-a7", type: "multiple_choice",
          prompt: "Which is a formal closing?",
          payload: { choices: ["Yours sincerely", "Later!", "Bye"], answer: 0 },
          explain: "'Yours sincerely' = atentamente.",
        },
        {
          id: "c2pc-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["the", "for", "delay", "We", "apologise"], answer: ["We", "apologise", "for", "the", "delay"] },
          explain: "'We apologise for the delay' = disculpe la demora.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c2pc-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: peticiones diplomaticas",
      intro: "Competencia de GRAMATICA. Aprende a hacer peticiones formales e indirectas.",
      grammar: {
        title: "Diplomatic / formal requests",
        form: "I would appreciate it if you could + base · Would you mind + -ing · I was wondering if you could + base",
        desc: "Sirve para pedir cosas de forma formal y cort\u00e9s en el trabajo.",
        rule: "F\u00f3rmulas corteses: 'I would appreciate it if you could + base', 'Would you mind + verbo-ing', 'I was wondering if you could + base'. Cuanto m\u00e1s indirecta la petici\u00f3n, m\u00e1s formal y amable suena.",
        examples: ["I would appreciate it if you could reply.", "Would you mind sending it?", "I was wondering if you could help."],
        explain: { tr: ["Le agradecer\u00eda si pudiera responder.", "\u00bfLe importar\u00eda enviarlo?", "Me preguntaba si podr\u00eda ayudar."] },
        mistakes: [
          { wrong: "I would appreciate if you can reply.", right: "I would appreciate it if you could reply." },
          { wrong: "Would you mind to send it?", right: "Would you mind sending it?" },
        ],
      },
      activities: [
        {
          id: "c2pc-gram-a1", type: "cloze",
          prompt: "Completa: 'I would appreciate it ___ you could reply.' (conjuncion)",
          payload: { answer: "if" },
          explain: "'I would appreciate it if you could + base'.",
        },
        {
          id: "c2pc-gram-a2", type: "cloze",
          prompt: "Completa: 'Would you mind ___ it?' (send -> -ing)",
          payload: { answer: "sending" },
          explain: "'Would you mind + verbo-ing'.",
        },
        {
          id: "c2pc-gram-a3", type: "multiple_choice",
          prompt: "Choose the most polite/formal request:",
          payload: { choices: ["Send me the file.", "I was wondering if you could send me the file.", "Give me the file now."], answer: 1 },
          explain: "'I was wondering if you could...' es muy cortes.",
        },
        {
          id: "c2pc-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct one:",
          payload: { choices: ["Would you mind to help?", "Would you mind helping?", "Would you mind help?"], answer: 1 },
          explain: "'Would you mind + -ing'.",
        },
        {
          id: "c2pc-gram-a5", type: "cloze",
          prompt: "Completa: 'I was ___ if you could clarify this.' (wonder -> -ing)",
          payload: { answer: "wondering" },
          explain: "'I was wondering if you could + base'.",
        },
        {
          id: "c2pc-gram-a6", type: "word_bank",
          prompt: "Ordena la peticion:",
          payload: { words: ["mind", "Would", "helping?", "you"], answer: ["Would", "you", "mind", "helping?"] },
          explain: "Would + you + mind + helping?",
        },
        {
          id: "c2pc-gram-a7", type: "word_bank",
          prompt: "Ordena la peticion formal:",
          payload: { words: ["reply", "if", "could", "appreciate", "I'd", "it", "you"], answer: ["I'd", "appreciate", "it", "if", "you", "could", "reply"] },
          explain: "I'd + appreciate + it + if + you + could + reply.",
        },
        {
          id: "c2pc-gram-a8", type: "multiple_choice",
          prompt: "Which sounds most professional?",
          payload: { choices: ["Reply now.", "Reply at your earliest convenience.", "Reply, ok?"], answer: 1 },
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c2pc-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: correo formal impecable",
      intro: "Competencia de ESCRITURA. Construye un correo profesional, frase por frase.",
      activities: [
        {
          id: "c2pc-write-a1", type: "word_bank",
          prompt: "1. Abre diciendo el motivo:",
          payload: { words: ["regarding", "I'm", "email", "writing", "your"], answer: ["I'm", "writing", "regarding", "your", "email"] },
        },
        {
          id: "c2pc-write-a2", type: "word_bank",
          prompt: "2. Haz una peticion formal:",
          payload: { words: ["reply", "if", "could", "appreciate", "I'd", "it", "you"], answer: ["I'd", "appreciate", "it", "if", "you", "could", "reply"] },
        },
        {
          id: "c2pc-write-a3", type: "word_bank",
          prompt: "3. Discúlpate por la demora:",
          payload: { words: ["the", "for", "delay", "We", "apologise"], answer: ["We", "apologise", "for", "the", "delay"] },
        },
        {
          id: "c2pc-write-a4", type: "word_bank",
          prompt: "4. Agradece por adelantado:",
          payload: { words: ["advance", "Thank", "in", "you"], answer: ["Thank", "you", "in", "advance"] },
        },
        {
          id: "c2pc-write-a5", type: "word_bank",
          prompt: "5. Cierra formalmente:",
          payload: { words: ["sincerely,", "Yours", "Ana"], answer: ["Yours", "sincerely,", "Ana"] },
        },
        {
          id: "c2pc-write-a6", type: "multiple_choice",
          prompt: "6. Which sounds most professional?",
          payload: { choices: ["Reply now.", "Reply at your earliest convenience.", "Reply, ok?"], answer: 1 },
        },
        {
          id: "c2pc-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["Would you mind to send it?", "Would you mind sending it?", "Would you mind send it?"], answer: 1 },
        },
        {
          id: "c2pc-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'dar seguimiento'?",
          payload: { choices: ["to follow up", "to enclose", "to clarify"], answer: 0 },
        },
      ],
    },
  ],
};
