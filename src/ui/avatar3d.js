/**
 * ui/avatar3d.js — Profe HUMANO 3D (cartoon) con three.js.
 *
 * Dos fuentes de avatar, MISMO motor (DRY):
 *   - createAvatar3d(container,{url})  -> carga un .glb (Ready Player Me, etc.)
 *   - createDemoHead(container,{gender}) -> cabeza cartoon hecha con primitivas
 *     (funciona 100% OFFLINE, sin descargar nada; ideal para probar/fallback).
 *
 * Lip-sync (mover la boca) en DOS modos:
 *   1) REAL por amplitud: attachAudio(<audio>) engancha la voz de nube via
 *      AnalyserNode -> la boca se abre segun el VOLUMEN real.
 *   2) PROCEDURAL: si no hay audio analizable (voz del navegador), oscila la
 *      boca mientras setTalking(true).
 *
 * three.js se carga por import-map LOCAL (vendor/three, ver index.html): sin CDN,
 * funciona offline y lo cachea la PWA. API drop-in analoga a setBymaxTalking.
 *
 * @module ui/avatar3d
 */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Morphs candidatos para "abrir la boca" (ARKit + Oculus visemes + RPM).
const MOUTH_MORPHS = ["jawOpen", "mouthOpen", "viseme_aa", "viseme_O", "viseme_CH"];
// Morphs de parpadeo.
const BLINK_MORPHS = [["eyeBlinkLeft", "eyeBlinkRight"], ["eyesClosed"]];

/**
 * MOTOR compartido: escena, luces, camara, bucle de animacion, lip-sync, resize
 * y dispose. Recibe un "rig" que sabe mover SU boca/ojos.
 * @param {HTMLElement} container
 * @param {object} rig - { root:Object3D, setMouth(v), setBlink?(v), headBone? }
 * @param {object} opts - { background }
 */
