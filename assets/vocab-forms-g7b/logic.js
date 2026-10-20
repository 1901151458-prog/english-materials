/* ============================================================
   初中英语资料站 · 词形变化页面纯逻辑
   ------------------------------------------------------------
   · 不依赖 DOM，可在 node 中直接 require 测试；
   · 浏览器中以普通 <script> 引入，挂载 window.VOCAB_LOGIC；
   · 数据来源：window.VOCAB_FORMS（结构见 work/spec/parser-spec.md）。
   ============================================================ */
(function (global) {
  'use strict';

  var VERSION = '1.0.0';

  /* ---------- 文本与查询 ---------- */

  function normalizeQuery(q) {
    return String(q == null ? '' : q).toLowerCase().replace(/\s+/g, ' ').trim();
  }

  /** 把查询串切成去重、去空的小写词元；长词优先，避免短词截断长词的高亮。 */
  function tokenizeQuery(q) {
    var norm = normalizeQuery(q);
    if (!norm) return [];
    var seen = Object.create(null);
    var tokens = [];
    norm.split(' ').forEach(function (token) {
      if (token && !seen[token]) {
        seen[token] = true;
        tokens.push(token);
      }
    });
    tokens.sort(function (a, b) { return b.length - a.length; });
    return tokens;
  }

  function escapeRegExp(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /** 词条的检索文本：单词 + 词性 + 释义/词形纯文本 + 预生成 search 字段。 */
  function searchText(entry) {
    if (!entry) return '';
    return [
      entry.word || '',
      entry.pos || '',
      entry.plain || '',
      entry.search || ''
    ].join(' ').toLowerCase();
  }

  /** 空格分隔的多个词元为 AND 关系，全部命中才算匹配；空查询恒为 true。 */
  function matchesQuery(entry, query) {
    var tokens = Array.isArray(query) ? query : tokenizeQuery(query);
    if (!tokens.length) return true;
    var hay = searchText(entry);
    for (var i = 0; i < tokens.length; i++) {
      if (hay.indexOf(tokens[i]) === -1) return false;
    }
    return true;
  }

  /* ---------- 词性 / 单元 ---------- */

  /** 取词条规范词性类别；data 里没有 posCats 时从 pos 文本兜底提取。 */
  function parsePosCats(entry) {
    if (!entry) return [];
    if (Array.isArray(entry.posCats) && entry.posCats.length) return entry.posCats;
    var pos = String(entry.pos || '');
    var out = [];
    var seen = Object.create(null);
    var re = /(?:^|[\s&/,])(n|v|adj|adv|pron|num|prep|conj|int)\./g;
    var m;
    while ((m = re.exec(pos))) {
      var cat = m[1] + '.';
      if (!seen[cat]) { seen[cat] = true; out.push(cat); }
    }
    return out;
  }

  function matchesPos(entry, pos) {
    if (!pos) return true;
    var cats = parsePosCats(entry);
    for (var i = 0; i < cats.length; i++) {
      if (cats[i] === pos) return true;
    }
    // 兜底：词性文本里以词性边界出现的写法（如 "n. & v."），避免 adv. 误命中 v.
    var p = String((entry && entry.pos) || '').toLowerCase();
    var re = new RegExp('(?:^|[\\s&/,])' + escapeRegExp(String(pos).toLowerCase()));
    return re.test(p);
  }

  function matchesUnit(entry, unit) {
    if (unit === '' || unit == null || unit === 'all') return true;
    return Number(entry && entry.unit) === Number(unit);
  }

  function isVisibleEntry(entry, opts) {
    opts = opts || {};
    return matchesUnit(entry, opts.unit) &&
      matchesPos(entry, opts.pos) &&
      matchesQuery(entry, opts.query);
  }

  /** 组合过滤；保持传入顺序（教材顺序），不在逻辑层排序。 */
  function filterEntries(entries, opts) {
    var list = Array.isArray(entries) ? entries : [];
    return list.filter(function (entry) { return isVisibleEntry(entry, opts); });
  }

  /* ---------- 统计 ---------- */

  /** 单个词条的 core / extra 词形数量；forms 缺失时从 html 的 <b class> 统计。 */
  function countForms(entry) {
    var core = 0;
    var extra = 0;
    if (entry && Array.isArray(entry.forms) && entry.forms.length) {
      entry.forms.forEach(function (form) {
        if (form && form.level === 'extra') extra += 1;
        else core += 1;
      });
    } else if (entry && typeof entry.html === 'string') {
      var coreMatches = entry.html.match(/<b class="core">/g);
      var extraMatches = entry.html.match(/<b class="extra">/g);
      core = coreMatches ? coreMatches.length : 0;
      extra = extraMatches ? extraMatches.length : 0;
    }
    return { core: core, extra: extra };
  }

  function computeStats(entries) {
    var list = Array.isArray(entries) ? entries : [];
    var core = 0;
    var extra = 0;
    var extraWords = 0;
    list.forEach(function (entry) {
      var c = countForms(entry);
      core += c.core;
      extra += c.extra;
      if (c.extra > 0) extraWords += 1;
    });
    return {
      words: list.length,
      forms: core + extra,
      core: core,
      extra: extra,
      extraWords: extraWords
    };
  }

  /* ---------- 高亮 ---------- */

  function buildHighlightRegExp(tokens) {
    return new RegExp('(' + tokens.map(escapeRegExp).join('|') + ')', 'gi');
  }

  /** 纯文本片段的实体保护：&amp; / &#39; / &#x27; 不参与匹配。 */
  function highlightPlainSegment(seg, re) {
    return seg.split(/(&(?:[a-zA-Z][a-zA-Z0-9]*|#\d+|#[xX][0-9a-fA-F]+);)/g)
      .map(function (part, index) {
        if (index % 2 === 1) return part; // 实体，原样保留
        return part.replace(re, '<mark>$1</mark>');
      })
      .join('');
  }

  /**
   * 在 HTML 字符串的【文本节点】内包 <mark>，不破坏标签与属性。
   * 做法：按 <...> 切分，标签段原样保留，只处理纯文本段。
   */
  function highlightHtml(html, query) {
    var raw = String(html == null ? '' : html);
    var tokens = tokenizeQuery(query);
    if (!tokens.length || !raw) return raw;
    var re = buildHighlightRegExp(tokens);
    return raw.split(/(<[^>]*>)/g).map(function (part) {
      if (!part || part.charAt(0) === '<') return part;
      return highlightPlainSegment(part, re);
    }).join('');
  }

  /** 纯文本高亮：先转义再包 <mark>，用于单词列等文本。 */
  function highlightText(text, query) {
    var raw = String(text == null ? '' : text);
    var tokens = tokenizeQuery(query);
    if (!tokens.length || !raw) return escapeHtml(raw);
    var parts = raw.split(buildHighlightRegExp(tokens));
    var out = '';
    for (var i = 0; i < parts.length; i++) {
      if (i % 2 === 1) out += '<mark>' + escapeHtml(parts[i]) + '</mark>';
      else out += escapeHtml(parts[i]);
    }
    return out;
  }

  /* ---------- 相关度（可选排序） ---------- */

  function relevanceScore(entry, query) {
    var q = normalizeQuery(query);
    if (!q) return 0;
    var word = String((entry && entry.word) || '').toLowerCase();
    if (word === q) return 0;
    if (word.indexOf(q) === 0) return 1;
    if (word.indexOf(q) !== -1) return 2;
    if (searchText(entry).indexOf(q) !== -1) return 3;
    return 4;
  }

  /** 稳定排序：相关度相同则保留教材原顺序。 */
  function sortByRelevance(entries, query) {
    var list = Array.isArray(entries) ? entries : [];
    if (!normalizeQuery(query)) return list.slice();
    return list
      .map(function (entry, index) {
        return { entry: entry, index: index, score: relevanceScore(entry, query) };
      })
      .sort(function (a, b) { return a.score - b.score || a.index - b.index; })
      .map(function (item) { return item.entry; });
  }

  /* ---------- 分组 ---------- */

  function makeGroup(unit, entries) {
    var no = Number(unit && unit.no);
    return {
      no: no,
      label: (unit && unit.label) || ('Unit ' + no),
      total: unit && typeof unit.count === 'number' ? unit.count : entries.length,
      shown: entries.length,
      entries: entries
    };
  }

  /**
   * 按 units 顺序分组（只返回有内容的组）；未在 units 中声明的单元追加在最后。
   */
  function groupByUnit(entries, units) {
    var list = Array.isArray(entries) ? entries : [];
    var buckets = Object.create(null);
    var declared = [];
    (Array.isArray(units) ? units : []).forEach(function (unit) {
      var no = Number(unit && unit.no);
      if (!declared.length || declared.indexOf(no) === -1) declared.push(no);
      buckets[no] = { unit: unit, entries: [] };
    });
    var undeclared = Object.create(null);
    list.forEach(function (entry) {
      var no = Number(entry && entry.unit);
      if (buckets[no]) buckets[no].entries.push(entry);
      else {
        if (!undeclared[no]) undeclared[no] = [];
        undeclared[no].push(entry);
      }
    });
    var groups = [];
    declared.forEach(function (no) {
      var bucket = buckets[no];
      if (bucket && bucket.entries.length) groups.push(makeGroup(bucket.unit, bucket.entries));
    });
    Object.keys(undeclared)
      .map(Number)
      .sort(function (a, b) { return a - b; })
      .forEach(function (no) {
        groups.push(makeGroup({ no: no, label: 'Unit ' + no, count: undeclared[no].length }, undeclared[no]));
      });
    return groups;
  }

  /* ---------- URL hash ---------- */

  /** "#word-shortage" → { type: "word", id: "shortage" }；其它返回 null。 */
  function parseHash(hash) {
    var raw = String(hash == null ? '' : hash).replace(/^#/, '').trim();
    if (!raw) return null;
    var match = /^word-(.+)$/.exec(raw);
    if (!match) return null;
    var id = match[1];
    try {
      id = decodeURIComponent(id);
    } catch (err) {
      id = match[1];
    }
    return { type: 'word', id: id };
  }

  var API = {
    VERSION: VERSION,
    normalizeQuery: normalizeQuery,
    tokenizeQuery: tokenizeQuery,
    escapeHtml: escapeHtml,
    escapeRegExp: escapeRegExp,
    searchText: searchText,
    matchesQuery: matchesQuery,
    parsePosCats: parsePosCats,
    matchesPos: matchesPos,
    matchesUnit: matchesUnit,
    isVisibleEntry: isVisibleEntry,
    filterEntries: filterEntries,
    countForms: countForms,
    computeStats: computeStats,
    highlightHtml: highlightHtml,
    highlightText: highlightText,
    relevanceScore: relevanceScore,
    sortByRelevance: sortByRelevance,
    groupByUnit: groupByUnit,
    parseHash: parseHash
  };

  global.VOCAB_LOGIC = API;
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
