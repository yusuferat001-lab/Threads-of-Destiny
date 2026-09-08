import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/vebaHastaligi.ts — İngilizce çevirileri. */
export const OLAYLAR_VEBA_HASTALIGI_EN: Record<string, OlayCeviri> = {
  veba_hasta_hekim: {
    baslik: "Send for a Physician",
    metin:
      "Your fever won't break and the blotches have reached your armpit. One of the few physicians still on their feet in the city agrees to treat you — for a heavy fee.",
    secenekler: [
      {
        metin: "Pay whatever it takes; keep the physician at your side.",
        ipucu: "The strongest treatment; expensive",
        kilitAciklamasi: "You can't afford the physician's fee.",
        basariliSonuc: {
          mesaj: "The physician never left your side for days — bled you, made poultices, watched the fever. The crisis slowly eased.",
          detay: "The right care changes everything.",
        },
        basarisizSonuc: {
          mesaj: "The physician did what they could, but the case was severe; still, better than being alone.",
          detay: "Sometimes even money isn't enough.",
        },
      },
      {
        metin: "I can't pay that; try to ride it out alone.",
        ipucu: "Free; no improvement at all",
        basariliSonuc: {
          mesaj: "You sent the physician away. Drenched in sweat in your bed, you watched your own body fight.",
        },
        basarisizSonuc: {
          mesaj: "The nights grew worse; you kept thinking you should have paid.",
        },
      },
    ],
  },
  veba_hasta_sifaci_otu: {
    baslik: "The Healer's Herbs",
    metin:
      "A healer woman in the neighbourhood sells a bitter herb brew she boils for plague victims. Some swear it works, some call it poison.",
    secenekler: [
      {
        metin: "Take the brew, drink it as directed.",
        ipucu: "Medium strength; cheap but no guarantee",
        kilitAciklamasi: "You have no money for the healer.",
        basariliSonuc: {
          mesaj: "The night you drank it you sweated buckets; by morning the fever had dropped a notch. The days after were better.",
        },
        basarisizSonuc: {
          mesaj: "Your stomach couldn't take the brew; you vomited for days and your condition worsened.",
        },
      },
      {
        metin: "I don't trust it, I won't take it.",
        basariliSonuc: {
          mesaj: "You turned the healer away. Maybe the right call, maybe a wasted chance.",
        },
        basarisizSonuc: {
          mesaj: "After refusing, you brooded over 'what if it would have worked?'",
        },
      },
    ],
  },
  veba_hasta_kadim_ilac: {
    baslik: "The Monastery's Salve",
    metin:
      "The monks at the monastery outside the city apply a salve and prayer regimen they have guarded for generations. If they accept you, you must stay there several days.",
    secenekler: [
      {
        metin: "Go to the monastery, complete the regimen.",
        ipucu: "Strong treatment + peace; a few days' travel",
        kilitAciklamasi: "You can't afford the donation and a stay at the monastery.",
        basariliSonuc: {
          mesaj: "You rested in cool stone cells, amid the smell of herbs and the sound of chanting. Your body began to recover, and so did your spirit.",
        },
        basarisizSonuc: {
          mesaj: "The salve worked no miracle, but at least your days passed in a clean bed, being cared for.",
        },
      },
      {
        metin: "I can't travel in this state; I'll stay home.",
        basariliSonuc: {
          mesaj: "You couldn't risk the journey; you fought on at home with your own means.",
        },
        basarisizSonuc: {
          mesaj: "Being alone at home weighed on you; you couldn't get the monks' offer out of your head.",
        },
      },
    ],
  },
  veba_hasta_deneysel_tedavi: {
    baslik: "The Young Doctor's Method",
    metin:
      "At a newly opened hospital, a young doctor studying the epidemic applies an experimental treatment: regular intervention, a clean room, close monitoring. The fee is high, the outcome uncertain.",
    secenekler: [
      {
        metin: "Check yourself in, try the treatment.",
        ipucu: "The strongest chance; the most expensive, no guarantee",
        kilitAciklamasi: "You can't cover the hospital fee.",
        basariliSonuc: {
          mesaj: "Your days passed in a white room, checked every hour. The doctor's method held; you got through the crisis.",
        },
        basarisizSonuc: {
          mesaj: "The treatment wasn't settled yet; some of the interventions wore you down further. The doctor took notes; you got worse.",
        },
      },
      {
        metin: "I won't be a test subject; I'll stay home.",
        basariliSonuc: {
          mesaj: "You refused the hospital; you fought on in your own bed with methods you knew.",
        },
        basarisizSonuc: {
          mesaj: "Waiting at home, you kept thinking about that clean room at the hospital.",
        },
      },
    ],
  },
  veba_hasta_hacamat: {
    baslik: "Bloodletting",
    metin:
      "The common belief of the age: sickness spreads through 'foul blood'. A barber-surgeon offers to draw off some blood from your vein to 'let out the poison'. Sometimes it helps, sometimes it drops the patient further.",
    secenekler: [
      {
        metin: "Let them draw your blood.",
        ipucu: "Like a gamble: either a clear improvement or a hard fall",
        basariliSonuc: {
          mesaj: "After the procedure you felt a strange lightness; the fever broke within a few days.",
        },
        basarisizSonuc: {
          mesaj: "Your already weak body was shaken by the blood loss; you fainted and couldn't stand for days.",
        },
      },
      {
        metin: "No, I don't have that much blood to spare.",
        basariliSonuc: {
          mesaj: "You sent the barber-surgeon away. At least you held your ground, nothing worse happened.",
        },
        basarisizSonuc: {
          mesaj: "You refused, but the neighbours kept whispering it was 'his stubbornness'.",
        },
      },
    ],
  },
  veba_hasta_dinlen: {
    baslik: "Drop Everything",
    metin:
      "Work, debt, duty... they can all wait. Your body wants one thing: uninterrupted rest, hot broth, silence.",
    secenekler: [
      {
        metin: "Stop working entirely, just rest.",
        ipucu: "Not free (lost earnings) but a safe recovery",
        basariliSonuc: {
          mesaj: "You spent days in bed, sleeping and sweating. You lost income, but your body recovered.",
        },
        basarisizSonuc: {
          mesaj: "You tried to rest but couldn't sleep for worry; still, staying away from grinding work did you good.",
        },
      },
      {
        metin: "I can't afford to rest, I have to stay on my feet.",
        ipucu: "You keep your earnings but the sickness may drag on",
        basariliSonuc: {
          mesaj: "You gritted your teeth and did your work. Your income held, but in the evenings you found yourself on the floor.",
        },
        basarisizSonuc: {
          mesaj: "Pushing yourself cost you dearly; one day you collapsed in the middle of the market and the sickness flared.",
        },
      },
    ],
  },
  veba_hasta_sarlatan_iksiri: {
    baslik: "The Miracle Elixir Seller",
    metin:
      "A peddler turned up at your door: bright bottles in hand, a promise on his tongue that it 'cures the plague in one night'. The price is outrageous, the contents unknown.",
    secenekler: [
      {
        metin: "You're desperate; take the bottle, drink it.",
        ipucu: "Usually useless or poisonous; rarely it works",
        basariliSonuc: {
          mesaj: "Whatever was in it, you slept easy that night and the fever broke. Luck or miracle — you don't know.",
        },
        basarisizSonuc: {
          mesaj: "The elixir burned your stomach, your head spun. The seller was already at another door. Your condition worsened.",
        },
      },
      {
        metin: "Drive the swindler off.",
        basariliSonuc: {
          mesaj: "You shut the door in his face. Your money stayed in your pocket, and the false hope on the threshold.",
        },
        basarisizSonuc: {
          mesaj: "You drove him off, but the thought 'what if it really would have worked' gnawed at you at night.",
        },
      },
    ],
  },
  veba_hasta_aile_bakimi: {
    baslik: "Someone at Your Bedside",
    metin:
      "One of your loved ones is willing to risk infection to stay at your bedside, feed you, clean you. Your survival may hinge largely on that care — but you'd be putting them in danger too.",
    secenekler: [
      {
        metin: "Accept; let them stay at your side.",
        ipucu: "Care raises your survival odds; your loved one takes a risk too",
        basariliSonuc: {
          mesaj: "They didn't let go of your hand for days. That warm attention may have been the medicine itself; you slowly came back to yourself.",
        },
        basarisizSonuc: {
          mesaj: "They did all they could, but the case was severe. Still, knowing you weren't alone gave you strength.",
        },
      },
      {
        metin: "Refuse; let no one come near.",
        ipucu: "You protect your loved one; you fight more alone",
        basariliSonuc: {
          mesaj: "You locked your door, let no one in. You protected them, but you fought this battle alone.",
        },
        basarisizSonuc: {
          mesaj: "Loneliness and sickness together dragged you down; there was no one to hear your voice.",
        },
      },
    ],
  },
  veba_hasta_atesli_sayikla: {
    baslik: "The Fever Peaks",
    metin:
      "The fever rose so high in the night that you thought the ceiling was falling on you, heard sounds that weren't there. This is the sickness's most dangerous moment — your body will either turn this night or it won't.",
    secenekler: [
      {
        metin: "Fight with your last strength; drink water, wet cloths, stay upright.",
        ipucu: "Grueling but it can break the crisis",
        basariliSonuc: {
          mesaj: "You pushed yourself until dawn; with first light the fever broke. The worst is behind you.",
        },
        basarisizSonuc: {
          mesaj: "You tried to fight but the body gave in; you lost another night to delirium and sweat.",
        },
      },
      {
        metin: "Let go; whatever happens, happens.",
        ipucu: "Peaceful, but it gives the sickness room",
        basariliSonuc: {
          mesaj: "You stopped fighting and a strange calm settled in. The body fought its own way; in the morning you were still there.",
        },
        basarisizSonuc: {
          mesaj: "Surrender won out; you slid into a deep pit inside the fever and barely climbed back.",
        },
      },
    ],
  },
};
