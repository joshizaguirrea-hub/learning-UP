/**
 * data/topic-verb-decks.js — Verbos CONJUGADOS atados al TEMA de una unidad.
 *
 * POR QUE ESTE ARCHIVO EXISTE (y no se mete todo en bonus-decks.js)
 * --------------------------------------------------------------------
 * data/bonus-decks.js ya tenia "Verbos irregulares" y "Pasado regular (-ed)",
 * pero son GENERICOS: la unidad "Work & Career" y la unidad "Travel & Plans"
 * ofrecen EXACTAMENTE los mismos dos mazos, sin relacion con su tema. Un
 * alumno de B1 en "Work & Career" nunca practica la conjugacion de "apply",
 * "hire", "manage" o "promote" -- palabras que SI aprende como vocabulario
 * (ver data/units/work-career-b1.js) pero sin pasado ni participio.
 *
 * Este archivo guarda mazos de verbos por TEMA (campo `topic` = el `id` real
 * de la unidad en data/units/*.js). Reutiliza el MISMO motor que ya existia
 * para los mazos genericos:
 *   - core/verb-practice.js -> genera los 3 ejercicios (elegir pasado, cloze
 *     pasado, cloze participio) a partir de {front, past, participle, examples}.
 *   - core/verb-tips.js     -> genera los "pops" de ayuda (regla, usos, tips).
 *   - features/bonus.js     -> la pantalla de flashcard + SRS + medalla, que
 *     ya sabe pintar CUALQUIER mazo con esta forma.
 * Cero UI nueva, cero logica nueva: solo DATOS con el mismo contrato.
 *
 * ESTRATEGIA "VERTICAL SLICE" (docs/PEDAGOGIA.md, seccion 7): construimos
 * UNA unidad completa (Work & Career, B1) para validar el patron antes de
 * escalarlo a las otras 11 unidades del nivel. Para anadir la siguiente:
 *   1. Copia un bloque de abajo.
 *   2. Cambia `id`, `topic` (debe ser el `id` real de la unidad), `title`.
 *   3. Elige 8-10 verbos de ESE tema con pasado/participio reales.
 *   4. tools/check_topic_verbs.py falla si `topic` no existe como unidad real
 *      o si algun `id` de item choca con otro ya usado en el SRS.
 */

