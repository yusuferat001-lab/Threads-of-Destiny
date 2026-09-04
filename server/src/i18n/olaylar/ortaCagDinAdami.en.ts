import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagDinAdami.ts — İngilizce çevirileri. */
export const OLAYLAR_ORTACAG_DINADAMI_EN: Record<string, OlayCeviri> = {
  oc_din_bagis: {
    baslik: "The Wealthy Donor",
    metin:
      "A wealthy family offers the congregation a large donation in exchange for the forgiveness of a crime their son committed. The congregation's roof leaks and there is no money for winter firewood.",
    secenekler: [
      {
        metin: "Take the donation, forgive the family.",
        ipucu: "A great resource for the congregation, a compromise of your faith",
        basariliSonuc: {
          mesaj: "The donation came; the roof was repaired, the congregation spent the winter warm.",
          detay:
            "No one asked whose money paid for the roof. Every time it rains you look at that roof and remember what you sold.",
        },
        basarisizSonuc: {
          mesaj: "The deal got out; the congregation rose up, saying 'you sold sin for money'.",
          detay:
            "Part of the donation came but your reputation went. Half the congregation started going to another house of worship and never came back.",
        },
      },
      {
        metin: "Refuse the donation, sentence the boy to serve the congregation.",
        ipucu: "Moral consistency and respect, no resource",
        basariliSonuc: {
          mesaj: "The boy served the congregation for a year and truly changed; everyone saw it.",
          detay:
            "The roof still leaks but the congregation calls you 'the man who can't be bought'. You spent the winter cold and no one complained.",
        },
        basarisizSonuc: {
          mesaj: "The family left the congregation in anger and took the other rich families with them.",
          detay:
            "You did not compromise your principles and the congregation was left without firewood in winter. Righteousness sometimes sends a bill to others too.",
        },
      },
      {
        metin: "Take the donation, but require the family to apologize publicly.",
        ipucu: "Both resource and justice — the risk of losing both",
        basariliSonuc: {
          mesaj: "The family apologized in the square and made the donation; both justice and resource.",
          detay:
            "You chose the hard road and it worked. The congregation both repaired its roof and saw that justice cannot be bought.",
        },
        basarisizSonuc: {
          mesaj: "The family refused to apologize publicly; neither donation nor justice came.",
          detay:
            "You were too clever. You let both hares run: the congregation is broke, the family is angry, and you are stuck in the middle.",
        },
      },
    ],
  },

  oc_din_sir: {
    baslik: "The Secret of the Confessional",
    metin:
      "During confession a man admitted he plans to poison the lord. The first rule of your calling is to keep this secret; the first rule of your conscience is to prevent a murder.",
    secenekler: [
      {
        metin: "Keep the secret, try to talk him out of it.",
        ipucu: "Professional integrity, the risk of failing to prevent the murder",
        basariliSonuc: {
          mesaj: "You talked with him for days and talked him out of it; no one learned anything.",
          detay:
            "Neither did the lord die nor was a secret revealed. You are the only one who knows this and no one will thank you. You are content with that.",
        },
        basarisizSonuc: {
          mesaj: "The man carried out his plan; the lord was poisoned and it came out that you knew.",
          detay:
            "You kept the secret and a man died. Your professional rule did not protect you; the congregation whispers 'he knew and stayed silent'.",
        },
      },
      {
        metin: "Warn the lord, break the secret.",
        ipucu: "Saves a life, destroys the congregation's trust",
        basariliSonuc: {
          mesaj: "The assassination was prevented; the lord rewarded you and took you into his circle.",
          detay:
            "You saved a life and in return lost your congregation's willingness to open up to you. No one comes to confess anymore.",
        },
        basarisizSonuc: {
          mesaj: "The lord did not believe you; and it got out that you broke the secret.",
          detay:
            "You neither prevented the assassination nor kept trust. The congregation closed its doors, and the lord counted you a 'slanderer'.",
        },
      },
      {
        metin: "Use the knowledge as leverage against the man himself.",
        ipucu: "Personal gain, death if it comes out",
        basariliSonuc: {
          mesaj: "The man gave you whatever you asked to keep quiet; the secret stayed and the purse filled.",
          detay:
            "You turned his fear into money. For the first time in months you sleep easy, and you try not to think about where that ease comes from.",
        },
        basarisizSonuc: {
          mesaj:
            "The man did not expect blackmail, and you did not reckon that he had nothing to lose. One night you were found behind the church.",
        },
      },
    ],
  },

  oc_din_mucize_iddiasi: {
    baslik: "A Claim of a Miracle",
    metin:
      "In some village they say a blind man saw after your prayer. The news spreads; pilgrims have started to pour in. You yourself are not sure what happened.",
    secenekler: [
      {
        metin: "Confirm the miracle, build the affair up.",
        ipucu: "Great fame and income, the risk of a fraud accusation",
        basariliSonuc: {
          mesaj: "Pilgrims poured in, your congregation grew rich; your name spread to distant lands.",
          detay:
            "Was it really a miracle or a coincidence? Even you are no longer sure. But there are believers, and you give them hope.",
        },
        basarisizSonuc: {
          mesaj: "A traveling physician proved the man could already see; you were accused of fraud.",
          detay: "Your credibility collapsed in a day; some congregation members never saw you the same way again.",
        },
      },
      {
        metin: "Say openly that it was not a miracle.",
        ipucu: "Honest, but it disappoints",
        basariliSonuc: {
          mesaj:
            "Your honesty disappointed some pilgrims but increased your congregation's trust in you.",
          detay: "You did not sell a miracle; in the long run this set your reputation on firmer ground.",
        },
        basarisizSonuc: {
          mesaj: "The pilgrims did not want to listen to you; the rumor kept spreading on its own.",
          detay: "Telling the truth does not always get ahead of the rumor.",
        },
      },
    ],
  },

  oc_din_kilise_onarim_parasi: {
    baslik: "The Collapsing Roof",
    metin:
      "The roof of the house of worship is in danger of collapse. The repair is expensive; the congregation has no money, and you shrink from asking them for more donations.",
    secenekler: [
      {
        metin: "Spend your own savings on the repair.",
        ipucu: "Generosity, a heavy personal cost",
        basariliSonuc: {
          mesaj: "The roof was repaired; the congregation never forgot your sacrifice.",
          detay: "You gave every coin in your pocket to that roof, but no one got wet in the rain again.",
        },
        basarisizSonuc: {
          mesaj: "The money you gave was not enough; the builders left the job half done.",
          detay: "Your good intentions were not enough; the roof is still dangerous.",
        },
      },
      {
        metin: "Ask a wealthy family for a large donation.",
        ipucu: "There may be no help without strings",
        basariliSonuc: {
          mesaj:
            "The family made the donation but in return asked you to carve their family name into the roof.",
          detay: "The roof was renewed but now you see that family's name every time you look up.",
        },
        basarisizSonuc: {
          mesaj: "The family refused the donation; they said 'if God wills it, the roof will repair itself'.",
          detay: "The generosity of the rich sometimes stays only in words.",
        },
      },
    ],
  },

  oc_din_iki_mezhep_arasi: {
    baslik: "A Doctrinal Dispute",
    metin:
      "A difference of interpretation is growing within your congregation; one group finds your teaching 'close to heresy', the other supports you. The congregation faces the danger of a split.",
    secenekler: [
      {
        metin: "Find a conciliatory middle way.",
        ipucu: "Preserves unity, fully satisfies no one",
        basariliSonuc: {
          mesaj: "The middle way you found managed both sides; the congregation did not split.",
          detay: "No one got quite what they wanted, but no one left; sometimes that is a victory.",
        },
        basarisizSonuc: {
          mesaj: "The middle way angered both sides; you were criticized as 'neither this nor that'.",
          detay: "Compromise sometimes pleases no one.",
        },
      },
      {
        metin: "Take a firm side, defend your teaching clearly.",
        ipucu: "Strong support or a split",
        basariliSonuc: {
          mesaj: "Your stance convinced most of the congregation; the dissenters quietly left.",
          detay: "Your congregation shrank but those who remained are fully devoted to you; that is enough for you.",
        },
        basarisizSonuc: {
          mesaj: "Your stance split the congregation in two; one group left and founded its own house of worship.",
          detay: "You said what you believed and lost half your congregation; still, your conscience is at ease.",
        },
      },
    ],
  },

  oc_din_zengin_gunahkarin_itirafi: {
    baslik: "A Deathbed Confession",
    metin:
      "A wealthy moneylender on the point of death confessed, at confession, a murder he had hidden for years, and said he would leave part of his fortune to you — on condition that you stay silent.",
    secenekler: [
      {
        metin: "Stay silent, accept the inheritance.",
        ipucu: "A great fortune, the weight of your professional secret",
        basariliSonuc: {
          mesaj: "The man died, the inheritance came to you; no one learned the truth.",
          detay:
            "With this money, which you channeled into the congregation's funds, you were able to do much, but you always remember where it came from.",
        },
        basarisizSonuc: {
          mesaj:
            "You took the inheritance but his family found out and filed suit; you had to return most of it.",
          detay: "The secret didn't hold, only the unease remained.",
        },
      },
      {
        metin: "Refuse the inheritance, tell his family so that justice may be done.",
        ipucu: "You break the professional secret but justice is served",
        basariliSonuc: {
          mesaj:
            "What you said was investigated and the family of the real murder victim found peace years later.",
          detay: "You broke the seal of confession, but you believe it was the right thing.",
        },
        basarisizSonuc: {
          mesaj:
            "No one believed what you said; a dead man's word did not count, and you were spoken of as 'the priest who reveals secrets'.",
          detay: "You tried to do the right thing and got nothing for it.",
        },
      },
    ],
  },

  oc_din_veba_sonrasi_evlatlik: {
    baslik: "The Orphaned Children",
    metin:
      "After the plague or the war, several orphaned children were left at the congregation's door. Their care is expensive, but leaving them on the street is not possible either.",
    secenekler: [
      {
        metin: "Raise the children under the congregation's roof.",
        ipucu: "A long-term expense, great reputation",
        basariliSonuc: {
          mesaj: "The children grew up in the congregation; years later some became your most loyal helpers.",
          detay: "Small hands learned to work the bellows, big hearts learned to be grateful.",
        },
        basarisizSonuc: {
          mesaj: "The care costs came out higher than you expected; the congregation budget was strained.",
          detay: "Your good intentions cost dearly, but at least the children were safe.",
        },
      },
      {
        metin: "Place the children with wealthy families for adoption.",
        ipucu: "Less burden, the children's fate uncertain",
        basariliSonuc: {
          mesaj: "The children settled with good families; from time to time they come to visit you.",
          detay: "You tried to do the best for everyone and mostly succeeded.",
        },
        basarisizSonuc: {
          mesaj: "It came out that one of the families was working a child hard and treating them badly.",
          detay: "A decision made in good faith led to a pain you did not know about.",
        },
      },
    ],
  },

  "oc_din_haclı_vaaz_talebi": {
    baslik: "A Demand for a War Sermon",
    metin:
      "The lord wants you to give a fiery sermon to urge the people to the campaign. Most of your congregation does not want to go, but refusing the lord's request is dangerous too.",
    secenekler: [
      {
        metin: "Give the sermon he asked for, urge the people to the campaign.",
        ipucu: "You rise in the lord's eyes, you send the young to their deaths",
        basariliSonuc: {
          mesaj: "Your sermon was effective; dozens of young men enlisted, the lord rewarded you.",
          detay:
            "You don't know how many of those young men will come back; for the first time you felt the power of your sermon this heavily.",
        },
        basarisizSonuc: {
          mesaj: "Your sermon was not very effective, and the lord made his displeasure clear.",
          detay: "Your conscience is not at ease and the lord is not pleased with you; this is the worst outcome.",
        },
      },
      {
        metin: "Refuse the sermon, stand with your congregation's conscience.",
        ipucu: "Peace of conscience, the lord's wrath",
        basariliSonuc: {
          mesaj: "Your refusal won the congregation's respect; the lord held his tongue this time.",
          detay: "The congregation began to see you as its protector; that is a trust no money can measure.",
        },
        basarisizSonuc: {
          mesaj: "The lord took your refusal as an insult; some privileges given to the congregation were withdrawn.",
          detay: "Your principles cost dearly, but you still think they were right.",
        },
      },
    ],
  },

  oc_din_kutsal_emanet_hirsizligi: {
    baslik: "The Stolen Relic",
    metin:
      "The most sacred relic of the house of worship has been stolen. The congregation is shocked; suspicion turns to one of your own — an old helper who has served for a long time.",
    secenekler: [
      {
        metin: "Investigate quietly, find the truth.",
        ipucu: "Justice, or the risk of accusing the innocent",
        basariliSonuc: {
          mesaj: "Your investigation found the real thief; the innocent helper was cleared and the relic returned.",
          detay: "Acting patiently and fairly made you even more respected in the congregation's eyes.",
        },
        basarisizSonuc: {
          mesaj: "Your suspicions proved wrong; the old helper was wrongly accused and left the congregation.",
          detay: "One mistake broke the heart of someone who had served for years.",
        },
      },
      {
        metin: "Explain the situation to the congregation, mourn the loss together.",
        ipucu: "Calm, but leaves it unresolved",
        basariliSonuc: {
          mesaj: "The congregation met the loss with maturity; the community did not fall apart.",
          detay: "The relic is gone but the congregation's trust in one another is not.",
        },
        basarisizSonuc: {
          mesaj: "Distrust began within the congregation; everyone started to suspect everyone else.",
          detay: "An unsolved mystery sometimes does more harm than a solved crime.",
        },
      },
    ],
  },

  "oc_din_falcı_kadin": {
    baslik: "The Village Fortune-Teller",
    metin:
      "An old woman living in the village reads fortunes and tries herbs, contrary to the teaching of the church/mosque. The people knock on both your door and hers.",
    secenekler: [
      {
        metin: "Accuse the woman of heresy, stop the practice.",
        ipucu: "Protects the teaching, offends some of the people",
        basariliSonuc: {
          mesaj: "The woman gave up the practice; the authority of the teaching was preserved.",
          detay: "Some villagers found you rigid, but you believe this is right.",
        },
        basarisizSonuc: {
          mesaj: "The villagers defended the woman and found you 'out of touch with the people'.",
          detay: "You used your authority and some of the people never saw you the same way again.",
        },
      },
      {
        metin: "Turn a blind eye, leave the people to their own ways.",
        ipucu: "Peaceful, but debatable on principle",
        basariliSonuc: {
          mesaj: "Both traditions quietly went on existing side by side.",
          detay: "Not choosing some battles is a wisdom too.",
        },
        basarisizSonuc: {
          mesaj: "The higher authorities learned of the situation and criticized you for 'loose discipline'.",
          detay: "It turns out tolerance can have a price too.",
        },
      },
    ],
  },

  oc_din_kardes_kilise_rekabeti: {
    baslik: "Rivalry With the Neighboring House of Worship",
    metin:
      "A new house of worship opened at the other end of the city and has started to draw people away from your congregation. The rival clergyman is younger, more charismatic, and gives bolder sermons.",
    secenekler: [
      {
        metin: "Improve your own sermons, win the people back.",
        ipucu: "Takes effort but is lasting",
        basariliSonuc: {
          mesaj: "Your renewed sermons won the congregation back; you even added new members.",
          detay: "The rivalry kept you from growing lazy; that was good for you too.",
        },
        basarisizSonuc: {
          mesaj: "Despite your efforts, part of your congregation went over to the other side.",
          detay: "You didn't win everyone back, but you didn't stop trying.",
        },
      },
      {
        metin: "Spread negative rumors about the rival.",
        ipucu: "A quick but dirty solution",
        basariliSonuc: {
          mesaj: "The rumors damaged your rival's reputation; your congregation came back.",
          detay: "You won, but you know how this win came, and it bothers you.",
        },
        basarisizSonuc: {
          mesaj: "It came out that you were the source of the rumors; the congregation was ashamed of you.",
          detay: "The dirty game backfired and now you are diminished in the eyes of both your rival and your congregation.",
        },
      },
    ],
  },

  oc_din_kehanet_talebi: {
    baslik: "The Lord's Request for a Prophecy",
    metin:
      "Before going to war, the lord asks you to interpret a 'sign'. Whatever you say will affect his decision — and you will be held responsible for the outcome.",
    secenekler: [
      {
        metin: "Interpret honestly, stay neutral.",
        ipucu: "Conscientious but may not please the lord",
        basariliSonuc: {
          mesaj: "Your interpretation was balanced; the lord made his decision with his own mind.",
          detay:
            "You did not take on the responsibility, and that protected you from an accusation that might have come later.",
        },
        basarisizSonuc: {
          mesaj: "The lord was annoyed at not getting a clear answer and said 'you are no use to me'.",
          detay: "Sometimes honesty goes unappreciated because it does not give the certainty expected.",
        },
      },
      {
        metin: "Give the interpretation the lord wants to hear.",
        ipucu: "Immediate satisfaction, the risk of blame in the future",
        basariliSonuc: {
          mesaj: "The lord was pleased with your interpretation and rewarded you.",
          detay: "Time will tell whether what you said comes true.",
        },
        basarisizSonuc: {
          mesaj: "What you said did not come to pass; the lord punished you as a 'false oracle'.",
          detay: "The price of telling him what he wanted to hear was your own reputation.",
        },
      },
    ],
  },

  oc_din_kehanet_sahteciligi: {
    baslik: "The Sign the People Want",
    metin:
      "Famine and despair have gripped the city; the people await a sign from the sky, a miracle. With a small trick you could stage a 'holy omen' and raise morale, or you could tell the bitter truth.",
    secenekler: [
      {
        metin: "Stage a small miracle, give hope.",
        ipucu: "The people's morale rises but it is built on a lie",
        basariliSonuc: {
          mesaj: "The 'miracle' spread fast among the people; hope returned, the streets came alive again.",
          detay: "Some lies are lies even when told in good faith.",
        },
        basarisizSonuc: {
          mesaj: "The trick was noticed! When the people realized they had been deceived they marched on the church in anger.",
          detay: "Fake miracles collapse sooner or later.",
        },
      },
      {
        metin: "Tell the people the bitter truth, call for patience and solidarity.",
        ipucu: "Honest but a weak comfort",
        basariliSonuc: {
          mesaj: "Your words did not comfort everyone, but your honesty strengthened the congregation's trust in you.",
          detay: "Sometimes comfort is as valuable as hope.",
        },
        basarisizSonuc: {
          mesaj: "The truth broke the despairing people further; some criticized you as 'without comfort'.",
          detay: "Honesty is sometimes not enough.",
        },
      },
    ],
  },

  oc_din_engizisyon_tanikligi: {
    baslik: "A Weak Accusation",
    metin:
      "An old woman is accused of witchcraft; the evidence is extremely weak, but the authorities expect testimony from you accusing her. Refusing could put you under suspicion too.",
    secenekler: [
      {
        metin: "Give the testimony they want, accuse the woman.",
        ipucu: "You are safe in authority's eyes but an innocent pays the price",
        basariliSonuc: {
          mesaj:
            "Your testimony was accepted; in the authorities' eyes you are a loyal clergyman, but that woman's screams come into your dreams.",
          detay: "Some assurances are built on another's life.",
        },
        basarisizSonuc: {
          mesaj: "Your testimony brought the desired result but your conscience never left you at peace again.",
          detay: "Some victories are really losses.",
        },
      },
      {
        metin: "Defend the woman, stress the insufficiency of the evidence.",
        ipucu: "Your conscience is clean but you draw the authorities' suspicion on yourself",
        basariliSonuc: {
          mesaj:
            "Your defense worked, the woman was released; among the people you began to be spoken of as 'just'.",
          detay: "Some victories are worth all the risk.",
        },
        basarisizSonuc: {
          mesaj: "Your defense was rejected, and on top of it you faced a charge of 'collaborating with the suspect'.",
          detay: "Defending the truth sometimes has a heavy price.",
        },
      },
    ],
  },

  oc_din_zekat_dagitimi: {
    baslik: "Alms That Fall Short",
    metin:
      "The purse of alms in your hand is too small for the dozens of hungry families lined up at your door. Do you hand out equal but tiny shares to everyone, or give full support to the few most in need?",
    secenekler: [
      {
        metin: "Hand out small equal shares to everyone.",
        ipucu: "No one is excluded but it is enough for no one",
        basariliSonuc: {
          mesaj:
            "Everyone got something; no one went away empty-handed, but not one of them had their problem truly solved.",
          detay: "Justice sometimes makes everyone a little happy and no one fully happy.",
        },
        basarisizSonuc: {
          mesaj: "There was shoving during the distribution, and a few did not even get their share.",
          detay: "Equality sometimes turns into chaos.",
        },
      },
      {
        metin: "Give full support to the few most in need, turn the others away.",
        ipucu: "A few lives truly change but those you turn away blame you",
        basariliSonuc: {
          mesaj:
            "The lives of the families you chose truly changed; but you can't forget the eyes of those who left your door empty-handed.",
          detay: "Deep help fits into a narrow circle.",
        },
        basarisizSonuc: {
          mesaj: "Those you turned away accused you of 'favoritism'; your choice caused a dispute.",
          detay: "Every choice leaves someone out.",
        },
      },
    ],
  },
};
