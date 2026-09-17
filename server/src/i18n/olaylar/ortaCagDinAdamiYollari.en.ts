import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagDinAdamiYollari.ts — İngilizce çevirileri (85 olay). */
export const OLAYLAR_ORTACAG_DINADAMI_YOLLARI_EN: Record<string, OlayCeviri> = {
  oc_din_yol_ilk_sinav: {
    baslik: "The First Test",
    metin:
      "You've been newly assigned to a congregation. That same day, a beggar with no one knocks at your door for a last comfort; a rich merchant also offers a donation in exchange for 'a small service'. Your behavior will decide who you become.",
    secenekler: [
      {
        metin: "Give the beggar your time and compassion for nothing, politely turn down the merchant's offer.",
        basariliSonuc: {
          mesaj: "You held the beggar's hand and heard their last words; you were at peace even without the merchant's money.",
          detay: "Some services expect nothing in return.",
        },
        basarisizSonuc: {
          mesaj: "The beggar died in your arms; you did everything you could but this first loss shook you deeply.",
          detay: "Good intentions can't always keep out the pain.",
        },
      },
      {
        metin: "Accept the merchant's offer, take the donation.",
        basariliSonuc: {
          mesaj: "You took the donation, the congregation's coffer filled; you had little time left for the beggar.",
          detay: "Some opportunities come once, and you seized it.",
        },
        basarisizSonuc: {
          mesaj: "The deal got out, whispers of 'selling faith for money' began; still, you were left with a small profit.",
          detay: "Your interests sometimes become visible.",
        },
      },
      {
        metin: "Neglect the beggar, find both suspicious and report them to a higher office.",
        basariliSonuc: {
          mesaj:
            "You reported both; the higher offices noted you as a 'rules man'. Discipline more than compassion started to become your nature.",
          detay: "Rules are a refuge for some people.",
        },
        basarisizSonuc: {
          mesaj: "Your report was found 'excessive'; the congregation started speaking of you as a cold person.",
          detay: "Rigidity sometimes isolates you.",
        },
      },
      {
        metin: "Deal with neither, immerse yourself in an old text outside the official doctrine.",
        basariliSonuc: {
          mesaj: "You stepped away from daily troubles and immersed yourself in an old text; an unfamiliar curiosity woke in you.",
          detay: "Some questions carry you outside the official doctrine.",
        },
        basarisizSonuc: {
          mesaj: "Your indifference was noticed, the congregation grumbled that you were 'aloof'; your mind was elsewhere.",
          detay: "Sometimes your attention has already drifted another way.",
        },
      },
    ],
  },

  oc_din_yol_karsiliksiz_sinav: {
    baslik: "A Test Without Reward",
    metin:
      "An opportunity no one knows about has come up: with a false testimony in an inheritance case you could secure both a large donation for the congregation and a small cut for yourself. No one will ever learn — only you will know.",
    secenekler: [
      {
        metin: "Refuse the offer, don't compromise your honesty.",
        basariliSonuc: {
          mesaj: "You refused; even though no one knows, you know, and that's enough for you. You're a truly honest clergyman now.",
          detay: "Your character is shaped in the moments no one sees.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal became a subject of mockery in some circles as 'naive'; still, your conscience is spotless.",
          detay: "Your honesty sometimes has a price.",
        },
      },
      {
        metin: "Accept, but donate your own cut directly to the congregation.",
        basariliSonuc: {
          mesaj: "You gave even your own cut to the congregation; this act made you a legend in your circle.",
          detay: "Sometimes the right way is the hardest way.",
        },
        basarisizSonuc: {
          mesaj: "Your intent was misread; still, in the end no one could say anything bad about you.",
          detay: "Good intentions aren't always understood right.",
        },
      },
    ],
  },

  oc_din_yol_daha_buyuk_firsat: {
    baslik: "A Bigger Opportunity",
    metin:
      "After you got a taste of that first donation, the same merchant brings a much bigger offer: produce a fake holy relic and sell it to pilgrims. The gain is immense but if it comes to light your reputation is destroyed entirely.",
    secenekler: [
      {
        metin: "Accept the offer, grow the business.",
        basariliSonuc: {
          mesaj:
            "The fake relic quickly gained fame among the pilgrims, your coffer overflowed. You run your religion like a business now.",
          detay: "The voice of your conscience gets smaller and smaller.",
        },
        basarisizSonuc: {
          mesaj: "A traveling scholar noticed the forgery; your reputation was shaken but you pocketed the money anyway.",
          detay: "The gain came, the trust went.",
        },
      },
      {
        metin: "Refuse, but without cutting ties with the merchant, try smaller, less risky dealings.",
        basariliSonuc: {
          mesaj: "You didn't take the big risk but you didn't give up small interests either; you're getting rich slowly but safely.",
          detay: "Greed has its own wisdom too.",
        },
        basarisizSonuc: {
          mesaj: "Even your small dealings started to show; the congregation noticed the strange closeness between you.",
          detay: "Even being cautious sometimes isn't enough.",
        },
      },
    ],
  },

  oc_din_yol_sapkinlik_suphesi: {
    baslik: "A Suspicion of Heresy",
    metin:
      "The higher offices tasked you with investigating a 'heresy' rumor spreading in the region. The evidence is weak but you could grow the investigation and make a name for yourself, or act with restraint and quietly close it.",
    secenekler: [
      {
        metin: "Grow the investigation, turn it into an exemplary case.",
        basariliSonuc: {
          mesaj:
            "Your investigation caused a great stir; the higher offices began to see you as 'a true guardian'. You're spoken of with fear now.",
          detay: "Power is sometimes born of fear.",
        },
        basarisizSonuc: {
          mesaj:
            "The case collapsed, innocent people were harmed; the higher offices warned you 'you went too far' but didn't remove you.",
          detay: "Some mistakes are forgiven but not forgotten.",
        },
      },
      {
        metin: "Act with restraint but secretly build up files to use in the future.",
        basariliSonuc: {
          mesaj: "Outwardly you acted with restraint but now you have a file you could use to silence anyone.",
          detay: "A patient bullying is still bullying.",
        },
        basarisizSonuc: {
          mesaj:
            "One of your files leaked; no one quite understood why you kept so many notes, but they're wary of you now.",
          detay: "Secret intentions sometimes come half to light.",
        },
      },
    ],
  },

  oc_din_yol_golgede_cemaat: {
    baslik: "A Congregation Gathered in the Shadows",
    metin:
      "You noticed the old teaching you'd been studying was leading you somewhere: in the outskirts of the city, a small, secret circle that believes it has broken from the official doctrine is already gathering. They noticed you and are inviting you in.",
    secenekler: [
      {
        metin: "Accept the invitation, aim to become the leader of this circle in time.",
        basariliSonuc: {
          mesaj: "You joined them; you took your place at the core of a small but loyal circle. This is the first seed of your own power.",
          detay: "Some kingdoms are founded with a candle, in the dark.",
        },
        basarisizSonuc: {
          mesaj: "The first meeting didn't go as you expected, you were met with mistrust; still, a door was cracked open.",
          detay: "Building power takes time.",
        },
      },
      {
        metin: "Report them harshly, have them crushed by the institution's power.",
        basariliSonuc: {
          mesaj: "Your report broke up the circle; the higher offices began to see you as someone who 'cleanses heresy'.",
          detay: "Sometimes the answer given to an invitation opens the door to another path.",
        },
        basarisizSonuc: {
          mesaj: "Your report was found without evidence but no one sees you the same way anymore; still, your harsh stance was noted.",
          detay: "Harshness leaves a mark even when it goes unanswered.",
        },
      },
      {
        metin: "Approach them with compassion, try to win them back to the official doctrine.",
        basariliSonuc: {
          mesaj: "Your patient words won a few of them back; the rest at least respect you.",
          detay: "Sometimes the strongest way is the softest.",
        },
        basarisizSonuc: {
          mesaj: "Your efforts didn't work, the circle went on without breaking up; still, your intentions were pure.",
          detay: "Good intentions don't always bring results.",
        },
      },
    ],
  },

  oc_din_durust_01: {
    baslik: "The Famine Granary",
    metin:
      "Famine has gripped the whole region; there's just enough grain in the congregation's granary to get through the winter, but outside hundreds of hungry peasants wait. If you share the granary your own congregation could go hungry too.",
    secenekler: [
      {
        metin: "Share the granary with the peasants, take the risk.",
        basariliSonuc: {
          mesaj: "You opened the granary; both your congregation and the peasants got through the winter, weak but alive.",
          detay: "Hunger is a little lighter when it's borne together.",
        },
        basarisizSonuc: {
          mesaj: "You shared the granary but the winter lasted longer than expected; your congregation went hungry too and you grew weak.",
          detay: "Kindness sometimes demands a heavier price than you'd reckoned.",
        },
      },
      {
        metin: "Think only of your own congregation, keep the granary closed.",
        basariliSonuc: {
          mesaj: "Your congregation got through the winter comfortably but you couldn't forget the starving eyes at the door.",
          detay: "Safety is sometimes bought at the price of your conscience.",
        },
        basarisizSonuc: {
          mesaj: "The peasants learned of the granary and came to the door; a few sacks were taken by force, no one was satisfied.",
          detay: "What you hide comes out sooner or later.",
        },
      },
      {
        metin: "Don't share the granary but distribute your own portion to a few families.",
        basariliSonuc: {
          mesaj: "You distributed your own portion to a few families; something changed without touching the congregation's granary.",
          detay: "You didn't find a big solution but you made a small difference.",
        },
        basarisizSonuc: {
          mesaj: "The portion you distributed barely reached a handful of families, the rest blamed you too.",
          detay: "Your good intentions couldn't reach everyone.",
        },
      },
    ],
  },

  oc_din_durust_02: {
    baslik: "A Corvée Order",
    metin:
      "The regional lord demands compulsory corvée labor from the congregation's peasants for road building; since it's harvest time the peasants will have to leave their fields. The lord hints that an objection could be counted as rebellion.",
    secenekler: [
      {
        metin: "Go before the lord, ask him to postpone the corvée.",
        basariliSonuc: {
          mesaj: "You convinced the lord; the corvée was postponed until after the harvest, the peasants held you in high esteem.",
          detay: "Your courage worked this time.",
        },
        basarisizSonuc: {
          mesaj: "The lord didn't listen, and warned you 'don't go too far'; the corvée was carried out anyway.",
          detay: "Asking for the right thing isn't always accepted.",
        },
      },
      {
        metin: "Secretly help the peasants dodge the corvée.",
        basariliSonuc: {
          mesaj: "You secretly saved a few families from the corvée; no one gave you away.",
          detay: "A silent resistance is a resistance too.",
        },
        basarisizSonuc: {
          mesaj: "Your help came to light, the lord's men warned you and the congregation was hit with a heavy fine.",
          detay: "Secret heroism sometimes comes to light and makes others pay the price too.",
        },
      },
    ],
  },

  oc_din_durust_03: {
    baslik: "The Two Brothers' Case",
    metin:
      "The two sons of a dead farmer have fallen out over their father's single field; both want you to arbitrate. The younger brother seems poorer and more helpless, but the right may be with the older brother.",
    secenekler: [
      {
        metin: "Hear the documents and witnesses, give a neutral verdict.",
        basariliSonuc: {
          mesaj: "Your verdict seemed fair to everyone; the older brother won but you got him to set aside a share for the younger too.",
          detay: "Justice can sometimes run on persuasion too.",
        },
        basarisizSonuc: {
          mesaj: "They didn't accept your verdict, both accused you of favoring the other side.",
          detay: "Being fair doesn't mean pleasing everyone.",
        },
      },
      {
        metin: "Pity the younger brother's helplessness and rule in his favor.",
        basariliSonuc: {
          mesaj: "The younger brother got the field and kissed your hands in gratitude; but the older brother never forgave you.",
          detay: "Your compassion got ahead of justice.",
        },
        basarisizSonuc: {
          mesaj: "The older brother rejected the verdict and took the case to the lord's court; he was found in the right there, and your justice was questioned.",
          detay: "Mercy doesn't change the truth.",
        },
      },
      {
        metin: "Refuse both, try to persuade them to farm the field together.",
        basariliSonuc: {
          mesaj: "You talked through a long night; the brothers agreed to share the field.",
          detay: "Some solutions are born not of verdicts but of patience.",
        },
        basarisizSonuc: {
          mesaj: "Both found your proposal ridiculous, the case went to court anyway.",
          detay: "Not every idea is accepted, especially ones about peace.",
        },
      },
    ],
  },

  oc_din_durust_04: {
    baslik: "The Abandoned Patient",
    metin:
      "A man who caught a contagious disease was thrown out of the house even by his own family; he lies dying alone outside the town, in a hut no one goes near.",
    secenekler: [
      {
        metin: "Go to him, take on his care despite the risk of infection.",
        basariliSonuc: {
          mesaj: "You never left his side for days; the man recovered and never forgot you as long as he lived.",
          detay: "No one saw you go there but it didn't matter.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't save the man and the disease passed to you too; for weeks you yourself lay at death's door.",
          detay: "Only your conscience knows some prices.",
        },
      },
      {
        metin: "Leave him food and prayers from a distance, don't go near.",
        basariliSonuc: {
          mesaj: "You left food at his door every day; the man didn't die alone, though he wasn't quite not alone either.",
          detay: "It wasn't a full sacrifice but it was better than nothing.",
        },
        basarisizSonuc: {
          mesaj: "One morning when you went to the hut you found the man dead; no one was with him.",
          detay: "Help from a distance is sometimes too late.",
        },
      },
    ],
  },

  oc_din_durust_05: {
    baslik: "Nameless Help",
    metin:
      "A young woman who lost her husband, her pride broken because she can't feed her children, asks no one for help. You need to find a way to help her without shaming her, keeping your identity hidden.",
    secenekler: [
      {
        metin: "Leave provisions at her door at night, telling no one.",
        basariliSonuc: {
          mesaj: "For months you left provisions at her door telling no one; the woman never learned who it was.",
          detay: "The most lasting kindnesses sometimes stay unsigned.",
        },
        basarisizSonuc: {
          mesaj: "One night, hurrying so as not to be seen, you knocked over the provision basket, and the neighbors asked who did it.",
          detay: "Staying hidden wasn't as easy as you'd wanted.",
        },
      },
      {
        metin: "Find a merchant as a go-between, pass the help through him.",
        basariliSonuc: {
          mesaj: "The merchant kept his word, the woman never knew where the help came from.",
          detay: "Sometimes carrying a secret is harder than giving it away.",
        },
        basarisizSonuc: {
          mesaj: "The merchant's tongue slipped and he gave your name; the woman, ashamed, never came to the congregation again.",
          detay: "Hiding the trace of a kindness isn't always possible.",
        },
      },
      {
        metin: "Include her in the congregation's common aid fund without naming her.",
        basariliSonuc: {
          mesaj: "Regular help went through the fund; the woman felt indebted to no one.",
          detay: "A system can sometimes be kinder than a personal sacrifice.",
        },
        basarisizSonuc: {
          mesaj: "The fund's resources fell short, the help couldn't last more than a few months.",
          detay: "Even a good arrangement doesn't run without resources.",
        },
      },
    ],
  },

  oc_din_durust_06: {
    baslik: "A Colleague's Sin",
    metin:
      "You learned that a clergyman in the neighboring town collects money from families under the name of 'extra prayers for the souls' of the dead. The man is respected; exposing him could shake both his and the institution's reputation.",
    secenekler: [
      {
        metin: "Report the matter to the higher offices.",
        basariliSonuc: {
          mesaj: "An investigation was opened, the man was removed from duty; some of your colleagues called you a 'snitch'.",
          detay: "Doing the right thing didn't make you liked.",
        },
        basarisizSonuc: {
          mesaj: "The higher offices found the evidence insufficient, the case closed; the man holds a grudge against you now.",
          detay: "Speaking the truth doesn't always produce a result.",
        },
      },
      {
        metin: "Talk with him privately, ask him to stop the practice.",
        basariliSonuc: {
          mesaj: "After a long talk the man stopped the practice, and it became a secret kept between you.",
          detay: "Some corrections happen without making noise.",
        },
        basarisizSonuc: {
          mesaj: "The man saw you as a threat and you gained a jealous enemy; the practice continued.",
          detay: "Even a well-meant warning can breed hostility.",
        },
      },
    ],
  },

  oc_din_durust_07: {
    baslik: "The Usurer's Offer",
    metin:
      "The region's biggest usurer promises the congregation a regular donation in exchange for you not counting it a 'sin' that he treats peasants who can't pay their debts harshly. Your silence means indebted families lose their homes.",
    secenekler: [
      {
        metin: "Refuse the offer, openly criticize the usurer in your sermon.",
        basariliSonuc: {
          mesaj: "Your sermon gathered the peasants' courage, some renegotiated with the usurer.",
          detay: "You saw once more that your words carry weight.",
        },
        basarisizSonuc: {
          mesaj: "The usurer withdrew his donation and tried to humiliate you with his influence; a few families still lost their homes.",
          detay: "The right words don't always have the power to prevail.",
        },
      },
      {
        metin: "Stay silent but secretly pass the donation to the indebted families.",
        basariliSonuc: {
          mesaj: "You got a significant part of the donation to the indebted families; the usurer stayed unaware.",
          detay: "It wasn't a full victory but a few families kept their homes.",
        },
        basarisizSonuc: {
          mesaj: "Where the money went came to light, and the usurer told everyone you were a 'hypocrite'.",
          detay: "Even a secret kindness can look dirty when it comes out.",
        },
      },
    ],
  },

  oc_din_durust_08: {
    baslik: "The Forgotten Elder",
    metin:
      "One of the oldest members of your congregation can no longer walk and his children are in distant lands; no one comes to visit him, he can't even cook his own food.",
    secenekler: [
      {
        metin: "Steal time from your day every day and visit in person, take on his care.",
        basariliSonuc: {
          mesaj: "For months you went to him every day; when he died you were the only one holding his hand.",
          detay: "A loyalty no one sees is a loyalty too.",
        },
        basarisizSonuc: {
          mesaj: "You neglected your own affairs for his care, your other duties in the congregation suffered.",
          detay: "Kindness is sometimes paid for with time stolen from somewhere else.",
        },
      },
      {
        metin: "Find volunteers from the congregation, share out his care.",
        basariliSonuc: {
          mesaj: "A few volunteers started taking turns caring for him; the old man is never alone anymore.",
          detay: "Sometimes the best help is calling others to kindness too.",
        },
        basarisizSonuc: {
          mesaj: "The volunteers got bored after a few weeks, the care fell back to you.",
          detay: "Calling others to responsibility isn't always lasting.",
        },
      },
    ],
  },

  oc_din_durust_09: {
    baslik: "A Sermon Against Injustice",
    metin:
      "The lord had an old farmer who couldn't pay his tax whipped to make an example. The congregation wonders what you'll say on Sunday; if you stay silent you're counted as approving, if you speak openly you draw the lord's wrath.",
    secenekler: [
      {
        metin: "Openly criticize the injustice in your sermon.",
        basariliSonuc: {
          mesaj: "Your words echoed through the whole town; the lord was furious but the congregation had never loved you so much.",
          detay: "Some sermons are never forgotten.",
        },
        basarisizSonuc: {
          mesaj: "The lord counted your sermon as 'incitement' and withdrew the privileges he'd given the congregation.",
          detay: "The price of the right words is sometimes paid by everyone together.",
        },
      },
      {
        metin: "Without raising the matter directly, give a general sermon on mercy.",
        basariliSonuc: {
          mesaj: "Without targeting anyone directly you spoke of mercy; everyone understood what you implied but no one took offense.",
          detay: "Sometimes an indirect word can change something too.",
        },
        basarisizSonuc: {
          mesaj: "The congregation found your sermon inadequate, they whispered 'he shied away from speaking the truth'.",
          detay: "Being cautious sometimes gets confused with cowardice.",
        },
      },
    ],
  },

  oc_din_durust_10: {
    baslik: "A Rumor of Sainthood",
    metin:
      "The peasants who saw you take turns caring for the sick all last winter started telling of a 'holy light' they saw over you. The rumor is growing; some are all but likening you to a saint.",
    secenekler: [
      {
        metin: "Openly deny the rumor, say you were only doing your duty.",
        basariliSonuc: {
          mesaj: "You insistently rejected the rumor; though some still keep believing, the congregation's trust in you deepened further.",
          detay: "Humility sometimes wins the greatest reputation.",
        },
        basarisizSonuc: {
          mesaj: "No matter how you denied it, the rumor kept spreading on its own.",
          detay: "Some stories live independently of the one they're about.",
        },
      },
      {
        metin: "Don't get involved in the rumor, neither confirm nor deny it.",
        basariliSonuc: {
          mesaj: "Your silence grew the rumor; people came even from distant villages to see you.",
          detay: "Even what you don't say sometimes speaks for you.",
        },
        basarisizSonuc: {
          mesaj: "Some of your colleagues read your silence as 'arrogance' or 'fraud'.",
          detay: "Neither speaking nor keeping silent is always read right.",
        },
      },
    ],
  },

  oc_din_durust_11: {
    baslik: "A Cry Within a Secret",
    metin:
      "A woman who came for confession whispered that her husband beats her and her children; she wants help but begs 'tell no one'. Her husband is a respected member of the congregation.",
    secenekler: [
      {
        metin: "Keep the secret, secretly find the woman a place of refuge.",
        basariliSonuc: {
          mesaj: "You secretly settled the woman and her children with a distant relative; no one learned how she escaped.",
          detay: "Full justice didn't come but at least they're safe.",
        },
        basarisizSonuc: {
          mesaj: "The husband saw you behind his wife's disappearance, and started threatening you.",
          detay: "Even a quiet rescue doesn't go unnoticed.",
        },
      },
      {
        metin: "Persuade the woman to report the situation openly to the authorities.",
        basariliSonuc: {
          mesaj: "The woman gathered her courage, made a complaint; the husband was punished and you never broke the secret.",
          detay: "Sometimes the best help is enabling someone to find their own voice.",
        },
        basarisizSonuc: {
          mesaj: "The woman got scared and withdrew her complaint; the husband found out and drove the woman from the congregation.",
          detay: "Courage isn't always enough.",
        },
      },
      {
        metin: "Break the secret, report the situation directly to the higher offices.",
        basariliSonuc: {
          mesaj: "The higher offices intervened, the woman and children were taken into protection; but no one wants to give you a secret anymore.",
          detay: "To save a life you sacrificed a professional value.",
        },
        basarisizSonuc: {
          mesaj: "It got out that you broke the secret, the congregation stopped coming to confession; and the help didn't reach the woman either.",
          detay: "The worst case happened: no secret was kept and the woman wasn't saved.",
        },
      },
    ],
  },

  oc_din_durust_12: {
    baslik: "In the Flames",
    metin:
      "At midnight flames rise from a neighboring house; the shouting makes clear someone is still inside. No one dares to go in, and you hesitate too.",
    secenekler: [
      {
        metin: "Rush in, try to save the child.",
        basariliSonuc: {
          mesaj: "In the smoke you found the child by touch and got them out; the burns on your arms healed but left scars.",
          detay: "Some moments require acting without thinking.",
        },
        basarisizSonuc: {
          mesaj: "The smoke brought you down, they had to drag you out too; you couldn't reach the child.",
          detay: "Courage isn't always enough.",
        },
      },
      {
        metin: "Stay outside, direct the others to carry water and put out the fire.",
        basariliSonuc: {
          mesaj: "Thanks to the chain you organized, the fire was put out before it spread to the neighboring houses.",
          detay: "Not all heroism is inside the flames.",
        },
        basarisizSonuc: {
          mesaj: "Despite your efforts the house burned down entirely, the child inside couldn't be saved.",
          detay: "Some nights end in pain no matter what you do.",
        },
      },
    ],
  },

  oc_din_durust_13: {
    baslik: "A Cold Night",
    metin:
      "A homeless stranger, coated in ice, came to your door. There's no extra room or blanket in your own hut to spare for him; either you give him your own blanket or you send him elsewhere.",
    secenekler: [
      {
        metin: "Give him your own bed and blanket, sleep in the cold yourself.",
        basariliSonuc: {
          mesaj: "The man warmed through the night and set off grateful in the morning; you woke coughing from the cold.",
          detay: "Some nights take on more meaning when you give your warmth to someone else.",
        },
        basarisizSonuc: {
          mesaj: "The cold caught you too, you lay in fever for days.",
          detay: "You sometimes pay the price of your kindness with your own body.",
        },
      },
      {
        metin: "Direct him to the congregation's common shelter.",
        basariliSonuc: {
          mesaj: "He found a corner at the shelter, the night was gotten through; you weren't left alone with your own cold either.",
          detay: "Even an institutional solution can save a life.",
        },
        basarisizSonuc: {
          mesaj: "The shelter was full, the man was found frozen further down the road.",
          detay: "Directing someone sometimes isn't enough.",
        },
      },
      {
        metin: "Take him in but stay awake, suspecting he could be dangerous.",
        basariliSonuc: {
          mesaj: "The man was only a traveler; in the morning he left praying for you, and you were exhausted but at peace.",
          detay: "Your suspicion came to nothing but your caution harmed no one.",
        },
        basarisizSonuc: {
          mesaj: "While you'd fallen asleep the man took a few of your things and left.",
          detay: "Kindness is sometimes abused, still you're not sorry.",
        },
      },
    ],
  },

  oc_din_durust_14: {
    baslik: "A Sworn Dispute",
    metin:
      "Two merchants want to settle a trade dispute between them before the temple, with a holy oath; both will swear in your presence and you'll decide who's telling the truth.",
    secenekler: [
      {
        metin: "Examine the evidence carefully, give a neutral verdict.",
        basariliSonuc: {
          mesaj: "Your verdict was accepted by both sides; the impartiality of your justice was talked about in the city.",
          detay: "Some reputations are won with patience.",
        },
        basarisizSonuc: {
          mesaj: "The losing side didn't accept your verdict, accused you of being 'on the other's side'.",
          detay: "Even impartiality can sometimes look partial.",
        },
      },
      {
        metin: "Try to persuade both to settle before the oaths.",
        basariliSonuc: {
          mesaj: "You sat them both at the table, they found a middle way between them; the holy oath was never needed.",
          detay: "Sometimes the best arbitration is making arbitration unnecessary.",
        },
        basarisizSonuc: {
          mesaj: "Both refused the settlement, the case had to be solved by oath after all.",
          detay: "Not everyone wants peace.",
        },
      },
    ],
  },

  oc_din_durust_15: {
    baslik: "The Higher Office's Offer",
    metin:
      "The region's higher office wants you to record a certain family's sins 'lightly'; in return, it hints, more resources will be allocated to your place of worship. Refusing could also end your hopes of promotion.",
    secenekler: [
      {
        metin: "Refuse the offer, keep the records as they are.",
        basariliSonuc: {
          mesaj: "Your refusal displeased the higher office but your records weren't corrupted; and you slept easy.",
          detay: "Some promotions are too expensive to accept.",
        },
        basarisizSonuc: {
          mesaj: "The higher office didn't forget your refusal, the resources for your place of worship were cut.",
          detay: "Your principles sometimes show up straight in your pocket.",
        },
      },
      {
        metin: "Refuse the offer but openly share the situation with the other clergy.",
        basariliSonuc: {
          mesaj: "Sharing the situation gathered the other clergy's courage too; the higher office backed down.",
          detay: "You weren't alone, and seeing that strengthened you.",
        },
        basarisizSonuc: {
          mesaj: "No one supported you, the higher office branded you a 'troublemaker'.",
          detay: "Doing the right thing sometimes leaves you standing alone.",
        },
      },
    ],
  },

  oc_din_durust_16: {
    baslik: "A Foreign Traveler",
    metin:
      "A hungry, exhausted traveler of a different faith came to your door. Some members of your congregation think it's not right to help someone not of their religion.",
    secenekler: [
      {
        metin: "Give the traveler food, shelter him for a few days.",
        basariliSonuc: {
          mesaj: "The traveler stayed a few days, gathered his strength and went on his way; some congregation members criticized you but your conscience was at ease.",
          detay: "Kindness is more meaningful when it knows no boundaries.",
        },
        basarisizSonuc: {
          mesaj: "Some congregation members openly rebelled, accused you of 'leaving our own people to care for a stranger'.",
          detay: "Something you know to be right isn't counted right in everyone's eyes.",
        },
      },
      {
        metin: "Direct him to the inn at the congregation's edge, pay for a night from your own purse.",
        basariliSonuc: {
          mesaj: "The traveler spent a safe night at the inn, no one was disturbed.",
          detay: "Sometimes a small solution prevents a big argument.",
        },
        basarisizSonuc: {
          mesaj: "The innkeeper didn't want to take in someone of a different faith, the traveler took to the roads anyway.",
          detay: "Your good intentions don't always get a return.",
        },
      },
    ],
  },

  oc_din_durust_17: {
    baslik: "An Invitation From the Big City",
    metin:
      "A rich place of worship in the big city invites you as chief assistant; the salary and standing are much greater. But here, your poor congregation doesn't know who'll look after them if you leave.",
    secenekler: [
      {
        metin: "Refuse the invitation, stay with your congregation.",
        basariliSonuc: {
          mesaj: "When the congregation heard your decision they were in tears; no one feared 'will he leave us' from you again.",
          detay: "Some loyalties can't be measured by salary.",
        },
        basarisizSonuc: {
          mesaj: "You stayed but you couldn't help thinking, deep down, about the opportunity you missed.",
          detay: "Even the right choice sometimes leaves a slight regret.",
        },
      },
      {
        metin: "Accept the invitation but insist on leaving a trustworthy person in your place.",
        basariliSonuc: {
          mesaj: "The young clergyman you left in your place did a good job; you began a new life in the city.",
          detay: "Your conscience isn't fully at ease but at least you didn't abandon your congregation.",
        },
        basarisizSonuc: {
          mesaj: "The person you left couldn't get along with the congregation, many people left the place of worship.",
          detay: "Even a well-meaning plan may not make everyone happy.",
        },
      },
    ],
  },

  oc_din_durust_18: {
    baslik: "The Enemy's Wounded",
    metin:
      "After a clash, a badly wounded soldier from the enemy ranks was dragged to the congregation's door; if you tend him your own side could brand you a 'traitor', if you don't the man will die there.",
    secenekler: [
      {
        metin: "Bind his wound, secretly take on his care until he heals.",
        basariliSonuc: {
          mesaj: "The man recovered and quietly returned to his own lands by night; no one learned you'd seen him.",
          detay: "An enemy's life is a life too, you thought.",
        },
        basarisizSonuc: {
          mesaj: "Your neighbors noticed him, accused you of 'harboring the enemy'.",
          detay: "The voice of your conscience sometimes runs against the voice of the people.",
        },
      },
      {
        metin: "Bind his wound but report the situation to your own side's commander.",
        basariliSonuc: {
          mesaj: "The commander took the wounded man prisoner but treated him humanely; thanks to your intervention the man at least lived.",
          detay: "Not exactly the result you wanted but you avoided the worst.",
        },
        basarisizSonuc: {
          mesaj: "The commander executed the wounded man without a trial; your care was for nothing.",
          detay: "Sometimes you can't decide the outcome of your own good intentions.",
        },
      },
    ],
  },

  oc_din_durust_19: {
    baslik: "One of Your Own Blood",
    metin:
      "A distant relative of yours secretly asks for a share from the congregation's aid fund because he can't pay his debts; 'family is for family,' he says. The fund is set aside for other poor families waiting in line.",
    secenekler: [
      {
        metin: "Refuse the request, leave the fund for the families in line.",
        basariliSonuc: {
          mesaj: "You distributed the fund in order; your relative sulked but the congregation kept trusting your impartiality.",
          detay: "Some ties don't come before your principles.",
        },
        basarisizSonuc: {
          mesaj: "Your relative accused you of turning your back on family and never spoke to you again.",
          detay: "Doing the right thing sometimes costs you those closest to you.",
        },
      },
      {
        metin: "Help your relative from your own pocket, not the fund.",
        basariliSonuc: {
          mesaj: "You helped your relative from your own purse, never touched the fund; no one could count it an injustice.",
          detay: "You showed your loyalty without wronging anyone.",
        },
        basarisizSonuc: {
          mesaj: "The help you gave from your own purse wasn't enough to clear his debt, and your relative reproached you anyway.",
          detay: "Sometimes no matter how much you give it isn't enough.",
        },
      },
    ],
  },

  oc_din_durust_20: {
    baslik: "A Life's Reckoning",
    metin:
      "Your hair has gone gray, your hands have begun to tremble. A young clergyman asks you to tell, like a will, the wisdom you've gathered over the years; but what you remember most are the small kindnesses no one knew about.",
    secenekler: [
      {
        metin: "Tell him not only your successes but your mistakes and regrets too.",
        basariliSonuc: {
          mesaj: "When the young clergyman heard your flaws he respected you more; he called you 'real'.",
          detay: "An imperfect example sometimes inspires more.",
        },
        basarisizSonuc: {
          mesaj: "Some of your mistakes disappointed him, he didn't idealize you as much anymore.",
          detay: "Honesty sometimes shrinks the legend and enlarges the person.",
        },
      },
      {
        metin: "Stay silent, ask only that the small kindnesses you did be remembered.",
        basariliSonuc: {
          mesaj: "Your name didn't appear in the great stories but those who knew you never forgot the provisions you left at their doors.",
          detay: "The finest of some legacies is written not in records but in hearts.",
        },
        basarisizSonuc: {
          mesaj: "In time your name was forgotten, your deeds attributed to other names.",
          detay: "A modest life sometimes gets quietly erased.",
        },
      },
    ],
  },

  oc_din_yozlasmis_01: {
    baslik: "The Relic Workshop",
    metin:
      "Your merchant partner set up a secret workshop outside the city; there, old cloths and animal bones become 'holy relics'. He wants an origin story and a blessing from you for each piece — your signature is the only thing that makes the fake real.",
    secenekler: [
      {
        metin: "Make up an origin story with your own hand for each relic, 'bless' it with a ceremony.",
        basariliSonuc: {
          mesaj: "The stories you invented enchanted the pilgrims; the workshop's output became the congregation's biggest source of income.",
          detay: "Every relic has a lie now but no one asks.",
        },
        basarisizSonuc: {
          mesaj: "They noticed you told two different pilgrims contradicting stories about the same relic; whispers of a 'lying preacher' began.",
          detay: "Lies dig their own graves the moment they stop being consistent.",
        },
      },
      {
        metin: "Choose only the few most 'convincing' pieces, refuse the rest.",
        basariliSonuc: {
          mesaj: "The few pieces you chose sold without trouble; the workshop stayed small but safe.",
          detay: "Reining in your greed is sometimes the smartest calculation.",
        },
        basarisizSonuc: {
          mesaj: "Even being selective angered the merchant; he questioned the partnership, saying 'you have no nerve'.",
          detay: "Moderation sometimes doesn't even satisfy your accomplice.",
        },
      },
      {
        metin: "Hand the dirty part of the work to your apprentice, you just do the blessing ceremony.",
        basariliSonuc: {
          mesaj: "Your apprentice took on the production, you only appeared at the ceremonies; your coffer filled with your hands staying clean.",
          detay: "Sharing out the responsibility is really no different from sharing the guilt.",
        },
        basarisizSonuc: {
          mesaj: "Your apprentice made a mistake, a fake piece he sold turned out clearly rotten; your name got pulled into it too.",
          detay: "Work you hand off to someone else is still your responsibility.",
        },
      },
    ],
  },

  oc_din_yozlasmis_02: {
    baslik: "A Fake Healing Show",
    metin:
      "Your merchant partner found a man who hasn't walked for years; for money, he'll 'stand up' at your prayer. The stage is set before a crowd; the only risk is a real physician being among them.",
    secenekler: [
      {
        metin: "Do the show, get the man on his feet.",
        basariliSonuc: {
          mesaj: "The man 'miraculously' got to his feet, the crowd rained down donations in tears.",
          detay: "As the applause rings in your ears, only you know the man was never crippled.",
        },
        basarisizSonuc: {
          mesaj: "A physician stepped forward from the crowd, examined the man's leg and announced the fraud aloud.",
          detay: "In an instant the holy man became a con man.",
        },
      },
      {
        metin: "Cancel the show, tell the merchant 'not this time'.",
        basariliSonuc: {
          mesaj: "You cancelled the show; the merchant grumbled but didn't wreck things.",
          detay: "Sometimes the most profitable move is making no move.",
        },
        basarisizSonuc: {
          mesaj: "The merchant took this restraint for weakness, said he'd cut your share on the next offer.",
          detay: "Accomplices have their own logic.",
        },
      },
    ],
  },

  oc_din_yozlasmis_03: {
    baslik: "The Price of the Relic",
    metin:
      "With the business growing, the merchant wants to increase his share; he reminds you that without your 'holy' signature the relics are worthless, but offers to leave you less in return.",
    secenekler: [
      {
        metin: "Bargain hard, protect your share.",
        basariliSonuc: {
          mesaj: "Your hard bargaining worked, you kept your share; the merchant accepted reluctantly.",
          detay: "The balance of power gets talked about even in a criminal partnership.",
        },
        basarisizSonuc: {
          mesaj: "The merchant got angry over the bargaining and stopped the business for a few weeks; you lost your share.",
          detay: "Your greed sometimes eats your own gain.",
        },
      },
      {
        metin: "Accept the offer, keep the peace.",
        basariliSonuc: {
          mesaj: "You accepted the offer, the partnership went on without trouble.",
          detay: "A small share is better than a big fight.",
        },
        basarisizSonuc: {
          mesaj: "Even though you accepted, the merchant still secretly trimmed your share a bit more.",
          detay: "Accomplices rarely weigh things honestly.",
        },
      },
      {
        metin: "Threaten to end the partnership, set up a small production of your own.",
        basariliSonuc: {
          mesaj: "You proved you could manage without the merchant; you built a small network entirely under your own control.",
          detay: "You depend on no one now but you share your secret with no one either.",
        },
        basarisizSonuc: {
          mesaj: "The merchant didn't take your threat seriously, handed the business to someone else; you were left empty-handed.",
          detay: "When some partnerships end, all that's left is regret.",
        },
      },
    ],
  },

  oc_din_yozlasmis_04: {
    baslik: "A Bargain Over Tax Exemption",
    metin:
      "The city's richest family tells the tax collector they are 'under the clergyman's protection' and asks for exemption. In return they offer you a regular, quiet 'donation' — your signature is the only condition.",
    secenekler: [
      {
        metin: "Sign the letter of protection, accept the donation.",
        basariliSonuc: {
          mesaj: "You signed the letter, the family was held exempt from tax; in return your coffer fills every month.",
          detay: "The friendship of the rich isn't cheap but it's steady.",
        },
        basarisizSonuc: {
          mesaj: "The tax inspector found the letter fake and reported it to the city center; your name is now spoken as 'the bribe-taking clergyman'.",
          detay: "A signature on paper sometimes carries a whole reputation.",
        },
      },
      {
        metin: "Refuse, resist the family's pressure.",
        basariliSonuc: {
          mesaj: "You refused; the family was furious but in another circle people started talking about you being 'unbuyable'.",
          detay: "Some refusals gain you more than accepting would.",
        },
        basarisizSonuc: {
          mesaj: "The family didn't forget your refusal, started watching for chances to humiliate you in the city administration.",
          detay: "The price of offending the rich usually comes with a delay.",
        },
      },
      {
        metin: "Stall both sides, wait for the highest offer without deciding.",
        basariliSonuc: {
          mesaj: "Your indecision was actually deliberate; in the end you accepted the highest offer.",
          detay: "Buying time is sometimes the most profitable strategy.",
        },
        basarisizSonuc: {
          mesaj: "Your stalling was noticed, and both the family and the tax collector started calling you 'two-faced'.",
          detay: "Trying to please everyone sometimes pleases no one.",
        },
      },
    ],
  },

  oc_din_yozlasmis_05: {
    baslik: "The Rival's Secret",
    metin:
      "You learned the young clergyman of the neighboring place of worship secretly meets with an innkeeper's daughter. You could use this to discredit him and draw his congregation to yourself.",
    secenekler: [
      {
        metin: "Skillfully leak the information to the congregation.",
        basariliSonuc: {
          mesaj: "The rumor gripped the city, the rival's congregation broke up; most came to your door.",
          detay: "This is a rise built on someone's fall.",
        },
        basarisizSonuc: {
          mesaj: "It came out that you were the source of the leak; you were spoken of as 'a man who wrecks another's life to grow his own business'.",
          detay: "Dirty games sometimes carry the name of the one who plays them.",
        },
      },
      {
        metin: "Keep the information, blackmail the rival directly.",
        basariliSonuc: {
          mesaj: "The rival agreed to pay regularly for your silence; no one learned anything.",
          detay: "Now, as much as his secret, your silence is a crime too.",
        },
        basarisizSonuc: {
          mesaj: "The rival reported the blackmail to the higher offices; you were both put under investigation.",
          detay: "A blackmailer sometimes loses more than his victim.",
        },
      },
    ],
  },

  oc_din_yozlasmis_06: {
    baslik: "A Skeptical Scholar",
    metin:
      "A traveling scholar from a distant city examined one of the relics you sell; he noticed the weave of the cloth didn't match the era claimed and started asking questions.",
    secenekler: [
      {
        metin: "Host the scholar, stall him with theological debates.",
        basariliSonuc: {
          mesaj: "You stalled the scholar with debates; though it didn't fully dispel his doubts, he left the city.",
          detay: "You got off cheap this time; next time you may not be so lucky.",
        },
        basarisizSonuc: {
          mesaj: "The scholar wasn't convinced, wrote his doubts into a report and sent it to the higher offices.",
          detay: "There's a shadow over you now; you don't know when it will fall.",
        },
      },
      {
        metin: "Offer the scholar a small 'gift', get him to stay quiet.",
        basariliSonuc: {
          mesaj: "The scholar accepted the gift and quietly left the city.",
          detay: "You bought a scholar's silence; your conscience doesn't forget it.",
        },
        basarisizSonuc: {
          mesaj:
            "The scholar took the offer as an insult and left in a fury, telling everywhere he stopped about 'the fraud who offered a bribe'.",
          detay: "Some gifts should be thought over well before they're given.",
        },
      },
    ],
  },

  oc_din_yozlasmis_07: {
    baslik: "In Exchange for a Marriage Blessing",
    metin:
      "A wealthy family wants to marry their daughter to her relatives — a union against religious rules. If you perform the ceremony you'll get a large payment; if you don't they'll find another clergyman anyway.",
    secenekler: [
      {
        metin: "Perform the ceremony, take the payment.",
        basariliSonuc: {
          mesaj: "You performed the ceremony, pocketed the payment; the family is grateful to you, you're alone with your conscience.",
          detay: "You now say the words you hold sacred with a price tag on them.",
        },
        basarisizSonuc: {
          mesaj: "After the ceremony the union got out, the people accused you of 'bending the rules for money'.",
          detay: "Something meant to stay hidden always slips out of someone's mouth.",
        },
      },
      {
        metin: "Refuse, direct the family to another clergyman.",
        basariliSonuc: {
          mesaj: "You refused; the family sulked but someone else performed the ceremony, and you stayed clean.",
          detay: "Missing some gains is actually a gain.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered the family, it was said around the city that you were 'arrogant'.",
          detay: "Even if it's right, every refusal carries a price.",
        },
      },
    ],
  },

  oc_din_yozlasmis_08: {
    baslik: "A Second Holy Relic",
    metin:
      "You rose to the rank of preacher, your name is known outside the city now. Your merchant partner brings a bold offer this time: a chest you'll present as the bones of a lost saint — fame if it succeeds, an irreparable scandal if it fails.",
    secenekler: [
      {
        metin: "Accept the offer, present the chest with a grand ceremony.",
        basariliSonuc: {
          mesaj: "The chest was presented with a grand ceremony, pilgrims flocked even from neighboring cities. Your name is turning into a legend.",
          detay: "You try not to forget how high you've risen and how deep a lie you stand on.",
        },
        basarisizSonuc: {
          mesaj: "Clergy from another place of worship exposed the chest's inconsistencies publicly; your name became a laughingstock overnight.",
          detay: "You fall as fast as you rose.",
        },
      },
      {
        metin: "Refuse the offer, keep the current small-scale business.",
        basariliSonuc: {
          mesaj: "You didn't take the risk; the merchant was disappointed but things went on quietly as before.",
          detay: "Sometimes the greatest victory is not being tempted.",
        },
        basarisizSonuc: {
          mesaj: "The merchant told others your refusal was 'a lack of nerve', your standing in your circle was shaken a bit.",
          detay: "Even being cautious carries a price sometimes.",
        },
      },
      {
        metin: "Prepare the chest but keep the promotion gradual, limited to a small circle.",
        basariliSonuc: {
          mesaj: "You presented the chest only to a small circle you trust; the spread was slow but safe.",
          detay: "Reining in your greed worked this time.",
        },
        basarisizSonuc: {
          mesaj: "Even the small circle told each other, the rumor got out of hand but hasn't turned into a big scandal yet.",
          detay: "Secrets leak no matter how small a circle they're kept in.",
        },
      },
    ],
  },

  oc_din_yozlasmis_09: {
    baslik: "The Ignored Door",
    metin:
      "The same poor woman comes to your door every morning, asking for a piece of bread for her children. You wear silk robes and keep a private cook now; instead of letting her in, should your servant turn her away?",
    secenekler: [
      {
        metin: "Tell your servant to turn her away, spend your time on 'important' matters.",
        basariliSonuc: {
          mesaj: "The woman went away empty-handed every time, and you spent your days doing accounts with the merchant.",
          detay: "The voices at your door gradually turned into background noise for you.",
        },
        basarisizSonuc: {
          mesaj: "The woman's crying was heard in the street, the neighbors started saying 'the clergyman is starving people'.",
          detay: "Even ignoring something sometimes gets noticed.",
        },
      },
      {
        metin: "Give her food with your own hand once, then forget about it.",
        basariliSonuc: {
          mesaj: "You gave her a plate of food yourself; the woman went off praying, and you felt a strange unease.",
          detay: "A single kindness doesn't erase all the neglect you've piled up.",
        },
        basarisizSonuc: {
          mesaj: "The single plate you gave drew other hungry families to your door too, you couldn't keep up with them all.",
          detay: "Looking generous once isn't the same as being generous always.",
        },
      },
    ],
  },

  oc_din_yozlasmis_10: {
    baslik: "A Branch in a New City",
    metin:
      "Your merchant partner offers to set up a second 'holy relic' network in a neighboring city using your name. You'll never go to that congregation but you'll take a cut from every sale — your empire is growing.",
    secenekler: [
      {
        metin: "Accept the offer, spread your name to another city too.",
        basariliSonuc: {
          mesaj: "The second network quickly began turning a profit; now business is done in your name even in a city you've never seen.",
          detay: "You can't quite judge how big you've grown anymore either.",
        },
        basarisizSonuc: {
          mesaj: "The partner in the neighboring city acted clumsily, a scandal broke out and your name got pulled in too.",
          detay: "A mistake somewhere you can't control burns you too.",
        },
      },
      {
        metin: "Refuse the offer, be content with your own city.",
        basariliSonuc: {
          mesaj: "You refused; the merchant was disappointed but your affairs are still under your eye and control.",
          detay: "Even a small empire should be manageable.",
        },
        basarisizSonuc: {
          mesaj: "The merchant made a deal with another clergyman and put the same idea into action with him; he used your name without asking.",
          detay: "An opportunity you refuse can be dangerous in someone else's hands too.",
        },
      },
    ],
  },

  oc_din_yozlasmis_11: {
    baslik: "Cargo Across the Sea",
    metin:
      "The merchant now wants to ship the fake relics from the harbor to distant lands too; it'll take bribes for the customs officers and the risk of being caught will be much greater.",
    secenekler: [
      {
        metin: "Approve the shipment, take the risk.",
        basariliSonuc: {
          mesaj: "The cargo went without trouble, pilgrims even in distant lands started recognizing your 'holy' seal.",
          detay: "Your name reaches across the seas now, but you don't forget by what lie it reaches.",
        },
        basarisizSonuc: {
          mesaj: "The cargo was stopped at customs, the forgery detected; your name went into an official investigation report.",
          detay: "One harbor officer can put everything you've built for years at risk.",
        },
      },
      {
        metin: "Split the cargo, send part of it by a reliable but more expensive route.",
        basariliSonuc: {
          mesaj: "You split the cargo in two; part reached safely, the other got through with a small loss.",
          detay: "Cautious greed is a strategy too.",
        },
        basarisizSonuc: {
          mesaj: "Splitting it slowed things down, the merchant said the timing was missed and cut your share.",
          detay: "Sometimes even caution demands a price.",
        },
      },
      {
        metin: "Refuse the cargo, keep the business small, by land.",
        basariliSonuc: {
          mesaj: "You didn't take the risk, the merchant grumbled but the business went on quietly as before.",
          detay: "Sometimes reining in your ambition is the greatest gain.",
        },
        basarisizSonuc: {
          mesaj: "The merchant counted your refusal as 'cowardice' and started looking for other partners.",
          detay: "Accomplices' patience is limited too.",
        },
      },
    ],
  },

  oc_din_yozlasmis_12: {
    baslik: "The Bishop's Audit",
    metin:
      "An official auditor from the higher office showed up at your door to examine the place of worship's ledgers and the 'holy relics' section. This is the moment the risk of exposure is highest.",
    secenekler: [
      {
        metin: "Fix the ledgers overnight, greet the auditor with a smile.",
        basariliSonuc: {
          mesaj: "The ledgers you fixed passed the audit, the auditor left satisfied.",
          detay: "You got past it once more but you know these escapes will end one day.",
        },
        basarisizSonuc: {
          mesaj: "The auditor found the inconsistencies, officially declared you 'suspect' and reported it to the higher offices.",
          detay: "Everything you built over years began to totter with a single ledger review.",
        },
      },
      {
        metin: "Openly offer the auditor a bribe.",
        basariliSonuc: {
          mesaj: "The auditor quietly accepted the offer, wrote his report as 'everything in order'.",
          detay: "The only thing protecting you now is that he's an accomplice too.",
        },
        basarisizSonuc: {
          mesaj: "The auditor reported the bribe offer himself to the higher offices; an investigation was opened against you for both forgery and corruption.",
          detay: "Some mistakes crack open a door with no way back.",
        },
      },
    ],
  },

  oc_din_yozlasmis_13: {
    baslik: "An Apocalypse Sermon",
    metin:
      "A strange illness has started in the town. You could present it as a 'divine punishment' and drive the people to donate out of fear, or tell the truth and prevent panic.",
    secenekler: [
      {
        metin: "Give an apocalypse sermon, collect donations through fear.",
        basariliSonuc: {
          mesaj: "Your sermon terrified the people, money rained at your door in exchange for holy protection.",
          detay: "You turned people's fear into money; this was your most profitable sermon.",
        },
        basarisizSonuc: {
          mesaj: "The panic got out of control, and when a few people looked into the real cause it came out you'd exaggerated.",
          detay: "Fear sometimes gets out of your control and hits you too.",
        },
      },
      {
        metin: "Tell the truth, try to calm the people.",
        basariliSonuc: {
          mesaj: "Your calm words prevented panic; the people felt real gratitude toward you.",
          detay: "Sometimes telling the truth is the most profitable sermon.",
        },
        basarisizSonuc: {
          mesaj: "Your words weren't heeded, the panic had already spread.",
          detay: "The truth can't always get ahead of fear.",
        },
      },
      {
        metin: "Tell a half-truth: present the illness as both a warning and a natural event.",
        basariliSonuc: {
          mesaj: "Your words eased both your conscience and your coffer a bit; the people were neither fully afraid nor fully calm.",
          detay: "Standing in the middle is sometimes the safest way.",
        },
        basarisizSonuc: {
          mesaj: "Your mixed message caused confusion, no one knew what to do.",
          detay: "Half-truths are sometimes received as if no truth was told at all.",
        },
      },
    ],
  },

  oc_din_yozlasmis_14: {
    baslik: "An Eye in the Rival Congregation",
    metin:
      "The place of worship at the other end of the city is getting more and more in the way of your affairs. You're thinking of planting a young, loyal apprentice there 'temporarily' to gather information from inside.",
    secenekler: [
      {
        metin: "Send the apprentice, have him spy.",
        basariliSonuc: {
          mesaj: "Your apprentice brought you the rival place of worship's weak points; you started cornering them one by one.",
          detay: "No one knows what goes on there better than you now.",
        },
        basarisizSonuc: {
          mesaj: "Your apprentice was caught, confessed whose name he worked for; the scandal came all the way to your door.",
          detay: "The person you send can come back and sink you too.",
        },
      },
      {
        metin: "Give it up, choose to compete directly.",
        basariliSonuc: {
          mesaj: "You gave up on spying, focused instead on strengthening your own sermons.",
          detay: "Some wars are won not in the shadows but in the open.",
        },
        basarisizSonuc: {
          mesaj: "The competition got hard anyway, the rival congregation kept growing.",
          detay: "Staying honest doesn't always put you ahead.",
        },
      },
    ],
  },

  oc_din_yozlasmis_15: {
    baslik: "Your Own Sainthood",
    metin:
      "Some members of your congregation now believe your touch 'brings healing' and your dreams are 'prophecies'. You could feed this belief and turn yourself into a half-sacred figure.",
    secenekler: [
      {
        metin: "Feed the belief, grow your own legend.",
        basariliSonuc: {
          mesaj: "Your legend grew; there are people queuing now just to touch you.",
          detay: "You sometimes forget how far this figure you created has drifted from your real self.",
        },
        basarisizSonuc: {
          mesaj: "The higher offices found these 'holiness' rumors close to heresy and formally warned you.",
          detay: "Trying to make yourself holy starts to conflict with religion itself.",
        },
      },
      {
        metin: "Gently reject the belief, say 'I'm a servant like you'.",
        basariliSonuc: {
          mesaj: "Your humility disappointed some but earned you a respected reputation.",
          detay: "Sometimes refusing leaves a stronger impression than accepting.",
        },
        basarisizSonuc: {
          mesaj: "Despite your refusal the rumor kept spreading on its own, it was out of your hands.",
          detay: "A legend sometimes grows against its subject's wishes.",
        },
      },
    ],
  },

  oc_din_yozlasmis_16: {
    baslik: "The Apprentice's Suspicion",
    metin:
      "Your closest apprentice accidentally saw a chest in the relic workshop; he seems to have realized the 'holy bones' inside came from a slaughterhouse. He looks at you strangely.",
    secenekler: [
      {
        metin: "Talk to him, admit the truth and make him an accomplice.",
        basariliSonuc: {
          mesaj: "Your apprentice was shocked but accepted your offer; he takes a cut now and carries the secret too.",
          detay: "Sharing a lie makes it heavier but safer.",
        },
        basarisizSonuc: {
          mesaj: "Your apprentice refused in horror, said he'd leave you and tell the congregation.",
          detay: "Someone you trust can turn into your biggest threat.",
        },
      },
      {
        metin: "Silence him with money or threats.",
        basariliSonuc: {
          mesaj: "Your apprentice took the money and stayed quiet; but there's no trust like before between you now.",
          detay: "You bought his loyalty but what's bought can always be sold back.",
        },
        basarisizSonuc: {
          mesaj: "Your threat scared the apprentice badly; he left the congregation and told everyone what he saw.",
          detay: "A mouth you silence with fear can rise much louder with anger.",
        },
      },
    ],
  },

  oc_din_yozlasmis_17: {
    baslik: "The Widow's Will",
    metin:
      "A rich, lonely widow who just lost her husband comes to you for comfort. You could persuade her to leave her will to 'the congregation' — meaning largely to you.",
    secenekler: [
      {
        metin: "Comfort her for months, steer the will toward yourself.",
        basariliSonuc: {
          mesaj: "When the woman died most of her fortune went to the congregation — that is, effectively to you.",
          detay: "While you listened to her loneliness you were really always thinking about her will.",
        },
        basarisizSonuc: {
          mesaj: "Her family took the will to court, exposed you as 'the clergyman who tricked an old woman'.",
          detay: "Some plans backfire even after their subject's death.",
        },
      },
      {
        metin: "Offer genuine comfort, don't mention the will.",
        basariliSonuc: {
          mesaj: "You truly kept the woman company without ever mentioning her will. A small donation came of its own accord.",
          detay: "Sometimes wanting nothing gains you the most.",
        },
        basarisizSonuc: {
          mesaj: "Your efforts to comfort fell short, the woman was left alone with her loneliness.",
          detay: "You can't ease every pain.",
        },
      },
      {
        metin: "Inform her family, ask a small commission for the go-between service.",
        basariliSonuc: {
          mesaj: "You informed the family, took a small brokerage share; everyone left pleased with you.",
          detay: "Sometimes the middle way manages both the conscience and the coffer.",
        },
        basarisizSonuc: {
          mesaj: "The family grew suspicious, 'why did you get involved', and your relationship cooled.",
          detay: "Even well-meaning brokering can be misunderstood.",
        },
      },
    ],
  },

  oc_din_yozlasmis_18: {
    baslik: "The Woman at the Hungry Door",
    metin:
      "Coming back one evening from a dinner in your fur robe, you find a woman fainted from hunger on the steps of the place of worship. The money in your bag would cover more than a week of food for her.",
    secenekler: [
      {
        metin: "Stop, help her, really change something.",
        basariliSonuc: {
          mesaj: "You lifted the woman, gave her food and money; for the first time in a long while you felt you'd really done something.",
          detay: "Maybe the thing you've been looking for all these years was this simple.",
        },
        basarisizSonuc: {
          mesaj: "Before your help could reach her the woman came round on her own, recognized you and left in anger; 'so now you remember us,' she said.",
          detay: "Some moments of conscience come too late.",
        },
      },
      {
        metin: "Leave it to your servant, go inside, you have an important meeting.",
        basariliSonuc: {
          mesaj: "You left it to your servant, went in and continued your meeting; the woman's state stuck in your mind but you never thought about it again.",
          detay: "The voice of your conscience is silenced more and more easily.",
        },
        basarisizSonuc: {
          mesaj: "The woman screamed in front of the door and exposed you, a few passersby witnessed it.",
          detay: "The things you ignore sometimes make you visible too.",
        },
      },
    ],
  },

  oc_din_yozlasmis_19: {
    baslik: "The Lord's Loyal Oracle",
    metin:
      "The regional lord summoned you to the palace: if you present his every decision to the people as 'a sign from God', both you and your place of worship will be held tax-exempt for life. In return you'll give up your independence.",
    secenekler: [
      {
        metin: "Accept the offer, become the lord's official oracle.",
        basariliSonuc: {
          mesaj: "You signed the agreement; every sermon of yours now serves the lord's interest but your coffer never empties.",
          detay: "Security is sometimes just another name for a chain.",
        },
        basarisizSonuc: {
          mesaj: "The people started seeing you as the lord's 'puppet', part of your congregation quietly drifted away.",
          detay: "As you gain power, you lose trust.",
        },
      },
      {
        metin: "Politely refuse, choose to stay independent.",
        basariliSonuc: {
          mesaj: "You refused; the lord was disappointed but didn't lose his respect for you.",
          detay: "Some independence can't be measured by any tax exemption.",
        },
        basarisizSonuc: {
          mesaj: "The lord took your refusal as a personal insult, quietly withdrew some of the place of worship's privileges.",
          detay: "Refusing has its own bill.",
        },
      },
    ],
  },

  oc_din_yozlasmis_20: {
    baslik: "The Peak of a Religious Empire",
    metin:
      "The network you built over years of relic trade, bribes and fake miracles has become a power spanning cities. But your merchant partner fell ill and died, and his heirs got hold of all the ledgers — the ledgers that could expose you completely.",
    secenekler: [
      {
        metin: "Bargain directly with the heirs, buy the ledgers.",
        basariliSonuc: {
          mesaj: "You bought back the ledgers at a heavy price and burned them; your empire stood unshaken.",
          detay: "You spent most of the fortune you gathered over years destroying the proof of that fortune.",
        },
        basarisizSonuc: {
          mesaj: "One of the heirs sent a copy of the ledgers to the higher offices before the deal; the whole network began to crack.",
          detay: "Everything years have built can be shaken by a single letter.",
        },
      },
      {
        metin: "Risk everything, hire men to steal the ledgers.",
        basariliSonuc: {
          mesaj: "The men you hired quietly seized and destroyed the ledgers; the danger passed but your conscience was never the same again.",
          detay: "You're not just a con man now but someone who had theft done to cover it up.",
        },
        basarisizSonuc: {
          mesaj: "The men you hired were caught and gave your name; an investigation was opened against you for both forgery and incitement to theft.",
          detay: "The empire you built turned in the end into a weight that could crush you too.",
        },
      },
      {
        metin: "Leave it all, take your fortune and quietly flee to another city.",
        basariliSonuc: {
          mesaj: "You quietly left the city at midnight; your empire collapsed but at least you weren't put in chains.",
          detay: "Leaving behind everything you built over years, you felt a strange lightness.",
        },
        basarisizSonuc: {
          mesaj: "Your escape was noticed halfway, a clash broke out with the men sent to catch you.",
          detay: "Fleeing is sometimes more dangerous than being caught.",
        },
      },
    ],
  },

  oc_din_fanatik_01: {
    baslik: "The First Interrogation",
    metin:
      "You're running a case alone for the first time: the wool merchant's daughter, according to the neighbors, mutters 'strange words' at night. The only evidence you have is the hearsay of two neighbors. The decision is yours.",
    secenekler: [
      {
        metin: "Interrogate the girl hard, try to get a fast confession.",
        basariliSonuc: {
          mesaj: "The girl said whatever came to her out of fear; your report went to the higher offices as 'a firm confession'.",
          detay: "A doubt stirred in you but you crushed it at once — doubt is weakness, you told yourself.",
        },
        basarisizSonuc: {
          mesaj: "The girl said nothing, only cried; you came away empty-handed but your faith wasn't shaken.",
          detay: "Some silences come not from guilt but from fear — but you didn't want to think about that.",
        },
      },
      {
        metin: "Talk with the neighbors one by one, carefully verify the claim.",
        basariliSonuc: {
          mesaj: "Most of what was told was gossip; you wrote your report cautiously, and still your name was noted as 'a careful interrogator'.",
          detay: "Your meticulousness earned you a credibility from the first day.",
        },
        basarisizSonuc: {
          mesaj: "Your interrogations dragged on, the higher offices grew impatient; you were found 'indecisive'.",
          detay: "Being careful sometimes looks slow.",
        },
      },
      {
        metin: "Without investigating the claim at all, pass it to the higher office as 'there's enough suspicion'.",
        basariliSonuc: {
          mesaj: "The report was accepted, the case passed to the higher-ups; you only struck the first spark.",
          detay: "You never asked what happened to the girl afterward.",
        },
        basarisizSonuc: {
          mesaj: "The higher office rejected your report as 'baseless'; your name started being spoken as 'hasty'.",
          detay: "Some haste doesn't win trust, it loses it.",
        },
      },
    ],
  },

  oc_din_fanatik_02: {
    baslik: "The Neighbor's Denunciation",
    metin:
      "An old widow comes to your door; she accuses her neighbor of heresy. But listened to carefully, her words hint that her real grievance is a land dispute she lost last year.",
    secenekler: [
      {
        metin: "Take the denunciation as genuine, start the investigation.",
        basariliSonuc: {
          mesaj: "An investigation was opened; the widow watches how the case unfolds with curiosity, and you never asked her why she was so eager.",
          detay: "Some denunciations come not from justice but from spite — you didn't want to know that.",
        },
        basarisizSonuc: {
          mesaj: "The neighbor turned out innocent, the land dispute came out; gossip spread among the people that you'd 'been used for a spite case'.",
          detay: "Justice being used as a tool becomes visible sooner or later.",
        },
      },
      {
        metin: "Hear the woman out but question her real motive, refuse the case.",
        basariliSonuc: {
          mesaj: "You saw the land quarrel and refused the case; the widow left in anger but you knew you were right.",
          detay: "Some refusals are the greatest service.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal got out, whispers began that you 'protect heretics'.",
          detay: "Good intentions are sometimes misinterpreted.",
        },
      },
      {
        metin: "Accept the denunciation but without growing the case, just record it — it could be useful later.",
        basariliSonuc: {
          mesaj: "You quietly filed the case; you didn't hurt the woman or ruin her neighbor, but now you have one more piece of paper.",
          detay: "Patience is sometimes the most cold-blooded form of cruelty.",
        },
        basarisizSonuc: {
          mesaj: "Your file was lost or found unimportant; your effort was wasted.",
          detay: "Some calculations don't add up.",
        },
      },
    ],
  },

  oc_din_fanatik_03: {
    baslik: "An Old Friend's Doubt",
    metin:
      "{dost}, someone you've known since childhood, someone you grew up at the same table with, questioned some of the religion's teachings in a mocking tone at dinner one evening. If anyone who heard him repeats it, those words could turn into a denunciation.",
    secenekler: [
      {
        metin: "Quietly warn {dost}, close the subject.",
        basariliSonuc: {
          mesaj: "You pulled {dost} aside and warned him; he never spoke of the subject again.",
          detay: "Some bonds are older and stronger than any rules.",
        },
        basarisizSonuc: {
          mesaj: "Someone heard your warning; it started being said that you 'turned a blind eye' too.",
          detay: "Loyalty sometimes demands a price.",
        },
      },
      {
        metin: "Officially report {dost}, prove your loyalty to your duty.",
        basariliSonuc: {
          mesaj: "Your report was accepted; the higher offices praised you, saying 'he didn't even spare his friend'. {dost} never spoke to you again.",
          detay: "You told yourself this was right, but you had to tell it to yourself in silence — maybe that was a sign too.",
        },
        basarisizSonuc: {
          mesaj: "The case was found trivial, {dost} was released but everything between you died.",
          detay: "Some betrayals can't be taken back, whatever the outcome.",
        },
      },
      {
        metin: "Do nothing, act as if you didn't hear.",
        basariliSonuc: {
          mesaj: "You stayed silent, brushed it off; {dost} thought his words had been forgotten.",
          detay: "Some silences aren't a solution, just a postponement.",
        },
        basarisizSonuc: {
          mesaj: "Someone else had heard and reported it; you too were asked 'why did you stay silent and not report'.",
          detay: "Neutrality, it turned out, wasn't an option in this duty.",
        },
      },
    ],
  },

  oc_din_fanatik_04: {
    baslik: "Expanded Authority",
    metin:
      "After your promotion, the regional bishopric gives you investigative authority over an area of three villages, not just one. This means your hand can reach far more lives.",
    secenekler: [
      {
        metin: "Use your new authority at once, start a wide sweep across all three villages.",
        basariliSonuc: {
          mesaj: "The sweep resonated in all three villages; your name is now a source of fear in the region all on its own.",
          detay: "Power grows the more it's used — or so you think.",
        },
        basarisizSonuc: {
          mesaj: "The sweep caused a panic, the peasants started leaving the region; the higher offices said 'you lost your measure'.",
          detay: "Sometimes emptying a region isn't cleansing it.",
        },
      },
      {
        metin: "Use your authority with restraint, start with the village you know best.",
        basariliSonuc: {
          mesaj: "The trust you built in the first village spread to the other two; your authority grew on solid ground.",
          detay: "A patient power stands longer.",
        },
        basarisizSonuc: {
          mesaj: "Even the first village turned out resistant; your expansion plan was postponed.",
          detay: "Not every ground is as solid as you first thought.",
        },
      },
    ],
  },

  oc_din_fanatik_05: {
    baslik: "Growing the Case",
    metin:
      "The file in your hand is thin: a miller hummed an old pagan song one feast night. If you want you can close it with a small warning; if you want you can present it as proof of 'a deep-rooted network of heresy'.",
    secenekler: [
      {
        metin: "Grow the file, claim there's 'a wide network'.",
        basariliSonuc: {
          mesaj: "The case caused a great stir, your name spread beyond the region; the miller and a few acquaintances were interrogated.",
          detay: "The smallness of the truth never hindered the bigness of the claim.",
        },
        basarisizSonuc: {
          mesaj: "Your claim was refuted, you were mocked with 'your imagination outran the truth'; still, some are wary of you.",
          detay: "Blowing up a small lie sometimes collapses under its own weight.",
        },
      },
      {
        metin: "Warn the miller and keep the file small.",
        basariliSonuc: {
          mesaj: "You warned the miller, closed the file; no one will remember this but your conscience is light.",
          detay: "Some victories are won where no one sees.",
        },
        basarisizSonuc: {
          mesaj: "The higher offices asked 'why didn't you grow it'; your restraint was mistaken for weakness.",
          detay: "In this duty mercy is sometimes counted a flaw.",
        },
      },
    ],
  },

  oc_din_fanatik_06: {
    baslik: "In the Interrogation Room",
    metin:
      "The suspect has been silent for hours. Your assistant suggests moving to harsher methods; 'only pain draws out the truth,' he says. There's something familiar in the eyes of the man across from you — he's silent not from stubbornness but from terror.",
    secenekler: [
      {
        metin: "Approve the harsh methods your assistant suggests.",
        basariliSonuc: {
          mesaj: "The man finally spoke; you don't know how much of what he said is true and how much an escape from pain, but your report is done.",
          detay: "You told yourself you'd found the truth; really you'd only found a voice.",
        },
        basarisizSonuc: {
          mesaj: "The man fainted without saying anything, you had to call a physician; the case was left unfinished.",
          detay: "Sometimes pain grows not the truth you seek but only the silence.",
        },
      },
      {
        metin: "Refuse the method, try to proceed with patience and words.",
        basariliSonuc: {
          mesaj: "After hours of patient talk the man told it of his own accord; your assistant is surprised, you're satisfied.",
          detay: "Sometimes the strongest weapon is waiting.",
        },
        basarisizSonuc: {
          mesaj: "The man never opened up, the higher offices thought you'd acted 'softly'.",
          detay: "Mercy is read in this duty as a weakness, but you don't believe that — not yet.",
        },
      },
    ],
  },

  oc_din_fanatik_07: {
    baslik: "An Innocent Confession",
    metin:
      "The woman you're interrogating, unable to bear it, confessed to things that never happened; her account contradicts itself, clearly invented out of desperation. But a signed confession is a signed confession.",
    secenekler: [
      {
        metin: "Accept the confession as it is, close the case.",
        basariliSonuc: {
          mesaj: "The file was closed as 'solved', the higher offices were pleased with the speed.",
          detay: "Somewhere inside you knew the woman might not really be guilty — but the file was closed, and that was enough.",
        },
        basarisizSonuc: {
          mesaj: "The contradictions caught another interrogator's eye, the case was reopened; your name was spoken this time as 'careless'.",
          detay: "Files closed in haste sometimes come back.",
        },
      },
      {
        metin: "Note the contradictions, mark the confession with a doubt and pass it to the higher office.",
        basariliSonuc: {
          mesaj: "You put your doubt on the official record; the woman's sentence was lightened, and your conscience eased a bit.",
          detay: "Some small honesties bring no great fame but they lighten something.",
        },
        basarisizSonuc: {
          mesaj: "The higher office assessed your doubt as 'needless mercy', the confession was accepted anyway.",
          detay: "Sometimes the machinery of the system turns without your hand stopping it.",
        },
      },
    ],
  },

  oc_din_fanatik_08: {
    baslik: "The Higher Offices' Trust",
    metin:
      "{amir} summoned you privately; praising your resolve in suppressing the 'wave of heresy' in the region, he offers an official alliance: full authority for your investigations, in return for you reporting to him anyone who seems disloyal.",
    secenekler: [
      {
        metin: "Accept the offer, seal the alliance.",
        basariliSonuc: {
          mesaj: "An unspoken understanding formed between you and {amir}; your investigations now run under his shadow but without limit.",
          detay: "You gained power, but you must often ask yourself now in whose name you're working.",
        },
        basarisizSonuc: {
          mesaj: "You accepted the alliance but {amir}'s expectations grew heavier; your every step is reported now.",
          detay: "Some agreements become a burden from the moment they're signed.",
        },
      },
      {
        metin: "Politely turn the offer down, prefer to work independently.",
        basariliSonuc: {
          mesaj: "Your refusal surprised {amir}; you kept your independence but you lost his support too.",
          detay: "Walking alone is sometimes the most expensive freedom.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was taken as an insult; from then on {amir} kept you in the background at every opportunity.",
          detay: "Some doors, once closed, don't open again.",
        },
      },
    ],
  },

  oc_din_fanatik_09: {
    baslik: "Fear Spreading in the Street",
    metin:
      "Passing through the marketplace you noticed: conversations fall silent, heads bow, children cling to their mothers' skirts. Your name isn't a topic of talk anymore, it's become a word of warning.",
    secenekler: [
      {
        metin: "Draw power from this fear, use it to reinforce your authority.",
        basariliSonuc: {
          mesaj: "You walked through the silence, no one met your eyes; this wasn't the respect you sought, but it was the thing most like it.",
          detay: "Mistaking fear for respect is the oldest trick of this duty.",
        },
        basarisizSonuc: {
          mesaj: "You saw a child crying, noticed the terror in the mother's eyes; something twisted in you but you didn't admit the reason to yourself.",
          detay: "Some twinges are doomed to go unanswered.",
        },
      },
      {
        metin: "Stop and try to reassure the people, say the fear is exaggerated.",
        basariliSonuc: {
          mesaj: "A few people came up and thanked you; the fear eased a bit but some circles in the institution read it as 'slackness'.",
          detay: "Building trust moves far slower than spreading fear.",
        },
        basarisizSonuc: {
          mesaj: "No one believed your words; they whispered 'this is a game too', the fear didn't disperse.",
          detay: "Fear, once sown, isn't easily pulled up.",
        },
      },
    ],
  },

  oc_din_fanatik_10: {
    baslik: "A Silent Conscience",
    metin:
      "At night the face of the man you punished comes before your eyes — not his scream, but the bewilderment in his last look. For a moment you think maybe you were wrong. Then you don't know where to put this thought.",
    secenekler: [
      {
        metin: "Suppress this thought, renew your faith in the duty.",
        basariliSonuc: {
          mesaj: "You repeated to yourself that what you did was necessary for a greater good; sleep came, but not as easily as before.",
          detay: "Faith sometimes turns into just a repeated sentence.",
        },
        basarisizSonuc: {
          mesaj: "You tried to suppress it but that look wouldn't leave your mind; you came to morning sleepless.",
          detay: "Some images can't be erased by will.",
        },
      },
      {
        metin: "Take your doubt seriously, quietly re-examine that case.",
        basariliSonuc: {
          mesaj: "You reopened the file; what you found wasn't as bad as you'd feared but it still didn't fully ease you.",
          detay: "Some questions, even answered, don't fully fall silent.",
        },
        basarisizSonuc: {
          mesaj: "It got out that you reopened the file; the higher offices read it as 'doubting your own decisions', your standing was shaken.",
          detay: "In this duty, hesitation is read as a weakness.",
        },
      },
    ],
  },

  oc_din_fanatik_11: {
    baslik: "A Preacher Who Challenges You",
    metin:
      "A young preacher openly criticized your methods before the congregation: 'A faith built on fear is not faith,' he said. In his words you sense both a truth that disturbs you and a threat.",
    secenekler: [
      {
        metin: "Accuse him too of heresy, of defying authority.",
        basariliSonuc: {
          mesaj: "The preacher was silenced, couldn't speak before the congregation again; some found you in the right, some feared you more.",
          detay: "Silencing a criticism is never answering it — but you overlooked that difference.",
        },
        basarisizSonuc: {
          mesaj: "Your accusation was found baseless, the preacher was acquitted; his words are repeated by even more people now.",
          detay: "A voice you try to suppress sometimes comes back louder.",
        },
      },
      {
        metin: "Ignore his words, don't respond to him.",
        basariliSonuc: {
          mesaj: "You didn't respond; the preacher's words were forgotten in time, your authority stayed unshaken.",
          detay: "Some battles are won by not entering them.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was read as 'he couldn't answer him', a few people went over to the preacher's side.",
          detay: "Calm isn't always read as strength.",
        },
      },
      {
        metin: "Debate him openly, before the people.",
        basariliSonuc: {
          mesaj: "You won the debate; the congregation started listening to you with more respect, the preacher fell quiet.",
          detay: "Sometimes the strongest weapon was a true word.",
        },
        basarisizSonuc: {
          mesaj: "The preacher's words seemed more convincing to the congregation; you felt yourself shrink in the people's eyes for the first time.",
          detay: "Authority, once questioned, isn't the same as before.",
        },
      },
    ],
  },

  oc_din_fanatik_12: {
    baslik: "Chief Inquisitor of the Region",
    metin:
      "The bishopric declared you chief inquisitor of the region. No case closes without your approval now, no suspect is interrogated without your knowledge. This is a power greater than even you dreamed.",
    secenekler: [
      {
        metin: "Take a harsh opening decision that will spread your new power across the whole region.",
        basariliSonuc: {
          mesaj: "In your first week you opened showy investigations in three villages at once; your name is known now in every corner of the region — and feared.",
          detay: "Declaring your power has a price; every eye is on you now.",
        },
        basarisizSonuc: {
          mesaj: "The opening was found too harsh, some villages openly resisted; the bishopric asked you to 'find your measure'.",
          detay: "Even a power that seems limitless shows its limits at once.",
        },
      },
      {
        metin: "Consolidate your power quietly, handling cases one by one with care.",
        basariliSonuc: {
          mesaj: "You handled every case one by one, carefully; your authority took root without noise but unshakably.",
          detay: "A quiet power is most often the most lasting.",
        },
        basarisizSonuc: {
          mesaj: "Your meticulousness was read in some circles as 'indecision'; the first months didn't pass as impressively as you'd hoped.",
          detay: "Patience sometimes gives its reward late.",
        },
      },
    ],
  },

  oc_din_fanatik_13: {
    baslik: "The Rich Merchant's Sin",
    metin:
      "The region's richest merchant secretly brought you a 'proof of heresy' about one of his rivals — but this could be a slander invented to wipe his rival out of business. In return he promises you a generous donation.",
    secenekler: [
      {
        metin: "Accept the evidence without questioning, take the donation.",
        basariliSonuc: {
          mesaj: "The rival merchant was arrested, his goods dispersed; the donation promised to you came in full.",
          detay: "You knew justice was being used as a tool of trade; as your coffer filled you chose not to think about it.",
        },
        basarisizSonuc: {
          mesaj: "The slander came to light, the merchant was disgraced but you too started being called 'the one who opens cases for money'.",
          detay: "Some dirty deals can't stay clean.",
        },
      },
      {
        metin: "Investigate the evidence yourself, bring out the truth.",
        basariliSonuc: {
          mesaj: "You exposed the slander, saved the innocent merchant; the rich merchant angrily withdrew his donation.",
          detay: "Some victories don't fill your coffer but they fill your conscience.",
        },
        basarisizSonuc: {
          mesaj: "Your investigation took long, and by then the innocent merchant had already gone bankrupt; you saw justice come too late.",
          detay: "Sometimes finding the truth isn't enough to save.",
        },
      },
    ],
  },

  oc_din_fanatik_14: {
    baslik: "The Final Judgment",
    metin:
      "The court gave its verdict; an old midwife, accused of witchcraft, was sentenced to execution. On the morning of the execution, the authority to lighten the sentence is still in your hands — but doing so could be seen as 'weakness'.",
    secenekler: [
      {
        metin: "Confirm the verdict as it is, let it be an exemplary execution.",
        basariliSonuc: {
          mesaj: "The execution took place before the people; the crowd watched in silence, your name was spoken once more with fear.",
          detay: "You told yourself 'justice was served'; you fell asleep late that night.",
        },
        basarisizSonuc: {
          mesaj: "The execution took place but someone in the crowd wept openly, a child fainted; an uneasy silence fell over the region.",
          detay: "Things done to set an example sometimes leave only fear.",
        },
      },
      {
        metin: "Lighten the sentence, commute it to exile.",
        basariliSonuc: {
          mesaj: "You commuted the sentence to exile; the midwife left the region, some saw it as mercy, some as weakness.",
          detay: "Some decisions shrink you in the institution's eyes but enlarge you in your own.",
        },
        basarisizSonuc: {
          mesaj: "Your decision was overturned by the bishopric, the execution took place without your approval; you understood you could change nothing.",
          detay: "Sometimes even trying to save a person isn't enough — and that's the heaviest of all.",
        },
      },
    ],
  },

  oc_din_fanatik_15: {
    baslik: "The Apprentice's Question",
    metin:
      "The young apprentice assigned to you approaches after an interrogation and asks: 'How can you be so sure that man is really guilty?' In his eyes there's neither rebellion nor approval — only a genuine curiosity.",
    secenekler: [
      {
        metin: "Rebuke him harshly, count questioning as a dereliction of duty.",
        basariliSonuc: {
          mesaj: "The apprentice never asked a question again; he obeys you now but that curiosity in his eyes gave way to a cold silence.",
          detay: "Some students, when silenced, learn not to learn but only to fear.",
        },
        basarisizSonuc: {
          mesaj: "Your rebuke drove the apprentice away; before long he asked for a transfer to another duty.",
          detay: "Some bonds, once broken, don't mend.",
        },
      },
      {
        metin: "Try to answer his question honestly, share your own doubts too.",
        basariliSonuc: {
          mesaj: "You admitted to him that not every case has the same certainty; the apprentice saw this not as a weakness but as a maturity.",
          detay: "Sometimes honesty forms a stronger bond than authority.",
        },
        basarisizSonuc: {
          mesaj: "Your admission unsettled the apprentice further; you later learned he'd filed a small note about you with the higher office.",
          detay: "You'd forgotten that your frankness could be used against you even by someone you trust.",
        },
      },
      {
        metin: "Involve him more in the duty, shape him by your own method.",
        basariliSonuc: {
          mesaj: "You took the apprentice to the next interrogation too; slowly he started seeing through your eyes.",
          detay: "The best way to spread a teaching is to leave it to someone as a legacy.",
        },
        basarisizSonuc: {
          mesaj: "What he saw deeply shook the apprentice; he looked you over with disappointment but said nothing.",
          detay: "Some legacies are passed on even without being accepted.",
        },
      },
    ],
  },

  oc_din_fanatik_16: {
    baslik: "A Buried Past",
    metin:
      "In an old congregation record you saw the name of a meeting you attended in your youth — back then it was an innocent discussion group, but now there are names in it that could be counted 'suspect'. If this record falls into someone else's hands it could be dangerous.",
    secenekler: [
      {
        metin: "Quietly destroy the record.",
        basariliSonuc: {
          mesaj: "You threw the record in the fire; your past exists now only in your memory.",
          detay: "The hands that dig up others' pasts didn't shrink from burying their own.",
        },
        basarisizSonuc: {
          mesaj: "As you destroyed the record an archive clerk saw you; now you have to explain why you were looking for that record.",
          detay: "What you hide can come out along with your effort to hide it.",
        },
      },
      {
        metin: "Leave the record as it is, be ready to face your past.",
        basariliSonuc: {
          mesaj: "You left the record untouched; no one noticed, but you know now that it sits there.",
          detay: "Taking some risks is the only way to lighten a conscience.",
        },
        basarisizSonuc: {
          mesaj: "A rival found this record; now he's getting ready to strike you with your own weapon.",
          detay: "You're most defenseless not when you hide your past but when you think you've hidden it.",
        },
      },
    ],
  },

  oc_din_fanatik_17: {
    baslik: "A Raid Order",
    metin:
      "Deep in the forest, a cave was found where a supposed 'heretic community' gathers. You have the authority to lead a raid with a few of your armed men — but you don't know who's inside or what they're really doing.",
    secenekler: [
      {
        metin: "Order the raid at once, without giving anyone a chance to explain.",
        basariliSonuc: {
          mesaj: "The raid was completed successfully, the community broken up; you still don't fully know what was really going on inside but the victory was written in your name.",
          detay: "Some victories are built on questions not asked.",
        },
        basarisizSonuc: {
          mesaj: "In the cave you met unexpected resistance, one of your men was badly wounded and you barely got out.",
          detay: "The price of stepping into a darkness you don't know is sometimes on your own skin.",
        },
      },
      {
        metin: "First send a scout in secretly, learn what's really going on.",
        basariliSonuc: {
          mesaj: "Your scout reported that only a fugitive hunter's family sheltered inside; you cancelled the raid, no blood was shed for nothing.",
          detay: "Sometimes the greatest victory is not fighting at all.",
        },
        basarisizSonuc: {
          mesaj: "Your scout was noticed, the community fled; you came away empty-handed, the higher offices thought you'd missed the chance.",
          detay: "Caution sometimes looks like a missed opportunity.",
        },
      },
    ],
  },

  oc_din_fanatik_18: {
    baslik: "The Dungeon's Sickness",
    metin:
      "The hours you've spent for months in damp dungeons among sick prisoners have sunk into your body. Your cough wakes you at night, the physician suggests you 'rest a bit' — but you have three open cases in hand.",
    secenekler: [
      {
        metin: "Disregard your health, carry on with the cases.",
        basariliSonuc: {
          mesaj: "You finished all three cases; the higher offices praised your determination but your night cough leaves traces of blood now.",
          detay: "Your devotion to the duty is now strong enough to drown out your body's voice.",
        },
        basarisizSonuc: {
          mesaj: "You fainted in the middle of an interrogation; your assistants had to carry you.",
          detay: "The body can't be silenced forever by will.",
        },
      },
      {
        metin: "Listen to the physician, hand the cases to your assistants and rest.",
        basariliSonuc: {
          mesaj: "A few weeks of rest got you back on your feet; but during that time the cases weren't run with your approval, or your method.",
          detay: "Your body healed, but part of your power slipped from your hands.",
        },
        basarisizSonuc: {
          mesaj: "While resting you learned one of your assistants had given an arbitrary sentence using your name.",
          detay: "Every gap you leave is an open door for someone to fill.",
        },
      },
    ],
  },

  oc_din_fanatik_19: {
    baslik: "A Suspicion Aimed at You",
    metin:
      "{rakip}, using his influence within the institution, targeted you: he claims some of your methods 'deviate from church doctrine', even that you secretly read forbidden texts. The irony is bitter: this is exactly the kind of accusation you use.",
    secenekler: [
      {
        metin: "Defend yourself with your own methods, refute the evidence, drive {rakip} back.",
        basariliSonuc: {
          mesaj: "You tore the accusation to pieces, {rakip} himself was declared a suspect; seeing your own weapon turn back on you was bitter but satisfying.",
          detay: "The system you built could have eaten you too — it didn't this time.",
        },
        basarisizSonuc: {
          mesaj: "The accusation couldn't be fully refuted; you were formally cleared but your every move is watched now.",
          detay: "For the first time you faced this closely the possibility of becoming a victim of your own methods.",
        },
      },
      {
        metin: "Meet with {amir} and ask for backing behind the scenes, avoid an open fight.",
        basariliSonuc: {
          mesaj: "{amir} stood behind you, the accusation quietly dropped; but you're even more dependent on him now.",
          detay: "Some rescues are the first link of a new chain.",
        },
        basarisizSonuc: {
          mesaj: "{amir} didn't want to step in this time; 'fend for yourself,' he said, and left you alone.",
          detay: "Power alliances are tested in the hour of need.",
        },
      },
    ],
  },

  oc_din_fanatik_20: {
    baslik: "A Feared Name",
    metin:
      "Your name in the region is used less like that of a clergyman and more like a warning: even naughty children are hushed with 'behave or I'll take you to him'. The bishopric invites you to teach your methods to other regions.",
    secenekler: [
      {
        metin: "Accept the invitation, teach your methods to other interrogators.",
        basariliSonuc: {
          mesaj: "You taught your methods to dozens of new interrogators; there's a generation raised in your shadow now.",
          detay: "What you built is bigger than you now — and just as hard to stop.",
        },
        basarisizSonuc: {
          mesaj: "What you taught became far more merciless in the hands of some students; you saw that what you created had outgrown even you.",
          detay: "Some legacies pass beyond their maker's control.",
        },
      },
      {
        metin: "Refuse the invitation, choose to keep your power in your own region, alone.",
        basariliSonuc: {
          mesaj: "They read your refusal as 'humility'; you kept working in your own region, your own way.",
          detay: "Some powers stay purer the less they're shared.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was read in some circles as 'jealousy'; young people wanting to take your place began to appear.",
          detay: "Staying at the top is sometimes harder than getting there.",
        },
      },
    ],
  },

  oc_din_tarikat_01: {
    baslik: "The First Disciple",
    metin:
      "As the meeting broke up a young weaver girl came up to you. She said she'd found in your words something she'd never heard in the official sermons, and that she wanted to bind herself to you.",
    secenekler: [
      {
        metin: "Take her as your first disciple, teach her your own doctrine.",
        basariliSonuc: {
          mesaj: "The girl swore to you; your small circle has a core now.",
          detay: "Winning one person outweighed a hundred sermons.",
        },
        basarisizSonuc: {
          mesaj: "The girl was eager but careless; she told your secret to her neighbor.",
          detay: "Your first step brought its first lesson too: loyalty takes patience.",
        },
      },
      {
        metin: "Politely refuse, it isn't time to take anyone in yet.",
        basariliSonuc: {
          mesaj: "You turned the girl away; she left disappointed but your secret stayed safe.",
          detay: "Sometimes the best gain is gaining nothing.",
        },
        basarisizSonuc: {
          mesaj: "Hurt by the rejection, the girl started spreading gossip about you in the area.",
          detay: "The price of breaking a heart was heavier than you thought.",
        },
      },
      {
        metin: "Accept her in a limited way, keep her in the outer circle, don't share your real secret.",
        basariliSonuc: {
          mesaj: "You kept the girl in your outer circle; you gained a curious but reliable face.",
          detay: "Some bonds hold firmer when they're kept at a distance.",
        },
        basarisizSonuc: {
          mesaj: "The girl was uncomfortable with this half-acceptance and lost interest quickly.",
          detay: "Half a trust is often no trust at all.",
        },
      },
    ],
  },

  oc_din_tarikat_02: {
    baslik: "A Suspicious Neighbor",
    metin:
      "The neighbor of the house where you hold your meetings noticed the murmurs leaking out at midnight and the candlelight that never went out. In the morning he came to your door and asked 'what's going on in there'.",
    secenekler: [
      {
        metin: "Stall him with an easy lie: say you were reading night prayers for the sick.",
        basariliSonuc: {
          mesaj: "The neighbor believed your word, your official identity served you.",
          detay: "Your lie was more convincing than the truth.",
        },
        basarisizSonuc: {
          mesaj: "The neighbor wasn't convinced, whispers started in the neighborhood.",
          detay: "Once suspicion is sown, it isn't easily pulled up.",
        },
      },
      {
        metin: "Invite the neighbor to your meetings too, give him your trust.",
        basariliSonuc: {
          mesaj: "The neighbor accepted in astonishment, and quickly became one of you.",
          detay: "Sometimes the greatest threat turns into the most loyal friend.",
        },
        basarisizSonuc: {
          mesaj: "The neighbor refused the invitation and told everyone in the area what he'd seen.",
          detay: "When you lose the trust bet, there's no going back.",
        },
      },
    ],
  },

  oc_din_tarikat_03: {
    baslik: "Your Own Word",
    metin:
      "Your small congregation is waiting for you to say on which points it will part from the official doctrine. Some disciples want a harsher, more fundamentalist interpretation; some want a moderate line close to the old teaching.",
    secenekler: [
      {
        metin: "Impose your own interpretation, shape the doctrine entirely from your mouth.",
        basariliSonuc: {
          mesaj: "Your words are the congregation's only law now; those who believe in you bound themselves even tighter.",
          detay: "A doctrine grows stronger when it comes from a single mouth.",
        },
        basarisizSonuc: {
          mesaj: "Your rigid stance scared some disciples, a few left the circle.",
          detay: "Every certainty leaves someone out.",
        },
      },
      {
        metin: "Be conciliatory, add a bit from everyone's view to the doctrine.",
        basariliSonuc: {
          mesaj: "A common language was found, everyone saw something of themselves in the doctrine.",
          detay: "A compromise grows slowly but it grows deep-rooted.",
        },
        basarisizSonuc: {
          mesaj: "Trying to please everyone, the doctrine blurred, and no one quite knows what they believe.",
          detay: "A word that fits everyone fits no one exactly.",
        },
      },
    ],
  },

  oc_din_tarikat_04: {
    baslik: "The Inner Circle",
    metin:
      "As the number of disciples grew you realized you can't tell everyone the same secrets. It's time to bring some of them closer, into a small inner circle that knows your real aims.",
    secenekler: [
      {
        metin: "Choose the three most loyal, tell them the full truth.",
        basariliSonuc: {
          mesaj: "Your inner circle was formed; you give your orders through them now.",
          detay: "An organization stands not on one man's shoulders but in the hands he trusts.",
        },
        basarisizSonuc: {
          mesaj: "One of your chosen ones couldn't bear the truth, drifted away in fear and spread gossip.",
          detay: "Trust given to the wrong person becomes a weapon.",
        },
      },
      {
        metin: "Keep everyone equal, build no hierarchy, spread the danger.",
        basariliSonuc: {
          mesaj: "Your egalitarian manner calmed the congregation, no one felt excluded.",
          detay: "Some kingdoms stand without a crown.",
        },
        basarisizSonuc: {
          mesaj: "Left without leadership, the circle grew indecisive, a few meetings broke up aimlessly.",
          detay: "A hand that shows no direction isn't followed.",
        },
      },
      {
        metin: "Delay the decision, observe everyone a bit longer.",
        basariliSonuc: {
          mesaj: "Your waiting paid off; real characters came out in time, you chose the right people.",
          detay: "Patience is sometimes the best filter.",
        },
        basarisizSonuc: {
          mesaj: "Your indecision created uncertainty in the congregation, a few people turned to another leader.",
          detay: "Thinking too long is a choice too — usually a bad one.",
        },
      },
    ],
  },

  oc_din_tarikat_05: {
    baslik: "A Hand From the Shadows",
    metin:
      "One of the city's rich merchants reached you concealing his identity. He said he found your doctrine interesting and could finance your circle without asking for silence in return.",
    secenekler: [
      {
        metin: "Accept the offer, get a great resource for your congregation.",
        basariliSonuc: {
          mesaj: "The gold bought the congregation's roof, its table and its silence.",
          detay: "No one gives for nothing; you know that too.",
        },
        basarisizSonuc: {
          mesaj: "The donor's name came out in another affair, and the stain spread to you too.",
          detay: "Gold taken from a dirty hand carries the dirt too.",
        },
      },
      {
        metin: "Refuse, leave your organization dependent on no one.",
        basariliSonuc: {
          mesaj: "You turned the offer down; your congregation stayed poor but free.",
          detay: "Some refusals are worth more than the greatest gain.",
        },
        basarisizSonuc: {
          mesaj: "The donor took your refusal personally and started badmouthing you in other circles.",
          detay: "Every hand you refuse can breed an enemy too.",
        },
      },
    ],
  },

  oc_din_tarikat_06: {
    baslik: "A Fight at the Table",
    metin:
      "Two disciples from your inner circle clashed over the right to speak within the congregation. Both want to win your support and discredit the other.",
    secenekler: [
      {
        metin: "Openly promote one, push the other into the background.",
        basariliSonuc: {
          mesaj: "The one you chose bound himself to you even more, the other quietly withdrew.",
          detay: "Every crown refuses to sit on someone's head.",
        },
        basarisizSonuc: {
          mesaj: "The disciple you left behind departed in resentment; you have an enemy now who knows you from the inside.",
          detay: "Disciples you offend take their secrets with them.",
        },
      },
      {
        metin: "Call them both to you, mediate, reconcile them.",
        basariliSonuc: {
          mesaj: "Your patient words calmed them both, the congregation stayed together.",
          detay: "A leader sometimes just knows how to listen.",
        },
        basarisizSonuc: {
          mesaj: "Your efforts to reconcile didn't work, one of them left the circle.",
          detay: "Not every disagreement ends in a settlement.",
        },
      },
      {
        metin: "Remove them both from the congregation, cut the root of the problem.",
        basariliSonuc: {
          mesaj: "You sent them both away; the congregation was shaken but the strife ended.",
          detay: "Sometimes to save a garden you prune two branches.",
        },
        basarisizSonuc: {
          mesaj: "They both left angry at you and started speaking against you together.",
          detay: "A branch you cut can come back to you, roots and all.",
        },
      },
    ],
  },

  oc_din_tarikat_07: {
    baslik: "An Old Guard",
    metin:
      "An old soldier, wounded in war and thrown out of the army, started coming to your sermons. He said he wanted to give you both his faith and his sword.",
    secenekler: [
      {
        metin: "Make him the congregation's first guard, entrust your protection to him.",
        basariliSonuc: {
          mesaj: "The old soldier came over to your side; you have a sword guarding your meetings now.",
          detay: "A doctrine sometimes lives longer with a shield.",
        },
        basarisizSonuc: {
          mesaj: "The man's old commanders were watching him, and they noticed you too.",
          detay: "Gaining a soldier is gaining his enemies too.",
        },
      },
      {
        metin: "Accept him only as your student, ask him to set his weapon aside.",
        basariliSonuc: {
          mesaj: "The man laid down his sword and became a loyal student to you.",
          detay: "Some men are stronger unarmed.",
        },
        basarisizSonuc: {
          mesaj: "He refused to lay down his weapon and left your circle; he's going around telling others what you say.",
          detay: "You can't hold everyone on your own terms.",
        },
      },
    ],
  },

  oc_din_tarikat_08: {
    baslik: "The Weight of the Crowd",
    metin:
      "Dozens of people now gather secretly at night. The small house is no longer enough and hiding isn't as easy as before; you have to decide how to house your grown congregation.",
    secenekler: [
      {
        metin: "Secretly turn an abandoned mill outside the city into a congregation house.",
        basariliSonuc: {
          mesaj: "The mill is the heart of your congregation now; away from the city's noise, safe.",
          detay: "A roof makes a doctrine permanent.",
        },
        basarisizSonuc: {
          mesaj: "The comings and goings to the mill drew attention, questions started being asked in the region.",
          detay: "The greatest enemy of secrecy is a crowd.",
        },
      },
      {
        metin: "Split the meetings into small groups, see everyone separately.",
        basariliSonuc: {
          mesaj: "The small groups were both more intimate and less conspicuous.",
          detay: "Patient growth sends its roots deep.",
        },
        basarisizSonuc: {
          mesaj: "The split groups started drifting apart, a few disciples lost interest.",
          detay: "A scattered fire doesn't warm.",
        },
      },
    ],
  },

  oc_din_tarikat_09: {
    baslik: "A Blackmailing Tongue",
    metin:
      "A former disciple who left your circle openly threatens to tell the higher offices what he learned. You don't know what he wants in return but it's clear he won't stay silent.",
    secenekler: [
      {
        metin: "Meet him secretly, silence him with gold or threats.",
        basariliSonuc: {
          mesaj: "The man took the money and stayed quiet; for now, at least.",
          detay: "A silence that's bought is the most expensive debt.",
        },
        basarisizSonuc: {
          mesaj: "The meeting angered him further, sped up his denunciation.",
          detay: "Some mouths won't close no matter what you do.",
        },
      },
      {
        metin: "Trust him and ignore it, take no action.",
        basariliSonuc: {
          mesaj: "The man gave up in the end, never carried out his threat.",
          detay: "Sometimes time brings the best solution itself.",
        },
        basarisizSonuc: {
          mesaj: "The denunciation reached the authorities; you're watched carefully now.",
          detay: "A danger you ignore keeps growing.",
        },
      },
      {
        metin: "Try to win him back into your inner circle, remind him of your old bond.",
        basariliSonuc: {
          mesaj: "Your old words touched him; he forgot his threat and came back to you.",
          detay: "Some bridges can be repaired before they collapse.",
        },
        basarisizSonuc: {
          mesaj: "He mistook your attempt to win him back for a sign of weakness and carried out his denunciation with even more zeal.",
          detay: "Some hearts don't come back anymore.",
        },
      },
    ],
  },

  oc_din_tarikat_10: {
    baslik: "The Institution's Inspector",
    metin:
      "An inspector from the official institution came to look into the strange rumors going around the neighborhood. He wants to talk with you; your official identity is still on you, but the questions he asks are getting closer.",
    secenekler: [
      {
        metin: "Act relaxed and convincing, dispel the suspicions entirely.",
        basariliSonuc: {
          mesaj: "The inspector was convinced by your words, went away empty-handed.",
          detay: "A lie can only be carried by a convincing man.",
        },
        basarisizSonuc: {
          mesaj: "The inspector caught an inconsistency; he noted 'to be watched' in his report.",
          detay: "There's a shadow over you now.",
        },
      },
      {
        metin: "Send him off with a small donation and friendly conversation.",
        basariliSonuc: {
          mesaj: "Your donation and kind words put the inspector at ease, his report passed as routine.",
          detay: "Some doors close more quietly with gold.",
        },
        basarisizSonuc: {
          mesaj: "He interpreted your donation as a bribe, his suspicions grew further.",
          detay: "Your good intentions stayed open to misreading.",
        },
      },
    ],
  },

  oc_din_tarikat_11: {
    baslik: "A Hidden Illness",
    metin:
      "A few people from your congregation, which gathers in the damp mill, caught a feverish illness. Calling an outside physician could expose your secret, but keeping the illness inside could cost lives.",
    secenekler: [
      {
        metin: "Secretly call a physician you trust, pay him generously.",
        basariliSonuc: {
          mesaj: "The physician stayed silent, the sick recovered; even though one more person knows your secret, it stayed safe.",
          detay: "Some trust is bought not with gold but with conscience.",
        },
        basarisizSonuc: {
          mesaj: "The physician told a curious neighbor what he'd seen, the rumor spread fast.",
          detay: "Every new eye opens one more crack in your secret.",
        },
      },
      {
        metin: "Try to treat the illness with herbs you know, within the congregation.",
        basariliSonuc: {
          mesaj: "Some recovered, and the congregation's trust in you grew even more in these hard days.",
          detay: "Being with people in a crisis says more than the strongest sermon.",
        },
        basarisizSonuc: {
          mesaj: "Your knowledge wasn't enough, one of the sick couldn't be saved.",
          detay: "The price of secrecy is sometimes a life.",
        },
      },
    ],
  },

  oc_din_tarikat_12: {
    baslik: "A Noble Guest",
    metin:
      "The daughter of one of the city's established families let it be known that she wants to join your congregation secretly. She's not an ordinary disciple; she carries both a great resource and a great risk.",
    secenekler: [
      {
        metin: "Accept, use her wealth and influence for your congregation.",
        basariliSonuc: {
          mesaj: "The noble girl joined your congregation; her influence opened doors for you too.",
          detay: "Sometimes a single name carries more than a hundred sermons.",
        },
        basarisizSonuc: {
          mesaj: "The girl's family learned where their daughter had gone, and came at you in fury.",
          detay: "Every gift from on high brings a high price too.",
        },
      },
      {
        metin: "Politely refuse, protect your congregation from such a conspicuous name.",
        basariliSonuc: {
          mesaj: "She took your refusal with understanding, said nothing to anyone.",
          detay: "Some opportunities deserve to be missed.",
        },
        basarisizSonuc: {
          mesaj: "The rejected girl resentfully mentioned a strange circle to those close to her.",
          detay: "Even someone you refuse can carry your secret.",
        },
      },
      {
        metin: "Accept her only under observation, after a long test.",
        basariliSonuc: {
          mesaj: "The girl was patiently tested, and once she was found truly sincere she joined you with trust.",
          detay: "A trust that isn't rushed lasts longer.",
        },
        basarisizSonuc: {
          mesaj: "The testing process wore out the girl's patience, she gave up and left resentful.",
          detay: "Not everyone is willing to wait.",
        },
      },
    ],
  },

  oc_din_tarikat_13: {
    baslik: "A Secret Alliance Offer",
    metin:
      "A lord who does business in the shadows of the city wanted to meet you. He noticed the growing power of your congregation; he offers a secret alliance for mutual benefit: his protection, your loyal men.",
    secenekler: [
      {
        metin: "Accept the alliance, come under his protection.",
        basariliSonuc: {
          mesaj: "A quiet understanding formed between you and the lord; there's a protective shadow over you now.",
          detay: "Power sometimes grows by being shared — but never for free.",
        },
        basarisizSonuc: {
          mesaj: "The lord's real intent was to use you as a piece in his own game; you realized it too late.",
          detay: "Every protection carries a hidden chain too.",
        },
      },
      {
        metin: "Politely refuse the offer, keep your independence.",
        basariliSonuc: {
          mesaj: "The lord respected your decision, a quiet distance remained between you.",
          detay: "Some alliances teach you something even without being formed.",
        },
        basarisizSonuc: {
          mesaj: "The rejected lord saw it as an insult; you're a threat in his eyes now too.",
          detay: "Every hand you refuse can turn up before you tomorrow.",
        },
      },
    ],
  },

  oc_din_tarikat_14: {
    baslik: "A Young Voice",
    metin:
      "A young disciple from your inner circle started giving his own sermons, spreading his own interpretation. Some followers are drifting toward his more fiery words; your leadership is being seriously questioned for the first time.",
    secenekler: [
      {
        metin: "Confront him openly, prove your leadership again before everyone.",
        basariliSonuc: {
          mesaj: "The weight of your words prevailed over the young man; your leadership stayed unchallenged.",
          detay: "A crown is sometimes made firmer by being challenged.",
        },
        basarisizSonuc: {
          mesaj: "The young disciple left you behind, some of your followers went with him.",
          detay: "Every challenge carries the chance of losing too.",
        },
      },
      {
        metin: "Quietly undermine him, ease him out of the inner circle.",
        basariliSonuc: {
          mesaj: "You gradually distanced the young man from the circle, no one quite understood why.",
          detay: "Some victories are won quietly.",
        },
        basarisizSonuc: {
          mesaj: "Your intent was noticed, some disciples started questioning your real face.",
          detay: "Things done in the shadows sometimes don't stay in the shadows.",
        },
      },
    ],
  },

  oc_din_tarikat_15: {
    baslik: "Loyal Arms",
    metin:
      "Your old guard said he wants to train a few more solid men to protect the congregation. You could become a real center of power now — but an armed group draws attention too.",
    secenekler: [
      {
        metin: "Give permission, let a small guard force be formed.",
        basariliSonuc: {
          mesaj: "A few more old soldiers joined your ranks; your meetings look like a small army now.",
          detay: "A doctrine, once ringed with swords, becomes something else.",
        },
        basarisizSonuc: {
          mesaj: "Your armed men drew attention in the city, got mixed up in a street fight and were caught.",
          detay: "Showing power sometimes loses you power.",
        },
      },
      {
        metin: "Refuse, let the congregation stay a doctrine, not arm itself.",
        basariliSonuc: {
          mesaj: "The old soldier respected your decision, only an inconspicuous watchman remained.",
          detay: "Some powers exist without ever being shown.",
        },
        basarisizSonuc: {
          mesaj: "Your unarmed meeting became a target for robbers one night, a few disciples were hurt.",
          detay: "Everything left unprotected pays a price sooner or later.",
        },
      },
      {
        metin: "Set up an inconspicuous guard limited to just one or two people.",
        basariliSonuc: {
          mesaj: "A small, quiet guard was set up; not big enough to draw attention nor leaving you defenseless.",
          detay: "A measured power is long-lived.",
        },
        basarisizSonuc: {
          mesaj: "Your limited guard wasn't enough to prevent an attack, a few disciples drifted away in fear.",
          detay: "A half measure is sometimes no different from no measure at all.",
        },
      },
    ],
  },

  oc_din_tarikat_16: {
    baslik: "The Noble's Secret Money",
    metin:
      "One of the city's influential lords wants to settle a regular income on your congregation. But in return he expects you to openly take his side in your sermons against a political rival of his.",
    secenekler: [
      {
        metin: "Take the money, steer your sermons the way he wants.",
        basariliSonuc: {
          mesaj: "Your congregation grew rich but your words now serve his interests, not yours.",
          detay: "Gold is sometimes the shiniest link of a chain.",
        },
        basarisizSonuc: {
          mesaj: "Your biased sermons damaged your credibility in the people's eyes, they started seeing you as a tool of interest.",
          detay: "Carrying someone else's war loses you your own voice.",
        },
      },
      {
        metin: "Refuse the money, don't let your doctrine be a tool of anyone's politics.",
        basariliSonuc: {
          mesaj: "Your refusal protected your congregation's independence; your disciples respected you more.",
          detay: "Some wealth is a gain even without being taken.",
        },
        basarisizSonuc: {
          mesaj: "The rejected lord sees you as an obstacle now, quietly started working against you.",
          detay: "The bill for some refusals comes, late as it may be.",
        },
      },
    ],
  },

  oc_din_tarikat_17: {
    baslik: "The Institution's Envoy",
    metin:
      "The official institution can no longer ignore its suspicions; they sent an envoy straight to you. The envoy offers you either to disband your circle entirely or to be openly accused of heresy.",
    secenekler: [
      {
        metin: "Bargain with the envoy, offer him a cut for his silence.",
        basariliSonuc: {
          mesaj: "The envoy accepted your offer, closed his report as 'unimportant'.",
          detay: "Even the institution's own men can be bought.",
        },
        basarisizSonuc: {
          mesaj: "The envoy took your offer as an insult and reported it straight to the higher offices.",
          detay: "Some gambles come back with the heaviest price.",
        },
      },
      {
        metin: "Defy the envoy, openly defend your doctrine.",
        basariliSonuc: {
          mesaj: "Your words surprised the envoy; he withdrew without giving a firm verdict, but you're marked now.",
          detay: "Courage is sometimes a shield all by itself.",
        },
        basarisizSonuc: {
          mesaj: "The envoy openly accused you of heresy; the institution's men are after you.",
          detay: "The price of defiance is sometimes paid with your life.",
        },
      },
    ],
  },

  oc_din_tarikat_18: {
    baslik: "Violence Done in Your Name",
    metin:
      "Your guards raided a street preacher who was criticizing your congregation and beat him one night. They came to you saying 'we protected you'; but you never gave that order.",
    secenekler: [
      {
        metin: "Cover up what they did, reward them to reinforce their loyalty.",
        basariliSonuc: {
          mesaj: "Your guards bound themselves to you even more; you know now they'll do anything for you.",
          detay: "Every act of violence you quietly approve changes you too.",
        },
        basarisizSonuc: {
          mesaj: "The beaten preacher told what happened, fingers pointed at you.",
          detay: "A truth you cover up comes out of someone's mouth sooner or later.",
        },
      },
      {
        metin: "Openly warn them, forbid them from resorting to violence again.",
        basariliSonuc: {
          mesaj: "Your firm warning was understood; your guards never acted on their own again.",
          detay: "A real power is one that can limit itself too.",
        },
        basarisizSonuc: {
          mesaj: "They mistook your warning for weakness, a few guards started acting as if they'd lost respect for you.",
          detay: "Conscience sometimes clashes with authority.",
        },
      },
      {
        metin: "Apologize to the preacher privately, quietly cover his damages.",
        basariliSonuc: {
          mesaj: "The preacher accepted your apology and payment, closed the matter.",
          detay: "Some wounds are best bound quietly.",
        },
        basarisizSonuc: {
          mesaj: "The preacher accepted your apology but told the story anyway, the city is talking about you now.",
          detay: "Forgiving isn't the same as forgetting.",
        },
      },
    ],
  },

  oc_din_tarikat_19: {
    baslik: "One Who Wants to Leave",
    metin:
      "Someone from your inner circle said he no longer wants this life, that he wants to go back to an ordinary one. The problem is, he knows your congregation's deepest secrets and the identities of your guards.",
    secenekler: [
      {
        metin: "Let him go with peace of mind, show him you trust him.",
        basariliSonuc: {
          mesaj: "The man left quietly, never told your secret to anyone.",
          detay: "Sometimes trusting is stronger than the smartest calculation.",
        },
        basarisizSonuc: {
          mesaj: "The man who left, in his new life, told everything one night while drunk.",
          detay: "A secret you trust to someone can spill with a cup of wine.",
        },
      },
      {
        metin: "Before he leaves, bind him with a strict oath, threaten him if you must.",
        basariliSonuc: {
          mesaj: "The oath silenced him, he stayed quiet even if out of fear.",
          detay: "A silence built on fear always waits for a day to explode.",
        },
        basarisizSonuc: {
          mesaj: "Your threat angered him further, before leaving he whispered the truth to a few people.",
          detay: "A mouth you close by force opens other mouths.",
        },
      },
    ],
  },

  oc_din_tarikat_20: {
    baslik: "A Small Kingdom",
    metin:
      "Your congregation is a real center of power in the city's shadow now: dozens of loyal disciples, your own guards, secret backers. The official institution can no longer ignore it; they'll decide either to crush you entirely or to come to terms with you. The moment of decision has come.",
    secenekler: [
      {
        metin: "Show your power openly, sit down to bargain with the institution as an equal power.",
        basariliSonuc: {
          mesaj: "The institution couldn't afford the cost of destroying you; your existence was recognized through a quiet agreement.",
          detay: "What once began with a candle now shines by its own light.",
        },
        basarisizSonuc: {
          mesaj: "The institution saw your power as a threat; your guards were dispersed, your congregation hunted down.",
          detay: "Some kingdoms fall before they're crowned.",
        },
      },
      {
        metin: "Stay in the shadows, keep growing but never openly challenge them.",
        basariliSonuc: {
          mesaj: "Your patience paid off; your congregation keeps growing in the shadows, no one knows exactly how strong it is.",
          detay: "The most solid kingdoms are the ones built without drawing attention.",
        },
        basarisizSonuc: {
          mesaj: "Your effort to stay in the shadows wasn't enough, your growing congregation drew attention by its own weight.",
          detay: "Sometimes hiding is a risk no different from showing off.",
        },
      },
      {
        metin: "Disband your organization entirely, erase your trail, go back to living as an ordinary clergyman.",
        basariliSonuc: {
          mesaj: "You quietly disbanded your congregation; the danger passed but everything you built slipped from your hands.",
          detay: "Some kingdoms are torn down by their founder's own hands — and there's no better hand than that.",
        },
        basarisizSonuc: {
          mesaj: "During the disbanding some disciples blamed you; even in falling apart you left a trail.",
          detay: "Even coming to an end isn't always quiet.",
        },
      },
    ],
  },
};
