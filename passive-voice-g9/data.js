/* 被动语态专项 · 九年级上册 · 48 题 / 6 级 */
(function(){
  window.PASSIVE_VOICE = {
  levels: [
    { id: 1, name: "基础 · 主动还是被动", short: "主动/被动", desc: "先判断主语是动作执行者还是承受者，再决定用不用被动。" },
    { id: 2, name: "构成 · be + 过去分词", short: "构成", desc: "be 动词的人称、数与过去分词形式，是拿分的第一步。" },
    { id: 3, name: "时态 · 三种基本时态", short: "时态", desc: "一般现在、一般过去、一般将来被动的固定结构。" },
    { id: 4, name: "扩展 · 情态 / 完成 / 进行", short: "扩展", desc: "情态动词、完成时、进行时、不定式被动的常考形式。" },
    { id: 5, name: "转换 · 主动变被动", short: "转换", desc: "把主动句改成被动句：宾语提前、动词变 be+done、原主变 by。" },
    { id: 6, name: "综合 · 语境提升", short: "综合", desc: "结合教材语境与常见陷阱，混合辨析。" }
  ],
  questions: [
    // ---------- Level 1 主动还是被动 ----------
    { id: "P1-1", level: 1, stem: "The classroom ___ by the students every day.", options: ["cleans", "is cleaned", "cleaning", "clean"], answer: 1, explain: "教室是被打扫的对象，主语是动作承受者，用被动语态 is cleaned。" },
    { id: "P1-2", level: 1, stem: "Many people ___ English around the world.", options: ["speak", "is spoken", "are spoken", "speaking"], answer: 0, explain: "主语 many people 是动作 speak 的执行者，用主动语态 speak。" },
    { id: "P1-3", level: 1, stem: "The telephone ___ by Alexander Bell in 1876.", options: ["invented", "was invented", "invents", "is inventing"], answer: 1, explain: "电话是被发明的，主语 the telephone 是承受者，用被动 was invented。" },
    { id: "P1-4", level: 1, stem: "Our teacher ___ us an interesting story yesterday.", options: ["told", "was told", "tells", "is told"], answer: 0, explain: "老师是讲故事的执行者，用主动 told。" },
    { id: "P1-5", level: 1, stem: "The windows ___ by Tom last night.", options: ["broke", "were broken", "break", "breaking"], answer: 1, explain: "窗户是被打破的，且主语 windows 是复数，用 were broken。" },
    { id: "P1-6", level: 1, stem: "Rice ___ in the south of China.", options: ["grows", "is grown", "grow", "growing"], answer: 1, explain: "水稻是被种植的，用被动 is grown（rice 不可数，用 is）。" },
    { id: "P1-7", level: 1, stem: "The children ___ happily in the garden now.", options: ["play", "are played", "playing", "plays"], answer: 0, explain: "孩子们是玩耍的执行者，用主动 play（现在进行时也可，但选项中没有）。" },
    { id: "P1-8", level: 1, stem: "This song ___ by millions of people.", options: ["loves", "is loved", "love", "loving"], answer: 1, explain: "歌曲是被喜爱的，用被动 is loved。" },

    // ---------- Level 2 构成 ----------
    { id: "P2-1", level: 2, stem: "The homework ___ by the students already.", options: ["has finished", "has been finished", "have finished", "have been finished"], answer: 1, explain: "homework 不可数，助动词用 has；被动完成时 has been + 过去分词。" },
    { id: "P2-2", level: 2, stem: "A new library ___ in our city next year.", options: ["will build", "will be built", "is built", "builds"], answer: 1, explain: "图书馆是被建的，且时间 next year，用 will be built。" },
    { id: "P2-3", level: 2, stem: "The bridge ___ last year.", options: ["built", "was built", "is built", "builds"], answer: 1, explain: "桥是被建的，last year 表过去，用 was built。" },
    { id: "P2-4", level: 2, stem: "English ___ in many countries.", options: ["speaks", "is spoken", "are spoken", "spoke"], answer: 1, explain: "英语是被说的，English 不可数视为单数，用 is spoken。" },
    { id: "P2-5", level: 2, stem: "The letters ___ yesterday.", options: ["sent", "were sent", "was sent", "sends"], answer: 1, explain: "letters 复数 + 过去时间，用 were sent。" },
    { id: "P2-6", level: 2, stem: "The room ___ by us now.", options: ["is cleaning", "is being cleaned", "cleans", "cleaned"], answer: 1, explain: "房间正在被打扫，现在进行时被动：is being cleaned。" },
    { id: "P2-7", level: 2, stem: "The trees ___ by the workers last week.", options: ["planted", "were planted", "was planted", "plant"], answer: 1, explain: "trees 复数 + 过去时间，用 were planted。" },
    { id: "P2-8", level: 2, stem: "The cake ___ by my mother yesterday.", options: ["made", "was made", "is making", "makes"], answer: 1, explain: "蛋糕是被做的，过去时间，用 was made。" },

    // ---------- Level 3 三种基本时态 ----------
    { id: "P3-1", level: 3, stem: "The sports meeting ___ next Friday.", options: ["holds", "is held", "will be held", "held"], answer: 2, explain: "运动会是被举办的，next Friday 表将来，用 will be held。" },
    { id: "P3-2", level: 3, stem: "The Great Wall ___ by many tourists every year.", options: ["visits", "is visited", "are visited", "visiting"], answer: 1, explain: "长城是被参观的，every year 表习惯，用 is visited。" },
    { id: "P3-3", level: 3, stem: "The meeting ___ yesterday.", options: ["held", "was held", "is held", "holds"], answer: 1, explain: "会议是被召开的，yesterday 表过去，用 was held。" },
    { id: "P3-4", level: 3, stem: "The new hospital ___ next month.", options: ["opens", "will be opened", "opened", "is opening"], answer: 1, explain: "医院是被启用的，next month 表将来，用 will be opened。" },
    { id: "P3-5", level: 3, stem: "These books ___ last week.", options: ["returned", "were returned", "was returned", "return"], answer: 1, explain: "书是被归还的，these books 复数 + 过去时，用 were returned。" },
    { id: "P3-6", level: 3, stem: "The playground ___ after school every day.", options: ["cleans", "is cleaned", "cleaned", "cleaning"], answer: 1, explain: "操场是被打扫的，every day 表习惯，用 is cleaned。" },
    { id: "P3-7", level: 3, stem: "The problem ___ by us tomorrow.", options: ["solves", "will be solved", "solved", "is solving"], answer: 1, explain: "问题是被解决的，tomorrow 表将来，用 will be solved。" },
    { id: "P3-8", level: 3, stem: "The bridge ___ in 2010.", options: ["was built", "is built", "built", "builds"], answer: 0, explain: "桥是被建的，in 2010 表过去，用 was built。" },

    // ---------- Level 4 扩展 ----------
    { id: "P4-1", level: 4, stem: "The work ___ today. We have no time.", options: ["must finish", "must be finished", "must finished", "finish"], answer: 1, explain: "工作是被完成的，情态动词后被动：must be + 过去分词，不能用 must finished。" },
    { id: "P4-2", level: 4, stem: "This problem can ___ easily.", options: ["solve", "be solved", "solved", "solving"], answer: 1, explain: "问题是被解决的，can 后被动用 be + 过去分词：can be solved。" },
    { id: "P4-3", level: 4, stem: "The bridge ___ already.", options: ["has rebuilt", "has been rebuilt", "is rebuilt", "rebuilds"], answer: 1, explain: "桥是被重建的，already 提示现在完成时：has been rebuilt。" },
    { id: "P4-4", level: 4, stem: "All the tickets ___ out before I arrived.", options: ["sold", "had been sold", "have sold", "were selling"], answer: 1, explain: "票在「我到达」之前就卖完了，过去的过去用过去完成时被动：had been sold。" },
    { id: "P4-5", level: 4, stem: "The road ___ at the moment.", options: ["repairs", "is being repaired", "is repaired", "repaired"], answer: 1, explain: "at the moment 表正在进行，现在进行时被动：is being repaired。" },
    { id: "P4-6", level: 4, stem: "The report ___ before Friday.", options: ["should hand in", "should be handed in", "should handed in", "hands in"], answer: 1, explain: "报告是被上交的，情态动词被动：should be handed in。" },
    { id: "P4-7", level: 4, stem: "The children ___ by their grandparents.", options: ["look after", "are looked after", "are looking after", "look after"], answer: 1, explain: "孩子是被照顾的；短语动词变被动时介词 after 不能丢：are looked after。" },
    { id: "P4-8", level: 4, stem: "There is a lot of work ___.", options: ["to do", "to be done", "doing", "done"], answer: 1, explain: "工作等着被做，不定式的被动式 to be done。to do 也可表示「要做」，但此处强调被做，且与选项对比选 to be done。" },

    // ---------- Level 5 主动变被动 ----------
    { id: "P5-1", level: 5, stem: "People use computers in offices. → Computers ___ in offices.", options: ["use", "are used", "used", "using"], answer: 1, explain: "宾语 computers 提前作主语，复数用 are used。" },
    { id: "P5-2", level: 5, stem: "They built the bridge in 2008. → The bridge ___ in 2008.", options: ["built", "was built", "is built", "builds"], answer: 1, explain: "the bridge 提前作主语，过去时被动 was built。" },
    { id: "P5-3", level: 5, stem: "Someone stole my bike. → My bike ___.", options: ["stole", "was stolen", "is stolen", "steals"], answer: 1, explain: "my bike 提前作主语，过去时被动 was stolen。" },
    { id: "P5-4", level: 5, stem: "They will finish the work tomorrow. → The work ___ tomorrow.", options: ["will finish", "will be finished", "finishes", "finished"], answer: 1, explain: "the work 提前作主语，将来时被动 will be finished。" },
    { id: "P5-5", level: 5, stem: "The teacher gave us some advice. → We ___ some advice.", options: ["gave", "were given", "was given", "give"], answer: 1, explain: "双宾语结构中把间接宾语 us 提前作主语，we 复数用 were given。" },
    { id: "P5-6", level: 5, stem: "They have cleaned the classroom. → The classroom ___ by them.", options: ["has cleaned", "has been cleaned", "have been cleaned", "cleaned"], answer: 1, explain: "the classroom 单数，现在完成时被动 has been cleaned。" },
    { id: "P5-7", level: 5, stem: "People speak English all over the world. → English ___ all over the world.", options: ["speaks", "is spoken", "are spoken", "spoke"], answer: 1, explain: "English 视为单数，被动 is spoken。" },
    { id: "P5-8", level: 5, stem: "Mr. Li wrote this book. → This book ___ by Mr. Li.", options: ["wrote", "was written", "is written", "writes"], answer: 1, explain: "this book 提前作主语，过去时被动 was written。" },

    // ---------- Level 6 综合 ----------
    { id: "P6-1", level: 6, stem: "Some of the old buildings ___ in the earthquake last year.", options: ["destroyed", "were destroyed", "are destroyed", "destroy"], answer: 1, explain: "建筑是被摧毁的，复数 + 过去时：were destroyed。" },
    { id: "P6-2", level: 6, stem: "More astronauts ___ to the space station in the future.", options: ["will send", "will be sent", "send", "are sending"], answer: 1, explain: "宇航员是被派送的，将来时被动 will be sent。" },
    { id: "P6-3", level: 6, stem: "It ___ that he is a genius.", options: ["says", "is said", "said", "is saying"], answer: 1, explain: "固定句型 It is said that…（据说），it 是形式主语，用被动 is said。" },
    { id: "P6-4", level: 6, stem: "The moon ___ by tourists one day.", options: ["will visit", "will be visited", "visits", "is visiting"], answer: 1, explain: "月球是被造访的，one day 表将来，用 will be visited。" },
    { id: "P6-5", level: 6, stem: "A mini-camera ___ to the front of the glasses.", options: ["connects", "is connected", "connected", "connecting"], answer: 1, explain: "摄像头是被连接的，用 is connected（教材例句）。" },
    { id: "P6-6", level: 6, stem: "The accident ___ last night.", options: ["happened", "was happened", "happens", "happening"], answer: 0, explain: "happen 是不及物动词，没有被动语态，用主动 happened。" },
    { id: "P6-7", level: 6, stem: "— Must I finish the work now? — No, it ___ tomorrow.", options: ["must finish", "can be finished", "must be finished", "can finish"], answer: 1, explain: "工作是被完成的，情态动词被动 can be finished。" },
    { id: "P6-8", level: 6, stem: "The trees ___ since last year.", options: ["have planted", "have been planted", "planted", "are planted"], answer: 1, explain: "树是被种的，since 提示现在完成时，用 have been planted。" }
  ]
};
})();
