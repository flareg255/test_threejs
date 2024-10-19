import * as THREE from "./threee/three.module.min.js"
console.log(THREE);

const scene = new THREE.Scene();

const group = new THREE.Group();

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: "purple" });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.z = 1;

const geometry2 = new THREE.BoxGeometry(1,1,1);
const material2 = new THREE.MeshBasicMaterial({ color: "green" });
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.y = 2;

group.add(mesh, mesh2);
group.position.x = 3;

scene.add(group);


const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

const aspect = {
    width:window.innerWidth,
    height:window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 6;

scene.add(camera);

const canvas = document.querySelector('.draw');
const rederer = new THREE.WebGLRenderer({ canvas });
rederer.setSize(aspect.width, aspect.height);
rederer.render(scene, camera);