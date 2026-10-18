/* ============================================================
   初中英语资料站 · 五册黑体词汇与助记纯逻辑
   ------------------------------------------------------------
   · 不依赖 DOM，可在 node 中直接 require 测试；
   · 浏览器中以普通 <script> 引入，挂载 window.VOCAB5_LOGIC；
   · 数据来源：window.VOCAB_BOOK（结构见 work/spec/vocab-book-parser-spec.md）。
   ============================================================ */
(function (global) {
  'use strict';

  var VERSION = '1.0.0';

  /* ---------------- 文本与查询 ---------------- */

  function normalizeQuery(q) {
    return String(q == null ? '' : q).toLowerCase().replace(/\s+/g, ' ').trim();
  }

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

  /** 词条检索文本：单词 + 变体 + 音标 + 词性 + 释义 + 全部助记段 + plain/search。 */
  function wordSearchText(word) {
    if (!word) return '';
    var parts = [
      word.word || '',
      word.variant || '',
      word.ipa || '',
      word.posRaw || '',
      word.pos || '',
      word.meaning || '',
      word.plain || '',
      word.search || ''
    ];
    (Array.isArray(word.mnemonic) ? word.mnemonic : []).forEach(function (seg) {
      if (!seg) return;
      parts.push(seg.tag || '');
      parts.push(seg.text || '');
    });
    return parts.join(' ').toLowerCase();
  }

  function textMatches(haystack, query) {
    var tokens = Array.isArray(query) ? query : tokenizeQuery(query);
    if (!tokens.length) return true;
    var text = String(haystack == null ? '' : haystack).toLowerCase();
    for (var i = 0; i < tokens.length; i++) {
      if (text.indexOf(tokens[i]) === -1) return false;
    }
    return true;
  }

  function matchesWord(word, query) {
    return textMatches(wordSearchText(word), query);
  }

  var POS_CATEGORIES = ['n.', 'v.', 'adj.', 'adv.', 'pron.', 'prep.', 'conj.', 'num.', 'modal v.', '其他'];

  /** 从原始词性文本兜底提取规范类别；interj./abbr./phr./int. 归入「其他」。 */
  function parsePosCats(raw) {
    var text = String(raw == null ? '' : raw).toLowerCase();
    var out = [];
    var seen = Object.create(null);
    function push(cat) {
      if (!seen[cat]) {
        seen[cat] = true;
        out.push(cat);
      }
    }
    // 先处理 modal v. 并从句子里移除，避免被下面的 v. 规则重复识别
    if (/modal\s*v\.?/.test(text)) {
      push('modal v.');
      text = text.replace(/modal\s*v\.?/g, ' ');
    }
    if (/(^|[\s&,;/])n\./.test(text)) push('n.');
    if (/(^|[\s&,;/])v\./.test(text)) push('v.');
    if (/(^|[\s&,;/])adj\./.test(text)) push('adj.');
    if (/(^|[\s&,;/])adv\./.test(text)) push('adv.');
    if (/(^|[\s&,;/])pron\./.test(text)) push('pron.');
    if (/(^|[\s&,;/])prep\./.test(text)) push('prep.');
    if (/(^|[\s&,;/])conj\./.test(text)) push('conj.');
    if (/(^|[\s&,;/])num\./.test(text)) push('num.');
    if (/interj\.|int\.|abbr\.|phr\./.test(text)) push('其他');
    // 未知写法也归入「其他」，保证「全部词性」之外仍有可筛选入口
    if (!out.length && text.trim()) push('其他');
    out.sort(function (a, b) {
      var ia = POS_CATEGORIES.indexOf(a);
      var ib = POS_CATEGORIES.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
    return out;
  }

  function matchesPos(word, pos) {
    if (!pos) return true;
    if (!word) return false;
    var cats = Array.isArray(word.posCats) && word.posCats.length ? word.posCats : parsePosCats(word.posRaw || word.pos);
    return cats.indexOf(pos) !== -1;
  }

  function matchesTag(word, tag) {
    if (!tag) return true;
    var segments = Array.isArray(word && word.mnemonic) ? word.mnemonic : [];
    for (var i = 0; i < segments.length; i += 1) {
      if (segments[i] && segments[i].tag === tag) return true;
    }
    return false;
  }

  /* ---------------- 过滤（册 / 单元 / 词性 / 助记 / 搜索） ---------------- */

  function matchesVolume(volume, value) {
    if (value === '' || value == null || value === 'all') return true;
    return Number(volume && volume.no) === Number(value);
  }

  function matchesUnit(unit, value) {
    if (!value || value === 'all') return true;
    return Boolean(unit && unit.id === value);
  }

  function matchesWordFilters(word, opts) {
    if (!opts) return true;
    return matchesPos(word, opts.pos) && matchesTag(word, opts.tag) && matchesWord(word, opts.query);
  }

  /**
   * 过滤整本书，返回只含有内容的册/单元：
   *   { volumes:[{ volume, units:[{ unit, words:[] }], words }], units, words }
   */
  function filterBook(book, opts) {
    opts = opts || {};
    var result = { volumes: [], units: 0, words: 0 };
    var volumes = book && Array.isArray(book.volumes) ? book.volumes : [];
    volumes.forEach(function (volume) {
      if (!matchesVolume(volume, opts.volume)) return;
      var volumeEntry = { volume: volume, units: [], words: 0 };
      (Array.isArray(volume.units) ? volume.units : []).forEach(function (unit) {
        if (!matchesUnit(unit, opts.unit)) return;
        var words = (Array.isArray(unit.words) ? unit.words : []).filter(function (word) {
          return matchesWordFilters(word, opts);
        });
        if (!words.length) return;
        volumeEntry.units.push({ unit: unit, words: words });
        volumeEntry.words += words.length;
      });
      if (volumeEntry.units.length) {
        result.volumes.push(volumeEntry);
        result.units += volumeEntry.units.length;
        result.words += volumeEntry.words;
      }
    });
    return result;
  }

  function computeDisplayStats(filtered) {
    var data = filtered || {};
    return {
      volumes: Array.isArray(data.volumes) ? data.volumes.length : 0,
      units: data.units || 0,
      words: data.words || 0
    };
  }

  /* ---------------- 统计 ---------------- */

  function computeStats(book) {
    var volumes = book && Array.isArray(book.volumes) ? book.volumes : [];
    var units = 0;
    var words = 0;
    var segments = 0;
    var tagSet = Object.create(null);
    volumes.forEach(function (volume) {
      (Array.isArray(volume && volume.units) ? volume.units : []).forEach(function (unit) {
        units += 1;
        (Array.isArray(unit && unit.words) ? unit.words : []).forEach(function (word) {
          words += 1;
          (Array.isArray(word && word.mnemonic) ? word.mnemonic : []).forEach(function (seg) {
            segments += 1;
            if (seg && seg.tag) tagSet[seg.tag] = true;
          });
        });
      });
    });
    var tagCount = Object.keys(tagSet).length;
    if (!tagCount && book && Array.isArray(book.tagOptions)) tagCount = book.tagOptions.length;
    return { volumes: volumes.length, units: units, words: words, segments: segments, tags: tagCount };
  }

  /** 千分位：1298 → "1,298" */
  function formatNumber(value) {
    var number = Number(value);
    if (!isFinite(number)) return String(value == null ? '' : value);
    return String(Math.round(number)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /* ---------------- 高亮 ---------------- */

  function highlightText(text, query) {
    var raw = String(text == null ? '' : text);
    var tokens = tokenizeQuery(query);
    if (!tokens.length || !raw) return escapeHtml(raw);
    var re = new RegExp('(' + tokens.map(escapeRegExp).join('|') + ')', 'gi');
    var parts = raw.split(re);
    var out = '';
    for (var i = 0; i < parts.length; i += 1) {
      if (i % 2 === 1) out += '<mark class="hl">' + escapeHtml(parts[i]) + '</mark>';
      else out += escapeHtml(parts[i]);
    }
    return out;
  }

  /* ---------------- 索引与选项 ---------------- */

  function buildWordIndex(book) {
    var index = Object.create(null);
    (book && Array.isArray(book.volumes) ? book.volumes : []).forEach(function (volume) {
      (Array.isArray(volume.units) ? volume.units : []).forEach(function (unit) {
        (Array.isArray(unit.words) ? unit.words : []).forEach(function (word) {
          if (word && word.id) index[word.id] = { word: word, unit: unit, volume: volume };
        });
      });
    });
    return index;
  }

  function buildUnitIndex(book) {
    var index = Object.create(null);
    (book && Array.isArray(book.volumes) ? book.volumes : []).forEach(function (volume) {
      (Array.isArray(volume.units) ? volume.units : []).forEach(function (unit) {
        if (unit && unit.id) index[unit.id] = { unit: unit, volume: volume };
      });
    });
    return index;
  }

  function buildVolumeIndex(book) {
    var index = Object.create(null);
    (book && Array.isArray(book.volumes) ? book.volumes : []).forEach(function (volume) {
      if (volume) index[String(volume.no)] = volume;
    });
    return index;
  }

  function unitOptionLabel(unit) {
    var label = String((unit && unit.label) || '');
    if (unit && unit.titleEn) label += ' · ' + unit.titleEn;
    return label;
  }

  /**
   * 单元下拉选项分组：volumeNo 为 'all'/空 时返回全部册的分组，
   * 指定册时只返回该册一组。每组：{ volume, options:[{value,label,count}] }
   */
  function unitOptionGroups(book, volumeNo) {
    var groups = [];
    (book && Array.isArray(book.volumes) ? book.volumes : []).forEach(function (volume) {
      if (volumeNo !== '' && volumeNo != null && volumeNo !== 'all' && Number(volume.no) !== Number(volumeNo)) return;
      var options = [];
      (Array.isArray(volume.units) ? volume.units : []).forEach(function (unit) {
        options.push({
          value: unit.id,
          label: unitOptionLabel(unit),
          count: Array.isArray(unit.words) ? unit.words.length : 0
        });
      });
      if (options.length) groups.push({ volume: volume, options: options });
    });
    return groups;
  }

  /* ---------------- 深链 ---------------- */

  /**
   * "#v1-u1-3" → { kind:"word", id:"v1-u1-3", volume:1, unit:"v1-u1", no:3 }
   * "#u-v1-u1" → { kind:"unit", id:"v1-u1", volume:1 }
   * "#v3"      → { kind:"volume", id:"v3", volume:3 }
   */
  function parseHash(hash) {
    var raw = String(hash == null ? '' : hash).replace(/^#/, '').trim().toLowerCase();
    if (!raw) return null;
    var wordMatch = /^v(\d+)-u(\d+)-(\d+)$/.exec(raw);
    if (wordMatch) {
      return {
        kind: 'word',
        id: raw,
        volume: Number(wordMatch[1]),
        unit: 'v' + wordMatch[1] + '-u' + wordMatch[2],
        no: Number(wordMatch[3])
      };
    }
    var unitMatch = /^u-(v\d+-u\d+)$/.exec(raw);
    if (unitMatch) {
      return { kind: 'unit', id: unitMatch[1], volume: Number(unitMatch[1].replace(/^v(\d+).*$/, '$1')) };
    }
    var volumeMatch = /^v(\d+)$/.exec(raw);
    if (volumeMatch) {
      return { kind: 'volume', id: raw, volume: Number(volumeMatch[1]) };
    }
    return null;
  }

  function hashTargetId(hash) {
    var info = parseHash(hash);
    return info ? info.id : null;
  }

  var API = {
    VERSION: VERSION,
    POS_CATEGORIES: POS_CATEGORIES,
    normalizeQuery: normalizeQuery,
    tokenizeQuery: tokenizeQuery,
    escapeHtml: escapeHtml,
    escapeRegExp: escapeRegExp,
    wordSearchText: wordSearchText,
    textMatches: textMatches,
    matchesWord: matchesWord,
    parsePosCats: parsePosCats,
    matchesPos: matchesPos,
    matchesTag: matchesTag,
    matchesVolume: matchesVolume,
    matchesUnit: matchesUnit,
    matchesWordFilters: matchesWordFilters,
    filterBook: filterBook,
    computeDisplayStats: computeDisplayStats,
    computeStats: computeStats,
    formatNumber: formatNumber,
    highlightText: highlightText,
    buildWordIndex: buildWordIndex,
    buildUnitIndex: buildUnitIndex,
    buildVolumeIndex: buildVolumeIndex,
    unitOptionLabel: unitOptionLabel,
    unitOptionGroups: unitOptionGroups,
    parseHash: parseHash,
    hashTargetId: hashTargetId
  };

  global.VOCAB5_LOGIC = API;
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : window));
