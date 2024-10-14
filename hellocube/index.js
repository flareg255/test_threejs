import * as THREE from "./threee/three.module.min.js"
console.log(THREE);

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: "purple" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const aspect = {
    width:window.innerWidth,
    height:window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 3;
console.log(camera.position)
scene.add(camera);

const canvas = document.querySelector('.draw');
const rederer = new THREE.WebGLRenderer({ canvas });
rederer.setSize(aspect.width, aspect.height);
rederer.render(scene, camera);