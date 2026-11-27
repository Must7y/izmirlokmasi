/* Hanifi Usta: a single cached script for reveal and two-photo slider. */
(function () {
  'use strict';

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) { target.classList.add('visible'); observer.unobserve(target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach((element) => { element.classList.add('will-reveal'); observer.observe(element); });
  }

  const menu = document.querySelector('.site-menu');
  if (menu) {
    document.addEventListener('click', (event) => { if (!menu.contains(event.target)) menu.open = false; });
    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
    });
  }

  const footer = document.querySelector('footer');
  const floating = document.querySelector('.floating-wa');
  if (footer && floating && 'IntersectionObserver' in window) {
    const footerObserver = new IntersectionObserver((entries) => {
      floating.hidden = entries.some((entry) => entry.isIntersecting);
    });
    footerObserver.observe(footer);
  }

  const track = document.getElementById('lokma-track');
  const previous = document.querySelector('.lokma-prev');
  const next = document.querySelector('.lokma-next');
  if (!track || !previous || !next) return;
  const slideCount = track.querySelectorAll('.tasting-card').length;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileView = () => window.matchMedia('(max-width: 680px)').matches;
  const activeIndex = () => Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
  const refresh = () => { const index = activeIndex(); previous.disabled = mobileView() || index <= 0; next.disabled = mobileView() || index >= slideCount - 1; };
  const goTo = (index) => !mobileView() && track.scrollTo({ left: Math.max(0, Math.min(slideCount - 1, index)) * track.clientWidth, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  previous.addEventListener('click', () => goTo(activeIndex() - 1));
  next.addEventListener('click', () => goTo(activeIndex() + 1));
  track.addEventListener('scroll', refresh, { passive: true });
  track.addEventListener('keydown', (event) => {
    if (event.target !== track) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeIndex() + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  window.addEventListener('resize', refresh, { passive: true });
  refresh();
})();
