import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/bolgeselSanayi.ts — İngilizce çevirileri. */
export const OLAYLAR_BOLGESEL_SANAYI_EN: Record<string, OlayCeviri> = {
  // İNGİLTERE
  bolge_ingiltere_01: {
    baslik: "The Factory Investment",
    metin: "A chance to partner in a new textile factory; steam engines are multiplying output.",
    secenekler: [
      {
        metin: "Join with a small share.",
        basariliSonuc: { mesaj: "The factory profited, your share grew." },
        basarisizSonuc: { mesaj: "The factory missed its targets, your investment lost money." },
      },
      {
        metin: "Invest big, take a majority stake.",
        basariliSonuc: { mesaj: "Your bold investment made you rich." },
        basarisizSonuc: { mesaj: "The factory went bankrupt, you lost most of your capital." },
      },
    ],
  },
  bolge_ingiltere_02: {
    baslik: "The Union Meeting",
    metin: "Workers are discussing forming a union for better conditions; they want your support.",
    secenekler: [
      {
        metin: "Support the union.",
        basariliSonuc: { mesaj: "Your support earned the workers' respect." },
        basarisizSonuc: { mesaj: "The bosses noticed you and fined you." },
      },
      {
        metin: "Stay away, mind your work.",
        basariliSonuc: { mesaj: "You carried on without trouble." },
        basarisizSonuc: { mesaj: "The workers accused you of indifference." },
      },
    ],
  },
  bolge_ingiltere_03: {
    baslik: "Coal Smoke",
    metin: "Soot and smoke from the chimneys blanket the city; breathing has become hard.",
    secenekler: [
      {
        metin: "Cover your face with a cloth.",
        basariliSonuc: { mesaj: "Your precaution worked, you feel fine." },
        basarisizSonuc: { mesaj: "Despite it, a cough wore you down." },
      },
      {
        metin: "Ignore it, go about your day.",
        basariliSonuc: { mesaj: "You're used to it, your day went on." },
        basarisizSonuc: { mesaj: "The smoke seriously damaged your lungs." },
      },
    ],
  },
  bolge_ingiltere_04: {
    baslik: "The London Stock Exchange",
    metin: "Railway shares are soaring on the exchange; everyone wants in on the frenzy.",
    secenekler: [
      {
        metin: "Play cautiously, small amount.",
        basariliSonuc: { mesaj: "You got out in time with a profit." },
        basarisizSonuc: { mesaj: "The bubble burst, part of your money vanished." },
      },
      {
        metin: "Put in everything.",
        basariliSonuc: { mesaj: "Speculation made you rich overnight." },
        basarisizSonuc: { mesaj: "When the bubble burst, only paper was left." },
      },
    ],
  },
  bolge_ingiltere_05: {
    baslik: "Railway Construction",
    metin: "Labor and capital are sought for a new intercity railway line.",
    secenekler: [
      {
        metin: "Join as a laborer.",
        basariliSonuc: { mesaj: "You earned a steady, grueling wage." },
        basarisizSonuc: { mesaj: "A workplace accident kept you off work." },
      },
      {
        metin: "Invest as a small contractor.",
        basariliSonuc: { mesaj: "The line finished on time, you earned well." },
        basarisizSonuc: { mesaj: "The project slipped, part of your capital sank." },
      },
    ],
  },
  bolge_ingiltere_06: {
    baslik: "Colonial Goods",
    metin: "Cheap colonial cotton and sugar promise great profit, though everyone knows the conditions.",
    secenekler: [
      {
        metin: "Enter the trade, profit first.",
        basariliSonuc: { mesaj: "Big profit, but your conscience is uneasy." },
        basarisizSonuc: { mesaj: "Prices fell, the profit never came." },
      },
      {
        metin: "Work with local producers, earn less.",
        basariliSonuc: { mesaj: "You profited with a clear conscience." },
        basarisizSonuc: { mesaj: "Local supply fell short, sales dropped." },
      },
    ],
  },
  bolge_ingiltere_07: {
    baslik: "Factory Accident",
    metin: "A machine broke down at your factory; the workers are panicking.",
    secenekler: [
      {
        metin: "Rush in, stop the machine.",
        basariliSonuc: { mesaj: "Your intervention saved many, your name spread." },
        basarisizSonuc: { mesaj: "You were badly hurt near the machine." },
      },
      {
        metin: "Wait at a safe distance.",
        basariliSonuc: { mesaj: "You stayed safe, the incident was contained." },
        basarisizSonuc: { mesaj: "Even watching the accident shook you." },
      },
    ],
  },
  bolge_ingiltere_08: {
    baslik: "Reform in Parliament",
    metin: "Parliament debates expanding voting rights; petition drives fill the streets.",
    secenekler: [
      {
        metin: "Join the petition drive.",
        basariliSonuc: { mesaj: "Reformers noted your support." },
        basarisizSonuc: { mesaj: "The drive drew little interest, a letdown." },
      },
      {
        metin: "Avoid politics.",
        basariliSonuc: { mesaj: "You kept your peace, out of the dispute." },
        basarisizSonuc: { mesaj: "Some criticized your indifference." },
      },
    ],
  },
  bolge_ingiltere_09: {
    baslik: "A Scene of Poverty",
    metin: "You see hungry children and destitute people in the factory district; a charity collects aid.",
    secenekler: [
      {
        metin: "Donate what you can.",
        basariliSonuc: { mesaj: "Your help gave a few families hope." },
        basarisizSonuc: { mesaj: "Your donation felt too small, it upset you." },
      },
      {
        metin: "Ignore it, mind your business.",
        basariliSonuc: { mesaj: "You kept your budget and moved on." },
        basarisizSonuc: { mesaj: "What you saw kept troubling your conscience." },
      },
    ],
  },
  bolge_ingiltere_10: {
    baslik: "A Newspaper Story",
    metin: "A local paper wants to write about you; a reporter asks to talk.",
    secenekler: [
      {
        metin: "Give the interview, speak openly.",
        basariliSonuc: { mesaj: "The story was positive, your name spread." },
        basarisizSonuc: { mesaj: "Your words were twisted, the story hurt you." },
      },
      {
        metin: "Refuse the interview.",
        basariliSonuc: { mesaj: "You kept your privacy and felt at ease." },
        basarisizSonuc: { mesaj: "Refusing made you look like you hide something." },
      },
    ],
  },

  // FRANSA (Sanayi Devrimi)
  bolge_fransa_sd_01: {
    baslik: "The Political Club",
    metin: "A post-revolution political club invites you to its meetings; debates run hot.",
    secenekler: [
      {
        metin: "Attend, share your views.",
        basariliSonuc: { mesaj: "Your ideas were heard, your voice grew in the club." },
        basarisizSonuc: { mesaj: "The debate heated up, opponents turned cold." },
      },
      {
        metin: "Watch from afar, take no side.",
        basariliSonuc: { mesaj: "You followed events without falling out with anyone." },
        basarisizSonuc: { mesaj: "Your neutrality was seen as lack of principle." },
      },
    ],
  },
  bolge_fransa_sd_02: {
    baslik: "A Salon Invitation",
    metin: "You're invited to a famous literary salon; intellectuals and artists gather there.",
    secenekler: [
      {
        metin: "Attend, join the talk.",
        basariliSonuc: { mesaj: "Your sharp words caught the hosts' eye." },
        basarisizSonuc: { mesaj: "You stayed out of the talk, feeling alone." },
      },
      {
        metin: "Decline, stay home.",
        basariliSonuc: { mesaj: "You had a calm evening." },
        basarisizSonuc: { mesaj: "You later regretted missing it." },
      },
    ],
  },
  bolge_fransa_sd_03: {
    baslik: "A Tight Budget",
    metin: "Post-war inflation and uncertainty strain your budget; making ends meet is hard.",
    secenekler: [
      {
        metin: "Cut back, save.",
        basariliSonuc: { mesaj: "Strict saving got you through the month." },
        basarisizSonuc: { mesaj: "Despite saving, you had to borrow." },
      },
      {
        metin: "Find extra work, raise income.",
        basariliSonuc: { mesaj: "The extra work was exhausting but paid enough." },
        basarisizSonuc: { mesaj: "The extra work wore you out, income still fell short." },
      },
    ],
  },
  bolge_fransa_sd_04: {
    baslik: "Rumors of a Barricade",
    metin: "Word is that barricades will rise and an uprising will start in the workers' district.",
    secenekler: [
      {
        metin: "Stay home, stay calm.",
        basariliSonuc: { mesaj: "You stayed safe, clear of the unrest." },
        basarisizSonuc: { mesaj: "Street noise kept you uneasy all night." },
      },
      {
        metin: "Go out and watch, out of curiosity.",
        basariliSonuc: { mesaj: "You witnessed events, and your account impressed everyone." },
        basarisizSonuc: { mesaj: "Caught in the chaos, you were hurt and robbed." },
      },
    ],
  },
  bolge_fransa_sd_05: {
    baslik: "The Art Circle",
    metin: "A circle of young painters and writers asks your support for an exhibit.",
    secenekler: [
      {
        metin: "Give a little support.",
        basariliSonuc: { mesaj: "Your support made your name known among artists." },
        basarisizSonuc: { mesaj: "The sponsored exhibit drew little interest." },
      },
      {
        metin: "Show your own talent.",
        basariliSonuc: { mesaj: "Your work was admired, you became known." },
        basarisizSonuc: { mesaj: "Your work was criticized, a blow to your pride." },
      },
    ],
  },
  bolge_fransa_sd_06: {
    baslik: "Tax Reform",
    metin: "The new government plans to change the tax system; some call it fair, others oppression.",
    secenekler: [
      {
        metin: "Sign the pro-reform petition.",
        basariliSonuc: { mesaj: "Your signature helped the reform pass." },
        basarisizSonuc: { mesaj: "The petition was rejected, effort wasted." },
      },
      {
        metin: "Oppose it, defend the system.",
        basariliSonuc: { mesaj: "You kept the advantage the system gave you." },
        basarisizSonuc: { mesaj: "Your conservative stance drew criticism." },
      },
    ],
  },
  bolge_fransa_sd_07: {
    baslik: "Republicans vs. Monarchists",
    metin: "Republicans and monarchists argue fiercely at the café; they ask your opinion.",
    secenekler: [
      {
        metin: "Give a moderate, conciliatory view.",
        basariliSonuc: { mesaj: "Your balanced words won respect from both sides." },
        basarisizSonuc: { mesaj: "You pleased neither, both drifted away." },
      },
      {
        metin: "Stay silent, withdraw.",
        basariliSonuc: { mesaj: "You stayed clear of the tension." },
        basarisizSonuc: { mesaj: "Your silence was read as indifference." },
      },
    ],
  },
  bolge_fransa_sd_08: {
    baslik: "Café Debates",
    metin: "Philosophy and politics are debated at your usual café; you're asked to join.",
    secenekler: [
      {
        metin: "Join the debate.",
        basariliSonuc: { mesaj: "Your ideas landed well, a pleasant evening." },
        basarisizSonuc: { mesaj: "The debate heated up, ruining your mood." },
      },
      {
        metin: "Sip your coffee quietly, listen.",
        basariliSonuc: { mesaj: "You had a calm evening." },
        basarisizSonuc: { mesaj: "It was dull, you felt left out." },
      },
    ],
  },
  bolge_fransa_sd_09: {
    baslik: "Army Mobilization",
    metin: "The army has declared a new mobilization; men are called to register.",
    secenekler: [
      {
        metin: "Volunteer, prepare to march.",
        basariliSonuc: { mesaj: "Your patriotism was praised." },
        basarisizSonuc: { mesaj: "You were badly injured in training." },
      },
      {
        metin: "Apply for an exemption.",
        basariliSonuc: { mesaj: "You got exempted and kept your civilian life." },
        basarisizSonuc: { mesaj: "Your application failed, costing money and hope." },
      },
    ],
  },
  bolge_fransa_sd_10: {
    baslik: "Forced to Take a Loan",
    metin: "Hardship forced you to borrow from a moneylender; the terms are harsh.",
    secenekler: [
      {
        metin: "Borrow little, spend carefully.",
        basariliSonuc: { mesaj: "The loan eased your hardship, used carefully." },
        basarisizSonuc: { mesaj: "You couldn't manage the debt, interest piled up." },
      },
      {
        metin: "Borrow big, take the risk.",
        basariliSonuc: { mesaj: "The loan covered a major shortfall." },
        basarisizSonuc: { mesaj: "The debt grew heavy, the moneylender calls often." },
      },
    ],
  },

  // OSMANLI
  bolge_osmanli_01: {
    baslik: "The Tanzimat Debate",
    metin: "The newly declared reforms spark debate in the neighborhood; some back them, some oppose.",
    secenekler: [
      {
        metin: "Support the reforms.",
        basariliSonuc: { mesaj: "Your progressive stance won some appreciation." },
        basarisizSonuc: { mesaj: "You drew conservative neighbors' ire." },
      },
      {
        metin: "Defend the traditional order.",
        basariliSonuc: { mesaj: "Your loyalty to old values earned respect." },
        basarisizSonuc: { mesaj: "You were criticized as closed to change." },
      },
    ],
  },
  bolge_osmanli_02: {
    baslik: "The Guild's Struggle",
    metin: "Cheap European factory goods are squeezing the tradesmen in your guild.",
    secenekler: [
      {
        metin: "Stress quality, hold on.",
        basariliSonuc: { mesaj: "Praising handcraft kept your customers." },
        basarisizSonuc: { mesaj: "You couldn't match cheap goods, sales fell." },
      },
      {
        metin: "Cut your price, compete.",
        basariliSonuc: { mesaj: "Even at low profit, you kept going." },
        basarisizSonuc: { mesaj: "Even cheap, no buyers came, you lost money." },
      },
    ],
  },
  bolge_osmanli_03: {
    baslik: "The Mosque's Endowment",
    metin: "Donations are collected to repair the neighborhood mosque.",
    secenekler: [
      {
        metin: "Donate.",
        basariliSonuc: { mesaj: "Your gift was remembered with blessings." },
        basarisizSonuc: { mesaj: "Your gift was logged late, a bit upsetting." },
      },
      {
        metin: "Work on the repairs yourself.",
        basariliSonuc: { mesaj: "Your labor earned the congregation's prayers." },
        basarisizSonuc: { mesaj: "The heavy work exhausted you, you fell ill." },
      },
    ],
  },
  bolge_osmanli_04: {
    baslik: "Competition From European Goods",
    metin: "Cheap, plentiful European goods at the market squeeze local producers.",
    secenekler: [
      {
        metin: "Stand with local producers.",
        basariliSonuc: { mesaj: "Solidarity eased your conscience and paid a little." },
        basarisizSonuc: { mesaj: "Despite solidarity, sales kept falling." },
      },
      {
        metin: "Sell imported goods yourself.",
        basariliSonuc: { mesaj: "Imports paid well, but your conscience pangs." },
        basarisizSonuc: { mesaj: "Your imported stock went unsold, a loss." },
      },
    ],
  },
  bolge_osmanli_05: {
    baslik: "The Sharia Court",
    metin: "The kadi wants your view on a neighborhood dispute.",
    secenekler: [
      {
        metin: "Give a fair, impartial opinion.",
        basariliSonuc: { mesaj: "The kadi appreciated your fair words." },
        basarisizSonuc: { mesaj: "Your view didn't change the outcome." },
      },
      {
        metin: "Favor the side you know.",
        basariliSonuc: { mesaj: "You got a small gift for your support." },
        basarisizSonuc: { mesaj: "Your bias came out, hurting your reputation." },
      },
    ],
  },
  bolge_osmanli_06: {
    baslik: "Unrest on the Balkan Border",
    metin: "News of Balkan unrest reaches the city; some young men consider enlisting.",
    secenekler: [
      {
        metin: "Enlist in the army.",
        basariliSonuc: { mesaj: "Your patriotism was praised." },
        basarisizSonuc: { mesaj: "You were wounded in border clashes." },
      },
      {
        metin: "Stay home with your family.",
        basariliSonuc: { mesaj: "You stayed safe with your family." },
        basarisizSonuc: { mesaj: "Some neighbors accused you of indifference." },
      },
    ],
  },
  bolge_osmanli_07: {
    baslik: "The Tekke Gathering",
    metin: "A neighborhood religious circle invites you to its weekly gathering.",
    secenekler: [
      {
        metin: "Join the gathering.",
        basariliSonuc: { mesaj: "The gathering rested your soul." },
        basarisizSonuc: { mesaj: "It ran long, you gained little." },
      },
      {
        metin: "Give the circle material support.",
        basariliSonuc: { mesaj: "Your support was met with prayers." },
        basarisizSonuc: { mesaj: "Your support wasn't appreciated as hoped." },
      },
    ],
  },
  bolge_osmanli_08: {
    baslik: "The Railway Concession",
    metin: "The new railway concession goes to a foreign company; the people are discontent.",
    secenekler: [
      {
        metin: "Sign the protest petition.",
        basariliSonuc: { mesaj: "Defenders of local interests noted your signature." },
        basarisizSonuc: { mesaj: "The protests were ignored, a letdown." },
      },
      {
        metin: "Stay silent, mind your business.",
        basariliSonuc: { mesaj: "You stayed out of the debate." },
        basarisizSonuc: { mesaj: "Some criticized your indifference." },
      },
    ],
  },
  bolge_osmanli_09: {
    baslik: "Ramadan Charity",
    metin: "During Ramadan, the neighborhood plans an iftar table for poor families.",
    secenekler: [
      {
        metin: "Contribute to the table.",
        basariliSonuc: { mesaj: "Your contribution gave many families hope." },
        basarisizSonuc: { mesaj: "It was deemed too little, a bit upsetting." },
      },
      {
        metin: "Host an iftar at home yourself.",
        basariliSonuc: { mesaj: "You set a modest, sincere iftar table." },
        basarisizSonuc: { mesaj: "The expected crowd never came, a letdown." },
      },
    ],
  },
  bolge_osmanli_10: {
    baslik: "Army Reform",
    metin: "The new-order army founded after the Janissaries is debated in the city.",
    secenekler: [
      {
        metin: "Support the new army.",
        basariliSonuc: { mesaj: "Your support for modernization was appreciated." },
        basarisizSonuc: { mesaj: "You drew the ire of old-order nostalgics." },
      },
      {
        metin: "Praise the old order, doubt change.",
        basariliSonuc: { mesaj: "Your loyalty to tradition won some respect." },
        basarisizSonuc: { mesaj: "You were criticized as closed to change." },
      },
    ],
  },

  // RUSYA
  bolge_rusya_01: {
    baslik: "A Harsh Winter",
    metin: "This winter is unusually harsh; your firewood and provisions are running low.",
    secenekler: [
      {
        metin: "Buy extra firewood and food.",
        basariliSonuc: { mesaj: "Being prepared, you came through healthy." },
        basarisizSonuc: { mesaj: "Despite the expense, the cold still got to you." },
      },
      {
        metin: "Ration carefully, risk it.",
        basariliSonuc: { mesaj: "Your frugality paid off, you saved money." },
        basarisizSonuc: { mesaj: "The bitter cold made you seriously ill." },
      },
    ],
  },
  bolge_rusya_02: {
    baslik: "Army Maneuvers",
    metin: "A big exercise is held at the nearby garrison; volunteers may join.",
    secenekler: [
      {
        metin: "Join the maneuvers.",
        basariliSonuc: { mesaj: "Your discipline caught the officers' eye." },
        basarisizSonuc: { mesaj: "The grueling drill wore you out and injured you." },
      },
      {
        metin: "Stay a spectator.",
        basariliSonuc: { mesaj: "You enjoyed watching the soldiers' discipline." },
        basarisizSonuc: { mesaj: "Waiting long in the cold wore you out." },
      },
    ],
  },
  bolge_rusya_03: {
    baslik: "A Western Diplomat's Condescension",
    metin: "A visiting Western diplomat belittled Russian customs.",
    secenekler: [
      {
        metin: "Defend your honor, answer back.",
        basariliSonuc: { mesaj: "Your stance won others' respect." },
        basarisizSonuc: { mesaj: "The argument grew, souring the mood." },
      },
      {
        metin: "Ignore it, be patient.",
        basariliSonuc: { mesaj: "You kept calm and didn't escalate." },
        basarisizSonuc: { mesaj: "Some mistook your silence for weakness." },
      },
    ],
  },
  bolge_rusya_04: {
    baslik: "The Abolition of Serfdom",
    metin: "News that serfdom will end sparks a big village debate; everyone has an opinion.",
    secenekler: [
      {
        metin: "Support the reform.",
        basariliSonuc: { mesaj: "Your humane stance won some appreciation." },
        basarisizSonuc: { mesaj: "You drew landowning neighbors' ire." },
      },
      {
        metin: "Call for keeping the old order.",
        basariliSonuc: { mesaj: "You kept the advantage the system gave you." },
        basarisizSonuc: { mesaj: "Your stance seemed heartless, hurting your name." },
      },
    ],
  },
  bolge_rusya_05: {
    baslik: "The Threat of Exile",
    metin: "Authorities say a relative joined 'suspicious' activities; you're questioned too.",
    secenekler: [
      {
        metin: "Cooperate, tell everything.",
        basariliSonuc: { mesaj: "Cooperating kept you safe but troubled you." },
        basarisizSonuc: { mesaj: "Your account didn't help, your name suffered." },
      },
      {
        metin: "Stay silent, say nothing.",
        basariliSonuc: { mesaj: "Your loyalty and silence earned respect." },
        basarisizSonuc: { mesaj: "Your silence raised suspicion, a heavy fine followed." },
      },
    ],
  },
  bolge_rusya_06: {
    baslik: "Cossack Cavalry Training",
    metin: "A chance to join and train with a Cossack cavalry unit.",
    secenekler: [
      {
        metin: "Join the training.",
        basariliSonuc: { mesaj: "You finished the harsh training and earned praise." },
        basarisizSonuc: { mesaj: "You fell from your horse in training and got hurt." },
      },
      {
        metin: "Turn down the offer.",
        basariliSonuc: { mesaj: "You went on with life undisturbed." },
        basarisizSonuc: { mesaj: "Some read your refusal as cowardice." },
      },
    ],
  },
  bolge_rusya_07: {
    baslik: "Retreat at the Monastery",
    metin: "You're invited to a short retreat at an Orthodox monastery.",
    secenekler: [
      {
        metin: "Join the retreat.",
        basariliSonuc: { mesaj: "Silence and prayer rested body and soul." },
        basarisizSonuc: { mesaj: "The strict rules weighed on you, no peace came." },
      },
      {
        metin: "Decline, carry on.",
        basariliSonuc: { mesaj: "You went on with your usual life." },
        basarisizSonuc: { mesaj: "You later regretted missing it." },
      },
    ],
  },
  bolge_rusya_08: {
    baslik: "Russia in the Western Press",
    metin: "A Western paper portrayed Russia as backward; a visiting foreigner wants to discuss it.",
    secenekler: [
      {
        metin: "Defend your country, state facts.",
        basariliSonuc: { mesaj: "Your words changed the foreigner's view." },
        basarisizSonuc: { mesaj: "The debate turned tense, you failed to persuade." },
      },
      {
        metin: "Let it go, don't engage.",
        basariliSonuc: { mesaj: "You avoided a pointless argument." },
        basarisizSonuc: { mesaj: "Your silence reinforced their prejudice." },
      },
    ],
  },
  bolge_rusya_09: {
    baslik: "After the Crimean War",
    metin: "After the Crimean War's devastation, the region rebuilds; labor and capital are sought.",
    secenekler: [
      {
        metin: "Give labor to the rebuilding.",
        basariliSonuc: { mesaj: "Your work became part of the rebirth." },
        basarisizSonuc: { mesaj: "The heavy labor wore you down." },
      },
      {
        metin: "Put capital into the rebuilding.",
        basariliSonuc: { mesaj: "Your investment grew as the region recovered." },
        basarisizSonuc: { mesaj: "Progress was slow, part of your capital sank." },
      },
    ],
  },
  bolge_rusya_10: {
    baslik: "Trade on the Volga",
    metin: "You consider a small trading venture on the Volga; powerful merchants compete.",
    secenekler: [
      {
        metin: "Start cautiously, small.",
        basariliSonuc: { mesaj: "You earned a small, steady profit." },
        basarisizSonuc: { mesaj: "Powerful rivals pushed you out of the market." },
      },
      {
        metin: "Start big and bold.",
        basariliSonuc: { mesaj: "Your bold venture paid off big." },
        basarisizSonuc: { mesaj: "You couldn't withstand the competition, a big loss." },
      },
    ],
  },
};
