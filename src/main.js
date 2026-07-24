/**
 * main.js — Punto de entrada de la app (ES Module).
 *
 * Une las capas: arranca el router, escucha la sesion de Supabase y protege
 * las rutas. Es el unico script que el HTML carga (type="module").
 */
import { isConfigured } from "./config/supabase.js";
import { currentUser, onAuthChange, logout } from "./services/auth.js";
import { getProfile } from "./services/profiles.js";
import { renderRegister, renderLogin } from "./features/auth-ui.js";
import { renderStudent } from "./features/student.js";
import { renderCourse } from "./features/course-screen.js";
import { renderSpeaking } from "./features/speaking-screen.js";
import { renderJob } from "./features/job-screen.js";
import { renderCvCoach } from "./features/cv-coach.js";
import { renderMore } from "./features/more-screen.js";
import { renderTeacher } from "./features/teacher.js";
import { renderPlacement } from "./features/placement.js";
import { renderUnit } from "./features/unit.js";
import { renderLessonPlayer } from "./features/lesson-player.js";
import { renderReview } from "./features/review.js";
import { renderMap } from "./features/map.js";
import { renderTeachers } from "./features/teachers.js";
import { renderCalendar } from "./features/calendar.js";
import { renderChat } from "./features/chat.js";
import { renderSettings } from "./features/settings.js";
import { renderQuality } from "./features/quality.js";
import { renderCompetency } from "./features/competency.js";
import { renderProfile } from "./features/profile.js";
import { renderProfileEdit } from "./features/profile-edit.js";
import { renderBonus, renderBonusDeck } from "./features/bonus.js";
import { renderSpeakingCoach } from "./features/speaking-coach.js";
import { on, onNotFound, startRouter, go, currentPath } from "./ui/router.js";
import { el, mount, qs } from "./ui/dom.js";
import { renderBottomNav, setNavVisible, renderLangSelector } from "./ui/nav.js";
import { applyTextSize, applyContrast, applyTheme, getTheme } from "./ui/prefs.js";
import { mountDictionary } from "./features/dictionary.js";
import "./ui/install.js"; // registra los listeners de instalacion (PWA) al arrancar
const app = qs("#app");

/** Vista simple de bienvenida cuando no hay sesion. */
function renderHome() {
  mount(app, el("section", { class: "text-center py-12" },
    el("h1", { class: "text-4xl sm:text-5xl font-extrabold" },
      "Aprende ingles con un ",
      el("span", { class: "bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent" }, "plan hecho para ti")),
    el("p", { class: "mt-4 text-lg text-slate-400 max-w-2xl mx-auto" },
      "Examen de ubicacion (MCER), curso por unidades, repaso espaciado y profesores cuando los necesites."),
    el("div", { class: "mt-8 flex flex-wrap gap-3 justify-center" },
      el("a", { href: "#/register", class: "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-6 py-3 rounded-lg hover:from-indigo-400 hover:to-fuchsia-400" }, "Empezar gratis"),
      el("a", { href: "#/login", class: "bg-slate-800 text-slate-100 border border-slate-700 font-semibold px-6 py-3 rounded-lg hover:bg-slate-700" }, "Ya tengo cuenta"))));
}

/** Aviso si Supabase aun no esta configurado (evita errores confusos). */
function renderConfigWarning() {
  mount(app, el("div", { class: "max-w-xl mx-auto bg-amber-500/10 border border-amber-500/40 rounded-2xl p-6" },
    el("h1", { class: "text-xl font-bold text-amber-300" }, "Falta configurar Supabase"),
    el("p", { class: "mt-2 text-amber-200 text-sm" },
      "Edita src/config/supabase.js con la URL y la anon key de tu proyecto. Ver README.md.")));
}

/** Renderiza el dashboard correcto segun el rol del usuario logueado. */
async function renderDashboard(user) {
  const profile = await getProfile(user.id);
  if (!profile) { renderHome(); return; }
  if (profile.role === "teacher") await renderTeacher(app, user);
  else await renderStudent(app, user);
}

/** Guardia: exige sesion para ver una ruta protegida. */
async function requireAuth(render) {
  const user = await currentUser();
  if (!user) { go("/login"); return; }
  await render(user);
}

