/**
 * data/units/fr9-imparfait.js — Unite A2 francais "Avant" (l'imparfait:
 * description/habitudes dans le passe).
 *
 * Datos PUROS. term = frances (meta), translation = espanol (L1 del alumno).
 *
 * POR QUE este tema primero en A2: en A1 (fr8-hier) el alumno ya vio el
 * passe compose (avoir Y etre, con concordancia) -- el frances A1 de esta
 * plataforma ya es mas avanzado en ese punto que italiano/portugues A1. El
 * salto REAL de A2 entonces no es repetir el passe compose, sino aprender
 * el OTRO tiempo del pasado: el imparfait, para describir y hablar de
 * habitos -- y sobre todo, aprender CUANDO usar cada uno.
 */

export const FR9_IMPARFAIT = {
  id: "fr9-imparfait",
  language: "fr",
  level: "A2",
  title: "Avant",
  subtitle: "L'imparfait para describir el pasado y hablar de habitos (vs. el passe compose)",

  cando: [
    "Puedo describir como era algo o alguien en el pasado con el imparfait.",
    "Puedo conjugar el imparfait de verbos regulares y de 'etre'.",
    "Puedo distinguir cuando usar imparfait (descripcion/habito) vs passe compose (accion puntual).",
    "Puedo hablar de mis habitos de la infancia.",
  ],

  vocab: [
    { id: "fr9a-1", term: "avant", translation: "antes", example: "Avant, j'habitais a Paris." },
    { id: "fr9a-2", term: "quand j'etais petit(e)", translation: "cuando era pequeno/a", example: "Quand j'etais petit, je jouais au foot." },
    { id: "fr9a-3", term: "tous les jours", translation: "todos los dias", example: "Avant, je courais tous les jours." },
    { id: "fr9a-4", term: "souvent", translation: "a menudo", example: "Nous allions souvent a la plage." },
    { id: "fr9a-5", term: "j'avais (avoir)", translation: "tenia", example: "J'avais un chien." },
    { id: "fr9a-6", term: "j'etais (etre)", translation: "era/estaba", example: "J'etais tres timide." },
    { id: "fr9a-7", term: "j'habitais (habiter)", translation: "vivia", example: "J'habitais a la campagne." },
    { id: "fr9a-8", term: "je jouais (jouer)", translation: "jugaba", example: "Je jouais avec mes amis." },
    { id: "fr9a-9", term: "il y avait", translation: "habia", example: "Il y avait un parc pres de chez moi." },
    { id: "fr9a-10", term: "c'etait different", translation: "era diferente", example: "La vie etait differente avant." },
    { id: "fr9a-11", term: "a cette epoque-la", translation: "en esa epoca", example: "A cette epoque-la, tout etait plus simple." },
    { id: "fr9a-12", term: "de temps en temps", translation: "de vez en cuando", example: "De temps en temps, on allait au cinema." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr9a-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : mon enfance",
      intro: "Competencia de LECTURA. Lee DOS textos en imparfait y responde las preguntas.",
      content: {
        reading:
          "TEXTE 1 - Mon enfance\n" +
          "Quand j'etais petit, j'habitais a la campagne avec ma famille. Nous avions un grand jardin et un " +
          "chien qui s'appelait Rex. Tous les jours, je jouais dehors avec mes amis et nous allions souvent " +
          "a la riviere. Il y avait beaucoup d'arbres pres de chez nous. C'etait une vie simple, mais " +
          "j'etais tres heureux.\n\n" +
          "TEXTE 2 - Une conversation sur le passe\n" +
          "A : Comment etait ta vie avant ? B : Avant, j'habitais a Marseille et je travaillais dans un " +
          "petit magasin. A : Tu aimais ton travail ? B : Oui, beaucoup ! Mes collegues etaient tres sympas. " +
          "De temps en temps, on sortait ensemble apres le travail. A : Et pourquoi tu as demenage ? " +
          "B : Pour un nouvel emploi a Paris !",
        glossary: [
          { term: "j'habitais / j'avais", translation: "vivia / tenia" },
          { term: "j'etais / je jouais", translation: "era-estaba / jugaba" },
          { term: "il y avait", translation: "habia" },
          { term: "c'etait une vie simple", translation: "era una vida simple" },
          { term: "de temps en temps", translation: "de vez en cuando" },
          { term: "comment etait ta vie ?", translation: "como era tu vida?" },
          { term: "tu as demenage", translation: "te mudaste" },
          { term: "sympas", translation: "simpaticos" },
        ],
        keyPhrases: [
          "El imparfait describe COMO ERAN las cosas o HABITOS en el pasado (no acciones puntuales, para eso esta el passe compose).",
          "El imparfait se forma de la raiz de 'nous' en presente + terminaciones -ais/-ais/-ait/-ions/-iez/-aient. 'Etre' es irregular: j'etais.",
        ],
        check: [
          { prompt: "T1 : Ou habitait la personne enfant ?", choices: ["A la campagne", "A la ville", "Au bord de la mer"], answer: 0 },
          { prompt: "T1 : Comment s'appelait le chien ?", choices: ["Rex", "Max", "Fido"], answer: 0 },
          { prompt: "T1 : Qu'est-ce qu'ils faisaient souvent ?", choices: ["Ils allaient a la riviere", "Ils allaient au cinema", "Ils restaient a la maison"], answer: 0 },
          { prompt: "T2 : Ou habitait B avant ?", choices: ["A Marseille", "A Paris", "A Lyon"], answer: 0 },
          { prompt: "T2 : Comment etaient ses collegues ?", choices: ["Tres sympas", "Difficiles", "Serieux"], answer: 0 },
          { prompt: "T2 : Pourquoi B a demenage ?", choices: ["Pour un nouvel emploi", "Pour la famille", "Pour les etudes"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr9a-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : parler du passe (habitudes)",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "avant / quand j'etais petit", translation: "antes / cuando era pequeno" },
        { term: "j'avais / j'etais", translation: "tenia / era" },
        { term: "j'habitais / je jouais", translation: "vivia / jugaba" },
        { term: "il y avait", translation: "habia" },
        { term: "tous les jours / souvent", translation: "todos los dias / a menudo" },
        { term: "de temps en temps", translation: "de vez en cuando" },
        { term: "c'etait different", translation: "era diferente" },
        { term: "a cette epoque-la", translation: "en esa epoca" },
      ],
      activities: [
        {
          id: "fr9a-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "avant", right: "antes" },
            { left: "j'avais", right: "tenia" },
            { left: "j'etais", right: "era" },
            { left: "j'habitais", right: "vivia" },
          ] },
        },
        {
          id: "fr9a-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "je jouais", right: "jugaba" },
            { left: "il y avait", right: "habia" },
            { left: "souvent", right: "a menudo" },
            { left: "de temps en temps", right: "de vez en cuando" },
          ] },
        },
        {
          id: "fr9a-vocab-a3", type: "cloze",
          prompt: "Completa: 'Quand j'etais petit, j'___ un chien.' (avoir, imparfait)",
          payload: { answer: "avais" },
          explain: "avoir -> j'avais.",
        },
        {
          id: "fr9a-vocab-a4", type: "cloze",
          prompt: "Completa: 'J'___ a la campagne.' (habiter, imparfait)",
          payload: { answer: "habitais" },
          explain: "habiter -> j'habitais.",
        },
        {
          id: "fr9a-vocab-a5", type: "cloze",
          prompt: "Completa: 'Il y ___ un parc pres de chez moi.' (avoir, hay)",
          payload: { answer: "avait" },
          explain: "'il y avait' = habia.",
        },
        {
          id: "fr9a-vocab-a6", type: "multiple_choice",
          prompt: "Como se dice 'yo era muy timido'?",
          payload: { choices: ["J'etais tres timide.", "J'ai ete tres timide.", "Je suis tres timide."], answer: 0 },
          explain: "Descripcion del pasado -> imparfait.",
        },
        {
          id: "fr9a-vocab-a7", type: "multiple_choice",
          prompt: "Cual es el imparfait de 'etre' para 'nous'?",
          payload: { choices: ["etions", "etiez", "etaient"], answer: 0 },
          explain: "etre (irregular) -> nous etions.",
        },
        {
          id: "fr9a-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["la", "J'habitais", "campagne", "a"], answer: ["J'habitais", "a", "la", "campagne"] },
          explain: "'J'habitais a la campagne'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr9a-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : l'imparfait",
      intro: "Competencia de GRAMATICA. Aprende a describir el pasado con el imparfait.",
      grammar: {
        title: "L'imparfait",
        chart: {
          title: "IMPARFAIT",
          maps: "raiz de 'nous' + terminaciones",
          groups: [
            {
              label: "TERMINACIONES", color: "rose",
              forms: [
                { form: "-AIS / -AIS / -AIT", subjects: "je / tu / il" },
                { form: "-IONS / -IEZ / -AIENT", subjects: "nous / vous / ils" },
              ],
            },
            {
              label: "ETRE (irregular)", color: "green",
              forms: [
                { form: "J'ETAIS", subjects: "yo era/estaba" },
                { form: "NOUS ETIONS", subjects: "nosotros eramos/estabamos" },
              ],
            },
          ],
        },
        form: "raiz de 'nous' en presente (sin -ons) + -ais/-ais/-ait/-ions/-iez/-aient",
        desc: "El imparfait se usa para DESCRIBIR como eran las cosas o para hablar de HABITOS en el pasado (a diferencia del passe compose, que cuenta acciones puntuales y terminadas). Se forma tomando la raiz de 'nous' en presente (nous habit-ons) y agregando las terminaciones del imparfait. 'Etre' es la unica excepcion con raiz irregular: ET-.",
        rule: "Formacion: raiz de 'nous' (sin -ons) + -ais (je), -ais (tu), -ait (il/elle), -ions (nous), -iez (vous), -aient (ils/elles). Ejemplo: habiter -> nous habitons -> j'habitais, tu habitais, il habitait, nous habitions, vous habitiez, ils habitaient. Etre (irregular): j'etais, tu etais, il etait, nous etions, vous etiez, ils etaient.",
        examples: ["J'habitais a Paris.", "Il etait tres gentil.", "Nous jouions tous les jours.", "Ils avaient un grand jardin."],
        explain: { tr: ["Yo vivia en Paris.", "El era muy amable.", "Jugabamos todos los dias.", "Ellos tenian un jardin grande."] },
        mistakes: [
          { wrong: "J'etai content.", right: "J'etais content." },
          { wrong: "Nous jouons toujours avant.", right: "Nous jouions toujours avant." },
          { wrong: "Il etait mange quand...", right: "Il mangeait quand..." },
        ],
      },
      activities: [
        {
          id: "fr9a-gram-a1", type: "cloze",
          prompt: "Completa: 'Je ___ tres content.' (etre, imparfait)",
          payload: { answer: "etais" },
          explain: "etre -> j'etais.",
        },
        {
          id: "fr9a-gram-a2", type: "cloze",
          prompt: "Completa: 'Nous ___ tous les jours au foot.' (jouer, imparfait)",
          payload: { answer: "jouions" },
          explain: "jouer -> nous jouions.",
        },
        {
          id: "fr9a-gram-a3", type: "cloze",
          prompt: "Completa: 'Ils ___ un grand jardin.' (avoir, imparfait)",
          payload: { answer: "avaient" },
          explain: "avoir -> ils avaient.",
        },
        {
          id: "fr9a-gram-a4", type: "multiple_choice",
          prompt: "Cual es el imparfait de 'habiter' para 'il'?",
          payload: { choices: ["habitait", "habite", "habita"], answer: 0 },
          explain: "habiter -> il habitait.",
        },
        {
          id: "fr9a-gram-a5", type: "multiple_choice",
          prompt: "Para que se usa el imparfait?",
          payload: { choices: ["acciones puntuales terminadas", "describir y hablar de habitos pasados", "el futuro"], answer: 1 },
          explain: "Imparfait = descripcion/habito, no accion puntual.",
        },
        {
          id: "fr9a-gram-a6", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["J'etai petit.", "J'etais petit.", "Je suis petit avant."], answer: 1 },
          explain: "etre imparfait -> j'etais (con -s).",
        },
        {
          id: "fr9a-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["la", "Nous", "campagne", "habitions", "a"], answer: ["Nous", "habitions", "a", "la", "campagne"] },
          explain: "'Nous habitions a la campagne'.",
        },
        {
          id: "fr9a-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["un", "Il", "parc", "y", "avait"], answer: ["Il", "y", "avait", "un", "parc"] },
          explain: "'Il y avait un parc'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr9a-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : raconte ton enfance",
      intro: "Competencia de ESCRITURA. Describe como eras y que hacias antes, frase por frase.",
      activities: [
        {
          id: "fr9a-write-a1", type: "word_bank",
          prompt: "1. Di que eras muy feliz:",
          payload: { words: ["heureux", "J'etais", "tres"], answer: ["J'etais", "tres", "heureux"] },
        },
        {
          id: "fr9a-write-a2", type: "word_bank",
          prompt: "2. Di que tenias un perro:",
          payload: { words: ["chien", "J'avais", "un"], answer: ["J'avais", "un", "chien"] },
        },
        {
          id: "fr9a-write-a3", type: "word_bank",
          prompt: "3. Di que vivias en el campo:",
          payload: { words: ["la", "J'habitais", "campagne", "a"], answer: ["J'habitais", "a", "la", "campagne"] },
        },
        {
          id: "fr9a-write-a4", type: "word_bank",
          prompt: "4. Di que jugaban todos los dias (nous):",
          payload: { words: ["jours", "Nous", "tous", "jouions", "les"], answer: ["Nous", "jouions", "tous", "les", "jours"] },
        },
        {
          id: "fr9a-write-a5", type: "word_bank",
          prompt: "5. Pregunta como era su vida:",
          payload: { words: ["etait", "Comment", "vie", "ta"], answer: ["Comment", "etait", "ta", "vie"] },
        },
        {
          id: "fr9a-write-a6", type: "multiple_choice",
          prompt: "6. El imparfait de 'etre' para 'vous' es:",
          payload: { choices: ["etiez", "etions", "etaient"], answer: 0 },
        },
        {
          id: "fr9a-write-a7", type: "multiple_choice",
          prompt: "7. Cual es correcto?",
          payload: { choices: ["J'habite a Paris avant.", "J'habitais a Paris avant.", "J'ai habite a Paris avant toujours."], answer: 1 },
        },
        {
          id: "fr9a-write-a8", type: "multiple_choice",
          prompt: "8. 'Il y avait' significa:",
          payload: { choices: ["hay", "habia", "habra"], answer: 1 },
        },
      ],
    },
  ],
};