function runEngine(container, rig, opts = {}) {
  const width = container.clientWidth || 320;
  const height = container.clientHeight || 380;

  const scene = new THREE.Scene();
  scene.background = opts.background ? new THREE.Color(opts.background) : null;

  const camera = new THREE.PerspectiveCamera(30, width / height, 0.01, 100);

  const renderer = new THREE.WebGLRenderer({
    antialias: true, alpha: true,
    // preserveDrawingBuffer: solo para capturas headless (gen_portraits). En la
    // app normal queda en false (mas rendimiento).
    preserveDrawingBuffer: !!opts.preserveDrawingBuffer,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  // Luz de estudio: hemisferica suave + key + relleno frio.
  scene.add(new THREE.HemisphereLight(0xffffff, 0x334155, 2.2));
  const key = new THREE.DirectionalLight(0xffffff, 2.0);
  key.position.set(1.5, 3, 2.5); scene.add(key);
  const fill = new THREE.DirectionalLight(0xa5b4fc, 0.6);
  fill.position.set(-2, 1, 1); scene.add(fill);

  scene.add(rig.root);

  // Encuadre automatico. Si el modelo tiene hueso de cabeza (humanoide real),
  // encuadramos CARA + HOMBROS usando su posicion -> inmune al T-pose (brazos
  // abiertos) que rompia la heuristica por ancho. Si no, usamos la caja.
  const box = new THREE.Box3().setFromObject(rig.root);
  const size = new THREE.Vector3(); box.getSize(size);
  const center = new THREE.Vector3(); box.getCenter(center);
  const fov = camera.fov * Math.PI / 180;
  let targetX = center.x, targetY = center.y, framedH = size.y * 1.05;
  if (rig.headBone) {
    rig.root.updateWorldMatrix(true, true);
    const head = new THREE.Vector3();
    rig.headBone.getWorldPosition(head);
    targetX = head.x;
    targetY = head.y - 0.06;   // un pelin abajo: incluye menton + hombros
    framedH = 0.5;             // ~cabeza + hombros (unidades tipo metro de RPM)
  } else {
    const isTall = size.y > size.x * 1.6;
    framedH = isTall ? size.y * 0.30 : size.y * 1.05;
    targetY = isTall ? box.max.y - framedH * 0.55 : center.y;
  }
  const dist = (framedH / 2) / Math.tan(fov / 2) * 1.15;
  camera.position.set(targetX, targetY, box.max.z + dist);
  camera.lookAt(targetX, targetY, center.z);

  // --- estado + bucle -------------------------------------------------------
  let talking = false, analyser = null, audioData = null;
  let raf = 0, disposed = false;
  const clock = new THREE.Clock();
  let nextBlink = 1 + Math.random() * 3, blink = 0, mouth = 0, procPhase = 0;
  let smile = 0.12, brow = 0, greetT = -1; // greetT>=0 => saludando

  // Precalcula la pose de "mano arriba" del ANTEBRAZO (elbow wave). El hombro NO
  // se toca -> gesto amable y seguro. rest = reposo; raised = mano hacia arriba.
  let armRest = null, armRaised = null, handRest = null;
  if (rig.arm && rig.arm.fore && rig.arm.fore.children[0]) {
    const fore = rig.arm.fore;
    fore.updateWorldMatrix(true, true);
    armRest = fore.quaternion.clone();
    const a = new THREE.Vector3(); fore.getWorldPosition(a);
    const c = new THREE.Vector3(); fore.children[0].getWorldPosition(c);
    const dir = c.clone().sub(a).normalize();
    const rc = new THREE.Vector3(); rig.root.getWorldPosition(rc);
    const outSign = a.x >= rc.x ? 1 : -1; // hacia SU lado (afuera), NO cruzando el pecho
    const target = new THREE.Vector3(outSign * 0.33, 0.95, 0.42).normalize(); // arriba (cerca de la cara) arqueando a su lado + al frente
    const dq = new THREE.Quaternion().setFromUnitVectors(dir, target);
    const curW = new THREE.Quaternion(); fore.getWorldQuaternion(curW);
    const parW = new THREE.Quaternion(); fore.parent.getWorldQuaternion(parW);
    armRaised = parW.clone().invert().multiply(dq.multiply(curW));
    if (rig.arm.hand) handRest = rig.arm.hand.quaternion.clone();
  }

  function amplitude() {
    if (!analyser) return null;
    analyser.getByteTimeDomainData(audioData);
    let sum = 0;
    for (let i = 0; i < audioData.length; i++) {
      const v = (audioData[i] - 128) / 128; sum += v * v;
    }
    return Math.sqrt(sum / audioData.length); // RMS 0..~1
  }

  function loop() {
    if (disposed) return;
    raf = requestAnimationFrame(loop);
    const dt = clock.getDelta(), t = clock.elapsedTime;

    // Vida en reposo: leve balanceo de cabeza.
    if (rig.headBone) {
      rig.headBone.rotation.z = Math.sin(t * 0.8) * 0.02;
      rig.headBone.rotation.y = Math.sin(t * 0.35) * 0.05;
    } else {
      rig.root.rotation.y = Math.sin(t * 0.35) * 0.05;
    }

    // Parpadeo.
    if (rig.setBlink) {
      nextBlink -= dt;
      if (nextBlink <= 0) { blink = 1; nextBlink = 2 + Math.random() * 4; }
      blink = Math.max(0, blink - dt * 8);
      rig.setBlink(blink > 0.5 ? 1 : blink * 2);
    }

    // Lip-sync: real (amplitud) o procedural (oscilacion).
    let target = 0;
    if (talking) {
      const amp = amplitude();
      if (amp != null) target = Math.min(1, amp * 3.2);
      else {
        procPhase += dt * (7 + Math.sin(t * 3) * 3);
        target = (Math.sin(procPhase) * 0.5 + 0.5) * (0.35 + Math.random() * 0.35);
      }
    }
    mouth += (target - mouth) * Math.min(1, dt * 18); // suavizado
    rig.setMouth(mouth);

    // --- Expresion calida + gesto de SALUDO (elbow wave) --------------------
    let smileTarget = 0.12;  // sonrisa BASE amable (que no se vea severa)
    let browTarget = 0;
    if (greetT >= 0 && armRaised) {
      greetT += dt;
      const RAISE = 0.45, HOLD = 1.7, LOWER = 0.55, TOTAL = RAISE + HOLD + LOWER;
      let raise;
      if (greetT < RAISE) raise = greetT / RAISE;
      else if (greetT < RAISE + HOLD) raise = 1;
      else if (greetT < TOTAL) raise = 1 - (greetT - RAISE - HOLD) / LOWER;
      else { raise = 0; greetT = -1; }
      raise = Math.max(0, Math.min(1, raise));
      // Sube el antebrazo (rest -> raised) y mece la mano mientras esta arriba.
      rig.arm.fore.quaternion.copy(armRest).slerp(armRaised, raise);
      if (rig.arm.hand && handRest) {
        const wag = raise * Math.sin(t * 11) * 0.35;
        rig.arm.hand.quaternion.copy(handRest)
          .multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), wag));
      }
      smileTarget = 0.14 + raise * 0.34;
      browTarget = raise * 0.5;
    } else if (armRest) {
      rig.arm.fore.quaternion.copy(armRest); // reposo firme
      if (rig.arm.hand && handRest) rig.arm.hand.quaternion.copy(handRest);
    }
    if (talking) smileTarget = Math.max(smileTarget, 0.2); // se ve animada al hablar
    smile += (smileTarget - smile) * Math.min(1, dt * 6);
    brow += (browTarget - brow) * Math.min(1, dt * 6);
    rig.setSmile && rig.setSmile(smile);
    rig.setBrow && rig.setBrow(brow);

    renderer.render(scene, camera);
  }
  loop();

  const ro = new ResizeObserver(() => {
    const w = container.clientWidth || width, h = container.clientHeight || height;
    camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
  });
  ro.observe(container);

  return {
    setTalking(on) { talking = !!on; if (!on) { mouth = 0; rig.setMouth(0); } },
    /** Saluda con la mano (elbow wave) + sonrisa y cejas amables. No-op si el
     *  avatar no tiene brazo detectable (ej. cabeza demo). */
    greet() { if (armRaised) greetT = 0; },
    /** Usa un AnalyserNode YA creado (singleton compartido, ver cloud-tts). */
    attachAnalyser(an) {
      if (analyser || !an) return;
      analyser = an;
      audioData = new Uint8Array(analyser.fftSize);
    },
    attachAudio(audioEl) {
      if (analyser || !audioEl) return;
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        const ctx = new Ctx();
        const src = ctx.createMediaElementSource(audioEl);
        analyser = ctx.createAnalyser(); analyser.fftSize = 512;
        audioData = new Uint8Array(analyser.fftSize);
        src.connect(analyser); analyser.connect(ctx.destination);
        audioEl.addEventListener("play", () => { if (ctx.state === "suspended") ctx.resume(); });
      } catch { analyser = null; }
    },
    setEmotion(kind) { rig.setEmotion?.(kind); },
    /** Recolorea el pelo (hex tipo "#E6C88C"). No-op si el avatar no tiene pelo. */
    setHairColor(hex) { rig.setHairColor?.(hex); },
    /** Ajusta el tono de piel (hex, multiplica). No-op si no hay piel detectada. */
    setSkinTone(hex) { rig.setSkinTone?.(hex); },
    get canLipSync() { return rig.canLipSync !== false; },
    dispose() {
      disposed = true; cancelAnimationFrame(raf); ro.disconnect();
      renderer.dispose(); renderer.domElement.remove();
    },
  };
}

