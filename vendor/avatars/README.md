# Avatares 3D del profe (vendor/avatars)

Estos `.glb` son los profesores humanos 3D. Viven en el repo para que funcionen
en **cualquier red** (incluida la de Walmart) y **offline** (el Service Worker
los cachea). Necesitan blendshapes de boca (`jawOpen`/`viseme_*`) y de ojos
(`eyeBlink*`) para el lip-sync y el parpadeo (el motor los auto-detecta).

## Un profe por ROL (convencion de nombres)

La app asigna un avatar distinto a cada rol segun el nombre del archivo:

| Rol         | Archivo                    | Profe    | Donde aparece            |
|-------------|----------------------------|----------|--------------------------|
| `course`    | `profe-curso.glb`          | Megan    | Clases del curso         |
| `speaking`  | `profe-conversacion.glb`   | Mathias  | Conversacion con la IA   |
| `interview` | `profe-entrevista.glb`     | Susan    | Simulador de entrevista  |

> Si falta el archivo de un rol, cae con gracia a `profe-curso.glb`.
> Apenas reemplazas un `.glb` (mismo nombre), aparece solo en su rol.

## Quienes son ahora (avatares base de met4citizen/TalkingHead)

- **Megan** = `brunette` (Ready Player Me, mujer con lentes, estilo cartoon).
- **Mathias** = `avatarsdk` (hombre realista con barba, vestido).
- **Susan** = `avaturn` (mujer realista de traje).

## Como reemplazar por los tuyos (recomendado para etnia/rasgos exactos)

1. Entra a **https://readyplayer.me** desde un equipo/telefono con red libre.
2. Crea el avatar eligiendo piel, rasgos, pelo y ropa.
3. Descarga el **.glb** y renombralo segun la tabla.
4. Reemplaza el archivo en esta carpeta. Commit + push. Listo.
