import "../css/style.css";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

console.log(scene);

const geometery = new THREE.BufferGeometry(0.2,0.2);
const verticesAmount = 10000;
const positionArray = new Float32Array(verticesAmount * 3);
for(let i = 0; i < verticesAmount * 3; i++){
    positionArray[i] = Math.random() * -4;
}
geometery.setAttribute('position', new THREE.BufferAttribute(positionArray,3));
// const material = new THREE.MeshBasicMaterial({color: 'aqua'});
const material = new THREE.PointsMaterial();
// const mesh = new THREE.Mesh(geometery, material);
material.size = 0.002;
material.transparent = true;
material.depthTest = false;
const points = new THREE.Points(geometery, material);

// scene.add(mesh);
scene.add(points);


const aspect = {
    width:window.innerWidth,
    height:window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = -1;
camera.position.x = -2;
camera.position.y = -2;



const canvas = document.querySelector('.draw');
const rederer = new THREE.WebGLRenderer({ canvas });
rederer.setSize(aspect.width, aspect.height);

const controls = new OrbitControls(camera, rederer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;
controls.enableRotate = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.05;

const clock = new THREE.Clock();
rederer.render(scene, camera);
const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    // console.log(elapsedTime);
    // camera.rotation.y += elapsedTime * Math.PI * 2 / 100;
    // camera.rotation.y += Math.PI * 2 / 1000;
    // points.rotation.y = elapsedTime * 0.05;
    // points.rotation.x = elapsedTime * -0.05;

    rederer.render(scene, camera);
    controls.update();

    window.requestAnimationFrame(animate);
};

animate();
