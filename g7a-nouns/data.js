/* 七上名词与所有格专项 · 48 题 / 6 级 */
(function(){
window.G7A_NOUNS = {
  levels: [
    { id: 1, name: "词类与名词种类", short: "词类/种类", desc: "十大词类、专有名词与普通名词。" },
    { id: 2, name: "可数与不可数", short: "可数性", desc: "可数名词有复数，不可数名词一般没有。" },
    { id: 3, name: "名词所有格 · 形式", short: "所有格形式", desc: "单数加 's；复数词尾有 s 只加 '。" },
    { id: 4, name: "名词所有格 · 读音", short: "所有格读音", desc: "/s/、/z/、/ɪz/ 的规则。" },
    { id: 5, name: "词类辨析", short: "词类辨析", desc: "按例词判断属于哪一词类。" },
    { id: 6, name: "综合提升", short: "综合", desc: "名词、所有格与词类混合辨析。" }
  ],
  questions: [
    { id: "N1-1", level: 1, stem: "Peter、January、Singapore 属于哪类名词？", options: ["专有名词", "普通名词", "不可数名词", "抽象名词"], answer: 0, explain: "特定的人、时间、地点的专有名称是专有名词；教材例句。" },
    { id: "N1-2", level: 1, stem: "son、tennis、family 属于哪类名词？", options: ["专有名词", "普通名词", "数词", "代词"], answer: 1, explain: "表示一般人或事物的名称，是普通名词。" },
    { id: "N1-3", level: 1, stem: "专有名词的第一个字母一般要 ___。", options: ["大写", "小写", "斜体", "加粗"], answer: 0, explain: "教材明确：专有名词的第一个字母一般要大写。" },
    { id: "N1-4", level: 1, stem: "表示人或事物名称的词是 ___。", options: ["名词", "动词", "形容词", "副词"], answer: 0, explain: "名词（Noun）表示人或事物的名称；表1。" },
    { id: "N1-5", level: 1, stem: "表示动作或状态的词是 ___。", options: ["名词", "动词", "形容词", "数词"], answer: 1, explain: "动词（Verb）表示动作或状态；表1。" },
    { id: "N1-6", level: 1, stem: "用于修饰名词、表示人或事物特征的词是 ___。", options: ["形容词", "副词", "介词", "连词"], answer: 0, explain: "形容词（Adjective）用于修饰名词；表1。" },
    { id: "N1-7", level: 1, stem: "用于代替名词以及起名词作用的短语、分句或句子的词是 ___。", options: ["代词", "数词", "冠词", "感叹词"], answer: 0, explain: "代词（Pronoun）；表1。" },
    { id: "N1-8", level: 1, stem: "表示数量或顺序的词是 ___。", options: ["数词", "名词", "副词", "动词"], answer: 0, explain: "数词（Numeral）；表1。" },

    { id: "N2-1", level: 2, stem: "milk 属于哪类名词？", options: ["可数名词", "不可数名词", "专有名词", "复数名词"], answer: 1, explain: "milk 一般没有复数形式，是不可数名词；教材例句。" },
    { id: "N2-2", level: 2, stem: "eight rabbits 中 rabbits 是 ___。", options: ["可数名词复数", "不可数名词", "专有名词", "动词"], answer: 0, explain: "rabbit 有复数形式，是可数名词；教材例句。" },
    { id: "N2-3", level: 2, stem: "bread 属于哪类名词？", options: ["可数名词", "不可数名词", "专有名词", "数词"], answer: 1, explain: "bread 一般没有复数形式，是不可数名词；教材例句。" },
    { id: "N2-4", level: 2, stem: "yogurt 属于哪类名词？", options: ["可数名词", "不可数名词", "专有名词", "复数名词"], answer: 1, explain: "yogurt 是不可数名词；教材例句。" },
    { id: "N2-5", level: 2, stem: "apple 的复数形式是 ___。", options: ["apples", "apple's", "apples'", "apple"], answer: 0, explain: "可数名词一般加 -s 构成复数。" },
    { id: "N2-6", level: 2, stem: "water 有复数形式吗？", options: ["有", "没有", "只有 waters'", "只有 water's"], answer: 1, explain: "不可数名词一般没有复数形式。" },
    { id: "N2-7", level: 2, stem: "some trees 中 trees 是 ___。", options: ["可数名词复数", "不可数名词", "专有名词", "形容词"], answer: 0, explain: "tree 有复数形式，是可数名词。" },
    { id: "N2-8", level: 2, stem: "book 的复数形式是 ___。", options: ["books", "book's", "books'", "book"], answer: 0, explain: "可数名词一般加 -s。" },

    { id: "N3-1", level: 3, stem: "Mike 的篮球：___。", options: ["Mike's basketball", "Mikes basketball", "Mike basketball", "Mike's basketball's"], answer: 0, explain: "单数名词所有格加 's；教材表2。" },
    { id: "N3-2", level: 3, stem: "Children's Day 中 's 加在 ___ 上。", options: ["复数名词（不以 -s 结尾）", "单数名词", "复数名词（以 -s 结尾）", "动词"], answer: 0, explain: "children 是复数但不以 -s 结尾，加 's；教材表2。" },
    { id: "N3-3", level: 3, stem: "她祖父母的（所有格）：___。", options: ["grandparents'", "grandparents's", "grandparent's", "grandparents"], answer: 0, explain: "复数名词以 -s 结尾，只加 '；教材表2。" },
    { id: "N3-4", level: 3, stem: "Kate 的猫：___。", options: ["Kate's cat", "Kates cat", "Kate cat", "Kates' cat"], answer: 0, explain: "单数名词加 's；教材表2。" },
    { id: "N3-5", level: 3, stem: "Alice 的 vlog：___。", options: ["Alice's vlog", "Alices vlog", "Alice vlog", "Alices' vlog"], answer: 0, explain: "单数名词加 's；教材表2。" },
    { id: "N3-6", level: 3, stem: "复数名词以 -s 结尾，所有格加 ___。", options: ["'", "'s", "s'", "s"], answer: 0, explain: "只加一个撇号；教材表2。" },
    { id: "N3-7", level: 3, stem: "单数名词所有格加 ___。", options: ["'s", "'", "s", "不变化"], answer: 0, explain: "单数名词加 's；教材表2。" },
    { id: "N3-8", level: 3, stem: "那位女演员的名字：___。", options: ["the actress's name", "the actress' name", "the actresses name", "the actress name"], answer: 0, explain: "单数名词加 's；教材表2 例句 the actress's name。" },

    { id: "N4-1", level: 4, stem: "Mike's 中 's 读 ___。", options: ["/s/", "/z/", "/ɪz/", "/t/"], answer: 0, explain: "在清辅音 /k/ 后读 /s/；教材表2。" },
    { id: "N4-2", level: 4, stem: "your mum's 中 's 读 ___。", options: ["/s/", "/z/", "/ɪz/", "/d/"], answer: 1, explain: "在浊辅音 /m/ 后读 /z/；教材表2。" },
    { id: "N4-3", level: 4, stem: "Kate's 中 's 读 ___。", options: ["/s/", "/z/", "/ɪz/", "/eɪ/"], answer: 0, explain: "在清辅音 /t/ 后读 /s/；教材表2。" },
    { id: "N4-4", level: 4, stem: "Alice's 中 's 读 ___。", options: ["/s/", "/z/", "/ɪz/", "/iː/"], answer: 2, explain: "在 /s/ 音后读 /ɪz/；教材表2。" },
    { id: "N4-5", level: 4, stem: "George's 中 's 读 ___。", options: ["/s/", "/z/", "/ɪz/", "/dʒ/"], answer: 2, explain: "在 /dʒ/ 后读 /ɪz/；教材表2。" },
    { id: "N4-6", level: 4, stem: "复数名词以 -s 结尾时，所有格读音 ___。", options: ["不变", "加 /z/", "加 /ɪz/", "加 /s/"], answer: 0, explain: "教材表2：读音不变。" },
    { id: "N4-7", level: 4, stem: "her dad's 中 's 读 ___。", options: ["/s/", "/z/", "/ɪz/", "/d/"], answer: 1, explain: "在浊辅音 /d/ 后读 /z/；教材表2。" },
    { id: "N4-8", level: 4, stem: "在元音后，'s 通常读 ___。", options: ["/s/", "/z/", "/ɪz/", "/eɪ/"], answer: 1, explain: "教材表2：在浊辅音和元音后读 /z/。" },

    { id: "N5-1", level: 5, stem: "funny、different、excited 属于哪一词类？", options: ["形容词", "副词", "名词", "动词"], answer: 0, explain: "形容词（adj.）；表1。" },
    { id: "N5-2", level: 5, stem: "in、on、at、of 属于哪一词类？", options: ["介词", "连词", "冠词", "副词"], answer: 0, explain: "介词（prep.）；表1。" },
    { id: "N5-3", level: 5, stem: "and、but、because、when 属于哪一词类？", options: ["连词", "介词", "副词", "代词"], answer: 0, explain: "连词（conj.）；表1。" },
    { id: "N5-4", level: 5, stem: "we、her、that、what 属于哪一词类？", options: ["代词", "名词", "形容词", "数词"], answer: 0, explain: "代词（pron.）；表1。" },
    { id: "N5-5", level: 5, stem: "nine、thirteen、first 属于哪一词类？", options: ["数词", "代词", "副词", "冠词"], answer: 0, explain: "数词（num.）；表1。" },
    { id: "N5-6", level: 5, stem: "not、too、there、usually 属于哪一词类？", options: ["副词", "介词", "连词", "形容词"], answer: 0, explain: "副词（adv.）；表1。" },
    { id: "N5-7", level: 5, stem: "a、an、the 属于哪一词类？", options: ["冠词", "代词", "数词", "介词"], answer: 0, explain: "冠词（art.）；表1。" },
    { id: "N5-8", level: 5, stem: "well、hello、oh、hey 属于哪一词类？", options: ["感叹词", "副词", "连词", "名词"], answer: 0, explain: "感叹词（interj.）；表1。" },

    { id: "N6-1", level: 6, stem: "名词按可数性分为 ___。", options: ["可数名词和不可数名词", "专有名词和普通名词", "单数和复数", "具体和抽象"], answer: 0, explain: "教材：名词按其可数性可分为可数名词和不可数名词。" },
    { id: "N6-2", level: 6, stem: "Singapore 这类专有名词首字母 ___。", options: ["必须大写", "必须小写", "可大写可小写", "加引号"], answer: 0, explain: "专有名词的第一个字母一般要大写。" },
    { id: "N6-3", level: 6, stem: "the students' books 表示 ___。", options: ["学生们的书", "一个学生的书", "书的名称", "学生和书"], answer: 0, explain: "复数以 -s 结尾加 '，表示「……们的」。" },
    { id: "N6-4", level: 6, stem: "单数名词所有格 ___。", options: ["加 's", "只加 '", "加 s", "不变"], answer: 0, explain: "教材表2。" },
    { id: "N6-5", level: 6, stem: "复数名词不以 -s 结尾时，所有格 ___。", options: ["加 's", "只加 '", "加 s'", "不变"], answer: 0, explain: "如 Children's Day；教材表2。" },
    { id: "N6-6", level: 6, stem: "milk 是不可数名词，___ 复数形式。", options: ["没有", "有", "有两种", "只有 milk's"], answer: 0, explain: "不可数名词一般没有复数形式。" },
    { id: "N6-7", level: 6, stem: "表示顺序先后的数词叫 ___。", options: ["序数词", "基数词", "数词", "名词"], answer: 0, explain: "教材：数词包括基数词和序数词，序数词表示顺序的先后。" },
    { id: "N6-8", level: 6, stem: "用于连接单词、短语或句子的词类是 ___。", options: ["连词", "介词", "副词", "冠词"], answer: 0, explain: "连词（Conjunction）；表1。" }
  ]
};
})();
