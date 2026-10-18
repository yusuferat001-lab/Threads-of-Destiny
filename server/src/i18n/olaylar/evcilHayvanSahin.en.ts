import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/evcilHayvanSahin.ts — İngilizce çevirileri. */
export const OLAYLAR_EVCIL_HAYVAN_SAHIN_EN: Record<string, OlayCeviri> = {
  hayvan_karsilasma_sahin_oc_1: {
    baslik: "Nobility in a Cage",
    metin: "A noble falcon sits in a cramped cage on the caravan; the merchant wants to dump it cheap.",
    secenekler: [
      {
        metin: "Buy it and set it free.",
        basariliSonuc: {
          mesaj: "You opened the cage; the falcon quietly perched on your shoulder.",
          detay: "Freedom is bought dearly.",
        },
        basarisizSonuc: {
          mesaj: "The falcon tore your hand and flew off the caravan.",
          detay: "A wild heart is not easily tamed.",
        },
      },
      {
        metin: "Walk past without a glance.",
        basariliSonuc: {
          mesaj: "That caged stare would not leave your mind.",
          detay: "Some gazes follow you home.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  hayvan_karsilasma_sahin_oc_2: {
    baslik: "Fallen From the Sky",
    metin: "On a lonely road, a falcon with an arrow in its wing dropped before you.",
    secenekler: [
      {
        metin: "Pull the arrow, risk your hands.",
        basariliSonuc: {
          mesaj: "You pulled the arrow; the falcon trusted you despite the talons.",
          detay: "The wound left a scar, and a bond.",
        },
        basarisizSonuc: {
          mesaj: "The falcon thrashed, ripped your hand and vanished into the brush.",
          detay: "A wounded bird can't tell friend from foe.",
        },
      },
      {
        metin: "Leave it to nature.",
        basariliSonuc: {
          mesaj: "You walked on without looking back.",
          detay: "Conscience walks with you to the road's end.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  hayvan_karsilasma_sahin_oc_3: {
    baslik: "The Guest on the Sill",
    metin: "You opened the window at dawn; a weary falcon with a torn leather jess sat on the sill.",
    secenekler: [
      {
        metin: "Win its trust slowly.",
        basariliSonuc: {
          mesaj: "After days of offering meat, the falcon finally perched on your hand.",
          detay: "Patience is the only road to trust.",
        },
        basarisizSonuc: {
          mesaj: "The falcon pecked your hand and vanished from the window.",
          detay: "Not every guest stays.",
        },
      },
      {
        metin: "Close the window.",
        basariliSonuc: {
          mesaj: "You ignored the beating of wings against the glass.",
          detay: "A closed window is a door unopened.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  hayvan_karsilasma_sahin_sd_1: {
    baslik: "The Lodge's Ill-Tempered Falcon",
    metin: "At a country lodge a falcon wounded a servant; the owner wants it shot.",
    secenekler: [
      {
        metin: "Buy the bird and train it.",
        basariliSonuc: {
          mesaj: "The owner handed the bird over; the falcon is yours now.",
          detay: "The sullen bird was only waiting for its master.",
        },
        basarisizSonuc: {
          mesaj: "The falcon attacked you too; the owner had it shot.",
          detay: "Some tempers can't be trained.",
        },
      },
      {
        metin: "Stay out of it and leave.",
        basariliSonuc: {
          mesaj: "You left early so as not to hear the bird's fate.",
          detay: "Silence is also a choice.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  hayvan_karsilasma_sahin_sd_2: {
    baslik: "The Customs Warehouse Auction",
    metin: "At the harbor, exotic birds seized by customs are being auctioned; a chained falcon is among them.",
    secenekler: [
      {
        metin: "Bid for the falcon.",
        basariliSonuc: {
          mesaj: "You won the bid; the falcon was freed from its chain.",
          detay: "A dearly bought bird is a treasured one.",
        },
        basarisizSonuc: {
          mesaj: "A merchant snatched the bid; you waited for nothing.",
          detay: "Those who rush at auctions lose.",
        },
      },
      {
        metin: "Watch the auction, then leave.",
        basariliSonuc: {
          mesaj: "You watched the falcon pass into another's hands.",
          detay: "Watching doesn't lift responsibility.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  hayvan_karsilasma_sahin_sd_3: {
    baslik: "The Bird at the Carriage Window",
    metin: "A weary falcon landed on the steam train's window; it wears a worn ring on its leg.",
    secenekler: [
      {
        metin: "Open the window, take the bird.",
        basariliSonuc: {
          mesaj: "As passengers gaped, the falcon stepped onto your arm.",
          detay: "The train ride gave you a companion.",
        },
        basarisizSonuc: {
          mesaj: "Passengers shouted; the falcon tore your hand and flew off.",
          detay: "A crowd is a bird's worst enemy.",
        },
      },
      {
        metin: "Keep the window shut.",
        basariliSonuc: {
          mesaj: "The bird lost to the train's speed and fell behind.",
          detay: "Some chances stay on the rails.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  evcil_hayvan_sahin_soylu_davet: {
    baslik: "A Noble's Hunt Invitation",
    metin: "A local noble invited you to a hunting display; all eyes are on {hayvan}'s skill.",
    secenekler: [
      {
        metin: "Perform a daring hunt.",
        basariliSonuc: {
          mesaj: "{hayvan} outflew the noble's own bird; applause rained on you.",
          detay: "Showing off breeds arrogance too.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} missed the prey; the nobles whispered.",
          detay: "Big stage, big shame.",
        },
      },
      {
        metin: "Give a modest display.",
        basariliSonuc: {
          mesaj: "The display was calm but flawless.",
          detay: "Restraint is reputation's quiet friend.",
        },
        basarisizSonuc: {
          mesaj: "Nobody paid the display any attention.",
          detay: "The modest can fade too.",
        },
      },
    ],
  },
  evcil_hayvan_sahin_vali_hediye: {
    baslik: "The Governor's Favorite",
    metin: "The governor admired {hayvan} and wants it as a gift.",
    secenekler: [
      {
        metin: "Gift the falcon to the governor.",
        basariliSonuc: {
          mesaj: "The governor is pleased; {hayvan} now sits on his arm.",
          detay: "Patronage never replaces a friend.",
        },
        basarisizSonuc: {
          mesaj: "The governor took the bird and forgot his promise.",
          detay: "A gift guarantees no return.",
        },
      },
      {
        metin: "Win his favor with a hunt display.",
        basariliSonuc: {
          mesaj: "He was awed, let you keep the bird and honored you instead.",
          detay: "Skill outweighs property.",
        },
        basarisizSonuc: {
          mesaj: "The governor disliked the display and took offense.",
          detay: "The mighty are hard to please.",
        },
      },
      {
        metin: "Politely refuse.",
        basariliSonuc: {
          mesaj: "The governor was offended but sent you off with respect.",
          detay: "Standing firm earns respect too.",
        },
        basarisizSonuc: {
          mesaj: "The governor took your refusal as an insult.",
          detay: "Saying no to the mighty is costly.",
        },
      },
    ],
  },
  evcil_hayvan_sahin_haydut_pusu: {
    baslik: "Highwaymen",
    metin: "Bandits blocked the wooded road; {hayvan} flutters restlessly on your shoulder.",
    secenekler: [
      {
        metin: "Loose {hayvan} on them.",
        basariliSonuc: {
          mesaj: "{hayvan} dove; the bandits dropped their purse and fled.",
          detay: "Talons speak faster than swords.",
        },
        basarisizSonuc: {
          mesaj: "The bandits answered with arrows; you were hurt.",
          detay: "Intimidation doesn't always work.",
        },
      },
      {
        metin: "Take another road, flee.",
        basariliSonuc: {
          mesaj: "You slipped through safely by a roundabout road.",
          detay: "Fleeing can be wisdom too.",
        },
        basarisizSonuc: {
          mesaj: "The ambush caught you anyway.",
          detay: "Escape isn't always enough.",
        },
      },
    ],
  },
  evcil_hayvan_sahin_tuy_dokumu: {
    baslik: "Molting",
    metin: "{hayvan}'s feathers are falling out; you can't tell if it's seasonal or an illness.",
    secenekler: [
      {
        metin: "Take it to a falconry master.",
        basariliSonuc: {
          mesaj: "The master restored {hayvan} to its former glory.",
          detay: "In skilled hands, care works wonders.",
        },
        basarisizSonuc: {
          mesaj: "The master couldn't find the cause; recovery is slow.",
          detay: "No expert cures every ill.",
        },
      },
      {
        metin: "Tend it yourself and wait.",
        basariliSonuc: {
          mesaj: "The feathers renewed on their own; {hayvan} recovered.",
          detay: "Nature knows its work.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} stayed listless for days; it saddened you.",
          detay: "Neglect grows in silence.",
        },
      },
    ],
  },
  evcil_hayvan_sahin_rakip_goz: {
    baslik: "Envious Eyes",
    metin: "{rakip} has set eyes on {hayvan} and presses you to sell the bird.",
    secenekler: [
      {
        metin: "Challenge {rakip}.",
        basariliSonuc: {
          mesaj: "{rakip} backed down; folks talked about your defiance.",
          detay: "Courage makes enemies too.",
        },
        basarisizSonuc: {
          mesaj: "{rakip} cornered you in the street.",
          detay: "A harsh move invites a harsh reply.",
        },
      },
      {
        metin: "Hide the bird, show no one.",
        basariliSonuc: {
          mesaj: "You kept the bird behind curtains for a while.",
          detay: "A hidden friend grows in shadow.",
        },
        basarisizSonuc: {
          mesaj: "{rakip} found its trail anyway.",
          detay: "Secrecy leaves clues as well.",
        },
      },
    ],
  },
  evcil_hayvan_sahin_fabrikator: {
    baslik: "The Industrialist's Curiosity",
    metin: "A wealthy industrialist saw {hayvan} and invited you to a hunt party and business dinner.",
    secenekler: [
      {
        metin: "Attend and show off the bird.",
        basariliSonuc: {
          mesaj: "The industrialist was impressed; you made a business contact.",
          detay: "Connections sometimes eat at your pride.",
        },
        basarisizSonuc: {
          mesaj: "You were looked down on at the party; the bird became a spectacle.",
          detay: "At the rich man's table, everyone is a stranger.",
        },
      },
      {
        metin: "Politely decline the invitation.",
        basariliSonuc: {
          mesaj: "You kept your independence and missed the chance.",
          detay: "Some doors stay closed.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  evcil_hayvan_sahin_park_sikayeti: {
    baslik: "Complaint in the Park",
    metin: "{hayvan} caught a pigeon in the city park; the warden wants the bird removed.",
    secenekler: [
      {
        metin: "Pay the fine, apologize.",
        basariliSonuc: {
          mesaj: "You paid the fine; the warden left the bird alone.",
          detay: "Order has a price.",
        },
        basarisizSonuc: {
          mesaj: "The warden wrote fine upon fine.",
          detay: "Bureaucracy never ends.",
        },
      },
      {
        metin: "Defend it before the crowd.",
        basariliSonuc: {
          mesaj: "The crowd cheered you; the warden backed off.",
          detay: "A crowd is sometimes the best judge.",
        },
        basarisizSonuc: {
          mesaj: "The crowd laughed; the warden levied a heavy fine.",
          detay: "Not everyone suits the stage.",
        },
      },
      {
        metin: "Take the bird out of the city.",
        basariliSonuc: {
          mesaj: "You wandered the countryside with it for weeks.",
          detay: "You moved away for your friend.",
        },
        basarisizSonuc: {
          mesaj: "The road was long and the cost high.",
          detay: "Running away has its price too.",
        },
      },
    ],
  },
  evcil_hayvan_sahin_gece_konugu: {
    baslik: "Night Visitor",
    metin: "There's rustling in the house at night; {hayvan} flaps uneasily. Someone has broken in.",
    secenekler: [
      {
        metin: "Loose {hayvan} on the thief.",
        basariliSonuc: {
          mesaj: "{hayvan} pinned the thief; he dropped his bag and fled.",
          detay: "A watchful bird beats any lock.",
        },
        basarisizSonuc: {
          mesaj: "The thief escaped in the dark, along with your things.",
          detay: "Darkness is the bird's enemy too.",
        },
      },
      {
        metin: "Lock the door, wait for morning.",
        basariliSonuc: {
          mesaj: "Nothing was missing by morning; you went sleepless.",
          detay: "Patience buys safety.",
        },
        basarisizSonuc: {
          mesaj: "Toward dawn the thief broke the lock and left.",
          detay: "Waiting isn't always protection.",
        },
      },
    ],
  },
  evcil_hayvan_sahin_egitim_yontemi: {
    baslik: "Training Method",
    metin: "How will you continue {hayvan}'s training? With patience or discipline?",
    secenekler: [
      {
        metin: "Reward patiently for months.",
        basariliSonuc: {
          mesaj: "{hayvan} answers commands with finesse.",
          detay: "Patience breeds loyalty.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} dawdled; there was no progress.",
          detay: "Not every bird learns at the same pace.",
        },
      },
      {
        metin: "Apply strict discipline.",
        basariliSonuc: {
          mesaj: "{hayvan} obeys flawlessly; everyone looks on with respect.",
          detay: "Obedience is not the same as love.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} lashed out in fear and wounded your hand.",
          detay: "Bullying eats away trust.",
        },
      },
    ],
  },
  evcil_hayvan_sahin_dogan_cirak: {
    baslik: "The Falconer's Apprentice",
    metin: "A young apprentice seeks you out to learn {hayvan}'s craft.",
    secenekler: [
      {
        metin: "Take the apprentice in.",
        basariliSonuc: {
          mesaj: "The apprentice learned fast; your name passed from mouth to mouth.",
          detay: "Teaching spreads your name.",
        },
        basarisizSonuc: {
          mesaj: "The apprentice spooked the bird; things got tangled.",
          detay: "Not every student is diligent.",
        },
      },
      {
        metin: "Take no one, work alone.",
        basariliSonuc: {
          mesaj: "You kept your secrets to yourself.",
          detay: "Unshared knowledge stays lonely.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  evcil_hayvan_sahin_omuz_gozdagi: {
    baslik: "Menace on the Shoulder",
    metin: "{rakip} cornered you in a crowd; {hayvan} hisses on your shoulder, wings spread.",
    secenekler: [
      {
        metin: "Intimidate with {hayvan}'s presence.",
        basariliSonuc: {
          mesaj: "{rakip} stepped back; the crowd watched you.",
          detay: "Presence silences a crowd.",
        },
        basarisizSonuc: {
          mesaj: "{rakip} didn't flinch; he shouldered past you.",
          detay: "Menace without courage is empty.",
        },
      },
      {
        metin: "Calmly walk away.",
        basariliSonuc: {
          mesaj: "You swallowed your pride and walked on; {hayvan} stayed quiet.",
          detay: "Not every challenge needs an answer.",
        },
        basarisizSonuc: {
          mesaj: "{rakip} mocked you behind your back.",
          detay: "Silence can read as weakness.",
        },
      },
    ],
  },
  evcil_hayvan_sahin_av_agi: {
    baslik: "The Trapper's Net",
    metin: "{hayvan} was caught in a trapper's net; the man claims the bird as his own.",
    secenekler: [
      {
        metin: "Defend your right fiercely.",
        basariliSonuc: {
          mesaj: "The trapper backed down; {hayvan} returned to you.",
          detay: "Rights are defended loudly.",
        },
        basarisizSonuc: {
          mesaj: "The trapper took the bird and left; no one listened to you.",
          detay: "Right sometimes yields to might.",
        },
      },
      {
        metin: "Pay the trapper, take the bird back.",
        basariliSonuc: {
          mesaj: "You counted out the coins; {hayvan} is on your shoulder again.",
          detay: "Some friendships are expensive.",
        },
        basarisizSonuc: {
          mesaj: "The trapper took the money and freed the bird two days later.",
          detay: "The worn bird wore you out too.",
        },
      },
    ],
  },
};
