# vendor/avatars/

Aca van los avatares 3D del profe (archivos `.glb`), servidos desde el propio
sitio (github.io) para NO depender de un servidor externo. Asi el profe humano
3D funciona en cualquier red (incluida la corporativa) y offline via PWA.

## Como agregar un avatar

Crea tu avatar en una de estas webs (desde una red/equipo LIBRE, no corporativo):

- **Avaturn** -> https://avaturn.me  (recomendado: realista desde selfie, .glb con blendshapes ARKit)
- **Ready Player Me** -> https://readyplayer.me/es/avatar  (cartoon humano)

Pasos:

1. Crea y personaliza tu avatar.
2. **Exporta / descarga el `.glb`.**
   - Avaturn: boton Export -> GLB (viene con blendshapes de cara).
   - Ready Player Me: usa la URL con morph targets de boca:
     `https://models.readyplayer.me/XXXX.glb?morphTargets=mouthOpen,mouthSmile,ARKit`
3. Guarda el archivo aca, por ejemplo:
   - `profe-mujer.glb`
   - `profe-hombre.glb`
4. En Ajustes -> "Cara del profe" -> Humano 3D, pega la ruta relativa como URL:
   `./vendor/avatars/profe-mujer.glb`
   (o pedile a Horus que lo deje como default).

Requisito para el lip-sync: el `.glb` debe traer blendshapes de boca
(`jawOpen` / `mouthOpen` / visemes). Avaturn y Ready Player Me los incluyen.

Nota: los `.glb` pesan ~1-3 MB. El Service Worker los cachea (cache-first, igual
que three.js), asi que se bajan una sola vez.
