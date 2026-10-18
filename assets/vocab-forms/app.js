/* ============================================================
   初中英语资料站 · 词形变化页面 DOM 渲染与交互
   依赖（按顺序先于本文件加载）：
     window.VOCAB_FORMS  —— data.js
     window.VOCAB_LOGIC  —— logic.js
   ============================================================ */
(function () {
  'use strict';

  var L = window.VOCAB_LOGIC;
  var DATA = window.VOCAB_FORMS;
  var doc = document;

  var state = {
    query: '',
    unit: 'all',
    pos: '',
    hideExtra: false,
    quiz: false
  };

  var els = {};
  var entries = [];
  var units = [];
  var total = 0;
  var byId = Object.create(null);
  var currentTargetId = null;
  var searchTimer = 0;
  var toastTimer = 0;
  var toastHideTimer = 0;

  /* ---------------- 小工具 ---------------- */

  function $(id) {
    return doc.getElementById(id);
  }

  function on(el, type, handler, options) {
    if (el) el.addEventListener(type, handler, options || false);
  }

  function setText(el, text) {
    if (el) el.textContent = text == null ? '' : String(text);
  }

  function each(list, fn) {
    Array.prototype.forEach.call(list, fn);
  }

  function appendNumber(parent, value) {
    var b = doc.createElement('b');
    b.textContent = String(value);
    parent.appendChild(b);
  }

  function absoluteUrl(href) {
    try {
      return new URL(href, window.location.href).href;
    } catch (err) {
      return href;
    }
  }

  /* ---------------- 轻提示 ---------------- */

  function showToast(message) {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.hidden = false;
    window.clearTimeout(toastTimer);
    window.clearTimeout(toastHideTimer);
    window.requestAnimationFrame(function () {
      if (els.toast) els.toast.classList.add('is-visible');
    });
    toastTimer = window.setTimeout(function () {
      if (!els.toast) return;
      els.toast.classList.remove('is-visible');
      toastHideTimer = window.setTimeout(function () {
        if (els.toast) els.toast.hidden = true;
      }, 220);
    }, 2400);
  }

  /* ---------------- 复制到剪贴板 ---------------- */

  function legacyCopy(text, done) {
    var ok = false;
    try {
      var area = doc.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.top = '-1000px';
      area.style.opacity = '0';
      doc.body.appendChild(area);
      area.select();
      ok = doc.execCommand ? doc.execCommand('copy') : false;
      doc.body.removeChild(area);
    } catch (err) {
      ok = false;
    }
    done(ok);
  }

  function copyText(text, done) {
    if (window.navigator && window.navigator.clipboard && window.navigator.clipboard.writeText) {
      window.navigator.clipboard.writeText(text).then(
        function () { done(true); },
        function () { legacyCopy(text, done); }
      );
    } else {
      legacyCopy(text, done);
    }
  }

  /* ---------------- 元信息 ---------------- */

  function derivePosOptions() {
    var seen = Object.create(null);
    var result = [];
    entries.forEach(function (entry) {
      var cats = L.parsePosCats(entry);
      cats.forEach(function (cat) {
        if (cat && !seen[cat]) {
          seen[cat] = true;
          result.push(cat);
        }
      });
    });
    return result;
  }

  function renderMeta() {
    var stats = L.computeStats(entries);
    setText(els.statUnits, units.length || '—');
    setText(els.statWords, total);
    setText(els.statCore, stats.core);
    setText(els.statExtra, stats.extra);
    var updated = DATA.generatedAt || '—';
    setText(els.statUpdated, updated);
    setText(els.footerUpdated, updated);
    setText(els.printUpdated, updated);
    setText(els.footTotal, total);
  }

  /* ---------------- 控件渲染 ---------------- */

  function makeUnitButton(value, label, count) {
    var btn = doc.createElement('button');
    btn.type = 'button';
    btn.className = 'unit-btn';
    btn.setAttribute('data-unit', value);
    btn.setAttribute('aria-pressed', String(value === state.unit));
    btn.appendChild(doc.createTextNode(label));
    if (typeof count === 'number' && isFinite(count)) {
      var small = doc.createElement('small');
      small.textContent = count + ' 词';
      btn.appendChild(small);
    }
    return btn;
  }

  function renderUnitButtons() {
    if (!els.unitButtons) return;
    var frag = doc.createDocumentFragment();
    frag.appendChild(makeUnitButton('all', '全部', total));
    units.forEach(function (unit) {
      frag.appendChild(makeUnitButton(
        String(unit.no),
        unit.label || ('Unit ' + unit.no),
        typeof unit.count === 'number' ? unit.count : undefined
      ));
    });
    els.unitButtons.textContent = '';
    els.unitButtons.appendChild(frag);
  }

  function updateUnitButtons() {
    if (!els.unitButtons) return;
    each(els.unitButtons.querySelectorAll('.unit-btn'), function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-unit') === state.unit));
    });
  }

  function renderPosOptions() {
    if (!els.posSelect) return;
    var options = Array.isArray(DATA.posOptions) && DATA.posOptions.length
      ? DATA.posOptions.slice()
      : derivePosOptions();
    var frag = doc.createDocumentFragment();
    var all = doc.createElement('option');
    all.value = '';
    all.textContent = '全部词性';
    frag.appendChild(all);
    options.forEach(function (pos) {
      var opt = doc.createElement('option');
      opt.value = pos;
      opt.textContent = pos;
      frag.appendChild(opt);
    });
    els.posSelect.textContent = '';
    els.posSelect.appendChild(frag);
  }

  /* ---------------- 表格渲染 ---------------- */

  function makeUnitRow(group) {
    var tr = doc.createElement('tr');
    tr.className = 'unit-row';
    var th = doc.createElement('th');
    th.setAttribute('colspan', '3');
    th.setAttribute('scope', 'colgroup');
    th.appendChild(doc.createTextNode(group.label));
    var count = doc.createElement('span');
    count.className = 'unit-count';
    count.textContent = group.shown === group.total
      ? group.total + ' 词'
      : '显示 ' + group.shown + ' / ' + group.total + ' 词';
    th.appendChild(count);
    tr.appendChild(th);
    return tr;
  }

  function makeEntryRow(entry) {
    var id = String(entry.id);
    var wordText = entry.word || '';

    var tr = doc.createElement('tr');
    tr.className = 'word-row';
    tr.id = 'word-' + id;
    tr.setAttribute('data-word', wordText);

    /* 单词列 */
    var tdWord = doc.createElement('td');
    tdWord.className = 'word-cell';
    tdWord.setAttribute('data-label', '单词');
    var wordSpan = doc.createElement('span');
    wordSpan.className = 'word';
    var link = doc.createElement('a');
    link.className = 'word-link';
    link.href = '#word-' + encodeURIComponent(id);
    link.title = '复制「' + wordText + '」的链接';
    if (state.query) {
      link.innerHTML = L.highlightText(wordText, state.query);
    } else {
      link.textContent = wordText;
    }
    wordSpan.appendChild(link);
    tdWord.appendChild(wordSpan);
    var posInline = doc.createElement('span');
    posInline.className = 'pos';
    posInline.textContent = entry.pos || '';
    tdWord.appendChild(posInline);

    /* 词性列 */
    var tdPos = doc.createElement('td');
    tdPos.className = 'pos-cell';
    tdPos.setAttribute('data-label', '词性');
    tdPos.textContent = entry.pos || '—';

    /* 词形变化列（html 由数据提供，只做文本节点高亮） */
    var tdForms = doc.createElement('td');
    tdForms.className = 'forms-cell';
    tdForms.setAttribute('data-label', '词形变化');
    tdForms.innerHTML = L.highlightHtml(entry.html || '', state.query);

    tr.appendChild(tdWord);
    tr.appendChild(tdPos);
    tr.appendChild(tdForms);
    return tr;
  }

  function renderTable(list) {
    if (!els.tbody) return;
    var groups = L.groupByUnit(list, units);
    var frag = doc.createDocumentFragment();
    groups.forEach(function (group) {
      frag.appendChild(makeUnitRow(group));
      group.entries.forEach(function (entry) {
        frag.appendChild(makeEntryRow(entry));
      });
    });
    els.tbody.textContent = '';
    els.tbody.appendChild(frag);

    var isEmpty = list.length === 0;
    if (els.tablePanel) els.tablePanel.hidden = isEmpty;
    if (els.emptyState) els.emptyState.hidden = !isEmpty;
  }

  function updateResultCount(shown) {
    if (!els.resultCount) return;
    var frag = doc.createDocumentFragment();
    frag.appendChild(doc.createTextNode('共 '));
    appendNumber(frag, total);
    frag.appendChild(doc.createTextNode(' 词 · 显示 '));
    appendNumber(frag, shown);
    frag.appendChild(doc.createTextNode(' 词'));
    els.resultCount.textContent = '';
    els.resultCount.appendChild(frag);
  }

  function updateClearButton() {
    if (!els.clearBtn) return;
    var hasFilters = Boolean(state.query || state.pos || state.unit !== 'all');
    els.clearBtn.hidden = !hasFilters;
  }

  function setBodyFlags() {
    doc.body.classList.toggle('hide-extra', Boolean(state.hideExtra));
    doc.body.classList.toggle('quiz-mode', Boolean(state.quiz));
    if (!state.quiz && els.tbody) {
      each(els.tbody.querySelectorAll('.word-row.is-revealed'), function (row) {
        row.classList.remove('is-revealed');
      });
    }
  }

  /* ---------------- hash 定位 ---------------- */

  function syncTargetClass() {
    if (!els.tbody) return;
    each(els.tbody.querySelectorAll('.word-row.is-target'), function (row) {
      row.classList.remove('is-target');
    });
    if (!currentTargetId) return;
    var row = $('word-' + currentTargetId);
    if (row) row.classList.add('is-target');
  }

  function markTarget(entryId, options) {
    currentTargetId = entryId || null;
    syncTargetClass();
    if (!currentTargetId || !options || !options.scroll) return;
    var row = $('word-' + currentTargetId);
    if (row && row.scrollIntoView) {
      row.scrollIntoView({ block: 'center', inline: 'nearest' });
    }
  }

  function handleHash() {
    if (!L) return;
    var info = L.parseHash(window.location.hash);
    if (!info || !byId[info.id]) {
      markTarget(null);
      return;
    }
    var entry = byId[info.id];
    if (!L.isVisibleEntry(entry, state)) {
      // 被当前筛选条件藏住了：自动放宽筛选，保证定位成功
      state.query = '';
      state.unit = 'all';
      state.pos = '';
      if (els.searchInput) els.searchInput.value = '';
      if (els.posSelect) els.posSelect.value = '';
      updateUnitButtons();
      applyFilters({ scroll: false });
    }
    markTarget(entry.id, { scroll: true });
  }

  /* ---------------- 筛选与滚动 ---------------- */

  function scrollToResultsIfNeeded() {
    var area = els.tableArea;
    if (!area) return;
    var offset = els.toolbarWrap ? els.toolbarWrap.offsetHeight : 0;
    var top = area.getBoundingClientRect().top + window.pageYOffset - offset - 10;
    if (window.pageYOffset > top) {
      window.scrollTo(0, Math.max(0, top));
    }
  }

  function applyFilters(options) {
    options = options || {};
    var filtered = L.filterEntries(entries, state);
    renderTable(filtered);
    updateResultCount(filtered.length);
    updateClearButton();
    syncTargetClass();
    if (options.scroll) scrollToResultsIfNeeded();
  }

  function resetFilters() {
    state.query = '';
    state.unit = 'all';
    state.pos = '';
    if (els.searchInput) els.searchInput.value = '';
    if (els.posSelect) els.posSelect.value = '';
    updateUnitButtons();
    applyFilters({ scroll: false });
  }

  /* ---------------- 吸顶偏移 ---------------- */

  function updateStickyOffset() {
    var height = els.toolbarWrap ? els.toolbarWrap.offsetHeight : 0;
    doc.documentElement.style.setProperty('--toolbar-h', height + 'px');
  }

  function initStickyOffset() {
    updateStickyOffset();
    if (els.toolbarWrap && typeof window.ResizeObserver === 'function') {
      var observer = new window.ResizeObserver(updateStickyOffset);
      observer.observe(els.toolbarWrap);
    }
    on(window, 'resize', updateStickyOffset);
    on(window, 'load', updateStickyOffset);
  }

  /* ---------------- 事件 ---------------- */

  function scheduleSearch() {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(function () {
      var normalized = L.normalizeQuery(els.searchInput ? els.searchInput.value : '');
      if (normalized === state.query) return;
      state.query = normalized;
      applyFilters({ scroll: false });
    }, 80);
  }

  function clearSearch() {
    window.clearTimeout(searchTimer);
    if (els.searchInput) els.searchInput.value = '';
    if (state.query === '') return;
    state.query = '';
    applyFilters({ scroll: false });
  }

  function onTableClick(event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var link = target.closest('a.word-link');
    var row = target.closest('.word-row');
    if (link) {
      if (state.quiz && row) row.classList.add('is-revealed');
      if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
        var word = link.textContent || '';
        copyText(absoluteUrl(link.getAttribute('href')), function (ok) {
          if (ok) showToast('已复制「' + word + '」的链接，可直接发给同学定位到这一行');
        });
      }
      return;
    }
    if (state.quiz && row) {
      row.classList.toggle('is-revealed');
    }
  }

  function bindEvents() {
    if (els.searchInput) {
      on(els.searchInput, 'input', scheduleSearch);
      on(els.searchInput, 'search', scheduleSearch);
      on(els.searchInput, 'keydown', function (event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
          event.preventDefault();
          clearSearch();
        } else if (event.key === 'Enter') {
          window.clearTimeout(searchTimer);
          state.query = L.normalizeQuery(els.searchInput.value);
          applyFilters({ scroll: false });
        }
      });
    }

    if (els.posSelect) {
      on(els.posSelect, 'change', function () {
        state.pos = els.posSelect.value || '';
        applyFilters({ scroll: true });
      });
    }

    if (els.unitButtons) {
      on(els.unitButtons, 'click', function (event) {
        var target = event.target;
        var btn = target && target.closest ? target.closest('.unit-btn') : null;
        if (!btn) return;
        var value = btn.getAttribute('data-unit') || 'all';
        if (value === state.unit) return;
        state.unit = value;
        updateUnitButtons();
        applyFilters({ scroll: true });
      });
    }

    if (els.hideExtraToggle) {
      on(els.hideExtraToggle, 'change', function () {
        state.hideExtra = Boolean(els.hideExtraToggle.checked);
        setBodyFlags();
        updateStickyOffset();
      });
    }

    if (els.quizToggle) {
      on(els.quizToggle, 'change', function () {
        state.quiz = Boolean(els.quizToggle.checked);
        setBodyFlags();
        updateStickyOffset();
      });
    }

    on(els.clearBtn, 'click', resetFilters);
    on(els.emptyClearBtn, 'click', resetFilters);
    on(els.printBtn, 'click', function () {
      window.print();
    });

    on(els.tbody, 'click', onTableClick);
    on(window, 'hashchange', handleHash);

    on(doc, 'keydown', function (event) {
      var target = event.target;
      var tag = target && target.tagName ? String(target.tagName).toLowerCase() : '';
      var inField = tag === 'input' || tag === 'select' || tag === 'textarea' || (target && target.isContentEditable);
      if (event.key === '/' && !inField && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        if (els.searchInput) {
          els.searchInput.focus();
          els.searchInput.select();
        }
      }
    });
  }

  /* ---------------- 数据异常兜底 ---------------- */

  function renderFatal() {
    if (els.tbody) {
      var tr = doc.createElement('tr');
      var td = doc.createElement('td');
      td.className = 'fatal-note';
      td.colSpan = 3;
      td.textContent = '词表数据加载失败：请确认 ../assets/vocab-forms/data.js 可访问，且浏览器允许执行本地 JavaScript。';
      tr.appendChild(td);
      els.tbody.appendChild(tr);
    }
    if (els.tablePanel) els.tablePanel.hidden = false;
    if (els.resultCount) els.resultCount.textContent = '数据加载失败';
  }

  /* ---------------- 启动 ---------------- */

  function init() {
    els.tbody = $('word-tbody');
    els.tablePanel = $('table-panel');
    els.tableArea = $('table-area');
    els.emptyState = $('empty-state');
    els.emptyClearBtn = $('empty-clear-btn');
    els.searchInput = $('search-input');
    els.posSelect = $('pos-select');
    els.unitButtons = $('unit-buttons');
    els.clearBtn = $('clear-btn');
    els.hideExtraToggle = $('hide-extra-toggle');
    els.quizToggle = $('quiz-toggle');
    els.resultCount = $('result-count');
    els.printBtn = $('print-btn');
    els.toolbarWrap = $('toolbar-wrap');
    els.toast = $('toast');
    els.statUnits = $('stat-units');
    els.statWords = $('stat-words');
    els.statCore = $('stat-core');
    els.statExtra = $('stat-extra');
    els.statUpdated = $('stat-updated');
    els.footerUpdated = $('footer-updated');
    els.printUpdated = $('print-updated');
    els.footTotal = $('foot-total');

    if (!DATA || !Array.isArray(DATA.entries) || !L) {
      renderFatal();
      return;
    }

    entries = DATA.entries;
    units = Array.isArray(DATA.units) ? DATA.units : [];
    total = typeof DATA.total === 'number' ? DATA.total : entries.length;
    entries.forEach(function (entry) {
      if (entry && entry.id != null) byId[String(entry.id)] = entry;
    });

    renderMeta();
    renderUnitButtons();
    renderPosOptions();
    setBodyFlags();
    bindEvents();
    applyFilters({ scroll: false });
    initStickyOffset();
    handleHash();
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
