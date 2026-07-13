/**
 * data/units/capstone-c2.js — Unidad tematica "Capstone project" (C2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Repaso integrador de estructuras C2.
 */

export const CAPSTONE_C2 = {
  id: "capstone-c2",
  language: "en",
  level: "C2",
  title: "Capstone project",
  subtitle: "Repaso integrador: junta todo lo aprendido en C2",

  cando: [
    "Puedo combinar inversion, cleft, pasiva y concesion en un texto.",
    "Puedo revisar y pulir mi propia escritura.",
    "Puedo producir un texto de nivel casi nativo.",
    "Puedo demostrar dominio del ingles avanzado.",
  ],

  vocab: [
    { id: "c2cap-1", term: "to master", translation: "dominar", example: "You have mastered the language." },
    { id: "c2cap-2", term: "achievement", translation: "logro", example: "This is a great achievement." },
    { id: "c2cap-3", term: "fluency", translation: "fluidez", example: "Your fluency is excellent." },
    { id: "c2cap-4", term: "to refine", translation: "pulir / refinar", example: "Refine your final draft." },
    { id: "c2cap-5", term: "proficiency", translation: "competencia / dominio", example: "C2 shows high proficiency." },
    { id: "c2cap-6", term: "milestone", translation: "hito", example: "This is a major milestone." },
    { id: "c2cap-7", term: "to demonstrate", translation: "demostrar", example: "Demonstrate your skills." },
    { id: "c2cap-8", term: "confident", translation: "seguro / con confianza", example: "You sound confident now." },
    { id: "c2cap-9", term: "versatile", translation: "versatil", example: "A versatile writer." },
    { id: "c2cap-10", term: "accomplished", translation: "consumado / competente", example: "An accomplished speaker." },
    { id: "c2cap-11", term: "to consolidate", translation: "consolidar", example: "Consolidate what you learned." },
    { id: "c2cap-12", term: "journey", translation: "recorrido / viaje", example: "What a learning journey!" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c2cap-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: el proyecto final",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - A learning journey\n" +
          "Never before had you reached such a level. What you have achieved is remarkable. The skills " +
          "that were once difficult have now been mastered. Admittedly, the journey was long; that said, " +
          "your proficiency is undeniable. It is confidence that makes the difference now. However hard the " +
          "final project seems, you are ready. This milestone consolidates everything you have learned.\n\n" +
          "TEXT 2 - Final advice\n" +
          "A: I'm nervous about the capstone. B: You have mastered the structures. A: Have I really? B: " +
          "Never doubt it. What you need is to refine your draft. A: And if I make mistakes? B: Granted, " +
          "you might, but that said, you'll fix them. You are an accomplished, versatile writer now.",
        glossary: [
          { term: "Never before had you...", translation: "Nunca antes habias... (inversion)" },
          { term: "What you have achieved is...", translation: "Lo que has logrado es... (cleft)" },
          { term: "have now been mastered", translation: "ahora se han dominado (pasiva)" },
          { term: "Admittedly / that said", translation: "hay que admitir / dicho eso" },
          { term: "However hard...", translation: "Por muy dificil que... (concesiva)" },
          { term: "proficiency / fluency", translation: "dominio / fluidez" },
          { term: "milestone / journey", translation: "hito / recorrido" },
          { term: "accomplished / versatile", translation: "consumado / versatil" },
        ],
        keyPhrases: [
          "Este texto junta TODO: inversion, cleft, pasiva, concesion, concesivas.",
          "Identifica cada estructura avanzada mientras lees.",
        ],
        check: [
          { prompt: "T1: What is described as remarkable?", choices: ["What you have achieved", "The weather", "The exam room"], answer: 0 },
          { prompt: "T1: What has now been mastered?", choices: ["The difficult skills", "Nothing", "Only grammar"], answer: 0 },
          { prompt: "T1: What makes the difference now?", choices: ["Confidence", "Luck", "Money"], answer: 0 },
          { prompt: "T2: What has the learner mastered?", choices: ["The structures", "Nothing", "Only vocab"], answer: 0 },
          { prompt: "T2: What does the learner need to do?", choices: ["Refine the draft", "Start over", "Give up"], answer: 0 },
          { prompt: "T2: How is the learner described?", choices: ["Accomplished and versatile", "Lazy", "Beginner"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c2cap-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: dominio y logro",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "to master / proficiency", translation: "dominar / dominio" },
        { term: "achievement / milestone", translation: "logro / hito" },
        { term: "fluency / journey", translation: "fluidez / recorrido" },
        { term: "to refine / to consolidate", translation: "pulir / consolidar" },
        { term: "accomplished / versatile", translation: "consumado / versatil" },
        { term: "to demonstrate / confident", translation: "demostrar / seguro" },
      ],
      activities: [
        {
          id: "c2cap-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "to master", right: "dominar" },
            { left: "achievement", right: "logro" },
            { left: "fluency", right: "fluidez" },
            { left: "milestone", right: "hito" },
          ] },
        },
        {
          id: "c2cap-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to refine", right: "pulir" },
            { left: "to consolidate", right: "consolidar" },
            { left: "versatile", right: "versatil" },
            { left: "journey", right: "recorrido" },
          ] },
        },
        {
          id: "c2cap-vocab-a3", type: "cloze",
          prompt: "Completa: 'You have ___ the language.' (dominar -> participio)",
          payload: { answer: "mastered" },
          explain: "'To master' = dominar; participio: mastered.",
        },
        {
          id: "c2cap-vocab-a4", type: "cloze",
          prompt: "Completa: 'This is a major ___.' (hito)",
          payload: { answer: "milestone" },
          explain: "'Milestone' = hito.",
        },
        {
          id: "c2cap-vocab-a5", type: "cloze",
          prompt: "Completa: '___ your final draft.' (pulir)",
          payload: { answer: "Refine" },
          explain: "'To refine' = pulir / refinar.",
        },
        {
          id: "c2cap-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'competencia/dominio'?",
          payload: { choices: ["proficiency", "milestone", "journey"], answer: 0 },
          explain: "'Proficiency' = competencia / dominio.",
        },
        {
          id: "c2cap-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'consumado/competente'?",
          payload: { choices: ["accomplished", "nervous", "beginner"], answer: 0 },
          explain: "'Accomplished' = consumado.",
        },
        {
          id: "c2cap-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["skills", "Demonstrate", "your"], answer: ["Demonstrate", "your", "skills"] },
          explain: "'Demonstrate your skills' = demuestra tus habilidades.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c2cap-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: repaso integrador",
      intro: "Competencia de GRAMATICA. Repasa inversion, cleft, pasiva y concesivas juntas.",
      grammar: {
        title: "C2 review (inversion, cleft, passive, concessive)",
        form: "inversion: Never have I... · cleft: What I need is... · pasiva: has been mastered · concesiva: However hard...",
        examples: ["Never have I felt so ready.", "What matters is confidence.", "The skills have been mastered.", "However hard it is, I'll try."],
        mistakes: [
          { wrong: "Never I have felt ready.", right: "Never have I felt ready." },
          { wrong: "However it is hard, I'll try.", right: "However hard it is, I'll try." },
        ],
      },
      activities: [
        {
          id: "c2cap-gram-a1", type: "cloze",
          prompt: "Inversion: 'Never ___ I felt so ready.' (auxiliar)",
          payload: { answer: "have" },
          explain: "Inversion: Never + have + I + participio.",
        },
        {
          id: "c2cap-gram-a2", type: "cloze",
          prompt: "Cleft: '___ matters is confidence.' (What/Which)",
          payload: { answer: "What" },
          explain: "Cleft: 'What matters is...'.",
        },
        {
          id: "c2cap-gram-a3", type: "cloze",
          prompt: "Pasiva: 'The skills have been ___.' (master -> participio)",
          payload: { answer: "mastered" },
          explain: "Present perfect pasivo: have been + participio.",
        },
        {
          id: "c2cap-gram-a4", type: "cloze",
          prompt: "Concesiva: '___ hard it is, I'll try.' (por muy)",
          payload: { answer: "However" },
          explain: "'However + adjetivo + sujeto + verbo'.",
        },
        {
          id: "c2cap-gram-a5", type: "multiple_choice",
          prompt: "Which sentence uses inversion correctly?",
          payload: { choices: ["Never have I been prouder.", "Never I have been prouder.", "Never been I have prouder."], answer: 0 },
          explain: "Never + have + I + participio.",
        },
        {
          id: "c2cap-gram-a6", type: "multiple_choice",
          prompt: "Which is a cleft sentence?",
          payload: { choices: ["It was practice that helped.", "Practice helped it was.", "Helped practice it was."], answer: 0 },
          explain: "Cleft: It was X that ...",
        },
        {
          id: "c2cap-gram-a7", type: "word_bank",
          prompt: "Ordena la inversion:",
          payload: { words: ["I", "Never", "felt", "have", "readier"], answer: ["Never", "have", "I", "felt", "readier"] },
          explain: "Never + have + I + felt + readier.",
        },
        {
          id: "c2cap-gram-a8", type: "word_bank",
          prompt: "Ordena la cleft sentence:",
          payload: { words: ["is", "What", "confidence", "matters"], answer: ["What", "matters", "is", "confidence"] },
          explain: "What + matters + is + confidence.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c2cap-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: tu texto final",
      intro: "Competencia de ESCRITURA. Junta las estructuras avanzadas en tu proyecto final.",
      activities: [
        {
          id: "c2cap-write-a1", type: "word_bank",
          prompt: "1. Usa inversion (nunca me senti tan listo):",
          payload: { words: ["I", "Never", "felt", "have", "readier"], answer: ["Never", "have", "I", "felt", "readier"] },
        },
        {
          id: "c2cap-write-a2", type: "word_bank",
          prompt: "2. Usa una cleft (lo que importa es la confianza):",
          payload: { words: ["is", "What", "confidence", "matters"], answer: ["What", "matters", "is", "confidence"] },
        },
        {
          id: "c2cap-write-a3", type: "word_bank",
          prompt: "3. Usa la pasiva (las habilidades se han dominado):",
          payload: { words: ["been", "The", "have", "mastered", "skills"], answer: ["The", "skills", "have", "been", "mastered"] },
        },
        {
          id: "c2cap-write-a4", type: "word_bank",
          prompt: "4. Usa una concesiva (por muy dificil que sea, lo intentare):",
          payload: { words: ["hard", "However", "is,", "try", "it", "I'll"], answer: ["However", "hard", "it", "is,", "I'll", "try"] },
        },
        {
          id: "c2cap-write-a5", type: "word_bank",
          prompt: "5. Di que es un gran logro:",
          payload: { words: ["achievement", "It's", "great", "a"], answer: ["It's", "a", "great", "achievement"] },
        },
        {
          id: "c2cap-write-a6", type: "multiple_choice",
          prompt: "6. Which sentence uses inversion?",
          payload: { choices: ["Never have I been prouder.", "I have never been prouder simply.", "Prouder I never been."], answer: 0 },
        },
        {
          id: "c2cap-write-a7", type: "multiple_choice",
          prompt: "7. Which is passive?",
          payload: { choices: ["The skills have been mastered.", "I mastered the skills.", "I master skills."], answer: 0 },
        },
        {
          id: "c2cap-write-a8", type: "multiple_choice",
          prompt: "8. Congratulations! Reaching C2 means you are...",
          payload: { choices: ["an accomplished, near-native user", "a beginner", "unable to write"], answer: 0 },
        },
      ],
    },
  ],
};
