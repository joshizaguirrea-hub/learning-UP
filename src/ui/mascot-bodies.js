/**
 * ui/mascot-bodies.js — Cuerpos COMPLETOS de robo-animales (como el perrito).
 *
 * ALMA ROBOT compartida (DRY): antena, herrajes, collar, pecho con LEDs y un
 * VISOR de ojos cian animado (bymax-mouth se mueve al hablar). Lo que hace
 * RECONOCIBLE a cada animal (y ya no clones) es la combinacion de:
 *   - ARQUETIPO de cuerpo: seated / reptile / biped / heavy / longneck
 *   - HOCICO propio (mz*): trompa con dientes (croc/dino), cachetes+dientones
 *     (hamster), hocico redondo con nariz (oso/capibara), naricita+bigotes (gato)
 *   - OREJAS/rasgos propios + PALETA distinta + PROPORCION propia
 *
 * Gradientes con IDs UNICOS por render (_uid) para que dos mascotas en la misma
 * pagina no se pisen los colores. viewBox 6 0 140 150 (igual que el perrito de
 * bymax-mascot.js). Cola class "bymax-tail" (menea); boca class "bymax-mouth".
 */

let _uid = 0;

const DEFS = `<defs>
  <radialGradient id="amEye" cx="0.35" cy="0.35" r="0.75">
    <stop offset="0" stop-color="#ecfeff"/><stop offset="0.5" stop-color="#67e8f9"/><stop offset="1" stop-color="#06b6d4"/>
  </radialGradient>
  <linearGradient id="amSheen" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity="0.28"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
  </linearGradient>
</defs>`;

const gradDefs = (u, c1, c2, hc) => `<defs>
  <linearGradient id="amBody${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
  <linearGradient id="amHead${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hc}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
</defs>`;

// ---- Piezas ROBOT compartidas ---------------------------------------------
const shadow = (rx = 42) => `<ellipse cx="70" cy="143" rx="${rx}" ry="6" fill="#0f172a" opacity="0.18"/>`;
const sheen = `<ellipse cx="60" cy="88" rx="18" ry="11" fill="url(#amSheen)"/>`;
const belly = (cy, rx = 20, ry = 24) => `<ellipse cx="70" cy="${cy}" rx="${rx}" ry="${ry}" fill="#ffffff" opacity="0.16"/>`;

const chest = (cy) => `
  <circle cx="70" cy="${cy}" r="10" fill="#0f172a"/>
  <circle cx="70" cy="${cy}" r="5.5" fill="#34d399"><animate attributeName="opacity" values="1;0.5;1" dur="2.4s" repeatCount="indefinite"/></circle>
  <rect x="60" y="${cy + 14}" width="20" height="5" rx="2.5" fill="#0f172a"/>
  <circle cx="65" cy="${cy + 16.5}" r="1.5" fill="#22d3ee"/><circle cx="70" cy="${cy + 16.5}" r="1.5" fill="#34d399"/><circle cx="75" cy="${cy + 16.5}" r="1.5" fill="#fbbf24"/>`;

const antenna = (c) => `<rect x="68.5" y="5" width="3" height="17" rx="1.5" fill="${c}"/>` +
  `<circle cx="70" cy="4" r="3.6" fill="#f472b6"><animate attributeName="opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite"/></circle>`;

const head = (f) => `<rect x="40" y="20" width="60" height="52" rx="22" fill="${f}"/>` +
  `<rect x="44" y="24" width="34" height="9" rx="4.5" fill="#ffffff" opacity="0.18"/>` +
  `<rect x="40" y="20" width="60" height="52" rx="22" fill="none" stroke="#0f172a" stroke-width="1.2" opacity="0.35"/>`;

const robotHead = () => `
  <circle cx="45" cy="30" r="1.6" fill="#0f172a" opacity="0.4"/><circle cx="95" cy="30" r="1.6" fill="#0f172a" opacity="0.4"/>`;

const collar = (c) => `<rect x="60" y="70" width="20" height="8" rx="4" fill="${c}"/>` +
  `<circle cx="64" cy="74" r="1.3" fill="#0f172a" opacity="0.5"/><circle cx="76" cy="74" r="1.3" fill="#0f172a" opacity="0.5"/>`;

