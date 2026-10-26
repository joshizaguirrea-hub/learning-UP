/**
 * data/units/fr5-maison.js — Unidad A1 fr-FR "La maison" (casa + preposiciones + il y a).
 *
 * Datos PUROS. term = frances (meta), translation = espanol (L1 del alumno).
 */

export const FR5_MAISON = {
  id: "fr5-maison",
  language: "fr",
  level: "A1",
  title: "La maison",
  subtitle: "Describir donde vives y situar las cosas",

  cando: [
    "Puedo nombrar las habitaciones y los muebles.",
    "Puedo decir que hay en un sitio con 'il y a'.",
    "Puedo situar objetos con preposiciones de lugar.",
    "Puedo describir mi casa con frases simples.",
  ],

  vocab: [
    { id: "fr5m-1", term: "la maison", translation: "la casa", example: "Ma maison est petite." },
    { id: "fr5m-2", term: "l'appartement", translation: "el apartamento", example: "J'habite dans un appartement." },
    { id: "fr5m-3", term: "la chambre", translation: "el dormitorio", example: "Ma chambre est bleue." },
    { id: "fr5m-4", term: "la cuisine", translation: "la cocina", example: "La cuisine est grande." },
    { id: "fr5m-5", term: "le salon", translation: "el salon", example: "Le salon est confortable." },
    { id: "fr5m-6", term: "la salle de bains", translation: "el bano", example: "La salle de bains est a droite." },
    { id: "fr5m-7", term: "la table", translation: "la mesa", example: "Le livre est sur la table." },
    { id: "fr5m-8", term: "la chaise", translation: "la silla", example: "Il y a quatre chaises." },
    { id: "fr5m-9", term: "le lit", translation: "la cama", example: "Le lit est dans la chambre." },
    { id: "fr5m-10", term: "il y a", translation: "hay", example: "Il y a un chat sous la table." },
    { id: "fr5m-11", term: "sur / sous", translation: "sobre / debajo de", example: "Le chat est sous le lit." },
    { id: "fr5m-12", term: "dans / a cote de", translation: "en / al lado de", example: "La cuisine est a cote du salon." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr5m-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : chez moi",
      intro: "Competencia de LECTURA. Lee DOS textos sobre la casa y responde.",
      content: {
        reading:
          "TEXTE 1 - L'appartement de Claire\n" +
          "J'habite dans un petit appartement a Lyon. Il y a trois pieces : un salon, une chambre " +
          "et une cuisine. La salle de bains est a cote de la chambre. Dans le salon, il y a un " +
          "canape et une table. Mon chat dort toujours sous la table. J'aime beaucoup mon appartement.\n\n" +
          "TEXTE 2 - Une conversation\n" +
          "A : Tu habites dans une maison ? B : Non, j'habite dans un appartement au troisieme etage. " +
          "A : Il y a un balcon ? B : Oui, il y a un petit balcon a cote du salon. " +
          "A : Et ta chambre ? B : Ma chambre est grande, avec une fenetre qui donne sur le parc.",
        glossary: [
          { term: "j'habite dans", translation: "vivo en" },
          { term: "il y a", translation: "hay" },
          { term: "les pieces", translation: "las habitaciones" },
          { term: "a cote de", translation: "al lado de" },
          { term: "sous / sur", translation: "debajo de / sobre" },
          { term: "l'etage", translation: "el piso (planta)" },
          { term: "la fenetre", translation: "la ventana" },
          { term: "qui donne sur", translation: "que da a" },
        ],
        keyPhrases: [
          "Fijate en DONDE esta cada cosa.",
          "En el Texto 2, atiende a los detalles del apartamento.",
        ],
        check: [
          { prompt: "T1 : Combien de pieces y a-t-il ?", choices: ["Deux", "Trois", "Quatre"], answer: 1 },
          { prompt: "T1 : Ou est la salle de bains ?", choices: ["A cote de la chambre", "Dans le salon", "A cote de la cuisine"], answer: 0 },
          { prompt: "T1 : Ou dort le chat ?", choices: ["Sur le canape", "Sous la table", "Dans la chambre"], answer: 1 },
          { prompt: "T2 : Ou habite la personne B ?", choices: ["Dans une maison", "Dans un appartement", "Dans un hotel"], answer: 1 },
          { prompt: "T2 : A quel etage ?", choices: ["Au premier", "Au deuxieme", "Au troisieme"], answer: 2 },
          { prompt: "T2 : Sur quoi donne la fenetre ?", choices: ["Sur le parc", "Sur la rue", "Sur le jardin"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr5m-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : les pieces et les meubles",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "la maison / l'appartement", translation: "la casa / el apartamento" },
        { term: "la chambre / le salon", translation: "el dormitorio / el salon" },
        { term: "la cuisine / la salle de bains", translation: "la cocina / el bano" },
        { term: "la table / la chaise", translation: "la mesa / la silla" },
        { term: "le lit / le canape", translation: "la cama / el sofa" },
        { term: "la fenetre / la porte", translation: "la ventana / la puerta" },
        { term: "il y a", translation: "hay" },
        { term: "sur / sous / dans", translation: "sobre / debajo / en" },
      ],
      activities: [
        {
          id: "fr5m-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "la chambre", right: "el dormitorio" },
            { left: "la cuisine", right: "la cocina" },
            { left: "le salon", right: "el salon" },
            { left: "la salle de bains", right: "el bano" },
          ] },
        },
        {
          id: "fr5m-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "la table", right: "la mesa" },
            { left: "la chaise", right: "la silla" },
            { left: "le lit", right: "la cama" },
            { left: "la fenetre", right: "la ventana" },
          ] },
        },
        {
          id: "fr5m-vocab-a3", type: "cloze",
          prompt: "Completa: 'Le livre est ___ la table.' (sobre)",
          payload: { answer: "sur" },
          explain: "'Sur' = sobre, encima de.",
        },
        {
          id: "fr5m-vocab-a4", type: "cloze",
          prompt: "Completa: 'Le chat est ___ le lit.' (debajo de)",
          payload: { answer: "sous" },
          explain: "'Sous' = debajo de.",
        },
        {
          id: "fr5m-vocab-a5", type: "cloze",
          prompt: "Completa: 'J'habite ___ un appartement.' (en)",
          payload: { answer: "dans" },
          explain: "'Dans' = dentro de, en.",
        },
        {
          id: "fr5m-vocab-a6", type: "multiple_choice",
          prompt: "Donde se duerme?",
          payload: { choices: ["la cuisine", "la chambre", "le salon"], answer: 1 },
          explain: "'La chambre' = el dormitorio.",
        },
        {
          id: "fr5m-vocab-a7", type: "multiple_choice",
          prompt: "Como dices 'hay una mesa'?",
          payload: { choices: ["C'est une table.", "Il y a une table.", "Il est une table."], answer: 1 },
          explain: "'Il y a' = hay (existe).",
        },
        {
          id: "fr5m-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["salon", "du", "cuisine", "La", "cote", "est", "a"], answer: ["La", "cuisine", "est", "a", "cote", "du", "salon"] },
          explain: "'A cote de' + le = 'a cote du'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr5m-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : 'il y a' et les prepositions",
      intro: "Competencia de GRAMATICA. 'Il y a' es invariable: sirve para uno o para mil.",
      grammar: {
        title: "IL Y A + prepositions de lieu",
        chart: {
          title: "IL Y A / PREPOSITIONS",
          maps: "Decir que existe algo y donde esta",
          groups: [
            {
              label: "IL Y A (invariable)", color: "amber",
              forms: [
                { form: "IL Y A", subjects: "singular y plural: il y a un chat / des chats" },
                { form: "IL N'Y A PAS DE", subjects: "negativo: il n'y a pas de chat" },
              ],
            },
            {
              label: "PREPOSITIONS", color: "emerald",
              forms: [
                { form: "SUR / SOUS", subjects: "sobre / debajo" },
                { form: "DANS", subjects: "dentro de" },
                { form: "A COTE DE", subjects: "al lado de" },
                { form: "DEVANT / DERRIERE", subjects: "delante / detras" },
              ],
            },
          ],
        },
        form: "*il y a* un livre *sur* la table  ·  *il n'y a pas de* chaise",
        desc: "Para describir un lugar: que cosas hay y donde esta cada una.",
        rule: "'Il y a' NUNCA cambia: vale para singular y plural ('il y a un chat', 'il y a trois chats'). En negativo se vuelve 'il n'y a pas DE'. Ojo con las contracciones: 'a cote de + le' = 'a cote DU', y 'de + les' = 'DES'.",
        examples: ["Il y a un livre sur la table.", "Il n'y a pas de chaise.", "Le chat est sous le lit.", "La cuisine est a cote du salon."],
        explain: { tr: ["Hay un libro sobre la mesa.", "No hay silla.", "El gato esta debajo de la cama.", "La cocina esta al lado del salon."] },
        mistakes: [
          { wrong: "Il y ont trois chaises.", right: "Il y a trois chaises." },
          { wrong: "Il n'y a pas une chaise.", right: "Il n'y a pas de chaise." },
          { wrong: "a cote de le salon", right: "a cote du salon" },
        ],
      },
      activities: [
        {
          id: "fr5m-gram-a1", type: "cloze",
          prompt: "Completa: 'Il ___ a un chat dans le salon.' (hay)",
          payload: { answer: "y" },
          explain: "La formula completa es 'il y a'.",
        },
        {
          id: "fr5m-gram-a2", type: "cloze",
          prompt: "Completa: 'Le livre est ___ la table.' (sobre)",
          payload: { answer: "sur" },
          explain: "'Sur' = encima de.",
        },
        {
          id: "fr5m-gram-a3", type: "cloze",
          prompt: "Completa en NEGATIVO: 'Il n'y a pas ___ chaise.'",
          payload: { answer: "de" },
          explain: "En negativo siempre 'pas de'.",
        },
        {
          id: "fr5m-gram-a4", type: "cloze",
          prompt: "Completa la contraccion: 'La cuisine est a cote ___ salon.' (de + le)",
          payload: { answer: "du" },
          explain: "'de + le' se contrae en 'du'.",
        },
        {
          id: "fr5m-gram-a5", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Il y ont deux lits.", "Il y a deux lits.", "Ils y a deux lits."], answer: 1 },
          explain: "'Il y a' es invariable, tambien en plural.",
        },
        {
          id: "fr5m-gram-a6", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Il n'y a pas un balcon.", "Il n'y a pas de balcon.", "Il n'y a pas le balcon."], answer: 1 },
          explain: "Negativo -> 'pas de balcon'.",
        },
        {
          id: "fr5m-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["table", "un", "a", "Il", "sur", "y", "livre", "la"], answer: ["Il", "y", "a", "un", "livre", "sur", "la", "table"] },
          explain: "Orden: il y a + objeto + preposicion + lugar.",
        },
        {
          id: "fr5m-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["lit", "chat", "sous", "Le", "le", "est"], answer: ["Le", "chat", "est", "sous", "le", "lit"] },
          explain: "Orden: sujeto + est + preposicion + lugar.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr5m-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : decris ta maison",
      intro: "Competencia de ESCRITURA. Describe donde vives, frase por frase.",
      activities: [
        {
          id: "fr5m-write-a1", type: "word_bank",
          prompt: "1. Di donde vives:",
          payload: { words: ["appartement", "habite", "un", "J'", "dans"], answer: ["J'", "habite", "dans", "un", "appartement"] },
        },
        {
          id: "fr5m-write-a2", type: "word_bank",
          prompt: "2. Di cuantas habitaciones hay:",
          payload: { words: ["pieces", "a", "y", "trois", "Il"], answer: ["Il", "y", "a", "trois", "pieces"] },
        },
        {
          id: "fr5m-write-a3", type: "word_bank",
          prompt: "3. Describe tu dormitorio:",
          payload: { words: ["grande", "chambre", "Ma", "est"], answer: ["Ma", "chambre", "est", "grande"] },
        },
        {
          id: "fr5m-write-a4", type: "word_bank",
          prompt: "4. Di que hay en el salon:",
          payload: { words: ["salon,", "canape", "le", "un", "Dans", "y", "a", "il"], answer: ["Dans", "le", "salon,", "il", "y", "a", "un", "canape"] },
        },
        {
          id: "fr5m-write-a5", type: "word_bank",
          prompt: "5. Situa la cocina:",
          payload: { words: ["salon", "cuisine", "du", "La", "cote", "est", "a"], answer: ["La", "cuisine", "est", "a", "cote", "du", "salon"] },
        },
        {
          id: "fr5m-write-a6", type: "multiple_choice",
          prompt: "6. Como dices 'no hay balcon'?",
          payload: { choices: ["Il n'y a pas de balcon.", "Il n'y a pas un balcon.", "Il y a pas balcon."], answer: 0 },
        },
        {
          id: "fr5m-write-a7", type: "multiple_choice",
          prompt: "7. Te preguntan 'Ou est le chat ?' Respondes:",
          payload: { choices: ["Il est sous la table.", "Il y a la table.", "C'est la table."], answer: 0 },
        },
        {
          id: "fr5m-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase describe bien un lugar?",
          payload: { choices: ["Il y ont deux chaises.", "Il y a deux chaises.", "Il a deux chaises."], answer: 1 },
        },
      ],
    },
  ],
};
