(() => {
  'use strict';

  const sections = Array.from(document.querySelectorAll('.unit-section'));
  const navList = document.getElementById('navList');
  const topbarUnit = document.getElementById('topbarUnit');

  /* ---- Build navigation rail items ---- */
  sections.forEach((sec, i) => {
    const num = String(i + 1).padStart(2, '0');
    const item = document.createElement('button');
    item.className = 'nav-item';
    item.setAttribute('aria-label', sec.dataset.unit);
    item.innerHTML = `
      <span class="indicator">${num}</span>
      <span class="nav-item-label">${sec.dataset.short || sec.dataset.unit}</span>
    `;
    item.addEventListener('click', () => {
      sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeDrawer();
    });
    navList.appendChild(item);
  });

  const navItems = navList.querySelectorAll('.nav-item');

  const observerNav = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = sections.indexOf(entry.target);
          navItems.forEach((d, i) => d.classList.toggle('active', i === idx));
          if (topbarUnit) topbarUnit.textContent = entry.target.dataset.short || entry.target.dataset.unit;
        }
      });
    },
    { threshold: 0.25, rootMargin: '-10% 0px -55% 0px' }
  );

  sections.forEach((s) => observerNav.observe(s));

  /* ---- Mobile drawer ---- */
  const navRail = document.getElementById('navRail');
  const scrim = document.getElementById('scrim');
  const menuToggle = document.getElementById('menuToggle');

  function openDrawer() {
    navRail.classList.add('open');
    scrim.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
  }
  function closeDrawer() {
    navRail.classList.remove('open');
    scrim.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navRail.classList.contains('open') ? closeDrawer() : openDrawer();
    });
  }
  if (scrim) scrim.addEventListener('click', closeDrawer);

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const observerReveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), (i % 6) * 70);
          observerReveal.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => observerReveal.observe(el));

  /* ---- Lightbox ---- */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCaption = document.getElementById('lightboxCaption');
  const lbClose = lightbox.querySelector('.lightbox-close');
  let lastFocusedCard = null;

  function openLightboxFromCard(card) {
    const img = card.querySelector('img');
    const note = card.querySelector('.card-note');
    if (!img) return;
    lastFocusedCard = card;
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = note ? note.textContent : '';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  document.querySelectorAll('.bento-card').forEach((card) => {
    card.setAttribute('aria-label', 'View larger image: ' + (card.querySelector('.card-note')?.textContent || 'artifact'));
    card.addEventListener('click', () => openLightboxFromCard(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightboxFromCard(card);
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedCard) {
      lastFocusedCard.focus();
      lastFocusedCard = null;
    }
  }

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeDrawer();
    }
    // Simple focus trap while the lightbox is open
    if (e.key === 'Tab' && lightbox.classList.contains('active')) {
      e.preventDefault();
      lbClose.focus();
    }
  });

  /* ---- Footer year ---- */
  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  /* ---- Back-to-top FAB ---- */
  const fab = document.getElementById('topFab');
  window.addEventListener('scroll', () => {
    fab.classList.toggle('visible', window.scrollY > 560);
  }, { passive: true });
  fab.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
