import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiAskerYollari.ts — İngilizce çevirileri (45 olay). */
export const OLAYLAR_SANAYI_ASKER_YOLLARI_EN: Record<string, OlayCeviri> = {
  sd_asker_yol_ilk_gorev: {
    baslik: "The First Duty",
    metin:
      "The battalion 'keeps order' in a striking mining town. Your captain may order fire on starving workers.",
    secenekler: [
      {
        metin: "Obey the order without question.",
        basariliSonuc: {
          mesaj: "The crowd scattered, no blood spilled; the captain trusts you.",
          detay: "Conscience gets used to obedience, or never does.",
        },
        basarisizSonuc: {
          mesaj: "A scuffle broke out; you can't forget a worker's frightened eyes.",
          detay: "Obedience drags you into scenes you never wanted.",
        },
      },
      {
        metin: "Defy the captain.",
        basariliSonuc: {
          mesaj: "No one fired, but you're now 'the troublesome soldier'.",
          detay: "Objecting saves a life and shadows a career.",
        },
        basarisizSonuc: {
          mesaj: "Unheard and threatened with arrest; you didn't back down.",
          detay: "Some resistance is lost, never forgotten.",
        },
      },
      {
        metin: "Disperse the crowd ruthlessly.",
        basariliSonuc: {
          mesaj: "The crowd fled at once; command marked you 'decisive'.",
          detay: "Some victories haunt you later.",
        },
        basarisizSonuc: {
          mesaj: "Your harshness fed the fury; you were wounded in the scuffle.",
          detay: "Brutality can breed greater fury.",
        },
      },
      {
        metin: "Drop your weapon and flee at night.",
        basariliSonuc: {
          mesaj: "You vanished unnoticed, but fear of capture follows you.",
          detay: "Freedom is sometimes an invisible weight.",
        },
        basarisizSonuc: {
          mesaj: "Sentries caught you; beaten, branded 'deserter' in your file.",
          detay: "Escape can turn into a heavier chain.",
        },
      },
    ],
  },

  // ══════════════════════════ LOYAL (discipline, obedience) ══════════════════════════
  sd_asker_yol_sadik_tatbikat_disiplini: {
    baslik: "Drill Discipline",
    metin:
      "Days of grueling drills with new rifles; soldiers grumble, you follow every order to the letter.",
    secenekler: [
      {
        metin: "Be the model soldier, endure every drill.",
        basariliSonuc: {
          mesaj: "The commander praised you; sergeants made you the example.",
          detay: "Obedience runs straight through the body.",
        },
        basarisizSonuc: {
          mesaj: "Exhausted, you fell mid-drill and heard laughter.",
          detay: "Discipline can cost more than the body.",
        },
      },
      {
        metin: "Coast through like the others.",
        basariliSonuc: {
          mesaj: "You coasted like everyone; no one noticed.",
          detay: "Being ordinary is the safest harbor.",
        },
        basarisizSonuc: {
          mesaj: "The sergeant caught your slacking; you were scolded publicly.",
          detay: "Trying not to stand out, you stood out.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_zor_emir: {
    baslik: "A Hard Order",
    metin:
      "Rations are short; the captain orders you to cut a sick old soldier's share for the young. Your conscience is uneasy.",
    secenekler: [
      {
        metin: "Carry out the order.",
        basariliSonuc: {
          mesaj: "The captain is pleased; you can't forget the sick man's look.",
          detay: "Obedience leaves a silent guilt.",
        },
        basarisizSonuc: {
          mesaj: "Your hand trembled; the others noticed and drew away.",
          detay: "Some orders leave a mark even when obeyed.",
        },
      },
      {
        metin: "Secretly give him part of your own ration.",
        basariliSonuc: {
          mesaj: "The sick man recovered a little; no one noticed.",
          detay: "Quiet kindness is sometimes enough.",
        },
        basarisizSonuc: {
          mesaj: "A sergeant caught you; you were scolded for defying orders.",
          detay: "A small kindness can cost dearly.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_ust_ortme: {
    baslik: "A Superior's Mistake",
    metin:
      "A drunken order from {amir} wrecked a maneuver. An inquiry would end {amir}'s career; you're asked to keep quiet.",
    secenekler: [
      {
        metin: "Stay silent, cover the mistake.",
        basariliSonuc: {
          mesaj: "{amir} is grateful and keeps you close; no inquiry opened.",
          detay: "Loyalty repays quickly.",
        },
        basarisizSonuc: {
          mesaj: "The cover-up was noticed; inspectors listed you as a suspect.",
          detay: "One lie demands another.",
        },
      },
      {
        metin: "Tell the board the truth.",
        basariliSonuc: {
          mesaj: "{amir} was removed; the new commander distrusts you.",
          detay: "Truth breeds new enemies.",
        },
        basarisizSonuc: {
          mesaj: "Not believed, branded 'informer'; you grew lonely in the barracks.",
          detay: "Honesty isn't always repaid.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_egitmen: {
    baslik: "Drill Instructor",
    metin:
      "Your discipline earns you the job of training recruits. What kind of instructor you become is up to you.",
    secenekler: [
      {
        metin: "Be a harsh, uncompromising instructor.",
        basariliSonuc: {
          mesaj: "Recruits feared you, the company turned disciplined; command approved.",
          detay: "Fear is mistaken for discipline.",
        },
        basarisizSonuc: {
          mesaj: "A recruit was injured in a harsh drill; the blame fell on you.",
          detay: "Harshness exacts its price.",
        },
      },
      {
        metin: "Be a patient but firm instructor.",
        basariliSonuc: {
          mesaj: "Recruits learned to trust you; the company is disciplined and loyal.",
          detay: "Respect outlasts fear.",
        },
        basarisizSonuc: {
          mesaj: "Your gentleness was read as weakness; drills slackened, superiors displeased.",
          detay: "Patience is sometimes misread.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_gizli_gorev: {
    baslik: "A Delicate Task",
    metin:
      "Secret courier duty: carry documents proving an officer's bribery to the higher authorities. Trust no one.",
    secenekler: [
      {
        metin: "Complete the task quietly.",
        basariliSonuc: {
          mesaj: "Delivered unseen; high command now trusts you with special missions.",
          detay: "Quiet reliability is valuable capital.",
        },
        basarisizSonuc: {
          mesaj: "Followed on the road, you barely saved the papers; rumors spread.",
          detay: "Secret missions don't always stay secret.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_cephe_itaati: {
    baslik: "Obedience at the Front",
    metin:
      "Under shellfire, the commander orders you to hold the position to the last man. It looks suicidal, but you trust him.",
    secenekler: [
      {
        metin: "Hold the position to the end.",
        basariliSonuc: {
          mesaj: "Position held, enemy thrown back; you're called 'iron discipline'.",
          detay: "Some obedience becomes legend.",
        },
        basarisizSonuc: {
          mesaj: "The position nearly fell; you survived gravely wounded.",
          detay: "Obedience brings you face to face with death.",
        },
      },
      {
        metin: "Quietly persuade a few men to fall back.",
        basariliSonuc: {
          mesaj: "You saved a few young soldiers; no one noticed.",
          detay: "Some disobedience goes unspoken.",
        },
        basarisizSonuc: {
          mesaj: "The commander noticed; punished for 'cowardice'.",
          detay: "A quiet deviation rarely stays quiet.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_asayis_gorevi: {
    baslik: "Order Duty",
    metin:
      "A new strike wave in the city; your battalion is ordered to 'keep the streets under control'. Orders are clear, execution is yours.",
    secenekler: [
      {
        metin: "Follow the orders to the letter, coldly.",
        basariliSonuc: {
          mesaj: "The streets calmed, command is pleased; the people see you as a tool of oppression.",
          detay: "Obedience breeds fear, not love.",
        },
        basarisizSonuc: {
          mesaj: "The crowd refused to disperse; a scuffle broke out and you were wounded.",
          detay: "The streets don't always obey.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_terfi_sinavi: {
    baslik: "Promotion Exam",
    metin:
      "A promotion interview before the staff board. The questions test your loyalty and commitment to the chain of command.",
    secenekler: [
      {
        metin: "Stress your unquestioning obedience.",
        basariliSonuc: {
          mesaj: "The board praised your discipline; your name went on the promotion list.",
          detay: "Institutions reward obedience.",
        },
        basarisizSonuc: {
          mesaj: "A board member called you 'a soldier who obeys without thinking'.",
          detay: "Even obedience gets criticized.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_isci_grev_bastirma: {
    baslik: "In Front of the Factory",
    metin:
      "At a factory gate, workers shout about late wages. Your superiors order you to hold the gate and keep production going.",
    secenekler: [
      {
        metin: "Hold the gate, let no one through.",
        basariliSonuc: {
          mesaj: "You held the gate, production went on; the owner's pleased, workers curse you.",
          detay: "Order obeyed — but for whom?",
        },
        basarisizSonuc: {
          mesaj: "The crowd forced the gate; you failed to hold it and your superiors are disappointed.",
          detay: "Some gates can't withstand fury.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_vicdan_agirligi: {
    baslik: "The Weight of Conscience",
    metin:
      "Orders you obeyed without question for years now steal your sleep. {dost} wants to talk about it.",
    secenekler: [
      {
        metin: "Suppress your feelings, focus on duty.",
        basariliSonuc: {
          mesaj: "You returned to duty; but the emptiness inside keeps growing.",
          detay: "Suppressed feelings don't vanish, they wait.",
        },
        basarisizSonuc: {
          mesaj: "Suppressed memories seized you at night; you woke exhausted.",
          detay: "Some burdens grow heavier when suppressed.",
        },
      },
      {
        metin: "Tell {dost} the burden you carry.",
        basariliSonuc: {
          mesaj: "{dost} listened; for the first time in years your burden eased.",
          detay: "A shared burden grows lighter.",
        },
        basarisizSonuc: {
          mesaj: "{dost} was disturbed, a coldness grew; the barracks call you 'weak'.",
          detay: "Not every confession meets understanding.",
        },
      },
    ],
  },
  sd_asker_yol_sadik_kurmay_teklifi: {
    baslik: "A Staff Offer",
    metin:
      "Years of unquestioning obedience brought you to the general staff. A young officer asks how you rose so high.",
    secenekler: [
      {
        metin: "Tell it proudly: obedience and discipline.",
        basariliSonuc: {
          mesaj: "The officer took notes; you asked yourself: 'Was it worth it?'",
          detay: "Some peaks are climbed in silence.",
        },
        basarisizSonuc: {
          mesaj: "Your words impressed him but rang hollow; the suppressed question returned.",
          detay: "Victory sometimes finds no echo within.",
        },
      },
    ],
  },

  // ══════════════════════ REFORMIST (justice, a humane system) ══════════════════════
  sd_asker_yol_reformcu_kislada_kosullar: {
    baslik: "Barracks Conditions",
    metin:
      "The bunkrooms are damp, the food stale. You consider petitioning high command for better conditions.",
    secenekler: [
      {
        metin: "Write the petition, gather signatures, submit.",
        basariliSonuc: {
          mesaj: "The petition worked, the bunkrooms improved a bit; the men are grateful.",
          detay: "A small paper makes a difference.",
        },
        basarisizSonuc: {
          mesaj: "Read as 'indiscipline', you got a warning; the men know you stood by them.",
          detay: "Doing right can cost you.",
        },
      },
      {
        metin: "Stay silent, mind your business.",
        basariliSonuc: {
          mesaj: "No trouble for you; but the coughing in the bunkrooms haunts you.",
          detay: "Some silences are heavy.",
        },
        basarisizSonuc: {
          mesaj: "While you stayed silent, a soldier fell ill; you felt guilty.",
          detay: "Looking away has a price.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_yolsuzluk_ihbari: {
    baslik: "A Corruption Report",
    metin:
      "You found evidence that a quartermaster is pocketing the men's ration money. Reporting it could risk your career.",
    secenekler: [
      {
        metin: "Pass the evidence to high command.",
        basariliSonuc: {
          mesaj: "The officer was removed, rations restored; his friends never forgot you.",
          detay: "Justice can breed new enmities.",
        },
        basarisizSonuc: {
          mesaj: "The report was buried and you were branded a troublemaker.",
          detay: "Some truths get lost in the system.",
        },
      },
      {
        metin: "Stay silent for now, keep the evidence.",
        basariliSonuc: {
          mesaj: "You kept the evidence, waiting; your unease grows daily.",
          detay: "Patience is sometimes a burden.",
        },
        basarisizSonuc: {
          mesaj: "While you waited another soldier sickened from hunger; he paid for your silence.",
          detay: "Delayed justice sometimes never comes.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_divani_harp: {
    baslik: "Court-Martial",
    metin:
      "You're court-martialed for openly refusing an order. Your defense will decide your career.",
    secenekler: [
      {
        metin: "Openly defend your conscience.",
        basariliSonuc: {
          mesaj: "Your defense moved the court; acquitted, some officers secretly congratulated you.",
          detay: "A brave defense can turn a court.",
        },
        basarisizSonuc: {
          mesaj: "Found guilty, demoted one grade; you stood by your conscience.",
          detay: "Some prices bring no regret.",
        },
      },
      {
        metin: "Show remorse, plead mitigating reasons.",
        basariliSonuc: {
          mesaj: "Your remorse earned a lighter sentence; inside, you're angry at yourself.",
          detay: "Some compromises only delay.",
        },
        basarisizSonuc: {
          mesaj: "Your remorse seemed insincere; the sentence was heavier.",
          detay: "A half-hearted stance yields the worst of both.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_gazeteci_ittifaki: {
    baslik: "The Journalist's Offer",
    metin:
      "A reformist paper wants you as an anonymous source on the army's poor conditions. Risky but effective.",
    secenekler: [
      {
        metin: "Give information, be the anonymous source.",
        basariliSonuc: {
          mesaj: "The series caused a stir and improvements began; your identity stayed hidden.",
          detay: "A pen can be mightier than a sword.",
        },
        basarisizSonuc: {
          mesaj: "You were exposed and investigated, but your writing still made headlines.",
          detay: "Truth cost you, but wasn't wasted.",
        },
      },
      {
        metin: "Decline, go through official channels.",
        basariliSonuc: {
          mesaj: "You took the official route; slow but sound, no one at risk.",
          detay: "Some roads are slow but safe.",
        },
        basarisizSonuc: {
          mesaj: "The official channel stalled; nothing changed, you missed your chance.",
          detay: "The safe road sometimes leads nowhere.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_siyasetci_destegi: {
    baslik: "A Reformist Ally",
    metin:
      "A young politician championing army reform wants an alliance. It would amplify your voice but pull you into politics.",
    secenekler: [
      {
        metin: "Ally with them, give information and support.",
        basariliSonuc: {
          mesaj: "The alliance echoed in parliament; some senior officers now want you gone.",
          detay: "Change sometimes comes from outside the barracks.",
        },
        basarisizSonuc: {
          mesaj: "Your alliance was branded 'meddling in politics'; a few doors closed.",
          detay: "Politics is a hard step to take back.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_genc_asker_mentor: {
    baslik: "Guiding a Young Soldier",
    metin:
      "A new recruit asks what to do about a superior's unjust order — the same dilemma you once faced.",
    secenekler: [
      {
        metin: "Advise him to follow his conscience.",
        basariliSonuc: {
          mesaj: "He took your advice; years on, he'll be remembered as a just soldier.",
          detay: "Some advice lives for generations.",
        },
        basarisizSonuc: {
          mesaj: "He followed your advice but fell into trouble; you felt responsible.",
          detay: "Well-meant advice can weigh heavy at the wrong time.",
        },
      },
      {
        metin: "Tell him to survive first.",
        basariliSonuc: {
          mesaj: "He understood; but you felt you compromised your principles.",
          detay: "Wise-sounding advice cuts inside.",
        },
        basarisizSonuc: {
          mesaj: "He read it as hypocrisy; his respect for you faded.",
          detay: "When words and life clash, no one believes you.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_kariyer_durgunlugu: {
    baslik: "Hitting a Wall",
    metin:
      "Your name has been off the promotion list for years; the 'troublesome' label holds you back. Younger, obedient officers pass you.",
    secenekler: [
      {
        metin: "Keep your principles.",
        basariliSonuc: {
          mesaj: "No promotion, but you earned quiet respect among soldiers and NCOs.",
          detay: "Some values aren't measured in rank.",
        },
        basarisizSonuc: {
          mesaj: "Passed over again; burnout grew.",
          detay: "Stagnation grows heavier with time.",
        },
      },
      {
        metin: "Seek a soft compromise with command.",
        basariliSonuc: {
          mesaj: "Promotion reopened; but in the mirror you miss your old self.",
          detay: "Some progress comes with loss.",
        },
        basarisizSonuc: {
          mesaj: "The compromise damaged your principles and achieved nothing.",
          detay: "A half-compromise is worse than none.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_hastane_kosullari: {
    baslik: "Field Hospital",
    metin:
      "The field hospital is filthy and short of medicine. The head physician, desperate, asks if you can help.",
    secenekler: [
      {
        metin: "Pay for medicine and supplies from your salary.",
        basariliSonuc: {
          mesaj: "The supplies saved several soldiers; the head physician is grateful.",
          detay: "Some expenses are measured in lives.",
        },
        basarisizSonuc: {
          mesaj: "The supplies fell short, a soldier died; your money was wasted.",
          detay: "Good intentions sometimes aren't enough.",
        },
      },
      {
        metin: "Submit a formal improvement report.",
        basariliSonuc: {
          mesaj: "The report worked, resources arrived; lasting improvement began.",
          detay: "Some battles are won on paper.",
        },
        basarisizSonuc: {
          mesaj: "Your report vanished in bureaucracy; nothing changed.",
          detay: "Paper sometimes stays paper.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_ceza_sistemi: {
    baslik: "The Flogging Sentence",
    metin:
      "A soldier is ordered flogged for a minor breach. You find the punishment disproportionate.",
    secenekler: [
      {
        metin: "Ask the commander to lighten the sentence.",
        basariliSonuc: {
          mesaj: "The sentence was lightened; the men began calling you 'just'.",
          detay: "Some words spare a back the whip.",
        },
        basarisizSonuc: {
          mesaj: "Read as defying authority, the sentence stood and you were scolded.",
          detay: "Authority sees mercy as weakness.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_sessiz_saygi: {
    baslik: "A Quiet Respect",
    metin:
      "Though your rank is stuck, soldiers and NCOs quietly look up to you. A retired general asks your counsel.",
    secenekler: [
      {
        metin: "Share your years of experience.",
        basariliSonuc: {
          mesaj: "The general listened closely; your quiet example reached more people than you thought.",
          detay: "Some legacies carry no rank.",
        },
        basarisizSonuc: {
          mesaj: "The general listened politely, unmoved; still, you feel at peace.",
          detay: "Not every legacy is noticed at once.",
        },
      },
    ],
  },
  sd_asker_yol_reformcu_son_meydan_okuma: {
    baslik: "The Last Stand",
    metin:
      "At career's end you can lead a major army reform. Risky, but it could be your life's work.",
    secenekler: [
      {
        metin: "Lead the proposal with all your strength.",
        basariliSonuc: {
          mesaj: "The reform passed; thanks to you, a corner of the army grew more humane.",
          detay: "Some careers find meaning in a single step.",
        },
        basarisizSonuc: {
          mesaj: "Rejected and called 'a disturber of the peace'; yet you tried what was right.",
          detay: "Even a lost battle can be honorable.",
        },
      },
      {
        metin: "Quietly prepare for retirement.",
        basariliSonuc: {
          mesaj: "You quietly handed over your duties; at peace, with a small regret.",
          detay: "Some peace comes with unfinished struggle.",
        },
        basarisizSonuc: {
          mesaj: "Your retreat disappointed some old friends.",
          detay: "Giving up pleases no one.",
        },
      },
    ],
  },

  // ══════════════════════════ CRUEL (harshness, oppression) ══════════════════════════
  sd_asker_yol_zalim_somurge_seferi: {
    baslik: "Colonial Campaign",
    metin:
      "Your battalion is sent to a distant colony to 'maintain order'. The locals resist; your commanders approve the harshest methods.",
    secenekler: [
      {
        metin: "Wage a ruthless suppression campaign.",
        basariliSonuc: {
          mesaj: "Resistance broke, plunder and praise followed; but the ruin left behind was heavy.",
          detay: "Victory's price is quietly left behind.",
        },
        basarisizSonuc: {
          mesaj: "Resistance was fiercer than expected; you were badly wounded.",
          detay: "Brutality doesn't always pay.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_idam_emri: {
    baslik: "Execution Order",
    metin:
      "A few captured rebels are to be executed 'as an example'. You're expected to carry it out.",
    secenekler: [
      {
        metin: "Carry out the order without hesitation.",
        basariliSonuc: {
          mesaj: "The execution was done; the region fell silent, but your nights are changed.",
          detay: "Fear creates silence, not peace.",
        },
        basarisizSonuc: {
          mesaj: "The execution unsettled even your battalion; a few soldiers drew away.",
          detay: "Cruelty unnerves your own side too.",
        },
      },
      {
        metin: "Turn the execution into a public spectacle.",
        basariliSonuc: {
          mesaj: "The people never rose again; your superiors rewarded you.",
          detay: "Some 'successes' aren't worth looking back on.",
        },
        basarisizSonuc: {
          mesaj: "The spectacle backfired; the people grew furious, resistance spread.",
          detay: "Displaying cruelty breeds greater fury.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_koy_yakma: {
    baslik: "A Model Village",
    metin:
      "You're ordered to burn down a village suspected of harboring rebels, 'to teach a lesson'.",
    secenekler: [
      {
        metin: "Burn the village to the ground, spare no one.",
        basariliSonuc: {
          mesaj: "The village turned to ash; resistance quieted, command found you 'effective'.",
          detay: "Some victories don't deserve celebration.",
        },
        basarisizSonuc: {
          mesaj: "Villagers resisted at the last moment; you took losses, but the village fell anyway.",
          detay: "Destruction claims more lives than planned.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_ast_reddi: {
    baslik: "A Subordinate's Defiance",
    metin:
      "A young soldier openly refuses a cruel order of yours as the others watch. A test of authority.",
    secenekler: [
      {
        metin: "Crush the defiance with heavy punishment.",
        basariliSonuc: {
          mesaj: "The punishment was harsh, no one objected; but no one meets your eyes now.",
          detay: "Obedience bought with fear kills love.",
        },
        basarisizSonuc: {
          mesaj: "The punishment stirred anger; a few soldiers secretly complained to command.",
          detay: "Some crackdowns backfire.",
        },
      },
      {
        metin: "Hear his reasons, lighten the punishment.",
        basariliSonuc: {
          mesaj: "Your mercy humanized you to some men; some NCOs saw weakness.",
          detay: "Even small mercy within cruelty is noticed.",
        },
        basarisizSonuc: {
          mesaj: "Your softness read as 'collapse of authority'; discipline slipped, you were scolded.",
          detay: "Mercy is sometimes misunderstood.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_savas_muhabiri: {
    baslik: "War Correspondent",
    metin:
      "A foreign correspondent is probing your harsh methods. If his story runs, it could cost your career.",
    secenekler: [
      {
        metin: "Detain the correspondent and silence him.",
        basariliSonuc: {
          mesaj: "He was deported, no story ran; but whispers about you spread.",
          detay: "Silenced voices rise higher.",
        },
        basarisizSonuc: {
          mesaj: "He exposed your methods abroad; you're now 'the cruel commander'.",
          detay: "Suppression can have the opposite effect.",
        },
      },
      {
        metin: "Defend your harsh but 'necessary' methods.",
        basariliSonuc: {
          mesaj: "He wrote you as 'a commander making hard decisions'; your image is saved.",
          detay: "Controlling the narrative shifts perception.",
        },
        basarisizSonuc: {
          mesaj: "He saw through your contradictions; his story came out harsher.",
          detay: "Lies collapse under their own weight.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_iskence_sorgusu: {
    baslik: "A Harsh Interrogation",
    metin:
      "A captured rebel leader won't talk. Your superiors order you to do whatever it takes.",
    secenekler: [
      {
        metin: "Continue the interrogation harshly.",
        basariliSonuc: {
          mesaj: "He finally talked and an attack was prevented, but the method changed you deeply.",
          detay: "Some information costs dearly.",
        },
        basarisizSonuc: {
          mesaj: "He died without a word; you gained nothing but a corpse.",
          detay: "Cruelty sometimes gains nothing at all.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_odul_toreni: {
    baslik: "Ceremony of Merit",
    metin:
      "Long known as a commander who 'gets results', you're to be honored by high command in a grand ceremony.",
    secenekler: [
      {
        metin: "Accept the award.",
        basariliSonuc: {
          mesaj: "The medal was pinned on; the shadow of the faces you left behind walked out with you.",
          detay: "Some awards stain the winner's conscience.",
        },
        basarisizSonuc: {
          mesaj: "A journalist's question cornered you; the award was overshadowed.",
          detay: "Some pasts aren't covered by ceremonies.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_yerli_direnis: {
    baslik: "Counterattack",
    metin:
      "The people of the region you've oppressed for years have organized and risen. A counterattack is expected.",
    secenekler: [
      {
        metin: "Crush the attack ruthlessly.",
        basariliSonuc: {
          mesaj: "The uprising was crushed at high cost; your battalion took heavy losses.",
          detay: "Calm bought with oppression is temporary.",
        },
        basarisizSonuc: {
          mesaj: "The resistance routed your battalion; you fell back gravely wounded and were blamed.",
          detay: "Order built on cruelty comes back around.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_rehine_tehdidi: {
    baslik: "Hostage Threat",
    metin:
      "Your superiors suggest taking a rebel leader's family hostage to force surrender. Even you hesitate — but only for a moment.",
    secenekler: [
      {
        metin: "Take the family hostage, await surrender.",
        basariliSonuc: {
          mesaj: "The leader surrendered and the region calmed; what you did weighed even on you.",
          detay: "Some victories don't deserve celebration.",
        },
        basarisizSonuc: {
          mesaj: "He didn't surrender but retaliated harder; the hostage attempt set the region ablaze.",
          detay: "Cruelty returns as unexpected fury.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_mahkeme_tehdidi: {
    baslik: "A Day of Reckoning",
    metin:
      "Your harsh methods from years ago have reached an international inquiry commission. Witnesses are testifying.",
    secenekler: [
      {
        metin: "Hire lawyers, build a strong defense.",
        basariliSonuc: {
          mesaj: "The inquiry fizzled; your name looks clear, but everyone knows the truth.",
          detay: "Justice sometimes stays in money's shadow.",
        },
        basarisizSonuc: {
          mesaj: "Found guilty; demoted, your name a black mark in the record.",
          detay: "Some reckonings come due.",
        },
      },
      {
        metin: "Admit guilt, apologize publicly.",
        basariliSonuc: {
          mesaj: "Your apology earned respect; career over, but your conscience eased.",
          detay: "A late apology still mends something.",
        },
        basarisizSonuc: {
          mesaj: "Read as 'fake remorse'; neither career nor reputation was saved.",
          detay: "Some pasts aren't erased by apology.",
        },
      },
    ],
  },
  sd_asker_yol_zalim_yasli_gunler: {
    baslik: "Those Left Behind",
    metin:
      "In old age, ghosts of the villages you burned haunt you. {cocuk} asks why you've grown so quiet.",
    secenekler: [
      {
        metin: "Hide your past, say nothing.",
        basariliSonuc: {
          mesaj: "You stayed silent; {cocuk} stopped asking, but the distance grew.",
          detay: "Some silences build walls.",
        },
        basarisizSonuc: {
          mesaj: "Part of your past reached {cocuk}; their look was never the same.",
          detay: "Hidden truths eventually surface.",
        },
      },
      {
        metin: "Confess everything, with remorse.",
        basariliSonuc: {
          mesaj: "{cocuk} was shocked but stayed; the stone inside you eased.",
          detay: "Even a late confession mends a bond.",
        },
        basarisizSonuc: {
          mesaj: "{cocuk} was horrified; an unbridgeable distance opened between you.",
          detay: "A late-disclosed past deepens the wound.",
        },
      },
    ],
  },

  // ══════════════════════════ DESERTER (escape, a hidden life) ══════════════════════════
  sd_asker_yol_firari_jandarma_takibi: {
    baslik: "Gendarme Pursuit",
    metin:
      "Military gendarmes comb the small towns of {bolge} for deserters. A patrol closes in on you.",
    secenekler: [
      {
        metin: "Flee to the countryside and hide.",
        basariliSonuc: {
          mesaj: "The patrol missed you; but you went hungry and exhausted for days.",
          detay: "Freedom sometimes means hiding in barren land.",
        },
        basarisizSonuc: {
          mesaj: "The patrol caught you; beaten and taken to a military prison.",
          detay: "Escape doesn't always succeed.",
        },
      },
      {
        metin: "Act like a peasant, meet the patrol's eyes.",
        basariliSonuc: {
          mesaj: "They took you for a farmer; your heart pounds, but you're free.",
          detay: "The boldest plan sometimes works best.",
        },
        basarisizSonuc: {
          mesaj: "The gendarmes grew suspicious, your lies failed; you were detained.",
          detay: "Some gambles are lost.",
        },
      },
    ],
  },
  sd_asker_yol_firari_sahte_kimlik: {
    baslik: "A Forged Identity",
    metin:
      "A forger offers a new identity and invented past. Expensive, but it could erase you from the military records.",
    secenekler: [
      {
        metin: "Pay up, take the new identity.",
        basariliSonuc: {
          mesaj: "The papers look flawless; you can live under a new name.",
          detay: "Some lives are rewritten on one sheet of paper.",
        },
        basarisizSonuc: {
          mesaj: "Shoddy papers, forgery caught at the first check; money and trust lost.",
          detay: "Cheap forgery can become a bigger trap.",
        },
      },
      {
        metin: "Don't trust the forger; fend for yourself.",
        basariliSonuc: {
          mesaj: "You get by hiding your real name; risky but free.",
          detay: "Distrust is sometimes the best protection.",
        },
        basarisizSonuc: {
          mesaj: "Identity-less, you looked suspect; questioned at an inn, you barely escaped.",
          detay: "A life without papers risks every door.",
        },
      },
    ],
  },
  sd_asker_yol_firari_eski_yoldas: {
    baslik: "An Old Comrade",
    metin:
      "At a market, a soldier from your old battalion recognizes you. He could report you or keep quiet; the choice is his.",
    secenekler: [
      {
        metin: "Tell him everything, trust his mercy.",
        basariliSonuc: {
          mesaj: "Your old comrade listened, promised not to touch you; he even left supplies.",
          detay: "Some bonds are stronger than a uniform.",
        },
        basarisizSonuc: {
          mesaj: "Your old comrade reported you; the gendarmes found you fast.",
          detay: "The past sometimes doesn't forgive.",
        },
      },
      {
        metin: "Ignore him, vanish at once.",
        basariliSonuc: {
          mesaj: "You melted into the crowd; ignoring an old friend stung.",
          detay: "Survival sometimes sacrifices friendship.",
        },
        basarisizSonuc: {
          mesaj: "You drew attention fleeing and were chased; you barely got away.",
          detay: "A panicked escape draws more attention.",
        },
      },
    ],
  },
  sd_asker_yol_firari_tehlikeli_is: {
    baslik: "A Dangerous Job",
    metin:
      "You need work where no one asks questions; a harbor master offers a dangerous but well-paid cargo job.",
    secenekler: [
      {
        metin: "Take the job, accept the risk.",
        basariliSonuc: {
          mesaj: "Heavy loads, aching back, full stomach; the employer trusts you more.",
          detay: "Some bread is earned lifting heavy things.",
        },
        basarisizSonuc: {
          mesaj: "A crate crushed your foot; you left with half pay and a lame leg.",
          detay: "Risky jobs don't always pay as promised.",
        },
      },
      {
        metin: "Seek small, safe, low-paying jobs.",
        basariliSonuc: {
          mesaj: "You got by on small jobs; modest but safe income.",
          detay: "Sometimes little but safe wins out.",
        },
        basarisizSonuc: {
          mesaj: "Even small jobs dried up; the days passed hard.",
          detay: "In hiding, even the smallest job is hard to find.",
        },
      },
    ],
  },
  sd_asker_yol_firari_teslim_olma_ani: {
    baslik: "The Moment of Surrender",
    metin:
      "Years as a fugitive have worn you out. An amnesty promises lighter sentences to those who surrender. Risky, but it might save you.",
    secenekler: [
      {
        metin: "Surrender voluntarily, trust the amnesty.",
        basariliSonuc: {
          mesaj: "The amnesty covered you; freed after brief questioning, you finally breathe easy.",
          detay: "Surrender can be courage.",
        },
        basarisizSonuc: {
          mesaj: "The amnesty didn't cover you; arrested on surrender, a harsh sentence awaits.",
          detay: "Some gambles are lost bitterly.",
        },
      },
      {
        metin: "Don't risk it, stay a fugitive.",
        basariliSonuc: {
          mesaj: "You didn't trust the amnesty and kept hiding; more weary, but alive.",
          detay: "A known danger beats an unknown hope.",
        },
        basarisizSonuc: {
          mesaj: "Running on left you lonelier; your hope slowly faded.",
          detay: "Constant hiding wears down the soul.",
        },
      },
    ],
  },
  sd_asker_yol_firari_liman_kacagi: {
    baslik: "An Opportunity at the Harbor",
    metin:
      "A merchant ship bound for a far country is anchored. The captain needs rowers and asks no names.",
    secenekler: [
      {
        metin: "Work aboard in secret, put to sea.",
        basariliSonuc: {
          mesaj: "The ship left the border behind; the gendarmes can't reach you, but you're exhausted.",
          detay: "Some freedom lies on the waves.",
        },
        basarisizSonuc: {
          mesaj: "A stormy voyage made you ill and the ship turned back; same soil still.",
          detay: "The sea sometimes turns back escape.",
        },
      },
    ],
  },
  sd_asker_yol_firari_sinir_gecisi: {
    baslik: "Crossing the Border",
    metin:
      "Crossing into a neighboring country could free you from military records. But the border posts are tightly guarded.",
    secenekler: [
      {
        metin: "Cross at night by mountain trails.",
        basariliSonuc: {
          mesaj: "After a grueling night you crossed; your old land's gendarmes can't reach you.",
          detay: "Some borders split a life in two.",
        },
        basarisizSonuc: {
          mesaj: "A patrol caught you in the dark; detained for illegal crossing.",
          detay: "The dark isn't always good cover.",
        },
      },
    ],
  },
  sd_asker_yol_firari_gizli_aile: {
    baslik: "A Hidden Life",
    metin:
      "You've built a quiet life in a small town under a hidden identity. {es} grows curious about your past.",
    secenekler: [
      {
        metin: "Tell {es} the truth.",
        basariliSonuc: {
          mesaj: "{es} was surprised but stayed by you; your bond deepened.",
          detay: "A shared secret strengthens a bond.",
        },
        basarisizSonuc: {
          mesaj: "{es} couldn't take the truth, trust shaken; a coldness set in.",
          detay: "Some truths shake a relationship.",
        },
      },
      {
        metin: "Stay silent, hide your past forever.",
        basariliSonuc: {
          mesaj: "You stayed silent; {es} stopped asking, but a small distance remained.",
          detay: "A hidden past quietly builds a wall.",
        },
        basarisizSonuc: {
          mesaj: "{es} sensed something behind your silence; trust was shaken.",
          detay: "Silence can raise suspicion by itself.",
        },
      },
    ],
  },
  sd_asker_yol_firari_para_sikintisi: {
    baslik: "Money Trouble",
    metin:
      "Work is scarce without an identity; your last coins run out. A shady gambling-house owner offers 'trusted courier' work.",
    secenekler: [
      {
        metin: "Take the courier job, walk the edge of the law.",
        basariliSonuc: {
          mesaj: "Your pockets filled; but dark circles now have you on their radar too.",
          detay: "Some money doesn't pass through clean hands.",
        },
        basarisizSonuc: {
          mesaj: "Caught in a clash on a delivery; you lost the money and were wounded.",
          detay: "Dark dealings rarely turn out safe.",
        },
      },
      {
        metin: "Decline, try to get by honestly.",
        basariliSonuc: {
          mesaj: "Hard days, but you owe no one.",
          detay: "Some hardships are borne with honor.",
        },
        basarisizSonuc: {
          mesaj: "Hunger weakened you and you lay sick; no one helped.",
          detay: "Honesty doesn't always fill the stomach.",
        },
      },
    ],
  },
  sd_asker_yol_firari_yakalanma_tehlikesi: {
    baslik: "Nearly Caught",
    metin:
      "An informer reported you to the gendarmerie. You have a few hours before they reach your door.",
    secenekler: [
      {
        metin: "Drop everything and flee to another city.",
        basariliSonuc: {
          mesaj: "You fled just in time; you left your life behind, but you're free.",
          detay: "Surviving sometimes means starting over.",
        },
        basarisizSonuc: {
          mesaj: "No time to flee; the gendarmes arrived and your fugitive life ended.",
          detay: "Some escapes are lost by a minute.",
        },
      },
      {
        metin: "Stay and bluff your way through.",
        basariliSonuc: {
          mesaj: "Your lies worked, the gendarmes left; you kept your life.",
          detay: "Composure is the best shield.",
        },
        basarisizSonuc: {
          mesaj: "Your lies failed and you were arrested on the spot; your fugitive life ended.",
          detay: "Some gambles are lost bitterly.",
        },
      },
    ],
  },
  sd_asker_yol_firari_yeni_hayat: {
    baslik: "A New Life",
    metin:
      "Your fugitive life became a habit. You could build a quiet life with a small craft — but your past still seems on your heels.",
    secenekler: [
      {
        metin: "Open a small shop, sink into civilian life.",
        basariliSonuc: {
          mesaj: "The shop brings small, steady income; you're finally at peace.",
          detay: "Some lives can be rebuilt, even late.",
        },
        basarisizSonuc: {
          mesaj: "The shop failed and debts piled up; a peaceful old age is postponed.",
          detay: "Some beginnings don't hold at first try.",
        },
      },
      {
        metin: "Face someone tracking your past one last time.",
        basariliSonuc: {
          mesaj: "It went calmly; your old hunter promised to leave you be.",
          detay: "Some pasts close only when faced.",
        },
        basarisizSonuc: {
          mesaj: "It ended badly; an old man now, you were taken into custody again.",
          detay: "Some pasts never learn to forgive.",
        },
      },
    ],
  },
};
