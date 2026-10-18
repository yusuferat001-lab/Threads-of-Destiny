import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/vebaHastaligi.ts — İngilizce çevirileri. */
export const OLAYLAR_VEBA_HASTALIGI_EN: Record<string, OlayCeviri> = {
  veba_hasta_hekim: {
    baslik: "Send for a Physician",
    metin:
      "Your fever won't break; blotches reached your armpit. One of the few physicians left will treat you, for a steep fee.",
    secenekler: [
      {
        metin: "Pay any fee; keep the physician.",
        kilitAciklamasi: "You can't afford the physician's fee.",
        basariliSonuc: {
          mesaj: "The physician stayed for days; the crisis slowly eased.",
          detay: "The right care changes everything.",
        },
        basarisizSonuc: {
          mesaj: "The physician did their best, but the case was severe.",
          detay: "Sometimes even money isn't enough.",
        },
      },
      {
        metin: "I can't pay; I'll ride it out alone.",
        basariliSonuc: {
          mesaj: "You sent the physician away and fought it out in sweat.",
        },
        basarisizSonuc: {
          mesaj: "The nights worsened; you wished you'd paid.",
        },
      },
    ],
  },
  veba_hasta_sifaci_otu: {
    baslik: "The Healer's Herbs",
    metin:
      "A local healer sells a bitter herb brew to plague victims. Some swear by it, some call it poison.",
    secenekler: [
      {
        metin: "Take the brew, drink as directed.",
        kilitAciklamasi: "You have no money for the healer.",
        basariliSonuc: {
          mesaj: "You sweated all night; by morning the fever dropped.",
        },
        basarisizSonuc: {
          mesaj: "The brew wrecked your stomach; you vomited for days.",
        },
      },
      {
        metin: "I don't trust it; I won't take it.",
        basariliSonuc: {
          mesaj: "You turned the healer away. Right call, or lost chance?",
        },
        basarisizSonuc: {
          mesaj: "You brooded: what if it would have worked?",
        },
      },
    ],
  },
  veba_hasta_kadim_ilac: {
    baslik: "The Monastery's Salve",
    metin:
      "Monks at a monastery outside the city apply an old salve and prayer cure. You must stay there several days.",
    secenekler: [
      {
        metin: "Go to the monastery for the cure.",
        kilitAciklamasi: "You can't afford the donation and stay.",
        basariliSonuc: {
          mesaj: "Amid herbs and chanting, body and spirit mended.",
        },
        basarisizSonuc: {
          mesaj: "The salve worked no miracle, but you were cared for.",
        },
      },
      {
        metin: "Too weak to travel; I'll stay home.",
        basariliSonuc: {
          mesaj: "You skipped the journey and held on at home.",
        },
        basarisizSonuc: {
          mesaj: "Alone at home, you couldn't forget the monks.",
        },
      },
    ],
  },
  veba_hasta_deneysel_tedavi: {
    baslik: "The Young Doctor's Method",
    metin:
      "At a new hospital, a young doctor tries an experimental treatment: clean room, close watch. High fee, uncertain outcome.",
    secenekler: [
      {
        metin: "Check in and try the treatment.",
        kilitAciklamasi: "You can't cover the hospital fee.",
        basariliSonuc: {
          mesaj: "Watched hourly in a white room, you beat the crisis.",
        },
        basarisizSonuc: {
          mesaj: "The treatment hadn't settled; it wore you down further.",
        },
      },
      {
        metin: "No guinea pig for me; staying home.",
        basariliSonuc: {
          mesaj: "You refused the hospital and fought on in your own bed.",
        },
        basarisizSonuc: {
          mesaj: "Waiting at home, you kept picturing that clean room.",
        },
      },
    ],
  },
  veba_hasta_hacamat: {
    baslik: "Bloodletting",
    metin:
      "Folk belief says plague spreads through 'foul blood'. A barber-surgeon offers to bleed you; it may help, or sink you.",
    secenekler: [
      {
        metin: "Let them draw your blood.",
        basariliSonuc: {
          mesaj: "You felt a strange lightness; the fever broke in days.",
        },
        basarisizSonuc: {
          mesaj: "Blood loss shook you; you fainted, bedridden for days.",
        },
      },
      {
        metin: "No, I have no blood to spare.",
        basariliSonuc: {
          mesaj: "You sent the barber-surgeon away; nothing worse happened.",
        },
        basarisizSonuc: {
          mesaj: "You refused, but neighbours whispered it was stubbornness.",
        },
      },
    ],
  },
  veba_hasta_dinlen: {
    baslik: "Drop Everything",
    metin:
      "Work, debt, duty... all can wait. Your body wants rest, hot broth, silence.",
    secenekler: [
      {
        metin: "Drop work entirely; just rest.",
        basariliSonuc: {
          mesaj: "Days of sleep and sweat. You lost income but recovered.",
        },
        basarisizSonuc: {
          mesaj: "Worry kept you awake; still, time off grinding work helped.",
        },
      },
      {
        metin: "No time to rest; I must keep going.",
        basariliSonuc: {
          mesaj: "You pushed on and earned, but collapsed each evening.",
        },
        basarisizSonuc: {
          mesaj: "Pushing backfired: you collapsed in the market, sickness flared.",
        },
      },
    ],
  },
  veba_hasta_sarlatan_iksiri: {
    baslik: "The Miracle Elixir Seller",
    metin:
      "A peddler at your door: bright bottles, a promise to 'cure the plague overnight'. Outrageous price, unknown contents.",
    secenekler: [
      {
        metin: "Desperate; take the bottle, drink.",
        basariliSonuc: {
          mesaj: "You slept easy and the fever broke. Luck or miracle?",
        },
        basarisizSonuc: {
          mesaj: "The elixir burned; the seller was gone, you worsened.",
        },
      },
      {
        metin: "Drive the swindler off.",
        basariliSonuc: {
          mesaj: "You shut the door; money kept, false hope left outside.",
        },
        basarisizSonuc: {
          mesaj: "You drove him off, but 'what if it worked?' gnawed at you.",
        },
      },
    ],
  },
  veba_hasta_aile_bakimi: {
    baslik: "Someone at Your Bedside",
    metin:
      "A loved one will risk infection to nurse you at your bedside. Their care may save you, but you'd endanger them.",
    secenekler: [
      {
        metin: "Accept; let them stay by you.",
        basariliSonuc: {
          mesaj: "They never let go of your hand; that care healed you.",
        },
        basarisizSonuc: {
          mesaj: "They did all they could; at least you weren't alone.",
        },
      },
      {
        metin: "Refuse; let no one come near.",
        basariliSonuc: {
          mesaj: "You locked your door and protected them, fighting alone.",
        },
        basarisizSonuc: {
          mesaj: "Loneliness and sickness dragged you down; no one heard you.",
        },
      },
    ],
  },
  veba_hasta_atesli_sayikla: {
    baslik: "The Fever Peaks",
    metin:
      "Your fever spiked; the ceiling seemed to fall, voices that weren't there. Your body will turn this night or it won't.",
    secenekler: [
      {
        metin: "Fight on; drink water, stay upright.",
        basariliSonuc: {
          mesaj: "You fought till dawn; at first light the fever broke.",
        },
        basarisizSonuc: {
          mesaj: "The body gave in; delirium and sweat took another night.",
        },
      },
      {
        metin: "Let go; whatever happens, happens.",
        basariliSonuc: {
          mesaj: "You stopped fighting, a calm settled; by morning you lived.",
        },
        basarisizSonuc: {
          mesaj: "Surrender won; you sank deep into fever, barely returned.",
        },
      },
    ],
  },
};
