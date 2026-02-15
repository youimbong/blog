(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var postContent = document.querySelector('.post-content');
    var tocNav = document.getElementById('toc');
    var tocWrapper = document.getElementById('toc-wrapper');

    if (!postContent || !tocNav || !tocWrapper) return;

    var headings = postContent.querySelectorAll('h2, h3');
    var tocSidebar = tocWrapper.closest('.toc-sidebar');

    if (headings.length < 2) {
      tocWrapper.style.display = 'none';
      if (tocSidebar) {
        tocSidebar.style.display = 'none';
      }
      return;
    }

    // Build TOC
    var tocHTML = '<ul class="toc-list">';
    for (var i = 0; i < headings.length; i++) {
      var heading = headings[i];
      var id = heading.id || 'heading-' + i;
      heading.id = id;
      var level = heading.tagName === 'H3' ? 'toc-item-sub' : 'toc-item';
      tocHTML += '<li class="' + level + '">';
      tocHTML += '<a href="#' + id + '" class="toc-link" data-target="' + id + '">';
      tocHTML += heading.textContent;
      tocHTML += '</a></li>';
    }
    tocHTML += '</ul>';
    tocNav.innerHTML = tocHTML;

    // TOC toggle
    var tocToggle = document.querySelector('.toc-toggle');
    if (tocToggle) {
      tocToggle.addEventListener('click', function() {
        var expanded = tocToggle.getAttribute('aria-expanded') === 'true';
        tocToggle.setAttribute('aria-expanded', !expanded);
        tocNav.classList.toggle('is-collapsed');
      });
    }

    // Scroll spy with IntersectionObserver
    var tocLinks = tocNav.querySelectorAll('.toc-link');
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          tocLinks.forEach(function(link) {
            link.classList.remove('is-active');
          });
          var activeLink = tocNav.querySelector('[data-target="' + entry.target.id + '"]');
          if (activeLink) {
            activeLink.classList.add('is-active');
          }
        }
      });
    }, {
      rootMargin: '-80px 0px -70% 0px',
      threshold: 0
    });

    headings.forEach(function(heading) {
      observer.observe(heading);
    });

    // Smooth scroll for TOC links
    tocNav.addEventListener('click', function(e) {
      var link = e.target.closest('.toc-link');
      if (!link) return;
      e.preventDefault();
      var targetId = link.getAttribute('data-target');
      var target = document.getElementById(targetId);
      if (target) {
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();
