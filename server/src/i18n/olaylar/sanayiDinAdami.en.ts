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
        ipucu: "Your congregation grows richer, the workers lose their trust in you",
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
        ipucu: "Your conscience is at ease, your congregation stays poor",
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
        ipucu: "The traditionalists applaud you, the educated drift away",
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
        ipucu: "Your horizons widen, but the traditionalists watch you with suspicion",
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
        ipucu: "Your conscience eases, but you lose your biggest donor",
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
        ipucu: "The church stays rich, but your conscience is stained",
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
        ipucu: "You win the people's love, the upper council does not welcome it",
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
        ipucu: "Order is restored, but your image in the people's eyes is damaged",
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
        ipucu: "Valuable connections, but a clash with your faith",
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
        ipucu: "Your faith stays solid, but you lose a valuable connection",
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
        ipucu: "The young rejoice, the old take offense",
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
        ipucu: "The money is safe, the young may drift away",
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
        ipucu: "The church's reputation is protected, but your conscience is stained",
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
        ipucu: "Short-term reputation loss, long-term peace of conscience",
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
        ipucu: "Your career grows, those in the village are left alone",
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
        ipucu: "Your conscience is at ease, your career stalls",
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
        ipucu: "Great fame and a lasting work, but its source is dirty",
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
        ipucu: "Your conscience stays clean, but you miss a historic opportunity",
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
};
