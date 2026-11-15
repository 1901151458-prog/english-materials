/* 全站单击发音 —— 点击任意英文单词/句子即朗读（英式）
 *
 * 设计：
 *   - 事件委托（document click），对静态页、JS 渲染页同样有效
 *   - 纯英文文本节点 → 读整句；中英混排 → 读光标处的单词
 *   - 排除链接/按钮/输入框/词典浮条，避免误触
 *   - 课文页已有 read-aloud.js 的 .s-en/.g-sent/.d-sent 交给它处理，不重复读
 *   - 复用 Chrome TTS 的坑规避：语音预热、cancel 后延迟、paused resume
 */
(function () {
  'use strict';
  if (window.__speakAllLoaded) return;
  window.__speakAllLoaded = true;

  var ttsOk = typeof window.speechSynthesis !== 'undefined' &&
              typeof window.SpeechSynthesisUtterance !== 'undefined';
  if (!ttsOk) return;

  var LANG = 'en-GB';
  var RATE = 0.9;
  var timer = 0;
  var lastAt = 0;

  /* ---------- 语音预热 ---------- */
  try {
    window.speechSynthesis.getVoices();
    if (window.speechSynthesis.addEventListener) {
      window.speechSynthesis.addEventListener('voiceschanged', function () {});
    } else {
      window.speechSynthesis.onvoiceschanged = function () {};
    }
  } catch (e) {}

  function pickVoice() {
    var vs = [];
    try { vs = window.speechSynthesis.getVoices() || []; } catch (e) { return null; }
    if (!vs.length) return null;
    var exact = null, anyEn = null;
    for (var i = 0; i < vs.length; i++) {
      var lg = (vs[i].lang || '').replace('_', '-');
      if (!exact && lg === LANG) exact = vs[i];
      if (!anyEn && /^en/i.test(lg)) anyEn = vs[i];
      if (exact) break;
    }
    return exact || anyEn || null;
  }

  function speak(text) {
    try {
      var synth = window.speechSynthesis;
      var u = new window.SpeechSynthesisUtterance(String(text));
      u.lang = LANG;
      u.rate = RATE;
      var v = pickVoice();
      if (v) u.voice = v;

      if (synth.paused) { try { synth.resume(); } catch (e) {} }
      clearTimeout(timer);
      if (synth.speaking || synth.pending) {
        try { synth.cancel(); } catch (e) {}
        timer = setTimeout(function () {
          try { synth.speak(u); } catch (e) {}
        }, 60);
      } else {
        synth.speak(u);
      }
      return true;
    } catch (e) { return false; }
  }

  /* ---------- 取点击位置的文本 ---------- */
  function caretRange(x, y) {
    if (document.caretRangeFromPoint) return document.caretRangeFromPoint(x, y);
    if (document.caretPositionFromPoint) {
      var p = document.caretPositionFromPoint(x, y);
      if (p && p.offsetNode) {
        var r = document.createRange();
        try { r.setStart(p.offsetNode, p.offset); r.collapse(true); } catch (e) { return null; }
        return r;
      }
    }
    return null;
  }

  var EN_WORD = /[A-Za-z][A-Za-z'’\-]*/g;

  function isMostlyEnglish(s) {
    var en = (s.match(/[A-Za-z]/g) || []).length;
    var cn = (s.match(/[\u4e00-\u9fff]/g) || []).length;
    return en > 0 && cn === 0;
  }

  function englishAt(x, y) {
    var range = caretRange(x, y);
    if (!range) return '';
    var node = range.startContainer;
    if (!node) return '';

    /* 文本节点：判断纯英文 → 读整句；否则读光标处单词 */
    if (node.nodeType === 3) {
      var text = node.nodeValue || '';
      if (!/[A-Za-z]/.test(text)) return '';
      if (isMostlyEnglish(text)) return text.trim().slice(0, 320);

      var off = range.startOffset || 0;
      var m, best = '';
      EN_WORD.lastIndex = 0;
      while ((m = EN_WORD.exec(text))) {
        if (off >= m.index && off <= m.index + m[0].length) { best = m[0]; break; }
      }
      if (!best) {
        EN_WORD.lastIndex = 0;
        m = EN_WORD.exec(text);
        best = m ? m[0] : '';
      }
      return best;
    }

    /* 元素节点：仅当内容整体为英文时读 */
    if (node.nodeType === 1) {
      var t = (node.textContent || '').replace(/\s+/g, ' ').trim();
      if (t && t.length <= 320 && isMostlyEnglish(t)) return t;
    }
    return '';
  }

  /* ---------- 视觉反馈 ---------- */
  var fbEl = null, fbTimer = 0;
  function feedback(el) {
    if (!el || !el.classList) el = document.body;
    if (fbEl) fbEl.classList.remove('is-speaking');
    fbEl = el;
    el.classList.add('is-speaking');
    clearTimeout(fbTimer);
    fbTimer = setTimeout(function () {
      if (fbEl) fbEl.classList.remove('is-speaking');
      fbEl = null;
    }, 700);
  }

  /* ---------- 点击处理 ---------- */
  var SKIP = 'a, button, input, textarea, select, label, ' +
             '.dict-fab, .dict-bar, .dict-hint, .no-speak';

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented) return;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    var t = e.target;
    if (!t) return;
    if (t.closest && t.closest(SKIP)) return;

    /* 课文页的句子交给 read-aloud.js，避免读两遍 */
    if (t.closest && t.closest('.s-en, .g-sent, .d-sent')) return;

    /* 防抖：300ms 内重复点击忽略（双击选词、连点） */
    var now = Date.now();
    if (now - lastAt < 300) { lastAt = now; return; }
    lastAt = now;

    var text = englishAt(e.clientX, e.clientY);
    if (!text || !/[A-Za-z]{2,}/.test(text)) return;

    /* 选中的文字优先（用户拖选时不要打断） */
    var sel = window.getSelection ? window.getSelection().toString() : '';
    if (sel && sel.trim()) return;

    if (speak(text)) feedback(t);
  }, false);

  /* 页面离开停掉 */
  window.addEventListener('pagehide', function () {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  });
})();
