/* 背单词（打字式）—— 依赖 ../assets/vocab-5-books/data.js 的 window.VOCAB_BOOK */
(function () {
  'use strict';

  var CHAPTER = 20;
  var LS_PROG = 'em-typing-prog';
  var LS_WRONG = 'em-typing-wrong';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function lsGet(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var state = {
    book: null,
    volumes: [],
    view: 'home',
    volIndex: 0,
    unit: null,        // { vol, unit }
    queue: [],
    idx: 0,
    correct: 0,
    wrong: [],
    startTs: 0,
    showIpa: true,
    answered: false,
    chapter: { index: 0, total: 1 }
  };

  var prog = lsGet(LS_PROG, {});
  var wrongBook = lsGet(LS_WRONG, {});

  /* ---------- 数据 ---------- */
  function boot() {
    if (window.VOCAB_BOOK && window.VOCAB_BOOK.volumes) {
      state.book = window.VOCAB_BOOK;
      state.volumes = window.VOCAB_BOOK.volumes;
      renderHome();
      bindOnce();
      /* 支持 ?vol=1&unit=<unitId> 直达练习 */
      var q = new URLSearchParams(location.search);
      var qv = Number(q.get('vol'));
      var qu = q.get('unit');
      if (qv >= 1 && qv <= state.volumes.length && qu) {
        var homeVol = state.volumes[qv - 1];
        if (homeVol && homeVol.units.some(function (u) { return u.id === qu; })) {
          /* 走 startUnit，保证按 20 词分章 */
          startUnit(qv - 1, qu);
        }
      }
    } else {
      $('#app').innerHTML = '<div class="empty"><h3>词库加载失败</h3><p>请刷新页面重试。</p></div>';
    }
  }

  function volProgress(vol) {
    var totalUnits = vol.units.length;
    var done = 0, wordsTotal = 0, wordsDone = 0;
    vol.units.forEach(function (u) {
      var key = keyOf(vol.no, u.id);
      var chTotal = Math.max(1, Math.ceil(u.words.length / CHAPTER));
      wordsTotal += u.words.length;
      var d = prog[key];
      if (d) {
        var chDone = Math.min(d.done || 0, chTotal);
        if (chDone >= chTotal) done++;
        /* 已练词数按整章估算，末章按实际剩余 */
        var n = 0;
        for (var ci = 0; ci < chDone; ci++) n += Math.min(CHAPTER, u.words.length - ci * CHAPTER);
        wordsDone += n;
      }
    });
    return { units: totalUnits, doneUnits: done, words: wordsTotal, doneWords: wordsDone };
  }

  function keyOf(volNo, unitId) { return 'v' + volNo + '-' + unitId; }

  function unitKey(vol, unit) { return 'v' + vol.no + '-' + unit.id; }

  /* ---------- 选择页 ---------- */
  function renderHome() {
    var wrap = $('#book-grid');
    if (!wrap) return;
    var html = state.volumes.map(function (vol, vi) {
      var p = volProgress(vol);
      var pct = p.words ? Math.round(p.doneWords / p.words * 100) : 0;
      var chips = vol.units.map(function (u) {
        var key = unitKey(vol, u);
        var d = prog[key];
        var chTotal = Math.max(1, Math.ceil(u.words.length / CHAPTER));
        var chDone = d ? Math.min(d.done || 0, chTotal) : 0;
        var cls = chDone >= chTotal ? 'unit-chip is-done' : 'unit-chip';
        return '<button class="' + cls + '" data-vol="' + vi + '" data-unit="' + u.id + '" ' +
          'title="' + esc(u.label) + ' · ' + u.words.length + ' 词">' +
          esc(u.label) + '<span class="uc-n">' + (chTotal > 1 ? chDone + '/' + chTotal + '章' : u.words.length + '词') + '</span></button>';
      }).join('');
      return '<article class="book-card">' +
        '<h3><span class="bno">' + vol.no + '</span>' + esc(vol.name) + '</h3>' +
        '<p class="bmeta">' + vol.units.length + ' 单元 · ' + p.words + ' 词 · 已练 ' + p.doneWords + ' 词</p>' +
        '<div class="bprog"><i style="width:' + pct + '%"></i></div>' +
        '<div class="unit-chips">' + chips + '</div>' +
        '</article>';
    }).join('');
    wrap.innerHTML = html;
    var wb = $('#wrong-count');
    if (wb) {
      var n = Object.keys(wrongBook).length;
      wb.textContent = n;
      $('#btn-review').disabled = n === 0;
    }
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- 练习 ---------- */
  function startUnit(volIndex, unitId) {
    var vol = state.volumes[volIndex];
    var unit = vol.units.filter(function (u) { return u.id === unitId; })[0];
    if (!unit) return;
    var total = Math.max(1, Math.ceil(unit.words.length / CHAPTER));
    var key = unitKey(vol, unit);
    var done = prog[key] ? Math.min(prog[key].done || 0, total) : 0;
    var ch = Math.min(done, total - 1);
    var slice = unit.words.slice(ch * CHAPTER, ch * CHAPTER + CHAPTER);
    startWords(vol, unit, slice, { index: ch, total: total });
  }

  function startWords(vol, unit, words, chInfo) {
    state.volIndex = vol.no - 1;
    state.view = 'practice';
    state.unit = { vol: vol, unit: unit };
    state.chapter = chInfo || { index: 0, total: 1 };
    state.queue = words.slice();
    state.idx = 0;
    state.correct = 0;
    state.wrong = [];
    state.startTs = Date.now();
    state.answered = false;
    showView('practice');
    try {
      var url = new URL(location.href);
      url.searchParams.set('vol', String(vol.no));
      if (unit && unit.id) url.searchParams.set('unit', unit.id); else url.searchParams.delete('unit');
      history.replaceState(null, '', url.toString());
    } catch (e) {}
    $('#pt-title').textContent = vol.short + ' · ' + (unit ? unit.label : '全部');
    renderPractice();
    setTimeout(function () { var i = $('#type-input'); if (i) i.focus(); }, 60);
  }

  function showView(name) {
    $$('.view').forEach(function (v) { v.classList.toggle('is-on', v.id === 'view-' + name); });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderPractice() {
    var w = state.queue[state.idx];
    if (!w) return finish();
    state.answered = false;

    $('#wc-pos').textContent = w.pos || '';
    $('#wc-pos').style.display = w.pos ? 'inline-block' : 'none';
    $('#wc-mean').textContent = w.meaning || '';
    var ipa = $('#wc-ipa');
    ipa.textContent = w.ipa || '';
    ipa.classList.toggle('is-hidden', !state.showIpa || !w.ipa);

    var inp = $('#type-input');
    inp.value = '';
    inp.className = 'type-input';
    inp.disabled = false;
    inp.focus();

    $('#wc-feedback').innerHTML = '';
    $('#wc-memo').className = 'wc-memo';

    /* 进度 */
    var n = state.queue.length;
    $('#pbar-i').style.width = (state.idx / n * 100) + '%';
    $('#pt-count').textContent = (state.idx + 1) + ' / ' + n;
    updateStats();
  }

  function updateStats() {
    var done = state.idx;
    var acc = done ? Math.round(state.correct / done * 100) : 100;
    $('#pt-acc').textContent = acc + '%';
    var sec = Math.floor((Date.now() - state.startTs) / 1000);
    $('#pt-time').textContent = fmtTime(sec);
  }

  function fmtTime(s) {
    var m = Math.floor(s / 60), sec = s % 60;
    return (m ? m + ':' : '') + (sec < 10 && m ? '0' : '') + sec + '秒';
  }

  function norm(s) {
    return String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function checkTyped() {
    var w = state.queue[state.idx];
    if (!w || state.answered) return;
    var inp = $('#type-input');
    var val = norm(inp.value);
    if (!val) return;

    if (val === norm(w.word)) {
      /* 正确 */
      state.answered = true;
      state.correct++;
      inp.classList.add('is-good');
      $('#wc-feedback').innerHTML = '<span class="fb-good">✓ 正确</span>';
      setTimeout(function () { state.idx++; renderPractice(); }, 260);
    } else {
      /* 错误：抖动提示，允许继续修改（不推进） */
      var card = $('#word-card');
      card.classList.add('is-bad');
      inp.classList.add('is-bad');
      setTimeout(function () { card.classList.remove('is-bad'); }, 340);
      setTimeout(function () { inp.classList.remove('is-bad'); }, 500);
      registerWrong(w);
      showHint(w);
    }
  }

  function showHint(w) {
    var target = w.word;
    var typed = norm($('#type-input').value);
    var fb = $('#wc-feedback');
    if (!fb) return;
    var shown = '';
    for (var i = 0; i < typed.length && i < target.length; i++) {
      if (typed[i] === target.toLowerCase()[i]) shown += target[i];
      else break;
    }
    var rest = target.slice(shown.length);
    if (typed.length > shown.length) {
      fb.innerHTML = '<span class="fb-bad">✗ 拼写不对</span>' +
        (shown ? ' <span class="fb-hint">已对：' + esc(shown) + '</span>' : '');
    } else {
      fb.innerHTML = '<span class="fb-hint">再想想，' + esc(target.length) + ' 个字母' +
        (shown ? '，开头 ' + esc(shown) : '') + '</span>';
    }
  }

  function registerWrong(w) {
    var exists = state.wrong.filter(function (x) { return x.word === w.word; });
    if (!exists.length) state.wrong.push(w);
    var k = w.word.toLowerCase();
    var rec = wrongBook[k] || { count: 0, word: w.word, meaning: w.meaning, pos: w.pos, ipa: w.ipa, vol: state.unit ? state.unit.vol.name : '' };
    rec.count++;
    rec.ts = Date.now();
    wrongBook[k] = rec;
    lsSet(LS_WRONG, wrongBook);
  }

  function giveUp() {
    var w = state.queue[state.idx];
    if (!w || state.answered) return;
    state.answered = true;
    registerWrong(w);
    var inp = $('#type-input');
    inp.value = w.word;
    inp.classList.add('is-bad');
    inp.disabled = true;
    $('#wc-feedback').innerHTML = '<span class="fb-bad">✗ 正确答案</span> <b style="color:var(--ink)">' +
      esc(w.word) + '</b>';
    showMemo(w);
    setTimeout(function () { state.idx++; renderPractice(); }, 1500);
  }

  function hintFirst() {
    var w = state.queue[state.idx];
    if (!w) return;
    var first = w.word.charAt(0);
    $('#wc-feedback').innerHTML = '<span class="fb-hint">提示：以 ' + esc(first) + ' 开头，' +
      esc(w.word.length) + ' 个字母</span>';
    var inp = $('#type-input');
    inp.value = first;
    inp.focus();
  }

  function showMemo(w) {
    if (!w.mnemonic || !w.mnemonic.length) return;
    var box = $('#wc-memo');
    box.innerHTML = w.mnemonic.map(function (m) {
      return '<span class="mm-tag">' + esc(m.tag) + '</span>' + esc(m.text);
    }).join('<br>');
    box.classList.add('is-on');
  }

  /* ---------- 完成 ---------- */
  function finish() {
    var total = state.queue.length;
    var wrongN = state.wrong.length;
    var acc = total ? Math.round((total - wrongN) / total * 100) : 100;
    var sec = Math.round((Date.now() - state.startTs) / 1000);

    /* 记录进度 */
    if (state.unit) {
      var key = unitKey(state.unit.vol, state.unit.unit);
      var rec = prog[key] || { done: 0, best: 0, total: total };
      rec.done = Math.max(rec.done || 0, state.chapter.index + 1);
      rec.chapters = state.chapter.total;
      rec.size = state.chapter.index === 0 || !rec.size ? total : rec.size;
      rec.best = Math.max(rec.best || 0, acc);
      rec.ts = Date.now();
      prog[key] = rec;
      lsSet(LS_PROG, prog);
    }

    var chTxt = state.chapter.total > 1
      ? '第 ' + (state.chapter.index + 1) + ' / ' + state.chapter.total + ' 章'
      : '';
    $('#res-title').textContent = acc === 100 ? '全部正确 🎉' : '这一章完成';
    $('#res-sub').textContent = (state.unit ? state.unit.vol.short + ' · ' + state.unit.unit.label : '') +
      (chTxt ? ' · ' + chTxt : '') + ' · 共 ' + total + ' 词';
    var nextBtn = $('#res-next');
    if (nextBtn) {
      var hasNext = state.chapter.index + 1 < state.chapter.total;
      nextBtn.style.display = hasNext ? '' : 'none';
      nextBtn.textContent = hasNext ? '下一章 →' : '';
    }
    $('#res-acc').textContent = acc + '%';
    $('#res-wrong').textContent = wrongN;
    $('#res-time').textContent = fmtTime(sec);

    var wl = $('#res-wrong-list');
    if (wrongN) {
      wl.innerHTML = state.wrong.map(function (w) {
        return '<span title="' + esc(w.meaning) + '">' + esc(w.word) + '</span>';
      }).join('');
      $('#res-wrong-wrap').style.display = 'block';
    } else {
      $('#res-wrong-wrap').style.display = 'none';
    }
    showView('result');
    renderHome();
  }

  /* ---------- 复习错词 ---------- */
  function reviewWrong() {
    var keys = Object.keys(wrongBook);
    if (!keys.length) return;
    var words = keys.map(function (k) {
      var r = wrongBook[k];
      return { word: r.word, meaning: r.meaning, pos: r.pos, ipa: r.ipa, mnemonic: [] };
    });
    /* 按错误次数降序，取前 20 */
    words.sort(function (a, b) {
      return (wrongBook[b.word.toLowerCase()] || {}).count - (wrongBook[a.word.toLowerCase()] || {}).count;
    });
    startWords({ no: 1, short: '错词复习', name: '错词复习' },
      { id: '__wrong__', label: '错词复习' }, words.slice(0, CHAPTER));
  }

  function clearWrong(k) { delete wrongBook[k]; lsSet(LS_WRONG, wrongBook); }

  /* ---------- 事件 ---------- */
  function bindOnce() {
    var app = $('#app');
    app.addEventListener('click', function (e) {
      var chip = e.target.closest ? e.target.closest('.unit-chip') : null;
      if (chip) {
        startUnit(Number(chip.getAttribute('data-vol')), chip.getAttribute('data-unit'));
        return;
      }
      var b = e.target.closest ? e.target.closest('[data-act]') : null;
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'back') { state.view = 'home'; showView('home'); renderHome(); }
      else if (act === 'ipa') { state.showIpa = !state.showIpa; b.textContent = state.showIpa ? '隐藏音标' : '显示音标'; renderPractice(); }
      else if (act === 'hint') { hintFirst(); }
      else if (act === 'giveup') { giveUp(); }
      else if (act === 'review') { reviewWrong(); }
      else if (act === 'again') {
        var u = state.unit;
        if (!u || !u.unit) return;
        var t2 = Math.max(1, Math.ceil(u.unit.words.length / CHAPTER));
        var ci = Math.min(state.chapter.index + 1, t2 - 1);
        startWords(u.vol, u.unit, u.unit.words.slice(ci * CHAPTER, ci * CHAPTER + CHAPTER),
          { index: ci, total: t2 });
      }
      else if (act === 'next') {
        var u2 = state.unit;
        if (!u2 || !u2.unit) return;
        var t3 = Math.max(1, Math.ceil(u2.unit.words.length / CHAPTER));
        var ci2 = Math.min(state.chapter.index + 1, t3 - 1);
        startWords(u2.vol, u2.unit, u2.unit.words.slice(ci2 * CHAPTER, ci2 * CHAPTER + CHAPTER),
          { index: ci2, total: t3 });
      }
      else if (act === 'restart') {
        var u3 = state.unit;
        if (!u3 || !u3.unit) return;
        startUnit(u3.vol.no - 1, u3.unit.id);
      }
      else if (act === 'home') { showView('home'); renderHome(); }
      else if (act === 'clear-wrong') {
        wrongBook = {}; lsSet(LS_WRONG, wrongBook); renderHome();
        alert('错词本已清空');
      }
    });

    var inp = $('#type-input');
    inp.addEventListener('input', function () {
      /* 输入法可能带中文，直接过滤提示 */
      var hasCJK = /[\u4e00-\u9fa5]/.test(inp.value);
      if (hasCJK) {
        inp.value = inp.value.replace(/[\u4e00-\u9fa5]/g, '');
        $('#wc-feedback').innerHTML = '<span class="fb-hint">请切换到英文输入法</span>';
      }
      if (!state.answered) checkTyped();
    });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (state.answered) return;
        if (!inp.value.trim()) {
          $('#wc-feedback').innerHTML = '<span class="fb-hint">先输入答案，或按 Tab 提示</span>';
          return;
        }
        /* Enter 强制校验一次（若已正确会自动推进） */
        checkTyped();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        hintFirst();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (state.view !== 'practice') return;
      if (e.key === 'Escape') { state.view = 'home'; showView('home'); renderHome(); }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
