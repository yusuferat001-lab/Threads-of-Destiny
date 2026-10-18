import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/aranmaSeviyesi.ts — İngilizce çevirileri. */
export const OLAYLAR_ARANMA_SEVIYESI_EN: Record<string, OlayCeviri> = {
  aranma_giris_devriye_durdurmasi: {
    baslik: "A Patrol Stopped You",
    metin:
      "A corner patrol wants to search you. No cause, just routine — but your manner made them curious.",
    secenekler: [
      {
        metin: "Stay calm, answer their questions.",
        basariliSonuc: {
          mesaj: "After a brief check they sent you on your way.",
          detay: "Nothing to hide, nothing to fear.",
        },
        basarisizSonuc: {
          mesaj: "One grew suspicious; they wrote your name in a ledger.",
          detay: "Their eyes are on you now.",
        },
      },
      {
        metin: "Slip into the crowd and vanish.",
        basariliSonuc: {
          mesaj: "You vanished in the crowd; the patrol lost you.",
          detay: "Luck was on your side today.",
        },
        basarisizSonuc: {
          mesaj: "Grabbed by the shoulder; running confirmed their suspicion.",
          detay: "Now you're officially wanted.",
        },
      },
    ],
  },

  aranma_giris_meyhane_kavgasi: {
    baslik: "A Brawl in the Tavern",
    metin:
      "The man you were drinking with starts insulting you; tables overturn, fists fly. Time to decide.",
    secenekler: [
      {
        metin: "Pull back, slip outside.",
        basariliSonuc: {
          mesaj: "You slipped out without joining the fight.",
          detay: "The best victory is not fighting.",
        },
        basarisizSonuc: {
          mesaj: "A flying chair knocked you down on your way out.",
          detay: "No one leaves a brawl unscathed.",
        },
      },
      {
        metin: "Throw the man one last punch.",
        basariliSonuc: {
          mesaj: "You laid him out; the tavern cheered, but the patrol heard.",
          detay: "Victory sometimes isn't free.",
        },
        basarisizSonuc: {
          mesaj: "He was stronger; the fight spilled out, patrol noted you both.",
          detay: "Wounded and now on file.",
        },
      },
    ],
  },

  aranma_giris_vergi_direnci: {
    baslik: "Standing Up to the Tax Collector",
    metin:
      "The tax collector is at your door; he wants more than you owe, with no proof. Objecting tempts, but collectors remember.",
    secenekler: [
      {
        metin: "Pay, it's not worth arguing.",
        basariliSonuc: {
          mesaj: "You paid, grumbling; the collector forgot you.",
          detay: "Some battles are lost from the start.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but he added a scornful remark.",
          detay: "He took your money and your pride.",
        },
      },
      {
        metin: "Question the account, refuse to pay.",
        basariliSonuc: {
          mesaj: "You caught the figures' inconsistency; he withdrew, abashed.",
          detay: "This time you were right.",
        },
        basarisizSonuc: {
          mesaj: "Your objection went in the ledger as 'defying the state'.",
          detay: "Your name is in the official records.",
        },
      },
    ],
  },

  aranma_giris_karanlik_teklif: {
    baslik: "A Dark Offer",
    metin:
      "In a dark alley someone offers quick money for plainly illegal work, eyes scanning the street.",
    secenekler: [
      {
        metin: "Turn it down, walk on.",
        basariliSonuc: {
          mesaj: "You refused and walked off quickly.",
          detay: "Some doors should stay closed.",
        },
        basarisizSonuc: {
          mesaj: "You refused, but his last look chilled you.",
          detay: "Here, even 'no' has a price.",
        },
      },
      {
        metin: "Take the job, pocket the money.",
        basariliSonuc: {
          mesaj: "The job went smoothly; good money in your pocket.",
          detay: "Conscience ached, purse grew heavy.",
        },
        basarisizSonuc: {
          mesaj: "The job ended half done, and lookouts noticed you.",
          detay: "Your name is known now — badly.",
        },
      },
    ],
  },

  aranma_1_rutin_sorgu: {
    baslik: "A Routine Questioning",
    metin:
      "Your name is on a small suspects list; an officer stops you with a few questions. Nothing serious — yet.",
    secenekler: [
      {
        metin: "Slip him a 'fee'. (Penance: 18)",
        basariliSonuc: {
          mesaj: "A few coins got your name struck off the list.",
          detay: "Small sums solve big troubles.",
        },
        basarisizSonuc: {
          mesaj: "He took it, left the list alone; spared you today.",
          detay: "Greedy, but cautious.",
        },
      },
      {
        metin: "Deflect politely, pay nothing.",
        basariliSonuc: {
          mesaj: "Your politeness worked; the officer shrugged and left.",
          detay: "Sometimes calm is all it takes.",
        },
        basarisizSonuc: {
          mesaj: "Your answers fell short; your name is now flagged.",
          detay: "Suspicion grew considerably.",
        },
      },
    ],
  },

  aranma_1_isyeri_cezasi: {
    baslik: "A Fine on the Business",
    metin:
      "An inspector wrote your business a small fine over an 'irregularity'. Paying annoys; objecting could annoy more.",
    secenekler: [
      {
        metin: "Pay the fine now. (Penance: 24)",
        basariliSonuc: {
          mesaj: "You paid; the inspector closed your file.",
          detay: "The cheapest way is the fastest.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but he left warning 'eyes open next time'.",
          detay: "Money only postponed it.",
        },
      },
      {
        metin: "Object, call the fine unjust.",
        basariliSonuc: {
          mesaj: "You proved your case; the fine was withdrawn.",
          detay: "Rarely, objecting works.",
        },
        basarisizSonuc: {
          mesaj: "He reported your stubbornness as 'refusing to cooperate'.",
          detay: "You're watched more closely now.",
        },
      },
    ],
  },

  aranma_1_rusvetci_nobetci: {
    baslik: "A Bribable Sentry",
    metin:
      "A sentry whispers: 'For a small gesture I could overlook your file.' Pay in full, or haggle?",
    secenekler: [
      {
        metin: "Pay the full amount. (Penance: 25)",
        basariliSonuc: {
          mesaj: "The sentry pocketed the money and really lost your file.",
          detay: "Some men's word comes with money.",
        },
        basarisizSonuc: {
          mesaj: "He took it but didn't dare lose the file; stayed quiet.",
          detay: "Even a coward sentry has uses.",
        },
      },
      {
        metin: "Haggle for half. (Penance: 13)",
        basariliSonuc: {
          mesaj: "Surprisingly he accepted; same result for half price.",
          detay: "Sometimes courage earns money.",
        },
        basarisizSonuc: {
          mesaj: "He scorned the low sum; coins wasted, file still there.",
          detay: "A cheap offer can be worse than none.",
        },
      },
    ],
  },

  aranma_1_mahalle_dedikodusu: {
    baslik: "Gossip in the Neighborhood",
    metin:
      "An uneasy rumor about you circulates among neighbors; spread further, it may reach wrong ears.",
    secenekler: [
      {
        metin: "Donate to the headman. (Penance: 21)",
        basariliSonuc: {
          mesaj: "The donation silenced the headman; gossip died in a day.",
          detay: "Generosity is the best silencer.",
        },
        basarisizSonuc: {
          mesaj: "The gossip had spread; the headman at least defended you.",
          detay: "Some words can't be taken back.",
        },
      },
      {
        metin: "Ignore it, it'll die out.",
        basariliSonuc: {
          mesaj: "You were right; gossip moved on within days.",
          detay: "Patience is the cheapest fix.",
        },
        basarisizSonuc: {
          mesaj: "Your silence confirmed the gossip; it reached official ears.",
          detay: "Now they really are looking for you.",
        },
      },
    ],
  },

  aranma_2_ev_arastirmasi_tehdidi: {
    baslik: "Threat of a House Search",
    metin:
      "An officer hints he could get an official permit to search your home/business. Deal now and the paper is never written.",
    secenekler: [
      {
        metin: "Lose the permit. (Penance: 43)",
        basariliSonuc: {
          mesaj: "The paper was never seen again.",
          detay: "Bureaucracy runs fastest on money.",
        },
        basarisizSonuc: {
          mesaj:
            "His superior stepped in; paper held up, they won't come today.",
          detay: "Not every bribe is guaranteed.",
        },
      },
      {
        metin: "Stay calm, say you've nothing to hide.",
        basariliSonuc: {
          mesaj: "Your firm manner convinced him; he withdrew the threat.",
          detay: "Composure beats money.",
        },
        basarisizSonuc: {
          mesaj: "He saw through the bluff; the house was ransacked, you were arrested.",
          detay: "7-9 years inside; try escaping.",
        },
      },
    ],
  },

  aranma_2_ihbarci_tehdidi: {
    baslik: "An Informer",
    metin:
      "Someone you know threatens to turn you in unless paid for silence. Give it all, or try with half?",
    secenekler: [
      {
        metin: "Give the full sum. (Penance: 46)",
        basariliSonuc: {
          mesaj: "He took the money and kept quiet; no tip-off went out.",
          detay: "Greedy, but he kept his word.",
        },
        basarisizSonuc: {
          mesaj: "He'd already let something slip; the damage was partial.",
          detay: "Some secrets can't be fully recalled.",
        },
      },
      {
        metin: "Offer half. (Penance: 24)",
        basariliSonuc: {
          mesaj: "He unexpectedly accepted; never expected the money.",
          detay: "Sometimes a little is plenty.",
        },
        basarisizSonuc: {
          mesaj: "He took it as an insult and had you arrested.",
          detay: "Stinginess cost you 7-9 years.",
        },
      },
    ],
  },

  aranma_2_pazar_ceza_ikinci: {
    baslik: "A Second Fine",
    metin:
      "The market fines officer saw your old record and doubled your fine. You may object, but his patience is limited.",
    secenekler: [
      {
        metin: "Pay quietly. (Penance: 49)",
        basariliSonuc: {
          mesaj: "You paid; he lightened your file by one grade.",
          detay: "Sometimes paying quietly is wisest.",
        },
        basarisizSonuc: {
          mesaj: "He 'lost' the receipt and kept you on the list anyway.",
          detay: "Bureaucracy doesn't forget easily.",
        },
      },
      {
        metin: "Object, call the old record unjust.",
        basariliSonuc: {
          mesaj: "Your defense seemed reasonable; the fine was cancelled.",
          detay: "Rare, but not impossible.",
        },
        basarisizSonuc: {
          mesaj: "Your objection counted as 'insolence'; another note on file.",
          detay: "Now you're watched more closely.",
        },
      },
    ],
  },

  aranma_2_gece_baskin_uyarisi: {
    baslik: "Warning of a Night Raid",
    metin:
      "A friend whispers: a small night inspection in your name is planned in days. You can act ahead.",
    secenekler: [
      {
        metin: "Buy off the inspector. (Penance: 55)",
        basariliSonuc: {
          mesaj: "The officer signed the report 'clean'.",
          detay: "Some papers are written in gold.",
        },
        basarisizSonuc: {
          mesaj:
            "His superiors joined too; the report was cautious but not harsh.",
          detay: "Full control is never guaranteed.",
        },
      },
      {
        metin: "Tidy up, erase traces, wait.",
        basariliSonuc: {
          mesaj: "You cleaned all night; inspection found nothing.",
          detay: "Sometimes all it takes is labor.",
        },
        basarisizSonuc: {
          mesaj: "You missed one detail; the inspection proved them right.",
          detay: "Now you count as an official threat.",
        },
      },
    ],
  },

  aranma_3_tutuklama_ekibi: {
    baslik: "An Arrest Team in the Streets",
    metin:
      "No longer suspicion but certainty: a special arrest team hunts you. You look over your shoulder in the street.",
    secenekler: [
      {
        metin: "Buy off the team leader. (Penance: 85)",
        basariliSonuc: {
          mesaj: "The leader took the money and wrote 'no trace found'.",
          detay: "Even the high-ranking can be bought.",
        },
        basarisizSonuc: {
          mesaj: "He took the money but handed you over: broke and jailed.",
          detay: "Some men sell both gold and you.",
        },
      },
      {
        metin: "Hide one last night before leaving.",
        basariliSonuc: {
          mesaj: "Hidden in a barn, you slipped the sweep — for now.",
          detay: "But they're as patient as you.",
        },
        basarisizSonuc: {
          mesaj: "They searched the barn; you had nowhere to run.",
          detay: "Your luck ran out.",
        },
      },
    ],
  },

  aranma_3_muhbir_agi: {
    baslik: "The Informer Network",
    metin:
      "Authorities are paying neighborhood informers to find you. Even your closest neighbor could turn you in.",
    secenekler: [
      {
        metin: "Pay the informer boss. (Penance: 92)",
        basariliSonuc: {
          mesaj: "The boss changed course; the network now hunts someone else.",
          detay: "The highest bidder wins.",
        },
        basarisizSonuc: {
          mesaj:
            "The network was beyond him; at least no extra cost.",
          detay: "Sometimes even money isn't enough.",
        },
      },
      {
        metin: "Silence your quarter. (Penance: 43)",
        basariliSonuc: {
          mesaj: "Local informers fell silent; the real danger was there.",
          detay: "A small investment can suffice.",
        },
        basarisizSonuc: {
          mesaj: "The tip-off came from another quarter; money wasted.",
          detay: "Narrow fixes stay narrow.",
        },
      },
    ],
  },

  aranma_3_sokak_baskini: {
    baslik: "A Raid in Broad Daylight",
    metin:
      "Rounding the corner, two officers demand your ID; they hold a paper with your description. Little time to run.",
    secenekler: [
      {
        metin: "Dive into the crowd and run.",
        basariliSonuc: {
          mesaj: "Between the stalls, you ducked gasping into a side street.",
          detay: "Your heart is still pounding.",
        },
        basarisizSonuc: {
          mesaj: "Your foot caught a basket; they were on you as you fell.",
          detay: "The escape wasn't heroic.",
        },
      },
      {
        metin: "Claim 'wrong person'. (Penance: 77)",
        basariliSonuc: {
          mesaj: "You 'dropped' some money; they forgot the description.",
          detay: "Some ID checks are solved with gold.",
        },
        basarisizSonuc: {
          mesaj: "They weren't convinced; you lost your money and got cuffed.",
          detay: "Nothing worked.",
        },
      },
    ],
  },

  aranma_3_kefaret_odemesi: {
    baslik: "An Official Penance Payment",
    metin:
      "A go-between with indirect access to the judge says he can officially lighten your file — for a fitting 'penance'.",
    secenekler: [
      {
        metin: "Pay the penance. (Penance: 101)",
        basariliSonuc: {
          mesaj: "The penance worked; your file lightened one grade.",
          detay: "Justice sometimes sends a bill.",
        },
        basarisizSonuc: {
          mesaj: "Nothing changed; the go-between may have pocketed it.",
          detay: "Trusting go-betweens is risky.",
        },
      },
      {
        metin: "Don't trust him, fend for yourself.",
        basariliSonuc: {
          mesaj: "You turned him away; at least you weren't deceived.",
          detay: "Doing nothing is safest.",
        },
        basarisizSonuc: {
          mesaj: "You refused, but 'what if it worked' eats at you.",
          detay: "Hesitation is the greatest enemy.",
        },
      },
    ],
  },

  aranma_4_azami_takip: {
    baslik: "Maximum Pursuit",
    metin:
      "A special unit now exists just for you: an eye on every street, a question at every inn. Escape is nearly impossible.",
    secenekler: [
      {
        metin: "Spend it all. (Penance: 154)",
        basariliSonuc: {
          mesaj: "The penance reached the top; the pursuit unit was scaled down.",
          detay: "Your fortune bought your life.",
        },
        basarisizSonuc: {
          mesaj: "They caught you despite the money; now you're broke too.",
          detay: "Money isn't enough: 12-14 years.",
        },
      },
      {
        metin: "Leave the city entirely, no trace.",
        basariliSonuc: {
          mesaj: "Days on back roads took you beyond their reach.",
          detay: "They won't search beyond the border.",
        },
        basarisizSonuc: {
          mesaj: "They waited at the gate; escape ended before it began.",
          detay: "Every exit is watched; 12-14 years.",
        },
      },
    ],
  },

  aranma_4_odul_avcilari: {
    baslik: "Bounty Hunters",
    metin:
      "The bounty on your head moved even independent hunters. You must hide from anyone who smells money.",
    secenekler: [
      {
        metin: "Win a hunter over. (Penance: 139)",
        basariliSonuc: {
          mesaj: "He preferred your offer to the bounty and misled the others.",
          detay: "Sometimes the hunter is the best ally.",
        },
        basarisizSonuc: {
          mesaj: "He took the money and handed you over: broke and wounded.",
          detay: "Can't trust hunters; 12-14 years.",
        },
      },
      {
        metin: "Change your identity, vanish.",
        basariliSonuc: {
          mesaj: "New look, clothes, walk; your old description is useless.",
          detay: "Lost some standing, but alive.",
        },
        basarisizSonuc: {
          mesaj: "A hunter saw through the disguise, recognized and caught you.",
          detay: "No mask fools them; 12-14 years.",
        },
      },
    ],
  },

  aranma_4_son_sans_kefareti: {
    baslik: "A Last-Chance Penance",
    metin:
      "An influential go-between offers to intercede with the highest offices — at an unthinkable penance.",
    secenekler: [
      {
        metin: "Pay the huge penance. (Penance: 200)",
        basariliSonuc: {
          mesaj: "The intercession worked; your file is almost spotless.",
          detay: "Big debts clear only with big sums.",
        },
        basarisizSonuc: {
          mesaj: "It failed, and most of your money went to 'expenses'.",
          detay: "Big gambles bring big losses.",
        },
      },
      {
        metin: "Don't risk it, keep your money.",
        basariliSonuc: {
          mesaj: "You refused; at least your last money stayed yours.",
          detay: "Sometimes not playing is smartest.",
        },
        basarisizSonuc: {
          mesaj: "You refused, but 'what if it saved me' kept you awake.",
          detay: "At this level every decision weighs.",
        },
      },
    ],
  },

  aranma_4_gece_yarisi_baskini: {
    baslik: "A Knock at the Door at Midnight",
    metin:
      "Midnight pounding at your door; torches and angry voices outside. Not the big raid, but a small precursor.",
    secenekler: [
      {
        metin: "Leap to the roof and run.",
        basariliSonuc: {
          mesaj: "You slid across tiles to the next roof; shouts fell behind.",
          detay: "The fastest run of your life.",
        },
        basarisizSonuc: {
          mesaj: "You fell from the roof and they were on you.",
          detay: "Nothing went to plan; 12-14 years ahead.",
        },
      },
      {
        metin: "Stall them with money. (Penance: 147)",
        basariliSonuc: {
          mesaj: "You shoved the money at him; 'wrong house,' he said, and left.",
          detay: "Tonight greed saved your life.",
        },
        basarisizSonuc: {
          mesaj: "The commander refused the money; the door was broken down.",
          detay: "Offers failed; 12-14 years.",
        },
      },
    ],
  },

  aranma_baskin_ortacag: {
    baslik: "House Raid",
    metin:
      "Your door was smashed before dawn. Armored guards burst in with the lord's sealed warrant. Three ways out, all costly.",
    secenekler: [
      {
        metin: "Surrender, don't resist.",
        basariliSonuc: {
          mesaj: "You surrendered; your home was plundered, you were chained.",
          detay: "At least 9 years; penance won't cut it.",
        },
        basarisizSonuc: {
          mesaj: "Though you surrendered, they slammed you down; shackles bit.",
          detay: "Not resisting didn't spare you.",
        },
      },
      {
        metin: "Bribe them. (At least 77 needed)",
        basariliSonuc: {
          mesaj: "The captain saw the gold, said 'wrong house' and withdrew.",
          detay: "Fortune gone, but free; still on file.",
        },
        basarisizSonuc: {
          mesaj: "He took the gold and gave you up anyway: broke and cuffed.",
          detay: "Some men sell both gold and you.",
        },
      },
      {
        metin: "Try a hard escape out the back.",
        basariliSonuc: {
          mesaj:
            "You climbed the wall, vanished; days later, a mountain cave.",
          detay: "Now you're a fugitive the mountains hide.",
        },
        basarisizSonuc: {
          mesaj: "They grabbed you at the wall; resisting earned only a beating.",
          detay: "Beaten, and still in the dungeon.",
        },
      },
    ],
  },

  aranma_baskin_sanayi: {
    baslik: "Workplace Raid",
    metin:
      "Uniformed officers raid at dawn on an official order; your name is on the watch list. Three ways, all costly.",
    secenekler: [
      {
        metin: "Surrender, don't resist.",
        basariliSonuc: {
          mesaj: "You surrendered; they seized your till and shackled you.",
          detay: "At least 9 years; penance won't cut it.",
        },
        basarisizSonuc: {
          mesaj: "You surrendered, yet were slammed to the wall; shackles bit.",
          detay: "Not resisting didn't spare you.",
        },
      },
      {
        metin: "Bribe them. (At least 77 needed)",
        basariliSonuc: {
          mesaj: "The wad in his drawer got the warrant quietly pocketed.",
          detay: "Fortune gone, but free; file waits.",
        },
        basarisizSonuc: {
          mesaj: "He took the money and arrested you anyway: broke and cuffed.",
          detay: "They take both bribe and you.",
        },
      },
      {
        metin: "Try a hard escape out the back.",
        basariliSonuc: {
          mesaj:
            "You fled over the courtyard; days later, a mountain village.",
          detay: "Now you're a fugitive the mountains hide.",
        },
        basarisizSonuc: {
          mesaj: "A whistle; two officers blocked you; resisting earned a beating.",
          detay: "Beaten, and still in the dungeon.",
        },
      },
    ],
  },

  aranma_kacak_ilk_geceler: {
    baslik: "The First Nights on the Mountain",
    metin:
      "The cave's cold cuts to your bones; no roof, no trustworthy friend. To survive, learn fast.",
    secenekler: [
      {
        metin: "Buy provisions from a shepherd.",
        basariliSonuc: {
          mesaj: "The shepherd sold you bread and cheese, no questions.",
          detay: "Mountain folk don't ask questions.",
        },
        basarisizSonuc: {
          mesaj: "The shepherd took the coins but shorted the provisions.",
          detay: "Fugitives haggle poorly.",
        },
      },
      {
        metin: "Forage on your own.",
        basariliSonuc: {
          mesaj: "You found wild fruit and roots and ate your fill.",
          detay: "The mountain rewards patience.",
        },
        basarisizSonuc: {
          mesaj: "You ate the wrong plant and spent the night writhing.",
          detay: "Not every mountain gift is safe.",
        },
      },
    ],
  },

  aranma_kacak_diger_kacaklar: {
    baslik: "Other Fugitives",
    metin:
      "In a valley, a small group fleeing the law sits around a fire. They invite you to join.",
    secenekler: [
      {
        metin: "Join them, survive together.",
        basariliSonuc: {
          mesaj: "You told your story by the fire; they took you in.",
          detay: "Your loneliness lightens a bit.",
        },
        basarisizSonuc: {
          mesaj: "Sensing mistrust, you spent the night apart, alone.",
          detay: "Fugitives don't trust fugitives.",
        },
      },
      {
        metin: "Keep your distance, stay alone.",
        basariliSonuc: {
          mesaj: "You greeted them and moved on; solitude is less risky.",
          detay: "Solitude can be a choice.",
        },
        basarisizSonuc: {
          mesaj: "Leaving them behind, loneliness settled over you.",
          detay: "Being alone up here is costly.",
        },
      },
    ],
  },

  aranma_kacak_yasli_cift: {
    baslik: "A Lonely Hut",
    metin:
      "An old couple at the foot of the mountain offered you shelter. They don't ask who you are, but their eyes are curious.",
    secenekler: [
      {
        metin: "Help repair their hut.",
        basariliSonuc: {
          mesaj: "You mended their roof; they treated you like their own.",
          detay: "Some families need no blood.",
        },
        basarisizSonuc: {
          mesaj: "Your city hands weren't suited to mountain work.",
          detay: "Still, your intent was appreciated.",
        },
      },
      {
        metin: "Steal their food, slip away.",
        basariliSonuc: {
          mesaj: "With their provisions you quietly went back up.",
          detay: "Survival sometimes costs conscience.",
        },
        basarisizSonuc: {
          mesaj: "The old man caught you; his disappointment outweighed words.",
          detay: "Shame can hurt more than hunger.",
        },
      },
    ],
  },

  aranma_kacak_iz_surenler: {
    baslik: "The Trackers",
    metin:
      "Distant barking dogs and hoofbeats froze your blood; someone may still be tracking you.",
    secenekler: [
      {
        metin: "Break camp, move to another valley.",
        basariliSonuc: {
          mesaj: "You walked for hours at night; the new valley seems safer.",
          detay: "Motion is a fugitive's friend.",
        },
        basarisizSonuc: {
          mesaj: "You fell off a crag in the dark, but still gained distance.",
          detay: "This escape wasn't easy.",
        },
      },
      {
        metin: "Wait calmly and watch.",
        basariliSonuc: {
          mesaj: "Just hunters, not after you; you panicked for nothing.",
          detay: "Not every sound is a threat.",
        },
        basarisizSonuc: {
          mesaj: "Trackers; they spotted and chased you, you barely escaped.",
          detay: "Luck wasn't with you this time.",
        },
      },
    ],
  },

  aranma_kacak_kervan_baskini: {
    baslik: "You Came Upon a Lone Caravan",
    metin:
      "You spot a small merchant caravan passing the pass alone. You need provisions; robbing them is an option.",
    secenekler: [
      {
        metin: "Ambush the caravan.",
        basariliSonuc: {
          mesaj: "The raid worked; you took provisions and a few coins.",
          detay: "Mountain law differs from the city's.",
        },
        basarisizSonuc: {
          mesaj: "The caravan men were better armed; you took heavy blows fleeing.",
          detay: "Not every ambush goes to plan.",
        },
      },
      {
        metin: "Offer an honest trade.",
        basariliSonuc: {
          mesaj: "You traded belongings for provisions; he asked nothing.",
          detay: "Merchants care about trade.",
        },
        basarisizSonuc: {
          mesaj: "He recognized you and refused; you left empty-handed.",
          detay: "Your name reached the mountain roads.",
        },
      },
    ],
  },

  aranma_kacak_soguk_kis: {
    baslik: "A Merciless Winter",
    metin:
      "Your first winter on the mountain is merciless; the blizzard rages for days and your food runs low.",
    secenekler: [
      {
        metin: "Spend it all on fire and shelter.",
        basariliSonuc: {
          mesaj: "You barely survived; your fingers narrowly escaped frostbite.",
          detay: "It showed the mountain's true face.",
        },
        basarisizSonuc: {
          mesaj: "The storm wrecked your shelter; you shivered outdoors for days.",
          detay: "Some winters are nearly impossible.",
        },
      },
      {
        metin: "Risk descending to a lower valley.",
        basariliSonuc: {
          mesaj: "An abandoned hut on the way down sheltered you.",
          detay: "Sometimes risk is the only way.",
        },
        basarisizSonuc: {
          mesaj: "Caught in the storm on the descent, you were lost for hours.",
          detay: "As merciless as it is generous.",
        },
      },
    ],
  },

  aranma_kacak_yeni_kimlik: {
    baslik: "A New Identity",
    metin:
      "In a remote mountain village a mysterious man forges identity papers. With enough money you could erase your past.",
    secenekler: [
      {
        metin: "Buy an identity. (At least 40 needed)",
        basariliSonuc: {
          mesaj: "Your old name is gone; no one knows or seeks you.",
          detay: "Traces erased, but you're alive.",
        },
        basarisizSonuc: {
          mesaj: "The papers were such bad forgeries you gave up using them.",
          detay: "Some 'masters' just master your money.",
        },
      },
      {
        metin: "Don't trust him, go your own way.",
        basariliSonuc: {
          mesaj: "You refused and walked deeper into the mountains.",
          detay: "Distrust is sometimes safest.",
        },
        basarisizSonuc: {
          mesaj: "You refused, but for days wondered 'what if I'd accepted'.",
          detay: "Some chances never return.",
        },
      },
    ],
  },

  aranma_kacak_iz_soguyor: {
    baslik: "When the Trail Goes Cold",
    metin:
      "Years passed. Travelers now carry other gossip, not your story. Maybe no one is after you anymore.",
    secenekler: [
      {
        metin: "Return to the city cautiously.",
        basariliSonuc: {
          mesaj: "No one even looked at you entering; your name is forgotten.",
          detay: "First fearless walk in years.",
        },
        basarisizSonuc: {
          mesaj: "A familiar face spotted you at the gate; you fled back.",
          detay: "Some pasts have long memories.",
        },
      },
      {
        metin: "Stay safe in the mountains.",
        basariliSonuc: {
          mesaj: "You left the city forever; the mountain is home now.",
          detay: "Your name became a fairy tale.",
        },
        basarisizSonuc: {
          mesaj: "Unsure of your decision, you spent a restless night.",
          detay: "Some decisions unsettle you afterward.",
        },
      },
    ],
  },

  aranma_kacak_dagli_koyu_ticaret: {
    baslik: "A Distant Mountain Village",
    metin:
      "You stumble on a tiny mountain village hard to find on maps. The villagers are wary but not hostile; trade is possible.",
    secenekler: [
      {
        metin: "Sell your hunted/foraged goods.",
        basariliSonuc: {
          mesaj: "The villagers paid well; a little money in your pocket.",
          detay: "Rare goods are valuable up here.",
        },
        basarisizSonuc: {
          mesaj: "The villagers pushed hard; you earned far less than expected.",
          detay: "Villages haggle their own way.",
        },
      },
      {
        metin: "Stay a night at the inn and rest.",
        basariliSonuc: {
          mesaj: "Warm hearth, your first sound sleep in weeks.",
          detay: "Four walls and a fire suffice.",
        },
        basarisizSonuc: {
          mesaj: "Warm hearth, but your worries wouldn't let you sleep.",
          detay: "A fugitive's mind never fully rests.",
        },
      },
    ],
  },

  aranma_kacak_vahsi_hayvan: {
    baslik: "A Wild Animal in Your Path",
    metin:
      "On a narrow mountain path a large wild beast blocks your way; it won't back off and you can't pass.",
    secenekler: [
      {
        metin: "Retreat slowly, no sudden moves.",
        basariliSonuc: {
          mesaj: "You backed away and took another path; it never noticed.",
          detay: "Patience beats a sword up here.",
        },
        basarisizSonuc: {
          mesaj: "Retreating, you tripped on a branch; the noise made it attack.",
          detay: "The smallest mistake costs dearly.",
        },
      },
      {
        metin: "Fight back with whatever you have.",
        basariliSonuc: {
          mesaj: "After a hard struggle you drove it off; its pelt may be useful.",
          detay: "Survival sometimes means fighting.",
        },
        basarisizSonuc: {
          mesaj: "The beast was far stronger; its claws left deep marks.",
          detay: "Some fights are lost from the start.",
        },
      },
    ],
  },
};
