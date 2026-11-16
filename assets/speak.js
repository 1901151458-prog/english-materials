/* 全站单击发音 —— 点击任意英文单词/句子即朗读（英式）
 *
 * 设计：
 *   - 事件委托（document click），对静态页、JS 渲染页同样有效
 *   - 单击任意英文位置 → 只读光标处的那个单词
 *   - 排除链接/按钮/输入框/词典浮条，避免误触
 *   - 课文页的「朗读全文」按钮仍由 read-aloud.js 负责
 *   - 复用 Chrome TTS 的坑规避：语音预热、cancel 后延迟、paused resume、
 *     音频设备切换检测、失败自动重试一次
 */
(function () {
  'use strict';
  if (window.__speakAllLoaded) return;
  window.__speakAllLoaded = true;

  var ttsOk = typeof window.speechSynthesis !== 'undefined' &&
              typeof window.SpeechSynthesisUtterance !== 'undefined';
  if (!ttsOk) return;

  /* 背单词页已有自己的发音逻辑（整句/连续读），不重复接管 */
  if (document.getElementById('type-input') || document.getElementById('word-card')) return;

  var LANG = 'en-GB';
  var RATE = 0.9;
  var timer = 0;

  /* ---------- 语音预热 ---------- */
  try {
    window.speechSynthesis.getVoices();
    if (window.speechSynthesis.addEventListener) {
      window.speechSynthesis.addEventListener('voiceschanged', function () {});
    } else {
      window.speechSynthesis.onvoiceschanged = function () {};
    }
  } catch (e) {}

  /* 音频输出设备切换（插耳机 / 连蓝牙音箱）后 Chrome 的 TTS 会话可能失效
     → 标记 needReset，下次发音前做更彻底的重置 */
  var needReset = false;
  try {
    if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
      navigator.mediaDevices.addEventListener('devicechange', function () {
        needReset = true;
        try {
          window.speechSynthesis.cancel();
          window.speechSynthesis.resume();
          window.speechSynthesis.getVoices();
        } catch (e) {}
      });
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

  var lastErr = '';

  function speak(text) {
    try {
      var synth = window.speechSynthesis;
      if (!text) return false;

      clearTimeout(timer);
      lastErr = '';

      /* 设备刚切换过 → 更彻底地重置引擎，并多等一会儿 */
      var delay = 150;
      if (needReset) {
        needReset = false;
        delay = 420;
        try {
          synth.cancel();
          synth.resume();
          synth.getVoices();      /* 重新拉取语音列表 */
        } catch (e) {}
      } else {
        /* 无条件清理队列：残留 utterance 会让后续 speak 静默失效 */
        try { synth.cancel(); } catch (e) {}
        try { synth.resume(); } catch (e) {}
      }

      /* cancel 后立即 speak 在 Chrome 上会被吞，延后执行 */
      timer = setTimeout(function () {
        var started = false;

        function attempt(n) {
          try {
            var u = new window.SpeechSynthesisUtterance(String(text));
            u.lang = LANG;
            u.rate = RATE;
            u.volume = 1;
            var v = pickVoice();
            if (v) u.voice = v;
            u.onstart = function () { started = true; };
            u.onerror = function (ev) { lastErr = (ev && ev.error) || 'unknown'; };
            synth.speak(u);
          } catch (e) {
            lastErr = String(e);
            return;
          }

          /* 900ms 内既没 onstart 也没在播报 → 重置后重试一次 */
          setTimeout(function () {
            if (started || synth.speaking || synth.pending) return;
            if (n < 1) {
              try { synth.cancel(); synth.resume(); } catch (e) {}
              setTimeout(function () { attempt(n + 1); }, 160);
            } else {
              finishFail();
            }
          }, 900);
        }

        function finishFail() {
          if (!lastErr && synth.getVoices && !synth.getVoices().length) lastErr = 'no-voice';
          if (lastErr === 'not-allowed') {
            toast('朗读被浏览器拦截：请先点一下页面空白处再试');
          } else if (lastErr === 'no-voice') {
            toast('未检测到英文语音包：请在系统设置中安装英语语音');
          } else {
            /* 最常见：切换音频设备后引擎卡住，刷新页面可恢复 */
            toast('没有声音：可能切换了音响/耳机，刷新页面即可恢复');
          }
        }

        attempt(0);
      }, delay);
      return true;
    } catch (e) { return false; }
  }

  /* 轻量提示条 */
  var toastEl = null, toastTimer = 0;
  function toast(msg) {
    if (!msg) return;
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'speak-toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 3600);
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

  /* 元素内第一个英文单词（caret 失败时的回退） */
  function firstWordIn(el) {
    if (!el) return '';
    var t = el.textContent || '';
    var m = /[A-Za-z][A-Za-z'\u2019\-]*/.exec(t);
    return m ? m[0] : '';
  }

  /* 只取光标处的单个英文单词 */
  function wordAt(text, off) {
    if (!text || !/[A-Za-z]/.test(text)) return '';
    var m, best = '', after = '';
    EN_WORD.lastIndex = 0;
    while ((m = EN_WORD.exec(text))) {
      if (off >= m.index && off <= m.index + m[0].length) { best = m[0]; break; }
      if (!after && m.index > off) after = m[0];
    }
    return best || after;
  }

  function englishAt(x, y, fallbackEl) {
    var range = caretRange(x, y);
    if (!range || !range.startContainer) {
      /* caret 取不到（某些元素 user-select:none / SVG 等）→ 回退到点击元素的文本 */
      return firstWordIn(fallbackEl);
    }
    var node = range.startContainer;
    if (!node) return firstWordIn(fallbackEl);

    /* 文本节点：读光标处单词 */
    if (node.nodeType === 3) {
      return wordAt(node.nodeValue || '', range.startOffset || 0);
    }

    /* 元素节点（点在空白/padding 上）：取该元素内第一个英文单词 */
    if (node.nodeType === 1) {
      var t = (node.textContent || '');
      var mm = /[A-Za-z][A-Za-z'’\-]*/.exec(t);
      return mm ? mm[0] : '';
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

    var text = englishAt(e.clientX, e.clientY, t);
    if (!text || !/[A-Za-z]/.test(text)) return;

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