/**
 * Uniforma la pose de brazos de los profes: apunta el brazo superior hacia abajo
 * (rectos a los costados) para que los 3 se vean igual. En vez de un angulo fijo
 * (que deformaba el hombro), calcula el giro exacto hacia "abajo + un pelin hacia
 * afuera" y lo aplica en LOCAL respetando la rotacion del padre. Funciona con
 * cualquier rig. Salta los brazos que ya cuelgan casi rectos.
 * @param {THREE.Object3D} root
 */
function relaxArms(root) {
  root.updateWorldMatrix(true, true);
  const rootPos = new THREE.Vector3(); root.getWorldPosition(rootPos);
  root.traverse((o) => {
    // Por NOMBRE (no exigimos isBone: three.js a veces expone el joint como
    // Object3D). Solo el brazo SUPERIOR exacto (evita Armature/ForeArm/twist).
    const n = (o.name || "").toLowerCase().replace(/[_\s.]/g, "");
    if (!(n.includes("upperarm") || n === "leftarm" || n === "rightarm")) return;
    const child = o.children && o.children[0];
    if (!child || !o.parent) return;
    const arm = new THREE.Vector3(); o.getWorldPosition(arm);
    const fore = new THREE.Vector3(); child.getWorldPosition(fore);
    const dir = fore.clone().sub(arm);
    if (dir.lengthSq() < 1e-6) return;
    dir.normalize();
    if (dir.y < -0.92) return;   // ya cuelga casi recto -> no hace falta tocar
    // Objetivo: hacia abajo, con un leve angulo hacia su propio lado. Se aplica
    // a TODOS por igual (Megan incluida) para que los 3 profes queden iguales.
    const out = arm.x >= rootPos.x ? 0.18 : -0.18;
    const target = new THREE.Vector3(out, -1, 0.02).normalize();
    // Giro (en mundo) que lleva la direccion actual del brazo al objetivo, y lo
    // pasamos a LOCAL respetando la rotacion del padre (rotateOnWorldAxis NO lo
    // hace bien cuando el padre esta rotado -> ese era el bug de brazos rotos).
    const dq = new THREE.Quaternion().setFromUnitVectors(dir, target);
    const curWorld = new THREE.Quaternion(); o.getWorldQuaternion(curWorld);
    const parentWorld = new THREE.Quaternion(); o.parent.getWorldQuaternion(parentWorld);
    const desiredWorld = dq.multiply(curWorld);       // dq * actual
    o.quaternion.copy(parentWorld.invert().multiply(desiredWorld));
    o.updateWorldMatrix(true, true);
  });
}

