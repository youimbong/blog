(function() {
  'use strict';

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    var copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (e) {
      copied = false;
    }

    document.body.removeChild(textarea);
    return copied;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function(resolve, reject) {
      if (fallbackCopy(text)) {
        resolve();
      } else {
        reject(new Error('copy_failed'));
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    var codeBlocks = document.querySelectorAll('.highlight > pre');
    if (!codeBlocks.length) return;

    codeBlocks.forEach(function(pre) {
      var wrapper = pre.parentElement;
      if (!wrapper || wrapper.querySelector('.code-copy-button')) return;

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-copy-button';
      button.textContent = '복사';
      button.setAttribute('aria-label', '코드 복사');

      button.addEventListener('click', function() {
        var source = pre.innerText || pre.textContent || '';

        copyText(source).then(function() {
          button.textContent = '복사됨!';
          button.classList.add('is-copied');
          window.setTimeout(function() {
            button.textContent = '복사';
            button.classList.remove('is-copied');
          }, 1500);
        }).catch(function() {
          button.textContent = '실패';
          window.setTimeout(function() {
            button.textContent = '복사';
          }, 1500);
        });
      });

      wrapper.appendChild(button);
    });
  });
})();
