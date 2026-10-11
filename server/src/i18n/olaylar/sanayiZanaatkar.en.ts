import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiZanaatkar.ts — İngilizce çevirileri (20 olay). */
export const OLAYLAR_SANAYI_ZANAATKAR_EN: Record<string, OlayCeviri> = {
  sd_zanaatkar_fabrika_golgesi: {
    baslik: "In the Shadow of the Factory",
    metin:
      "Giant factories are swallowing small workshops' business one by one.",
    secenekler: [
      {
        metin: "Focus on one handcrafted product.",
        basariliSonuc: {
          mesaj: "Discerning customers kept choosing you.",
          detay: "You needn't sell to everyone.",
        },
        basarisizSonuc: {
          mesaj: "Your customers dwindled; making a living got harder.",
          detay: "Industry's shadow falls heavy on the small.",
        },
      },
      {
        metin: "Apply to the factory, choose security.",
        basariliSonuc: {
          mesaj: "You were hired; steady pay, less freedom.",
          detay: "Security is independence's price.",
        },
        basarisizSonuc: {
          mesaj: "Your application was rejected; back to your own shop.",
          detay: "Not every door is open.",
        },
      },
    ],
  },
  sd_zanaatkar_patent_firsati: {
    baslik: "A Small Invention",
    metin:
      "You devised a clever device that eases your work; a patent will be costly.",
    secenekler: [
      {
        metin: "File for a patent.",
        basariliSonuc: {
          mesaj: "Patent approved; your invention was licensed to a few workshops.",
          detay: "A small idea opens big doors.",
        },
        basarisizSonuc: {
          mesaj: "Application rejected; the expense was wasted.",
          detay: "Bureaucracy outpaces no invention.",
        },
      },
    ],
  },
  sd_zanaatkar_isci_saglik: {
    baslik: "Harsh Working Conditions",
    metin: "Your workers complain of exhaustion; improving conditions is costly.",
    secenekler: [
      {
        metin: "Cut hours, keep wages.",
        basariliSonuc: {
          mesaj: "Morale rose and so did output.",
          detay: "Tired hands produce little.",
        },
        basarisizSonuc: {
          mesaj: "The change didn't help; it only raised costs.",
          detay: "Not every fix pays off at once.",
        },
      },
      {
        metin: "Leave conditions, choose profit.",
        basariliSonuc: {
          mesaj: "Profit rose, but the workers grew discontented.",
          detay: "Short-term gain eats long-term trust.",
        },
        basarisizSonuc: {
          mesaj: "Some of your workers quit.",
          detay: "Ignored problems grow.",
        },
      },
    ],
  },
  sd_zanaatkar_makine_arizasi: {
    baslik: "Unexpected Breakdown",
    metin: "Your most valuable machine broke down; repair is costly and slow.",
    secenekler: [
      {
        metin: "Pay a master for a fast repair.",
        basariliSonuc: {
          mesaj: "Repaired quickly; production kept going.",
          detay: "Acting early cuts the loss.",
        },
        basarisizSonuc: {
          mesaj: "The repair dragged on; you lost orders.",
          detay: "Every breakdown brings delay.",
        },
      },
    ],
  },
  sd_zanaatkar_sergi_daveti: {
    baslik: "Industrial Exhibition",
    metin: "You've been invited to a great industrial exhibition in the city.",
    secenekler: [
      {
        metin: "Exhibit your best work.",
        basariliSonuc: {
          mesaj: "Your piece drew notice; you won important orders.",
          detay: "The right stage, the right eyes.",
        },
        basarisizSonuc: {
          mesaj: "The exhibition brought less notice than hoped.",
          detay: "Not every show pays off.",
        },
      },
    ],
  },
  sd_zanaatkar_cocuk_isci_ikilemi: {
    baslik: "A Cheap Labor Offer",
    metin: "A middleman urges you to employ child workers at very low wages.",
    secenekler: [
      {
        metin: "Refuse the offer.",
        basariliSonuc: {
          mesaj: "You refused; your conscience is clear.",
          detay: "Some gains aren't worth it.",
        },
        basarisizSonuc: {
          mesaj: "Refusing raised costs, but you don't regret it.",
          detay: "Doing right can cost.",
        },
      },
      {
        metin: "Accept, cut your costs.",
        basariliSonuc: {
          mesaj: "Costs fell, but your conscience gives no peace.",
          detay: "Some gains carry a heavy price.",
        },
        basarisizSonuc: {
          mesaj: "It came out; your name was dragged through the city.",
          detay: "Dark shortcuts surface sooner or later.",
        },
      },
    ],
  },
  sd_zanaatkar_sendika_denetimi: {
    baslik: "Workplace Safety Inspection",
    metin: "State inspectors came to check your workshop's safety.",
    secenekler: [
      {
        metin: "Show everything up to code.",
        basariliSonuc: {
          mesaj: "The inspection passed; you're on record as a trustworthy employer.",
          detay: "Safety is the cheapest insurance.",
        },
        basarisizSonuc: {
          mesaj: "Shortcomings were found; a fine was issued.",
          detay: "Bureaucracy can be merciless.",
        },
      },
    ],
  },
  sd_zanaatkar_kredi_faizi: {
    baslik: "Bank Interest Pressure",
    metin: "Your bank loan's interest rose unexpectedly; payments are getting harder.",
    secenekler: [
      {
        metin: "Save to pay off the debt early.",
        basariliSonuc: {
          mesaj: "You cleared the debt early and shed the interest.",
          detay: "Paying early brings relief.",
        },
        basarisizSonuc: {
          mesaj: "Savings fell short; the debt remains.",
          detay: "Some burdens don't lift easily.",
        },
      },
    ],
  },
  sd_zanaatkar_gazete_ilani: {
    baslik: "Newspaper Ad",
    metin: "You can advertise your business in the local paper.",
    secenekler: [
      {
        metin: "Place the ad.",
        basariliSonuc: {
          mesaj: "The ad worked; new customers arrived.",
          detay: "Being seen in the right place is half the job.",
        },
        basarisizSonuc: {
          mesaj: "The ad drew less notice than hoped.",
          detay: "Not every ad pays off.",
        },
      },
    ],
  },
  sd_zanaatkar_grev_dalgasi: {
    baslik: "The City's Wave of Strikes",
    metin: "A strike wave from the city's factories is reaching your workers too.",
    secenekler: [
      {
        metin: "Hear your workers, meet their demands.",
        basariliSonuc: {
          mesaj: "Small improvements calmed them; they skipped the strike.",
          detay: "Listening is the cheapest fix.",
        },
        basarisizSonuc: {
          mesaj: "Your workers joined the strike; production stopped for days.",
          detay: "Ignored problems grow.",
        },
      },
    ],
  },
  sd_zanaatkar_yeni_sehir_yasasi: {
    baslik: "New City Law",
    metin: "The city council passed a law restricting workshops' hours.",
    secenekler: [
      {
        metin: "Obey the law, change your routine.",
        basariliSonuc: {
          mesaj: "You adapted to the new order without trouble.",
          detay: "Adapting is often the easiest path.",
        },
        basarisizSonuc: {
          mesaj: "Adapting slowed your production for a while.",
          detay: "Change isn't easy.",
        },
      },
      {
        metin: "Ignore the law, take the risk.",
        basariliSonuc: {
          mesaj: "No one noticed; production carried on.",
          detay: "Rules get broken — with their risk.",
        },
        basarisizSonuc: {
          mesaj: "Caught in an inspection, you got a heavy fine.",
          detay: "Defying rules has a price.",
        },
      },
    ],
  },
  sd_zanaatkar_hastalik_salgini: {
    baslik: "Illness Among the Workers",
    metin: "The factory's foul air made several of your workers sick.",
    secenekler: [
      {
        metin: "Improve the ventilation.",
        basariliSonuc: {
          mesaj: "It worked; your workers' health recovered.",
          detay: "A healthy worker is productive.",
        },
        basarisizSonuc: {
          mesaj: "Not enough; a few workers quit.",
          detay: "Not every fix works at once.",
        },
      },
    ],
  },
  sd_zanaatkar_yatirimci_ziyareti: {
    baslik: "An Investor's Visit",
    metin: "A wealthy investor wants to visit your workshop and gauge its potential.",
    secenekler: [
      {
        metin: "Present your workshop at its best.",
        basariliSonuc: {
          mesaj: "The investor was impressed and gave a little capital.",
          detay: "The right impression opens doors.",
        },
        basarisizSonuc: {
          mesaj: "The investor stayed cold; the visit was wasted.",
          detay: "Not every visit pays off.",
        },
      },
    ],
  },
  sd_zanaatkar_rakip_dava: {
    baslik: "The Rival's Lawsuit",
    metin: "A rival sued you, claiming you stole his design.",
    secenekler: [
      {
        metin: "Defend yourself in court.",
        basariliSonuc: {
          mesaj: "You won; your name was cleared.",
          detay: "Being right is the best defense.",
        },
        basarisizSonuc: {
          mesaj: "You lost, in both money and reputation.",
          detay: "Court isn't always fair.",
        },
      },
    ],
  },
  sd_zanaatkar_kadin_iscilerin_talebi: {
    baslik: "A Demand for Equal Pay",
    metin: "You noticed your women workers earn less than men doing the same work.",
    secenekler: [
      {
        metin: "Equalize the wages.",
        basariliSonuc: {
          mesaj: "Equal pay earned you great respect among the workers.",
          detay: "Justice nurtures loyalty.",
        },
        basarisizSonuc: {
          mesaj: "It raised costs, but your conscience is clear.",
          detay: "Doing right can cost.",
        },
      },
      {
        metin: "Keep things as they are.",
        basariliSonuc: {
          mesaj: "Costs held, but discontent grew.",
          detay: "Ignored injustice accumulates.",
        },
        basarisizSonuc: {
          mesaj: "Serious discontent spread among the workers.",
          detay: "Injustice erupts sooner or later.",
        },
      },
    ],
  },
  sd_zanaatkar_teknoloji_fuari: {
    baslik: "Technology Fair",
    metin: "A city technology fair lets you examine the newest machines.",
    secenekler: [
      {
        metin: "Attend the fair, gather ideas.",
        basariliSonuc: {
          mesaj: "The fair's ideas brought fresh air to your workshop.",
          detay: "Curiosity is the cheapest investment.",
        },
        basarisizSonuc: {
          mesaj: "The fair wasn't as inspiring as hoped.",
          detay: "Not every trip brings an idea.",
        },
      },
    ],
  },
  sd_zanaatkar_emeklilik_sandigi: {
    baslik: "A Pension Fund for the Workers",
    metin: "You could set up a small pension fund for your workers' future.",
    secenekler: [
      {
        metin: "Set up the fund.",
        basariliSonuc: {
          mesaj: "The fund built great trust and loyalty among workers.",
          detay: "Investing in tomorrow earns today's loyalty.",
        },
        basarisizSonuc: {
          mesaj: "The fund drew little interest; workers stayed skeptical.",
          detay: "Trust takes time.",
        },
      },
    ],
  },
  sd_zanaatkar_demiryolu_siparisi: {
    baslik: "An Order From a Railway Company",
    metin: "A newly founded railway company wants custom parts from you.",
    secenekler: [
      {
        metin: "Accept the order.",
        basariliSonuc: {
          mesaj: "Parts arrived on time; a long-term deal looms.",
          detay: "Keeping pace with the age brings opportunity.",
        },
        basarisizSonuc: {
          mesaj: "The parts missed standards; the order was returned.",
          detay: "A big client, a big responsibility.",
        },
      },
    ],
  },
  sd_zanaatkar_sigorta_teklifi: {
    baslik: "An Insurance Offer",
    metin:
      "A new insurance company offers to cover your workshop against fire and accidents.",
    secenekler: [
      {
        metin: "Get insured.",
        basariliSonuc: {
          mesaj: "You rest easy, covered against disaster.",
          detay: "Security is peace of mind's price.",
        },
        basarisizSonuc: {
          mesaj: "You insured, but saw no immediate benefit.",
          detay: "Some investments take time.",
        },
      },
      {
        metin: "Take the risk, skip insurance.",
        basariliSonuc: {
          mesaj: "You kept the money; nothing happened.",
          detay: "Risk can pay off short-term.",
        },
        basarisizSonuc: {
          mesaj: "Being uninsured nags you, but no trouble yet.",
          detay: "Insecurity breeds unease.",
        },
      },
    ],
  },
  sd_zanaatkar_kadin_musteri_onyargisi: {
    baslik: "A Woman Entrepreneur",
    metin: "A woman entrepreneur wants to partner in your workshop, but some masters object.",
    secenekler: [
      {
        metin: "Accept the partnership.",
        basariliSonuc: {
          mesaj: "The partnership thrived; prejudice was soon forgotten.",
          detay: "Talent knows no gender.",
        },
        basarisizSonuc: {
          mesaj: "Some masters reacted; old customers took offense.",
          detay: "Change isn't easily accepted.",
        },
      },
    ],
  },
};
