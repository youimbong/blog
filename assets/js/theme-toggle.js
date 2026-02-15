(function() {
  'use strict';

  var THEME_KEY = 'theme';
  var DARK = 'dark';
  var LIGHT = 'light';

  function getPreferredTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    syncGiscusTheme(theme);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || LIGHT;
    setTheme(current === DARK ? LIGHT : DARK);
  }

  function syncGiscusTheme(theme) {
    var iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    var giscusTheme = theme === DARK ? 'dark' : 'light';
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: giscusTheme } } },
      'https://giscus.app'
    );
  }

  // Theme toggle button
  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', toggleTheme);
    }

    // Mobile nav toggle
    var navToggle = document.querySelector('.nav-toggle');
    var navList = document.querySelector('.nav-list');
    if (navToggle && navList) {
      navToggle.addEventListener('click', function() {
        var expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        navList.classList.toggle('is-open');
      });
    }
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? DARK : LIGHT);
    }
  });
})();
