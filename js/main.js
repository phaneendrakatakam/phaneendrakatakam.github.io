const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = [...document.querySelectorAll('.nav a')];
const topbar = document.querySelector('.topbar');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
}, { threshold: 0.08 });

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

// Header glass/shadow strengthens once the page starts moving.
function updateHeaderState() {
  topbar?.classList.toggle('scrolled', window.scrollY > 18);
}
updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });

// Career journey: draw the path, then reveal milestones toward the summit.
const journey = document.querySelector('.journey-visual');
const route = document.querySelector('.mountains path[stroke="url(#route)"]');

if (journey && route) {
  route.classList.add('journey-route');
  const length = route.getTotalLength();
  route.style.strokeDasharray = `${length}`;
  route.style.strokeDashoffset = reduceMotion ? '0' : `${length}`;

  const journeyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!reduceMotion) {
        requestAnimationFrame(() => { route.style.strokeDashoffset = '0'; });
      }
      journey.classList.add('journey-animated');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  journeyObserver.observe(journey);
}

// Stagger categorized skills so the reference-style lists build in naturally.
document.querySelectorAll('.skill-group').forEach((group, groupIndex) => {
  group.style.setProperty('--group-index', groupIndex);
  group.querySelectorAll('.skill-item').forEach((item, itemIndex) => {
    item.style.setProperty('--item-index', itemIndex);
  });
});

document.querySelectorAll('.stats .stat').forEach((stat, index) => {
  stat.style.setProperty('--stat-index', index);
});

// Count only the genuinely numeric summary values; symbolic/text values stay untouched.
function animateNumber(element) {
  const original = element.textContent.trim();
  const match = original.match(/^(\d+)(.*)$/);
  if (!match || reduceMotion) return;

  const digits = match[1];
  const target = Number(digits);
  const suffix = match[2];
  const preserveLeadingZero = digits.length > 1 && digits.startsWith('0');
  const duration = 550;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    const shown = preserveLeadingZero ? String(value).padStart(digits.length, '0') : String(value);
    element.textContent = `${shown}${suffix}`;
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

const statsBlock = document.querySelector('.stats');
if (statsBlock) {
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.stat strong').forEach(animateNumber);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.45 });
  statsObserver.observe(statsBlock);
}

const contactModal = document.getElementById('contactModal');
const contactTriggers = [...document.querySelectorAll('[data-contact-trigger]')];
const contactClosers = [...document.querySelectorAll('[data-contact-close]')];

function openContactModal(event) {
  event?.preventDefault();
  if (!contactModal) return;
  contactModal.classList.add('open');
  contactModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  contactModal.querySelector('.contact-modal-close')?.focus();
}

function closeContactModal() {
  if (!contactModal) return;
  contactModal.classList.remove('open');
  contactModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

contactTriggers.forEach(trigger => trigger.addEventListener('click', openContactModal));
contactClosers.forEach(closer => closer.addEventListener('click', closeContactModal));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && contactModal?.classList.contains('open')) closeContactModal();
});

