import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagAskerYollari.ts — İngilizce çevirileri (105 olay). */
export const OLAYLAR_ORTACAG_ASKER_YOLLARI_EN: Record<string, OlayCeviri> = {
  oc_asker_yol_ilk_emir: {
    baslik: "The First Order",
    metin:
      "Your corporal orders you to have conscripted village youths whipped for 'insubordination'. Their only crime: being late.",
    secenekler: [
      {
        metin: "Obey without question.",
        basariliSonuc: {
          mesaj: "You obeyed; the corporal is pleased, the youths turned away.",
          detay: "Virtue or flaw? Time will tell.",
        },
        basarisizSonuc: {
          mesaj: "The whip fell too hard; even the corporal was uneasy.",
          detay: "Obedience can go too far.",
        },
      },
      {
        metin: "Object; refuse with the other soldiers.",
        basariliSonuc: {
          mesaj: "The men found courage; the corporal backed down but noted you.",
          detay: "Saying no to injustice strikes a spark.",
        },
        basarisizSonuc: {
          mesaj: "Your objection went unheard; you were beaten too.",
          detay: "Some resistance is never forgotten.",
        },
      },
      {
        metin: "Take the punishment yourself; shield the youths.",
        basariliSonuc: {
          mesaj: "The whip fell on you, the youths were spared; your name spread.",
          detay: "Some lead by stepping forward.",
        },
        basarisizSonuc: {
          mesaj: "Your sacrifice softened no one; all of you were punished.",
          detay: "Courage isn't always rewarded.",
        },
      },
      {
        metin: "Watch in silence; stay unseen.",
        basariliSonuc: {
          mesaj: "You stayed silent and learned who is who in the barracks.",
          detay: "The one who takes no side is most dangerous.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was noticed; they call you 'the unreadable one'.",
          detay: "Neutrality draws suspicion.",
        },
      },
    ],
  },

  oc_asker_yol_sadakat_sinavi: {
    baslik: "A Test of Loyalty",
    metin:
      "Your commander wants you to sign a false report covering a senior officer's corruption. Refuse and lose favor; sign and lose a piece of conscience.",
    secenekler: [
      {
        metin: "Sign; stay loyal to your commander.",
        basariliSonuc: {
          mesaj: "You signed; your commander now trusts you blindly.",
          detay: "Obedience became your identity.",
        },
        basarisizSonuc: {
          mesaj: "The report was investigated and your name surfaced; your commander shielded you.",
          detay: "Loyalty puts you at risk too.",
        },
      },
      {
        metin: "Refuse, but keep quiet.",
        basariliSonuc: {
          mesaj: "You didn't sign or tell; your commander read it as quiet loyalty.",
          detay: "Loyalty isn't blind obedience.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered him; he kept you but stayed cold for long.",
          detay: "You kept your conscience; it cost you.",
        },
      },
    ],
  },

  oc_asker_yol_gizli_toplanti: {
    baslik: "A Secret Meeting",
    metin:
      "At night a trusted soldier calls you behind the stable: men fed up with arbitrary punishment are organizing and want you in.",
    secenekler: [
      {
        metin: "Join; become part of the revolt.",
        basariliSonuc: {
          mesaj: "You swore the oath; you belong to the brotherhood, no way back.",
          detay: "Once begun, revolt carries you on.",
        },
        basarisizSonuc: {
          mesaj: "A sentry nearly caught you; you scattered, now more careful.",
          detay: "The first step is the riskiest.",
        },
      },
      {
        metin: "Report it to your commander.",
        basariliSonuc: {
          mesaj: "The commander rewarded you; but some in the barracks call you 'informer'.",
          detay: "Loyalty has a price.",
        },
        basarisizSonuc: {
          mesaj: "The report was ignored yet leaked; nobody trusts you now.",
          detay: "Honesty sometimes goes unrewarded.",
        },
      },
    ],
  },

  oc_asker_yol_cesaretin_bedeli: {
    baslik: "The Price of Courage",
    metin:
      "In an ambush your commander died and the unit panics. Charge forward and risk it, or seek a calculated way out.",
    secenekler: [
      {
        metin: "Charge the line alone; save the unit.",
        basariliSonuc: {
          mesaj: "You broke their line; the unit was saved, your name becomes legend.",
          detay: "Some moments make a soldier a hero.",
        },
        basarisizSonuc: {
          mesaj: "Your charge failed; captured unconscious, you woke in a prison camp.",
          detay: "Courage sometimes costs freedom.",
        },
      },
      {
        metin: "Withdraw the unit with care.",
        basariliSonuc: {
          mesaj: "Your calm saved the unit; no one died, all owe you.",
          detay: "Calculated courage is courage too.",
        },
        basarisizSonuc: {
          mesaj: "You lost a few men in the retreat, but panic didn't spread.",
          detay: "Even the best decision may fall short.",
        },
      },
    ],
  },

  oc_asker_yol_dusmanla_temas: {
    baslik: "Contact With the Enemy",
    metin:
      "On night watch an enemy agent steps from the shadows, offering lifelong gold and a safe haven for the defense plans.",
    secenekler: [
      {
        metin: "Accept; sell the information.",
        basariliSonuc: {
          mesaj: "You sold it, gold in hand; your conscience will never look at you the same.",
          detay: "Some choices can't be undone.",
        },
        basarisizSonuc: {
          mesaj: "The deal leaked and you were interrogated; paid, but you fear every shadow.",
          detay: "Treason's price keeps on charging.",
        },
      },
      {
        metin: "Refuse; try to catch the man.",
        basariliSonuc: {
          mesaj: "You caught him; your commander rewarded you.",
          detay: "Some tests are passed quietly.",
        },
        basarisizSonuc: {
          mesaj: "He escaped and you were beaten; at least your conscience is clear.",
          detay: "Doing right isn't always easy.",
        },
      },
    ],
  },

  oc_asker_sadik_01: {
    baslik: "The Night Watch",
    metin:
      "You haven't slept in two days, yet you're on the watch roster. Your superior {amir} forbade swapping shifts.",
    secenekler: [
      {
        metin: "Take the watch without question.",
        basariliSonuc: {
          mesaj: "You stayed up till dawn; nobody suspected a thing.",
          detay: "Next day {amir} tapped your shoulder.",
        },
        basarisizSonuc: {
          mesaj: "Near dawn you dozed standing; the patrol found you.",
          detay: "No punishment, but shame outweighs the lash.",
        },
      },
      {
        metin: "Secretly swap the watch with a comrade.",
        basariliSonuc: {
          mesaj: "Nobody noticed; you rested.",
          detay: "You bent the order; next time you may not be lucky.",
        },
        basarisizSonuc: {
          mesaj: "Your superior found out and berated you both in public.",
          detay: "Your word carries less weight now.",
        },
      },
    ],
  },

  oc_asker_sadik_02: {
    baslik: "An Innocent Arrest",
    metin:
      "Your superior orders you to arrest an old carpenter who can't pay his tax. His eyes show despair, not guilt; but orders are orders.",
    secenekler: [
      {
        metin: "Follow the order; hand him over.",
        basariliSonuc: {
          mesaj: "You chained the carpenter and handed him to the garrison.",
          detay: "He praised you; you can't forget the man's face.",
        },
        basarisizSonuc: {
          mesaj: "The man tried to flee and in the chaos you lost him.",
          detay: "Your superior's trust wavered.",
        },
      },
      {
        metin: "Pay the debt from your own pocket.",
        basariliSonuc: {
          mesaj: "You settled the debt; the man went free.",
          detay: "Your superior won't like it, but you slept well.",
        },
        basarisizSonuc: {
          mesaj: "You paid but the creditor refused; they took him anyway.",
          detay: "Your purse emptied and nothing changed.",
        },
      },
      {
        metin: "Obey, but file a report.",
        basariliSonuc: {
          mesaj: "Your report reached higher up; the man's sentence was eased.",
          detay: "You can change things within the rules.",
        },
        basarisizSonuc: {
          mesaj: "Your report was tossed unread; the man served his sentence.",
          detay: "You tried the proper way; the system didn't listen.",
        },
      },
    ],
  },

  oc_asker_sadik_03: {
    baslik: "A Bribe at the Gate",
    metin:
      "At the city gate a merchant slips you a purse of gold to ignore an unregistered load. Nobody saw.",
    secenekler: [
      {
        metin: "Refuse the bribe; report the merchant.",
        basariliSonuc: {
          mesaj: "You had the merchant caught; your superior held you up as an example.",
          detay: "But his men now know your face.",
        },
        basarisizSonuc: {
          mesaj: "The merchant fled, leaving you an empty purse.",
          detay: "Something inside feels lost, like a missed reward.",
        },
      },
      {
        metin: "Take the gold; ignore the load.",
        basariliSonuc: {
          mesaj: "The purse went into your pocket; the load slipped in quietly.",
          detay: "At night you told yourself 'just this once'.",
        },
        basarisizSonuc: {
          mesaj: "Another guard saw you; you answered to your superior.",
          detay: "You had to beg to keep your rank.",
        },
      },
    ],
  },

  oc_asker_sadik_04: {
    baslik: "An Order to an Old Friend",
    metin:
      "Now a swordsman, your first act is sending your childhood friend, still a private, to heavy labor. You saw his disappointment.",
    secenekler: [
      {
        metin: "Don't change the order; no favoritism.",
        basariliSonuc: {
          mesaj: "You gave the order; {dost} accepted in silence.",
          detay: "You were fair, but he no longer smiles at you.",
        },
        basarisizSonuc: {
          mesaj: "{dost} rebelled and accused you of favoritism before everyone.",
          detay: "You paid for doing right alone.",
        },
      },
      {
        metin: "Ease the duty, quietly.",
        basariliSonuc: {
          mesaj: "Nobody noticed; {dost} is grateful.",
          detay: "With the first order you had already crossed the line.",
        },
        basarisizSonuc: {
          mesaj: "The men noticed the unfairness; your superior warned you.",
          detay: "Your rank is new, your standing newer.",
        },
      },
    ],
  },

  oc_asker_sadik_05: {
    baslik: "A Summons on the Wedding Night",
    metin:
      "The wedding is ready when an urgent call comes from the border post. {es} holds back tears; guests wait at the door.",
    secenekler: [
      {
        metin: "Leave the ceremony; rush to duty.",
        basariliSonuc: {
          mesaj: "You reached the post; your superior never forgot your loyalty.",
          detay: "{es} forgave you, but the memory stays incomplete.",
        },
        basarisizSonuc: {
          mesaj: "A storm caught you; you reached the post late.",
          detay: "Intent wasn't enough; only effort counted.",
        },
      },
      {
        metin: "Finish the ceremony; leave at dawn.",
        basariliSonuc: {
          mesaj: "You finished the wedding; {es} never let go of your hand.",
          detay: "You answered for the delay and don't regret it.",
        },
        basarisizSonuc: {
          mesaj: "For arriving late, your superior scolded you before everyone.",
          detay: "Joy lasted a night; the stain much longer.",
        },
      },
    ],
  },

  oc_asker_sadik_06: {
    baslik: "The Shaky-Handed Recruit",
    metin:
      "A new recruit can't even hold a sword right, and everyone mocks him. No one ordered it, but training him is up to you.",
    secenekler: [
      {
        metin: "Train him extra in the evenings.",
        basariliSonuc: {
          mesaj: "The recruit recovered and is grateful.",
          detay: "If he trains someone one day, the effort wasn't wasted.",
        },
        basarisizSonuc: {
          mesaj: "Your effort wasn't enough; he's still clumsy, and some call it wasted time.",
          detay: "You didn't give up anyway.",
        },
      },
      {
        metin: "Leave him to himself.",
        basariliSonuc: {
          mesaj: "The boy hardened and learned on his own.",
          detay: "But he trusts no one now, you included.",
        },
        basarisizSonuc: {
          mesaj: "The recruit was badly hurt in drill; some care might have helped.",
          detay: "His pain left a share on your conscience.",
        },
      },
      {
        metin: "Report it to the official trainer.",
        basariliSonuc: {
          mesaj: "The trainer took over; the boy recovered in time.",
          detay: "You did your duty, but no bond formed.",
        },
        basarisizSonuc: {
          mesaj: "The trainer didn't care; the boy was left alone, and you drifted apart.",
          detay: "Passing off responsibility helps nobody.",
        },
      },
    ],
  },

  oc_asker_sadik_07: {
    baslik: "An Unjust Punishment",
    metin:
      "Your superior punished you publicly for a fault you didn't commit; the real culprit is his favorite. You may object, at a price.",
    secenekler: [
      {
        metin: "Take your punishment quietly.",
        basariliSonuc: {
          mesaj: "You took it without a word; your superior mistook silence for discipline.",
          detay: "You forgot nothing; you just learned to swallow it.",
        },
        basarisizSonuc: {
          mesaj: "Your anger gave you away; your expression was noticed.",
          detay: "You obeyed, but your reluctance was recorded.",
        },
      },
      {
        metin: "Quietly tell your superior's superior.",
        basariliSonuc: {
          mesaj: "The higher officer found the culprit; your name was cleared.",
          detay: "But your superior will never see you the same.",
        },
        basarisizSonuc: {
          mesaj: "The complaint backfired; you became 'the soldier who skipped the chain'.",
          detay: "Being right sometimes isn't enough.",
        },
      },
    ],
  },

  oc_asker_sadik_08: {
    baslik: "The Commander's Instinct",
    metin:
      "{amir} gives an odd order: camp in the swamp though a safe hill is nearby. Trust the order or your own mind?",
    secenekler: [
      {
        metin: "Obey without question.",
        basariliSonuc: {
          mesaj: "The hill was an ambush; {amir}'s instinct saved your lives.",
          detay: "You never forgot what obedience was worth.",
        },
        basarisizSonuc: {
          mesaj: "The swamp brought sickness; the hill held no danger.",
          detay: "Sometimes obedience just shares the bad luck.",
        },
      },
      {
        metin: "Politely voice your doubts.",
        basariliSonuc: {
          mesaj: "{amir} listened and adjusted the plan; you were both right.",
          detay: "Speaking up isn't insubordination.",
        },
        basarisizSonuc: {
          mesaj: "{amir} cut you off, scolded you, and kept the order.",
          detay: "Silence would have been wiser this time.",
        },
      },
    ],
  },

  oc_asker_sadik_09: {
    baslik: "The Burden of the Model Soldier",
    metin:
      "As a swordsman you're held up in every drill. Superiors raise you, yet your comrades in the barracks drift away.",
    secenekler: [
      {
        metin: "Accept the praise quietly.",
        basariliSonuc: {
          mesaj: "Your superiors approved; fewer sit beside you.",
          detay: "Being respected isn't being loved.",
        },
        basarisizSonuc: {
          mesaj: "Envy turned to gossip; some openly shunned you.",
          detay: "Perfection has its price too.",
        },
      },
      {
        metin: "Share your success with comrades.",
        basariliSonuc: {
          mesaj: "Your comrades appreciated you; the chill melted.",
          detay: "You chose to walk together, not rise alone.",
        },
        basarisizSonuc: {
          mesaj: "Your modesty was read as weakness; your standing shook.",
          detay: "Good intent isn't always read right.",
        },
      },
      {
        metin: "Ignore the envy; keep your course.",
        basariliSonuc: {
          mesaj: "You ignored the envy and it faded.",
          detay: "You needn't please everyone.",
        },
        basarisizSonuc: {
          mesaj: "The tension you ignored became a brawl in drill.",
          detay: "Some problems don't pass on their own.",
        },
      },
    ],
  },

  oc_asker_sadik_10: {
    baslik: "A Half-Healed Wound",
    metin:
      "Before your wound healed, the unit is called to campaign again. The healer says rest; your superior won't let go.",
    secenekler: [
      {
        metin: "Join the campaign despite the wound.",
        basariliSonuc: {
          mesaj: "You gritted your teeth and marched; no one saw weakness.",
          detay: "Your superior was proud; you just stayed upright.",
        },
        basarisizSonuc: {
          mesaj: "The wound reopened on campaign; you were carried back on a stretcher.",
          detay: "Your stubbornness cost your body.",
        },
      },
      {
        metin: "Heed the healer; ask for leave.",
        basariliSonuc: {
          mesaj: "Leave granted; you healed fully.",
          detay: "He understood, but disappointment lingered in his eyes.",
        },
        basarisizSonuc: {
          mesaj: "Your leave was called an excuse; your standing shook.",
          detay: "You rested, but earned the name 'lazy'.",
        },
      },
    ],
  },

  oc_asker_sadik_11: {
    baslik: "Suspicion at the Border Post",
    metin:
      "Searching a caravan on the {bolge} border, you spot weapon traces under cloth bales. The driver begs; his family will starve.",
    secenekler: [
      {
        metin: "Search the load by the book.",
        basariliSonuc: {
          mesaj: "You found the weapons, arrested the caravan; your superior rewarded you.",
          detay: "The driver's pleading stayed in your ears.",
        },
        basarisizSonuc: {
          mesaj: "A bale toppled; the weapons were smuggled another way.",
          detay: "You were left with empty suspicion.",
        },
      },
      {
        metin: "Look away; let the caravan pass.",
        basariliSonuc: {
          mesaj: "You let it pass; the driver thanked you in tears.",
          detay: "The lie in the ledger is now part of you.",
        },
        basarisizSonuc: {
          mesaj: "The weapons turned up elsewhere; it was your caravan.",
          detay: "You paid for your conscience with rank.",
        },
      },
      {
        metin: "Follow the rule; aid his family yourself.",
        basariliSonuc: {
          mesaj: "You handed over the arms and secretly left money for the family.",
          detay: "You kept the rule without ignoring your conscience.",
        },
        basarisizSonuc: {
          mesaj: "Your aid was noticed; your superior logged 'needless mercy'.",
          detay: "Good intent went unappreciated this time.",
        },
      },
    ],
  },

  oc_asker_sadik_12: {
    baslik: "The Priest's Request",
    metin:
      "The camp priest asks you to confess before battle and swear a sacred oath that may make you question your superior's orders.",
    secenekler: [
      {
        metin: "Swear; bind your conscience to God.",
        basariliSonuc: {
          mesaj: "You swore, and felt a strange peace.",
          detay: "Now you'll weigh every order twice.",
        },
        basarisizSonuc: {
          mesaj: "The words knotted in your throat; the priest let you go kindly.",
          detay: "You both sensed you weren't ready.",
        },
      },
      {
        metin: "Confess; politely decline the oath.",
        basariliSonuc: {
          mesaj: "You confessed and declined the oath: 'I serve my superior'.",
          detay: "The priest objected, yet respected you.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal offended the priest; the flock spoke coldly of you.",
          detay: "You can't please everyone.",
        },
      },
    ],
  },

  oc_asker_sadik_13: {
    baslik: "The Burden of Command",
    metin:
      "You're a Commander now. Your first order comes from {amir}: you must give a hated duty to men you like. Rank means responsibility.",
    secenekler: [
      {
        metin: "Pass the order on unchanged.",
        basariliSonuc: {
          mesaj: "You gave the order; none objected, but a chill remained.",
          detay: "You learned the cost of command on day one.",
        },
        basarisizSonuc: {
          mesaj: "Your men grumbled; your authority was tested on day one.",
          detay: "New rank, respect not yet earned.",
        },
      },
      {
        metin: "Take the duty yourself; spare your men.",
        basariliSonuc: {
          mesaj: "You did it yourself; your men grew loyal.",
          detay: "But {amir} says commanders keep clean hands.",
        },
        basarisizSonuc: {
          mesaj: "You were hurt, and {amir} called it 'needless heroics'.",
          detay: "Your good intent was taken as naivety.",
        },
      },
    ],
  },

  oc_asker_sadik_14: {
    baslik: "The Prisoner's Eyes",
    metin:
      "{amir} orders a captured young enemy soldier executed without trial. Rules forbid it, but war bends them. The boy won't look away.",
    secenekler: [
      {
        metin: "Carry out the order; show obedience.",
        basariliSonuc: {
          mesaj: "You did it; {amir} nodded without a word.",
          detay: "Those eyes haunted your dreams for years.",
        },
        basarisizSonuc: {
          mesaj: "Your hand shook and the job was botched; {amir} despised you.",
          detay: "You neither obeyed nor saved your conscience.",
        },
      },
      {
        metin: "Stall the order; try to keep him alive.",
        basariliSonuc: {
          mesaj: "You got him onto the exchange list; {amir} raged, but the order was effectively dead.",
          detay: "Life saved; {amir}'s trust is gone.",
        },
        basarisizSonuc: {
          mesaj: "Your scheme surfaced; {amir} shamed you publicly, and the prisoner died anyway.",
          detay: "You neither saved him nor kept your obedient name.",
        },
      },
    ],
  },

  oc_asker_sadik_15: {
    baslik: "An Epidemic in the Barracks",
    metin:
      "A fever spreads in the barracks. Your superior orders suspected sick men sealed in a distant tent; no one will tend them.",
    secenekler: [
      {
        metin: "Enforce the quarantine strictly.",
        basariliSonuc: {
          mesaj: "The quarantine worked; the barracks stayed healthy.",
          detay: "The coughs from the tent still ring in your ears.",
        },
        basarisizSonuc: {
          mesaj: "The quarantine fell short; the disease spread anyway.",
          detay: "Orders done, conscience heavier.",
        },
      },
      {
        metin: "Secretly bring food and blankets.",
        basariliSonuc: {
          mesaj: "Your supplies eased a few lives; no one noticed.",
          detay: "You chose the spirit over the letter.",
        },
        basarisizSonuc: {
          mesaj: "A guard caught you; your superior punished the breach.",
          detay: "Your kindness proved costly.",
        },
      },
    ],
  },

  oc_asker_sadik_16: {
    baslik: "The Young Private's Mistake",
    metin:
      "A young soldier in your detachment slept on watch and let a thief into the fort. The offense is grave, but he's sixteen.",
    secenekler: [
      {
        metin: "Apply the rule; report to superiors.",
        basariliSonuc: {
          mesaj: "You reported; the young soldier got a heavy sentence.",
          detay: "Faithfulness sometimes wears a bitter face.",
        },
        basarisizSonuc: {
          mesaj: "The men found you ruthless; trust shook.",
          detay: "You did right, but you're alone.",
        },
      },
      {
        metin: "Soften the penalty yourself; keep it small.",
        basariliSonuc: {
          mesaj: "You punished him yourself and kept it quiet.",
          detay: "He never erred again, grateful for life.",
        },
        basarisizSonuc: {
          mesaj: "It reached your superiors; you were questioned for hiding it and abusing authority.",
          detay: "Good intent weighed nothing against the rule.",
        },
      },
    ],
  },

  oc_asker_sadik_17: {
    baslik: "The Order to Close the Gate",
    metin:
      "Your besieged fort runs out of food. The order from {amir} is plain: shut the gates to the peasants outside. Families with children wait there.",
    secenekler: [
      {
        metin: "Obey; close the gates.",
        basariliSonuc: {
          mesaj: "You shut the gates; those inside survived.",
          detay: "The cries outside became part of your victory.",
        },
        basarisizSonuc: {
          mesaj: "The crowd forced the gate; some men were hurt and order barely held.",
          detay: "Even obeying exacted a price.",
        },
      },
      {
        metin: "Quietly admit a few children and elders.",
        basariliSonuc: {
          mesaj: "You let a few in by a hidden gate; {amir} raged but couldn't undo it.",
          detay: "You knew the stain and don't regret it.",
        },
        basarisizSonuc: {
          mesaj: "Your act was noticed; {amir} accused you of defying authority.",
          detay: "Conscience clear, command wounded.",
        },
      },
    ],
  },

  oc_asker_sadik_18: {
    baslik: "Aching Shoulders",
    metin:
      "Your armor no longer sits right. Young soldiers call you 'old wolf', with respect and a little pity. Retirement crosses your mind.",
    secenekler: [
      {
        metin: "Serve on with your last strength.",
        basariliSonuc: {
          mesaj: "You served on; the young soldiers kept learning from you.",
          detay: "Your honor holds; your body bills you each morning.",
        },
        basarisizSonuc: {
          mesaj: "You lost your balance in drill and fell before everyone.",
          detay: "You can't hide that age has caught you.",
        },
      },
      {
        metin: "File for retirement; pass on your knowledge.",
        basariliSonuc: {
          mesaj: "Your request was accepted; you stay as a trainer.",
          detay: "You dropped the sword, not your knowledge.",
        },
        basarisizSonuc: {
          mesaj: "Your request was refused as 'too early'; you must stay at the front.",
          detay: "Your body is ready; the system won't let go.",
        },
      },
      {
        metin: "Spar with a young soldier.",
        basariliSonuc: {
          mesaj: "You still beat the youngster; your standing grew.",
          detay: "Next morning it felt like a reminder, not a victory.",
        },
        basarisizSonuc: {
          mesaj: "The youngster beat you; you felt your age before everyone.",
          detay: "Your pride was hurt worse than your body.",
        },
      },
    ],
  },

  oc_asker_sadik_19: {
    baslik: "Your Father's Last Wish",
    metin:
      "Your father lies dying and wants to see you. The same week your unit is called to a major drill; deserters face severe punishment.",
    secenekler: [
      {
        metin: "Request leave; wait for the answer.",
        basariliSonuc: {
          mesaj: "Leave came at the last moment; you reached his final breath.",
          detay: "Following the rules didn't cost you.",
        },
        basarisizSonuc: {
          mesaj: "Leave came late; you lost your father unseen.",
          detay: "Obedience only brought you late.",
        },
      },
      {
        metin: "Go without leave; risk the penalty.",
        basariliSonuc: {
          mesaj: "You held your father's hand, but heavy punishment awaited your return.",
          detay: "Some things are worth more than rank.",
        },
        basarisizSonuc: {
          mesaj: "You made it, but your leaving was reported; your model-soldier name crumbled overnight.",
          detay: "Your heart did right; your record won't forgive.",
        },
      },
    ],
  },

  oc_asker_sadik_20: {
    baslik: "The Legacy of Your Last Watch",
    metin:
      "Your obedient service ends. A young soldier asks, 'Did you ever regret it?' Your answer will shape the name you leave.",
    secenekler: [
      {
        metin: "Be honest: obedience saved and haunted you.",
        basariliSonuc: {
          mesaj: "The recruit listened quietly and called you a 'true soldier'.",
          detay: "Admitting flaws raised your standing.",
        },
        basarisizSonuc: {
          mesaj: "Your words were misread as doubting your own obedience.",
          detay: "Honesty is sometimes misheard.",
        },
      },
      {
        metin: "Say 'Following orders is always right.'",
        basariliSonuc: {
          mesaj: "The recruit memorized your words and vowed to be like you.",
          detay: "You withheld the whole truth; perhaps that was kindest.",
        },
        basarisizSonuc: {
          mesaj: "The recruit sensed the gap in your words and asked more.",
          detay: "Simple answers don't satisfy curious minds.",
        },
      },
    ],
  },

  oc_asker_isyanci_01: {
    baslik: "The Watch Roster",
    metin:
      "The cell gives your first task: copy the guard roster in the command tent. Entry is forbidden; if caught, you're a thief.",
    secenekler: [
      {
        metin: "Distract the guard; sneak into the tent.",
        basariliSonuc: {
          mesaj: "You copied the roster unseen; the cell trusts you more.",
          detay: "You passed the first test quietly.",
        },
        basarisizSonuc: {
          mesaj: "The guard noticed; you barely escaped, and eyes are on you.",
          detay: "The first step is the riskiest.",
        },
      },
      {
        metin: "Refuse; call it too risky.",
        basariliSonuc: {
          mesaj: "You refused; your comrades understood but showed disappointment.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal sparked whispers of 'unreliable'.",
        },
      },
      {
        metin: "Persuade another comrade to take the risk.",
        basariliSonuc: {
          mesaj: "Your comrade succeeded, but you know you put him at risk.",
        },
        basarisizSonuc: {
          mesaj: "Your comrade was caught; he didn't name you, but his look has changed.",
          detay: "Some debts are never paid.",
        },
      },
    ],
  },

  oc_asker_isyanci_02: {
    baslik: "A Newcomer at the Meeting",
    metin:
      "A new soldier shows interest in the meetings; his words fit, his questions too well. Comrades suspect him, no proof; it's your call.",
    secenekler: [
      {
        metin: "Test him with dangerous information.",
        basariliSonuc: {
          mesaj: "The false tip reached the commander; he was an informer, and you warned the cell.",
          detay: "Suspicion is sometimes a weapon.",
        },
        basarisizSonuc: {
          mesaj: "The man was innocent; your suspicion hurt him and trust broke.",
        },
      },
      {
        metin: "Quietly ease him out.",
        basariliSonuc: {
          mesaj: "He drifted away quietly; the danger may be gone.",
        },
        basarisizSonuc: {
          mesaj: "Angry at the snub, he went to the commander; they started asking about you.",
        },
      },
      {
        metin: "Trust him; take him in.",
        basariliSonuc: {
          mesaj: "He was a true ally; the cell grew stronger.",
        },
        basarisizSonuc: {
          mesaj: "He was an agent; two comrades were arrested, and you blame yourself.",
          detay: "Trust can charge the highest price.",
        },
      },
    ],
  },

  oc_asker_isyanci_03: {
    baslik: "The Notch and the Cipher",
    metin:
      "The cell's secret mark, a small notch on the barracks wall, is being noticed. Find a new method or halt meetings.",
    secenekler: [
      {
        metin: "Devise a new signal system.",
        basariliSonuc: {
          mesaj: "The new signals worked; communication is far safer.",
        },
        basarisizSonuc: {
          mesaj: "A sentry grew suspicious during the trial; you barely fended him off.",
        },
      },
      {
        metin: "Halt meetings; propose waiting.",
        basariliSonuc: {
          mesaj: "Nothing happened in the lull, but some comrades grew restless.",
        },
        basarisizSonuc: {
          mesaj: "Some grew careless while waiting; a small slip nearly exposed everything.",
        },
      },
    ],
  },

  oc_asker_isyanci_04: {
    baslik: "The Granary Raid",
    metin:
      "The village near the barracks starves under heavy taxes. The cell plans to smuggle grain from the depot to it; if caught, the charge is rebellion.",
    secenekler: [
      {
        metin: "Carry the grain to the village yourself.",
        basariliSonuc: {
          mesaj: "The grain arrived; the women wept in thanks, and the cell's name was whispered.",
          detay: "The people's love can outweigh a sword.",
        },
        basarisizSonuc: {
          mesaj: "A patrol caught you; you dropped the grain, and the lash burned your back.",
        },
      },
      {
        metin: "Hand the task off; stand lookout.",
        basariliSonuc: {
          mesaj: "Your watch worked and the grain arrived; another took the thanks.",
        },
        basarisizSonuc: {
          mesaj: "You were late on watch and your comrade nearly got caught; he glared at you.",
        },
      },
      {
        metin: "Cancel the plan; call it too risky.",
        basariliSonuc: {
          mesaj: "You stopped it; the village stayed hungry but the cell dodged danger.",
        },
        basarisizSonuc: {
          mesaj: "The cancellation angered some; you heard 'coward' whispers.",
        },
      },
    ],
  },

  oc_asker_isyanci_05: {
    baslik: "A Fork in the Road",
    metin:
      "The cell splits: one side wants to punish commanders now, violently; the other would patiently organize the people. Pick a side.",
    secenekler: [
      {
        metin: "Back swift, violent action.",
        basariliSonuc: {
          mesaj: "Your words emboldened the hardliners; the cell is sharper now.",
        },
        basarisizSonuc: {
          mesaj: "Your harshness scared some comrades; a few left.",
        },
      },
      {
        metin: "Back the patient, organizing path.",
        basariliSonuc: {
          mesaj: "You swayed the majority; the cell chose patient growth over haste.",
        },
        basarisizSonuc: {
          mesaj: "Some mistook patience for cowardice; an invisible line formed between you.",
        },
      },
      {
        metin: "Stay neutral; try to reconcile them.",
        basariliSonuc: {
          mesaj: "Your mediation worked; both sides listened and the cell held together.",
        },
        basarisizSonuc: {
          mesaj: "You offended both sides; no one fully trusts you.",
        },
      },
    ],
  },

  oc_asker_isyanci_06: {
    baslik: "Fallen Into a Sentry's Hands",
    metin:
      "A comrade is arrested by the night patrol. The corridor is narrow, guards few; but a rescue could expose the whole cell.",
    secenekler: [
      {
        metin: "Raid and free him by force.",
        basariliSonuc: {
          mesaj: "The raid worked; you spirited your comrade into the dark.",
          detay: "Some nights show friendship's price.",
        },
        basarisizSonuc: {
          mesaj: "The raid fell apart and two more were caught; the cell was badly hurt.",
        },
      },
      {
        metin: "Stay silent; leave him to fate.",
        basariliSonuc: {
          mesaj: "You did nothing; your comrade was taken for questioning, and the cell survived.",
        },
        basarisizSonuc: {
          mesaj: "Your silence branded you a coward in some eyes.",
        },
      },
      {
        metin: "Bribe the guard.",
        basariliSonuc: {
          mesaj: "The guard took the gold and looked away; your comrade slipped out.",
        },
        basarisizSonuc: {
          mesaj: "The guard took the gold, broke his word, and told his superiors.",
        },
      },
    ],
  },

  oc_asker_isyanci_07: {
    baslik: "The Iron Room",
    metin:
      "Denounced by an informer, you are questioned in a cold stone room. The officer demands the cell's names; every silence has a price.",
    secenekler: [
      {
        metin: "Grit your teeth; name no one.",
        basariliSonuc: {
          mesaj: "You said nothing; they freed you, but you healed for weeks.",
          detay: "Silence was stronger than any word.",
        },
        basarisizSonuc: {
          mesaj: "You blacked out; you recall nothing and woke in a cell.",
          detay: "You'll never know what you said.",
        },
      },
      {
        metin: "Give a minor name; protect the cell.",
        basariliSonuc: {
          mesaj: "The false name worked; the interrogators were satisfied and the cell stayed safe.",
          detay: "You'll always remember whose name you sacrificed.",
        },
        basarisizSonuc: {
          mesaj: "The name belonged to a real comrade; he was arrested because of you.",
        },
      },
      {
        metin: "Try to escape during a lull.",
        basariliSonuc: {
          mesaj: "You exploited a guard's lapse and melted into the dark.",
        },
        basarisizSonuc: {
          mesaj: "Your escape was spotted at once; the chains are tighter.",
        },
      },
    ],
  },

  oc_asker_isyanci_08: {
    baslik: "An Organization Left Without a Head",
    metin:
      "The cell's founder is badly wounded and hiding; no one dares replace him. Comrades look to you; perhaps it's your turn.",
    secenekler: [
      {
        metin: "Take the lead; rally the cell.",
        basariliSonuc: {
          mesaj: "Comrades accepted you as leader; the cell carried on.",
          detay: "Every decision now affects many lives.",
        },
        basarisizSonuc: {
          mesaj: "Your leadership caused disputes; some broke away.",
        },
      },
      {
        metin: "Step back; back an experienced comrade.",
        basariliSonuc: {
          mesaj: "Your candidate took over and the cell carried on steady.",
        },
        basarisizSonuc: {
          mesaj: "He wasn't ready; the cell drifted indecisive for weeks.",
        },
      },
      {
        metin: "Split the cell into independent cells.",
        basariliSonuc: {
          mesaj: "The split worked; if one cell falls, the rest stay safe.",
        },
        basarisizSonuc: {
          mesaj: "The split caused confusion; some cells lost contact with each other.",
        },
      },
    ],
  },

  oc_asker_isyanci_09: {
    baslik: "An Encounter",
    metin:
      "{dost}, who once shared your tent, is now a loyalist corporal. Your eyes meet in the yard; his gaze holds friendship and suspicion.",
    secenekler: [
      {
        metin: "Talk to him; open up, trusting the friendship.",
        basariliSonuc: {
          mesaj: "{dost} listened, recalled old days, and swore to tell no one.",
        },
        basarisizSonuc: {
          mesaj: "{dost} listened, left quietly; next day your superiors summoned you.",
          detay: "Some friendships are crushed under loyalty.",
        },
      },
      {
        metin: "Keep distance; show nothing.",
        basariliSonuc: {
          mesaj: "You passed with a cold greeting; {dost} sensed something but let it go.",
        },
        basarisizSonuc: {
          mesaj: "Your distance was obvious; {dost} now suspects you.",
        },
      },
    ],
  },

  oc_asker_isyanci_10: {
    baslik: "Contraband Swords",
    metin:
      "An arms dealer outside the barracks whispers he can secretly sell the cell cheap swords and shields, for an extra fee and an oath of silence.",
    secenekler: [
      {
        metin: "Make a large purchase from the common purse.",
        basariliSonuc: {
          mesaj: "The arms came in secretly at midnight; the cell can now defend itself.",
        },
        basarisizSonuc: {
          mesaj: "A sentry nearly spotted you; you had to abandon half the arms.",
        },
      },
      {
        metin: "Buy a small, unnoticeable amount.",
        basariliSonuc: {
          mesaj: "The small lot arrived safely; too little, but a start.",
        },
        basarisizSonuc: {
          mesaj: "The dealer took the money, the goods were poor; you were cheated.",
        },
      },
      {
        metin: "Decline; don't trust the dealer.",
        basariliSonuc: {
          mesaj: "You declined; the cell stays unarmed but safe.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal let some down; they muttered 'we missed our chance'.",
        },
      },
    ],
  },

  oc_asker_isyanci_11: {
    baslik: "Words on the Wall",
    metin:
      "The cell wants the people to know the truth: posting a notice on the market wall about the commanders' arbitrary punishments is risky but direct.",
    secenekler: [
      {
        metin: "Hang the text yourself before dawn.",
        basariliSonuc: {
          mesaj: "At dawn you saw people gathered around it; your words reached beyond the barracks.",
          detay: "Words travel farther than swords.",
        },
        basarisizSonuc: {
          mesaj: "Guards caught you posting it; the blows you took fleeing lasted days.",
        },
      },
      {
        metin: "Have a trusted villager post it.",
        basariliSonuc: {
          mesaj: "The villager posted it unsuspected; the words reached the people.",
        },
        basarisizSonuc: {
          mesaj: "The villager was caught and named no one, but you put him in danger.",
        },
      },
    ],
  },

  oc_asker_isyanci_12: {
    baslik: "A Drunk Mouth",
    metin:
      "In a tavern a young cell member drinks too much and lets the cell's name slip. Who is the man at the next table, drunk or agent?",
    secenekler: [
      {
        metin: "Quietly lead the lad outside.",
        basariliSonuc: {
          mesaj: "You got him out; the tavern din drowned the talk.",
        },
        basarisizSonuc: {
          mesaj: "Your exit drew notice; the stranger watched you closely.",
        },
      },
      {
        metin: "Follow the stranger; learn who he is.",
        basariliSonuc: {
          mesaj: "He was just a peddler; you felt relieved.",
        },
        basarisizSonuc: {
          mesaj: "He noticed; the man vanished, and you drew more attention.",
        },
      },
      {
        metin: "Cut the young man off from the cell.",
        basariliSonuc: {
          mesaj: "He left sadly, but the cell took one more precaution.",
        },
        basarisizSonuc: {
          mesaj: "Enraged at the exclusion, he made threats; now you fear him too.",
        },
      },
    ],
  },

  oc_asker_isyanci_13: {
    baslik: "Confession",
    metin:
      "The barracks priest eyes you at confession, hinting at your night trips. Will he inform, or does he hate injustice too?",
    secenekler: [
      {
        metin: "Open up partly; probe his side.",
        basariliSonuc: {
          mesaj: "The priest whispered he shares your anger; the church offers the cell a hideout.",
          detay: "Some allies wear robes.",
        },
        basarisizSonuc: {
          mesaj: "The priest reported you; your steps are watched.",
          detay: "Someone you trusted betrayed you.",
        },
      },
      {
        metin: "Say nothing; confess generally.",
        basariliSonuc: {
          mesaj: "An ordinary confession; the priest learned nothing.",
        },
        basarisizSonuc: {
          mesaj: "The priest suspected your silence and grew wary.",
        },
      },
    ],
  },

  oc_asker_isyanci_14: {
    baslik: "An Ambush in the Dark",
    metin:
      "The cell plans to seize one of the cruelest commanders at night and judge him. Righteous vengeance or grave mistake, you can't tell.",
    secenekler: [
      {
        metin: "Join the plan; take part in the abduction.",
        basariliSonuc: {
          mesaj: "The commander was taken and tried before the people; this time officers felt fear.",
          detay: "Justice sometimes waits for night.",
        },
        basarisizSonuc: {
          mesaj: "The plan collapsed, guards swarmed; little hope for those left behind.",
        },
      },
      {
        metin: "Argue it's too risky; try to stop it.",
        basariliSonuc: {
          mesaj: "The majority agreed and the plan was postponed; some still called you a coward.",
        },
        basarisizSonuc: {
          mesaj: "They ignored you and went ahead; you were blamed for the outcome too.",
        },
      },
    ],
  },

  oc_asker_isyanci_15: {
    baslik: "Sleepless Nights",
    metin:
      "These weeks you flinch at every shadow and hear your name in every whisper. You can't meet comrades' eyes; paranoia steals your sleep.",
    secenekler: [
      {
        metin: "Confide in a trusted comrade.",
        basariliSonuc: {
          mesaj: "Your comrade listened and reminded you you're not alone; the burden eased.",
        },
        basarisizSonuc: {
          mesaj: "He admitted he was scared too; you both left more uneasy.",
        },
      },
      {
        metin: "Grit your teeth; bear it alone.",
        basariliSonuc: {
          mesaj: "You showed nothing; the cell is safe but your inner darkness grew.",
          detay: "Some burdens are carried unshared.",
        },
        basarisizSonuc: {
          mesaj: "Your hand shook on watch and superiors noticed; they asked 'are you ill?'",
        },
      },
    ],
  },

  oc_asker_isyanci_16: {
    baslik: "The Lost List",
    metin:
      "Command keeps a secret list of suspected rebels; reach it and you can warn them. But approaching may put your name on it.",
    secenekler: [
      {
        metin: "Sneak into the tent; steal the list.",
        basariliSonuc: {
          mesaj: "You took the list and warned everyone in time; the cell escaped a great blow.",
          detay: "A scrap of paper can be a dozen lives.",
        },
        basarisizSonuc: {
          mesaj: "Caught leaving; you are now the top name on the list.",
        },
      },
      {
        metin: "Bribe the clerk in the tent.",
        basariliSonuc: {
          mesaj: "The clerk whispered some names; you warned those most at risk.",
        },
        basarisizSonuc: {
          mesaj: "The clerk took the money and lied; you warned the wrong names and lost time.",
        },
      },
      {
        metin: "Ignore the list; let fate decide.",
        basariliSonuc: {
          mesaj: "You did nothing; weeks later two names were arrested, and you were spared.",
        },
        basarisizSonuc: {
          mesaj: "Your passivity got out; some no longer count you in the cell.",
        },
      },
    ],
  },

  oc_asker_isyanci_17: {
    baslik: "A Poisoned Promotion",
    metin:
      "{amir} wants to promote you to Command, which would cut you from the cell. The cell wants you as an inside ear.",
    secenekler: [
      {
        metin: "Accept; become the cell's hidden eye.",
        basariliSonuc: {
          mesaj: "You were promoted; you live in two worlds, but the cell is a step ahead thanks to you.",
          detay: "Power wears dangerous disguises.",
        },
        basarisizSonuc: {
          mesaj: "Promoted, but your leak was noticed; comrades look at you differently now.",
        },
      },
      {
        metin: "Politely decline; stay with the cell.",
        basariliSonuc: {
          mesaj: "Your refusal surprised {amir}, who didn't push; your place in the cell holds.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal raised 'why stay a private?'; you're watched more closely.",
        },
      },
    ],
  },

  oc_asker_isyanci_18: {
    baslik: "The Night of the Uprising",
    metin:
      "After months of preparation the cell strikes: an uprising to seize the armory and topple the commanders. Tonight, change or silence.",
    secenekler: [
      {
        metin: "Lead the uprising from the front.",
        basariliSonuc: {
          mesaj: "The armory fell and the commanders were toppled; in the barracks your name means hope.",
          detay: "This night will be told for years.",
        },
        basarisizSonuc: {
          mesaj: "The uprising was crushed; comrades died or were chained, and you barely escaped.",
          detay: "Some nights are never forgotten.",
        },
      },
      {
        metin: "Stay back; provide support and messaging.",
        basariliSonuc: {
          mesaj: "Your intel helped the vanguard; the uprising succeeded, and you stayed unseen.",
        },
        basarisizSonuc: {
          mesaj: "You fled as it was crushed; alive, but you watched the cell collapse from afar.",
        },
      },
      {
        metin: "Withdraw at the last moment; it's too early.",
        basariliSonuc: {
          mesaj: "You withdrew; the uprising was bloodily crushed without you, and survival became guilt.",
        },
        basarisizSonuc: {
          mesaj: "Your withdrawal was noticed; to surviving comrades you are a traitor.",
        },
      },
    ],
  },

  oc_asker_isyanci_19: {
    baslik: "The Escape Tunnel",
    metin:
      "After the uprising the barracks hunts you like hounds. You know an old smugglers' tunnel; it may have collapsed, and who waits outside is unknown.",
    secenekler: [
      {
        metin: "Try the tunnel; flee whatever happens.",
        basariliSonuc: {
          mesaj: "You crawled through the tunnel and emerged free, leaving everything behind.",
          detay: "Freedom is sometimes just escape.",
        },
        basarisizSonuc: {
          mesaj: "The tunnel collapsed halfway; when you dug out, guards surrounded you.",
        },
      },
      {
        metin: "Melt into the city; hide your identity.",
        basariliSonuc: {
          mesaj: "You lived as a craftsman for months; the hunters forgot you, your old life gone.",
        },
        basarisizSonuc: {
          mesaj: "A neighbor grew suspicious and informed; you gave yourself away fleeing.",
        },
      },
      {
        metin: "Surrender; beg mercy for your comrades.",
        basariliSonuc: {
          mesaj: "You surrendered; your plea saved some comrades, but your freedom is gone.",
          detay: "Some victories come behind chains.",
        },
        basarisizSonuc: {
          mesaj: "Surrender earned no mercy; back to the interrogation room, harsher now.",
        },
      },
    ],
  },

  oc_asker_isyanci_20: {
    baslik: "A New Dawn",
    metin:
      "After years of struggle, command accepted a rule easing punishments. The win is fragile; one misstep could undo it all.",
    secenekler: [
      {
        metin: "Protect the gain; quietly disband the cell.",
        basariliSonuc: {
          mesaj: "The cell dissolved quietly; injustice eased, and no one learned the names.",
          detay: "Some victories are won without applause.",
        },
        basarisizSonuc: {
          mesaj: "Secrets leaked during the breakup; the gain stayed, but some comrades remain suspects.",
        },
      },
      {
        metin: "Proclaim the victory; tell the people.",
        basariliSonuc: {
          mesaj: "The people learned the resisters' story; your name is known beyond the barracks.",
          detay: "Some names outlive chains.",
        },
        basarisizSonuc: {
          mesaj: "The proclamation enraged command; you barely dodged arrest, and the cell hid.",
        },
      },
      {
        metin: "Keep fighting; don't settle.",
        basariliSonuc: {
          mesaj: "The cell set new goals; the win was only the first step of a bigger fight.",
        },
        basarisizSonuc: {
          mesaj: "Excess ambition wore the cell down; some said 'enough' and left, dimming the win.",
        },
      },
    ],
  },

  oc_asker_kahraman_01: {
    baslik: "The Birth of a Legend",
    metin:
      "The unit you saved returned with 'hero' attached to your name. Comrades exaggerate; you still don't know why you charged.",
    secenekler: [
      {
        metin: "Correct the tale; tell what happened.",
        basariliSonuc: {
          mesaj: "You told the truth; the tale lost its gloss but they trust you more.",
          detay: "Some heroism needs honesty, not exaggeration.",
        },
        basarisizSonuc: {
          mesaj: "No one believed you; the truth paled beside the legend.",
          detay: "The true is loved less than the interesting.",
        },
      },
      {
        metin: "Let the tale grow; stay silent.",
        basariliSonuc: {
          mesaj: "The legend grew on its own; you just watched.",
          detay: "The beloved story differed from what you lived.",
        },
        basarisizSonuc: {
          mesaj: "The exaggeration shrank you in some eyes; they whispered 'how much is true?'",
          detay: "Fame's shadow falls on comrades too.",
        },
      },
    ],
  },

  oc_asker_kahraman_02: {
    baslik: "Barracks Ballads",
    metin:
      "A wandering bard turned your ambush escape into a song. Soldiers hum it even at meals; your name reaches villages before you.",
    secenekler: [
      {
        metin: "Host the bard; let the song spread.",
        basariliSonuc: {
          mesaj: "The song is sung in inns and markets; your name now belongs to the people.",
          detay: "Proud, yet you'll always be compared to the song.",
        },
        basarisizSonuc: {
          mesaj: "The bard took the coin and twisted the song; it holds deeds you never did.",
          detay: "A legend, once spoken, escapes its owner.",
        },
      },
      {
        metin: "Drive the bard off; keep your privacy.",
        basariliSonuc: {
          mesaj: "The bard left; you found peace for a while.",
          detay: "Being known by all is tiring.",
        },
        basarisizSonuc: {
          mesaj: "The bard left, song learned; his expulsion became a tale too.",
          detay: "Fleeing fame can feed it.",
        },
      },
      {
        metin: "Ignore it; mind your duty.",
        basariliSonuc: {
          mesaj: "The song spread on its own while you kept your watch.",
          detay: "Not interfering is also a choice.",
        },
        basarisizSonuc: {
          mesaj: "Your indifference read as 'humble hero'; your fame keeps growing.",
          detay: "Silence can be the loudest answer.",
        },
      },
    ],
  },

  oc_asker_kahraman_03: {
    baslik: "Jealous Eyes",
    metin:
      "A senior officer claims his strategy, not you, saved the unit. The soldiers don't know whom to believe.",
    secenekler: [
      {
        metin: "Confront him openly; tell everyone the truth.",
        basariliSonuc: {
          mesaj: "The truth emerged; the soldiers sided with you.",
          detay: "But the officer's hatred is no longer hidden.",
        },
        basarisizSonuc: {
          mesaj: "The confrontation turned ugly; superiors scolded you both.",
          detay: "No gain, only a bigger enemy.",
        },
      },
      {
        metin: "Stay silent; trust time to show the truth.",
        basariliSonuc: {
          mesaj: "Your silence was seen as maturity; the soldiers already knew.",
          detay: "Some battles are won by silence.",
        },
        basarisizSonuc: {
          mesaj: "Your silence read as weakness; the officer's lie circulated a while.",
          detay: "Late truth lets a lie settle.",
        },
      },
      {
        metin: "Complain to {amir}; make it official.",
        basariliSonuc: {
          mesaj: "{amir} backed you; the officer was humbled before superiors.",
          detay: "Justice cost a lasting enemy.",
        },
        basarisizSonuc: {
          mesaj: "{amir} said 'stop squabbling like children' and punished you both.",
          detay: "You sought justice and found shame.",
        },
      },
    ],
  },

  oc_asker_kahraman_04: {
    baslik: "A Young Admirer",
    metin:
      "A sixteen-year-old recruit approaches you, hands trembling. He fled his village and enlisted to be like you.",
    secenekler: [
      {
        metin: "Tell him what war really is.",
        basariliSonuc: {
          mesaj: "The light in his eyes dimmed, replaced by knowing the truth.",
          detay: "Heroism: breaking his dream to keep him alive.",
        },
        basarisizSonuc: {
          mesaj: "Your words missed; he still thinks he'll be invincible like you.",
          detay: "Some lessons are learned by living.",
        },
      },
      {
        metin: "Pat his head; return to work.",
        basariliSonuc: {
          mesaj: "The boy left without disappointment.",
          detay: "You can't make time for everyone.",
        },
        basarisizSonuc: {
          mesaj: "The recruit read it as coldness and began avoiding you.",
          detay: "Some admiration dies at the first chill.",
        },
      },
    ],
  },

  oc_asker_kahraman_05: {
    baslik: "Waking in the Shadows",
    metin:
      "You woke at midnight in a sweat, hearing your ambushed comrades scream. You sat with your sword till dawn.",
    secenekler: [
      {
        metin: "Tell no one; bear it quietly.",
        basariliSonuc: {
          mesaj: "No one noticed; you relived the same battle each night.",
          detay: "Some wounds hide under armor.",
        },
        basarisizSonuc: {
          mesaj: "Sleeplessness shook your hand; comrades noticed, and you denied it.",
          detay: "Shadows grow when ignored.",
        },
      },
      {
        metin: "Tell an old comrade-in-arms.",
        basariliSonuc: {
          mesaj: "{dost} listened, fixed nothing, but sat beside you.",
          detay: "Some wounds close with words.",
        },
        basarisizSonuc: {
          mesaj: "Your story unsettled {dost} too; neither could comfort the other.",
          detay: "Some burdens double instead of halving.",
        },
      },
    ],
  },

  oc_asker_kahraman_06: {
    baslik: "The Man-at-Arms Warrant",
    metin:
      "The commander summons you and grants the rank of Swordsman for your ambush deed and fame. The badge on your shoulder draws every eye.",
    secenekler: [
      {
        metin: "Accept humbly; stay silent at the ceremony.",
        basariliSonuc: {
          mesaj: "Your words were few but the soldiers read it as strength.",
          detay: "Some earn respect by staying silent.",
        },
        basarisizSonuc: {
          mesaj: "You drifted off at the ceremony; some took it for arrogance.",
          detay: "Silence isn't always read right.",
        },
      },
      {
        metin: "Accept and give a speech at once.",
        basariliSonuc: {
          mesaj: "Your speech raised the soldiers; some officers found you too ambitious.",
          detay: "Not everyone applauds.",
        },
        basarisizSonuc: {
          mesaj: "The words stuck in your throat; the silence stretched shamefully.",
          detay: "Heroism doesn't guarantee eloquence.",
        },
      },
      {
        metin: "Decline; say you owe the soldiers first.",
        basariliSonuc: {
          mesaj: "The commander was surprised, but it raised you; he declared the rank a shared victory.",
          detay: "Refusing the crown shows you deserve it most.",
        },
        basarisizSonuc: {
          mesaj: "The commander took it as disrespect; he gave the rank coldly.",
          detay: "Good intent isn't always understood.",
        },
      },
    ],
  },

  oc_asker_kahraman_07: {
    baslik: "At the Head of the Vanguard",
    metin:
      "As the {bolge} army enters a great battle, the commander gives you the vanguard. The soldiers want to march with you, not behind you.",
    secenekler: [
      {
        metin: "Step forward; break the line together.",
        basariliSonuc: {
          mesaj: "The line broke and the enemy scattered; three beside you never rose again.",
          detay: "While victory songs were written, you kept their names.",
        },
        basarisizSonuc: {
          mesaj: "The line failed and you ordered retreat; they'd never heard that from you.",
          detay: "Heroism isn't winning every battle.",
        },
      },
      {
        metin: "Advance carefully; send scouts first.",
        basariliSonuc: {
          mesaj: "You advanced with few losses; the win was dull but solid.",
          detay: "Calculated courage is plain but real.",
        },
        basarisizSonuc: {
          mesaj: "Caution seemed to waste the chance; some muttered 'where's the old hero?'",
          detay: "Some will always expect the same recklessness.",
        },
      },
    ],
  },

  oc_asker_kahraman_08: {
    baslik: "A Challenge",
    metin:
      "A giant knight from the enemy ranks offers to fight you alone instead of the armies. Both sides hold their breath.",
    secenekler: [
      {
        metin: "Accept the challenge.",
        basariliSonuc: {
          mesaj: "The duel was short; as the knight fell, your army shouted your name.",
          detay: "Even some in the enemy ranks nodded.",
        },
        basarisizSonuc: {
          mesaj: "The knight's blow felled you; your shield barely saved you.",
          detay: "News of defeat outran you.",
        },
      },
      {
        metin: "Refuse; say it may be a trap.",
        basariliSonuc: {
          mesaj: "The commander backed your decision; the battle ran its course.",
          detay: "You needn't accept every challenge.",
        },
        basarisizSonuc: {
          mesaj: "Whispers of 'the hero was afraid' began and wouldn't die.",
          detay: "A legend forgives no step back.",
        },
      },
      {
        metin: "Propose a young soldier in your place.",
        basariliSonuc: {
          mesaj: "The young soldier won with unexpected courage; you stood proudly behind him.",
          detay: "Sometimes heroism is yielding the stage.",
        },
        basarisizSonuc: {
          mesaj: "The young soldier didn't return; some questioned your choice, you most of all.",
          detay: "You could have gone in his place.",
        },
      },
    ],
  },

  oc_asker_kahraman_09: {
    baslik: "A Needless Risk",
    metin:
      "You consider climbing the walls alone to relieve a besieged tower; everyone expects it, yet a safer way exists.",
    secenekler: [
      {
        metin: "Climb alone; live up to your image.",
        basariliSonuc: {
          mesaj: "You opened the gate from inside; the unit cheered, and you thanked luck you stood.",
          detay: "You know you won't be this lucky again.",
        },
        basarisizSonuc: {
          mesaj: "An arrow pierced your shoulder mid-climb and you fell.",
          detay: "Surviving was a miracle; your arm isn't the same.",
        },
      },
      {
        metin: "Take the safe, team-planned route.",
        basariliSonuc: {
          mesaj: "The tower fell, no one was hurt, but no one shouted your name.",
          detay: "A wise victory sometimes goes unapplauded.",
        },
        basarisizSonuc: {
          mesaj: "Some said 'not as brave as before'; it hurt more than you thought.",
          detay: "Your legend demands more than you do.",
        },
      },
    ],
  },

  oc_asker_kahraman_10: {
    baslik: "A Comrade's Price",
    metin:
      "In a clash the young soldier beside you took a blow meant for you. His blood is still on your armor; you live, he doesn't.",
    secenekler: [
      {
        metin: "Carry the news to his family yourself.",
        basariliSonuc: {
          mesaj: "You'll never forget his mother's look, but you didn't lie.",
          detay: "Some burdens aren't shared, only carried.",
        },
        basarisizSonuc: {
          mesaj: "You reached the door but couldn't enter; you left a letter and turned back.",
          detay: "Courage sometimes ends at a doorstep.",
        },
      },
      {
        metin: "Suppress the pain; carry on.",
        basariliSonuc: {
          mesaj: "The soldiers admired your endurance; none saw the emptiness in your eyes.",
          detay: "The hero bore a burden no one saw.",
        },
        basarisizSonuc: {
          mesaj: "The pain you buried kept you up at night; your sword hand shook.",
          detay: "Nothing buried truly vanishes.",
        },
      },
    ],
  },

  oc_asker_kahraman_11: {
    baslik: "The Loneliness of a Hero",
    metin:
      "Old comrades no longer joke with you; they look at you like a legend. Even by the fire, a distance lies between you.",
    secenekler: [
      {
        metin: "Act as in the old days; persist.",
        basariliSonuc: {
          mesaj: "You laughed together one night; the distance melted for a moment.",
          detay: "Some bonds are worth insisting on.",
        },
        basarisizSonuc: {
          mesaj: "Your efforts were kind but futile; they no longer count you as one of them.",
          detay: "Fame opens a door with no way back.",
        },
      },
      {
        metin: "Accept the distance; get used to solitude.",
        basariliSonuc: {
          mesaj: "You withdrew to your tent; fame became both crown and wall.",
          detay: "The best-known can be the loneliest.",
        },
        basarisizSonuc: {
          mesaj: "Loneliness weighed more than you thought; nights dragged on.",
          detay: "Saying you need no one doesn't make it true.",
        },
      },
      {
        metin: "Spend time with the new recruits.",
        basariliSonuc: {
          mesaj: "Among the young you caught your breath, though they still gaze in awe.",
          detay: "A new bond doesn't replace the old, but it's something.",
        },
        basarisizSonuc: {
          mesaj: "The young idealize you so much you felt alone even among them.",
          detay: "Admiration can't replace friendship.",
        },
      },
    ],
  },

  oc_asker_kahraman_12: {
    baslik: "The Tower Alone",
    metin:
      "A small fort's garrison scattered in a night raid; you alone can hold the gate. Only two wounded stand behind you.",
    secenekler: [
      {
        metin: "Hold the narrow pass alone.",
        basariliSonuc: {
          mesaj: "You held till dawn; when reinforcements came, the pass was still yours.",
          detay: "You could never explain how you survived that night.",
        },
        basarisizSonuc: {
          mesaj: "Numbers beat you; you fell back from the pass.",
          detay: "The deepest wound is the two men you left.",
        },
      },
      {
        metin: "Abandon the pass; leave the fort.",
        basariliSonuc: {
          mesaj: "You lived but the fort fell; 'hero' began to be said mockingly.",
          detay: "Survival is sometimes harder than victory.",
        },
        basarisizSonuc: {
          mesaj: "Caught while retreating; the fort fell and you were wounded.",
          detay: "A night the songs will never tell.",
        },
      },
    ],
  },

  oc_asker_kahraman_13: {
    baslik: "The Villagers' Hope",
    metin:
      "A village worn by famine and raids begs you to camp at its edge, just so you're there. Your presence is a shield.",
    secenekler: [
      {
        metin: "Agree; stay a few days in the village.",
        basariliSonuc: {
          mesaj: "The villagers slept soundly; children smiled when they saw you.",
          detay: "Heroism can protect without swinging a sword.",
        },
        basarisizSonuc: {
          mesaj: "No attack came, but you neglected your post, and superiors were displeased.",
          detay: "Guarding one place, you neglected another.",
        },
      },
      {
        metin: "Decline kindly; say duty awaits.",
        basariliSonuc: {
          mesaj: "The villagers were let down but understood; you can't be everywhere.",
          detay: "Even a legend can't be in two places.",
        },
        basarisizSonuc: {
          mesaj: "Elders grumbled 'so legends tire too'; the words reached you.",
          detay: "Expectations are unfair yet heavy.",
        },
      },
    ],
  },

  oc_asker_kahraman_14: {
    baslik: "The Shadow of Slander",
    metin:
      "A jealous officer spread a rumor that you escaped the ambush by sacrificing comrades. It already circulates in the barracks.",
    secenekler: [
      {
        metin: "Go to superiors with proof and witnesses.",
        basariliSonuc: {
          mesaj: "Witnesses cleared you; the slanderer got a harsh warning.",
          detay: "Truth won; the enmity stayed.",
        },
        basarisizSonuc: {
          mesaj: "The proof was deemed insufficient; suspicion never fully lifted.",
          detay: "Fallen suspicion may never fully lift.",
        },
      },
      {
        metin: "Ignore it; answer with your conduct.",
        basariliSonuc: {
          mesaj: "The rumor faded; your conduct proved stronger than words.",
          detay: "Some answers are given in silence.",
        },
        basarisizSonuc: {
          mesaj: "Your silence read as admission; the slander clung to you.",
          detay: "Silence sometimes isn't enough.",
        },
      },
      {
        metin: "Threaten the officer privately.",
        basariliSonuc: {
          mesaj: "The officer took back the rumor in fear, but now truly hates you.",
          detay: "A silenced enemy is more dangerous.",
        },
        basarisizSonuc: {
          mesaj: "Your threat was overheard; your hero image cracked for the first time.",
          detay: "Legends can rot by their own means.",
        },
      },
    ],
  },

  oc_asker_kahraman_15: {
    baslik: "A Wound That Won't Heal",
    metin:
      "An old wound reopened; the healer says fighting on may cost your arm. But the army needs you right now.",
    secenekler: [
      {
        metin: "Heed the healer; rest.",
        basariliSonuc: {
          mesaj: "Your wound closed, but your absence from the front sparked gossip.",
          detay: "Protecting your body risks your reputation.",
        },
        basarisizSonuc: {
          mesaj: "Rest wasn't enough; impatience sent you back early.",
          detay: "Wounds close only when patience is paid.",
        },
      },
      {
        metin: "Ignore the warning; keep fighting.",
        basariliSonuc: {
          mesaj: "You stayed at the front; morale rose, but your arm aches more each day.",
          detay: "Heroism's price is paid slowly.",
        },
        basarisizSonuc: {
          mesaj: "Your arm failed mid-battle and the sword fell from your hand.",
          detay: "The healer was never so painfully right.",
        },
      },
    ],
  },

  oc_asker_kahraman_16: {
    baslik: "The Commander's Seal",
    metin:
      "After years of valor, the lord presents you the Commander's seal in a packed hall. You wonder whether you can bear the responsibility.",
    secenekler: [
      {
        metin: "Take the seal; swear loyalty to your soldiers.",
        basariliSonuc: {
          mesaj: "Your oath shook the hall; you're no longer just a hero, but a commander.",
          detay: "Every decision now carries your soldiers' lives.",
        },
        basarisizSonuc: {
          mesaj: "The oath seemed ordinary; old officers muttered 'words are easy, war is hard'.",
          detay: "Words prove nothing untested on the field.",
        },
      },
      {
        metin: "Take the seal; propose a new campaign.",
        basariliSonuc: {
          mesaj: "Your proposal was accepted, but seniors found you green and ambitious.",
          detay: "New rank brought new enemies.",
        },
        basarisizSonuc: {
          mesaj: "Your proposal was rejected; you felt humiliated at the ceremony.",
          detay: "Rank elevates but doesn't protect.",
        },
      },
      {
        metin: "Take the seal quietly; return to duty.",
        basariliSonuc: {
          mesaj: "Slipping from the ceremony became legend: 'Even as commander, he chose war.'",
          detay: "Some earn respect in the moments they flee.",
        },
        basarisizSonuc: {
          mesaj: "Your hasty exit was seen as disrespect by some.",
          detay: "Not every silence reads as humility.",
        },
      },
    ],
  },

  oc_asker_kahraman_17: {
    baslik: "One Who Wants to Be Like You",
    metin:
      "A young soldier admits he plans to charge the enemy line alone, as you did. If you don't stop him, he'll likely die.",
    secenekler: [
      {
        metin: "Take him aside; tell him the true cost.",
        basariliSonuc: {
          mesaj: "The youth listened; the fire in his eyes dimmed, but his mind cleared.",
          detay: "You haven't slept the same since that night either.",
        },
        basarisizSonuc: {
          mesaj: "Your words missed; he still wants to be like you, and learned to hide it.",
          detay: "Some fires die only by burning.",
        },
      },
      {
        metin: "Stay out; everyone picks their own path.",
        basariliSonuc: {
          mesaj: "You stayed out; he made his choice, and time will show the result.",
          detay: "You can't decide everything, yet it gnaws at you.",
        },
        basarisizSonuc: {
          mesaj: "The youth followed your path into an ambush; they found him too late.",
          detay: "At the funeral no one asked how you felt.",
        },
      },
    ],
  },

  oc_asker_kahraman_18: {
    baslik: "Commander of the Great Battle",
    metin:
      "The {bolge} army readies for its greatest battle in years; you command the right wing. The soldiers want your voice, not orders.",
    secenekler: [
      {
        metin: "Lead from the front; fight foremost.",
        basariliSonuc: {
          mesaj: "The right wing scattered the enemy; victory carried your name.",
          detay: "Amid the celebration you noticed the missing voices.",
        },
        basarisizSonuc: {
          mesaj: "Your wing broke and you withdrew badly wounded.",
          detay: "Defeat overshadowed every victory.",
        },
      },
      {
        metin: "Command from behind; trust your soldiers.",
        basariliSonuc: {
          mesaj: "The wing advanced steadily with few losses; victory was dull but solid.",
          detay: "Command is more than running in front.",
        },
        basarisizSonuc: {
          mesaj: "Some officers said 'the old hero no longer fights in front'.",
          detay: "As rank grows, expectations conflict.",
        },
      },
      {
        metin: "Strike the enemy's flank in a risky maneuver.",
        basariliSonuc: {
          mesaj: "The maneuver worked and split the enemy; a move for the history books.",
          detay: "Barracks will tell of this maneuver for years.",
        },
        basarisizSonuc: {
          mesaj: "The enemy foresaw the maneuver; your wing suffered heavy losses.",
          detay: "Daring isn't always rewarded.",
        },
      },
    ],
  },

  oc_asker_kahraman_19: {
    baslik: "The Weight of the Legacy",
    metin:
      "You visit the graves of comrades lost over the years; while the people immortalize you in songs, you struggle to recall their names.",
    secenekler: [
      {
        metin: "Visit every grave; speak each name aloud.",
        basariliSonuc: {
          mesaj: "You spoke each name; the wind took the words, and you made room for them within.",
          detay: "The legend is the people's; the memories remain yours.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't recall some names; it hurt more than any blade.",
          detay: "Forgetting is a weight too.",
        },
      },
      {
        metin: "Leave the past; focus on today.",
        basariliSonuc: {
          mesaj: "You looked ahead and felt lighter; some names still return at night.",
          detay: "Looking ahead isn't forgetting behind.",
        },
        basarisizSonuc: {
          mesaj: "Trying to forget failed; the past wouldn't let go.",
          detay: "Some accounts refuse to close.",
        },
      },
    ],
  },

  oc_asker_kahraman_20: {
    baslik: "A Name Carved in Stone",
    metin:
      "By the lord's order a monument bearing your name rises in the barracks yard. The name is yours, but the story has outgrown you.",
    secenekler: [
      {
        metin: "Speak at the ceremony; tell the story yourself.",
        basariliSonuc: {
          mesaj: "Your words left a mark more lasting than stone; the young soldiers' eyes burned.",
          detay: "Perhaps the legacy was that fire, not the stone.",
        },
        basarisizSonuc: {
          mesaj: "Your words couldn't match the stone's grandeur; the ceremony stayed cold.",
          detay: "Some stories need more than words.",
        },
      },
      {
        metin: "Stand silent before the monument.",
        basariliSonuc: {
          mesaj: "Your silence said more than words; all bowed in respect.",
          detay: "Some moments complete without words.",
        },
        basarisizSonuc: {
          mesaj: "Your silence read as pride; they whispered 'thinks too much of himself'.",
          detay: "Even in the stone's shadow you're misread.",
        },
      },
      {
        metin: "Refuse the monument; let your name live in memory.",
        basariliSonuc: {
          mesaj: "The lord was surprised, then approved; the monument rose, but your words echoed louder.",
          detay: "Your legacy lives in memory, not in stone.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was seen as disrespect; the monument rose, but you weren't invited.",
          detay: "Even humility can be misunderstood.",
        },
      },
    ],
  },

  oc_asker_firari_01: {
    baslik: "The Prison Camp",
    metin:
      "Rusted chains on your wrists, a mud roof overhead. Sentries shout in a foreign tongue. Your only goal: reach morning.",
    secenekler: [
      {
        metin: "Keep your head down, watch.",
        basariliSonuc: {
          mesaj: "You got through the day unnoticed.",
          detay: "Survival is invisibility.",
        },
        basarisizSonuc: {
          mesaj: "Silence wasn't enough; a sentry whipped you for nothing.",
          detay: "No justice here, only moods.",
        },
      },
      {
        metin: "Quietly bond with the prisoners.",
        basariliSonuc: {
          mesaj: "A quiet trust grew among the prisoners you whispered with.",
          detay: "Shared hunger weighs less.",
        },
        basarisizSonuc: {
          mesaj: "Your whispers were caught; you were all punished.",
          detay: "Trust is costly here.",
        },
      },
      {
        metin: "Serve a sentry, win a privilege.",
        basariliSonuc: {
          mesaj: "You proved useful; you won extra bread and some respect.",
          detay: "The prisoners look at you differently now.",
        },
        basarisizSonuc: {
          mesaj: "The sentry refused, and the prisoners took you for a collaborator.",
          detay: "You gained nothing, only isolation.",
        },
      },
    ],
  },

  oc_asker_firari_02: {
    baslik: "The Escape Plan",
    metin:
      "You've memorized the camp: watch changes, a loose fence post, supply carts. Plan alone, or with fellow prisoners?",
    secenekler: [
      {
        metin: "Plan alone.",
        basariliSonuc: {
          mesaj: "You mapped your own escape; no one can betray you.",
          detay: "Solitude keeps secrets best.",
        },
        basarisizSonuc: {
          mesaj: "A sentry saw you studying the fence; you're under suspicion.",
          detay: "Plan alone, err alone.",
        },
      },
      {
        metin: "Plan with prisoners you trust.",
        basariliSonuc: {
          mesaj: "Three prisoners agreed; each has a task.",
          detay: "Shared hope weighs less.",
        },
        basarisizSonuc: {
          mesaj: "One of you sold the plan to the sentries for extra rations.",
          detay: "Trust can be the costliest mistake.",
        },
      },
    ],
  },

  oc_asker_firari_03: {
    baslik: "The Escape Attempt",
    metin:
      "No moon; the supply cart's racket distracts the sentries. The night has come. Heart drumming, you crawl toward the loose fence.",
    secenekler: [
      {
        metin: "Go now, risk it.",
        basariliSonuc: {
          mesaj: "You slipped under the fence into the dark.",
          detay: "Freedom is heavy even at first breath.",
        },
        basarisizSonuc: {
          mesaj: "A dog's bark betrayed you; caught, your chains grow heavier.",
          detay: "Some nights lead nowhere.",
        },
      },
      {
        metin: "Give up, wait for a safer chance.",
        basariliSonuc: {
          mesaj: "You pulled back; the fire inside still burns.",
          detay: "Patience is harder than courage.",
        },
        basarisizSonuc: {
          mesaj: "Your unease was noticed; the sentries watch you closely.",
          detay: "Even doing nothing has a price.",
        },
      },
    ],
  },

  oc_asker_firari_04: {
    baslik: "In Foreign Lands",
    metin:
      "You've left the camp but danger remains. Your clothes and accent give you away. At a border village, what will you say you are?",
    secenekler: [
      {
        metin: "Take a dead merchant's identity.",
        basariliSonuc: {
          mesaj: "You took a corpse's papers on the road; you're someone else now.",
          detay: "Dropping your name was easy.",
        },
        basarisizSonuc: {
          mesaj: "The papers failed under questioning; villagers drove you out.",
          detay: "Even a good lie may find no believer.",
        },
      },
      {
        metin: "Just say 'a traveler fleeing war'.",
        basariliSonuc: {
          mesaj: "Villagers gave you a night's shelter, no questions.",
          detay: "Fugitives like you are common.",
        },
        basarisizSonuc: {
          mesaj: "Met with suspicion, you went on hungry and tired.",
          detay: "Not everyone trusts a fugitive.",
        },
      },
      {
        metin: "Knock at a monastery, ask sanctuary.",
        basariliSonuc: {
          mesaj: "Monks took you in unquestioned; you rested days in a warm bed.",
          detay: "Some doors don't ask your past.",
        },
        basarisizSonuc: {
          mesaj: "The monastery, claiming to be full, turned you away.",
          detay: "Not every door opens.",
        },
      },
    ],
  },

  oc_asker_firari_05: {
    baslik: "A New Name",
    metin:
      "Months on the road, you've nearly forgotten your name. At a port a foreman asks no questions and offers hauling work: low pay, no questions.",
    secenekler: [
      {
        metin: "Take the job, work quietly.",
        basariliSonuc: {
          mesaj: "Days hauling sacks; no one saw a soldier in you.",
          detay: "Callused hands hide a past.",
        },
        basarisizSonuc: {
          mesaj: "A heavy load hurt your back; he still shorted your pay.",
          detay: "Labor goes underpaid here.",
        },
      },
      {
        metin: "Bargain for better pay.",
        basariliSonuc: {
          mesaj: "Your insistence worked; he paid more than expected.",
          detay: "Survival takes some nerve.",
        },
        basarisizSonuc: {
          mesaj: "Bargaining angered him; he fired you and hired another.",
          detay: "A fugitive can't afford attention.",
        },
      },
    ],
  },

  oc_asker_firari_06: {
    baslik: "Sword for Hire",
    metin:
      "A caravan owner read the soldier in your calluses and wants you as escort. Arms mean your old life; hunger is real too.",
    secenekler: [
      {
        metin: "Accept, strap on your sword.",
        basariliSonuc: {
          mesaj: "You guarded the caravan from bandits; the sword felt foreign but worked.",
          detay: "Arms once an army's now serve a merchant.",
        },
        basarisizSonuc: {
          mesaj: "Badly wounded in the raid, the owner still stood by you.",
          detay: "War weighs the same without a uniform.",
        },
      },
      {
        metin: "Refuse, seek unarmed work.",
        basariliSonuc: {
          mesaj: "You shunned weapons and found small work in the warehouses.",
          detay: "The greatest victory is not fighting.",
        },
        basarisizSonuc: {
          mesaj: "No work; you went hungry for days.",
          detay: "Principles don't feed you.",
        },
      },
    ],
  },

  oc_asker_firari_07: {
    baslik: "A Messenger",
    metin:
      "At a market you find a merchant bound for home. You could tell your family you live, but every letter may leave a trail for your hunters.",
    secenekler: [
      {
        metin: "Send the letter, risk it.",
        basariliSonuc: {
          mesaj: "The letter reached your family; for the first time in years you said 'I live'.",
          detay: "Some words are lighter than chains.",
        },
        basarisizSonuc: {
          mesaj: "The merchant talked; strangers came asking and you had to move.",
          detay: "Even love can betray you.",
        },
      },
      {
        metin: "Give up, stay silent.",
        basariliSonuc: {
          mesaj: "You tore up the letter unwritten; safety outweighed longing.",
          detay: "Some silence comes from fear.",
        },
        basarisizSonuc: {
          mesaj: "Indecision gnawed at you; you did nothing, and regret grew.",
          detay: "The worst choice is none.",
        },
      },
    ],
  },

  oc_asker_firari_08: {
    baslik: "A Suspicious Favor",
    metin:
      "A border guard spotted your forged papers and wants money to 'avoid trouble'. You must trust a man who is neither lawman nor friend.",
    secenekler: [
      {
        metin: "Pay him, slip through quietly.",
        basariliSonuc: {
          mesaj: "You paid, he waved you on; a cheap price.",
          detay: "Some doors open only for silver.",
        },
        basarisizSonuc: {
          mesaj: "He took the money and had you caught anyway.",
          detay: "A bribe just sets the next price.",
        },
      },
      {
        metin: "Haggle, pay half.",
        basariliSonuc: {
          mesaj: "He grumbled but agreed; you kept some coin.",
          detay: "Boldness can beat thrift.",
        },
        basarisizSonuc: {
          mesaj: "Haggling enraged him; he took the money and had you beaten.",
          detay: "Some men don't haggle.",
        },
      },
      {
        metin: "Refuse, vanish into the crowd.",
        basariliSonuc: {
          mesaj: "You melted into the crowd; he lost you.",
          detay: "Sometimes fast legs are the way out.",
        },
        basarisizSonuc: {
          mesaj: "Caught, beaten and robbed, you barely escaped alive.",
          detay: "Pride is paid in flesh.",
        },
      },
    ],
  },

  oc_asker_firari_09: {
    baslik: "Bounty Hunters",
    metin:
      "A notice in the inn cries your name and description: deserter, reward. Two men there study you too closely.",
    secenekler: [
      {
        metin: "Slip out quietly, leave no trace.",
        basariliSonuc: {
          mesaj: "You slipped out the back; you left town unnoticed.",
          detay: "The best fight is the one avoided.",
        },
        basarisizSonuc: {
          mesaj: "Caught before the door; you barely survived a hard scuffle.",
          detay: "Even fleeing has a price.",
        },
      },
      {
        metin: "Shadow them, strike first.",
        basariliSonuc: {
          mesaj: "You finished it in a dark alley; the hunters will hunt no more.",
          detay: "Survival changes you.",
        },
        basarisizSonuc: {
          mesaj: "The plan failed; wounded, you barely escaped.",
          detay: "Not every plan holds.",
        },
      },
    ],
  },

  oc_asker_firari_10: {
    baslik: "A Reckoning in a Hut",
    metin:
      "Fleeing a storm, you shelter in a hermit's hut. The old man asks: 'Did you flee, or merely survive?' You can't answer even yourself.",
    secenekler: [
      {
        metin: "Tell the truth, unburden.",
        basariliSonuc: {
          mesaj: "The hermit listened without judging: 'Survival is no sin.'",
          detay: "Some words lighten the load.",
        },
        basarisizSonuc: {
          mesaj: "Your tale unsettled him; he only nodded in silence.",
          detay: "Confession doesn't always bring peace.",
        },
      },
      {
        metin: "Stay silent, leave it unanswered.",
        basariliSonuc: {
          mesaj: "He didn't press; he handed you hot soup.",
          detay: "Some questions deserve no answer.",
        },
        basarisizSonuc: {
          mesaj: "Your silence said more than words; you looked away from his pity.",
          detay: "Silence can speak louder than confession.",
        },
      },
    ],
  },

  oc_asker_firari_11: {
    baslik: "The Old Commander",
    metin:
      "In a market square a face catches you: your old commander, who survived the battle where you were taken. Your eyes meet; did he recognize you?",
    secenekler: [
      {
        metin: "Approach, explain yourself.",
        basariliSonuc: {
          mesaj: "He heard you out: being captured was no cowardice.",
          detay: "One person's faith can ease long shame.",
        },
        basarisizSonuc: {
          mesaj: "He branded you a deserter and called guards; you barely fled.",
          detay: "The past doesn't forgive.",
        },
      },
      {
        metin: "Ignore him, melt into the crowd.",
        basariliSonuc: {
          mesaj: "You walked away; he didn't notice, or pretended not to.",
          detay: "Not facing ghosts is a choice too.",
        },
        basarisizSonuc: {
          mesaj: "Leaving, you felt his gaze; you couldn't sleep that night.",
          detay: "What you flee grows in your mind.",
        },
      },
    ],
  },

  oc_asker_firari_12: {
    baslik: "Eyes That Recognize You",
    metin:
      "In a port city you meet one of the guards who beat you in the camp, now out of uniform, a fugitive too. Each of you holds the other's secret.",
    secenekler: [
      {
        metin: "Talk, propose a truce.",
        basariliSonuc: {
          mesaj: "You struck a silent deal: neither saw the other.",
          detay: "The hardest peace goes unspoken.",
        },
        basarisizSonuc: {
          mesaj: "He stormed off; you don't know if he'll inform.",
          detay: "The past won't make peace.",
        },
      },
      {
        metin: "Slip away unnoticed.",
        basariliSonuc: {
          mesaj: "You vanished into the crowd; your heart raced for hours.",
          detay: "The past waits around the corner.",
        },
        basarisizSonuc: {
          mesaj: "He recognized you and gave chase; you barely escaped.",
          detay: "Some faces find you.",
        },
      },
    ],
  },

  oc_asker_firari_13: {
    baslik: "Forged Papers",
    metin:
      "At the city gate guards check everyone's papers. Your turn comes, and your forgeries get tested.",
    secenekler: [
      {
        metin: "Stay calm, present them boldly.",
        basariliSonuc: {
          mesaj: "The guard skimmed them and let you pass; your hands never shook.",
          detay: "Calm is the best weapon.",
        },
        basarisizSonuc: {
          mesaj: "The guard found a flaw; only a bribe freed you.",
          detay: "Lies don't always fool careful eyes.",
        },
      },
      {
        metin: "Slip away through the crowd.",
        basariliSonuc: {
          mesaj: "With a carter's help you slipped through back streets.",
          detay: "The safest path is staying unseen.",
        },
        basarisizSonuc: {
          mesaj: "Caught fleeing, beaten and robbed, but spared the dungeon.",
          detay: "Fleeing can be riskier than staying.",
        },
      },
    ],
  },

  oc_asker_firari_14: {
    baslik: "A New Flag",
    metin:
      "A foreign lord seeks seasoned fighters; he doesn't ask who you are, only if you can wield a sword. Can you forget fighting under another banner?",
    secenekler: [
      {
        metin: "Join as a mercenary.",
        basariliSonuc: {
          mesaj: "You fought under a new flag; pay was good, but you recalled your old oath.",
          detay: "Flags change, conscience doesn't.",
        },
        basarisizSonuc: {
          mesaj: "Badly wounded in the first clash, you were left unpaid.",
          detay: "A disloyal army exacts a disloyal price.",
        },
      },
      {
        metin: "Refuse, never draw for anyone again.",
        basariliSonuc: {
          mesaj: "You refused; you may starve, but you betrayed no one.",
          detay: "Hunger can't erode some limits.",
        },
        basarisizSonuc: {
          mesaj: "No other work came; you spent your days begging for loans.",
          detay: "Principles don't fill the belly.",
        },
      },
      {
        metin: "Join for one job only.",
        basariliSonuc: {
          mesaj: "You finished the job, took the pay and left.",
          detay: "Not committing can be wise.",
        },
        basarisizSonuc: {
          mesaj: "Lightly wounded, you got half the promised pay.",
          detay: "Even short jobs end hard.",
        },
      },
    ],
  },

  oc_asker_firari_15: {
    baslik: "Road Fever",
    metin:
      "Days of rain have worn you down; fever climbs. In a village with little coin, you must seek help without saying who you are.",
    secenekler: [
      {
        metin: "Risk it, see a healer.",
        basariliSonuc: {
          mesaj: "A healer treated you without questions and took your last coins.",
          detay: "Some see your state, not your past.",
        },
        basarisizSonuc: {
          mesaj: "The healer probed you with suspicious questions; you paid and hurried off.",
          detay: "Trust here is a gamble.",
        },
      },
      {
        metin: "Hide, wait to heal alone.",
        basariliSonuc: {
          mesaj: "Shivering days in an abandoned barn, the fever fell but you're weak.",
          detay: "Sickness alone is the coldest solitude.",
        },
        basarisizSonuc: {
          mesaj: "The fever worsened and you lay senseless until a shepherd found you.",
          detay: "Chance pulled you from death's edge.",
        },
      },
    ],
  },

  oc_asker_firari_16: {
    baslik: "A Chance to Clear Your Name",
    metin:
      "An innkeeper says an officer of your own unit set the ambush that took you. He's on trial; your testimony could sink him but expose you.",
    secenekler: [
      {
        metin: "Go to court, testify.",
        basariliSonuc: {
          mesaj: "Your testimony exposed the officer; you're a 'victim', not a 'fugitive'.",
          detay: "After years, you made peace with your past.",
        },
        basarisizSonuc: {
          mesaj: "The court ignored you and arrested you as a deserter; you barely fled.",
          detay: "Truth can push you deeper in.",
        },
      },
      {
        metin: "Stay silent, stay safe.",
        basariliSonuc: {
          mesaj: "You told him you heard nothing; the chance slipped away.",
          detay: "Some chances don't return.",
        },
        basarisizSonuc: {
          mesaj: "Silence consumed you; at night you still think of that officer.",
          detay: "Unspoken words weigh too.",
        },
      },
    ],
  },

  oc_asker_firari_17: {
    baslik: "A Secret Visit",
    metin:
      "Years later, you pass near home. A few hours' detour could reach your family, but someone in the village may recognize you.",
    secenekler: [
      {
        metin: "Sneak home by night.",
        basariliSonuc: {
          mesaj: "Your mother's astonished eyes were worth everything you carried.",
          detay: "Some moments redeem a life on the run.",
        },
        basarisizSonuc: {
          mesaj: "A neighbor cried out; you fled into the dark without a word.",
          detay: "Closest to love, closest to danger.",
        },
      },
      {
        metin: "Give up, settle for watching from afar.",
        basariliSonuc: {
          mesaj: "From a hill you watched your home's chimney smoke, then turned back.",
          detay: "Sometimes loving means watching from afar.",
        },
        basarisizSonuc: {
          mesaj: "Even looking from afar tore you apart.",
          detay: "Distance doesn't always protect.",
        },
      },
    ],
  },

  oc_asker_firari_18: {
    baslik: "A New Life",
    metin:
      "A small town took you in, no questions. You could open a shop with your savings and live under a false name; maybe you truly are him now.",
    secenekler: [
      {
        metin: "Open the shop, settle in town.",
        basariliSonuc: {
          mesaj: "The shop opened; the town knew you as 'quiet but honest'.",
          detay: "Identity lies in the life you live.",
        },
        basarisizSonuc: {
          mesaj: "Hard first months; no customers, you closed the shop.",
          detay: "A new life costs dearly.",
        },
      },
      {
        metin: "Don't settle, keep moving.",
        basariliSonuc: {
          mesaj: "A week later you shouldered your pack again; roots still feel dangerous.",
          detay: "Some fugitives forget how to stop.",
        },
        basarisizSonuc: {
          mesaj: "Constant motion wore you out; you no longer know what you flee or seek.",
          detay: "Walking nonstop is a prison too.",
        },
      },
      {
        metin: "Half settle, keep an escape ready.",
        basariliSonuc: {
          mesaj: "Half rooted, half ready, you've found your balance.",
          detay: "Safety sometimes means an exit door.",
        },
        basarisizSonuc: {
          mesaj: "Constant vigilance wore you down; neither settled nor ready.",
          detay: "Being caught between is exhausting.",
        },
      },
    ],
  },

  oc_asker_firari_19: {
    baslik: "Caravan Guide",
    metin:
      "You're one of the few who know the mountain passes. A caravan wants a guide; pay is good, but you'll face bandits, nature and your past.",
    secenekler: [
      {
        metin: "Accept the guide job.",
        basariliSonuc: {
          mesaj: "You led the caravan safely through; the merchant is grateful and your name spreads.",
          detay: "All the army left you is knowing these mountains.",
        },
        basarisizSonuc: {
          mesaj: "An avalanche buried half the caravan; your conscience is uneasy.",
          detay: "Nature doesn't care who's a fugitive.",
        },
      },
      {
        metin: "Refuse, seek calmer work.",
        basariliSonuc: {
          mesaj: "You declined and found calmer work at the port.",
          detay: "Not seeking adventure is courage too.",
        },
        basarisizSonuc: {
          mesaj: "No calm work either; you sat idle for days.",
          detay: "Safe-looking roads can betray you too.",
        },
      },
    ],
  },

  oc_asker_firari_20: {
    baslik: "The Final Decision",
    metin:
      "Years under the 'fugitive' brand: was fleeing that night cowardice or the will to live? Perhaps the answer matters less than the question.",
    secenekler: [
      {
        metin: "Leave the past, make the new name your own.",
        basariliSonuc: {
          mesaj: "You no longer wake at night to your old name; this life is real.",
          detay: "Some carry the identity they built.",
        },
        basarisizSonuc: {
          mesaj: "You tried to accept it but still wake to your old name.",
          detay: "Peace doesn't come by decree.",
        },
      },
      {
        metin: "Face your past, reclaim your true identity.",
        basariliSonuc: {
          mesaj: "You chose to bear your old name again, ready for the cost.",
          detay: "Some stop fleeing and return.",
        },
        basarisizSonuc: {
          mesaj: "Calling back the past woke those who wished to forget; you paid dearly.",
          detay: "Some doors never reopen.",
        },
      },
    ],
  },

  oc_asker_hain_01: {
    baslik: "A Code Name",
    metin:
      "The enemy agent finds you again. This time he teaches you a code name, stone-mark signals and a danger phrase. You're part of a system now.",
    secenekler: [
      {
        metin: "Learn the system, obey the rules.",
        basariliSonuc: {
          mesaj: "You memorized the instructions; the agent left pleased.",
          detay: "Escaping a system's cog is hard.",
        },
        basarisizSonuc: {
          mesaj: "You mixed up the signs; the agent lost patience.",
          detay: "No room for error here.",
        },
      },
      {
        metin: "Learn it, but plan an escape in your mind.",
        basariliSonuc: {
          mesaj: "You took the instructions but kept an escape route in mind.",
          detay: "Surviving spies never trust fully.",
        },
        basarisizSonuc: {
          mesaj: "Your distraction was noticed; the agent left suspicious.",
          detay: "Distrust cuts both ways.",
        },
      },
      {
        metin: "Learn, but keep distance, no commitments.",
        basariliSonuc: {
          mesaj: "You didn't surrender fully; the agent sensed it and kept a wary distance.",
          detay: "Half loyalty may be wisest.",
        },
        basarisizSonuc: {
          mesaj: "Your distance looked like distrust; the bond started strained.",
          detay: "Caution breeds suspicion as betrayal does.",
        },
      },
    ],
  },

  oc_asker_hain_02: {
    baslik: "Hidden Gold",
    metin:
      "The gold under your pillow weighs like a crime. Spend it and they'll ask where it came from; keep it and you can't sleep.",
    secenekler: [
      {
        metin: "Bury it, be patient.",
        basariliSonuc: {
          mesaj: "You buried the gold at night where no one knows; safe for now.",
          detay: "Untouchable wealth means nothing.",
        },
        basarisizSonuc: {
          mesaj: "Flocks trampled the spot; you lost some.",
          detay: "Even the safest spot needs luck.",
        },
      },
      {
        metin: "Spend in small amounts, claim gambling winnings.",
        basariliSonuc: {
          mesaj: "You claimed dice winnings and spent a few coins; no one asked.",
          detay: "A small lie covers a big secret, for now.",
        },
        basarisizSonuc: {
          mesaj: "A soldier loudly noted you never play dice; you shuddered.",
          detay: "Every lie has a witness.",
        },
      },
    ],
  },

  oc_asker_hain_03: {
    baslik: "The First Doubt",
    metin:
      "{dost} has noticed you've been distracted and vanish after watch. He looks you in the eye; someone who has known you for years sees through lies.",
    secenekler: [
      {
        metin: "Tell half-truth, invent a love story.",
        basariliSonuc: {
          mesaj: "{dost} believed in a secret lover and swore to keep quiet.",
          detay: "A lie can beat the truth.",
        },
        basarisizSonuc: {
          mesaj: "{dost} didn't buy it: 'You're lying to me,' and walked off.",
          detay: "A friend's doubt outweighs an enemy's.",
        },
      },
      {
        metin: "Snap at him, tell him to stay out.",
        basariliSonuc: {
          mesaj: "{dost} backed off and never asked again, but looks at you differently.",
          detay: "Some bonds are cut to protect them.",
        },
        basarisizSonuc: {
          mesaj: "Your anger made {dost} more suspicious; he watches you now.",
          detay: "Defensive anger looks like guilt.",
        },
      },
      {
        metin: "Ask his help, share the danger.",
        basariliSonuc: {
          mesaj: "{dost} was stunned but didn't expose you; you both carry the secret.",
          detay: "A shared secret lightens or doubles.",
        },
        basarisizSonuc: {
          mesaj: "{dost} was torn between reporting you and loyalty, and went to the commander.",
          detay: "Some secrets can't be shared.",
        },
      },
    ],
  },

  oc_asker_hain_04: {
    baslik: "A False Trail",
    metin:
      "The agent wants one more thing: frame an innocent soldier as the traitor to cover the leak. With forged letters you can shift suspicion.",
    secenekler: [
      {
        metin: "Plant the forgery, sacrifice the innocent.",
        basariliSonuc: {
          mesaj: "The letters were found; the innocent was hanged and you were cleared.",
          detay: "Your conscience won't forget this night.",
        },
        basarisizSonuc: {
          mesaj: "Weak evidence widened the inquiry; the soldier died eyeing you with suspicion.",
          detay: "One more weight on your conscience.",
        },
      },
      {
        metin: "Destroy the evidence, invent an excuse.",
        basariliSonuc: {
          mesaj: "You burned the evidence and told the agent no one suspects.",
          detay: "Saving one man stains you a little less.",
        },
        basarisizSonuc: {
          mesaj: "The agent saw through the lie; you lost his trust and got a threat.",
          detay: "Trusted by neither means enemies on both sides.",
        },
      },
    ],
  },

  oc_asker_hain_05: {
    baslik: "A Caravan Route",
    metin:
      "This time the intel is concrete: next week's supply caravan route. It means gold, and perhaps the lives of drivers who'll die on the road.",
    secenekler: [
      {
        metin: "Give the route, take the big payment.",
        basariliSonuc: {
          mesaj: "You gave the route; the caravan was ambushed and you got your biggest payment.",
          detay: "You imagine the drivers' screams.",
        },
        basarisizSonuc: {
          mesaj: "The caravan turned at the last moment; the agent paid but snapped at you.",
          detay: "Even failed treachery stains.",
        },
      },
      {
        metin: "Distort the route, shield the caravan.",
        basariliSonuc: {
          mesaj: "Your false route saved the caravan; the agent blamed a mistake, and you exhaled.",
          detay: "The best betrayal is none.",
        },
        basarisizSonuc: {
          mesaj: "Your distortion was noticed; the agent suspects you misled him on purpose.",
          detay: "A lie atop a lie is a rope on a rope.",
        },
      },
    ],
  },

  oc_asker_hain_06: {
    baslik: "A Night Interrogation",
    metin:
      "A duty officer has heard of a leak and questions everyone. Your turn comes; even a shifty glance could betray you.",
    secenekler: [
      {
        metin: "Stay cool, answer plainly.",
        basariliSonuc: {
          mesaj: "Your voice held; the officer struck you off the list.",
          detay: "Hiding fear is a bitter skill.",
        },
        basarisizSonuc: {
          mesaj: "Hesitating on one question drew attention; you were detained.",
          detay: "One moment is enough.",
        },
      },
      {
        metin: "Point the inquiry at someone else.",
        basariliSonuc: {
          mesaj: "You pointed at an oddly behaving soldier; the officer turned to him.",
          detay: "Hiding in another's shadow is easy.",
        },
        basarisizSonuc: {
          mesaj: "The soldier you named was innocent; the inquiry returned to you.",
          detay: "Lies rebound when least expected.",
        },
      },
      {
        metin: "Confess a petty crime (gambling debt).",
        basariliSonuc: {
          mesaj: "You confessed a gambling debt; the officer found it enough and let you go.",
          detay: "A small truth hides a big lie.",
        },
        basarisizSonuc: {
          mesaj: "The officer found it lacking and dug deeper.",
          detay: "A small confession breeds bigger doubts.",
        },
      },
    ],
  },

  oc_asker_hain_07: {
    baslik: "The Enemy's Table",
    metin:
      "At the meeting the usual agent is gone; in his place a young, sharp-eyed man as weary as you. Your talk drifts quickly from business.",
    secenekler: [
      {
        metin: "Keep distance, finish and leave.",
        basariliSonuc: {
          mesaj: "You kept it short and left; no more than needed.",
          detay: "Solitude is the safe refuge.",
        },
        basarisizSonuc: {
          mesaj: "Your silence struck him as odd; he grew suspicious.",
          detay: "Coldness draws notice too.",
        },
      },
      {
        metin: "Let him talk, trust a little.",
        basariliSonuc: {
          mesaj: "You talked for hours; for the first time you shared being caught between two worlds.",
          detay: "Sharing the same darkness brings odd peace.",
        },
        basarisizSonuc: {
          mesaj: "You opened up too much; he took it for weakness and fished for more.",
          detay: "Even trust can be a weapon.",
        },
      },
    ],
  },

  oc_asker_hain_08: {
    baslik: "The Price of the Man-at-Arms",
    metin:
      "Your rank got you into the war council; you now hear the entire campaign plan. The agent returns with a far bigger offer.",
    secenekler: [
      {
        metin: "Sell the whole campaign plan.",
        basariliSonuc: {
          mesaj: "You gave the full plan; the agent called you a 'valued partner'.",
          detay: "The more you're worth, the more you can lose.",
        },
        basarisizSonuc: {
          mesaj: "Someone may have seen you taking notes at the door; you held your breath for days.",
          detay: "Big secrets carry big penalties.",
        },
      },
      {
        metin: "Give only an unimportant part.",
        basariliSonuc: {
          mesaj: "The piece meant little alone; the agent was disappointed but made do.",
          detay: "Small betrayals add up.",
        },
        basarisizSonuc: {
          mesaj: "The agent called it useless and snapped at you; trust frayed.",
          detay: "Half-treachery pleases no one.",
        },
      },
    ],
  },

  oc_asker_hain_09: {
    baslik: "An Unpaid Debt",
    metin:
      "A moneylender checks the barracks' debt records and sees you have no debt, yet don't look poor. He asks the source of your 'hidden wealth'.",
    secenekler: [
      {
        metin: "Pay him hush money.",
        basariliSonuc: {
          mesaj: "You gave him a small sum; he swallowed his questions.",
          detay: "Silence is cheaper than gossip.",
        },
        basarisizSonuc: {
          mesaj: "The hush money wasn't enough; he began spreading whispers.",
          detay: "Some mouths aren't shut by gold.",
        },
      },
      {
        metin: "Threaten him: talk and you'll regret it.",
        basariliSonuc: {
          mesaj: "The threat worked; he never came near again.",
          detay: "Fear buys steadier silence than loyalty.",
        },
        basarisizSonuc: {
          mesaj: "He didn't yield and went to the commander to complain.",
          detay: "A show of force exposes weakness.",
        },
      },
      {
        metin: "Make him a partner, share the secret.",
        basariliSonuc: {
          mesaj: "You brought him in; he now answers questions in your place.",
          detay: "Each partner is a shield and a weak spot.",
        },
        basarisizSonuc: {
          mesaj: "He turned greedy and threatened you for more.",
          detay: "Sharing a secret shares control of it.",
        },
      },
    ],
  },

  oc_asker_hain_10: {
    baslik: "An Offer to Come Back",
    metin:
      "An old officer at HQ pulls you aside: intelligence suspects a leak but wants to blame no one. Feed the enemy false intel and you may protect your army.",
    secenekler: [
      {
        metin: "Feed false intel, protect your army.",
        basariliSonuc: {
          mesaj: "The false intel sent the enemy astray; your army escaped a blow.",
          detay: "Traitor or not, tonight you stood with your own.",
        },
        basarisizSonuc: {
          mesaj: "The agent caught the falsehood and made you pay dearly; trust shattered.",
          detay: "Deceiving both sides is the deadliest game.",
        },
      },
      {
        metin: "Take no risk, carry on as usual.",
        basariliSonuc: {
          mesaj: "You passed on the chance; business went on and your purse filled.",
          detay: "Doing nothing is also a choice.",
        },
        basarisizSonuc: {
          mesaj: "The intel you gave that night caused heavy losses; your conscience wouldn't let go.",
          detay: "Silence has a price too.",
        },
      },
    ],
  },

  oc_asker_hain_11: {
    baslik: "A Caught Courier",
    metin:
      "Your courier was caught by a border patrol. He carries nothing, but may talk. Rescue is risky; abandoning him is silent murder.",
    secenekler: [
      {
        metin: "Bribe the patrol to free him.",
        basariliSonuc: {
          mesaj: "You secretly paid the patrol commander; the courier was freed.",
          detay: "Money is the one trusted language.",
        },
        basarisizSonuc: {
          mesaj: "The bribe was refused and noticed; you may be questioned too.",
          detay: "Rescuing may sink you too.",
        },
      },
      {
        metin: "Leave him to fate, keep quiet.",
        basariliSonuc: {
          mesaj: "The courier came out silent and you're safe, but you won't forget abandoning him.",
          detay: "Some victories taste bitter.",
        },
        basarisizSonuc: {
          mesaj: "Under pressure the courier named you; you hear them in every footstep.",
          detay: "Those you abandon drag you down.",
        },
      },
      {
        metin: "Find him before questioning, tell him to stay silent.",
        basariliSonuc: {
          mesaj: "You met him in the dark and persuaded him; he swore silence and kept it.",
          detay: "Sometimes the riskiest path is the honest one.",
        },
        basarisizSonuc: {
          mesaj: "The meeting was seen; you're both in the same interrogation room.",
          detay: "Direct action pulls you into the crime.",
        },
      },
    ],
  },

  oc_asker_hain_12: {
    baslik: "The Promotion Feast",
    metin:
      "A barracks feast honors your promotion; the commander praises you, comrades toast. In this warmth you realize how alone you are.",
    secenekler: [
      {
        metin: "Live the moment, feel one of them.",
        basariliSonuc: {
          mesaj: "You joined the laughter; for a moment you forgot you were a traitor.",
          detay: "Belonging is the most dangerous moment.",
        },
        basarisizSonuc: {
          mesaj: "Drink loosened your tongue; you let something slip and covered in panic.",
          detay: "Even cheer can be a trap.",
        },
      },
      {
        metin: "Stay distant, drink little, stay alert.",
        basariliSonuc: {
          mesaj: "You raised your cup but kept your mind alert; no one suspected.",
          detay: "Vigilance is a habit with a cost.",
        },
        basarisizSonuc: {
          mesaj: "Your coldness was noticed: 'He doesn't even enjoy his own promotion.'",
          detay: "Caution draws suspicion as joy does.",
        },
      },
    ],
  },

  oc_asker_hain_13: {
    baslik: "An Unspoken Sin",
    metin:
      "A wandering monk hears confessions at the barracks. You kneel, but your true sin would hang you; you list only petty ones.",
    secenekler: [
      {
        metin: "Confess without the truth.",
        basariliSonuc: {
          mesaj: "The monk blessed you and you felt lighter, but the real burden remained.",
          detay: "An unspoken sin is never forgiven.",
        },
        basarisizSonuc: {
          mesaj: "The monk's look was odd, as if he sensed what you left out.",
          detay: "Some eyes hear the unsaid.",
        },
      },
      {
        metin: "Refuse to kneel, skip the line.",
        basariliSonuc: {
          mesaj: "You skipped the line; at least you told no further lie.",
          detay: "Some burdens must be carried.",
        },
        basarisizSonuc: {
          mesaj: "Your avoidance was noticed; some whispered 'faithless'.",
          detay: "Everything you dodge leaves a question.",
        },
      },
    ],
  },

  oc_asker_hain_14: {
    baslik: "The Price of a Comrade-in-Arms",
    metin:
      "The agent asks which unit will meet the enemy raid: your closest comrade's. Telling sends them to death.",
    secenekler: [
      {
        metin: "Give it up, think of yourself.",
        basariliSonuc: {
          mesaj: "You gave it; the unit was ambushed and {dost} never returned.",
          detay: "Some nights are never forgotten, only buried.",
        },
        basarisizSonuc: {
          mesaj: "The ambush half-failed; wounded {dost} returned, eyeing you with strange gratitude.",
          detay: "His survival only shrinks you.",
        },
      },
      {
        metin: "Give false intel, protect your friend.",
        basariliSonuc: {
          mesaj: "The false intel worked; {dost} lived and the agent didn't notice.",
          detay: "Peace came not from treachery but from failing at it.",
        },
        basarisizSonuc: {
          mesaj: "The agent saw through the lie, called you 'untrustworthy' and threatened you gravely.",
          detay: "Even kindness has a price here.",
        },
      },
      {
        metin: "Give part, handle both agent and friend.",
        basariliSonuc: {
          mesaj: "You gave the agent enough truth and {dost} enough warning; losses shrank.",
          detay: "The best betrayal sells no one fully.",
        },
        basarisizSonuc: {
          mesaj: "The balance failed; the agent grew suspicious and the unit was caught unprepared.",
          detay: "Ride two horses and fall from both.",
        },
      },
    ],
  },

  oc_asker_hain_15: {
    baslik: "The Commander's Table",
    metin:
      "Since your promotion to commander every map and sealed order passes your hands. The agent sees you not as a source but as a piece that could turn the war.",
    secenekler: [
      {
        metin: "Hand over the whole strategy, give the enemy victory.",
        basariliSonuc: {
          mesaj: "You gave the full strategy; the agent now treats you almost as an equal.",
          detay: "The higher you climb, the deeper the fall.",
        },
        basarisizSonuc: {
          mesaj: "Some commanders suspect a leak; every quiet day is a miracle.",
          detay: "Each step at the top nears the cliff.",
        },
      },
      {
        metin: "Leak only the non-critical part, stay balanced.",
        basariliSonuc: {
          mesaj: "The piece was valuable but didn't change the war; the agent made do.",
          detay: "Balance may be the only way to survive.",
        },
        basarisizSonuc: {
          mesaj: "The agent expected more and left in threatening silence.",
          detay: "Half-treachery satisfies no one.",
        },
      },
    ],
  },

  oc_asker_hain_16: {
    baslik: "Sleepless Nights",
    metin:
      "Living between two worlds is wearing you down: shaking hands, no sleep. One night on watch you muttered in delirium, unsure what you said.",
    secenekler: [
      {
        metin: "Ask the surgeon for help, feign illness.",
        basariliSonuc: {
          mesaj: "The surgeon gave you a root mixture; you slept easy a few nights.",
          detay: "Body mended, mind still split.",
        },
        basarisizSonuc: {
          mesaj: "The surgeon sensed more than mere fatigue; his questions made you sweat.",
          detay: "Even asking for help is risky.",
        },
      },
      {
        metin: "Stay unseen, endure alone.",
        basariliSonuc: {
          mesaj: "You endured quietly; no one noticed, but each morning grew harder.",
          detay: "Unshared burdens just sink deeper.",
        },
        basarisizSonuc: {
          mesaj: "You collapsed on watch; those who found you wonder what you said.",
          detay: "The body returns what the mind can't carry.",
        },
      },
    ],
  },

  oc_asker_hain_17: {
    baslik: "The Final Offer",
    metin:
      "The agent speaks openly now: the enemy command offers rank, land and a new name across the border. In return: one last betrayal and never returning.",
    secenekler: [
      {
        metin: "Accept, cross to the enemy.",
        basariliSonuc: {
          mesaj: "You left the barracks by night; a 'traitor' here, under a new name beyond the border.",
          detay: "Building a new life is lonelier than it sounds.",
        },
        basarisizSonuc: {
          mesaj: "A border patrol spotted you fleeing; you barely escaped, a suspect to both sides.",
          detay: "Plans collapse when you trust them most.",
        },
      },
      {
        metin: "Refuse, you've gone far enough.",
        basariliSonuc: {
          mesaj: "You refused; the agent left disappointed but made no threat.",
          detay: "To draw a line, see how far you've gone.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal enraged the agent: 'Someone who knows this much can't go free.'",
          detay: "Even withdrawing has a cost.",
        },
      },
      {
        metin: "Stall, give no firm answer.",
        basariliSonuc: {
          mesaj: "You said you need to think; the agent waited, trust fading.",
          detay: "Stalling only postpones the reckoning.",
        },
        basarisizSonuc: {
          mesaj: "Your hesitation wore him out: 'Be with me or with no one.'",
          detay: "Hesitation has a price too.",
        },
      },
    ],
  },

  oc_asker_hain_18: {
    baslik: "An Innocent Man",
    metin:
      "The soldier you blamed years ago still drags shackles in a mine. His family's petition reopens the file; your name is among the witnesses.",
    secenekler: [
      {
        metin: "Use your influence to quietly close the file.",
        basariliSonuc: {
          mesaj: "The file closed, he stayed in the mine; no one accused you, but conscience judged.",
          detay: "Injustice multiplies when covered up.",
        },
        basarisizSonuc: {
          mesaj: "Your meddling was noticed; they began asking why you care so much.",
          detay: "Burying the past can dig it deeper.",
        },
      },
      {
        metin: "Expose the truth by anonymous letter, free the man.",
        basariliSonuc: {
          mesaj: "The letter reopened the file; the man was freed and the sender stayed unknown.",
          detay: "Righting a wrong, even late, lightens you.",
        },
        basarisizSonuc: {
          mesaj: "Your handwriting was recognized; they pursue both your old lie and new confession.",
          detay: "Clearing your conscience can drag you from hiding.",
        },
      },
    ],
  },

  oc_asker_hain_19: {
    baslik: "The Hidden Chest",
    metin:
      "A sudden barracks search: a senior officer ransacks belongings over a theft. Your chest holds hoarded gold and the agent's seal.",
    secenekler: [
      {
        metin: "Move your things elsewhere before the search.",
        basariliSonuc: {
          mesaj: "At the last moment you hid everything in a friend's saddlebag; the search passed you by.",
          detay: "Heart in throat, but you got off cheap.",
        },
        basarisizSonuc: {
          mesaj: "A sentry caught your eye as you carried it; now you must explain where it came from.",
          detay: "Panicked choices leave tracks.",
        },
      },
      {
        metin: "Take no risk, stay put, await the search.",
        basariliSonuc: {
          mesaj: "The officer rummaged lazily and missed the cloth beneath the gold.",
          detay: "Sometimes waiting is the best strategy.",
        },
        basarisizSonuc: {
          mesaj: "The officer found the seal, eyes hardening; questions rise to HQ's top.",
          detay: "One small object can unmask years of secrets.",
        },
      },
      {
        metin: "Confess a small private matter to the officer.",
        basariliSonuc: {
          mesaj: "You claimed a hidden letter in the chest; he searched only superficially.",
          detay: "A small shame can eclipse a big crime.",
        },
        basarisizSonuc: {
          mesaj: "He didn't believe you and tightened the search.",
          detay: "Distractions sometimes backfire.",
        },
      },
    ],
  },

  oc_asker_hain_20: {
    baslik: "The Final Reckoning",
    metin:
      "Your hair has grayed, your sword grown heavy. One night the weight of a double life falls: take the secret to the grave, or speak the truth?",
    secenekler: [
      {
        metin: "Stay silent, carry the secret to the grave.",
        basariliSonuc: {
          mesaj: "You said nothing; the barracks will remember a 'loyal, silent soldier'.",
          detay: "Some truths are buried with their bearer.",
        },
        basarisizSonuc: {
          mesaj: "On your deathbed a few words slipped; those near blamed fever, hopefully so.",
          detay: "As the body weakens, so does the secret.",
        },
      },
      {
        metin: "Tell someone you trust the truth, one last time.",
        basariliSonuc: {
          mesaj: "You shared the burden of years; he listened without judging.",
          detay: "Sometimes all you need is another ear.",
        },
        basarisizSonuc: {
          mesaj: "The confession spread fast; history will call you 'traitor', but you died honest.",
          detay: "Truth, though late, has its price.",
        },
      },
    ],
  },
};