// VISOR de ojos cian (mas compacto que antes: deja sitio para el hocico).
const visor = () => `
  <rect x="50" y="32" width="40" height="20" rx="10" fill="#0f172a"/>
  <rect x="52" y="34" width="36" height="16" rx="8" fill="none" stroke="#1e293b" stroke-width="1"/>
  <circle cx="61" cy="42" r="8" fill="#22d3ee" opacity="0.14"/><circle cx="79" cy="42" r="8" fill="#22d3ee" opacity="0.14"/>
  <circle cx="61" cy="42" r="5.5" fill="url(#amEye)"/><circle cx="79" cy="42" r="5.5" fill="url(#amEye)"/>
  <circle cx="59" cy="40" r="1.6" fill="#fff"/><circle cx="77" cy="40" r="1.6" fill="#fff"/>
  <rect x="52" y="39" width="36" height="1" fill="#67e8f9" opacity="0.16"><animate attributeName="y" values="37;48;37" dur="3.2s" repeatCount="indefinite"/></rect>`;
const cheeks = `<ellipse cx="52" cy="55" rx="3.5" ry="2.2" fill="#f472b6" opacity="0.5"/><ellipse cx="88" cy="55" rx="3.5" ry="2.2" fill="#f472b6" opacity="0.5"/>`;

// ---- HOCICOS por animal (mz*) ---------------------------------------------
// Redondo con nariz (oso, capibara): grande y chato.
const mzRound = (lc) => `<ellipse cx="70" cy="62" rx="16" ry="11" fill="${lc}"/>` +
  `<ellipse cx="70" cy="58" rx="5" ry="3.4" fill="#0f172a"/><path d="M70 61 v4" stroke="#0f172a" stroke-width="1.4"/>` +
  `<rect class="bymax-mouth" x="61" y="65" width="18" height="3.5" rx="1.75" fill="#0f172a" opacity="0.6"/>`;
// Pequeno con nariz (leon, canguro, jirafa).
const mzSmall = (lc) => `<ellipse cx="70" cy="61" rx="10" ry="8" fill="${lc}"/>` +
  `<ellipse cx="70" cy="57" rx="3.4" ry="2.6" fill="#0f172a"/>` +
  `<rect class="bymax-mouth" x="64" y="63" width="12" height="3" rx="1.5" fill="#0f172a" opacity="0.6"/>`;
// Cachetes + dientones (hamster).
const mzCheeks = (lc) => `<ellipse cx="54" cy="60" rx="11" ry="9" fill="${lc}"/><ellipse cx="86" cy="60" rx="11" ry="9" fill="${lc}"/>` +
  `<ellipse cx="70" cy="60" rx="7" ry="6" fill="${lc}"/><ellipse cx="70" cy="57" rx="2.6" ry="2" fill="#0f172a"/>` +
  `<rect x="66" y="61" width="3.4" height="6" rx="1" fill="#fff" stroke="#e2e8f0" stroke-width="0.5"/>` +
  `<rect x="70.6" y="61" width="3.4" height="6" rx="1" fill="#fff" stroke="#e2e8f0" stroke-width="0.5"/>`;
// Naricita felina + bigotes (gato).
const mzCat = () => `<path d="M70 55 l-3.5 4 h7 z" fill="#7c2d12"/>` +
  `<rect class="bymax-mouth" x="65" y="60" width="10" height="3" rx="1.5" fill="#0f172a" opacity="0.5"/>` +
  `<path d="M42 56 h-13 M42 61 h-13 M98 56 h13 M98 61 h13" stroke="#0f172a" stroke-width="1" opacity="0.45"/>`;
