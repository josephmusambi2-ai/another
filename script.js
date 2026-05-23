// ============================================
//  GREENFIELD ACADEMY — Books & Learning Site
//  script.js
// ============================================

// --- ANIMATED STAT COUNTER ---
// Counts numbers up when the stats bar scrolls into view

function animateCounter(el, target, suffix) {
  let current = 0;
  const duration = 1800; // ms
  const steps = 60;
  const increment = target / steps;
  const interval = duration / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, interval);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statEls = document.querySelectorAll('.stat');
      statEls.forEach(stat => {
        const numEl = stat.querySelector('.stat-num');
        const target = parseInt(stat.dataset.target, 10);
        animateCounter(numEl, target);
      });
      statsObserver.disconnect(); // only animate once
    }
  });
}, { threshold: 0.4 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);


// --- SCROLL FADE-IN for Cards and Book Items ---
// Elements fade up into view as you scroll

const fadeEls = document.querySelectorAll('.card, .book-item, .tips-list li');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity .5s ease ${i * 0.07}s, transform .5s ease ${i * 0.07}s`;
  fadeObserver.observe(el);
});

// Add the 'visible' class styles via JS so we don't need extra CSS
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);
});


// --- SMOOTH ACTIVE NAV HIGHLIGHT ---
// Highlights the nav link matching the current section

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));
