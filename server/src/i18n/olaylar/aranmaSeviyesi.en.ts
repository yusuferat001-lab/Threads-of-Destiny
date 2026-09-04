import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/aranmaSeviyesi.ts — İngilizce çevirileri. */
export const OLAYLAR_ARANMA_SEVIYESI_EN: Record<string, OlayCeviri> = {
  aranma_giris_devriye_durdurmasi: {
    baslik: "A Patrol Stopped You",
    metin:
      "A patrol waiting on the street corner stopped you and wants to search you. They have no clear reason, it's just a routine check — but your manner made them curious.",
    secenekler: [
      {
        metin: "Stay calm, answer their questions properly.",
        basariliSonuc: {
          mesaj: "Your calm worked; after a brief check they sent you on your way.",
          detay: "Sometimes the best defense is having nothing to hide.",
        },
        basarisizSonuc: {
          mesaj: "Despite staying calm, one of them grew suspicious of something; they wrote your name in a ledger.",
          detay: "Their eyes are on you now.",
        },
      },
      {
        metin: "Blend into the crowd and slip away before the search.",
        ipucu: "If you succeed you leave no trace, but if caught the suspicion is confirmed",
        basariliSonuc: {
          mesaj: "You became invisible in the crowd; the patrol couldn't find you.",
          detay: "Luck was on your side for today.",
        },
        basarisizSonuc: {
          mesaj: "You were grabbed by the shoulder; running did exactly the thing they'd suspect.",
          detay: "Now you're officially wanted.",
        },
      },
    ],
  },

  aranma_giris_meyhane_kavgasi: {
    baslik: "A Brawl in the Tavern",
    metin:
      "The man you'd been clinking cups with suddenly started hurling insults; tables were overturned, fists fly through the air. You must decide before things fall completely apart.",
    secenekler: [
      {
        metin: "Pull back, slip outside.",
        basariliSonuc: {
          mesaj: "You slipped out the door without getting drawn into the fight.",
          detay: "Sometimes the best victory is not fighting at all.",
        },
        basarisizSonuc: {
          mesaj: "As you headed for the exit a flying chair knocked you down too.",
          detay: "No one comes out of a crowded brawl completely unscathed.",
        },
      },
      {
        metin: "Throw the man one last punch, give him what he's owed.",
        ipucu: "If you win your pride is satisfied, if you lose you draw attention",
        basariliSonuc: {
          mesaj: "You laid the man out; the tavern cheered, but the noise caught the eye of the patrol in the street.",
          detay: "Victory sometimes isn't free.",
        },
        basarisizSonuc: {
          mesaj: "The man turned out stronger than you; the fight spilled into the street and the patrol noted you both down.",
          detay: "Now you're both wounded and in a file.",
        },
      },
    ],
  },

  aranma_giris_vergi_direnci: {
    baslik: "Standing Up to the Tax Collector",
    metin:
      "The tax collector showed up at your door; the amount he wants is more than your due this year, and he shows no proof either. Objecting is tempting, but tax collectors have long memories.",
    secenekler: [
      {
        metin: "Pay without a word, it's not worth arguing.",
        basariliSonuc: {
          mesaj: "You paid, though grumbling; the collector had already forgotten you.",
          detay: "Some battles are lost from the start.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but the collector slipped in a scornful remark on top of it.",
          detay: "He took your money, and your pride too.",
        },
      },
      {
        metin: "Question the account to his face, refuse to pay.",
        ipucu: "If you're proven right your money stays in your pocket, if not your name goes in the ledger",
        basariliSonuc: {
          mesaj: "You caught the inconsistency in the figures; the collector withdrew, abashed.",
          detay: "This time you were the one in the right.",
        },
        basarisizSonuc: {
          mesaj: "The collector recorded your objection as 'defying the state' in his ledger.",
          detay: "Your name is in the official records now.",
        },
      },
    ],
  },

  aranma_giris_karanlik_teklif: {
    baslik: "A Dark Offer",
    metin:
      "In a dark alley someone approaches and offers work that pays well and fast but is plainly illegal. As he waits for your answer, his eyes keep scanning the surroundings.",
    secenekler: [
      {
        metin: "Turn the offer down, go on your way.",
        basariliSonuc: {
          mesaj: "You refused the offer and walked off with quick steps.",
          detay: "Some doors should stay closed.",
        },
        basarisizSonuc: {
          mesaj: "You refused, but the man's last look sent a chill through you.",
          detay: "In this city, even a 'no' sometimes has a price.",
        },
      },
      {
        metin: "Accept the job, pocket the money.",
        ipucu: "If you win your pockets fill, if you lose a job gets written down against you",
        basariliSonuc: {
          mesaj: "The job went smoothly; a nice sum went into your pocket.",
          detay: "Your conscience ached a little but your purse got heavier.",
        },
        basarisizSonuc: {
          mesaj: "The job was left half done, and on top of that the lookouts noticed you.",
          detay: "Now your name is known in this circle — not in a good way at all.",
        },
      },
    ],
  },

  aranma_1_rutin_sorgu: {
    baslik: "A Routine Questioning",
    metin:
      "You heard your name went onto a small suspects list; an officer stops you and asks a few questions. Nothing serious — yet.",
    secenekler: [
      {
        metin: "Slip the officer a small 'understanding fee'. (Penance: 12)",
        ipucu: "A cheap and reliable way",
        basariliSonuc: {
          mesaj: "The few coins you pressed into the officer's hand were enough to strike your name off the list.",
          detay: "Small sums can solve big troubles.",
        },
        basarisizSonuc: {
          mesaj: "He took the money but wouldn't change the list; at least he left you alone for today.",
          detay: "Some officers are greedy but cautious.",
        },
      },
      {
        metin: "Politely deflect his questions, give no money.",
        basariliSonuc: {
          mesaj: "Your polite manner worked; the officer shrugged and left.",
          detay: "Sometimes all it takes is a little calm.",
        },
        basarisizSonuc: {
          mesaj: "Your answers didn't satisfy him; your name is now officially flagged.",
          detay: "The suspicion has grown considerably.",
        },
      },
    ],
  },

  aranma_1_isyeri_cezasi: {
    baslik: "A Fine on the Business",
    metin:
      "An inspector dropped by the business and wrote you a small fine on the pretext of an 'irregularity'. Paying is annoying, but objecting could be even more annoying.",
    secenekler: [
      {
        metin: "Pay the fine at once, be done with it. (Penance: 15)",
        basariliSonuc: {
          mesaj: "You paid the fine and got the receipt; the inspector closed your file.",
          detay: "Sometimes the cheapest way is the fastest.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but the inspector left threatening 'keep your eyes open next time'.",
          detay: "The money didn't end it, only postponed it.",
        },
      },
      {
        metin: "Object, say the fine is unjust.",
        ipucu: "If you win you get off free, if you lose you draw more attention",
        basariliSonuc: {
          mesaj: "You proved you were right; the inspector had to withdraw the fine.",
          detay: "Rarely, objecting works.",
        },
        basarisizSonuc: {
          mesaj: "The inspector reported your stubbornness to a higher office as 'refusing to cooperate'.",
          detay: "Now you're watched more closely than before.",
        },
      },
    ],
  },

  aranma_1_rusvetci_nobetci: {
    baslik: "A Bribable Sentry",
    metin:
      "A sentry you know whispered, avoiding your eyes, 'For a small gesture I could overlook your file.' Do you pay his full price, or try to haggle?",
    secenekler: [
      {
        metin: "Pay the full amount he wants. (Penance: 16)",
        ipucu: "A reliable way",
        basariliSonuc: {
          mesaj: "The sentry pocketed the money and really did lose your file.",
          detay: "Some men's word comes with the money.",
        },
        basarisizSonuc: {
          mesaj: "He took the money but didn't dare 'forget' the file; at least he stayed quiet for today.",
          detay: "Even a cowardly sentry is sometimes useful.",
        },
      },
      {
        metin: "Try to haggle for half price. (Penance: 8)",
        ipucu: "Cheap but risky — if the deal falls through the money is wasted",
        basariliSonuc: {
          mesaj: "Surprisingly he accepted the haggle; you got the same result for half price.",
          detay: "Sometimes courage earns money.",
        },
        basarisizSonuc: {
          mesaj: "He took the low sum as an insult and refused it; the coins you gave were wasted and your file is still in place.",
          detay: "A cheap offer sometimes ends worse than no offer at all.",
        },
      },
    ],
  },

  aranma_1_mahalle_dedikodusu: {
    baslik: "Gossip in the Neighborhood",
    metin:
      "An uneasy rumor about you is going around among the neighbors; a few more words and it could reach the wrong ears.",
    secenekler: [
      {
        metin: "Make a small 'donation' to the neighborhood headman, shut it down. (Penance: 14)",
        basariliSonuc: {
          mesaj: "Your donation bound the headman's tongue; the gossip died out in a day.",
          detay: "Generosity is sometimes the best silencer.",
        },
        basarisizSonuc: {
          mesaj: "He accepted the donation, but the gossip had already spread too far; at least the headman started defending you.",
          detay: "Some words can't be taken back.",
        },
      },
      {
        metin: "Ignore it, it'll die out on its own.",
        basariliSonuc: {
          mesaj: "You were right; within a few days the gossip moved on to another incident.",
          detay: "Sometimes patience is the cheapest solution.",
        },
        basarisizSonuc: {
          mesaj: "Your silence strengthened the impression that the gossip was true; the rumor reached official ears.",
          detay: "Now they really are looking for you.",
        },
      },
    ],
  },

  aranma_2_ev_arastirmasi_tehdidi: {
    baslik: "Threat of a House Search",
    metin:
      "An officer hints that he could get an official permit to search your home/business. If you come to terms now, the paper will never be written.",
    secenekler: [
      {
        metin: "Pay for the permit to 'get lost'. (Penance: 28)",
        basariliSonuc: {
          mesaj: "The paper really was never seen again.",
          detay: "Bureaucracy is sometimes the machine that runs fastest on money.",
        },
        basarisizSonuc: {
          mesaj:
            "He took the money but one of his superiors stepped in; the paper was held up anyway, at least they won't come today.",
          detay: "Not every bribe is guaranteed.",
        },
      },
      {
        metin: "Look calm, say you have nothing to hide.",
        ipucu: "If you succeed you get off free, if you lose the search happens",
        basariliSonuc: {
          mesaj: "Your firm manner convinced the officer; he withdrew his threat.",
          detay: "Sometimes composure is worth more than money.",
        },
        basarisizSonuc: {
          mesaj: "The officer saw through your bluff and really did issue the search order; the house was turned upside down.",
          detay: "Now your file has swelled considerably.",
        },
      },
    ],
  },

  aranma_2_ihbarci_tehdidi: {
    baslik: "An Informer",
    metin:
      "Someone you know is threatening to turn you in; he wants a price for his silence. Do you give him exactly what he wants, or try to get by with half?",
    secenekler: [
      {
        metin: "Give him the full money he wants. (Penance: 30)",
        basariliSonuc: {
          mesaj: "Once he got the money he really did fall silent; the tip-off never went out.",
          detay: "Greedy, but at least he kept his word.",
        },
        basarisizSonuc: {
          mesaj: "He took the money but had already let something slip to someone; the damage was partly done.",
          detay: "Some secrets can't be fully taken back.",
        },
      },
      {
        metin: "Offer half, refuse the rest. (Penance: 15)",
        ipucu: "Cheap but it could anger him — the money could be wasted",
        basariliSonuc: {
          mesaj: "Unexpectedly he accepted; it seems he never thought he'd get the money at all.",
          detay: "Sometimes even a little is more than enough.",
        },
        basarisizSonuc: {
          mesaj: "He took your offer as an insult and left in a fury — and went straight to the authorities.",
          detay: "Stinginess cost you dearly this time.",
        },
      },
    ],
  },

  aranma_2_pazar_ceza_ikinci: {
    baslik: "A Second Fine",
    metin:
      "The fines officer at the marketplace, seeing the earlier record in your file, doubled your fine. You have the right to object, but so does the officer's patience have limits.",
    secenekler: [
      {
        metin: "Quietly pay the higher fine. (Penance: 32)",
        basariliSonuc: {
          mesaj: "You paid; the officer lightened your file by one grade.",
          detay: "Sometimes shutting up and paying is the smartest way.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but he said he 'lost' the receipt and kept you on the list anyway.",
          detay: "Bureaucracy's memory isn't easily erased.",
        },
      },
      {
        metin: "Object to the fine, argue your earlier record was unjust.",
        ipucu: "If you win you get off free, if you lose you draw more attention",
        basariliSonuc: {
          mesaj: "Your defense seemed reasonable; the officer cancelled the fine.",
          detay: "Rare, but not impossible.",
        },
        basarisizSonuc: {
          mesaj: "Your objection was taken as 'insolence'; another note was added to your file.",
          detay: "Now you're watched even more closely than before.",
        },
      },
    ],
  },

  aranma_2_gece_baskin_uyarisi: {
    baslik: "Warning of a Night Raid",
    metin:
      "A trusted acquaintance whispered that a small night inspection in your name is planned within a few days. It's possible to act ahead of it.",
    secenekler: [
      {
        metin: "Buy off the officer who'll do the inspection in advance. (Penance: 35)",
        basariliSonuc: {
          mesaj: "The officer wrote 'clean' on the inspection report and signed it.",
          detay: "Some papers are written in gold.",
        },
        basarisizSonuc: {
          mesaj:
            "He took the money but at the last moment his superiors joined the inspection too; the report was still written cautiously, at least it wasn't made worse.",
          detay: "Full control is never guaranteed.",
        },
      },
      {
        metin: "Tidy up, erase the traces, wait for the inspection.",
        ipucu: "Free but up to chance",
        basariliSonuc: {
          mesaj: "You toiled all night and left everything spotless; the inspection passed without a trace.",
          detay: "Sometimes all it takes is labor.",
        },
        basarisizSonuc: {
          mesaj: "Despite your effort you missed one detail; the inspection proved them right.",
          detay: "The officers now count you as an official threat.",
        },
      },
    ],
  },

  aranma_3_tutuklama_ekibi: {
    baslik: "An Arrest Team in the Streets",
    metin:
      "It's no longer suspicion but certainty: a special arrest team is looking for you. You look over your shoulder even while walking the street.",
    secenekler: [
      {
        metin: "Buy off the man leading the team with a large penance. (Penance: 55)",
        ipucu: "Expensive but if it works you can breathe",
        basariliSonuc: {
          mesaj: "The man leading the team took the money and wrote his report as 'no trace found'.",
          detay: "Even the high-ranking can turn out to be for sale.",
        },
        basarisizSonuc: {
          mesaj: "The man took the money but handed you over anyway — you're left both broke and behind bars.",
          detay: "Some men sell both the gold and you.",
        },
      },
      {
        metin: "Hide quietly for one last night before leaving the city.",
        ipucu: "Risky but if you succeed you buy time",
        basariliSonuc: {
          mesaj: "You hid in an acquaintance's barn and watched the team comb the city; you dodged it for now.",
          detay: "But they're as patient as you.",
        },
        basarisizSonuc: {
          mesaj: "The barn you were hiding in was searched; you had nowhere left to run.",
          detay: "Your luck ran out this time.",
        },
      },
    ],
  },

  aranma_3_muhbir_agi: {
    baslik: "The Informer Network",
    metin:
      "The authorities are handing out money to informers in the neighborhood to reach you. Now even your closest neighbor could turn you in.",
    secenekler: [
      {
        metin: "Be the one who pays the informer boss a bigger sum. (Penance: 60)",
        basariliSonuc: {
          mesaj: "When the head of the informer network saw your money he changed course; the network is now looking for someone else, not you.",
          detay: "In the dark economy, the highest bidder wins.",
        },
        basarisizSonuc: {
          mesaj:
            "He took the money but the network had already grown too big; he admitted he couldn't control it; at least no more money was added against you.",
          detay: "Sometimes even money isn't enough.",
        },
      },
      {
        metin: "For half the price, silence only the informers in your own neighborhood. (Penance: 28)",
        ipucu: "Cheap but narrow — the money could be wasted",
        basariliSonuc: {
          mesaj: "The informers in your neighborhood fell silent; by luck the real danger was there too.",
          detay: "Sometimes a small investment is enough.",
        },
        basarisizSonuc: {
          mesaj: "Even after you silenced your neighborhood the tip-off came from another quarter; and you'd spent money on top of it.",
          detay: "Narrow solutions stay narrow.",
        },
      },
    ],
  },

  aranma_3_sokak_baskini: {
    baslik: "A Raid in Broad Daylight",
    metin:
      "The moment you turn the corner, two officers block your way and ask for your identity; they have a paper with your description on it. You have very little time to run.",
    secenekler: [
      {
        metin: "Dive into the crowd and run.",
        ipucu: "If you succeed you slip away, if you lose you're caught very badly",
        basariliSonuc: {
          mesaj: "You passed between the market stalls and took shelter, gasping, in a side street.",
          detay: "Your heart is still pounding.",
        },
        basarisizSonuc: {
          mesaj: "Your foot caught on a basket; the moment you hit the ground they were on top of you.",
          detay: "This escape did not end heroically.",
        },
      },
      {
        metin: "Look calm, claim they've got the wrong person. (Penance: 50)",
        basariliSonuc: {
          mesaj: "You 'accidentally dropped' part of the money in your pocket; the officers chose to forget the description.",
          detay: "Some identity checks are solved with gold.",
        },
        basarisizSonuc: {
          mesaj: "They weren't convinced; you lost your money and got handcuffed.",
          detay: "This time nothing worked.",
        },
      },
    ],
  },

  aranma_3_kefaret_odemesi: {
    baslik: "An Official Penance Payment",
    metin:
      "A go-between with indirect access to the region's judge says he can officially lighten your file — for an appropriate 'penance', of course.",
    secenekler: [
      {
        metin: "Pay the penance the go-between wants. (Penance: 65)",
        basariliSonuc: {
          mesaj: "The penance reached the authorities; your file was officially lightened by one grade.",
          detay: "Justice sometimes bills for its work.",
        },
        basarisizSonuc: {
          mesaj: "The go-between said he sent the money but nothing changed; maybe he pocketed it.",
          detay: "Trusting go-betweens is always risky.",
        },
      },
      {
        metin: "Don't trust the go-between, fend for yourself.",
        basariliSonuc: {
          mesaj: "You turned the go-between away; at least you weren't deceived by trusting anyone.",
          detay: "Sometimes doing nothing is the safest.",
        },
        basarisizSonuc: {
          mesaj: "You refused, but the question 'what if it really would have worked' is eating away at you.",
          detay: "Sometimes hesitation is the greatest enemy.",
        },
      },
    ],
  },

  aranma_4_azami_takip: {
    baslik: "Maximum Pursuit",
    metin:
      "A special unit has now been set up just for you; there's an eye at every street corner, a question at every inn door. This is a level where escape is nearly impossible.",
    secenekler: [
      {
        metin: "Pour everything you have into a large penance. (Penance: 100)",
        ipucu: "Very expensive but it might be your only real chance",
        basariliSonuc: {
          mesaj: "The hefty penance reached the highest offices; the pursuit unit was officially scaled down.",
          detay: "Your fortune bought your life.",
        },
        basarisizSonuc: {
          mesaj: "They ignored even that much money and caught you; now you have no cash either.",
          detay: "At some levels even money isn't enough.",
        },
      },
      {
        metin: "Try to leave the city entirely, leave no trace.",
        ipucu: "The riskiest option, but if you succeed the pursuit officially ends",
        basariliSonuc: {
          mesaj: "You moved through back roads for days and got completely beyond the city's sphere of influence.",
          detay: "The pursuit unit is smart enough not to look for you beyond the border.",
        },
        basarisizSonuc: {
          mesaj: "They were waiting for you at the city gate; the escape ended before it began.",
          detay: "At this level every exit is watched.",
        },
      },
    ],
  },

  aranma_4_odul_avcilari: {
    baslik: "Bounty Hunters",
    metin:
      "The bounty on your head has stirred even independent bounty hunters into action. Now you have to hide not only from official agents but from ordinary people who smell money.",
    secenekler: [
      {
        metin: "Try to bring a bounty hunter over to your side. (Penance: 90)",
        ipucu: "A risky gamble — the hunter could take the money and still sell you out",
        basariliSonuc: {
          mesaj: "The bounty hunter found your offer more tempting than the reward; he backed off and even threw the others off your scent.",
          detay: "Sometimes the hunter makes the best ally.",
        },
        basarisizSonuc: {
          mesaj: "The hunter handed you over right after taking the money; you're left both broke and wounded.",
          detay: "Bounty hunters can't be trusted.",
        },
      },
      {
        metin: "Change your identity completely and disappear.",
        ipucu: "Hard but if you succeed the hunters will never recognize you again",
        basariliSonuc: {
          mesaj: "You changed your hair, your clothes, even your walk; your old description is useless now.",
          detay: "You lost a bit of your old standing, but at least you're alive.",
        },
        basarisizSonuc: {
          mesaj: "Your disguise didn't escape one hunter's eye; he recognized you and caught you.",
          detay: "Some eyes are fooled by no mask.",
        },
      },
    ],
  },

  aranma_4_son_sans_kefareti: {
    baslik: "A Last-Chance Penance",
    metin:
      "An influential go-between says he can intercede on your behalf with the highest offices — but a pardon at this level requires an unthinkable penance.",
    secenekler: [
      {
        metin: "Pay the enormous penance demanded. (Penance: 130)",
        basariliSonuc: {
          mesaj: "The intercession really worked; your file was returned to an almost spotless page.",
          detay: "Some debts are cleared only with very large sums.",
        },
        basarisizSonuc: {
          mesaj: "The intercession attempt failed, and a significant part of the money you gave never came back, under the name of 'expenses'.",
          detay: "The biggest gambles can bring the biggest losses.",
        },
      },
      {
        metin: "Don't take that much risk, trust your money.",
        basariliSonuc: {
          mesaj: "You turned the offer down; at least the last money in your pocket stayed yours.",
          detay: "Sometimes not playing at all is the smartest move.",
        },
        basarisizSonuc: {
          mesaj: "You refused, but the thought 'what if it really would have saved me' kept you awake for nights.",
          detay: "At this level every decision weighs heavy.",
        },
      },
    ],
  },

  aranma_4_gece_yarisi_baskini: {
    baslik: "A Knock at the Door at Midnight",
    metin:
      "Your door is being pounded violently at midnight; there are torchlights and angry voices outside. This isn't the big raid itself, but a small advance raid very close to it.",
    secenekler: [
      {
        metin: "Leap from the window to the roof and run.",
        ipucu: "Risky in the dark but if you aren't caught you can breathe",
        basariliSonuc: {
          mesaj: "You jumped to the neighboring roof, even sliding on the tiles; you left shouting behind you.",
          detay: "Tonight was the fastest run of your life.",
        },
        basarisizSonuc: {
          mesaj: "You fell from the roof, and the moment you fell they were on top of you.",
          detay: "Nothing went the way you planned tonight.",
        },
      },
      {
        metin: "Open the door, try to stall them with the money you have. (Penance: 95)",
        basariliSonuc: {
          mesaj: "You shoved everything you had into the commander's hand at the door; the man hesitated for a moment and withdrew, saying 'wrong house'.",
          detay: "Tonight greed saved your life.",
        },
        basarisizSonuc: {
          mesaj: "The commander refused the money and signaled his men; the door was broken down.",
          detay: "This time no offer was enough.",
        },
      },
    ],
  },

  aranma_baskin_ortacag: {
    baslik: "House Raid",
    metin:
      "Your door was broken down before dawn. Armored guards poured into your home/business with a search order; the paper bearing the lord's seal declares that your name is now a wanted one in these lands. You have three ways, and all three carry a price.",
    secenekler: [
      {
        metin: "Surrender, don't resist.",
        ipucu: "You definitely go to prison but at least you stay alive and whole",
        basariliSonuc: {
          mesaj: "You raised your hands and surrendered; the guards plundered your home from top to bottom and put you in chains.",
          detay: "Your fortune and your name were the first things taken from you this morning. Now you'll answer for it in prison.",
        },
        basarisizSonuc: {
          mesaj: "Even though you surrendered, a guard slammed you hard to the ground; the shackles closed with pain.",
          detay: "Not even not resisting could spare you a beating this morning.",
        },
      },
      {
        metin: "Bribe them with your fortune, try to buy your way out. (Requires at least 50)",
        ipucu: "Expensive but you might get off without going to prison",
        basariliSonuc: {
          mesaj: "The man leading the guards looked away when he saw the gold you piled before him; he pulled his men back, saying 'wrong house'.",
          detay: "Most of your fortune was gone this morning, but at least you're free. Your name is still noted somewhere.",
        },
        basarisizSonuc: {
          mesaj: "The man pocketed the gold the moment he took it and pointed at you anyway; you lost your fortune and got handcuffed.",
          detay: "Some men sell both the money and you.",
        },
      },
      {
        metin: "Attempt a hard escape through the back door.",
        ipucu: "Very risky — but if you succeed you take shelter in the mountains as a fugitive the city has forgotten",
        basariliSonuc: {
          mesaj:
            "You jumped from the back window, climbed the garden wall and vanished in the twilight of dawn; after days of walking you took shelter in a lonely cave on a mountaintop.",
          detay: "Your old life is behind you. Now you're a fugitive the city doesn't know, hidden by the mountains.",
        },
        basarisizSonuc: {
          mesaj: "Before you could get over the garden wall, a guard's hand seized your wrist; resisting only got you a beating.",
          detay: "Your escape attempt ended with a beating you wouldn't have taken if you'd surrendered — and you were thrown in the dungeon anyway.",
        },
      },
    ],
  },

  aranma_baskin_sanayi: {
    baslik: "Workplace Raid",
    metin:
      "In the early hours of the morning, uniformed officers raided your workplace/home with an official order. The arrest paper in their hands shows your name is now on the state's watch list. You have three ways, and all three carry a price.",
    secenekler: [
      {
        metin: "Surrender, don't resist.",
        ipucu: "You definitely go to prison but at least you stay alive and whole",
        basariliSonuc: {
          mesaj: "You calmly held out your hands; the officers searched the workplace thoroughly, seized your till, and took you away in iron shackles.",
          detay: "Your fortune and reputation went into the records this morning as 'seized'. Now you'll answer for it in prison.",
        },
        basarisizSonuc: {
          mesaj: "Even though you surrendered, an officer pressed you hard against the wall; the shackles closed with pain.",
          detay: "Not even not resisting could spare you the rough treatment this morning.",
        },
      },
      {
        metin: "Bribe them with your fortune, try to buy your way out. (Requires at least 50)",
        ipucu: "Expensive but you might get off without going to prison",
        basariliSonuc: {
          mesaj: "The bundle of banknotes you quietly left in the drawer of the chief's desk was enough for the arrest paper to be quietly folded and put in a pocket.",
          detay: "Most of your fortune was gone this morning, but at least you're free. Your file is still waiting somewhere.",
        },
        basarisizSonuc: {
          mesaj: "The chief pocketed the money the moment he took it and carried out the arrest order anyway; you lost your fortune and got handcuffed.",
          detay: "Some officials will take both the bribe and you.",
        },
      },
      {
        metin: "Attempt a hard escape through the back door.",
        ipucu: "Very risky — but if you succeed you take shelter in the mountains as a fugitive the city has forgotten",
        basariliSonuc: {
          mesaj:
            "You jumped from the back courtyard and ducked into the back streets; after an escape of days, by train and on foot, you caught your breath at the foot of a distant mountain village.",
          detay: "Your old life is behind you. Now you're a fugitive the city is starting to forget, hidden by the mountains.",
        },
        basarisizSonuc: {
          mesaj: "In the back street a whistle blew and two officers cut off your path; resisting only got you a beating.",
          detay: "Your escape attempt ended with a beating you wouldn't have taken if you'd surrendered — and you were thrown in the dungeon anyway.",
        },
      },
    ],
  },

  aranma_kacak_ilk_geceler: {
    baslik: "The First Nights on the Mountain",
    metin:
      "The cold of the cave cuts to your bones; you have neither a roof nor a trustworthy friend. To survive you have to learn fast.",
    secenekler: [
      {
        metin: "Buy provisions from a shepherd with your last coins.",
        basariliSonuc: {
          mesaj: "The shepherd sold you bread and cheese without asking questions.",
          detay: "Mountain folk don't ask the city's questions.",
        },
        basarisizSonuc: {
          mesaj: "The shepherd took the money but didn't give as much provision as he'd promised.",
          detay: "Fugitives can't always haggle well.",
        },
      },
      {
        metin: "Forage from nature on your own.",
        basariliSonuc: {
          mesaj: "You found wild fruit and roots and filled your stomach.",
          detay: "The mountain gives something to those who are patient.",
        },
        basarisizSonuc: {
          mesaj: "You ate the wrong plant and spent the night writhing.",
          detay: "Not every gift of the mountain is safe.",
        },
      },
    ],
  },

  aranma_kacak_diger_kacaklar: {
    baslik: "Other Fugitives",
    metin:
      "In a valley, a small group fleeing the law like you sits around a lit fire. They offer to let you join them.",
    secenekler: [
      {
        metin: "Join the group, survive together.",
        basariliSonuc: {
          mesaj: "You sat by the fire and told your story; the group accepted you among them.",
          detay: "Loneliness is the heaviest burden on the mountain — it's a little lighter now.",
        },
        basarisizSonuc: {
          mesaj: "You sensed mistrust among them and chose to spend the night alone, a little apart.",
          detay: "Not every fugitive trusts another fugitive.",
        },
      },
      {
        metin: "Keep your distance, prefer to stay alone.",
        basariliSonuc: {
          mesaj: "You greeted the group and went on your way; your solitude puts you at less risk.",
          detay: "Some solitudes are a choice, not a fate.",
        },
        basarisizSonuc: {
          mesaj: "As you left them behind, a loneliness came over you.",
          detay: "Being alone on the mountain is a heavy price.",
        },
      },
    ],
  },

  aranma_kacak_yasli_cift: {
    baslik: "A Lonely Hut",
    metin:
      "At the foot of the mountain an old couple offered you shelter before they realized who you were. They don't ask your identity, but there's a curiosity in their eyes.",
    secenekler: [
      {
        metin: "Help them repair their hut.",
        basariliSonuc: {
          mesaj: "You spent your days mending their roof and chopping wood; the old couple treated you like their own child.",
          detay: "Some families are formed without blood ties.",
        },
        basarisizSonuc: {
          mesaj: "You did what you could, but your city hands weren't much suited to mountain work.",
          detay: "Still, your intention was appreciated.",
        },
      },
      {
        metin: "Steal their provisions at midnight and leave quietly.",
        ipucu: "Easy but it may weigh on your conscience",
        basariliSonuc: {
          mesaj: "With the provisions you took from their pantry you quietly headed back up the mountain.",
          detay: "Survival sometimes requires leaving your conscience behind.",
        },
        basarisizSonuc: {
          mesaj: "The old man caught you just as you were leaving; the disappointment on his face weighed heavier than any words.",
          detay: "Shame sometimes hurts more than hunger.",
        },
      },
    ],
  },

  aranma_kacak_iz_surenler: {
    baslik: "The Trackers",
    metin:
      "The sound of dogs barking and horseshoes coming from afar froze your blood; someone might still be tracking you.",
    secenekler: [
      {
        metin: "Strike camp at once and move to another valley.",
        ipucu: "Safe but exhausting",
        basariliSonuc: {
          mesaj: "At midnight you packed everything and walked for hours; the new valley looks safer.",
          detay: "Constant movement is a fugitive's best friend.",
        },
        basarisizSonuc: {
          mesaj: "Walking in the dark you fell off a crag; still, you managed to put distance between you.",
          detay: "This escape was not easy at all.",
        },
      },
      {
        metin: "Wait calmly to observe the sounds.",
        ipucu: "Risky but if it's true you won't have tired yourself for nothing",
        basariliSonuc: {
          mesaj: "The sounds were just a hunting party, they weren't after you; you panicked for nothing.",
          detay: "Not every sound on the mountain is a threat.",
        },
        basarisizSonuc: {
          mesaj: "It really was a tracking party; they spotted you and started a short chase, and you barely got away.",
          detay: "Luck wasn't much on your side this time.",
        },
      },
    ],
  },

  aranma_kacak_kervan_baskini: {
    baslik: "You Came Upon a Lone Caravan",
    metin:
      "You noticed a small merchant caravan passing alone through the mountain pass. You need provisions to survive; robbing them is an option.",
    secenekler: [
      {
        metin: "Set an ambush and raid the caravan.",
        ipucu: "If you win you'll be fed, if you lose you'll be badly wounded",
        basariliSonuc: {
          mesaj: "The raid worked; you took enough provisions and a few coins from the caravan.",
          detay: "The law of the mountain works differently from the law of the city now.",
        },
        basarisizSonuc: {
          mesaj: "The caravan men were better armed than you expected; you took heavy blows while fleeing.",
          detay: "Not every ambush goes as planned.",
        },
      },
      {
        metin: "Approach the caravan and offer an honest trade.",
        basariliSonuc: {
          mesaj: "You traded a few of your belongings for provisions; the caravan leader asked nothing.",
          detay: "Some merchants care only about trade.",
        },
        basarisizSonuc: {
          mesaj: "The caravan leader recognized your description and refused to do business with you; you came away empty-handed.",
          detay: "The shadow of your reputation has reached even the mountain roads.",
        },
      },
    ],
  },

  aranma_kacak_soguk_kis: {
    baslik: "A Merciless Winter",
    metin:
      "The first winter you spend on the mountain is merciless; the snowstorm doesn't let up for days, and your provisions are about to run out.",
    secenekler: [
      {
        metin: "Spend everything you have on fire and shelter.",
        basariliSonuc: {
          mesaj: "You barely rode out the storm; a few of your fingers came back from the edge of frostbite.",
          detay: "This winter showed you the true face of the mountain.",
        },
        basarisizSonuc: {
          mesaj: "The storm tore down your shelter; you spent days in the open, shivering and trying to survive.",
          detay: "Some winters are nearly impossible.",
        },
      },
      {
        metin: "Risk descending to a lower, deserted valley.",
        ipucu: "Risky but if you succeed you'll find a safer place to winter",
        basariliSonuc: {
          mesaj: "An abandoned hut you found on the way down protected you from the storm.",
          detay: "Sometimes taking a risk is the only way to survive.",
        },
        basarisizSonuc: {
          mesaj: "On the way down you got caught in the middle of the storm and couldn't find your bearings for hours.",
          detay: "The mountain can be as merciless as it is generous.",
        },
      },
    ],
  },

  aranma_kacak_yeni_kimlik: {
    baslik: "A New Identity",
    metin:
      "In a distant mountain village you met a mysterious man who can forge identity papers. With enough money, you could erase your past entirely and start over.",
    secenekler: [
      {
        metin: "Buy a new identity, leave your past behind. (Requires at least 40)",
        ipucu: "Expensive and risky but if it works you can return freely to the city",
        basariliSonuc: {
          mesaj: "With your new papers your old name was left behind too; no one recognizes you now, no one is looking for you.",
          detay: "The traces of your old life are erased, but you're still alive — that counts as a victory.",
        },
        basarisizSonuc: {
          mesaj: "The man took the money but the papers were so badly forged that they'd be spotted at the first check; you gave up using them.",
          detay: "Some 'masters' are only masters at taking your money.",
        },
      },
      {
        metin: "Don't trust him, go on your own way.",
        basariliSonuc: {
          mesaj: "You turned the offer down and kept walking into the depths of the mountain.",
          detay: "Not trusting is sometimes the safest choice.",
        },
        basarisizSonuc: {
          mesaj: "You refused, but for days after the offer you kept thinking 'what if I'd accepted'.",
          detay: "Some chances never come again.",
        },
      },
    ],
  },

  aranma_kacak_iz_soguyor: {
    baslik: "When the Trail Goes Cold",
    metin:
      "Years have passed. Travelers crossing the mountain now carry not your story but other gossip. Maybe no one is after you anymore.",
    secenekler: [
      {
        metin: "Try to return to the city, to your old life, with cautious steps.",
        ipucu: "If you succeed you return freely to your old life, if you lose you have to flee to the mountains again",
        basariliSonuc: {
          mesaj: "When you entered the city no one even turned to look; your name really has been forgotten.",
          detay: "For the first time in years, you walked the street unafraid.",
        },
        basarisizSonuc: {
          mesaj: "Just as you entered the city a familiar face noticed you; you had to flee back to the mountains at once.",
          detay: "Some pasts have longer memories than you'd think.",
        },
      },
      {
        metin: "Don't take the risk, stay in the safety of the mountains.",
        ipucu: "This could be your permanent new life now",
        basariliSonuc: {
          mesaj: "You decided to leave the city behind forever; the mountain is your true home now.",
          detay: "In the city below, your name has turned into a legend, almost a fairy tale.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't be sure of your decision; you spent a restless night.",
          detay: "Some decisions unsettle you even after they're made.",
        },
      },
    ],
  },

  aranma_kacak_dagli_koyu_ticaret: {
    baslik: "A Distant Mountain Village",
    metin:
      "You came upon a small mountain village hard to find even on maps. The villagers are wary of outsiders but not hostile; maybe there's a trade to be made between you.",
    secenekler: [
      {
        metin: "Sell the goods you've hunted/foraged in the village.",
        basariliSonuc: {
          mesaj: "The villagers gave a good price for what you brought; a little money went into your pocket.",
          detay: "Rare goods are valuable in mountain villages.",
        },
        basarisizSonuc: {
          mesaj: "The villagers pushed you too hard in the haggling; you earned far less than you expected.",
          detay: "Mountain villages haggle by their own rules too.",
        },
      },
      {
        metin: "Stay a night at the village inn and rest.",
        basariliSonuc: {
          mesaj: "The night you spent by a warm hearth was enough for you to sleep soundly for the first time in weeks.",
          detay: "Sometimes all you need is four walls and a fire.",
        },
        basarisizSonuc: {
          mesaj: "Warm as the hearth was, the worries in your mind wouldn't let you sleep.",
          detay: "A fugitive's mind never fully rests.",
        },
      },
    ],
  },

  aranma_kacak_vahsi_hayvan: {
    baslik: "A Wild Animal in Your Path",
    metin:
      "On a narrow mountain path a large wild animal suddenly appeared in front of you; neither is it backing off nor can you easily pass.",
    secenekler: [
      {
        metin: "Retreat slowly, without any sudden moves.",
        basariliSonuc: {
          mesaj: "You retreated step by step and went around by another path; the animal didn't even notice you.",
          detay: "On the mountain, patience is a more valuable weapon than a sword.",
        },
        basarisizSonuc: {
          mesaj: "While retreating you caught on a branch and fell; the noise startled the animal into attacking.",
          detay: "Even the smallest mistake can cost you dearly on the mountain.",
        },
      },
      {
        metin: "Defend yourself, fighting with whatever you have.",
        ipucu: "Risky but if you succeed you both survive and win a valuable pelt",
        basariliSonuc: {
          mesaj: "After a hard struggle you drove the animal off; even its pelt could be useful to you.",
          detay: "Surviving on this mountain sometimes requires fighting.",
        },
        basarisizSonuc: {
          mesaj: "The animal turned out far stronger than you; its claws left deep marks.",
          detay: "Some fights are lost from the very start.",
        },
      },
    ],
  },
};
