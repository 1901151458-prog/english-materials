/* 七下名词专项 · 48 题 / 6 级 */
(function(){
window.G7B_NOUNS = {
  levels: [
    { id: 1, name: "可数与不可数", short: "可数性", desc: "可数名词有复数；不可数名词一般没有。" },
    { id: 2, name: "复数 · 规则变化", short: "规则变化", desc: "加 -s、加 -es、y 变 i 加 -es。" },
    { id: 3, name: "复数 · 读音", short: "读音", desc: "/s/、/z/、/ɪz/ 的判断。" },
    { id: 4, name: "复数 · 不规则", short: "不规则", desc: "man-men、child-children、sheep-sheep 等。" },
    { id: 5, name: "既可数又不可数", short: "两可类", desc: "fruit、fish、chicken 等。" },
    { id: 6, name: "综合提升", short: "综合", desc: "可数性、复数形式与读音混合辨析。" }
  ],
  questions: [
    { id: "Q1-1", level: 1, stem: "apple 属于 ___。", options: ["可数名词", "不可数名词", "专有名词", "抽象名词"], answer: 0, explain: "apple 有复数 apples；教材：可数名词有单数和复数两种形式。" },
    { id: "Q1-2", level: 1, stem: "milk 属于 ___。", options: ["可数名词", "不可数名词", "专有名词", "复数名词"], answer: 1, explain: "milk 一般只有一种形式，不可数；教材例句。" },
    { id: "Q1-3", level: 1, stem: "bread 属于 ___。", options: ["可数名词", "不可数名词", "专有名词", "数词"], answer: 1, explain: "bread 不可数；教材例句。" },
    { id: "Q1-4", level: 1, stem: "rice 属于 ___。", options: ["可数名词", "不可数名词", "专有名词", "复数名词"], answer: 1, explain: "rice 不可数；教材例句。" },
    { id: "Q1-5", level: 1, stem: "a bag–some ___", options: ["bag", "bags", "bag's", "bagss"], answer: 1, explain: "可数名词有复数形式；教材例句 a bag–some bags。" },
    { id: "Q1-6", level: 1, stem: "不可数名词一般 ___ 复数形式。", options: ["没有", "有", "有两种", "只有 -s"], answer: 0, explain: "教材：不可数名词一般只有一种形式，没有复数形式。" },
    { id: "Q1-7", level: 1, stem: "an apple–two ___", options: ["apple", "apples", "apple's", "applies"], answer: 1, explain: "可数名词变复数；教材例句 an apple–two apples。" },
    { id: "Q1-8", level: 1, stem: "可数名词有 ___ 两种形式。", options: ["单数和复数", "主格和宾格", "原级和比较级", "肯定和否定"], answer: 0, explain: "教材：可数名词有单数和复数两种形式。" },

    { id: "Q2-1", level: 2, stem: "book 的复数是 ___。", options: ["books", "bookes", "book's", "bookies"], answer: 0, explain: "一般情况词尾加 -s；教材表1。" },
    { id: "Q2-2", level: 2, stem: "class 的复数是 ___。", options: ["classes", "classs", "classies", "class'es"], answer: 0, explain: "以 s 结尾加 -es；教材表1。" },
    { id: "Q2-3", level: 2, stem: "box 的复数是 ___。", options: ["boxes", "boxs", "boxies", "box'es"], answer: 0, explain: "以 x 结尾加 -es；教材表1。" },
    { id: "Q2-4", level: 2, stem: "watch 的复数是 ___。", options: ["watches", "watchs", "watchies", "watch'es"], answer: 0, explain: "以 ch 结尾加 -es；教材表1。" },
    { id: "Q2-5", level: 2, stem: "dish 的复数是 ___。", options: ["dishes", "dishs", "dishies", "dish'es"], answer: 0, explain: "以 sh 结尾加 -es；教材表1。" },
    { id: "Q2-6", level: 2, stem: "family 的复数是 ___。", options: ["families", "familys", "familyes", "familiees"], answer: 0, explain: "辅音字母 + y 结尾，y 变 i 加 -es；教材表1。" },
    { id: "Q2-7", level: 2, stem: "strawberry 的复数是 ___。", options: ["strawberries", "strawberrys", "strawberryes", "strawberries'"], answer: 0, explain: "y 变 i 加 -es；教材表1。" },
    { id: "Q2-8", level: 2, stem: "key 的复数是 ___。", options: ["keys", "keies", "keyes", "key's"], answer: 0, explain: "元音字母 + y 结尾，直接加 -s；教材表1 keys。" },

    { id: "Q3-1", level: 3, stem: "books 中 -s 读 ___。", options: ["/s/", "/z/", "/ɪz/", "/t/"], answer: 0, explain: "清辅音 /k/ 后读 /s/；教材表1。" },
    { id: "Q3-2", level: 3, stem: "bags 中 -s 读 ___。", options: ["/s/", "/z/", "/ɪz/", "/d/"], answer: 1, explain: "浊辅音 /ɡ/ 后读 /z/；教材表1。" },
    { id: "Q3-3", level: 3, stem: "classes 中 -es 读 ___。", options: ["/s/", "/z/", "/ɪz/", "/es/"], answer: 2, explain: "在 /s/ 音后读 /ɪz/；教材表1。" },
    { id: "Q3-4", level: 3, stem: "boxes 中 -es 读 ___。", options: ["/s/", "/z/", "/ɪz/", "/əz/"], answer: 2, explain: "在 /s/ 音后读 /ɪz/；教材表1。" },
    { id: "Q3-5", level: 3, stem: "keys 中 -s 读 ___。", options: ["/s/", "/z/", "/ɪz/", "/iːz/"], answer: 1, explain: "元音后读 /z/；教材表1。" },
    { id: "Q3-6", level: 3, stem: "watches 中 -es 读 ___。", options: ["/s/", "/z/", "/ɪz/", "/tʃɪz/"], answer: 2, explain: "在 /tʃ/ 后读 /ɪz/；教材表1。" },
    { id: "Q3-7", level: 3, stem: "boys 中 -s 读 ___。", options: ["/s/", "/z/", "/ɪz/", "/ɔɪz/"], answer: 1, explain: "元音后读 /z/；教材表1。" },
    { id: "Q3-8", level: 3, stem: "dishes 中 -es 读 ___。", options: ["/s/", "/z/", "/ɪz/", "/ʃz/"], answer: 2, explain: "在 /ʃ/ 后读 /ɪz/；教材表1。" },

    { id: "Q4-1", level: 4, stem: "man 的复数是 ___。", options: ["men", "mans", "manes", "mens"], answer: 0, explain: "不规则复数；教材注释。" },
    { id: "Q4-2", level: 4, stem: "woman 的复数是 ___。", options: ["women", "womans", "womens", "womies"], answer: 0, explain: "不规则复数；教材注释。" },
    { id: "Q4-3", level: 4, stem: "child 的复数是 ___。", options: ["children", "childs", "childes", "childrens"], answer: 0, explain: "不规则复数；教材注释。" },
    { id: "Q4-4", level: 4, stem: "sheep 的复数是 ___。", options: ["sheep", "sheeps", "sheepes", "sheep's"], answer: 0, explain: "单复数同形；教材注释。" },
    { id: "Q4-5", level: 4, stem: "下列哪个是不规则复数？", options: ["man–men", "book–books", "bag–bags", "key–keys"], answer: 0, explain: "教材注释列出 man–men、woman–women、child–children、sheep–sheep。" },
    { id: "Q4-6", level: 4, stem: "child 的复数属于 ___ 变化。", options: ["不规则", "规则", "加 -s", "加 -es"], answer: 0, explain: "child–children 属不规则变化。" },
    { id: "Q4-7", level: 4, stem: "two ___（woman）", options: ["women", "womans", "womens", "woman"], answer: 0, explain: "woman 的复数是不规则的 women。" },
    { id: "Q4-8", level: 4, stem: "three ___（sheep）", options: ["sheep", "sheeps", "sheepes", "sheeps'"], answer: 0, explain: "sheep 单复数同形。" },

    { id: "Q5-1", level: 5, stem: "fruit 可以 ___。", options: ["既作可数也作不可数", "只能作可数", "只能作不可数", "不能作名词"], answer: 0, explain: "教材：fruit 既可充当可数名词也可充当不可数名词。" },
    { id: "Q5-2", level: 5, stem: "fish 可以 ___。", options: ["既作可数也作不可数", "只能作可数", "只能作不可数", "只能作动词"], answer: 0, explain: "教材：fish 两可；同时也可作动词。" },
    { id: "Q5-3", level: 5, stem: "chicken 可以 ___。", options: ["既作可数也作不可数", "只能作可数", "只能作不可数", "不能作名词"], answer: 0, explain: "教材：chicken 两可（鸡／鸡肉）。" },
    { id: "Q5-4", level: 5, stem: "下列哪个词既可数又不可数？", options: ["fish", "book", "milk", "rice"], answer: 0, explain: "教材列出 fruit、fish、chicken 三个两可词。" },
    { id: "Q5-5", level: 5, stem: "下列哪个是不可数名词？", options: ["rice", "apple", "bag", "pen"], answer: 0, explain: "rice 不可数；教材例句。" },
    { id: "Q5-6", level: 5, stem: "下列哪个是可数名词？", options: ["apple", "milk", "bread", "rice"], answer: 0, explain: "apple 可数；教材例句。" },
    { id: "Q5-7", level: 5, stem: "some ___（bag）", options: ["bags", "bag", "bag's", "bagies"], answer: 0, explain: "可数名词复数为 bags；教材例句 some bags。" },
    { id: "Q5-8", level: 5, stem: "two ___（apple）", options: ["apples", "apple", "apple's", "applies"], answer: 0, explain: "可数名词变复数；教材例句 two apples。" },

    { id: "Q6-1", level: 6, stem: "名词按其性质分为 ___ 和不可数名词。", options: ["可数名词", "专有名词", "普通名词", "抽象名词"], answer: 0, explain: "教材：名词按其所表示的事物的性质可分为可数名词和不可数名词。" },
    { id: "Q6-2", level: 6, stem: "class 的复数 ___。", options: ["classes", "classs", "classies", "classees"], answer: 0, explain: "以 s 结尾加 -es。" },
    { id: "Q6-3", level: 6, stem: "party 的复数 ___。", options: ["parties", "partys", "partyies", "party's"], answer: 0, explain: "辅音字母 + y，y 变 i 加 -es。" },
    { id: "Q6-4", level: 6, stem: "book–books 中 -s 读 ___。", options: ["/s/", "/z/", "/ɪz/", "/b/"], answer: 0, explain: "清辅音 /k/ 后读 /s/。" },
    { id: "Q6-5", level: 6, stem: "box–boxes 中 -es 读 ___。", options: ["/ɪz/", "/s/", "/z/", "/es/"], answer: 0, explain: "在 /s/ 音后读 /ɪz/。" },
    { id: "Q6-6", level: 6, stem: "two ___（child）", options: ["children", "childs", "childes", "childrens"], answer: 0, explain: "不规则复数 children。" },
    { id: "Q6-7", level: 6, stem: "milk 有复数形式吗？", options: ["没有", "有", "有两种", "只有 milk's"], answer: 0, explain: "不可数名词一般没有复数形式。" },
    { id: "Q6-8", level: 6, stem: "family–families 中 -ies 读 ___。", options: ["/ɪz/", "/s/", "/z/", "/aɪz/"], answer: 0, explain: "在 /z/ 等音后读 /ɪz/；教材表1 /ˈfæməlɪz/。" }
  ]
};
})();
