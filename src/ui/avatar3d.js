/**
 * ui/avatar3d.js — Profe HUMANO 3D (cartoon) estilo Ready Player Me.
 *
 * Renderiza un avatar .glb en un <canvas> con three.js y lo hace "hablar"
 * moviendo la boca (morph targets ARKit/Oculus). Dos modos de lip-sync:
 *   1) REAL: enganchado al <audio> de la voz de nube (AnalyserNode) -> la boca
 *      se abre segun el VOLUMEN real de la voz. Se activa con attachAudio(el).
 *   2) PROCEDURAL: si no hay audio analizable (voz del navegador), oscila la
 *      mandibula con un envelope aleatorio mientras setTalking(true).
 *
 * DRY: es un DROP-IN para bymax-mascot (misma idea que setBymaxTalking). No
 * conoce nada del negocio; solo dibuja y mueve la boca. Carga three.js por
 * import-map (ver index.html) -> sin build, ESM puro.
 *
 * @module ui/avatar3d
 */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Morphs candidatos para "abrir la boca" (ARKit + Oculus visemes + RPM).
const MOUTH_MORPHS = ["jawOpen", "mouthOpen", "viseme_aa", "viseme_O", "viseme_CH"];
// Morphs de parpadeo (para dar vida en reposo).
const BLINK_MORPHS = [["eyeBlinkLeft", "eyeBlinkRight"], ["eyesClosed"]];

/**
 * Crea un avatar 3D dentro de `container`.
 * @param {HTMLElement} container - donde montar el canvas (se dimensiona a el)
 * @param {object} opts - { url, background }
 * @returns {Promise<object>} API: setTalking, attachAudio, setEmotion, dispose
 */
