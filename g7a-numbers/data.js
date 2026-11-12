/* 七上数词与介词专项 · 48 题 / 6 级 */
(function(){
window.G7A_NUMBERS = {
  levels: [
    { id: 1, name: "基数词", short: "基数词", desc: "1–100 的数字拼写。" },
    { id: 2, name: "序数词", short: "序数词", desc: "第几的拼写与特殊变化。" },
    { id: 3, name: "时间介词 at / on / in", short: "时间介词", desc: "at 钟点、on 日期、in 月份季节年份。" },
    { id: 4, name: "地点与方位介词", short: "地点介词", desc: "at/on/in 的地点用法与六个方位介词。" },
    { id: 5, name: "介词搭配", short: "介词搭配", desc: "be good at、look at、listen to 等。" },
    { id: 6, name: "综合提升", short: "综合", desc: "数词与介词混合辨析。" }
  ],
  questions: [
    { id: "B1-1", level: 1, stem: "7 的英语是 ___。", options: ["seven", "seventh", "seven's", "seventeen"], answer: 0, explain: "基数词 seven；教材基数词表。" },
    { id: "B1-2", level: 1, stem: "12 的英语是 ___。", options: ["twelve", "twelveth", "twelfth", "twenty"], answer: 0, explain: "基数词 twelve。" },
    { id: "B1-3", level: 1, stem: "20 的英语是 ___。", options: ["twenty", "twentieth", "twoty", "twelve"], answer: 0, explain: "基数词 twenty。" },
    { id: "B1-4", level: 1, stem: "40 的英语是 ___。", options: ["forty", "fourty", "fourteen", "four"], answer: 0, explain: "注意 forty 不含 u。" },
    { id: "B1-5", level: 1, stem: "100 的英语是 ___。", options: ["one hundred", "one hundreds", "a hundred's", "hundred"], answer: 0, explain: "教材基数词表：one hundred。" },
    { id: "B1-6", level: 1, stem: "99 的英语是 ___。", options: ["ninety-nine", "ninetynine", "ninety-ninth", "ninty-nine"], answer: 0, explain: "整十与个位之间加连字符。" },
    { id: "B1-7", level: 1, stem: "21 的英语是 ___。", options: ["twenty-one", "twenty one", "twentyfirst", "twentieth-one"], answer: 0, explain: "教材基数词表：twenty-one。" },
    { id: "B1-8", level: 1, stem: "101 的英语是 ___。", options: ["one hundred and one", "one hundred one", "hundred and one", "one hundreds and one"], answer: 0, explain: "教材基数词表：one hundred and one。" },

    { id: "B2-1", level: 2, stem: "第 1 的英语是 ___。", options: ["first", "one", "firist", "oneth"], answer: 0, explain: "序数词 first (1st)；教材序数词表。" },
    { id: "B2-2", level: 2, stem: "第 2 的英语是 ___。", options: ["second", "two", "secend", "twoth"], answer: 0, explain: "序数词 second (2nd)。" },
    { id: "B2-3", level: 2, stem: "第 3 的英语是 ___。", options: ["third", "three", "thirth", "threeth"], answer: 0, explain: "序数词 third (3rd)。" },
    { id: "B2-4", level: 2, stem: "第 5 的英语是 ___。", options: ["fifth", "fiveth", "five", "fivth"], answer: 0, explain: "序数词 fifth (5th)，拼写特殊。" },
    { id: "B2-5", level: 2, stem: "第 8 的英语是 ___。", options: ["eighth", "eightth", "eight", "eightst"], answer: 0, explain: "序数词 eighth (8th)，只加 h。" },
    { id: "B2-6", level: 2, stem: "第 9 的英语是 ___。", options: ["ninth", "nineth", "nine", "ninthth"], answer: 0, explain: "序数词 ninth (9th)，去掉 e。" },
    { id: "B2-7", level: 2, stem: "第 20 的英语是 ___。", options: ["twentieth", "twentyth", "twenty", "twentith"], answer: 0, explain: "整十 y 变 ie 加 th。" },
    { id: "B2-8", level: 2, stem: "第 21 的英语是 ___。", options: ["twenty-first", "twenty-firsth", "twentieth-first", "twenty-one"], answer: 0, explain: "几十几只把个位变序数；教材序数词表。" },

    { id: "B3-1", level: 3, stem: "___ 3 o'clock", options: ["at", "on", "in", "不填"], answer: 0, explain: "at 用于钟点；教材表7。" },
    { id: "B3-2", level: 3, stem: "___ Thursday", options: ["at", "on", "in", "不填"], answer: 1, explain: "on 用于星期几；教材表7。" },
    { id: "B3-3", level: 3, stem: "___ spring", options: ["at", "on", "in", "不填"], answer: 2, explain: "in 用于季节；教材表7。" },
    { id: "B3-4", level: 3, stem: "___ 1949", options: ["at", "on", "in", "不填"], answer: 2, explain: "in 用于年份；教材表7。" },
    { id: "B3-5", level: 3, stem: "___ New Year's Day", options: ["at", "on", "in", "不填"], answer: 1, explain: "on 用于节假日；教材表7。" },
    { id: "B3-6", level: 3, stem: "___ night", options: ["at", "on", "in", "不填"], answer: 0, explain: "at night 是固定搭配；教材表7。" },
    { id: "B3-7", level: 3, stem: "___ the afternoon", options: ["at", "on", "in", "不填"], answer: 2, explain: "in the afternoon；教材表7。" },
    { id: "B3-8", level: 3, stem: "___ the age of 20", options: ["at", "on", "in", "不填"], answer: 0, explain: "at the age of；教材表7。" },

    { id: "B4-1", level: 4, stem: "___ school（在某地点）", options: ["at", "on", "in", "不填"], answer: 0, explain: "at 表示在某个地点；教材。" },
    { id: "B4-2", level: 4, stem: "___ the desk（在某表面上）", options: ["at", "on", "in", "不填"], answer: 1, explain: "on 表示在某个表面上。" },
    { id: "B4-3", level: 4, stem: "___ China（在某范围内）", options: ["at", "on", "in", "不填"], answer: 2, explain: "in 表示在某个范围内。" },
    { id: "B4-4", level: 4, stem: "The shoes are ___ the bed.（在……下面）", options: ["under", "on", "in", "behind"], answer: 0, explain: "under 在……下面；教材例句。" },
    { id: "B4-5", level: 4, stem: "The dining hall is ___ our classroom building.（在……对面）", options: ["across from", "behind", "next to", "between"], answer: 0, explain: "across from 在……对面；教材例句。" },
    { id: "B4-6", level: 4, stem: "A baby duck is ___ the big tree.（在……后面）", options: ["behind", "in front of", "next to", "under"], answer: 0, explain: "behind 在……后面；教材例句。" },
    { id: "B4-7", level: 4, stem: "This week I sit ___ my best friend, Han Lin.（紧邻）", options: ["next to", "across from", "between", "behind"], answer: 0, explain: "next to 紧邻；教材例句。" },
    { id: "B4-8", level: 4, stem: "The student centre is ___ the library and the gym.（在……中间）", options: ["between", "among", "in", "next to"], answer: 0, explain: "between ... and ... 在两者之间；教材例句。" },

    { id: "B5-1", level: 5, stem: "be good ___ English", options: ["at", "in", "for", "to"], answer: 0, explain: "be good at 擅长；教材搭配表。" },
    { id: "B5-2", level: 5, stem: "be famous ___", options: ["at", "for", "in", "to"], answer: 1, explain: "be famous for 因……而出名。" },
    { id: "B5-3", level: 5, stem: "be interested ___", options: ["at", "for", "in", "to"], answer: 2, explain: "be interested in 对……感兴趣。" },
    { id: "B5-4", level: 5, stem: "look ___（看）", options: ["at", "to", "for", "in"], answer: 0, explain: "look at 看；教材搭配表。" },
    { id: "B5-5", level: 5, stem: "listen ___（听）", options: ["at", "to", "for", "in"], answer: 1, explain: "listen to 听；教材搭配表。" },
    { id: "B5-6", level: 5, stem: "ask ___（请求）", options: ["at", "to", "for", "in"], answer: 2, explain: "ask for 请求；教材搭配表。" },
    { id: "B5-7", level: 5, stem: "on the way ___ school", options: ["to", "for", "at", "in"], answer: 0, explain: "on the way to 在去……的路上；教材搭配表。" },
    { id: "B5-8", level: 5, stem: "be similar ___", options: ["at", "to", "in", "for"], answer: 1, explain: "be similar to 与……相似；教材搭配表。" },

    { id: "B6-1", level: 6, stem: "介词宾语若是人称代词，要用 ___。", options: ["宾格", "主格", "所有格", "反身代词"], answer: 0, explain: "教材：介词宾语若是人称代词，则要用宾格。" },
    { id: "B6-2", level: 6, stem: "___ Sunday morning", options: ["at", "on", "in", "不填"], answer: 1, explain: "某一天的某段时间用 on；教材表7。" },
    { id: "B6-3", level: 6, stem: "___ October", options: ["at", "on", "in", "不填"], answer: 2, explain: "月份前用 in；教材表7。" },
    { id: "B6-4", level: 6, stem: "第 12 的英语是 ___。", options: ["twelfth", "twelveth", "twelve", "twelth"], answer: 0, explain: "序数词 twelfth，拼写特殊。" },
    { id: "B6-5", level: 6, stem: "第 40 的英语是 ___。", options: ["fortieth", "fourtieth", "forty", "fourty"], answer: 0, explain: "整十 y 变 ie 加 th。" },
    { id: "B6-6", level: 6, stem: "___ duty（值日）", options: ["on", "in", "at", "for"], answer: 0, explain: "on duty 值日；教材搭配表。" },
    { id: "B6-7", level: 6, stem: "___ the future（将来）", options: ["on", "in", "at", "for"], answer: 1, explain: "in the future 将来；教材搭配表。" },
    { id: "B6-8", level: 6, stem: "at the music studio 中 at 表示 ___。", options: ["在某个地点", "在某个表面", "在某个范围", "在……下面"], answer: 0, explain: "at 表示在某个地点；教材地点介词部分。" }
  ]
};
})();
