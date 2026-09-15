import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiAskerYollari.ts — İngilizce çevirileri (45 olay). */
export const OLAYLAR_SANAYI_ASKER_YOLLARI_EN: Record<string, OlayCeviri> = {
  sd_asker_yol_ilk_gorev: {
    baslik: "The First Duty",
    metin:
      "Your battalion has been assigned to 'maintain order' in a mining town where the workers have gone on strike. Your captain may give the order to open fire on the exhausted, starving workers; your first serious duty unfolds in the middle of this tension.",
    secenekler: [
      {
        metin: "Carry out the order without question, show your discipline.",
        basariliSonuc: {
          mesaj: "When the crowd heard the order they scattered, no blood was shed; your captain marked you down as a 'trustworthy soldier'.",
          detay: "Some soldiers obey without thinking; their conscience either grows used to it in time, or never does.",
        },
        basarisizSonuc: {
          mesaj: "The crowd didn't scatter, a scuffle broke out; you carried out the order, but you couldn't forget the fear in one worker's eyes.",
          detay: "Obedience sometimes leaves you inside scenes you never wanted.",
        },
      },
      {
        metin: "Object to your captain, defy the order to open fire.",
        basariliSonuc: {
          mesaj: "Your objection stopped the captain; no one fired, but now you're known as a 'troublesome soldier'.",
          detay: "Some objections save a life, some overshadow a career; yours did both.",
        },
        basarisizSonuc: {
          mesaj: "Your objection went unheard, they even threatened to arrest you; still, you didn't silence your conscience.",
          detay: "Some resistances are lost but not forgotten.",
        },
      },
      {
        metin: "Disperse the crowd ruthlessly, set an example.",
        basariliSonuc: {
          mesaj: "Your harsh intervention scattered the crowd instantly; the command chain marked you as 'decisive'.",
          detay: "Some victories come back to haunt you later.",
        },
        basarisizSonuc: {
          mesaj: "Your harshness only enraged the workers further; the scuffle grew and you were wounded too.",
          detay: "Brutality doesn't always buy obedience; sometimes it breeds a greater fury.",
        },
      },
      {
        metin: "Desert your post, drop your weapon and vanish into the night.",
        basariliSonuc: {
          mesaj: "You slipped away unnoticed; but now you live in constant fear of being caught at any moment.",
          detay: "Freedom is sometimes an invisible weight carried on your shoulders.",
        },
        basarisizSonuc: {
          mesaj: "The sentries caught you; you were beaten and brought back, branded a 'deserter' in your file.",
          detay: "Escape attempts sometimes turn into a heavier chain.",
        },
      },
    ],
  },

  // ══════════════════════════ LOYAL (discipline, obedience) ══════════════════════════
  sd_asker_yol_sadik_tatbikat_disiplini: {
    baslik: "Drill Discipline",
    metin:
      "The regiment commander is holding an exhausting days-long drill with the new rifles. Some soldiers grumble; you carry out every instruction to the letter.",
    secenekler: [
      {
        metin: "Be a model soldier, complete even the harshest drills without complaint.",
        basariliSonuc: {
          mesaj: "The regiment commander praised your discipline; the sergeants held you up as an example.",
          detay: "Obedience sometimes runs straight through the body.",
        },
        basarisizSonuc: {
          mesaj: "The drill wore you out too much; you stumbled and fell during one exercise, and heard laughter.",
          detay: "Discipline sometimes demands a price beyond the body.",
        },
      },
      {
        metin: "Coast through it like the other soldiers.",
        basariliSonuc: {
          mesaj: "You handled the drill like everyone else did; no one noticed.",
          detay: "Being ordinary is sometimes the safest harbor.",
        },
        basarisizSonuc: {
          mesaj: "The sergeant noticed you slacking off, and you were scolded in front of everyone.",
          detay: "Trying not to stand out, you managed the exact opposite.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_zor_emir: {
    baslik: "A Hard Order",
    metin:
      "Supplies at the barracks are running low; the captain orders you to cut a sick, elderly soldier's rations and give them to the younger men. The order is clear, but your conscience is not at ease.",
    secenekler: [
      {
        metin: "Carry out the order, don't question it.",
        basariliSonuc: {
          mesaj: "You carried out the order; the captain was pleased, but you couldn't forget the sick soldier's look.",
          detay: "Obedience sometimes leaves a silent guilt behind.",
        },
        basarisizSonuc: {
          mesaj: "You carried out the order but your hand trembled; the other soldiers noticed and drew away from you a little.",
          detay: "Some orders leave a mark even when carried out.",
        },
      },
      {
        metin: "Secretly give a part of your own ration to the sick soldier.",
        basariliSonuc: {
          mesaj: "You gave from your own share; the sick soldier recovered a little, and no one noticed.",
          detay: "A quiet kindness is sometimes enough.",
        },
        basarisizSonuc: {
          mesaj: "A sergeant caught you splitting rations; you were scolded for acting against orders.",
          detay: "Sometimes a small kindness demands a large price.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_ust_ortme: {
    baslik: "A Superior's Mistake",
    metin:
      "A drunken order from {amir} caused a maneuver to go wrong. If an investigation opens {amir}'s career is over; you're asked to stay silent.",
    secenekler: [
      {
        metin: "Stay silent, cover the mistake for your superior.",
        basariliSonuc: {
          mesaj: "{amir} was grateful and took you into their inner circle; no investigation opened.",
          detay: "Loyalty sometimes repays itself quickly.",
        },
        basarisizSonuc: {
          mesaj: "Your cover-up attempt was noticed; the inspectors put you on the suspect list too.",
          detay: "One lie often demands another.",
        },
      },
      {
        metin: "Tell the truth to the board of inquiry.",
        basariliSonuc: {
          mesaj: "You told the truth; {amir} was relieved of command, but the new commander who took their place doesn't trust you.",
          detay: "Telling the truth sometimes breeds new enemies.",
        },
        basarisizSonuc: {
          mesaj: "Your testimony wasn't taken seriously, and worse, you got branded 'the informer'; you grew lonely in the barracks.",
          detay: "Honesty doesn't always get its due.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_egitmen: {
    baslik: "Drill Instructor",
    metin:
      "Because of your flawless discipline you've been assigned to train new recruits. Some recruits are lax, some are fearful; what kind of instructor you become is up to you.",
    secenekler: [
      {
        metin: "Be a harsh, uncompromising instructor.",
        basariliSonuc: {
          mesaj: "The recruits feared you, but a disciplined company emerged; the command chain valued it.",
          detay: "Fear is sometimes mistaken for discipline.",
        },
        basarisizSonuc: {
          mesaj: "A recruit was injured during a harsh drill; the blame fell on you.",
          detay: "Harshness sometimes exacts its own price.",
        },
      },
      {
        metin: "Be a patient but firm instructor.",
        basariliSonuc: {
          mesaj: "The recruits learned to trust you; your company came out both disciplined and loyal.",
          detay: "Respect is sometimes more lasting than fear.",
        },
        basarisizSonuc: {
          mesaj: "Some recruits mistook your gentleness for weakness; the drills grew undisciplined and your superiors weren't pleased.",
          detay: "Patience is sometimes misread.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_gizli_gorev: {
    baslik: "A Delicate Task",
    metin:
      "High command gives you a secret courier task: carry documents proving an officer took bribes quietly up to the higher authorities. You can trust no one.",
    secenekler: [
      {
        metin: "Complete the task quietly, flawlessly.",
        basariliSonuc: {
          mesaj: "You delivered the documents without anyone noticing; high command now entrusts you with special missions.",
          detay: "Quiet reliability is sometimes the most valuable capital.",
        },
        basarisizSonuc: {
          mesaj: "You were followed on the road, and barely escaped having the documents taken by force; but rumors about the affair spread.",
          detay: "Secret missions sometimes don't stay secret.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_cephe_itaati: {
    baslik: "Obedience at the Front",
    metin:
      "Under artillery fire, the commander refuses to retreat and orders you to hold the position to the last man. The order looks suicidal, but you trust the commander.",
    secenekler: [
      {
        metin: "Stay in position, carry out the order to the end.",
        basariliSonuc: {
          mesaj: "The position held, the enemy was pushed back; your name spread through the battalion as 'iron discipline'.",
          detay: "Some acts of obedience become legend.",
        },
        basarisizSonuc: {
          mesaj: "The position nearly fell, you survived gravely wounded; the commander's decision is still disputed.",
          detay: "Obedience sometimes brings you face to face with death.",
        },
      },
      {
        metin: "Quietly convince a few soldiers to fall back, then return.",
        basariliSonuc: {
          mesaj: "You got a few young soldiers out alive; no one noticed, but your conscience is at ease.",
          detay: "Some acts of disobedience are never spoken of.",
        },
        basarisizSonuc: {
          mesaj: "The commander noticed the ones falling back; you were accused of 'cowardice' and given a disciplinary penalty.",
          detay: "A quiet deviation sometimes doesn't stay quiet.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_asayis_gorevi: {
    baslik: "Order Duty",
    metin:
      "A new wave of strikes has begun in the city; your battalion has been officially ordered to 'keep the streets under control'. The orders are clear, their execution is in your hands.",
    secenekler: [
      {
        metin: "Carry out the orders to the letter, without emotion.",
        basariliSonuc: {
          mesaj: "The streets calmed quickly; the command chain is pleased, but in the people's eyes you look like an instrument of oppression.",
          detay: "Obedience sometimes breeds fear rather than love.",
        },
        basarisizSonuc: {
          mesaj: "The crowd refused to disperse, a scuffle broke out; you carried out the order but you were wounded.",
          detay: "The streets don't always obey.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_terfi_sinavi: {
    baslik: "Promotion Exam",
    metin:
      "You're going into a promotion interview before the staff board. The questions test your loyalty and your commitment to the chain of command.",
    secenekler: [
      {
        metin: "Highlight your unquestioning obedience, your discipline.",
        basariliSonuc: {
          mesaj: "The board praised your discipline and reliability; your name was added to the promotion list.",
          detay: "Institutions generally reward obedience.",
        },
        basarisizSonuc: {
          mesaj: "One of the board criticized you as 'a soldier who follows orders without thinking'; the exam didn't go as you hoped.",
          detay: "Sometimes even obedience gets criticized.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_isci_grev_bastirma: {
    baslik: "In Front of the Factory",
    metin:
      "At a factory gate, workers are shouting that their wages are late. Your superiors don't want the gate to stay open or production to stop; they order you to hold firm.",
    secenekler: [
      {
        metin: "Hold the gate firmly, let no one through.",
        basariliSonuc: {
          mesaj: "You held the factory gate, production didn't stop; the owner is pleased but the workers curse your name.",
          detay: "The order was carried out — but for whom?",
        },
        basarisizSonuc: {
          mesaj: "The crowd forced the gate, a scuffle broke out; you couldn't finish your duty, and your superiors were disappointed.",
          detay: "Some gates don't hold against the crowd's fury.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_vicdan_agirligi: {
    baslik: "The Weight of Conscience",
    metin:
      "Years of orders you carried out without ever questioning them have started stealing your sleep at night. {dost} wants to talk about this with you.",
    secenekler: [
      {
        metin: "Suppress your feelings, focus on duty.",
        basariliSonuc: {
          mesaj: "You pushed your feelings aside and returned to duty; but the emptiness inside you keeps growing.",
          detay: "Suppressed feelings don't disappear, they just wait.",
        },
        basarisizSonuc: {
          mesaj: "The memories you tried to suppress seized you at night; you woke up sleepless and exhausted.",
          detay: "Some burdens grow heavier the more you suppress them.",
        },
      },
      {
        metin: "Tell {dost} the burden you've carried for years.",
        basariliSonuc: {
          mesaj: "{dost} listened to you to the end; for the first time in years, you set down a part of the weight on your shoulders.",
          detay: "A shared burden sometimes grows lighter.",
        },
        basarisizSonuc: {
          mesaj: "{dost} was disturbed by what you told them, a coldness grew between you; word spread through the barracks that you were called 'weak'.",
          detay: "Not every opening up is met with understanding.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_kurmay_teklifi: {
    baslik: "A Staff Offer",
    metin:
      "A career of unquestioning obedience for years has brought you to the general staff today. A young officer asks how you rose so high.",
    secenekler: [
      {
        metin: "Tell it with pride: obedience and discipline.",
        basariliSonuc: {
          mesaj: "The young officer noted your words; and you, once more, asked yourself the question you never asked: 'Was it worth it?'",
          detay: "Some peaks are climbed quietly, without ever asking.",
        },
        basarisizSonuc: {
          mesaj: "Your words impressed the young officer but rang hollow to your own ears; a question you'd suppressed for years knocked on the door again.",
          detay: "Victory sometimes finds no echo within.",
        },
      },
    ],
  },

  // ══════════════════════ REFORMIST (justice, a humane system) ══════════════════════
  sd_asker_yol_reformcu_kislada_kosullar: {
    baslik: "Barracks Conditions",
    metin:
      "The bunkrooms where the soldiers sleep are damp, the food is stale. You're thinking of petitioning high command to have the conditions improved.",
    secenekler: [
      {
        metin: "Write the petition, gather signatures, submit it to high command.",
        basariliSonuc: {
          mesaj: "Your petition was taken into account, a few improvements came to the bunkrooms; the soldiers are grateful.",
          detay: "A small piece of paper sometimes makes a big difference.",
        },
        basarisizSonuc: {
          mesaj: "Your petition was read as 'indiscipline', you got a harsh warning; but the soldiers know you stood by them.",
          detay: "Doing the right thing sometimes costs you personally.",
        },
      },
      {
        metin: "Stay silent, mind your own business.",
        basariliSonuc: {
          mesaj: "You stayed silent, no trouble came your way; but the moaning coughs in the bunkrooms never left your ears.",
          detay: "Some silences are heavy.",
        },
        basarisizSonuc: {
          mesaj: "While your silence continued a soldier fell ill and took to his bed; you felt guilty.",
          detay: "Looking away has a price too.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_yolsuzluk_ihbari: {
    baslik: "A Corruption Report",
    metin:
      "You found evidence that a quartermaster officer has been pocketing the soldiers' ration money. Reporting it could put your career at risk.",
    secenekler: [
      {
        metin: "Pass the evidence on to high command.",
        basariliSonuc: {
          mesaj: "The officer was relieved of duty, the soldiers got their rations back; but the officer's friends never forgot you.",
          detay: "Justice sometimes breeds new enmities.",
        },
        basarisizSonuc: {
          mesaj: "Your report was covered up, and worse, you got branded 'a troublemaker'; you had a few bad nights.",
          detay: "Some truths get lost inside the system.",
        },
      },
      {
        metin: "Stay silent for now, keep the evidence.",
        basariliSonuc: {
          mesaj: "You kept the evidence, waiting for the right moment; but you feel a little more uneasy every day.",
          detay: "Patience is sometimes a burden.",
        },
        basarisizSonuc: {
          mesaj: "While you waited, another soldier fell sick from hunger; he paid the price of your silence in your place.",
          detay: "Delayed justice sometimes never arrives.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_divani_harp: {
    baslik: "Court-Martial",
    metin:
      "You've been brought before a court-martial for openly refusing an order. How you present your defense will decide your career.",
    secenekler: [
      {
        metin: "Openly defend your reasons of conscience.",
        basariliSonuc: {
          mesaj: "Your defense moved the board; you were acquitted, some officers even secretly congratulated you.",
          detay: "A courageous defense sometimes turns even a court around.",
        },
        basarisizSonuc: {
          mesaj: "The court found you guilty, your rank was demoted one grade; still, you stood behind your conscience.",
          detay: "Some prices are heavy but bring no regret.",
        },
      },
      {
        metin: "Show remorse, offer a mitigating reason.",
        basariliSonuc: {
          mesaj: "Your remorse resulted in a lighter sentence; but inside, you're angry at yourself.",
          detay: "Some compromises don't ease you, only delay things.",
        },
        basarisizSonuc: {
          mesaj: "Your remorse wasn't found convincing, and looking insincere got you an even heavier sentence.",
          detay: "A half-hearted stance sometimes yields the worst of both outcomes.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_gazeteci_ittifaki: {
    baslik: "The Journalist's Offer",
    metin:
      "A reformist newspaper wants you to be an anonymous source to write about the poor conditions in the army. Giving them information is risky but could be effective.",
    secenekler: [
      {
        metin: "Give the information, become the anonymous source.",
        basariliSonuc: {
          mesaj: "The series of articles caused a great stir; small improvements began inside the army, your identity stayed hidden.",
          detay: "Sometimes a pen is mightier than a sword.",
        },
        basarisizSonuc: {
          mesaj: "It was found out that you were the source; a disciplinary investigation was opened, but what you wrote still made headlines.",
          detay: "Telling the truth came at a price, but it wasn't wasted.",
        },
      },
      {
        metin: "Decline the offer, try to progress through official channels.",
        basariliSonuc: {
          mesaj: "You went through the official petition route; you're moving slowly but soundly, without putting anyone at risk.",
          detay: "Some roads are slow but safe.",
        },
        basarisizSonuc: {
          mesaj: "The official channel stalled you, nothing changed; you felt you'd missed an opportunity.",
          detay: "Sometimes the safe road leads nowhere.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_siyasetci_destegi: {
    baslik: "A Reformist Ally",
    metin:
      "A young politician in Parliament who champions army reform wants to meet with you. Allying with them could make your voice louder, but it draws you into politics.",
    secenekler: [
      {
        metin: "Forge an alliance, give them information and support.",
        basariliSonuc: {
          mesaj: "The alliance you built with the politician found an echo on the parliamentary floor; some senior officers no longer want you around.",
          detay: "Change sometimes comes from outside the barracks.",
        },
        basarisizSonuc: {
          mesaj: "Your alliance was criticized inside the army as 'meddling in politics'; a few doors closed on you.",
          detay: "Stepping into politics is sometimes a hard step to take back.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_genc_asker_mentor: {
    baslik: "Guiding a Young Soldier",
    metin:
      "A new recruit tells you about the same dilemma you once faced: he's asking what he should do about a superior's unjust order.",
    secenekler: [
      {
        metin: "Advise him to listen to his conscience.",
        basariliSonuc: {
          mesaj: "The young soldier took your advice; years from now, he too will be remembered as a just soldier.",
          detay: "Some advice lives on for generations.",
        },
        basarisizSonuc: {
          mesaj: "The young soldier followed your advice but got into serious trouble; you felt responsible.",
          detay: "Even well-meaning advice can bring heavy consequences at the wrong time.",
        },
      },
      {
        metin: "Tell him to survive first, be an idealist later.",
        basariliSonuc: {
          mesaj: "The young soldier understood your advice; but you felt you were compromising your own principles.",
          detay: "Advice that sounds wise sometimes cuts you inside.",
        },
        basarisizSonuc: {
          mesaj: "The young soldier read your advice as hypocrisy, his respect for you diminished.",
          detay: "When your words contradict your life, no one believes you.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_kariyer_durgunlugu: {
    baslik: "Hitting a Wall",
    metin:
      "Your name hasn't appeared on the promotion list for years; your 'troublesome' label is holding you back. Younger, more obedient officers are passing you by.",
    secenekler: [
      {
        metin: "Keep going without compromising your principles.",
        basariliSonuc: {
          mesaj: "The promotion didn't come, but you earned a quiet respect among the soldiers and NCOs.",
          detay: "Some values aren't measured in rank.",
        },
        basarisizSonuc: {
          mesaj: "You were passed over from the list once again; the feeling of burnout inside you grew.",
          detay: "Stagnation is a weight that grows heavier over time.",
        },
      },
      {
        metin: "Try a soft compromise with high command.",
        basariliSonuc: {
          mesaj: "A small compromise reopened your path to promotion; but looking in the mirror, you miss your old self.",
          detay: "Some progress comes with a small loss.",
        },
        basarisizSonuc: {
          mesaj: "Your attempt at compromise both damaged your principles and produced no result.",
          detay: "A half-compromise is sometimes worse than no compromise at all.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_hastane_kosullari: {
    baslik: "Field Hospital",
    metin:
      "The field hospital where wounded soldiers are treated is filthy, medicine is scarce. The head physician is at his wit's end; he asks if you can do whatever it takes.",
    secenekler: [
      {
        metin: "Contribute from your own salary for medicine and supplies.",
        basariliSonuc: {
          mesaj: "The supplies you bought saved several soldiers' lives; the head physician is grateful to you.",
          detay: "Some expenses are measured in lives.",
        },
        basarisizSonuc: {
          mesaj: "The supplies you bought weren't enough, a soldier was lost; the money you spent didn't come back either.",
          detay: "Good intentions are sometimes not enough.",
        },
      },
      {
        metin: "Submit a formal improvement report to high command.",
        basariliSonuc: {
          mesaj: "Your report was taken into account, new resources were allocated to the hospital; a lasting improvement began.",
          detay: "Some battles are won on paper.",
        },
        basarisizSonuc: {
          mesaj: "Your report got lost in the bureaucracy; the conditions never changed.",
          detay: "Sometimes papers stay just papers.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_ceza_sistemi: {
    baslik: "The Flogging Sentence",
    metin:
      "A soldier was ordered flogged for a minor disciplinary breach. You think this punishment is disproportionate.",
    secenekler: [
      {
        metin: "Plead with the commander to have the sentence lightened.",
        basariliSonuc: {
          mesaj: "The commander took your plea into account, the sentence was lightened; among the soldiers your name started to be called 'just'.",
          detay: "Some words spare a back from the whip.",
        },
        basarisizSonuc: {
          mesaj: "The commander read your plea as 'a challenge to authority'; the sentence was carried out unchanged, and you were scolded too.",
          detay: "Mercy is sometimes seen as weakness in the eyes of authority.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_sessiz_saygi: {
    baslik: "A Quiet Respect",
    metin:
      "Though your rank has stayed put for years, the soldiers and NCOs in the barracks quietly look up to you. A retired general asks you for counsel.",
    secenekler: [
      {
        metin: "Share the experience you've gathered over the years.",
        basariliSonuc: {
          mesaj: "The general listened to your words carefully; your quiet stance has influenced more people than you thought.",
          detay: "Some legacies carry no rank.",
        },
        basarisizSonuc: {
          mesaj: "The general listened politely but didn't put much weight on it; still, there's a peace inside you.",
          detay: "Not every legacy is noticed right away.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_son_meydan_okuma: {
    baslik: "The Last Stand",
    metin:
      "As your career draws to its end, a chance has come up to lead a major reform proposal inside the army. It's risky but it could be the crowning work of your life.",
    secenekler: [
      {
        metin: "Lead the proposal with all your strength.",
        basariliSonuc: {
          mesaj: "Your reform proposal was accepted; thanks to you, one corner of the army became a little more humane.",
          detay: "Some careers find their meaning in a single step.",
        },
        basarisizSonuc: {
          mesaj: "The proposal was rejected, and worse, you were called 'a disturber of the peace'; still, you know you tried to do the right thing.",
          detay: "Even a lost battle can be honorable.",
        },
      },
      {
        metin: "Quietly prepare for retirement, give up the struggle.",
        basariliSonuc: {
          mesaj: "You quietly handed over your duty list; peaceful, but carrying a small regret inside.",
          detay: "Some peace comes with an unfinished struggle.",
        },
        basarisizSonuc: {
          mesaj: "Your decision to step back disappointed some old friends.",
          detay: "Giving up doesn't always please anyone.",
        },
      },
    ],
  },

  // ══════════════════════════ CRUEL (harshness, oppression) ══════════════════════════
  sd_asker_yol_zalim_somurge_seferi: {
    baslik: "Colonial Campaign",
    metin:
      "Your battalion has been sent to a distant colonial territory to 'maintain order'. The local population is resisting; your commanders approve the harshest of methods.",
    secenekler: [
      {
        metin: "Carry out a ruthless suppression campaign.",
        basariliSonuc: {
          mesaj: "The resistance was broken quickly, plunder and praise awaited you; but the ruin you left behind was heavy.",
          detay: "The price of victory is sometimes quietly left behind.",
        },
        basarisizSonuc: {
          mesaj: "The resistance was fiercer than expected; your harsh method didn't go unanswered, you were badly wounded.",
          detay: "Brutality doesn't always pay off.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_idam_emri: {
    baslik: "Execution Order",
    metin:
      "It was ordered that a few captured rebels be executed 'to set an example'. Carrying out the order is expected of you.",
    secenekler: [
      {
        metin: "Carry out the order without hesitation.",
        basariliSonuc: {
          mesaj: "The execution took place; the region fell silent, but your nights are no longer what they used to be.",
          detay: "Fear sometimes creates silence, not peace.",
        },
        basarisizSonuc: {
          mesaj: "The execution scene unsettled even your own battalion; a few soldiers drew away from you.",
          detay: "Cruelty sometimes unnerves even your own side.",
        },
      },
      {
        metin: "Turn the execution into a spectacle, gather the people, teach a lesson.",
        basariliSonuc: {
          mesaj: "The spectacle had the intended effect; the local people never raised their heads again, your superiors rewarded you.",
          detay: "Some 'successes' don't deserve looking back on.",
        },
        basarisizSonuc: {
          mesaj: "The spectacle backfired; the people grew even more furious, the resistance grew.",
          detay: "Putting cruelty on display sometimes breeds a greater fury.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_koy_yakma: {
    baslik: "A Model Village",
    metin:
      "You've been assigned to burn down a village suspected of harboring rebels, 'to teach a lesson'.",
    secenekler: [
      {
        metin: "Burn the village to the ground, spare no one.",
        basariliSonuc: {
          mesaj: "The village turned to ash; the resistance in the area quieted down for a while, high command found you 'effective'.",
          detay: "Some victories don't deserve to be celebrated.",
        },
        basarisizSonuc: {
          mesaj: "The villagers resisted at the last moment, the fight grew bigger; you took losses, but the village was destroyed all the same.",
          detay: "Destruction sometimes claims more lives than planned.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_ast_reddi: {
    baslik: "A Subordinate's Defiance",
    metin:
      "A young soldier openly refuses a cruel order you gave; the other soldiers are watching. This is a test of authority.",
    secenekler: [
      {
        metin: "Crush the soldier's defiance with a heavy punishment.",
        basariliSonuc: {
          mesaj: "The punishment was harsh, no one objected again; but now no one meets your eyes either.",
          detay: "When obedience is bought with fear, love disappears.",
        },
        basarisizSonuc: {
          mesaj: "The punishment created great anger in the battalion; a few soldiers secretly complained to high command.",
          detay: "Some crackdowns backfire.",
        },
      },
      {
        metin: "Listen to the soldier's reasons, lighten the punishment.",
        basariliSonuc: {
          mesaj: "Your mercy made you more human in some soldiers' eyes; but some NCOs saw it as weakness.",
          detay: "Even a small mercy inside cruelty gets noticed.",
        },
        basarisizSonuc: {
          mesaj: "Your softness was read as 'the collapse of authority'; discipline loosened, high command scolded you.",
          detay: "Sometimes mercy is misunderstood.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_savas_muhabiri: {
    baslik: "War Correspondent",
    metin:
      "A foreign newspaper's correspondent is investigating the harshness of your methods. If what he writes gets out, it could cost you your career.",
    secenekler: [
      {
        metin: "Have the correspondent detained, try to silence him.",
        basariliSonuc: {
          mesaj: "The correspondent was deported, the story didn't run; but it turned into a quiet rumor about you.",
          detay: "Silenced voices sometimes rise even higher.",
        },
        basarisizSonuc: {
          mesaj: "The correspondent exposed your methods in the international press; your name is now known as 'the cruel commander'.",
          detay: "A suppression attempt sometimes creates the exact opposite effect.",
        },
      },
      {
        metin: "Defend your harsh but 'necessary' methods to him, offer your own narrative.",
        basariliSonuc: {
          mesaj: "The correspondent wrote in his story that you were 'a commander who makes hard decisions'; you saved your image.",
          detay: "Sometimes controlling the narrative doesn't change the truth, but it changes the perception.",
        },
        basarisizSonuc: {
          mesaj: "The correspondent saw through the contradictions behind your words; his story came out even harsher.",
          detay: "Lies generally collapse under their own weight.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_iskence_sorgusu: {
    baslik: "A Harsh Interrogation",
    metin:
      "A captured rebel leader isn't talking. Your superiors order you to do whatever it takes to get information.",
    secenekler: [
      {
        metin: "Continue the interrogation with harsh methods.",
        basariliSonuc: {
          mesaj: "The leader finally talked; an attack was prevented thanks to the information, but the method changed you deeply.",
          detay: "Some information is bought at a very high price.",
        },
        basarisizSonuc: {
          mesaj: "The leader died without saying a word; you gained nothing, only a corpse remained in your hands.",
          detay: "Cruelty sometimes ends without gaining anything at all.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_odul_toreni: {
    baslik: "Ceremony of Merit",
    metin:
      "You've been known for years as a commander who 'gets results'; high command wants to reward you with a grand ceremony.",
    secenekler: [
      {
        metin: "Accept the award, defend your past.",
        basariliSonuc: {
          mesaj: "The medal was pinned to your chest; but as you left the hall, the shadow of the faces you left behind walked with you.",
          detay: "Some awards leave a stain on the winner's conscience.",
        },
        basarisizSonuc: {
          mesaj: "A journalist's question during the ceremony cornered you; the award was overshadowed.",
          detay: "Some pasts aren't covered up by ceremonies.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_yerli_direnis: {
    baslik: "Counterattack",
    metin:
      "In the region you've kept under oppression for years, the people have organized and risen up together. A counterattack is expected.",
    secenekler: [
      {
        metin: "Crush the attack ruthlessly.",
        basariliSonuc: {
          mesaj: "The resistance was crushed but it came at a high cost; your battalion took heavy losses, the region fell silent again.",
          detay: "The calm bought with oppression is usually temporary.",
        },
        basarisizSonuc: {
          mesaj: "The resistance routed your battalion; you fell back gravely wounded, and high command held you responsible.",
          detay: "Order built on cruelty comes back around one day.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_rehine_tehdidi: {
    baslik: "Hostage Threat",
    metin:
      "Your superiors suggest taking a rebel leader's family hostage to make him surrender. The brutality of the method makes even you hesitate — but only for a moment.",
    secenekler: [
      {
        metin: "Take the family hostage, wait for him to surrender.",
        basariliSonuc: {
          mesaj: "The rebel leader surrendered; the region calmed down, but what you did weighed heavily even on you.",
          detay: "Some victories don't deserve to be celebrated.",
        },
        basarisizSonuc: {
          mesaj: "Instead of surrendering, the leader responded even more harshly; the hostage attempt set off an uprising in the region.",
          detay: "Cruelty sometimes comes back as an unexpected fury.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_mahkeme_tehdidi: {
    baslik: "A Day of Reckoning",
    metin:
      "Your harsh methods from years ago have entered the agenda of an international inquiry commission. Witnesses are testifying.",
    secenekler: [
      {
        metin: "Hire lawyers, build a strong defense.",
        basariliSonuc: {
          mesaj: "Your defense neutralized the inquiry; your name looks cleared, but everyone knows the truth.",
          detay: "Justice sometimes stays in money's shadow.",
        },
        basarisizSonuc: {
          mesaj: "You were found guilty despite your defense; your rank was demoted, your name went down in the historical record as a black mark.",
          detay: "Some reckonings are paid sooner or later.",
        },
      },
      {
        metin: "Admit your guilt, apologize to the public.",
        basariliSonuc: {
          mesaj: "Your apology unexpectedly earned respect; your career is over, but for the first time your conscience is eased.",
          detay: "Some apologies come late but still put something right.",
        },
        basarisizSonuc: {
          mesaj: "Your apology was read as 'fake remorse'; neither your career nor your reputation was saved.",
          detay: "Some pasts aren't erased with an apology.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_yasli_gunler: {
    baslik: "Those Left Behind",
    metin:
      "In your old age, the ghosts of the villages you once burned and the orders you once gave haunt your mind. {cocuk} asks you why you've grown so quiet.",
    secenekler: [
      {
        metin: "Hide your past, say nothing.",
        basariliSonuc: {
          mesaj: "You stayed silent; {cocuk} stopped asking, but the distance between you grew.",
          detay: "Some silences build a wall over the years.",
        },
        basarisizSonuc: {
          mesaj: "A piece of your past reached {cocuk} from the outside; the way they looked at you was never the same again.",
          detay: "Hidden truths eventually come out one way or another.",
        },
      },
      {
        metin: "Tell them everything you did, with remorse, exactly as it was.",
        basariliSonuc: {
          mesaj: "{cocuk} was shocked, but didn't leave you; the stone inside you eased a little for the first time.",
          detay: "Some confessions, even late, mend a bond.",
        },
        basarisizSonuc: {
          mesaj: "{cocuk} was horrified by what you told them; an unbridgeable distance came between you.",
          detay: "Some pasts, disclosed too late, only deepen a wound beyond repair.",
        },
      },
    ],
  },

  // ══════════════════════════ DESERTER (escape, a hidden life) ══════════════════════════
  sd_asker_yol_firari_jandarma_takibi: {
    baslik: "Gendarme Pursuit",
    metin:
      "The military gendarmerie is combing the small towns of {bolge} one by one, searching for deserters. A patrol is closing in on you.",
    secenekler: [
      {
        metin: "Leave the town, hide out in the countryside.",
        basariliSonuc: {
          mesaj: "You fled to the countryside, the patrol couldn't find you; but you went hungry and exhausted for days.",
          detay: "Freedom sometimes means hiding in barren land.",
        },
        basarisizSonuc: {
          mesaj: "The patrol caught you in the countryside; you were beaten and taken to a military prison.",
          detay: "Escape doesn't always succeed.",
        },
      },
      {
        metin: "Act like an ordinary peasant and look the patrol in the eye.",
        basariliSonuc: {
          mesaj: "The patrol took you for a farmer and passed on by; your heart is still pounding, but you're free.",
          detay: "Sometimes the boldest plan works best.",
        },
        basarisizSonuc: {
          mesaj: "The gendarmes grew suspicious, asked for your papers; your lies didn't hold, and they took you into custody.",
          detay: "Some gambles are lost.",
        },
      },
    ],
  },
  sd_asker_yol_firari_sahte_kimlik: {
    baslik: "A Forged Identity",
    metin:
      "A forger offers to make you a new identity and a made-up past. It's expensive, but it could get you entirely off the military records.",
    secenekler: [
      {
        metin: "Pay the money, get the new identity.",
        basariliSonuc: {
          mesaj: "Your new identity papers look flawless; you can now live under a different name.",
          detay: "Some lives are rewritten with a single piece of paper.",
        },
        basarisizSonuc: {
          mesaj: "The papers turned out shoddy, the forgery was caught at the first check; you lost both your money and your trust.",
          detay: "Cheap forgery sometimes turns into a bigger trap.",
        },
      },
      {
        metin: "Don't trust the forger, fend for yourself.",
        basariliSonuc: {
          mesaj: "You stayed away from the forger, you're getting by hiding your real name; risky but free of charge.",
          detay: "Sometimes distrust is the best protection.",
        },
        basarisizSonuc: {
          mesaj: "Wandering without an identity kept you constantly suspect; you were questioned at an inn and barely got away.",
          detay: "A life without papers carries a danger at every door.",
        },
      },
    ],
  },
  sd_asker_yol_firari_eski_yoldas: {
    baslik: "An Old Comrade",
    metin:
      "At a marketplace, a soldier from your old battalion recognized you. He could report you, or he could stay silent; the choice seems to be his.",
    secenekler: [
      {
        metin: "Tell him your story, trust in his mercy.",
        basariliSonuc: {
          mesaj: "Your old comrade listened to your story, promised he wouldn't touch you; he even left you some supplies.",
          detay: "Some bonds are stronger than a uniform.",
        },
        basarisizSonuc: {
          mesaj: "Your old comrade didn't hesitate to report you; the gendarmerie found you quickly.",
          detay: "The past sometimes doesn't forgive.",
        },
      },
      {
        metin: "Ignore him, disappear right away.",
        basariliSonuc: {
          mesaj: "You melted into the crowd and vanished from sight; but ignoring an old friend stung inside.",
          detay: "Survival sometimes means sacrificing a friendship.",
        },
        basarisizSonuc: {
          mesaj: "You drew attention while fleeing, a few people gave chase; you barely got away.",
          detay: "A panicked escape sometimes draws even more attention.",
        },
      },
    ],
  },
  sd_asker_yol_firari_tehlikeli_is: {
    baslik: "A Dangerous Job",
    metin:
      "You're looking for work where no one asks questions, just to fill your stomach; a harbor master offers you a dangerous but well-paying cargo job.",
    secenekler: [
      {
        metin: "Take the job, accept the risk.",
        basariliSonuc: {
          mesaj: "You carried the heavy loads, your back ached but your stomach was full; the employer's trust in you grew.",
          detay: "Some bread is earned by lifting heavy things.",
        },
        basarisizSonuc: {
          mesaj: "A heavy crate fell on your foot; you left the job with half pay and a crippled leg.",
          detay: "Risky jobs don't always pay off as promised.",
        },
      },
      {
        metin: "Look for smaller, safer, lower-paying jobs.",
        basariliSonuc: {
          mesaj: "You got by with small jobs; a modest but safe income.",
          detay: "Sometimes little but safe is preferable.",
        },
        basarisizSonuc: {
          mesaj: "Even the small jobs you found grew scarce; the days passed hard.",
          detay: "In a hidden life, even the smallest job is sometimes hard to find.",
        },
      },
    ],
  },
  sd_asker_yol_firari_teslim_olma_ani: {
    baslik: "The Moment of Surrender",
    metin:
      "Years of living as a fugitive have worn you out. You heard about an amnesty declaration: those who surrender voluntarily are promised a lighter sentence. Risky, but it might save your life.",
    secenekler: [
      {
        metin: "Surrender voluntarily, trust in the amnesty.",
        basariliSonuc: {
          mesaj: "The amnesty applied to your case too; after a brief interrogation you were set free, and for the first time in years you took a breath of relief.",
          detay: "Sometimes surrender is its own form of courage.",
        },
        basarisizSonuc: {
          mesaj: "The amnesty didn't cover your case; the moment you surrendered you were arrested, a harsh sentence awaits you.",
          detay: "Some gambles are lost bitterly.",
        },
      },
      {
        metin: "Don't take the risk, continue your fugitive life.",
        basariliSonuc: {
          mesaj: "You didn't trust the amnesty, you kept hiding; your exhaustion grows, but at least you're alive.",
          detay: "A known danger is sometimes preferred over an unknown hope.",
        },
        basarisizSonuc: {
          mesaj: "Your decision to keep running made you even lonelier; the hope inside you slowly faded.",
          detay: "Constant hiding wears away the soul too.",
        },
      },
    ],
  },
  sd_asker_yol_firari_liman_kacagi: {
    baslik: "An Opportunity at the Harbor",
    metin:
      "A merchant ship bound for a distant country is anchored in the harbor. The captain needs hands to row, and doesn't ask for identification.",
    secenekler: [
      {
        metin: "Agree to work aboard in secret, sail out to sea.",
        basariliSonuc: {
          mesaj: "The ship left the country's borders behind; you're now on land the gendarmerie can't reach, but your body is exhausted.",
          detay: "Some freedoms are found upon the waves.",
        },
        basarisizSonuc: {
          mesaj: "A stormy voyage made you ill, the ship turned back to port; you're still on the same soil.",
          detay: "The sea sometimes turns back even an escape.",
        },
      },
    ],
  },
  sd_asker_yol_firari_sinir_gecisi: {
    baslik: "Crossing the Border",
    metin:
      "Crossing into a neighboring country could get you entirely free of the military records. But the border posts are tightly guarded.",
    secenekler: [
      {
        metin: "Cross the border at night, through the mountain trails.",
        basariliSonuc: {
          mesaj: "After a grueling night's walk you crossed the border; now the gendarmerie of your old land can't reach you.",
          detay: "Some borders split a life in two.",
        },
        basarisizSonuc: {
          mesaj: "A border patrol caught you in the dark; you were taken into custody on a charge of illegal border crossing.",
          detay: "The dark isn't always a good cover.",
        },
      },
    ],
  },
  sd_asker_yol_firari_gizli_aile: {
    baslik: "A Hidden Life",
    metin:
      "You've built a quiet life for years in a small town under a hidden identity. {es} has finally grown curious about your past; do you tell them the truth, or stay silent?",
    secenekler: [
      {
        metin: "Tell {es} the truth.",
        basariliSonuc: {
          mesaj: "{es} was surprised to hear the truth but decided to stay by your side; your relationship grew even deeper.",
          detay: "Some secrets strengthen a bond when shared.",
        },
        basarisizSonuc: {
          mesaj: "{es} couldn't handle the truth, their trust was shaken; a deep coldness formed between you.",
          detay: "Some truths shake a relationship when spoken.",
        },
      },
      {
        metin: "Stay silent, hide your past forever.",
        basariliSonuc: {
          mesaj: "You stayed silent; {es} gave up asking, but a small distance always remained inside.",
          detay: "A hidden past sometimes quietly builds a wall.",
        },
        basarisizSonuc: {
          mesaj: "{es} sensed there was something behind your silence; their trust was shaken.",
          detay: "Silence sometimes raises suspicion all on its own.",
        },
      },
    ],
  },
  sd_asker_yol_firari_para_sikintisi: {
    baslik: "Money Trouble",
    metin:
      "Finding work in a life without an identity is hard; the last coins in your pocket are running out too. A shady gambling house owner offers you a job as a 'trusted courier'.",
    secenekler: [
      {
        metin: "Accept the courier offer, walk the edge of the law.",
        basariliSonuc: {
          mesaj: "You completed the job without a hitch, your pockets filled up; but now you're on the radar not just of the gendarmerie, but of dark circles too.",
          detay: "Some money doesn't pass through clean hands.",
        },
        basarisizSonuc: {
          mesaj: "You got caught up in a clash during a delivery; you lost the money, and you were wounded too.",
          detay: "Dark dealings rarely turn out safe.",
        },
      },
      {
        metin: "Decline the offer, try to get by on honest work.",
        basariliSonuc: {
          mesaj: "You turned down the offer; you had hard days, but at least you owe nothing to anyone.",
          detay: "Some hardships are borne with honor.",
        },
        basarisizSonuc: {
          mesaj: "Hunger weakened you badly, you lay sick for a while; no one helped.",
          detay: "Honesty doesn't always fill your stomach.",
        },
      },
    ],
  },
  sd_asker_yol_firari_yakalanma_tehlikesi: {
    baslik: "Nearly Caught",
    metin:
      "An informer reported you to the gendarmerie. You have a window of a few hours before they show up at your door.",
    secenekler: [
      {
        metin: "Drop everything, flee to another city right away.",
        basariliSonuc: {
          mesaj: "You fled just in time; you left behind the small life you'd built, but you're free.",
          detay: "Sometimes surviving means starting everything from scratch.",
        },
        basarisizSonuc: {
          mesaj: "Before you could get away the gendarmerie showed up at your door; your years-long fugitive life came to an end.",
          detay: "Some escapes are lost by a single minute.",
        },
      },
      {
        metin: "Stay and try to talk your way through it with lies.",
        basariliSonuc: {
          mesaj: "Your lies worked, the gendarmerie let you be and left; you kept the life you'd built.",
          detay: "Sometimes composure is the best shield.",
        },
        basarisizSonuc: {
          mesaj: "Your lies didn't hold, the gendarmerie arrested you right there; your fugitive life came to an end.",
          detay: "Some gambles are lost bitterly.",
        },
      },
    ],
  },
  sd_asker_yol_firari_yeni_hayat: {
    baslik: "A New Life",
    metin:
      "Years have passed, your fugitive life has become a habit. Now you have a chance to build a quiet life with a small craft trade — but your past still seems to be on your heels.",
    secenekler: [
      {
        metin: "Open a small shop, immerse yourself entirely in a civilian life.",
        basariliSonuc: {
          mesaj: "Your shop provides a small but steady income; for the first time in years, you're truly at peace.",
          detay: "Some lives can be rebuilt, even late.",
        },
        basarisizSonuc: {
          mesaj: "The shop didn't go well, you piled up debt; your hope for a peaceful old age has been postponed.",
          detay: "Some new beginnings don't hold on the first try.",
        },
      },
      {
        metin: "Face someone tracking your past one last time.",
        basariliSonuc: {
          mesaj: "The confrontation went more calmly than you expected; your old hunter promised he would leave you be for good.",
          detay: "Some pasts only truly close when faced head-on.",
        },
        basarisizSonuc: {
          mesaj: "The confrontation ended badly; after all these years, you were taken into custody again, an old man now.",
          detay: "Some pasts never learn to forgive.",
        },
      },
    ],
  },
};
