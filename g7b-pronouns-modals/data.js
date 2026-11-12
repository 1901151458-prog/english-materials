/* 七下物主代词与情态动词专项 · 48 题 / 6 级 */
(function(){
window.G7B_PRONOUNS = {
  levels: [
    { id: 1, name: "名词性物主代词 · 形式", short: "名词性形式", desc: "mine / yours / his / hers / ours / theirs。" },
    { id: 2, name: "物主代词 · 辨析", short: "物主辨析", desc: "形容词性 vs 名词性：能不能独立使用。" },
    { id: 3, name: "情态动词 can / could", short: "can/could", desc: "能力、许可、请求。" },
    { id: 4, name: "情态动词 may", short: "may", desc: "许可「可以」、可能性「也许」。" },
    { id: 5, name: "must 与 have to", short: "must/have to", desc: "主观 vs 客观；mustn't vs don't have to。" },
    { id: 6, name: "综合提升", short: "综合", desc: "物主代词与情态动词混合辨析。" }
  ],
  questions: [
    { id: "O1-1", level: 1, stem: "I 的名词性物主代词是 ___。", options: ["mine", "my", "me", "I"], answer: 0, explain: "教材表2：my（形容词性）→ mine（名词性）。" },
    { id: "O1-2", level: 1, stem: "you 的名词性物主代词是 ___。", options: ["yours", "your", "you", "yourself"], answer: 0, explain: "your → yours；教材表2。" },
    { id: "O1-3", level: 1, stem: "he 的名词性物主代词是 ___。", options: ["his", "him", "he", "hers"], answer: 0, explain: "his 形容词性与名词性同形；教材表2。" },
    { id: "O1-4", level: 1, stem: "she 的名词性物主代词是 ___。", options: ["hers", "her", "she", "him"], answer: 0, explain: "her → hers；教材表2。" },
    { id: "O1-5", level: 1, stem: "we 的名词性物主代词是 ___。", options: ["ours", "our", "us", "we"], answer: 0, explain: "our → ours；教材表2。" },
    { id: "O1-6", level: 1, stem: "they 的名词性物主代词是 ___。", options: ["theirs", "their", "them", "they"], answer: 0, explain: "their → theirs；教材表2。" },
    { id: "O1-7", level: 1, stem: "it 的名词性物主代词是 ___。", options: ["its", "it", "it's", "itself"], answer: 0, explain: "its 形容词性与名词性同形；教材表2。" },
    { id: "O1-8", level: 1, stem: "名词性物主代词相当于 ___。", options: ["名词", "形容词", "动词", "副词"], answer: 0, explain: "教材：名词性物主代词相当于名词。" },

    { id: "O2-1", level: 2, stem: "A: Is this ___ pen?（你的）", options: ["your", "yours", "you", "yourself"], answer: 0, explain: "修饰名词 pen 用形容词性 your；教材例句。" },
    { id: "O2-2", level: 2, stem: "The blue pen is ___.（我的）", options: ["mine", "my", "me", "I"], answer: 0, explain: "独立使用作表语用名词性 mine；教材例句。" },
    { id: "O2-3", level: 2, stem: "Is it ___?（你的）", options: ["yours", "your", "you", "yourself"], answer: 0, explain: "独立使用用名词性 yours；教材例句。" },
    { id: "O2-4", level: 2, stem: "No, it isn't ___.（我的）", options: ["mine", "my", "me", "I"], answer: 0, explain: "名词性 mine 独立使用；教材例句。" },
    { id: "O2-5", level: 2, stem: "No, ___ is at home.（她的）", options: ["hers", "her", "she", "him"], answer: 0, explain: "名词性 hers 独立作主语；教材例句。" },
    { id: "O2-6", level: 2, stem: "名词性物主代词 ___ 用于名词前。", options: ["不能", "可以", "必须", "有时可以"], answer: 0, explain: "教材：名词性物主代词不能用于名词前。" },
    { id: "O2-7", level: 2, stem: "This is ___ book.（我的）", options: ["my", "mine", "me", "I"], answer: 0, explain: "名词前用形容词性 my。" },
    { id: "O2-8", level: 2, stem: "This book is ___.（我的）", options: ["mine", "my", "me", "I"], answer: 0, explain: "独立使用用名词性 mine。" },

    { id: "O3-1", level: 3, stem: "We ___ speak a little English.（能力）", options: ["can", "may", "must", "have to"], answer: 0, explain: "can 表示能力；教材例句。" },
    { id: "O3-2", level: 3, stem: "He ___ swim when he was only six.", options: ["could", "can", "may", "must"], answer: 0, explain: "过去的能力用 could；教材例句。" },
    { id: "O3-3", level: 3, stem: "You ___ play basketball at the weekend.（许可）", options: ["can", "must", "have to", "need"], answer: 0, explain: "can 表示许可；教材例句。" },
    { id: "O3-4", level: 3, stem: "___ you help me with my Chinese?（请求）", options: ["Can", "May", "Must", "Have to"], answer: 0, explain: "can 表示请求；教材例句。" },
    { id: "O3-5", level: 3, stem: "___ you tell him to call me back?（更委婉）", options: ["Could", "Can", "May", "Must"], answer: 0, explain: "could 表示请求比 can 更委婉；教材例句。" },
    { id: "O3-6", level: 3, stem: "We ___ run in the hallways.（不许）", options: ["can't", "mustn't", "don't have to", "needn't"], answer: 0, explain: "教材例句 We can't run in the hallways 表许可的否定。" },
    { id: "O3-7", level: 3, stem: "Father said I ___ swim in the pool.", options: ["could", "can", "may", "must"], answer: 0, explain: "主句过去时，用 could；教材例句。" },
    { id: "O3-8", level: 3, stem: "I ___ play badminton, but I can't play volleyball.", options: ["can", "may", "must", "have to"], answer: 0, explain: "can 表能力；教材例句。" },

    { id: "O4-1", level: 4, stem: "___ I borrow your dictionary?（许可）", options: ["May", "Must", "Have to", "Need"], answer: 0, explain: "may 表许可「可以」；教材例句。" },
    { id: "O4-2", level: 4, stem: "Class is over. You ___ go now.（许可）", options: ["may", "must", "have to", "need"], answer: 0, explain: "may 表许可；教材例句。" },
    { id: "O4-3", level: 4, stem: "I ___ be late, so don't wait for me.（也许）", options: ["may", "must", "have to", "can"], answer: 0, explain: "may 表可能性「也许」；教材例句。" },
    { id: "O4-4", level: 4, stem: "That ___ be true.（可能）", options: ["may", "must", "can", "need"], answer: 0, explain: "may 表可能性；教材例句。" },
    { id: "O4-5", level: 4, stem: "may 表示许可时比 can ___。", options: ["更正式、更委婉", "更随便", "更强烈", "意思完全不同"], answer: 0, explain: "教材：may 的用法比 can 更正式，语气更委婉。" },
    { id: "O4-6", level: 4, stem: "may 的两个主要意思：许可和 ___。", options: ["可能性", "能力", "义务", "请求"], answer: 0, explain: "教材：may 表示许可（可以）和可能性（也许；可能）。" },
    { id: "O4-7", level: 4, stem: "You ___ go now if you finish.", options: ["may", "must", "have to", "need"], answer: 0, explain: "may 表许可。" },
    { id: "O4-8", level: 4, stem: "It ___ rain tomorrow.（也许）", options: ["may", "must", "can", "need"], answer: 0, explain: "may 表可能性。" },

    { id: "O5-1", level: 5, stem: "We ___ be on time. Don't arrive late.（主观）", options: ["must", "have to", "may", "can"], answer: 0, explain: "must 表主观看法、语气强；教材例句。" },
    { id: "O5-2", level: 5, stem: "We ___ be quiet in the library.（客观需要）", options: ["have to", "must", "may", "can"], answer: 0, explain: "have to 强调客观需要；教材例句。" },
    { id: "O5-3", level: 5, stem: "You ___ talk to your mother like that.（不准）", options: ["mustn't", "don't have to", "needn't", "can't"], answer: 0, explain: "mustn't 表示不准；禁止；教材原句。" },
    { id: "O5-4", level: 5, stem: "You ___ come if you don't want to.（不必）", options: ["don't have to", "mustn't", "needn't", "can't"], answer: 0, explain: "don't have to 表示不必；教材原句。" },
    { id: "O5-5", level: 5, stem: "She ___ work late today.（第三人称）", options: ["has to", "have to", "must", "may"], answer: 0, explain: "have to 有人称和数的变化，第三人称用 has to；教材例句。" },
    { id: "O5-6", level: 5, stem: "must 有 ___ 变化。", options: ["没有人称和数", "有人称和数", "有过去式", "有复数"], answer: 0, explain: "教材：must 没有人称和数的变化。" },
    { id: "O5-7", level: 5, stem: "mustn't 的意思是 ___。", options: ["不准；禁止", "不必", "不应该", "不能"], answer: 0, explain: "教材：mustn't 表示「不准；禁止」。don't have to 才表示「不必」。" },
    { id: "O5-8", level: 5, stem: "They ___ get to the station before five o'clock.", options: ["have to", "has to", "must has", "have"], answer: 0, explain: "主语 they 用 have to；教材例句。" },

    { id: "O6-1", level: 6, stem: "This is ___ book.（我的）", options: ["my", "mine", "me", "I"], answer: 0, explain: "名词前用形容词性 my。" },
    { id: "O6-2", level: 6, stem: "That book is ___.（他的）", options: ["his", "him", "he", "hers"], answer: 0, explain: "his 形容词性与名词性同形。" },
    { id: "O6-3", level: 6, stem: "You ___ finish your homework first.（必须）", options: ["must", "may", "can", "need"], answer: 0, explain: "must 表示必须。" },
    { id: "O6-4", level: 6, stem: "___ I use your phone?（委婉许可）", options: ["May", "Must", "Have to", "Can't"], answer: 0, explain: "May I ...? 委婉请求许可。" },
    { id: "O6-5", level: 6, stem: "We ___ hurry. The train is leaving in five minutes.（客观）", options: ["have to", "must", "may", "can"], answer: 0, explain: "强调客观需要，用 have to；教材例句。" },
    { id: "O6-6", level: 6, stem: "The pen isn't ___. It's ___ .（我的；她的）", options: ["mine; hers", "my; her", "mine; her", "my; hers"], answer: 0, explain: "两空都独立使用，用名词性物主代词。" },
    { id: "O6-7", level: 6, stem: "He ___ speak three languages.", options: ["can", "may", "must", "has to"], answer: 0, explain: "can 表示能力。" },
    { id: "O6-8", level: 6, stem: "You ___ be late for class.", options: ["mustn't", "don't have to", "needn't", "may not"], answer: 0, explain: "mustn't 表示不准；禁止。" }
  ]
};
})();
