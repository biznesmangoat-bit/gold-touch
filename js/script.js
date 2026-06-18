/* Gold Touch – script.js */

// NAV scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile burger
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// FAQ accordion
document.querySelectorAll('.faq__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const answer = document.getElementById(btn.getAttribute('aria-controls'));

    document.querySelectorAll('.faq__btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
    document.querySelectorAll('.faq__answer').forEach(a => { a.hidden = true; });

    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
    }
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.service-card, .pricing__group, .review-card, .faq__item, .about__text, .about__images, .gallery__item, .booking__content, .booking__visual, .contact__info, .contact__map'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => observer.observe(el));
