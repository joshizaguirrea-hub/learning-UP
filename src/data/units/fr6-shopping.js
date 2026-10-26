/**
 * data/units/fr6-shopping.js — Unidad A1 fr-FR "Les courses" (compras + numeros + adjetivos).
 *
 * Datos PUROS. term = frances (meta), translation = espanol (L1 del alumno).
 */

export const FR6_SHOPPING = {
  id: "fr6-shopping",
  language: "fr",
  level: "A1",
  title: "Les courses",
  subtitle: "Comprar, preguntar precios y usar los demostrativos",

  cando: [
    "Puedo preguntar cuanto cuesta algo.",
    "Puedo usar los numeros y decir precios.",
    "Puedo usar los demostrativos (ce, cette, ces).",
    "Puedo hacer una compra sencilla en una tienda.",
  ],

  vocab: [
    { id: "fr6s-1", term: "le magasin", translation: "la tienda", example: "Le magasin ouvre a neuf heures." },
    { id: "fr6s-2", term: "le prix", translation: "el precio", example: "Quel est le prix ?" },
    { id: "fr6s-3", term: "l'argent", translation: "el dinero", example: "Je n'ai pas d'argent." },
    { id: "fr6s-4", term: "cher / pas cher", translation: "caro / barato", example: "C'est trop cher." },
    { id: "fr6s-5", term: "acheter", translation: "comprar", example: "J'achete un pantalon." },
    { id: "fr6s-6", term: "couter", translation: "costar", example: "Ca coute dix euros." },
    { id: "fr6s-7", term: "le pantalon", translation: "el pantalon", example: "Ce pantalon est noir." },
    { id: "fr6s-8", term: "la chemise", translation: "la camisa", example: "Cette chemise est jolie." },
    { id: "fr6s-9", term: "les chaussures", translation: "los zapatos", example: "Ces chaussures sont cheres." },
    { id: "fr6s-10", term: "la taille", translation: "la talla", example: "Quelle taille faites-vous ?" },
    { id: "fr6s-11", term: "combien", translation: "cuanto", example: "Combien ca coute ?" },
    { id: "fr6s-12", term: "la carte / les especes", translation: "la tarjeta / el efectivo", example: "Je paie par carte." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr6s-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : au magasin",
      intro: "Competencia de LECTURA. Lee DOS textos sobre compras y responde.",
      content: {
        reading:
          "TEXTE 1 - Les courses de Marc\n" +
          "Le samedi, je fais les courses au marche. J'achete des fruits, des legumes et du pain. " +
          "Le marche n'est pas cher. Ensuite, je vais au magasin de vetements. Aujourd'hui, " +
          "j'achete une chemise bleue a vingt-cinq euros. Je paie par carte.\n\n" +
          "TEXTE 2 - Dans une boutique\n" +
          "VENDEUSE : Bonjour, je peux vous aider ? CLIENT : Oui, combien coute ce pantalon ? " +
          "VENDEUSE : Il coute quarante euros. CLIENT : C'est un peu cher. Et cette chemise ? " +
          "VENDEUSE : Quinze euros. CLIENT : Parfait, je la prends. Je paie en especes.",
        glossary: [
          { term: "faire les courses", translation: "hacer la compra" },
          { term: "le marche", translation: "el mercado" },
          { term: "les vetements", translation: "la ropa" },
          { term: "je peux vous aider ?", translation: "puedo ayudarle?" },
          { term: "combien coute... ?", translation: "cuanto cuesta...?" },
          { term: "un peu cher", translation: "un poco caro" },
          { term: "je la prends", translation: "me la llevo" },
          { term: "payer par carte / en especes", translation: "pagar con tarjeta / en efectivo" },
        ],
        keyPhrases: [
          "Fijate en los PRECIOS de cada cosa.",
          "En el Texto 2, aprende las formulas para comprar.",
        ],
        check: [
          { prompt: "T1 : Quand Marc fait-il les courses ?", choices: ["Le lundi", "Le samedi", "Le dimanche"], answer: 1 },
          { prompt: "T1 : Combien coute la chemise ?", choices: ["Quinze euros", "Vingt-cinq euros", "Quarante euros"], answer: 1 },
          { prompt: "T1 : Comment paie-t-il ?", choices: ["Par carte", "En especes", "Il ne paie pas"], answer: 0 },
          { prompt: "T2 : Combien coute le pantalon ?", choices: ["Quinze euros", "Vingt euros", "Quarante euros"], answer: 2 },
          { prompt: "T2 : Qu'est-ce que le client achete ?", choices: ["Le pantalon", "La chemise", "Rien"], answer: 1 },
          { prompt: "T2 : Comment paie le client ?", choices: ["Par carte", "En especes", "Il ne paie pas"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr6s-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : acheter et payer",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "le magasin / le marche", translation: "la tienda / el mercado" },
        { term: "le prix / l'argent", translation: "el precio / el dinero" },
        { term: "cher / pas cher", translation: "caro / barato" },
        { term: "acheter / couter", translation: "comprar / costar" },
        { term: "le pantalon / la chemise", translation: "el pantalon / la camisa" },
        { term: "les chaussures", translation: "los zapatos" },
        { term: "combien ?", translation: "cuanto?" },
        { term: "par carte / en especes", translation: "con tarjeta / en efectivo" },
      ],
      activities: [
        {
          id: "fr6s-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "le magasin", right: "la tienda" },
            { left: "le prix", right: "el precio" },
            { left: "acheter", right: "comprar" },
            { left: "couter", right: "costar" },
          ] },
        },
        {
          id: "fr6s-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "le pantalon", right: "el pantalon" },
            { left: "la chemise", right: "la camisa" },
            { left: "les chaussures", right: "los zapatos" },
            { left: "la taille", right: "la talla" },
          ] },
        },
        {
          id: "fr6s-vocab-a3", type: "cloze",
          prompt: "Completa: '___ coute ce pantalon ?' (cuanto)",
          payload: { answer: "combien" },
          explain: "'Combien coute...?' = cuanto cuesta...?",
        },
        {
          id: "fr6s-vocab-a4", type: "cloze",
          prompt: "Completa: 'C'est trop ___.' (caro)",
          payload: { answer: "cher" },
          explain: "'Cher' = caro. 'Trop cher' = demasiado caro.",
        },
        {
          id: "fr6s-vocab-a5", type: "cloze",
          prompt: "Completa: 'Je paie par ___.' (tarjeta)",
          payload: { answer: "carte" },
          explain: "'Payer par carte' = pagar con tarjeta.",
        },
        {
          id: "fr6s-vocab-a6", type: "multiple_choice",
          prompt: "Que significa 'pas cher'?",
          payload: { choices: ["caro", "barato", "gratis"], answer: 1 },
          explain: "'Pas cher' = no caro, es decir, barato.",
        },
        {
          id: "fr6s-vocab-a7", type: "multiple_choice",
          prompt: "Como preguntas el precio?",
          payload: { choices: ["Quelle heure est-il ?", "Combien ca coute ?", "Ou est le magasin ?"], answer: 1 },
          explain: "'Combien ca coute ?' = cuanto cuesta?",
        },
        {
          id: "fr6s-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["euros", "coute", "Ca", "dix"], answer: ["Ca", "coute", "dix", "euros"] },
          explain: "'Ca coute dix euros' = cuesta diez euros.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr6s-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : ce, cette, ces + les nombres",
      intro: "Competencia de GRAMATICA. Los demostrativos cambian segun el genero y el numero.",
      grammar: {
        title: "Les demonstratifs + les nombres",
        chart: {
          title: "CE / CETTE / CES",
          maps: "Senalar algo: este, esta, estos",
          groups: [
            {
              label: "DEMONSTRATIFS", color: "purple",
              forms: [
                { form: "CE", subjects: "+ masculino (ce pantalon)" },
                { form: "CET", subjects: "+ masc. con vocal (cet arbre)" },
                { form: "CETTE", subjects: "+ femenino (cette chemise)" },
                { form: "CES", subjects: "+ plural (ces chaussures)" },
              ],
            },
            {
              label: "NOMBRES CLAVE", color: "blue",
              forms: [
                { form: "20 / 21", subjects: "vingt / vingt-et-un" },
                { form: "30 / 40", subjects: "trente / quarante" },
                { form: "70", subjects: "soixante-dix (60+10)" },
                { form: "80 / 90", subjects: "quatre-vingts / quatre-vingt-dix" },
              ],
            },
          ],
        },
        form: "*ce* pantalon / *cette* chemise / *ces* chaussures",
        desc: "Para senalar lo que quieres comprar y preguntar su precio.",
        rule: "El demostrativo concuerda con el sustantivo: 'ce' masculino, 'cette' femenino, 'ces' plural (para los dos generos). Ante vocal el masculino usa 'cet' por sonido: 'cet appartement'. Ojo con los numeros: 70 es 'soixante-dix' (60+10) y 80 es 'quatre-vingts' (4x20).",
        examples: ["Ce pantalon est cher.", "Cette chemise est jolie.", "Ces chaussures sont noires.", "Ca coute soixante-dix euros."],
        explain: { tr: ["Este pantalon es caro.", "Esta camisa es bonita.", "Estos zapatos son negros.", "Cuesta setenta euros."] },
        mistakes: [
          { wrong: "Ce chemise est jolie.", right: "Cette chemise est jolie." },
          { wrong: "Ce chaussures sont cheres.", right: "Ces chaussures sont cheres." },
          { wrong: "septante euros", right: "soixante-dix euros" },
        ],
      },
      activities: [
        {
          id: "fr6s-gram-a1", type: "cloze",
          prompt: "Completa: '___ pantalon est cher.' (este, masculino)",
          payload: { answer: "ce" },
          explain: "'Pantalon' es masculino -> ce.",
        },
        {
          id: "fr6s-gram-a2", type: "cloze",
          prompt: "Completa: '___ chemise est jolie.' (esta, femenino)",
          payload: { answer: "cette" },
          explain: "'Chemise' es femenino -> cette.",
        },
        {
          id: "fr6s-gram-a3", type: "cloze",
          prompt: "Completa: '___ chaussures sont cheres.' (estos, plural)",
          payload: { answer: "ces" },
          explain: "Plural -> ces (vale para los dos generos).",
        },
        {
          id: "fr6s-gram-a4", type: "cloze",
          prompt: "Escribe 70 en frances (60+10):",
          payload: { answer: "soixante-dix" },
          explain: "70 = soixante-dix, literalmente sesenta-diez.",
        },
        {
          id: "fr6s-gram-a5", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Ce chemise est bleue.", "Cette chemise est bleue.", "Ces chemise est bleue."], answer: 1 },
          explain: "Femenino singular -> cette.",
        },
        {
          id: "fr6s-gram-a6", type: "multiple_choice",
          prompt: "Como se dice 80 en frances?",
          payload: { choices: ["huitante", "octante", "quatre-vingts"], answer: 2 },
          explain: "80 = quatre-vingts (cuatro veintes).",
        },
        {
          id: "fr6s-gram-a7", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["pantalon", "coute", "ce", "Combien"], answer: ["Combien", "coute", "ce", "pantalon"] },
          explain: "Orden: Combien + coute + demostrativo + objeto.",
        },
        {
          id: "fr6s-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["cheres", "chaussures", "Ces", "sont"], answer: ["Ces", "chaussures", "sont", "cheres"] },
          explain: "Plural: ces + sustantivo + sont + adjetivo en plural.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr6s-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : fais tes courses",
      intro: "Competencia de ESCRITURA. Construye una compra completa, frase por frase.",
      activities: [
        {
          id: "fr6s-write-a1", type: "word_bank",
          prompt: "1. Pregunta el precio:",
          payload: { words: ["pantalon", "coute", "ce", "Combien"], answer: ["Combien", "coute", "ce", "pantalon"] },
        },
        {
          id: "fr6s-write-a2", type: "word_bank",
          prompt: "2. Di que es caro:",
          payload: { words: ["cher", "trop", "C'", "est"], answer: ["C'", "est", "trop", "cher"] },
        },
        {
          id: "fr6s-write-a3", type: "word_bank",
          prompt: "3. Di que compras:",
          payload: { words: ["chemise", "achete", "une", "J'"], answer: ["J'", "achete", "une", "chemise"] },
        },
        {
          id: "fr6s-write-a4", type: "word_bank",
          prompt: "4. Di el precio:",
          payload: { words: ["euros", "coute", "Ca", "quinze"], answer: ["Ca", "coute", "quinze", "euros"] },
        },
        {
          id: "fr6s-write-a5", type: "word_bank",
          prompt: "5. Di como pagas:",
          payload: { words: ["carte", "paie", "par", "Je"], answer: ["Je", "paie", "par", "carte"] },
        },
        {
          id: "fr6s-write-a6", type: "multiple_choice",
          prompt: "6. Como dices 'estos zapatos son bonitos'?",
          payload: { choices: ["Ce chaussures sont jolies.", "Ces chaussures sont jolies.", "Cette chaussures sont jolies."], answer: 1 },
        },
        {
          id: "fr6s-write-a7", type: "multiple_choice",
          prompt: "7. La vendedora dice 'Je peux vous aider ?' Respondes:",
          payload: { choices: ["Oui, combien coute ce pantalon ?", "Oui, je suis Marc.", "Oui, j'habite ici."], answer: 0 },
        },
        {
          id: "fr6s-write-a8", type: "multiple_choice",
          prompt: "8. Como dices que te lo llevas?",
          payload: { choices: ["Je le prends.", "Je le mange.", "Je le vois."], answer: 0 },
        },
      ],
    },
  ],
};
