// Sahne, kamera ve renderer oluşturun
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87ceeb);
document.body.appendChild(renderer.domElement);

// Işık kaynağı ekleyin
const light = new THREE.AmbientLight(0x404040);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// Kamera pozisyonunu ayarlayın
camera.position.z = 5;
// Geometri ve malzeme oluşturun
const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshPhongMaterial({ color: 0x0077ff });
const ball = new THREE.Mesh(geometry, material);

// Topu sahneye ekleyin
scene.add(ball);

// Başlangıç hızı ve yönünü ayarlayın
let speedX = 0.02;
function animate() {
  requestAnimationFrame(animate);

  // Topun pozisyonunu güncelleyin
  ball.position.x += speedX;

  // Yatay sınırdan zıplama
  if (ball.position.x > 2.5 || ball.position.x < -2.5) {
    speedX = -speedX;
    playBounceSound();
  }

  renderer.render(scene, camera);
}

animate();

function changeColor(color) {
  ball.material.color.set(color);
}

function increaseSpeed() {
  speedX *= 1.1;
  speedY *= 1.1;
}

function decreaseSpeed() {
  speedX *= 0.9;
  speedY *= 0.9;
}

let isPaused = false;
function pauseResume() {
  isPaused = !isPaused;
  if (isPaused) {
    speedX = 0;
    speedY = 0;
  } else {
    speedX = 0.02;
    speedY = 0.02;
  }
}

// Zıplama sesi ekleyin
let bounceSound = new Audio("bounce.wav");
let soundEnabled = true;

function playBounceSound() {
  if (soundEnabled) {
    bounceSound.play();
  }
}
function toggleSound() {
  soundEnabled = !soundEnabled;
}
renderer.shadowMap.enabled = true;
ball.castShadow = true;
ball.receiveShadow = true;
directionalLight.castShadow = true;

const colorModal = document.getElementById("colorModal");
colorModal.style.display = "none";
const speedModal = document.getElementById("speedModal");
speedModal.style.display = "none";

document.querySelector(".fa-palette").addEventListener("click", () => {
  colorModal.style.display = "block";
});

document.getElementById("colorModalCloseBtn").addEventListener("click", () => {
  colorModal.style.display = "none";
});

document.querySelector(".fa-gauge-simple").addEventListener("click", () => {
  speedModal.style.display = "block";
});

document.getElementById("speedModalCloseBtn").addEventListener("click", () => {
  speedModal.style.display = "none";
});

const vol = document.querySelector(".fa-headphones");
vol.style.display = "none";
vol.addEventListener("click", () => {
  vol.style.display = "none";
  noVol.style.display = "block";
});

const noVol = document.querySelector(".fa-volume-xmark");
noVol.addEventListener("click", () => {
  noVol.style.display = "none";
  vol.style.display = "flex";
});

const play = document.querySelector(".fa-play");
play.style.display = "none";
play.addEventListener("click", () => {
  play.style.display = "none";
  pause.style.display = "block";
});

const pause = document.querySelector(".fa-pause");
pause.addEventListener("click", () => {
  pause.style.display = "none";
  play.style.display = "flex";
});
