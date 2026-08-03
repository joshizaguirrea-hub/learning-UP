# vendor/avatars/

Aca van los avatares 3D del profe (archivos `.glb`), servidos desde el propio
sitio (github.io) para NO depender de readyplayer.me. Asi el profe humano 3D
funciona en cualquier red (incluida la corporativa) y offline via PWA.

## Como agregar un avatar

1. Crea tu avatar en https://readyplayer.me/es/avatar (desde una red libre).
2. Descarga el `.glb`. Ideal pedirlo con morph targets de boca para el lip-sync:
   `https://models.readyplayer.me/XXXX.glb?morphTargets=mouthOpen,mouthSmile,ARKit`
3. Guardalo aca, por ejemplo:
   - `profe-mujer.glb`
   - `profe-hombre.glb`
4. En Ajustes -> "Cara del profe" -> Humano 3D, pega la ruta relativa como URL:
   `./vendor/avatars/profe-mujer.glb`
   (o pedile a Horus que lo deje como default).

Nota: los `.glb` de Ready Player Me pesan ~1-3 MB. El Service Worker los cachea
(cache-first, igual que three.js), asi que se bajan una sola vez.
