import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/bolgeselSanayi.ts — İngilizce çevirileri. */
export const OLAYLAR_BOLGESEL_SANAYI_EN: Record<string, OlayCeviri> = {
  // İNGİLTERE
  bolge_ingiltere_01: {
    baslik: "The Factory Investment",
    metin: "A chance has come up to become a partner in a new textile factory; steam engines are multiplying output.",
    secenekler: [
      {
        metin: "Join with a small share.",
        basariliSonuc: { mesaj: "The factory turned a profit, your share grew in value." },
        basarisizSonuc: { mesaj: "The factory couldn't hit its production targets, your investment lost money." },
      },
      {
        metin: "Put in large capital, take a majority stake.",
        basariliSonuc: { mesaj: "Your bold investment made you rich." },
        basarisizSonuc: { mesaj: "The factory went bankrupt, you lost most of your capital." },
      },
    ],
  },
  bolge_ingiltere_02: {
    baslik: "The Union Meeting",
    metin: "Workers are discussing forming a union for better conditions; they're asking for your support too.",
    secenekler: [
      {
        metin: "Support the union.",
        basariliSonuc: { mesaj: "Your support earned you respect among the workers." },
        basarisizSonuc: { mesaj: "The bosses noticed you, you were hit with a small fine." },
      },
      {
        metin: "Stay away, focus on your work.",
        basariliSonuc: { mesaj: "You carried on with your work without any trouble." },
        basarisizSonuc: { mesaj: "The workers accused you of staying indifferent." },
      },
    ],
  },
  bolge_ingiltere_03: {
    baslik: "Coal Smoke",
    metin: "Soot and smoke from the factory chimneys have blanketed the city; even breathing has become hard.",
    secenekler: [
      {
        metin: "Tie a cloth over your face, be careful.",
        basariliSonuc: { mesaj: "Your simple precaution worked, you're feeling relatively fine." },
        basarisizSonuc: { mesaj: "Despite your precaution, a cough bothered you for a while." },
      },
      {
        metin: "Ignore it, go about your day.",
        basariliSonuc: { mesaj: "You're used to it, your day went on unbothered." },
        basarisizSonuc: { mesaj: "Your lungs took serious damage from the smoke." },
      },
    ],
  },
  bolge_ingiltere_04: {
    baslik: "The London Stock Exchange",
    metin: "Railway company shares are soaring on the exchange; everyone wants in on the frenzy.",
    secenekler: [
      {
        metin: "Play cautiously with a small amount.",
        basariliSonuc: { mesaj: "You got out at the right time, made a nice profit." },
        basarisizSonuc: { mesaj: "The bubble burst, part of your investment evaporated." },
      },
      {
        metin: "Put in everything you have.",
        basariliSonuc: { mesaj: "The speculation made you rich overnight." },
        basarisizSonuc: { mesaj: "When the bubble burst, you were left with nothing but paper." },
      },
    ],
  },
  bolge_ingiltere_05: {
    baslik: "Railway Construction",
    metin: "Labor and capital are being sought for a new intercity railway line.",
    secenekler: [
      {
        metin: "Join as a laborer.",
        basariliSonuc: { mesaj: "You earned a steady if grueling wage." },
        basarisizSonuc: { mesaj: "You had a workplace accident and couldn't work for a while." },
      },
      {
        metin: "Put in capital as a small contractor.",
        basariliSonuc: { mesaj: "The line was completed on time, you got well more than your share." },
        basarisizSonuc: { mesaj: "The project fell behind, part of your capital sank." },
      },
    ],
  },
  bolge_ingiltere_06: {
    baslik: "Colonial Goods",
    metin: "Trade in cheap cotton and sugar from the colonies promises great profit — but not everyone is unaware of the conditions.",
    secenekler: [
      {
        metin: "Get into the trade, put profit first.",
        basariliSonuc: { mesaj: "Colonial goods brought a big profit, though your conscience isn't at ease." },
        basarisizSonuc: { mesaj: "Prices dropped, you couldn't find the profit you expected." },
      },
      {
        metin: "Work with local producers, earn less.",
        basariliSonuc: { mesaj: "You earned a profit with a clear conscience." },
        basarisizSonuc: { mesaj: "Local supply fell short, your sales dropped." },
      },
    ],
  },
  bolge_ingiltere_07: {
    baslik: "Factory Accident",
    metin: "A machine broke down at the factory where you work; the workers are panicking.",
    secenekler: [
      {
        metin: "Rush to help, stop the machine.",
        basariliSonuc: { mesaj: "Your brave intervention saved many workers, your name got around." },
        basarisizSonuc: { mesaj: "You were seriously injured getting near the machine." },
      },
      {
        metin: "Wait at a safe distance.",
        basariliSonuc: { mesaj: "You stayed safe, the incident was brought under control." },
        basarisizSonuc: { mesaj: "Even watching the accident shook you deeply." },
      },
    ],
  },
  bolge_ingiltere_08: {
    baslik: "Reform in Parliament",
    metin: "Expanding voting rights is being debated in Parliament; petition campaigns are being organized in the streets.",
    secenekler: [
      {
        metin: "Join the petition campaign.",
        basariliSonuc: { mesaj: "Your support was noted among the reform advocates." },
        basarisizSonuc: { mesaj: "The campaign didn't get the attention hoped for, quite disappointing." },
      },
      {
        metin: "Stay away, avoid politics.",
        basariliSonuc: { mesaj: "You stayed out of the contentious matter and kept your peace." },
        basarisizSonuc: { mesaj: "Some criticized your indifference." },
      },
    ],
  },
  bolge_ingiltere_09: {
    baslik: "A Scene of Poverty",
    metin: "You see hungry children and the destitute in the factory district; a charity is collecting aid.",
    secenekler: [
      {
        metin: "Donate what you can.",
        basariliSonuc: { mesaj: "Your help gave a few families some hope." },
        basarisizSonuc: { mesaj: "You felt your donation wasn't enough, and it upset you." },
      },
      {
        metin: "Ignore it, mind your own business.",
        basariliSonuc: { mesaj: "You went on your way, keeping your own budget intact." },
        basarisizSonuc: { mesaj: "What you saw kept troubling your conscience." },
      },
    ],
  },
  bolge_ingiltere_10: {
    baslik: "A Newspaper Story",
    metin: "A local newspaper is thinking of writing a story about you; a reporter wants to talk to you.",
    secenekler: [
      {
        metin: "Give the interview, speak openly.",
        basariliSonuc: { mesaj: "The story came out positive, your name became talk of the town." },
        basarisizSonuc: { mesaj: "Your words were twisted, the story made you look bad." },
      },
      {
        metin: "Refuse the interview.",
        basariliSonuc: { mesaj: "You protected your privacy and felt at ease." },
        basarisizSonuc: { mesaj: "Your refusal gave the impression you had something to hide." },
      },
    ],
  },

  // FRANSA (Sanayi Devrimi)
  bolge_fransa_sd_01: {
    baslik: "The Political Club",
    metin: "A political club founded after the revolution has invited you to its meetings; ideas are debated fiercely.",
    secenekler: [
      {
        metin: "Attend the meetings, share your views.",
        basariliSonuc: { mesaj: "Your ideas were heard, you started to gain a voice in the club." },
        basarisizSonuc: { mesaj: "The debate heated up, tension grew with those who disagreed." },
      },
      {
        metin: "Watch from a distance, take no side.",
        basariliSonuc: { mesaj: "You followed developments without falling out with anyone." },
        basarisizSonuc: { mesaj: "Some saw your neutrality as a lack of principle." },
      },
    ],
  },
  bolge_fransa_sd_02: {
    baslik: "A Salon Invitation",
    metin: "You've been invited to a famous literary salon in the city; intellectuals and artists gather there.",
    secenekler: [
      {
        metin: "Attend, join the conversation.",
        basariliSonuc: { mesaj: "Your sharp words caught the hosts' attention." },
        basarisizSonuc: { mesaj: "You stayed out of the conversation, feeling a bit alone." },
      },
      {
        metin: "Turn down the invitation, stay home.",
        basariliSonuc: { mesaj: "You had a calm evening." },
        basarisizSonuc: { mesaj: "You later regretted missing the invitation." },
      },
    ],
  },
  bolge_fransa_sd_03: {
    baslik: "A Tight Budget",
    metin: "Post-war inflation and economic uncertainty are straining your budget; making it to the end of the month is hard.",
    secenekler: [
      {
        metin: "Cut back, save.",
        basariliSonuc: { mesaj: "Strict saving got you through the month." },
        basarisizSonuc: { mesaj: "Despite your saving, you had to go into debt." },
      },
      {
        metin: "Find extra work, boost your income.",
        basariliSonuc: { mesaj: "The extra work was exhausting but brought the needed income." },
        basarisizSonuc: { mesaj: "The extra work wore you out, without boosting your income enough." },
      },
    ],
  },
  bolge_fransa_sd_04: {
    baslik: "Rumors of a Barricade",
    metin: "There's talk that barricades will go up and an uprising will start in the workers' district.",
    secenekler: [
      {
        metin: "Don't leave home, stay calm.",
        basariliSonuc: { mesaj: "You stayed safe by not getting mixed up in the unrest." },
        basarisizSonuc: { mesaj: "Noise from the streets kept you up all night, uneasy." },
      },
      {
        metin: "Curiosity gets the better of you, go out and watch.",
        basariliSonuc: { mesaj: "You witnessed the events, everyone was captivated by your account." },
        basarisizSonuc: { mesaj: "Caught in the chaos, you were both hurt and robbed of your belongings." },
      },
    ],
  },
  bolge_fransa_sd_05: {
    baslik: "The Art Circle",
    metin: "A circle of young painters and writers asks for your support to exhibit their work.",
    secenekler: [
      {
        metin: "Give a small amount of support.",
        basariliSonuc: { mesaj: "Your support made your name known among the artists." },
        basarisizSonuc: { mesaj: "The sponsored exhibit drew little interest." },
      },
      {
        metin: "Try to showcase your own talent.",
        basariliSonuc: { mesaj: "Your work was admired, you became known in the circle." },
        basarisizSonuc: { mesaj: "Your work was criticized, a small blow to your pride." },
      },
    ],
  },
  bolge_fransa_sd_06: {
    baslik: "Tax Reform",
    metin: "The new government plans to change the tax system; some see it as fair, others as oppression.",
    secenekler: [
      {
        metin: "Sign a petition supporting the reform.",
        basariliSonuc: { mesaj: "Your signature made a small contribution toward passing the reform." },
        basarisizSonuc: { mesaj: "The petition was rejected, your effort wasted." },
      },
      {
        metin: "Oppose it, defend the current system.",
        basariliSonuc: { mesaj: "You kept the advantage the current system gave you." },
        basarisizSonuc: { mesaj: "Your conservative stance drew criticism in some circles." },
      },
    ],
  },
  bolge_fransa_sd_07: {
    baslik: "Republicans vs. Monarchists",
    metin: "A heated argument has broken out between republicans and monarchists at the café; your opinion is asked.",
    secenekler: [
      {
        metin: "Give a moderate, conciliatory view.",
        basariliSonuc: { mesaj: "Your balanced words earned respect from both sides." },
        basarisizSonuc: { mesaj: "You satisfied neither, both moved away from you." },
      },
      {
        metin: "Stay silent, withdraw from the debate.",
        basariliSonuc: { mesaj: "You stayed clear of the tension." },
        basarisizSonuc: { mesaj: "Your silence was read as indifference." },
      },
    ],
  },
  bolge_fransa_sd_08: {
    baslik: "Café Debates",
    metin: "Long debates about philosophy and politics are going on at your favorite café; you're asked to join the table.",
    secenekler: [
      {
        metin: "Join the debate.",
        basariliSonuc: { mesaj: "Your ideas were well received, you had a pleasant evening." },
        basarisizSonuc: { mesaj: "The debate heated up, ruining your mood." },
      },
      {
        metin: "Drink your coffee quietly, listen.",
        basariliSonuc: { mesaj: "You had a calm evening." },
        basarisizSonuc: { mesaj: "It was a bit dull, you felt left out." },
      },
    ],
  },
  bolge_fransa_sd_09: {
    baslik: "Army Mobilization",
    metin: "The army has declared a new mobilization; men are being called to register.",
    secenekler: [
      {
        metin: "Volunteer, prepare for the campaign.",
        basariliSonuc: { mesaj: "Your patriotism was met with praise." },
        basarisizSonuc: { mesaj: "You were badly injured during training." },
      },
      {
        metin: "Apply for an exemption.",
        basariliSonuc: { mesaj: "You got the exemption, continuing your civilian life." },
        basarisizSonuc: { mesaj: "Your application was rejected, costing you both money and hope." },
      },
    ],
  },
  bolge_fransa_sd_10: {
    baslik: "Forced to Take a Loan",
    metin: "Economic hardship has forced you to borrow from a moneylender; the terms are harsh.",
    secenekler: [
      {
        metin: "Take a small amount, spend it carefully.",
        basariliSonuc: { mesaj: "The loan eased your temporary hardship, you used it carefully." },
        basarisizSonuc: { mesaj: "You couldn't manage the debt, interest began piling up." },
      },
      {
        metin: "Take a large amount, take the risk.",
        basariliSonuc: { mesaj: "The loan you took covered an important shortfall." },
        basarisizSonuc: { mesaj: "The debt burden grew heavier, the moneylender now knocks often." },
      },
    ],
  },

  // OSMANLI
  bolge_osmanli_01: {
    baslik: "The Tanzimat Debate",
    metin: "There's debate in the neighborhood over the newly declared reforms; some support them, some oppose.",
    secenekler: [
      {
        metin: "Support the reforms.",
        basariliSonuc: { mesaj: "Your progressive stance was appreciated in some circles." },
        basarisizSonuc: { mesaj: "You drew the ire of conservative neighbors." },
      },
      {
        metin: "Defend the traditional order.",
        basariliSonuc: { mesaj: "Your loyalty to time-honored values earned respect." },
        basarisizSonuc: { mesaj: "You were criticized for being closed to change." },
      },
    ],
  },
  bolge_osmanli_02: {
    baslik: "The Guild's Struggle",
    metin: "Cheap factory goods coming from Europe are making things hard for the tradesmen in your guild.",
    secenekler: [
      {
        metin: "Emphasize your quality, try to hold on.",
        basariliSonuc: { mesaj: "By explaining the value of handcraft, you avoided losing customers." },
        basarisizSonuc: { mesaj: "You couldn't compete with cheap goods, your sales dropped." },
      },
      {
        metin: "Lower your price, enter the competition.",
        basariliSonuc: { mesaj: "Even at low profit, you kept your business going." },
        basarisizSonuc: { mesaj: "Even at a low price, you found no buyers, and took a loss." },
      },
    ],
  },
  bolge_osmanli_03: {
    baslik: "The Mosque's Endowment",
    metin: "Donations are being collected to repair the neighborhood mosque.",
    secenekler: [
      {
        metin: "Make a donation.",
        basariliSonuc: { mesaj: "Your donation was remembered with blessings." },
        basarisizSonuc: { mesaj: "Your donation was recorded late, a bit upsetting." },
      },
      {
        metin: "Work on the repairs yourself.",
        basariliSonuc: { mesaj: "You contributed with your own sweat, the congregation remembered you in their prayers." },
        basarisizSonuc: { mesaj: "The heavy work exhausted you and you fell ill." },
      },
    ],
  },
  bolge_osmanli_04: {
    baslik: "Competition From European Goods",
    metin: "Cheap, plentiful goods from Europe at the market are squeezing local producers.",
    secenekler: [
      {
        metin: "Show solidarity with local producers.",
        basariliSonuc: { mesaj: "Your solidarity eased your conscience and brought a small profit too." },
        basarisizSonuc: { mesaj: "Despite your solidarity, sales kept dropping." },
      },
      {
        metin: "Start selling imported goods yourself.",
        basariliSonuc: { mesaj: "You earned well from imported goods but felt a pang of conscience." },
        basarisizSonuc: { mesaj: "Your imported stock was left unsold, you took a loss." },
      },
    ],
  },
  bolge_osmanli_05: {
    baslik: "The Sharia Court",
    metin: "The kadi wants your view too on a dispute that arose in the neighborhood.",
    secenekler: [
      {
        metin: "Give a fair, impartial opinion.",
        basariliSonuc: { mesaj: "Your fair words were appreciated by the kadi." },
        basarisizSonuc: { mesaj: "Your view didn't affect the case's outcome, time wasted." },
      },
      {
        metin: "Favor the side you know.",
        basariliSonuc: { mesaj: "In return for your support, you received a small gift." },
        basarisizSonuc: { mesaj: "Your bias was exposed, damaging your reputation." },
      },
    ],
  },
  bolge_osmanli_06: {
    baslik: "Unrest on the Balkan Border",
    metin: "News of unrest in the Balkans has reached the city; some young men are considering enlisting.",
    secenekler: [
      {
        metin: "Enlist to support the army.",
        basariliSonuc: { mesaj: "Your patriotism was met with praise." },
        basarisizSonuc: { mesaj: "You were wounded in the border clashes." },
      },
      {
        metin: "Stay in your hometown with your family.",
        basariliSonuc: { mesaj: "You stayed safe with your family." },
        basarisizSonuc: { mesaj: "Some neighbors accused you of indifference." },
      },
    ],
  },
  bolge_osmanli_07: {
    baslik: "The Tekke Gathering",
    metin: "A religious circle in the neighborhood has invited you to its weekly gathering.",
    secenekler: [
      {
        metin: "Join the gathering.",
        basariliSonuc: { mesaj: "The gathering brought your soul some peace." },
        basarisizSonuc: { mesaj: "The gathering ran long, you got little out of it." },
      },
      {
        metin: "Give material support to the community.",
        basariliSonuc: { mesaj: "Your support was met with prayers." },
        basarisizSonuc: { mesaj: "Your support wasn't appreciated as you'd hoped." },
      },
    ],
  },
  bolge_osmanli_08: {
    baslik: "The Railway Concession",
    metin: "The concession for the new railway line is going to a foreign company; there's discontent among the people.",
    secenekler: [
      {
        metin: "Sign the protest petition.",
        basariliSonuc: { mesaj: "Your signature was noted among those defending local interests." },
        basarisizSonuc: { mesaj: "The protests were ignored, quite disappointing." },
      },
      {
        metin: "Stay silent, mind your business.",
        basariliSonuc: { mesaj: "You stayed out of the debate." },
        basarisizSonuc: { mesaj: "Your indifference was criticized by some." },
      },
    ],
  },
  bolge_osmanli_09: {
    baslik: "Ramadan Charity",
    metin: "There's an effort in the neighborhood to set up an iftar table for poor families during Ramadan.",
    secenekler: [
      {
        metin: "Contribute to the table.",
        basariliSonuc: { mesaj: "Your contribution gave hope to many families." },
        basarisizSonuc: { mesaj: "Your contribution wasn't seen as enough, a bit upsetting." },
      },
      {
        metin: "Host an iftar at home with your own means.",
        basariliSonuc: { mesaj: "You set a modest but sincere iftar table." },
        basarisizSonuc: { mesaj: "The crowd you expected didn't come, a bit disappointing." },
      },
    ],
  },
  bolge_osmanli_10: {
    baslik: "Army Reform",
    metin: "There's debate in the city over the new order army established after the Janissaries.",
    secenekler: [
      {
        metin: "Support the new army.",
        basariliSonuc: { mesaj: "Your support for modernization was appreciated." },
        basarisizSonuc: { mesaj: "You drew the ire of those nostalgic for the old order." },
      },
      {
        metin: "Praise the old order, view change with suspicion.",
        basariliSonuc: { mesaj: "Your loyalty to tradition earned respect in some circles." },
        basarisizSonuc: { mesaj: "You were criticized for being closed to change." },
      },
    ],
  },

  // RUSYA
  bolge_rusya_01: {
    baslik: "A Harsh Winter",
    metin: "This year's winter is unusually harsh; your stock of firewood and provisions is running low.",
    secenekler: [
      {
        metin: "Buy extra firewood and provisions.",
        basariliSonuc: { mesaj: "Being prepared got you through the winter in good health." },
        basarisizSonuc: { mesaj: "Despite the expense, the cold still got to you a little." },
      },
      {
        metin: "Ration carefully, take the risk.",
        basariliSonuc: { mesaj: "Your frugality paid off, saving you money." },
        basarisizSonuc: { mesaj: "The bitter cold made you seriously ill." },
      },
    ],
  },
  bolge_rusya_02: {
    baslik: "Army Maneuvers",
    metin: "A major exercise is being held at the nearby garrison; volunteers are welcome.",
    secenekler: [
      {
        metin: "Join the maneuvers.",
        basariliSonuc: { mesaj: "Your disciplined bearing caught the officers' attention." },
        basarisizSonuc: { mesaj: "The grueling exercise wore you out, injuring you." },
      },
      {
        metin: "Stay as a spectator.",
        basariliSonuc: { mesaj: "You enjoyed watching the soldiers' discipline." },
        basarisizSonuc: { mesaj: "Waiting long in the cold wore you out." },
      },
    ],
  },
  bolge_rusya_03: {
    baslik: "A Western Diplomat's Condescension",
    metin: "A visiting Western diplomat made remarks belittling Russian customs.",
    secenekler: [
      {
        metin: "Defend your honor, answer back.",
        basariliSonuc: { mesaj: "Your stance earned the respect of those around you." },
        basarisizSonuc: { mesaj: "The argument escalated, souring the mood." },
      },
      {
        metin: "Ignore it, be patient.",
        basariliSonuc: { mesaj: "You kept your composure and didn't let it escalate." },
        basarisizSonuc: { mesaj: "Some mistook your silence for weakness." },
      },
    ],
  },
  bolge_rusya_04: {
    baslik: "The Abolition of Serfdom",
    metin: "News that serfdom will be abolished has sparked a big debate in the village; everyone has an opinion.",
    secenekler: [
      {
        metin: "Support the reform.",
        basariliSonuc: { mesaj: "Your humane stance was appreciated in some circles." },
        basarisizSonuc: { mesaj: "You drew the ire of landowning neighbors." },
      },
      {
        metin: "Call for keeping the old order.",
        basariliSonuc: { mesaj: "You kept the advantage the current system gave you." },
        basarisizSonuc: { mesaj: "Your stance was seen as heartless, damaging your reputation." },
      },
    ],
  },
  bolge_rusya_05: {
    baslik: "The Threat of Exile",
    metin: "Authorities claim a relative of yours has been involved in 'suspicious' activities; you're being questioned too.",
    secenekler: [
      {
        metin: "Cooperate, tell them everything.",
        basariliSonuc: { mesaj: "Your cooperation kept you out of danger, but it troubled you inside." },
        basarisizSonuc: { mesaj: "What you told them didn't help, your reputation took damage." },
      },
      {
        metin: "Stay silent, say nothing.",
        basariliSonuc: { mesaj: "Your loyalty and silence were met with respect." },
        basarisizSonuc: { mesaj: "Your silence raised suspicion, and you were hit with a heavy fine." },
      },
    ],
  },
  bolge_rusya_06: {
    baslik: "Cossack Cavalry Training",
    metin: "A chance has come up to join and train with a Cossack cavalry unit.",
    secenekler: [
      {
        metin: "Join the training.",
        basariliSonuc: { mesaj: "You completed the harsh training and earned praise." },
        basarisizSonuc: { mesaj: "You fell from your horse during training and got hurt." },
      },
      {
        metin: "Turn down the offer.",
        basariliSonuc: { mesaj: "You continued your daily life without disruption." },
        basarisizSonuc: { mesaj: "Some read your refusal as cowardice." },
      },
    ],
  },
  bolge_rusya_07: {
    baslik: "Retreat at the Monastery",
    metin: "You've been invited to a short retreat at an Orthodox monastery.",
    secenekler: [
      {
        metin: "Join the retreat.",
        basariliSonuc: { mesaj: "Silence and prayer rested your body and soul." },
        basarisizSonuc: { mesaj: "The strict rules wore on you, you found little peace." },
      },
      {
        metin: "Decline, continue your daily life.",
        basariliSonuc: { mesaj: "You went on with the life you're used to." },
        basarisizSonuc: { mesaj: "You later regretted missing the opportunity." },
      },
    ],
  },
  bolge_rusya_08: {
    baslik: "Russia in the Western Press",
    metin: "A Western newspaper has published a piece portraying Russia as backward; a visiting foreigner wants to discuss it with you.",
    secenekler: [
      {
        metin: "Defend your country, explain the facts.",
        basariliSonuc: { mesaj: "Your words changed the foreigner's outlook." },
        basarisizSonuc: { mesaj: "The debate grew tense, you couldn't convince them." },
      },
      {
        metin: "Let it go, don't engage.",
        basariliSonuc: { mesaj: "You avoided a pointless argument." },
        basarisizSonuc: { mesaj: "Your silence reinforced the foreigner's prejudice." },
      },
    ],
  },
  bolge_rusya_09: {
    baslik: "After the Crimean War",
    metin: "After the devastation of the Crimean War, the region is rebuilding; both labor and capital are being sought.",
    secenekler: [
      {
        metin: "Contribute labor to the rebuilding.",
        basariliSonuc: { mesaj: "Your contribution became part of the region's rebirth." },
        basarisizSonuc: { mesaj: "The heavy labor wore you down." },
      },
      {
        metin: "Put capital into the rebuilding.",
        basariliSonuc: { mesaj: "Your investment grew in value as the region recovered." },
        basarisizSonuc: { mesaj: "The rebuilding moved slowly, part of your capital sank." },
      },
    ],
  },
  bolge_rusya_10: {
    baslik: "Trade on the Volga",
    metin: "You're considering starting a small trading venture on the banks of the Volga; competition from powerful merchants is fierce.",
    secenekler: [
      {
        metin: "Start cautiously, on a small scale.",
        basariliSonuc: { mesaj: "You earned a small but steady profit." },
        basarisizSonuc: { mesaj: "Powerful rivals pushed you out of the market." },
      },
      {
        metin: "Start big and bold.",
        basariliSonuc: { mesaj: "Your bold venture brought a big profit." },
        basarisizSonuc: { mesaj: "Unable to withstand the competition, you took a significant loss." },
      },
    ],
  },
};
