// Dark mode toggle
const toggle = document.getElementById("darkModeToggle");

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save preference
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      toggle.innerText = "☀️ Light Mode";
    } else {
      localStorage.setItem("theme", "light");
      toggle.innerText = "🌙 Dark Mode";
    }
  });
}

// Load saved theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (toggle) toggle.innerText = "☀️ Light Mode";
  }
});

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById('contactFormMsg');
    if (msg) msg.textContent = 'Thanks! We’ll get back to you within 24 hours.';
    contactForm.reset();
    setTimeout(() => { if (msg) msg.textContent = ''; }, 7000);
  });
}
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
// Scroll reveal animation
const reveals = document.querySelectorAll(".reveal");

function animateCount(el) {
  if (!el || el.dataset.animated) return;
  const target = parseInt(el.dataset.target, 10) || 0;
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const startTime = performance.now();
  el.dataset.animated = 'true';
  function step(time) {
    const progress = Math.min((time - startTime) / duration, 1);
    const current = Math.round(progress * target);
    el.textContent = current + (suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      if (!el.classList.contains('active')) {
        el.classList.add("active");
        // animate stat numbers inside revealed block
        const nums = el.querySelectorAll('.stat-number');
        nums.forEach(n => animateCount(n));
      }
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Show modal if redirected back with ?submitted=1 (FormSubmit _next redirect)
window.addEventListener('DOMContentLoaded', () => {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('submitted') === '1') {
      const label = document.getElementById('consultModalLabel');
      const body = document.getElementById('consultModalBody');
      if (label) label.textContent = 'Request sent';
      if (body) body.textContent = 'Thank you! We received your request and will contact you within 24 hours.';
      const consultModalEl = document.getElementById('consultModal');
      if (consultModalEl && window.bootstrap) {
        const consultModal = new bootstrap.Modal(consultModalEl);
        consultModal.show();
        // Remove query string so modal doesn't re-trigger on refresh
        history.replaceState(null, '', window.location.pathname);
      }
    }
  } catch (e) {
    // ignore
  }
});

// Randomize hero carousel initial slide so visitors see a different message each load
// window.addEventListener('DOMContentLoaded', () => {
//   try {
//     const el = document.getElementById('heroCarousel');
//     if (el && window.bootstrap) {
//       const items = el.querySelectorAll('.carousel-item');
//       if (items.length > 1) {
//         const idx = Math.floor(Math.random() * items.length);
//         const car = new bootstrap.Carousel(el, { ride: false });
//         car.to(idx);
//         car.cycle();
//       }
//     }
//   } catch (e) {
//     // ignore
//   }
// });

window.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('heroCarousel');
  if (!el || !window.bootstrap) return;

  const items = el.querySelectorAll('.carousel-item');
  if (items.length <= 1) return;

  const idx = Math.floor(Math.random() * items.length);

  const carousel = new bootstrap.Carousel(el, {
    interval: 6000,
    pause: 'hover',
    ride: false
  });

  carousel.to(idx);
  carousel.cycle();
});
  

window.addEventListener('load', () => {
  document.querySelector('.hero')?.classList.add('animate-in');
});
