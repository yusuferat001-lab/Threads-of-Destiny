import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/esyaVeGizem.ts — İngilizce çevirileri. */
export const OLAYLAR_ESYA_VE_GIZEM_EN: Record<string, OlayCeviri> = {
  kg_antika_harita: {
    baslik: "The Junk Dealer's Trash",
    metin:
      "In your free time, at a junk dealer's stall, you found an old parchment covered in mud. There seem to be map lines beneath it.",
    secenekler: [
      {
        metin: "Spend your nights restoring the map.",
        basariliSonuc: {
          mesaj:
            "You worked until your eyes gave out, but you did it! This isn't an ordinary parchment — it's a map of a forgotten passage. You should keep this.",
        },
        basarisizSonuc: {
          mesaj: "While cleaning off the mud the parchment tore and was completely destroyed. You're tired and empty-handed.",
        },
      },
      {
        metin: "Don't bother with it, sell it straight to a noble as an 'antique'.",
        basariliSonuc: {
          mesaj: "With fancy words you sold the muddy parchment as an antique. Your pocket filled but you know who you tricked.",
        },
        basarisizSonuc: {
          mesaj: "The noble realized it was junk and had you thrown out.",
        },
      },
    ],
  },

  komik_yanlis_cenaze: {
    baslik: "The Wrong Door",
    metin:
      "Something is off at the house you went to for a funeral; it turns out you knocked on the wrong door, you're at the mourning ceremony of a family you've never met, and everyone is looking at you for condolences.",
    secenekler: [
      {
        metin: "Openly admit the situation and apologize.",
        basariliSonuc: {
          mesaj: "Your confession made the grieving family laugh. You became an unexpected, warm memory at the funeral.",
        },
        basarisizSonuc: {
          mesaj: "No one laughed; they declared you 'disrespectful' and threw you out.",
        },
      },
      {
        metin: "Act as if you didn't notice, pretend to cry and slip away.",
        basariliSonuc: {
          mesaj: "You pretended to wipe away tears and slipped quietly outside. You'll tell this story with a laugh for years.",
        },
        basarisizSonuc: {
          mesaj:
            "On the way out you tripped on your shoe and crashed into the coffin! You fled amid everyone's horrified stares.",
        },
      },
      {
        metin: "Take advantage of the confusion and steal a keepsake (!) from the deceased.",
        basariliSonuc: {
          mesaj: "While no one was looking you pocketed the gold ring off the deceased's finger. Ruthless, but profitable.",
        },
        basarisizSonuc: {
          mesaj: "As you held the deceased's hand the widow saw you! You took a public beating amid cries of 'Thief!'",
        },
      },
    ],
  },

  komik_seyyar_satici: {
    baslik: "The Miracle Elixir",
    metin:
      "A traveling salesman is shouting that the glowing purple liquid in the bottle is 'a miracle that raises the dead and cures all ills'. The bystanders don't believe him, but the liquid is strangely alluring.",
    secenekler: [
      {
        metin: "Don't trust the salesman, walk away.",
        basariliSonuc: {
          mesaj: "You acted sensibly, and your money stayed in your pocket.",
        },
        basarisizSonuc: {
          mesaj: "You were curious but held back; a slight regret stayed in you.",
        },
      },
      {
        metin: "Pour out your gold and buy a bottle.",
        basariliSonuc: {
          mesaj:
            "You paid and dropped the elixir into your bag. Strangely, the bottle seems to be warming. It might come in handy one day.",
        },
        basarisizSonuc: {
          mesaj: "The liquid turned out to be foul goat's milk! By the time you got back the salesman had already fled.",
        },
      },
      {
        metin: "Seize the chance in the crowd, steal a bottle from the stall.",
        basariliSonuc: {
          mesaj:
            "With a sleight of hand you hid the bottle in your robe. Your money stayed in your pocket and you have a mysterious elixir.",
        },
        basarisizSonuc: {
          mesaj:
            "The salesman grabbed your wrist! To avoid being handed over to the guards you had to give up all the money in your pocket as a bribe.",
        },
      },
    ],
  },

  gizem_ejderha_tilsimi: {
    baslik: "The Blind Eastern Sorcerer",
    metin:
      "A mysterious merchant with pure white eyes has come to the city, and there's a single item on his stall: an ancient rune-carved, blood-red Dragon Talisman. 'Only those whose fate is written in blood can bear it,' he whispers.",
    secenekler: [
      {
        metin: "Pay the outrageous price he wants and take the talisman.",
        basariliSonuc: {
          mesaj:
            "You piled the gold before him. The moment you hung the talisman around your neck you felt a warm power in your chest. This is no ordinary item.",
        },
        basarisizSonuc: {
          mesaj: "You took the talisman but woke that night with nightmares. Your body is rejecting this ancient energy.",
        },
      },
      {
        metin: "Take advantage of his blindness, steal the talisman quietly.",
        basariliSonuc: {
          mesaj:
            "You snatched the talisman and ran! The blind man shouted after you, 'You'll pay for it with your soul!' The power is yours but you tremble inside.",
        },
        basarisizSonuc: {
          mesaj:
            "The moment you reached out, the blind man seized your wrist. His eyes flashed and where he touched you burned like fire. You fled screaming.",
        },
      },
      {
        metin: "This magic business isn't for me, walk away fast.",
        basariliSonuc: {
          mesaj: "You said the end of these mystical things is usually bad, and went home.",
        },
        basarisizSonuc: {
          mesaj:
            "You went home but the image of that blood-red talisman wouldn't leave your mind. You kept thinking, 'What if it really was legendary?'",
          detay: "Missing some opportunities bleeds inside a person for a long time.",
        },
      },
    ],
  },

  gizem_kara_kilic: {
    baslik: "The Sword in the Graveyard",
    metin:
      "While patrolling the forest in the dark of night, you found a black sword stuck upright in an old grave. The grass around it has rotted but the sword's hilt seems to call your hand to it.",
    secenekler: [
      {
        metin: "Grip the sword by the hilt and pull it from the grave.",
        basariliSonuc: {
          mesaj:
            "You drew the sword! The steel instantly attuned to your blood. You'll be unbeatable on the battlefield, but the whispers inside the sword never fall silent.",
        },
        basarisizSonuc: {
          mesaj:
            "The moment you touched the sword a black poison spread through your body. You dropped it screaming and lay in a coma for days.",
        },
      },
      {
        metin: "Don't touch the sword, say a prayer at the grave and leave.",
        basariliSonuc: {
          mesaj: "You bowed with respect and walked away. It's best not to meddle with unnatural things.",
        },
        basarisizSonuc: {
          mesaj: "You left the sword but that dark allure haunted your dreams for days.",
        },
      },
    ],
  },

  gizem_melek_tuyu: {
    baslik: "A Dying Pilgrim",
    metin:
      "A pilgrim, covered in blood, collapsed at the door of the church/mosque. Before drawing his last breath he pressed a glowing, pure white feather into your palm. 'An angel that came down from heaven gave me this, it wards off evil,' he whispered, and died.",
    secenekler: [
      {
        metin: "Keep the feather as a holy relic.",
        basariliSonuc: {
          mesaj:
            "You kept the feather at your chest. Whenever your heart grows heavy, the feather's warmth gives you peace. This is a true grace.",
        },
        basarisizSonuc: {
          mesaj: "You kept the feather but the congregation thought you'd fallen for superstition and reproached you.",
        },
      },
      {
        metin: "Sell it to a rich noble as a 'genuine angel feather'.",
        basariliSonuc: {
          mesaj:
            "The noble loved this story and paid you a fortune. Your pocket is full of gold but you feel as if you've sold your soul to the devil.",
        },
        basarisizSonuc: {
          mesaj: "The noble accused you of fraud and had his guards beat you. The feather blew away in the wind.",
        },
      },
      {
        metin: "This is heresy! Throw the feather in the fire and bury the man.",
        basariliSonuc: {
          mesaj:
            "You didn't give in to superstition. As the feather burned you thought you heard a strange scream, but you paid it no mind.",
        },
        basarisizSonuc: {
          mesaj: "You burned the feather, but the feeling of 'did I make a mistake' gnaws at you.",
        },
      },
    ],
  },

  gizem_melek_tuyu_mucize: {
    baslik: "An Unexpected Healing",
    metin:
      "An old woman from the congregation collapsed, struggling to breathe, her lips turning blue. You felt the warmth of the feather in your pocket. Maybe real, maybe superstition — but you have a chance in your hands.",
    secenekler: [
      {
        metin: "Take out the feather, touch it to her forehead and pray.",
        basariliSonuc: {
          mesaj:
            "The feather warmed in your palm, almost trembled. The woman's breathing steadied at once, she opened her eyes! Everyone around looks at you with awe and wonder — you'll be known as a 'miracle hand' now.",
          detay: "The pilgrim's last words were not a lie.",
        },
        basarisizSonuc: {
          mesaj:
            "The feather stayed silent in your hand, an ordinary feather. The woman died before your eyes. The congregation accused you of handing out empty hope.",
          detay: "Some legends stay only legends.",
        },
      },
      {
        metin: "Don't meddle with this; death too is God's will.",
        basariliSonuc: {
          mesaj: "You held her hand and prayed but didn't touch the feather. The woman drew her last breath in peace.",
          detay: "Not every miracle deserves to be tried; sometimes acceptance is a virtue too.",
        },
        basarisizSonuc: {
          mesaj:
            "The woman turned her eyes to you one last time. Because you didn't try, you'll spend years thinking 'what if it really would have worked'.",
        },
      },
    ],
  },

  gizem_melek_tuyu_calinti: {
    baslik: "The Man After the Feather",
    metin:
      "At midnight someone slipped into your room and is reaching straight for the chest where the feather at your chest is hidden. 'That feather is my right too, the pilgrim was my uncle!' he whispers in the dark.",
    secenekler: [
      {
        metin: "Raise your voice, chase the man off.",
        basariliSonuc: {
          mesaj: "Neighbors came running at your shout, the man fled into the dark. The feather is still yours but your night is ruined.",
        },
        basarisizSonuc: {
          mesaj: "The man shoved you aside as he fled; he jumped out the window without managing to grab the feather.",
          detay: "Some nights are remembered only by fear.",
        },
      },
      {
        metin: "Calm him down, listen to his story, offer to share the feather.",
        basariliSonuc: {
          mesaj:
            "You talked with the man until morning; you heard his story, you wept together. You decided to share the feather — you both felt a little lighter.",
        },
        basarisizSonuc: {
          mesaj: "The man didn't believe your words, a fight broke out; to calm him down you had to give him the money in your pocket too.",
        },
      },
      {
        metin: "Grip the feather tight, say you'll never give it up.",
        basariliSonuc: {
          mesaj: "The man backed off before your resolve. The feather is still yours, but you won't forget the disappointment in his eyes.",
        },
        basarisizSonuc: {
          mesaj: "A struggle broke out, you both came away wounded. The feather is on the floor, slipped from both your hands.",
        },
      },
    ],
  },

  ruh_karanlik_fisiltilar: {
    baslik: "Whispers of the Dark",
    metin:
      "Lately the darkness inside you has been growing. At night you hear voices that aren't there, you see shadows that don't stay in the corner. It's as if something is trying to take you over.",
    secenekler: [
      {
        metin: "Answer the whispers of the Black Sword and embrace the darkness.",
        basariliSonuc: {
          mesaj:
            "The voices' source was the sword! You merged with its darkness. You're not afraid anymore, because you've become the darkness itself.",
        },
        basarisizSonuc: {
          mesaj: "The sword was about to drive you completely mad; at the last moment you flung it to the ground and were saved.",
        },
      },
      {
        metin: "Try to pull yourself together, ask a physician for help.",
        basariliSonuc: {
          mesaj: "The opium syrups the physician gave lightened your mind; the shadows dispersed a little.",
        },
        basarisizSonuc: {
          mesaj: "The physician thought you were mad. The medicine he gave did nothing but turn your stomach.",
        },
      },
      {
        metin: "Try to resist on your own, shut yourself in your room.",
        basariliSonuc: {
          mesaj: "You figured it would pass anyway and locked the door and waited for days. For a while you were proven right.",
        },
        basarisizSonuc: {
          mesaj: "Your hallucinations grew; you ran into the street half-naked and started shouting. Your reputation was in ruins.",
        },
      },
    ],
  },

  cocuk_hastalik_baslangic: {
    baslik: "A Burning Fever",
    metin:
      "Your child is writhing in fever. Their color has faded and they can barely breathe. The only skilled physician in town wants far too much gold.",
    secenekler: [
      {
        metin: "Use the Mysterious Elixir and heal them instantly!",
        basariliSonuc: {
          mesaj:
            "The moment you dripped the liquid on your child's lips the fever broke! They opened their eyes and smiled. That traveling salesman was telling the truth!",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Send for the physician and give him all your savings.",
        basariliSonuc: {
          mesaj: "The physician came and began treatment with leeches and ointments. The situation will become clear in a few days.",
        },
        basarisizSonuc: {
          mesaj: "The physician shook his head and said, 'The condition is critical, just pray.'",
        },
      },
      {
        metin: "I have no money, I'll treat it myself with a wet cloth.",
        basariliSonuc: {
          mesaj: "You kept vigil at their bedside day and night and brought the fever down.",
        },
        basarisizSonuc: {
          mesaj: "The fever just won't break; worse, the child started having convulsions.",
        },
      },
    ],
  },

  dunya_savas_ilani: {
    baslik: "War Bells",
    metin:
      "The year is {yil}. A massive war has broken out between {bolge} and {komsu}! The border villages are burning. Mobilization criers shout in the squares: from every household, one who can bear arms will join the army!",
    secenekler: [
      {
        metin: "Gird on the Black Sword and go to the front, at the very front!",
        basariliSonuc: {
          mesaj:
            "The Black Sword danced in your hand almost of its own accord. The enemy fled in terror of you! You're spoken of like a war god, but when night falls you can't forget the vile things the sword whispered to you.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Enlist as a volunteer, shed your blood for the homeland.",
        basariliSonuc: {
          mesaj:
            "You spent months in the trenches in mud and blood. But you're alive, you got a medal and came back with your share of the spoils.",
        },
        basarisizSonuc: {
          mesaj:
            "A cannon shell landed right beside you. When you woke you were in a field hospital. Your body was shattered; your old strength will never come back.",
        },
      },
      {
        metin: "Arrange a false medical exemption and flee the war.",
        basariliSonuc: {
          mesaj:
            "By bribing the physician you secured yourself at home. While news of your neighbors' deaths comes from the front, you're in your warm bed. Your reputation is in ruins.",
        },
        basarisizSonuc: {
          mesaj:
            "It came out that you paid a bribe! They forced you to the very front lines, to your death. You lost both your honor and your money.",
        },
      },
    ],
  },

  dunya_savas_ilani_asker: {
    baslik: "Mobilization",
    metin:
      "The year is {yil}. A massive war has broken out between {bolge} and {komsu}! The border villages are burning. You're already enrolled in the army; no one asks whether you'll join, your unit is called to the front. The only question is what role you'll take there.",
    secenekler: [
      {
        metin: "Gird on the Black Sword and go to the front, at the very front!",
        basariliSonuc: {
          mesaj:
            "The Black Sword danced in your hand almost of its own accord. The enemy fled in terror of you! You're spoken of like a war god, but when night falls you can't forget the vile things the sword whispered to you.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Join the frontline assault unit, fight heroically.",
        basariliSonuc: {
          mesaj:
            "You spent months in the trenches in mud and blood. But you're alive, you got a medal and came back with your share of the spoils.",
        },
        basarisizSonuc: {
          mesaj:
            "A cannon shell landed right beside you. When you woke you were in a field hospital. Your body was shattered; your old strength will never come back.",
        },
      },
      {
        metin: "Take a post at the rear, in logistics and support.",
        basariliSonuc: {
          mesaj:
            "You kept provisions and munitions flowing behind the front; no one will speak your name, but the army would have gone hungry without you.",
          detay: "Heroism isn't always at the front line.",
        },
        basarisizSonuc: {
          mesaj: "An enemy raid reached as far as the logistics line; you survived, wounded.",
          detay: "Staying at the rear isn't always free of danger either.",
        },
      },
    ],
  },

  dunya_salgin_baslar: {
    baslik: "The Black Death at the Door",
    metin:
      "With the last ship to dock at the harbors, an invisible killer entered the city. People started dying in the streets, vomiting blood. The city gates are about to be closed.",
    secenekler: [
      {
        metin: "Use the Mysterious Elixir for your family and yourself!",
        basariliSonuc: {
          mesaj:
            "You drank the elixir. An ice-cold feeling spread through your veins. As everyone around you was struck down, not a single fly could touch you or your family!",
          detay: "You became the miracle itself.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Drop everything, take the family and flee to the countryside (the mountains).",
        basariliSonuc: {
          mesaj:
            "You fled to the forest before the plague-masked men held the gates. You lived in the cold and in misery, but you're alive.",
          detay: "When you return, your shop/business will have passed into others' hands.",
        },
        basarisizSonuc: {
          mesaj:
            "On the way out someone in the caravan infected you too. In the middle of the forest, you lie helplessly burning with fever.",
        },
      },
      {
        metin: "Stay in the city! Run a black market in medicine and provisions.",
        basariliSonuc: {
          mesaj:
            "You sold aspirin and clean water at the price of gold. While people died groaning, you added fortune to fortune.",
        },
        basarisizSonuc: {
          mesaj:
            "One of your customers' vomit hit your face. Your gold couldn't save you; the black death sank into your lungs.",
        },
      },
    ],
  },

  dunya_salgin_ortasinda: {
    baslik: "The Heart of the Plague",
    metin:
      "Corpse carts roam the streets. Cries of 'Bring out your dead!' echo. The neighborhood is preparing to set the house next door on fire, because there's a dying child inside.",
    secenekler: [
      {
        metin: "Let the Monastery Cat loose in the house to protect you from the rats.",
        basariliSonuc: {
          mesaj:
            "That strange black cat hunted day and night. Not a single sick rat could come near the house. The cat became your family's guardian angel!",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Defy the crowd and go into the burning house to save that child!",
        basariliSonuc: {
          mesaj:
            "You broke down the door and carried that child out through the flames on your shoulder. You didn't catch the disease. The city sees you like a prophet.",
          detay: "That life you saved will be grateful to you for a lifetime.",
        },
        basarisizSonuc: {
          mesaj: "You got the child out but the plague passed to you too. The moment the child's breath touched your face was the beginning of the end.",
        },
      },
      {
        metin: "Nail the doors shut, board up the windows. Pity no one.",
        basariliSonuc: {
          mesaj: "You stopped your ears until the child's screams ceased. You didn't step out the door, and you survived.",
          detay: "You'll never forget the night you heard those screams.",
        },
        basarisizSonuc: {
          mesaj: "You turned your home into a tomb but the plague had already gotten into the water. Between four walls, you writhe in fever.",
        },
      },
    ],
  },

  ekonomi_kriz_donemi_v2: {
    baslik: "In the Grip of the Crisis",
    metin:
      "The country's economy has collapsed, money isn't worth a handful of dirt. {es} and your children are fighting hunger. You need money to save the shop, and bread to save the family.",
    secenekler: [
      {
        metin: "I'll use my last money to buy food for my children/family on the black market.",
        kilitAciklamasi: "You must have children to feed your family.",
        basariliSonuc: {
          mesaj:
            "You closed the shop's shutters forever. Trade is over. But your children ate their fill of bread that evening. You're the family's hero.",
        },
        basarisizSonuc: {
          mesaj: "You gave up your capital but the black marketeer gave you rotten goods. The business went under and the children got sick.",
        },
      },
      {
        metin: "I have to save the business! Let the family grit their teeth, put the money into the shop.",
        basariliSonuc: {
          mesaj:
            "While everyone was going under, you built an empire out of the crisis! But when you got home you'll never be able to erase the hurt look your children, wasted thin from weakness, gave you.",
        },
        basarisizSonuc: {
          mesaj: "The crisis swallowed you too. The shop went under and your family was ravaged by hunger. An utter catastrophe.",
        },
      },
      {
        metin: "Buy time by pawning the Dead Man's Ring to a moneylender.",
        basariliSonuc: {
          mesaj:
            "You tossed the ring you'd lifted from the grave/coffin to the moneylender. His eyes lit up and he didn't put you in debt. You saved both your family and your business!",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  gizem_golge_pazari: {
    baslik: "The Street That Doesn't Exist",
    metin:
      "You got lost at night and found yourself in a foggy street not on any map — souls and secrets are sold at the stalls. A masked merchant holds out a gleaming black coin: 'To buy this, you'll give not gold but your memories.'",
    secenekler: [
      {
        metin: "Give the happy memories of my past and take the coin.",
        basariliSonuc: {
          mesaj:
            "The merchant touched your forehead. Your childhood joys, your mother's face... all erased. In your hand is a 'Shadow Coin', cold as hell.",
        },
        basarisizSonuc: {
          mesaj:
            "The merchant took your memories, but the coin he pressed into your palm scattered like mist. The street was gone too. You paid the price and were left empty-handed.",
          detay: "Some markets are set up only to take.",
        },
      },
      {
        metin: "My soul is not for sale! Run from here.",
        basariliSonuc: {
          mesaj: "You turned and ran. When you looked back there was only a stone wall where that street had been. Your soul is safe.",
        },
        basarisizSonuc: {
          mesaj:
            "As you fled, arms clawed at you from the fog. You escaped the street but you'll see that masked face for nights on end.",
        },
      },
    ],
  },

  gizem_fisildayan_tas: {
    baslik: "A Flat, Gray Stone",
    metin:
      "An old woman sitting by the roadside displays a single item on the cloth before her: a plain-looking gray stone the size of a palm. 'I'll give it cheap,' she says, 'but you have to know how to listen. It's already listening to you.'",
    secenekler: [
      {
        metin: "Smile, buy the stone for a few copper coins.",
        basariliSonuc: {
          mesaj:
            "You took the stone in your palm; its weight is strangely just right. The woman smiled: 'Now it's a part of you too.' When you put it in your pocket you thought you heard a faint humming.",
          detay: "Maybe it's your imagination, maybe not.",
        },
        basarisizSonuc: {
          mesaj: "You took the stone but it turned out no different from an ordinary pebble, and the woman vanished the moment she got the money.",
        },
      },
      {
        metin: "Take advantage of the woman and steal the stone.",
        basariliSonuc: {
          mesaj:
            "While the woman looked away you snatched the stone and ran. You heard her shout after you: 'It will find you, even without payment!'",
          detay: "There's already a faint humming in your hand.",
        },
        basarisizSonuc: {
          mesaj:
            "The woman grabbed your wrist with an iron grip and, with an agility you'd never expect from her age, humiliated you in the square.",
        },
      },
      {
        metin: "Call it nonsense, go on your way.",
        basariliSonuc: {
          mesaj: "You shrugged and walked on. You heard the woman giggle behind you but paid it no mind.",
        },
        basarisizSonuc: {
          mesaj:
            "As you walked, the woman's words kept turning in your head: 'It's already listening to you.' Some nights you wonder about that stone.",
          detay: "Some curiosities grow the longer they go unanswered.",
        },
      },
    ],
  },

  gizem_fisildayan_tas_uyari: {
    baslik: "The Stone Spoke",
    metin:
      "At midnight, the stone in your pocket suddenly warmed and whispered into your ear — really into your ear? — a thin, sandy voice: 'Tomorrow... someone you trust... be careful.' Then silence. Your heart is pounding.",
    secenekler: [
      {
        metin: "Take the warning seriously, be cautious the next day.",
        basariliSonuc: {
          mesaj:
            "You went about the day on alert; a close friend had bad news they had to tell you, and you noticed it at the last moment, not caught unprepared.",
          detay: "The stone was right — or you mistook your own intuition for its voice.",
        },
        basarisizSonuc: {
          mesaj: "You jumped at shadows all day but nothing happened; you just had a sleepless, tense day.",
        },
      },
      {
        metin: "It was a dream, ignore it.",
        basariliSonuc: {
          mesaj: "You shrugged it off and forgot. Maybe it really was just a dream.",
        },
        basarisizSonuc: {
          mesaj: "You ignored it and someone you trusted really did spread a rumor that humiliated you. You should have listened.",
        },
      },
    ],
  },

  gizem_fisildayan_tas_istek: {
    baslik: "The Stone's Demand",
    metin:
      "This time the stone spoke more clearly: 'Give me a name. The name of someone you love. In return I'll give you luck to last for years.' Its voice is no longer sandy, almost human.",
    secenekler: [
      {
        metin: "Make up the name of a stranger at random, deceive it.",
        basariliSonuc: {
          mesaj:
            "The stone was silent for a while, then whispered 'I accept.' Your convincing lie seems to have worked; the coming days passed with strange luck.",
          detay: "Or it was all just coincidence.",
        },
        basarisizSonuc: {
          mesaj: "'You lied,' the stone hissed, its voice trembling with anger. From that day on, even carrying it in your pocket makes you shudder.",
        },
      },
      {
        metin: "Give no one's name; quietly throw the stone into a well.",
        basariliSonuc: {
          mesaj:
            "You dropped the stone into the darkness of the well. A faint, disappointed hum rose from the depths, then nothing. You felt relieved.",
          detay: "Some secrets deserve to be buried before they come to light.",
        },
        basarisizSonuc: {
          mesaj: "You threw the stone away but you'll never forget that last whisper rising from the well — it knew your name.",
        },
      },
      {
        metin: "Actually whisper the name of someone you love.",
        basariliSonuc: {
          mesaj:
            "The moment you whispered the name the stone went ice-cold, then turned to dust in your hand. The next week your affairs opened up incredibly — but you shudder inside every time you look at the person whose name you gave.",
          detay: "You'll never be able to tell anyone where your luck came from.",
        },
        basarisizSonuc: {
          mesaj:
            "The stone crumbled to dust, but not a single door opened in return. Only the person whose name you gave fell ill within weeks. That was the price.",
          detay: "The whisper always takes something; this time it gave you nothing.",
        },
      },
    ],
  },

  gizem_eski_ayna: {
    baslik: "The Goods of the Abandoned Mansion",
    metin:
      "The furnishings of an abandoned mansion outside the city are being sold at auction. Most of the items smell of mold but a silver-plated mirror standing in the corner catches your eye. The strange thing: the room reflected in it looks slightly different from where you're standing.",
    secenekler: [
      {
        metin: "Buy the mirror.",
        basariliSonuc: {
          mesaj:
            "You carried the mirror home. The moment you hung it on the wall, the reflection in it lagged a beat and caught up to you — as if the mirror too were seeing this room for the first time, like you.",
          detay: "Maybe it's from tiredness, maybe not.",
        },
        basarisizSonuc: {
          mesaj: "You bought the mirror but paid more than expected due to an auction trick.",
        },
      },
      {
        metin: "Take advantage of the crowd's confusion and take the mirror quietly.",
        basariliSonuc: {
          mesaj:
            "Without anyone noticing you wrapped the mirror in a cloth and walked off. Your hands had gone cold for a reason you can't explain.",
        },
        basarisizSonuc: {
          mesaj: "The officials caught you red-handed; you paid the fine and your name started being spoken as 'thief' in the neighborhood.",
        },
      },
      {
        metin: "It's a strange item, leave it alone.",
        basariliSonuc: {
          mesaj: "You gave the mirror one last look and turned away. You didn't even notice that its reflection — for a moment — also turned away.",
        },
        basarisizSonuc: {
          mesaj:
            "Even as you walked away you couldn't help thinking about that momentary lag. Some nights, when you close your eyes, you still see that room.",
          detay: "Things you ignore sometimes follow you.",
        },
      },
    ],
  },

  gizem_eski_ayna_yansima: {
    baslik: "The Wrong Reflection",
    metin:
      "You got up for a drink of water at night and stopped as you passed the mirror. The you in the reflection wasn't you — lagging a moment, it looked at you with a different expression. Then everything went back to normal.",
    secenekler: [
      {
        metin: "Approach the mirror, examine it carefully.",
        basariliSonuc: {
          mesaj:
            "You brought your face inches from the glass. Your reflection smiled — without you smiling. But the moment you pulled back, everything was yours again. You can't fully explain what you saw, but you look at the world a little differently now.",
          detay: "Some experiences change you, even if you can't explain them.",
        },
        basarisizSonuc: {
          mesaj:
            "The thing in the glass reached a hand out toward you! You leapt back screaming, nearly dropping the mirror. For days, when you close your eyes, you see that hand.",
        },
      },
      {
        metin: "Cover the mirror with a cloth, don't uncover it till morning.",
        basariliSonuc: {
          mesaj: "You covered the mirror and lay down with your back to it. In the morning everything was normal, or seemed to be.",
        },
        basarisizSonuc: {
          mesaj: "You covered it but you could have sworn you heard a faint tapping from under the cloth.",
        },
      },
    ],
  },

  gizem_eski_ayna_kehanet: {
    baslik: "The Warning in the Mirror",
    metin:
      "When you looked in the mirror you didn't see yourself: you saw a familiar street, a cart about to topple onto you, then everything went black. The image was so clear your skin is still crawling.",
    secenekler: [
      {
        metin: "Stay away from the street you saw for a few days.",
        basariliSonuc: {
          mesaj:
            "You changed your route. Three days later you heard that a cart really did topple on that street, badly wounding someone. The mirror wasn't lying.",
          detay: "Now, every time you look at it, you feel both grateful and uneasy.",
        },
        basarisizSonuc: {
          mesaj: "You changed your route but nothing happened; maybe it was just a bad dream, and you felt a bit foolish.",
        },
      },
      {
        metin: "Never mind, don't meddle with fate; live as usual.",
        basariliSonuc: {
          mesaj: "You tried to forget the image. The days passed ordinarily, and the mirror never mentioned that street again.",
        },
        basarisizSonuc: {
          mesaj: "Just as you were passing through that street a cart toppled! You threw yourself clear at the last moment but were still badly hurt. The mirror had warned you.",
        },
      },
    ],
  },

  rusvet_memur: {
    baslik: "The Seal and the Purse",
    metin:
      "The permit vital to your business has been sitting on the desk for weeks. The fat official smirks slyly at you, saying, 'Things are always incomplete around here, maybe a purse of gold would complete these gaps.'",
    secenekler: [
      {
        metin: "Give the Cursed Ring as a bribe.",
        basariliSonuc: {
          mesaj:
            "You gave the official that cold ring you'd lifted from a coffin. The man joyfully stamped the seal. Three days later you heard the official had lost his mind and thrown himself into the river.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Give him what he wants, feed the system.",
        basariliSonuc: {
          mesaj: "He took the gold and handled your business in seconds. You're a loyal part of this broken order now.",
        },
        basarisizSonuc: {
          mesaj: "Bad luck! An inspector walked into the room right then. You were fined for bribery and the permit was cancelled.",
        },
      },
      {
        metin: "I don't pay bribes! Report him to a higher office.",
        basariliSonuc: {
          mesaj: "You reported the official and got him fired! Your business was handled and the honest tradesmen carried you on their shoulders.",
        },
        basarisizSonuc: {
          mesaj: "The person you reported to turned out to be the official's uncle! Your file was buried and you couldn't do business for months.",
        },
      },
    ],
  },

  zincir_tuccar_teslimat: {
    baslik: "The End of the Contract",
    metin:
      "The big supply deal you've kept going for years has finally reached its last delivery stage. Your partner has called you to settle the accounts.",
    secenekler: [
      {
        metin: "Put the Shadow Coin on the table and take over your partner's mind.",
        basariliSonuc: {
          mesaj:
            "When you put the coin on the table your partner's eyes fell into emptiness. He signed over the greater part of the company rights to you with his own hands.",
          detay: "You gained a serious fortune and a permanent income. The man went mad the next day, and you're frightened even of your reflection in the mirror.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Close the deal by overseeing the final delivery yourself.",
        basariliSonuc: {
          mesaj: "The deal was completed successfully; you were repaid many times over for years of effort.",
          detay: "Looking back, you see this deal changed you a great deal. You're one of the best-known merchants in the city now.",
        },
        basarisizSonuc: {
          mesaj: "A dispute arose over the final delivery; the deal closed at a loss.",
          detay: "This relationship you kept up for years ended without the reward you'd hoped for. Still, you gained experience.",
        },
      },
      {
        metin: "Send your deputy, keep your distance yourself.",
        basariliSonuc: {
          mesaj: "Your deputy handled it properly; the deal closed without a hitch.",
          detay: "You weren't there in person but the result was quite satisfying. Sometimes trust is enough.",
        },
        basarisizSonuc: {
          mesaj: "Your deputy made an accounting error at the last moment; the deal earned less than expected.",
          detay: "Maybe you'd have caught it if you'd been there yourself. This long story is closed now.",
        },
      },
    ],
  },

  zincir_din_yolda_sinav: {
    baslik: "A Trial on the Road",
    metin:
      "On the road to your posting, you came upon a group of refugees, hungry and penniless. The little provision you have with you will get either them or you through.",
    secenekler: [
      {
        metin: "Give them the Mysterious Map and show them the site of the old temple.",
        basariliSonuc: {
          mesaj:
            "You gave the refugees the old map and described the way to a hidden provision store. In tears they kissed your hands and set off.",
          detay: "A map saved a family from starving. Your conscience is light as a bird.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Share most of your provisions with them.",
        basariliSonuc: {
          mesaj: "You shared your provisions; with what was left you carried on, though it was hard.",
          detay: "There were days you went hungry, but the gratitude in that family's eyes is still on your mind.",
        },
        basarisizSonuc: {
          mesaj: "The provisions you shared weren't enough; you finished the rest of the road hungry and weak.",
          detay: "Doing a kindness wore you out too, but you're not sorry.",
        },
      },
      {
        metin: "Keep your own provisions, go on your way.",
        basariliSonuc: {
          mesaj: "You kept your provisions and reached your posting in good health.",
          detay: "You remember that family's faces from time to time; you line up justifications for yourself.",
        },
        basarisizSonuc: {
          mesaj: "You kept your provisions but the road wore you down anyway; and your conscience is not at ease.",
          detay: "You had a hard time and that decision stayed with you.",
        },
      },
    ],
  },

  yerlesim_dag_ayi_karsilasmasi: {
    baslik: "The Master of the Mountain",
    metin:
      "Returning to your home on the mountaintop, you came eye to eye with a huge, hungry bear on the narrow path. Neither it moves nor do you. If you're unarmed, you're face to face with death.",
    secenekler: [
      {
        metin: "Draw the Black Sword and advance on the bear!",
        basariliSonuc: {
          mesaj:
            "The moment you drew the sword the bear looked not at you but at the darkness seeping from the blade, and stepped back in fear. But you didn't stop. You laid the beast out with a single blow.",
          detay: "In the village they call you 'Bear-Slayer', but you can't forget how the sword trembled in your hand of its own accord.",
        },
        basarisizSonuc: {
          mesaj:
            "The bear was on you before the sword could loose its darkness. Its claws tore your shoulder and jaw; you never even got the blade up.",
          detay: "Even legendary steel has a speed limit.",
        },
      },
      {
        metin: "Slowly back away, make no noise.",
        basariliSonuc: {
          mesaj: "The bear lost interest and turned back to the forest; you reached your home holding your breath.",
          detay: "The first rule of living on the mountain is patience; you proved it once more today.",
        },
        basarisizSonuc: {
          mesaj: "The bear startled and came at you; you barely saved yourself by throwing yourself behind a rock.",
          detay: "The claw marks on your back took a long time to heal.",
        },
      },
      {
        metin: "Wave the stick in your hand and shout loudly.",
        basariliSonuc: {
          mesaj: "The bear was startled and fled; when you got back to the village you couldn't stop telling your story.",
          detay: "Among the mountain villagers your name was spoken as 'brave' for a while.",
        },
        basarisizSonuc: {
          mesaj: "The bear attacked; you reached the village covered in blood, with deep wounds on your arms and chest.",
          detay: "From that day on, every time you enter the forest you remember that moment.",
        },
      },
    ],
  },

  derinlik_manastir_kedisi: {
    baslik: "The Monastery's Black Cat",
    metin:
      "There's an old black cat that roams the monastery's storehouse. Some monks consider it an ill omen, others bless it for its skill at hunting rats.",
    secenekler: [
      {
        metin: "Take the cat in, keep it in the storehouse.",
        basariliSonuc: {
          mesaj: "You decided to keep the cat in the storehouse; as the rats dwindled the storehouse stayed cleaner.",
          detay: "Sometimes the most ordinary creature can be a silent shield against the greatest dangers.",
        },
        basarisizSonuc: {
          mesaj: "Some monks objected but the cat stayed in the storehouse anyway.",
          detay: "There's a fine balance between tradition and practicality.",
        },
      },
      {
        metin: "Drive the cat off because it brings bad luck.",
        basariliSonuc: {
          mesaj: "The cat was driven off; some monks were relieved.",
          detay: "Superstition sometimes gets ahead of practical benefit.",
        },
        basarisizSonuc: {
          mesaj: "With the cat gone, the rats in the storehouse multiplied fast.",
          detay: "The price of some decisions shows up months later.",
        },
      },
    ],
  },

  derinlik_hazine_haritasi: {
    baslik: "An Old Map",
    metin:
      "At a junk shop you found an old map with burnt edges. It has coded markings and a sketch of an unknown place.",
    secenekler: [
      {
        metin: "Buy the map.",
        basariliSonuc: {
          mesaj: "You bought the map; maybe just a scrap of paper, maybe the key to a real treasure.",
          detay: "A small price for a curious mind.",
        },
        basarisizSonuc: {
          mesaj: "You bought the map but the junk dealer seems to have overcharged you a bit.",
          detay: "Not every haggle ends in your favor.",
        },
      },
      {
        metin: "Not interested, call it an ordinary scrap of paper.",
        basariliSonuc: {
          mesaj: "You ignored the map and went on your way.",
          detay: "Some opportunities may be worth missing — or not, who knows.",
        },
        basarisizSonuc: {
          mesaj: "As you walked you couldn't help thinking about the map again.",
          detay: "Curiosity sometimes won't let go.",
        },
      },
    ],
  },

  derinlik_hazine_kazisi: {
    baslik: "The Place the Map Points To",
    metin:
      "After studying the map a long time, you managed to find the place it points to: an abandoned cave entrance. Is it worth digging?",
    secenekler: [
      {
        metin: "Dig, take the risk.",
        basariliSonuc: {
          mesaj: "Deep in the cave you really did find a treasure chest!",
          detay: "Sometimes a curiosity that seems childish can turn into the biggest gain of your life.",
        },
        basarisizSonuc: {
          mesaj: "The cave collapsed, there was no treasure at all; you barely got out.",
          detay: "The map turned out to be just an old scrap of paper after all.",
        },
      },
      {
        metin: "Don't take the risk, sell the map.",
        basariliSonuc: {
          mesaj: "You sold the map to a curious collector; a small but guaranteed gain.",
          detay: "Sometimes handing your curiosity to someone else is the smartest thing.",
        },
        basarisizSonuc: {
          mesaj: "You sold the map for less than you expected.",
          detay: "Not every haggle ends the way you hoped.",
        },
      },
    ],
  },

  derinlik_kutsal_kalinti: {
    baslik: "A Holy Relic",
    metin:
      "Beneath a ruined chapel you found a small relic said to belong to a saint whose identity is unknown. The common tale is that whoever touches it will return from death once.",
    secenekler: [
      {
        metin: "Carry the relic with you.",
        basariliSonuc: {
          mesaj: "You wrapped the relic in a piece of cloth and took it with you; maybe just a comfort, maybe more.",
          detay: "Believe it or not, you now carry a slight weight around your neck.",
        },
        basarisizSonuc: {
          mesaj: "You took the relic but carrying it made you uneasy; before long you gave it to an acquaintance.",
          detay: "Some responsibilities aren't for everyone.",
        },
      },
      {
        metin: "Don't touch the relic, report it to church authorities.",
        basariliSonuc: {
          mesaj: "You handed the relic to the official authorities; your honesty drew appreciation.",
          detay: "Some treasures are not personal, but a shared inheritance.",
        },
        basarisizSonuc: {
          mesaj: "You reported it but the authorities weren't much interested.",
          detay: "Not every act of honesty gets the attention it deserves.",
        },
      },
    ],
  },

  derinlik_kutsal_kalinti_mucizesi: {
    baslik: "On the Threshold of Death",
    metin:
      "A sudden fever put you in bed; your breath is failing, those around you seem to be saying goodbye in whispers. That old relic at your chest is spreading a strange warmth where it touches your skin.",
    secenekler: [
      {
        metin: "Grip the relic tight, trust the legend.",
        basariliSonuc: {
          mesaj:
            "The relic glowed in your hand and you warmed inside all at once. The fever broke, your breath opened — as if something pulled you back. And the relic turned to dust in your hand; it spent its power on this one-time miracle.",
          detay: "The common tale was true: this relic brings you back from death once.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Don't trust the relic, trust only the physician and fate.",
        basariliSonuc: {
          mesaj: "Your body resisted on its own, the fever slowly fell. The relic is still around your neck, and you never learned its secret.",
        },
        basarisizSonuc: {
          mesaj: "The fever lasted for days, your body took a heavy toll. You didn't touch the relic; maybe you were right, maybe you missed a great chance.",
        },
      },
    ],
  },

  derinlik_kutsal_kalinti_soru: {
    baslik: "Word of the Relic Got Out",
    metin:
      "The rumor about the relic you carry has spread through the neighborhood. A group of would-be pilgrims showed up at your door: 'We heard you have a holy relic, show it to us, let us touch it!'",
    secenekler: [
      {
        metin: "Show the relic, let them touch it.",
        basariliSonuc: {
          mesaj: "The pilgrims touched the relic and prayed one by one. Your name began to be spoken in the region as 'keeper of the holy relic'.",
        },
        basarisizSonuc: {
          mesaj:
            "The crowd got out of control, someone grabbed the relic and tried to run; you got it back with difficulty, and other belongings of yours went missing in the chaos.",
        },
      },
      {
        metin: "Hide the relic, refuse to show it to anyone.",
        basariliSonuc: {
          mesaj: "You shut the door. Some were disappointed but the relic is safe.",
        },
        basarisizSonuc: {
          mesaj: "They started spreading gossip, saying 'So it's not real, or she wouldn't be hiding it.'",
        },
      },
      {
        metin: "Donate the relic to the church/foundation, be rid of the crowd.",
        basariliSonuc: {
          mesaj: "You handed the relic to the official authority; a heavy weight lifted from your shoulders. You're not its keeper now, just a witness.",
        },
        basarisizSonuc: {
          mesaj: "They accepted your donation but didn't even thank you; you're left without the relic and got nothing in return.",
        },
      },
    ],
  },

  derinlik_lanetli_altin: {
    baslik: "A Suspicious Fortune",
    metin:
      "At a caravanserai, a purse of gold whose previous owner is said to have vanished mysteriously is up for sale. It's cheap but strange rumors swirl around it.",
    secenekler: [
      {
        metin: "Buy the gold, never mind the rumors.",
        basariliSonuc: {
          mesaj: "You bought the gold; your pocket swelled but there's a strange unease inside you.",
          detay: "Some gains have a small, invisible price.",
        },
        basarisizSonuc: {
          mesaj: "The seller changed his mind at the last moment and took the purse back.",
          detay: "Some opportunities slip from your hands.",
        },
      },
      {
        metin: "Heed the rumors, stay away.",
        basariliSonuc: {
          mesaj: "You didn't touch the gold and went on your way.",
          detay: "Some opportunities should be weighed together with the risk they carry.",
        },
        basarisizSonuc: {
          mesaj: "Even though you stayed away, you thought about that purse of gold for a long time.",
          detay: "Curiosity sometimes overshadows even the smartest decisions.",
        },
      },
    ],
  },

  derinlik_lanetli_altin_ruyasi: {
    baslik: "The Previous Owner's Dream",
    metin:
      "In your dream a yellowed man with hollow eyes appears every night. 'That gold was mine, it consumed me like this too,' he says, pointing at the spot where the purse sits. You wake in a cold sweat.",
    secenekler: [
      {
        metin: "Go to a priest/cleric and ask them to break the curse.",
        basariliSonuc: {
          mesaj:
            "After a long rite, incense and prayers, that coldness inside you dispersed. The dreams stopped, and the gold is no different from an ordinary purse now.",
          detay: "Some curses can be undone by the right hands.",
        },
        basarisizSonuc: {
          mesaj: "The rite didn't work; the cleric wouldn't even come near the purse. 'This is beyond my power,' he said, and fled.",
        },
      },
      {
        metin: "Give the gold as it is, without ever opening it, to someone.",
        basariliSonuc: {
          mesaj:
            "You held the purse out, unopened, to a beggar; when you saw the joy in his eyes a shudder ran through you. The curse is not yours anymore.",
          detay: "The dreams stopped but your conscience will never forget this decision.",
        },
        basarisizSonuc: {
          mesaj: "No one wanted to accept this 'gift'; everyone seemed to sense the strangeness of the gold.",
        },
      },
      {
        metin: "Ignore the dream, cling tight to the gold.",
        basariliSonuc: {
          mesaj:
            "'No one can take it from me,' you told the ghost in the dream. He smiled and vanished — the next morning you found an unexpected amount more gold in your purse. But the coldness inside you is deeper now.",
          detay: "The shadow of the curse has grown; it takes a little more life each year now.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  derinlik_lanetli_altin_musteri: {
    baslik: "An Eager Buyer",
    metin:
      "At the caravanserai a rich merchant you don't know noticed that old purse of gold in your hands. His eyes lit up: 'I know that purse, it's an old fortune. I'll pay you three times the market price!' He seems not to know the legend.",
    secenekler: [
      {
        metin: "Sell it without telling him about the curse, settle for triple the price.",
        basariliSonuc: {
          mesaj:
            "He counted out the money, took the purse joyfully and left. Your pocket got heavier but you can't help wondering what awaits that man.",
          detay: "Some gains come with a price someone else doesn't know about.",
        },
        basarisizSonuc: {
          mesaj:
            "He counted out the money but the moment he opened the purse he felt the strange coldness inside; 'This won't stay with me,' he said, took the money back and threw the purse at you.",
        },
      },
      {
        metin: "Be honest, tell him about the curse — if he still wants it, sell.",
        basariliSonuc: {
          mesaj: "Surprisingly he smiled: 'I'm fond of things like that myself.' He bought the curse knowingly, though for less money.",
        },
        basarisizSonuc: {
          mesaj: "When you told him his face fell, he said 'You're mad' and walked off. The purse is still in your hands and the buyer is gone.",
        },
      },
      {
        metin: "Don't sell; don't deem anyone worthy of this curse.",
        basariliSonuc: {
          mesaj: "You turned the offer down. The man left baffled but your conscience is at ease.",
        },
        basarisizSonuc: {
          mesaj: "You refused but you couldn't help thinking about that money; some nights regret keeps you awake.",
        },
      },
    ],
  },

  derinlik_gizli_orgut_daveti: {
    baslik: "The Inn's Back Room",
    metin:
      "At an inn, a man concealing his identity invited you to the back room. There, gathered in the shadows, is a group of people — you can't fully see any of their faces.",
    secenekler: [
      {
        metin: "Join the Temple Knights.",
        basariliSonuc: {
          mesaj: "You took the oath; you're now part of a brotherhood that stands in the shadows but is powerful.",
          detay: "In return for brotherhood, discipline and loyalty, it promises protection and power.",
        },
        basarisizSonuc: {
          mesaj: "Your initiation was tense but in the end you were accepted.",
          detay: "Not every beginning is smooth.",
        },
      },
      {
        metin: "Join the Brotherhood in Shadow.",
        basariliSonuc: {
          mesaj: "You took the oath; you now have access to the city's unseen networks.",
          detay: "This brotherhood is built not on power but on information and connections.",
        },
        basarisizSonuc: {
          mesaj: "Your initiation was tense but in the end you were accepted.",
          detay: "Trust is built over time.",
        },
      },
      {
        metin: "Refuse the invitation, leave the room.",
        basariliSonuc: {
          mesaj: "You politely refused the invitation, no one forced you.",
          detay: "Not every mysterious door deserves to be opened.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal created some tension but they let you leave.",
          detay: "Some doors, once closed, don't open again.",
        },
      },
    ],
  },

  derinlik_orgut_gizli_gorev: {
    baslik: "A Mission From the Brotherhood",
    metin:
      "Someone from your organization contacted you at midnight: there's a secret mission, dangerous but well-paid, given only to trusted members.",
    secenekler: [
      {
        metin: "Accept the Temple Knights mission.",
        kilitAciklamasi: "This mission is open only to Temple Knights members.",
        basariliSonuc: {
          mesaj: "You completed the mission successfully; your standing within the brotherhood grew.",
          detay: "Your loyalty was repaid.",
        },
        basarisizSonuc: {
          mesaj: "The mission didn't go as planned, you barely got out.",
          detay: "Secret missions aren't always as simple as they seem.",
        },
      },
      {
        metin: "Accept the Brotherhood in Shadow mission.",
        kilitAciklamasi: "This mission is open only to Brotherhood in Shadow members.",
        basariliSonuc: {
          mesaj: "You completed the mission without a hitch; your network expanded.",
          detay: "Information and connections can be worth more than gold.",
        },
        basarisizSonuc: {
          mesaj: "You were noticed during the mission, a small scandal broke out.",
          detay: "Staying in the shadows isn't always possible.",
        },
      },
      {
        metin: "Refuse the mission, find it too risky.",
        basariliSonuc: {
          mesaj: "You politely refused the mission.",
          detay: "You don't have to accept every opportunity.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal caused a small loss of trust within the organization.",
          detay: "Every no can carry a price.",
        },
      },
    ],
  },

  derinlik_kumarhane_daveti: {
    baslik: "The Dice Table",
    metin:
      "A friend invited you to a secret gambling table. The chance of winning is tempting but places like this are famous for being addictive.",
    secenekler: [
      {
        metin: "Try a hand, taste the thrill.",
        basariliSonuc: {
          mesaj: "You were lucky tonight; your pocket swelled a bit.",
          detay: "The thrill of winning can turn into a dangerous taste.",
        },
        basarisizSonuc: {
          mesaj: "You lost but couldn't get up from the table; you played a few more hands. It'll be hard not to come back to this table now.",
          detay: "Your loss, instead of stopping you, bound you tighter to the table.",
        },
      },
      {
        metin: "Politely refuse, stay away.",
        basariliSonuc: {
          mesaj: "You refused the invitation, your night passed quietly.",
          detay: "Some thrills are worth staying away from.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal disappointed your friend a little.",
          detay: "Every no can create a small distance.",
        },
      },
    ],
  },

  saray_girme_denemesi: {
    baslik: "At the Palace Gate",
    metin:
      "The palace gatekeepers don't let everyone in. But sometimes a purse of gold, sometimes speaking the right name, can crack the door open.",
    secenekler: [
      {
        metin: "Show the Shadow Coin in your palm.",
        basariliSonuc: {
          mesaj:
            "The guards' eyes went dark when they saw the coin. Without a word they opened the heavy doors wide for you.",
          detay: "You slipped into the palace like a ghost, in legendary fashion.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Bribe the gate official.",
        basariliSonuc: {
          mesaj: "Your gold spoke; the door cracked open quietly and they let you in.",
          detay: "You're a face known around the palace now.",
        },
        basarisizSonuc: {
          mesaj: "Your bribe offer angered the official; you were thrown out the gate, broke and disgraced.",
          detay: "Some doors don't open with money.",
        },
      },
      {
        metin: "Assert yourself with your standing and your acquaintances.",
        kilitAciklamasi: "You aren't well enough known; you need to make a name for yourself first",
        basariliSonuc: {
          mesaj: "A palace official who'd heard your name ushered you in.",
          detay: "Your fame opened one more door for you.",
        },
        basarisizSonuc: {
          mesaj: "They said they'd never heard your name; you were humiliated at the gate.",
          detay: "Your fame hasn't spread as far as you thought.",
        },
      },
      {
        metin: "Give up, try another day.",
        basariliSonuc: {
          mesaj: "You gave up trying for today.",
          detay: "The palace isn't going anywhere.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  oc_veba_karsilasma: {
    baslik: "The Neighbor Next Door Is Sick",
    metin:
      "Your next-door neighbor has caught the plague; his family fled him but he'll die alone if no one cares for him. Helping means putting yourself at risk too.",
    secenekler: [
      {
        metin: "Let the Monastery Cat loose in the neighbor's house.",
        basariliSonuc: {
          mesaj:
            "The black cat went into the neighbor's house and hunted all the rats spreading the plague. Your neighbor recovered and stayed grateful to you.",
          detay: "The cat they call an ill omen was actually a life-saver.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Go to him, care for him.",
        basariliSonuc: {
          mesaj: "You cared for your neighbor and helped him recover; the neighborhood will never forget this courage.",
          detay: "Some kindnesses are done at the risk of life and death.",
        },
        basarisizSonuc: {
          mesaj: "While caring for your neighbor you caught the disease too; you lay in fever for days.",
          detay: "Your compassion came at a heavy price.",
        },
      },
      {
        metin: "Stay away, protect yourself.",
        basariliSonuc: {
          mesaj: "You stayed away; your neighbor struggled alone.",
          detay: "Protecting yourself is a survival strategy too.",
        },
        basarisizSonuc: {
          mesaj: "Your neighbor died alone; that scene wouldn't leave your mind for a long time.",
          detay: "Some silences weigh heavily on the conscience.",
        },
      },
    ],
  },

  gizem_koleksiyoncu_ejderha: {
    baslik: "The Collector's Visit",
    metin:
      "At midnight your door was knocked hard: outside stands a man with his face covered by a silver mask. He has sensed the Dragon Talisman around your neck — 'Sell it, and I'll give you gold enough for a lifetime,' he says; his voice smells like rotting earth.",
    secenekler: [
      {
        metin: "Give the talisman and take the gold.",
        basariliSonuc: {
          mesaj:
            "The moment you took the talisman from your neck you placed it in the man's hand. In return he gave you a heavy purse of gold and melted into the mist.",
          detay: "Your pocket filled up nicely but that ancient warmth left your chest. You're ordinary and defenseless now.",
        },
        basarisizSonuc: {
          mesaj:
            "The purse was heavy, but when you opened it in the morning it was full of dry leaves. The masked man and the talisman were both gone — a handful of trash left in your hand.",
          detay: "Some bargains you only understand the next morning.",
        },
      },
      {
        metin: "The talisman is mine! Draw your sword and attack the masked man.",
        basariliSonuc: {
          mesaj:
            "The talisman lent power to your sword! The moment you struck the masked man he dissolved into black smoke and was gone. Only his mask remained.",
          detay: "You defeated a demonic being. Now you truly understand how powerful your talisman is.",
        },
        basarisizSonuc: {
          mesaj:
            "The man just raised his hand and flung you against the wall. As you lost consciousness you felt him tear the talisman from your neck.",
          detay: "You barely survived. The talisman is gone, your body broken.",
        },
      },
    ],
  },

  gizem_kara_kilic_fisilti: {
    baslik: "The Sword's Whisper",
    metin:
      "Even sitting in your belt, the Black Sword seems to whisper things to you: over and over, the name of someone you feel has wronged you. It's tempting to draw the sword and deliver 'justice' with your own hands.",
    secenekler: [
      {
        metin: "Listen to the whisper, settle the score with that person.",
        basariliSonuc: {
          mesaj:
            "The sword moved almost of its own accord in your hand. When it was done you felt neither regret nor relief, just emptiness.",
          detay: "The Black Sword's power is growing, your conscience is shrinking.",
        },
        basarisizSonuc: {
          mesaj: "The reckoning didn't go as you'd hoped; you stopped halfway and pulled back, and wounded at that.",
          detay: "Heeding the sword's whisper cost you dearly.",
        },
      },
      {
        metin: "Lock the sword in a chest, ignore the whisper.",
        basariliSonuc: {
          mesaj: "You locked the sword in a deep chest; you sleep more easily at night now.",
          detay: "Staying away from some powers is a kind of courage too.",
        },
        basarisizSonuc: {
          mesaj: "You locked the sword away but the whisper still hasn't left your ears.",
          detay: "Some voices don't fall silent with a lock.",
        },
      },
    ],
  },

  gizem_sirli_iksir_ikilemi: {
    baslik: "The Last Bottle",
    metin:
      "{dost} has fallen gravely ill, and the physicians are helpless. That mysterious elixir you've kept for years might really be a miracle, or just colored water — but it seems there's nothing left to do but try it.",
    secenekler: [
      {
        metin: "Give the elixir to {dost} to drink.",
        basariliSonuc: {
          mesaj: "The moment the bottle emptied, {dost}'s breathing steadied; when they opened their eyes, the first thing they saw was you.",
          detay: "The mystery you kept for years turned into a miracle right on time.",
        },
        basarisizSonuc: {
          mesaj: "The elixir turned out to be an ordinary syrup; nothing changed, and your last hope ran out too.",
          detay: "Some legends stay only legends.",
        },
      },
      {
        metin: "Keep the elixir, think about selling it to a rich collector.",
        basariliSonuc: {
          mesaj: "You sold the elixir; your coffer filled but you could never say so at {dost}'s bedside.",
          detay: "Some gains are carried like a lifelong guilt.",
        },
        basarisizSonuc: {
          mesaj: "You got rid of the elixir at a low price; you were left with both a guilty conscience and a small gain.",
          detay: "The worst case: you paid the price and got nothing back.",
        },
      },
    ],
  },

  gizem_golge_sikke_kumari: {
    baslik: "Fate's Coin",
    metin:
      "The Shadow Coin sits in your hand with a strange weight; the rumor is that when this coin is tossed in the air, it changes fate itself. In a big wager you could leave your final decision to this coin.",
    secenekler: [
      {
        metin: "Stake the coin in a big wager, force fate.",
        basariliSonuc: {
          mesaj: "The coin spun three times in the air and showed the face you wanted! The people at the table watched in horror.",
          detay: "The Shadow Coin's fame grew along with yours.",
        },
        basarisizSonuc: {
          mesaj: "The coin fell to the ground and showed its other face. You left everything you had on the table.",
          detay: "Fate doesn't always act the way it whispers.",
        },
      },
      {
        metin: "Keep the coin in your pocket, hold it just as a charm.",
        basariliSonuc: {
          mesaj: "You put the coin back in your pocket without using it; its mystery lives on along with your curiosity.",
          detay: "Carrying some powers without spending them is a wisdom too.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  gizem_gizemli_harita_ikinci_yol: {
    baslik: "The Map's Second Path",
    metin:
      "Studying the Mysterious Map again, you noticed there are actually two different markings. One leads to a dangerous, abandoned passage; the other only to the door of a curious collector.",
    secenekler: [
      {
        metin: "Explore the dangerous passage yourself.",
        basariliSonuc: {
          mesaj: "At the end of the passage you found the treasure of a forgotten temple! Your name spread quickly.",
          detay: "Some risks turn into legendary stories.",
        },
        basarisizSonuc: {
          mesaj: "The passage collapsed, you barely got out alive; the map was left buried in the rubble.",
          detay: "Not every map leads you to riches.",
        },
      },
      {
        metin: "Sell the map to the curious collector.",
        basariliSonuc: {
          mesaj: "The collector had been dying to have the map; you got a good price for it.",
          detay: "Sometimes handing your curiosity to someone else is the smartest thing.",
        },
        basarisizSonuc: {
          mesaj: "The collector pushed you hard in the haggling; you earned less than you'd hoped.",
          detay: "Not every haggle ends the way you hoped.",
        },
      },
    ],
  },

  gizem_hazine_haritasi_ortaklik: {
    baslik: "A Partnership Offer",
    metin:
      "An experienced treasure hunter who somehow learned you carry the Treasure Map is offering you a partnership: they dig together, split the gain fifty-fifty. Going alone is more profitable but more dangerous.",
    secenekler: [
      {
        metin: "Accept the offer, share the risk.",
        basariliSonuc: {
          mesaj: "Thanks to the experienced hunter the dig went safely; you split the treasure.",
          detay: "Half a gain isn't cheap next to a whole trust relationship.",
        },
        basarisizSonuc: {
          mesaj: "Your partner gave up at the last moment, the dig was left unfinished, and the expense came out of your pocket.",
          detay: "Not every partnership goes the way you hope.",
        },
      },
      {
        metin: "Refuse, go alone.",
        basariliSonuc: {
          mesaj: "You dug alone, and all the treasure was yours! It was worth the risk.",
          detay: "Sometimes not sharing brings the greatest wealth.",
        },
        basarisizSonuc: {
          mesaj: "During the dig you had a hard time alone; you came back empty-handed and wounded.",
          detay: "Courage alone sometimes isn't enough.",
        },
      },
    ],
  },

  gizem_olunun_yuzugu_lanet_soylentisi: {
    baslik: "A Curse Rumor",
    metin:
      "An old woman in the neighborhood pulled back in horror when she saw that ring on your finger: 'The dead man's ring is cursed, whoever keeps it will meet with disaster,' she said. A priest says that for a small fee he can 'cleanse' the ring.",
    secenekler: [
      {
        metin: "Pay the priest, have the ring cleansed.",
        basariliSonuc: {
          mesaj: "The priest 'purified' the ring with a long prayer; somehow you really did feel relieved inside.",
          detay: "Sometimes the price of peace is just a few coins.",
        },
        basarisizSonuc: {
          mesaj: "The priest completed the rite but the unease inside you didn't really pass.",
          detay: "Some fears aren't erased even with money.",
        },
      },
      {
        metin: "Don't listen to superstition, keep wearing the ring.",
        basariliSonuc: {
          mesaj: "You kept wearing the ring, nothing happened; you laughed off the superstition.",
          detay: "Sometimes fear is just fear itself.",
        },
        basarisizSonuc: {
          mesaj: "Because of a string of small misfortunes, you started being called 'cursed' in the neighborhood.",
          detay: "Even if you don't believe it, the rumor finds you.",
        },
      },
    ],
  },

  gizem_hazine_bulundu_vergi_sorunu: {
    baslik: "The Burden on the Back of the Suddenly Rich",
    metin:
      "Word of the treasure you found spread somehow. A tax collector showed up at your door: either pay the 'found fortune tax', or explain in detail before a court where you found the treasure.",
    secenekler: [
      {
        metin: "Quietly pay the tax, close the matter.",
        basariliSonuc: {
          mesaj: "You paid the tax, and the collector left, though frowning.",
          detay: "A price of wealth is the state's cut.",
        },
        basarisizSonuc: {
          mesaj: "You paid the tax but the collector wrote you down in his notebook as a 'suspicious rich man'.",
          detay: "Sometimes even paying leaves you out of favor.",
        },
      },
      {
        metin: "Silence the collector with a small bribe.",
        basariliSonuc: {
          mesaj: "The collector pocketed the money and winked; nothing will show in the records.",
          detay: "Some problems are paid for not with gold but with your morality.",
        },
        basarisizSonuc: {
          mesaj: "Your bribe offer was reported to his superiors; you earned both a punitive tax and a 'corrupt' reputation.",
          detay: "Taking the short way sometimes takes longer.",
        },
      },
    ],
  },
};
