/** ===== MRST Header Drawer ===== */
(function () {
  var root = document;
  var drawer = root.getElementById('mrst-drawer');
  var toggleBtn = root.getElementById('mrst-hamburger');
  if (!drawer || !toggleBtn) return;

  var panel = drawer.querySelector('.mrst-drawer__panel');
  var overlayCloseEls = drawer.querySelectorAll('[data-mrst-close]');
  var previouslyFocused = null;

  function openDrawer() {
    if (drawer.getAttribute('aria-hidden') === 'false') return;
    previouslyFocused = document.activeElement;
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    // focus panel for accessibility
    setTimeout(function(){ panel && panel.focus(); }, 10);
    trapFocus(true);
  }

  function closeDrawer() {
    if (drawer.getAttribute('aria-hidden') === 'true') return;
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    trapFocus(false);
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
      previouslyFocused.focus();
    } else {
      toggleBtn.focus();
    }
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDrawer();
    }
  }

  function trapFocus(enable) {
    if (enable) {
      document.addEventListener('keydown', onKeydown);
      document.addEventListener('focus', enforceFocus, true);
    } else {
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('focus', enforceFocus, true);
    }
  }

  function enforceFocus(e) {
    if (drawer.getAttribute('aria-hidden') === 'true') return;
    if (!drawer.contains(e.target)) {
      e.stopPropagation();
      panel && panel.focus();
    }
  }

  // Open/Close events
  toggleBtn.addEventListener('click', function () {
    var hidden = drawer.getAttribute('aria-hidden') !== 'false';
    if (hidden) openDrawer(); else closeDrawer();
  });
  overlayCloseEls.forEach(function (el) {
    el.addEventListener('click', closeDrawer);
  });

  // Close on link click (navigate)
  drawer.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (a && drawer.contains(a)) {
      closeDrawer();
    }
  });

  // Initialize hidden state
  if (!drawer.hasAttribute('aria-hidden')) {
    drawer.setAttribute('aria-hidden', 'true');
  }
})();
