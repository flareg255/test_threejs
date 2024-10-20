import "../css/style.css";
import * as THREE from 'three'

console.log(THREE);

const scene = new THREE.Scene();

// const geometery = new THREE.BoxGeometry(1,1,1, 2,2,2);
// const geometery = new THREE.BufferGeometry();
// const verticeArray = new Float32Array(
//     [
//         0,0,0,
//         0,1,0,
//         1,0,0
//     ]
// );
// const positionsAttribute = new THREE.BufferAttribute(verticeArray, 3);
// geometery.setAttribute('position', positionsAttribute);
// console.log(geometery);
const geometery = new THREE.PlaneGeometry(1,1);
const material = new THREE.MeshBasicMaterial({color:'aqua', wireframe:true});
const mesh = new THREE.Mesh(geometery, material);

scene.add(mesh);


const aspect = {
    width:window.innerWidth,
    height:window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.y = 1;
camera.position.z = 3;

const canvas = document.querySelector('.draw');
const rederer = new THREE.WebGLRenderer({ canvas });
rederer.setSize(aspect.width, aspect.height);

const clock = new THREE.Clock();
rederer.render(scene, camera);
// const animate = () => {
//     const elapsedTime = clock.getElapsedTime();
//     console.log(elapsedTime);
//     mesh.rotation.y += elapsedTime * Math.PI * 2;

//     rederer.render(scene, camera);

//     window.requestAnimationFrame(animate);
// };

// animate();