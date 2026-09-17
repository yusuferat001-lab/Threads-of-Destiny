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
      "At midnight the Old Guard and the New Order came to blows in the barracks courtyard. Torches light up the whole place, blood is about to be shed.",
    secenekler: [
      {
        metin: "Draw your weapon and fight for your own faction!",
        basariliSonuc: {
          mesaj: "You were at the very front of the fight! Your own comrades lifted you onto their shoulders — you're a leader.",
        },
        basarisizSonuc: {
          mesaj: "The other side beat you badly. You were carried to the infirmary with your head split open.",
        },
      },
      {
        metin: "Lower your weapons! Step in and stop the fight.",
        basariliSonuc: {
          mesaj: "You made the courtyard ring with your booming voice! Everyone lowered their weapons in shame.",
        },
        basarisizSonuc: {
          mesaj: "As you stepped in, they threw a torch at your head. Being a peace envoy is painful.",
        },
      },
    ],
  },

  hizip_asker_celiskili_emirler: {
    baslik: "A Two-Mouthed Order",
    metin:
      "A commander from your own faction gave you a secret order; a senior officer close to the rival faction wants exactly the opposite. You can't obey both.",
    secenekler: [
      {
        metin: "Follow your own faction's order, ignore the senior officer.",
        basariliSonuc: {
          mesaj: "You carried out your faction's order; your comrades trusted you.",
          detay: "Your loyalty was rewarded but a crack formed in the chain of discipline.",
        },
        basarisizSonuc: {
          mesaj: "The senior officer noticed your disobedience and punished you in front of everyone.",
          detay: "Faction loyalty can't always come before army discipline.",
        },
      },
      {
        metin: "Follow the hierarchy, carry out the senior officer's order.",
        basariliSonuc: {
          mesaj: "You carried out the order in full; the senior officer took note of you.",
          detay: "Discipline was rewarded but your own faction won't forget this.",
        },
        basarisizSonuc: {
          mesaj: "Your faction brothers saw this as a betrayal and started treating you coldly.",
          detay: "Serving two masters has a price.",
        },
      },
    ],
  },

  hizip_asker_kislada_tasfiye: {
    baslik: "A Purge in the Barracks",
    metin:
      "A quiet removal of a few soldiers close to the rival faction is being planned; you're asked to help prepare this purge list.",
    secenekler: [
      {
        metin: "Prepare the list, consolidate your faction's power.",
        basariliSonuc: {
          mesaj: "The list was prepared and the rivals were quietly removed from the barracks. Your name rose within the faction.",
          detay: "You gained power but you know this method isn't fair.",
        },
        basarisizSonuc: {
          mesaj: "The list leaked! The soldiers to be purged got wind of it in advance and ambushed you.",
          detay: "It's sometimes inevitable that secret plans backfire.",
        },
      },
      {
        metin: "Refuse, this is a dirty game.",
        basariliSonuc: {
          mesaj: "You refused; your conscience is at ease but you got branded 'weak' within the faction.",
          detay: "Some victories are won by keeping your honor.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was read by the faction leaders as mistrust.",
          detay: "Doing the right thing isn't always without a price.",
        },
      },
    ],
  },

  hizip_tuccar_catisma: {
    baslik: "Sinking Ships",
    metin:
      "The price war between the Harbor Guild and the Market Union has turned bloody. They're offering to torch the ships carrying the rival faction's goods.",
    secenekler: [
      {
        metin: "Pay the shadows, burn the rival's ship!",
        basariliSonuc: {
          mesaj: "The harbor is ablaze! Your rivals went bankrupt, and you're the sole master of the market.",
        },
        basarisizSonuc: {
          mesaj: "The arsonists were caught and squealed, giving your name. You were ruined paying compensation.",
        },
      },
      {
        metin: "I won't play this dirty game, I'll just focus on my trade.",
        basariliSonuc: {
          mesaj: "You kept your hands clean. You carry on your business slowly but with honor.",
        },
        basarisizSonuc: {
          mesaj: "You stayed clean but your rivals sabotaged your warehouses!",
        },
      },
    ],
  },

  hizip_tuccar_depo_yangini: {
    baslik: "A Suspicious Fire",
    metin:
      "A warehouse of the rival faction caught fire at midnight. No one claimed it but everyone points to your faction. What will you do now?",
    secenekler: [
      {
        metin: "Take credit for the fire (obliquely), show your faction's power.",
        basariliSonuc: {
          mesaj: "The rumor spread: this is how anyone who crosses your rivals ends up. You're spoken of with fear within the faction.",
          detay: "You gained power but your conscience began to darken.",
        },
        basarisizSonuc: {
          mesaj: "The city guards traced the trail to you! You got off by paying a heavy compensation.",
          detay: "Some secrets are doomed to come to light.",
        },
      },
      {
        metin: "Help put out the fire, show your goodwill.",
        basariliSonuc: {
          mesaj: "You ran to put out the fire. Even the rival faction didn't forget this gesture.",
          detay: "Sometimes the hand you extend to your enemy is your greatest victory.",
        },
        basarisizSonuc: {
          mesaj: "While helping you were poisoned by the smoke; your own faction criticized it as 'a pointless gesture'.",
          detay: "Kindness isn't always appreciated.",
        },
      },
    ],
  },

  hizip_tuccar_fiyat_savasi: {
    baslik: "A Price War",
    metin:
      "The rival faction has started selling its goods below cost to wipe you off the market. Will you respond in kind, or find a different way?",
    secenekler: [
      {
        metin: "Cut your prices below cost too, let's see who holds out.",
        basariliSonuc: {
          mesaj: "Your rival gave in first, came to the edge of bankruptcy. The market is yours again.",
          detay: "You won but this war wore down both sides.",
        },
        basarisizSonuc: {
          mesaj: "You lost the price war, took serious losses for a few months.",
          detay: "Some gambles punish the loser far more heavily.",
        },
      },
      {
        metin: "Don't enter the price war, put your quality and service forward.",
        basariliSonuc: {
          mesaj: "Your loyal customers chose you for quality, not price.",
          detay: "Sometimes the best strategy is not to play the rival's game at all.",
        },
        basarisizSonuc: {
          mesaj: "Some customers still moved to the cheap price, you took a small loss.",
          detay: "Loyalty isn't found in everyone.",
        },
      },
    ],
  },

  hizip_din_catisma: {
    baslik: "Fire in the Pulpit",
    metin:
      "The philosophical debate between the Traditionalists and the Reformists has turned into physical attacks in the streets. Today at the great market service, thousands will listen to you.",
    secenekler: [
      {
        metin: "Accuse the other side of heresy and rouse the congregation!",
        basariliSonuc: {
          mesaj: "Your fiery sermon drove the congregation mad! You rose to the position of your faction's absolute spiritual leader.",
        },
        basarisizSonuc: {
          mesaj: "The other side's supporters attacked the pulpit with stones and clubs during the sermon! Blood ran.",
        },
      },
      {
        metin: "God wants peace. Try to soften hearts.",
        basariliSonuc: {
          mesaj: "The tenderness in your voice made the angry crowd weep. The city came back from a massacre that day.",
        },
        basarisizSonuc: {
          mesaj: "Your own faction started scheming behind your back, accusing you of being 'cowardly and pacifist'.",
        },
      },
    ],
  },

  hizip_din_metin_yorumu: {
    baslik: "The Interpretation of the Holy Text",
    metin:
      "A clergyman from the rival faction, openly challenging your faction's interpretation of a passage of the holy text, invites you to a public debate.",
    secenekler: [
      {
        metin: "Accept the invitation, debate it openly in the square.",
        basariliSonuc: {
          mesaj: "You came out on top in the debate! The congregation declared you the brightest voice of your faction.",
          detay: "Your words will stay in the crowd's memory for a long time.",
        },
        basarisizSonuc: {
          mesaj: "Your rival backed you into a corner; you stood there speechless in front of the people.",
          detay: "Some defeats stay not in the pulpit but in memories.",
        },
      },
      {
        metin: "Refuse the invitation, say the debate itself is divisive.",
        basariliSonuc: {
          mesaj: "Your refusal was seen by some as a wise humility.",
          detay: "You don't have to answer every challenge.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was announced to the people by the rival faction as 'cowardice'.",
          detay: "Silence is sometimes misinterpreted.",
        },
      },
    ],
  },

  hizip_din_cemaat_ayrilik: {
    baslik: "The Congregation Splits in Two",
    metin:
      "Even within your own congregation there are those who sympathize with the Traditionalists and the Reformists. You must do something before the split grows.",
    secenekler: [
      {
        metin: "Force the congregation to unite along your own faction's line.",
        basariliSonuc: {
          mesaj: "The majority of the congregation embraced your line; a few families quietly left.",
          detay: "Unity is sometimes achieved at a price.",
        },
        basarisizSonuc: {
          mesaj: "Your domineering manner strained the congregation further; some families left the temple entirely.",
          detay: "Coercion sometimes divides more than it unites.",
        },
      },
      {
        metin: "Give room to different views, propose living together.",
        basariliSonuc: {
          mesaj: "Your tolerant stance held the congregation together; everyone could find their own voice.",
          detay: "Sometimes the strongest unity is born of accepting difference.",
        },
        basarisizSonuc: {
          mesaj: "Your faction leaders criticized this stance as 'indecisiveness'.",
          detay: "Tolerance doesn't always please everyone.",
        },
      },
    ],
  },

  tepki_hizip_sir_ifsa_tehdidi: {
    baslik: "The Secret in Your Hands",
    metin:
      "You learned a dangerous secret about your faction. Revealing it could drag both you and the group you belong to into a great crisis; but staying silent troubles your conscience.",
    secenekler: [
      {
        metin: "Keep the secret to yourself, do nothing.",
        basariliSonuc: {
          mesaj: "You stayed silent; the secret stayed with you, you're safe but there's a weight inside you.",
          detay: "Some silences pay a price, it's just invisible.",
        },
        basarisizSonuc: {
          mesaj: "You tried to stay silent but your conscience wouldn't leave you alone.",
          detay: "Some secrets grow inside.",
        },
      },
      {
        metin: "You're about to reveal the secret.",
        basariliSonuc: { mesaj: "Not used." },
        basarisizSonuc: { mesaj: "Not used." },
        onTepki: {
          metin:
            "The words you'd say haven't reached anyone yet but this moment is a threshold of no return. One more step and your paths with the faction could part entirely.",
          geriCekilMetni: "Give up at the last moment, leave the secret buried.",
          geriCekilSonucu: {
            mesaj: "You gave up at the last moment; the secret stayed with you.",
            detay: "Turning back from some thresholds takes courage too.",
          },
          devamMetni: "No. Reveal the secret.",
          devamSonucu: {
            mesaj:
              "You revealed the secret; the people remembered you for your honesty but your faction never saw you the same way again.",
            detay: "The day your conscience found peace was the day a door closed forever.",
          },
        },
      },
    ],
  },

  hizip_eski_muhafizlar_sadakat_yemini: {
    baslik: "An Oath Written in Blood",
    metin:
      "The Old Guard is holding a ceremonial oath at midnight by torchlight to renew their unshakable loyalty to the king and the old commanders. Everyone is expected to draw their sword and pledge in blood.",
    secenekler: [
      {
        metin: "Take the oath with pride, shed your blood.",
        basariliSonuc: {
          mesaj: "You cut your hand on your sword and cried out the oath. The general looked into your eyes and smiled.",
          detay: "You became an unshakable pillar of the old order. There's no turning back now.",
        },
        basarisizSonuc: {
          mesaj: "You took the oath but your voice trembled. Those around you doubted your courage.",
          detay: "Weakness is noticed at once in settings like this.",
        },
      },
      {
        metin: "Take the oath but only with your lips, don't shed your blood.",
        basariliSonuc: {
          mesaj: "You stayed in the shadows, moved your mouth for show and pretended to cut your hand.",
          detay: "No one noticed but this hypocrisy left an unease in you.",
        },
        basarisizSonuc: {
          mesaj: "The general noticed you weren't bleeding! He declared you a traitor and had you beaten in front of everyone.",
          detay: "You don't mock a loyalty oath.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_isyan_bastirma: {
    baslik: "A Dark Operation",
    metin:
      "Your commanders want you to raid a secret cell where young lieutenants close to the New Order gather. On the list is the name of someone you knew in the past. The order is absolute: 'Leave none of them alive.'",
    secenekler: [
      {
        metin: "Carry out the mission with full loyalty and ruthlessness.",
        basariliSonuc: {
          mesaj: "You burst into the room and spared no one. Your old acquaintance drew their last breath looking at your face.",
          detay: "The command staff declared you a hero but at night those looks come into your dreams.",
        },
        basarisizSonuc: {
          mesaj: "The young lieutenants were ready. A bomb went off in the room and you barely got out, badly wounded.",
          detay: "The bloody operation ended in a fiasco.",
        },
      },
      {
        metin: "Slow the mission down, knock on the door and let them flee.",
        basariliSonuc: {
          mesaj: "You went to the operation late. When you arrived there were only burnt documents.",
          detay: "You saved your old friend's life. The commanders are angry but there's no proof.",
        },
        basarisizSonuc: {
          mesaj: "It came out that you were deliberately late! Your ranks were stripped and you barely avoided prison.",
          detay: "You paid for your mercy with your career.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_kidem_kavgasi: {
    baslik: "War of the Pashas",
    metin:
      "A dangerous fight broke out within the faction between two powerful pashas over who would have more say. Both expect support from lower-ranking officers like you.",
    secenekler: [
      {
        metin: "Support the senior, elderly pasha.",
        basariliSonuc: {
          mesaj: "You supported the old pasha. Your loyalty won great respect among the old hands.",
          detay: "Loyalty to the traditional hierarchy is always appreciated.",
        },
        basarisizSonuc: {
          mesaj: "The old pasha fell from favor; your support got you spoken of alongside the 'outdated'.",
          detay: "Betting on the wrong horse is always risky.",
        },
      },
      {
        metin: "Lie to both, take no side.",
        basariliSonuc: {
          mesaj: "You never got involved in the dispute and came out of the fight unharmed.",
          detay: "Sometimes the safest way is to be invisible.",
        },
        basarisizSonuc: {
          mesaj: "It came out that you lied to both. You ended up on both sides' blacklists.",
          detay: "Not every neutrality is appreciated; sometimes it brings double punishment.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_halk_algisi: {
    baslik: "The King's Dog",
    metin:
      "As you walked the street in your uniform, youths reduced to skin and bones by hunger spat in your face and shouted 'The King's Dog!' The tradesmen around are watching.",
    secenekler: [
      {
        metin: "Show them the hilt of your sword and scatter them with fear.",
        basariliSonuc: {
          mesaj: "Just touching your sword was enough. The youths fled in fear. And you walked on with your shoulders squared.",
          detay: "You mistake the fear in the street for authority, but this hatred is growing inside.",
        },
        basarisizSonuc: {
          mesaj: "The youths fled but the disgusted looks the tradesmen gave you turned your stomach all day.",
          detay: "The people hating you this much is wrecking your spirits.",
        },
      },
      {
        metin: "Wipe off the spit, take money from your pocket and toss it to them.",
        basariliSonuc: {
          mesaj: "You gave money to the ones who spat on you. They took it in shock and left.",
          detay: "The tradesmen couldn't believe this move. Maybe they saw the heart under the uniform.",
        },
        basarisizSonuc: {
          mesaj: "You tossed the money but they threw it back in your face saying 'we don't want your blood money'.",
          detay: "The people's hatred turned out too deep to be bought.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_ayartma_teklifi: {
    baslik: "A Whisper in the Dark",
    metin:
      "Someone from the New Order slipped into your room at midnight. 'The old ship is sinking, if you come with us you'll be a pasha in the new army,' they say, leaving a chest of gold on the table.",
    secenekler: [
      {
        metin: "Take the gold and arrest the man on the spot!",
        basariliSonuc: {
          mesaj: "You had the man seized and handed him to your superiors, but you hid the chest of gold under your own bed.",
          detay: "You became both a hero and rich. You're at the peak of hypocrisy.",
        },
        basarisizSonuc: {
          mesaj: "The man turned out to be a very dangerous assassin! He stabbed you and fled.",
          detay: "You got neither the money nor anything but a body covered in blood.",
        },
      },
      {
        metin: "Refuse the offer, tell them to get lost.",
        basariliSonuc: {
          mesaj: "The man took his gold and melted into the dark. The next day your superiors heard of this loyalty.",
          detay: "You're now completely trusted within the Old Guard.",
        },
        basarisizSonuc: {
          mesaj: "You refused but the offer kept you awake for days. Am I on the wrong side?",
          detay: "Resolve sometimes gnaws at you from within.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_nobet_degisimi: {
    baslik: "The Changing of the Watch",
    metin:
      "You hand your night watch over to a New Order soldier. The man sizes you up, then mutters under his breath, 'Your kind is history now.'",
    secenekler: [
      {
        metin: "Don't let it pass, answer back.",
        basariliSonuc: {
          mesaj: "You gave a sharp reply, the man fell silent. The old guards around you cheered you on secretly.",
          detay: "Words are sometimes sharper than a sword.",
        },
        basarisizSonuc: {
          mesaj: "The war of words turned into a fistfight, and you were both caught by the watch captain.",
          detay: "The disciplinary punishment was heavy.",
        },
      },
      {
        metin: "Pretend not to hear, do your duty.",
        basariliSonuc: {
          mesaj: "You kept your temper and handed over the watch quietly.",
          detay: "Sometimes silence is the strongest answer.",
        },
        basarisizSonuc: {
          mesaj: "You stayed silent but felt yourself fill with anger, and you couldn't sleep that night.",
          detay: "Swallowed anger sometimes grows inside.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_komutan_sinavi: {
    baslik: "The Commander's Test",
    metin:
      "The old commander called you to his private tent. 'I want to see your loyalty once more,' he said, giving you a hard, dangerous-looking mission.",
    secenekler: [
      {
        metin: "Accept the mission without questioning it at all.",
        basariliSonuc: {
          mesaj: "You completed the mission successfully, and the commander nodded, looking into your eyes.",
          detay: "That look was worth more than any reward you'd get for years.",
        },
        basarisizSonuc: {
          mesaj: "The mission went badly wrong, you spent days on a stretcher.",
          detay: "The price of loyalty is sometimes paid heavily.",
        },
      },
      {
        metin: "Voice your concerns politely.",
        basariliSonuc: {
          mesaj: "Your honesty surprised the commander but you won his respect.",
          detay: "A soldier who doesn't obey blindly is valuable too.",
        },
        basarisizSonuc: {
          mesaj: "The commander saw this as a weakness and put you under surveillance for a while.",
          detay: "Some commanders don't take kindly to questioning.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_aile_miras_silah: {
    baslik: "The Ancestral Sword",
    metin:
      "An old Old Guard veteran, retiring, wants to entrust you with the sword his family has carried for generations. But this trust carries a heavy responsibility: you'll never let the sword fall into the hands of someone who betrays the faction.",
    secenekler: [
      {
        metin: "Accept the trust with pride.",
        basariliSonuc: {
          mesaj: "Weighing the sword in your hand you felt the weight of history, and the whole barracks heard of it.",
          detay: "What you carry now is not just a weapon but an oath too.",
        },
        basarisizSonuc: {
          mesaj: "You accepted the sword but the weight of this responsibility keeps you awake at night.",
          detay: "Some honors are also a burden.",
        },
      },
      {
        metin: "Politely refuse, say you can't carry this burden.",
        basariliSonuc: {
          mesaj: "The old soldier was disappointed but appreciated your honesty.",
          detay: "Not every honor deserves to be accepted; sometimes honesty is worth more.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal got you whispered about as a 'coward' in the barracks.",
          detay: "Some refusals are misunderstood.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_gizli_bulusma_ihbari: {
    baslik: "A Whispered Meeting",
    metin:
      "A stable hand whispered to you that the New Order will hold a secret meeting outside the city. If you take this to the commander you could win great favor — but things could get out of hand.",
    secenekler: [
      {
        metin: "Report it to the commander at once.",
        basariliSonuc: {
          mesaj: "A raid was carried out, the commander rewarded you.",
          detay: "But you're a target in the New Order's eyes now.",
        },
        basarisizSonuc: {
          mesaj: "The information leaked, they got word before the raid and beat you badly.",
          detay: "Some secrets wound you too.",
        },
      },
      {
        metin: "Don't get involved, this isn't your fight.",
        basariliSonuc: {
          mesaj: "You stayed silent, no one learned you had this information.",
          detay: "Sometimes the safest way is no way at all.",
        },
        basarisizSonuc: {
          mesaj: "Your silence troubled you inside, as if you'd been complicit in a betrayal.",
          detay: "Keeping quiet sometimes breeds its own pangs of conscience.",
        },
      },
    ],
  },

  hizip_yeni_nizam_gizli_toplanti: {
    baslik: "The Footsteps of Revolution",
    metin:
      "The New Order is holding a secret meeting at midnight in an abandoned mill. Plans to overthrow the king will be discussed. If you're caught your sentence is death for treason.",
    secenekler: [
      {
        metin: "Attend the meeting fearlessly and argue the most radical idea.",
        basariliSonuc: {
          mesaj: "Your fiery speech spellbound everyone. You're now one of the movement's shadow leaders.",
          detay: "On the maps at the table you marked with your own hands the places where blood would be shed.",
        },
        basarisizSonuc: {
          mesaj: "The king's intelligence raided the mill! Under a rain of bullets you barely fled to the forest.",
          detay: "You're wounded and you know you're wanted. Secrecy is gone now.",
        },
      },
      {
        metin: "Don't attend, don't take the risk.",
        basariliSonuc: {
          mesaj: "You slept safely at home. In the morning you heard the mill was raided and your friends arrested.",
          detay: "Your cowardice saved your life but your conscience is bleeding.",
        },
        basarisizSonuc: {
          mesaj: "For not attending you were declared 'coward' and 'untrustworthy' within the movement.",
          detay: "Revolutionaries don't forgive those who leave their comrades alone.",
        },
      },
    ],
  },

  hizip_yeni_nizam_sabotaj_teklifi: {
    baslik: "The Smell of Gunpowder",
    metin:
      "One of the movement's leaders held out sticks of dynamite to you: 'Tonight you'll blow up the king's munitions depot.' But there are civilian homes right next to the depot.",
    secenekler: [
      {
        metin: "Accept the mission, don't care about civilian casualties.",
        basariliSonuc: {
          mesaj: "The depot went up in a massive explosion! But the homes next to it burned too.",
          detay: "You're the movement's hero but you'll never forget the screams from the burning homes.",
        },
        basarisizSonuc: {
          mesaj: "As you set the dynamite the guards spotted you. Under a rain of bullets you triggered the blast early and were badly wounded.",
          detay: "Surviving a night like hell was pure luck.",
        },
      },
      {
        metin: "First move the valuables from the depot into your own pocket, then blow it up.",
        basariliSonuc: {
          mesaj: "Before the blast you stole the gold/valuables inside. Then you blew up the depot.",
          detay: "You're not a revolutionary, you're a vulture that feeds on war.",
        },
        basarisizSonuc: {
          mesaj: "Your greed slowed you down. The guards cornered you in the depot and you were shot on the spot.",
        },
      },
      {
        metin: "Civilians will die! I can't do this mission.",
        basariliSonuc: {
          mesaj: "You refused the dynamite. Those homes in the city didn't burn but your comrades are disgusted with you.",
          detay: "Sometimes doing nothing is the hardest heroism.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal got you called a 'royalist' within the movement.",
          detay: "Unless you risk everything for your cause, you have no place among them.",
        },
      },
    ],
  },

  hizip_yeni_nizam_liderlik_mucadelesi: {
    baslik: "Dark Leadership",
    metin:
      "A bloody dispute broke out within the New Order over who would lead. Both candidates want your support; the moderate reformists or the armed rebels?",
    secenekler: [
      {
        metin: "Support the moderate candidate (a political solution).",
        basariliSonuc: {
          mesaj: "The moderates took power. The movement advances with newspapers and propaganda instead of shedding blood.",
          detay: "Common sense is sometimes the most valuable revolution.",
        },
        basarisizSonuc: {
          mesaj: "The armed rebels overthrew the moderate candidate. Your reputation was in ruins too.",
          detay: "Revolutions usually fall to the most ruthless.",
        },
      },
      {
        metin: "Support the daring and bloody candidate (armed rebellion).",
        basariliSonuc: {
          mesaj: "The bloody leader took charge. Together you're ready to turn the city into an inferno.",
          detay: "You set mercy aside, you want only power.",
        },
        basarisizSonuc: {
          mesaj: "Because of a rash act by your bloody candidate the army descended on you. You escaped by fleeing.",
          detay: "Courage sometimes turns into stupidity.",
        },
      },
    ],
  },

  hizip_yeni_nizam_ihbar_tehdidi: {
    baslik: "A Past That Won't Close",
    metin:
      "An old acquaintance among the royalists learned you're a New Order member. 'Either you give me a hefty sum or your head goes on the general's table,' they threaten.",
    secenekler: [
      {
        metin: "Pay them off, seal their mouth.",
        basariliSonuc: {
          mesaj: "You gave the man the money. For now he's silent.",
          detay: "But who can guarantee a blackmailer won't come back once he's taken money?",
        },
        basarisizSonuc: {
          mesaj: "You gave the money but the man ratted you out anyway! You barely escaped.",
          detay: "Traitors can never be trusted.",
        },
      },
      {
        metin: "Deceive him and finish him off in a back alley at night.",
        basariliSonuc: {
          mesaj: "You went to meet the man with your sword. You finished him off without anyone seeing and threw him in the river.",
          detay: "Your secret is safe. But your soul is one step closer to hell.",
        },
        basarisizSonuc: {
          mesaj: "The man didn't come alone! He ambushed you with guards and you were shot dead on the spot.",
        },
      },
      {
        metin: "He's bluffing! Give him nothing.",
        basariliSonuc: {
          mesaj: "You waited. Nothing happened. The man got scared and left the city.",
          detay: "Sometimes the best reaction is no reaction.",
        },
        basarisizSonuc: {
          mesaj: "He reported you! Headquarters was raided. You lost your rank, your money and your job and fled into exile.",
          detay: "The price of ignoring it was resetting your life to zero.",
        },
      },
    ],
  },

  hizip_yeni_nizam_casus_supheliligi: {
    baslik: "A Spy Among Us",
    metin:
      "A suspicion spread within the movement that there's a spy leaking information to the king's intelligence. Fingers point at one of the comrades who seemed most loyal; the evidence is weak but the suspicion is great.",
    secenekler: [
      {
        metin: "Interrogate the suspect, use harsh methods if needed.",
        basariliSonuc: {
          mesaj: "Under interrogation the real spy confessed! Thanks to you the movement came back from a great disaster.",
          detay: "It turned out you were right but the methods you used trouble you.",
        },
        basarisizSonuc: {
          mesaj: "The man was innocent! Your comrades accused you of ruthlessness, trust within the movement was shaken.",
          detay: "Suspicion sometimes does the most damage to the innocent.",
        },
      },
      {
        metin: "Don't accuse anyone without evidence, patiently wait for the real spy.",
        basariliSonuc: {
          mesaj: "Your patience paid off when the real spy gave themselves away by their own mistake; you wronged no one.",
          detay: "Justice sometimes smiles on those who don't rush.",
        },
        basarisizSonuc: {
          mesaj: "While you waited the spy kept leaking information; you were badly wounded during a raid.",
          detay: "Sometimes patience is paid for heavily.",
        },
      },
    ],
  },

  hizip_yeni_nizam_yasak_notlar: {
    baslik: "Forbidden Notes",
    metin:
      "A senior officer caught you with your notes containing reform ideas. You can't read the expression in his eyes — will he turn you in, or...",
    secenekler: [
      {
        metin: "Claim the notes aren't yours, lie.",
        basariliSonuc: {
          mesaj: "The officer was convinced, gave you the notes back and went on his way.",
          detay: "With your heart pounding you breathed a sigh of relief.",
        },
        basarisizSonuc: {
          mesaj: "Your lie came out, you got branded both a liar and a traitor.",
          detay: "One lie usually requires a second lie.",
        },
      },
      {
        metin: "Tell the truth, defend your ideas.",
        basariliSonuc: {
          mesaj: "The officer surprisingly smiled: 'I think so too,' he said.",
          detay: "Sometimes courage wins unexpected allies.",
        },
        basarisizSonuc: {
          mesaj: "The officer reported you, you spent a few days in the lockup.",
          detay: "Not every officer is on your side.",
        },
      },
    ],
  },

  hizip_yeni_nizam_genc_ikna: {
    baslik: "Winning Young Hearts",
    metin:
      "A few newly joined young soldiers seem undecided. If you can bring them to the New Order's side the movement grows stronger.",
    secenekler: [
      {
        metin: "Give a fiery speech, fire them up.",
        basariliSonuc: {
          mesaj: "Your words lit a spark in the young men's eyes, a few joined your ranks at once.",
          detay: "Sometimes the right words are stronger than an army.",
        },
        basarisizSonuc: {
          mesaj: "Your speech was found too bold, some of them found you strange.",
          detay: "Not every oration gets a response.",
        },
      },
      {
        metin: "Talk with them one by one, calmly.",
        basariliSonuc: {
          mesaj: "Your patient approach worked, the young men started to trust you.",
          detay: "Real persuasion usually happens in quiet conversations.",
        },
        basarisizSonuc: {
          mesaj: "Some stayed indifferent but you offended no one.",
          detay: "Not every seed sprouts in the same soil.",
        },
      },
    ],
  },

  hizip_yeni_nizam_eskimuhafiz_tuzagi: {
    baslik: "A Trap That Reeks",
    metin:
      "One of the Old Guard suggests you go to a place he says holds a 'secret weapons depot'. Your instincts whisper this could be a trap.",
    secenekler: [
      {
        metin: "Take the risk, go anyway.",
        basariliSonuc: {
          mesaj: "The depot was real! You came back with valuable supplies.",
          detay: "Sometimes suspicion keeps you from the most valuable opportunities.",
        },
        basarisizSonuc: {
          mesaj: "It was a complete trap, you were ambushed and barely escaped.",
          detay: "Your instincts were right, you should have listened.",
        },
      },
      {
        metin: "Have a trusted person check first.",
        basariliSonuc: {
          mesaj: "Your inquiry proved right, you escaped the trap by a hair.",
          detay: "Caution is sometimes the greatest courage.",
        },
        basarisizSonuc: {
          mesaj: "You missed the opportunity, and the depot was real — someone got there before you.",
          detay: "Sometimes caution demands a price too.",
        },
      },
    ],
  },

  hizip_yeni_nizam_reform_sunumu: {
    baslik: "Presenting the Reform Proposal",
    metin:
      "The New Order gave you an opportunity: a chance to present your reform proposals directly to a senior officer. This could be one of the movement's greatest moments.",
    secenekler: [
      {
        metin: "Give a bold, uncompromising presentation.",
        basariliSonuc: {
          mesaj: "Your presentation deeply moved the officer, some proposals were really taken under consideration.",
          detay: "Maybe the change awaited for years began today.",
        },
        basarisizSonuc: {
          mesaj: "The officer harshly rejected the proposals, accused you of insolence.",
          detay: "Not every act of courage is appreciated.",
        },
      },
      {
        metin: "Present a moderate, step-by-step approach.",
        basariliSonuc: {
          mesaj: "The officer gave a cautious but positive response, you got a promise of progress in small steps.",
          detay: "Sometimes advancing slowly is better than not advancing at all.",
        },
        basarisizSonuc: {
          mesaj: "The proposal was found 'inadequate and timid', even your own side was disappointed.",
          detay: "Sometimes no matter how careful you are, you can't please anyone.",
        },
      },
    ],
  },

  hizip_liman_loncasi_tarife_baskisi: {
    baslik: "A Ruthless Tariff",
    metin:
      "The guild elders decided to double the price of flour and cloth while the people are already in famine. All members are required to follow this cruel tariff.",
    secenekler: [
      {
        metin: "Follow the guild, exploit the people.",
        basariliSonuc: {
          mesaj: "You raised the prices. People bought goods in tears. In the guild you're like a king.",
          detay: "Loyalty to the order fills the wallet, empties the conscience.",
        },
        basarisizSonuc: {
          mesaj: "The people revolted against the exorbitant prices and stoned your shop.",
          detay: "The golden chair you sit in couldn't protect you when the windows broke.",
        },
      },
      {
        metin: "Secretly sell at the old price and protect the people.",
        basariliSonuc: {
          mesaj: "At night you gave goods cheap to the poor through the back door. You're spoken of like an angel in the city.",
          detay: "The guild didn't notice. You kept your heart clean and kept your trade going.",
        },
        basarisizSonuc: {
          mesaj: "Guild informers caught you! You took a huge fine for betraying the guild.",
          detay: "You paid the price of your kindness by coming to the edge of bankruptcy.",
        },
      },
    ],
  },

  hizip_liman_loncasi_yeni_uye_toreni: {
    baslik: "New Blood for the Guild",
    metin:
      "The spoiled son of a rich family wants to be admitted to the guild purely on his father's money. He wants you to vouch for him.",
    secenekler: [
      {
        metin: "Vouch for him, invest in future connections.",
        basariliSonuc: {
          mesaj: "You vouched for him; his father showed his gratitude with a gift right away.",
          detay: "In the guild, connections are sometimes worth more than capital.",
        },
        basarisizSonuc: {
          mesaj: "The spoiled boy got mixed up in a scandal in the first week, and your name was stained too.",
          detay: "Some vouchings end in regret.",
        },
      },
      {
        metin: "Politely refuse, focus on your own business.",
        basariliSonuc: {
          mesaj: "You refused; you spent your time on your own trade.",
          detay: "Not every connection is worth chasing.",
        },
        basarisizSonuc: {
          mesaj: "His family took it as an insult and started talking about you within the guild.",
          detay: "Even a polite no sometimes wins you an enemy.",
        },
      },
    ],
  },

  hizip_liman_loncasi_resmi_denetim: {
    baslik: "The Shadow of the Inspector",
    metin:
      "The authorities accused the Harbor Guild of setting up a price monopoly and came to examine the ledgers. Your turn could come too.",
    secenekler: [
      {
        metin: "Fix your ledgers overnight, erase the traces.",
        basariliSonuc: {
          mesaj: "You cleaned the ledgers; the inspector left without finding anything.",
          detay: "Once again you came out clean with a lie.",
        },
        basarisizSonuc: {
          mesaj: "The forgery came to light! You were hit with a heavy fine.",
          detay: "Some lies leave traces in the ledgers.",
        },
      },
      {
        metin: "Show your ledgers as they are, act honestly.",
        basariliSonuc: {
          mesaj: "Your ledgers were spotless; the inspector shook your hand and left.",
          detay: "Honesty is sometimes the most solid defense.",
        },
        basarisizSonuc: {
          mesaj: "Even though you were honest, a couple of guild customs put you in a slight bind.",
          detay: "Not everyone is as clean as you.",
        },
      },
    ],
  },

  hizip_liman_loncasi_eski_dost_ikna: {
    baslik: "A Friend on the Other Side",
    metin:
      "An old friend in the Market Union, saying that monopoly is crushing the people, is begging you to switch sides.",
    secenekler: [
      {
        metin: "Politely refuse, stay loyal to your guild.",
        basariliSonuc: {
          mesaj: "You showed your resolve; your friend left disappointed.",
          detay: "Loyalty has a price, most often a friendship.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal opened a deep crack in your friendship.",
          detay: "Some no's are never forgotten.",
        },
      },
      {
        metin: "Take his words seriously, question your conscience.",
        basariliSonuc: {
          mesaj: "Your friend's words deeply moved you; you secretly started doing a few kindnesses for the people.",
          detay: "Conscience sometimes speaks louder than the guild's rules.",
        },
        basarisizSonuc: {
          mesaj: "Your hesitation was noticed within the guild, trust in you dropped.",
          detay: "Indecision has a price.",
        },
      },
    ],
  },

  hizip_liman_loncasi_ambargo_karari: {
    baslik: "Close the Harbor",
    metin:
      "The guild elders decided on an embargo to keep a rival city's goods out of the harbor. This could mean losing some of your old customers.",
    secenekler: [
      {
        metin: "Follow the embargo fully, show your loyalty to the guild.",
        basariliSonuc: {
          mesaj: "You followed the embargo to the letter; the guild elders noted your loyalty.",
          detay: "Some gains come not right away but as standing.",
        },
        basarisizSonuc: {
          mesaj: "The embargo cost you far more customers than you'd estimated.",
          detay: "Your decisions sometimes cost more than expected.",
        },
      },
      {
        metin: "Keep getting goods to your old customers by a secret back route.",
        basariliSonuc: {
          mesaj: "You kept your trade going through secret routes; you lost neither money nor customers.",
          detay: "The guild's rules can be bent to a flexible conscience.",
        },
        basarisizSonuc: {
          mesaj: "The guild's spies caught you! You paid a heavy fine for breaking the embargo.",
          detay: "Secret dealings don't always stay secret.",
        },
      },
    ],
  },

  hizip_liman_loncasi_lonca_muhru: {
    baslik: "The Guild's Seal",
    metin:
      "The guild masters may let you stamp your goods with a 'Harbor Guild Approved' seal — but for that you must agree to follow strict rules.",
    secenekler: [
      {
        metin: "Accept the rules, take the seal.",
        basariliSonuc: {
          mesaj: "The seal is yours now, customers trust your goods more.",
          detay: "Reputation is sometimes worth more than gold.",
        },
        basarisizSonuc: {
          mesaj: "You took the seal but the strict inspections slowed some of your business.",
          detay: "Every privilege has a price.",
        },
      },
      {
        metin: "Refuse, you want to stay your own way.",
        basariliSonuc: {
          mesaj: "You kept your independence, you answer to no one.",
          detay: "Freedom is sometimes the greatest wealth.",
        },
        basarisizSonuc: {
          mesaj: "Staying outside the guild scared off some big customers.",
          detay: "Some doors don't open without a seal.",
        },
      },
    ],
  },

  hizip_liman_loncasi_rakip_gemi_kazasi: {
    baslik: "Cargo Sunk in the Water",
    metin:
      "A merchant close to the Market Union had his ship sink in a storm. Part of his cargo washed ashore — you could gather it up without anyone seeing.",
    secenekler: [
      {
        metin: "Gather the goods, tell no one.",
        basariliSonuc: {
          mesaj: "You quietly gathered the goods, your purse swelled.",
          detay: "Fortune is sometimes born of someone else's disaster.",
        },
        basarisizSonuc: {
          mesaj: "They saw you gathering the goods, you were called a 'carrion crow' for a while.",
          detay: "Some opportunities bring shame too.",
        },
      },
      {
        metin: "Tell the ship's owner, offer to help.",
        basariliSonuc: {
          mesaj: "Your help wasn't in vain, the merchant stayed grateful to you.",
          detay: "Sometimes the hand you extend to your rival is the most valuable investment.",
        },
        basarisizSonuc: {
          mesaj: "You helped but it cost you a bit of time and money.",
          detay: "Kindness isn't always immediately repaid.",
        },
      },
    ],
  },

  hizip_liman_loncasi_eski_usul_anlasma: {
    baslik: "A Handshake Will Do",
    metin:
      "An old guild member wants to make a big deal with just a handshake, no written document at all. 'In the old days a man's word came before a contract,' he says.",
    secenekler: [
      {
        metin: "Shake hands, trust his word.",
        basariliSonuc: {
          mesaj: "The man kept his word, the deal worked flawlessly.",
          detay: "Sometimes the oldest ways are the most solid.",
        },
        basarisizSonuc: {
          mesaj: "The man went back on his word, and with no document you couldn't pursue your rights.",
          detay: "Trust sometimes costs dearly.",
        },
      },
      {
        metin: "Insist on a written document.",
        basariliSonuc: {
          mesaj: "You secured it with a document, the man was a bit offended but the deal is solid.",
          detay: "A cautious merchant lives long.",
        },
        basarisizSonuc: {
          mesaj: "Your insistence offended the man, it was talked about in the guild as 'he doesn't trust us'.",
          detay: "Mistrust sometimes costs you reputation.",
        },
      },
    ],
  },

  hizip_liman_loncasi_hazine_sandigi: {
    baslik: "The Guild's Common Chest",
    metin:
      "The guild wants to set up a common aid chest — to support each other in hard times. A contribution is expected from you too.",
    secenekler: [
      {
        metin: "Contribute generously.",
        basariliSonuc: {
          mesaj: "Your contribution was appreciated in the guild, your word carries more weight now.",
          detay: "Generosity is sometimes the best investment.",
        },
        basarisizSonuc: {
          mesaj: "You contributed but didn't get the appreciation you expected.",
          detay: "Not every kindness gets applause.",
        },
      },
      {
        metin: "Give the minimum, keep the rest.",
        basariliSonuc: {
          mesaj: "No one paid much attention, your purse kept its weight.",
          detay: "Being cautious isn't always a bad thing.",
        },
        basarisizSonuc: {
          mesaj: "Your stinginess was noticed, a few guild members talked behind your back.",
          detay: "Small calculations sometimes turn into big gossip.",
        },
      },
    ],
  },

  hizip_pazar_birligi_boykot_cagrisi: {
    baslik: "The Pang of a Boycott",
    metin:
      "The Market Union launched a big boycott against the nobles' Harbor Guild. None of the members will buy harbor goods. Your shop could go under without these goods.",
    secenekler: [
      {
        metin: "Fully support the boycott, sacrifice your shop.",
        basariliSonuc: {
          mesaj: "The shelves stayed empty but you became a symbol of the Market Union. The tradesmen hold you in great respect.",
          detay: "You bled your wallet for your principles.",
        },
        basarisizSonuc: {
          mesaj: "The boycott didn't work! The Harbor Guild broke it. You took losses for nothing.",
          detay: "Idealism doesn't fill a belly.",
        },
      },
      {
        metin: "Secretly keep buying goods from the harbor.",
        basariliSonuc: {
          mesaj: "Your shelves were full and with the boycott on, you had a monopoly. You earned a lot.",
          detay: "Betrayal can bear sweet fruit.",
        },
        basarisizSonuc: {
          mesaj: "The market tradesmen learned of your betrayal! At night they stoned your shop and burned your goods.",
          detay: "The tradesmen's anger is far more merciless than the nobles'.",
        },
      },
    ],
  },

  hizip_pazar_birligi_genc_girisimciler: {
    baslik: "Young Entrepreneurs",
    metin:
      "The young entrepreneurs within the Union see you as a role model and want mentoring from you.",
    secenekler: [
      {
        metin: "Accept the mentoring.",
        basariliSonuc: {
          mesaj: "You guided the young entrepreneurs, you won respect.",
          detay: "Sharing your knowledge enriched you too.",
        },
        basarisizSonuc: {
          mesaj: "The mentoring took time, your own business suffered.",
          detay: "Every kindness can carry a price.",
        },
      },
      {
        metin: "Politely refuse, focus on your own business.",
        basariliSonuc: {
          mesaj: "You refused, you spent that time on your own business.",
          detay: "You don't have to make time for everyone.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal disappointed some of the young people.",
          detay: "Every no carries a small disappointment.",
        },
      },
    ],
  },

  hizip_pazar_birligi_resmi_baski: {
    baslik: "The Shadow of the Authorities",
    metin:
      "The authorities accused the Market Union of disturbing the order and started investigating its members. Your turn could come too.",
    secenekler: [
      {
        metin: "Hide, don't show your face.",
        basariliSonuc: {
          mesaj: "You kept out of sight for a while, the investigation passed you by.",
          detay: "Patience is sometimes the best defense.",
        },
        basarisizSonuc: {
          mesaj: "Your hiding was noticed, you paid a light fine.",
          detay: "Hiding doesn't always work.",
        },
      },
      {
        metin: "Show open resistance.",
        basariliSonuc: {
          mesaj: "Your resistance made you a symbol within the Union.",
          detay: "Your courage was repaid.",
        },
        basarisizSonuc: {
          mesaj: "You paid heavily for your resistance; your goods were seized and you were briefly detained.",
          detay: "Every resistance demands a price.",
        },
      },
    ],
  },

  hizip_pazar_birligi_eski_dost_ikna: {
    baslik: "An Old Friend's Call",
    metin:
      "An old friend in the Harbor Guild is trying to persuade you to go back to the old order.",
    secenekler: [
      {
        metin: "Politely refuse, go your own way.",
        basariliSonuc: {
          mesaj: "You refused politely; your friendship wasn't damaged.",
          detay: "Resolve doesn't have to break a friendship.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal saddened your friend a little.",
          detay: "Every no can leave a mark.",
        },
      },
      {
        metin: "Take his offer seriously, think it over.",
        basariliSonuc: {
          mesaj: "Thinking it over won you some time and a small offer.",
          detay: "Being open-minded sometimes pays off.",
        },
        basarisizSonuc: {
          mesaj: "Your hesitation was noticed within the Union, your loyalty was questioned.",
          detay: "Indecision has a price.",
        },
      },
    ],
  },

  hizip_pazar_birligi_ortak_depo: {
    baslik: "A Common Warehouse Venture",
    metin:
      "The Union is discussing setting up a common warehouse to buy in bulk the large orders small tradesmen can't afford alone. Contributing will be hard but the returns could be great.",
    secenekler: [
      {
        metin: "Pay your share, join the common warehouse.",
        basariliSonuc: {
          mesaj: "The common warehouse was set up; you're not alone on big orders anymore.",
          detay: "Acting together gives small tradesmen the strength to compete with the big ones.",
        },
        basarisizSonuc: {
          mesaj: "The warehouse was set up but its management isn't running as efficiently as you'd hoped.",
          detay: "Joint ventures don't always run smoothly.",
        },
      },
      {
        metin: "Don't join, you're enough on your own.",
        basariliSonuc: {
          mesaj: "You didn't join; you kept your independence.",
          detay: "Acting alone always brings freedom, not power.",
        },
        basarisizSonuc: {
          mesaj: "Your not joining was read within the Union as 'selfish'.",
          detay: "Individualism sometimes comes at the price of solidarity.",
        },
      },
    ],
  },

  hizip_pazar_birligi_serbest_pazar: {
    baslik: "A Call for a Free Market",
    metin:
      "The Market Union plans to hold an unauthorized market day, ignoring the guild's rules. Joining is risky but could be profitable.",
    secenekler: [
      {
        metin: "Join enthusiastically, set up your stall.",
        basariliSonuc: {
          mesaj: "The market drew great interest, your goods sold out fast.",
          detay: "Sometimes breaking the rules is the most profitable thing.",
        },
        basarisizSonuc: {
          mesaj: "The guild guards raided the market, your goods were seized.",
          detay: "Every rebellion has a price.",
        },
      },
      {
        metin: "Give support but don't open a stall, be cautious.",
        basariliSonuc: {
          mesaj: "You gave support, became part of the movement without taking a risk.",
          detay: "Sometimes pushing from behind is a contribution too.",
        },
        basarisizSonuc: {
          mesaj: "You stayed cautious but some read it as 'lack of courage'.",
          detay: "Not every caution is appreciated.",
        },
      },
    ],
  },

  hizip_pazar_birligi_lonca_casusu: {
    baslik: "A Spy Among Us",
    metin:
      "It's suspected that someone in the Market Union is leaking information to the Harbor Guild. Suspicion is focusing on a friend of yours.",
    secenekler: [
      {
        metin: "Interrogate your friend, learn the truth.",
        basariliSonuc: {
          mesaj: "The real spy was someone else, you cleared up the misunderstanding with your friend.",
          detay: "Suspicion sometimes wounds even those closest to you.",
        },
        basarisizSonuc: {
          mesaj: "Your interrogation deeply hurt your friend, things stayed cold between you for a long time.",
          detay: "Some questions were better left unasked.",
        },
      },
      {
        metin: "Quietly do your own investigation.",
        basariliSonuc: {
          mesaj: "You quietly identified the real spy and reported it to the union, no one was hurt.",
          detay: "A patient investigation is usually the best way.",
        },
        basarisizSonuc: {
          mesaj: "Your investigation came to nothing, the suspicions still hang in the air.",
          detay: "Not every mystery is solved.",
        },
      },
    ],
  },

  hizip_pazar_birligi_halka_acik_fiyat: {
    baslik: "Announcing the Prices to the People",
    metin:
      "The Market Union wants to announce to the people the price agreements the guild keeps secret. This could make you a hero in the people's eyes or win you powerful enemies.",
    secenekler: [
      {
        metin: "Announce the prices loudly in the square.",
        basariliSonuc: {
          mesaj: "The people cheered you, called you 'a true merchant of the people'.",
          detay: "Your courage turned you into a figure.",
        },
        basarisizSonuc: {
          mesaj: "The guild threatened to sue you, you lost a few customers.",
          detay: "Challenging the powerful comes at a heavy price.",
        },
      },
      {
        metin: "Whisper the information only to those you trust.",
        basariliSonuc: {
          mesaj: "The information spread quietly, you reached your goal without taking a risk.",
          detay: "Sometimes a whisper is more effective than a shout.",
        },
        basarisizSonuc: {
          mesaj: "Your whisper didn't spread much, it didn't have the effect you expected.",
          detay: "Not every whisper is heard.",
        },
      },
    ],
  },

  hizip_pazar_birligi_genc_ortaklik: {
    baslik: "A Young Partnership Offer",
    metin:
      "An ambitious young merchant wants to form a partnership with you and open a new market. His ideas are bold but inexperienced.",
    secenekler: [
      {
        metin: "Accept the offer, share the risk.",
        basariliSonuc: {
          mesaj: "Your partnership caught on unexpectedly, you both profited.",
          detay: "Sometimes the greatest opportunities are born of the youngest ideas.",
        },
        basarisizSonuc: {
          mesaj: "The venture collapsed, inexperience cost dearly.",
          detay: "Not every bold idea succeeds.",
        },
      },
      {
        metin: "Politely refuse, suggest he gain experience first.",
        basariliSonuc: {
          mesaj: "The young merchant appreciated your advice, said he'd come back later.",
          detay: "Sometimes the best help is saying no.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal hurt him, he didn't want to work with you again.",
          detay: "Not every rejection is taken kindly.",
        },
      },
    ],
  },

  "hizip_gelenekciler_ritüel_koruma": {
    baslik: "The Old Rituals",
    metin:
      "The Traditionalists want you to preserve a centuries-old ritual exactly as it is; some young people find it outdated.",
    secenekler: [
      {
        metin: "Perform the ritual exactly as it is.",
        basariliSonuc: {
          mesaj: "You performed the ritual meticulously; the old congregation members appreciated it.",
          detay: "Loyalty to tradition earns respect.",
        },
        basarisizSonuc: {
          mesaj: "You made a small mistake in the ritual, some of the elders noticed.",
          detay: "Tradition demands meticulousness.",
        },
      },
      {
        metin: "Simplify the ritual a little.",
        basariliSonuc: {
          mesaj: "Your simplification was liked by the young people.",
          detay: "Small changes sometimes build a bridge.",
        },
        basarisizSonuc: {
          mesaj: "Your simplification drew a backlash among the Traditionalists.",
          detay: "Changing tradition is risky.",
        },
      },
    ],
  },

  hizip_gelenekciler_sapkinlik_suclamasi: {
    baslik: "An Accusation of Heresy",
    metin:
      "A Reformist preacher is accused of heresy; the Traditionalists expect you to join this accusation too.",
    secenekler: [
      {
        metin: "Join the accusation.",
        basariliSonuc: {
          mesaj: "You joined the accusation; your standing among the Traditionalists rose.",
          detay: "But it left a weight on your conscience.",
        },
        basarisizSonuc: {
          mesaj: "Your accusation was found harsh, some congregation members were uneasy.",
          detay: "Harshness doesn't always have the intended effect.",
        },
      },
      {
        metin: "Stay silent, don't get involved.",
        basariliSonuc: {
          mesaj: "You stayed silent; your conscience is at ease but some Traditionalists accused you of inadequate loyalty.",
          detay: "Neutrality isn't always rewarded.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was read as weakness.",
          detay: "Some silences are misunderstood.",
        },
      },
    ],
  },

  hizip_gelenekciler_otorite_mucadelesi: {
    baslik: "A Struggle for Authority",
    metin:
      "A dispute grew within the Traditionalists over who has more authority. You're asked to take a side.",
    secenekler: [
      {
        metin: "Support the most senior member.",
        basariliSonuc: {
          mesaj: "Supporting the senior was found fitting for tradition.",
          detay: "Respect for hierarchy is appreciated.",
        },
        basarisizSonuc: {
          mesaj: "Your support was counted by some as sycophancy.",
          detay: "Not every act of support is perceived the same way.",
        },
      },
      {
        metin: "Stay neutral.",
        basariliSonuc: {
          mesaj: "You stayed neutral; no one blamed you.",
          detay: "Sometimes the safest way is taking no side.",
        },
        basarisizSonuc: {
          mesaj: "Your neutrality was seen as indecision.",
          detay: "Not every neutrality is met with understanding.",
        },
      },
    ],
  },

  hizip_gelenekciler_kati_algisi: {
    baslik: "Are You a Rigid One?",
    metin:
      "A part of the people finds you too rigid; some have started to drift away from you.",
    secenekler: [
      {
        metin: "Hold your stance, make no explanation.",
        basariliSonuc: {
          mesaj: "You held your stance; the Traditionalists appreciated you.",
          detay: "Resolve is sometimes enough.",
        },
        basarisizSonuc: {
          mesaj: "Your silence drove some congregation members even further away.",
          detay: "Not every silence is understood.",
        },
      },
      {
        metin: "Give a soft explanation.",
        basariliSonuc: {
          mesaj: "Your explanation softened some people's view.",
          detay: "A small effort sometimes builds a bridge.",
        },
        basarisizSonuc: {
          mesaj: "Your explanation was criticized among the Traditionalists as 'softness'.",
          detay: "Not every explanation is appreciated.",
        },
      },
    ],
  },

  hizip_gelenekciler_uzlasma_teklifi: {
    baslik: "A Secret Reconciliation Offer",
    metin:
      "One of the Reformists secretly contacted you, wanting to build a bridge of reconciliation between the two groups.",
    secenekler: [
      {
        metin: "Accept the offer, try to build a bridge.",
        basariliSonuc: {
          mesaj: "Your reconciliation attempt was a small but real step.",
          detay: "Building a bridge takes courage.",
        },
        basarisizSonuc: {
          mesaj: "Your attempt wasn't welcomed among the Traditionalists.",
          detay: "Not every effort at reconciliation is understood.",
        },
      },
      {
        metin: "Refuse the offer, keep your purity.",
        basariliSonuc: {
          mesaj: "You refused; your position among the Traditionalists grew stronger.",
          detay: "Clarity is sometimes the safest way.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal closed off the chance to build a bridge.",
          detay: "Not every chance comes again.",
        },
      },
    ],
  },

  hizip_gelenekciler_eski_metinler_bekcisi: {
    baslik: "Keeper of the Old Texts",
    metin:
      "One of the monastery's oldest manuscripts is starting to decay. Recopying it will take days, but preserving the sanctity of the text is very important to the Traditionalists.",
    secenekler: [
      {
        metin: "Devote your days to it and copy it meticulously.",
        basariliSonuc: {
          mesaj: "The text you copied was flawless, the congregation remembered you as 'a true keeper'.",
          detay: "Some labor is measured in patience.",
        },
        basarisizSonuc: {
          mesaj: "Days of bent-over work wore out your back, and you made a few mistakes too.",
          detay: "Not every labor gives a flawless result.",
        },
      },
      {
        metin: "Hand it to an apprentice, just supervise.",
        basariliSonuc: {
          mesaj: "The apprentice handled it well, and your time wasn't wasted either.",
          detay: "Sometimes delegating a task is a wisdom too.",
        },
        basarisizSonuc: {
          mesaj: "The apprentice made a few serious mistakes, part of the text was copied wrong.",
          detay: "Delegated responsibility sometimes backfires.",
        },
      },
    ],
  },

  hizip_gelenekciler_cemaat_yaslilari: {
    baslik: "The Council of Elders",
    metin:
      "The oldest members of the congregation summoned you to their council. They'll ask you questions about an old rite — your answers will prove your loyalty.",
    secenekler: [
      {
        metin: "Repeat the traditional answers to the letter.",
        basariliSonuc: {
          mesaj: "The elders were pleased, confirmed you were 'a true Traditionalist'.",
          detay: "Sometimes loyalty is measured not by rote but by sincerity.",
        },
        basarisizSonuc: {
          mesaj: "You misremembered a few details, the elders were disappointed.",
          detay: "Tradition doesn't forgive forgetfulness.",
        },
      },
      {
        metin: "Answer with your own interpretation added.",
        basariliSonuc: {
          mesaj: "Your interpretation impressed some of the elders, 'this young one thinks,' they said with appreciation.",
          detay: "Tradition is sometimes strengthened by a fresh look.",
        },
        basarisizSonuc: {
          mesaj: "Your interpretation was counted as insolence, you were called 'presumptuous'.",
          detay: "Not every innovation is welcomed within tradition.",
        },
      },
    ],
  },

  hizip_gelenekciler_kutsal_emanet_nakli: {
    baslik: "The Journey of the Holy Relic",
    metin:
      "You were tasked with carrying a valuable holy relic along a dangerous road to another holy site. There could be bandits along the way.",
    secenekler: [
      {
        metin: "Go quickly by the main road.",
        basariliSonuc: {
          mesaj: "You delivered the relic safely, the congregation will tell of this journey for years.",
          detay: "Courage is sometimes the shortest way.",
        },
        basarisizSonuc: {
          mesaj: "Bandits attacked you, you were beaten and robbed but the relic stayed in your hands.",
          detay: "What is holy is sometimes protected at the price of the body.",
        },
      },
      {
        metin: "Take a long but safe roundabout road.",
        basariliSonuc: {
          mesaj: "You arrived quietly, without danger.",
          detay: "Patience is sometimes the wisest way.",
        },
        basarisizSonuc: {
          mesaj: "The long journey wore you out, your delay worried the congregation.",
          detay: "Safety sometimes steals from time.",
        },
      },
    ],
  },

  hizip_gelenekciler_yenilikci_vaaz_engelleme: {
    baslik: "A Dangerous Sermon",
    metin:
      "One of the Reformists plans to give a sermon before the congregation that will shake tradition. The Traditionalists want you to prevent it.",
    secenekler: [
      {
        metin: "Tell the people the truth before the sermon, discredit him.",
        basariliSonuc: {
          mesaj: "Your speech was effective, the sermon passed without drawing interest.",
          detay: "Words are sometimes the sharpest shield.",
        },
        basarisizSonuc: {
          mesaj: "Your attempt backfired, you were called 'coward' and 'obstructionist'.",
          detay: "Every intervention can produce the opposite result.",
        },
      },
      {
        metin: "Don't get involved, let the ideas be judged on their own.",
        basariliSonuc: {
          mesaj: "You didn't get involved, the congregation made its own decision.",
          detay: "Sometimes the wisest reaction is silence.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was seen by some Traditionalists as 'indifference'.",
          detay: "Not every neutrality is appreciated.",
        },
      },
    ],
  },

  hizip_yenilikciler_yeni_yorum: {
    baslik: "A New Interpretation",
    metin:
      "The Reformists are preparing a new interpretation/translation of the holy texts; they expect support and contribution from you.",
    secenekler: [
      {
        metin: "Contribute actively to the work.",
        basariliSonuc: {
          mesaj: "Your contribution enriched the work; your name stood out among the Reformists.",
          detay: "Your labor was repaid.",
        },
        basarisizSonuc: {
          mesaj: "The work turned out harder than expected, it wore you down.",
          detay: "Not every contribution is easy.",
        },
      },
      {
        metin: "Support it from a distance, don't get too involved.",
        basariliSonuc: {
          mesaj: "Your measured support was found sufficient.",
          detay: "Not every contribution has to be big.",
        },
        basarisizSonuc: {
          mesaj: "Your distant stance disappointed some.",
          detay: "Not every distance is understood.",
        },
      },
    ],
  },

  hizip_yenilikciler_sapkinlik_suclamasi: {
    baslik: "Accused of Heresy",
    metin:
      "The Traditionalists openly accused you of heresy. This could seriously shake your position within the congregation.",
    secenekler: [
      {
        metin: "Defend yourself openly.",
        basariliSonuc: {
          mesaj: "Your defense was convincing; the accusation was largely rendered ineffective.",
          detay: "A brave defense strengthened you.",
        },
        basarisizSonuc: {
          mesaj: "Your defense wasn't found convincing enough, your reputation was shaken.",
          detay: "Not every defense succeeds.",
        },
      },
      {
        metin: "Stay silent, wait for the storm to pass.",
        basariliSonuc: {
          mesaj: "Your silence lessened the impact of the accusation over time.",
          detay: "Sometimes time is the best defense.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was read as accepting the accusation.",
          detay: "Every silence can be misunderstood.",
        },
      },
    ],
  },

  hizip_yenilikciler_fikir_ayriligi: {
    baslik: "A Disagreement Within the Group",
    metin:
      "Even within the Reformists there's a disagreement over how far to go. Will you be measured or radical?",
    secenekler: [
      {
        metin: "Argue for measured change.",
        basariliSonuc: {
          mesaj: "Your measured stance was embraced by the majority.",
          detay: "Balance is sometimes the strongest stance.",
        },
        basarisizSonuc: {
          mesaj: "Your measured stance disappointed some radical members.",
          detay: "Not every moderation is appreciated.",
        },
      },
      {
        metin: "Argue for radical change.",
        basariliSonuc: {
          mesaj: "Your radical stance excited some, your name stood out.",
          detay: "Courage sometimes draws attention.",
        },
        basarisizSonuc: {
          mesaj: "Your radical stance scared the measured members, the split within the group deepened.",
          detay: "Every radicalism can be divisive.",
        },
      },
    ],
  },

  hizip_yenilikciler_halk_algisi: {
    baslik: "Are You a Pioneer?",
    metin:
      "A part of the people sees you as a bold pioneer, another part finds you untrustworthy.",
    secenekler: [
      {
        metin: "Spend time with the pioneers, draw inspiration.",
        basariliSonuc: {
          mesaj: "The time you spent with your supporters strengthened you.",
          detay: "Inspiration sometimes comes from a simple conversation.",
        },
        basarisizSonuc: {
          mesaj: "Even among your supporters there were disagreements.",
          detay: "No group is in perfect harmony.",
        },
      },
      {
        metin: "Talk with the skeptics, try to understand them.",
        basariliSonuc: {
          mesaj: "Your talk softened some skeptics' view.",
          detay: "Trying to understand builds a bridge.",
        },
        basarisizSonuc: {
          mesaj: "The talk grew tense, it wore you down even more.",
          detay: "Not every dialogue is easy.",
        },
      },
    ],
  },

  hizip_yenilikciler_susturma_girisimi: {
    baslik: "An Attempt to Silence You",
    metin:
      "The authorities think voices like yours have grown too loud and are trying to silence you.",
    secenekler: [
      {
        metin: "Keep raising your voice.",
        basariliSonuc: {
          mesaj: "You kept raising your voice; this courage turned you into a symbol.",
          detay: "Some prices are paid by saying what needs to be said.",
        },
        basarisizSonuc: {
          mesaj: "The authorities temporarily removed you from your post.",
          detay: "Your courage had a price.",
        },
      },
      {
        metin: "Pull back for a while.",
        basariliSonuc: {
          mesaj: "Pulling back let you ride out the storm.",
          detay: "Sometimes a strategic silence ensures survival.",
        },
        basarisizSonuc: {
          mesaj: "Your pulling back disappointed some of your supporters.",
          detay: "Not every retreat is understood.",
        },
      },
    ],
  },

  hizip_yenilikciler_halka_acik_tartisma: {
    baslik: "A Debate in the Square",
    metin:
      "A Traditionalist invited you to an open debate before the people in the square. If you win, the Reformists' voice grows stronger.",
    secenekler: [
      {
        metin: "Accept the invitation, prepare and take the square.",
        basariliSonuc: {
          mesaj: "You won the debate skillfully, the people cheered you.",
          detay: "Your ideas echo in more ears now.",
        },
        basarisizSonuc: {
          mesaj: "Your rival backed you into a corner, you took an embarrassing defeat before the people.",
          detay: "Not every challenge ends in victory.",
        },
      },
      {
        metin: "Politely refuse, say you don't have time.",
        basariliSonuc: {
          mesaj: "You refused the invitation, no one made much of it.",
          detay: "Not every battle is fought in the square.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was read as 'he's afraid', some of your supporters were disappointed.",
          detay: "Pulling back is sometimes mistaken for weakness.",
        },
      },
    ],
  },

  hizip_yenilikciler_yeni_nesil_sorulari: {
    baslik: "The Young People's Hard Questions",
    metin:
      "A group of young people backs you into a corner with hard, unsettling questions about faith. Your answers could shape their future.",
    secenekler: [
      {
        metin: "Give honest, open and bold answers.",
        basariliSonuc: {
          mesaj: "Your honesty deeply moved the young people, they grew even more attached to you.",
          detay: "Real answers are sometimes the hardest ones.",
        },
        basarisizSonuc: {
          mesaj: "Some of your answers stirred up debate, some parents complained.",
          detay: "Honesty sometimes brings unease too.",
        },
      },
      {
        metin: "Get by with traditional, safe answers.",
        basariliSonuc: {
          mesaj: "The questions were quietly brushed aside, no one was offended.",
          detay: "Sometimes the safe way is a way too.",
        },
        basarisizSonuc: {
          mesaj: "The young people found your answers inadequate, 'is he one of them too,' they said in disappointment.",
          detay: "Avoidance sometimes breaks trust.",
        },
      },
    ],
  },

  hizip_yenilikciler_itham_mektubu: {
    baslik: "A Harsh Letter of Accusation",
    metin:
      "The Traditionalists sent an official letter to the higher authorities accusing you of 'heresy'. You need to respond to it.",
    secenekler: [
      {
        metin: "Write a firm, resolute response, defend your ideas.",
        basariliSonuc: {
          mesaj: "Your response convinced the authorities, the accusations were dropped.",
          detay: "An idea defended with courage is sometimes the strongest.",
        },
        basarisizSonuc: {
          mesaj: "Your response was found inadequate, you were put under surveillance for a while.",
          detay: "Not every defense ends in success.",
        },
      },
      {
        metin: "Write a soft, conciliatory response.",
        basariliSonuc: {
          mesaj: "Your response calmed the tension, the accusation quietly closed.",
          detay: "Sometimes softness is the strongest shield.",
        },
        basarisizSonuc: {
          mesaj: "Some Reformists saw your soft stance as 'surrender'.",
          detay: "Compromise sometimes brings criticism from your own side.",
        },
      },
    ],
  },

  hizip_yenilikciler_reform_vaazi_kursusu: {
    baslik: "The Pulpit Is Yours",
    metin:
      "It's your turn to take the pulpit on the day of the great service. This is a rare chance to tell the Reformists' ideas directly to a large congregation.",
    secenekler: [
      {
        metin: "Boldly tell the reform ideas directly.",
        basariliSonuc: {
          mesaj: "Your sermon deeply moved the congregation, many people came over to your side.",
          detay: "What you said today will be remembered for many years.",
        },
        basarisizSonuc: {
          mesaj: "Part of the congregation found the sermon harsh, they left in unease.",
          detay: "Not every bold word is met with the same warmth.",
        },
      },
      {
        metin: "Tell your ideas in a measured, indirect way.",
        basariliSonuc: {
          mesaj: "Your sermon was accepted, you managed to plant your ideas without scaring anyone.",
          detay: "Sometimes a seed is planted quietly.",
        },
        basarisizSonuc: {
          mesaj: "Your sermon was found too vague, the message didn't quite land.",
          detay: "Not every indirect telling is understood.",
        },
      },
    ],
  },

  hizip_eski_muhafizlar_sahin_haberci: {
    baslik: "The King's Secret Message",
    metin:
      "The general at the head of the Old Guard wants a message secretly carried to the besieged allied fortress. The roads are full of enemy patrols; a trustworthy person is needed to carry the message.",
    secenekler: [
      {
        metin: "Tie the message to {hayvan}'s leg and send it.",
        kilitAciklamasi: "For this you need a trained falcon.",
        basariliSonuc: {
          mesaj: "{hayvan} soared over the enemy lines and delivered the message in time. The general spoke your name with praise.",
          detay: "A winged friend proved more reliable than the best spy.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Go yourself, try to slip through under cover of night.",
        basariliSonuc: {
          mesaj: "You skillfully dodged the patrols and delivered the message yourself; your name became a legend among the soldiers.",
          detay: "Some heroics deserve to be done in person.",
        },
        basarisizSonuc: {
          mesaj: "You were caught by a patrol, barely escaped; the message never got through.",
          detay: "Your courage wasn't enough this time.",
        },
      },
      {
        metin: "Refuse the mission, find it too risky.",
        basariliSonuc: {
          mesaj: "You turned the mission down; the general scowled and assigned someone else.",
          detay: "Missing some opportunities carries a price too.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal got you called a 'coward' within the faction.",
          detay: "Every no leaves a mark.",
        },
      },
    ],
  },

  hizip_yeni_nizam_kilic_gosterisi: {
    baslik: "The New Order's Show",
    metin:
      "To prove its power to the people, the New Order is holding a grand duel in the square: a young reform-minded officer will challenge the old order's best swordsman. You are that officer.",
    secenekler: [
      {
        metin: "Gird on your Black Sword, win the duel skillfully.",
        kilitAciklamasi: "For this you need a legendary weapon.",
        basariliSonuc: {
          mesaj: "The Black Sword danced in your hand almost of its own accord; your opponent dropped his weapon at the first strike. The square erupted in cheers.",
          detay: "You became the New Order's brightest star.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Fight with your own sword, like an ordinary soldier.",
        basariliSonuc: {
          mesaj: "After a hard duel you beat your opponent; the people declared you the symbol of the new order.",
          detay: "The gain came by the sweat of your brow.",
        },
        basarisizSonuc: {
          mesaj: "The experienced master beat you; the New Order was humiliated in the square.",
          detay: "Not every show ends in victory.",
        },
      },
      {
        metin: "Withdraw from the duel on the pretext of an injury.",
        basariliSonuc: {
          mesaj: "You withdrew; the others in the faction couldn't hide their disappointment in you.",
          detay: "Some escapes leave a mark.",
        },
        basarisizSonuc: {
          mesaj: "It came out that the pretext was a lie, you were humiliated openly.",
          detay: "Lies usually come to light.",
        },
      },
    ],
  },

  hizip_liman_loncasi_kedi_ambar: {
    baslik: "A Danger Gnawing the Storehouse",
    metin:
      "Rats have infested the Harbor Guild's great grain storehouse; the whole stock could rot within a few weeks. The guild masters want a fast and cheap solution.",
    secenekler: [
      {
        metin: "Let {hayvan} loose in the storehouse, leave the work to nature.",
        kilitAciklamasi: "For this you need a master rat-hunter.",
        basariliSonuc: {
          mesaj: "{hayvan} cleared the storehouse of rats in a week; the guild masters keep talking about your 'cheap genius'.",
          detay: "Your cat became the whole guild's favorite.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Hire expensive rat-hunters and traps.",
        basariliSonuc: {
          mesaj: "The hired hunters handled it in a few days; the stock was saved but your purse shrank noticeably.",
          detay: "Some solutions come at a price.",
        },
        basarisizSonuc: {
          mesaj: "The hunters came but the rats were faster; you had both the expense and the loss of stock.",
          detay: "Not every investment works.",
        },
      },
      {
        metin: "Ignore it, write off part of the stock as a loss.",
        basariliSonuc: {
          mesaj: "The rats ate until they were full; the loss came out of your pocket but at least you didn't have to deal with it.",
          detay: "Sometimes doing nothing pays a price too.",
        },
        basarisizSonuc: {
          mesaj: "The loss was much bigger than expected; the guild criticized you as 'indifferent'.",
          detay: "Ignoring things rarely comes cheap.",
        },
      },
    ],
  },

  hizip_pazar_birligi_sikke_bahsi: {
    baslik: "A Bet for the Tradesmen's Honor",
    metin:
      "The Market Union has entered a big bet with the rival guild's arrogant representative for the tradesmen's honor: whoever makes more profit will pay for the repair of the old fountain in the neighborhood. The Union's eyes are on you.",
    secenekler: [
      {
        metin: "Secretly use the Shadow Coin, turn fate in your favor.",
        kilitAciklamasi: "For this you need a mysterious coin.",
        basariliSonuc: {
          mesaj: "The coin seemed to wink at you; your luck turned incredibly and you left the rival guild behind by a crushing margin.",
          detay: "The victory is sweet but only you know how you won it.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Compete honestly, with your usual trading skill.",
        basariliSonuc: {
          mesaj: "After a hard competition you honored the Union; the fountain went to the rival guild but the pride is yours.",
          detay: "An honest victory is always sweeter.",
        },
        basarisizSonuc: {
          mesaj: "The rival guild left you behind; you lost a bit of standing within the Union.",
          detay: "Not every competition is won.",
        },
      },
      {
        metin: "Pull out of the bet, don't care so much about honor.",
        basariliSonuc: {
          mesaj: "You pulled out; the Union members whispered behind your back but at least you took no risk.",
          detay: "Not entering some battles is a choice too.",
        },
        basarisizSonuc: {
          mesaj: "Your pulling out was read as 'cowardice', your respected position within the Union was shaken.",
          detay: "Not every step back is read the same way.",
        },
      },
    ],
  },

  hizip_gelenekciler_kalinti_vaazi: {
    baslik: "A Sermon Against the Skeptics",
    metin:
      "The Traditionalists want you to hold a great sermon to quell the growing skepticism within the congregation. The square will be packed; you need to prove your faith in the strongest way.",
    secenekler: [
      {
        metin: "Show the Holy Relic to the congregation.",
        kilitAciklamasi: "For this you need a holy relic.",
        basariliSonuc: {
          mesaj: "The moment you raised the relic high, a silence fell over the square; even the skeptics knelt.",
          detay: "Some proofs are stronger than a thousand sermons.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Rely on strong oratory alone, trust your words.",
        basariliSonuc: {
          mesaj: "Your words touched the congregation's hearts; even the skeptics applauded.",
          detay: "Sometimes the strongest proof is faith itself.",
        },
        basarisizSonuc: {
          mesaj: "Your sermon didn't have the expected effect; the skeptics grew even bolder.",
          detay: "Not every oration conquers the square.",
        },
      },
      {
        metin: "Postpone the sermon, avoid going in unprepared.",
        basariliSonuc: {
          mesaj: "The sermon was postponed; the congregation took it with understanding but the skeptics spoke freely for another week.",
          detay: "Some postponements don't come cheap.",
        },
        basarisizSonuc: {
          mesaj: "The postponement was read as 'indecision', your standing among the Traditionalists was shaken.",
          detay: "Leadership is sometimes tested moment by moment.",
        },
      },
    ],
  },

  hizip_yenilikciler_papagan_mucizesi: {
    baslik: "A 'Sign' for the New Congregation",
    metin:
      "The Reformists want to draw new followers with fervor instead of dogma. Someone whispered to you how hearing 'a heavenly voice' before the crowd would set faith ablaze.",
    secenekler: [
      {
        metin: "Secretly place {hayvan} behind the pulpit and have it mimic holy words.",
        kilitAciklamasi: "For this you need a trained, mimicking bird.",
        basariliSonuc: {
          mesaj: "The 'heavenly voice' rising from behind the pulpit made the crowd weep; new followers flocked in.",
          detay: "The believers rejoiced, and you carry the truth alone.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} blurted out something completely different at the wrong moment! The crowd was surprised at first, then scattered laughing.",
          detay: "Fake miracles sometimes give themselves away.",
        },
      },
      {
        metin: "Create fervor with a sincere, honest sermon only.",
        basariliSonuc: {
          mesaj: "Your sincere words won a few new followers; the growth is slow but solid.",
          detay: "An honest seed takes root, slowly as it may.",
        },
        basarisizSonuc: {
          mesaj: "Your sermon drew no interest, the crowd dispersed.",
          detay: "Inspiration doesn't come every day.",
        },
      },
      {
        metin: "Reject the idea, don't take part in the show at all.",
        basariliSonuc: {
          mesaj: "You rejected the idea; though some Reformists found you 'too conservative', your conscience is at ease.",
          detay: "Some lines need to be drawn.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was read as 'lack of courage', the young wing of the faction grew distant from you.",
          detay: "Every principle can carry a price.",
        },
      },
    ],
  },
};
