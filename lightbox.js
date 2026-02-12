// main.js — Lightbox + Homework checkboxes for AI Safari Ferrel
(function () {
  'use strict';

  // ── Lightbox ──────────────────────────────────────────────────

  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('hidden', '');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Image viewer');

  var closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox__close';
  closeBtn.setAttribute('aria-label', 'Close image viewer');
  closeBtn.innerHTML = '&times;';

  var img = document.createElement('img');
  img.className = 'lightbox__img';
  img.alt = '';

  overlay.appendChild(closeBtn);
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  function openLightbox(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.removeAttribute('hidden');
    overlay.offsetHeight;
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    setTimeout(function () {
      overlay.setAttribute('hidden', '');
      img.src = '';
    }, 250);
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.lightbox-trigger img');
    if (trigger) {
      e.preventDefault();
      openLightbox(trigger.src, trigger.alt);
    }
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  closeBtn.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-visible')) {
      closeLightbox();
    }
  });

  // ── Homework Checkboxes (localStorage) ────────────────────────

  var storageKey = 'homework:' + window.location.pathname;
  var checkboxes = document.querySelectorAll('.homework-list__checkbox');

  if (checkboxes.length) {
    var saved = [];
    try {
      saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch (e) {
      saved = [];
    }

    checkboxes.forEach(function (cb, i) {
      if (saved[i]) {
        cb.checked = true;
        cb.closest('li').classList.add('is-checked');
      }

      cb.addEventListener('change', function () {
        cb.closest('li').classList.toggle('is-checked', cb.checked);
        saveHomework();
      });
    });

    function saveHomework() {
      var state = [];
      checkboxes.forEach(function (cb) {
        state.push(cb.checked);
      });
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch (e) {
        // storage full or unavailable — fail silently
      }
    }
  }
})();
