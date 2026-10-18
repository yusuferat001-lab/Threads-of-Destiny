import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/evcilHayvanAt.ts — İngilizce çevirileri. */
export const OLAYLAR_EVCIL_HAYVAN_AT_EN: Record<string, OlayCeviri> = {
  // ── Encounters: Middle Ages ──
  hayvan_karsilasma_at_oc_1: {
    baslik: "The Horse on the Battlefield",
    metin: "On an old battlefield, a noble warhorse with shattered armor wanders, its master lost.",
    secenekler: [
      {
        metin: "Approach and tame it.",
        basariliSonuc: {
          mesaj: "The horse calmed; it shed its armor and followed you.",
          detay: "The war's orphan is yours now.",
        },
        basarisizSonuc: {
          mesaj: "The horse kicked; you fell and it fled.",
          detay: "Wounded nobility won't be approached.",
        },
      },
      {
        metin: "Carry on your way.",
        basariliSonuc: {
          mesaj: "You left the horse and walked on.",
          detay: "Your conscience ached for a while.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  hayvan_karsilasma_at_oc_2: {
    baslik: "The Cart Stuck in Mud",
    metin: "A cart's owner angrily whips his old but still strong workhorse, stuck in the mud.",
    secenekler: [
      {
        metin: "Stop him and buy the horse.",
        basariliSonuc: {
          mesaj: "The man grabbed the coins; the horse is yours.",
          detay: "Weary shoulders can rest now.",
        },
        basarisizSonuc: {
          mesaj: "He inflated the price; you gave up and paid a fee.",
          detay: "Desperation is costly.",
        },
      },
      {
        metin: "Ignore it.",
        basariliSonuc: {
          mesaj: "You walked past without looking; the whip's crack followed.",
          detay: "Some sounds never leave the ear.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  hayvan_karsilasma_at_oc_3: {
    baslik: "The Wild Follower",
    metin: "A jet-black wild horse, split from its herd, has trailed you for days on a lonely road; now it closes in.",
    secenekler: [
      {
        metin: "Offer it food.",
        basariliSonuc: {
          mesaj: "The horse took the food and stayed by your side.",
          detay: "Trust is earned slowly.",
        },
        basarisizSonuc: {
          mesaj: "The horse snatched the food, bit your hand and fled.",
          detay: "The wild stays wild.",
        },
      },
      {
        metin: "Throw stones to drive it off.",
        basariliSonuc: {
          mesaj: "The horse melted into the dark with reproach in its eyes.",
          detay: "Safety is sometimes a cold choice.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  // ── Encounters: Industrial Revolution ──
  hayvan_karsilasma_at_sd_1: {
    baslik: "The Mine's Blind Pony",
    metin: "At the colliery exit, a pony blinded by years in the dark is headed for the scrapyard.",
    secenekler: [
      {
        metin: "Buy the pony.",
        basariliSonuc: {
          mesaj: "You brought the pony into the sun; it walked slowly.",
          detay: "The first daylight of its life.",
        },
        basarisizSonuc: {
          mesaj: "The manager raised the price at the last moment; you backed out.",
          detay: "Haggling is a cold business.",
        },
      },
      {
        metin: "Don't look, move on.",
        basariliSonuc: {
          mesaj: "At the shift whistle you went on your way.",
          detay: "In the machine age, all are expendable.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  hayvan_karsilasma_at_sd_2: {
    baslik: "The Fallen Tram Horse",
    metin: "In the rain, the tired horse of a horse-drawn tram collapsed; the conductor whips it to rise.",
    secenekler: [
      {
        metin: "Unhitch it and take it.",
        basariliSonuc: {
          mesaj: "You slipped the conductor something; the horse stood up.",
          detay: "A life saved from the rails.",
        },
        basarisizSonuc: {
          mesaj: "You scuffled with the conductor; the crowd blamed you.",
          detay: "Kindness doesn't please everyone.",
        },
      },
      {
        metin: "Stay out of it.",
        basariliSonuc: {
          mesaj: "You opened your umbrella and walked on with the crowd.",
          detay: "The rain drowned out the whip.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  hayvan_karsilasma_at_sd_3: {
    baslik: "The Racer Behind the Track",
    metin: "Behind the racetrack, an injured racehorse has been abandoned by its owner to be put down.",
    secenekler: [
      {
        metin: "Buy the horse cheaply.",
        basariliSonuc: {
          mesaj: "Its leg was bandaged; days later the horse ran again.",
          detay: "Champions heal too.",
        },
        basarisizSonuc: {
          mesaj: "The leg never healed; the horse was shot next day.",
          detay: "Not every hope can be saved.",
        },
      },
      {
        metin: "Watch from the side.",
        basariliSonuc: {
          mesaj: "A gunshot rang out; you turned your head.",
          detay: "In an age of speed, the slow are discarded.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  // ── Follow-ups: Middle Ages ──
  evcil_hayvan_at_uzak_pazar: {
    baslik: "Far Market Journey",
    metin: "Hauling goods to a distant market with {hayvan} pays well; the road is long and risky.",
    secenekler: [
      {
        metin: "Set out for the far market.",
        basariliSonuc: {
          mesaj: "{hayvan} flew down the road; goods sold with no rivals.",
          detay: "Speed is a merchant's capital.",
        },
        basarisizSonuc: {
          mesaj: "Rain turned the roads to mud; the goods spoiled.",
          detay: "A far road is a far loss.",
        },
      },
      {
        metin: "Settle for the nearby market.",
        basariliSonuc: {
          mesaj: "You earned a small but steady profit.",
          detay: "The road home is always safe.",
        },
        basarisizSonuc: {
          mesaj: "The market was slow today; you came back empty-handed.",
          detay: "Not every day is a market day.",
        },
      },
    ],
  },
  evcil_hayvan_at_kervan_eslik: {
    baslik: "Caravan Guide",
    metin: "A caravan wants you to scout ahead, using {hayvan}'s speed.",
    secenekler: [
      {
        metin: "Escort the caravan.",
        basariliSonuc: {
          mesaj: "You cleared the way ahead; the caravan arrived safely.",
          detay: "The scout always walks first.",
        },
        basarisizSonuc: {
          mesaj: "Bandits blocked the road; you lost cargo and took wounds.",
          detay: "The first in line is struck first.",
        },
      },
      {
        metin: "Decline the offer.",
        basariliSonuc: {
          mesaj: "The caravan left without you.",
          detay: "A lost chance never returns.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  evcil_hayvan_at_alay: {
    baslik: "Call of the Mounted Regiment",
    metin: "The regional lord needs riders for his campaign; {hayvan} is on the list.",
    secenekler: [
      {
        metin: "Join the regiment.",
        basariliSonuc: {
          mesaj: "You returned from the campaign with spoils and fame.",
          detay: "Horse and rider are remembered together.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} went missing in the clash.",
          detay: "The front takes the nearest and dearest.",
        },
      },
      {
        metin: "Stay home.",
        basariliSonuc: {
          mesaj: "The regiment left without you; people whispered behind your back.",
          detay: "Staying behind has its price too.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  evcil_hayvan_at_nalbant: {
    baslik: "The Loose Shoe",
    metin: "{hayvan} limps; a shoe has loosened. The farrier suggests costly care.",
    secenekler: [
      {
        metin: "Have the farrier do it.",
        basariliSonuc: {
          mesaj: "The master nailed the shoe; {hayvan} trotted lively again.",
          detay: "A craft's due gets paid.",
        },
        basarisizSonuc: {
          mesaj: "The shoe sat wrong; you paid anyway.",
          detay: "Not every master is a master.",
        },
      },
      {
        metin: "Try it yourself.",
        basariliSonuc: {
          mesaj: "You nailed it yourself; {hayvan} is content.",
          detay: "You must put heart into the work.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} kicked, and the shoe came out crooked.",
          detay: "An animal knows a novice.",
        },
      },
    ],
  },
  evcil_hayvan_at_hasta: {
    baslik: "The Sick Horse",
    metin: "{hayvan} hasn't eaten for days; foam at its mouth, eyes clouded.",
    secenekler: [
      {
        metin: "Take it to the horse doctor.",
        basariliSonuc: {
          mesaj: "Herbs were boiled; {hayvan} recovered within days.",
          detay: "Treatment is costly, loss costlier.",
        },
        basarisizSonuc: {
          mesaj: "The medicine didn't work; {hayvan} is still weak.",
          detay: "Not every doctor heals.",
        },
      },
      {
        metin: "Treat it yourself at home.",
        basariliSonuc: {
          mesaj: "You sat by it all night; by morning it stood.",
          detay: "Some care only an owner can give.",
        },
        basarisizSonuc: {
          mesaj: "You labored all night; {hayvan} faded anyway.",
          detay: "Love is not always enough.",
        },
      },
    ],
  },
  evcil_hayvan_at_cocuklar: {
    baslik: "Little Riders",
    metin: "The village children crowd around {hayvan}, begging to ride, and won't let go.",
    secenekler: [
      {
        metin: "Let the children ride.",
        basariliSonuc: {
          mesaj: "The children rode laughing round and round.",
          detay: "The village will speak well of you.",
        },
        basarisizSonuc: {
          mesaj: "A child fell; you paid the family compensation.",
          detay: "Fun is sometimes expensive.",
        },
      },
      {
        metin: "Refuse.",
        basariliSonuc: {
          mesaj: "The children sulked; the village remembered you coldly.",
          detay: "Caution isn't loved.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  // ── Follow-ups: Industrial Revolution ──
  evcil_hayvan_at_yaris: {
    baslik: "Town Race",
    metin: "You can enter {hayvan} in the town's horse race; betting runs hot.",
    secenekler: [
      {
        metin: "Enter the race.",
        basariliSonuc: {
          mesaj: "{hayvan} won by a nose.",
          detay: "The crowd shouted its name.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} fell on the last turn; both of you were hurt.",
          detay: "The track forgives no one.",
        },
      },
      {
        metin: "Stay a spectator.",
        basariliSonuc: {
          mesaj: "You watched from the stands and placed no bet.",
          detay: "A safe but dull day.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  evcil_hayvan_at_posta: {
    baslik: "Urgent Mail",
    metin: "The post office wants an urgent delivery on a rainy day, using {hayvan}'s speed.",
    secenekler: [
      {
        metin: "Take the delivery.",
        basariliSonuc: {
          mesaj: "The envelope arrived on time; the office paid a bonus.",
          detay: "Speed is the currency of the age.",
        },
        basarisizSonuc: {
          mesaj: "You lost the road in the rain and got fined.",
          detay: "The devil joins a hasty job.",
        },
      },
      {
        metin: "Refuse.",
        basariliSonuc: {
          mesaj: "The office turned to another courier.",
          detay: "The chance went to the next one.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  evcil_hayvan_at_demiryolu: {
    baslik: "In the Railway's Shadow",
    metin: "The new railway is eating freight hauling; {hayvan} has less work.",
    secenekler: [
      {
        metin: "Start a local cart line.",
        basariliSonuc: {
          mesaj: "Runs from the station to the villages began; customers plenty.",
          detay: "Where rails end, roads begin.",
        },
        basarisizSonuc: {
          mesaj: "Too few passengers came; the costs were yours.",
          detay: "Steam brooks no competition.",
        },
      },
      {
        metin: "Rent the horse out.",
        basariliSonuc: {
          mesaj: "{hayvan} was hired to a cabman; the rent is steady.",
          detay: "Parting is the rent's price.",
        },
        basarisizSonuc: {
          mesaj: "The cabman mistreated the horse; the rent stopped.",
          detay: "Not every trust is cared for.",
        },
      },
      {
        metin: "Retire the horse.",
        basariliSonuc: {
          mesaj: "{hayvan} grazes in the pasture; you pay for feed.",
          detay: "Loyalty is also an expense.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  evcil_hayvan_at_hasat: {
    baslik: "Harvest Rush",
    metin: "At harvest time, a neighboring farmer asks to hitch {hayvan} to the plow.",
    secenekler: [
      {
        metin: "Lend the horse.",
        basariliSonuc: {
          mesaj: "The crop was cut in time; the farmer handed over a purse.",
          detay: "That's how neighborliness works.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} was lamed at the plow; its care fell to you.",
          detay: "What's lent may not come back whole.",
        },
      },
      {
        metin: "Refuse.",
        basariliSonuc: {
          mesaj: "The farmer scowled and stopped visiting.",
          detay: "A neighbor's goodwill counts.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  evcil_hayvan_at_yem_kitligi: {
    baslik: "Fodder Shortage",
    metin: "A bad harvest sent fodder prices soaring; feeding {hayvan} is getting hard.",
    secenekler: [
      {
        metin: "Buy the pricey fodder.",
        basariliSonuc: {
          mesaj: "{hayvan} was well fed and spent the winter hale.",
          detay: "Who feeds, tends; who tends, gains.",
        },
        basarisizSonuc: {
          mesaj: "The fodder was poor; {hayvan} thinned anyway.",
          detay: "Costly is not always good.",
        },
      },
      {
        metin: "Ration the feed, be frugal.",
        basariliSonuc: {
          mesaj: "{hayvan} grew thin but got through the winter.",
          detay: "Thrift sometimes leaves a sting.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} fell ill; treatment cost you.",
          detay: "Skimping in a famine costs dear.",
        },
      },
    ],
  },
  evcil_hayvan_at_hirsiz: {
    baslik: "The Night Stable Thief",
    metin: "Noises come from the stable at night; someone is trying to steal {hayvan}.",
    secenekler: [
      {
        metin: "Burst in and catch the thief.",
        basariliSonuc: {
          mesaj: "You caught the thief and handed him to the constables.",
          detay: "The neighborhood will talk of you.",
        },
        basarisizSonuc: {
          mesaj: "The thief knocked you down and fled.",
          detay: "Courage in the dark is costly.",
        },
      },
      {
        metin: "Call the neighbors.",
        basariliSonuc: {
          mesaj: "Lantern light scared the thief off; the horse is safe.",
          detay: "A crowd is the best watchman.",
        },
        basarisizSonuc: {
          mesaj: "You were too late; {hayvan} was already stolen.",
          detay: "Late help means loss.",
        },
      },
    ],
  },

  // ── Follow-ups: any era ──
  evcil_hayvan_at_haydut_hendek: {
    baslik: "Escape at the Ditch",
    metin: "Bandits have blocked your road; {hayvan} could leap the ditch ahead.",
    secenekler: [
      {
        metin: "Leap the ditch.",
        basariliSonuc: {
          mesaj: "{hayvan} soared across; the bandits ate dust.",
          detay: "Escape is a single leap away.",
        },
        basarisizSonuc: {
          mesaj: "The horse slipped; you fell and the bandits took the cargo.",
          detay: "A leap can turn into a slip.",
        },
      },
      {
        metin: "Hand over the cargo, bargain.",
        basariliSonuc: {
          mesaj: "You left the cargo and saved your life.",
          detay: "Life is worth more than goods.",
        },
        basarisizSonuc: {
          mesaj: "It wasn't enough; they slapped you and let you go.",
          detay: "A bandit is never satisfied.",
        },
      },
    ],
  },
  evcil_hayvan_at_gezinti: {
    baslik: "A Ride Through the Fields",
    metin: "You could take a ride through the fields with {es} on {hayvan}'s back.",
    secenekler: [
      {
        metin: "Go riding together.",
        basariliSonuc: {
          mesaj: "You both laughed at sunset.",
          detay: "Small moments build great bonds.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} spooked; {es} fell and the outing ended flat.",
          detay: "Not every plan goes well.",
        },
      },
      {
        metin: "Keep working.",
        basariliSonuc: {
          mesaj: "{es} spent the lonely day quietly.",
          detay: "Work shouldn't come before love.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  evcil_hayvan_at_eyer: {
    baslik: "A New Saddle Trial",
    metin: "A traveling saddler offers a new kind of saddle and harness for {hayvan}.",
    secenekler: [
      {
        metin: "Try the new saddle.",
        basariliSonuc: {
          mesaj: "The saddle fit perfectly; everyone stared.",
          detay: "Novelty catches the eye.",
        },
        basarisizSonuc: {
          mesaj: "The saddle slipped sideways; you hit the ground.",
          detay: "Not every novelty pays off.",
        },
      },
      {
        metin: "Stick with the old one.",
        basariliSonuc: {
          mesaj: "The saddler shrugged and went on his way.",
          detay: "Habit is comfortable, but narrow.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  evcil_hayvan_at_agir_yuk: {
    baslik: "Heavy Haul Job",
    metin: "A heavy hauling job came up at the market; {hayvan} can do it but will strain.",
    secenekler: [
      {
        metin: "Haul the whole load in one go.",
        basariliSonuc: {
          mesaj: "{hayvan} gritted its teeth and hauled it; the pay is big.",
          detay: "Money is earned on a horse's back.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} collapsed on the road; the load spilled.",
          detay: "Overworking is not cheap.",
        },
      },
      {
        metin: "Split the load in two.",
        basariliSonuc: {
          mesaj: "You hauled it in two trips; the horse didn't tire.",
          detay: "Patience pays.",
        },
        basarisizSonuc: {
          mesaj: "The second trip ran late; the customer walked away.",
          detay: "Time is money.",
        },
      },
      {
        metin: "Turn the job down.",
        basariliSonuc: {
          mesaj: "Someone else took the job; {hayvan} rested.",
          detay: "The horse was unharmed, the purse unfilled.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
};
