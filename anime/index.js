import * as THREE from "three";
console.log(THREE);

const scene = new THREE.Scene();

const texture = new THREE.TextureLoader().load(`./img/553.png`);
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
camera.position.z = 3;

const canvas = document.querySelector('.draw');
const rederer = new THREE.WebGLRenderer({ canvas });
rederer.setSize(aspect.width, aspect.height);

const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    console.log(elapsedTime);
    mesh.rotation.y += elapsedTime * Math.PI * 2;

    rederer.render(scene, camera);

    window.requestAnimationFrame(animate);
};

animate();