const imageFiles = [
  "memory-01.jpg",
  "memory-02.jpg",
  "memory-03.jpg",
  "memory-04.jpg",
  "memory-05.jpg",
  "memory-06.jpg",
  "memory-07.jpg",
  "memory-08.jpg",
  "memory-09.jpg",
  "memory-10.jpg",
  "memory-11.jpg",
  "memory-12.jpg",
  "memory-13.jpg",
  "memory-14.jpg"
];

const captions = [
  "My favourite place is next to you.",
  "Your smile is my happiness.",
  "Every moment with you feels like home.",
  "Forever looks beautiful with you.",
  "You are my sweetest memory.",
  "My heart will always choose you.",
  "Together is my favourite place.",
  "You make my world complete."
];

const imageBase = "assets/images/";
const intro = document.getElementById("intro");
const openBtn = document.getElementById("openBtn");
const slidesContainer = document.getElementById("slides");
const albumGrid = document.getElementById("albumGrid");
const slideCaption = document.getElementById("slideCaption");
const slideDots = document.getElementById("slideDots");

let currentSlide = 0;
let currentLightbox = 0;
let slideTimer;

function buildSlideshow() {
  imageFiles.slice(0, 8).forEach((file, index) => {
    const img = document.createElement("img");
    img.src = imageBase + file;
    img.alt = `Our memory ${index + 1}`;
    img.className = "slide" + (index === 0 ? " active" : "");
    slidesContainer.appendChild(img);

    const dot = document.createElement("button");
    dot.className = "slide-dot" + (index === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index));
    slideDots.appendChild(dot);
  });
}

function buildAlbum() {
  imageFiles.forEach((file, index) => {
    const button = document.createElement("button");
    button.className = "album-item";
    button.setAttribute("aria-label", `Open photo ${index + 1}`);
    button.innerHTML = `
      <img src="${imageBase + file}" alt="Our beautiful memory ${index + 1}">
      <span>Memory ${index + 1}</span>
    `;
    button.addEventListener("click", () => openLightbox(index));
    albumGrid.appendChild(button);
  });
}

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slide-dot");
  if (!slides.length) return;

  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
  slideCaption.textContent = captions[currentSlide % captions.length];

  restartTimer();
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function restartTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 3800);
}

function heartBurst() {
  for (let i = 0; i < 90; i++) {
    setTimeout(() => {
      const item = document.createElement("span");
      item.className = "burst";
      item.textContent = Math.random() > 0.35 ? "♥" : "✨";
      item.style.left = "50vw";
      item.style.top = "50vh";
      item.style.color = Math.random() > 0.5 ? "#ff7fa5" : "#ffe5a8";
      item.style.fontSize = `${16 + Math.random() * 24}px`;
      item.style.setProperty("--x", `${Math.random() * 700 - 350}px`);
      item.style.setProperty("--y", `${Math.random() * 700 - 350}px`);
      document.body.appendChild(item);
      setTimeout(() => item.remove(), 1300);
    }, i * 8);
  }
}

openBtn.addEventListener("click", () => {
  heartBurst();
  intro.classList.add("hide");
  document.body.classList.remove("locked");
  setTimeout(() => intro.remove(), 950);
});

document.getElementById("nextBtn").addEventListener("click", nextSlide);
document.getElementById("prevBtn").addEventListener("click", prevSlide);

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

function openLightbox(index) {
  currentLightbox = index;
  lightboxImg.src = imageBase + imageFiles[currentLightbox];
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function changeLightbox(direction) {
  currentLightbox =
    (currentLightbox + direction + imageFiles.length) % imageFiles.length;
  lightboxImg.src = imageBase + imageFiles[currentLightbox];
}

document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
document.getElementById("lightboxNext").addEventListener("click", () => changeLightbox(1));
document.getElementById("lightboxPrev").addEventListener("click", () => changeLightbox(-1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
  if (lightbox.classList.contains("show") && event.key === "ArrowRight") {
    changeLightbox(1);
  }
  if (lightbox.classList.contains("show") && event.key === "ArrowLeft") {
    changeLightbox(-1);
  }
});

function fallingHeart() {
  const heart = document.createElement("span");
  heart.className = "fall-heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "✦";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.color = Math.random() > 0.5 ? "#ff8eae" : "#ffe0a2";
  heart.style.fontSize = `${14 + Math.random() * 18}px`;
  heart.style.animationDuration = `${7 + Math.random() * 7}s`;
  heart.style.setProperty("--drift", `${Math.random() * 220 - 110}px`);
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 15000);
}

setInterval(fallingHeart, 650);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

buildSlideshow();
buildAlbum();
restartTimer();
