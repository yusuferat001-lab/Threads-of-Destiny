import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiTuccar.ts — İngilizce çevirileri (id + seçenek sırasıyla eşleşir). */
export const OLAYLAR_SANAYI_TUCCAR_EN: Record<string, OlayCeviri> = {
  sd_tuccar_fabrika: {
    baslik: "Building a Factory",
    metin:
      "Cheap land and cheap labor lie near {bolge}. You could build a factory; how you build it also decides who you become.",
    secenekler: [
      {
        metin: "Slash costs with cheap child labor.",
        basariliSonuc: {
          mesaj: "Your costs are half your rivals'; the factory grew fast.",
          detay:
            "Nine-year-olds at the looms; profit flows.",
        },
        basarisizSonuc: {
          mesaj: "A child was caught in a machine; the papers made headlines.",
          detay:
            "The factory closed; profit flew, the stain stayed.",
        },
      },
      {
        metin: "Build with fair pay and safe conditions.",
        basariliSonuc: {
          mesaj: "Workers won't leave; productivity passed your rivals'.",
          detay:
            "High pay, zero turnover, no waste.",
        },
        basarisizSonuc: {
          mesaj: "Costs weighed you down; rivals undercut you and it closed.",
          detay:
            "Doing right sank you; workers thanked you at the gate.",
        },
      },
      {
        metin: "Start with a small workshop, limit risk.",
        basariliSonuc: {
          mesaj: "The small workshop built a steady income.",
          detay:
            "Not rich, but not sunk.",
        },
        basarisizSonuc: {
          mesaj: "Demand fell short; the workshop barely broke even and closed.",
          detay:
            "You played small; the loss was small too.",
        },
      },
    ],
  },

  sd_tuccar_sendika: {
    baslik: "The Union at the Table",
    metin:
      "The workers' union wants talks: shorter hours, safer benches. Rival factories refuse to recognize unions.",
    secenekler: [
      {
        metin: "Accept the demands, recognize the union.",
        basariliSonuc: {
          mesaj: "The deal was signed; yours became the region's steadiest workplace.",
          detay:
            "Costs rose, but strikes and sabotage ended.",
        },
        basarisizSonuc: {
          mesaj: "You accepted, but the math failed; you're losing money.",
          detay:
            "Workers content, ledger red.",
        },
      },
      {
        metin: "Bargain hard, concede the minimum.",
        basariliSonuc: {
          mesaj: "A small concession closed the deal; costs barely moved.",
          detay:
            "The rep said 'next time' as he left.",
        },
        basarisizSonuc: {
          mesaj: "Talks collapsed; a strike halted production for months.",
          detay:
            "Cancellations and fines cost far more than a concession.",
        },
      },
      {
        metin: "Try to buy off the union leader.",
        basariliSonuc: {
          mesaj: "The leader took the money, diluted the demands; the union crumbled.",
          detay:
            "The cheapest fix, and the dirtiest.",
        },
        basarisizSonuc: {
          mesaj: "The leader showed the offer to the workers; the factory rose up.",
          detay:
            "The city knows you as the boss who tried to buy them.",
        },
      },
    ],
  },

  sd_tuccar_borsa_spekulasyonu: {
    baslik: "The Call of the Exchange",
    metin:
      "On the new exchange, a railway company's shares are soaring. Everyone expects riches; bubbles can burst overnight.",
    secenekler: [
      {
        metin: "Put most of your capital in shares.",
        basariliSonuc: {
          mesaj: "Shares hit the ceiling! Your capital more than doubled.",
          detay: "Some risks become legendary gains.",
        },
        basarisizSonuc: {
          mesaj: "The bubble burst; shares turned worthless, your capital evaporated.",
          detay: "The exchange forgets fast and falls hard.",
        },
      },
      {
        metin: "Invest a small, cautious amount.",
        basariliSonuc: {
          mesaj: "Your small stake earned a fair return; caution paid.",
          detay: "Small steps are safest.",
        },
        basarisizSonuc: {
          mesaj: "Even the small stake evaporated, but it was no catastrophe.",
          detay: "Caution limits the damage.",
        },
      },
    ],
  },

  sd_tuccar_reklam_hilesi: {
    baslik: "The Overblown Advertisement",
    metin:
      "You've entered the new fad of 'advertising'; overselling your product could multiply sales, but a exposed lie hurts your name.",
    secenekler: [
      {
        metin: "Exaggerate the ad, promise miracles.",
        basariliSonuc: {
          mesaj: "The overblown ad brought a flood of customers; the till filled.",
          detay: "Some lies convince at once.",
        },
        basarisizSonuc: {
          mesaj:
            "Customers saw they were fooled; they protested outside your shop.",
          detay: "Exaggeration digs its own grave.",
        },
      },
      {
        metin: "Write an honest, modest ad.",
        basariliSonuc: {
          mesaj: "The honest ad won a small, loyal clientele.",
          detay: "Trust beats the priciest advertising.",
        },
        basarisizSonuc: {
          mesaj: "The ad drew little notice; sales stayed flat.",
          detay: "Honesty doesn't always dazzle.",
        },
      },
    ],
  },

  sd_tuccar_patent_hirsizligi: {
    baslik: "Stolen Drawings",
    metin:
      "An engineer brought stolen drawings of a rival's revolutionary machine. They'd put you years ahead, but risk exposure and a lawsuit.",
    secenekler: [
      {
        metin: "Use the drawings, build the machine.",
        basariliSonuc: {
          mesaj: "The new machine doubled output; your rivals are baffled.",
          detay: "Some leaps rest on theft.",
        },
        basarisizSonuc: {
          mesaj: "The theft surfaced, a suit followed; heavy damages, tarnished name.",
          detay: "Stolen foundations collapse sooner or later.",
        },
      },
      {
        metin: "Send them back, go your own way.",
        basariliSonuc: {
          mesaj: "You returned them and carried on with your own research.",
          detay: "Refusing a chance is character too.",
        },
        basarisizSonuc: {
          mesaj: "The engineer sold them to another factory; your rival outgrew you.",
          detay: "Honesty has a short-term price.",
        },
      },
    ],
  },

  sd_tuccar_sigorta_teklifi: {
    baslik: "Factory Insurance",
    metin:
      "A new insurance company offers to cover your factory against fire and accidents. The premium hurts, but it could save you.",
    secenekler: [
      {
        metin: "Take out the insurance.",
        basariliSonuc: {
          mesaj: "You signed the policy; you feel safer now.",
          detay: "Some expenses buy peace of mind.",
        },
        basarisizSonuc: {
          mesaj: "You signed, but the fine print unsettled you.",
          detay: "Cover doesn't always bring full peace.",
        },
      },
      {
        metin: "Decline, invest the money in business.",
        basariliSonuc: {
          mesaj: "You invested it, output rose; no accident so far.",
          detay: "The risk paid off this time.",
        },
        basarisizSonuc: {
          mesaj:
            "A fire broke out; uninsured, you paid all the damage yourself.",
          detay: "Some risks bill you sooner or later.",
        },
      },
    ],
  },

  sd_tuccar_isci_guvenligi: {
    baslik: "The Matter of Protective Equipment",
    metin:
      "Your foreman reported the cost of machine barriers and gloves for workers. Expensive, but there were several serious accidents lately.",
    secenekler: [
      {
        metin: "Make the investment, protect the workers.",
        basariliSonuc: {
          mesaj: "Barriers nearly ended accidents; workers call you 'the fair boss'.",
          detay: "Some investments return as peace.",
        },
        basarisizSonuc: {
          mesaj: "Installation dragged; another accident happened this month.",
          detay: "Improvement isn't instant.",
        },
      },
      {
        metin: "Defer the cost, protect your margin.",
        basariliSonuc: {
          mesaj:
            "Margin kept; you can't ignore the workers' uneasy looks.",
          detay: "Some gains come from others' risk.",
        },
        basarisizSonuc: {
          mesaj:
            "A grave accident hit the headlines; damages cost more than the deferred expense.",
          detay: "Deferred safety returns with a price.",
        },
      },
    ],
  },

  sd_tuccar_cocuk_isci_teklifi: {
    baslik: "An Offer of Cheap Labor",
    metin:
      "A broker offers to put poor children to work in your factory for very low wages. Your margin would rise.",
    secenekler: [
      {
        metin: "Accept, hire the children.",
        basariliSonuc: {
          mesaj:
            "Profit rose; something twists in you at the sight of small hands.",
          detay: "Your conscience pays some gains' bill.",
        },
        basarisizSonuc: {
          mesaj:
            "A journalist learned of the children; brief scandal, yet profit rose.",
          detay: "Hidden truths leak out.",
        },
      },
      {
        metin: "Refuse, keep hiring adults.",
        basariliSonuc: {
          mesaj: "You refused; your margin lags, but you sleep easy.",
          detay: "Some choices reward only with peace.",
        },
        basarisizSonuc: {
          mesaj: "Rivals undercut you with cheap labor; you lost some orders.",
          detay: "Principle can cost you the race.",
        },
      },
    ],
  },

  sd_tuccar_demiryolu_yatirimi: {
    baslik: "The Railway Line",
    metin:
      "A railway is planned around {bolge}. Shares could speed your goods, but land disputes might leave it unfinished.",
    secenekler: [
      {
        metin: "Take a large stake, lead the shareholders.",
        basariliSonuc: {
          mesaj:
            "The line opened; goods now arrive in hours, not days.",
          detay: "As rails spread, your trade sped up.",
        },
        basarisizSonuc: {
          mesaj: "Land suits halted the line; the company failed, shares turned to paper.",
          detay: "Some rails lead nowhere.",
        },
      },
      {
        metin: "Take a small stake, spread the risk.",
        basariliSonuc: {
          mesaj: "Your small stake paid a fair dividend.",
          detay: "Small bets pay quietly.",
        },
        basarisizSonuc: {
          mesaj: "The company moved slowly; your stake lost value.",
          detay: "Small investment, small disappointment.",
        },
      },
      {
        metin: "Stay out, don't trust the rails.",
        basariliSonuc: {
          mesaj: "You stood aside; the line slipped, and you felt vindicated.",
          detay: "Sometimes doing nothing is a strategy.",
        },
        basarisizSonuc: {
          mesaj:
            "The line finished smoothly, halving rivals' freight; you were left out.",
          detay: "Caution can be the costliest choice.",
        },
      },
    ],
  },

  sd_tuccar_zincir_magaza_rekabeti: {
    baslik: "The Rival Chain Store",
    metin:
      "A chain store opened in town, selling near cost and pulling your customers. It means to wipe you from the market.",
    secenekler: [
      {
        metin: "Slash prices too, accept the war.",
        basariliSonuc: {
          mesaj: "You won the price war; the chain pulled out.",
          detay: "Some wars go to whoever outlasts.",
        },
        basarisizSonuc: {
          mesaj:
            "Their capital ran deeper; months of selling at a loss drained you.",
          detay: "A small fish can't race a big one to the bottom.",
        },
      },
      {
        metin: "Hold price, lead with quality and service.",
        basariliSonuc: {
          mesaj: "Loyal customers stayed; you became 'the familiar corner shop'.",
          detay: "Some customers prize trust over price.",
        },
        basarisizSonuc: {
          mesaj: "Loyalty fell short; some old customers went to the cheap shelf.",
          detay: "Trust sometimes loses to the purse.",
        },
      },
    ],
  },

  sd_tuccar_banka_kredisi_temerrudu: {
    baslik: "The Bank Comes Knocking",
    metin:
      "You can't repay the big loan you took years ago; the bank manager summoned you, foreclosure papers in hand.",
    secenekler: [
      {
        metin: "Hand over all cash, renegotiate terms.",
        basariliSonuc: {
          mesaj: "The bank agreed to new terms; business survives, coffers empty.",
          detay: "Some deals are signed to breathe.",
        },
        basarisizSonuc: {
          mesaj: "Despite payment, the bank wanted more; it seized a small warehouse.",
          detay: "Sometimes giving all isn't enough.",
        },
      },
      {
        metin: "Borrow from a moneylender, pay the bank.",
        basariliSonuc: {
          mesaj: "The bank is paid, but a greedier moneylender now owns you.",
          detay: "You can leave one pit for another.",
        },
        basarisizSonuc: {
          mesaj: "The moneylender backed out and the bank foreclosed; caught between fires.",
          detay: "Some fixes breed only new problems.",
        },
      },
    ],
  },

  sd_tuccar_sanayi_casuslugu: {
    baslik: "The Eye Inside Your Factory",
    metin:
      "Your foreman caught a rival's man disguised as a worker, noting your production secrets. What happens next is your call.",
    secenekler: [
      {
        metin: "Hand him to the gendarmes, press the case.",
        basariliSonuc: {
          mesaj:
            "The case was won; your rival was branded a spy, you the victim.",
          detay: "Some victories are won in court.",
        },
        basarisizSonuc: {
          mesaj: "Not enough evidence; the case fell and costs came from your pocket.",
          detay: "Some justice costs dearly and never comes.",
        },
      },
      {
        metin: "Quietly free him, demand a concession.",
        basariliSonuc: {
          mesaj: "To avoid charges, your rival ceded you a regional market.",
          detay: "Some deals are struck in shadow.",
        },
        basarisizSonuc: {
          mesaj:
            "Your rival refused and reported you for 'taking the law into your hands'.",
          detay: "Shadow deals can blow up in the light.",
        },
      },
    ],
  },

  sd_tuccar_gazeteci_sorusturmasi: {
    baslik: "The Reporter's Questions",
    metin:
      "A young journalist is probing conditions at your factory, asking pointed questions at your door. Any answer may be printed.",
    secenekler: [
      {
        metin: "Open the doors, show everything.",
        basariliSonuc: {
          mesaj:
            "She was impressed; she praised you as an honest, open owner.",
          detay: "Nothing to hide is the best defense.",
        },
        basarisizSonuc: {
          mesaj:
            "Openness failed; she inflated even minor flaws.",
          detay: "Good will isn't always met in kind.",
        },
      },
      {
        metin: "Host her warmly, show only the showcase.",
        basariliSonuc: {
          mesaj: "She admired the tidy workshop and wrote a glowing piece.",
          detay: "A showcase tells the story you want.",
        },
        basarisizSonuc: {
          mesaj:
            "A worker told her the truth; a 'fake showcase' scandal broke.",
          detay: "A hidden truth hits twice as hard.",
        },
      },
    ],
  },

  sd_tuccar_dunya_fuari: {
    baslik: "Invitation to the Great Exhibition",
    metin:
      "You're invited to an international industrial exhibition to show your goods to the world's traders. A stand is costly; rewards may be great.",
    secenekler: [
      {
        metin: "Build the most lavish stand.",
        basariliSonuc: {
          mesaj:
            "The stand drew crowds; foreign orders poured in, the press named you.",
          detay: "Some showcases cross borders.",
        },
        basarisizSonuc: {
          mesaj: "The stand got lost in the crowd; you never recouped the cost.",
          detay: "Not every glitter is noticed.",
        },
      },
      {
        metin: "Build a modest, functional stand.",
        basariliSonuc: {
          mesaj: "The plain stand still caught a few serious buyers.",
          detay: "Sometimes few but right eyes suffice.",
        },
        basarisizSonuc: {
          mesaj: "No one noticed your stand; the fair gave little.",
          detay: "Some chances slip by quietly.",
        },
      },
    ],
  },

  sd_tuccar_somurge_mallari: {
    baslik: "Cheap Colonial Goods",
    metin:
      "A trader offers very cheap cotton and sugar; the price is low because workers on those distant lands are treated like slaves.",
    secenekler: [
      {
        metin: "Buy in bulk, multiply your margin.",
        basariliSonuc: {
          mesaj:
            "Warehouse full, profit doubled; you can't forget the labor behind the price.",
          detay: "Some cheapness is paid in others' suffering.",
        },
        basarisizSonuc: {
          mesaj:
            "The goods proved shoddy; profit and name lost, the guilt for nothing.",
          detay: "Dirty gain is sometimes no gain.",
        },
      },
      {
        metin: "Choose pricier, fairly made goods.",
        basariliSonuc: {
          mesaj:
            "You paid more; some customers valued 'fair trade'.",
          detay: "Some customers ask where things come from.",
        },
        basarisizSonuc: {
          mesaj: "High costs ate your margin; rivals pulled ahead on cheap goods.",
          detay: "Principle can set you back in the market.",
        },
      },
    ],
  },

  sd_tuccar_isci_kooperatifi_teklifi: {
    baslik: "The Workers' Buyout Offer",
    metin:
      "Senior workers want to buy the factory with pooled savings and run it as a cooperative. Below market, but quick and certain.",
    secenekler: [
      {
        metin: "Accept, hand the factory to the workers.",
        basariliSonuc: {
          mesaj: "The factory passed to the workers; the city long praised the 'generous handover'.",
          detay: "Some sales aren't measured in money.",
        },
        basarisizSonuc: {
          mesaj: "The handover happened, but at a lower price than hoped.",
          detay: "Haste weakens your bargaining.",
        },
      },
      {
        metin: "Refuse, wait for a higher offer.",
        basariliSonuc: {
          mesaj: "Months later another buyer offered far more.",
          detay: "Patience sometimes pays big.",
        },
        basarisizSonuc: {
          mesaj: "No buyer came; the factory lost value and the workers withdrew.",
          detay: "The awaited chance sometimes never returns.",
        },
      },
    ],
  },

  sd_tuccar_rakibin_iflasi: {
    baslik: "Your Rival's Collapse",
    metin:
      "{rakip}'s business is near bankruptcy. You can grab his assets cheap or lend him money to stay afloat.",
    secenekler: [
      {
        metin: "Exploit the collapse, grab his assets.",
        basariliSonuc: {
          mesaj:
            "You took {rakip}'s client list and warehouse for a song; hostility deepened.",
          detay: "Some chances grow from others' wreckage.",
        },
        basarisizSonuc: {
          mesaj: "Creditors broke the deal; you lost money and gained nothing.",
          detay: "Some wreckage strikes back.",
        },
      },
      {
        metin: "Lend him money, help him survive.",
        basariliSonuc: {
          mesaj:
            "{rakip} recovered and remembered; you now have a wary ally.",
          detay: "Some debts are repaid in loyalty.",
        },
        basarisizSonuc: {
          mesaj: "Despite your loan, {rakip} went under; your money went with him.",
          detay: "Kindness doesn't always return.",
        },
      },
    ],
  },

  sd_tuccar_para_devaluasyonu: {
    baslik: "The Currency's Fall",
    metin:
      "Word is the government will devalue the currency. If true, turning cash into goods saves you; if wrong, you waste commission.",
    secenekler: [
      {
        metin: "Convert most cash to goods/gold now.",
        basariliSonuc: {
          mesaj: "Devaluation hit; your goods kept their value, even gained.",
          detay: "A rumor heeded in time saves fortunes.",
        },
        basarisizSonuc: {
          mesaj: "The rumor was false; fees and commissions cost you for nothing.",
          detay: "Panic can become the disaster itself.",
        },
      },
      {
        metin: "Ignore the rumor, stay in cash.",
        basariliSonuc: {
          mesaj: "The rumor was false; caution cost you nothing.",
          detay: "Sometimes doing nothing is right.",
        },
        basarisizSonuc: {
          mesaj: "Devaluation was real; your cash lost value overnight.",
          detay: "Some storms strike on arrival, not on rumor.",
        },
      },
    ],
  },
};
