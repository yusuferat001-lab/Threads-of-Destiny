import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiZanaatkar.ts — İngilizce çevirileri (20 olay). */
export const OLAYLAR_SANAYI_ZANAATKAR_EN: Record<string, OlayCeviri> = {
  sd_zanaatkar_fabrika_golgesi: {
    baslik: "In the Shadow of the Factory",
    metin:
      "The giant factories built in the city are swallowing up the small workshops' business one by one.",
    secenekler: [
      {
        metin: "Focus on a niche product, on handcraft.",
        basariliSonuc: {
          mesaj: "Discerning customers kept choosing you.",
          detay: "You don't have to sell to everyone.",
        },
        basarisizSonuc: {
          mesaj: "Your customer count dropped, making a living got a bit harder.",
          detay: "The shadow of industry falls heavy on small workshops.",
        },
      },
      {
        metin: "Apply for a factory job, choose security.",
        basariliSonuc: {
          mesaj: "You got hired; the pay is steady but your freedom shrank.",
          detay: "Security is sometimes the price of independence.",
        },
        basarisizSonuc: {
          mesaj: "Your application was rejected; you had to keep running your own workshop.",
          detay: "Not every door is open.",
        },
      },
    ],
  },
  sd_zanaatkar_patent_firsati: {
    baslik: "A Small Invention",
    metin:
      "You've developed a small but clever device that makes your work easier; getting a patent for it will be costly.",
    secenekler: [
      {
        metin: "File for a patent.",
        basariliSonuc: {
          mesaj: "Your patent was approved; your invention got licensed to a few workshops.",
          detay: "A small idea sometimes opens big doors.",
        },
        basarisizSonuc: {
          mesaj: "The application was rejected, the expense was wasted.",
          detay: "Bureaucracy sometimes moves slower than invention.",
        },
      },
    ],
  },
  sd_zanaatkar_isci_saglik: {
    baslik: "Harsh Working Conditions",
    metin: "Your workers are complaining of exhaustion; improving conditions will be costly.",
    secenekler: [
      {
        metin: "Shorten working hours, keep their wages the same.",
        basariliSonuc: {
          mesaj: "Your workers' morale improved, productivity rose.",
          detay: "Tired hands produce little.",
        },
        basarisizSonuc: {
          mesaj: "The change didn't have the effect you expected, it only raised costs.",
          detay: "Not every improvement bears fruit right away.",
        },
      },
      {
        metin: "Don't change the conditions, prioritize profit.",
        basariliSonuc: {
          mesaj: "Your profit rose but discontent grew among your workers.",
          detay: "Short-term gain eats away at long-term trust.",
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
    metin: "Your most valuable machine suddenly broke down; repair is expensive and time-consuming.",
    secenekler: [
      {
        metin: "Have a master repair it quickly, at a high cost.",
        basariliSonuc: {
          mesaj: "The machine was repaired quickly, production wasn't disrupted.",
          detay: "A timely intervention reduces the loss.",
        },
        basarisizSonuc: {
          mesaj: "The repair took a long time, you lost orders during it.",
          detay: "Every breakdown brings an unpredictable delay.",
        },
      },
    ],
  },
  sd_zanaatkar_sergi_daveti: {
    baslik: "Industrial Exhibition",
    metin: "You've received an invitation to a great industrial exhibition held in the city.",
    secenekler: [
      {
        metin: "Exhibit your best work.",
        basariliSonuc: {
          mesaj: "Your piece drew attention; you got a few important orders.",
          detay: "The right stage means being seen by the right eyes.",
        },
        basarisizSonuc: {
          mesaj: "You didn't get the attention you expected at the exhibition.",
          detay: "Not every exhibition brings a great return.",
        },
      },
    ],
  },
  sd_zanaatkar_cocuk_isci_ikilemi: {
    baslik: "A Cheap Labor Offer",
    metin: "A middleman suggests you employ child workers at very low wages.",
    secenekler: [
      {
        metin: "Refuse the offer.",
        basariliSonuc: {
          mesaj: "You turned the offer down; your conscience is at ease.",
          detay: "Some gains aren't worth the cost.",
        },
        basarisizSonuc: {
          mesaj: "Refusing raised some of your costs but you don't regret it.",
          detay: "Doing right can have a price.",
        },
      },
      {
        metin: "Accept the offer, lower your costs.",
        basariliSonuc: {
          mesaj: "Your costs dropped but your conscience won't leave you in peace.",
          detay: "Some gains carry a heavy price.",
        },
        basarisizSonuc: {
          mesaj: "The matter came out; your name was ill spoken of in the city.",
          detay: "Dark shortcuts come to light sooner or later.",
        },
      },
    ],
  },
  sd_zanaatkar_sendika_denetimi: {
    baslik: "Workplace Safety Inspection",
    metin: "Government inspectors came to check your workshop for workplace safety.",
    secenekler: [
      {
        metin: "Show everything as being up to code.",
        basariliSonuc: {
          mesaj: "The inspection went smoothly, your name was recorded as a trustworthy employer.",
          detay: "Safety is the cheapest insurance.",
        },
        basarisizSonuc: {
          mesaj: "Some shortcomings were found, a fine was issued.",
          detay: "Bureaucracy is sometimes merciless.",
        },
      },
    ],
  },
  sd_zanaatkar_kredi_faizi: {
    baslik: "Bank Interest Pressure",
    metin: "The interest on your bank loan rose unexpectedly; the payments are getting harder.",
    secenekler: [
      {
        metin: "Save up to pay off the debt early.",
        basariliSonuc: {
          mesaj: "You paid off the debt early, freeing yourself from the interest burden.",
          detay: "Paying early brings relief in the long run.",
        },
        basarisizSonuc: {
          mesaj: "Your savings weren't enough, the debt burden continues.",
          detay: "Some burdens don't lighten easily.",
        },
      },
    ],
  },
  sd_zanaatkar_gazete_ilani: {
    baslik: "Newspaper Ad",
    metin: "You have the opportunity to advertise your business in the local newspaper.",
    secenekler: [
      {
        metin: "Place the ad.",
        basariliSonuc: {
          mesaj: "The ad worked, a few new customers came to your door.",
          detay: "Being seen in the right place is half the job.",
        },
        basarisizSonuc: {
          mesaj: "The ad didn't get the attention you expected.",
          detay: "Not every advertisement pays off.",
        },
      },
    ],
  },
  sd_zanaatkar_grev_dalgasi: {
    baslik: "The City's Wave of Strikes",
    metin: "A wave of strikes that started at other factories in the city is affecting your workers too.",
    secenekler: [
      {
        metin: "Talk with your workers, listen to their demands.",
        basariliSonuc: {
          mesaj: "Small improvements calmed your workers, they didn't join the wave of strikes.",
          detay: "Listening is often the cheapest solution.",
        },
        basarisizSonuc: {
          mesaj: "Your workers joined the strike too, production stopped for a few days.",
          detay: "Ignored problems grow.",
        },
      },
    ],
  },
  sd_zanaatkar_yeni_sehir_yasasi: {
    baslik: "New City Law",
    metin: "The city council passed a new law restricting workshops' working hours.",
    secenekler: [
      {
        metin: "Comply with the law, change your routine.",
        basariliSonuc: {
          mesaj: "You adapted to the new order without trouble.",
          detay: "Adapting is often the easiest path.",
        },
        basarisizSonuc: {
          mesaj: "Adapting to the new order slowed your production for a while.",
          detay: "Change isn't always easy.",
        },
      },
      {
        metin: "Ignore the law, take the risk.",
        basariliSonuc: {
          mesaj: "No one noticed, your production wasn't disrupted.",
          detay: "Some rules exist to be broken — along with their risk.",
        },
        basarisizSonuc: {
          mesaj: "You got caught in an inspection, a heavy fine was issued.",
          detay: "Defying the rules comes at a price.",
        },
      },
    ],
  },
  sd_zanaatkar_hastalik_salgini: {
    baslik: "Illness Among the Workers",
    metin: "Because of the factory's dirty air, several of your workers fell ill.",
    secenekler: [
      {
        metin: "Improve the ventilation.",
        basariliSonuc: {
          mesaj: "The improvement worked, your workers' health got better.",
          detay: "A healthy worker is a productive worker.",
        },
        basarisizSonuc: {
          mesaj: "The improvement wasn't enough, a few workers quit.",
          detay: "Not every solution works right away.",
        },
      },
    ],
  },
  sd_zanaatkar_yatirimci_ziyareti: {
    baslik: "An Investor's Visit",
    metin: "A wealthy investor wants to visit your workshop to assess its potential.",
    secenekler: [
      {
        metin: "Present your workshop at its best.",
        basariliSonuc: {
          mesaj: "The investor was impressed, and provided a small capital boost.",
          detay: "The right impression opens doors.",
        },
        basarisizSonuc: {
          mesaj: "The investor stayed uninterested, the visit was wasted.",
          detay: "Not every visit bears fruit.",
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
          mesaj: "You won the case, your name was cleared.",
          detay: "Being in the right is the best defense.",
        },
        basarisizSonuc: {
          mesaj: "You lost the case, losing both money and reputation.",
          detay: "Court doesn't always end fairly.",
        },
      },
    ],
  },
  sd_zanaatkar_kadin_iscilerin_talebi: {
    baslik: "A Demand for Equal Pay",
    metin: "You've realized your female workers are paid less than the men doing the same work.",
    secenekler: [
      {
        metin: "Equalize the wages.",
        basariliSonuc: {
          mesaj: "Your decision to equalize wages earned you great respect among the workers.",
          detay: "Justice nurtures loyalty.",
        },
        basarisizSonuc: {
          mesaj: "The decision raised some costs but your conscience is at ease.",
          detay: "Doing right can have a price.",
        },
      },
      {
        metin: "Keep things as they are.",
        basariliSonuc: {
          mesaj: "Your costs didn't change but discontent grew among the workers.",
          detay: "Ignored injustice accumulates.",
        },
        basarisizSonuc: {
          mesaj: "Serious discontent formed among the workers.",
          detay: "Injustice explodes sooner or later.",
        },
      },
    ],
  },
  sd_zanaatkar_teknoloji_fuari: {
    baslik: "Technology Fair",
    metin: "You have the chance to attend a technology fair in the city and examine the newest machines.",
    secenekler: [
      {
        metin: "Attend the fair, gather new ideas.",
        basariliSonuc: {
          mesaj: "The ideas you picked up at the fair brought fresh air to your workshop.",
          detay: "Curiosity is the cheapest investment.",
        },
        basarisizSonuc: {
          mesaj: "The fair wasn't as inspiring as you hoped.",
          detay: "Not every trip brings a new idea.",
        },
      },
    ],
  },
  sd_zanaatkar_emeklilik_sandigi: {
    baslik: "A Pension Fund for the Workers",
    metin: "You have the idea of setting up a small pension fund for your workers' future.",
    secenekler: [
      {
        metin: "Set up the fund.",
        basariliSonuc: {
          mesaj: "The fund created great trust and loyalty among the workers.",
          detay: "Investing in the future earns today's loyalty.",
        },
        basarisizSonuc: {
          mesaj: "The fund didn't get the expected interest, the workers stayed skeptical.",
          detay: "Building trust takes time.",
        },
      },
    ],
  },
  sd_zanaatkar_demiryolu_siparisi: {
    baslik: "An Order From a Railway Company",
    metin: "A newly founded railway company wants to order custom parts from you.",
    secenekler: [
      {
        metin: "Accept the order.",
        basariliSonuc: {
          mesaj: "The parts were delivered on time; a long-term deal with the railway company is on the horizon.",
          detay: "Keeping pace with the industrial age brings great opportunities.",
        },
        basarisizSonuc: {
          mesaj: "The parts didn't meet the standards, the order was returned.",
          detay: "A big client means big responsibility.",
        },
      },
    ],
  },
  sd_zanaatkar_sigorta_teklifi: {
    baslik: "An Insurance Offer",
    metin:
      "A newly founded insurance company suggests insuring your workshop against fire and accidents.",
    secenekler: [
      {
        metin: "Get insured.",
        basariliSonuc: {
          mesaj: "You feel at ease, now protected against a possible disaster.",
          detay: "Security is the price of peace of mind.",
        },
        basarisizSonuc: {
          mesaj: "You got insured but didn't see an immediate benefit.",
          detay: "Some investments take time to bear fruit.",
        },
      },
      {
        metin: "Take the risk, don't get insured.",
        basariliSonuc: {
          mesaj: "You kept the money in your pocket, nothing happened.",
          detay: "Sometimes risk pays off in the short run.",
        },
        basarisizSonuc: {
          mesaj: "Being uninsured bothered you but you haven't faced a problem yet.",
          detay: "Insecurity brings unease.",
        },
      },
    ],
  },
  sd_zanaatkar_kadin_musteri_onyargisi: {
    baslik: "A Woman Entrepreneur",
    metin: "A woman entrepreneur wants to become a partner in your workshop, but some of the masters oppose it.",
    secenekler: [
      {
        metin: "Accept the partnership.",
        basariliSonuc: {
          mesaj: "The partnership was successful, the prejudices were quickly forgotten.",
          detay: "Talent knows no gender.",
        },
        basarisizSonuc: {
          mesaj: "Some masters reacted badly, a few old customers took offense.",
          detay: "Change isn't always easily accepted.",
        },
      },
    ],
  },
};
