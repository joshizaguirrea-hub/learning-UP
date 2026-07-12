#  Bitácora del Proyecto — Learning UP

> Registro de todo lo hecho, para que nunca se te olvide cómo montaste esto.
> Autor: **Johsua Izaguirre** · Repo: https://github.com/joshizaguirrea-hub/learning-UP

---

##  ¿Qué es Learning UP?

App web **gratuita** para aprender inglés. Vanilla JavaScript (ES Modules) +
Supabase + PWA, con tema oscuro. Sin frameworks, sin bundlers.

---

##  Arquitectura (en capas, respetada al 100%)

| Carpeta | Rol | Regla |
|---------|-----|-------|
| `src/data/` | Datos puros (verbos, unidades, CEFR) | No importa de otras capas |
| `src/core/` | Lógica pura (SRS, práctica, tips, gamificación) | Solo importa de core/ o data/ |
| `src/services/` | I/O con Supabase y APIs | No importa de ui/ ni features/ |
| `src/ui/` | Presentación pura (DOM, iconos, router) | No importa de services/ ni features/ |
| `src/features/` | Vistas que orquestan todo | Puede importar cualquier capa |

**Auditoría de arquitectura:**  capas limpias, sin ciclos, archivos < 600 líneas.

---

##  Herramientas instaladas en la compu personal

| Herramienta | Para qué | Cómo verificar |
|-------------|----------|----------------|
| **Node.js** (v24) | Correr JavaScript fuera del navegador (tests, npm) | `node -v` |
| **Git** (v2.55) | Control de versiones + subir a GitHub | `git --version` |
| **Gemini CLI** (v0.50) | IA en la terminal (gratis, con cuenta Google) | `gemini.cmd --version` |
| **Python** | Servidor local para ver la app | `python --version` |

---

## ⌨ Chuleta de comandos (los que SÍ necesitas)

```powershell
# 1. Entrar al proyecto
cd $env:USERPROFILE\Documents\learning-UP

# 2. Ver qué hay en la carpeta
dir

# 3. Prender la app (déjala corriendo en su ventana)
python -m http.server 5500
#    Luego abre: http://127.0.0.1:5500/index.html   (¡OJO: http, sin la "s"!)

# 4. Llamar a la IA (en otra ventana de PowerShell)
gemini.cmd

# 5. Correr un test
node tests/verb-tips.test.mjs
```

### Guardar cambios en GitHub (tu respaldo en la nube)
```powershell
git add -A
git commit -m "describe lo que hiciste"
git push
```

### Traer cambios desde GitHub
```powershell
git pull
```

>  Con Gemini CLI no tienes que memorizar comandos: le hablas en español
> ("corre las pruebas", "guarda los cambios en git") y él los ejecuta.
> Cuando pida permiso para correr algo, responde con `2` (allow for this session).

---

##  Estado del proyecto (lo que quedó listo)

-  **Accesibilidad:** letra grande y responsiva (crece en monitores anchos),
  alto contraste, autoplay de audio.
-  **Verbos:** ejemplos B1-B2 reales, audio en cada forma (base/pasado/participio),
  "pops" de tips estilo iPhone (colapsables), generador de ejemplos y prácticas.
-  **Diccionario/traductor flotante** ES↔EN disponible en toda la app.
-  **Navegación** Siguiente/Devolverse; se marca "Aprendido" al completar prácticas.
-  **Tests de `core/` completos** y en verde (10 archivos en `tests/`).
-  **Todo respaldado en GitHub.**
-  **Repo hecho público** + **GitHub Pages activado**.

---

##  Publicación (GitHub Pages)

- Repo **público** en GitHub.
- **Pages** activado: rama `main`, carpeta `/ (root)`, HTTPS forzado.
- **Link público:**
  ```
  https://joshizaguirrea-hub.github.io/learning-UP/
  ```

###  Pendiente para que el login funcione en el link público
En **Supabase** hay que autorizar el dominio nuevo:
1. Entra a https://supabase.com → tu proyecto → **Authentication → URL Configuration**
2. En **Site URL** y **Redirect URLs** agrega:
   ```
   https://joshizaguirrea-hub.github.io/learning-UP/
   ```
3. Guarda. (Sin esto, la app carga pero el login falla.)

---

##  Nota de seguridad

- La única llave en el código es la **anon/publishable key** de Supabase
  (`sb_publishable_...`) → **es pública y segura** para el navegador.
- **NUNCA** subas la `service_role` key al frontend.
- La seguridad real depende de tener **Row Level Security (RLS)** activo en
  las tablas de Supabase. <- revisar/confirmar.

---

##  Pendientes / próximos pasos

- [ ] Ajustar URLs en Supabase (para el login en el link público). ← lo más urgente
- [ ] Confirmar que RLS está activo en las tablas de Supabase.
- [ ] Tests E2E con Playwright (flujos: login, completar verbo, diccionario).
- [ ] Enganchar medallas al perfil.
- [ ] Más mazos de verbos (phrasal verbs, preposiciones).
- [ ] Diccionario offline (fallback sin red).

---

##  Recap del día épico

De no saber qué era Node a tener:
Node + Git + Gemini CLI instalados · proyecto clonado y conectado a GitHub ·
tests completos y en verde · app corriendo en local · repo público · Pages activado.

**¡Gran trabajo, jefe!** 