/**
 * Avatar desde un .glb (Ready Player Me, Mixamo, etc.). Requiere red para bajar
 * el modelo (readyplayer.me / tu host). Detecta morphs de boca y parpadeo.
 * @param {HTMLElement} container  @param {object} opts - { url }
 */
export async function createAvatar3d(container, opts = {}) {
  if (!opts.url) throw new Error("avatar3d: falta la url del .glb");
  const gltf = await new Promise((resolve, reject) =>
    new GLTFLoader().load(opts.url, resolve, undefined, reject));
  const root = gltf.scene;

  const morphs = {}; let headBone = null;
  const hairMats = [];
  const skinMats = [];
  root.traverse((o) => {
    if (o.isBone && /head/i.test(o.name) && !headBone) headBone = o;
    if (o.isMesh) {
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
        if (!m) return;
        const n = ((o.name || "") + " " + (m.name || "")).toLowerCase();
        if (/hair/.test(n)) {
          m.userData._origMap = m.map || null;
          m.userData._origColor = m.color ? m.color.clone() : null;
          hairMats.push(m);
        } else if (/skin|head|body/.test(n) && !/teeth|tooth|eye|glass|outfit|cloth|top|bottom|foot|shoe|hair/.test(n)) {
          m.userData._origSkin = m.color ? m.color.clone() : null;
          skinMats.push(m);
        }
      });
    }
    if (o.morphTargetDictionary && o.morphTargetInfluences) {
      for (const [name, idx] of Object.entries(o.morphTargetDictionary)) {
        (morphs[name] ||= []).push({ mesh: o, index: idx });
      }
    }
  });
  const has = (n) => Array.isArray(morphs[n]);
  const setMorph = (n, v) => {
    const ts = morphs[n]; if (!ts) return;
    const val = Math.max(0, Math.min(1, v));
    for (const t of ts) t.mesh.morphTargetInfluences[t.index] = val;
  };
  const mouthMorph = MOUTH_MORPHS.find(has) || null;
  const blinkSet = BLINK_MORPHS.find((s) => s.every(has)) || null;

  const rig = {
    root, headBone,
    canLipSync: !!mouthMorph,
    setMouth: (v) => { if (mouthMorph) setMorph(mouthMorph, v); },
    setBlink: blinkSet ? (v) => blinkSet.forEach((m) => setMorph(m, v)) : null,
    // Sonrisa continua (0..1). La usamos para una sonrisa BASE calida (que no se
    // vea severa) y para agrandarla al saludar. No apila blendshapes raros.
    setSmile: (v) => {
      const s = Math.max(0, Math.min(1, v));
      if (has("mouthSmile")) setMorph("mouthSmile", s);
      else { setMorph("mouthSmileLeft", s); setMorph("mouthSmileRight", s); }
    },
    // Cejas arriba (0..1): da expresion amable/sorpresa al saludar. No-op si el
    // avatar no trae esos morphs.
    setBrow: (v) => {
      const b = Math.max(0, Math.min(1, v));
      setMorph("browInnerUp", b);
      setMorph("browOuterUpLeft", b);
      setMorph("browOuterUpRight", b);
    },
    setEmotion: (kind) => {
      // Sonrisa SUAVE y sin apilar: algunos avatares se deforman si se ponen
      // varios blendshapes de sonrisa a la vez o muy fuerte.
      const s = kind === "happy" ? 0.3 : 0;
      if (has("mouthSmile")) setMorph("mouthSmile", s);
      else { setMorph("mouthSmileLeft", s); setMorph("mouthSmileRight", s); }
    },
    // Tono de piel. La textura de piel es clara; MULTIPLICAR por un tono la
    // oscurece (aproximacion: no cambia pelo ni rasgos). null = restaurar.
    setSkinTone: (hex) => {
      skinMats.forEach((m) => {
        if (!m.color) return;
        if (hex) m.color.set(hex);
        else if (m.userData._origSkin) m.color.copy(m.userData._origSkin);
        m.needsUpdate = true;
      });
    },
    // Tinte del pelo. El pelo suele traer una TEXTURA oscura; multiplicar el
    // color no aclara (negro x rubio = negro). Por eso, para un color distinto
    // QUITAMOS la textura y pintamos color plano; para "original" la restauramos.
    setHairColor: (hex) => {
      hairMats.forEach((m) => {
        if (!m.color) return;
        if (hex) { m.map = null; m.color.set(hex); }
        else { m.map = m.userData._origMap || null; if (m.userData._origColor) m.color.copy(m.userData._origColor); }
        m.needsUpdate = true;
      });
    },
  };
  relaxArms(root);   // T-pose -> brazos abajo (relajado como Megan)
  // Huesos del brazo DERECHO para el gesto de SALUDO. Usamos solo el ANTEBRAZO
  // (+ mano) para un "elbow wave": sube la mano y la mece SIN tocar el hombro
  // -> gesto amable y seguro (no deforma como pasaba al rotar el brazo entero).
  let armFore = null, armHand = null;
  root.traverse((o) => {
    const n = (o.name || "").toLowerCase().replace(/[_\s.]/g, "");
    if (!armFore && (n === "rightforearm" || n.includes("rightforearm") || n.includes("rightlowerarm"))) armFore = o;
    else if (!armHand && n === "righthand") armHand = o;
  });
  rig.arm = (armFore && armFore.children && armFore.children[0]) ? { fore: armFore, hand: armHand } : null;
  return runEngine(container, rig, opts);
}

