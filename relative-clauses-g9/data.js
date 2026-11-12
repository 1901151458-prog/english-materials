/* 关系从句专项 · 九年级上册 · 48 题 / 6 级 */
(function(){
  window.RELATIVE_CLAUSE = {
  levels: [
    { id: 1, name: "基础 · 选关系代词", short: "选关系词", desc: "that / which / who / whose 各自指代什么。" },
    { id: 2, name: "辨析 · 指人还是指物", short: "人/物", desc: "先看先行词是人还是物，再决定用哪个关系代词。" },
    { id: 3, name: "成分 · 作主语还是作宾语", short: "成分", desc: "关系代词在从句里作主语还是宾语，直接决定能否省略。" },
    { id: 4, name: "非限制性 · 逗号 + which", short: "非限制性", desc: "有逗号的补充说明从句：不用 that、不能省、可指代整句。" },
    { id: 5, name: "省略 · 什么时候能省", short: "省略", desc: "作宾语可省，作主语不可省 —— 判断题专练。" },
    { id: 6, name: "综合 · 语境提升", short: "综合", desc: "最高级、only、everything、非限制性等常考陷阱混合辨析。" }
  ],
  questions: [
    // ---------- Level 1 基础 ----------
    { id: "R1-1", level: 1, stem: "I like music ___ touches my heart.", options: ["who", "which", "whose", "where"], answer: 1, explain: "先行词 music 是物，关系代词在从句中作主语，用 which（也可用 that）。" },
    { id: "R1-2", level: 1, stem: "The man ___ is standing there is my teacher.", options: ["which", "who", "whose", "what"], answer: 1, explain: "先行词 the man 是人，关系代词作主语，用 who。" },
    { id: "R1-3", level: 1, stem: "This is the book ___ I bought yesterday.", options: ["who", "which", "where", "when"], answer: 1, explain: "先行词 the book 是物，用 which（作宾语，也可用 that 或省略）。" },
    { id: "R1-4", level: 1, stem: "The girl ___ hair is long is my sister.", options: ["who", "which", "whose", "what"], answer: 2, explain: "表示「她的头发」，关系代词作定语，用所有格 whose。" },
    { id: "R1-5", level: 1, stem: "The song ___ uses the erhu is my favourite.", options: ["who", "which", "whose", "where"], answer: 1, explain: "先行词 the song 是物，作主语，用 which（教材例句）。" },
    { id: "R1-6", level: 1, stem: "I have a friend ___ can speak French.", options: ["which", "who", "whose", "what"], answer: 1, explain: "先行词 a friend 是人，作主语，用 who。" },
    { id: "R1-7", level: 1, stem: "The house ___ we live in is very old.", options: ["who", "which", "whose", "what"], answer: 1, explain: "先行词 the house 是物，作介词 in 的宾语，用 which。" },
    { id: "R1-8", level: 1, stem: "The dog ___ is running is mine.", options: ["who", "which", "whose", "where"], answer: 1, explain: "先行词 the dog 是动物（物），用 which。" },

    // ---------- Level 2 人/物 ----------
    { id: "R2-1", level: 2, stem: "The doctor ___ treated me is very kind.", options: ["which", "who", "whose", "what"], answer: 1, explain: "先行词 the doctor 是人，作主语，用 who。" },
    { id: "R2-2", level: 2, stem: "The chair ___ I sit on is broken.", options: ["who", "which", "whose", "whom"], answer: 1, explain: "先行词 the chair 是物，用 which（也可用 that）。" },
    { id: "R2-3", level: 2, stem: "The students ___ passed the exam got prizes.", options: ["which", "who", "whose", "what"], answer: 1, explain: "先行词 the students 是人，作主语，用 who。" },
    { id: "R2-4", level: 2, stem: "The film ___ we watched last night was boring.", options: ["who", "which", "whose", "what"], answer: 1, explain: "先行词 the film 是物，作宾语，用 which。" },
    { id: "R2-5", level: 2, stem: "The people ___ live next door are noisy.", options: ["which", "who", "whose", "what"], answer: 1, explain: "先行词 the people 是人，作主语，用 who。" },
    { id: "R2-6", level: 2, stem: "The computer ___ costs too much isn't good.", options: ["who", "which", "whose", "what"], answer: 1, explain: "先行词 the computer 是物，作主语，用 which。" },
    { id: "R2-7", level: 2, stem: "The teacher ___ teaches us English is from Canada.", options: ["which", "who", "whose", "what"], answer: 1, explain: "先行词 the teacher 是人，作主语，用 who。" },
    { id: "R2-8", level: 2, stem: "The pen ___ he lost is on the desk.", options: ["who", "which", "whose", "what"], answer: 1, explain: "先行词 the pen 是物，作宾语，用 which。" },

    // ---------- Level 3 成分 ----------
    { id: "R3-1", level: 3, stem: "The boy ___ won the game is my brother.", options: ["who", "which", "whose", "what"], answer: 0, explain: "先行词 the boy 是人；关系代词在从句中作主语（won 的主语），用 who。" },
    { id: "R3-2", level: 3, stem: "The film ___ we saw is exciting.", options: ["who", "which", "whose", "what"], answer: 1, explain: "先行词 the film 是物；which 在从句中作 saw 的宾语。" },
    { id: "R3-3", level: 3, stem: "The people ___ helped us were very kind.", options: ["who", "which", "whose", "what"], answer: 0, explain: "先行词 the people 是人；关系代词作 helped 的主语，用 who。" },
    { id: "R3-4", level: 3, stem: "The music ___ he downloaded is popular.", options: ["who", "which", "whose", "what"], answer: 1, explain: "先行词 the music 是物；which 在从句中作 downloaded 的宾语。" },
    { id: "R3-5", level: 3, stem: "The woman ___ works in the hospital is a doctor.", options: ["who", "which", "whose", "what"], answer: 0, explain: "先行词 the woman 是人；关系代词作 works 的主语，用 who。" },
    { id: "R3-6", level: 3, stem: "The story ___ she told was moving.", options: ["who", "which", "whose", "what"], answer: 1, explain: "先行词 the story 是物；which 作 told 的宾语。" },
    { id: "R3-7", level: 3, stem: "The students ___ study hard will succeed.", options: ["who", "which", "whose", "what"], answer: 0, explain: "先行词 the students 是人；关系代词作 study 的主语，用 who。" },
    { id: "R3-8", level: 3, stem: "The book ___ I borrowed is interesting.", options: ["who", "which", "whose", "what"], answer: 1, explain: "先行词 the book 是物；which 作 borrowed 的宾语。" },

    // ---------- Level 4 非限制性 ----------
    { id: "R4-1", level: 4, stem: "My father, ___ works in a hospital, is a doctor.", options: ["that", "who", "which", "what"], answer: 1, explain: "逗号隔开的非限制性从句，指人用 who，不能用 that。" },
    { id: "R4-2", level: 4, stem: "The book, ___ I bought last week, is very interesting.", options: ["that", "which", "who", "what"], answer: 1, explain: "非限制性从句指物用 which，不能用 that。" },
    { id: "R4-3", level: 4, stem: "He passed the exam, ___ made his parents happy.", options: ["that", "which", "what", "who"], answer: 1, explain: "which 指代前面整个主句（他通过考试这件事），不能用 that 或 what。" },
    { id: "R4-4", level: 4, stem: "She was late, ___ was unusual.", options: ["that", "which", "what", "who"], answer: 1, explain: "which 指代「她迟到」这件事，非限制性从句指代整句只能用 which。" },
    { id: "R4-5", level: 4, stem: "Beijing, ___ is the capital of China, has a long history.", options: ["that", "which", "who", "what"], answer: 1, explain: "非限制性从句指物（Beijing 作地点名词），用 which，不用 that。" },
    { id: "R4-6", level: 4, stem: "Tom, ___ is my best friend, lives next door.", options: ["that", "which", "who", "what"], answer: 2, explain: "非限制性从句指人用 who，不能用 that。" },
    { id: "R4-7", level: 4, stem: "The song, ___ uses the violin, is my favourite.", options: ["that", "which", "who", "what"], answer: 1, explain: "非限制性从句指物用 which，不能用 that。" },
    { id: "R4-8", level: 4, stem: "He didn't come, ___ made us worried.", options: ["that", "which", "what", "who"], answer: 1, explain: "which 指代「他没来」这件事，非限制性从句指代整句只用 which。" },

    // ---------- Level 5 省略 ----------
    { id: "R5-1", level: 5, stem: "The boy ___ broke the window is Tom. 此空能否省略？", options: ["可以省略", "不能省略", "只能换成 that", "只能换成 which"], answer: 1, explain: "关系代词在从句中作主语（broke 的主语），作主语不能省略。" },
    { id: "R5-2", level: 5, stem: "The pen ___ he used is mine. 此空能否省略？", options: ["可以省略", "不能省略", "只能换成 who", "必须保留 that"], answer: 0, explain: "关系代词作 used 的宾语，作宾语时可以省略。" },
    { id: "R5-3", level: 5, stem: "The man ___ we met is my uncle. 此空能否省略？", options: ["可以省略", "不能省略", "只能换成 which", "必须用 whose"], answer: 0, explain: "关系代词作 met 的宾语，作宾语可省略。" },
    { id: "R5-4", level: 5, stem: "The woman ___ works here is my aunt. 此空能否省略？", options: ["可以省略", "不能省略", "只能换成 which", "必须用 whose"], answer: 1, explain: "关系代词作 works 的主语，作主语不能省略。" },
    { id: "R5-5", level: 5, stem: "The music ___ I like is soft. 此空能否省略？", options: ["可以省略", "不能省略", "只能换成 who", "必须保留 which"], answer: 0, explain: "关系代词作 like 的宾语，作宾语可省略。" },
    { id: "R5-6", level: 5, stem: "The students ___ study hard will succeed. 此空能否省略？", options: ["可以省略", "不能省略", "只能换成 which", "必须用 whose"], answer: 1, explain: "关系代词作 study 的主语，作主语不能省略。" },
    { id: "R5-7", level: 5, stem: "The book ___ she bought is new. 此空能否省略？", options: ["可以省略", "不能省略", "只能换成 who", "必须保留 that"], answer: 0, explain: "关系代词作 bought 的宾语，作宾语可省略。" },
    { id: "R5-8", level: 5, stem: "The girl ___ won the prize is my cousin. 此空能否省略？", options: ["可以省略", "不能省略", "只能换成 which", "必须用 whose"], answer: 1, explain: "关系代词作 won 的主语，作主语不能省略。" },

    // ---------- Level 6 综合 ----------
    { id: "R6-1", level: 6, stem: "This is the best film ___ I have ever seen.", options: ["who", "that", "what", "whose"], answer: 1, explain: "先行词被最高级 the best 修饰时，关系代词常用 that（也可省略，因作宾语）。" },
    { id: "R6-2", level: 6, stem: "The man, ___ I met yesterday, is a writer.", options: ["that", "who", "which", "what"], answer: 1, explain: "逗号隔开的非限制性从句指人，用 who，不能用 that。" },
    { id: "R6-3", level: 6, stem: "I don't like music ___ is too loud.", options: ["who", "which", "whose", "where"], answer: 1, explain: "先行词 music 是物，关系代词作主语，用 which。" },
    { id: "R6-4", level: 6, stem: "He is the only person ___ I can trust.", options: ["who", "that", "which", "what"], answer: 1, explain: "先行词被 the only 修饰时，关系代词常用 that。" },
    { id: "R6-5", level: 6, stem: "The village ___ we visited last year has changed a lot.", options: ["who", "which", "whose", "where"], answer: 1, explain: "从句缺 visited 的宾语，用关系代词 which；若从句不缺宾语才用 where。" },
    { id: "R6-6", level: 6, stem: "She told us everything ___ she knew.", options: ["who", "that", "which", "what"], answer: 1, explain: "先行词是 everything 等不定代词时，关系代词通常用 that。" },
    { id: "R6-7", level: 6, stem: "The house ___ we live in is very old.", options: ["who", "which", "whose", "what"], answer: 1, explain: "关系代词作介词 in 的宾语，指物用 which。" },
    { id: "R6-8", level: 6, stem: "He passed the exam, ___ surprised us all.", options: ["that", "which", "what", "who"], answer: 1, explain: "非限制性从句指代整个主句，只能用 which。" }
  ]
};
})();
