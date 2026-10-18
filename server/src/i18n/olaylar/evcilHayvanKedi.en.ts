import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/evcilHayvanKedi.ts — İngilizce çevirileri. */
export const OLAYLAR_EVCIL_HAYVAN_KEDI_EN: Record<string, OlayCeviri> = {
  hayvan_karsilasma_kedi_oc_1: {
    baslik: "Workshop Raid",
    metin: "A grain sack in your workshop is torn open, and a skinny cat hisses at you from inside.",
    secenekler: [
      {
        metin: "Wait for it to calm, offer food.",
        basariliSonuc: {
          mesaj: "The cat grabbed the food and settled in your corner.",
          detay: "The hissing turned to purring.",
        },
        basarisizSonuc: {
          mesaj: "The cat clawed your hand and fled with the food.",
          detay: "Trust isn't won in a day.",
        },
      },
      {
        metin: "Chase it off with a stick.",
        basariliSonuc: {
          mesaj: "You drove the cat off; the sack is still torn.",
          detay: "Your conscience stayed uneasy.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  hayvan_karsilasma_kedi_oc_2: {
    baslik: "The Tavern's Choice",
    metin: "In a crowded inn, the grumpiest cat skips every table, leaps into your lap and falls asleep.",
    secenekler: [
      {
        metin: "Haggle with the innkeeper and adopt it.",
        basariliSonuc: {
          mesaj: "The innkeeper let you have the cat for a few coins.",
          detay: "The grumpy cat had chosen you.",
        },
        basarisizSonuc: {
          mesaj: "The innkeeper doubled the price; the deal fell through.",
          detay: "The cat kept sleeping, unbothered.",
        },
      },
      {
        metin: "Get up from the table and leave.",
        basariliSonuc: {
          mesaj: "You lifted the cat off your lap and walked out.",
          detay: "The warmth in your lap lingered a moment.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  hayvan_karsilasma_kedi_oc_3: {
    baslik: "Rainy Night",
    metin: "Sheltering under the eaves in a storm, a shivering kitten tries to crawl under your cloak.",
    secenekler: [
      {
        metin: "Take it in and warm it up.",
        basariliSonuc: {
          mesaj: "The kitten fell asleep purring against your chest.",
          detay: "The storm no longer matters.",
        },
        basarisizSonuc: {
          mesaj: "Once warm, the kitten bolted into the dark.",
          detay: "You stayed wet and caught a chill.",
        },
      },
      {
        metin: "Push it away.",
        basariliSonuc: {
          mesaj: "You shoved the kitten back into the rain.",
          detay: "Its mewing followed you a while.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  hayvan_karsilasma_kedi_sd_1: {
    baslik: "The Depot Hunter",
    metin: "In the factory depot, an oil-scented cat catches a rat and drops it at your feet.",
    secenekler: [
      {
        metin: "Take the depot cat home.",
        basariliSonuc: {
          mesaj: "You sacked the cat up and carried it home.",
          detay: "It left the machine noise behind.",
        },
        basarisizSonuc: {
          mesaj: "The cat leapt from the sack and scratched your face.",
          detay: "It ran back to the depot.",
        },
      },
      {
        metin: "Ignore it.",
        basariliSonuc: {
          mesaj: "You kicked the rat aside and marched to your shift.",
          detay: "The cat's gaze stayed on your back.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  hayvan_karsilasma_kedi_sd_2: {
    baslik: "A Passenger on the Platform",
    metin: "As the train is about to leave, a stray cat climbs the carriage step and stares at you.",
    secenekler: [
      {
        metin: "Take the cat and board.",
        basariliSonuc: {
          mesaj: "With the cat in your arms, you rode home.",
          detay: "A cheap ticket, a precious companion.",
        },
        basarisizSonuc: {
          mesaj: "You slipped off the step grabbing the cat.",
          detay: "The cat vanished into the crowd.",
        },
      },
      {
        metin: "Leave the cat, board the train.",
        basariliSonuc: {
          mesaj: "The cat was left on the platform as the train pulled out.",
          detay: "You looked back once from the window.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  hayvan_karsilasma_kedi_sd_3: {
    baslik: "Inky Paws",
    metin: "In the print shop, a cat knocks over the inkwell and tracks inky paw prints across the proofs.",
    secenekler: [
      {
        metin: "Laugh and adopt the cat.",
        basariliSonuc: {
          mesaj: "The foreman laughed and let you keep the cat.",
          detay: "The paw prints stayed in the print run.",
        },
        basarisizSonuc: {
          mesaj: "The spoiled prints were charged to you.",
          detay: "The cat was thrown out again.",
        },
      },
      {
        metin: "Throw the cat out.",
        basariliSonuc: {
          mesaj: "You put the cat out the door.",
          detay: "The paper was saved, your conscience wasn't.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  evcil_hayvan_kedi_degirmen_fare: {
    baslik: "Mice in the Granary",
    metin: "Mice have multiplied in the grain store. {hayvan} waits patiently at the door.",
    secenekler: [
      {
        metin: "Entrust the granary to {hayvan}.",
        basariliSonuc: {
          mesaj: "{hayvan} hunted all night; the grain was saved.",
          detay: "The saved stock paid for itself.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} slept; the mice chewed through the sacks.",
          detay: "Cats are no sure bet.",
        },
      },
      {
        metin: "Set traps, leave the cat out.",
        basariliSonuc: {
          mesaj: "The traps caught a few mice.",
          detay: "{hayvan} looked sulky.",
        },
        basarisizSonuc: {
          mesaj: "The traps weren't enough; small but annoying losses.",
        },
      },
    ],
  },
  evcil_hayvan_kedi_gece_nobeti: {
    baslik: "Night Watch",
    metin: "In the dead of night, {hayvan} stares into a dark corner, fur bristling.",
    secenekler: [
      {
        metin: "Follow the sound.",
        basariliSonuc: {
          mesaj: "You caught a thief by the wall and earned a reward.",
          detay: "{hayvan} had sensed it.",
        },
        basarisizSonuc: {
          mesaj: "In the dark, the thief's club found you.",
          detay: "{hayvan} had warned you.",
        },
      },
      {
        metin: "Hold {hayvan}, bolt the door.",
        basariliSonuc: {
          mesaj: "You kept watch together until dawn.",
          detay: "Nobody tried the door.",
        },
        basarisizSonuc: {
          mesaj: "You lost sleep; by morning the house was ransacked.",
        },
      },
    ],
  },
  evcil_hayvan_kedi_gizli_gecit: {
    baslik: "The Crack in the Wall",
    metin: "{hayvan} slipped through a crack in the wall; behind it lies an old passage.",
    secenekler: [
      {
        metin: "Follow its trail inside.",
        basariliSonuc: {
          mesaj: "At the passage's end you found a forgotten chest.",
          detay: "{hayvan} knew the way.",
        },
        basarisizSonuc: {
          mesaj: "Stones fell from the ceiling; you barely got out.",
          detay: "{hayvan} had already returned.",
        },
      },
      {
        metin: "Seal the crack, let the cat return.",
        basariliSonuc: {
          mesaj: "{hayvan} came back by itself in the evening.",
          detay: "The passage's secret stayed in the wall.",
        },
        basarisizSonuc: {
          mesaj: "Mixing mortar, you knocked over the bench.",
        },
      },
    ],
  },
  evcil_hayvan_kedi_yavrulama: {
    baslik: "Hidden Kittens",
    metin: "{hayvan} hid in the hayloft and gave birth; you hear tiny mews.",
    secenekler: [
      {
        metin: "Give the kittens to neighbors.",
        basariliSonuc: {
          mesaj: "The kittens went to good homes; neighbors are grateful.",
          detay: "{hayvan} watched them go quietly.",
        },
        basarisizSonuc: {
          mesaj: "Neighbors didn't want them; they were left to the streets.",
        },
      },
      {
        metin: "Sell them at the market.",
        basariliSonuc: {
          mesaj: "The kittens were snapped up for a few coins.",
          detay: "{hayvan} waited long at the door.",
        },
        basarisizSonuc: {
          mesaj: "No buyers came; {hayvan} sulked.",
        },
      },
      {
        metin: "Raise them all at home.",
        basariliSonuc: {
          mesaj: "The house filled with kitten laughter and fur.",
          detay: "Tiring but sweet.",
        },
        basarisizSonuc: {
          mesaj: "As the kittens ate, your purse emptied.",
        },
      },
    ],
  },
  evcil_hayvan_kedi_fabrika_buhari: {
    baslik: "The Cat at the Door",
    metin: "On your way to the factory, {hayvan} blocks your path and clings to your leg.",
    secenekler: [
      {
        metin: "Step past, go to your shift.",
        basariliSonuc: {
          mesaj: "Overtime was offered; your pay rose.",
          detay: "{hayvan} waited for you in the evening.",
        },
        basarisizSonuc: {
          mesaj: "A steam pipe burst; you got away with burns.",
          detay: "{hayvan} was right.",
        },
      },
      {
        metin: "Skip work today.",
        basariliSonuc: {
          mesaj: "You lost the day's wage, but {hayvan} is with you.",
          detay: "The cat never left your side.",
        },
        basarisizSonuc: {
          mesaj: "The foreman was angry at your absence; wages docked.",
        },
      },
    ],
  },
  evcil_hayvan_kedi_gece_hirsizi: {
    baslik: "Hissing at the Window",
    metin: "As the gas lamp flickers, {hayvan} hisses at the window; someone is climbing the garden fence.",
    secenekler: [
      {
        metin: "Take a lantern and go out.",
        basariliSonuc: {
          mesaj: "The thief fled at the light; the neighborhood talked.",
          detay: "{hayvan} proudly swished its tail.",
        },
        basarisizSonuc: {
          mesaj: "You were shoved in the dark; something got stolen.",
        },
      },
      {
        metin: "Lock the door and wait.",
        basariliSonuc: {
          mesaj: "The thief lost his nerve and slunk away.",
          detay: "{hayvan} kept its watch.",
        },
        basarisizSonuc: {
          mesaj: "The thief made off with things from the stable.",
        },
      },
    ],
  },
  evcil_hayvan_kedi_sahip_iddiasi: {
    baslik: "My Cat",
    metin: "A stranger on the street pets {hayvan} and says, \"That's my cat.\"",
    secenekler: [
      {
        metin: "Prove it, demand it back.",
        basariliSonuc: {
          mesaj: "{hayvan} chose you, not the man; he backed off.",
          detay: "The cat nuzzled up to you.",
        },
        basarisizSonuc: {
          mesaj: "The man rallied the crowd; the blame fell on you.",
        },
      },
      {
        metin: "Pay a bit and settle.",
        basariliSonuc: {
          mesaj: "The man took the money and left.",
          detay: "The cat didn't care either way.",
        },
        basarisizSonuc: {
          mesaj: "The man took the money but spread gossip anyway.",
        },
      },
    ],
  },
  evcil_hayvan_kedi_komur_oksuruk: {
    baslik: "Coal Smoke",
    metin: "{hayvan} is coughing from the coal smoke and has lost its appetite.",
    secenekler: [
      {
        metin: "Take it to an animal doctor.",
        basariliSonuc: {
          mesaj: "With medicine, {hayvan} recovered in a few days.",
          detay: "The expense paid off.",
        },
        basarisizSonuc: {
          mesaj: "The doctor fell short; {hayvan} is still weak.",
        },
      },
      {
        metin: "Warm milk and rest at home.",
        basariliSonuc: {
          mesaj: "{hayvan} recovered thanks to your care.",
          detay: "Patience costs nothing.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} succumbed to the illness.",
          detay: "This pain won't pass easily.",
        },
      },
      {
        metin: "Move away from the smoke.",
        basariliSonuc: {
          mesaj: "In clean air, you both felt better.",
        },
        basarisizSonuc: {
          mesaj: "The move was costly; the cat still coughs.",
        },
      },
    ],
  },
  evcil_hayvan_kedi_gogus_huzuru: {
    baslik: "The Weight of a Purr",
    metin: "You came home tired; {hayvan} is curled on your chest, purring. The world goes quiet.",
    secenekler: [
      {
        metin: "Stay still and wait.",
        basariliSonuc: {
          mesaj: "You drifted off to the purr and woke refreshed.",
          detay: "Some peace comes for free.",
        },
        basarisizSonuc: {
          mesaj: "Your arm went numb; you woke up stiff.",
        },
      },
      {
        metin: "Set the cat down, get to work.",
        basariliSonuc: {
          mesaj: "You got some work done; {hayvan} stepped down reluctantly.",
          detay: "You chose productivity over peace.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  evcil_hayvan_kedi_kiskanc_misafir: {
    baslik: "Jealous Eyes",
    metin: "{hayvan} turns its back on visiting {dost} and hisses; the two won't make peace.",
    secenekler: [
      {
        metin: "Reward the cat to win it over.",
        basariliSonuc: {
          mesaj: "{hayvan} finally climbed onto {dost}'s lap.",
          detay: "The ice began to melt.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} scratched {dost}; the mood turned tense.",
        },
      },
      {
        metin: "Shut the cat in another room.",
        basariliSonuc: {
          mesaj: "The visit went smoothly; {hayvan} scratched the door.",
          detay: "Peace cost a bit.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan}'s wailing kept interrupting the chat.",
        },
      },
    ],
  },
  evcil_hayvan_kedi_uc_gun_kayip: {
    baslik: "Three Days of Silence",
    metin: "{hayvan} hasn't been seen for three days; the bowl by the door is still full.",
    secenekler: [
      {
        metin: "Search street by street.",
        basariliSonuc: {
          mesaj: "{hayvan} was found three streets away, fed by someone else.",
          detay: "It meowed when it saw you.",
        },
        basarisizSonuc: {
          mesaj: "You searched all day and came back empty-handed.",
        },
      },
      {
        metin: "Ask the neighbors, leave word.",
        basariliSonuc: {
          mesaj: "A neighbor saw {hayvan} on a roof; you got it down.",
        },
        basarisizSonuc: {
          mesaj: "Nobody had seen it; the gossip wore you out.",
        },
      },
      {
        metin: "Leave the door open and wait.",
        basariliSonuc: {
          mesaj: "{hayvan} slipped quietly into bed that night.",
          detay: "Your waiting wasn't in vain.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} never came back.",
          detay: "The empty bowl stayed a long time.",
        },
      },
    ],
  },
  evcil_hayvan_kedi_zar_masasi: {
    baslik: "The Cat on the Dice",
    metin: "During a dice game, {hayvan} leapt onto the table and sat on the dice; everyone calls it an omen.",
    secenekler: [
      {
        metin: "Play the last bet trusting the cat.",
        basariliSonuc: {
          mesaj: "The dice fell your way; you swept the table.",
          detay: "The cat got all the credit for luck.",
        },
        basarisizSonuc: {
          mesaj: "The dice didn't smile on you; the bet is gone.",
          detay: "{hayvan} didn't care.",
        },
      },
      {
        metin: "Quit the game, take the cat.",
        basariliSonuc: {
          mesaj: "You left the table with {hayvan}.",
          detay: "Pockets empty, mind clear.",
        },
        basarisizSonuc: {
          mesaj: "The others branded you a coward.",
        },
      },
    ],
  },
};
