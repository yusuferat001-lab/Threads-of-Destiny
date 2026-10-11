import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/bolgeselOrtaCag.ts — İngilizce çevirileri. */
export const OLAYLAR_BOLGESEL_ORTACAG_EN: Record<string, OlayCeviri> = {
  // FRANSA
  bolge_fransa_oc_01: {
    baslik: "The Champagne Fair",
    metin: "Cloth merchants from Flanders set up stalls beside Italian traders at the Champagne fair.",
    secenekler: [
      {
        metin: "Sell your goods, haggle.",
        basariliSonuc: { mesaj: "Your goods sold well; your purse is full." },
        basarisizSonuc: { mesaj: "Rivals undercut you; the profit never came." },
      },
      {
        metin: "Invest in the guild fund.",
        basariliSonuc: { mesaj: "The venture paid off; your guild standing rose." },
        basarisizSonuc: { mesaj: "A partner misused the funds; your share is gone." },
      },
    ],
  },
  bolge_fransa_oc_02: {
    baslik: "The Knights' Tournament",
    metin: "A local lord holds a festive tournament; lance duels and horse races draw the villagers.",
    secenekler: [
      {
        metin: "Watch and enjoy.",
        basariliSonuc: { mesaj: "Caught up in the crowd, you had a great day." },
        basarisizSonuc: { mesaj: "You bet and lost a few coins." },
      },
      {
        metin: "Enter the lance duel.",
        basariliSonuc: { mesaj: "You fought surprisingly well; the tournament spoke your name." },
        basarisizSonuc: { mesaj: "You fell from your horse and lay bedridden for days." },
      },
    ],
  },
  bolge_fransa_oc_03: {
    baslik: "Rumors of Plague at the Market",
    metin: "Word is a disease is spreading in the city; market crowds and filth make things worse.",
    secenekler: [
      {
        metin: "Stay home, trust clean water.",
        basariliSonuc: { mesaj: "You took care and stayed healthy." },
        basarisizSonuc: { mesaj: "Still, a mild fever left you weak for days." },
      },
      {
        metin: "Keep working, go to market.",
        basariliSonuc: { mesaj: "You risked it, stayed healthy, and finished your business." },
        basarisizSonuc: { mesaj: "You fell ill in the crowd, losing health and money." },
      },
    ],
  },
  bolge_fransa_oc_04: {
    baslik: "Rivalry Between Guilds",
    metin: "Two big guilds clash over selling the same goods; you're pressed to pick a side.",
    secenekler: [
      {
        metin: "Stay neutral, mind your business.",
        basariliSonuc: { mesaj: "You stayed out of the fight and earned a small profit." },
        basarisizSonuc: { mesaj: "Neutrality angered both guilds; you lost customers." },
      },
      {
        metin: "Back the stronger guild.",
        basariliSonuc: { mesaj: "Your support paid off, but the other guild turned against you." },
        basarisizSonuc: { mesaj: "Your guild lost; money and standing both took a hit." },
      },
    ],
  },
  bolge_fransa_oc_05: {
    baslik: "English Raids on the Border",
    metin: "English raiders hit the Channel border villages; villagers flee to the city.",
    secenekler: [
      {
        metin: "Fund the wall repairs.",
        basariliSonuc: { mesaj: "Your gift was appreciated; the city feels safer." },
        basarisizSonuc: { mesaj: "Your money was wasted; repairs stayed half-done." },
      },
      {
        metin: "Arm yourself, join the defense.",
        basariliSonuc: { mesaj: "Your courage stood out, but you took a wound." },
        basarisizSonuc: { mesaj: "Badly wounded in the clash, you healed slowly." },
      },
    ],
  },
  bolge_fransa_oc_06: {
    baslik: "The Cathedral's Construction",
    metin: "Donations are collected for the new gothic cathedral; masons have toiled for days.",
    secenekler: [
      {
        metin: "Give a small donation.",
        basariliSonuc: { mesaj: "Your gift was recorded; the priest praised you." },
        basarisizSonuc: { mesaj: "Your gift went unnoticed; a small letdown." },
      },
      {
        metin: "Volunteer on the construction.",
        basariliSonuc: { mesaj: "Your sweat earned the congregation's respect." },
        basarisizSonuc: { mesaj: "You hurt your back hauling heavy stones." },
      },
    ],
  },
  bolge_fransa_oc_07: {
    baslik: "The Wine Harvest Festival",
    metin: "The harvest is done and the village celebrates; everyone gathers around the wine barrels.",
    secenekler: [
      {
        metin: "Join the festival, dance.",
        basariliSonuc: { mesaj: "Music and wine made the night unforgettable." },
        basarisizSonuc: { mesaj: "You overdid it; your head ached next morning." },
      },
      {
        metin: "Sell your wine at market.",
        basariliSonuc: { mesaj: "Your wine sold well; good money." },
        basarisizSonuc: { mesaj: "Wine is plentiful this year; your barrels went unsold." },
      },
    ],
  },
  bolge_fransa_oc_08: {
    baslik: "Unrest Among the Serfs",
    metin: "Neighboring serfs are near revolt over heavy taxes; the lord asks your view.",
    secenekler: [
      {
        metin: "Urge the lord to be moderate.",
        basariliSonuc: { mesaj: "Your words were heeded; taxes eased a little." },
        basarisizSonuc: { mesaj: "Your words were ignored; unrest grew." },
      },
      {
        metin: "Stay silent, stay out.",
        basariliSonuc: { mesaj: "You minded your business; no one dragged you in." },
        basarisizSonuc: { mesaj: "Your silence read as cowardice." },
      },
    ],
  },
  bolge_fransa_oc_09: {
    baslik: "The Traveling Caravan",
    metin: "A caravan from far lands reached the city; exotic spices and fabrics are on sale.",
    secenekler: [
      {
        metin: "Buy a little, resell.",
        basariliSonuc: { mesaj: "Your goods were snapped up in the city." },
        basarisizSonuc: { mesaj: "Goods found no buyers; you sold at a loss." },
      },
      {
        metin: "Buy a large lot wholesale.",
        basariliSonuc: { mesaj: "Your bold bet paid off handsomely." },
        basarisizSonuc: { mesaj: "The goods spoiled on your hands; a heavy loss." },
      },
    ],
  },
  bolge_fransa_oc_10: {
    baslik: "Filth in the City",
    metin: "Rain turned street waste and mud into a stench; disease risk is rising.",
    secenekler: [
      {
        metin: "Clean up your share.",
        basariliSonuc: { mesaj: "You cleaned up and breathed easier." },
        basarisizSonuc: { mesaj: "Despite your effort, the filth wore you down." },
      },
      {
        metin: "Ignore it, carry on.",
        basariliSonuc: { mesaj: "You're used to it and carried on." },
        basarisizSonuc: { mesaj: "You drank tainted water and got a stomach upset." },
      },
    ],
  },

  // KUTSAL ROMA
  bolge_kutsalroma_01: {
    baslik: "Master-Apprentice Dispute",
    metin: "Your master hasn't paid you fairly for years; you consider complaining to the guild.",
    secenekler: [
      {
        metin: "File a formal guild complaint.",
        basariliSonuc: { mesaj: "The guild sided with you; you got paid." },
        basarisizSonuc: { mesaj: "Complaint rejected; things worsened with your master." },
      },
      {
        metin: "Quietly switch masters.",
        basariliSonuc: { mesaj: "The new master was fair; your work improved." },
        basarisizSonuc: { mesaj: "Trouble followed you; you were jobless a while." },
      },
    ],
  },
  bolge_kutsalroma_02: {
    baslik: "Emperor or Lord?",
    metin: "The local lord and the Emperor's envoy demand the same tax in different amounts; you want to owe neither.",
    secenekler: [
      {
        metin: "Show loyalty to the local lord.",
        basariliSonuc: { mesaj: "The lord was pleased; your word counts locally." },
        basarisizSonuc: { mesaj: "The envoy punished you; you paid extra tax." },
      },
      {
        metin: "Pay each just enough.",
        basariliSonuc: { mesaj: "You settled it smoothly, angering no one." },
        basarisizSonuc: { mesaj: "Both grew suspicious anyway; the money was wasted." },
      },
    ],
  },
  bolge_kutsalroma_03: {
    baslik: "The Rhine Customs Post",
    metin: "At the river customs post, officers try to levy a heavy tax on your goods.",
    secenekler: [
      {
        metin: "Haggle.",
        basariliSonuc: { mesaj: "You talked the officer down on the tax." },
        basarisizSonuc: { mesaj: "The officer held firm; you paid in full." },
      },
      {
        metin: "Offer a bribe.",
        basariliSonuc: { mesaj: "A small bribe settled things fast." },
        basarisizSonuc: { mesaj: "The bribe was caught; money and reputation lost." },
      },
    ],
  },
  bolge_kutsalroma_04: {
    baslik: "Repairing the City Walls",
    metin: "The council asks craftsmen to help seal gaps in the walls.",
    secenekler: [
      {
        metin: "Offer your craft.",
        basariliSonuc: { mesaj: "Your handiwork caught everyone's eye." },
        basarisizSonuc: { mesaj: "You fell from the scaffold and got hurt." },
      },
      {
        metin: "Just donate money.",
        basariliSonuc: { mesaj: "Your gift was enough to finish the repairs." },
        basarisizSonuc: { mesaj: "Funds came in but work crawled, a letdown." },
      },
    ],
  },
  bolge_kutsalroma_05: {
    baslik: "The Lord's Men Clash With the Emperor's Envoy",
    metin: "In the square, the lord's men and the Emperor's envoy's guards nearly came to blows.",
    secenekler: [
      {
        metin: "Step in, calm them.",
        basariliSonuc: { mesaj: "Your courage was praised; tension eased." },
        basarisizSonuc: { mesaj: "Caught between them, you were beaten." },
      },
      {
        metin: "Stay away, go home.",
        basariliSonuc: { mesaj: "You stayed safe by staying out." },
        basarisizSonuc: { mesaj: "The city stays uneasy; your mood soured." },
      },
    ],
  },
  bolge_kutsalroma_06: {
    baslik: "The Blacksmith Master's Trial",
    metin: "The city's master smith demands a difficult piece to admit you to the guild.",
    secenekler: [
      {
        metin: "Work patiently and carefully.",
        basariliSonuc: { mesaj: "Your piece impressed; you joined the masters." },
        basarisizSonuc: { mesaj: "The piece cracked; materials wasted." },
      },
      {
        metin: "Finish fast and deliver.",
        basariliSonuc: { mesaj: "Delivered on time; accepted." },
        basarisizSonuc: { mesaj: "The rushed work showed; the masters were unimpressed." },
      },
    ],
  },
  bolge_kutsalroma_07: {
    baslik: "The Call to Crusade",
    metin: "The Church gathers volunteers and donations for the Holy Land; sermons fill the city.",
    secenekler: [
      {
        metin: "Make a small donation.",
        basariliSonuc: { mesaj: "Your gift entered the church records." },
        basarisizSonuc: { mesaj: "Your gift went barely noticed, a small letdown." },
      },
      {
        metin: "Attend the sermon, cheer it on.",
        basariliSonuc: { mesaj: "Your zeal spread; your name was mentioned." },
        basarisizSonuc: { mesaj: "The preacher ignored you; your words fell flat." },
      },
    ],
  },
  bolge_kutsalroma_08: {
    baslik: "Free City Status",
    metin: "The council debates seeking 'free city' status from the Emperor; everyone's view is asked.",
    secenekler: [
      {
        metin: "Speak at the council.",
        basariliSonuc: { mesaj: "Your words swayed the council; your name spread." },
        basarisizSonuc: { mesaj: "You were misunderstood and blamed." },
      },
      {
        metin: "Leave it to the council, watch.",
        basariliSonuc: { mesaj: "You watched without offending anyone." },
        basarisizSonuc: { mesaj: "The decision went against you, a letdown." },
      },
    ],
  },
  bolge_kutsalroma_09: {
    baslik: "Intrigues Over the Crown",
    metin: "Secret deals swirl among Imperial crown candidates; one wants your support.",
    secenekler: [
      {
        metin: "Refuse, stay neutral.",
        basariliSonuc: { mesaj: "You stayed clean, owing no one." },
        basarisizSonuc: { mesaj: "Some read your neutrality as distrust." },
      },
      {
        metin: "Back one in secret, expect a return.",
        basariliSonuc: { mesaj: "Your candidate won; the return exceeded hopes." },
        basarisizSonuc: { mesaj: "Your candidate lost; money and standing gone." },
      },
    ],
  },
  bolge_kutsalroma_10: {
    baslik: "The Craftsmen's Festival",
    metin: "All the city's guilds hold their annual festival; goods are on display.",
    secenekler: [
      {
        metin: "Show your own product.",
        basariliSonuc: { mesaj: "Your product won praise, fame and money." },
        basarisizSonuc: { mesaj: "Your product was overshadowed; no one cared." },
      },
      {
        metin: "Just watch and enjoy.",
        basariliSonuc: { mesaj: "A lovely day; you forgot your worries." },
        basarisizSonuc: { mesaj: "Your purse was stolen at the festival." },
      },
    ],
  },

  // BİZANS
  bolge_bizans_01: {
    baslik: "The Silk Market",
    metin: "Silk Road fabrics change hands in Constantinople's great market.",
    secenekler: [
      {
        metin: "Buy a little silk, resell.",
        basariliSonuc: { mesaj: "The silk sold high; a fine profit." },
        basarisizSonuc: { mesaj: "Prices fell; you had to sell at a loss." },
      },
      {
        metin: "Try supplying the palace directly.",
        basariliSonuc: { mesaj: "As palace supplier your name spread; big profit." },
        basarisizSonuc: { mesaj: "Palace clerks stalled you; part of your capital vanished." },
      },
    ],
  },
  bolge_bizans_02: {
    baslik: "Palace Intrigue",
    metin: "A palace noble asks a small favor, promising protection in return.",
    secenekler: [
      {
        metin: "Do the favor, build ties.",
        basariliSonuc: { mesaj: "You won the noble's favor; the palace knows you." },
        basarisizSonuc: { mesaj: "It went wrong; word spread you got into dirty business." },
      },
      {
        metin: "Politely refuse.",
        basariliSonuc: { mesaj: "You stayed clean, owing no one." },
        basarisizSonuc: { mesaj: "The noble felt slighted and turned on you." },
      },
    ],
  },
  bolge_bizans_03: {
    baslik: "Ceremony at Hagia Sophia",
    metin: "A crowd gathers at Hagia Sophia for a great ceremony; you consider joining.",
    secenekler: [
      {
        metin: "Attend the ceremony, pray.",
        basariliSonuc: { mesaj: "The ceremony's peace calmed you." },
        basarisizSonuc: { mesaj: "Jostled by the crowd, you lost your peace." },
      },
      {
        metin: "Stand out and draw attention.",
        basariliSonuc: { mesaj: "The priests noticed you; your name was mentioned." },
        basarisizSonuc: { mesaj: "Seen as disrespectful, you were unwelcome." },
      },
    ],
  },
  bolge_bizans_04: {
    baslik: "Illness in the Crowded City",
    metin: "Narrow streets are packed; foul air and filth spread sickness easily.",
    secenekler: [
      {
        metin: "Leave the city for clean air.",
        basariliSonuc: { mesaj: "A few days away restored your health." },
        basarisizSonuc: { mesaj: "The trip didn't rest you; back tired and broke." },
      },
      {
        metin: "Stay in the city, be careful.",
        basariliSonuc: { mesaj: "You were careful and escaped illness." },
        basarisizSonuc: { mesaj: "You caught your share of the outbreak." },
      },
    ],
  },
  bolge_bizans_05: {
    baslik: "The Secret of Greek Fire",
    metin: "You hear a rumor about the formula of Greek fire, the navy's secret weapon; some want to sell it.",
    secenekler: [
      {
        metin: "Ignore the rumor.",
        basariliSonuc: { mesaj: "You avoided the danger; your conscience is clear." },
        basarisizSonuc: { mesaj: "You got curious and earned a gossip's name." },
      },
      {
        metin: "Dig into it and try to sell.",
        basariliSonuc: { mesaj: "You sold it to the right buyer for good money." },
        basarisizSonuc: { mesaj: "Caught meddling with a state secret, you were harshly punished." },
      },
    ],
  },
  bolge_bizans_06: {
    baslik: "Byzantine Gold",
    metin: "A hyperpyra-based investment opportunity arises; a merchant offers a partnership.",
    secenekler: [
      {
        metin: "Join with a small share.",
        basariliSonuc: { mesaj: "The partnership profited; you got your share and more." },
        basarisizSonuc: { mesaj: "The partnership lost; part of your stake is gone." },
      },
      {
        metin: "Invest all your savings.",
        basariliSonuc: { mesaj: "Your bold bet brought a fortune." },
        basarisizSonuc: { mesaj: "The investment collapsed; a heavy loss." },
      },
    ],
  },
  bolge_bizans_07: {
    baslik: "Hippodrome Bets",
    metin: "Blue and Green factions race at the Hippodrome; the crowd roars.",
    secenekler: [
      {
        metin: "Watch and share the thrill.",
        basariliSonuc: { mesaj: "Swept up in the crowd, you had a great time." },
        basarisizSonuc: { mesaj: "A kick in the jostle ruined your mood." },
      },
      {
        metin: "Bet on a faction.",
        basariliSonuc: { mesaj: "Your faction won; fun and profit." },
        basarisizSonuc: { mesaj: "You lost the bet and some coin." },
      },
    ],
  },
  bolge_bizans_08: {
    baslik: "A Venetian Rival",
    metin: "Venetian merchants brought rival goods to your harbor; a price war began.",
    secenekler: [
      {
        metin: "Cut your price, keep selling.",
        basariliSonuc: { mesaj: "Even at thin profit, you moved the goods." },
        basarisizSonuc: { mesaj: "The Venetians undercut further; goods went unsold." },
      },
      {
        metin: "Sell on quality, hold your price.",
        basariliSonuc: { mesaj: "Quality-minded buyers stayed with you." },
        basarisizSonuc: { mesaj: "Customers went cheap; you couldn't sell." },
      },
    ],
  },
  bolge_bizans_09: {
    baslik: "Gossip at the Palace",
    metin: "A rumor about you spreads at the palace; some keep their distance.",
    secenekler: [
      {
        metin: "Ignore the gossip.",
        basariliSonuc: { mesaj: "The gossip faded; you kept your calm." },
        basarisizSonuc: { mesaj: "The gossip grew; your reputation suffered." },
      },
      {
        metin: "Find the source and confront it.",
        basariliSonuc: { mesaj: "You exposed the truth; your standing recovered." },
        basarisizSonuc: { mesaj: "The confrontation became a brawl; all talk of you." },
      },
    ],
  },
  bolge_bizans_10: {
    baslik: "The Threat of Siege",
    metin: "Enemy troops sighted beyond the walls; the people panic.",
    secenekler: [
      {
        metin: "Volunteer to defend the walls.",
        basariliSonuc: { mesaj: "Your courage in defense was spoken of everywhere." },
        basarisizSonuc: { mesaj: "You were badly wounded in the clash." },
      },
      {
        metin: "Take your family to safety.",
        basariliSonuc: { mesaj: "You chose safety and relaxed when danger passed." },
        basarisizSonuc: { mesaj: "You lost some belongings at the shelter." },
      },
    ],
  },

  // SELÇUKLU
  bolge_selcuklu_01: {
    baslik: "Debate at the Madrasa",
    metin: "A debate breaks out among madrasa scholars; your opinion is asked.",
    secenekler: [
      {
        metin: "Speak wisely and measured.",
        basariliSonuc: { mesaj: "The teacher appreciated your words." },
        basarisizSonuc: { mesaj: "Your view was misread; you felt embarrassed." },
      },
      {
        metin: "Listen quietly, take no side.",
        basariliSonuc: { mesaj: "You stayed out of it and kept your peace." },
        basarisizSonuc: { mesaj: "Your silence was mistaken for ignorance." },
      },
    ],
  },
  bolge_selcuklu_02: {
    baslik: "Bandits on the Caravan Road",
    metin: "Bandits ambush the caravan route; joining the caravan looks risky.",
    secenekler: [
      {
        metin: "Pay for protection, travel safe.",
        basariliSonuc: { mesaj: "Guards got you through; the trade paid." },
        basarisizSonuc: { mesaj: "Despite the fee, bandits staged a small raid." },
      },
      {
        metin: "Risk it, go unprotected.",
        basariliSonuc: { mesaj: "Luck held; you arrived without trouble." },
        basarisizSonuc: { mesaj: "Bandits raided the caravan; goods and health lost." },
      },
    ],
  },
  bolge_selcuklu_03: {
    baslik: "The Sultan's Campaign",
    metin: "The Sultan sets out on a new campaign, calling for volunteers and support.",
    secenekler: [
      {
        metin: "Give logistical support.",
        basariliSonuc: { mesaj: "The Sultan's men noted your contribution." },
        basarisizSonuc: { mesaj: "Your help was wasted, unthanked." },
      },
      {
        metin: "Join the campaign in person.",
        basariliSonuc: { mesaj: "Your service on campaign earned praise." },
        basarisizSonuc: { mesaj: "Badly wounded on campaign, you healed slowly." },
      },
    ],
  },
  bolge_selcuklu_04: {
    baslik: "Bargaining at the Caravanserai",
    metin: "At the caravanserai, a distant merchant offers far below your goods' worth.",
    secenekler: [
      {
        metin: "Insist on the real price.",
        basariliSonuc: { mesaj: "Persistence paid; you got your due." },
        basarisizSonuc: { mesaj: "The merchant walked off and dealt with another." },
      },
      {
        metin: "Accept the offer, sell fast.",
        basariliSonuc: { mesaj: "Low as it was, you cashed out quickly." },
        basarisizSonuc: { mesaj: "The merchant backed out last minute; time wasted." },
      },
    ],
  },
  bolge_selcuklu_05: {
    baslik: "The Friday Sermon",
    metin: "You're given the floor for a short talk to the congregation at Friday prayers.",
    secenekler: [
      {
        metin: "Speak sincerely and simply.",
        basariliSonuc: { mesaj: "Your words touched the congregation." },
        basarisizSonuc: { mesaj: "Nerves scattered your words; unimpressive." },
      },
      {
        metin: "Prepare a long, showy sermon.",
        basariliSonuc: { mesaj: "Your oratory made your name known." },
        basarisizSonuc: { mesaj: "Your showiness seemed insincere; you were criticized." },
      },
    ],
  },
  bolge_selcuklu_06: {
    baslik: "A Raid on the Byzantine Border",
    metin: "A frontier lord plans a small raid into Byzantine land and wants you along.",
    secenekler: [
      {
        metin: "Join the raid.",
        basariliSonuc: { mesaj: "You returned with plunder; your name was mentioned." },
        basarisizSonuc: { mesaj: "The raid failed; you came back wounded, empty-handed." },
      },
      {
        metin: "Stay home, tend your field.",
        basariliSonuc: { mesaj: "You carried on safely." },
        basarisizSonuc: { mesaj: "Some scorned you for staying out." },
      },
    ],
  },
  bolge_selcuklu_07: {
    baslik: "The Akhi Guild",
    metin: "The city's akhi guild invites you to a ceremony honoring honest trade.",
    secenekler: [
      {
        metin: "Attend and show your trade.",
        basariliSonuc: { mesaj: "Your honesty was praised; tradesmen heed your word." },
        basarisizSonuc: { mesaj: "The ceremony brought little attention." },
      },
      {
        metin: "Donate and become a member.",
        basariliSonuc: { mesaj: "Membership brought new trade contacts." },
        basarisizSonuc: { mesaj: "The donation brought nothing; wasted expense." },
      },
    ],
  },
  bolge_selcuklu_08: {
    baslik: "Duty at the Kadi's Court",
    metin: "The kadi asks you to testify in a dispute.",
    secenekler: [
      {
        metin: "Tell the truth, testify honestly.",
        basariliSonuc: { mesaj: "Your honesty was praised in court." },
        basarisizSonuc: { mesaj: "Your testimony changed nothing; time wasted." },
      },
      {
        metin: "Favor one side for gain.",
        basariliSonuc: { mesaj: "False testimony won you a small gain." },
        basarisizSonuc: { mesaj: "Your lie was exposed; money and reputation gone." },
      },
    ],
  },
  bolge_selcuklu_09: {
    baslik: "The Silk Road Caravan",
    metin: "A great caravan to distant Asia is open to you; the road is hard but profit high.",
    secenekler: [
      {
        metin: "Join the caravan.",
        basariliSonuc: { mesaj: "The hard journey paid more than expected." },
        basarisizSonuc: { mesaj: "You fell ill on the road and lost some goods." },
      },
      {
        metin: "Stay in the city, keep small trade.",
        basariliSonuc: { mesaj: "A safe, modest profit." },
        basarisizSonuc: { mesaj: "You regret missing the big chance." },
      },
    ],
  },
  bolge_selcuklu_10: {
    baslik: "A Conversation at the Tekke",
    metin: "Dervishes at a tekke outside the city invite you to talk; a wise sheikh is among them.",
    secenekler: [
      {
        metin: "Join the talk, listen.",
        basariliSonuc: { mesaj: "The sheikh's words eased your soul." },
        basarisizSonuc: { mesaj: "The talk dragged; you left understanding little." },
      },
      {
        metin: "Donate to the tekke.",
        basariliSonuc: { mesaj: "Your gift earned the dervishes' prayers." },
        basarisizSonuc: { mesaj: "They didn't appreciate your gift as hoped." },
      },
    ],
  },
};
