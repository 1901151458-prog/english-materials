/* 短语与固定搭配总汇 —— 渲染、筛选、搜索、分页 */
(function () {
  'use strict';

  var D = window.PHRASE_DATA;
  if (!D) return;

  var PAGE_SIZE = 60;

  var state = {
    book: 'all',
    cat: 'all',
    val: 'A',
    kw: '',
    page: 1
  };

  var $ = function (id) { return document.getElementById(id); };
  var listEl = $('list');
  var pagerEl = $('pager');
  var countEl = $('ph-count');
  var bookRow = $('book-row');
  var catRow = $('cat-row');
  var searchEl = $('ph-q');
  var stTotal = $('st-total');

  if (stTotal) stTotal.textContent = (D.stats.tierA || D.stats.high || D.stats.total).toLocaleString('en-US');
  var stAll = $('st-all');
  if (stAll) stAll.textContent = D.stats.total.toLocaleString('en-US');
  var va = $('val-a-n'), vab = $('val-ab-n'), vall = $('val-all-n');
  if (va) va.textContent = (D.stats.tierA || 0);
  if (vab) vab.textContent = (D.stats.tierAB || 0);
  if (vall) vall.textContent = D.stats.total;

  /* ---------- 工具 ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function norm(s) {
    return String(s == null ? '' : s).toLowerCase();
  }

  /* ---------- 筛选按钮 ---------- */
  function buildBtn(label, count, attrs, onClick) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'ph-tab';
    b.innerHTML = esc(label) + (count != null ? '<span class="n">' + count + '</span>' : '');
    Object.keys(attrs || {}).forEach(function (k) {
      b.setAttribute(k, attrs[k]);
    });
    b.addEventListener('click', onClick);
    return b;
  }

  function buildFilters() {
    // 册
    bookRow.appendChild(buildBtn('全部册', D.stats.total, { 'data-book': 'all' }, function () {
      state.book = 'all'; state.page = 1; syncTabs(); render();
    }));
    D.books.forEach(function (b) {
      bookRow.appendChild(buildBtn(b.s, b.c, { 'data-book': b.k }, function () {
        state.book = b.k; state.page = 1; syncTabs(); render();
      }));
    });
    // 类型
    catRow.appendChild(buildBtn('全部类型', null, { 'data-cat': 'all' }, function () {
      state.cat = 'all'; state.page = 1; syncTabs(); render();
    }));
    D.cats.forEach(function (c) {
      catRow.appendChild(buildBtn(c.k, c.c, { 'data-cat': c.k }, function () {
        state.cat = c.k; state.page = 1; syncTabs(); render();
      }));
    });
  }

  function syncTabs() {
    Array.prototype.forEach.call(bookRow.children, function (b) {
      b.classList.toggle('is-on', b.getAttribute('data-book') === state.book);
    });
    Array.prototype.forEach.call(catRow.children, function (b) {
      b.classList.toggle('is-on', b.getAttribute('data-cat') === state.cat);
    });
  }

  /* ---------- 数据过滤 ---------- */
  function filtered() {
    var kw = norm(state.kw).trim();
    var kws = kw ? kw.split(/\s+/) : null;
    var out = [];
    var items = D.items;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (state.book !== 'all' && it[2] !== state.book) continue;
      if (state.cat !== 'all' && it[4] !== state.cat) continue;
      if (state.val === 'A' && it[8] !== 'A') continue;
      if (state.val === 'AB' && it[8] !== 'A' && it[8] !== 'B') continue;
      if (kws) {
        var hay = norm(it[0]) + ' ' + norm(it[1]);
        var ok = true;
        for (var j = 0; j < kws.length; j++) {
          if (hay.indexOf(kws[j]) === -1) { ok = false; break; }
        }
        if (!ok) continue;
      }
      out.push(it);
    }
    return out;
  }

  /* ---------- 渲染列表 ---------- */
  function render() {
    var rows = filtered();
    var total = rows.length;
    var pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (state.page > pages) state.page = pages;

    var start = (state.page - 1) * PAGE_SIZE;
    var slice = rows.slice(start, start + PAGE_SIZE);

    if (!slice.length) {
      listEl.innerHTML = '<div class="ph-empty">没有匹配的短语' +
        (state.kw ? '，试试更短的关键词' : '') + '</div>';
    } else {
      var html = slice.map(function (it) {
        var en = esc(it[0]);
        var cn = esc(it[1] || '—');
        var cat = esc(it[4]);
        var book = esc(it[3]);
        var src = esc(it[6]);
        return '<div class="ph-item">' +
          '<div class="ph-en">' + en + '</div>' +
          '<div class="ph-cn">' + cn + '</div>' +
          '<div class="ph-meta">' +
          (cat ? '<span class="ph-cat" data-c="' + cat + '">' + cat + '</span>' : '') +
          book + (src ? ' · ' + src : '') +
          '</div></div>';
      }).join('');
      listEl.innerHTML = html;
    }

    countEl.textContent = '共 ' + total + ' 条' + (pages > 1 ? '（第 ' + state.page + '/' + pages + ' 页）' : '');

    renderPager(pages);
  }

  /* ---------- 分页 ---------- */
  function renderPager(pages) {
    pagerEl.innerHTML = '';
    if (pages <= 1) return;

    function pageBtn(n, label, disabled) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ph-page' + (n === state.page ? ' is-on' : '');
      b.textContent = label || n;
      if (disabled) b.disabled = true;
      b.addEventListener('click', function () {
        if (disabled) return;
        state.page = n;
        render();
        listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return b;
    }

    pagerEl.appendChild(pageBtn(state.page - 1, '‹ 上一页', state.page === 1));

    var cur = state.page;
    var nums = [];
    if (pages <= 9) {
      for (var i = 1; i <= pages; i++) nums.push(i);
    } else {
      nums.push(1);
      if (cur > 3) nums.push('...');
      for (var p = Math.max(2, cur - 1); p <= Math.min(pages - 1, cur + 1); p++) nums.push(p);
      if (cur < pages - 2) nums.push('...');
      nums.push(pages);
    }
    nums.forEach(function (n) {
      if (n === '...') {
        var gap = document.createElement('span');
        gap.className = 'ph-gap';
        gap.textContent = '…';
        pagerEl.appendChild(gap);
      } else {
        pagerEl.appendChild(pageBtn(n));
      }
    });

    pagerEl.appendChild(pageBtn(state.page + 1, '下一页 ›', state.page === pages));
  }

  /* ---------- 搜索（防抖） ---------- */
  var timer = 0;
  searchEl.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      state.kw = searchEl.value;
      state.page = 1;
      render();
    }, 140);
  });

  /* ---------- 价值开关 ---------- */
  var valRow = $('val-row');
  if (valRow) {
    Array.prototype.forEach.call(valRow.querySelectorAll('[data-val]'), function (b) {
      b.addEventListener('click', function () {
        state.val = b.getAttribute('data-val');
        state.page = 1;
        Array.prototype.forEach.call(valRow.querySelectorAll('[data-val]'), function (x) {
          x.classList.toggle('is-on', x.getAttribute('data-val') === state.val);
        });
        render();
      });
    });
  }

  /* ---------- 初始化 ---------- */
  buildFilters();
  syncTabs();
  render();
})();
