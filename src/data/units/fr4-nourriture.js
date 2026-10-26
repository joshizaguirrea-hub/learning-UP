/**
 * data/units/fr4-nourriture.js — Unidad A1 fr-FR "La nourriture" (comida + partitivos).
 *
 * Datos PUROS. term = frances (meta), translation = espanol (L1 del alumno).
 */

export const FR4_NOURRITURE = {
  id: "fr4-nourriture",
  language: "fr",
  level: "A1",
  title: "La nourriture",
  subtitle: "Hablar de comida y usar los articulos partitivos",

  cando: [
    "Puedo nombrar comidas y bebidas basicas.",
    "Puedo decir lo que me gusta y lo que no.",
    "Puedo usar los partitivos (du, de la, des).",
    "Puedo pedir algo en un cafe o restaurante.",
  ],

  vocab: [
    { id: "fr4n-1", term: "le pain", translation: "el pan", example: "Je mange du pain." },
    { id: "fr4n-2", term: "l'eau", translation: "el agua", example: "Je bois de l'eau." },
    { id: "fr4n-3", term: "le fromage", translation: "el queso", example: "J'adore le fromage." },
    { id: "fr4n-4", term: "la viande", translation: "la carne", example: "Je ne mange pas de viande." },
    { id: "fr4n-5", term: "les legumes", translation: "las verduras", example: "Les legumes sont bons." },
    { id: "fr4n-6", term: "les fruits", translation: "las frutas", example: "J'achete des fruits." },
    { id: "fr4n-7", term: "le petit-dejeuner", translation: "el desayuno", example: "Le petit-dejeuner est a huit heures." },
    { id: "fr4n-8", term: "le dejeuner", translation: "el almuerzo", example: "Le dejeuner est a midi." },
    { id: "fr4n-9", term: "le diner", translation: "la cena", example: "Le diner est a huit heures." },
    { id: "fr4n-10", term: "aimer", translation: "gustar / querer", example: "J'aime le chocolat." },
    { id: "fr4n-11", term: "boire", translation: "beber", example: "Je bois du cafe." },
    { id: "fr4n-12", term: "l'addition", translation: "la cuenta", example: "L'addition, s'il vous plait." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr4n-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : au cafe",
      intro: "Competencia de LECTURA. Lee DOS textos sobre comida y responde.",
      content: {
        reading:
          "TEXTE 1 - Les repas de Julie\n" +
          "Le matin, je prends du cafe et du pain avec du beurre. A midi, je mange de la salade " +
          "et du poulet. J'adore le fromage, mais je n'aime pas le poisson. Le soir, je mange " +
          "leger : de la soupe et des fruits. Je bois beaucoup d'eau.\n\n" +
          "TEXTE 2 - Au restaurant\n" +
          "SERVEUR : Bonjour ! Vous desirez ? CLIENT : Je voudrais un sandwich au fromage, " +
          "s'il vous plait. SERVEUR : Et comme boisson ? CLIENT : Un jus d'orange. " +
          "SERVEUR : Tres bien. CLIENT : L'addition, s'il vous plait. SERVEUR : Voila, douze euros.",
        glossary: [
          { term: "je prends", translation: "tomo (comida/bebida)" },
          { term: "du / de la / des", translation: "algo de (partitivo)" },
          { term: "j'adore / je n'aime pas", translation: "me encanta / no me gusta" },
          { term: "leger", translation: "ligero" },
          { term: "vous desirez ?", translation: "que desea?" },
          { term: "je voudrais", translation: "quisiera (cortes)" },
          { term: "comme boisson", translation: "de bebida" },
          { term: "voila", translation: "aqui tiene" },
        ],
        keyPhrases: [
          "Fijate en QUE come Julie en cada comida del dia.",
          "En el Texto 2, aprende las formulas para pedir.",
        ],
        check: [
          { prompt: "T1 : Que prend Julie le matin ?", choices: ["De la soupe", "Du cafe et du pain", "Du poisson"], answer: 1 },
          { prompt: "T1 : Qu'est-ce qu'elle n'aime pas ?", choices: ["Le fromage", "Le poisson", "La salade"], answer: 1 },
          { prompt: "T1 : Que mange-t-elle le soir ?", choices: ["Leger : soupe et fruits", "Du poulet", "Un sandwich"], answer: 0 },
          { prompt: "T2 : Que commande le client ?", choices: ["Une salade", "Un sandwich au fromage", "Une soupe"], answer: 1 },
          { prompt: "T2 : Quelle boisson demande-t-il ?", choices: ["Du cafe", "De l'eau", "Un jus d'orange"], answer: 2 },
          { prompt: "T2 : Combien coute l'addition ?", choices: ["Dix euros", "Douze euros", "Vingt euros"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr4n-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : manger et boire",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "le pain / le fromage", translation: "el pan / el queso" },
        { term: "la viande / le poisson", translation: "la carne / el pescado" },
        { term: "les legumes / les fruits", translation: "las verduras / las frutas" },
        { term: "l'eau / le cafe", translation: "el agua / el cafe" },
        { term: "le petit-dejeuner", translation: "el desayuno" },
        { term: "le dejeuner / le diner", translation: "el almuerzo / la cena" },
        { term: "j'aime / je n'aime pas", translation: "me gusta / no me gusta" },
        { term: "l'addition", translation: "la cuenta" },
      ],
      activities: [
        {
          id: "fr4n-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "le pain", right: "el pan" },
            { left: "le fromage", right: "el queso" },
            { left: "la viande", right: "la carne" },
            { left: "l'eau", right: "el agua" },
          ] },
        },
        {
          id: "fr4n-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "le petit-dejeuner", right: "el desayuno" },
            { left: "le dejeuner", right: "el almuerzo" },
            { left: "le diner", right: "la cena" },
            { left: "l'addition", right: "la cuenta" },
          ] },
        },
        {
          id: "fr4n-vocab-a3", type: "cloze",
          prompt: "Completa: 'Je bois de l'___.' (agua)",
          payload: { answer: "eau" },
          explain: "'L'eau' = el agua (femenino, pero con apostrofe).",
        },
        {
          id: "fr4n-vocab-a4", type: "cloze",
          prompt: "Completa para pedir la cuenta: 'L'___, s'il vous plait.' (cuenta)",
          payload: { answer: "addition" },
          explain: "'L'addition, s'il vous plait' = la cuenta, por favor.",
        },
        {
          id: "fr4n-vocab-a5", type: "cloze",
          prompt: "Completa: 'J'___ le chocolat.' (me gusta)",
          payload: { answer: "aime" },
          explain: "'Aimer' con 'je' -> 'j'aime' (se pega el apostrofe).",
        },
        {
          id: "fr4n-vocab-a6", type: "multiple_choice",
          prompt: "Cual es una BEBIDA?",
          payload: { choices: ["le fromage", "le jus d'orange", "les legumes"], answer: 1 },
          explain: "'Le jus d'orange' = el zumo de naranja.",
        },
        {
          id: "fr4n-vocab-a7", type: "multiple_choice",
          prompt: "Como pides algo con cortesia?",
          payload: { choices: ["Je veux un cafe.", "Je voudrais un cafe.", "Donne un cafe."], answer: 1 },
          explain: "'Je voudrais' es la forma cortes: quisiera.",
        },
        {
          id: "fr4n-vocab-a8", type: "word_bank",
          prompt: "Ordena para pedir en un cafe:",
          payload: { words: ["plait", "cafe,", "Un", "vous", "s'il"], answer: ["Un", "cafe,", "s'il", "vous", "plait"] },
          explain: "Formula basica: (lo que quieres) + s'il vous plait.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr4n-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : les partitifs (du, de la, des)",
      intro: "Competencia de GRAMATICA. En frances NO se puede omitir el articulo: 'como pan' es 'je mange DU pain'.",
      grammar: {
        title: "Les articles partitifs",
        chart: {
          title: "DU / DE LA / DE L' / DES",
          maps: "Cantidad indeterminada de algo",
          groups: [
            {
              label: "PARTITIFS", color: "emerald",
              forms: [
                { form: "DU", subjects: "+ masculino (du pain)" },
                { form: "DE LA", subjects: "+ femenino (de la soupe)" },
                { form: "DE L'", subjects: "+ vocal (de l'eau)" },
                { form: "DES", subjects: "+ plural (des fruits)" },
              ],
            },
            {
              label: "EN NEGATIVO", color: "rose",
              forms: [
                { form: "PAS DE", subjects: "todos -> je ne mange pas DE viande" },
              ],
            },
          ],
        },
        form: "je mange *du* pain / *de la* soupe / *de l'*eau / *des* fruits",
        desc: "Para hablar de una cantidad indeterminada: no todo el pan, sino algo de pan.",
        rule: "En espanol decimos 'como pan' sin articulo; en frances SIEMPRE hace falta: 'je mange du pain'. Y en negativo todos los partitivos se convierten en 'de': 'je ne mange pas DE viande', nunca 'pas du viande'.",
        examples: ["Je mange du pain.", "Elle boit de la limonade.", "Nous buvons de l'eau.", "Je ne mange pas de viande."],
        explain: { tr: ["Como pan.", "Ella bebe limonada.", "Bebemos agua.", "No como carne."] },
        mistakes: [
          { wrong: "Je mange pain.", right: "Je mange du pain." },
          { wrong: "Je ne mange pas du poisson.", right: "Je ne mange pas de poisson." },
          { wrong: "Je bois du eau.", right: "Je bois de l'eau." },
        ],
      },
      activities: [
        {
          id: "fr4n-gram-a1", type: "cloze",
          prompt: "Completa: 'Je mange ___ pain.' (masculino)",
          payload: { answer: "du" },
          explain: "'Pain' es masculino -> du pain.",
        },
        {
          id: "fr4n-gram-a2", type: "cloze",
          prompt: "Completa: 'Elle mange ___ salade.' (de la, femenino)",
          payload: { answer: "de la" },
          explain: "'Salade' es femenino -> de la salade.",
        },
        {
          id: "fr4n-gram-a3", type: "cloze",
          prompt: "Completa: 'J'achete ___ fruits.' (plural)",
          payload: { answer: "des" },
          explain: "Plural -> des fruits.",
        },
        {
          id: "fr4n-gram-a4", type: "cloze",
          prompt: "Completa en NEGATIVO: 'Je ne mange pas ___ viande.'",
          payload: { answer: "de" },
          explain: "En negativo todos los partitivos pasan a 'de'.",
        },
        {
          id: "fr4n-gram-a5", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Je bois du eau.", "Je bois de l'eau.", "Je bois de la eau."], answer: 1 },
          explain: "Ante vocal se usa 'de l'': de l'eau.",
        },
        {
          id: "fr4n-gram-a6", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Je ne mange pas du fromage.", "Je ne mange pas de fromage.", "Je ne mange pas le fromage."], answer: 1 },
          explain: "Negativo -> 'pas de', sin excepcion.",
        },
        {
          id: "fr4n-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["du", "mange", "Je", "pain"], answer: ["Je", "mange", "du", "pain"] },
          explain: "Orden: sujeto + verbo + partitivo + comida.",
        },
        {
          id: "fr4n-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["legumes", "achete", "des", "Elle"], answer: ["Elle", "achete", "des", "legumes"] },
          explain: "Plural -> des legumes.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr4n-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : parle de ce que tu manges",
      intro: "Competencia de ESCRITURA. Describe tus comidas, frase por frase.",
      activities: [
        {
          id: "fr4n-write-a1", type: "word_bank",
          prompt: "1. Di que desayunas:",
          payload: { words: ["cafe", "matin,", "bois", "Le", "du", "je"], answer: ["Le", "matin,", "je", "bois", "du", "cafe"] },
        },
        {
          id: "fr4n-write-a2", type: "word_bank",
          prompt: "2. Di que comes al mediodia:",
          payload: { words: ["salade", "midi,", "mange", "A", "de la", "je"], answer: ["A", "midi,", "je", "mange", "de la", "salade"] },
        },
        {
          id: "fr4n-write-a3", type: "word_bank",
          prompt: "3. Di lo que te encanta:",
          payload: { words: ["fromage", "adore", "le", "J'"], answer: ["J'", "adore", "le", "fromage"] },
        },
        {
          id: "fr4n-write-a4", type: "word_bank",
          prompt: "4. Di lo que no comes:",
          payload: { words: ["viande", "mange", "ne", "de", "Je", "pas"], answer: ["Je", "ne", "mange", "pas", "de", "viande"] },
        },
        {
          id: "fr4n-write-a5", type: "word_bank",
          prompt: "5. Pide algo en un cafe:",
          payload: { words: ["sandwich", "voudrais", "un", "Je"], answer: ["Je", "voudrais", "un", "sandwich"] },
        },
        {
          id: "fr4n-write-a6", type: "multiple_choice",
          prompt: "6. Como dices 'bebo agua'?",
          payload: { choices: ["Je bois eau.", "Je bois de l'eau.", "Je bois du eau."], answer: 1 },
        },
        {
          id: "fr4n-write-a7", type: "multiple_choice",
          prompt: "7. El camarero dice 'Vous desirez ?'. Respondes:",
          payload: { choices: ["Je voudrais un cafe.", "Oui, merci.", "L'addition."], answer: 0 },
        },
        {
          id: "fr4n-write-a8", type: "multiple_choice",
          prompt: "8. Como pides la cuenta?",
          payload: { choices: ["Le menu, s'il vous plait.", "L'addition, s'il vous plait.", "Un cafe, s'il vous plait."], answer: 1 },
        },
      ],
    },
  ],
};
