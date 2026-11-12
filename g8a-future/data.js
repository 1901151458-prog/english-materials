/* 八上一般将来时与情态动词专项 · 48 题 / 6 级 */
(function(){
window.G8A_FUTURE = {
  levels: [
    { id: 1, name: "一般将来时 · will", short: "will", desc: "will + 动词原形；won't；'ll 缩写。" },
    { id: 2, name: "一般将来时 · be going to", short: "be going to", desc: "be going to + 动词原形，表示打算、计划或将要发生的事。" },
    { id: 3, name: "一般将来时 · 综合", short: "将来时综合", desc: "will / shall / be going to 的辨析与时间状语。" },
    { id: 4, name: "情态动词 can", short: "can", desc: "能力、请求允许、给予许可、提出请求和建议。" },
    { id: 5, name: "情态动词 could", short: "could", desc: "can 的过去式（能力）；更委婉的请求与建议。" },
    { id: 6, name: "综合提升", short: "综合", desc: "一般将来时与 can / could 混合辨析。" }
  ],
  questions: [
    // ---------- L1 will ----------
    { id: "F1-1", level: 1, stem: "We ___ come to see you next week.", options: ["will", "would", "was", "were"], answer: 0, explain: "next week 表将来，用 will；教材例句。" },
    { id: "F1-2", level: 1, stem: "You ___ see robots working everywhere in the future.", options: ["will", "would", "are", "is"], answer: 0, explain: "in the future 表将来，用 will；教材例句。" },
    { id: "F1-3", level: 1, stem: "What ___ your life be like in 20 years?", options: ["will", "would", "is", "are"], answer: 0, explain: "in 20 years 表将来；教材例句。" },
    { id: "F1-4", level: 1, stem: "Some jobs today ___ disappear in the coming years.", options: ["will", "would", "are", "is"], answer: 0, explain: "in the coming years 表将来；教材例句。" },
    { id: "F1-5", level: 1, stem: "I ___ tell you all about it.", options: ["will", "would", "am", "is"], answer: 0, explain: "表示带意愿色彩的将来常用 will；教材例句。" },
    { id: "F1-6", level: 1, stem: "Tomorrow ___ be sunny and warm.", options: ["will", "would", "is", "are"], answer: 0, explain: "tomorrow 表将来，用 will + 动词原形。" },
    { id: "F1-7", level: 1, stem: "He ___ arrive next Monday.", options: ["will", "would", "does", "is"], answer: 0, explain: "next Monday 表将来，用 will。" },
    { id: "F1-8", level: 1, stem: "They ___ not come tomorrow.", options: ["will", "would", "do", "are"], answer: 0, explain: "一般将来时否定：will not = won't。" },

    // ---------- L2 be going to ----------
    { id: "F2-1", level: 2, stem: "I'm ___ make a sandwich.", options: ["going to", "going", "go", "gone"], answer: 0, explain: "be going to + 动词原形；教材例句。" },
    { id: "F2-2", level: 2, stem: "What ___ you going to do tonight?", options: ["are", "is", "do", "will"], answer: 0, explain: "主语 you 用 are going to；教材例句。" },
    { id: "F2-3", level: 2, stem: "She ___ going to read more books about AI.", options: ["is", "are", "do", "will"], answer: 0, explain: "主语 she 用 is going to。" },
    { id: "F2-4", level: 2, stem: "We ___ going to visit the museum.", options: ["are", "is", "do", "will"], answer: 0, explain: "主语 we 用 are going to。" },
    { id: "F2-5", level: 2, stem: "How ___ you going to improve yourself?", options: ["are", "is", "do", "will"], answer: 0, explain: "主语 you 用 are；教材例句。" },
    { id: "F2-6", level: 2, stem: "He ___ going to buy a new bike.", options: ["is", "are", "does", "will"], answer: 0, explain: "主语 he 用 is going to。" },
    { id: "F2-7", level: 2, stem: "It ___ going to rain soon.", options: ["is", "are", "does", "will"], answer: 0, explain: "主语 it 用 is going to。" },
    { id: "F2-8", level: 2, stem: "They ___ going to have a party.", options: ["are", "is", "do", "will"], answer: 0, explain: "主语 they 用 are going to。" },

    // ---------- L3 综合 ----------
    { id: "F3-1", level: 3, stem: "Shall we ___ to see the sci-fi film?", options: ["go", "going", "went", "gone"], answer: 0, explain: "shall + 动词原形；教材例句。" },
    { id: "F3-2", level: 3, stem: "I shall ___ you a letter next month.", options: ["write", "writing", "wrote", "written"], answer: 0, explain: "shall + 动词原形；教材例句。" },
    { id: "F3-3", level: 3, stem: "will not 的缩写形式是 ___。", options: ["won't", "willn't", "wonot", "wannot"], answer: 0, explain: "will not 常缩略为 won't。" },
    { id: "F3-4", level: 3, stem: "will 在口语中的缩写形式是 ___。", options: ["'ll", "'d", "'s", "'re"], answer: 0, explain: "will 常缩略为 'll。" },
    { id: "F3-5", level: 3, stem: "My parents ___ buy me a computer next week.", options: ["will", "would", "do", "are"], answer: 0, explain: "next week 表将来，用 will。" },
    { id: "F3-6", level: 3, stem: "Look at the dark clouds! It ___ rain.", options: ["is going to", "will", "would", "does"], answer: 0, explain: "有迹象表明将要发生，用 be going to。" },
    { id: "F3-7", level: 3, stem: "We ___ have a picnic this Sunday. We've planned it.", options: ["are going to", "will", "would", "do"], answer: 0, explain: "已经计划好的安排用 be going to。" },
    { id: "F3-8", level: 3, stem: "What ___ you do tomorrow?", options: ["will", "would", "do", "are"], answer: 0, explain: "tomorrow 表将来，用 will + 动词原形。" },

    // ---------- L4 can ----------
    { id: "F4-1", level: 4, stem: "___ you speak English?", options: ["Can", "Should", "Must", "Need"], answer: 0, explain: "can 表示能力；教材例句。" },
    { id: "F4-2", level: 4, stem: "Can you help me ___ up the photos?", options: ["hang", "hanging", "hung", "hangs"], answer: 0, explain: "情态动词后接动词原形；教材例句。" },
    { id: "F4-3", level: 4, stem: "A: Can I put some flowers on the table? B: Yes, of course you ___.", options: ["can", "could", "must", "need"], answer: 0, explain: "给予许可用 can；教材例句。" },
    { id: "F4-4", level: 4, stem: "We ___ eat in a restaurant this evening.", options: ["can", "must", "need", "should"], answer: 0, explain: "can 提出建议；教材例句。" },
    { id: "F4-5", level: 4, stem: "Can you ___ me with this box?", options: ["help", "helping", "helped", "helps"], answer: 0, explain: "情态动词后接动词原形。" },
    { id: "F4-6", level: 4, stem: "___ I use your pen?", options: ["Can", "Must", "Need", "Should"], answer: 0, explain: "Can I ...? 请求允许。" },
    { id: "F4-7", level: 4, stem: "She can ___ very well.", options: ["sing", "singing", "sang", "sings"], answer: 0, explain: "情态动词后接动词原形。" },
    { id: "F4-8", level: 4, stem: "You can ___ here if you like.", options: ["sit", "sitting", "sat", "sits"], answer: 0, explain: "情态动词后接动词原形。" },

    // ---------- L5 could ----------
    { id: "F5-1", level: 5, stem: "He ___ sing very well when he was young.", options: ["could", "can", "must", "need"], answer: 0, explain: "could 表示过去的能力；教材例句。" },
    { id: "F5-2", level: 5, stem: "___ you please sweep the floor?", options: ["Could", "Must", "Need", "Should"], answer: 0, explain: "Could you please ...? 更委婉的请求；教材例句。" },
    { id: "F5-3", level: 5, stem: "We ___ go fishing this weekend.", options: ["could", "must", "need", "should"], answer: 0, explain: "could 提出建议；教材例句。" },
    { id: "F5-4", level: 5, stem: "Maybe I ___ give you a lift to the supermarket.", options: ["could", "must", "need", "should"], answer: 0, explain: "could 提出建议，语气委婉；教材例句。" },
    { id: "F5-5", level: 5, stem: "I ___ ride a bike when I was six.", options: ["could", "can", "must", "need"], answer: 0, explain: "过去的能力用 could。" },
    { id: "F5-6", level: 5, stem: "___ you help me with this heavy bag?", options: ["Could", "Must", "Need", "Should"], answer: 0, explain: "Could you ...? 委婉请求。" },
    { id: "F5-7", level: 5, stem: "She ___ play the piano when she was young.", options: ["could", "can", "must", "need"], answer: 0, explain: "过去的能力用 could。" },
    { id: "F5-8", level: 5, stem: "You ___ take a taxi if you're in a hurry.", options: ["could", "must", "need", "should"], answer: 0, explain: "could 提出建议。" },

    // ---------- L6 综合 ----------
    { id: "F6-1", level: 6, stem: "We ___ go to the park tomorrow if it's fine.", options: ["will", "would", "are", "is"], answer: 0, explain: "tomorrow 表将来，用 will。" },
    { id: "F6-2", level: 6, stem: "He ___ play basketball when he was 10.", options: ["could", "can", "must", "need"], answer: 0, explain: "过去的能力用 could。" },
    { id: "F6-3", level: 6, stem: "___ we go to the zoo this weekend?", options: ["Shall", "Should", "Must", "Need"], answer: 0, explain: "Shall we ...? 提出建议，主语为 we 时用 shall。" },
    { id: "F6-4", level: 6, stem: "I'm sure he ___ come tomorrow.", options: ["will", "would", "does", "is"], answer: 0, explain: "tomorrow 表将来，用 will。" },
    { id: "F6-5", level: 6, stem: "___ you speak Japanese?", options: ["Can", "Must", "Need", "Should"], answer: 0, explain: "can 表示能力。" },
    { id: "F6-6", level: 6, stem: "The train ___ leave at 8:00 tomorrow morning.", options: ["will", "would", "does", "is"], answer: 0, explain: "tomorrow morning 表将来，用 will。" },
    { id: "F6-7", level: 6, stem: "We ___ going to have a test next week.", options: ["are", "is", "do", "will"], answer: 0, explain: "主语 we 用 are going to。" },
    { id: "F6-8", level: 6, stem: "It ___ going to snow tonight.", options: ["is", "are", "does", "will"], answer: 0, explain: "主语 it 用 is going to。" }
  ]
};
})();
