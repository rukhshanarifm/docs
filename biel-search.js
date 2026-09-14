/*
 * Biel.ai widgets for the Network Manager docs (Mintlify).
 *
 * Mintlify runs every .js file in the content directory on every page, after the
 * page becomes interactive. Raw <script> tags in MDX are not executed, and the
 * `head` / `scripts` keys from Biel's install guide belong to the deprecated
 * mint.json schema — this site uses docs.json, where neither key exists. This
 * file is the docs.json-era equivalent: it does exactly what that guide's
 * `scripts[].content` block did.
 *
 * Two widgets are mounted, and they are different elements:
 *   <biel-search-button>  AI search input   (renders inline, with a CTRL+K hint)
 *   <biel-button>         floating Ask AI   (bottom-right corner)
 *
 * An undefined custom element renders as nothing, with no console error — so if
 * a widget does not appear, check the element name here first.
 *
 * Project: hw3qdg3foe (Biel.ai dashboard)
 */
(function () {
  var CSS = 'https://cdn.jsdelivr.net/npm/biel-search/dist/biel-search/biel-search.css';
  var ESM = 'https://cdn.jsdelivr.net/npm/biel-search/dist/biel-search/biel-search.esm.js';
  var PROJECT = 'hw3qdg3foe';

  function mount(tag, attrs, label) {
    if (document.querySelector(tag)) return;
    var el = document.createElement(tag);
    Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    el.textContent = label;
    document.body.appendChild(el);
  }

  function load() {
    // Stylesheet and module script, guarded so client-side navigation between
    // pages cannot add either one twice.
    if (!document.querySelector('link[data-biel]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CSS;
      link.setAttribute('data-biel', '');
      document.head.appendChild(link);
    }

    if (!document.querySelector('script[data-biel]')) {
      var script = document.createElement('script');
      script.type = 'module';   // the widget ships as an ES module
      script.src = ESM;
      script.setAttribute('data-biel', '');
      document.head.appendChild(script);
    }

    // AI search input.
    mount('biel-search-button', {
      'project': PROJECT,
      'header-title': 'Biel.ai Search',
      'button-position': 'bottom-right',
      'modal-position': 'top-center',
      'button-style': 'rounded'
    }, 'Search...');

    // Floating Ask AI chat button.
    mount('biel-button', {
      'project': PROJECT,
      'header-title': 'Biel.ai chatbot',
      'button-position': 'bottom-right',
      'modal-position': 'bottom-right',
      'button-style': 'dark'
    }, 'Ask AI');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
