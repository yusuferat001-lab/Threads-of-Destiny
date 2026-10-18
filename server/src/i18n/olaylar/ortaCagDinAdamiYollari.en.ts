import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagDinAdamiYollari.ts — İngilizce çevirileri (85 olay). */
export const OLAYLAR_ORTACAG_DINADAMI_YOLLARI_EN: Record<string, OlayCeviri> = {
  oc_din_yol_ilk_sinav: {
    baslik: "The First Test",
    metin:
      "You're newly assigned to the congregation. A dying beggar is at your door; a rich merchant offers a donation for 'a small service'.",
    secenekler: [
      {
        metin: "Give the beggar your time, refuse the merchant.",
        basariliSonuc: {
          mesaj: "You held the beggar's hand; you were at peace without the merchant's money.",
          detay: "Some service expects nothing back.",
        },
        basarisizSonuc: {
          mesaj: "The beggar died in your arms; this first loss shook you deeply.",
          detay: "Good intent can't stop pain.",
        },
      },
      {
        metin: "Accept the merchant's donation.",
        basariliSonuc: {
          mesaj: "The coffer filled; you had no time left for the beggar.",
          detay: "Opportunity comes once.",
        },
        basarisizSonuc: {
          mesaj: "Whispers of 'selling faith for money' began; a small profit remained.",
          detay: "Your interests show.",
        },
      },
      {
        metin: "Find both suspect, report them upward.",
        basariliSonuc: {
          mesaj:
            "Superiors noted you as 'by the book'; discipline became your nature.",
          detay: "Rules are a refuge for some.",
        },
        basarisizSonuc: {
          mesaj: "Your report was deemed 'excessive'; the congregation thinks you cold.",
          detay: "Rigidity isolates.",
        },
      },
      {
        metin: "Dive into an old unofficial text.",
        basariliSonuc: {
          mesaj: "You dove into the old text; an unfamiliar curiosity woke.",
          detay: "Some questions lead beyond doctrine.",
        },
        basarisizSonuc: {
          mesaj: "Your indifference was noticed; the congregation grumbled.",
          detay: "Your mind was elsewhere.",
        },
      },
    ],
  },

  oc_din_yol_karsiliksiz_sinav: {
    baslik: "A Test Without Reward",
    metin:
      "Lying as a witness in an inheritance case could win the congregation a big donation and you a small cut. No one will learn; only you will know.",
    secenekler: [
      {
        metin: "Refuse; keep your honesty.",
        basariliSonuc: {
          mesaj: "You refused; no one knows, but you do. You're truly honest now.",
          detay: "Character forms where no one sees.",
        },
        basarisizSonuc: {
          mesaj: "Some mocked your refusal as 'naive'; your conscience is clean.",
          detay: "Honesty has a price.",
        },
      },
      {
        metin: "Accept, but donate your cut to the congregation.",
        basariliSonuc: {
          mesaj: "You gave away your own cut too; you became a local legend.",
          detay: "The right way is the hardest.",
        },
        basarisizSonuc: {
          mesaj: "Your intent was misread; still, no one spoke ill of you.",
          detay: "Good intent isn't always understood.",
        },
      },
    ],
  },

  oc_din_yol_daha_buyuk_firsat: {
    baslik: "A Bigger Opportunity",
    metin:
      "The same merchant now proposes forging a holy relic to sell to pilgrims. Huge gain; but if exposed, your reputation is finished.",
    secenekler: [
      {
        metin: "Accept, grow the business.",
        basariliSonuc: {
          mesaj:
            "The fake relic gained fame, your coffer overflowed. You run faith like a business.",
          detay: "Your conscience grows quieter.",
        },
        basarisizSonuc: {
          mesaj: "A traveling scholar spotted the forgery; reputation shaken, money pocketed.",
          detay: "Gain came, trust went.",
        },
      },
      {
        metin: "Refuse, but try smaller deals with him.",
        basariliSonuc: {
          mesaj: "You skipped the big risk but kept small gains; you're slowly getting rich.",
          detay: "Greed has its own wisdom.",
        },
        basarisizSonuc: {
          mesaj: "Even small deals showed; the congregation noticed the odd closeness.",
          detay: "Even caution isn't enough.",
        },
      },
    ],
  },

  oc_din_yol_sapkinlik_suphesi: {
    baslik: "A Suspicion of Heresy",
    metin:
      "Superiors have you probe a 'heresy' rumor. Evidence is weak; you can inflate it for fame or quietly close it.",
    secenekler: [
      {
        metin: "Escalate it into an exemplary case.",
        basariliSonuc: {
          mesaj:
            "The probe made a stir; you're seen as 'a true guardian'. Spoken of with fear.",
          detay: "Power is sometimes born of fear.",
        },
        basarisizSonuc: {
          mesaj:
            "The case collapsed, innocents suffered; you were warned 'too far'.",
          detay: "Forgiven, not forgotten.",
        },
      },
      {
        metin: "Act with restraint; secretly stockpile files.",
        basariliSonuc: {
          mesaj: "Outwardly restrained; now you hold a file to silence anyone.",
          detay: "Patient bullying is still bullying.",
        },
        basarisizSonuc: {
          mesaj:
            "A file leaked; no one knows why you kept notes, but they're wary now.",
          detay: "Secret motives come half to light.",
        },
      },
    ],
  },

  oc_din_yol_golgede_cemaat: {
    baslik: "A Congregation Gathered in the Shadows",
    metin:
      "Your research led you to a secret circle in the outskirts, broken from official doctrine. They invite you in.",
    secenekler: [
      {
        metin: "Join, aim to lead it in time.",
        basariliSonuc: {
          mesaj: "You joined; you're at the core of a small loyal circle. The first seed of your power.",
          detay: "Some kingdoms start with a candle.",
        },
        basarisizSonuc: {
          mesaj: "The first meeting met you with mistrust; still, a door cracked open.",
          detay: "Building power takes time.",
        },
      },
      {
        metin: "Report them harshly; let the institution crush them.",
        basariliSonuc: {
          mesaj: "Your report broke the circle; superiors see you as a heresy cleanser.",
          detay: "One answer opens another path.",
        },
        basarisizSonuc: {
          mesaj: "The report lacked proof; your harshness was noted.",
          detay: "Harshness leaves a mark.",
        },
      },
      {
        metin: "Approach with compassion; win them back.",
        basariliSonuc: {
          mesaj: "Your patience won back a few; the rest respect you.",
          detay: "The strongest way is the softest.",
        },
        basarisizSonuc: {
          mesaj: "Your efforts failed and the circle carried on; your intent was pure.",
          detay: "Good intent doesn't always deliver.",
        },
      },
    ],
  },

  oc_din_durust_01: {
    baslik: "The Famine Granary",
    metin:
      "Famine grips the region; the granary holds your congregation's winter grain, and hundreds of hungry peasants wait outside. Sharing may starve your own.",
    secenekler: [
      {
        metin: "Share the granary with the peasants.",
        basariliSonuc: {
          mesaj: "You opened the granary; all survived the winter, weak but alive.",
          detay: "Shared hunger weighs less.",
        },
        basarisizSonuc: {
          mesaj: "The winter dragged on; your congregation starved too, and you weakened.",
          detay: "Kindness can cost dearly.",
        },
      },
      {
        metin: "Think only of your flock; keep it shut.",
        basariliSonuc: {
          mesaj: "Your flock wintered comfortably; you can't forget the starving eyes.",
          detay: "Safety is bought with conscience.",
        },
        basarisizSonuc: {
          mesaj: "Peasants learned of the granary and stormed it; sacks were seized by force.",
          detay: "What's hidden comes out.",
        },
      },
      {
        metin: "Give your own portion to a few families.",
        basariliSonuc: {
          mesaj: "You gave your portion to a few families; something changed.",
          detay: "You made a small difference.",
        },
        basarisizSonuc: {
          mesaj: "The portion barely fed a few families; the rest blamed you too.",
          detay: "Good intent didn't reach everyone.",
        },
      },
    ],
  },

  oc_din_durust_02: {
    baslik: "A Corvée Order",
    metin:
      "The lord demands corvée labor from your peasants for a road, at harvest time. He hints that objecting is rebellion.",
    secenekler: [
      {
        metin: "Ask the lord to postpone the corvée.",
        basariliSonuc: {
          mesaj: "You persuaded the lord; the corvée waited until after harvest. Peasants are grateful.",
          detay: "Your courage paid off.",
        },
        basarisizSonuc: {
          mesaj: "The lord ignored you, warned 'don't go too far'; the corvée went ahead.",
          detay: "Asking for right isn't always heard.",
        },
      },
      {
        metin: "Secretly help peasants dodge it.",
        basariliSonuc: {
          mesaj: "You secretly spared a few families; no one betrayed you.",
          detay: "Silent resistance is resistance.",
        },
        basarisizSonuc: {
          mesaj: "Your help came out; you were warned and the congregation was heavily fined.",
          detay: "Others pay the price too.",
        },
      },
    ],
  },

  oc_din_durust_03: {
    baslik: "The Two Brothers' Case",
    metin:
      "A dead farmer's two sons fight over his only field and ask you to arbitrate. The younger is poorer; the right may lie with the elder.",
    secenekler: [
      {
        metin: "Hear the witnesses, rule impartially.",
        basariliSonuc: {
          mesaj: "The verdict seemed fair; the elder won but set aside a share for the younger.",
          detay: "Justice can run on persuasion.",
        },
        basarisizSonuc: {
          mesaj: "Neither accepted it; both accused you of taking sides.",
          detay: "Fair doesn't mean pleasing all.",
        },
      },
      {
        metin: "Pity the younger, rule for him.",
        basariliSonuc: {
          mesaj: "The younger got the field and kissed your hand; the elder never forgave you.",
          detay: "Compassion outran justice.",
        },
        basarisizSonuc: {
          mesaj: "The elder won at the lord's court; your fairness was questioned.",
          detay: "Mercy doesn't change truth.",
        },
      },
      {
        metin: "Persuade them to farm it together.",
        basariliSonuc: {
          mesaj: "After a long night's talk, the brothers agreed to share the field.",
          detay: "Some solutions are born of patience.",
        },
        basarisizSonuc: {
          mesaj: "Both found it ridiculous; the case went to court.",
          detay: "Peace is a hard sell.",
        },
      },
    ],
  },

  oc_din_durust_04: {
    baslik: "The Abandoned Patient",
    metin:
      "A man with a contagious disease was cast out even by his family; he lies dying in a hut outside town that no one approaches.",
    secenekler: [
      {
        metin: "Go to him, care for him.",
        basariliSonuc: {
          mesaj: "You stayed by him for days; he recovered and never forgot you.",
          detay: "No one saw, and it didn't matter.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't save him and caught the disease; weeks at death's door.",
          detay: "Only conscience knows some prices.",
        },
      },
      {
        metin: "Leave food and prayers from afar.",
        basariliSonuc: {
          mesaj: "You left food daily; the man didn't die entirely alone.",
          detay: "Not full sacrifice, but better than nothing.",
        },
        basarisizSonuc: {
          mesaj: "One morning you found him dead in the hut; no one was with him.",
          detay: "Help from afar can come too late.",
        },
      },
    ],
  },

  oc_din_durust_05: {
    baslik: "Nameless Help",
    metin:
      "A young widow can't feed her children but pride keeps her from asking. You must help without shaming her, in secret.",
    secenekler: [
      {
        metin: "Leave provisions at her door at night.",
        basariliSonuc: {
          mesaj: "For months you left provisions secretly; she never learned who.",
          detay: "The lasting kindnesses go unsigned.",
        },
        basarisizSonuc: {
          mesaj: "Rushing, you knocked over the basket; neighbors asked who did it.",
          detay: "Staying hidden isn't easy.",
        },
      },
      {
        metin: "Find a merchant go-between.",
        basariliSonuc: {
          mesaj: "The merchant kept his word; she never knew the source.",
          detay: "Keeping a secret is harder than giving.",
        },
        basarisizSonuc: {
          mesaj: "The merchant let your name slip; ashamed, she stopped coming.",
          detay: "Kindness can't always hide.",
        },
      },
      {
        metin: "Enroll her in the aid fund, unnamed.",
        basariliSonuc: {
          mesaj: "Regular aid flowed from the fund; she felt indebted to no one.",
          detay: "A system can be kinder.",
        },
        basarisizSonuc: {
          mesaj: "The fund fell short; aid lasted only months.",
          detay: "Good plans need resources.",
        },
      },
    ],
  },

  oc_din_durust_06: {
    baslik: "A Colleague's Sin",
    metin:
      "A respected clergyman nearby collects money from families for 'extra prayers' for the dead. Exposing him could shake the institution too.",
    secenekler: [
      {
        metin: "Report him to superiors.",
        basariliSonuc: {
          mesaj: "He was investigated and removed; some called you a 'snitch'.",
          detay: "Doing right didn't make you liked.",
        },
        basarisizSonuc: {
          mesaj: "Evidence fell short, the case closed; he now holds a grudge.",
          detay: "Truth doesn't always deliver.",
        },
      },
      {
        metin: "Speak privately; ask him to stop.",
        basariliSonuc: {
          mesaj: "After a long talk he stopped; it stayed between you.",
          detay: "Some fixes happen quietly.",
        },
        basarisizSonuc: {
          mesaj: "He saw you as a threat; you made an enemy and the practice went on.",
          detay: "Even kind warnings breed hostility.",
        },
      },
    ],
  },

  oc_din_durust_07: {
    baslik: "The Usurer's Offer",
    metin:
      "The region's biggest usurer promises donations if you don't call his harshness toward debtors a 'sin'. Silence leaves families homeless.",
    secenekler: [
      {
        metin: "Refuse; denounce him in your sermon.",
        basariliSonuc: {
          mesaj: "Your sermon gave peasants courage; some renegotiated.",
          detay: "You saw your words carry weight.",
        },
        basarisizSonuc: {
          mesaj: "He pulled the donation and smeared you; a few families lost homes anyway.",
          detay: "The right word isn't always enough.",
        },
      },
      {
        metin: "Stay silent; pass the donation to debtors.",
        basariliSonuc: {
          mesaj: "Most of the donation reached the debtors; he never knew.",
          detay: "Not a victory, but families kept homes.",
        },
        basarisizSonuc: {
          mesaj: "The money trail came out; he called you a 'hypocrite' everywhere.",
          detay: "Secret kindness can look dirty.",
        },
      },
    ],
  },

  oc_din_durust_08: {
    baslik: "The Forgotten Elder",
    metin:
      "The congregation's oldest member can't walk and his children are far away; no one visits, he can't even cook.",
    secenekler: [
      {
        metin: "Visit daily and care for him yourself.",
        basariliSonuc: {
          mesaj: "You went daily for months; when he died, you held his hand.",
          detay: "Unseen loyalty is loyalty.",
        },
        basarisizSonuc: {
          mesaj: "Caring for him, you neglected your duties in the congregation.",
          detay: "Kindness is paid in stolen time.",
        },
      },
      {
        metin: "Find volunteers to share his care.",
        basariliSonuc: {
          mesaj: "Volunteers began taking turns; the old man is no longer alone.",
          detay: "Best help calls others to kindness.",
        },
        basarisizSonuc: {
          mesaj: "Volunteers tired within weeks; care fell back to you.",
          detay: "Calls to duty don't always last.",
        },
      },
    ],
  },

  oc_din_durust_09: {
    baslik: "A Sermon Against Injustice",
    metin:
      "The lord had an old farmer who couldn't pay his tax whipped as an example. Silence means approval; speaking draws his wrath.",
    secenekler: [
      {
        metin: "Condemn the injustice openly in your sermon.",
        basariliSonuc: {
          mesaj: "Your words echoed; the lord raged, but the congregation never loved you more.",
          detay: "Some sermons are never forgotten.",
        },
        basarisizSonuc: {
          mesaj: "The lord called it 'incitement' and revoked the congregation's privileges.",
          detay: "Everyone pays for the right word.",
        },
      },
      {
        metin: "Give a general sermon on mercy.",
        basariliSonuc: {
          mesaj: "You preached mercy without naming anyone; all got the hint, none took offense.",
          detay: "Indirect words can change things.",
        },
        basarisizSonuc: {
          mesaj: "The congregation whispered you 'shied from the truth'.",
          detay: "Caution gets mistaken for cowardice.",
        },
      },
    ],
  },

  oc_din_durust_10: {
    baslik: "A Rumor of Sainthood",
    metin:
      "Peasants who saw you tend the sick claim they saw a 'holy light' over you. The rumor grows; some liken you to a saint.",
    secenekler: [
      {
        metin: "Deny it; say you only did your duty.",
        basariliSonuc: {
          mesaj: "You kept denying it; some still believe, but trust deepened.",
          detay: "Humility earns great esteem.",
        },
        basarisizSonuc: {
          mesaj: "However much you denied it, the rumor spread on its own.",
          detay: "Stories live independently of their subject.",
        },
      },
      {
        metin: "Stay out; neither confirm nor deny.",
        basariliSonuc: {
          mesaj: "Your silence fed the rumor; people came from distant villages.",
          detay: "What you don't say speaks too.",
        },
        basarisizSonuc: {
          mesaj: "Some colleagues read your silence as arrogance or fraud.",
          detay: "Neither silence nor speech is read right.",
        },
      },
    ],
  },

  oc_din_durust_11: {
    baslik: "A Cry Within a Secret",
    metin:
      "A woman at confession whispers that her husband beats her and the children; she begs 'tell no one'. He is a respected member.",
    secenekler: [
      {
        metin: "Keep the secret; find her refuge.",
        basariliSonuc: {
          mesaj: "You hid the woman and children with a distant relative; no one knew.",
          detay: "No justice, but they're safe.",
        },
        basarisizSonuc: {
          mesaj: "The husband blamed you for her disappearance and began threatening you.",
          detay: "Even quiet rescues get noticed.",
        },
      },
      {
        metin: "Persuade her to go to the authorities.",
        basariliSonuc: {
          mesaj: "She complained, the husband was punished; you never broke the secret.",
          detay: "Best help lets someone find their voice.",
        },
        basarisizSonuc: {
          mesaj: "She got scared and withdrew; the husband found out and drove her from the congregation.",
          detay: "Courage isn't always enough.",
        },
      },
      {
        metin: "Break the secret; report it to superiors.",
        basariliSonuc: {
          mesaj: "Superiors intervened and the family is protected; no one confides in you now.",
          detay: "You sacrificed a value to save a life.",
        },
        basarisizSonuc: {
          mesaj: "Word got out; confessions stopped, and help never reached her.",
          detay: "No secret kept, no woman saved.",
        },
      },
    ],
  },

  oc_din_durust_12: {
    baslik: "In the Flames",
    metin:
      "At midnight a neighbor's house is ablaze; someone is clearly inside. No one dares enter, and you hesitate.",
    secenekler: [
      {
        metin: "Rush in; save the child.",
        basariliSonuc: {
          mesaj: "You groped through smoke and got the child out; the burns left scars.",
          detay: "Some moments demand acting without thinking.",
        },
        basarisizSonuc: {
          mesaj: "Smoke brought you down and you were dragged out; you couldn't reach the child.",
          detay: "Courage isn't always enough.",
        },
      },
      {
        metin: "Stay out; organize a water chain.",
        basariliSonuc: {
          mesaj: "Thanks to your chain, the fire was put out before spreading.",
          detay: "Not all heroism is in the flames.",
        },
        basarisizSonuc: {
          mesaj: "Despite your efforts the house burned; the child couldn't be saved.",
          detay: "Some nights end in pain.",
        },
      },
    ],
  },

  oc_din_durust_13: {
    baslik: "A Cold Night",
    metin:
      "A frozen homeless stranger reaches your door. You've no spare room or blanket; give yours or send him elsewhere.",
    secenekler: [
      {
        metin: "Give him your bed and blanket; sleep cold.",
        basariliSonuc: {
          mesaj: "He warmed through the night and left grateful; you woke coughing.",
          detay: "Warmth means more when given.",
        },
        basarisizSonuc: {
          mesaj: "The cold caught you too; you lay in fever for days.",
          detay: "Your body pays for kindness.",
        },
      },
      {
        metin: "Send him to the shared shelter.",
        basariliSonuc: {
          mesaj: "He found a corner at the shelter; you didn't freeze either.",
          detay: "Institutions can save lives too.",
        },
        basarisizSonuc: {
          mesaj: "The shelter was full; he was found frozen on the road.",
          detay: "Directing isn't always enough.",
        },
      },
      {
        metin: "Take him in, but stay awake, wary.",
        basariliSonuc: {
          mesaj: "He was only a traveler; he left praying for you, and you were tired but at peace.",
          detay: "Suspicion came to nothing; caution harmed none.",
        },
        basarisizSonuc: {
          mesaj: "You dozed off and he took a few of your things.",
          detay: "Kindness gets abused; you don't regret it.",
        },
      },
    ],
  },

  oc_din_durust_14: {
    baslik: "A Sworn Dispute",
    metin:
      "Two merchants want to settle a trade dispute with a holy oath before the temple; you decide who tells the truth.",
    secenekler: [
      {
        metin: "Weigh the evidence; rule impartially.",
        basariliSonuc: {
          mesaj: "Both sides accepted your verdict; your justice was praised across town.",
          detay: "Some reputations are won with patience.",
        },
        basarisizSonuc: {
          mesaj: "The loser rejected it and accused you of favoring the other.",
          detay: "Even impartiality can look partial.",
        },
      },
      {
        metin: "Push them to settle before the oaths.",
        basariliSonuc: {
          mesaj: "You sat them down, they found a middle way; no oath needed.",
          detay: "Best arbitration makes arbitration needless.",
        },
        basarisizSonuc: {
          mesaj: "Both refused to settle; the case went to oath.",
          detay: "Not everyone wants peace.",
        },
      },
    ],
  },

  oc_din_durust_15: {
    baslik: "The Higher Office's Offer",
    metin:
      "The higher office wants a family's sins recorded 'lightly', hinting at more resources in return. Refusing may end your promotion hopes.",
    secenekler: [
      {
        metin: "Refuse; keep the records as they are.",
        basariliSonuc: {
          mesaj: "The office was displeased but your records stayed clean; you slept easy.",
          detay: "Some promotions cost too much.",
        },
        basarisizSonuc: {
          mesaj: "The office remembered your refusal; your place's resources were cut.",
          detay: "Principles show up in your pocket.",
        },
      },
      {
        metin: "Refuse; share it with the other clergy.",
        basariliSonuc: {
          mesaj: "Sharing gave the others courage; the office backed down.",
          detay: "Seeing you weren't alone strengthened you.",
        },
        basarisizSonuc: {
          mesaj: "No one backed you; the office branded you a 'troublemaker'.",
          detay: "Doing right can leave you alone.",
        },
      },
    ],
  },

  oc_din_durust_16: {
    baslik: "A Foreign Traveler",
    metin:
      "A hungry, exhausted traveler of another faith came to your door. Some of your congregation think helping an outsider is wrong.",
    secenekler: [
      {
        metin: "Feed him; shelter him a few days.",
        basariliSonuc: {
          mesaj: "He regained strength and left; some criticized you but your conscience was at ease.",
          detay: "Kindness means more without borders.",
        },
        basarisizSonuc: {
          mesaj: "Some members rebelled: 'You leave our own to care for a stranger?'",
          detay: "Your right isn't everyone's right.",
        },
      },
      {
        metin: "Send him to the inn; pay a night yourself.",
        basariliSonuc: {
          mesaj: "The traveler spent a safe night at the inn; no one was disturbed.",
          detay: "A small fix avoids a big quarrel.",
        },
        basarisizSonuc: {
          mesaj: "The innkeeper refused someone of another faith; the traveler set off again.",
          detay: "Good intent isn't always repaid.",
        },
      },
    ],
  },

  oc_din_durust_17: {
    baslik: "An Invitation From the Big City",
    metin:
      "A rich place of worship in the big city offers you chief assistant; pay and standing are far greater. But who will tend your poor congregation if you go?",
    secenekler: [
      {
        metin: "Refuse; stay with your congregation.",
        basariliSonuc: {
          mesaj: "The congregation wept at your decision; no one fears you'll leave now.",
          detay: "Loyalty can't be measured in pay.",
        },
        basarisizSonuc: {
          mesaj: "You stayed but couldn't stop thinking of the lost chance.",
          detay: "Even right choices leave regret.",
        },
      },
      {
        metin: "Accept, but leave a trusted successor.",
        basariliSonuc: {
          mesaj: "The young clergyman did well; you began a new life in the city.",
          detay: "You didn't abandon your flock.",
        },
        basarisizSonuc: {
          mesaj: "Your successor clashed with the congregation; many left the place of worship.",
          detay: "A good plan can't please everyone.",
        },
      },
    ],
  },

  oc_din_durust_18: {
    baslik: "The Enemy's Wounded",
    metin:
      "After a clash, a badly wounded enemy soldier is dragged to your door. Tend him and be branded a 'traitor'; don't and he dies.",
    secenekler: [
      {
        metin: "Bind his wound; secretly nurse him.",
        basariliSonuc: {
          mesaj: "He recovered and slipped home by night; no one knew.",
          detay: "An enemy's life is still a life.",
        },
        basarisizSonuc: {
          mesaj: "Neighbors spotted him and accused you of harboring the enemy.",
          detay: "Conscience can clash with the crowd.",
        },
      },
      {
        metin: "Bind his wound; tell your commander.",
        basariliSonuc: {
          mesaj: "The commander took him prisoner but treated him humanely; at least he lived.",
          detay: "Not what you wanted, but not the worst.",
        },
        basarisizSonuc: {
          mesaj: "The commander executed him without trial; your care was wasted.",
          detay: "You can't decide your kindness's outcome.",
        },
      },
    ],
  },

  oc_din_durust_19: {
    baslik: "One of Your Own Blood",
    metin:
      "A distant relative secretly asks the aid fund for a share to pay his debts: 'Family is for family.' The fund is earmarked for poor families in line.",
    secenekler: [
      {
        metin: "Refuse; leave the fund for those in line.",
        basariliSonuc: {
          mesaj: "You distributed it in order; your relative sulked but the congregation trusted you.",
          detay: "Ties don't outrank principles.",
        },
        basarisizSonuc: {
          mesaj: "Your relative accused you of betraying family and never spoke to you again.",
          detay: "Doing right can cost you loved ones.",
        },
      },
      {
        metin: "Help from your own pocket, not the fund.",
        basariliSonuc: {
          mesaj: "You helped from your own purse and left the fund alone; none could call it unjust.",
          detay: "Loyal without wronging anyone.",
        },
        basarisizSonuc: {
          mesaj: "Your help didn't clear his debt and he reproached you anyway.",
          detay: "No matter what you give, it may not be enough.",
        },
      },
    ],
  },

  oc_din_durust_20: {
    baslik: "A Life's Reckoning",
    metin:
      "Your hair is gray. A young clergyman asks you to tell your wisdom like a will; you remember most the small kindnesses no one knew.",
    secenekler: [
      {
        metin: "Tell him your mistakes and regrets too.",
        basariliSonuc: {
          mesaj: "Hearing your flaws, he respected you more; he called you 'real'.",
          detay: "A flawed example inspires more.",
        },
        basarisizSonuc: {
          mesaj: "Some mistakes disappointed him; he idealized you less.",
          detay: "Honesty shrinks the legend, grows the person.",
        },
      },
      {
        metin: "Stay silent; let small kindnesses be remembered.",
        basariliSonuc: {
          mesaj: "Your name missed the great tales; those who knew you never forgot the provisions.",
          detay: "The finest legacy is written in hearts.",
        },
        basarisizSonuc: {
          mesaj: "In time your name was forgotten; your deeds credited to others.",
          detay: "A modest life gets quietly erased.",
        },
      },
    ],
  },

  oc_din_yozlasmis_01: {
    baslik: "The Relic Workshop",
    metin:
      "Your partner turns old cloth and bones into 'holy relics' in a secret workshop. He needs your stories and blessing; your signature makes fakes real.",
    secenekler: [
      {
        metin: "Invent a story for each, bless it by ceremony.",
        basariliSonuc: {
          mesaj: "Your stories enchanted pilgrims; the workshop became the biggest income.",
          detay: "Every relic hides a lie; no one asks.",
        },
        basarisizSonuc: {
          mesaj: "Your contradicting stories were noticed; whispers of 'lying preacher' began.",
          detay: "Inconsistent lies dig their own grave.",
        },
      },
      {
        metin: "Pick only the most convincing few.",
        basariliSonuc: {
          mesaj: "The chosen pieces sold smoothly; the workshop stayed small but safe.",
          detay: "Reining in greed is wise.",
        },
        basarisizSonuc: {
          mesaj: "Your pickiness angered him; he questioned the partnership: 'no nerve'.",
          detay: "Moderation doesn't satisfy an accomplice.",
        },
      },
      {
        metin: "Hand the dirty work to your apprentice; just bless.",
        basariliSonuc: {
          mesaj: "Your apprentice ran production, you did ceremonies; coffer full, hands clean.",
          detay: "Sharing duty is sharing guilt.",
        },
        basarisizSonuc: {
          mesaj: "Your apprentice's fake proved rotten; your name was dragged in.",
          detay: "Delegated work is still your burden.",
        },
      },
    ],
  },

  oc_din_yozlasmis_02: {
    baslik: "A Fake Healing Show",
    metin:
      "Your partner found a man who hasn't walked in years; for pay, he'll 'rise' at your prayer. The only risk: a real physician in the crowd.",
    secenekler: [
      {
        metin: "Stage the show; raise the man.",
        basariliSonuc: {
          mesaj: "The man 'miraculously' rose; the tearful crowd showered donations.",
          detay: "Only you know he was never crippled.",
        },
        basarisizSonuc: {
          mesaj: "A physician stepped out, examined the leg and shouted the fraud.",
          detay: "The holy man became a con man at once.",
        },
      },
      {
        metin: "Cancel it; tell him 'not this time'.",
        basariliSonuc: {
          mesaj: "You cancelled; the merchant grumbled but didn't wreck things.",
          detay: "Sometimes the best move is no move.",
        },
        basarisizSonuc: {
          mesaj: "He took restraint for weakness; he'll cut your share next time.",
          detay: "Accomplices have their own logic.",
        },
      },
    ],
  },

  oc_din_yozlasmis_03: {
    baslik: "The Price of the Relic",
    metin:
      "As business grows, the merchant wants a bigger share; he knows the relics are worthless without your signature, yet offers you less.",
    secenekler: [
      {
        metin: "Bargain hard; protect your share.",
        basariliSonuc: {
          mesaj: "Hard bargaining worked; you kept your share and he reluctantly agreed.",
          detay: "Even partners in crime bargain over power.",
        },
        basarisizSonuc: {
          mesaj: "He sulked and halted the business for weeks; you lost your share.",
          detay: "Greed eats its own gain.",
        },
      },
      {
        metin: "Accept; keep the peace.",
        basariliSonuc: {
          mesaj: "You accepted; the partnership ran smoothly.",
          detay: "A small share beats a big fight.",
        },
        basarisizSonuc: {
          mesaj: "Even so, the merchant secretly trimmed your share further.",
          detay: "Accomplices rarely weigh honestly.",
        },
      },
      {
        metin: "Threaten to leave; set up your own production.",
        basariliSonuc: {
          mesaj: "You proved you can manage alone; you built a small network of your own.",
          detay: "You're independent now; the secret is yours alone.",
        },
        basarisizSonuc: {
          mesaj: "He ignored the threat and gave the work to another; you were left empty-handed.",
          detay: "Some partnerships end in regret.",
        },
      },
    ],
  },

  oc_din_yozlasmis_04: {
    baslik: "A Bargain Over Tax Exemption",
    metin:
      "The city's richest family claims 'clergy protection' to dodge taxes. In return, a regular quiet 'donation'; your signature is the only condition.",
    secenekler: [
      {
        metin: "Sign the protection letter; take the donation.",
        basariliSonuc: {
          mesaj: "You signed, the family went exempt; your coffer fills monthly.",
          detay: "The rich's friendship isn't cheap, but steady.",
        },
        basarisizSonuc: {
          mesaj: "The inspector reported the letter as fake; you're 'the bribe-taking clergyman'.",
          detay: "One signature carries a whole reputation.",
        },
      },
      {
        metin: "Refuse; resist the family's pressure.",
        basariliSonuc: {
          mesaj: "You refused; the family fumed, but elsewhere you're called 'unbuyable'.",
          detay: "Some refusals gain more than accepting.",
        },
        basarisizSonuc: {
          mesaj: "The family didn't forget; they're watching for a chance to shame you.",
          detay: "Offending the rich costs you later.",
        },
      },
      {
        metin: "Stall both; wait for the highest offer.",
        basariliSonuc: {
          mesaj: "Your indecision was deliberate; you took the highest offer.",
          detay: "Buying time can pay.",
        },
        basarisizSonuc: {
          mesaj: "Your stalling was noticed; both now call you 'two-faced'.",
          detay: "Pleasing everyone pleases no one.",
        },
      },
    ],
  },

  oc_din_yozlasmis_05: {
    baslik: "The Rival's Secret",
    metin:
      "You learned the neighboring clergyman secretly meets an innkeeper's daughter. You could use it to discredit him and draw his flock.",
    secenekler: [
      {
        metin: "Skillfully leak it to the congregation.",
        basariliSonuc: {
          mesaj: "The rumor swept the city; the rival's flock scattered, most came to you.",
          detay: "A rise built on another's fall.",
        },
        basarisizSonuc: {
          mesaj: "You were exposed as the leak; you're 'the man who wrecks others' lives'.",
          detay: "Dirty games bear their player's name.",
        },
      },
      {
        metin: "Keep it; blackmail the rival.",
        basariliSonuc: {
          mesaj: "The rival agreed to pay regularly for your silence; no one learned a thing.",
          detay: "Now your silence is a crime too.",
        },
        basarisizSonuc: {
          mesaj: "The rival reported the blackmail; you're both under investigation.",
          detay: "A blackmailer can lose more than his victim.",
        },
      },
    ],
  },

  oc_din_yozlasmis_06: {
    baslik: "A Skeptical Scholar",
    metin:
      "A traveling scholar examined one of your relics; he noticed the weave doesn't fit the claimed era and began asking questions.",
    secenekler: [
      {
        metin: "Host the scholar; stall him with debate.",
        basariliSonuc: {
          mesaj: "You stalled him; his doubts lingered, but he left the city.",
          detay: "You got off cheap this time.",
        },
        basarisizSonuc: {
          mesaj: "The scholar wasn't convinced; he sent his doubts in a report upward.",
          detay: "A shadow hangs over you now.",
        },
      },
      {
        metin: "Offer a small 'gift' to keep him quiet.",
        basariliSonuc: {
          mesaj: "The scholar took the gift and quietly left.",
          detay: "You bought his silence; conscience remembers.",
        },
        basarisizSonuc: {
          mesaj:
            "He took it as an insult and called you 'the fraud who offered a bribe'.",
          detay: "Think well before giving gifts.",
        },
      },
    ],
  },

  oc_din_yozlasmis_07: {
    baslik: "In Exchange for a Marriage Blessing",
    metin:
      "A wealthy family wants to wed their daughter to a relative, against religious rule. Officiate and you're paid richly; refuse and they'll find another.",
    secenekler: [
      {
        metin: "Officiate; take the payment.",
        basariliSonuc: {
          mesaj: "You officiated, took the fee; the family is grateful, your conscience isn't.",
          detay: "Your sacred words now carry a price tag.",
        },
        basarisizSonuc: {
          mesaj: "The union got out; people accused you of bending rules for money.",
          detay: "What should stay hidden slips out.",
        },
      },
      {
        metin: "Refuse; send them to another clergyman.",
        basariliSonuc: {
          mesaj: "The family sulked, but another officiated; you stayed clean.",
          detay: "Missing some gains is a gain.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered them; the city called you 'arrogant'.",
          detay: "Every refusal carries a price.",
        },
      },
    ],
  },

  oc_din_yozlasmis_08: {
    baslik: "A Second Holy Relic",
    metin:
      "You're a preacher now, known beyond the city. Your partner proposes a bold scheme: a chest of a lost saint's 'bones'. Fame, or scandal.",
    secenekler: [
      {
        metin: "Accept; unveil the chest with a grand ceremony.",
        basariliSonuc: {
          mesaj: "The chest was unveiled grandly; pilgrims flocked in. Your name becomes legend.",
          detay: "You don't forget how deep the lie runs.",
        },
        basarisizSonuc: {
          mesaj: "Rival clergy exposed the chest's flaws publicly; overnight you're a laughingstock.",
          detay: "You fall as fast as you rose.",
        },
      },
      {
        metin: "Refuse; keep the small operation.",
        basariliSonuc: {
          mesaj: "You skipped the risk; the merchant was disappointed, but things went on quietly.",
          detay: "The greatest victory is resisting temptation.",
        },
        basarisizSonuc: {
          mesaj: "The merchant spread your refusal as 'cowardice'; your standing shook a bit.",
          detay: "Even caution carries a price.",
        },
      },
      {
        metin: "Prepare the chest; keep the promotion small.",
        basariliSonuc: {
          mesaj: "You showed the chest only to a trusted circle; spread was slow but safe.",
          detay: "Reining in greed worked.",
        },
        basarisizSonuc: {
          mesaj: "Even the small circle talked; the rumor slipped control but no scandal yet.",
          detay: "Secrets leak even from small circles.",
        },
      },
    ],
  },

  oc_din_yozlasmis_09: {
    baslik: "The Ignored Door",
    metin:
      "The same poor woman begs bread for her children each morning. You wear silk and keep a private cook; should your servant turn her away?",
    secenekler: [
      {
        metin: "Have the servant turn her away; do 'important' work.",
        basariliSonuc: {
          mesaj: "She left empty-handed each time; you spent your days on accounts with the merchant.",
          detay: "The voices at your door became background noise.",
        },
        basarisizSonuc: {
          mesaj: "Her crying was heard in the street; neighbors said 'the clergyman starves people'.",
          detay: "Ignoring gets noticed too.",
        },
      },
      {
        metin: "Feed her yourself once, then forget.",
        basariliSonuc: {
          mesaj: "You gave her a plate; she left praying, and you felt uneasy.",
          detay: "One kindness doesn't erase neglect.",
        },
        basarisizSonuc: {
          mesaj: "One plate drew other hungry families; you couldn't keep up.",
          detay: "Looking generous once isn't generosity.",
        },
      },
    ],
  },

  oc_din_yozlasmis_10: {
    baslik: "A Branch in a New City",
    metin:
      "Your partner proposes a second 'holy relic' network in a neighboring city under your name. You never go there, yet take a cut of every sale.",
    secenekler: [
      {
        metin: "Accept; spread your name to another city.",
        basariliSonuc: {
          mesaj: "The second network profited fast; your name works even in a city you've never seen.",
          detay: "You can't gauge how big you've grown.",
        },
        basarisizSonuc: {
          mesaj: "The partner there botched things; a scandal broke and your name got dragged in.",
          detay: "A mistake you can't control burns you too.",
        },
      },
      {
        metin: "Refuse; stay in your own city.",
        basariliSonuc: {
          mesaj: "You refused; he was disappointed, but your affairs stay under your control.",
          detay: "Even a small empire should be manageable.",
        },
        basarisizSonuc: {
          mesaj: "The merchant set it up with another clergyman, using your name unasked.",
          detay: "A refused chance can be dangerous in others' hands.",
        },
      },
    ],
  },

  oc_din_yozlasmis_11: {
    baslik: "Cargo Across the Sea",
    metin:
      "The merchant now wants to ship the fake relics overseas; customs officers will need bribes and the risk of capture is far greater.",
    secenekler: [
      {
        metin: "Approve the shipment; take the risk.",
        basariliSonuc: {
          mesaj: "The cargo shipped smoothly; pilgrims in far lands know your 'holy' seal.",
          detay: "Your name crosses seas; you recall by what lie.",
        },
        basarisizSonuc: {
          mesaj: "Customs stopped the cargo and spotted the forgery; your name entered an official report.",
          detay: "One harbor officer can wreck years of work.",
        },
      },
      {
        metin: "Split the load; send half by a safe route.",
        basariliSonuc: {
          mesaj: "You split it; part arrived safely, the rest got through with small loss.",
          detay: "Cautious greed is a strategy.",
        },
        basarisizSonuc: {
          mesaj: "Splitting slowed things; the merchant said timing was missed and cut your share.",
          detay: "Even caution costs.",
        },
      },
      {
        metin: "Refuse; keep it small, by land.",
        basariliSonuc: {
          mesaj: "You skipped the risk; the merchant grumbled, but business went on quietly.",
          detay: "Reining in ambition is a big gain.",
        },
        basarisizSonuc: {
          mesaj: "He called your refusal 'cowardice' and began seeking other partners.",
          detay: "Accomplices' patience is limited.",
        },
      },
    ],
  },

  oc_din_yozlasmis_12: {
    baslik: "The Bishop's Audit",
    metin:
      "An official auditor from the higher office arrived to inspect the ledgers and the 'holy relics' section. Exposure risk is at its peak.",
    secenekler: [
      {
        metin: "Fix the ledgers overnight; greet him smiling.",
        basariliSonuc: {
          mesaj: "The ledgers passed the audit; the auditor left satisfied.",
          detay: "You dodged it again; this will end.",
        },
        basarisizSonuc: {
          mesaj: "The auditor found inconsistencies and reported you as 'suspect'.",
          detay: "Everything you built totters.",
        },
      },
      {
        metin: "Openly offer the auditor a bribe.",
        basariliSonuc: {
          mesaj: "He quietly accepted and wrote 'everything in order'.",
          detay: "Only his complicity protects you now.",
        },
        basarisizSonuc: {
          mesaj: "The auditor reported the bribe; an inquiry opened for forgery and corruption.",
          detay: "Some mistakes open doors with no return.",
        },
      },
    ],
  },

  oc_din_yozlasmis_13: {
    baslik: "An Apocalypse Sermon",
    metin:
      "A strange illness hit the town. You can call it 'divine punishment' and raise donations through fear, or tell the truth and calm the panic.",
    secenekler: [
      {
        metin: "Preach doom; collect donations through fear.",
        basariliSonuc: {
          mesaj: "Your sermon terrified the people; money poured in for holy protection.",
          detay: "You turned fear into money; your best sermon.",
        },
        basarisizSonuc: {
          mesaj: "Panic ran out of control; looking into the cause revealed your exaggeration.",
          detay: "Fear slips control and hits you too.",
        },
      },
      {
        metin: "Tell the truth; calm the people.",
        basariliSonuc: {
          mesaj: "Your calm words prevented panic; the people thanked you sincerely.",
          detay: "Truth can be the most profitable sermon.",
        },
        basarisizSonuc: {
          mesaj: "Your words went unheeded; panic had already spread.",
          detay: "Truth can't always outrun fear.",
        },
      },
      {
        metin: "Tell a half-truth: both a warning and nature.",
        basariliSonuc: {
          mesaj: "Conscience and coffer eased a bit; the people were neither fully afraid nor calm.",
          detay: "The middle can be safest.",
        },
        basarisizSonuc: {
          mesaj: "Your mixed message caused confusion, no one knew what to do.",
          detay: "A half-truth is received as no truth.",
        },
      },
    ],
  },

  oc_din_yozlasmis_14: {
    baslik: "An Eye in the Rival Congregation",
    metin:
      "The place of worship across the city keeps obstructing you. You think of planting a loyal apprentice there 'temporarily' to gather inside information.",
    secenekler: [
      {
        metin: "Send the apprentice to spy.",
        basariliSonuc: {
          mesaj: "Your apprentice brought the rival's weak points; you're cornering them one by one.",
          detay: "No one knows it there better than you.",
        },
        basarisizSonuc: {
          mesaj: "Your apprentice was caught and confessed whom he served; scandal reached your door.",
          detay: "The one you send can sink you too.",
        },
      },
      {
        metin: "Drop it; compete openly.",
        basariliSonuc: {
          mesaj: "You dropped spying and strengthened your own sermons.",
          detay: "Some wars are won in the open.",
        },
        basarisizSonuc: {
          mesaj: "Competition stayed hard; the rival congregation kept growing.",
          detay: "Honesty doesn't always put you ahead.",
        },
      },
    ],
  },

  oc_din_yozlasmis_15: {
    baslik: "Your Own Sainthood",
    metin:
      "Some members believe your touch 'heals' and your dreams are 'prophecies'. You could feed this belief and become a half-sacred figure.",
    secenekler: [
      {
        metin: "Feed the belief; grow your legend.",
        basariliSonuc: {
          mesaj: "Your legend grew; people queue to touch you.",
          detay: "The figure drifts from your true self.",
        },
        basarisizSonuc: {
          mesaj: "Superiors found the 'holiness' rumors near heresy and warned you.",
          detay: "Self-sanctification clashes with religion.",
        },
      },
      {
        metin: "Gently refuse: 'I'm a servant like you.'",
        basariliSonuc: {
          mesaj: "Your humility disappointed some but earned a respected name.",
          detay: "Refusal can leave a stronger mark.",
        },
        basarisizSonuc: {
          mesaj: "Despite your refusal the rumor spread on its own; beyond your control.",
          detay: "A legend grows against its subject's will.",
        },
      },
    ],
  },

  oc_din_yozlasmis_16: {
    baslik: "The Apprentice's Suspicion",
    metin:
      "Your closest apprentice glimpsed a chest in the workshop; he seems to have realized the 'holy bones' came from a slaughterhouse. He eyes you strangely.",
    secenekler: [
      {
        metin: "Talk; admit the truth and make him an accomplice.",
        basariliSonuc: {
          mesaj: "He was shocked but accepted; now he takes a cut and carries the secret too.",
          detay: "A shared lie is heavier but safer.",
        },
        basarisizSonuc: {
          mesaj: "He refused in horror and said he'd leave and tell the congregation.",
          detay: "A trusted one can become your biggest threat.",
        },
      },
      {
        metin: "Silence him with money or threats.",
        basariliSonuc: {
          mesaj: "He took the money and stayed quiet; but the old trust is gone.",
          detay: "Bought loyalty can be sold back.",
        },
        basarisizSonuc: {
          mesaj: "Your threat scared him; he left and told everyone what he saw.",
          detay: "A mouth silenced by fear shouts in anger.",
        },
      },
    ],
  },

  oc_din_yozlasmis_17: {
    baslik: "The Widow's Will",
    metin:
      "A rich, lonely widow newly bereaved comes to you for comfort. You could persuade her to will her fortune to 'the congregation', meaning largely you.",
    secenekler: [
      {
        metin: "Comfort her for months; steer the will to yourself.",
        basariliSonuc: {
          mesaj: "When she died most of her fortune went to the congregation, effectively you.",
          detay: "Listening, you always thought of the will.",
        },
        basarisizSonuc: {
          mesaj: "Her family went to court; you're 'the clergyman who tricked an old woman'.",
          detay: "Some plans backfire even after death.",
        },
      },
      {
        metin: "Offer real comfort; never mention the will.",
        basariliSonuc: {
          mesaj: "You kept her company without mentioning the will. A small donation came unasked.",
          detay: "Wanting nothing can gain the most.",
        },
        basarisizSonuc: {
          mesaj: "Your comfort fell short; she was left with her loneliness.",
          detay: "You can't ease every pain.",
        },
      },
      {
        metin: "Inform her family; ask a small brokerage fee.",
        basariliSonuc: {
          mesaj: "You informed the family and took a small fee; everyone left pleased.",
          detay: "The middle way serves both conscience and coffer.",
        },
        basarisizSonuc: {
          mesaj: "The family grew suspicious of your involvement; the bond cooled.",
          detay: "Even kind brokering gets misread.",
        },
      },
    ],
  },

  oc_din_yozlasmis_18: {
    baslik: "The Woman at the Hungry Door",
    metin:
      "Returning from dinner in your fur robe, you find a woman fainted from hunger on the steps. The money in your bag would feed her for weeks.",
    secenekler: [
      {
        metin: "Stop, help, truly change something.",
        basariliSonuc: {
          mesaj: "You gave her food and money; for the first time in ages you truly did something.",
          detay: "What you sought was this simple.",
        },
        basarisizSonuc: {
          mesaj: "She came round, recognized you and left saying 'so now you remember us'.",
          detay: "Some pangs of conscience come too late.",
        },
      },
      {
        metin: "Leave it to your servant; go to your meeting.",
        basariliSonuc: {
          mesaj: "You left it to your servant and went in; she stayed on your mind, but you never acted.",
          detay: "Conscience goes quiet more easily.",
        },
        basarisizSonuc: {
          mesaj: "She screamed at the door and exposed you; a few passersby saw.",
          detay: "What you ignore makes you visible.",
        },
      },
    ],
  },

  oc_din_yozlasmis_19: {
    baslik: "The Lord's Loyal Oracle",
    metin:
      "The lord summoned you: present his decisions as 'signs from God' and you and your temple go tax-exempt for life. The price is your independence.",
    secenekler: [
      {
        metin: "Accept; be the lord's official oracle.",
        basariliSonuc: {
          mesaj: "You signed; your sermons serve the lord's interest, but your coffer never empties.",
          detay: "Security is sometimes a chain's name.",
        },
        basarisizSonuc: {
          mesaj: "People saw you as the lord's 'puppet'; part of your flock quietly drifted away.",
          detay: "Gain power, lose trust.",
        },
      },
      {
        metin: "Politely refuse; stay independent.",
        basariliSonuc: {
          mesaj: "You refused; the lord was disappointed but kept his respect.",
          detay: "Independence outweighs any tax exemption.",
        },
        basarisizSonuc: {
          mesaj: "The lord took it as an insult and quietly revoked some privileges.",
          detay: "Refusing has its bill.",
        },
      },
    ],
  },

  oc_din_yozlasmis_20: {
    baslik: "The Peak of a Religious Empire",
    metin:
      "The network you built from relics, bribes and fake miracles spans cities. Your partner died and his heirs took the ledgers that could expose you.",
    secenekler: [
      {
        metin: "Bargain with the heirs; buy the ledgers.",
        basariliSonuc: {
          mesaj: "You bought the ledgers at heavy cost and burned them; your empire stands.",
          detay: "You spent the fortune destroying its proof.",
        },
        basarisizSonuc: {
          mesaj: "An heir sent a copy of the ledgers upward before the deal; your network began to crack.",
          detay: "One letter can shake years of work.",
        },
      },
      {
        metin: "Risk all; hire men to steal the ledgers.",
        basariliSonuc: {
          mesaj: "Your men destroyed the ledgers; danger passed, but your conscience never recovered.",
          detay: "Now you even have theft done to cover up.",
        },
        basarisizSonuc: {
          mesaj: "Your men were caught and named you; an investigation opened against you.",
          detay: "Your empire became a weight that can crush you.",
        },
      },
      {
        metin: "Take your fortune; flee quietly to another city.",
        basariliSonuc: {
          mesaj: "You left at midnight; the empire collapsed, but you weren't chained.",
          detay: "Leaving it all, you felt a strange lightness.",
        },
        basarisizSonuc: {
          mesaj: "Your flight was spotted halfway; a clash broke out with those sent to catch you.",
          detay: "Fleeing can be riskier than capture.",
        },
      },
    ],
  },

  oc_din_fanatik_01: {
    baslik: "The First Interrogation",
    metin:
      "Your first solo case: the wool merchant's daughter allegedly mutters 'strange words' at night. The only evidence is two neighbors' hearsay.",
    secenekler: [
      {
        metin: "Grill the girl; get a quick confession.",
        basariliSonuc: {
          mesaj: "Terrified, the girl said anything; your report went up as 'a firm confession'.",
          detay: "A doubt stirred; you crushed it at once.",
        },
        basarisizSonuc: {
          mesaj: "She only cried; you came away empty-handed, faith unshaken.",
          detay: "That silence may have come from fear.",
        },
      },
      {
        metin: "Question the neighbors one by one; verify it.",
        basariliSonuc: {
          mesaj: "Mostly gossip; you wrote cautiously and were noted as 'a careful interrogator'.",
          detay: "Meticulousness earned credibility.",
        },
        basarisizSonuc: {
          mesaj: "Your inquiries dragged; superiors grew impatient and found you 'indecisive'.",
          detay: "Care can look slow.",
        },
      },
      {
        metin: "Pass it up as 'enough suspicion', uninvestigated.",
        basariliSonuc: {
          mesaj: "Report accepted, the case went to the higher-ups; you struck the first spark.",
          detay: "You never asked what became of the girl.",
        },
        basarisizSonuc: {
          mesaj: "Superiors rejected your report as 'baseless'; you're now called 'hasty'.",
          detay: "Haste loses trust.",
        },
      },
    ],
  },

  oc_din_fanatik_02: {
    baslik: "The Neighbor's Denunciation",
    metin:
      "An old widow accuses her neighbor of heresy. But her real grievance seems to be a land dispute she lost last year.",
    secenekler: [
      {
        metin: "Treat it as genuine; open the investigation.",
        basariliSonuc: {
          mesaj: "The investigation opened; the widow watches eagerly, and you never asked why.",
          detay: "Some denunciations spring from spite, not justice.",
        },
        basarisizSonuc: {
          mesaj: "The neighbor was innocent and the land feud surfaced; you were called a tool of spite.",
          detay: "Using justice as a tool shows eventually.",
        },
      },
      {
        metin: "Hear her; question her motive; refuse the case.",
        basariliSonuc: {
          mesaj: "You refused the case; the widow left angry, but you knew you were right.",
          detay: "Some refusals are the greatest service.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal got out; whispers said you 'protect heretics'.",
          detay: "Good intent can be misread.",
        },
      },
      {
        metin: "Merely record it; it may prove useful later.",
        basariliSonuc: {
          mesaj: "You filed it quietly; you ruined no one, and hold one more paper.",
          detay: "Patience can be cruelty's cold form.",
        },
        basarisizSonuc: {
          mesaj: "Your file was lost or deemed trivial; the effort was wasted.",
          detay: "Some calculations don't add up.",
        },
      },
    ],
  },

  oc_din_fanatik_03: {
    baslik: "An Old Friend's Doubt",
    metin:
      "{dost}, a friend since childhood, mockingly questioned some teachings at dinner. If anyone heard, it could become a denunciation.",
    secenekler: [
      {
        metin: "Quietly warn {dost}; close the matter.",
        basariliSonuc: {
          mesaj: "You pulled {dost} aside and warned him; he never raised it again.",
          detay: "Some bonds are older than rules.",
        },
        basarisizSonuc: {
          mesaj: "Someone overheard; it's said you 'turned a blind eye' too.",
          detay: "Loyalty demands a price.",
        },
      },
      {
        metin: "Report {dost} officially; prove your loyalty.",
        basariliSonuc: {
          mesaj: "Report accepted; praised for sparing no friend. {dost} never spoke to you again.",
          detay: "You had to keep telling yourself it was right.",
        },
        basarisizSonuc: {
          mesaj: "The case was deemed minor and {dost} was freed, but everything between you died.",
          detay: "Some betrayals can't be undone.",
        },
      },
      {
        metin: "Do nothing; act as if you didn't hear.",
        basariliSonuc: {
          mesaj: "You stayed silent; {dost} thought his words forgotten.",
          detay: "Some silences are only delays.",
        },
        basarisizSonuc: {
          mesaj: "Someone else had reported it; you were asked 'why didn't you report'.",
          detay: "Neutrality isn't an option in this duty.",
        },
      },
    ],
  },

  oc_din_fanatik_04: {
    baslik: "Expanded Authority",
    metin:
      "After your promotion, the bishopric gives you investigative authority over three villages, not one. Your reach extends to far more lives.",
    secenekler: [
      {
        metin: "Launch a wide sweep of all three villages.",
        basariliSonuc: {
          mesaj: "The sweep echoed in all three villages; your name alone now inspires fear.",
          detay: "Power grows with use, or so you think.",
        },
        basarisizSonuc: {
          mesaj: "The sweep caused panic, peasants began fleeing; you were told you 'lost your measure'.",
          detay: "Emptying a region isn't cleansing it.",
        },
      },
      {
        metin: "Use it with care; start in the village you trust.",
        basariliSonuc: {
          mesaj: "Trust from the first village spread to the others; your authority grew on solid ground.",
          detay: "Patient power stands longer.",
        },
        basarisizSonuc: {
          mesaj: "Even the first village resisted; your expansion was postponed.",
          detay: "Not every ground is as solid as it looks.",
        },
      },
    ],
  },

  oc_din_fanatik_05: {
    baslik: "Growing the Case",
    metin:
      "A thin file: a miller hummed an old pagan song on feast night. Close it with a warning, or inflate it into 'a heresy network'.",
    secenekler: [
      {
        metin: "Inflate it; claim 'a wide network'.",
        basariliSonuc: {
          mesaj: "The case made a stir and your name spread; the miller and friends were interrogated.",
          detay: "A small truth never stopped a big claim.",
        },
        basarisizSonuc: {
          mesaj: "Your claim was refuted; you were mocked: 'your imagination outran the truth'.",
          detay: "A blown-up lie collapses under its weight.",
        },
      },
      {
        metin: "Warn the miller; keep the file small.",
        basariliSonuc: {
          mesaj: "You warned the miller, closed the file; no one will remember, but you rest easy.",
          detay: "Some victories are won unseen.",
        },
        basarisizSonuc: {
          mesaj: "Superiors asked 'why didn't you inflate it'; restraint was mistaken for weakness.",
          detay: "In this duty mercy counts as a flaw.",
        },
      },
    ],
  },

  oc_din_fanatik_06: {
    baslik: "In the Interrogation Room",
    metin:
      "The suspect has been silent for hours. Your assistant urges harsher methods: 'only pain draws truth.' The man's eyes show terror, not stubbornness.",
    secenekler: [
      {
        metin: "Approve your assistant's harsh methods.",
        basariliSonuc: {
          mesaj: "He finally spoke; you don't know how much is true, but the report is done.",
          detay: "You found not truth, only a voice.",
        },
        basarisizSonuc: {
          mesaj: "He fainted without a word and you called a physician; the case stayed unfinished.",
          detay: "Pain grows silence, not truth.",
        },
      },
      {
        metin: "Refuse; proceed with patience and words.",
        basariliSonuc: {
          mesaj: "After hours of patient talk the man spoke on his own; your assistant is stunned.",
          detay: "The strongest weapon is waiting.",
        },
        basarisizSonuc: {
          mesaj: "The man never opened up; superiors thought you acted 'soft'.",
          detay: "Mercy is read as weakness here.",
        },
      },
    ],
  },

  oc_din_fanatik_07: {
    baslik: "An Innocent Confession",
    metin:
      "The woman confessed even to things that never happened; her account contradicts itself, born of despair. But a signed confession is a signed confession.",
    secenekler: [
      {
        metin: "Accept the confession; close the case.",
        basariliSonuc: {
          mesaj: "The file closed as 'solved'; superiors were pleased with your speed.",
          detay: "You knew she might be innocent; the file was closed.",
        },
        basarisizSonuc: {
          mesaj: "Another interrogator reopened the case over the contradictions; you're 'careless'.",
          detay: "Hastily closed files come back.",
        },
      },
      {
        metin: "Note the contradictions; flag the confession.",
        basariliSonuc: {
          mesaj: "Your doubt went on record; her sentence eased, and so did your conscience.",
          detay: "Small honesties lighten something.",
        },
        basarisizSonuc: {
          mesaj: "Superiors called your doubt 'needless mercy'; the confession stood.",
          detay: "The machine turns without your hand stopping it.",
        },
      },
    ],
  },

  oc_din_fanatik_08: {
    baslik: "The Higher Offices' Trust",
    metin:
      "{amir} summoned you privately, praised your resolve and offers an alliance: full investigative authority, in return you report the disloyal to him.",
    secenekler: [
      {
        metin: "Accept; seal the alliance.",
        basariliSonuc: {
          mesaj: "An unspoken pact formed with {amir}; your investigations run in his shadow, unlimited.",
          detay: "You gained power; ask in whose name you work.",
        },
        basarisizSonuc: {
          mesaj: "You accepted, but {amir}'s expectations grew heavy; your every step is reported.",
          detay: "Some pacts become burdens once signed.",
        },
      },
      {
        metin: "Politely decline; work independently.",
        basariliSonuc: {
          mesaj: "Your refusal surprised {amir}; you kept independence but lost his support.",
          detay: "Walking alone is costly freedom.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was taken as an insult; {amir} kept you in the background at every chance.",
          detay: "Doors once closed stay closed.",
        },
      },
    ],
  },

  oc_din_fanatik_09: {
    baslik: "Fear Spreading in the Street",
    metin:
      "Crossing the market you notice: talk falls silent, heads bow, children cling to their mothers. Your name is no longer talk, but a warning.",
    secenekler: [
      {
        metin: "Draw power from the fear; reinforce authority.",
        basariliSonuc: {
          mesaj: "You walked through silence, no one met your eyes; not respect, but the closest thing.",
          detay: "Mistaking fear for respect is an old trick.",
        },
        basarisizSonuc: {
          mesaj: "You saw a weeping child and the mother's terror; something twisted inside.",
          detay: "Some twinges go unanswered.",
        },
      },
      {
        metin: "Stop; reassure the people; say fear is exaggerated.",
        basariliSonuc: {
          mesaj: "A few thanked you; fear eased, but some in the institution read it as 'slackness'.",
          detay: "Trust builds slower than fear.",
        },
        basarisizSonuc: {
          mesaj: "No one believed you, whispering 'another game'; the fear stayed.",
          detay: "Sown fear isn't easily uprooted.",
        },
      },
    ],
  },

  oc_din_fanatik_10: {
    baslik: "A Silent Conscience",
    metin:
      "At night you see the face of the man you punished: not his scream, but the bewilderment in his last look. For a moment you wonder if you were wrong.",
    secenekler: [
      {
        metin: "Suppress the thought; renew your faith.",
        basariliSonuc: {
          mesaj: "You repeated it was needed for a greater good; sleep came, but hard.",
          detay: "Faith is sometimes a repeated sentence.",
        },
        basarisizSonuc: {
          mesaj: "You tried to suppress it but the look stayed; you rose sleepless.",
          detay: "Some images won't yield to will.",
        },
      },
      {
        metin: "Quietly re-examine the case.",
        basariliSonuc: {
          mesaj: "You reopened the file; it wasn't as bad as feared, yet you weren't fully at ease.",
          detay: "Some questions stay loud even answered.",
        },
        basarisizSonuc: {
          mesaj: "Word spread that you reopened it; read as 'self-doubt', your standing shook.",
          detay: "In this duty, hesitation counts as weakness.",
        },
      },
    ],
  },

  oc_din_fanatik_11: {
    baslik: "A Preacher Who Challenges You",
    metin:
      "A young preacher criticized your methods before the congregation: 'A faith built on fear is not faith.' You sense both an unsettling truth and a threat.",
    secenekler: [
      {
        metin: "Accuse him of heresy and defiance too.",
        basariliSonuc: {
          mesaj: "The preacher was silenced; some found you right, some feared you more.",
          detay: "Silencing criticism isn't answering it.",
        },
        basarisizSonuc: {
          mesaj: "The charge lacked proof and he was acquitted; his words are now repeated by more.",
          detay: "A suppressed voice returns louder.",
        },
      },
      {
        metin: "Ignore him; don't respond.",
        basariliSonuc: {
          mesaj: "You didn't respond; his words faded and your authority held.",
          detay: "Some wars are won by not fighting.",
        },
        basarisizSonuc: {
          mesaj: "Your silence read as 'couldn't answer'; a few switched to the preacher.",
          detay: "Calm isn't always read as strength.",
        },
      },
      {
        metin: "Debate him openly before the people.",
        basariliSonuc: {
          mesaj: "You won the debate; the flock respects you more and the preacher fell silent.",
          detay: "The strongest weapon was a true word.",
        },
        basarisizSonuc: {
          mesaj: "His words convinced the congregation more; for the first time you felt smaller.",
          detay: "Questioned authority is never the same.",
        },
      },
    ],
  },

  oc_din_fanatik_12: {
    baslik: "Chief Inquisitor of the Region",
    metin:
      "The bishopric named you chief inquisitor. No case closes and no suspect is questioned without your approval. A power beyond your dreams.",
    secenekler: [
      {
        metin: "Open with a harsh decision to show your power.",
        basariliSonuc: {
          mesaj: "In week one you opened showy probes in three villages; your name is known and feared.",
          detay: "Every eye is on you now.",
        },
        basarisizSonuc: {
          mesaj: "Too harsh an opening; villages resisted and the bishopric said 'find your measure'.",
          detay: "Seemingly limitless power shows limits fast.",
        },
      },
      {
        metin: "Handle cases one by one, carefully.",
        basariliSonuc: {
          mesaj: "You handled each case carefully; your authority took root quietly and firmly.",
          detay: "Quiet power lasts longest.",
        },
        basarisizSonuc: {
          mesaj: "Your care was read as 'indecision'; the first months weren't as impressive.",
          detay: "Patience pays late.",
        },
      },
    ],
  },

  oc_din_fanatik_13: {
    baslik: "The Rich Merchant's Sin",
    metin:
      "The richest merchant secretly brings 'proof of heresy' against a rival, perhaps slander to wipe him out. In return he promises a generous donation.",
    secenekler: [
      {
        metin: "Accept the proof unquestioned; take the donation.",
        basariliSonuc: {
          mesaj: "The rival was arrested and his goods dispersed; the donation came in full.",
          detay: "You knew justice served trade.",
        },
        basarisizSonuc: {
          mesaj: "The slander surfaced, the merchant was disgraced; you're 'the one who sues for pay'.",
          detay: "Dirty deals don't stay clean.",
        },
      },
      {
        metin: "Investigate yourself; uncover the truth.",
        basariliSonuc: {
          mesaj: "You exposed the slander and saved the innocent; the rich merchant pulled his donation.",
          detay: "Some victories fill conscience, not coffers.",
        },
        basarisizSonuc: {
          mesaj: "Your probe dragged on and the innocent merchant went bankrupt; justice came late.",
          detay: "Finding truth doesn't always save.",
        },
      },
    ],
  },

  oc_din_fanatik_14: {
    baslik: "The Final Judgment",
    metin:
      "The court sentenced an old midwife to death for witchcraft. You still can lighten it, but that may be seen as 'weakness'.",
    secenekler: [
      {
        metin: "Confirm it; make it an exemplary execution.",
        basariliSonuc: {
          mesaj: "The execution was public; the crowd watched silent, your name spoken with fear.",
          detay: "You said 'justice was served'; you slept late.",
        },
        basarisizSonuc: {
          mesaj: "It was carried out, but someone wept, a child fainted; an uneasy silence fell.",
          detay: "What's done as an example leaves fear.",
        },
      },
      {
        metin: "Commute it to exile.",
        basariliSonuc: {
          mesaj: "You commuted it to exile; the midwife left, some called it mercy, some weakness.",
          detay: "You shrink to the institution, grow to yourself.",
        },
        basarisizSonuc: {
          mesaj: "The bishopric overturned you and the execution went ahead; you changed nothing.",
          detay: "Even trying to save someone may not be enough.",
        },
      },
    ],
  },

  oc_din_fanatik_15: {
    baslik: "The Apprentice's Question",
    metin:
      "After the interrogation, your apprentice asks: 'How can you be so sure he's guilty?' No rebellion in his eyes, only curiosity.",
    secenekler: [
      {
        metin: "Rebuke him; call it dereliction of duty.",
        basariliSonuc: {
          mesaj: "He obeys now, but his curiosity turned to cold silence.",
          detay: "A silenced student learns only fear.",
        },
        basarisizSonuc: {
          mesaj: "Your rebuke drove him off; he requested a transfer.",
          detay: "Broken bonds don't mend.",
        },
      },
      {
        metin: "Answer honestly, share your doubts.",
        basariliSonuc: {
          mesaj: "You admitted your doubts; he saw maturity, not weakness.",
          detay: "Honesty binds stronger than authority.",
        },
        basarisizSonuc: {
          mesaj: "Your admission unsettled him; he filed a note about you upstairs.",
          detay: "Frankness can be turned against you.",
        },
      },
      {
        metin: "Involve him more; shape him your way.",
        basariliSonuc: {
          mesaj: "You took him to the next interrogation; he begins to see as you do.",
          detay: "A teaching spreads by legacy.",
        },
        basarisizSonuc: {
          mesaj: "What he saw shook him; he eyed you with disappointment, silent.",
          detay: "Some legacies pass unaccepted.",
        },
      },
    ],
  },

  oc_din_fanatik_16: {
    baslik: "A Buried Past",
    metin:
      "An old congregation record mentions a meeting from your youth; some names there would now count as 'suspect'. In the wrong hands, it's dangerous.",
    secenekler: [
      {
        metin: "Quietly destroy the record.",
        basariliSonuc: {
          mesaj: "You burned the record; your past lives only in memory.",
          detay: "Hands that dig up pasts buried their own.",
        },
        basarisizSonuc: {
          mesaj: "An archive clerk saw you; now you must explain why.",
          detay: "Hiding can expose what you hide.",
        },
      },
      {
        metin: "Leave the record; be ready to face your past.",
        basariliSonuc: {
          mesaj: "You left it; no one noticed, but you know it's there.",
          detay: "Some risks lighten the conscience.",
        },
        basarisizSonuc: {
          mesaj: "A rival found the record and readies to strike you with it.",
          detay: "Most exposed when you think it's hidden.",
        },
      },
    ],
  },

  oc_din_fanatik_17: {
    baslik: "A Raid Order",
    metin:
      "A 'heretic community' reportedly gathers in a forest cave. You can raid it with your armed men, but you don't know who's inside.",
    secenekler: [
      {
        metin: "Raid at once, give no hearing.",
        basariliSonuc: {
          mesaj: "The community scattered; you never learned what it was, but the victory is yours.",
          detay: "Some victories rest on unasked questions.",
        },
        basarisizSonuc: {
          mesaj: "Resistance in the cave: a man badly wounded, you barely escaped.",
          detay: "Darkness is paid for in flesh.",
        },
      },
      {
        metin: "Send a scout in secretly first.",
        basariliSonuc: {
          mesaj: "Scout: only a fugitive hunter's family inside. You cancelled the raid, no blood shed.",
          detay: "Sometimes the best victory is no fight.",
        },
        basarisizSonuc: {
          mesaj: "Scout spotted, community fled; your superiors think you missed the chance.",
          detay: "Caution can look like a missed chance.",
        },
      },
    ],
  },

  oc_din_fanatik_18: {
    baslik: "The Dungeon's Sickness",
    metin:
      "Months in damp dungeons among sick prisoners: your cough wakes you at night. The physician says rest, but three cases are open.",
    secenekler: [
      {
        metin: "Ignore your health, press on.",
        basariliSonuc: {
          mesaj: "You closed all three; superiors praised you, but your cough now brings blood.",
          detay: "Duty drowned out your body.",
        },
        basarisizSonuc: {
          mesaj: "You fainted mid-interrogation; assistants carried you out.",
          detay: "Will can't silence the body forever.",
        },
      },
      {
        metin: "Heed the physician, hand off cases, rest.",
        basariliSonuc: {
          mesaj: "Rest did you good, but the cases ran without your method.",
          detay: "Body healed; some power slipped.",
        },
        basarisizSonuc: {
          mesaj: "While resting, you learned an aide issued arbitrary sentences in your name.",
          detay: "Every gap you leave gets filled.",
        },
      },
    ],
  },

  oc_din_fanatik_19: {
    baslik: "A Suspicion Aimed at You",
    metin:
      "{rakip} used his influence to target you: he claims your methods 'deviate from doctrine' and that you secretly read forbidden texts. Your own weapon.",
    secenekler: [
      {
        metin: "Defend with your own methods, drive {rakip} back.",
        basariliSonuc: {
          mesaj: "You refuted the charge; {rakip} himself became a suspect.",
          detay: "Your own system could have eaten you too.",
        },
        basarisizSonuc: {
          mesaj: "The accusation couldn't be fully refuted; you were formally cleared but your every move is watched now.",
          detay: "You came close to being your methods' victim.",
        },
      },
      {
        metin: "Ask {amir} for quiet backing, avoid open conflict.",
        basariliSonuc: {
          mesaj: "{amir} backed you, the charge dropped; but you depend on him now.",
          detay: "Some rescues are a new chain's first link.",
        },
        basarisizSonuc: {
          mesaj: "{amir} stayed out: 'Fend for yourself,' he said.",
          detay: "Power alliances are tested in the hour of need.",
        },
      },
    ],
  },

  oc_din_fanatik_20: {
    baslik: "A Feared Name",
    metin:
      "Your name is a warning now; children are hushed with 'I'll take you to him'. The bishopric invites you to teach your methods.",
    secenekler: [
      {
        metin: "Accept, teach your methods.",
        basariliSonuc: {
          mesaj: "You trained dozens of interrogators; a generation grows in your shadow.",
          detay: "It's bigger than you now, and hard to stop.",
        },
        basarisizSonuc: {
          mesaj: "Your methods grew crueler in their hands; it outgrew you.",
          detay: "Some legacies slip their maker's control.",
        },
      },
      {
        metin: "Refuse, keep your power in your region.",
        basariliSonuc: {
          mesaj: "They read it as 'humility'; you carried on in your own region.",
          detay: "Unshared power stays pure.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal read as 'jealousy'; young rivals began to appear.",
          detay: "Staying on top is harder than climbing.",
        },
      },
    ],
  },

  oc_din_tarikat_01: {
    baslik: "The First Disciple",
    metin:
      "After the meeting a young weaver girl came to you: she found in your words what official sermons lack, and wants to follow you.",
    secenekler: [
      {
        metin: "Take her as first disciple, teach her.",
        basariliSonuc: {
          mesaj: "She swore to you; your circle has a core.",
          detay: "One person outweighed a hundred sermons.",
        },
        basarisizSonuc: {
          mesaj: "Eager but careless, she told your secret to her neighbor.",
          detay: "Loyalty takes patience.",
        },
      },
      {
        metin: "Refuse politely; it's too early.",
        basariliSonuc: {
          mesaj: "You turned her away; she left dismayed, but your secret is safe.",
          detay: "Sometimes the best gain is none.",
        },
        basarisizSonuc: {
          mesaj: "Stung by refusal, she began spreading gossip about you.",
          detay: "Breaking a heart cost more than expected.",
        },
      },
      {
        metin: "Keep her in the outer circle, share no secrets.",
        basariliSonuc: {
          mesaj: "You kept her outside; gained a curious yet reliable face.",
          detay: "Some bonds hold better at a distance.",
        },
        basarisizSonuc: {
          mesaj: "Uneasy with half-acceptance, she lost interest.",
          detay: "Half trust is often none.",
        },
      },
    ],
  },

  oc_din_tarikat_02: {
    baslik: "A Suspicious Neighbor",
    metin:
      "Your meeting house's neighbor noticed midnight murmurs and unending candlelight. In the morning he asked at your door what's going on.",
    secenekler: [
      {
        metin: "Stall him: you read night prayers for the sick.",
        basariliSonuc: {
          mesaj: "He believed you; your official standing helped.",
          detay: "The lie beat the truth.",
        },
        basarisizSonuc: {
          mesaj: "He wasn't convinced; whispers began.",
          detay: "Sown suspicion is hard to uproot.",
        },
      },
      {
        metin: "Invite the neighbor, give him trust.",
        basariliSonuc: {
          mesaj: "He accepted in surprise and soon became one of you.",
          detay: "The greatest threat can become a loyal friend.",
        },
        basarisizSonuc: {
          mesaj: "He refused and told the whole neighborhood.",
          detay: "Lost trust doesn't return.",
        },
      },
    ],
  },

  oc_din_tarikat_03: {
    baslik: "Your Own Word",
    metin:
      "Your congregation waits to hear where it will part from official doctrine. Some disciples want a radical line, some a moderate one.",
    secenekler: [
      {
        metin: "Impose your own interpretation.",
        basariliSonuc: {
          mesaj: "Your word is law; believers bound themselves tighter.",
          detay: "Doctrine strengthens from one mouth.",
        },
        basarisizSonuc: {
          mesaj: "Your rigidity scared some; a few left.",
          detay: "Certainty leaves someone out.",
        },
      },
      {
        metin: "Compromise, add a bit of everyone's view.",
        basariliSonuc: {
          mesaj: "A common language emerged; everyone saw themselves in it.",
          detay: "Compromise grows slowly but deeply.",
        },
        basarisizSonuc: {
          mesaj: "Pleasing everyone blurred the doctrine; no one knows what they believe.",
          detay: "A word fitting all fits none.",
        },
      },
    ],
  },

  oc_din_tarikat_04: {
    baslik: "The Inner Circle",
    metin:
      "As disciples multiply, you can't share the same secrets with all. Time for a small inner circle that knows your true aims.",
    secenekler: [
      {
        metin: "Choose the three most loyal, tell the truth.",
        basariliSonuc: {
          mesaj: "The inner circle formed; you command through them.",
          detay: "An organization rests in trusted hands.",
        },
        basarisizSonuc: {
          mesaj: "One chosen man couldn't bear the truth, fled and spread gossip.",
          detay: "Trust in the wrong hands is a weapon.",
        },
      },
      {
        metin: "Keep all equal, build no hierarchy.",
        basariliSonuc: {
          mesaj: "Equality calmed the congregation; no one felt excluded.",
          detay: "Some kingdoms stand without a crown.",
        },
        basarisizSonuc: {
          mesaj: "Leaderless, the circle wavered; meetings broke up aimlessly.",
          detay: "A hand showing no way isn't followed.",
        },
      },
      {
        metin: "Delay; observe everyone longer.",
        basariliSonuc: {
          mesaj: "Waiting paid off; true characters showed, you chose well.",
          detay: "Patience is the best filter.",
        },
        basarisizSonuc: {
          mesaj: "Indecision bred uncertainty; a few turned to another leader.",
          detay: "Thinking too long is a bad choice too.",
        },
      },
    ],
  },

  oc_din_tarikat_05: {
    baslik: "A Hand From the Shadows",
    metin:
      "A rich city merchant came in disguise: he finds your doctrine interesting and offers to fund your circle without demanding silence.",
    secenekler: [
      {
        metin: "Accept, secure a great resource.",
        basariliSonuc: {
          mesaj: "Gold bought your congregation's roof, table and silence.",
          detay: "No one gives for nothing.",
        },
        basarisizSonuc: {
          mesaj: "The donor's name surfaced in another affair; the stain reached you.",
          detay: "Dirty hands' gold carries dirt.",
        },
      },
      {
        metin: "Refuse, depend on no one.",
        basariliSonuc: {
          mesaj: "You declined; the congregation stays poor but free.",
          detay: "Some refusals outvalue any gain.",
        },
        basarisizSonuc: {
          mesaj: "The donor took it personally and began badmouthing you.",
          detay: "A refused hand can breed an enemy.",
        },
      },
    ],
  },

  oc_din_tarikat_06: {
    baslik: "A Fight at the Table",
    metin:
      "Two inner-circle disciples clash over the right to speak. Each wants your support and the other discredited.",
    secenekler: [
      {
        metin: "Promote one, sideline the other.",
        basariliSonuc: {
          mesaj: "Your pick bound himself closer; the other quietly withdrew.",
          detay: "A crown won't rest on one head.",
        },
        basarisizSonuc: {
          mesaj: "The sidelined disciple left bitter; now an enemy knows you from inside.",
          detay: "Offended disciples take secrets along.",
        },
      },
      {
        metin: "Call both, mediate.",
        basariliSonuc: {
          mesaj: "Patient words calmed both; the congregation held.",
          detay: "A leader sometimes just listens.",
        },
        basarisizSonuc: {
          mesaj: "Mediation failed; one left the circle.",
          detay: "Not every dispute ends in agreement.",
        },
      },
      {
        metin: "Expel both, cut the root.",
        basariliSonuc: {
          mesaj: "You sent both away; shaken, but the strife ended.",
          detay: "To save a garden, prune two branches.",
        },
        basarisizSonuc: {
          mesaj: "Both left angry and now speak against you together.",
          detay: "A cut branch can return, roots and all.",
        },
      },
    ],
  },

  oc_din_tarikat_07: {
    baslik: "An Old Guard",
    metin:
      "A veteran, wounded and discharged, has been hearing your sermons. He wants to devote both faith and sword to you.",
    secenekler: [
      {
        metin: "Make him the first guard.",
        basariliSonuc: {
          mesaj: "The veteran joined; a sword now guards your meetings.",
          detay: "A doctrine lives longer with a shield.",
        },
        basarisizSonuc: {
          mesaj: "His old commanders were watching him, and noticed you.",
          detay: "Gain a soldier, gain his enemies.",
        },
      },
      {
        metin: "Accept as student only; weapon aside.",
        basariliSonuc: {
          mesaj: "He laid down his sword and became a loyal student.",
          detay: "Some men are stronger unarmed.",
        },
        basarisizSonuc: {
          mesaj: "He refused to disarm and left; he repeats your words elsewhere.",
          detay: "You can't hold everyone on your terms.",
        },
      },
    ],
  },

  oc_din_tarikat_08: {
    baslik: "The Weight of the Crowd",
    metin:
      "Dozens now gather secretly at night. The small house is too small, hiding is harder; where will you house the congregation?",
    secenekler: [
      {
        metin: "Turn the abandoned mill into a meeting house.",
        basariliSonuc: {
          mesaj: "The mill became your congregation's heart: remote and safe.",
          detay: "A roof makes doctrine lasting.",
        },
        basarisizSonuc: {
          mesaj: "Traffic to the mill drew attention; questions began.",
          detay: "Secrecy's enemy is a crowd.",
        },
      },
      {
        metin: "Split meetings into small groups.",
        basariliSonuc: {
          mesaj: "Small groups were both intimate and inconspicuous.",
          detay: "Patient growth takes root.",
        },
        basarisizSonuc: {
          mesaj: "The groups drifted apart; a few disciples lost interest.",
          detay: "A scattered fire doesn't warm.",
        },
      },
    ],
  },

  oc_din_tarikat_09: {
    baslik: "A Blackmailing Tongue",
    metin:
      "A former disciple threatens to tell the authorities what he learned. You don't know what he wants, but he won't stay silent.",
    secenekler: [
      {
        metin: "Meet secretly; silence him with gold or threats.",
        basariliSonuc: {
          mesaj: "He took the money and went quiet, for now.",
          detay: "Bought silence is the dearest debt.",
        },
        basarisizSonuc: {
          mesaj: "The meeting enraged him and sped up his report.",
          detay: "Some mouths never close.",
        },
      },
      {
        metin: "Ignore him, take no action.",
        basariliSonuc: {
          mesaj: "He gave up and never acted on his threat.",
          detay: "Time sometimes brings the best fix.",
        },
        basarisizSonuc: {
          mesaj: "The report reached the authorities; you're watched now.",
          detay: "Ignored danger grows.",
        },
      },
      {
        metin: "Recall the old bond, win him back.",
        basariliSonuc: {
          mesaj: "Your words touched him; he dropped the threat and returned.",
          detay: "Some bridges mend before they fall.",
        },
        basarisizSonuc: {
          mesaj: "He took it for weakness and reported even more zealously.",
          detay: "Some hearts don't return.",
        },
      },
    ],
  },

  oc_din_tarikat_10: {
    baslik: "The Institution's Inspector",
    metin:
      "An inspector from the institution came to probe neighborhood rumors. He wants to talk with you; his questions are drawing closer.",
    secenekler: [
      {
        metin: "Stay calm and convincing, dispel suspicion.",
        basariliSonuc: {
          mesaj: "The inspector was convinced and left empty-handed.",
          detay: "Only a convincing man carries a lie.",
        },
        basarisizSonuc: {
          mesaj: "He caught an inconsistency and noted 'to be watched'.",
          detay: "A shadow lies on you now.",
        },
      },
      {
        metin: "Send him off with a small gift and friendly talk.",
        basariliSonuc: {
          mesaj: "The gift and kind words eased him; his report was routine.",
          detay: "Some doors close quietly with gold.",
        },
        basarisizSonuc: {
          mesaj: "He read the gift as a bribe; suspicion grew.",
          detay: "Good intent can be misread.",
        },
      },
    ],
  },

  oc_din_tarikat_11: {
    baslik: "A Hidden Illness",
    metin:
      "Several in the congregation at the damp mill fell ill with fever. An outside physician could expose you; keeping it inside could cost lives.",
    secenekler: [
      {
        metin: "Secretly call a trusted physician, pay well.",
        basariliSonuc: {
          mesaj: "He kept quiet and the sick recovered; one more knows your secret, still safe.",
          detay: "Some trust is bought with conscience.",
        },
        basarisizSonuc: {
          mesaj: "The physician told a neighbor; rumor spread.",
          detay: "Every new eye cracks the secret.",
        },
      },
      {
        metin: "Treat them within the congregation with known herbs.",
        basariliSonuc: {
          mesaj: "Some recovered; the congregation trusted you more in hard days.",
          detay: "Presence in crisis outspeaks any sermon.",
        },
        basarisizSonuc: {
          mesaj: "Your knowledge fell short; one patient died.",
          detay: "Secrecy sometimes costs a life.",
        },
      },
    ],
  },

  oc_din_tarikat_12: {
    baslik: "A Noble Guest",
    metin:
      "The daughter of an established family wants to join secretly. Not an ordinary disciple: both a great resource and a great risk.",
    secenekler: [
      {
        metin: "Accept; use her wealth and influence.",
        basariliSonuc: {
          mesaj: "The noble girl joined; her influence opened doors for you.",
          detay: "One name outweighs a hundred sermons.",
        },
        basarisizSonuc: {
          mesaj: "Her family learned where she went and came at you in fury.",
          detay: "High gifts bring high prices.",
        },
      },
      {
        metin: "Refuse politely, protect the congregation.",
        basariliSonuc: {
          mesaj: "She understood and told no one.",
          detay: "Some chances deserve missing.",
        },
        basarisizSonuc: {
          mesaj: "The rejected girl bitterly mentioned a strange circle to her kin.",
          detay: "Even one you refuse can carry your secret.",
        },
      },
      {
        metin: "Accept her after a long observed trial.",
        basariliSonuc: {
          mesaj: "Patiently tested and found sincere, she joined with trust.",
          detay: "Unrushed trust lives longer.",
        },
        basarisizSonuc: {
          mesaj: "The trial exhausted her patience; she left bitter.",
          detay: "Not everyone will wait.",
        },
      },
    ],
  },

  oc_din_tarikat_13: {
    baslik: "A Secret Alliance Offer",
    metin:
      "A lord who works in the shadows noticed your congregation's strength and offers a secret alliance: his protection, your loyal men.",
    secenekler: [
      {
        metin: "Accept; enter his protection.",
        basariliSonuc: {
          mesaj: "A quiet pact formed; a protective shadow covers you.",
          detay: "Power grows shared, but never free.",
        },
        basarisizSonuc: {
          mesaj: "He meant to use you as a pawn; you saw it too late.",
          detay: "Every protection hides a chain.",
        },
      },
      {
        metin: "Refuse politely, stay independent.",
        basariliSonuc: {
          mesaj: "He respected it; a quiet distance remained.",
          detay: "Even unformed alliances teach.",
        },
        basarisizSonuc: {
          mesaj: "He took it as an insult; you're a threat in his eyes.",
          detay: "A refused hand may face you tomorrow.",
        },
      },
    ],
  },

  oc_din_tarikat_14: {
    baslik: "A Young Voice",
    metin:
      "A young disciple of your inner circle began preaching his own interpretation. Followers drift to his fiery words; your leadership is questioned for the first time.",
    secenekler: [
      {
        metin: "Confront him, prove your leadership.",
        basariliSonuc: {
          mesaj: "Your words prevailed; your leadership stands unchallenged.",
          detay: "A crown firms up when challenged.",
        },
        basarisizSonuc: {
          mesaj: "The youth outshone you; some followers left with him.",
          detay: "Every challenge risks losing.",
        },
      },
      {
        metin: "Quietly ease him out of the circle.",
        basariliSonuc: {
          mesaj: "You gradually distanced him; no one understood why.",
          detay: "Some victories are won quietly.",
        },
        basarisizSonuc: {
          mesaj: "Your intent showed; some disciples question your real face.",
          detay: "Shadow deeds don't stay in shadow.",
        },
      },
    ],
  },

  oc_din_tarikat_15: {
    baslik: "Loyal Arms",
    metin:
      "Your old guard wants to train a few more men to protect the congregation. You could become a power center, but an armed group draws attention.",
    secenekler: [
      {
        metin: "Allow a small guard force.",
        basariliSonuc: {
          mesaj: "More veterans joined; meetings look like a small army.",
          detay: "A doctrine ringed with swords changes.",
        },
        basarisizSonuc: {
          mesaj: "The armed men drew attention and were caught in a street fight.",
          detay: "Showing power can lose it.",
        },
      },
      {
        metin: "Refuse; don't arm the congregation.",
        basariliSonuc: {
          mesaj: "He respected it; only an inconspicuous watchman remains.",
          detay: "Some power exists unshown.",
        },
        basarisizSonuc: {
          mesaj: "Your unarmed meeting was robbed one night; a few disciples were hurt.",
          detay: "The unprotected pay sooner or later.",
        },
      },
      {
        metin: "Set up an inconspicuous guard of one or two.",
        basariliSonuc: {
          mesaj: "A small, quiet guard: neither conspicuous nor defenseless.",
          detay: "Measured power lasts.",
        },
        basarisizSonuc: {
          mesaj: "The limited guard failed to stop an attack; a few disciples left in fear.",
          detay: "A half measure is no measure.",
        },
      },
    ],
  },

  oc_din_tarikat_16: {
    baslik: "The Noble's Secret Money",
    metin:
      "An influential lord offers your congregation a regular income, expecting you to openly side against his political rival in your sermons.",
    secenekler: [
      {
        metin: "Take the money, steer sermons his way.",
        basariliSonuc: {
          mesaj: "The congregation grew rich, but your words now serve his interests.",
          detay: "Gold is a chain's shiniest link.",
        },
        basarisizSonuc: {
          mesaj: "Biased sermons hurt your credibility; they now see you as a tool.",
          detay: "Another's war costs you your voice.",
        },
      },
      {
        metin: "Refuse; don't make doctrine a political tool.",
        basariliSonuc: {
          mesaj: "Refusal kept the congregation independent; disciples respect you more.",
          detay: "Some wealth is gained by refusing.",
        },
        basarisizSonuc: {
          mesaj: "The rejected lord sees you as an obstacle and works against you.",
          detay: "Some refusals bill you late.",
        },
      },
    ],
  },

  oc_din_tarikat_17: {
    baslik: "The Institution's Envoy",
    metin:
      "The institution can't ignore its suspicions and sent an envoy: disband your circle entirely or be openly accused of heresy.",
    secenekler: [
      {
        metin: "Bargain; offer him a cut for silence.",
        basariliSonuc: {
          mesaj: "He accepted and closed his report as 'unimportant'.",
          detay: "Even the institution's men can be bought.",
        },
        basarisizSonuc: {
          mesaj: "He took it as an insult and reported to the higher offices.",
          detay: "Some gambles return the heaviest price.",
        },
      },
      {
        metin: "Defy the envoy, defend your doctrine.",
        basariliSonuc: {
          mesaj: "You surprised him; he withdrew without verdict, but you're marked.",
          detay: "Courage can be a shield alone.",
        },
        basarisizSonuc: {
          mesaj: "He accused you of heresy; the institution's men are after you.",
          detay: "Defiance can cost a life.",
        },
      },
    ],
  },

  oc_din_tarikat_18: {
    baslik: "Violence Done in Your Name",
    metin:
      "Your guards beat a street preacher who criticized your congregation. They came saying 'we protected you'; you never gave that order.",
    secenekler: [
      {
        metin: "Cover it up, reward them for loyalty.",
        basariliSonuc: {
          mesaj: "Your guards are more bound to you; they'll do anything.",
          detay: "Each violence you approve changes you.",
        },
        basarisizSonuc: {
          mesaj: "The beaten preacher told all; fingers pointed at you.",
          detay: "A covered truth surfaces sooner or later.",
        },
      },
      {
        metin: "Warn them openly, forbid violence.",
        basariliSonuc: {
          mesaj: "They understood; your guards never acted alone again.",
          detay: "True power limits itself.",
        },
        basarisizSonuc: {
          mesaj: "They took the warning for weakness; a few guards grew disrespectful.",
          detay: "Conscience sometimes clashes with authority.",
        },
      },
      {
        metin: "Apologize privately, cover his damages.",
        basariliSonuc: {
          mesaj: "The preacher accepted apology and payment and let it go.",
          detay: "Some wounds are bound quietly.",
        },
        basarisizSonuc: {
          mesaj: "He accepted but told the story anyway; the city talks of you.",
          detay: "Forgiving isn't forgetting.",
        },
      },
    ],
  },

  oc_din_tarikat_19: {
    baslik: "One Who Wants to Leave",
    metin:
      "Someone from your inner circle wants out, to live an ordinary life. But he knows the congregation's secrets and your guards' identities.",
    secenekler: [
      {
        metin: "Let him go, show trust.",
        basariliSonuc: {
          mesaj: "The man left quietly and told no one.",
          detay: "Trust sometimes beats calculation.",
        },
        basarisizSonuc: {
          mesaj: "The man who left told everything one drunken night.",
          detay: "A secret spills with one cup.",
        },
      },
      {
        metin: "Bind him with an oath, threaten if needed.",
        basariliSonuc: {
          mesaj: "The oath silenced him, if only from fear.",
          detay: "Silence built on fear will burst.",
        },
        basarisizSonuc: {
          mesaj: "Your threat enraged him; he whispered the truth to a few before leaving.",
          detay: "A forced-shut mouth opens others.",
        },
      },
    ],
  },

  oc_din_tarikat_20: {
    baslik: "A Small Kingdom",
    metin:
      "Your congregation is a real power in the shadows: loyal disciples, guards, secret backers. The institution will crush you or deal. Decision time.",
    secenekler: [
      {
        metin: "Show your power, bargain as an equal.",
        basariliSonuc: {
          mesaj: "The institution couldn't afford to destroy you; a quiet pact recognized you.",
          detay: "What began as a candle shines by itself.",
        },
        basarisizSonuc: {
          mesaj: "The institution saw a threat; guards dispersed, congregation hunted.",
          detay: "Some kingdoms fall before the crown.",
        },
      },
      {
        metin: "Grow in the shadows, never defy openly.",
        basariliSonuc: {
          mesaj: "Patience paid; the congregation grows unseen, its strength unknown.",
          detay: "Strong kingdoms are built unseen.",
        },
        basarisizSonuc: {
          mesaj: "Hiding failed; the growing congregation drew notice by its weight.",
          detay: "Hiding is as risky as showing off.",
        },
      },
      {
        metin: "Disband, erase your trail, be an ordinary clergyman.",
        basariliSonuc: {
          mesaj: "You quietly disbanded; danger passed, but all you built is gone.",
          detay: "Best ruin is the founder's own hand.",
        },
        basarisizSonuc: {
          mesaj: "Some disciples blamed you during the breakup; you left a trail.",
          detay: "Even endings aren't always quiet.",
        },
      },
    ],
  },
};
