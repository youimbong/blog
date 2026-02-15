(function() {
  'use strict';

  var RECENT_KEY = 'blog_recent_searches_v1';
  var RECENT_LIMIT = 6;

  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var noResults = document.getElementById('search-no-results');
  var recentWrap = document.getElementById('search-recent');
  var recentList = document.getElementById('search-recent-list');
  var recentClearBtn = document.getElementById('search-recent-clear');

  if (!searchInput || !searchResults) return;

  var searchData = [];
  var activeIndex = -1;
  var currentResults = [];

  function getBaseUrl() {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src || '';
      var idx = src.indexOf('/assets/js/search.js');
      if (idx !== -1) return src.substring(0, idx);
    }
    return '';
  }

  function loadSearchData() {
    return fetch(getBaseUrl() + '/search.json')
      .then(function(res) { return res.ok ? res.json() : []; })
      .then(function(data) {
        searchData = Array.isArray(data) ? data : [];
      })
      .catch(function() {
        searchData = [];
      });
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text || ''));
    return div.innerHTML;
  }

  function regexEscape(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlight(text, query) {
    var safe = escapeHtml(text || '');
    if (!query) return safe;
    var tokens = query
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
      .map(regexEscape);
    if (!tokens.length) return safe;
    var pattern = new RegExp('(' + tokens.join('|') + ')', 'gi');
    return safe.replace(pattern, '<mark>$1</mark>');
  }

  function toLowerArray(arr) {
    return (arr || []).map(function(v) { return String(v).toLowerCase(); });
  }

  function scoreItem(item, query) {
    var q = query.toLowerCase();
    var title = (item.title || '').toLowerCase();
    var content = (item.content || '').toLowerCase();
    var tags = toLowerArray(item.tags);
    var categories = toLowerArray(item.categories);

    var score = 0;
    if (title.indexOf(q) !== -1) score += 12;
    if (title.indexOf(q) === 0) score += 4;

    for (var i = 0; i < tags.length; i++) {
      if (tags[i].indexOf(q) !== -1) score += 6;
    }

    for (var c = 0; c < categories.length; c++) {
      if (categories[c].indexOf(q) !== -1) score += 4;
    }

    if (content.indexOf(q) !== -1) score += 2;

    return score;
  }

  function clipExcerpt(text, query) {
    var src = text || '';
    var lower = src.toLowerCase();
    var q = query.toLowerCase();
    var idx = lower.indexOf(q);
    if (idx === -1) return src.slice(0, 180);
    var start = Math.max(0, idx - 60);
    var end = Math.min(src.length, idx + q.length + 100);
    return (start > 0 ? '... ' : '') + src.slice(start, end) + (end < src.length ? ' ...' : '');
  }

  function getRecentSearches() {
    try {
      var raw = localStorage.getItem(RECENT_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveRecentSearch(query) {
    if (!query) return;
    var items = getRecentSearches().filter(function(v) { return v !== query; });
    items.unshift(query);
    if (items.length > RECENT_LIMIT) items = items.slice(0, RECENT_LIMIT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(items));
    renderRecentSearches();
  }

  function clearRecentSearches() {
    localStorage.removeItem(RECENT_KEY);
    renderRecentSearches();
  }

  function renderRecentSearches() {
    if (!recentWrap || !recentList) return;
    var items = getRecentSearches();
    if (!items.length) {
      recentWrap.hidden = true;
      recentList.innerHTML = '';
      return;
    }

    recentWrap.hidden = false;
    recentList.innerHTML = items.map(function(item) {
      return '<button type="button" class="recent-chip" data-recent="' + escapeHtml(item) + '">' + escapeHtml(item) + '</button>';
    }).join('');
  }

  function renderResults(results, query) {
    currentResults = results;
    activeIndex = -1;

    if (!results.length) {
      searchResults.innerHTML = '';
      if (noResults) noResults.style.display = 'block';
      return;
    }

    if (noResults) noResults.style.display = 'none';
    searchResults.innerHTML = results.map(function(row, index) {
      var item = row.item;
      return [
        '<article class="search-result-item" data-result-index="' + index + '">',
          '<a href="' + item.url + '">',
            '<h3 class="search-result-title">' + highlight(item.title, query) + '</h3>',
            '<span class="search-result-date">' + escapeHtml(item.date) + '</span>',
            '<p class="search-result-excerpt">' + highlight(clipExcerpt(item.content, query), query) + '</p>',
          '</a>',
        '</article>'
      ].join('');
    }).join('');
  }

  function setActive(index) {
    var nodes = searchResults.querySelectorAll('.search-result-item');
    if (!nodes.length) return;
    if (index < 0) index = nodes.length - 1;
    if (index >= nodes.length) index = 0;
    activeIndex = index;

    for (var i = 0; i < nodes.length; i++) {
      nodes[i].classList.toggle('is-active', i === activeIndex);
    }

    nodes[activeIndex].scrollIntoView({ block: 'nearest' });
  }

  function runSearch(query) {
    var q = (query || '').trim();
    if (!q) {
      searchResults.innerHTML = '';
      if (noResults) noResults.style.display = 'none';
      currentResults = [];
      activeIndex = -1;
      return;
    }

    var rows = [];
    for (var i = 0; i < searchData.length; i++) {
      var score = scoreItem(searchData[i], q);
      if (score > 0) rows.push({ item: searchData[i], score: score });
    }

    rows.sort(function(a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return (b.item.timestamp || 0) - (a.item.timestamp || 0);
    });

    renderResults(rows, q);
  }

  var debounceTimer;
  searchInput.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
      runSearch(searchInput.value);
    }, 180);
  });

  searchInput.addEventListener('keydown', function(e) {
    if (!currentResults.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(activeIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(activeIndex - 1);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        e.preventDefault();
        var target = searchResults.querySelector('[data-result-index="' + activeIndex + '"] a');
        if (target) window.location.href = target.getAttribute('href');
      } else {
        saveRecentSearch(searchInput.value.trim());
      }
    }
  });

  searchInput.addEventListener('blur', function() {
    var q = searchInput.value.trim();
    if (q) saveRecentSearch(q);
  });

  if (recentClearBtn) {
    recentClearBtn.addEventListener('click', clearRecentSearches);
  }

  if (recentList) {
    recentList.addEventListener('click', function(e) {
      var target = e.target;
      if (!target || !target.matches('[data-recent]')) return;
      var q = target.getAttribute('data-recent') || '';
      searchInput.value = q;
      runSearch(q);
      searchInput.focus();
    });
  }

  loadSearchData().then(function() {
    renderRecentSearches();
  });
})();
