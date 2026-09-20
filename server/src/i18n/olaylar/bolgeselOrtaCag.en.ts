import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/bolgeselOrtaCag.ts — İngilizce çevirileri. */
export const OLAYLAR_BOLGESEL_ORTACAG_EN: Record<string, OlayCeviri> = {
  // FRANSA
  bolge_fransa_oc_01: {
    baslik: "The Champagne Fair",
    metin: "The great fair in the Champagne region has begun; cloth merchants from Flanders have set up their tables right next to Italian traders.",
    secenekler: [
      {
        metin: "Sell your own goods, haggle.",
        basariliSonuc: { mesaj: "Your goods sold for a good price, you came back from the fair with a full purse." },
        basarisizSonuc: { mesaj: "Rival merchants undercut the price, you couldn't find the profit you hoped for." },
      },
      {
        metin: "Invest in the guild's shared fund.",
        basariliSonuc: { mesaj: "The joint venture paid off more than expected, your standing in the guild rose." },
        basarisizSonuc: { mesaj: "One of the partners misused the money, you couldn't get your share back." },
      },
    ],
  },
  bolge_fransa_oc_02: {
    baslik: "The Knights' Tournament",
    metin: "A local lord is throwing a festive tournament; lance duels and horse races have drawn the villagers.",
    secenekler: [
      {
        metin: "Enjoy it as a spectator.",
        basariliSonuc: { mesaj: "Caught up in the crowd's excitement, you had a wonderful day." },
        basarisizSonuc: { mesaj: "You placed a bet and lost, a few coins left your pocket." },
      },
      {
        metin: "Enter the lance duel.",
        basariliSonuc: { mesaj: "You fought surprisingly well, your name was mentioned at the tournament." },
        basarisizSonuc: { mesaj: "You fell from your horse and took a heavy blow, bedridden for days." },
      },
    ],
  },
  bolge_fransa_oc_03: {
    baslik: "Rumors of Plague at the Market",
    metin: "There's talk of a disease spreading through the city streets; the crowd and filth at the marketplace make things harder.",
    secenekler: [
      {
        metin: "Stay home, rely on clean water.",
        basariliSonuc: { mesaj: "You were careful and stayed clear of the illness." },
        basarisizSonuc: { mesaj: "You still caught a mild fever, weak for a few days." },
      },
      {
        metin: "Keep working, go to the market.",
        basariliSonuc: { mesaj: "You took the risk but stayed healthy and got your business done." },
        basarisizSonuc: { mesaj: "You fell ill in the crowd, losing both your health and money." },
      },
    ],
  },
  bolge_fransa_oc_04: {
    baslik: "Rivalry Between Guilds",
    metin: "Two big guilds in your city are at each other's throats over the same goods; you're being pressed to pick a side.",
    secenekler: [
      {
        metin: "Stay neutral, mind your own business.",
        basariliSonuc: { mesaj: "You focused on your work and stayed out of the fight, earning a small profit." },
        basarisizSonuc: { mesaj: "Your neutrality angered both guilds, you lost a few customers." },
      },
      {
        metin: "Support the stronger guild.",
        basariliSonuc: { mesaj: "Your support paid off, though your relationship with the other guild soured." },
        basarisizSonuc: { mesaj: "The guild you backed lost, shaking both your money and standing." },
      },
    ],
  },
  bolge_fransa_oc_05: {
    baslik: "English Raids on the Border",
    metin: "English troops are raiding the border villages along the Channel; villagers are fleeing to the city.",
    secenekler: [
      {
        metin: "Contribute to repairing the city walls.",
        basariliSonuc: { mesaj: "Your contribution was appreciated, the city feels safer." },
        basarisizSonuc: { mesaj: "The money you gave went to waste, the repairs stayed half-finished." },
      },
      {
        metin: "Arm yourself, join the defense.",
        basariliSonuc: { mesaj: "Your courage stood out, though you took a wound." },
        basarisizSonuc: { mesaj: "You were badly wounded in the clash, taking a long time to heal." },
      },
    ],
  },
  bolge_fransa_oc_06: {
    baslik: "The Cathedral's Construction",
    metin: "Donations are being collected for the city's new gothic cathedral; stonemasons and architects have been working for days.",
    secenekler: [
      {
        metin: "Make a small donation.",
        basariliSonuc: { mesaj: "Your donation was recorded, the priest praised you for your charity." },
        basarisizSonuc: { mesaj: "Your donation wasn't even noticed, a bit disappointing." },
      },
      {
        metin: "Volunteer to work on the construction.",
        basariliSonuc: { mesaj: "You contributed with your own sweat, the congregation appreciated you." },
        basarisizSonuc: { mesaj: "You hurt your back carrying heavy stones." },
      },
    ],
  },
  bolge_fransa_oc_07: {
    baslik: "The Wine Harvest Festival",
    metin: "The grape harvest is over, there's a big festival in the village; everyone has gathered around the wine barrels.",
    secenekler: [
      {
        metin: "Join the festival, dance.",
        basariliSonuc: { mesaj: "You made the night unforgettable with music and wine." },
        basarisizSonuc: { mesaj: "You overdid it, and your head ached the next morning." },
      },
      {
        metin: "Take your wine to the market, sell it.",
        basariliSonuc: { mesaj: "Your wine was in high demand, you made good money." },
        basarisizSonuc: { mesaj: "Everyone has plenty of wine this year, your barrels stayed unsold." },
      },
    ],
  },
  bolge_fransa_oc_08: {
    baslik: "Unrest Among the Serfs",
    metin: "Serfs on neighboring lands are showing signs of rebellion against heavy taxes; the lord asks for your opinion.",
    secenekler: [
      {
        metin: "Persuade the lord to be more moderate.",
        basariliSonuc: { mesaj: "Your words were heard, the taxes were eased a little." },
        basarisizSonuc: { mesaj: "Your words went unheard, the unrest kept growing." },
      },
      {
        metin: "Stay silent, don't get involved.",
        basariliSonuc: { mesaj: "You minded your own business, no one dragged you into it." },
        basarisizSonuc: { mesaj: "Some saw your silence as cowardice." },
      },
    ],
  },
  bolge_fransa_oc_09: {
    baslik: "The Traveling Caravan",
    metin: "A caravan from far-off lands has stopped in the city; exotic spices and fabrics have gone on sale.",
    secenekler: [
      {
        metin: "Buy a small amount, resell it.",
        basariliSonuc: { mesaj: "The goods you bought were snapped up in the city." },
        basarisizSonuc: { mesaj: "The goods didn't sell as well as you hoped, you sold at a loss." },
      },
      {
        metin: "Buy a large amount wholesale.",
        basariliSonuc: { mesaj: "Your bold investment brought a big profit." },
        basarisizSonuc: { mesaj: "The goods spoiled and were left on your hands, a serious loss." },
      },
    ],
  },
  bolge_fransa_oc_10: {
    baslik: "Filth in the City",
    metin: "Waste and mud in the streets have turned into an unbearable stench with the rains; disease risk is rising.",
    secenekler: [
      {
        metin: "Clean up your own share.",
        basariliSonuc: { mesaj: "You cleaned your surroundings and breathed a little easier." },
        basarisizSonuc: { mesaj: "Despite your effort, the stench and filth wore you down." },
      },
      {
        metin: "Ignore it, carry on with your work.",
        basariliSonuc: { mesaj: "You're used to it by now, you carried on with your daily life." },
        basarisizSonuc: { mesaj: "You drank tainted water and got a stomach upset." },
      },
    ],
  },

  // KUTSAL ROMA
  bolge_kutsalroma_01: {
    baslik: "Master-Apprentice Dispute",
    metin: "Your master hasn't been paying you fairly for years of work; you're thinking of filing a complaint with the guild.",
    secenekler: [
      {
        metin: "File a formal complaint with the guild.",
        basariliSonuc: { mesaj: "The guild ruled in your favor, you got what you were owed." },
        basarisizSonuc: { mesaj: "Your complaint was rejected, and things got worse with your master." },
      },
      {
        metin: "Quietly move to another master.",
        basariliSonuc: { mesaj: "The new master treated you fairly, your work improved." },
        basarisizSonuc: { mesaj: "Trouble came up at the new place too, you were out of work for a while." },
      },
    ],
  },
  bolge_kutsalroma_02: {
    baslik: "Emperor or Lord?",
    metin: "The local lord and the Emperor's envoy each demand the same tax at different amounts; you don't want to owe either.",
    secenekler: [
      {
        metin: "Show loyalty to the local lord.",
        basariliSonuc: { mesaj: "The lord was pleased, your word carries weight in the region now." },
        basarisizSonuc: { mesaj: "The Emperor's envoy punished you, you paid an extra tax." },
      },
      {
        metin: "Pay just enough to satisfy both.",
        basariliSonuc: { mesaj: "You settled it sweetly without angering anyone." },
        basarisizSonuc: { mesaj: "Even though you paid, both grew suspicious of you, the money was wasted." },
      },
    ],
  },
  bolge_kutsalroma_03: {
    baslik: "The Rhine Customs Post",
    metin: "At the customs post on the river, officers are trying to levy a heavy tax on your goods.",
    secenekler: [
      {
        metin: "Haggle.",
        basariliSonuc: { mesaj: "You persuaded the officer and got the tax lowered." },
        basarisizSonuc: { mesaj: "The officer stood firm, you had to pay the full tax." },
      },
      {
        metin: "Offer a bribe.",
        basariliSonuc: { mesaj: "A small bribe got your business handled quickly." },
        basarisizSonuc: { mesaj: "The bribe was noticed, you lost both money and reputation." },
      },
    ],
  },
  bolge_kutsalroma_04: {
    baslik: "Repairing the City Walls",
    metin: "The city council is asking craftsmen for help sealing gaps in the walls.",
    secenekler: [
      {
        metin: "Offer your craftsmanship.",
        basariliSonuc: { mesaj: "The repair work you did with your own hands caught everyone's attention." },
        basarisizSonuc: { mesaj: "You fell from the scaffolding and got hurt." },
      },
      {
        metin: "Just donate money.",
        basariliSonuc: { mesaj: "Your donation was enough to complete the repairs." },
        basarisizSonuc: { mesaj: "Money was raised, but the work still moved slowly, a bit disappointing." },
      },
    ],
  },
  bolge_kutsalroma_05: {
    baslik: "The Lord's Men Clash With the Emperor's Envoy",
    metin: "In the square, the lord's men and the Emperor's envoy's guards nearly came to blows; everyone is retreating to their corners.",
    secenekler: [
      {
        metin: "Step in, try to calm things down.",
        basariliSonuc: { mesaj: "Your courage was appreciated, the tension eased." },
        basarisizSonuc: { mesaj: "Caught in the middle, you got beaten in the scuffle." },
      },
      {
        metin: "Stay away, retreat home.",
        basariliSonuc: { mesaj: "You kept yourself safe by not getting involved." },
        basarisizSonuc: { mesaj: "As the incident wound down, the city feels uneasy, your mood soured." },
      },
    ],
  },
  bolge_kutsalroma_06: {
    baslik: "The Blacksmith Master's Trial",
    metin: "The city's blacksmith master demands a difficult piece from you as a test for guild admission.",
    secenekler: [
      {
        metin: "Work patiently and carefully.",
        basariliSonuc: { mesaj: "Your piece was admired, you were accepted among the masters." },
        basarisizSonuc: { mesaj: "The piece cracked, your material costs went to waste." },
      },
      {
        metin: "Finish it quickly and deliver.",
        basariliSonuc: { mesaj: "You delivered on time, it was accepted." },
        basarisizSonuc: { mesaj: "The rushed work stood out badly; the masters weren't impressed." },
      },
    ],
  },
  bolge_kutsalroma_07: {
    baslik: "The Call to Crusade",
    metin: "The Church is gathering volunteers and donations for the Holy Land; sermons are being given across the city.",
    secenekler: [
      {
        metin: "Make a small donation.",
        basariliSonuc: { mesaj: "Your donation was entered in the church's records." },
        basarisizSonuc: { mesaj: "Your donation wasn't recognized enough, a bit disappointing." },
      },
      {
        metin: "Attend the sermon and show enthusiastic support.",
        basariliSonuc: { mesaj: "Your enthusiasm spread to those around you, your name was mentioned." },
        basarisizSonuc: { mesaj: "The preacher barely listened to you, your words fell flat." },
      },
    ],
  },
  bolge_kutsalroma_08: {
    baslik: "Free City Status",
    metin: "The city council is debating whether to seek 'free city' status from the Emperor; everyone's opinion is being asked.",
    secenekler: [
      {
        metin: "Speak up at the council meeting.",
        basariliSonuc: { mesaj: "Your words swayed the council, your name got around." },
        basarisizSonuc: { mesaj: "Your words were misunderstood, some blamed you for it." },
      },
      {
        metin: "Leave the decision to the council, watch.",
        basariliSonuc: { mesaj: "You followed the process without offending anyone." },
        basarisizSonuc: { mesaj: "The decision went against what you wanted, quite disappointing." },
      },
    ],
  },
  bolge_kutsalroma_09: {
    baslik: "Intrigues Over the Crown",
    metin: "Secret deals are circulating among candidates for the Imperial crown; word is one of them wants your support.",
    secenekler: [
      {
        metin: "Refuse, stay neutral.",
        basariliSonuc: { mesaj: "You stayed clean, owing no one anything." },
        basarisizSonuc: { mesaj: "Some saw your neutrality as a lack of trust." },
      },
      {
        metin: "Secretly lend support, expect a favor in return.",
        basariliSonuc: { mesaj: "The candidate you backed won, you got far more in return than expected." },
        basarisizSonuc: { mesaj: "The candidate you backed lost, costing you both money and reputation." },
      },
    ],
  },
  bolge_kutsalroma_10: {
    baslik: "The Craftsmen's Festival",
    metin: "All the guilds in the city have gathered for an annual festival; goods are being showcased.",
    secenekler: [
      {
        metin: "Showcase your own product.",
        basariliSonuc: { mesaj: "Your product was well received, earning you both recognition and money." },
        basarisizSonuc: { mesaj: "Your product got overshadowed, hardly anyone paid attention." },
      },
      {
        metin: "Just watch the festival, enjoy it.",
        basariliSonuc: { mesaj: "You had a great day, setting your worries aside." },
        basarisizSonuc: { mesaj: "Your purse was picked at the festival." },
      },
    ],
  },

  // BİZANS
  bolge_bizans_01: {
    baslik: "The Silk Market",
    metin: "In Constantinople's great market, fabrics from the Silk Road are changing hands.",
    secenekler: [
      {
        metin: "Buy a small amount of silk, sell it.",
        basariliSonuc: { mesaj: "The silk sold at a high price, you made a nice profit." },
        basarisizSonuc: { mesaj: "Market prices dropped, you had to sell at a loss." },
      },
      {
        metin: "Try to supply goods directly to the palace.",
        basariliSonuc: { mesaj: "Word of you as a palace supplier spread, a big profit was made." },
        basarisizSonuc: { mesaj: "The palace clerks stalled you, you lost part of your capital." },
      },
    ],
  },
  bolge_bizans_02: {
    baslik: "Palace Intrigue",
    metin: "A noble at the palace asks you for a small favor in their interest, promising protection in return.",
    secenekler: [
      {
        metin: "Do the favor, build the relationship.",
        basariliSonuc: { mesaj: "You caught the noble's eye, your recognition at the palace grew." },
        basarisizSonuc: { mesaj: "Things went wrong, word spread you'd been mixed up in dirty business." },
      },
      {
        metin: "Politely refuse.",
        basariliSonuc: { mesaj: "You stayed clean, owing no one anything." },
        basarisizSonuc: { mesaj: "The noble felt slighted and turned against you." },
      },
    ],
  },
  bolge_bizans_03: {
    baslik: "Ceremony at Hagia Sophia",
    metin: "A crowd has gathered at Hagia Sophia for a great religious ceremony; you're considering attending.",
    secenekler: [
      {
        metin: "Attend the ceremony, pray.",
        basariliSonuc: { mesaj: "The magnificent ceremony's peace calmed your soul." },
        basarisizSonuc: { mesaj: "You got jostled in the crowd, your peace was disturbed." },
      },
      {
        metin: "Stand out during the ceremony, draw attention.",
        basariliSonuc: { mesaj: "Your behavior caught the priests' attention, your name was mentioned." },
        basarisizSonuc: { mesaj: "You were seen as disrespecting the ceremony, poorly received." },
      },
    ],
  },
  bolge_bizans_04: {
    baslik: "Illness in the Crowded City",
    metin: "The city's narrow streets are packed; the lack of air and filth spreads illness easily.",
    secenekler: [
      {
        metin: "Leave the city for cleaner air.",
        basariliSonuc: { mesaj: "A few days' escape restored your health." },
        basarisizSonuc: { mesaj: "The trip wasn't as relaxing as hoped, you came back tired and broke." },
      },
      {
        metin: "Stay in the city, be careful.",
        basariliSonuc: { mesaj: "You were careful and avoided the illness." },
        basarisizSonuc: { mesaj: "You caught your share of an outbreak in a crowded neighborhood." },
      },
    ],
  },
  bolge_bizans_05: {
    baslik: "The Secret of Greek Fire",
    metin: "You've heard a rumor about the formula for the navy's secret weapon, Greek fire; there are those wanting to sell the knowledge.",
    secenekler: [
      {
        metin: "Ignore the rumor.",
        basariliSonuc: { mesaj: "You didn't get mixed up in dangerous business, your conscience is clear." },
        basarisizSonuc: { mesaj: "You got curious, but ended up known as a gossip." },
      },
      {
        metin: "Investigate the information, try to sell it.",
        basariliSonuc: { mesaj: "You sold the information to the right person and made good money." },
        basarisizSonuc: { mesaj: "It was discovered you'd meddled with a state secret, you were harshly punished." },
      },
    ],
  },
  bolge_bizans_06: {
    baslik: "Byzantine Gold",
    metin: "An investment opportunity has come up using the value of precious hyperpyra; a merchant proposes a partnership.",
    secenekler: [
      {
        metin: "Join the partnership with a small share.",
        basariliSonuc: { mesaj: "The partnership turned a profit, you got your share and more." },
        basarisizSonuc: { mesaj: "The partnership took a loss, you lost part of your investment." },
      },
      {
        metin: "Invest all your savings.",
        basariliSonuc: { mesaj: "Your bold investment brought a fortune." },
        basarisizSonuc: { mesaj: "The investment collapsed, you suffered a serious loss of wealth." },
      },
    ],
  },
  bolge_bizans_07: {
    baslik: "Hippodrome Bets",
    metin: "A great chariot race is underway between the Blue and Green factions at the Hippodrome; the crowd is roaring.",
    secenekler: [
      {
        metin: "Just watch, share in the excitement.",
        basariliSonuc: { mesaj: "You got caught up in the crowd's wild excitement, a great time." },
        basarisizSonuc: { mesaj: "You took a kick in the jostling, your mood was ruined." },
      },
      {
        metin: "Place a bet on a faction.",
        basariliSonuc: { mesaj: "The faction you backed won, you had fun and made money." },
        basarisizSonuc: { mesaj: "You lost the bet, money left your pocket." },
      },
    ],
  },
  bolge_bizans_08: {
    baslik: "A Venetian Rival",
    metin: "Venetian merchants have brought rival goods to your harbor, a price war has broken out.",
    secenekler: [
      {
        metin: "Lower your price, keep selling.",
        basariliSonuc: { mesaj: "Even at a lower profit, you moved your goods." },
        basarisizSonuc: { mesaj: "The Venetians undercut you further, your goods went unsold." },
      },
      {
        metin: "Push your quality, hold firm on price.",
        basariliSonuc: { mesaj: "Those who value quality kept buying from you." },
        basarisizSonuc: { mesaj: "Customers went for the cheaper option, you couldn't sell." },
      },
    ],
  },
  bolge_bizans_09: {
    baslik: "Gossip at the Palace",
    metin: "A rumor about you is spreading at the palace; some have started to keep their distance.",
    secenekler: [
      {
        metin: "Ignore the gossip.",
        basariliSonuc: { mesaj: "In time the gossip faded, you kept your composure." },
        basarisizSonuc: { mesaj: "The gossip grew, your reputation took some damage." },
      },
      {
        metin: "Find the source and confront it.",
        basariliSonuc: { mesaj: "You brought out the truth, your reputation recovered." },
        basarisizSonuc: { mesaj: "The confrontation turned into a fight, now everyone's talking about you." },
      },
    ],
  },
  bolge_bizans_10: {
    baslik: "The Threat of Siege",
    metin: "Word spreads that enemy troops have been sighted outside the city walls; panic is stirring among the people.",
    secenekler: [
      {
        metin: "Volunteer for the wall's defense.",
        basariliSonuc: { mesaj: "The courage you showed in the defense was spoken of far and wide." },
        basarisizSonuc: { mesaj: "You were badly wounded in the clash." },
      },
      {
        metin: "Take your family somewhere safe.",
        basariliSonuc: { mesaj: "You put safety first, and relaxed once the danger passed." },
        basarisizSonuc: { mesaj: "You lost some of your belongings at the shelter." },
      },
    ],
  },

  // SELÇUKLU
  bolge_selcuklu_01: {
    baslik: "Debate at the Madrasa",
    metin: "A debate has broken out among scholars at the madrasa; your opinion is asked too.",
    secenekler: [
      {
        metin: "Speak wisely and measured.",
        basariliSonuc: { mesaj: "The teacher appreciated your words." },
        basarisizSonuc: { mesaj: "Your view was misunderstood, a bit embarrassing." },
      },
      {
        metin: "Listen quietly, take no side.",
        basariliSonuc: { mesaj: "You stayed out of the debate and kept your peace." },
        basarisizSonuc: { mesaj: "Your silence was mistaken for ignorance." },
      },
    ],
  },
  bolge_selcuklu_02: {
    baslik: "Bandits on the Caravan Road",
    metin: "Word has come that bandits have set an ambush on the caravan route; joining the caravan looks risky.",
    secenekler: [
      {
        metin: "Pay extra for protection, travel safely.",
        basariliSonuc: { mesaj: "Thanks to the guards you arrived safely, your trade turned a profit." },
        basarisizSonuc: { mesaj: "Despite what you paid, the bandits staged a small raid anyway." },
      },
      {
        metin: "Take the risk, travel without protection.",
        basariliSonuc: { mesaj: "Luck was on your side, you arrived without any trouble." },
        basarisizSonuc: { mesaj: "Bandits raided the caravan, costing you both your goods and health." },
      },
    ],
  },
  bolge_selcuklu_03: {
    baslik: "The Sultan's Campaign",
    metin: "The Sultan is setting out on a new campaign, calling for volunteers and support.",
    secenekler: [
      {
        metin: "Provide logistical support for the campaign.",
        basariliSonuc: { mesaj: "Your contribution was noted by the Sultan's men." },
        basarisizSonuc: { mesaj: "The support you gave went to waste, you didn't even get thanked." },
      },
      {
        metin: "Join the campaign in person.",
        basariliSonuc: { mesaj: "Your usefulness on campaign was praised." },
        basarisizSonuc: { mesaj: "You were badly wounded on campaign, taking a long time to heal." },
      },
    ],
  },
  bolge_selcuklu_04: {
    baslik: "Bargaining at the Caravanserai",
    metin: "At the caravanserai, a merchant from distant lands offers a price far below your goods' true worth.",
    secenekler: [
      {
        metin: "Insist on the real price.",
        basariliSonuc: { mesaj: "Your persistence paid off, you got what was fair." },
        basarisizSonuc: { mesaj: "The merchant walked away and struck a deal with someone else." },
      },
      {
        metin: "Accept the offer, sell quickly.",
        basariliSonuc: { mesaj: "Low as it was, you turned it into cash quickly." },
        basarisizSonuc: { mesaj: "The merchant backed out at the last moment, wasting your time." },
      },
    ],
  },
  bolge_selcuklu_05: {
    baslik: "The Friday Sermon",
    metin: "You've been given the chance to give a short talk to the congregation at Friday prayers.",
    secenekler: [
      {
        metin: "Speak sincerely and simply.",
        basariliSonuc: { mesaj: "Your words touched the congregation's hearts." },
        basarisizSonuc: { mesaj: "Nerves left your words scattered, not very impressive." },
      },
      {
        metin: "Prepare a long, elaborate sermon.",
        basariliSonuc: { mesaj: "Your impressive oratory made your name known." },
        basarisizSonuc: { mesaj: "Your showiness was seen as insincere, and you were criticized." },
      },
    ],
  },
  bolge_selcuklu_06: {
    baslik: "A Raid on the Byzantine Border",
    metin: "A frontier lord along the border is planning a small raid into Byzantine territory and wants participants.",
    secenekler: [
      {
        metin: "Join the raid.",
        basariliSonuc: { mesaj: "You returned from the raid with plunder, your name was mentioned." },
        basarisizSonuc: { mesaj: "The raid failed, you came back wounded and empty-handed." },
      },
      {
        metin: "Stay in your village, tend to your field.",
        basariliSonuc: { mesaj: "You went about your work safely." },
        basarisizSonuc: { mesaj: "Some looked down on you for not joining the raid." },
      },
    ],
  },
  bolge_selcuklu_07: {
    baslik: "The Akhi Guild",
    metin: "The city's akhi guild has invited you to a ceremony honoring honest tradesmanship.",
    secenekler: [
      {
        metin: "Attend the ceremony, showcase your trade.",
        basariliSonuc: { mesaj: "Your honesty was appreciated, your word carries weight among tradesmen." },
        basarisizSonuc: { mesaj: "The ceremony didn't bring the attention you hoped for." },
      },
      {
        metin: "Donate to the guild, become a member.",
        basariliSonuc: { mesaj: "Membership brought you new trade connections." },
        basarisizSonuc: { mesaj: "Your donation brought no return, wasted expense." },
      },
    ],
  },
  bolge_selcuklu_08: {
    baslik: "Duty at the Kadi's Court",
    metin: "The kadi wants you to testify in a dispute between two parties.",
    secenekler: [
      {
        metin: "Tell the truth, testify honestly.",
        basariliSonuc: { mesaj: "Your honesty was praised in court." },
        basarisizSonuc: { mesaj: "Your testimony didn't change the case's outcome, time wasted." },
      },
      {
        metin: "Wink at one side, gain an advantage.",
        basariliSonuc: { mesaj: "Your false testimony secured you a small benefit." },
        basarisizSonuc: { mesaj: "Your lie was exposed, costing you both money and reputation." },
      },
    ],
  },
  bolge_selcuklu_09: {
    baslik: "The Silk Road Caravan",
    metin: "You have a chance to join a great caravan heading to distant Asia; the road is long and harsh but the profit high.",
    secenekler: [
      {
        metin: "Join the caravan.",
        basariliSonuc: { mesaj: "The long, hard journey brought more than you expected." },
        basarisizSonuc: { mesaj: "You fell ill on the road and lost part of your goods." },
      },
      {
        metin: "Stay in the city, continue your small trade.",
        basariliSonuc: { mesaj: "You earned a safe, modest profit." },
        basarisizSonuc: { mesaj: "You felt a little sad thinking you'd missed a big opportunity." },
      },
    ],
  },
  bolge_selcuklu_10: {
    baslik: "A Conversation at the Tekke",
    metin: "Dervishes at a tekke outside the city have invited you to a conversation; a wise sheikh is among them.",
    secenekler: [
      {
        metin: "Join the conversation, listen.",
        basariliSonuc: { mesaj: "The sheikh's words brought your soul peace." },
        basarisizSonuc: { mesaj: "The conversation ran long, you left without understanding much." },
      },
      {
        metin: "Make a donation to the tekke.",
        basariliSonuc: { mesaj: "Your donation earned the dervishes' prayers." },
        basarisizSonuc: { mesaj: "Your donation wasn't appreciated the way you'd hoped." },
      },
    ],
  },
};
