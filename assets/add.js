(function () {
  const drawer = document.getElementById('mrst-drawer');
  const toggles = document.querySelectorAll('[data-mrst-toggle]');
  if (!drawer || !toggles.length) return;

  const overlay = drawer.querySelector('.mrst-drawer__overlay');
  const closeButtons = drawer.querySelectorAll('[data-mrst-close]');
  const panel = drawer.querySelector('.mrst-drawer__panel');

  function open() {
    drawer.setAttribute('aria-hidden', 'false');
    toggles.forEach(b => { b.classList.add('is-open'); b.setAttribute('aria-expanded', 'true'); });
    panel && panel.focus({ preventScroll: true });
    document.documentElement.style.overflow = 'hidden';
  }

  function close() {
    drawer.setAttribute('aria-hidden', 'true');
    toggles.forEach(b => { b.classList.remove('is-open'); b.setAttribute('aria-expanded', 'false'); });
    document.documentElement.style.overflow = '';
  }

  toggles.forEach(btn => btn.addEventListener('click', () => {
    const isOpen = drawer.getAttribute('aria-hidden') === 'false';
    isOpen ? close() : open();
  }));

  overlay && overlay.addEventListener('click', close);
  closeButtons.forEach(btn => btn.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();
