/**
 * data/units/fr7-tempslibre.js — Unidad A1 fr-FR "Le temps libre" (ocio + faire/aller).
 *
 * Datos PUROS. term = frances (meta), translation = espanol (L1 del alumno).
 */

export const FR7_TEMPSLIBRE = {
  id: "fr7-tempslibre",
  language: "fr",
  level: "A1",
  title: "Le temps libre",
  subtitle: "Hablar de tus aficiones con 'faire' y 'aller'",

  cando: [
    "Puedo decir que hago en mi tiempo libre.",
    "Puedo usar los verbos 'faire' y 'aller'.",
    "Puedo proponer un plan a alguien.",
    "Puedo hablar de deportes y aficiones.",
  ],

  vocab: [
    { id: "fr7t-1", term: "faire", translation: "hacer", example: "Je fais du sport." },
    { id: "fr7t-2", term: "aller", translation: "ir", example: "Je vais au cinema." },
    { id: "fr7t-3", term: "le sport", translation: "el deporte", example: "J'aime le sport." },
    { id: "fr7t-4", term: "la musique", translation: "la musica", example: "J'ecoute de la musique." },
    { id: "fr7t-5", term: "le cinema", translation: "el cine", example: "On va au cinema ?" },
    { id: "fr7t-6", term: "nager", translation: "nadar", example: "Je nage le week-end." },
    { id: "fr7t-7", term: "jouer", translation: "jugar / tocar", example: "Je joue au foot." },
    { id: "fr7t-8", term: "lire", translation: "leer", example: "J'aime lire des romans." },
    { id: "fr7t-9", term: "sortir", translation: "salir", example: "Je sors avec mes amis." },
    { id: "fr7t-10", term: "le week-end", translation: "el fin de semana", example: "Le week-end, je me repose." },
    { id: "fr7t-11", term: "souvent / jamais", translation: "a menudo / nunca", example: "Je vais souvent au parc." },
    { id: "fr7t-12", term: "on y va ?", translation: "vamos?", example: "Il fait beau, on y va ?" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr7t-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : le week-end",
      intro: "Competencia de LECTURA. Lee DOS textos sobre el tiempo libre y responde.",
      content: {
        reading:
          "TEXTE 1 - Le week-end de Sophie\n" +
          "Le samedi matin, je fais du sport : je nage a la piscine. L'apres-midi, je vais au parc " +
          "avec mes amis. Nous jouons au football. Le soir, j'aime lire ou ecouter de la musique. " +
          "Le dimanche, je ne fais rien de special : je me repose a la maison.\n\n" +
          "TEXTE 2 - Faire un plan\n" +
          "A : Qu'est-ce que tu fais ce soir ? B : Rien de special. Pourquoi ? " +
          "A : On va au cinema ? Il y a un bon film. B : Bonne idee ! A quelle heure ? " +
          "A : A huit heures. On se retrouve devant le cinema ? B : D'accord, a ce soir !",
        glossary: [
          { term: "je fais du sport", translation: "hago deporte" },
          { term: "je vais au parc", translation: "voy al parque" },
          { term: "nous jouons au football", translation: "jugamos al futbol" },
          { term: "rien de special", translation: "nada especial" },
          { term: "qu'est-ce que tu fais ?", translation: "que haces?" },
          { term: "on va... ?", translation: "vamos a...?" },
          { term: "bonne idee", translation: "buena idea" },
          { term: "on se retrouve", translation: "quedamos / nos vemos" },
        ],
        keyPhrases: [
          "Fijate en QUE hace Sophie cada dia.",
          "En el Texto 2, aprende como se propone un plan.",
        ],
        check: [
          { prompt: "T1 : Que fait Sophie le samedi matin ?", choices: ["Elle lit", "Elle nage", "Elle se repose"], answer: 1 },
          { prompt: "T1 : Avec qui va-t-elle au parc ?", choices: ["Avec sa famille", "Avec ses amis", "Seule"], answer: 1 },
          { prompt: "T1 : Que fait-elle le dimanche ?", choices: ["Du sport", "Rien de special", "Elle sort"], answer: 1 },
          { prompt: "T2 : Qu'est-ce que la personne A propose ?", choices: ["Aller au parc", "Aller au cinema", "Faire du sport"], answer: 1 },
          { prompt: "T2 : A quelle heure ?", choices: ["A sept heures", "A huit heures", "A neuf heures"], answer: 1 },
          { prompt: "T2 : Ou se retrouvent-ils ?", choices: ["Devant le cinema", "Au parc", "A la maison"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr7t-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : les loisirs",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "faire / aller", translation: "hacer / ir" },
        { term: "le sport / la musique", translation: "el deporte / la musica" },
        { term: "nager / jouer", translation: "nadar / jugar" },
        { term: "lire / sortir", translation: "leer / salir" },
        { term: "le cinema / le parc", translation: "el cine / el parque" },
        { term: "le week-end", translation: "el fin de semana" },
        { term: "souvent / jamais", translation: "a menudo / nunca" },
        { term: "bonne idee !", translation: "buena idea!" },
      ],
      activities: [
        {
          id: "fr7t-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "faire", right: "hacer" },
            { left: "aller", right: "ir" },
            { left: "nager", right: "nadar" },
            { left: "jouer", right: "jugar" },
          ] },
        },
        {
          id: "fr7t-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "le cinema", right: "el cine" },
            { left: "la musique", right: "la musica" },
            { left: "lire", right: "leer" },
            { left: "sortir", right: "salir" },
          ] },
        },
        {
          id: "fr7t-vocab-a3", type: "cloze",
          prompt: "Completa: 'Je ___ du sport.' (hago)",
          payload: { answer: "fais" },
          explain: "'Faire' con 'je' -> 'je fais'.",
        },
        {
          id: "fr7t-vocab-a4", type: "cloze",
          prompt: "Completa: 'Je ___ au cinema.' (voy)",
          payload: { answer: "vais" },
          explain: "'Aller' con 'je' -> 'je vais'.",
        },
        {
          id: "fr7t-vocab-a5", type: "cloze",
          prompt: "Completa: 'Le ___, je me repose.' (fin de semana)",
          payload: { answer: "week-end" },
          explain: "'Le week-end' = el fin de semana (se dice igual que en ingles).",
        },
        {
          id: "fr7t-vocab-a6", type: "multiple_choice",
          prompt: "Que significa 'souvent'?",
          payload: { choices: ["nunca", "a menudo", "manana"], answer: 1 },
          explain: "'Souvent' = a menudo, con frecuencia.",
        },
        {
          id: "fr7t-vocab-a7", type: "multiple_choice",
          prompt: "Como propones un plan?",
          payload: { choices: ["On va au cinema ?", "Je suis au cinema.", "Le cinema est grand."], answer: 0 },
          explain: "'On va... ?' = vamos a...? (propuesta).",
        },
        {
          id: "fr7t-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["amis", "mes", "sors", "Je", "avec"], answer: ["Je", "sors", "avec", "mes", "amis"] },
          explain: "'Je sors avec mes amis' = salgo con mis amigos.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr7t-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : faire, aller et les contractions",
      intro: "Competencia de GRAMATICA. 'a + le' se contrae en 'au'. No se puede decir 'a le cinema'.",
      grammar: {
        title: "FAIRE / ALLER + contractions",
        chart: {
          title: "FAIRE / ALLER",
          maps: "Aficiones y desplazamientos",
          groups: [
            {
              label: "FAIRE (hacer)", color: "amber",
              forms: [
                { form: "je FAIS", subjects: "tu FAIS / il FAIT" },
                { form: "nous FAISONS", subjects: "vous FAITES" },
                { form: "ils FONT", subjects: "ellos hacen" },
              ],
            },
            {
              label: "ALLER (ir)", color: "blue",
              forms: [
                { form: "je VAIS", subjects: "tu VAS / il VA" },
                { form: "nous ALLONS", subjects: "vous ALLEZ" },
                { form: "ils VONT", subjects: "ellos van" },
              ],
            },
            {
              label: "CONTRACTIONS", color: "emerald",
              forms: [
                { form: "A + LE = AU", subjects: "au cinema" },
                { form: "A + LES = AUX", subjects: "aux toilettes" },
                { form: "A LA", subjects: "no cambia: a la piscine" },
              ],
            },
          ],
        },
        form: "je *fais* du sport  ·  je *vais* *au* cinema / *a la* piscine",
        desc: "Para contar tus aficiones y decir adonde vas.",
        rule: "'Faire' y 'aller' son irregulares: hay que aprenderlos de memoria. Y OJO con las contracciones: 'a + le' SIEMPRE se vuelve 'au' ('je vais au cinema', nunca 'a le cinema'), pero el femenino 'a la' no cambia ('a la piscine').",
        examples: ["Je fais du sport.", "Nous allons au parc.", "Elle va a la piscine.", "Ils font du velo."],
        explain: { tr: ["Hago deporte.", "Vamos al parque.", "Ella va a la piscina.", "Ellos montan en bici."] },
        mistakes: [
          { wrong: "Je vais a le cinema.", right: "Je vais au cinema." },
          { wrong: "Je fais au sport.", right: "Je fais du sport." },
          { wrong: "Nous faisons vont au parc.", right: "Nous allons au parc." },
        ],
      },
      activities: [
        {
          id: "fr7t-gram-a1", type: "cloze",
          prompt: "Completa: 'Je ___ du sport.' (faire)",
          payload: { answer: "fais" },
          explain: "'Faire' con 'je' -> fais.",
        },
        {
          id: "fr7t-gram-a2", type: "cloze",
          prompt: "Completa: 'Nous ___ au parc.' (aller)",
          payload: { answer: "allons" },
          explain: "'Aller' con 'nous' -> allons.",
        },
        {
          id: "fr7t-gram-a3", type: "cloze",
          prompt: "Completa la contraccion: 'Je vais ___ cinema.' (a + le)",
          payload: { answer: "au" },
          explain: "'a + le' se contrae en 'au'.",
        },
        {
          id: "fr7t-gram-a4", type: "cloze",
          prompt: "Completa: 'Elle va ___ piscine.' (a la, femenino)",
          payload: { answer: "a la" },
          explain: "El femenino NO se contrae: a la piscine.",
        },
        {
          id: "fr7t-gram-a5", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Je vais a le cinema.", "Je vais au cinema.", "Je vais le cinema."], answer: 1 },
          explain: "'a + le' = au, sin excepcion.",
        },
        {
          id: "fr7t-gram-a6", type: "multiple_choice",
          prompt: "Elige la forma correcta de 'faire' con 'vous':",
          payload: { choices: ["vous faisez", "vous faites", "vous faisons"], answer: 1 },
          explain: "'Vous faites' es irregular: no sigue el patron -ez.",
        },
        {
          id: "fr7t-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["piscine", "vais", "la", "Je", "a"], answer: ["Je", "vais", "a", "la", "piscine"] },
          explain: "Femenino: a la piscine (sin contraccion).",
        },
        {
          id: "fr7t-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["velo", "font", "du", "Ils"], answer: ["Ils", "font", "du", "velo"] },
          explain: "'Faire du velo' = montar en bici. Con ils -> font.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr7t-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : parle de ton temps libre",
      intro: "Competencia de ESCRITURA. Cuenta tus aficiones, frase por frase.",
      activities: [
        {
          id: "fr7t-write-a1", type: "word_bank",
          prompt: "1. Di que deporte haces:",
          payload: { words: ["sport", "fais", "du", "Je"], answer: ["Je", "fais", "du", "sport"] },
        },
        {
          id: "fr7t-write-a2", type: "word_bank",
          prompt: "2. Di adonde vas el fin de semana:",
          payload: { words: ["parc", "vais", "au", "Je"], answer: ["Je", "vais", "au", "parc"] },
        },
        {
          id: "fr7t-write-a3", type: "word_bank",
          prompt: "3. Di con quien sales:",
          payload: { words: ["amis", "sors", "mes", "Je", "avec"], answer: ["Je", "sors", "avec", "mes", "amis"] },
        },
        {
          id: "fr7t-write-a4", type: "word_bank",
          prompt: "4. Di lo que te gusta hacer:",
          payload: { words: ["lire", "aime", "J'"], answer: ["J'", "aime", "lire"] },
        },
        {
          id: "fr7t-write-a5", type: "word_bank",
          prompt: "5. Propon un plan:",
          payload: { words: ["cinema", "va", "au", "On"], answer: ["On", "va", "au", "cinema"] },
        },
        {
          id: "fr7t-write-a6", type: "multiple_choice",
          prompt: "6. Como dices 'voy a la piscina'?",
          payload: { choices: ["Je vais au piscine.", "Je vais a la piscine.", "Je vais la piscine."], answer: 1 },
        },
        {
          id: "fr7t-write-a7", type: "multiple_choice",
          prompt: "7. Te proponen 'On va au cinema ?' Aceptas:",
          payload: { choices: ["Bonne idee !", "Je suis le cinema.", "Non, merci, au revoir."], answer: 0 },
        },
        {
          id: "fr7t-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase dice bien una aficion?",
          payload: { choices: ["Je fais au velo.", "Je fais du velo.", "Je fais le velo."], answer: 1 },
        },
      ],
    },
  ],
};
