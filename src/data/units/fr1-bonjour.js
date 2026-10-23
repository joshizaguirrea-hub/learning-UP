/**
 * data/units/fr1-bonjour.js — Unidad A1 fr-FR "Bonjour !" (saludos + verbo ETRE).
 *
 * Datos PUROS. Mismo esquema que las unidades it/pt (1 leccion = 1 competencia).
 * term = frances (meta), translation = espanol (L1 del alumno).
 */

export const FR1_BONJOUR = {
  id: "fr1-bonjour",
  language: "fr",
  level: "A1",
  title: "Bonjour !",
  subtitle: "Saludar, presentarte y usar el verbo 'etre'",

  cando: [
    "Puedo saludar y despedirme en frances.",
    "Puedo presentarme y decir mi nombre y de donde soy.",
    "Puedo usar el verbo 'etre' en frases simples.",
    "Puedo preguntar y responder datos personales basicos.",
  ],

  vocab: [
    { id: "fr1b-1", term: "bonjour", translation: "hola / buenos dias", example: "Bonjour, ca va ?" },
    { id: "fr1b-2", term: "salut", translation: "hola / chau (informal)", example: "Salut ! A bientot." },
    { id: "fr1b-3", term: "au revoir", translation: "adios", example: "Au revoir, a demain !" },
    { id: "fr1b-4", term: "bonsoir", translation: "buenas tardes/noches", example: "Bonsoir, madame." },
    { id: "fr1b-5", term: "enchante / enchantee", translation: "encantado / encantada", example: "Enchante, je m'appelle Luc." },
    { id: "fr1b-6", term: "merci", translation: "gracias", example: "Merci beaucoup !" },
    { id: "fr1b-7", term: "s'il vous plait", translation: "por favor", example: "Un cafe, s'il vous plait." },
    { id: "fr1b-8", term: "le nom", translation: "el nombre", example: "Quel est votre nom ?" },
    { id: "fr1b-9", term: "l'ami / l'amie", translation: "el amigo / la amiga", example: "C'est mon ami Tom." },
    { id: "fr1b-10", term: "le professeur", translation: "el profesor", example: "Elle est professeur." },
    { id: "fr1b-11", term: "l'etudiant / l'etudiante", translation: "el / la estudiante", example: "Je suis etudiant." },
    { id: "fr1b-12", term: "ca va ?", translation: "que tal? / todo bien?", example: "Salut ! Ca va ?" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr1b-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : saluer et se presenter",
      intro: "Competencia de LECTURA. Lee DOS textos en frances y responde las preguntas.",
      content: {
        reading:
          "TEXTE 1 - Marie\n" +
          "Bonjour ! Je m'appelle Marie. Je suis francaise, je suis de Lyon. Je suis etudiante. " +
          "Voici mon ami Tom. Il est canadien. Il est professeur. Enchantee ! " +
          "Nous sommes contents d'apprendre le francais.\n\n" +
          "TEXTE 2 - Une conversation courte\n" +
          "A : Bonjour ! Ca va ? B : Ca va bien, merci. Et toi ? A : Tres bien ! Quel est ton nom ? " +
          "B : Je m'appelle Sara. Je suis de Paris. A : Enchante, Sara ! B : Moi aussi. Au revoir ! " +
          "A : Au revoir, a demain !",
        glossary: [
          { term: "je m'appelle", translation: "me llamo" },
          { term: "je suis de", translation: "soy de" },
          { term: "voici", translation: "este es / aqui esta" },
          { term: "il est / elle est", translation: "el es / ella es" },
          { term: "ca va ?", translation: "que tal?" },
          { term: "merci", translation: "gracias" },
          { term: "moi aussi", translation: "yo tambien / igualmente" },
          { term: "a demain", translation: "hasta manana" },
        ],
        keyPhrases: [
          "Busca datos: de donde es cada persona y que hace.",
          "Fijate en el saludo y la despedida del Texto 2.",
        ],
        check: [
          { prompt: "T1 : D'ou est Marie ?", choices: ["Du Canada", "De Lyon", "De Paris"], answer: 1 },
          { prompt: "T1 : Quelle est la profession de Tom ?", choices: ["Etudiant", "Professeur", "Medecin"], answer: 1 },
          { prompt: "T1 : Quelle est la profession de Marie ?", choices: ["Professeure", "Etudiante", "Medecin"], answer: 1 },
          { prompt: "T2 : Comment s'appelle la personne B ?", choices: ["Marie", "Sara", "Tom"], answer: 1 },
          { prompt: "T2 : D'ou est Sara ?", choices: ["De Lyon", "De Paris", "Du Canada"], answer: 1 },
          { prompt: "T2 : Comment finit la conversation ?", choices: ["Au revoir", "Merci", "S'il vous plait"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr1b-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : salutations et personnes",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "bonjour / au revoir", translation: "hola / adios" },
        { term: "salut", translation: "hola o chau (informal)" },
        { term: "bonsoir", translation: "buenas tardes/noches" },
        { term: "enchante(e)", translation: "encantado/a" },
        { term: "merci / s'il vous plait", translation: "gracias / por favor" },
        { term: "ami / amie", translation: "amigo / amiga" },
        { term: "professeur / etudiant", translation: "profesor / estudiante" },
        { term: "ca va ?", translation: "que tal?" },
      ],
      activities: [
        {
          id: "fr1b-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "Bonjour", right: "Hola" },
            { left: "Au revoir", right: "Adios" },
            { left: "Merci", right: "Gracias" },
            { left: "S'il vous plait", right: "Por favor" },
          ] },
        },
        {
          id: "fr1b-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "ami", right: "amigo" },
            { left: "professeur", right: "profesor" },
            { left: "etudiant", right: "estudiante" },
            { left: "nom", right: "nombre" },
          ] },
        },
        {
          id: "fr1b-vocab-a3", type: "cloze",
          prompt: "Completa el saludo de la noche: 'Bon___, madame.' (bonsoir)",
          payload: { answer: "bonsoir" },
          explain: "'Bonsoir' = buenas tardes/noches.",
        },
        {
          id: "fr1b-vocab-a4", type: "cloze",
          prompt: "Completa: 'Un cafe, s'il vous ___.' (favor)",
          payload: { answer: "plait" },
          explain: "'S'il vous plait' = por favor.",
        },
        {
          id: "fr1b-vocab-a5", type: "cloze",
          prompt: "Completa el 'encantado': '___, je m'appelle Luc.' (enchante)",
          payload: { answer: "enchante" },
          explain: "'Enchante(e)' = encantado/a de conocerte.",
        },
        {
          id: "fr1b-vocab-a6", type: "multiple_choice",
          prompt: "Que palabra significa 'profesor'?",
          payload: { choices: ["etudiant", "professeur", "ami"], answer: 1 },
          explain: "'Professeur' = profesor.",
        },
        {
          id: "fr1b-vocab-a7", type: "multiple_choice",
          prompt: "Como preguntas 'que tal?'",
          payload: { choices: ["Quel est ton nom ?", "Ca va ?", "D'ou es-tu ?"], answer: 1 },
          explain: "'Ca va ?' = que tal? / todo bien?",
        },
        {
          id: "fr1b-vocab-a8", type: "word_bank",
          prompt: "Ordena la despedida:",
          payload: { words: ["demain", "A", "revoir,", "au"], answer: ["au", "revoir,", "A", "demain"] },
          explain: "'Au revoir, a demain' = adios, hasta manana.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr1b-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : le verbe 'etre' (present)",
      intro: "Competencia de GRAMATICA. Aprende el verbo 'etre' en presente y practicalo.",
      grammar: {
        title: "Le verbe 'etre' (present)",
        chart: {
          title: "ETRE",
          maps: "ETRE (identidad, origen, profesion)",
          groups: [
            {
              label: "PRESENT", color: "blue",
              forms: [
                { form: "SUIS", subjects: "je" },
                { form: "ES", subjects: "tu" },
                { form: "EST", subjects: "il, elle, on" },
                { form: "SOMMES", subjects: "nous" },
                { form: "ETES", subjects: "vous" },
                { form: "SONT", subjects: "ils, elles" },
              ],
            },
          ],
        },
        form: "je *suis* / tu *es* / il *est* / nous *sommes* / vous *etes* / ils *sont*",
        desc: "Sirve para presentarte, decir quien eres, tu profesion y de donde eres.",
        rule: "El verbo 'etre' cambia segun la persona. Ojo: 'vous' se usa tanto para el plural como para el trato formal (usted).",
        examples: ["Je suis etudiant.", "Elle est de Lyon.", "Nous sommes amis.", "Ils sont professeurs."],
        explain: { tr: ["Yo soy estudiante.", "Ella es de Lyon.", "Nosotros somos amigos.", "Ellos son profesores."] },
        mistakes: [
          { wrong: "Je est de Paris.", right: "Je suis de Paris." },
          { wrong: "Il sont professeur.", right: "Il est professeur." },
          { wrong: "Nous est amis.", right: "Nous sommes amis." },
        ],
      },
      activities: [
        {
          id: "fr1b-gram-a1", type: "cloze",
          prompt: "Completa: 'Je ___ etudiant.' (soy)",
          payload: { answer: "suis" },
          explain: "Con 'je' siempre 'suis'.",
        },
        {
          id: "fr1b-gram-a2", type: "cloze",
          prompt: "Completa: 'Elle ___ de Lyon.' (es)",
          payload: { answer: "est" },
          explain: "Con il/elle/on usamos 'est'.",
        },
        {
          id: "fr1b-gram-a3", type: "cloze",
          prompt: "Completa: 'Ils ___ mes amis.' (son)",
          payload: { answer: "sont" },
          explain: "Con ils/elles usamos 'sont'.",
        },
        {
          id: "fr1b-gram-a4", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Nous est amis.", "Nous sommes amis.", "Nous suis amis."], answer: 1 },
          explain: "Con 'nous' usamos 'sommes'.",
        },
        {
          id: "fr1b-gram-a5", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Il est professeur.", "Il sont professeur.", "Il suis professeur."], answer: 0 },
          explain: "Con 'il' usamos 'est'.",
        },
        {
          id: "fr1b-gram-a6", type: "word_bank",
          prompt: "Ordena para presentarte:",
          payload: { words: ["m'appelle", "Je", "Marie"], answer: ["Je", "m'appelle", "Marie"] },
          explain: "Orden: Je + m'appelle + (nombre).",
        },
        {
          id: "fr1b-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["de", "Je", "Paris", "suis"], answer: ["Je", "suis", "de", "Paris"] },
          explain: "Orden: Je + suis + de + (ciudad).",
        },
        {
          id: "fr1b-gram-a8", type: "cloze",
          prompt: "Completa la pregunta: 'Quel ___ ton nom ?' (es)",
          payload: { answer: "est" },
          explain: "'Quel est ton nom ?' = cual es tu nombre?",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr1b-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : presente-toi",
      intro: "Competencia de ESCRITURA. Construye una presentacion completa, frase por frase.",
      activities: [
        {
          id: "fr1b-write-a1", type: "word_bank",
          prompt: "1. Saluda y di tu nombre:",
          payload: { words: ["suis", "Bonjour,", "je", "Leo"], answer: ["Bonjour,", "je", "suis", "Leo"] },
        },
        {
          id: "fr1b-write-a2", type: "word_bank",
          prompt: "2. Di de donde eres:",
          payload: { words: ["de", "Je", "Madrid", "suis"], answer: ["Je", "suis", "de", "Madrid"] },
        },
        {
          id: "fr1b-write-a3", type: "word_bank",
          prompt: "3. Di tu ocupacion:",
          payload: { words: ["etudiant", "Je", "suis"], answer: ["Je", "suis", "etudiant"] },
        },
        {
          id: "fr1b-write-a4", type: "word_bank",
          prompt: "4. Presenta a un amigo:",
          payload: { words: ["est", "C'", "ami", "mon", "Tom"], answer: ["C'", "est", "mon", "ami", "Tom"] },
        },
        {
          id: "fr1b-write-a5", type: "word_bank",
          prompt: "5. Pregunta el nombre de la otra persona:",
          payload: { words: ["ton", "Quel", "nom ?", "est"], answer: ["Quel", "est", "ton", "nom ?"] },
        },
        {
          id: "fr1b-write-a6", type: "multiple_choice",
          prompt: "6. Mejor forma de despedirte:",
          payload: { choices: ["Bonjour !", "Au revoir, a bientot !", "Je m'appelle."], answer: 1 },
        },
        {
          id: "fr1b-write-a7", type: "multiple_choice",
          prompt: "7. Alguien dice 'Enchante.' Respondes:",
          payload: { choices: ["Moi aussi, enchante.", "Au revoir.", "Non, merci."], answer: 0 },
        },
        {
          id: "fr1b-write-a8", type: "multiple_choice",
          prompt: "8. Cual es un saludo educado?",
          payload: { choices: ["Bonjour, ca va ?", "Donne-moi ca.", "Va-t'en."], answer: 0 },
        },
      ],
    },
  ],
};
