/* 八上不定代词专项 · 48 题 / 6 级 */
(function(){
window.G8A_PRONOUNS = {
  levels: [
    { id: 1, name: "some 和 any", short: "some/any", desc: "some 多用于肯定句，any 多用于否定句、疑问句和条件从句。" },
    { id: 2, name: "many 和 much", short: "many/much", desc: "many 修饰可数名词复数，much 修饰不可数名词。" },
    { id: 3, name: "few / a few / little / a little", short: "few/little", desc: "few、little 侧重否定；a few、a little 侧重肯定。" },
    { id: 4, name: "复合不定代词", short: "复合不定代词", desc: "some/any/no/every + -body/-one/-thing，作主语用单数。" },
    { id: 5, name: "定语后置", short: "定语后置", desc: "复合不定代词有定语修饰时，定语放在它后面。" },
    { id: 6, name: "综合提升", short: "综合", desc: "some/any、few/little、复合不定代词与 either/neither/none 混辨。" }
  ],
  questions: [
    // ---------- L1 some / any ----------
    { id: "U1-1", level: 1, stem: "Would you like ___ tea?", options: ["some", "any", "much", "many"], answer: 0, explain: "希望对方肯定答复时用 some，不用 any；教材例句。" },
    { id: "U1-2", level: 1, stem: "I don't have ___ money with me.", options: ["some", "any", "many", "much"], answer: 1, explain: "否定句用 any。" },
    { id: "U1-3", level: 1, stem: "Are there ___ books on the desk?", options: ["some", "any", "many", "much"], answer: 1, explain: "疑问句用 any。" },
    { id: "U1-4", level: 1, stem: "Could I have ___ water, please?", options: ["some", "any", "many", "much"], answer: 0, explain: "请求并希望得到肯定答复，用 some。" },
    { id: "U1-5", level: 1, stem: "He didn't buy ___ fruit yesterday.", options: ["some", "any", "many", "much"], answer: 1, explain: "否定句用 any。" },
    { id: "U1-6", level: 1, stem: "Do you have ___ questions?", options: ["some", "any", "many", "much"], answer: 1, explain: "疑问句用 any。" },
    { id: "U1-7", level: 1, stem: "If you have ___ problems, tell me.", options: ["some", "any", "many", "much"], answer: 1, explain: "条件从句中用 any；教材说明 any 也用于条件从句。" },
    { id: "U1-8", level: 1, stem: "A: Is there ___ water in the bottle? B: Yes, there is ___.", options: ["any; some", "some; any", "any; any", "some; some"], answer: 0, explain: "疑问句用 any，肯定回答用 some；教材例句。" },

    // ---------- L2 many / much ----------
    { id: "U2-1", level: 2, stem: "In the future, ___ people will live in outer space.", options: ["many", "much", "few", "little"], answer: 0, explain: "people 可数复数，用 many；教材例句。" },
    { id: "U2-2", level: 2, stem: "There isn't ___ water left in the bottle.", options: ["many", "much", "few", "little"], answer: 1, explain: "water 不可数，用 much；教材例句。" },
    { id: "U2-3", level: 2, stem: "I'm afraid the kids spend too ___ time online.", options: ["many", "much", "few", "little"], answer: 1, explain: "time 不可数，用 much；教材例句。" },
    { id: "U2-4", level: 2, stem: "How ___ students are there in your class?", options: ["many", "much", "few", "little"], answer: 0, explain: "students 可数复数，用 many。" },
    { id: "U2-5", level: 2, stem: "How ___ milk do you need?", options: ["many", "much", "few", "little"], answer: 1, explain: "milk 不可数，用 much。" },
    { id: "U2-6", level: 2, stem: "She has ___ friends in this city.", options: ["many", "much", "few", "little"], answer: 0, explain: "friends 可数复数，用 many。" },
    { id: "U2-7", level: 2, stem: "We don't have ___ time before the train leaves.", options: ["many", "much", "few", "little"], answer: 1, explain: "time 不可数，用 much。" },
    { id: "U2-8", level: 2, stem: "There are ___ books in the school library.", options: ["many", "much", "few", "little"], answer: 0, explain: "books 可数复数，用 many。" },

    // ---------- L3 few / a few / little / a little ----------
    { id: "U3-1", level: 3, stem: "___ people know what happened. It's a secret.", options: ["Few", "A few", "Little", "A little"], answer: 0, explain: "people 可数 + 否定含义（几乎没有），用 Few；教材例句。" },
    { id: "U3-2", level: 3, stem: "We stayed in the old town for ___ days.", options: ["few", "a few", "little", "a little"], answer: 1, explain: "days 可数 + 肯定含义（一些），用 a few；教材例句。" },
    { id: "U3-3", level: 3, stem: "Don't worry. There is ___ time left.", options: ["few", "a few", "little", "a little"], answer: 3, explain: "time 不可数 + 肯定含义（还有一些），用 a little；教材例句。" },
    { id: "U3-4", level: 3, stem: "There is now ___ hope of success.", options: ["few", "a few", "little", "a little"], answer: 2, explain: "hope 不可数 + 否定含义（几乎没有），用 little；教材例句。" },
    { id: "U3-5", level: 3, stem: "He has ___ money, so he can't buy the bike.", options: ["few", "a few", "little", "a little"], answer: 2, explain: "money 不可数 + 否定含义，用 little。" },
    { id: "U3-6", level: 3, stem: "I have ___ questions to ask you.", options: ["few", "a few", "little", "a little"], answer: 1, explain: "questions 可数复数 + 肯定含义，用 a few。" },
    { id: "U3-7", level: 3, stem: "___ students were late today — only two.", options: ["Few", "A few", "Little", "A little"], answer: 0, explain: "可数 + 「几乎没有」，用 Few。" },
    { id: "U3-8", level: 3, stem: "Can I have ___ sugar in my coffee?", options: ["few", "a few", "little", "a little"], answer: 3, explain: "sugar 不可数 + 「一点」，用 a little。" },

    // ---------- L4 复合不定代词 ----------
    { id: "U4-1", level: 4, stem: "___ says Yulong Mountain is beautiful.", options: ["Everyone", "Every one", "Every", "Each"], answer: 0, explain: "复合不定代词作主语，谓语用单数；教材例句。" },
    { id: "U4-2", level: 4, stem: "___ knows what the future will be like.", options: ["Nobody", "None", "No one of", "Nothing"], answer: 0, explain: "nobody 作主语，谓语用单数；教材例句。" },
    { id: "U4-3", level: 4, stem: "I'm on vacation in Hangzhou and ___ is fantastic.", options: ["everything", "something", "nothing", "anything"], answer: 0, explain: "表示「一切」，用 everything；教材例句。" },
    { id: "U4-4", level: 4, stem: "Is there ___ in the box?", options: ["anything", "something", "nothing", "everything"], answer: 0, explain: "疑问句用 anything。" },
    { id: "U4-5", level: 4, stem: "___ is impossible if you try your best.", options: ["Nothing", "Something", "Anything", "Everything"], answer: 0, explain: "Nothing is impossible「没有不可能」，用 nothing。" },
    { id: "U4-6", level: 4, stem: "Is there ___ interesting in today's newspaper?", options: ["anything", "something", "nothing", "everything"], answer: 0, explain: "疑问句用 anything。" },
    { id: "U4-7", level: 4, stem: "___ of the students came to school because of the heavy snow.", options: ["None", "Nobody", "No one", "Nothing"], answer: 0, explain: "none of + 名词，表示「都不」；nobody / no one 不能接 of。" },
    { id: "U4-8", level: 4, stem: "There is ___ wrong with my bike. It works well.", options: ["nothing", "something", "anything", "everything"], answer: 0, explain: "There is nothing wrong with ...「没有毛病」。" },

    // ---------- L5 定语后置 ----------
    { id: "U5-1", level: 5, stem: "Did you do anything ___ on your holiday?", options: ["fun", "funny", "funly", "funs"], answer: 0, explain: "修饰复合不定代词的定语后置：anything fun；教材例句。" },
    { id: "U5-2", level: 5, stem: "I did nothing ___.", options: ["special", "specially", "specialness", "specials"], answer: 0, explain: "nothing special「没什么特别的」，定语后置；教材例句。" },
    { id: "U5-3", level: 5, stem: "Yesterday, I met someone ___.", options: ["interesting", "interested", "interest", "interestingly"], answer: 0, explain: "someone interesting，定语后置；教材例句。" },
    { id: "U5-4", level: 5, stem: "Is there anything ___ in the newspaper?", options: ["new", "newly", "news", "newer"], answer: 0, explain: "anything new，定语后置。" },
    { id: "U5-5", level: 5, stem: "She wants something ___ to eat.", options: ["sweet", "sweetly", "sweetness", "sweets"], answer: 0, explain: "something sweet，定语后置。" },
    { id: "U5-6", level: 5, stem: "Did you see anybody ___ at the party?", options: ["famous", "famously", "fame", "famousness"], answer: 0, explain: "anybody famous，定语后置。" },
    { id: "U5-7", level: 5, stem: "There is nothing ___ with your computer.", options: ["wrong", "wrongly", "wrongness", "wrongs"], answer: 0, explain: "nothing wrong，定语后置。" },
    { id: "U5-8", level: 5, stem: "I have something ___ to tell you.", options: ["important", "importantly", "importance", "importants"], answer: 0, explain: "something important，定语后置。" },

    // ---------- L6 综合 ----------
    { id: "U6-1", level: 6, stem: "Would you like ___ to drink?", options: ["something", "anything", "nothing", "everything"], answer: 0, explain: "期待肯定答复的疑问句用 something。" },
    { id: "U6-2", level: 6, stem: "I don't have ___ to say about it.", options: ["something", "anything", "nothing", "everything"], answer: 1, explain: "否定句用 anything。" },
    { id: "U6-3", level: 6, stem: "___ of the two answers is correct. Both are wrong.", options: ["Neither", "Either", "None", "Both"], answer: 0, explain: "两者都不，用 neither；教材列出「neither 没人或物（指两个当中）」。" },
    { id: "U6-4", level: 6, stem: "There are trees on ___ side of the street.", options: ["either", "both", "all", "none"], answer: 0, explain: "either「任何一个（指两个当中）」，后接单数 side。" },
    { id: "U6-5", level: 6, stem: "___ of the three students passed the exam.", options: ["None", "Neither", "Either", "Both"], answer: 0, explain: "三者以上都不，用 none；教材列出「none 没人或物（指两个以上）」。" },
    { id: "U6-6", level: 6, stem: "___ of us has a dictionary.", options: ["Each", "Every", "Both", "All"], answer: 0, explain: "each of + 名词，谓语用单数。" },
    { id: "U6-7", level: 6, stem: "___ the students are here today.", options: ["All", "Both", "Each", "Every"], answer: 0, explain: "all the students 复数，谓语用 are。" },
    { id: "U6-8", level: 6, stem: "A: Are there any apples in the fridge? B: No, there aren't ___.", options: ["any", "some", "many", "much"], answer: 0, explain: "否定答句用 any；教材例句。" }
  ]
};
})();
