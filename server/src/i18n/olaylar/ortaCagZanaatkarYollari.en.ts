import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagZanaatkarYollari.ts — İngilizce çevirileri (45 olay). */
export const OLAYLAR_ORTACAG_ZANAATKAR_YOLLARI_EN: Record<string, OlayCeviri> = {
  oc_zanaatkar_yol_ilk_siparis: {
    baslik: "The First Order",
    metin:
      "Your master leaves you alone for the first time: a local lord's men want an impossible one-week order. How you handle it shapes the craftsman you'll become.",
    secenekler: [
      {
        metin: "Follow the rules, ask for time, deliver flawless work.",
        basariliSonuc: {
          mesaj:
            "The lord's men resented the delay but fell silent at the quality; your name grew solid in the guild.",
          detay: "Patience outweighs the costliest material.",
        },
        basarisizSonuc: {
          mesaj: "You followed the rules, but time ran out; the order was cancelled.",
          detay: "Honesty isn't always rewarded, yet it's a path.",
        },
      },
      {
        metin: "Try a new tool, a risky but faster way.",
        basariliSonuc: {
          mesaj:
            "It worked; you finished on time and became 'strange but gifted' in the guild.",
          detay: "Innovation is mocked first, then copied.",
        },
        basarisizSonuc: {
          mesaj: "The experiment held, but the result was dreadful; material and money wasted.",
          detay: "Every experiment costs; some teach, some burn.",
        },
      },
      {
        metin: "Use cheap material, keep the deadline.",
        basariliSonuc: {
          mesaj:
            "Delivered on time unnoticed; your pocket filled, your conscience twinged.",
          detay: "The first cheat is easy; quitting is hard.",
        },
        basarisizSonuc: {
          mesaj:
            "The poor quality was spotted; money refunded, your name tarnished in the market.",
          detay: "Cheap work costs the most in the end.",
        },
      },
      {
        metin: "Make it a work of art, forget profit.",
        basariliSonuc: {
          mesaj:
            "The piece was the talk of the market; money lost, but your name now means artistry.",
          detay: "Some masters never grow rich, never fade.",
        },
        basarisizSonuc: {
          mesaj: "You missed the envisioned piece; time and money lost.",
          detay: "Chasing art has its price.",
        },
      },
    ],
  },

  // ─────────────────────────── GUILD-LOYAL ───────────────────────────
  oc_zanaatkar_lonca_sadik_1: {
    baslik: "Guild Inspection",
    metin:
      "The guild's elder masters inspect your workshop unannounced. Every tool and measure must be up to code.",
    secenekler: [
      {
        metin: "Show your workshop as it is.",
        basariliSonuc: {
          mesaj: "The masters liked your order; your standing rose.",
          detay: "Transparency is the cheapest advertising.",
        },
        basarisizSonuc: {
          mesaj: "A small flaw drew a warning; your pride stung.",
          detay: "Perfection is rare.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_3: {
    baslik: "The Guild's Annual Oath",
    metin: "The guild's yearly oath of loyalty is due again.",
    secenekler: [
      {
        metin: "Take the oath, keep tradition alive.",
        basariliSonuc: { mesaj: "The oath bound you closer to the guild.", detay: "Tradition means belonging." },
        basarisizSonuc: {
          mesaj: "You slipped at the ceremony; no one cared.",
          detay: "Small mishaps are forgotten.",
        },
      },
      {
        metin: "Skip it, get back to work.",
        basariliSonuc: {
          mesaj: "You kept working; no one asked after you.",
          detay: "Time can outweigh money.",
        },
        basarisizSonuc: {
          mesaj: "Your absence was noted; masters frowned.",
          detay: "Drifting from tradition can cost.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_4: {
    baslik: "Setting the Standard",
    metin: "The guild wants you to draft a standard for judging new apprentices' work.",
    secenekler: [
      {
        metin: "Write a rulebook with care.",
        basariliSonuc: {
          mesaj: "Your standard was adopted guild-wide.",
          detay: "Rules guarantee quality.",
        },
        basarisizSonuc: {
          mesaj: "Your rulebook was judged too complex and returned.",
          detay: "Not every effort works first time.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_5: {
    baslik: "A Master in Need",
    metin: "An old master, ill, can't keep up with his work; he asks the guild for help.",
    secenekler: [
      {
        metin: "Spare your time, help with his work.",
        basariliSonuc: {
          mesaj: "The old master was grateful; you earned a respected name.",
          detay: "Kindness is the most lasting investment.",
        },
        basarisizSonuc: {
          mesaj: "Your help fell short, but your effort was valued.",
          detay: "Intent can outweigh outcome.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_6: {
    baslik: "The Guild's Joint Order",
    metin: "The guild splits a large joint order; you must finish your share on time.",
    secenekler: [
      {
        metin: "Finish your share carefully, on time.",
        basariliSonuc: {
          mesaj: "You delivered on time; the joint job went smoothly.",
          detay: "Reliability is your best asset.",
        },
        basarisizSonuc: {
          mesaj: "Your share ran late; the masters were displeased.",
          detay: "In shared work, every part matters.",
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
          mesaj: "You satisfied both; you became known as the 'fair master'.",
          detay: "Justice grows trust.",
        },
        basarisizSonuc: {
          mesaj: "Your solution pleased neither; a chill grew between you.",
          detay: "Not every dispute settles easily.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_8: {
    baslik: "The Royal Inspection",
    metin: "The king's officials came to inspect the guild; everything must be up to code.",
    secenekler: [
      {
        metin: "Present your records and work in full.",
        basariliSonuc: {
          mesaj: "The inspection passed; the royal records list you as an orderly master.",
          detay: "Order is the basis of trust.",
        },
        basarisizSonuc: {
          mesaj: "A small flaw was found; a fine was levied.",
          detay: "Bureaucracy can be merciless.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_9: {
    baslik: "The Council of Young Masters",
    metin: "The guild invited you to join a council of its experienced masters.",
    secenekler: [
      {
        metin: "Accept the invitation, take responsibility.",
        basariliSonuc: {
          mesaj: "Your voice began to be heard; your standing grew.",
          detay: "Responsibility brings respect.",
        },
        basarisizSonuc: {
          mesaj: "The debates were draining; you contributed little.",
          detay: "Not every meeting is productive.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_10: {
    baslik: "A Difficult Guarantee",
    metin:
      "A young apprentice faces expulsion over an unpaid debt; you're asked to stand as guarantor.",
    secenekler: [
      {
        metin: "Stand guarantor, take the risk.",
        basariliSonuc: {
          mesaj: "The apprentice repaid in time and stayed grateful.",
          detay: "Trust sometimes needs risk.",
        },
        basarisizSonuc: {
          mesaj: "He couldn't repay; the guarantee came from your pocket.",
          detay: "Not every kindness returns.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_11: {
    baslik: "A Lifetime's Honor",
    metin: "The guild wants to honor the loyalty and quality you've kept for years.",
    secenekler: [
      {
        metin: "Accept the ceremony.",
        basariliSonuc: {
          mesaj: "The guild named you a 'model master'; your name will outlive you.",
          detay: "Loyalty's reward may come a lifetime later.",
        },
        basarisizSonuc: {
          mesaj: "A small mishap marred the ceremony, not your honor.",
          detay: "Small hiccups don't dim great honor.",
        },
      },
    ],
  },
  oc_zanaatkar_lonca_sadik_2: {
    baslik: "Apprentice Training",
    metin: "The guild gives you a young apprentice; raising him well matters for you and the guild.",
    secenekler: [
      {
        metin: "Train him patiently, by the book.",
        basariliSonuc: {
          mesaj: "He progressed fast; word spread you're a fine master.",
          detay: "What you teach returns to you.",
        },
        basarisizSonuc: {
          mesaj: "He proved untalented; your patience felt wasted.",
          detay: "Not every seed sprouts.",
        },
      },
    ],
  },

  // ─────────────────────────── INNOVATOR ───────────────────────────
  oc_zanaatkar_yenilikci_1: {
    baslik: "A New Tool",
    metin:
      "You've long had a tool idea; building it is costly and needs a method the guild hasn't approved.",
    secenekler: [
      {
        metin: "Take the risk, build the tool.",
        basariliSonuc: {
          mesaj: "The tool worked! Output sped up and customers came knocking.",
          detay: "Courage is sometimes the best material.",
        },
        basarisizSonuc: {
          mesaj: "The tool burst; material and hope were wasted.",
          detay: "Every innovation starts with failure.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_2: {
    baslik: "A Dispute with the Guild",
    metin:
      "The guild's masters warned you that your methods defy tradition; give up, or go on alone.",
    secenekler: [
      {
        metin: "Insist on your method.",
        basariliSonuc: {
          mesaj: "You held firm; a few young craftsmen began to follow you.",
          detay: "Pioneers are shunned, then followed.",
        },
        basarisizSonuc: {
          mesaj: "The guild shut you out a while; business declined.",
          detay: "Defying tradition has a price.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_3: {
    baslik: "Testing a Mold",
    metin: "You're trying a mold instead of shaping each piece by hand; the result is uncertain.",
    secenekler: [
      {
        metin: "Try the mold.",
        basariliSonuc: {
          mesaj: "The mold worked; twice the goods in the same time.",
          detay: "Repeatability is a craft's hidden strength.",
        },
        basarisizSonuc: {
          mesaj: "The mold was flawed; several batches wasted.",
          detay: "Every trial has a cost.",
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
          mesaj: "The technique broadened your horizons; your work took on a new air.",
          detay: "Knowledge comes even from the farthest road.",
        },
        basarisizSonuc: {
          mesaj: "You never grasped it; the money was wasted.",
          detay: "Not all learning is easy.",
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
          mesaj: "Your small school carried your name beyond the city.",
          detay: "Teaching is the most lasting legacy.",
        },
        basarisizSonuc: {
          mesaj: "The students proved uninterested; your time was wasted.",
          detay: "Not every idea finds an audience.",
        },
      },
      {
        metin: "Guard your methods jealously.",
        basariliSonuc: {
          mesaj: "You kept your edge, but were thought selfish.",
          detay: "Hoarding knowledge has a price.",
        },
        basarisizSonuc: {
          mesaj: "Your methods leaked anyway; your effort came to nothing.",
          detay: "Secrets aren't always kept.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_6: {
    baslik: "A Failed Prototype",
    metin: "A prototype you worked on for months didn't deliver.",
    secenekler: [
      {
        metin: "Learn from the mistakes, try again.",
        basariliSonuc: {
          mesaj: "The second attempt succeeded; patience paid off.",
          detay: "Failure is part of learning.",
        },
        basarisizSonuc: {
          mesaj: "The second attempt failed too; your spirits sank.",
          detay: "Some paths dead-end twice.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_7: {
    baslik: "A Noble's Interest",
    metin: "A noble who's heard of your innovations wants to visit your workshop.",
    secenekler: [
      {
        metin: "Show your workshop at its best.",
        basariliSonuc: {
          mesaj: "The noble was impressed and took you under his patronage.",
          detay: "The right eye finds you at the right moment.",
        },
        basarisizSonuc: {
          mesaj: "The noble stayed cold; the visit was wasted.",
          detay: "Not every chance bears fruit.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_8: {
    baslik: "A Dangerous Experiment",
    metin: "You want to try a new mixture or technique, but the risk is high.",
    secenekler: [
      {
        metin: "Take the risk.",
        basariliSonuc: {
          mesaj: "The experiment worked; a great leap forward.",
          detay: "Great reward demands great risk.",
        },
        basarisizSonuc: {
          mesaj: "It went wrong; you were hurt and lost material.",
          detay: "Pushing limits sometimes hurts.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_9: {
    baslik: "The Innovator's Legacy",
    metin: "Years of work have made your style worthy of the name 'school'.",
    secenekler: [
      {
        metin: "Formalize your legacy.",
        basariliSonuc: {
          mesaj: "Your style bears your name; young craftsmen follow you.",
          detay: "To pioneer is to leave a lasting mark.",
        },
        basarisizSonuc: {
          mesaj: "Your endeavor drew less attention than hoped.",
          detay: "Not every legacy is recognized at once.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_10: {
    baslik: "The Wind-Power Experiment",
    metin: "Instead of turning the workshop wheel by hand, you try wind power.",
    secenekler: [
      {
        metin: "Build the mechanism.",
        basariliSonuc: {
          mesaj: "The wind rig worked; you tire less and produce more.",
          detay: "Harnessing nature is the cleverest innovation.",
        },
        basarisizSonuc: {
          mesaj: "The rig fell apart in the first gust.",
          detay: "Nature can't always be controlled.",
        },
      },
    ],
  },
  oc_zanaatkar_yenilikci_11: {
    baslik: "The Guild's Final Verdict",
    metin: "The guild will either formally recognize your methods or reject them outright.",
    secenekler: [
      {
        metin: "Convince the guild with years of evidence.",
        basariliSonuc: {
          mesaj:
            "The guild recognized your methods; you'll be remembered as the age's pioneer.",
          detay: "Being proven right in time is sweetest.",
        },
        basarisizSonuc: {
          mesaj: "The guild rejected you; you walked on alone.",
          detay: "Some pioneers stay alone for life.",
        },
      },
    ],
  },

  // ─────────────────────────── CHEAT ───────────────────────────
  oc_zanaatkar_hileci_1: {
    baslik: "A Shoddy Batch",
    metin: "On a big order, you could secretly use cheaper, poorer material.",
    secenekler: [
      {
        metin: "Swap the material, pocket the difference.",
        basariliSonuc: {
          mesaj: "No one noticed; profit rose considerably.",
          detay: "A quiet cheat is the most dangerous habit.",
        },
        basarisizSonuc: {
          mesaj: "The customer noticed the material; a lawsuit loomed.",
          detay: "Cheats surface sooner or later.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_2: {
    baslik: "Smearing a Rival",
    metin: "A chance arose to win customers by disparaging a rival master's work.",
    secenekler: [
      {
        metin: "Spread gossip in the market.",
        basariliSonuc: {
          mesaj: "The gossip worked; a few customers switched to you.",
          detay: "Dark paths are sometimes shortcuts.",
        },
        basarisizSonuc: {
          mesaj: "You were exposed as the gossip's source; reputation damaged.",
          detay: "Slander usually finds its owner.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_3: {
    baslik: "Cheating the Scale",
    metin: "A chance arose to weigh material light and sell at full price.",
    secenekler: [
      {
        metin: "Tip the scale slightly.",
        basariliSonuc: {
          mesaj: "No one noticed; a small, steady profit.",
          detay: "Small cheats become big habits.",
        },
        basarisizSonuc: {
          mesaj: "A customer had your scale checked; the cheat was exposed.",
          detay: "Small cheats become big scandals.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_4: {
    baslik: "A Forged Signature",
    metin: "You could forge a famous master's mark and sell an ordinary piece dear.",
    secenekler: [
      {
        metin: "Forge the mark.",
        basariliSonuc: {
          mesaj: "The forged mark worked; sweet profit.",
          detay: "Fraud is sweet short-term.",
        },
        basarisizSonuc: {
          mesaj: "The real master found out and took it to the guild.",
          detay: "A great name isn't imitated, it's earned.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_5: {
    baslik: "Bribing Your Way Out of Inspection",
    metin: "The guild inspector is coming; a small bribe could make him look away.",
    secenekler: [
      {
        metin: "Bribe the inspector.",
        basariliSonuc: {
          mesaj: "The inspector overlooked the problems; you carried on.",
          detay: "A bribe is a temporary fix.",
        },
        basarisizSonuc: {
          mesaj: "The inspector refused and reported you to his superiors.",
          detay: "Not every bribe is taken.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_6: {
    baslik: "Deceiving Your Partner",
    metin: "Your partner doesn't know the profit is bigger than you've told him.",
    secenekler: [
      {
        metin: "Hide part of the profit.",
        basariliSonuc: {
          mesaj: "Your partner noticed nothing; you earned extra.",
          detay: "Trust is capital that can be abused.",
        },
        basarisizSonuc: {
          mesaj: "Your partner saw the deception; the bond broke.",
          detay: "Losing trust outweighs losing money.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_7: {
    baslik: "A Guilty Conscience",
    metin: "The weight of years of small cheats cost you a sleepless night.",
    secenekler: [
      {
        metin: "Work honestly a while, ease your conscience.",
        basariliSonuc: {
          mesaj: "A short spell of honesty eased your conscience.",
          detay: "Doing right now and then rests the soul.",
        },
        basarisizSonuc: {
          mesaj: "Old habits were hard to resume; unease lingered.",
          detay: "Habits die hard.",
        },
      },
      {
        metin: "Ignore it, keep earning.",
        basariliSonuc: {
          mesaj: "You ignored your conscience and carried on.",
          detay: "Some learn to silence conscience.",
        },
        basarisizSonuc: {
          mesaj: "Sleeplessness lingered; work slipped a little.",
          detay: "A suppressed conscience resurfaces.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_8: {
    baslik: "A Big Score",
    metin: "You could sell a rich merchant a wholly fake 'antique'.",
    secenekler: [
      {
        metin: "Sell the fake.",
        basariliSonuc: {
          mesaj: "The merchant noticed nothing; a big score.",
          detay: "Big cheats carry big risk.",
        },
        basarisizSonuc: {
          mesaj: "An expert exposed it; word of your fraud spread citywide.",
          detay: "Greed usually sinks you.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_9: {
    baslik: "Threat of Expulsion from the Guild",
    metin: "Suspicion has closed in; the guild threatens to expel you.",
    secenekler: [
      {
        metin: "Buy silence with a big bribe.",
        basariliSonuc: {
          mesaj: "Money solved it; you stayed in the guild.",
          detay: "Some problems are only postponed.",
        },
        basarisizSonuc: {
          mesaj: "The bribe failed; you were expelled.",
          detay: "Some lost reputation can't return.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_10: {
    baslik: "Seeking an Accomplice",
    metin: "You seek a partner for a bigger scam, but a trustworthy one is hard to find.",
    secenekler: [
      {
        metin: "Pitch it to a shady acquaintance.",
        basariliSonuc: {
          mesaj: "The partnership worked; you both profited.",
          detay: "Dark dealings need a partner.",
        },
        basarisizSonuc: {
          mesaj: "Your partner gave you up to save himself.",
          detay: "Trust is rare in the dark.",
        },
      },
    ],
  },
  oc_zanaatkar_hileci_11: {
    baslik: "One Last Reckoning",
    metin:
      "After years of cheating, you'll either be caught or forgotten.",
    secenekler: [
      {
        metin: "Leave it all behind, start clean.",
        basariliSonuc: {
          mesaj: "You left your past; you were reborn a new master.",
          detay: "It's never too late to change.",
        },
        basarisizSonuc: {
          mesaj: "Winning back old customers' trust proved harder than thought.",
          detay: "Rebuilding a name takes time.",
        },
      },
      {
        metin: "Keep the old ways, take the risk.",
        basariliSonuc: {
          mesaj: "You got away once more; coffers full, peace thinner.",
          detay: "Luck doesn't last forever.",
        },
        basarisizSonuc: {
          mesaj: "You were finally caught; the market will call you a cheat.",
          detay: "Sooner or later, the reckoning.",
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
    metin: "A noble wants a showy, soulless piece to decorate his home — not your style.",
    secenekler: [
      {
        metin: "Keep your style, decline.",
        basariliSonuc: {
          mesaj: "You declined; another noble found you because of that stance.",
          detay: "Staying true opens doors.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered the noble; your name suffered in his circle.",
          detay: "Every refusal has a cost.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_3: {
    baslik: "A Drought of Inspiration",
    metin: "For months your inspiration has felt dry; no piece satisfies you.",
    secenekler: [
      {
        metin: "Travel far, seek inspiration.",
        basariliSonuc: {
          mesaj: "The trip refreshed you; you returned full of ideas.",
          detay: "Getting away is the nearest cure.",
        },
        basarisizSonuc: {
          mesaj: "The trip brought no inspiration.",
          detay: "Inspiration won't be summoned.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_4: {
    baslik: "A Student",
    metin: "A young admirer wants to learn your art from you.",
    secenekler: [
      {
        metin: "Take him in, teach him.",
        basariliSonuc: {
          mesaj: "Your student grew; you began to be called a style's founder.",
          detay: "Teaching makes art immortal.",
        },
        basarisizSonuc: {
          mesaj: "Your student proved disinterested; patience wasted.",
          detay: "Not every seed sprouts in the same soil.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_5: {
    baslik: "Your Imitated Piece",
    metin: "Another master sells near-identical copies of your work.",
    secenekler: [
      {
        metin: "Complain to the guild.",
        basariliSonuc: {
          mesaj: "The guild upheld your right; the copycat was warned.",
          detay: "Justice is slow but comes.",
        },
        basarisizSonuc: {
          mesaj: "The guild found no proof; your complaint went nowhere.",
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
        metin: "Pour your soul into it.",
        basariliSonuc: {
          mesaj: "The piece was kept like a holy relic; your name reached distant lands.",
          detay: "Work for faith carries different meaning.",
        },
        basarisizSonuc: {
          mesaj: "It missed the spirit they wanted; the monks were disappointed.",
          detay: "Sacred work is harder than ordinary.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_7: {
    baslik: "The Risk of Going Hungry",
    metin: "Devotion to art makes earning hard; your workshop's rent is unpaid.",
    secenekler: [
      {
        metin: "Take ordinary jobs for a while.",
        basariliSonuc: {
          mesaj: "Ordinary jobs paid the rent, but the artist in you was muted.",
          detay: "Survival sometimes comes before art.",
        },
        basarisizSonuc: {
          mesaj: "Even those weren't enough; your debt grew.",
          detay: "Some seasons are hard.",
        },
      },
      {
        metin: "Keep your art, weather the hard days.",
        basariliSonuc: {
          mesaj: "Persistence paid off; a great admirer backed you.",
          detay: "Conviction is sometimes worth hunger.",
        },
        basarisizSonuc: {
          mesaj: "Persistence sank you deeper in debt.",
          detay: "Not every stand is rewarded.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_8: {
    baslik: "An Immortal Piece",
    metin: "You're working on a piece beyond yourself — one that may keep your memory alive for years.",
    secenekler: [
      {
        metin: "Devote everything to this piece.",
        basariliSonuc: {
          mesaj: "The whole city flocked to see it; your name became legend.",
          detay: "Some works outlive their maker.",
        },
        basarisizSonuc: {
          mesaj: "The piece stayed unfinished; material and hope ran out.",
          detay: "Great dreams bring great disappointment.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_9: {
    baslik: "The Master's Legacy",
    metin: "As old age nears, you ponder how to pass your art to future generations.",
    secenekler: [
      {
        metin: "Leave your finest works as a collection.",
        basariliSonuc: {
          mesaj: "Your collection will be shown for generations; you entered art history.",
          detay: "A true master teaches after death.",
        },
        basarisizSonuc: {
          mesaj: "Your collection drew less attention than hoped.",
          detay: "Not every legacy is appreciated at once.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_10: {
    baslik: "A Rival Artist",
    metin: "A famous artist in town dismisses your style as 'old-fashioned'.",
    secenekler: [
      {
        metin: "Answer with your work, don't argue.",
        basariliSonuc: {
          mesaj: "Your work spoke; people came to love your style more.",
          detay: "The best answer is quiet creation.",
        },
        basarisizSonuc: {
          mesaj: "Your rival held the spotlight longer.",
          detay: "Not every rivalry is won at once.",
        },
      },
    ],
  },
  oc_zanaatkar_sanatkar_11: {
    baslik: "The Summary of a Lifetime",
    metin: "At the end of a long artistic journey, the chance to create your greatest work lies before you.",
    secenekler: [
      {
        metin: "Devote all your savings and time to this last piece.",
        basariliSonuc: {
          mesaj:
            "Everyone stood in awe; your name was written in art history in gold.",
          detay: "Some lives are summed up in one work.",
        },
        basarisizSonuc: {
          mesaj: "Your strength gave out before it was done; the unfinished dream weighed on you.",
          detay: "Not every great dream comes true, yet it matters.",
        },
      },
    ],
  },
};
