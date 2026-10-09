import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiTuccarYollari.ts — İngilizce çevirileri (45 olay). */
export const OLAYLAR_SANAYI_TUCCAR_YOLLARI_EN: Record<string, OlayCeviri> = {
  sd_tuccar_yol_ilk_karar: {
    baslik: "The First Big Decision",
    metin:
      "Your small business is growing. The bank wants a plan for your first big loan, and it shapes the industrialist you become.",
    secenekler: [
      {
        metin: "Present a fair-wage, modest-profit plan.",
        basariliSonuc: {
          mesaj: "Loan approved; both bank and workers trust you.",
          detay: "Solid foundations are laid slowly.",
        },
        basarisizSonuc: {
          mesaj: "The plan seemed dull; the loan shrank, but it's a start.",
          detay: "Honesty opens doors slowly.",
        },
      },
      {
        metin: "Present the harshest plan, slashing wages.",
        basariliSonuc: {
          mesaj: "The loan came big; workers turned cold.",
          detay: "Growth has a fine-print cost.",
        },
        basarisizSonuc: {
          mesaj: "Plan approved, but word leaked: you're the 'ruthless boss'.",
          detay: "Cruelty leaves a name first.",
        },
      },
      {
        metin: "Try to grow the loan on the stock market.",
        basariliSonuc: {
          mesaj: "It paid off; the loan doubled overnight.",
          detay: "Some grow on nerve.",
        },
        basarisizSonuc: {
          mesaj: "The bet sank; you sold half the business to repay.",
          detay: "At the table, the loser learns last.",
        },
      },
      {
        metin: "Set aside profit for worker training and charity.",
        basariliSonuc: {
          mesaj: "Papers praised you as the boss who invests in the future.",
          detay: "Some grow through people.",
        },
        basarisizSonuc: {
          mesaj: "Your charity went unseen, but your intent is talked about.",
          detay: "Kindness is sown quietly, then bears fruit.",
        },
      },
    ],
  },

  // ======================= FAIR (11) =======================
  sd_tuccar_yol_adil_sendika_masasi: {
    baslik: "The Union Table",
    metin:
      "The new workers' union wants to talk wages. Other factories threw them out; you could sit down.",
    secenekler: [
      {
        metin: "Sit down and bargain honestly.",
        basariliSonuc: {
          mesaj: "Delegates left satisfied; the strike threat faded.",
          detay: "A few {birim} more bought years of loyalty.",
        },
        basarisizSonuc: {
          mesaj: "No deal, but the talks ended respectfully.",
          detay: "Some tables are only a beginning.",
        },
      },
      {
        metin: "Refuse to talk.",
        basariliSonuc: {
          mesaj: "Profit rose, but you're no longer the 'fair boss'.",
          detay: "The door you shut returns as another problem.",
        },
        basarisizSonuc: {
          mesaj: "Workers slowed down; production nearly stopped.",
          detay: "The closed door left anger behind.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_sagligi_klinik: {
    baslik: "Factory Clinic",
    metin:
      "A doctor says workers can't get treatment and proposes a factory clinic. Costly, but it cuts lost labor.",
    secenekler: [
      {
        metin: "Build the clinic, hire the doctor.",
        basariliSonuc: {
          mesaj: "Clinic opened; the sick are treated, not fired.",
          detay: "Absenteeism quietly fell.",
        },
        basarisizSonuc: {
          mesaj: "Clinic opened but the doctor was weak; good intent, mediocre result.",
          detay: "Good decisions rarely pay in year one.",
        },
      },
      {
        metin: "Postpone; put the money into production.",
        basariliSonuc: {
          mesaj: "Output rose, but a stone sits on your conscience.",
          detay: "'Later' often never comes.",
        },
        basarisizSonuc: {
          mesaj: "An outbreak halted the factory for a week.",
          detay: "Your savings were small next to the lost output.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_kirli_teklif: {
    baslik: "A Dirty Offer",
    metin:
      "A merchant offers dubious cheap colonial raw material. Profit doubles, but you'd have to ask questions.",
    secenekler: [
      {
        metin: "Refuse; stay with clean suppliers.",
        basariliSonuc: {
          mesaj: "You refused; later the goods proved slave-made.",
          detay: "'Thank God' comes late; you acted early.",
        },
        basarisizSonuc: {
          mesaj: "You refused, but rivals took it and undercut you.",
          detay: "Right isn't always profitable.",
        },
      },
      {
        metin: "Just this once, buy without asking.",
        basariliSonuc: {
          mesaj: "Profit came in, but nights are haunted by its source.",
          detay: "An exception shows how firm a principle is.",
        },
        basarisizSonuc: {
          mesaj: "The source leaked; your 'fair boss' image cracked.",
          detay: "One lapse clouded years of reputation.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_kalite_yarisi: {
    baslik: "Competing on Quality",
    metin:
      "Rivals crash prices; you choose quality over cutting corners. The costlier road.",
    secenekler: [
      {
        metin: "Invest in quality; sell 'honest craft'.",
        basariliSonuc: {
          mesaj: "Customers tired of cheap goods; yours stood out.",
          detay: "'{aile}' now means quality.",
        },
        basarisizSonuc: {
          mesaj: "Quality was noticed, but the market wasn't ready; sales fell short.",
          detay: "Right idea, wrong time.",
        },
      },
      {
        metin: "Join the price war a little.",
        basariliSonuc: {
          mesaj: "You cut prices and sold more; old customers say you've changed.",
          detay: "The middle road satisfies no one fully.",
        },
        basarisizSonuc: {
          mesaj: "You won neither the price war nor on quality; customers left.",
          detay: "Chase two hares, catch neither.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_grev_tehdidi: {
    baslik: "The Wind of Strike",
    metin:
      "A big strike erupted in the city. Your workers want a day off in support; you're known as a fair boss.",
    secenekler: [
      {
        metin: "Back them openly; grant the day off.",
        basariliSonuc: {
          mesaj: "Workers are grateful; you're known as the boss who prevented a strike.",
          detay: "Trust outlasts a day's output.",
        },
        basarisizSonuc: {
          mesaj: "Other bosses resented it; some supply deals cooled.",
          detay: "Standing right can mean standing alone.",
        },
      },
      {
        metin: "Stay neutral; keep the factory running.",
        basariliSonuc: {
          mesaj: "The factory ran, but some workers were let down.",
          detay: "Neutrality is also a choice.",
        },
        basarisizSonuc: {
          mesaj: "Some joined anyway; output slipped and you were called indecisive.",
          detay: "Standing in the middle can lose both sides.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_ornek_fabrika: {
    baslik: "Model Factory",
    metin:
      "A government commission wants to inspect your factory as a 'model workplace'. You could lead the standards.",
    secenekler: [
      {
        metin: "Cooperate fully; open the books.",
        basariliSonuc: {
          mesaj: "Your report became a benchmark; industry speaks of you with respect.",
          detay: "Some standards spring from one example.",
        },
        basarisizSonuc: {
          mesaj: "Minor faults were found; no shame, but a dent in pride.",
          detay: "You're not flawless, just good.",
        },
      },
      {
        metin: "Decline politely; keep it private.",
        basariliSonuc: {
          mesaj: "No inspection; business went on as usual.",
          detay: "Some peace is worth as much as an opportunity.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal sparked 'what is he hiding?' gossip.",
          detay: "Openness is safer than hiding.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_rakip_iflasi: {
    baslik: "The Rival's Collapse",
    metin:
      "{rakip} is sinking under union pressure and boycott. You could buy the firm cheaply, but its workers face the street.",
    secenekler: [
      {
        metin: "Take over; rehire workers on your terms.",
        basariliSonuc: {
          mesaj: "You saved dozens of jobs; papers called you a savior boss.",
          detay: "The best deal can be a humane one.",
        },
        basarisizSonuc: {
          mesaj: "The takeover was rough; old debts and broken machines burned you.",
          detay: "Good intent can come with a bad ledger.",
        },
      },
      {
        metin: "Stay out; just take the vacated market.",
        basariliSonuc: {
          mesaj: "Customers came over, but the workers' fate troubles you.",
          detay: "It was too tempting.",
        },
        basarisizSonuc: {
          mesaj: "Market share fell short; others saw the chance too.",
          detay: "Opportunities get crowded.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_cirak_okulu: {
    baslik: "Apprentice School",
    metin:
      "You want an evening apprentice school teaching youths reading and trade skills. It takes time and money.",
    secenekler: [
      {
        metin: "Found the school; hire a teacher.",
        basariliSonuc: {
          mesaj: "First graduates became foremen; you no longer hire masters from outside.",
          detay: "Knowledge pays interest.",
        },
        basarisizSonuc: {
          mesaj: "The school opened, but few came; the youths were too tired.",
          detay: "Good ideas crawl without the right conditions.",
        },
      },
      {
        metin: "Drop it; put resources into production.",
        basariliSonuc: {
          mesaj: "Output rose, but the foreman shortage remains.",
          detay: "Saving today postpones tomorrow.",
        },
        basarisizSonuc: {
          mesaj: "An unskilled hand misused a machine; minor damage.",
          detay: "Untrained hands bill you for the savings.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_konut_projesi: {
    baslik: "Workers' Neighborhood",
    metin:
      "Your workers live in damp, crowded shacks. You consider building decent, cheap rental homes beside the factory.",
    secenekler: [
      {
        metin: "Start the project; charge fair rent.",
        basariliSonuc: {
          mesaj: "First families moved in; absenteeism visibly dropped.",
          detay: "Well-rested workers work well.",
        },
        basarisizSonuc: {
          mesaj: "Construction overran; the project cost far more.",
          detay: "Good intent meets engineering reality.",
        },
      },
      {
        metin: "Postpone; give small rent aid.",
        basariliSonuc: {
          mesaj: "The aid is small but workers are grateful: 'he cares'.",
          detay: "A small gesture beats none.",
        },
        basarisizSonuc: {
          mesaj: "The aid changed little; workers still struggle.",
          detay: "Symbolic steps stay symbolic.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_gazeteci_ziyareti: {
    baslik: "The Journalist's Visit",
    metin:
      "A journalist seeking a 'good example' wants to visit. The interview could lift your name, but the questions may sting.",
    secenekler: [
      {
        metin: "Accept; answer frankly.",
        basariliSonuc: {
          mesaj: "The piece, 'a light in a dark age', spread your name beyond the city.",
          detay: "Honesty works in front of the camera too.",
        },
        basarisizSonuc: {
          mesaj: "He inflated a flaw; you expected praise and got criticism.",
          detay: "Openness invites criticism.",
        },
      },
      {
        metin: "Politely refuse, protect your privacy.",
        basariliSonuc: {
          mesaj: "No interview; peace kept, no fame gained.",
          detay: "Some good is done quietly.",
        },
        basarisizSonuc: {
          mesaj: "He read your refusal as hiding; a seed of doubt.",
          detay: "Silence writes its own story.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_kariyer_onuru: {
    baslik: "The Conscience of Industry",
    metin:
      "Years passed; young industrialists seek your advice. The chamber of commerce offers you the title 'conscience of industry'.",
    secenekler: [
      {
        metin: "Accept the title; mentor the young.",
        basariliSonuc: {
          mesaj: "The city's young bosses now sit at your table to learn.",
          detay: "A lifetime's repute became a title.",
        },
        basarisizSonuc: {
          mesaj: "You got the title, but some youths found you old-fashioned.",
          detay: "Every generation learns by its own mistakes.",
        },
      },
      {
        metin: "Stay humble; decline the title.",
        basariliSonuc: {
          mesaj: "'I want no title, my work suffices'; that earned respect.",
          detay: "Refuse the crown, wear more of them.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was read as showing off; your intent misread.",
          detay: "Even modesty gets misread.",
        },
      },
    ],
  },

  // ======================= EXPLOITATIVE (11) =======================
  sd_tuccar_yol_somurucu_cocuk_isci: {
    baslik: "Small Hands",
    metin:
      "Your foreman says children slip between machines easily and cost less. He suggests hiring a few.",
    secenekler: [
      {
        metin: "Agree; hire a few children.",
        basariliSonuc: {
          mesaj: "Costs fell; small shadows move between the machines.",
          detay: "It haunts nights, yet you go back each morning.",
        },
        basarisizSonuc: {
          mesaj: "A child was hurt by a machine; hushed up, but you can't forget.",
          detay: "Someone else sometimes pays for cheapness.",
        },
      },
      {
        metin: "Refuse; hire only adults.",
        basariliSonuc: {
          mesaj: "Costs rose a bit, but your conscience is easier.",
          detay: "Even on a ruthless road, you choose each time.",
        },
        basarisizSonuc: {
          mesaj: "Rivals with cheap labor undercut you.",
          detay: "Conscience can cost you in bargaining.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_ucret_kesme: {
    baslik: "Recession-Time Cuts",
    metin:
      "The market is shrinking; you consider cutting wages to protect profit. The foreman warns: 'They're already hungry, don't anger them.'",
    secenekler: [
      {
        metin: "Cut wages; protect profit.",
        basariliSonuc: {
          mesaj: "Profit held; quiet anger builds in the factory.",
          detay: "The numbers look fine, the mood doesn't.",
        },
        basarisizSonuc: {
          mesaj: "The cut spread through town; you got the nickname 'starving boss'.",
          detay: "Some savings cost more than reputation.",
        },
      },
      {
        metin: "Drop it; save elsewhere.",
        basariliSonuc: {
          mesaj: "You spared wages; workers relaxed, margins narrowed.",
          detay: "Sometimes retreating is wise.",
        },
        basarisizSonuc: {
          mesaj: "Cuts elsewhere lowered quality; orders came back.",
          detay: "Dodge one hole, fall into another.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_sendikaci: {
    baslik: "Crushing the Organizer",
    metin:
      "A worker is secretly forming a union. You can fire him as a warning or look away and talk.",
    secenekler: [
      {
        metin: "Fire him publicly as an example.",
        basariliSonuc: {
          mesaj: "The workers fell silent, but their looks have changed.",
          detay: "Fear-bought silence delays the blast, not prevents it.",
        },
        basarisizSonuc: {
          mesaj: "The fired worker went to the press; the city buzzed.",
          detay: "Silencing sometimes backfires.",
        },
      },
      {
        metin: "Ignore it.",
        basariliSonuc: {
          mesaj: "The organizing fizzled out, for now.",
          detay: "Not every storm breaks.",
        },
        basarisizSonuc: {
          mesaj: "The movement grew; you faced a week-long slowdown.",
          detay: "Ignoring a problem can grow it.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_guvenlik_kesme: {
    baslik: "Cutting Corners on Safety",
    metin:
      "The engineer says machine guards are costly; remove them and output speeds up. Accident risk rises, and so does profit.",
    secenekler: [
      {
        metin: "Remove the guards; speed up.",
        basariliSonuc: {
          mesaj: "Output and profit rose; no accidents yet.",
          detay: "Risk's bill doesn't come at once.",
        },
        basarisizSonuc: {
          mesaj: "A worker lost a hand; outrage was big and compensation burned you.",
          detay: "Every skimped safeguard is paid in someone's body.",
        },
      },
      {
        metin: "Keep the guards; sacrifice output.",
        basariliSonuc: {
          mesaj: "Output stayed slow, but no serious accident occurred.",
          detay: "Some limits can still be kept.",
        },
        basarisizSonuc: {
          mesaj: "Slow output sent a big order to a rival.",
          detay: "Safety has an opportunity cost.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_siyasi_rusvet: {
    baslik: "Silencing the Inspector",
    metin:
      "A new labor law will inspect your factory. A small 'gift' to a council member could delay the inspection.",
    secenekler: [
      {
        metin: "Pay the bribe; delay the inspection.",
        basariliSonuc: {
          mesaj: "Inspection postponed a year; the councilman is in your pocket.",
          detay: "Some problems are only delayed by money.",
        },
        basarisizSonuc: {
          mesaj: "The bribe was refused and reported; your name entered an investigation.",
          detay: "A lost gamble returns doubled.",
        },
      },
      {
        metin: "Allow the inspection; quickly 'fix' the factory.",
        basariliSonuc: {
          mesaj: "Last-minute cosmetics barely passed inspection.",
          detay: "Changing appearances is easier than reality.",
        },
        basarisizSonuc: {
          mesaj: "Inspectors found serious violations; fines and bad press followed.",
          detay: "Cosmetics don't fool a careful eye.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_gazeteci_arastirmasi: {
    baslik: "The Reporter on Your Trail",
    metin:
      "A journalist is probing your factory and has even spoken to former workers. You can silence him or risk the story.",
    secenekler: [
      {
        metin: "Silence him with a lawsuit threat.",
        basariliSonuc: {
          mesaj: "The journalist backed off, but whispers persist.",
          detay: "Silencing isn't erasing.",
        },
        basarisizSonuc: {
          mesaj: "The threat became the story; 'censoring boss' made headlines.",
          detay: "A muffled voice can become a megaphone.",
        },
      },
      {
        metin: "Ignore it; let the story run.",
        basariliSonuc: {
          mesaj: "The story ran, was talked about for weeks, then forgotten.",
          detay: "Non-reaction calms some storms.",
        },
        basarisizSonuc: {
          mesaj: "The story resonated; some customers cut ties.",
          detay: "Some storms don't pass when ignored.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_vardiya_uzatma: {
    baslik: "Extending the Shift",
    metin:
      "For a big order, you consider extending shifts with forced overtime, unpaid.",
    secenekler: [
      {
        metin: "Force longer shifts, no extra pay.",
        basariliSonuc: {
          mesaj: "The order shipped; workers look hollow-eyed, but you profit.",
          detay: "Some wins are built on others' exhaustion.",
        },
        basarisizSonuc: {
          mesaj: "An exhausted worker erred; a whole batch was ruined.",
          detay: "People aren't machines.",
        },
      },
      {
        metin: "Pay a small extra for overtime.",
        basariliSonuc: {
          mesaj: "Workers are tired but somewhat appeased.",
          detay: "Exploitation has degrees too.",
        },
        basarisizSonuc: {
          mesaj: "Despite the bonus, some slowed down; the order was late.",
          detay: "A small gesture sometimes isn't enough.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_reform_baskisi: {
    baslik: "The Reformer's Pressure",
    metin:
      "A reformist MP wants to limit working hours by law. Other industrialists invite you to lobby.",
    secenekler: [
      {
        metin: "Join the lobby; block the law.",
        basariliSonuc: {
          mesaj: "The law was delayed; among industrialists you're a solid man.",
          detay: "Some wins come in a wide front's shadow.",
        },
        basarisizSonuc: {
          mesaj: "The lobbying leaked; the reformer held you up as bad faith.",
          detay: "Some fights are lost the more you spend.",
        },
      },
      {
        metin: "Stay out; let the law take its course.",
        basariliSonuc: {
          mesaj: "The debate goes on; you stayed on the sidelines.",
          detay: "You needn't join every fight.",
        },
        basarisizSonuc: {
          mesaj: "The law passed, hours shrank; your production plans collapsed.",
          detay: "Standing aside keeps you from shaping the outcome.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_kaza_ortbas: {
    baslik: "The Boiler Blew",
    metin:
      "A boiler with endlessly postponed maintenance exploded; some workers were hurt. You can cover it up or take responsibility and pay.",
    secenekler: [
      {
        metin: "Cover it up; silence the officials.",
        basariliSonuc: {
          mesaj: "The incident was buried, but carrying the secret weighs on you.",
          detay: "Secrets slowly consume their keeper.",
        },
        basarisizSonuc: {
          mesaj: "The cover-up came out; the city calls you the 'killer boss'.",
          detay: "Truth surfaces however deep it is buried.",
        },
      },
      {
        metin: "Take responsibility; pay compensation.",
        basariliSonuc: {
          mesaj: "You paid; your name suffered, but your conscience eased a little.",
          detay: "Some moments keep you from being wholly lost.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but the neglect leaked; your name suffered anyway.",
          detay: "Honesty isn't always a shield.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_isci_ayaklanmasi: {
    baslik: "Workers' Uprising",
    metin:
      "Years of anger erupted; workers storm the gates shouting demands. You can crush it with gendarmes or sit down.",
    secenekler: [
      {
        metin: "Call the gendarmes; crush the revolt.",
        basariliSonuc: {
          mesaj: "The revolt was crushed and work resumed; some will never forget.",
          detay: "Silence won by force returns in another form.",
        },
        basarisizSonuc: {
          mesaj: "The crackdown turned violent, people were hurt; the city rose up.",
          detay: "A suppressed spark grows.",
        },
      },
      {
        metin: "Open the gate; hear their demands.",
        basariliSonuc: {
          mesaj: "You granted some demands; anger lingers, but a door opened.",
          detay: "A late apology beats none.",
        },
        basarisizSonuc: {
          mesaj: "Talks didn't calm them; workers said 'too late'.",
          detay: "Lost trust isn't mended in one meeting.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_hesaplasma: {
    baslik: "The Reckoning of a Lifetime",
    metin:
      "You're aging; looking back, you see your fortune beside the anger you gathered. You think of making amends in your will.",
    secenekler: [
      {
        metin: "Leave part of your fortune to former workers.",
        basariliSonuc: {
          mesaj: "When the will was known, some former workers forgave you, not all.",
          detay: "Late amends beat none.",
        },
        basarisizSonuc: {
          mesaj: "The gesture fell flat; most said 'too late'.",
          detay: "No will closes some wounds.",
        },
      },
      {
        metin: "Keep your fortune; leave the past behind.",
        basariliSonuc: {
          mesaj: "Your fortune is intact, but nights are still full of old faces.",
          detay: "A sensible choice may bring no peace.",
        },
        basarisizSonuc: {
          mesaj: "Before your end an old accident resurfaced; your name was stained.",
          detay: "The past waits where you left it behind.",
        },
      },
    ],
  },

  // ======================= SPECULATOR (11) =======================
  sd_tuccar_yol_spek_demiryolu_hissesi: {
    baslik: "Railway Frenzy",
    metin:
      "New railway shares are the talk of the city. A broker whispers an insider tip: a small line is ready to boom.",
    secenekler: [
      {
        metin: "Put most of your cash in shares.",
        basariliSonuc: {
          mesaj: "The line boomed; your shares doubled in a week.",
          detay: "Some gambles sit on history's right side.",
        },
        basarisizSonuc: {
          mesaj: "The line lost financing; the shares turned worthless.",
          detay: "Not every whisper is gold.",
        },
      },
      {
        metin: "Invest a little; stay cautious.",
        basariliSonuc: {
          mesaj: "The small stake brought a small but real profit.",
          detay: "A cautious speculator is still a speculator.",
        },
        basarisizSonuc: {
          mesaj: "The small stake melted too, but it was no ruin.",
          detay: "A small loss is the cheap price of a big lesson.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_doviz_arbitraji: {
    baslik: "The Exchange Gap",
    metin:
      "You found a small exchange-rate gap between two cities. Fast, large trades could exploit it, but the market may close quickly.",
    secenekler: [
      {
        metin: "Make a big arbitrage move.",
        basariliSonuc: {
          mesaj: "You finished before the gap closed; net profit pocketed.",
          detay: "Some chances open only to the quick.",
        },
        basarisizSonuc: {
          mesaj: "The gap closed before you; you left with a heavy loss.",
          detay: "An expensive lesson in waiting.",
        },
      },
      {
        metin: "Watch the chance; don't move.",
        basariliSonuc: {
          mesaj: "You missed it, but your capital is whole.",
          detay: "Sometimes the best move is none.",
        },
        basarisizSonuc: {
          mesaj: "Realizing the missed chance, regret filled you.",
          detay: "A gambler's soul frets even at an empty table.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_icerden_bilgi: {
    baslik: "A Secret Overheard",
    metin:
      "A drunk bank clerk let slip tomorrow's government decision. You could take a position early: illegal, but tempting.",
    secenekler: [
      {
        metin: "Use the tip; take a big position.",
        basariliSonuc: {
          mesaj: "The decision broke and you profited big; no one suspects, for now.",
          detay: "Some gains carry a silent risk.",
        },
        basarisizSonuc: {
          mesaj: "Your move drew attention; exchange commissioners are examining your trades.",
          detay: "A dirty secret invites a dirty inquiry.",
        },
      },
      {
        metin: "Don't use it; stay clean.",
        basariliSonuc: {
          mesaj: "You missed the chance, but didn't cross the law.",
          detay: "Even speculators know where to draw a line.",
        },
        basarisizSonuc: {
          mesaj: "Others made fortunes on it; you felt the sting of standing aside.",
          detay: "Doing right is sometimes its own reward.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_banka_paniginde: {
    baslik: "Bank Panic",
    metin:
      "A city bank collapsed and panic spreads; everyone rushes to withdraw. Pull your own money out, or buy cheap assets from panic sales.",
    secenekler: [
      {
        metin: "Exploit the panic; collect cheap assets.",
        basariliSonuc: {
          mesaj: "When the panic eased, your cheap buys tripled in value.",
          detay: "Buying amid blood takes a cool head.",
        },
        basarisizSonuc: {
          mesaj: "The crisis ran deeper than expected; your buys lost value too.",
          detay: "The 'bottom' may be a step to the next one.",
        },
      },
      {
        metin: "Withdraw your money; secure it.",
        basariliSonuc: {
          mesaj: "You withdrew in time; safe while panic grew.",
          detay: "Some victories are mere survival.",
        },
        basarisizSonuc: {
          mesaj: "After queuing you made it before the doors closed, at a small loss.",
          detay: "In panic, everyone rushes the same door.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_rakibe_karsi_bahis: {
    baslik: "Betting Against a Rival",
    metin:
      "You think {rakip}'s firm will soon sink. You could short its shares heavily; if you win, you both know it was your doing.",
    secenekler: [
      {
        metin: "Take a big short position.",
        basariliSonuc: {
          mesaj: "Your call was right; {rakip} fell and you profited.",
          detay: "Some wins are built on another's ruin.",
        },
        basarisizSonuc: {
          mesaj: "{rakip} rebounded unexpectedly; your position closed at a big loss.",
          detay: "Betting against others can backfire.",
        },
      },
      {
        metin: "Skip the risk; stick to normal trade.",
        basariliSonuc: {
          mesaj: "You focused on business; no regrets about not gambling.",
          detay: "Some chances deserve to be missed.",
        },
        basarisizSonuc: {
          mesaj: "{rakip} really sank; you saw how big the missed chance was.",
          detay: "Avoiding risk has a price too.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_kolonyal_emtia: {
    baslik: "Colonial Commodity",
    metin:
      "You hear that cotton from a distant colony will spike on a short harvest shortage. You could sign a large forward contract.",
    secenekler: [
      {
        metin: "Sign the large forward contract.",
        basariliSonuc: {
          mesaj: "The shortage hit, prices soared; your contract became a small fortune.",
          detay: "A harvest across the world sets your fortune.",
        },
        basarisizSonuc: {
          mesaj: "The harvest was good, prices fell; the contract lost heavily.",
          detay: "An overseas gamble is beyond your control.",
        },
      },
      {
        metin: "Take a small, balanced position.",
        basariliSonuc: {
          mesaj: "The small position earned a modest profit.",
          detay: "Disciplined speculators win too.",
        },
        basarisizSonuc: {
          mesaj: "The small position closed at a small loss.",
          detay: "Measured gambles bring measured losses.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_kabarcik_patliyor: {
    baslik: "The Bubble Bursts",
    metin:
      "The railway share bubble, swelling for years, burst overnight. Your fortune is tied up in it: sell now and salvage, or wait for a rebound.",
    secenekler: [
      {
        metin: "Sell now; salvage what you can.",
        basariliSonuc: {
          mesaj: "You sold early; lost most, but not everything.",
          detay: "Some victories are mere survival.",
        },
        basarisizSonuc: {
          mesaj: "The queue to sell was long; by your turn the price was near zero.",
          detay: "The door doesn't fit everyone.",
        },
      },
      {
        metin: "Wait for a rebound; hold the shares.",
        basariliSonuc: {
          mesaj: "The market recovered within the year; your shares regained value.",
          detay: "Seemingly hopeless waiting can pay off.",
        },
        basarisizSonuc: {
          mesaj: "The bubble never reinflated; shares turned worthless, your fortune evaporated.",
          detay: "Some gambles aren't won even by patience.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_yeniden_kurma: {
    baslik: "Rising From the Ashes",
    metin:
      "You lost most of your fortune again. You could rebuild from zero, more carefully, or return to the old cautious trade.",
    secenekler: [
      {
        metin: "Dive back into risky trade; recoup the loss.",
        basariliSonuc: {
          mesaj: "A new run of moves worked; you recouped part of your losses.",
          detay: "A losing spirit wants to return.",
        },
        basarisizSonuc: {
          mesaj: "The new venture failed too; the hole deepened.",
          detay: "The same fire burns worse the second time.",
        },
      },
      {
        metin: "Return to careful, ordinary trade.",
        basariliSonuc: {
          mesaj: "Ordinary trade brought a slow but solid recovery.",
          detay: "Calm after the fire is maturity.",
        },
        basarisizSonuc: {
          mesaj: "Recovery was slow, but the hole didn't deepen.",
          detay: "Patience sometimes only stops the losses.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_komisyoncu_ortakligi: {
    baslik: "Broker Partnership",
    metin:
      "The city's boldest broker proposes a partnership: pool capital for bigger, riskier positions. Profit and loss both double.",
    secenekler: [
      {
        metin: "Accept the partnership.",
        basariliSonuc: {
          mesaj: "The partnership paid well in year one; you're the city's 'bold duo'.",
          detay: "Two gamblers embolden each other.",
        },
        basarisizSonuc: {
          mesaj: "The positions sank together; the partnership ended in bitter quarrel.",
          detay: "Shared risk turns into shared regret.",
        },
      },
      {
        metin: "Refuse, keep working alone.",
        basariliSonuc: {
          mesaj: "You stayed independent; smaller gains, wholly yours.",
          detay: "Some avoid a partnership's dependence.",
        },
        basarisizSonuc: {
          mesaj: "The broker partnered with another and won big; the missed chance wore on you.",
          detay: "Even a right choice stings beside a missed chance.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_sigorta_kumari: {
    baslik: "The Marine Insurance Gamble",
    metin:
      "You're offered a place in a consortium insuring a risky voyage: if the ship arrives the premium is yours, if it sinks you pay heavily.",
    secenekler: [
      {
        metin: "Join the consortium; take the premium.",
        basariliSonuc: {
          mesaj: "The ship weathered the storm and reached port; the premium is yours.",
          detay: "This gamble bets on a captain's skill.",
        },
        basarisizSonuc: {
          mesaj: "The ship sank in a storm; the payout burned you badly.",
          detay: "The sea promises no insurer anything.",
        },
      },
      {
        metin: "Decline; protect your capital.",
        basariliSonuc: {
          mesaj: "You stayed out; the ship sank and you were relieved.",
          detay: "Sometimes avoidance is the best gamble.",
        },
        basarisizSonuc: {
          mesaj: "The ship arrived safe and the consortium won; the missed premium stung.",
          detay: "Avoiding risk can bring regret too.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_efsanevi_servet: {
    baslik: "One Last Big Gamble",
    metin:
      "You're aging; perhaps it's time for one last great gamble. Stake everything on a railway-coal monopoly venture, or retire cautiously.",
    secenekler: [
      {
        metin: "Play the last gamble; stake everything.",
        basariliSonuc: {
          mesaj: "The venture was a triumph; you'll be 'the man who won the last gamble'.",
          detay: "One bold move makes a legend.",
        },
        basarisizSonuc: {
          mesaj: "The venture collapsed; most of your lifetime fortune melted overnight.",
          detay: "A gambler can't stop before the last card.",
        },
      },
      {
        metin: "Quit gambling; retire cautiously.",
        basariliSonuc: {
          mesaj: "You'll spend your last years in peace; fortune safe, sleep easy.",
          detay: "Refusing the last gamble is maturity.",
        },
        basarisizSonuc: {
          mesaj: "You retired, but reading of the monopoly you missed saddened you.",
          detay: "Some 'what ifs' haunt you till death.",
        },
      },
    ],
  },

  // ======================= CHARITABLE (11) =======================
  sd_tuccar_yol_hayir_hastane_bagisi: {
    baslik: "City Hospital",
    metin:
      "The city's only hospital falls short; big donors are sought for a new wing, to bear your name.",
    secenekler: [
      {
        metin: "Make the big donation.",
        basariliSonuc: {
          mesaj: "The wing opened with your name on its door; the city will remember you.",
          detay: "Names live on carved in stone.",
        },
        basarisizSonuc: {
          mesaj: "You donated, but construction lagged; it's only a pledge for now.",
          detay: "Goodness requires patience.",
        },
      },
      {
        metin: "Make a small, modest donation.",
        basariliSonuc: {
          mesaj: "Your gift was small but warmly received.",
          detay: "Every drop swells the sea.",
        },
        basarisizSonuc: {
          mesaj: "The gift changed nothing; the hospital still struggles.",
          detay: "Small kindness pales beside great need.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_okul_kurma: {
    baslik: "Free School",
    metin:
      "Most children in poor districts never attend school. You consider founding a free school with your money: a big investment, a lasting legacy.",
    secenekler: [
      {
        metin: "Found the school; pay the teachers.",
        basariliSonuc: {
          mesaj: "When the first graduates came out, the city called you 'father of education'.",
          detay: "A child's future is the most lasting capital.",
        },
        basarisizSonuc: {
          mesaj: "The school opened but teachers were scarce; the start was painful.",
          detay: "Big dreams advance in small steps.",
        },
      },
      {
        metin: "Donate to an existing school.",
        basariliSonuc: {
          mesaj: "The gift raised the school's capacity: a quiet but real contribution.",
          detay: "Not every gift has to be a story.",
        },
        basarisizSonuc: {
          mesaj: "The gift went to admin costs; its effect was small.",
          detay: "Good intent snags on bureaucracy.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_muhendis_mentorlugu: {
    baslik: "The Young Inventor",
    metin:
      "A poor youth comes to your door with a prototype he designed; no money, only an idea. You could back him.",
    secenekler: [
      {
        metin: "Give the inventor capital and a workshop.",
        basariliSonuc: {
          mesaj: "The machine worked; you patented it together, and the profit sufficed for both.",
          detay: "Some investments fill both pocket and heart.",
        },
        basarisizSonuc: {
          mesaj: "The machine didn't fully work, but the youth found courage to keep trying.",
          detay: "Every failed try seeds a discovery.",
        },
      },
      {
        metin: "Give a small gift; send him on his way.",
        basariliSonuc: {
          mesaj: "The small gift meant a great deal to the youth.",
          detay: "A handful of coins can change a life.",
        },
        basarisizSonuc: {
          mesaj: "The youth met a poor answer at another door; you never learned how it ended.",
          detay: "Some stories stay unfinished.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_hissedar_baskisi: {
    baslik: "Shareholder Pressure",
    metin:
      "Your partners say your donations eat the profit margin: cut your charity, or stand up to their pressure.",
    secenekler: [
      {
        metin: "Keep giving; resist the shareholders.",
        basariliSonuc: {
          mesaj: "Some partners were angry, but the public respects you more.",
          detay: "Some principles outweigh partnership.",
        },
        basarisizSonuc: {
          mesaj: "A partner withdrew his stake; the firm had a brief capital squeeze.",
          detay: "Principles sometimes have a price.",
        },
      },
      {
        metin: "Trim the charity budget; placate the partners.",
        basariliSonuc: {
          mesaj: "The partnership calmed, but shrunken gifts leave you uneasy.",
          detay: "Every compromise costs something.",
        },
        basarisizSonuc: {
          mesaj: "The cut leaked; you were attacked as a philanthropist who dropped his principles.",
          detay: "Reputation shakes when consistency is lost.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_bilimsel_destek: {
    baslik: "The Scientist's Request",
    metin:
      "A local scientist seeks funds for his experiments; no one believes in him, but his findings intrigue. He came to you, the risk-taking donor.",
    secenekler: [
      {
        metin: "Fund the research.",
        basariliSonuc: {
          mesaj: "The discovery became a new industrial method; your name is tied to it.",
          detay: "Some investments buy the future today.",
        },
        basarisizSonuc: {
          mesaj: "The research failed; the money is gone, the scientist's gratitude remains.",
          detay: "Not every effort ends in discovery.",
        },
      },
      {
        metin: "Give small symbolic support; avoid risk.",
        basariliSonuc: {
          mesaj: "The small support still gave his work some breathing room.",
          detay: "A small gift keeps a door ajar.",
        },
        basarisizSonuc: {
          mesaj: "The support fell short; the research kept seeking another donor.",
          detay: "Some dreams don't wait on a single hand.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_kitliktan_koruma: {
    baslik: "Famine-Time Soup Kitchen",
    metin:
      "A bad harvest hit the city; hunger started in poor districts. Open a soup kitchen from your granary, or stay silent to protect your business.",
    secenekler: [
      {
        metin: "Open a soup kitchen from your granary.",
        basariliSonuc: {
          mesaj: "Hundreds were fed; the city remembers you as a hero.",
          detay: "Some kindness lives in a winter's memory.",
        },
        basarisizSonuc: {
          mesaj: "The grain didn't cover the famine, but beat doing nothing.",
          detay: "Doing your best means something even if it falls short.",
        },
      },
      {
        metin: "Stay silent; protect your business.",
        basariliSonuc: {
          mesaj: "Your business is safe, but ignoring the famine troubles you.",
          detay: "Some silences are the loudest regret.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was noticed; you're now the philanthropist who vanishes in hard times.",
          detay: "An image is tested when need is greatest.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_kraliyet_nisani: {
    baslik: "An Offer of Honors",
    metin:
      "Your charity reached the palace; you're offered an official decoration. Accepting means a grand ceremony and social expectations.",
    secenekler: [
      {
        metin: "Accept the honor, make the ceremony grand.",
        basariliSonuc: {
          mesaj: "The ceremony was the talk of the city; official records now cite your charity.",
          detay: "Titles bring expectations too.",
        },
        basarisizSonuc: {
          mesaj: "The ceremony was plain, but the title was recorded.",
          detay: "Not every honor needs a grand crown.",
        },
      },
      {
        metin: "Stay humble; politely decline.",
        basariliSonuc: {
          mesaj: "'My deeds are their own reward,' you said; the people loved you more.",
          detay: "Refusing a title can earn a greater one.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal slightly disappointed the palace, but the people applauded.",
          detay: "Not all humility is rewarded where expected.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_deprem_yardimi: {
    baslik: "The Neighboring City's Disaster",
    metin:
      "A great fire hit a neighboring city; hundreds of families are homeless. You could organize a relief caravan.",
    secenekler: [
      {
        metin: "Organize the caravan; add your own supplies.",
        basariliSonuc: {
          mesaj: "When the caravan arrived, people greeted you in tears.",
          detay: "Some kindness crosses borders into legend.",
        },
        basarisizSonuc: {
          mesaj: "The caravan was delayed; aid came late but still helped.",
          detay: "Your intent is valuable regardless of timing.",
        },
      },
      {
        metin: "Send a small cash donation.",
        basariliSonuc: {
          mesaj: "The donation went out: no grand gesture, but a real help.",
          detay: "Not every gift needs a caravan.",
        },
        basarisizSonuc: {
          mesaj: "The donation was lost among thousands; no one noticed.",
          detay: "Unnoticed kindness has value too.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_sanat_koruyuculugu: {
    baslik: "Patronage of the Arts",
    metin:
      "A poor painter can't afford canvas and paint. You could give him a studio and a regular wage.",
    secenekler: [
      {
        metin: "Give the painter a studio and wage.",
        basariliSonuc: {
          mesaj: "His work became known; some paintings joined your collection and rose in value.",
          detay: "Art can be beautiful and profitable.",
        },
        basarisizSonuc: {
          mesaj: "His style wasn't liked, but he kept his art alive.",
          detay: "Not every patronage yields a masterpiece.",
        },
      },
      {
        metin: "Give a one-time small gift.",
        basariliSonuc: {
          mesaj: "The small aid kept the painter afloat a few months.",
          detay: "A small gesture postpones a great promise.",
        },
        basarisizSonuc: {
          mesaj: "The aid fell short; the painter had to give up art.",
          detay: "Some dreams fade without support.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_miras_vakfi: {
    baslik: "A Lasting Foundation",
    metin:
      "You're aging; you consider founding a lasting trust that devotes part of your fortune to charity forever.",
    secenekler: [
      {
        metin: "Found a large trust; set aside much of your fortune.",
        basariliSonuc: {
          mesaj: "The trust was founded; it will reach the needy for generations.",
          detay: "Some names keep doing good after death.",
        },
        basarisizSonuc: {
          mesaj: "The trust was founded but weakly managed; its early years had little effect.",
          detay: "Good intent falls short with poor management.",
        },
      },
      {
        metin: "Leave your fortune to family; give small gifts.",
        basariliSonuc: {
          mesaj: "Your family is secure; your charity continues on a small scale.",
          detay: "Not every legacy must be a trust.",
        },
        basarisizSonuc: {
          mesaj: "After your death your family quickly spent the fortune; your charitable legacy was weak.",
          detay: "Later hands shape a legacy's fate.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_kolera_salgini: {
    baslik: "Cholera and Clean Water",
    metin:
      "Cholera spreads in the city; doctors blame dirty well water. A clean-water aqueduct for the factory district is costly but could save lives.",
    secenekler: [
      {
        metin: "Fund the aqueduct yourself.",
        basariliSonuc: {
          mesaj: "Once built, cases visibly dropped; doctors held you up as an example.",
          detay: "Some charity leaves lives, not just a name.",
        },
        basarisizSonuc: {
          mesaj: "The aqueduct finished late and the outbreak lingered, but it finally helped.",
          detay: "Kindness losing to time is still worthy.",
        },
      },
      {
        metin: "Hand out boiled water and medicine.",
        basariliSonuc: {
          mesaj: "The water and medicine eased the epidemic's worst weeks.",
          detay: "A stopgap beats nothing.",
        },
        basarisizSonuc: {
          mesaj: "The distribution fell short; the outbreak lasted weeks longer.",
          detay: "Some crises don't bow to half measures.",
        },
      },
    ],
  },
};
