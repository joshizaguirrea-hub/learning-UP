/**
 * data/units/fr13-projets.js — Unite A2 francais "Faire des projets" (le
 * futur simple).
 *
 * Datos PUROS. term = frances (meta), translation = espanol (L1 del alumno).
 *
 * POR QUE despues del futur proche (fr10-voyage): el futur simple se usa
 * para planes mas LEJANOS, formales o predicciones -- el contraste entre
 * los dos futuros (proche = cercano/seguro, simple = lejano/formal) es en
 * si mismo un punto clave de A2 que el alumno debe entender.
 */

export const FR13_PROJETS = {
  id: "fr13-projets",
  language: "fr",
  level: "A2",
  title: "Faire des projets",
  subtitle: "Futuro simple regular e irregular (serai, aurai, irai, ferai) para planes mas lejanos",

  cando: [
    "Puedo hablar de planes futuros mas lejanos o formales con el futur simple.",
    "Puedo usar verbos irregulares frecuentes en futuro (etre->serai, avoir->aurai, aller->irai, faire->ferai).",
    "Puedo distinguir cuando usar futur proche (cercano) vs futur simple (lejano/formal).",
    "Puedo hacer predicciones.",
  ],

  vocab: [
    { id: "fr13p-1", term: "demain", translation: "manana", example: "Demain, j'irai au marche." },
    { id: "fr13p-2", term: "la semaine prochaine", translation: "la semana que viene", example: "La semaine prochaine, je commencerai un cours." },
    { id: "fr13p-3", term: "l'annee prochaine", translation: "el ano que viene", example: "L'annee prochaine, j'etudierai plus." },
    { id: "fr13p-4", term: "je serai (etre)", translation: "sere", example: "Je serai heureux." },
    { id: "fr13p-5", term: "j'aurai (avoir)", translation: "tendre", example: "J'aurai plus de temps libre." },
    { id: "fr13p-6", term: "j'irai (aller)", translation: "ire", example: "J'irai en vacances." },
    { id: "fr13p-7", term: "je ferai (faire)", translation: "hare", example: "Je ferai un voyage." },
    { id: "fr13p-8", term: "je verrai (voir)", translation: "vere", example: "Je verrai mes amis." },
    { id: "fr13p-9", term: "le projet", translation: "el plan/proyecto", example: "Quel est ton projet ?" },
    { id: "fr13p-10", term: "peut-etre", translation: "tal vez", example: "Peut-etre j'irai a Rome." },
    { id: "fr13p-11", term: "certainement", translation: "seguramente", example: "Certainement je t'appellerai." },
    { id: "fr13p-12", term: "j'espere que...", translation: "espero que...", example: "J'espere que tout ira bien." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr13p-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : mes projets",
      intro: "Competencia de LECTURA. Lee DOS textos en frances y responde las preguntas.",
      content: {
        reading:
          "TEXTE 1 - Les projets d'Elena\n" +
          "La semaine prochaine, je ferai un voyage en Sicile. Je serai la-bas pendant cinq jours et je " +
          "verrai toutes les plus belles villes. Le premier jour, j'irai a Palerme, puis je visiterai " +
          "Taormine. J'aurai aussi le temps de me reposer. Certainement je mangerai beaucoup de pates ! " +
          "J'espere qu'il fera beau.\n\n" +
          "TEXTE 2 - Projets pour l'annee prochaine\n" +
          "A : Quels sont tes projets pour l'annee prochaine ? B : J'etudierai plus l'anglais et peut-etre " +
          "je ferai un cours de cuisine. Et toi ? A : Moi, je changerai de travail et j'aurai plus de temps " +
          "pour la famille. B : Que c'est bien ! Tu seras plus heureux. A : Je l'espere !",
        glossary: [
          { term: "je ferai un voyage", translation: "hare un viaje" },
          { term: "je serai la-bas", translation: "estare alli" },
          { term: "je verrai / je visiterai", translation: "vere / visitare" },
          { term: "j'aurai le temps", translation: "tendre el tiempo" },
          { term: "le projet", translation: "el plan" },
          { term: "certainement / peut-etre", translation: "seguramente / tal vez" },
          { term: "je changerai de travail", translation: "cambiare de trabajo" },
          { term: "j'espere que", translation: "espero que" },
        ],
        keyPhrases: [
          "El futur simple se usa para planes mas LEJANOS, formales o predicciones -- el futur proche (aller+infinitivo) es para planes CERCANOS y seguros.",
          "Verbos IRREGULARES clave: etre->serai, avoir->aurai, aller->irai, faire->ferai, voir->verrai.",
        ],
        check: [
          { prompt: "T1 : Ou ira Elena la semaine prochaine ?", choices: ["En Sicile", "En Sardaigne", "En France"], answer: 0 },
          { prompt: "T1 : Combien de jours sera-t-elle la-bas ?", choices: ["Cinq jours", "Trois jours", "Une semaine"], answer: 0 },
          { prompt: "T1 : Qu'est-ce qu'elle fera le premier jour ?", choices: ["Elle ira a Palerme", "Elle visitera Taormine", "Elle se reposera"], answer: 0 },
          { prompt: "T2 : Qu'est-ce que B fera l'annee prochaine ?", choices: ["Il etudiera l'anglais", "Il changera de travail", "Il fera un voyage"], answer: 0 },
          { prompt: "T2 : Qu'est-ce que A fera l'annee prochaine ?", choices: ["Il changera de travail", "Il etudiera l'anglais", "Il fera un cours"], answer: 0 },
          { prompt: "T2 : Comment sera A ?", choices: ["Plus heureux", "Plus fatigue", "Plus triste"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr13p-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : le futur",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "demain / la semaine prochaine", translation: "manana / la semana que viene" },
        { term: "l'annee prochaine", translation: "el ano que viene" },
        { term: "je serai / j'aurai", translation: "sere / tendre" },
        { term: "j'irai / je ferai", translation: "ire / hare" },
        { term: "je verrai", translation: "vere" },
        { term: "le projet", translation: "el plan" },
        { term: "peut-etre / certainement", translation: "tal vez / seguramente" },
        { term: "j'espere que...", translation: "espero que..." },
      ],
      activities: [
        {
          id: "fr13p-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "je serai", right: "sere" },
            { left: "j'aurai", right: "tendre" },
            { left: "j'irai", right: "ire" },
            { left: "je ferai", right: "hare" },
          ] },
        },
        {
          id: "fr13p-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "je verrai", right: "vere" },
            { left: "demain", right: "manana" },
            { left: "la semaine prochaine", right: "la semana que viene" },
            { left: "peut-etre", right: "tal vez" },
          ] },
        },
        {
          id: "fr13p-vocab-a3", type: "cloze",
          prompt: "Completa (yo): 'Demain j'___ au marche.' (aller, futuro)",
          payload: { answer: "irai" },
          explain: "aller -> futuro irregolare 'irai'.",
        },
        {
          id: "fr13p-vocab-a4", type: "cloze",
          prompt: "Completa (yo): 'L'annee prochaine j'___ plus.' (etudier, futuro)",
          payload: { answer: "etudierai" },
          explain: "etudier -> futuro regular 'etudierai'.",
        },
        {
          id: "fr13p-vocab-a5", type: "cloze",
          prompt: "Completa (yo): 'Je ___ heureux.' (etre, futuro)",
          payload: { answer: "serai" },
          explain: "etre -> futuro irregolare 'serai'.",
        },
        {
          id: "fr13p-vocab-a6", type: "multiple_choice",
          prompt: "Cual es el futuro de 'avoir' (yo)?",
          payload: { choices: ["avoirai", "aurai", "averai"], answer: 1 },
          explain: "avoir -> futuro irregolare 'aurai'.",
        },
        {
          id: "fr13p-vocab-a7", type: "multiple_choice",
          prompt: "Como se dice 'hare un viaje'?",
          payload: { choices: ["Je fais un voyage.", "Je ferai un voyage.", "Je faisait un voyage."], answer: 1 },
          explain: "faire -> futuro irregolare 'ferai'.",
        },
        {
          id: "fr13p-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["en", "Je", "Sicile", "ferai", "un", "voyage"], answer: ["Je", "ferai", "un", "voyage", "en", "Sicile"] },
          explain: "'Je ferai un voyage en Sicile'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr13p-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : le futur simple",
      intro: "Competencia de GRAMATICA. Aprende las terminaciones del futuro simple y los irregulares mas usados.",
      grammar: {
        title: "Le futur simple",
        chart: {
          title: "FUTUR SIMPLE",
          maps: "infinitivo + terminaciones; irregulares cambian la raiz",
          groups: [
            {
              label: "REGULAR (-er/-ir)", color: "rose",
              forms: [
                { form: "PARLER -> PARLERAI", subjects: "hablar -> hablare" },
                { form: "FINIR -> FINIRAI", subjects: "terminar -> terminare" },
              ],
            },
            {
              label: "IRREGULARES", color: "green",
              forms: [
                { form: "ETRE -> SERAI", subjects: "ser/estar -> sere" },
                { form: "AVOIR -> AURAI", subjects: "tener -> tendre" },
                { form: "ALLER -> IRAI", subjects: "ir -> ire" },
                { form: "FAIRE -> FERAI", subjects: "hacer -> hare" },
              ],
            },
          ],
        },
        form: "infinitivo (sin -e final en -re) + -ai/-as/-a/-ons/-ez/-ont",
        desc: "El futur simple se usa para planes mas lejanos, formales o predicciones (a diferencia del futur proche, que es para planes cercanos y seguros). Los verbos regulares usan el INFINITIVO completo como raiz (parler->parlerai), pero varios verbos muy frecuentes tienen una raiz irregular: etre->SER-, avoir->AUR-, aller->IR-, faire->FER-, voir->VERR-.",
        rule: "Terminaciones del futur simple (todas las conjugaciones): je -AI, tu -AS, il/elle -A, nous -ONS, vous -EZ, ils -ONT. Regular: parler -> parlerai, parleras, parlera, parlerons, parlerez, parleront. Irregulares de raiz: etre->ser-, avoir->aur-, aller->ir-, faire->fer-, voir->verr-.",
        examples: ["Demain j'etudierai l'anglais.", "Il fera beau.", "Nous irons en vacances ensemble.", "Ils feront un long voyage."],
        explain: { tr: ["Manana estudiare ingles.", "Hara buen tiempo.", "Iremos de vacaciones juntos.", "Haran un viaje largo."] },
        mistakes: [
          { wrong: "Je etreai heureux.", right: "Je serai heureux." },
          { wrong: "Nous faisrons un voyage.", right: "Nous ferons un voyage." },
          { wrong: "Tu allras demain.", right: "Tu iras demain." },
        ],
      },
      activities: [
        {
          id: "fr13p-gram-a1", type: "cloze",
          prompt: "Completa (yo): 'Demain j'___ en vacances.' (aller, futuro)",
          payload: { answer: "irai" },
          explain: "aller -> 'irai'.",
        },
        {
          id: "fr13p-gram-a2", type: "cloze",
          prompt: "Completa (ella): 'Elle ___ heureuse.' (etre, futuro)",
          payload: { answer: "sera" },
          explain: "etre -> elle sera.",
        },
        {
          id: "fr13p-gram-a3", type: "cloze",
          prompt: "Completa (nosotros): 'Nous ___ un voyage.' (faire, futuro)",
          payload: { answer: "ferons" },
          explain: "faire -> nous ferons.",
        },
        {
          id: "fr13p-gram-a4", type: "multiple_choice",
          prompt: "Cual es el futuro de 'voir' (yo)?",
          payload: { choices: ["verrai", "voirai", "veraii"], answer: 0 },
          explain: "voir -> futuro irregolare 'verrai'.",
        },
        {
          id: "fr13p-gram-a5", type: "multiple_choice",
          prompt: "Cual es el futuro de 'avoir' (tu)?",
          payload: { choices: ["auras", "avoiras", "avras"], answer: 0 },
          explain: "avoir -> tu auras.",
        },
        {
          id: "fr13p-gram-a6", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Il fera beau demain.", "Il ferera beau demain.", "Il faisra beau demain."], answer: 0 },
          explain: "faire -> il fera (3a persona futuro).",
        },
        {
          id: "fr13p-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["en", "Nous", "ensemble", "vacances", "irons"], answer: ["Nous", "irons", "en", "vacances", "ensemble"] },
          explain: "'Nous irons en vacances ensemble'.",
        },
        {
          id: "fr13p-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["un", "Ils", "long", "feront", "voyage"], answer: ["Ils", "feront", "un", "long", "voyage"] },
          explain: "'Ils feront un long voyage'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr13p-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : tes projets",
      intro: "Competencia de ESCRITURA. Cuenta tus planes futuros, frase por frase.",
      activities: [
        {
          id: "fr13p-write-a1", type: "word_bank",
          prompt: "1. Di que manana iras de vacaciones:",
          payload: { words: ["vacances", "Demain", "irai", "en", "j'"], answer: ["Demain", "j'", "irai", "en", "vacances"] },
        },
        {
          id: "fr13p-write-a2", type: "word_bank",
          prompt: "2. Di que seras feliz:",
          payload: { words: ["heureux", "Je", "serai"], answer: ["Je", "serai", "heureux"] },
        },
        {
          id: "fr13p-write-a3", type: "word_bank",
          prompt: "3. Di que haran un viaje (ils):",
          payload: { words: ["un", "Ils", "voyage", "feront"], answer: ["Ils", "feront", "un", "voyage"] },
        },
        {
          id: "fr13p-write-a4", type: "word_bank",
          prompt: "4. Di que tendras mas tiempo (tu):",
          payload: { words: ["temps", "Tu", "plus", "auras", "de"], answer: ["Tu", "auras", "plus", "de", "temps"] },
        },
        {
          id: "fr13p-write-a5", type: "word_bank",
          prompt: "5. Pregunta cuales son sus planes (tes, informal):",
          payload: { words: ["sont", "Quels", "projets", "tes"], answer: ["Quels", "sont", "tes", "projets"] },
        },
        {
          id: "fr13p-write-a6", type: "multiple_choice",
          prompt: "6. El futuro de 'etre' para 'nous' es:",
          payload: { choices: ["serons", "etrons", "sommes"], answer: 0 },
        },
        {
          id: "fr13p-write-a7", type: "multiple_choice",
          prompt: "7. Cual es correcto?",
          payload: { choices: ["Je verrai mes amis demain.", "Je voirai mes amis demain.", "Je vois mes amis demain futur."], answer: 0 },
        },
        {
          id: "fr13p-write-a8", type: "multiple_choice",
          prompt: "8. 'Nous ferons un voyage' significa:",
          payload: { choices: ["Haremos un viaje", "Hicimos un viaje", "Hacemos un viaje"], answer: 0 },
        },
      ],
    },
  ],
};
