import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color('#101722');

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(4, 3, 6);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 3;
controls.maxDistance = 12;

scene.add(new THREE.HemisphereLight(0xc6e4ff, 0x192133, 3));
const light = new THREE.DirectionalLight(0xffffff, 4);
light.position.set(3, 5, 4);
scene.add(light);

// Replace this geometry or material to start making the scene your own.
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1.6, 1.6, 1.6),
  new THREE.MeshStandardMaterial({ color: 0x429fff, metalness: 0.25, roughness: 0.3 }),
);
cube.rotation.set(0.3, 0.4, 0);
scene.add(cube);

const edges = new THREE.LineSegments(
  new THREE.EdgesGeometry(cube.geometry),
  new THREE.LineBasicMaterial({ color: 0xb1e2ff, transparent: true, opacity: 0.55 }),
);
cube.add(edges);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let rotating = !reducedMotion.matches;
const button = document.querySelector('#toggle-rotation');
function updateButton() {
  button.textContent = rotating ? 'Pause rotation' : 'Resume rotation';
  button.setAttribute('aria-pressed', String(!rotating));
}
button.addEventListener('click', () => {
  rotating = !rotating;
  updateButton();
});
reducedMotion.addEventListener('change', (event) => {
  rotating = !event.matches;
  updateButton();
});
updateButton();

function resize() {
  const { clientWidth: width, clientHeight: height } = canvas;
  renderer.setSize(width, height, false);
  camera.aspect = width / Math.max(height, 1);
  // Leave extra room for the title on narrow screens.
  camera.setViewOffset(width, height, 0, -height * 0.13, width, height);
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

let previousTime;
renderer.setAnimationLoop((time) => {
  const delta = previousTime === undefined ? 0 : Math.min((time - previousTime) / 1000, 0.05);
  previousTime = time;
  if (rotating) {
    cube.rotation.x += delta * 0.18;
    cube.rotation.y += delta * 0.35;
  }
  controls.update();
  renderer.render(scene, camera);
  document.querySelector('#status').hidden = true;
});