// Trompa larga con dientes (cocodrilo): sale hacia la izquierda.
const mzSnout = (lc, dc, teeth = true) => `<rect x="12" y="46" width="40" height="18" rx="8" fill="${lc}"/>` +
  `<rect x="12" y="46" width="40" height="18" rx="8" fill="none" stroke="${dc}" stroke-width="1" opacity="0.6"/>` +
  `<circle cx="18" cy="50" r="2" fill="#0f172a"/>` +
  (teeth ? `<path d="M15 64 l3 4 3 -4 3 4 3 -4 3 4 3 -4 3 4 3 -4 3 4" fill="#fff"/>` : "") +
  `<rect class="bymax-mouth" x="20" y="59" width="22" height="2.6" rx="1.3" fill="#0f172a" opacity="0.55"/>`;
// Cara de dinosaurio: bocota FRONTAL con dientes (arriba y abajo) + naricitas.
const mzDino = () => `<rect class="bymax-mouth" x="50" y="55" width="40" height="12" rx="4" fill="#0f172a"/>` +
  `<path d="M51 55 l3.6 6 3.6 -6 3.6 6 3.6 -6 3.6 6 3.6 -6 3.6 6 3.6 -6 3.6 6 3.6 -6" fill="#ffffff"/>` +
  `<path d="M55 67 l3.4 -5 3.4 5 3.4 -5 3.4 5 3.4 -5 3.4 5 3.4 -5 3.4 5" fill="#f1f5f9"/>` +
  `<circle cx="64" cy="53.5" r="1.3" fill="#0f172a"/><circle cx="76" cy="53.5" r="1.3" fill="#0f172a"/>`;
// Bracitos cortos, simetricos y pegados al cuerpo (3 garritas cada uno).
const trexArms = (f, c2) => `<path d="M49 89 q-6 3 -6 10" fill="none" stroke="${f}" stroke-width="7" stroke-linecap="round"/>` +
  `<path d="M43 100 l-3 2 M43 102 l-3 1.4 M43 104 l-3 0.8" stroke="${c2}" stroke-width="1.8" stroke-linecap="round"/>` +
  `<path d="M91 89 q6 3 6 10" fill="none" stroke="${f}" stroke-width="7" stroke-linecap="round"/>` +
  `<path d="M97 100 l3 2 M97 102 l3 1.4 M97 104 l3 0.8" stroke="${c2}" stroke-width="1.8" stroke-linecap="round"/>`;
// Trompa de elefante (baja del centro de la cara).
const trunk = (c) => `<path d="M70 60 q-4 16 -10 22 q-3 5 1 8 q5 2 6 -4 q3 -13 9 -22 z" fill="${c}"/>` +
  `<path d="M62 84 h6" stroke="#0f172a" stroke-width="1" opacity="0.4"/>`;

// ---- Colas (class bymax-tail = menea) -------------------------------------
const tailCurl = (c) => `<path class="bymax-tail" d="M100 104 Q126 98 122 74 Q112 88 96 92 Z" fill="${c}"/>`;
const tailStub = (c) => `<ellipse class="bymax-tail" cx="104" cy="112" rx="9" ry="7" fill="${c}"/>`;
const tailThick = (c) => `<path class="bymax-tail" d="M96 118 Q140 126 138 146 Q118 136 92 132 Z" fill="${c}"/>`;
const tailCroc = (c) => `<path class="bymax-tail" d="M104 112 Q144 108 144 92 L137 97 L140 87 L130 95 L133 84 L122 94 Q112 100 104 100 Z" fill="${c}"/>`;
const tailTuft = (c, t) => tailCurl(c) + `<circle cx="120" cy="75" r="6" fill="${t}"/>`; // leon: borla en la punta

