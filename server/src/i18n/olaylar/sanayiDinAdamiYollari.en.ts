import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiDinAdamiYollari.ts — İngilizce çevirileri (45 olay). */
export const OLAYLAR_SANAYI_DINADAMI_YOLLARI_EN: Record<string, OlayCeviri> = {
  sd_din_yol_ilk_vaaz: {
    baslik: "The First Sermon",
    metin:
      "Your first great sermon. Factory workers are starving; some want justice, others obedience.",
    secenekler: [
      {
        metin: "Preach a balanced, measured sermon.",
        basariliSonuc: {
          mesaj: "Everyone felt heard; they call you 'the balanced shepherd'.",
          detay: "Solid paths begin quietly.",
        },
        basarisizSonuc: {
          mesaj: "You offended no one, moved no one; an ordinary start.",
          detay: "Balance can invite oblivion.",
        },
      },
      {
        metin: "Denounce science as the devil's work.",
        basariliSonuc: {
          mesaj: "Conservatives gave a standing ovation; your word carries weight.",
          detay: "Certainty convinces, true or not.",
        },
        basarisizSonuc: {
          mesaj: "Some called you 'backward'; a dispute broke out.",
          detay: "Harshness breeds resistance.",
        },
      },
      {
        metin: "Stand openly with the workers.",
        basariliSonuc: {
          mesaj: "Workers carried you aloft; owners now see a threat.",
          detay: "Justice's price comes from the powerful.",
        },
        basarisizSonuc: {
          mesaj: "The sermon caused uproar; church warned you off politics.",
          detay: "Some truths win enemies at once.",
        },
      },
      {
        metin: "Preach obedience for a secret donation.",
        basariliSonuc: {
          mesaj: "The donation fixed the roof; workers' disappointment haunts you.",
          detay: "Conscience pays for comfort.",
        },
        basarisizSonuc: {
          mesaj: "The deal leaked; they whisper 'the owner's priest'.",
          detay: "Secret deals get heard.",
        },
      },
    ],
  },

  // ===================== HONEST (11) =====================
  sd_din_yol_durust_arabuluculuk: {
    baslik: "A Call to Mediate",
    metin:
      "Tension rises between workers and owner at a weaving mill in {bolge}. Both want you as mediator.",
    secenekler: [
      {
        metin: "Listen for hours, seek a fair deal.",
        basariliSonuc: {
          mesaj: "Both sides shook hands; you're the voice of justice.",
          detay: "Patience beats the strongest sermon.",
        },
        basarisizSonuc: {
          mesaj: "No deal; both sides found you inadequate.",
          detay: "Not every mediation succeeds.",
        },
      },
      {
        metin: "Take the easy way: a token prayer.",
        basariliSonuc: {
          mesaj: "A short prayer closed it; none pleased, none blamed.",
          detay: "Silence is the cheapest exit.",
        },
        basarisizSonuc: {
          mesaj: "Both complained of indifference; 'the priest doesn't care' spread.",
          detay: "Avoidance can cost more.",
        },
      },
    ],
  },
  sd_din_yol_durust_sessiz_duzeltme: {
    baslik: "A Serious Mistake",
    metin:
      "A young priest made a serious theological error; the congregation is misled.",
    secenekler: [
      {
        metin: "Correct him privately, gently.",
        basariliSonuc: {
          mesaj: "He admitted his error gracefully and thanked you.",
          detay: "Gentle correction keeps bridges.",
        },
        basarisizSonuc: {
          mesaj: "His pride stung; things cooled between you.",
          detay: "Good intent isn't always received well.",
        },
      },
      {
        metin: "Correct him before the congregation.",
        basariliSonuc: {
          mesaj: "The flock trusted your integrity; he never forgave you.",
          detay: "Truth can cost a relationship.",
        },
        basarisizSonuc: {
          mesaj: "The flock saw cruelty; they talk about you.",
          detay: "Public shaming rarely earns respect.",
        },
      },
    ],
  },
  sd_din_yol_durust_hayirsever: {
    baslik: "A Transparent Charity Fund",
    metin:
      "You're founding a relief fund. Transparent records are heavy work but build trust.",
    secenekler: [
      {
        metin: "Record every penny, be transparent.",
        basariliSonuc: {
          mesaj: "Every entry recorded; the flock began trusting the church.",
          detay: "Transparency: slow, lasting capital.",
        },
        basarisizSonuc: {
          mesaj: "You kept records but the fund drew few donations.",
          detay: "Good intent doesn't pay at once.",
        },
      },
      {
        metin: "Distribute fast, skip records.",
        basariliSonuc: {
          mesaj: "Aid went out fast; some asked 'where did the money go'.",
          detay: "Speed can sacrifice trust.",
        },
        basarisizSonuc: {
          mesaj: "Impropriety claims arose; no firm charge, but a shadow fell.",
          detay: "No records invite suspicion.",
        },
      },
    ],
  },
  sd_din_yol_durust_radikal_baskisi: {
    baslik: "Caught Between Two Fires",
    metin:
      "A socialist workers' group presses you to join and preach fiery sermons. You prefer balance.",
    secenekler: [
      {
        metin: "Politely decline, stay measured.",
        basariliSonuc: {
          mesaj: "You stayed balanced; some were let down, but you're respected.",
          detay: "Balance satisfies no one fully.",
        },
        basarisizSonuc: {
          mesaj: "The group called you a 'coward'; old friends drifted off.",
          detay: "Neutrality can make an enemy.",
        },
      },
      {
        metin: "Join in part, support cautiously.",
        basariliSonuc: {
          mesaj: "Workers were pleased; conservatives began to question you.",
          detay: "The middle path tests both sides.",
        },
        basarisizSonuc: {
          mesaj: "Half-support satisfied no one; 'neither one nor the other'.",
          detay: "Indecision costs more.",
        },
      },
    ],
  },
  sd_din_yol_durust_gericilerin_baskisi: {
    baslik: "The Disciplinary Board",
    metin:
      "Strict conservative priests complained to the disciplinary board that you're 'lax'.",
    secenekler: [
      {
        metin: "Defend calmly and reasonably.",
        basariliSonuc: {
          mesaj: "The board found the claims baseless; your standing grew.",
          detay: "Calm is a strong defense.",
        },
        basarisizSonuc: {
          mesaj: "The board wavered; a 'suspicious' note went on file.",
          detay: "Not every defense convinces.",
        },
      },
      {
        metin: "Ignore the complaint.",
        basariliSonuc: {
          mesaj: "It faded by itself; a small unease remained.",
          detay: "Ignoring can let it grow.",
        },
        basarisizSonuc: {
          mesaj: "Your indifference angered the board; noted as 'not serious'.",
          detay: "Some matters don't pass alone.",
        },
      },
    ],
  },
  sd_din_yol_durust_guven_kazanma: {
    baslik: "Testimony",
    metin:
      "In a contract dispute, workers and factory owner both want you to testify in court.",
    secenekler: [
      {
        metin: "Tell the truth, whoever it favors.",
        basariliSonuc: {
          mesaj: "Your testimony decided the case; your word is trusted.",
          detay: "Truth is costly but valuable.",
        },
        basarisizSonuc: {
          mesaj: "One side was enraged; they now call you an enemy.",
          detay: "Truth sometimes costs a friendship.",
        },
      },
      {
        metin: "Speak vaguely, offend neither.",
        basariliSonuc: {
          mesaj: "Evasion didn't sway the case, but all sensed you hid the truth.",
          detay: "Vagueness costs more than honesty.",
        },
        basarisizSonuc: {
          mesaj: "Both sides, upset by evasion, complained.",
          detay: "Sparing everyone can hurt everyone.",
        },
      },
    ],
  },
  sd_din_yol_durust_genc_papaz_mentor: {
    baslik: "A Young Student",
    metin:
      "An eager, green young priest wants your guidance. Time for him may set back your work.",
    secenekler: [
      {
        metin: "Make time, teach patiently.",
        basariliSonuc: {
          mesaj: "He hung on your words; a real bond formed.",
          detay: "Good teaching is service too.",
        },
        basarisizSonuc: {
          mesaj: "You gave time but he barely listened; disappointing.",
          detay: "Effort doesn't pay at once.",
        },
      },
      {
        metin: "Give brief advice, move on.",
        basariliSonuc: {
          mesaj: "Brief, apt words guided the young priest.",
          detay: "Sometimes few words suffice.",
        },
        basarisizSonuc: {
          mesaj: "Hasty advice left him more confused.",
          detay: "Hasty counsel does harm.",
        },
      },
    ],
  },
  sd_din_yol_durust_dini_meclis_saygi: {
    baslik: "A Vote in the Assembly",
    metin:
      "Factions pressure you for your vote in the religious assembly.",
    secenekler: [
      {
        metin: "Vote independently, by conscience.",
        basariliSonuc: {
          mesaj: "Your independent vote surprised all; your principles earned respect.",
          detay: "One honest vote outweighs a pile.",
        },
        basarisizSonuc: {
          mesaj: "Neither faction was pleased; both drew away.",
          detay: "Independence has a price.",
        },
      },
      {
        metin: "Join the strong faction, stay comfortable.",
        basariliSonuc: {
          mesaj: "You sided with power; life eased, conscience stung.",
          detay: "The easy road stings conscience.",
        },
        basarisizSonuc: {
          mesaj: "Your faction lost; you compromised principles for nothing.",
          detay: "The safe side doesn't always win.",
        },
      },
    ],
  },
  sd_din_yol_durust_hastane_ziyareti: {
    baslik: "The Cholera Ward",
    metin:
      "Cholera sweeps the city. Visiting hospitals to give hope is risky but meaningful.",
    secenekler: [
      {
        metin: "Risk it: visit the sick, pray.",
        basariliSonuc: {
          mesaj: "Your hours in the wards gave hope; all speak of your courage.",
          detay: "Some service takes from the body.",
        },
        basarisizSonuc: {
          mesaj: "You fell ill in the wards; recovery took time.",
          detay: "Sacrifice can cost dearly.",
        },
      },
      {
        metin: "Avoid risk; support by letter.",
        basariliSonuc: {
          mesaj: "Letters comforted some; others asked 'why doesn't he come'.",
          detay: "Distant service seems not enough.",
        },
        basarisizSonuc: {
          mesaj: "Your letters reached no one; the hospital found you uncaring.",
          detay: "Good intent sometimes doesn't arrive.",
        },
      },
    ],
  },
  sd_din_yol_durust_emekli_papaz_teselli: {
    baslik: "A Forgotten Teacher",
    metin:
      "An old, sick priest lives alone, forgotten. Time for him may set back your duties.",
    secenekler: [
      {
        metin: "Visit regularly, stay by him.",
        basariliSonuc: {
          mesaj: "The old teacher smiled again at your visits; he blessed you.",
          detay: "Loneliness's cure is sometimes a chair.",
        },
        basarisizSonuc: {
          mesaj: "Your visits were irregular; he still felt alone.",
          detay: "Irregular kindness falls short.",
        },
      },
      {
        metin: "Plead busyness, rarely visit.",
        basariliSonuc: {
          mesaj: "You focused on work; his loneliness left an ache.",
          detay: "Busyness is often an excuse.",
        },
        basarisizSonuc: {
          mesaj: "The old teacher died alone; the flock noticed your neglect.",
          detay: "Neglect can cost an irreversible loss.",
        },
      },
    ],
  },
  sd_din_yol_durust_yasli_bilge_unvan: {
    baslik: "The Balanced Shepherd",
    metin:
      "Your career is ending. The assembly offers a title if you take a side on a contentious issue.",
    secenekler: [
      {
        metin: "Accept the title; stay neutral and honest.",
        basariliSonuc: {
          mesaj: "Years of balance earned you lasting respect.",
          detay: "Some fame is earned by consistency.",
        },
        basarisizSonuc: {
          mesaj: "Your last speech satisfied none; the offer was shelved.",
          detay: "Some closings end unexpectedly.",
        },
      },
      {
        metin: "Stay silent, refuse, retire in peace.",
        basariliSonuc: {
          mesaj: "You chose a quiet retirement; you left in peace.",
          detay: "Some closings are beautiful in silence.",
        },
        basarisizSonuc: {
          mesaj: "Some read your refusal as 'resentment'.",
          detay: "Not every withdrawal reads alike.",
        },
      },
    ],
  },

  // ===================== FANATIC (11) =====================
  sd_din_yol_fanatik_bilim_kinama: {
    baslik: "Heretical Ideas",
    metin:
      "A local scientist defended Darwin's ideas. Part of the flock expects your harsh response.",
    secenekler: [
      {
        metin: "Condemn it fiercely from the pulpit.",
        basariliSonuc: {
          mesaj: "Your sermon thrilled conservatives; you're 'guardian of true faith'.",
          detay: "Certainty convinces, true or not.",
        },
        basarisizSonuc: {
          mesaj: "Your condemnation sparked debate; some called you 'ignorant'.",
          detay: "Harshness breeds resistance.",
        },
      },
      {
        metin: "Ignore it, stay silent.",
        basariliSonuc: {
          mesaj: "Silence calmed the storm; some expected harsher.",
          detay: "Not every silence looks safe.",
        },
        basarisizSonuc: {
          mesaj: "Silence read as 'weakness'; loyal followers drifted away.",
          detay: "Indifference has a price too.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_mufredat_karsitligi: {
    baslik: "The Curriculum Fight",
    metin:
      "Natural sciences are joining the local school's curriculum. You could campaign openly against it.",
    secenekler: [
      {
        metin: "Petition the board harshly, rally parents.",
        basariliSonuc: {
          mesaj: "The campaign resonated; a loyal following gathered.",
          detay: "Fights bring followers, not peace.",
        },
        basarisizSonuc: {
          mesaj: "Petition rejected; the board called you 'reactionary'.",
          detay: "Not every fight is won.",
        },
      },
      {
        metin: "Voice grievance only in your congregation.",
        basariliSonuc: {
          mesaj: "Your grievance echoed in the flock; the school didn't budge.",
          detay: "A small voice makes a small echo.",
        },
        basarisizSonuc: {
          mesaj: "Some members found your grievance unnecessary.",
          detay: "Not every grievance finds an echo.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_kalabalik_kiskirtma: {
    baslik: "An Angry Crowd",
    metin:
      "An angry crowd gathered against the journalist you called a 'heretic'. Your words could incite them.",
    secenekler: [
      {
        metin: "Incite the crowd with fiery words.",
        basariliSonuc: {
          mesaj: "The crowd rose; the journalist fled, your name became legend.",
          detay: "Power can spring from wild flame.",
        },
        basarisizSonuc: {
          mesaj: "The crowd ran wild; you were hurt in the scuffle.",
          detay: "The fire you fan spreads to you.",
        },
      },
      {
        metin: "Calm them at the last moment, back off.",
        basariliSonuc: {
          mesaj: "You barely calmed them; loyalists found you 'soft'.",
          detay: "Good judgment can cost followers.",
        },
        basarisizSonuc: {
          mesaj: "They wouldn't listen; the affair grew.",
          detay: "Some fires slip your hands.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_egitimli_kaybi: {
    baslik: "A Family Leaves",
    metin:
      "An educated, well-read family, uneasy at your sermons, is leaving the congregation.",
    secenekler: [
      {
        metin: "Don't mind it; grow with the faithful.",
        basariliSonuc: {
          mesaj: "Loyalists clung closer; you shrugged off those who left.",
          detay: "A loss is offset by another gain.",
        },
        basarisizSonuc: {
          mesaj: "The departure unsettled other educated members; a few more left.",
          detay: "One loss chains into more.",
        },
      },
      {
        metin: "Go after them, soften, win them back.",
        basariliSonuc: {
          mesaj: "The family returned; some loyalists chided you for 'softening'.",
          detay: "Reconciliation unsettles hardliners.",
        },
        basarisizSonuc: {
          mesaj: "Your effort failed; the family left for good and told everyone.",
          detay: "Not every attempt succeeds.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_acik_tartisma: {
    baslik: "A Public Debate",
    metin:
      "A local university invites you to a public debate with a famed scientist.",
    secenekler: [
      {
        metin: "Take the challenge, argue hard.",
        basariliSonuc: {
          mesaj: "You closed with fiery arguments; the hall stood and applauded.",
          detay: "A public win is long remembered.",
        },
        basarisizSonuc: {
          mesaj: "The scientist tore your arguments apart; the hall cringed.",
          detay: "Public defeat isn't forgotten.",
        },
      },
      {
        metin: "Decline: 'not worth debating them'.",
        basariliSonuc: {
          mesaj: "Loyalists read your refusal as a 'dignified stance'.",
          detay: "Not fighting is also a choice.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal read as 'he got scared'; a shadow fell on your name.",
          detay: "Not every retreat reads as courage.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_basin_hucumu: {
    baslik: "A Press Attack",
    metin:
      "The local paper runs a series calling you 'a reactionary'.",
    secenekler: [
      {
        metin: "Reply harshly with a counter series.",
        basariliSonuc: {
          mesaj: "Your reply thrilled supporters; your name fills the papers.",
          detay: "A dispute can feed a career.",
        },
        basarisizSonuc: {
          mesaj: "Your piece was found crude; the paper hit back harder.",
          detay: "Not every counterattack works.",
        },
      },
      {
        metin: "Don't reply; trust silence.",
        basariliSonuc: {
          mesaj: "Your silence let the storm fade.",
          detay: "Unanswered fights fade.",
        },
        basarisizSonuc: {
          mesaj: "Your silence read as 'admitting guilt'.",
          detay: "Silence is an answer too — the wrong one.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_yeni_kilise_kurma: {
    baslik: "Your Own Congregation",
    metin:
      "The church finds you too harsh and restricts you. A chance to found your own congregation arose.",
    secenekler: [
      {
        metin: "Leave, found your own church.",
        basariliSonuc: {
          mesaj: "Your new flock grew fast; you preach answering to no one.",
          detay: "Independence costs, but frees.",
        },
        basarisizSonuc: {
          mesaj: "The new flock faltered; your money was lost.",
          detay: "Not every venture survives.",
        },
      },
      {
        metin: "Stay, put up with limits.",
        basariliSonuc: {
          mesaj: "You endured the limits; peace disturbed, position secure.",
          detay: "Some security comes with unease.",
        },
        basarisizSonuc: {
          mesaj: "Limits kept growing; you pleased neither side.",
          detay: "Enduring isn't always enough.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_mucize_iddiasi: {
    baslik: "A Claim of Miracle",
    metin:
      "Someone claims to have seen a 'miracle'. Whether to use it is up to you.",
    secenekler: [
      {
        metin: "Endorse the miracle, add it to sermons.",
        basariliSonuc: {
          mesaj: "The news spread; your flock tripled.",
          detay: "Faith can outpull proof.",
        },
        basarisizSonuc: {
          mesaj: "A journalist exposed the 'miracle' as fake.",
          detay: "Every exaggeration is exposed.",
        },
      },
      {
        metin: "Be skeptical and cautious.",
        basariliSonuc: {
          mesaj: "Some found your caution 'reasonable'.",
          detay: "Skepticism needn't contradict faith.",
        },
        basarisizSonuc: {
          mesaj: "Loyalists began thinking you 'lost faith'.",
          detay: "Doubt can cost followers.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_kara_liste: {
    baslik: "The Blacklist",
    metin:
      "You keep a list of declared 'heretics'. One named threatens to sue you.",
    secenekler: [
      {
        metin: "Defend the list, don't back down.",
        basariliSonuc: {
          mesaj: "The case dropped; loyalists welcomed you as a hero.",
          detay: "Costly victories grow reputation.",
        },
        basarisizSonuc: {
          mesaj: "You lost, paid heavy damages; your name took a blow.",
          detay: "Some fights are too risky.",
        },
      },
      {
        metin: "Quietly destroy the list.",
        basariliSonuc: {
          mesaj: "The list is gone, the case dropped; a sense of defeat remains.",
          detay: "Backing down can be wise.",
        },
        basarisizSonuc: {
          mesaj: "A copy had already leaked; a small scandal broke.",
          detay: "Some shadows follow you.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_yasli_ve_yalniz: {
    baslik: "A Lonely Old Age",
    metin:
      "Years of harshness cut you off from friends and even family. You're alone in old age.",
    secenekler: [
      {
        metin: "Question the past, mend a few bridges.",
        basariliSonuc: {
          mesaj: "Some old friends returned; old age feels warmer.",
          detay: "Some bridges mend, even late.",
        },
        basarisizSonuc: {
          mesaj: "Most old friends never forgave you; loneliness continued.",
          detay: "Some wounds run too deep.",
        },
      },
      {
        metin: "Never compromise; accept loneliness.",
        basariliSonuc: {
          mesaj: "You kept your principles; your evenings are lonely.",
          detay: "Consistency has a price.",
        },
        basarisizSonuc: {
          mesaj: "Loneliness began to wear on your health.",
          detay: "Long loneliness wears the body.",
        },
      },
    ],
  },
  sd_din_yol_fanatik_guclu_ses_zirvesi: {
    baslik: "A National Voice",
    metin:
      "At your peak, you're a nationally known preacher. A young journalist wants a last interview.",
    secenekler: [
      {
        metin: "Stand by your words; no regrets.",
        basariliSonuc: {
          mesaj: "The interview resonated; you're 'the voice that never bent'.",
          detay: "Some voices never quiet.",
        },
        basarisizSonuc: {
          mesaj: "Found harsh; even old followers criticized you.",
          detay: "Not all consistency is admired.",
        },
      },
      {
        metin: "Hint at faint remorse, soften.",
        basariliSonuc: {
          mesaj: "Softer words placated old enemies; loyalists were let down.",
          detay: "Change can push allies away.",
        },
        basarisizSonuc: {
          mesaj: "Remorse read as 'weakness'; most loyalists left.",
          detay: "It may be too late to change.",
        },
      },
    ],
  },

  // ===================== SOCIAL (11) =====================
  sd_din_yol_sosyal_grev_destek_komitesi: {
    baslik: "The Strike Support Committee",
    metin:
      "A strike began at the weaving mill. Workers want you on their support committee.",
    secenekler: [
      {
        metin: "Join the committee, back them openly.",
        basariliSonuc: {
          mesaj: "Workers took heart seeing you; the strike strengthened.",
          detay: "Taking a side for justice has a price.",
        },
        basarisizSonuc: {
          mesaj: "Your joining angered donors; church income fell.",
          detay: "Solidarity doesn't go unanswered.",
        },
      },
      {
        metin: "Give only moral support.",
        basariliSonuc: {
          mesaj: "Your moral support eased the workers a little.",
          detay: "A small gesture is something.",
        },
        basarisizSonuc: {
          mesaj: "Workers saw half-support as 'cowardice'.",
          detay: "A half stance can be worse than none.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_bagisci_elestiri: {
    baslik: "The Great Donor",
    metin:
      "The church's biggest donor, a factory owner, imposes harsh conditions on his workers.",
    secenekler: [
      {
        metin: "Criticize him openly in a sermon.",
        basariliSonuc: {
          mesaj: "The sermon echoed; workers embraced you, the owner cut donations.",
          detay: "Truth has a bill.",
        },
        basarisizSonuc: {
          mesaj: "He cut donations and worked to discredit you.",
          detay: "Defying the powerful invites retaliation.",
        },
      },
      {
        metin: "Warn him gently in private.",
        basariliSonuc: {
          mesaj: "The talk was calm; he promised small improvements.",
          detay: "Change begins with quiet words.",
        },
        basarisizSonuc: {
          mesaj: "He ignored your warning and, offended, cut his gift.",
          detay: "Gentle warnings go unheeded.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_gece_okulu: {
    baslik: "A School for Working Children",
    metin:
      "You want to found a free night school for factory children.",
    secenekler: [
      {
        metin: "Spend time and money; found it.",
        basariliSonuc: {
          mesaj: "The school opened; dozens of children learned to read.",
          detay: "Some investments last generations.",
        },
        basarisizSonuc: {
          mesaj: "Too few students came; your effort felt wasted.",
          detay: "Not every kind venture survives.",
        },
      },
      {
        metin: "Propose the idea, leave it to others.",
        basariliSonuc: {
          mesaj: "Others carried it out; your part was small.",
          detay: "Giving an idea is a contribution.",
        },
        basarisizSonuc: {
          mesaj: "No one took the idea seriously; no school opened.",
          detay: "Merely suggesting is not enough.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_hiyerarsi_baskisi: {
    baslik: "Pressure to Silence",
    metin:
      "Church leadership finds your sermons 'too political' and tries to silence you.",
    secenekler: [
      {
        metin: "Defy them, keep raising your voice.",
        basariliSonuc: {
          mesaj: "You kept preaching; the flock embraced you more.",
          detay: "Not bending is the greatest sermon.",
        },
        basarisizSonuc: {
          mesaj: "Authority formally warned you; a shadow fell on your career.",
          detay: "Defiance has a price.",
        },
      },
      {
        metin: "Quiet down, wait out the storm.",
        basariliSonuc: {
          mesaj: "The storm passed; guilt remained.",
          detay: "Silence is survival's price.",
        },
        basarisizSonuc: {
          mesaj: "Your silence let supporters down.",
          detay: "Silence pleases not everyone.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_radikalizm_sorusturmasi: {
    baslik: "An Official Inquiry",
    metin:
      "Church leadership summons you to a formal inquiry on suspicion of 'radicalism'.",
    secenekler: [
      {
        metin: "Defend your stance openly.",
        basariliSonuc: {
          mesaj: "The board cleared you; your firmness earned respect.",
          detay: "Honesty is the best defense.",
        },
        basarisizSonuc: {
          mesaj: "You got a formal reprimand; a stain on your career.",
          detay: "Not every defense suffices.",
        },
      },
      {
        metin: "Defend moderately, soften claims.",
        basariliSonuc: {
          mesaj: "The softened defense ended it; you didn't feel yourself.",
          detay: "Compromise can mean giving up self.",
        },
        basarisizSonuc: {
          mesaj: "Even softening wasn't enough; restrictions came.",
          detay: "Sometimes the board won't budge.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_iscilerin_kahyalik: {
    baslik: "Epidemic in the Neighborhood",
    metin:
      "A contagion spreads in the workers' quarter. You could pay for medicine and a doctor yourself.",
    secenekler: [
      {
        metin: "Pay for medicine and a doctor yourself.",
        basariliSonuc: {
          mesaj: "The doctor saved many families; the quarter won't forget you.",
          detay: "Generosity touches the body too.",
        },
        basarisizSonuc: {
          mesaj: "The doctor fell short; the illness kept spreading.",
          detay: "Not every effort stops an epidemic.",
        },
      },
      {
        metin: "Only pray; preserve church funds.",
        basariliSonuc: {
          mesaj: "You prayed, but the quarter expected more.",
          detay: "Sometimes prayer isn't enough.",
        },
        basarisizSonuc: {
          mesaj: "They noticed your neglect: 'the rich man's priest'.",
          detay: "Neglect quietly costs reputation.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_kadinlar_toplantisi: {
    baslik: "The Women's Meeting",
    metin:
      "Factory women want to use the church to meet and discuss their rights.",
    secenekler: [
      {
        metin: "Open the church, allow it.",
        basariliSonuc: {
          mesaj: "The meeting went well; the women are grateful.",
          detay: "Opening a space grounds a movement.",
        },
        basarisizSonuc: {
          mesaj: "Conservatives found it 'inappropriate' and complained.",
          detay: "Support doesn't go unanswered.",
        },
      },
      {
        metin: "Decline; keep the church neutral.",
        basariliSonuc: {
          mesaj: "The church stayed out of it; the women were disappointed.",
          detay: "Neutrality upsets one side.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was criticized; mocked as 'the so-called social priest'.",
          detay: "Word without deed shakes trust.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_basin_roportaji: {
    baslik: "The Socialist Newspaper",
    metin:
      "A socialist paper wants to interview you and spread your voice.",
    secenekler: [
      {
        metin: "Accept, speak openly.",
        basariliSonuc: {
          mesaj: "The interview resonated; you became the workers' 'own priest'.",
          detay: "A voice grows in the right place.",
        },
        basarisizSonuc: {
          mesaj: "It was distorted; your words lost context.",
          detay: "The press is unpredictable.",
        },
      },
      {
        metin: "Politely decline, stay cautious.",
        basariliSonuc: {
          mesaj: "The refusal passed quietly; you missed your chance to be heard.",
          detay: "Chances don't come twice.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal disappointed some supporters.",
          detay: "Caution can strain solidarity.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_kilise_disina_alinma: {
    baslik: "Threat of Exile",
    metin:
      "The hierarchy's patience is spent; it threatens to remove or exile you.",
    secenekler: [
      {
        metin: "Resist, rally your flock.",
        basariliSonuc: {
          mesaj: "Your flock resisted for you; the exile plan was shelved.",
          detay: "A community outweighs a lone voice.",
        },
        basarisizSonuc: {
          mesaj: "Exile was approved despite resistance; you lost church income too.",
          detay: "Not every resistance wins.",
        },
      },
      {
        metin: "Submit, accept exile.",
        basariliSonuc: {
          mesaj: "You accepted exile; the flock wept as you went.",
          detay: "Some prices must be paid.",
        },
        basarisizSonuc: {
          mesaj: "Exile was harsher; even loyal friends abandoned you.",
          detay: "Submission alone isn't enough.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_hareket_kurma: {
    baslik: "The Birth of a Movement",
    metin:
      "Your years of effort birthed a small 'social gospel' movement. You can grow it.",
    secenekler: [
      {
        metin: "Spend time and effort; grow it.",
        basariliSonuc: {
          mesaj: "The movement spread to nearby cities; you're a pioneer.",
          detay: "Some seeds become forests.",
        },
        basarisizSonuc: {
          mesaj: "It didn't grow; your effort and money came to nothing.",
          detay: "Not every movement lasts.",
        },
      },
      {
        metin: "Let it stay small and local.",
        basariliSonuc: {
          mesaj: "It stayed small but solid; you're a trusted local name.",
          detay: "Small can mean durable.",
        },
        basarisizSonuc: {
          mesaj: "It quietly fell apart; hardly anyone noticed.",
          detay: "Staying small can mean being forgotten.",
        },
      },
    ],
  },
  sd_din_yol_sosyal_kurumsal_bedel: {
    baslik: "Your Career's Last Word",
    metin:
      "At career's end, your movement will honor you as a pioneer, or the church will cast you out.",
    secenekler: [
      {
        metin: "One last time, raise your voice fiercely.",
        basariliSonuc: {
          mesaj: "Your last sermon inspired generations; people call you 'their own priest'.",
          detay: "Some farewells are a career's peak.",
        },
        basarisizSonuc: {
          mesaj: "The church cast you out; you lost even your pension.",
          detay: "Some prices are paid even at the end.",
        },
      },
      {
        metin: "Step back, retire quietly.",
        basariliSonuc: {
          mesaj: "A quiet retirement: peaceful but less remembered.",
          detay: "Some finales bring peace in silence.",
        },
        basarisizSonuc: {
          mesaj: "Even your quiet exit read as 'surrender'.",
          detay: "Not every withdrawal reads alike.",
        },
      },
    ],
  },

  // ===================== CORRUPT (11) =====================
  sd_din_yol_yozlasmis_rusvet_teklifi: {
    baslik: "A Quiet Arrangement",
    metin:
      "A factory owner offers regular 'donations' to keep his workers obedient.",
    secenekler: [
      {
        metin: "Accept the offer.",
        basariliSonuc: {
          mesaj: "You accepted; the budget eased, a small stain remains.",
          detay: "Conscience pays for comfort.",
        },
        basarisizSonuc: {
          mesaj: "Part of the deal leaked; some began to suspect.",
          detay: "Secret deals get heard.",
        },
      },
      {
        metin: "Decline, stay honest.",
        basariliSonuc: {
          mesaj: "You declined; peace within, but the budget stays tight.",
          detay: "Honesty isn't always comfortable.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered him; he began pulling other support.",
          detay: "Honesty can cost indirectly.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_hayirsever_fon_zimmet: {
    baslik: "A Tempting Fund",
    metin:
      "Borrowing a little from the poor fund looks tempting.",
    secenekler: [
      {
        metin: "Take money from the fund secretly.",
        basariliSonuc: {
          mesaj: "No one noticed; your pocket's fuller, but there's an ache.",
          detay: "Silent crime echoes in conscience.",
        },
        basarisizSonuc: {
          mesaj: "The ledger gap was noticed; suspicion fell on you.",
          detay: "Numbers eventually betray.",
        },
      },
      {
        metin: "Don't touch it; leave the fund.",
        basariliSonuc: {
          mesaj: "You left it; it reached the poor, and you feel at peace.",
          detay: "The quiet comfort of being right.",
        },
        basarisizSonuc: {
          mesaj: "You had to help from your pocket; an expense arose.",
          detay: "Honesty can bring extra burden.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_gizli_metres: {
    baslik: "A Secret Affair",
    metin:
      "You have a secret affair with a parishioner. Someone has begun to notice.",
    secenekler: [
      {
        metin: "Continue, hide it more carefully.",
        basariliSonuc: {
          mesaj: "Hush money worked; the affair stayed hidden a while.",
          detay: "Secret happiness has a price.",
        },
        basarisizSonuc: {
          mesaj: "The affair came out; the flock was deeply disappointed.",
          detay: "What's hidden comes out.",
        },
      },
      {
        metin: "End it; don't risk it.",
        basariliSonuc: {
          mesaj: "You ended it; reputation kept, emptiness remained.",
          detay: "Safety can bring heartbreak.",
        },
        basarisizSonuc: {
          mesaj: "A small rumor had already spread.",
          detay: "Shadows leave traces.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_gunahkarlarin_ayricaligi: {
    baslik: "The Rich Man's Absolution",
    metin:
      "A rich merchant offers a large gift if you publicly declare his open sin 'forgiven'.",
    secenekler: [
      {
        metin: "Take the gift, publicly absolve him.",
        basariliSonuc: {
          mesaj: "He was relieved, the church richer; some looked on with suspicion.",
          detay: "Absolution for sale loses value.",
        },
        basarisizSonuc: {
          mesaj: "The deal became gossip: 'money buys anything'.",
          detay: "Open bargains can't stay secret.",
        },
      },
      {
        metin: "Decline, act on principle.",
        basariliSonuc: {
          mesaj: "You refused; he's angry, but your conscience is at ease.",
          detay: "Some refusals cost but are worth it.",
        },
        basarisizSonuc: {
          mesaj: "He was angered and cut all support to the church.",
          detay: "Principle can cost money.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_yakalanma_tehlikesi: {
    baslik: "A Discrepancy in the Accounts",
    metin:
      "The church accountant noticed ledger discrepancies and questions you.",
    secenekler: [
      {
        metin: "Lie, cover the books with forged papers.",
        basariliSonuc: {
          mesaj: "Forgeries convinced him; every audit now frightens you.",
          detay: "One lie requires another.",
        },
        basarisizSonuc: {
          mesaj: "The forgeries surfaced; the scandal spread region-wide.",
          detay: "A bursting lie takes everything.",
        },
      },
      {
        metin: "Partly confess, offer amends.",
        basariliSonuc: {
          mesaj: "Partial confession calmed him; you had to cover the losses.",
          detay: "Partial honesty is a start.",
        },
        basarisizSonuc: {
          mesaj: "The confession wasn't enough; he reported you upward.",
          detay: "Some mistakes amends can't close.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_sahte_kayit: {
    baslik: "A Forged Record",
    metin:
      "A noble family wants a forged record to launder a tainted inheritance, offering a generous 'gift'.",
    secenekler: [
      {
        metin: "Forge the record.",
        basariliSonuc: {
          mesaj: "It passed smoothly; coffers filled, but the records can't be trusted.",
          detay: "Tainted records taint trust.",
        },
        basarisizSonuc: {
          mesaj: "The record was questioned in court; the forgery surfaced.",
          detay: "Forgeries reach a court eventually.",
        },
      },
      {
        metin: "Decline, protect the records.",
        basariliSonuc: {
          mesaj: "You declined, the family found another way; records stayed clean.",
          detay: "Some refusals protect unseen value.",
        },
        basarisizSonuc: {
          mesaj: "The family left angry and spread bad rumors.",
          detay: "Even refusal can cost.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_sadaka_kutusu: {
    baslik: "The Alms Box",
    metin:
      "The alms box keeps shrinking; you take it, and someone has begun to notice.",
    secenekler: [
      {
        metin: "Keep taking, be more careful.",
        basariliSonuc: {
          mesaj: "You were more careful; no one found proof.",
          detay: "Habits are the hardest sins to quit.",
        },
        basarisizSonuc: {
          mesaj: "A parishioner caught you red-handed; a humiliating scene.",
          detay: "Petty theft breaks great trust.",
        },
      },
      {
        metin: "Stop, start refilling the box.",
        basariliSonuc: {
          mesaj: "You quietly put it back; no one noticed, and you felt relief.",
          detay: "Late honesty is still honesty.",
        },
        basarisizSonuc: {
          mesaj: "The returned money was noticed; suspicion turned on you again.",
          detay: "The past isn't easily erased.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_rakip_sirri: {
    baslik: "A Rival's Secret",
    metin:
      "You learned a rival clergyman's secret; use it to silence or expose him.",
    secenekler: [
      {
        metin: "Blackmail him, gain advantage.",
        basariliSonuc: {
          mesaj: "Your rival withdrew quietly, leaving a small 'thank you'.",
          detay: "Power sometimes comes from fear.",
        },
        basarisizSonuc: {
          mesaj: "The blackmail surfaced; your own name suffered.",
          detay: "Dirty weapons burn your own hand.",
        },
      },
      {
        metin: "Don't use it; stay quiet.",
        basariliSonuc: {
          mesaj: "You kept it, thinking it might help someday.",
          detay: "Unused knowledge is still power.",
        },
        basarisizSonuc: {
          mesaj: "The secret leaked another way; your rival blamed you.",
          detay: "Kept secrets still bother.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_ust_makam_sorgu: {
    baslik: "The Inspector's Arrival",
    metin:
      "The bishopric sends an inspector to probe your financial discrepancies.",
    secenekler: [
      {
        metin: "Hide evidence, bribe the inspector.",
        basariliSonuc: {
          mesaj: "He took the bribe; the report came back 'clean'.",
          detay: "A bribe hides, not solves.",
        },
        basarisizSonuc: {
          mesaj: "The bribe attempt was recorded as a crime; a major scandal broke.",
          detay: "Covering one wrong breeds another.",
        },
      },
      {
        metin: "Cooperate, accept the penalty.",
        basariliSonuc: {
          mesaj: "Cooperation softened the penalty, yet your name was shadowed.",
          detay: "Cooperation is the least bad choice.",
        },
        basarisizSonuc: {
          mesaj: "You got a heavy penalty anyway; the church condemned you publicly.",
          detay: "Some mistakes aren't easily forgiven.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_cifte_hayat_ifsa: {
    baslik: "A Double Life",
    metin:
      "Your years-long double life is nearly exposed; a journalist is at your door.",
    secenekler: [
      {
        metin: "Offer the journalist a big bribe.",
        basariliSonuc: {
          mesaj: "He took the bribe; the story wasn't published — for now.",
          detay: "Cover-ups aren't always lasting.",
        },
        basarisizSonuc: {
          mesaj: "Your bribe offer made the story; the scandal doubled.",
          detay: "Some attempts make things worse.",
        },
      },
      {
        metin: "Get ahead with a partial admission.",
        basariliSonuc: {
          mesaj: "Partial admission softened it; you avoided the worst.",
          detay: "A controlled truth beats a wild scandal.",
        },
        basarisizSonuc: {
          mesaj: "The admission fell short; he published the rest.",
          detay: "Some truths can't be told piecemeal.",
        },
      },
    ],
  },
  sd_din_yol_yozlasmis_skandal_ya_da_kurtulus: {
    baslik: "The Final Reckoning",
    metin:
      "Your career is ending. Cover up years of misdeeds for a comfortable retirement, or tell the truth.",
    secenekler: [
      {
        metin: "Cover it up with a last big bribe, retire quietly.",
        basariliSonuc: {
          mesaj: "The bribe worked; a comfortable retirement, but no peace at night.",
          detay: "Some victories only feed the pocket.",
        },
        basarisizSonuc: {
          mesaj: "Your attempt backfired; your career ended in scandal.",
          detay: "Some bets are lost at the very end.",
        },
      },
      {
        metin: "Tell the truth, cleanse your conscience.",
        basariliSonuc: {
          mesaj: "You told the truth; your name was shaken, but the burden is lifted.",
          detay: "Late confession still brings peace.",
        },
        basarisizSonuc: {
          mesaj: "Your confession met backlash; career ended in disgrace, conscience clean.",
          detay: "What's right can end bitterly.",
        },
      },
    ],
  },
};
