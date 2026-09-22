import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiTuccar.ts — İngilizce çevirileri (id + seçenek sırasıyla eşleşir). */
export const OLAYLAR_SANAYI_TUCCAR_EN: Record<string, OlayCeviri> = {
  sd_tuccar_fabrika: {
    baslik: "Building a Factory",
    metin:
      "Near {bolge} there is cheap land and cheap labor. You could build a factory — but how you build it will also decide who you become.",
    secenekler: [
      {
        metin: "Drive costs to the floor with cheap child labor.",
        basariliSonuc: {
          mesaj: "Your costs are half your rivals'; the factory grew fast.",
          detay:
            "Nine-year-olds work between the looms. No inspector comes, but profit does, and you are now among the richest in the region.",
        },
        basarisizSonuc: {
          mesaj: "A child was caught in a machine; the papers put the factory on the front page.",
          detay:
            "The factory was shut down, you paid compensation, and your name was spoken as 'the child-killer boss'. The profit flew off, the stain stayed.",
        },
      },
      {
        metin: "Build it with fair wages and safe conditions.",
        basariliSonuc: {
          mesaj: "The workers won't leave you; your productivity has passed your rivals'.",
          detay:
            "Wages are high, turnover is zero. While rivals search for new workers every month, your masters have stood at the same bench for ten years without a single mistake.",
        },
        basarisizSonuc: {
          mesaj: "The costs weighed you down; rivals beat you on price and the factory closed.",
          detay:
            "Doing the right thing sank you. Your workers gathered at the gate on the last day to thank you; it did not clear the bank debt.",
        },
      },
      {
        metin: "Start with a small workshop, keep the risk minimal.",
        basariliSonuc: {
          mesaj: "The small workshop built a steady income.",
          detay:
            "You did not get rich, but you did not go under either. In your eight-person workshop you know everyone's name, and that is enough for you.",
        },
        basarisizSonuc: {
          mesaj: "Demand did not hold; the workshop barely covered its costs and closed.",
          detay:
            "You played small and lost anyway. At least the loss was small too; you are still on your feet.",
        },
      },
    ],
  },

  sd_tuccar_sendika: {
    baslik: "The Union at the Table",
    metin:
      "The union the workers formed wants to talk. Its demands are clear: shorter hours, safer benches. Rival factories do not recognize the union and see this as a weakness.",
    secenekler: [
      {
        metin: "Accept the demands, recognize the union.",
        basariliSonuc: {
          mesaj: "The agreement was signed; your factory became the most stable workplace in the region.",
          detay:
            "Your costs rose, but strikes, sabotage and worker loss dropped to zero. While your rivals halt production every month, your chimney never once went cold.",
        },
        basarisizSonuc: {
          mesaj: "You accepted the demands, but your cost calculations did not hold; you are losing money.",
          detay:
            "The workers are content, your ledger is in the red. Generosity, when you don't do the math, turns out to be not generosity but suicide.",
        },
      },
      {
        metin: "Bargain hard, give the minimum concession.",
        basariliSonuc: {
          mesaj: "You gave a small concession and closed the deal; your costs stayed almost the same.",
          detay:
            "The union representative said 'next time' as he left the table. This time you won; next time will surely come.",
        },
        basarisizSonuc: {
          mesaj: "The talks collapsed; a strike began and production stopped for months.",
          detay:
            "The factory chimney did not smoke for two months. Order cancellations, penalty fees and the news in the papers cost far more than a concession would have.",
        },
      },
      {
        metin: "Try to buy off the union leader.",
        basariliSonuc: {
          mesaj: "The leader took the money and watered down the demands; the union collapsed from within.",
          detay:
            "The workers still trust that man, and that man is now your man. This was the cheapest solution, and the dirtiest.",
        },
        basarisizSonuc: {
          mesaj: "The leader took the money and showed the offer to the workers; the factory rose up.",
          detay:
            "Your bribe offer was pinned to the walls. Now not only your own workers but the whole city knows you as 'the boss who tried to buy them off'.",
        },
      },
    ],
  },

  sd_tuccar_borsa_spekulasyonu: {
    baslik: "The Call of the Exchange",
    metin:
      "On the newly opened securities exchange, the shares of a railway company are soaring wildly. Everyone believes they'll get rich, but bubbles like this can burst overnight.",
    secenekler: [
      {
        metin: "Put most of your capital into the shares.",
        basariliSonuc: {
          mesaj: "The shares hit the ceiling! Your capital more than doubled in a short time.",
          detay: "Some risks turn into legendary gains.",
        },
        basarisizSonuc: {
          mesaj: "The bubble burst; the shares became worthless overnight and most of your capital evaporated.",
          detay: "The exchange has a short memory, and its fall is merciless.",
        },
      },
      {
        metin: "Invest a small, cautious amount.",
        basariliSonuc: {
          mesaj: "Your small investment brought a reasonable return; your caution paid off.",
          detay: "Sometimes small steps are the safest.",
        },
        basarisizSonuc: {
          mesaj: "Even your small investment evaporated, but at least it wasn't a catastrophe.",
          detay: "Being cautious limits the damage.",
        },
      },
    ],
  },

  sd_tuccar_reklam_hilesi: {
    baslik: "The Overblown Advertisement",
    metin:
      "You have gone into the new fad of 'advertising'; making your product look far more effective than it is could multiply sales, but if the lie comes out your reputation takes a hit.",
    secenekler: [
      {
        metin: "Exaggerate the ad as much as possible, make miraculous claims.",
        basariliSonuc: {
          mesaj: "The overblown ad brought a flood of customers; your till filled fast.",
          detay: "Some lies convince the customer right away.",
        },
        basarisizSonuc: {
          mesaj:
            "When the customers realized they had been fooled they came back furious; there was even a small protest outside your shop.",
          detay: "Exaggeration sometimes digs its own grave.",
        },
      },
      {
        metin: "Prepare an honest, modest advertisement.",
        basariliSonuc: {
          mesaj: "Your honest ad won a small but loyal customer base.",
          detay: "Trust is worth more than the most expensive advertising.",
        },
        basarisizSonuc: {
          mesaj: "The ad drew little attention; sales stayed flat.",
          detay: "Honesty sometimes doesn't dazzle.",
        },
      },
    ],
  },

  sd_tuccar_patent_hirsizligi: {
    baslik: "Stolen Drawings",
    metin:
      "An engineer brought you the drawings of a rival factory's revolutionary new machine — stolen, and capable of carrying your factory years ahead. If you use them, you face the risk of being caught and sued.",
    secenekler: [
      {
        metin: "Use the drawings, build the machine.",
        basariliSonuc: {
          mesaj: "The new machine doubled your output; your rivals keep wondering how you grew so fast.",
          detay: "Some leaps rest on theft.",
        },
        basarisizSonuc: {
          mesaj: "The theft came out and a suit was filed; you paid heavy damages and your name was tarnished.",
          detay: "Stolen foundations collapse sooner or later.",
        },
      },
      {
        metin: "Send the drawings back, advance on your own.",
        basariliSonuc: {
          mesaj: "You returned the drawings; the engineer was baffled, but you carried on with your own research.",
          detay: "Turning down some opportunities is a kind of character too.",
        },
        basarisizSonuc: {
          mesaj: "After your refusal the engineer sold the drawings to another factory; your rival grew before you.",
          detay: "Honesty sometimes has a short-term price.",
        },
      },
    ],
  },

  sd_tuccar_sigorta_teklifi: {
    baslik: "Factory Insurance",
    metin:
      "A newly founded insurance company offers to cover your factory against fire and accidents. The yearly premium is a real expense, but it could save you in a disaster.",
    secenekler: [
      {
        metin: "Take out the insurance, get covered.",
        basariliSonuc: {
          mesaj: "You signed the policy; there is a sense of safety in it now.",
          detay: "Some expenses are really a way of buying peace of mind.",
        },
        basarisizSonuc: {
          mesaj: "You signed the policy, but the company's fine print made you uneasy.",
          detay: "A safeguard doesn't always bring full peace.",
        },
      },
      {
        metin: "Decline, put the money into your business.",
        basariliSonuc: {
          mesaj: "You put the money into your business, output rose; no accident has happened so far.",
          detay: "Taking the risk paid off this time.",
        },
        basarisizSonuc: {
          mesaj:
            "A small fire broke out at the factory; since you had no insurance you covered all the damage out of your own pocket.",
          detay: "Some risks send the bill sooner or later.",
        },
      },
    ],
  },

  sd_tuccar_isci_guvenligi: {
    baslik: "The Matter of Protective Equipment",
    metin:
      "Your foreman has reported the cost of protective barriers around the machines and gloves for the workers. It's expensive, but there have been several serious accidents in recent months.",
    secenekler: [
      {
        metin: "Make the investment, protect the workers.",
        basariliSonuc: {
          mesaj: "The new barriers cut accidents almost to zero; among the workers your name became 'the fair boss'.",
          detay: "Some investments come back as peace of mind.",
        },
        basarisizSonuc: {
          mesaj: "You made the investment, but the installation went slowly, and there was another accident this month.",
          detay: "Improvement isn't always visible right away.",
        },
      },
      {
        metin: "Put the cost off and protect your profit margin.",
        basariliSonuc: {
          mesaj:
            "You put the cost off and kept your margin; but you can't ignore the uneasy looks of the workers as they approach the machines.",
          detay: "Some gains come at someone else's risk.",
        },
        basarisizSonuc: {
          mesaj:
            "The feared thing happened: a serious accident occurred, and the papers put your factory in the headlines. The compensation and reputation loss cost far more than the expense you deferred.",
          detay: "Deferred safety comes back with a price.",
        },
      },
    ],
  },

  sd_tuccar_cocuk_isci_teklifi: {
    baslik: "An Offer of Cheap Labor",
    metin:
      "A broker offers to put poor families' children to work in your factory for very low wages — far cheaper than adult workers. Your profit margin would rise sharply.",
    secenekler: [
      {
        metin: "Accept the offer, hire the children.",
        basariliSonuc: {
          mesaj:
            "Your profit margin rose noticeably; but something twists inside you every time you see the small hands among the machines.",
          detay: "Some gains, your conscience pays the bill for.",
        },
        basarisizSonuc: {
          mesaj:
            "A journalist found out you were employing children; you had a brief scandal, but the profit still rose.",
          detay: "Some truths leak out even when hidden.",
        },
      },
      {
        metin: "Decline, keep hiring adult workers.",
        basariliSonuc: {
          mesaj: "You declined the offer; your margin lags your rivals', but you sleep easy at night.",
          detay: "Some decisions are rewarded only with peace of mind.",
        },
        basarisizSonuc: {
          mesaj: "Your rivals undercut you with cheap labor; you lost some orders.",
          detay: "Being principled sometimes drops you back in the race.",
        },
      },
    ],
  },

  sd_tuccar_demiryolu_yatirimi: {
    baslik: "The Railway Line",
    metin:
      "A new railway line is being planned around {bolge}. If you buy shares you could move your goods far faster — but the line could also never be finished at all, over land disputes.",
    secenekler: [
      {
        metin: "Take a large stake, become a leading shareholder in the line.",
        basariliSonuc: {
          mesaj:
            "The line was completed; your goods now reach the city in hours instead of days.",
          detay: "As the rails were laid, your trade sped up along with them.",
        },
        basarisizSonuc: {
          mesaj: "Land disputes halted the line; the company went bankrupt, your stake turned to paper.",
          detay: "Some rails lead nowhere at all.",
        },
      },
      {
        metin: "Take a small stake, spread the risk.",
        basariliSonuc: {
          mesaj: "Your small stake paid a reasonable dividend; you were pleased when the line was finished.",
          detay: "Small bets sometimes pay off quietly.",
        },
        basarisizSonuc: {
          mesaj: "The company moved slower than expected, and your stake lost value.",
          detay: "A small investment, a small disappointment.",
        },
      },
      {
        metin: "Stay away, don't trust the rails.",
        basariliSonuc: {
          mesaj: "You stood aside; the line was delayed, and you felt vindicated in your doubts.",
          detay: "Sometimes doing nothing is itself a strategy.",
        },
        basarisizSonuc: {
          mesaj:
            "The line was completed without a hitch and cut your rivals' shipping costs in half; you were left out.",
          detay: "Caution is sometimes the costliest choice of all.",
        },
      },
    ],
  },

  sd_tuccar_zincir_magaza_rekabeti: {
    baslik: "The Rival Chain Store",
    metin:
      "A large chain store has opened in the city; it's pulling your customers away by selling your kind of goods near below cost. In the long run, they want to wipe you out of the market.",
    secenekler: [
      {
        metin: "Cut your prices to the floor too, accept the war.",
        basariliSonuc: {
          mesaj: "You won the price war; the chain store couldn't hold on in the district and pulled back.",
          detay: "Some wars are won only by whoever can outlast the other.",
        },
        basarisizSonuc: {
          mesaj:
            "The chain store's capital ran far deeper than yours; you sold at a loss for months and ran dry.",
          detay: "A small fish can't race a big one all the way to the bottom.",
        },
      },
      {
        metin: "Hold your price, lead with quality and personal service.",
        basariliSonuc: {
          mesaj: "Your loyal customers stayed with you; you became known as 'the familiar shop on the corner'.",
          detay: "Some customers value trust more than price.",
        },
        basarisizSonuc: {
          mesaj: "Loyalty wasn't enough; even some of your old customers turned to the cheap shelf.",
          detay: "Trust sometimes loses out to the purse.",
        },
      },
    ],
  },

  sd_tuccar_banka_kredisi_temerrudu: {
    baslik: "The Bank Comes Knocking",
    metin:
      "You've fallen behind on the large loan you took years ago; the bank manager has summoned you to his office and sits there with foreclosure papers in hand.",
    secenekler: [
      {
        metin: "Hand over all the cash you have, renegotiate the terms.",
        basariliSonuc: {
          mesaj: "The bank agreed to a new term; your business survived, but your coffers are empty.",
          detay: "Some deals are signed just to buy room to breathe.",
        },
        basarisizSonuc: {
          mesaj: "Even with your payment, the bank decided it wasn't enough; they foreclosed on a small warehouse.",
          detay: "Sometimes giving everything you have still isn't enough.",
        },
      },
      {
        metin: "Borrow at high interest from another moneylender, pay off the bank.",
        basariliSonuc: {
          mesaj: "You closed out the bank debt, but now you're bound to a far greedier moneylender.",
          detay: "It's possible to climb out of one pit and fall into another.",
        },
        basarisizSonuc: {
          mesaj: "The moneylender backed out too, and the bank began foreclosure; you were caught between two fires.",
          detay: "Some fixes give birth to nothing but new problems.",
        },
      },
    ],
  },

  sd_tuccar_sanayi_casuslugu: {
    baslik: "The Eye Inside Your Factory",
    metin:
      "Your foreman noticed that a rival manufacturer's man had disguised himself as a worker and was taking notes on your production secrets. They caught him — it's your call what happens next.",
    secenekler: [
      {
        metin: "Hand him to the gendarmerie, press the case.",
        basariliSonuc: {
          mesaj:
            "The case was won; your rival's name became linked to espionage, your factory came out as the wronged party.",
          detay: "Some victories are won in the courtroom.",
        },
        basarisizSonuc: {
          mesaj: "The case collapsed for lack of evidence, and the court costs came out of your own pocket.",
          detay: "Some justice costs dearly, and still doesn't arrive.",
        },
      },
      {
        metin: "Quietly let the man go, demand a concession from your rival in return.",
        basariliSonuc: {
          mesaj: "In exchange for not pressing charges, your rival ceded you a regional market.",
          detay: "Some deals are struck in the shadows, not at the bench.",
        },
        basarisizSonuc: {
          mesaj:
            "Your rival refused the deal and twisted the story, complaining that you'd 'taken the law into your own hands'.",
          detay: "Deals struck in the shadows sometimes explode once they reach the light.",
        },
      },
    ],
  },

  sd_tuccar_gazeteci_sorusturmasi: {
    baslik: "The Reporter's Questions",
    metin:
      "A young, idealistic journalist is investigating the working conditions at your factory; she's shown up at your door with pointed questions. Every answer you give could end up in print.",
    secenekler: [
      {
        metin: "Open the doors, show the factory as it is.",
        basariliSonuc: {
          mesaj:
            "The journalist was struck by what she saw; her piece praised you as an 'honest and transparent' owner.",
          detay: "Sometimes having nothing to hide is the best defense there is.",
        },
        basarisizSonuc: {
          mesaj:
            "Your open-door policy didn't help; the journalist blew even minor flaws out of proportion.",
          detay: "Good will isn't always met with good will.",
        },
      },
      {
        metin: "Entertain the journalist warmly, show her only the prepared showcase.",
        basariliSonuc: {
          mesaj: "The journalist was impressed by the tidy workshop she saw; she wrote a glowing piece.",
          detay: "Showcases sometimes tell the whole story — the one you wanted told.",
        },
        basarisizSonuc: {
          mesaj:
            "A worker pulled the journalist aside and told her the real conditions; a 'fake showcase' scandal broke out.",
          detay: "A hidden truth hits twice as hard once it surfaces.",
        },
      },
    ],
  },

  sd_tuccar_dunya_fuari: {
    baslik: "Invitation to the Great Exhibition",
    metin:
      "An invitation has come for you to take part in an international industrial exhibition; you could display your goods to traders and kings from every corner of the world. Building a stand is costly, but the rewards could be great.",
    secenekler: [
      {
        metin: "Build the most lavish stand, make a grand showcase.",
        basariliSonuc: {
          mesaj:
            "Your stand drew great attention; orders poured in from foreign traders, your name appeared in the international press.",
          detay: "Some showcases reach far beyond any border.",
        },
        basarisizSonuc: {
          mesaj: "Your stand got lost in the crowd; you never earned back what you spent.",
          detay: "Not every glitter gets noticed.",
        },
      },
      {
        metin: "Build a modest, functional stand.",
        basariliSonuc: {
          mesaj: "Your plain stand still caught the eye of a few serious buyers.",
          detay: "Sometimes a small but right audience is enough.",
        },
        basarisizSonuc: {
          mesaj: "Your stand went unnoticed by anyone; the exhibition brought you little at all.",
          detay: "Some opportunities pass quietly by.",
        },
      },
    ],
  },

  sd_tuccar_somurge_mallari: {
    baslik: "Cheap Colonial Goods",
    metin:
      "A trader offers you very cheap cotton and sugar from distant lands; the reason the price is so low is that the workers on those lands are worked almost like slaves.",
    secenekler: [
      {
        metin: "Buy the goods in bulk, multiply your profit margin.",
        basariliSonuc: {
          mesaj:
            "The cheap goods filled your warehouse, your profit multiplied; but you can't forget the labor behind that price.",
          detay: "Some cheapness is paid for with someone else's suffering.",
        },
        basarisizSonuc: {
          mesaj:
            "The goods turned out shoddy; you lost both profit and reputation, and the weight on your conscience was for nothing.",
          detay: "A dirty gain sometimes isn't a gain at all.",
        },
      },
      {
        metin: "Prefer the pricier goods produced under fair conditions.",
        basariliSonuc: {
          mesaj:
            "You paid more, but some of your customers appreciated the 'fair trade' label.",
          detay: "Some customers ask where a thing comes from.",
        },
        basarisizSonuc: {
          mesaj: "The higher cost ate into your margin; your rivals got ahead of you on cheap goods.",
          detay: "Being principled sometimes sets you back in the market.",
        },
      },
    ],
  },

  sd_tuccar_isci_kooperatifi_teklifi: {
    baslik: "The Workers' Buyout Offer",
    metin:
      "The most senior workers at your factory have pooled their savings; they want to buy the factory from you together and run it as a cooperative. The offer is below market value, but it's guaranteed and quick.",
    secenekler: [
      {
        metin: "Accept the offer, hand the factory over to the workers.",
        basariliSonuc: {
          mesaj: "The factory passed into the workers' hands; this 'generous handover' was talked about in the city for a long time.",
          detay: "Some sales aren't measured in money alone.",
        },
        basarisizSonuc: {
          mesaj: "The handover went through, but you had to settle for a lower price than expected.",
          detay: "A quick solution sometimes weakens your bargaining hand.",
        },
      },
      {
        metin: "Refuse, wait for a higher offer.",
        basariliSonuc: {
          mesaj: "Months later another buyer appeared and offered a much higher price.",
          detay: "Patience sometimes brings great rewards.",
        },
        basarisizSonuc: {
          mesaj: "No other buyer appeared; the factory started losing value, and the workers withdrew their offer too.",
          detay: "Sometimes the opportunity you waited for never comes again.",
        },
      },
    ],
  },

  sd_tuccar_rakibin_iflasi: {
    baslik: "Your Rival's Collapse",
    metin:
      "{rakip}'s business has come to the brink of bankruptcy; creditors are lining up at the door. You could take over his goods and customer list for next to nothing, or lend him money to stay afloat despite him being an old rival.",
    secenekler: [
      {
        metin: "Profit from his collapse, buy up his assets for a pittance.",
        basariliSonuc: {
          mesaj:
            "You took over {rakip}'s customer list and warehouse for next to nothing; your business grew, and the hostility between you deepened.",
          detay: "Some opportunities are born from someone else's wreckage.",
        },
        basarisizSonuc: {
          mesaj: "The creditors stepped in and broke the deal; you lost money and gained nothing.",
          detay: "Some wreckage strikes back like a nail underfoot.",
        },
      },
      {
        metin: "Lend him money, help him stay afloat.",
        basariliSonuc: {
          mesaj:
            "{rakip} recovered and never forgot the debt; instead of an old enemy, you now have a wary ally.",
          detay: "Some debts are repaid not in money, but in loyalty.",
        },
        basarisizSonuc: {
          mesaj: "Despite your loan, {rakip} still went under; the money you gave vanished along with him.",
          detay: "Kindness doesn't always come back around.",
        },
      },
    ],
  },

  sd_tuccar_para_devaluasyonu: {
    baslik: "The Currency's Fall",
    metin:
      "You've heard a credible rumor that the government will devalue the currency. If it's true, converting your cash into goods or foreign currency now could save you — if you're wrong, you'll pay needless commission and lose money.",
    secenekler: [
      {
        metin: "Convert most of your cash into goods/gold right away.",
        basariliSonuc: {
          mesaj: "The devaluation happened; the wealth you held in goods kept its value, even grew.",
          detay: "Some rumors, heeded in time, save a fortune.",
        },
        basarisizSonuc: {
          mesaj: "The rumor turned out false; you lost money for nothing to commissions and exchange fees.",
          detay: "Panic sometimes becomes a disaster of its own, before any real one arrives.",
        },
      },
      {
        metin: "Ignore the rumor, stay in cash.",
        basariliSonuc: {
          mesaj: "The rumor turned out false; you lost nothing by staying cautious.",
          detay: "Sometimes doing nothing is the right move.",
        },
        basarisizSonuc: {
          mesaj: "The devaluation really happened; the cash you held lost serious value overnight.",
          detay: "Some storms strike not when they're heard of, but when they arrive.",
        },
      },
    ],
  },
};
