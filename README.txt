THREE.JS STARTER

A static webpage based on Option 2 (Import from a CDN) in the official guide:
https://threejs.org/manual/#installation

FILES
index.html   Webpage and import map, pinned to Three.js 0.180.0.
main.js      Scene, camera, renderer, rotating cube, and OrbitControls.
style.css    Responsive layout and appearance.
public/      Optional place for future images, textures, and models.
.nojekyll    Tells GitHub Pages to serve the static files directly.

LOCAL PREVIEW
Open a terminal in this folder and run:

  python3 -m http.server 8000

Then open http://localhost:8000 in your browser.
Stop the server with Control+C. Do not open index.html by double-clicking;
JavaScript modules need to be served over HTTP.

GITHUB PAGES
1. Create a public GitHub repository.
2. Upload the CONTENTS of this folder to the repository's top level.
   index.html must be at the top level, not inside threejs-starter/.
3. Commit the files to main.
4. Open Settings > Pages.
5. Select Deploy from a branch, main, and / (root), then Save.
6. Open the published link shown in Pages settings when deployment finishes.

All local paths are relative, so this also works under /your-repository/.
No npm installation or build step is needed with this CDN setup.
An internet connection is required to load Three.js from jsDelivr.
A modern browser with WebGL 2 support is required for the scene.

CUSTOMIZE
Edit the title and heading in index.html, colors in style.css, and the
geometry, material, and lights in main.js. Reference future assets using
relative paths such as ./public/model.glb.

Keep Three.js and its addons on the same version and CDN when updating
the import map. This starter intentionally pins a version for consistency.
