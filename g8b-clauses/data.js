/* 八下连词与状语从句专项 · 48 题 / 6 级 */
(function(){
window.G8B_CLAUSES = {
  levels: [
    { id: 1, name: "并列连词", short: "并列连词", desc: "and / but / or / so、both ... and ...、not only ... but also ...。" },
    { id: 2, name: "从属连词基础", short: "从属连词", desc: "when / if / than / as soon as / until / while / although / because。" },
    { id: 3, name: "时间状语从句", short: "时间", desc: "when / while / as / before / after / until / since / whenever。" },
    { id: 4, name: "条件状语从句", short: "条件", desc: "if / unless；主将从现。" },
    { id: 5, name: "原因 · 目的 · 结果 · 让步", short: "原因目的让步", desc: "because / as / since、so that、so ... that、although / even though。" },
    { id: 6, name: "综合提升", short: "综合", desc: "连词辨析与「不能连用」陷阱。" }
  ],
  questions: [
    // ---------- L1 并列连词 ----------
    { id: "C1-1", level: 1, stem: "I like tea ___ my sister likes coffee.", options: ["and", "but", "or", "so"], answer: 1, explain: "前后意思相反（我喜欢茶／妹妹喜欢咖啡），用 but 表转折。" },
    { id: "C1-2", level: 1, stem: "Hurry up, ___ you'll be late.", options: ["and", "but", "or", "so"], answer: 2, explain: "「祈使句 + or + 句子」表示「否则」。" },
    { id: "C1-3", level: 1, stem: "The Nile ___ the Yellow River helped ancient civilizations to develop.", options: ["and", "or", "but", "so"], answer: 0, explain: "并列两个主语，用 and；教材例句。" },
    { id: "C1-4", level: 1, stem: "Thank you for being ___ my teacher ___ my friend.", options: ["not only; but also", "either; or", "neither; nor", "both; or"], answer: 0, explain: "not only ... but also ...「不仅……而且……」；教材例句。" },
    { id: "C1-5", level: 1, stem: "Would you like tea ___ coffee?", options: ["and", "or", "but", "so"], answer: 1, explain: "选择疑问句用 or 表示「还是」。" },
    { id: "C1-6", level: 1, stem: "She was tired, ___ she kept working.", options: ["and", "but", "or", "so"], answer: 1, explain: "前后转折：累了但仍继续工作，用 but。" },
    { id: "C1-7", level: 1, stem: "He studied hard, ___ he passed the exam.", options: ["and", "but", "or", "so"], answer: 3, explain: "因果承接：努力学习，所以通过了考试，用 so。" },
    { id: "C1-8", level: 1, stem: "Both Tom and Lily ___ going to the party.", options: ["is", "are", "am", "be"], answer: 1, explain: "both ... and ... 连接并列主语时谓语用复数 are。" },

    // ---------- L2 从属连词基础 ----------
    { id: "C2-1", level: 2, stem: "He started programming ___ he was 10.", options: ["when", "while", "if", "because"], answer: 0, explain: "「当他 10 岁时」用 when 引导时间状语从句；教材例句。" },
    { id: "C2-2", level: 2, stem: "___ you run after two hares, you will catch neither.", options: ["If", "When", "Because", "Although"], answer: 0, explain: "If 引导条件状语从句；教材例句。" },
    { id: "C2-3", level: 2, stem: "You are braver ___ you believe.", options: ["than", "as", "that", "so"], answer: 0, explain: "比较级 braver 后用 than；教材例句。" },
    { id: "C2-4", level: 2, stem: "Please give me a call ___ you arrive in Beijing.", options: ["as soon as", "so that", "because", "although"], answer: 0, explain: "as soon as「一……就……」；教材例句。" },
    { id: "C2-5", level: 2, stem: "We'll wait here ___ he comes back.", options: ["until", "while", "because", "though"], answer: 0, explain: "until「直到……为止」。" },
    { id: "C2-6", level: 2, stem: "She was reading ___ I was watching TV.", options: ["while", "when", "before", "after"], answer: 0, explain: "两个持续动作同时进行，用 while 更自然。" },
    { id: "C2-7", level: 2, stem: "___ he is young, he knows a lot.", options: ["Although", "Because", "If", "When"], answer: 0, explain: "前后让步：虽然年轻但懂得多，用 Although。" },
    { id: "C2-8", level: 2, stem: "I stayed at home ___ it rained heavily.", options: ["because", "although", "so", "but"], answer: 0, explain: "下雨是待在家里的原因，用 because。" },

    // ---------- L3 时间状语从句 ----------
    { id: "C3-1", level: 3, stem: "___ I got home, my mother was cooking.", options: ["When", "If", "Because", "Unless"], answer: 0, explain: "When 引导时间状语从句，表示「当我到家时」。" },
    { id: "C3-2", level: 3, stem: "He has lived here ___ he came to the city.", options: ["since", "when", "before", "until"], answer: 0, explain: "since 引导时间状语从句，主句用现在完成时。" },
    { id: "C3-3", level: 3, stem: "Don't leave ___ I come back.", options: ["until", "when", "while", "since"], answer: 0, explain: "not ... until「直到……才」。" },
    { id: "C3-4", level: 3, stem: "___ the front door opened, James heard the sound of Allen singing.", options: ["As", "If", "Because", "Though"], answer: 0, explain: "as 引导时间状语从句；教材例句。" },
    { id: "C3-5", level: 3, stem: "I like to write about my feelings in my diary ___ I feel bad or sad.", options: ["whenever", "because", "although", "unless"], answer: 0, explain: "whenever「无论何时」；教材例句。" },
    { id: "C3-6", level: 3, stem: "You won't know if you can do it ___ you try.", options: ["until", "while", "when", "as"], answer: 0, explain: "not ... until；教材例句。" },
    { id: "C3-7", level: 3, stem: "___ they were waiting, the little girl started to cry.", options: ["While", "When", "If", "Because"], answer: 0, explain: "while 引导的从句表示持续进行的动作。" },
    { id: "C3-8", level: 3, stem: "He had left ___ I arrived.", options: ["before", "after", "until", "since"], answer: 0, explain: "主句过去完成时，从句一般过去时，表示「在我到达之前」。" },

    // ---------- L4 条件状语从句 ----------
    { id: "C4-1", level: 4, stem: "___ it doesn't rain tomorrow, we'll go for a picnic.", options: ["If", "When", "Because", "Although"], answer: 0, explain: "If 引导条件状语从句；教材例句。" },
    { id: "C4-2", level: 4, stem: "Nothing is impossible ___ you think it is.", options: ["unless", "if", "because", "though"], answer: 0, explain: "unless「除非」；教材例句。" },
    { id: "C4-3", level: 4, stem: "You'll be late ___ you hurry.", options: ["unless", "if", "when", "before"], answer: 0, explain: "unless you hurry ＝ if you don't hurry。" },
    { id: "C4-4", level: 4, stem: "___ you don't want to forget your resolutions, write them down.", options: ["If", "When", "So", "Although"], answer: 0, explain: "If 引导条件状语从句；教材例句。" },
    { id: "C4-5", level: 4, stem: "We'll go out ___ the weather is fine.", options: ["if", "unless", "because", "though"], answer: 0, explain: "天气好是外出的条件，用 if。" },
    { id: "C4-6", level: 4, stem: "___ you heat ice, it melts.", options: ["If", "Unless", "Although", "Because"], answer: 0, explain: "If 引导条件；主句用一般现在时表客观规律。" },
    { id: "C4-7", level: 4, stem: "You can't pass the exam ___ you study hard.", options: ["unless", "if", "because", "when"], answer: 0, explain: "unless「除非」＝ if not。" },
    { id: "C4-8", level: 4, stem: "___ I have time, I will visit you.", options: ["If", "Although", "Because", "So"], answer: 0, explain: "条件状语从句用一般现在时表将来（主将从现）。" },

    // ---------- L5 原因 · 目的 · 结果 · 让步 ----------
    { id: "C5-1", level: 5, stem: "Alice can't reach the key on the table ___ she's too small.", options: ["because", "although", "so", "if"], answer: 0, explain: "because 引导原因状语从句；教材例句。" },
    { id: "C5-2", level: 5, stem: "___ he has returned, you could now ask for his help.", options: ["Since", "Although", "Before", "Unless"], answer: 0, explain: "since「既然」引导原因；教材例句。" },
    { id: "C5-3", level: 5, stem: "I was ___ hungry ___ I ate a big bowl of noodles.", options: ["so; that", "such; that", "too; to", "very; that"], answer: 0, explain: "so + 形容词 + that 引导结果状语从句；教材例句。" },
    { id: "C5-4", level: 5, stem: "We'll sit near the front ___ we can hear the speaker better.", options: ["so that", "because", "though", "if"], answer: 0, explain: "so that 引导目的状语从句；教材例句。" },
    { id: "C5-5", level: 5, stem: "___ my guitar is old, it means a lot to me.", options: ["Although", "Because", "If", "When"], answer: 0, explain: "Although 引导让步状语从句；教材例句。" },
    { id: "C5-6", level: 5, stem: "Tom felt proud of their team, ___ they lost.", options: ["even though", "because", "so", "if"], answer: 0, explain: "even though「即使」表让步；教材例句。" },
    { id: "C5-7", level: 5, stem: "Chinese people love the ginkgo tree, ___ it is a symbol of hope and long life.", options: ["as", "although", "unless", "before"], answer: 0, explain: "as 引导原因状语从句；教材例句。" },
    { id: "C5-8", level: 5, stem: "She spoke slowly ___ everyone could understand her.", options: ["so that", "because", "though", "if"], answer: 0, explain: "so that 引导目的状语从句。" },

    // ---------- L6 综合 ----------
    { id: "C6-1", level: 6, stem: "He was busy, ___ he still helped me.", options: ["but", "although", "though", "so"], answer: 0, explain: "两个分句之间只能用 but，不能再用 although / though（不能连用）。" },
    { id: "C6-2", level: 6, stem: "He was ill, ___ he didn't go to school.", options: ["so", "because", "though", "but"], answer: 0, explain: "前面是原因、后面是结果，用 so；because 不能与 so 连用。" },
    { id: "C6-3", level: 6, stem: "___ he was ill, he didn't go to school.", options: ["Because", "So", "But", "And"], answer: 0, explain: "从句在前表原因，用 Because；此时后面不能再加 so。" },
    { id: "C6-4", level: 6, stem: "I'll tell him the news ___ I see him.", options: ["as soon as", "so that", "although", "because"], answer: 0, explain: "as soon as 引导时间状语从句，表示「一……就」。" },
    { id: "C6-5", level: 6, stem: "She is ___ kind ___ everyone likes her.", options: ["so; that", "such; that", "too; to", "very; that"], answer: 0, explain: "so + 形容词 + that 引导结果状语从句。" },
    { id: "C6-6", level: 6, stem: "It was ___ a hot day ___ we stayed at home.", options: ["such; that", "so; that", "too; to", "very; that"], answer: 0, explain: "such + a + 形容词 + 名词 + that；与 so + 形容词 + that 区分。" },
    { id: "C6-7", level: 6, stem: "We won't start ___ everyone arrives.", options: ["until", "while", "because", "if"], answer: 0, explain: "not ... until「直到……才」。" },
    { id: "C6-8", level: 6, stem: "___ it rains tomorrow, we'll stay at home.", options: ["If", "Although", "Because", "So"], answer: 0, explain: "If 引导条件状语从句；条件从句用一般现在时表将来。" }
  ]
};
})();
