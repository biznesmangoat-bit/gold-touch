// ── NAV: shrink on scroll ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── BURGER MENU ──
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Otwórz menu');
  });
});

document.addEventListener('click', e => {
  if (!nav.contains(e.target)) {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq__btn').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      document.getElementById(b.getAttribute('aria-controls')).hidden = true;
    });

    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      document.getElementById(btn.getAttribute('aria-controls')).hidden = false;
    }
  });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 70,
      behavior: 'smooth'
    });
  });
});
