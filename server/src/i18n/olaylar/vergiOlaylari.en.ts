import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/vergiOlaylari.ts — İngilizce çevirileri. */
export const OLAYLAR_VERGI_EN: Record<string, OlayCeviri> = {
  vergi_oc_tahsildar_kapida: {
    baslik: "The Tax Collector at Your Door",
    metin:
      "The tithe-and-tribute collector has shown up at your door with two sealed-ledger clerks and a guard. His eyes weigh your earnings: 'This year's share, master. By the sealed ledger, it is time to pay.'",
    secenekler: [
      {
        metin: "Pay what you owe in full and take your sealed receipt.",
        basariliSonuc: {
          mesaj: "You counted out your share and handed it over. The collector sealed the receipt; at least he won't be back at your door this year.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Slip a purse into the collector's pocket and have the share written down low.",
        kilitAciklamasi: "You can't find a purse to convince the collector with.",
        basariliSonuc: {
          mesaj: "The purse changed hands quietly. The collector wrote a low figure in his ledger; your share will be lighter in the years ahead.",
          detay: "But once this starts, the collector will always keep you in mind.",
        },
        basarisizSonuc: {
          mesaj: "The collector took the purse and then exposed you in front of the guard. You paid both the purse and the fine, and your name turned sour around town.",
        },
      },
      {
        metin: "Hide the real ledgers and show the collector a 'burned' one.",
        basariliSonuc: {
          mesaj: "You showed the incomplete ledger, the collector believed it and figured your share very low. You kept part of your earnings as profit.",
        },
        basarisizSonuc: {
          mesaj: "The clerks found the hidden ledger. You paid a heavy fine and fell out of the town governor's favor.",
        },
      },
    ],
  },
  vergi_oc_yeni_vergi_ilani: {
    baslik: "A New Tax Proclaimed",
    metin:
      "The town crier is shouting in the square: a new levy has been imposed to pay for war costs and repairs to the castle. The tradesmen are muttering, some talking of shuttering their shops. Your own share is already set: twenty-five percent higher.",
    secenekler: [
      {
        metin: "Quietly accept the payment.",
        basariliSonuc: {
          mesaj: "You accepted the levy. The administration took it as obedience and looked on you kindly, but for the next three years your tax burden will be noticeably heavier.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "File a petition of objection with the council and explain the injustice.",
        basariliSonuc: {
          mesaj: "Your petition was heard and your share was not raised. A few other tradesmen followed your example.",
        },
        basarisizSonuc: {
          mesaj: "Your petition was rejected, and you were noted as a 'complainant' on top of it. The increase was still written into your share.",
        },
      },
      {
        metin: "Join your guild and sit down for collective bargaining.",
        kilitAciklamasi: "You can't afford to chip in for the guild's expenses.",
        basariliSonuc: {
          mesaj: "You went on the guild's behalf, and the officials settled on a small reduction instead of an increase. You'll pay a lighter tax for four years.",
        },
        basarisizSonuc: {
          mesaj: "The collective talks dissolved into argument and the guild split in two. The expense was wasted and the increase was added to your share too.",
        },
      },
    ],
  },
  vergi_oc_vergi_affi_firsati: {
    baslik: "A Chance at Tax Relief",
    metin:
      "The town steward is collecting 'voluntary donations' to build the church bell tower. Donors are promised a reduction in the district tax lasting years. No one says it openly, but everyone knows: those who hold back are being noted.",
    secenekler: [
      {
        metin: "Make a large donation and lock in the reduction.",
        kilitAciklamasi: "You can't afford the large donation the steward expects.",
        basariliSonuc: {
          mesaj: "Your donation was recorded. The steward called you over to thank you; for four years your tax will be lighter.",
        },
        basarisizSonuc: {
          mesaj: "Your donation was accepted but the reduction was never entered; the clerk 'forgot'. You never learned whose pocket the money went into.",
        },
      },
      {
        metin: "Try to bargain the donation down by half.",
        basariliSonuc: {
          mesaj: "After a long haggle with the steward you settled for half the price. You got the full reduction.",
        },
        basarisizSonuc: {
          mesaj: "The haggling was taken as insolence. The steward noted you as 'stingy', and the reduction flew away.",
        },
      },
      {
        metin: "Make no donation, just pay your tax as it stands.",
        basariliSonuc: {
          mesaj: "It was beyond your means, or you didn't want it to be. No one said a word, but you felt the eyes on you.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  vergi_oc_toplama_yetkisi: {
    baslik: "An Offer to Collect",
    metin:
      "The town administration proposes giving you the authority to collect taxes from the tradesmen in the district. A small cut of everything collected will be yours, but in your neighbors' eyes you'll be 'the collector'. No one likes the job; still, the administration finds you trustworthy.",
    secenekler: [
      {
        metin: "Accept the authority and run the district strictly.",
        basariliSonuc: {
          mesaj: "You carried out the collection successfully. The administration filled its purse and wrote a reduction into your own share — but the district whispers 'collector' behind your back.",
        },
        basarisizSonuc: {
          mesaj: "The people grew angry with you; one day rotten vegetables rained down in front of your shop. The administration also demanded the shortfall in the accounts from you.",
        },
      },
      {
        metin: "Accept the authority but go easy on the district.",
        basariliSonuc: {
          mesaj: "You managed to keep both the administration and the neighbors satisfied. The sum collected is lower than expected, but both sides looked on you with respect.",
        },
        basarisizSonuc: {
          mesaj: "Your leniency angered the administration: you had to cover the shortfall in collection out of your own pocket.",
        },
      },
      {
        metin: "Decline the offer — you don't want to get mixed up in such work.",
        basariliSonuc: {
          mesaj: "You declined. The administration took it poorly, but your conscience is clear.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  vergi_sd_defter_denetimi: {
    baslik: "The Ledger Audit",
    metin:
      "A neatly dressed tax official turned up at your door. He carries a sealed authorization and a thick volume under his arm: 'We will be auditing your books. There appears to be a discrepancy in the records.'",
    secenekler: [
      {
        metin: "Open the books and account for yourself.",
        basariliSonuc: {
          mesaj: "Your books came out clean. The official found a small difference, you paid it, and the audit closed without fuss.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Hand the official an envelope for 'expenses'.",
        kilitAciklamasi: "You can't even scrape together the money to fill an envelope for the official.",
        basariliSonuc: {
          mesaj: "The envelope slid into a pocket and the report closed as an 'insignificant difference'. Your taxable base will be figured low for four years.",
        },
        basarisizSonuc: {
          mesaj: "The official entered the envelope into the record. You took a bribery-attempt penalty and the municipality now keeps you on its 'watch' list.",
        },
      },
      {
        metin: "Hide the second ledger and show the official only the 'orderly' one.",
        basariliSonuc: {
          mesaj: "The official fixed on the tidy-looking book and left. Part of your real earnings stayed protected.",
        },
        basarisizSonuc: {
          mesaj: "The second ledger came to light. A heavy fine was imposed and your standing with the municipality was shaken.",
        },
      },
    ],
  },
  vergi_sd_gelir_beyani: {
    baslik: "The New Income Declaration",
    metin:
      "The newspapers are announcing a new law: from now on every business must declare its annual income, and the rate has been raised a notch. Tradesmen are arguing angrily in the coffeehouses. By your reckoning, your share will rise by twenty-five percent.",
    secenekler: [
      {
        metin: "Comply with the law and fill out the declaration in full.",
        basariliSonuc: {
          mesaj: "You filed your declaration on time. The administration noted it and looked on you kindly, but for three years your tax burden will weigh heavier.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "File a written objection and hire a lawyer.",
        basariliSonuc: {
          mesaj: "Your objection was accepted: no increase will be applied to your share. The newspapers reported the case with approval.",
        },
        basarisizSonuc: {
          mesaj: "The court rejected your objection and you were recorded as a 'complaining tradesman'. The increase was added to your share anyway.",
        },
      },
      {
        metin: "Join the chamber of commerce's collective petition.",
        kilitAciklamasi: "You can't even pay the chamber's dues.",
        basariliSonuc: {
          mesaj: "The chamber sent the government a joint letter; a small reduction was wrung out instead of an increase. You'll pay a lighter tax for four years.",
        },
        basarisizSonuc: {
          mesaj: "The chamber's leadership fought among themselves and the petition came to nothing. Your dues were wasted and the increase was added to your share.",
        },
      },
    ],
  },
  vergi_sd_gumruk_affi: {
    baslik: "A Restructuring Opportunity",
    metin:
      "The municipality is hosting a dinner on behalf of a charity society. Businesses that contribute have been promised a tax restructuring: a reduction lasting years. The hall is full of well-known names; who donates and who doesn't is quietly being recorded.",
    secenekler: [
      {
        metin: "Make a large donation to the society.",
        kilitAciklamasi: "You can't cover the donation the society expects.",
        basariliSonuc: {
          mesaj: "Your donation was read aloud in the hall. The mayor congratulated you; for four years your tax will be lighter.",
        },
        basarisizSonuc: {
          mesaj: "Your donation was accepted but the restructuring list changed in someone else's favor; you couldn't get the money back.",
        },
      },
      {
        metin: "Bargain the donation down with a council member.",
        basariliSonuc: {
          mesaj: "You came to terms with the council member: you got the full reduction for half the price.",
        },
        basarisizSonuc: {
          mesaj: "The haggling was taken as brazenness; you missed the reduction and were remembered as 'stingy'.",
        },
      },
      {
        metin: "Skip the dinner and pay your tax as it stands.",
        basariliSonuc: {
          mesaj: "You spent the evening at home. No one said anything, but you know this business will remember you.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  vergi_sd_tahsil_komisyonu: {
    baslik: "A Seat on the Collection Commission",
    metin:
      "The municipality has set up a commission to run tax collection from local businesses. Membership is a privilege but also a responsibility toward your neighbors. You've been offered a seat: you'll earn a commission on what is collected.",
    secenekler: [
      {
        metin: "Join the commission and police the district strictly.",
        basariliSonuc: {
          mesaj: "You surpassed the collection target. The municipality commended you and wrote a reduction into your share — but the district has started calling you 'the official's man'.",
        },
        basarisizSonuc: {
          mesaj: "The collection came close to a revolt; the tradesmen blamed you, and the municipality demanded the shortfall from you.",
        },
      },
      {
        metin: "Join, but give your neighbors time and show flexibility.",
        basariliSonuc: {
          mesaj: "You balanced the municipality and the tradesmen alike. The collection was low but closed with respect.",
        },
        basarisizSonuc: {
          mesaj: "Your flexibility angered the municipality; you covered the shortfall out of your own pocket.",
        },
      },
      {
        metin: "Decline the offer and stay out of it.",
        basariliSonuc: {
          mesaj: "You declined. The municipality took it poorly, but your conscience is clear.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
};
