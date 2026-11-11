/**
 * data/units/fr12-sante.js — Unite A2 francais "La sante" (devoir + avoir
 * mal a, vocabulaire des symptomes).
 *
 * Datos PUROS. term = frances (meta), translation = espanol (L1 del alumno).
 */

export const FR12_SANTE = {
  id: "fr12-sante",
  language: "fr",
  level: "A2",
  title: "La sante",
  subtitle: "'Devoir' para consejos/obligaciones + 'avoir mal a' para sintomas",

  cando: [
    "Puedo hablar de sintomas usando 'avoir mal a' + parte del cuerpo.",
    "Puedo usar 'devoir' para dar o recibir consejos medicos (dois, doit, devons).",
    "Puedo nombrar partes del cuerpo comunes.",
    "Puedo describir un problema de salud y pedir una consulta.",
  ],

  vocab: [
    { id: "fr12s-1", term: "avoir mal a", translation: "tener dolor de", example: "J'ai mal a la tete." },
    { id: "fr12s-2", term: "la tete", translation: "la cabeza", example: "J'ai mal a la tete." },
    { id: "fr12s-3", term: "le ventre", translation: "el estomago/vientre", example: "J'ai mal au ventre." },
    { id: "fr12s-4", term: "la gorge", translation: "la garganta", example: "J'ai mal a la gorge." },
    { id: "fr12s-5", term: "la fievre", translation: "la fiebre", example: "J'ai de la fievre." },
    { id: "fr12s-6", term: "etre enrhume(e)", translation: "estar resfriado", example: "Je suis enrhume." },
    { id: "fr12s-7", term: "devoir (dois/doit)", translation: "deber (debo/debe)", example: "Tu dois aller chez le medecin." },
    { id: "fr12s-8", term: "le medecin", translation: "el doctor", example: "Le medecin m'a examine." },
    { id: "fr12s-9", term: "la pharmacie", translation: "la farmacia", example: "Je vais a la pharmacie acheter un medicament." },
    { id: "fr12s-10", term: "se reposer", translation: "descansar", example: "Tu dois te reposer un peu." },
    { id: "fr12s-11", term: "prendre un medicament", translation: "tomar un medicamento", example: "Je dois prendre un medicament." },
    { id: "fr12s-12", term: "ne pas se sentir bien", translation: "no sentirse bien", example: "Je ne me sens pas bien aujourd'hui." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr12s-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : chez le medecin",
      intro: "Competencia de LECTURA. Lee DOS textos en frances y responde las preguntas.",
      content: {
        reading:
          "TEXTE 1 - Chez le medecin\n" +
          "\"Bonjour docteur, je ne me sens pas bien.\" \"Qu'est-ce que vous sentez ?\" \"J'ai mal a la gorge " +
          "et un peu de fievre.\" \"Vous avez aussi mal a la tete ?\" \"Oui, un peu.\" \"Je comprends. Vous " +
          "devez vous reposer et boire beaucoup d'eau. Vous devez aussi prendre ce medicament trois fois par " +
          "jour. Si dans trois jours vous n'allez pas mieux, vous devez revenir.\" \"Merci, docteur !\"\n\n" +
          "TEXTE 2 - Un message a une amie\n" +
          "Salut Sara, aujourd'hui je ne vais pas travailler parce que je ne me sens pas bien. J'ai mal au " +
          "ventre et je suis enrhumee. Je pense que je dois aller a la pharmacie acheter un medicament. Si " +
          "demain je ne vais pas mieux, je dois aller chez le medecin. A bientot !",
        glossary: [
          { term: "avoir mal a", translation: "tener dolor de" },
          { term: "j'ai de la fievre", translation: "tengo fiebre" },
          { term: "vous devez vous reposer", translation: "deben descansar" },
          { term: "prendre un medicament", translation: "tomar un medicamento" },
          { term: "je ne me sens pas bien", translation: "no me siento bien" },
          { term: "etre enrhume", translation: "estar resfriado" },
          { term: "aller mieux", translation: "mejorar/estar mejor" },
          { term: "je vais travailler", translation: "voy a trabajar" },
        ],
        keyPhrases: [
          "'Avoir mal a' + parte del cuerpo = tener dolor de X (ojo con la contraccion: a+le=au, a+la=a la).",
          "'Devoir' (dois/dois/doit/devons/devez/doivent) + infinitivo = deber / tener que.",
        ],
        check: [
          { prompt: "T1 : Qu'est-ce que le patient a ?", choices: ["Mal a la gorge et de la fievre", "Mal au ventre", "Un rhume"], answer: 0 },
          { prompt: "T1 : Qu'est-ce que le patient doit faire ?", choices: ["Se reposer et boire de l'eau", "Aller a l'hopital", "Faire du sport"], answer: 0 },
          { prompt: "T1 : Combien de fois par jour doit-il prendre le medicament ?", choices: ["Trois fois", "Deux fois", "Une fois"], answer: 0 },
          { prompt: "T2 : Pourquoi elle ne va pas travailler ?", choices: ["Parce qu'elle ne se sent pas bien", "Parce qu'elle est en vacances", "Parce qu'il pleut"], answer: 0 },
          { prompt: "T2 : Qu'est-ce qui lui fait mal ?", choices: ["Le ventre", "La tete", "La gorge"], answer: 0 },
          { prompt: "T2 : Ou doit-elle aller si elle ne va pas mieux ?", choices: ["Chez le medecin", "A la pharmacie", "A l'ecole"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr12s-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : les symptomes",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "avoir mal a / la tete", translation: "tener dolor de / la cabeza" },
        { term: "le ventre / la gorge", translation: "el estomago / la garganta" },
        { term: "la fievre / etre enrhume", translation: "la fiebre / estar resfriado" },
        { term: "devoir (dois/doit)", translation: "deber (debo/debe)" },
        { term: "le medecin / la pharmacie", translation: "el doctor / la farmacia" },
        { term: "se reposer", translation: "descansar" },
        { term: "prendre un medicament", translation: "tomar un medicamento" },
        { term: "ne pas se sentir bien", translation: "no sentirse bien" },
      ],
      activities: [
        {
          id: "fr12s-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "avoir mal a", right: "tener dolor de" },
            { left: "la tete", right: "la cabeza" },
            { left: "le ventre", right: "el estomago" },
            { left: "la gorge", right: "la garganta" },
          ] },
        },
        {
          id: "fr12s-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "la fievre", right: "la fiebre" },
            { left: "etre enrhume", right: "estar resfriado" },
            { left: "se reposer", right: "descansar" },
            { left: "le medecin", right: "el doctor" },
          ] },
        },
        {
          id: "fr12s-vocab-a3", type: "cloze",
          prompt: "Completa: 'J'ai mal a la ___.' (cabeza)",
          payload: { answer: "tete" },
          explain: "'mal a la tete' = dolor de cabeza.",
        },
        {
          id: "fr12s-vocab-a4", type: "cloze",
          prompt: "Completa: 'Tu ___ aller chez le medecin.' (devoir, tu)",
          payload: { answer: "dois" },
          explain: "devoir -> tu dois.",
        },
        {
          id: "fr12s-vocab-a5", type: "cloze",
          prompt: "Completa: 'J'ai de la ___.' (fiebre)",
          payload: { answer: "fievre" },
          explain: "'la fievre' = la fiebre.",
        },
        {
          id: "fr12s-vocab-a6", type: "multiple_choice",
          prompt: "Como se dice 'me duele el estomago'?",
          payload: { choices: ["J'ai mal au ventre.", "J'ai le ventre.", "Je suis le ventre."], answer: 0 },
          explain: "'avoir mal a' + parte del cuerpo.",
        },
        {
          id: "fr12s-vocab-a7", type: "multiple_choice",
          prompt: "Que significa 'se reposer'?",
          payload: { choices: ["trabajar", "descansar", "comer"], answer: 1 },
          explain: "'se reposer' = descansar.",
        },
        {
          id: "fr12s-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["la", "J'ai", "tete", "mal", "a"], answer: ["J'ai", "mal", "a", "la", "tete"] },
          explain: "'J'ai mal a la tete'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr12s-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : devoir + avoir mal a",
      intro: "Competencia de GRAMATICA. Aprende 'devoir' (consejos/obligaciones) y como hablar de sintomas.",
      grammar: {
        title: "Devoir + avoir mal a",
        chart: {
          title: "DEVOIR",
          maps: "+ infinitivo",
          groups: [
            {
              label: "DEVOIR (presente)", color: "rose",
              forms: [
                { form: "JE DOIS / TU DOIS", subjects: "yo debo / tu debes" },
                { form: "IL/ELLE DOIT", subjects: "el/ella debe" },
                { form: "NOUS DEVONS", subjects: "nosotros debemos" },
                { form: "VOUS DEVEZ / ILS DOIVENT", subjects: "ustedes deben / ellos deben" },
              ],
            },
            {
              label: "AVOIR MAL A", color: "green",
              forms: [
                { form: "AVOIR MAL A + LE -> AU", subjects: "mal au ventre" },
                { form: "AVOIR MAL A + LA -> A LA", subjects: "mal a la tete (sin contraccion)" },
              ],
            },
          ],
        },
        form: "devoir (dois, dois, doit, devons, devez, doivent) + infinitivo = deber/tener que",
        desc: "'Devoir' es un verbo irregular que se usa para dar consejos o hablar de obligaciones: 'tu dois te reposer' (debes descansar). Para hablar de sintomas se usa 'avoir mal a' + parte del cuerpo, con las contracciones: a+le=AU (j'ai mal au ventre), a+la=A LA (j'ai mal a la tete, sin contraer).",
        rule: "Devoir: je dois, tu dois, il/elle doit, nous devons, vous devez, ils/elles doivent + infinitivo. Avoir mal a + parte del cuerpo: 'a' se contrae con 'le' -> 'au' (mal au ventre), pero NO con 'la' (mal a la tete).",
        examples: ["Tu dois boire beaucoup d'eau.", "Il doit aller chez le medecin.", "J'ai mal a la gorge.", "Nous avons mal au ventre."],
        explain: { tr: ["Debes beber mucha agua.", "El debe ir al doctor.", "Tengo dolor de garganta.", "Tenemos dolor de estomago."] },
        mistakes: [
          { wrong: "Tu dois a te reposer.", right: "Tu dois te reposer." },
          { wrong: "J'ai mal a le ventre.", right: "J'ai mal au ventre." },
          { wrong: "Je devoir aller.", right: "Je dois aller." },
        ],
      },
      activities: [
        {
          id: "fr12s-gram-a1", type: "cloze",
          prompt: "Completa: 'Tu ___ te reposer.' (devoir)",
          payload: { answer: "dois" },
          explain: "devoir -> tu dois.",
        },
        {
          id: "fr12s-gram-a2", type: "cloze",
          prompt: "Completa: 'Elle ___ prendre un medicament.' (devoir)",
          payload: { answer: "doit" },
          explain: "devoir -> elle doit.",
        },
        {
          id: "fr12s-gram-a3", type: "cloze",
          prompt: "Completa: 'J'ai mal ___ ventre.' (au, a+le)",
          payload: { answer: "au" },
          explain: "a + le = au.",
        },
        {
          id: "fr12s-gram-a4", type: "multiple_choice",
          prompt: "Como se dice 'me duelen los pies' (les pieds)?",
          payload: { choices: ["J'ai mal aux pieds.", "J'ai mal au pieds.", "Je suis mal pieds."], answer: 0 },
          explain: "a + les = aux (plural).",
        },
        {
          id: "fr12s-gram-a5", type: "multiple_choice",
          prompt: "Cual es la forma correcta para 'nous'?",
          payload: { choices: ["Nous devons nous reposer.", "Nous devez nous reposer.", "Nous doivent nous reposer."], answer: 0 },
          explain: "devoir -> nous devons.",
        },
        {
          id: "fr12s-gram-a6", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Tu dois aller chez le medecin.", "Tu dois a aller chez le medecin.", "Tu devoir aller chez le medecin."], answer: 0 },
          explain: "'dois' + infinito, sin preposicion.",
        },
        {
          id: "fr12s-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["de", "Tu", "l'eau", "dois", "boire"], answer: ["Tu", "dois", "boire", "de", "l'eau"] },
          explain: "'Tu dois boire de l'eau'.",
        },
        {
          id: "fr12s-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["aux", "J'ai", "pieds", "mal"], answer: ["J'ai", "mal", "aux", "pieds"] },
          explain: "'J'ai mal aux pieds'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr12s-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : chez le medecin",
      intro: "Competencia de ESCRITURA. Describe un problema de salud, frase por frase.",
      activities: [
        {
          id: "fr12s-write-a1", type: "word_bank",
          prompt: "1. Di que tienes dolor de cabeza:",
          payload: { words: ["la", "J'ai", "tete", "mal", "a"], answer: ["J'ai", "mal", "a", "la", "tete"] },
        },
        {
          id: "fr12s-write-a2", type: "word_bank",
          prompt: "2. Di que debes descansar:",
          payload: { words: ["reposer", "Je", "me", "dois"], answer: ["Je", "dois", "me", "reposer"] },
        },
        {
          id: "fr12s-write-a3", type: "word_bank",
          prompt: "3. Di que tienes fiebre:",
          payload: { words: ["fievre", "J'ai", "de", "la"], answer: ["J'ai", "de", "la", "fievre"] },
        },
        {
          id: "fr12s-write-a4", type: "word_bank",
          prompt: "4. Di que debe ir al doctor (il):",
          payload: { words: ["medecin", "Il", "chez", "doit", "aller", "le"], answer: ["Il", "doit", "aller", "chez", "le", "medecin"] },
        },
        {
          id: "fr12s-write-a5", type: "word_bank",
          prompt: "5. Pregunta que siente (vous):",
          payload: { words: ["sentez", "Que", "vous"], answer: ["Que", "vous", "sentez"] },
        },
        {
          id: "fr12s-write-a6", type: "multiple_choice",
          prompt: "6. 'J'ai mal au ventre' significa:",
          payload: { choices: ["me duele el estomago", "tengo hambre", "estoy enfermo del corazon"], answer: 0 },
        },
        {
          id: "fr12s-write-a7", type: "multiple_choice",
          prompt: "7. La forma de 'devoir' para 'ils' es:",
          payload: { choices: ["doivent", "doit", "devons"], answer: 0 },
        },
        {
          id: "fr12s-write-a8", type: "multiple_choice",
          prompt: "8. 'Tu dois te reposer' significa:",
          payload: { choices: ["debes trabajar", "debes descansar", "debes comer"], answer: 1 },
        },
      ],
    },
  ],
};
