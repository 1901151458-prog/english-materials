/* 八下动词不定式专项 · 48 题 / 6 级 */
(function(){
window.G8B_INFINITIVES = {
  levels: [
    { id: 1, name: "基础 · 不定式的形式", short: "形式", desc: "to + 动词原形；没有时态和人称变化。" },
    { id: 2, name: "作宾语", short: "作宾语", desc: "want / decide / hope / agree / promise 等动词后接不定式。" },
    { id: 3, name: "作目的状语", short: "目的状语", desc: "表示「为了做某事」，说明动作的目的。" },
    { id: 4, name: "作宾语补足语", short: "宾补", desc: "tell / ask / want / encourage sb to do sth。" },
    { id: 5, name: "否定式与疑问词 + 不定式", short: "否定/疑问词", desc: "not to do；what/how/where/which + to do。" },
    { id: 6, name: "不带 to 的不定式", short: "不带to", desc: "感官动词 see/hear/watch/feel/notice 与使役动词 let/make/have。" }
  ],
  questions: [
    // ---------- L1 形式 ----------
    { id: "I1-1", level: 1, stem: "I want ___ a doctor when I grow up.", options: ["to be", "being", "be", "been"], answer: 0, explain: "want 后接不定式 to be。" },
    { id: "I1-2", level: 1, stem: "She decided ___ harder from now on.", options: ["study", "to study", "studying", "studied"], answer: 1, explain: "decide 后接不定式 to study。" },
    { id: "I1-3", level: 1, stem: "They hope ___ the game tomorrow.", options: ["win", "to win", "winning", "won"], answer: 1, explain: "hope 后接不定式 to win。" },
    { id: "I1-4", level: 1, stem: "He agreed ___ us with the project.", options: ["to help", "helping", "help", "helped"], answer: 0, explain: "agree 后接不定式 to help。" },
    { id: "I1-5", level: 1, stem: "We plan ___ a trip next month.", options: ["take", "to take", "taking", "took"], answer: 1, explain: "plan 后接不定式 to take。" },
    { id: "I1-6", level: 1, stem: "She refused ___ the question.", options: ["answer", "to answer", "answering", "answered"], answer: 1, explain: "refuse 后接不定式 to answer。" },
    { id: "I1-7", level: 1, stem: "I'd like ___ something about the city.", options: ["know", "to know", "knowing", "knew"], answer: 1, explain: "would like 后接不定式 to know。" },
    { id: "I1-8", level: 1, stem: "He failed ___ the exam last week.", options: ["pass", "to pass", "passing", "passed"], answer: 1, explain: "fail 后接不定式 to pass。" },

    // ---------- L2 作宾语 ----------
    { id: "I2-1", level: 2, stem: "Do you want ___ the Great Wall?", options: ["to visit", "visiting", "visit", "visits"], answer: 0, explain: "want to visit；教材例句（表6）。" },
    { id: "I2-2", level: 2, stem: "I like ___ badminton in my free time.", options: ["to play", "play", "played", "plays"], answer: 0, explain: "like to do sth；教材例句（表6）。" },
    { id: "I2-3", level: 2, stem: "On Saturday, James decided ___ fried chicken.", options: ["to make", "making", "make", "made"], answer: 0, explain: "decide to make；教材例句（表6）。" },
    { id: "I2-4", level: 2, stem: "They hope ___ the problem by themselves.", options: ["solve", "to solve", "solving", "solved"], answer: 1, explain: "hope 后接不定式作宾语。" },
    { id: "I2-5", level: 2, stem: "I forgot ___ the door when I left.", options: ["lock", "to lock", "locking", "locked"], answer: 1, explain: "forget to do 表示「忘记去做」（还没做）。" },
    { id: "I2-6", level: 2, stem: "She promised ___ on time.", options: ["arrive", "to arrive", "arriving", "arrived"], answer: 1, explain: "promise 后接不定式 to arrive。" },
    { id: "I2-7", level: 2, stem: "We agreed ___ the meeting on Friday.", options: ["hold", "to hold", "holding", "held"], answer: 1, explain: "agree 后接不定式 to hold。" },
    { id: "I2-8", level: 2, stem: "He chose ___ the piano instead of the violin.", options: ["learn", "to learn", "learning", "learned"], answer: 1, explain: "choose 后接不定式 to learn。" },

    // ---------- L3 作目的状语 ----------
    { id: "I3-1", level: 3, stem: "What do you do ___ the time?", options: ["to pass", "passing", "pass", "passed"], answer: 0, explain: "to pass the time 表示目的「为了打发时间」；教材例句（表6）。" },
    { id: "I3-2", level: 3, stem: "Allen ran to the living room ___ the fire extinguisher.", options: ["to get", "getting", "get", "got"], answer: 0, explain: "不定式作目的状语；教材例句（表6）。" },
    { id: "I3-3", level: 3, stem: "Do not stand up ___ for food across the table.", options: ["to reach", "reaching", "reach", "reached"], answer: 0, explain: "不定式表目的；教材例句（表6）。" },
    { id: "I3-4", level: 3, stem: "She went to the library ___ some books.", options: ["to borrow", "borrowing", "borrow", "borrowed"], answer: 0, explain: "去图书馆的目的是借书，用不定式表目的。" },
    { id: "I3-5", level: 3, stem: "He got up early ___ the first bus.", options: ["to catch", "catching", "catch", "caught"], answer: 0, explain: "早起的目的：赶上第一班车。" },
    { id: "I3-6", level: 3, stem: "We stayed up late ___ the report.", options: ["to finish", "finishing", "finish", "finished"], answer: 0, explain: "熬夜的目的：完成报告。" },
    { id: "I3-7", level: 3, stem: "She spoke loudly ___ everyone could hear her.", options: ["to make sure", "making sure", "make sure", "made sure"], answer: 0, explain: "不定式表目的（这里也可用 so that 从句）。" },
    { id: "I3-8", level: 3, stem: "They went to the station ___ their friend.", options: ["to meet", "meeting", "meet", "met"], answer: 0, explain: "去车站的目的是接朋友。" },

    // ---------- L4 作宾语补足语 ----------
    { id: "I4-1", level: 4, stem: "My instructor encouraged me ___ back up whenever I fell.", options: ["to get", "getting", "get", "got"], answer: 0, explain: "encourage sb to do；教材例句（表6）。" },
    { id: "I4-2", level: 4, stem: "My parents told me ___ myself too hard.", options: ["not to push", "not push", "to not push", "pushing"], answer: 0, explain: "tell sb not to do；否定式；教材例句（表6）。" },
    { id: "I4-3", level: 4, stem: "Doctor Cooper asked him ___ more careful in the future.", options: ["to be", "be", "being", "been"], answer: 0, explain: "ask sb to do；教材例句（表6）。" },
    { id: "I4-4", level: 4, stem: "The teacher wants us ___ the text aloud.", options: ["to read", "read", "reading", "readed"], answer: 0, explain: "want sb to do sth。" },
    { id: "I4-5", level: 4, stem: "She told the children ___ in the street.", options: ["not to play", "not play", "to not play", "playing"], answer: 0, explain: "tell sb not to do sth 否定式。" },
    { id: "I4-6", level: 4, stem: "The doctor advised him ___ more exercise.", options: ["to take", "take", "taking", "took"], answer: 0, explain: "advise sb to do sth。" },
    { id: "I4-7", level: 4, stem: "Our teacher asked us ___ quiet in the library.", options: ["to keep", "keep", "keeping", "kept"], answer: 0, explain: "ask sb to do sth。" },
    { id: "I4-8", level: 4, stem: "The coach encouraged the players ___ their best.", options: ["to try", "try", "trying", "tried"], answer: 0, explain: "encourage sb to do sth。" },

    // ---------- L5 否定式与疑问词 ----------
    { id: "I5-1", level: 5, stem: "I would prefer ___ about it. It's private.", options: ["not to talk", "not talking", "to not talk", "talk not"], answer: 0, explain: "不定式的否定式：not to do；教材例句。" },
    { id: "I5-2", level: 5, stem: "\"Try ___ any noise when you eat,\" his mother said.", options: ["not to make", "not make", "to not make", "making"], answer: 0, explain: "try not to do sth；教材例句。" },
    { id: "I5-3", level: 5, stem: "He didn't know ___ to Ella.", options: ["what to say", "what say", "how say", "what saying"], answer: 0, explain: "疑问词 + 不定式：what to say；教材例句。" },
    { id: "I5-4", level: 5, stem: "She asked me ___ the washing machine.", options: ["how to use", "how use", "what use", "how using"], answer: 0, explain: "how to use；教材例句。" },
    { id: "I5-5", level: 5, stem: "The tour guide will tell you ___ next.", options: ["where to go", "where go", "where going", "to where go"], answer: 0, explain: "where to go；教材例句。" },
    { id: "I5-6", level: 5, stem: "I have no idea ___ for my book report.", options: ["which book to choose", "which book choose", "which to choose book", "choose which book"], answer: 0, explain: "which + 名词 + 不定式。" },
    { id: "I5-7", level: 5, stem: "She was not sure ___ next.", options: ["what to do", "what do", "how do", "what doing"], answer: 0, explain: "what to do 表示「该做什么」。" },
    { id: "I5-8", level: 5, stem: "He asked me ___ him with his homework.", options: ["to help", "help", "helping", "helped"], answer: 0, explain: "ask sb to do sth 作宾语补足语。" },

    // ---------- L6 不带 to ----------
    { id: "I6-1", level: 6, stem: "The referee saw Matt ___ the other player.", options: ["push", "to push", "pushing", "pushed"], answer: 0, explain: "感官动词 see sb do sth，不定式不带 to；教材例句。" },
    { id: "I6-2", level: 6, stem: "He heard someone ___ down the stairway.", options: ["walk", "to walk", "walked", "walks"], answer: 0, explain: "感官动词 hear sb do sth，不带 to；教材例句。" },
    { id: "I6-3", level: 6, stem: "If you have any questions, please let me ___.", options: ["know", "to know", "knowing", "known"], answer: 0, explain: "使役动词 let sb do sth，不带 to；教材例句。" },
    { id: "I6-4", level: 6, stem: "Hobbies can make you ___ good about yourself.", options: ["feel", "to feel", "feeling", "felt"], answer: 0, explain: "使役动词 make sb do sth，不带 to；教材例句。" },
    { id: "I6-5", level: 6, stem: "I noticed him ___ a quick look at his watch.", options: ["take", "to take", "taking", "took"], answer: 0, explain: "感官动词 notice sb do sth，不带 to；教材例句。" },
    { id: "I6-6", level: 6, stem: "She watched the children ___ in the garden.", options: ["play", "to play", "played", "plays"], answer: 0, explain: "感官动词 watch sb do sth，不带 to。" },
    { id: "I6-7", level: 6, stem: "Don't make the baby ___.", options: ["cry", "to cry", "crying", "cried"], answer: 0, explain: "使役动词 make sb do sth，不带 to。" },
    { id: "I6-8", level: 6, stem: "I felt someone ___ my shoulder.", options: ["touch", "to touch", "touched", "touches"], answer: 0, explain: "感官动词 feel sb do sth，不带 to。" }
  ]
};
})();
