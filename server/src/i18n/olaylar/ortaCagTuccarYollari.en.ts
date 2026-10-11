import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagTuccarYollari.ts — İngilizce çevirileri (45 olay). */
export const OLAYLAR_ORTACAG_TUCCAR_YOLLARI_EN: Record<string, OlayCeviri> = {
  oc_tuccar_yol_ilk_anlasma: {
    baslik: "The First Deal",
    metin:
      "Your master hands you your first big deal: monks want famine-year seed wheat, but your only batch is poor and scarce.",
    secenekler: [
      {
        metin: "Tell the truth, offer a fair price.",
        basariliSonuc: {
          mesaj: "The monks marveled at your honesty; a small, solid deal.",
          detay: "One honest sentence builds a name.",
        },
        basarisizSonuc: {
          mesaj: "Honesty cheapened the deal, but your conscience is clear.",
          detay: "The right path can cost short-term.",
        },
      },
      {
        metin: "Hide the flaw, sell at full price.",
        basariliSonuc: {
          mesaj: "The monks paid full price unaware; your chest filled.",
          detay: "The first trick is sweet; the rest is habit.",
        },
        basarisizSonuc: {
          mesaj: "The monks caught the trick; money taken, name stained in the guild.",
          detay: "Some lies chase you past the sale.",
        },
      },
      {
        metin: "Smuggle the goods to another buyer by night.",
        basariliSonuc: {
          mesaj: "The goods changed hands in the dark; profit doubled.",
          detay: "Shadow work rarely lets you go.",
        },
        basarisizSonuc: {
          mesaj: "Word of the smuggling reached the guild; you lost goods and reputation.",
          detay: "Those in darkness trip on their shadow.",
        },
      },
      {
        metin: "Sell at cost, cover the rest yourself.",
        basariliSonuc: {
          mesaj: "The monks call you the region's most generous merchant; word spread.",
          detay: "Some investments return as reputation.",
        },
        basarisizSonuc: {
          mesaj: "Your sacrifice went unrewarded, but your intent was clear.",
          detay: "Generosity goes unapplauded but not unrecorded.",
        },
      },
    ],
  },

  // ─────────────────────────── HONEST ───────────────────────────
  oc_tuccar_yol_durust_kalp_sozu: {
    baslik: "A False Word",
    metin:
      "A merchant offers you a share if you secretly mix bad goods into your rival's stall. No one would know.",
    secenekler: [
      {
        metin: "Refuse, warn your rival.",
        basariliSonuc: {
          mesaj: "Your rival was stunned; a solid trust grew between you.",
          detay: "Honesty turns foes into friends.",
        },
        basarisizSonuc: {
          mesaj: "You warned him, but the schemer turned on you; a small customer lost.",
          detay: "Truth-telling sometimes costs you.",
        },
      },
      {
        metin: "Stay silent, neither yes nor no.",
        basariliSonuc: {
          mesaj: "You said nothing; it died down, but unease stayed.",
          detay: "Silence is easy but uneasy.",
        },
        basarisizSonuc: {
          mesaj: "Your rival found the trick and blamed you for staying silent.",
          detay: "Neutrality doesn't look innocent.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_kotu_anlasma: {
    baslik: "A Bad Deal",
    metin:
      "Last season's deal now costs you dearly after prices fell. There's a legal way out.",
    secenekler: [
      {
        metin: "Keep your word, bear the loss.",
        basariliSonuc: {
          mesaj: "The other side was stunned; the guild calls you 'a man of his word'.",
          detay: "Reputation is earned through loyalty at a loss.",
        },
        basarisizSonuc: {
          mesaj: "You kept your word but no one noticed; the loss stayed, no thanks.",
          detay: "Virtue is sometimes silent.",
        },
      },
      {
        metin: "Slip out through the legal loophole.",
        basariliSonuc: {
          mesaj: "You saved the money, but can't forget the other side's disappointment.",
          detay: "Right on paper, wrong in conscience.",
        },
        basarisizSonuc: {
          mesaj: "The trick was found out; you lost the money and became 'the oath-breaker'.",
          detay: "Shortcuts sometimes cost double.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_cirak_egitimi: {
    baslik: "The Apprentice's Education",
    metin:
      "Your apprentice proudly says he's learned to cheat customers for extra profit, and awaits your approval.",
    secenekler: [
      {
        metin: "Teach him honesty's value.",
        basariliSonuc: {
          mesaj: "He sulked, then understood; he'll run an honest stall.",
          detay: "The best legacy is a taught principle.",
        },
        basarisizSonuc: {
          mesaj: "He listened but wasn't convinced; he left muttering about money.",
          detay: "Not every lesson takes root.",
        },
      },
      {
        metin: "Ignore it, let profit talk.",
        basariliSonuc: {
          mesaj: "You said nothing; he profited short-term, but unease remained.",
          detay: "Silence sounds like approval.",
        },
        basarisizSonuc: {
          mesaj: "His trick spread among customers; your name got tied to it.",
          detay: "What you don't teach speaks for you.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_pazar_hakemligi: {
    baslik: "Market Arbiter",
    metin:
      "Two stall owners are about to brawl over a boundary; both chose you as arbiter for your trusted word.",
    secenekler: [
      {
        metin: "Draw a fair line, hear both.",
        basariliSonuc: {
          mesaj: "Both sides were satisfied; the market calls you the 'fair word'.",
          detay: "Those who deal justice gain most.",
        },
        basarisizSonuc: {
          mesaj: "No one was fully pleased, but no fight broke out.",
          detay: "Arbitration brings grumbling, not thanks.",
        },
      },
      {
        metin: "Stay out of it.",
        basariliSonuc: {
          mesaj: "You stayed out; they shouted while you stayed calm at your stall.",
          detay: "You needn't enter every fight.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal sparked rumors that your word is worthless.",
          detay: "Silence is an answer, and misread.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_rakip_zoru: {
    baslik: "The Rival's Struggle",
    metin:
      "A small rival stall can't match your prices and is sinking. Cut once more and he's gone from the market.",
    secenekler: [
      {
        metin: "Hold your price, share the square.",
        basariliSonuc: {
          mesaj: "You held your price; {rakip} survived, and the market spoke of your fairness.",
          detay: "Winning needn't mean crushing.",
        },
        basarisizSonuc: {
          mesaj: "Your price held but the season was bad; profit dipped.",
          detay: "The right path sometimes costs.",
        },
      },
      {
        metin: "Push him out with a small discount.",
        basariliSonuc: {
          mesaj: "His stall closed; the market is yours, but his gaze lingers.",
          detay: "Some victories taste bitter.",
        },
        basarisizSonuc: {
          mesaj: "He didn't close and complained to the guild; your honest image cracked.",
          detay: "Cruelty may fail, but it leaves a mark.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_veresiye: {
    baslik: "Credit",
    metin:
      "A poor family asks for flour on credit to survive winter; no guarantee, only their word.",
    secenekler: [
      {
        metin: "Trust them, give credit.",
        basariliSonuc: {
          mesaj: "The family repaid more than owed by summer; their word beat any note.",
          detay: "Trust sometimes returns with interest.",
        },
        basarisizSonuc: {
          mesaj: "They survived winter but never repaid; you didn't chase them.",
          detay: "No regret for unrepaid kindness.",
        },
      },
      {
        metin: "Refuse, your rule is cash up front.",
        basariliSonuc: {
          mesaj: "You kept your rule; coin stayed yours, their despair stayed in your mind.",
          detay: "Some right choices feel bad.",
        },
        basarisizSonuc: {
          mesaj: "Word of your refusal spread; a few found you harsh.",
          detay: "When rules outrank mercy, there's a cost.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_sahte_mal: {
    baslik: "Fake Goods",
    metin:
      "A merchant offers a big batch of cheap 'silk'; you feel it's fake. Whether he knows is unclear.",
    secenekler: [
      {
        metin: "Refuse, and tell him.",
        basariliSonuc: {
          mesaj: "The seller was stunned and grateful; maybe he was fooled too.",
          detay: "A warning can start a friendship.",
        },
        basarisizSonuc: {
          mesaj: "He ignored you and sold it to another; at least your conscience is clear.",
          detay: "Truth doesn't save everyone.",
        },
      },
      {
        metin: "Buy cheap, sell as real silk.",
        basariliSonuc: {
          mesaj: "You turned fake silk into profit, breaking a promise to yourself.",
          detay: "One shortcut changes your path's color.",
        },
        basarisizSonuc: {
          mesaj: "The buyer spotted it and complained to the guild; your honest name is shaken.",
          detay: "A dirty path never fits a clean name.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_yabanci_tuccar: {
    baslik: "The Foreign Merchant",
    metin:
      "Everyone gouges a foreign merchant from beyond {bolge}. You could tell him the real price.",
    secenekler: [
      {
        metin: "Show him the fair price.",
        basariliSonuc: {
          mesaj: "The foreigner was grateful and later traded with you regularly.",
          detay: "Honesty builds partnerships across borders.",
        },
        basarisizSonuc: {
          mesaj: "He thanked you but never returned.",
          detay: "Kindness expects nothing back.",
        },
      },
      {
        metin: "Quote high, like the rest.",
        basariliSonuc: {
          mesaj: "He paid without question; profitable, but unease stayed.",
          detay: "Fooling the unwary is a debt.",
        },
        basarisizSonuc: {
          mesaj: "He learned the real price and called you a gouger around the market.",
          detay: "Rumor spreads without a translator.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_soylu_teklifi: {
    baslik: "The Noble's Offer",
    metin:
      "A noble promises steady business if you understate your goods on the tax record. Refuse, and the door may close.",
    secenekler: [
      {
        metin: "Politely refuse, keep records true.",
        basariliSonuc: {
          mesaj: "The noble raged, then respected your honesty and gave you work again.",
          detay: "Some refusals earn respect.",
        },
        basarisizSonuc: {
          mesaj: "The noble took offense and gave his business elsewhere.",
          detay: "Honesty sometimes closes a door.",
        },
      },
      {
        metin: "Accept, quietly falsify the record.",
        basariliSonuc: {
          mesaj: "The noble is pleased, money flows, but your conscience won't hush.",
          detay: "A bent principle never stands straight.",
        },
        basarisizSonuc: {
          mesaj: "The collector found the discrepancy; the noble disowned you, you paid alone.",
          detay: "Noble promises vanish when fines arrive.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_lonca_liderligi: {
    baslik: "Guild Leadership",
    metin:
      "The guild elders, citing your honesty, want you on the council, but your rulings may cross old friends.",
    secenekler: [
      {
        metin: "Accept, keep your principles.",
        basariliSonuc: {
          mesaj: "Your rulings angered old friends, but the guild began to trust you.",
          detay: "Justice sometimes outranks friendship.",
        },
        basarisizSonuc: {
          mesaj: "Your rulings were fair, but an old friend never forgave you.",
          detay: "Being right can leave you alone.",
        },
      },
      {
        metin: "Decline, stay at your stall.",
        basariliSonuc: {
          mesaj: "Your peace stayed, but your guild voice passed to another.",
          detay: "You needn't take every chance.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal let the masters down: 'he runs from duty'.",
          detay: "Stepping back has a price too.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_efsane: {
    baslik: "The Worth of Your Word",
    metin:
      "You never broke your word in years. A young merchant wants to be like you and asks the way.",
    secenekler: [
      {
        metin: "Tell him: your word beats any note.",
        basariliSonuc: {
          mesaj: "The young merchant memorized your words; you'll be known as 'word is bond'.",
          detay: "Some legacies lie in words, not gold.",
        },
        basarisizSonuc: {
          mesaj: "You told him, but he didn't listen; some lessons are learned by living.",
          detay: "Not every seed sprouts in every soil.",
        },
      },
      {
        metin: "Skip the wisdom, hand him a purse.",
        basariliSonuc: {
          mesaj: "You handed him a purse and left; practical, but cold.",
          detay: "Sometimes copper beats wisdom.",
        },
        basarisizSonuc: {
          mesaj: "The young man refused the money; you can't forget his disappointment.",
          detay: "Some want answers, not alms.",
        },
      },
    ],
  },

  // ─────────────────────────── GREEDY ───────────────────────────
  oc_tuccar_yol_acgozlu_kitlik_fiyati: {
    baslik: "Famine Price",
    metin:
      "A bad harvest has grain at its peak. You could sell your stock at triple price, but the villagers are starving.",
    secenekler: [
      {
        metin: "Push the price to the peak, sell it all.",
        basariliSonuc: {
          mesaj: "You sold at triple; your chest filled, but villagers cursed you.",
          detay: "Profiting from hunger is never forgotten.",
        },
        basarisizSonuc: {
          mesaj: "The guild warned you over gouging; still, some profit came.",
          detay: "Greed draws watchful eyes.",
        },
      },
      {
        metin: "Sell at the normal price.",
        basariliSonuc: {
          mesaj: "You held the price; small profit and a pang of 'I missed out'.",
          detay: "Greed is a habit, hard to drop.",
        },
        basarisizSonuc: {
          mesaj: "Another merchant gouged on the same stock and out-earned you.",
          detay: "Virtue's price is sometimes another's profit.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_pazar_tekeli: {
    baslik: "Market Monopoly",
    metin:
      "A chance to corner the region's salt: buy out three small merchants and you set the price.",
    secenekler: [
      {
        metin: "Buy all three, set the price.",
        basariliSonuc: {
          mesaj: "You seized the salt market; you now set the prices.",
          detay: "Buying a market buys its soul.",
        },
        basarisizSonuc: {
          mesaj: "One backed out and complained to the guild; half the investment was lost.",
          detay: "Greed trips over its own feet.",
        },
      },
      {
        metin: "Buy just one, split the risk.",
        basariliSonuc: {
          mesaj: "You bought one; not the whole market, but your share grew.",
          detay: "Small greed is still greed, just cautious.",
        },
        basarisizSonuc: {
          mesaj: "The stall you bought didn't earn as expected.",
          detay: "Not every greedy sum adds up.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_rakip_ezme: {
    baslik: "Crushing the Rival",
    metin:
      "A small rival is stealing your customers. You could sink him with rumor, or compete.",
    secenekler: [
      {
        metin: "Spread a false rumor, ruin his name.",
        basariliSonuc: {
          mesaj: "The rumor took; his customers fled and his stall closed.",
          detay: "One lie can ruin a life.",
        },
        basarisizSonuc: {
          mesaj: "You were exposed as the source; your name was soiled in the guild.",
          detay: "Slander returns to its source.",
        },
      },
      {
        metin: "Win customers back with better service.",
        basariliSonuc: {
          mesaj: "You competed openly; most customers came back.",
          detay: "To win, simply do better.",
        },
        basarisizSonuc: {
          mesaj: "Your effort fell short; a few customers stayed with him.",
          detay: "Competition doesn't always pay.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_rusvet: {
    baslik: "Bribing the Official",
    metin:
      "A tax official probes your income, hinting a small bribe could 'lose' his report.",
    secenekler: [
      {
        metin: "Pay the bribe, end the problem.",
        basariliSonuc: {
          mesaj: "The report 'vanished', but he'll now milk you yearly.",
          detay: "A bribe once paid never ends.",
        },
        basarisizSonuc: {
          mesaj: "He took the bribe and reported you anyway; money and name lost.",
          detay: "Some officials take from both sides.",
        },
      },
      {
        metin: "Refuse, take the risk.",
        basariliSonuc: {
          mesaj: "He poked around, found nothing, and dropped it.",
          detay: "Risk can cost less than bowing.",
        },
        basarisizSonuc: {
          mesaj: "Your real income surfaced; a heavy tax fine followed.",
          detay: "Greed's trail may not let go.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_sulandirma: {
    baslik: "Watered-Down Goods",
    metin:
      "Mix wine with water and spices with cheap herbs for nearly double the stock. No one may notice, or they may.",
    secenekler: [
      {
        metin: "Water it down, boost the quantity.",
        basariliSonuc: {
          mesaj: "The watered goods went unnoticed; your chest doubled.",
          detay: "A trick looks like profit while silent.",
        },
        basarisizSonuc: {
          mesaj: "A customer spotted it and shouted across the square; all heard.",
          detay: "Watered goods water down your name.",
        },
      },
      {
        metin: "Sell the goods as they are.",
        basariliSonuc: {
          mesaj: "You sold it plain; ordinary profit, no trouble.",
          detay: "Setting greed aside is strategy too.",
        },
        basarisizSonuc: {
          mesaj: "The market was slow; even normal sales barely happened.",
          detay: "Not every day pays.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_isci_somurusu: {
    baslik: "The Weight of the Load",
    metin:
      "Your caravan workers are exhausted; cut wages and stretch hours and the caravan runs far cheaper.",
    secenekler: [
      {
        metin: "Cut wages, lengthen hours.",
        basariliSonuc: {
          mesaj: "Workers grumbled but bore it; costs fell, your chest swelled.",
          detay: "Some profit comes off another's back.",
        },
        basarisizSonuc: {
          mesaj: "Two workers quit overnight; replacing them cost more than expected.",
          detay: "Even exploitation has a ceiling.",
        },
      },
      {
        metin: "Leave wages alone.",
        basariliSonuc: {
          mesaj: "You left wages alone; the caravan ran as usual.",
          detay: "Sometimes standing pat is smartest.",
        },
        basarisizSonuc: {
          mesaj: "Rivals cut wages, leaving your costs relatively high.",
          detay: "Avoiding greed can cost too.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_lonca_tehdidi: {
    baslik: "Guild Warning",
    metin:
      "The guild threatens expulsion over mounting complaints. Apologize, or buy off a few masters.",
    secenekler: [
      {
        metin: "Apologize publicly.",
        basariliSonuc: {
          mesaj: "Your apology calmed the guild; expulsion passed, but pride took a blow.",
          detay: "Bowing is sometimes the crown's price.",
        },
        basarisizSonuc: {
          mesaj: "Your apology rang insincere; the guild put you under watch.",
          detay: "A hollow apology mends no trust.",
        },
      },
      {
        metin: "Buy off a few masters.",
        basariliSonuc: {
          mesaj: "The masters fell silent; complaints vanished from the records.",
          detay: "Silence can be bought; the price rises.",
        },
        basarisizSonuc: {
          mesaj: "Your bribery came out; the guild suspended you.",
          detay: "Bought silence one day talks.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_nefret: {
    baslik: "The Feared Man",
    metin:
      "Even children flee at your name in the market; your wealth is beyond doubt, but no one smiles sincerely.",
    secenekler: [
      {
        metin: "Don't care, your wealth is enough.",
        basariliSonuc: {
          mesaj: "You focused on your chest; money grew, and so did loneliness.",
          detay: "Wealth can be a silent prison.",
        },
        basarisizSonuc: {
          mesaj: "You claimed not to care, but the empty table haunted your nights.",
          detay: "Truths aren't ignored, only postponed.",
        },
      },
      {
        metin: "Soften your image: fund a festival.",
        basariliSonuc: {
          mesaj: "You funded the festival; some stay wary, but you saw a few smiles.",
          detay: "Love can't be bought, but may crack the door.",
        },
        basarisizSonuc: {
          mesaj: "Your gesture read as 'guilt money'; no one felt grateful.",
          detay: "Years of hatred don't melt in one festival.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_asiri_hirs: {
    baslik: "Excess Ambition",
    metin:
      "Invest everything in one giant fleet and you may become the region's richest merchant, or lose it all in a storm.",
    secenekler: [
      {
        metin: "Invest everything, play big.",
        basariliSonuc: {
          mesaj: "The fleet returned laden with gold; overnight you were the region's richest.",
          detay: "Some gambles enter history.",
        },
        basarisizSonuc: {
          mesaj: "The fleet sank in a storm; most of your fortune lies at the seabed.",
          detay: "Greed digs its own grave.",
        },
      },
      {
        metin: "Be cautious, split the investment.",
        basariliSonuc: {
          mesaj: "You split the investment; modest but safe profit.",
          detay: "Reining in greed is a calculation too.",
        },
        basarisizSonuc: {
          mesaj: "One small fleet was hit, but the loss stayed limited.",
          detay: "Split risk means split loss.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_miras_kavgasi: {
    baslik: "The Inheritance Fight",
    metin:
      "{cocuk} wants a share of your fortune now, saying they learned ambition from you. Buy peace, or protect your savings.",
    secenekler: [
      {
        metin: "Give the share, buy peace.",
        basariliSonuc: {
          mesaj: "You gave the share; {cocuk} softened for a while.",
          detay: "Some debts are paid in patience.",
        },
        basarisizSonuc: {
          mesaj: "You gave the share, but it wasn't enough; the demands grew.",
          detay: "Greed is learned, maybe from you.",
        },
      },
      {
        metin: "Refuse: every coin must be earned.",
        basariliSonuc: {
          mesaj: "You refused; {cocuk} left resentful, but your fortune stayed whole.",
          detay: "Ambition's legacy can displace love.",
        },
        basarisizSonuc: {
          mesaj: "The refusal became a bitter fight; {cocuk} stayed away long.",
          detay: "Greed's bill comes from your own blood.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_yalniz_olum: {
    baslik: "A Golden Loneliness",
    metin:
      "Your warehouses are full, but no one sits at your table. The fortune you chased echoes in a castle you sit in alone.",
    secenekler: [
      {
        metin: "Accept your wealth, pay the price.",
        basariliSonuc: {
          mesaj: "Your chest is full, your name known; but the castle's silence roars.",
          detay: "Wealth hides loneliness, doesn't fill it.",
        },
        basarisizSonuc: {
          mesaj: "The silence was unbearable; you felt your fortune's price at last.",
          detay: "Some bills come late, but they come.",
        },
      },
      {
        metin: "Give away wealth, win old friends back.",
        basariliSonuc: {
          mesaj: "A few old friends returned; your table isn't wholly empty.",
          detay: "Even a late hand finds a response.",
        },
        basarisizSonuc: {
          mesaj: "The money bought no real bond; loneliness stayed.",
          detay: "Gold can't buy back lost years.",
        },
      },
    ],
  },

  // ─────────────────────────── SMUGGLER ───────────────────────────
  oc_tuccar_yol_kacakci_gece_yuku: {
    baslik: "Night Cargo",
    metin:
      "A tax-free cargo ship will dock after dark; you must get the goods into the city unseen.",
    secenekler: [
      {
        metin: "Carry it alone by a quiet path.",
        basariliSonuc: {
          mesaj: "You slipped the load in unseen; all the profit is yours.",
          detay: "Shadows are sometimes the best partner.",
        },
        basarisizSonuc: {
          mesaj: "A patrol spotted you; fleeing, you abandoned part of the load.",
          detay: "Darkness hides your pursuer too.",
        },
      },
      {
        metin: "Partner with a trusted local gang.",
        basariliSonuc: {
          mesaj: "The gang used known paths; the load arrived safely; you shared the profit.",
          detay: "Going solo isn't always smart in smuggling.",
        },
        basarisizSonuc: {
          mesaj: "The gang met a patrol; some cargo was lost, but you slipped away.",
          detay: "Partnership splits risk, not erases it.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_muhafiz_rusveti: {
    baslik: "The Gate Guard",
    metin:
      "The gate guard promises your goods pass unsearched in exchange for a regular bribe.",
    secenekler: [
      {
        metin: "Accept, pay regularly.",
        basariliSonuc: {
          mesaj: "The guard kept his word; you now have a safe gate.",
          detay: "A fixed link has a fixed price.",
        },
        basarisizSonuc: {
          mesaj: "At shift change the new guard searched you thoroughly.",
          detay: "A bribe is a chance, not a guarantee.",
        },
      },
      {
        metin: "Refuse, try other gates.",
        basariliSonuc: {
          mesaj: "You slipped through another gate; nothing left your pocket.",
          detay: "Being unpredictable is the best defense.",
        },
        basarisizSonuc: {
          mesaj: "An unexpected search caught you; most of your goods were seized.",
          detay: "Dodging a bribe can cost more.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_suc_orgutu: {
    baslik: "The Man in the Shadows",
    metin:
      "The man running the region's crime ring wants a partnership; refusing is dangerous, accepting puts you under his command.",
    secenekler: [
      {
        metin: "Accept, take his protection.",
        basariliSonuc: {
          mesaj: "Under his wing no one touches you, but you must obey his orders.",
          detay: "Protection can be a chain's name.",
        },
        basarisizSonuc: {
          mesaj: "Partnership accepted, but the first 'task' troubled your conscience.",
          detay: "Who deals with shadow struggles to return to light.",
        },
      },
      {
        metin: "Politely refuse, go your own way.",
        basariliSonuc: {
          mesaj: "He took the refusal calmly and, for now, left you be.",
          detay: "Independence sometimes comes as a gift.",
        },
        basarisizSonuc: {
          mesaj: "He disliked the refusal; part of your warehouse mysteriously 'vanished'.",
          detay: "Refusing the shadow has a price.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_vergi_memuru: {
    baslik: "The Tax Official's Shadow",
    metin:
      "The new tax official wants your ledgers. Your hasty fake records may not survive a careful look.",
    secenekler: [
      {
        metin: "Present the fake ledger with confidence.",
        basariliSonuc: {
          mesaj: "He glanced over it and approved; your real income stayed hidden.",
          detay: "Poise can beat the best forgery.",
        },
        basarisizSonuc: {
          mesaj: "He spotted the discrepancy; a heavy fine and close watch followed.",
          detay: "Hasty lies can't dodge careful eyes.",
        },
      },
      {
        metin: "Send him off 'consulting', buy time.",
        basariliSonuc: {
          mesaj: "He was kept away for weeks; you tidied the ledgers.",
          detay: "Time is a better cover than money.",
        },
        basarisizSonuc: {
          mesaj: "He returned at once, more suspicious than before.",
          detay: "Some delays backfire.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_ucu_ucuna: {
    baslik: "A Close Call",
    metin:
      "A raid nearly found your hidden contraband; the guards left on another clue at the last moment. Your heart still pounds.",
    secenekler: [
      {
        metin: "Take the lesson, slow down.",
        basariliSonuc: {
          mesaj: "You looked clean a while; the guards' suspicion faded.",
          detay: "Sometimes the best move is none.",
        },
        basarisizSonuc: {
          mesaj: "Your slowdown sent some customers to other smugglers.",
          detay: "Caution has a cost.",
        },
      },
      {
        metin: "Ignore the fear, keep the pace.",
        basariliSonuc: {
          mesaj: "Luck held again; the caravan ran uninterrupted.",
          detay: "Courage or recklessness: a thin line.",
        },
        basarisizSonuc: {
          mesaj: "Luck ran out; the next raid half-emptied the warehouse.",
          detay: "Cross the same bridge enough and you fall.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_sinir_otesi: {
    baslik: "Cross-Border Connection",
    metin:
      "A neighboring merchant proposes a permanent two-way smuggling line: big profit, but it breaks two kingdoms' laws.",
    secenekler: [
      {
        metin: "Set up the line, widen your network.",
        basariliSonuc: {
          mesaj: "The line is set; you now run steady secret trade between regions.",
          detay: "Borders divide law, not smugglers.",
        },
        basarisizSonuc: {
          mesaj: "The first shipment was caught; both regions took notice.",
          detay: "Two laws, double the danger.",
        },
      },
      {
        metin: "Refuse, keep your current line.",
        basariliSonuc: {
          mesaj: "You declined; business stayed small but manageable.",
          detay: "Not every chance is worth the risk.",
        },
        basarisizSonuc: {
          mesaj: "He took the offer elsewhere; that line is now your rival's.",
          detay: "Refused chances fall into others' pockets.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_ihbar: {
    baslik: "The Threat of Informing",
    metin:
      "Your old partner, who knows your secrets, threatens to report you to the guards unless you pay a big hush sum.",
    secenekler: [
      {
        metin: "Pay the hush money.",
        basariliSonuc: {
          mesaj: "You paid; secrets stay buried, but he now holds a lasting card.",
          detay: "Who bows once to blackmail bows always.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but he wasn't sated and returned demanding more.",
          detay: "Hush money delays, not silences.",
        },
      },
      {
        metin: "Ignore the threat, let him report.",
        basariliSonuc: {
          mesaj: "He was bluffing; no report came, and you paid nothing.",
          detay: "The best defense is showing no fear.",
        },
        basarisizSonuc: {
          mesaj: "He did report; guards raided your depot and seized most goods.",
          detay: "A lost gamble brings a heavy bill.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_ortak_ihanet: {
    baslik: "The Partner's Betrayal",
    metin:
      "Your trusted partner meant to take your share and flee; you caught him before delivery.",
    secenekler: [
      {
        metin: "Forgive him but end the partnership.",
        basariliSonuc: {
          mesaj: "You recovered your goods and ended it quietly; no blood spilled.",
          detay: "Even in the dark, conscience exists.",
        },
        basarisizSonuc: {
          mesaj: "He begged forgiveness, but part of your goods was already gone.",
          detay: "Betrayal's trace never fully fades.",
        },
      },
      {
        metin: "Teach a hard lesson so none dares.",
        basariliSonuc: {
          mesaj: "Word spread; no one dares steal from you now.",
          detay: "Fear buys loyalty, never love.",
        },
        basarisizSonuc: {
          mesaj: "The fight escalated; you lost part of your goods and were wounded.",
          detay: "Violence spins out of control.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_gizli_depo: {
    baslik: "Secret Warehouse Raid",
    metin:
      "Guards are combing your neighborhood on a tip; your hidden warehouse is nearly found. Decide fast.",
    secenekler: [
      {
        metin: "Move the goods now, risk it.",
        basariliSonuc: {
          mesaj: "You moved in time; the guards found an empty depot.",
          detay: "Speed is the best hiding.",
        },
        basarisizSonuc: {
          mesaj: "Guards raided mid-move; your years-long stash vanished overnight.",
          detay: "Some losses can't be undone.",
        },
      },
      {
        metin: "Leave the depot, stay unnoticed.",
        basariliSonuc: {
          mesaj: "The guards swept the area and left, missing the depot.",
          detay: "Sometimes the safest move is stillness.",
        },
        basarisizSonuc: {
          mesaj: "The depot was found; goods seized, your name on the blacklist.",
          detay: "Waiting can be the riskiest gamble.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_derinlesme: {
    baslik: "Deeper Waters",
    metin:
      "The shadow network's chief now wants you to smuggle people, not just goods: far more money, a far heavier crime.",
    secenekler: [
      {
        metin: "Accept, expand your work.",
        basariliSonuc: {
          mesaj: "Your chest filled fast, but you're in the darkest corner now.",
          detay: "Each step deeper closes the way back.",
        },
        basarisizSonuc: {
          mesaj: "The first shipment ended in disaster; you're now among the region's most wanted.",
          detay: "Drowning in deep water is worse.",
        },
      },
      {
        metin: "Draw your line, carry goods only.",
        basariliSonuc: {
          mesaj: "You drew your line; the boss, though angry, let you continue.",
          detay: "Even in the dark, you can draw a line.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered the boss; he took back some 'privileges'.",
          detay: "Drawing a line has a price too.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_hesap_yuzlesmesi: {
    baslik: "A Reckoning",
    metin:
      "You lived years in the shadows. Now the question: a clean retirement, or one last big score?",
    secenekler: [
      {
        metin: "Leave it all, withdraw quietly.",
        basariliSonuc: {
          mesaj: "You withdrew quietly; behind you lie years of fear and regret.",
          detay: "Some paths bring peace once left.",
        },
        basarisizSonuc: {
          mesaj: "Your exit angered old contacts; they demanded a 'farewell tax'.",
          detay: "Leaving the dark has a price too.",
        },
      },
      {
        metin: "One last big score, then quit.",
        basariliSonuc: {
          mesaj: "The score went unexpectedly well; a lifetime's fortune, then you quit.",
          detay: "Some legends are born at the door.",
        },
        basarisizSonuc: {
          mesaj: "It was a trap; you escaped capture but nearly lost everything.",
          detay: "Greed sinks even the most seasoned.",
        },
      },
    ],
  },

  // ─────────────────────────── CHARITABLE ───────────────────────────
  oc_tuccar_yol_hayirsever_imarethane: {
    baslik: "The Almshouse",
    metin:
      "You want to open a small soup kitchen for the city's homeless and orphans; costly, but it feeds many.",
    secenekler: [
      {
        metin: "Build it, run it regularly.",
        basariliSonuc: {
          mesaj: "The kitchen opened; dozens eat daily and bless your name.",
          detay: "Some returns are measured in plates.",
        },
        basarisizSonuc: {
          mesaj: "It opened to little interest; costs went on, thanks were scarce.",
          detay: "Kindness continues even when silent.",
        },
      },
      {
        metin: "Settle for small, irregular donations.",
        basariliSonuc: {
          mesaj: "Small gifts helped a few families; not an institution, but a start.",
          detay: "Every great deed starts with a small step.",
        },
        basarisizSonuc: {
          mesaj: "Donations stayed scattered and made no lasting impact.",
          detay: "Irregular kindness yields irregular results.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_ekmek_subvansiyon: {
    baslik: "Bread Subsidy",
    metin:
      "Grain hit the ceiling in a bad harvest; you could pay the difference so bakers keep bread at the old price.",
    secenekler: [
      {
        metin: "Cover the difference, hold the bread price.",
        basariliSonuc: {
          mesaj: "Bakers kept the old price; the city learned who was behind it.",
          detay: "A loaf can start a legend.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but the shortage was severe; prices still rose a bit.",
          detay: "Good intent can't beat nature.",
        },
      },
      {
        metin: "Help only family and close friends.",
        basariliSonuc: {
          mesaj: "Your close ones didn't go hungry; small but warm help.",
          detay: "Some kindness is deep, not wide.",
        },
        basarisizSonuc: {
          mesaj: "It wasn't enough; some friends still struggled.",
          detay: "A small hand sometimes falls short.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_cirak_burs: {
    baslik: "Apprentice's Scholarship",
    metin:
      "A poor family's gifted son can't join the guild without the apprenticeship fee. Pay it and a life may change.",
    secenekler: [
      {
        metin: "Cover his fee, give him a chance.",
        basariliSonuc: {
          mesaj: "The boy joined the guild and always called you 'my first chance'.",
          detay: "Some seeds outlive the sower.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but the boy quit the apprenticeship and went elsewhere.",
          detay: "Offering a chance is still worth it.",
        },
      },
      {
        metin: "Find him work, but skip the fee.",
        basariliSonuc: {
          mesaj: "You found him small jobs; no guild, but he didn't starve.",
          detay: "Small aid can't replace big aid.",
        },
        basarisizSonuc: {
          mesaj: "The jobs weren't enough; the boy went back to his family.",
          detay: "Half-steps don't reach the goal.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_kopru: {
    baslik: "Bridge Construction",
    metin:
      "No bridge crosses the river splitting the city; a few drown each winter. A bridge would swallow much of your fortune.",
    secenekler: [
      {
        metin: "Build the bridge from your own fortune.",
        basariliSonuc: {
          mesaj: "The bridge is done; the city named it after you.",
          detay: "A stone bridge outlives a name.",
        },
        basarisizSonuc: {
          mesaj: "Costs soared and years passed, but the bridge stands.",
          detay: "Great works demand patience.",
        },
      },
      {
        metin: "Rally the guild to share the cost.",
        basariliSonuc: {
          mesaj: "The merchants contributed; the bridge became a shared work.",
          detay: "Shared charity shines less, grows easier.",
        },
        basarisizSonuc: {
          mesaj: "Some never paid their share; the bridge stalled half-built.",
          detay: "Shared charity invites shared neglect.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_hastane: {
    baslik: "The Almshouse Infirmary",
    metin:
      "The city has no infirmary for the poor; the sick die at home. With a physician you could found a small one.",
    secenekler: [
      {
        metin: "Found it, put the physician on salary.",
        basariliSonuc: {
          mesaj: "The infirmary opened; the city calls you 'father of healing'.",
          detay: "Some buildings are built of gratitude.",
        },
        basarisizSonuc: {
          mesaj: "It opened, but one physician couldn't reach every patient.",
          detay: "Good intent has its limits.",
        },
      },
      {
        metin: "Donate to a monastery infirmary.",
        basariliSonuc: {
          mesaj: "Your gift expanded the monastery infirmary; more patients are treated.",
          detay: "Growing a good deed is charity too.",
        },
        basarisizSonuc: {
          mesaj: "The monastery redirected your gift to another need.",
          detay: "A gift slips from the giver's hand.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_artan_talep: {
    baslik: "Growing Expectation",
    metin:
      "Your generosity is now your name; you're the first called at every festival and disaster. The expectation wears you down.",
    secenekler: [
      {
        metin: "Keep giving all you can.",
        basariliSonuc: {
          mesaj: "You gave again; the city praises you, but weariness builds.",
          detay: "Generosity can buckle under its own weight.",
        },
        basarisizSonuc: {
          mesaj: "It wasn't enough; they grumbled 'not as generous as before'.",
          detay: "Expectation shrinks what you give.",
        },
      },
      {
        metin: "Gently set a limit: you can't help everyone.",
        basariliSonuc: {
          mesaj: "You set a limit; some understood, some sulked, you caught your breath.",
          detay: "Charity needs limits too.",
        },
        basarisizSonuc: {
          mesaj: "Rumors of 'he's changed' spread; some friends drifted away.",
          detay: "The known giver can't step back.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_isletme_dengesi: {
    baslik: "Business Balance",
    metin:
      "Your steward warns: donations have dangerously drained your capital. Pause and recover, or press on.",
    secenekler: [
      {
        metin: "Freeze donations a year, recover.",
        basariliSonuc: {
          mesaj: "A year's pause let the business breathe; some were disappointed.",
          detay: "Charity flows from a standing business.",
        },
        basarisizSonuc: {
          mesaj: "You paused, but recovery came slowly.",
          detay: "Recovery is slower than you think.",
        },
      },
      {
        metin: "Take the risk, keep donating.",
        basariliSonuc: {
          mesaj: "Capital is in danger, but the city loves you more.",
          detay: "The generous recall their books too late.",
        },
        basarisizSonuc: {
          mesaj: "Capital hit a critical low; you cancelled a few deals.",
          detay: "Generosity can topple a weak business.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_dilenci: {
    baslik: "The Beggar at Your Door",
    metin:
      "The old beggar at your stall asks far more than usual today, for his daughter's dowry.",
    secenekler: [
      {
        metin: "Give what he asks.",
        basariliSonuc: {
          mesaj: "The old man wept; at the wedding they blessed your name.",
          detay: "Some kindnesses enter family history.",
        },
        basarisizSonuc: {
          mesaj: "It wasn't enough; the wedding stayed modest.",
          detay: "Not all generosity reaches its aim.",
        },
      },
      {
        metin: "Give your usual small help.",
        basariliSonuc: {
          mesaj: "He left grateful; he'll solve the dowry another way.",
          detay: "Steady small kindness has value.",
        },
        basarisizSonuc: {
          mesaj: "He left a bit hurt, his hope unmet.",
          detay: "You can't please everyone always.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_din_adami_ortakligi: {
    baslik: "Spiritual Partnership",
    metin:
      "A local clergyman proposes a joint foundation to institutionalize your charity: your wealth, his organization.",
    secenekler: [
      {
        metin: "Found the foundation together.",
        basariliSonuc: {
          mesaj: "The foundation stands; your giving is now regular and organized.",
          detay: "Institutional charity outlives its founder.",
        },
        basarisizSonuc: {
          mesaj: "The foundation formed, but organizing crawled.",
          detay: "Big structures need patient hands.",
        },
      },
      {
        metin: "Keep giving alone, decline the partnership.",
        basariliSonuc: {
          mesaj: "You declined; you keep helping at your own pace.",
          detay: "Not every kindness must become an institution.",
        },
        basarisizSonuc: {
          mesaj: "The clergyman took it coldly; your closeness faded.",
          detay: "Some refusals open a distance.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_taklitciler: {
    baslik: "Fake Beggars",
    metin:
      "As your giving spreads, you notice fake 'needy' people spinning tales to squeeze steady money from you.",
    secenekler: [
      {
        metin: "Investigate, aid only the truly needy.",
        basariliSonuc: {
          mesaj: "The fake stories fell apart; the truly needy came first.",
          detay: "Charity needs open eyes.",
        },
        basarisizSonuc: {
          mesaj: "The probing hurt some truly needy; some took offense.",
          detay: "Suspicion wounds the innocent too.",
        },
      },
      {
        metin: "Ignore it, give to all equally.",
        basariliSonuc: {
          mesaj: "You gave to all; frauds grinned, but the truly needy ate too.",
          detay: "Some givers overlook the abuse.",
        },
        basarisizSonuc: {
          mesaj: "The guild started calling you the 'naive merchant'.",
          detay: "Boundless trust invites mockery.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_efsane: {
    baslik: "The Region's Legend",
    metin:
      "Your gifts, infirmary and bridge carry your name. The city's children want to grow up 'like you'.",
    secenekler: [
      {
        metin: "Give your last years to charity too.",
        basariliSonuc: {
          mesaj: "The city remembers you as a legend; a street bears your name.",
          detay: "Some names outlive their owners.",
        },
        basarisizSonuc: {
          mesaj: "Failing health limits your giving, but your intent holds; the city knows.",
          detay: "A tired hand can stay open.",
        },
      },
      {
        metin: "Enough; look after yourself, close the purse.",
        basariliSonuc: {
          mesaj: "A comfortable retirement, but your legend faded a little.",
          detay: "Every story falls silent someday.",
        },
        basarisizSonuc: {
          mesaj: "The city still expected more; your silence disappointed it.",
          detay: "Legends don't like retiring.",
        },
      },
    ],
  },
};
