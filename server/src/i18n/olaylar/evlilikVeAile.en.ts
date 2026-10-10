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
      "You're in a period where things are going badly, your spirits are low. But every evening when you come home {es} greets you with such warmth that the next day you can get back on your feet.",
    secenekler: [
      {
        metin: "Lean on this support, get strong again.",
        basariliSonuc: {
          mesaj: "With {es}'s support you refocused; before long your affairs started to recover.",
          detay: "Some loves give returns more valuable than any investment.",
        },
        basarisizSonuc: {
          mesaj: "The support was wonderful but things haven't recovered yet; at least you're not alone.",
          detay: "Some support doesn't give immediate results but it gives strength.",
        },
      },
      {
        metin: "Hide your feelings so as not to burden them.",
        basariliSonuc: {
          mesaj: "You hid your feelings; {es} noticed and was a little saddened: 'You can rely on me,' they said.",
          detay: "Some protection actually creates a distance.",
        },
        basarisizSonuc: {
          mesaj: "The burden you hid grew inside you, you felt even more alone.",
          detay: "Unshared burdens are carried heavier.",
        },
      },
    ],
  },

  evl_ask_hastalikta_fedakarlik: {
    baslik: "By Your Side",
    metin:
      "You fell gravely ill. Because you have no money you can't hire a good physician, but {es} is ready to spend even their last coin for you, to keep vigil at your side for nights.",
    secenekler: [
      {
        metin: "Accept this sacrifice, show your gratitude.",
        basariliSonuc: {
          mesaj:
            "{es}'s devotion and love proved more effective than the most expensive physician. You recovered and your bond grew stronger.",
          detay: "Some healing comes not from gold but from love.",
        },
        basarisizSonuc: {
          mesaj: "You didn't fully recover but even {es}'s presence by your side was a comfort.",
          detay: "Not every effort brings a miracle but it always carries meaning.",
        },
      },
      {
        metin: "Refuse them, you don't want them to spend their own money.",
        basariliSonuc: {
          mesaj: "You refused; {es} was hurt: 'Count me as part of this marriage too,' they said.",
          detay: "Some protection actually feels like a rejection.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal blocked their help and your recovery took even longer.",
          detay: "Some pride delays healing.",
        },
      },
    ],
  },

  evl_ask_es_trip_atma: {
    baslik: "The Theater of Jealousy",
    metin:
      "Because a neighbor praised you, {es} suddenly staged a dramatic scene saying 'So I'm not good enough!': they pushed the plate off the table and shut themselves in the room, then cracked the door and shouted 'Don't you even wonder about me?!'",
    secenekler: [
      {
        metin: "Go after them smiling, calm them down with humor.",
        basariliSonuc: {
          mesaj: "You cracked the door and said, laughing, 'You're my only shortcoming.' You both started laughing.",
          detay: "Some fits melt with a laugh.",
        },
        basarisizSonuc: {
          mesaj: "Your joke didn't quite land, it made them sulk a bit more but it didn't last long.",
          detay: "Some jokes are late by the timing they need.",
        },
      },
      {
        metin: "Leave them be, wait for it to pass.",
        basariliSonuc: {
          mesaj: "You left them be; half an hour later they came out the door and went back to the table as if nothing had happened.",
          detay: "Some storms die down at their own pace.",
        },
        basarisizSonuc: {
          mesaj: "Your indifference provoked them further: 'So you don't even care,' they said.",
          detay: "Some non-reactions are misunderstood.",
        },
      },
    ],
  },

  evl_ask_zenginlik_testi: {
    baslik: "The Changing Wind",
    metin:
      "For the first time in years you came into real wealth. You remember your old days of poverty; now you wonder: will {es} change along with this change?",
    secenekler: [
      {
        metin: "Recall your old days, celebrate together.",
        basariliSonuc: {
          mesaj: "You celebrated recalling your old days; {es} hasn't changed at all, still looks at you with the same love.",
          detay: "Some loves are tested by wealth and come out stronger than wealth.",
        },
        basarisizSonuc: {
          mesaj: "{es} seemed to have changed a bit; someone who enjoys their new status emerged.",
          detay: "Some changes become visible slowly.",
        },
      },
      {
        metin: "Watch quietly, see their real character.",
        basariliSonuc: {
          mesaj: "You watched; {es} acted with their old humility, caring nothing for the money. You were relieved.",
          detay: "Some tests bring an unexpected trust.",
        },
        basarisizSonuc: {
          mesaj: "{es} started boasting of your new wealth and looking down on old friends. This disappointed you.",
          detay: "Some tests bring bitter truths to light.",
        },
      },
    ],
  },

  evl_ask_bosanma_riski: {
    baslik: "The Ash of a Dying Love",
    metin:
      "The two of you who once held each other through everything have now grown strangers under the weight of poverty. {es} is aloud questioning whether this marriage was a mistake.",
    secenekler: [
      {
        metin: "Remind them of your love, fight one last time.",
        basariliSonuc: {
          mesaj: "You recalled your old days, your first meeting. {es} cried: 'You're right, let's not give up,' they said.",
          detay: "Some loves still carry an ember beneath their ashes.",
        },
        basarisizSonuc: {
          mesaj: "Your effort wasn't enough. {es} left the house saying 'Love doesn't fill a belly, I was right.'",
          detay: "Some loves, however real, lose to poverty.",
        },
      },
      {
        metin: "Accept it, separate with dignity.",
        basariliSonuc: {
          mesaj: "Without fighting, you hugged one last time and separated. It hurts but at least the good memories weren't tainted.",
          detay: "Some endings, however sad, end with respect.",
        },
        basarisizSonuc: {
          mesaj: "You tried to end it calmly but old resentments erupted; you separated bitterly.",
          detay: "Some separations flare up however calmly they're planned.",
        },
      },
    ],
  },

  evl_ask_eski_ask_geri_donuyor: {
    baslik: "A Letter From the Past",
    metin:
      "{es}'s old love from before the marriage came back to the city and sent them a letter. {es} didn't hide it from you but the hesitation in their eyes frightens you.",
    secenekler: [
      {
        metin: "Trust them, let them make their own decision.",
        basariliSonuc: {
          mesaj: "{es} tore up the letter: 'I made my choice long ago,' they said. Your trust was repaid.",
          detay: "Some trust brings a relationship out stronger than its limit.",
        },
        basarisizSonuc: {
          mesaj: "{es} went to meet their old love and never came back. Your trust wasn't repaid this time.",
          detay: "Some trust, however justified, comes to nothing.",
        },
      },
      {
        metin: "Say your worry openly, question the letter.",
        basariliSonuc: {
          mesaj: "You shared your worry; {es} understood and did everything they could to reassure you.",
          detay: "Some fears shrink when shared.",
        },
        basarisizSonuc: {
          mesaj: "{es} was hurt: 'Don't you trust me?' This mistrust opened a wound between you.",
          detay: "Some questions create a distance just by being asked.",
        },
      },
    ],
  },

  evl_ask_cocuk_yoksullugu: {
    baslik: "What They Can't Have",
    metin:
      "{cocuk} saw a simple toy the neighbor children have and quietly envied it, but never even asked — because they've already learned you have no money.",
    secenekler: [
      {
        metin: "Whatever it takes, buy that toy for them.",
        basariliSonuc: {
          mesaj: "The light in {cocuk}'s eyes was worth everything. {es} quietly appreciated this small sacrifice too.",
          detay: "Some happinesses are small but priceless.",
        },
        basarisizSonuc: {
          mesaj: "You bought the toy but {cocuk} broke it soon after; still, that smile in the moment was real.",
          detay: "Some happinesses are real even if short-lived.",
        },
      },
      {
        metin: "Explain the truth to them, teach them to be patient.",
        basariliSonuc: {
          mesaj: "{cocuk} understood, even tried to comfort you: 'It's okay, Dad/Mum.' This maturity made you both proud and sad.",
          detay: "Some children grow up early with poverty.",
        },
        basarisizSonuc: {
          mesaj: "{cocuk} didn't understand, went to their room sulking. That scene wouldn't leave your mind for a long time.",
          detay: "Some truths come too early for a child.",
        },
      },
    ],
  },

  evl_ask_sans_eseri_miras: {
    baslik: "An Unexpected Inheritance",
    metin:
      "A distant relative of {es}, one you'd never known, passed away and left a small but real inheritance. For the first time your home, which has known years of poverty, got a real breathing space.",
    secenekler: [
      {
        metin: "Use the money sensibly, invest in the future.",
        basariliSonuc: {
          mesaj: "You used the money wisely; you don't wake at night with money worries anymore.",
          detay: "Some luck, well managed, turns into lasting peace.",
        },
        basarisizSonuc: {
          mesaj: "While spending the money you missed some opportunities but it was still a relief.",
          detay: "Not every stroke of luck can be used to best effect.",
        },
      },
      {
        metin: "Live for today, do the things you've long missed.",
        basariliSonuc: {
          mesaj: "A nice meal, new clothes for each of you, an unforgettable day... The money melted away but the memories stayed.",
          detay: "Some spending is actually an investment: in happiness.",
        },
        basarisizSonuc: {
          mesaj: "You overspent a little but none of you will forget that day's laughter.",
          detay: "Some regrets are worth a laugh.",
        },
      },
    ],
  },

  evl_ask_yillar_sonra_hala_asik: {
    baslik: "The Same Look, Still",
    metin:
      "The years passed, your hair went gray, your pockets are still not very full. But under the evening sun when {es} looks at you, you still see that light in their eyes from the first day.",
    secenekler: [
      {
        metin: "Take their hand, silently give thanks for this moment.",
        basariliSonuc: {
          mesaj: "You took their hand without saying anything. Some things need no words; this love that has lasted for years is your greatest wealth.",
          detay: "Some wealth is measured not in gold but in years.",
        },
        basarisizSonuc: {
          mesaj: "You lived the moment but your mind was still on daily troubles; still, a warmth stayed in you.",
          detay: "Some peace is felt even when we can't fully surrender to it.",
        },
      },
      {
        metin: "Tell them why, after all these years, you still love them.",
        basariliSonuc: {
          mesaj:
            "Your words made them cry, in a good way. 'Even though these years passed penniless, I'd live every day with you again,' you said, and you both truly felt it.",
          detay: "Some confessions leave even a wedding vow behind.",
        },
        basarisizSonuc: {
          mesaj: "Your words didn't come out quite right but they understood what you meant.",
          detay: "Some feelings reach their mark even when expressed imperfectly.",
        },
      },
    ],
  },

  aile2_evlatlik_verme: {
    baslik: "A Rich Family's Offer",
    metin:
      "Famine is ravaging the city, even bread is hard to find at home. A rich, childless family offers to adopt {cocuk} and give them a life you could never provide.",
    secenekler: [
      {
        metin: "Accept, let {cocuk} have a better life.",
        basariliSonuc: {
          mesaj: "Your hand trembled as you put {cocuk} in the rich family's carriage. Knowing they won't go hungry didn't fill the emptiness.",
          detay: "Some sacrifices require letting go of the one you love most.",
        },
        basarisizSonuc: {
          mesaj: "The family didn't keep their word; years later you learned {cocuk} lived in that house like a servant.",
          detay: "Some well-meaning decisions can go bad beyond your control.",
        },
      },
      {
        metin: "Refuse, stay together even if you go hungry.",
        basariliSonuc: {
          mesaj: "You had hard days but {cocuk} woke by your side every morning. That was worth going hungry for.",
          detay: "Some wealth is just staying together.",
        },
        basarisizSonuc: {
          mesaj: "The famine was harsh, you all grew weak but you stayed together.",
          detay: "Some prices are heavy but bring no regret.",
        },
      },
    ],
  },

  aile2_iki_cocuk_tek_ilac: {
    baslik: "A Single Bottle of Medicine",
    metin:
      "The epidemic struck the neighborhood. {cocuk} is burning with fever; at the same moment the small child the neighbor left orphaned was brought to your door, also on the edge of death. The last bottle of medicine you have is only enough to save one.",
    secenekler: [
      {
        metin: "Give the medicine to {cocuk}, your own child comes first.",
        basariliSonuc: {
          mesaj: "{cocuk} recovered. But while burying the cooling body of the neighbor's child, your joy turned into guilt.",
          detay: "Some choices, even right ones, never leave your conscience at ease.",
        },
        basarisizSonuc: {
          mesaj: "The medicine wasn't enough; neither survived. This became the darkest night of your life.",
          detay: "Sometimes no choice is enough to save anything.",
        },
      },
      {
        metin: "Give the medicine to the orphan, because they have no one.",
        basariliSonuc: {
          mesaj: "The orphan lived, the neighborhood never forgot it. But {cocuk}'s condition worsened; you slept praying every night.",
          detay: "Some consciences require risking the one you love most.",
        },
        basarisizSonuc: {
          mesaj: "The orphan was saved but {cocuk} drew their last breath that night. You believe you did the right thing but your heart is in pieces.",
          detay: "Some right things demand the heaviest price.",
        },
      },
    ],
  },

  aile2_uvey_evlat_ayrimi: {
    baslik: "Two Separate Hearts",
    metin:
      "You noticed you've started, without realizing it, to make a distinction between {es}'s child from a previous marriage and your own child. Your stepchild senses it quietly.",
    secenekler: [
      {
        metin: "Make a conscious effort, treat them both equally.",
        basariliSonuc: {
          mesaj: "Your efforts bore fruit; your stepchild called you 'Dad/Mum' for real for the first time. {es} couldn't hold back their tears.",
          detay: "Some bonds are built not with blood but with effort.",
        },
        basarisizSonuc: {
          mesaj: "You tried but old habits sometimes came back; still, your direction was right.",
          detay: "Some changes aren't completed in one day.",
        },
      },
      {
        metin: "Accept it, admit you feel a bit closer to your own child.",
        basariliSonuc: {
          mesaj: "You were honest but {es} never forgave this confession: 'They're my child too,' they said, hurt.",
          detay: "Some honesty, even if right, hurts.",
        },
        basarisizSonuc: {
          mesaj: "Your stepchild noticed this difference too and never trusted you the same way again.",
          detay: "Some children remember actions more than words.",
        },
      },
    ],
  },

  aile2_ebeveyn_son_istek_baris: {
    baslik: "A Will at the Bedside",
    metin:
      "{baba} is on his deathbed, in a weak voice telling a last wish: he wants you to make peace with {rakip}, whom he's been estranged from for years. 'I don't want to leave this grudge to you as an inheritance,' he says.",
    secenekler: [
      {
        metin: "Keep your word, make peace with {rakip}.",
        basariliSonuc: {
          mesaj: "{baba} drew his last breath with a smile of peace on his face. The grudge between you and {rakip} was buried with him.",
          detay: "Some reconciliations become even more valuable at a deathbed.",
        },
        basarisizSonuc: {
          mesaj: "You tried to make peace but {rakip} wasn't ready; still, you were able to tell {baba} your intent.",
          detay: "Some reconciliations aren't complete with one side's effort.",
        },
      },
      {
        metin: "Refuse, you find that grudge justified.",
        basariliSonuc: {
          mesaj: "{baba} closed his eyes with disappointment. You respect your decision but you won't forget that look.",
          detay: "Some pride won't back down even at a deathbed.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal deeply saddened {baba}; among his last words he spoke your name with sorrow.",
          detay: "The price of some refusals is paid for years.",
        },
      },
    ],
  },

  aile2_cocuk_agir_suc: {
    baslik: "The Confession at the Door",
    metin:
      "{cocuk} came home at midnight covered in blood: they badly wounded someone in a fight. The guards are searching door to door until morning. Will you hide them, or hand them over to justice?",
    secenekler: [
      {
        metin: "Hide them, find a way to get them out of the city.",
        basariliSonuc: {
          mesaj: "You secretly got {cocuk} out of the city. They're safe but now you fear the knock at the door every night.",
          detay: "Some protection turns into a fear that lasts a lifetime.",
        },
        basarisizSonuc: {
          mesaj: "The guards caught you while hiding them. {cocuk} escaped but you were thrown in the dungeon in their place.",
          detay: "Some sacrifices make you pay the price yourself.",
        },
      },
      {
        metin: "Persuade them to turn themselves in.",
        basariliSonuc: {
          mesaj: "{cocuk} turned themselves in and was sentenced. You know you did the right thing but your heart breaks every time you go to visit them.",
          detay: "Some right things require being parted from the one you love most.",
        },
        basarisizSonuc: {
          mesaj: "{cocuk} refused to turn themselves in and fled alone. You never heard from them again.",
          detay: "Some advice goes unheeded, and that is the most bitter.",
        },
      },
    ],
  },

  aile2_esin_sirri: {
    baslik: "What the Years Hid",
    metin:
      "{es}, in tears, confessed a great secret: before they met you, they had a secret marriage and a child from that marriage. They've hidden this from you for years.",
    secenekler: [
      {
        metin: "Forgive them, say their past won't change you.",
        basariliSonuc: {
          mesaj: "'Your past is your past,' you said. {es} was relieved, and the bond between you came out stronger than this storm.",
          detay: "Some acts of forgiveness rebuild a marriage.",
        },
        basarisizSonuc: {
          mesaj: "You said you forgave them but the hurt inside you sat silently at the table for days.",
          detay: "Some forgiveness is easy in words, hard in the heart.",
        },
      },
      {
        metin: "Say your trust is shaken, put up a distance.",
        basariliSonuc: {
          mesaj: "You put up a distance; {es} accepted they deserved it but the house stayed ice-cold for weeks.",
          detay: "Some losses of trust take time.",
        },
        basarisizSonuc: {
          mesaj: "The distance turned into a chasm; {es} couldn't stand this mistrust and left the house.",
          detay: "Some secrets, even when confessed, can't save a relationship.",
        },
      },
    ],
  },

  aile2_kardes_miras_davasi: {
    baslik: "Your Sibling's Lawsuit",
    metin:
      "Your sibling took you to court over the family's small property, claiming your share as their own too. Your blood tie is suffering from this fight.",
    secenekler: [
      {
        metin: "Defend it to the end, pursue your rights in court.",
        basariliSonuc: {
          mesaj: "You won the case, you got your share. But your sibling hasn't said a word to you since that day.",
          detay: "Some victories tear a family apart.",
        },
        basarisizSonuc: {
          mesaj: "You lost the case, you lost both the costs and your sibling.",
          detay: "In some fights no one really wins.",
        },
      },
      {
        metin: "Give up your share, protect the family bond.",
        basariliSonuc: {
          mesaj: "You gave it up. Your sibling was surprised at first, then hugged you, ashamed. Blood ties outweighed money.",
          detay: "Some wealth isn't measured in gold.",
        },
        basarisizSonuc: {
          mesaj: "You gave it up but your sibling thought they deserved it and didn't even thank you.",
          detay: "Kindness isn't always repaid.",
        },
      },
    ],
  },

  aile2_cocugun_es_secimi: {
    baslik: "A Choice You Don't Approve Of",
    metin:
      "{cocuk} announced they want to marry someone you don't trust at all, someone with a suspicious past. You don't want to break their heart but your instincts are shouting.",
    secenekler: [
      {
        metin: "Object, try to prevent the marriage.",
        basariliSonuc: {
          mesaj: "You prevented it. Years later it came out that that person really was trouble; {cocuk} is hurt at you but knows you were right.",
          detay: "Some vindications come bitterly.",
        },
        basarisizSonuc: {
          mesaj: "Your objection didn't work; {cocuk} ran off and married and you didn't hear from them for years.",
          detay: "Some obstruction produces the exact opposite of what you wanted.",
        },
      },
      {
        metin: "Accept it, show your trust, be there for them.",
        basariliSonuc: {
          mesaj: "You set aside your doubts. {cocuk} never forgot this trust; the marriage went better than you'd expected too.",
          detay: "Some trust turns out to be right.",
        },
        basarisizSonuc: {
          mesaj: "You were right in your worries; the marriage went badly and {cocuk} had hard times, then came back to you.",
          detay: "Some instincts turn out right, but seeing it hurts too.",
        },
      },
    ],
  },

  aile2_ebeveyn_es_gecinmeme: {
    baslik: "War Under One Roof",
    metin:
      "{anne} came to live with you but she and {es} just can't get along; the house is a battlefield now. You're asked to choose one of them.",
    secenekler: [
      {
        metin: "Be on your spouse's side, find a separate place for your parent.",
        basariliSonuc: {
          mesaj: "You rented a separate house for {anne}. {es} was relieved but you won't forget the disappointment in your mother's eyes.",
          detay: "Some peace is bought with someone else's sorrow.",
        },
        basarisizSonuc: {
          mesaj: "Despite the separate house the fights didn't end; everyone stayed angry at you.",
          detay: "Some solutions only move the problem, they don't solve it.",
        },
      },
      {
        metin: "Be on your parent's side, ask your spouse for patience.",
        basariliSonuc: {
          mesaj: "You kept your mother in the house. Even though {es} said they understood, the tension between you didn't ease for a long time.",
          detay: "Some loyalties demand a price.",
        },
        basarisizSonuc: {
          mesaj: "{es} said 'Her or me,' you chose your mother, and {es} left the house.",
          detay: "Some choices end a relationship.",
        },
      },
    ],
  },

  aile2_cocuk_tehlikeli_yolculuk: {
    baslik: "The Call of the Horizon",
    metin:
      "{cocuk} said they want to join a dangerous, long journey (a caravan heading to distant lands, or the army). There's excitement in their eyes but only fear in you.",
    secenekler: [
      {
        metin: "Give permission, let them follow their dream.",
        basariliSonuc: {
          mesaj: "It was a hard goodbye but you gave permission. As their letters come, you feel you made the right decision.",
          detay: "Some love is proven by knowing how to let go.",
        },
        basarisizSonuc: {
          mesaj: "Bad news came from the journey. Learning something happened to {cocuk} became the greatest pain of your life.",
          detay: "Some freedoms come back at a heavy price.",
        },
      },
      {
        metin: "Object, insist they stay home.",
        basariliSonuc: {
          mesaj: "Your insistence worked, they stayed home — but that excitement in their eyes faded, and they didn't forgive you for a while.",
          detay: "Some protection buries a dream along with it.",
        },
        basarisizSonuc: {
          mesaj: "Your objection didn't work, {cocuk} left without permission and stayed estranged from you for a long time.",
          detay: "Some young people grow more determined the more they're obstructed.",
        },
      },
    ],
  },

  aile2_es_koklerinden_koparma: {
    baslik: "A New Land",
    metin:
      "A great opportunity for your career awaits in a distant city. But it means {es} being completely torn from their own family, friends and entire life.",
    secenekler: [
      {
        metin: "Insist on moving, don't miss the opportunity.",
        basariliSonuc: {
          mesaj: "You moved; your career took off but {es} wandered the new city alone and sad for months.",
          detay: "Only one side pays the price of some gains.",
        },
        basarisizSonuc: {
          mesaj: "The opportunity didn't turn out as you'd hoped, and on top of that {es} never found their footing in the new city; you're both sorry.",
          detay: "Some risks wear down both sides.",
        },
      },
      {
        metin: "Refuse the opportunity, respect your spouse's roots.",
        basariliSonuc: {
          mesaj: "You refused. {es} never forgot this sacrifice: 'You cared about me more than anything,' they said.",
          detay: "Some opportunities aren't worth a love.",
        },
        basarisizSonuc: {
          mesaj: "You refused but the 'what if' question always stayed in you.",
          detay: "Even the right choice sometimes stings a little.",
        },
      },
    ],
  },

  aile2_yetim_evlat_alma: {
    baslik: "A Heart With No One",
    metin:
      "A small child, left behind by a distant relative in a plague/epidemic, now has no one at all. You're asked to adopt them — an extra mouth, an extra responsibility, but maybe a chance to save a life.",
    secenekler: [
      {
        metin: "Adopt them, make them part of your family.",
        basariliSonuc: {
          mesaj: "You took them into your home. When you saw their first smile, you understood this was one of the best decisions of your life.",
          detay: "Some families are built not with blood but with choice.",
        },
        basarisizSonuc: {
          mesaj: "You took them into your home but the adjustment was hard; still, you didn't give up.",
          detay: "Some kindnesses aren't easy but are valuable anyway.",
        },
      },
      {
        metin: "Refuse, you can't even keep up with your own family.",
        basariliSonuc: {
          mesaj: "You refused. The child was given to another family; you were relieved but a small stone stayed in you.",
          detay: "Some comfort comes with a debt of conscience.",
        },
        basarisizSonuc: {
          mesaj: "You refused but you never learned what became of the child; this uncertainty bothered you for a long time.",
          detay: "Some questions weigh more when they go unanswered.",
        },
      },
    ],
  },

  aile2_cocuk_din_degistirme: {
    baslik: "A Different Faith",
    metin:
      "{cocuk} announced they've turned to a faith completely different from yours and your family's, and want to walk that path. In this era, this carries both religious and social danger.",
    secenekler: [
      {
        metin: "Respect their decision, protect them.",
        basariliSonuc: {
          mesaj: "You respected their decision. {cocuk} stayed grateful to you always, and you became a real parent in their eyes.",
          detay: "Some love is beyond a faith.",
        },
        basarisizSonuc: {
          mesaj: "When the neighborhood heard, they shunned your family; a hard period began.",
          detay: "Some tolerance demands a price.",
        },
      },
      {
        metin: "Object, insist on the family's faith.",
        basariliSonuc: {
          mesaj: "Your insistence worked but {cocuk} grew distant inside; you never saw that old warmth in their eyes again.",
          detay: "Some victories are no different from losing.",
        },
        basarisizSonuc: {
          mesaj: "{cocuk} left the house and went their own way. You didn't hear from them for years.",
          detay: "Some insistence loses you what you have too.",
        },
      },
    ],
  },

  aile2_es_olum_dosegi_dilek: {
    baslik: "A Last Wish",
    metin:
      "{es} is gravely ill, their days are numbered now. They have one last wish: to be taken one last time to the land where they were born, now a very distant and dangerous road.",
    secenekler: [
      {
        metin: "Take them there, whatever it costs.",
        basariliSonuc: {
          mesaj: "The journey was hard but {es} saw the land of their birth one last time and closed their eyes looking at it. They were at peace.",
          detay: "Some journeys become the most beautiful form of a goodbye.",
        },
        basarisizSonuc: {
          mesaj: "The journey used up {es}'s last strength; they closed their eyes on the road before reaching it.",
          detay: "Some well-meaning efforts are left bitterly unfinished.",
        },
      },
      {
        metin: "Keep them home, comfortable and safe.",
        basariliSonuc: {
          mesaj: "At home, in their warm bed, holding your hand, they drew their last breath. Their wish wasn't fulfilled but they weren't alone.",
          detay: "Some peace comes not from a journey but from a hand held.",
        },
        basarisizSonuc: {
          mesaj: "The thought 'I wish I'd taken them there' kept gnawing at you even after {es} was gone.",
          detay: "Some regrets last a lifetime.",
        },
      },
    ],
  },

  aile2_ebeveyn_gizli_gunah: {
    baslik: "The Father's Hidden Sin",
    metin:
      "Organizing your old belongings, you learned of a grave injustice {baba} committed in the past that no one knows about: he made an unjust gain off an innocent person. That person still lives in poverty.",
    secenekler: [
      {
        metin: "Bring the truth to light, pay compensation to the wronged person.",
        basariliSonuc: {
          mesaj: "You brought the truth to light and paid the compensation. Your family's name was stained for a while but your conscience had never been so light.",
          detay: "Some debts deserve to be paid even a generation later.",
        },
        basarisizSonuc: {
          mesaj: "Your disclosure turned into a big scandal; your family's name suffered far more than you expected.",
          detay: "Some truths get out of control once they come to light.",
        },
      },
      {
        metin: "Leave the secret buried, protect the family's honor.",
        basariliSonuc: {
          mesaj: "You kept the secret. Your family's name stayed clean but something aches in you every time you see that poor person's face.",
          detay: "Some silences are carried for a lifetime.",
        },
        basarisizSonuc: {
          mesaj: "The secret was already half known; when they learned you were hiding it, your reputation took a share of that too.",
          detay: "Some secrets never stay fully buried.",
        },
      },
    ],
  },

  aile2_engelli_cocuk: {
    baslik: "A Different Child",
    metin:
      "{cocuk} was born with a disability, and in this era society treats such children cruelly. Will you try to hide and protect them from the world, or bring them out into society with your head held high?",
    secenekler: [
      {
        metin: "Keep your head high, don't hide them from society.",
        basariliSonuc: {
          mesaj: "{cocuk} walked with their head high everywhere — the market, the church. There were some rude looks but over time the neighborhood accepted them as they are.",
          detay: "Some courage even changes society over time.",
        },
        basarisizSonuc: {
          mesaj: "Society's cruelty deeply wounded {cocuk}; some words are never forgotten.",
          detay: "The price of some courage can be very heavy.",
        },
      },
      {
        metin: "Protect them at home, keep them away from the outside world.",
        basariliSonuc: {
          mesaj: "They grew up safe at home, saw no bullying. But sometimes, watching the children outside through the window, you see the longing in their eyes.",
          detay: "Some protection can resemble a prison too.",
        },
        basarisizSonuc: {
          mesaj: "Keeping them home isolated them; they withdrew, spoke little even with you.",
          detay: "Some protection harms unintentionally.",
        },
      },
    ],
  },

  aile2_es_ortak_servet: {
    baslik: "A Joint Coffer",
    metin:
      "{es} wants all your wealth — yours and theirs — combined into a single joint coffer, in full trust. This is a great step of trust but also a risk.",
    secenekler: [
      {
        metin: "Accept, fully pool everything.",
        basariliSonuc: {
          mesaj: "You combined the coffers. {es} saw it as a sign of trust and respect; the marriage had never felt so solid.",
          detay: "Some trust turns a marriage to steel.",
        },
        basarisizSonuc: {
          mesaj: "You pooled it but small disagreements arose over some spending; still, the intent was good.",
          detay: "Not every good intention runs smoothly.",
        },
      },
      {
        metin: "Keep your own security separate, be cautious.",
        basariliSonuc: {
          mesaj: "You kept part of it separate. {es} saw it as a sign of mistrust and was hurt.",
          detay: "Some caution makes a love get questioned.",
        },
        basarisizSonuc: {
          mesaj: "'So you don't fully trust me,' {es} said, and that sentence hung between you for a long time.",
          detay: "Some caution, when misunderstood, leaves deep marks.",
        },
      },
    ],
  },

  aile2_cocugu_uzak_diyara_gonderme: {
    baslik: "Under a Distant Master",
    metin:
      "One of the master craftsmen in a distant city offered to take {cocuk} as an apprentice. A great opportunity but for years, maybe forever, you'll never see them again.",
    secenekler: [
      {
        metin: "Send them, make the sacrifice for their future.",
        basariliSonuc: {
          mesaj: "You saw {cocuk} off in tears. The letters that came years later tell of their progress and happiness.",
          detay: "Some love is proven by being able to let go.",
        },
        basarisizSonuc: {
          mesaj: "You sent them but the news grew sparse; for years you heard very little from them, and this uncertainty wore you out.",
          detay: "Some sacrifices leave a question mark for a lifetime.",
        },
      },
      {
        metin: "Refuse, keep them close to you.",
        basariliSonuc: {
          mesaj: "You refused; {cocuk} grew up by your side. Maybe a less brilliant future but you can see them every day.",
          detay: "Some closeness is more valuable than an opportunity.",
        },
        basarisizSonuc: {
          mesaj: "You refused but years later {cocuk} was hurt at you for missing this opportunity.",
          detay: "Some protection plants a seed of regret.",
        },
      },
    ],
  },

  aile2_dul_ebeveyn_yeniden_evlenme: {
    baslik: "Your Mother's New Suitor",
    metin:
      "The widowed {anne} came to your door and, bashfully, gave you news: a widower in the neighborhood is courting her, and she feels something close to a 'maybe' too. She's waiting for your approval, as if you were still a little child.",
    secenekler: [
      {
        metin: "Support her, be glad she's happy.",
        basariliSonuc: {
          mesaj: "'If you're happy, I'm happy, Mother,' you said. {anne} blushed like a young girl and hugged you.",
          detay: "Some late-coming happinesses are the sweetest.",
        },
        basarisizSonuc: {
          mesaj: "You gave your support but you couldn't shake a strange feeling of oddness inside.",
          detay: "Some support, even if sincere, takes time to get used to.",
        },
      },
      {
        metin: "Unable to hide your shock, object.",
        basariliSonuc: {
          mesaj: "'Mother, are you... serious?' you said in shock. She laughed: 'You'll understand one day too.' In the end you both started laughing.",
          detay: "Some awkward moments turn into a nice memory in the end.",
        },
        basarisizSonuc: {
          mesaj: "Your objection really hurt {anne}: 'So I don't deserve to be happy,' she said, sulking.",
          detay: "Some shocks can be hurtful when they're spoken aloud.",
        },
      },
    ],
  },

  aile2_kitlikta_komsuyla_paylasma: {
    baslik: "The Last Bread",
    metin:
      "The famine is harsh, even the last loaf you have left is numbered. The neighbor family at your door says their children haven't eaten anything for days. Your own family is hungry too.",
    secenekler: [
      {
        metin: "Share the bread, give some to your neighbor.",
        basariliSonuc: {
          mesaj: "You broke the bread. That night everyone went to bed a little hungry but no one was alone.",
          detay: "Some sharing doesn't fill a belly but it fills the soul.",
        },
        basarisizSonuc: {
          mesaj: "You shared it but the hunger deeply wore down you both.",
          detay: "Some kindnesses aren't without a price.",
        },
      },
      {
        metin: "Refuse, your own family comes first.",
        basariliSonuc: {
          mesaj: "You closed your door. Your own family went to bed full that night but you couldn't forget the look in the neighbor's children's eyes.",
          detay: "Some survival decisions leave a debt of conscience.",
        },
        basarisizSonuc: {
          mesaj: "When your neighbors heard this, they started calling you 'heartless'; you became isolated in the neighborhood.",
          detay: "Some decisions carry a price even if you survive.",
        },
      },
    ],
  },

  // ==================== NEW SET: DETAILED SPOUSE/CHILD DECISIONS (§33) ====================
  evl_kiskanclik: {
    baslik: "The Shadow of Jealousy",
    metin: "{es} heard you were talking a little too warmly with someone else. At supper their face is closed, their voice trembles.",
    secenekler: [
      {
        metin: "Explain calmly, reassure them, take their hand.",
        basariliSonuc: {
          mesaj: "{es} didn't want to listen at first, then leaned on your shoulder. The storm passed.",
          detay: "Jealousy is often just another word for thinking you go unseen.",
        },
        basarisizSonuc: { mesaj: "Nothing you said convinced them; that night they turned their back to you." },
      },
      {
        metin: "Brush it off, say 'don't be ridiculous' and move on.",
        basariliSonuc: { mesaj: "The argument ended but a worm had entered {es}'s heart." },
        basarisizSonuc: { mesaj: "'You never take me seriously,' they wept; things stayed icy for days." },
      },
      {
        metin: "Hit back, dig into their past.",
        basariliSonuc: { mesaj: "The fight grew, then you both fell silent from exhaustion. Nobody won." },
        basarisizSonuc: { mesaj: "The words said weren't taken back; that night {es} went to their mother's." },
      },
    ],
  },
  evl_para_talebi_es: {
    baslik: "Your Spouse's Wish",
    metin: "{es} had wanted something for a long time: a costly cloth, finer than the neighbor's. There's hope in their eyes.",
    secenekler: [
      {
        metin: "Buy it, they deserve it.",
        basariliSonuc: { mesaj: "When {es} saw the cloth they were delighted like a child; talked about it for days." },
        basarisizSonuc: { mesaj: "You bought it but the merchant cheated you; the cloth turned out plainer than expected." },
      },
      {
        metin: "Haggle, find a cheaper one.",
        basariliSonuc: { mesaj: "You bought a more modest cloth; {es} made do but their eye was still on the other one." },
        basarisizSonuc: { mesaj: "'You always think the cheapest is good enough for me,' they said, and sulked." },
      },
      {
        metin: "Refuse, it's no time for luxury.",
        basariliSonuc: { mesaj: "{es} said nothing but no one spoke at supper that evening." },
        basarisizSonuc: { mesaj: "They sulked for days; you heard them complain to the neighbors that you were tight-fisted." },
      },
    ],
  },
  evl_kayinvalide: {
    baslik: "Mother-in-law at the Door",
    metin: "{es}'s mother has grown old and cannot live alone. {es} wants to take her into the house.",
    secenekler: [
      {
        metin: "Accept, set aside a room for her.",
        basariliSonuc: { mesaj: "{es} embraced you. The old woman is cranky but in {es}'s eyes you're a hero now." },
        basarisizSonuc: { mesaj: "You accepted, but the woman's nagging turned the house into a hell." },
      },
      {
        metin: "Hire a servant so she can stay in her own home.",
        basariliSonuc: { mesaj: "It wasn't quite what {es} wanted, but seeing their mother cared for, they softened." },
        basarisizSonuc: { mesaj: "The servant proved unreliable; {es} reproached you: 'you left my mother to strangers.'" },
      },
      {
        metin: "Refuse firmly, this is your house.",
        basariliSonuc: { mesaj: "{es} couldn't say anything but the hurt in their eyes lingered a long time." },
        basarisizSonuc: { mesaj: "{es} cried out 'without you my mother would be on the street'; you didn't speak for days." },
      },
    ],
  },
  evl_krizi: {
    baslik: "Breaking Point",
    metin: "Things with {es} have gone truly sour. One morning at the table they said 'this can't go on.' The moment of decision.",
    secenekler: [
      {
        metin: "Hire a mediator/counselor, try to save the marriage.",
        basariliSonuc: {
          mesaj: "It took weeks but you can look at each other again. An ember remained under the ash.",
        },
        basarisizSonuc: { mesaj: "The effort went unanswered; {es} said 'we tried, it didn't work.'" },
      },
      {
        metin: "Endure in silence, let the marriage go on like this.",
        basariliSonuc: { mesaj: "You got used to living under one roof like two strangers." },
        basarisizSonuc: { mesaj: "The anger you buried gnawed at you; you can't sleep at night." },
      },
      {
        metin: "Separate, everyone to their own road.",
        basariliSonuc: {
          mesaj: "It was a short, cold farewell. The first days heavy, then a strange lightness.",
          detay: "Untying some bonds is a kind of mercy too.",
        },
        basarisizSonuc: {
          mesaj: "The separation turned ugly; court, gossip, relatives taking sides. Everyone came out wounded.",
        },
      },
    ],
  },
  evl_yildonumu: {
    baslik: "Wedding Anniversary",
    metin: "This year is your wedding anniversary. {es} pretends to expect nothing but their eye is on the door.",
    secenekler: [
      {
        metin: "Prepare a grand celebration.",
        basariliSonuc: { mesaj: "{es}'s eyes filled. 'I thought you'd forgotten,' they said, and laughed." },
        basarisizSonuc: { mesaj: "The preparations went wrong, guests came late; the intent was good but the evening was a mess." },
      },
      {
        metin: "A modest but heartfelt supper.",
        basariliSonuc: { mesaj: "Two plates, one candle. {es} said 'this is enough for me' and took your hand." },
        basarisizSonuc: { mesaj: "The meal was ordinary but at least you remembered the day." },
      },
      {
        metin: "Forget it, spend it like an ordinary day.",
        basariliSonuc: { mesaj: "{es} said nothing. In the morning there was a wet trace on the pillow." },
        basarisizSonuc: { mesaj: "Unused." },
      },
    ],
  },
  evl_es_hastalik: {
    baslik: "Your Spouse Fell Ill",
    metin: "{es} has been feverish for days, can't get out of bed. Their gaze is locked on you.",
    secenekler: [
      {
        metin: "Call the best physician in the city.",
        basariliSonuc: { mesaj: "The physician's medicine worked. {es} was on their feet a week later, grateful to you." },
        basarisizSonuc: { mesaj: "The physician did his best but the recovery was long; still, they saw you stayed by their side." },
      },
      {
        metin: "Keep watch yourself, nurse them at home.",
        basariliSonuc: { mesaj: "You kept watch for nights. The fever broke; when {es} opened their eyes they saw you first." },
        basarisizSonuc: { mesaj: "The illness worsened and you burned out too. {es} whispered 'you should have called a physician.'" },
      },
      {
        metin: "Mind your own work, it'll pass anyway.",
        basariliSonuc: { mesaj: "{es} recovered on their own but never forgot that you didn't even pass by the door." },
        basarisizSonuc: { mesaj: "The illness dragged on, the house fell apart; even the children asked 'where was father.'" },
      },
    ],
  },
  cocuk_okul_secimi: {
    baslik: "Your Child's Education",
    metin: "Your children are growing. Time to build them a future: an artisan's apprenticeship, a church/madrasa school, or the field beside you?",
    secenekler: [
      {
        metin: "Send them to an expensive school/tutor, demand the best.",
        basariliSonuc: { mesaj: "Your child learned their letters, does sums. The neighbors say 'your boy is educated.'" },
        basarisizSonuc: { mesaj: "The money went but the tutor was lax; the child learned things by halves." },
      },
      {
        metin: "Apprentice them to a craftsman.",
        basariliSonuc: { mesaj: "The child came home sweaty but proud: 'I hammered the first nail today.'" },
        basarisizSonuc: { mesaj: "The master was harsh; the child complained of being taught by beatings." },
      },
      {
        metin: "No need for school, put them to work beside you.",
        basariliSonuc: { mesaj: "An extra pair of hands helped, but a door closed in the child's eyes." },
        basarisizSonuc: { mesaj: "One day the child said 'you never cared about me'; that sentence won't leave your mind." },
      },
    ],
  },
  cocuk_para_talebi: {
    baslik: "Your Child's Wish",
    metin: "Your child has been after something for days: a toy, a pair of shoes their friends have. Shyly, they opened up to you.",
    secenekler: [
      {
        metin: "Buy it, childhood happens only once.",
        basariliSonuc: { mesaj: "Your child toured the whole neighborhood with joy. That evening they fell asleep hugging your neck." },
        basarisizSonuc: { mesaj: "You bought it but it wasn't the one they liked; still they said 'thanks, father.'" },
      },
      {
        metin: "Patiently explain why not now.",
        basariliSonuc: { mesaj: "They pouted but listened. 'Okay,' they said at last, seeming a bit grown." },
        basarisizSonuc: { mesaj: "'Always excuses,' they cried, and shut themselves in their room." },
      },
      {
        metin: "Scold them, say 'does money grow on trees.'",
        basariliSonuc: { mesaj: "They never asked you for anything again. Nothing. That's a kind of loss too." },
        basarisizSonuc: { mesaj: "The child kept saying 'the neighbor's father is better'; it stung." },
      },
    ],
  },
  cocuk_ergenlik: {
    baslik: "The Rebel Years",
    metin: "Your eldest child no longer listens: comes home late, speaks rudely, doesn't recognize your authority.",
    secenekler: [
      {
        metin: "Be patient, listen, give trust.",
        basariliSonuc: { mesaj: "It took months. One night they came to you themselves, you talked. The wall cracked." },
        basarisizSonuc: { mesaj: "Whatever you did wasn't enough; they slammed the door in your face and left." },
      },
      {
        metin: "Strict discipline, set rules, punish.",
        basariliSonuc: { mesaj: "Silence rules the house now. There's obedience but the light in their eyes is gone." },
        basarisizSonuc: { mesaj: "The child rebelled, one night never came home. Found two days later — blood came between you." },
      },
      {
        metin: "Ignore it, let it pass on its own.",
        basariliSonuc: { mesaj: "The storm died down on its own but they tell you nothing anymore." },
        basarisizSonuc: { mesaj: "They filled your indifference with bad friends; their name got mixed up in trouble." },
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
