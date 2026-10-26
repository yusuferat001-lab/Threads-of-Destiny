import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/kureselOlaylar.ts — İngilizce çevirileri. */
export const OLAYLAR_KURESEL_EN: Record<string, OlayCeviri> = {
  kuresel_veba_baslangici: {
    baslik: "Plague at the Door",
    metin:
      "Death carts roam the streets of {bolge}. The plague spreads fast and spares no one. How will you protect yourself?",
    secenekler: [
      {
        metin: "Close your business and stay home.",
        kilitAciklamasi: "You can't afford to stay closed.",
        basariliSonuc: {
          mesaj:
            "You locked the door; income dropped hard, but your odds of survival are good.",
        },
        basarisizSonuc: {
          mesaj:
            "The quarantine was breached; income fell and your protection is only partial.",
        },
      },
      {
        metin: "Work carefully: fewer customers, cleanliness, distance.",
        kilitAciklamasi: "You can't afford the precautions.",
        basariliSonuc: {
          mesaj:
            "You scaled the business down; income fell, but you are partly protected.",
        },
        basarisizSonuc: {
          mesaj:
            "The precautions weren't enough; income fell and protection is gone.",
        },
      },
      {
        metin: "Carry on as if nothing happened.",
        basariliSonuc: {
          mesaj:
            "The shop is open, but frightened people stay away. The plague hits everyone alike.",
        },
        basarisizSonuc: {
          mesaj:
            "One market day was enough; you woke feverish but survived. Customers thinned out badly.",
        },
      },
    ],
  },

  veba_kapiyi_calan: {
    baslik: "The One at Your Door",
    metin:
      "At midnight a feverish relative trembles at your door. Let him in and you risk the plague; refuse and he dies.",
    secenekler: [
      {
        metin: "Let him in, do what you can",
        basariliSonuc: {
          mesaj: "You nursed him for days; he recovered. Your mercy was noted.",
        },
        basarisizSonuc: {
          mesaj: "You lost him, and the plague passed to you. You're sick now.",
        },
      },
      {
        metin: "Keep the door shut, send him away.",
        basariliSonuc: {
          mesaj: "That voice will haunt you, but the sickness stayed out.",
        },
        basarisizSonuc: {
          mesaj: "You got too close; a few uneasy days followed.",
        },
      },
    ],
  },

  veba_cenaze: {
    baslik: "A Funeral in the Plague",
    metin:
      "Someone close died of the plague; the funeral is today. A crowd is dangerous, but staying away is disloyal.",
    secenekler: [
      {
        metin: "Attend the funeral, pay respects.",
        basariliSonuc: {
          mesaj: "You saw them laid to rest; people saw you there.",
        },
        basarisizSonuc: {
          mesaj: "You caught it from someone beside you. You have the plague.",
        },
      },
      {
        metin: "Pray from afar, avoid the crowd.",
        basariliSonuc: {
          mesaj: "You prayed at home. It hurt, but you kept your health.",
        },
        basarisizSonuc: {
          mesaj: "Even from afar you got too close; days of unease.",
        },
      },
    ],
  },

  veba_pazarda_temas: {
    baslik: "A Contact at the Market",
    metin:
      "A coughing, flushed stranger bumped into you at the market and vanished. Maybe sick. What will you do?",
    secenekler: [
      {
        metin: "Stay calm, go home, wash and wait.",
        basariliSonuc: {
          mesaj: "You waited uneasily; no symptoms came. Lucky.",
        },
        basarisizSonuc: {
          mesaj: "Fever came on day three; you got through it, bedridden.",
        },
      },
      {
        metin: "Rush to a healer for incense, salve.",
        kilitAciklamasi: "You can't afford the healer.",
        basariliSonuc: {
          mesaj: "Not medicine, but it soothed your spirit.",
        },
        basarisizSonuc: {
          mesaj: "The incense failed; you fell ill days later.",
        },
      },
    ],
  },

  veba_hasta_bakiciligi: {
    baslik: "An Offer of Nursing the Sick",
    metin:
      "A rich household seeks someone to tend plague victims and carry out the dead. Pay is high, infection risk great.",
    secenekler: [
      {
        metin: "Take the job, tend the sick",
        basariliSonuc: {
          mesaj: "Months amid death, and you survived. Your purse filled.",
        },
        basarisizSonuc: {
          mesaj: "One of the sick infected you. You have the plague.",
        },
      },
      {
        metin: "Refuse: this job means death",
        basariliSonuc: {
          mesaj: "You refused the money. Hungry, but alive.",
        },
        basarisizSonuc: {
          mesaj: "You talked too close with the messenger; uneasy days.",
        },
      },
    ],
  },
};
