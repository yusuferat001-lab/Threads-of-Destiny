import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiDinAdami.ts — İngilizce çevirileri. */
export const OLAYLAR_SANAYI_DINADAMI_EN: Record<string, OlayCeviri> = {
  sd_din_fabrika_vaazi: {
    baslik: "The Factory Owner's Request",
    metin:
      "The largest factory owner in the region offers your congregation a generous donation — in return he wants you to preach obedience and no-strikes to the workers from the pulpit.",
    secenekler: [
      {
        metin: "Accept the donation, give the sermon he asked for.",
        basariliSonuc: {
          mesaj:
            "The sermon pleased the factory owner; the church coffer filled, but whispers began among the worker members of your flock.",
          detay: "Your conscience pays the price of some donations.",
        },
        basarisizSonuc: {
          mesaj: "You took the donation, but the workers saw at once that the sermon had been 'bought'.",
          detay: "The truth cannot be hidden even from the pulpit.",
        },
      },
      {
        metin: "Refuse the donation, preach on the side of the workers.",
        basariliSonuc: {
          mesaj:
            "Your sermon declaring you stood with the workers moved them deeply; the factory owner never called on you again.",
          detay: "Some riches are worth refusing.",
        },
        basarisizSonuc: {
          mesaj:
            "The factory owner took offense and cut off even his small donations; the church budget tightened, but your standing rose.",
          detay: "The price of doing right sometimes comes out of the coffer.",
        },
      },
    ],
  },

  sd_din_bilim_karsitligi: {
    baslik: "Science at the Pulpit",
    metin:
      "A naturalist who has come to the city is giving a lecture on evolution in the square right beside the church; part of your congregation is furious, the others are curious. A stance is expected of you.",
    secenekler: [
      {
        metin: "Condemn it sharply from the pulpit and warn the congregation.",
        basariliSonuc: {
          mesaj:
            "Your fierce sermon roused the traditionalist congregation; those interested in the scientist never listened to you again.",
          detay: "Some pulpits burn bridges.",
        },
        basarisizSonuc: {
          mesaj: "The harshness of your words backfired; the young congregation criticized you as 'behind the times'.",
          detay: "Anger does not always create the effect you want.",
        },
      },
      {
        metin: "Enter a respectful dialogue with the scientist, listen and debate.",
        basariliSonuc: {
          mesaj: "The conversation was respectful and thoughtful; you each learned something from the other.",
          detay: "Some bridges should be built rather than torn down.",
        },
        basarisizSonuc: {
          mesaj: "Your dialogue was read as 'weakness'; some congregation members left you.",
          detay: "Open-mindedness is not always rewarded.",
        },
      },
    ],
  },

  sd_din_cocuk_isci_vicdani: {
    baslik: "The Children Among the Machines",
    metin:
      "You visited the factory of a wealthy donor; among the machines you saw children of eight and nine at work. The donor defends himself, saying, 'without them, their families would starve.'",
    secenekler: [
      {
        metin: "Report the situation to the authorities, try to protect the children.",
        basariliSonuc: {
          mesaj:
            "Your report shortened some children's working hours; the donor angrily cut his ties with the church.",
          detay: "Some victories are small but real.",
        },
        basarisizSonuc: {
          mesaj: "Your report changed nothing, and on top of that you lost the donor.",
          detay: "Sometimes doing the right thing fixes nothing — it only eases the conscience.",
        },
      },
      {
        metin: "Stay silent, don't cut off the donations.",
        basariliSonuc: {
          mesaj:
            "You stayed silent; the donations kept flowing, but those children's eyes still won't leave your mind.",
          detay: "Some silences gnaw at you for years.",
        },
        basarisizSonuc: {
          mesaj: "A journalist found out about your silence; it was written up as 'he saw but said nothing'.",
          detay: "The voice of your conscience is sometimes heard through someone else's pen.",
        },
      },
    ],
  },

  sd_din_ruhban_karsiti_gosteri: {
    baslik: "The Crowd at the Church Door",
    metin:
      "A socialist group gathered outside the church and staged a demonstration comparing the church's wealth with the people's hunger. One of them opened the door and shouted, 'share your riches.'",
    secenekler: [
      {
        metin: "Open the doors, share the church's resources with the people.",
        basariliSonuc: {
          mesaj:
            "You opened the doors; the church turned soup kitchen was talked about for weeks; in the people's eyes you became a saint.",
          detay: "Some doors, once open, never close the same way again.",
        },
        basarisizSonuc: {
          mesaj: "The resources ran out fast and there was chaos, but everyone understood your intent.",
          detay: "Good intentions sometimes end in disorder.",
        },
      },
      {
        metin: "Call the guards, disperse the demonstration.",
        basariliSonuc: {
          mesaj:
            "The guards dispersed the crowd; the church calmed, but in the streets your name became 'the priest of the rich'.",
          detay: "Order sometimes sacrifices love.",
        },
        basarisizSonuc: {
          mesaj: "The intervention turned rough, someone was hurt; the incident reached the papers.",
          detay: "Some 'order' decisions turn into disasters.",
        },
      },
    ],
  },

  sd_din_ispirtizma_modasi: {
    baslik: "An Invitation to Speak With Spirits",
    metin:
      "A rich and influential lady has invited you to a fashionable 'séance'. Attending could build valuable connections but could also clash with your faith.",
    secenekler: [
      {
        metin: "Attend out of curiosity, watch the séance.",
        basariliSonuc: {
          mesaj: "The séance was strange but striking; you built valuable connections with the lady's circle.",
          detay: "A curious mind sometimes shakes faith a little.",
        },
        basarisizSonuc: {
          mesaj:
            "A congregation member saw you leaving the séance; the gossip that 'the priest meets with mediums' spread.",
          detay: "The price of some curiosities is reputation.",
        },
      },
      {
        metin: "Politely decline the invitation, stay true to your faith.",
        basariliSonuc: {
          mesaj: "You declined the invitation; the lady was a little offended, but your congregation approved.",
          detay: "Some boundaries protect faith.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal hurt the lady; her family's donations went to another church.",
          detay: "Every principle can carry a price.",
        },
      },
    ],
  },

  sd_din_kilise_elektrik_tartismasi: {
    baslik: "The Debate the Light Brought",
    metin:
      "The younger part of your congregation wants electric light installed in the church; the elders speak of the sanctity of the candle and the corruption of tradition. Pleasing both seems impossible.",
    secenekler: [
      {
        metin: "Install the electricity, modernize the church.",
        basariliSonuc: {
          mesaj:
            "The first evening you gave the service under bright lights, the young congregation was full of enthusiasm; a few old members quietly turned their backs.",
          detay: "Every innovation comes with a farewell.",
        },
        basarisizSonuc: {
          mesaj: "The electricity cut out often, the installation was left half done; the money went, the result was dim.",
          detay: "Modernizing doesn't always take on the first try.",
        },
      },
      {
        metin: "Preserve tradition, carry on by candlelight.",
        basariliSonuc: {
          mesaj:
            "Tradition was preserved; the old congregation was relieved, but a few young families went to another church.",
          detay: "Some traditions live at a price.",
        },
        basarisizSonuc: {
          mesaj: "Part of the young congregation broke away from the church entirely, calling it 'backward'.",
          detay: "Resisting change has a cost too.",
        },
      },
    ],
  },

  sd_din_gazete_skandali: {
    baslik: "The Newspaper's Threat",
    metin:
      "A journalist has found evidence that another clergyman in your congregation embezzled money; before publishing, he wants a 'silence fee' from you, or the whole church's name will be tarnished.",
    secenekler: [
      {
        metin: "Pay the fee, cover up the scandal.",
        basariliSonuc: {
          mesaj:
            "The journalist took the money, the story never ran; the church's name stayed clean, but you know the truth.",
          detay: "Some clean-ups are really just a cover.",
        },
        basarisizSonuc: {
          mesaj: "Despite your payment the journalist published the story anyway; you lost both the money and the reputation.",
          detay: "Some silences cannot be bought.",
        },
      },
      {
        metin: "Refuse to pay, let the truth come out.",
        basariliSonuc: {
          mesaj: "The story ran, there was a brief scandal, but your honesty was appreciated in the end.",
          detay: "The truth hurts, but it also heals.",
        },
        basarisizSonuc: {
          mesaj: "The scandal grew larger than expected; the whole congregation was shaken.",
          detay: "Some truths carry a heavier price than expected.",
        },
      },
    ],
  },

  sd_din_goc_eden_cemaat: {
    baslik: "The Emptying Village Church",
    metin:
      "The pull of the factories is emptying your village; most of your congregation has migrated to the city and they invite you to join them at a new, large church there. But the elderly who remain in the village still depend on you.",
    secenekler: [
      {
        metin: "Go to the city, chase your growing congregation.",
        basariliSonuc: {
          mesaj:
            "The new church in the city is crowded and grand; but you can't forget the old faces you left behind in the village.",
          detay: "Growing sometimes means leaving someone behind.",
        },
        basarisizSonuc: {
          mesaj: "Getting a foothold in the city was harder than you thought, and on top of it you hurt those in the village.",
          detay: "Sometimes you lose in both worlds.",
        },
      },
      {
        metin: "Stay in the village, stay loyal to your dwindling congregation.",
        basariliSonuc: {
          mesaj:
            "You stayed in the village; the old congregation held you to their bosom like a son, the church stayed small but warm.",
          detay: "Some loyalties don't fit into statistics.",
        },
        basarisizSonuc: {
          mesaj:
            "The village emptied steadily, the church was left almost bare; you paid the price of your decision in loneliness.",
          detay: "Devotion's reward is sometimes only peace.",
        },
      },
    ],
  },

  sd_din_hayirsever_endustriyalist: {
    baslik: "A Magnificent Offer",
    metin:
      "The factory owner famous for the region's harshest working conditions offers you a colossal donation to build a magnificent cathedral that will immortalize his name. Everyone knows where the money comes from.",
    secenekler: [
      {
        metin: "Accept the donation, build the cathedral.",
        basariliSonuc: {
          mesaj:
            "The magnificent cathedral rose, your name will be spoken for generations; but you know what labor lies beneath its stones.",
          detay: "Some monuments are mixed with pain.",
        },
        basarisizSonuc: {
          mesaj:
            "The construction was shadowed by scandals, the worker exploitation leaked to the press; the cathedral still rose, but a shadow fell on your name.",
          detay: "Dirty money sometimes stains the building itself.",
        },
      },
      {
        metin: "Decline the offer, stay true to your principles.",
        basariliSonuc: {
          mesaj:
            "You declined the offer; the factory owner left in anger, but your congregation applauded your principled stand.",
          detay: "Some refusals are more powerful than the greatest sermon.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was read by some as 'arrogance'; the missed opportunity was talked about for a long time.",
          detay: "Being principled is sometimes misunderstood.",
        },
      },
    ],
  },

  sd_din_asevi_karari: {
    baslik: "The Soup Kitchen's Limits",
    metin:
      "In the dead of winter, dozens of hungry people come to the church door every day; what supplies you have can only feed half of them. You must decide who to feed and who to turn away.",
    secenekler: [
      {
        metin: "Hand out small, equal portions to everyone.",
        basariliSonuc: {
          mesaj: "Everyone ate something; no one went hungry, but no stomach was truly filled either.",
          detay: "Some fairness leaves everyone a little short.",
        },
        basarisizSonuc: {
          mesaj: "The portions shrank so much that fights broke out; you barely kept order.",
          detay: "Scarcity makes even sharing hard.",
        },
      },
      {
        metin: "Prioritize the most needy (families with children, the sick), turn the others away.",
        basariliSonuc: {
          mesaj:
            "Families with children and the sick ate their fill; but the looks of those who left empty-handed weighed on you.",
          detay: "The right choice sometimes can't be made without upsetting someone.",
        },
        basarisizSonuc: {
          mesaj: "Those turned away accused you of 'favoritism'; the priority list turned into a quarrel.",
          detay: "Everyone believes their own share is deserved.",
        },
      },
    ],
  },

  sd_din_rakip_vaiz: {
    baslik: "The New Preacher",
    metin:
      "A charismatic young preacher has come to town; with his fiery speeches he's drawing away a large part of your congregation. Your church grows emptier at every Sunday service.",
    secenekler: [
      {
        metin: "Try to make your own sermons more passionate and striking.",
        basariliSonuc: {
          mesaj: "Your new style worked; part of your congregation returned, and you found a new energy at the pulpit.",
          detay: "Sometimes changing isn't defeat, it's adapting.",
        },
        basarisizSonuc: {
          mesaj: "It came off as imitation; the congregation sensed you weren't being yourself, and interest fell further.",
          detay: "Imitating someone else's light can put out your own.",
        },
      },
      {
        metin: "Stay true to your own way, continue your quiet, deep sermons.",
        basariliSonuc: {
          mesaj: "You didn't change; the congregation that stayed grew even more attached to you, their loyalty deepened.",
          detay: "Some lights gather loyalty, not crowds.",
        },
        basarisizSonuc: {
          mesaj: "Most of your congregation moved to the young preacher's church; your donations fell sharply.",
          detay: "Staying true to yourself can have a price too.",
        },
      },
    ],
  },

  sd_din_bilimsel_dernek_daveti: {
    baslik: "Invitation to the Society",
    metin:
      "The city's newly founded scientific society has invited you to join as an enlightened clergyman. Some congregants see this society as a 'nest of godlessness'; but there are also respected names among its members.",
    secenekler: [
      {
        metin: "Accept the invitation, join the society.",
        basariliSonuc: {
          mesaj:
            "You met respected names at the society; your name began to be spoken of in a new way among the city's learned circles.",
          detay: "Some pulpits are built outside the church too.",
        },
        basarisizSonuc: {
          mesaj: "Traditionalist congregants read your joining as 'a drift from the faith'; gossip spread quickly.",
          detay: "Curiosity sometimes costs you trust.",
        },
      },
      {
        metin: "Decline politely, focus on your pulpit.",
        basariliSonuc: {
          mesaj: "You declined the invitation; your standing grew among the congregation as a 'steadfast priest'.",
          detay: "When some doors close, others become firmer.",
        },
        basarisizSonuc: {
          mesaj: "Some circles read your refusal as 'narrow-mindedness'.",
          detay: "Not every decision pleases everyone.",
        },
      },
    ],
  },

  sd_din_grev_vaazi_talebi: {
    baslik: "The Factory Owner's Request",
    metin:
      "A major factory owner in the region wants to bring the church's influence to bear on the striking workers; he wants you to call the strike a 'sin' and 'disobedience' in your Sunday sermon, in exchange for a large donation.",
    secenekler: [
      {
        metin: "Accept the request, give a sermon on obedience.",
        basariliSonuc: {
          mesaj: "Your sermon pleased the factory owner, the donation arrived; but the striking workers turned their backs on the pulpit.",
          detay: "Some donations carry the price of your conscience.",
        },
        basarisizSonuc: {
          mesaj: "Your sermon angered the workers; a small protest was held in front of the church.",
          detay: "Every word said from the pulpit touches someone.",
        },
      },
      {
        metin: "Refuse the request, stay neutral and call for justice.",
        basariliSonuc: {
          mesaj: "Your call for justice moved both the workers and neutral observers; the factory owner never approached you again.",
          detay: "Some refusals are more powerful than the mightiest sermon.",
        },
        basarisizSonuc: {
          mesaj: "The factory owner cut off his smaller donations too; the church's budget grew a little tighter.",
          detay: "Staying principled has its price at the collection box.",
        },
      },
    ],
  },

  sd_din_misyonerlik_teklifi: {
    baslik: "The Call to Distant Lands",
    metin:
      "Church headquarters wants you to go as a missionary to a distant colonial land; a dangerous journey, but if you succeed your name could enter the church's history. If you refuse, your pulpit stays here — safe, but ordinary.",
    secenekler: [
      {
        metin: "Accept the call, go to distant lands.",
        basariliSonuc: {
          mesaj: "You survived the grueling journey; the small congregation you founded became a legend at headquarters.",
          detay: "Some journeys are told for a lifetime.",
        },
        basarisizSonuc: {
          mesaj: "Illness and hardship wore you down; you came back half dead, the mission left unfinished.",
          detay: "Some callings demand more than your body has to give.",
        },
      },
      {
        metin: "Refuse, stay at your own pulpit.",
        basariliSonuc: {
          mesaj: "You refused; headquarters was disappointed, but you stayed by your family and congregation.",
          detay: "Some safeties are quietly satisfying.",
        },
        basarisizSonuc: {
          mesaj: "Headquarters noted your decision as 'lack of courage'; you fell behind on the promotion list.",
          detay: "Staying safe has a price too.",
        },
      },
    ],
  },

  sd_din_olum_dosegi_itirafi: {
    baslik: "The Deathbed Confession",
    metin:
      "One of the region's most ruthless factory owners has summoned you to his deathbed; he wants to confess his sins and leave a large part of his fortune to the church — but with a condition: his headstone must read 'a generous and just man'.",
    secenekler: [
      {
        metin: "Accept the condition, take the donation and have the epitaph written as he wants.",
        basariliSonuc: {
          mesaj: "The donation came, the headstone was written as requested; the church could do much with his fortune.",
          detay: "Some lies get carved in stone and become permanent.",
        },
        basarisizSonuc: {
          mesaj: "His former workers who saw the epitaph were outraged; a rumor spread of a 'lying headstone'.",
          detay: "Lies written in stone are sometimes spoken of in the street.",
        },
      },
      {
        metin: "Take the donation, but keep the epitaph honest and plain.",
        basariliSonuc: {
          mesaj:
            "You proposed a plain epitaph; the man was angry at first but agreed with his last breath, and still left his donation.",
          detay: "Some truths are accepted even on a deathbed.",
        },
        basarisizSonuc: {
          mesaj: "The man furiously changed his will; most of the donation went to another church.",
          detay: "Honesty sometimes costs you even at the very last moment.",
        },
      },
    ],
  },

  sd_din_kilise_restorasyonu: {
    baslik: "Cracking Walls",
    metin:
      "The church's old stone walls have begun to crack, and the bell tower leans dangerously. Repairs are costly; you could launch a big donation drive among the congregation, or hire a cheap, risky craftsman.",
    secenekler: [
      {
        metin: "Launch a broad donation drive among the congregation.",
        basariliSonuc: {
          mesaj:
            "The campaign went better than expected; the congregation worked together and reinforced the church, and a sense of unity grew stronger.",
          detay: "Some repairs strengthen the community more than the stone.",
        },
        basarisizSonuc: {
          mesaj: "The donations fell short; you had to finish part of the repair out of your own pocket.",
          detay: "Some campaigns fall short of their goal.",
        },
      },
      {
        metin: "Hire a cheap, quick craftsman.",
        basariliSonuc: {
          mesaj: "The craftsman finished the job quickly and cleanly; the church was restored cheaper than expected.",
          detay: "Sometimes cheap works out fine.",
        },
        basarisizSonuc: {
          mesaj:
            "The cheap repair held for a month, then pieces of stone fell from the bell tower; you had to redo everything from scratch.",
          detay: "Cheapness sometimes comes back as the costliest road.",
        },
      },
    ],
  },

  sd_din_kadi_zulum_meselesi: {
    baslik: "The Neighborhood's Complaint",
    metin:
      "Local shopkeepers have brought you word that a newly opened, foreign-funded factory is evading taxes and mistreating its workers; they want you to use your word with the kadi, even the governor.",
    secenekler: [
      {
        metin: "Raise the matter openly in your sermon, bring a petition to the governor.",
        basariliSonuc: {
          mesaj: "Your petition caught the governor's attention; a small inspection came to the factory, and the neighborhood rallied around you.",
          detay: "Some voices leave the pulpit and spread through the street.",
        },
        basarisizSonuc: {
          mesaj: "The governor ignored the matter, and the factory owners complained that you were 'hostile to foreigners'.",
          detay: "Some voices hit the wall and bounce back.",
        },
      },
      {
        metin: "Stay silent, counsel the neighborhood to be patient.",
        basariliSonuc: {
          mesaj: "You counseled patience; you had no trouble with anyone, but some shopkeepers criticized you for 'standing back'.",
          detay: "Some silences are safe but isolating.",
        },
        basarisizSonuc: {
          mesaj: "The neighborhood expected a word from you, and your silence caused disappointment.",
          detay: "Silence is sometimes read as an answer in itself.",
        },
      },
    ],
  },

  sd_din_ingiliz_sendika_papazlik: {
    baslik: "Chaplain of the Workers' Society",
    metin:
      "A newly founded workers' mutual-aid society is offering you the honorary title of 'society chaplain' — you would give spiritual support to workers who fall ill or lose their jobs. There's a small stipend, but the church's upper council doesn't look kindly on such societies, finding them 'close to socialism'.",
    secenekler: [
      {
        metin: "Accept the title, tie yourself to the society.",
        basariliSonuc: {
          mesaj:
            "Working with the society made your name 'their chaplain' in the working-class neighborhoods; the upper council frowned but said nothing.",
          detay: "Some titles, however unofficial, are the truest ones.",
        },
        basarisizSonuc: {
          mesaj: "The upper council registered its displeasure with a formal warning; a small shadow fell on your career.",
          detay: "The people's affection sometimes costs dearly higher up.",
        },
      },
      {
        metin: "Decline politely, stay within the church's official line.",
        basariliSonuc: {
          mesaj: "You declined; the upper council was pleased, but the society's members rarely sought you out again.",
          detay: "Some safe roads quietly leave a distance behind.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal hurt some working families; they said 'he wasn't with us in hard times'.",
          detay: "Every cautious step can disappoint someone.",
        },
      },
    ],
  },

  sd_din_meslektas_skandali: {
    baslik: "The Neighboring Congregation's Shame",
    metin:
      "It came to light that the priest of a neighboring town had been stealing from the congregation's relief fund; the church's upper council plans to quietly close the matter and 'exile' the man to another region. You're expected either to speak openly about it, or to stay silent.",
    secenekler: [
      {
        metin: "Speak of the matter openly from the pulpit, demand accountability.",
        basariliSonuc: {
          mesaj: "Your candor reinforced the congregation's trust; the upper council finally removed the man from his post.",
          detay: "Some silences are only broken by speaking loudly.",
        },
        basarisizSonuc: {
          mesaj: "The upper council accused you of 'damaging the church's reputation'; a small disciplinary deduction was made.",
          detay: "Telling the truth sometimes costs you from within the institution.",
        },
      },
      {
        metin: "Go along with the upper council's wish, stay silent.",
        basariliSonuc: {
          mesaj: "You stayed silent; the upper council was pleased, but you know the man could repeat this in another town.",
          detay: "Some silences leave a debt owed to the future.",
        },
        basarisizSonuc: {
          mesaj: "The matter leaked out another way; it came out that you knew and had stayed quiet.",
          detay: "Covered-up truths sometimes come to light along with the one who covered them.",
        },
      },
    ],
  },
};
