import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/iliskiler.ts — İngilizce çevirileri. */
export const OLAYLAR_ILISKILER_EN: Record<string, OlayCeviri> = {

  iliski_ev_ici_kavga: {
    baslik: "The Broken Vase",
    metin:
      "An argument with {es} over money troubles (or your neglect) got out of hand. They hurled a vase down and began shouting.",
    secenekler: [
      {
        metin: "Hit back hard, keep your authority.",
        basariliSonuc: {
          mesaj:
            "You shouted louder; they fell silent and left. You won, but the marriage took a wound.",
        },
        basarisizSonuc: {
          mesaj:
            "Your words cut so deep {es} started packing. You stand at the cliff's edge.",
        },
      },
      {
        metin: "Gather the shards, embrace, soothe.",
        basariliSonuc: {
          mesaj:
            "You gathered the shards instead of answering. They helped, weeping. The storm passed.",
        },
        basarisizSonuc: {
          mesaj: "You tried to embrace them; they pushed you away. They need time to cool.",
        },
      },
    ],
  },

  iliski_es_gizli_talep: {
    baslik: "Your Spouse's Dangerous Secret",
    metin:
      "After dinner {es} locked the doors. Trembling, they confessed a huge gambling debt to a moneylender and a threat to their life.",
    secenekler: [
      {
        metin: "Clear the debt, no questions.",
        basariliSonuc: {
          mesaj:
            "You gave all your savings and saved them. {es} will be loyal to you for life.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but the moneylenders used interest as a pretext to keep haunting your door.",
        },
      },
      {
        metin: "Your fault; fend for yourself.",
        basariliSonuc: {
          mesaj:
            "You kept your money. {es} stayed away for days; you fear asking how they paid.",
        },
        basarisizSonuc: {
          mesaj:
            "Moneylenders beat {es} in the street; they died in the infirmary. All call you stingy.",
        },
      },
    ],
  },

  iliski_bosanma_esigi: {
    baslik: "Severed Ties",
    metin:
      "The silence at home cuts like a knife. Your bond with {es} is broken. Sacrifice pride and purse to save it, or make the heavy choice.",
    secenekler: [
      {
        metin: "Swallow your pride, try to fix it.",
        basariliSonuc: {
          mesaj:
            "Gifts, concessions, tears worked. Marriage saved, but who holds the strings is clear.",
        },
        basarisizSonuc: {
          mesaj:
            "Despite your effort, {es} left. Your money is gone and the family fell apart.",
        },
      },
      {
        metin: "End it; go to court (or the judge).",
        basariliSonuc: {
          mesaj:
            "The split was painful. Goods divided, purse emptied, but the suffocating silence ended.",
        },
        basarisizSonuc: {
          mesaj:
            "It became a vile gossip war. Your name was stained, half your fortune left in court.",
        },
      },
    ],
  },

  iliski_es_hastalik: {
    baslik: "The Breath of Death",
    metin:
      "{es} is gravely ill, chalk-faced, gasping. A costly physician from afar might save them, but could ruin you.",
    secenekler: [
      {
        metin: "Sell the shop, borrow, fetch the physician!",
        basariliSonuc: {
          mesaj:
            "The physician came in time! {es} returned from death. Coffer empty, a life at home.",
        },
        basarisizSonuc: {
          mesaj:
            "You poured out money but it wasn't enough. {es} died in your arms. The house is a tomb.",
        },
      },
      {
        metin: "No money; let fate decide.",
        basariliSonuc: {
          mesaj:
            "A miracle! {es} beat the illness unaided. But your stinginess raised a wall between you.",
        },
        basarisizSonuc: {
          mesaj:
            "{es} died in agony. At the funeral all whispered of how 'thrifty' you were.",
        },
      },
    ],
  },

  rakip_ekip_teklifi: {
    baslik: "My Enemy's Sword",
    metin:
      "{rakip}, your bitter enemy, came to your door at night, desperate. You share a mighty foe: 'Refuse me and we both perish.'",
    secenekler: [
      {
        metin: "I distrust you but need your strength (Hire).",
        basariliSonuc: {
          mesaj:
            "Your old enemy is now your aide. Wary of their back, yet their sword serves you.",
        },
        basarisizSonuc: {
          mesaj: "A trap! They attacked the moment they entered; guards barely saved you.",
        },
      },
      {
        metin: "I won't share a sack with a snake! Out.",
        basariliSonuc: {
          mesaj: "You slammed the door in their face. Caution keeps you alive.",
        },
        basarisizSonuc: {
          mesaj: "{rakip} joined your common enemy next day and swore your end.",
        },
      },
    ],
  },

  genel_ikilem_dost: {
    baslik: "Between Two Friends",
    metin:
      "Two close friends are enemies: one loyal but poor, at your side for years; the other new, influential and useful. Both demand you pick a side.",
    secenekler: [
      {
        metin: "Stand by your old loyal friend.",
        basariliSonuc: {
          mesaj: "You stood by your old friend; they stood by you for life.",
          detay:
            "At your sickbed sat not the door-closer.",
        },
        basarisizSonuc: {
          mesaj: "You stayed loyal but your friend lost; you both suffered.",
          detay: "The right side isn't the winning side.",
        },
      },
      {
        metin: "Stand by your influential new friend.",
        basariliSonuc: {
          mesaj: "Your influential friend won and raised you too.",
          detay:
            "Your old friend's letter still sits in a drawer.",
        },
        basarisizSonuc: {
          mesaj: "Your influential friend lost and denied knowing you.",
          detay:
            "No friendship, no career; only your choice.",
        },
      },
    ],
  },

  genel_eski_dost_ziyareti: {
    baslik: "A Childhood Friend",
    metin:
      "A childhood friend you haven't seen in years is in town. Their life is very different now, and they want to recall old days.",
    secenekler: [
      {
        metin: "Spend time, reminisce.",
        basariliSonuc: {
          mesaj: "A lovely evening; your old friendship was renewed.",
          detay: "A short trip to the past helps the present.",
        },
        basarisizSonuc: {
          mesaj: "The gap had grown too wide; the old talk never came back.",
          detay: "Some friendships drift apart.",
        },
      },
      {
        metin: "You're busy; keep it short.",
        basariliSonuc: {
          mesaj: "You went back to work; your friend left understanding.",
          detay: "You missed a memory but work didn't slip.",
        },
        basarisizSonuc: {
          mesaj: "Your friend left hurt; you never heard from them again.",
          detay: "Some chances don't return.",
        },
      },
    ],
  },

  iliski_dost_zor_durumda: {
    baslik: "Your Friend in Trouble",
    metin:
      "{dost} came to your door; debts have grown, hands empty. They ask your help, and it won't be easy to give.",
    secenekler: [
      {
        metin: "Share your money, help {dost}.",
        basariliSonuc: {
          mesaj: "{dost}'s eyes filled; they swore never to forget this help.",
          detay: "Standing by in hard times tests friendship.",
        },
        basarisizSonuc: {
          mesaj: "Your help fell short, but {dost} valued the effort.",
          detay: "Even small help, the intent counts.",
        },
      },
      {
        metin: "Your own affairs are hard; apologize, refuse.",
        basariliSonuc: {
          mesaj: "{dost} said they understood, but the disappointment showed.",
          detay: "Refusing is sensible, not free.",
        },
        basarisizSonuc: {
          mesaj: "{dost} told others of the refusal; some found you cold and selfish.",
          detay: "Turning away gets talked about.",
        },
      },
    ],
  },

  iliski_rakip_teklifi: {
    baslik: "Your Rival's Offer",
    metin:
      "{rakip} long contested you but arrived today offering partnership. Sincere or a trap, you can't tell.",
    secenekler: [
      {
        metin: "Accept, join forces with {rakip}.",
        basariliSonuc: {
          mesaj: "The partnership worked; tension with {rakip} melted away surprisingly.",
          detay: "Your greatest rival may become your best partner.",
        },
        basarisizSonuc: {
          mesaj: "A trap. {rakip} used you and dropped you. Money and standing took a hit.",
          detay: "Think twice before shaking a rival's hand.",
        },
      },
      {
        metin: "Refuse, keep your distance.",
        basariliSonuc: {
          mesaj: "{rakip} took the refusal coolly, but the gap widened.",
          detay: "Caution spared you loss and gain alike.",
        },
        basarisizSonuc: {
          mesaj: "{rakip} told others your refusal was 'cowardice'.",
          detay: "Some rivalries heat up when refused.",
        },
      },
    ],
  },

  iliski_dostla_kavga: {
    baslik: "A Falling-Out With Your Friend",
    metin:
      "A small word with {dost} grew into a quarrel. It could end a friendship of years.",
    secenekler: [
      {
        metin: "Drop your pride, make peace first.",
        basariliSonuc: {
          mesaj: "{dost} smiled seeing your outstretched hand; old days returned.",
          detay: "Taking the first step is winning.",
        },
        basarisizSonuc: {
          mesaj: "Peace wasn't met as hoped, but the door stayed open.",
          detay: "Not every apology is taken at once.",
        },
      },
      {
        metin: "Dig in; you're right.",
        basariliSonuc: {
          mesaj: "You were right, but {dost} drew away instead of admitting it.",
          detay: "Being right can be the costliest victory.",
        },
        basarisizSonuc: {
          mesaj: "The quarrel grew; {dost} no longer talks to you as before.",
          detay: "Some words cut too deep to retract.",
        },
      },
    ],
  },

  iliski_rakip_dedikodu: {
    baslik: "Your Rival's Gossip",
    metin:
      "You learn {rakip} spreads a baseless rumor about you; some already believe it.",
    secenekler: [
      {
        metin: "Confront {rakip}, state the truth publicly.",
        basariliSonuc: {
          mesaj: "It worked; the rumor died and you were vindicated.",
          detay: "The truth aloud is the best defense.",
        },
        basarisizSonuc: {
          mesaj: "The confrontation turned ugly; the rumor spread further.",
          detay: "Some fires grow when attacked.",
        },
      },
      {
        metin: "Ignore it; it'll be forgotten.",
        basariliSonuc: {
          mesaj: "The rumor faded with time; you spared your nerves.",
          detay: "Not every fire needs chasing; some die alone.",
        },
        basarisizSonuc: {
          mesaj: "Some read your silence as 'admission of guilt'.",
          detay: "Ignoring isn't always safest.",
        },
      },
    ],
  },

  tepki_es_iddiali_soz: {
    baslik: "A Duel of Words at Home",
    metin:
      "You and {es} disagree; the quarrel grew. Your next word will mend or deepen this night.",
    secenekler: [
      {
        metin: "Drop it: 'We'll talk later.'",
        basariliSonuc: {
          mesaj: "You postponed it; the house quieted but the matter hangs.",
          detay: "Postponed matters don't shrink, they wait.",
        },
        basarisizSonuc: {
          mesaj: "You said 'later' but {es} took it as escape.",
          detay: "Postponing sounds like fleeing.",
        },
      },
      {
        metin: "You're about to say something harsh and irreversible.",
        basariliSonuc: { mesaj: "Not used." },
        basarisizSonuc: { mesaj: "Not used." },
        onTepki: {
          metin:
            "The words are on your tongue. {es}'s look is changing.",
          geriCekilMetni: "Swallow it, soften your words.",
          geriCekilSonucu: {
            mesaj: "You swallowed it; hard, but {es} noticed and softened.",
            detay: "The strongest word is the unsaid.",
          },
          devamMetni: "Say it. No stopping now.",
          devamSonucu: {
            mesaj: "The words came out, unretractable. {es} left the room in silence.",
            detay: "Some sentences leave lasting cracks.",
          },
        },
      },
    ],
  },

  tepki_dost_agir_soz: {
    baslik: "A Moment That Tests the Friendship",
    metin:
      "A small misunderstanding with {dost} grew. One harsh word could shake years of friendship.",
    secenekler: [
      {
        metin: "Breathe deep, soften it.",
        basariliSonuc: {
          mesaj: "You stayed calm; {dost} appreciated it.",
          detay: "Some friendships stand on patience.",
        },
        basarisizSonuc: {
          mesaj: "You tried to soften it but the strain in your voice showed.",
          detay: "Good intent isn't always received alike.",
        },
      },
      {
        metin: "You are about to say a harsh word.",
        basariliSonuc: { mesaj: "Not used." },
        basarisizSonuc: { mesaj: "Not used." },
        onTepki: {
          metin:
            "{dost}'s face is changing. This sentence may decide it.",
          geriCekilMetni: "Swallow it, change the subject.",
          geriCekilSonucu: {
            mesaj: "You swallowed your words; {dost} sensed something but let it be.",
            detay: "Some sentences are best unsaid.",
          },
          devamMetni: "Say it. No way back.",
          devamSonucu: {
            mesaj: "The words came out. {dost} withdrew silently; a distance grew.",
            detay: "Some words leave friendship changed.",
          },
        },
      },
    ],
  },

  tepki_rakip_meydan_okuma: {
    baslik: "A Moment of Defiance",
    metin:
      "You heard {rakip} spreads bad words about you again. Meeting them, you're about to settle things publicly.",
    secenekler: [
      {
        metin: "Ignore it, go on your way.",
        basariliSonuc: {
          mesaj: "You ignored it; bothered inside, yet mature.",
          detay: "Not every fight is worth winning.",
        },
        basarisizSonuc: {
          mesaj: "You tried to ignore it but the anger wore you out.",
          detay: "Suppressing tires you too.",
        },
      },
      {
        metin: "Confront them publicly.",
        basariliSonuc: { mesaj: "Not used." },
        basarisizSonuc: { mesaj: "Not used." },
        onTepki: {
          metin:
            "{rakip} faces you, all watching. No way back.",
          geriCekilMetni: "Back off, turn away.",
          geriCekilSonucu: {
            mesaj: "You backed off at the last moment; {rakip} watched baffled.",
            detay: "Sometimes the strongest move is none.",
          },
          devamMetni: "No. Go all the way.",
          devamSonucu: {
            mesaj:
              "You clashed before the crowd; {rakip} yielded but relations soured.",
            detay: "Pride gained, enmity grown in equal weight.",
          },
        },
      },
    ],
  },

  iliski_ilk_ask: {
    baslik: "First Love",
    metin:
      "Someone in the neighborhood makes your heart race. Your tongue ties each time; how long can you hide it?",
    secenekler: [
      {
        metin: "Confess your feelings.",
        basariliSonuc: {
          mesaj: "Your words were answered; you walked on clouds for days.",
          detay: "First love never tastes the same again.",
        },
        basarisizSonuc: {
          mesaj: "Politely rejected, you blushed and avoided them for weeks.",
          detay: "Hearts don't beat in sync.",
        },
      },
      {
        metin: "Keep it inside; you lacked courage.",
        basariliSonuc: {
          mesaj: "You told no one; a safe but sad silence.",
          detay: "Some feelings stay yours alone.",
        },
        basarisizSonuc: {
          mesaj: "For years you blamed yourself with 'if only' for the unsaid words.",
          detay: "Cowardice is a great regret.",
        },
      },
    ],
  },

  eski_rakiple_son_karsilasma: {
    baslik: "The Last Encounter",
    metin:
      "{rakip}, your rival of years, looks old and tired. Perhaps you meet for the last time.",
    secenekler: [
      {
        metin: "Offer peace, close the past.",
        basariliSonuc: {
          mesaj: "{rakip} shook your hand, startled; years of tension melted away.",
          detay: "Some wars end best in peace.",
        },
        basarisizSonuc: {
          mesaj: "{rakip} coldly refused: 'Too late.'",
          detay: "Not every olive branch is taken.",
        },
      },
      {
        metin: "Settle old scores; challenge them.",
        basariliSonuc: {
          mesaj: "You proved your edge once more; {rakip} withdrew silently.",
          detay: "Some want closure, not peace.",
        },
        basarisizSonuc: {
          mesaj: "The meeting fell flat; you both left tired and hurt.",
          detay: "Some scores never close.",
        },
      },
    ],
  },

  bekarlik_ozgurluk_hissi: {
    baslik: "The Freedom of Being Single",
    metin:
      "You enjoy living answerable to no one. Today too you make your own decisions.",
    secenekler: [
      {
        metin: "Use this freedom, take time for yourself.",
        basariliSonuc: {
          mesaj: "Time for yourself refreshed you.",
          detay: "Sometimes the best company is your own.",
        },
        basarisizSonuc: {
          mesaj: "Time alone was nice but less fulfilling than hoped.",
          detay: "Not all solitude brings peace.",
        },
      },
      {
        metin: "Feel loneliness's weight.",
        basariliSonuc: {
          mesaj: "Loneliness weighed on you a while, then you accepted it.",
          detay: "Some feelings wait for acceptance.",
        },
        basarisizSonuc: {
          mesaj: "Loneliness pressed far harder today. Your chest tightened.",
          detay: "Not every day passes easily.",
        },
      },
    ],
  },

  bekarlik_aile_baskisi: {
    baslik: "When Will You Marry?",
    metin:
      "A relative asked again: 'When will you marry?' This time your patience wore thin.",
    secenekler: [
      {
        metin: "Answer patiently, smiling.",
        basariliSonuc: {
          mesaj: "Your patient answer headed off tension.",
          detay: "Patience helps with family.",
        },
        basarisizSonuc: {
          mesaj: "You stayed patient but the question gnawed at you.",
          detay: "Some questions bother even when expected.",
        },
      },
      {
        metin: "Show your annoyance openly.",
        basariliSonuc: {
          mesaj: "Your reaction stopped the question for good.",
          detay: "Being clear is sometimes most effective.",
        },
        basarisizSonuc: {
          mesaj: "Your anger stirred family tension; they talked behind your back.",
          detay: "Impatience has a price too.",
        },
      },
    ],
  },

  bekarlik_macera_arkadasi: {
    baslik: "A Single's Night",
    metin:
      "{dost} invited you on a surprise adventure. You can enjoy single life one more night.",
    secenekler: [
      {
        metin: "Accept, dive in.",
        basariliSonuc: {
          mesaj: "The night was unexpectedly lovely, unforgettable.",
          detay: "Some nights top the year.",
        },
        basarisizSonuc: {
          mesaj: "The night went awry; you returned tired and poorer.",
          detay: "Not every adventure runs smooth.",
        },
      },
      {
        metin: "Politely decline, stay home.",
        basariliSonuc: {
          mesaj: "A quiet night; you took care of yourself.",
          detay: "Sometimes doing nothing is best.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal let {dost} down a little.",
          detay: "Every no carries a small sadness.",
        },
      },
    ],
  },

  bekarlik_yalniz_yaslanma_korkusu: {
    baslik: "The Fear of Growing Old Alone",
    metin:
      "At night you wonder: what if no one's beside me when I'm old? That thought weighed heavier tonight.",
    secenekler: [
      {
        metin: "Face the thought, accept it.",
        basariliSonuc: {
          mesaj: "Facing it brought unexpected peace.",
          detay: "Some fears shrink when faced.",
        },
        basarisizSonuc: {
          mesaj: "The thought struck deep; you couldn't sleep.",
          detay: "Not every reckoning is easy.",
        },
      },
      {
        metin: "Suppress it, distract yourself.",
        basariliSonuc: {
          mesaj: "You distracted yourself; the thought receded a while.",
          detay: "Postponing is a strategy too.",
        },
        basarisizSonuc: {
          mesaj: "The suppressed thought returned in nightmares all night.",
          detay: "Some thoughts don't quiet easily.",
        },
      },
    ],
  },

  bekarlik_kariyer_odagi: {
    baslik: "A Chance to Fully Focus",
    metin:
      "Answerable to no one, you can devote all your time and energy to your career.",
    secenekler: [
      {
        metin: "Pour everything into work.",
        basariliSonuc: {
          mesaj: "Your focus brought nice gains and recognition.",
          detay: "Devotion to one thing sometimes pays.",
        },
        basarisizSonuc: {
          mesaj: "Overfocus burned you out; no satisfaction.",
          detay: "Success without balance feels empty.",
        },
      },
      {
        metin: "Keep balance, make time for life.",
        basariliSonuc: {
          mesaj: "Your balance made you both successful and happy.",
          detay: "Balance is sometimes the wisest strategy.",
        },
        basarisizSonuc: {
          mesaj: "Balancing, you missed some work opportunities.",
          detay: "Every balance has a loss.",
        },
      },
    ],
  },

  is_ikilem_terfi_mi_aile_mi: {
    baslik: "A Post in Distant Lands",
    metin:
      "A great chance: a months-long distant assignment to leap your career. But {es} and your children would be left alone.",
    secenekler: [
      {
        metin: "Accept the assignment, set out.",
        basariliSonuc: {
          mesaj:
            "The assignment triumphed; back home, {es}'s eyes held pride and longing.",
          detay: "Career rose; home felt a gap for a while.",
        },
        basarisizSonuc: {
          mesaj:
            "It went hard, no success; and {es} never forgot the loneliness.",
          detay: "Sometimes you risk and gain nothing.",
        },
      },
      {
        metin: "Refuse, stay with family.",
        basariliSonuc: {
          mesaj:
            "You refused; {es} hugged you gratefully. Career stalls but you're home each evening.",
          detay: "Some promotions aren't worth one dinner.",
        },
        basarisizSonuc: {
          mesaj: "Superiors noted your refusal as 'unambitious'; the next chance may lag.",
          detay: "Every sacrifice has a cost.",
        },
      },
    ],
  },
};
