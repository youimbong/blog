(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var bar = document.getElementById('reading-progress-bar');
    var content = document.querySelector('.post-content');

    if (!bar || !content) return;

    var ticking = false;

    function updateProgress() {
      var rootStyle = getComputedStyle(document.documentElement);
      var headerHeight = parseInt(rootStyle.getPropertyValue('--header-height'), 10) || 0;
      var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      var contentTop = content.getBoundingClientRect().top + scrollY - headerHeight;
      var contentBottom = contentTop + content.offsetHeight;
      var start = contentTop;
      var end = Math.max(start + 1, contentBottom - window.innerHeight + headerHeight);
      var progress = ((scrollY - start) / (end - start)) * 100;
      var clamped = Math.min(100, Math.max(0, progress));

      bar.style.width = clamped + '%';
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateProgress);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  });
})();
