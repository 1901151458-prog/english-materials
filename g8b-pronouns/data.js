/* 八下反身代词与情态动词专项 · 48 题 / 6 级 */
(function(){
window.G8B_PRONOUNS = {
  levels: [
    { id: 1, name: "反身代词 · 形式", short: "形式", desc: "myself / yourself / himself / herself / itself / ourselves / yourselves / themselves。" },
    { id: 2, name: "反身代词 · 用法", short: "用法", desc: "作宾语、作同位语（强调）、作表语。" },
    { id: 3, name: "反身代词 · 固定搭配", short: "固定搭配", desc: "enjoy oneself、help oneself、take care of oneself 等。" },
    { id: 4, name: "情态动词 should", short: "should", desc: "表职责义务与劝告；否定 shouldn't。" },
    { id: 5, name: "情态动词 could", short: "could", desc: "提建议、委婉请求，比 can 更委婉。" },
    { id: 6, name: "综合提升", short: "综合", desc: "反身代词与情态动词混合辨析。" }
  ],
  questions: [
    // ---------- L1 形式 ----------
    { id: "P1-1", level: 1, stem: "I hurt ___ while playing football.", options: ["me", "myself", "my", "mine"], answer: 1, explain: "主语 I，hurt 的宾语用反身代词 myself。" },
    { id: "P1-2", level: 1, stem: "She made the cake by ___.", options: ["her", "herself", "she", "hers"], answer: 1, explain: "by oneself 表示「独自」，主语 she 用 herself。" },
    { id: "P1-3", level: 1, stem: "We enjoyed ___ at the party.", options: ["us", "ourselves", "our", "we"], answer: 1, explain: "主语 we，enjoy oneself 用 ourselves。" },
    { id: "P1-4", level: 1, stem: "You should be proud of ___.", options: ["you", "yourself", "your", "yours"], answer: 1, explain: "主语 you，介词 of 后用 yourself。" },
    { id: "P1-5", level: 1, stem: "They taught ___ to play the guitar.", options: ["them", "themselves", "their", "they"], answer: 1, explain: "主语 they，teach oneself 用 themselves。" },
    { id: "P1-6", level: 1, stem: "He can take care of ___.", options: ["him", "himself", "his", "he"], answer: 1, explain: "主语 he，take care of oneself 用 himself。" },
    { id: "P1-7", level: 1, stem: "The cat cleaned ___ with its tongue.", options: ["it", "itself", "its", "it's"], answer: 1, explain: "主语 the cat（it），反身代词用 itself。" },
    { id: "P1-8", level: 1, stem: "Please help ___ to some fruit, children.", options: ["you", "yourselves", "your", "yourself"], answer: 1, explain: "呼语 children 是复数，用 yourselves。" },

    // ---------- L2 用法 ----------
    { id: "P2-1", level: 2, stem: "I cooked the dinner ___.", options: ["myself", "me", "my", "mine"], answer: 0, explain: "反身代词作同位语表强调「我亲自」；教材例句。" },
    { id: "P2-2", level: 2, stem: "Just be ___.", options: ["yourself", "you", "your", "yours"], answer: 0, explain: "反身代词作表语；教材例句。" },
    { id: "P2-3", level: 2, stem: "Mary hasn't been quite ___ recently.", options: ["herself", "her", "she", "hers"], answer: 0, explain: "be oneself 表示「状态正常」，作表语；教材例句。" },
    { id: "P2-4", level: 2, stem: "You had better ask the dentist ___.", options: ["herself", "her", "she", "hers"], answer: 0, explain: "反身代词作宾语同位语，强调「本人」；教材例句。" },
    { id: "P2-5", level: 2, stem: "Don't cut ___ with the knife!", options: ["you", "yourself", "your", "yours"], answer: 1, explain: "反身代词作动词宾语；教材例句。" },
    { id: "P2-6", level: 2, stem: "In teaching others, we teach ___.", options: ["us", "ourselves", "our", "we"], answer: 1, explain: "反身代词作宾语；教材例句。" },
    { id: "P2-7", level: 2, stem: "The children cleaned the classroom ___.", options: ["them", "themselves", "their", "they"], answer: 1, explain: "反身代词作主语同位语，强调「他们自己」。" },
    { id: "P2-8", level: 2, stem: "Be careful when you're using the knife! Don't cut ___.", options: ["you", "yourself", "your", "yours"], answer: 1, explain: "反身代词作宾语；教材例句。" },

    // ---------- L3 固定搭配 ----------
    { id: "P3-1", level: 3, stem: "Enjoy ___ at the party!", options: ["you", "yourself", "your", "yours"], answer: 1, explain: "enjoy oneself 表示「玩得开心」。" },
    { id: "P3-2", level: 3, stem: "Don't be too hard on ___.", options: ["you", "yourself", "your", "yours"], answer: 1, explain: "be hard on oneself「对自己太苛刻」；教材例句。" },
    { id: "P3-3", level: 3, stem: "He hurt ___ in the accident.", options: ["him", "himself", "his", "he"], answer: 1, explain: "hurt oneself 固定搭配。" },
    { id: "P3-4", level: 3, stem: "Please help ___ to the food.", options: ["you", "yourself", "your", "yours"], answer: 1, explain: "help oneself to sth「随便吃」。" },
    { id: "P3-5", level: 3, stem: "She teaches ___ English every day.", options: ["her", "herself", "she", "hers"], answer: 1, explain: "teach oneself「自学」。" },
    { id: "P3-6", level: 3, stem: "They looked after ___ well.", options: ["them", "themselves", "their", "they"], answer: 1, explain: "look after oneself「照顾自己」。" },
    { id: "P3-7", level: 3, stem: "Take care of ___.", options: ["you", "yourself", "your", "yours"], answer: 1, explain: "take care of oneself「照顾好自己」。" },
    { id: "P3-8", level: 3, stem: "We protected ___ from the rain.", options: ["us", "ourselves", "our", "we"], answer: 1, explain: "protect oneself「保护自己」。" },

    // ---------- L4 should ----------
    { id: "P4-1", level: 4, stem: "When you have the flu, you ___ wear a mask when you're outside.", options: ["should", "shouldn't", "mustn't", "can't"], answer: 0, explain: "should 表职责义务与劝告；教材例句。" },
    { id: "P4-2", level: 4, stem: "You ___ eat so much next time.", options: ["should", "shouldn't", "must", "can"], answer: 1, explain: "shouldn't 表劝告「不应当」；教材例句。" },
    { id: "P4-3", level: 4, stem: "We ___ judge a book by its cover.", options: ["should", "shouldn't", "must", "can"], answer: 1, explain: "shouldn't「不应该」；教材例句。" },
    { id: "P4-4", level: 4, stem: "If you did something wrong, you ___ say sorry.", options: ["should", "shouldn't", "mustn't", "can't"], answer: 0, explain: "should 表应尽的义务；教材例句。" },
    { id: "P4-5", level: 4, stem: "You ___ get up early to catch the bus.", options: ["should", "shouldn't", "mustn't", "can't"], answer: 0, explain: "提出建议用 should。" },
    { id: "P4-6", level: 4, stem: "Students ___ be late for class.", options: ["should", "shouldn't", "must", "can"], answer: 1, explain: "shouldn't 表示「不应当」。" },
    { id: "P4-7", level: 4, stem: "You ___ drink more water every day.", options: ["should", "shouldn't", "mustn't", "can't"], answer: 0, explain: "健康建议用 should。" },
    { id: "P4-8", level: 4, stem: "We ___ waste water.", options: ["should", "shouldn't", "must", "can"], answer: 1, explain: "shouldn't 表示劝告「不应该」。" },

    // ---------- L5 could ----------
    { id: "P5-1", level: 5, stem: "A: What should I take to the party? B: You ___ take some fruit or flowers.", options: ["could", "should", "must", "need"], answer: 0, explain: "could 提建议，比 can 委婉；教材例句。" },
    { id: "P5-2", level: 5, stem: "If you want to say sorry, you ___ call him.", options: ["could", "must", "need", "have"], answer: 0, explain: "could 提出建议；教材例句。" },
    { id: "P5-3", level: 5, stem: "___ you help me with this box?", options: ["Could", "Should", "Must", "Need"], answer: 0, explain: "Could you ...? 委婉请求。" },
    { id: "P5-4", level: 5, stem: "You ___ ask your teacher for help.", options: ["could", "must", "need", "have"], answer: 0, explain: "could 表示建议「可以」。" },
    { id: "P5-5", level: 5, stem: "You look tired. You ___ take a rest.", options: ["could", "must", "need", "have"], answer: 0, explain: "could 提出建议。" },
    { id: "P5-6", level: 5, stem: "___ you please open the window?", options: ["Could", "Should", "Must", "Need"], answer: 0, explain: "Could you please ...? 委婉请求。" },
    { id: "P5-7", level: 5, stem: "Maybe you ___ try the new restaurant.", options: ["could", "must", "need", "have"], answer: 0, explain: "could 表示建议。" },
    { id: "P5-8", level: 5, stem: "You ___ write to your parents so that they'll know how you feel.", options: ["could", "must", "need", "have"], answer: 0, explain: "could 提建议；教材例句（so that 表目的）。" },

    // ---------- L6 综合 ----------
    { id: "P6-1", level: 6, stem: "She made the dress ___.", options: ["herself", "her", "she", "hers"], answer: 0, explain: "反身代词作同位语表强调。" },
    { id: "P6-2", level: 6, stem: "You ___ be careful when crossing the street.", options: ["should", "shouldn't", "couldn't", "mustn't"], answer: 0, explain: "should 表劝告「应该」。" },
    { id: "P6-3", level: 6, stem: "He taught ___ to swim.", options: ["him", "himself", "his", "he"], answer: 1, explain: "teach oneself「自学」。" },
    { id: "P6-4", level: 6, stem: "You ___ not eat too much junk food.", options: ["should", "could", "must", "can"], answer: 0, explain: "should not 表示劝告「不应该」。" },
    { id: "P6-5", level: 6, stem: "We should protect ___ from the sun.", options: ["us", "ourselves", "our", "we"], answer: 1, explain: "protect oneself「保护自己」。" },
    { id: "P6-6", level: 6, stem: "— Could I use your phone? — Yes, you ___.", options: ["can", "could", "should", "must"], answer: 0, explain: "回答 Could I ...? 时通常用 can。" },
    { id: "P6-7", level: 6, stem: "You ___ worry too much. Everything will be fine.", options: ["shouldn't", "couldn't", "mustn't", "needn't"], answer: 0, explain: "shouldn't「不应该」表劝告。" },
    { id: "P6-8", level: 6, stem: "They enjoyed ___ at the concert last night.", options: ["them", "themselves", "their", "they"], answer: 1, explain: "enjoy oneself 固定搭配。" }
  ]
};
})();