// ---- Orejas / rasgos -------------------------------------------------------
const ears = {
  pointy: (c, ic) => `<path d="M46 26 L40 6 L60 22 Z" fill="${c}"/><path d="M94 26 L100 6 L80 22 Z" fill="${c}"/>` +
    `<path d="M48 23 L45 12 L55 21 Z" fill="${ic}"/><path d="M92 23 L95 12 L85 21 Z" fill="${ic}"/>`,
  tall: (c, ic) => `<rect x="49" y="0" width="8" height="24" rx="4" fill="${c}"/><rect x="83" y="0" width="8" height="24" rx="4" fill="${c}"/>` +
    `<rect x="51" y="3" width="4" height="16" rx="2" fill="${ic}"/><rect x="85" y="3" width="4" height="16" rx="2" fill="${ic}"/>`,
  roundHi: (c, ic) => `<circle cx="48" cy="20" r="8" fill="${c}"/><circle cx="92" cy="20" r="8" fill="${c}"/>` +
    `<circle cx="48" cy="20" r="4" fill="${ic}"/><circle cx="92" cy="20" r="4" fill="${ic}"/>`,
  roundSm: (c, ic) => `<circle cx="50" cy="22" r="6" fill="${c}"/><circle cx="90" cy="22" r="6" fill="${c}"/>` +
    `<circle cx="50" cy="22" r="3" fill="${ic}"/><circle cx="90" cy="22" r="3" fill="${ic}"/>`,
  horns: (c) => `<rect x="54" y="4" width="4" height="13" fill="${c}"/><circle cx="56" cy="4" r="3.6" fill="${c}"/>` +
    `<rect x="82" y="4" width="4" height="13" fill="${c}"/><circle cx="84" cy="4" r="3.6" fill="${c}"/>`,
  ridges: (c) => `<ellipse cx="52" cy="19" rx="6" ry="5" fill="${c}"/><ellipse cx="88" cy="19" rx="6" ry="5" fill="${c}"/>` +
    `<ellipse cx="70" cy="17" rx="5" ry="4" fill="${c}"/>`,
  spikes: (c) => `<path d="M48 21 l4 -10 4 10 M60 19 l4 -11 4 11 M72 19 l4 -11 4 11 M84 21 l4 -10 4 10" fill="${c}"/>`,
};
const mane = (c, c2) => {
  const pts = [[70, 10], [50, 13], [90, 13], [38, 30], [102, 30], [40, 52], [100, 52], [70, 62]];
  return pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="9" fill="${i % 2 ? c2 : c}"/>`).join("");
};
const sideEars = (c, ic) => `<ellipse cx="32" cy="44" rx="15" ry="19" fill="${c}"/><ellipse cx="108" cy="44" rx="15" ry="19" fill="${c}"/>` +
  `<ellipse cx="34" cy="45" rx="8" ry="12" fill="${ic}"/><ellipse cx="106" cy="45" rx="8" ry="12" fill="${ic}"/>`;
const spots = (c) => `<circle cx="60" cy="106" r="4.5" fill="${c}"/><circle cx="82" cy="108" r="4.5" fill="${c}"/><circle cx="70" cy="118" r="4" fill="${c}"/><circle cx="55" cy="120" r="3.5" fill="${c}"/>`;

// ---- ARQUETIPOS de cuerpo (arch(f, c2, cfg)) ------------------------------
const seated = (f, c2, cfg = {}) => {
  const rx = cfg.rx || 33, ry = cfg.ry || 35, cy = 141 - ry;
  return `${shadow(rx + 9)}
  <ellipse cx="${70 - rx + 8}" cy="${cy + 14}" rx="15" ry="17" fill="${c2}"/>
  <ellipse cx="${70 + rx - 8}" cy="${cy + 14}" rx="15" ry="17" fill="${c2}"/>
  <ellipse cx="70" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" stroke="${c2}" stroke-width="1.5"/>
  ${belly(cy + 8, rx - 13)}${sheen}
  <rect x="55" y="${cy + 10}" width="13" height="${ry - 8}" rx="6.5" fill="${f}"/>
  <rect x="72" y="${cy + 10}" width="13" height="${ry - 8}" rx="6.5" fill="${f}"/>
  <ellipse cx="61" cy="142" rx="8.5" ry="4.5" fill="${c2}"/>
  <ellipse cx="79" cy="142" rx="8.5" ry="4.5" fill="${c2}"/>${chest(cy - 6)}`;
};

const reptile = (f, c2) => `${shadow(48)}
  ${tailCroc(c2)}
  <rect x="58" y="62" width="24" height="42" rx="11" fill="${f}"/>
  <rect x="26" y="94" width="86" height="34" rx="17" fill="${f}" stroke="${c2}" stroke-width="1.5"/>${sheen}
  <rect x="40" y="112" width="56" height="15" rx="7.5" fill="#f4fce3" opacity="0.6"/>
  <path d="M50 113 v13 M62 113 v13 M74 113 v13 M86 113 v13" stroke="${c2}" stroke-width="1" opacity="0.4"/>
  <rect x="32" y="124" width="13" height="16" rx="6.5" fill="${c2}"/>
  <rect x="50" y="124" width="13" height="16" rx="6.5" fill="${c2}"/>
  <rect x="77" y="124" width="13" height="16" rx="6.5" fill="${c2}"/>
  <rect x="95" y="124" width="13" height="16" rx="6.5" fill="${c2}"/>${chest(104)}`;

const biped = (f, c2, cfg = {}) => `${shadow(40)}
  ${cfg.tl || ""}
  <ellipse cx="56" cy="122" rx="18" ry="20" fill="${c2}"/>
  <ellipse cx="84" cy="122" rx="18" ry="20" fill="${c2}"/>
  <path d="M38 138 h30 a5 5 0 0 1 0 8 h-30 z" fill="${c2}"/>
path d="M72 138 h30 a5 5 0 0 1 0 8 h-30 z" fill="${c2}"/>
  <ellipse cx="70" cy="100" rx="27" ry="34" fill="${f}" stroke="${c2}" stroke-width="1.5"/>
  ${belly(108, 15, 22)}${sheen}
  ${cfg.arms ? cfg.arms(f, c2) : `<rect x="42" y="92" width="10" height="5" rx="2.5" fill="${c2}"/><rect x="88" y="92" width="10" height="5" rx="2.5" fill="${c2}"/>`}${chest(96)}`;

// Cuerpo de DINOSAURIO (T-Rex): cola gruesa detras + patotas con 3 garras + torso.
const dinoBody = (f, c2, cfg = {}) => `${shadow(44)}
  <path class="bymax-tail" d="M94 116 Q140 120 140 142 Q118 132 90 130 Z" fill="${c2}"/>
  <path d="M46 118 q-4 16 6 24 h14 q-6 -10 -4 -24 z" fill="${c2}"/>
  <path d="M94 118 q4 16 -6 24 h-14 q6 -10 4 -24 z" fill="${c2}"/>
  <path d="M46 140 l-5 5 M52 142 l-4 6 M58 142 l-2 6" stroke="${c2}" stroke-width="3" stroke-linecap="round"/>
  <path d="M94 140 l5 5 M88 142 l4 6 M82 142 l2 6" stroke="${c2}" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="70" cy="102" rx="29" ry="33" fill="${f}" stroke="${c2}" stroke-width="1.5"/>
  ${belly(110, 17, 22)}${sheen}
  ${cfg.arms ? cfg.arms(f, c2) : ""}${chest(100)}`;

const heavy = (f, c2) => `${shadow(46)}
  <rect x="36" y="116" width="16" height="26" rx="6" fill="${c2}"/>
  <rect x="56" y="118" width="16" height="24" rx="6" fill="${c2}"/>
  <rect x="72" y="118" width="16" height="24" rx="6" fill="${c2}"/>
  <rect x="90" y="116" width="16" height="26" rx="6" fill="${c2}"/>
  <ellipse cx="70" cy="104" rx="40" ry="33" fill="${f}" stroke="${c2}" stroke-width="1.5"/>
  ${belly(112, 22, 20)}${sheen}${chest(104)}`;

const longneck = (f, c2, cfg = {}) => `${shadow(30)}
  <rect x="48" y="112" width="9" height="30" rx="4" fill="${c2}"/>
  <rect x="83" y="112" width="9" height="30" rx="4" fill="${c2}"/>
  <ellipse cx="70" cy="112" rx="26" ry="18" fill="${f}" stroke="${c2}" stroke-width="1.5"/>${sheen}
  <rect x="62" y="60" width="16" height="56" rx="8" fill="${f}"/>
  <path class="bymax-tail" d="M95 106 Q108 110 106 124 Q100 116 92 114 Z" fill="${c2}"/>${chest(112)}
  ${cfg.spot ? spots(cfg.spot) : ""}`;

// Config declarativa por animal.
const CFG = {
  cat: { arch: seated, c1: "#fb923c", c2: "#c2410c", hc: "#fdba74", rx: 31, ry: 33, back: (c2) => tailCurl(c2), top: () => ears.pointy("#ea580c", "#fda4af"), mz: () => mzCat() },
  croc: { arch: reptile, c1: "#4ade80", c2: "#15803d", hc: "#22c55e", top: () => ears.ridges("#166534"), mz: () => mzSnout("#22c55e", "#15803d") },
  kangaroo: { arch: biped, c1: "#d98c5f", c2: "#7c2d12", hc: "#e8a87c", tl: tailThick("#7c2d12"), top: () => ears.tall("#a3502a", "#fbcfe8"), mz: () => mzSmall("#e8a87c") },
  dino: { arch: dinoBody, c1: "#2dd4bf", c2: "#0f766e", hc: "#5eead4", arms: (f, c2) => trexArms(f, c2), top: () => ears.spikes("#0d5c56"), mz: () => mzDino() },
  lion: { arch: seated, c1: "#fbbf24", c2: "#b45309", hc: "#fcd34d", rx: 33, ry: 35, back: (c2) => tailTuft(c2, "#7c2d12"), behind: () => mane("#ea9a3e", "#c2410c"), top: () => ears.roundSm("#d97706", "#fca5a5"), mz: () => mzSmall("#fde68a") },
  elephant: { arch: heavy, c1: "#cbd5e1", c2: "#64748b", hc: "#e2e8f0", behind: () => sideEars("#94a3b8", "#cbd5e1"), mz: () => "", extra: () => trunk("#94a3b8") },
  giraffe: { arch: longneck, c1: "#fde047", c2: "#a16207", hc: "#fef08a", spot: "#b45309", top: () => ears.horns("#78350f"), mz: () => mzSmall("#fef9c3") },
  hamster: { arch: seated, c1: "#fcd34d", c2: "#d97706", hc: "#fde68a", rx: 27, ry: 28, back: (c2) => tailStub(c2), top: () => ears.roundHi("#d97706", "#fbcfe8"), mz: () => mzCheeks("#fff7e6") },
  capybara: { arch: seated, c1: "#b45309", c2: "#713f12", hc: "#a16207", rx: 34, ry: 31, back: (c2) => tailStub(c2), top: () => ears.roundSm("#5b3410", "#d6a06a"), mz: () => mzRound("#8a5a2b") },
  bear: { arch: seated, c1: "#7c4a1e", c2: "#4a2e12", hc: "#8b5e34", rx: 37, ry: 36, back: (c2) => tailStub(c2), top: () => ears.roundHi("#4a2e12", "#c9a26b"), mz: () => mzRound("#c9a26b") },
};

const svg = (inner) =>
  `<svg viewBox="6 0 140 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" role="img" aria-hidden="true">${DEFS}${inner}</svg>`;

/** Construye el SVG (string) de un robo-animal con gradientes de IDs unicos. */
function render(id) {
  const cfg = CFG[id];
  if (!cfg) return null;
  const u = ++_uid;
  const { c1, c2, hc, arch } = cfg;
  const fBody = `url(#amBody${u})`;
  const fHead = `url(#amHead${u})`;
  const bodyStr = (cfg.back ? cfg.back(c2) : "") + arch(fBody, c2, cfg);
  return svg(gradDefs(u, c1, c2, hc) + bodyStr + antenna(c2) + (cfg.behind ? cfg.behind() : "") +
    head(fHead) + robotHead() + collar(c2) + (cfg.top ? cfg.top() : "") +
    visor() + cheeks + (cfg.mz ? cfg.mz(c2, hc) : "") + (cfg.extra ? cfg.extra() : ""));
}

/** True si el id tiene cuerpo completo de robo-animal (fuera del perrito Bymax). */
export function hasAnimalBody(id) {
  return Object.prototype.hasOwnProperty.call(CFG, id);
}

/** SVG (string) del cuerpo completo del robo-animal, o null si no existe. */
export function animalMascotSvg(id) {
  return render(id);
}
