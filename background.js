const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let particlesArray = [];

// Create particle
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 1.5 - 0.75; // Reduced speed
    this.speedY = Math.random() * 1.5 - 0.75; // Reduced speed
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.5) this.size -= 0.1;
  }

  draw() {
    ctx.fillStyle = "rgba(15,15,207,1)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Handle particles
function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    if (particlesArray[i].size <= 0.5) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

function init() {
  setInterval(() => {
    for (let i = 0; i < 3; i++) { // Reduced particle creation rate
      particlesArray.push(new Particle());
    }
  }, 200); // Increased interval
}

init();
animate();


// Update in background.js
const menu = document.querySelector('.menu');
const openMenuBtn = document.querySelector('.open-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const menuLinks = document.querySelectorAll('.menu a');

function toggleMenu() {
    menu.classList.toggle('menu_opened');
    document.body.classList.toggle('no-scroll');
}

function closeMenu() {
    menu.classList.remove('menu_opened');
    document.body.classList.remove('no-scroll');
}

openMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);

// Close menu when clicking a link
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        closeMenu();
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});