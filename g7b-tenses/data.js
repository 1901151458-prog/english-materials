/* 七下时态专项（现在进行时 + 一般过去时）· 48 题 / 6 级 */
(function(){
window.G7B_TENSES = {
  levels: [
    { id: 1, name: "现在进行时 · 构成", short: "进行时构成", desc: "am / is / are + 动词-ing。" },
    { id: 2, name: "动词 -ing 的变化", short: "-ing 变化", desc: "直接加、去 e、双写、ie 变 y。" },
    { id: 3, name: "现在进行时 · 意义与用法", short: "进行时用法", desc: "说话时正在进行；现阶段正在进行。" },
    { id: 4, name: "一般过去时 · 构成", short: "过去时构成", desc: "was / were；实义动词 + -ed。" },
    { id: 5, name: "一般过去时 · 否定与疑问", short: "过去时否定", desc: "didn't + 动词原形；Did ...?" },
    { id: 6, name: "综合提升", short: "综合", desc: "两个时态混合辨析。" }
  ],
  questions: [
    { id: "T1-1", level: 1, stem: "The students ___ to the teacher.（正在听）", options: ["are listening", "is listening", "listen", "listened"], answer: 0, explain: "主语复数用 are + -ing；教材例句。" },
    { id: "T1-2", level: 1, stem: "He ___ now.（正在睡觉）", options: ["is sleeping", "are sleeping", "sleeps", "slept"], answer: 0, explain: "主语 he 用 is + -ing；教材例句。" },
    { id: "T1-3", level: 1, stem: "I ___ now.（正在工作）", options: ["am working", "is working", "are working", "work"], answer: 0, explain: "主语 I 用 am working；教材表3。" },
    { id: "T1-4", level: 1, stem: "We ___ on a farm these days.", options: ["are working", "is working", "am working", "worked"], answer: 0, explain: "主语 we 用 are；教材例句。" },
    { id: "T1-5", level: 1, stem: "现在进行时由助动词 be + ___ 构成。", options: ["动词-ing", "动词原形", "动词过去式", "动词不定式"], answer: 0, explain: "教材：现在进行时是由助动词 be 加动词 -ing 形式构成。" },
    { id: "T1-6", level: 1, stem: "They ___ football now.", options: ["are playing", "is playing", "am playing", "played"], answer: 0, explain: "主语 they 用 are playing。" },
    { id: "T1-7", level: 1, stem: "She ___ TV at the moment.", options: ["is watching", "are watching", "watches", "watched"], answer: 0, explain: "主语 she 用 is watching。" },
    { id: "T1-8", level: 1, stem: "现在进行时的否定式是 ___。", options: ["am/is/are + not + 动词-ing", "don't + 动词原形", "not + 动词-ing", "didn't + 动词原形"], answer: 0, explain: "教材表3：I am not working 等。" },

    { id: "T2-1", level: 2, stem: "go 的 -ing 形式是 ___。", options: ["going", "goeing", "going", "gone"], answer: 0, explain: "一般情况直接加 -ing；教材表5。" },
    { id: "T2-2", level: 2, stem: "study 的 -ing 形式是 ___。", options: ["studying", "studing", "studyying", "studies"], answer: 0, explain: "直接加 -ing（study → studying）；教材表5。" },
    { id: "T2-3", level: 2, stem: "write 的 -ing 形式是 ___。", options: ["writing", "writeing", "writting", "writes"], answer: 0, explain: "以不发音 e 结尾，去掉 e 加 -ing；教材表5。" },
    { id: "T2-4", level: 2, stem: "make 的 -ing 形式是 ___。", options: ["making", "makeing", "makking", "makes"], answer: 0, explain: "去掉 e 加 -ing；教材表5。" },
    { id: "T2-5", level: 2, stem: "get 的 -ing 形式是 ___。", options: ["getting", "geting", "gettting", "gets"], answer: 0, explain: "重读闭音节，双写 t 加 -ing；教材表5。" },
    { id: "T2-6", level: 2, stem: "sit 的 -ing 形式是 ___。", options: ["sitting", "siting", "sitting", "sits"], answer: 0, explain: "双写 t 加 -ing；教材表5。" },
    { id: "T2-7", level: 2, stem: "begin 的 -ing 形式是 ___。", options: ["beginning", "begining", "beginning", "begins"], answer: 0, explain: "双写 n 加 -ing；教材表5。" },
    { id: "T2-8", level: 2, stem: "lie 的 -ing 形式是 ___。", options: ["lying", "lieing", "lying", "lies"], answer: 0, explain: "以 ie 结尾，变 ie 为 y 加 -ing；教材表5。" },

    { id: "T3-1", level: 3, stem: "现在进行时表示现在（说话时）___ 的动作。", options: ["正在进行", "已经完成", "将来发生", "经常发生"], answer: 0, explain: "教材：表示现在（说话时）正在进行的动作或存在的状态。" },
    { id: "T3-2", level: 3, stem: "I'm reading a history book ___.", options: ["this month", "last month", "next month", "yesterday"], answer: 0, explain: "表示现阶段正在进行；教材例句 this month。" },
    { id: "T3-3", level: 3, stem: "The students are listening to the teacher. 此句表示 ___。", options: ["说话时正在进行", "过去发生", "将来发生", "经常发生"], answer: 0, explain: "现在进行时的基本用法；教材例句。" },
    { id: "T3-4", level: 3, stem: "We are working on a farm ___.", options: ["these days", "yesterday", "last week", "two days ago"], answer: 0, explain: "现阶段正在进行；教材例句 these days。" },
    { id: "T3-5", level: 3, stem: "现在进行时的疑问式：___ you working?", options: ["Are", "Do", "Did", "Is"], answer: 0, explain: "主语 you 用 Are you working?；教材表4。" },
    { id: "T3-6", level: 3, stem: "— Is he working? — Yes, he ___.", options: ["is", "does", "do", "are"], answer: 0, explain: "简略答语用 is；教材表4。" },
    { id: "T3-7", level: 3, stem: "— Are they working? — No, they ___.", options: ["aren't", "don't", "isn't", "weren't"], answer: 0, explain: "否定简答用 are not (aren't)；教材表4。" },
    { id: "T3-8", level: 3, stem: "Look! The children ___ in the garden.", options: ["are playing", "play", "played", "plays"], answer: 0, explain: "Look! 提示说话时正在发生，用现在进行时。" },

    { id: "T4-1", level: 4, stem: "He ___ at home yesterday.", options: ["was", "were", "is", "are"], answer: 0, explain: "主语 he 用 was；教材表6。" },
    { id: "T4-2", level: 4, stem: "We ___ at home yesterday.", options: ["were", "was", "are", "is"], answer: 0, explain: "主语 we 用 were；教材表6。" },
    { id: "T4-3", level: 4, stem: "They ___ in a hospital last year.", options: ["worked", "works", "work", "working"], answer: 0, explain: "一般过去时实义动词加 -ed；教材表6。" },
    { id: "T4-4", level: 4, stem: "I ___ my grandparents last week.", options: ["visited", "visit", "visits", "visiting"], answer: 0, explain: "last week 表过去，用过去式；教材例句。" },
    { id: "T4-5", level: 4, stem: "He ___ up early yesterday.", options: ["got", "gets", "get", "getting"], answer: 0, explain: "yesterday 表过去，用过去式 got；教材例句。" },
    { id: "T4-6", level: 4, stem: "一般过去时常与 ___ 连用。", options: ["yesterday、last night 等", "now", "tomorrow", "next week"], answer: 0, explain: "教材：常和表示过去的时间状语连用。" },
    { id: "T4-7", level: 4, stem: "He always ___ to work by bus last year.", options: ["went", "goes", "go", "going"], answer: 0, explain: "表示过去经常发生，用过去式；教材例句。" },
    { id: "T4-8", level: 4, stem: "be 动词的过去式有 ___ 两种形式。", options: ["was / were", "am / is", "are / were", "was / been"], answer: 0, explain: "教材表6：was（单数）、were（复数）。" },

    { id: "T5-1", level: 5, stem: "He ___ at home yesterday.（否定）", options: ["wasn't", "weren't", "isn't", "didn't"], answer: 0, explain: "be 动词否定 was not (wasn't)；教材表6。" },
    { id: "T5-2", level: 5, stem: "They ___ at home yesterday.（否定）", options: ["weren't", "wasn't", "aren't", "didn't"], answer: 0, explain: "主语复数用 were not (weren't)；教材表6。" },
    { id: "T5-3", level: 5, stem: "I ___ in a hospital last year.（否定）", options: ["didn't work", "didn't worked", "don't work", "wasn't work"], answer: 0, explain: "实义动词否定用 didn't + 动词原形；教材表6。" },
    { id: "T5-4", level: 5, stem: "实义动词的过去时否定式为 ___。", options: ["didn't + 动词原形", "didn't + 过去式", "don't + 动词原形", "not + 过去式"], answer: 0, explain: "教材表6：did not (didn't) work —— 用原形。" },
    { id: "T5-5", level: 5, stem: "___ you go to the park yesterday?", options: ["Did", "Do", "Were", "Was"], answer: 0, explain: "实义动词过去时疑问用 Did。" },
    { id: "T5-6", level: 5, stem: "— Did he come? — Yes, he ___.", options: ["did", "does", "was", "were"], answer: 0, explain: "过去时简略答语用 did。" },
    { id: "T5-7", level: 5, stem: "She ___ TV last night.（否定）", options: ["didn't watch", "didn't watched", "doesn't watch", "wasn't watch"], answer: 0, explain: "didn't + 动词原形。" },
    { id: "T5-8", level: 5, stem: "— Did they play football? — No, they ___.", options: ["didn't", "don't", "weren't", "wasn't"], answer: 0, explain: "过去时否定简答用 didn't。" },

    { id: "T6-1", level: 6, stem: "Look! She ___ a book now.", options: ["is reading", "reads", "read", "was reading"], answer: 0, explain: "now 提示现在进行时。" },
    { id: "T6-2", level: 6, stem: "He ___ to school by bike last year.", options: ["went", "goes", "go", "is going"], answer: 0, explain: "last year 表过去，用过去式。" },
    { id: "T6-3", level: 6, stem: "They ___ football at the moment.", options: ["are playing", "played", "play", "plays"], answer: 0, explain: "at the moment 提示现在进行时。" },
    { id: "T6-4", level: 6, stem: "We ___ a film yesterday.", options: ["watched", "watch", "are watching", "watches"], answer: 0, explain: "yesterday 表过去。" },
    { id: "T6-5", level: 6, stem: "I ___ my homework now.", options: ["am doing", "do", "did", "does"], answer: 0, explain: "now 提示现在进行时。" },
    { id: "T6-6", level: 6, stem: "He ___ his grandparents last week.", options: ["visited", "visits", "is visiting", "visit"], answer: 0, explain: "last week 表过去。" },
    { id: "T6-7", level: 6, stem: "She ___ at home yesterday.", options: ["was", "were", "is", "are"], answer: 0, explain: "主语 she 过去时用 was。" },
    { id: "T6-8", level: 6, stem: "Listen! Someone ___ in the next room.", options: ["is singing", "sings", "sang", "was singing"], answer: 0, explain: "Listen! 提示说话时正在发生。" }
  ]
};
})();
