import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/mulkOlaylari.ts — İngilizce çevirileri. */
export const OLAYLAR_MULK_EN: Record<string, OlayCeviri> = {
  mulk_kucuk_tarla_aile_emegi: {
    baslik: "Labor in the Field",
    metin: "Harvest time on your small plot, but money for hands is tight. Work it with family, or hire help?",
    secenekler: [
      {
        metin: "Harvest it yourself with family.",
        basariliSonuc: { mesaj: "Your back ached, but the harvest came in without a coin spent." },
        basarisizSonuc: { mesaj: "You twisted your ankle; part of the harvest rotted." },
      },
      {
        metin: "Hire day laborers.",
        basariliSonuc: { mesaj: "The workers were fast; the harvest came in on time." },
        basarisizSonuc: { mesaj: "The workers quit midday; the wage was wasted." },
      },
    ],
  },

  mulk_kucuk_tarla_sinir_anlasmazligi: {
    baslik: "Boundary Stone Dispute",
    metin: "Your neighbor claims your plot's boundary has crept in by a hand's width. Tensions rise.",
    secenekler: [
      {
        metin: "Take it to the village elder.",
        basariliSonuc: { mesaj: "The elder ruled for you; a cool peace was made." },
        basarisizSonuc: { mesaj: "The elder split the difference; you moved the stone in your neighbor's favor." },
      },
      {
        metin: "Stand firm; set the stone yourself.",
        basariliSonuc: { mesaj: "Your neighbor backed down; the boundary stayed as you wanted." },
        basarisizSonuc: { mesaj: "The fight grew and the village spoke against you; things with your neighbor broke." },
      },
    ],
  },

  mulk_ciftlik_hasat_senligi: {
    baslik: "Harvest Festival",
    metin: "Your farm's harvest was bountiful. The villagers want a small festival with you.",
    secenekler: [
      {
        metin: "Join; cover the cost.",
        basariliSonuc: { mesaj: "The festival ran late; your name was spoken kindly." },
        basarisizSonuc: { mesaj: "The weather turned and cut the festival short; part of the cost was wasted." },
      },
      {
        metin: "Store the harvest; skip the party.",
        basariliSonuc: { mesaj: "You stored it quietly; a few extra coins of profit." },
        basarisizSonuc: { mesaj: "Your absence became gossip; you were met coolly." },
      },
    ],
  },

  mulk_ciftlik_haslarat_istilasi: {
    baslik: "Pest Infestation",
    metin: "Pests are breeding in a corner of your farm. Act fast or lose part of the harvest.",
    secenekler: [
      {
        metin: "Hire an herbalist/remedy; pay.",
        basariliSonuc: { mesaj: "The pests were cleared; most of the harvest was saved." },
        basarisizSonuc: { mesaj: "The hired hand failed; you lost money and part of the harvest." },
      },
      {
        metin: "Risk it; deal with it yourself.",
        basariliSonuc: { mesaj: "After sleepless nights you beat the infestation yourself." },
        basarisizSonuc: { mesaj: "The pests gnawed the field; most of the harvest was lost." },
      },
    ],
  },

  mulk_han_zor_misafir: {
    baslik: "A Difficult Guest",
    metin: "A drunk guest at your inn is about to fight the other customers. What do you do?",
    secenekler: [
      {
        metin: "Calm him down yourself.",
        basariliSonuc: { mesaj: "You calmed the guest; the customers were impressed." },
        basarisizSonuc: { mesaj: "You got pulled in and tables fell; body and purse both took a hit." },
      },
      {
        metin: "Throw him out the door.",
        basariliSonuc: { mesaj: "You threw him out; peace returned to the inn." },
        basarisizSonuc: { mesaj: "He resisted at the door; an ugly scene played out in public." },
      },
    ],
  },

  mulk_han_unlu_gezgin: {
    baslik: "A Famous Traveler",
    metin: "A famous traveler staying the night says they'll praise your inn, if satisfied.",
    secenekler: [
      {
        metin: "Offer the best; spare no expense.",
        basariliSonuc: { mesaj: "The traveler praised your inn everywhere; new customers came." },
        basarisizSonuc: { mesaj: "The traveler was unimpressed; your expense went unrewarded." },
      },
      {
        metin: "Give standard service.",
        basariliSonuc: { mesaj: "The traveler left quietly: no praise, no complaint." },
        basarisizSonuc: { mesaj: "The traveler was unhappy and spoke bitterly of your inn." },
      },
    ],
  },

  mulk_demirci_yangin_riski: {
    baslik: "A Spark from the Furnace",
    metin: "A spark from the furnace lit a pile of dry straw. You must act fast.",
    secenekler: [
      {
        metin: "Rush it with water.",
        basariliSonuc: { mesaj: "You smothered the flames early; only some soot remained." },
        basarisizSonuc: { mesaj: "Fire engulfed a corner; materials lost, your hand burned." },
      },
      {
        metin: "Call neighboring craftsmen.",
        basariliSonuc: { mesaj: "With the neighbors you quickly brought the fire under control." },
        basarisizSonuc: { mesaj: "Before help came, the fire ashed a corner; damage stayed limited." },
      },
    ],
  },

  mulk_demirci_buyuk_siparis: {
    baslik: "A Big Order",
    metin: "A caravan offers a large weapon/tool order needing quick delivery. Risky, but profitable.",
    secenekler: [
      {
        metin: "Accept; work day and night.",
        basariliSonuc: { mesaj: "You delivered on time; the merchant paid generously." },
        basarisizSonuc: { mesaj: "You missed the deadline; the merchant went to another smith." },
      },
      {
        metin: "Decline politely; carry on.",
        basariliSonuc: { mesaj: "You took no risk; the workshop kept its usual pace." },
        basarisizSonuc: { mesaj: "The missed chance lingered in your mind." },
      },
    ],
  },

  mulk_kervan_rota_karari: {
    baslik: "Which Route?",
    metin: "Your caravan master offers two routes: a short, dangerous mountain path or a long, safe coastal road.",
    secenekler: [
      {
        metin: "Short, dangerous mountain route.",
        basariliSonuc: { mesaj: "The caravan crossed the mountains fast; goods sold at fresh prices." },
        basarisizSonuc: { mesaj: "Bandits plundered part of the caravan in the pass." },
      },
      {
        metin: "Long, safe coastal road.",
        basariliSonuc: { mesaj: "The caravan arrived after a long but smooth journey." },
        basarisizSonuc: { mesaj: "An unexpected delay on the coast road ate part of the profit." },
      },
    ],
  },

  mulk_kervan_ihanet_suphesi: {
    baslik: "Suspicion of the Caravan Master",
    metin: "You suspect your trusted caravan master fudged the books on the last trip.",
    secenekler: [
      {
        metin: "Check the ledgers; confront him.",
        basariliSonuc: { mesaj: "Your suspicion was right; you recovered the missing sum." },
        basarisizSonuc: { mesaj: "The books were clean; the baseless accusation soured the caravan." },
      },
      {
        metin: "Let it go; keep trusting.",
        basariliSonuc: { mesaj: "The suspicion was baseless; the caravan ran as usual." },
        basarisizSonuc: { mesaj: "The caravan master kept quietly lining his pockets." },
      },
    ],
  },

  mulk_karaborsa_buyuk_teklif: {
    baslik: "A Big Offer",
    metin: "Someone from the shadows offers you a far bigger, riskier deal through your black market depot.",
    secenekler: [
      {
        metin: "Accept; dive in.",
        basariliSonuc: { mesaj: "The risky deal closed clean; a large sum landed in your pocket." },
        basarisizSonuc: { mesaj: "The deal spiraled; you lost money and drew eyes." },
      },
      {
        metin: "Decline; stick to your routine.",
        basariliSonuc: { mesaj: "You took no risk; the depot kept its quiet pace." },
        basarisizSonuc: { mesaj: "The offer made someone else rich; you feel regret." },
      },
    ],
  },

  mulk_karaborsa_muhbir_suphesi: {
    baslik: "Suspicion of an Informant",
    metin: "A depot worker is suspected of leaking information to the watch. What do you do?",
    secenekler: [
      {
        metin: "Fire him at once.",
        basariliSonuc: { mesaj: "You quietly removed him; the depot feels safe for now." },
        basarisizSonuc: { mesaj: "The man you fired went to the watch in spite; more eyes on you." },
      },
      {
        metin: "Ignore it; keep working.",
        basariliSonuc: { mesaj: "The suspicion was unfounded; the depot ran smoothly." },
        basarisizSonuc: { mesaj: "You were right: the watch tried a raid and you barely escaped." },
      },
    ],
  },
};
