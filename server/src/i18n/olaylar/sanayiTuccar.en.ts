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
        ipucu: "Highest profit, a heavy toll on conscience and reputation",
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
        ipucu: "Slow but solid growth, high initial cost",
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
        ipucu: "Low risk, low ceiling",
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
        ipucu: "A loyal workforce and reputation, rising costs",
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
        ipucu: "Protects your costs, raises the risk of a strike",
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
        ipucu: "Could solve the problem at the root, or blow it up entirely",
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
        ipucu: "A great gain or a ruinous loss",
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
        ipucu: "Limited gain, limited risk",
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
        ipucu: "A quick sales spike, scandal risk",
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
        ipucu: "Slow but dependable growth",
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
        ipucu: "A big production leap, legal and moral risk",
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
        ipucu: "Slow but clean progress",
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
        ipucu: "A small regular cost, a large safeguard",
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
        ipucu: "A short-term gain, ruin in a disaster",
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
        ipucu: "Costly, but your conscience and your workers are safe",
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
        ipucu: "Profitable short-term, but big conscience and reputation risk",
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
        ipucu: "A big profit jump, a heavy moral price",
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
        ipucu: "Your margin stays low, but your conscience is clean",
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
};
