import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/evcilHayvanKarga.ts — İngilizce çevirileri. */
export const OLAYLAR_EVCIL_HAYVAN_KARGA_EN: Record<string, OlayCeviri> = {
  hayvan_karsilasma_karga_oc_1: {
    baslik: "A Raven at the Window",
    metin: "A sharp-eyed raven visits your workshop window each morning, testing you with shiny trinkets.",
    secenekler: [
      {
        metin: "Leave food in return.",
        basariliSonuc: {
          mesaj: "The raven took the food and settled at your window.",
          detay: "You gained a clever friend.",
        },
        basarisizSonuc: {
          mesaj: "The raven snatched the food, pecked your hand and fled.",
          detay: "Trust isn't always repaid at once.",
        },
      },
      {
        metin: "Cover the window.",
        basariliSonuc: {
          mesaj: "The raven waited a while, then left.",
          detay: "Silence is a choice too.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  hayvan_karsilasma_karga_oc_2: {
    baslik: "The Crow in the Trap",
    metin: "In the forest you find a crow caught in a hunter's trap, worn out from flapping.",
    secenekler: [
      {
        metin: "Spring the trap and free it.",
        basariliSonuc: {
          mesaj: "The crow landed on your shoulder and wouldn't leave.",
          detay: "Mercy found its reward.",
        },
        basarisizSonuc: {
          mesaj: "The crow pecked you, and the hunter demanded compensation.",
          detay: "Kindness can cost dearly.",
        },
      },
      {
        metin: "Don't touch the hunter's property.",
        basariliSonuc: {
          mesaj: "You walked on, trying not to hear the flapping.",
          detay: "Your conscience ached for a while.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  hayvan_karsilasma_karga_oc_3: {
    baslik: "A Rival's Gift",
    metin: "A raven snatched a valuable document from a rival master's workshop and dropped it right before you.",
    secenekler: [
      {
        metin: "Take the document, welcome the bird in.",
        basariliSonuc: {
          mesaj: "The document proved useful, and the raven stayed with you.",
          detay: "This gift has a price.",
        },
        basarisizSonuc: {
          mesaj: "The rival demanded the document back; you paid damages.",
          detay: "The bird never showed up again either.",
        },
      },
      {
        metin: "Chase the bird away.",
        basariliSonuc: {
          mesaj: "You returned the document and drove the bird off.",
          detay: "Your hands stayed clean, but empty.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  hayvan_karsilasma_karga_sd_1: {
    baslik: "A Soot-Black Wing",
    metin: "At the foot of the factory chimney lies an injured crow, blackened with soot.",
    secenekler: [
      {
        metin: "Bandage its wing, take it in.",
        basariliSonuc: {
          mesaj: "The crow healed and began waiting for you after each shift.",
          detay: "A friendship smelling of soot.",
        },
        basarisizSonuc: {
          mesaj: "The crow refused the bandage and wounded your hand.",
          detay: "Not every wound accepts kindness.",
        },
      },
      {
        metin: "Ignore it.",
        basariliSonuc: {
          mesaj: "You hurried on to make your shift.",
          detay: "Haste silenced your conscience.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  hayvan_karsilasma_karga_sd_2: {
    baslik: "The Passenger at the Station",
    metin: "A crow unafraid of the locomotive whistle perches on your suitcase every morning at the station.",
    secenekler: [
      {
        metin: "Give it some bread crumbs.",
        basariliSonuc: {
          mesaj: "The crow wouldn't leave your suitcase; it followed you.",
          detay: "The train left, the friend stayed.",
        },
        basarisizSonuc: {
          mesaj: "The crow grabbed the bread, tore your bag and flew off.",
          detay: "Small damage, big lesson.",
        },
      },
      {
        metin: "Shut the suitcase, board the carriage.",
        basariliSonuc: {
          mesaj: "The crow stared after you.",
          detay: "The journey went on alone.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  hayvan_karsilasma_karga_sd_3: {
    baslik: "The Thief on the Quay",
    metin: "On the quay, a crow pecked up a merchant's dropped gold watch and laid it at your feet.",
    secenekler: [
      {
        metin: "Return the watch, feed the bird.",
        basariliSonuc: {
          mesaj: "The merchant tipped you, and the crow chose you.",
          detay: "Honesty took wing.",
        },
        basarisizSonuc: {
          mesaj: "The merchant took you for a thief; the crow vanished.",
          detay: "Your honesty needed proof.",
        },
      },
      {
        metin: "Shoo the bird, leave the watch.",
        basariliSonuc: {
          mesaj: "You left the watch on the quay.",
          detay: "You neither took nor gave.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  evcil_hayvan_karga_komplo_fisilti: {
    baslik: "Whispers Under the Window",
    metin: "{hayvan} listened to two men slandering you under the window and cawed uneasily.",
    secenekler: [
      {
        metin: "Crush the plotters early.",
        basariliSonuc: {
          mesaj: "You broke up the plot before it erupted.",
          detay: "{hayvan} was right once more.",
        },
        basarisizSonuc: {
          mesaj: "You accused the wrong man; things got worse.",
          detay: "Not every whisper is true.",
        },
      },
      {
        metin: "Just take precautions.",
        basariliSonuc: {
          mesaj: "You added a bolt to the door and a taster at the table.",
          detay: "Caution never hurts.",
        },
        basarisizSonuc: {
          mesaj: "Your precautions were wasted; you spent a sleepless night.",
          detay: "Fear tires you too.",
        },
      },
    ],
  },

  evcil_hayvan_karga_gizli_mesaj: {
    baslik: "The Scroll on Its Leg",
    metin: "{hayvan} returned with a small unsealed scroll tied to its leg. The message isn't yours.",
    secenekler: [
      {
        metin: "Read it in secret, use the information.",
        basariliSonuc: {
          mesaj: "The message revealed an opportunity; you seized it at once.",
          detay: "Information pays, conscience bills.",
        },
        basarisizSonuc: {
          mesaj: "The sender traced it back; your name was stained.",
          detay: "This game has its watchers.",
        },
      },
      {
        metin: "Throw the scroll into the fire.",
        basariliSonuc: {
          mesaj: "The paper turned to ash; you stayed out of it.",
          detay: "Curiosity can be deadly.",
        },
        basarisizSonuc: {
          mesaj: "The sender asked about the message; you had no answer.",
          detay: "Some closed doors fester.",
        },
      },
    ],
  },

  evcil_hayvan_karga_calinti_senet: {
    baslik: "A Note from the Stall",
    metin: "{hayvan} snatched a valuable promissory note from a merchant's stall and brought it to you.",
    secenekler: [
      {
        metin: "Return the note to its owner.",
        basariliSonuc: {
          mesaj: "The merchant handed you a purse with gratitude.",
          detay: "Honesty opens doors.",
        },
        basarisizSonuc: {
          mesaj: "The merchant eyed you with suspicion and sent you off.",
          detay: "Even kindness needs proof.",
        },
      },
      {
        metin: "Keep the note, press an advantage.",
        basariliSonuc: {
          mesaj: "The note gave you the upper hand in bargaining.",
          detay: "The gain is dirty, the bird a thief.",
        },
        basarisizSonuc: {
          mesaj: "The note was found; you were branded a thief.",
          detay: "The bird's crime was pinned on you.",
        },
      },
    ],
  },

  evcil_hayvan_karga_haydut_pusu: {
    baslik: "A Cry on the Road",
    metin: "On the road, {hayvan} screeched and flew toward the trees. There's an ambush.",
    secenekler: [
      {
        metin: "Change your route.",
        basariliSonuc: {
          mesaj: "You arrived safely by the roundabout road.",
          detay: "{hayvan} saved you.",
        },
        basarisizSonuc: {
          mesaj: "Someone was waiting on the other road too.",
          detay: "Not every road is safe.",
        },
      },
      {
        metin: "Turn the ambush on them.",
        basariliSonuc: {
          mesaj: "You surprised the bandits and saved your load.",
          detay: "Your courage became a legend.",
        },
        basarisizSonuc: {
          mesaj: "The bandits outnumbered you; you were plundered.",
          detay: "The bird's warning wasn't enough.",
        },
      },
      {
        metin: "Warn the caravan.",
        basariliSonuc: {
          mesaj: "The caravan halted and the ambush came to nothing.",
          detay: "Your word earned respect.",
        },
        basarisizSonuc: {
          mesaj: "No one believed a bird's word; you were mocked.",
          detay: "Some warnings go unheard.",
        },
      },
    ],
  },

  evcil_hayvan_karga_cenaze_kehanet: {
    baslik: "An Ill-Omened Cry",
    metin: "At the funeral, {hayvan}'s cawing was taken as a dark prophecy; villagers are whispering.",
    secenekler: [
      {
        metin: "Turn the superstition to your favor.",
        basariliSonuc: {
          mesaj: "Villagers took you for a mystic and brought gifts.",
          detay: "Fear brings respect.",
        },
        basarisizSonuc: {
          mesaj: "Villagers declared you cursed.",
          detay: "Superstition cuts both ways.",
        },
      },
      {
        metin: "Calm the villagers.",
        basariliSonuc: {
          mesaj: "Your calm words soothed hearts.",
          detay: "Reason beat fear.",
        },
        basarisizSonuc: {
          mesaj: "They ignored you and whispered on.",
          detay: "Words don't reach every ear.",
        },
      },
    ],
  },

  evcil_hayvan_karga_rakip_ajan: {
    baslik: "The Spy with Bait",
    metin: "{rakip}'s man is trying to lure {hayvan} to his side with treats.",
    secenekler: [
      {
        metin: "Trap the spy.",
        basariliSonuc: {
          mesaj: "The spy ran to {rakip} with false information.",
          detay: "Trick beat trick.",
        },
        basarisizSonuc: {
          mesaj: "The spy saw through it; {rakip} was furious.",
          detay: "Your foe didn't underestimate you.",
        },
      },
      {
        metin: "Bring the bird in, lock the door.",
        basariliSonuc: {
          mesaj: "The spy left empty-handed; {hayvan} is safe inside.",
          detay: "A cage is protection too.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} grew cranky from being shut in.",
          detay: "Freedom has its price.",
        },
      },
    ],
  },

  evcil_hayvan_karga_fabrika_sabotaj: {
    baslik: "A Midnight Spark",
    metin: "While watching the warehouse, {hayvan} noticed a sabotage beginning at midnight.",
    secenekler: [
      {
        metin: "Catch the saboteur.",
        basariliSonuc: {
          mesaj: "The saboteur was caught; the warehouse was saved.",
          detay: "{hayvan} was the night's lookout.",
        },
        basarisizSonuc: {
          mesaj: "He fled in the dark, and the fire hurt you.",
          detay: "Courage is sometimes called haste.",
        },
      },
      {
        metin: "Alert the night watchman.",
        basariliSonuc: {
          mesaj: "The watchman arrived in time; the damage stayed small.",
          detay: "The safe road wins quietly.",
        },
        basarisizSonuc: {
          mesaj: "The watchman was asleep; the warehouse partly burned.",
          detay: "Not every guard stays awake.",
        },
      },
    ],
  },

  evcil_hayvan_karga_borsa_haberi: {
    baslik: "News from the Telegraph Roof",
    metin: "{hayvan} cawed as if bringing you stock-market news overheard on the telegraph office roof.",
    secenekler: [
      {
        metin: "Quietly use the news.",
        basariliSonuc: {
          mesaj: "The shares moved just as you expected.",
          detay: "Inside information pays.",
        },
        basarisizSonuc: {
          mesaj: "The news was false; your capital melted away.",
          detay: "Hearsay is costly.",
        },
      },
      {
        metin: "Treat it as gossip.",
        basariliSonuc: {
          mesaj: "You didn't fall for speculation; your mind is at ease.",
          detay: "Caution pays.",
        },
        basarisizSonuc: {
          mesaj: "The news was true; the chance slipped away.",
          detay: "Not every doubt is right.",
        },
      },
    ],
  },

  evcil_hayvan_karga_kacakci_liman: {
    baslik: "A Wink from the Boat",
    metin: "At the port, {hayvan} perched on a boat hauling contraband; its owner winked at you.",
    secenekler: [
      {
        metin: "Partner with the smuggler.",
        basariliSonuc: {
          mesaj: "The first shipment went smoothly; your purse filled.",
          detay: "The money is clean, your hands aren't.",
        },
        basarisizSonuc: {
          mesaj: "Customs raided; goods and money were lost.",
          detay: "A smuggler's word is a flash fire.",
        },
      },
      {
        metin: "Report him to customs.",
        basariliSonuc: {
          mesaj: "Customs rewarded you, and you made an enemy.",
          detay: "Obeying the law can isolate you.",
        },
        basarisizSonuc: {
          mesaj: "The smugglers found the informer and beat you.",
          detay: "Informing doesn't come cheap.",
        },
      },
      {
        metin: "Pretend you saw nothing.",
        basariliSonuc: {
          mesaj: "You turned your head and walked on.",
          detay: "Silence is complicity too.",
        },
        basarisizSonuc: {
          mesaj: "The boatman threatened you; you stayed uneasy.",
          detay: "Silence has its price.",
        },
      },
    ],
  },

  evcil_hayvan_karga_matbaa_iftira: {
    baslik: "Scribbles at the Press",
    metin: "{hayvan} saw a leaflet smearing your name being typeset at {rakip}'s press.",
    secenekler: [
      {
        metin: "Raid the press, destroy the leaflet.",
        basariliSonuc: {
          mesaj: "The type was melted before the leaflet printed.",
          detay: "Your name was saved, your hands dirtied.",
        },
        basarisizSonuc: {
          mesaj: "The printer caught you; the incident hit the papers.",
          detay: "The smear came back on you.",
        },
      },
      {
        metin: "Print a counter-leaflet.",
        basariliSonuc: {
          mesaj: "Your counter-piece found an echo with the public.",
          detay: "Paper against paper.",
        },
        basarisizSonuc: {
          mesaj: "Nobody paid your counter-piece any attention.",
          detay: "The money went, no sound followed.",
        },
      },
    ],
  },

  evcil_hayvan_karga_maden_uyari: {
    baslik: "Unrest at the Pit Mouth",
    metin: "{hayvan} cawed strangely at the mine entrance and refused to land.",
    secenekler: [
      {
        metin: "Halt the shift.",
        basariliSonuc: {
          mesaj: "The gallery collapsed soon after; nobody died.",
          detay: "A bird's foresight saved lives.",
        },
        basarisizSonuc: {
          mesaj: "Nothing happened; output stopped and you were mocked.",
          detay: "A false alarm is costly.",
        },
      },
      {
        metin: "Go down and look yourself.",
        basariliSonuc: {
          mesaj: "You found the crack and prevented a collapse.",
          detay: "Your experience protected you.",
        },
        basarisizSonuc: {
          mesaj: "The cave-in burst at your back; you were badly hurt.",
          detay: "The bird's warning was serious.",
        },
      },
    ],
  },

  evcil_hayvan_karga_grev_soylentisi: {
    baslik: "A Strike Rumor",
    metin: "Notes carried by {hayvan} are spreading a strike rumor in the factory.",
    secenekler: [
      {
        metin: "Become the workers' spokesman.",
        basariliSonuc: {
          mesaj: "The workers heard you; their demands were met.",
          detay: "Your voice reached many.",
        },
        basarisizSonuc: {
          mesaj: "The boss threw you out the door.",
          detay: "Leading is risky.",
        },
      },
      {
        metin: "Sell the information to the boss.",
        basariliSonuc: {
          mesaj: "The boss paid handsomely for the tip.",
          detay: "You stepped on your comrades.",
        },
        basarisizSonuc: {
          mesaj: "The workers learned of the betrayal and attacked you.",
          detay: "Secrets don't stay with the double-dealer.",
        },
      },
    ],
  },

  evcil_hayvan_karga_ses_taklidi: {
    baslik: "Your Own Voice",
    metin: "One day {hayvan} began imitating your voice; the neighbors are astonished.",
    secenekler: [
      {
        metin: "Show off the trick in the square.",
        basariliSonuc: {
          mesaj: "The crowd laughed and tossed tips.",
          detay: "The show was a hit.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} cursed in your voice before the crowd.",
          detay: "The imitation shamed you.",
        },
      },
      {
        metin: "Try to suppress the mimicry.",
        basariliSonuc: {
          mesaj: "{hayvan} learned to keep quiet for a while.",
          detay: "Silence is hard-won.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} mimicked even more; no sleep at night.",
          detay: "It grew stronger the more you pushed.",
        },
      },
    ],
  },

  evcil_hayvan_karga_tarikat_gozlem: {
    baslik: "A Meeting in the Ruins",
    metin: "{hayvan} watched a masked cult meeting at night in a ruin and brought you word.",
    secenekler: [
      {
        metin: "Infiltrate the cult and build ties.",
        basariliSonuc: {
          mesaj: "You profited from the cult's hidden network.",
          detay: "Dark doors opened.",
        },
        basarisizSonuc: {
          mesaj: "You were noticed; {hayvan} was sacrificed in a rite.",
          detay: "This loss is unforgettable.",
        },
      },
      {
        metin: "Report it to the authorities.",
        basariliSonuc: {
          mesaj: "The cult was broken up; your name was praised.",
          detay: "You did your duty.",
        },
        basarisizSonuc: {
          mesaj: "The authorities didn't believe you; the cult marked you.",
          detay: "Should you have kept quiet?",
        },
      },
      {
        metin: "Stay away.",
        basariliSonuc: {
          mesaj: "You chose not to know and never looked that way again.",
          detay: "Curiosity lost to prudence.",
        },
        basarisizSonuc: {
          mesaj: "The cult tried to reach you; your peace was gone.",
          detay: "Some shadows give chase.",
        },
      },
    ],
  },

  evcil_hayvan_karga_hirsiz_ortak: {
    baslik: "Shiny Spoils",
    metin: "{hayvan} began carrying shiny things from the neighbors' yards and bringing them to you.",
    secenekler: [
      {
        metin: "Sell the items.",
        basariliSonuc: {
          mesaj: "The items changed hands; your purse swelled.",
          detay: "This partnership leaves a trace.",
        },
        basarisizSonuc: {
          mesaj: "The neighbors caught the bird and killed it.",
          detay: "Theft has a heavy price.",
        },
      },
      {
        metin: "Take every item back to its owner.",
        basariliSonuc: {
          mesaj: "The neighbors thanked you with shame and gratitude.",
          detay: "Staying clean is tiring.",
        },
        basarisizSonuc: {
          mesaj: "The neighbors accused you; no one believed you.",
          detay: "You were taken for an accomplice.",
        },
      },
    ],
  },

  evcil_hayvan_karga_sifreli_not: {
    baslik: "A Coded Note",
    metin: "A coded note is tied to {hayvan}'s leg. The sender is unknown.",
    secenekler: [
      {
        metin: "Crack the code, write back.",
        basariliSonuc: {
          mesaj: "The door to a secret network opened to you.",
          detay: "It pays, but leaves a trace.",
        },
        basarisizSonuc: {
          mesaj: "Your reply fell into the wrong hands.",
          detay: "Not every cipher is a friend.",
        },
      },
      {
        metin: "Show the note to an adviser.",
        basariliSonuc: {
          mesaj: "The adviser found it harmless and traced the sender.",
          detay: "Caution doesn't come cheap.",
        },
        basarisizSonuc: {
          mesaj: "The adviser read too much into it; gossip spread.",
          detay: "The secret stopped being a secret.",
        },
      },
    ],
  },
};
