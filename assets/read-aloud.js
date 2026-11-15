/* 课文朗读 —— 每篇「朗读全文」（点单词发音由 speak.js 负责）
 * 仅在含 .s-en 的课文全解页自动启用；复用浏览器 TTS（英式发音）
 */
(function () {
  'use strict';
  if (window.__readAloudLoaded) return;
  window.__readAloudLoaded = true;

  var sents = document.querySelectorAll('.s-en');
  if (!sents.length) return;                       /* 非课文页，不启用 */
  if (typeof window.speechSynthesis === 'undefined' ||
      typeof window.SpeechSynthesisUtterance === 'undefined') return;

  var LANG = 'en-GB';
  var RATE = 0.9;

  var st = {
    playing: false,
    queue: [],
    idx: 0,
    btn: null,
    cur: null,
    stopped: false
  };

  /* ---------- TTS ---------- */
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

  function speak(text, onend) {
    try {
      window.speechSynthesis.cancel();
      var u = new window.SpeechSynthesisUtterance(String(text || ''));
      u.lang = LANG;
      u.rate = RATE;
      var v = pickVoice();
      if (v) u.voice = v;
      u.onend = function () { if (onend) onend(); };
      u.onerror = function () { if (onend) onend(); };
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) {
      if (onend) onend();
      return false;
    }
  }

  /* 去掉「Chen Jie:」这类说话人前缀 */
  function cleanText(p) {
    var c = p.cloneNode(true);
    var sp = c.querySelector('.speaker');
    if (sp) sp.parentNode.removeChild(sp);
    var t = (c.textContent || '').replace(/\s+/g, ' ').trim();
    return t;
  }

  /* ---------- 高亮 ---------- */
  function clearHi() {
    if (st.cur) {
      var item = st.cur.closest ? st.cur.closest('.sentence-item') : null;
      if (item) item.classList.remove('is-reading');
      st.cur.classList.remove('is-reading');
      st.cur = null;
    }
  }

  function setHi(p) {
    clearHi();
    st.cur = p;
    var item = p.closest ? p.closest('.sentence-item') : null;
    if (item) item.classList.add('is-reading');
    else p.classList.add('is-reading');
  }

  /* ---------- 单句朗读 ---------- */
  function speakOne(p) {
    stopAll(false);
    setHi(p);
    speak(cleanText(p), function () { clearHi(); });
  }

  /* ---------- 全文朗读 ---------- */
  function stopAll(clearBtn) {
    st.stopped = true;
    st.playing = false;
    try { window.speechSynthesis.cancel(); } catch (e) {}
    clearHi();
    if (clearBtn !== false && st.btn) {
      st.btn.textContent = '🔊 朗读全文';
      st.btn.classList.remove('is-playing');
    }
  }

  function playList(list, btn) {
    st.playing = true;
    st.stopped = false;
    st.queue = list;
    st.idx = 0;
    st.btn = btn;
    if (btn) { btn.textContent = '⏸ 停止'; btn.classList.add('is-playing'); }

    function next() {
      if (st.stopped) return;
      if (st.idx >= st.queue.length) {
        st.playing = false;
        clearHi();
        if (btn) { btn.textContent = '🔊 朗读全文'; btn.classList.remove('is-playing'); }
        return;
      }
      var p = st.queue[st.idx++];
      setHi(p);
      var ok = speak(cleanText(p), function () {
        if (st.stopped) return;
        setTimeout(next, 120);
      });
      if (!ok) { st.stopped = true; }
    }
    next();
  }

  /* ---------- 注入按钮 ---------- */
  function mountButtons() {
    var sections = document.querySelectorAll('.passage-section');
    for (var i = 0; i < sections.length; i++) {
      (function (sec) {
        var head = sec.querySelector('.passage-head');
        if (!head) return;
        if (head.querySelector('.ra-all')) return;
        var list = sec.querySelectorAll('.s-en');
        if (!list.length) return;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ra-all no-print';
        btn.textContent = '🔊 朗读全文';
        btn.setAttribute('aria-label', '朗读本篇文章全文');
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          if (st.playing && st.btn === btn) { stopAll(); return; }
          stopAll();
          playList(Array.prototype.slice.call(list), btn);
        });
        head.appendChild(btn);
      })(sections[i]);
    }
  }

  /* ---------- 绑定 ---------- */
  /* 页面离开时停掉声音 */
  window.addEventListener('pagehide', function () { stopAll(); });

  function init() {
    /* 只保留「朗读全文」按钮；单击句子读整句已取消，
       全站统一由 speak.js 只读被点击的单词 */
    mountButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
