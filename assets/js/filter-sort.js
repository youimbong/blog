(function() {
  'use strict';

  function initFilterRoot(root) {
    var categorySelect = root.querySelector('[data-filter="category"]');
    var tagSelect = root.querySelector('[data-filter="tag"]');
    var sortSelect = root.querySelector('[data-filter="sort"]');
    var list = root.querySelector('[data-post-list]');
    var emptyState = root.querySelector('[data-filter-empty]');

    if (!list) return;

    var items = Array.prototype.slice.call(list.querySelectorAll('[data-post-item]'));
    if (items.length === 0) return;

    var initialOrder = items.slice();

    function normalize(value) {
      return (value || '').toLowerCase().trim();
    }

    function getParams() {
      var params = new URLSearchParams(window.location.search);
      return {
        category: normalize(params.get('category')),
        tag: normalize(params.get('tag')),
        sort: normalize(params.get('sort')) || 'latest'
      };
    }

    function setParams(state) {
      var params = new URLSearchParams(window.location.search);
      ['category', 'tag', 'sort'].forEach(function(key) {
        if (state[key]) {
          params.set(key, state[key]);
        } else {
          params.delete(key);
        }
      });

      var next = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
      window.history.replaceState({}, '', next);
    }

    function applyState(state) {
      if (categorySelect) categorySelect.value = state.category;
      if (tagSelect) tagSelect.value = state.tag;
      if (sortSelect) sortSelect.value = state.sort;
    }

    function matches(item, category, tag) {
      var itemCategory = normalize(item.getAttribute('data-category'));
      var itemTags = normalize(item.getAttribute('data-tags')).split(',');
      var categoryMatch = !category || itemCategory === category;
      var tagMatch = !tag || itemTags.indexOf(tag) !== -1;
      return categoryMatch && tagMatch;
    }

    function sortItems(itemsToSort, sortType) {
      if (sortType === 'reading') {
        itemsToSort.sort(function(a, b) {
          var aRead = parseInt(a.getAttribute('data-reading') || '0', 10);
          var bRead = parseInt(b.getAttribute('data-reading') || '0', 10);
          if (aRead !== bRead) return aRead - bRead;
          var aDate = parseInt(a.getAttribute('data-date') || '0', 10);
          var bDate = parseInt(b.getAttribute('data-date') || '0', 10);
          return bDate - aDate;
        });
        return;
      }

      if (sortType === 'latest') {
        itemsToSort.sort(function(a, b) {
          var aDate = parseInt(a.getAttribute('data-date') || '0', 10);
          var bDate = parseInt(b.getAttribute('data-date') || '0', 10);
          return bDate - aDate;
        });
        return;
      }

      initialOrder.forEach(function(item) {
        list.appendChild(item);
      });
    }

    function render(updateUrl) {
      var state = {
        category: normalize(categorySelect && categorySelect.value),
        tag: normalize(tagSelect && tagSelect.value),
        sort: normalize(sortSelect && sortSelect.value) || 'latest'
      };

      var visibleItems = items.filter(function(item) {
        return matches(item, state.category, state.tag);
      });

      items.forEach(function(item) {
        item.hidden = visibleItems.indexOf(item) === -1;
      });

      sortItems(visibleItems, state.sort);
      visibleItems.forEach(function(item) {
        list.appendChild(item);
      });

      if (emptyState) {
        emptyState.hidden = visibleItems.length > 0;
        if (!emptyState.hidden && root.getAttribute('data-empty-message')) {
          emptyState.textContent = root.getAttribute('data-empty-message');
        }
      }

      if (updateUrl) setParams(state);
    }

    var initial = getParams();
    applyState(initial);
    render(false);

    [categorySelect, tagSelect, sortSelect].forEach(function(select) {
      if (!select) return;
      select.addEventListener('change', function() {
        render(true);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    var roots = document.querySelectorAll('.js-post-filter');
    Array.prototype.forEach.call(roots, initFilterRoot);
  });
})();
