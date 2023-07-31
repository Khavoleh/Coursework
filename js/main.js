// Imports three.js from CDN
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/RGBELoader.js";

// Set size for window
const width = 500;
const height = 500;
// Create scene
const scene = new THREE.Scene();
// Create camera
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

// Declare object
let object;

// Move camera around object
let controls;

// Folder and action that download object name
let url = window.location.href;
let lastIndexOfSlash = url.lastIndexOf('/');
let lastIndexOfDot = url.lastIndexOf('.');
let objToRender = url.slice(lastIndexOfSlash, lastIndexOfDot);

// Declare loader with gltf format
const loader = new GLTFLoader();

// Load the file
loader.load(
  `../models/${objToRender}/scene.gltf`,
  function (gltf) {
    // If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    // If there is an error, log it
    console.error(error);
  }
);

// Declare renderer and set size
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);

// Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// Set camera position
camera.position.z = 25;

// Add lights to the scene
const hlight = new THREE.AmbientLight(0x404040, 5);
scene.add(hlight)

const dirLight = new THREE.DirectionalLight(0xffffff, 5);
dirLight.position.set(0, 1, 0)
dirLight.castShadow = true;
scene.add(dirLight);

const light1 = new THREE.PointLight(0xc4c4c4, 0.1);
light1.position.set(0, 300, 500);
scene.add(light1);

const light2 = new THREE.PointLight(0xc4c4c4, 0.1);
light2.position.set(500, 100, -500);
scene.add(light2);

const light3 = new THREE.PointLight(0xc4c4c4, 0.1);
light3.position.set(0, 100, -500);
scene.add(light3);

const light4 = new THREE.PointLight(0xc4c4c4, 0.1);
light4.position.set(-500, 300, 0);
scene.add(light4);

// Add rotation
controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.minDistance = 15;
controls.maxDistance = 30;

// Add realistic background to the object
renderer.outputEncoding = THREE.sRGBEncoding;
new RGBELoader()
    .setPath( '../img/environment/' )
    .load( 'modern_buildings_2_2k.hdr', function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    } );

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Add a listener to the window
window.addEventListener("resize", function () {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

// Start the 3D rendering
animate();