document.addEventListener('click', (event) => {
  if (!nav?.classList.contains('open') || !menuButton) return;
  if (topbar && !topbar.contains(event.target)) {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 820 && nav?.classList.contains('open')) {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

// =========================================================
// V2.2 — MAX MOTION / CINEMATIC INTERACTION LAYER
// =========================================================

// Cinematic opening sequence. Starts immediately so external font/network timing cannot hold the page hostage.
const bootScreen = document.getElementById('bootScreen');
function finishBoot() {
  bootScreen?.classList.add('is-hidden');
  document.body.classList.remove('is-loading');
  document.body.classList.add('motion-ready');
}

if (reduceMotion) {
  finishBoot();
} else if (bootScreen) {
  requestAnimationFrame(() => bootScreen.classList.add('is-entering'));
  window.setTimeout(() => bootScreen.classList.add('is-staged'), 1280);
  window.setTimeout(() => bootScreen.classList.add('is-exiting'), 2300);
  window.setTimeout(finishBoot, 3000);
} else {
  finishBoot();
}

// Scroll progress + CSS scroll variable.
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(Math.max(window.scrollY / max, 0), 1);
  document.documentElement.style.setProperty('--scroll-p', progress.toFixed(4));
  if (scrollProgress) scrollProgress.style.transform = `scaleX(${progress})`;
}
updateScrollProgress();
window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress, { passive: true });

// Give sections varied reveal directions without cluttering HTML.
[...document.querySelectorAll('.section-heading')].forEach((el, i) => el.dataset.reveal = i % 2 ? 'right' : 'left');
[...document.querySelectorAll('.project-card')].forEach((el, i) => el.dataset.reveal = i % 2 ? 'right' : 'left');
document.querySelector('.quote-card')?.setAttribute('data-reveal', 'left');
document.querySelector('.experience-card')?.setAttribute('data-reveal', 'right');
document.querySelector('.certs')?.setAttribute('data-reveal', 'scale');
document.querySelector('.contact-card')?.setAttribute('data-reveal', 'scale');

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Native system cursor retained.

// Magnetic buttons + click ripple.
document.querySelectorAll('.btn').forEach(button => {
  if (finePointer && !reduceMotion) {
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate3d(${x * .08}px, ${y * .10 - 2}px, 0)`;
    });
    button.addEventListener('pointerleave', () => { button.style.transform = ''; });
  }
  button.addEventListener('pointerdown', (event) => {
    if (reduceMotion) return;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'click-ripple';
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    button.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  });
});

// Interactive 3D tilt + cursor spotlight on project cards.
document.querySelectorAll('.project-card').forEach(card => {
  if (!finePointer || reduceMotion) return;
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const ry = (px - .5) * 7;
    const rx = (.5 - py) * 6;
    card.classList.add('tilt-active');
    card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    card.style.transform = `perspective(950px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px)`;
  });
  card.addEventListener('pointerleave', () => {
    card.classList.remove('tilt-active');
    card.style.transform = '';
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '50%');
  });
});

// Journey image follows the pointer very slightly, creating depth without hurting labels.
const journeyVisual = document.querySelector('.journey-visual');
const journeyMountains = document.getElementById('journeyMountains');
if (journeyVisual && journeyMountains && finePointer && !reduceMotion) {
  journeyVisual.addEventListener('pointermove', (event) => {
    const rect = journeyVisual.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width - .5);
    const ny = ((event.clientY - rect.top) / rect.height - .5);
    journeyMountains.style.setProperty('--journey-x', `${(nx * 8).toFixed(2)}px`);
    journeyMountains.style.setProperty('--journey-y', `${(ny * 6).toFixed(2)}px`);
    journeyMountains.style.setProperty('--journey-rx', `${(-ny * 1.2).toFixed(2)}deg`);
    journeyMountains.style.setProperty('--journey-ry', `${(nx * 1.4).toFixed(2)}deg`);
  });
  journeyVisual.addEventListener('pointerleave', () => {
    ['--journey-x','--journey-y','--journey-rx','--journey-ry'].forEach(prop => journeyMountains.style.removeProperty(prop));
  });
}



// V2.9 — pause decorative continuous motion when sections are offscreen.
// This keeps the cinematic look while reducing repaint/CPU work on long pages.
if (!reduceMotion && 'IntersectionObserver' in window) {
  const motionTargets = [
    document.querySelector('.hero'),
    document.querySelector('.journey-visual'),
    document.querySelector('.stats'),
    document.querySelector('#projects'),
    document.querySelector('#skills'),
    document.querySelector('#experience'),
    document.querySelector('#certifications'),
    document.querySelector('.footer')
  ].filter(Boolean);

  const motionActivityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('motion-active', entry.isIntersecting);
    });
  }, { rootMargin: '18% 0px 18% 0px', threshold: 0 });

  motionTargets.forEach((target) => motionActivityObserver.observe(target));
}

// Pause CSS animations as well as the canvas when the tab is not visible.
function updateDocumentMotionState() {
  document.body.classList.toggle('motion-paused', document.hidden);
}
updateDocumentMotionState();
document.addEventListener('visibilitychange', updateDocumentMotionState);

// Animated constellation network: lightweight, responsive and pauses in background tabs.
const canvas = document.getElementById('constellation');
if (canvas && !reduceMotion) {
  const ctx = canvas.getContext('2d', { alpha: true });
  let width = 0, height = 0, dpr = 1, points = [], constellationRAF = 0, lastConstellationFrame = 0;
  const compactMotion = window.matchMedia('(max-width: 700px), (pointer: coarse)').matches;
  let pointer = { x: -9999, y: -9999 };

  function setupConstellation() {
    dpr = Math.min(window.devicePixelRatio || 1, compactMotion ? 1.2 : 1.6);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = compactMotion
      ? Math.max(16, Math.min(30, Math.floor((width * height) / 52000)))
      : Math.max(24, Math.min(58, Math.floor((width * height) / 30000)));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .13,
      vy: (Math.random() - .5) * .13,
      r: Math.random() * 1.35 + .45,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function drawConstellation(time = 0) {
    if (compactMotion && time - lastConstellationFrame < 33) {
      constellationRAF = requestAnimationFrame(drawConstellation);
      return;
    }
    lastConstellationFrame = time;
    ctx.clearRect(0, 0, width, height);
    for (const p of points) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      if (p.y > height + 20) p.y = -20;
      const pulse = .45 + Math.sin(time * .0012 + p.phase) * .25;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(130,190,255,${Math.max(.14,pulse)})`;
      ctx.fill();
    }

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i], b = points[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < (compactMotion ? 105 : 125)) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(91,135,220,${(1 - dist / (compactMotion ? 105 : 125)) * (compactMotion ? .08 : .12)})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
      if (finePointer) {
        const p = points[i];
        const dist = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        if (dist < 165) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(pointer.x, pointer.y);
          ctx.strokeStyle = `rgba(122,107,255,${(1 - dist / 165) * .22})`;
          ctx.lineWidth = .75;
          ctx.stroke();
        }
      }
    }
    constellationRAF = requestAnimationFrame(drawConstellation);
  }

  if (finePointer) {
    document.addEventListener('pointermove', event => { pointer.x = event.clientX; pointer.y = event.clientY; }, { passive: true });
    document.addEventListener('pointerleave', () => { pointer.x = pointer.y = -9999; });
  }

  setupConstellation();
  drawConstellation();
  window.addEventListener('resize', setupConstellation, { passive: true });
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(constellationRAF);
    if (!document.hidden) {
      lastConstellationFrame = 0;
      constellationRAF = requestAnimationFrame(drawConstellation);
    }
  });
}
