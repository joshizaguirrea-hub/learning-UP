/**
 * data/units/fr3-routine.js — Unidad A1 fr-FR "La routine" (rutina + verbos pronominales).
 *
 * Datos PUROS. term = frances (meta), translation = espanol (L1 del alumno).
 */

export const FR3_ROUTINE = {
  id: "fr3-routine",
  language: "fr",
  level: "A1",
  title: "La routine",
  subtitle: "Contar tu dia y usar los verbos pronominales",

  cando: [
    "Puedo contar lo que hago cada dia.",
    "Puedo decir la hora a la que hago las cosas.",
    "Puedo usar los verbos pronominales (se lever, se coucher).",
    "Puedo conjugar los verbos en -ER en presente.",
  ],

  vocab: [
    { id: "fr3r-1", term: "se lever", translation: "levantarse", example: "Je me leve a sept heures." },
    { id: "fr3r-2", term: "se coucher", translation: "acostarse", example: "Je me couche a onze heures." },
    { id: "fr3r-3", term: "se reveiller", translation: "despertarse", example: "Elle se reveille tot." },
    { id: "fr3r-4", term: "travailler", translation: "trabajar", example: "Je travaille le matin." },
    { id: "fr3r-5", term: "manger", translation: "comer", example: "Nous mangeons a midi." },
    { id: "fr3r-6", term: "le matin", translation: "la manana", example: "Le matin, je bois un cafe." },
    { id: "fr3r-7", term: "l'apres-midi", translation: "la tarde", example: "L'apres-midi, j'etudie." },
    { id: "fr3r-8", term: "le soir", translation: "la noche (tarde-noche)", example: "Le soir, je regarde la tele." },
    { id: "fr3r-9", term: "tous les jours", translation: "todos los dias", example: "Je cours tous les jours." },
    { id: "fr3r-10", term: "tot / tard", translation: "temprano / tarde", example: "Il arrive toujours tard." },
    { id: "fr3r-11", term: "l'heure", translation: "la hora", example: "Quelle heure est-il ?" },
    { id: "fr3r-12", term: "d'abord / ensuite", translation: "primero / luego", example: "D'abord je mange, ensuite je sors." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr3r-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : une journee normale",
      intro: "Competencia de LECTURA. Lee DOS textos sobre la rutina diaria y responde.",
      content: {
        reading:
          "TEXTE 1 - La journee de Paul\n" +
          "Je me reveille a six heures et demie. D'abord, je prends une douche et je bois un cafe. " +
          "Je travaille de huit heures a cinq heures. A midi, je mange avec mes collegues. " +
          "Le soir, je rentre a la maison et je regarde un film. Je me couche vers onze heures.\n\n" +
          "TEXTE 2 - Une conversation\n" +
          "A : Tu te leves tot ? B : Oui, je me leve a six heures. Et toi ? " +
          "A : Moi, je me leve tard, a neuf heures. Je travaille l'apres-midi. " +
          "B : Et le week-end ? A : Le week-end, je ne travaille pas. Je me repose !",
        glossary: [
          { term: "je me reveille", translation: "me despierto" },
          { term: "d'abord / ensuite", translation: "primero / luego" },
          { term: "je prends une douche", translation: "me ducho" },
          { term: "de... a...", translation: "de... a... (horario)" },
          { term: "je rentre", translation: "vuelvo (a casa)" },
          { term: "vers", translation: "hacia / sobre (una hora)" },
          { term: "je me repose", translation: "descanso" },
          { term: "le week-end", translation: "el fin de semana" },
        ],
        keyPhrases: [
          "Fijate en las HORAS de cada actividad.",
          "En el Texto 2, compara las dos rutinas.",
        ],
        check: [
          { prompt: "T1 : A quelle heure Paul se reveille-t-il ?", choices: ["A six heures et demie", "A huit heures", "A onze heures"], answer: 0 },
          { prompt: "T1 : Avec qui mange-t-il a midi ?", choices: ["Avec sa famille", "Avec ses collegues", "Seul"], answer: 1 },
          { prompt: "T1 : Que fait Paul le soir ?", choices: ["Il travaille", "Il regarde un film", "Il court"], answer: 1 },
          { prompt: "T2 : A quelle heure se leve la personne A ?", choices: ["A six heures", "A neuf heures", "A midi"], answer: 1 },
          { prompt: "T2 : Quand travaille la personne A ?", choices: ["Le matin", "L'apres-midi", "Le soir"], answer: 1 },
          { prompt: "T2 : Que fait la personne A le week-end ?", choices: ["Elle travaille", "Elle se repose", "Elle etudie"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr3r-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : la journee et les heures",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "se lever / se coucher", translation: "levantarse / acostarse" },
        { term: "se reveiller", translation: "despertarse" },
        { term: "travailler / etudier", translation: "trabajar / estudiar" },
        { term: "le matin / l'apres-midi / le soir", translation: "la manana / la tarde / la noche" },
        { term: "tot / tard", translation: "temprano / tarde" },
        { term: "tous les jours", translation: "todos los dias" },
        { term: "d'abord / ensuite", translation: "primero / luego" },
        { term: "quelle heure est-il ?", translation: "que hora es?" },
      ],
      activities: [
        {
          id: "fr3r-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "se lever", right: "levantarse" },
            { left: "se coucher", right: "acostarse" },
            { left: "travailler", right: "trabajar" },
            { left: "manger", right: "comer" },
          ] },
        },
        {
          id: "fr3r-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "le matin", right: "la manana" },
            { left: "le soir", right: "la noche" },
            { left: "tot", right: "temprano" },
            { left: "tard", right: "tarde" },
          ] },
        },
        {
          id: "fr3r-vocab-a3", type: "cloze",
          prompt: "Completa: 'Je me ___ a sept heures.' (me levanto)",
          payload: { answer: "leve" },
          explain: "'Se lever' con 'je' -> 'je me leve'.",
        },
        {
          id: "fr3r-vocab-a4", type: "cloze",
          prompt: "Completa: 'Le ___, je regarde la tele.' (la noche)",
          payload: { answer: "soir" },
          explain: "'Le soir' = la tarde-noche.",
        },
        {
          id: "fr3r-vocab-a5", type: "cloze",
          prompt: "Completa: 'Je cours tous les ___.' (dias)",
          payload: { answer: "jours" },
          explain: "'Tous les jours' = todos los dias.",
        },
        {
          id: "fr3r-vocab-a6", type: "multiple_choice",
          prompt: "Que significa 'se reveiller'?",
          payload: { choices: ["acostarse", "despertarse", "ducharse"], answer: 1 },
          explain: "'Se reveiller' = despertarse (abrir los ojos).",
        },
        {
          id: "fr3r-vocab-a7", type: "multiple_choice",
          prompt: "Como preguntas la hora?",
          payload: { choices: ["Quel age as-tu ?", "Quelle heure est-il ?", "Ou es-tu ?"], answer: 1 },
          explain: "'Quelle heure est-il ?' = que hora es?",
        },
        {
          id: "fr3r-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["tot", "me", "Je", "leve"], answer: ["Je", "me", "leve", "tot"] },
          explain: "'Je me leve tot' = me levanto temprano.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr3r-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : les verbes pronominaux et -ER",
      intro: "Competencia de GRAMATICA. El pronombre va ANTES del verbo, no pegado al final.",
      grammar: {
        title: "Verbes pronominaux + verbes en -ER",
        chart: {
          title: "SE LEVER / PARLER",
          maps: "Rutina diaria en presente",
          groups: [
            {
              label: "SE LEVER (pronominal)", color: "purple",
              forms: [
                { form: "je ME leve", subjects: "yo me levanto" },
                { form: "tu TE leves", subjects: "tu te levantas" },
                { form: "il/elle SE leve", subjects: "el/ella se levanta" },
                { form: "nous NOUS levons", subjects: "nosotros nos levantamos" },
                { form: "ils/elles SE levent", subjects: "ellos se levantan" },
              ],
            },
            {
              label: "PARLER (-ER regular)", color: "blue",
              forms: [
                { form: "-E", subjects: "je parle" },
                { form: "-ES", subjects: "tu parles" },
                { form: "-E", subjects: "il/elle parle" },
                { form: "-ONS", subjects: "nous parlons" },
                { form: "-ENT", subjects: "ils/elles parlent (muda)" },
              ],
            },
          ],
        },
        form: "je *me* leve / tu *te* leves / il *se* leve  ·  je parl*e* / nous parl*ons*",
        desc: "Para contar tu rutina: a que hora haces cada cosa y que haces cada dia.",
        rule: "En frances el pronombre va DELANTE del verbo: 'je me leve', nunca 'je leve me'. Es al reves que en espanol, donde se pega al infinitivo ('levantarme'). Ojo: la terminacion -ENT de ellos/ellas NO se pronuncia: 'ils parlent' suena igual que 'il parle'.",
        examples: ["Je me leve a sept heures.", "Nous nous couchons tard.", "Elle travaille le matin.", "Ils mangent a midi."],
        explain: { tr: ["Me levanto a las siete.", "Nos acostamos tarde.", "Ella trabaja por la manana.", "Ellos comen al mediodia."] },
        mistakes: [
          { wrong: "Je leve a sept heures.", right: "Je me leve a sept heures." },
          { wrong: "Nous se couchons tard.", right: "Nous nous couchons tard." },
          { wrong: "Elle travaillent le matin.", right: "Elle travaille le matin." },
        ],
      },
      activities: [
        {
          id: "fr3r-gram-a1", type: "cloze",
          prompt: "Completa: 'Je ___ leve a six heures.' (pronombre)",
          payload: { answer: "me" },
          explain: "Con 'je' el pronombre es 'me'.",
        },
        {
          id: "fr3r-gram-a2", type: "cloze",
          prompt: "Completa: 'Tu ___ couches tard.' (pronombre)",
          payload: { answer: "te" },
          explain: "Con 'tu' el pronombre es 'te'.",
        },
        {
          id: "fr3r-gram-a3", type: "cloze",
          prompt: "Completa: 'Elle ___ reveille tot.' (pronombre)",
          payload: { answer: "se" },
          explain: "Con il/elle el pronombre es 'se'.",
        },
        {
          id: "fr3r-gram-a4", type: "cloze",
          prompt: "Completa el verbo -ER: 'Nous ___ a midi.' (manger -> comemos)",
          payload: { answer: "mangeons" },
          explain: "'Manger' con 'nous' -> 'mangeons' (la e se mantiene antes de -ons).",
        },
        {
          id: "fr3r-gram-a5", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Je leve a sept heures.", "Je me leve a sept heures.", "Je leve me a sept heures."], answer: 1 },
          explain: "El pronombre va DELANTE del verbo: je me leve.",
        },
        {
          id: "fr3r-gram-a6", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Ils mange a midi.", "Ils mangent a midi.", "Ils mangeons a midi."], answer: 1 },
          explain: "Con ils/elles la terminacion es -ENT (aunque no suene).",
        },
        {
          id: "fr3r-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["couchons", "tard", "nous", "Nous"], answer: ["Nous", "nous", "couchons", "tard"] },
          explain: "Con 'nous' el pronombre tambien es 'nous': Nous nous couchons.",
        },
        {
          id: "fr3r-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["matin", "le", "travaille", "Elle"], answer: ["Elle", "travaille", "le", "matin"] },
          explain: "Orden: sujeto + verbo + momento del dia.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr3r-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : raconte ta journee",
      intro: "Competencia de ESCRITURA. Cuenta tu dia, frase por frase.",
      activities: [
        {
          id: "fr3r-write-a1", type: "word_bank",
          prompt: "1. Di a que hora te levantas:",
          payload: { words: ["sept", "me", "Je", "a", "leve", "heures"], answer: ["Je", "me", "leve", "a", "sept", "heures"] },
        },
        {
          id: "fr3r-write-a2", type: "word_bank",
          prompt: "2. Di que haces por la manana:",
          payload: { words: ["matin", "travaille", "Le", "je"], answer: ["Le", "matin", "je", "travaille"] },
        },
        {
          id: "fr3r-write-a3", type: "word_bank",
          prompt: "3. Di a que hora comes:",
          payload: { words: ["midi", "mange", "Je", "a"], answer: ["Je", "mange", "a", "midi"] },
        },
        {
          id: "fr3r-write-a4", type: "word_bank",
          prompt: "4. Di que haces por la noche:",
          payload: { words: ["soir", "regarde", "Le", "la", "je", "tele"], answer: ["Le", "soir", "je", "regarde", "la", "tele"] },
        },
        {
          id: "fr3r-write-a5", type: "word_bank",
          prompt: "5. Di a que hora te acuestas:",
          payload: { words: ["couche", "onze", "Je", "a", "me", "heures"], answer: ["Je", "me", "couche", "a", "onze", "heures"] },
        },
        {
          id: "fr3r-write-a6", type: "multiple_choice",
          prompt: "6. Como dices 'todos los dias estudio'?",
          payload: { choices: ["Tous les jours j'etudie.", "Tout le jour j'etudie.", "Toutes les jours j'etudie."], answer: 0 },
        },
        {
          id: "fr3r-write-a7", type: "multiple_choice",
          prompt: "7. Te preguntan 'Tu te leves tot ?' Respondes:",
          payload: { choices: ["Oui, je leve tot.", "Oui, je me leve tot.", "Oui, me leve tot."], answer: 1 },
        },
        {
          id: "fr3r-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase ordena bien el dia?",
          payload: { choices: ["D'abord je mange, ensuite je sors.", "Ensuite je mange, d'abord je sors.", "D'abord ensuite je mange."], answer: 0 },
        },
      ],
    },
  ],
};
