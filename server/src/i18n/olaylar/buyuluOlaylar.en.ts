import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/buyuluOlaylar.ts — İngilizce çevirileri. */
export const OLAYLAR_BUYULU_EN: Record<string, OlayCeviri> = {
  buyu_koy_medyumu: {
    baslik: "The Village Fortune-Teller",
    metin:
      "In a beaded-curtain hut at the edge of town, an old fortune-teller calls you in. 'Want to see your fate?'",
    secenekler: [
      {
        metin: "Open your palm, listen.",
        basariliSonuc: {
          mesaj:
            "'A loss, soon,' she said, and fell silent. You brooded for days.",
        },
        basarisizSonuc: {
          mesaj: "'Not today,' she said, and showed you out. You're uneasy.",
        },
      },
      {
        metin: "I don't believe it — walk past.",
        basariliSonuc: {
          mesaj: "You shrugged and walked on. Not yielding to superstition is peace.",
        },
        basarisizSonuc: {
          mesaj: "She muttered behind you. Ears ringing, you hurried off.",
        },
      },
    ],
  },

  buyu_kristal_kure: {
    baslik: "A Shadow in the Crystal Ball",
    metin:
      "At a fair, a seer in a purple robe leans over her crystal ball. 'You carry a burden. I can see it — for a price.'",
    secenekler: [
      {
        metin: "Pay, look into the ball.",
        basariliSonuc: {
          mesaj:
            "In the ball you thought you saw your face, years on. It haunts you.",
        },
        basarisizSonuc: {
          mesaj: "The ball clouded; 'silent today,' said the seer. Your money's gone.",
        },
      },
      {
        metin: "A swindle — refuse.",
        basariliSonuc: {
          mesaj: "You turned away. 'You'll regret it' was just an act.",
        },
        basarisizSonuc: {
          mesaj: "That night you thought of the shadow you thought you saw.",
        },
      },
    ],
  },

  buyu_cadi_pazarligi: {
    baslik: "The Woman in the Woods",
    metin:
      "A woman the villagers call a 'witch' summons you into the forest. 'I'll give you what you want — for a promise.'",
    secenekler: [
      {
        metin: "Ask her price and bargain.",
        basariliSonuc: {
          mesaj:
            "You returned with gold, but the promise gnaws at you. You can tell no one.",
        },
        basarisizSonuc: {
          mesaj:
            "She laughed and touched your brow. You haven't slept since; your body feels cursed.",
        },
      },
      {
        metin: "Cross yourself and back away.",
        basariliSonuc: {
          mesaj: "You withdrew praying. In the village you said 'I didn't fall for the devil.'",
        },
        basarisizSonuc: {
          mesaj: "Someone saw you leave the forest. The village whispers 'they spoke with her.'",
        },
      },
    ],
  },

  buyu_muska: {
    baslik: "An Amulet",
    metin:
      "An old peddler holds out a small leather amulet. 'There's a prayer inside — it wards off the evil eye.'",
    secenekler: [
      {
        metin: "Take it, wear it.",
        basariliSonuc: {
          mesaj: "Whether it works or not, its weight at your neck calms you.",
        },
        basarisizSonuc: {
          mesaj: "Days later the stitching split and dry grass fell out. You were had.",
        },
      },
      {
        metin: "'A prayer isn't paper' — walk on.",
        basariliSonuc: {
          mesaj: "The peddler sulked, but you won't pin faith on scrap leather.",
        },
        basarisizSonuc: {
          mesaj: "A bad dream that night: 'I wish I'd bought it.' Nonsense, you know.",
        },
      },
    ],
  },

  buyu_lanet_kaldirma: {
    baslik: "The Curse-Lifting Rite",
    metin:
      "Your sleep is broken, your affairs go wrong. A reader promises a one-night rite to lift 'what's on you.'",
    secenekler: [
      {
        metin: "Join the rite, sit till dawn.",
        basariliSonuc: {
          mesaj:
            "At dawn you were spent, but a weight had lifted. You slept through, for once.",
        },
        basarisizSonuc: {
          mesaj: "Candles died, nothing changed. You're tired and poorer.",
        },
      },
      {
        metin: "Pray on your own.",
        basariliSonuc: {
          mesaj: "Simplicity worked. You beat your fear without paying anyone.",
        },
        basarisizSonuc: {
          mesaj: "The prayers didn't ease you. Maybe prayer wasn't the issue.",
        },
      },
    ],
  },

  buyu_ruh_cagirma: {
    baslik: "Around the Table",
    metin:
      "In a dim room a few people hold hands, watching a glass. 'We're calling a spirit — join us, the circle's incomplete.'",
    secenekler: [
      {
        metin: "Join the circle, watch the glass.",
        basariliSonuc: {
          mesaj:
            "The glass slid — wind or hand? Next day you found an unknown stone in your pocket.",
        },
        basarisizSonuc: {
          mesaj: "Someone screamed, candles fell. You fled; your heart raced for weeks.",
        },
      },
      {
        metin: "'Too dangerous' — leave.",
        basariliSonuc: {
          mesaj: "You shut the door. You never learned what they saw.",
        },
        basarisizSonuc: {
          mesaj: "You left, but flinched at every creak that night.",
        },
      },
    ],
  },

  buyu_simyaci: {
    baslik: "The Alchemist's Apprentice",
    metin:
      "In a sulfurous cellar, a burn-scarred man claims to turn lead into gold. 'Invest, and we split the profit.'",
    secenekler: [
      {
        metin: "Invest a little.",
        basariliSonuc: {
          mesaj:
            "Miracle or trick, you hold real gold. The man vanished next day.",
        },
        basarisizSonuc: {
          mesaj: "The experiment blew up, brows singed; he never reappeared. Your money's smoke.",
        },
      },
      {
        metin: "Laugh and climb the stairs.",
        basariliSonuc: {
          mesaj: "You skipped the alchemy tale. Fresh air alone felt good.",
        },
        basarisizSonuc: {
          mesaj: "Years later you wondered, 'what if he'd done it?' Foolish.",
        },
      },
    ],
  },

  buyu_yildiz_fali: {
    baslik: "The Man Who Watches the Stars",
    metin:
      "At midnight a man on a hilltop sweeps the sky with a brass tool. 'Give your birth year; I'll read your stars.'",
    secenekler: [
      {
        metin: "Give your birth year, listen.",
        basariliSonuc: {
          mesaj: "'A long road awaits you,' he said. Vague, but it gave you hope.",
        },
        basarisizSonuc: {
          mesaj: "'Be careful this year,' he said, and packed up. You brooded all night.",
        },
      },
      {
        metin: "Ask how his instrument works.",
        basariliSonuc: {
          mesaj: "He explained the astrolabe — astronomy, not fortune. Learning was a pleasure.",
        },
        basarisizSonuc: {
          mesaj: "'I don't share secrets,' he said, dousing his light. You felt your way home.",
        },
      },
    ],
  },

  buyu_ruya_tabircisi: {
    baslik: "The Dream Interpreter",
    metin:
      "You've had the same dream for days. An interpreter says: 'Tell me — every dream carries news.'",
    secenekler: [
      {
        metin: "Tell the dream, ask its meaning.",
        basariliSonuc: {
          mesaj: "'You'll set down a burden,' he said. Unclear, but the dream didn't return.",
        },
        basarisizSonuc: {
          mesaj: "'No good omen,' he said, and went quiet. Now you fear dream and reading alike.",
        },
      },
      {
        metin: "A dream is a dream, never mind.",
        basariliSonuc: {
          mesaj: "You didn't dwell. In days the dream faded on its own.",
        },
        basarisizSonuc: {
          mesaj: "The dream stayed. Maybe you should have told someone.",
        },
      },
    ],
  },

  buyu_seytanla_pazarlik: {
    baslik: "At the Crossroads",
    metin:
      "At midnight a faceless stranger waits where four roads meet. 'Anything you want — just sign your name in a book.'",
    secenekler: [
      {
        metin: "Write your name in the book.",
        basariliSonuc: {
          mesaj:
            "Your pockets filled, doors opened. But at every crossroads something tears inside.",
        },
        basarisizSonuc: {
          mesaj: "The stranger vanished before the pen touched. Home, you were ill for days.",
        },
      },
      {
        metin: "Pray and run.",
        basariliSonuc: {
          mesaj: "You got home breathless. Never took that road again, but your conscience is clean.",
        },
        basarisizSonuc: {
          mesaj: "You fell running and shattered your knee. You dared not look back.",
        },
      },
    ],
  },

  buyu_kara_kedi: {
    baslik: "The Cat That Crossed Your Path",
    metin:
      "In a narrow street a black cat stops before you, staring. Those behind mutter 'bad luck.'",
    secenekler: [
      {
        metin: "Bend down, pet the cat.",
        basariliSonuc: {
          mesaj: "The cat licked your hand and strolled off. The crowd gaped; you laughed.",
        },
        basarisizSonuc: {
          mesaj: "The cat scratched you and fled. 'Told you,' they said. Silly, but your mood sank.",
        },
      },
      {
        metin: "Go around another way.",
        basariliSonuc: {
          mesaj: "You took the long way. Annoyed at dodging a cat, but nothing happened.",
        },
        basarisizSonuc: {
          mesaj: "You twisted your ankle on the detour. Blaming 'the cat' is absurd.",
        },
      },
    ],
  },

  buyu_kahin_kehaneti: {
    baslik: "The Seer in the Square",
    metin:
      "In a crowded square a half-naked seer shouts your name: 'You will rise, but your fall will be hard!' All eyes are on you.",
    secenekler: [
      {
        metin: "Call the seer, ask what he means.",
        basariliSonuc: {
          mesaj: "He whispered a few words and vanished. They won't leave your head.",
        },
        basarisizSonuc: {
          mesaj: "The seer fled, the crowd laughed. 'Mad,' they said, but you couldn't laugh.",
        },
      },
      {
        metin: "Have the guards take him.",
        basariliSonuc: {
          mesaj: "They dragged him off. You stood firm, but his words ring on.",
        },
        basarisizSonuc: {
          mesaj: "He broke free, shouting 'he's afraid!' You were humiliated.",
        },
      },
    ],
  },

  buyu_sahte_iksir: {
    baslik: "The Healing-Bottle Seller",
    metin:
      "Colorful bottles line a stall. The seller shouts, 'A cure for everything!' and presses one into your hand.",
    secenekler: [
      {
        metin: "Buy a bottle, try it.",
        basariliSonuc: {
          mesaj: "Awful taste, but you felt better next day. Maybe because you believed.",
        },
        basarisizSonuc: {
          mesaj: "The stuff wrecked your stomach. The seller had already packed up.",
        },
      },
      {
        metin: "'Probably poison' — walk off.",
        basariliSonuc: {
          mesaj: "You skipped the bottles. Sometimes the best medicine is buying nothing.",
        },
        basarisizSonuc: {
          mesaj: "The seller shouted 'you'll regret it.' Just a sales pitch.",
        },
      },
    ],
  },

  buyu_golge_adam: {
    baslik: "The Shadow on the Corner",
    metin:
      "For nights a long-coated man has stood on the same corner, face in shadow. Tonight he stepped toward you.",
    secenekler: [
      {
        metin: "Walk up to him, ask who he is.",
        basariliSonuc: {
          mesaj: "Just a lost old traveler. You laughed. Most fears are like this.",
        },
        basarisizSonuc: {
          mesaj: "As you neared, he was gone. You never passed that corner again.",
        },
      },
      {
        metin: "Ignore him, shut yourself in.",
        basariliSonuc: {
          mesaj: "You bolted the door. Nights later the shadow was gone — or you stopped looking.",
        },
        basarisizSonuc: {
          mesaj: "Every glance through the curtain, he was there. Sleep broke.",
        },
      },
    ],
  },

  buyu_ay_tutulmasi: {
    baslik: "The Moon Turned to Blood",
    metin:
      "The moon slowly turned red. Some pray, some cry 'doomsday.' In the square a fire is lit and a ritual begins.",
    secenekler: [
      {
        metin: "Join the ritual, drum till dawn.",
        basariliSonuc: {
          mesaj: "When the moon returned, all embraced. Shared fear built odd closeness.",
        },
        basarisizSonuc: {
          mesaj: "Up till dawn, you got cold and ill. The moon would've cleared anyway.",
        },
      },
      {
        metin: "Draw the curtain, go to sleep.",
        basariliSonuc: {
          mesaj: "By morning the moon was back, the world turning. Not panicking is a skill.",
        },
        basarisizSonuc: {
          mesaj: "No sleep. Red light seeped past the curtain all night.",
        },
      },
    ],
  },

  buyu_spiritualist_salon: {
    baslik: "The Spiritualist Parlor",
    metin:
      "In a fine house a madam holds a 'séance'; a bell and trumpet on the table. 'Someone from beyond wants to speak with you.'",
    secenekler: [
      {
        metin: "Sit, hear the 'message'.",
        basariliSonuc: {
          mesaj:
            "You spotted a string and a pedal. Still, her words shook you for a moment.",
        },
        basarisizSonuc: {
          mesaj: "The trumpet hit your face, candles died, the madam feigned a faint. Purse lighter.",
        },
      },
      {
        metin: "Light the lamps, expose the rig.",
        basariliSonuc: {
          mesaj: "You lit the lamp: strings, pedals exposed. The salon broke up; everyone talked of you.",
        },
        basarisizSonuc: {
          mesaj: "You knocked the lamp over, nobody saw anything; thrown out for 'rudeness.'",
        },
      },
    ],
  },
};
