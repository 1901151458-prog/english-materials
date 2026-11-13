/* 剑桥词典查词助手 —— 双击查词 / 选中浮条 / 词表图标
 * 无依赖；开关与词典偏好存 localStorage。
 * 用法：页面末尾加 <script src="{rel}assets/dict.js"></script>
 */
(function () {
  'use strict';
  if (window.__emDictLoaded) return;
  window.__emDictLoaded = true;

  var ON_KEY = 'em-dict-on';
  var LANG_KEY = 'em-dict-lang';
  var fromLS = function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } };
  var toLS = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };

  var state = {
    on: fromLS(ON_KEY, '1') !== '0',
    lang: fromLS(LANG_KEY, 'zh')       // zh = 英汉，en = 英英
  };

  var DICTS = {
    cambridge: {
      label: '剑桥',
      url: function (w) {
        return 'https://dictionary.cambridge.org/dictionary/' +
          (state.lang === 'en' ? 'english' : 'english-chinese-simplified') + '/' + w;
      }
    },
    youdao: {
      label: '有道',
      url: function (w) { return 'https://dict.youdao.com/result?word=' + encodeURIComponent(w) + '&lang=en'; }
    },
    bing: {
      label: '必应',
      url: function (w) { return 'https://cn.bing.com/dict/search?q=' + encodeURIComponent(w); }
    }
  };

  /* ---------- 文本处理 ---------- */
  var WORD_RE = /^[A-Za-z][A-Za-z'’\- .]{0,60}$/;

  function clean(s) {
    if (!s) return '';
    s = String(s).replace(/[\u200b-\u200d\ufeff]/g, '');
    s = s.replace(/[.,;:!?()\[\]{}<>"“”‘’«»…、，。；：！？（）【】《》]/g, ' ');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
  }

  function toSlug(s) {
    return s.toLowerCase().replace(/['’]/g, '').replace(/\s+/g, '-');
  }

  function usable(s) {
    if (!s) return false;
    if (!WORD_RE.test(s)) return false;
    var words = s.split(/\s+/);
    if (words.length > 5) return false;
    if (!/[A-Za-z]/.test(s)) return false;
    return true;
  }

  function open(word, which) {
    var w = toSlug(word);
    if (!w) return;
    var d = DICTS[which] || DICTS.cambridge;
    var url = d.url(w);
    var win = window.open(url, '_blank', 'noopener');
    if (win) { try { win.opener = null; } catch (e) {} }
  }

  /* ---------- 样式 ---------- */
  function injectStyle() {
    if (document.getElementById('em-dict-css')) return;
    var st = document.createElement('style');
    st.id = 'em-dict-css';
    st.textContent = [
      '.dict-fab{position:fixed;right:16px;bottom:16px;z-index:9990;display:flex;align-items:center;gap:6px;',
      'height:38px;padding:0 13px;border-radius:19px;border:1px solid var(--line,#e0e8f2);',
      'background:var(--card,#fff);color:var(--ink,#111);font:600 13px/1 system-ui,"Microsoft YaHei",sans-serif;',
      'box-shadow:0 6px 20px rgba(0,0,0,.18);cursor:pointer;user-select:none;transition:transform .15s,opacity .15s}',
      '.dict-fab:hover{transform:translateY(-2px)}',
      '.dict-fab[data-on="0"]{opacity:.62}',
      '.dict-fab .dict-dot{width:8px;height:8px;border-radius:50%;background:#1e5fa3}',
      '.dict-fab[data-on="0"] .dict-dot{background:#9aa7b8}',
      '.dict-bar{position:absolute;z-index:9992;display:none;gap:2px;padding:4px;border-radius:9px;',
      'border:1px solid var(--line,#e0e8f2);background:var(--card,#fff);box-shadow:0 8px 26px rgba(0,0,0,.24)}',
      '.dict-bar.is-on{display:flex}',
      '.dict-bar a{display:block;padding:6px 10px;border-radius:6px;color:var(--ink,#111);',
      'font:600 12.5px/1 system-ui,"Microsoft YaHei",sans-serif;text-decoration:none;white-space:nowrap;cursor:pointer}',
      '.dict-bar a:hover{background:color-mix(in srgb,var(--blue,#1e5fa3) 12%,transparent);color:var(--blue,#1e5fa3)}',
      '.dict-bar .dict-w{max-width:150px;overflow:hidden;text-overflow:ellipsis;color:var(--muted,#667);font-weight:500;',
      'padding:6px 8px 6px 6px;border-right:1px solid var(--line,#e0e8f2);margin-right:2px}',
      '.dict-icon{display:inline-flex;align-items:center;justify-content:center;margin-left:6px;',
      'width:20px;height:20px;border-radius:6px;text-decoration:none;vertical-align:-4px;',
      'color:var(--blue,#1e5fa3);background:color-mix(in srgb,var(--blue,#1e5fa3) 10%,transparent);',
      'opacity:.72;transition:opacity .12s,background .12s,transform .12s}',
      '.dict-icon:hover{opacity:1;background:color-mix(in srgb,var(--blue,#1e5fa3) 22%,transparent);transform:translateY(-1px)}',
      '.dict-icon svg{width:12px;height:12px;display:block}',
      '.dict-hint{position:fixed;right:16px;bottom:64px;z-index:9991;max-width:238px;',
      'padding:9px 12px;border-radius:11px;border:1px solid var(--line,#e0e8f2);background:var(--card,#fff);',
      'color:var(--ink,#111);box-shadow:0 10px 28px rgba(0,0,0,.22);cursor:pointer;',
      'font:500 12.5px/1.55 system-ui,"Microsoft YaHei",sans-serif;',
      'opacity:0;transform:translateY(8px);transition:opacity .28s ease,transform .28s ease}',
      '.dict-hint.is-on{opacity:1;transform:translateY(0)}',
      '.dict-hint b{font-weight:700;color:var(--blue,#1e5fa3)}',
      '.dict-hint .dict-hint-sub{display:block;margin-top:3px;font-size:11.5px;opacity:.68;font-weight:400}',
      '.dict-hint::after{content:"";position:absolute;right:24px;bottom:-5px;width:9px;height:9px;',
      'background:var(--card,#fff);border-right:1px solid var(--line,#e0e8f2);',
      'border-bottom:1px solid var(--line,#e0e8f2);transform:rotate(45deg)}',
      '.dict-hl{position:absolute;pointer-events:none;z-index:9993;border-radius:2px;',
      'border-bottom:1.6px dashed rgba(43,125,233,.65);transition:border-color .18s,background .18s}',
      '.dict-hl.is-solid{border-bottom-style:solid;border-bottom-color:var(--blue,#1e5fa3);',
      'background:color-mix(in srgb,var(--blue,#1e5fa3) 9%,transparent)}',
      '.dict-bubble{position:absolute;z-index:9994;pointer-events:none;padding:5px 10px;border-radius:8px;',
      'background:var(--card,#fff);color:var(--ink,#111);border:1px solid var(--line,#e0e8f2);',
      'box-shadow:0 8px 22px rgba(0,0,0,.24);font:600 12px/1.3 system-ui,"Microsoft YaHei",sans-serif;',
      'white-space:nowrap;transform:translateX(-50%);opacity:0;transition:opacity .14s}',
      '.dict-bubble.is-on{opacity:1}',
      '@media print{.dict-fab,.dict-bar,.dict-icon,.dict-hint,.dict-hl,.dict-bubble{display:none!important}}'
    ].join('');
    document.head.appendChild(st);
  }

  /* ---------- 右下角开关 ---------- */
  var fab = null;
  function mountFab() {
    if (fab || !document.body) return;
    fab = document.createElement('div');
    fab.className = 'dict-fab no-print';
    fab.setAttribute('role', 'button');
    fab.setAttribute('tabindex', '0');
    fab.title = '词典查词：双击英文单词，或选中短语点浮条。点击开关。';
    fab.innerHTML = '<span class="dict-dot"></span><span class="dict-txt"></span>';
    fab.addEventListener('click', function () {
      state.on = !state.on;
      toLS(ON_KEY, state.on ? '1' : '0');
      syncFab();
      if (!state.on) closeHint();
    });
    fab.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fab.click(); }
    });
    document.body.appendChild(fab);
    syncFab();
  }

  function syncFab() {
    if (!fab) return;
    fab.setAttribute('data-on', state.on ? '1' : '0');
    fab.querySelector('.dict-txt').textContent = state.on
      ? '词典 · ' + (state.lang === 'en' ? '英英' : '英汉')
      : '词典已关';
    fab.title = state.on
      ? '双击英文单词查词；选中短语出现浮条。点击关闭。'
      : '词典查词已关闭。点击开启。';
  }

  /* ---------- 首次访问提示 ---------- */
  var hintEl = null, hintTimer = 0;

  function closeHint() {
    if (!hintEl) return;
    clearTimeout(hintTimer);
    var el = hintEl;
    hintEl = null;
    el.classList.remove('is-on');
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 320);
  }

  function maybeShowHint() {
    if (!state.on) return;
    if (fromLS('em-dict-hint', '0') === '1') return;
    if (hintEl) return;
    toLS('em-dict-hint', '1');
    hintEl = document.createElement('div');
    hintEl.className = 'dict-hint no-print';
    hintEl.setAttribute('role', 'status');
    hintEl.innerHTML = '<b>双击</b>英文单词即可查剑桥词典' +
      '<span class="dict-hint-sub">选中短语还能选有道 / 必应 · 点此关闭</span>';
    hintEl.addEventListener('click', closeHint);
    document.body.appendChild(hintEl);
    requestAnimationFrame(function () { if (hintEl) hintEl.classList.add('is-on'); });
    hintTimer = setTimeout(closeHint, 5000);
  }

  /* ---------- 悬停标记（鼠标移到英文词上） ---------- */
  var hlEls = [], bubbleEl = null, hoverTimer = 0;
  var lastKey = '', lastMoveTs = 0;

  function isCoarse() {
    return !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
  }

  function caretAt(x, y) {
    if (document.caretRangeFromPoint) return document.caretRangeFromPoint(x, y);
    if (document.caretPositionFromPoint) {
      var pos = document.caretPositionFromPoint(x, y);
      if (!pos) return null;
      var r = document.createRange();
      try { r.setStart(pos.offsetNode, pos.offset); r.collapse(true); } catch (e) { return null; }
      return r;
    }
    return null;
  }

  /* 从鼠标落点找出完整英文单词 */
  var WORD_RE_HL = /[A-Za-z][A-Za-z'’\-]*/g;

  function wordAtCaret(cr) {
    if (!cr) return null;
    var node = cr.startContainer;
    if (!node || node.nodeType !== 3) return null;      /* 只处理纯文本节点 */
    var text = node.nodeValue || '';
    if (!text) return null;
    var off = cr.startOffset;
    WORD_RE_HL.lastIndex = 0;
    var m, hit = null;
    while ((m = WORD_RE_HL.exec(text))) {
      var st = m.index, en = st + m[0].length;
      if ((off >= st && off <= en) || (off - 1 >= st && off - 1 < en)) {
        hit = { s: st, e: en, w: m[0] };
        break;
      }
    }
    if (!hit || hit.w.length < 2) return null;          /* 单字母（a / I）不标记 */
    var r = document.createRange();
    try { r.setStart(node, hit.s); r.setEnd(node, hit.e); } catch (e) { return null; }
    return { range: r, word: hit.w, key: hit.w + '@' + hit.s };
  }

  function clearHover() {
    clearTimeout(hoverTimer);
    for (var i = 0; i < hlEls.length; i++) {
      if (hlEls[i].parentNode) hlEls[i].parentNode.removeChild(hlEls[i]);
    }
    hlEls = [];
    if (bubbleEl) bubbleEl.classList.remove('is-on');
    lastKey = '';
  }

  function paintHover(info) {
    clearHover();
    lastKey = info.key;
    var rects = info.range.getClientRects();
    if (!rects.length) return;

    var first = null;
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
      if (r.width < 1 || r.height < 1) continue;
      if (!first) first = r;
      var d = document.createElement('div');
      d.className = 'dict-hl no-print';
      d.style.left = (r.left + window.scrollX) + 'px';
      d.style.top = (r.top + window.scrollY) + 'px';
      d.style.width = r.width + 'px';
      d.style.height = r.height + 'px';
      document.body.appendChild(d);
      hlEls.push(d);
    }
    if (!first) return;

    if (!bubbleEl) {
      bubbleEl = document.createElement('div');
      bubbleEl.className = 'dict-bubble no-print';
      bubbleEl.textContent = '双击查词';
      document.body.appendChild(bubbleEl);
    }
    /* 气泡优先放词的下方，下方空间不足再放上方 */
    var cx = first.left + window.scrollX + first.width / 2;
    var below = first.bottom + window.scrollY + 7;
    var above = first.top + window.scrollY - 31;
    var roomBelow = first.bottom + 44 < window.innerHeight;
    bubbleEl.style.left = Math.max(52, Math.min(cx, (window.scrollX + window.innerWidth) - 52)) + 'px';
    bubbleEl.style.top = (roomBelow ? below : above) + 'px';
    bubbleEl.classList.add('is-on');

    /* 停留 120ms：虚线 → 实线，表示"确认可查" */
    hoverTimer = setTimeout(function () {
      for (var k = 0; k < hlEls.length; k++) hlEls[k].classList.add('is-solid');
    }, 120);
  }

  function onHoverMove(e) {
    if (!state.on) return;
    if (isCoarse()) return;
    if (e.buttons) { clearHover(); return; }            /* 拖选时不标记 */
    var t = e.target;
    if (inEditable(t) || t === fab || (fab && fab.contains(t)) ||
        (bar && bar.contains(t)) || (bubbleEl && bubbleEl.contains(t))) {
      clearHover();
      return;
    }
    var info = wordAtCaret(caretAt(e.clientX, e.clientY));
    if (!info) { clearHover(); return; }
    if (info.key === lastKey) return;
    paintHover(info);
  }

  function onHoverMoveThrottled(e) {
    var now = Date.now();
    if (now - lastMoveTs < 55) return;
    lastMoveTs = now;
    onHoverMove(e);
  }

  /* ---------- 选中浮条 ---------- */
  var bar = null, barWord = '', barTimer = 0;

  function mountBar() {
    if (bar || !document.body) return;
    bar = document.createElement('div');
    bar.className = 'dict-bar no-print';
    bar.innerHTML = '<span class="dict-w"></span>' +
      '<a data-d="cambridge">剑桥</a><a data-d="youdao">有道</a><a data-d="bing">必应</a>';
    bar.addEventListener('mousedown', function (e) { e.preventDefault(); e.stopPropagation(); });
    bar.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[data-d]') : null;
      if (!a) return;
      e.preventDefault();
      open(barWord, a.getAttribute('data-d'));
      hideBar();
    });
    document.body.appendChild(bar);
  }

  function showBar(word, x, y) {
    mountBar();
    barWord = word;
    bar.querySelector('.dict-w').textContent = word;
    bar.classList.add('is-on');
    var w = bar.offsetWidth || 230;
    var left = Math.max(8, Math.min(x - w / 2, window.innerWidth - w - 8));
    var top = y - bar.offsetHeight - 10;
    if (top < 8) top = y + 18;
    bar.style.left = left + window.scrollX + 'px';
    bar.style.top = top + window.scrollY + 'px';
  }

  function hideBar() {
    if (bar) bar.classList.remove('is-on');
    barWord = '';
  }

  function selectionRect(sel) {
    try {
      var r = sel.getRangeAt(0).getBoundingClientRect();
      if (r && (r.width || r.height)) return { x: r.left + r.width / 2, y: r.top };
    } catch (e) {}
    return null;
  }

  /* ---------- 事件 ---------- */
  function inEditable(node) {
    while (node && node !== document.body) {
      var tag = (node.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || node.isContentEditable) return true;
      node = node.parentNode;
    }
    return false;
  }

  function selectedWord() {
    var sel = window.getSelection ? window.getSelection() : null;
    if (!sel || sel.isCollapsed) return '';
    var raw = clean(sel.toString());
    return usable(raw) ? raw : '';
  }

  function bind() {
    /* 双击：直接打开剑桥 */
    document.addEventListener('dblclick', function (e) {
      if (!state.on) return;
      if (inEditable(e.target)) return;
      var sel = window.getSelection();
      var raw = clean(sel ? sel.toString() : '');
      if (!usable(raw)) return;
      /* 双击可能只选中一个词；若选区含中文则忽略 */
      e.preventDefault();
      closeHint();
      open(raw, 'cambridge');
      hideBar();
    }, true);

    /* 拖选：显示浮条 */
    document.addEventListener('mouseup', function (e) {
      if (!state.on) return;
      if (e.target === fab || (bar && bar.contains(e.target))) return;
      if (inEditable(e.target)) return;
      clearTimeout(barTimer);
      barTimer = setTimeout(function () {
        var word = selectedWord();
        if (!word) { hideBar(); return; }
        var sel = window.getSelection();
        var pos = sel ? selectionRect(sel) : null;
        showBar(word, pos ? pos.x : e.pageX, pos ? pos.y : e.pageY);
      }, 30);
    });

    /* 点击空白处收起浮条 */
    document.addEventListener('mousedown', function (e) {
      if (bar && bar.classList.contains('is-on') && !bar.contains(e.target)) hideBar();
    });

    /* 移动端（触屏）：选区变化后出现浮条。桌面端不介入，避免与 mouseup 抢定时器 */
    var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (coarse) {
      document.addEventListener('selectionchange', function () {
        if (!state.on) return;
        clearTimeout(barTimer);
        barTimer = setTimeout(function () {
          var word = selectedWord();
          if (!word) { hideBar(); return; }
          var sel = window.getSelection();
          var pos = sel ? selectionRect(sel) : null;
          if (pos) showBar(word, pos.x, pos.y);
        }, 260);
      });
    }

    /* 键盘：Ctrl/Cmd + 单击 也可以查 */
    document.addEventListener('click', function (e) {
      if (!state.on) return;
      if (!(e.ctrlKey || e.metaKey)) return;
      if (inEditable(e.target)) return;
      var raw = clean(window.getSelection ? window.getSelection().toString() : '');
      if (!usable(raw)) return;
      e.preventDefault();
      open(raw, 'cambridge');
    });
  }

  /* ---------- 词表页：给词头加图标 ---------- */
  function dictIcon(word) {
    var a = document.createElement('a');
    a.className = 'dict-icon no-print';
    a.href = DICTS.cambridge.url(toSlug(word));
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.title = '剑桥词典：' + word;
    a.setAttribute('aria-label', '查「' + word + '」的剑桥词典');
    a.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" ' +
      'stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/>' +
      '<path d="M15.5 15.5 21 21"/></svg>';
    return a;
  }

  function decorate() {
    var rows = document.querySelectorAll('tr.word-row');
    for (var i = 0; i < rows.length; i++) {
      var tr = rows[i];
      if (tr.getAttribute('data-dict') === '1') continue;
      var word = tr.getAttribute('data-word');
      if (!word) continue;
      var cell = tr.querySelector('.word-cell');
      if (!cell) continue;
      tr.setAttribute('data-dict', '1');
      cell.appendChild(dictIcon(word));
    }
  }

  var obs = null;
  function watchTable() {
    decorate();
    if (obs || !window.MutationObserver) return;
    obs = new MutationObserver(function () {
      clearTimeout(watchTable._t);
      watchTable._t = setTimeout(decorate, 120);
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  /* ---------- 启动 ---------- */
  function start() {
    injectStyle();
    mountFab();
    mountBar();
    bind();
    watchTable();
    /* 桌面端：鼠标悬停标记英文词 */
    if (!isCoarse()) {
      document.addEventListener('mousemove', onHoverMoveThrottled, { passive: true });
      document.addEventListener('scroll', clearHover, { passive: true });
      window.addEventListener('resize', clearHover);
      document.addEventListener('mouseleave', clearHover);
    }
    if (state.on) setTimeout(maybeShowHint, 900);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
