import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagTuccar.ts — İngilizce çevirileri. */
export const OLAYLAR_ORTACAG_TUCCAR_EN: Record<string, OlayCeviri> = {
  oc_tuccar_kervan: {
    baslik: "The Caravan Road",
    metin:
      "Your caravan of valuable goods sets out. Three routes: the short desert road, the long safe mountain road, or the guarded main road.",
    secenekler: [
      {
        metin: "Desert road: short, cheap, risky.",
        basariliSonuc: {
          mesaj: "You crossed the desert in ten days and beat everyone to market.",
          detay:
            "Prices peaked; your coffer filled.",
        },
        basarisizSonuc: {
          mesaj: "Bandits raided the caravan, took the goods, left you half dead.",
          detay:
            "Two days without water; the goods are gone.",
        },
      },
      {
        metin: "Mountain road: long, tiring, safe.",
        basariliSonuc: {
          mesaj: "The road was long, but the caravan arrived intact.",
          detay: "Prices had dropped, yet you profited.",
        },
        basarisizSonuc: {
          mesaj: "Early snow closed the pass; goods waited and spoiled.",
          detay:
            "Stuck in the pass for three weeks.",
        },
      },
      {
        metin: "Hire guards, take the main road.",
        basariliSonuc: {
          mesaj: "Thanks to the guards, no bandit came near.",
          detay:
            "After fees the profit was small but sure.",
        },
        basarisizSonuc: {
          mesaj: "The guards were in league with bandits and split the goods.",
          detay:
            "Robbed by your own guards; you stay silent.",
        },
      },
    ],
  },

  oc_tuccar_lonca: {
    baslik: "Guild Membership",
    metin:
      "The merchant guild offers membership. It's costly and bound by rules, but non-members can't bid on big contracts.",
    secenekler: [
      {
        metin: "Join, follow the rules.",
        basariliSonuc: {
          mesaj: "You joined the guild; you can now bid on big contracts.",
          detay:
            "More earnings, less freedom.",
        },
        basarisizSonuc: {
          mesaj: "You paid the dues but old members shut you out.",
          detay:
            "Decisions are made before you arrive.",
        },
      },
      {
        metin: "Stay out, work independently.",
        basariliSonuc: {
          mesaj: "You undercut guild prices; customers poured in.",
          detay:
            "But you're never invited to big contracts.",
        },
        basarisizSonuc: {
          mesaj: "The guild pressured suppliers; no one sells to you.",
          detay:
            "Empty warehouses, customers elsewhere.",
        },
      },
    ],
  },

  oc_tuccar_sahte_mal: {
    baslik: "A Cheap Supplier",
    metin:
      "A supplier offers cheap cloth you could pass off as silk. Hard to spot, but an expert would notice at once.",
    secenekler: [
      {
        metin: "Buy it, sell it as silk.",
        basariliSonuc: {
          mesaj: "No one noticed; your margin tripled.",
          detay:
            "You know you'll do it again.",
        },
        basarisizSonuc: {
          mesaj: "A noble's tailor tested the cloth; the scandal spread.",
          detay: "A 'fraud' sign hung on your shop.",
        },
      },
      {
        metin: "Buy it, sell it honestly as cheap cloth.",
        basariliSonuc: {
          mesaj: "You sold honestly; the poor quarters became steady customers.",
          detay:
            "Small profits added up.",
        },
        basarisizSonuc: {
          mesaj: "Not even the cheap cloth sold; it sat in the warehouse.",
          detay: "You dumped the goods at a loss.",
        },
      },
      {
        metin: "Refuse and report the supplier.",
        basariliSonuc: {
          mesaj: "Your report broke the fraud ring; you're known as honest.",
          detay:
            "The man who fled knows your name.",
        },
        basarisizSonuc: {
          mesaj: "The supplier's men raided your shop at night.",
          detay: "You were beaten; the guild cited no evidence.",
        },
      },
    ],
  },

  oc_tuccar_sahte_altin: {
    baslik: "Suspicious Coins",
    metin:
      "A large payment came in, but some coins feel light; maybe fake. Spend them unnoticed, or land in trouble.",
    secenekler: [
      {
        metin: "Quietly spend the coins.",
        basariliSonuc: {
          mesaj: "The coins passed unnoticed; your loss is recovered.",
          detay: "Your little secret.",
        },
        basarisizSonuc: {
          mesaj: "A tradesman spotted a fake coin and accused you.",
          detay: "Not your forgery, but your name is in it.",
        },
      },
      {
        metin: "Take the coins back to the giver.",
        basariliSonuc: {
          mesaj: "The man, embarrassed, swapped the coins and apologized.",
          detay: "Your honesty was talked about.",
        },
        basarisizSonuc: {
          mesaj: "He denied they were fake; you got no refund.",
          detay: "You did right and bore the loss.",
        },
      },
    ],
  },

  oc_tuccar_kervansaray_yangini: {
    baslik: "The Caravanserai Fire",
    metin:
      "Fire breaks out at your caravanserai. Goods are in the storeroom, animals in the stable; you can't save both.",
    secenekler: [
      {
        metin: "Save the goods.",
        basariliSonuc: {
          mesaj: "You saved most goods; the animals were lost.",
          detay: "Capital intact; new animals take time.",
        },
        basarisizSonuc: {
          mesaj: "Smoke knocked you out; goods and animals burned.",
          detay: "You barely escaped; only ashes remain.",
        },
      },
      {
        metin: "Save the animals.",
        basariliSonuc: {
          mesaj: "You saved the horses and camels; you can still travel.",
          detay: "Goods burned, but you can start anew.",
        },
        basarisizSonuc: {
          mesaj: "The animals bolted, smoke choked you; you lost everything.",
          detay: "A night that restarts you from zero.",
        },
      },
    ],
  },

  oc_tuccar_cifte_defter: {
    baslik: "The Double Ledger",
    metin:
      "Your partner proposes a false ledger for the tax men; little of your real earnings recorded, the rest pocketed.",
    secenekler: [
      {
        metin: "Betray your partner, seize the shop!",
        basariliSonuc: {
          mesaj:
            "You reported him; he's jailed, his shares are yours.",
          detay: "Richer, but his family won't forgive you.",
        },
        basarisizSonuc: {
          mesaj: "Inspectors found you both guilty; your goods were seized.",
        },
      },
      {
        metin: "Accept the offer.",
        basariliSonuc: {
          mesaj: "You evaded tax for years; your earnings soared.",
          detay: "You keep the secret tight.",
        },
        basarisizSonuc: {
          mesaj: "Auditors found the double ledger; heavy fine, shop seized.",
          detay: "Years of savings gone in one afternoon.",
        },
      },
      {
        metin: "Refuse, keep one honest ledger.",
        basariliSonuc: {
          mesaj: "You stayed honest; audits don't worry you.",
          detay: "Called too cautious; you sleep easy.",
        },
        basarisizSonuc: {
          mesaj: "Your partner wouldn't accept it and dissolved the firm.",
          detay: "It cost the partnership, not your conscience.",
        },
      },
    ],
  },

  oc_tuccar_kizinin_cehizi: {
    baslik: "Your Daughter's Dowry",
    metin:
      "Your daughter is of age and a good family asks for her. But the dowry takes nearly all your savings.",
    secenekler: [
      {
        metin: "Spend all savings on the dowry.",
        basariliSonuc: {
          mesaj: "The wedding was grand; your daughter began a happy life.",
          detay: "Capital gone, but her joy was worth it.",
        },
        basarisizSonuc: {
          mesaj: "The dowry was paid, yet the groom's family sneered.",
          detay: "You did your best; it wasn't enough.",
        },
      },
      {
        metin: "Offer a more modest dowry.",
        basariliSonuc: {
          mesaj: "They accepted; the wedding was plain but warm.",
          detay: "Your daughter said she's proud of you.",
        },
        basarisizSonuc: {
          mesaj: "The family found it too little; the match fell through.",
          detay: "Her disappointment outweighed the money.",
        },
      },
    ],
  },

  oc_tuccar_yabanci_dil_bilgini: {
    baslik: "A Merchant From a Distant Land",
    metin:
      "A caravan whose language you don't know arrives. No one can communicate, but their goods are clearly valuable.",
    secenekler: [
      {
        metin: "Break the ice with your parrot's mimicry.",
        basariliSonuc: {
          mesaj:
            "Your parrot's mimicry cracked up the caravan; best price struck!",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
      },
      {
        metin: "Hire an interpreter and bargain.",
        basariliSonuc: {
          mesaj: "With the interpreter you got the best goods at the best price.",
          detay: "These merchants are your customers now.",
        },
        basarisizSonuc: {
          mesaj: "The interpreter mistranslated prices; you bought at a loss.",
          detay: "Miscommunication can cost more than money.",
        },
      },
      {
        metin: "Try dealing by signs.",
        basariliSonuc: {
          mesaj: "By gestures you made a small, profitable trade.",
          detay: "No shared language, but shared trade.",
        },
        basarisizSonuc: {
          mesaj: "A misunderstanding left you with a good you didn't want.",
          detay: "Silence led to misunderstanding.",
        },
      },
    ],
  },

  oc_tuccar_deniz_firtinasi: {
    baslik: "The Ship in the Storm",
    metin:
      "Your chartered ship is caught in a great storm. The captain says it may sink unless part of the cargo goes overboard.",
    secenekler: [
      {
        metin: "Let him throw half the cargo.",
        basariliSonuc: {
          mesaj: "The ship and remaining cargo weathered the storm.",
          detay: "Heavy loss, but not everything.",
        },
        basarisizSonuc: {
          mesaj: "The jettisoned cargo wasn't enough; the ship was badly damaged.",
          detay: "Cargo gone, repairs on you.",
        },
      },
      {
        metin: "Throw nothing; take the risk.",
        basariliSonuc: {
          mesaj: "The ship miraculously survived with all its cargo.",
          detay: "The captain won't sail with you again, but you won.",
        },
        basarisizSonuc: {
          mesaj: "The ship sank; cargo, some crew and your investment lost.",
          detay: "One of your worst weeks in trade.",
        },
      },
    ],
  },

  "oc_tuccar_haraç_talebi": {
    baslik: "The Toll-Taking Lordling",
    metin:
      "A lordling whose lands you cross demands an arbitrary 'toll'. It's illegal, but he has armed men.",
    secenekler: [
      {
        metin: "Pay and move on.",
        basariliSonuc: {
          mesaj: "You paid and passed without trouble.",
          detay: "He'll be here again next time.",
        },
        basarisizSonuc: {
          mesaj: "The lordling doubled the levy, saying you 'forgot' it.",
          detay: "No bargaining against arbitrary power.",
        },
      },
      {
        metin: "Refuse, complain to the authorities.",
        basariliSonuc: {
          mesaj: "Your complaint worked; the lordling was warned, the levy lifted.",
          detay: "Other merchants thanked you.",
        },
        basarisizSonuc: {
          mesaj: "The lordling's men 'taught you a lesson' on the road.",
          detay: "The authorities came too late.",
        },
      },
    ],
  },

  oc_tuccar_kalp_para_uretimi: {
    baslik: "Striking Counterfeit Coin",
    metin:
      "A goldsmith says he can strike perfect counterfeit coins. Partner up and you get rich, or hanged.",
    secenekler: [
      {
        metin: "Accept the partnership.",
        basariliSonuc: {
          mesaj: "The fakes circulated freely; your fortune multiplied.",
          detay: "Your wealth rests on a lie.",
        },
        basarisizSonuc: {
          mesaj:
            "The guild traced the fakes to you; you were executed for coining.",
        },
      },
      {
        metin: "Refuse, report the goldsmith.",
        basariliSonuc: {
          mesaj: "Your report broke the counterfeiting ring.",
          detay: "His relatives will never forgive you.",
        },
        basarisizSonuc: {
          mesaj: "Your report lacked proof; he accused you of slander.",
          detay: "You told the truth; no one believed it.",
        },
      },
    ],
  },

  oc_tuccar_kervan_rehberi_ihanet: {
    baslik: "Your Guide's Suspicious Route",
    metin:
      "Your guide urges a deserted shortcut over the main road. It saves time, but you don't know why he insists.",
    secenekler: [
      {
        metin: "Trust the guide, take the shortcut.",
        basariliSonuc: {
          mesaj: "The shortcut worked; you beat your rivals to market.",
          detay: "Maybe he was simply a good guide.",
        },
        basarisizSonuc: {
          mesaj: "The shortcut was a trap; the guide was in league with bandits.",
          detay: "Goods gone, guide vanished.",
        },
      },
      {
        metin: "Take the main road anyway.",
        basariliSonuc: {
          mesaj: "You arrived safely; the guide sulked.",
          detay: "Trusting your instincts paid off.",
        },
        basarisizSonuc: {
          mesaj: "The main road was blocked too; delay cost you customers.",
          detay: "Caution has a price too.",
        },
      },
    ],
  },

  oc_tuccar_zanaatkar_cirak_kapma: {
    baslik: "A Talented Apprentice",
    metin:
      "You spot an exceptionally gifted apprentice working for a rival master. Poaching him makes an enemy of his master.",
    secenekler: [
      {
        metin: "Secretly offer the apprentice more.",
        basariliSonuc: {
          mesaj: "He accepted; your work's quality rose.",
          detay: "His old master sulks; he's worth it.",
        },
        basarisizSonuc: {
          mesaj: "He told his master; you're branded an unscrupulous rival.",
          detay: "The guild frowns on poaching.",
        },
      },
      {
        metin: "Stay honest, train your own.",
        basariliSonuc: {
          mesaj: "You trained your own; slow, but fully loyal.",
          detay: "Slow-growing trees root deepest.",
        },
        basarisizSonuc: {
          mesaj: "Your apprentice proved untalented; time wasted.",
          detay: "Not every investment pays off.",
        },
      },
    ],
  },

  oc_tuccar_dilenci_gercek_kimlik: {
    baslik: "A Noble in Disguise",
    metin:
      "You gave alms to a beggar; he was a noble in disguise, testing tradesmen's honesty.",
    secenekler: [
      {
        metin: "Be modest, accept the reward.",
        basariliSonuc: {
          mesaj: "The noble rewarded your honesty; your name spread.",
          detay: "Your tale was told for months.",
        },
        basarisizSonuc: {
          mesaj: "The noble was pleased, but the reward was small.",
          detay: "You hoped for more; not bad.",
        },
      },
      {
        metin: "Seize the chance, ask him for business.",
        basariliSonuc: {
          mesaj: "He liked your frankness and made you palace supplier.",
          detay: "Now you sell to the palace kitchen too.",
        },
        basarisizSonuc: {
          mesaj: "The noble called it insolence and left quietly.",
          detay: "Pushing a chance can lose what you have.",
        },
      },
    ],
  },

  oc_tuccar_kutu_pazarlik_yarismasi: {
    baslik: "The Bargaining Contest",
    metin:
      "The festival hosts a 'best bargainer' contest; the loser is mocked, the winner famed citywide.",
    secenekler: [
      {
        metin: "Enter the contest.",
        basariliSonuc: {
          mesaj: "You made your rival sell a goat for two stones; the crowd cheered.",
          detay: "Now you're 'master of the bargain'.",
        },
        basarisizSonuc: {
          mesaj: "Your rival beat you; the crowd laughed at you.",
          detay: "You're the joke, but you had courage.",
        },
      },
      {
        metin: "Stay a spectator.",
        basariliSonuc: {
          mesaj: "You watched, enjoyed it, risked nothing.",
          detay: "Sometimes watching is enough.",
        },
        basarisizSonuc: {
          mesaj: "A pickpocket lightened your purse during the show.",
          detay: "Even watching needs attention.",
        },
      },
    ],
  },

  oc_tuccar_kalpazan_teklifi: {
    baslik: "A Counterfeit Coin Offer",
    metin:
      "A shady acquaintance offers a share in pushing counterfeit coins. Dizzying gain, but execution if caught.",
    secenekler: [
      {
        metin: "Accept, join the venture.",
        basariliSonuc: {
          mesaj: "The fakes went unnoticed; your coffer overflowed.",
          detay: "Some riches come with dangerous secrets.",
        },
        basarisizSonuc: {
          mesaj: "Guards raided the mint! You fled, but traces cling.",
          detay: "Coining always comes out.",
        },
      },
      {
        metin: "Refuse, tell the tradesmen's guild.",
        basariliSonuc: {
          mesaj:
            "Your report broke the ring; the guild calls you honest.",
          detay: "Honesty paid off in the guild.",
        },
        basarisizSonuc: {
          mesaj: "Your report was ignored, but your conscience is clear.",
          detay: "Not every right step is rewarded.",
        },
      },
    ],
  },

  oc_tuccar_veba_firsatciligi: {
    baslik: "Prices in Time of Plague",
    metin:
      "As plague ravages the city, your herbs and grain are worth gold. Raise prices tenfold or keep them fair.",
    secenekler: [
      {
        metin: "Raise prices as high as possible.",
        basariliSonuc: {
          mesaj: "The panicked paid any price; your coffer never filled so full.",
          detay: "Your gain rests on desperation.",
        },
        basarisizSonuc: {
          mesaj: "Word of your prices spread; an angry mob looted the shop.",
          detay: "Greed finds its punishment.",
        },
      },
      {
        metin: "Keep prices fair; discount the needy.",
        basariliSonuc: {
          mesaj:
            "Your fair prices became a byword for honesty for generations.",
          detay: "Some riches outlast money.",
        },
        basarisizSonuc: {
          mesaj: "Stocks ran out fast; nothing left even for your family.",
          detay: "Kindness is sometimes paid from your own pocket.",
        },
      },
    ],
  },

  oc_tuccar_yabanci_ortak: {
    baslik: "A Partnership From a Distant Land",
    metin:
      "A merchant of another tongue and faith offers a profitable long-term partnership. Some local tradesmen will resent dealing with the 'other'.",
    secenekler: [
      {
        metin: "Accept the partnership.",
        basariliSonuc: {
          mesaj:
            "It proved profitable; new markets opened, some tradesmen condemned you.",
          detay: "Some bridges enrich you and close doors.",
        },
        basarisizSonuc: {
          mesaj:
            "Language and custom clashes soured the deal; little gain.",
          detay: "Not every bridge holds at first.",
        },
      },
      {
        metin: "Refuse, work only with locals.",
        basariliSonuc: {
          mesaj: "You refused; locals cheered you as 'one of us'.",
          detay: "Some security comes from familiarity.",
        },
        basarisizSonuc: {
          mesaj:
            "You watched that partnership enrich your rival.",
          detay: "Missed chances hurt more from afar.",
        },
      },
    ],
  },

  oc_tuccar_rakip_lonca_sabotaj: {
    baslik: "Rival Sabotage",
    metin:
      "Someone spoiled goods in your warehouse; traces point to a rival. Retaliate, or gather evidence for the guild.",
    secenekler: [
      {
        metin: "Retaliate, sabotage his goods.",
        basariliSonuc: {
          mesaj:
            "You did the same to him; losses recovered, conscience stained.",
          detay: "It's nothing but theft.",
        },
        basarisizSonuc: {
          mesaj: "Caught at the door; your rival exposed you in the market.",
          detay:
            "Now you're the 'thieving trader'.",
        },
      },
      {
        metin: "Gather evidence, complain to the guild.",
        basariliSonuc: {
          mesaj: "The guild found the rival guilty; losses compensated.",
          detay: "A clean win earned the market's trust.",
        },
        basarisizSonuc: {
          mesaj: "Evidence was insufficient; the complaint's cost was wasted.",
          detay: "Right path, no result; clear conscience.",
        },
      },
    ],
  },

  oc_tuccar_enkaz_hak_iddiasi: {
    baslik: "Cargo from the Wreck",
    metin:
      "You find valuable goods in a beached wreck. A surviving sailor says they're from his ship and would free his family from debt.",
    secenekler: [
      {
        metin: "Claim it all; finders keepers.",
        basariliSonuc: {
          mesaj:
            "You took the goods; legally, what's found ashore is yours.",
          detay: "Purse full; that look lingers.",
        },
        basarisizSonuc: {
          mesaj: "The sailor told the tale; your greed became town talk.",
          detay: "They now call you the 'wreck crow'.",
        },
      },
      {
        metin: "Split the cargo fairly with him.",
        basariliSonuc: {
          mesaj: "You split the cargo; the sailor shook your hand gratefully.",
          detay: "This deal may help you someday.",
        },
        basarisizSonuc: {
          mesaj: "The sailor balked at his share; the deal closed at your loss.",
          detay: "You couldn't please all; conscience clear.",
        },
      },
      {
        metin: "Return everything to the sailor.",
        basariliSonuc: {
          mesaj: "You even paid transport and delivered it all.",
          detay: "He wept; the harbor will tell this tale.",
        },
        basarisizSonuc: {
          mesaj: "The boat capsized; part of the goods returned to the sea.",
          detay: "Doing right sometimes costs extra.",
        },
      },
    ],
  },

  oc_tuccar_cirak_hirsizlik: {
    baslik: "The Apprentice's Betrayal",
    metin:
      "You learn your longtime apprentice has stolen from the till. He begs, saying his family is starving.",
    secenekler: [
      {
        metin: "Report him to the guild.",
        basariliSonuc: {
          mesaj: "Some money recovered; he was sent to the guild court.",
          detay: "Justice done, but his face haunts you.",
        },
        basarisizSonuc: {
          mesaj: "The guild refused: 'weak evidence, harsh penalty'.",
          detay: "You gained neither money nor standing.",
        },
      },
      {
        metin: "Forgive him, cover the money, help his family.",
        basariliSonuc: {
          mesaj:
            "You forgave him and fed his family; he stayed loyal for life.",
          detay: "Some investments return more lasting than gold.",
        },
        basarisizSonuc: {
          mesaj: "You forgave him, yet he vanished one night anyway.",
          detay: "Your kindness went unrewarded.",
        },
      },
    ],
  },

  oc_tuccar_tekelci_teklif: {
    baslik: "The Monopoly Deal",
    metin:
      "A distant trader offers a spice monopoly if you become his sole supplier, dropping all other suppliers.",
    secenekler: [
      {
        metin: "Accept, put all eggs in one basket.",
        basariliSonuc: {
          mesaj: "The deal held; the city's spice trade is yours.",
          detay: "Dependence on one route unsettles you.",
        },
        basarisizSonuc: {
          mesaj:
            "The trader vanished; your old suppliers turned away too.",
          detay: "All the eggs broke at once.",
        },
      },
      {
        metin: "Refuse, keep varied suppliers.",
        basariliSonuc: {
          mesaj: "You kept the old way; modest but safe gains.",
          detay: "You depend on no single supplier.",
        },
        basarisizSonuc: {
          mesaj: "Another trader took the monopoly; you watched him get rich.",
          detay: "Caution can leave envious regret.",
        },
      },
    ],
  },

  oc_tuccar_sehir_berati_rusveti: {
    baslik: "The Marketplace Charter",
    metin:
      "A stall spot opens at the city's busiest corner. The clerk wants a bribe for the charter; the legal route has a long queue and slim odds.",
    secenekler: [
      {
        metin: "Pay the bribe, take the spot.",
        basariliSonuc: {
          mesaj: "The best corner is yours; the clerk pocketed the bribe.",
          detay: "You know money won it, not merit.",
        },
        basarisizSonuc: {
          mesaj: "An inspector overheard the bribe; scandal swept the market.",
          detay: "Money, spot and name gone in one afternoon.",
        },
      },
      {
        metin: "Apply legally, trust the draw.",
        basariliSonuc: {
          mesaj: "The draw favored you; the council praised its fairness.",
          detay: "Waiting was hard, but no secrets behind it.",
        },
        basarisizSonuc: {
          mesaj: "The draw failed; the corner went to a bribing trader.",
          detay: "Honesty unrewarded, but conscience clear.",
        },
      },
    ],
  },

  oc_tuccar_borclu_soylu: {
    baslik: "The Noble Who Won't Pay",
    metin:
      "A noble hasn't paid for goods in months. You must remind him, but merchants who speak boldly to nobles can lose their heads.",
    secenekler: [
      {
        metin: "Tell him to his face, demand payment.",
        basariliSonuc: {
          mesaj: "The noble, shamed, paid in cash; other nobles heard.",
          detay: "You were lucky this time.",
        },
        basarisizSonuc: {
          mesaj: "The noble called you insolent and threw you out; the debt is lost.",
          detay: "Raising your voice is costly at some doors.",
        },
      },
      {
        metin: "Wait, send polite reminders.",
        basariliSonuc: {
          mesaj: "Months later the noble sent part of the debt.",
          detay: "Patience partly paid off.",
        },
        basarisizSonuc: {
          mesaj:
            "The noble died; heirs denied the debt, wiping out your claim.",
          detay: "Some debts never come back.",
        },
      },
    ],
  },

  oc_tuccar_fiyat_sabitleme_karteli: {
    baslik: "The Secret Arrangement",
    metin:
      "The big traders propose secretly raising grain prices together as a cartel. Your profit is sure, but the people go hungrier.",
    secenekler: [
      {
        metin: "Join, take your cartel share.",
        basariliSonuc: {
          mesaj: "Prices rose together; profit secured, bread lines grew.",
          detay:
            "You try not to hear the hungry children.",
        },
        basarisizSonuc: {
          mesaj: "The cartel was exposed; an angry mob stormed your shop.",
          detay: "Secrets surface; you paid first.",
        },
      },
      {
        metin: "Refuse, report to the council.",
        basariliSonuc: {
          mesaj:
            "Your report broke the cartel; the people call you 'bread's guardian'.",
          detay: "The people's trust beats the traders' pardon.",
        },
        basarisizSonuc: {
          mesaj: "Report deemed baseless; the traders shunned and boycotted you.",
          detay: "You did right and paid alone.",
        },
      },
    ],
  },

  oc_tuccar_korsan_fidyesi: {
    baslik: "The Pirate's Ransom",
    metin:
      "Pirates seize your ship in the Mediterranean and hold your crew for ransom. Unpaid, they'll be sold as slaves.",
    secenekler: [
      {
        metin: "Pay the ransom, free the crew.",
        basariliSonuc: {
          mesaj:
            "Ransom paid, crew freed; your men are loyal for life.",
          detay: "Lighter purse, easier conscience.",
        },
        basarisizSonuc: {
          mesaj: "Pirates took the money, broke their word, and killed a sailor.",
          detay: "Even ransom guarantees nothing.",
        },
      },
      {
        metin: "Don't pay; leave the crew to fate.",
        basariliSonuc: {
          mesaj:
            "You skipped the ransom and recouped elsewhere, but the crew was sold.",
          detay: "Your purse is spared; faces haunt your dreams.",
        },
        basarisizSonuc: {
          mesaj:
            "Word spread; no sailor boards your ship, which rots crewless.",
          detay: "Shirking sacrifice has a price.",
        },
      },
    ],
  },
};
