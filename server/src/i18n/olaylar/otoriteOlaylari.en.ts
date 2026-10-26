import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/otoriteOlaylari.ts — İngilizce çevirileri. `{otorite}` aynen korunur. */
export const OLAYLAR_OTORITE_EN: Record<string, OlayCeviri> = {
  // ───────────── Tüccar — Orta Çağ ─────────────
  otorite_tuccar_oc_gecis_harci: {
    baslik: "The Toll",
    metin:
      "{otorite}'s men stopped your caravan at the crossroads. They want to count the load and collect the transit toll. The sergeant squints at the sacks of goods: 'Looks like more than you declared.'",
    secenekler: [
      {
        metin: "Accept the toll and the count in full; declare everything.",
        basariliSonuc: {
          mesaj: "You paid the toll and the load was counted. The sergeant reported to {otorite} that you were 'an honest merchant'.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Leave a purse in the sergeant's pocket and have the load counted short.",
        kilitAciklamasi: "You can't even scrape together a purse for the sergeant.",
        basariliSonuc: {
          mesaj: "The purse changed hands, and the sergeant waved through half the load uncounted. You saved quite a bit on the toll.",
        },
        basarisizSonuc: {
          mesaj: "Another guard saw the purse. The goods were seized and {otorite} heard of it; your name turned sour on the caravan road.",
        },
      },
      {
        metin: "Report to {otorite} yourself that the toll is too high.",
        basariliSonuc: {
          mesaj: "{otorite} heard you out and cut the toll per caravan. The other merchants at the crossroads blessed your name.",
        },
        basarisizSonuc: {
          mesaj: "{otorite} said, 'A merchant's business is to pay, not to complain.' You paid the toll and fell out of favor too.",
        },
      },
    ],
  },
  otorite_tuccar_oc_pazar_kirasi: {
    baslik: "Market Stall Rent",
    metin:
      "{otorite} raised the stall rents in the market square overnight. The stallkeepers gather and grumble. The rent for your spot is now far heavier than before.",
    secenekler: [
      {
        metin: "Pay the rent without complaint.",
        basariliSonuc: {
          mesaj: "You paid the rent. {otorite}'s clerk wrote you in his ledger as a 'compliant tradesman'.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Go to the market clerk and explain how unfair the increase is.",
        basariliSonuc: {
          mesaj: "The clerk restored your stall's rent to what it was, and even wrote in a small one-year discount.",
        },
        basarisizSonuc: {
          mesaj: "The clerk recorded you as a 'troublemaker' and added late interest on top.",
        },
      },
      {
        metin: "Move your stall to another market.",
        kilitAciklamasi: "You don't have the money to move and set up the stall again.",
        basariliSonuc: {
          mesaj: "You found new customers in the neighboring market, and the rent is low. {otorite} took your leaving as an insult to his own market.",
        },
        basarisizSonuc: {
          mesaj: "The new market wasn't as profitable as you'd hoped. Your old spot was also given to someone else.",
        },
      },
    ],
  },
  otorite_tuccar_oc_imtiyaz: {
    baslik: "Trade Concession",
    metin:
      "{otorite} is about to grant a merchant the concession to sell the salt and spices arriving in the city. The concession is expensive but raises your name in the market. The clerk at the door whispers the price of a 'gift'.",
    secenekler: [
      {
        metin: "Make the big offer and take the concession on your own.",
        kilitAciklamasi: "You don't have the money for the large offer {otorite} wants.",
        basariliSonuc: {
          mesaj: "The concession is yours. The first months cost dearly, but you are now one of the biggest merchants in the market.",
        },
        basarisizSonuc: {
          mesaj: "Someone bid higher. Your gift was not returned, and the concession went to another.",
        },
      },
      {
        metin: "Offer a small partnership share.",
        kilitAciklamasi: "You don't have enough cash even for a partnership share.",
        basariliSonuc: {
          mesaj: "The partnership share was accepted; a small part of the concession was set aside for you, and your name was heard in the market.",
        },
        basarisizSonuc: {
          mesaj: "Your offer was judged 'too feeble'. You still had to pay the gift price.",
        },
      },
      {
        metin: "Stay out of it and carry on with your own small trade.",
        basariliSonuc: {
          mesaj: "You passed up the chance. The clerk shrugged; the concession went to someone else, and you stayed in your old routine.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  otorite_tuccar_oc_kacakcilik_sorusturmasi: {
    baslik: "Smuggling Inquiry",
    metin:
      "{otorite} has opened an inquiry into contraband being brought into the city. One of the porters you employ has been arrested and named you in his statement. The clerks want to inspect your ledgers and storehouses.",
    secenekler: [
      {
        metin: "Open all your records and face the inquiry openly.",
        basariliSonuc: {
          mesaj: "Your records came out clean. {otorite} called you an 'honest merchant'; the porter's sin did not stick to you.",
        },
        basarisizSonuc: {
          mesaj: "A few small irregularities turned up in the ledger. Smuggling wasn't proven, but a fine was imposed.",
        },
      },
      {
        metin: "Quietly pay the investigator a bribe.",
        kilitAciklamasi: "You can't scrape together the money to silence the investigator.",
        basariliSonuc: {
          mesaj: "The investigator quietly closed the report. The matter settled, but one day they'll remind you of this debt.",
        },
        basarisizSonuc: {
          mesaj: "The bribe offer made it into the record. The money was lost and {otorite} put you on a blacklist as well.",
        },
      },
      {
        metin: "Take the porter's fault on yourself, pay the fine and close the matter.",
        basariliSonuc: {
          mesaj: "You took the blame. {otorite} appreciated the stance; the inquiry quietly closed.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  // ───────────── Tüccar — Sanayi Devrimi ─────────────
  otorite_tuccar_sd_ithalat_denetimi: {
    baslik: "Customs Inspection",
    metin:
      "{otorite} has ordered strict inspections at the customs office. Half the crates that just came off the ship are being opened. Your shipment is next; the inspector finds your declaration a little too 'optimistic'.",
    secenekler: [
      {
        metin: "Declare the real value and pay the duty in full.",
        basariliSonuc: {
          mesaj: "Your declaration checked out and you paid the duty. The inspector wrote to {otorite} that you were 'an orderly importer'.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Understate the value and pass the crates off as 'cheap goods'.",
        basariliSonuc: {
          mesaj: "The inspector opened two crates and let you go. You saved a good deal on duty.",
        },
        basarisizSonuc: {
          mesaj: "Expensive goods were found at the bottom of the crates. A heavy fine was imposed and {otorite} put you under watch.",
        },
      },
      {
        metin: "Argue that the inspection regulation doesn't apply to your shipment.",
        basariliSonuc: {
          mesaj: "By leaning on the fine print of the regulation, you got your shipment out without delay. {otorite} noticed your sharpness.",
        },
        basarisizSonuc: {
          mesaj: "Your defense was rejected, the shipment sat at the port for days, and the storage fees were put on you.",
        },
      },
    ],
  },
  otorite_tuccar_sd_fiyat_tarifesi: {
    baslik: "Maximum Price Schedule",
    metin:
      "As famine rumors grew in the city, {otorite} set maximum selling prices for bread, coal and cloth. By the schedule, most goods in your shop will sell close to cost. Enforcement is not tight, but eyes are on you.",
    secenekler: [
      {
        metin: "Follow the schedule to the letter.",
        basariliSonuc: {
          mesaj: "You brought your prices down to the schedule. Your profit shrank, but {otorite} began to cite you as an exemplary tradesman.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Exceed the schedule and sell secretly at a higher price.",
        basariliSonuc: {
          mesaj: "Most customers didn't object to the extra price. You earned quietly, but one day you may be called to account.",
        },
        basarisizSonuc: {
          mesaj: "An inspector shopped as a customer. A heavy fine was imposed on your shop, with a threat of closure.",
        },
      },
      {
        metin: "Document your costs and ask {otorite} to correct the schedule.",
        basariliSonuc: {
          mesaj: "Your documents were found convincing; the schedule was nudged upward for your goods.",
        },
        basarisizSonuc: {
          mesaj: "{otorite} took the objection as an 'excuse for profiteering'. The schedule stayed, and your name was slightly tarnished.",
        },
      },
    ],
  },
  otorite_tuccar_sd_tedarik_ihalesi: {
    baslik: "Supply Tender",
    metin:
      "{otorite} is opening the annual supply tender for the city's railway station and garrison. The winner gets the city's biggest customer. But the participation deposit is steep, and rumors whisper that the result was 'arranged' beforehand.",
    secenekler: [
      {
        metin: "Submit the full bid and enter the tender in earnest.",
        kilitAciklamasi: "You don't have enough cash to cover the deposit.",
        basariliSonuc: {
          mesaj: "The tender is yours. The garrison and the station now buy from you; your share of the market grew noticeably.",
        },
        basarisizSonuc: {
          mesaj: "The tender went to someone whose win was already known. The deposit was not returned.",
        },
      },
      {
        metin: "Bid on a smaller lot.",
        kilitAciklamasi: "You can't even put up the deposit for the small lot.",
        basariliSonuc: {
          mesaj: "You won the small lot; the garrison's fodder and coal orders are now yours.",
        },
        basarisizSonuc: {
          mesaj: "The lot went to another firm, and the deposit didn't come back.",
        },
      },
      {
        metin: "Stay out of the tender and make do with your existing customers.",
        basariliSonuc: {
          mesaj: "You passed up the chance. Your routine wasn't disturbed, but you noticed a rival growing in the market.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  otorite_tuccar_sd_ziyafet_hediyesi: {
    baslik: "The Annual Banquet",
    metin:
      "{otorite} is giving the annual banquet. All the city's great merchants will be there, and everyone will bring a 'token'. It is not officially required; but who brings what, and who attends, decides next year's privileges.",
    secenekler: [
      {
        metin: "Bring an expensive gift and stand out.",
        kilitAciklamasi: "You don't have the money for a showy gift.",
        basariliSonuc: {
          mesaj: "Your gift drew attention in the hall. {otorite} called you to his table; his door is open to you next year.",
        },
        basarisizSonuc: {
          mesaj: "Your gift was lost among costlier tokens. You spent the money and went unnoticed.",
        },
      },
      {
        metin: "Bring a modest gift and pay your debt of courtesy.",
        kilitAciklamasi: "You don't have a penny to spare for a courtesy gift.",
        basariliSonuc: {
          mesaj: "Your small gift was received politely. No one counted you as special, but no one forgot you either.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Skip the banquet and send no gift.",
        basariliSonuc: {
          mesaj: "Your absence was noticed. {otorite}'s clerk noted it as 'disrespect to the city'.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  // ───────────── Zanaatkâr — Orta Çağ ─────────────
  otorite_zanaat_oc_ayar_denetimi: {
    baslik: "Weights and Standards Inspection",
    metin:
      "The standards inspector appointed by {otorite} has come to your workshop. He will check your measures, scales and the quality of your goods. Workshops found lacking are put on public display.",
    secenekler: [
      {
        metin: "Re-calibrate your measures and scales before the inspection.",
        kilitAciklamasi: "You don't have the money to have your tools re-calibrated.",
        basariliSonuc: {
          mesaj: "You finished your calibration. The inspector didn't call it 'flawless', but he found not a single problem.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Pull the wool over the inspector's eyes so he won't notice the faulty calibration.",
        basariliSonuc: {
          mesaj: "The inspector tested the tool with a crude measure and passed it. You took on no extra cost.",
        },
        basarisizSonuc: {
          mesaj: "The faulty calibration came to light. A pillory plaque was hung on your workshop door, and {otorite} learned of it too.",
        },
      },
      {
        metin: "Show the workshop as it is and trust the quality of your goods.",
        basariliSonuc: {
          mesaj: "The inspector was taken with your goods and wrote his report in praise. {otorite} heard of it.",
        },
        basarisizSonuc: {
          mesaj: "The inspector found a few small faults; a minor fine was written and you had to fix the calibration.",
        },
      },
    ],
  },
  otorite_zanaat_oc_hammadde_tahsisi: {
    baslik: "Raw Material Allocation",
    metin:
      "To repair the city walls, {otorite} has restricted the sale of timber and iron; workshops get only a limited share. Your stock is about to run out, and if you take new orders you may find yourself without materials.",
    secenekler: [
      {
        metin: "Petition {otorite} for an extra allocation.",
        basariliSonuc: {
          mesaj: "Your petition was taken seriously; your workshop was given a bit more material than the standard share.",
        },
        basarisizSonuc: {
          mesaj: "Your petition was set aside as 'one of those waiting in line'. You lost both time and money.",
        },
      },
      {
        metin: "Quietly source timber and iron from the black market.",
        kilitAciklamasi: "You don't have enough cash to pay the black marketeer.",
        basariliSonuc: {
          mesaj: "With the black-market material your production carried on, you kept up with your orders and protected your earnings.",
        },
        basarisizSonuc: {
          mesaj: "The black-market goods were confiscated. {otorite} flagged your workshop as 'one that breaks the embargo'.",
        },
      },
      {
        metin: "Make do with the limited material and shrink production.",
        basariliSonuc: {
          mesaj: "You scaled production down and turned away a few orders. Your income dropped, but you stayed within the rules.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  otorite_zanaat_oc_ruhsat_yenileme: {
    baslik: "Workshop License",
    metin:
      "The time has come to renew your workshop license. {otorite}'s clerks have figured the fee and expenses; the sum is hefty. Working without a license, however, is a serious offense.",
    secenekler: [
      {
        metin: "Pay the fee in full and renew the license.",
        basariliSonuc: {
          mesaj: "You renewed your license. The clerk smiled; your workshop is under legal protection.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Leave the clerk a purse and have the fee reduced.",
        kilitAciklamasi: "You don't even have a purse for the clerk.",
        basariliSonuc: {
          mesaj: "The clerk halved the fee and wrote the license out at once.",
        },
        basarisizSonuc: {
          mesaj: "The bribe came out: your license was suspended, you paid a fine, and {otorite} wrote you off.",
        },
      },
      {
        metin: "Put off the renewal and keep working without a license.",
        basariliSonuc: {
          mesaj: "No one checked; you got through the year without paying the fee.",
        },
        basarisizSonuc: {
          mesaj: "In a night raid it came out that you were working unlicensed. A heavy fine was imposed, and your workshop was sealed for a few days.",
        },
      },
    ],
  },
  otorite_zanaat_oc_bedelsiz_is: {
    baslik: "Free Work for the City",
    metin:
      "{otorite} is asking the city's master craftsmen for the iron fittings of the wall gate and the repair of the aqueduct as 'volunteer service'. There is no pay; but the city won't forget this service, and those who remember have two-sided memories.",
    secenekler: [
      {
        metin: "Accept the service without pay.",
        basariliSonuc: {
          mesaj: "You finished the job with full care. {otorite} spoke of it before the people; your name and your standing grew.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Accept without pay, but ask for a tax reduction in return.",
        basariliSonuc: {
          mesaj: "{otorite} accepted the bargain: the work from you, three years of tax relief for you. An unexpected partnership came of it.",
        },
        basarisizSonuc: {
          mesaj: "{otorite}, taking your condition as insolence, had the work done for nothing and treated you coldly.",
        },
      },
      {
        metin: "Refuse and keep to your own work.",
        basariliSonuc: {
          mesaj: "You refused. {otorite} didn't throw it in your face, but it looks like he won't give you the time of day again.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  // ───────────── Zanaatkâr — Sanayi Devrimi ─────────────
  otorite_zanaat_sd_atolye_muffetisi: {
    baslik: "The Workshop Inspector",
    metin:
      "An inspector appointed by {otorite} has come to your workshop. He is looking at the machine guards, the ventilation and the product standard. He is scribbling quickly in his notebook.",
    secenekler: [
      {
        metin: "Make the inspector's recommended fixes right away.",
        kilitAciklamasi: "You don't have the money to have the fixes made.",
        basariliSonuc: {
          mesaj: "You had the guards fitted and the ventilation repaired. The inspector wrote a favorable report.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Leave the inspector a sum for 'expenses'.",
        kilitAciklamasi: "You don't have any sum to give the inspector.",
        basariliSonuc: {
          mesaj: "The inspector left the shortcomings out of his report. But not everything is in order — if an accident happens, you'll answer for it.",
        },
        basarisizSonuc: {
          mesaj: "The inspector put the offer in his report. Your workshop was fined and {otorite} entered you on the record.",
        },
      },
      {
        metin: "Argue that the standards are exaggerated and object.",
        basariliSonuc: {
          mesaj: "The inspector softened a few items; you kept your savings.",
        },
        basarisizSonuc: {
          mesaj: "Your objection was rejected; you had the fixes made and took an extra fine on top.",
        },
      },
    ],
  },
  otorite_zanaat_sd_komur_ambargosu: {
    baslik: "Coal and Iron Restriction",
    metin:
      "Because of war preparations, {otorite} has restricted the sale of coal and iron to civilian workshops. Your workshop is full of workers waiting at their benches, and your furnaces are cooling. Those waiting for an official allocation are in a long queue.",
    secenekler: [
      {
        metin: "Petition {otorite} for an official allocation.",
        basariliSonuc: {
          mesaj: "Your petition moved you up the queue; a limited but sufficient allocation came through for your workshop.",
        },
        basarisizSonuc: {
          mesaj: "Your petition joined the queue, but your turn never came; time and the workers' wages went to waste.",
        },
      },
      {
        metin: "Find goods from suppliers who sell smuggled coal and iron.",
        kilitAciklamasi: "You don't have the cash to pay the smuggling supplier.",
        basariliSonuc: {
          mesaj: "Your furnaces were lit and orders went out on time. The smuggled goods were costly, but you protected your profit.",
        },
        basarisizSonuc: {
          mesaj: "The smuggled shipment was caught. {otorite} noted your workshop as 'one that breaks the restriction' and confiscated the goods.",
        },
      },
      {
        metin: "Cut back production and get by on your existing stock.",
        basariliSonuc: {
          mesaj: "You cut back production and sent two masters on leave. Your income dropped, but you stayed clean.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  otorite_zanaat_sd_ordu_siparisi: {
    baslik: "A Big State Order",
    metin:
      "{otorite} is distributing the army's new steel equipment order. The amount offered to you is large: deliver it and you become one of the city's most important workshops; fail to deliver and the late penalty is heavy.",
    secenekler: [
      {
        metin: "Accept the whole big order.",
        basariliSonuc: {
          mesaj: "Working day and night you delivered the order on time. Your workshop became one of the city's most important, but the workers are worn out.",
        },
        basarisizSonuc: {
          mesaj: "Delivery slipped. You paid the late penalty, and {otorite} handed your share of the order to another workshop.",
        },
      },
      {
        metin: "Take on only part of the order.",
        basariliSonuc: {
          mesaj: "You delivered your share without a hitch. You made a profit without being crushed under the load.",
        },
        basarisizSonuc: {
          mesaj: "There was a small delay, and you took a minor penalty.",
        },
      },
      {
        metin: "Turn the order down and focus on your own customers.",
        basariliSonuc: {
          mesaj: "You refused. {otorite} noted you as 'of no use to the city', but your customers are grateful.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  otorite_zanaat_sd_yangin_yardimi: {
    baslik: "After the Fire",
    metin:
      "In the night, one wing of your workshop burned. The walls are sooty, the machines half-melted. {otorite} has opened a small relief fund for the afflicted; but there are many applicants and they ask for paperwork.",
    secenekler: [
      {
        metin: "Apply to {otorite}'s relief fund.",
        basariliSonuc: {
          mesaj: "Your application was accepted; a reasonable sum was set aside for you from the fund.",
        },
        basarisizSonuc: {
          mesaj: "Your papers were found incomplete. You lost time and covered the necessary expenses yourself.",
        },
      },
      {
        metin: "Ask the neighboring workshops and the guild for help.",
        basariliSonuc: {
          mesaj: "The neighbors stood by you, and the workshop was back on its feet in a few weeks. You'll repay this kindness one day yourself.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Burden no one; put everything back together yourself.",
        basariliSonuc: {
          mesaj: "You repaired the workshop with your own means. It cost dearly, but you owe no one.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  // ───────────── Din Adamı (Clergyman) ─────────────
  otorite_din_oc_adak_payi: {
    baslik: "The Offerings Cut",
    metin:
      "{otorite}'s clerk has come: part of this year's offerings and donations is to be written to the city treasury. 'Holy money is still money,' he says.",
    secenekler: [
      {
        metin: "Hand over the share in full and take the receipt.",
        basariliSonuc: { mesaj: "You handed over the share. {otorite} was pleased with how 'orderly' your flock is." },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Show the donation book short and shrink the share.",
        kilitAciklamasi: "You can't even find a gift to win the clerk over.",
        basariliSonuc: { mesaj: "The clerk wrote 'famine year' in the book; half the share stayed in your pocket." },
        basarisizSonuc: { mesaj: "Someone in the flock gave the book away. {otorite} doubled the share, and your name turned sour." },
      },
      {
        metin: "Go to {otorite} and argue that the offerings belong to the poor.",
        basariliSonuc: { mesaj: "{otorite} heard you out and reduced the share. The poor prayed for you." },
        basarisizSonuc: { mesaj: "{otorite} said, 'Holy money is taxable too.' You paid the share and fell out of favor." },
      },
    ],
  },
  otorite_din_oc_vakif_arazisi: {
    baslik: "Foundation Land",
    metin:
      "The neighbouring plot next to the monastery is up for sale. {otorite} must approve the sale and expects a 'contribution to the community' for the licence. If you buy it, your storehouse and flock grow.",
    secenekler: [
      {
        metin: "Pay the official fee and buy the land by the rules.",
        basariliSonuc: { mesaj: "You paid the fee and the deed was registered. The community started working the new land." },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Slip {otorite} a purse for the licence.",
        kilitAciklamasi: "You can't even find a purse to hand {otorite}.",
        basariliSonuc: { mesaj: "The licence came through quickly; the land came cheap and fast." },
        basarisizSonuc: { mesaj: "Rumours of the bribe spread. The licence was cancelled and the purse never came back." },
      },
      {
        metin: "Give up on the land and make do with what you have.",
        basariliSonuc: { mesaj: "You took on no new burden. {otorite} respected your caution." },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
  otorite_din_sd_ruhsat_denetimi: {
    baslik: "Licence Inspection",
    metin:
      "{otorite}'s official has come to inspect your house of worship: donation records, charity meals, preaching licence… Even a small gap brings a heavy fine.",
    secenekler: [
      {
        metin: "Open all the records and help with the inspection.",
        basariliSonuc: { mesaj: "The inspection ended without trouble. {otorite} wrote 'a model congregation' in the report." },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Slip the official an envelope for 'expenses'.",
        kilitAciklamasi: "You can't even find an envelope to hand the official.",
        basariliSonuc: { mesaj: "The official overlooked the gaps and the report came out clean." },
        basarisizSonuc: { mesaj: "The envelope went into the report. {otorite} fined you and put you under close watch." },
      },
      {
        metin: "Hide the records and say 'the ledgers burned'.",
        basariliSonuc: { mesaj: "The inspection found no records and left; you wiped the money's trail too." },
        basarisizSonuc: { mesaj: "The official found the ledger in the next room. Your licence was suspended and a heavy fine followed." },
      },
    ],
  },
  otorite_din_sd_hayir_cemiyeti: {
    baslik: "The Charity Society",
    metin:
      "A charity society is being founded in the city, and {otorite} has recommended you to head it. Helping the workers' quarter grows your flock, but you must keep strict records and accounts.",
    secenekler: [
      {
        metin: "Accept the chairmanship and run the society with care.",
        basariliSonuc: { mesaj: "The society did good work in the quarter; your flock grew, and {otorite} kept you in mind." },
        basarisizSonuc: { mesaj: "Not used." },
      },
      {
        metin: "Accept, but also use the society's coffers for your own business.",
        basariliSonuc: { mesaj: "You funnelled society money into your own business, and nobody noticed." },
        basarisizSonuc: { mesaj: "When the accounts tangled, the auditor found the trail. {otorite} removed you and your name was tarnished in public." },
      },
      {
        metin: "Politely decline the offer.",
        basariliSonuc: { mesaj: "You pleaded a heavy workload. {otorite} nodded; the society went to someone else." },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
};
