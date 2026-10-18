import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagDinAdami.ts — İngilizce çevirileri. */
export const OLAYLAR_ORTACAG_DINADAMI_EN: Record<string, OlayCeviri> = {
  oc_din_bagis: {
    baslik: "The Wealthy Donor",
    metin:
      "A wealthy family offers a large donation to forgive their son's crime. The roof leaks and there's no winter firewood.",
    secenekler: [
      {
        metin: "Take the donation, forgive the family.",
        basariliSonuc: {
          mesaj: "The roof was repaired; the congregation wintered warm.",
          detay:
            "Looking at the roof, you remember what you sold.",
        },
        basarisizSonuc: {
          mesaj: "The deal got out; the congregation rose up: 'You sold sin!'",
          detay:
            "Some donation came, but your reputation went.",
        },
      },
      {
        metin: "Refuse the donation, sentence the boy to service.",
        basariliSonuc: {
          mesaj: "The boy served a year and truly changed.",
          detay:
            "The roof leaks, but they call you 'unbuyable'.",
        },
        basarisizSonuc: {
          mesaj: "The family left in anger, taking other rich ones along.",
          detay:
            "You kept your principles; no firewood came.",
        },
      },
      {
        metin: "Take it, but demand a public apology.",
        basariliSonuc: {
          mesaj: "The family apologized in the square and donated.",
          detay:
            "Roof repaired, and justice proved not for sale.",
        },
        basarisizSonuc: {
          mesaj: "The family refused to apologize; no donation, no justice.",
          detay:
            "You lost both hares; you're stuck in the middle.",
        },
      },
    ],
  },

  oc_din_sir: {
    baslik: "The Secret of the Confessional",
    metin:
      "In confession a man admitted he plans to poison the lord. Your calling demands secrecy; your conscience demands preventing murder.",
    secenekler: [
      {
        metin: "Keep the secret, try to dissuade him.",
        basariliSonuc: {
          mesaj: "You talked for days and he gave up; no one learned a thing.",
          detay:
            "No one will thank you. You accept that.",
        },
        basarisizSonuc: {
          mesaj: "The man went through with it; the lord was poisoned and your knowledge came out.",
          detay:
            "You stayed silent, a man died; they whisper 'he knew'.",
        },
      },
      {
        metin: "Warn the lord, break the secret.",
        basariliSonuc: {
          mesaj: "The plot was foiled; the lord rewarded you and kept you close.",
          detay:
            "You saved a life; now no one comes to confess.",
        },
        basarisizSonuc: {
          mesaj: "The lord didn't believe you; your broken secret got out.",
          detay:
            "You neither stopped the plot nor kept trust.",
        },
      },
      {
        metin: "Use it as leverage against the man.",
        basariliSonuc: {
          mesaj: "The man paid for your silence; the secret stayed, the purse filled.",
          detay:
            "You turned his fear into money and sleep easy.",
        },
        basarisizSonuc: {
          mesaj:
            "He had nothing to lose; you were found behind the church one night.",
        },
      },
    ],
  },

  oc_din_mucize_iddiasi: {
    baslik: "A Claim of a Miracle",
    metin:
      "A village says a blind man saw after your prayer. The news spreads; pilgrims pour in. You're unsure what happened.",
    secenekler: [
      {
        metin: "Confirm the miracle, build it up.",
        basariliSonuc: {
          mesaj: "Pilgrims poured in, the congregation prospered; your name spread.",
          detay:
            "Unsure, you still give believers hope.",
        },
        basarisizSonuc: {
          mesaj: "A traveling physician proved the man could already see; you were accused of fraud.",
          detay: "Your credibility collapsed in a day.",
        },
      },
      {
        metin: "Say plainly it was no miracle.",
        basariliSonuc: {
          mesaj:
            "Your honesty let some pilgrims down but raised the congregation's trust.",
          detay: "You sold no miracle; your reputation stands firmer.",
        },
        basarisizSonuc: {
          mesaj: "The pilgrims wouldn't listen; the rumor spread on its own.",
          detay: "Truth doesn't always outrun a rumor.",
        },
      },
    ],
  },

  oc_din_kilise_onarim_parasi: {
    baslik: "The Collapsing Roof",
    metin:
      "The house of worship's roof is near collapse. Repair is costly; the congregation is broke and you hate asking them for more.",
    secenekler: [
      {
        metin: "Spend your own savings on repairs.",
        basariliSonuc: {
          mesaj: "The roof was repaired; the congregation never forgot your sacrifice.",
          detay: "You gave every coin; no one got rained on again.",
        },
        basarisizSonuc: {
          mesaj: "Your money fell short; the builders quit halfway.",
          detay: "Good will wasn't enough; the roof is still unsafe.",
        },
      },
      {
        metin: "Ask a wealthy family for a large donation.",
        basariliSonuc: {
          mesaj:
            "The family donated but had their name carved into the roof.",
          detay: "New roof; you see that name whenever you look up.",
        },
        basarisizSonuc: {
          mesaj: "The family refused: 'If God wills, the roof will mend itself.'",
          detay: "The generosity of the rich often stays in words.",
        },
      },
    ],
  },

  oc_din_iki_mezhep_arasi: {
    baslik: "A Doctrinal Dispute",
    metin:
      "A difference of interpretation is growing; one group finds your teaching 'close to heresy', the other backs you. The congregation may split.",
    secenekler: [
      {
        metin: "Find a conciliatory middle way.",
        basariliSonuc: {
          mesaj: "The middle way managed both sides; the congregation held together.",
          detay: "No one got what they wanted, but no one left.",
        },
        basarisizSonuc: {
          mesaj: "The middle way angered both sides: 'neither this nor that'.",
          detay: "Compromise sometimes pleases no one.",
        },
      },
      {
        metin: "Take a firm side, defend your teaching.",
        basariliSonuc: {
          mesaj: "Your stance convinced most; the dissenters quietly left.",
          detay: "The congregation shrank, but the rest are devoted.",
        },
        basarisizSonuc: {
          mesaj: "Your stance split them; one group founded its own house of worship.",
          detay: "You spoke your belief, lost half; conscience clear.",
        },
      },
    ],
  },

  oc_din_zengin_gunahkarin_itirafi: {
    baslik: "A Deathbed Confession",
    metin:
      "A dying wealthy moneylender confessed a long-hidden murder and offered you part of his fortune for your silence.",
    secenekler: [
      {
        metin: "Stay silent, accept the inheritance.",
        basariliSonuc: {
          mesaj: "The man died, the inheritance came to you; no one learned the truth.",
          detay:
            "The money did much good; you remember its source.",
        },
        basarisizSonuc: {
          mesaj:
            "His family found out and sued; you returned most of it.",
          detay: "The secret didn't hold; only unease remained.",
        },
      },
      {
        metin: "Refuse the inheritance, tell his family.",
        basariliSonuc: {
          mesaj:
            "Your account was investigated; the victim's family found peace years later.",
          detay: "You broke the seal, but believe it was right.",
        },
        basarisizSonuc: {
          mesaj:
            "No one believed a dead man's word; you became 'the priest who tells secrets'.",
          detay: "You tried to do right and got nothing for it.",
        },
      },
    ],
  },

  oc_din_veba_sonrasi_evlatlik: {
    baslik: "The Orphaned Children",
    metin:
      "After plague or war, orphaned children were left at the congregation's door. Their care is costly, but they can't be left on the street.",
    secenekler: [
      {
        metin: "Raise the children under the congregation's roof.",
        basariliSonuc: {
          mesaj: "The children grew up in the congregation; some became your most loyal helpers.",
          detay: "Small hands learned to work, hearts to be grateful.",
        },
        basarisizSonuc: {
          mesaj: "Care cost more than expected; the congregation's budget strained.",
          detay: "Good will cost dearly, but the children were safe.",
        },
      },
      {
        metin: "Place the children with wealthy families.",
        basariliSonuc: {
          mesaj: "The children settled with good families and visit you now and then.",
          detay: "You tried your best for everyone and mostly succeeded.",
        },
        basarisizSonuc: {
          mesaj: "One family turned out to be working a child hard and mistreating them.",
          detay: "A well-meant decision caused a pain you didn't know of.",
        },
      },
    ],
  },

  "oc_din_haclı_vaaz_talebi": {
    baslik: "A Demand for a War Sermon",
    metin:
      "The lord wants a fiery sermon urging the people to the campaign. Your congregation doesn't want to go, but refusing him is dangerous.",
    secenekler: [
      {
        metin: "Give the sermon, urge the people to go.",
        basariliSonuc: {
          mesaj: "The sermon worked; dozens of youths enlisted and the lord rewarded you.",
          detay:
            "You don't know how many will return; it weighs on you.",
        },
        basarisizSonuc: {
          mesaj: "The sermon fell flat and the lord showed his displeasure.",
          detay: "Neither conscience nor lord at ease; the worst outcome.",
        },
      },
      {
        metin: "Refuse the sermon, side with your congregation.",
        basariliSonuc: {
          mesaj: "Your refusal won the congregation's respect; the lord held his tongue.",
          detay: "They see you as protector; no money buys that.",
        },
        basarisizSonuc: {
          mesaj: "The lord took it as an insult; some of the congregation's privileges were withdrawn.",
          detay: "Your principles cost dearly, yet you think them right.",
        },
      },
    ],
  },

  oc_din_kutsal_emanet_hirsizligi: {
    baslik: "The Stolen Relic",
    metin:
      "The house of worship's holiest relic was stolen. Suspicion falls on one of your own, an old helper of long service.",
    secenekler: [
      {
        metin: "Investigate quietly, find the truth.",
        basariliSonuc: {
          mesaj: "The real thief was found; the helper was cleared and the relic returned.",
          detay: "Your patience and fairness earned you respect.",
        },
        basarisizSonuc: {
          mesaj: "Your suspicion was wrong; the old helper was wrongly accused and left.",
          detay: "One mistake broke a loyal servant's heart.",
        },
      },
      {
        metin: "Tell the congregation, mourn the loss together.",
        basariliSonuc: {
          mesaj: "The congregation took the loss with maturity; unity held.",
          detay: "The relic is gone; the trust is not.",
        },
        basarisizSonuc: {
          mesaj: "Distrust began; everyone suspected everyone.",
          detay: "An unsolved mystery can hurt more than a solved crime.",
        },
      },
    ],
  },

  "oc_din_falcı_kadin": {
    baslik: "The Village Fortune-Teller",
    metin:
      "An old village woman reads fortunes and tries herbs against church/mosque teaching. The people knock on both your door and hers.",
    secenekler: [
      {
        metin: "Accuse her of heresy, stop it.",
        basariliSonuc: {
          mesaj: "She gave up the practice; the teaching's authority held.",
          detay: "Some found you rigid; you think it right.",
        },
        basarisizSonuc: {
          mesaj: "Villagers defended her and found you 'out of touch'.",
          detay: "You used your authority and lost some trust.",
        },
      },
      {
        metin: "Turn a blind eye, leave the people to their ways.",
        basariliSonuc: {
          mesaj: "Both traditions quietly went on side by side.",
          detay: "Not choosing some battles is wisdom.",
        },
        basarisizSonuc: {
          mesaj: "Higher authorities learned of it and criticized your 'loose discipline'.",
          detay: "Tolerance can have a price too.",
        },
      },
    ],
  },

  oc_din_kardes_kilise_rekabeti: {
    baslik: "Rivalry With the Neighboring House of Worship",
    metin:
      "A new house of worship across the city is drawing your people away. The rival clergyman is younger, more charismatic, and bolder.",
    secenekler: [
      {
        metin: "Improve your sermons, win people back.",
        basariliSonuc: {
          mesaj: "Your renewed sermons won them back and added new members.",
          detay: "Rivalry kept you from growing lazy.",
        },
        basarisizSonuc: {
          mesaj: "Despite your efforts, part of the congregation switched sides.",
          detay: "You didn't win everyone back, but kept trying.",
        },
      },
      {
        metin: "Spread bad rumors about the rival.",
        basariliSonuc: {
          mesaj: "The rumors hurt your rival's name; your congregation returned.",
          detay: "You won, but you know how, and it bothers you.",
        },
        basarisizSonuc: {
          mesaj: "You were exposed as the source; the congregation was ashamed of you.",
          detay: "The dirty play backfired; everyone thinks less of you.",
        },
      },
    ],
  },

  oc_din_kehanet_talebi: {
    baslik: "The Lord's Request for a Prophecy",
    metin:
      "Before war, the lord asks you to interpret a 'sign'. Your words will sway his decision, and you'll answer for the result.",
    secenekler: [
      {
        metin: "Interpret honestly, stay neutral.",
        basariliSonuc: {
          mesaj: "Your reading was balanced; the lord decided with his own mind.",
          detay:
            "You took no responsibility, and that protected you.",
        },
        basarisizSonuc: {
          mesaj: "The lord, denied a clear answer, snapped: 'you are no use'.",
          detay: "Honesty goes unthanked when it gives no certainty.",
        },
      },
      {
        metin: "Say what the lord wants to hear.",
        basariliSonuc: {
          mesaj: "The lord was pleased and rewarded you.",
          detay: "Time will tell if it comes true.",
        },
        basarisizSonuc: {
          mesaj: "It didn't come to pass; the lord punished you as a 'false oracle'.",
          detay: "Telling him what he wanted cost your reputation.",
        },
      },
    ],
  },

  oc_din_kehanet_sahteciligi: {
    baslik: "The Sign the People Want",
    metin:
      "Famine grips the city; the people await a miracle from the sky. You could stage a 'holy omen' with a small trick, or tell the bitter truth.",
    secenekler: [
      {
        metin: "Stage a small miracle, give hope.",
        basariliSonuc: {
          mesaj: "The 'miracle' spread fast; hope returned and the streets revived.",
          detay: "Some lies are lies even when well-meant.",
        },
        basarisizSonuc: {
          mesaj: "The trick was exposed! The deceived people marched on the church.",
          detay: "Fake miracles collapse sooner or later.",
        },
      },
      {
        metin: "Tell the bitter truth, call for patience.",
        basariliSonuc: {
          mesaj: "Your words didn't comfort all, but your honesty deepened their trust.",
          detay: "Sometimes comfort is as valuable as hope.",
        },
        basarisizSonuc: {
          mesaj: "The truth crushed the despairing people; some called you 'comfortless'.",
          detay: "Honesty is sometimes not enough.",
        },
      },
    ],
  },

  oc_din_engizisyon_tanikligi: {
    baslik: "A Weak Accusation",
    metin:
      "An old woman is accused of witchcraft; the evidence is very weak, yet the authorities expect your testimony against her. Refusing makes you a suspect.",
    secenekler: [
      {
        metin: "Give the testimony, accuse the woman.",
        basariliSonuc: {
          mesaj:
            "Testimony accepted; the authorities approve, but her screams haunt your dreams.",
          detay: "Some assurances rest on another's life.",
        },
        basarisizSonuc: {
          mesaj: "The testimony worked, but your conscience never rested again.",
          detay: "Some victories are really losses.",
        },
      },
      {
        metin: "Defend the woman, stress the weak evidence.",
        basariliSonuc: {
          mesaj:
            "Your defense worked and she was freed; people call you 'just'.",
          detay: "Some victories are worth every risk.",
        },
        basarisizSonuc: {
          mesaj: "Your defense was rejected, and you were charged with 'aiding the suspect'.",
          detay: "Defending the truth can cost dearly.",
        },
      },
    ],
  },

  oc_din_zekat_dagitimi: {
    baslik: "Alms That Fall Short",
    metin:
      "Your alms purse can't cover the dozens of hungry families at your door. Give everyone a tiny equal share, or full help to a few?",
    secenekler: [
      {
        metin: "Hand out small equal shares to all.",
        basariliSonuc: {
          mesaj:
            "No one left empty-handed, but no one's trouble was truly solved.",
          detay: "Justice pleases all a little, none fully.",
        },
        basarisizSonuc: {
          mesaj: "Shoving broke out; a few got no share at all.",
          detay: "Equality sometimes turns to chaos.",
        },
      },
      {
        metin: "Give full help to the few most in need.",
        basariliSonuc: {
          mesaj:
            "The chosen families' lives changed; you can't forget the empty-handed.",
          detay: "Deep help fits a narrow circle.",
        },
        basarisizSonuc: {
          mesaj: "Those turned away accused you of 'favoritism'.",
          detay: "Every choice leaves someone out.",
        },
      },
    ],
  },

  oc_din_sapkin_sigintisi: {
    baslik: "The Fugitive Accused of Heresy",
    metin:
      "At midnight a man wanted for views against official doctrine knocks, asking sanctuary. Sheltering him endangers you too.",
    secenekler: [
      {
        metin: "Shelter him secretly, see him to safety.",
        basariliSonuc: {
          mesaj: "You delivered him to a distant congregation; no one found a trace.",
          detay: "You can't tell anyone of this courage, but you know.",
        },
        basarisizSonuc: {
          mesaj: "Your secret came out; you were questioned for complicity.",
          detay: "Good will put you among the suspects too.",
        },
      },
      {
        metin: "Hand him over, follow the rules.",
        basariliSonuc: {
          mesaj: "The authorities were satisfied; the man was taken away.",
          detay: "You followed the rules; his look haunts you.",
        },
        basarisizSonuc: {
          mesaj: "The man escaped on the way; you angered both the authorities and your conscience.",
          detay: "You neither applied the rule nor eased your conscience.",
        },
      },
    ],
  },

  oc_din_yazma_atolyesi: {
    baslik: "The Scriptorium",
    metin:
      "You found a gifted scribe; an illuminated copy of an ancient sacred text could bring the congregation fame, but costs months of labor and money.",
    secenekler: [
      {
        metin: "Fund the project, support the scribe.",
        basariliSonuc: {
          mesaj: "The work was completed; its fame reached distant cities.",
          detay: "Patience and resources made a lasting work.",
        },
        basarisizSonuc: {
          mesaj: "The work stayed unfinished; the scribe fell ill and quit.",
          detay: "The labor and money stayed on an unfinished page.",
        },
      },
      {
        metin: "Use the funds for daily needs, refuse the project.",
        basariliSonuc: {
          mesaj: "Daily needs were met; the work was never made.",
          detay: "You did your duty but chased no opportunity.",
        },
        basarisizSonuc: {
          mesaj: "The scribe went to another monastery and won fame there.",
          detay: "Your missed chance shines in someone else's hands.",
        },
      },
    ],
  },

  oc_din_komsu_manastir_toprak_davasi: {
    baslik: "The Land Dispute",
    metin:
      "The neighboring monastery claims a field your congregation long worked is theirs. It can go to the lord's court, or you can settle.",
    secenekler: [
      {
        metin: "Take it to court, defend your right.",
        basariliSonuc: {
          mesaj: "The land stayed yours; the court ruled in your favor.",
          detay: "You won, but the bitterness burned the bridge.",
        },
        basarisizSonuc: {
          mesaj: "The case was lost; you lost land and costs.",
          detay: "You sought your right and ended with less.",
        },
      },
      {
        metin: "Settle with the monastery, share the land.",
        basariliSonuc: {
          mesaj: "Peace was made; a shared-use agreement signed.",
          detay: "A small sacrifice averted a long feud.",
        },
        basarisizSonuc: {
          mesaj: "The deal collapsed; the monastery broke its word and took most of the land.",
          detay: "Your good will went unrewarded.",
        },
      },
    ],
  },

  oc_din_ac_koylu_ondaligi: {
    baslik: "The Starving Peasant's Tithe",
    metin:
      "In a famine year the peasants can't pay the tithe. The authorities demand collection; you feel you'd be taking their last sack of wheat.",
    secenekler: [
      {
        metin: "Collect the tithe in full.",
        basariliSonuc: {
          mesaj: "Taxes collected; the authorities are pleased, the peasants curse you.",
          detay: "The heavy purse can't erase their despairing eyes.",
        },
        basarisizSonuc: {
          mesaj: "A family lost its last food in the collection; your name turned bad.",
          detay: "You obeyed and left a family to starve.",
        },
      },
      {
        metin: "Forgive the tithe this year, answer for it yourself.",
        basariliSonuc: {
          mesaj: "The peasants never forgot you; the authorities stayed displeased but silent.",
          detay: "You gave up authority, not your own purse.",
        },
        basarisizSonuc: {
          mesaj: "The authorities threatened to remove you for 'tax evasion'.",
          detay: "Mercy had a price; you paid it, not the peasants.",
        },
      },
    ],
  },

  oc_din_veba_son_ayin_yuku: {
    baslik: "The Burden of Last Rites",
    metin:
      "The plague knocks on doors one by one; reaching all the dying for last rites grows impossible. You may have to refuse some midnight calls.",
    secenekler: [
      {
        metin: "Answer every call, spare yourself nothing.",
        basariliSonuc: {
          mesaj: "You reached everyone; the congregation remembers you as a saint.",
          detay: "Your body is spent, but you left no one alone.",
        },
        basarisizSonuc: {
          mesaj: "You wore out; going door to door, the disease caught you too.",
          detay: "Trying to save everyone, you forgot yourself.",
        },
      },
      {
        metin: "Prioritize, preserve your strength.",
        basariliSonuc: {
          mesaj: "You left some alone, but could keep serving.",
          detay: "You live to reach more people.",
        },
        basarisizSonuc: {
          mesaj: "Your priorities were wrong; one family never forgave you.",
          detay: "Your calculation left someone alone at the end.",
        },
      },
    ],
  },

  oc_din_ofkeli_kalabalik: {
    baslik: "The Angry Mob",
    metin:
      "Blame for famine and plague turned a mob on a small minority. Families seek shelter at your door; taking them in makes you a target too.",
    secenekler: [
      {
        metin: "Open your door, protect them.",
        basariliSonuc: {
          mesaj: "The families stayed safe; your courage is told of for years.",
          detay: "You saw not who they were, but that they were human.",
        },
        basarisizSonuc: {
          mesaj: "The mob broke the door down too; you were beaten.",
          detay: "You did right and paid with your body.",
        },
      },
      {
        metin: "Shut your door, stay out of it.",
        basariliSonuc: {
          mesaj: "You kept silent; the mob vented its anger elsewhere.",
          detay: "You're safe, but still hear the screams.",
        },
        basarisizSonuc: {
          mesaj: "You carried the price of your silence in your conscience for long.",
          detay: "Staying out is a choice too, the heaviest kind.",
        },
      },
    ],
  },

  oc_din_aforoz_emri: {
    baslik: "The Order of Excommunication",
    metin:
      "Your superiors order you to excommunicate a faithful elderly congregant, solely over a dispute with a noble. No evidence, only politics.",
    secenekler: [
      {
        metin: "Carry out the order, excommunicate him.",
        basariliSonuc: {
          mesaj: "The order was carried out; the authorities were pleased.",
          detay: "Watching his collapse, you knew it was wrong.",
        },
        basarisizSonuc: {
          mesaj: "The injustice didn't escape the congregation; their trust shook.",
          detay: "You obeyed and still pleased no one.",
        },
      },
      {
        metin: "Refuse the order, defend the man.",
        basariliSonuc: {
          mesaj: "The authorities backed down; the man was cleared.",
          detay: "Some victories are worth the risk.",
        },
        basarisizSonuc: {
          mesaj: "The authorities began questioning you too; your post is at risk.",
          detay: "You defended the truth and now you're in trouble.",
        },
      },
    ],
  },

  oc_din_soylu_itirafi_gayrimesru_varis: {
    baslik: "The Noble's Last Secret",
    metin:
      "A dying lord confesses an illegitimate son and that the inheritance will be stolen from the true heir; he asks you to seal the secret or reach the heir.",
    secenekler: [
      {
        metin: "Seal the secret, tell no one.",
        basariliSonuc: {
          mesaj: "You stayed silent; the official heir inherited and the family donated.",
          detay: "Counting that donation, you recall its source.",
        },
        basarisizSonuc: {
          mesaj: "The truth surfaced; once your silence was known, you lost trust.",
          detay: "The secret you kept burst, pulling you in.",
        },
      },
      {
        metin: "Find the true heir, see it reaches him.",
        basariliSonuc: {
          mesaj: "The true heir was found; justice, though slow, was done.",
          detay: "It was worth the travel and sleepless nights.",
        },
        basarisizSonuc: {
          mesaj: "Your search drew the noble family's notice; they accused you of 'stirring trouble'.",
          detay: "Seeking justice, you landed in the middle of a dispute.",
        },
      },
    ],
  },
};
