const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = [...document.querySelectorAll('.nav a')];

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
      link.classList.toggle('active', isCurrent);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));
