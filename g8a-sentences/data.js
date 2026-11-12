/* 八上句子种类与句子成分专项 · 48 题 / 6 级 */
(function(){
window.G8A_SENTENCES = {
  levels: [
    { id: 1, name: "句子种类", short: "句子种类", desc: "陈述句、疑问句、祈使句、感叹句的辨别。" },
    { id: 2, name: "句子成分 · 主谓表", short: "主谓表", desc: "找出一句里的主语、谓语、表语。" },
    { id: 3, name: "句子成分 · 宾定状补", short: "宾定状补", desc: "找宾语、定语、状语、宾语补足语。" },
    { id: 4, name: "五种句型 · SV / SP", short: "SV/SP", desc: "主谓（SV）与主系表（SP）的辨别。" },
    { id: 5, name: "五种句型 · SVO / SVOO / SVOC", short: "SVO/SVOO/SVOC", desc: "主谓宾、主谓宾宾、主谓宾补的辨别。" },
    { id: 6, name: "综合提升", short: "综合", desc: "句子种类、成分与五种句型的混合辨析。" }
  ],
  questions: [
    // ---------- L1 句子种类 ----------
    { id: "S1-1", level: 1, stem: "Bamboo is a symbol of goodness in Chinese culture. 属于哪类句子？", options: ["陈述句", "疑问句", "祈使句", "感叹句"], answer: 0, explain: "说明事实，是陈述句；教材例句。" },
    { id: "S1-2", level: 1, stem: "Did you do anything special on holiday? 属于哪类句子？", options: ["陈述句", "疑问句", "祈使句", "感叹句"], answer: 1, explain: "提出问题，是疑问句；教材例句。" },
    { id: "S1-3", level: 1, stem: "Don't be nervous. 属于哪类句子？", options: ["陈述句", "疑问句", "祈使句", "感叹句"], answer: 2, explain: "表示劝告，是祈使句；教材例句。" },
    { id: "S1-4", level: 1, stem: "How clever you are! 属于哪类句子？", options: ["陈述句", "疑问句", "祈使句", "感叹句"], answer: 3, explain: "表达强烈感情，是感叹句；教材例句。" },
    { id: "S1-5", level: 1, stem: "Let's make some mashed potatoes for lunch. 属于哪类句子？", options: ["陈述句", "疑问句", "祈使句", "感叹句"], answer: 2, explain: "表示建议，是祈使句；教材例句。" },
    { id: "S1-6", level: 1, stem: "What wonderful memories I have! 属于哪类句子？", options: ["陈述句", "疑问句", "祈使句", "感叹句"], answer: 3, explain: "What 引导的感叹句；教材例句。" },
    { id: "S1-7", level: 1, stem: "Pay attention to your body language. 属于哪类句子？", options: ["陈述句", "疑问句", "祈使句", "感叹句"], answer: 2, explain: "表示命令要求，是祈使句；教材例句。" },
    { id: "S1-8", level: 1, stem: "Which would you like, tea or coffee? 属于哪类句子？", options: ["陈述句", "疑问句", "祈使句", "感叹句"], answer: 1, explain: "提出问题，是疑问句；教材例句。" },

    // ---------- L2 主谓表 ----------
    { id: "S2-1", level: 2, stem: "My sister wants to be a singer. 主语是？", options: ["My sister", "wants", "to be a singer", "singer"], answer: 0, explain: "My sister 是主语，表示句子说的是谁；教材例句。" },
    { id: "S2-2", level: 2, stem: "I love our new house. 谓语是？", options: ["I", "love", "our new house", "new"], answer: 1, explain: "love 是谓语动词；教材例句。" },
    { id: "S2-3", level: 2, stem: "The metro stations are beautiful. 表语是？", options: ["The metro stations", "are", "beautiful", "stations"], answer: 2, explain: "beautiful 作表语，说明主语怎么样；教材例句。" },
    { id: "S2-4", level: 2, stem: "Everything tasted good. 主语是？", options: ["Everything", "tasted", "good", "taste"], answer: 0, explain: "Everything 是主语；教材例句。" },
    { id: "S2-5", level: 2, stem: "The film starts at half past two. 谓语是？", options: ["The film", "starts", "at half past two", "film"], answer: 1, explain: "starts 是谓语动词；教材例句。" },
    { id: "S2-6", level: 2, stem: "You seem positive about the future. 表语是？", options: ["You", "seem", "positive", "about the future"], answer: 2, explain: "positive 是表语；教材例句。" },
    { id: "S2-7", level: 2, stem: "Many people are singing and dancing in the park. 谓语部分是？", options: ["Many people", "are singing and dancing", "in the park", "people"], answer: 1, explain: "are singing and dancing 是谓语部分；教材例句。" },
    { id: "S2-8", level: 2, stem: "A good friend is like a mirror. 表语是？", options: ["A good friend", "is", "like a mirror", "mirror"], answer: 2, explain: "like a mirror 作表语；教材例句。" },

    // ---------- L3 宾定状补 ----------
    { id: "S3-1", level: 3, stem: "We need some milk and butter. 宾语是？", options: ["We", "need", "some milk and butter", "milk"], answer: 2, explain: "some milk and butter 是 need 的宾语；教材例句。" },
    { id: "S3-2", level: 3, stem: "I found the book very interesting. 宾语补足语是？", options: ["I", "found", "the book", "very interesting"], answer: 3, explain: "very interesting 补足宾语 the book 的意义；教材例句。" },
    { id: "S3-3", level: 3, stem: "My parents want me to be a doctor. 宾语补足语是？", options: ["My parents", "want", "me", "to be a doctor"], answer: 3, explain: "to be a doctor 作宾语补足语；教材例句。" },
    { id: "S3-4", level: 3, stem: "I like it very much. 状语是？", options: ["I", "like", "it", "very much"], answer: 3, explain: "very much 表示程度，作状语；教材例句。" },
    { id: "S3-5", level: 3, stem: "We will meet at nine o'clock. 状语是？", options: ["We", "will meet", "at nine o'clock", "nine"], answer: 2, explain: "at nine o'clock 表示时间，作状语；教材例句。" },
    { id: "S3-6", level: 3, stem: "I am going to make three resolutions. 定语是？", options: ["I", "am going to make", "three", "resolutions"], answer: 2, explain: "three 修饰名词 resolutions，作定语；教材例句。" },
    { id: "S3-7", level: 3, stem: "Could you take me to the flower shop? 宾语是？", options: ["Could you", "take", "me", "the flower shop"], answer: 2, explain: "me 是 take 的宾语；教材例句。" },
    { id: "S3-8", level: 3, stem: "Bees are hard workers. 定语是？", options: ["Bees", "are", "hard", "workers"], answer: 2, explain: "hard 修饰名词 workers，作定语；教材例句。" },

    // ---------- L4 SV / SP ----------
    { id: "S4-1", level: 4, stem: "Ella is dancing. 属于哪种基本句型？", options: ["主谓 (SV)", "主系表 (SP)", "主谓宾 (SVO)", "主谓宾补 (SVOC)"], answer: 0, explain: "is dancing 是不及物动词短语，属主谓结构；教材例句。" },
    { id: "S4-2", level: 4, stem: "They are friends. 属于哪种基本句型？", options: ["主谓 (SV)", "主系表 (SP)", "主谓宾 (SVO)", "主谓宾宾 (SVOO)"], answer: 1, explain: "are 是系动词，friends 是表语；教材例句。" },
    { id: "S4-3", level: 4, stem: "They look the same. 属于哪种基本句型？", options: ["主谓 (SV)", "主系表 (SP)", "主谓宾 (SVO)", "主谓宾补 (SVOC)"], answer: 1, explain: "look 是系动词，the same 是表语；教材例句。" },
    { id: "S4-4", level: 4, stem: "The baby is sleeping. 属于哪种基本句型？", options: ["主谓 (SV)", "主系表 (SP)", "主谓宾 (SVO)", "主谓宾宾 (SVOO)"], answer: 0, explain: "sleep 是不及物动词，属主谓结构。" },
    { id: "S4-5", level: 4, stem: "She is a teacher. 属于哪种基本句型？", options: ["主谓 (SV)", "主系表 (SP)", "主谓宾 (SVO)", "主谓宾补 (SVOC)"], answer: 1, explain: "is 是系动词，a teacher 是表语。" },
    { id: "S4-6", level: 4, stem: "The sun rises in the east. 属于哪种基本句型？", options: ["主谓 (SV)", "主系表 (SP)", "主谓宾 (SVO)", "主谓宾宾 (SVOO)"], answer: 0, explain: "rise 是不及物动词，属主谓结构。" },
    { id: "S4-7", level: 4, stem: "He feels happy. 属于哪种基本句型？", options: ["主谓 (SV)", "主系表 (SP)", "主谓宾 (SVO)", "主谓宾补 (SVOC)"], answer: 1, explain: "feel 是系动词，happy 是表语。" },
    { id: "S4-8", level: 4, stem: "They arrived late. 属于哪种基本句型？", options: ["主谓 (SV)", "主系表 (SP)", "主谓宾 (SVO)", "主谓宾宾 (SVOO)"], answer: 0, explain: "arrive 是不及物动词，属主谓结构。" },

    // ---------- L5 SVO / SVOO / SVOC ----------
    { id: "S5-1", level: 5, stem: "I like bananas. 属于哪种基本句型？", options: ["主谓宾 (SVO)", "主谓宾宾 (SVOO)", "主谓宾补 (SVOC)", "主系表 (SP)"], answer: 0, explain: "like + 宾语 bananas，属主谓宾；教材例句。" },
    { id: "S5-2", level: 5, stem: "She gave me a pen. 属于哪种基本句型？", options: ["主谓宾 (SVO)", "主谓宾宾 (SVOO)", "主谓宾补 (SVOC)", "主系表 (SP)"], answer: 1, explain: "gave + 间接宾语 me + 直接宾语 a pen；教材例句。" },
    { id: "S5-3", level: 5, stem: "He made us laugh. 属于哪种基本句型？", options: ["主谓宾 (SVO)", "主谓宾宾 (SVOO)", "主谓宾补 (SVOC)", "主系表 (SP)"], answer: 2, explain: "made + 宾语 us + 宾补 laugh；教材例句。" },
    { id: "S5-4", level: 5, stem: "We need some milk. 属于哪种基本句型？", options: ["主谓宾 (SVO)", "主谓宾宾 (SVOO)", "主谓宾补 (SVOC)", "主系表 (SP)"], answer: 0, explain: "need + 宾语，属主谓宾。" },
    { id: "S5-5", level: 5, stem: "My parents want me to be a doctor. 属于哪种基本句型？", options: ["主谓宾 (SVO)", "主谓宾宾 (SVOO)", "主谓宾补 (SVOC)", "主系表 (SP)"], answer: 2, explain: "want + 宾语 me + 宾补 to be a doctor。" },
    { id: "S5-6", level: 5, stem: "He gave his sister a book. 属于哪种基本句型？", options: ["主谓宾 (SVO)", "主谓宾宾 (SVOO)", "主谓宾补 (SVOC)", "主系表 (SP)"], answer: 1, explain: "gave + 间接宾语 his sister + 直接宾语 a book。" },
    { id: "S5-7", level: 5, stem: "The teacher asked us to be quiet. 属于哪种基本句型？", options: ["主谓宾 (SVO)", "主谓宾宾 (SVOO)", "主谓宾补 (SVOC)", "主系表 (SP)"], answer: 2, explain: "asked + 宾语 us + 宾补 to be quiet。" },
    { id: "S5-8", level: 5, stem: "I found the book interesting. 属于哪种基本句型？", options: ["主谓宾 (SVO)", "主谓宾宾 (SVOO)", "主谓宾补 (SVOC)", "主系表 (SP)"], answer: 2, explain: "found + 宾语 the book + 宾补 interesting。" },

    // ---------- L6 综合 ----------
    { id: "S6-1", level: 6, stem: "Bamboo is a symbol of goodness. 属于哪种基本句型？", options: ["主谓 (SV)", "主系表 (SP)", "主谓宾 (SVO)", "主谓宾补 (SVOC)"], answer: 1, explain: "is 是系动词，a symbol of goodness 是表语。" },
    { id: "S6-2", level: 6, stem: "Don't be nervous. 属于哪类句子？", options: ["陈述句", "疑问句", "祈使句", "感叹句"], answer: 2, explain: "否定祈使句。" },
    { id: "S6-3", level: 6, stem: "What wonderful memories I have! 属于哪类句子？", options: ["陈述句", "疑问句", "祈使句", "感叹句"], answer: 3, explain: "What 引导的感叹句。" },
    { id: "S6-4", level: 6, stem: "I like it very much. 其中 very much 是？", options: ["宾语", "状语", "定语", "表语"], answer: 1, explain: "very much 修饰动词 like，表程度，作状语。" },
    { id: "S6-5", level: 6, stem: "She gave me a pen. 其中 me 是？", options: ["直接宾语", "间接宾语", "宾语补足语", "定语"], answer: 1, explain: "me 是间接宾语，a pen 是直接宾语。" },
    { id: "S6-6", level: 6, stem: "He made us laugh. 其中 laugh 是？", options: ["宾语", "宾语补足语", "状语", "定语"], answer: 1, explain: "laugh 补足宾语 us 的意义，是宾语补足语。" },
    { id: "S6-7", level: 6, stem: "They are friends. 其中 friends 是？", options: ["主语", "谓语", "表语", "宾语"], answer: 2, explain: "friends 在系动词 are 后作表语。" },
    { id: "S6-8", level: 6, stem: "My sister wants to be a singer. 其中 My sister 是？", options: ["主语", "谓语", "宾语", "表语"], answer: 0, explain: "My sister 是句子的主语。" }
  ]
};
})();