export const TOPIC_VERB_DECKS = [
  {
    id: "verbs-work-career-b1",
    level: "B1",
    topic: "work-career-b1", // debe coincidir con WORK_CAREER_B1.id
    title: "Verbos de Work & Career",
    subtitle: "Los verbos del tema, en pasado y participio",
    recall: "Di el PASADO y el PARTICIPIO",
    gradient: "from-teal-500 to-emerald-700",
    practice: true,
    medalTitle: "Verbos del trabajo dominados",
    medalDesc: "Dominaste los verbos clave de Work & Career",
    items: [
      { id: "tvwc-apply", front: "apply", past: "applied", back: "applied / applied", examples: [
        { en: "I applied for the manager position last week.", es: "Postule al puesto de gerente la semana pasada." },
        { en: "She has applied to three companies this month.", es: "Ha postulado a tres empresas este mes." }] },
      { id: "tvwc-hire", front: "hire", past: "hired", back: "hired / hired", examples: [
        { en: "They hired two new engineers in May.", es: "Contrataron a dos ingenieros nuevos en mayo." },
        { en: "We have hired a great team this year.", es: "Hemos contratado un gran equipo este ano." }] },
      { id: "tvwc-fire", front: "fire", past: "fired", back: "fired / fired", examples: [
        { en: "The company fired him for missing deadlines.", es: "La empresa lo despidio por no cumplir plazos." },
        { en: "Nobody has been fired from this team before.", es: "Nunca han despedido a nadie de este equipo." }] },
      { id: "tvwc-manage", front: "manage", past: "managed", back: "managed / managed", examples: [
        { en: "She managed a team of ten people.", es: "Ella gestiono un equipo de diez personas." },
        { en: "I have managed this project since January.", es: "He gestionado este proyecto desde enero." }] },
      { id: "tvwc-promote", front: "promote", past: "promoted", back: "promoted / promoted", examples: [
        { en: "They promoted her to senior analyst.", es: "La ascendieron a analista senior." },
        { en: "He has been promoted twice in two years.", es: "Lo han ascendido dos veces en dos anos." }] },
      { id: "tvwc-resign", front: "resign", past: "resigned", back: "resigned / resigned", examples: [
        { en: "She resigned from her job last Friday.", es: "Renuncio a su trabajo el viernes pasado." },
        { en: "He has resigned to start his own business.", es: "Ha renunciado para iniciar su propio negocio." }] },
      { id: "tvwc-negotiate", front: "negotiate", past: "negotiated", back: "negotiated / negotiated", examples: [
        { en: "We negotiated a better salary before signing.", es: "Negociamos un mejor salario antes de firmar." },
        { en: "They have negotiated the contract terms all week.", es: "Han negociado los terminos del contrato toda la semana." }] },
      { id: "tvwc-train", front: "train", past: "trained", back: "trained / trained", examples: [
        { en: "I trained the new staff last month.", es: "Capacite al personal nuevo el mes pasado." },
        { en: "She has trained every intern in the department.", es: "Ha capacitado a cada pasante del departamento." }] },
      { id: "tvwc-quit", front: "quit", past: "quit", participle: "quit", back: "quit / quit (sin cambio)", examples: [
        { en: "He quit his job to travel the world.", es: "Dejo su trabajo para viajar por el mundo." },
        { en: "I have never quit a project halfway.", es: "Nunca he dejado un proyecto a medias." }] },
      { id: "tvwc-lead", front: "lead", past: "led", participle: "led", back: "led / led", examples: [
        { en: "She led the sales team to a record quarter.", es: "Lidero al equipo de ventas a un trimestre record." },
        { en: "He has led three major projects this year.", es: "Ha liderado tres proyectos importantes este ano." }] },
    ],
  },
  {
    id: "verbs-travel-plans-b1",
    level: "B1",
    topic: "travel-plans-b1",
    title: "Verbos de Travel & Plans",
    subtitle: "Los verbos del tema, en pasado y participio",
    recall: "Di el PASADO y el PARTICIPIO",
    gradient: "from-teal-500 to-emerald-700",
    practice: true,
    medalTitle: "Verbos de viaje dominados",
    medalDesc: "Dominaste los verbos clave de Travel & Plans",
    items: [
      { id: "tvtp-book", front: "book", past: "booked", back: "booked / booked", examples: [
        { en: "I booked a round trip flight to Toronto.", es: "Reserve un vuelo de ida y vuelta a Toronto." },
        { en: "We have booked a hotel for three nights.", es: "Hemos reservado un hotel por tres noches." }] },
      { id: "tvtp-depart", front: "depart", past: "departed", back: "departed / departed", examples: [
        { en: "The flight departed two hours late.", es: "El vuelo salio dos horas tarde." },
        { en: "Our train has already departed.", es: "Nuestro tren ya ha salido." }] },
      { id: "tvtp-arrive", front: "arrive", past: "arrived", back: "arrived / arrived", examples: [
        { en: "We arrived in Toronto in the afternoon.", es: "Llegamos a Toronto por la tarde." },
        { en: "She has just arrived at the hotel.", es: "Ella acaba de llegar al hotel." }] },
      { id: "tvtp-pack", front: "pack", past: "packed", back: "packed / packed", examples: [
        { en: "I packed my luggage the night before.", es: "Empaque mi equipaje la noche anterior." },
        { en: "Have you packed your boarding pass?", es: "Has empacado tu pase de abordar?" }] },
      { id: "tvtp-fly", front: "fly", past: "flew", participle: "flown", back: "flew / flown", examples: [
        { en: "We flew to Rome for our vacation.", es: "Volamos a Roma para las vacaciones." },
        { en: "She has flown to Canada twice this year.", es: "Ella ha volado a Canada dos veces este ano." }] },
      { id: "tvtp-land", front: "land", past: "landed", back: "landed / landed", examples: [
        { en: "The plane landed safely despite the delay.", es: "El avion aterrizo a salvo a pesar del retraso." },
        { en: "We have just landed at our destination.", es: "Acabamos de aterrizar en nuestro destino." }] },
      { id: "tvtp-cancel", front: "cancel", past: "cancelled", back: "cancelled / cancelled", examples: [
        { en: "They cancelled the reservation at the last minute.", es: "Cancelaron la reservacion a ultima hora." },
        { en: "The airline has cancelled two flights today.", es: "La aerolinea ha cancelado dos vuelos hoy." }] },
      { id: "tvtp-confirm", front: "confirm", past: "confirmed", back: "confirmed / confirmed", examples: [
        { en: "I confirmed my reservation online.", es: "Confirme mi reservacion en linea." },
        { en: "We have confirmed the check-in time.", es: "Hemos confirmado la hora de registro." }] },
      { id: "tvtp-explore", front: "explore", past: "explored", back: "explored / explored", examples: [
        { en: "We explored the city on foot.", es: "Exploramos la ciudad a pie." },
        { en: "She has explored most of South America.", es: "Ella ha explorado casi toda Sudamerica." }] },
    ],
  },
  {
    id: "verbs-technology-b1",
    level: "B1",
    topic: "technology-b1",
    title: "Verbos de Technology & Internet",
    subtitle: "Los verbos del tema, en pasado y participio",
    recall: "Di el PASADO y el PARTICIPIO",
    gradient: "from-teal-500 to-emerald-700",
    practice: true,
    medalTitle: "Verbos de tecnologia dominados",
    medalDesc: "Dominaste los verbos clave de Technology & Internet",
    items: [
      { id: "tvtech-download", front: "download", past: "downloaded", back: "downloaded / downloaded", examples: [
        { en: "I downloaded the app last night.", es: "Descargue la aplicacion anoche." },
        { en: "She has downloaded every update so far.", es: "Ella ha descargado cada actualizacion hasta ahora." }] },
      { id: "tvtech-update", front: "update", past: "updated", back: "updated / updated", examples: [
        { en: "He updated the software this morning.", es: "El actualizo el software esta manana." },
        { en: "We have updated our devices this week.", es: "Hemos actualizado nuestros dispositivos esta semana." }] },
      { id: "tvtech-connect", front: "connect", past: "connected", back: "connected / connected", examples: [
        { en: "I connected to the wifi right away.", es: "Me conecte al wifi de inmediato." },
        { en: "The device has connected to the network.", es: "El dispositivo se ha conectado a la red." }] },
      { id: "tvtech-charge", front: "charge", past: "charged", back: "charged / charged", examples: [
        { en: "I charged my phone overnight.", es: "Cargue mi telefono durante la noche." },
        { en: "She has charged the tablet twice today.", es: "Ella ha cargado la tableta dos veces hoy." }] },
      { id: "tvtech-share", front: "share", past: "shared", back: "shared / shared", examples: [
        { en: "I shared the photos with my friends.", es: "Compartí las fotos con mis amigos." },
        { en: "She has shared the article on social media.", es: "Ella ha compartido el articulo en redes sociales." }] },
      { id: "tvtech-upload", front: "upload", past: "uploaded", back: "uploaded / uploaded", examples: [
        { en: "He uploaded the video this afternoon.", es: "Subio el video esta tarde." },
        { en: "I have uploaded all my documents online.", es: "He subido todos mis documentos en linea." }] },
      { id: "tvtech-install", front: "install", past: "installed", back: "installed / installed", examples: [
        { en: "I installed the new app yesterday.", es: "Instale la nueva aplicacion ayer." },
        { en: "They have installed the update on every device.", es: "Han instalado la actualizacion en cada dispositivo." }] },
      { id: "tvtech-click", front: "click", past: "clicked", back: "clicked / clicked", examples: [
        { en: "She clicked the wrong link by mistake.", es: "Ella hizo clic en el enlace equivocado por error." },
        { en: "I have clicked that button many times.", es: "He hecho clic en ese boton muchas veces." }] },
      { id: "tvtech-post", front: "post", past: "posted", back: "posted / posted", examples: [
        { en: "He posted a photo on social media.", es: "Publico una foto en redes sociales." },
        { en: "We have posted the results online.", es: "Hemos publicado los resultados en linea." }] },
    ],
  },
  {
    id: "verbs-environment-b1",
    level: "B1",
    topic: "environment-b1",
    title: "Verbos de Environment",
    subtitle: "Los verbos del tema, en pasado y participio",
    recall: "Di el PASADO y el PARTICIPIO",
    gradient: "from-teal-500 to-emerald-700",
    practice: true,
    medalTitle: "Verbos del medio ambiente dominados",
    medalDesc: "Dominaste los verbos clave de Environment",
    items: [
      { id: "tvenv-recycle", front: "recycle", past: "recycled", back: "recycled / recycled", examples: [
        { en: "We recycled all the glass bottles.", es: "Reciclamos todas las botellas de vidrio." },
        { en: "This paper has been recycled twice.", es: "Este papel ha sido reciclado dos veces." }] },
      { id: "tvenv-pollute", front: "pollute", past: "polluted", back: "polluted / polluted", examples: [
        { en: "The factory polluted the river for years.", es: "La fabrica contamino el rio durante anos." },
        { en: "The air has been polluted by traffic.", es: "El aire ha sido contaminado por el trafico." }] },
      { id: "tvenv-protect", front: "protect", past: "protected", back: "protected / protected", examples: [
        { en: "They protected the forest from fires.", es: "Protegieron el bosque de los incendios." },
        { en: "This area has been protected since 1990.", es: "Esta area ha sido protegida desde 1990." }] },
      { id: "tvenv-save", front: "save", past: "saved", back: "saved / saved", examples: [
        { en: "We saved a lot of water last month.", es: "Ahorramos mucha agua el mes pasado." },
        { en: "The new taps have saved thousands of litres.", es: "Los grifos nuevos han ahorrado miles de litros." }] },
      { id: "tvenv-plant", front: "plant", past: "planted", back: "planted / planted", examples: [
        { en: "The students planted trees in spring.", es: "Los estudiantes plantaron arboles en primavera." },
        { en: "A hundred trees have been planted this year.", es: "Se han plantado cien arboles este ano." }] },
      { id: "tvenv-reduce", front: "reduce", past: "reduced", back: "reduced / reduced", examples: [
        { en: "We reduced our plastic use last year.", es: "Redujimos nuestro uso de plastico el ano pasado." },
        { en: "Waste has been reduced by half.", es: "Los residuos se han reducido a la mitad." }] },
      { id: "tvenv-reuse", front: "reuse", past: "reused", back: "reused / reused", examples: [
        { en: "She reused the bottles for the garden.", es: "Ella reutilizo las botellas para el jardin." },
        { en: "These bags have been reused many times.", es: "Estas bolsas se han reutilizado muchas veces." }] },
      { id: "tvenv-waste", front: "waste", past: "wasted", back: "wasted / wasted", examples: [
        { en: "They wasted a lot of food at the party.", es: "Desperdiciaron mucha comida en la fiesta." },
        { en: "Too much energy has been wasted this winter.", es: "Se ha desperdiciado demasiada energia este invierno." }] },
      { id: "tvenv-clean", front: "clean", past: "cleaned", back: "cleaned / cleaned", examples: [
        { en: "Volunteers cleaned the beach last weekend.", es: "Voluntarios limpiaron la playa el fin de semana pasado." },
        { en: "The river has been cleaned since the project started.", es: "El rio ha sido limpiado desde que empezo el proyecto." }] },
    ],
  },
  {
    id: "verbs-education-b1",
    level: "B1",
    topic: "education-b1",
    title: "Verbos de Education & learning",
    subtitle: "Los verbos del tema, en pasado y participio",
    recall: "Di el PASADO y el PARTICIPIO",
    gradient: "from-teal-500 to-emerald-700",
    practice: true,
    medalTitle: "Verbos de estudio dominados",
    medalDesc: "Dominaste los verbos clave de Education & learning",
    items: [
      { id: "tvedu-learn", front: "learn", past: "learned", back: "learned / learned", examples: [
        { en: "I learned something new every day.", es: "Aprendi algo nuevo cada dia." },
        { en: "She has learned three languages.", es: "Ella ha aprendido tres idiomas." }] },
      { id: "tvedu-study", front: "study", past: "studied", back: "studied / studied", examples: [
        { en: "He studied every evening before the exam.", es: "El estudio cada tarde antes del examen." },
        { en: "I have studied this topic before.", es: "He estudiado este tema antes." }] },
      { id: "tvedu-pass", front: "pass", past: "passed", back: "passed / passed", examples: [
        { en: "She passed the exam with a good grade.", es: "Ella aprobo el examen con buena nota." },
        { en: "I have passed every test this term.", es: "He aprobado cada examen este semestre." }] },
      { id: "tvedu-fail", front: "fail", past: "failed", back: "failed / failed", examples: [
        { en: "He failed the test because he didn't prepare.", es: "Reprobo el examen porque no se preparo." },
        { en: "She has never failed a class.", es: "Ella nunca ha reprobado una clase." }] },
      { id: "tvedu-teach", front: "teach", past: "taught", participle: "taught", back: "taught / taught", examples: [
        { en: "That teacher taught me a lot about history.", es: "Esa profesora me enseno mucho sobre historia." },
        { en: "She has taught here for ten years.", es: "Ella ha ensenado aqui durante diez anos." }] },
      { id: "tvedu-understand", front: "understand", past: "understood", participle: "understood", back: "understood / understood", examples: [
        { en: "I understood the lesson after the second try.", es: "Entendi la leccion despues del segundo intento." },
        { en: "She has understood the method perfectly.", es: "Ella ha entendido el metodo perfectamente." }] },
      { id: "tvedu-revise", front: "revise", past: "revised", back: "revised / revised", examples: [
        { en: "I revised my notes the night before.", es: "Repase mis apuntes la noche anterior." },
        { en: "We have revised the whole unit this week.", es: "Hemos repasado toda la unidad esta semana." }] },
      { id: "tvedu-graduate", front: "graduate", past: "graduated", back: "graduated / graduated", examples: [
        { en: "She graduated from university last year.", es: "Ella se graduo de la universidad el ano pasado." },
        { en: "He has graduated with a degree in biology.", es: "El se ha graduado con un titulo en biologia." }] },
      { id: "tvedu-submit", front: "submit", past: "submitted", back: "submitted / submitted", examples: [
        { en: "I submitted my homework on time.", es: "Entregue mi tarea a tiempo." },
        { en: "She has submitted every assignment this term.", es: "Ella ha entregado cada tarea este semestre." }] },
    ],
  },
  {
    id: "verbs-money-b1",
    level: "B1",
    topic: "money-b1",
    title: "Verbos de Money & shopping",
    subtitle: "Los verbos del tema, en pasado y participio",
    recall: "Di el PASADO y el PARTICIPIO",
    gradient: "from-teal-500 to-emerald-700",
    practice: true,
    medalTitle: "Verbos de dinero dominados",
    medalDesc: "Dominaste los verbos clave de Money & shopping",
    items: [
      { id: "tvmon-save", front: "save", past: "saved", back: "saved / saved", examples: [
        { en: "I saved a little money every month.", es: "Ahorre un poco de dinero cada mes." },
        { en: "She has saved enough for a trip.", es: "Ella ha ahorrado suficiente para un viaje." }] },
      { id: "tvmon-spend", front: "spend", past: "spent", participle: "spent", back: "spent / spent", examples: [
        { en: "We spent too much money last weekend.", es: "Gastamos demasiado dinero el fin de semana pasado." },
        { en: "I have spent all my savings on the car.", es: "He gastado todos mis ahorros en el carro." }] },
      { id: "tvmon-earn", front: "earn", past: "earned", back: "earned / earned", examples: [
        { en: "He earned a good salary last year.", es: "El gano un buen salario el ano pasado." },
        { en: "She has earned a bonus this quarter.", es: "Ella ha ganado un bono este trimestre." }] },
      { id: "tvmon-borrow", front: "borrow", past: "borrowed", back: "borrowed / borrowed", examples: [
        { en: "I borrowed ten dollars from my friend.", es: "Pedi prestados diez dolares a mi amigo." },
        { en: "She has borrowed money from the bank before.", es: "Ella ha pedido dinero prestado al banco antes." }] },
      { id: "tvmon-lend", front: "lend", past: "lent", participle: "lent", back: "lent / lent", examples: [
        { en: "I lent him twenty dollars last week.", es: "Le preste veinte dolares la semana pasada." },
        { en: "She has lent money to her brother before.", es: "Ella le ha prestado dinero a su hermano antes." }] },
      { id: "tvmon-afford", front: "afford", past: "afforded", back: "afforded / afforded", examples: [
        { en: "We couldn't afford the expensive hotel.", es: "No pudimos pagar el hotel caro." },
        { en: "They have never afforded a new car.", es: "Ellos nunca se han podido permitir un carro nuevo." }] },
      { id: "tvmon-invest", front: "invest", past: "invested", back: "invested / invested", examples: [
        { en: "She invested her savings in a small business.", es: "Ella invirtio sus ahorros en un pequeno negocio." },
        { en: "They have invested in the stock market.", es: "Han invertido en la bolsa de valores." }] },
      { id: "tvmon-pay", front: "pay", past: "paid", participle: "paid", back: "paid / paid", examples: [
        { en: "I paid in cash for the jacket.", es: "Pague en efectivo por la chaqueta." },
        { en: "We have paid the bill already.", es: "Ya hemos pagado la cuenta." }] },
      { id: "tvmon-budget", front: "budget", past: "budgeted", back: "budgeted / budgeted", examples: [
        { en: "We budgeted carefully for the trip.", es: "Presupuestamos con cuidado para el viaje." },
        { en: "She has budgeted for the whole month.", es: "Ella ha presupuestado para todo el mes." }] },
    ],
  },
  {
    id: "verbs-relationships-b1",
    level: "B1",
    topic: "relationships-b1",
    title: "Verbos de Relationships",
    subtitle: "Los verbos del tema, en pasado y participio",
    recall: "Di el PASADO y el PARTICIPIO",
    gradient: "from-teal-500 to-emerald-700",
    practice: true,
    medalTitle: "Verbos de relaciones dominados",
    medalDesc: "Dominaste los verbos clave de Relationships",
    items: [
      { id: "tvrel-trust", front: "trust", past: "trusted", back: "trusted / trusted", examples: [
        { en: "I trusted her from the first day.", es: "Confie en ella desde el primer dia." },
        { en: "We have trusted each other for years.", es: "Hemos confiado el uno en el otro durante anos." }] },
      { id: "tvrel-argue", front: "argue", past: "argued", back: "argued / argued", examples: [
        { en: "They argued about small things sometimes.", es: "A veces discutian por cosas pequenas." },
        { en: "We have argued only once this year.", es: "Hemos discutido solo una vez este ano." }] },
      { id: "tvrel-support", front: "support", past: "supported", back: "supported / supported", examples: [
        { en: "My family supported me through hard times.", es: "Mi familia me apoyo en tiempos dificiles." },
        { en: "She has supported her brother all her life.", es: "Ella ha apoyado a su hermano toda su vida." }] },
      { id: "tvrel-forgive", front: "forgive", past: "forgave", participle: "forgiven", back: "forgave / forgiven", examples: [
        { en: "She forgave her friend after the argument.", es: "Ella perdono a su amiga despues de la discusion." },
        { en: "I have forgiven him for that mistake.", es: "Lo he perdonado por ese error." }] },
      { id: "tvrel-miss", front: "miss", past: "missed", back: "missed / missed", examples: [
        { en: "I missed my old friends a lot.", es: "Extrane mucho a mis viejos amigos." },
        { en: "She has missed her family since she moved.", es: "Ella ha extranado a su familia desde que se mudo." }] },
      { id: "tvrel-meet", front: "meet", past: "met", participle: "met", back: "met / met", examples: [
        { en: "We met at a friend's party.", es: "Nos conocimos en la fiesta de un amigo." },
        { en: "I have met her parents already.", es: "Ya he conocido a sus padres." }] },
      { id: "tvrel-fall", front: "fall", past: "fell", participle: "fallen", back: "fell / fallen", examples: [
        { en: "They fell in love last year.", es: "Se enamoraron el ano pasado." },
        { en: "He has fallen in love before.", es: "El se ha enamorado antes." }] },
      { id: "tvrel-care", front: "care", past: "cared", back: "cared / cared", examples: [
        { en: "She cared about him more than anything.", es: "Ella se preocupaba por el mas que por nada." },
        { en: "I have always cared about my friends.", es: "Siempre me he preocupado por mis amigos." }] },
      { id: "tvrel-help", front: "help", past: "helped", back: "helped / helped", examples: [
        { en: "She helped me move to my new house.", es: "Ella me ayudo a mudarme a mi casa nueva." },
        { en: "They have helped each other for years.", es: "Se han ayudado el uno al otro durante anos." }] },
    ],
  },
  {
    id: "verbs-media-b1",
    level: "B1",
    topic: "media-b1",
    title: "Verbos de Media & news",
    subtitle: "Los verbos del tema, en pasado y participio",
    recall: "Di el PASADO y el PARTICIPIO",
    gradient: "from-teal-500 to-emerald-700",
    practice: true,
    medalTitle: "Verbos de medios dominados",
    medalDesc: "Dominaste los verbos clave de Media & news",
    items: [
      { id: "tvmed-report", front: "report", past: "reported", back: "reported / reported", examples: [
        { en: "The journalist reported the story that night.", es: "El periodista reporto la noticia esa noche." },
        { en: "They have reported on the election for weeks.", es: "Han reportado sobre la eleccion durante semanas." }] },
      { id: "tvmed-announce", front: "announce", past: "announced", back: "announced / announced", examples: [
        { en: "The mayor announced the new park.", es: "El alcalde anuncio el nuevo parque." },
        { en: "They have announced the results already.", es: "Ya han anunciado los resultados." }] },
      { id: "tvmed-broadcast", front: "broadcast", past: "broadcast", participle: "broadcast", back: "broadcast / broadcast (sin cambio)", examples: [
        { en: "The match was broadcast live last night.", es: "El partido se transmitio en vivo anoche." },
        { en: "This channel has broadcast the news for years.", es: "Este canal ha transmitido las noticias durante anos." }] },
      { id: "tvmed-publish", front: "publish", past: "published", back: "published / published", examples: [
        { en: "The newspaper published the article today.", es: "El periodico publico el articulo hoy." },
        { en: "She has published three articles this month.", es: "Ella ha publicado tres articulos este mes." }] },
      { id: "tvmed-interview", front: "interview", past: "interviewed", back: "interviewed / interviewed", examples: [
        { en: "The reporter interviewed the mayor yesterday.", es: "El reportero entrevisto al alcalde ayer." },
        { en: "She has interviewed many famous people.", es: "Ella ha entrevistado a mucha gente famosa." }] },
      { id: "tvmed-watch", front: "watch", past: "watched", back: "watched / watched", examples: [
        { en: "I watched the news last night.", es: "Vi las noticias anoche." },
        { en: "We have watched that channel for years.", es: "Hemos visto ese canal durante anos." }] },
      { id: "tvmed-write", front: "write", past: "wrote", participle: "written", back: "wrote / written", examples: [
        { en: "She wrote an article about fake news.", es: "Ella escribio un articulo sobre noticias falsas." },
        { en: "He has written for this newspaper for years.", es: "El ha escrito para este periodico durante anos." }] },
      { id: "tvmed-read", front: "read", past: "read", participle: "read", back: "read / read (suena 'red')", examples: [
        { en: "I read an interesting article this morning.", es: "Lei un articulo interesante esta manana." },
        { en: "She has read every headline today.", es: "Ella ha leido cada titular hoy." }] },
      { id: "tvmed-check", front: "check", past: "checked", back: "checked / checked", examples: [
        { en: "I checked the source before sharing it.", es: "Revise la fuente antes de compartirla." },
        { en: "She has checked every fact in the story.", es: "Ella ha revisado cada dato de la noticia." }] },
    ],
  },
  {
    id: "verbs-lifestyle-b1",
    level: "B1",
    topic: "lifestyle-b1",
    title: "Verbos de Health & lifestyle",
    subtitle: "Los verbos del tema, en pasado y participio",
    recall: "Di el PASADO y el PARTICIPIO",
    gradient: "from-teal-500 to-emerald-700",
    practice: true,
    medalTitle: "Verbos de vida sana dominados",
    medalDesc: "Dominaste los verbos clave de Health & lifestyle",
    items: [
      { id: "tvlife-relax", front: "relax", past: "relaxed", back: "relaxed / relaxed", examples: [
        { en: "I relaxed on the sofa after work.", es: "Me relaje en el sofa despues del trabajo." },
        { en: "She has relaxed more since she changed jobs.", es: "Ella se ha relajado mas desde que cambio de trabajo." }] },
      { id: "tvlife-exercise", front: "exercise", past: "exercised", back: "exercised / exercised", examples: [
        { en: "He exercised every morning last month.", es: "El hizo ejercicio cada manana el mes pasado." },
        { en: "I have exercised three times this week.", es: "He hecho ejercicio tres veces esta semana." }] },
      { id: "tvlife-avoid", front: "avoid", past: "avoided", back: "avoided / avoided", examples: [
        { en: "She avoided sugar for a whole month.", es: "Ella evito el azucar durante un mes entero." },
        { en: "I have avoided junk food this week.", es: "He evitado la comida chatarra esta semana." }] },
      { id: "tvlife-sleep", front: "sleep", past: "slept", participle: "slept", back: "slept / slept", examples: [
        { en: "I slept eight hours last night.", es: "Dormi ocho horas anoche." },
        { en: "She has slept badly all week.", es: "Ella ha dormido mal toda la semana." }] },
      { id: "tvlife-eat", front: "eat", past: "ate", participle: "eaten", back: "ate / eaten", examples: [
        { en: "He ate too much junk food last week.", es: "El comio demasiada comida chatarra la semana pasada." },
        { en: "I have eaten better since the diet.", es: "He comido mejor desde la dieta." }] },
      { id: "tvlife-feel", front: "feel", past: "felt", participle: "felt", back: "felt / felt", examples: [
        { en: "She felt tired after the long week.", es: "Ella se sintio cansada despues de la semana larga." },
        { en: "I have felt more energetic since I started exercising.", es: "Me he sentido con mas energia desde que empece a hacer ejercicio." }] },
      { id: "tvlife-improve", front: "improve", past: "improved", back: "improved / improved", examples: [
        { en: "His sleep improved after he changed his habits.", es: "Su sueno mejoro despues de cambiar sus habitos." },
        { en: "Her wellbeing has improved a lot this year.", es: "Su bienestar ha mejorado mucho este ano." }] },
      { id: "tvlife-rest", front: "rest", past: "rested", back: "rested / rested", examples: [
        { en: "I rested all weekend after the trip.", es: "Descanse todo el fin de semana despues del viaje." },
        { en: "She has rested more since she reduced stress.", es: "Ella ha descansado mas desde que redujo el estres." }] },
      { id: "tvlife-balance", front: "balance", past: "balanced", back: "balanced / balanced", examples: [
        { en: "She balanced work and rest better this month.", es: "Ella equilibro mejor el trabajo y el descanso este mes." },
        { en: "He has balanced his diet since the doctor's advice.", es: "El ha equilibrado su dieta desde el consejo del doctor." }] },
    ],
  },
  {
    id: "verbs-experiences-b1",
    level: "B1",
    topic: "experiences-b1",
    title: "Verbos de Experiences",
    subtitle: "Los verbos del tema, en pasado y participio",
    recall: "Di el PASADO y el PARTICIPIO",
    gradient: "from-teal-500 to-emerald-700",
    practice: true,
    medalTitle: "Verbos de experiencias dominados",
    medalDesc: "Dominaste los verbos clave de Experiences",
    items: [
      { id: "tvexp-try", front: "try", past: "tried", back: "tried / tried", examples: [
        { en: "I tried surfing for the first time last year.", es: "Probe el surf por primera vez el ano pasado." },
        { en: "She has tried many new things recently.", es: "Ella ha probado muchas cosas nuevas recientemente." }] },
      { id: "tvexp-achieve", front: "achieve", past: "achieved", back: "achieved / achieved", examples: [
        { en: "She achieved her goal after months of work.", es: "Ella logro su meta despues de meses de trabajo." },
        { en: "I have achieved a lot this year.", es: "He logrado mucho este ano." }] },
      { id: "tvexp-improve", front: "improve", past: "improved", back: "improved / improved", examples: [
        { en: "My English improved a lot abroad.", es: "Mi ingles mejoro mucho en el extranjero." },
        { en: "She has improved every month since she started.", es: "Ella ha mejorado cada mes desde que empezo." }] },
      { id: "tvexp-travel", front: "travel", past: "travelled", back: "travelled / travelled", examples: [
        { en: "We travelled around Asia for three months.", es: "Viajamos por Asia durante tres meses." },
        { en: "She has travelled to ten countries so far.", es: "Ella ha viajado a diez paises hasta ahora." }] },
      { id: "tvexp-experience", front: "experience", past: "experienced", back: "experienced / experienced", examples: [
        { en: "I experienced a big challenge living abroad.", es: "Experimente un gran reto al vivir en el extranjero." },
        { en: "She has experienced many amazing things.", es: "Ella ha experimentado muchas cosas increibles." }] },
      { id: "tvexp-practice", front: "practice", past: "practised", back: "practised / practised", examples: [
        { en: "He practised the guitar every day since January.", es: "El practico la guitarra cada dia desde enero." },
        { en: "I have practised speaking English for years.", es: "He practicado hablar ingles durante anos." }] },
      { id: "tvexp-discover", front: "discover", past: "discovered", back: "discovered / discovered", examples: [
        { en: "We discovered a new hobby last summer.", es: "Descubrimos un nuevo pasatiempo el verano pasado." },
        { en: "She has discovered a passion for painting.", es: "Ella ha descubierto una pasion por la pintura." }] },
      { id: "tvexp-overcome", front: "overcome", past: "overcame", participle: "overcome", back: "overcame / overcome", examples: [
        { en: "She overcame a big challenge last year.", es: "Ella supero un gran reto el ano pasado." },
        { en: "I have overcome my fear of speaking in public.", es: "He superado mi miedo a hablar en publico." }] },
      { id: "tvexp-face", front: "face", past: "faced", back: "faced / faced", examples: [
        { en: "He faced a difficult situation abroad.", es: "El enfrento una situacion dificil en el extranjero." },
        { en: "She has faced many challenges this year.", es: "Ella ha enfrentado muchos retos este ano." }] },
    ],
  },
  {
    id: "verbs-decisions-b1",
    level: "B1",
    topic: "decisions-b1",
    title: "Verbos de Making decisions",
    subtitle: "Los verbos del tema, en pasado y participio",
    recall: "Di el PASADO y el PARTICIPIO",
    gradient: "from-teal-500 to-emerald-700",
    practice: true,
    medalTitle: "Verbos de decisiones dominados",
    medalDesc: "Dominaste los verbos clave de Making decisions",
    items: [
      { id: "tvdec-decide", front: "decide", past: "decided", back: "decided / decided", examples: [
        { en: "She decided to accept the job offer.", es: "Ella decidio aceptar la oferta de trabajo." },
        { en: "I have decided to stay here.", es: "He decidido quedarme aqui." }] },
      { id: "tvdec-choose", front: "choose", past: "chose", participle: "chosen", back: "chose / chosen", examples: [
        { en: "He chose the safest option.", es: "El eligio la opcion mas segura." },
        { en: "She has chosen a new career path.", es: "Ella ha elegido un nuevo camino profesional." }] },
      { id: "tvdec-consider", front: "consider", past: "considered", back: "considered / considered", examples: [
        { en: "She considered all the options carefully.", es: "Ella considero todas las opciones con cuidado." },
        { en: "I have considered moving abroad before.", es: "He considerado mudarme al extranjero antes." }] },
      { id: "tvdec-regret", front: "regret", past: "regretted", back: "regretted / regretted", examples: [
        { en: "He regretted the decision immediately.", es: "El se arrepintio de la decision de inmediato." },
        { en: "I have never regretted that choice.", es: "Nunca me he arrepentido de esa eleccion." }] },
      { id: "tvdec-hesitate", front: "hesitate", past: "hesitated", back: "hesitated / hesitated", examples: [
        { en: "She hesitated before answering.", es: "Ella dudo antes de responder." },
        { en: "I have never hesitated to ask for help.", es: "Nunca he dudado en pedir ayuda." }] },
      { id: "tvdec-accept", front: "accept", past: "accepted", back: "accepted / accepted", examples: [
        { en: "She accepted the job offer abroad.", es: "Ella acepto la oferta de trabajo en el extranjero." },
        { en: "I have accepted the risk already.", es: "Ya he aceptado el riesgo." }] },
      { id: "tvdec-weigh", front: "weigh", past: "weighed", back: "weighed / weighed", examples: [
        { en: "He weighed the pros and cons first.", es: "El sopeso los pros y los contras primero." },
        { en: "She has weighed every option carefully.", es: "Ella ha sopesado cada opcion con cuidado." }] },
      { id: "tvdec-risk", front: "risk", past: "risked", back: "risked / risked", examples: [
        { en: "She risked her savings on the business.", es: "Ella arriesgo sus ahorros en el negocio." },
        { en: "I have risked a lot for this opportunity.", es: "He arriesgado mucho por esta oportunidad." }] },
      { id: "tvdec-reject", front: "reject", past: "rejected", back: "rejected / rejected", examples: [
        { en: "He rejected the first offer.", es: "El rechazo la primera oferta." },
        { en: "She has rejected two job offers this year.", es: "Ella ha rechazado dos ofertas de trabajo este ano." }] },
    ],
  },
  {
    id: "verbs-reporting-b1",
    level: "B1",
    topic: "reporting-b1",
    title: "Verbos de Reporting & opinions",
    subtitle: "Los verbos del tema, en pasado y participio",
    recall: "Di el PASADO y el PARTICIPIO",
    gradient: "from-teal-500 to-emerald-700",
    practice: true,
    medalTitle: "Verbos de opinion dominados",
    medalDesc: "Dominaste los verbos clave de Reporting & opinions",
    items: [
      { id: "tvrep-agree", front: "agree", past: "agreed", back: "agreed / agreed", examples: [
        { en: "They agreed on the final decision.", es: "Ellos estuvieron de acuerdo en la decision final." },
        { en: "We have agreed to meet once a week.", es: "Hemos acordado reunirnos una vez por semana." }] },
      { id: "tvrep-disagree", front: "disagree", past: "disagreed", back: "disagreed / disagreed", examples: [
        { en: "She disagreed with his opinion.", es: "Ella estuvo en desacuerdo con su opinion." },
        { en: "We have disagreed about this before.", es: "Hemos estado en desacuerdo sobre esto antes." }] },
      { id: "tvrep-suggest", front: "suggest", past: "suggested", back: "suggested / suggested", examples: [
        { en: "He suggested a new plan at the meeting.", es: "El sugirio un nuevo plan en la reunion." },
        { en: "She has suggested two good ideas today.", es: "Ella ha sugerido dos buenas ideas hoy." }] },
      { id: "tvrep-admit", front: "admit", past: "admitted", back: "admitted / admitted", examples: [
        { en: "She admitted that she was wrong.", es: "Ella admitio que estaba equivocada." },
        { en: "I have admitted my mistake already.", es: "Ya he admitido mi error." }] },
      { id: "tvrep-convince", front: "convince", past: "convinced", back: "convinced / convinced", examples: [
        { en: "He convinced me to try it.", es: "El me convencio de intentarlo." },
        { en: "She has convinced the whole team.", es: "Ella ha convencido a todo el equipo." }] },
      { id: "tvrep-claim", front: "claim", past: "claimed", back: "claimed / claimed", examples: [
        { en: "He claimed that the plan was perfect.", es: "El afirmo que el plan era perfecto." },
        { en: "She has claimed that before.", es: "Ella ha afirmado eso antes." }] },
      { id: "tvrep-mention", front: "mention", past: "mentioned", back: "mentioned / mentioned", examples: [
        { en: "She mentioned the problem during the call.", es: "Ella menciono el problema durante la llamada." },
        { en: "I have mentioned this point before.", es: "He mencionado este punto antes." }] },
      { id: "tvrep-argue", front: "argue", past: "argued", back: "argued / argued", examples: [
        { en: "They argued about the best option.", es: "Discutieron sobre la mejor opcion." },
        { en: "We have argued this point for an hour.", es: "Hemos discutido este punto durante una hora." }] },
      { id: "tvrep-state", front: "state", past: "stated", back: "stated / stated", examples: [
        { en: "She stated her opinion very clearly.", es: "Ella expreso su opinion con mucha claridad." },
        { en: "He has stated the same point twice.", es: "El ha expresado el mismo punto dos veces." }] },
    ],
  },
];

/** Mazo de verbos del tema de una unidad, o null si esa unidad aun no tiene uno. */
export function topicVerbDeckFor(unitId) {
  return TOPIC_VERB_DECKS.find((d) => d.topic === unitId) || null;
}
