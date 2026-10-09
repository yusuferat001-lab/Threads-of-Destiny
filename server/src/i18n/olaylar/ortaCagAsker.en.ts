import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagAsker.ts — İngilizce çevirileri. */
export const OLAYLAR_ORTACAG_ASKER_EN: Record<string, OlayCeviri> = {
  oc_asker_sefer: {
    baslik: "The Distant Campaign",
    metin:
      "The lord of {bolge} mounts a campaign to distant lands. It may take years; survivors return rich, the rest are just names.",
    secenekler: [
      {
        metin: "Gird the Black Sword, lead the vanguard!",
        basariliSonuc: {
          mesaj:
            "The Black Sword won you the best plunder; its whispers now haunt your dreams.",
          detay: "Even your soldiers fear you.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
      },
      {
        metin: "Join the vanguard for a big share of plunder.",
        basariliSonuc: {
          mesaj: "You fought in the vanguard and took a big share of plunder.",
          detay:
            "Three days of free rein filled your chest with gold.",
        },
        basarisizSonuc: {
          mesaj: "The vanguard was ambushed; you were carried back badly wounded.",
          detay:
            "The doctor came two days late; you're lucky to live.",
        },
      },
      {
        metin: "Seek the lord's headquarters guard.",
        basariliSonuc: {
          mesaj: "You served in the lord's tent, watching the war on maps.",
          detay:
            "What you hear at his table is worth gold.",
        },
        basarisizSonuc: {
          mesaj: "Your request looked like favor-seeking; you were sent to the front.",
          detay:
            "No safe post, and a 'coward' mark besides.",
        },
      },
      {
        metin: "Skip the campaign, run the barracks.",
        basariliSonuc: {
          mesaj: "You stayed behind, ran the barracks and lived safe.",
          detay:
            "You're in no tales; thirty never came home.",
        },
        basarisizSonuc: {
          mesaj: "An officer called your staying behind 'desertion' and filed a report.",
          detay:
            "You had leave, but there's a note on record.",
        },
      },
    ],
  },

  oc_asker_kusatma: {
    baslik: "Under Siege",
    metin:
      "{bolge} is besieged. Provisions dwindle, watches tighten. The commander puts you in charge of distributing food.",
    secenekler: [
      {
        metin: "Share the food fairly, stand with the people.",
        basariliSonuc: {
          mesaj: "No one starved; when the siege lifted, the city carried you on its shoulders.",
          detay:
            "You gave your share too; every door is open to you.",
        },
        basarisizSonuc: {
          mesaj: "You shared fairly, but food ran out; you starved and weakened too.",
          detay:
            "Good intent fills no sacks; the hungry blamed you too.",
        },
      },
      {
        metin: "Feed the soldiers first, strengthen the defense.",
        basariliSonuc: {
          mesaj: "The soldiers held, the walls stood; the city was saved.",
          detay:
            "The commander cheered; the people won't forget the dead.",
        },
        basarisizSonuc: {
          mesaj: "The people stormed the store; you were wounded in the clash.",
          detay: "You drew steel on your people; something in you broke.",
        },
      },
      {
        metin: "Sell some on the black market, get rich.",
        basariliSonuc: {
          mesaj: "You secretly sold some food; by siege's end you were rich.",
          detay: "You grew rich on the starving; none will know.",
        },
        basarisizSonuc: {
          mesaj:
            "The black-market books surfaced; you were hanged on the walls for treason.",
        },
      },
    ],
  },

  oc_asker_turnuva: {
    baslik: "The Knights' Tournament",
    metin:
      "A great tournament honors the lord of {bolge}. High entry fee, higher prize, all the nobles in the stands.",
    secenekler: [
      {
        metin: "Enter the joust, make a name.",
        basariliSonuc: {
          mesaj: "You unhorsed your rival in the final and took the prize from the lord.",
          detay:
            "The nobles learned your name; three invitations came.",
        },
        basarisizSonuc: {
          mesaj: "In round one a lance hit your chest; your ribs broke.",
          detay:
            "The fee is gone, and breathing hurt for months.",
        },
      },
      {
        metin: "Skip it; network with nobles in the stands.",
        basariliSonuc: {
          mesaj: "You met three nobles; one promised you work.",
          detay:
            "The fighters got applause; you got a name.",
        },
        basarisizSonuc: {
          mesaj: "The nobles ignored you; you spent the day lost in the crowd.",
          detay:
            "Fine clothes weren't enough; money and day wasted.",
        },
      },
      {
        metin: "Bet on the bouts; win without fighting.",
        basariliSonuc: {
          mesaj: "You backed the right knight; the bookmaker's face fell.",
          detay: "You won without fighting; no one asked for it back.",
        },
        basarisizSonuc: {
          mesaj: "Your knight fell in round one; you lost the stake.",
          detay: "The bookmaker smiled: 'come again'.",
        },
      },
    ],
  },

  oc_asker_bey_emri: {
    baslik: "The Lord's Order",
    metin:
      "The lord orders you to 'discipline' a village that hasn't paid tax. No one there is armed, only famine-ruined families.",
    secenekler: [
      {
        metin: "Obey, collect the tax by force.",
        basariliSonuc: {
          mesaj: "You collected the tax; the lord was pleased and named you his loyal man.",
          detay: "An old man cursed you as you took his last goat.",
        },
        basarisizSonuc: {
          mesaj: "The villagers resisted with sickles; a bloody scuffle followed.",
          detay:
            "Two men lost; lord said 'inept', village 'cruel'.",
        },
      },
      {
        metin: "Pay the tax yourself, spare the village.",
        basariliSonuc: {
          mesaj: "You paid it yourself; the village lost nothing, the lord learned nothing.",
          detay:
            "They still hand you bread and ayran there.",
        },
        basarisizSonuc: {
          mesaj: "The lord found out and punished you for 'defying orders'.",
          detay:
            "Money and rank are gone; the village was saved.",
        },
      },
      {
        metin: "Warn the village, report it 'found empty'.",
        basariliSonuc: {
          mesaj: "The villagers fled; you wrote 'empty' and no one asked.",
          detay:
            "No one was hurt; solutions this clean are rare.",
        },
        basarisizSonuc: {
          mesaj: "A soldier let it slip; the lord learned the lie and its reason.",
          detay:
            "Lying outweighed refusing; your rank was stripped.",
        },
      },
    ],
  },

  oc_asker_at_hirsizi: {
    baslik: "The Stolen Horse",
    metin:
      "Going on watch, you found your horse gone. A child saw a man lead it off in the night.",
    secenekler: [
      {
        metin: "Set your pet wolf on the thief's trail!",
        basariliSonuc: {
          mesaj:
            "Your wolf cornered the thief in the forest. You took your horse and his gold.",
          detay: "No one in the barracks dares touch your things.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
      },
      {
        metin: "Give chase, reclaim your horse.",
        basariliSonuc: {
          mesaj: "You caught the thief at an inn; got the horse, he escaped.",
          detay: "Recovering it made you talked-about in the barracks.",
        },
        basarisizSonuc: {
          mesaj: "He wasn't alone; you were ambushed and returned beaten.",
          detay: "No horse, a beating, and an angry watch officer.",
        },
      },
      {
        metin: "File a complaint, request a horse allowance.",
        basariliSonuc: {
          mesaj: "The allowance came, but not the horse you wanted.",
          detay: "Slow bureaucracy, but you have a horse.",
        },
        basarisizSonuc: {
          mesaj: "The request was denied; you bought a horse yourself.",
          detay: "'You should've watched your horse,' they said.",
        },
      },
    ],
  },

  oc_asker_esire_merhamet: {
    baslik: "The Wounded Enemy",
    metin:
      "After the fight you find a wounded, unarmed enemy soldier, bleeding and afraid. Your commander ordered no prisoners.",
    secenekler: [
      {
        metin: "Defy the order, spare him.",
        basariliSonuc: {
          mesaj: "You let him go; no one saw, and you told no one.",
          detay: "Years later you recall his eyes without regret.",
        },
        basarisizSonuc: {
          mesaj: "An officer saw you; you got a penalty for disobedience.",
          detay: "You did right and paid for it; conscience clear.",
        },
      },
      {
        metin: "Carry out the order.",
        basariliSonuc: {
          mesaj: "You obeyed; the commander was pleased.",
          detay: "That night his face rose before you.",
        },
        basarisizSonuc: {
          mesaj: "Your hand shook, it dragged on; all watched in uneasy silence.",
          detay: "Some orders, once obeyed, take something from you.",
        },
      },
    ],
  },

  oc_asker_kacak_silah_ticareti: {
    baslik: "Arms Smuggling",
    metin:
      "A merchant offers to sell weapons stolen from army stores to enemy buyers. Tempting price, huge risk.",
    secenekler: [
      {
        metin: "Accept the offer.",
        basariliSonuc: {
          mesaj: "The weapons changed hands unnoticed.",
          detay: "Coffers full; you'll never know who they shot.",
        },
        basarisizSonuc: {
          mesaj:
            "A store count exposed the shortage; you were hanged for treason.",
        },
      },
      {
        metin: "Refuse and report to the commander.",
        basariliSonuc: {
          mesaj: "Your report broke the smuggling ring; you were rewarded.",
          detay: "Now 'trustworthy'; some offers no longer come.",
        },
        basarisizSonuc: {
          mesaj: "Your report was ignored; the merchant found another soldier.",
          detay: "You did right, and no one thanked you.",
        },
      },
    ],
  },

  oc_asker_manastir_talani: {
    baslik: "An Order to Sack a Monastery",
    metin:
      "Your commander orders the sacking of an enemy monastery. The monks are unarmed; its treasure is vast.",
    secenekler: [
      {
        metin: "Obey, sack the monastery.",
        basariliSonuc: {
          mesaj: "The treasure helped the army greatly; the commander commended you.",
          detay: "The monks' silent looks linger; the win is bitter.",
        },
        basarisizSonuc: {
          mesaj: "The monks defended their relics; a short, violent scuffle followed.",
          detay: "You took the treasure, but it was harder than expected.",
        },
      },
      {
        metin: "Quietly sabotage the order, warn the monastery.",
        basariliSonuc: {
          mesaj: "The monks fled in time with their treasure.",
          detay: "Commander raged, suspected nothing; you feel peace.",
        },
        basarisizSonuc: {
          mesaj:
            "A comrade informed on you; you were executed for aiding the enemy.",
        },
      },
    ],
  },

  oc_asker_terfi_sinavi: {
    baslik: "The Promotion Exam",
    metin:
      "You may sit the corporal's exam, testing body and knowledge. Pass, and your pay and standing rise.",
    secenekler: [
      {
        metin: "Study hard, prepare.",
        basariliSonuc: {
          mesaj: "You passed; you're a corporal now.",
          detay: "Months of work paid off; subordinates see you anew.",
        },
        basarisizSonuc: {
          mesaj: "You gave out in the physical test and failed.",
          detay: "No retry this year; your effort is wasted.",
        },
      },
      {
        metin: "Bribe the examiner.",
        basariliSonuc: {
          mesaj: "Your marks came out 'sufficient'; no one questioned it.",
          detay: "You're a corporal, but you know you didn't earn it.",
        },
        basarisizSonuc: {
          mesaj: "The bribe was caught; promotion and reputation are gone.",
          detay: "Your exams are distrusted; the mark won't fade.",
        },
      },
    ],
  },

  oc_asker_kislada_hirsizlik: {
    baslik: "Theft in the Barracks",
    metin:
      "Belongings are being stolen in the barracks, and suspicion falls on a young newcomer. You saw something but aren't sure.",
    secenekler: [
      {
        metin: "Tell what you saw, hunt the real thief.",
        basariliSonuc: {
          mesaj: "You found the real thief; the young soldier was cleared.",
          detay: "You didn't ignore injustice; the barracks respects you.",
        },
        basarisizSonuc: {
          mesaj: "You named the wrong man; an innocent soldier was punished.",
          detay: "You saw your mistake too late; it haunted you.",
        },
      },
      {
        metin: "Stay out, mind your own business.",
        basariliSonuc: {
          mesaj: "You stayed out; the young soldier was punished, you kept quiet.",
          detay: "Was he innocent? You'll never know.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was noticed; talk said you 'knew something'.",
          detay: "Staying out has a price too.",
        },
      },
    ],
  },

  oc_asker_at_yarisi_bahsi: {
    baslik: "The Barracks Horse Race",
    metin:
      "The soldiers insist you join their unofficial horse race. The purse is big, but the commander frowns on such fun.",
    secenekler: [
      {
        metin: "Join the race.",
        basariliSonuc: {
          mesaj: "You won by a hair; the barracks talked for ages.",
          detay: "The commander frowned but couldn't hide a smile.",
        },
        basarisizSonuc: {
          mesaj: "You fell off your horse, losing money and pride.",
          detay: "The soldiers reminded you of it for weeks.",
        },
      },
      {
        metin: "Sit out, follow the rules.",
        basariliSonuc: {
          mesaj: "You sat out; the commander noticed your discipline.",
          detay: "While others had fun, you stayed on duty.",
        },
        basarisizSonuc: {
          mesaj: "Your absence was half-jokingly called 'cowardice'.",
          detay: "Following rules can become a joke.",
        },
      },
    ],
  },

  oc_asker_komutan_kizina_ilgi: {
    baslik: "The Commander's Daughter",
    metin:
      "The commander's daughter keeps meeting your eye: notes, secret smiles. A lovely chance, and a big risk.",
    secenekler: [
      {
        metin: "Return the interest, meet in secret.",
        basariliSonuc: {
          mesaj: "Your affair stayed secret; you're happy.",
          detay: "Some evenings are worth the risk, for now.",
        },
        basarisizSonuc: {
          mesaj: "The commander found out and exiled you to a distant garrison.",
          detay: "Love was sweet, the price heavy; your name was whispered.",
        },
      },
      {
        metin: "Keep your distance, avoid the risk.",
        basariliSonuc: {
          mesaj: "You kept your distance; your career stayed safe.",
          detay: "The right choice sometimes stings.",
        },
        basarisizSonuc: {
          mesaj: "Despite your distance, gossip began; you were blamed for nothing.",
          detay: "Even innocence has a price.",
        },
      },
    ],
  },

  oc_asker_casus_supheli: {
    baslik: "The Suspicious Stranger",
    metin:
      "A stranger loiters near the fortress, studying maps and asking questions. A spy, or merely a curious traveler.",
    secenekler: [
      {
        metin: "Seize and interrogate him.",
        basariliSonuc: {
          mesaj: "He really was a spy; his confession exposed a plot.",
          detay: "The commander congratulated you himself; your name spread.",
        },
        basarisizSonuc: {
          mesaj: "He was an innocent merchant; you had to apologize.",
          detay: "Your suspicion seemed fair, but you erred; it sticks.",
        },
      },
      {
        metin: "Watch from afar, gather proof.",
        basariliSonuc: {
          mesaj: "You gathered proof patiently; the spy walked into the trap.",
          detay: "You got it right without haste; the commander approved.",
        },
        basarisizSonuc: {
          mesaj: "You lost him while watching; he vanished.",
          detay: "Spy or not, you'll never know now.",
        },
      },
    ],
  },

  oc_asker_savas_ganimeti_paylasimi: {
    baslik: "Dividing the Plunder",
    metin:
      "The captured fortress's plunder is split unfairly: officers take the lion's share, soldiers crumbs.",
    secenekler: [
      {
        metin: "Object on behalf of the soldiers.",
        basariliSonuc: {
          mesaj: "Your objection worked; the split was redone.",
          detay: "Soldiers see you as spokesman; officers watch you.",
        },
        basarisizSonuc: {
          mesaj: "Your objection was called 'indiscipline'; you were punished.",
          detay: "You spoke right; the system silenced you.",
        },
      },
      {
        metin: "Stay quiet, accept your share.",
        basariliSonuc: {
          mesaj: "You took your share quietly.",
          detay: "Unfair, but you avoided trouble.",
        },
        basarisizSonuc: {
          mesaj: "Your silence made some comrades call you 'the officers' man'.",
          detay: "Doing nothing is also taking a side.",
        },
      },
    ],
  },

  oc_asker_zehirli_kuyu_taktigi: {
    baslik: "A Dirty Tactic",
    metin:
      "The siege drags on; an officer proposes poisoning the fortress's water. Effective, but civilians will die.",
    secenekler: [
      {
        metin: "Back the plan, help carry it out.",
        basariliSonuc: {
          mesaj: "The tactic worked; the fortress surrendered in days.",
          detay: "Quick victory; you dare not ask about civilians.",
        },
        basarisizSonuc: {
          mesaj: "The poison was noticed, the enemy found another source; reputation hurt.",
          detay: "A dirty road, and it didn't even work.",
        },
      },
      {
        metin: "Oppose it, defend the traditional way.",
        basariliSonuc: {
          mesaj: "Your objection was heard; the siege dragged on, honor intact.",
          detay: "Some called you 'soft'; you're at peace.",
        },
        basarisizSonuc: {
          mesaj: "The tactic was used despite your objection; you could only watch.",
          detay: "You opposed it and weren't heard; being right isn't enough.",
        },
      },
    ],
  },

  oc_asker_vergi_toplama: {
    baslik: "Tax From a Poor Village",
    metin:
      "You must collect tax from a drought-ruined village. The villagers have no bread to spare, but your commander wants the full sum.",
    secenekler: [
      {
        metin: "Collect the full amount ordered.",
        basariliSonuc: {
          mesaj:
            "You collected it all; the commander's pleased, but those hungry eyes haunt you.",
          detay: "Some duties leave marks on the conscience.",
        },
        basarisizSonuc: {
          mesaj: "The villagers resisted; you took the tax by force but got wounded.",
          detay: "Everything taken by force has a price.",
        },
      },
      {
        metin: "Quietly lower it, cover the gap yourself.",
        basariliSonuc: {
          mesaj: "You pitied the village and covered the shortfall; they never forgot you.",
          detay: "Some consciences cost more than gold.",
        },
        basarisizSonuc: {
          mesaj: "Your accounts didn't add up; you were accused of 'embezzlement'.",
          detay: "Kindness is sometimes misread.",
        },
      },
    ],
  },

  oc_asker_casus_ihbari: {
    baslik: "A Suspicious Comrade-in-Arms",
    metin:
      "You suspect a comrade of years is secretly talking to the enemy. Your proof is thin, your suspicion strong.",
    secenekler: [
      {
        metin: "Report him to the commander.",
        basariliSonuc: {
          mesaj:
            "You were right; a real spy was caught and you're called 'sharp-eyed'.",
          detay: "Your instinct held true this time.",
        },
        basarisizSonuc: {
          mesaj: "You were wrong; your innocent friend was tortured and never forgave you.",
          detay: "Some suspicions do irreparable harm.",
        },
      },
      {
        metin: "Talk to him privately first, learn the truth.",
        basariliSonuc: {
          mesaj: "The talk cleared it up; your fear was baseless, the bond stronger.",
          detay: "Asking is sometimes wiser than accusing.",
        },
        basarisizSonuc: {
          mesaj:
            "He was a spy! Confronting him gave him time to flee, and you got beaten.",
          detay: "Some delays cost heavily.",
        },
      },
    ],
  },

  oc_asker_cocuk_asker_egitimi: {
    baslik: "The Young Apprentices",
    metin:
      "Apprentice soldiers aged thirteen or fourteen arrive at the barracks; the commander entrusts you with preparing them for war.",
    secenekler: [
      {
        metin: "Harden them fast with harsh, merciless training.",
        basariliSonuc: {
          mesaj:
            "They became hard soldiers; the commander praised you, but their childhood light died.",
          detay: "Some successes rest on a lost childhood.",
        },
        basarisizSonuc: {
          mesaj: "Your harshness caused an accident; the commander held you responsible.",
          detay: "Excess harshness can backfire.",
        },
      },
      {
        metin: "Keep them far from the front, in support roles.",
        basariliSonuc: {
          mesaj:
            "You kept them in support roles; years on, one will say he owes you his life.",
          detay: "Quiet protection can make a big difference.",
        },
        basarisizSonuc: {
          mesaj: "The commander scolded your decision as 'weakness'.",
          detay: "Mercy can be called a soldier's flaw.",
        },
      },
    ],
  },

  oc_asker_firari_yoldas: {
    baslik: "The Comrade Planning to Flee",
    metin:
      "You learn a young comrade, broken by war, plans to flee by night. Caught, he's executed; if you stay silent you may be accused of treason too.",
    secenekler: [
      {
        metin: "Report him; do your duty.",
        basariliSonuc: {
          mesaj:
            "Your comrade was caught and punished; the commander called you 'loyal'.",
          detay: "Duty done, but his fearful eyes stay with you.",
        },
        basarisizSonuc: {
          mesaj:
            "Too late: he had fled, and you were questioned for not speaking sooner.",
          detay: "You saved neither him nor your conscience.",
        },
      },
      {
        metin: "Stay silent, secretly help him flee.",
        basariliSonuc: {
          mesaj: "Your comrade escaped safely; no one suspected you.",
          detay: "Saving a life gives more peace than any medal.",
        },
        basarisizSonuc: {
          mesaj: "Your help came out; accused of treason, you narrowly escaped the gallows.",
          detay: "You did what you thought right; it nearly cost your life.",
        },
      },
    ],
  },

  oc_asker_yagma_vicdani: {
    baslik: "The Plundered City",
    metin:
      "The conquered city is open to looting for three days. You find a valuable family heirloom; keep it or hand it to the commander.",
    secenekler: [
      {
        metin: "Keep it, hide it unseen.",
        basariliSonuc: {
          mesaj: "You slipped the heirloom into your pack unseen.",
          detay: "Richer, but that household's faces haunt you.",
        },
        basarisizSonuc: {
          mesaj:
            "An officer found it on you; you were branded a 'looter' and it was taken.",
          detay: "You hid it badly and paid dearly.",
        },
      },
      {
        metin: "Hand it to the commander as official spoils.",
        basariliSonuc: {
          mesaj:
            "You turned it in; the commander praised your honesty and gave a small share.",
          detay: "A small gain, but a clean conscience.",
        },
        basarisizSonuc: {
          mesaj: "What you handed in was deemed 'worthless'; no thanks came.",
          detay: "Honesty sometimes goes unnoticed.",
        },
      },
    ],
  },

  oc_asker_paravan_kacakcilik: {
    baslik: "The Offer at the Watchtower",
    metin:
      "On border-post watch, a smuggler offers a regular 'monthly cut' to let his goods pass unchecked.",
    secenekler: [
      {
        metin: "Accept, look away.",
        basariliSonuc: {
          mesaj:
            "The loads passed unchecked; you gained a small, steady income.",
          detay: "Each load adds weight to your conscience.",
        },
        basarisizSonuc: {
          mesaj:
            "Inspectors caught you looking away; discipline and a fine followed.",
          detay: "You risked your career for a small cut.",
        },
      },
      {
        metin: "Refuse, catch the smuggler.",
        basariliSonuc: {
          mesaj:
            "You caught him; the commander rewarded you as the 'honest sentry'.",
          detay: "Refusing easy money made you stronger.",
        },
        basarisizSonuc: {
          mesaj: "The smuggler fought back and escaped; you were wounded.",
          detay: "Doing right doesn't always end easy.",
        },
      },
    ],
  },

  oc_asker_parali_asker_teklifi: {
    baslik: "The Mercenary Offer",
    metin:
      "On campaign, an enemy mercenary captain offers far higher pay to switch sides, serving your homeland's enemy.",
    secenekler: [
      {
        metin: "Accept, switch sides.",
        basariliSonuc: {
          mesaj:
            "You began a rich new life; your old comrades are now your enemies.",
          detay: "Coffers full; your past passed through a one-way door.",
        },
        basarisizSonuc: {
          mesaj: "Your old commander learned the plan and ambushed you.",
          detay: "The side you betrayed punished your betrayal.",
        },
      },
      {
        metin: "Refuse, stay loyal.",
        basariliSonuc: {
          mesaj: "You refused; no one knew, but you're proud of yourself.",
          detay: "Some riches aren't worth a clear conscience.",
        },
        basarisizSonuc: {
          mesaj:
            "The captain informed on you; your commander watched you with suspicion.",
          detay: "Even doing right can leave a stain.",
        },
      },
    ],
  },

  oc_asker_ac_sehir_kusatmasi: {
    baslik: "The Starving of the Besieged City",
    metin:
      "Reports say civilians in the besieged city are starving. Letting a food caravan through under truce is your call.",
    secenekler: [
      {
        metin: "Let the caravan through.",
        basariliSonuc: {
          mesaj:
            "Civilians found relief; the commander is angry the siege will drag on.",
          detay: "This time humanity outweighed calculation.",
        },
        basarisizSonuc: {
          mesaj:
            "Enemy soldiers hid in the caravan and attacked your outpost.",
          detay: "Your goodwill became a trap; no regrets.",
        },
      },
      {
        metin: "Refuse; let hunger hasten surrender.",
        basariliSonuc: {
          mesaj:
            "The city surrendered in days; the civilian deaths were long discussed.",
          detay: "Victory came, but not clean.",
        },
        basarisizSonuc: {
          mesaj: "The city held out anyway; more people died for nothing.",
          detay: "Cruelty didn't even yield military gain.",
        },
      },
    ],
  },

  oc_asker_haksiz_infaz_emri: {
    baslik: "A Questionable Execution Order",
    metin:
      "The commander orders you to execute a young deserter. But his look makes you think he was an innocent scapegoat.",
    secenekler: [
      {
        metin: "Obey without question.",
        basariliSonuc: {
          mesaj: "You obeyed; the commander was satisfied, the unit watched in silence.",
          detay: "You kept discipline; this morning will never leave you.",
        },
        basarisizSonuc: {
          mesaj: "Your hand shook and it dragged on; onlookers waited in horror.",
          detay: "Some orders, once obeyed, hollow you out.",
        },
      },
      {
        metin: "Delay the execution, probe the evidence.",
        basariliSonuc: {
          mesaj: "You found the real deserter; the young soldier was cleared at the last moment.",
          detay:
            "You braved the commander's wrath, and a life was saved.",
        },
        basarisizSonuc: {
          mesaj:
            "No evidence turned up; you were punished for the delay, and he was executed.",
          detay: "You tried right and failed; it hurts twice over.",
        },
      },
    ],
  },

  oc_asker_yarali_yoldas_tasima: {
    baslik: "During the Retreat",
    metin:
      "As the routed unit scatters, a badly wounded comrade clings to you; carrying him lowers your own chance of escape.",
    secenekler: [
      {
        metin: "Carry him, flee together.",
        basariliSonuc: {
          mesaj:
            "You carried him to safety; you're winded, but he lives.",
          detay: "Some burdens are heavy but worth carrying.",
        },
        basarisizSonuc: {
          mesaj:
            "Enemy cavalry caught you both; you barely escaped, badly wounded.",
          detay: "Your sacrifice felled you too, but you never gave up.",
        },
      },
      {
        metin: "Leave him, save yourself.",
        basariliSonuc: {
          mesaj:
            "You fled to safety; the scream you left behind rings in your ears.",
          detay: "You live, but you'll never forget tonight.",
        },
        basarisizSonuc: {
          mesaj: "You didn't escape either; you lost your comrade and got wounded.",
          detay: "Selfishness paid nothing this time.",
        },
      },
    ],
  },

  oc_asker_madalya_yalani: {
    baslik: "The Wrong Hero",
    metin:
      "You're nominated for a medal for bravery, but another private did the real heroics unnoticed. Stay silent and the medal is yours.",
    secenekler: [
      {
        metin: "Stay silent, accept the medal.",
        basariliSonuc: {
          mesaj:
            "You wore the medal to applause while the real hero watched from the crowd.",
          detay: "You won fame, but you know it isn't yours.",
        },
        basarisizSonuc: {
          mesaj: "The real hero stepped forward; your fraud was exposed before the whole unit.",
          detay: "Losing unearned fame hurt more than never having it.",
        },
      },
      {
        metin: "Tell the truth, give the medal to its owner.",
        basariliSonuc: {
          mesaj: "You told the truth; the private got the medal and never forgot your gratitude.",
          detay: "The lost fame is small beside a clear conscience.",
        },
        basarisizSonuc: {
          mesaj: "Telling the truth was read as 'showy modesty'.",
          detay: "Even honesty can be misread.",
        },
      },
    ],
  },
};
