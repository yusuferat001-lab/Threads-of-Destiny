import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/iliskiler.ts — İngilizce çevirileri. */
export const OLAYLAR_ILISKILER_EN: Record<string, OlayCeviri> = {
  iliski_ikinci_teklif: {
    baslik: "The Love You Waited For",
    metin:
      "After years of loneliness, that ordinary person you bumped into at the market and couldn't stop staring at... Not rich, not influential, but your heart is beating this fast for the first time.",
    secenekler: [
      {
        metin: "Follow your feelings and marry.",
        basariliSonuc: {
          mesaj:
            "You married in a very plain ceremony. There is only dry bread on our table, but with them it feels like a palace feast.",
        },
        basarisizSonuc: {
          mesaj:
            "You found no answer to your love. They chose to live in another city and left, tearing your heart to pieces.",
        },
      },
      {
        metin: "Love doesn't fill a belly; let me stay alone.",
        basariliSonuc: {
          mesaj:
            "You suppressed your feelings and chose your reason. Your coffer may fill, but those eyes will not leave your mind for the rest of your life.",
        },
        basarisizSonuc: {
          mesaj: "You chose your reason but you are suffering.",
        },
      },
    ],
  },

  iliski_ev_ici_kavga: {
    baslik: "The Broken Vase",
    metin:
      "A small argument with {es} that started over money troubles (or your neglect) got out of hand. They hurled the vase in their hand to the ground and started shouting.",
    secenekler: [
      {
        metin: "React hard, don't let your authority slip.",
        basariliSonuc: {
          mesaj:
            "You raised your voice louder than theirs. They fell silent and left the room. You won this battle, but your marriage took a wound.",
        },
        basarisizSonuc: {
          mesaj:
            "Your words were so heavy and cutting that {es} started to pack. You are at the edge of the cliff.",
        },
      },
      {
        metin: "Gather the shards with your own hands, embrace them and calm things.",
        basariliSonuc: {
          mesaj:
            "Instead of answering with anger you bent down and gathered the shards. They helped you, crying. The storm passed.",
        },
        basarisizSonuc: {
          mesaj: "You tried to embrace them but they pushed you away. They need time for their anger to cool.",
        },
      },
    ],
  },

  iliski_es_gizli_talep: {
    baslik: "Your Spouse's Dangerous Secret",
    metin:
      "After dinner {es} locked the doors tight. In a trembling voice, they confessed to a large gambling debt to a moneylender, and that their life is in danger if they don't pay.",
    secenekler: [
      {
        metin: "Clear the debt without a word.",
        basariliSonuc: {
          mesaj:
            "You gave all your savings to the moneylender and saved them. {es} will stay loyal to you like a servant for life.",
        },
        basarisizSonuc: {
          mesaj: "You gave the money but the moneylenders used the interest as an excuse and kept wearing out your doorstep.",
        },
      },
      {
        metin: "This is your fault, tell them to fend for themselves.",
        basariliSonuc: {
          mesaj:
            "You didn't touch your money. {es} didn't come home for days; you don't know how they paid the debt and you're afraid to ask.",
        },
        basarisizSonuc: {
          mesaj:
            "The moneylenders beat {es} savagely in the middle of the street. They died in the infirmary. Everyone is talking about how stingy you are.",
        },
      },
    ],
  },

  iliski_bosanma_esigi: {
    baslik: "Severed Ties",
    metin:
      "The silence in the house is sharp as a knife. The bonds between you and {es} have broken completely. Either you sacrifice all your pride and your purse and carry this marriage, or you make that heavy decision that will shake your children and family too.",
    secenekler: [
      {
        metin: "Swallow your pride, work to fix everything.",
        basariliSonuc: {
          mesaj:
            "Gifts, concessions and long tears worked. The marriage was saved, but it's clear now whose hands hold the strings.",
        },
        basarisizSonuc: {
          mesaj:
            "Despite all your effort and the money you spent, {es} left the house. Your money is gone and your family fell apart.",
        },
      },
      {
        metin: "Let it be over, go to the court (or the judge).",
        basariliSonuc: {
          mesaj:
            "The separation was painful. Belongings were divided, your purse emptied, but at least that suffocating silence is over.",
        },
        basarisizSonuc: {
          mesaj:
            "The process turned into a vile war of gossip. Your name was tarnished and you left half your fortune in court.",
        },
      },
    ],
  },

  iliski_es_hastalik: {
    baslik: "The Breath of Death",
    metin:
      "{es} has fallen gravely ill. Their face is chalk-white, they struggle to breathe. A very expensive physician brought from afar has a chance of saving them, but it could drive you to ruin.",
    secenekler: [
      {
        metin: "Sell the shop, go into debt, send for that physician!",
        basariliSonuc: {
          mesaj:
            "The physician arrived just in time! {es} came back from the edge of death. Your coffer is empty but there is a soul breathing in your house.",
        },
        basarisizSonuc: {
          mesaj:
            "You poured out money like water but it wasn't enough. {es} drew their last breath in your arms. The house is now a freezing tomb.",
        },
      },
      {
        metin: "I have no money; whatever fate has written will be.",
        basariliSonuc: {
          mesaj:
            "A miracle happened! {es} beat the sickness with their own body's resistance. But your grudging the money built an invisible wall between you.",
        },
        basarisizSonuc: {
          mesaj:
            "{es} died in agony. At the funeral everyone whispered about how 'thrifty' you were.",
        },
      },
    ],
  },

  rakip_ekip_teklifi: {
    baslik: "My Enemy's Sword",
    metin:
      "{rakip}, your bitter enemy, came to your door at night. Desperate. You both have a powerful common enemy and they say, 'If you don't take me in, we'll both be destroyed.'",
    secenekler: [
      {
        metin: "I don't trust you but I need your strength (Hire).",
        basariliSonuc: {
          mesaj:
            "Your old enemy is now your commander/assistant. You still shudder turning your back to them, but their sword is raised for you.",
        },
        basarisizSonuc: {
          mesaj: "It was a trap! The moment they came through the door they attacked you; the guards barely saved you.",
        },
      },
      {
        metin: "I won't share a sack with a snake! Get out.",
        basariliSonuc: {
          mesaj: "You slammed the door in their face. Being cautious keeps you alive.",
        },
        basarisizSonuc: {
          mesaj: "{rakip} joined your common enemy the next day and swore to bring about your end.",
        },
      },
    ],
  },

  genel_ikilem_dost: {
    baslik: "Between Two Friends",
    metin:
      "You have two close friends who are enemies of each other. One is a loyal but poor friend who has stood by you for years; the other is someone you just met, influential and useful. Both want you to pick a side.",
    secenekler: [
      {
        metin: "Stand by your old, loyal friend.",
        basariliSonuc: {
          mesaj: "You stood by your old friend; and they stood by you all their life.",
          detay:
            "The influential man closed doors and it cost you dearly. But when you fell ill, the one sitting at your bedside was not the man who closed those doors.",
        },
        basarisizSonuc: {
          mesaj: "You stayed loyal but your friend lost the fight; you both suffered.",
          detay: "Being on the right side is not being on the winning side. You both lost and were left with each other.",
        },
      },
      {
        metin: "Stand by your influential new friend.",
        basariliSonuc: {
          mesaj: "Your influential friend won and raised you up with them.",
          detay:
            "You never answered the letter your old friend wrote you. Your career is soaring and that letter still sits in your drawer.",
        },
        basarisizSonuc: {
          mesaj: "Your influential friend lost the fight and said they didn't know you.",
          detay:
            "You sold out your old friend and the new one didn't even acknowledge you. You have neither friendship nor career left; only the choice you made.",
        },
      },
    ],
  },

  genel_eski_dost_ziyareti: {
    baslik: "A Childhood Friend",
    metin:
      "A childhood friend you haven't seen in years has come to your city. They have a very different life now and want to talk with you about the old days.",
    secenekler: [
      {
        metin: "Spend time with them, reminisce about the old days.",
        basariliSonuc: {
          mesaj: "You had a lovely evening; your old friendship was renewed.",
          detay: "Sometimes a short trip to the past does the present good.",
        },
        basarisizSonuc: {
          mesaj: "The gap between you had grown so wide that the old conversation never quite came back.",
          detay: "Some friendships part into different roads over time.",
        },
      },
      {
        metin: "You're busy, keep it short.",
        basariliSonuc: {
          mesaj: "You went back to your work; your friend left with understanding.",
          detay: "Maybe you missed a lovely memory, but your work didn't fall behind.",
        },
        basarisizSonuc: {
          mesaj: "Your friend left hurt; you never heard from them again.",
          detay: "Some opportunities don't come back.",
        },
      },
    ],
  },

  iliski_dost_zor_durumda: {
    baslik: "Your Friend in Trouble",
    metin:
      "{dost} showed up at your door; their debts have grown and they're left empty-handed. They ask you for help, but this won't be an easy help to give.",
    secenekler: [
      {
        metin: "Share the money you have, help {dost}.",
        basariliSonuc: {
          mesaj: "You saw {dost}'s eyes fill; they said they would never forget this help.",
          detay: "Being there in a hard time is the true test of friendship.",
        },
        basarisizSonuc: {
          mesaj: "Your help wasn't enough, but {dost} appreciated your effort anyway.",
          detay: "Sometimes what you can do is little, but the intention matters.",
        },
      },
      {
        metin: "Your own affairs are hard too; apologize and turn them away.",
        basariliSonuc: {
          mesaj: "{dost} said they understood, but the disappointment in their eyes couldn't be hidden.",
          detay: "Refusing is sometimes sensible, but it is not without cost.",
        },
        basarisizSonuc: {
          mesaj: "{dost} told others about the refusal; some people found you colder and more selfish.",
          detay: "Turning your face away in a hard time is talked about more than you think.",
        },
      },
    ],
  },

  iliski_rakip_teklifi: {
    baslik: "Your Rival's Offer",
    metin:
      "{rakip} has long been at odds with you, but today they came to your door with an offer of partnership. You can't tell whether it's sincere or a trap.",
    secenekler: [
      {
        metin: "Accept the offer, join forces with {rakip}.",
        basariliSonuc: {
          mesaj: "The partnership worked; the tension between you and {rakip} surprisingly melted away.",
          detay: "Sometimes your greatest rival can turn into your most trustworthy partner.",
        },
        basarisizSonuc: {
          mesaj: "It was a trap. {rakip} used you and cast you aside. Your money and reputation took a wound.",
          detay: "You should have thought twice before shaking your rival's hand again.",
        },
      },
      {
        metin: "Refuse the offer, keep your distance.",
        basariliSonuc: {
          mesaj: "{rakip} took the refusal coolly, but the distance between you grew.",
          detay: "Being cautious saved you from a loss, and from a gain.",
        },
        basarisizSonuc: {
          mesaj: "{rakip} told others your refusal was 'cowardice'.",
          detay: "Some rivalries only heat up further when refused.",
        },
      },
    ],
  },

  iliski_dostla_kavga: {
    baslik: "A Falling-Out With Your Friend",
    metin:
      "An argument with {dost} that grew from a small word broke out. This could end a friendship of many years.",
    secenekler: [
      {
        metin: "Set your pride aside, make peace first.",
        basariliSonuc: {
          mesaj: "When {dost} saw you reach out your hand they smiled; you went back to the old days.",
          detay: "Sometimes taking the first step is not losing but winning.",
        },
        basarisizSonuc: {
          mesaj: "Your peace effort didn't get quite the response you wanted, but at least the door didn't close.",
          detay: "Not every apology is accepted at once; it may need time.",
        },
      },
      {
        metin: "Dig in your heels, you think you're right.",
        basariliSonuc: {
          mesaj: "You were right, but instead of admitting it {dost} pulled away from you.",
          detay: "Being proven right is sometimes the most expensive victory.",
        },
        basarisizSonuc: {
          mesaj: "The argument grew; {dost} doesn't talk to you like before anymore.",
          detay: "Some words open wounds too deep to take back.",
        },
      },
    ],
  },

  iliski_rakip_dedikodu: {
    baslik: "Your Rival's Gossip",
    metin:
      "You learned that {rakip} has been spreading a baseless rumor about you; some people around you have already started to believe it.",
    secenekler: [
      {
        metin: "Confront {rakip}, tell the truth in front of everyone.",
        basariliSonuc: {
          mesaj: "The confrontation worked; the rumor died down and you were proven right.",
          detay: "Sometimes saying the truth out loud is the best defense.",
        },
        basarisizSonuc: {
          mesaj: "The confrontation turned ugly; through it the rumor spread even further.",
          detay: "Some fires grow bigger when you go at them.",
        },
      },
      {
        metin: "Ignore it, think it will be forgotten with time.",
        basariliSonuc: {
          mesaj: "The rumor really did die down with time; and you didn't wear out your nerves.",
          detay: "You don't have to run to every fire; some go out on their own.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was read by some as 'an admission of guilt'.",
          detay: "Ignoring it is not always the safest way.",
        },
      },
    ],
  },

  tepki_es_iddiali_soz: {
    baslik: "A Duel of Words at Home",
    metin:
      "You couldn't agree with {es} on something; the argument grew. The next word out of your mouth will either mend this night or deepen it.",
    secenekler: [
      {
        metin: "Close the subject, say 'we'll talk later'.",
        basariliSonuc: {
          mesaj: "You postponed the argument; the house went quiet but the matter hangs in the air.",
          detay: "Some subjects don't shrink when postponed, they just wait.",
        },
        basarisizSonuc: {
          mesaj: "You said 'we'll talk later' but {es} saw it as an escape.",
          detay: "Postponing sometimes sounds like fleeing.",
        },
      },
      {
        metin: "You are about to say something harsh you can't take back.",
        basariliSonuc: { mesaj: "Not used." },
        basarisizSonuc: { mesaj: "Not used." },
        onTepki: {
          metin:
            "The words are on the tip of your tongue. The look in {es}'s eyes is changing; if you form this sentence, there may be no going back.",
          geriCekilMetni: "Swallow it at the last moment, soften your words.",
          geriCekilSonucu: {
            mesaj: "You swallowed what you were going to say; it was hard but {es} noticed and softened a little.",
            detay: "Sometimes the strongest word is the one left unsaid.",
          },
          devamMetni: "Say it. There's no stopping now.",
          devamSonucu: {
            mesaj: "The words came out and couldn't be taken back. {es} left the room in silence.",
            detay: "Some sentences leave permanent cracks in a relationship.",
          },
        },
      },
    ],
  },

  tepki_dost_agir_soz: {
    baslik: "A Moment That Tests the Friendship",
    metin:
      "A small misunderstanding with {dost} grew. A harsh word out of your mouth could shake this friendship of years.",
    secenekler: [
      {
        metin: "Take a deep breath, soften the subject.",
        basariliSonuc: {
          mesaj: "You stayed calm; {dost} appreciated it.",
          detay: "Some friendships stay standing through patience.",
        },
        basarisizSonuc: {
          mesaj: "You tried to soften it but the tension in your voice couldn't be hidden.",
          detay: "Not every good intention is received the same way.",
        },
      },
      {
        metin: "You are about to say a harsh word.",
        basariliSonuc: { mesaj: "Not used." },
        basarisizSonuc: { mesaj: "Not used." },
        onTepki: {
          metin:
            "The look on {dost}'s face is changing. The sentence you're about to say could decide the future of this friendship.",
          geriCekilMetni: "Swallow it at the last moment, change the subject.",
          geriCekilSonucu: {
            mesaj: "You swallowed your words; {dost} seemed to notice something but didn't dwell on it.",
            detay: "Some sentences are better left unsaid.",
          },
          devamMetni: "Say it. There's no going back now.",
          devamSonucu: {
            mesaj: "The words came out. {dost} pulled away in silence, and a distance came between you.",
            detay: "Some words never let a friendship be as it was.",
          },
        },
      },
    ],
  },

  tepki_rakip_meydan_okuma: {
    baslik: "A Moment of Defiance",
    metin:
      "You heard that {rakip} has again been spreading a bad word about you. When you meet them, you are about to settle the score in front of everyone.",
    secenekler: [
      {
        metin: "Ignore it, carry on your way.",
        basariliSonuc: {
          mesaj: "You ignored it; though it bothered you inside, you acted with maturity.",
          detay: "Not every fight is worth winning.",
        },
        basarisizSonuc: {
          mesaj: "You tried to ignore it but the anger inside wore you out.",
          detay: "Suppressing it is sometimes even more tiring.",
        },
      },
      {
        metin: "Confront them in front of everyone.",
        basariliSonuc: { mesaj: "Not used." },
        basarisizSonuc: { mesaj: "Not used." },
        onTepki: {
          metin:
            "{rakip} is in front of you, the people around have stopped to watch. If you take one more step this turns into an irreversible confrontation.",
          geriCekilMetni: "Give up at the last moment, turn your back.",
          geriCekilSonucu: {
            mesaj: "You gave up at the last moment; {rakip} watched you with a baffled look.",
            detay: "Sometimes the strongest move is making no move.",
          },
          devamMetni: "No. Go all the way.",
          devamSonucu: {
            mesaj:
              "The confrontation happened in front of the crowd; {rakip} backed down but things between you got even worse.",
            detay: "The pride you won came with an equal weight of enmity.",
          },
        },
      },
    ],
  },

  iliski_ilk_ask: {
    baslik: "First Love",
    metin:
      "Someone in the neighborhood makes your heart race. Every time you meet, your tongue ties up, but how much longer can you hide this feeling?",
    secenekler: [
      {
        metin: "Say your feelings openly.",
        basariliSonuc: {
          mesaj: "Your words, like your heart, found an answer; you walked on clouds for days.",
          detay: "First love never comes with quite the same taste again.",
        },
        basarisizSonuc: {
          mesaj: "You were politely rejected, your face flushed and you avoided them for weeks.",
          detay: "Not every heart beats at the same time.",
        },
      },
      {
        metin: "Keep it inside, you didn't have the courage.",
        basariliSonuc: {
          mesaj: "You opened your feelings to no one; you chose a safe but a little sad silence.",
          detay: "Some feelings stay only your own.",
        },
        basarisizSonuc: {
          mesaj: "You blamed yourself for years, saying 'if only', for the words you didn't say.",
          detay: "Lack of courage is sometimes the greatest regret.",
        },
      },
    ],
  },

  eski_rakiple_son_karsilasma: {
    baslik: "The Last Encounter",
    metin:
      "{rakip}, the rival you've known for years, looks aged and tired. Perhaps you face each other for the last time.",
    secenekler: [
      {
        metin: "Offer peace, close the past.",
        basariliSonuc: {
          mesaj: "{rakip} shook your hand in surprise; the tension of years melted away in an instant.",
          detay: "The best end to some wars is peace.",
        },
        basarisizSonuc: {
          mesaj: "{rakip} refused your offer, said 'too late' in a cold voice.",
          detay: "Not every hand of peace is taken.",
        },
      },
      {
        metin: "Don't leave without settling old scores; challenge them.",
        basariliSonuc: {
          mesaj: "One last time you proved your superiority; {rakip} withdrew in silence.",
          detay: "Some people want not peace but closure.",
        },
        basarisizSonuc: {
          mesaj: "The last encounter didn't deliver; you both left tired and hurt.",
          detay: "Some scores never close.",
        },
      },
    ],
  },

  bekarlik_ozgurluk_hissi: {
    baslik: "The Freedom of Being Single",
    metin:
      "You enjoy living as you please, answerable to no one. Today too you make your own decisions.",
    secenekler: [
      {
        metin: "Make the most of this freedom, give yourself time.",
        basariliSonuc: {
          mesaj: "The time you gave yourself refreshed you.",
          detay: "Sometimes the best company is your own.",
        },
        basarisizSonuc: {
          mesaj: "The time alone was nice but not as satisfying as you'd hoped.",
          detay: "Not every solitude brings peace.",
        },
      },
      {
        metin: "Feel the weight of loneliness.",
        basariliSonuc: {
          mesaj: "The loneliness weighed on you for a while, but then you accepted it.",
          detay: "Some feelings wait to be accepted.",
        },
        basarisizSonuc: {
          mesaj: "The loneliness pressed on you far harder than you expected today. Your chest tightened.",
          detay: "Not every day passes with the same ease.",
        },
      },
    ],
  },

  bekarlik_aile_baskisi: {
    baslik: "When Will You Marry?",
    metin:
      "Someone in your family asked the same question again: 'When will you marry?' This time your patience wore a little thin.",
    secenekler: [
      {
        metin: "Answer patiently, with a smile.",
        basariliSonuc: {
          mesaj: "Your patient answer headed off the tension.",
          detay: "Patience always helps in family relations.",
        },
        basarisizSonuc: {
          mesaj: "You tried to be patient but the question gnawed at you a little.",
          detay: "Some questions bother you no matter how used to them you get.",
        },
      },
      {
        metin: "Show openly that you're annoyed.",
        basariliSonuc: {
          mesaj: "Your reaction stopped them from asking the same question again.",
          detay: "Sometimes being clear is the most effective way.",
        },
        basarisizSonuc: {
          mesaj: "Your annoyance caused a small tension in the family and they talked behind your back.",
          detay: "Impatience can have a price too.",
        },
      },
    ],
  },

  bekarlik_macera_arkadasi: {
    baslik: "A Single's Night",
    metin:
      "{dost} invited you on an unexpected adventure. You can enjoy your unmarried life for one more night.",
    secenekler: [
      {
        metin: "Accept the invitation, jump into the adventure.",
        basariliSonuc: {
          mesaj: "The night turned out unexpectedly lovely; it became an unforgettable memory.",
          detay: "Some nights make it into the best moments of the year.",
        },
        basarisizSonuc: {
          mesaj: "The night didn't go as planned; you came back a little tired and poorer.",
          detay: "Not every adventure goes smoothly.",
        },
      },
      {
        metin: "Politely decline, stay home.",
        basariliSonuc: {
          mesaj: "You had a quiet night and looked after yourself.",
          detay: "Sometimes the best choice is to do nothing.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal disappointed {dost} a little.",
          detay: "Every no can carry a small sadness.",
        },
      },
    ],
  },

  bekarlik_yalniz_yaslanma_korkusu: {
    baslik: "The Fear of Growing Old Alone",
    metin:
      "At night you sometimes ask yourself: what happens if there's no one beside you when you're old? That thought pressed harder tonight.",
    secenekler: [
      {
        metin: "Face this thought, accept it.",
        basariliSonuc: {
          mesaj: "Facing the thought brought you an unexpected peace.",
          detay: "Some fears shrink when you face them.",
        },
        basarisizSonuc: {
          mesaj: "The thought hit you deeply tonight; you couldn't sleep at all.",
          detay: "Not every reckoning is easy.",
        },
      },
      {
        metin: "Suppress the thought, distract yourself with other things.",
        basariliSonuc: {
          mesaj: "You distracted yourself; the thought pulled back for a while.",
          detay: "Sometimes postponing is a strategy too.",
        },
        basarisizSonuc: {
          mesaj: "The thought you tried to suppress came back all night in nightmares.",
          detay: "Some thoughts don't quiet easily.",
        },
      },
    ],
  },

  bekarlik_kariyer_odagi: {
    baslik: "A Chance to Fully Focus",
    metin:
      "Since you're answerable to no one, you can devote all your time and energy to your work/career.",
    secenekler: [
      {
        metin: "Give all your energy to your work.",
        basariliSonuc: {
          mesaj: "Your focus brought a nice gain and recognition.",
          detay: "Sometimes devoting yourself to one thing pays.",
        },
        basarisizSonuc: {
          mesaj: "Your excessive focus burned you out; you found no satisfaction.",
          detay: "Without balance even success can feel empty.",
        },
      },
      {
        metin: "Keep the balance, give time to other sides of life too.",
        basariliSonuc: {
          mesaj: "Your balanced approach made you both successful and happy.",
          detay: "Balance is sometimes the wisest strategy.",
        },
        basarisizSonuc: {
          mesaj: "Trying to strike a balance, you missed some opportunities at work.",
          detay: "Not every balance is without loss.",
        },
      },
    ],
  },

  is_ikilem_terfi_mi_aile_mi: {
    baslik: "A Post in Distant Lands",
    metin:
      "A great opportunity was offered to you: a distant assignment lasting months that would leap your career forward. But {es} and your children will be left alone for this whole time.",
    secenekler: [
      {
        metin: "Accept the assignment, set out.",
        basariliSonuc: {
          mesaj:
            "The assignment ended in great success; when you returned, {es}'s eyes held both pride and the traces of a long longing.",
          detay: "Your career rose; the table at home had a gap for a while.",
        },
        basarisizSonuc: {
          mesaj:
            "The assignment was hard and did not bring the success you hoped; and {es} never forgot that long loneliness.",
          detay: "Sometimes you take the risk and gain nothing.",
        },
      },
      {
        metin: "Refuse the offer, stay with your family.",
        basariliSonuc: {
          mesaj:
            "You refused the offer; {es} embraced you with gratitude, and though your career stalls for a while, you come home every evening.",
          detay: "Some promotions aren't worth a single dinner.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was noted as 'lacking ambition' by the higher-ups; the next opportunity may be slow to come.",
          detay: "Every sacrifice has a cost.",
        },
      },
    ],
  },
};
