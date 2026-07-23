# Publicar Learning UP (hosting + PWA instalable)

Learning UP es 100% estatico (sin build). El backend ya vive en la nube
(Supabase + Cloudflare Worker), asi que "publicar" = subir estos archivos a un
hosting estatico con HTTPS. Aqui las 2 rutas recomendadas.

---

## Opcion A — GitHub Pages (la mas rapida, ya estas en GitHub)

1. Ve a tu repo en GitHub: `joshizaguirrea-hub/learning-UP`.
2. **Settings** -> **Pages**.
3. En **Build and deployment** -> **Source**: elige **Deploy from a branch**.
4. **Branch**: `main`  ·  **Folder**: `/ (root)`  ->  **Save**.
5. Espera ~1 min. Tu app quedara en:
   **https://joshizaguirrea-hub.github.io/learning-UP/**

> Requisito: el repo debe ser **publico** (Pages gratis) o tener GitHub Pro.
> El `.nojekyll` ya incluido evita que GitHub ignore la carpeta `src/`.

---

## Opcion B — Cloudflare Pages (dominio mas limpio, misma cuenta del Worker)

1. En el dashboard de Cloudflare -> **Workers & Pages** -> **Create** -> **Pages**
   -> **Connect to Git** -> autoriza y elige el repo `learning-UP`.
2. Configuracion de build:
   - **Framework preset**: *None*
   - **Build command**: *(vacio)*
   - **Build output directory**: `/`
3. **Save and Deploy**. Quedara en `learning-up.pages.dev` (o tu dominio propio).

Ventaja: URL en la raiz (sin subcarpeta) y puedes conectar un dominio propio.

---

## Despues de publicar (2 cosas de Supabase / Worker)

1. **Supabase -> Authentication -> URL Configuration**: agrega tu nueva URL
   (github.io o pages.dev) en **Site URL** y en **Redirect URLs**. Esto es solo
   para el correo de confirmacion de registro; el login por correo/contrasena
   funciona sin esto.
2. **Cloudflare Worker (Bymax IA)**: confirma que su CORS permita el nuevo
   origen (idealmente `Access-Control-Allow-Origin: *` o tu dominio). Si el chat
   con IA no responde desde el dominio publicado, es esto.

## Actualizaciones
Cada `git push` a `main` vuelve a desplegar solo (en ambas opciones).
Recuerda subir la version (VERSION + sw.js + index.html) como ya hacemos.
