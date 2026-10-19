/* ============================================================
   初中英语资料站 · 书面表达范文集 DOM 渲染与交互
   依赖（按顺序先于本文件加载）：
     window.ESSAY_BOOK   —— data.js
     window.ESSAY_LOGIC  —— logic.js
   ============================================================ */
(function () {
  'use strict';

  var L = window.ESSAY_LOGIC;
  var DATA = window.ESSAY_BOOK;
  var doc = document;

  var state = {
    query: '',
    type: '',
    hideCn: false,
    expandAll: false
  };

  var els = {};
  var stats = { units: 0, essays: 0, patterns: 0, groupA: 0, groupB: 0 };
  var essayIndex = Object.create(null);
  var patternIndex = Object.create(null);
  var currentSection = 'all';
  var currentTargetId = null;
  var searchTimer = 0;
  var toastTimer = 0;
  var toastHideTimer = 0;
  var unitObserver = null;
  var printOpenStates = null;
  var scrollFrame = 0;

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

  function toolbarHeight() {
    return els.toolbarWrap ? els.toolbarWrap.offsetHeight : 0;
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

  /* ---------------- 复制 ---------------- */

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
      else showToast('未能自动复制，请手动选择文字复制');
    }
    if (window.navigator && window.navigator.clipboard && window.navigator.clipboard.writeText) {
      window.navigator.clipboard.writeText(text).then(function () { done(true); }, function () { legacyCopy(text, done); });
    } else {
      legacyCopy(text, done);
    }
  }

  /* ---------------- 元信息 ---------------- */

  function perUnitCount(total) {
    if (!stats.units || total % stats.units !== 0) return '—';
    return total / stats.units;
  }

  function fillMeta() {
    setText(els.statUnits, stats.units);
    setText(els.statEssays, stats.essays);
    setText(els.statPatterns, stats.patterns);
    setText(els.statGroupA, stats.groupA);
    setText(els.statGroupB, stats.groupB);
    setText(els.subtitleEssays, stats.essays);
    setText(els.subtitlePatterns, stats.patterns);
    setText(els.leadPatterns, perUnitCount(stats.patterns));
    setText(els.leadA, perUnitCount(stats.groupA));
    setText(els.leadB, perUnitCount(stats.groupB));
    setText(els.bookEssays, stats.essays);
    setText(els.bookPatterns, stats.patterns);
    var updated = DATA.generatedAt || '—';
    setText(els.statUpdated, updated);
    setText(els.footerUpdated, updated);
  }

  /* ---------------- 工具条：单元按钮 ---------------- */

  function essayCountOfUnit(unit) {
    return Array.isArray(unit && unit.essays) ? unit.essays.length : 0;
  }

  function makeUnitButton(value, label, count) {
    var btn = doc.createElement('button');
    btn.type = 'button';
    btn.className = 'unit-btn';
    btn.setAttribute('data-unit', value);
    btn.setAttribute('aria-pressed', 'false');
    btn.appendChild(doc.createTextNode(label));
    if (typeof count === 'number') {
      var small = doc.createElement('small');
      small.textContent = count + ' 篇';
      btn.appendChild(small);
    }
    return btn;
  }

  function renderUnitButtons() {
    if (!els.unitButtons) return;
    var frag = doc.createDocumentFragment();
    frag.appendChild(makeUnitButton('all', '全部', stats.essays));
    each(DATA.units, function (unit) {
      frag.appendChild(makeUnitButton(String(unit.no), 'Unit ' + unit.no, essayCountOfUnit(unit)));
    });
    els.unitButtons.textContent = '';
    els.unitButtons.appendChild(frag);
  }

  function setActiveUnit(value) {
    currentSection = value === 'all' || value == null ? 'all' : Number(value);
    if (!els.unitButtons) return;
    var wanted = String(currentSection);
    each(els.unitButtons.querySelectorAll('.unit-btn'), function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-unit') === wanted));
    });
  }

  /* ---------------- 结果计数 / 清除按钮 ---------------- */

  function updateResultCount(sections) {
    if (!els.resultCount) return;
    var shown = L.computeDisplayStats(sections);
    var frag = doc.createDocumentFragment();
    frag.appendChild(doc.createTextNode('共 '));
    appendNumber(frag, stats.essays);
    frag.appendChild(doc.createTextNode(' 篇范文 · '));
    appendNumber(frag, stats.patterns);
    frag.appendChild(doc.createTextNode(' 条句型 ｜ 显示 '));
    appendNumber(frag, shown.essays);
    frag.appendChild(doc.createTextNode(' 篇 · '));
    appendNumber(frag, shown.patterns);
    frag.appendChild(doc.createTextNode(' 条'));
    els.resultCount.textContent = '';
    els.resultCount.appendChild(frag);
  }

  function updateClearButton() {
    if (!els.clearBtn) return;
    els.clearBtn.hidden = !(state.query || state.type);
  }

  /* ---------------- 富文本（高亮）写入 ---------------- */

  function setRich(el, text) {
    if (!el) return;
    var value = text == null ? '' : String(text);
    if (state.query) el.innerHTML = L.highlightText(value, state.query);
    else el.textContent = value;
  }

  function blockCountText(shown, total, unitWord) {
    if (shown === total) return total + ' ' + unitWord;
    return '显示 ' + shown + ' / ' + total + ' ' + unitWord;
  }

  function essayWordLabel(essay) {
    if (typeof essay.wordsApprox === 'number' && isFinite(essay.wordsApprox)) {
      return '约 ' + essay.wordsApprox + ' 词';
    }
    if (essay.words) return String(essay.words);
    return '';
  }

  /* ---------------- 渲染：句型卡 ---------------- */

  function renderPatternCard(unit, pattern, patternNo) {
    var card = doc.createElement('article');
    card.className = 'pattern-card';
    card.id = L.essayPatternId(unit.no, patternNo);

    var en = doc.createElement('button');
    en.type = 'button';
    en.className = 'pattern-en';
    en.setAttribute('data-pattern-id', card.id);
    en.title = '点击复制英文句型';
    setRich(en, pattern.en);
    card.appendChild(en);

    var cn = doc.createElement('p');
    cn.className = 'pattern-cn';
    setRich(cn, pattern.cn);
    card.appendChild(cn);

    var usage = doc.createElement('p');
    usage.className = 'pattern-usage';
    var label = doc.createElement('span');
    label.className = 'usage-label';
    label.textContent = '用法';
    usage.appendChild(label);
    var usageText = doc.createElement('span');
    usageText.className = 'usage-text';
    setRich(usageText, pattern.usage);
    usage.appendChild(usageText);
    card.appendChild(usage);

    return card;
  }

  /* ---------------- 渲染：范文卡 ---------------- */

  function renderEssayCard(essay) {
    var isA = essay.group === 'A';
    var card = doc.createElement('article');
    card.className = 'essay-card group-' + String(essay.group || '').toLowerCase();
    card.id = essay.id;
    card.setAttribute('aria-labelledby', essay.id + '-title');
    card.setAttribute('data-unit', String(essay.unit));
    card.setAttribute('data-group', String(essay.group || ''));

    /* 头部 */
    var head = doc.createElement('header');
    head.className = 'essay-head';

    var kicker = doc.createElement('div');
    kicker.className = 'essay-kicker';
    var badge = doc.createElement('span');
    badge.className = 'group-badge ' + (isA ? 'badge-a' : 'badge-b');
    badge.textContent = isA ? '满分范文 A' : '好背好文 B';
    kicker.appendChild(badge);
    var no = doc.createElement('span');
    no.className = 'essay-no';
    no.textContent = essay.label || '';
    kicker.appendChild(no);
    var words = doc.createElement('span');
    words.className = 'essay-words';
    words.textContent = essayWordLabel(essay);
    kicker.appendChild(words);
    head.appendChild(kicker);

    var cnTitle = doc.createElement('h3');
    cnTitle.className = 'essay-cn';
    cnTitle.id = essay.id + '-title';
    setRich(cnTitle, essay.cnTitle);
    head.appendChild(cnTitle);

    var enTitle = doc.createElement('p');
    enTitle.className = 'essay-en';
    setRich(enTitle, essay.enTitle);
    head.appendChild(enTitle);

    var actions = doc.createElement('div');
    actions.className = 'essay-actions';
    var copyBtn = doc.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'btn btn-quiet btn-sm essay-copy';
    copyBtn.setAttribute('data-copy-essay', essay.id);
    copyBtn.textContent = '复制正文';
    actions.appendChild(copyBtn);
    head.appendChild(actions);

    card.appendChild(head);

    /* 正文 */
    var body = doc.createElement('div');
    body.className = 'essay-body';
    each(essay.paragraphs, function (paragraph) {
      var p = doc.createElement('p');
      setRich(p, paragraph);
      body.appendChild(p);
    });
    card.appendChild(body);

    /* A 组：亮点解析；B 组：参考译文 */
    if (isA && essay.analysis && (essay.analysis.text || essay.analysis.highlight)) {
      var analysis = doc.createElement('details');
      analysis.className = 'essay-extra analysis';
      var summaryA = doc.createElement('summary');
      summaryA.textContent = '亮点解析 · 亮点句';
      analysis.appendChild(summaryA);
      if (essay.analysis.text) {
        var analysisText = doc.createElement('p');
        analysisText.className = 'analysis-text';
        setRich(analysisText, essay.analysis.text);
        analysis.appendChild(analysisText);
      }
      if (essay.analysis.highlight) {
        var quote = doc.createElement('blockquote');
        quote.className = 'essay-highlight';
        var hlEn = doc.createElement('p');
        hlEn.className = 'hl-en';
        setRich(hlEn, essay.analysis.highlight);
        quote.appendChild(hlEn);
        if (essay.analysis.highlightCn) {
          var hlCn = doc.createElement('p');
          hlCn.className = 'hl-cn';
          hlCn.textContent = '译文：';
          var hlCnText = doc.createElement('span');
          setRich(hlCnText, essay.analysis.highlightCn);
          hlCn.appendChild(hlCnText);
          quote.appendChild(hlCn);
        }
        analysis.appendChild(quote);
      }
      card.appendChild(analysis);
    }

    if (!isA && essay.translation) {
      var trans = doc.createElement('details');
      trans.className = 'essay-extra translation';
      var summaryB = doc.createElement('summary');
      summaryB.textContent = '参考译文';
      trans.appendChild(summaryB);
      var transText = doc.createElement('p');
      transText.className = 'trans-text';
      setRich(transText, essay.translation);
      trans.appendChild(transText);
      card.appendChild(trans);
    }

    return card;
  }

  /* ---------------- 渲染：单元区块 ---------------- */

  function renderBlockTitle(noText, nameText, shown, total, unitWord, extraClass) {
    var title = doc.createElement('h3');
    title.className = 'block-title' + (extraClass ? ' ' + extraClass : '');
    var no = doc.createElement('span');
    no.className = 'block-no';
    no.textContent = noText;
    title.appendChild(no);
    var name = doc.createElement('span');
    name.className = 'block-name';
    name.textContent = nameText;
    title.appendChild(name);
    var count = doc.createElement('span');
    count.className = 'block-count';
    count.textContent = blockCountText(shown, total, unitWord);
    title.appendChild(count);
    return title;
  }

  function renderUnitSection(section) {
    var unit = section.unit;
    var el = doc.createElement('section');
    el.className = 'unit-section';
    el.id = 'u' + unit.no;
    el.setAttribute('aria-labelledby', 'u' + unit.no + '-title');

    /* 单元头 */
    var head = doc.createElement('header');
    head.className = 'unit-head';
    var kicker = doc.createElement('p');
    kicker.className = 'unit-kicker';
    kicker.textContent = 'Unit ' + unit.no;
    head.appendChild(kicker);

    var title = doc.createElement('h2');
    title.className = 'unit-title';
    title.id = 'u' + unit.no + '-title';
    var unitNo = doc.createElement('span');
    unitNo.className = 'unit-no';
    unitNo.textContent = 'Unit ' + unit.no;
    title.appendChild(unitNo);
    if (unit.enName) {
      var enName = doc.createElement('span');
      enName.className = 'unit-en';
      enName.textContent = unit.enName;
      title.appendChild(enName);
    }
    if (unit.cnName) {
      var cnName = doc.createElement('span');
      cnName.className = 'unit-cn';
      cnName.textContent = unit.cnName;
      title.appendChild(cnName);
    }
    head.appendChild(title);

    if (unit.grammar || unit.task) {
      var meta = doc.createElement('p');
      meta.className = 'unit-meta';
      if (unit.grammar) {
        var grammarItem = doc.createElement('span');
        grammarItem.className = 'unit-meta-item';
        var grammarLabel = doc.createElement('span');
        grammarLabel.className = 'meta-label';
        grammarLabel.textContent = '语法重点';
        grammarItem.appendChild(grammarLabel);
        grammarItem.appendChild(doc.createTextNode(unit.grammar));
        meta.appendChild(grammarItem);
      }
      if (unit.task) {
        var taskItem = doc.createElement('span');
        taskItem.className = 'unit-meta-item';
        var taskLabel = doc.createElement('span');
        taskLabel.className = 'meta-label';
        taskLabel.textContent = '写作任务';
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(doc.createTextNode(unit.task));
        meta.appendChild(taskItem);
      }
      head.appendChild(meta);
    }
    el.appendChild(head);

    /* 〇、写作常用句型 */
    if (section.patterns.length) {
      var patternsBlock = doc.createElement('section');
      patternsBlock.className = 'patterns-block';
      patternsBlock.setAttribute('aria-label', 'Unit ' + unit.no + ' 写作常用句型');
      patternsBlock.appendChild(renderBlockTitle(
        '〇', '本单元写作常用句型',
        section.patterns.length, Array.isArray(unit.patterns) ? unit.patterns.length : section.patterns.length,
        '条'
      ));
      var grid = doc.createElement('div');
      grid.className = 'pattern-grid';
      section.patterns.forEach(function (pattern) {
        var original = Array.isArray(unit.patterns) ? unit.patterns.indexOf(pattern) : -1;
        var patternNo = original >= 0 ? original + 1 : section.patterns.indexOf(pattern) + 1;
        grid.appendChild(renderPatternCard(unit, pattern, patternNo));
      });
      patternsBlock.appendChild(grid);
      el.appendChild(patternsBlock);
    }

    /* 一、满分范文（A 组）；二、好背好文（B 组） */
    var groupEssays = { A: [], B: [] };
    section.essays.forEach(function (essay) {
      if (essay.group === 'A') groupEssays.A.push(essay);
      else if (essay.group === 'B') groupEssays.B.push(essay);
    });
    var unitEssays = Array.isArray(unit.essays) ? unit.essays : [];
    var totalA = unitEssays.filter(function (essay) { return essay.group === 'A'; }).length;
    var totalB = unitEssays.filter(function (essay) { return essay.group === 'B'; }).length;

    if (groupEssays.A.length) {
      var blockA = doc.createElement('section');
      blockA.className = 'essays-block group-a';
      blockA.setAttribute('aria-label', 'Unit ' + unit.no + ' 满分范文');
      blockA.appendChild(renderBlockTitle('一', '满分范文（A 组 · 冲刺满分）', groupEssays.A.length, totalA, '篇'));
      var listA = doc.createElement('div');
      listA.className = 'essay-list';
      groupEssays.A.forEach(function (essay) { listA.appendChild(renderEssayCard(essay)); });
      blockA.appendChild(listA);
      el.appendChild(blockA);
    }
    if (groupEssays.B.length) {
      var blockB = doc.createElement('section');
      blockB.className = 'essays-block group-b';
      blockB.setAttribute('aria-label', 'Unit ' + unit.no + ' 好背好文');
      blockB.appendChild(renderBlockTitle('二', '高分好背好文（B 组 · 基础必背）', groupEssays.B.length, totalB, '篇'));
      var listB = doc.createElement('div');
      listB.className = 'essay-list';
      groupEssays.B.forEach(function (essay) { listB.appendChild(renderEssayCard(essay)); });
      blockB.appendChild(listB);
      el.appendChild(blockB);
    }

    return el;
  }

  /* ---------------- 渲染主流程 ---------------- */

  function syncTargetClass() {
    if (!els.content) return;
    each(els.content.querySelectorAll('.is-target'), function (el) {
      el.classList.remove('is-target');
    });
    if (!currentTargetId) return;
    var card = $('u' + String(currentTargetId).replace(/^u/, ''));
    if (card) card.classList.add('is-target');
  }

  function setTarget(id) {
    currentTargetId = id || null;
    syncTargetClass();
  }

  function openAllDetails(open) {
    if (!els.content) return;
    each(els.content.querySelectorAll('details'), function (details) {
      details.open = Boolean(open);
    });
  }

  function applyExpandState() {
    if (state.expandAll) openAllDetails(true);
  }

  function render() {
    var sections = L.buildSections(DATA, { query: state.query, type: state.type });
    var frag = doc.createDocumentFragment();
    sections.forEach(function (section) {
      frag.appendChild(renderUnitSection(section));
    });
    els.content.textContent = '';
    els.content.appendChild(frag);

    var isEmpty = sections.length === 0;
    if (els.content) els.content.hidden = isEmpty;
    if (els.emptyState) els.emptyState.hidden = !isEmpty;

    updateResultCount(sections);
    updateClearButton();
    applyExpandState();
    syncTargetClass();
    setupUnitObserver();
    if (isEmpty) setActiveUnit('all');
    else scheduleSyncActive();
  }

  /* ---------------- 单元导航与滚动同步 ---------------- */

  function syncActiveFromViewport() {
    if (!els.content) return;
    var threshold = toolbarHeight() + 90;
    var active = 'all';
    each(els.content.querySelectorAll('.unit-section'), function (section) {
      var rect = section.getBoundingClientRect();
      if (rect.top <= threshold) active = Number(section.id.replace(/^u/, ''));
    });
    setActiveUnit(active);
  }

  function scheduleSyncActive() {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(function () {
      scrollFrame = 0;
      syncActiveFromViewport();
    });
  }

  function onScroll() {
    if (typeof window.IntersectionObserver !== 'function') scheduleSyncActive();
  }

  function setupUnitObserver() {
    if (!els.content) return;
    if (unitObserver) {
      unitObserver.disconnect();
      unitObserver = null;
    }
    if (typeof window.IntersectionObserver !== 'function') return;
    unitObserver = new window.IntersectionObserver(function (entries) {
      if (entries && entries.length) scheduleSyncActive();
    }, { rootMargin: '0px 0px -55% 0px', threshold: [0, 0.01] });
    each(els.content.querySelectorAll('.unit-section'), function (section) {
      unitObserver.observe(section);
    });
  }

  function scrollToUnit(value) {
    var top = 0;
    if (value === 'all' || value == null) {
      var contentTop = els.content.getBoundingClientRect().top + (window.pageYOffset || 0);
      top = contentTop - toolbarHeight() - 14;
    } else {
      var section = $('u' + value);
      if (!section) {
        // 单元被搜索/类型筛选藏住了：先放宽筛选，再定位
        resetFilters();
        section = $('u' + value);
      }
      if (!section) return;
      top = section.getBoundingClientRect().top + (window.pageYOffset || 0) - toolbarHeight() - 14;
    }
    window.scrollTo(0, Math.max(0, top));
    setActiveUnit(value === 'all' || value == null ? 'all' : Number(value));
  }

  /* ---------------- 筛选交互 ---------------- */

  function resetFilters() {
    state.query = '';
    state.type = '';
    if (els.searchInput) els.searchInput.value = '';
    if (els.typeSelect) els.typeSelect.value = '';
    render();
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

  /* ---------------- 深链 ---------------- */

  function handleHash() {
    if (!L) return;
    var info = L.parseHash(window.location.hash);
    if (!info) {
      setTarget(null);
      return;
    }
    var target = $(info.id);
    if (!target) {
      // 被当前搜索/类型筛选藏住了：自动放宽筛选
      resetFilters();
      target = $(info.id);
    }
    if (!target) {
      setTarget(null);
      return;
    }
    if (info.kind === 'essay') {
      setTarget(info.id);
      target.scrollIntoView({ block: 'center' });
    } else {
      setTarget(null);
      target.scrollIntoView({ block: 'start' });
    }
    setActiveUnit(info.unit);
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

  /* ---------------- 打印：展开全部 details ---------------- */

  function beforePrintHandler() {
    if (printOpenStates) return;
    printOpenStates = [];
    each(els.content.querySelectorAll('details'), function (details) {
      printOpenStates.push([details, details.open]);
      details.open = true;
    });
  }

  function afterPrintHandler() {
    if (!printOpenStates) return;
    printOpenStates.forEach(function (pair) {
      pair[0].open = pair[1];
    });
    printOpenStates = null;
  }

  /* ---------------- 事件 ---------------- */

  function onContentClick(event) {
    var target = event.target;
    if (!target || !target.closest) return;

    var copyEssayBtn = target.closest('.essay-copy');
    if (copyEssayBtn) {
      var essayId = copyEssayBtn.getAttribute('data-copy-essay');
      var essay = essayIndex[essayId];
      if (essay) copyText(L.essayCopyText(essay), '已复制范文正文');
      return;
    }

    var patternBtn = target.closest('.pattern-en');
    if (patternBtn) {
      var patternId = patternBtn.getAttribute('data-pattern-id');
      var pattern = patternIndex[patternId];
      if (pattern) copyText(L.patternCopyText(pattern), '已复制英文句型');
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
          applyQueryFromInput();
        }
      });
    }

    if (els.typeSelect) {
      on(els.typeSelect, 'change', function () {
        state.type = els.typeSelect.value || '';
        render();
      });
    }

    if (els.unitButtons) {
      on(els.unitButtons, 'click', function (event) {
        var target = event.target;
        var btn = target && target.closest ? target.closest('.unit-btn') : null;
        if (!btn) return;
        scrollToUnit(btn.getAttribute('data-unit') || 'all');
      });
    }

    if (els.hideCnToggle) {
      on(els.hideCnToggle, 'change', function () {
        state.hideCn = Boolean(els.hideCnToggle.checked);
        doc.body.classList.toggle('hide-cn', state.hideCn);
        updateStickyOffset();
      });
    }

    if (els.expandAllToggle) {
      on(els.expandAllToggle, 'change', function () {
        state.expandAll = Boolean(els.expandAllToggle.checked);
        openAllDetails(state.expandAll);
        updateStickyOffset();
      });
    }

    on(els.clearBtn, 'click', resetFilters);
    on(els.emptyClearBtn, 'click', resetFilters);
    on(els.printBtn, 'click', function () {
      window.print();
    });

    on(els.content, 'click', onContentClick);
    on(window, 'hashchange', handleHash);
    on(window, 'scroll', onScroll, { passive: true });
    on(window, 'beforeprint', beforePrintHandler);
    on(window, 'afterprint', afterPrintHandler);

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
    if (els.content) els.content.textContent = '';
    if (els.content) {
      var note = doc.createElement('p');
      note.className = 'fatal-note';
      note.textContent = '范文数据加载失败：请确认 ../assets/essays-g8b/data.js 可访问，且浏览器允许执行本地 JavaScript。';
      els.content.appendChild(note);
      els.content.hidden = false;
    }
    if (els.resultCount) els.resultCount.textContent = '数据加载失败';
  }

  /* ---------------- 启动 ---------------- */

  function init() {
    els.content = $('content');
    els.emptyState = $('empty-state');
    els.emptyClearBtn = $('empty-clear-btn');
    els.searchInput = $('search-input');
    els.typeSelect = $('type-select');
    els.unitButtons = $('unit-buttons');
    els.clearBtn = $('clear-btn');
    els.hideCnToggle = $('hide-cn-toggle');
    els.expandAllToggle = $('expand-all-toggle');
    els.resultCount = $('result-count');
    els.printBtn = $('print-btn');
    els.toolbarWrap = $('toolbar-wrap');
    els.toast = $('toast');
    els.statUnits = $('stat-units');
    els.statEssays = $('stat-essays');
    els.statPatterns = $('stat-patterns');
    els.statGroupA = $('stat-group-a');
    els.statGroupB = $('stat-group-b');
    els.statUpdated = $('stat-updated');
    els.subtitleEssays = $('subtitle-essays');
    els.subtitlePatterns = $('subtitle-patterns');
    els.leadPatterns = $('lead-patterns');
    els.leadA = $('lead-a');
    els.leadB = $('lead-b');
    els.bookEssays = $('book-essays');
    els.bookPatterns = $('book-patterns');
    els.footerUpdated = $('footer-updated');

    if (!DATA || !Array.isArray(DATA.units) || !L) {
      renderFatal();
      return;
    }

    stats = L.computeStats(DATA);
    essayIndex = L.buildEssayIndex(DATA);
    patternIndex = L.buildPatternIndex(DATA);

    fillMeta();
    renderUnitButtons();
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
