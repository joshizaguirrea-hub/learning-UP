/**
 * data/units/it13-progetti.js — Unita A2 italiano "Fare progetti" (futuro
 * semplice regolare e irregolare).
 *
 * Dati PURI. term = italiano (meta), translation = spagnolo (L1 dello studente).
 */

export const IT13_PROGETTI = {
  id: "it13-progetti",
  language: "it",
  level: "A2",
  title: "Fare progetti",
  subtitle: "Futuro simple regular e irregular (saro, avro, andro, faro) para hablar de planes",

  cando: [
    "Puedo hablar de planes futuros con el futuro simple.",
    "Puedo usar verbos irregulares frecuentes en futuro (essere->saro, avere->avro, andare->andro, fare->faro).",
    "Puedo hacer predicciones y promesas simples.",
    "Puedo preguntar sobre los planes de otra persona.",
  ],

  vocab: [
    { id: "it13p-1", term: "domani", translation: "manana", example: "Domani andro al mare." },
    { id: "it13p-2", term: "la settimana prossima", translation: "la semana que viene", example: "La settimana prossima partiro." },
    { id: "it13p-3", term: "l'anno prossimo", translation: "el ano que viene", example: "L'anno prossimo studiero di piu." },
    { id: "it13p-4", term: "saro (essere)", translation: "sere", example: "Saro felice." },
    { id: "it13p-5", term: "avro (avere)", translation: "tendre", example: "Avro piu tempo libero." },
    { id: "it13p-6", term: "andro (andare)", translation: "ire", example: "Andro in vacanza." },
    { id: "it13p-7", term: "faro (fare)", translation: "hare", example: "Faro un viaggio." },
    { id: "it13p-8", term: "vedro (vedere)", translation: "vere", example: "Vedro i miei amici." },
    { id: "it13p-9", term: "il programma", translation: "el plan/programa", example: "Qual e il tuo programma?" },
    { id: "it13p-10", term: "forse", translation: "tal vez", example: "Forse andro a Roma." },
    { id: "it13p-11", term: "sicuramente", translation: "seguramente", example: "Sicuramente ti chiamero." },
    { id: "it13p-12", term: "spero che...", translation: "espero que...", example: "Spero che tutto vada bene." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it13p-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: i miei progetti",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - I progetti di Elena\n" +
          "La settimana prossima faro un viaggio in Sicilia. Saro li per cinque giorni e vedro tutte le citta " +
          "piu belle. Il primo giorno andro a Palermo, poi visitero Taormina. Avro anche il tempo per " +
          "riposare in spiaggia. Sicuramente mangero molta buona pizza! Spero che il tempo sara bello.\n\n" +
          "TESTO 2 - Progetti per l'anno prossimo\n" +
          "A: Quali sono i tuoi progetti per l'anno prossimo? B: Studiero di piu l'inglese e forse faro un " +
          "corso di cucina. E tu? A: Io cambiero lavoro e avro piu tempo per la famiglia. B: Che bello! " +
          "Sarai piu felice. A: Lo spero!",
        glossary: [
          { term: "faro un viaggio", translation: "hare un viaje" },
          { term: "saro li", translation: "estare alli" },
          { term: "vedro / visitero", translation: "vere / visitare" },
          { term: "avro il tempo", translation: "tendre el tiempo" },
          { term: "i progetti", translation: "los planes" },
          { term: "sicuramente / forse", translation: "seguramente / tal vez" },
          { term: "cambiero lavoro", translation: "cambiare de trabajo" },
          { term: "spero che", translation: "espero que" },
        ],
        keyPhrases: [
          "El futuro simple se forma quitando la -E del infinitivo y agregando: -ero, -erai, -era, -eremo, -erete, -eranno.",
          "Verbos IRREGULARES clave: essere->saro, avere->avro, andare->andro, fare->faro, vedere->vedro.",
        ],
        check: [
          { prompt: "T1: Dove andra Elena la settimana prossima?", choices: ["In Sicilia", "In Sardegna", "In Francia"], answer: 0 },
          { prompt: "T1: Quanti giorni sara li?", choices: ["Cinque giorni", "Tre giorni", "Una settimana"], answer: 0 },
          { prompt: "T1: Cosa fara il primo giorno?", choices: ["Andra a Palermo", "Visitera Taormina", "Riposera in spiaggia"], answer: 0 },
          { prompt: "T2: Cosa fara B l'anno prossimo?", choices: ["Studiera inglese", "Cambiera lavoro", "Fara un viaggio"], answer: 0 },
          { prompt: "T2: Cosa fara A l'anno prossimo?", choices: ["Cambiera lavoro", "Studiera inglese", "Fara un corso"], answer: 0 },
          { prompt: "T2: Come si sentira A?", choices: ["Piu felice", "Piu stanco", "Piu triste"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it13p-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: il futuro",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "domani / la settimana prossima", translation: "manana / la semana que viene" },
        { term: "l'anno prossimo", translation: "el ano que viene" },
        { term: "saro / avro", translation: "sere / tendre" },
        { term: "andro / faro", translation: "ire / hare" },
        { term: "vedro", translation: "vere" },
        { term: "il programma", translation: "el plan" },
        { term: "forse / sicuramente", translation: "tal vez / seguramente" },
        { term: "spero che...", translation: "espero que..." },
      ],
      activities: [
        {
          id: "it13p-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "saro", right: "sere" },
            { left: "avro", right: "tendre" },
            { left: "andro", right: "ire" },
            { left: "faro", right: "hare" },
          ] },
        },
        {
          id: "it13p-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "vedro", right: "vere" },
            { left: "domani", right: "manana" },
            { left: "la settimana prossima", right: "la semana que viene" },
            { left: "forse", right: "tal vez" },
          ] },
        },
        {
          id: "it13p-vocab-a3", type: "cloze",
          prompt: "Completa (io): 'Domani ___ al mare.' (andare, futuro)",
          payload: { answer: "andro" },
          explain: "andare -> futuro irregolare 'andro'.",
        },
        {
          id: "it13p-vocab-a4", type: "cloze",
          prompt: "Completa (io): 'L'anno prossimo ___ di piu.' (studiare, futuro)",
          payload: { answer: "studiero" },
          explain: "studiare -> futuro regolare 'studiero'.",
        },
        {
          id: "it13p-vocab-a5", type: "cloze",
          prompt: "Completa (io): '___ felice.' (essere, futuro)",
          payload: { answer: "Saro" },
          explain: "essere -> futuro irregolare 'saro'.",
        },
        {
          id: "it13p-vocab-a6", type: "multiple_choice",
          prompt: "Qual e il futuro di 'avere' (io)?",
          payload: { choices: ["avero", "avro", "avrei"], answer: 1 },
          explain: "avere -> futuro irregolare 'avro'.",
        },
        {
          id: "it13p-vocab-a7", type: "multiple_choice",
          prompt: "Come dici 'hare un viaje'?",
          payload: { choices: ["Faccio un viaggio.", "Faro un viaggio.", "Fatto un viaggio."], answer: 1 },
          explain: "fare -> futuro irregolare 'faro'.",
        },
        {
          id: "it13p-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["in", "Faro", "Sicilia", "un", "viaggio"], answer: ["Faro", "un", "viaggio", "in", "Sicilia"] },
          explain: "'Faro un viaggio in Sicilia'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it13p-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: il futuro semplice",
      intro: "Competencia de GRAMATICA. Aprende las terminaciones del futuro y los irregulares mas usados.",
      grammar: {
        title: "Il futuro semplice",
        chart: {
          title: "FUTURO SEMPLICE",
          maps: "-are/-ere -> -ero  ·  irregolari cambian la raiz",
          groups: [
            {
              label: "REGOLARE (-are/-ere)", color: "rose",
              forms: [
                { form: "PARLARE -> PARLERO", subjects: "hablar -> hablare" },
                { form: "STUDIARE -> STUDIERO", subjects: "estudiar -> estudiare" },
                { form: "VEDERE -> VEDRO", subjects: "ver -> vere" },
              ],
            },
            {
              label: "IRREGOLARI", color: "green",
              forms: [
                { form: "ESSERE -> SARO", subjects: "ser/estar -> sere" },
                { form: "AVERE -> AVRO", subjects: "tener -> tendre" },
                { form: "ANDARE -> ANDRO", subjects: "ir -> ire" },
                { form: "FARE -> FARO", subjects: "hacer -> hare" },
              ],
            },
          ],
        },
        form: "radice + -O/-AI/-A/-EMO/-ETE/-ANNO (essere/avere/andare/fare son irregulares en la raiz)",
        desc: "El futuro simple se usa para hablar de planes, predicciones y promesas. Los verbos en -ARE y -ERE forman el futuro con las MISMAS terminaciones (-ero, -erai, -era...), pero varios verbos muy frecuentes son irregulares en la raiz: essere->SAR-, avere->AVR-, andare->ANDR-, fare->FAR-, vedere->VEDR-.",
        rule: "Terminaciones del futuro (todas las conjugaciones): io -O, tu -AI, lui/lei -A, noi -EMO, voi -ETE, loro -ANNO. Regular: parlare -> parlero, parlerai, parlera, parleremo, parlerete, parleranno. Irregulares de raiz: essere->sar-, avere->avr-, andare->andr-, fare->far-, vedere->vedr-.",
        examples: ["Domani studiero l'italiano.", "Sara una bella giornata.", "Andremo in vacanza insieme.", "Faranno un viaggio lungo."],
        explain: { tr: ["Manana estudiare italiano.", "Sera un lindo dia.", "Iremos de vacaciones juntos.", "Haran un viaje largo."] },
        mistakes: [
          { wrong: "Io essero felice.", right: "Io saro felice." },
          { wrong: "Noi faceremo un viaggio.", right: "Noi faremo un viaggio." },
          { wrong: "Tu andarai domani.", right: "Tu andrai domani." },
        ],
      },
      activities: [
        {
          id: "it13p-gram-a1", type: "cloze",
          prompt: "Completa (io): 'Domani ___ in vacanza.' (andare, futuro)",
          payload: { answer: "andro" },
          explain: "andare -> 'andro'.",
        },
        {
          id: "it13p-gram-a2", type: "cloze",
          prompt: "Completa (lei): 'Lei ___ felice.' (essere, futuro)",
          payload: { answer: "sara" },
          explain: "essere -> lei: 'sara'.",
        },
        {
          id: "it13p-gram-a3", type: "cloze",
          prompt: "Completa (noi): 'Noi ___ un viaggio.' (fare, futuro)",
          payload: { answer: "faremo" },
          explain: "fare -> noi: 'faremo'.",
        },
        {
          id: "it13p-gram-a4", type: "multiple_choice",
          prompt: "Qual e il futuro di 'vedere' (io)?",
          payload: { choices: ["vedero", "vedro", "vedrei"], answer: 1 },
          explain: "vedere -> futuro irregolare 'vedro'.",
        },
        {
          id: "it13p-gram-a5", type: "multiple_choice",
          prompt: "Qual e il futuro di 'avere' (tu)?",
          payload: { choices: ["avrai", "averai", "avrei"], answer: 0 },
          explain: "avere -> tu: 'avrai'.",
        },
        {
          id: "it13p-gram-a6", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Sara una bella giornata.", "Essera una bella giornata.", "Sono una bella giornata domani."], answer: 0 },
          explain: "essere -> 'sara' (3a persona futuro).",
        },
        {
          id: "it13p-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["in", "Andremo", "insieme", "vacanza"], answer: ["Andremo", "in", "vacanza", "insieme"] },
          explain: "'Andremo in vacanza insieme'.",
        },
        {
          id: "it13p-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["un", "Faranno", "lungo", "viaggio"], answer: ["Faranno", "un", "viaggio", "lungo"] },
          explain: "'Faranno un viaggio lungo'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it13p-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: i tuoi progetti",
      intro: "Competencia de ESCRITURA. Cuenta tus planes futuros, frase por frase.",
      activities: [
        {
          id: "it13p-write-a1", type: "word_bank",
          prompt: "1. Di que mañana iras al mar (tu):",
          payload: { words: ["al", "Domani", "mare", "andrai"], answer: ["Domani", "andrai", "al", "mare"] },
        },
        {
          id: "it13p-write-a2", type: "word_bank",
          prompt: "2. Di que seras feliz (io):",
          payload: { words: ["felice", "Saro"], answer: ["Saro", "felice"] },
        },
        {
          id: "it13p-write-a3", type: "word_bank",
          prompt: "3. Di que haran un viaje (loro):",
          payload: { words: ["un", "Faranno", "viaggio"], answer: ["Faranno", "un", "viaggio"] },
        },
        {
          id: "it13p-write-a4", type: "word_bank",
          prompt: "4. Di que tendras mas tiempo (tu):",
          payload: { words: ["tempo", "Avrai", "piu"], answer: ["Avrai", "piu", "tempo"] },
        },
        {
          id: "it13p-write-a5", type: "word_bank",
          prompt: "5. Pregunta cuales son sus planes (tuoi, informal):",
          payload: { words: ["sono", "Quali", "progetti", "tuoi", "i"], answer: ["Quali", "sono", "i", "tuoi", "progetti"] },
        },
        {
          id: "it13p-write-a6", type: "multiple_choice",
          prompt: "6. El futuro de 'essere' para 'noi' es:",
          payload: { choices: ["saremo", "essimo", "siamo"], answer: 0 },
        },
        {
          id: "it13p-write-a7", type: "multiple_choice",
          prompt: "7. Cual es correcto?",
          payload: { choices: ["Vedro i miei amici domani.", "Vedero i miei amici domani.", "Vedo i miei amici domani futuro."], answer: 0 },
        },
        {
          id: "it13p-write-a8", type: "multiple_choice",
          prompt: "8. 'Faremo un viaggio' significa:",
          payload: { choices: ["Haremos un viaje", "Hicimos un viaje", "Hacemos un viaje"], answer: 0 },
        },
      ],
    },
  ],
};
