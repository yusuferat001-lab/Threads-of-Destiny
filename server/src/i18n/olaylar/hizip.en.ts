import type { OlayCeviri } from "./index";

/**
 * server/src/data/olaylar/hizip.ts — İngilizce çevirileri.
 * Hizip adları: Eski Muhafızlar → Old Guard, Yeni Nizam → New Order,
 * Liman Loncası → Harbor Guild, Pazar Birliği → Market Union,
 * Gelenekçiler → Traditionalists, Yenilikçiler → Reformists.
 */
export const OLAYLAR_HIZIP_EN: Record<string, OlayCeviri> = {
  hizip_asker_catisma: {
    baslik: "Swords Drawn",
    metin:
      "At midnight the Old Guard and the New Order came to blows in the barracks courtyard. Torches blaze, blood is about to be shed.",
    secenekler: [
      {
        metin: "Draw your weapon, fight for your faction!",
        basariliSonuc: {
          mesaj: "You led the brawl! Your comrades lifted you onto their shoulders.",
        },
        basarisizSonuc: {
          mesaj: "The other side beat you; you were carried off with a split head.",
        },
      },
      {
        metin: "Lower your weapons! Stop the fight.",
        basariliSonuc: {
          mesaj: "Your booming voice rang out; everyone lowered their weapons.",
        },
        basarisizSonuc: {
          mesaj: "As you stepped in, they hurled a torch at your head.",
        },
      },
    ],
  },

  hizip_asker_celiskili_emirler: {
    baslik: "A Two-Mouthed Order",
    metin:
      "A commander of your faction gave you a secret order; a senior officer close to the rival faction wants the opposite.",
    secenekler: [
      {
        metin: "Obey your faction, ignore the officer.",
        basariliSonuc: {
          mesaj: "You carried out your faction's order; your comrades trusted you.",
          detay: "Loyalty rewarded, discipline cracked.",
        },
        basarisizSonuc: {
          mesaj: "The officer caught your disobedience and punished you publicly.",
          detay: "Faction ties can't always beat discipline.",
        },
      },
      {
        metin: "Obey the hierarchy, follow the officer.",
        basariliSonuc: {
          mesaj: "You did it to the letter; the officer took note of you.",
          detay: "Discipline rewarded, your faction won't forget.",
        },
        basarisizSonuc: {
          mesaj: "Your faction brothers saw betrayal and turned cold on you.",
          detay: "Serving two masters has a price.",
        },
      },
    ],
  },

  hizip_asker_kislada_tasfiye: {
    baslik: "A Purge in the Barracks",
    metin:
      "A quiet purge of soldiers close to the rival faction is planned; you're asked to help prepare the list.",
    secenekler: [
      {
        metin: "Prepare the list, strengthen your faction.",
        basariliSonuc: {
          mesaj: "The rivals were quietly removed; your name rose in the faction.",
          detay: "You gained power, but you know it's unfair.",
        },
        basarisizSonuc: {
          mesaj: "The list leaked! The soldiers got wind and ambushed you.",
          detay: "Secret plans sometimes backfire.",
        },
      },
      {
        metin: "Refuse, this is a dirty game.",
        basariliSonuc: {
          mesaj: "Your conscience is clear, but you were branded 'weak'.",
          detay: "Some victories are won with honor.",
        },
        basarisizSonuc: {
          mesaj: "The faction leaders read your refusal as mistrust.",
          detay: "Doing right isn't always free.",
        },
      },
    ],
  },

  hizip_tuccar_catisma: {
    baslik: "Sinking Ships",
    metin:
      "The price war between the Harbor Guild and the Market Union turned bloody. They offer to torch the rival's ships.",
    secenekler: [
      {
        metin: "Pay the shadows, burn the rival's ship!",
        basariliSonuc: {
          mesaj: "The harbor is ablaze! Your rivals are bankrupt; the market is yours.",
        },
        basarisizSonuc: {
          mesaj: "The arsonists were caught and named you; compensation ruined you.",
        },
      },
      {
        metin: "I won't play this dirty game.",
        basariliSonuc: {
          mesaj: "Your hands stayed clean; you carry on slowly but honorably.",
        },
        basarisizSonuc: {
          mesaj: "You stayed clean, but rivals sabotaged your warehouses!",
        },
      },
    ],
  },

  hizip_tuccar_depo_yangini: {
    baslik: "A Suspicious Fire",
    metin:
      "A rival faction's warehouse burned at midnight. No one claimed it, but everyone points at your faction.",
    secenekler: [
      {
        metin: "Take credit obliquely, show your strength.",
        basariliSonuc: {
          mesaj: "The rumor spread; you're spoken of with fear in your faction.",
          detay: "You gained power; your conscience darkens.",
        },
        basarisizSonuc: {
          mesaj: "The guards traced it to you! A heavy compensation saved you.",
          detay: "Some secrets come to light.",
        },
      },
      {
        metin: "Help put out the fire.",
        basariliSonuc: {
          mesaj: "You ran to the fire; even the rival faction remembered.",
          detay: "A hand to your enemy is a great victory.",
        },
        basarisizSonuc: {
          mesaj: "Smoke poisoned you; your faction called the gesture pointless.",
          detay: "Kindness isn't always appreciated.",
        },
      },
    ],
  },

  hizip_tuccar_fiyat_savasi: {
    baslik: "A Price War",
    metin:
      "The rival faction sells below cost to wipe you out. Will you respond in kind or find another way?",
    secenekler: [
      {
        metin: "Cut below cost too, see who holds out.",
        basariliSonuc: {
          mesaj: "Your rival folded first, near bankruptcy. The market is yours again.",
          detay: "You won, but the war wore down both sides.",
        },
        basarisizSonuc: {
          mesaj: "You lost the price war and took heavy losses for months.",
          detay: "Some gambles punish losers hard.",
        },
      },
      {
        metin: "Skip the war, push quality and service.",
        basariliSonuc: {
          mesaj: "Your loyal customers chose quality over price.",
          detay: "Sometimes the best move is not to play.",
        },
        basarisizSonuc: {
          mesaj: "Some customers still left for cheaper; a small loss.",
          detay: "Not everyone is loyal.",
        },
      },
    ],
  },

  hizip_din_catisma: {
    baslik: "Fire in the Pulpit",
    metin:
      "The Traditionalists' and Reformists' debate turned into street attacks. Today thousands will hear you at the great market service.",
    secenekler: [
      {
        metin: "Accuse the other side of heresy, rouse the crowd!",
        basariliSonuc: {
          mesaj: "Your fiery sermon thrilled the flock! You became your faction's spiritual leader.",
        },
        basarisizSonuc: {
          mesaj: "Rival supporters stormed the pulpit with stones and clubs! Blood ran.",
        },
      },
      {
        metin: "God wants peace. Soften hearts.",
        basariliSonuc: {
          mesaj: "Your tenderness made the crowd weep; the city escaped a massacre.",
        },
        basarisizSonuc: {
          mesaj: "Your faction called you a 'cowardly pacifist' and schemed behind you.",
        },
      },
    ],
  },

  hizip_din_metin_yorumu: {
    baslik: "The Interpretation of the Holy Text",
    metin:
      "A rival-faction clergyman challenges your faction's reading of the holy text and invites you to a public debate.",
    secenekler: [
      {
        metin: "Accept, debate openly in the square.",
        basariliSonuc: {
          mesaj: "You won the debate! The flock hailed you your faction's voice.",
          detay: "Your words will be remembered.",
        },
        basarisizSonuc: {
          mesaj: "Your rival cornered you; you stood speechless before the people.",
          detay: "Some defeats live in memory.",
        },
      },
      {
        metin: "Refuse, call the debate divisive.",
        basariliSonuc: {
          mesaj: "Some saw your refusal as wise humility.",
          detay: "You needn't answer every challenge.",
        },
        basarisizSonuc: {
          mesaj: "The rival faction announced your refusal as 'cowardice'.",
          detay: "Silence can be misread.",
        },
      },
    ],
  },

  hizip_din_cemaat_ayrilik: {
    baslik: "The Congregation Splits in Two",
    metin:
      "Even in your own congregation some sympathize with the Traditionalists and Reformists. Act before the split grows.",
    secenekler: [
      {
        metin: "Unite the congregation along your faction's line.",
        basariliSonuc: {
          mesaj: "Most embraced your line; a few families quietly left.",
          detay: "Unity sometimes has a price.",
        },
        basarisizSonuc: {
          mesaj: "Your domineering manner strained them; some families left the temple.",
          detay: "Coercion sometimes divides more.",
        },
      },
      {
        metin: "Make room for other views, propose coexistence.",
        basariliSonuc: {
          mesaj: "Your tolerance held the flock together; all found a voice.",
          detay: "The strongest unity comes from accepting difference.",
        },
        basarisizSonuc: {
          mesaj: "Faction leaders criticized your stance as 'indecision'.",
          detay: "Tolerance can't please everyone.",
        },
      },
    ],
  },

  tepki_hizip_sir_ifsa_tehdidi: {
    baslik: "The Secret in Your Hands",
    metin:
      "You learned a dangerous secret about your faction. Revealing it could drag you and your group into crisis; silence troubles your conscience.",
    secenekler: [
      {
        metin: "Keep the secret, do nothing.",
        basariliSonuc: {
          mesaj: "You stayed silent; you're safe, but a weight sits inside.",
          detay: "Some silences pay an invisible price.",
        },
        basarisizSonuc: {
          mesaj: "You tried to stay silent, but your conscience wouldn't rest.",
          detay: "Some secrets grow inside.",
        },
      },
      {
        metin: "You're about to reveal the secret.",
        basariliSonuc: { mesaj: "Not used." },
        basarisizSonuc: { mesaj: "Not used." },
        onTepki: {
          metin:
            "No return from this threshold. One more step...",
          geriCekilMetni: "Back off, leave the secret buried.",
          geriCekilSonucu: {
            mesaj: "You gave up at the last moment; the secret stayed with you.",
            detay: "Turning back takes courage too.",
          },
          devamMetni: "No. Reveal the secret.",
          devamSonucu: {
            mesaj:
              "You revealed it; people praised your honesty, but your faction saw you differently.",
            detay: "The day conscience found peace, a door closed forever.",
          },
        },
      },
    ],
  },

  hizip_eski_muhafizlar_sadakat_yemini: {
    baslik: "An Oath Written in Blood",
    metin:
      "The Old Guard holds a midnight oath by torchlight to renew loyalty to the king. Everyone must draw a sword and pledge in blood.",
    secenekler: [
      {
        metin: "Take the oath proudly, shed your blood.",
        basariliSonuc: {
          mesaj: "You cut your hand and cried the oath. The general smiled.",
          detay: "You became a pillar of the old order; no turning back.",
        },
        basarisizSonuc: {
          mesaj: "You swore, but your voice shook; others doubted your courage.",
          detay: "Weakness shows at once in such settings.",
        },
      },
      {
        metin: "Mouth the oath, don't bleed.",
        basariliSonuc: {
          mesaj: "Hidden in shadow you mouthed it and faked cutting your hand.",
          detay: "No one noticed, but the hypocrisy unsettled you.",
        },
        basarisizSonuc: {
          mesaj: "The general saw you weren't bleeding! He called you traitor and had you beaten publicly.",
          detay: "You don't mock a loyalty oath.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_isyan_bastirma: {
    baslik: "A Dark Operation",
    metin:
      "Your commanders want you to raid a secret cell of young lieutenants close to the New Order. An old acquaintance is on the list. Order: 'Leave none alive.'",
    secenekler: [
      {
        metin: "Carry out the mission loyally and ruthlessly.",
        basariliSonuc: {
          mesaj: "You burst in and spared no one. Your old acquaintance died staring at you.",
          detay: "Hailed a hero, but those eyes haunt your dreams.",
        },
        basarisizSonuc: {
          mesaj: "The lieutenants were ready. A bomb went off; you barely escaped, badly hurt.",
          detay: "The bloody operation ended in fiasco.",
        },
      },
      {
        metin: "Stall the mission, let them flee.",
        basariliSonuc: {
          mesaj: "You arrived late; only burnt papers remained.",
          detay: "You saved your old friend; no proof, angry commanders.",
        },
        basarisizSonuc: {
          mesaj: "Your deliberate delay was found out! Stripped of rank, you barely avoided prison.",
          detay: "You paid for mercy with your career.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_kidem_kavgasi: {
    baslik: "War of the Pashas",
    metin:
      "Two powerful pashas in the faction fell into a dangerous feud over who holds sway. Both expect support from junior officers like you.",
    secenekler: [
      {
        metin: "Back the senior, elderly pasha.",
        basariliSonuc: {
          mesaj: "You backed the old pasha; your loyalty earned respect.",
          detay: "Loyalty to the old hierarchy is valued.",
        },
        basarisizSonuc: {
          mesaj: "The old pasha fell; you got lumped with the 'outdated'.",
          detay: "Betting on the wrong horse is risky.",
        },
      },
      {
        metin: "Lie to both, take no side.",
        basariliSonuc: {
          mesaj: "You stayed out of it and emerged unharmed.",
          detay: "Sometimes the safest path is invisibility.",
        },
        basarisizSonuc: {
          mesaj: "Your lies to both came out; both sides blacklisted you.",
          detay: "Neutrality can bring double punishment.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_halk_algisi: {
    baslik: "The King's Dog",
    metin:
      "Walking in uniform, hunger-thin youths spat in your face shouting 'The King's Dog!' The tradesmen watch.",
    secenekler: [
      {
        metin: "Show your sword hilt, scare them off.",
        basariliSonuc: {
          mesaj: "Touching your sword was enough; they fled, you walked tall.",
          detay: "You mistake fear for authority; hatred grows.",
        },
        basarisizSonuc: {
          mesaj: "The youths fled, but the tradesmen's disgusted looks soured your day.",
          detay: "The people's hatred dampens your spirits.",
        },
      },
      {
        metin: "Wipe the spit, toss them money.",
        basariliSonuc: {
          mesaj: "You paid those who spat on you; they took it in shock.",
          detay: "Maybe they saw the heart under the uniform.",
        },
        basarisizSonuc: {
          mesaj: "'We don't want your blood money,' they said, and threw it back.",
          detay: "The people's hatred can't be bought.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_ayartma_teklifi: {
    baslik: "A Whisper in the Dark",
    metin:
      "Someone from the New Order slipped into your room at midnight: 'The old ship is sinking, join us and be a pasha.' He left a chest of gold.",
    secenekler: [
      {
        metin: "Take the gold, arrest him on the spot!",
        basariliSonuc: {
          mesaj: "You handed him to your superiors and hid the gold under your bed.",
          detay: "Hero and rich both; hypocrisy at its peak.",
        },
        basarisizSonuc: {
          mesaj: "He was a deadly assassin! He stabbed you and fled.",
          detay: "You got neither gold nor peace.",
        },
      },
      {
        metin: "Refuse the offer, tell him to get lost.",
        basariliSonuc: {
          mesaj: "He melted into the dark with his gold; next day your loyalty was noted.",
          detay: "You're fully trusted in the Old Guard now.",
        },
        basarisizSonuc: {
          mesaj: "You refused, but the offer kept you up for days: am I on the wrong side?",
          detay: "Resolve sometimes gnaws within.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_nobet_degisimi: {
    baslik: "The Changing of the Watch",
    metin:
      "You hand your night watch to a New Order soldier. He sizes you up and mutters, 'Your kind is history.'",
    secenekler: [
      {
        metin: "Don't let it pass, answer back.",
        basariliSonuc: {
          mesaj: "Your sharp reply silenced him; old guards secretly cheered.",
          detay: "Words can be sharper than swords.",
        },
        basarisizSonuc: {
          mesaj: "The spat became a fistfight; the watch captain caught you both.",
          detay: "The punishment was heavy.",
        },
      },
      {
        metin: "Pretend not to hear, do your duty.",
        basariliSonuc: {
          mesaj: "You kept your temper and handed over the watch quietly.",
          detay: "Silence is sometimes the strongest answer.",
        },
        basarisizSonuc: {
          mesaj: "You stayed silent but seethed; you couldn't sleep that night.",
          detay: "Swallowed anger grows inside.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_komutan_sinavi: {
    baslik: "The Commander's Test",
    metin:
      "The old commander called you to his tent: 'I want to see your loyalty once more.' He gives you a hard, dangerous mission.",
    secenekler: [
      {
        metin: "Accept the mission without question.",
        basariliSonuc: {
          mesaj: "You completed it; the commander nodded, eye to eye.",
          detay: "That look outweighs years of rewards.",
        },
        basarisizSonuc: {
          mesaj: "The mission went badly; you spent days on a stretcher.",
          detay: "Loyalty's price is sometimes heavy.",
        },
      },
      {
        metin: "Voice your concerns politely.",
        basariliSonuc: {
          mesaj: "Your honesty surprised the commander, but won his respect.",
          detay: "A soldier who doesn't obey blindly is valuable.",
        },
        basarisizSonuc: {
          mesaj: "The commander saw weakness and kept you under watch a while.",
          detay: "Some commanders dislike questions.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_aile_miras_silah: {
    baslik: "The Ancestral Sword",
    metin:
      "A retiring Old Guard veteran wants to entrust you his family's generations-old sword; it must never fall to a faction traitor.",
    secenekler: [
      {
        metin: "Accept the trust proudly.",
        basariliSonuc: {
          mesaj: "Weighing the sword you felt history's weight; the barracks heard.",
          detay: "You now carry not just a weapon but an oath.",
        },
        basarisizSonuc: {
          mesaj: "You accepted, but the responsibility keeps you up at night.",
          detay: "Some honors are also burdens.",
        },
      },
      {
        metin: "Politely refuse, you can't carry this burden.",
        basariliSonuc: {
          mesaj: "The veteran was disappointed but valued your honesty.",
          detay: "Sometimes honesty is worth more than honor.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal got you whispered about as a 'coward'.",
          detay: "Some refusals are misunderstood.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_gizli_bulusma_ihbari: {
    baslik: "A Whispered Meeting",
    metin:
      "A stable hand whispered that the New Order will hold a secret meeting outside town. Telling the commander earns favor, but things could spiral.",
    secenekler: [
      {
        metin: "Report it to the commander at once.",
        basariliSonuc: {
          mesaj: "A raid was made, the commander rewarded you.",
          detay: "But you're a New Order target now.",
        },
        basarisizSonuc: {
          mesaj: "The tip leaked; they got word before the raid and beat you.",
          detay: "Some secrets wound you too.",
        },
      },
      {
        metin: "Stay out, this isn't your fight.",
        basariliSonuc: {
          mesaj: "You stayed silent; no one learned you knew.",
          detay: "Sometimes the safest way is no way.",
        },
        basarisizSonuc: {
          mesaj: "Your silence gnawed at you, as if complicit in betrayal.",
          detay: "Silence can breed guilt.",
        },
      },
    ],
  },

  hizip_yeni_nizam_gizli_toplanti: {
    baslik: "The Footsteps of Revolution",
    metin:
      "The New Order meets at midnight in an abandoned mill to plan the king's overthrow. If caught, the sentence is death for treason.",
    secenekler: [
      {
        metin: "Attend and argue the most radical idea.",
        basariliSonuc: {
          mesaj: "Your fiery speech spellbound all; you're a shadow leader now.",
          detay: "You marked the places of bloodshed on the map yourself.",
        },
        basarisizSonuc: {
          mesaj: "The king's intelligence raided the mill! You barely fled into the woods under fire.",
          detay: "You're wounded and wanted.",
        },
      },
      {
        metin: "Skip it, avoid the risk.",
        basariliSonuc: {
          mesaj: "You slept safe; by morning the mill was raided.",
          detay: "Cowardice saved your life; your conscience bleeds.",
        },
        basarisizSonuc: {
          mesaj: "For skipping it, the movement branded you 'coward, untrustworthy'.",
          detay: "Revolutionaries don't forgive abandoning comrades.",
        },
      },
    ],
  },

  hizip_yeni_nizam_sabotaj_teklifi: {
    baslik: "The Smell of Gunpowder",
    metin:
      "A movement leader hands you dynamite: 'Tonight you blow up the king's munitions depot.' Civilian homes stand beside it.",
    secenekler: [
      {
        metin: "Accept, ignore civilian casualties.",
        basariliSonuc: {
          mesaj: "The depot blew up! The homes beside it burned too.",
          detay: "A hero, but you'll never forget those screams.",
        },
        basarisizSonuc: {
          mesaj: "Guards spotted you; you blew it early and were badly hurt.",
          detay: "Surviving was luck.",
        },
      },
      {
        metin: "Pocket the valuables first, then blow it.",
        basariliSonuc: {
          mesaj: "You stole the gold before the blast, then blew the depot.",
          detay: "Not a revolutionary, a vulture feeding on war.",
        },
        basarisizSonuc: {
          mesaj: "Greed slowed you; guards cornered and shot you in the depot.",
        },
      },
      {
        metin: "Civilians will die! I can't.",
        basariliSonuc: {
          mesaj: "You refused; the homes survived but comrades loathe you.",
          detay: "Sometimes doing nothing is the hardest heroism.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal got you called a 'royalist'.",
          detay: "Risk everything or have no place.",
        },
      },
    ],
  },

  hizip_yeni_nizam_liderlik_mucadelesi: {
    baslik: "Dark Leadership",
    metin:
      "A bloody dispute over who will lead the New Order. Both candidates want your support: moderate reformists or armed rebels?",
    secenekler: [
      {
        metin: "Back the moderate (political solution).",
        basariliSonuc: {
          mesaj: "Moderates took power; the movement advances by propaganda, not blood.",
          detay: "Common sense is sometimes the best revolution.",
        },
        basarisizSonuc: {
          mesaj: "Armed rebels toppled the moderate; your reputation was ruined.",
          detay: "Revolutions often fall to the most ruthless.",
        },
      },
      {
        metin: "Back the bloody candidate (armed revolt).",
        basariliSonuc: {
          mesaj: "The bloody leader took charge; you're ready to burn the city.",
          detay: "You dropped mercy; you want only power.",
        },
        basarisizSonuc: {
          mesaj: "His rash act brought the army down on you; you fled.",
          detay: "Courage sometimes turns to stupidity.",
        },
      },
    ],
  },

  hizip_yeni_nizam_ihbar_tehdidi: {
    baslik: "A Past That Won't Close",
    metin:
      "An old royalist acquaintance learned you're New Order: 'Pay me a hefty sum or your head goes on the general's table.'",
    secenekler: [
      {
        metin: "Pay, shut his mouth.",
        basariliSonuc: {
          mesaj: "You paid; for now he's silent.",
          detay: "Will a blackmailer not return?",
        },
        basarisizSonuc: {
          mesaj: "You paid, but he ratted you out anyway! You barely escaped.",
          detay: "Traitors can't be trusted.",
        },
      },
      {
        metin: "Lure him and finish him in an alley.",
        basariliSonuc: {
          mesaj: "You met him sword in hand, finished him unseen, dumped him in the river.",
          detay: "The secret is safe; your soul nears hell.",
        },
        basarisizSonuc: {
          mesaj: "He came with guards, ambushed you, and you were shot dead.",
        },
      },
      {
        metin: "He's bluffing! Give nothing.",
        basariliSonuc: {
          mesaj: "You waited, nothing happened; he got scared and left town.",
          detay: "Sometimes the best reaction is none.",
        },
        basarisizSonuc: {
          mesaj: "He reported you! HQ raided; you lost rank, money, job and fled into exile.",
          detay: "Ignoring it reset your life to zero.",
        },
      },
    ],
  },

  hizip_yeni_nizam_casus_supheliligi: {
    baslik: "A Spy Among Us",
    metin:
      "Suspicion spread that a spy is leaking to the king's intelligence. Fingers point at one of your most loyal comrades; evidence is thin.",
    secenekler: [
      {
        metin: "Interrogate the suspect, be harsh if needed.",
        basariliSonuc: {
          mesaj: "The real spy confessed! The movement escaped disaster.",
          detay: "You were right, but your methods trouble you.",
        },
        basarisizSonuc: {
          mesaj: "He was innocent! Comrades called you ruthless; trust shook.",
          detay: "Suspicion hurts the innocent most.",
        },
      },
      {
        metin: "Accuse no one without proof, wait patiently.",
        basariliSonuc: {
          mesaj: "The real spy slipped up; you wronged no one.",
          detay: "Justice smiles on the unhurried.",
        },
        basarisizSonuc: {
          mesaj: "While you waited the spy kept leaking; you were badly wounded in a raid.",
          detay: "Patience is sometimes costly.",
        },
      },
    ],
  },

  hizip_yeni_nizam_yasak_notlar: {
    baslik: "Forbidden Notes",
    metin:
      "A senior officer caught you with notes on reform ideas. You can't read his eyes: will he turn you in, or...",
    secenekler: [
      {
        metin: "Claim the notes aren't yours, lie.",
        basariliSonuc: {
          mesaj: "The officer believed you, returned the notes and left.",
          detay: "Heart pounding, you breathed again.",
        },
        basarisizSonuc: {
          mesaj: "Your lie came out; you were branded liar and traitor.",
          detay: "One lie usually needs a second.",
        },
      },
      {
        metin: "Tell the truth, defend your ideas.",
        basariliSonuc: {
          mesaj: "The officer smiled: 'I think so too.'",
          detay: "Courage wins unexpected allies.",
        },
        basarisizSonuc: {
          mesaj: "The officer reported you; you spent days in the lockup.",
          detay: "Not every officer is on your side.",
        },
      },
    ],
  },

  hizip_yeni_nizam_genc_ikna: {
    baslik: "Winning Young Hearts",
    metin:
      "A few newly joined young soldiers waver. If you bring them to the New Order's side, the movement grows stronger.",
    secenekler: [
      {
        metin: "Fire them up with a speech.",
        basariliSonuc: {
          mesaj: "Your words lit a spark; a few joined at once.",
          detay: "The right words can beat an army.",
        },
        basarisizSonuc: {
          mesaj: "Your speech seemed too bold; some looked at you oddly.",
          detay: "Not every speech lands.",
        },
      },
      {
        metin: "Talk with them one by one, calmly.",
        basariliSonuc: {
          mesaj: "Your patience worked; they began to trust you.",
          detay: "Real persuasion happens in quiet talks.",
        },
        basarisizSonuc: {
          mesaj: "Some stayed indifferent, but you offended none.",
          detay: "Not every seed sprouts in the same soil.",
        },
      },
    ],
  },

  hizip_yeni_nizam_eskimuhafiz_tuzagi: {
    baslik: "A Trap That Reeks",
    metin:
      "An Old Guard man urges you to visit a place he calls a 'secret weapons depot'. Your instincts whisper trap.",
    secenekler: [
      {
        metin: "Take the risk, go anyway.",
        basariliSonuc: {
          mesaj: "The depot was real! You returned with valuable supplies.",
          detay: "Suspicion can cost you opportunities.",
        },
        basarisizSonuc: {
          mesaj: "A full trap; ambushed, you barely escaped.",
          detay: "Your instincts were right.",
        },
      },
      {
        metin: "Have a trusted person check first.",
        basariliSonuc: {
          mesaj: "Your inquiry proved right; you dodged the trap by a hair.",
          detay: "Caution is sometimes the greatest courage.",
        },
        basarisizSonuc: {
          mesaj: "You missed it; the depot was real and someone beat you to it.",
          detay: "Caution has a price too.",
        },
      },
    ],
  },

  hizip_yeni_nizam_reform_sunumu: {
    baslik: "Presenting the Reform Proposal",
    metin:
      "The New Order offers a chance: present your reform proposals directly to a senior officer. This could be a defining moment.",
    secenekler: [
      {
        metin: "Give a bold, uncompromising pitch.",
        basariliSonuc: {
          mesaj: "You moved the officer; some proposals were considered.",
          detay: "Maybe the long-awaited change began today.",
        },
        basarisizSonuc: {
          mesaj: "The officer rejected them and accused you of insolence.",
          detay: "Not every courage is appreciated.",
        },
      },
      {
        metin: "Offer a moderate, step-by-step plan.",
        basariliSonuc: {
          mesaj: "The officer replied cautiously but warmly; you got a promise of small steps.",
          detay: "Slow progress beats none.",
        },
        basarisizSonuc: {
          mesaj: "Called 'inadequate and timid'; even your own side was let down.",
          detay: "Sometimes you can't please anyone.",
        },
      },
    ],
  },

  hizip_liman_loncasi_tarife_baskisi: {
    baslik: "A Ruthless Tariff",
    metin:
      "The guild elders decided to double flour and cloth prices during a famine. All members must follow this cruel tariff.",
    secenekler: [
      {
        metin: "Follow the guild, fleece the people.",
        basariliSonuc: {
          mesaj: "You raised prices; people bought in tears. You're a king in the guild.",
          detay: "Order fills the purse, empties the conscience.",
        },
        basarisizSonuc: {
          mesaj: "The people revolted at the prices and stoned your shop.",
          detay: "The golden chair couldn't shield you from broken glass.",
        },
      },
      {
        metin: "Secretly sell at the old price, protect the people.",
        basariliSonuc: {
          mesaj: "At night you sold cheap to the poor out back; they call you an angel.",
          detay: "The guild never noticed; heart and trade intact.",
        },
        basarisizSonuc: {
          mesaj: "Guild informers caught you! A huge fine for betrayal.",
          detay: "Kindness cost you near-bankruptcy.",
        },
      },
    ],
  },

  hizip_liman_loncasi_yeni_uye_toreni: {
    baslik: "New Blood for the Guild",
    metin:
      "A rich family's spoiled son wants into the guild on his father's money. He asks you to vouch for him.",
    secenekler: [
      {
        metin: "Vouch for him, invest in connections.",
        basariliSonuc: {
          mesaj: "You vouched; his father showed gratitude with a gift at once.",
          detay: "In the guild, connections can outweigh capital.",
        },
        basarisizSonuc: {
          mesaj: "The boy caused a scandal in week one; your name was stained.",
          detay: "Some vouchings end in regret.",
        },
      },
      {
        metin: "Politely decline, mind your business.",
        basariliSonuc: {
          mesaj: "You declined and spent the time on your own trade.",
          detay: "Not every connection is worth chasing.",
        },
        basarisizSonuc: {
          mesaj: "His family took offense and began talking about you in the guild.",
          detay: "Even a polite no can win enemies.",
        },
      },
    ],
  },

  hizip_liman_loncasi_resmi_denetim: {
    baslik: "The Shadow of the Inspector",
    metin:
      "Authorities accused the Harbor Guild of a price monopoly and came to examine the ledgers. Your turn could come.",
    secenekler: [
      {
        metin: "Fix the ledgers overnight, erase traces.",
        basariliSonuc: {
          mesaj: "You cleaned the ledgers; the inspector found nothing.",
          detay: "Once again a lie kept you clean.",
        },
        basarisizSonuc: {
          mesaj: "The forgery surfaced! You got a heavy fine.",
          detay: "Some lies leave ledger traces.",
        },
      },
      {
        metin: "Show the ledgers as they are, be honest.",
        basariliSonuc: {
          mesaj: "Your ledgers were spotless; the inspector shook your hand.",
          detay: "Honesty is sometimes the soundest defense.",
        },
        basarisizSonuc: {
          mesaj: "Though honest, a few guild customs put you in a bind.",
          detay: "Not everyone is as clean as you.",
        },
      },
    ],
  },

  hizip_liman_loncasi_eski_dost_ikna: {
    baslik: "A Friend on the Other Side",
    metin:
      "An old friend in the Market Union, saying monopoly crushes the people, begs you to switch sides.",
    secenekler: [
      {
        metin: "Politely refuse, stay loyal to the guild.",
        basariliSonuc: {
          mesaj: "You showed resolve; your friend left disappointed.",
          detay: "Loyalty often costs a friendship.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal cracked the friendship deeply.",
          detay: "Some no's are never forgotten.",
        },
      },
      {
        metin: "Take his words seriously, question yourself.",
        basariliSonuc: {
          mesaj: "His words moved you; you began quietly helping the people.",
          detay: "Conscience can outspeak guild rules.",
        },
        basarisizSonuc: {
          mesaj: "Your hesitation was noticed in the guild; trust dropped.",
          detay: "Indecision has a price.",
        },
      },
    ],
  },

  hizip_liman_loncasi_ambargo_karari: {
    baslik: "Close the Harbor",
    metin:
      "The guild elders imposed an embargo on a rival city's goods. You might lose some old customers.",
    secenekler: [
      {
        metin: "Follow the embargo fully, show loyalty.",
        basariliSonuc: {
          mesaj: "You followed it to the letter; the elders noted your loyalty.",
          detay: "Some gains come as standing.",
        },
        basarisizSonuc: {
          mesaj: "The embargo cost far more customers than expected.",
          detay: "Decisions can cost more than expected.",
        },
      },
      {
        metin: "Keep supplying old customers by a secret route.",
        basariliSonuc: {
          mesaj: "You kept trading in secret; lost neither money nor customers.",
          detay: "Rules bend to a flexible conscience.",
        },
        basarisizSonuc: {
          mesaj: "Guild spies caught you! A heavy fine for breaking the embargo.",
          detay: "Secret dealings don't always stay secret.",
        },
      },
    ],
  },

  hizip_liman_loncasi_lonca_muhru: {
    baslik: "The Guild's Seal",
    metin:
      "Guild masters may let you stamp your goods 'Harbor Guild Approved', but you must follow strict rules.",
    secenekler: [
      {
        metin: "Accept the rules, take the seal.",
        basariliSonuc: {
          mesaj: "The seal is yours; customers trust your goods more.",
          detay: "Reputation can outweigh gold.",
        },
        basarisizSonuc: {
          mesaj: "You got the seal, but strict inspections slowed your work.",
          detay: "Every privilege has a price.",
        },
      },
      {
        metin: "Refuse, stay on your own path.",
        basariliSonuc: {
          mesaj: "You kept your independence; you answer to no one.",
          detay: "Freedom is sometimes the greatest wealth.",
        },
        basarisizSonuc: {
          mesaj: "Staying outside the guild scared off big customers.",
          detay: "Some doors won't open without a seal.",
        },
      },
    ],
  },

  hizip_liman_loncasi_rakip_gemi_kazasi: {
    baslik: "Cargo Sunk in the Water",
    metin:
      "A merchant close to the Market Union lost his ship in a storm. Some cargo washed ashore; you could gather it unseen.",
    secenekler: [
      {
        metin: "Gather the goods, tell no one.",
        basariliSonuc: {
          mesaj: "You quietly gathered the goods; your purse swelled.",
          detay: "Fortune sometimes springs from another's disaster.",
        },
        basarisizSonuc: {
          mesaj: "You were seen gathering; called a 'carrion crow' for a while.",
          detay: "Some opportunities bring shame too.",
        },
      },
      {
        metin: "Tell the owner, offer help.",
        basariliSonuc: {
          mesaj: "Your help wasn't wasted; the merchant stayed grateful.",
          detay: "A hand to a rival can be the best investment.",
        },
        basarisizSonuc: {
          mesaj: "You helped, but it cost some time and money.",
          detay: "Kindness isn't repaid at once.",
        },
      },
    ],
  },

  hizip_liman_loncasi_eski_usul_anlasma: {
    baslik: "A Handshake Will Do",
    metin:
      "An old guild member wants a big deal on a handshake, no paper: 'In the old days a man's word came before a contract.'",
    secenekler: [
      {
        metin: "Shake hands, trust his word.",
        basariliSonuc: {
          mesaj: "The man kept his word; the deal went flawlessly.",
          detay: "The oldest ways are sometimes soundest.",
        },
        basarisizSonuc: {
          mesaj: "He reneged; with no paper you couldn't claim your due.",
          detay: "Trust sometimes costs dearly.",
        },
      },
      {
        metin: "Insist on a written document.",
        basariliSonuc: {
          mesaj: "You secured it in writing; he was miffed but the deal is solid.",
          detay: "A cautious merchant lives long.",
        },
        basarisizSonuc: {
          mesaj: "Your insistence offended him; the guild said 'he doesn't trust us'.",
          detay: "Mistrust can cost reputation.",
        },
      },
    ],
  },

  hizip_liman_loncasi_hazine_sandigi: {
    baslik: "The Guild's Common Chest",
    metin:
      "The guild wants a common aid chest to support each other in hard times. A contribution is expected of you.",
    secenekler: [
      {
        metin: "Contribute generously.",
        basariliSonuc: {
          mesaj: "Your gift was appreciated; your word carries more weight.",
          detay: "Generosity is sometimes the best investment.",
        },
        basarisizSonuc: {
          mesaj: "You gave, but didn't get the appreciation you hoped for.",
          detay: "Not every kindness gets applause.",
        },
      },
      {
        metin: "Give the minimum, keep the rest.",
        basariliSonuc: {
          mesaj: "No one noticed; your purse kept its weight.",
          detay: "Caution isn't always bad.",
        },
        basarisizSonuc: {
          mesaj: "Your stinginess was noticed; a few members talked behind your back.",
          detay: "Small calculations become big gossip.",
        },
      },
    ],
  },

  hizip_pazar_birligi_boykot_cagrisi: {
    baslik: "The Pang of a Boycott",
    metin:
      "The Market Union launched a big boycott against the nobles' Harbor Guild; none will buy harbor goods. Your shop may sink without them.",
    secenekler: [
      {
        metin: "Back the boycott fully, sacrifice your shop.",
        basariliSonuc: {
          mesaj: "Shelves stayed empty, but you became the Union's symbol; tradesmen respect you.",
          detay: "You bled your purse for principle.",
        },
        basarisizSonuc: {
          mesaj: "The boycott failed; the Guild broke it. Losses for nothing.",
          detay: "Idealism doesn't feed you.",
        },
      },
      {
        metin: "Secretly keep buying from the harbor.",
        basariliSonuc: {
          mesaj: "Your shelves were full; in the boycott you held a monopoly. You earned much.",
          detay: "Betrayal can bear sweet fruit.",
        },
        basarisizSonuc: {
          mesaj: "Tradesmen learned of your betrayal! They stoned your shop and burned your goods.",
          detay: "Tradesmen's anger is crueler than the nobles'.",
        },
      },
    ],
  },

  hizip_pazar_birligi_genc_girisimciler: {
    baslik: "Young Entrepreneurs",
    metin:
      "Young entrepreneurs in the Union look up to you and ask you to mentor them.",
    secenekler: [
      {
        metin: "Accept the mentoring.",
        basariliSonuc: {
          mesaj: "You guided them and won respect.",
          detay: "Sharing knowledge enriched you too.",
        },
        basarisizSonuc: {
          mesaj: "Mentoring took time; your own business suffered.",
          detay: "Every kindness can have a price.",
        },
      },
      {
        metin: "Politely refuse, mind your business.",
        basariliSonuc: {
          mesaj: "You refused and spent the time on your business.",
          detay: "You needn't make time for everyone.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal disappointed some of the young.",
          detay: "Every no leaves a small hurt.",
        },
      },
    ],
  },

  hizip_pazar_birligi_resmi_baski: {
    baslik: "The Shadow of the Authorities",
    metin:
      "Authorities accused the Market Union of disturbing order and began investigating members. Your turn could come.",
    secenekler: [
      {
        metin: "Hide, keep out of sight.",
        basariliSonuc: {
          mesaj: "You kept out of sight; the investigation passed you by.",
          detay: "Patience is sometimes the best defense.",
        },
        basarisizSonuc: {
          mesaj: "Your hiding was noticed; you paid a light fine.",
          detay: "Hiding doesn't always work.",
        },
      },
      {
        metin: "Resist openly.",
        basariliSonuc: {
          mesaj: "Your resistance made you a symbol in the Union.",
          detay: "Your courage was repaid.",
        },
        basarisizSonuc: {
          mesaj: "You paid heavily: goods seized, briefly detained.",
          detay: "Every resistance demands a price.",
        },
      },
    ],
  },

  hizip_pazar_birligi_eski_dost_ikna: {
    baslik: "An Old Friend's Call",
    metin:
      "An old friend in the Harbor Guild is trying to pull you back to the old order.",
    secenekler: [
      {
        metin: "Politely refuse, go your way.",
        basariliSonuc: {
          mesaj: "You refused politely; the friendship held.",
          detay: "Resolve needn't break a friendship.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal saddened your friend a little.",
          detay: "Every no can leave a mark.",
        },
      },
      {
        metin: "Take the offer seriously, think it over.",
        basariliSonuc: {
          mesaj: "Thinking it over won you some time and a small offer.",
          detay: "Open-mindedness sometimes pays.",
        },
        basarisizSonuc: {
          mesaj: "Your hesitation was noticed in the Union; loyalty questioned.",
          detay: "Indecision has a price.",
        },
      },
    ],
  },

  hizip_pazar_birligi_ortak_depo: {
    baslik: "A Common Warehouse Venture",
    metin:
      "The Union is debating a shared warehouse so small tradesmen can place bulk orders they couldn't afford alone.",
    secenekler: [
      {
        metin: "Pay your share, join the warehouse.",
        basariliSonuc: {
          mesaj: "The warehouse is up; you're no longer alone on big orders.",
          detay: "Unity gives the small strength.",
        },
        basarisizSonuc: {
          mesaj: "The warehouse opened, but its management is inefficient.",
          detay: "Joint ventures rarely run smooth.",
        },
      },
      {
        metin: "Don't join; go it alone.",
        basariliSonuc: {
          mesaj: "You stayed out and kept your independence.",
          detay: "Going alone brings freedom, not power.",
        },
        basarisizSonuc: {
          mesaj: "The Union branded you 'selfish'.",
          detay: "Individualism can cost solidarity.",
        },
      },
    ],
  },

  hizip_pazar_birligi_serbest_pazar: {
    baslik: "A Call for a Free Market",
    metin:
      "The Market Union plans an unauthorized market day against guild rules. Risky, but profitable.",
    secenekler: [
      {
        metin: "Join eagerly, set up your stall.",
        basariliSonuc: {
          mesaj: "The market boomed; your goods sold out.",
          detay: "Rule-breaking sometimes pays.",
        },
        basarisizSonuc: {
          mesaj: "Guild guards raided the market and seized your goods.",
          detay: "Every rebellion has a price.",
        },
      },
      {
        metin: "Back them, but open no stall.",
        basariliSonuc: {
          mesaj: "You backed the movement without the risk.",
          detay: "Pushing from behind counts.",
        },
        basarisizSonuc: {
          mesaj: "Your caution was called cowardice.",
          detay: "Not all caution is praised.",
        },
      },
    ],
  },

  hizip_pazar_birligi_lonca_casusu: {
    baslik: "A Spy Among Us",
    metin:
      "Someone in the Market Union is leaking to the Harbor Guild. Suspicion falls on a friend.",
    secenekler: [
      {
        metin: "Question your friend.",
        basariliSonuc: {
          mesaj: "The spy was someone else; you made peace with your friend.",
          detay: "Suspicion wounds the closest too.",
        },
        basarisizSonuc: {
          mesaj: "Your questioning hurt your friend; you stayed cold for long.",
          detay: "Some questions are best unasked.",
        },
      },
      {
        metin: "Investigate quietly yourself.",
        basariliSonuc: {
          mesaj: "You quietly found the spy and reported him; no one was hurt.",
          detay: "Patience is usually best.",
        },
        basarisizSonuc: {
          mesaj: "Your search found nothing; suspicion lingers.",
          detay: "Not every mystery is solved.",
        },
      },
    ],
  },

  hizip_pazar_birligi_halka_acik_fiyat: {
    baslik: "Announcing the Prices to the People",
    metin:
      "The Market Union wants to expose the guild's secret price deals. You could become a hero, or make enemies.",
    secenekler: [
      {
        metin: "Announce the prices in the square.",
        basariliSonuc: {
          mesaj: "The crowd cheered: 'a true merchant of the people'.",
          detay: "Your courage made you a name.",
        },
        basarisizSonuc: {
          mesaj: "The guild threatened to sue; you lost customers.",
          detay: "Defying the powerful is costly.",
        },
      },
      {
        metin: "Whisper it only to trusted people.",
        basariliSonuc: {
          mesaj: "The word spread quietly; you won without risk.",
          detay: "A whisper can beat a shout.",
        },
        basarisizSonuc: {
          mesaj: "Your whisper didn't spread or make an impact.",
          detay: "Not every whisper is heard.",
        },
      },
    ],
  },

  hizip_pazar_birligi_genc_ortaklik: {
    baslik: "A Young Partnership Offer",
    metin:
      "An ambitious young merchant wants to open a new market with you. Bold ideas, little experience.",
    secenekler: [
      {
        metin: "Accept, share the risk.",
        basariliSonuc: {
          mesaj: "The partnership took off; you both profited.",
          detay: "Opportunity sometimes springs from young ideas.",
        },
        basarisizSonuc: {
          mesaj: "The venture collapsed; inexperience was costly.",
          detay: "Not every bold idea works.",
        },
      },
      {
        metin: "Politely refuse; let him gain experience first.",
        basariliSonuc: {
          mesaj: "The young merchant thanked you and may return later.",
          detay: "Sometimes no is the best help.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal hurt him; he won't work with you again.",
          detay: "Not every refusal is taken kindly.",
        },
      },
    ],
  },

  "hizip_gelenekciler_ritüel_koruma": {
    baslik: "The Old Rituals",
    metin:
      "The Traditionalists want a centuries-old ritual kept exactly; some youths find it outdated.",
    secenekler: [
      {
        metin: "Perform the ritual exactly.",
        basariliSonuc: {
          mesaj: "You performed it meticulously; the elders approved.",
          detay: "Loyalty to tradition earns respect.",
        },
        basarisizSonuc: {
          mesaj: "You slipped slightly in the ritual; some elders noticed.",
          detay: "Tradition demands precision.",
        },
      },
      {
        metin: "Simplify the ritual a little.",
        basariliSonuc: {
          mesaj: "The young liked your simplification.",
          detay: "Small changes build bridges.",
        },
        basarisizSonuc: {
          mesaj: "Your simplification drew backlash among the Traditionalists.",
          detay: "Changing tradition is risky.",
        },
      },
    ],
  },

  hizip_gelenekciler_sapkinlik_suclamasi: {
    baslik: "An Accusation of Heresy",
    metin:
      "A Reformist preacher is accused of heresy; the Traditionalists expect you to join in.",
    secenekler: [
      {
        metin: "Join the accusation.",
        basariliSonuc: {
          mesaj: "You joined; your standing among the Traditionalists rose.",
          detay: "But it weighs on your conscience.",
        },
        basarisizSonuc: {
          mesaj: "Your accusation seemed harsh; some were uneasy.",
          detay: "Harshness doesn't always work.",
        },
      },
      {
        metin: "Stay silent, stay out.",
        basariliSonuc: {
          mesaj: "Your conscience is clear, but some Traditionalists doubted your loyalty.",
          detay: "Neutrality isn't always rewarded.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was read as weakness.",
          detay: "Some silences are misread.",
        },
      },
    ],
  },

  hizip_gelenekciler_otorite_mucadelesi: {
    baslik: "A Struggle for Authority",
    metin:
      "A dispute over authority has grown among the Traditionalists. You must pick a side.",
    secenekler: [
      {
        metin: "Back the most senior.",
        basariliSonuc: {
          mesaj: "Backing the senior fit tradition.",
          detay: "Respect for hierarchy is valued.",
        },
        basarisizSonuc: {
          mesaj: "Some called your support sycophancy.",
          detay: "Support isn't always seen the same.",
        },
      },
      {
        metin: "Stay neutral.",
        basariliSonuc: {
          mesaj: "You stayed neutral; no one blamed you.",
          detay: "Taking no side is safest.",
        },
        basarisizSonuc: {
          mesaj: "Your neutrality looked like indecision.",
          detay: "Neutrality isn't always understood.",
        },
      },
    ],
  },

  hizip_gelenekciler_kati_algisi: {
    baslik: "Are You a Rigid One?",
    metin:
      "Part of the people finds you too rigid; some are drifting away.",
    secenekler: [
      {
        metin: "Hold firm, explain nothing.",
        basariliSonuc: {
          mesaj: "You held firm; the Traditionalists approved.",
          detay: "Resolve is sometimes enough.",
        },
        basarisizSonuc: {
          mesaj: "Your silence pushed some members further away.",
          detay: "Not every silence is understood.",
        },
      },
      {
        metin: "Give a soft explanation.",
        basariliSonuc: {
          mesaj: "Your explanation softened some.",
          detay: "A small effort builds bridges.",
        },
        basarisizSonuc: {
          mesaj: "The Traditionalists criticized your explanation as 'softness'.",
          detay: "Not every explanation is appreciated.",
        },
      },
    ],
  },

  hizip_gelenekciler_uzlasma_teklifi: {
    baslik: "A Secret Reconciliation Offer",
    metin:
      "A Reformist secretly approaches you to build a bridge between the two groups.",
    secenekler: [
      {
        metin: "Accept, try to build the bridge.",
        basariliSonuc: {
          mesaj: "Your attempt was a small but real step.",
          detay: "Bridging takes courage.",
        },
        basarisizSonuc: {
          mesaj: "The Traditionalists disliked your attempt.",
          detay: "Not all conciliation is understood.",
        },
      },
      {
        metin: "Refuse, keep your purity.",
        basariliSonuc: {
          mesaj: "You refused; your place among the Traditionalists firmed up.",
          detay: "Clarity is sometimes safest.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal closed the chance for a bridge.",
          detay: "Not every chance returns.",
        },
      },
    ],
  },

  hizip_gelenekciler_eski_metinler_bekcisi: {
    baslik: "Keeper of the Old Texts",
    metin:
      "The monastery's oldest manuscript is decaying. Recopying takes days, but the Traditionalists hold its sanctity dear.",
    secenekler: [
      {
        metin: "Copy it meticulously, days on end.",
        basariliSonuc: {
          mesaj: "Your copy was flawless; the congregation called you 'a true keeper'.",
          detay: "Some labor is measured in patience.",
        },
        basarisizSonuc: {
          mesaj: "Days of stooping wore out your back, and you made some errors.",
          detay: "Not all labor ends flawless.",
        },
      },
      {
        metin: "Hand it to an apprentice; supervise.",
        basariliSonuc: {
          mesaj: "The apprentice did well, and your time was saved.",
          detay: "Delegating is wisdom too.",
        },
        basarisizSonuc: {
          mesaj: "The apprentice erred badly; the text was miscopied.",
          detay: "Delegation can backfire.",
        },
      },
    ],
  },

  hizip_gelenekciler_cemaat_yaslilari: {
    baslik: "The Council of Elders",
    metin:
      "The congregation's eldest summon you to council. Their questions on an old rite will test your loyalty.",
    secenekler: [
      {
        metin: "Repeat the traditional answers verbatim.",
        basariliSonuc: {
          mesaj: "The elders were pleased: 'a true Traditionalist'.",
          detay: "Loyalty is measured by sincerity, not rote.",
        },
        basarisizSonuc: {
          mesaj: "You misremembered details; the elders were disappointed.",
          detay: "Tradition forgives no forgetfulness.",
        },
      },
      {
        metin: "Add your own interpretation.",
        basariliSonuc: {
          mesaj: "Your view impressed some elders: 'this one thinks'.",
          detay: "Tradition grows with fresh eyes.",
        },
        basarisizSonuc: {
          mesaj: "Your view was deemed insolent: 'presumptuous'.",
          detay: "Not every innovation is welcome.",
        },
      },
    ],
  },

  hizip_gelenekciler_kutsal_emanet_nakli: {
    baslik: "The Journey of the Holy Relic",
    metin:
      "You must carry a valuable relic along a dangerous road to another holy site. Bandits may lurk.",
    secenekler: [
      {
        metin: "Take the main road, fast.",
        basariliSonuc: {
          mesaj: "You delivered the relic safely; the congregation will tell of it for years.",
          detay: "Courage is sometimes the shortest way.",
        },
        basarisizSonuc: {
          mesaj: "Bandits beat and robbed you, but the relic stayed with you.",
          detay: "The holy is sometimes guarded at a cost.",
        },
      },
      {
        metin: "Take the long, safe detour.",
        basariliSonuc: {
          mesaj: "You arrived quietly and safely.",
          detay: "Patience is sometimes wisest.",
        },
        basarisizSonuc: {
          mesaj: "The long road wore you out; your delay worried the congregation.",
          detay: "Safety steals time.",
        },
      },
    ],
  },

  hizip_gelenekciler_yenilikci_vaaz_engelleme: {
    baslik: "A Dangerous Sermon",
    metin:
      "A Reformist plans a sermon that will shake tradition. The Traditionalists want you to stop it.",
    secenekler: [
      {
        metin: "Tell the people first; discredit him.",
        basariliSonuc: {
          mesaj: "Your speech worked; the sermon drew no interest.",
          detay: "Words can be the sharpest shield.",
        },
        basarisizSonuc: {
          mesaj: "It backfired; you were called a 'coward' and 'obstructionist'.",
          detay: "Any intervention can backfire.",
        },
      },
      {
        metin: "Stay out; let ideas stand on their own.",
        basariliSonuc: {
          mesaj: "You stayed out; the congregation decided itself.",
          detay: "Silence is sometimes wisest.",
        },
        basarisizSonuc: {
          mesaj: "Some Traditionalists saw your silence as 'indifference'.",
          detay: "Neutrality isn't always praised.",
        },
      },
    ],
  },

  hizip_yenilikciler_yeni_yorum: {
    baslik: "A New Interpretation",
    metin:
      "The Reformists are preparing a new interpretation of the holy texts and want your help.",
    secenekler: [
      {
        metin: "Contribute actively.",
        basariliSonuc: {
          mesaj: "Your input enriched the work; your name rose.",
          detay: "Your labor paid off.",
        },
        basarisizSonuc: {
          mesaj: "The work proved harder than expected and wore you down.",
          detay: "Not every contribution is easy.",
        },
      },
      {
        metin: "Support from afar; stay out of it.",
        basariliSonuc: {
          mesaj: "Your measured support sufficed.",
          detay: "A contribution needn't be big.",
        },
        basarisizSonuc: {
          mesaj: "Your distance disappointed some.",
          detay: "Not every distance is understood.",
        },
      },
    ],
  },

  hizip_yenilikciler_sapkinlik_suclamasi: {
    baslik: "Accused of Heresy",
    metin:
      "The Traditionalists openly accused you of heresy. It could seriously shake your standing.",
    secenekler: [
      {
        metin: "Defend yourself openly.",
        basariliSonuc: {
          mesaj: "Your defense convinced; the charge mostly fizzled.",
          detay: "A bold defense strengthened you.",
        },
        basarisizSonuc: {
          mesaj: "Your defense wasn't convincing enough; your reputation suffered.",
          detay: "Not every defense succeeds.",
        },
      },
      {
        metin: "Stay silent; let the storm pass.",
        basariliSonuc: {
          mesaj: "Your silence let the charge fade with time.",
          detay: "Time is the best defense.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was taken as admission.",
          detay: "Any silence can be misread.",
        },
      },
    ],
  },

  hizip_yenilikciler_fikir_ayriligi: {
    baslik: "A Disagreement Within the Group",
    metin:
      "Even the Reformists disagree on how far to go. Will you be measured or radical?",
    secenekler: [
      {
        metin: "Argue for measured change.",
        basariliSonuc: {
          mesaj: "The majority embraced your measured stance.",
          detay: "Balance is sometimes the strongest stance.",
        },
        basarisizSonuc: {
          mesaj: "Your moderation disappointed the radicals.",
          detay: "Moderation isn't always valued.",
        },
      },
      {
        metin: "Argue for radical change.",
        basariliSonuc: {
          mesaj: "Your radicalism thrilled some; your name rose.",
          detay: "Courage draws attention.",
        },
        basarisizSonuc: {
          mesaj: "Your radicalism scared the moderates; the split deepened.",
          detay: "Radicalism can divide.",
        },
      },
    ],
  },

  hizip_yenilikciler_halk_algisi: {
    baslik: "Are You a Pioneer?",
    metin:
      "Some see you as a bold pioneer; others find you untrustworthy.",
    secenekler: [
      {
        metin: "Spend time with pioneers, find inspiration.",
        basariliSonuc: {
          mesaj: "Time with supporters strengthened you.",
          detay: "Inspiration can come from a simple chat.",
        },
        basarisizSonuc: {
          mesaj: "Even your supporters disagreed.",
          detay: "No group is in perfect harmony.",
        },
      },
      {
        metin: "Talk to the skeptics; try to understand.",
        basariliSonuc: {
          mesaj: "Your talk softened some skeptics.",
          detay: "Understanding builds bridges.",
        },
        basarisizSonuc: {
          mesaj: "The talk grew tense and drained you.",
          detay: "Not every dialogue is easy.",
        },
      },
    ],
  },

  hizip_yenilikciler_susturma_girisimi: {
    baslik: "An Attempt to Silence You",
    metin:
      "The authorities think voices like yours grow too loud and try to silence you.",
    secenekler: [
      {
        metin: "Keep raising your voice.",
        basariliSonuc: {
          mesaj: "You kept speaking; your courage made you a symbol.",
          detay: "Some prices are paid by speaking out.",
        },
        basarisizSonuc: {
          mesaj: "The authorities temporarily removed you from your post.",
          detay: "Courage had a price.",
        },
      },
      {
        metin: "Withdraw for a while.",
        basariliSonuc: {
          mesaj: "Withdrawing let you ride out the storm.",
          detay: "Strategic silence keeps you alive.",
        },
        basarisizSonuc: {
          mesaj: "Your retreat disappointed some supporters.",
          detay: "Not every retreat is understood.",
        },
      },
    ],
  },

  hizip_yenilikciler_halka_acik_tartisma: {
    baslik: "A Debate in the Square",
    metin:
      "A Traditionalist challenges you to a public debate in the square. Win, and the Reformists grow stronger.",
    secenekler: [
      {
        metin: "Accept and take the square.",
        basariliSonuc: {
          mesaj: "You won the debate masterfully; the crowd cheered.",
          detay: "Your ideas now reach more ears.",
        },
        basarisizSonuc: {
          mesaj: "Your rival cornered you; you lost shamefully before the crowd.",
          detay: "Not every challenge ends in victory.",
        },
      },
      {
        metin: "Politely decline; say you've no time.",
        basariliSonuc: {
          mesaj: "You declined; hardly anyone cared.",
          detay: "Not every battle is fought in the square.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal looked like fear; supporters were disappointed.",
          detay: "Retreat is mistaken for weakness.",
        },
      },
    ],
  },

  hizip_yenilikciler_yeni_nesil_sorulari: {
    baslik: "The Young People's Hard Questions",
    metin:
      "Some youths corner you with hard questions about faith. Your answers may shape their future.",
    secenekler: [
      {
        metin: "Answer honestly, openly, boldly.",
        basariliSonuc: {
          mesaj: "Your honesty moved the youths; they grew more attached to you.",
          detay: "Real answers are the hardest.",
        },
        basarisizSonuc: {
          mesaj: "Some answers stirred debate; some parents complained.",
          detay: "Honesty can bring unease.",
        },
      },
      {
        metin: "Stick to safe, traditional answers.",
        basariliSonuc: {
          mesaj: "The questions passed quietly; no one took offense.",
          detay: "The safe road is still a road.",
        },
        basarisizSonuc: {
          mesaj: "The youths found your answers lacking: 'he's one of them too'.",
          detay: "Evasion breaks trust.",
        },
      },
    ],
  },

  hizip_yenilikciler_itham_mektubu: {
    baslik: "A Harsh Letter of Accusation",
    metin:
      "The Traditionalists sent the authorities an official letter accusing you of 'heresy'. You must reply.",
    secenekler: [
      {
        metin: "Write a firm reply defending your ideas.",
        basariliSonuc: {
          mesaj: "Your reply convinced the authorities; the charges were dropped.",
          detay: "A boldly defended idea is strong.",
        },
        basarisizSonuc: {
          mesaj: "Your reply fell short; you were placed under watch for a while.",
          detay: "Not every defense succeeds.",
        },
      },
      {
        metin: "Write a soft, conciliatory reply.",
        basariliSonuc: {
          mesaj: "Your reply eased tensions; the charge quietly closed.",
          detay: "Softness can be a strong shield.",
        },
        basarisizSonuc: {
          mesaj: "Some Reformists called your softness 'surrender'.",
          detay: "Compromise draws fire from your own side.",
        },
      },
    ],
  },

  hizip_yenilikciler_reform_vaazi_kursusu: {
    baslik: "The Pulpit Is Yours",
    metin:
      "On the great service day the pulpit is yours: a rare chance to put the Reformists' ideas to a large crowd.",
    secenekler: [
      {
        metin: "Preach reform boldly and directly.",
        basariliSonuc: {
          mesaj: "Your sermon moved the crowd; many came over to your side.",
          detay: "Your words today will be remembered for years.",
        },
        basarisizSonuc: {
          mesaj: "Some found the sermon harsh and left uneasily.",
          detay: "Bold words aren't always welcomed.",
        },
      },
      {
        metin: "Tell your ideas in a measured, indirect way.",
        basariliSonuc: {
          mesaj: "Your sermon was accepted; you sowed ideas without alarming anyone.",
          detay: "Seeds are sometimes sown quietly.",
        },
        basarisizSonuc: {
          mesaj: "Your sermon was too vague; the message didn't land.",
          detay: "Indirect words aren't always understood.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_sahin_haberci: {
    baslik: "The King's Secret Message",
    metin:
      "The Old Guard's general wants a secret message sent to a besieged allied fortress. The roads swarm with enemy patrols.",
    secenekler: [
      {
        metin: "Tie the message to {hayvan}'s leg.",
        kilitAciklamasi: "You need a trained falcon.",
        basariliSonuc: {
          mesaj: "{hayvan} glided over the lines and delivered it. The general praised you.",
          detay: "A winged friend beat the best spy.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Go yourself, slip through by night.",
        basariliSonuc: {
          mesaj: "You dodged the patrols and delivered it yourself; you became legend.",
          detay: "Some heroics must be done in person.",
        },
        basarisizSonuc: {
          mesaj: "A patrol caught you; you barely escaped, the message lost.",
          detay: "Courage fell short this time.",
        },
      },
      {
        metin: "Refuse the mission as too risky.",
        basariliSonuc: {
          mesaj: "You declined; the general scowled and sent another.",
          detay: "Missed chances cost something.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal earned you the label 'coward' in the faction.",
          detay: "Every no leaves a mark.",
        },
      },
    ],
  },

  hizip_yeni_nizam_kilic_gosterisi: {
    baslik: "The New Order's Show",
    metin:
      "The New Order stages a grand duel: a young reformist officer will face the old order's best swordsman. You are that officer.",
    secenekler: [
      {
        metin: "Draw the Black Sword and win.",
        kilitAciklamasi: "You need a legendary weapon.",
        basariliSonuc: {
          mesaj: "The Black Sword danced; his blade fell at first strike. The square roared.",
          detay: "You're the New Order's star.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Fight with your own sword.",
        basariliSonuc: {
          mesaj: "You won a hard duel; the people hailed you the New Order's symbol.",
          detay: "Victory came by sweat.",
        },
        basarisizSonuc: {
          mesaj: "The master beat you; the New Order was humbled.",
          detay: "Not every show ends in victory.",
        },
      },
      {
        metin: "Withdraw, feigning injury.",
        basariliSonuc: {
          mesaj: "You withdrew; the faction couldn't hide its disappointment.",
          detay: "Some escapes leave marks.",
        },
        basarisizSonuc: {
          mesaj: "Your excuse was exposed as a lie; you were humiliated publicly.",
          detay: "Lies come out.",
        },
      },
    ],
  },

  hizip_liman_loncasi_kedi_ambar: {
    baslik: "A Danger Gnawing the Storehouse",
    metin:
      "Rats have overrun the Harbor Guild's grain store; the stock could rot within weeks. The masters want a fast, cheap fix.",
    secenekler: [
      {
        metin: "Set {hayvan} loose in the store.",
        kilitAciklamasi: "You need a skilled ratter.",
        basariliSonuc: {
          mesaj: "{hayvan} cleared the store in a week; the masters praise your 'cheap genius'.",
          detay: "Your cat became the guild's darling.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Hire costly ratters and traps.",
        basariliSonuc: {
          mesaj: "The hunters finished in days; the stock was saved but your purse is lighter.",
          detay: "Some solutions cost dear.",
        },
        basarisizSonuc: {
          mesaj: "The rats were faster; you lost both money and stock.",
          detay: "Not every investment pays.",
        },
      },
      {
        metin: "Ignore it, accept the loss.",
        basariliSonuc: {
          mesaj: "The rats ate their fill; you lost money but skipped the hassle.",
          detay: "Doing nothing also costs.",
        },
        basarisizSonuc: {
          mesaj: "The loss ballooned; the guild called you 'indifferent'.",
          detay: "Ignoring rarely comes cheap.",
        },
      },
    ],
  },

  hizip_pazar_birligi_sikke_bahsi: {
    baslik: "A Bet for the Tradesmen's Honor",
    metin:
      "The Market Union bet the rival guild's arrogant envoy: whoever profits more repairs the old fountain. The Union is watching you.",
    secenekler: [
      {
        metin: "Secretly use the Shadow Coin.",
        kilitAciklamasi: "You need a mysterious coin.",
        basariliSonuc: {
          mesaj: "The coin winked at you; luck turned and you crushed the rival.",
          detay: "Sweet victory, but only you know how.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Compete honestly, on your usual skill.",
        basariliSonuc: {
          mesaj: "You honored the Union in a tight race; the fountain went to the rival, pride to you.",
          detay: "Honest victory is sweeter.",
        },
        basarisizSonuc: {
          mesaj: "The rival guild beat you; you lost some standing.",
          detay: "Not every race is won.",
        },
      },
      {
        metin: "Quit the bet; forget honor.",
        basariliSonuc: {
          mesaj: "You withdrew; members whispered, but you took no risk.",
          detay: "Not fighting is a choice too.",
        },
        basarisizSonuc: {
          mesaj: "Your withdrawal was called 'cowardice'; your standing shook.",
          detay: "Not every step back reads the same.",
        },
      },
    ],
  },

  hizip_gelenekciler_kalinti_vaazi: {
    baslik: "A Sermon Against the Skeptics",
    metin:
      "The Traditionalists want a great sermon to quell growing skepticism. The square will be packed; prove your faith.",
    secenekler: [
      {
        metin: "Show the Holy Relic to the congregation.",
        kilitAciklamasi: "You need a holy relic.",
        basariliSonuc: {
          mesaj: "As you raised the relic, the square fell silent; even skeptics knelt.",
          detay: "Some proofs outweigh a thousand sermons.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Trust your oratory alone.",
        basariliSonuc: {
          mesaj: "Your words touched hearts; even skeptics applauded.",
          detay: "Faith itself is the strongest proof.",
        },
        basarisizSonuc: {
          mesaj: "The sermon fell flat; the skeptics grew bolder.",
          detay: "Not every oration conquers the square.",
        },
      },
      {
        metin: "Postpone; don't go unprepared.",
        basariliSonuc: {
          mesaj: "Postponed; the congregation understood, but skeptics spoke on another week.",
          detay: "Some delays cost dear.",
        },
        basarisizSonuc: {
          mesaj: "The delay read as 'indecision'; your standing shook.",
          detay: "Leadership is tested constantly.",
        },
      },
    ],
  },

  hizip_yenilikciler_papagan_mucizesi: {
    baslik: "A 'Sign' for the New Congregation",
    metin:
      "The Reformists want followers through fervor, not dogma. Someone whispers that a 'heavenly voice' would ignite the crowd's faith.",
    secenekler: [
      {
        metin: "Have {hayvan} mimic holy words behind the pulpit.",
        kilitAciklamasi: "You need a trained, mimicking bird.",
        basariliSonuc: {
          mesaj: "The 'heavenly voice' made the crowd weep; new followers poured in.",
          detay: "Believers rejoice; you alone know the truth.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} blurted something else at the worst moment! The crowd scattered laughing.",
          detay: "Fake miracles give themselves away.",
        },
      },
      {
        metin: "Inspire with a sincere sermon alone.",
        basariliSonuc: {
          mesaj: "Your sincere words won a few followers; growth is slow but sound.",
          detay: "An honest seed roots, however slowly.",
        },
        basarisizSonuc: {
          mesaj: "Your sermon drew no interest; the crowd dispersed.",
          detay: "Inspiration doesn't come daily.",
        },
      },
      {
        metin: "Reject the idea; skip the show.",
        basariliSonuc: {
          mesaj: "You refused; some call you 'too conservative', but your conscience is clear.",
          detay: "Some lines must be drawn.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal read as 'timidity'; the faction's young wing drifted away.",
          detay: "Principles can carry a price.",
        },
      },
    ],
  },
};
