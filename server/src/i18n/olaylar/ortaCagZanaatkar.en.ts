import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagZanaatkar.ts — İngilizce çevirileri (20 olay). */
export const OLAYLAR_ORTACAG_ZANAATKAR_EN: Record<string, OlayCeviri> = {
  oc_zanaatkar_musteri_pazarligi: {
    baslik: "A Hard Bargain",
    metin: "A customer is trying to get your labor for almost half its worth.",
    secenekler: [
      {
        metin: "Hold your price, even if it costs you the sale.",
        basariliSonuc: {
          mesaj: "The customer finally accepted your price; you knew the worth of your labor.",
          detay: "One who knows their own worth makes others know it too.",
        },
        basarisizSonuc: {
          mesaj: "The customer gave up and went to another craftsman.",
          detay: "Not every bargain is won.",
        },
      },
      {
        metin: "Lower the price, don't lose the work.",
        basariliSonuc: {
          mesaj: "You got the job, but didn't get the full worth of your labor.",
          detay: "Sometimes earning little is better than earning nothing.",
        },
        basarisizSonuc: {
          mesaj: "Despite the discount, the customer still backed out.",
          detay: "Some customers can't be convinced at any price.",
        },
      },
    ],
  },
  oc_zanaatkar_malzeme_kitligi: {
    baslik: "Material Shortage",
    metin: "The raw materials you use have grown scarce; merchants have doubled their prices.",
    secenekler: [
      {
        metin: "Buy the material even at the high price — don't let your work fall behind.",
        basariliSonuc: {
          mesaj: "Your work didn't fall behind, your customers stayed satisfied.",
          detay: "Consistency is the sturdiest foundation of reputation.",
        },
        basarisizSonuc: {
          mesaj: "The material turned out to be poor quality; your money was wasted.",
          detay: "Not everyone turns opportunist in a shortage, but some do.",
        },
      },
      {
        metin: "Make do with an alternative, lower-quality material.",
        basariliSonuc: {
          mesaj: "You made do; no one noticed.",
          detay: "Sometimes creativity is born of hardship.",
        },
        basarisizSonuc: {
          mesaj: "The drop in quality was noticed; a few customers took offense.",
          detay: "Every stopgap measure has its price.",
        },
      },
    ],
  },
  oc_zanaatkar_rakip_usta: {
    baslik: "The Rival Master's Shadow",
    metin: "A newly opened workshop in the marketplace has started drawing away some of your customers.",
    secenekler: [
      {
        metin: "Set yourself apart with better service and quality.",
        basariliSonuc: {
          mesaj: "You competed on quality; your old customers came back.",
          detay: "Goodness is the most lasting advertisement.",
        },
        basarisizSonuc: {
          mesaj: "Your efforts weren't enough; you lost a few customers.",
          detay: "Competition can be merciless sometimes.",
        },
      },
    ],
  },
  oc_zanaatkar_yangin_riski: {
    baslik: "A Spark from the Forge",
    metin: "A spark leaping from your workshop's forge landed on a pile of straw.",
    secenekler: [
      {
        metin: "Act immediately.",
        basariliSonuc: {
          mesaj: "You put out the fire quickly, escaping with a small burn.",
          detay: "Quick reflexes sometimes save everything.",
        },
        basarisizSonuc: {
          mesaj: "A corner of your workshop burned; the repairs cost dearly.",
          detay: "For one who works with fire, fire remains the greatest enemy.",
        },
      },
    ],
  },
  oc_zanaatkar_soylu_hedive: {
    baslik: "The Noble's Gift",
    metin: "A local noble, impressed by your work, wants to commission a special gift from you.",
    secenekler: [
      {
        metin: "Do the very best you can.",
        basariliSonuc: {
          mesaj: "The noble was thrilled with your work; your name reached all the way to the palace.",
          detay: "Impressing the right person opens doors.",
        },
        basarisizSonuc: {
          mesaj: "The noble didn't like the work, and delayed payment on top of it.",
          detay: "High expectations can bring high disappointment.",
        },
      },
    ],
  },
  oc_zanaatkar_ekip_hirsizligi: {
    baslik: "The Missing Material",
    metin: "A valuable material has gone missing from your workshop; suspicion falls on one of your workers.",
    secenekler: [
      {
        metin: "Investigate quietly, don't accuse anyone outright.",
        basariliSonuc: {
          mesaj: "You found the material in a corner; you solved the problem without accusing anyone.",
          detay: "A patient investigation usually works.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't find the material; an air of distrust settled over your workshop.",
          detay: "Suspicion slowly gnaws away at friendship.",
        },
      },
    ],
  },
  oc_zanaatkar_pazar_gunu: {
    baslik: "Market Day Crowds",
    metin: "You've set up your stall on market day; the crowd is big but so are the rival stalls everywhere.",
    secenekler: [
      {
        metin: "Call out and promote your work loudly.",
        basariliSonuc: {
          mesaj: "Your voice drew attention; you gained a few new customers.",
          detay: "Sometimes making noise pays off.",
        },
        basarisizSonuc: {
          mesaj: "The crowd stayed indifferent; the day passed quietly.",
          detay: "Not every market day is bountiful.",
        },
      },
    ],
  },
  oc_zanaatkar_alet_calinmasi: {
    baslik: "Your Tools Were Stolen",
    metin: "Someone broke into your workshop overnight and stole your most valuable tools.",
    secenekler: [
      {
        metin: "Borrow money to buy new tools.",
        basariliSonuc: {
          mesaj: "With new tools, you picked your work back up where you left off.",
          detay: "Every loss is a chance to start anew.",
        },
        basarisizSonuc: {
          mesaj: "Finding a loan was harder than you thought; your work fell behind for a while.",
          detay: "Losses sometimes come in a chain.",
        },
      },
    ],
  },
  oc_zanaatkar_hava_kotu: {
    baslik: "Bad Weather",
    metin: "Relentless rain is hurting both material supply and customer traffic.",
    secenekler: [
      {
        metin: "Wait it out patiently, keep working.",
        basariliSonuc: {
          mesaj: "You made do until the weather cleared, without any great loss.",
          detay: "Patience is the cheapest solution.",
        },
        basarisizSonuc: {
          mesaj: "The long spell of bad weather set your work back considerably.",
          detay: "Nature can be merciless at times.",
        },
      },
    ],
  },
  oc_zanaatkar_komsu_atolye_yangini: {
    baslik: "Fire in the Neighboring Workshop",
    metin: "A fire breaking out in the workshop next door could quickly spread to yours too.",
    secenekler: [
      {
        metin: "Help put out the fire.",
        basariliSonuc: {
          mesaj: "Your help kept the fire from spreading; your neighbors were grateful.",
          detay: "Standing by someone in hard times builds lasting friendships.",
        },
        basarisizSonuc: {
          mesaj: "The fire spread to your workshop too, causing a little damage.",
          detay: "Fire sometimes strikes its neighbors too.",
        },
      },
    ],
  },
  oc_zanaatkar_dedikodu_hedefi: {
    baslik: "Gossip in the Marketplace",
    metin: "A baseless rumor about your work has started circulating in the marketplace.",
    secenekler: [
      {
        metin: "Ignore the gossip, focus on your work.",
        basariliSonuc: {
          mesaj: "The gossip died down on its own; your business was unaffected.",
          detay: "Sometimes the best answer is silence.",
        },
        basarisizSonuc: {
          mesaj: "The gossip spread; a few customers questioned you about it.",
          detay: "Rumor sometimes travels truly fast.",
        },
      },
      {
        metin: "Find who started the gossip, confront them.",
        basariliSonuc: {
          mesaj: "You found the source and confronted them; the gossip stopped.",
          detay: "Some problems are solved head-on.",
        },
        basarisizSonuc: {
          mesaj: "You accused the wrong person; the matter grew even bigger.",
          detay: "Acting in anger sometimes makes things worse.",
        },
      },
    ],
  },
  oc_zanaatkar_yabanci_tuccar: {
    baslik: "A Merchant from Distant Lands",
    metin: "A merchant from a distant land offers to buy your goods wholesale and sell them in his own country.",
    secenekler: [
      {
        metin: "Accept the deal.",
        basariliSonuc: {
          mesaj: "The deal went well; your work is now known in distant lands too.",
          detay: "Some opportunities come from very far away.",
        },
        basarisizSonuc: {
          mesaj: "The merchant didn't keep his word; he delayed payment.",
          detay: "Deals made with distant partners are risky.",
        },
      },
    ],
  },
  oc_zanaatkar_dini_bagis_talebi: {
    baslik: "The Church's Call for Donations",
    metin: "The local house of worship is asking craftsmen for donations toward its repair.",
    secenekler: [
      {
        metin: "Give generously.",
        basariliSonuc: {
          mesaj: "Your donation earned praise; you were spoken of well among the congregation.",
          detay: "Sharing nourishes reputation.",
        },
        basarisizSonuc: {
          mesaj: "Your donation was thought modest, but appreciated all the same.",
          detay: "Every contribution carries meaning.",
        },
      },
      {
        metin: "Don't donate; say you have no money.",
        basariliSonuc: {
          mesaj: "You didn't donate; the money stayed in your pocket.",
          detay: "Everyone sets their own priorities.",
        },
        basarisizSonuc: {
          mesaj: "Your stinginess became the talk of the marketplace.",
          detay: "Some silences are heard all the same.",
        },
      },
    ],
  },
  oc_zanaatkar_kiskanc_esnaf: {
    baslik: "A Jealous Shopkeeper",
    metin: "The shopkeeper at the neighboring stall, jealous of your success, is trying to steal your customers.",
    secenekler: [
      {
        metin: "Stay calm, focus on your work.",
        basariliSonuc: {
          mesaj: "Your patience paid off; your customers stayed loyal to you.",
          detay: "Jealousy is silenced by quality.",
        },
        basarisizSonuc: {
          mesaj: "You noticed some customers really had drifted away.",
          detay: "Competition can be merciless.",
        },
      },
    ],
  },
  oc_zanaatkar_deprem_hasari: {
    baslik: "A Small Earthquake",
    metin: "A small earthquake shaking the city caused some damage to your workshop.",
    secenekler: [
      {
        metin: "Repair the damage right away.",
        basariliSonuc: {
          mesaj: "The repair was finished without trouble; you picked your work back up where you'd left it.",
          detay: "A quick response limits the loss.",
        },
        basarisizSonuc: {
          mesaj: "A minor accident happened during the repair.",
          detay: "Not everything is easy after ruin.",
        },
      },
    ],
  },
  oc_zanaatkar_ogrenci_ayrilik: {
    baslik: "Your Apprentice's Departure",
    metin: "Your apprentice, who's worked at your side for a long time, wants to leave and open his own workshop.",
    secenekler: [
      {
        metin: "See him off with a clear conscience.",
        basariliSonuc: {
          mesaj: "Your apprentice left grateful; the bond between you endured.",
          detay: "A good master lets his student fly.",
        },
        basarisizSonuc: {
          mesaj: "The parting saddened you a little; filling the gap took time.",
          detay: "Every parting leaves an emptiness.",
        },
      },
    ],
  },
  oc_zanaatkar_zengin_bekleyen_musteri: {
    baslik: "An Impatient Wealthy Customer",
    metin: "A wealthy customer wants their work done first, without waiting their turn.",
    secenekler: [
      {
        metin: "Break the queue, prioritize them.",
        basariliSonuc: {
          mesaj: "The customer was pleased and left a generous tip.",
          detay: "Sometimes flexibility pays off.",
        },
        basarisizSonuc: {
          mesaj: "The other customers felt they'd been wronged.",
          detay: "Privilege, in others' eyes, is injustice.",
        },
      },
      {
        metin: "Make them wait their turn, be fair.",
        basariliSonuc: {
          mesaj: "Your fair conduct earned the trust of your other customers.",
          detay: "Fairness pays off more in the long run.",
        },
        basarisizSonuc: {
          mesaj: "The wealthy customer took offense and gave the work to another craftsman.",
          detay: "Some customers want special treatment.",
        },
      },
    ],
  },
  oc_zanaatkar_uzun_kis: {
    baslik: "A Long Winter",
    metin: "This year's winter is dragging on longer and harsher than usual; material and customers are both scarce.",
    secenekler: [
      {
        metin: "Use your savings to get through the winter.",
        basariliSonuc: {
          mesaj: "You got through the winter without hardship; your business recovered by spring.",
          detay: "Saving is a shield for hard times.",
        },
        basarisizSonuc: {
          mesaj: "The winter was harsher than expected; your health suffered a little.",
          detay: "Nature can be merciless at times.",
        },
      },
    ],
  },
  oc_zanaatkar_hirsizlik_ithami: {
    baslik: "An Unjust Accusation",
    metin: "A customer accuses you of theft, claiming he never received the piece he paid for.",
    secenekler: [
      {
        metin: "Defend yourself with your witnesses.",
        basariliSonuc: {
          mesaj: "Your witnesses proved you right; the slander came to nothing.",
          detay: "Honesty is the best defense.",
        },
        basarisizSonuc: {
          mesaj: "The claim couldn't be proven, but a shadow fell on your name all the same.",
          detay: "Some stains never fully wash out.",
        },
      },
    ],
  },
  oc_zanaatkar_kutlama_siparisi: {
    baslik: "A Wedding Order",
    metin: "Special decorations have been commissioned for a grand wedding in the city; they need to be finished quickly.",
    secenekler: [
      {
        metin: "Work day and night to finish in time.",
        basariliSonuc: {
          mesaj: "You finished the order on time; your work was praised at the wedding.",
          detay: "Exhaustion is sometimes rewarded with great success.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't finish in time; you lost both money and reputation.",
          detay: "Not every race is finished on time.",
        },
      },
    ],
  },
};
