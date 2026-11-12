/* 七上数词介词专项 · 练习交互 */
(function () {
  "use strict";

  var DATA = window.G7A_NUMBERS;
  if (!DATA || !Array.isArray(DATA.questions)) return;

  var LEVELS = DATA.levels;
  var QUESTIONS = DATA.questions;
  var STORE_KEY = "g7a-numbers-progress-v1";
  var LETTERS = ["A", "B", "C", "D"];
  var state = {
    filter: "all",
    onlyUnanswered: false,
    revealAll: false,
    answers: {}
  };

  var els = {
    tabs: document.getElementById("level-tabs"),
    list: document.getElementById("quiz-list"),
    done: document.getElementById("progress-done"),
    correct: document.getElementById("progress-correct"),
    onlyUnanswered: document.getElementById("only-unanswered"),
    reset: document.getElementById("reset-btn"),
    showAnswers: document.getElementById("show-answers"),
    empty: document.getElementById("empty-state"),
    print: document.getElementById("print-btn")
  };

  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      if (saved && typeof saved === "object" && !Array.isArray(saved)) state.answers = saved;
    } catch (e) { state.answers = {}; }
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state.answers)); } catch (e) {}
  }

  function levelOf(id) {
    for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].id === id) return LEVELS[i];
    return { id: id, name: "第 " + id + " 级", short: String(id) };
  }

  function questionById(id) {
    for (var i = 0; i < QUESTIONS.length; i++) if (QUESTIONS[i].id === id) return QUESTIONS[i];
    return null;
  }

  function stats() {
    var done = 0, correct = 0;
    QUESTIONS.forEach(function (q) {
      var choice = state.answers[q.id];
      if (typeof choice === "number") {
        done += 1;
        if (choice === q.answer) correct += 1;
      }
    });
    return { done: done, correct: correct, total: QUESTIONS.length };
  }

  function renderTabs() {
    if (!els.tabs) return;
    els.tabs.innerHTML = "";
    var all = document.createElement("button");
    all.type = "button";
    all.className = "level-tab" + (state.filter === "all" ? " is-on" : "");
    all.setAttribute("aria-pressed", state.filter === "all" ? "true" : "false");
    all.innerHTML = "全部<span class=\"tab-count\">" + QUESTIONS.length + "</span>";
    all.addEventListener("click", function () { state.filter = "all"; render(); });
    els.tabs.appendChild(all);

    LEVELS.forEach(function (level) {
      var count = QUESTIONS.filter(function (q) { return q.level === level.id; }).length;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "level-tab" + (state.filter === String(level.id) ? " is-on" : "");
      btn.setAttribute("aria-pressed", state.filter === String(level.id) ? "true" : "false");
      btn.innerHTML = level.short + "<span class=\"tab-count\">" + count + "</span>";
      btn.title = level.name;
      btn.addEventListener("click", function () { state.filter = String(level.id); render(); });
      els.tabs.appendChild(btn);
    });
  }

  function makeOption(q, index, answeredChoice, revealed) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "q-option";
    btn.setAttribute("data-index", String(index));

    var letter = document.createElement("span");
    letter.className = "opt-letter";
    letter.textContent = LETTERS[index] || String(index + 1);
    var text = document.createElement("span");
    text.className = "opt-text";
    text.textContent = q.options[index];
    btn.appendChild(letter);
    btn.appendChild(text);

    var isPicked = answeredChoice === index;
    var isRight = index === q.answer;
    if (isPicked) btn.classList.add("is-picked");
    if (answeredChoice !== undefined || revealed) {
      btn.disabled = true;
      if (isRight) btn.classList.add("is-right");
      else if (isPicked) btn.classList.add("is-wrong");
    }
    btn.setAttribute("aria-pressed", isPicked ? "true" : "false");
    return btn;
  }

  function makeCard(q) {
    var answeredChoice = state.answers[q.id];
    var answered = typeof answeredChoice === "number";
    var revealed = state.revealAll;
    var level = levelOf(q.level);

    var card = document.createElement("article");
    card.className = "q-card";
    card.id = "q-" + q.id;
    card.setAttribute("role", "group");
    card.setAttribute("aria-labelledby", "stem-" + q.id);
    if (answered) card.classList.add(answeredChoice === q.answer ? "is-correct" : "is-wrong");

    var top = document.createElement("div");
    top.className = "q-top";
    var no = document.createElement("span");
    no.className = "q-no";
    no.textContent = "第 " + (QUESTIONS.indexOf(q) + 1) + " 题";
    var tag = document.createElement("span");
    tag.className = "q-tag";
    tag.textContent = level.short;
    var result = document.createElement("span");
    result.className = "q-result";
    if (answered) result.textContent = answeredChoice === q.answer ? "✓ 正确" : "✗ 错误";
    else if (revealed) result.textContent = "答案";
    top.appendChild(no);
    top.appendChild(tag);
    top.appendChild(result);

    var stem = document.createElement("p");
    stem.className = "q-stem";
    stem.id = "stem-" + q.id;
    stem.textContent = q.stem;

    var opts = document.createElement("div");
    opts.className = "q-options";
    for (var i = 0; i < q.options.length; i++) {
      opts.appendChild(makeOption(q, i, answeredChoice, revealed));
    }

    card.appendChild(top);
    card.appendChild(stem);
    card.appendChild(opts);

    if (answered || revealed) {
      var exp = document.createElement("p");
      exp.className = "q-explain";
      exp.innerHTML = "<b>答案：" + (LETTERS[q.answer] || q.answer) + "</b> " + q.explain;
      card.appendChild(exp);
    }

    if (!answered) {
      opts.addEventListener("click", function (event) {
        var btn = event.target.closest ? event.target.closest(".q-option") : null;
        if (!btn) return;
        var idx = Number(btn.getAttribute("data-index"));
        if (isNaN(idx) || state.answers[q.id] !== undefined) return;
        state.answers[q.id] = idx;
        save();
        render();
      });
    }
    return card;
  }

  function visibleQuestions() {
    var list = QUESTIONS.slice();
    if (state.filter !== "all") list = list.filter(function (q) { return String(q.level) === state.filter; });
    if (state.onlyUnanswered) list = list.filter(function (q) { return state.answers[q.id] === undefined; });
    return list;
  }

  function render() {
    renderTabs();
    if (els.onlyUnanswered) els.onlyUnanswered.checked = state.onlyUnanswered;
    if (els.showAnswers) {
      els.showAnswers.textContent = state.revealAll ? "隐藏全部解析" : "显示全部解析";
      els.showAnswers.setAttribute("aria-pressed", state.revealAll ? "true" : "false");
    }
    var list = visibleQuestions();
    if (els.list) {
      els.list.innerHTML = "";
      var currentLevel = null;
      var block = null;
      list.forEach(function (q) {
        if (state.filter === "all" && currentLevel !== q.level) {
          currentLevel = q.level;
          var level = levelOf(q.level);
          var head = document.createElement("div");
          head.className = "level-heading";
          var h3 = document.createElement("h3");
          h3.textContent = level.name;
          var span = document.createElement("span");
          span.textContent = "共 " + QUESTIONS.filter(function (x) { return x.level === q.level; }).length + " 题";
          head.appendChild(h3);
          head.appendChild(span);
          els.list.appendChild(head);
          block = document.createElement("div");
          block.className = "level-block";
          els.list.appendChild(block);
        } else if (!block) {
          block = document.createElement("div");
          block.className = "level-block";
          els.list.appendChild(block);
        }
        block.appendChild(makeCard(q));
      });
    }
    if (els.empty) els.empty.hidden = list.length !== 0;
    var s = stats();
    if (els.done) els.done.textContent = String(s.done);
    if (els.correct) els.correct.textContent = String(s.correct);
  }

  if (els.onlyUnanswered) {
    els.onlyUnanswered.addEventListener("change", function () {
      state.onlyUnanswered = !!els.onlyUnanswered.checked;
      render();
    });
  }
  if (els.showAnswers) {
    els.showAnswers.addEventListener("click", function () {
      state.revealAll = !state.revealAll;
      render();
    });
  }
  if (els.reset) {
    els.reset.addEventListener("click", function () {
      if (!window.confirm("确定要清空全部作答记录吗？")) return;
      state.answers = {};
      state.revealAll = false;
      save();
      render();
    });
  }
  if (els.print) {
    els.print.addEventListener("click", function () { window.print(); });
  }

  load();
  render();
})();
