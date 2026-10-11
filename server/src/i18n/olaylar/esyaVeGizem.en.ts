import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/esyaVeGizem.ts — İngilizce çevirileri. */
export const OLAYLAR_ESYA_VE_GIZEM_EN: Record<string, OlayCeviri> = {
  kg_antika_harita: {
    baslik: "The Junk Dealer's Trash",
    metin:
      "At a junk stall you found a muddy parchment with what look like map lines beneath.",
    secenekler: [
      {
        metin: "Spend nights restoring the map.",
        basariliSonuc: {
          mesaj:
            "Your eyes strained, but it's a map of a forgotten pass!",
        },
        basarisizSonuc: {
          mesaj: "The parchment tore while cleaning; you're tired and empty-handed.",
        },
      },
      {
        metin: "Skip it, sell it to a noble as an 'antique'.",
        basariliSonuc: {
          mesaj: "You sold it as an antique; pockets full, conscience not.",
        },
        basarisizSonuc: {
          mesaj: "The noble saw it was junk and had you thrown out.",
        },
      },
    ],
  },

  komik_yanlis_cenaze: {
    baslik: "The Wrong Door",
    metin:
      "Heading to a funeral, you knocked on the wrong door; you're at a stranger family's wake and all eyes turn to you.",
    secenekler: [
      {
        metin: "Confess at once and apologize.",
        basariliSonuc: {
          mesaj: "Your confession made the family laugh; you became a warm memory.",
        },
        basarisizSonuc: {
          mesaj: "No one laughed; you were thrown out as 'disrespectful'.",
        },
      },
      {
        metin: "Pretend not to notice, fake tears and slip out.",
        basariliSonuc: {
          mesaj: "You wiped fake tears and slipped away; you'll laugh at this for years.",
        },
        basarisizSonuc: {
          mesaj:
            "Leaving, you crashed into the coffin! You fled under horrified stares.",
        },
      },
      {
        metin: "In the confusion, steal a keepsake from the dead.",
        basariliSonuc: {
          mesaj: "You pocketed the gold ring off the dead. Ruthless but profitable.",
        },
        basarisizSonuc: {
          mesaj: "The widow saw you! You took a public beating amid cries of 'Thief!'",
        },
      },
    ],
  },

  komik_seyyar_satici: {
    baslik: "The Miracle Elixir",
    metin:
      "A traveling peddler shouts that the glowing purple liquid 'raises the dead and cures all ills'. No one believes him, yet it's alluring.",
    secenekler: [
      {
        metin: "Don't trust him, walk away.",
        basariliSonuc: {
          mesaj: "You stayed sensible; your money stayed in your pocket.",
        },
        basarisizSonuc: {
          mesaj: "Curious but restrained; a little regret lingers.",
        },
      },
      {
        metin: "Pour out your gold, buy a bottle.",
        basariliSonuc: {
          mesaj:
            "You bought the elixir; the bottle seems strangely warm.",
        },
        basarisizSonuc: {
          mesaj: "It was foul goat's milk! The peddler had already fled.",
        },
      },
      {
        metin: "Steal a bottle in the crowd.",
        basariliSonuc: {
          mesaj:
            "You hid the bottle in your robe; money and elixir both yours.",
        },
        basarisizSonuc: {
          mesaj:
            "Caught! To escape the guards you gave up all your money.",
        },
      },
    ],
  },

  gizem_ejderha_tilsimi: {
    baslik: "The Blind Eastern Sorcerer",
    metin:
      "A white-eyed merchant's stall holds one item: a blood-red Dragon Talisman. 'Only those whose fate is written in blood can bear it.'",
    secenekler: [
      {
        metin: "Pay the outrageous price, take the talisman.",
        basariliSonuc: {
          mesaj:
            "You wore the talisman; a warm power fills your chest.",
        },
        basarisizSonuc: {
          mesaj: "Nightmares woke you; your body rejects this energy.",
        },
      },
      {
        metin: "Use his blindness, steal the talisman.",
        basariliSonuc: {
          mesaj:
            "You fled with it; he shouted, 'You'll pay with your soul!'",
        },
        basarisizSonuc: {
          mesaj:
            "The blind man seized your wrist, burning you. You fled screaming.",
        },
      },
      {
        metin: "This magic isn't for me, walk away.",
        basariliSonuc: {
          mesaj: "You told yourself mystic things end badly, and went home.",
        },
        basarisizSonuc: {
          mesaj:
            "The talisman haunted you. 'What if it was truly legendary?'",
          detay: "A missed chance bleeds inside for long.",
        },
      },
    ],
  },

  gizem_kara_kilic: {
    baslik: "The Sword in the Graveyard",
    metin:
      "Patrolling the forest at night, you found a black sword stuck in an old grave. Its hilt seems to call your hand.",
    secenekler: [
      {
        metin: "Pull the sword from the grave.",
        basariliSonuc: {
          mesaj:
            "You're unbeatable now, but the sword's whispers never cease.",
        },
        basarisizSonuc: {
          mesaj:
            "Black poison spread; you lay in a coma for days.",
        },
      },
      {
        metin: "Don't touch it, pray and leave.",
        basariliSonuc: {
          mesaj: "You bowed and walked away. Best not to meddle with the unnatural.",
        },
        basarisizSonuc: {
          mesaj: "You left it, but its dark allure haunted your dreams for days.",
        },
      },
    ],
  },

  gizem_melek_tuyu: {
    baslik: "A Dying Pilgrim",
    metin:
      "A bleeding pilgrim collapsed at the church/mosque door, pressed a white feather in your palm, whispered 'An angel gave it, it wards off evil,' and died.",
    secenekler: [
      {
        metin: "Keep the feather as a holy relic.",
        basariliSonuc: {
          mesaj:
            "The feather's warmth brings you peace. A true grace.",
        },
        basarisizSonuc: {
          mesaj: "The congregation thought you superstitious and scolded you.",
        },
      },
      {
        metin: "Sell it to a noble as 'angel feather'.",
        basariliSonuc: {
          mesaj:
            "The noble loved the tale and paid a fortune; you feel soulless.",
        },
        basarisizSonuc: {
          mesaj: "The noble accused you of fraud and had you beaten; the feather blew off.",
        },
      },
      {
        metin: "Heresy! Burn the feather, bury the man.",
        basariliSonuc: {
          mesaj:
            "You burned the feather; you thought you heard a scream.",
        },
        basarisizSonuc: {
          mesaj: "You burned it, but 'did I err?' gnaws at you.",
        },
      },
    ],
  },

  gizem_melek_tuyu_mucize: {
    baslik: "An Unexpected Healing",
    metin:
      "An old woman collapsed gasping, lips turning blue. You felt the feather's warmth in your pocket; superstition, or a chance.",
    secenekler: [
      {
        metin: "Touch the feather to her brow, pray.",
        basariliSonuc: {
          mesaj:
            "Her breathing steadied, she opened her eyes! You're the 'miracle hand'.",
          detay: "The pilgrim's words weren't a lie.",
        },
        basarisizSonuc: {
          mesaj:
            "The feather stayed silent; she died, and the congregation blamed you.",
          detay: "Some legends stay legends.",
        },
      },
      {
        metin: "Don't meddle; death is God's will too.",
        basariliSonuc: {
          mesaj: "You held her hand and prayed; she died in peace.",
          detay: "Acceptance is a virtue too.",
        },
        basarisizSonuc: {
          mesaj:
            "She looked at you one last time. You'll wonder, 'What if it worked?'",
        },
      },
    ],
  },

  gizem_melek_tuyu_calinti: {
    baslik: "The Man After the Feather",
    metin:
      "At midnight someone slipped in, reaching for the chest hiding the feather: 'The pilgrim was my uncle, I have a claim too!'",
    secenekler: [
      {
        metin: "Shout, drive him off.",
        basariliSonuc: {
          mesaj: "Neighbors ran in, he fled. The feather is yours, your night ruined.",
        },
        basarisizSonuc: {
          mesaj: "He shoved you aside and jumped out the window, feather ungrabbed.",
          detay: "Some nights are remembered by fear.",
        },
      },
      {
        metin: "Hear him out, offer to share.",
        basariliSonuc: {
          mesaj:
            "You talked and wept till dawn; you shared the feather, both lighter.",
        },
        basarisizSonuc: {
          mesaj: "He didn't believe you, a fight broke out; you paid him off.",
        },
      },
      {
        metin: "Grip the feather, say never.",
        basariliSonuc: {
          mesaj: "He backed off. The feather is yours, but that look lingers.",
        },
        basarisizSonuc: {
          mesaj: "You scuffled, both wounded; the feather fell to the floor.",
        },
      },
    ],
  },

  ruh_karanlik_fisiltilar: {
    baslik: "Whispers of the Dark",
    metin:
      "The darkness in you grows. At night you hear voices, see shadows. It feels like something is trying to take you over.",
    secenekler: [
      {
        metin: "Heed the sword's whispers.",
        basariliSonuc: {
          mesaj:
            "The voices were the sword's! You merged with its darkness, fearless now.",
        },
        basarisizSonuc: {
          mesaj: "The sword nearly drove you mad; you flung it away just in time.",
        },
      },
      {
        metin: "Pull yourself together, seek a physician.",
        basariliSonuc: {
          mesaj: "The physician's opium syrups eased you; the shadows thinned.",
        },
        basarisizSonuc: {
          mesaj: "The physician thought you mad; the medicine just sickened you.",
        },
      },
      {
        metin: "Shut yourself in, resist alone.",
        basariliSonuc: {
          mesaj: "You locked the door and waited for days; right for a while.",
        },
        basarisizSonuc: {
          mesaj: "You shouted in the street half-naked; your reputation is ruined.",
        },
      },
    ],
  },

  cocuk_hastalik_baslangic: {
    baslik: "A Burning Fever",
    metin:
      "Your child writhes in fever, barely breathing. The town's only skilled physician wants far too much gold.",
    secenekler: [
      {
        metin: "Use the Mysterious Elixir!",
        basariliSonuc: {
          mesaj:
            "The elixir broke the fever, your child smiled! The peddler was right.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Send for the physician, give your savings.",
        basariliSonuc: {
          mesaj: "The physician began treatment; a few days will tell.",
        },
        basarisizSonuc: {
          mesaj: "The physician shook his head: 'Critical, just pray.'",
        },
      },
      {
        metin: "No money, I'll nurse them myself.",
        basariliSonuc: {
          mesaj: "You kept vigil day and night and brought the fever down.",
        },
        basarisizSonuc: {
          mesaj: "The fever held; the child began to convulse.",
        },
      },
    ],
  },

  dunya_savas_ilani: {
    baslik: "War Bells",
    metin:
      "The year is {yil}. A great war broke out between {bolge} and {komsu}! Border villages burn; every household sends an armed man.",
    secenekler: [
      {
        metin: "Take the Black Sword to the very front!",
        basariliSonuc: {
          mesaj:
            "The enemy fled, you're called a war god; the whispers persist.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Volunteer, fight for the homeland.",
        basariliSonuc: {
          mesaj:
            "Months in the trenches; you returned alive with medal and spoils.",
        },
        basarisizSonuc: {
          mesaj:
            "A shell landed beside you; your old strength won't return.",
        },
      },
      {
        metin: "Get a false exemption, flee the war.",
        basariliSonuc: {
          mesaj:
            "You bribed your way home; your reputation is ruined.",
        },
        basarisizSonuc: {
          mesaj:
            "The bribe came out! Sent to the front line, honor and money lost.",
        },
      },
    ],
  },

  dunya_savas_ilani_asker: {
    baslik: "Mobilization",
    metin:
      "The year is {yil}. A great war broke out between {bolge} and {komsu}! You're enlisted; your unit is called to the front. The question is your role.",
    secenekler: [
      {
        metin: "Take the Black Sword to the very front!",
        basariliSonuc: {
          mesaj:
            "The enemy fled, you're called a war god; the whispers persist.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Join the frontline assault unit.",
        basariliSonuc: {
          mesaj:
            "Months in the trenches; you returned alive with medal and spoils.",
        },
        basarisizSonuc: {
          mesaj:
            "A shell landed beside you; your old strength won't return.",
        },
      },
      {
        metin: "Take a rear logistics post.",
        basariliSonuc: {
          mesaj:
            "You kept supplies and munitions flowing; the army would starve without you.",
          detay: "Heroism isn't always at the front.",
        },
        basarisizSonuc: {
          mesaj: "An enemy raid reached the supply line; you survived wounded.",
          detay: "The rear isn't danger-free either.",
        },
      },
    ],
  },

  dunya_salgin_baslar: {
    baslik: "The Black Death at the Door",
    metin:
      "An invisible killer entered the city on the last ship. People die vomiting blood in the streets. The gates are about to close.",
    secenekler: [
      {
        metin: "Drink the Mysterious Elixir with your family!",
        basariliSonuc: {
          mesaj:
            "You drank it; as all fell, not even a fly touched you!",
          detay: "You became the miracle itself.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Drop everything, flee to the countryside with family.",
        basariliSonuc: {
          mesaj:
            "You fled to the forest before the gates closed; wretched but alive.",
          detay: "By your return, your business will be someone else's.",
        },
        basarisizSonuc: {
          mesaj:
            "The caravan infected you; you lie burning with fever in the forest.",
        },
      },
      {
        metin: "Stay, run a medicine and food black market.",
        basariliSonuc: {
          mesaj:
            "You sold medicine and water for gold; fortune built on death.",
        },
        basarisizSonuc: {
          mesaj:
            "A customer's vomit hit your face; gold couldn't save you.",
        },
      },
    ],
  },

  dunya_salgin_ortasinda: {
    baslik: "The Heart of the Plague",
    metin:
      "Corpse carts roam the streets. The neighborhood prepares to burn the house next door, where a child lies dying.",
    secenekler: [
      {
        metin: "Let the Monastery Cat loose in the house.",
        basariliSonuc: {
          mesaj:
            "The cat kept sick rats away. Your family's guardian!",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Defy the crowd, save the child!",
        basariliSonuc: {
          mesaj:
            "You carried the child out of the flames; the city calls you a prophet.",
          detay: "The life you saved is grateful for good.",
        },
        basarisizSonuc: {
          mesaj: "You got the child out, but the plague passed to you.",
        },
      },
      {
        metin: "Nail the doors, board the windows.",
        basariliSonuc: {
          mesaj: "You stopped your ears till the screams ceased; you survived.",
          detay: "You'll never forget that night.",
        },
        basarisizSonuc: {
          mesaj: "You made your home a tomb, but the plague was in the water; you burn with fever.",
        },
      },
    ],
  },

  ekonomi_kriz_donemi_v2: {
    baslik: "In the Grip of the Crisis",
    metin:
      "The economy collapsed; money is worth dirt. {es} and your children are hungry. You need money for the shop, bread for the family.",
    secenekler: [
      {
        metin: "Buy food on the black market with my last money.",
        kilitAciklamasi: "You must have children.",
        basariliSonuc: {
          mesaj:
            "You closed the shop, but your children ate their fill.",
        },
        basarisizSonuc: {
          mesaj: "The marketeer sold rotten goods; the business sank, the children fell ill.",
        },
      },
      {
        metin: "Save the business, let the family endure.",
        basariliSonuc: {
          mesaj:
            "You built an empire from the crisis; your children's look will not fade.",
        },
        basarisizSonuc: {
          mesaj: "The crisis swallowed you: shop sunk, family broken by hunger.",
        },
      },
      {
        metin: "Pawn the Dead Man's Ring to a moneylender.",
        basariliSonuc: {
          mesaj:
            "The moneylender eyed the ring and wrote no debt; family and business saved!",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  gizem_golge_pazari: {
    baslik: "The Street That Doesn't Exist",
    metin:
      "In a foggy, unmapped street, souls and secrets are sold. A masked merchant offers a black coin: 'The price is your memories.'",
    secenekler: [
      {
        metin: "Give happy memories, take the coin.",
        basariliSonuc: {
          mesaj:
            "Your memories vanished; in hand, an ice-cold Shadow Coin.",
        },
        basarisizSonuc: {
          mesaj:
            "He took the memories, the coin dissolved, the street vanished.",
          detay: "Some markets exist only to take.",
        },
      },
      {
        metin: "My soul's not for sale! Run.",
        basariliSonuc: {
          mesaj: "You ran; only a stone wall remained. Your soul is safe.",
        },
        basarisizSonuc: {
          mesaj:
            "Arms clawed from the fog; that masked face will haunt you.",
        },
      },
    ],
  },

  gizem_fisildayan_tas: {
    baslik: "A Flat, Gray Stone",
    metin:
      "An old woman by the road sells one item: a palm-sized gray stone. 'Cheap, but you must know how to listen. It listens to you.'",
    secenekler: [
      {
        metin: "Buy the stone for a few coppers.",
        basariliSonuc: {
          mesaj:
            "The stone fits your palm; you heard a faint hum in your pocket.",
          detay: "Maybe imagination, maybe not.",
        },
        basarisizSonuc: {
          mesaj: "It was an ordinary pebble; she took the money and vanished.",
        },
      },
      {
        metin: "Seize the moment, steal the stone.",
        basariliSonuc: {
          mesaj:
            "You snatched it and ran; she shouted, 'It will find you!'",
          detay: "Already a faint hum in your hand.",
        },
        basarisizSonuc: {
          mesaj:
            "She seized your wrist like iron and shamed you in the square.",
        },
      },
      {
        metin: "Call it nonsense, walk on.",
        basariliSonuc: {
          mesaj: "You shrugged and walked on; behind you, the woman giggled.",
        },
        basarisizSonuc: {
          mesaj:
            "Her words kept turning in your head; some nights you wonder about the stone.",
          detay: "Unanswered curiosity grows.",
        },
      },
    ],
  },

  gizem_fisildayan_tas_uyari: {
    baslik: "The Stone Spoke",
    metin:
      "At midnight the stone in your pocket warmed and a thin voice whispered: 'Tomorrow... someone you trust... beware.' Your heart pounds.",
    secenekler: [
      {
        metin: "Take the warning seriously, be cautious.",
        basariliSonuc: {
          mesaj:
            "You stayed alert; you caught a friend's bad news in time.",
          detay: "The stone was right, or your instinct.",
        },
        basarisizSonuc: {
          mesaj: "You jumped at shadows, but nothing happened.",
        },
      },
      {
        metin: "It was a dream, ignore it.",
        basariliSonuc: {
          mesaj: "You shrugged it off; maybe it was only a dream.",
        },
        basarisizSonuc: {
          mesaj: "You ignored it; someone you trusted spread humiliating gossip.",
        },
      },
    ],
  },

  gizem_fisildayan_tas_istek: {
    baslik: "The Stone's Demand",
    metin:
      "This time the stone spoke plainly: 'Give me the name of someone you love. In return, luck for years.' Its voice is almost human.",
    secenekler: [
      {
        metin: "Invent a stranger's name.",
        basariliSonuc: {
          mesaj:
            "The stone said 'Accepted'; the days passed with strange luck.",
          detay: "Or it was all coincidence.",
        },
        basarisizSonuc: {
          mesaj: "'You lied!' it hissed; even carrying it makes you shudder.",
        },
      },
      {
        metin: "Give no name, throw it in a well.",
        basariliSonuc: {
          mesaj:
            "A hurt hum rose from the well, then silence.",
          detay: "Some secrets deserve burial.",
        },
        basarisizSonuc: {
          mesaj: "You threw it, but the well's last whisper knew your name.",
        },
      },
      {
        metin: "Whisper a loved one's name.",
        basariliSonuc: {
          mesaj:
            "The stone turned to dust, your affairs opened; you shudder at that person.",
          detay: "You can never tell where the luck came from.",
        },
        basarisizSonuc: {
          mesaj:
            "The stone crumbled, no door opened; the named person fell ill.",
          detay: "The whisper always takes; this time it gave nothing.",
        },
      },
    ],
  },

  gizem_eski_ayna: {
    baslik: "The Goods of the Abandoned Mansion",
    metin:
      "An abandoned mansion's goods are auctioned. In a silver-plated mirror, the reflected room looks slightly different from where you stand.",
    secenekler: [
      {
        metin: "Buy the mirror.",
        basariliSonuc: {
          mesaj:
            "You hung it; the reflection lagged a beat, then caught up.",
          detay: "Maybe just tiredness.",
        },
        basarisizSonuc: {
          mesaj: "An auction trick made you overpay.",
        },
      },
      {
        metin: "Quietly take the mirror in the crowd.",
        basariliSonuc: {
          mesaj:
            "You wrapped it and left; your hands went cold for no reason.",
        },
        basarisizSonuc: {
          mesaj: "Caught red-handed; you paid a fine and became 'thief'.",
        },
      },
      {
        metin: "Strange, leave it.",
        basariliSonuc: {
          mesaj: "You looked once more and turned; the reflection turned too.",
        },
        basarisizSonuc: {
          mesaj:
            "You couldn't forget the lag; some nights you still see that room.",
          detay: "Ignored things follow you.",
        },
      },
    ],
  },

  gizem_eski_ayna_yansima: {
    baslik: "The Wrong Reflection",
    metin:
      "Rising for water at night, you stopped at the mirror. Your reflection lagged, looking at you with a different expression. Then it normalized.",
    secenekler: [
      {
        metin: "Approach, examine carefully.",
        basariliSonuc: {
          mesaj:
            "Your reflection smiled before you did; you see differently now.",
          detay: "Some experiences change you unexplained.",
        },
        basarisizSonuc: {
          mesaj:
            "A hand reached from the glass! You leapt back screaming.",
        },
      },
      {
        metin: "Cover the mirror with a cloth.",
        basariliSonuc: {
          mesaj: "You covered it and slept; morning seemed normal.",
        },
        basarisizSonuc: {
          mesaj: "You covered it, but swore you heard tapping under the cloth.",
        },
      },
    ],
  },

  gizem_eski_ayna_kehanet: {
    baslik: "The Warning in the Mirror",
    metin:
      "In the mirror you didn't see yourself: a familiar street, a cart toppling onto you, then black. Your skin still crawls.",
    secenekler: [
      {
        metin: "Avoid that street for a few days.",
        basariliSonuc: {
          mesaj:
            "A cart really toppled there. The mirror doesn't lie.",
          detay: "Looking at it, you feel grateful and uneasy.",
        },
        basarisizSonuc: {
          mesaj: "Nothing happened; you felt a bit foolish.",
        },
      },
      {
        metin: "Never mind, live as usual.",
        basariliSonuc: {
          mesaj: "You forgot the image; the days passed ordinarily.",
        },
        basarisizSonuc: {
          mesaj: "A cart toppled on that very street! You were badly hurt.",
        },
      },
    ],
  },

  rusvet_memur: {
    baslik: "The Seal and the Purse",
    metin:
      "The vital permit has sat on the desk for weeks. The fat official smirks: 'A purse of gold fills the gaps.'",
    secenekler: [
      {
        metin: "Give the Cursed Ring as a bribe.",
        basariliSonuc: {
          mesaj:
            "He stamped the seal for the ring; three days later he threw himself in the river.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Give what he wants, feed the system.",
        basariliSonuc: {
          mesaj: "He took the gold and finished at once. You're part of the rot.",
        },
        basarisizSonuc: {
          mesaj: "An inspector walked in! Fined for bribery, permit cancelled.",
        },
      },
      {
        metin: "I don't bribe! Report him upward.",
        basariliSonuc: {
          mesaj: "You got him fired! Business settled, tradesmen cheered you.",
        },
        basarisizSonuc: {
          mesaj: "The official's uncle took the report! No business for months.",
        },
      },
    ],
  },

  zincir_tuccar_teslimat: {
    baslik: "The End of the Contract",
    metin:
      "The years-long supply deal reached its final delivery. Your partner summoned you to settle accounts.",
    secenekler: [
      {
        metin: "Set the Shadow Coin down, seize your partner.",
        basariliSonuc: {
          mesaj:
            "His eyes went blank; he signed over the company rights.",
          detay: "A fortune won; he went mad, you are uneasy.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Oversee the final delivery yourself.",
        basariliSonuc: {
          mesaj: "The deal closed; years of effort repaid.",
          detay: "You're now a well-known city merchant.",
        },
        basarisizSonuc: {
          mesaj: "A dispute over the final delivery; the deal closed at a loss.",
          detay: "No reward came, but you gained experience.",
        },
      },
      {
        metin: "Send your deputy.",
        basariliSonuc: {
          mesaj: "Your deputy handled it well; the deal closed smoothly.",
          detay: "Not there, yet it went well. Trust is enough.",
        },
        basarisizSonuc: {
          mesaj: "Your deputy erred in the accounts; the profit was small.",
          detay: "Maybe you'd have caught it there.",
        },
      },
    ],
  },

  zincir_din_yolda_sinav: {
    baslik: "A Trial on the Road",
    metin:
      "On the way to your post you met hungry, penniless refugees. Your meager provisions will feed them or you.",
    secenekler: [
      {
        metin: "Give the Mysterious Map, show the way.",
        basariliSonuc: {
          mesaj:
            "The map led them to a provision store; they kissed your hands.",
          detay: "A map saved a family. Your conscience is light.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Share most of your provisions.",
        basariliSonuc: {
          mesaj: "You shared; with the rest you carried on, strained.",
          detay: "You went hungry, but their gratitude stays.",
        },
        basarisizSonuc: {
          mesaj: "It wasn't enough; you finished the road hungry and weak.",
          detay: "Kindness wore you out, but no regrets.",
        },
      },
      {
        metin: "Keep your provisions, go on.",
        basariliSonuc: {
          mesaj: "You kept them and reached your post healthy.",
          detay: "You recall those faces and console yourself.",
        },
        basarisizSonuc: {
          mesaj: "The road wore you down anyway; your conscience is uneasy.",
          detay: "You struggled, and the choice stayed with you.",
        },
      },
    ],
  },

  yerlesim_dag_ayi_karsilasmasi: {
    baslik: "The Master of the Mountain",
    metin:
      "Heading home up the mountain, you met a huge, hungry bear on the narrow path. Neither of you moves.",
    secenekler: [
      {
        metin: "Draw the Black Sword, advance!",
        basariliSonuc: {
          mesaj:
            "The bear shrank from the darkness; one blow felled it.",
          detay: "They call you 'Bear-Slayer'; the sword still trembles.",
        },
        basarisizSonuc: {
          mesaj:
            "The bear struck before the blade was ready; shoulder and jaw torn.",
          detay: "Even legendary steel has a speed limit.",
        },
      },
      {
        metin: "Back away slowly, make no noise.",
        basariliSonuc: {
          mesaj: "The bear returned to the forest; you got home holding your breath.",
          detay: "The mountain's first rule is patience.",
        },
        basarisizSonuc: {
          mesaj: "The startled bear charged; you barely dove behind a rock.",
          detay: "The claw marks on your back healed slowly.",
        },
      },
      {
        metin: "Wave your stick and shout.",
        basariliSonuc: {
          mesaj: "The startled bear fled; you couldn't stop telling the tale.",
          detay: "For a while the villagers called you 'brave'.",
        },
        basarisizSonuc: {
          mesaj: "The bear attacked; you reached the village with deep wounds.",
          detay: "Each time you enter the forest, you remember.",
        },
      },
    ],
  },

  derinlik_manastir_kedisi: {
    baslik: "The Monastery's Black Cat",
    metin:
      "An old black cat roams the monastery storehouse. Some monks call it ill-omened, others bless its ratting.",
    secenekler: [
      {
        metin: "Keep the cat in the storehouse.",
        basariliSonuc: {
          mesaj: "You kept it; as rats dwindled, the storehouse stayed clean.",
          detay: "The humblest creature can be a silent shield.",
        },
        basarisizSonuc: {
          mesaj: "Some monks objected, but the cat stayed.",
          detay: "A fine balance between tradition and practicality.",
        },
      },
      {
        metin: "Drive the cat out as bad luck.",
        basariliSonuc: {
          mesaj: "The cat was driven out; some monks relaxed.",
          detay: "Superstition outranks practicality.",
        },
        basarisizSonuc: {
          mesaj: "With the cat gone, the rats multiplied fast.",
          detay: "Some choices cost you months later.",
        },
      },
    ],
  },

  derinlik_hazine_haritasi: {
    baslik: "An Old Map",
    metin:
      "At a junk shop you found an old map with burnt edges, coded marks, and a sketch of an unknown place.",
    secenekler: [
      {
        metin: "Buy the map.",
        basariliSonuc: {
          mesaj: "You bought it; maybe paper, maybe a treasure's key.",
          detay: "A small price for a curious mind.",
        },
        basarisizSonuc: {
          mesaj: "You bought it, but the dealer overcharged you.",
          detay: "Not every haggle pays.",
        },
      },
      {
        metin: "Not interested, just paper.",
        basariliSonuc: {
          mesaj: "You ignored the map and walked on.",
          detay: "Was the missed chance worth it? Who knows.",
        },
        basarisizSonuc: {
          mesaj: "Walking on, you thought of the map again.",
          detay: "Curiosity sometimes won't let go.",
        },
      },
    ],
  },

  derinlik_hazine_kazisi: {
    baslik: "The Place the Map Points To",
    metin:
      "Studying the map, you found the marked place: an abandoned cave entrance. Worth digging?",
    secenekler: [
      {
        metin: "Dig, take the risk.",
        basariliSonuc: {
          mesaj: "Deep in the cave you really found a treasure chest!",
          detay: "Childish curiosity can be a life's gain.",
        },
        basarisizSonuc: {
          mesaj: "The cave collapsed, no treasure; you barely got out.",
          detay: "The map was just an old scrap.",
        },
      },
      {
        metin: "Avoid risk, sell the map.",
        basariliSonuc: {
          mesaj: "You sold it to a collector; small but sure profit.",
          detay: "Handing off curiosity is sometimes smartest.",
        },
        basarisizSonuc: {
          mesaj: "You sold the map cheaper than expected.",
          detay: "Not every haggle ends as hoped.",
        },
      },
    ],
  },

  derinlik_kutsal_kalinti: {
    baslik: "A Holy Relic",
    metin:
      "Beneath a ruined chapel you found a relic of an unknown saint. Folk say whoever touches it returns from death once.",
    secenekler: [
      {
        metin: "Carry the relic with you.",
        basariliSonuc: {
          mesaj: "You wrapped it in cloth and took it; comfort, or more.",
          detay: "Believe or not, you carry a faint weight.",
        },
        basarisizSonuc: {
          mesaj: "Carrying it unnerved you; you soon gave it to an acquaintance.",
          detay: "Some burdens aren't for everyone.",
        },
      },
      {
        metin: "Don't touch it, report to the church.",
        basariliSonuc: {
          mesaj: "You gave it to the authorities; your honesty was praised.",
          detay: "Some treasures are shared inheritance.",
        },
        basarisizSonuc: {
          mesaj: "You reported it, but the authorities barely cared.",
          detay: "Honesty doesn't always get its due.",
        },
      },
    ],
  },

  derinlik_kutsal_kalinti_mucizesi: {
    baslik: "On the Threshold of Death",
    metin:
      "A sudden fever put you to bed; your breath fails, those around seem to bid farewell. The relic at your chest warms your skin.",
    secenekler: [
      {
        metin: "Grip the relic, trust the legend.",
        basariliSonuc: {
          mesaj:
            "The relic glowed, the fever broke, then it turned to dust.",
          detay: "The tale was true: it returns you from death once.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Don't trust the relic, trust physician and fate.",
        basariliSonuc: {
          mesaj: "The fever fell on its own; you never learned its secret.",
        },
        basarisizSonuc: {
          mesaj: "The fever lasted days; was leaving the relic untouched right?",
        },
      },
    ],
  },

  derinlik_kutsal_kalinti_soru: {
    baslik: "Word of the Relic Got Out",
    metin:
      "Word of your relic spread. A band of pilgrims is at your door: 'Show us, let us touch it!'",
    secenekler: [
      {
        metin: "Show it, let them touch it.",
        basariliSonuc: {
          mesaj: "The pilgrims touched it and prayed. You became 'keeper of the relic'.",
        },
        basarisizSonuc: {
          mesaj:
            "The crowd surged, someone grabbed it; you got it back but lost belongings.",
        },
      },
      {
        metin: "Hide it, show no one.",
        basariliSonuc: {
          mesaj: "You shut the door. Some sulked but the relic is safe.",
        },
        basarisizSonuc: {
          mesaj: "They gossiped: 'If it were real, he wouldn't hide it.'",
        },
      },
      {
        metin: "Donate it to the church, be free.",
        basariliSonuc: {
          mesaj: "You handed the relic over; the burden lifted. You're just a witness now.",
        },
        basarisizSonuc: {
          mesaj: "They took the gift without even a thank-you.",
        },
      },
    ],
  },

  derinlik_lanetli_altin: {
    baslik: "A Suspicious Fortune",
    metin:
      "At a caravanserai, a gold purse whose owner mysteriously vanished is cheap. Strange rumors surround it.",
    secenekler: [
      {
        metin: "Buy the gold, ignore the rumors.",
        basariliSonuc: {
          mesaj: "You bought it; your pocket swelled but unease lingers.",
          detay: "Some gains carry an unseen price.",
        },
        basarisizSonuc: {
          mesaj: "The seller changed his mind and took the purse back.",
          detay: "Some chances slip away.",
        },
      },
      {
        metin: "Heed the rumors, stay away.",
        basariliSonuc: {
          mesaj: "You left the gold untouched and went on.",
          detay: "Weigh every chance against its risk.",
        },
        basarisizSonuc: {
          mesaj: "You stayed away but thought of that purse for long.",
          detay: "Curiosity clouds judgment.",
        },
      },
    ],
  },

  derinlik_lanetli_altin_ruyasi: {
    baslik: "The Previous Owner's Dream",
    metin:
      "Each night a hollow-eyed man haunts your dream: 'That gold was mine, it consumed me,' he says, pointing at the purse. You wake in a sweat.",
    secenekler: [
      {
        metin: "Have a priest break the curse.",
        basariliSonuc: {
          mesaj:
            "After a long rite the chill lifted. The dreams ended; it's an ordinary purse.",
          detay: "Some curses yield to the right hands.",
        },
        basarisizSonuc: {
          mesaj: "The rite failed; the priest said 'beyond my power' and fled.",
        },
      },
      {
        metin: "Give the gold away unopened.",
        basariliSonuc: {
          mesaj:
            "You handed the unopened purse to a beggar. The curse is no longer yours.",
          detay: "The dreams ended; your conscience won't forget.",
        },
        basarisizSonuc: {
          mesaj: "No one would take the 'gift'; they sensed something wrong.",
        },
      },
      {
        metin: "Ignore the dream, cling to the gold.",
        basariliSonuc: {
          mesaj:
            "'No one can take it,' you said. The ghost vanished; the purse held more gold.",
          detay: "The curse grew; it takes more life each year.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  derinlik_lanetli_altin_musteri: {
    baslik: "An Eager Buyer",
    metin:
      "At the caravanserai a rich merchant eyed your purse, beaming: 'An old fortune! I'll pay triple.' He seems unaware of the legend.",
    secenekler: [
      {
        metin: "Hide the curse, sell for triple.",
        basariliSonuc: {
          mesaj:
            "He paid, took the purse and left. Your pocket's heavy but you wonder about him.",
          detay: "Some gains are paid for by others.",
        },
        basarisizSonuc: {
          mesaj:
            "Opening the purse he felt the chill; he took the money back and threw it at you.",
        },
      },
      {
        metin: "Tell him; sell only if he insists.",
        basariliSonuc: {
          mesaj: "He smiled: 'I like such things.' He bought it knowingly, for less.",
        },
        basarisizSonuc: {
          mesaj: "'You're mad,' he said and left. You keep the purse, lose the buyer.",
        },
      },
      {
        metin: "Don't sell; spare everyone the curse.",
        basariliSonuc: {
          mesaj: "You refused. He left baffled but your conscience is clear.",
        },
        basarisizSonuc: {
          mesaj: "You refused but regretted the money.",
        },
      },
    ],
  },

  derinlik_gizli_orgut_daveti: {
    baslik: "The Inn's Back Room",
    metin:
      "At an inn, a masked man invites you to a back room. Inside, a group sits in shadow, faces unseen.",
    secenekler: [
      {
        metin: "Join the Temple Knights.",
        basariliSonuc: {
          mesaj: "You swore the oath; you're part of a powerful, hidden brotherhood.",
          detay: "Loyalty buys protection and power.",
        },
        basarisizSonuc: {
          mesaj: "Your initiation was tense but you were accepted.",
          detay: "No beginning is smooth.",
        },
      },
      {
        metin: "Join the Brotherhood in Shadow.",
        basariliSonuc: {
          mesaj: "You swore the oath; the city's unseen networks are open to you.",
          detay: "Built on information, not power.",
        },
        basarisizSonuc: {
          mesaj: "Your initiation was tense but you were accepted.",
          detay: "Trust is built over time.",
        },
      },
      {
        metin: "Refuse, leave the room.",
        basariliSonuc: {
          mesaj: "You politely refused; no one forced you.",
          detay: "Not every mysterious door should open.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal caused tension but they let you go.",
          detay: "A closed door stays closed.",
        },
      },
    ],
  },

  derinlik_orgut_gizli_gorev: {
    baslik: "A Mission From the Brotherhood",
    metin:
      "Someone from your order reached you at midnight: a dangerous, well-paid secret mission, for trusted members only.",
    secenekler: [
      {
        metin: "Take the Temple Knights mission.",
        kilitAciklamasi: "Open only to Temple Knights members.",
        basariliSonuc: {
          mesaj: "You completed it; your standing in the brotherhood grew.",
          detay: "Your loyalty was repaid.",
        },
        basarisizSonuc: {
          mesaj: "It went wrong; you barely escaped.",
          detay: "Secret missions are never that simple.",
        },
      },
      {
        metin: "Take the Brotherhood in Shadow mission.",
        kilitAciklamasi: "Open only to Brotherhood in Shadow members.",
        basariliSonuc: {
          mesaj: "It went smoothly; your network expanded.",
          detay: "Connections can outweigh gold.",
        },
        basarisizSonuc: {
          mesaj: "You were noticed; a small scandal broke.",
          detay: "Hiding in shadow isn't always possible.",
        },
      },
      {
        metin: "Refuse, too risky.",
        basariliSonuc: {
          mesaj: "You politely refused the mission.",
          detay: "You needn't take every chance.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal cost you some trust in the order.",
          detay: "Every no may carry a price.",
        },
      },
    ],
  },

  derinlik_kumarhane_daveti: {
    baslik: "The Dice Table",
    metin:
      "A friend invited you to a secret gambling table. The win is tempting but such places are addictive.",
    secenekler: [
      {
        metin: "Try one hand.",
        basariliSonuc: {
          mesaj: "Lucky night; your pocket swelled.",
          detay: "Winning's thrill turns dangerous.",
        },
        basarisizSonuc: {
          mesaj: "You lost but couldn't leave; you played on. Hard to stay away now.",
          detay: "Losing bound you tighter to the table.",
        },
      },
      {
        metin: "Politely refuse.",
        basariliSonuc: {
          mesaj: "You declined; a quiet night.",
          detay: "Some thrills are best avoided.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal let your friend down a little.",
          detay: "Every no creates some distance.",
        },
      },
    ],
  },

  saray_girme_denemesi: {
    baslik: "At the Palace Gate",
    metin:
      "Palace gatekeepers don't admit just anyone. But a purse of gold, or the right name, may crack the door.",
    secenekler: [
      {
        metin: "Show the Shadow Coin.",
        basariliSonuc: {
          mesaj:
            "Seeing the coin, the guards silently swung the doors wide.",
          detay: "You slipped in like a ghost.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Bribe the gatekeeper.",
        basariliSonuc: {
          mesaj: "Your gold spoke; the door quietly opened.",
          detay: "You're a known face at the palace now.",
        },
        basarisizSonuc: {
          mesaj: "The official was angered; you were thrown out, broke and shamed.",
          detay: "Some doors don't open for money.",
        },
      },
      {
        metin: "Rely on your standing and contacts.",
        kilitAciklamasi: "Not well known enough; make your name first",
        basariliSonuc: {
          mesaj: "An official who knew your name let you in.",
          detay: "Your fame opened another door.",
        },
        basarisizSonuc: {
          mesaj: "They'd never heard your name; you were humiliated.",
          detay: "Your fame hasn't spread so far.",
        },
      },
      {
        metin: "Give up, try another day.",
        basariliSonuc: {
          mesaj: "You gave up for today.",
          detay: "The palace isn't going anywhere.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  oc_veba_karsilasma: {
    baslik: "The Neighbor Next Door Is Sick",
    metin:
      "Your neighbor caught the plague; his family fled and he'll die alone unless someone tends him. Helping risks you too.",
    secenekler: [
      {
        metin: "Loose the Monastery Cat in his house.",
        basariliSonuc: {
          mesaj:
            "The black cat hunted the plague-bearing rats. Your neighbor recovered, grateful.",
          detay: "The 'ill-omen' cat saved a life.",
        },
        basarisizSonuc: { mesaj: "Not used" },
      },
      {
        metin: "Go to him, tend him.",
        basariliSonuc: {
          mesaj: "You nursed him back; the street won't forget your courage.",
          detay: "Some kindness risks life and death.",
        },
        basarisizSonuc: {
          mesaj: "You caught it too; you lay in fever for days.",
          detay: "Your compassion came dear.",
        },
      },
      {
        metin: "Stay away, protect yourself.",
        basariliSonuc: {
          mesaj: "You kept away; your neighbor fought alone.",
          detay: "Self-protection is survival too.",
        },
        basarisizSonuc: {
          mesaj: "Your neighbor died alone; the scene haunted you.",
          detay: "Some silences weigh on the conscience.",
        },
      },
    ],
  },

  gizem_koleksiyoncu_ejderha: {
    baslik: "The Collector's Visit",
    metin:
      "At midnight a silver-masked man knocked. He sensed your Dragon Talisman: 'Sell it, and I'll give a lifetime's gold.' His voice smells of rot.",
    secenekler: [
      {
        metin: "Give the talisman and take the gold.",
        basariliSonuc: {
          mesaj:
            "You handed it over. He left a heavy purse and melted into mist.",
          detay: "Pockets full, but the ancient warmth is gone.",
        },
        basarisizSonuc: {
          mesaj:
            "By morning the purse held dry leaves. Man and talisman were gone.",
          detay: "Some bargains are understood by morning.",
        },
      },
      {
        metin: "It's mine! Draw your sword, attack.",
        basariliSonuc: {
          mesaj:
            "The talisman empowered your blade! He dissolved into black smoke; his mask remained.",
          detay: "You beat a demon; you grasp the talisman's power.",
        },
        basarisizSonuc: {
          mesaj:
            "He raised a hand and flung you at the wall. You felt the talisman torn away.",
          detay: "You barely lived. Talisman gone, body broken.",
        },
      },
    ],
  },

  gizem_kara_kilic_fisilti: {
    baslik: "The Sword's Whisper",
    metin:
      "The Black Sword whispers, even at your belt, the name of someone you think wronged you. Delivering 'justice' yourself is tempting.",
    secenekler: [
      {
        metin: "Heed the whisper, settle the score.",
        basariliSonuc: {
          mesaj:
            "The sword moved almost by itself. No regret, no relief; only emptiness.",
          detay: "The sword's power grows, your conscience shrinks.",
        },
        basarisizSonuc: {
          mesaj: "It went wrong; you pulled back, wounded.",
          detay: "Heeding the whisper cost you dear.",
        },
      },
      {
        metin: "Lock the sword in a chest.",
        basariliSonuc: {
          mesaj: "You locked it in a deep chest; you sleep easier now.",
          detay: "Resisting some powers takes courage.",
        },
        basarisizSonuc: {
          mesaj: "You locked it away but the whisper lingers.",
          detay: "Some voices outlast a lock.",
        },
      },
    ],
  },

  gizem_sirli_iksir_ikilemi: {
    baslik: "The Last Bottle",
    metin:
      "{dost} is gravely ill, the physicians helpless. Your mysterious elixir may be a miracle or colored water; nothing else is left to try.",
    secenekler: [
      {
        metin: "Give {dost} the elixir.",
        basariliSonuc: {
          mesaj: "{dost}'s breathing steadied; the first face they saw was yours.",
          detay: "Your hoarded mystery became a timely miracle.",
        },
        basarisizSonuc: {
          mesaj: "It was ordinary syrup; nothing changed, your last hope gone.",
          detay: "Some legends stay legends.",
        },
      },
      {
        metin: "Keep it, consider selling to a collector.",
        basariliSonuc: {
          mesaj: "You sold it; your coffer filled but you couldn't say so at {dost}'s bedside.",
          detay: "Some gains are carried as guilt.",
        },
        basarisizSonuc: {
          mesaj: "You sold it cheap; left with guilt and little gain.",
          detay: "You paid the price for nothing.",
        },
      },
    ],
  },

  gizem_golge_sikke_kumari: {
    baslik: "Fate's Coin",
    metin:
      "The Shadow Coin sits oddly heavy in your hand; tossed, it's said to alter fate. In a big wager you could stake your fate on it.",
    secenekler: [
      {
        metin: "Stake the coin on a big wager.",
        basariliSonuc: {
          mesaj: "The coin spun thrice and landed your way! The table watched in horror.",
          detay: "The coin's fame grew with yours.",
        },
        basarisizSonuc: {
          mesaj: "The coin showed its other face. You left everything on the table.",
          detay: "Fate doesn't act as it whispers.",
        },
      },
      {
        metin: "Keep it as a lucky charm.",
        basariliSonuc: {
          mesaj: "You pocketed it unused; its mystery lives on with your curiosity.",
          detay: "Carrying power unspent is wisdom.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  gizem_gizemli_harita_ikinci_yol: {
    baslik: "The Map's Second Path",
    metin:
      "Rereading the Mysterious Map, you spot two markings: one to a dangerous abandoned passage, one to a curious collector's door.",
    secenekler: [
      {
        metin: "Explore the dangerous passage.",
        basariliSonuc: {
          mesaj: "At its end you found a forgotten temple's treasure! Your name spread.",
          detay: "Some risks become legends.",
        },
        basarisizSonuc: {
          mesaj: "The passage collapsed; you barely escaped, the map buried.",
          detay: "Not every map leads to riches.",
        },
      },
      {
        metin: "Sell the map to the collector.",
        basariliSonuc: {
          mesaj: "The collector was dying for it; you got a good price.",
          detay: "Passing on curiosity can be wise.",
        },
        basarisizSonuc: {
          mesaj: "The collector haggled hard; you earned less than hoped.",
          detay: "Not every haggle ends well.",
        },
      },
    ],
  },

  gizem_hazine_haritasi_ortaklik: {
    baslik: "A Partnership Offer",
    metin:
      "A veteran treasure hunter who learned of your Treasure Map offers a fifty-fifty partnership. Alone pays more but risks more.",
    secenekler: [
      {
        metin: "Accept, share the risk.",
        basariliSonuc: {
          mesaj: "With the hunter the dig went safely; you split the treasure.",
          detay: "Half the gain is trust's price.",
        },
        basarisizSonuc: {
          mesaj: "Your partner quit at the last moment; the dig stalled, costs yours.",
          detay: "Not every partnership works.",
        },
      },
      {
        metin: "Refuse, go alone.",
        basariliSonuc: {
          mesaj: "You dug alone and the treasure is all yours! Worth the risk.",
          detay: "Sometimes not sharing makes you richest.",
        },
        basarisizSonuc: {
          mesaj: "The solo dig went badly; you returned empty-handed and hurt.",
          detay: "Courage alone may not suffice.",
        },
      },
    ],
  },

  gizem_olunun_yuzugu_lanet_soylentisi: {
    baslik: "A Curse Rumor",
    metin:
      "An old woman recoiled at your ring: 'A dead man's ring is cursed!' A priest offers to 'cleanse' it for a small fee.",
    secenekler: [
      {
        metin: "Pay the priest to cleanse it.",
        basariliSonuc: {
          mesaj: "The priest 'purified' the ring with a prayer; you felt relieved.",
          detay: "Peace sometimes costs a few coins.",
        },
        basarisizSonuc: {
          mesaj: "The rite ended but your unease stayed.",
          detay: "Money can't erase some fears.",
        },
      },
      {
        metin: "Call it superstition, keep wearing it.",
        basariliSonuc: {
          mesaj: "You kept wearing it; nothing happened. You laughed it off.",
          detay: "Sometimes fear is just fear.",
        },
        basarisizSonuc: {
          mesaj: "After a string of mishaps the street called you 'cursed'.",
          detay: "Rumor finds you, believer or not.",
        },
      },
    ],
  },

  gizem_hazine_bulundu_vergi_sorunu: {
    baslik: "The Burden on the Back of the Suddenly Rich",
    metin:
      "Word of your treasure spread. A tax collector is at your door: pay the 'found fortune tax' or explain in court where you found it.",
    secenekler: [
      {
        metin: "Quietly pay the tax.",
        basariliSonuc: {
          mesaj: "You paid; the collector left frowning.",
          detay: "Wealth's price is the state's share.",
        },
        basarisizSonuc: {
          mesaj: "You paid but he noted you as a 'suspicious rich man'.",
          detay: "Even paying costs you standing.",
        },
      },
      {
        metin: "Silence him with a small bribe.",
        basariliSonuc: {
          mesaj: "He pocketed the money and winked; no trace in the records.",
          detay: "Some problems are paid in morals.",
        },
        basarisizSonuc: {
          mesaj: "The bribe was reported; you got a fine and a 'corrupt' name.",
          detay: "Shortcuts sometimes take longer.",
        },
      },
    ],
  },
};
