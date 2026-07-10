/**
 * data/bonus-decks.js — Mazos "Bonus" de conocimiento para memorizar.
 *
 * Datos PUROS. Cada mazo es una coleccion tematica con su MEDALLA. Se estudian
 * como flashcards enriquecidas y reutilizan el motor SRS (ids con prefijo
 * 'bv-'/'br-'/'bt-' para no chocar con el vocabulario de las unidades).
 *
 * item irregular: { id, front, past, participle, back, examples:[{en,es}] }
 * item regular/tiempo: { id, front, back, examples:[{en,es}] }
 */

export const BONUS_DECKS = [
  {
    id: "irregular-verbs",
    title: "Verbos irregulares",
    subtitle: "Base - pasado - participio",
    recall: "Di el PASADO y el PARTICIPIO",
    gradient: "from-indigo-500 to-blue-600",
    medalTitle: "Maestro de irregulares",
    medalDesc: "Dominaste los verbos irregulares clave",
    items: [
      { id: "bv-go", front: "go", past: "went", participle: "gone", back: "went / gone", examples: [
        { en: "I go to the gym on Mondays.", es: "Voy al gimnasio los lunes." },
        { en: "She went home early.", es: "Ella se fue a casa temprano." },
        { en: "They have gone to Spain.", es: "Han ido a Espana." }] },
      { id: "bv-eat", front: "eat", past: "ate", participle: "eaten", back: "ate / eaten", examples: [
        { en: "We eat dinner at 8.", es: "Cenamos a las 8." },
        { en: "He ate a big lunch.", es: "El comio un gran almuerzo." },
        { en: "I have eaten sushi before.", es: "He comido sushi antes." }] },
      { id: "bv-see", front: "see", past: "saw", participle: "seen", back: "saw / seen", examples: [
        { en: "I see the problem.", es: "Veo el problema." },
        { en: "She saw a movie.", es: "Ella vio una pelicula." },
        { en: "Have you seen my keys?", es: "Has visto mis llaves?" }] },
      { id: "bv-come", front: "come", past: "came", participle: "come", back: "came / come", examples: [
        { en: "They come every week.", es: "Vienen cada semana." },
        { en: "He came to the party.", es: "El vino a la fiesta." },
        { en: "Winter has come.", es: "Ha llegado el invierno." }] },
      { id: "bv-take", front: "take", past: "took", participle: "taken", back: "took / taken", examples: [
        { en: "I take the bus daily.", es: "Tomo el bus a diario." },
        { en: "We took a taxi.", es: "Tomamos un taxi." },
        { en: "She has taken the exam.", es: "Ella ha tomado el examen." }] },
      { id: "bv-make", front: "make", past: "made", participle: "made", back: "made / made", examples: [
        { en: "I make coffee each morning.", es: "Hago cafe cada manana." },
        { en: "They made a mistake.", es: "Cometieron un error." },
        { en: "He has made dinner.", es: "El ha hecho la cena." }] },
      { id: "bv-know", front: "know", past: "knew", participle: "known", back: "knew / known", examples: [
        { en: "I know the answer.", es: "Se la respuesta." },
        { en: "She knew him well.", es: "Lo conocia bien." },
        { en: "I have known her for years.", es: "La conozco desde hace anos." }] },
      { id: "bv-get", front: "get", past: "got", participle: "gotten", back: "got / gotten", examples: [
        { en: "I get up at 6.", es: "Me levanto a las 6." },
        { en: "He got a new car.", es: "El consiguio un auto nuevo." },
        { en: "She has gotten better.", es: "Ella ha mejorado." }] },
      { id: "bv-give", front: "give", past: "gave", participle: "given", back: "gave / given", examples: [
        { en: "They give classes online.", es: "Dan clases en linea." },
        { en: "He gave me a book.", es: "El me dio un libro." },
        { en: "I have given my answer.", es: "He dado mi respuesta." }] },
      { id: "bv-find", front: "find", past: "found", participle: "found", back: "found / found", examples: [
        { en: "I can't find it.", es: "No lo encuentro." },
        { en: "She found her wallet.", es: "Encontro su billetera." },
        { en: "We have found a solution.", es: "Hemos encontrado una solucion." }] },
      { id: "bv-think", front: "think", past: "thought", participle: "thought", back: "thought / thought", examples: [
        { en: "I think it's easy.", es: "Creo que es facil." },
        { en: "He thought about it.", es: "El lo penso." },
        { en: "I have thought a lot.", es: "He pensado mucho." }] },
      { id: "bv-tell", front: "tell", past: "told", participle: "told", back: "told / told", examples: [
        { en: "I always tell the truth.", es: "Siempre digo la verdad." },
        { en: "She told a story.", es: "Ella conto una historia." },
        { en: "He has told everyone.", es: "Se lo ha dicho a todos." }] },
      { id: "bv-buy", front: "buy", past: "bought", participle: "bought", back: "bought / bought", examples: [
        { en: "We buy food here.", es: "Compramos comida aqui." },
        { en: "I bought a ticket.", es: "Compre un boleto." },
        { en: "They have bought a house.", es: "Han comprado una casa." }] },
      { id: "bv-bring", front: "bring", past: "brought", participle: "brought", back: "brought / brought", examples: [
        { en: "Please bring water.", es: "Por favor trae agua." },
        { en: "She brought a friend.", es: "Trajo a un amigo." },
        { en: "I have brought the files.", es: "He traido los archivos." }] },
      { id: "bv-write", front: "write", past: "wrote", participle: "written", back: "wrote / written", examples: [
        { en: "I write every day.", es: "Escribo cada dia." },
        { en: "He wrote a letter.", es: "Escribio una carta." },
        { en: "She has written a book.", es: "Ha escrito un libro." }] },
      { id: "bv-read", front: "read", past: "read", participle: "read", back: "read / read (se pronuncia 'red')", examples: [
        { en: "I read at night.", es: "Leo de noche." },
        { en: "She read the news.", es: "Leyo las noticias." },
        { en: "I have read that book.", es: "He leido ese libro." }] },
      { id: "bv-run", front: "run", past: "ran", participle: "run", back: "ran / run", examples: [
        { en: "They run in the park.", es: "Corren en el parque." },
        { en: "He ran a marathon.", es: "Corrio un maraton." },
        { en: "I have run 5 km today.", es: "He corrido 5 km hoy." }] },
      { id: "bv-speak", front: "speak", past: "spoke", participle: "spoken", back: "spoke / spoken", examples: [
        { en: "I speak English.", es: "Hablo ingles." },
        { en: "She spoke clearly.", es: "Hablo claramente." },
        { en: "He has spoken to the boss.", es: "Ha hablado con el jefe." }] },
      { id: "bv-drink", front: "drink", past: "drank", participle: "drunk", back: "drank / drunk", examples: [
        { en: "I drink water.", es: "Bebo agua." },
        { en: "He drank coffee.", es: "Bebio cafe." },
        { en: "She has drunk too much soda.", es: "Ha bebido demasiada gaseosa." }] },
      { id: "bv-become", front: "become", past: "became", participle: "become", back: "became / become", examples: [
        { en: "They become friends fast.", es: "Se hacen amigos rapido." },
        { en: "She became a doctor.", es: "Se convirtio en doctora." },
        { en: "It has become popular.", es: "Se ha vuelto popular." }] },
    ],
  },
  {
    id: "regular-past",
    title: "Pasado regular (-ed)",
    subtitle: "Verbos regulares en pasado",
    recall: "Di el PASADO (-ed)",
    gradient: "from-emerald-500 to-teal-600",
    medalTitle: "Rey del -ed",
    medalDesc: "Dominaste el pasado de verbos regulares",
    items: [
      { id: "br-work", front: "work", back: "worked", examples: [
        { en: "I work from home.", es: "Trabajo desde casa." },
        { en: "I worked late yesterday.", es: "Trabaje tarde ayer." }] },
      { id: "br-play", front: "play", back: "played", examples: [
        { en: "They play soccer.", es: "Juegan futbol." },
        { en: "She played tennis.", es: "Ella jugo tenis." }] },
      { id: "br-study", front: "study", back: "studied", examples: [
        { en: "I study English.", es: "Estudio ingles." },
        { en: "He studied all night.", es: "El estudio toda la noche." }] },
      { id: "br-watch", front: "watch", back: "watched", examples: [
        { en: "We watch series.", es: "Vemos series." },
        { en: "We watched a movie.", es: "Vimos una pelicula." }] },
      { id: "br-live", front: "live", back: "lived", examples: [
        { en: "I live in Lima.", es: "Vivo en Lima." },
        { en: "They lived in Peru.", es: "Vivieron en Peru." }] },
      { id: "br-travel", front: "travel", back: "traveled", examples: [
        { en: "I travel a lot.", es: "Viajo mucho." },
        { en: "I traveled last month.", es: "Viaje el mes pasado." }] },
      { id: "br-cook", front: "cook", back: "cooked", examples: [
        { en: "She cooks well.", es: "Ella cocina bien." },
        { en: "She cooked dinner.", es: "Ella cocino la cena." }] },
      { id: "br-call", front: "call", back: "called", examples: [
        { en: "I call my mom daily.", es: "Llamo a mi mama a diario." },
        { en: "He called me.", es: "El me llamo." }] },
      { id: "br-want", front: "want", back: "wanted", examples: [
        { en: "I want to learn.", es: "Quiero aprender." },
        { en: "I wanted to help.", es: "Queria ayudar." }] },
      { id: "br-start", front: "start", back: "started", examples: [
        { en: "Classes start today.", es: "Las clases empiezan hoy." },
        { en: "The class started at 9.", es: "La clase empezo a las 9." }] },
      { id: "br-finish", front: "finish", back: "finished", examples: [
        { en: "We finish at 5.", es: "Terminamos a las 5." },
        { en: "We finished the task.", es: "Terminamos la tarea." }] },
      { id: "br-stop", front: "stop", back: "stopped", examples: [
        { en: "Buses stop here.", es: "Los buses paran aqui." },
        { en: "The bus stopped here.", es: "El bus paro aqui." }] },
    ],
  },
  {
    id: "past-time",
    title: "Expresiones de tiempo (pasado)",
    subtitle: "Cuando paso algo",
    recall: "Di el SIGNIFICADO en espanol",
    gradient: "from-amber-500 to-orange-600",
    medalTitle: "Viajero del tiempo",
    medalDesc: "Dominaste las expresiones de tiempo pasado",
    items: [
      { id: "bt-yesterday", front: "yesterday", back: "ayer", examples: [
        { en: "I saw him yesterday.", es: "Lo vi ayer." }] },
      { id: "bt-lastnight", front: "last night", back: "anoche", examples: [
        { en: "We studied last night.", es: "Estudiamos anoche." }] },
      { id: "bt-lastweek", front: "last week", back: "la semana pasada", examples: [
        { en: "She left last week.", es: "Se fue la semana pasada." }] },
      { id: "bt-lastyear", front: "last year", back: "el ano pasado", examples: [
        { en: "I traveled last year.", es: "Viaje el ano pasado." }] },
      { id: "bt-ago", front: "two days ago", back: "hace dos dias", examples: [
        { en: "He called two days ago.", es: "Llamo hace dos dias." }] },
      { id: "bt-thismorning", front: "this morning", back: "esta manana", examples: [
        { en: "I ran this morning.", es: "Corri esta manana." }] },
      { id: "bt-lastweekend", front: "last weekend", back: "el fin de semana pasado", examples: [
        { en: "We relaxed last weekend.", es: "Descansamos el fin de semana pasado." }] },
      { id: "bt-anhourago", front: "an hour ago", back: "hace una hora", examples: [
        { en: "She arrived an hour ago.", es: "Llego hace una hora." }] },
      { id: "bt-theotherday", front: "the other day", back: "el otro dia", examples: [
        { en: "I met her the other day.", es: "La conoci el otro dia." }] },
      { id: "bt-in2010", front: "in 2010", back: "en 2010", examples: [
        { en: "They married in 2010.", es: "Se casaron en 2010." }] },
    ],
  },
];

/** Devuelve un mazo por id (o null). */
export function bonusDeckById(id) {
  return BONUS_DECKS.find((d) => d.id === id) || null;
}