/**
 * Cabeza cartoon hecha con PRIMITIVAS (sin descargar nada). Funciona offline y
 * sirve de fallback/demo. No es foto-real: es un munequito simpatico con boca
 * que se abre y ojos que parpadean.
 * @param {HTMLElement} container  @param {object} opts - { gender:"F"|"M" }
 */
export function createDemoHead(container, opts = {}) {
  const female = (opts.gender || "F") === "F";
  const root = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xf1c9a5, roughness: 0.85 });
  const hairCol = female ? 0x6d4c41 : 0x3e2723;
  const hairMat = new THREE.MeshStandardMaterial({ color: hairCol, roughness: 0.9 });

  // Cabeza (esfera un pelin achatada).
  const head = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 48), skin);
  head.scale.set(1, 1.12, 0.95); head.position.y = 1.6; root.add(head);

  // Cuello + hombros (para que no flote).
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.5, 24), skin);
  neck.position.y = 0.75; root.add(neck);
  const shirt = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.25, 0.7, 32),
    new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.7 }));
  shirt.position.y = 0.25; root.add(shirt);

  // Pelo (casquete). Mujer: mas largo por los lados.
  const hair = new THREE.Mesh(new THREE.SphereGeometry(1.06, 40, 40, 0, Math.PI * 2, 0, Math.PI * 0.62), hairMat);
  hair.scale.set(1, 1.12, 0.98); hair.position.y = 1.62; root.add(hair);
  if (female) {
    for (const sx of [-1, 1]) {
      const strand = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 1.1, 6, 12), hairMat);
      strand.position.set(sx * 0.92, 1.35, -0.05); root.add(strand);
    }
  }

  // Ojos: blanco + pupila. Grupo para parpadear (escala Y).
  const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
  const eyes = [];
  for (const sx of [-1, 1]) {
    const g = new THREE.Group();
    const white = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 24), eyeWhiteMat);
    white.scale.z = 0.5;
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.085, 20, 20), pupilMat);
    pupil.position.z = 0.12;
    g.add(white, pupil);
    g.position.set(sx * 0.36, 1.66, 0.82);
    root.add(g); eyes.push(g);
  }
  // Cejas.
  for (const sx of [-1, 1]) {
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.05, 0.05), hairMat);
    brow.position.set(sx * 0.36, 1.84, 0.86); root.add(brow);
  }
  // Nariz.
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), skin);
  nose.position.set(0, 1.55, 0.92); nose.scale.set(0.8, 1, 0.9); root.add(nose);

  // Boca: elipsoide oscuro que se ABRE escalando en Y (lip-sync).
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16),
    new THREE.MeshStandardMaterial({ color: 0x7f1d1d, roughness: 0.6 }));
  mouth.scale.set(1, 0.12, 0.5); mouth.position.set(0, 1.34, 0.86); root.add(mouth);
  // Cachetes rosaditos.
  for (const sx of [-1, 1]) {
    const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xf9a8d4, roughness: 0.9, transparent: true, opacity: 0.5 }));
    cheek.scale.set(1, 0.7, 0.3); cheek.position.set(sx * 0.55, 1.45, 0.8); root.add(cheek);
  }

  const rig = {
    root,
    canLipSync: true,
    setMouth: (v) => {
      // v 0..1 -> abre la boca (mas alta) y la baja un pelin.
      mouth.scale.y = 0.12 + v * 0.6;
      mouth.position.y = 1.34 - v * 0.05;
    },
    setBlink: (v) => { eyes.forEach((g) => { g.scale.y = 1 - Math.min(1, v) * 0.92; }); },
    setEmotion: () => {},
  };
  return runEngine(container, rig, opts);
}
