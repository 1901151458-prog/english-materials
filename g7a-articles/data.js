/* 七上冠词与代词专项 · 48 题 / 6 级 */
(function(){
window.G7A_ARTICLES = {
  levels: [
    { id: 1, name: "定冠词 the", short: "the", desc: "特指双方已知的人或事物；/ðə/ 与 /ði/。" },
    { id: 2, name: "不定冠词 a / an", short: "a/an", desc: "非特指；an 用于元音音素开头。" },
    { id: 3, name: "零冠词", short: "零冠词", desc: "名词前不加冠词的情况。" },
    { id: 4, name: "人称代词", short: "人称代词", desc: "主格与宾格。" },
    { id: 5, name: "物主代词与指示代词", short: "物主/指示", desc: "形容词性物主代词；this/these/that/those。" },
    { id: 6, name: "综合提升", short: "综合", desc: "冠词、人称代词、物主代词与指示代词混合辨析。" }
  ],
  questions: [
    { id: "A1-1", level: 1, stem: "Where is ___ library?", options: ["the", "a", "an", "不填"], answer: 0, explain: "双方都知道的那个图书馆，特指用 the；教材例句。" },
    { id: "A1-2", level: 1, stem: "___ glasses are on her dad's nose.", options: ["The", "A", "An", "不填"], answer: 0, explain: "特指那副眼镜，用 the；教材例句。" },
    { id: "A1-3", level: 1, stem: "___ milk is on the table.", options: ["The", "A", "An", "不填"], answer: 0, explain: "特指桌上的牛奶，用 the；教材例句。" },
    { id: "A1-4", level: 1, stem: "定冠词的基本概念是 ___。", options: ["特指", "非特指", "泛指", "任指"], answer: 0, explain: "教材：定冠词的基本概念是「特指」。" },
    { id: "A1-5", level: 1, stem: "定冠词在辅音前读 ___。", options: ["/ðə/", "/ði/", "/θə/", "/θi/"], answer: 0, explain: "教材：定冠词在辅音前读 /ðə/。" },
    { id: "A1-6", level: 1, stem: "定冠词在元音前读 ___。", options: ["/ðə/", "/ði/", "/θə/", "/zi/"], answer: 1, explain: "教材：在元音前读 /ði/。" },
    { id: "A1-7", level: 1, stem: "___ sun rises in the east.", options: ["The", "A", "An", "不填"], answer: 0, explain: "世界上独一无二的事物前用 the。" },
    { id: "A1-8", level: 1, stem: "定冠词可与 ___ 一起使用。", options: ["单数可数、复数可数和不可数名词", "只能单数可数名词", "只能复数名词", "只能不可数名词"], answer: 0, explain: "教材：可与单数可数名词、复数可数名词或不可数名词一起使用。" },

    { id: "A2-1", level: 2, stem: "I have ___ pet dog.", options: ["a", "an", "the", "不填"], answer: 0, explain: "pet 以辅音音素开头，用 a；教材例句。" },
    { id: "A2-2", level: 2, stem: "Sometimes I play basketball for ___ hour.", options: ["a", "an", "the", "不填"], answer: 1, explain: "hour 以元音音素开头（h 不发音），用 an；教材例句。" },
    { id: "A2-3", level: 2, stem: "We have three lessons ___ day.", options: ["a", "an", "the", "不填"], answer: 0, explain: "a day 表示「每一天」；教材例句。" },
    { id: "A2-4", level: 2, stem: "an 放在以 ___ 开头的名词前面。", options: ["元音音素", "辅音音素", "元音字母", "辅音字母"], answer: 0, explain: "教材：an 放在以元音（音素）开头的名词前面。" },
    { id: "A2-5", level: 2, stem: "___ eraser", options: ["a", "an", "the", "不填"], answer: 1, explain: "eraser 以元音音素开头，用 an；教材例句。" },
    { id: "A2-6", level: 2, stem: "___ book", options: ["a", "an", "the", "不填"], answer: 0, explain: "book 以辅音音素开头，用 a。" },
    { id: "A2-7", level: 2, stem: "不定冠词只能与 ___ 一起使用。", options: ["单数可数名词", "复数可数名词", "不可数名词", "任何名词"], answer: 0, explain: "教材：不定冠词只能与单数可数名词一起使用。" },
    { id: "A2-8", level: 2, stem: "不定冠词的基本含义有「该类中的一例」「只有一个」「___」。", options: ["每一个", "全部", "某些", "任何一个"], answer: 0, explain: "教材：其基本含义有「该类中的一例」「只有一个」「每一个」等。" },

    { id: "A3-1", level: 3, stem: "My favourite subject is ___.", options: ["English", "the English", "an English", "a English"], answer: 0, explain: "学科名前用零冠词；教材例句。" },
    { id: "A3-2", level: 3, stem: "It's time for me to go to ___.", options: ["bed", "the bed", "a bed", "an bed"], answer: 0, explain: "go to bed 固定搭配，用零冠词；教材例句。" },
    { id: "A3-3", level: 3, stem: "Binbin is good with ___.", options: ["numbers", "the numbers", "a numbers", "an numbers"], answer: 0, explain: "泛指数字，用零冠词；教材例句。" },
    { id: "A3-4", level: 3, stem: "零冠词指名词前 ___ 的情况。", options: ["不加冠词", "加 the", "加 a", "加 an"], answer: 0, explain: "教材定义。" },
    { id: "A3-5", level: 3, stem: "有的语法书 ___ 把零冠词列为冠词的一种。", options: ["并不", "也会", "必须", "一定"], answer: 0, explain: "教材注释：有的语法书并不把零冠词列为冠词中的一种。" },
    { id: "A3-6", level: 3, stem: "早饭前：___。", options: ["before breakfast", "before the breakfast", "before a breakfast", "before an breakfast"], answer: 0, explain: "三餐名前用零冠词。" },
    { id: "A3-7", level: 3, stem: "球类运动前一般 ___。", options: ["不加冠词", "加 the", "加 a", "加 an"], answer: 0, explain: "play basketball 等球类运动前用零冠词。" },
    { id: "A3-8", level: 3, stem: "在学校：___。", options: ["at school", "at the school", "at a school", "at an school"], answer: 0, explain: "at school 是固定搭配，用零冠词。" },

    { id: "A4-1", level: 4, stem: "I 的宾格是 ___。", options: ["me", "my", "mine", "I"], answer: 0, explain: "人称代词宾格；教材表3。" },
    { id: "A4-2", level: 4, stem: "he 的宾格是 ___。", options: ["him", "his", "he", "her"], answer: 0, explain: "教材表3。" },
    { id: "A4-3", level: 4, stem: "they 的宾格是 ___。", options: ["them", "their", "they", "theirs"], answer: 0, explain: "教材表3。" },
    { id: "A4-4", level: 4, stem: "we 的宾格是 ___。", options: ["us", "our", "we", "ours"], answer: 0, explain: "教材表3。" },
    { id: "A4-5", level: 4, stem: "she 的宾格是 ___。", options: ["her", "hers", "she", "he"], answer: 0, explain: "教材表3。" },
    { id: "A4-6", level: 4, stem: "you 的宾格是 ___。", options: ["you", "your", "yours", "you's"], answer: 0, explain: "you 的主格和宾格同形；教材表3。" },
    { id: "A4-7", level: 4, stem: "it 的宾格是 ___。", options: ["it", "its", "it's", "itself"], answer: 0, explain: "it 的主格和宾格同形；教材表3。" },
    { id: "A4-8", level: 4, stem: "「他们」的主格是 ___。", options: ["they", "them", "their", "theirs"], answer: 0, explain: "教材表3。" },

    { id: "A5-1", level: 5, stem: "I 的形容词性物主代词是 ___。", options: ["my", "me", "mine", "I"], answer: 0, explain: "形容词性物主代词相当于形容词，置于名词前作定语。" },
    { id: "A5-2", level: 5, stem: "they 的形容词性物主代词是 ___。", options: ["their", "them", "they", "theirs"], answer: 0, explain: "their children 等。" },
    { id: "A5-3", level: 5, stem: "she 的形容词性物主代词是 ___。", options: ["her", "hers", "she", "him"], answer: 0, explain: "her favourite subject 等；教材例句。" },
    { id: "A5-4", level: 5, stem: "___ is my uncle's farm.（这个）", options: ["This", "That", "These", "Those"], answer: 0, explain: "this 指较近的事物；教材例句。" },
    { id: "A5-5", level: 5, stem: "___ are my friends.（这些）", options: ["This", "That", "These", "Those"], answer: 2, explain: "these 是 this 的复数；教材例句。" },
    { id: "A5-6", level: 5, stem: "Do you see ___ red house by the river?（那个）", options: ["this", "that", "these", "those"], answer: 1, explain: "that 指较远的事物；教材例句。" },
    { id: "A5-7", level: 5, stem: "___ ping-pong bats in the corner are my grandpa's.（那些）", options: ["This", "That", "These", "Those"], answer: 3, explain: "those 是 that 的复数；教材例句。" },
    { id: "A5-8", level: 5, stem: "this / these 指时间或空间上 ___ 的事物。", options: ["较近", "较远", "中间", "两边"], answer: 0, explain: "教材表5。" },

    { id: "A6-1", level: 6, stem: "___ sun is shining brightly.", options: ["The", "A", "An", "不填"], answer: 0, explain: "独一无二的事物前用 the。" },
    { id: "A6-2", level: 6, stem: "I want to be ___ doctor.", options: ["a", "an", "the", "不填"], answer: 0, explain: "非特指的单数可数名词用 a。" },
    { id: "A6-3", level: 6, stem: "Look at ___ elephant!", options: ["a", "an", "the", "不填"], answer: 1, explain: "elephant 以元音音素开头，用 an。" },
    { id: "A6-4", level: 6, stem: "___ is my schoolbag.（这个）", options: ["This", "That", "These", "Those"], answer: 0, explain: "this 指近处单数事物。" },
    { id: "A6-5", level: 6, stem: "He is good at ___ English.", options: ["不填", "the", "a", "an"], answer: 0, explain: "学科名前用零冠词。" },
    { id: "A6-6", level: 6, stem: "___ girl in red is my sister.", options: ["The", "A", "An", "不填"], answer: 0, explain: "in red 限定了范围，特指用 the。" },
    { id: "A6-7", level: 6, stem: "I have ___ uncle and ___ aunt.", options: ["an; an", "a; a", "an; a", "a; an"], answer: 0, explain: "uncle 和 aunt 都以元音音素开头，都用 an。" },
    { id: "A6-8", level: 6, stem: "that / those 指时间或空间上 ___ 的事物。", options: ["较远", "较近", "中间", "两边"], answer: 0, explain: "教材表5。" }
  ]
};
})();
