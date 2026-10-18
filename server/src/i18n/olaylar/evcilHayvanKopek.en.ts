import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/evcilHayvanKopek.ts — İngilizce çevirileri. */
export const OLAYLAR_EVCIL_HAYVAN_KOPEK_EN: Record<string, OlayCeviri> = {
  hayvan_karsilasma_kopek_oc_1: {
    baslik: "A Street Brawl",
    metin: "Walking home at night, you see two thugs cornering a big, wounded dog.",
    secenekler: [
      {
        metin: "Chase them off and take the dog.",
        basariliSonuc: {
          mesaj: "The thugs fled; the dog collapsed at your feet.",
          detay: "The brawl left a bruise."
        },
        basarisizSonuc: {
          mesaj: "You took a cudgel; the dog fled into the dark.",
          detay: "Kindness came at a price."
        }
      },
      {
        metin: "Look away and walk on.",
        basariliSonuc: {
          mesaj: "You walked on, a howl following behind you.",
          detay: "The sound lingered a while."
        },
        basarisizSonuc: {
          mesaj: "Not used."
        }
      }
    ]
  },
  hayvan_karsilasma_kopek_oc_2: {
    baslik: "The Market Thief",
    metin: "A dog flees the butcher with a huge cut of meat and hides at your feet.",
    secenekler: [
      {
        metin: "Pay for the meat, save the dog.",
        basariliSonuc: {
          mesaj: "You paid up; the dog followed you, meat and all.",
          detay: "The butcher grumbled and quieted."
        },
        basarisizSonuc: {
          mesaj: "The butcher took the coin, yet the dog slipped away.",
          detay: "You lost both coin and companion."
        }
      },
      {
        metin: "Hand the dog to the butcher.",
        basariliSonuc: {
          mesaj: "The butcher drove the dog off with a stick.",
          detay: "Its yelp is hard to forget."
        },
        basarisizSonuc: {
          mesaj: "Not used."
        }
      }
    ]
  },
  hayvan_karsilasma_kopek_oc_3: {
    baslik: "The Faithful Sentinel",
    metin: "On the forest road, a weary dog has waited for days over its dead master.",
    secenekler: [
      {
        metin: "Offer food and earn its trust.",
        basariliSonuc: {
          mesaj: "It ate, then leaned against you.",
          detay: "You helped bury its master."
        },
        basarisizSonuc: {
          mesaj: "It sniffed the food and turned back to its master.",
          detay: "Its snap left a mark on your hand."
        }
      },
      {
        metin: "Leave it be.",
        basariliSonuc: {
          mesaj: "Its gaze on your back, you moved on.",
          detay: "Loyalty can ache."
        },
        basarisizSonuc: {
          mesaj: "Not used."
        }
      }
    ]
  },
  hayvan_karsilasma_kopek_sd_1: {
    baslik: "The Factory Gate",
    metin: "Under the gas lamp, a foreman kicks a starving dog sneaking into the engine room.",
    secenekler: [
      {
        metin: "Stand up to the foreman, take the dog.",
        basariliSonuc: {
          mesaj: "The foreman gritted his teeth; the dog crept into your coat.",
          detay: "A day's wage was docked."
        },
        basarisizSonuc: {
          mesaj: "The foreman shoved you out; the dog vanished in the smoke.",
          detay: "Wages and pride both gone."
        }
      },
      {
        metin: "Mind your own business.",
        basariliSonuc: {
          mesaj: "You made your shift; the dog's whimper died away.",
          detay: "The machines drowned everything out."
        },
        basarisizSonuc: {
          mesaj: "Not used."
        }
      }
    ]
  },
  hayvan_karsilasma_kopek_sd_2: {
    baslik: "The Station Platform",
    metin: "As the steam train leaves, a dog runs down the tracks after its master's carriage.",
    secenekler: [
      {
        metin: "Snatch it off the rails.",
        basariliSonuc: {
          mesaj: "You grabbed it just as the train thundered past.",
          detay: "Your heart is still pounding."
        },
        basarisizSonuc: {
          mesaj: "The dog bit your arm and vanished down the tracks.",
          detay: "A frightened beast is unpredictable."
        }
      },
      {
        metin: "Tell the clerk, catch your train.",
        basariliSonuc: {
          mesaj: "The clerk shrugged; you boarded your train.",
          detay: "Your conscience nagged at the window."
        },
        basarisizSonuc: {
          mesaj: "Not used."
        }
      }
    ]
  },
  hayvan_karsilasma_kopek_sd_3: {
    baslik: "Waiting on the Quay",
    metin: "At the port, a dog has refused to leave the quay for days, awaiting a sunken ship's captain.",
    secenekler: [
      {
        metin: "Feed it fish and take it home.",
        basariliSonuc: {
          mesaj: "It finished the fish and trailed you, slow-footed.",
          detay: "It glanced back once at the sea."
        },
        basarisizSonuc: {
          mesaj: "It ate the fish but would not leave the quay.",
          detay: "Its vigil has no end."
        }
      },
      {
        metin: "Leave it to the dockhands.",
        basariliSonuc: {
          mesaj: "The dockhands shrugged; the dog watched the sea.",
          detay: "The ship won't return."
        },
        basarisizSonuc: {
          mesaj: "Not used."
        }
      }
    ]
  },
  evcil_hayvan_kopek_gece_hirsiz: {
    baslik: "A Shadow in the Yard",
    metin: "At night {hayvan} growls in the yard; a shadow stirs beyond the fence.",
    secenekler: [
      {
        metin: "Release {hayvan}.",
        basariliSonuc: {
          mesaj: "{hayvan} chased the thief; his coat stayed behind.",
          detay: "A sleepless but safe night."
        },
        basarisizSonuc: {
          mesaj: "The thief knocked you down; the storehouse was emptied.",
          detay: "{hayvan} howled until dawn."
        }
      },
      {
        metin: "Wait inside with a cudgel.",
        basariliSonuc: {
          mesaj: "The shadow vanished at the barking.",
          detay: "The night was long."
        },
        basarisizSonuc: {
          mesaj: "The thief grabbed a sack from the stable.",
          detay: "The cudgel came a moment too late."
        }
      }
    ]
  },
  evcil_hayvan_kopek_koyun_bekcisi: {
    baslik: "Wolf Tracks",
    metin: "Herding the village flock, {hayvan} presses its nose to fresh wolf tracks.",
    secenekler: [
      {
        metin: "Keep the night watch together.",
        basariliSonuc: {
          mesaj: "The wolves fell back at {hayvan}'s bark.",
          detay: "The villagers took note."
        },
        basarisizSonuc: {
          mesaj: "Wolves took two sheep; {hayvan} was hurt.",
          detay: "A cold, hard watch."
        }
      },
      {
        metin: "Pen the flock early.",
        basariliSonuc: {
          mesaj: "The flock stayed safe in the pen.",
          detay: "The tracks faded by morning."
        },
        basarisizSonuc: {
          mesaj: "A lamb strayed out of the pen.",
          detay: "The fence was loose."
        }
      }
    ]
  },
  evcil_hayvan_kopek_veba_sezgisi: {
    baslik: "The Meaning of the Howl",
    metin: "{hayvan} starts howling at a neighbour's door; a hoarse cough comes from inside.",
    secenekler: [
      {
        metin: "Go in and tend the sick.",
        basariliSonuc: {
          mesaj: "You nursed them with hot broth; the sickness spared you.",
          detay: "Your neighbour wept in thanks."
        },
        basarisizSonuc: {
          mesaj: "The sick one recovered, but the fever passed to you.",
          detay: "{hayvan} never left your side."
        }
      },
      {
        metin: "Keep away, pull {hayvan} back.",
        basariliSonuc: {
          mesaj: "You barred your door; the sickness never came.",
          detay: "You heard their cough for days."
        },
        basarisizSonuc: {
          mesaj: "You kept away, yet a chill crept in anyway.",
          detay: "Something ominous is in the air."
        }
      }
    ]
  },
  evcil_hayvan_kopek_tilki_avi: {
    baslik: "The Fox Hunt",
    metin: "At the lord's fox hunt, {hayvan} has caught the scent; the pack plunges into the woods.",
    secenekler: [
      {
        metin: "Plunge in with the pack.",
        basariliSonuc: {
          mesaj: "{hayvan} flushed the fox; the lord tossed you a purse.",
          detay: "The spoils weren't evenly shared."
        },
        basarisizSonuc: {
          mesaj: "You fell in the brush; {hayvan} vanished into the hills.",
          detay: "The day ended in defeat."
        }
      },
      {
        metin: "Watch from the roadside.",
        basariliSonuc: {
          mesaj: "{hayvan} watched the pack from afar; you both went home safe.",
          detay: "No share of the spoils."
        },
        basarisizSonuc: {
          mesaj: "The lord shot you a scornful glance.",
          detay: "You were deemed timid."
        }
      }
    ]
  },
  evcil_hayvan_kopek_atolye_sabotaj: {
    baslik: "Night Sabotage",
    metin: "At night in the workshop, {hayvan} barks; a rival saboteur's silhouette is at the window.",
    secenekler: [
      {
        metin: "Throw the door open, unleash {hayvan}.",
        basariliSonuc: {
          mesaj: "The saboteur fled, his shears half-lost.",
          detay: "The workshop stands intact."
        },
        basarisizSonuc: {
          mesaj: "The saboteur wrecked a machine and fled; you were hurt.",
          detay: "Repairs will cost extra."
        }
      },
      {
        metin: "Call the watchman.",
        basariliSonuc: {
          mesaj: "The shadow vanished when the watchman came.",
          detay: "Half-sleep, full relief."
        },
        basarisizSonuc: {
          mesaj: "The watchman was late; some parts were damaged.",
          detay: "Small damage, but annoying."
        }
      }
    ]
  },
  evcil_hayvan_kopek_kolera_kuyusu: {
    baslik: "The Suspect Well",
    metin: "Cholera rumours spread; {hayvan} refuses to drink from the shared well.",
    secenekler: [
      {
        metin: "Warn the street, seal the well.",
        basariliSonuc: {
          mesaj: "The well was sealed; the street escaped the sickness.",
          detay: "Some were furious with you."
        },
        basarisizSonuc: {
          mesaj: "Neighbours laughed at you; the well stayed open.",
          detay: "The warning went unheeded."
        }
      },
      {
        metin: "Use boiled water only.",
        basariliSonuc: {
          mesaj: "Boiled water kept you both well.",
          detay: "Firewood cost extra."
        },
        basarisizSonuc: {
          mesaj: "You avoided cholera but your stomach ailed a week.",
          detay: "The water was still suspect."
        }
      }
    ]
  },
  evcil_hayvan_kopek_sokak_kavgasi: {
    baslik: "Street Scuffle",
    metin: "Beneath the gas lamp, {hayvan} bares its teeth at the street's biggest stray.",
    secenekler: [
      {
        metin: "Let them settle it.",
        basariliSonuc: {
          mesaj: "{hayvan} won; the street collected its bets.",
          detay: "Gambling stains the soul."
        },
        basarisizSonuc: {
          mesaj: "{hayvan} lost; the vet's bill followed.",
          detay: "The brawl honoured nobody."
        }
      },
      {
        metin: "Pull {hayvan} away by the leash.",
        basariliSonuc: {
          mesaj: "{hayvan} grumbled but followed.",
          detay: "One more peaceful day."
        },
        basarisizSonuc: {
          mesaj: "{hayvan} snapped at you and broke free.",
          detay: "The fight happened anyway."
        }
      }
    ]
  },
  evcil_hayvan_kopek_istasyon_yabanci: {
    baslik: "The Stranger at the Station",
    metin: "On the platform {hayvan} growls at an odd stranger loitering among the luggage.",
    secenekler: [
      {
        metin: "Confront the stranger.",
        basariliSonuc: {
          mesaj: "A pickpocket! You returned the wallet and got a reward.",
          detay: "{hayvan} wagged proudly."
        },
        basarisizSonuc: {
          mesaj: "The stranger flung a case and knocked you down.",
          detay: "The crowd just watched."
        }
      },
      {
        metin: "Report to the clerk, step away.",
        basariliSonuc: {
          mesaj: "The clerk took the stranger aside.",
          detay: "Nobody was harmed."
        },
        basarisizSonuc: {
          mesaj: "The stranger slipped away having emptied your pocket.",
          detay: "{hayvan} was right."
        }
      }
    ]
  },
  evcil_hayvan_kopek_yavrulama: {
    baslik: "New Puppies",
    metin: "{hayvan} has whelped; tiny paws squirm by the hearth.",
    secenekler: [
      {
        metin: "Try to sell the puppies.",
        basariliSonuc: {
          mesaj: "The puppies found homes; your purse filled.",
          detay: "{hayvan} searched for days."
        },
        basarisizSonuc: {
          mesaj: "No buyers came; feeding them was a burden.",
          detay: "Too many mouths at home."
        }
      },
      {
        metin: "Keep the pups by the hearth.",
        basariliSonuc: {
          mesaj: "The house is lively; {hayvan} is at peace.",
          detay: "The bowl is always empty."
        },
        basarisizSonuc: {
          mesaj: "A pup fell ill; you paid for medicine.",
          detay: "{hayvan} kept watch till morning."
        }
      }
    ]
  },
  evcil_hayvan_kopek_yaslanma: {
    baslik: "An Old Friend",
    metin: "{hayvan} walks slowly now, eyes clouded; its old cheer has faded.",
    secenekler: [
      {
        metin: "Take one last long walk.",
        basariliSonuc: {
          mesaj: "{hayvan} ran along the old trail once more.",
          detay: "A spark lit its eyes."
        },
        basarisizSonuc: {
          mesaj: "{hayvan} collapsed on the way and never rose.",
          detay: "A silent farewell."
        }
      },
      {
        metin: "Let it rest by the fire.",
        basariliSonuc: {
          mesaj: "{hayvan} dozed off at your feet.",
          detay: "The years weigh heavy."
        },
        basarisizSonuc: {
          mesaj: "{hayvan} whimpered restlessly at night.",
          detay: "Helplessness hurts."
        }
      }
    ]
  },
  evcil_hayvan_kopek_kayip_cocuk: {
    baslik: "The Lost Child",
    metin: "A neighbour's child hasn't returned by dusk; {hayvan} sniffs a trail and heads for the woods.",
    secenekler: [
      {
        metin: "Follow {hayvan}.",
        basariliSonuc: {
          mesaj: "You found the child in a ditch; the village cheered.",
          detay: "The night walk was gruelling."
        },
        basarisizSonuc: {
          mesaj: "You lost the trail and searched until morning.",
          detay: "Others found the child."
        }
      },
      {
        metin: "Rally the villagers to search.",
        basariliSonuc: {
          mesaj: "The crowd found the child together.",
          detay: "{hayvan} still led the way."
        },
        basarisizSonuc: {
          mesaj: "Too late; the child was half frozen.",
          detay: "Time was precious."
        }
      }
    ]
  },
  evcil_hayvan_kopek_hasta_bakim: {
    baslik: "A Sick Hound",
    metin: "{hayvan} hasn't eaten in two days and trembles; its eyes seem to plead.",
    secenekler: [
      {
        metin: "Take it to a healer and buy costly medicine.",
        basariliSonuc: {
          mesaj: "The medicine worked; {hayvan} wagged again.",
          detay: "Lighter purse, lighter heart."
        },
        basarisizSonuc: {
          mesaj: "The medicine was wasted; {hayvan} stayed weak.",
          detay: "Some ills are stubborn."
        }
      },
      {
        metin: "Nurse it at home with herbs.",
        basariliSonuc: {
          mesaj: "{hayvan} recovered within a week.",
          detay: "Sleepless nights."
        },
        basarisizSonuc: {
          mesaj: "No improvement; you sat up beside it all night.",
          detay: "Helplessness wears you down."
        }
      }
    ]
  }
};
