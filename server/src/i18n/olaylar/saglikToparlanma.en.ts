import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/saglikToparlanma.ts — İngilizce çevirileri. */
export const OLAYLAR_SAGLIK_TOPARLANMA_EN: Record<string, OlayCeviri> = {
  st_yatak_istirahati: {
    baslik: "Your Body in Revolt",
    metin:
      "Even standing is hard now. For a while you could drop everything and take to your bed, let your body repair itself — but work, debts and opportunities won't wait for you.",
    secenekler: [
      {
        metin: "Drop everything, rest for weeks.",
        basariliSonuc: {
          mesaj:
            "After a long rest your body recovered. People around you talked about your absence, but you stayed alive.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't rest fully, matters kept coming up; still, you got through the worst of it.",
        },
      },
      {
        metin: "Grit your teeth, keep working.",
        basariliSonuc: {
          mesaj: "You showed no one your weakness. Your body barely held on.",
        },
        basarisizSonuc: {
          mesaj: "You insisted on staying on your feet and one morning you collapsed. Things got worse.",
        },
      },
    ],
  },

  st_hekim_cagir: {
    baslik: "A Physician Is Needed",
    metin:
      "Your condition is serious. It's possible to find a good physician within the borders of {bolge}, but the fee is steep. You could also go to a cheap healer — maybe it helps, maybe it makes things worse.",
    secenekler: [
      {
        metin: "Be examined by a good physician.",
        kilitAciklamasi: "You don't have the money to cover the physician's fee.",
        basariliSonuc: {
          mesaj: "The physician made the right diagnosis; within a few weeks you improved noticeably.",
        },
        basarisizSonuc: {
          mesaj: "The treatment didn't work as fast as you hoped, but at least you didn't get worse.",
        },
      },
      {
        metin: "Go to a cheap healer.",
        basariliSonuc: {
          mesaj: "The healer's herbs and poultices worked unexpectedly well; you are pulling yourself together.",
        },
        basarisizSonuc: {
          mesaj: "The mixture the healer gave you upset your stomach; you lay worse off for days.",
        },
      },
    ],
  },

  st_sifali_kaplica: {
    baslik: "Healing Waters",
    metin:
      "There are hot springs nearby said to be healing. Staying there a few days and bathing in the waters could do your body good — and you'd get some rest too.",
    secenekler: [
      {
        metin: "Stay a few days at the spa.",
        kilitAciklamasi: "You don't even have money for the journey and lodging.",
        basariliSonuc: {
          mesaj: "The hot waters worked into your bones. Both your body and your spirits were restored.",
        },
        basarisizSonuc: {
          mesaj: "The waters weren't as miraculous as you thought, but you got some rest.",
        },
      },
      {
        metin: "You have no time, get by at home with linden tea.",
        basariliSonuc: {
          mesaj: "A hot drink and an early night; a small but real recovery.",
        },
        basarisizSonuc: {
          mesaj: "It made little difference; at least you didn't get worse.",
        },
      },
    ],
  },

  st_aile_bakimi: {
    baslik: "At the Family Table",
    metin:
      "You are in a bad way. Your {aile} family offers to take you in for a while, feed you properly and fuss over you. You'll have to set your pride aside.",
    secenekler: [
      {
        metin: "Accept the offer, give yourself over to their care.",
        basariliSonuc: {
          mesaj: "Warm food, a clean bed, and someone fussing over you. Within weeks you were back on your feet.",
        },
        basarisizSonuc: {
          mesaj: "It wasn't quite as they wanted, but you still came round.",
        },
      },
      {
        metin: "Don't accept, fend for yourself.",
        basariliSonuc: {
          mesaj: "You recovered without depending on anyone; a little, but by your own strength.",
        },
        basarisizSonuc: {
          mesaj: "You dug in your heels and, alone, got even worse.",
        },
      },
    ],
  },

  st_dini_inziva: {
    baslik: "Retreating Into Seclusion",
    metin:
      "Both your body and your soul are weary. In a place of worship or a quiet corner you could go into a few weeks of seclusion and repair yourself with fasting, prayer and silence.",
    secenekler: [
      {
        metin: "Go into seclusion, fasting and rest.",
        basariliSonuc: {
          mesaj:
            "Simplicity and rest did your body good; when you returned you were calmer and stronger.",
        },
        basarisizSonuc: {
          mesaj: "Your mind rested, but your body did not recover as much as you hoped.",
        },
      },
      {
        metin: "You can't leave worldly matters behind.",
        basariliSonuc: {
          mesaj: "You managed with short breaks; you barely stayed on your feet.",
        },
        basarisizSonuc: {
          mesaj: "You gave time to neither your body nor your soul; both wore down further.",
        },
      },
    ],
  },

  st_cografi_perhiz: {
    baslik: "A Long Convalescence",
    metin:
      "The physicians recommend a long convalescence: light food, plenty of sleep, staying away from hard work. It could take months, but it may be the only thing that keeps you on your feet.",
    secenekler: [
      {
        metin: "Follow the convalescence, be patient.",
        basariliSonuc: {
          mesaj: "After months of careful convalescence, your body was truly repaired.",
        },
        basarisizSonuc: {
          mesaj: "The process was tiresome and you returned to life before it fully ended; still, the worst has passed.",
        },
      },
      {
        metin: "Cut it short, go back to work.",
        basariliSonuc: {
          mesaj: "You returned early and earned a little; your body barely held.",
        },
        basarisizSonuc: {
          mesaj: "The convalescence half done, it relapsed; you fell into a deeper hole.",
        },
      },
    ],
  },

  st_gezgin_doktor: {
    baslik: "The Traveling Doctor",
    metin:
      "A doctor working by modern methods has come to the city; his surgery has real medicines and clean instruments. The fee is high, but the results are taken seriously.",
    secenekler: [
      {
        metin: "See the modern doctor, take the medicines.",
        kilitAciklamasi: "You can't afford the doctor's fee and the medicines.",
        basariliSonuc: {
          mesaj: "The right medicine, in the right dose. You recovered noticeably in a short time.",
        },
        basarisizSonuc: {
          mesaj: "The treatment didn't quite take, but it kept your body on its feet.",
        },
      },
      {
        metin: "Buy a ready-made syrup from the apothecary, get by.",
        kilitAciklamasi: "You don't even have the money for the syrup.",
        basariliSonuc: {
          mesaj: "The ready-made medicine worked better than you expected; you are recovering.",
        },
        basarisizSonuc: {
          mesaj: "The syrup did little good; the money was as good as wasted.",
        },
      },
    ],
  },

  st_otaci_karisimi: {
    baslik: "The Herbalist's Mixture",
    metin:
      "An old herbalist living at the edge of the village looks at your condition and says he can prepare a special mixture. His knowledge goes back a long way, but not everyone trusts him.",
    secenekler: [
      {
        metin: "Have the mixture made and follow the recipe exactly.",
        kilitAciklamasi: "You don't have the money to pay the herbalist.",
        basariliSonuc: {
          mesaj: "The bitter-smelling mixture worked; within a few weeks you grew noticeably stronger.",
        },
        basarisizSonuc: {
          mesaj: "The mixture upset your stomach; you felt worse for a few days, then returned to normal.",
        },
      },
      {
        metin: "Don't trust the herbalist, get by with hot soup.",
        basariliSonuc: {
          mesaj: "Simple, but it worked; a small recovery.",
        },
        basarisizSonuc: {
          mesaj: "There was little change.",
        },
      },
    ],
  },
};
