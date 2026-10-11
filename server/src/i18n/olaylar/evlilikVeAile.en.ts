import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/evlilikVeAile.ts — İngilizce çevirileri. */
export const OLAYLAR_EVLILIK_AILE_EN: Record<string, OlayCeviri> = {
  evlilik_uc_yol_karari: {
    baslik: "On the Threshold of Marriage",
    metin:
      "Time to marry: a cold but influential noble, a rich but plain merchant's heir, or the penniless one your heart chose.",
    secenekler: [
      {
        metin: "Marry for convenience into the noble family.",
        basariliSonuc: {
          mesaj:
            "A cold palace ceremony. Your spouse is kind but distant; doors have opened.",
          detay: "Some marriages are made to rise.",
        },
        basarisizSonuc: {
          mesaj:
            "The family looked down on you; the ceremony was plain. Your spouse is disappointed.",
          detay: "In this bargain, you were the cheap side.",
        },
      },
      {
        metin: "Marry the rich merchant family's dowered heir.",
        basariliSonuc: {
          mesaj:
            "The in-laws paid for the wedding. Some snicker, but the chests are full.",
          detay: "Beauty fades; gold doesn't.",
        },
        basarisizSonuc: {
          mesaj:
            "The dowry fell short; your spouse learned you married for money and sulked.",
          detay: "Some bargains disappoint both sides.",
        },
      },
      {
        metin: "Marry the penniless one you love.",
        basariliSonuc: {
          mesaj:
            "You married despite both families. Not rich, but you wake up smiling.",
          detay: "Some wealth sleeps beside you.",
        },
        basarisizSonuc: {
          mesaj:
            "You married, but neither family came. Happy, yet completely alone.",
          detay: "Love sometimes costs you family.",
        },
      },
    ],
  },

  evl_ms_sogukluk: {
    baslik: "Same Table, Two Strangers",
    metin:
      "You and {es} sit at dinner with only the clink of cutlery between you. Break the silence or accept it?",
    secenekler: [
      {
        metin: "Take a step, try to truly connect.",
        basariliSonuc: {
          mesaj: "{es} was startled, then relaxed. You shared a real sentence at last.",
          detay: "Beneath the ice, sometimes water.",
        },
        basarisizSonuc: {
          mesaj: "{es} answered in one word and left the table.",
          detay: "Some ice won't thaw in one evening.",
        },
      },
      {
        metin: "Accept the silence, focus on work.",
        basariliSonuc: {
          mesaj: "You didn't talk, but your mind stayed on work.",
          detay: "A kind of balance.",
        },
        basarisizSonuc: {
          mesaj: "The silence gnawed at you more this time.",
          detay: "Habit doesn't always bring peace.",
        },
      },
    ],
  },

  evl_ms_kayinvalide_baskisi: {
    baslik: "The Mother-in-Law's Visit",
    metin:
      "Your spouse's mother arrives unannounced and 'fixes' the house: wrong curtains, unsalted food, you're not 'noble' enough. {es} watches silently.",
    secenekler: [
      {
        metin: "Draw a firm but polite boundary.",
        basariliSonuc: {
          mesaj:
            "You spoke kindly but firmly. {es} looked at you with gratitude.",
          detay: "Defending a spouse outweighs a hug.",
        },
        basarisizSonuc: {
          mesaj: "Your mother-in-law fumed and called you disrespectful all over town.",
          detay: "Some families never forgive criticism.",
        },
      },
      {
        metin: "Stay silent, endure, keep the peace.",
        basariliSonuc: {
          mesaj: "You gave in to everything. The house stayed quiet; your anger grew.",
          detay: "Some peace is a suppressed storm.",
        },
        basarisizSonuc: {
          mesaj: "Enduring wasn't enough; she humiliated you once more on her way out.",
          detay: "Submission doesn't always work.",
        },
      },
    ],
  },

  evl_ms_saray_entrikasina_cekilme: {
    baslik: "The Family's Game",
    metin:
      "Your spouse's family wants your signature on a secret alliance against a rival family. Refusing isolates you; signing is dangerous.",
    secenekler: [
      {
        metin: "Sign, show loyalty to the family.",
        basariliSonuc: {
          mesaj: "You signed. {es} looked at you with real appreciation at last.",
          detay: "Love is sometimes won by loyalty.",
        },
        basarisizSonuc: {
          mesaj: "The plan leaked; the rival family came for you. You paid dearly.",
          detay: "The in-law usually pays the price.",
        },
      },
      {
        metin: "Refuse politely, stay out of it.",
        basariliSonuc: {
          mesaj: "You refused; {es} was unforgiving and the family branded you weak.",
          detay: "Even a right refusal has a price.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal wounded the family; {es} has grown even more distant.",
          detay: "Closed doors rarely reopen.",
        },
      },
    ],
  },

  evl_ms_ev_ici_gerilim: {
    baslik: "A Fight Over Protocol",
    metin:
      "At a reception {es} humiliated you before everyone for using the 'wrong' word. Back home, your anger boils.",
    secenekler: [
      {
        metin: "Shout back, match their harshness.",
        basariliSonuc: {
          mesaj:
            "You both shouted, neither backed down. Open war replaces silent anger.",
          detay: "Some marriages breathe through fights.",
        },
        basarisizSonuc: {
          mesaj: "The fight turned ugly; {es} refused to share a table with you again.",
          detay: "Some words can't be taken back.",
        },
      },
      {
        metin: "Back down, learn the protocol.",
        basariliSonuc: {
          mesaj: "You apologized and tried to learn. {es} appreciated it, this time.",
          detay: "Some victories come by stepping back.",
        },
        basarisizSonuc: {
          mesaj: "You tried, but {es} stayed distant; it wasn't enough.",
          detay: "Effort isn't always rewarded at once.",
        },
      },
    ],
  },

  evl_ms_es_kotu_soz_yayiyor: {
    baslik: "The Palace's Whispers",
    metin:
      "The coldness has turned to revenge: {es} tells their circle humiliating, half-invented stories about you.",
    secenekler: [
      {
        metin: "Confront them, demand answers.",
        basariliSonuc: {
          mesaj: "The confrontation was harsh, but {es} promised to stop spreading it.",
          detay: "Some wars end with plain speech.",
        },
        basarisizSonuc: {
          mesaj: "It turned into a fight; {es} stubbornly fed the gossip.",
          detay: "Some fires grow when confronted.",
        },
      },
      {
        metin: "Ignore it, repair your name another way.",
        basariliSonuc: {
          mesaj: "You never answered; your circle saw the truth themselves.",
          detay: "Silence is sometimes the strongest answer.",
        },
        basarisizSonuc: {
          mesaj: "Your silence read as guilt; the gossip grew a while longer.",
          detay: "Ignoring it may not work.",
        },
      },
    ],
  },

  evl_ms_para_kaciriyor: {
    baslik: "The Shrinking Coffer",
    metin:
      "The accounts didn't add up. {es} denied it, then admitted secretly sending money to their family in case they leave you.",
    secenekler: [
      {
        metin: "Confront them angrily, demand it back.",
        basariliSonuc: {
          mesaj:
            "After a harsh row you got some back; the trust is gone.",
          detay: "Lost trust is never fully mended.",
        },
        basarisizSonuc: {
          mesaj:
            "{es}: 'You never made me feel safe.' The fight grew; the money stayed gone.",
          detay: "Some reckonings only open new wounds.",
        },
      },
      {
        metin: "Accept it quietly, save in secret.",
        basariliSonuc: {
          mesaj: "You said nothing and began hiding your own share. Two separate coffers now.",
          detay: "This silence is postponement, not peace.",
        },
        basarisizSonuc: {
          mesaj: "Your silence emboldened them; they siphoned far more this time.",
          detay: "Ignored behavior comes back bigger.",
        },
      },
    ],
  },

  evl_ms_rakibe_sir_sizdirma: {
    baslik: "The Whisper of Betrayal",
    metin:
      "{rakip} talks as if they know your private plans; only {es} could know. Your hurt spouse gave away your cards.",
    secenekler: [
      {
        metin: "Accuse {es} outright, demand answers.",
        basariliSonuc: {
          mesaj:
            "They tried to deny it, but guilt gave them away. You trust them no more.",
          detay: "Some betrayals are never forgotten.",
        },
        basarisizSonuc: {
          mesaj: "They denied it and called you paranoid; your reputation suffered too.",
          detay: "Unproven accusations backfire.",
        },
      },
      {
        metin: "Quietly change plans, never trust fully.",
        basariliSonuc: {
          mesaj: "You shared no key plans again; your rival never regained the edge.",
          detay: "Some lessons are bitter but lasting.",
        },
        basarisizSonuc: {
          mesaj: "Your caution came late; your rival used your secrets again.",
          detay: "Once trust breaks, caution may not be enough.",
        },
      },
    ],
  },

  evl_ms_es_destegi_toplum: {
    baslik: "A Silent Alliance",
    metin:
      "Your cold marriage has grown into respect. {es} offers to bring influential people from their circle together for you.",
    secenekler: [
      {
        metin: "Accept, build a network together.",
        basariliSonuc: {
          mesaj: "{es} introduced you as a full partner. Doors opened one by one.",
          detay: "Respect can forge alliances too.",
        },
        basarisizSonuc: {
          mesaj: "Some still see you as an outsider, but {es}'s effort wasn't wasted.",
          detay: "Some doors open slowly, but they open.",
        },
      },
      {
        metin: "Refuse politely, go your own way.",
        basariliSonuc: {
          mesaj: "You chose to build success yourself; {es} respected your independence.",
          detay: "Refused support still leaves a bond.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal offended a little, but it wasn't dwelt on.",
          detay: "Every no leaves a small mark.",
        },
      },
    ],
  },

  evl_ms_saraya_tanitma: {
    baslik: "The Palace Gate",
    metin:
      "{es} offers to introduce you to their family's palace circle at a formal ceremony. Despite the distance, it's their first real gesture.",
    secenekler: [
      {
        metin: "Accept, attend the ceremony together.",
        basariliSonuc: {
          mesaj: "You were received with respect beside {es}. The marriage opened a door.",
          detay: "Even loveless gestures forge bonds.",
        },
        basarisizSonuc: {
          mesaj: "You blundered on protocol; {es} awkwardly overlooked it.",
          detay: "New worlds take time.",
        },
      },
      {
        metin: "Refuse politely; you don't belong there.",
        basariliSonuc: {
          mesaj: "You refused; {es} understood but never offered again.",
          detay: "A missed door stays shut long.",
        },
        basarisizSonuc: {
          mesaj: "{es} was stunned: 'I was trying to give you a chance,' they said, hurt.",
          detay: "Refused kindness hurts.",
        },
      },
    ],
  },

  evl_ms_es_trip_atma: {
    baslik: "A Swell of Pride",
    metin:
      "A servant used the 'wrong' title, so {es} staged a drama: feigned a faint, then leapt up and scolded everyone.",
    secenekler: [
      {
        metin: "Smile, calm things, send everyone off.",
        basariliSonuc: {
          mesaj: "You calmed them with a joke. {es} soon laughed at themselves.",
          detay: "Some storms break with a laugh.",
        },
        basarisizSonuc: {
          mesaj: "The drama dragged on half an hour; you bit your lip not to laugh.",
          detay: "Some shows end at their own pace.",
        },
      },
      {
        metin: "Watch, don't react, wait it out.",
        basariliSonuc: {
          mesaj: "You watched quietly. They calmed down and went back to tea.",
          detay: "Some storms die down alone.",
        },
        basarisizSonuc: {
          mesaj: "Your indifference provoked {es}: 'Is watching me fun?'",
          detay: "Non-reaction is a reaction.",
        },
      },
    ],
  },

  evl_ms_es_hastaligi_soguk_bakim: {
    baslik: "A Stranger Falls Ill",
    metin:
      "{es} lies burning with fever. Despite the distance, seeing them lie there alone stirs something in you.",
    secenekler: [
      {
        metin: "Keep vigil yourself, show real care.",
        basariliSonuc: {
          mesaj:
            "You kept vigil for nights. Recovered, {es} truly thanked you for the first time.",
          detay: "Closeness is born in sickbed nights.",
        },
        basarisizSonuc: {
          mesaj: "You did all you could; recovery was slow, but they noticed.",
          detay: "Effort isn't wasted, just slow.",
        },
      },
      {
        metin: "Hire the best physician, return to work.",
        basariliSonuc: {
          mesaj: "The physician did his job and {es} recovered; the distance stayed.",
          detay: "Duty done, heart unwon.",
        },
        basarisizSonuc: {
          mesaj: "The physician fell short. {es} recovered but resents you didn't come.",
          detay: "Money can't replace presence.",
        },
      },
    ],
  },

  evl_ms_bosanma_baskisi: {
    baslik: "The Family's Last Word",
    metin:
      "Your spouse's family sent a formal letter: your coldness 'stains the family'. The marriage must end or be thoroughly repaired.",
    secenekler: [
      {
        metin: "Try one last time to mend it.",
        basariliSonuc: {
          mesaj:
            "Unexpectedly it worked; {es} saw your effort and softened.",
          detay: "Some ice thaws at the last moment.",
        },
        basarisizSonuc: {
          mesaj:
            "Your effort fell short; the family annulled it. You're the rejected one in town.",
          detay: "Some bridges are noticed too late.",
        },
      },
      {
        metin: "Agree, ask for a dignified parting.",
        basariliSonuc: {
          mesaj: "You parted by agreement. Status shaken, but the choice was yours.",
          detay: "Some partings are a release.",
        },
        basarisizSonuc: {
          mesaj: "It became an ugly fight over fortune; you lost money and reputation.",
          detay: "Even inevitable endings hurt.",
        },
      },
    ],
  },

  evl_ms_yaslanan_es_bakimi: {
    baslik: "The Age Between",
    metin:
      "The age gap shows: {es} is aging far faster, some days unable to leave bed. Caring for them is now a large part of your life.",
    secenekler: [
      {
        metin: "Care patiently, stay by their side.",
        basariliSonuc: {
          mesaj:
            "Your patience eased {es}'s last years; the marriage became true devotion.",
          detay: "Some love comes late but deep.",
        },
        basarisizSonuc: {
          mesaj: "You did what you could, but exhaustion wore you down.",
          detay: "Caregiving sometimes consumes the carer.",
        },
      },
      {
        metin: "Hire a carer, carry on with your life.",
        basariliSonuc: {
          mesaj: "You hired a carer; your health held, but {es} felt lonely.",
          detay: "Practical solutions have a price.",
        },
        basarisizSonuc: {
          mesaj: "The carer neglected them; {es} felt abandoned.",
          detay: "Money doesn't ease every conscience.",
        },
      },
    ],
  },

  evl_ms_cocuklarina_soguk: {
    baslik: "A Distant Parent",
    metin:
      "{es} keeps the same distance from {cocuk}: rarely plays, rarely hugs. Your child asks: 'Doesn't my parent love me?'",
    secenekler: [
      {
        metin: "Make up the gap, give double love.",
        basariliSonuc: {
          mesaj: "You gave the child warmth; its trust softened your spouse's absence.",
          detay: "One parent can fill some gaps.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't fill every gap alone; exhaustion wore you down.",
          detay: "Love for two weighs heavy on one.",
        },
      },
      {
        metin: "Talk to your spouse, ask them to try.",
        basariliSonuc: {
          mesaj: "{es} surprisingly agreed; they now spend time with the child, clumsily.",
          detay: "Parenting is learned, even late.",
        },
        basarisizSonuc: {
          mesaj: "{es} resented the blame: 'I was raised this way,' and closed the subject.",
          detay: "Some patterns resist breaking.",
        },
      },
    ],
  },

  evl_ms_beklenmedik_yakinlik: {
    baslik: "Warmth That Came Years Later",
    metin:
      "One evening {es} took your hand: 'Marrying you was a calculation, but now I truly care.' Years of coldness melted.",
    secenekler: [
      {
        metin: "Open your heart, answer sincerely.",
        basariliSonuc: {
          mesaj:
            "Two calculating people realized, years on, that they loved each other.",
          detay: "Some loves begin with years.",
        },
        basarisizSonuc: {
          mesaj: "You answered, but old shyness lingers; still, a beginning.",
          detay: "Some change comes step by step.",
        },
      },
      {
        metin: "Stay cautious, don't trust the years of distance.",
        basariliSonuc: {
          mesaj: "You stayed cautious; {es} wasn't hurt, but the magic faded.",
          detay: "Some chances slip through caution.",
        },
        basarisizSonuc: {
          mesaj: "Your coldness hurt {es}: 'I'll never open up this much again.'",
          detay: "A closed door stays shut long.",
        },
      },
    ],
  },

  evl_mt_disgorunum_alay: {
    baslik: "In the Language of the Marketplace",
    metin:
      "In the market, a few people mocked your spouse's looks within earshot, then snickered. {es} heard it all.",
    secenekler: [
      {
        metin: "Rebuke them publicly, defend your spouse.",
        basariliSonuc: {
          mesaj: "You spoke up; no one will mock them again. {es} looked at you with gratitude.",
          detay: "Loyalty is proven by courage.",
        },
        basarisizSonuc: {
          mesaj: "The fight turned ugly; the crowd kept mocking you both.",
          detay: "Some fights end unwon.",
        },
      },
      {
        metin: "Ignore it, don't make a scene.",
        basariliSonuc: {
          mesaj: "You didn't react; the crowd got bored and moved on.",
          detay: "Unfed fires die.",
        },
        basarisizSonuc: {
          mesaj: "{es} read your silence as agreeing with them, and was deeply hurt.",
          detay: "Silence can feel like betrayal.",
        },
      },
    ],
  },

  evl_mt_kayinpeder_is_ortakligi: {
    baslik: "The Father-in-Law's Offer",
    metin:
      "Your father-in-law wants you as a business partner, but you'd share most decisions with him. Give up your independence?",
    secenekler: [
      {
        metin: "Accept, join the partnership.",
        basariliSonuc: {
          mesaj:
            "Partnership signed; he meddles in everything, but your coffer is full.",
          detay: "Growth costs independence.",
        },
        basarisizSonuc: {
          mesaj: "The partnership soured; your father-in-law made clear he finds you inadequate.",
          detay: "Some partnerships please one side.",
        },
      },
      {
        metin: "Refuse politely, stay independent.",
        basariliSonuc: {
          mesaj: "You stayed your own way; he took offense, but {es} respected it.",
          detay: "Some no's beat the best yes.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal hurt the family; {es} sulked: 'You look down on mine.'",
          detay: "Right decisions get misread.",
        },
      },
    ],
  },

  evl_mt_ev_ici_kavga: {
    baslik: "A Fight Over the Ledger",
    metin:
      "A sharp row with {es} over household spending: who spent what, whose money is whose. Your voice rises.",
    secenekler: [
      {
        metin: "Come out hard, defend your share.",
        basariliSonuc: {
          mesaj: "You won; the accounts were fixed. But {es} won't forget your harshness.",
          detay: "Some victories cost dearly.",
        },
        basarisizSonuc: {
          mesaj: "The fight grew; {es} went to stay with their family a while.",
          detay: "Rows become family visits overnight.",
        },
      },
      {
        metin: "Back down, seek a compromise.",
        basariliSonuc: {
          mesaj: "You conceded and reworked the accounts together. The house calmed.",
          detay: "Compromise costs coin, buys peace.",
        },
        basarisizSonuc: {
          mesaj: "You conceded, but {es} said it wasn't enough.",
          detay: "Not every compromise is returned.",
        },
      },
    ],
  },

  evl_mt_para_kaciriyor: {
    baslik: "The Secret Ledger",
    metin:
      "Tidying the storehouse, you found a hidden ledger in {es}'s name. For years they've been siphoning joint funds.",
    secenekler: [
      {
        metin: "Confront them, have the account closed.",
        basariliSonuc: {
          mesaj:
            "The account closed, the money returned. But {es} couldn't meet your eyes.",
          detay: "Trust can't be bought back.",
        },
        basarisizSonuc: {
          mesaj: "{es}: 'This money came with me anyway.' The fight exploded.",
          detay: "'Whose money' is never settled.",
        },
      },
      {
        metin: "Watch quietly, take your own precautions.",
        basariliSonuc: {
          mesaj: "You said nothing but separated your share. Two accounts now.",
          detay: "This silence is strategy, not peace.",
        },
        basarisizSonuc: {
          mesaj: "Your silence emboldened them; they siphoned far more.",
          detay: "Ignored behavior comes back bigger.",
        },
      },
    ],
  },

  evl_mt_es_dedikodu_yapiyor: {
    baslik: "The Bazaar's Gossip",
    metin:
      "Rumor in the bazaar: {es} says your trade has sunk and you're in debt. None true, but your reputation suffers.",
    secenekler: [
      {
        metin: "Confront them, ask why.",
        basariliSonuc: {
          mesaj: "They admitted: 'Maybe I wanted you to hurt.' Bitter, but you know why.",
          detay: "Resentment sometimes comes out as gossip.",
        },
        basarisizSonuc: {
          mesaj: "They denied it and called you paranoid; your name suffered again.",
          detay: "Confrontation sometimes feeds the fire.",
        },
      },
      {
        metin: "Show everyone your trade's true state.",
        basariliSonuc: {
          mesaj: "You opened your ledgers; the gossip died. {es} resented being disproved.",
          detay: "Saving face costs you at home.",
        },
        basarisizSonuc: {
          mesaj: "Some stayed doubtful, and {es} felt humiliated before all.",
          detay: "Some fixes satisfy no one.",
        },
      },
    ],
  },

  evl_mt_ticaret_sirrini_rakibe_satiyor: {
    baslik: "Sold Secrets",
    metin:
      "{rakip} acts as if they know your secret trade plans. Only one explanation: your hurt spouse sold them for gold.",
    secenekler: [
      {
        metin: "Consider throwing {es} out; settle it harshly.",
        basariliSonuc: {
          mesaj:
            "They confessed; you confronted them in anger. This is no longer a matter of trust.",
          detay: "Some betrayals end marriages.",
        },
        basarisizSonuc: {
          mesaj: "They denied it and called you overly suspicious; your name suffered too.",
          detay: "Unproven accusations backfire.",
        },
      },
      {
        metin: "Quietly change strategy, say nothing.",
        basariliSonuc: {
          mesaj: "You hid key plans from them. Your rival never gained the edge again.",
          detay: "Some lessons are bitter but lasting.",
        },
        basarisizSonuc: {
          mesaj: "Your precaution fell short; your rival stayed a step ahead.",
          detay: "Broken trust outlasts caution.",
        },
      },
    ],
  },

  evl_mt_ticarete_destek: {
    baslik: "A Shared Capital",
    metin:
      "{es} offers to add capital from their family to your business: 'This is as much my business as yours now.'",
    secenekler: [
      {
        metin: "Accept, pool your capital.",
        basariliSonuc: {
          mesaj: "You pooled capital. The business grew; you built it together.",
          detay: "Some marriages become partnerships.",
        },
        basarisizSonuc: {
          mesaj: "The investment grew less than hoped, but you tried together.",
          detay: "Sometimes effort matters, not results.",
        },
      },
      {
        metin: "Refuse politely, use your own capital.",
        basariliSonuc: {
          mesaj: "You chose to stand alone; {es} saw pride and respected it.",
          detay: "Independence doesn't diminish love.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal saddened {es}: 'You don't see me as a partner.'",
          detay: "Kind refusals get misread too.",
        },
      },
    ],
  },

  evl_mt_ozen_gostermesi: {
    baslik: "Beyond Appearance",
    metin:
      "In a hard time {es} sat by you for nights, asking nothing. Your old 'just for the money' thought now seems meaningless.",
    secenekler: [
      {
        metin: "Notice the tenderness, thank them sincerely.",
        basariliSonuc: {
          mesaj: "Your thanks were sincere and {es} felt it. Perhaps you're building something deeper.",
          detay: "Beauty is seen through time, not eyes.",
        },
        basarisizSonuc: {
          mesaj: "You thanked them, but haven't yet absorbed the change.",
          detay: "Prejudice doesn't dissolve in a day.",
        },
      },
      {
        metin: "Stay distant, keep your habit.",
        basariliSonuc: {
          mesaj: "You kept your distance; {es} wasn't hurt, but you spoiled the moment.",
          detay: "Some chances slip through caution.",
        },
        basarisizSonuc: {
          mesaj: "Your coldness hurt {es}: 'This is too much.'",
          detay: "Unanswered kindness burns out.",
        },
      },
    ],
  },

  evl_mt_kiskanclik_tripi: {
    baslik: "A Sudden Burst of Jealousy",
    metin:
      "Chatting with a customer, {es} cut in and slammed a tray down: 'Why are you laughing so much with them?!' The shop fell silent.",
    secenekler: [
      {
        metin: "Pull them aside, calm them gently.",
        basariliSonuc: {
          mesaj: "You calmed them. Beneath the jealousy was fear of losing you.",
          detay: "Some tantrums are love confessions.",
        },
        basarisizSonuc: {
          mesaj: "Despite your effort, the scene was gossip in the shop for days.",
          detay: "Some scenes aren't forgotten.",
        },
      },
      {
        metin: "Show them they embarrassed you, publicly.",
        basariliSonuc: {
          mesaj: "A hard look silenced them. The scene ended, but {es} went home hurt.",
          detay: "Some victories are paid for at home.",
        },
        basarisizSonuc: {
          mesaj: "Your reaction escalated it; you shouted at each other mid-shop.",
          detay: "Some moments worsen with intervention.",
        },
      },
    ],
  },

  evl_mt_saglik_sorunu: {
    baslik: "A Weak Body",
    metin:
      "{es} has been frail since birth; this winter brings illness after illness. A good physician is needed, but costly.",
    secenekler: [
      {
        metin: "Hire the best physician, spare no cost.",
        basariliSonuc: {
          mesaj: "The physician came regularly; {es}'s health recovered. They valued the care.",
          detay: "Some care truly unites a marriage.",
        },
        basarisizSonuc: {
          mesaj: "Recovery was slow despite the physician; you did your best.",
          detay: "Not every effort pays at once.",
        },
      },
      {
        metin: "Make do with home remedies.",
        basariliSonuc: {
          mesaj: "Luck held; home remedies sufficed this time.",
          detay: "Sometimes thrift goes unpunished.",
        },
        basarisizSonuc: {
          mesaj: "{es}'s condition worsened; hurt, they said: 'You have the money but don't care.'",
          detay: "Some thrift costs dearly.",
        },
      },
    ],
  },

  evl_mt_bosanma_riski: {
    baslik: "The End of a Partnership",
    metin:
      "Mistrust has spread to your business; {es}'s family threatens to withdraw capital and hints the marriage is over.",
    secenekler: [
      {
        metin: "Try one last compromise to save the capital.",
        basariliSonuc: {
          mesaj: "A last-minute compromise: capital stayed, the fragile marriage goes on.",
          detay: "Some bonds recover one more time.",
        },
        basarisizSonuc: {
          mesaj: "The compromise collapsed; capital and spouse gone. Your business name suffered.",
          detay: "A cracked partnership never fully mends.",
        },
      },
      {
        metin: "Accept amicable separation, limit the loss.",
        basariliSonuc: {
          mesaj: "You parted by agreement; a loss, but a dignified one.",
          detay: "Calm endings leave fewer marks.",
        },
        basarisizSonuc: {
          mesaj: "Even the deal became a fight; both smeared each other around town.",
          detay: "Some partings flare however calmly planned.",
        },
      },
    ],
  },

  evl_mt_ceyiz_kavgasi: {
    baslik: "A Fight Over the Dowry",
    metin:
      "Your father-in-law still hasn't paid part of the promised dowry and keeps making excuses. {es} is stuck in the middle.",
    secenekler: [
      {
        metin: "Talk to him directly, demand what's yours.",
        basariliSonuc: {
          mesaj: "You got your due, but he won't forget it; {es} is worn from the middle.",
          detay: "Even fair demands carry a price.",
        },
        basarisizSonuc: {
          mesaj: "He called you greedy; {es} left the quarrel exhausted.",
          detay: "Some demands come at the wrong time.",
        },
      },
      {
        metin: "Let it go, spare {es} the middle.",
        basariliSonuc: {
          mesaj: "You let it go; {es} saw you take their side over family for the first time.",
          detay: "Some surrenders are the greatest gains.",
        },
        basarisizSonuc: {
          mesaj: "You let it go, but a resentment remained.",
          detay: "Even right choices sting a little.",
        },
      },
    ],
  },

  evl_mt_cocuk_disgorunum_alay: {
    baslik: "Your Child Mocked",
    metin:
      "Neighborhood kids mocked {cocuk} for a trait resembling your spouse; {cocuk} came home crying. What do you do?",
    secenekler: [
      {
        metin: "Sit with your child, build their confidence.",
        basariliSonuc: {
          mesaj: "After a long talk {cocuk} smiled: 'I'm happy being me.'",
          detay: "Some wounds heal through talk.",
        },
        basarisizSonuc: {
          mesaj: "You talked, but {cocuk} is still sad; it won't pass in a day.",
          detay: "Some wounds need time.",
        },
      },
      {
        metin: "Confront the mocking children's families.",
        basariliSonuc: {
          mesaj: "You got apologies, but the neighborhood calls you overreactive.",
          detay: "Some victories carry a small price.",
        },
        basarisizSonuc: {
          mesaj: "The families found you wrong; the row grew and you're the talk of the block.",
          detay: "Some reckonings backfire.",
        },
      },
    ],
  },

  evl_mt_yeni_is_firsati_agir_sart: {
    baslik: "An Opportunity With Heavy Conditions",
    metin:
      "Your spouse's family offers a huge opportunity, on one condition: give up your independence and join their trade network entirely.",
    secenekler: [
      {
        metin: "Accept, join the great network.",
        basariliSonuc: {
          mesaj: "You joined the network; earnings multiplied, but every decision goes through them.",
          detay: "Growth costs freedom.",
        },
        basarisizSonuc: {
          mesaj: "The gains never came; the family made clear they find you inadequate.",
          detay: "Some opportunities aren't as bright as they look.",
        },
      },
      {
        metin: "Refuse, continue independently.",
        basariliSonuc: {
          mesaj: "You refused; you keep growing, small but entirely your own.",
          detay: "Small freedom beats big dependence.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal hurt the family; {es} sulked: 'It mattered to my family.'",
          detay: "Right decisions get misread.",
        },
      },
    ],
  },

  evl_mt_gercek_ask_kesfi: {
    baslik: "A Truth Beyond Appearance",
    metin:
      "Years on, you no longer notice {es}'s looks, only them: patient, loyal, someone who truly knows you. You want to say so.",
    secenekler: [
      {
        metin: "Say it openly, open your heart.",
        basariliSonuc: {
          mesaj:
            "{es} wept: 'I waited years to hear this.' A story begun for gain became love.",
          detay: "Some loves are born of years of loyalty.",
        },
        basarisizSonuc: {
          mesaj: "Your words came out clumsy; still, {es} understood.",
          detay: "Imperfect confessions are still precious.",
        },
      },
      {
        metin: "Keep it in, show it but don't say it.",
        basariliSonuc: {
          mesaj: "You didn't say it, but your actions did; {es} felt it quietly.",
          detay: "Some love is understood without words.",
        },
        basarisizSonuc: {
          mesaj: "You held back; the moment stayed an unsaid sentence.",
          detay: "Some silences turn to regret.",
        },
      },
    ],
  },

  evl_ask_yoksulluk_kavgasi: {
    baslik: "Empty Coffer, Full Nerves",
    metin:
      "Month's end, the coffer nearly empty. A real money fight with {es}, the first: 'Love doesn't feed a belly!'",
    secenekler: [
      {
        metin: "Shout back, vent your stress.",
        basariliSonuc: {
          mesaj: "You shouted and felt lighter, but saw {es}'s hurt.",
          detay: "Relief sometimes costs someone else.",
        },
        basarisizSonuc: {
          mesaj: "It turned ugly; you said truly cutting words for the first time.",
          detay: "Words can wound love too.",
        },
      },
      {
        metin: "Hug them, find a solution together.",
        basariliSonuc: {
          mesaj: "You hugged, cried, laughed. Still no money, but closer.",
          detay: "Love lightens poverty.",
        },
        basarisizSonuc: {
          mesaj: "A hug wasn't enough; the problem lingers like a shadow.",
          detay: "A hug doesn't fix it, but eases it.",
        },
      },
    ],
  },

  evl_ask_aile_onaylamiyor: {
    baslik: "The Door That Won't Close",
    metin:
      "Your family still rejects the marriage; at the holiday your mother snubbed {es}. {es} ignores it, but the hurt shows.",
    secenekler: [
      {
        metin: "Speak firmly to your family, defend your choice.",
        basariliSonuc: {
          mesaj: "You laid it out plainly. {es} felt your full backing for the first time.",
          detay: "Loyalty tests even blood ties.",
        },
        basarisizSonuc: {
          mesaj: "It turned to a fight; family ties strained and {es} felt guilty.",
          detay: "Some defenses wound both sides.",
        },
      },
      {
        metin: "Be patient, wait for them to accept.",
        basariliSonuc: {
          mesaj: "You waited; the family softened and invited {es} to the holiday table.",
          detay: "Acceptance can't be rushed.",
        },
        basarisizSonuc: {
          mesaj: "Your patience felt to {es} like 'you don't defend me enough'.",
          detay: "Patience is mistaken for passivity.",
        },
      },
    ],
  },

  evl_ask_kiskanclik_rakip: {
    baslik: "Wandering Eyes",
    metin:
      "{rakip} shows {es} too much interest: 'coincidentally' everywhere, over-flattering. {es} is uneasy and you feel jealous.",
    secenekler: [
      {
        metin: "Talk to {rakip}, draw the line.",
        basariliSonuc: {
          mesaj: "You drew the line. {es} felt protected; {rakip} stayed away.",
          detay: "Draw boundaries with love, not anger.",
        },
        basarisizSonuc: {
          mesaj: "It turned tense; {rakip} took it as a challenge.",
          detay: "Some confrontations pour fuel on fire.",
        },
      },
      {
        metin: "Trust {es}, don't intervene.",
        basariliSonuc: {
          mesaj: "You trusted; {es}: 'Thanks for believing me.' {rakip} gave up in time.",
          detay: "Trust strengthens more than jealousy.",
        },
        basarisizSonuc: {
          mesaj: "You trusted, but jealousy wore you out for days.",
          detay: "Showing trust isn't easy.",
        },
      },
    ],
  },

  evl_ask_es_kotu_soz_yayiyor: {
    baslik: "Words of a Dying Fire",
    metin:
      "{es}, who once praised you, tells their circle: 'Marrying them was my life's mistake, we were always broke.' It reached you.",
    secenekler: [
      {
        metin: "Confront them, ask how they feel.",
        basariliSonuc: {
          mesaj: "A hard talk; {es} admitted regret: 'I said it in anger.'",
          detay: "Confrontation hurts but heals.",
        },
        basarisizSonuc: {
          mesaj: "{es} didn't retreat: 'Maybe I truly regret it.' It broke your heart.",
          detay: "Some truths are too heavy to hear.",
        },
      },
      {
        metin: "Pretend not to hear, let it go.",
        basariliSonuc: {
          mesaj: "You let it go; the rumor faded, but a thorn stayed.",
          detay: "Some words aren't forgotten in silence.",
        },
        basarisizSonuc: {
          mesaj: "The rumor gnawed at you; you withdrew for days.",
          detay: "Some silences bleed like wounds.",
        },
      },
    ],
  },

  evl_ask_para_kaciriyor: {
    baslik: "Fleeing Hope",
    metin:
      "Poverty has worn your love so thin that {es} secretly hoards money, maybe to leave one day. You found out by chance.",
    secenekler: [
      {
        metin: "Confront them, ask what's going on.",
        basariliSonuc: {
          mesaj: "They wept: 'I didn't want to leave, I was scared.' Tested, but unbroken.",
          detay: "Confessed fears lighten.",
        },
        basarisizSonuc: {
          mesaj: "It ended everything. {es} left that night with the money.",
          detay: "Some loves end in confrontation.",
        },
      },
      {
        metin: "Ignore it, try to save the relationship.",
        basariliSonuc: {
          mesaj: "You said nothing, telling yourself every bond has an escape plan.",
          detay: "Some silences hold a bond up.",
        },
        basarisizSonuc: {
          mesaj: "Your silence emboldened them; they hid far more this time.",
          detay: "Ignored fears return bigger.",
        },
      },
    ],
  },

  evl_ask_rakibe_sir_soyleme: {
    baslik: "The Price of Hurt",
    metin:
      "After your last fight, {es} angrily told {rakip} your most private plans. Now {rakip} is a step ahead.",
    secenekler: [
      {
        metin: "Don't hide your anger, blame {es}.",
        basariliSonuc: {
          mesaj: "You showed your anger. {es} was sorry, but the damage was done; a crack formed.",
          detay: "Anger breeds words that can't be unsaid.",
        },
        basarisizSonuc: {
          mesaj: "The row grew; {es} slammed the door: 'I was never happy anyway.'",
          detay: "Anger breeds greater anger.",
        },
      },
      {
        metin: "Forgive, admit you both acted in anger.",
        basariliSonuc: {
          mesaj: "You forgave. {es} never forgot and never shared secrets in anger again.",
          detay: "Forgiveness strengthens a bond at its root.",
        },
        basarisizSonuc: {
          mesaj: "You forgave, but your rival used your plans to stay ahead.",
          detay: "Forgiveness doesn't restore losses.",
        },
      },
    ],
  },

  evl_ask_moral_destegi: {
    baslik: "The Light Beside You",
    metin:
      "Business is bad and your spirits are low. But every evening {es} greets you so warmly that you rise again next day.",
    secenekler: [
      {
        metin: "Lean on their support, regain strength.",
        basariliSonuc: {
          mesaj: "With {es}'s support you refocused; your affairs began to recover.",
          detay: "Some loves out-earn any investment.",
        },
        basarisizSonuc: {
          mesaj: "Support was lovely but things haven't mended; at least you're not alone.",
          detay: "Some support gives strength, not results.",
        },
      },
      {
        metin: "Hide your feelings to spare them.",
        basariliSonuc: {
          mesaj: "{es} noticed and was saddened: 'You can rely on me.'",
          detay: "Some protection creates distance.",
        },
        basarisizSonuc: {
          mesaj: "The hidden burden grew; you felt even more alone.",
          detay: "Unshared burdens weigh more.",
        },
      },
    ],
  },

  evl_ask_hastalikta_fedakarlik: {
    baslik: "By Your Side",
    metin:
      "You fell gravely ill and can't afford a physician. {es} is ready to spend their last coin and keep vigil for nights.",
    secenekler: [
      {
        metin: "Accept the sacrifice, show gratitude.",
        basariliSonuc: {
          mesaj:
            "{es}'s love beat the costliest physician; you recovered and grew closer.",
          detay: "Some healing comes from love.",
        },
        basarisizSonuc: {
          mesaj: "You didn't fully recover, but {es}'s presence comforted you.",
          detay: "Every effort means something.",
        },
      },
      {
        metin: "Refuse, don't let them spend their money.",
        basariliSonuc: {
          mesaj: "You refused; {es} was hurt: 'Count me in this marriage too.'",
          detay: "Some protection feels like rejection.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal blocked their help; recovery dragged on.",
          detay: "Pride delays healing.",
        },
      },
    ],
  },

  evl_ask_es_trip_atma: {
    baslik: "The Theater of Jealousy",
    metin:
      "A neighbor praised you, and {es} stormed off crying 'So I'm not enough!', then cracked the door: 'Don't you care?!'",
    secenekler: [
      {
        metin: "Follow smiling, soothe them with a joke.",
        basariliSonuc: {
          mesaj: "'You're my only shortcoming,' you said; you both laughed.",
          detay: "Some fits melt with a laugh.",
        },
        basarisizSonuc: {
          mesaj: "The joke fell flat and they sulked a bit, briefly.",
          detay: "Some jokes come late.",
        },
      },
      {
        metin: "Leave them be, let it pass.",
        basariliSonuc: {
          mesaj: "Half an hour later they returned to the table as if nothing happened.",
          detay: "Some storms die at their own pace.",
        },
        basarisizSonuc: {
          mesaj: "Your indifference provoked them: 'You don't even care.'",
          detay: "Non-reactions get misread.",
        },
      },
    ],
  },

  evl_ask_zenginlik_testi: {
    baslik: "The Changing Wind",
    metin:
      "You've come into real wealth for the first time in years. You recall your poor days and wonder: will {es} change?",
    secenekler: [
      {
        metin: "Recall old days, celebrate together.",
        basariliSonuc: {
          mesaj: "You celebrated old days; {es} hasn't changed, same love in their eyes.",
          detay: "Some loves outlast wealth.",
        },
        basarisizSonuc: {
          mesaj: "{es} seemed changed; they enjoy the new status.",
          detay: "Some changes show slowly.",
        },
      },
      {
        metin: "Watch quietly, see their true self.",
        basariliSonuc: {
          mesaj: "{es} stayed humble, ignoring the money. You were relieved.",
          detay: "Some tests bring trust.",
        },
        basarisizSonuc: {
          mesaj: "{es} boasted of the wealth and scorned old friends. You were disappointed.",
          detay: "Some tests reveal bitter truths.",
        },
      },
    ],
  },

  evl_ask_bosanma_riski: {
    baslik: "The Ash of a Dying Love",
    metin:
      "You two who once clung together through everything have grown strangers in poverty. {es} questions whether this marriage was a mistake.",
    secenekler: [
      {
        metin: "Remind them of your love, fight once more.",
        basariliSonuc: {
          mesaj: "You recalled your first meeting. {es} cried: 'You're right, let's not give up.'",
          detay: "Some loves keep an ember under ash.",
        },
        basarisizSonuc: {
          mesaj: "It wasn't enough. {es} left, saying 'Love doesn't fill a belly.'",
          detay: "Some loves lose to poverty.",
        },
      },
      {
        metin: "Accept it, part with dignity.",
        basariliSonuc: {
          mesaj: "You parted with a last hug, no fight. It hurts, but the memories stay clean.",
          detay: "Some endings end with respect.",
        },
        basarisizSonuc: {
          mesaj: "Old resentments erupted; you parted bitterly.",
          detay: "Even calm partings can flare.",
        },
      },
    ],
  },

  evl_ask_eski_ask_geri_donuyor: {
    baslik: "A Letter From the Past",
    metin:
      "{es}'s old love returned to the city and wrote them a letter. {es} didn't hide it, but the hesitation in their eyes frightens you.",
    secenekler: [
      {
        metin: "Trust them, let them decide.",
        basariliSonuc: {
          mesaj: "{es} tore up the letter: 'I chose long ago.' Your trust was repaid.",
          detay: "Some trust strengthens a bond.",
        },
        basarisizSonuc: {
          mesaj: "{es} went to meet their old love and never returned. Trust unrewarded.",
          detay: "Even justified trust can come to nothing.",
        },
      },
      {
        metin: "Voice your worry, question the letter.",
        basariliSonuc: {
          mesaj: "You shared your worry; {es} understood and reassured you.",
          detay: "Some fears shrink when shared.",
        },
        basarisizSonuc: {
          mesaj: "{es} was hurt: 'Don't you trust me?' A wound opened between you.",
          detay: "Some questions create distance.",
        },
      },
    ],
  },

  evl_ask_cocuk_yoksullugu: {
    baslik: "What They Can't Have",
    metin:
      "{cocuk} quietly envied a simple toy the neighbor children have, but never asked — they've learned you have no money.",
    secenekler: [
      {
        metin: "Whatever it takes, buy the toy.",
        basariliSonuc: {
          mesaj: "{cocuk}'s shining eyes were worth it. {es} quietly appreciated it too.",
          detay: "Small joys are priceless.",
        },
        basarisizSonuc: {
          mesaj: "You bought it, {cocuk} soon broke it; the smile was still real.",
          detay: "Short-lived joy is still real.",
        },
      },
      {
        metin: "Explain the truth, teach patience.",
        basariliSonuc: {
          mesaj: "{cocuk} understood: 'It's okay, Dad/Mum.' You felt proud and sad.",
          detay: "Poverty makes children grow early.",
        },
        basarisizSonuc: {
          mesaj: "{cocuk} didn't understand and sulked off. The scene lingered.",
          detay: "Some truths come too early.",
        },
      },
    ],
  },

  evl_ask_sans_eseri_miras: {
    baslik: "An Unexpected Inheritance",
    metin:
      "A distant relative of {es}, never known to you, died leaving a small but real inheritance. Your poor home finally gets breathing room.",
    secenekler: [
      {
        metin: "Spend wisely, invest in the future.",
        basariliSonuc: {
          mesaj: "You used it wisely; no more waking at night over money.",
          detay: "Well-managed luck becomes lasting peace.",
        },
        basarisizSonuc: {
          mesaj: "You missed some opportunities, but it was still a relief.",
          detay: "Not all luck is used best.",
        },
      },
      {
        metin: "Live for today, do what you've missed.",
        basariliSonuc: {
          mesaj: "A good meal, new clothes, an unforgettable day... Money melted, memories stayed.",
          detay: "Some spending invests in happiness.",
        },
        basarisizSonuc: {
          mesaj: "You overspent a bit, but no one will forget that day's laughter.",
          detay: "Some regrets are worth a laugh.",
        },
      },
    ],
  },

  evl_ask_yillar_sonra_hala_asik: {
    baslik: "The Same Look, Still",
    metin:
      "Your hair has grayed, your pockets are still thin. Yet when {es} looks at you in the evening sun, you see that first-day light.",
    secenekler: [
      {
        metin: "Take their hand, give silent thanks.",
        basariliSonuc: {
          mesaj: "You took their hand silently. This lasting love is your greatest wealth.",
          detay: "Some wealth is measured in years.",
        },
        basarisizSonuc: {
          mesaj: "Your mind was on daily worries; still, a warmth remained.",
          detay: "Peace is felt even half-surrendered.",
        },
      },
      {
        metin: "Tell them why you still love them.",
        basariliSonuc: {
          mesaj:
            "'Even penniless, I'd relive every day with you,' you said; they wept happily.",
          detay: "Some confessions outdo vows.",
        },
        basarisizSonuc: {
          mesaj: "The words came out clumsily, but they understood.",
          detay: "Imperfect words still reach.",
        },
      },
    ],
  },

  aile2_evlatlik_verme: {
    baslik: "A Rich Family's Offer",
    metin:
      "Famine grips the city, there's no bread at home. A rich, childless family offers to adopt {cocuk} and give a life you never could.",
    secenekler: [
      {
        metin: "Accept, let {cocuk} have a better life.",
        basariliSonuc: {
          mesaj: "Your hand shook as {cocuk} boarded the carriage. A full belly didn't fill the void.",
          detay: "Some sacrifices mean losing the dearest.",
        },
        basarisizSonuc: {
          mesaj: "The family broke its word; {cocuk} lived there like a servant, you later learned.",
          detay: "Good intentions can go wrong.",
        },
      },
      {
        metin: "Refuse, stay together though hungry.",
        basariliSonuc: {
          mesaj: "Days were hard, but {cocuk} woke by your side each morning. Worth the hunger.",
          detay: "Some wealth is staying together.",
        },
        basarisizSonuc: {
          mesaj: "The famine was harsh, you all weakened, but stayed together.",
          detay: "Some prices are heavy but regretless.",
        },
      },
    ],
  },

  aile2_iki_cocuk_tek_ilac: {
    baslik: "A Single Bottle of Medicine",
    metin:
      "An epidemic hit. {cocuk} burns with fever; the neighbor's orphan is brought to your door, also near death. The last medicine saves only one.",
    secenekler: [
      {
        metin: "Give it to {cocuk}, your child first.",
        basariliSonuc: {
          mesaj: "{cocuk} recovered. But burying the neighbor's child turned your joy to guilt.",
          detay: "Even right choices unsettle the conscience.",
        },
        basarisizSonuc: {
          mesaj: "The medicine wasn't enough; neither survived. The darkest night of your life.",
          detay: "Sometimes no choice is enough.",
        },
      },
      {
        metin: "Give it to the orphan, who has no one.",
        basariliSonuc: {
          mesaj: "The orphan lived. But {cocuk}'s condition worsened; you prayed nightly.",
          detay: "Some consciences risk the dearest.",
        },
        basarisizSonuc: {
          mesaj: "The orphan lived but {cocuk} died that night. You did right; your heart is in pieces.",
          detay: "Some rights demand the heaviest price.",
        },
      },
    ],
  },

  aile2_uvey_evlat_ayrimi: {
    baslik: "Two Separate Hearts",
    metin:
      "You've noticed you favor your own child over {es}'s child from a previous marriage. Your stepchild quietly senses it.",
    secenekler: [
      {
        metin: "Make a real effort, treat both equally.",
        basariliSonuc: {
          mesaj: "Your stepchild called you 'Dad/Mum' for the first time. {es} wept.",
          detay: "Some bonds are built by effort, not blood.",
        },
        basarisizSonuc: {
          mesaj: "Old habits sometimes returned; still, your direction was right.",
          detay: "Change isn't done in a day.",
        },
      },
      {
        metin: "Admit you feel closer to your own.",
        basariliSonuc: {
          mesaj: "You were honest, but {es} never forgave it: 'They're my child too.'",
          detay: "Some honesty is right but hurts.",
        },
        basarisizSonuc: {
          mesaj: "Your stepchild noticed too and never trusted you the same.",
          detay: "Children recall actions over words.",
        },
      },
    ],
  },

  aile2_ebeveyn_son_istek_baris: {
    baslik: "A Will at the Bedside",
    metin:
      "{baba} lies dying, asking you to make peace with {rakip}, whom he's long been estranged from: 'I don't want to leave you this grudge.'",
    secenekler: [
      {
        metin: "Keep your word, make peace with {rakip}.",
        basariliSonuc: {
          mesaj: "{baba} died at peace. The grudge with {rakip} was buried with him.",
          detay: "Deathbed peace is worth more.",
        },
        basarisizSonuc: {
          mesaj: "{rakip} wasn't ready; still, you told {baba} your intent.",
          detay: "Peace needs both sides.",
        },
      },
      {
        metin: "Refuse, the grudge is justified.",
        basariliSonuc: {
          mesaj: "{baba} closed his eyes in disappointment. You'll never forget that look.",
          detay: "Some pride won't bend even at a deathbed.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal grieved {baba}; he spoke your name sadly at the end.",
          detay: "Some refusals are paid for years.",
        },
      },
    ],
  },

  aile2_cocuk_agir_suc: {
    baslik: "The Confession at the Door",
    metin:
      "{cocuk} came home bloodied: they badly wounded someone in a fight. Guards search door to door. Hide them, or hand them over?",
    secenekler: [
      {
        metin: "Hide them, smuggle them out of town.",
        basariliSonuc: {
          mesaj: "You smuggled {cocuk} out. They're safe, but you fear every knock at night.",
          detay: "Protection can become lifelong fear.",
        },
        basarisizSonuc: {
          mesaj: "Guards caught you. {cocuk} escaped; you were jailed in their place.",
          detay: "Some sacrifices make you pay yourself.",
        },
      },
      {
        metin: "Persuade them to turn themselves in.",
        basariliSonuc: {
          mesaj: "{cocuk} surrendered and was sentenced. Right, yet your heart breaks at each visit.",
          detay: "Some rights require parting.",
        },
        basarisizSonuc: {
          mesaj: "{cocuk} refused to surrender and fled alone. You never heard from them again.",
          detay: "Unheeded advice is the bitterest.",
        },
      },
    ],
  },

  aile2_esin_sirri: {
    baslik: "What the Years Hid",
    metin:
      "{es} tearfully confessed: before you met, they had a secret marriage and a child. They've hidden it for years.",
    secenekler: [
      {
        metin: "Forgive them, the past doesn't matter.",
        basariliSonuc: {
          mesaj: "'Your past is your past,' you said. {es} was relieved; the bond came out stronger.",
          detay: "Some forgiveness rebuilds a marriage.",
        },
        basarisizSonuc: {
          mesaj: "You said you forgave, but the hurt sat silently at the table for days.",
          detay: "Forgiveness: easy in words, hard in heart.",
        },
      },
      {
        metin: "Say your trust is shaken, keep distance.",
        basariliSonuc: {
          mesaj: "{es} accepted they deserved it, but the house stayed icy for weeks.",
          detay: "Lost trust takes time.",
        },
        basarisizSonuc: {
          mesaj: "The distance became a chasm; {es} couldn't bear it and left.",
          detay: "Some secrets can't be saved by confession.",
        },
      },
    ],
  },

  aile2_kardes_miras_davasi: {
    baslik: "Your Sibling's Lawsuit",
    metin:
      "Your sibling sued you over the family's small property, claiming your share too. Your blood tie suffers.",
    secenekler: [
      {
        metin: "Defend it to the end, claim your right.",
        basariliSonuc: {
          mesaj: "You won and got your share. But your sibling hasn't spoken to you since.",
          detay: "Some victories shatter families.",
        },
        basarisizSonuc: {
          mesaj: "You lost the case: the costs and your sibling both.",
          detay: "In some fights no one wins.",
        },
      },
      {
        metin: "Give up your share, keep the bond.",
        basariliSonuc: {
          mesaj: "You gave up. Your sibling, stunned then ashamed, hugged you. Blood beat money.",
          detay: "Some wealth isn't measured in gold.",
        },
        basarisizSonuc: {
          mesaj: "You gave up, but your sibling thought they deserved it and never thanked you.",
          detay: "Kindness isn't always repaid.",
        },
      },
    ],
  },

  aile2_cocugun_es_secimi: {
    baslik: "A Choice You Don't Approve Of",
    metin:
      "{cocuk} wants to marry someone you distrust, with a suspicious past. You don't want to break their heart, but your instincts shout.",
    secenekler: [
      {
        metin: "Object, try to stop the marriage.",
        basariliSonuc: {
          mesaj: "You stopped it. That person proved trouble; {cocuk} is hurt but sees you were right.",
          detay: "Some vindication comes bitterly.",
        },
        basarisizSonuc: {
          mesaj: "Your objection failed; {cocuk} eloped and you heard nothing for years.",
          detay: "Obstruction can backfire.",
        },
      },
      {
        metin: "Accept, show trust, stand by them.",
        basariliSonuc: {
          mesaj: "You set doubts aside. {cocuk} never forgot; the marriage went better than expected.",
          detay: "Some trust proves right.",
        },
        basarisizSonuc: {
          mesaj: "Your worries were right; the marriage failed and {cocuk} came back to you.",
          detay: "Being right hurts too.",
        },
      },
    ],
  },

  aile2_ebeveyn_es_gecinmeme: {
    baslik: "War Under One Roof",
    metin:
      "{anne} moved in but can't get along with {es}; the house is a battlefield. You're made to choose.",
    secenekler: [
      {
        metin: "Side with spouse, rehouse your parent.",
        basariliSonuc: {
          mesaj: "You rented {anne} a separate house. {es} was relieved; you won't forget her look.",
          detay: "Some peace costs another's sorrow.",
        },
        basarisizSonuc: {
          mesaj: "Despite the separate house the fights went on; everyone was angry at you.",
          detay: "Some fixes only move the problem.",
        },
      },
      {
        metin: "Side with your parent, ask patience.",
        basariliSonuc: {
          mesaj: "You kept your mother home. {es} said they understood, but tension lingered.",
          detay: "Some loyalties have a price.",
        },
        basarisizSonuc: {
          mesaj: "{es} said 'Her or me.' You chose your mother and {es} left.",
          detay: "Some choices end a marriage.",
        },
      },
    ],
  },

  aile2_cocuk_tehlikeli_yolculuk: {
    baslik: "The Call of the Horizon",
    metin:
      "{cocuk} wants to join a dangerous, long journey (a caravan or the army). Excitement in their eyes, only fear in you.",
    secenekler: [
      {
        metin: "Allow it, let them chase their dream.",
        basariliSonuc: {
          mesaj: "A hard goodbye, but you allowed it. As letters come, it feels right.",
          detay: "Love means knowing how to let go.",
        },
        basarisizSonuc: {
          mesaj: "Bad news came. What befell {cocuk} became your greatest pain.",
          detay: "Some freedoms return at a heavy price.",
        },
      },
      {
        metin: "Object, insist they stay.",
        basariliSonuc: {
          mesaj: "They stayed, but their excitement faded; they didn't forgive you for a while.",
          detay: "Protection buries the dream too.",
        },
        basarisizSonuc: {
          mesaj: "Your objection failed; {cocuk} left without leave and stayed estranged.",
          detay: "Obstructed youths grow more determined.",
        },
      },
    ],
  },

  aile2_es_koklerinden_koparma: {
    baslik: "A New Land",
    metin:
      "A great career opportunity awaits in a distant city. But it means {es} being torn from their family and friends.",
    secenekler: [
      {
        metin: "Insist on moving, don't miss it.",
        basariliSonuc: {
          mesaj: "You moved; your career soared, but {es} spent months lonely and sad.",
          detay: "One side pays for some gains.",
        },
        basarisizSonuc: {
          mesaj: "The opportunity disappointed and {es} never settled in; you both regret it.",
          detay: "Some risks wear down both sides.",
        },
      },
      {
        metin: "Refuse, respect your spouse's roots.",
        basariliSonuc: {
          mesaj: "You refused. {es} never forgot: 'You cared about me above all.'",
          detay: "Some opportunities aren't worth a love.",
        },
        basarisizSonuc: {
          mesaj: "You refused, but the 'what if' always stayed with you.",
          detay: "Even the right choice stings a little.",
        },
      },
    ],
  },

  aile2_yetim_evlat_alma: {
    baslik: "A Heart With No One",
    metin:
      "A plague left a distant relative's small child with no one. You're asked to adopt them: an extra mouth, perhaps a saved life.",
    secenekler: [
      {
        metin: "Adopt them, make them family.",
        basariliSonuc: {
          mesaj: "At their first smile you knew this was one of your best decisions.",
          detay: "Some families are built by choice.",
        },
        basarisizSonuc: {
          mesaj: "Adjusting was hard; still, you didn't give up.",
          detay: "Some kindnesses are hard but valuable.",
        },
      },
      {
        metin: "Refuse, you can't even keep up already.",
        basariliSonuc: {
          mesaj: "The child went to another family; you were relieved, but a small stone stayed.",
          detay: "Some comfort carries a debt of conscience.",
        },
        basarisizSonuc: {
          mesaj: "You never learned the child's fate; the uncertainty wore on you.",
          detay: "Unanswered questions weigh more.",
        },
      },
    ],
  },

  aile2_cocuk_din_degistirme: {
    baslik: "A Different Faith",
    metin:
      "{cocuk} has turned to a faith wholly different from your family's. In this era, that is a religious and social danger.",
    secenekler: [
      {
        metin: "Respect their decision, protect them.",
        basariliSonuc: {
          mesaj: "You showed respect. {cocuk} stayed grateful; you became a true parent to them.",
          detay: "Some love goes beyond faith.",
        },
        basarisizSonuc: {
          mesaj: "The neighborhood shunned your family; a hard period began.",
          detay: "Tolerance has a price.",
        },
      },
      {
        metin: "Object, insist on the family faith.",
        basariliSonuc: {
          mesaj: "Your insistence worked, but {cocuk} drifted inwardly; the old warmth never returned.",
          detay: "Some victories equal losing.",
        },
        basarisizSonuc: {
          mesaj: "{cocuk} left home and went their own way. Years without news.",
          detay: "Some insistence costs what you have.",
        },
      },
    ],
  },

  aile2_es_olum_dosegi_dilek: {
    baslik: "A Last Wish",
    metin:
      "{es} is gravely ill, days numbered. Their last wish: one more trip to the land of their birth, now far away and dangerous.",
    secenekler: [
      {
        metin: "Take them there, whatever it costs.",
        basariliSonuc: {
          mesaj: "The journey was hard, but {es} saw their homeland once more and died at peace.",
          detay: "Some journeys are the finest goodbye.",
        },
        basarisizSonuc: {
          mesaj: "The journey sapped {es}'s last strength; they died on the road.",
          detay: "Some efforts are left unfinished.",
        },
      },
      {
        metin: "Keep them home, comfortable and safe.",
        basariliSonuc: {
          mesaj: "They died at home holding your hand. Wish unfulfilled, but not alone.",
          detay: "Some peace comes from a held hand.",
        },
        basarisizSonuc: {
          mesaj: "'I wish I'd taken them' kept gnawing at you after {es} was gone.",
          detay: "Some regrets last a lifetime.",
        },
      },
    ],
  },

  aile2_ebeveyn_gizli_gunah: {
    baslik: "The Father's Hidden Sin",
    metin:
      "Sorting old belongings, you learned {baba} profited unjustly from an innocent person, who still lives in poverty.",
    secenekler: [
      {
        metin: "Reveal the truth, compensate the victim.",
        basariliSonuc: {
          mesaj: "You revealed it and paid. The name was stained, but your conscience was never lighter.",
          detay: "Some debts are worth paying later.",
        },
        basarisizSonuc: {
          mesaj: "The disclosure became a scandal; the family name suffered far more than expected.",
          detay: "Some truths slip out of control.",
        },
      },
      {
        metin: "Leave the secret buried, protect honor.",
        basariliSonuc: {
          mesaj: "You kept it. The name stayed clean, but seeing that poor person aches in you.",
          detay: "Some silences last a lifetime.",
        },
        basarisizSonuc: {
          mesaj: "The secret was half known; learning you hid it hurt your reputation too.",
          detay: "Some secrets never stay buried.",
        },
      },
    ],
  },

  aile2_engelli_cocuk: {
    baslik: "A Different Child",
    metin:
      "{cocuk} was born disabled, and this era is cruel to such children. Hide and protect them, or bring them into society, head high?",
    secenekler: [
      {
        metin: "Hold your head high, don't hide them.",
        basariliSonuc: {
          mesaj: "{cocuk} walked head high. Some rude looks, but the neighborhood came to accept them.",
          detay: "Courage changes society over time.",
        },
        basarisizSonuc: {
          mesaj: "Society's cruelty deeply wounded {cocuk}.",
          detay: "The price of courage can be heavy.",
        },
      },
      {
        metin: "Keep them home, shielded from the world.",
        basariliSonuc: {
          mesaj: "They grew up safe, unbullied. But at the window, their eyes are full of longing.",
          detay: "Some protection resembles a prison.",
        },
        basarisizSonuc: {
          mesaj: "Keeping them home isolated them; they withdrew, even from you.",
          detay: "Some protection harms unintentionally.",
        },
      },
    ],
  },

  aile2_es_ortak_servet: {
    baslik: "A Joint Coffer",
    metin:
      "{es} wants all your wealth pooled into one joint coffer, in full trust. A great step of trust, but a risk too.",
    secenekler: [
      {
        metin: "Accept, pool everything fully.",
        basariliSonuc: {
          mesaj: "You pooled the coffers. {es} saw trust; the marriage had never felt so solid.",
          detay: "Some trust turns a marriage to steel.",
        },
        basarisizSonuc: {
          mesaj: "You pooled it but small spending quarrels arose; the intent was good.",
          detay: "Not every good intention runs smoothly.",
        },
      },
      {
        metin: "Keep your security apart, be cautious.",
        basariliSonuc: {
          mesaj: "You kept part separate. {es} saw mistrust and was hurt.",
          detay: "Some caution makes love questioned.",
        },
        basarisizSonuc: {
          mesaj: "'So you don't fully trust me,' {es} said, and it hung between you for long.",
          detay: "Misread caution leaves deep marks.",
        },
      },
    ],
  },

  aile2_cocugu_uzak_diyara_gonderme: {
    baslik: "Under a Distant Master",
    metin:
      "A master craftsman in a distant city offered to take {cocuk} as apprentice. A great chance, but you may never see them again.",
    secenekler: [
      {
        metin: "Send them, sacrifice for their future.",
        basariliSonuc: {
          mesaj: "You saw {cocuk} off in tears. Their letters later tell of progress and happiness.",
          detay: "Love is proven by letting go.",
        },
        basarisizSonuc: {
          mesaj: "News grew sparse; for years you heard little, and the uncertainty wore you out.",
          detay: "Some sacrifices leave a lifelong question.",
        },
      },
      {
        metin: "Refuse, keep them close.",
        basariliSonuc: {
          mesaj: "{cocuk} grew up by your side. A duller future maybe, but you see them daily.",
          detay: "Closeness outweighs opportunity.",
        },
        basarisizSonuc: {
          mesaj: "Years later {cocuk} resented you for missing this chance.",
          detay: "Some protection plants regret.",
        },
      },
    ],
  },

  aile2_dul_ebeveyn_yeniden_evlenme: {
    baslik: "Your Mother's New Suitor",
    metin:
      "Widowed {anne} bashfully tells you a neighborhood widower is courting her, and she isn't indifferent. She awaits your approval.",
    secenekler: [
      {
        metin: "Support her, be glad for her.",
        basariliSonuc: {
          mesaj: "'If you're happy, I'm happy, Mother,' you said. {anne} blushed and hugged you.",
          detay: "Late happiness is the sweetest.",
        },
        basarisizSonuc: {
          mesaj: "You gave support, but couldn't shake an odd feeling inside.",
          detay: "Even sincere support takes getting used to.",
        },
      },
      {
        metin: "Can't hide your shock, object.",
        basariliSonuc: {
          mesaj: "'Mother, seriously?' you said. 'You'll understand one day,' she laughed; you both did.",
          detay: "Awkward moments become sweet memories.",
        },
        basarisizSonuc: {
          mesaj: "Your objection hurt {anne}: 'So I don't deserve happiness.'",
          detay: "Shock spoken aloud can wound.",
        },
      },
    ],
  },

  aile2_kitlikta_komsuyla_paylasma: {
    baslik: "The Last Bread",
    metin:
      "Famine bites; one last loaf remains. A neighbor says their children haven't eaten in days. Your family is hungry too.",
    secenekler: [
      {
        metin: "Share the bread with your neighbor.",
        basariliSonuc: {
          mesaj: "You broke the bread. Everyone slept a little hungry, but no one alone.",
          detay: "Sharing fills the soul, not the belly.",
        },
        basarisizSonuc: {
          mesaj: "You shared it, but hunger wore you both down.",
          detay: "Some kindness has a price.",
        },
      },
      {
        metin: "Refuse, your own family comes first.",
        basariliSonuc: {
          mesaj: "You shut the door. Your family ate, but the neighbor children's eyes haunted you.",
          detay: "Survival leaves a debt of conscience.",
        },
        basarisizSonuc: {
          mesaj: "Neighbors started calling you 'heartless'; you became isolated.",
          detay: "Survival still carries a price.",
        },
      },
    ],
  },

  // ==================== NEW SET: DETAILED SPOUSE/CHILD DECISIONS (§33) ====================
  evl_kiskanclik: {
    baslik: "The Shadow of Jealousy",
    metin: "{es} heard you were too warm with someone else. At supper their face is closed, voice trembling.",
    secenekler: [
      {
        metin: "Explain calmly, take their hand.",
        basariliSonuc: {
          mesaj: "{es} resisted at first, then leaned on your shoulder. The storm passed.",
          detay: "Jealousy is the fear of going unseen.",
        },
        basarisizSonuc: { mesaj: "Nothing convinced them; that night they turned their back." },
      },
      {
        metin: "Brush it off: 'don't be ridiculous.'",
        basariliSonuc: { mesaj: "The argument ended but a worm entered {es}'s heart." },
        basarisizSonuc: { mesaj: "'You never take me seriously,' they wept; icy for days." },
      },
      {
        metin: "Hit back, dig into their past.",
        basariliSonuc: { mesaj: "The fight grew, then exhaustion silenced you. Nobody won." },
        basarisizSonuc: { mesaj: "Words weren't taken back; {es} went to their mother's that night." },
      },
    ],
  },
  evl_para_talebi_es: {
    baslik: "Your Spouse's Wish",
    metin: "{es} had long wanted a costly cloth, finer than the neighbor's. Hope shines in their eyes.",
    secenekler: [
      {
        metin: "Buy it, they deserve it.",
        basariliSonuc: { mesaj: "{es} was delighted like a child; talked about it for days." },
        basarisizSonuc: { mesaj: "The merchant cheated you; the cloth was plain." },
      },
      {
        metin: "Haggle, find a cheaper one.",
        basariliSonuc: { mesaj: "You bought a modest cloth; {es} made do, eyeing the other." },
        basarisizSonuc: { mesaj: "'You always think the cheapest will do for me,' they sulked." },
      },
      {
        metin: "Refuse, no time for luxury.",
        basariliSonuc: { mesaj: "{es} said nothing, but no one spoke at supper." },
        basarisizSonuc: { mesaj: "They sulked for days; you heard them call you tight-fisted." },
      },
    ],
  },
  evl_kayinvalide: {
    baslik: "Mother-in-law at the Door",
    metin: "{es}'s mother is old and can't live alone. {es} wants to take her in.",
    secenekler: [
      {
        metin: "Accept, set aside a room.",
        basariliSonuc: { mesaj: "{es} embraced you. The old woman is cranky, but you're {es}'s hero." },
        basarisizSonuc: { mesaj: "Her nagging turned the house into hell." },
      },
      {
        metin: "Hire a servant, she stays home.",
        basariliSonuc: { mesaj: "Not what {es} wanted, but seeing her mother cared for, they softened." },
        basarisizSonuc: { mesaj: "The servant proved unreliable; {es}: 'You left my mother to strangers.'" },
      },
      {
        metin: "Refuse firmly, this is your house.",
        basariliSonuc: { mesaj: "{es} said nothing, but the hurt in their eyes lingered." },
        basarisizSonuc: { mesaj: "{es} cried 'My mother would be on the street!' You didn't speak for days." },
      },
    ],
  },
  evl_krizi: {
    baslik: "Breaking Point",
    metin: "Things with {es} have gone truly sour. One morning they said 'this can't go on.' Time to decide.",
    secenekler: [
      {
        metin: "Hire a mediator, try to save it.",
        basariliSonuc: {
          mesaj: "It took weeks but you can look at each other again. An ember under the ash.",
        },
        basarisizSonuc: { mesaj: "The effort went unanswered; {es}: 'We tried, it didn't work.'" },
      },
      {
        metin: "Endure in silence, carry on.",
        basariliSonuc: { mesaj: "You grew used to living as two strangers under one roof." },
        basarisizSonuc: { mesaj: "The buried anger gnawed at you; you can't sleep." },
      },
      {
        metin: "Separate, each to their own road.",
        basariliSonuc: {
          mesaj: "A short, cold farewell. Heavy first days, then a strange lightness.",
          detay: "Untying some bonds is mercy.",
        },
        basarisizSonuc: {
          mesaj: "The split turned ugly: court, gossip, relatives taking sides. All were wounded.",
        },
      },
    ],
  },
  evl_yildonumu: {
    baslik: "Wedding Anniversary",
    metin: "It's your wedding anniversary. {es} pretends to expect nothing, but watches the door.",
    secenekler: [
      {
        metin: "Prepare a grand celebration.",
        basariliSonuc: { mesaj: "{es}'s eyes filled: 'I thought you'd forgotten.' They laughed." },
        basarisizSonuc: { mesaj: "Preparations went wrong, guests came late; well-meant, but the evening was a mess." },
      },
      {
        metin: "A modest but heartfelt supper.",
        basariliSonuc: { mesaj: "Two plates, one candle. {es}: 'This is enough for me,' and took your hand." },
        basarisizSonuc: { mesaj: "An ordinary meal, but at least you remembered." },
      },
      {
        metin: "Forget it, treat it as any day.",
        basariliSonuc: { mesaj: "{es} said nothing. By morning there was a wet mark on the pillow." },
        basarisizSonuc: { mesaj: "Unused." },
      },
    ],
  },
  evl_es_hastalik: {
    baslik: "Your Spouse Fell Ill",
    metin: "{es} has been feverish for days, unable to rise. Their gaze is fixed on you.",
    secenekler: [
      {
        metin: "Call the city's best physician.",
        basariliSonuc: { mesaj: "The medicine worked. {es} was up in a week, grateful to you." },
        basarisizSonuc: { mesaj: "The physician tried; recovery was long, but they saw you stayed by them." },
      },
      {
        metin: "Nurse them yourself.",
        basariliSonuc: { mesaj: "You kept watch for nights. The fever broke; {es} saw you first." },
        basarisizSonuc: { mesaj: "The illness worsened and you burned out. {es}: 'You should've called a physician.'" },
      },
      {
        metin: "Mind your work, it'll pass.",
        basariliSonuc: { mesaj: "{es} recovered alone but never forgot you didn't even pass by the door." },
        basarisizSonuc: { mesaj: "The illness dragged on, the house fell apart; even the children asked 'where were you.'" },
      },
    ],
  },
  cocuk_okul_secimi: {
    baslik: "Your Child's Education",
    metin: "Your children are growing. Time to plan their future: apprenticeship, church/madrasa school, or the field beside you?",
    secenekler: [
      {
        metin: "Send them to a costly school/tutor.",
        basariliSonuc: { mesaj: "Your child learned letters and sums. Neighbors say 'your boy is educated.'" },
        basarisizSonuc: { mesaj: "Money gone, the tutor was lax; the child learned by halves." },
      },
      {
        metin: "Apprentice them to a craftsman.",
        basariliSonuc: { mesaj: "The child came home sweaty but proud: 'I hammered the first nail today.'" },
        basarisizSonuc: { mesaj: "The master was harsh; the child complained of being taught by beatings." },
      },
      {
        metin: "No school, put them to work with you.",
        basariliSonuc: { mesaj: "An extra pair of hands helped, but a door closed in the child's eyes." },
        basarisizSonuc: { mesaj: "One day the child said 'you never cared about me'; it won't leave your mind." },
      },
    ],
  },
  cocuk_para_talebi: {
    baslik: "Your Child's Wish",
    metin: "Your child has wanted something for days: a toy or shoes their friends have. Shyly, they asked you.",
    secenekler: [
      {
        metin: "Buy it, childhood comes once.",
        basariliSonuc: { mesaj: "Your child toured the neighborhood with joy and fell asleep hugging you." },
        basarisizSonuc: { mesaj: "You bought it, but it wasn't the one they liked; still 'thanks, father.'" },
      },
      {
        metin: "Patiently explain why not now.",
        basariliSonuc: { mesaj: "They pouted but listened. 'Okay,' they said, seeming a bit grown." },
        basarisizSonuc: { mesaj: "'Always excuses,' they cried, and shut themselves in." },
      },
      {
        metin: "Scold: 'does money grow on trees?'",
        basariliSonuc: { mesaj: "They never asked you for anything again. That's a loss too." },
        basarisizSonuc: { mesaj: "The child kept saying 'the neighbor's father is better'; it stung." },
      },
    ],
  },
  cocuk_ergenlik: {
    baslik: "The Rebel Years",
    metin: "Your eldest no longer listens: comes home late, speaks rudely, ignores your authority.",
    secenekler: [
      {
        metin: "Be patient, listen, trust them.",
        basariliSonuc: { mesaj: "It took months. One night they came to you and talked. The wall cracked." },
        basarisizSonuc: { mesaj: "Nothing was enough; they slammed the door and left." },
      },
      {
        metin: "Strict discipline, rules, punishment.",
        basariliSonuc: { mesaj: "Silence rules the house. Obedience, but the light in their eyes is gone." },
        basarisizSonuc: { mesaj: "They rebelled and vanished a night. Found two days later; blood came between you." },
      },
      {
        metin: "Ignore it, let it pass.",
        basariliSonuc: { mesaj: "The storm passed on its own, but they tell you nothing now." },
        basarisizSonuc: { mesaj: "They filled your indifference with bad friends; their name got tangled in trouble." },
      },
    ],
  },
  cocuk_dugun_masrafi: {
    baslik: "Your Child's Wedding",
    metin: "Your eldest is getting married. All eyes are on you: what kind of wedding will it be?",
    secenekler: [
      {
        metin: "Throw a magnificent wedding.",
        basariliSonuc: { mesaj: "Three days and nights of feasting. Your child hugged you: 'I owe you everything.'" },
        basarisizSonuc: { mesaj: "It cost a fortune, but rain cut the wedding short." },
      },
      {
        metin: "A simple, warm ceremony is enough.",
        basariliSonuc: { mesaj: "Small but heartfelt. Your child said, 'No need for show.'" },
        basarisizSonuc: { mesaj: "The in-laws sneered; your child was embarrassed but hid it." },
      },
      {
        metin: "Don't contribute; let them manage.",
        basariliSonuc: { mesaj: "You sat at the very back. The distance became permanent." },
        basarisizSonuc: { mesaj: "The in-laws asked, 'What kind of father is this?' Your child blushed for you." },
      },
    ],
  },
  cocuk_yetenek: {
    baslik: "A Spark",
    metin: "One child has a clear gift: drawing, singing, numbers... But nurturing it takes money and time.",
    secenekler: [
      {
        metin: "Find a master to train them.",
        basariliSonuc: { mesaj: "The child shone with practice. 'Thank you for seeing me, father,' they said." },
        basarisizSonuc: { mesaj: "The master was costly, progress slow; still, the child felt backed." },
      },
      {
        metin: "Encourage them at home as you can.",
        basariliSonuc: { mesaj: "Your attention was enough; every evening they show you something new." },
        basarisizSonuc: { mesaj: "You meant well but lacked time; the spark began to fade." },
      },
      {
        metin: "Say 'this won't feed you,' talk them out of it.",
        basariliSonuc: { mesaj: "The child set their instrument aside. Never picked it up again." },
        basarisizSonuc: { mesaj: "Even years later they look at you: 'If only you'd let me.'" },
      },
    ],
  },
  aile_tatil_karari: {
    baslik: "A Getaway Together",
    metin: "For months the family hasn't spent real time together. {es} says 'let's all go somewhere.'",
    secenekler: [
      {
        metin: "Go on a long family trip.",
        basariliSonuc: { mesaj: "Days of laughter and walking. Years later it's still 'that trip.'" },
        basarisizSonuc: { mesaj: "Rain on the road, fleas in the inns... Still, everyone huddled close on the way home." },
      },
      {
        metin: "A short day trip is enough.",
        basariliSonuc: { mesaj: "A creekside, a spread cloth. The little one kept begging, 'Let's come again.'" },
        basarisizSonuc: { mesaj: "It was short and someone got cranky; still, you got out." },
      },
      {
        metin: "No, work can't be left.",
        basariliSonuc: { mesaj: "Your coffer filled, but when you came home no one looked up." },
        basarisizSonuc: { mesaj: "Unused." },
      },
    ],
  },
};
