import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/hapis.ts — İngilizce çevirileri. */
export const OLAYLAR_HAPIS_EN: Record<string, OlayCeviri> = {
  hapis_tutuklanma: {
    baslik: "Guards at the Door",
    metin:
      "Your dark deeds caught up with you: guards at your door with a warrant. Time to pay.",
    secenekler: [
      {
        metin: "Flee through the back door.",
        basariliSonuc: {
          mesaj: "You leapt across rooftops and lost the guards; you're free.",
          detay: "Your escape will be the talk of town.",
        },
        basarisizSonuc: {
          mesaj: "Caught; your escape attempt made you look more dangerous.",
          detay: "Now a prisoner with a bad name.",
        },
      },
      {
        metin: "Don't resist, surrender.",
        basariliSonuc: {
          mesaj: "You surrendered; chained and taken to prison.",
          detay: "A prisoner now. Find a way out.",
        },
        basarisizSonuc: {
          mesaj: "A guard shoved you hard; you entered prison wounded.",
          detay: "Justice is not gentle here.",
        },
      },
    ],
  },

  hapis_kacis_girisimi: {
    baslik: "The Escape Plan",
    metin:
      "Your cellmates found the earth beneath the cell loose. The night shift change could open a window.",
    secenekler: [
      {
        metin: "Dig the tunnel, risk it.",
        basariliSonuc: {
          mesaj: "You slipped out the tunnel at night and fled the city; free.",
          detay: "Your escape will become legend.",
        },
        basarisizSonuc: {
          mesaj: "Caught in the tunnel; thrown into the punishment cell.",
          detay:
            "Only a beating, not a spear.",
        },
      },
      {
        metin: "Wait for a safer moment.",
        basariliSonuc: {
          mesaj: "You let today pass quietly; another chance may come.",
          detay: "Patience can be your only weapon.",
        },
        basarisizSonuc: {
          mesaj: "Waiting sank your spirits; the walls seem to close in.",
          detay: "Time flows differently in prison.",
        },
      },
    ],
  },

  hapis_rusvet_girisimi: {
    baslik: "The Power of Gold",
    metin:
      "A guard whispers, 'Every lock has a price.' You could try buying a way out with your little money.",
    secenekler: [
      {
        metin: "Offer a bribe.",
        basariliSonuc: {
          mesaj: "The guard took the money and 'forgot' the door open.",
          detay: "Justice smiles on the highest bidder.",
        },
        basarisizSonuc: {
          mesaj: "The guard took the money and reported you to his commander.",
          detay: "Conscience unsold, money gone.",
        },
      },
      {
        metin: "Don't risk it.",
        basariliSonuc: {
          mesaj: "You turned it down; your money stayed in your pocket.",
          detay: "Distrusting some chances is wiser.",
        },
        basarisizSonuc: {
          mesaj: "You resented missing the chance.",
          detay: "'If only I'd risked it.'",
        },
      },
    ],
  },

  hapis_isyan_firsati: {
    baslik: "Chaos in the Ward",
    metin:
      "The ward is in riot; the guards lost control. The chaos may offer a way out, but who survives is anyone's guess.",
    secenekler: [
      {
        metin: "Draw the Black Sword, cow the ward!",
        basariliSonuc: {
          mesaj:
            "Your blade bloodied the cells; the prison is yours now.",
          detay: "The cage became a golden throne.",
        },
        basarisizSonuc: {
          mesaj:
            "The riot was a flood; your blade fell and you were trampled.",
          detay: "Chaos bowed to no steel.",
        },
      },
      {
        metin: "Run for the door in the chaos.",
        basariliSonuc: {
          mesaj: "Nobody noticed; you slipped out the door and got free.",
          detay: "The screams will stay with you.",
        },
        basarisizSonuc: {
          mesaj: "A guard clubbed you down; you were counted a rioter.",
          detay: "You took the heaviest punishment.",
        },
      },
      {
        metin: "Retreat to your cell, stay out.",
        basariliSonuc: {
          mesaj: "You waited quietly; no one touched you until it was over.",
          detay: "Some fights are not yours.",
        },
        basarisizSonuc: {
          mesaj: "A stray kick landed on you; wounded though innocent.",
          detay: "Just being there costs you.",
        },
      },
    ],
  },

  hapis_yeni_tanidik: {
    baslik: "A Friend Behind Bars",
    metin:
      "Your cellmate {dost} told you their story; the first to make you feel less alone here.",
    secenekler: [
      {
        metin: "Trust them; build the bond.",
        basariliSonuc: {
          mesaj: "A real bond formed with {dost}; you're not alone anymore.",
          detay: "Friendship is born in the dark.",
        },
        basarisizSonuc: {
          mesaj: "Your words reached the wrong ears; you regret it.",
          detay: "Trust can cost dearly in prison.",
        },
      },
      {
        metin: "Keep distance, trust no one.",
        basariliSonuc: {
          mesaj: "You kept your distance; no one could use you.",
          detay: "Trust is a luxury here.",
        },
        basarisizSonuc: {
          mesaj: "Your loneliness grows heavier.",
          detay: "Keeping away has a price too.",
        },
      },
    ],
  },

  hapis_gardiyan_zulmu: {
    baslik: "A Ruthless Guard",
    metin: "Today's guard is in a foul mood and tries to punish you for nothing.",
    secenekler: [
      {
        metin: "Object, defend your rights.",
        basariliSonuc: {
          mesaj: "The prisoners cheered you; the guard backed down.",
          detay: "Sometimes resistance works.",
        },
        basarisizSonuc: {
          mesaj: "You paid harshly; days of pain followed.",
          detay: "Here, right belongs to might.",
        },
      },
      {
        metin: "Bow your head, stay silent.",
        basariliSonuc: {
          mesaj: "You endured silently; another bad day gone.",
          detay: "Survival sometimes means bowing.",
        },
        basarisizSonuc: {
          mesaj: "Anger filled you, but you hid it.",
          detay: "This anger may explode someday.",
        },
      },
    ],
  },

  hapis_cezasi_doldu: {
    baslik: "The End of the Sentence",
    metin:
      "The guard opened your cell: 'Sentence served. Out.' Sunlight dazzled your eyes.",
    secenekler: [
      {
        metin: "Step out, turn a new page.",
        basariliSonuc: {
          mesaj: "You served your sentence and walked out free.",
          detay: "You'll leave the past behind.",
        },
        basarisizSonuc: {
          mesaj: "You're free, but the weight didn't lift at once.",
          detay: "Some marks fade with time.",
        },
      },
      {
        metin: "Leave the city, leave no trace.",
        basariliSonuc: {
          mesaj: "You left unseen; your name will fade.",
          detay: "The best start is a quiet exit.",
        },
        basarisizSonuc: {
          mesaj: "You left, but curious eyes watched you go.",
          detay: "Leaving no trace is hard.",
        },
      },
    ],
  },

  hapis_hirsizlik_yakalanma: {
    baslik: "The Moment Your Hand Went to the Purse",
    metin:
      "Reaching for a merchant's purse in the market, your wrist was seized. 'Thief!' rang out and the crowd closed in.",
    secenekler: [
      {
        metin: "Push through the crowd and run.",
        basariliSonuc: {
          mesaj: "You broke free in the crush and ducked into an alley.",
          detay: "You got away this time.",
        },
        basarisizSonuc: {
          mesaj: "Caught; guards stepped in before the mob could lynch you.",
          detay: "You're behind bars now.",
        },
      },
      {
        metin: "Accept it, don't resist.",
        basariliSonuc: {
          mesaj: "You didn't resist; the guards took you quietly.",
          detay: "At least you weren't beaten.",
        },
        basarisizSonuc: {
          mesaj: "Someone punched you; the guards barely pulled them off.",
          detay: "The mob is faster than justice.",
        },
      },
    ],
  },

  hapis_asilzade_husumeti: {
    baslik: "The Lord's Wrath",
    metin:
      "You crossed a powerful lord with a word or by meddling. His men are at your door; no one will shield you.",
    secenekler: [
      {
        metin: "Apologize, beg for mercy.",
        basariliSonuc: {
          mesaj: "Your apology soothed the lord; you were only banished.",
          detay: "Pride broken, but you're free.",
        },
        basarisizSonuc: {
          mesaj: "Your apology read as weakness; the lord had you jailed.",
          detay: "Bowing isn't always enough.",
        },
      },
      {
        metin: "Defend yourself, claim you're right.",
        basariliSonuc: {
          mesaj: "Your courage won respect; the lord backed down.",
          detay: "Rarely, a nobody can win.",
        },
        basarisizSonuc: {
          mesaj: "The lord wouldn't tolerate insolence; beaten and jailed.",
          detay: "Defying the powerful cost dearly.",
        },
      },
    ],
  },

  hapis_kacakcilik_baskini: {
    baslik: "The Raid",
    metin:
      "A patrol raided the warehouse where you hide contraband. As the door breaks, you have seconds.",
    secenekler: [
      {
        metin: "Burn the evidence and run.",
        basariliSonuc: {
          mesaj: "You burned the goods and fled in the smoke.",
          detay: "Capital in ashes, but you're free.",
        },
        basarisizSonuc: {
          mesaj: "Caught red-handed in the smoke.",
          detay: "Burning the evidence didn't save you.",
        },
      },
      {
        metin: "Surrender quietly, hire a lawyer.",
        basariliSonuc: {
          mesaj: "Your lawyer got you off with a small fine.",
          detay: "Money worked here too.",
        },
        basarisizSonuc: {
          mesaj: "Despite your lawyer, the judge jailed you.",
          detay: "Some crimes even lawyers can't close.",
        },
      },
    ],
  },

  hapis_ayaklanma_tutuklamasi: {
    baslik: "The Crushed Uprising",
    metin:
      "The uprising you joined (or just stood near) was crushed. Questioning reaches your turn.",
    secenekler: [
      {
        metin: "Blend into the crowd, hide.",
        basariliSonuc: {
          mesaj: "You played a bystander; the soldiers let you go.",
          detay: "Luck favored you this time.",
        },
        basarisizSonuc: {
          mesaj: "An informer pointed you out; arrested as an 'agitator'.",
          detay: "Hiding in the crowd wasn't enough.",
        },
      },
      {
        metin: "State your cause, stand by it.",
        basariliSonuc: {
          mesaj: "Your courage won respect, but you were arrested anyway.",
          detay: "Easy conscience, narrow cell.",
        },
        basarisizSonuc: {
          mesaj: "Your words enraged the soldiers; beaten and jailed.",
          detay: "Telling the truth cost you dearly.",
        },
      },
    ],
  },

  hapis_zar_masasi_baskini: {
    baslik: "The Dice Table Raid",
    metin:
      "Gendarmes raided the tavern with the underground dice table. Everyone scatters; you're known as 'one of the regulars'.",
    secenekler: [
      {
        metin: "Slip out the back door.",
        basariliSonuc: {
          mesaj: "You slipped out the back in the smoke and chaos.",
          detay: "You escaped both the table and prison.",
        },
        basarisizSonuc: {
          mesaj: "Caught at the door; resisting was useless.",
          detay: "Gambling rarely ends well.",
        },
      },
      {
        metin: "Bribe the guard and leave quietly.",
        basariliSonuc: {
          mesaj: "The guard pocketed the purse and looked away.",
          detay: "Some doors open with gold.",
        },
        basarisizSonuc: {
          mesaj: "Another guard saw; you lost your money and got locked up.",
          detay: "You trusted the wrong guard.",
        },
      },
      {
        metin: "Don't resist, surrender.",
        basariliSonuc: {
          mesaj: "You surrendered calmly; at least no beating.",
          detay: "Cell is cold, but ribs are intact.",
        },
        basarisizSonuc: {
          mesaj: "Though calm, a guard took his temper out on you.",
          detay: "Sometimes silence isn't enough.",
        },
      },
    ],
  },

  hapis_karaborsa_baskini: {
    baslik: "The Black Market Raid",
    metin:
      "Guards stormed your black-market warehouse. The goods prove you profited from famine and plague; few ways out.",
    secenekler: [
      {
        metin: "Flee by the back exit.",
        basariliSonuc: {
          mesaj: "You slipped out the back; goods seized, but no jail.",
          detay: "Fortune gone, freedom kept.",
        },
        basarisizSonuc: {
          mesaj: "Caught fleeing; warehouse seized and you're locked up.",
          detay: "Dirty wealth's bill came due.",
        },
      },
      {
        metin: "Close the case with a hefty bribe.",
        basariliSonuc: {
          mesaj: "The bribe worked; case dropped, warehouse kept.",
          detay: "This time gold covered your crime.",
        },
        basarisizSonuc: {
          mesaj: "Bribe refused; you lost money, warehouse and freedom.",
          detay: "Sometimes even money isn't enough.",
        },
      },
      {
        metin: "Don't resist, surrender.",
        basariliSonuc: {
          mesaj: "You surrendered calmly; the whole warehouse was seized.",
          detay: "Dark earnings, dark ending.",
        },
        basarisizSonuc: {
          mesaj: "Though you surrendered, a guard took his anger out on you.",
          detay: "Years of earnings, taken today.",
        },
      },
    ],
  },

  hapis_tunel_karar: {
    baslik: "The Decision to Dig",
    metin:
      "The corner stone is loose; a tunnel could be dug beneath. Alone, or with a few trusted prisoners?",
    secenekler: [
      {
        metin: "Dig alone, trust no one.",
        basariliSonuc: {
          mesaj: "You began digging alone at night, quietly.",
          detay: "Alone is slow but safe.",
        },
        basarisizSonuc: {
          mesaj: "You cut your hand on the stone and bled; no one heard.",
          detay: "A small mishap.",
        },
      },
      {
        metin: "Team up with trusted prisoners.",
        basariliSonuc: {
          mesaj: "You struck a deal with three prisoners and dig in shifts.",
          detay: "A team is faster, but secrets slip.",
        },
        basarisizSonuc: {
          mesaj: "Building a team was hard; trust took time.",
          detay: "Still, the plan moved forward.",
        },
      },
    ],
  },

  hapis_tunel_tek_1: {
    baslik: "The Silent Dig",
    metin:
      "You advance night by night; the digging grows loud, and a guard's footsteps seem to near.",
    secenekler: [
      {
        metin: "Keep digging, risk it.",
        basariliSonuc: {
          mesaj: "The guard walked away; the tunnel advanced well.",
          detay: "Luck was with you.",
        },
        basarisizSonuc: {
          mesaj:
            "The guard searched but missed the stone; you're drained.",
          detay: "You got off cheap this time.",
        },
      },
      {
        metin: "Stop, wait quietly.",
        basariliSonuc: {
          mesaj: "The guard passed; you lost hours but you're safe.",
          detay: "Patience is part of the job.",
        },
        basarisizSonuc: {
          mesaj: "The wait dragged on; your spirits sank.",
          detay: "Underground, time crawls.",
        },
      },
    ],
  },

  hapis_tunel_tek_2: {
    baslik: "Out Into the Light",
    metin: "The tunnel is done. At midnight, time to crawl out into freedom.",
    secenekler: [
      {
        metin: "Crawl out now and run.",
        basariliSonuc: {
          mesaj: "You slipped out and melted into the dark; you're free.",
          detay: "You did it alone; a legend now.",
        },
        basarisizSonuc: {
          mesaj: "A patrol caught you at the exit; beaten and thrown back in.",
          detay: "Freedom slipped away so close.",
        },
      },
      {
        metin: "Be patient, wait for the calm hour.",
        basariliSonuc: {
          mesaj: "You waited for the quietest hour and slipped out.",
          detay: "Patience paid off.",
        },
        basarisizSonuc: {
          mesaj: "The tunnel nearly collapsed; you barely returned, caught.",
          detay: "The earth turned on you too.",
        },
      },
    ],
  },

  hapis_tunel_ekip_1: {
    baslik: "A Test of Trust",
    metin:
      "One of the team may be leaking to the guards. Keep trusting them, or hide the plan?",
    secenekler: [
      {
        metin: "Keep trusting them.",
        basariliSonuc: {
          mesaj: "Your suspicion was wrong; they want freedom as much as you.",
          detay: "Trust was repaid.",
        },
        basarisizSonuc: {
          mesaj:
            "A hint leaked to the guards, but the tunnel is undiscovered.",
          detay: "You slipped past danger.",
        },
      },
      {
        metin: "Hide the plan from them.",
        basariliSonuc: {
          mesaj: "You cut the suspect out; the dig went on quietly.",
          detay: "Caution worked this time.",
        },
        basarisizSonuc: {
          mesaj: "The excluded prisoner noticed; tension grew between you.",
          detay: "Mistrust feeds itself.",
        },
      },
    ],
  },

  hapis_tunel_ekip_2: {
    baslik: "The Joint Dig",
    metin: "The team digs in shifts; the tunnel advances fast, but so does the noise.",
    secenekler: [
      {
        metin: "Speed up, risk it.",
        basariliSonuc: {
          mesaj: "Working fast paid off; the tunnel finished early.",
          detay: "Team spirit made the difference.",
        },
        basarisizSonuc: {
          mesaj: "A guard heard noise but found no source; the team froze.",
          detay: "You got off cheap.",
        },
      },
      {
        metin: "Go slow and quiet.",
        basariliSonuc: {
          mesaj: "Thanks to the patient pace, no one noticed.",
          detay: "Slow but sure steps.",
        },
        basarisizSonuc: {
          mesaj: "The slow pace hurt morale; the team grew restless.",
          detay: "Some grow impatient.",
        },
      },
    ],
  },

  hapis_tunel_ekip_3: {
    baslik: "The Mass Escape",
    metin:
      "The tunnel is ready. Time to slip out, but a big group raises the risk of notice.",
    secenekler: [
      {
        metin: "Get out all together, quickly.",
        basariliSonuc: {
          mesaj:
            "You plunged into the dark; most were gone before the alarm.",
          detay: "It went down in prison history.",
        },
        basarisizSonuc: {
          mesaj:
            "The noise woke the guards; most of you were recaptured.",
          detay: "Numbers were a handicap this time.",
        },
      },
      {
        metin: "One by one, at intervals.",
        basariliSonuc: {
          mesaj: "You slipped out one by one; no one knew until morning count.",
          detay: "Patience made the crowd invisible.",
        },
        basarisizSonuc: {
          mesaj: "A guard showed on your turn; you were caught, the rest fled.",
          detay: "Bad timing gave you away.",
        },
      },
    ],
  },

  hapis_rusvet_muhbir_bulma: {
    baslik: "Finding the Weak Link",
    metin:
      "You look for a guard who can be bought; a young sentry with rumored gambling debts catches your eye.",
    secenekler: [
      {
        metin: "Approach him, strike up talk.",
        basariliSonuc: {
          mesaj: "The young guard spoke of his debts; just your man.",
          detay: "Weakness is the best key.",
        },
        basarisizSonuc: {
          mesaj: "The guard stayed distant; his trust is hard to win.",
          detay: "Not everyone opens easily.",
        },
      },
      {
        metin: "Ask prisoners for a solid name.",
        basariliSonuc: {
          mesaj: "A small 'thank you' bought a reliable name.",
          detay: "Even in prison, information pays.",
        },
        basarisizSonuc: {
          mesaj: "The name was useless; your money was wasted.",
          detay: "Not every tip pans out.",
        },
      },
    ],
  },

  hapis_rusvet_pazarlik_derin: {
    baslik: "Haggling Over the Price",
    metin: "The guard named his price, higher than expected. Haggle, or pay it?",
    secenekler: [
      {
        metin: "Haggle hard.",
        basariliSonuc: {
          mesaj: "Haggling worked; you cut the price quite a bit.",
          detay: "Your purse is less wounded.",
        },
        basarisizSonuc: {
          mesaj:
            "Your pushing offended him; he accepted at the last moment.",
          detay: "Going cheap is a risky game.",
        },
      },
      {
        metin: "Pay what he wants.",
        basariliSonuc: {
          mesaj: "The deal closed quickly and smoothly.",
          detay: "Time can be worth more than money.",
        },
        basarisizSonuc: {
          mesaj: "You agreed, but the guard had to delay the plan.",
          detay: "Not every deal goes as promised.",
        },
      },
    ],
  },

  hapis_rusvet_uygulama: {
    baslik: "The Night the Door Opened",
    metin:
      "The night of the deal is here. The guard will be waiting at the agreed hour, or it's a trap.",
    secenekler: [
      {
        metin: "Trust the plan, go on time.",
        basariliSonuc: {
          mesaj: "The guard kept his word; the door was 'accidentally' open.",
          detay: "Gold proved its power again.",
        },
        basarisizSonuc: {
          mesaj: "A trap! The guard reported you; harsh punishment.",
          detay: "Some deals are rotten from the start.",
        },
      },
      {
        metin: "Get suspicious, call it off.",
        basariliSonuc: {
          mesaj: "You trusted your gut and pulled back; it was right.",
          detay: "Sometimes avoiding is a victory too.",
        },
        basarisizSonuc: {
          mesaj: "You backed out but lost the advance you'd paid.",
          detay: "Your mistrust had a price.",
        },
      },
    ],
  },

  hapis_bayiltma_plan: {
    baslik: "Watching for the Chance",
    metin:
      "The lone night guard grows careless as he passes the cells. Disabling him could open an escape.",
    secenekler: [
      {
        metin: "Hide something hard to strike with.",
        basariliSonuc: {
          mesaj: "You hid a hard object; the plan takes shape.",
          detay: "Preparation is the plan's foundation.",
        },
        basarisizSonuc: {
          mesaj: "Finding one was hard, but you found something workable.",
          detay: "Not perfect, but enough.",
        },
      },
      {
        metin: "Prepare a lie to distract him.",
        basariliSonuc: {
          mesaj: "You crafted a convincing story; it'll hold the guard.",
          detay: "Sometimes the best weapon is words.",
        },
        basarisizSonuc: {
          mesaj: "Your story is weak, but you're bold enough to try.",
          detay: "No plan is flawless.",
        },
      },
    ],
  },

  hapis_bayiltma_saldiri: {
    baslik: "The Moment Has Come",
    metin:
      "The guard passes your cell. Now or never, but attacking a guard is among the gravest crimes.",
    secenekler: [
      {
        metin: "Strike suddenly, knock him out.",
        basariliSonuc: {
          mesaj: "The blow landed; he crumpled and you took the keys.",
          detay: "Your heart pounds, but you did it.",
        },
        basarisizSonuc: {
          mesaj:
            "He turned in time; a brawl, then harsh punishment.",
          detay: "Attacking a guard costs dearly.",
        },
      },
      {
        metin: "Give up at the last moment.",
        basariliSonuc: {
          mesaj: "You called it off; another chance may come.",
          detay: "Sometimes stepping back takes courage.",
        },
        basarisizSonuc: {
          mesaj: "You gave up, but the guard nearly saw the object.",
          detay: "Your heart is still pounding.",
        },
      },
    ],
  },

  hapis_bayiltma_kacis: {
    baslik: "Escape With the Keys",
    metin:
      "The keys are in your hand, the door before you. But the corridors are long, the exit unclear.",
    secenekler: [
      {
        metin: "Run for the nearest exit.",
        basariliSonuc: {
          mesaj: "You ran through dark corridors and got out; you're free.",
          detay: "This daring escape will be legend.",
        },
        basarisizSonuc: {
          mesaj: "You ran into another sentry and were harshly subdued.",
          detay: "Attack and capture cost the most.",
        },
      },
      {
        metin: "Wear his uniform, walk out calmly.",
        basariliSonuc: {
          mesaj: "In the guard's uniform you walked calmly out the main gate.",
          detay: "Daring beat force.",
        },
        basarisizSonuc: {
          mesaj: "An officer spotted you and subdued you harshly.",
          detay: "The disguise plan failed.",
        },
      },
    ],
  },

  hapis_iyi_hal_karar: {
    baslik: "The Decision to Behave",
    metin:
      "A guard says exemplary prisoners are sometimes considered for early release. You could behave and earn trust.",
    secenekler: [
      {
        metin: "Follow the rules, work quietly.",
        basariliSonuc: {
          mesaj: "Your conduct drew the guards' favorable notice.",
          detay: "Patience became strategy here.",
        },
        basarisizSonuc: {
          mesaj: "Your efforts went unnoticed; no one cared.",
          detay: "Goodness sometimes goes unseen.",
        },
      },
      {
        metin: "Do small favors for the guards.",
        basariliSonuc: {
          mesaj: "Your favors worked; a guard has begun mentioning you.",
          detay: "Small kindnesses open big doors.",
        },
        basarisizSonuc: {
          mesaj: "Prisoners called you a 'bootlicker'; your standing shook.",
          detay: "No strategy is free.",
        },
      },
    ],
  },

  hapis_iyi_hal_degerlendirme: {
    baslik: "The Board's Decision",
    metin:
      "The administration met to review your file for early release. Their decision could change your life.",
    secenekler: [
      {
        metin: "Give a sincere speech of remorse.",
        basariliSonuc: {
          mesaj: "Your words moved the board; sentence cut short.",
          detay: "Honesty is the strongest defense.",
        },
        basarisizSonuc: {
          mesaj: "The board wasn't convinced; release denied.",
          detay: "Effort isn't always rewarded at once.",
        },
      },
      {
        metin: "Settle for a short petition.",
        basariliSonuc: {
          mesaj: "Your petition was accepted; you were quietly released.",
          detay: "Some victories are quiet.",
        },
        basarisizSonuc: {
          mesaj: "Your petition fell short; wait for the next review.",
          detay: "Bureaucracy is slow here too.",
        },
      },
    ],
  },

  hapis_isyan_hazirlik: {
    baslik: "Among the Whispers",
    metin:
      "Whispers of a riot spread through the ward; anger is about to burst. Choose whom to trust; the wrong ear means trouble.",
    secenekler: [
      {
        metin: "Join the plan with trusted men.",
        basariliSonuc: {
          mesaj: "You made a quiet pact; you'll be ready when it breaks.",
          detay: "Some alliances are made in the dark.",
        },
        basarisizSonuc: {
          mesaj: "Choosing whom to trust was hard; you wait on edge.",
          detay: "Uncertainty wears most.",
        },
      },
      {
        metin: "Trust no one, only watch.",
        basariliSonuc: {
          mesaj: "You watched silently and told no one anything.",
          detay: "Not using information is safest.",
        },
        basarisizSonuc: {
          mesaj: "Even watching kept you tense; you can't tell what comes.",
          detay: "Waiting can wear more than action.",
        },
      },
    ],
  },

  hapis_hastalik: {
    baslik: "Damp Cell Sickness",
    metin:
      "Sickness spreads in the damp ward. The little clean water suffices for you or the sick prisoner beside you.",
    secenekler: [
      {
        metin: "Share the water with the sick man.",
        basariliSonuc: {
          mesaj: "You shared the water; he recovered and stayed grateful.",
          detay: "Kindness expects nothing in return.",
        },
        basarisizSonuc: {
          mesaj: "It wasn't enough; you both grew weak.",
          detay: "Good intentions aren't always enough.",
        },
      },
      {
        metin: "Keep the water; protect yourself.",
        basariliSonuc: {
          mesaj: "You kept your health, but his cough worsened.",
          detay: "Survival demands selfishness.",
        },
        basarisizSonuc: {
          mesaj: "Despite the water, you fell ill too; your conscience aches.",
          detay: "Some choices have no winner.",
        },
      },
    ],
  },

  hapis_aclik_grevi: {
    baslik: "A Call for a Hunger Strike",
    metin:
      "The prisoners start a hunger strike for better conditions. Joining shows solidarity, but your body has limits.",
    secenekler: [
      {
        metin: "Join the strike.",
        basariliSonuc: {
          mesaj: "The strike worked; conditions improved a little.",
          detay: "Hunger was the price, but worth it.",
        },
        basarisizSonuc: {
          mesaj: "The strike achieved nothing; you only grew weak.",
          detay: "Not every resistance wins.",
        },
      },
      {
        metin: "Don't join, eat your share.",
        basariliSonuc: {
          mesaj: "You kept your health; the prisoners shunned you.",
          detay: "Some choices isolate you.",
        },
        basarisizSonuc: {
          mesaj: "You stayed out, but guilt lingers.",
          detay: "Standing aside is a choice too.",
        },
      },
    ],
  },

  hapis_kacak_mektup: {
    baslik: "The Smuggled Letter",
    metin:
      "A bribed guard hands you a smuggled letter from {dost}. Hope or bad news inside, you can't tell.",
    secenekler: [
      {
        metin: "Open it and read.",
        basariliSonuc: {
          mesaj: "{dost} wrote that they're waiting; your hope revived.",
          detay: "Being thought of is priceless.",
        },
        basarisizSonuc: {
          mesaj: "The letter held bitter news; you withdrew for days.",
          detay: "Some news closes the walls in.",
        },
      },
      {
        metin: "Keep it, wait for the right time.",
        basariliSonuc: {
          mesaj: "You hid it; the thought of reading it gives strength.",
          detay: "Postponing hope is strategy too.",
        },
        basarisizSonuc: {
          mesaj: "Curiosity won and you read it; the right moment never came.",
          detay: "Patience isn't always rewarded.",
        },
      },
    ],
  },

  hapis_zayif_mahkum_korumasi: {
    baslik: "A Weak Prisoner",
    metin:
      "Strong prisoners torment a weak old prisoner and take his food. Stepping in is risky, but your conscience pushes.",
    secenekler: [
      {
        metin: "Step in, protect the weak.",
        basariliSonuc: {
          mesaj: "The strong backed off; the old man is grateful.",
          detay: "One person can make a difference.",
        },
        basarisizSonuc: {
          mesaj: "You were beaten, yet the old man was left in peace a while.",
          detay: "It cost you, but wasn't wasted.",
        },
      },
      {
        metin: "Stay out, mind your business.",
        basariliSonuc: {
          mesaj: "You stayed out; at least you're safe.",
          detay: "Some pangs are carried silently.",
        },
        basarisizSonuc: {
          mesaj: "The old man's screams haunt your nights.",
          detay: "Silence has a price too.",
        },
      },
    ],
  },

  hapis_gardiyan_yozlastirma: {
    baslik: "A Small Privilege",
    metin:
      "A guard hints that for small regular 'gifts' he can get you extra food and a better corner.",
    secenekler: [
      {
        metin: "Agree, pay regularly.",
        basariliSonuc: {
          mesaj: "The deal worked; your conditions improved.",
          detay: "Small sums make a big difference.",
        },
        basarisizSonuc: {
          mesaj: "Despite your payments, the guard broke his word.",
          detay: "Some deals are one-sided.",
        },
      },
      {
        metin: "Refuse, owe no one.",
        basariliSonuc: {
          mesaj: "You refused; at least you depend on no one.",
          detay: "Independence costs comfort.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal offended him; he was cold for days.",
          detay: "Every no can cost.",
        },
      },
    ],
  },

  hapis_zanaat_ogrenme: {
    baslik: "Keeping the Hands Busy",
    metin:
      "An old prisoner carves wood in his cell. He offers to teach you the craft, a way to kill time.",
    secenekler: [
      {
        metin: "Learn it, practice patiently.",
        basariliSonuc: {
          mesaj:
            "You learned the craft; the carvings bring peace and pride.",
          detay: "Some skills are born behind walls.",
        },
        basarisizSonuc: {
          mesaj: "Your hands weren't suited, but trying was pleasant.",
          detay: "Not every skill comes easily.",
        },
      },
      {
        metin: "Decline, pass time another way.",
        basariliSonuc: {
          mesaj: "You declined politely and chose your own silence.",
          detay: "Everyone passes time differently.",
        },
        basarisizSonuc: {
          mesaj: "The days blurred together; boredom grew heavy.",
          detay: "Idleness is the enemy here.",
        },
      },
    ],
  },

  hapis_dini_arinma: {
    baslik: "Turning Inward",
    metin: "A clergyman visits the prison; he wants to talk with you, perhaps hear your sins.",
    secenekler: [
      {
        metin: "Pour your heart out.",
        basariliSonuc: {
          mesaj: "Confessing lifted a great weight; you returned at peace.",
          detay: "Some burdens lighten when shared.",
        },
        basarisizSonuc: {
          mesaj: "Speaking wasn't easy; the words knotted in your throat.",
          detay: "Some openings take time.",
        },
      },
      {
        metin: "Keep distance, listen politely.",
        basariliSonuc: {
          mesaj: "You listened but didn't open up; still, a small comfort.",
          detay: "Not everyone opens up the same way.",
        },
        basarisizSonuc: {
          mesaj: "Your distance saddened him; the visit ended early.",
          detay: "Some doors choose to stay shut.",
        },
      },
    ],
  },

  hapis_kumar: {
    baslik: "The Ward Gamble",
    metin:
      "Dice are played secretly in the ward; losers give up their food, winners gain standing. Join in?",
    secenekler: [
      {
        metin: "Try a hand.",
        basariliSonuc: {
          mesaj: "Luck was yours; the ward now calls you 'the lucky one'.",
          detay: "A small win means much here.",
        },
        basarisizSonuc: {
          mesaj: "You lost, but the thrill lingers; you want to play again.",
          detay: "Even here, addiction waits.",
        },
      },
      {
        metin: "Stay out, watch from the side.",
        basariliSonuc: {
          mesaj: "You only watched; at least your share stayed yours.",
          detay: "Sometimes watching is enough fun.",
        },
        basarisizSonuc: {
          mesaj: "Even watching made you a bit envious.",
          detay: "Temptation is felt even from outside.",
        },
      },
    ],
  },

  hapis_muhbirlik_teklifi: {
    baslik: "An Informant Offer",
    metin:
      "The administration offers privileges for informing on another prisoner. Life gets easier, but you carry the betrayal.",
    secenekler: [
      {
        metin: "Accept it, inform.",
        basariliSonuc: {
          mesaj: "Your conditions improved, but you can't meet anyone's eyes.",
          detay: "Your comfort came off someone's back.",
        },
        basarisizSonuc: {
          mesaj: "You were outed as an informant; no one trusts you.",
          detay: "Betrayal cost more than it gave.",
        },
      },
      {
        metin: "Refuse, stay loyal.",
        basariliSonuc: {
          mesaj: "You refused; prisoners now call you 'reliable'.",
          detay: "Some principles aren't negotiable.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered the administration; small punishment.",
          detay: "Doing right had a price.",
        },
      },
    ],
  },

  hapis_ziyaretci: {
    baslik: "A Face Between the Bars",
    metin:
      "{dost} came a long way to visit you. Through the bars, your eyes hold much unsaid.",
    secenekler: [
      {
        metin: "Hide your feelings, look strong.",
        basariliSonuc: {
          mesaj: "Your strength reassured them; they worried less.",
          detay: "Protecting loved ones can mean hiding.",
        },
        basarisizSonuc: {
          mesaj: "You tried to look strong, but your voice shook.",
          detay: "Some feelings can't be hidden.",
        },
      },
      {
        metin: "Share your feelings openly.",
        basariliSonuc: {
          mesaj: "Your honesty strengthened the bond; you both felt lighter.",
          detay: "Showing weakness is strength.",
        },
        basarisizSonuc: {
          mesaj: "Sharing your feelings wore you out more than expected.",
          detay: "Some moments heal and exhaust.",
        },
      },
    ],
  },

  hapis_kis_soguk: {
    baslik: "The Cruelty of Winter",
    metin:
      "Winter fell mercilessly on the cells; one blanket, and the old prisoner beside you shivers.",
    secenekler: [
      {
        metin: "Share your blanket.",
        basariliSonuc: {
          mesaj: "You shared the blanket; cold, but not alone.",
          detay: "Warmth multiplies when shared.",
        },
        basarisizSonuc: {
          mesaj: "Sharing wasn't enough; you both had a hard night.",
          detay: "Winter here has no mercy.",
        },
      },
      {
        metin: "Keep the blanket.",
        basariliSonuc: {
          mesaj: "You stayed warm, but his shivering was hard to ignore.",
          detay: "Survival demands selfishness.",
        },
        basarisizSonuc: {
          mesaj: "Despite the blanket, the cold seeped in everywhere.",
          detay: "Some winters spare no one.",
        },
      },
    ],
  },

  hapis_yeni_mahkum: {
    baslik: "The Newcomer",
    metin:
      "A young, frightened prisoner arrives; he doesn't know what to do and everyone sizes him up.",
    secenekler: [
      {
        metin: "Mentor him, teach him the rules.",
        basariliSonuc: {
          mesaj: "The young prisoner is grateful; you taught him the ward.",
          detay: "Leadership starts with small help.",
        },
        basarisizSonuc: {
          mesaj: "Your advice wasn't understood; he fended for himself.",
          detay: "Advice isn't always grasped at once.",
        },
      },
      {
        metin: "Leave him be.",
        basariliSonuc: {
          mesaj: "You stayed out; he began learning the hard way.",
          detay: "Everyone finds a way eventually.",
        },
        basarisizSonuc: {
          mesaj: "Seeing him struggle stung you a little.",
          detay: "Conscience criticizes quietly.",
        },
      },
    ],
  },

  hapis_yolsuzluk_tanikligi: {
    baslik: "The Corruption You Witnessed",
    metin:
      "You saw a guard regularly stealing from prisoners' food parcels. Reporting is risky; silence weighs on your conscience.",
    secenekler: [
      {
        metin: "Report it to the warden.",
        basariliSonuc: {
          mesaj: "The guard was removed; the ward calls you 'fair'.",
          detay: "Speaking the truth worked.",
        },
        basarisizSonuc: {
          mesaj: "Your report leaked to his friends; you faced retaliation.",
          detay: "Speaking the truth had a price.",
        },
      },
      {
        metin: "Stay silent, stay out.",
        basariliSonuc: {
          mesaj: "You stayed silent; at least you avoided trouble.",
          detay: "Safe silence, but uncomfortable.",
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
      "The prison doctor does a routine check. Tell the truth and you get treated, but looking weak is risky here.",
    secenekler: [
      {
        metin: "Describe your condition honestly.",
        basariliSonuc: {
          mesaj: "The doctor took you seriously and treated you well.",
          detay: "Honesty worked here too.",
        },
        basarisizSonuc: {
          mesaj: "The doctor cared, but his means were limited; half a cure.",
          detay: "Not every ill has a cure.",
        },
      },
      {
        metin: "Act as if nothing's wrong.",
        basariliSonuc: {
          mesaj: "Your tough look made you 'hardy' in the ward.",
          detay: "Sometimes image comes before health.",
        },
        basarisizSonuc: {
          mesaj: "The ailment you hid grew much worse days later.",
          detay: "Ignored troubles return bigger.",
        },
      },
    ],
  },

  hapis_firsatci_tuccar: {
    baslik: "The Ward's Merchant",
    metin:
      "A prisoner sells smuggled luxuries (soap, tobacco, paper) dear. With your little money you could buy some comfort.",
    secenekler: [
      {
        metin: "Buy something, however dear.",
        basariliSonuc: {
          mesaj: "Even a bit of soap felt like luxury here.",
          detay: "Small joys are worth the price.",
        },
        basarisizSonuc: {
          mesaj: "It wasn't as good as hoped, but it was a change.",
          detay: "Not every purchase delivers.",
        },
      },
      {
        metin: "Don't shop, keep your money.",
        basariliSonuc: {
          mesaj: "You kept your money; it may help more later.",
          detay: "Thrift is a virtue here too.",
        },
        basarisizSonuc: {
          mesaj: "Watching the others' small luxuries saddened you.",
          detay: "Small deprivations are felt.",
        },
      },
    ],
  },

  hapis_avlu_duvari: {
    baslik: "The Yard Wall",
    metin:
      "The yard's north wall is crumbling where the tower can't see. A quick climb, but a fall or a sighting costs dearly.",
    secenekler: [
      {
        metin: "Climb the wall, drop over.",
        basariliSonuc: {
          mesaj: "You held on, dropped over and ran. You're free.",
          detay: "You ran without looking back.",
        },
        basarisizSonuc: {
          mesaj: "A guard shouted; you fell, got clubbed, sentence extended.",
          detay: "Next time, wait longer.",
        },
      },
      {
        metin: "Give up, get back in line.",
        basariliSonuc: {
          mesaj: "You couldn't risk it; you slipped back among the others.",
          detay: "Maybe another day, another wall.",
        },
        basarisizSonuc: {
          mesaj: "A guard noticed your hesitation; you were watched for days.",
          detay: "Eyes on you.",
        },
      },
    ],
  },

  hapis_camasir_arabasi: {
    baslik: "The Laundry Cart",
    metin:
      "The weekly laundry cart leaves the gate; the driver is old and absent-minded. You could bury yourself under the cloth.",
    secenekler: [
      {
        metin: "Hide under the laundry.",
        basariliSonuc: {
          mesaj: "Past the gate, you melted into the crowd. Free.",
          detay: "Nobody looked at that cart the same.",
        },
        basarisizSonuc: {
          mesaj: "A bayonet jab into the pile; your scream gave you away. Sentence extended.",
          detay: "You hadn't counted on the routine jab.",
        },
      },
      {
        metin: "Risky; skip this week.",
        basariliSonuc: {
          mesaj: "You memorised the timing but didn't jump.",
          detay: "Knowledge piles up.",
        },
        basarisizSonuc: {
          mesaj: "Waiting wore your spirits down a bit more.",
          detay: "The walls are patient.",
        },
      },
    ],
  },

  hapis_sayim_karisikligi: {
    baslik: "Confusion at Roll Call",
    metin:
      "A roll-call brawl scatters the guards. Strolling calmly to the gate through the foggy yard might go unnoticed.",
    secenekler: [
      {
        metin: "Use the chaos, walk to the gate.",
        basariliSonuc: {
          mesaj: "No one looked; you vanished into the fog.",
          detay: "Sometimes the best plan is no plan.",
        },
        basarisizSonuc: {
          mesaj: "Ten steps from the gate you were caught: beating, longer sentence.",
          detay: "You're marked a 'flight risk' now.",
        },
      },
      {
        metin: "Stay put, wait out the count.",
        basariliSonuc: {
          mesaj: "You stood still; the brawl ended, the count finished.",
          detay: "Chance gone, but ribs intact.",
        },
        basarisizSonuc: {
          mesaj: "Caught in the brawl, you took a few elbows.",
          detay: "Standing in the wrong spot takes skill.",
        },
      },
    ],
  },
};
