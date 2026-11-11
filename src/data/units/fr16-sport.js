/**
 * data/units/fr16-sport.js — Unite A2 francais "Le temps libre et le sport"
 * (adverbes de frequence: toujours, souvent, parfois, rarement, ne...jamais).
 *
 * Datos PUROS. term = frances (meta), translation = espanol (L1 del alumno).
 */

export const FR16_SPORT = {
  id: "fr16-sport",
  language: "fr",
  level: "A2",
  title: "Le temps libre et le sport",
  subtitle: "Adverbios de frecuencia (toujours, souvent, parfois, rarement, ne...jamais) + deportes",

  cando: [
    "Puedo hablar de deportes y actividades de tiempo libre que me gustan.",
    "Puedo usar adverbios de frecuencia (toujours, souvent, parfois, rarement, ne...jamais).",
    "Puedo usar 'aimer' + infinitivo para decir que me gusta hacer algo.",
    "Puedo preguntar con que frecuencia alguien hace algo.",
  ],

  vocab: [
    { id: "fr16s-1", term: "jouer au foot", translation: "jugar futbol", example: "Je joue au foot tous les dimanches." },
    { id: "fr16s-2", term: "faire du sport", translation: "hacer deporte", example: "Je fais du sport trois fois par semaine." },
    { id: "fr16s-3", term: "nager", translation: "nadar", example: "J'aime nager a la piscine." },
    { id: "fr16s-4", term: "courir", translation: "correr", example: "Je cours dans le parc le matin." },
    { id: "fr16s-5", term: "toujours", translation: "siempre", example: "Je vais toujours a la salle de sport." },
    { id: "fr16s-6", term: "souvent", translation: "a menudo", example: "Je joue souvent au tennis." },
    { id: "fr16s-7", term: "parfois", translation: "a veces", example: "Parfois, je regarde les matchs a la tele." },
    { id: "fr16s-8", term: "rarement", translation: "raras veces", example: "Je fais rarement du yoga." },
    { id: "fr16s-9", term: "ne...jamais", translation: "nunca", example: "Je ne vais jamais a la piscine en hiver." },
    { id: "fr16s-10", term: "la salle de sport", translation: "el gimnasio", example: "Je vais a la salle de sport deux fois par semaine." },
    { id: "fr16s-11", term: "le match", translation: "el partido", example: "J'ai regarde un match de foot." },
    { id: "fr16s-12", term: "l'entrainement", translation: "el entrenamiento", example: "L'entrainement est a six heures." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr16s-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : le temps libre",
      intro: "Competencia de LECTURA. Lee DOS textos en frances y responde las preguntas.",
      content: {
        reading:
          "TEXTE 1 - Le temps libre de Lucas\n" +
          "J'aime beaucoup faire du sport. Je joue toujours au foot le dimanche avec mes amis et je vais " +
          "souvent a la salle de sport, environ trois fois par semaine. Parfois, je cours dans le parc tot " +
          "le matin. Je n'aime pas nager, donc je ne vais jamais a la piscine. Mon sport prefere est le foot, " +
          "mais j'aime aussi regarder les matchs de tennis a la tele.\n\n" +
          "TEXTE 2 - Une interview\n" +
          "A : A quelle frequence fais-tu du sport ? B : Je fais du sport presque tous les jours. Je vais a " +
          "la salle de sport trois fois par semaine et je cours deux fois. A : Tu aimes nager ? B : Oui, " +
          "beaucoup, mais je vais rarement a la piscine parce que je n'ai pas le temps. A : Et quel est ton " +
          "sport prefere ? B : Certainement le foot, je joue toujours avec mon equipe le samedi.",
        glossary: [
          { term: "toujours / souvent", translation: "siempre / a menudo" },
          { term: "parfois / rarement", translation: "a veces / raras veces" },
          { term: "ne...jamais", translation: "nunca" },
          { term: "faire du sport", translation: "hacer deporte" },
          { term: "la salle de sport", translation: "el gimnasio" },
          { term: "le match", translation: "el partido" },
          { term: "a quelle frequence...?", translation: "con que frecuencia...?" },
          { term: "l'equipe", translation: "el equipo" },
        ],
        keyPhrases: [
          "Los adverbios de frecuencia (toujours, souvent, parfois, rarement) van DESPUES del verbo conjugado: 'Je vais toujours', 'Je joue souvent'.",
          "'Ne...jamais' es una NEGACION de dos partes: 'ne' antes del verbo, 'jamais' despues: 'Je ne vais jamais'.",
        ],
        check: [
          { prompt: "T1 : Quand Lucas joue-t-il au foot ?", choices: ["Le dimanche", "Le samedi", "Tous les jours"], answer: 0 },
          { prompt: "T1 : Combien de fois par semaine va-t-il a la salle de sport ?", choices: ["Environ trois fois", "Une fois", "Cinq fois"], answer: 0 },
          { prompt: "T1 : Pourquoi ne va-t-il jamais a la piscine ?", choices: ["Il n'aime pas nager", "Il n'a pas le temps", "C'est trop cher"], answer: 0 },
          { prompt: "T2 : Combien de fois par semaine court B ?", choices: ["Deux fois", "Trois fois", "Une fois"], answer: 0 },
          { prompt: "T2 : Pourquoi B va rarement a la piscine ?", choices: ["Il n'a pas le temps", "Il n'aime pas", "C'est loin"], answer: 0 },
          { prompt: "T2 : Quel est le sport prefere de B ?", choices: ["Le foot", "Le tennis", "La natation"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr16s-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : le sport",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "jouer au foot / faire du sport", translation: "jugar futbol / hacer deporte" },
        { term: "nager / courir", translation: "nadar / correr" },
        { term: "toujours / souvent", translation: "siempre / a menudo" },
        { term: "parfois / rarement", translation: "a veces / raras veces" },
        { term: "ne...jamais", translation: "nunca" },
        { term: "la salle de sport", translation: "el gimnasio" },
        { term: "le match", translation: "el partido" },
        { term: "l'entrainement", translation: "el entrenamiento" },
      ],
      activities: [
        {
          id: "fr16s-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "toujours", right: "siempre" },
            { left: "souvent", right: "a menudo" },
            { left: "parfois", right: "a veces" },
            { left: "rarement", right: "raras veces" },
          ] },
        },
        {
          id: "fr16s-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "ne...jamais", right: "nunca" },
            { left: "la salle de sport", right: "el gimnasio" },
            { left: "le match", right: "el partido" },
            { left: "faire du sport", right: "hacer deporte" },
          ] },
        },
        {
          id: "fr16s-vocab-a3", type: "cloze",
          prompt: "Completa: 'Je vais ___ a la salle de sport.' (siempre)",
          payload: { answer: "toujours" },
          explain: "'toujours' = siempre.",
        },
        {
          id: "fr16s-vocab-a4", type: "cloze",
          prompt: "Completa: 'Je ne vais ___ a la piscine.' (nunca)",
          payload: { answer: "jamais" },
          explain: "'ne...jamais' = nunca.",
        },
        {
          id: "fr16s-vocab-a5", type: "cloze",
          prompt: "Completa: '___, je cours dans le parc.' (a veces)",
          payload: { answer: "Parfois" },
          explain: "'parfois' = a veces.",
        },
        {
          id: "fr16s-vocab-a6", type: "multiple_choice",
          prompt: "Como se dice 'a menudo juego tenis'?",
          payload: { choices: ["Je joue souvent au tennis.", "Je joue jamais au tennis.", "Je joue rarement au tennis."], answer: 0 },
          explain: "'souvent' = a menudo.",
        },
        {
          id: "fr16s-vocab-a7", type: "multiple_choice",
          prompt: "Que significa 'a quelle frequence'?",
          payload: { choices: ["cuanto cuesta", "con que frecuencia", "a que hora"], answer: 1 },
          explain: "'a quelle frequence' = con que frecuencia.",
        },
        {
          id: "fr16s-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["au", "Je", "foot", "toujours", "joue"], answer: ["Je", "joue", "toujours", "au", "foot"] },
          explain: "'Je joue toujours au foot'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr16s-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : les adverbes de frequence",
      intro: "Competencia de GRAMATICA. Aprende a decir cada cuanto haces algo.",
      grammar: {
        title: "Les adverbes de frequence",
        chart: {
          title: "ADVERBES DE FREQUENCE",
          maps: "100% (toujours) -> 0% (ne...jamais)",
          groups: [
            {
              label: "FREQUENCE HAUTE", color: "rose",
              forms: [
                { form: "TOUJOURS", subjects: "siempre (100%)" },
                { form: "SOUVENT", subjects: "a menudo" },
              ],
            },
            {
              label: "FREQUENCE BASSE", color: "green",
              forms: [
                { form: "PARFOIS", subjects: "a veces" },
                { form: "RAREMENT", subjects: "raras veces" },
                { form: "NE...JAMAIS", subjects: "nunca (0%)" },
              ],
            },
          ],
        },
        form: "sujeto + verbo + adverbio; 'ne...jamais' es negacion (ne antes, jamais despues)",
        desc: "Los adverbios de frecuencia indican cada cuanto pasa algo, de 'siempre' (100%) a 'nunca' (0%). Van DESPUES del verbo conjugado: 'Je vais toujours', 'Je joue souvent'. 'Ne...jamais' es especial: es una NEGACION de dos partes como 'ne...pas', con 'ne' antes del verbo y 'jamais' despues.",
        rule: "Orden: [sujeto] + verbo + adverbio (Je vais toujours, Je joue souvent, Je cours rarement). Con NE...JAMAIS: [sujeto] + NE + verbo + JAMAIS (Je ne vais jamais a la piscine). Pregunta de frecuencia: 'A quelle frequence + presente + ...?' (A quelle frequence fais-tu du sport ?).",
        examples: ["Je vais toujours a la salle de sport.", "Je joue souvent au tennis.", "Parfois je cours.", "Je ne vais jamais a la piscine en hiver."],
        explain: { tr: ["Siempre voy al gimnasio.", "A menudo juego tenis.", "A veces corro.", "Nunca voy a la piscina en invierno."] },
        mistakes: [
          { wrong: "Je vais jamais a la piscine.", right: "Je ne vais jamais a la piscine." },
          { wrong: "Je ne vais a la piscine jamais.", right: "Je ne vais jamais a la piscine." },
          { wrong: "Toujours je joue au foot.", right: "Je joue toujours au foot." },
        ],
      },
      activities: [
        {
          id: "fr16s-gram-a1", type: "cloze",
          prompt: "Completa: 'Je vais ___ a la salle de sport.' (siempre)",
          payload: { answer: "toujours" },
          explain: "'toujours' = siempre.",
        },
        {
          id: "fr16s-gram-a2", type: "cloze",
          prompt: "Completa: 'Je ne joue ___ au foot en hiver.' (nunca)",
          payload: { answer: "jamais" },
          explain: "'ne...jamais' = nunca.",
        },
        {
          id: "fr16s-gram-a3", type: "cloze",
          prompt: "Completa: '___, je cours le matin.' (a veces)",
          payload: { answer: "Parfois" },
          explain: "'parfois' = a veces.",
        },
        {
          id: "fr16s-gram-a4", type: "multiple_choice",
          prompt: "Donde va normalmente el adverbio de frecuencia?",
          payload: { choices: ["antes del sujeto", "despues del verbo", "al principio, siempre"], answer: 1 },
          explain: "Normalmente va despues del verbo conjugado.",
        },
        {
          id: "fr16s-gram-a5", type: "multiple_choice",
          prompt: "Que necesita 'jamais' para funcionar como negacion?",
          payload: { choices: ["nada especial", "'ne' antes del verbo", "ir al principio"], answer: 1 },
          explain: "'ne...jamais' es negacion de dos partes.",
        },
        {
          id: "fr16s-gram-a6", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Je vais jamais a la piscine.", "Je ne vais jamais a la piscine.", "Je ne vais a la piscine jamais."], answer: 1 },
          explain: "'ne' antes, 'jamais' justo despues del verbo.",
        },
        {
          id: "fr16s-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["au", "Je", "tennis", "souvent", "joue"], answer: ["Je", "joue", "souvent", "au", "tennis"] },
          explain: "'Je joue souvent au tennis'.",
        },
        {
          id: "fr16s-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["a", "Je", "piscine", "vais", "jamais", "ne", "la"], answer: ["Je", "ne", "vais", "jamais", "a", "la", "piscine"] },
          explain: "'Je ne vais jamais a la piscine'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr16s-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : ton temps libre",
      intro: "Competencia de ESCRITURA. Cuenta que haces en tu tiempo libre, frase por frase.",
      activities: [
        {
          id: "fr16s-write-a1", type: "word_bank",
          prompt: "1. Di que siempre juegas futbol los domingos:",
          payload: { words: ["dimanches", "Je", "foot", "au", "toujours", "joue", "les"], answer: ["Je", "joue", "toujours", "au", "foot", "les", "dimanches"] },
        },
        {
          id: "fr16s-write-a2", type: "word_bank",
          prompt: "2. Di que nunca nadas:",
          payload: { words: ["Je", "jamais", "ne", "nage"], answer: ["Je", "ne", "nage", "jamais"] },
        },
        {
          id: "fr16s-write-a3", type: "word_bank",
          prompt: "3. Di que a menudo vas al gimnasio:",
          payload: { words: ["sport", "Je", "de", "vais", "souvent", "la", "a", "salle"], answer: ["Je", "vais", "souvent", "a", "la", "salle", "de", "sport"] },
        },
        {
          id: "fr16s-write-a4", type: "word_bank",
          prompt: "4. Pregunta con que frecuencia hace deporte (tu):",
          payload: { words: ["sport", "A", "frequence", "du", "fais-tu", "quelle"], answer: ["A", "quelle", "frequence", "fais-tu", "du", "sport"] },
        },
        {
          id: "fr16s-write-a5", type: "word_bank",
          prompt: "5. Di que a veces corres en el parque:",
          payload: { words: ["le", "Parfois", "cours", "dans", "je", "parc"], answer: ["Parfois", "je", "cours", "dans", "le", "parc"] },
        },
        {
          id: "fr16s-write-a6", type: "multiple_choice",
          prompt: "6. 'Rarement' significa:",
          payload: { choices: ["siempre", "raras veces", "nunca"], answer: 1 },
        },
        {
          id: "fr16s-write-a7", type: "multiple_choice",
          prompt: "7. Cual es correcto?",
          payload: { choices: ["Je ne vais jamais a la piscine.", "Je vais jamais a la piscine.", "Je ne vais a la piscine jamais."], answer: 0 },
        },
        {
          id: "fr16s-write-a8", type: "multiple_choice",
          prompt: "8. 'Parfois' significa:",
          payload: { choices: ["siempre", "a veces", "nunca"], answer: 1 },
        },
      ],
    },
  ],
};