export async function createAvatar3d(container, opts = {}) {
  const url = opts.url;
  if (!url) throw new Error("avatar3d: falta la url del .glb");

  const width = container.clientWidth || 320;
  const height = container.clientHeight || 380;

  const scene = new THREE.Scene();
  scene.background = opts.background ? new THREE.Color(opts.background) : null;

  const camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 100);
  camera.position.set(0, 1.5, 0.9);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  // Luz: hemisferica suave + una direccional de relleno tipo estudio.
  scene.add(new THREE.HemisphereLight(0xffffff, 0x334155, 2.2));
  const key = new THREE.DirectionalLight(0xffffff, 2.0);
  key.position.set(1.5, 3, 2.5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xa5b4fc, 0.6);
  fill.position.set(-2, 1, 1);
  scene.add(fill);

  // --- carga del modelo -----------------------------------------------------
  const gltf = await new Promise((resolve, reject) =>
    new GLTFLoader().load(url, resolve, undefined, reject));
  const model = gltf.scene;
  scene.add(model);

  // Recolecta TODOS los morph targets (boca, ojos) de todas las mallas.
  const morphs = {}; // nombre -> [{ mesh, index }]
  let headBone = null;
  model.traverse((o) => {
    if (o.isBone && /head/i.test(o.name) && !headBone) headBone = o;
    if (o.morphTargetDictionary && o.morphTargetInfluences) {
      for (const [name, idx] of Object.entries(o.morphTargetDictionary)) {
        (morphs[name] ||= []).push({ mesh: o, index: idx });
      }
    }
  });
  const has = (name) => Array.isArray(morphs[name]);
  const setMorph = (name, v) => {
    const targets = morphs[name];
    if (!targets) return;
    const val = Math.max(0, Math.min(1, v));
    for (const t of targets) t.mesh.morphTargetInfluences[t.index] = val;
  };
  const mouthMorph = MOUTH_MORPHS.find(has) || null;
  const blinkSet = BLINK_MORPHS.find((set) => set.every(has)) || null;

  // Encuadre "busto": apunta la camara a la cabeza (bounding box superior).
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3(); box.getSize(size);
  const center = new THREE.Vector3(); box.getCenter(center);
  const headY = box.max.y - size.y * 0.08;       // un pelin bajo la coronilla
  const target = new THREE.Vector3(center.x, headY, center.z);
  const dist = size.y * 0.62;                     // que quepa cabeza + hombros
  camera.position.set(center.x, headY + size.y * 0.02, box.max.z + dist);
  camera.lookAt(target);

  // --- estado y bucle -------------------------------------------------------
  let talking = false;
  let analyser = null;
  let audioData = null;
  let raf = 0;
  let disposed = false;
  const clock = new THREE.Clock();
  let nextBlink = 1 + Math.random() * 3;
  let blink = 0;
  let jaw = 0;             // apertura actual (suavizada)
  let procPhase = 0;

  function amplitude() {
    if (!analyser) return null;
    analyser.getByteTimeDomainData(audioData);
    let sum = 0;
    for (let i = 0; i < audioData.length; i++) {
      const v = (audioData[i] - 128) / 128;
      sum += v * v;
    }
    return Math.sqrt(sum / audioData.length); // RMS 0..~1
  }

  function loop() {
    if (disposed) return;
    raf = requestAnimationFrame(loop);
    const dt = clock.getDelta();
    const t = clock.elapsedTime;

    // Respiracion/vida: leve balanceo de la cabeza.
    if (headBone) {
      headBone.rotation.z = Math.sin(t * 0.8) * 0.02;
      headBone.rotation.y = Math.sin(t * 0.35) * 0.04;
    } else {
      model.rotation.y = Math.sin(t * 0.35) * 0.03;
    }

    // Parpadeo natural en reposo.
    if (blinkSet) {
      nextBlink -= dt;
      if (nextBlink <= 0) { blink = 1; nextBlink = 2 + Math.random() * 4; }
      blink = Math.max(0, blink - dt * 8);
      const eye = blink > 0.5 ? 1 : blink * 2;
      for (const m of blinkSet) setMorph(m, eye);
    }

    // Lip-sync: real (amplitud) o procedural (oscilacion).
    let targetJaw = 0;
    if (talking) {
      const amp = amplitude();
      if (amp != null) {
        targetJaw = Math.min(1, amp * 3.2); // escala el volumen a apertura
      } else {
        procPhase += dt * (7 + Math.sin(t * 3) * 3);
        targetJaw = (Math.sin(procPhase) * 0.5 + 0.5) * (0.35 + Math.random() * 0.35);
      }
    }
    jaw += (targetJaw - jaw) * Math.min(1, dt * 18); // suavizado
    if (mouthMorph) setMorph(mouthMorph, jaw);

    renderer.render(scene, camera);
  }
  loop();

  // Redimension responsiva.
  const ro = new ResizeObserver(() => {
    const w = container.clientWidth || width;
    const h = container.clientHeight || height;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  ro.observe(container);

  return {
    /** Activa/desactiva el movimiento de boca. */
    setTalking(on) { talking = !!on; if (!on) { jaw = 0; if (mouthMorph) setMorph(mouthMorph, 0); } },
    /**
     * Engancha un <audio> para lip-sync REAL por volumen. Crea el grafo de
     * Web Audio una sola vez (createMediaElementSource solo se puede una vez
     * por elemento). Silencioso si el navegador no soporta AudioContext.
     */
    attachAudio(audioEl) {
      if (analyser || !audioEl) return;
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        const ctx = new Ctx();
        const src = ctx.createMediaElementSource(audioEl);
        analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        audioData = new Uint8Array(analyser.fftSize);
        src.connect(analyser);
        analyser.connect(ctx.destination);
        audioEl.addEventListener("play", () => { if (ctx.state === "suspended") ctx.resume(); });
      } catch { analyser = null; }
    },
    /** Emocion simple: "happy" | "neutral" (sonrisa con morph si existe). */
    setEmotion(kind) {
      const smile = kind === "happy" ? 0.5 : 0;
      setMorph("mouthSmile", smile);
      setMorph("mouthSmileLeft", smile);
      setMorph("mouthSmileRight", smile);
    },
    /** True si el .glb trae morphs de boca (lip-sync posible). */
    get canLipSync() { return !!mouthMorph; },
    /** Libera recursos (canvas, GPU, observer). */
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
