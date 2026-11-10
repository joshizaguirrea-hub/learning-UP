/**
 * data/units/it12-salute.js — Unita A2 italiano "La salute" (dovere + mi fa
 * male, vocabolario del corpo e dei sintomi).
 *
 * Dati PURI. term = italiano (meta), translation = spagnolo (L1 dello studente).
 */

export const IT12_SALUTE = {
  id: "it12-salute",
  language: "it",
  level: "A2",
  title: "La salute",
  subtitle: "'Dovere' para consejos/obligaciones + 'mi fa male' para sintomas y dolores",

  cando: [
    "Puedo hablar de sintomas y dolores usando 'mi fa male'.",
    "Puedo usar 'dovere' para dar o recibir consejos medicos (devi, deve).",
    "Puedo nombrar partes del cuerpo comunes.",
    "Puedo describir un problema de salud y pedir una cita.",
  ],

  vocab: [
    { id: "it12s-1", term: "mi fa male (fare male)", translation: "me duele", example: "Mi fa male la testa." },
    { id: "it12s-2", term: "la testa", translation: "la cabeza", example: "Ho mal di testa." },
    { id: "it12s-3", term: "lo stomaco", translation: "el estomago", example: "Mi fa male lo stomaco." },
    { id: "it12s-4", term: "la gola", translation: "la garganta", example: "Ho mal di gola." },
    { id: "it12s-5", term: "la febbre", translation: "la fiebre", example: "Ho la febbre alta." },
    { id: "it12s-6", term: "il raffreddore", translation: "el resfriado", example: "Ho un brutto raffreddore." },
    { id: "it12s-7", term: "dovere (devo/devi/deve)", translation: "deber (debo/debes/debe)", example: "Devi andare dal dottore." },
    { id: "it12s-8", term: "il dottore / il medico", translation: "el doctor", example: "Il dottore mi ha visitato." },
    { id: "it12s-9", term: "la farmacia", translation: "la farmacia", example: "Vado in farmacia a comprare medicine." },
    { id: "it12s-10", term: "riposare", translation: "descansar", example: "Devi riposare un po'." },
    { id: "it12s-11", term: "prendere una medicina", translation: "tomar un medicamento", example: "Devo prendere una medicina." },
    { id: "it12s-12", term: "sentirsi male", translation: "sentirse mal", example: "Mi sento male oggi." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it12s-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: dal dottore",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - Dal dottore\n" +
          "\"Buongiorno dottore, non mi sento bene.\" \"Cosa senti?\" \"Mi fa male la gola e ho un po' di febbre.\" " +
          "\"Hai anche mal di testa?\" \"Si, un po'.\" \"Capisco. Devi riposare e bere molta acqua. Devi anche " +
          "prendere questa medicina tre volte al giorno. Se tra tre giorni non stai meglio, devi tornare.\" " +
          "\"Grazie, dottore!\"\n\n" +
          "TESTO 2 - Un messaggio a un'amica\n" +
          "Ciao Sara, oggi non vengo a lavoro perche mi sento male. Mi fa male lo stomaco e ho un brutto " +
          "raffreddore. Penso che devo andare in farmacia per comprare una medicina. Se domani non sto " +
          "meglio, devo andare dal dottore. A presto!",
        glossary: [
          { term: "mi fa male", translation: "me duele" },
          { term: "ho la febbre", translation: "tengo fiebre" },
          { term: "devi riposare", translation: "debes descansar" },
          { term: "prendere una medicina", translation: "tomar un medicamento" },
          { term: "non mi sento bene", translation: "no me siento bien" },
          { term: "il raffreddore", translation: "el resfriado" },
          { term: "stai meglio", translation: "estas mejor" },
          { term: "vengo a lavoro", translation: "voy al trabajo" },
        ],
        keyPhrases: [
          "'Mi fa male' + parte del cuerpo = me duele X (igual estructura que 'mi piace').",
          "'Dovere' (devo/devi/deve/dobbiamo/dovete/devono) + infinitivo = tener que / deber hacer algo.",
        ],
        check: [
          { prompt: "T1: Cosa ha il paziente?", choices: ["Mal di gola e febbre", "Mal di stomaco", "Raffreddore"], answer: 0 },
          { prompt: "T1: Cosa deve fare il paziente?", choices: ["Riposare e bere acqua", "Andare in ospedale", "Fare sport"], answer: 0 },
          { prompt: "T1: Quante volte al giorno deve prendere la medicina?", choices: ["Tre volte", "Due volte", "Una volta"], answer: 0 },
          { prompt: "T2: Perche non va a lavoro?", choices: ["Perche si sente male", "Perche e in vacanza", "Perche piove"], answer: 0 },
          { prompt: "T2: Cosa le fa male?", choices: ["Lo stomaco", "La testa", "La gola"], answer: 0 },
          { prompt: "T2: Dove deve andare se non sta meglio?", choices: ["Dal dottore", "In farmacia", "A scuola"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it12s-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: i sintomi",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "mi fa male / la testa", translation: "me duele / la cabeza" },
        { term: "lo stomaco / la gola", translation: "el estomago / la garganta" },
        { term: "la febbre / il raffreddore", translation: "la fiebre / el resfriado" },
        { term: "dovere (devo/devi/deve)", translation: "deber (debo/debes/debe)" },
        { term: "il dottore / la farmacia", translation: "el doctor / la farmacia" },
        { term: "riposare", translation: "descansar" },
        { term: "prendere una medicina", translation: "tomar un medicamento" },
        { term: "sentirsi male", translation: "sentirse mal" },
      ],
      activities: [
        {
          id: "it12s-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "mi fa male", right: "me duele" },
            { left: "la testa", right: "la cabeza" },
            { left: "lo stomaco", right: "el estomago" },
            { left: "la gola", right: "la garganta" },
          ] },
        },
        {
          id: "it12s-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "la febbre", right: "la fiebre" },
            { left: "il raffreddore", right: "el resfriado" },
            { left: "riposare", right: "descansar" },
            { left: "il dottore", right: "el doctor" },
          ] },
        },
        {
          id: "it12s-vocab-a3", type: "cloze",
          prompt: "Completa: 'Mi ___ male la testa.' (fare, 3a persona)",
          payload: { answer: "fa" },
          explain: "'fare' en 3a persona singular: 'fa'.",
        },
        {
          id: "it12s-vocab-a4", type: "cloze",
          prompt: "Completa: '___ andare dal dottore.' (dovere, tu)",
          payload: { answer: "Devi" },
          explain: "dovere -> tu: 'devi'.",
        },
        {
          id: "it12s-vocab-a5", type: "cloze",
          prompt: "Completa: 'Ho la ___.' (fiebre)",
          payload: { answer: "febbre" },
          explain: "'la febbre' = la fiebre.",
        },
        {
          id: "it12s-vocab-a6", type: "multiple_choice",
          prompt: "Come dici 'me duele el estomago'?",
          payload: { choices: ["Mi fa male lo stomaco.", "Ho lo stomaco.", "Sono lo stomaco."], answer: 0 },
          explain: "'Mi fa male' + parte del cuerpo.",
        },
        {
          id: "it12s-vocab-a7", type: "multiple_choice",
          prompt: "Cosa significa 'riposare'?",
          payload: { choices: ["trabajar", "descansar", "comer"], answer: 1 },
          explain: "'riposare' = descansar.",
        },
        {
          id: "it12s-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["la", "Mi", "male", "fa", "testa"], answer: ["Mi", "fa", "male", "la", "testa"] },
          explain: "'Mi fa male la testa'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it12s-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: dovere + mi fa male",
      intro: "Competencia de GRAMATICA. Aprende 'dovere' (consejos/obligaciones) y la estructura de los dolores.",
      grammar: {
        title: "Dovere + mi fa male / mi fanno male",
        chart: {
          title: "DOVERE",
          maps: "+ infinito",
          groups: [
            {
              label: "DOVERE (presente)", color: "rose",
              forms: [
                { form: "DEVO / DEVI", subjects: "io / tu" },
                { form: "DEVE", subjects: "lui / lei" },
                { form: "DOBBIAMO", subjects: "noi" },
                { form: "DOVETE / DEVONO", subjects: "voi / loro" },
              ],
            },
            {
              label: "MI FA MALE", color: "green",
              forms: [
                { form: "MI FA MALE + singolare", subjects: "me duele (la testa)" },
                { form: "MI FANNO MALE + plurale", subjects: "me duelen (i piedi)" },
              ],
            },
          ],
        },
        form: "dovere (devo, devi, deve...) + infinitivo = deber/tener que",
        desc: "'Dovere' es un verbo modal irregular que se usa para dar consejos o hablar de obligaciones: 'devi riposare' (debes descansar). Para hablar de dolores se usa la estructura 'mi fa male' (igual logica que 'mi piace'): singular 'fa male', plural 'fanno male' (mi fanno male i piedi).",
        rule: "Dovere: io devo, tu devi, lui/lei deve, noi dobbiamo, voi dovete, loro devono + infinitivo. Mi fa male + parte del cuerpo SINGULAR (mi fa male la testa); mi fanno male + parte del cuerpo PLURAL (mi fanno male i piedi, los pies).",
        examples: ["Devi bere molta acqua.", "Deve andare dal dottore.", "Mi fa male la gola.", "Mi fanno male gli occhi."],
        explain: { tr: ["Debes beber mucha agua.", "Debe ir al doctor.", "Me duele la garganta.", "Me duelen los ojos."] },
        mistakes: [
          { wrong: "Tu devi a riposare.", right: "Tu devi riposare." },
          { wrong: "Mi fa male i piedi.", right: "Mi fanno male i piedi." },
          { wrong: "Io dovere andare.", right: "Io devo andare." },
        ],
      },
      activities: [
        {
          id: "it12s-gram-a1", type: "cloze",
          prompt: "Completa: 'Tu ___ riposare.' (dovere)",
          payload: { answer: "devi" },
          explain: "dovere -> tu: 'devi'.",
        },
        {
          id: "it12s-gram-a2", type: "cloze",
          prompt: "Completa: 'Lei ___ prendere una medicina.' (dovere)",
          payload: { answer: "deve" },
          explain: "dovere -> lei: 'deve'.",
        },
        {
          id: "it12s-gram-a3", type: "cloze",
          prompt: "Completa: 'Mi fa ___ la testa.' (dolor)",
          payload: { answer: "male" },
          explain: "'fare male' = doler.",
        },
        {
          id: "it12s-gram-a4", type: "multiple_choice",
          prompt: "Come dici 'me duelen los pies' (i piedi, plurale)?",
          payload: { choices: ["Mi fa male i piedi.", "Mi fanno male i piedi.", "Ho male i piedi."], answer: 1 },
          explain: "Plural -> 'fanno male'.",
        },
        {
          id: "it12s-gram-a5", type: "multiple_choice",
          prompt: "Qual e la forma corretta per 'noi'?",
          payload: { choices: ["Dobbiamo riposare.", "Doviamo riposare.", "Dovemo riposare."], answer: 0 },
          explain: "dovere -> noi: 'dobbiamo' (irregolare).",
        },
        {
          id: "it12s-gram-a6", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Devi andare dal dottore.", "Devi di andare dal dottore.", "Dovi andare dal dottore."], answer: 0 },
          explain: "'Devi' + infinito, sin preposicion.",
        },
        {
          id: "it12s-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["molta", "Devi", "acqua", "bere"], answer: ["Devi", "bere", "molta", "acqua"] },
          explain: "'Devi bere molta acqua'.",
        },
        {
          id: "it12s-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["gli", "Mi", "occhi", "fanno", "male"], answer: ["Mi", "fanno", "male", "gli", "occhi"] },
          explain: "'Mi fanno male gli occhi'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it12s-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: dal dottore",
      intro: "Competencia de ESCRITURA. Describe un problema de salud, frase por frase.",
      activities: [
        {
          id: "it12s-write-a1", type: "word_bank",
          prompt: "1. Di que te duele la cabeza:",
          payload: { words: ["la", "Mi", "male", "fa", "testa"], answer: ["Mi", "fa", "male", "la", "testa"] },
        },
        {
          id: "it12s-write-a2", type: "word_bank",
          prompt: "2. Di que debes descansar:",
          payload: { words: ["riposare", "Devo"], answer: ["Devo", "riposare"] },
        },
        {
          id: "it12s-write-a3", type: "word_bank",
          prompt: "3. Di que tienes fiebre:",
          payload: { words: ["febbre", "Ho", "la"], answer: ["Ho", "la", "febbre"] },
        },
        {
          id: "it12s-write-a4", type: "word_bank",
          prompt: "4. Di que debe ir al doctor (lei):",
          payload: { words: ["dal", "Deve", "dottore", "andare"], answer: ["Deve", "andare", "dal", "dottore"] },
        },
        {
          id: "it12s-write-a5", type: "word_bank",
          prompt: "5. Pregunta que le pasa (informal):",
          payload: { words: ["senti", "Cosa"], answer: ["Cosa", "senti"] },
        },
        {
          id: "it12s-write-a6", type: "multiple_choice",
          prompt: "6. 'Mi fa male lo stomaco' significa:",
          payload: { choices: ["me duele el estomago", "tengo hambre", "estoy enfermo del corazon"], answer: 0 },
        },
        {
          id: "it12s-write-a7", type: "multiple_choice",
          prompt: "7. La forma de 'dovere' para 'voi' es:",
          payload: { choices: ["dovete", "devono", "dobbiamo"], answer: 0 },
        },
        {
          id: "it12s-write-a8", type: "multiple_choice",
          prompt: "8. 'Devi riposare' significa:",
          payload: { choices: ["debes trabajar", "debes descansar", "debes comer"], answer: 1 },
        },
      ],
    },
  ],
};
