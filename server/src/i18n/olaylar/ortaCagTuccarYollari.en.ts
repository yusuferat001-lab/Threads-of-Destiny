import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagTuccarYollari.ts — İngilizce çevirileri (45 olay). */
export const OLAYLAR_ORTACAG_TUCCAR_YOLLARI_EN: Record<string, OlayCeviri> = {
  oc_tuccar_yol_ilk_anlasma: {
    baslik: "The First Deal",
    metin:
      "Your master is handing you your first big deal: a community of monks wants seed wheat for the famine year, but the only batch you have is poor quality and scarce. How you close this deal will determine what kind of merchant you become from here on.",
    secenekler: [
      {
        metin: "Tell them the real state of the goods, offer a fair price.",
        basariliSonuc: {
          mesaj: "The monks were surprised by your honesty; a small but solid deal was signed.",
          detay: "Some reputations are built with a single honest sentence.",
        },
        basarisizSonuc: {
          mesaj: "Your honesty made the deal cheaper, but at least your conscience is at ease.",
          detay: "The right path sometimes costs you in the short term.",
        },
      },
      {
        metin: "Hide the flaw in the goods, sell at full price.",
        basariliSonuc: {
          mesaj: "The monks paid the full price without noticing; your chest filled fast.",
          detay: "The first deception is the sweetest; the ones after it become habit.",
        },
        basarisizSonuc: {
          mesaj: "The monks noticed the trick; you got the money but your name was stained in the guild.",
          detay: "Some lies don't let go even after the sale.",
        },
      },
      {
        metin: "Slip the goods to another buyer under cover of night.",
        basariliSonuc: {
          mesaj: "The goods changed hands in the dark, no one noticed; your profit doubled.",
          detay: "Whoever learns to work in the shadows rarely returns to the light.",
        },
        basarisizSonuc: {
          mesaj: "Word of your smuggling attempt reached the guild's ears; you lost both the goods and your reputation.",
          detay: "Those who walk in the dark sometimes trip on their own shadow.",
        },
      },
      {
        metin: "Sell it at cost, cover the rest out of your own pocket.",
        basariliSonuc: {
          mesaj: "The monks started calling you the most generous merchant in the region; the news spread village to village.",
          detay: "Some investments don't return to the coffer, but to the soul.",
        },
        basarisizSonuc: {
          mesaj: "Your sacrifice seemed to go unrewarded, but at least your intentions were plain.",
          detay: "Generosity isn't always applauded, but it's always written down somewhere.",
        },
      },
    ],
  },

  // ─────────────────────────── HONEST ───────────────────────────
  oc_tuccar_yol_durust_kalp_sozu: {
    baslik: "A False Word",
    metin:
      "Another merchant pulls you aside: if you secretly mix bad goods into your rival's stall, he'll offer you a share. Your name in the guild is still new; no one would find out.",
    secenekler: [
      {
        metin: "Turn down the offer, warn your rival directly.",
        basariliSonuc: {
          mesaj: "Your rival was surprised to hear your warning; a strange but solid trust was born between you.",
          detay: "Some enmities turn to friendship with a single act of honesty.",
        },
        basarisizSonuc: {
          mesaj: "You gave the warning, but the man who made the offer no longer likes you; you lost a small customer.",
          detay: "Telling the truth sometimes costs you out of pocket.",
        },
      },
      {
        metin: "Stay silent, say neither yes nor no to the offer.",
        basariliSonuc: {
          mesaj: "You said nothing to anyone; the matter died down on its own, but a discomfort remained inside you.",
          detay: "Silence is sometimes the easiest but most restless path.",
        },
        basarisizSonuc: {
          mesaj: "Your rival found the trick while checking his goods, and blamed you too for knowing and not speaking.",
          detay: "Neutrality doesn't always look innocent.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_kotu_anlasma: {
    baslik: "A Bad Deal",
    metin:
      "A deal you signed last season is now putting you in serious loss — the market price fell, paying the sum you agreed to will literally come out of your own pocket. There's also a legal way to break the deal.",
    secenekler: [
      {
        metin: "Keep your word, take on the loss.",
        basariliSonuc: {
          mesaj: "When you kept the deal to the letter the other side was stunned; you're now known in the guild as 'the man whose word is his bond'.",
          detay: "Some reputations are earned only through loyalty at a loss.",
        },
        basarisizSonuc: {
          mesaj: "You kept your word but no one even noticed; the loss stayed in your pocket, no thanks came.",
          detay: "Virtue is sometimes silent.",
        },
      },
      {
        metin: "Use the legal loophole and slip out of the deal.",
        basariliSonuc: {
          mesaj: "You used the loophole, saved the money; but you couldn't forget the disappointment in the other side's eyes.",
          detay: "Being right on paper isn't the same as being right in conscience.",
        },
        basarisizSonuc: {
          mesaj: "The trick was discovered; you lost both the money and started being known as 'the one who breaks his word'.",
          detay: "Shortcuts sometimes cost double.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_cirak_egitimi: {
    baslik: "The Apprentice's Education",
    metin:
      "Your apprentice proudly tells you he's learned how to cheat customers for extra profit — he's expecting your approval.",
    secenekler: [
      {
        metin: "Sit him down and explain the real value of honesty.",
        basariliSonuc: {
          mesaj: "Your apprentice sulked at first, then understood; he's now honest enough to one day run a stall carrying your name.",
          detay: "The best inheritance is a taught principle.",
        },
        basarisizSonuc: {
          mesaj: "Your apprentice listened but wasn't convinced; he walked off muttering 'it's all about the money'.",
          detay: "Not every lesson takes root.",
        },
      },
      {
        metin: "Ignore it, let the profit speak for itself.",
        basariliSonuc: {
          mesaj: "You said nothing; your apprentice's profit rose in the short run but a discomfort remained inside you.",
          detay: "Silence sometimes sounds like approval.",
        },
        basarisizSonuc: {
          mesaj: "Your apprentice's trick spread among customers; your name started being mentioned along with his.",
          detay: "What you don't teach speaks for you too.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_pazar_hakemligi: {
    baslik: "Market Arbiter",
    metin:
      "Two stall owners are about to come to blows over a boundary dispute; both chose you as arbiter because they trust your word.",
    secenekler: [
      {
        metin: "Draw a fair line, hear both sides equally.",
        basariliSonuc: {
          mesaj: "Your decision satisfied both sides; the marketplace started calling you the 'fair word'.",
          detay: "Hands that deal out justice, in the end, gain the most.",
        },
        basarisizSonuc: {
          mesaj: "Your decision didn't fully satisfy anyone, but at least a fight didn't break out.",
          detay: "Arbitration sometimes brings not thanks but grumbling.",
        },
      },
      {
        metin: "Stay out of it, don't get involved.",
        basariliSonuc: {
          mesaj: "You didn't get involved; the two sides yelled at each other and you stayed calm at your stall.",
          detay: "You don't have to enter every battle.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal to arbitrate led to rumors that your word carries no weight.",
          detay: "Sometimes silence is an answer too — and it's misread.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_rakip_zoru: {
    baslik: "The Rival's Struggle",
    metin:
      "A small rival stall can't compete with your prices and is about to go bankrupt. If you cut your price just a bit more, you could wipe him from the market entirely.",
    secenekler: [
      {
        metin: "Keep your price steady, live in the same square as your rival.",
        basariliSonuc: {
          mesaj: "You didn't cut your price; {rakip} survived and didn't forget it, and the market talked about your fairness.",
          detay: "You don't have to crush to win.",
        },
        basarisizSonuc: {
          mesaj: "Your price stayed steady but the season was already bad; your profit dipped slightly.",
          detay: "Walking the right path sometimes brings loss too.",
        },
      },
      {
        metin: "Push him out of the square with a small discount.",
        basariliSonuc: {
          mesaj: "Your rival closed his stall; the market is yours now, but you can't forget the look in his eyes.",
          detay: "Some victories leave a bitter taste.",
        },
        basarisizSonuc: {
          mesaj: "Your rival didn't close, and instead complained to the guild; your 'honest merchant' image cracked.",
          detay: "Cruelty doesn't always work, but it leaves a trace.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_veresiye: {
    baslik: "Credit",
    metin:
      "A poor family asks for flour on credit to get through the winter — there's no guarantee they can repay, only their word.",
    secenekler: [
      {
        metin: "Trust them, give it on credit.",
        basariliSonuc: {
          mesaj: "The family didn't forget the debt, when summer came they paid back more than enough; your word proved worth more than a note.",
          detay: "Trust sometimes returns with interest.",
        },
        basarisizSonuc: {
          mesaj: "The family got through the winter but never repaid the debt; you didn't chase it either.",
          detay: "Some kindnesses go unrewarded — still, you don't regret it.",
        },
      },
      {
        metin: "Refuse, you have a rule of payment up front.",
        basariliSonuc: {
          mesaj: "You held to your rule; the money stayed in your pocket, but the despair in the family's eyes stayed in your mind.",
          detay: "Some right decisions don't feel good.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was heard around the marketplace; a few people said they found you harsh.",
          detay: "Rules sometimes come before mercy, and that has a cost.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_sahte_mal: {
    baslik: "Fake Goods",
    metin:
      "A merchant wants to sell you a large batch of cheap 'silk' — when you touch the fabric, you realize it's fake. The seller acts as if he doesn't know, maybe he really doesn't.",
    secenekler: [
      {
        metin: "Refuse to buy, and tell him too.",
        basariliSonuc: {
          mesaj: "When you told him it was fake, the seller was stunned, and grateful to you; maybe he too had been fooled.",
          detay: "Sometimes a warning is the start of a friendship.",
        },
        basarisizSonuc: {
          mesaj: "He didn't heed your warning and sold the goods to another merchant; at least your conscience is clear.",
          detay: "Telling the truth doesn't save everyone.",
        },
      },
      {
        metin: "Buy it cheap, sell it to someone else as real silk.",
        basariliSonuc: {
          mesaj: "You turned the fake silk into profit, but in doing so you broke the promise you made to yourself.",
          detay: "One shortcut can change the color of your path.",
        },
        basarisizSonuc: {
          mesaj: "The buyer spotted the trick right away and complained to the guild; 'honest merchant' no longer fits you well.",
          detay: "A dirty path never settles onto a clean reputation.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_yabanci_tuccar: {
    baslik: "The Foreign Merchant",
    metin:
      "A merchant from outside {bolge}, barely speaking the language, came to the market; no one trusts him, everyone quotes exorbitant prices. You could show him the real price.",
    secenekler: [
      {
        metin: "Show him a fair price, guide him.",
        basariliSonuc: {
          mesaj: "The foreign merchant was grateful; a few months later he returned with goods from his own region, and started doing regular business with you.",
          detay: "Telling a stranger the truth sometimes builds a partnership across a border.",
        },
        basarisizSonuc: {
          mesaj: "He thanked you for your help but never appeared again; maybe his path never crossed here again.",
          detay: "Not every good deed is done expecting something in return.",
        },
      },
      {
        metin: "Quote a high price, just like the others.",
        basariliSonuc: {
          mesaj: "The foreigner paid without questioning the price; short term it was profitable but a discomfort remained inside you.",
          detay: "Fooling someone who doesn't know is still a debt, even if it looks like profit.",
        },
        basarisizSonuc: {
          mesaj: "The foreigner learned the real price from another merchant, and told the market you were a price gouger.",
          detay: "Rumor spreads even without a translator for the tongue.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_soylu_teklifi: {
    baslik: "The Noble's Offer",
    metin:
      "One of the region's nobles is promising you steady business in exchange for undervaluing your goods in the tax record. If you refuse, you may never do business with him again.",
    secenekler: [
      {
        metin: "Politely refuse the offer, keep the records true.",
        basariliSonuc: {
          mesaj: "The noble was angry at first, then said he respected your honesty; he called on you again for another job.",
          detay: "Some refusals are rewarded with unexpected respect.",
        },
        basarisizSonuc: {
          mesaj: "The noble was offended when you refused his offer, and from that day gave his business to another merchant.",
          detay: "Honesty sometimes closes a door for good.",
        },
      },
      {
        metin: "Accept, secretly falsify the record.",
        basariliSonuc: {
          mesaj: "You falsified the records, the noble was pleased, money started flowing steadily — but the honest voice inside you never went quiet.",
          detay: "A principle bent once never stands fully upright again.",
        },
        basarisizSonuc: {
          mesaj: "The tax collector noticed the discrepancy; the noble claimed not to know you, you paid the bill alone.",
          detay: "Nobles' promises evaporate the moment a fine is issued.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_lonca_liderligi: {
    baslik: "Guild Leadership",
    metin:
      "The guild's elder masters, citing your years of honesty as an example, want to give you a voice in the guild council — but this may require you to make decisions against the interests of some old friends.",
    secenekler: [
      {
        metin: "Accept the role, don't compromise your principles.",
        basariliSonuc: {
          mesaj: "You entered the council, your first decisions angered some old friends but the guild as a whole started trusting you.",
          detay: "Leadership sometimes requires choosing justice over friendship.",
        },
        basarisizSonuc: {
          mesaj: "Your decisions were fair, but one old friend never forgave you, things between you were never quite the same.",
          detay: "Being right sometimes leaves you alone.",
        },
      },
      {
        metin: "Turn down the role, stay at your stall.",
        basariliSonuc: {
          mesaj: "You turned down the role; your peace of mind stayed intact but your voice in the guild passed to someone else.",
          detay: "You don't have to accept every opportunity.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal disappointed some masters, they said you were 'running from responsibility'.",
          detay: "Stepping back can have a cost too.",
        },
      },
    ],
  },
  oc_tuccar_yol_durust_efsane: {
    baslik: "The Worth of Your Word",
    metin:
      "For years you never broke a single word. A young merchant says he wants to be like you and asks for your guidance — this is the moment to fit a lifetime's principle into a single sentence.",
    secenekler: [
      {
        metin: "Share the only truth you know: your word is worth more than a note.",
        basariliSonuc: {
          mesaj: "The young merchant memorized your words; years from now they'll still call you 'the one whose word is his bond' in the marketplace.",
          detay: "Some legacies aren't measured in gold, but in words.",
        },
        basarisizSonuc: {
          mesaj: "You told him, but the young man was struck more by life's harsh realities; maybe some lessons can only be learned by living them.",
          detay: "Not every seed sprouts in the same soil.",
        },
      },
    ],
  },

  // ─────────────────────────── GREEDY ───────────────────────────
  oc_tuccar_yol_acgozlu_kitlik_fiyati: {
    baslik: "Famine Price",
    metin:
      "A bad harvest year has come, grain prices are already at their peak. If you sell your grain stock now, you could sell it at triple the price — but the villagers are already struggling with hunger.",
    secenekler: [
      {
        metin: "Push the price to its peak, sell everything down to the last coin.",
        basariliSonuc: {
          mesaj: "You sold your grain at triple the price; your chest filled but the villagers cursed your name.",
          detay: "Profiting off starvation is an unforgotten sin.",
        },
        basarisizSonuc: {
          mesaj: "Your exorbitant price caught the guild's attention, they warned you; still, some profit made it into your pocket.",
          detay: "Greed sometimes draws surveillance.",
        },
      },
      {
        metin: "Sell at the normal price, forgo the short-term profit.",
        basariliSonuc: {
          mesaj: "You didn't raise the price; your profit was small and a feeling of 'I missed out' stayed with you.",
          detay: "Greed is a habit — sometimes even giving it up is hard.",
        },
        basarisizSonuc: {
          mesaj: "You sold at the normal price, but another merchant sold the same stock at an exorbitant price, and earned far more than you.",
          detay: "Sometimes someone else's profit is the price of your virtue.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_pazar_tekeli: {
    baslik: "Market Monopoly",
    metin:
      "An opportunity has come up to gather most of the region's salt sources under one hand — if you buy out three small merchants, you'll set the market's price yourself.",
    secenekler: [
      {
        metin: "Buy out all three, set the price yourself.",
        basariliSonuc: {
          mesaj: "You seized the salt market single-handedly; you set the prices however you wish now.",
          detay: "Buying a market means buying its soul too.",
        },
        basarisizSonuc: {
          mesaj: "One of the small merchants broke the deal and complained to the guild; half your investment went to waste.",
          detay: "Greed sometimes trips over its own feet.",
        },
      },
      {
        metin: "Buy out just one, split the risk.",
        basariliSonuc: {
          mesaj: "You bought out one of the small merchants; not the whole market, but your share grew.",
          detay: "Small greed is still greed, just more cautious.",
        },
        basarisizSonuc: {
          mesaj: "The stall you bought didn't bring in as much profit as you expected.",
          detay: "Not every greedy calculation pans out.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_rakip_ezme: {
    baslik: "Crushing the Rival",
    metin:
      "A small rival stall has started stealing a few of your customers. You could spread a rumor to drive him to bankruptcy, or hire someone to damage his goods.",
    secenekler: [
      {
        metin: "Spread a false rumor, destroy his reputation.",
        basariliSonuc: {
          mesaj: "The rumor took hold; your rival lost customers, closed his stall. The square was yours again.",
          detay: "A single lie can bring down a whole life.",
        },
        basarisizSonuc: {
          mesaj: "It came out that you were the source of the rumor; your name was tarnished in the guild's eyes.",
          detay: "Slander sometimes returns to its owner.",
        },
      },
      {
        metin: "Win them back with better service to your customers.",
        basariliSonuc: {
          mesaj: "You entered open competition with your rival; in the end, most of your customers came back to you.",
          detay: "Sometimes the fastest way to win isn't the honest one, just doing it better.",
        },
        basarisizSonuc: {
          mesaj: "Your efforts weren't enough, a few customers stayed with your rival.",
          detay: "Competition doesn't always pay off.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_rusvet: {
    baslik: "Bribing the Official",
    metin:
      "The tax official is investigating your real income; he hints that in exchange for a small bribe he could 'lose' the report.",
    secenekler: [
      {
        metin: "Pay the bribe, get the problem out of the way.",
        basariliSonuc: {
          mesaj: "The report 'got lost'; your tax problem is solved, but the official will now milk you the same way every year.",
          detay: "Once a bribe is paid, it never really ends.",
        },
        basarisizSonuc: {
          mesaj: "The official took the bribe but reported you to his superiors anyway; you lost both the money and your reputation.",
          detay: "Some corrupt officials take from both sides.",
        },
      },
      {
        metin: "Refuse, take the risk.",
        basariliSonuc: {
          mesaj: "You refused; the official investigated a bit but found nothing serious, and closed the matter.",
          detay: "Sometimes taking the risk is cheaper than bowing your head.",
        },
        basarisizSonuc: {
          mesaj: "Your real income came to light, a heavy tax penalty was issued.",
          detay: "The traces of greed may not let you go.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_sulandirma: {
    baslik: "Watered-Down Goods",
    metin:
      "By mixing your wine with water and your spices with cheap herbs, you could get nearly double the quantity. No one might notice — or the opposite.",
    secenekler: [
      {
        metin: "Water down the goods, increase the quantity.",
        basariliSonuc: {
          mesaj: "The watered-down goods sold without being noticed; your chest doubled.",
          detay: "A trick looks like profit as long as it stays silent.",
        },
        basarisizSonuc: {
          mesaj: "One customer noticed the difference immediately and complained loudly in the marketplace; everyone heard.",
          detay: "Watered-down goods water down your reputation too.",
        },
      },
      {
        metin: "Sell the goods as they are this time.",
        basariliSonuc: {
          mesaj: "You sold the goods as they were; the profit was ordinary but at least no trouble arose.",
          detay: "Sometimes setting greed aside is a strategy too.",
        },
        basarisizSonuc: {
          mesaj: "The market was slow, even the usual sale barely happened.",
          detay: "Not every day is profitable.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_isci_somurusu: {
    baslik: "The Weight of the Load",
    metin:
      "The workers in your caravan are exhausted from fatigue; if you cut their wages and make them work longer hours, you could run the caravan far more cheaply.",
    secenekler: [
      {
        metin: "Cut their wages, extend their hours.",
        basariliSonuc: {
          mesaj: "Your workers grumbled but bore it; the caravan's expenses dropped sharply, your chest swelled.",
          detay: "Some profits come out of someone else's back.",
        },
        basarisizSonuc: {
          mesaj: "Two workers left the caravan overnight; finding new workers cost more than you expected.",
          detay: "Even exploitation has a ceiling.",
        },
      },
      {
        metin: "Leave the wages as they are.",
        basariliSonuc: {
          mesaj: "You didn't touch the wages; the caravan ran as steadily as always.",
          detay: "Sometimes not changing anything is the smartest calculation.",
        },
        basarisizSonuc: {
          mesaj: "When rival caravans cut their workers' wages, your costs stayed relatively high.",
          detay: "Avoiding greed can have a price too.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_lonca_tehdidi: {
    baslik: "Guild Warning",
    metin:
      "The guild masters say complaints about you have increased and threaten to expel you. Either you'll apologize publicly and soften your ways, or you'll try to buy off a few masters to silence them.",
    secenekler: [
      {
        metin: "Apologize publicly, soften your ways.",
        basariliSonuc: {
          mesaj: "Your apology calmed the guild; the danger of expulsion passed but your pride took quite a blow.",
          detay: "Sometimes bowing your head is the price of keeping the crown.",
        },
        basarisizSonuc: {
          mesaj: "Your apology wasn't found sincere enough; the guild put you under watch.",
          detay: "An unconvincing apology doesn't mend trust.",
        },
      },
      {
        metin: "Buy off a few masters, silence them.",
        basariliSonuc: {
          mesaj: "The masters were silenced, the complaints vanished from the official records.",
          detay: "Silence can be bought sometimes — but the price only rises.",
        },
        basarisizSonuc: {
          mesaj: "Your bribery attempt came to light; the guild suspended you temporarily.",
          detay: "Bought silence, one day, starts talking.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_nefret: {
    baslik: "The Feared Man",
    metin:
      "Even children in the marketplace run away when they hear your name; your wealth is undeniable but no one smiles at you sincerely anymore. This is a truth you need to reckon with.",
    secenekler: [
      {
        metin: "Don't mind it, your wealth is enough.",
        basariliSonuc: {
          mesaj: "You shrugged it off, focused on your chest; the money grew but so did your loneliness.",
          detay: "Wealth is sometimes the quietest prison.",
        },
        basarisizSonuc: {
          mesaj: "You said you didn't care, but the empty table at night kept haunting your thoughts.",
          detay: "Some truths can't be ignored, only postponed.",
        },
      },
      {
        metin: "Soften your image with a small gesture — fund a festival.",
        basariliSonuc: {
          mesaj: "You funded the festival; some are still suspicious but at least you saw a few smiles.",
          detay: "They say love can't be bought, but sometimes it cracks the door open.",
        },
        basarisizSonuc: {
          mesaj: "Your gesture was read as 'guilt money'; no one felt grateful.",
          detay: "Years of accumulated hatred don't melt away with a single festival.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_asiri_hirs: {
    baslik: "Excess Ambition",
    metin:
      "If you invest your entire fortune in a single giant trade fleet, you could become the richest merchant in the region — or lose everything in a storm.",
    secenekler: [
      {
        metin: "Invest everything, play it big.",
        basariliSonuc: {
          mesaj: "The fleet returned safely, its cargo hold literally full of gold; overnight your name became the region's richest merchant.",
          detay: "Some gambles make it into history.",
        },
        basarisizSonuc: {
          mesaj: "The fleet sank in a storm; most of the fortune you spent years building lies at the bottom of the sea.",
          detay: "Greed sometimes digs its own grave.",
        },
      },
      {
        metin: "Be cautious, split your investment.",
        basariliSonuc: {
          mesaj: "You split your investment; the profit wasn't huge but it was safe.",
          detay: "Sometimes reining in greed is a calculation too.",
        },
        basarisizSonuc: {
          mesaj: "One of the smaller fleets suffered damage too, but your total loss stayed limited.",
          detay: "Split risk means split loss.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_miras_kavgasi: {
    baslik: "The Inheritance Fight",
    metin:
      "{cocuk} wants a share of your fortune now, saying they learned your ambition living it in their own childhood. Either accept the demand and buy peace, or refuse and protect what you've accumulated over the years.",
    secenekler: [
      {
        metin: "Give the share, buy family peace.",
        basariliSonuc: {
          mesaj: "You gave the share; {cocuk} softened for a while, a trace of the old days appeared at your table.",
          detay: "Some debts aren't paid in gold, but in patience.",
        },
        basarisizSonuc: {
          mesaj: "You gave the share but it wasn't enough; the demand kept growing.",
          detay: "Greed is a learned behavior — sometimes it's learned from you.",
        },
      },
      {
        metin: "Refuse, say every coin has to be earned.",
        basariliSonuc: {
          mesaj: "You refused; {cocuk} left resentful but your fortune remained untouched.",
          detay: "The legacy of ambition sometimes replaces love.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal turned into a big fight; {cocuk} stayed away for a long time.",
          detay: "Greed's most painful bill comes from your own blood.",
        },
      },
    ],
  },
  oc_tuccar_yol_acgozlu_yalniz_olum: {
    baslik: "A Golden Loneliness",
    metin:
      "Your warehouses are full, your chest overflows — but no one sits with you at the table. The fortune you chased for years now echoes in a castle where you sit alone.",
    secenekler: [
      {
        metin: "Accept your fortune, pay the price of loneliness.",
        basariliSonuc: {
          mesaj: "Your chest is still the fullest, your name still the best known merchant in the region — but the castle's silence sometimes feels very loud.",
          detay: "Wealth doesn't fill loneliness, it only hides it.",
        },
        basarisizSonuc: {
          mesaj: "The silence tonight was unbearable; for the first time you felt so clearly that your fortune has a price.",
          detay: "Some bills come due late, but they come due.",
        },
      },
      {
        metin: "Give away part of your fortune, try to win back old friends.",
        basariliSonuc: {
          mesaj: "A few old friends came back; your table is no longer entirely empty.",
          detay: "Sometimes even a late outstretched hand finds a response.",
        },
        basarisizSonuc: {
          mesaj: "The money you gave away wasn't enough for anyone to form a real bond; your loneliness continued.",
          detay: "Gold can't buy back lost years.",
        },
      },
    ],
  },

  // ─────────────────────────── SMUGGLER ───────────────────────────
  oc_tuccar_yol_kacakci_gece_yuku: {
    baslik: "Night Cargo",
    metin:
      "A tax-free cargo ship will dock at the shore after dark; you need to bring the goods into the city without anyone seeing.",
    secenekler: [
      {
        metin: "Carry the load alone, by a quiet path.",
        basariliSonuc: {
          mesaj: "You got the load into the city without anyone seeing; all the profit stayed in your pocket.",
          detay: "Shadows are sometimes your most reliable partner.",
        },
        basarisizSonuc: {
          mesaj: "A patrol spotted you; while fleeing you had to leave part of the goods behind.",
          detay: "Darkness sometimes hides not just you, but the one following you too.",
        },
      },
      {
        metin: "Partner with a reliable local gang, split the risk.",
        basariliSonuc: {
          mesaj: "The gang used familiar paths, the cargo arrived without trouble; you shared part of the profit but the risk too.",
          detay: "Walking alone in smuggling isn't always the smartest choice.",
        },
        basarisizSonuc: {
          mesaj: "The gang ran into an unexpected patrol, part of the load changed hands but you slipped away.",
          detay: "Partnership divides the risk, doesn't erase it entirely.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_muhafiz_rusveti: {
    baslik: "The Gate Guard",
    metin:
      "The guard at the city gate offers you a special pass in exchange for a regular bribe — your goods will enter without ever being searched.",
    secenekler: [
      {
        metin: "Accept the deal, pay regularly.",
        basariliSonuc: {
          mesaj: "The guard kept his word; now you have a regular, safe gate of passage.",
          detay: "Every fixed connection means a fixed price.",
        },
        basarisizSonuc: {
          mesaj: "The guard took the money but when the shift changed, the new guard searched you thoroughly.",
          detay: "A bribe isn't a guarantee, only a chance.",
        },
      },
      {
        metin: "Refuse, try different gates.",
        basariliSonuc: {
          mesaj: "You managed to slip through a different gate quietly, nothing left your pocket.",
          detay: "Sometimes being unpredictable is the best defense.",
        },
        basarisizSonuc: {
          mesaj: "An unexpected search caught you; a significant part of your goods was confiscated.",
          detay: "Avoiding a bribe can sometimes cost more.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_suc_orgutu: {
    baslik: "The Man in the Shadows",
    metin:
      "The man who runs the region's secret crime network wants to 'partner' with you — refusing is dangerous, accepting puts you under his command.",
    secenekler: [
      {
        metin: "Accept the partnership, take his protection.",
        basariliSonuc: {
          mesaj: "You came under his protection; no one can touch you easily now, but you also have to obey his orders.",
          detay: "Protection is sometimes just another name for a chain.",
        },
        basarisizSonuc: {
          mesaj: "The partnership was accepted but the first 'task' badly disturbed your conscience.",
          detay: "Whoever makes a deal with the shadow struggles to return to the light.",
        },
      },
      {
        metin: "Politely refuse, keep going on your own.",
        basariliSonuc: {
          mesaj: "He took your refusal maturely, at least for now leaving you be.",
          detay: "Independence sometimes comes as a gift.",
        },
        basarisizSonuc: {
          mesaj: "He didn't like your refusal; a few days later part of your warehouse mysteriously 'disappeared'.",
          detay: "Refusing the shadow has a price.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_vergi_memuru: {
    baslik: "The Tax Official's Shadow",
    metin:
      "The newly appointed tax official wants to review your ledgers. You'll need to present your falsified records — your handwriting was rushed, if examined carefully it could be noticed.",
    secenekler: [
      {
        metin: "Present the fake ledger carefully, act convincing.",
        basariliSonuc: {
          mesaj: "The official glanced over the ledger and approved it; your real income stayed hidden.",
          detay: "Sometimes a convincing manner is more effective than the most solid fake ledger.",
        },
        basarisizSonuc: {
          mesaj: "The official noticed the discrepancy; you earned a heavy fine and careful surveillance.",
          detay: "Hastily written lies can't escape careful eyes.",
        },
      },
      {
        metin: "Send the official off on 'consulting duty' elsewhere, buy time.",
        basariliSonuc: {
          mesaj: "The official was kept busy elsewhere for a few weeks; meanwhile you cleaned up your ledgers.",
          detay: "Time is sometimes a more valuable cover than money.",
        },
        basarisizSonuc: {
          mesaj: "The official returned immediately without being delayed, and his suspicion grew even more.",
          detay: "Some delays backfire.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_ucu_ucuna: {
    baslik: "A Close Call",
    metin:
      "During a raid, the smuggled goods hidden in your warehouse were nearly found — the guards got within one sack of it before another clue pulled them away. Your heart is still pounding.",
    secenekler: [
      {
        metin: "Learn the lesson, slow things down for a while.",
        basariliSonuc: {
          mesaj: "You looked clean for a while; the guards' suspicion slowly faded.",
          detay: "Sometimes the best move is no move at all.",
        },
        basarisizSonuc: {
          mesaj: "Your slowdown shifted some of your customers to other smugglers.",
          detay: "Caution sometimes comes with a cost.",
        },
      },
      {
        metin: "Ignore the fear, keep going at the same pace.",
        basariliSonuc: {
          mesaj: "You kept going, luck was on your side once more; the caravan ran uninterrupted.",
          detay: "Is it courage or recklessness — the line is thin.",
        },
        basarisizSonuc: {
          mesaj: "Your luck ran out this time; in the next raid the warehouse was half emptied.",
          detay: "Whoever crosses the same bridge too many times eventually falls in the water.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_sinir_otesi: {
    baslik: "Cross-Border Connection",
    metin:
      "A merchant from a neighboring region offers to set up a permanent smuggling line using the border both ways — profit is large for both, but it means breaking the law of two kingdoms at once.",
    secenekler: [
      {
        metin: "Set up the line, expand your cross-border network.",
        basariliSonuc: {
          mesaj: "The line was set up; now you have a regular, secret trade flow between two regions.",
          detay: "Borders separate the law, but never the smuggler.",
        },
        basarisizSonuc: {
          mesaj: "The first shipment was caught at the border; you drew the attention of both regions.",
          detay: "Breaking two laws at once means double the danger.",
        },
      },
      {
        metin: "Refuse the offer, stick with your current line.",
        basariliSonuc: {
          mesaj: "You turned down the offer; your business stayed small but manageable.",
          detay: "Not every opportunity is a risk worth taking.",
        },
        basarisizSonuc: {
          mesaj: "The neighboring merchant took the offer to someone else; that line is now your rival's.",
          detay: "Refused opportunities sometimes fall into someone else's pocket.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_ihbar: {
    baslik: "The Threat of Informing",
    metin:
      "An old partner, who knows your secrets, is demanding a large sum of hush money, threatening to report you to the city guards.",
    secenekler: [
      {
        metin: "Pay the hush money.",
        basariliSonuc: {
          mesaj: "You paid; your secrets stayed buried, but now this man has a permanent hold over you.",
          detay: "Whoever bows once to blackmail always bows again.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but the man's greed didn't stop, he came back demanding an even larger sum.",
          detay: "Hush money sometimes doesn't silence, only delays.",
        },
      },
      {
        metin: "Ignore his threat, let him report if he wants.",
        basariliSonuc: {
          mesaj: "The man was bluffing; the report never happened, and you got away without paying.",
          detay: "Sometimes the best defense is showing you're not afraid.",
        },
        basarisizSonuc: {
          mesaj: "The report was real; the guards raided your warehouse, a large part of your goods was confiscated.",
          detay: "When a gamble is lost, the bill is heavy.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_ortak_ihanet: {
    baslik: "The Partner's Betrayal",
    metin:
      "Your night-cargo partner, whom you've trusted for years, decided to take your share too and flee alone — you caught him before delivering the goods.",
    secenekler: [
      {
        metin: "Forgive him but end the partnership.",
        basariliSonuc: {
          mesaj: "You got your goods back, quietly ended the partnership; at least there was no bloody confrontation.",
          detay: "Even in the dark, there can be a kind of conscience.",
        },
        basarisizSonuc: {
          mesaj: "Your partner asked for forgiveness but part of your goods had already changed hands, you couldn't get it back.",
          detay: "The traces of betrayal aren't always fully erased.",
        },
      },
      {
        metin: "Give him a hard lesson so no one tries this again.",
        basariliSonuc: {
          mesaj: "Word of the harsh lesson spread through the shadow world; no one dared to steal from you again.",
          detay: "Fear sometimes replaces loyalty — but never love.",
        },
        basarisizSonuc: {
          mesaj: "Things got out of hand, the fight escalated; in the end you lost part of your goods and were injured on top of it.",
          detay: "Violence sometimes spins out of control.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_gizli_depo: {
    baslik: "Secret Warehouse Raid",
    metin:
      "City guards are wandering your neighborhood on a suspicious tip — they're close to finding your secret warehouse. Now you need a quick decision.",
    secenekler: [
      {
        metin: "Move the goods to another place immediately, take the risk.",
        basariliSonuc: {
          mesaj: "You moved it in time; the guards found an empty warehouse, they couldn't seize anything.",
          detay: "Speed is sometimes the best form of hiding.",
        },
        basarisizSonuc: {
          mesaj: "The guards raided right during the move; the secret stock you built over years vanished overnight.",
          detay: "Some losses can't be undone.",
        },
      },
      {
        metin: "Leave the warehouse as is, try not to draw attention.",
        basariliSonuc: {
          mesaj: "The guards scanned the neighborhood and left, without noticing the secret warehouse.",
          detay: "Sometimes the safest move is no move at all.",
        },
        basarisizSonuc: {
          mesaj: "The warehouse was found; the goods were confiscated, your name is now on the guards' blacklist.",
          detay: "Waiting is sometimes the most dangerous form of gambling.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_derinlesme: {
    baslik: "Deeper Waters",
    metin:
      "The head of the shadow network now wants you to smuggle not just goods, but people too — far more money, but a far heavier crime.",
    secenekler: [
      {
        metin: "Accept the offer, expand the scope of your work.",
        basariliSonuc: {
          mesaj: "You took the job; your chest filled faster than ever but you're now in the darkest corner of this world.",
          detay: "Every step deeper closes off a bit more of the way back.",
        },
        basarisizSonuc: {
          mesaj: "The first shipment ended in disaster; your name is now among the region's most wanted smugglers.",
          detay: "Drowning in deep waters is far worse than drowning in shallow ones.",
        },
      },
      {
        metin: "Draw your line, keep smuggling only goods.",
        basariliSonuc: {
          mesaj: "You drew your line; the boss was a bit angry but let you continue your work.",
          detay: "Even in the dark, it's possible to draw a line.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered the boss, he took back some of your 'privileges'.",
          detay: "Drawing a line can have a cost too.",
        },
      },
    ],
  },
  oc_tuccar_yol_kacakci_hesap_yuzlesmesi: {
    baslik: "A Reckoning",
    metin:
      "You lived in the shadows for years. Now, in your aged body, you're questioning where this whole dark path took you — a quiet retreat and a clean retirement, or one last big score?",
    secenekler: [
      {
        metin: "Leave everything, withdraw quietly.",
        basariliSonuc: {
          mesaj: "You quietly withdrew from the shadow world; looking back, there were years you both feared and regretted.",
          detay: "Some paths bring peace once they're abandoned.",
        },
        basarisizSonuc: {
          mesaj: "Your withdrawal angered your old connections; they demanded a small 'farewell tax'.",
          detay: "Even leaving the dark can have a cost.",
        },
      },
      {
        metin: "Pull one last big score, then quit.",
        basariliSonuc: {
          mesaj: "The last score went unexpectedly well; your chest filled enough for a lifetime, then you truly quit.",
          detay: "Some legends are born right as they walk out the door.",
        },
        basarisizSonuc: {
          mesaj: "The last score was a trap; you barely escaped being caught but nearly lost everything.",
          detay: "Greed can sink even the most experienced smuggler at the last moment.",
        },
      },
    ],
  },

  // ─────────────────────────── CHARITABLE ───────────────────────────
  oc_tuccar_yol_hayirsever_imarethane: {
    baslik: "The Almshouse",
    metin:
      "You want to build a small soup kitchen for the city's homeless and orphans — costly, but it could feed many mouths in the long run.",
    secenekler: [
      {
        metin: "Build the soup kitchen, take on its regular operation.",
        basariliSonuc: {
          mesaj: "The soup kitchen opened; dozens of poor people feed there every day now, speaking your name with charity.",
          detay: "Some investments are measured in plates.",
        },
        basarisizSonuc: {
          mesaj: "The soup kitchen opened but didn't get the attention you expected in its first months; the expense continued, the thanks were scarce.",
          detay: "Good deeds sometimes stay quiet, yet continue.",
        },
      },
      {
        metin: "Make do with small, irregular donations for now.",
        basariliSonuc: {
          mesaj: "Your small donations were enough for a few families; not a great institution, but a start.",
          detay: "Every great good deed begins with a small step.",
        },
        basarisizSonuc: {
          mesaj: "Your donations stayed scattered, unable to create a lasting effect.",
          detay: "Irregular kindness doesn't give a regular result.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_ekmek_subvansiyon: {
    baslik: "Bread Subsidy",
    metin:
      "In a bad harvest year grain prices hit the ceiling; you could pay the difference out of your own pocket so bakers sell bread at the old price.",
    secenekler: [
      {
        metin: "Cover the difference yourself, keep the bread price fixed.",
        basariliSonuc: {
          mesaj: "The bakers sold bread at the old price; the city's people quickly learned who was behind it.",
          detay: "Sometimes a loaf of bread is the beginning of a legend.",
        },
        basarisizSonuc: {
          mesaj: "You paid the difference but the grain shortage was so severe that prices rose a bit anyway.",
          detay: "Good intentions don't always defeat nature.",
        },
      },
      {
        metin: "Only help your own family and close friends.",
        basariliSonuc: {
          mesaj: "Your close ones didn't go hungry; a small-scale but warm act of help.",
          detay: "Some kindnesses aren't wide, but deep.",
        },
        basarisizSonuc: {
          mesaj: "Your help wasn't enough, some of your friends still struggled.",
          detay: "A small hand sometimes isn't enough.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_cirak_burs: {
    baslik: "Apprentice's Scholarship",
    metin:
      "A poor family's talented son can't enter the guild because he can't cover the apprenticeship fee. If you cover it, a life could change.",
    secenekler: [
      {
        metin: "Cover his fee, give him a chance.",
        basariliSonuc: {
          mesaj: "The boy was accepted into the guild, years later opened his own stall and always spoke of you as 'the man who gave me my first chance'.",
          detay: "Some seeds outlive the one who planted them.",
        },
        basarisizSonuc: {
          mesaj: "You covered his fee but the boy left the apprenticeship and went a different way.",
          detay: "Not every opportunity is valued the same way, still worth offering.",
        },
      },
      {
        metin: "Find him a small job, but don't cover his fee.",
        basariliSonuc: {
          mesaj: "You found the boy small jobs; he couldn't enter the guild but at least he didn't go hungry.",
          detay: "Small aid sometimes can't replace big aid.",
        },
        basarisizSonuc: {
          mesaj: "The jobs you found weren't enough, the boy went back to his family.",
          detay: "Some half-steps don't reach the goal.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_kopru: {
    baslik: "Bridge Construction",
    metin:
      "There's no bridge over the river that divides the city in two; every winter a few people drown crossing it. Building a bridge would swallow a large part of your fortune.",
    secenekler: [
      {
        metin: "Have the bridge built with your own fortune.",
        basariliSonuc: {
          mesaj: "The bridge was completed; the city's people decided to name it after you. Everyone will cross it for years.",
          detay: "A stone bridge lives longer than a name.",
        },
        basarisizSonuc: {
          mesaj: "The construction cost more than expected, took years to finish; still it stands in the end.",
          detay: "Great works sometimes test your patience.",
        },
      },
      {
        metin: "Call other guild merchants to contribute, share the load.",
        basariliSonuc: {
          mesaj: "Other merchants contributed too; the bridge rose as a shared achievement.",
          detay: "Shared charity shines less but grows more easily.",
        },
        basarisizSonuc: {
          mesaj: "Some merchants didn't pay their pledged share, the bridge stayed half-finished for a while.",
          detay: "Shared charity is also open to shared irresponsibility.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_hastane: {
    baslik: "The Almshouse Infirmary",
    metin:
      "There's no infirmary in the city caring for the poor; the sick either die at home or get no treatment at all. You could arrange with a physician and set up a small infirmary.",
    secenekler: [
      {
        metin: "Build the infirmary, put the physician on a salary.",
        basariliSonuc: {
          mesaj: "The infirmary opened; poor patients can now knock on a door. The city started calling you the 'father of healing'.",
          detay: "Some buildings aren't built from stone, but from gratitude.",
        },
        basarisizSonuc: {
          mesaj: "The infirmary opened but the physician alone wasn't enough, they couldn't keep up with some patients.",
          detay: "Good intentions are sometimes limited by capacity.",
        },
      },
      {
        metin: "Donate to an existing monastery infirmary.",
        basariliSonuc: {
          mesaj: "Your donation was enough to let the monastery's infirmary expand; more patients can now be treated.",
          detay: "Growing an existing good deed is a form of charity too.",
        },
        basarisizSonuc: {
          mesaj: "Your donation was accepted but the monastery redirected the money to another need.",
          detay: "A donation's journey can slip out of the giving hand's control.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_artan_talep: {
    baslik: "Growing Expectation",
    metin:
      "Your generosity has become your reputation, but now everyone expects even more from you — at every festival, every disaster, you're the first one they call. This expectation is wearing you out.",
    secenekler: [
      {
        metin: "Keep giving as much as you can.",
        basariliSonuc: {
          mesaj: "You gave again; the city still praises you but a weariness builds up inside.",
          detay: "Generosity is sometimes crushed under its own weight.",
        },
        basarisizSonuc: {
          mesaj: "You gave, but this time it wasn't found enough; some grumbled 'he's not as generous as he used to be'.",
          detay: "Expectation can shrink everything you give.",
        },
      },
      {
        metin: "Gently set a boundary this time, say you can't keep up with everyone.",
        basariliSonuc: {
          mesaj: "You set your boundary; some understood, some were disappointed, but you got a bit of breathing room.",
          detay: "Charity can have a limit too — and should.",
        },
        basarisizSonuc: {
          mesaj: "Your boundary led to rumors of 'he's not the same anymore'; some of your friends drifted away.",
          detay: "Once known as generous, stepping back is hard.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_isletme_dengesi: {
    baslik: "Business Balance",
    metin:
      "Your steward is warning you: the donations you made this year have dangerously eroded your working capital. Either you'll stop the donations for a while and recover, or take the risk and continue.",
    secenekler: [
      {
        metin: "Freeze the donations for a year, recover your business.",
        basariliSonuc: {
          mesaj: "You paused for a year, your business got some breathing room; some were disappointed but your capital recovered.",
          detay: "Charity can only flow from a business that stays standing.",
        },
        basarisizSonuc: {
          mesaj: "You paused, but the recovery you expected came slowly.",
          detay: "Some recoveries move slower than you'd think.",
        },
      },
      {
        metin: "Take the risk, keep donating at the same pace.",
        basariliSonuc: {
          mesaj: "You kept donating; capital is at a dangerous level but the city loves you even more.",
          detay: "Some generous men forget their own economy until the very end.",
        },
        basarisizSonuc: {
          mesaj: "Your capital dropped to a critical level, you had to cancel a few deals.",
          detay: "Generosity can bring down a business without a foundation.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_dilenci: {
    baslik: "The Beggar at Your Door",
    metin:
      "The same old beggar sits in front of your stall every day. Today he asked for a big favor for his daughter's dowry — much more than you normally give.",
    secenekler: [
      {
        metin: "Give the amount he asked, don't send him away empty-handed.",
        basariliSonuc: {
          mesaj: "The old man couldn't hold back his tears; at his daughter's wedding they spoke your name with charity.",
          detay: "Some kindnesses get written into a family's history.",
        },
        basarisizSonuc: {
          mesaj: "The help you gave wasn't enough, the wedding was still held modestly.",
          detay: "Not every act of generosity yields the intended result.",
        },
      },
      {
        metin: "Give your usual small help, nothing more.",
        basariliSonuc: {
          mesaj: "You gave your usual small help; the man left grateful, he'd solve the dowry matter another way.",
          detay: "Consistent small kindnesses have a value too.",
        },
        basarisizSonuc: {
          mesaj: "This time the man left a bit hurt; his expectation wasn't met.",
          detay: "You can't satisfy everyone every time.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_din_adami_ortakligi: {
    baslik: "Spiritual Partnership",
    metin:
      "A local clergyman proposes founding a joint foundation to institutionalize your charity — your fortune, his organization.",
    secenekler: [
      {
        metin: "Found the foundation together, build a lasting structure.",
        basariliSonuc: {
          mesaj: "The foundation was established; your donations are no longer one-off, they've turned into a regular, organized system.",
          detay: "Institutionalized charity outlives its founder.",
        },
        basarisizSonuc: {
          mesaj: "The foundation was established but the organization progressed much slower than expected.",
          detay: "Great structures can't be built with an impatient hand.",
        },
      },
      {
        metin: "Continue your individual donations, don't enter the partnership.",
        basariliSonuc: {
          mesaj: "You turned down the offer; you continued helping at your own pace, in your own way.",
          detay: "Not every good deed has to turn into an institution.",
        },
        basarisizSonuc: {
          mesaj: "The clergyman received your refusal rather coldly, the closeness between you lessened.",
          detay: "Some refusals create a small distance.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_taklitciler: {
    baslik: "Fake Beggars",
    metin:
      "As your donations spread, you notice some fake 'needy' people making up stories to squeeze regular money out of you.",
    secenekler: [
      {
        metin: "Investigate and check to direct your donations to the truly needy.",
        basariliSonuc: {
          mesaj: "You tightened your checks; the fake stories were exposed one by one, the truly needy gained priority.",
          detay: "Charity's eyes should be open, not blind.",
        },
        basarisizSonuc: {
          mesaj: "Your investigation also disturbed some truly needy people who were called 'suspicious'; some were offended.",
          detay: "Suspicion sometimes hurts the innocent too.",
        },
      },
      {
        metin: "Ignore it, give equally to everyone.",
        basariliSonuc: {
          mesaj: "You gave equally to everyone; some frauds walked away grinning but the truly needy were fed too.",
          detay: "Some charitable people prefer to ignore the abuse.",
        },
        basarisizSonuc: {
          mesaj: "The fraud's extent became known and talked about in the guild; you started being called the 'naive merchant'.",
          detay: "Boundless trust is sometimes made a mockery of.",
        },
      },
    ],
  },
  oc_tuccar_yol_hayirsever_efsane: {
    baslik: "The Region's Legend",
    metin:
      "The donations you've given for years, the infirmary and bridge you built, are now known by your name. Even the city's children say they want to be 'like you' when they grow up.",
    secenekler: [
      {
        metin: "Keep devoting your remaining years to charity too.",
        basariliSonuc: {
          mesaj: "The city now remembers you like a legend; there's even a street bearing your name.",
          detay: "Some names live far longer than their owner.",
        },
        basarisizSonuc: {
          mesaj: "Your health no longer lets you give as much, but your intention is still the same, and the city knows it.",
          detay: "Even a tired hand can still stay open.",
        },
      },
    ],
  },
};
