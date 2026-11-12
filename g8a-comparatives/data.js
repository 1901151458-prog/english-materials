/* 八上比较级与最高级专项 · 48 题 / 6 级 */
(function(){
window.G8A_COMPARATIVES = {
  levels: [
    { id: 1, name: "构成 · 规则变化", short: "规则变化", desc: "加 -er/-est、双写、y 变 i、more/most。" },
    { id: 2, name: "构成 · 不规则变化", short: "不规则", desc: "good/better/best、bad/worse/worst 等。" },
    { id: 3, name: "比较级用法", short: "比较级", desc: "比较级 + than；much / a little 修饰比较级。" },
    { id: 4, name: "最高级用法", short: "最高级", desc: "三者及以上比较；形容词前加 the，of/in/among 说明范围。" },
    { id: 5, name: "as ... as 句型", short: "as...as", desc: "as + 原级 + as（相同）；not as / so + 原级 + as（不及）。" },
    { id: 6, name: "综合提升", short: "综合", desc: "比较级与最高级在各种句型中的混合辨析。" }
  ],
  questions: [
    // ---------- L1 规则变化 ----------
    { id: "M1-1", level: 1, stem: "tall → ___", options: ["taller", "tallest", "more tall", "most tall"], answer: 0, explain: "单音节词加 -er 构成比较级。" },
    { id: "M1-2", level: 1, stem: "big → ___", options: ["bigger", "biger", "biggest", "more big"], answer: 0, explain: "重读闭音节词尾只有一个辅音字母，双写再加 -er。" },
    { id: "M1-3", level: 1, stem: "easy → ___", options: ["easier", "easest", "more easy", "most easy"], answer: 0, explain: "以「辅音字母 + y」结尾，变 y 为 i 再加 -er。" },
    { id: "M1-4", level: 1, stem: "beautiful → ___", options: ["more beautiful", "beautifuler", "beautifulest", "most beautiful"], answer: 0, explain: "多音节词前加 more 构成比较级。" },
    { id: "M1-5", level: 1, stem: "large → ___", options: ["larger", "largest", "largger", "larggest"], answer: 0, explain: "以字母 e 结尾，加 -r 构成比较级。" },
    { id: "M1-6", level: 1, stem: "hot → ___", options: ["hotter", "hoter", "hottest", "hotest"], answer: 0, explain: "重读闭音节双写再加 -er。" },
    { id: "M1-7", level: 1, stem: "early → ___", options: ["earlier", "earliest", "more early", "most early"], answer: 0, explain: "「辅音 + y」结尾，y 变 i 加 -er。" },
    { id: "M1-8", level: 1, stem: "interesting → ___", options: ["more interesting", "interestinger", "most interesting", "interestingest"], answer: 0, explain: "多音节词前加 more 构成比较级。" },

    // ---------- L2 不规则 ----------
    { id: "M2-1", level: 2, stem: "good → ___", options: ["better", "best", "gooder", "goodest"], answer: 0, explain: "不规则：good / well → better → best；教材表2。" },
    { id: "M2-2", level: 2, stem: "bad → ___", options: ["worse", "worst", "badder", "baddest"], answer: 0, explain: "不规则：bad / badly → worse → worst；教材表2。" },
    { id: "M2-3", level: 2, stem: "many → ___", options: ["more", "most", "manyer", "manyest"], answer: 0, explain: "不规则：many / much → more → most；教材表2。" },
    { id: "M2-4", level: 2, stem: "little → ___", options: ["less", "least", "littler", "littlest"], answer: 0, explain: "不规则：little → less → least；教材表2。" },
    { id: "M2-5", level: 2, stem: "far → ___", options: ["farther", "farthest", "farer", "farest"], answer: 0, explain: "不规则：far → farther / further → farthest / furthest；教材表2。" },
    { id: "M2-6", level: 2, stem: "well → ___", options: ["better", "best", "gooder", "weller"], answer: 0, explain: "不规则：good / well → better → best；教材表2。" },
    { id: "M2-7", level: 2, stem: "much → ___", options: ["more", "most", "mucher", "muchest"], answer: 0, explain: "不规则：many / much → more → most；教材表2。" },
    { id: "M2-8", level: 2, stem: "badly → ___", options: ["worse", "worst", "baddly", "badliest"], answer: 0, explain: "不规则：bad / badly → worse → worst；教材表2。" },

    // ---------- L3 比较级用法 ----------
    { id: "M3-1", level: 3, stem: "I'm ___ than my sister.", options: ["more outgoing", "outgoing", "most outgoing", "outgoinger"], answer: 0, explain: "两者比较用比较级 + than；教材例句。" },
    { id: "M3-2", level: 3, stem: "He works much ___ than me.", options: ["harder", "hard", "hardest", "hardly"], answer: 0, explain: "比较级前可用 much 修饰；教材例句。" },
    { id: "M3-3", level: 3, stem: "My brother is a little ___ than me.", options: ["taller", "tall", "tallest", "tallly"], answer: 0, explain: "比较级前可用 a little 修饰；教材例句。" },
    { id: "M3-4", level: 3, stem: "You know more about yourself ___ I (do).", options: ["than", "as", "so", "that"], answer: 0, explain: "比较级 + than；教材例句。" },
    { id: "M3-5", level: 3, stem: "This book is ___ than that one.", options: ["more interesting", "interesting", "most interesting", "interestinger"], answer: 0, explain: "多音节词用 more + 原级构成比较级。" },
    { id: "M3-6", level: 3, stem: "She is ___ today than yesterday.", options: ["better", "good", "best", "well"], answer: 0, explain: "good 的比较级是 better。" },
    { id: "M3-7", level: 3, stem: "The weather is getting ___.", options: ["warmer", "warm", "warmest", "warmly"], answer: 0, explain: "「越来越暖」用比较级。" },
    { id: "M3-8", level: 3, stem: "He runs ___ than his brother.", options: ["faster", "fast", "fastest", "fastly"], answer: 0, explain: "副词比较级 faster + than。" },

    // ---------- L4 最高级 ----------
    { id: "M4-1", level: 4, stem: "The blue whale is the ___ animal in the world.", options: ["largest", "large", "larger", "largely"], answer: 0, explain: "三者以上比较 + in the world，用最高级；教材例句。" },
    { id: "M4-2", level: 4, stem: "In my country, July is the ___ month of the year.", options: ["hottest", "hot", "hotter", "hotly"], answer: 0, explain: "最高级 + of the year；教材例句。" },
    { id: "M4-3", level: 4, stem: "The cheetah runs (the) ___ among all land animals.", options: ["fastest", "fast", "faster", "fastly"], answer: 0, explain: "副词最高级 + among；教材例句。" },
    { id: "M4-4", level: 4, stem: "She is the ___ student in our class.", options: ["tallest", "tall", "taller", "tallly"], answer: 0, explain: "三者以上范围用最高级。" },
    { id: "M4-5", level: 4, stem: "This is the ___ book I have ever read.", options: ["most interesting", "more interesting", "interesting", "interestingly"], answer: 0, explain: "「我读过的最……的书」用最高级。" },
    { id: "M4-6", level: 4, stem: "He is the ___ of the three.", options: ["strongest", "strong", "stronger", "strongly"], answer: 0, explain: "三者比较用最高级。" },
    { id: "M4-7", level: 4, stem: "Winter is the ___ season of the year.", options: ["coldest", "cold", "colder", "coldly"], answer: 0, explain: "最高级 + of the year。" },
    { id: "M4-8", level: 4, stem: "It's the ___ film of the year.", options: ["best", "good", "better", "well"], answer: 0, explain: "good 的最高级是 best。" },

    // ---------- L5 as ... as ----------
    { id: "M5-1", level: 5, stem: "I think science is ___ important as maths.", options: ["as", "so", "than", "more"], answer: 0, explain: "as + 原级 + as 表示相同；教材例句。" },
    { id: "M5-2", level: 5, stem: "Tom runs as ___ as Jack.", options: ["fast", "faster", "fastest", "fastly"], answer: 0, explain: "as ... as 中间用原级；教材例句。" },
    { id: "M5-3", level: 5, stem: "It is not as ___ today as yesterday.", options: ["warm", "warmer", "warmest", "warmly"], answer: 0, explain: "not as + 原级 + as 表示不及；教材例句。" },
    { id: "M5-4", level: 5, stem: "He did not come as ___ as Wang Lin.", options: ["early", "earlier", "earliest", "earlyly"], answer: 0, explain: "not as ... as 中间用原级；教材例句。" },
    { id: "M5-5", level: 5, stem: "She is as ___ as her sister.", options: ["tall", "taller", "tallest", "tallly"], answer: 0, explain: "as ... as 用原级。" },
    { id: "M5-6", level: 5, stem: "This room is not so ___ as that one.", options: ["big", "bigger", "biggest", "bigly"], answer: 0, explain: "not so + 原级 + as 表示不及。" },
    { id: "M5-7", level: 5, stem: "I can run as ___ as you.", options: ["quickly", "quicker", "quickest", "more quickly"], answer: 0, explain: "as ... as 中间用副词原级。" },
    { id: "M5-8", level: 5, stem: "The film is not as ___ as I expected.", options: ["good", "better", "best", "well"], answer: 0, explain: "not as + 原级 + as。" },

    // ---------- L6 综合 ----------
    { id: "M6-1", level: 6, stem: "The weather is ___ colder than yesterday.", options: ["much", "more", "most", "very"], answer: 0, explain: "比较级前用 much 修饰；very 不能修饰比较级。" },
    { id: "M6-2", level: 6, stem: "My sister is three years ___ than me.", options: ["older", "old", "oldest", "elderly"], answer: 0, explain: "比较级 older + than。" },
    { id: "M6-3", level: 6, stem: "This is ___ most interesting book I have.", options: ["the", "a", "an", "/"], answer: 0, explain: "形容词最高级前一般要加定冠词 the。" },
    { id: "M6-4", level: 6, stem: "He is taller than ___ in his class.", options: ["any other student", "any student", "other student", "any other students"], answer: 0, explain: "比较级 + than any other + 单数名词，排除自身。" },
    { id: "M6-5", level: 6, stem: "Shanghai is ___ than any other city in China.", options: ["larger", "large", "largest", "largely"], answer: 0, explain: "than any other 后用比较级。" },
    { id: "M6-6", level: 6, stem: "Which is ___, tea or coffee?", options: ["more popular", "popular", "most popular", "popularly"], answer: 0, explain: "两者比较用比较级。" },
    { id: "M6-7", level: 6, stem: "She sings ___ than her sister.", options: ["better", "good", "well", "best"], answer: 0, explain: "well 的比较级是 better。" },
    { id: "M6-8", level: 6, stem: "Of all the students, he works ___.", options: ["hardest", "harder", "hard", "hardly"], answer: 0, explain: "of all 范围内用最高级。" }
  ]
};
})();
