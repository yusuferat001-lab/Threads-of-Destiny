import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/mulkOlaylari.ts — İngilizce çevirileri. */
export const OLAYLAR_MULK_EN: Record<string, OlayCeviri> = {
  mulk_kucuk_tarla_aile_emegi: {
    baslik: "Labor in the Field",
    metin: "It's harvest time on your small plot, but money for extra hands is tight. Do you work it yourself with your family, or hire help for a few days?",
    secenekler: [
      {
        metin: "Do it yourself, with the family.",
        basariliSonuc: { mesaj: "Your back aches, but the harvest made it home safe without a single coin spent." },
        basarisizSonuc: { mesaj: "Exhaustion made you stumble and twist your ankle; part of the harvest rotted in the field." },
      },
      {
        metin: "Hire day laborers for a few days.",
        basariliSonuc: { mesaj: "The workers moved fast; the harvest was brought in complete and on time." },
        basarisizSonuc: { mesaj: "The workers you hired quit halfway through the day; the wage you paid went to waste." },
      },
    ],
  },

  mulk_kucuk_tarla_sinir_anlasmazligi: {
    baslik: "Boundary Stone Dispute",
    metin: "Your neighbor claims your small plot's boundary has crept in by a hand's width. Things are starting to get tense.",
    secenekler: [
      {
        metin: "Go to the village elder, settle it properly.",
        basariliSonuc: { mesaj: "The elder ruled in your favor; an uneasy but real peace was made with your neighbor." },
        basarisizSonuc: { mesaj: "The elder split the difference, and you had to move the boundary stone a few steps in your neighbor's favor." },
      },
      {
        metin: "Stand firm, set the stone yourself.",
        basariliSonuc: { mesaj: "Your neighbor backed down, and the boundary stayed exactly where you wanted it." },
        basarisizSonuc: { mesaj: "The fight escalated, the village started talking against you, and your relationship with your neighbor is completely broken." },
      },
    ],
  },

  mulk_ciftlik_hasat_senligi: {
    baslik: "Harvest Festival",
    metin: "This year's harvest on your farm was bountiful. The villagers want to hold a small festival with you.",
    secenekler: [
      {
        metin: "Join the festival, cover the cost yourself.",
        basariliSonuc: { mesaj: "The festival ran late into the night; your name was spoken kindly all over the village." },
        basarisizSonuc: { mesaj: "The festival was fun until the weather turned and it was cut short; part of your expense went to waste." },
      },
      {
        metin: "Quietly store the harvest, skip the celebration.",
        basariliSonuc: { mesaj: "You quietly stored the entire harvest; a few extra coins were added to your profit." },
        basarisizSonuc: { mesaj: "Your absence from the festival became village gossip; you were received a bit coldly." },
      },
    ],
  },

  mulk_ciftlik_haslarat_istilasi: {
    baslik: "Pest Infestation",
    metin: "Pests are breeding in a corner of your farm. If you don't act quickly, you could lose part of the harvest.",
    secenekler: [
      {
        metin: "Hire an experienced herbalist/remedy, pay the price.",
        basariliSonuc: { mesaj: "The pests were cleared out; most of the harvest was saved." },
        basarisizSonuc: { mesaj: "The person you hired couldn't handle it; you lost both the money and part of the harvest." },
      },
      {
        metin: "Take the risk, deal with it yourself.",
        basariliSonuc: { mesaj: "After a few sleepless nights, you beat the infestation on your own." },
        basarisizSonuc: { mesaj: "The pests devoured a large part of the field; most of that year's harvest was lost." },
      },
    ],
  },

  mulk_han_zor_misafir: {
    baslik: "A Difficult Guest",
    metin: "A drunk guest staying at your inn is about to start a fight with other customers. As the innkeeper, what do you do?",
    secenekler: [
      {
        metin: "Try to calm them down yourself.",
        basariliSonuc: { mesaj: "You managed to calm the guest down; the other customers were impressed." },
        basarisizSonuc: { mesaj: "You got pulled into the fight, a few tables were knocked over; both your body and your purse took a hit." },
      },
      {
        metin: "Take them to the door, throw them out.",
        basariliSonuc: { mesaj: "You threw the troublesome guest out; peace returned to the inn." },
        basarisizSonuc: { mesaj: "The guest resisted at the door, and an ugly scene played out in front of everyone." },
      },
    ],
  },

  mulk_han_unlu_gezgin: {
    baslik: "A Famous Traveler",
    metin: "A famous traveler staying a night at your inn says they'll speak well of it — if they leave satisfied.",
    secenekler: [
      {
        metin: "Give them the best room and table, spare no expense.",
        basariliSonuc: { mesaj: "The traveler praised your inn everywhere they went; new customers started wearing out your doorstep." },
        basarisizSonuc: { mesaj: "Nothing the traveler saw impressed them; your expense went unrewarded." },
      },
      {
        metin: "Offer the standard service, don't go out of your way.",
        basariliSonuc: { mesaj: "The traveler stayed quietly and left — no praise, no complaint, just an ordinary night." },
        basarisizSonuc: { mesaj: "The traveler was unhappy with the service, and left with a few bitter words about your inn." },
      },
    ],
  },

  mulk_demirci_yangin_riski: {
    baslik: "A Spark from the Furnace",
    metin: "A spark from your workshop's furnace has set a pile of dry straw alight. You need to act fast.",
    secenekler: [
      {
        metin: "Grab water and go straight at it.",
        basariliSonuc: { mesaj: "You put out the flames before they could spread; the workshop got away with a bit of soot." },
        basarisizSonuc: { mesaj: "The fire fully engulfed one corner; you lost materials and burned your hand." },
      },
      {
        metin: "Call the neighboring craftsmen for help.",
        basariliSonuc: { mesaj: "With a few neighboring craftsmen, you got the fire under control quickly." },
        basarisizSonuc: { mesaj: "By the time help arrived, the fire had reduced one corner to ash, though the damage stayed limited." },
      },
    ],
  },

  mulk_demirci_buyuk_siparis: {
    baslik: "A Big Order",
    metin: "A trade caravan is offering a large weapon/tool order that needs to be delivered quickly. Risky, but it looks profitable.",
    secenekler: [
      {
        metin: "Accept the order, work day and night.",
        basariliSonuc: { mesaj: "You delivered the order on time; the merchant kept their word and paid generously." },
        basarisizSonuc: { mesaj: "You couldn't make the deadline; the merchant cancelled the order and went to another blacksmith." },
      },
      {
        metin: "Politely decline, keep to your usual work.",
        basariliSonuc: { mesaj: "You didn't take the risk; your workshop kept running at its usual pace." },
        basarisizSonuc: { mesaj: "The missed opportunity stayed on your mind for a while." },
      },
    ],
  },

  mulk_kervan_rota_karari: {
    baslik: "Which Route?",
    metin: "Your caravan master offers two routes: a short but dangerous path through the mountains, or a long but safe coastal road.",
    secenekler: [
      {
        metin: "Take the short, dangerous mountain route.",
        basariliSonuc: { mesaj: "The caravan crossed the mountain route safely and quickly; the goods sold at fresh prices." },
        basarisizSonuc: { mesaj: "Bandits plundered part of the caravan in the mountain pass." },
      },
      {
        metin: "Take the long, safe coastal road.",
        basariliSonuc: { mesaj: "The caravan reached its destination after a long but trouble-free journey." },
        basarisizSonuc: { mesaj: "An unexpected delay on the coastal road ate into part of the profit." },
      },
    ],
  },

  mulk_kervan_ihanet_suphesi: {
    baslik: "Suspicion of the Caravan Master",
    metin: "You suspect the caravan master you trusted has been fudging the books on the last trip.",
    secenekler: [
      {
        metin: "Openly check the ledgers, demand an accounting.",
        basariliSonuc: { mesaj: "Your suspicion was right — you got the missing sum back, and the caravan master never took that risk again." },
        basarisizSonuc: { mesaj: "The books were clean; the bitterness of a baseless accusation settled over the caravan." },
      },
      {
        metin: "Let it go, keep trusting them.",
        basariliSonuc: { mesaj: "The suspicion turned out to be a mere delusion; the caravan kept running as usual." },
        basarisizSonuc: { mesaj: "It turns out the caravan master had been quietly lining their pockets undetected." },
      },
    ],
  },

  mulk_karaborsa_buyuk_teklif: {
    baslik: "A Big Offer",
    metin: "Someone from the shadows offers you a much bigger, much riskier deal using your black market warehouse.",
    secenekler: [
      {
        metin: "Accept the offer, dive in deep.",
        basariliSonuc: { mesaj: "The deal closed risky but clean; a large sum landed in your pocket." },
        basarisizSonuc: { mesaj: "The deal spiraled out of control; you lost money and now eyes are on you." },
      },
      {
        metin: "Turn down the offer, stick to your current routine.",
        basariliSonuc: { mesaj: "You didn't take the risk; your black market warehouse kept running in its usual quiet rhythm." },
        basarisizSonuc: { mesaj: "You heard the offer you turned down went to someone else and made them a fortune; a pang of regret settled in." },
      },
    ],
  },

  mulk_karaborsa_muhbir_suphesi: {
    baslik: "Suspicion of an Informant",
    metin: "Someone working at your warehouse is suspected of leaking information to the neighborhood watch. What do you do?",
    secenekler: [
      {
        metin: "Fire them immediately, don't let them dig deeper.",
        basariliSonuc: { mesaj: "You quietly got rid of the suspect; the warehouse feels safer for a while." },
        basarisizSonuc: { mesaj: "The person you fired went straight to the watch out of spite; the eyes on you have grown." },
      },
      {
        metin: "Ignore it, keep business running.",
        basariliSonuc: { mesaj: "The suspicion turned out to be unfounded; the warehouse kept running without a hitch." },
        basarisizSonuc: { mesaj: "Your suspicion was right — the watch attempted a raid on the warehouse, and you barely got away." },
      },
    ],
  },
};
