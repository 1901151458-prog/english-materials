/* 背单词（打字式）—— 依赖 ../assets/vocab-5-books/data.js 的 window.VOCAB_BOOK */
(function () {
  'use strict';

  var CHAPTER = 20;
  var LS_PROG = 'em-typing-prog';
  var LS_WRONG = 'em-typing-wrong';
  var LS_DAILY = 'em-typing-daily';
  var GOAL_OPTS = [10, 20, 30, 50];

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function lsGet(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var volCache = {};            /* 已加载的册完整数据 */

  var state = {
    book: null,
    index: null,
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
    accent: 'us',
    answered: false,
    warned: false,
    composing: false,
    streak: 0,
    maxStreak: 0,
    chapter: { index: 0, total: 1 }
  };

  var prog = lsGet(LS_PROG, {});
  var wrongBook = lsGet(LS_WRONG, {});
  var daily = lsGet(LS_DAILY, { goal: 20, days: {} });
  if (!daily.days) daily.days = {};
  if (!daily.goal) daily.goal = 20;
  var ACCENT_LS = 'em-typing-accent';
  state.accent = lsGet(ACCENT_LS, 'us') === 'uk' ? 'uk' : 'us';

  /* ---------- 数据 ---------- */
  /* 按需加载某一册的完整词条 */
  function loadVol(no, cb, onErr) {
    if (volCache[no]) return cb(volCache[no]);
    var s = document.createElement('script');
    s.src = 'data/v' + no + '.js';
    s.async = true;
    s.onload = function () {
      var d = window.TYPING_VOL;
      window.TYPING_VOL = null;
      if (!d) { if (onErr) onErr(); return; }
      volCache[no] = d;
      cb(d);
    };
    s.onerror = function () { if (onErr) onErr(); };
    document.head.appendChild(s);
  }

  function boot() {
    if (window.TYPING_INDEX && window.TYPING_INDEX.volumes) {
      state.index = window.TYPING_INDEX;
      state.book = window.TYPING_INDEX;
      state.volumes = window.TYPING_INDEX.volumes;
      renderHome();
      renderDaily();
      bindOnce();
      /* 支持 ?vol=1&unit=<unitId> 直达练习 */
      var q = new URLSearchParams(location.search);
      var qv = Number(q.get('vol'));
      var qu = q.get('unit');
      if (qv >= 1 && qv <= state.volumes.length && qu) {
        var homeVol = state.volumes[qv - 1];
        if (homeVol && homeVol.units.some(function (u) { return u.id === qu; })) {
          /* 走 startChapter：按 20 词分章 + 按需加载该册 */
          startChapter(qv - 1, qu, 0);
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
      var cnt = unitCount(u);
      var chTotal = Math.max(1, Math.ceil(cnt / CHAPTER));
      wordsTotal += cnt;
      var d = prog[key];
      if (d) {
        var chDone = Math.min(d.done || 0, chTotal);
        if (chDone >= chTotal) done++;
        var n = 0;
        for (var ci = 0; ci < chDone; ci++) n += Math.min(CHAPTER, cnt - ci * CHAPTER);
        wordsDone += n;
      }
    });
    return { units: totalUnits, doneUnits: done, words: wordsTotal, doneWords: wordsDone };
  }

  /* 单元词数：索引里的 unit 用 count，加载后的完整 unit 用 words.length */
  function unitCount(u) {
    if (typeof u.count === 'number') return u.count;
    return (u.words || []).length;
  }

  /* ---------- 每日目标 / 打卡 ---------- */
  function dateKey(d) {
    d = d || new Date();
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' + m : m) + '-' + (day < 10 ? '0' + day : day);
  }

  function addDaily(n) {
    var k = dateKey();
    var rec = daily.days[k] || { words: 0 };
    rec.words = (rec.words || 0) + n;
    daily.days[k] = rec;
    /* 只保留最近 120 天 */
    var keys = Object.keys(daily.days).sort();
    while (keys.length > 120) delete daily.days[keys.shift()];
    lsSet(LS_DAILY, daily);
    renderDaily();
  }

  function streakDays() {
    var n = 0, d = new Date(), i = 0;
    while (i < 400) {
      var rec = daily.days[dateKey(d)];
      var ok = rec && (rec.words || 0) >= daily.goal;
      if (i === 0) {
        if (ok) n++;                 /* 今天未达成不算断 */
      } else {
        if (!ok) break;
        n++;
      }
      d.setDate(d.getDate() - 1);
      i++;
    }
    return n;
  }

  function renderDaily() {
    var bar = $('#dc-bar'), cnt = $('#dc-count'), st = $('#dc-streak');
    if (!bar) return;
    var rec = daily.days[dateKey()] || { words: 0 };
    var w = rec.words || 0, goal = daily.goal || 20;
    var pct = Math.min(100, Math.round(w / goal * 100));
    bar.style.width = pct + '%';
    if (bar.parentNode) bar.parentNode.classList.toggle('is-done', w >= goal);
    if (cnt) cnt.textContent = w + ' / ' + goal + ' 词' + (w >= goal ? ' · 已达成 ✓' : '');
    if (st) st.textContent = '连续 ' + streakDays() + ' 天';
  }

  function cycleGoal() {
    var i = GOAL_OPTS.indexOf(daily.goal);
    daily.goal = GOAL_OPTS[(i + 1) % GOAL_OPTS.length];
    lsSet(LS_DAILY, daily);
    renderDaily();
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
        var cnt = unitCount(u);
        var chTotal = Math.max(1, Math.ceil(cnt / CHAPTER));
        var chDone = d ? Math.min(d.done || 0, chTotal) : 0;
        var cls = chDone >= chTotal ? 'unit-chip is-done' : 'unit-chip';
        return '<button class="' + cls + '" data-vol="' + vi + '" data-unit="' + u.id + '" ' +
          'title="' + esc(u.label) + ' · ' + cnt + ' 词">' +
          esc(u.label) + '<span class="uc-n">' + (chTotal > 1 ? chDone + '/' + chTotal + '章' : cnt + '词') + '</span></button>';
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
  function startChapter(volIndex, unitId, ch) {
    var volMeta = state.volumes[volIndex];
    var unitMeta = volMeta.units.filter(function (u) { return u.id === unitId; })[0];
    if (!unitMeta) return;
    var total = Math.max(1, Math.ceil(unitCount(unitMeta) / CHAPTER));
    ch = Math.max(0, Math.min(ch, total - 1));

    /* 第二次点同一单元时已缓存，不会重复加载 */
    loadVol(volMeta.no, function (vol) {
      var unit = vol.units.filter(function (u) { return u.id === unitId; })[0];
      if (!unit) return;
      startWords(vol, unit, unit.words.slice(ch * CHAPTER, ch * CHAPTER + CHAPTER),
        { index: ch, total: total });
    }, function () {
      alert('词库加载失败，请检查网络后重试');
    });
  }

  /* 点单元：多章时展开章节选择，单章直接开始 */
  function onUnitTap(volIndex, unitId, chipEl) {
    var vol = state.volumes[volIndex];
    var unit = vol.units.filter(function (u) { return u.id === unitId; })[0];
    if (!unit) return;
    var chapters = Math.max(1, Math.ceil(unitCount(unit) / CHAPTER));
    if (chapters <= 1) {
      clearChapterRows();
      startChapter(volIndex, unitId, 0);
      return;
    }
    toggleChapters(volIndex, unit, chipEl);
  }

  function clearChapterRows() {
    var all = document.querySelectorAll('.chapter-row');
    for (var i = 0; i < all.length; i++) all[i].parentNode.removeChild(all[i]);
  }

  function toggleChapters(volIndex, unit, chipEl) {
    var card = chipEl.closest ? chipEl.closest('.book-card') : null;
    if (!card) return;
    var existing = card.querySelector('.chapter-row');
    clearChapterRows();
    if (existing) return;                       /* 再点一次收起 */

    var cnt = unitCount(unit);
    var chapters = Math.max(1, Math.ceil(cnt / CHAPTER));
    var key = unitKey(state.volumes[volIndex], unit);
    var done = prog[key] ? Math.min(prog[key].done || 0, chapters) : 0;

    var row = document.createElement('div');
    row.className = 'chapter-row';
    for (var c = 0; c < chapters; c++) {
      var n = Math.min(CHAPTER, cnt - c * CHAPTER);
      var b = document.createElement('button');
      b.className = 'ch' + (c < done ? ' is-done' : '');
      b.setAttribute('data-ch', String(c));
      b.setAttribute('data-vol', String(volIndex));
      b.setAttribute('data-unit', unit.id);
      b.innerHTML = '第' + (c + 1) + ' 章' + (c < done ? ' ✓' : '') +
        '<span class="ch-n">' + n + ' 词</span>';
      row.appendChild(b);
    }
    card.appendChild(row);
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
    state.streak = 0;
    state.maxStreak = 0;
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
    state.view = name;
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
    state.warned = false;
    state.answered = false;
    inp.focus();

    $('#wc-feedback').innerHTML = '';
    $('#wc-memo').className = 'wc-memo';
    var ab = $('#btn-accent');
    if (ab) ab.textContent = '口音：' + (state.accent === 'uk' ? '英音' : '美音');

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

  /* ---------- 发音（浏览器自带 TTS） ---------- */
  var ttsOk = typeof window.speechSynthesis !== 'undefined' &&
              typeof window.SpeechSynthesisUtterance !== 'undefined';

  function pickVoice() {
    if (!ttsOk) return null;
    var want = state.accent === 'uk' ? 'en-GB' : 'en-US';
    var vs = [];
    try { vs = window.speechSynthesis.getVoices() || []; } catch (e) { return null; }
    if (!vs.length) return null;
    var exact = null, anyEn = null;
    for (var i = 0; i < vs.length; i++) {
      var lg = (vs[i].lang || '').replace('_', '-');
      if (!exact && lg === want) exact = vs[i];
      if (!anyEn && /^en/i.test(lg)) anyEn = vs[i];
      if (exact) break;
    }
    return exact || anyEn || null;
  }

  function speakWord(word) {
    if (!ttsOk || !word) return false;
    try {
      window.speechSynthesis.cancel();
      var u = new window.SpeechSynthesisUtterance(String(word).replace(/_/g, ' '));
      u.lang = state.accent === 'uk' ? 'en-GB' : 'en-US';
      u.rate = 0.88;
      u.pitch = 1;
      var v = pickVoice();
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }

  function speakCurrent() {
    var w = state.queue[state.idx];
    if (!w) return;
    var ok = speakWord(w.word);
    var fb = $('#wc-feedback');
    if (!ok && fb) {
      fb.innerHTML = '<span class="fb-hint">当前浏览器不支持朗读，可换 Chrome / Edge 试试</span>';
    }
  }

  function norm(s) {
    return String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  /* 输入判定：是答案前缀 → 正常输入中；偏离 → 只提示一次；完全匹配 → 通过 */
  function handleInput() {
    var w = state.queue[state.idx];
    if (!w || state.answered) return;
    var inp = $('#type-input');
    var val = norm(inp.value);
    var target = norm(w.word);

    /* 空输入：清掉一切状态 */
    if (!val) {
      inp.classList.remove('is-bad', 'is-good', 'is-typing');
      $('#wc-feedback').innerHTML = '';
      state.warned = false;
      return;
    }

    /* 完全正确 → 通过 */
    if (val === target) {
      state.answered = true;
      state.correct++;
      state.streak++;
      if (state.streak > state.maxStreak) state.maxStreak = state.streak;
      addDaily(1);
      inp.classList.remove('is-bad', 'is-typing');
      inp.classList.add('is-good');
      $('#wc-feedback').innerHTML = '<span class="fb-good">✓ 正确</span>';
      setTimeout(function () { state.idx++; renderPractice(); }, 260);
      return;
    }

    /* 是答案的前缀 → 正常打字中，不报错 */
    if (target.indexOf(val) === 0) {
      state.warned = false;                 /* 回到正确轨道，重置提示 */
      inp.classList.remove('is-bad', 'is-good');
      inp.classList.add('is-typing');
      $('#wc-feedback').innerHTML = '<span class="fb-hint">继续，还差 ' +
        (target.length - val.length) + ' 个字母</span>';
      return;
    }

    /* 偏离答案 → 只提示一次，不反复抖 */
    inp.classList.remove('is-typing', 'is-good');
    inp.classList.add('is-bad');
    if (!state.warned) {
      state.warned = true;
      var card = $('#word-card');
      card.classList.add('is-bad');
      setTimeout(function () { card.classList.remove('is-bad'); }, 340);
      registerWrong(w);                     /* 每个词只记一次错 */
    }
    showHint(w);
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
    var rec = wrongBook[k] || { count: 0, word: w.word, meaning: w.meaning, pos: w.pos, ipa: w.ipa,
      vol: state.unit ? state.unit.vol.name : '', volNo: state.unit ? state.unit.vol.no : 0 };
    if (!rec.volNo && state.unit && state.unit.vol) rec.volNo = state.unit.vol.no;
    rec.count++;
    rec.ts = Date.now();
    wrongBook[k] = rec;
    lsSet(LS_WRONG, wrongBook);
  }

  function giveUp() {
    var w = state.queue[state.idx];
    if (!w || state.answered) return;
    state.answered = true;
    state.streak = 0;
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
    state.warned = false;
    handleInput();
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
    if (state.unit && state.unit.unit && state.unit.unit.words) {
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
    var spd = sec > 3 ? Math.round(total / (sec / 60)) : 0;
    $('#res-speed').textContent = spd;
    $('#res-streak').textContent = state.maxStreak;

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

  /* ---------- 学习统计 ---------- */
  function renderStats() {
    var totalWords = 0, totalChapters = 0, accSum = 0, accN = 0;
    Object.keys(daily.days).forEach(function (k) { totalWords += (daily.days[k].words || 0); });
    Object.keys(prog).forEach(function (k) {
      var r = prog[k];
      totalChapters += (r.done || 0);
      if (r.best) { accSum += r.best; accN++; }
    });
    var avgAcc = accN ? Math.round(accSum / accN) : 0;
    var streak = streakDays();

    var ov = $('#stats-overview');
    if (ov) {
      ov.innerHTML = [
        box(totalWords, '累计练词'),
        box(totalChapters, '完成章节'),
        box(avgAcc + '%', '平均正确率'),
        box(streak, '连续打卡天')
      ].join('');
    }

    /* 最近 7 天柱状 */
    var chart = $('#stats-chart');
    if (chart) {
      var days = [], maxV = 1;
      for (var i = 6; i >= 0; i--) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        var key = dateKey(d);
        var rec = daily.days[key];
        var v = rec ? (rec.words || 0) : 0;
        if (v > maxV) maxV = v;
        days.push({ key: key, v: v, label: (d.getMonth() + 1) + '/' + d.getDate(), today: i === 0 });
      }
      chart.innerHTML = days.map(function (x) {
        var h = Math.max(3, Math.round(x.v / maxV * 88));
        return '<div class="chart-bar' + (x.today ? ' is-today' : '') + '">' +
          '<b>' + (x.v || '') + '</b>' +
          '<i style="height:' + h + 'px"></i>' +
          '<span>' + x.label + (x.today ? ' 今天' : '') + '</span></div>';
      }).join('');
    }

    /* 各册完成度 */
    var vols = $('#stats-vols');
    if (vols) {
      vols.innerHTML = state.volumes.map(function (vol) {
        var p = volProgress(vol);
        var pct = p.words ? Math.round(p.doneWords / p.words * 100) : 0;
        return '<div class="vol-progress">' +
          '<span class="vp-name">' + esc(vol.short) + '</span>' +
          '<span class="vp-bar"><i style="width:' + pct + '%"></i></span>' +
          '<span class="vp-num">' + p.doneWords + ' / ' + p.words + ' 词 · ' + pct + '%</span>' +
          '</div>';
      }).join('');
    }
  }

  function box(v, label) {
    return '<div class="stat-box"><div class="sv">' + v + '</div><div class="sl">' + label + '</div></div>';
  }

  /* ---------- 错词本视图 ---------- */
  function renderWrongBook() {
    var keys = Object.keys(wrongBook);
    var totalEl = $('#wb-total');
    if (totalEl) totalEl.textContent = keys.length;
    var list = $('#wrong-list');
    var actions = $('#wb-actions');
    if (!list) return;
    if (!keys.length) {
      list.innerHTML = '<div class="empty"><h3>错词本是空的</h3>' +
        '<p>练习中答错的词会自动收进这里，可以反复复习。</p></div>';
      if (actions) actions.style.display = 'none';
      return;
    }
    if (actions) actions.style.display = '';
    var items = keys.map(function (k) { return wrongBook[k]; });
    items.sort(function (a, b) { return (b.count || 1) - (a.count || 1); });
    list.innerHTML = items.map(function (r) {
      return '<div class="wrong-item">' +
        '<span class="wi-word">' + esc(r.word) + '</span>' +
        '<span class="wi-ipa">' + esc(r.ipa || '') + '</span>' +
        '<span class="wi-mean">' + esc(r.meaning || '') + '</span>' +
        '<span class="wi-count">错 ' + (r.count || 1) + ' 次</span>' +
        '<button class="wi-del" data-del="' + esc(String(r.word).toLowerCase()) + '" ' +
        'title="从错词本移除" aria-label="移除 ' + esc(r.word) + '">×</button>' +
        '</div>';
    }).join('');
  }

  /* ---------- 事件 ---------- */
  function bindOnce() {
    var app = $('#app');
    app.addEventListener('click', function (e) {
      /* 章节按钮 */
      var chBtn = e.target.closest ? e.target.closest('.ch') : null;
      if (chBtn) {
        startChapter(Number(chBtn.getAttribute('data-vol')),
          chBtn.getAttribute('data-unit'), Number(chBtn.getAttribute('data-ch')));
        return;
      }
      /* 错词单删 */
      var delBtn = e.target.closest ? e.target.closest('.wi-del') : null;
      if (delBtn) {
        var dk = delBtn.getAttribute('data-del');
        if (dk) {
          delete wrongBook[dk];
          lsSet(LS_WRONG, wrongBook);
          renderWrongBook();
          renderHome();
        }
        return;
      }
      /* 单元：多章展开章节选择，单章直接开始 */
      var chip = e.target.closest ? e.target.closest('.unit-chip') : null;
      if (chip) {
        onUnitTap(Number(chip.getAttribute('data-vol')), chip.getAttribute('data-unit'), chip);
        return;
      }
      var b = e.target.closest ? e.target.closest('[data-act]') : null;
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'back') { state.view = 'home'; clearChapterRows(); showView('home'); renderHome(); }
      else if (act === 'ipa') { state.showIpa = !state.showIpa; b.textContent = state.showIpa ? '隐藏音标' : '显示音标'; renderPractice(); }
      else if (act === 'speak') { speakCurrent(); }
      else if (act === 'accent') {
        state.accent = state.accent === 'us' ? 'uk' : 'us';
        lsSet(ACCENT_LS, state.accent);
        b.textContent = '口音：' + (state.accent === 'uk' ? '英音' : '美音');
        speakCurrent();
      }
      else if (act === 'hint') { hintFirst(); }
      else if (act === 'giveup') { giveUp(); }
      else if (act === 'wrongbook') {
        clearChapterRows();
        showView('wrong');
        renderWrongBook();
      }
      else if (act === 'review-all') { reviewWrong(); }
      else if (act === 'set-goal') { cycleGoal(); }
      else if (act === 'stats') { clearChapterRows(); showView('stats'); renderStats(); }
      else if (act === 'again') {
        var u = state.unit;
        if (!u || !u.unit) return;
        if (!u.unit.words) { reviewWrong(); return; }   /* 错词复习模式：重来一遍 */
        var t2 = Math.max(1, Math.ceil(u.unit.words.length / CHAPTER));
        var ci = Math.min(state.chapter.index, t2 - 1);
        startWords(u.vol, u.unit, u.unit.words.slice(ci * CHAPTER, ci * CHAPTER + CHAPTER),
          { index: ci, total: t2 });
      }
      else if (act === 'next') {
        var u2 = state.unit;
        if (!u2 || !u2.unit || !u2.unit.words) return;
        var t3 = Math.max(1, Math.ceil(u2.unit.words.length / CHAPTER));
        var ci2 = Math.min(state.chapter.index + 1, t3 - 1);
        startWords(u2.vol, u2.unit, u2.unit.words.slice(ci2 * CHAPTER, ci2 * CHAPTER + CHAPTER),
          { index: ci2, total: t3 });
      }
      else if (act === 'restart') {
        var u3 = state.unit;
        if (!u3 || !u3.unit) return;
        startChapter(u3.vol.no - 1, u3.unit.id, 0);
      }
      else if (act === 'home') { state.view = 'home'; clearChapterRows(); showView('home'); renderHome(); }
      else if (act === 'clear-wrong') {
        if (!confirm('确定清空全部错词吗？此操作不可撤销。')) return;
        wrongBook = {}; lsSet(LS_WRONG, wrongBook);
        renderHome();
        if (state.view === 'wrong') renderWrongBook();
      }
    });

    /* 点音标朗读 */
    var ipaEl = $('#wc-ipa');
    if (ipaEl) {
      ipaEl.style.cursor = 'pointer';
      ipaEl.addEventListener('click', function () { speakCurrent(); });
    }

    var inp = $('#type-input');

    /* 输入法组合期间不校验，避免拼音字母被误判为拼错 */
    inp.addEventListener('compositionstart', function () { state.composing = true; });
    inp.addEventListener('compositionend', function () {
      state.composing = false;
      handleInput();
    });

    inp.addEventListener('input', function () {
      var hasCJK = /[\u4e00-\u9fa5]/.test(inp.value);
      if (hasCJK) {
        inp.value = inp.value.replace(/[\u4e00-\u9fa5]/g, '');
        $('#wc-feedback').innerHTML = '<span class="fb-hint">请切换到英文输入法</span>';
      }
      if (state.composing) return;
      handleInput();
    });

    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (state.answered) return;
        var w = state.queue[state.idx];
        if (!w) return;
        var val = norm(inp.value);
        if (!val) {
          $('#wc-feedback').innerHTML = '<span class="fb-hint">先输入答案，或按 Tab 提示</span>';
          return;
        }
        if (val === norm(w.word)) { handleInput(); return; }
        /* 回车提交但不完整/不对：明确提示，记一次错 */
        if (!state.warned) { state.warned = true; registerWrong(w); }
        var card = $('#word-card');
        card.classList.add('is-bad');
        setTimeout(function () { card.classList.remove('is-bad'); }, 340);
        inp.classList.remove('is-typing');
        inp.classList.add('is-bad');
        $('#wc-feedback').innerHTML = '<span class="fb-bad">✗ 还没输对</span> <span class="fb-hint">' +
          (norm(w.word).indexOf(val) === 0 ? '继续输入，或按 Tab 提示' : '检查一下拼写，或按 Tab 提示') + '</span>';
      } else if (e.key === 'Tab') {
        e.preventDefault();
        hintFirst();
      } else if (e.key === 's' || e.key === 'S') {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          speakCurrent();
        }
      }
    });
    document.addEventListener('keydown', function (e) {
      if (state.view !== 'practice') return;
      if (e.key === 'Escape') { clearChapterRows(); showView('home'); renderHome(); }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
