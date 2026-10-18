import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/evcilHayvan.ts — İngilizce çevirileri. */
export const OLAYLAR_EVCIL_HAYVAN_EN: Record<string, OlayCeviri> = {
  evcil_hayvan_hastalik: {
    baslik: "A Sick Friend",
    metin: "{hayvan} has been listless and off its food for days. Do something.",
    secenekler: [
      {
        metin: "Take them to an animal healer.",
        basariliSonuc: {
          mesaj: "With treatment, {hayvan} was cheerful again in days.",
          detay: "Some expenses aren't questioned.",
        },
        basarisizSonuc: {
          mesaj: "The healer tried, but {hayvan} still isn't well.",
          detay: "Not every treatment works at once.",
        },
      },
      {
        metin: "Care for them at home yourself.",
        basariliSonuc: {
          mesaj: "Your patient care worked; {hayvan} recovered.",
          detay: "Sometimes love beats money.",
        },
        basarisizSonuc: {
          mesaj: "They worsened; {hayvan} could not be saved.",
          detay: "This pain will last.",
        },
      },
    ],
  },

  evcil_hayvan_sadakat_ani: {
    baslik: "A Silent Loyalty",
    metin:
      "You came home tired. {hayvan} waited at the door and nestled up as if it understood everything.",
    secenekler: [
      {
        metin: "Sit with them, savor the moment.",
        basariliSonuc: {
          mesaj: "That quiet moment lifted the day's weariness.",
          detay: "Sometimes the best comfort is silent.",
        },
        basarisizSonuc: {
          mesaj: "For a short while, you felt relieved.",
          detay: "Small moments matter too.",
        },
      },
      {
        metin: "You're tired, go straight to sleep.",
        basariliSonuc: {
          mesaj: "You slept well but missed that moment.",
          detay: "Some moments don't come again.",
        },
        basarisizSonuc: {
          mesaj: "Sleep wouldn't come; you resented ignoring your pet.",
          detay: "Chances don't come back.",
        },
      },
    ],
  },

  evcil_hayvan_kaybolma: {
    baslik: "A Lost Friend",
    metin: "{hayvan} has been gone two days. The neighbors haven't seen them, but you could search.",
    secenekler: [
      {
        metin: "Watch the sky, wait for your falcon.",
        basariliSonuc: {
          mesaj:
            "The falcon returned on the third morning with a ruby necklace in its talons!",
          detay: "It came back to you, and not empty-handed.",
        },
        basarisizSonuc: {
          mesaj:
            "The falcon returned a week later, exhausted and empty-taloned.",
          detay: "This time the sky gave it nothing.",
        },
      },
      {
        metin: "Search street by street.",
        basariliSonuc: {
          mesaj: "Hours later you found {hayvan} in a side street and went home.",
          detay: "Your persistence paid off.",
        },
        basarisizSonuc: {
          mesaj: "No matter how you searched, you couldn't find {hayvan}.",
          detay: "Some losses ease with time.",
        },
      },
      {
        metin: "Hope they return on their own.",
        basariliSonuc: {
          mesaj: "A few days later {hayvan} showed up at the door.",
          detay: "Sometimes patience beats searching.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} never came back.",
          detay: "Some farewells are silent.",
        },
      },
    ],
  },

  evcil_hayvan_koruma_ani: {
    baslik: "A Loyal Watchman",
    metin:
      "At midnight {hayvan} is growling at the door. Maybe a thief, maybe just a shadow.",
    secenekler: [
      {
        metin: "Get up, check outside.",
        basariliSonuc: {
          mesaj: "There was a thief; thanks to {hayvan}'s warning you chased them off.",
          detay: "You again understood a loyal friend's worth.",
        },
        basarisizSonuc: {
          mesaj: "You fell in the dark, and the thief escaped.",
          detay: "Some nights go roughly.",
        },
      },
      {
        metin: "Ignore it, go back to sleep.",
        basariliSonuc: {
          mesaj: "By morning all was in place; it was just a shadow.",
          detay: "Sometimes the worry is for nothing.",
        },
        basarisizSonuc: {
          mesaj: "In the morning you found things stolen from the storeroom.",
          detay: "You should have heeded {hayvan}'s warning.",
        },
      },
    ],
  },



  evcil_hayvan_sahin_av: {
    baslik: "A Successful Hunt",
    metin:
      "You went hunting with {hayvan}; your falcon's keen eyes seem sure today.",
    secenekler: [
      {
        metin: "Keep hunting, take the risk.",
        basariliSonuc: {
          mesaj: "{hayvan} caught two rabbits in a row; your table is rich.",
          detay: "Training your falcon paid off.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} fought an eagle; you both came back wounded.",
          detay: "The sky isn't always shared.",
        },
      },
      {
        metin: "Return early, avoid the risk.",
        basariliSonuc: {
          mesaj: "You settled for a small catch; you both came back safe.",
          detay: "Little but certain beats a lot.",
        },
        basarisizSonuc: {
          mesaj: "You returned empty-handed; {hayvan} looked as disappointed as you.",
          detay: "Not every day is a hunting day.",
        },
      },
    ],
  },

  evcil_hayvan_sahin_kacis: {
    baslik: "The Call of Freedom",
    metin:
      "{hayvan} sprang off your arm and soared away; maybe just roaming, maybe gone for good.",
    secenekler: [
      {
        metin: "Go after them, call out.",
        basariliSonuc: {
          mesaj: "Hours later {hayvan} landed on your wrist; you were relieved.",
          detay: "Your bond was stronger than you thought.",
        },
        basarisizSonuc: {
          mesaj: "You never saw {hayvan} again.",
          detay: "Some friendships lose to freedom.",
        },
      },
      {
        metin: "Trust them, hope they return.",
        basariliSonuc: {
          mesaj: "Toward evening {hayvan} came back on its own.",
          detay: "Sometimes waiting is enough.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} never came back.",
          detay: "Some farewells are silent.",
        },
      },
    ],
  },



  evcil_hayvan_kedi_yikim: {
    baslik: "By Accident, or on Purpose?",
    metin:
      "Home again, you found {hayvan} by the shards of a valuable pot, looking at you unrepentant.",
    secenekler: [
      {
        metin: "Don't scold, clean up.",
        basariliSonuc: {
          mesaj: "You gathered the pieces; {hayvan} watched happily.",
          detay: "The price of living with cats, you said.",
        },
        basarisizSonuc: {
          mesaj: "The pot was valuable; mending it cost money.",
          detay: "{hayvan} doesn't even care.",
        },
      },
      {
        metin: "Scold it, teach a lesson.",
        basariliSonuc: {
          mesaj: "{hayvan} behaved that day at your voice.",
          detay: "A small victory.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} ignored you and looked out the window.",
          detay: "Cats listen to no one.",
        },
      },
    ],
  },

  evcil_hayvan_kopek_kahramanlik: {
    baslik: "An Unexpected Hero",
    metin:
      "In the market, {hayvan} chased a thief who snatched a child's bread, with unexpected speed.",
    secenekler: [
      {
        metin: "Run after them, set it right.",
        basariliSonuc: {
          mesaj: "{hayvan} caught the thief, the bread came back; you were applauded.",
          detay: "The real star was {hayvan}.",
        },
        basarisizSonuc: {
          mesaj: "You hit a stall while running; the thief escaped.",
          detay: "Good intentions can end in clumsiness.",
        },
      },
      {
        metin: "Stay out, mind your business.",
        basariliSonuc: {
          mesaj: "You just watched; {hayvan} returned to you later.",
          detay: "Not every heroism is yours.",
        },
        basarisizSonuc: {
          mesaj: "Seeing the child cry, your conscience stung.",
          detay: "Watching is a choice too.",
        },
      },
    ],
  },

  evcil_hayvan_altin_kese: {
    baslik: "A Surprise in Its Mouth",
    metin:
      "{hayvan} brought a small jingling purse in its mouth. A few coins gleam inside.",
    secenekler: [
      {
        metin: "Take the purse, don't ask whose.",
        basariliSonuc: {
          mesaj: "A few coins fell into your palm; {hayvan} looked proud.",
          detay: "You'll never learn where it found it.",
        },
        basarisizSonuc: {
          mesaj: "The purse was empty, only pebbles inside.",
          detay: "{hayvan} was pleased anyway.",
        },
      },
      {
        metin: "Find the owner, return it.",
        basariliSonuc: {
          mesaj: "You found the neighbor who lost it; they were grateful.",
          detay: "Your honesty was talked about.",
        },
        basarisizSonuc: {
          mesaj: "No owner came; you left the purse in a charity box.",
          detay: "At least your conscience is clear.",
        },
      },
    ],
  },

  evcil_hayvan_yeni_tanisiklik: {
    baslik: "An Encounter in the Park",
    metin:
      "{hayvan} ran to someone else's beloved animal in the square; apologizing, you fell to chatting.",
    secenekler: [
      {
        metin: "Prolong the chat.",
        basariliSonuc: {
          mesaj: "You made a new acquaintance; {hayvan} was the hidden hero.",
          detay: "Animals make the best introductions.",
        },
        basarisizSonuc: {
          mesaj: "You never got past a brief greeting.",
          detay: "Still, a nice moment.",
        },
      },
      {
        metin: "Cut it short, move on.",
        basariliSonuc: {
          mesaj: "You said a polite goodbye and walked on.",
          detay: "Not every meeting is a friendship.",
        },
        basarisizSonuc: {
          mesaj: "Later you thought you should have stayed a bit.",
          detay: "Some chances don't return.",
        },
      },
    ],
  },

  evcil_hayvan_kopek_ev_tahribati: {
    baslik: "The End of the Chair",
    metin:
      "Home again, you found {hayvan} gnawing your favorite chair's leg; sawdust everywhere.",
    secenekler: [
      {
        metin: "Stay calm, order a new chair.",
        basariliSonuc: {
          mesaj: "You ordered a new chair; {hayvan} left it alone this time.",
          detay: "Habits fade slowly.",
        },
        basarisizSonuc: {
          mesaj: "The new chair got notched within days too.",
          detay: "Some dogs never stop chewing.",
        },
      },
      {
        metin: "Scold it, try to train it.",
        basariliSonuc: {
          mesaj: "Patient training worked; {hayvan} leaves the furniture alone.",
          detay: "Your persistence paid off.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} ignored you and took it as play.",
          detay: "Some lessons aren't learned at once.",
        },
      },
    ],
  },

  evcil_hayvan_kedi_komsu_zarari: {
    baslik: "The Neighbor's Pigeons",
    metin:
      "Your neighbor is at the door: {hayvan} chased and plucked one of their pigeons. They're furious.",
    secenekler: [
      {
        metin: "Apologize, pay for the damage.",
        basariliSonuc: {
          mesaj: "Your apology and small payment calmed the neighbor.",
          detay: "Good neighbors cost a few coins.",
        },
        basarisizSonuc: {
          mesaj: "Your apology was accepted but the neighbor stayed cold.",
          detay: "Resentments pass slowly.",
        },
      },
      {
        metin: "It's a cat's nature, defend it.",
        basariliSonuc: {
          mesaj: "The neighbor grumbled and let it go.",
          detay: "Cats answer to no one.",
        },
        basarisizSonuc: {
          mesaj: "The neighbor stopped speaking to you.",
          detay: "Some defenses make it worse.",
        },
      },
    ],
  },




  evcil_hayvan_kedi_hirsiz_hediyesi: {
    baslik: "The Cat's Loot",
    metin:
      "{hayvan} proudly left a shiny ring on your bed, probably 'borrowed' through a neighbor's open window.",
    secenekler: [
      {
        metin: "Keep the ring, ask no one.",
        basariliSonuc: {
          mesaj: "You hid the ring; no one suspected {hayvan}.",
          detay: "Cats have no conscience; yours shrank.",
        },
        basarisizSonuc: {
          mesaj: "The neighbor saw the ring in your house and accused you of theft!",
          detay: "The cat's crime fell on you.",
        },
      },
      {
        metin: "Find the owner, return it.",
        basariliSonuc: {
          mesaj: "You found the owner; the grateful neighbor gave a small reward.",
          detay: "Your honesty was talked about.",
        },
        basarisizSonuc: {
          mesaj: "No owner appeared; the ring was forgotten in a drawer.",
          detay: "Some good intentions go unrewarded.",
        },
      },
    ],
  },

  evcil_hayvan_kedi_agactan_kurtarma: {
    baslik: "The Cat Stuck at the Top",
    metin:
      "{hayvan} climbed the garden's highest branch and can't get down, meowing desperately. Neighbors watch from windows.",
    secenekler: [
      {
        metin: "Climb up yourself, take the risk.",
        basariliSonuc: {
          mesaj: "With effort you took {hayvan} in your arms; the neighborhood applauded.",
          detay: "Heroism is sometimes just climbing a tree.",
        },
        basarisizSonuc: {
          mesaj: "The branch broke, you crashed! {hayvan} jumped down on its own.",
          detay: "Your cat proved more capable than you.",
        },
      },
      {
        metin: "Pay the neighbor's boy to climb.",
        basariliSonuc: {
          mesaj: "The nimble boy got {hayvan} down in minutes.",
          detay: "Some jobs belong to experts.",
        },
        basarisizSonuc: {
          mesaj: "The boy panicked halfway; {hayvan} stayed up till evening.",
          detay: "Sometimes even money doesn't help.",
        },
      },
    ],
  },

  evcil_hayvan_kopek_yarali_kahraman: {
    baslik: "The Watchman's Price",
    metin:
      "Chasing a thief, {hayvan} was badly wounded. The city's best animal healer is costly but reliable.",
    secenekler: [
      {
        metin: "Get the best treatment.",
        basariliSonuc: {
          mesaj: "The healer worked hard; {hayvan} was up within days.",
          detay: "You repaid its loyalty.",
        },
        basarisizSonuc: {
          mesaj: "The wounds were severe; {hayvan} healed slowly, limping.",
          detay: "Money guarantees nothing.",
        },
      },
      {
        metin: "Try caring for it at home yourself.",
        basariliSonuc: {
          mesaj: "You kept vigil for nights; {hayvan} stubbornly healed.",
          detay: "Love is sometimes stronger than gold.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} closed its eyes a few days later.",
          detay: "You'll never forget this price.",
        },
      },
    ],
  },

  evcil_hayvan_kopek_asil_kavgasi: {
    baslik: "Whose Dog Is in the Right?",
    metin:
      "{hayvan} fought an influential family's dog. Who bit whom is unclear, but the family demands compensation.",
    secenekler: [
      {
        metin: "Quietly pay the compensation.",
        basariliSonuc: {
          mesaj: "You paid; the family left grumbling.",
          detay: "Sometimes being right isn't enough; money talks.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but the incident became neighborhood gossip.",
          detay: "Silence sometimes isn't enough.",
        },
      },
      {
        metin: "Defend your dog to the end.",
        basariliSonuc: {
          mesaj: "Witnesses sided with you; the family backed down.",
          detay: "Defending the truth sometimes works.",
        },
        basarisizSonuc: {
          mesaj:
            "The family prevailed; you paid and were called 'insolent'.",
          detay: "Arguing with the powerful costs dearly.",
        },
      },
    ],
  },

  evcil_hayvan_sahin_turnuva: {
    baslik: "The Falconry Contest",
    metin:
      "Falconers gathered for a tournament; {hayvan} could bring fame, but may be lost on the dangerous course.",
    secenekler: [
      {
        metin: "Enter the hardest course.",
        basariliSonuc: {
          mesaj: "{hayvan} reached the top! Your name is tied to falconry.",
          detay: "Some risks pay off hugely.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} vanished on the horizon chasing prey, never returning.",
          detay: "Fame sometimes costs a loyal friend.",
        },
      },
      {
        metin: "Enter only an easy demonstration.",
        basariliSonuc: {
          mesaj: "The small show was praised; {hayvan} returned safely to your shoulder.",
          detay: "Caution isn't always bad.",
        },
        basarisizSonuc: {
          mesaj: "The show was dull; nobody cared.",
          detay: "Some days aren't for shining.",
        },
      },
    ],
  },

  evcil_hayvan_sahin_dusman_mesaji: {
    baslik: "A Letter That Fell Into the Wrong Talon",
    metin:
      "Back from the hunt, {hayvan} brought a sealed letter that isn't its own; maybe a secret correspondence.",
    secenekler: [
      {
        metin: "Break the seal, learn the secret.",
        basariliSonuc: {
          mesaj: "The secrets astonished you; they may serve you later.",
          detay: "Another's secret is a heavy burden.",
        },
        basarisizSonuc: {
          mesaj: "You were caught reading it; 'spy' rumors spread.",
          detay: "Curiosity left you in a bind.",
        },
      },
      {
        metin: "Deliver it to the owner, seal intact.",
        basariliSonuc: {
          mesaj: "The letter reached its owner; his relief was priceless.",
          detay: "Your honesty was quietly rewarded.",
        },
        basarisizSonuc: {
          mesaj: "No owner appeared; the letter gathered dust in a drawer.",
          detay: "Some good intentions miss their goal.",
        },
      },
    ],
  },



};
