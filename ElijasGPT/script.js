// Custom Cursor Logic
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;
  
  dot.style.left = `${posX}px`;
  dot.style.top = `${posY}px`;
  
  outline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: 'forwards' });
});

// Add hover effect to all links and buttons
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => outline.classList.add('hover'));
  el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
});

// Scroll Reveal Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Language Switcher
function setLang(lang) {
  document.body.className = `lang-${lang}`;
  document.getElementById('btnLt').classList.toggle('active', lang === 'lt');
  document.getElementById('btnEn').classList.toggle('active', lang === 'en');
}

// Set default language
setLang('lt');

// Installation Tabs
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  
  document.getElementById(`c-${tabId}`).classList.remove('hidden');
  document.getElementById(`t-${tabId}`).classList.add('active');
}

// Modal Logic
function openModal() {
  document.getElementById('downloadModal').classList.add('show');
}

function closeModal(event, force = false) {
  if (force || event.target.id === 'downloadModal') {
    document.getElementById('downloadModal').classList.remove('show');
  }
}
