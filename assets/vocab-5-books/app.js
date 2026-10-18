/* ============================================================
   初中英语资料站 · 五册黑体词汇与助记 DOM 渲染与交互
   依赖（按顺序先于本文件加载）：
     window.VOCAB_BOOK     —— data.js
     window.VOCAB5_LOGIC   —— logic.js
   ============================================================ */
(function () {
  'use strict';

  var L = window.VOCAB5_LOGIC;
  var DATA = window.VOCAB_BOOK;
  var doc = document;

  var state = {
    query: '',
    volume: 'all',
    unit: 'all',
    pos: '',
    tag: '',
    hideMean: false
  };

  var els = {};
  var stats = { volumes: 0, units: 0, words: 0, segments: 0, tags: 0 };
  var wordIndex = Object.create(null);
  var unitIndex = Object.create(null);
  var volumeIndex = Object.create(null);
  var currentTargetId = null;
  var searchTimer = 0;
  var toastTimer = 0;
  var toastHideTimer = 0;
  var lastVolume = 'all';

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
    Array.prototype.forEach.call(list || [], fn);
  }

  function appendNumber(parent, value, formatted) {
    var b = doc.createElement('b');
    b.textContent = formatted ? L.formatNumber(value) : String(value);
    parent.appendChild(b);
  }

  function absoluteUrl(href) {
    try {
      return new URL(href, window.location.href).href;
    } catch (err) {
      return href;
    }
  }

  function toolbarHeight() {
    return els.toolbarWrap ? els.toolbarWrap.offsetHeight : 0;
  }

  /* ---------------- 轻提示 / 复制 ---------------- */

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

  function copyText(text, message) {
    if (!text) return;
    function done(ok) {
      if (ok) showToast(message);
      else showToast('未能自动复制，请从地址栏复制链接');
    }
    if (window.navigator && window.navigator.clipboard && window.navigator.clipboard.writeText) {
      window.navigator.clipboard.writeText(text).then(function () { done(true); }, function () { legacyCopy(text, done); });
    } else {
      legacyCopy(text, done);
    }
  }

  /* ---------------- 元信息 ---------------- */

  function fillMeta() {
    setText(els.statVolumes, stats.volumes);
    setText(els.statUnits, L.formatNumber(stats.units));
    setText(els.statWords, L.formatNumber(stats.words));
    setText(els.statTags, stats.tags);
    setText(els.subVolumes, stats.volumes);
    setText(els.subUnits, stats.units);
    setText(els.subWords, L.formatNumber(stats.words));
    setText(els.bookWords, L.formatNumber(stats.words));
    setText(els.aboutWords, L.formatNumber(stats.words));
    var updated = DATA.generatedAt || '—';
    setText(els.statUpdated, updated);
    setText(els.footerUpdated, updated);
  }

  /* ---------------- 册按钮 ---------------- */

  function volumeWordCount(volume) {
    var count = 0;
    (Array.isArray(volume.units) ? volume.units : []).forEach(function (unit) {
      count += Array.isArray(unit.words) ? unit.words.length : 0;
    });
    return count;
  }

  function makeVolumeButton(value, label, count, color) {
    var btn = doc.createElement('button');
    btn.type = 'button';
    btn.className = 'vol-btn';
    btn.setAttribute('data-volume', value);
    btn.setAttribute('aria-pressed', 'false');
    if (color) btn.style.setProperty('--vol-color', color);
    var dot = doc.createElement('span');
    dot.className = 'vol-dot';
    dot.setAttribute('aria-hidden', 'true');
    btn.appendChild(dot);
    btn.appendChild(doc.createTextNode(label));
    var small = doc.createElement('small');
    small.textContent = L.formatNumber(count) + ' 词';
    btn.appendChild(small);
    return btn;
  }

  function renderVolumeButtons() {
    if (!els.volumeButtons) return;
    var frag = doc.createDocumentFragment();
    frag.appendChild(makeVolumeButton('all', '全部', stats.words, '#1a365d'));
    (Array.isArray(DATA.volumes) ? DATA.volumes : []).forEach(function (volume) {
      frag.appendChild(makeVolumeButton(
        String(volume.no),
        volume.short || ('第' + volume.no + '册'),
        volumeWordCount(volume),
        volume.color
      ));
    });
    els.volumeButtons.textContent = '';
    els.volumeButtons.appendChild(frag);
  }

  function updateVolumeButtons() {
    if (!els.volumeButtons) return;
    each(els.volumeButtons.querySelectorAll('.vol-btn'), function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-volume') === String(state.volume)));
    });
  }

  /* ---------------- 单元下拉（随册联动） ---------------- */

  function renderUnitOptions() {
    if (!els.unitSelect) return;
    var groups = L.unitOptionGroups(DATA, state.volume);
    var frag = doc.createDocumentFragment();
    var allOption = doc.createElement('option');
    allOption.value = '';
    allOption.textContent = '全部单元';
    frag.appendChild(allOption);
    groups.forEach(function (group) {
      var parent = frag;
      if (groups.length > 1) {
        var optgroup = doc.createElement('optgroup');
        optgroup.setAttribute('label', (group.volume.short || '') + ' · ' + group.volume.name);
        frag.appendChild(optgroup);
        parent = optgroup;
      }
      group.options.forEach(function (option) {
        var el = doc.createElement('option');
        el.value = option.value;
        el.textContent = option.label + '（' + option.count + ' 词）';
        parent.appendChild(el);
      });
    });
    els.unitSelect.textContent = '';
    els.unitSelect.appendChild(frag);
    els.unitSelect.value = state.unit === 'all' ? '' : state.unit;
  }

  /* ---------------- 词性 / 助记下拉 ---------------- */

  function renderSelectOptions(select, allLabel, options) {
    if (!select) return;
    var frag = doc.createDocumentFragment();
    var all = doc.createElement('option');
    all.value = '';
    all.textContent = allLabel;
    frag.appendChild(all);
    (Array.isArray(options) ? options : []).forEach(function (value) {
      var opt = doc.createElement('option');
      opt.value = value;
      opt.textContent = value;
      frag.appendChild(opt);
    });
    select.textContent = '';
    select.appendChild(frag);
    select.value = '';
  }

  /* ---------------- 富文本（高亮） ---------------- */

  function setRich(el, text) {
    if (!el) return;
    var value = text == null ? '' : String(text);
    if (state.query) el.innerHTML = L.highlightText(value, state.query);
    else el.textContent = value;
  }

  /* ---------------- 渲染：表格与行 ---------------- */

  function renderTableHead() {
    var thead = doc.createElement('thead');
    var tr = doc.createElement('tr');
    ['序号', '单词', '词性', '释义', '助记'].forEach(function (label, index) {
      var th = doc.createElement('th');
      th.setAttribute('scope', 'col');
      if (index === 4) {
        th.appendChild(doc.createTextNode('助记'));
        var hint = doc.createElement('span');
        hint.className = 'th-sub';
        hint.textContent = '10 类助记标签';
        th.appendChild(hint);
      } else {
        th.textContent = label;
      }
      tr.appendChild(th);
    });
    thead.appendChild(tr);
    return thead;
  }

  function renderMnemonic(word) {
    var wrap = doc.createElement('span');
    wrap.className = 'mnemonic';
    (Array.isArray(word.mnemonic) ? word.mnemonic : []).forEach(function (seg) {
      if (!seg) return;
      var line = doc.createElement('span');
      line.className = 'mseg';
      var tag = doc.createElement('span');
      tag.className = 'mtag';
      tag.setAttribute('data-tag', seg.tag || '');
      tag.textContent = seg.tag || '';
      line.appendChild(tag);
      line.appendChild(doc.createTextNode(' '));
      var text = doc.createElement('span');
      text.className = 'mtext';
      setRich(text, seg.text);
      line.appendChild(text);
      wrap.appendChild(line);
    });
    return wrap;
  }

  function renderWordRow(word) {
    var tr = doc.createElement('tr');
    tr.className = 'word-row';
    tr.id = word.id;
    tr.setAttribute('data-word-id', word.id);
    if (state.hideMean) tr.tabIndex = 0;

    /* 序号 */
    var tdNo = doc.createElement('td');
    tdNo.className = 'cell-no';
    tdNo.textContent = String(word.no == null ? '' : word.no);
    tr.appendChild(tdNo);

    /* 单词 + 音标（+ 变体说明） */
    var tdWord = doc.createElement('td');
    tdWord.className = 'cell-word';
    var wordSpan = doc.createElement('span');
    wordSpan.className = 'word';
    var link = doc.createElement('a');
    link.className = 'word-link';
    link.href = '#' + word.id;
    link.title = '复制「' + (word.word || '') + '」的链接';
    setRich(link, word.word);
    wordSpan.appendChild(link);
    tdWord.appendChild(wordSpan);
    if (word.variant) {
      var variant = doc.createElement('span');
      variant.className = 'variant';
      variant.textContent = '= ' + word.variant;
      tdWord.appendChild(variant);
    }
    var ipa = doc.createElement('span');
    ipa.className = 'ipa';
    setRich(ipa, word.ipa || '—');
    tdWord.appendChild(ipa);
    var posMobile = doc.createElement('span');
    posMobile.className = 'pos-chip pos-mobile';
    posMobile.textContent = word.pos || '—';
    tdWord.appendChild(posMobile);
    tr.appendChild(tdWord);

    /* 词性 */
    var tdPos = doc.createElement('td');
    tdPos.className = 'pos-cell';
    var posChip = doc.createElement('span');
    posChip.className = 'pos-chip';
    posChip.textContent = word.pos || '—';
    tdPos.appendChild(posChip);
    tr.appendChild(tdPos);

    /* 释义 */
    var tdMeaning = doc.createElement('td');
    tdMeaning.className = 'cell-meaning';
    tdMeaning.setAttribute('data-label', '释义');
    var meaning = doc.createElement('span');
    meaning.className = 'meaning';
    setRich(meaning, word.meaning || '—');
    tdMeaning.appendChild(meaning);
    tr.appendChild(tdMeaning);

    /* 助记 */
    var tdMnemonic = doc.createElement('td');
    tdMnemonic.className = 'cell-mnemonic';
    tdMnemonic.setAttribute('data-label', '助记');
    tdMnemonic.appendChild(renderMnemonic(word));
    tr.appendChild(tdMnemonic);

    return tr;
  }

  function renderUnitBlock(unitEntry) {
    var unit = unitEntry.unit;
    var block = doc.createElement('section');
    block.className = 'unit-block';
    block.id = unit.id;
    block.setAttribute('aria-labelledby', unit.id + '-title');

    var title = doc.createElement('h3');
    title.className = 'unit-title';
    title.id = unit.id + '-title';
    var label = doc.createElement('span');
    label.className = 'unit-label';
    label.textContent = unit.label || unit.id;
    title.appendChild(label);
    if (unit.titleEn) {
      var en = doc.createElement('span');
      en.className = 'unit-title-en';
      en.textContent = unit.titleEn;
      title.appendChild(en);
    }
    var count = doc.createElement('span');
    count.className = 'unit-count';
    count.textContent = unitEntry.words.length + ' 词';
    title.appendChild(count);
    block.appendChild(title);

    var wrap = doc.createElement('div');
    wrap.className = 'word-table-wrap';
    var table = doc.createElement('table');
    table.className = 'word-table';
    var caption = doc.createElement('caption');
    caption.className = 'visually-hidden';
    caption.textContent = (unit.heading || (unit.label || unit.id)) + ' 黑体词汇：单词、音标、词性、释义与助记';
    table.appendChild(caption);

    var colgroup = doc.createElement('colgroup');
    ['col-no', 'col-word', 'col-pos', 'col-meaning', 'col-mnemonic'].forEach(function (cls) {
      var col = doc.createElement('col');
      col.className = cls;
      colgroup.appendChild(col);
    });
    table.appendChild(colgroup);
    table.appendChild(renderTableHead());

    var tbody = doc.createElement('tbody');
    var frag = doc.createDocumentFragment();
    unitEntry.words.forEach(function (word) {
      frag.appendChild(renderWordRow(word));
    });
    tbody.appendChild(frag);
    table.appendChild(tbody);
    wrap.appendChild(table);
    block.appendChild(wrap);
    return block;
  }

  function renderVolumeSection(volumeEntry) {
    var volume = volumeEntry.volume;
    var section = doc.createElement('section');
    section.className = 'volume-section';
    section.id = 'v' + volume.no;
    section.style.setProperty('--vol-color', volume.color || '#16806c');

    var head = doc.createElement('header');
    head.className = 'volume-head';
    var title = doc.createElement('h2');
    title.className = 'volume-title';
    var badge = doc.createElement('span');
    badge.className = 'vol-badge';
    badge.textContent = volume.short || ('第' + volume.no + '册');
    title.appendChild(badge);
    var name = doc.createElement('span');
    name.className = 'vol-name';
    name.textContent = volume.name || '';
    title.appendChild(name);
    head.appendChild(title);

    var meta = doc.createElement('p');
    meta.className = 'volume-meta';
    meta.textContent = volumeEntry.units.length + ' 个单元 · ' + L.formatNumber(volumeEntry.words) + ' 词';
    head.appendChild(meta);
    section.appendChild(head);

    var frag = doc.createDocumentFragment();
    volumeEntry.units.forEach(function (unitEntry) {
      frag.appendChild(renderUnitBlock(unitEntry));
    });
    section.appendChild(frag);
    return section;
  }

  /* ---------------- 深链高亮 ---------------- */

  function syncTargetClass() {
    if (!els.content) return;
    each(els.content.querySelectorAll('.is-target'), function (el) {
      el.classList.remove('is-target');
    });
    if (!currentTargetId) return;
    var row = $(currentTargetId);
    if (row) row.classList.add('is-target');
  }

  function setTarget(id) {
    currentTargetId = id || null;
    syncTargetClass();
  }

  /* ---------------- 主渲染 ---------------- */

  function render() {
    var filtered = L.filterBook(DATA, {
      query: state.query,
      volume: state.volume,
      unit: state.unit,
      pos: state.pos,
      tag: state.tag
    });
    var frag = doc.createDocumentFragment();
    filtered.volumes.forEach(function (volumeEntry) {
      frag.appendChild(renderVolumeSection(volumeEntry));
    });
    els.content.textContent = '';
    els.content.appendChild(frag);

    var isEmpty = filtered.volumes.length === 0;
    if (els.content) els.content.hidden = isEmpty;
    if (els.emptyState) els.emptyState.hidden = !isEmpty;

    updateResultCount(filtered.words);
    updateClearButton();
    syncTargetClass();
  }

  function updateResultCount(shownWords) {
    if (!els.resultCount) return;
    var frag = doc.createDocumentFragment();
    frag.appendChild(doc.createTextNode('共 '));
    appendNumber(frag, stats.words, true);
    frag.appendChild(doc.createTextNode(' 词 · '));
    appendNumber(frag, stats.units, false);
    frag.appendChild(doc.createTextNode(' 单元 · '));
    appendNumber(frag, stats.volumes, false);
    frag.appendChild(doc.createTextNode(' 册 ｜ 显示 '));
    appendNumber(frag, shownWords, true);
    frag.appendChild(doc.createTextNode(' 词'));
    els.resultCount.textContent = '';
    els.resultCount.appendChild(frag);
  }

  function updateClearButton() {
    if (!els.clearBtn) return;
    var hasFilters = Boolean(state.query || state.pos || state.tag || state.unit !== 'all' || state.volume !== 'all');
    els.clearBtn.hidden = !hasFilters;
  }

  /* ---------------- 筛选交互 ---------------- */

  function resetFilters() {
    state.query = '';
    state.volume = 'all';
    state.unit = 'all';
    state.pos = '';
    state.tag = '';
    if (els.searchInput) els.searchInput.value = '';
    if (els.posSelect) els.posSelect.value = '';
    if (els.tagSelect) els.tagSelect.value = '';
    renderUnitOptions();
    updateVolumeButtons();
    render();
    lastVolume = 'all';
  }

  function applyQueryFromInput() {
    var normalized = L.normalizeQuery(els.searchInput ? els.searchInput.value : '');
    if (normalized === state.query) return;
    state.query = normalized;
    render();
  }

  function scheduleSearch() {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(applyQueryFromInput, 80);
  }

  function clearSearch() {
    window.clearTimeout(searchTimer);
    if (els.searchInput) els.searchInput.value = '';
    if (state.query === '') return;
    state.query = '';
    render();
  }

  function changeVolume(value) {
    var previous = state.volume;
    state.volume = value;
    state.unit = 'all';
    updateVolumeButtons();
    renderUnitOptions();
    render();
    if (value !== 'all' && previous === 'all') {
      var volume = volumeIndex[String(value)];
      var firstUnit = volume && Array.isArray(volume.units) ? volume.units[0] : null;
      if (firstUnit) {
        var block = $(firstUnit.id);
        if (block) block.scrollIntoView({ block: 'start' });
      }
    }
    lastVolume = value;
  }

  /* ---------------- 深链 ---------------- */

  function handleHash() {
    var info = L.parseHash(window.location.hash);
    if (!info) {
      setTarget(null);
      return;
    }
    var target = $(info.id);
    if (!target) {
      // 被当前筛选条件藏住了：自动放宽筛选
      resetFilters();
      target = $(info.id);
    }
    if (!target) {
      setTarget(null);
      return;
    }
    if (info.kind === 'word') {
      setTarget(info.id);
      target.scrollIntoView({ block: 'center' });
    } else {
      setTarget(null);
      target.scrollIntoView({ block: 'start' });
    }
  }

  /* ---------------- 吸顶偏移 ---------------- */

  function updateStickyOffset() {
    doc.documentElement.style.setProperty('--toolbar-h', toolbarHeight() + 'px');
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

  function revealRow(row) {
    if (!row) return;
    row.classList.toggle('revealed');
  }

  function onContentClick(event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var link = target.closest('a.word-link');
    var row = target.closest('.word-row');
    if (link) {
      if (state.hideMean && row) row.classList.add('revealed');
      if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
        copyText(absoluteUrl(link.getAttribute('href')), '已复制链接：' + (link.textContent || ''));
      }
      return;
    }
    if (state.hideMean && row) revealRow(row);
  }

  function onContentKeydown(event) {
    if (!state.hideMean) return;
    if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
    var target = event.target;
    var row = target && target.closest ? target.closest('.word-row') : null;
    if (!row) return;
    event.preventDefault();
    revealRow(row);
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
          applyQueryFromInput();
        }
      });
    }

    if (els.volumeButtons) {
      on(els.volumeButtons, 'click', function (event) {
        var target = event.target;
        var btn = target && target.closest ? target.closest('.vol-btn') : null;
        if (!btn) return;
        changeVolume(btn.getAttribute('data-volume') || 'all');
      });
    }

    if (els.unitSelect) {
      on(els.unitSelect, 'change', function () {
        state.unit = els.unitSelect.value || 'all';
        render();
      });
    }

    if (els.posSelect) {
      on(els.posSelect, 'change', function () {
        state.pos = els.posSelect.value || '';
        render();
      });
    }

    if (els.tagSelect) {
      on(els.tagSelect, 'change', function () {
        state.tag = els.tagSelect.value || '';
        render();
      });
    }

    if (els.hideMeanToggle) {
      on(els.hideMeanToggle, 'change', function () {
        state.hideMean = Boolean(els.hideMeanToggle.checked);
        doc.body.classList.toggle('hide-mean', state.hideMean);
        render();
        updateStickyOffset();
      });
    }

    on(els.clearBtn, 'click', resetFilters);
    on(els.emptyClearBtn, 'click', resetFilters);
    on(els.printBtn, 'click', function () {
      window.print();
    });

    on(els.content, 'click', onContentClick);
    on(els.content, 'keydown', onContentKeydown);
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
    if (!els.content) return;
    els.content.textContent = '';
    var note = doc.createElement('p');
    note.className = 'fatal-note';
    note.textContent = '词汇数据加载失败：请确认 ../assets/vocab-5-books/data.js 可访问，且浏览器允许执行本地 JavaScript。';
    els.content.appendChild(note);
    els.content.hidden = false;
    if (els.resultCount) els.resultCount.textContent = '数据加载失败';
  }

  /* ---------------- 启动 ---------------- */

  function init() {
    els.content = $('content');
    els.emptyState = $('empty-state');
    els.emptyClearBtn = $('empty-clear-btn');
    els.searchInput = $('search-input');
    els.volumeButtons = $('volume-buttons');
    els.unitSelect = $('unit-select');
    els.posSelect = $('pos-select');
    els.tagSelect = $('tag-select');
    els.clearBtn = $('clear-btn');
    els.hideMeanToggle = $('hide-mean-toggle');
    els.resultCount = $('result-count');
    els.printBtn = $('print-btn');
    els.toolbarWrap = $('toolbar-wrap');
    els.toast = $('toast');
    els.statVolumes = $('stat-volumes');
    els.statUnits = $('stat-units');
    els.statWords = $('stat-words');
    els.statTags = $('stat-tags');
    els.statUpdated = $('stat-updated');
    els.subVolumes = $('sub-volumes');
    els.subUnits = $('sub-units');
    els.subWords = $('sub-words');
    els.bookWords = $('book-words');
    els.aboutWords = $('about-words');
    els.footerUpdated = $('footer-updated');

    if (!DATA || !Array.isArray(DATA.volumes) || !L) {
      renderFatal();
      return;
    }

    stats = L.computeStats(DATA);
    wordIndex = L.buildWordIndex(DATA);
    unitIndex = L.buildUnitIndex(DATA);
    volumeIndex = L.buildVolumeIndex(DATA);

    fillMeta();
    renderVolumeButtons();
    renderSelectOptions(els.posSelect, '全部词性', DATA.posOptions);
    renderSelectOptions(els.tagSelect, '全部助记', DATA.tagOptions);
    renderUnitOptions();
    updateVolumeButtons();
    bindEvents();
    render();
    initStickyOffset();
    handleHash();
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
