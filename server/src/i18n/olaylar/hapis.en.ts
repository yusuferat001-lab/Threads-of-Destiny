import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/hapis.ts — İngilizce çevirileri. */
export const OLAYLAR_HAPIS_EN: Record<string, OlayCeviri> = {
  hapis_tutuklanma: {
    baslik: "Guards at the Door",
    metin:
      "Your past dark deeds have finally caught up with you: the guards at your door carry an arrest warrant. Your name in the city was already tarnished; now the time has come to pay the price.",
    secenekler: [
      {
        metin: "Try to escape through the back door.",
        ipucu: "If you succeed you escape prison entirely, but it's very risky",
        basariliSonuc: {
          mesaj: "You leapt across the rooftops and shook off the guards; you ended up gasping for breath at the far end of the city, but you are free.",
          detay: "This escape story will be passed from mouth to mouth for a while.",
        },
        basarisizSonuc: {
          mesaj: "You were caught; your escape attempt made you look even more dangerous in the guards' eyes.",
          detay: "You are behind bars now, and a prisoner with a bad reputation at that.",
        },
      },
      {
        metin: "Don't resist, surrender.",
        ipucu: "Going to prison is inevitable, but at least it goes calmly",
        basariliSonuc: {
          mesaj: "You surrendered without resisting; you were chained and taken to prison.",
          detay: "You are a prisoner now. You'll need to find a way out of here.",
        },
        basarisizSonuc: {
          mesaj: "Despite staying calm, a guard shoved you roughly; you entered prison wounded.",
          detay: "Justice is not gentle here.",
        },
      },
    ],
  },

  hapis_kacis_girisimi: {
    baslik: "The Escape Plan",
    metin:
      "Your cellmates noticed the earth beneath the cell is loose. When the night guards change shift a window of opportunity could open.",
    secenekler: [
      {
        metin: "Start digging the tunnel, take the risk.",
        ipucu: "If you succeed you're free, but if you're caught you could lose your life",
        basariliSonuc: {
          mesaj: "At midnight you slipped through the tunnel and made it out of the city; you're free now.",
          detay: "This escape story of yours will turn into a legend.",
        },
        basarisizSonuc: {
          mesaj: "The guards caught you in the middle of the tunnel; you were thrown into the punishment cell.",
          detay:
            "You have no choice but to wait for the next chance. One of the guards nearly threw a spear; lucky for you, you only took a beating.",
        },
      },
      {
        metin: "Wait, watch for a safer moment.",
        ipucu: "Safe, no progress",
        basariliSonuc: {
          mesaj: "You chose to spend today quietly; the chance may come another day.",
          detay: "Patience is sometimes your only weapon.",
        },
        basarisizSonuc: {
          mesaj: "The waiting broke your spirit; the walls felt like they were closing in more and more.",
          detay: "Time flows differently in prison.",
        },
      },
    ],
  },

  hapis_rusvet_girisimi: {
    baslik: "The Power of Gold",
    metin:
      "One of the guards approached quietly and whispered, 'Every lock has a price.' With the little money you have, you could try to buy your way out.",
    secenekler: [
      {
        metin: "Offer the money you have as a bribe.",
        ipucu: "Expensive, but if it works you're free",
        basariliSonuc: {
          mesaj: "The guard pocketed the money and 'accidentally' left the door open that night.",
          detay: "Justice sometimes smiles on the highest bidder.",
        },
        basarisizSonuc: {
          mesaj: "The guard took the money but reported you to his commander; you are both broke and out of favor.",
          detay: "Some guards refuse to sell both their money and their conscience — they just take the money.",
        },
      },
      {
        metin: "Don't take the risk, don't trust your money.",
        ipucu: "Safe",
        basariliSonuc: {
          mesaj: "You turned the offer down; at least your money stayed in your pocket.",
          detay: "Not trusting some opportunities is the wiser choice.",
        },
        basarisizSonuc: {
          mesaj: "You resented missing the chance.",
          detay: "You kept thinking 'if only I'd taken the risk'.",
        },
      },
    ],
  },

  hapis_isyan_firsati: {
    baslik: "Chaos in the Ward",
    metin:
      "The anger building among the prisoners suddenly exploded; the ward turned into a riot and the guards have lost control. In this chaos a way out might be found — but as the riot is put down, no one knows who lives and who dies.",
    secenekler: [
      {
        metin: "Draw the Black Sword and bring the whole ward to heel!",
        ipucu: "Secret Inventory: usually makes you the prison boss, but the chaos can be bigger than the blade",
        basariliSonuc: {
          mesaj:
            "When you drew the Black Sword the cells ran with blood. Neither prisoners nor guards could stand against you. You run this prison now.",
          detay: "The sword didn't set you free, but it made the cage a golden throne for you.",
        },
        basarisizSonuc: {
          mesaj:
            "You swung the sword, but the riot was a flood — they came down on you from three sides at once. The blade slipped from your hand and they left you under their boots.",
          detay: "Chaos bowed to no steel, however sharp.",
        },
      },
      {
        metin: "Take advantage of the chaos and run for the door.",
        ipucu: "Very risky — a high chance of both being caught and taking a beating",
        basariliSonuc: {
          mesaj: "In the middle of the chaos no one noticed you; you slipped out the door and reached freedom.",
          detay: "The screams you left behind won't leave your ears for a long time.",
        },
        basarisizSonuc: {
          mesaj: "In the middle of the chaos a guard's club laid you flat; you were counted a rioter.",
          detay: "When the ward calmed down, you took the heaviest punishment.",
        },
      },
      {
        metin: "Withdraw to your cell, stay out of the chaos.",
        ipucu: "Safe, but the chance is lost",
        basariliSonuc: {
          mesaj: "You waited quietly in the corner; no one touched you until the riot was put down.",
          detay: "Some fights are not yours.",
        },
        basarisizSonuc: {
          mesaj: "During the chaos a kick landed on you at random; you were wounded though innocent.",
          detay: "Sometimes just being there makes you pay a price.",
        },
      },
    ],
  },

  hapis_yeni_tanidik: {
    baslik: "A Friend Behind Bars",
    metin:
      "Your cellmate {dost} told you their own story; perhaps they were the first person to make you feel you aren't alone here.",
    secenekler: [
      {
        metin: "Trust them, grow the friendship.",
        ipucu: "Makes life inside a little more bearable",
        basariliSonuc: {
          mesaj: "A real bond formed between you and {dost}; you aren't alone here anymore.",
          detay: "Some friendships are born in the darkest places.",
        },
        basarisizSonuc: {
          mesaj: "What you told them reached the wrong ears; you regretted it a little.",
          detay: "Trust can cost you dearly in prison.",
        },
      },
      {
        metin: "Keep your distance, trust no one.",
        ipucu: "Safe but lonely",
        basariliSonuc: {
          mesaj: "You kept your distance; at least no one could use you.",
          detay: "Trust is a luxury here.",
        },
        basarisizSonuc: {
          mesaj: "Your loneliness grows heavier by the day.",
          detay: "Keeping everyone at arm's length has a price too.",
        },
      },
    ],
  },

  hapis_gardiyan_zulmu: {
    baslik: "A Ruthless Guard",
    metin: "The guard on this shift is especially angry today; he's trying to punish you for no reason.",
    secenekler: [
      {
        metin: "Object, defend your rights.",
        ipucu: "Brave but risky",
        basariliSonuc: {
          mesaj: "The other prisoners cheered you on; the guard backed down.",
          detay: "Sometimes resistance works.",
        },
        basarisizSonuc: {
          mesaj: "You paid for it harshly; you spent a few days in pain.",
          detay: "Here, might is always on the side of the right.",
        },
      },
      {
        metin: "Bow your head, stay silent.",
        ipucu: "Safe but it breaks your pride",
        basariliSonuc: {
          mesaj: "You endured it silently; another bad day is behind you.",
          detay: "Surviving sometimes requires bowing your head.",
        },
        basarisizSonuc: {
          mesaj: "You filled with anger inside but managed not to show it.",
          detay: "This anger could explode one day.",
        },
      },
    ],
  },

  hapis_cezasi_doldu: {
    baslik: "The End of the Sentence",
    metin:
      "The guard opened your cell: 'Your sentence is up, don't drag it out, off to freedom.' The sunlight at the door dazzled your eyes.",
    secenekler: [
      {
        metin: "Step outside, turn a new page.",
        ipucu: "Freedom",
        basariliSonuc: {
          mesaj: "You completed your sentence and stepped outside a free person.",
          detay: "You've decided to leave your past behind.",
        },
        basarisizSonuc: {
          mesaj: "You're free, but the weight inside you didn't lift right away.",
          detay: "Some marks fade with time.",
        },
      },
      {
        metin: "Leave the city entirely, leave no trace.",
        ipucu: "A quiet new beginning",
        basariliSonuc: {
          mesaj: "You left the city without being seen by anyone; your name will slowly be forgotten.",
          detay: "Sometimes the best beginning is a quiet escape.",
        },
        basarisizSonuc: {
          mesaj: "You left the city but left a few curious glances behind you.",
          detay: "It's hard to leave without a single trace.",
        },
      },
    ],
  },

  hapis_hirsizlik_yakalanma: {
    baslik: "The Moment Your Hand Went to the Purse",
    metin:
      "In a crowded market, as you reached for a merchant's purse, your wrist was seized hard. The cry 'Thief!' filled the square, and the crowd closed in around you.",
    secenekler: [
      {
        metin: "Push through the crowd and run.",
        ipucu: "If you succeed you get away clean, but risky",
        basariliSonuc: {
          mesaj: "You slipped free amid the shoving and ran; with your heart pounding you ducked into a side street.",
          detay: "You got away with it this time.",
        },
        basarisizSonuc: {
          mesaj: "You were caught; the guards stepped in before the crowd could lynch you.",
          detay: "You're behind bars now.",
        },
      },
      {
        metin: "Accept that you're caught, don't resist.",
        ipucu: "Inevitable but at least it goes calmly",
        basariliSonuc: {
          mesaj: "You didn't resist; the guards took you quietly.",
          detay: "At least you weren't beaten.",
        },
        basarisizSonuc: {
          mesaj: "Someone from the crowd threw a punch at you; the guards had trouble pulling them off.",
          detay: "The crowd's anger is sometimes faster than justice.",
        },
      },
    ],
  },

  hapis_asilzade_husumeti: {
    baslik: "The Lord's Wrath",
    metin:
      "You said an unfortunate word in front of a powerful lord of the region, or stuck your nose into the wrong person's business. His men are at your door; because you are a nobody, no one will shield you.",
    secenekler: [
      {
        metin: "Apologize, beg for mercy.",
        ipucu: "Your pride is broken but maybe you're spared",
        basariliSonuc: {
          mesaj: "Your humble apology soothed the lord's temper a little; you were only banished.",
          detay: "Your pride is broken but you're free.",
        },
        basarisizSonuc: {
          mesaj: "Your apology was taken for 'weakness'; the lord had you jailed to make an example of you.",
          detay: "Bowing before the powerful sometimes isn't enough.",
        },
      },
      {
        metin: "Defend yourself, say you were in the right.",
        ipucu: "Risky, but if you win your honor stays intact",
        basariliSonuc: {
          mesaj: "Your courage won respect in some circles; the lord backed down this time.",
          detay: "Rarely, a nobody can win.",
        },
        basarisizSonuc: {
          mesaj: "The lord couldn't tolerate your insolence; his men beat you and threw you in the dungeon.",
          detay: "Defying the powerful came at a heavy price.",
        },
      },
    ],
  },

  hapis_kacakcilik_baskini: {
    baslik: "The Raid",
    metin:
      "A patrol raided the warehouse where you hid contraband. As the door is broken down you have only seconds in your hands.",
    secenekler: [
      {
        metin: "Burn the goods to destroy the evidence, then try to run.",
        ipucu: "You lose your capital but there may be no proof left",
        basariliSonuc: {
          mesaj: "You set the goods ablaze and escaped in the smoke; no evidence was left.",
          detay: "Your capital turned to ash but you're free.",
        },
        basarisizSonuc: {
          mesaj: "You were caught in the smoke, red-handed.",
          detay: "Even destroying the evidence couldn't save you.",
        },
      },
      {
        metin: "Surrender quietly, hire a lawyer.",
        ipucu: "Expensive but it can lighten the sentence",
        basariliSonuc: {
          mesaj: "Thanks to the lawyer you hired, you got off with a small fine.",
          detay: "Money worked here too.",
        },
        basarisizSonuc: {
          mesaj: "Despite your lawyer's efforts, the judge threw you inside.",
          detay: "Some crimes don't close even with a lawyer.",
        },
      },
    ],
  },

  hapis_ayaklanma_tutuklamasi: {
    baslik: "The Crushed Uprising",
    metin:
      "An uprising you joined (or happened to be at, in the wrong place at the wrong time) was crushed by the soldiers. You're lined up and questioned one by one; now it's your turn.",
    secenekler: [
      {
        metin: "Blend into the crowd and try to hide your identity.",
        ipucu: "If you succeed you slip away entirely",
        basariliSonuc: {
          mesaj: "You acted like an ordinary bystander, and the soldiers let you go.",
          detay: "Luck was on your side this time.",
        },
        basarisizSonuc: {
          mesaj: "An informer pointed you out; you were arrested as 'one of the agitators'.",
          detay: "Hiding even in the crowd wasn't enough.",
        },
      },
      {
        metin: "State your cause openly, stand behind it.",
        ipucu: "Honorable but arrest is nearly certain",
        basariliSonuc: {
          mesaj: "Your courage won the respect of even some soldiers, but you were arrested all the same.",
          detay: "Your conscience is at ease, your cell is narrow.",
        },
        basarisizSonuc: {
          mesaj: "Your words enraged the soldiers; you were beaten and thrown in prison.",
          detay: "The price of speaking the truth was heavy this time.",
        },
      },
    ],
  },

  hapis_zar_masasi_baskini: {
    baslik: "The Dice Table Raid",
    metin:
      "The gendarmes raided the tavern where the underground dice table was held. The doors were broken, the players scattered in every direction; you know your name is spoken as 'one of the regulars there'.",
    secenekler: [
      {
        metin: "Try to slip out the back door.",
        ipucu: "If you succeed you slip away entirely, if caught you get a beating",
        basariliSonuc: {
          mesaj: "Taking advantage of the smoke and chaos, you slipped out the back door.",
          detay: "This time you escaped both the table and prison.",
        },
        basarisizSonuc: {
          mesaj: "They caught you at the door; your resistance was useless.",
          detay: "The end of the gambling table is rarely pretty.",
        },
      },
      {
        metin: "Offer the guard a bribe, leave quietly.",
        ipucu: "Expensive but it could be a quiet exit",
        basariliSonuc: {
          mesaj: "The guard pocketed the purse and looked the other way.",
          detay: "Some doors open with gold.",
        },
        basarisizSonuc: {
          mesaj: "Your bribe offer didn't escape another guard's eye; you lost your money and got locked up.",
          detay: "You trusted the wrong guard.",
        },
      },
      {
        metin: "Don't resist, surrender.",
        ipucu: "Inevitable but at least it goes calmly",
        basariliSonuc: {
          mesaj: "You surrendered calmly; at least you weren't beaten.",
          detay: "The cell is cold but at least your ribs are intact.",
        },
        basarisizSonuc: {
          mesaj: "Despite staying calm, a guard took his temper out on you.",
          detay: "Sometimes even silence isn't enough.",
        },
      },
    ],
  },

  hapis_karaborsa_baskini: {
    baslik: "The Black Market Raid",
    metin:
      "The guards who have been watching you for months finally broke down the door of your black-market warehouse. The goods inside are the clearest proof that you made money off famine and plague; you have nowhere much to run.",
    secenekler: [
      {
        metin: "Escape through the warehouse's back exit.",
        ipucu: "If you succeed you can't save your goods but you stay free",
        basariliSonuc: {
          mesaj: "You slipped out the back of the warehouse; your goods were seized but at least you weren't jailed.",
          detay: "Your fortune is gone, your freedom remains.",
        },
        basarisizSonuc: {
          mesaj: "You were caught escaping; both your warehouse was seized and you found yourself behind bars.",
          detay: "The bill for immoral wealth came due heavily.",
        },
      },
      {
        metin: "Try to close the case with a hefty bribe.",
        ipucu: "Very expensive but you might save the warehouse",
        basariliSonuc: {
          mesaj: "The bribe worked; the case was dropped and you kept your warehouse too.",
          detay: "This time the power of gold covered your crime.",
        },
        basarisizSonuc: {
          mesaj: "Your bribe was refused; you lost your money, your warehouse was seized, and you were locked up.",
          detay: "Sometimes even money isn't enough.",
        },
      },
      {
        metin: "Don't resist, surrender.",
        ipucu: "Your warehouse is gone but at least you don't get beaten",
        basariliSonuc: {
          mesaj: "You surrendered calmly; your entire warehouse was seized.",
          detay: "Your dark earnings ended in a dark way.",
        },
        basarisizSonuc: {
          mesaj: "Even though you surrendered, a guard took out his anger on you.",
          detay: "What you earned off others' backs for years was taken from you today.",
        },
      },
    ],
  },

  hapis_tunel_karar: {
    baslik: "The Decision to Dig",
    metin:
      "The stone in the corner of your cell is loose; if you dig beneath it a tunnel could open. Should you go quietly alone, or bring a few trusted prisoners into the job?",
    secenekler: [
      {
        metin: "Dig alone, trust no one.",
        ipucu: "Slow but easy to keep secret",
        basariliSonuc: {
          mesaj: "Late at night you started digging alone. You take care to make no sound.",
          detay: "Being alone is slow but safe.",
        },
        basarisizSonuc: {
          mesaj: "The first night, while lifting the stone, you cut your hand and lost some blood, but no one heard.",
          detay: "A small mishap, not worth making a fuss over.",
        },
      },
      {
        metin: "Form a team with a few trusted prisoners.",
        ipucu: "Faster but keeping the secret gets harder",
        basariliSonuc: {
          mesaj: "You made a quiet deal with three prisoners; you started digging in shifts.",
          detay: "A team is faster but the secret gets harder to keep.",
        },
        basarisizSonuc: {
          mesaj: "Forming a team was harder than you thought; building trust took time.",
          detay: "Still, the plan began to move.",
        },
      },
    ],
  },

  hapis_tunel_tek_1: {
    baslik: "The Silent Dig",
    metin:
      "You advance night by night; the sound of the earth sometimes comes out too loud, and a guard's footsteps seem to be approaching.",
    secenekler: [
      {
        metin: "Keep digging, take the risk.",
        ipucu: "It speeds up but there's a risk of being heard",
        basariliSonuc: {
          mesaj: "The guard walked off in another direction; the tunnel advanced quite a bit.",
          detay: "Luck was on your side.",
        },
        basarisizSonuc: {
          mesaj:
            "The guard heard the sound and searched your cell but didn't notice the loose stone; still, the tension left you exhausted.",
          detay: "You got off cheap this time.",
        },
      },
      {
        metin: "Stop, wait quietly.",
        ipucu: "Safe but slow",
        basariliSonuc: {
          mesaj: "The guard passed by; you lost a few hours but you're safe.",
          detay: "Patience is part of this job.",
        },
        basarisizSonuc: {
          mesaj: "The wait dragged on and your spirits sank.",
          detay: "Underground, time flows even slower.",
        },
      },
    ],
  },

  hapis_tunel_tek_2: {
    baslik: "Out Into the Light",
    metin: "The tunnel is finally finished. It's midnight — time to crawl out and step into freedom.",
    secenekler: [
      {
        metin: "Crawl out right away, run.",
        ipucu: "If you succeed a legendary escape, if caught a mortal risk",
        basariliSonuc: {
          mesaj: "You slipped through the tunnel and melted into the city's darkness; you're free now.",
          detay: "You did it alone — this story will become a legend.",
        },
        basarisizSonuc: {
          mesaj: "Right at the exit you were caught by a patrol; after a hard beating you were thrown back in the cell.",
          detay: "Losing freedom when it's this close is the most bitter of all.",
        },
      },
      {
        metin: "Be patient, wait for the calmest hour.",
        ipucu: "Safer but the tunnel could collapse",
        basariliSonuc: {
          mesaj: "You waited for the quietest hour and got out unnoticed.",
          detay: "Your patience paid off.",
        },
        basarisizSonuc: {
          mesaj: "While waiting, the tunnel threatened to collapse; you barely made it back and were caught.",
          detay: "The earth became your enemy too.",
        },
      },
    ],
  },

  hapis_tunel_ekip_1: {
    baslik: "A Test of Trust",
    metin:
      "One of the team raised a suspicion that they might be thinking of leaking information to the guards in exchange for the dig. Do you keep trusting them, or hide the plan from them?",
    secenekler: [
      {
        metin: "Keep trusting them.",
        ipucu: "If they're honest the friendship grows, if you're wrong you're at risk",
        basariliSonuc: {
          mesaj: "Your suspicion was unfounded; they wanted freedom as much as you did.",
          detay: "Your trust was repaid.",
        },
        basarisizSonuc: {
          mesaj:
            "Your suspicion was partly right: a small hint leaked to the guards, but the tunnel hasn't been discovered yet.",
          detay: "You slipped past the edge of danger.",
        },
      },
      {
        metin: "Hide the plan from them, continue only with the others.",
        ipucu: "Cautious but it damages trust within the group",
        basariliSonuc: {
          mesaj: "You cut the suspicious prisoner out of the plan; the dig continued quietly.",
          detay: "Caution worked this time.",
        },
        basarisizSonuc: {
          mesaj: "The excluded prisoner noticed, and tension arose between you.",
          detay: "Mistrust sometimes feeds itself.",
        },
      },
    ],
  },

  hapis_tunel_ekip_2: {
    baslik: "The Joint Dig",
    metin: "The team digs in shifts; the tunnel advances fast but the sounds of the earth are growing too.",
    secenekler: [
      {
        metin: "Speed it up, take the risk.",
        ipucu: "It finishes fast but the risk of being heard rises",
        basariliSonuc: {
          mesaj: "Working fast paid off; the tunnel was finished earlier than expected.",
          detay: "Team spirit made the difference.",
        },
        basarisizSonuc: {
          mesaj: "A guard noticed the sounds but couldn't find their source; the team froze.",
          detay: "You got off cheap.",
        },
      },
      {
        metin: "Advance slowly and quietly.",
        ipucu: "Safe but it can hurt morale",
        basariliSonuc: {
          mesaj: "Thanks to the patient pace, no one noticed.",
          detay: "Slow but sure steps.",
        },
        basarisizSonuc: {
          mesaj: "The slow pace hurt morale; unrest began in the team.",
          detay: "Some are growing impatient.",
        },
      },
    ],
  },

  hapis_tunel_ekip_3: {
    baslik: "The Mass Escape",
    metin:
      "The tunnel is finished. Time to slip out one row at a time — but a large group raises the risk of being noticed.",
    secenekler: [
      {
        metin: "Get out all together, quickly.",
        ipucu: "Either an epic mass escape or a mass disaster",
        basariliSonuc: {
          mesaj:
            "You all plunged into the darkness together; by the time the guards noticed the crowd, most of you were long gone.",
          detay: "This mass escape went down in prison history.",
        },
        basarisizSonuc: {
          mesaj:
            "The crowd's noise woke the guards; most of you were caught again, and some barely escaped being shot while fleeing.",
          detay: "Numbers were a disadvantage this time, not an advantage.",
        },
      },
      {
        metin: "Get out one by one, at intervals.",
        ipucu: "Slower but less conspicuous",
        basariliSonuc: {
          mesaj: "You slipped out one by one, quietly; no one noticed until the morning count.",
          detay: "Patience and order made the crowd invisible.",
        },
        basarisizSonuc: {
          mesaj: "When it was your turn a guard appeared; you were caught, the others had already melted into the dark.",
          detay: "Bad timing in the queue gave you away.",
        },
      },
    ],
  },

  hapis_rusvet_muhbir_bulma: {
    baslik: "Finding the Weak Link",
    metin:
      "You're looking among the guards for someone who can be swayed with money; a young sentry said to have gambling debts caught your eye.",
    secenekler: [
      {
        metin: "Approach him, carefully start a conversation.",
        ipucu: "A direct but risky approach",
        basariliSonuc: {
          mesaj: "The young guard started talking about his debts; exactly the person you're looking for.",
          detay: "Weaknesses are sometimes the best key.",
        },
        basarisizSonuc: {
          mesaj: "The guard stayed distant; winning his trust is harder than you expected.",
          detay: "Not everyone opens up easily.",
        },
      },
      {
        metin: "Gather information from other prisoners, find a solid name.",
        ipucu: "A small expense but more reliable",
        basariliSonuc: {
          mesaj: "For a small 'thank you' you got a reliable name.",
          detay: "Information is worth money even in prison.",
        },
        basarisizSonuc: {
          mesaj: "The name you were given was useless; your money was wasted.",
          detay: "Not every tip pans out.",
        },
      },
    ],
  },

  hapis_rusvet_pazarlik_derin: {
    baslik: "Haggling Over the Price",
    metin: "The guard named his price — higher than you expected. Should you haggle, or give him what he wants?",
    secenekler: [
      {
        metin: "Haggle insistently.",
        ipucu: "It could come cheaper but it might offend the guard",
        basariliSonuc: {
          mesaj: "Your haggling worked; you brought the price down quite a bit.",
          detay: "Your purse is a little less wounded.",
        },
        basarisizSonuc: {
          mesaj:
            "Your insistence offended the guard; the deal nearly fell apart, but at the last moment he accepted.",
          detay: "Going cheap is a risky game.",
        },
      },
      {
        metin: "Give him what he wants, accept without arguing.",
        ipucu: "Expensive but fast and safe",
        basariliSonuc: {
          mesaj: "The deal was done quickly and smoothly.",
          detay: "Sometimes time is worth more than money.",
        },
        basarisizSonuc: {
          mesaj: "You reached a deal but the guard had to delay the plan a bit.",
          detay: "Not every deal goes the way it's promised.",
        },
      },
    ],
  },

  hapis_rusvet_uygulama: {
    baslik: "The Night the Door Opened",
    metin:
      "The night the deal is to be carried out has come. The guard will be waiting for you at the agreed hour — or he may be setting a trap.",
    secenekler: [
      {
        metin: "Trust the plan, go at the agreed hour.",
        ipucu: "Either freedom or a heavy trap",
        basariliSonuc: {
          mesaj: "The guard kept his word; the door really was left 'accidentally' open.",
          detay: "The power of gold was proven once more.",
        },
        basarisizSonuc: {
          mesaj: "It was a trap! The guard reported you to his commander; you faced a heavy punishment.",
          detay: "Some deals were rotten from the start.",
        },
      },
      {
        metin: "Grow suspicious at the last moment, cancel the plan.",
        ipucu: "Safe but you can't get the advance back",
        basariliSonuc: {
          mesaj: "You trusted your instincts and pulled back; later you learned it was the right hunch.",
          detay: "Sometimes avoiding is a victory too.",
        },
        basarisizSonuc: {
          mesaj: "You backed out but couldn't get back the advance you'd paid.",
          detay: "Your mistrust had a price.",
        },
      },
    ],
  },

  hapis_bayiltma_plan: {
    baslik: "Watching for the Chance",
    metin:
      "You've noticed that the lone guard on night watch sometimes grows careless as he passes the cells. Knocking him out for a moment could open a window for escape.",
    secenekler: [
      {
        metin: "Prepare for a hard blow (hide a stone/piece of bone).",
        ipucu: "A physical preparation",
        basariliSonuc: {
          mesaj: "You hid a hard object within reach; the plan is taking shape.",
          detay: "Preparation is the foundation of every plan.",
        },
        basarisizSonuc: {
          mesaj: "Finding something useful was harder than you thought, but you found something that'll do.",
          detay: "Not perfect, but enough.",
        },
      },
      {
        metin: "Prepare a story/lie to keep him occupied, distract him.",
        ipucu: "A mental preparation",
        basariliSonuc: {
          mesaj: "You crafted a convincing story; it'll catch the guard's attention.",
          detay: "Sometimes the best weapon is words.",
        },
        basarisizSonuc: {
          mesaj: "Your story came out a bit weak, but you're brave enough to try it.",
          detay: "There's no such thing as a flawless plan.",
        },
      },
    ],
  },

  hapis_bayiltma_saldiri: {
    baslik: "The Moment Has Come",
    metin:
      "The guard is passing in front of the cell. Now or never — you need to attack him and knock him out. This is one of the gravest crimes you can commit in prison.",
    secenekler: [
      {
        metin: "Attack with a sudden move, knock him out.",
        ipucu: "If you succeed the keys are yours, in failure a mortal risk",
        basariliSonuc: {
          mesaj: "The blow landed square; the guard crumpled silently to the floor. You took the keys.",
          detay: "Your heart is about to leap out of your chest, but you did it.",
        },
        basarisizSonuc: {
          mesaj:
            "The guard turned at the last moment, a fight broke out; the other sentries arrived. Your attempt at violence will be punished in the harshest way.",
          detay: "The price of attacking a guard is very heavy.",
        },
      },
      {
        metin: "Give up at the last moment, pull back.",
        ipucu: "Safe but the chance is lost",
        basariliSonuc: {
          mesaj: "You trusted your instincts and cancelled the plan; maybe another chance will come.",
          detay: "Sometimes stepping back takes courage.",
        },
        basarisizSonuc: {
          mesaj: "You gave up, but the guard nearly noticed while you were hiding the object.",
          detay: "Your heart is still pounding.",
        },
      },
    ],
  },

  hapis_bayiltma_kacis: {
    baslik: "Escape With the Keys",
    metin:
      "The guard's keys are in your hand; the cell door is in front of you. But the corridors are long and the way out is unclear.",
    secenekler: [
      {
        metin: "Run fast, try the nearest exit.",
        ipucu: "Fast but showy, it could draw attention",
        basariliSonuc: {
          mesaj: "You managed to run out through the dark corridors; you're free now.",
          detay: "This daring escape will become a legend.",
        },
        basarisizSonuc: {
          mesaj: "You ran into another sentry; luck wasn't on your side this time, and you were subdued harshly.",
          detay: "The price of attacking a guard and getting caught is the heaviest of all.",
        },
      },
      {
        metin: "Stay calm, put on the guard's disguise and walk out as if it's normal.",
        ipucu: "Daring but if you succeed it's much more solid",
        basariliSonuc: {
          mesaj: "You pulled the guard's uniform on and calmly walked out the main gate.",
          detay: "Your daring proved more effective than force.",
        },
        basarisizSonuc: {
          mesaj: "The uniform didn't fit; an officer spotted you at once, and this time you were subdued mercilessly.",
          detay: "Your disguise plan didn't work.",
        },
      },
    ],
  },

  hapis_iyi_hal_karar: {
    baslik: "The Decision to Behave",
    metin:
      "One of the guards said that prisoners who show exemplary behavior are sometimes considered for early release. You could behave well and try to earn trust.",
    secenekler: [
      {
        metin: "Follow the rules fully, be hardworking and quiet.",
        ipucu: "A slow but solid strategy",
        basariliSonuc: {
          mesaj: "Your behavior drew the positive attention of the guards and the administration.",
          detay: "Patience became a strategy here.",
        },
        basarisizSonuc: {
          mesaj: "Your efforts went mostly unnoticed; no one cared.",
          detay: "Sometimes goodness stays invisible.",
        },
      },
      {
        metin: "Do small favors for the guards, get in their good graces.",
        ipucu: "Risky — you could get branded a 'bootlicker' in the ward",
        basariliSonuc: {
          mesaj: "Your small favors worked; a guard has already started mentioning you.",
          detay: "Sometimes small kindnesses open big doors.",
        },
        basarisizSonuc: {
          mesaj: "The other prisoners branded you a 'bootlicker'; your standing in the ward was shaken.",
          detay: "No strategy is without cost.",
        },
      },
    ],
  },

  hapis_iyi_hal_degerlendirme: {
    baslik: "The Board's Decision",
    metin:
      "The prison administration gathered to review your file for early release. Their decision could change your life.",
    secenekler: [
      {
        metin: "Give a sincere speech of remorse before the board.",
        ipucu: "It can be honest and effective",
        basariliSonuc: {
          mesaj: "Your words moved the board; your sentence ended early.",
          detay: "Sometimes honesty is the strongest defense.",
        },
        basarisizSonuc: {
          mesaj: "The board wasn't convinced, your release was denied; you must serve the rest of your sentence.",
          detay: "Not every effort is rewarded right away.",
        },
      },
      {
        metin: "Settle for a short, formal petition.",
        ipucu: "Plain but it can be effective",
        basariliSonuc: {
          mesaj: "Your formal petition was accepted; you were released quietly, without ceremony.",
          detay: "Some victories are won without fanfare.",
        },
        basarisizSonuc: {
          mesaj: "Your petition was found insufficient; you have to wait until the next review.",
          detay: "Bureaucracy is slow here too.",
        },
      },
    ],
  },

  hapis_isyan_hazirlik: {
    baslik: "Among the Whispers",
    metin:
      "Whispers of a riot in the making are going around the ward; anger is building, about to explode. You need to decide whom to trust — if this information reaches the wrong ear, you're in deep trouble.",
    secenekler: [
      {
        metin: "Join the plan with a few prisoners you trust.",
        ipucu: "It builds solidarity but it's risky",
        basariliSonuc: {
          mesaj: "You quietly came to an understanding with prisoners you trust; when the riot breaks out you'll be ready.",
          detay: "Some alliances are made in the dark.",
        },
        basarisizSonuc: {
          mesaj: "Deciding whom to trust was harder than you thought; you wait in tension.",
          detay: "Uncertainty is the most exhausting thing.",
        },
      },
      {
        metin: "Trust no one, just watch.",
        ipucu: "Safe but you could be caught unprepared",
        basariliSonuc: {
          mesaj: "You chose to watch quietly; you said nothing to anyone.",
          detay: "Information is sometimes the safest weapon — by not using it.",
        },
        basarisizSonuc: {
          mesaj: "Even watching kept you on edge; you can't guess what will happen.",
          detay: "Waiting is sometimes more exhausting than action.",
        },
      },
    ],
  },

  hapis_hastalik: {
    baslik: "Damp Cell Sickness",
    metin:
      "A sickness is spreading in the damp, dark ward; coughing breaks the silence of the night. The little clean water you have is enough for only you or the sick prisoner beside you.",
    secenekler: [
      {
        metin: "Share the water with the sick prisoner.",
        ipucu: "Peace of conscience, a sacrifice of your own health",
        basariliSonuc: {
          mesaj: "You shared your water; the prisoner slowly recovered and stayed grateful to you.",
          detay: "Some kindnesses are done without expecting anything in return.",
        },
        basarisizSonuc: {
          mesaj: "The water you shared wasn't enough; you both grew weak.",
          detay: "Good intentions aren't always enough.",
        },
      },
      {
        metin: "Keep the water for yourself, protect your health.",
        ipucu: "Selfish but smart",
        basariliSonuc: {
          mesaj: "You kept the water for yourself; your health held up, but the prisoner beside you coughed harder.",
          detay: "Survival sometimes demands selfishness.",
        },
        basarisizSonuc: {
          mesaj: "Despite the water you saved, you fell a little ill too; and your conscience isn't at ease.",
          detay: "Some choices have no winner.",
        },
      },
    ],
  },

  hapis_aclik_grevi: {
    baslik: "A Call for a Hunger Strike",
    metin:
      "The prisoners are starting a collective hunger strike to improve conditions. Joining shows solidarity, but your body has its limits too.",
    secenekler: [
      {
        metin: "Join the strike, show solidarity.",
        ipucu: "Conditions could improve but your health suffers",
        basariliSonuc: {
          mesaj: "The strike stirred the administration to act; conditions improved a little, and you were part of that victory.",
          detay: "Going hungry was a price, but it was worth it.",
        },
        basarisizSonuc: {
          mesaj: "The strike came to nothing, the administration didn't care; you only grew weak from hunger.",
          detay: "Not every resistance wins.",
        },
      },
      {
        metin: "Don't join, eat your own share.",
        ipucu: "Safe but isolating",
        basariliSonuc: {
          mesaj: "You protected your health but the other prisoners shunned you as 'without solidarity'.",
          detay: "Some choices isolate you.",
        },
        basarisizSonuc: {
          mesaj: "You didn't join but a guilt stayed in you.",
          detay: "Standing on the sidelines is a choice too.",
        },
      },
    ],
  },

  hapis_kacak_mektup: {
    baslik: "The Smuggled Letter",
    metin:
      "A guard (for a bribe) gave you a letter smuggled in from outside: from {dost}. You hold it without knowing whether it carries hope or bad news.",
    secenekler: [
      {
        metin: "Open it right away, read it.",
        ipucu: "Hope or bitter news",
        basariliSonuc: {
          mesaj: "{dost} wrote that they're still waiting for you; the hope inside you flared up again.",
          detay: "Even behind walls, having someone think of you is priceless.",
        },
        basarisizSonuc: {
          mesaj: "The letter carried bitter news; you withdrew into yourself for days.",
          detay: "Some news makes the walls close in even more.",
        },
      },
      {
        metin: "Keep it hidden, wait for the right time.",
        ipucu: "Postponing hope",
        basariliSonuc: {
          mesaj: "You hid the letter under your pillow; even the idea of reading it gives you strength.",
          detay: "Sometimes postponing hope is a strategy too.",
        },
        basarisizSonuc: {
          mesaj: "Your curiosity ate away at you; in the end you couldn't resist and read it; the moment you were waiting for never came.",
          detay: "Patience isn't always rewarded.",
        },
      },
    ],
  },

  hapis_zayif_mahkum_korumasi: {
    baslik: "A Weak Prisoner",
    metin:
      "The strong prisoners of the ward keep tormenting a weak, old prisoner, taking his food. Stepping in is risky but your conscience pushes you.",
    secenekler: [
      {
        metin: "Step in, protect the weak prisoner.",
        ipucu: "Brave but there's a risk of a beating",
        basariliSonuc: {
          mesaj: "Your courage worked; the strong ones backed off, and the old prisoner is grateful to you.",
          detay: "Sometimes even one person can make a difference.",
        },
        basarisizSonuc: {
          mesaj: "You stepped in but got beaten; still, the old prisoner was left alone for a while.",
          detay: "Your courage cost you dearly but it wasn't wasted.",
        },
      },
      {
        metin: "Don't get involved, mind your own business.",
        ipucu: "Safe but it touches your conscience",
        basariliSonuc: {
          mesaj: "You didn't get involved; at least your own safety is intact.",
          detay: "Some pangs of conscience are carried silently.",
        },
        basarisizSonuc: {
          mesaj: "Not getting involved bothered you too; the old prisoner's screams won't leave your mind at night.",
          detay: "Staying silent has a price too.",
        },
      },
    ],
  },

  hapis_gardiyan_yozlastirma: {
    baslik: "A Small Privilege",
    metin:
      "A guard hints that, in exchange for small regular 'gifts', he could get you extra food and a better cell corner.",
    secenekler: [
      {
        metin: "Agree, make small regular payments.",
        ipucu: "A small expense, visible comfort",
        basariliSonuc: {
          mesaj: "The deal worked; your conditions noticeably improved.",
          detay: "Small sums make a big difference here.",
        },
        basarisizSonuc: {
          mesaj: "Despite your payment, the guard didn't really keep his word.",
          detay: "Some deals stay one-sided.",
        },
      },
      {
        metin: "Refuse, owe no one anything.",
        ipucu: "Independent but without comfort",
        basariliSonuc: {
          mesaj: "You refused; at least you don't depend on anyone.",
          detay: "Independence has a price too — comfort doesn't.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal offended the guard; he was cold to you for a few more days.",
          detay: "Every no can carry a price.",
        },
      },
    ],
  },

  hapis_zanaat_ogrenme: {
    baslik: "Keeping the Hands Busy",
    metin:
      "An old prisoner has been carving small wooden objects in his cell for years. He offers to teach you the craft too — a way to kill time.",
    secenekler: [
      {
        metin: "Learn it, practice patiently.",
        ipucu: "A small but real pleasure",
        basariliSonuc: {
          mesaj:
            "You learned the craft; the small carved pieces in your hands give you both peace and a small pride.",
          detay: "Some skills are born behind walls.",
        },
        basarisizSonuc: {
          mesaj: "Your hands weren't very suited to it, but even trying was pleasant.",
          detay: "Not every skill is learned easily.",
        },
      },
      {
        metin: "Not interested, spend your time another way.",
        ipucu: "Safe, neutral",
        basariliSonuc: {
          mesaj: "You politely declined the offer; you preferred your own silence.",
          detay: "Everyone passes time differently.",
        },
        basarisizSonuc: {
          mesaj: "The days passed alike, and the boredom grew heavier.",
          detay: "Idleness is the greatest enemy here.",
        },
      },
    ],
  },

  hapis_dini_arinma: {
    baslik: "Turning Inward",
    metin: "A clergyman came to visit the prison; he wants to talk with you, perhaps hear your sins.",
    secenekler: [
      {
        metin: "Pour your heart out, be sincere.",
        ipucu: "Hard but healing",
        basariliSonuc: {
          mesaj: "Pouring your heart out lifted a great weight; you went back to your cell at peace.",
          detay: "Some burdens only lighten when shared.",
        },
        basarisizSonuc: {
          mesaj: "It wasn't as easy to speak as you wanted; the words knotted in your throat.",
          detay: "Some openings take time.",
        },
      },
      {
        metin: "Keep your distance, listen only out of courtesy.",
        ipucu: "Safe, closed off",
        basariliSonuc: {
          mesaj: "You listened politely but didn't open up; still, the visit was a small comfort.",
          detay: "Not everyone has to open up the same way.",
        },
        basarisizSonuc: {
          mesaj: "Your distance saddened the clergyman a little; the visit ended early.",
          detay: "Some doors choose to stay closed.",
        },
      },
    ],
  },

  hapis_kumar: {
    baslik: "The Ward Gamble",
    metin:
      "Dice are played secretly in the ward; the losers give up their food shares, the winners raise their standing. Do you want to join?",
    secenekler: [
      {
        metin: "Try a hand.",
        ipucu: "A small gain or the start of a dangerous habit",
        basariliSonuc: {
          mesaj: "Luck was on your side; your name started being spoken as 'the lucky one' in the ward.",
          detay: "Even a small victory carries great meaning here.",
        },
        basarisizSonuc: {
          mesaj: "You lost, but the taste of the thrill stayed with you; you want to play again.",
          detay: "Even here, addiction waits at the door.",
        },
      },
      {
        metin: "Don't join, watch from the side.",
        ipucu: "Safe",
        basariliSonuc: {
          mesaj: "You settled for watching from the side; at least your share stayed in your hand.",
          detay: "Sometimes watching is entertainment enough.",
        },
        basarisizSonuc: {
          mesaj: "Even watching made you a little envious.",
          detay: "Some temptations are felt even from the outside.",
        },
      },
    ],
  },

  hapis_muhbirlik_teklifi: {
    baslik: "An Informant Offer",
    metin:
      "The administration offers you small privileges in exchange for giving information about another prisoner in the ward. If you accept, your life gets easier but you carry the weight of a betrayal.",
    secenekler: [
      {
        metin: "Accept the offer, give the information.",
        ipucu: "Comfort rises, conscience and reputation suffer",
        basariliSonuc: {
          mesaj: "You gave the information; your conditions improved but now you look away when you meet anyone's eyes.",
          detay: "Your comfort came off someone's back.",
        },
        basarisizSonuc: {
          mesaj: "It became known that you're an informant; no one in the ward trusts you anymore.",
          detay: "The price of betrayal outweighed its benefit.",
        },
      },
      {
        metin: "Refuse, keep your loyalty.",
        ipucu: "Conscience at ease, the administration is offended",
        basariliSonuc: {
          mesaj: "You refused; among the other prisoners you started being called 'reliable'.",
          detay: "Some principles aren't up for negotiation.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered the administration; you faced a small punishment.",
          detay: "Doing the right thing had a price.",
        },
      },
    ],
  },

  hapis_ziyaretci: {
    baslik: "A Face Between the Bars",
    metin:
      "{dost} came to visit you after a long journey. In your eyes meeting through the bars there is much left unsaid.",
    secenekler: [
      {
        metin: "Hide your feelings, look strong.",
        ipucu: "It protects them but you bottle it up",
        basariliSonuc: {
          mesaj: "Your strong bearing reassured them; you did everything you could so they wouldn't worry.",
          detay: "Sometimes protecting your loved ones means hiding yourself.",
        },
        basarisizSonuc: {
          mesaj: "Even as you tried to look strong, your voice trembled.",
          detay: "Some feelings can't be hidden.",
        },
      },
      {
        metin: "Share your feelings openly.",
        ipucu: "Weakness but a real bond",
        basariliSonuc: {
          mesaj: "Your sincerity strengthened the bond between you; you both felt a little lighter.",
          detay: "Sometimes showing weakness is the greatest strength.",
        },
        basarisizSonuc: {
          mesaj: "Sharing your feelings wore you out more than you expected.",
          detay: "Some moments both heal and exhaust.",
        },
      },
    ],
  },

  hapis_kis_soguk: {
    baslik: "The Cruelty of Winter",
    metin:
      "Winter fell mercilessly on the cells; there's only one blanket, and the old prisoner beside you is shivering.",
    secenekler: [
      {
        metin: "Share your blanket.",
        ipucu: "Peace of conscience, loss of health",
        basariliSonuc: {
          mesaj: "You shared your blanket; you both got cold but you weren't alone.",
          detay: "Warmth sometimes multiplies when shared.",
        },
        basarisizSonuc: {
          mesaj: "The sharing wasn't enough; you both had a hard night.",
          detay: "Winter here has no mercy.",
        },
      },
      {
        metin: "Keep the blanket for yourself.",
        ipucu: "Selfish but smart",
        basariliSonuc: {
          mesaj: "You stayed warm but it was hard not to hear the prisoner beside you shivering.",
          detay: "Survival sometimes demands selfishness.",
        },
        basarisizSonuc: {
          mesaj: "Despite the blanket you kept, the cold seeped in from everywhere.",
          detay: "Some winters spare no one.",
        },
      },
    ],
  },

  hapis_yeni_mahkum: {
    baslik: "The Newcomer",
    metin:
      "A young, frightened prisoner just arrived in the ward; he doesn't know what to do, and everyone is sizing him up.",
    secenekler: [
      {
        metin: "Mentor him, teach him the rules.",
        ipucu: "A small investment, a new friend",
        basariliSonuc: {
          mesaj: "The young prisoner stayed grateful to you; you taught him how the ward works before anyone else could.",
          detay: "Some leadership begins with a small favor.",
        },
        basarisizSonuc: {
          mesaj: "Your advice wasn't fully understood; the young prisoner still had to fend for himself.",
          detay: "Not every piece of advice is understood right away.",
        },
      },
      {
        metin: "Leave him to himself.",
        ipucu: "Safe, neutral",
        basariliSonuc: {
          mesaj: "You didn't get involved; the young prisoner started learning the hard way.",
          detay: "Everyone finds their own path, sooner or later.",
        },
        basarisizSonuc: {
          mesaj: "Seeing the young prisoner struggle stung you a little.",
          detay: "Conscience sometimes criticizes quietly.",
        },
      },
    ],
  },

  hapis_yolsuzluk_tanikligi: {
    baslik: "The Corruption You Witnessed",
    metin:
      "You witnessed a guard regularly stealing from the food parcels sent to the prisoners. Reporting it is risky, but staying silent touches your conscience too.",
    secenekler: [
      {
        metin: "Report it to the prison warden.",
        ipucu: "Risky but justice could be served",
        basariliSonuc: {
          mesaj: "Your report was taken seriously, the guard was removed from duty; your name was spoken as 'fair' in the ward.",
          detay: "Speaking the truth worked this time.",
        },
        basarisizSonuc: {
          mesaj: "Your report reached the guard's other friends, and you faced retaliation.",
          detay: "Speaking the truth had a price.",
        },
      },
      {
        metin: "Stay silent, don't get involved.",
        ipucu: "Safe but it touches your conscience",
        basariliSonuc: {
          mesaj: "You stayed silent; at least you stayed out of trouble.",
          detay: "Some silences are safe but uncomfortable.",
        },
        basarisizSonuc: {
          mesaj: "Your silence keeps gnawing at you.",
          detay: "Some pangs of conscience don't pass.",
        },
      },
    ],
  },

  hapis_saglik_kontrolu: {
    baslik: "The Doctor's Visit",
    metin:
      "The prison doctor came for a routine check. If you describe your real condition you can get treatment, but looking weak is risky here; if you look strong you might miss the treatment.",
    secenekler: [
      {
        metin: "Describe your condition as it is.",
        ipucu: "Honesty is the best chance of treatment",
        basariliSonuc: {
          mesaj: "The doctor took your complaints seriously and gave you a simple but effective treatment.",
          detay: "Honesty worked here too.",
        },
        basarisizSonuc: {
          mesaj: "The doctor cared but his means were limited; the treatment was left half-done.",
          detay: "There isn't always a cure for every ill.",
        },
      },
      {
        metin: "Look strong, act as if nothing's wrong.",
        ipucu: "You gain reputation but miss the treatment",
        basariliSonuc: {
          mesaj: "Your sturdy appearance got you spoken of as 'tough' in the ward.",
          detay: "Sometimes image comes before health — but it has a price.",
        },
        basarisizSonuc: {
          mesaj: "The ailment you hid grew much worse days later.",
          detay: "Ignored troubles come back bigger.",
        },
      },
    ],
  },

  hapis_firsatci_tuccar: {
    baslik: "The Ward's Merchant",
    metin:
      "One of the prisoners sells small luxuries smuggled in from outside (soap, tobacco, paper) at high prices. With the little money you have, you could buy a small comfort.",
    secenekler: [
      {
        metin: "Buy something, even at an exorbitant price.",
        ipucu: "A small but expensive pleasure",
        basariliSonuc: {
          mesaj: "Even a small piece of soap felt like a great luxury here.",
          detay: "Some small joys are worth the expense.",
        },
        basarisizSonuc: {
          mesaj: "What you bought wasn't as good as you'd hoped, but it was still a small change.",
          detay: "Not every purchase meets expectations.",
        },
      },
      {
        metin: "Trust your money, don't shop.",
        ipucu: "Thrifty",
        basariliSonuc: {
          mesaj: "You didn't spend the money; it may serve you better later.",
          detay: "Thrift is a virtue here too.",
        },
        basarisizSonuc: {
          mesaj: "Watching the others' small luxuries saddened you a little.",
          detay: "Some deprivations are small but felt.",
        },
      },
    ],
  },
};
