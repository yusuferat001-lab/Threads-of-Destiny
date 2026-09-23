import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagZanaatkarYollari.ts — İngilizce çevirileri (45 olay). */
export const OLAYLAR_ORTACAG_ZANAATKAR_YOLLARI_EN: Record<string, OlayCeviri> = {
  oc_zanaatkar_yol_ilk_siparis: {
    baslik: "The First Order",
    metin:
      "Your master leaves you alone for the first time: the men of a local lord want an order finished within a week — an impossible deadline. How you handle this job will determine what kind of craftsman you become from here on.",
    secenekler: [
      {
        metin: "Follow the guild's rules to the letter — ask for more time, but deliver flawless work.",
        basariliSonuc: {
          mesaj:
            "The lord's men were angry about the delay, but fell silent before the quality of the work; your name grew solid in the guild's eyes.",
          detay: "Patience is sometimes worth more than the costliest material.",
        },
        basarisizSonuc: {
          mesaj: "You followed the rules, but the time still wasn't enough; the order was cancelled, and your pride was wounded.",
          detay: "Honesty isn't always rewarded, but it's still a path worth walking.",
        },
      },
      {
        metin: "Try a new tool or technique — a risky but faster way to finish.",
        basariliSonuc: {
          mesaj:
            "Your experiment worked; you finished the job on time and started being known in the guild as 'strange, but gifted'.",
          detay: "Innovation is first mocked, then imitated.",
        },
        basarisizSonuc: {
          mesaj: "Your experiment held together, but the result was dreadful; you wasted both material and money.",
          detay: "Every experiment has a cost — some teach you, some just burn you.",
        },
      },
      {
        metin: "Use cheap material — lower the quality but keep the deadline.",
        basariliSonuc: {
          mesaj:
            "You delivered the work on time without anyone noticing; your pocket filled, and your conscience gave a small twinge.",
          detay: "The first cheat is easy; the hard part is never doing it again.",
        },
        basarisizSonuc: {
          mesaj:
            "The poor quality was spotted at once; the lord's men demanded their money back, and your name was tarnished in the marketplace.",
          detay: "Cheap work sometimes costs the most in the end.",
        },
      },
      {
        metin: "Turn the work into a piece of art — forget profit, just make your very best.",
        basariliSonuc: {
          mesaj:
            "The piece that emerged was talked about all over the marketplace; you lost money, but your name is now spoken of alongside true artistry.",
          detay: "Some masters never grow rich, but they are never forgotten.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't achieve the piece you'd envisioned; you lost both time and money.",
          detay: "Chasing art has its price.",
        },
      },
    ],
  },

  // ─────────────────────────── GUILD-LOYAL ───────────────────────────
  oc_zanaatkar_lonca_sadik_1: {
    baslik: "Guild Inspection",
    metin:
      "The guild's elder masters came to inspect your workshop unannounced. Every tool, every measure is expected to be up to code.",
    secenekler: [
      {
        metin: "Show your workshop exactly as it is — hide nothing.",
        basariliSonuc: {
          mesaj: "The masters were pleased with your orderliness; your standing in the guild grew.",
          detay: "Transparency is the cheapest advertisement.",
        },
        basarisizSonuc: {
          mesaj: "A small shortcoming was found and let go with a warning, but your pride was stung.",
          detay: "Perfection is rarely real.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_3: {
    baslik: "The Guild's Annual Oath",
    metin: "The time has come again for the guild's yearly oath of loyalty.",
    secenekler: [
      {
        metin: "Attend the oath, keep the tradition alive.",
        basariliSonuc: { mesaj: "The oath bound you to the guild even more.", detay: "Tradition means belonging." },
        basarisizSonuc: {
          mesaj: "You made a small slip during the ceremony; no one made much of it.",
          detay: "Small mishaps are forgotten.",
        },
      },
      {
        metin: "Skip it, get on with your work.",
        basariliSonuc: {
          mesaj: "You kept working; no one questioned your absence too much.",
          detay: "Time is sometimes worth more than money.",
        },
        basarisizSonuc: {
          mesaj: "Your absence was noticed; a few masters frowned.",
          detay: "Drifting from tradition can have a price.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_4: {
    baslik: "Setting the Standard",
    metin: "The guild wants you to prepare a standard by which the work of incoming apprentices will be judged.",
    secenekler: [
      {
        metin: "Prepare a rulebook with meticulous care.",
        basariliSonuc: {
          mesaj: "The standard you prepared was adopted across the whole guild.",
          detay: "Rules are the guarantee of quality.",
        },
        basarisizSonuc: {
          mesaj: "Your rulebook was found too complicated and sent back.",
          detay: "Not every effort succeeds the first time.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_5: {
    baslik: "A Master in Need",
    metin: "An old master, laid low by illness, can't keep up with his work; he's asking the guild for help.",
    secenekler: [
      {
        metin: "Give him your time, help with his work.",
        basariliSonuc: {
          mesaj: "The old master was grateful; you earned a respected name in the guild.",
          detay: "Kindness is the most lasting investment.",
        },
        basarisizSonuc: {
          mesaj: "Your help wasn't enough, but your effort was appreciated.",
          detay: "Intent sometimes matters more than outcome.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_6: {
    baslik: "The Guild's Joint Order",
    metin: "The guild is dividing up a large joint order; you're expected to finish your share on time.",
    secenekler: [
      {
        metin: "Finish your share carefully and on time.",
        basariliSonuc: {
          mesaj: "You delivered your share on time; the joint work was completed without a hitch.",
          detay: "Reliability is your most valuable asset.",
        },
        basarisizSonuc: {
          mesaj: "Your share was late; the other masters were displeased.",
          detay: "In shared work, everyone's part matters.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_7: {
    baslik: "The Guild's Mediation",
    metin: "You've been asked to mediate a dispute between two young craftsmen.",
    secenekler: [
      {
        metin: "Find a fair solution.",
        basariliSonuc: {
          mesaj: "You found a solution that satisfied them both; you began to be called the 'fair master'.",
          detay: "Justice grows trust.",
        },
        basarisizSonuc: {
          mesaj: "Your solution satisfied neither of them; a coolness grew between you.",
          detay: "Not every dispute is easily settled.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_8: {
    baslik: "The Royal Inspection",
    metin: "The king's officials have come to inspect the guild; everything is expected to be up to code.",
    secenekler: [
      {
        metin: "Present your records and your work in full.",
        basariliSonuc: {
          mesaj: "The inspection passed without trouble; your name was entered into the royal records as an orderly master.",
          detay: "Order is the foundation of trust.",
        },
        basarisizSonuc: {
          mesaj: "A small shortcoming was found, and a fine was levied.",
          detay: "Bureaucracy can be merciless at times.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_9: {
    baslik: "The Council of Young Masters",
    metin: "The guild has invited you to join a council made up of its experienced masters.",
    secenekler: [
      {
        metin: "Accept the invitation, take on the responsibility.",
        basariliSonuc: {
          mesaj: "Your voice began to be heard in the council; your standing in the guild grew.",
          detay: "Responsibility brings respect with it.",
        },
        basarisizSonuc: {
          mesaj: "The council's debates were exhausting; you couldn't contribute much.",
          detay: "Not every meeting is productive.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_10: {
    baslik: "A Difficult Guarantee",
    metin:
      "A young apprentice is about to be thrown out of the guild for failing to pay his debt; they're asking you to stand as his guarantor.",
    secenekler: [
      {
        metin: "Stand as guarantor, take on the risk.",
        basariliSonuc: {
          mesaj: "The apprentice paid off his debt in time; he remained grateful to you.",
          detay: "Trust sometimes requires risk.",
        },
        basarisizSonuc: {
          mesaj: "The apprentice couldn't repay the debt; the guarantee money came out of your pocket.",
          detay: "Not every kindness is returned.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_11: {
    baslik: "A Lifetime's Honor",
    metin: "The guild wants to honor the loyalty and quality you've upheld for years.",
    secenekler: [
      {
        metin: "Accept the ceremony.",
        basariliSonuc: {
          mesaj: "The guild declared you a 'model master'; your name will be remembered for generations.",
          detay: "The reward for loyalty sometimes comes only after a lifetime.",
        },
        basarisizSonuc: {
          mesaj: "A small mishap occurred during the ceremony, but it didn't dim your honor.",
          detay: "Small hiccups don't overshadow great honor.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_2: {
    baslik: "Apprentice Training",
    metin: "The guild is giving you a young apprentice; raising him properly matters for both your future and the guild's.",
    secenekler: [
      {
        metin: "Train him patiently, by the book.",
        basariliSonuc: {
          mesaj: "The apprentice progressed quickly; word spread in the guild that you're a fine master.",
          detay: "Everything you teach returns to you someday.",
        },
        basarisizSonuc: {
          mesaj: "The apprentice turned out untalented; your patience felt wasted.",
          detay: "Not every seed sprouts.",
        },
      },
    ],
  },

  // ─────────────────────────── INNOVATOR ───────────────────────────
  oc_zanaatkar_yenilikci_1: {
    baslik: "A New Tool",
    metin:
      "You've had an idea for a tool in mind for a long time; building it is costly and requires a method the guild hasn't approved.",
    secenekler: [
      {
        metin: "Take the risk, build the tool.",
        basariliSonuc: {
          mesaj: "The tool worked! Your output sped up, and a few customers heard about it and came to your door.",
          detay: "Courage is sometimes the finest material.",
        },
        basarisizSonuc: {
          mesaj: "The tool burst apart; both your material and your hopes went to waste.",
          detay: "Every innovation begins with a failure.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_2: {
    baslik: "A Dispute with the Guild",
    metin:
      "The guild's masters warned you, calling your new methods 'against tradition'; you'll either give up or go your own way alone.",
    secenekler: [
      {
        metin: "Insist on your method.",
        basariliSonuc: {
          mesaj: "You insisted despite the masters; a few young craftsmen started to look to you as an example.",
          detay: "Pioneers are shunned first, then followed.",
        },
        basarisizSonuc: {
          mesaj: "The guild shut you out for a while; your business declined.",
          detay: "Pushing against tradition has its price.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_3: {
    baslik: "Testing a Mold",
    metin: "You're trying using a mold instead of shaping the same piece by hand each time; the result is uncertain.",
    secenekler: [
      {
        metin: "Try the mold.",
        basariliSonuc: {
          mesaj: "The mold worked; you turned out twice the goods in the same time.",
          detay: "Repeatability is a craft's hidden strength.",
        },
        basarisizSonuc: {
          mesaj: "The mold turned out flawed; a few batches of goods went to waste.",
          detay: "Every trial carries a cost.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_4: {
    baslik: "A Traveling Stranger",
    metin: "A traveler from distant lands offers to teach you a technique you've never seen.",
    secenekler: [
      {
        metin: "Learn the technique.",
        basariliSonuc: {
          mesaj: "The new technique broadened your horizons; your work took on a different air.",
          detay: "Knowledge can come from even the farthest road.",
        },
        basarisizSonuc: {
          mesaj: "You never fully grasped the technique; the money was wasted.",
          detay: "Not every learning comes easy.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_5: {
    baslik: "Young Craftsmen Are Imitating You",
    metin: "Young craftsmen in the city have started copying your methods.",
    secenekler: [
      {
        metin: "Share your methods, found a school.",
        basariliSonuc: {
          mesaj: "The small school you founded carried your name beyond the city.",
          detay: "Teaching is the most lasting form of legacy.",
        },
        basarisizSonuc: {
          mesaj: "The students turned out uninterested; your time was wasted.",
          detay: "Not every idea finds its audience.",
        },
      },
      {
        metin: "Guard your methods jealously.",
        basariliSonuc: {
          mesaj: "You kept your competitive edge, but were thought selfish for it.",
          detay: "Hoarding knowledge has its price.",
        },
        basarisizSonuc: {
          mesaj: "Your methods leaked out anyway; your efforts came to nothing.",
          detay: "Secrets aren't always kept.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_6: {
    baslik: "A Failed Prototype",
    metin: "A prototype you've worked on for months didn't give you the result you expected.",
    secenekler: [
      {
        metin: "Learn from the mistakes, try again.",
        basariliSonuc: {
          mesaj: "The second attempt succeeded; your patience paid off.",
          detay: "Failure is a part of learning.",
        },
        basarisizSonuc: {
          mesaj: "The second attempt didn't work out either; your spirits sank.",
          detay: "Some paths can dead-end twice.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_7: {
    baslik: "A Noble's Interest",
    metin: "A noble who's heard of your innovations wants to visit your workshop.",
    secenekler: [
      {
        metin: "Show your workshop at its very best.",
        basariliSonuc: {
          mesaj: "The noble was impressed and took you under his patronage.",
          detay: "The right eye can find you at the right moment.",
        },
        basarisizSonuc: {
          mesaj: "The noble stayed indifferent; the visit came to nothing.",
          detay: "Not every opportunity bears fruit.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_8: {
    baslik: "A Dangerous Experiment",
    metin: "You want to try a new mixture or technique, but the risk is quite high.",
    secenekler: [
      {
        metin: "Take the risk.",
        basariliSonuc: {
          mesaj: "The experiment succeeded; you made a great leap forward.",
          detay: "A great reward demands a great risk.",
        },
        basarisizSonuc: {
          mesaj: "The experiment went wrong; you were injured and lost material.",
          detay: "Pushing boundaries sometimes hurts.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_9: {
    baslik: "The Innovator's Legacy",
    metin: "Years of accumulated work have brought you to the point where your own style could be called a 'school'.",
    secenekler: [
      {
        metin: "Formalize your legacy.",
        basariliSonuc: {
          mesaj: "Your style is now spoken of with your own name; young craftsmen look to you as an example.",
          detay: "To pioneer is to leave a lasting mark.",
        },
        basarisizSonuc: {
          mesaj: "Your endeavor didn't receive the attention you'd hoped for.",
          detay: "Not every legacy is recognized right away.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_10: {
    baslik: "The Wind-Power Experiment",
    metin: "Instead of turning your workshop's wheel by hand, you're trying to make the wind turn it.",
    secenekler: [
      {
        metin: "Build the mechanism.",
        basariliSonuc: {
          mesaj: "The wind mechanism worked; now you tire less and produce more.",
          detay: "Harnessing nature's power is the cleverest innovation of all.",
        },
        basarisizSonuc: {
          mesaj: "The mechanism fell apart in the first gust of wind.",
          detay: "Nature can't always be controlled.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_11: {
    baslik: "The Guild's Final Verdict",
    metin: "The guild will either formally recognize your methods, or reject them outright.",
    secenekler: [
      {
        metin: "Try to convince the guild with the years of evidence you've gathered.",
        basariliSonuc: {
          mesaj:
            "The guild finally formally recognized your methods; your name will be remembered as a pioneer of the age.",
          detay: "Being proven right in time is the sweetest victory of all.",
        },
        basarisizSonuc: {
          mesaj: "The guild rejected them; you were forced to carry on down a lonely road.",
          detay: "Some pioneers stay alone their whole lives.",
        },
      },
    ],
  },

  // ─────────────────────────── CHEAT ───────────────────────────
  oc_zanaatkar_hileci_1: {
    baslik: "A Shoddy Batch",
    metin: "On a large order in hand, you have the chance to secretly use cheaper, poorer-quality material.",
    secenekler: [
      {
        metin: "Swap the material, pocket the difference.",
        basariliSonuc: {
          mesaj: "No one noticed; your profit rose considerably.",
          detay: "A quiet cheat is the most dangerous habit.",
        },
        basarisizSonuc: {
          mesaj: "The customer noticed the material; you were threatened with a lawsuit.",
          detay: "A cheat comes to light sooner or later.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_2: {
    baslik: "Smearing a Rival",
    metin: "A chance has arisen to grow your own customer base by disparaging a rival master's work.",
    secenekler: [
      {
        metin: "Spread gossip in the marketplace.",
        basariliSonuc: {
          mesaj: "The gossip worked; a few customers shifted over to you.",
          detay: "Dark paths are sometimes the shortcut.",
        },
        basarisizSonuc: {
          mesaj: "It came out that you were the source of the gossip; your reputation was damaged.",
          detay: "Slander usually finds its way back to its owner.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_3: {
    baslik: "Cheating the Scale",
    metin: "A chance has arisen to weigh material light and sell it at full price.",
    secenekler: [
      {
        metin: "Tip the scale ever so slightly.",
        basariliSonuc: {
          mesaj: "No one noticed; you made a small but steady profit.",
          detay: "Small cheats become a big habit.",
        },
        basarisizSonuc: {
          mesaj: "A customer had your scale checked; the cheat was exposed.",
          detay: "Small cheats sometimes become big scandals.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_4: {
    baslik: "A Forged Signature",
    metin: "There's a chance to forge a famous master's mark and sell an ordinary piece for a fortune.",
    secenekler: [
      {
        metin: "Forge the mark.",
        basariliSonuc: {
          mesaj: "The forged mark worked; you made a sweet profit.",
          detay: "Fraud is sweet in the short term.",
        },
        basarisizSonuc: {
          mesaj: "The real master learned of it and took the matter to the guild.",
          detay: "A great name isn't imitated, it's earned.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_5: {
    baslik: "Bribing Your Way Out of Inspection",
    metin: "The guild inspector is coming to your workshop; a small bribe could make him look past the problems.",
    secenekler: [
      {
        metin: "Bribe the inspector.",
        basariliSonuc: {
          mesaj: "The inspector overlooked the problems; you carried on with your work.",
          detay: "A bribe is only a temporary fix.",
        },
        basarisizSonuc: {
          mesaj: "The inspector refused the bribe and reported the matter to his superiors.",
          detay: "Not every bribe is accepted.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_6: {
    baslik: "Deceiving Your Partner",
    metin: "Your business partner doesn't know the profit is bigger than what you've told him.",
    secenekler: [
      {
        metin: "Hide part of the profit.",
        basariliSonuc: {
          mesaj: "Your partner noticed nothing; you earned extra.",
          detay: "Trust is a capital that can be abused.",
        },
        basarisizSonuc: {
          mesaj: "Your partner noticed the deception; the relationship between you broke completely.",
          detay: "Losing trust weighs heavier than losing money.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_7: {
    baslik: "A Guilty Conscience",
    metin: "The weight of the small cheats you've kept up for years cost you a sleepless night.",
    secenekler: [
      {
        metin: "Do honest work for a while, ease your conscience.",
        basariliSonuc: {
          mesaj: "A short spell of honesty eased your conscience.",
          detay: "Doing right now and then gives the soul some rest.",
        },
        basarisizSonuc: {
          mesaj: "Returning to old habits was hard; your unease continued.",
          detay: "Habits aren't easily given up.",
        },
      },
      {
        metin: "Don't dwell on it, keep earning.",
        basariliSonuc: {
          mesaj: "You ignored your guilty conscience and carried on with your work.",
          detay: "Some learn to silence their conscience.",
        },
        basarisizSonuc: {
          mesaj: "Your sleeplessness continued; your work fell behind a little.",
          detay: "A suppressed conscience surfaces somewhere.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_8: {
    baslik: "A Big Score",
    metin: "A chance has arisen to sell a wealthy merchant a completely fake 'antique' piece.",
    secenekler: [
      {
        metin: "Sell the fake piece.",
        basariliSonuc: {
          mesaj: "The merchant noticed nothing; you pulled off a big score.",
          detay: "Big cheats carry big risk.",
        },
        basarisizSonuc: {
          mesaj: "The merchant showed the piece to an expert; word of your fraud spread across the whole city.",
          detay: "Greed usually sinks you in the end.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_9: {
    baslik: "Threat of Expulsion from the Guild",
    metin: "Suspicion has grown around you; the guild is threatening to expel you.",
    secenekler: [
      {
        metin: "Buy the silence with a large bribe.",
        basariliSonuc: {
          mesaj: "The problem was solved with money; you managed to stay in the guild.",
          detay: "Some problems are only postponed.",
        },
        basarisizSonuc: {
          mesaj: "The bribe didn't work; you were expelled from the guild.",
          detay: "Some losses of reputation can never be undone.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_10: {
    baslik: "Seeking an Accomplice",
    metin: "You're looking for a partner in a bigger fraud scheme, but finding someone trustworthy is hard.",
    secenekler: [
      {
        metin: "Bring the offer to a shady acquaintance.",
        basariliSonuc: {
          mesaj: "The partnership worked; you both profited.",
          detay: "Dark dealings sometimes require a partner.",
        },
        basarisizSonuc: {
          mesaj: "Your partner gave you up, trying to save himself.",
          detay: "Trust is rare in the dark.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_11: {
    baslik: "One Last Reckoning",
    metin:
      "Years of cheating have finally brought you to a point where you'll either be caught, or forgotten entirely.",
    secenekler: [
      {
        metin: "Leave it all behind and make a clean start.",
        basariliSonuc: {
          mesaj: "You left your past behind; you were reborn as a new master.",
          detay: "It's never too late to change.",
        },
        basarisizSonuc: {
          mesaj: "Winning back your old customers' trust proved harder than you'd thought.",
          detay: "Rebuilding a reputation takes time.",
        },
      },
      {
        metin: "Keep going with the old method, take the risk.",
        basariliSonuc: {
          mesaj: "You got away with it once more; your coffer filled, but your peace of mind shrank.",
          detay: "Luck doesn't last forever.",
        },
        basarisizSonuc: {
          mesaj: "You were finally caught; your name will be spoken of in the marketplace as a cheat.",
          detay: "Sooner or later, the reckoning comes.",
        },
      },
    ],
  },

  // ─────────────────────────── ARTISAN ───────────────────────────
  oc_zanaatkar_sanatkar_1: {
    baslik: "A New Piece",
    metin: "You've had an idea for a piece brewing inside you for a long time; making it will take months and bring no profit.",
    secenekler: [
      {
        metin: "Devote your time and money to the piece.",
        basariliSonuc: {
          mesaj: "When the piece was finished, everyone was in awe; your name is now known throughout the city.",
          detay: "Some works aren't made for profit, but for permanence.",
        },
        basarisizSonuc: {
          mesaj:
            "The piece didn't turn out as you'd envisioned; the feeling that months of labor were wasted burned at your heart.",
          detay: "The path of art is paved with disappointments.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_2: {
    baslik: "A Noble Commission",
    metin: "A noble wants a showy but soulless piece to decorate their home — not at all your style.",
    secenekler: [
      {
        metin: "Don't compromise your style — turn down the offer.",
        basariliSonuc: {
          mesaj: "You turned down the offer; another noble found you precisely because of that stance.",
          detay: "Not compromising your identity sometimes opens doors.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered the noble; your name was spoken of poorly in their circle.",
          detay: "Every refusal carries a cost.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_3: {
    baslik: "A Drought of Inspiration",
    metin: "For months you've felt as though the inspiration inside you has dried up; no piece satisfies you.",
    secenekler: [
      {
        metin: "Travel somewhere far, seek inspiration.",
        basariliSonuc: {
          mesaj: "The journey refreshed your mind; you came back full of new ideas.",
          detay: "Sometimes getting away is the nearest solution.",
        },
        basarisizSonuc: {
          mesaj: "The journey didn't bring the inspiration you'd hoped for.",
          detay: "Inspiration doesn't come when invited.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_4: {
    baslik: "A Student",
    metin: "A young admirer wants to learn your art from you.",
    secenekler: [
      {
        metin: "Take him under your wing, teach him.",
        basariliSonuc: {
          mesaj: "Your student's talent grew; you began to be known as the founder of a style.",
          detay: "Teaching makes art immortal.",
        },
        basarisizSonuc: {
          mesaj: "Your student turned out disinterested; your patience was wasted.",
          detay: "Not every seed sprouts in the same soil.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_5: {
    baslik: "Your Imitated Piece",
    metin: "Another master is selling near-identical copies of your work.",
    secenekler: [
      {
        metin: "File a complaint with the guild.",
        basariliSonuc: {
          mesaj: "The guild acknowledged your right; the imitator was warned.",
          detay: "Justice sometimes takes time, but it comes.",
        },
        basarisizSonuc: {
          mesaj: "The guild couldn't find enough evidence; your complaint went nowhere.",
          detay: "Not every wrong can be proven.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_6: {
    baslik: "A Monastery Commission",
    metin: "A monastery wants a special piece from you for a holy object.",
    secenekler: [
      {
        metin: "Pour your soul into the piece.",
        basariliSonuc: {
          mesaj: "Your piece was kept in the monastery like a holy relic; your name reached distant lands.",
          detay: "Work made for faith carries a different meaning.",
        },
        basarisizSonuc: {
          mesaj: "The piece didn't capture the spirit they wanted; the monks were disappointed.",
          detay: "A sacred work is harder than an ordinary one.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_7: {
    baslik: "The Risk of Going Hungry",
    metin: "Your devotion to art is making it hard to earn money; you have an unpaid rent on your workshop.",
    secenekler: [
      {
        metin: "Take on ordinary jobs for a while too.",
        basariliSonuc: {
          mesaj: "The ordinary jobs paid the rent, but the artist within you was quieted a little.",
          detay: "Survival sometimes comes before art.",
        },
        basarisizSonuc: {
          mesaj: "Even the ordinary jobs weren't enough; your debt grew.",
          detay: "Some seasons are hard.",
        },
      },
      {
        metin: "Don't compromise your art, weather the hard days.",
        basariliSonuc: {
          mesaj: "Your persistence paid off; a great admirer stepped in to support you.",
          detay: "Sometimes conviction is worth going hungry for.",
        },
        basarisizSonuc: {
          mesaj: "Your persistence sank you deeper into debt.",
          detay: "Not every stand is rewarded.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_8: {
    baslik: "An Immortal Piece",
    metin: "You're working on a piece that surpasses yourself — one that might keep your memory alive for years.",
    secenekler: [
      {
        metin: "Devote everything you have to this piece.",
        basariliSonuc: {
          mesaj: "When the piece was finished, the whole city flocked to see it; your name became legend.",
          detay: "Some works outlive their maker.",
        },
        basarisizSonuc: {
          mesaj: "The piece was left unfinished; both material and hope ran out.",
          detay: "Great dreams sometimes bring great disappointment.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_9: {
    baslik: "The Master's Legacy",
    metin: "As old age draws near, you're thinking about how to pass your art on to future generations.",
    secenekler: [
      {
        metin: "Leave your finest pieces behind as a collection.",
        basariliSonuc: {
          mesaj: "Your collection will be exhibited for generations; your name has entered the history of art.",
          detay: "A true master keeps teaching even after death.",
        },
        basarisizSonuc: {
          mesaj: "Your collection didn't receive the attention you'd hoped for.",
          detay: "Not every legacy is appreciated right away.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_10: {
    baslik: "A Rival Artist",
    metin: "A famous artist who's come to the city dismisses your style as 'old-fashioned'.",
    secenekler: [
      {
        metin: "Answer with your work, don't get drawn into argument.",
        basariliSonuc: {
          mesaj: "Your work spoke for itself; the people came to love your style even more.",
          detay: "The best answer is sometimes to quietly keep creating.",
        },
        basarisizSonuc: {
          mesaj: "Your rival held the spotlight a while longer.",
          detay: "Not every rivalry is won right away.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_11: {
    baslik: "The Summary of a Lifetime",
    metin: "At the end of years of an artistic journey, the chance to create your greatest work stands before you.",
    secenekler: [
      {
        metin: "Devote all your savings and time to this final piece.",
        basariliSonuc: {
          mesaj:
            "When the piece was finished, everyone stood in awe; your name was written into the history of art in letters of gold.",
          detay: "Some lives are summed up in a single work.",
        },
        basarisizSonuc: {
          mesaj: "Your strength gave out before the piece was finished; the unfinished dream weighed on you.",
          detay: "Not every great dream comes true, but it still carries meaning.",
        },
      },
    ],
  },
};
