/* ============================================================
   初中英语资料站 · 书面表达范文集纯逻辑
   ------------------------------------------------------------
   · 不依赖 DOM，可在 node 中直接 require 测试；
   · 浏览器中以普通 <script> 引入，挂载 window.ESSAY_LOGIC；
   · 数据来源：window.ESSAY_BOOK（结构见 work/spec/essay-parser-spec.md）。
   ============================================================ */
(function (global) {
  'use strict';

  var VERSION = '1.0.0';

  /* ---------------- 文本与查询 ---------------- */

  function normalizeQuery(q) {
    return String(q == null ? '' : q).toLowerCase().replace(/\s+/g, ' ').trim();
  }

  /** 查询词元：去重、去空、长词优先（避免短词先截断长词的高亮）。 */
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

  /** 句型检索文本：英文 + 中文 + 用法 + 预生成 search。 */
  function patternSearchText(pattern) {
    if (!pattern) return '';
    return [
      pattern.en || '',
      pattern.cn || '',
      pattern.usage || '',
      pattern.search || ''
    ].join(' ').toLowerCase();
  }

  /** 范文检索文本：中英标题 + 段落 + 亮点解析/亮点句 + 参考译文 + 预生成 search。 */
  function essaySearchText(essay) {
    if (!essay) return '';
    var parts = [essay.cnTitle || '', essay.enTitle || ''];
    (Array.isArray(essay.paragraphs) ? essay.paragraphs : []).forEach(function (par) {
      parts.push(par || '');
    });
    if (essay.analysis && typeof essay.analysis === 'object') {
      parts.push(essay.analysis.text || '');
      parts.push(essay.analysis.highlight || '');
      parts.push(essay.analysis.highlightCn || '');
    }
    if (essay.translation) parts.push(essay.translation);
    parts.push(essay.search || '');
    return parts.join(' ').toLowerCase();
  }

  /** 空格分隔的多词查询为 AND 关系；空查询恒真。 */
  function textMatches(haystack, query) {
    var tokens = Array.isArray(query) ? query : tokenizeQuery(query);
    if (!tokens.length) return true;
    var text = String(haystack == null ? '' : haystack).toLowerCase();
    for (var i = 0; i < tokens.length; i++) {
      if (text.indexOf(tokens[i]) === -1) return false;
    }
    return true;
  }

  function matchesPattern(pattern, query) {
    return textMatches(patternSearchText(pattern), query);
  }

  function matchesEssay(essay, query) {
    return textMatches(essaySearchText(essay), query);
  }

  /* ---------------- 类型 / 统计 ---------------- */

  function matchesType(group, type) {
    if (!type) return true;
    if (type === 'A' || type === 'B') return group === type;
    if (type === 'pattern') return group === 'pattern';
    return true;
  }

  function computeStats(book) {
    var units = book && Array.isArray(book.units) ? book.units : [];
    var patterns = 0;
    var essays = 0;
    var groupA = 0;
    var groupB = 0;
    units.forEach(function (unit) {
      patterns += Array.isArray(unit && unit.patterns) ? unit.patterns.length : 0;
      (Array.isArray(unit && unit.essays) ? unit.essays : []).forEach(function (essay) {
        essays += 1;
        if (essay && essay.group === 'A') groupA += 1;
        else if (essay && essay.group === 'B') groupB += 1;
      });
    });
    return { units: units.length, essays: essays, patterns: patterns, groupA: groupA, groupB: groupB };
  }

  /* ---------------- 过滤与分组 ---------------- */

  /**
   * 按单位分组过滤，返回当前应渲染的内容块：
   *   [{ unit, patterns:[], essays:[], patternCount, essayCount }]
   * type: "" 全部 / "pattern" 句型 / "A" 满分范文 / "B" 好背好文
   */
  function buildSections(book, opts) {
    opts = opts || {};
    var units = book && Array.isArray(book.units) ? book.units : [];
    var type = opts.type || '';
    var query = opts.query || '';
    var sections = [];
    units.forEach(function (unit) {
      if (!unit) return;
      var patterns = [];
      var essays = [];
      if (!type || type === 'pattern') {
        (Array.isArray(unit.patterns) ? unit.patterns : []).forEach(function (pattern) {
          if (matchesPattern(pattern, query)) patterns.push(pattern);
        });
      }
      if (!type || type === 'A' || type === 'B') {
        (Array.isArray(unit.essays) ? unit.essays : []).forEach(function (essay) {
          if (type && essay && essay.group !== type) return;
          if (matchesEssay(essay, query)) essays.push(essay);
        });
      }
      if (!patterns.length && !essays.length) return;
      sections.push({
        unit: unit,
        patterns: patterns,
        essays: essays,
        patternCount: patterns.length,
        essayCount: essays.length
      });
    });
    return sections;
  }

  function computeDisplayStats(sections) {
    var list = Array.isArray(sections) ? sections : [];
    var essays = 0;
    var patterns = 0;
    list.forEach(function (section) {
      essays += (section && section.essayCount) || 0;
      patterns += (section && section.patternCount) || 0;
    });
    return { essays: essays, patterns: patterns };
  }

  /* ---------------- 高亮 ---------------- */

  /**
   * 纯文本高亮：先转义，再在文本内包 <mark class="hl">。
   * 数据契约要求所有字段为纯文本，因此无需处理 HTML 标签。
   */
  function highlightText(text, query) {
    var raw = String(text == null ? '' : text);
    var tokens = tokenizeQuery(query);
    if (!tokens.length || !raw) return escapeHtml(raw);
    var re = new RegExp('(' + tokens.map(escapeRegExp).join('|') + ')', 'gi');
    var parts = raw.split(re);
    var out = '';
    for (var i = 0; i < parts.length; i++) {
      if (i % 2 === 1) out += '<mark class="hl">' + escapeHtml(parts[i]) + '</mark>';
      else out += escapeHtml(parts[i]);
    }
    return out;
  }

  /* ---------------- 深链 ---------------- */

  /**
   * "#u1" → { kind:"unit", id:"u1", unit:1 }
   * "#u1-a1" → { kind:"essay", id:"u1-a1", unit:1, group:"A", index:1 }
   * 其它 → null
   */
  function parseHash(hash) {
    var raw = String(hash == null ? '' : hash).replace(/^#/, '').trim().toLowerCase();
    if (!raw) return null;
    var match = /^u(\d+)(?:-([ab])(\d+))?$/.exec(raw);
    if (!match) return null;
    var unit = Number(match[1]);
    if (match[2]) {
      return {
        kind: 'essay',
        id: 'u' + unit + '-' + match[2] + match[3],
        unit: unit,
        group: match[2].toUpperCase(),
        index: Number(match[3])
      };
    }
    return { kind: 'unit', id: 'u' + unit, unit: unit };
  }

  /** 从 hash 深链得到需要滚动到的元素 id（页面元素 id 与数据 id 一致）。 */
  function hashTargetId(hash) {
    var info = parseHash(hash);
    return info ? info.id : null;
  }

  /* ---------------- 索引与复制文本 ---------------- */

  function essayPatternId(unitNo, index) {
    return 'p-u' + unitNo + '-' + index;
  }

  /** 建立范文 id → 范文 的索引。 */
  function buildEssayIndex(book) {
    var index = Object.create(null);
    var units = book && Array.isArray(book.units) ? book.units : [];
    units.forEach(function (unit) {
      (Array.isArray(unit && unit.essays) ? unit.essays : []).forEach(function (essay) {
        if (essay && essay.id) index[essay.id] = essay;
      });
    });
    return index;
  }

  /** 建立句型 id（p-u{unit}-{index}）→ 句型 的索引。 */
  function buildPatternIndex(book) {
    var index = Object.create(null);
    var units = book && Array.isArray(book.units) ? book.units : [];
    units.forEach(function (unit) {
      (Array.isArray(unit && unit.patterns) ? unit.patterns : []).forEach(function (pattern, i) {
        index[essayPatternId(unit.no, i + 1)] = pattern;
      });
    });
    return index;
  }

  /** 复制正文用文本：各段之间空一行。 */
  function essayCopyText(essay) {
    if (!essay) return '';
    var paragraphs = (Array.isArray(essay.paragraphs) ? essay.paragraphs : [])
      .map(function (par) { return String(par == null ? '' : par).trim(); })
      .filter(function (par) { return par.length > 0; });
    return paragraphs.join('\n\n');
  }

  /** 复制句型用文本：英文原句。 */
  function patternCopyText(pattern) {
    return pattern && pattern.en ? String(pattern.en) : '';
  }

  var API = {
    VERSION: VERSION,
    normalizeQuery: normalizeQuery,
    tokenizeQuery: tokenizeQuery,
    escapeHtml: escapeHtml,
    escapeRegExp: escapeRegExp,
    patternSearchText: patternSearchText,
    essaySearchText: essaySearchText,
    textMatches: textMatches,
    matchesPattern: matchesPattern,
    matchesEssay: matchesEssay,
    matchesType: matchesType,
    computeStats: computeStats,
    buildSections: buildSections,
    computeDisplayStats: computeDisplayStats,
    highlightText: highlightText,
    parseHash: parseHash,
    hashTargetId: hashTargetId,
    essayPatternId: essayPatternId,
    buildEssayIndex: buildEssayIndex,
    buildPatternIndex: buildPatternIndex,
    essayCopyText: essayCopyText,
    patternCopyText: patternCopyText
  };

  global.ESSAY_LOGIC = API;
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
