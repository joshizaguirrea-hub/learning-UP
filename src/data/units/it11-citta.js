/**
 * data/units/it11-citta.js — Unita A2 italiano "In citta" (imperativo
 * informale per dare indicazioni + preposizioni di luogo).
 *
 * Dati PURI. term = italiano (meta), translation = spagnolo (L1 dello studente).
 */

export const IT11_CITTA = {
  id: "it11-citta",
  language: "it",
  level: "A2",
  title: "In citta",
  subtitle: "Imperativo informal (gira, vai, prendi) para dar direcciones + preposiciones de lugar",

  cando: [
    "Puedo preguntar y dar direcciones en italiano.",
    "Puedo usar el imperativo informal (gira, vai, prendi) para indicar un camino.",
    "Puedo usar preposiciones de lugar (a destra, davanti a, dietro, vicino a).",
    "Puedo describir donde esta algo en la ciudad con 'c'e' / 'ci sono'.",
  ],

  vocab: [
    { id: "it11c-1", term: "gira (girare)", translation: "gira/dobla", example: "Gira a destra." },
    { id: "it11c-2", term: "vai dritto (andare)", translation: "sigue derecho", example: "Vai dritto per due isolati." },
    { id: "it11c-3", term: "prendi (prendere)", translation: "toma", example: "Prendi la prima a sinistra." },
    { id: "it11c-4", term: "a destra", translation: "a la derecha", example: "La banca e a destra." },
    { id: "it11c-5", term: "a sinistra", translation: "a la izquierda", example: "Gira a sinistra al semaforo." },
    { id: "it11c-6", term: "dritto", translation: "derecho (recto)", example: "Continua dritto fino alla piazza." },
    { id: "it11c-7", term: "l'incrocio", translation: "el cruce", example: "All'incrocio, gira a destra." },
    { id: "it11c-8", term: "il semaforo", translation: "el semaforo", example: "Al semaforo, vai dritto." },
    { id: "it11c-9", term: "vicino a", translation: "cerca de", example: "La farmacia e vicino alla banca." },
    { id: "it11c-10", term: "davanti a", translation: "delante de", example: "C'e un parco davanti alla scuola." },
    { id: "it11c-11", term: "dietro", translation: "detras de", example: "Il museo e dietro la chiesa." },
    { id: "it11c-12", term: "mi scusi, dov'e...?", translation: "disculpe, donde esta...?", example: "Mi scusi, dov'e la stazione?" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it11c-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: come arrivare al museo",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - Come arrivare al museo\n" +
          "\"Mi scusi, dov'e il museo?\" \"Allora, da qui vai dritto per due isolati. All'incrocio, gira a destra. " +
          "Poi prendi la prima strada a sinistra. Il museo e davanti alla piazza, vicino alla banca. Non puoi " +
          "sbagliare!\" \"Grazie mille!\" \"Prego, buona visita!\"\n\n" +
          "TESTO 2 - Una citta nuova\n" +
          "Oggi sono arrivata in una citta nuova e non conosco niente. Vicino al mio albergo c'e una piccola " +
          "farmacia e, dietro l'albergo, c'e un bel parco. Per andare al centro, devo girare a sinistra al " +
          "semaforo e poi andare dritto. Domani voglio visitare il museo che e davanti alla stazione.",
        glossary: [
          { term: "vai dritto", translation: "ve derecho" },
          { term: "gira a destra/sinistra", translation: "gira a la derecha/izquierda" },
          { term: "l'incrocio", translation: "el cruce" },
          { term: "vicino a / davanti a / dietro", translation: "cerca de / delante de / detras de" },
          { term: "mi scusi, dov'e...?", translation: "disculpe, donde esta?" },
          { term: "non puoi sbagliare!", translation: "no puedes equivocarte!" },
          { term: "conosco", translation: "conozco" },
          { term: "devo girare", translation: "debo girar" },
        ],
        keyPhrases: [
          "El imperativo informal (tu) de los verbos -are termina en -A: 'gira', 'continua' (y 'vai' es irregular).",
          "'C'e' + singular / 'ci sono' + plural para decir que HAY algo en un lugar (ya visto en A1).",
        ],
        check: [
          { prompt: "T1: Cosa deve fare la persona all'incrocio?", choices: ["Girare a destra", "Girare a sinistra", "Andare dritto"], answer: 0 },
          { prompt: "T1: Dove si trova il museo?", choices: ["Davanti alla piazza", "Dietro la banca", "Vicino al semaforo"], answer: 0 },
          { prompt: "T1: Quanti isolati deve fare dritto all'inizio?", choices: ["Due isolati", "Tre isolati", "Un isolato"], answer: 0 },
          { prompt: "T2: Cosa c'e vicino all'albergo?", choices: ["Una farmacia", "Un museo", "Una banca"], answer: 0 },
          { prompt: "T2: Cosa c'e dietro l'albergo?", choices: ["Un parco", "Una chiesa", "Una scuola"], answer: 0 },
          { prompt: "T2: Dove si trova il museo che vuole visitare?", choices: ["Davanti alla stazione", "Dietro il parco", "Vicino alla farmacia"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it11c-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: le indicazioni",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "gira / vai dritto", translation: "gira / ve derecho" },
        { term: "a destra / a sinistra", translation: "a la derecha / izquierda" },
        { term: "l'incrocio / il semaforo", translation: "el cruce / el semaforo" },
        { term: "vicino a / davanti a", translation: "cerca de / delante de" },
        { term: "dietro", translation: "detras de" },
        { term: "mi scusi, dov'e...?", translation: "disculpe, donde esta?" },
        { term: "prendi la prima/seconda", translation: "toma la primera/segunda" },
        { term: "non puoi sbagliare!", translation: "no puedes equivocarte!" },
      ],
      activities: [
        {
          id: "it11c-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "gira", right: "gira" },
            { left: "vai dritto", right: "ve derecho" },
            { left: "a destra", right: "a la derecha" },
            { left: "a sinistra", right: "a la izquierda" },
          ] },
        },
        {
          id: "it11c-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "l'incrocio", right: "el cruce" },
            { left: "il semaforo", right: "el semaforo" },
            { left: "vicino a", right: "cerca de" },
            { left: "dietro", right: "detras de" },
          ] },
        },
        {
          id: "it11c-vocab-a3", type: "cloze",
          prompt: "Completa: '___ a destra al semaforo.' (girare, imperativo tu)",
          payload: { answer: "gira" },
          explain: "girare -> imperativo tu: 'gira'.",
        },
        {
          id: "it11c-vocab-a4", type: "cloze",
          prompt: "Completa: '___ dritto per due isolati.' (andare, imperativo tu)",
          payload: { answer: "vai" },
          explain: "andare -> imperativo tu irregolare: 'vai'.",
        },
        {
          id: "it11c-vocab-a5", type: "cloze",
          prompt: "Completa: 'La farmacia e ___ alla banca.' (cerca)",
          payload: { answer: "vicino" },
          explain: "'vicino a' = cerca de.",
        },
        {
          id: "it11c-vocab-a6", type: "multiple_choice",
          prompt: "Come chiedi 'disculpe, donde esta la estacion'?",
          payload: { choices: ["Mi scusi, dov'e la stazione?", "Dove vai alla stazione?", "Mi scusi la stazione?"], answer: 0 },
          explain: "'Mi scusi, dov'e...?' es la forma cortes de preguntar.",
        },
        {
          id: "it11c-vocab-a7", type: "multiple_choice",
          prompt: "Cosa significa 'davanti a'?",
          payload: { choices: ["detras de", "delante de", "al lado de"], answer: 1 },
          explain: "'davanti a' = delante de.",
        },
        {
          id: "it11c-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["a", "Gira", "all'incrocio", "destra"], answer: ["Gira", "a", "destra", "all'incrocio"] },
          explain: "'Gira a destra all'incrocio'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it11c-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: l'imperativo informale (tu)",
      intro: "Competencia de GRAMATICA. Aprende a dar ordenes/indicaciones a alguien que tratas de 'tu'.",
      grammar: {
        title: "L'imperativo informale (tu)",
        chart: {
          title: "IMPERATIVO (tu)",
          maps: "-are -> -A  ·  -ere/-ire -> -I",
          groups: [
            {
              label: "VERBI -ARE", color: "rose",
              forms: [
                { form: "GIRARE -> GIRA", subjects: "girar -> gira" },
                { form: "ANDARE -> VAI", subjects: "ir -> ve (irregolare!)" },
                { form: "CONTINUARE -> CONTINUA", subjects: "continuar -> continua" },
              ],
            },
            {
              label: "VERBI -ERE / -IRE", color: "green",
              forms: [
                { form: "PRENDERE -> PRENDI", subjects: "tomar -> toma" },
                { form: "SCENDERE -> SCENDI", subjects: "bajar -> baja" },
              ],
            },
          ],
        },
        form: "imperativo (tu): -are -> radice + A  ·  -ere/-ire -> radice + I (andare es irregular: VAI)",
        desc: "Para dar instrucciones o indicaciones a alguien que tratas de 'tu' (informal), se usa el IMPERATIVO. Los verbos en -ARE terminan en -A (gira, continua, aspetta); los verbos en -ERE/-IRE terminan en -I (prendi, scendi). 'Andare' es irregular: su imperativo es 'VAI' (no 'anda').",
        rule: "Imperativo informale (tu): verbi -ARE -> radice + A (girare->GIRA, continuare->CONTINUA). Verbi -ERE/-IRE -> radice + I (prendere->PRENDI, scendere->SCENDI). Irregolari frequenti: andare->VAI, fare->FAI, dire->DI'.",
        examples: ["Gira a sinistra.", "Vai dritto.", "Prendi la prima strada.", "Continua fino alla piazza."],
        explain: { tr: ["Gira a la izquierda.", "Ve derecho.", "Toma la primera calle.", "Continua hasta la plaza."] },
        mistakes: [
          { wrong: "Andi dritto.", right: "Vai dritto." },
          { wrong: "Giri a destra. (forma formale, no con un amico)", right: "Gira a destra." },
          { wrong: "Prende la prima strada.", right: "Prendi la prima strada." },
        ],
      },
      activities: [
        {
          id: "it11c-gram-a1", type: "cloze",
          prompt: "Completa: '___ a sinistra.' (girare, imperativo)",
          payload: { answer: "gira" },
          explain: "girare -> 'gira'.",
        },
        {
          id: "it11c-gram-a2", type: "cloze",
          prompt: "Completa: '___ dritto fino al semaforo.' (andare, imperativo)",
          payload: { answer: "vai" },
          explain: "andare -> 'vai' (irregolare).",
        },
        {
          id: "it11c-gram-a3", type: "cloze",
          prompt: "Completa: '___ la seconda strada.' (prendere, imperativo)",
          payload: { answer: "prendi" },
          explain: "prendere -> 'prendi'.",
        },
        {
          id: "it11c-gram-a4", type: "multiple_choice",
          prompt: "Qual e l'imperativo (tu) di 'andare'?",
          payload: { choices: ["anda", "vai", "andi"], answer: 1 },
          explain: "'andare' -> imperativo irregolare 'vai'.",
        },
        {
          id: "it11c-gram-a5", type: "multiple_choice",
          prompt: "Qual e l'imperativo (tu) di 'girare'?",
          payload: { choices: ["giri", "gira", "girare"], answer: 1 },
          explain: "-are -> -A: 'gira'.",
        },
        {
          id: "it11c-gram-a6", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Vai dritto e gira a destra.", "Va dritto e giri a destra.", "Andare dritto e girare destra."], answer: 0 },
          explain: "Imperativo informale: 'Vai' y 'gira'.",
        },
        {
          id: "it11c-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["prima", "Prendi", "sinistra", "la", "a"], answer: ["Prendi", "la", "prima", "a", "sinistra"] },
          explain: "'Prendi la prima a sinistra'.",
        },
        {
          id: "it11c-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["alla", "Continua", "piazza", "dritto", "fino"], answer: ["Continua", "dritto", "fino", "alla", "piazza"] },
          explain: "'Continua dritto fino alla piazza'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it11c-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: dai indicazioni",
      intro: "Competencia de ESCRITURA. Da indicaciones para llegar a un lugar, frase por frase.",
      activities: [
        {
          id: "it11c-write-a1", type: "word_bank",
          prompt: "1. Di 'gira a la derecha':",
          payload: { words: ["destra", "Gira", "a"], answer: ["Gira", "a", "destra"] },
        },
        {
          id: "it11c-write-a2", type: "word_bank",
          prompt: "2. Di 've derecho':",
          payload: { words: ["dritto", "Vai"], answer: ["Vai", "dritto"] },
        },
        {
          id: "it11c-write-a3", type: "word_bank",
          prompt: "3. Di 'toma la primera calle':",
          payload: { words: ["strada", "Prendi", "prima", "la"], answer: ["Prendi", "la", "prima", "strada"] },
        },
        {
          id: "it11c-write-a4", type: "word_bank",
          prompt: "4. Pregunta donde esta el museo:",
          payload: { words: ["il", "Dov'e", "museo"], answer: ["Dov'e", "il", "museo"] },
        },
        {
          id: "it11c-write-a5", type: "word_bank",
          prompt: "5. Di que el parque esta detras de la iglesia:",
          payload: { words: ["la", "Il", "dietro", "parco", "e", "chiesa"], answer: ["Il", "parco", "e", "dietro", "la", "chiesa"] },
        },
        {
          id: "it11c-write-a6", type: "multiple_choice",
          prompt: "6. 'Vicino a' significa:",
          payload: { choices: ["lejos de", "cerca de", "encima de"], answer: 1 },
        },
        {
          id: "it11c-write-a7", type: "multiple_choice",
          prompt: "7. Cual es correcto para dar indicaciones a un amigo?",
          payload: { choices: ["Giri a sinistra.", "Gira a sinistra.", "Girare a sinistra."], answer: 1 },
        },
        {
          id: "it11c-write-a8", type: "multiple_choice",
          prompt: "8. El imperativo (tu) de 'fare' es:",
          payload: { choices: ["fai", "faccio", "fare"], answer: 0 },
        },
      ],
    },
  ],
};
