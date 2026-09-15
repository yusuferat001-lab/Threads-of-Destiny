import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/kureselOlaylar.ts — İngilizce çevirileri. */
export const OLAYLAR_KURESEL_EN: Record<string, OlayCeviri> = {
  kuresel_veba_baslangici: {
    baslik: "Plague at the Door",
    metin:
      "Death carts have begun to roam the streets of {bolge}. The news from distant towns says one thing: the sickness spreads fast and spares no one. For years to come you will live in the shadow of this plague. How will you protect yourself?",
    secenekler: [
      {
        metin: "Use your wealth: leave the city, rent a place in the countryside, isolate yourself completely",
        kilitAciklamasi: "You don't have the money to retreat to the countryside and live for months.",
        basariliSonuc: {
          mesaj:
            "You will never forget the faces you left behind as you passed through the city gates. But far away, in clean air, your chances of surviving the plague's worst years are far higher.",
        },
        basarisizSonuc: {
          mesaj:
            "You set out, but the sickness was faster than you; along the road you met caravans of the sick. Still, it's better than staying in the city — you are partly protected.",
        },
      },
      {
        metin: "Strict quarantine at home: wall up your door, stockpile provisions, let no one in",
        kilitAciklamasi: "You don't have the money to stockpile provisions to last months.",
        basariliSonuc: {
          mesaj:
            "You lived for months within four walls, listening to the screams outside. It was dull and stifling, but it worked.",
        },
        basarisizSonuc: {
          mesaj:
            "At some point your quarantine was breached — a delivery, a neighbor, a relative... It got inside without your noticing. You have little protection left now.",
        },
      },
      {
        metin: "Carry on with your life as normal: there's nowhere to run, whatever fate has written",
        basariliSonuc: {
          mesaj:
            "No one can shame you for hiding. The plague has gripped {bolge}; you share the same fate as everyone else.",
        },
        basarisizSonuc: {
          mesaj:
            "One day spent at the market in the first weeks was enough. You woke with a mild fever — you got through it this time, but the plague is only just beginning.",
        },
      },
    ],
  },

  veba_kapiyi_calan: {
    baslik: "The One at Your Door",
    metin:
      "There's a knock at your door at midnight. A distant relative stands trembling on the threshold, burning with fever. He has nowhere left to go in the city. If you let him in, you may bring the sickness into your home; if you don't, you leave him to die.",
    secenekler: [
      {
        metin: "Let him in, do what you can",
        basariliSonuc: {
          mesaj: "You watched over him for days. He recovered. The neighbors talked about it — you were known as a merciful person.",
        },
        basarisizSonuc: {
          mesaj: "You lost him, and on top of it the sickness passed to you too. You wrestled with fever for weeks.",
        },
      },
      {
        metin: "Don't open the door, tell him to move on",
        basariliSonuc: {
          mesaj: "That voice cut off behind the door will not leave your mind for years. But the sickness did not enter the house.",
        },
        basarisizSonuc: {
          mesaj: "Even talking through the crack of the door you got too close; you waited uneasily for a few days.",
        },
      },
    ],
  },

  veba_cenaze: {
    baslik: "A Funeral in the Plague",
    metin:
      "Someone close to you died of the plague. The funeral is today. Going to a crowded funeral in the days of the plague is dangerous, but not going is counted as faithlessness.",
    secenekler: [
      {
        metin: "Go to the funeral, perform your last duty",
        basariliSonuc: {
          mesaj: "You witnessed them laid to rest. Your heart eased a little; people saw that you were there.",
        },
        basarisizSonuc: {
          mesaj: "You caught it from someone you stood shoulder to shoulder with at the funeral. The following days were hard.",
        },
      },
      {
        metin: "Pray from afar, don't join the crowd",
        basariliSonuc: {
          mesaj: "You prayed quietly from your home. Not being able to go pained you, but you protected your health.",
        },
        basarisizSonuc: {
          mesaj: "Watching from the edge of the graveyard was still counted as getting too close; you looked after yourself for days.",
        },
      },
    ],
  },

  veba_pazarda_temas: {
    baslik: "A Contact at the Market",
    metin:
      "While buying provisions, someone coughing, their face flushed, bumped into you and disappeared into the crowd. Maybe there was nothing wrong with them. Maybe they carried the sickness. What will you do?",
    secenekler: [
      {
        metin: "Stay calm, go straight home, wash thoroughly and wait",
        basariliSonuc: {
          mesaj: "You waited uneasily for a few days, but no symptom appeared. You were lucky.",
        },
        basarisizSonuc: {
          mesaj: "On the third day your fever came. You got through it lightly but stayed in bed for a while.",
        },
      },
      {
        metin: "Run to a healer at once, get incense and salve",
        kilitAciklamasi: "You don't have the money to pay the healer.",
        basariliSonuc: {
          mesaj: "The healer's treatments may not have helped medically, but they helped your spirit; you breathed easier.",
        },
        basarisizSonuc: {
          mesaj: "The healer's incense did no good; a few days later you fell ill anyway.",
        },
      },
    ],
  },

  veba_hasta_bakiciligi: {
    baslik: "An Offer of Nursing the Sick",
    metin:
      "A wealthy household is looking for someone to tend their plague-stricken relatives and carry away their dead. The pay is high — because no one will take the job. If you accept, you get both money and a great risk of infection.",
    secenekler: [
      {
        metin: "Take the job, tend the sick",
        basariliSonuc: {
          mesaj: "You worked amid death for months and came out alive. Your pocket filled, your name was spoken as 'brave'.",
        },
        basarisizSonuc: {
          mesaj: "One of the sick you tended passed it to you. This time the sickness put you in bed too.",
        },
      },
      {
        metin: "Refuse — this job means death",
        basariliSonuc: {
          mesaj: "You turned down the money. Hungry, but alive.",
        },
        basarisizSonuc: {
          mesaj: "You refused, but talked too closely with the man who brought the offer; a few uneasy days passed.",
        },
      },
    ],
  },
};
