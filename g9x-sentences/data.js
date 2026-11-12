/* 九下（网传版）句子类型专项 · 48 题 / 6 级 */
(function(){
window.G9X_SENTENCES = {
  levels: [
    { id: 1, name: "简单句", short: "简单句", desc: "一个主语（或并列主语）+ 一个谓语（或并列谓语）。" },
    { id: 2, name: "并列句", short: "并列句", desc: "并列连词连接两个或以上简单句。" },
    { id: 3, name: "复合句", short: "复合句", desc: "一个主句 + 一个或以上从句。" },
    { id: 4, name: "三类句型辨析", short: "三类辨析", desc: "简单句 / 并列句 / 复合句的判断。" },
    { id: 5, name: "并列连词判断", short: "连词", desc: "and / so / but / or 等并列连词。" },
    { id: 6, name: "综合提升", short: "综合", desc: "句子结构与连词混合辨析。" }
  ],
  questions: [
    { id: "U1-1", level: 1, stem: "My mother often goes shopping at weekends. 属于 ___。", options: ["简单句", "并列句", "复合句", "感叹句"], answer: 0, explain: "一个主谓结构；教材表5例句。" },
    { id: "U1-2", level: 1, stem: "Some students walk or ride bicycles to school. 属于 ___。", options: ["简单句", "并列句", "复合句", "祈使句"], answer: 0, explain: "并列谓语 walk or ride，仍是一个主谓结构；教材表5例句。" },
    { id: "U1-3", level: 1, stem: "简单句由 ___ 构成。", options: ["一个主语（或并列主语）和一个谓语（或并列谓语）", "两个简单句", "一个主句加从句", "多个独立句子"], answer: 0, explain: "教材表5定义。" },
    { id: "U1-4", level: 1, stem: "I like music. 属于 ___。", options: ["简单句", "并列句", "复合句", "疑问句"], answer: 0, explain: "一个主谓结构，简单句。" },
    { id: "U1-5", level: 1, stem: "She sings and dances well. 属于 ___。", options: ["简单句", "并列句", "复合句", "感叹句"], answer: 0, explain: "并列谓语 sings and dances，仍是简单句。" },
    { id: "U1-6", level: 1, stem: "The children played games in the park. 属于 ___。", options: ["简单句", "并列句", "复合句", "祈使句"], answer: 0, explain: "一个主语 + 一个谓语，简单句。" },
    { id: "U1-7", level: 1, stem: "Tom and Jerry are good friends. 属于 ___。", options: ["简单句", "并列句", "复合句", "感叹句"], answer: 0, explain: "并列主语 Tom and Jerry，仍是简单句。" },
    { id: "U1-8", level: 1, stem: "简单句里可以有 ___。", options: ["并列主语或并列谓语", "从句", "两个主句", "多个独立句"], answer: 0, explain: "教材表5：由一个主语（或并列主语）和一个谓语（或并列谓语）构成。" },

    { id: "U2-1", level: 2, stem: "They are sweet rice balls, and we eat them during the Lantern Festival. 属于 ___。", options: ["简单句", "并列句", "复合句", "祈使句"], answer: 1, explain: "and 连接两个简单句；教材表5例句。" },
    { id: "U2-2", level: 2, stem: "School starts at eight, so I get up at six thirty. 属于 ___。", options: ["简单句", "并列句", "复合句", "感叹句"], answer: 1, explain: "so 连接两个简单句；教材表5例句。" },
    { id: "U2-3", level: 2, stem: "There are many boat races around the world, but this one is special. 属于 ___。", options: ["简单句", "并列句", "复合句", "疑问句"], answer: 1, explain: "but 连接两个简单句；教材表5例句。" },
    { id: "U2-4", level: 2, stem: "并列句由 ___ 把两个或以上的简单句连在一起构成。", options: ["并列连词（and、so、but、or 等）", "从属连词", "关系代词", "疑问词"], answer: 0, explain: "教材表5定义。" },
    { id: "U2-5", level: 2, stem: "I was tired, ___ I kept working.", options: ["but", "because", "if", "that"], answer: 0, explain: "but 连接并列句表转折。" },
    { id: "U2-6", level: 2, stem: "Hurry up, ___ you'll be late.", options: ["or", "and", "but", "so"], answer: 0, explain: "or 连接并列句表「否则」。" },
    { id: "U2-7", level: 2, stem: "He studied hard, ___ he passed the exam.", options: ["so", "but", "or", "though"], answer: 0, explain: "so 连接并列句表结果。" },
    { id: "U2-8", level: 2, stem: "下面哪个是并列连词？", options: ["and", "when", "that", "who"], answer: 0, explain: "and、so、but、or 是并列连词；when 是从属连词。" },

    { id: "U3-1", level: 3, stem: "I wonder if the two water festivals are similar. 属于 ___。", options: ["简单句", "并列句", "复合句", "祈使句"], answer: 2, explain: "主句 I wonder + 宾语从句 if...；教材表5例句。" },
    { id: "U3-2", level: 3, stem: "What do you want to be when you grow up? 属于 ___。", options: ["简单句", "并列句", "复合句", "感叹句"], answer: 2, explain: "主句 + when 引导的时间状语从句；教材表5例句。" },
    { id: "U3-3", level: 3, stem: "Do you have everything that you need? 属于 ___。", options: ["简单句", "并列句", "复合句", "疑问句"], answer: 2, explain: "主句 + that 引导的定语从句；教材表5例句。" },
    { id: "U3-4", level: 3, stem: "复合句由 ___ 构成。", options: ["一个主句和一个或一个以上的从句", "两个简单句", "并列主语", "并列谓语"], answer: 0, explain: "教材表5定义。" },
    { id: "U3-5", level: 3, stem: "I think he is right. 属于 ___。", options: ["复合句", "简单句", "并列句", "祈使句"], answer: 0, explain: "主句 I think + 宾语从句 he is right。" },
    { id: "U3-6", level: 3, stem: "If it rains tomorrow, we will stay at home. 属于 ___。", options: ["复合句", "简单句", "并列句", "感叹句"], answer: 0, explain: "主句 + if 条件状语从句。" },
    { id: "U3-7", level: 3, stem: "The man who is singing is my uncle. 属于 ___。", options: ["复合句", "简单句", "并列句", "祈使句"], answer: 0, explain: "主句 + who 引导的定语从句。" },
    { id: "U3-8", level: 3, stem: "Because he was ill, he didn't come. 属于 ___。", options: ["复合句", "简单句", "并列句", "疑问句"], answer: 0, explain: "主句 + because 原因状语从句。" },

    { id: "U4-1", level: 4, stem: "______ I go home, I'll call you.", options: ["When", "And", "But", "So"], answer: 0, explain: "when 引导时间状语从句，构成复合句；and/but/so 是并列连词。" },
    { id: "U4-2", level: 4, stem: "She was tired, ___ she didn't stop.", options: ["but", "because", "if", "when"], answer: 0, explain: "but 连接并列句（简单句 + 简单句）。" },
    { id: "U4-3", level: 4, stem: "I don't know ___ he will come.", options: ["whether", "and", "but", "so"], answer: 0, explain: "whether 引导宾语从句，构成复合句。" },
    { id: "U4-4", level: 4, stem: "I opened the door ___ went out.", options: ["and", "because", "when", "that"], answer: 0, explain: "and 连接并列谓语，仍是简单句。" },
    { id: "U4-5", level: 4, stem: "He ran fast ___ he could catch the bus.", options: ["so that", "and", "but", "or"], answer: 0, explain: "so that 引导目的状语从句，构成复合句。" },
    { id: "U4-6", level: 4, stem: "下面哪句是复合句？", options: ["I think that he is right.", "I like tea and coffee.", "He is tall and thin.", "Tom and I are friends."], answer: 0, explain: "含宾语从句才是复合句；其余是简单句（并列成分）。" },
    { id: "U4-7", level: 4, stem: "下面哪句是并列句？", options: ["He is young, but he knows a lot.", "He knows a lot.", "I think he knows a lot.", "The young man knows a lot."], answer: 0, explain: "but 连接两个简单句，是并列句。" },
    { id: "U4-8", level: 4, stem: "下面哪句是简单句？", options: ["Ella is dancing.", "I think Ella is dancing.", "Ella is dancing, and Tom is singing.", "When Ella dances, we watch."], answer: 0, explain: "一个主谓结构，简单句。" },

    { id: "U5-1", level: 5, stem: "She is tired, ___ she keeps working.", options: ["but", "because", "if", "when"], answer: 0, explain: "表转折用 but（并列连词）。" },
    { id: "U5-2", level: 5, stem: "Study hard, ___ you will fail.", options: ["or", "and", "but", "so"], answer: 0, explain: "祈使句 + or 表「否则」。" },
    { id: "U5-3", level: 5, stem: "It was late, ___ we went home.", options: ["so", "but", "or", "though"], answer: 0, explain: "表结果用 so。" },
    { id: "U5-4", level: 5, stem: "I like both tea ___ coffee.", options: ["and", "but", "or", "so"], answer: 0, explain: "both ... and ... 并列结构。" },
    { id: "U5-5", level: 5, stem: "He is not only clever ___ also hard-working.", options: ["but", "and", "or", "so"], answer: 0, explain: "not only ... but also ... 并列结构。" },
    { id: "U5-6", level: 5, stem: "Would you like tea ___ coffee?", options: ["or", "and", "but", "so"], answer: 0, explain: "选择疑问用 or。" },
    { id: "U5-7", level: 5, stem: "Tom is tall, ___ his brother is short.", options: ["but", "and", "so", "or"], answer: 0, explain: "对比转折用 but。" },
    { id: "U5-8", level: 5, stem: "He got up early, ___ he caught the first bus.", options: ["so", "but", "or", "though"], answer: 0, explain: "因果关系用 so。" },

    { id: "U6-1", level: 6, stem: "My mother often goes shopping at weekends ___ some students walk to school.", options: ["and", "that", "if", "when"], answer: 0, explain: "and 连接两个简单句构成并列句。" },
    { id: "U6-2", level: 6, stem: "I wonder ___ the two festivals are similar.", options: ["if", "and", "but", "or"], answer: 0, explain: "if 引导宾语从句，构成复合句。" },
    { id: "U6-3", level: 6, stem: "School starts at eight, ___ I get up at six thirty.", options: ["so", "if", "that", "who"], answer: 0, explain: "so 连接并列句。" },
    { id: "U6-4", level: 6, stem: "Do you have everything ___ you need?", options: ["that", "and", "but", "if"], answer: 0, explain: "that 引导定语从句，构成复合句；教材表5例句。" },
    { id: "U6-5", level: 6, stem: "Some students walk ___ ride bicycles to school.", options: ["or", "but", "so", "because"], answer: 0, explain: "并列谓语用 or，仍是简单句；教材表5例句。" },
    { id: "U6-6", level: 6, stem: "___ he is young, he knows a lot.", options: ["Although", "And", "But", "So"], answer: 0, explain: "Although 引导让步状语从句，构成复合句。" },
    { id: "U6-7", level: 6, stem: "This is the book ___ I bought yesterday.", options: ["that", "and", "but", "so"], answer: 0, explain: "that 引导定语从句。" },
    { id: "U6-8", level: 6, stem: "Neither Tom ___ Jerry is at home.", options: ["nor", "or", "and", "but"], answer: 0, explain: "neither ... nor ... 并列结构。" }
  ]
};
})();
