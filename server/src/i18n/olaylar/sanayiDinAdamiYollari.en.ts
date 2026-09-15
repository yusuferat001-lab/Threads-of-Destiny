import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiDinAdamiYollari.ts — İngilizce çevirileri (45 olay). */
export const OLAYLAR_SANAYI_DINADAMI_YOLLARI_EN: Record<string, OlayCeviri> = {
  sd_din_yol_ilk_vaaz: {
    baslik: "The First Sermon",
    metin:
      "You're giving your first great sermon before the congregation. The factory workers of the city are on the edge of starvation; some expect you to preach God's justice, others expect you to counsel patience and obedience. What you say will shape what kind of clergyman you become from here on.",
    secenekler: [
      {
        metin: "Give a balanced, measured sermon — neither provoke anyone nor silence anyone.",
        basariliSonuc: {
          mesaj: "Your sermon made everyone feel heard; the congregation began calling you 'the balanced shepherd'.",
          detay: "Some paths begin quietly but are the most solid of all.",
        },
        basarisizSonuc: {
          mesaj: "Your sermon offended no one, but moved no one either; it was an ordinary start.",
          detay: "Being balanced sometimes also leaves the door open to being forgotten.",
        },
      },
      {
        metin: "Declare science and new ideas to be the devil's work, cling tight to old doctrine.",
        basariliSonuc: {
          mesaj: "The conservative congregation gave your sermon a standing ovation; you're now a name that carries weight.",
          detay: "Certainty is sometimes convincing — regardless of whether it's true.",
        },
        basarisizSonuc: {
          mesaj: "Some members of the congregation criticized you as 'backward'; a small dispute broke out.",
          detay: "A harsh stance sometimes breeds more resistance than expected.",
        },
      },
      {
        metin: "Stand openly with the workers against the factory owners.",
        basariliSonuc: {
          mesaj: "The workers carried you on their shoulders; but the factory owners now see you as a threat.",
          detay: "Preaching justice has a price, usually paid to the powerful.",
        },
        basarisizSonuc: {
          mesaj: "Your sermon caused a great uproar; the church administration warned you that you're 'meddling in politics'.",
          detay: "Some truths win you an enemy the moment they're spoken.",
        },
      },
      {
        metin: "Preach 'obedience and patience' in exchange for a secret donation from the factory owner.",
        basariliSonuc: {
          mesaj: "The donation repaired the church's roof; but you can't ignore the disappointment on the workers' faces.",
          detay: "Some comforts are paid for by the conscience.",
        },
        basarisizSonuc: {
          mesaj: "The arrangement leaked out; the congregation started whispering 'the owner's priest'.",
          detay: "Secret deals sooner or later reach someone's ear.",
        },
      },
    ],
  },

  // ===================== HONEST (11) =====================
  sd_din_yol_durust_arabuluculuk: {
    baslik: "A Call to Mediate",
    metin:
      "Tension is rising between the workers and the owner at a weaving mill in {bolge}. Both sides want you to be a neutral mediator.",
    secenekler: [
      {
        metin: "Listen for hours, work for a fair settlement.",
        basariliSonuc: {
          mesaj: "After hours of talks both sides shook hands and left; you're known as the voice of justice.",
          detay: "Patience is sometimes more effective than the strongest sermon.",
        },
        basarisizSonuc: {
          mesaj: "The talks broke down without an agreement; both sides found you inadequate.",
          detay: "Not every mediation ends in success.",
        },
      },
      {
        metin: "Take the easy way out, settle for a symbolic prayer.",
        basariliSonuc: {
          mesaj: "You closed the meeting with a short prayer; no one was pleased, but no one blamed you either.",
          detay: "Sometimes silence is the cheapest way out.",
        },
        basarisizSonuc: {
          mesaj: "Both sides complained about your indifference; a rumor spread that 'the priest doesn't care'.",
          detay: "Avoidance sometimes exacts a bigger price.",
        },
      },
    ],
  },
  sd_din_yol_durust_sessiz_duzeltme: {
    baslik: "A Serious Mistake",
    metin:
      "A young priest made a serious theological error in his sermon; the congregation is being led astray. How you act is up to you.",
    secenekler: [
      {
        metin: "Correct him privately, gently.",
        basariliSonuc: {
          mesaj: "The young priest admitted his mistake without shame, and is grateful to you.",
          detay: "A gentle correction doesn't burn bridges.",
        },
        basarisizSonuc: {
          mesaj: "The young priest's pride couldn't take the criticism, there was a cold spell between you for a while.",
          detay: "Good intentions aren't always received the same way.",
        },
      },
      {
        metin: "Correct him openly in front of the congregation.",
        basariliSonuc: {
          mesaj: "You corrected the mistake in front of everyone; the congregation trusted your integrity, but the young priest never forgave you.",
          detay: "Telling the truth sometimes costs a relationship.",
        },
        basarisizSonuc: {
          mesaj: "The congregation saw it as cruelty; they started talking about you.",
          detay: "Shaming someone in public rarely earns admiration.",
        },
      },
    ],
  },
  sd_din_yol_durust_hayirsever: {
    baslik: "A Transparent Charity Fund",
    metin:
      "You're setting up a relief fund for the poor. Keeping transparent records is heavy work, but it builds trust firmly.",
    secenekler: [
      {
        metin: "Meticulously record every last penny, be transparent.",
        basariliSonuc: {
          mesaj: "Every entry of your fund is on record; the congregation began trusting the church's honesty.",
          detay: "Transparency is a slow but lasting capital.",
        },
        basarisizSonuc: {
          mesaj: "You kept the records but the fund didn't gather as many donations as you'd hoped.",
          detay: "Good intentions don't always pay off right away.",
        },
      },
      {
        metin: "Distribute it quickly, don't bother with record-keeping.",
        basariliSonuc: {
          mesaj: "The relief was distributed fast, people are happy; but some started asking 'where did this money go'.",
          detay: "Speed sometimes sacrifices trust.",
        },
        basarisizSonuc: {
          mesaj: "Allegations of impropriety in the distribution came up; even though no one could pin a firm accusation on you, a shadow fell.",
          detay: "A lack of records leaves the door open to suspicion.",
        },
      },
    ],
  },
  sd_din_yol_durust_radikal_baskisi: {
    baslik: "Caught Between Two Fires",
    metin:
      "A socialist workers' group is pressuring you to join their movement, to give fiery sermons. You'd rather stay balanced, but the pressure continues.",
    secenekler: [
      {
        metin: "Politely decline, keep your measured stance.",
        basariliSonuc: {
          mesaj: "You stayed balanced despite the pressure; some were disappointed, but you remained respected.",
          detay: "Balance sometimes satisfies no one completely.",
        },
        basarisizSonuc: {
          mesaj: "The group declared you a 'coward', a few old friends drew away from you.",
          detay: "Neutrality sometimes turns one side into an enemy.",
        },
      },
      {
        metin: "Join in part, support them with cautious language.",
        basariliSonuc: {
          mesaj: "Your measured support pleased the workers, and the conservative congregation members began to question you.",
          detay: "The middle path sometimes tests both sides' trust.",
        },
        basarisizSonuc: {
          mesaj: "Your half-support satisfied neither side; you were criticized as 'neither one thing nor the other'.",
          detay: "Indecision sometimes costs more than a clear stance.",
        },
      },
    ],
  },
  sd_din_yol_durust_gericilerin_baskisi: {
    baslik: "The Disciplinary Board",
    metin:
      "A group of strict, conservative priests accused you of being 'too lax' and complained to the disciplinary board.",
    secenekler: [
      {
        metin: "Give a calm, reasoned defense.",
        basariliSonuc: {
          mesaj: "The board listened to your words, found the accusations baseless; your reputation solidified once more.",
          detay: "Calm is sometimes the strongest defense.",
        },
        basarisizSonuc: {
          mesaj: "The board stayed undecided, a 'suspicious' note went into your file.",
          detay: "Not every defense is found convincing.",
        },
      },
      {
        metin: "Ignore the complaint, keep going about your work.",
        basariliSonuc: {
          mesaj: "The complaint died down on its own over time; but a small unease remained inside you.",
          detay: "Ignoring it sometimes works, sometimes it grows.",
        },
        basarisizSonuc: {
          mesaj: "Your indifference angered the board; you got recorded as 'not taking it seriously'.",
          detay: "Some matters don't just pass on their own.",
        },
      },
    ],
  },
  sd_din_yol_durust_guven_kazanma: {
    baslik: "Testimony",
    metin:
      "In a contract dispute between a group of workers and the factory owner, both sides want you to testify in court.",
    secenekler: [
      {
        metin: "Tell the truth as you saw it, whichever side it favors.",
        basariliSonuc: {
          mesaj: "Your testimony decided the course of the case; everyone learned they could trust your word.",
          detay: "The truth is sometimes costly but always valuable.",
        },
        basarisizSonuc: {
          mesaj: "Your testimony badly angered one side; that side now considers you an enemy.",
          detay: "The price of telling the truth is sometimes a friendship.",
        },
      },
      {
        metin: "Say vague things that won't offend either side.",
        basariliSonuc: {
          mesaj: "Your evasive answers didn't affect the case; but everyone in the courtroom felt you were hiding the truth.",
          detay: "Vagueness is sometimes costlier than honesty.",
        },
        basarisizSonuc: {
          mesaj: "Both sides were upset by your evasive answers, and both filed complaints against you.",
          detay: "Trying not to hurt anyone sometimes hurts everyone.",
        },
      },
    ],
  },
  sd_din_yol_durust_genc_papaz_mentor: {
    baslik: "A Young Student",
    metin:
      "An eager but green young priest wants your guidance. Giving him your time could set back your own work.",
    secenekler: [
      {
        metin: "Take the time, teach him with patience.",
        basariliSonuc: {
          mesaj: "The young priest hung on every word you taught him; a real bond formed between you.",
          detay: "Being a good teacher is also a form of service.",
        },
        basarisizSonuc: {
          mesaj: "You gave your time but the young priest didn't listen much to your counsel, and you were disappointed.",
          detay: "Not every effort pays off right away.",
        },
      },
      {
        metin: "Give a few brief pieces of advice, move on.",
        basariliSonuc: {
          mesaj: "A few brief, well-placed words guided the young priest.",
          detay: "Sometimes a few words are enough.",
        },
        basarisizSonuc: {
          mesaj: "The hasty advice you gave left the young priest even more confused.",
          detay: "Hasty counsel sometimes does harm.",
        },
      },
    ],
  },
  sd_din_yol_durust_dini_meclis_saygi: {
    baslik: "A Vote in the Assembly",
    metin:
      "In a vote inside the religious assembly, the factions are pressuring you to win your vote.",
    secenekler: [
      {
        metin: "Vote independently, according to your conscience.",
        basariliSonuc: {
          mesaj: "Your independent vote surprised everyone; the assembly members respected your principles.",
          detay: "Sometimes a single honest vote outweighs a whole pile of votes.",
        },
        basarisizSonuc: {
          mesaj: "Your decision satisfied neither faction, both drew away from you.",
          detay: "Independence has its price.",
        },
      },
      {
        metin: "Join the powerful faction, stand on the comfortable side.",
        basariliSonuc: {
          mesaj: "You sided with the powerful faction; life got easier, but a discomfort remained inside.",
          detay: "The easy road sometimes stings the conscience.",
        },
        basarisizSonuc: {
          mesaj: "The faction you joined lost the vote; you both compromised your principles and it was all for nothing.",
          detay: "The safe-looking side doesn't always win.",
        },
      },
    ],
  },
  sd_din_yol_durust_hastane_ziyareti: {
    baslik: "The Cholera Ward",
    metin:
      "A wave of cholera is sweeping the city. Visiting the hospitals to give hope is risky but meaningful work.",
    secenekler: [
      {
        metin: "Take the risk, visit the sick, pray with them.",
        basariliSonuc: {
          mesaj: "The hours you spent in the wards gave the sick one last hope; everyone speaks of your courage.",
          detay: "Some acts of service take a piece of the body with them.",
        },
        basarisizSonuc: {
          mesaj: "The time you spent in the wards made you sick too; it took a while for you to recover.",
          detay: "The price of sacrifice is sometimes heavy.",
        },
      },
      {
        metin: "Give support from a distance by letter, don't take the risk.",
        basariliSonuc: {
          mesaj: "Your letters comforted some families, but there were those who asked 'why doesn't he come'.",
          detay: "Service from a distance doesn't always seem enough.",
        },
        basarisizSonuc: {
          mesaj: "Your letters didn't even reach anyone; the hospital administration found you uncaring.",
          detay: "Good intentions sometimes don't reach their destination.",
        },
      },
    ],
  },
  sd_din_yol_durust_emekli_papaz_teselli: {
    baslik: "A Forgotten Teacher",
    metin:
      "An old, sick priest lives alone and forgotten. Giving him your time could set back your own duties.",
    secenekler: [
      {
        metin: "Visit regularly, be by his side.",
        basariliSonuc: {
          mesaj: "The old teacher started smiling again thanks to your visits; he gave you his blessing.",
          detay: "The cure for loneliness is sometimes just a chair.",
        },
        basarisizSonuc: {
          mesaj: "Your visits stayed irregular, the old teacher still felt alone.",
          detay: "Good intentions fall short when they're not consistent.",
        },
      },
      {
        metin: "Use your busy schedule as an excuse, drop by rarely.",
        basariliSonuc: {
          mesaj: "You focused on your work; the old teacher's loneliness left a small ache inside you.",
          detay: "Being busy is sometimes just an excuse.",
        },
        basarisizSonuc: {
          mesaj: "The old teacher died alone; the congregation noticed your indifference.",
          detay: "Neglect sometimes costs an irreversible loss.",
        },
      },
    ],
  },
  sd_din_yol_durust_yasli_bilge_unvan: {
    baslik: "The Balanced Shepherd",
    metin:
      "You're nearing the end of your career. The religious assembly is offering you a distinguished title, in exchange for taking a side on a contentious issue one last time.",
    secenekler: [
      {
        metin: "Accept the title, but keep your neutrality, speak honestly.",
        basariliSonuc: {
          mesaj: "The balanced stance you kept for years earned you lasting respect at the end of your career.",
          detay: "Some renown is earned not with noise, but with consistency.",
        },
        basarisizSonuc: {
          mesaj: "Your closing words didn't fully satisfy anyone; the title offer was shelved.",
          detay: "Some closings end unexpectedly.",
        },
      },
      {
        metin: "Stay silent, decline the title, retire in peace.",
        basariliSonuc: {
          mesaj: "You chose a quiet retirement; you left in peace.",
          detay: "Some closings are beautiful precisely for their silence.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was read by some circles as 'resentment'.",
          detay: "Not every withdrawal is read the same way.",
        },
      },
    ],
  },

  // ===================== FANATIC (11) =====================
  sd_din_yol_fanatik_bilim_kinama: {
    baslik: "Heretical Ideas",
    metin:
      "A local scientist gave a talk defending Darwin's ideas. Part of the congregation expects a harsh response from you.",
    secenekler: [
      {
        metin: "Condemn it fiercely from the pulpit.",
        basariliSonuc: {
          mesaj: "Your sermon electrified the conservative congregation; you're now known as 'the guardian of true faith'.",
          detay: "Certainty is sometimes convincing — regardless of whether it's true.",
        },
        basarisizSonuc: {
          mesaj: "Your condemnation led to fierce debates, some criticized you as 'ignorant'.",
          detay: "A harsh stance sometimes breeds more resistance than expected.",
        },
      },
      {
        metin: "Ignore it, stay silent.",
        basariliSonuc: {
          mesaj: "Your silence let the storm pass; but some had expected a harsher reaction from you.",
          detay: "Not every silence looks safe.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was read as 'weakness'; some of your loyal followers drew away.",
          detay: "Indifference has a price too.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_mufredat_karsitligi: {
    baslik: "The Curriculum Fight",
    metin:
      "The local school's curriculum is adding natural sciences. You could launch an open campaign against it.",
    secenekler: [
      {
        metin: "Submit a harsh petition to the school board, organize a parents' meeting.",
        basariliSonuc: {
          mesaj: "Your campaign found great resonance; a loyal following gathered around you.",
          detay: "A fight sometimes gathers followers, not peace.",
        },
        basarisizSonuc: {
          mesaj: "Your petition was rejected, the board branded you 'a reactionary'.",
          detay: "Not every fight is won.",
        },
      },
      {
        metin: "Only voice your grievance within your own congregation, no formal action.",
        basariliSonuc: {
          mesaj: "Your grievance found an echo inside your congregation, but it didn't change the school's decision.",
          detay: "A small voice makes a small echo.",
        },
        basarisizSonuc: {
          mesaj: "Some congregation members found your grievance unnecessary.",
          detay: "Not every grievance finds resonance.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_kalabalik_kiskirtma: {
    baslik: "An Angry Crowd",
    metin:
      "An angry crowd has gathered against a journalist you declared a 'heretic'. Your words could incite them even further.",
    secenekler: [
      {
        metin: "Incite the crowd with fiery words.",
        basariliSonuc: {
          mesaj: "The crowd rose to your words; the journalist fled, your name became legend in the city.",
          detay: "Power is sometimes born from an uncontrolled flame.",
        },
        basarisizSonuc: {
          mesaj: "The crowd went out of control, you were wounded too in the scuffle.",
          detay: "The fire you fan sometimes spreads to you as well.",
        },
      },
      {
        metin: "Try to calm things at the last moment, back off.",
        basariliSonuc: {
          mesaj: "You barely calmed the crowd; some of your loyal followers found you 'soft'.",
          detay: "Good judgment sometimes costs you followers.",
        },
        basarisizSonuc: {
          mesaj: "The crowd wouldn't even listen to you, the affair grew bigger.",
          detay: "Some fires are no longer in your hands.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_egitimli_kaybi: {
    baslik: "A Family Leaves",
    metin:
      "An educated, well-read family, uncomfortable with your sermons, is leaving the congregation.",
    secenekler: [
      {
        metin: "Don't mind it, grow your flock with the faithful.",
        basariliSonuc: {
          mesaj: "Your loyal followers embraced you even more; you didn't mind the ones who left.",
          detay: "Every loss can be balanced by a gain — but not always of the same kind.",
        },
        basarisizSonuc: {
          mesaj: "The family's departure unsettled other educated members too, a few more left.",
          detay: "One loss sometimes chains into more.",
        },
      },
      {
        metin: "Go after them, soften your tone, try to win them back.",
        basariliSonuc: {
          mesaj: "You convinced the family, they came back; but some of your loyal followers criticized you for 'softening'.",
          detay: "Reconciliation sometimes unsettles the hardliners.",
        },
        basarisizSonuc: {
          mesaj: "Your effort was wasted, the family left for good and told everyone about you.",
          detay: "Not every effort at reconciliation succeeds.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_acik_tartisma: {
    baslik: "A Public Debate",
    metin:
      "A local university has invited you to a public debate with a famous scientist.",
    secenekler: [
      {
        metin: "Rise to the challenge, argue with harsh arguments.",
        basariliSonuc: {
          mesaj: "You closed the debate with fiery arguments; the hall gave you a standing ovation.",
          detay: "Winning in front of a crowd is talked about for a long time.",
        },
        basarisizSonuc: {
          mesaj: "The scientist tore your arguments apart; the hall was embarrassed on your behalf.",
          detay: "A public defeat isn't forgotten for a long time.",
        },
      },
      {
        metin: "Decline the invitation, say 'it's not worth debating them'.",
        basariliSonuc: {
          mesaj: "Your refusal was read by your loyal followers as 'a dignified stance'.",
          detay: "Sometimes not fighting is also a choice.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was read as 'he got scared'; a small shadow fell over your reputation.",
          detay: "Not every retreat is read as courage.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_basin_hucumu: {
    baslik: "A Press Attack",
    metin:
      "The local newspaper is publishing a series of articles criticizing you as 'a reactionary'.",
    secenekler: [
      {
        metin: "Respond harshly with a counter series of your own.",
        basariliSonuc: {
          mesaj: "Your harsh response electrified your supporters; your name is now circulating in the newspaper pages.",
          detay: "A dispute sometimes feeds a career.",
        },
        basarisizSonuc: {
          mesaj: "Your writing was found crude, the newspaper criticized you even more harshly.",
          detay: "Not every counterattack has the intended effect.",
        },
      },
      {
        metin: "Don't respond, trust in the power of silence.",
        basariliSonuc: {
          mesaj: "Your silence let the storm die down over time.",
          detay: "Some fights fade away when left unanswered.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was read as 'admitting guilt'.",
          detay: "Sometimes staying silent is also taken as an answer — the wrong one.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_yeni_kilise_kurma: {
    baslik: "Your Own Congregation",
    metin:
      "The existing church finds you too harsh and restricts you. An opportunity has come up to found your own separate congregation.",
    secenekler: [
      {
        metin: "Leave, found your own church.",
        basariliSonuc: {
          mesaj: "Your new congregation grew fast; you now preach without answering to anyone.",
          detay: "Independence has a price, but it brings freedom too.",
        },
        basarisizSonuc: {
          mesaj: "The new congregation couldn't get on its feet, you couldn't recover the money you spent.",
          detay: "Not every new venture stays on its feet.",
        },
      },
      {
        metin: "Stay, put up with the restrictions.",
        basariliSonuc: {
          mesaj: "You put up with the restrictions; your peace was disturbed but your position is secure.",
          detay: "Some kinds of security come with unease.",
        },
        basarisizSonuc: {
          mesaj: "The restrictions kept growing, you couldn't satisfy either side.",
          detay: "Putting up with it is sometimes not enough.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_mucize_iddiasi: {
    baslik: "A Claim of Miracle",
    metin:
      "Someone from your congregation claims to have seen a 'miracle'. Whether to use it or not is up to you.",
    secenekler: [
      {
        metin: "Enthusiastically endorse the miracle, add it to your sermons.",
        basariliSonuc: {
          mesaj: "News of the miracle spread through the city; your congregation tripled in size.",
          detay: "Faith is sometimes a stronger pull than proof.",
        },
        basarisizSonuc: {
          mesaj: "A journalist looked into the 'miracle' and revealed it as a fake.",
          detay: "Every exaggeration is eventually exposed.",
        },
      },
      {
        metin: "Approach it with skepticism, stay cautious.",
        basariliSonuc: {
          mesaj: "Your cautious stance was found 'reasonable' by some.",
          detay: "Skepticism doesn't always contradict faith.",
        },
        basarisizSonuc: {
          mesaj: "Your loyal followers started thinking you were 'losing your faith'.",
          detay: "Doubt sometimes costs you followers.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_kara_liste: {
    baslik: "The Blacklist",
    metin:
      "You keep a list of people you've declared 'heretics'. Someone named on the list is threatening to take you to court.",
    secenekler: [
      {
        metin: "Defend the list, don't back down.",
        basariliSonuc: {
          mesaj: "The case was dismissed, your loyal followers welcomed you like a hero.",
          detay: "Some victories are costly but grow your reputation.",
        },
        basarisizSonuc: {
          mesaj: "You lost the case, paid a heavy compensation; your reputation took a serious hit.",
          detay: "Some fights are too risky to win.",
        },
      },
      {
        metin: "Quietly destroy the list, avoid the case.",
        basariliSonuc: {
          mesaj: "You destroyed the list, the case was dropped; but a feeling of defeat remained inside you.",
          detay: "Backing down is sometimes the wisest choice.",
        },
        basarisizSonuc: {
          mesaj: "A copy of the list you destroyed had already leaked out; a small scandal broke out.",
          detay: "Some shadows won't leave you alone even when destroyed.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_yasli_ve_yalniz: {
    baslik: "A Lonely Old Age",
    metin:
      "Your years of harsh conduct have cut you off from old friends, even some family members. You're alone in your old age.",
    secenekler: [
      {
        metin: "Question the past, try to mend a few bridges.",
        basariliSonuc: {
          mesaj: "A few of your old friends came back; your old age feels a little warmer now.",
          detay: "Some bridges can be mended, even late.",
        },
        basarisizSonuc: {
          mesaj: "Most of your old friends never forgave you; your loneliness continued.",
          detay: "Some wounds run too deep to mend.",
        },
      },
      {
        metin: "Never compromise your stance, accept the loneliness.",
        basariliSonuc: {
          mesaj: "You never gave up your principles; but your evenings pass alone.",
          detay: "Consistency has a price.",
        },
        basarisizSonuc: {
          mesaj: "Loneliness has begun affecting your health too.",
          detay: "Long-term loneliness wears the body down too.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_guclu_ses_zirvesi: {
    baslik: "A National Voice",
    metin:
      "At the peak of your career, you've become a preacher known across the country. A young journalist wants one last interview.",
    secenekler: [
      {
        metin: "Stand behind your words, say you have no regrets.",
        basariliSonuc: {
          mesaj: "The interview made a great impact; you went down in history as 'the voice that never bent'.",
          detay: "Some voices never quiet down — regardless of whether they were right.",
        },
        basarisizSonuc: {
          mesaj: "Your interview was found harsh, even some of your old followers criticized you.",
          detay: "Not every consistency earns admiration.",
        },
      },
      {
        metin: "Hint at a faint remorse, soften.",
        basariliSonuc: {
          mesaj: "Your softer words placated some of your old enemies, but your loyal followers were disappointed.",
          detay: "Change sometimes pushes away old allies.",
        },
        basarisizSonuc: {
          mesaj: "Your hint of remorse was read as 'weakness', most of your loyal followers abandoned you.",
          detay: "It may be too late to change a career.",
        },
      },
    ],
  },

  // ===================== SOCIAL (11) =====================
  sd_din_yol_sosyal_grev_destek_komitesi: {
    baslik: "The Strike Support Committee",
    metin:
      "A strike has begun at the weaving mill. The workers want you to join their support committee.",
    secenekler: [
      {
        metin: "Join the committee, give open support.",
        basariliSonuc: {
          mesaj: "The workers took heart seeing you on their side; the strike gained strength.",
          detay: "Taking a side for justice has a price.",
        },
        basarisizSonuc: {
          mesaj: "Your participation angered the church's donors; the church's income dropped.",
          detay: "Not every act of solidarity goes unanswered.",
        },
      },
      {
        metin: "Give only moral support, don't join officially.",
        basariliSonuc: {
          mesaj: "Your moral support gave the workers a little comfort.",
          detay: "A small gesture is sometimes not enough, but it's still something.",
        },
        basarisizSonuc: {
          mesaj: "The workers saw your half-hearted support as 'cowardice'.",
          detay: "A half stance is sometimes worse than no stance at all.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_bagisci_elestiri: {
    baslik: "The Great Donor",
    metin:
      "The factory owner who is the church's biggest donor is imposing harsh conditions on his workers.",
    secenekler: [
      {
        metin: "Openly criticize him in a sermon.",
        basariliSonuc: {
          mesaj: "Your sermon found an echo in the city; the workers embraced you, but the factory owner cut off his donations.",
          detay: "Telling the truth has a bill.",
        },
        basarisizSonuc: {
          mesaj: "The factory owner cut off his donations and worked to discredit you.",
          detay: "Standing up to the powerful sometimes invites retaliation.",
        },
      },
      {
        metin: "Warn him gently in a private meeting.",
        basariliSonuc: {
          mesaj: "The meeting went calmly; the factory owner promised a few small improvements.",
          detay: "Some changes begin with quiet words.",
        },
        basarisizSonuc: {
          mesaj: "The factory owner ignored your warning and, offended, cut his donation.",
          detay: "Gentle warnings aren't always heeded.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_gece_okulu: {
    baslik: "A School for Working Children",
    metin:
      "You want to found a free night school for children who work in the factories.",
    secenekler: [
      {
        metin: "Spend the time and money, found the school.",
        basariliSonuc: {
          mesaj: "The night school opened; dozens of children began learning to read and write for the first time.",
          detay: "Some investments last generations.",
        },
        basarisizSonuc: {
          mesaj: "The school couldn't attract enough students, you felt your effort had been wasted.",
          detay: "Not every well-meant venture stays on its feet.",
        },
      },
      {
        metin: "Just propose the idea, leave it to others.",
        basariliSonuc: {
          mesaj: "Others brought your idea to life; your contribution was small.",
          detay: "Sometimes giving an idea is a contribution too — even a small one.",
        },
        basarisizSonuc: {
          mesaj: "No one took your idea seriously, the school never opened.",
          detay: "Merely suggesting is usually not enough.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_hiyerarsi_baskisi: {
    baslik: "Pressure to Silence",
    metin:
      "The upper church hierarchy finds your sermons 'too political' and is trying to silence you.",
    secenekler: [
      {
        metin: "Rise to the challenge, keep raising your voice.",
        basariliSonuc: {
          mesaj: "You kept preaching despite the hierarchy; your congregation embraced you even more.",
          detay: "Sometimes not bending is the greatest sermon.",
        },
        basarisizSonuc: {
          mesaj: "The upper authority officially warned you, a shadow fell over your career.",
          detay: "Rising to the challenge has a price.",
        },
      },
      {
        metin: "Quiet your voice for a while, wait out the storm.",
        basariliSonuc: {
          mesaj: "You stayed silent for a while; the storm passed, but a guilt remained inside.",
          detay: "Silence is sometimes the price of survival.",
        },
        basarisizSonuc: {
          mesaj: "Your silence disappointed your supporters.",
          detay: "Silence doesn't please everyone.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_radikalizm_sorusturmasi: {
    baslik: "An Official Inquiry",
    metin:
      "The church administration is summoning you to a formal inquiry on suspicion of 'radicalism'.",
    secenekler: [
      {
        metin: "Openly defend your stance, don't back down.",
        basariliSonuc: {
          mesaj: "The inquiry board found you innocent, the strength of your stance earned you respect.",
          detay: "Sometimes honesty is the best defense.",
        },
        basarisizSonuc: {
          mesaj: "You received a formal reprimand from the inquiry; a stain fell on your career.",
          detay: "Not every defense is enough to survive an inquiry.",
        },
      },
      {
        metin: "Give a moderate defense, soften some of the claims.",
        basariliSonuc: {
          mesaj: "Your softened defense ended the inquiry, but you didn't feel fully yourself.",
          detay: "Compromise sometimes means giving up a piece of yourself.",
        },
        basarisizSonuc: {
          mesaj: "Even your softened tone wasn't enough, restrictions were imposed.",
          detay: "Sometimes no matter what you do, the board won't change its decision.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_iscilerin_kahyalik: {
    baslik: "Epidemic in the Neighborhood",
    metin:
      "A contagious illness is spreading in the workers' neighborhood. You could pay for medicine and a doctor from your own pocket.",
    secenekler: [
      {
        metin: "Arrange medicine and a doctor from your own pocket.",
        basariliSonuc: {
          mesaj: "The doctor you brought in saved many working families; the neighborhood will never forget you.",
          detay: "Generosity sometimes touches the body, not just the purse.",
        },
        basarisizSonuc: {
          mesaj: "The doctor you brought in wasn't enough, the illness kept spreading.",
          detay: "Not every effort is enough to stop an epidemic.",
        },
      },
      {
        metin: "Only pray, preserve the church's limited resources.",
        basariliSonuc: {
          mesaj: "You prayed, but the neighborhood expected more from you.",
          detay: "Sometimes prayer isn't enough, action is needed.",
        },
        basarisizSonuc: {
          mesaj: "The neighborhood noticed your indifference; they called you 'the rich man's priest'.",
          detay: "Neglect sometimes quietly turns into a loss of reputation.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_kadinlar_toplantisi: {
    baslik: "The Women's Meeting",
    metin:
      "Factory-working women want you to let them use the church as a meeting place to discuss their rights.",
    secenekler: [
      {
        metin: "Open the church, allow the meeting.",
        basariliSonuc: {
          mesaj: "The meeting went well, the women are grateful to you.",
          detay: "Opening a space sometimes lays the ground for a movement.",
        },
        basarisizSonuc: {
          mesaj: "Conservative circles found the meeting 'inappropriate' and complained.",
          detay: "Not every act of support goes unanswered.",
        },
      },
      {
        metin: "Decline, ask that the church stay neutral.",
        basariliSonuc: {
          mesaj: "Your refusal kept the church out of the dispute; but the women were disappointed.",
          detay: "Neutrality sometimes upsets one side.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was harshly criticized; you were mocked as 'the so-called social priest'.",
          detay: "When word and deed don't match, trust is shaken.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_basin_roportaji: {
    baslik: "The Socialist Newspaper",
    metin:
      "A socialist newspaper wants to interview you to spread your voice.",
    secenekler: [
      {
        metin: "Accept the interview, speak openly.",
        basariliSonuc: {
          mesaj: "The interview found wide resonance, you started being called 'the working class's own priest'.",
          detay: "A voice grows louder when it spreads in the right place.",
        },
        basarisizSonuc: {
          mesaj: "The interview was published distorted, your words were taken out of context.",
          detay: "Working with the press isn't always predictable.",
        },
      },
      {
        metin: "Politely decline, remain cautious.",
        basariliSonuc: {
          mesaj: "Your refusal passed quietly; but you missed the chance to make your voice heard.",
          detay: "Not every opportunity comes twice.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal disappointed some of your supporters.",
          detay: "Caution sometimes strains solidarity.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_kilise_disina_alinma: {
    baslik: "Threat of Exile",
    metin:
      "The hierarchy has run out of patience; they're threatening to remove you from your post or exile you to a distant region.",
    secenekler: [
      {
        metin: "Show resistance, rally your congregation behind you.",
        basariliSonuc: {
          mesaj: "Your congregation resisted the hierarchy for you; the exile plan was shelved.",
          detay: "Sometimes the voice of a community is stronger than a single voice standing alone.",
        },
        basarisizSonuc: {
          mesaj: "Despite your resistance the exile order was approved; you also lost the church's income.",
          detay: "Not every act of resistance is won.",
        },
      },
      {
        metin: "Submit, accept the exile.",
        basariliSonuc: {
          mesaj: "You accepted the exile; your congregation wept as you left, but you walked away all the same.",
          detay: "Some prices are unavoidable without being paid.",
        },
        basarisizSonuc: {
          mesaj: "The exile process went even more harshly; even a few loyal friends abandoned you.",
          detay: "Submission alone is sometimes not enough.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_hareket_kurma: {
    baslik: "The Birth of a Movement",
    metin:
      "Thanks to your years-long efforts, a small 'social gospel' movement has been born. You have a chance to grow it.",
    secenekler: [
      {
        metin: "Spend the time and effort, grow the movement.",
        basariliSonuc: {
          mesaj: "The movement spread to neighboring cities; your name began to be known as one of the pioneers of the 'social gospel'.",
          detay: "Some seeds turn into a forest years later.",
        },
        basarisizSonuc: {
          mesaj: "The movement couldn't grow, the effort and money you spent came to nothing.",
          detay: "Not every movement lasts.",
        },
      },
      {
        metin: "Let it stay small and local.",
        basariliSonuc: {
          mesaj: "The movement stayed small but solid; you became a trusted name among the local people.",
          detay: "Staying small sometimes means staying durable.",
        },
        basarisizSonuc: {
          mesaj: "The movement quietly fell apart, hardly anyone noticed.",
          detay: "Staying small is sometimes the same thing as being forgotten.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_kurumsal_bedel: {
    baslik: "Your Career's Last Word",
    metin:
      "At the end of your career, the movement you devoted your life to will either remember you as a pioneer, or the church will cast you out entirely.",
    secenekler: [
      {
        metin: "One last time, raise your voice as harshly as you can.",
        basariliSonuc: {
          mesaj: "Your last sermon inspired generations; the people call you 'their own priest'.",
          detay: "Some farewells become a career's strongest moment.",
        },
        basarisizSonuc: {
          mesaj: "The church officially cast you out, you were even deprived of your pension.",
          detay: "Some prices are paid even at the end of a career.",
        },
      },
      {
        metin: "Step back, quietly prepare for retirement.",
        basariliSonuc: {
          mesaj: "You chose a quiet retirement; a peaceful but less remembered finale.",
          detay: "Some finales bring peace with their silence.",
        },
        basarisizSonuc: {
          mesaj: "Even your quiet withdrawal was read by some circles as 'surrender'.",
          detay: "Not every withdrawal is read the same way.",
        },
      },
    ],
  },

  // ===================== CORRUPT (11) =====================
  sd_din_yol_yozlasmis_rusvet_teklifi: {
    baslik: "A Quiet Arrangement",
    metin:
      "A factory owner offers you a regular 'donation' in exchange for keeping his workers obedient.",
    secenekler: [
      {
        metin: "Accept the offer.",
        basariliSonuc: {
          mesaj: "You accepted the arrangement, the church's budget got some relief; but a small stain remained on your conscience.",
          detay: "Some comforts are paid for by the conscience.",
        },
        basarisizSonuc: {
          mesaj: "Part of the arrangement leaked out, some congregation members began to suspect.",
          detay: "Secret deals sooner or later reach someone's ear.",
        },
      },
      {
        metin: "Decline, stay honest.",
        basariliSonuc: {
          mesaj: "You declined the offer; there's peace inside you, but the church's budget is still tight.",
          detay: "Honesty isn't always comfortable.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered the factory owner; he started pulling in other supporters too.",
          detay: "Honesty sometimes has an indirect price.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_hayirsever_fon_zimmet: {
    baslik: "A Tempting Fund",
    metin:
      "Taking a small amount 'as a loan' from the donation fund collected for the poor looks tempting.",
    secenekler: [
      {
        metin: "Take money from the fund in secret.",
        basariliSonuc: {
          mesaj: "No one noticed; your pocket is fuller, but there's an ache inside.",
          detay: "Even a silent crime leaves an echo in the conscience.",
        },
        basarisizSonuc: {
          mesaj: "A discrepancy in the fund's ledger was noticed; suspicion turned onto you.",
          detay: "Numbers eventually give someone away.",
        },
      },
      {
        metin: "Don't touch it, leave the fund untouched.",
        basariliSonuc: {
          mesaj: "You didn't touch the fund; it reached the poor, there's a small peace inside you.",
          detay: "Some decisions give the quiet comfort of being right.",
        },
        basarisizSonuc: {
          mesaj: "You had to help from your own pocket, an unexpected expense came up.",
          detay: "Honesty sometimes brings an extra burden.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_gizli_metres: {
    baslik: "A Secret Affair",
    metin:
      "You have a secret affair with someone from your congregation. Someone has started to notice.",
    secenekler: [
      {
        metin: "Continue the affair, hide it more carefully.",
        basariliSonuc: {
          mesaj: "The hush money worked, your affair stayed hidden a while longer.",
          detay: "Secret happiness has a price.",
        },
        basarisizSonuc: {
          mesaj: "Your affair came to light; the congregation was greatly disappointed.",
          detay: "Things kept secret eventually come out.",
        },
      },
      {
        metin: "End the affair, don't risk it.",
        basariliSonuc: {
          mesaj: "You ended the affair; your reputation was preserved, but an emptiness remained inside.",
          detay: "Safety sometimes comes with a broken heart.",
        },
        basarisizSonuc: {
          mesaj: "Despite your effort to end it, a small rumor had already spread.",
          detay: "Some shadows leave a trace even after they've faded.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_gunahkarlarin_ayricaligi: {
    baslik: "The Rich Man's Absolution",
    metin:
      "A wealthy merchant offers a large donation in exchange for you publicly declaring an obvious sin of his 'forgiven'.",
    secenekler: [
      {
        metin: "Accept the donation, publicly absolve his sin.",
        basariliSonuc: {
          mesaj: "The merchant felt relieved, the church grew richer; but some members of the congregation looked on with suspicion.",
          detay: "Absolution loses its worth once it's for sale.",
        },
        basarisizSonuc: {
          mesaj: "The arrangement spread as gossip; they said 'a man with money can buy anything'.",
          detay: "An open bargain can't stay secret.",
        },
      },
      {
        metin: "Decline, act on principle.",
        basariliSonuc: {
          mesaj: "You turned down the offer; the merchant is angry, but your conscience is at ease.",
          detay: "Some refusals are costly but worthwhile.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered the merchant, he cut off his support to the church entirely.",
          detay: "Being principled sometimes brings a material loss.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_yakalanma_tehlikesi: {
    baslik: "A Discrepancy in the Accounts",
    metin:
      "The church accountant noticed discrepancies in the ledgers and is asking you questions.",
    secenekler: [
      {
        metin: "Lie, cover up the accounts with forged documents.",
        basariliSonuc: {
          mesaj: "The forged documents convinced the accountant; but now every accounting period frightens you.",
          detay: "One lie generally requires a second.",
        },
        basarisizSonuc: {
          mesaj: "The forged documents were exposed; the scandal spread across the whole region.",
          detay: "Some lies, once they burst, drag everything down with them.",
        },
      },
      {
        metin: "Partly admit the truth, offer to make amends.",
        basariliSonuc: {
          mesaj: "Your partial admission calmed the accountant down; you had to make up for the losses.",
          detay: "Partial honesty isn't a full redemption, but it's a start.",
        },
        basarisizSonuc: {
          mesaj: "Your admission wasn't enough, the accountant reported it to the higher authority.",
          detay: "Some mistakes aren't closed even with amends.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_sahte_kayit: {
    baslik: "A Forged Record",
    metin:
      "A noble family, wanting to clean up a tainted inheritance, asks for a forged record, offering a generous 'gift' in return.",
    secenekler: [
      {
        metin: "Forge the record.",
        basariliSonuc: {
          mesaj: "The forged record went through without a hitch; your coffers filled up, but the church's records are no longer trustworthy.",
          detay: "Records are a church's memory; when they're tainted, so is trust.",
        },
        basarisizSonuc: {
          mesaj: "The record was questioned in a legal case, the forgery came to light.",
          detay: "Forged documents can sooner or later fall before a court.",
        },
      },
      {
        metin: "Decline, protect the church's records.",
        basariliSonuc: {
          mesaj: "You declined the offer, the family found another way; but the church's records stayed clean.",
          detay: "Some refusals protect an unseen value.",
        },
        basarisizSonuc: {
          mesaj: "The family left angry and spread bad rumors about the church.",
          detay: "Even refusing sometimes brings a price.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_sadaka_kutusu: {
    baslik: "The Alms Box",
    metin:
      "The money in the alms box for the poor has been steadily shrinking; you're the one taking it, and someone has started to notice.",
    secenekler: [
      {
        metin: "Keep taking it, be more careful.",
        basariliSonuc: {
          mesaj: "You acted more carefully, no one found firm proof.",
          detay: "Habits are the hardest sins to give up.",
        },
        basarisizSonuc: {
          mesaj: "A congregation member caught you red-handed; a humiliating scene played out.",
          detay: "Even small thefts break a great trust.",
        },
      },
      {
        metin: "Stop, start filling the box back up.",
        basariliSonuc: {
          mesaj: "You quietly put the money back you'd taken; no one noticed, but there's a relief inside you.",
          detay: "A late honesty is still an honesty.",
        },
        basarisizSonuc: {
          mesaj: "The money you put back was noticed, suspicion turned onto you once again.",
          detay: "Erasing the traces of the past isn't always easy.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_rakip_sirri: {
    baslik: "A Rival's Secret",
    metin:
      "You've learned a secret from a rival clergyman's past; you could use it to silence him, or to expose him.",
    secenekler: [
      {
        metin: "Blackmail him with the secret, gain an advantage.",
        basariliSonuc: {
          mesaj: "Your rival quietly backed down, and left you a small 'thank you'.",
          detay: "Power sometimes comes from fear.",
        },
        basarisizSonuc: {
          mesaj: "Your blackmail attempt came to light, your own reputation was damaged too.",
          detay: "Dirty weapons sometimes burn your own hand too.",
        },
      },
      {
        metin: "Don't use the secret, keep it but stay quiet.",
        basariliSonuc: {
          mesaj: "You kept the secret, thinking it might come in handy one day.",
          detay: "Some knowledge carries power even unused.",
        },
        basarisizSonuc: {
          mesaj: "The secret you knew leaked out another way, your rival accused you.",
          detay: "Some secrets keep bothering their keepers even when held.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_ust_makam_sorgu: {
    baslik: "The Inspector's Arrival",
    metin:
      "The bishopric is sending an inspector to look into the discrepancies in your financial affairs.",
    secenekler: [
      {
        metin: "Hide the evidence, silence the inspector with a bribe.",
        basariliSonuc: {
          mesaj: "The inspector accepted the bribe, the report was submitted as 'clean'.",
          detay: "A bribe sometimes hides a problem temporarily, without solving it.",
        },
        basarisizSonuc: {
          mesaj: "Your bribery attempt was also recorded as a crime; a great scandal broke out.",
          detay: "Trying to cover up one wrongdoing sometimes causes a second.",
        },
      },
      {
        metin: "Cooperate, accept the punishment.",
        basariliSonuc: {
          mesaj: "Your cooperation lightened the penalty, but a serious shadow still fell over your reputation.",
          detay: "Cooperation is sometimes the least bad choice.",
        },
        basarisizSonuc: {
          mesaj: "Despite your cooperation you got a harsh penalty; the church condemned you in public.",
          detay: "Some mistakes aren't easily forgiven.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_cifte_hayat_ifsa: {
    baslik: "A Double Life",
    metin:
      "The double life you've led for years is nearly fully exposed; a journalist has shown up at your door.",
    secenekler: [
      {
        metin: "Offer the journalist a large bribe.",
        basariliSonuc: {
          mesaj: "The journalist accepted the bribe, the story wasn't published — for now.",
          detay: "A cover-up isn't always permanent.",
        },
        basarisizSonuc: {
          mesaj: "Your bribery attempt made it into the story too; the scandal doubled.",
          detay: "Some attempts make things worse instead of better.",
        },
      },
      {
        metin: "Head it off with a partial admission, go public.",
        basariliSonuc: {
          mesaj: "Your partial admission softened the affair; everyone was disappointed but you avoided the worst.",
          detay: "A controlled truth is better than an uncontrolled scandal.",
        },
        basarisizSonuc: {
          mesaj: "Your admission wasn't enough, the journalist published the rest of it too.",
          detay: "Some truths can't be told piece by piece.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_skandal_ya_da_kurtulus: {
    baslik: "The Final Reckoning",
    metin:
      "You've come to the end of your career. Either you'll buy a comfortable retirement by covering up years of misdeeds, or you'll risk everything and tell the truth.",
    secenekler: [
      {
        metin: "Cover everything up with one last big bribe, retire quietly.",
        basariliSonuc: {
          mesaj: "The last bribe worked; you bought a comfortable retirement, but there's no peace at night.",
          detay: "Some victories only feed the pocket, never the conscience.",
        },
        basarisizSonuc: {
          mesaj: "Your last attempt backfired completely; your career ended in scandal.",
          detay: "Some bets are lost at the very end of a career.",
        },
      },
      {
        metin: "Tell the truth, cleanse your conscience.",
        basariliSonuc: {
          mesaj: "You told the truth; your reputation was shaken, but you were freed from the burden you'd carried for years.",
          detay: "Some confessions bring peace even late.",
        },
        basarisizSonuc: {
          mesaj: "Your confession met with a great backlash; your career ended in disgrace, but at least your conscience is clean.",
          detay: "What's right sometimes ends in the bitterest way.",
        },
      },
    ],
  },
};
