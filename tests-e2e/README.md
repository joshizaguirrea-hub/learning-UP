# Tests E2E (Playwright)

Tests de punta a punta que abren un navegador de verdad y prueban los flujos
de Learning UP como lo haría un usuario. Complementan a los tests unitarios de
`tests/` (que prueban la lógica de `core/`).

## Qué prueban (por ahora: flujos SIN login)

- **Home:** carga, título, header y botones de "Empezar gratis" / "Ya tengo cuenta".
- **Login:** formulario visible (correo, contraseña, botón Entrar).
- **Registro:** campos, roles (estudiante/profesor) y botón Crear cuenta.
- **Diccionario flotante:** el FAB abre y cierra el panel (con `aria-expanded`).
- **Guardia de rutas:** entrar a `#/student` sin sesión te manda a `#/login`.

> Usan selectores por **rol** (`getByRole`/`getByLabel`) a propósito: si pasan,
> tu UI también es accesible (WCAG 2.2 AA). 

## Cómo correrlos (en tu compu personal, con Node instalado)

```powershell
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Instalar el navegador de Playwright (solo la primera vez)
npm run e2e:install

# 3a. Correr contra el sitio PÚBLICO (GitHub Pages) — no requiere nada más
npm run test:e2e

# 3b. O correr contra tu LOCAL
#     (primero, en OTRA terminal: python -m http.server 5500)
npm run test:e2e:local

# Modo interactivo (ver el navegador y depurar)
npm run test:e2e:ui
```

Al terminar, el reporte HTML queda en `playwright-report/`. Ábrelo con:

```powershell
npx playwright show-report
```

## Pendiente a futuro

- Tests CON login (necesitan una cuenta de **prueba** de Supabase, no la personal).
- Flujo de completar un verbo y de traducir en el diccionario.
