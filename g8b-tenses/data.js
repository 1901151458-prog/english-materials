/* 八下时态专项（过去进行时 + 现在完成时）· 48 题 / 6 级 */
(function(){
window.G8B_TENSES = {
  levels: [
    { id: 1, name: "过去进行时 · 构成", short: "过去进行构成", desc: "was / were + 动词-ing 的形式选择。" },
    { id: 2, name: "过去进行时 · 用法", short: "过去进行用法", desc: "表示过去某一时刻或某一段时间正在进行的动作。" },
    { id: 3, name: "过去进行时 vs 一般过去时", short: "进行vs一般", desc: "长动作用进行时，短动作或已完成的用一般过去时。" },
    { id: 4, name: "现在完成时 · 构成", short: "完成构成", desc: "have / has + 过去分词，注意主语人称与数。" },
    { id: 5, name: "现在完成时 · 用法", short: "完成用法", desc: "对现在的影响、持续到现在、与 already/yet 等连用。" },
    { id: 6, name: "现在完成时 vs 一般过去时", short: "完成vs一般", desc: "完成时不能与 yesterday、last night、ago 等连用。" }
  ],
  questions: [
    // ---------- L1 过去进行时构成 ----------
    { id: "T1-1", level: 1, stem: "At eight last night, I ___ my homework.", options: ["do", "was doing", "were doing", "am doing"], answer: 1, explain: "主语 I 用 was，过去进行时 was doing。" },
    { id: "T1-2", level: 1, stem: "They ___ football when it began to rain.", options: ["played", "was playing", "were playing", "play"], answer: 2, explain: "主语 they 复数用 were，过去进行时 were playing。" },
    { id: "T1-3", level: 1, stem: "She ___ a shower at seven this morning.", options: ["was taking", "were taking", "takes", "take"], answer: 0, explain: "主语 she 单数用 was taking。" },
    { id: "T1-4", level: 1, stem: "The children ___ in the garden at that time.", options: ["was playing", "were playing", "play", "plays"], answer: 1, explain: "children 复数用 were playing。" },
    { id: "T1-5", level: 1, stem: "___ you reading when I called you?", options: ["Was", "Were", "Do", "Did"], answer: 1, explain: "主语 you 用 Were 构成过去进行时疑问句。" },
    { id: "T1-6", level: 1, stem: "He ___ TV when his mother came home.", options: ["watched", "was watching", "were watching", "watches"], answer: 1, explain: "主语 he 用 was watching。" },
    { id: "T1-7", level: 1, stem: "It ___ heavily when we left the school.", options: ["was raining", "were raining", "rains", "rained"], answer: 0, explain: "主语 it 用 was raining。" },
    { id: "T1-8", level: 1, stem: "My parents ___ dinner while I was doing my homework.", options: ["was cooking", "were cooking", "cooked", "cook"], answer: 1, explain: "parents 复数用 were cooking，与 while 从句的进行时对应。" },

    // ---------- L2 过去进行时用法 ----------
    { id: "T2-1", level: 2, stem: "— What ___ your sister doing at nine last night? — She was reading.", options: ["is", "was", "were", "did"], answer: 1, explain: "sister 单数，问过去某一时刻正在做什么，用 was。" },
    { id: "T2-2", level: 2, stem: "At the time of the earthquake, many people ___ in the streets.", options: ["walked", "were walking", "are walking", "walk"], answer: 1, explain: "地震发生时人们正在街上走，用过去进行时 were walking。" },
    { id: "T2-3", level: 2, stem: "While my mother ___ lunch, I was cleaning the room.", options: ["prepared", "was preparing", "prepares", "is preparing"], answer: 1, explain: "while 引导的从句表示持续动作，用过去进行时 was preparing。" },
    { id: "T2-4", level: 2, stem: "The students ___ an exam when the lights went out.", options: ["took", "were taking", "are taking", "take"], answer: 1, explain: "灯灭时正在考试，用过去进行时 were taking。" },
    { id: "T2-5", level: 2, stem: "— What were you doing at this time yesterday? — I ___ in the library.", options: ["studied", "was studying", "study", "am studying"], answer: 1, explain: "回答过去某一时刻正在做的事，用 was studying。" },
    { id: "T2-6", level: 2, stem: "It was getting dark, and the birds ___ home.", options: ["flew", "were flying", "fly", "are flying"], answer: 1, explain: "为「天变黑」提供背景，用过去进行时 were flying。" },
    { id: "T2-7", level: 2, stem: "At that moment, Mr. Li ___ on the phone.", options: ["talked", "was talking", "talks", "is talking"], answer: 1, explain: "at that moment 表示过去某一时刻，用 was talking。" },
    { id: "T2-8", level: 2, stem: "They ___ for the bus when I saw them.", options: ["waited", "were waiting", "wait", "are waiting"], answer: 1, explain: "「我看见他们时」他们正在等车，用 were waiting。" },

    // ---------- L3 过去进行时 vs 一般过去时 ----------
    { id: "T3-1", level: 3, stem: "I ___ a letter when the phone rang.", options: ["wrote", "was writing", "write", "am writing"], answer: 1, explain: "写信是持续动作（未必写完），用过去进行时；rang 是短暂动作，用一般过去时。" },
    { id: "T3-2", level: 3, stem: "David ___ a letter to his friend last night.", options: ["was writing", "wrote", "writes", "is writing"], answer: 1, explain: "教材例句：强调「写完」这件事，用一般过去时 wrote。" },
    { id: "T3-3", level: 3, stem: "She ___ the door and walked in.", options: ["was opening", "opened", "opens", "is opening"], answer: 1, explain: "「开门」是短暂动作，用一般过去时 opened。" },
    { id: "T3-4", level: 3, stem: "While I ___ in the sea, someone called my name.", options: ["swam", "was swimming", "swim", "am swimming"], answer: 1, explain: "游泳是持续动作，用过去进行时 was swimming。" },
    { id: "T3-5", level: 3, stem: "He ___ the book and went to bed.", options: ["was finishing", "finished", "finishes", "is finishing"], answer: 1, explain: "「读完书」是完成动作，与 went 并列，用一般过去时 finished。" },
    { id: "T3-6", level: 3, stem: "We ___ dinner at eight when the doorbell rang.", options: ["had", "were having", "have", "are having"], answer: 1, explain: "门铃响时「正在吃晚饭」，用过去进行时 were having。" },
    { id: "T3-7", level: 3, stem: "The old man ___ down and hurt his leg.", options: ["was falling", "fell", "falls", "is falling"], answer: 1, explain: "摔倒并受伤是短暂动作，用一般过去时 fell。" },
    { id: "T3-8", level: 3, stem: "I ___ my homework last night — it took me two hours.", options: ["was doing", "did", "do", "am doing"], answer: 1, explain: "说明「做完了」这一结果，用一般过去时 did。" },

    // ---------- L4 现在完成时构成 ----------
    { id: "T4-1", level: 4, stem: "I ___ already finished my homework.", options: ["have", "has", "had", "am"], answer: 0, explain: "主语 I 用 have，构成现在完成时 have finished。" },
    { id: "T4-2", level: 4, stem: "She ___ been a volunteer since 2022.", options: ["have", "has", "had", "is"], answer: 1, explain: "主语 she 第三人称单数用 has。" },
    { id: "T4-3", level: 4, stem: "They ___ never seen snow before.", options: ["has", "have", "had", "are"], answer: 1, explain: "主语 they 复数用 have。" },
    { id: "T4-4", level: 4, stem: "___ you ever heard of Oliver Twist?", options: ["Do", "Did", "Have", "Are"], answer: 2, explain: "现在完成时疑问句用 Have ... heard。" },
    { id: "T4-5", level: 4, stem: "He ___ not visited the museum yet.", options: ["have", "has", "is", "does"], answer: 1, explain: "主语 he 用 has，否定 has not visited。" },
    { id: "T4-6", level: 4, stem: "We ___ known each other for ten years.", options: ["have", "has", "had", "are"], answer: 0, explain: "主语 we 用 have；for ten years 表示持续到现在。" },
    { id: "T4-7", level: 4, stem: "The film ___ already started.", options: ["have", "has", "had", "is"], answer: 1, explain: "the film 单数用 has。" },
    { id: "T4-8", level: 4, stem: "— Have you finished the report? — Yes, I ___.", options: ["do", "did", "have", "am"], answer: 2, explain: "现在完成时的简略回答用 have / has。" },

    // ---------- L5 现在完成时用法 ----------
    { id: "T5-1", level: 5, stem: "I can't find my key. I ___ it.", options: ["lose", "lost", "have lost", "was losing"], answer: 2, explain: "丢钥匙对现在造成影响（找不到），用现在完成时 have lost。" },
    { id: "T5-2", level: 5, stem: "She ___ in this city since she was born.", options: ["lived", "has lived", "lives", "is living"], answer: 1, explain: "since she was born 表示从过去持续到现在，用现在完成时 has lived。" },
    { id: "T5-3", level: 5, stem: "Have you ___ read this book?", options: ["ever", "yet", "already", "just"], answer: 0, explain: "ever 表示「曾经」，用于疑问句询问经历。" },
    { id: "T5-4", level: 5, stem: "He has ___ finished his lunch, so he isn't hungry.", options: ["yet", "just", "ever", "never"], answer: 1, explain: "just 表示「刚刚」，符合「所以不饿」的语境。" },
    { id: "T5-5", level: 5, stem: "Helen ___ to Xi'an twice. She knows the city well.", options: ["has gone", "has been", "went", "goes"], answer: 1, explain: "have been to 表示「去过（已回来）」，twice 表示经历。" },
    { id: "T5-6", level: 5, stem: "Helen isn't here. She ___ to Xi'an.", options: ["has been", "has gone", "went", "goes"], answer: 1, explain: "have gone to 表示「去了还没回来」，所以她不在。" },
    { id: "T5-7", level: 5, stem: "I ___ this film before.", options: ["see", "saw", "have seen", "am seeing"], answer: 2, explain: "before 表示过去经历，用现在完成时 have seen。" },
    { id: "T5-8", level: 5, stem: "— Have you chosen a book for your report ___? — Yes, I have.", options: ["ever", "yet", "already", "before"], answer: 1, explain: "yet 用于疑问句末尾，表示「已经」。" },

    // ---------- L6 现在完成时 vs 一般过去时 ----------
    { id: "T6-1", level: 6, stem: "I ___ the movie last week.", options: ["have watched", "watched", "watch", "am watching"], answer: 1, explain: "last week 是明确的过去时间状语，只能用一般过去时 watched。" },
    { id: "T6-2", level: 6, stem: "Fu Xing ___ at a nursing home since last year.", options: ["worked", "has worked", "works", "is working"], answer: 1, explain: "since last year 表示持续到现在，用现在完成时 has worked；教材例句。" },
    { id: "T6-3", level: 6, stem: "Fu Xing ___ at a nursing home last year.", options: ["has worked", "worked", "works", "is working"], answer: 1, explain: "last year 是过去时间状语，用一般过去时 worked；教材例句。" },
    { id: "T6-4", level: 6, stem: "She ___ three weeks ago.", options: ["has left", "left", "leaves", "is leaving"], answer: 1, explain: "three weeks ago 只能与一般过去时连用。" },
    { id: "T6-5", level: 6, stem: "I ___ in 1990.", options: ["have been born", "was born", "am born", "have born"], answer: 1, explain: "in 1990 是过去时间，用一般过去时 was born。" },
    { id: "T6-6", level: 6, stem: "He ___ this book twice.", options: ["read", "has read", "reads", "is reading"], answer: 1, explain: "twice 表示到现在为止的经历，用现在完成时 has read。" },
    { id: "T6-7", level: 6, stem: "The teacher told us that light ___ faster than sound.", options: ["travelled", "travels", "has travelled", "was travelling"], answer: 1, explain: "客观真理用一般现在时，不受主句过去时影响。" },
    { id: "T6-8", level: 6, stem: "— ___ you ever been to Beijing? — Yes, I went there last summer.", options: ["Did", "Have", "Do", "Are"], answer: 1, explain: "问「曾经去过」用现在完成时 Have you ever been to ...。" }
  ]
};
})();