function setupRoutes() {
  on("/", async () => {
    const user = await currentUser();
    if (user) await renderDashboard(user);
    else renderHome();
  });
  on("/login", () => renderLogin(app));
  on("/register", () => renderRegister(app));
  on("/student", () => requireAuth((u) => renderStudent(app, u)));
  on("/curso", () => requireAuth((u) => renderCourse(app, u)));
  on("/hablar", () => requireAuth((u) => renderSpeaking(app, u)));
  on("/trabajo", () => requireAuth(() => renderJob(app)));
  on("/cv", () => requireAuth((u) => renderCvCoach(app, u)));
  on("/mas", () => requireAuth(() => renderMore(app)));
  on("/teacher", () => requireAuth((u) => renderTeacher(app, u)));
  on("/examen", () => requireAuth((u) => renderPlacement(app, u)));
  on("/unidad/:id", (params) => requireAuth((u) => renderUnit(app, params, u)));
  on("/leccion/:id", (params) => requireAuth((u) => renderLessonPlayer(app, params, u)));
  on("/repaso", () => requireAuth((u) => renderReview(app, u)));
  on("/plan", () => requireAuth((u) => renderMap(app, u)));
  on("/profesores", () => requireAuth(() => renderTeachers(app)));
  on("/calendario", () => requireAuth(() => renderCalendar(app)));
  on("/chat", () => requireAuth(() => renderChat(app)));
  on("/ajustes", () => requireAuth((u) => renderSettings(app, u)));
  on("/calidad", () => requireAuth(() => renderQuality(app)));
  on("/competencia/:skill", (params) => requireAuth((u) => renderCompetency(app, params, u)));
  on("/perfil", () => requireAuth((u) => renderProfile(app, u)));
  on("/perfil/editar", () => requireAuth((u) => renderProfileEdit(app, u)));
  on("/bonus", () => requireAuth((u) => renderBonus(app, u)));
  on("/bonus/:id", (params) => requireAuth((u) => renderBonusDeck(app, params, u)));
  on("/coach", () => requireAuth((u) => renderSpeakingCoach(app, u)));
  onNotFound(renderHome);
}

/** Actualiza el boton de sesion en el header. */
function refreshHeader(user) {
  const slot = qs("#session-slot");
  setNavVisible(!!user);
  if (user) renderBottomNav();
  if (!slot) return;
  if (user) {
    mount(slot, el("a", {
      href: "#/", class: "text-slate-300 hover:text-white cursor-pointer",
      onclick: async (e) => { e.preventDefault(); await logout(); go("/"); },
    }, "Salir"));
  } else {
    mount(slot, el("span", { class: "flex items-center gap-4" },
      el("a", { href: "#/login", class: "text-slate-300 hover:text-white" }, "Iniciar sesion"),
      el("a", { href: "#/register", class: "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-3 py-1.5 rounded-md" }, "Registrarme")));
  }
}

/** Activa el "modo clase" (pantalla exclusiva) en rutas de leccion. */
function updateChrome() {
  document.body.classList.toggle("lesson-mode", currentPath().startsWith("/leccion/"));
}

function init() {
  applyTheme();    // aplica el tema claro/oscuro guardado
  applyTextSize(); // aplica el tamano de texto guardado (accesibilidad)
  applyContrast(); // aplica el modo alto contraste guardado
  // Si el usuario dejo 'Sistema', reacciona a los cambios del SO en vivo.
  // Blindado: en Safari/iOS viejos matchMedia no tiene addEventListener; nunca
  // debe tumbar el arranque de la app.
  try {
    const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => { if (getTheme() === "system") applyTheme(); };
    if (mq && mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq && mq.addListener) mq.addListener(onChange); // fallback legacy
  } catch (e) { /* no critico */ }
  mountDictionary(); // diccionario flotante disponible en toda la app
  if (!isConfigured) { renderConfigWarning(); return; }
  setupRoutes();
  startRouter();
  renderLangSelector();
  updateChrome();
  // Mantiene sincronizada la ruta activa de la barra inferior.
  window.addEventListener("hashchange", renderBottomNav);
  window.addEventListener("hashchange", updateChrome);
  currentUser().then(refreshHeader);
  onAuthChange((user) => {
    refreshHeader(user);
    // Si esta en la raiz, refresca la vista al cambiar la sesion.
    if (currentPath() === "/") startRouter();
  });
}

init();
