import './style.css'
import './utils'
import * as THREE from 'three'
import { genRandColor } from './utils'

const scene = new THREE.Scene()
const cam = new THREE.PerspectiveCamera(75, (window.innerWidth / 2) / window.innerHeight, 0.1, 1000);
cam.position.setZ(30);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth / 2, window.innerHeight)
renderer.render(scene, cam);

let torousGeo = []
let torousMat = []
let torous = []

let a = [12, 14, 13, 11];
for (let i = 0; i < 4; i++) {
  torousGeo[i] = new THREE.TorusGeometry(a[i], 0.5, 10, 100);
  torousMat[i] = new THREE.MeshStandardMaterial({ color: genRandColor(), wireframe: false });
  torous[i] = new THREE.Mesh(torousGeo[i], torousMat[i]);

  scene.add(torous[i]);
}

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.z = 30;
scene.add(ambientLight);

const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 1, 0 );
light.castShadow = true;
scene.add( light );

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const textureLoader = new THREE.TextureLoader();
const guyTexture = textureLoader.load('guy.png');

const guy = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({ map: guyTexture })
);

scene.add(guy);

function animate() {
  requestAnimationFrame(animate);
  torous[0].rotation.x += 0.06;
  // torous[3].rotation.x = Math.PI / 2;
  torous[2].rotation.y += 0.06;
  torous[2].rotation.x += 0.06;
  torous[1].rotation.y -= 0.06;
  torous[1].rotation.x += 0.06;
  guy.rotation.y += 0.02;
  // controls.update();
  renderer.render(scene, cam);
}

animate()