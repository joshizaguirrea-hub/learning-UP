/**
 * data/units/fr11-ville.js — Unite A2 francais "En ville" (l'imperatif pour
 * donner des indications + prepositions de lieu).
 *
 * Datos PUROS. term = frances (meta), translation = espanol (L1 del alumno).
 */

export const FR11_VILLE = {
  id: "fr11-ville",
  language: "fr",
  level: "A2",
  title: "En ville",
  subtitle: "El imperativo (tu/vous) para dar direcciones + preposiciones de lugar",

  cando: [
    "Puedo preguntar y dar direcciones en frances.",
    "Puedo usar el imperativo (tu/vous) para indicar un camino: tourne, continuez, prends.",
    "Puedo usar preposiciones de lugar (a droite, devant, derriere, pres de).",
    "Puedo describir donde esta algo en la ciudad con 'il y a'.",
  ],

  vocab: [
    { id: "fr11v-1", term: "tourne (tourner)", translation: "gira/dobla", example: "Tourne a droite." },
    { id: "fr11v-2", term: "continue (continuer)", translation: "sigue/continua", example: "Continue tout droit." },
    { id: "fr11v-3", term: "prends (prendre)", translation: "toma", example: "Prends la premiere rue a gauche." },
    { id: "fr11v-4", term: "a droite", translation: "a la derecha", example: "La banque est a droite." },
    { id: "fr11v-5", term: "a gauche", translation: "a la izquierda", example: "Tourne a gauche au feu." },
    { id: "fr11v-6", term: "tout droit", translation: "derecho (recto)", example: "Continuez tout droit jusqu'a la place." },
    { id: "fr11v-7", term: "le carrefour", translation: "el cruce", example: "Au carrefour, tourne a droite." },
    { id: "fr11v-8", term: "le feu", translation: "el semaforo", example: "Au feu, continue tout droit." },
    { id: "fr11v-9", term: "pres de", translation: "cerca de", example: "La pharmacie est pres de la banque." },
    { id: "fr11v-10", term: "devant", translation: "delante de", example: "Il y a un parc devant l'ecole." },
    { id: "fr11v-11", term: "derriere", translation: "detras de", example: "Le musee est derriere l'eglise." },
    { id: "fr11v-12", term: "excusez-moi, ou est...?", translation: "disculpe, donde esta...?", example: "Excusez-moi, ou est la gare ?" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr11v-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : comment aller au musee",
      intro: "Competencia de LECTURA. Lee DOS textos en frances y responde las preguntas.",
      content: {
        reading:
          "TEXTE 1 - Comment aller au musee\n" +
          "\"Excusez-moi, ou est le musee ?\" \"Alors, d'ici continuez tout droit pendant deux rues. Au " +
          "carrefour, tournez a droite. Ensuite, prenez la premiere rue a gauche. Le musee est devant la " +
          "place, pres de la banque. Vous ne pouvez pas vous tromper !\" \"Merci beaucoup !\" \"De rien, " +
          "bonne visite !\"\n\n" +
          "TEXTE 2 - Une nouvelle ville\n" +
          "Aujourd'hui je suis arrive dans une nouvelle ville et je ne connais rien. Pres de mon hotel il y " +
          "a une petite pharmacie et, derriere l'hotel, il y a un beau parc. Pour aller au centre, je dois " +
          "tourner a gauche au feu puis continuer tout droit. Demain je veux visiter le musee qui est " +
          "devant la gare.",
        glossary: [
          { term: "continuez tout droit", translation: "sigan derecho" },
          { term: "tournez a droite/gauche", translation: "giren a la derecha/izquierda" },
          { term: "le carrefour", translation: "el cruce" },
          { term: "pres de / devant / derriere", translation: "cerca de / delante de / detras de" },
          { term: "excusez-moi, ou est...?", translation: "disculpe, donde esta?" },
          { term: "vous ne pouvez pas vous tromper !", translation: "no pueden equivocarse!" },
          { term: "je ne connais rien", translation: "no conozco nada" },
          { term: "je dois tourner", translation: "debo girar" },
        ],
        keyPhrases: [
          "El imperativo (tu) de los verbos -ER pierde la -s: tourne (no tournes).",
          "'Il y a' para decir que HAY algo en un lugar (singular y plural, no cambia).",
        ],
        check: [
          { prompt: "T1 : Qu'est-ce que la personne doit faire au carrefour ?", choices: ["Tourner a droite", "Tourner a gauche", "Continuer tout droit"], answer: 0 },
          { prompt: "T1 : Ou se trouve le musee ?", choices: ["Devant la place", "Derriere la banque", "Pres du feu"], answer: 0 },
          { prompt: "T1 : Combien de rues doit-elle faire tout droit au debut ?", choices: ["Deux rues", "Trois rues", "Une rue"], answer: 0 },
          { prompt: "T2 : Qu'est-ce qu'il y a pres de l'hotel ?", choices: ["Une pharmacie", "Un musee", "Une banque"], answer: 0 },
          { prompt: "T2 : Qu'est-ce qu'il y a derriere l'hotel ?", choices: ["Un parc", "Une eglise", "Une ecole"], answer: 0 },
          { prompt: "T2 : Ou se trouve le musee qu'elle veut visiter ?", choices: ["Devant la gare", "Derriere le parc", "Pres de la pharmacie"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr11v-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : les indications",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "tourne / continue", translation: "gira / sigue" },
        { term: "prends", translation: "toma" },
        { term: "a droite / a gauche", translation: "a la derecha / izquierda" },
        { term: "le carrefour / le feu", translation: "el cruce / el semaforo" },
        { term: "pres de / devant", translation: "cerca de / delante de" },
        { term: "derriere", translation: "detras de" },
        { term: "excusez-moi, ou est...?", translation: "disculpe, donde esta?" },
        { term: "vous ne pouvez pas vous tromper!", translation: "no pueden equivocarse!" },
      ],
      activities: [
        {
          id: "fr11v-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "tourne", right: "gira" },
            { left: "continue", right: "sigue" },
            { left: "prends", right: "toma" },
            { left: "a droite", right: "a la derecha" },
          ] },
        },
        {
          id: "fr11v-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "a gauche", right: "a la izquierda" },
            { left: "le carrefour", right: "el cruce" },
            { left: "le feu", right: "el semaforo" },
            { left: "pres de", right: "cerca de" },
          ] },
        },
        {
          id: "fr11v-vocab-a3", type: "cloze",
          prompt: "Completa: '___ a droite au feu.' (tourner, imperativo tu)",
          payload: { answer: "Tourne" },
          explain: "tourner -> imperativo tu: 'tourne' (sin -s).",
        },
        {
          id: "fr11v-vocab-a4", type: "cloze",
          prompt: "Completa: '___ tout droit.' (continuer, imperativo tu)",
          payload: { answer: "Continue" },
          explain: "continuer -> imperativo tu: 'continue'.",
        },
        {
          id: "fr11v-vocab-a5", type: "cloze",
          prompt: "Completa: 'La pharmacie est ___ de la banque.' (cerca)",
          payload: { answer: "pres" },
          explain: "'pres de' = cerca de.",
        },
        {
          id: "fr11v-vocab-a6", type: "multiple_choice",
          prompt: "Como preguntas 'disculpe, donde esta la estacion'?",
          payload: { choices: ["Excusez-moi, ou est la gare ?", "Ou va la gare ?", "Excusez-moi la gare ?"], answer: 0 },
          explain: "'Excusez-moi, ou est...?' es la forma cortes.",
        },
        {
          id: "fr11v-vocab-a7", type: "multiple_choice",
          prompt: "Que significa 'devant'?",
          payload: { choices: ["detras de", "delante de", "al lado de"], answer: 1 },
          explain: "'devant' = delante de.",
        },
        {
          id: "fr11v-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["au", "Tourne", "carrefour", "droite", "a"], answer: ["Tourne", "a", "droite", "au", "carrefour"] },
          explain: "'Tourne a droite au carrefour'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr11v-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : l'imperatif",
      intro: "Competencia de GRAMATICA. Aprende a dar indicaciones usando el imperativo.",
      grammar: {
        title: "L'imperatif (tu)",
        chart: {
          title: "IMPERATIF (tu)",
          maps: "presente sin sujeto; -ER pierde la -s",
          groups: [
            {
              label: "VERBOS -ER", color: "rose",
              forms: [
                { form: "TOURNER -> TOURNE", subjects: "(sin -s!)" },
                { form: "CONTINUER -> CONTINUE", subjects: "(sin -s!)" },
              ],
            },
            {
              label: "IRREGULARES", color: "green",
              forms: [
                { form: "ALLER -> VA", subjects: "ir -> ve" },
                { form: "PRENDRE -> PRENDS", subjects: "(si lleva -s)" },
              ],
            },
          ],
        },
        form: "imperativo (tu): presente sin sujeto; verbos -ER pierden la -s final",
        desc: "Para dar instrucciones a alguien que tratas de 'tu' se usa el IMPERATIVO: es igual al presente de indicativo PERO SIN EL SUJETO, y los verbos -ER pierden la -S final en la forma 'tu' (tu tournes -> tourne). Los verbos -RE/-IR SI mantienen la -s (tu prends -> prends). 'Aller' es irregular: va.",
        rule: "Imperatif (tu): verbos -ER -> presente sin sujeto, SIN la -s (tourner: tu tournes -> Tourne!). Verbos -RE/-IR -> presente sin sujeto, CON la -s (prendre: tu prends -> Prends!). Irregular: aller -> va (sin -s tampoco). Imperatif (vous): identico al presente de 'vous' (Tournez!, Continuez!, Prenez!).",
        examples: ["Tourne a gauche.", "Continue tout droit.", "Prends la premiere rue.", "Va au carrefour."],
        explain: { tr: ["Gira a la izquierda.", "Sigue derecho.", "Toma la primera calle.", "Ve al cruce."] },
        mistakes: [
          { wrong: "Tournes a gauche.", right: "Tourne a gauche." },
          { wrong: "Prend la rue.", right: "Prends la rue." },
          { wrong: "Vas au carrefour.", right: "Va au carrefour." },
        ],
      },
      activities: [
        {
          id: "fr11v-gram-a1", type: "cloze",
          prompt: "Completa: '___ a gauche.' (tourner, imperativo)",
          payload: { answer: "Tourne" },
          explain: "tourner -> 'tourne'.",
        },
        {
          id: "fr11v-gram-a2", type: "cloze",
          prompt: "Completa: '___ tout droit jusqu'au feu.' (continuer, imperativo)",
          payload: { answer: "Continue" },
          explain: "continuer -> 'continue'.",
        },
        {
          id: "fr11v-gram-a3", type: "cloze",
          prompt: "Completa: '___ la deuxieme rue.' (prendre, imperativo)",
          payload: { answer: "Prends" },
          explain: "prendre -> 'prends' (con -s).",
        },
        {
          id: "fr11v-gram-a4", type: "multiple_choice",
          prompt: "Cual es el imperativo (tu) de 'aller'?",
          payload: { choices: ["vas", "va", "allez"], answer: 1 },
          explain: "'aller' -> imperativo irregular 'va'.",
        },
        {
          id: "fr11v-gram-a5", type: "multiple_choice",
          prompt: "Cual es el imperativo (tu) de 'tourner'?",
          payload: { choices: ["tournes", "tourne", "tourner"], answer: 1 },
          explain: "-ER pierde la -s: 'tourne'.",
        },
        {
          id: "fr11v-gram-a6", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Tourne a droite et continue tout droit.", "Tournes a droite et continues tout droit.", "Tourner a droite et continuer tout droit."], answer: 0 },
          explain: "Imperativo: 'tourne' y 'continue', sin -s.",
        },
        {
          id: "fr11v-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["premiere", "Prends", "gauche", "la", "a"], answer: ["Prends", "la", "premiere", "a", "gauche"] },
          explain: "'Prends la premiere a gauche'.",
        },
        {
          id: "fr11v-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["la", "Continue", "place", "jusqu'a"], answer: ["Continue", "jusqu'a", "la", "place"] },
          explain: "'Continue jusqu'a la place'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr11v-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : donne des indications",
      intro: "Competencia de ESCRITURA. Da indicaciones para llegar a un lugar, frase por frase.",
      activities: [
        {
          id: "fr11v-write-a1", type: "word_bank",
          prompt: "1. Di 'gira a la derecha':",
          payload: { words: ["droite", "Tourne", "a"], answer: ["Tourne", "a", "droite"] },
        },
        {
          id: "fr11v-write-a2", type: "word_bank",
          prompt: "2. Di 'sigue derecho':",
          payload: { words: ["droit", "Continue", "tout"], answer: ["Continue", "tout", "droit"] },
        },
        {
          id: "fr11v-write-a3", type: "word_bank",
          prompt: "3. Di 'toma la primera calle':",
          payload: { words: ["rue", "Prends", "premiere", "la"], answer: ["Prends", "la", "premiere", "rue"] },
        },
        {
          id: "fr11v-write-a4", type: "word_bank",
          prompt: "4. Pregunta donde esta el museo:",
          payload: { words: ["le", "Ou", "musee", "est"], answer: ["Ou", "est", "le", "musee"] },
        },
        {
          id: "fr11v-write-a5", type: "word_bank",
          prompt: "5. Di que el parque esta detras de la iglesia:",
          payload: { words: ["Le", "derriere", "parc", "est", "l'eglise"], answer: ["Le", "parc", "est", "derriere", "l'eglise"] },
        },
        {
          id: "fr11v-write-a6", type: "multiple_choice",
          prompt: "6. 'Pres de' significa:",
          payload: { choices: ["lejos de", "cerca de", "encima de"], answer: 1 },
        },
        {
          id: "fr11v-write-a7", type: "multiple_choice",
          prompt: "7. Cual es el imperativo correcto para dar indicaciones a un amigo?",
          payload: { choices: ["Tournes a gauche.", "Tourne a gauche.", "Tourner a gauche."], answer: 1 },
        },
        {
          id: "fr11v-write-a8", type: "multiple_choice",
          prompt: "8. El imperativo (tu) de 'prendre' es:",
          payload: { choices: ["prends", "prend", "prendre"], answer: 0 },
        },
      ],
    },
  ],
};
