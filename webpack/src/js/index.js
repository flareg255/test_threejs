import "../css/style.css";
import * as THREE from 'three'

console.log(THREE);
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
    console.log( 'Started loading file: ' + url + '\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
loadingManager.onLoad = () => {
    console.log( 'Loading complete!');
};
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
    console.log( url );
    console.log( 'Loading file: ' + url + '\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
loadingManager.onError = () => {
    console.log("Error !");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load('img/map2.png');
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
const geometery = new THREE.BoxGeometry(1,1,1);
// const material = new THREE.MeshBasicMaterial({color:'aqua'});
const material = new THREE.MeshBasicMaterial({map: texture});
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
const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    console.log(elapsedTime);
    mesh.rotation.y += elapsedTime * Math.PI * 2 / 1000;

    rederer.render(scene, camera);

    window.requestAnimationFrame(animate);
};

animate();
