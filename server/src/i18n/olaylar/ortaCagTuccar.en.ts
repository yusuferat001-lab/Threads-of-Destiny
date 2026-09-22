import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagTuccar.ts — İngilizce çevirileri. */
export const OLAYLAR_ORTACAG_TUCCAR_EN: Record<string, OlayCeviri> = {
  oc_tuccar_kervan: {
    baslik: "The Caravan Road",
    metin:
      "You send your caravan, loaded with valuable goods, on its way. There are three routes: the short, dangerous desert road; the long, safe mountain road; or the main road with paid guards.",
    secenekler: [
      {
        metin: "Take the desert road — short, cheap, dangerous.",
        basariliSonuc: {
          mesaj: "You crossed the desert in ten days; the goods reached the market before anyone else.",
          detay:
            "You were there while prices were at their peak. Your lips cracked from thirst, but your coffer filled.",
        },
        basarisizSonuc: {
          mesaj: "Bandits raided the caravan; they took the goods and left you half dead.",
          detay:
            "You walked two days in the desert without water. If a Bedouin party hadn't found you, you'd have stayed out there; the goods are gone, the debt remains.",
        },
      },
      {
        metin: "Take the mountain road — long, tiring, safe.",
        basariliSonuc: {
          mesaj: "The mountain road was long but the caravan arrived intact.",
          detay: "By the time you arrived the best prices were gone, but you still made a profit. A dull success is a success too.",
        },
        basarisizSonuc: {
          mesaj: "Early snow closed the road; the goods waited and some spoiled.",
          detay:
            "The safe road betrays you sometimes too. You were stuck in the pass for three weeks; spoiled goods and eaten provisions grew the loss.",
        },
      },
      {
        metin: "Hire guards, take the main road.",
        basariliSonuc: {
          mesaj: "Thanks to the guards, not a single bandit could get close.",
          detay:
            "After paying their fees the remaining profit was small but certain. The guard captain said 'a discount next time', and that too is a connection.",
        },
        basarisizSonuc: {
          mesaj: "The guards you hired were in league with the bandits; they split the goods.",
          detay:
            "Your own protection robbed you. You can't tell anyone, because the mark of 'a merchant who can't even pick his guards' would end your trade.",
        },
      },
    ],
  },

  oc_tuccar_lonca: {
    baslik: "Guild Membership",
    metin:
      "The city's merchant guild has invited you to join. Membership is expensive and requires following the guild's rules; but non-members cannot bid on the big contracts.",
    secenekler: [
      {
        metin: "Join, follow the guild's rules.",
        basariliSonuc: {
          mesaj: "You were admitted to the guild; you can now bid on the big contracts.",
          detay:
            "The guild sets prices, decides who sells where. Your earnings rose, your freedom fell, and this is the trade most merchants make.",
        },
        basarisizSonuc: {
          mesaj: "You paid the dues but the old members shut you out as an 'upstart'.",
          detay:
            "You are invited to the meetings, but the decisions are made before you arrive. You keep paying the dues because leaving would look worse.",
        },
      },
      {
        metin: "Don't join, work independent and unregulated.",
        basariliSonuc: {
          mesaj: "You undercut the guild's prices; customers poured in.",
          detay:
            "You don't care about the guild's anger because the customer looks at who sells cheap. But you are never invited to the big contracts.",
        },
        basarisizSonuc: {
          mesaj: "The guild pressured the suppliers; no one will sell you goods.",
          detay:
            "Standing alone was a good idea until everyone united against you. Your warehouses are empty, your customers at another door.",
        },
      },
    ],
  },

  oc_tuccar_sahte_mal: {
    baslik: "A Cheap Supplier",
    metin:
      "A supplier offers you cheap cloth you could sell as silk. The difference is hard to see by eye, but an expert buyer would notice at once.",
    secenekler: [
      {
        metin: "Buy it and sell it as silk.",
        basariliSonuc: {
          mesaj: "No one noticed the difference; your profit margin tripled.",
          detay:
            "As you counted the money, you remembered the customer saying 'what fine cloth'. And you know you'll do it again.",
        },
        basarisizSonuc: {
          mesaj: "A noble's tailor tested the cloth; the scandal spread through the market.",
          detay: "A sign reading 'fraud' was hung outside your shop. The trust you built over years went with one bolt of cloth.",
        },
      },
      {
        metin: "Buy it but sell it under its real name, as cheap cloth.",
        basariliSonuc: {
          mesaj: "You sold the cheap cloth honestly; you got a steady clientele from the poor quarters.",
          detay:
            "The rich don't buy silk from you, but tradesmen and craftsmen always come. The sum of your small profits came out large.",
        },
        basarisizSonuc: {
          mesaj: "No buyer came for the cheap cloth either; it sat in your warehouse.",
          detay: "Honesty is no guarantee of a sale. You unloaded the goods at a loss and never worked with that supplier again.",
        },
      },
      {
        metin: "Refuse, report the supplier to the guild.",
        basariliSonuc: {
          mesaj: "Thanks to your report the fraud ring was broken; your name became that of an honest merchant.",
          detay:
            "The guild rewarded you, the tradesmen congratulated you. And there is a man who had to flee the city, and he knows your name.",
        },
        basarisizSonuc: {
          mesaj: "The supplier's men raided your shop at night.",
          detay: "Windows broken, goods scattered, and you were beaten. The guild said 'insufficient evidence' and closed the file.",
        },
      },
    ],
  },

  oc_tuccar_sahte_altin: {
    baslik: "Suspicious Coins",
    metin:
      "You received a large payment, but some of the coins feel light; they may be counterfeit. If you spend them, no one may notice, or you could land in serious trouble.",
    secenekler: [
      {
        metin: "Quietly keep spending the coins.",
        basariliSonuc: {
          mesaj: "The coins passed unnoticed; your loss was made good.",
          detay: "You told no one; this became your little secret.",
        },
        basarisizSonuc: {
          mesaj: "A tradesman noticed the counterfeit coin and accused you of fraud.",
          detay: "You hadn't done the forging, but now your name is mixed up in it.",
        },
      },
      {
        metin: "Take the coins back to the person you got them from.",
        basariliSonuc: {
          mesaj: "The man was embarrassed, changed the coins, and apologized to you.",
          detay: "Your honesty was talked about in the market; some merchants now do business with you more easily.",
        },
        basarisizSonuc: {
          mesaj: "The man denied the coins were counterfeit; you didn't get your money back.",
          detay: "You tried to do the right thing and the loss stayed with you.",
        },
      },
    ],
  },

  oc_tuccar_kervansaray_yangini: {
    baslik: "The Caravanserai Fire",
    metin:
      "A fire broke out at the caravanserai where you were spending the night. Your goods are in a storeroom, your animals in the stable. You don't have time to save both.",
    secenekler: [
      {
        metin: "Save the goods.",
        basariliSonuc: {
          mesaj: "You saved most of the goods through the smoke; your animals were lost.",
          detay: "Your capital stayed intact, but finding new animals will take time.",
        },
        basarisizSonuc: {
          mesaj: "The smoke made you faint; both goods and animals burned.",
          detay: "You barely threw yourself outside; nothing of yours remained among the ashes of the caravanserai.",
        },
      },
      {
        metin: "Save the animals.",
        basariliSonuc: {
          mesaj: "You saved the horses and camels; at least you can carry on the road.",
          detay: "The goods burned but having the animals is enough for a new start.",
        },
        basarisizSonuc: {
          mesaj: "The animals bolted in panic and you were choked by the smoke; you lost everything.",
          detay: "This became one of those nights that starts you from nothing.",
        },
      },
    ],
  },

  oc_tuccar_cifte_defter: {
    baslik: "The Double Ledger",
    metin:
      "Your partner suggests keeping a false ledger to show the tax officers; only a fraction of your real earnings would be recorded, the rest staying in your pockets.",
    secenekler: [
      {
        metin: "Sell your partner to the guild, seize the whole shop!",
        basariliSonuc: {
          mesaj:
            "You reported your partner to the treasury! The man was thrown in the dungeon, and you, as an 'honest citizen', bought up all his shares cheap.",
          detay: "You grew rich but the man's family will never forgive you.",
        },
        basarisizSonuc: {
          mesaj: "The inspectors found you both guilty. The game backfired; all your goods were seized.",
        },
      },
      {
        metin: "Accept the suggestion.",
        basariliSonuc: {
          mesaj: "You evaded tax for years; your earnings stayed far above their recorded value.",
          detay: "Even your acquaintances in the state office don't know about it; you keep this secret tight.",
        },
        basarisizSonuc: {
          mesaj: "The audit team found the double ledger; a heavy tax penalty and your shop was seized.",
          detay: "Everything you'd saved over years was taken from you in one afternoon.",
        },
      },
      {
        metin: "Refuse, keep a single honest ledger.",
        basariliSonuc: {
          mesaj: "You stayed honest; audits never worry you at all.",
          detay: "Your partner finds you 'too cautious', but you sleep easy at night.",
        },
        basarisizSonuc: {
          mesaj: "Your partner didn't accept your refusal and dissolved the partnership on his own.",
          detay: "Your honesty cost you the partnership but did not touch your conscience.",
        },
      },
    ],
  },

  oc_tuccar_kizinin_cehizi: {
    baslik: "Your Daughter's Dowry",
    metin:
      "Your daughter has reached marrying age and a suitor from a good family has come forward. But the dowry asked is nearly your entire savings.",
    secenekler: [
      {
        metin: "Spend all your savings on the dowry, secure a good marriage.",
        basariliSonuc: {
          mesaj: "The dowry was approved, the wedding was grand; your daughter began a happy life.",
          detay: "You wiped out your capital, but the happiness in your daughter's eyes was worth it.",
        },
        basarisizSonuc: {
          mesaj: "The dowry was given but the groom's family still turned up their noses.",
          detay: "You did all you could; being found insufficient wore you out.",
        },
      },
      {
        metin: "Offer a more modest dowry.",
        basariliSonuc: {
          mesaj: "The family accepted the modest offer; the wedding was plain but warm.",
          detay: "Your daughter said she was proud not of the money but of you.",
        },
        basarisizSonuc: {
          mesaj: "The family found the offer insufficient and the marriage fell through.",
          detay: "Your daughter's disappointment weighed far heavier than the money you lost.",
        },
      },
    ],
  },

  oc_tuccar_yabanci_dil_bilgini: {
    baslik: "A Merchant From a Distant Land",
    metin:
      "A merchant caravan speaking a language you've never heard has come to the city. No one can communicate, but it's clear their goods are very valuable.",
    secenekler: [
      {
        metin: "Break the ice using your pet parrot's talent for mimicry.",
        basariliSonuc: {
          mesaj:
            "When your parrot mimicked the strangers' odd sounds, the whole caravan burst out laughing. A wonderful bond formed between you and you struck a deal at the best price!",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
      },
      {
        metin: "Hire an interpreter, bargain directly.",
        basariliSonuc: {
          mesaj: "Thanks to the interpreter you bought the best goods at the best price.",
          detay: "These merchants come the same season every year; they are your customers now.",
        },
        basarisizSonuc: {
          mesaj: "The interpreter you hired mistranslated the prices; you traded at a loss.",
          detay: "A failure to communicate sometimes costs more than money.",
        },
      },
      {
        metin: "Try to deal with signs, don't take the risk.",
        basariliSonuc: {
          mesaj: "With hand gestures you made a small but profitable trade.",
          detay: "The caravan leader laughed and shook your hand; language may not have been shared, but trade was.",
        },
        basarisizSonuc: {
          mesaj: "Because of a misunderstanding you had to buy a good you didn't want.",
          detay: "Sometimes silence leads to more misunderstanding than an agreement does.",
        },
      },
    ],
  },

  oc_tuccar_deniz_firtinasi: {
    baslik: "The Ship in the Storm",
    metin:
      "The ship you chartered was caught in a great storm. The captain sent word: unless they throw part of the cargo overboard, the ship could sink.",
    secenekler: [
      {
        metin: "Give the captain permission to throw half the cargo.",
        basariliSonuc: {
          mesaj: "The ship and your remaining cargo weathered the storm.",
          detay: "The loss was great but you didn't lose everything; the captain said you made the right call.",
        },
        basarisizSonuc: {
          mesaj: "What they threw was not enough; the ship still took heavy damage.",
          detay: "Both your cargo is gone and the ship's repair came out of your pocket.",
        },
      },
      {
        metin: "Let nothing be thrown, take the risk.",
        basariliSonuc: {
          mesaj: "The ship miraculously weathered the storm with the cargo intact.",
          detay: "The captain said he'd never work with you again, but this time you won.",
        },
        basarisizSonuc: {
          mesaj: "The ship sank; your cargo, part of the crew and your whole investment were lost.",
          detay: "This became one of the worst weeks of your trading life.",
        },
      },
    ],
  },

  "oc_tuccar_haraç_talebi": {
    baslik: "The Toll-Taking Lordling",
    metin:
      "A minor lordling whose lands you crossed demands an arbitrary levy under the name of a 'passage toll'. It is not legal, but he has armed men.",
    secenekler: [
      {
        metin: "Pay, carry on your way.",
        basariliSonuc: {
          mesaj: "You paid the levy and passed without trouble.",
          detay: "You know he'll be here again next time, and it bothers you.",
        },
        basarisizSonuc: {
          mesaj: "The lordling doubled the levy, claiming you had 'forgotten' it.",
          detay: "You have no bargaining room against arbitrary power.",
        },
      },
      {
        metin: "Refuse to pay, complain to the higher authority.",
        basariliSonuc: {
          mesaj: "Your complaint was heeded; the lordling was warned and the levy lifted.",
          detay: "Other merchants thanked you; this road is safer to travel now.",
        },
        basarisizSonuc: {
          mesaj: "The lordling's men stopped you on the road and 'taught you a lesson'.",
          detay: "You trusted the authorities and the authorities came far too late.",
        },
      },
    ],
  },

  oc_tuccar_kalp_para_uretimi: {
    baslik: "Striking Counterfeit Coin",
    metin:
      "A goldsmith you know says he can strike counterfeit coins indistinguishable from the real thing. If you partner up you could both be rich — or you could both be hanged.",
    secenekler: [
      {
        metin: "Accept the partnership.",
        basariliSonuc: {
          mesaj: "The counterfeit coins circulated without trouble; your fortune multiplied.",
          detay: "The life you built with this money carries a lie at its foundation, and you know it.",
        },
        basarisizSonuc: {
          mesaj:
            "The craftsmen's guild detected the counterfeit coins and the trail found you. Coining was counted among the gravest crimes and you were executed.",
        },
      },
      {
        metin: "Refuse the offer, report the goldsmith.",
        basariliSonuc: {
          mesaj: "Thanks to your report the counterfeiting ring was broken.",
          detay: "The guild rewarded you, but the goldsmith's relatives will never forgive you.",
        },
        basarisizSonuc: {
          mesaj: "Your report was found unproven; the goldsmith accused you of slander.",
          detay: "You told the truth and no one believed it.",
        },
      },
    ],
  },

  oc_tuccar_kervan_rehberi_ihanet: {
    baslik: "Your Guide's Suspicious Route",
    metin:
      "The caravan guide you hired suggests taking a deserted shortcut instead of the known main road. It saves time, but you don't know why he insists so much.",
    secenekler: [
      {
        metin: "Trust the guide, take the shortcut.",
        basariliSonuc: {
          mesaj: "The shortcut really worked; you reached the market ahead of your rivals.",
          detay: "The guide smiled to himself; maybe he was just a good guide.",
        },
        basarisizSonuc: {
          mesaj: "The shortcut was a bandit trap; the guide was in league with them.",
          detay: "Your goods are gone, the guide vanished; you learned this lesson the hard way.",
        },
      },
      {
        metin: "Take the main road despite his insistence.",
        basariliSonuc: {
          mesaj: "You arrived safely by the main road; the guide sulked but there was no trouble.",
          detay: "Trusting your instincts is sometimes the best trade strategy.",
        },
        basarisizSonuc: {
          mesaj: "The main road was blocked too; the delay cost you some customers.",
          detay: "Even being cautious sometimes carries a price.",
        },
      },
    ],
  },

  oc_tuccar_zanaatkar_cirak_kapma: {
    baslik: "A Talented Apprentice",
    metin:
      "You noticed an extraordinarily talented apprentice working for a rival master. You could pull him onto your side, but that means making an enemy of his master.",
    secenekler: [
      {
        metin: "Secretly make the apprentice a better offer.",
        basariliSonuc: {
          mesaj: "The apprentice accepted your offer; the quality of your work rose visibly.",
          detay: "His old master doesn't speak to you anymore, but your new apprentice more than makes up for it.",
        },
        basarisizSonuc: {
          mesaj: "The apprentice told his master about the offer; you were branded an 'unscrupulous rival'.",
          detay: "This kind of 'poaching' is not welcomed in the guild.",
        },
      },
      {
        metin: "Stay honest, train your own apprentice.",
        basariliSonuc: {
          mesaj: "You trained your own apprentice from scratch; it took time but his loyalty was total.",
          detay: "They say slow-growing trees put down deeper roots; so it was with your business.",
        },
        basarisizSonuc: {
          mesaj: "The apprentice you trained turned out to have no talent; your time was wasted.",
          detay: "Not every investment pays off; this time you were unlucky.",
        },
      },
    ],
  },

  oc_tuccar_dilenci_gercek_kimlik: {
    baslik: "A Noble in Disguise",
    metin:
      "You gave alms to a beggar who came to your shop; it turned out he was a noble in disguise. He roams the city secretly, testing the honesty of the tradesmen.",
    secenekler: [
      {
        metin: "Be modest, accept the reward.",
        basariliSonuc: {
          mesaj: "The noble rewarded your honesty; your name spread through the city at once.",
          detay: "The tale of 'the merchant who treats even a beggar with respect' was told for months.",
        },
        basarisizSonuc: {
          mesaj: "The noble was pleased but the reward was smaller than you thought.",
          detay: "Your expectations were high; still, it wasn't a bad outcome.",
        },
      },
      {
        metin: "Turn it into an opportunity, ask the noble for a contract.",
        basariliSonuc: {
          mesaj: "The noble liked your frankness and made you a supplier to the palace.",
          detay: "Your boldness was more than repaid; you now sell to the palace kitchen too.",
        },
        basarisizSonuc: {
          mesaj: "The noble counted it 'insolence' and quietly left.",
          detay: "Pushing an opportunity sometimes loses you what you had.",
        },
      },
    ],
  },

  oc_tuccar_kutu_pazarlik_yarismasi: {
    baslik: "The Bargaining Contest",
    metin:
      "A 'best bargainer' contest is being held for fun at the city festival; the loser is made a laughingstock but the winner becomes famous across the whole city.",
    secenekler: [
      {
        metin: "Enter the contest.",
        basariliSonuc: {
          mesaj: "You got your rival to sell a goat for two worthless stones; the crowd laughed and applauded.",
          detay: "In the city you are now known as 'the master of the bargain'.",
        },
        basarisizSonuc: {
          mesaj: "Your rival got the better of you; the crowd laughed at your expense.",
          detay: "You became the subject of the festival jokes, but at least you had the courage to enter.",
        },
      },
      {
        metin: "Stay a spectator.",
        basariliSonuc: {
          mesaj: "You watched from the side, enjoyed it, risked nothing.",
          detay: "Some days just watching is enough.",
        },
        basarisizSonuc: {
          mesaj: "While watching the contest a pickpocket lightened your purse.",
          detay: "Even watching sometimes carries a penalty for inattention.",
        },
      },
    ],
  },

  oc_tuccar_kalpazan_teklifi: {
    baslik: "A Counterfeit Coin Offer",
    metin:
      "A shady acquaintance offers you a share in the business of pushing expertly struck counterfeit coins into circulation. The gain is dizzying, but if caught the penalty is execution.",
    secenekler: [
      {
        metin: "Accept the offer, take a share in the business.",
        basariliSonuc: {
          mesaj: "The counterfeit coins entered circulation unnoticed; your coffer filled unbelievably.",
          detay: "Some riches come with a dangerous secret.",
        },
        basarisizSonuc: {
          mesaj: "The city guards raided the mint! You barely escaped, but traces of the affair stayed on you.",
          detay: "Coining always comes out one day.",
        },
      },
      {
        metin: "Refuse the offer, report the matter to the tradesmen's guild.",
        basariliSonuc: {
          mesaj:
            "Your report broke the counterfeiting ring; you began to be spoken of within the guild as an 'honest merchant'.",
          detay: "Your honesty was rewarded in the guild.",
        },
        basarisizSonuc: {
          mesaj: "Your report was not taken seriously, but at least your conscience is at ease.",
          detay: "Not every right step is rewarded at once.",
        },
      },
    ],
  },

  oc_tuccar_veba_firsatciligi: {
    baslik: "Prices in Time of Plague",
    metin:
      "While the plague ravages the city, the medicinal herbs and grain stocks in your hands are worth gold. You could raise prices tenfold, or keep them at a level the people can pay.",
    secenekler: [
      {
        metin: "Raise prices as high as possible.",
        basariliSonuc: {
          mesaj: "The panicked people agreed to any price; your coffer filled as it never had.",
          detay: "Some gains are built on other people's desperation.",
        },
        basarisizSonuc: {
          mesaj: "When your exorbitant prices got out, an angry crowd looted your shop.",
          detay: "Greed sometimes finds its own punishment.",
        },
      },
      {
        metin: "Keep prices fair, even give discounts to those in need.",
        basariliSonuc: {
          mesaj:
            "Your fair prices were talked about in the city; when the plague passed, your name became an example of honesty remembered for generations.",
          detay: "Some riches are far more lasting than money.",
        },
        basarisizSonuc: {
          mesaj: "With low prices your stocks ran out fast; nothing was left even for your own family.",
          detay: "Kindness is sometimes paid out of your own pocket.",
        },
      },
    ],
  },

  oc_tuccar_yabanci_ortak: {
    baslik: "A Partnership From a Distant Land",
    metin:
      "A merchant of a different language and a different faith offers you a profitable but long-term partnership. Some local tradesmen will not welcome your doing business with the 'other'.",
    secenekler: [
      {
        metin: "Accept the partnership.",
        basariliSonuc: {
          mesaj:
            "The partnership proved even more profitable than expected; you opened to new markets, while some local tradesmen condemned you.",
          detay: "Some bridges make you rich while closing some doors.",
        },
        basarisizSonuc: {
          mesaj:
            "The partnership was contentious over differences of language and custom and did not bring the gain you hoped.",
          detay: "Not every bridge holds firm the first time.",
        },
      },
      {
        metin: "Refuse, work only with local tradesmen.",
        basariliSonuc: {
          mesaj: "You refused; the local tradesmen appreciated you as 'one of us'.",
          detay: "Some assurances come from familiarity.",
        },
        basarisizSonuc: {
          mesaj:
            "After refusing, you had to watch from afar as that partnership made your rival rich.",
          detay: "Missed opportunities sometimes hurt more from a distance.",
        },
      },
    ],
  },

  oc_tuccar_rakip_lonca_sabotaj: {
    baslik: "Rival Sabotage",
    metin:
      "Someone broke into your warehouse and deliberately spoiled part of your goods; the signs point to a rival trader who's been undercutting you all along. You could strike back the same way, or gather evidence and file a complaint with the guild.",
    secenekler: [
      {
        metin: "Strike back the same way, sabotage his goods too.",
        basariliSonuc: {
          mesaj:
            "You broke into his warehouse the same way; your losses were covered, but something inside you was tainted.",
          detay: "You can't even admit to yourself that what you gained is nothing but theft.",
        },
        basarisizSonuc: {
          mesaj: "You were caught at the door; your rival exposed you in front of the whole market.",
          detay:
            "While hiding your own dirty deed you cleaned up his; now you're the 'thieving trader'.",
        },
      },
      {
        metin: "Gather evidence, file an official complaint with the guild.",
        basariliSonuc: {
          mesaj: "The guild's investigation found your rival guilty; your losses were compensated.",
          detay: "This victory won by legitimate means also earned you the market's trust.",
        },
        basarisizSonuc: {
          mesaj: "Your evidence was deemed 'insufficient'; the cost of the complaint went to waste.",
          detay: "Choosing the right path doesn't always bring results; at least your conscience is clean.",
        },
      },
    ],
  },

  oc_tuccar_enkaz_hak_iddiasi: {
    baslik: "Cargo from the Wreck",
    metin:
      "You found valuable goods in a shipwreck washed up on shore. A surviving sailor says they came from his ship, and this cargo would free his family from debt.",
    secenekler: [
      {
        metin: "Claim all the goods for yourself; what you found is yours.",
        basariliSonuc: {
          mesaj:
            "You carried the goods to your warehouse; the sailor stood there in despair, but legally, what's found on shore is yours.",
          detay: "Your purse filled, but that look will stay with you a while.",
        },
        basarisizSonuc: {
          mesaj: "The sailor told the story around town; your greed became the talk of the tongues.",
          detay: "You sold some of the goods, but now they call you the 'wreck crow'.",
        },
      },
      {
        metin: "Split the cargo with the sailor, strike a fair deal.",
        basariliSonuc: {
          mesaj: "You split the cargo in two; the sailor shook your hand in gratitude.",
          detay: "Your gain shrank, but someone who remembers this deal may help you one day.",
        },
        basarisizSonuc: {
          mesaj: "The sailor wasn't satisfied with his share, an argument broke out; the deal barely closed, at a loss to you.",
          detay: "Your good will didn't satisfy everyone, but your conscience is at ease.",
        },
      },
      {
        metin: "Return all the goods to the sailor.",
        basariliSonuc: {
          mesaj: "You even covered the cost of transport and delivered the cargo to the sailor in full.",
          detay: "The man couldn't hold back tears; this story will be told at the harbor for a long time.",
        },
        basarisizSonuc: {
          mesaj: "While returning it, the boat you carried it in capsized, and part of the goods went back into the sea.",
          detay: "Doing the right thing sometimes demands an extra price.",
        },
      },
    ],
  },

  oc_tuccar_cirak_hirsizlik: {
    baslik: "The Apprentice's Betrayal",
    metin:
      "You learned that the apprentice who's worked beside you for years has been stealing money from the till. The young man begs, saying his family is starving.",
    secenekler: [
      {
        metin: "Report him to the guild, let him be punished.",
        basariliSonuc: {
          mesaj: "Part of the stolen money was recovered; the apprentice was brought before the guild court.",
          detay: "You secured justice, but the boy's crying face won't leave your sight.",
        },
        basarisizSonuc: {
          mesaj: "The guild turned down your complaint, saying 'the evidence is weak, the penalty too harsh'.",
          detay: "You came out of this ahead in neither money nor reputation.",
        },
      },
      {
        metin: "Forgive him, cover the money yourself, help his family.",
        basariliSonuc: {
          mesaj:
            "You forgave the apprentice and sent supplies to his family; the young man stayed loyal to you for life.",
          detay: "Some investments come back with something far more lasting than gold.",
        },
        basarisizSonuc: {
          mesaj: "You forgave him, but the apprentice still vanished quietly one night.",
          detay: "Your kindness went unrewarded; it made you wary of trusting people for a while.",
        },
      },
    ],
  },

  oc_tuccar_tekelci_teklif: {
    baslik: "The Monopoly Deal",
    metin:
      "A trader from distant lands offers you a monopoly on the spice trade on condition you become his sole supplier; but you'd have to cut ties with all your other suppliers.",
    secenekler: [
      {
        metin: "Accept the offer, put all your eggs in one basket.",
        basariliSonuc: {
          mesaj: "The deal held; all the spice trade in the city is now in your hands.",
          detay: "Your rivals watch helplessly; being this dependent on a single route unsettles even you.",
        },
        basarisizSonuc: {
          mesaj:
            "The distant trader was lost on the road, the goods never arrived; your old suppliers no longer want you either.",
          detay: "All the eggs you put in one basket broke at once.",
        },
      },
      {
        metin: "Refuse, keep working with a variety of suppliers.",
        basariliSonuc: {
          mesaj: "You kept your old arrangement; your gains are modest but safe.",
          detay: "You may have missed the big opportunity, but you're beholden to no supplier.",
        },
        basarisizSonuc: {
          mesaj: "Another trader snapped up the monopoly you refused; you watched him grow rich from a distance.",
          detay: "Caution sometimes leaves behind a regret tinged with envy.",
        },
      },
    ],
  },

  oc_tuccar_sehir_berati_rusveti: {
    baslik: "The Marketplace Charter",
    metin:
      "A stall spot is opening at the busiest corner of the city. The town clerk wants a bribe to grant you the charter; there's a legal route too, but the queue is long and your odds of winning are slim.",
    secenekler: [
      {
        metin: "Pay the bribe, secure the spot.",
        basariliSonuc: {
          mesaj: "The best corner became yours; the clerk pocketed the money quietly.",
          detay: "You know you got this spot not because you earned it, but because your purse was thick.",
        },
        basarisizSonuc: {
          mesaj: "Your bribe offer was overheard by an inspector; the scandal swept through the whole market.",
          detay: "You lost the money, the spot, and years of built reputation in a single afternoon.",
        },
      },
      {
        metin: "Apply through the legal channel, join the queue, trust the draw.",
        basariliSonuc: {
          mesaj: "The draw fell in your favor; the town council praised the outcome for its transparency.",
          detay: "The waiting was hard, but there's no secret behind the spot you won.",
        },
        basarisizSonuc: {
          mesaj: "The draw didn't go your way; the best corner went to another trader who paid the bribe.",
          detay: "Honesty went unrewarded, but at least your conscience is clear.",
        },
      },
    ],
  },

  oc_tuccar_borclu_soylu: {
    baslik: "The Noble Who Won't Pay",
    metin:
      "A noble has gone months without paying for the goods he bought from you. You need to remind him of the debt, but traders who speak too boldly to nobles sometimes lose their heads.",
    secenekler: [
      {
        metin: "Say it to his face directly, demand the money.",
        basariliSonuc: {
          mesaj: "The noble was embarrassed and paid the debt in cash; the other nobles heard of it.",
          detay: "Your courage paid off this time, but you won't always be this lucky.",
        },
        basarisizSonuc: {
          mesaj: "The noble accused you of insolence and threw you out; the debt was struck off as if it never existed.",
          detay: "Raising your voice at some doors carries a heavy price.",
        },
      },
      {
        metin: "Wait patiently, send politely worded reminder letters.",
        basariliSonuc: {
          mesaj: "Months later the noble sent part of his debt.",
          detay: "Your patience paid off; not all of it came back, but some did.",
        },
        basarisizSonuc: {
          mesaj:
            "The noble died, and his heirs said they didn't recognize the debt; the whole claim was wiped out.",
          detay: "Your politeness didn't speak for you; some debts never come back.",
        },
      },
    ],
  },

  oc_tuccar_fiyat_sabitleme_karteli: {
    baslik: "The Secret Arrangement",
    metin:
      "The city's big traders meet in secret and offer to raise grain prices together, forming a cartel. If you join, your profit is guaranteed, but the people's hunger deepens.",
    secenekler: [
      {
        metin: "Join, take your share of the cartel.",
        basariliSonuc: {
          mesaj: "Prices were raised together; your profit was guaranteed, but the bread lines grew longer.",
          detay:
            "As your purse fills, you strain not to hear that children in the next neighborhood are going to bed hungry.",
        },
        basarisizSonuc: {
          mesaj: "The cartel was exposed; an angry crowd stormed your shop.",
          detay: "Secret arrangements always come to light eventually; you paid the price before anyone else.",
        },
      },
      {
        metin: "Refuse, report the matter to the city council.",
        basariliSonuc: {
          mesaj:
            "Your report broke up the cartel attempt; the people called you 'the guardian of our bread'.",
          detay: "The other big traders will never forgive you, but the people's trust is worth more than that.",
        },
        basarisizSonuc: {
          mesaj: "Your report was found baseless; the other traders shut you out and boycotted your goods.",
          detay: "You did the right thing and paid the price for it alone.",
        },
      },
    ],
  },

  oc_tuccar_korsan_fidyesi: {
    baslik: "The Pirate's Ransom",
    metin:
      "A pirate ship has seized your caravan vessel in the Mediterranean; they're holding your crew hostage and demanding ransom. If you don't pay, the crew will be sold in the slave market.",
    secenekler: [
      {
        metin: "Pay the ransom, save the crew.",
        basariliSonuc: {
          mesaj:
            "The ransom was paid, the crew stayed free; your men will be loyal to you for life.",
          detay: "Your purse grew lighter, but your conscience has never been this much at ease.",
        },
        basarisizSonuc: {
          mesaj: "The pirates took the money but broke their word and killed one of the crew anyway.",
          detay: "Even paying ransom sometimes offers no guarantee; this news kept you sleepless for a long time.",
        },
      },
      {
        metin: "Don't pay, leave the crew to their fate.",
        basariliSonuc: {
          mesaj:
            "You didn't pay the ransom; you made up for the ship and goods another way, but your crew was sold in the slave market.",
          detay: "Your purse was spared, but there are faces that now haunt your dreams.",
        },
        basarisizSonuc: {
          mesaj:
            "The news spread through the harbor; no sailor wants to board your ship anymore, and it rotted crewless.",
          detay: "Shirking sacrifice has a price too; this time you paid it.",
        },
      },
    ],
  },
};
