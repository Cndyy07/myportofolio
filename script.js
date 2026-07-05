// 1. Inisialisasi Kanvas Partikel
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];
let mouse = { x: null, y: null, radius: 100 };

function resizeCanvas() {
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Deteksi koordinat mouse relatif terhadap kanvas
window.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
});

window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

// Kerangka Objek Partikel
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = Math.random() * 0.4 - 0.2;
    this.speedY = Math.random() * 0.4 - 0.2;
    this.color = Math.random() > 0.4 ? '#ff2e93' : '#00f0ff';
    this.alpha = Math.random() * 0.5 + 0.2;
  }
  
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    // Efek partikel menjauhi kursor mouse
    if (mouse.x && mouse.y) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius) {
        let force = (mouse.radius - distance) / mouse.radius;
        let forceX = dx / distance;
        let forceY = dy / distance;
        this.x -= forceX * force * 1.5;
        this.y -= forceY * force * 1.5;
      }
    }
  }
}

function initParticles() {
  particlesArray = [];
  const particleCount = Math.min(60, Math.floor(canvas.width / 15));
  for (let i = 0; i < particleCount; i++) {
    particlesArray.push(new Particle());
  }
}
initParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// 2. Animasi Mesin Tik Otomatis (Typing Effect)
const textArray = ["Mahasiswa Teknologi Informasi", "Sedang Belajar dan Berkembang", "Siap Menghadapi Tantangan Baru"];
let textIndex = 0;
let charIndex = 0;
const typingDelay = 100;
const erasingDelay = 50;
const nextTextDelay = 1800;
const typingElement = document.getElementById("typing-text");

function type() {
  if (charIndex < textArray[textIndex].length) {
    typingElement.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, nextTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textIndex++;
    if (textIndex >= textArray.length) textIndex = 0;
    setTimeout(type, typingDelay);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 500);
});

// 3. Toggle Menu Seluler (Responsive Hamburger Menu)
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('active');
}

// 4. Scrollspy & Header Transisi Glassmorphism saat bergulir
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 180) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });

  const header = document.getElementById("header");
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// 5. Penanganan Formulir Kontak & Pop-up Sukses
function handleFormSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('senderName').value;
  const email = document.getElementById('senderEmail').value;

  document.getElementById('modalTitle').innerText = "Halo, " + name + "!";
  document.getElementById('modalMessage').innerHTML = "Pesan Anda berhasil terkirim. Saya akan segera menghubungi Anda di <span style='color:#ff2e93; font-weight:600;'>" + email + "</span> secepat mungkin.";
  
  const modal = document.getElementById('successModal');
  modal.classList.add('active');

  document.getElementById('portfolioContactForm').reset();
}

// Menampilkan info proyek yang masih dipersiapkan
function showDemoInfo(projectName) {
  document.getElementById('modalTitle').innerText = "Proyek " + projectName;
  document.getElementById('modalMessage').innerText = "Demonstrasi interaktif untuk proyek " + projectName + " saat ini sedang dipersiapkan untuk hosting. Terima kasih atas ketertarikan Anda!";
  document.getElementById('successModal').classList.add('active');
}

// Menutup Pop-up Sukses Modal
function closeModal() {
  const modal = document.getElementById('successModal');
  modal.classList.remove('active');
}
