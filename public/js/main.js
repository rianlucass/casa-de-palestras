// ── Menu mobile ──────────────────────────────────────────────
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const lines = document.querySelectorAll(".hamburger-line");

menuBtn.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("hidden");

  mobileMenu.classList.toggle("hidden");

  // Anima o ícone hamburguer → X
  if (!isOpen) {
    lines[0].style.transform = "translateY(8px) rotate(45deg)";
    lines[1].style.opacity = "0";
    lines[2].style.transform = "translateY(-8px) rotate(-45deg)";
  } else {
    lines[0].style.transform = "";
    lines[1].style.opacity = "";
    lines[2].style.transform = "";
  }
});

// ── Header: topbar some ao rolar, nav ganha sombra ──────────────────────────────────
const topbar  = document.getElementById("topbar");
const mainNav = document.getElementById("main-nav");

window.addEventListener("scroll", () => {
  const y = window.scrollY;

  if (y > 40) {
    topbar.style.maxHeight = "0";
    mainNav.classList.add("shadow-md", "bg-white/70", "backdrop-blur-md");
    mainNav.classList.remove("bg-white");
  } else {
    topbar.style.maxHeight = "40px";
    mainNav.classList.remove("shadow-md", "bg-white/80", "backdrop-blur-md");
    mainNav.classList.add("bg-white");
  }
});

// ═══════════════════════════════════════════════════════════════
//  HERO SCROLL ENGINE — Awwwards-style animations
// ═══════════════════════════════════════════════════════════════

// ── Tela 1: Intro word-by-word reveal on load ──
document.addEventListener("DOMContentLoaded", () => {
  const heroWords = document.querySelectorAll(".hero-word");
  const heroFades = document.querySelectorAll(".hero-fade");
  const heroLine = document.querySelector(".hero-line");

  // Stagger word reveals
  heroWords.forEach((word, i) => {
    setTimeout(() => {
      word.classList.add("visible");
    }, 300 + i * 250);
  });

  // Line grows
  if (heroLine) {
    setTimeout(() => heroLine.classList.add("visible"), 200);
  }

  // Fade elements
  heroFades.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, 900 + i * 300);
  });
});

// ── Telas 2 & 3: Scroll-triggered reveals ──
const scrollReveals = document.querySelectorAll(".scroll-reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, {
  threshold: 0.15,
  rootMargin: "0px 0px -60px 0px"
});

scrollReveals.forEach(el => revealObserver.observe(el));

// ── Parallax suave nos orbs do fundo ──
const heroOrbs = document.querySelectorAll(".hero-orb");

if (heroOrbs.length) {
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        heroOrbs.forEach(orb => {
          const speed = parseFloat(orb.dataset.speed) || 0.02;
          orb.style.transform = `translateY(${scrollY * speed * 100}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });
}
