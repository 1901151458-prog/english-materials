/* 九下（网传版）动词时态专项 · 48 题 / 6 级 */
(function(){
window.G9X_TENSES = {
  levels: [
    { id: 1, name: "一般现在时 / 一般过去时", short: "现在/过去", desc: "经常发生 vs 过去某一时间发生。" },
    { id: 2, name: "一般将来时 / 现在进行时", short: "将来/现在进行", desc: "单纯的将来事实 vs 现在正在进行。" },
    { id: 3, name: "过去进行时 / 现在完成时", short: "过去进行/完成", desc: "过去某时正在进行 vs 对现在有影响。" },
    { id: 4, name: "时态 · 标志词判断", short: "标志词", desc: "根据时间状语与提示词选时态。" },
    { id: 5, name: "时态 · 语境判断", short: "语境", desc: "没有明显标志词时靠语境判断。" },
    { id: 6, name: "综合提升", short: "综合", desc: "六种时态混合辨析。" }
  ],
  questions: [
    { id: "X1-1", level: 1, stem: "I often ___ to school at 7 o'clock.", options: ["go", "went", "will go", "am going"], answer: 0, explain: "often 表经常发生，用一般现在时；教材表1例句。" },
    { id: "X1-2", level: 1, stem: "She usually ___ her homework after school.", options: ["does", "did", "will do", "is doing"], answer: 0, explain: "usually 表经常，主语 she 用 does；教材表1例句。" },
    { id: "X1-3", level: 1, stem: "Earth ___ round the sun.", options: ["moves", "moved", "will move", "is moving"], answer: 0, explain: "客观规律用一般现在时；教材表1例句。" },
    { id: "X1-4", level: 1, stem: "We ___ to the cinema last night.", options: ["went", "go", "will go", "are going"], answer: 0, explain: "last night 表过去，用一般过去时；教材表1例句。" },
    { id: "X1-5", level: 1, stem: "Both students ___ the school trips.", options: ["enjoyed", "enjoy", "will enjoy", "are enjoying"], answer: 0, explain: "教材表1例句用过去式 enjoyed（叙述过去经历）。" },
    { id: "X1-6", level: 1, stem: "一般现在时表示 ___。", options: ["经常发生的动作或存在的状态", "过去某一时间的动作", "将来事实", "现在正在进行"], answer: 0, explain: "教材表1。" },
    { id: "X1-7", level: 1, stem: "一般过去时表示 ___。", options: ["过去某一时间发生的动作或存在的状态", "现在经常发生", "将来发生", "现在完成"], answer: 0, explain: "教材表1。" },
    { id: "X1-8", level: 1, stem: "My mother often ___ shopping at weekends.", options: ["goes", "went", "will go", "is going"], answer: 0, explain: "often 表经常，主语单数用 goes。" },

    { id: "X2-1", level: 2, stem: "I ___ miss you all.（单纯的将来）", options: ["will", "would", "did", "do"], answer: 0, explain: "教材表1例句 I will miss you all." },
    { id: "X2-2", level: 2, stem: "I ___ become a full-time worker after graduation.", options: ["will", "would", "did", "am"], answer: 0, explain: "教材表1例句用 will（单纯将来）。" },
    { id: "X2-3", level: 2, stem: "What ___ they doing about the problem?", options: ["are", "do", "did", "will"], answer: 0, explain: "现在进行时疑问句；教材表1例句。" },
    { id: "X2-4", level: 2, stem: "It's ___ hard now.", options: ["raining", "rained", "rain", "rains"], answer: 0, explain: "现在进行时 it is raining；教材表1例句。" },
    { id: "X2-5", level: 2, stem: "一般将来时表示 ___。", options: ["单纯的将来的事实", "过去发生", "现在正在进行", "现在完成"], answer: 0, explain: "教材表1。" },
    { id: "X2-6", level: 2, stem: "现在进行时表示 ___。", options: ["现在正在进行的动作", "经常发生", "将来发生", "过去发生"], answer: 0, explain: "教材表1。" },
    { id: "X2-7", level: 2, stem: "Listen! Someone ___ at the door.", options: ["is knocking", "knocks", "knocked", "will knock"], answer: 0, explain: "Listen! 提示现在正在进行。" },
    { id: "X2-8", level: 2, stem: "Look! The children ___ in the playground.", options: ["are playing", "play", "played", "will play"], answer: 0, explain: "Look! 提示现在正在进行。" },

    { id: "X3-1", level: 3, stem: "Last year, I ___ still studying Chinese in Beijing.", options: ["was", "am", "were", "is"], answer: 0, explain: "主语 I + 过去进行时用 was；教材表1例句。" },
    { id: "X3-2", level: 3, stem: "I ___ TV when you called me yesterday.", options: ["was watching", "watched", "watch", "am watching"], answer: 0, explain: "过去某时正在进行，用过去进行时；教材表1例句。" },
    { id: "X3-3", level: 3, stem: "The company ___ already offered me a job.", options: ["has", "have", "had", "is"], answer: 0, explain: "主语 the company 单数，现在完成时用 has；教材表1例句。" },
    { id: "X3-4", level: 3, stem: "___ you ever seen a Dragon Boat race?", options: ["Have", "Do", "Did", "Are"], answer: 0, explain: "ever 提示现在完成时；教材表1例句。" },
    { id: "X3-5", level: 3, stem: "过去进行时表示 ___。", options: ["过去某一时间正在进行的动作", "现在正在进行", "将来发生", "过去经常发生"], answer: 0, explain: "教材表1。" },
    { id: "X3-6", level: 3, stem: "现在完成时表示 ___。", options: ["动作发生在过去，但对现在有影响或产生了结果", "现在正在进行", "纯粹将来", "过去某一时间发生"], answer: 0, explain: "教材表1。" },
    { id: "X3-7", level: 3, stem: "They ___ finished the work already.", options: ["have", "has", "had", "are"], answer: 0, explain: "主语 they 复数，用 have。" },
    { id: "X3-8", level: 3, stem: "While I ___ dinner, the phone rang.", options: ["was cooking", "cooked", "cook", "am cooking"], answer: 0, explain: "while 引导的过去持续动作，用过去进行时。" },

    { id: "X4-1", level: 4, stem: "He ___ to Beijing last week.", options: ["went", "goes", "will go", "has gone"], answer: 0, explain: "last week 表过去，用一般过去时。" },
    { id: "X4-2", level: 4, stem: "I ___ this book twice already.", options: ["have read", "read", "readed", "am reading"], answer: 0, explain: "already + twice 提示现在完成时。" },
    { id: "X4-3", level: 4, stem: "Look! It ___.", options: ["is snowing", "snows", "snowed", "will snow"], answer: 0, explain: "Look! 提示现在进行时。" },
    { id: "X4-4", level: 4, stem: "She ___ here since 2020.", options: ["has lived", "lived", "lives", "is living"], answer: 0, explain: "since 2020 提示现在完成时。" },
    { id: "X4-5", level: 4, stem: "We ___ a film tomorrow evening.", options: ["will watch", "watched", "watch", "are watching"], answer: 0, explain: "tomorrow evening 表将来。" },
    { id: "X4-6", level: 4, stem: "At eight last night, I ___ my homework.", options: ["was doing", "did", "do", "am doing"], answer: 0, explain: "at eight last night 表过去某一时刻，用过去进行时。" },
    { id: "X4-7", level: 4, stem: "He usually ___ to school by bike.", options: ["goes", "went", "will go", "is going"], answer: 0, explain: "usually 表习惯，用一般现在时。" },
    { id: "X4-8", level: 4, stem: "They ___ home two days ago.", options: ["came", "come", "will come", "have come"], answer: 0, explain: "two days ago 只能与一般过去时连用。" },

    { id: "X5-1", level: 5, stem: "— Where is Tom? — He ___ to the library.", options: ["has gone", "went", "goes", "will go"], answer: 0, explain: "「他不在，去了图书馆」用现在完成时 has gone。" },
    { id: "X5-2", level: 5, stem: "I didn't hear the phone because I ___ music.", options: ["was listening to", "listened to", "listen to", "am listening to"], answer: 0, explain: "过去某时正在听音乐，用过去进行时。" },
    { id: "X5-3", level: 5, stem: "Don't worry. I ___ you.", options: ["will help", "helped", "help", "am helping"], answer: 0, explain: "对将来的承诺用一般将来时。" },
    { id: "X5-4", level: 5, stem: "The film ___ yet, so we can still go in.", options: ["hasn't started", "didn't start", "doesn't start", "isn't starting"], answer: 0, explain: "yet 提示现在完成时否定。" },
    { id: "X5-5", level: 5, stem: "When I got home, my mother ___ dinner.", options: ["was cooking", "cooked", "cooks", "is cooking"], answer: 0, explain: "「我到家时她正在做饭」用过去进行时。" },
    { id: "X5-6", level: 5, stem: "He ___ in this city since he was born.", options: ["has lived", "lived", "lives", "is living"], answer: 0, explain: "since 引导的从句提示现在完成时。" },
    { id: "X5-7", level: 5, stem: "Listen! The birds ___ in the tree.", options: ["are singing", "sing", "sang", "will sing"], answer: 0, explain: "Listen! 提示现在进行时。" },
    { id: "X5-8", level: 5, stem: "— Have you finished it? — Yes, I ___ it an hour ago.", options: ["finished", "have finished", "finish", "am finishing"], answer: 0, explain: "an hour ago 是过去时间状语，用一般过去时。" },

    { id: "X6-1", level: 6, stem: "She ___ English for six years.", options: ["has studied", "studied", "studies", "is studying"], answer: 0, explain: "for six years 表示持续到现在，用现在完成时。" },
    { id: "X6-2", level: 6, stem: "They ___ football when it began to rain.", options: ["were playing", "played", "play", "are playing"], answer: 0, explain: "开始下雨时正在踢球，用过去进行时。" },
    { id: "X6-3", level: 6, stem: "The children ___ in the garden now.", options: ["are playing", "played", "play", "will play"], answer: 0, explain: "now 提示现在进行时。" },
    { id: "X6-4", level: 6, stem: "We ___ to the zoo next Sunday.", options: ["will go", "went", "go", "have gone"], answer: 0, explain: "next Sunday 表将来。" },
    { id: "X6-5", level: 6, stem: "He ___ his keys, so he can't open the door.", options: ["has lost", "lost", "loses", "is losing"], answer: 0, explain: "丢钥匙对现在有影响，用现在完成时。" },
    { id: "X6-6", level: 6, stem: "I ___ my grandparents every summer.", options: ["visit", "visited", "will visit", "am visiting"], answer: 0, explain: "every summer 表经常，用一般现在时。" },
    { id: "X6-7", level: 6, stem: "At that time, they ___ for the exam.", options: ["were preparing", "prepared", "prepare", "are preparing"], answer: 0, explain: "at that time 表过去某时，用过去进行时。" },
    { id: "X6-8", level: 6, stem: "— ___ you ever been to Shanghai? — Yes, twice.", options: ["Have", "Do", "Did", "Are"], answer: 0, explain: "ever + 经历，用现在完成时。" }
  ]
};
})();
