# Avatares 3D del profe (vendor/avatars)

Estos `.glb` son los profesores humanos 3D. Viven en el repo para que funcionen
en **cualquier red** (incluida la de Walmart) y **offline** (el Service Worker
los cachea). Formato ideal: **Ready Player Me** (mallas `Wolf3D_*` con blendshapes
`jawOpen`, `viseme_*`, `eyeBlink*`) para que el lip-sync y el parpadeo funcionen
automaticamente.

## Un profe por ROL (convencion de nombres)

La app asigna un avatar distinto a cada rol segun el nombre del archivo:

| Rol         | Archivo esperado             | Quien es              | Donde aparece                 |
|-------------|------------------------------|-----------------------|-------------------------------|
| `course`    | `profe-mujer.glb`   (LISTO)  | Teacher Horus         | Clases del curso              |
| `speaking`  | `profe-hombre.glb`  (LISTO)  | Teacher Jack          | Conversacion                  |
| `interview` | `profe-asiatica.glb`(falta)  | Teacher Lucien        | Simulador de entrevista       |

> `profe-hombre.glb` es un avatar Avaturn realista (piel clara-media). Con el
> selector de TONO DE PIEL en Ajustes se puede oscurecer (aproximado).

> Si el archivo de un rol **no existe**, ese rol cae con gracia a `profe-mujer.glb`.
> Apenas agregas el `.glb` con el nombre correcto, aparece solo en su rol.

## Como crear los que faltan

1. Entra a **https://readyplayer.me** (o Avaturn) desde un equipo/telefono con
   red libre (no la de Walmart / no telefono administrado).
2. Crea el avatar eligiendo **piel, rasgos, pelo y ropa** a tu gusto.
3. Descarga el **.glb** (Ready Player Me: "Download .glb").
4. Renombralo segun la tabla (`profe-hombre.glb`, `profe-asiatica.glb`) y ponlo
   en esta carpeta (`vendor/avatars/`).
5. Commit + push. Listo.

## Nota

`profe-mujer.glb` es un avatar Ready Player Me tomado del proyecto open source
met4citizen/TalkingHead. Reemplazalo cuando tengas el tuyo.
