import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/evlilikVeAile.ts — İngilizce çevirileri. */
export const OLAYLAR_EVLILIK_AILE_EN: Record<string, OlayCeviri> = {
  evlilik_uc_yol_karari: {
    baslik: "On the Threshold of Marriage",
    metin:
      "The time to marry has come, and three paths lie before you: the child of an influential but cold noble family, the heir of a rich but not very striking merchant family, or the one your heart chose — penniless but loving you. You'll choose your own fate.",
    secenekler: [
      {
        metin: "Make a marriage of convenience with an influential, noble family.",
        basariliSonuc: {
          mesaj:
            "The ceremony took place among the cold stones of the palace. Your spouse is at least fifteen years older, kind but distant toward you. Their family's name is now spoken alongside yours.",
          detay: "Your bed isn't warm but your table is full; some marriages are made not to keep warm but to rise.",
        },
        basarisizSonuc: {
          mesaj:
            "The family didn't find you 'worthy' enough, but held the marriage anyway with a small, plain ceremony. You see the disappointment in your spouse's eyes every morning.",
          detay: "Some marriages are just a bargain; in this one, you were the cheap side.",
        },
      },
      {
        metin: "Marry the dowered child of a rich merchant family.",
        basariliSonuc: {
          mesaj:
            "Your spouse's family covered the entire wedding cost. Your spouse isn't very striking, some in the neighborhood laughed behind your back, but the dowry chests are still full.",
          detay: "You eased your mind thinking beauty fades, gold doesn't.",
        },
        basarisizSonuc: {
          mesaj:
            "The dowry didn't turn out as rich as it looked, and on top of that your spouse learned you also married 'just for the money' and turned cold.",
          detay: "In some bargains both sides end up disappointed.",
        },
      },
      {
        metin: "Marry the one your heart chose — penniless but loved.",
        basariliSonuc: {
          mesaj:
            "In a tiny garden, though both families objected, you married someone whose smile you'll never forget. You're not rich, but you wake up smiling every morning.",
          detay: "Some wealth doesn't sleep in the coffer, but in the bed beside you.",
        },
        basarisizSonuc: {
          mesaj:
            "You married but neither side's family came to the wedding; you're happy, but this happiness has a price too: you're all alone.",
          detay: "Love sometimes excludes your family too.",
        },
      },
    ],
  },

  evl_ms_sogukluk: {
    baslik: "Same Table, Two Strangers",
    metin:
      "You sit across from {es} at dinner but the only thing passing between you is the sound of cutlery. You could try to break this silence or accept it as it is.",
    secenekler: [
      {
        metin: "Take a step, try to really get to know them.",
        basariliSonuc: {
          mesaj: "{es} was surprised at first, then loosened up a bit. You put together a real sentence for the first time.",
          detay: "Beneath the ice there's sometimes a small pool of water.",
        },
        basarisizSonuc: {
          mesaj: "{es} answered with a single word and got up from the table. Your attempt went unanswered.",
          detay: "Some ice doesn't thaw in one evening.",
        },
      },
      {
        metin: "Accept the silence, focus on your work.",
        basariliSonuc: {
          mesaj: "You didn't talk but that served your work; your mind didn't wander elsewhere.",
          detay: "Some marriages are just a partnership; that's a kind of balance too.",
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
      "Your spouse's mother arrived unannounced and started 'fixing' the house top to bottom: the curtains are wrong, the food is unsalted, and you don't act 'noble' enough either. {es}, meanwhile, watches her in silence.",
    secenekler: [
      {
        metin: "Draw a boundary, politely but clearly.",
        basariliSonuc: {
          mesaj:
            "You spoke politely but firmly. {es} looked at you with gratitude as she left; no one had ever said that on their behalf.",
          detay: "Sometimes defending a spouse is worth more than embracing them.",
        },
        basarisizSonuc: {
          mesaj: "The mother-in-law hit the roof and started telling the city you were a 'disrespectful in-law'.",
          detay: "Some families never forgive criticism.",
        },
      },
      {
        metin: "Say nothing, endure it, don't disturb the peace.",
        basariliSonuc: {
          mesaj: "You submitted to everything. The house stayed quiet but the anger built up inside you.",
          detay: "Some peace is really a suppressed storm.",
        },
        basarisizSonuc: {
          mesaj: "Your enduring wasn't enough; the mother-in-law humiliated you once more before she left.",
          detay: "Submitting doesn't always work.",
        },
      },
    ],
  },

  evl_ms_saray_entrikasina_cekilme: {
    baslik: "The Family's Game",
    metin:
      "Your spouse's family wants to draw you into a power game: they want your signature on a secret alliance against a rival family. Refusing isolates you within the family, accepting draws you into a dangerous game.",
    secenekler: [
      {
        metin: "Sign it, show your loyalty to the family.",
        basariliSonuc: {
          mesaj: "You signed. {es} looked at you with real appreciation for the first time — you'd done something for their family.",
          detay: "In some marriages, love is won through displays of loyalty.",
        },
        basarisizSonuc: {
          mesaj: "The plan came to light, the rival family came to make you answer for it. You didn't get off cheap.",
          detay: "In families' games, it's usually the in-law who pays the price.",
        },
      },
      {
        metin: "Politely refuse, stay out of this game.",
        basariliSonuc: {
          mesaj: "You refused; {es} didn't take it with understanding, and you were branded a 'weak' spouse in their family's eyes.",
          detay: "Some refusals, even if right, aren't without a price.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal deeply hurt the family; {es} doesn't even keep that old distance with you anymore, they've grown further away.",
          detay: "Some doors, once closed, are hard to open.",
        },
      },
    ],
  },

  evl_ms_ev_ici_gerilim: {
    baslik: "A Fight Over Protocol",
    metin:
      "{es} humiliated you in front of everyone at a reception: because you used the 'wrong' word. When you got home your anger was boiling.",
    secenekler: [
      {
        metin: "Raise your voice, respond with the same harshness.",
        basariliSonuc: {
          mesaj:
            "You shouted, they shouted. No one backed down but at least now it's not silent anger, it's open war.",
          detay: "Some marriages breathe through fighting more than silence.",
        },
        basarisizSonuc: {
          mesaj: "The fight got very ugly; {es} didn't want to eat in the same room as you again.",
          detay: "Some words can't be taken back.",
        },
      },
      {
        metin: "Take the low road, try to learn the protocol.",
        basariliSonuc: {
          mesaj: "You apologized and really tried to learn. {es} appreciated it, at least this time.",
          detay: "Some victories are won by stepping back.",
        },
        basarisizSonuc: {
          mesaj: "You tried but {es} still stayed distant; this time you weren't enough.",
          detay: "Not every effort meets an immediate response.",
        },
      },
    ],
  },

  evl_ms_es_kotu_soz_yayiyor: {
    baslik: "The Palace's Whispers",
    metin:
      "The coldness between you has now turned into revenge: {es} has been telling their close circle humiliating, partly invented stories about you. Your reputation is eroding with this gossip.",
    secenekler: [
      {
        metin: "Confront them, demand an accounting openly.",
        basariliSonuc: {
          mesaj: "The confrontation was harsh but {es} at least promised not to spread it openly again.",
          detay: "Some wars stop only when spoken about openly.",
        },
        basarisizSonuc: {
          mesaj: "The confrontation turned into a fight; {es} stubbornly made the gossip even bigger.",
          detay: "Some fires go out when you go at them, some grow bigger.",
        },
      },
      {
        metin: "Ignore it, repair your reputation by other means.",
        basariliSonuc: {
          mesaj: "You never responded to the gossip; your circle slowly saw the truth through their own observations.",
          detay: "Sometimes silence is a stronger answer than arguing.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was read as 'an admission of guilt'; the gossip grew for a while longer.",
          detay: "Ignoring it doesn't always work.",
        },
      },
    ],
  },

  evl_ms_para_kaciriyor: {
    baslik: "The Shrinking Coffer",
    metin:
      "Counting your coffer, you noticed the figures didn't add up. When you questioned it {es} first denied it, then confessed: they've been regularly sending money to their own family without your knowledge — against the chance that you might leave them one day.",
    secenekler: [
      {
        metin: "Confront them angrily, demand the money back.",
        basariliSonuc: {
          mesaj:
            "After a harsh argument you got part of it back. But you both know now that you don't trust each other.",
          detay: "Some losses of trust are never fully repaired.",
        },
        basarisizSonuc: {
          mesaj:
            "{es} blamed you: 'You never made me feel safe either.' The fight grew, and the lost money didn't come back.",
          detay: "Some reckonings only open new wounds.",
        },
      },
      {
        metin: "Accept it quietly, start your own secret savings.",
        basariliSonuc: {
          mesaj: "You said nothing; you started hiding your own share too. The marriage is now just two separate coffers.",
          detay: "Some silences aren't peace, just a postponement.",
        },
        basarisizSonuc: {
          mesaj: "Your silence emboldened them; the amount they siphoned off this time was much larger.",
          detay: "Ignored behavior usually comes back bigger.",
        },
      },
    ],
  },

  evl_ms_rakibe_sir_sizdirma: {
    baslik: "The Whisper of Betrayal",
    metin:
      "{rakip} talks as if they know your private plans — only {es} could know that. Your hurt spouse has handed your cards to your rival.",
    secenekler: [
      {
        metin: "Accuse {es} directly, demand an accounting.",
        basariliSonuc: {
          mesaj:
            "They tried to deny it but the guilt in their eyes gave everything away. You don't trust them at home or at work anymore.",
          detay: "Some betrayals are never forgotten.",
        },
        basarisizSonuc: {
          mesaj: "They rejected your accusations and told everyone you were a 'paranoid spouse'; your reputation took a share of this fight too.",
          detay: "Some accusations backfire when they stay unproven.",
        },
      },
      {
        metin: "Quietly change your plans, never give full trust.",
        basariliSonuc: {
          mesaj: "From then on you shared no critical plan with your spouse. Your rival never gained the same advantage again.",
          detay: "Some lessons are bitter but lasting.",
        },
        basarisizSonuc: {
          mesaj: "Your precaution came too late; your rival made another move with your secrets.",
          detay: "Once trust is broken, even precaution sometimes isn't enough.",
        },
      },
    ],
  },

  evl_ms_es_destegi_toplum: {
    baslik: "A Silent Alliance",
    metin:
      "This marriage that started cold has, over the years, turned into an unexpected respect. {es} offers to bring together the influential names in their circle for you.",
    secenekler: [
      {
        metin: "Accept the offer, build a network together.",
        basariliSonuc: {
          mesaj: "{es} introduced you to their circle as a full partner. The doors opened one by one.",
          detay: "Some alliances are strengthened not by love but by mutual respect.",
        },
        basarisizSonuc: {
          mesaj: "Though some circles still see you as an 'outsider', {es}'s effort wasn't wasted.",
          detay: "Some doors open slowly, but they open.",
        },
      },
      {
        metin: "Politely refuse, make your own way.",
        basariliSonuc: {
          mesaj: "You chose to build your own success with your own hands; {es} respected that independence.",
          detay: "Some support leaves a bond even when refused.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal caused a little offense but they didn't dwell on it.",
          detay: "Every no leaves a small mark.",
        },
      },
    ],
  },

  evl_ms_saraya_tanitma: {
    baslik: "The Palace Gate",
    metin:
      "{es} offers, for the first time, to introduce you to their family's palace circle with a formal ceremony. Despite the distance between you, this is the first real gesture they've made to you.",
    secenekler: [
      {
        metin: "Accept the offer, attend the ceremony together.",
        basariliSonuc: {
          mesaj: "At the ceremony you were received with respect beside {es}. This marriage opened a real door for you for the first time.",
          detay: "Some gestures aren't from love but still forge a bond.",
        },
        basarisizSonuc: {
          mesaj: "Not fully knowing the protocol, you made a small blunder; {es} tried to overlook it, embarrassed.",
          detay: "Stepping into some worlds takes time.",
        },
      },
      {
        metin: "Politely refuse, you feel you don't belong to this world.",
        basariliSonuc: {
          mesaj: "You refused; {es} understood but never repeated this gesture.",
          detay: "Some doors, once missed, stay closed for a long time.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal surprised {es}: 'I was trying to give you a chance,' they said, hurt.",
          detay: "Some well-meaning offers hurt when turned down.",
        },
      },
    ],
  },

  evl_ms_es_trip_atma: {
    baslik: "A Swell of Pride",
    metin:
      "Today {es} took such offense at a servant addressing them by the 'wrong' title, and staged such a piece of theater, that the whole mansion was in an uproar: they pretended to faint, then suddenly sprang up and scolded everyone.",
    secenekler: [
      {
        metin: "Smile and defuse the situation, send everyone away.",
        basariliSonuc: {
          mesaj: "You calmed them down with a touch of humor. {es} was even laughing at themselves a little while later.",
          detay: "Some storms disperse with a laugh.",
        },
        basarisizSonuc: {
          mesaj: "The theater went on for another half hour; you bit your lip to keep from laughing.",
          detay: "Some performances end at their own pace.",
        },
      },
      {
        metin: "Watch them, don't react, wait for it to pass.",
        basariliSonuc: {
          mesaj: "You watched quietly. In the end they calmed down on their own and went back to tea as if nothing had happened.",
          detay: "Some storms die down without intervention too.",
        },
        basarisizSonuc: {
          mesaj: "Your indifference provoked {es} further: 'Do you find watching me entertaining?'",
          detay: "Some non-reactions count as a reaction too.",
        },
      },
    ],
  },

  evl_ms_es_hastaligi_soguk_bakim: {
    baslik: "A Stranger Falls Ill",
    metin:
      "{es} lies burning with fever. Despite the distance between you, seeing someone lying there with no one stirs something in you that you didn't expect.",
    secenekler: [
      {
        metin: "Keep vigil at their side yourself, show real care.",
        basariliSonuc: {
          mesaj:
            "You kept vigil for nights. When they recovered, {es} thanked you truly for the first time — this time there was no coldness in their eyes.",
          detay: "Some closeness is born on nights of illness.",
        },
        basarisizSonuc: {
          mesaj: "You did what you could but their recovery took long; still, they noticed your effort.",
          detay: "Not every effort bears fruit at once, but it isn't wasted either.",
        },
      },
      {
        metin: "Hire the best physician, get back to your work.",
        basariliSonuc: {
          mesaj: "The physician did his job, {es} recovered. But their distance stayed the same as their thanks.",
          detay: "Some duties are done in full but win no heart.",
        },
        basarisizSonuc: {
          mesaj: "The physician wasn't enough. Even though {es} recovered, they hid their hurt over 'you not coming yourself'.",
          detay: "Sometimes money can't replace presence.",
        },
      },
    ],
  },

  evl_ms_bosanma_baskisi: {
    baslik: "The Family's Last Word",
    metin:
      "Your spouse's family sent a formal letter: they say the coldness between you is 'a stain on the family' and demand a last chance for either the marriage to be dissolved or a thorough repair.",
    secenekler: [
      {
        metin: "Try one last time, work to repair the relationship.",
        basariliSonuc: {
          mesaj:
            "Unexpectedly it worked; {es} saw you really making an effort for the first time and softened.",
          detay: "Some ice thaws at the last moment.",
        },
        basarisizSonuc: {
          mesaj:
            "Your effort fell short; the family formally dissolved the marriage. In the city you're spoken of as the 'rejected in-law'.",
          detay: "Some bridges are noticed too late to be repaired.",
        },
      },
      {
        metin: "Agree to it, ask for a dignified separation.",
        basariliSonuc: {
          mesaj: "You separated by mutual agreement. Your status was shaken but at least it was your own choice.",
          detay: "Some separations are not a defeat but a release.",
        },
        basarisizSonuc: {
          mesaj: "The separation turned into an ugly fight over fortune; you lost seriously from both your money and your reputation.",
          detay: "Some endings hurt, however inevitable they are.",
        },
      },
    ],
  },

  evl_ms_yaslanan_es_bakimi: {
    baslik: "The Age Between",
    metin:
      "The big age difference between you is now visible: {es} is aging much faster than you, some days they can't even get out of bed. Caring for them has become an important part of your life.",
    secenekler: [
      {
        metin: "Care for them patiently, never leave their side.",
        basariliSonuc: {
          mesaj:
            "With your patience you eased {es}'s last years. This marriage never started warm but in the end it turned into a real devotion.",
          detay: "Some loves come late but deep.",
        },
        basarisizSonuc: {
          mesaj: "You did what you could but the exhaustion wore you down too.",
          detay: "Giving care sometimes eats the caregiver's health too.",
        },
      },
      {
        metin: "Hire a carer, get on with your own life.",
        basariliSonuc: {
          mesaj: "You hired a carer; your health held up but {es} never hid that they felt lonely.",
          detay: "Some solutions are practical but carry a price.",
        },
        basarisizSonuc: {
          mesaj: "The carer didn't give enough attention; {es} felt abandoned.",
          detay: "Not everything solved with money brings peace of mind.",
        },
      },
    ],
  },

  evl_ms_cocuklarina_soguk: {
    baslik: "A Distant Parent",
    metin:
      "{es} keeps a distance with {cocuk} similar to the coldness between you: they rarely play, rarely hug. Your child notices and asks you: 'Doesn't my parent love me?'",
    secenekler: [
      {
        metin: "Fill the gap yourself, give your child double the love.",
        basariliSonuc: {
          mesaj: "You gave your child the warmth they needed. The trust in their eyes closed the gap left by your spouse a little.",
          detay: "Some gaps can be filled by a single parent too.",
        },
        basarisizSonuc: {
          mesaj: "You tried but you couldn't fill every gap alone; the exhaustion wore you down.",
          detay: "Giving love for two can be heavy for one.",
        },
      },
      {
        metin: "Talk to your spouse, ask them to make an effort too.",
        basariliSonuc: {
          mesaj: "{es} surprisingly agreed; they're trying to spend time with the child now, clumsily as it is.",
          detay: "Some parenting lessons are learned late, but learned.",
        },
        basarisizSonuc: {
          mesaj: "{es} didn't like being blamed: 'I was raised this way,' they said, and closed the subject.",
          detay: "Some patterns resist being broken.",
        },
      },
    ],
  },

  evl_ms_beklenmedik_yakinlik: {
    baslik: "Warmth That Came Years Later",
    metin:
      "One evening, at a moment you never expected, {es} took your hand and said, 'Marrying you was a calculation, but now I truly care about you.' Years of coldness melted in a single sentence.",
    secenekler: [
      {
        metin: "Open your heart too, answer with the same sincerity.",
        basariliSonuc: {
          mesaj:
            "Two 'calculating' people realized, years later, that they really loved each other. This became your most unexpected but truest moment.",
          detay: "Some loves begin not with a ceremony but with years.",
        },
        basarisizSonuc: {
          mesaj: "You answered but the shyness of old habits is still between you; still, it's a beginning.",
          detay: "Some changes come not all at once but step by step.",
        },
      },
      {
        metin: "Stay cautious, don't trust the years of distance.",
        basariliSonuc: {
          mesaj: "You stayed cautious; {es} wasn't hurt but the magic of the moment faded a little.",
          detay: "Some chances are missed through caution.",
        },
        basarisizSonuc: {
          mesaj: "Your cold response deeply hurt {es}: 'I'll never open up this much again,' they said.",
          detay: "Some doors, once closed, don't open for a long time.",
        },
      },
    ],
  },

  evl_mt_disgorunum_alay: {
    baslik: "In the Language of the Marketplace",
    metin:
      "In the market a few people made jokes about your spouse's appearance where you could hear, then laughed a furtive laugh. {es} was right there, heard it all.",
    secenekler: [
      {
        metin: "Scold them in front of everyone, defend your spouse.",
        basariliSonuc: {
          mesaj: "You raised your voice so that no one would mock your spouse like that again. {es} looked at you with real gratitude for the first time.",
          detay: "Some loyalties are proven not with money but with courage.",
        },
        basarisizSonuc: {
          mesaj: "The fight got ugly, the market crowd kept mocking you both.",
          detay: "Some wars end without being won.",
        },
      },
      {
        metin: "Ignore it, don't make a scene.",
        basariliSonuc: {
          mesaj: "You didn't react; the crowd got bored fast and the matter closed.",
          detay: "Some fires go out if not fed.",
        },
        basarisizSonuc: {
          mesaj: "{es} read your silence as 'you agreed with them' and was deeply hurt.",
          detay: "Silence sometimes feels like a betrayal.",
        },
      },
    ],
  },

  evl_mt_kayinpeder_is_ortakligi: {
    baslik: "The Father-in-Law's Offer",
    metin:
      "Your father-in-law wants you to become a partner in his business — but this will mean sharing most of your decisions with him now. Would you set aside your independence?",
    secenekler: [
      {
        metin: "Accept the offer, enter the partnership.",
        basariliSonuc: {
          mesaj:
            "The partnership was signed. Your father-in-law now sticks his nose into every decision but your coffer has never been so full.",
          detay: "Some growth comes at the price of independence.",
        },
        basarisizSonuc: {
          mesaj: "The partnership didn't go as you expected; your father-in-law made it clear he found you 'inadequate'.",
          detay: "Some partnerships please only one side.",
        },
      },
      {
        metin: "Politely refuse, stay in your own business.",
        basariliSonuc: {
          mesaj: "You chose to stay your own way; though your father-in-law seemed offended, {es} respected your independence.",
          detay: "Some no's are worth more in the long run than the best yes.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal hurt the family; {es} sulked, saying 'you look down on my family'.",
          detay: "Some decisions, even right ones, are misunderstood.",
        },
      },
    ],
  },

  evl_mt_ev_ici_kavga: {
    baslik: "A Fight Over the Ledger",
    metin:
      "A sharp argument broke out between you and {es} over household expenses: who spent how much, whose money counts as whose. Your voice is rising.",
    secenekler: [
      {
        metin: "Come out hard, defend your share.",
        basariliSonuc: {
          mesaj: "You were proven right, the accounts were corrected your way. But {es} won't forget this harshness.",
          detay: "Some victories cost dearly at the marriage table.",
        },
        basarisizSonuc: {
          mesaj: "The fight grew a lot, {es} went to stay with their family for a while.",
          detay: "Some arguments turn into a family visit overnight.",
        },
      },
      {
        metin: "Take the low road, try to compromise.",
        basariliSonuc: {
          mesaj: "You gave a concession, you rearranged the accounts together. The house calmed down again.",
          detay: "Some compromises touch the wallet but are worth the peace.",
        },
        basarisizSonuc: {
          mesaj: "You made a concession but {es} still wasn't satisfied, said 'it's not enough'.",
          detay: "Not every compromise is met with a response.",
        },
      },
    ],
  },

  evl_mt_para_kaciriyor: {
    baslik: "The Secret Ledger",
    metin:
      "While organizing the storehouse you found a ledger opened in {es}'s name, hidden from you. For years they've been siphoning money from the joint coffer and saving it in their own name.",
    secenekler: [
      {
        metin: "Confront them directly, have the account closed.",
        basariliSonuc: {
          mesaj:
            "You had the account closed, the money came back. But {es} couldn't even meet your eyes while promising never to hide anything from you again.",
          detay: "Some losses of trust aren't made up with money.",
        },
        basarisizSonuc: {
          mesaj: "{es} wouldn't back down, saying 'This money came into the marriage as mine anyway.' The fight went off like a bomb.",
          detay: "In some marriages the question of 'whose money' is never resolved.",
        },
      },
      {
        metin: "Watch quietly, take your own precautions.",
        basariliSonuc: {
          mesaj: "You said nothing but you keep your own share separate now too. The marriage is now just two separate accounts.",
          detay: "Some silences aren't peace, just strategy.",
        },
        basarisizSonuc: {
          mesaj: "Your silence emboldened them; this time they siphoned off a much larger amount.",
          detay: "Ignored behavior usually comes back bigger.",
        },
      },
    ],
  },

  evl_mt_es_dedikodu_yapiyor: {
    baslik: "The Bazaar's Gossip",
    metin:
      "A rumor going around the bazaar reached your ears: {es} has been telling acquaintances that your trade has actually gone under, that you're in debt. None of it is true but your reputation suffers from it.",
    secenekler: [
      {
        metin: "Confront them, ask why they did this.",
        basariliSonuc: {
          mesaj: "They confessed: 'Maybe I wanted to make you suffer this way.' Bitter, but at least you know the reason now.",
          detay: "Some resentments come out not in words but in gossip.",
        },
        basarisizSonuc: {
          mesaj: "They denied it and told everyone you were 'paranoid'; your reputation suffered a second time.",
          detay: "Some confrontations grow the fire instead of putting it out.",
        },
      },
      {
        metin: "Openly show everyone the real state of your trade.",
        basariliSonuc: {
          mesaj: "You showed your ledgers openly; the gossip died out. But {es} didn't like having their word discredited this way.",
          detay: "Some reputation rescues create a price at home.",
        },
        basarisizSonuc: {
          mesaj: "Some stayed skeptical, and {es} felt humiliated in front of everyone.",
          detay: "Some solutions fully satisfy no side.",
        },
      },
    ],
  },

  evl_mt_ticaret_sirrini_rakibe_satiyor: {
    baslik: "Sold Secrets",
    metin:
      "{rakip} is suddenly acting as if they know your most secret trade plans. There's only one explanation: your hurt spouse sold what they knew to your rival for gold.",
    secenekler: [
      {
        metin: "Consider throwing {es} out of the house, have a harsh reckoning.",
        basariliSonuc: {
          mesaj:
            "They confessed the truth; you confronted them in anger. You both know now that this marriage has stopped being a matter of trust.",
          detay: "Some betrayals bring the end of a marriage; only the timing is uncertain.",
        },
        basarisizSonuc: {
          mesaj: "They denied it and told everyone you were 'overly suspicious'; your reputation took a share of that too.",
          detay: "Some accusations backfire when they stay unproven.",
        },
      },
      {
        metin: "Quietly change your business strategy, tell them nothing.",
        basariliSonuc: {
          mesaj: "From then on you hid your critical plans from them. Your rival never gained the same advantage again.",
          detay: "Some lessons are bitter but lasting.",
        },
        basarisizSonuc: {
          mesaj: "Your precaution wasn't enough; your rival stayed a step ahead of you once more.",
          detay: "Once trust is broken, even precaution sometimes isn't enough.",
        },
      },
    ],
  },

  evl_mt_ticarete_destek: {
    baslik: "A Shared Capital",
    metin:
      "{es} offers to add some capital left to them by their own family into your business: 'This is my business as much as yours now.'",
    secenekler: [
      {
        metin: "Accept the offer, combine the capital.",
        basariliSonuc: {
          mesaj: "You combined the capital. Your business grew and you feel now that you both built it.",
          detay: "Some marriages slowly turn into a real partnership.",
        },
        basarisizSonuc: {
          mesaj: "The investment didn't grow as much as you'd hoped but at least you tried it together.",
          detay: "Sometimes it's not the result but the effort that matters.",
        },
      },
      {
        metin: "Politely refuse, continue with your own capital.",
        basariliSonuc: {
          mesaj: "You chose to stand on your own feet; {es} understood it as a matter of pride and respected it.",
          detay: "Some independence doesn't diminish a love.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal saddened {es} a little: 'You don't see me as a partner,' they said.",
          detay: "Some well-meaning no's are misunderstood too.",
        },
      },
    ],
  },

  evl_mt_ozen_gostermesi: {
    baslik: "Beyond Appearance",
    metin:
      "Going through a hard period, {es} cared for you with a tenderness you never expected: they sat by you for nights, asking nothing. Your early thought of 'just for the money' seems meaningless now.",
    secenekler: [
      {
        metin: "Notice this tenderness, thank them sincerely.",
        basariliSonuc: {
          mesaj: "Your thanks were sincere and {es} felt it. Maybe you're building something beyond appearance.",
          detay: "Some beauties are seen not with the eye but with time.",
        },
        basarisizSonuc: {
          mesaj: "You thanked them but you still haven't fully internalized this change.",
          detay: "Some prejudices don't dissolve in one day.",
        },
      },
      {
        metin: "Stay distant anyway, don't change your habit.",
        basariliSonuc: {
          mesaj: "You kept your distance; {es} wasn't hurt but you spoiled the taste of this nice moment a bit.",
          detay: "Some chances are missed through caution.",
        },
        basarisizSonuc: {
          mesaj: "Your coldness really hurt {es} this time: 'This is too much,' they said.",
          detay: "Some good intentions burn out when they go unanswered.",
        },
      },
    ],
  },

  evl_mt_kiskanclik_tripi: {
    baslik: "A Sudden Burst of Jealousy",
    metin:
      "While you were having an ordinary chat with a customer, {es} suddenly cut in, slamming the tray in their hand on the table: 'Why are you laughing so much with them?!' The whole shop went quiet.",
    secenekler: [
      {
        metin: "Pull them aside, calm them down gently.",
        basariliSonuc: {
          mesaj: "You pulled them aside and calmed them down. Under the jealousy there was actually a fear of losing you.",
          detay: "Some fits are really a confession of love.",
        },
        basarisizSonuc: {
          mesaj: "Despite your effort to calm them, this scene was talked about in the shop for days.",
          detay: "Some scenes aren't easily forgotten.",
        },
      },
      {
        metin: "Make it clear, right there in front of everyone, that they've embarrassed you.",
        basariliSonuc: {
          mesaj: "You silenced them with a hard look. The scene ended but {es} went home quietly, hurt.",
          detay: "Some victories pay their price at home.",
        },
        basarisizSonuc: {
          mesaj: "Your reaction made the scene bigger; you both shouted at each other in the middle of the shop.",
          detay: "Some moments get worse with intervention.",
        },
      },
    ],
  },

  evl_mt_saglik_sorunu: {
    baslik: "A Weak Body",
    metin:
      "{es} has a frail constitution from birth; this winter they've had illness after illness. You need to keep a good physician on hand but it's costly.",
    secenekler: [
      {
        metin: "Hire the best physician, spare no expense.",
        basariliSonuc: {
          mesaj: "The physician came regularly, {es}'s health recovered. They valued this care.",
          detay: "Some care truly unites a marriage.",
        },
        basarisizSonuc: {
          mesaj: "Despite the physician the recovery was slow; at least you know you did what you could.",
          detay: "Not every effort gives immediate results.",
        },
      },
      {
        metin: "Try to get by with home remedies.",
        basariliSonuc: {
          mesaj: "Luck was on your side, home remedies were enough this time.",
          detay: "Sometimes thrift goes unpunished.",
        },
        basarisizSonuc: {
          mesaj: "{es}'s condition worsened; they were hurt, saying 'you have the money but you don't care about me'.",
          detay: "Some thrift costs dearly.",
        },
      },
    ],
  },

  evl_mt_bosanma_riski: {
    baslik: "The End of a Partnership",
    metin:
      "The mistrust between you has now spread to your business partnership too; {es}'s family is threatening to withdraw their capital and hinting that the marriage is over.",
    secenekler: [
      {
        metin: "Try one last compromise to save the capital.",
        basariliSonuc: {
          mesaj: "You found a compromise at the last moment; the capital stayed, and the marriage — fragile as it is — goes on.",
          detay: "Some relationships pull themselves together one more time before fully collapsing.",
        },
        basarisizSonuc: {
          mesaj: "The compromise collapsed; both the capital and your spouse are gone. Your business reputation took a share of this separation too.",
          detay: "Some partnerships, once cracked, aren't fully mended.",
        },
      },
      {
        metin: "Accept an amicable separation, limit the loss.",
        basariliSonuc: {
          mesaj: "You separated by agreement; you took a loss but at least the process was dignified.",
          detay: "Some endings leave fewer marks when they end calmly.",
        },
        basarisizSonuc: {
          mesaj: "Even the agreement turned into a fight; both sides smeared each other around the city.",
          detay: "Some separations flare up however calmly they're planned.",
        },
      },
    ],
  },

  evl_mt_ceyiz_kavgasi: {
    baslik: "A Fight Over the Dowry",
    metin:
      "Your father-in-law still hasn't given part of the dowry promised at the wedding; he keeps making excuses. {es} is stuck in the middle, unable to fully stand up for you or for their family.",
    secenekler: [
      {
        metin: "Talk to your father-in-law directly, demand what's yours.",
        basariliSonuc: {
          mesaj: "You got what was yours but your father-in-law will never forget it; {es} was worn down by being caught in the middle.",
          detay: "Even some justified demands carry a price.",
        },
        basarisizSonuc: {
          mesaj: "Your father-in-law declared you 'greedy'; {es} came out of this argument exhausted too.",
          detay: "The timing of some demands can be wrong.",
        },
      },
      {
        metin: "Let it go, don't leave {es} stuck in the middle.",
        basariliSonuc: {
          mesaj: "You let it go; {es} saw you, for the first time, as someone who took their side over their family's.",
          detay: "Some things given up are the greatest gains.",
        },
        basarisizSonuc: {
          mesaj: "You let it go but a resentment still stayed in you.",
          detay: "Even the right choice sometimes stings a little.",
        },
      },
    ],
  },

  evl_mt_cocuk_disgorunum_alay: {
    baslik: "Your Child Mocked",
    metin:
      "The neighborhood children mocked {cocuk} for a feature resembling your spouse; {cocuk} came home crying. How will you handle this?",
    secenekler: [
      {
        metin: "Sit with your child, build their self-confidence.",
        basariliSonuc: {
          mesaj: "After a long talk {cocuk} smiled and said 'I'm happy being who I am.'",
          detay: "Some wounds heal through talking.",
        },
        basarisizSonuc: {
          mesaj: "You talked but {cocuk} is still a little sad; this won't pass in one day.",
          detay: "Some wounds need time.",
        },
      },
      {
        metin: "Go to the families of the mocking children and demand an accounting.",
        basariliSonuc: {
          mesaj: "You went to the families and got an apology. But you started being called 'overreactive' in the neighborhood.",
          detay: "Some victories carry a small price.",
        },
        basarisizSonuc: {
          mesaj: "The families found you in the wrong, the argument grew and you were the talk of the neighborhood.",
          detay: "Some reckonings backfire.",
        },
      },
    ],
  },

  evl_mt_yeni_is_firsati_agir_sart: {
    baslik: "An Opportunity With Heavy Conditions",
    metin:
      "Your spouse's family offers you a huge business opportunity — but there's a condition: you'll give up your professional independence entirely and tie yourself fully to their trade network.",
    secenekler: [
      {
        metin: "Accept, become part of the big network.",
        basariliSonuc: {
          mesaj: "You became part of the network; your earnings multiplied but now every decision of yours is referred to them.",
          detay: "Some growth comes at the price of freedom.",
        },
        basarisizSonuc: {
          mesaj: "The expected gain didn't come; the family made it clear they found you 'inadequate'.",
          detay: "Some opportunities don't turn out as bright as they look.",
        },
      },
      {
        metin: "Refuse, go your own independent way.",
        basariliSonuc: {
          mesaj: "You refused; you keep growing as a small but entirely your own business.",
          detay: "Some small freedoms are better than big dependencies.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal hurt the family; {es} sulked, saying 'this opportunity was important for my family'.",
          detay: "Some right decisions are misunderstood.",
        },
      },
    ],
  },

  evl_mt_gercek_ask_kesfi: {
    baslik: "A Truth Beyond Appearance",
    metin:
      "The years passed; you don't even notice {es}'s appearance anymore — you just see them: patient, loyal, someone who truly knows you. One evening you want to tell them this.",
    secenekler: [
      {
        metin: "Tell them openly, open your heart.",
        basariliSonuc: {
          mesaj:
            "{es} couldn't hold back their tears: 'I waited years to hear this,' they said. This was the moment a story that started for gain turned into real love.",
          detay: "Some loves are born not with a glance but through years of loyalty.",
        },
        basarisizSonuc: {
          mesaj: "You said it but your words didn't come out quite as you wanted; still, {es} understood your intent.",
          detay: "Some confessions are valuable even when imperfect.",
        },
      },
      {
        metin: "Keep it inside, try to show it but not say it.",
        basariliSonuc: {
          mesaj: "You didn't say it in words but your actions already told it; {es} felt it quietly.",
          detay: "Some loves are understood without words.",
        },
        basarisizSonuc: {
          mesaj: "You kept it inside and this moment stayed in your mind as an unsaid sentence.",
          detay: "Some silences turn into regret later.",
        },
      },
    ],
  },

  evl_ask_yoksulluk_kavgasi: {
    baslik: "Empty Coffer, Full Nerves",
    metin:
      "The end of the month came and your coffer is nearly empty. For the first time a real fight broke out with {es} over money: 'Love doesn't fill a belly,' they shouted.",
    secenekler: [
      {
        metin: "Shout too, let out your built-up stress.",
        basariliSonuc: {
          mesaj: "You shouted, the weight inside you lightened but you saw the hurt in {es}'s eyes.",
          detay: "Some relief comes at someone's expense.",
        },
        basarisizSonuc: {
          mesaj: "The fight got very ugly; for the first time you said really cutting words to each other.",
          detay: "Some words can wound a love too.",
        },
      },
      {
        metin: "Hug them, try to find a solution together.",
        basariliSonuc: {
          mesaj: "You hugged, cried, then laughed. There's still no money but you held each other tighter.",
          detay: "Some poverty is carried more lightly with love.",
        },
        basarisizSonuc: {
          mesaj: "A hug wasn't enough this time; the problem is still there, like a shadow.",
          detay: "Some hugs don't solve everything but lighten something.",
        },
      },
    ],
  },

  evl_ask_aile_onaylamiyor: {
    baslik: "The Door That Won't Close",
    metin:
      "Your family still hasn't accepted this marriage; at a holiday visit your mother turned her back on {es}. Even though {es} tries to ignore it, the hurt is clear.",
    secenekler: [
      {
        metin: "Speak harshly with your family, defend your choice.",
        basariliSonuc: {
          mesaj: "You laid out the situation clearly to your family. {es} felt you fully behind them for the first time.",
          detay: "Some loyalties test even blood ties.",
        },
        basarisizSonuc: {
          mesaj: "The talk turned into a fight; things got even tenser with your family, and {es} felt guilty.",
          detay: "Some defenses wound both sides.",
        },
      },
      {
        metin: "Be patient, wait for them to come around over time.",
        basariliSonuc: {
          mesaj: "You were patient; over the years the family slowly softened, and at one holiday table they invited {es} too.",
          detay: "Some acceptances can't be rushed.",
        },
        basarisizSonuc: {
          mesaj: "Your patience felt to {es} like 'you don't defend me enough'.",
          detay: "Patience is sometimes perceived as passivity.",
        },
      },
    ],
  },

  evl_ask_kiskanclik_rakip: {
    baslik: "Wandering Eyes",
    metin:
      "{rakip} has been showing far too much interest in {es} lately — 'coincidentally' always turning up in the same places, complimenting too much. {es} is uncomfortable with it but you feel a jealousy in you too.",
    secenekler: [
      {
        metin: "Talk to {rakip} directly, draw the line.",
        basariliSonuc: {
          mesaj: "You drew your line clearly. {es} felt protected, and {rakip} never came near again.",
          detay: "Some boundaries are drawn with love, not anger.",
        },
        basarisizSonuc: {
          mesaj: "The confrontation turned into tension; {rakip} took it as a challenge.",
          detay: "Some confrontations pour fuel on the fire.",
        },
      },
      {
        metin: "Trust {es}, don't intervene.",
        basariliSonuc: {
          mesaj: "You trusted them and {es} noticed: 'Thank you for believing in me,' they said. {rakip} gave up over time.",
          detay: "Some trust strengthens a relationship more than jealousy ever could.",
        },
        basarisizSonuc: {
          mesaj: "You trusted them but the jealousy inside you wore you out for days.",
          detay: "Showing trust isn't always easy.",
        },
      },
    ],
  },

  evl_ask_es_kotu_soz_yayiyor: {
    baslik: "Words of a Dying Fire",
    metin:
      "{es}, who once praised you, now complains to their close circle: 'Marrying them was the mistake of my life, we've always been broke.' This rumor came back to you.",
    secenekler: [
      {
        metin: "Confront them, ask how they feel.",
        basariliSonuc: {
          mesaj: "It was a hard talk but {es} confessed their regret: 'I said it in anger, I don't really think that.'",
          detay: "Some confrontations hurt but heal too.",
        },
        basarisizSonuc: {
          mesaj: "{es} wouldn't back down: 'Maybe I really am sorry,' they said. That sentence broke your heart.",
          detay: "Some truths are heavier than they should be heard.",
        },
      },
      {
        metin: "Pretend not to hear, don't dwell on it.",
        basariliSonuc: {
          mesaj: "You didn't dwell on it; the rumor died out over time but a small thorn stayed in you.",
          detay: "Some words aren't forgotten even when left in silence.",
        },
        basarisizSonuc: {
          mesaj: "The rumor kept gnawing at you inside, you withdrew into yourself for days.",
          detay: "Some silences bleed like a wound.",
        },
      },
    ],
  },

  evl_ask_para_kaciriyor: {
    baslik: "Fleeing Hope",
    metin:
      "Poverty has worn your love so thin that {es} is now secretly hiding money aside — maybe to leave you one day. You discovered this by chance.",
    secenekler: [
      {
        metin: "Confront them, ask what's going on.",
        basariliSonuc: {
          mesaj: "They confessed in tears: 'I didn't want to leave, I was just scared.' This confession tested your relationship again but it didn't break.",
          detay: "Some fears lighten when confessed.",
        },
        basarisizSonuc: {
          mesaj: "The confrontation ended everything. {es} left the house that night with the money they'd hidden.",
          detay: "Some loves end not with poverty but with confrontation.",
        },
      },
      {
        metin: "Ignore it, try to save the relationship.",
        basariliSonuc: {
          mesaj: "You said nothing; maybe every relationship needs a small escape plan, you told yourself.",
          detay: "Some silences are the only thing keeping a relationship standing.",
        },
        basarisizSonuc: {
          mesaj: "Your silence emboldened them; the amount they hid this time was much larger.",
          detay: "Ignored fears come back bigger.",
        },
      },
    ],
  },

  evl_ask_rakibe_sir_soyleme: {
    baslik: "The Price of Hurt",
    metin:
      "After your last fight, {es}, in anger, told {rakip} about your most private plans. Now {rakip} is a step ahead.",
    secenekler: [
      {
        metin: "Don't hide your anger, hold {es} responsible.",
        basariliSonuc: {
          mesaj: "You showed your anger. {es} was sorry but the said word couldn't be unsaid; a crack formed between you.",
          detay: "Some moments of anger give birth to words that can't be taken back.",
        },
        basarisizSonuc: {
          mesaj: "The argument grew, {es} slammed the door saying 'I was never happy anyway'.",
          detay: "Some anger gives birth to greater anger.",
        },
      },
      {
        metin: "Forgive them, accept that you both acted in anger.",
        basariliSonuc: {
          mesaj: "You forgave them. {es} never forgot it and never again shared your secrets in anger.",
          detay: "Some acts of forgiveness strengthen a relationship at its root.",
        },
        basarisizSonuc: {
          mesaj: "You forgave them but your rival stayed a step ahead using your plans.",
          detay: "Forgiveness doesn't always bring the loss back.",
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
