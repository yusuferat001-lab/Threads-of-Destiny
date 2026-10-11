import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiDinAdami.ts — İngilizce çevirileri. */
export const OLAYLAR_SANAYI_DINADAMI_EN: Record<string, OlayCeviri> = {
  sd_din_fabrika_vaazi: {
    baslik: "The Factory Owner's Request",
    metin:
      "The region's biggest factory owner offers a generous donation, wanting you to preach obedience and no strikes to the workers.",
    secenekler: [
      {
        metin: "Accept the donation, give the sermon.",
        basariliSonuc: {
          mesaj:
            "The owner is pleased and the coffer fills, but whispers start among the workers.",
          detay: "Your conscience pays for some donations.",
        },
        basarisizSonuc: {
          mesaj: "You took the money, but the workers saw the sermon was 'bought'.",
          detay: "Truth can't be hidden even from the pulpit.",
        },
      },
      {
        metin: "Refuse the donation, preach for the workers.",
        basariliSonuc: {
          mesaj:
            "Your pro-worker sermon moved them deeply; the owner never called again.",
          detay: "Some riches are worth refusing.",
        },
        basarisizSonuc: {
          mesaj:
            "The owner cut even small donations; budget tightened, standing rose.",
          detay: "The price of doing right comes from the coffer.",
        },
      },
    ],
  },

  sd_din_bilim_karsitligi: {
    baslik: "Science at the Pulpit",
    metin:
      "A naturalist lectures on evolution in the square beside the church; part of your flock is furious, others curious. A stance is expected.",
    secenekler: [
      {
        metin: "Condemn it sharply from the pulpit.",
        basariliSonuc: {
          mesaj:
            "Your fierce sermon roused traditionalists; the curious stopped listening.",
          detay: "Some pulpits burn bridges.",
        },
        basarisizSonuc: {
          mesaj: "Your harshness backfired; the young called you 'behind the times'.",
          detay: "Anger doesn't always have the desired effect.",
        },
      },
      {
        metin: "Enter a respectful dialogue with the scientist.",
        basariliSonuc: {
          mesaj: "The talk was respectful and deep; you both learned something.",
          detay: "Some bridges should be built, not torn down.",
        },
        basarisizSonuc: {
          mesaj: "Your dialogue was read as 'weakness'; some members left.",
          detay: "Open-mindedness isn't always rewarded.",
        },
      },
    ],
  },

  sd_din_cocuk_isci_vicdani: {
    baslik: "The Children Among the Machines",
    metin:
      "At a wealthy donor's factory, eight- and nine-year-olds work among the machines. He defends himself: 'Without them, their families would starve.'",
    secenekler: [
      {
        metin: "Report to the authorities, try to protect the children.",
        basariliSonuc: {
          mesaj:
            "Your report shortened some hours; the donor angrily cut ties with the church.",
          detay: "Some victories are small but real.",
        },
        basarisizSonuc: {
          mesaj: "Your report changed nothing, and you lost the donor too.",
          detay: "Sometimes doing right only eases the conscience.",
        },
      },
      {
        metin: "Stay silent, keep the donations.",
        basariliSonuc: {
          mesaj:
            "You stayed silent and donations flowed, but those children's eyes won't leave you.",
          detay: "Some silences gnaw for years.",
        },
        basarisizSonuc: {
          mesaj: "A journalist learned of your silence: 'he saw but said nothing'.",
          detay: "Conscience is sometimes heard in another's pen.",
        },
      },
    ],
  },

  sd_din_ruhban_karsiti_gosteri: {
    baslik: "The Crowd at the Church Door",
    metin:
      "A socialist group outside the church stages a protest contrasting its wealth with the people's hunger: 'Share your riches!'",
    secenekler: [
      {
        metin: "Open the doors, share the church's resources.",
        basariliSonuc: {
          mesaj:
            "The church became a soup kitchen, talked of for weeks; to the people you're a saint.",
          detay: "A door once opened never closes the same.",
        },
        basarisizSonuc: {
          mesaj: "Resources ran out fast and chaos broke, but your intent was understood.",
          detay: "Good intentions sometimes end in disorder.",
        },
      },
      {
        metin: "Call the guards, disperse the crowd.",
        basariliSonuc: {
          mesaj:
            "The crowd was dispersed and the church calmed, but you're 'the priest of the rich'.",
          detay: "Order sometimes sacrifices love.",
        },
        basarisizSonuc: {
          mesaj: "The intervention turned rough, someone was hurt; the papers reported it.",
          detay: "Some 'order' decisions become disasters.",
        },
      },
    ],
  },

  sd_din_ispirtizma_modasi: {
    baslik: "An Invitation to Speak With Spirits",
    metin:
      "A rich, influential lady invites you to a fashionable séance. Attending could build connections but may clash with your faith.",
    secenekler: [
      {
        metin: "Attend out of curiosity, watch the séance.",
        basariliSonuc: {
          mesaj: "The séance was strange but striking; you made valuable connections.",
          detay: "A curious mind sometimes shakes faith.",
        },
        basarisizSonuc: {
          mesaj:
            "A member saw you leave the séance; gossip spread that 'the priest meets mediums'.",
          detay: "Some curiosities cost reputation.",
        },
      },
      {
        metin: "Politely decline, stay true to your faith.",
        basariliSonuc: {
          mesaj: "The lady was a little offended, but your congregation approved.",
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
      "Young congregants want electric light in the church; elders speak of the candle's sanctity and tradition. Pleasing both seems impossible.",
    secenekler: [
      {
        metin: "Install the electricity, modernize the church.",
        basariliSonuc: {
          mesaj:
            "The young cheered the first bright service; a few elders quietly turned away.",
          detay: "Every innovation comes with a farewell.",
        },
        basarisizSonuc: {
          mesaj: "The power kept cutting out, installation half done; money gone, result dim.",
          detay: "Modernizing doesn't always work first time.",
        },
      },
      {
        metin: "Preserve tradition, keep to candlelight.",
        basariliSonuc: {
          mesaj:
            "Tradition held; elders relaxed, but a few young families went elsewhere.",
          detay: "Some traditions live at a price.",
        },
        basarisizSonuc: {
          mesaj: "Some young members left the church, calling it 'backward'.",
          detay: "Resisting change has a cost too.",
        },
      },
    ],
  },

  sd_din_gazete_skandali: {
    baslik: "The Newspaper's Threat",
    metin:
      "A journalist has proof another clergyman embezzled money; he wants a 'silence fee' before publishing, or the church's name is tarnished.",
    secenekler: [
      {
        metin: "Pay the fee, cover up the scandal.",
        basariliSonuc: {
          mesaj:
            "The story never ran and the church's name stayed clean, but you know the truth.",
          detay: "Some clean-ups are just a cover.",
        },
        basarisizSonuc: {
          mesaj: "Despite payment the story ran; you lost both money and reputation.",
          detay: "Some silences can't be bought.",
        },
      },
      {
        metin: "Refuse to pay, let the truth out.",
        basariliSonuc: {
          mesaj: "The story ran, a brief scandal followed, but your honesty won appreciation.",
          detay: "Truth hurts, but it also heals.",
        },
        basarisizSonuc: {
          mesaj: "The scandal grew bigger than expected; the whole congregation was shaken.",
          detay: "Some truths cost more than expected.",
        },
      },
    ],
  },

  sd_din_goc_eden_cemaat: {
    baslik: "The Emptying Village Church",
    metin:
      "Factories are emptying your village; your flock migrated to the city and invites you to a big new church there. The village elderly still need you.",
    secenekler: [
      {
        metin: "Go to the city, follow your growing flock.",
        basariliSonuc: {
          mesaj:
            "The city church is crowded and grand, but you can't forget the old faces left behind.",
          detay: "Growing sometimes means leaving someone behind.",
        },
        basarisizSonuc: {
          mesaj: "Gaining a foothold in the city was hard, and you hurt the villagers.",
          detay: "Sometimes you lose in both worlds.",
        },
      },
      {
        metin: "Stay in the village, stay loyal to your flock.",
        basariliSonuc: {
          mesaj:
            "You stayed; the elders took you in like a son, the church small but warm.",
          detay: "Some loyalties don't fit in statistics.",
        },
        basarisizSonuc: {
          mesaj:
            "The village emptied, the church was left bare; you paid in loneliness.",
          detay: "Devotion's reward is sometimes only peace.",
        },
      },
    ],
  },

  sd_din_hayirsever_endustriyalist: {
    baslik: "A Magnificent Offer",
    metin:
      "A factory owner infamous for harsh conditions offers a colossal donation for a grand cathedral bearing his name. Everyone knows the money's source.",
    secenekler: [
      {
        metin: "Accept the donation, build the cathedral.",
        basariliSonuc: {
          mesaj:
            "The cathedral rose, your name will live on; you know what labor lies under its stones.",
          detay: "Some monuments are mixed with pain.",
        },
        basarisizSonuc: {
          mesaj:
            "Scandals shadowed the build, exploitation leaked; it rose, but your name was stained.",
          detay: "Dirty money stains the building too.",
        },
      },
      {
        metin: "Decline the offer, hold to your principles.",
        basariliSonuc: {
          mesaj:
            "The owner left angry, but your congregation applauded your stand.",
          detay: "Some refusals outpreach the greatest sermon.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was read as 'arrogance'; the missed chance was long discussed.",
          detay: "Principle is sometimes misunderstood.",
        },
      },
    ],
  },

  sd_din_asevi_karari: {
    baslik: "The Soup Kitchen's Limits",
    metin:
      "In deep winter dozens of hungry people come to your door daily; supplies feed only half. You must decide who to feed and who to turn away.",
    secenekler: [
      {
        metin: "Hand out small, equal portions to all.",
        basariliSonuc: {
          mesaj: "Everyone ate something and no one went hungry, but no one was full.",
          detay: "Some fairness leaves everyone a little short.",
        },
        basarisizSonuc: {
          mesaj: "Portions shrank so much that fights broke out; you barely kept order.",
          detay: "Scarcity makes even sharing hard.",
        },
      },
      {
        metin: "Prioritize families with children and the sick.",
        basariliSonuc: {
          mesaj:
            "Families with children and the sick ate; those turned away weighed on you.",
          detay: "The right choice sometimes upsets someone.",
        },
        basarisizSonuc: {
          mesaj: "Those turned away called you 'partial'; the priority list turned into a quarrel.",
          detay: "Everyone believes their share is deserved.",
        },
      },
    ],
  },

  sd_din_rakip_vaiz: {
    baslik: "The New Preacher",
    metin:
      "A charismatic young preacher has come to town and is drawing most of your flock with fiery speeches. Your church empties more every Sunday.",
    secenekler: [
      {
        metin: "Make your sermons more passionate.",
        basariliSonuc: {
          mesaj: "The new style worked; part of the flock returned and you found new energy.",
          detay: "Changing is sometimes adapting, not defeat.",
        },
        basarisizSonuc: {
          mesaj: "It felt like imitation; they sensed you weren't yourself, and interest fell.",
          detay: "Imitating another's light can put out your own.",
        },
      },
      {
        metin: "Stay true to your way, keep your deep sermons.",
        basariliSonuc: {
          mesaj: "You didn't change; those who stayed grew more attached.",
          detay: "Some lights gather loyalty, not crowds.",
        },
        basarisizSonuc: {
          mesaj: "Most of your flock moved to the young preacher; donations fell sharply.",
          detay: "Staying true can have a price too.",
        },
      },
    ],
  },

  sd_din_bilimsel_dernek_daveti: {
    baslik: "Invitation to the Society",
    metin:
      "The city's new scientific society invites you to join. Some call it a 'nest of godlessness', yet respected names are members.",
    secenekler: [
      {
        metin: "Accept the invitation, join the society.",
        basariliSonuc: {
          mesaj:
            "You met respected names; your name is now spoken anew among the learned.",
          detay: "Some pulpits are built outside the church.",
        },
        basarisizSonuc: {
          mesaj: "Traditionalists read it as 'drifting from faith'; gossip spread fast.",
          detay: "Curiosity sometimes costs trust.",
        },
      },
      {
        metin: "Decline politely, focus on your pulpit.",
        basariliSonuc: {
          mesaj: "You declined; among the flock you gained trust as a 'steadfast priest'.",
          detay: "When one door closes, others firm up.",
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
      "A major factory owner wants your Sunday sermon to call the strike a 'sin' and 'disobedience', promising a large donation in return.",
    secenekler: [
      {
        metin: "Accept, give a sermon on obedience.",
        basariliSonuc: {
          mesaj: "The owner is pleased, the donation came; but striking workers turned their backs.",
          detay: "Some donations carry your conscience's price.",
        },
        basarisizSonuc: {
          mesaj: "Your sermon angered the workers; a small protest formed outside the church.",
          detay: "Every word from the pulpit touches someone.",
        },
      },
      {
        metin: "Refuse, stay neutral, call for justice.",
        basariliSonuc: {
          mesaj: "Your call moved workers and observers alike; the owner never returned.",
          detay: "Some refusals outpreach the mightiest sermon.",
        },
        basarisizSonuc: {
          mesaj: "The owner cut his small donations too; the budget tightened a bit more.",
          detay: "Principle has its price at the collection box.",
        },
      },
    ],
  },

  sd_din_misyonerlik_teklifi: {
    baslik: "The Call to Distant Lands",
    metin:
      "Headquarters wants you as a missionary in a distant colony: dangerous, but success could make history. Refuse, and you stay safe but ordinary.",
    secenekler: [
      {
        metin: "Accept the call, go to distant lands.",
        basariliSonuc: {
          mesaj: "You survived the journey; the flock you founded became a legend at headquarters.",
          detay: "Some journeys are told for a lifetime.",
        },
        basarisizSonuc: {
          mesaj: "Illness wore you down; you returned half dead, the mission unfinished.",
          detay: "Some callings demand more than your body has.",
        },
      },
      {
        metin: "Refuse, stay at your own pulpit.",
        basariliSonuc: {
          mesaj: "Headquarters was disappointed, but you stayed with your family and flock.",
          detay: "Some safeties are quietly satisfying.",
        },
        basarisizSonuc: {
          mesaj: "Headquarters noted 'lack of courage'; you fell behind on the promotion list.",
          detay: "Staying safe has a price too.",
        },
      },
    ],
  },

  sd_din_olum_dosegi_itirafi: {
    baslik: "The Deathbed Confession",
    metin:
      "A ruthless factory owner on his deathbed wants to leave his fortune to the church, on condition his headstone read 'a generous and just man'.",
    secenekler: [
      {
        metin: "Accept the condition, have the epitaph written so.",
        basariliSonuc: {
          mesaj: "The donation came, the stone was carved as asked; the church did much with it.",
          detay: "Some lies carved in stone become permanent.",
        },
        basarisizSonuc: {
          mesaj: "Former workers who saw the epitaph were outraged; a 'lying headstone' rumor spread.",
          detay: "Lies in stone get talked about in the street.",
        },
      },
      {
        metin: "Take it, but keep the epitaph plain and honest.",
        basariliSonuc: {
          mesaj:
            "He raged at a plain epitaph, then agreed with his last breath and still donated.",
          detay: "Some truths are accepted even on a deathbed.",
        },
        basarisizSonuc: {
          mesaj: "The man angrily changed his will; most of the donation went to another church.",
          detay: "Honesty can cost even at the last moment.",
        },
      },
    ],
  },

  sd_din_kilise_restorasyonu: {
    baslik: "Cracking Walls",
    metin:
      "The walls are cracking and the bell tower leans dangerously. Repair is costly: raise donations from the congregation, or hire a cheap, risky craftsman.",
    secenekler: [
      {
        metin: "Launch a donation drive in the congregation.",
        basariliSonuc: {
          mesaj:
            "The drive beat expectations; the congregation reinforced the church together.",
          detay: "Some repairs strengthen community more than stone.",
        },
        basarisizSonuc: {
          mesaj: "Donations fell short; you finished part of the repair from your own pocket.",
          detay: "Some campaigns miss their goal.",
        },
      },
      {
        metin: "Hire a cheap, quick craftsman.",
        basariliSonuc: {
          mesaj: "The craftsman finished quickly; the church was restored cheaper than expected.",
          detay: "Sometimes cheap works out.",
        },
        basarisizSonuc: {
          mesaj:
            "The repair held a month, then stones fell from the tower; you redid it all.",
          detay: "Cheap sometimes returns as the costliest road.",
        },
      },
    ],
  },

  sd_din_kadi_zulum_meselesi: {
    baslik: "The Neighborhood's Complaint",
    metin:
      "Shopkeepers report that a new foreign-funded factory evades taxes and abuses workers; they want you to press the kadi, even the governor.",
    secenekler: [
      {
        metin: "Raise it in your sermon, petition the governor.",
        basariliSonuc: {
          mesaj: "Your petition caught the governor's eye; an inspection came, the district rallied.",
          detay: "Some voices leave the pulpit and reach the street.",
        },
        basarisizSonuc: {
          mesaj: "The governor ignored it; the factory owners called you 'hostile to foreigners'.",
          detay: "Some voices hit the wall and bounce back.",
        },
      },
      {
        metin: "Stay silent, counsel patience.",
        basariliSonuc: {
          mesaj: "You counseled patience and had no trouble; some shopkeepers said you 'stood back'.",
          detay: "Some silences are safe but isolating.",
        },
        basarisizSonuc: {
          mesaj: "The neighborhood expected a word; your silence disappointed.",
          detay: "Silence is sometimes read as an answer.",
        },
      },
    ],
  },

  sd_din_ingiliz_sendika_papazlik: {
    baslik: "Chaplain of the Workers' Society",
    metin:
      "A workers' mutual-aid society offers you the honorary title 'society chaplain'. The church council dislikes such societies as 'close to socialism'.",
    secenekler: [
      {
        metin: "Accept the title, tie yourself to the society.",
        basariliSonuc: {
          mesaj:
            "You became 'their chaplain' in working districts; the council frowned but said nothing.",
          detay: "Some titles, unofficial, are the truest.",
        },
        basarisizSonuc: {
          mesaj: "The council issued a formal warning; a small shadow fell on your career.",
          detay: "The people's love can cost dearly above.",
        },
      },
      {
        metin: "Decline politely, stay on the official line.",
        basariliSonuc: {
          mesaj: "The council was pleased, but society members rarely sought you again.",
          detay: "Some safe roads leave a distance.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal hurt working families: 'he wasn't with us in hard times'.",
          detay: "A cautious step can disappoint someone.",
        },
      },
    ],
  },

  sd_din_meslektas_skandali: {
    baslik: "The Neighboring Congregation's Shame",
    metin:
      "A neighboring town's priest stole from the relief fund; the council wants to cover it up and 'exile' him. Do you speak out or stay silent?",
    secenekler: [
      {
        metin: "Speak openly from the pulpit, demand accountability.",
        basariliSonuc: {
          mesaj: "Your candor reinforced trust; the council finally removed the man.",
          detay: "Some silences are broken only loudly.",
        },
        basarisizSonuc: {
          mesaj: "The council accused you of 'harming the church's reputation'; a small penalty followed.",
          detay: "Truth sometimes costs you inside the institution.",
        },
      },
      {
        metin: "Obey the council, stay silent.",
        basariliSonuc: {
          mesaj: "You stayed silent and the council approved, but he may repeat it elsewhere.",
          detay: "Some silences leave a debt to the future.",
        },
        basarisizSonuc: {
          mesaj: "It leaked another way; it came out you knew and kept quiet.",
          detay: "Covered truths surface along with the cover-up.",
        },
      },
    ],
  },
};
