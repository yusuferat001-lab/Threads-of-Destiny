import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagAsker.ts — İngilizce çevirileri. */
export const OLAYLAR_ORTACAG_ASKER_EN: Record<string, OlayCeviri> = {
  oc_asker_sefer: {
    baslik: "The Distant Campaign",
    metin:
      "The lord of {bolge} is mounting a campaign to distant lands. It may last for years; those who return are rich, those who don't become only a name.",
    secenekler: [
      {
        metin: "Gird on the Black Sword and lead the vanguard!",
        basariliSonuc: {
          mesaj:
            "With the Black Sword you swept across the battlefield like a storm. The largest share of the plunder was yours, but the sword's whispers began to enter your dreams.",
          detay: "Even your own soldiers fear you.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
      },
      {
        metin: "Enlist in the vanguard, take a large share of the plunder.",
        basariliSonuc: {
          mesaj: "You fought in the vanguard; a large share of the plunder was yours.",
          detay:
            "The captured city was given three days of free rein. You told no one what you did, but your chest filled with gold.",
        },
        basarisizSonuc: {
          mesaj: "The vanguard was ambushed; you were carried back badly wounded.",
          detay:
            "A stable boy gave you first aid, the physician came two days later. You are not the only one surprised you lived.",
        },
      },
      {
        metin: "Apply for the lord's headquarters guard.",
        basariliSonuc: {
          mesaj: "You served in the lord's tent; you watched the war on maps.",
          detay:
            "Being someone who sits at the lord's table proved far more useful than swinging a sword. You hear who says what to whom, and that knowledge is worth more than gold.",
        },
        basarisizSonuc: {
          mesaj: "Your request was read as 'currying favor'; you were put on the front line.",
          detay:
            "You neither got the safe post nor escaped the 'coward' mark within the unit. The worst case was the combination of the two, and that is what happened.",
        },
      },
      {
        metin: "Don't go on campaign, stay behind and run the barracks.",
        basariliSonuc: {
          mesaj: "You stayed behind; you kept the barracks in order and lived safe and sound.",
          detay:
            "Your name is not in the stories told after the campaign. But neither are the names of the thirty who didn't come back, and you are here.",
        },
        basarisizSonuc: {
          mesaj: "An officer who counted your staying behind as 'desertion' filed a report.",
          detay:
            "You had stayed with official leave, but there's a note in the records. Not going on campaign is unwelcome even among those who don't go.",
        },
      },
    ],
  },

  oc_asker_kusatma: {
    baslik: "Under Siege",
    metin:
      "{bolge} is under siege. Provisions dwindle, the watch on the walls tightens. The commander wants you to also oversee the distribution of provisions within the city.",
    secenekler: [
      {
        metin: "Distribute the provisions fairly, stand with the people.",
        basariliSonuc: {
          mesaj: "No one went hungry; when the siege lifted the city carried you on its shoulders.",
          detay:
            "You gave away your own share too and lost weight. But in that city there is not one household that won't open its door to you.",
        },
        basarisizSonuc: {
          mesaj: "You distributed fairly but the provisions ran out; you went hungry too and grew weak.",
          detay:
            "Good intentions don't fill sacks. When people turned on each other from hunger they blamed you too; you had emptied your own bowl to feed them.",
        },
      },
      {
        metin: "Give provisions to the soldiers first, strengthen the defense.",
        basariliSonuc: {
          mesaj: "The soldiers stayed strong and the walls held; the city was saved.",
          detay:
            "When the siege lifted the commander congratulated you. That same week the funerals of children dead of hunger were held, and the people will not forget it.",
        },
        basarisizSonuc: {
          mesaj: "The people stormed the provision store; you were wounded in the clash that followed.",
          detay: "You drew a sword on the people of your own city. The wall didn't fall but something inside did, and it never settled back.",
        },
      },
      {
        metin: "Divert part of it to the black market and make yourself a fortune.",
        basariliSonuc: {
          mesaj: "You secretly sold part of the provisions; when the siege ended you were rich.",
          detay: "You grew rich on the money of people dead of hunger. No one learned of it and you will tell no one.",
        },
        basarisizSonuc: {
          mesaj:
            "The black-market accounts came out. Stealing provisions under siege was counted treason; you were hanged from the walls.",
        },
      },
    ],
  },

  oc_asker_turnuva: {
    baslik: "The Knights' Tournament",
    metin:
      "A great tournament is being held in honor of the lord of {bolge}. The entry fee is high, the prize higher, and all the nobles will be in the stands.",
    secenekler: [
      {
        metin: "Enter the jousting, make a name in the field.",
        basariliSonuc: {
          mesaj: "You unhorsed your opponent in the final; you took the prize from the lord's hand.",
          detay:
            "The nobles in the stands learned your name. In the following weeks you received three separate invitations; more than the prize money, the doors it opened were valuable.",
        },
        basarisizSonuc: {
          mesaj: "In the first round the lance struck your chest; your ribs were broken.",
          detay:
            "The entry fee was gone too, and breathing hurt for months. Those who remember the tournament remember not you but the man who felled you.",
        },
      },
      {
        metin: "Don't enter, make connections with the nobles in the stands.",
        basariliSonuc: {
          mesaj: "Watching the tournament you met three nobles; one promised you work.",
          detay:
            "Those who sweated in the field got applause; you got a name. In the long run you'll see over time which is worth more.",
        },
        basarisizSonuc: {
          mesaj: "The nobles took no interest in you; you spent the day lost in the crowd.",
          detay:
            "Dressing well wasn't enough. No one asked your name and you couldn't tell anyone; both money and day were gone.",
        },
      },
      {
        metin: "Bet on the tournament, try to win without entering the ring.",
        basariliSonuc: {
          mesaj: "You bet on the right knight; the bookmaker's face fell as he counted out the purse.",
          detay: "No one welcomed you earning money without swinging a sword, but they didn't ask for it back either.",
        },
        basarisizSonuc: {
          mesaj: "The knight you bet on was knocked out in the first round; you lost the money.",
          detay: "The bookmaker smiled and said 'come again'. The hole in your pocket lasted longer than that smile.",
        },
      },
    ],
  },

  oc_asker_bey_emri: {
    baslik: "The Lord's Order",
    metin:
      "The lord ordered you to 'discipline' a village that hasn't paid its tax. There is no one armed in the village; only families ruined by famine.",
    secenekler: [
      {
        metin: "Carry out the order, collect the tax by force.",
        basariliSonuc: {
          mesaj: "You collected the tax; the lord was pleased and declared you his loyal man.",
          detay: "An old man cursed you as you took his last goat. You rose in the lord's eyes, and that curse came with you.",
        },
        basarisizSonuc: {
          mesaj: "The villagers resisted with sickles; there was a bloody scuffle.",
          detay:
            "You couldn't even collect the full tax, and you lost two of your men. The lord said 'incompetent', the villagers 'cruel'. Both are right.",
        },
      },
      {
        metin: "Pay the tax from your own purse and spare the village.",
        basariliSonuc: {
          mesaj: "You paid the tax yourself; the village lost nothing, and the lord learned nothing.",
          detay:
            "The villagers understood what had happened and said nothing. When you pass through that village they still hand you bread and ayran.",
        },
        basarisizSonuc: {
          mesaj: "The lord found out; he punished you for 'defying the order'.",
          detay:
            "Both your money and your rank are gone. The village was saved, and you are the only one who knows it — sometimes that isn't enough.",
        },
      },
      {
        metin: "Get word to the village, then write a 'found it empty' report.",
        basariliSonuc: {
          mesaj: "The villagers fled and you wrote 'the village was empty'; no one questioned it.",
          detay:
            "No one was harmed and you lost nothing. Solutions this clean are rare, and you may not be this lucky again.",
        },
        basarisizSonuc: {
          mesaj: "A soldier couldn't hold his tongue; the lord learned both your lie and its reason.",
          detay:
            "Lying was counted a heavier crime than refusing the order. Your rank was taken and you are no longer given any orders to carry out.",
        },
      },
    ],
  },

  oc_asker_at_hirsizi: {
    baslik: "The Stolen Horse",
    metin:
      "When you went out on the morning watch you found the spot where your horse was tied empty. A child says he saw a man untie the horse and lead it away in the night.",
    secenekler: [
      {
        metin: "Set your pet wolf on his trail by the thief's scent!",
        basariliSonuc: {
          mesaj:
            "Your wolf cornered the thief deep in the forest. The man had fainted from fear. You took your horse and all the gold on him.",
          detay: "No one in the barracks dares touch your things now.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
      },
      {
        metin: "Give chase, get your horse back.",
        basariliSonuc: {
          mesaj: "You caught the thief at an inn; you got your horse back, the man got away.",
          detay: "No one expected you to recover what was stolen; doing so made you someone talked about in the barracks.",
        },
        basarisizSonuc: {
          mesaj: "The thief wasn't alone; you were ambushed and came back beaten.",
          detay: "You still haven't found your horse, and on top of it you took a beating. The watch officer did not welcome the delay.",
        },
      },
      {
        metin: "File a complaint, request an allowance for a new horse.",
        basariliSonuc: {
          mesaj: "The allowance came through but it wasn't quite the kind of horse you wanted.",
          detay: "The bureaucracy moved slowly but at least you weren't left without a horse.",
        },
        basarisizSonuc: {
          mesaj: "Your allowance request was denied; you had to buy the new horse out of your own pocket.",
          detay: "They said 'you should have looked after your horse'; justice is sometimes this merciless.",
        },
      },
    ],
  },

  oc_asker_esire_merhamet: {
    baslik: "The Wounded Enemy",
    metin:
      "After the fighting you found a wounded enemy soldier on the ground. Unarmed, bleeding, with the fear of death in his eyes. Your commander had ordered no prisoners.",
    secenekler: [
      {
        metin: "Defy the order, leave the man alive.",
        basariliSonuc: {
          mesaj: "You let the man go; no one saw, and you told no one.",
          detay: "Even years later you remember the look in that man's eyes, and you are not sorry.",
        },
        basarisizSonuc: {
          mesaj: "An officer saw you; you got a disciplinary penalty for disobeying orders.",
          detay: "You did what you believed was right and it had a price; still, your conscience is at ease.",
        },
      },
      {
        metin: "Carry out the order.",
        basariliSonuc: {
          mesaj: "You carried out the order; the commander was pleased.",
          detay: "That night as you slept the man's face rose before your eyes; in the morning you spoke of it to no one.",
        },
        basarisizSonuc: {
          mesaj: "Your hand shook, it dragged on; everyone watched in an uncomfortable silence.",
          detay: "Some orders, even when carried out, take something out of you.",
        },
      },
    ],
  },

  oc_asker_kacak_silah_ticareti: {
    baslik: "Arms Smuggling",
    metin:
      "A merchant offers to sell weapons you steal from the army stores to buyers on the enemy side. The price is tempting, the risk just as great.",
    secenekler: [
      {
        metin: "Accept the offer.",
        basariliSonuc: {
          mesaj: "The weapons changed hands, no one noticed.",
          detay: "Your coffer filled but you will never learn who those weapons shot, and that is not a good thing.",
        },
        basarisizSonuc: {
          mesaj:
            "Shortages were noticed during the store count and the trail was followed. You were hanged by a field court for treason.",
        },
      },
      {
        metin: "Refuse the offer, report the matter to the commander.",
        basariliSonuc: {
          mesaj: "Thanks to your report the smuggling ring was broken; you were rewarded.",
          detay: "Your name was spoken as 'a trustworthy soldier'; some offers never come to you now.",
        },
        basarisizSonuc: {
          mesaj: "Your report was not taken seriously, the merchant found another soldier.",
          detay: "You did the right thing but no one thanked you.",
        },
      },
    ],
  },

  oc_asker_manastir_talani: {
    baslik: "An Order to Sack a Monastery",
    metin:
      "Your commander ordered the sacking of a monastery on enemy soil. The monks are unarmed, and their treasures rich enough to cover the war costs.",
    secenekler: [
      {
        metin: "Carry out the order, sack the monastery.",
        basariliSonuc: {
          mesaj: "The monastery's treasure was a great boon to the army; the commander commended you.",
          detay: "The silent looks of the monks are still on your mind; some victories taste bitter.",
        },
        basarisizSonuc: {
          mesaj: "The monks resisted to protect the holy relics; there was a short but violent scuffle.",
          detay: "You took the treasure but you hadn't expected it to be this hard.",
        },
      },
      {
        metin: "Quietly sabotage the order, warn the monastery.",
        basariliSonuc: {
          mesaj: "The monks fled in time and took their treasures with them.",
          detay: "The commander was furious but no one suspected you; there is a deep peace within you.",
        },
        basarisizSonuc: {
          mesaj:
            "A comrade reported you to the commander. You were executed by a field court for aiding and harboring the enemy.",
        },
      },
    ],
  },

  oc_asker_terfi_sinavi: {
    baslik: "The Promotion Exam",
    metin:
      "You have the right to sit the exam for corporal. The exam requires both physical strength and knowledge; if you pass, your pay and standing will rise.",
    secenekler: [
      {
        metin: "Work hard, prepare for the exam.",
        basariliSonuc: {
          mesaj: "You passed the exam; you are a corporal now.",
          detay: "You worked for months and it paid off; your subordinates look at you differently now.",
        },
        basarisizSonuc: {
          mesaj: "You gave out in the physical part and did not pass the exam.",
          detay: "You have no right to try again this year; your effort is wasted for now.",
        },
      },
      {
        metin: "Bribe the exam official.",
        basariliSonuc: {
          mesaj: "Your marks came out 'sufficient'; no one questioned it.",
          detay: "You became a corporal, but you know you didn't earn it; that knowledge bothers you from time to time.",
        },
        basarisizSonuc: {
          mesaj: "Your bribe attempt was noticed by the exam board; both the promotion and your reputation are gone.",
          detay: "No one trusts your exams now; this mark won't wipe off easily.",
        },
      },
    ],
  },

  oc_asker_kislada_hirsizlik: {
    baslik: "Theft in the Barracks",
    metin:
      "Someone's belongings are being stolen in the barracks and suspicion has fallen on a young newcomer. You saw something too but you aren't quite sure.",
    secenekler: [
      {
        metin: "Say what you saw, investigate the real thief.",
        basariliSonuc: {
          mesaj: "Your investigation revealed the real thief; the young soldier was cleared.",
          detay: "You did not turn a blind eye to injustice; that earned you respect in the barracks.",
        },
        basarisizSonuc: {
          mesaj: "You pointed at the wrong person; an innocent soldier was punished.",
          detay: "By the time you noticed your mistake it was too late; it bothered you for a long time.",
        },
      },
      {
        metin: "Don't get involved, mind your own business.",
        basariliSonuc: {
          mesaj: "You stayed out of it; the young soldier was punished, you kept quiet.",
          detay: "Maybe he was innocent, maybe not; you will never know, and it bothers you.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was noticed; there was talk that you 'knew something'.",
          detay: "Not getting involved sometimes carries a price too.",
        },
      },
    ],
  },

  oc_asker_at_yarisi_bahsi: {
    baslik: "The Barracks Horse Race",
    metin:
      "They insist you join the informal horse race the soldiers have organized. The prize purse is large, but the commander does not welcome this kind of amusement.",
    secenekler: [
      {
        metin: "Join the race.",
        basariliSonuc: {
          mesaj: "You won the race by a hair; it was talked about in the barracks for a long time.",
          detay: "When the commander heard, he frowned but couldn't hide his smile.",
        },
        basarisizSonuc: {
          mesaj: "You fell from your horse and lost both the money and your pride.",
          detay: "The other soldiers didn't forget it for weeks; they reminded you at every chance.",
        },
      },
      {
        metin: "Don't join, follow the rules.",
        basariliSonuc: {
          mesaj: "You did not join the race; the commander noticed your discipline.",
          detay: "While the others had fun, you focused on your duty; no one noticed but you did.",
        },
        basarisizSonuc: {
          mesaj: "Your not joining was raised, half-jokingly, as 'cowardice'.",
          detay: "Following the rules sometimes becomes the butt of jokes.",
        },
      },
    ],
  },

  oc_asker_komutan_kizina_ilgi: {
    baslik: "The Commander's Daughter",
    metin:
      "The commander's daughter has started to meet your eye; little notes, secret smiles. This carries both a lovely possibility and a great risk.",
    secenekler: [
      {
        metin: "Return the interest, meet in secret.",
        basariliSonuc: {
          mesaj: "Your relationship managed to stay secret; you are happy.",
          detay: "Some evenings were worth the risk; for now, at least.",
        },
        basarisizSonuc: {
          mesaj: "The commander learned of your relationship; he sent you to a distant garrison.",
          detay: "The love was lovely but the price was heavy; your name was whispered in the barracks for a long time.",
        },
      },
      {
        metin: "Keep your distance, don't take the risk.",
        basariliSonuc: {
          mesaj: "You kept your distance; your career stayed safe.",
          detay: "Sometimes the right decision is the one that stings a little.",
        },
        basarisizSonuc: {
          mesaj: "Despite keeping your distance the gossip began; you were blamed though you did nothing.",
          detay: "Sometimes even innocence has a price.",
        },
      },
    ],
  },

  oc_asker_casus_supheli: {
    baslik: "The Suspicious Stranger",
    metin:
      "A stranger loitering near the fortress caught your eye; looking at maps, asking questions. He could be a spy or just a curious traveler.",
    secenekler: [
      {
        metin: "Seize him and interrogate him.",
        basariliSonuc: {
          mesaj: "The man really was a spy; his confession uncovered a plot.",
          detay: "The fortress commander congratulated you in person; your name was spoken throughout the garrison.",
        },
        basarisizSonuc: {
          mesaj: "The man was an innocent merchant; you had to apologize for arresting him wrongly.",
          detay: "Your suspicion had seemed justified but you were wrong; mistakes like this are not forgotten.",
        },
      },
      {
        metin: "Watch from a distance, gather evidence.",
        basariliSonuc: {
          mesaj: "You watched patiently and gathered solid evidence; the spy fell into the trap.",
          detay: "You reached the right conclusion without haste; the commander liked your approach.",
        },
        basarisizSonuc: {
          mesaj: "You lost him while watching; the man vanished.",
          detay: "Maybe he really was a spy, maybe not; you'll never know now.",
        },
      },
    ],
  },

  oc_asker_savas_ganimeti_paylasimi: {
    baslik: "Dividing the Plunder",
    metin:
      "There is injustice in dividing the plunder taken from the captured fortress; the officers take the lion's share and only crumbs are left for the common soldiers.",
    secenekler: [
      {
        metin: "Object on behalf of the soldiers.",
        basariliSonuc: {
          mesaj: "Your objection worked; the division was rearranged.",
          detay: "The common soldiers began to see you as their spokesman; the officers began to watch you.",
        },
        basarisizSonuc: {
          mesaj: "Your objection was counted 'indiscipline'; the division stayed the same and you were punished.",
          detay: "You said the right thing and the system silenced you.",
        },
      },
      {
        metin: "Stay silent, be content with your share.",
        basariliSonuc: {
          mesaj: "You took your share and made no noise.",
          detay: "It wasn't fair, but at least you stayed out of trouble.",
        },
        basarisizSonuc: {
          mesaj: "Your silence made you 'the officers' man' in the eyes of some comrades.",
          detay: "Sometimes doing nothing is counted as taking a side too.",
        },
      },
    ],
  },

  oc_asker_zehirli_kuyu_taktigi: {
    baslik: "A Dirty Tactic",
    metin:
      "The siege has dragged on; an officer suggests poisoning the enemy fortress's water source. Militarily effective, but civilian losses are unavoidable.",
    secenekler: [
      {
        metin: "Support the suggestion, help carry it out.",
        basariliSonuc: {
          mesaj: "The tactic worked; the fortress surrendered within days.",
          detay: "The victory came fast but you never asked about the civilian losses within; you don't have the courage to.",
        },
        basarisizSonuc: {
          mesaj: "The poison was noticed, the enemy found a different source; only your reputation was damaged.",
          detay: "You tried a dirty road and it didn't even work; you gained nothing.",
        },
      },
      {
        metin: "Oppose the suggestion, defend the traditional way.",
        basariliSonuc: {
          mesaj: "Your objection was heard; the tactic wasn't used, the siege dragged on but stayed honorable.",
          detay: "Some officers found you 'soft', but you are at peace with yourself.",
        },
        basarisizSonuc: {
          mesaj: "Despite your objection the tactic was used; you could only watch.",
          detay: "You opposed it and were not heeded; sometimes saying the right thing isn't enough.",
        },
      },
    ],
  },

  oc_asker_vergi_toplama: {
    baslik: "Tax From a Poor Village",
    metin:
      "You were assigned to collect tax from a village crushed by drought. The villagers can't spare the last crumb of their bread, but your commander wants the exact figure.",
    secenekler: [
      {
        metin: "Collect what was ordered in full.",
        basariliSonuc: {
          mesaj:
            "You collected the tax in full; your commander is pleased, but you can't forget the hungry looks you left behind in the village.",
          detay: "Some duties leave a mark on the conscience.",
        },
        basarisizSonuc: {
          mesaj: "The villagers resisted, there was a small clash; you took the tax by force but came back wounded.",
          detay: "Everything taken by force has a price.",
        },
      },
      {
        metin: "Secretly lower the amount, make up the difference from your own pocket.",
        basariliSonuc: {
          mesaj: "You took pity on the village and covered the shortfall yourself; the villagers never forgot you.",
          detay: "Some consciences cost more than gold.",
        },
        basarisizSonuc: {
          mesaj: "It was noticed that your accounts didn't add up; you were accused of 'embezzlement'.",
          detay: "Kindness is sometimes misunderstood.",
        },
      },
    ],
  },

  oc_asker_casus_ihbari: {
    baslik: "A Suspicious Comrade-in-Arms",
    metin:
      "You suspect that a comrade you have fought shoulder to shoulder with for years is secretly in contact with the enemy. Your evidence isn't certain but your suspicion is strong.",
    secenekler: [
      {
        metin: "Report him to the commander.",
        basariliSonuc: {
          mesaj:
            "Your report proved true; a real spy was caught, and in the barracks your name was spoken as 'sharp-eyed'.",
          detay: "Your instinct did not fail you this time.",
        },
        basarisizSonuc: {
          mesaj: "Your suspicion proved wrong; an innocent friend was put through torture and never forgave you.",
          detay: "Some suspicions cause irreparable harm.",
        },
      },
      {
        metin: "Talk to him privately first, try to learn the truth from him.",
        basariliSonuc: {
          mesaj: "The talk cleared everything up; your suspicion was baseless, and your friendship grew stronger.",
          detay: "Sometimes asking is wiser than accusing.",
        },
        basarisizSonuc: {
          mesaj:
            "He really was a spy! Confronting him wasted time, gave him a chance to flee, and you got beaten on top of it.",
          detay: "Some delays carry a heavy price.",
        },
      },
    ],
  },

  oc_asker_cocuk_asker_egitimi: {
    baslik: "The Young Apprentices",
    metin:
      "Several young apprentice soldiers, thirteen or fourteen years old, were brought to the barracks; the commander entrusted you to harden them and make them battle-ready.",
    secenekler: [
      {
        metin: "Harden them quickly with harsh, merciless training.",
        basariliSonuc: {
          mesaj:
            "The youths turned into hard, disciplined soldiers in a short time; the commander praised you, but you noticed the childish light going out of their eyes.",
          detay: "Some successes are built on the price of a childhood.",
        },
        basarisizSonuc: {
          mesaj: "Your harshness led to a bad accident with one of them; the commander held you responsible.",
          detay: "Excessive harshness sometimes backfires.",
        },
      },
      {
        metin: "Keep them as far from the front as possible, in support roles.",
        basariliSonuc: {
          mesaj:
            "You kept the youths in support services; years later one of them will tell you he owes you his life.",
          detay: "Some protections quietly make a great difference.",
        },
        basarisizSonuc: {
          mesaj: "The commander labeled your decision 'weakness' and scolded you.",
          detay: "Mercy is sometimes counted a flaw in a soldier's eyes.",
        },
      },
    ],
  },

  oc_asker_firari_yoldas: {
    baslik: "The Comrade Planning to Flee",
    metin:
      "You learned that a young comrade, unable to bear the war's horrors any longer, is planning to slip away at night. If he's caught he'll be executed; if you know and say nothing, the charge of treason could fall on you too.",
    secenekler: [
      {
        metin: "Report him to the commander, do your duty.",
        basariliSonuc: {
          mesaj:
            "Your comrade was caught before he could flee and was punished; the commander called you a 'loyal soldier.'",
          detay: "You did your duty, but you can't forget the fear in his eyes.",
        },
        basarisizSonuc: {
          mesaj:
            "Your report came too late; your comrade had already fled, and you were interrogated over 'why didn't you speak sooner.'",
          detay: "You neither saved him nor eased your own conscience.",
        },
      },
      {
        metin: "Stay silent, secretly help him get away.",
        basariliSonuc: {
          mesaj: "Your comrade escaped safe and sound; no one suspected you.",
          detay: "Knowing you saved someone's life gives a peace no medal ever could.",
        },
        basarisizSonuc: {
          mesaj: "Your help came to light; you were accused of treason and narrowly escaped the gallows.",
          detay: "You did what you believed was right, and it nearly cost you your life.",
        },
      },
    ],
  },

  oc_asker_yagma_vicdani: {
    baslik: "The Plundered City",
    metin:
      "The soldiers were given three days' free rein in the conquered city. In one house you found a precious family heirloom; you can keep it for yourself or hand it over to the commander.",
    secenekler: [
      {
        metin: "Keep it, hide it where no one can see.",
        basariliSonuc: {
          mesaj: "You slipped the heirloom into your pack unseen; no one noticed.",
          detay: "Your purse grew heavier, but the faces of that household won't leave your mind.",
        },
        basarisizSonuc: {
          mesaj:
            "An officer found the item on you; you were branded a 'looter' and it was confiscated.",
          detay: "You couldn't manage to hide it, and this time you paid dearly for it.",
        },
      },
      {
        metin: "Hand it to the commander, add it to the official spoils.",
        basariliSonuc: {
          mesaj:
            "You turned the heirloom in; the commander praised your honesty and gave you a small share.",
          detay: "Your gain was small, but there's not a stain on your conscience.",
        },
        basarisizSonuc: {
          mesaj: "What you handed over was deemed 'worthless,' not even a word of thanks came.",
          detay: "Sometimes honesty passes by unnoticed.",
        },
      },
    ],
  },

  oc_asker_paravan_kacakcilik: {
    baslik: "The Offer at the Watchtower",
    metin:
      "While standing guard at the border outpost, a smuggler offers you a regular 'monthly cut' to let his goods pass unchecked.",
    secenekler: [
      {
        metin: "Accept the offer, look the other way.",
        basariliSonuc: {
          mesaj:
            "The smuggler's loads passed unchecked; you gained a small but steady income.",
          detay: "Every load that passes the watchtower adds one more weight to your conscience.",
        },
        basarisizSonuc: {
          mesaj:
            "An inspection team caught you looking the other way; a disciplinary penalty and a fine came together.",
          detay: "You risked your career for a small monthly cut, and lost.",
        },
      },
      {
        metin: "Refuse, catch the smuggler.",
        basariliSonuc: {
          mesaj:
            "You caught the smuggler; the commander rewarded you, and you became known at the outpost as the 'honest sentry.'",
          detay: "Turning down easy money made you stronger in the long run.",
        },
        basarisizSonuc: {
          mesaj: "The smuggler resisted, a brief scuffle broke out; he got away, and you were left wounded.",
          detay: "Doing the right thing doesn't always end easily.",
        },
      },
    ],
  },

  oc_asker_parali_asker_teklifi: {
    baslik: "The Mercenary Offer",
    metin:
      "While on campaign, the captain of an enemy mercenary company offers to have you switch sides for far greater pay. That means serving the enemy of the land you were born to.",
    secenekler: [
      {
        metin: "Accept the offer, switch sides.",
        basariliSonuc: {
          mesaj:
            "You began a rich new life in your new ranks; but your old comrades are now your enemies.",
          detay: "Your purse filled, and your past passed through a door with no way back.",
        },
        basarisizSonuc: {
          mesaj: "Your old commander learned of the plan and set an ambush for you.",
          detay: "Your betrayal was punished by the very side you betrayed to.",
        },
      },
      {
        metin: "Refuse, stay loyal.",
        basariliSonuc: {
          mesaj: "You refused the offer; your comrades never learned of it, but you're proud of yourself.",
          detay: "Some riches aren't worth your conscience's peace.",
        },
        basarisizSonuc: {
          mesaj:
            "The captain, learning you'd refused, informed on you; your commander eyed you with suspicion for a while.",
          detay: "Even doing the right thing can sometimes leave a stain on you.",
        },
      },
    ],
  },

  oc_asker_ac_sehir_kusatmasi: {
    baslik: "The Starving of the Besieged City",
    metin:
      "Word comes that civilians behind the walls of the city you're besieging are dying of starvation. Whether a food caravan is allowed through under a truce flag is your call to make.",
    secenekler: [
      {
        metin: "Let the caravan through.",
        basariliSonuc: {
          mesaj:
            "The civilians got a little relief; your commander is far from pleased the siege will drag on.",
          detay: "This time the humanity in you outweighed military calculation.",
        },
        basarisizSonuc: {
          mesaj:
            "Enemy soldiers had been hidden inside the caravan you allowed through; they attacked your outpost.",
          detay: "Your good will turned into a trap; still, you have no regrets.",
        },
      },
      {
        metin: "Refuse it, count on hunger to hasten surrender.",
        basariliSonuc: {
          mesaj:
            "The city surrendered within days; but the civilian deaths were talked about in the barracks for a long time.",
          detay: "Victory came, but it didn't come clean.",
        },
        basarisizSonuc: {
          mesaj: "The city still didn't surrender; more people simply died for nothing.",
          detay: "This time cruelty didn't even bring a military gain.",
        },
      },
    ],
  },

  oc_asker_haksiz_infaz_emri: {
    baslik: "A Questionable Execution Order",
    metin:
      "The commander wants you to carry out the execution of a young soldier caught deserting. But the look in the man's eyes makes you think he was picked as a scapegoat, innocent.",
    secenekler: [
      {
        metin: "Carry out the order without question.",
        basariliSonuc: {
          mesaj: "You carried out the order; the commander was satisfied, the unit watched in silence.",
          detay: "You kept your discipline, but that morning's memory will never leave you.",
        },
        basarisizSonuc: {
          mesaj: "Your hand shook, it took too long; everyone watching waited in horror.",
          detay: "Some orders, even carried out, hollow a person out from within.",
        },
      },
      {
        metin: "Delay the execution, investigate the evidence.",
        basariliSonuc: {
          mesaj: "Your investigation found the real deserter; the young soldier was cleared at the last moment.",
          detay:
            "You paid for defying the order with the commander's wrath, but a life was saved.",
        },
        basarisizSonuc: {
          mesaj:
            "No evidence was found; you were harshly punished for the delay, and the execution took place after all.",
          detay: "You tried to do right and still couldn't stop it; the two together hurt all the more.",
        },
      },
    ],
  },

  oc_asker_yarali_yoldas_tasima: {
    baslik: "During the Retreat",
    metin:
      "As the routed unit scatters, a badly wounded comrade drags at you; if you carry him your own chance of escape drops.",
    secenekler: [
      {
        metin: "Take him on your back, flee together.",
        basariliSonuc: {
          mesaj:
            "You carried him to safety on your back; your breath is ragged, but he's alive.",
          detay: "Some burdens are heavy, but worth carrying.",
        },
        basarisizSonuc: {
          mesaj:
            "You were both caught by enemy cavalry; you barely survived, badly wounded.",
          detay: "Your sacrifice brought you down too, but you never gave up on him.",
        },
      },
      {
        metin: "Leave him, save your own life.",
        basariliSonuc: {
          mesaj:
            "You fled fast and reached safety; the scream you left behind still rings in your ears.",
          detay: "You survived, but you'll never forget this night.",
        },
        basarisizSonuc: {
          mesaj: "Even fleeing didn't save you from the enemy; you lost your comrade and got wounded besides.",
          detay: "This time your selfishness brought you no gain either.",
        },
      },
    ],
  },

  oc_asker_madalya_yalani: {
    baslik: "The Wrong Hero",
    metin:
      "You've been nominated for a medal for the courage you showed in battle, but another private performed the real act of heroism unnoticed. If you stay silent, the medal is yours.",
    secenekler: [
      {
        metin: "Stay silent, accept the medal.",
        basariliSonuc: {
          mesaj:
            "You pinned the medal to your chest; applause embraced you while the real hero watched silently from the crowd.",
          detay: "You gained fame, but you know it isn't yours.",
        },
        basarisizSonuc: {
          mesaj: "The real hero came forward; your deceit was exposed in front of the whole unit.",
          detay: "Losing a fame you never earned hurt far more than never having it.",
        },
      },
      {
        metin: "Tell the truth, direct the medal to its rightful owner.",
        basariliSonuc: {
          mesaj: "You told the truth; the private got the medal and never forgot your gratitude.",
          detay: "The fame you lost was small next to the peace of your conscience.",
        },
        basarisizSonuc: {
          mesaj: "Telling the truth was read as 'a display of false modesty.'",
          detay: "Sometimes even honesty can be misread.",
        },
      },
    ],
  },
};
