#  Llevar "Learning UP" a tu compu personal

Guía para mover el proyecto y poder instalar TODO (Node, tests, etc.) sin las
restricciones de la máquina del trabajo.

---

##  1. Qué te llevas

El ZIP `learning-up.zip` contiene TODO el proyecto, **incluyendo el historial
de git** (la carpeta `.git`), así que conservas todos los commits y puedes
seguir usando "línea de tiempo" con git.

**NO incluye** `.venv` (el entorno de Python) porque eso se recrea en segundos.

---

##  2. Qué instalar en tu compu personal

Instala estas 3 cosas (todas gratis, con instalador normal, tú tienes admin):

| Programa | Para qué | Dónde |
|----------|----------|-------|
| **Node.js (LTS)** | Correr los tests y herramientas | https://nodejs.org (botón "LTS") |
| **Python 3** | Servir la app en local | https://python.org/downloads |
| **VS Code** | Editar el código | https://code.visualstudio.com |
| **Git** (opcional) | Guardar versiones | https://git-scm.com |

> En tu compu personal NO hay proxy de Walmart, así que los instaladores
> descargan sin problema. Solo dale "Siguiente → Siguiente → Instalar".

---

##  3. Descomprimir

1. Copia `learning-up.zip` a tu compu (USB, OneDrive personal, correo...).
2. Clic derecho → **Extraer todo**.
3. Te queda una carpeta `plataforma-idiomas`.

---

## ▶ 4. Correr la app (igual que aquí)

Abre una terminal DENTRO de la carpeta `plataforma-idiomas` y ejecuta:

```bash
python -m http.server 5500
```

Luego abre en el navegador: **http://127.0.0.1:5500/index.html**

> Si `python` no funciona, prueba `py -m http.server 5500`.

---

##  5. Correr los tests (¡lo que querías Node!)

Con Node ya instalado, en la terminal dentro de `plataforma-idiomas`:

```bash
node tests/pricing.test.mjs
node tests/streak.test.mjs
node tests/content-audit.test.mjs
node tests/example-gen.test.mjs
node tests/verb-practice.test.mjs
node tests/verb-tips.test.mjs
```

Cada uno debe salir **"X pruebas en verde."** 

O córrelos TODOS de un jalón:

```bash
node --test tests/
```

---

##  6. Supabase (base de datos)

Las credenciales públicas ya están en `src/config/supabase.js`, así que la app
**funciona tal cual** (login, progreso, etc.) apuntando al mismo proyecto de
Supabase. No tienes que configurar nada para que corra.

> Si algún día quieres tu propia base: crea un proyecto en supabase.com, corre
> los `.sql` de la carpeta `sql/` en orden (001 → 005), y pega tu URL + anon key
> en `src/config/supabase.js`.

---

##  7. Seguir con git (opcional pero recomendado)

El historial ya viaja en el ZIP. En tu compu personal:

```bash
git log --oneline        # ves todos los commits
git status               # estado actual
git add -A && git commit -m "sigo trabajando"   # guardas cambios
```

Y si quieres respaldo en la nube, crea un repo en GitHub y:

```bash
git remote add origin https://github.com/TU-USUARIO/learning-up.git
git push -u origin main
```

---

## 🆘 Si algo falla

- **"python no se reconoce"** → reinstala Python marcando la casilla
  *"Add Python to PATH"* al inicio del instalador.
- **"node no se reconoce"** → cierra y abre la terminal de nuevo (o reinicia).
- **La app carga en blanco** → abre la consola del navegador (F12) y revisa el
  error; el router muestra un panel rojo con el detalle.

¡Y listo, jefe! Ya tienes tu proyecto libre para crecer. 
