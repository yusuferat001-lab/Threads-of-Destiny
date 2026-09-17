import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/buyuluOlaylar.ts — İngilizce çevirileri. */
export const OLAYLAR_BUYULU_EN: Record<string, OlayCeviri> = {
  buyu_koy_medyumu: {
    baslik: "The Village Fortune-Teller",
    metin:
      "In a beaded-curtain hut on the edge of town, you stand at the door of an old woman who reads fortunes. Inside there's the smell of incense and prayers murmured under her breath. 'Do you want to see your fate?' she asks.",
    secenekler: [
      {
        metin: "Open your palm, listen to what she says.",
        basariliSonuc: {
          mesaj:
            "She stared at your lines for a long time, then said 'a loss, soon' and fell silent. You spent days wondering what she meant.",
        },
        basarisizSonuc: {
          mesaj: "Her face darkened, she let go of your hand and said 'not today,' then showed you out. You can't shake the unease.",
        },
      },
      {
        metin: "I don't believe in this stuff — walk past her.",
        basariliSonuc: {
          mesaj: "You shrugged and walked on. Being someone who doesn't yield to superstition is its own kind of peace.",
        },
        basarisizSonuc: {
          mesaj: "You heard her mutter something behind you. Your ears ringing, you hurried away.",
        },
      },
    ],
  },

  buyu_kristal_kure: {
    baslik: "A Shadow in the Crystal Ball",
    metin:
      "In a fairground tent, a seer in a purple robe leans over a crystal ball. 'You carry a burden,' she says, 'I can see it — for a price.'",
    secenekler: [
      {
        metin: "Pay the price, look into the ball.",
        basariliSonuc: {
          mesaj:
            "For a moment you thought you saw your own face in the ball, years from now. What you saw won't leave your mind.",
        },
        basarisizSonuc: {
          mesaj: "The ball clouded over, the seer said 'silent today.' Your money's gone, your hands empty.",
        },
      },
      {
        metin: "It's a swindle — refuse.",
        basariliSonuc: {
          mesaj: "You turned your back. The 'you'll regret this' called after you was just part of the act.",
        },
        basarisizSonuc: {
          mesaj: "Still, that night as you slept you thought about the shadow you thought you saw in the ball.",
        },
      },
    ],
  },

  buyu_cadi_pazarligi: {
    baslik: "The Woman in the Woods",
    metin:
      "A woman the villagers call a 'witch,' living deep in the forest, summons you. 'I can give you what you want,' she says, 'but in return I want a promise.'",
    secenekler: [
      {
        metin: "Ask what she wants and bargain.",
        basariliSonuc: {
          mesaj:
            "You came back with a purse of gold, but every time you remember the promise you made, a worm turns inside you. You can tell no one.",
        },
        basarisizSonuc: {
          mesaj:
            "The woman laughed and pressed her hand to your forehead. Since that day you cannot sleep at night; your body feels cursed too.",
        },
      },
      {
        metin: "Cross yourself and back away.",
        basariliSonuc: {
          mesaj: "You withdrew with a prayer. Back in the village you told everyone 'I didn't fall for the devil,' and they listened.",
        },
        basarisizSonuc: {
          mesaj: "Someone saw you leaving the forest. Now the village whispers 'they spoke with her.'",
        },
      },
    ],
  },

  buyu_muska: {
    baslik: "An Amulet",
    metin:
      "An old peddler holds out a small leather-stitched amulet. 'There's a prayer inside,' he says, 'it wards off the evil eye, it protects the one who carries it.'",
    secenekler: [
      {
        metin: "Take it, hang it around your neck.",
        basariliSonuc: {
          mesaj: "You don't know if it works, but feeling a weight at your neck oddly put you at ease.",
        },
        basarisizSonuc: {
          mesaj: "A few days later the stitching came undone and dry grass fell out. You were had.",
        },
      },
      {
        metin: "'A prayer can't be made of paper' — walk past.",
        basariliSonuc: {
          mesaj: "The peddler was offended, but you're too solid to hang your faith on a scrap of leather.",
        },
        basarisizSonuc: {
          mesaj: "You had a bad dream that night and thought 'I wish I'd bought it.' Nonsense, you know.",
        },
      },
    ],
  },

  buyu_lanet_kaldirma: {
    baslik: "The Curse-Lifting Rite",
    metin:
      "Your sleep is broken, your affairs go wrong. A 'reader' says that in a single night's rite he'll take 'what's on you' away. Candles, salt and long prayers.",
    secenekler: [
      {
        metin: "Join the rite, sit until dawn.",
        basariliSonuc: {
          mesaj:
            "By the time it ended at daybreak you were spent, but it was as if a weight lifted off your shoulder. You slept without waking for the first time.",
        },
        basarisizSonuc: {
          mesaj: "The candles went out, the reader sweated, nothing changed. You're both tired and out of pocket.",
        },
      },
      {
        metin: "Pray on your own, with your own prayer.",
        basariliSonuc: {
          mesaj: "Simplicity seemed to work. You beat your fear without paying anyone.",
        },
        basarisizSonuc: {
          mesaj: "The prayers didn't ease you. Maybe it was never about the prayer.",
        },
      },
    ],
  },

  buyu_ruh_cagirma: {
    baslik: "Around the Table",
    metin:
      "A few people hold hands in a dim room, watching a glass in the middle. 'We're going to call a spirit,' they say, 'come, the circle mustn't be short a person.'",
    secenekler: [
      {
        metin: "Join the circle, keep your eyes on the glass.",
        basariliSonuc: {
          mesaj:
            "The glass slid across the table — was it the wind, a hand, you don't know. The next day you found a small stone you didn't recognize in your pocket.",
        },
        basarisizSonuc: {
          mesaj: "Someone screamed, the candles fell. You all but fled the room; your heart didn't settle for weeks.",
        },
      },
      {
        metin: "'This game is dangerous' — leave.",
        basariliSonuc: {
          mesaj: "You shut the door behind you. You never wanted to know what those inside saw.",
        },
        basarisizSonuc: {
          mesaj: "You left, but that night you flinched at every creak in your room.",
        },
      },
    ],
  },

  buyu_simyaci: {
    baslik: "The Alchemist's Apprentice",
    metin:
      "In a sulfur-reeking cellar, a man whose eyes are ringed with burn scars says he is trying to turn lead into gold. 'I need a partner — put in capital, we split the profit.'",
    secenekler: [
      {
        metin: "Put in some money, see it through.",
        basariliSonuc: {
          mesaj:
            "A miracle or a trick, you don't know — but you're holding real gold. The man vanished the next day.",
        },
        basarisizSonuc: {
          mesaj: "The experiment blew up, your eyebrows singed, the man said 'tomorrow' and was never seen again. Your money went up in smoke.",
        },
      },
      {
        metin: "Laugh and climb the stairs.",
        basariliSonuc: {
          mesaj: "You didn't fall for the alchemy tale. Just getting out of that cellar into fresh air felt good.",
        },
        basarisizSonuc: {
          mesaj: "Years later you thought once more, 'what if he really pulled it off.' Foolish.",
        },
      },
    ],
  },

  buyu_yildiz_fali: {
    baslik: "The Man Who Watches the Stars",
    metin:
      "At midnight, on a hilltop, a man sweeps the sky with a brass instrument. 'Tell me the year you were born,' he says, 'and I'll read what the stars wrote for you.'",
    secenekler: [
      {
        metin: "Tell him your birth year, listen.",
        basariliSonuc: {
          mesaj: "'A long road awaits you,' he said, that was all. It was vague, but somehow it planted a hope in you.",
        },
        basarisizSonuc: {
          mesaj: "'Be careful this year,' he said, and packed up. You spent the rest of the night thinking about it.",
        },
      },
      {
        metin: "Look at his instrument, ask how it works.",
        basariliSonuc: {
          mesaj: "The man explained the astrolabe; not fortune-telling, but astronomy. Learning something new was a pleasure.",
        },
        basarisizSonuc: {
          mesaj: "The man said 'I don't give away my secrets' and put out his lamp. You found your way in the dark by feel.",
        },
      },
    ],
  },

  buyu_ruya_tabircisi: {
    baslik: "The Dream Interpreter",
    metin:
      "You've had the same dream for days. An interpreter says, 'tell me about it — every dream carries a message.'",
    secenekler: [
      {
        metin: "Tell your dream, ask for its meaning.",
        basariliSonuc: {
          mesaj: "'You'll set down a burden,' he said. You don't know what it means, but the dream didn't return that night.",
        },
        basarisizSonuc: {
          mesaj: "'This is no good omen,' he said, and went quiet. Now you fear both your dream and its reading.",
        },
      },
      {
        metin: "A dream is a dream, never mind.",
        basariliSonuc: {
          mesaj: "You didn't dwell on it. A few days later the dream passed on its own.",
        },
        basarisizSonuc: {
          mesaj: "The dream didn't pass. Maybe you should have told someone.",
        },
      },
    ],
  },

  buyu_seytanla_pazarlik: {
    baslik: "At the Crossroads",
    metin:
      "At midnight, where four roads meet, a stranger waits. You can't see his face. 'Anything you want,' he says, 'just write your name in a book.'",
    secenekler: [
      {
        metin: "Write your name in the book.",
        basariliSonuc: {
          mesaj:
            "Your pockets filled, your affairs opened up. But now something tears loose inside you every time you pass a crossroads.",
        },
        basarisizSonuc: {
          mesaj: "Before the pen touched the paper the stranger vanished. Back home you were ill for days.",
        },
      },
      {
        metin: "Say a prayer and run.",
        basariliSonuc: {
          mesaj: "You reached home out of breath. You never took that road at night again, but your conscience is clean.",
        },
        basarisizSonuc: {
          mesaj: "You fell while running, shattered your knee. You didn't dare look behind you.",
        },
      },
    ],
  },

  buyu_kara_kedi: {
    baslik: "The Cat That Crossed Your Path",
    metin:
      "In a narrow street a pitch-black cat stopped right in front of you, fixed its eyes on you and didn't move. People behind you mutter 'bad luck.'",
    secenekler: [
      {
        metin: "Bend down, pet the cat.",
        basariliSonuc: {
          mesaj: "The cat licked your hand, then raised its tail and left. The crowd stared, baffled, and you laughed.",
        },
        basarisizSonuc: {
          mesaj: "The cat scratched your hand and bolted. 'Told you,' they said. Foolish, but your mood soured.",
        },
      },
      {
        metin: "Go around another way.",
        basariliSonuc: {
          mesaj: "You took the long way. You were annoyed at yourself for dodging a cat, but nothing happened.",
        },
        basarisizSonuc: {
          mesaj: "You twisted your ankle on the street you detoured to. Blaming 'the cat' is absurd.",
        },
      },
    ],
  },

  buyu_kahin_kehaneti: {
    baslik: "The Seer in the Square",
    metin:
      "In a crowded square, a half-naked seer shouts your name: 'You! You will rise, but your fall will be hard too!' Everyone is looking at you.",
    secenekler: [
      {
        metin: "Call the seer over, ask what he means.",
        basariliSonuc: {
          mesaj: "He whispered a few words in your ear and vanished. Those words won't leave your head.",
        },
        basarisizSonuc: {
          mesaj: "The seer fled, the crowd laughed. 'He's mad,' they said, but you couldn't laugh.",
        },
      },
      {
        metin: "Signal the guards to take him away.",
        basariliSonuc: {
          mesaj: "They dragged the seer off. You held firm, but what he said still rings in your ears.",
        },
        basarisizSonuc: {
          mesaj: "The seer broke free of the guards and shouted 'see, he's afraid!' You were humiliated.",
        },
      },
    ],
  },

  buyu_sahte_iksir: {
    baslik: "The Healing-Bottle Seller",
    metin:
      "At a stall, colorful bottles are lined up. The seller shouts: 'A cure for every ill! Stops pain, lengthens life, turns your luck!' He presses a bottle into your hand.",
    secenekler: [
      {
        metin: "Buy a bottle, try it.",
        basariliSonuc: {
          mesaj: "It tasted awful, but the next day you felt a little better. Maybe it's because you believed.",
        },
        basarisizSonuc: {
          mesaj: "Whatever you drank turned your stomach. The seller had long since packed up his stall.",
        },
      },
      {
        metin: "'Better not be poison, this' — walk away.",
        basariliSonuc: {
          mesaj: "You didn't fall for the colorful bottles. Sometimes the best medicine is taking nothing at all.",
        },
        basarisizSonuc: {
          mesaj: "The seller shouted 'you'll regret this' after you. It was a stall pitch, that's all.",
        },
      },
    ],
  },

  buyu_golge_adam: {
    baslik: "The Shadow on the Corner",
    metin:
      "For a few nights now a man in a long coat has stood on the same corner. His face is always in the dark. Tonight he took a step toward you.",
    secenekler: [
      {
        metin: "Walk up to him, ask who he is.",
        basariliSonuc: {
          mesaj: "Turns out he was an old traveler who'd lost his way. You laughed together. Most fears are like this.",
        },
        basarisizSonuc: {
          mesaj: "When you got close he was suddenly gone. Wind or footsteps, you couldn't tell. You never took that corner again.",
        },
      },
      {
        metin: "Ignore him, shut yourself in at home.",
        basariliSonuc: {
          mesaj: "You bolted the door. A few nights later the shadow was gone — or you stopped looking.",
        },
        basarisizSonuc: {
          mesaj: "Every time you looked through the gap in the curtain he was there. Your sleep broke.",
        },
      },
    ],
  },

  buyu_ay_tutulmasi: {
    baslik: "The Moon Turned to Blood",
    metin:
      "In the sky the moon slowly turned red. The streets emptied; some pray, some shout 'the end of days.' A group in the square has lit a fire and started a ritual.",
    secenekler: [
      {
        metin: "Join the ritual, beat a drum until dawn.",
        basariliSonuc: {
          mesaj: "When the moon returned, everyone embraced one another. Sharing the fear built an odd closeness.",
        },
        basarisizSonuc: {
          mesaj: "You stayed up until dawn, got cold, fell ill. The moon would have fixed itself anyway.",
        },
      },
      {
        metin: "Draw the curtain, go to sleep.",
        basariliSonuc: {
          mesaj: "When you woke the moon was in its place and the world still turned. Not panicking is a skill too.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't sleep. The red light seeping past the curtain was on you all night.",
        },
      },
    ],
  },

  buyu_spiritualist_salon: {
    baslik: "The Spiritualist Parlor",
    metin:
      "In an elegant house, a madam is holding a 'séance.' Curtains drawn, a bell and a trumpet on the table. 'Someone from the other side wants to speak with you,' she says, turning to you.",
    secenekler: [
      {
        metin: "Sit at the table, listen to the 'message'.",
        basariliSonuc: {
          mesaj:
            "You spotted a string under the table and a pedal at the madam's foot. Still, for a moment what they said shook you.",
        },
        basarisizSonuc: {
          mesaj: "The trumpet hit your face, the candles went out, the madam faked a faint. Your purse got lighter.",
        },
      },
      {
        metin: "Turn on the lights, show everyone the rig.",
        basariliSonuc: {
          mesaj: "You lit the lamp: strings, pedals, all out in the open. The parlor broke up, everyone talked about you.",
        },
        basarisizSonuc: {
          mesaj: "You knocked the lamp over, nobody saw anything, and they threw you out for 'rudeness.'",
        },
      },
    ],
  },
};
