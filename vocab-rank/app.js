/* 词汇助记 · 难度考频排序 —— 依赖 data.js 的 window.VOCAB_RANK */
(function () {
  'use strict';
  var PAGE = 50;

  var $ = function (s, r) { return (r || document).querySelector(s); };

  var state = {
    all: [],
    list: [],
    page: 0,
    q: '',
    book: 0,
    sort: 'smart'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* 分数 → 5 星（返回 HTML） */
  function stars(score) {
    var n = Math.max(1, Math.min(5, Math.round(score / 20)));
    var out = '';
    for (var i = 0; i < 5; i++) out += i < n ? '★' : '<span class="off">☆</span>';
    return out;
  }

  /* 助记文本 → 带标签的 HTML */
  function memoHtml(mn) {
    if (!mn) return '';
    return mn.split('；').map(function (seg) {
      var m = /^【([^】]+)】([\s\S]*)$/.exec(seg.trim());
      if (!m) return esc(seg);
      return '<span class="mm-tag">' + esc(m[1]) + '</span>' + esc(m[2]);
    }).join('<br>');
  }

  function matches(e) {
    if (state.book && e.bn !== state.book) return false;
    if (!state.q) return true;
    var q = state.q;
    return (e.w + ' ' + e.m + ' ' + e.mn).toLowerCase().indexOf(q) >= 0;
  }

  function sortList(arr) {
    var a = arr.slice();
    if (state.sort === 'freq') {
      a.sort(function (x, y) { return y.fs - x.fs || x.w.localeCompare(y.w); });
    } else if (state.sort === 'diff') {
      a.sort(function (x, y) { return x.ds - y.ds || y.fs - x.fs; });
    } else if (state.sort === 'alpha') {
      a.sort(function (x, y) { return x.w.toLowerCase().localeCompare(y.w.toLowerCase()); });
    } else {
      a.sort(function (x, y) { return y.sc - x.sc || x.w.localeCompare(y.w); });
    }
    return a;
  }

  function apply() {
    state.list = sortList(state.all.filter(matches));
    state.page = 0;
    render();
  }

  function render() {
    var list = state.list;
    var total = list.length;
    var pages = Math.max(1, Math.ceil(total / PAGE));
    if (state.page >= pages) state.page = pages - 1;
    if (state.page < 0) state.page = 0;
    var start = state.page * PAGE;
    var slice = list.slice(start, start + PAGE);

    var meta = $('#rk-meta');
    if (meta) {
      meta.innerHTML = '共 <b>' + total.toLocaleString() + '</b> 词' +
        (state.q ? '（搜索：' + esc(state.q) + '）' : '') +
        ' · 第 ' + (total ? (state.page + 1) : 0) + ' / ' + (total ? pages : 0) + ' 页';
    }

    var wrap = $('#list');
    if (!wrap) return;
    if (!total) {
      wrap.innerHTML = '<div class="rk-empty"><h3>没有匹配的词</h3><p>试试换个关键词，或清空筛选。</p></div>';
      renderPager(0);
      return;
    }

    wrap.innerHTML = slice.map(function (e, i) {
      var no = start + i + 1;
      var badges = '';
      if (e.tg && e.tg.indexOf('功能词') >= 0) badges += '<span class="rk-badge is-func">功能词</span>';
      if (e.tg && e.tg.indexOf('缩写') >= 0) badges += '<span class="rk-badge is-func">缩写</span>';
      if (e.tg && e.tg.indexOf('短语') >= 0) badges += '<span class="rk-badge is-phrase">短语</span>';
      return '<article class="rk-item">' +
        '<div class="rk-head">' +
          '<span class="rk-no">' + no + '</span>' +
          '<span class="rk-word">' + esc(e.w) + '</span>' +
          (e.i ? '<span class="rk-ipa">' + esc(e.i) + '</span>' : '') +
          (e.p ? '<span class="rk-pos">' + esc(e.p) + '</span>' : '') +
          badges +
        '</div>' +
        '<div class="rk-body">' +
          '<div class="rk-mean">' + esc(e.m) + '</div>' +
          '<div class="rk-rank">' +
            '<span title="难度分 ' + e.ds + '（越低越简单）">难度 <i class="stars">' + stars(e.ds) + '</i></span>' +
            '<span title="考频分 ' + e.fs + '（越高越常考）">考频 <i class="stars">' + stars(e.fs) + '</i></span>' +
          '</div>' +
        '</div>' +
        (e.mn ? '<div class="rk-memo"><details><summary>助记</summary>' +
          '<div class="rk-memo-text">' + memoHtml(e.mn) + '</div></details></div>' : '') +
        '<div class="rk-src">' + esc(e.b) + (e.u ? ' · ' + esc(e.u) : '') + '</div>' +
        '</article>';
    }).join('');

    renderPager(pages);
  }

  function renderPager(pages) {
    var pager = $('#rk-pager');
    if (!pager) return;
    if (pages <= 1) { pager.innerHTML = ''; return; }
    var cur = state.page;
    var out = [];
    out.push('<button type="button" data-p="' + (cur - 1) + '"' + (cur === 0 ? ' disabled' : '') + '>上一页</button>');
    var nums = [];
    for (var i = 0; i < pages; i++) {
      if (i === 0 || i === pages - 1 || Math.abs(i - cur) <= 2) nums.push(i);
    }
    var prev = -1;
    nums.forEach(function (n) {
      if (prev >= 0 && n - prev > 1) out.push('<span class="gap">…</span>');
      out.push('<button type="button" data-p="' + n + '"' + (n === cur ? ' class="is-on"' : '') + '>' + (n + 1) + '</button>');
      prev = n;
    });
    out.push('<button type="button" data-p="' + (cur + 1) + '"' + (cur === pages - 1 ? ' disabled' : '') + '>下一页</button>');
    pager.innerHTML = out.join('');
  }

  function bind() {
    var q = $('#rk-search');
    if (q) {
      var t = 0;
      q.addEventListener('input', function () {
        clearTimeout(t);
        t = setTimeout(function () {
          state.q = q.value.trim().toLowerCase();
          apply();
        }, 160);
      });
    }
    var bk = $('#rk-book');
    if (bk) {
      bk.addEventListener('change', function () {
        state.book = Number(bk.value) || 0;
        apply();
      });
    }
    var so = $('#rk-sort');
    if (so) {
      so.addEventListener('change', function () {
        state.sort = so.value;
        apply();
      });
    }
    var cl = $('#rk-clear');
    if (cl) {
      cl.addEventListener('click', function () {
        state.q = ''; state.book = 0; state.sort = 'smart';
        if (q) q.value = '';
        if (bk) bk.value = '0';
        if (so) so.value = 'smart';
        apply();
      });
    }
    var pager = $('#rk-pager');
    if (pager) {
      pager.addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('button[data-p]') : null;
        if (!b || b.disabled) return;
        state.page = Number(b.getAttribute('data-p'));
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function boot() {
    if (!window.VOCAB_RANK || !window.VOCAB_RANK.entries) {
      $('#list').innerHTML = '<div class="rk-empty"><h3>词表加载失败</h3><p>请刷新页面重试。</p></div>';
      return;
    }
    var d = window.VOCAB_RANK;
    state.all = d.entries;
    window.VOCAB_RANK = null;

    /* 填册筛选项 */
    var bk = $('#rk-book');
    if (bk) {
      var books = [];
      var seen = {};
      state.all.forEach(function (e) {
        if (!seen[e.bn]) { seen[e.bn] = 1; books.push({ n: e.bn, b: e.b }); }
      });
      books.sort(function (a, b) { return a.n - b.n; });
      bk.insertAdjacentHTML('beforeend', books.map(function (x) {
        return '<option value="' + x.n + '">' + esc(x.b) + '</option>';
      }).join(''));
    }

    /* hero 统计 */
    var hs = $('#hero-stats');
    if (hs) {
      var n = state.all.length;
      hs.innerHTML = '<span><b>' + n.toLocaleString() + '</b> 词</span>' +
        '<span><b>6</b> 册</span>' +
        '<span>难度低 · 考频高优先</span>';
    }

    bind();
    apply();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
