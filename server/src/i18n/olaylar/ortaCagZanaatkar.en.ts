import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagZanaatkar.ts — İngilizce çevirileri (20 olay). */
export const OLAYLAR_ORTACAG_ZANAATKAR_EN: Record<string, OlayCeviri> = {
  oc_zanaatkar_musteri_pazarligi: {
    baslik: "A Hard Bargain",
    metin: "A customer tries to buy your labor at half price.",
    secenekler: [
      {
        metin: "Hold your price; risk the sale.",
        basariliSonuc: {
          mesaj: "The customer accepted your price; you knew your worth.",
          detay: "Know your worth, and others will.",
        },
        basarisizSonuc: {
          mesaj: "The customer went to another craftsman.",
          detay: "Not every bargain is won.",
        },
      },
      {
        metin: "Drop the price; keep the job.",
        basariliSonuc: {
          mesaj: "You got the job but not its full worth.",
          detay: "Earning little beats earning nothing.",
        },
        basarisizSonuc: {
          mesaj: "Despite the discount, the customer backed out.",
          detay: "Some can't be satisfied at any price.",
        },
      },
    ],
  },
  oc_zanaatkar_malzeme_kitligi: {
    baslik: "Material Shortage",
    metin: "Raw material grew scarce; merchants doubled their prices.",
    secenekler: [
      {
        metin: "Buy the material at any price.",
        basariliSonuc: {
          mesaj: "Your work didn't stall; customers stayed happy.",
          detay: "Consistency is reputation's foundation.",
        },
        basarisizSonuc: {
          mesaj: "The material was poor; your money was wasted.",
          detay: "In shortages, some turn opportunist.",
        },
      },
      {
        metin: "Make do with cheaper material.",
        basariliSonuc: {
          mesaj: "You made do; no one noticed.",
          detay: "Creativity is born of hardship.",
        },
        basarisizSonuc: {
          mesaj: "The poor quality showed; some customers left.",
          detay: "Every stopgap has its price.",
        },
      },
    ],
  },
  oc_zanaatkar_rakip_usta: {
    baslik: "The Rival Master's Shadow",
    metin: "A new workshop in the market is drawing away your customers.",
    secenekler: [
      {
        metin: "Stand out with better service and quality.",
        basariliSonuc: {
          mesaj: "You won on quality; old customers returned.",
          detay: "Goodness is the most lasting advertisement.",
        },
        basarisizSonuc: {
          mesaj: "Your effort fell short; you lost a few customers.",
          detay: "Competition can be merciless.",
        },
      },
    ],
  },
  oc_zanaatkar_yangin_riski: {
    baslik: "A Spark from the Forge",
    metin: "A spark from your forge landed on a pile of straw.",
    secenekler: [
      {
        metin: "Act at once.",
        basariliSonuc: {
          mesaj: "You doused the fire with only a small burn.",
          detay: "Quick reflexes can save everything.",
        },
        basarisizSonuc: {
          mesaj: "A corner of the workshop burned; repairs were costly.",
          detay: "Fire is a fire-worker's greatest enemy.",
        },
      },
    ],
  },
  oc_zanaatkar_soylu_hedive: {
    baslik: "The Noble's Gift",
    metin: "A local noble, impressed by your work, wants to commission a special gift.",
    secenekler: [
      {
        metin: "Do your very best.",
        basariliSonuc: {
          mesaj: "The noble was thrilled; your name reached the palace.",
          detay: "Impressing the right person opens doors.",
        },
        basarisizSonuc: {
          mesaj: "The noble disliked the piece and delayed payment.",
          detay: "High expectations bring high disappointment.",
        },
      },
    ],
  },
  oc_zanaatkar_ekip_hirsizligi: {
    baslik: "The Missing Material",
    metin: "A valuable material vanished from your workshop; suspicion falls on a worker.",
    secenekler: [
      {
        metin: "Investigate quietly; don't accuse.",
        basariliSonuc: {
          mesaj: "You found it in a corner and accused no one.",
          detay: "Patient inquiry usually works.",
        },
        basarisizSonuc: {
          mesaj: "The material stayed missing; distrust took hold.",
          detay: "Suspicion gnaws at friendship.",
        },
      },
    ],
  },
  oc_zanaatkar_pazar_gunu: {
    baslik: "Market Day Crowds",
    metin: "You set up your stall on market day; big crowd, but rival stalls everywhere.",
    secenekler: [
      {
        metin: "Promote your work loudly.",
        basariliSonuc: {
          mesaj: "Your voice drew attention; a few new customers came.",
          detay: "Sometimes noise pays off.",
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
    metin: "Someone broke into your workshop overnight and stole your best tools.",
    secenekler: [
      {
        metin: "Borrow money for new tools.",
        basariliSonuc: {
          mesaj: "With new tools, you resumed your work.",
          detay: "Every loss is a fresh start.",
        },
        basarisizSonuc: {
          mesaj: "Finding a loan was hard; work stalled for a while.",
          detay: "Losses sometimes come in chains.",
        },
      },
    ],
  },
  oc_zanaatkar_hava_kotu: {
    baslik: "Bad Weather",
    metin: "Relentless rain disrupts material supply and customer traffic.",
    secenekler: [
      {
        metin: "Wait patiently and keep working.",
        basariliSonuc: {
          mesaj: "You made do until the weather cleared; no great loss.",
          detay: "Patience is the cheapest fix.",
        },
        basarisizSonuc: {
          mesaj: "The long bad weather set your work back.",
          detay: "Nature can be merciless.",
        },
      },
    ],
  },
  oc_zanaatkar_komsu_atolye_yangini: {
    baslik: "Fire in the Neighboring Workshop",
    metin: "A fire in the next workshop could quickly spread to yours.",
    secenekler: [
      {
        metin: "Help put out the fire.",
        basariliSonuc: {
          mesaj: "Your help stopped the spread; neighbors are grateful.",
          detay: "Standing by others builds friendships.",
        },
        basarisizSonuc: {
          mesaj: "The fire reached your workshop; minor damage.",
          detay: "Fire strikes neighbors too.",
        },
      },
    ],
  },
  oc_zanaatkar_dedikodu_hedefi: {
    baslik: "Gossip in the Marketplace",
    metin: "A baseless rumor about your work is circulating in the market.",
    secenekler: [
      {
        metin: "Ignore the gossip; focus on work.",
        basariliSonuc: {
          mesaj: "The gossip died on its own; business unaffected.",
          detay: "Sometimes silence is the best answer.",
        },
        basarisizSonuc: {
          mesaj: "The gossip spread; some customers questioned you.",
          detay: "Rumor travels fast.",
        },
      },
      {
        metin: "Find who started it and confront them.",
        basariliSonuc: {
          mesaj: "You found the source and confronted them; it stopped.",
          detay: "Some problems are solved head-on.",
        },
        basarisizSonuc: {
          mesaj: "You accused the wrong person; it grew worse.",
          detay: "Anger makes things worse.",
        },
      },
    ],
  },
  oc_zanaatkar_yabanci_tuccar: {
    baslik: "A Merchant from Distant Lands",
    metin: "A merchant from a far land offers to buy your goods wholesale and sell them abroad.",
    secenekler: [
      {
        metin: "Accept the deal.",
        basariliSonuc: {
          mesaj: "The deal went well; your work is known in distant lands.",
          detay: "Some opportunities come from far away.",
        },
        basarisizSonuc: {
          mesaj: "The merchant broke his word and delayed payment.",
          detay: "Distant deals are risky.",
        },
      },
    ],
  },
  oc_zanaatkar_dini_bagis_talebi: {
    baslik: "The Church's Call for Donations",
    metin: "The local house of worship asks craftsmen for repair donations.",
    secenekler: [
      {
        metin: "Give generously.",
        basariliSonuc: {
          mesaj: "Your donation earned praise; the congregation spoke well of you.",
          detay: "Sharing nourishes reputation.",
        },
        basarisizSonuc: {
          mesaj: "Your donation seemed modest but was appreciated.",
          detay: "Every contribution means something.",
        },
      },
      {
        metin: "Don't donate; say you have no money.",
        basariliSonuc: {
          mesaj: "You gave nothing; the money stayed in your pocket.",
          detay: "Everyone sets their own priorities.",
        },
        basarisizSonuc: {
          mesaj: "Your stinginess became market talk.",
          detay: "Some silences are heard.",
        },
      },
    ],
  },
  oc_zanaatkar_kiskanc_esnaf: {
    baslik: "A Jealous Shopkeeper",
    metin: "The neighboring shopkeeper, jealous of your success, is poaching your customers.",
    secenekler: [
      {
        metin: "Stay calm; focus on your work.",
        basariliSonuc: {
          mesaj: "Your patience paid off; customers stayed loyal.",
          detay: "Jealousy is silenced by quality.",
        },
        basarisizSonuc: {
          mesaj: "You noticed some customers had drifted away.",
          detay: "Competition can be merciless.",
        },
      },
    ],
  },
  oc_zanaatkar_deprem_hasari: {
    baslik: "A Small Earthquake",
    metin: "A small earthquake shook the city and damaged your workshop.",
    secenekler: [
      {
        metin: "Repair the damage at once.",
        basariliSonuc: {
          mesaj: "The repair went smoothly; you resumed your work.",
          detay: "Quick response limits the loss.",
        },
        basarisizSonuc: {
          mesaj: "A minor accident happened during the repair.",
          detay: "Nothing is easy after ruin.",
        },
      },
    ],
  },
  oc_zanaatkar_ogrenci_ayrilik: {
    baslik: "Your Apprentice's Departure",
    metin: "Your long-time apprentice wants to leave and open his own workshop.",
    secenekler: [
      {
        metin: "See him off with a clear conscience.",
        basariliSonuc: {
          mesaj: "Your apprentice left grateful; the bond endured.",
          detay: "A good master lets his student fly.",
        },
        basarisizSonuc: {
          mesaj: "The parting saddened you; filling the gap took time.",
          detay: "Every parting leaves a void.",
        },
      },
    ],
  },
  oc_zanaatkar_zengin_bekleyen_musteri: {
    baslik: "An Impatient Wealthy Customer",
    metin: "A wealthy customer wants their work done first, skipping the queue.",
    secenekler: [
      {
        metin: "Break the queue; put them first.",
        basariliSonuc: {
          mesaj: "The customer was pleased and tipped generously.",
          detay: "Flexibility sometimes pays.",
        },
        basarisizSonuc: {
          mesaj: "Other customers felt wronged.",
          detay: "Privilege looks like injustice to others.",
        },
      },
      {
        metin: "Make them wait their turn; be fair.",
        basariliSonuc: {
          mesaj: "Your fairness won your other customers' trust.",
          detay: "Fairness pays more in the long run.",
        },
        basarisizSonuc: {
          mesaj: "The rich customer took offense and went elsewhere.",
          detay: "Some customers want special treatment.",
        },
      },
    ],
  },
  oc_zanaatkar_uzun_kis: {
    baslik: "A Long Winter",
    metin: "This winter is longer and harsher than usual; material and customers are scarce.",
    secenekler: [
      {
        metin: "Use your savings to survive the winter.",
        basariliSonuc: {
          mesaj: "You weathered the winter; business recovered by spring.",
          detay: "Saving is a shield for hard times.",
        },
        basarisizSonuc: {
          mesaj: "The winter was harsh; your health suffered a little.",
          detay: "Nature can be merciless.",
        },
      },
    ],
  },
  oc_zanaatkar_hirsizlik_ithami: {
    baslik: "An Unjust Accusation",
    metin: "A customer accuses you of theft, claiming he never got the piece he paid for.",
    secenekler: [
      {
        metin: "Defend yourself with your witnesses.",
        basariliSonuc: {
          mesaj: "Your witnesses proved you right; the slander failed.",
          detay: "Honesty is the best defense.",
        },
        basarisizSonuc: {
          mesaj: "The claim went unproven, but your name was shadowed.",
          detay: "Some stains never wash out.",
        },
      },
    ],
  },
  oc_zanaatkar_kutlama_siparisi: {
    baslik: "A Wedding Order",
    metin: "Special decorations were ordered for a grand city wedding; they're needed fast.",
    secenekler: [
      {
        metin: "Work day and night to finish.",
        basariliSonuc: {
          mesaj: "You finished on time; your work was praised at the wedding.",
          detay: "Exhaustion is sometimes rewarded.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't finish; lost money and reputation.",
          detay: "Not every race is finished in time.",
        },
      },
    ],
  },
};
