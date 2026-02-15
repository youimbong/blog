(function() {
  'use strict';

  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var noResults = document.getElementById('search-no-results');
  var searchData = null;

  if (!searchInput) return;

  // Determine base URL from a meta tag or script path
  var baseUrl = (function() {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src;
      var idx = src.indexOf('/assets/js/search.js');
      if (idx !== -1) return src.substring(0, idx);
    }
    return '';
  })();

  // Load search index
  function loadSearchData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', baseUrl + '/search.json', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          searchData = JSON.parse(xhr.responseText);
        } catch (e) {
          searchData = [];
        }
      }
    };
    xhr.send();
  }

  loadSearchData();

  var debounceTimer;
  searchInput.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
      performSearch(searchInput.value.trim());
    }, 200);
  });

  function performSearch(query) {
    if (!searchData || query.length < 1) {
      searchResults.innerHTML = '';
      noResults.style.display = 'none';
      return;
    }

    var queryLower = query.toLowerCase();
    var results = [];

    for (var i = 0; i < searchData.length; i++) {
      var item = searchData[i];
      var titleMatch = item.title.toLowerCase().indexOf(queryLower) !== -1;
      var contentMatch = item.content.toLowerCase().indexOf(queryLower) !== -1;
      var tagMatch = false;
      var catMatch = false;

      for (var t = 0; t < item.tags.length; t++) {
        if (item.tags[t].toLowerCase().indexOf(queryLower) !== -1) {
          tagMatch = true;
          break;
        }
      }

      for (var c = 0; c < item.categories.length; c++) {
        if (item.categories[c].toLowerCase().indexOf(queryLower) !== -1) {
          catMatch = true;
          break;
        }
      }

      if (titleMatch || contentMatch || tagMatch || catMatch) {
        var score = 0;
        if (titleMatch) score += 10;
        if (tagMatch) score += 5;
        if (catMatch) score += 3;
        if (contentMatch) score += 1;
        results.push({ item: item, score: score });
      }
    }

    results.sort(function(a, b) { return b.score - a.score; });

    if (results.length === 0) {
      searchResults.innerHTML = '';
      noResults.style.display = 'block';
      return;
    }

    noResults.style.display = 'none';
    var html = '';
    for (var r = 0; r < results.length; r++) {
      var result = results[r].item;
      html += '<article class="search-result-item">';
      html += '<a href="' + result.url + '">';
      html += '<h3 class="search-result-title">' + highlightMatch(result.title, query) + '</h3>';
      html += '<span class="search-result-date">' + result.date + '</span>';
      html += '<p class="search-result-excerpt">' + highlightMatch(result.content, query) + '</p>';
      html += '</a></article>';
    }

    searchResults.innerHTML = html;
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    var escaped = escapeHtml(text);
    var queryEscaped = escapeHtml(query);
    var regex = new RegExp('(' + queryEscaped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return escaped.replace(regex, '<mark>$1</mark>');
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();
