(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var images = document.querySelectorAll('.post-content img');
    if (!images.length) return;

    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    var content = document.createElement('div');
    content.className = 'lightbox-content';

    var image = document.createElement('img');
    image.className = 'lightbox-image';
    image.alt = '';

    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'lightbox-close';
    closeButton.setAttribute('aria-label', '이미지 닫기');
    closeButton.innerHTML = '&times;';

    content.appendChild(image);
    overlay.appendChild(content);
    overlay.appendChild(closeButton);
    document.body.appendChild(overlay);

    var previousOverflow = '';

    function openLightbox(src, alt) {
      image.src = src;
      image.alt = alt || '';
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      image.removeAttribute('src');
      document.body.style.overflow = previousOverflow;
    }

    images.forEach(function(img) {
      if (img.closest('a')) return;

      var width = img.naturalWidth || img.clientWidth;
      if (width && width <= 200) return;

      img.classList.add('lightbox-enabled');
      img.addEventListener('click', function() {
        openLightbox(img.currentSrc || img.src, img.alt);
      });
    });

    overlay.addEventListener('click', function(event) {
      if (event.target === overlay) {
        closeLightbox();
      }
    });

    closeButton.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  });
})();
