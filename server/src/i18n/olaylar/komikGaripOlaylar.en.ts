import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/komikGaripOlaylar.ts — English translations. */
export const OLAYLAR_KOMIK_GARIP_EN: Record<string, OlayCeviri> = {
  // ───────────────────────── SHARED (both ages) ─────────────────────────
  komik_yeme_yarismasi: {
    baslik: "Eating Contest",
    metin:
      "An eating contest is heating up in the market square. The winner gets a week of free meals, but the tower of plates on the table is genuinely alarming.",
    secenekler: [
      {
        metin: "Enter the contest — trust your stomach.",
        ipucu: "Win and you eat free for a week; lose and your stomach turns on you",
        basariliSonuc: {
          mesaj: "You cleared the last plate! The crowd cheered, and a week of free meals is yours.",
        },
        basarisizSonuc: {
          mesaj: "You tapped out halfway through; your stomach held a grudge for days.",
        },
      },
      {
        metin: "Watch from the sidelines, heckle a little.",
        ipucu: "Safe, but a bit dull",
        basariliSonuc: {
          mesaj: "You watched in comfort and could practically feel your stomach thanking you.",
        },
        basarisizSonuc: {
          mesaj: "A few people called you 'chicken' — you didn't care, but you heard it.",
        },
      },
    ],
  },
  komik_yanlis_sarki: {
    baslik: "A Song in the Square",
    metin:
      "A traveling minstrel called you up on stage in the square: 'Come on, sing us a song!' The crowd is waiting, and you barely remember the words.",
    secenekler: [
      {
        metin: "Get up there and sing, come what may.",
        ipucu: "Applause or laughter — either way, your voice carries",
        basariliSonuc: {
          mesaj: "Your voice came out surprisingly good, and the crowd broke into applause.",
        },
        basarisizSonuc: {
          mesaj: "You mangled the lyrics and lost the tune; for days they called you 'the minstrel' — not as a compliment.",
        },
      },
      {
        metin: "Blush, thank them, and decline.",
        ipucu: "Safe; a small letdown",
        basariliSonuc: {
          mesaj: "You declined politely, and the minstrel shrugged and called up someone else.",
        },
        basarisizSonuc: {
          mesaj: "They kept pushing, and you fled the scene; a small regret stayed with you.",
        },
      },
    ],
  },
  komik_garip_yanlis_cenaze: {
    baslik: "The Wrong Funeral",
    metin:
      "You joined a large mourning procession — but a few minutes in you realized this is the funeral of someone you've never met. Everyone thinks you knew them, and they're weeping.",
    secenekler: [
      {
        metin: "Keep up the act, keep mourning along.",
        ipucu: "Pull it off and it's a funny memory; fumble it and it's an awkward scene",
        basariliSonuc: {
          mesaj: "No one noticed a thing — someone even told you it was 'such a heartfelt goodbye.'",
        },
        basarisizSonuc: {
          mesaj: "You said the wrong name out loud and everyone turned to look. You slipped away in shame.",
        },
      },
      {
        metin: "Slip out quietly, without drawing attention.",
        ipucu: "A safe exit, with a small pang of guilt",
        basariliSonuc: {
          mesaj: "You vanished without anyone noticing; the whole thing became a fond little story.",
        },
        basarisizSonuc: {
          mesaj: "On your way out you knocked over a chair and drew every eye — the quiet exit wasn't so quiet.",
        },
      },
    ],
  },
  komik_kopekle_banyo: {
    baslik: "The Stubborn Dog",
    metin:
      "The neighbor's huge, mud-caked dog spotted you and is now bounding over, ready to leap. Run, or brace yourself?",
    secenekler: [
      {
        metin: "Wrestle the dog and try to get it under control.",
        ipucu: "Pull it off and you've made a friend; fail and you're a mess",
        basariliSonuc: {
          mesaj: "You calmed the dog down and seemingly made a new friend — it trotted beside you wagging its tail.",
        },
        basarisizSonuc: {
          mesaj: "The dog knocked you flat, your clothes covered in mud; the cleaning bill came out of your own pocket.",
        },
      },
      {
        metin: "Run for it, cross to the other side of the street.",
        ipucu: "Safe, but out of breath",
        basariliSonuc: {
          mesaj: "You just barely escaped; the dog found something else to chase.",
        },
        basarisizSonuc: {
          mesaj: "You tripped over a basket while fleeing — the dog took it as a game.",
        },
      },
    ],
  },
  komik_dedikodu_ikilemi: {
    baslik: "A Rumor Spreads",
    metin:
      "A half-joking remark you made has been exaggerated all over the market; everyone's telling a strange story about you now. Set the record straight, or let the story grow?",
    secenekler: [
      {
        metin: "Let the story grow, enjoy it.",
        ipucu: "Fun fame, or a hit to your credibility",
        basariliSonuc: {
          mesaj: "Everyone's talking about your 'legend' now — secretly, you kind of loved it.",
        },
        basarisizSonuc: {
          mesaj: "The exaggeration went too far, and someone accused you of lying outright.",
        },
      },
      {
        metin: "Set everyone straight with the truth.",
        ipucu: "Safe, but a tedious slog",
        basariliSonuc: {
          mesaj: "You told everyone the truth one by one; exhausting, but your conscience is clear.",
        },
        basarisizSonuc: {
          mesaj: "No one believed you — your 'correction' only made the story more colorful.",
        },
      },
    ],
  },
  komik_agir_tas_kaldirma: {
    baslik: "A Show of Strength",
    metin:
      "The young men in the square are offering a prize to whoever can lift a huge stone. It's heavier than it looks — and quite a crowd has gathered.",
    secenekler: [
      {
        metin: "Give it everything you've got.",
        ipucu: "Lift it and you get applause; fail and your back pays for it",
        basariliSonuc: {
          mesaj: "You finally hoisted the stone up — the crowd went wild, and the prize is yours.",
        },
        basarisizSonuc: {
          mesaj: "Your back seized up and the stone didn't budge; you struggled to bend for days after.",
        },
      },
      {
        metin: "Decline, say 'maybe another day.'",
        ipucu: "Safe, a small dent to your pride",
        basariliSonuc: {
          mesaj: "You shrugged it off; nobody made much of it.",
        },
        basarisizSonuc: {
          mesaj: "A few people goaded you, calling you 'weak'; you swallowed it and moved on.",
        },
      },
    ],
  },
  komik_kimlik_gizleme: {
    baslik: "The Fake Identity Prank",
    metin:
      "Your friends suggest slipping you into a group of strangers as a 'mysterious traveler' — just for fun. Playing the part takes some nerve.",
    secenekler: [
      {
        metin: "Take on the role, play the mysterious stranger.",
        ipucu: "Nail it and it's a legendary memory; blow it and it's embarrassing",
        basariliSonuc: {
          mesaj: "You played the part so well the group actually believed it — your friends were in stitches.",
        },
        basarisizSonuc: {
          mesaj: "One question tripped you up; everyone caught on to the joke, and a few felt a little hurt.",
        },
      },
      {
        metin: "Back out, introduce yourself as you are.",
        ipucu: "Safe, unremarkable",
        basariliSonuc: {
          mesaj: "An ordinary introduction — at least no one's feelings got hurt.",
        },
        basarisizSonuc: {
          mesaj: "Your friends teased you a bit for being a 'coward.'",
        },
      },
    ],
  },
  komik_beklenmedik_dans: {
    baslik: "An Unexpected Dance Invitation",
    metin:
      "At a celebration, a total stranger held out their hand and asked you to dance. Everyone's watching, and your feet are anything but a dancer's feet.",
    secenekler: [
      {
        metin: "Accept, try to find the rhythm.",
        ipucu: "Nail it and you get applause; miss it and there's laughter",
        basariliSonuc: {
          mesaj: "Against all odds you found the steps — a few people even started copying you.",
        },
        basarisizSonuc: {
          mesaj: "Your feet tangled up and you went down; the crowd roared with laughter.",
        },
      },
      {
        metin: "Politely decline.",
        ipucu: "Safe, but you come off a bit standoffish",
        basariliSonuc: {
          mesaj: "You smiled and declined; the person found someone else.",
        },
        basarisizSonuc: {
          mesaj: "Their insistence forced a sharp refusal, and things got a little tense.",
        },
      },
    ],
  },
  komik_hirsiz_yanlisligi: {
    baslik: "Mistaken for a Thief",
    metin:
      "While play-acting 'thief' with a friend as a joke, a real watchman mistook you for an actual thief and gave chase. Do you explain, or run?",
    secenekler: [
      {
        metin: "Stop and explain, laughing it off.",
        ipucu: "Convince him and it's a funny memory; fail and it's an annoying interrogation",
        basariliSonuc: {
          mesaj: "The watchman couldn't help laughing too, and warned you to be more careful next time.",
        },
        basarisizSonuc: {
          mesaj: "He didn't believe you and let you go with a small fine — your pride took the real hit.",
        },
      },
      {
        metin: "Run, don't let it become a bigger deal.",
        ipucu: "Escape and it's over; get caught and things get worse",
        basariliSonuc: {
          mesaj: "You lost him in the back alleys, out of breath but free.",
        },
        basarisizSonuc: {
          mesaj: "You got caught; running only made you look more suspicious.",
        },
      },
    ],
  },
  komik_yanlis_takma_sakal: {
    baslik: "The Fake Beard",
    metin:
      "At a small variety show, everyone's wearing ridiculous fake beards and mustaches. When it's your turn, do you grab the most absurd one and go on, or turn it down?",
    secenekler: [
      {
        metin: "Grab the most absurd one and go on stage.",
        ipucu: "A hit and you're the star of the show; a miss and you look ridiculous",
        basariliSonuc: {
          mesaj: "The crowd declared you the funniest moment of the show, and the applause found you.",
        },
        basarisizSonuc: {
          mesaj: "The beard stuck to your face and fell off at exactly the wrong moment — everyone laughed, but not with you.",
        },
      },
      {
        metin: "Politely decline, stay in the audience.",
        ipucu: "Safe, an ordinary evening",
        basariliSonuc: {
          mesaj: "You watched from the side and found the show entertaining enough as it was.",
        },
        basarisizSonuc: {
          mesaj: "Your friends teased you for being 'too uptight.'",
        },
      },
    ],
  },

  // ───────────────────────── MIDDLE AGES (25) ─────────────────────────
  komik_oc_turnuva_soytarisi: {
    baslik: "The Jester's Challenge at the Tournament",
    metin:
      "Before the knights' tournament, the court jester challenged you to a 'duel' with wooden swords — and a crowd is already gathering.",
    secenekler: [
      {
        metin: "Accept, duel him with the wooden sword.",
        ipucu: "Win and it's laughter and applause; lose and it's a ridiculous memory",
        basariliSonuc: {
          mesaj: "You beat the jester with the wooden sword and the crowd went wild, declaring you the tournament's 'warm-up star.'",
        },
        basarisizSonuc: {
          mesaj: "The jester floored you in three moves; for days you were mocked as the 'sword master.'",
        },
      },
      {
        metin: "Decline, focus on the tournament.",
        ipucu: "Keeps your dignity, but earns you a small 'boring' label",
        basariliSonuc: {
          mesaj: "The jester shrugged and found someone else while you stayed focused on the tournament.",
        },
        basarisizSonuc: {
          mesaj: "The jester loudly introduced you as a 'cowardly knight-hopeful' — a bit annoying.",
        },
      },
    ],
  },
  komik_oc_manastir_bira_kacirma: {
    baslik: "The Monastery's Secret Beer",
    metin:
      "A barrel of the monks' own private beer sits forgotten in the corner of the cellar. With no one around, filling a mug is awfully tempting.",
    secenekler: [
      {
        metin: "Quietly fill a mug.",
        ipucu: "Get away with it and it's a tasty memory; get caught and it costs you conscience and reputation",
        basariliSonuc: {
          mesaj: "The beer was excellent — no one noticed, and your secret is safe.",
        },
        basarisizSonuc: {
          mesaj: "The abbot caught you red-handed at the mug; you spent days sweeping the church courtyard.",
        },
      },
      {
        metin: "Give it up, stay away from the cellar.",
        ipucu: "Safe, though a small curiosity lingers",
        basariliSonuc: {
          mesaj: "You resisted the temptation and kept a clear conscience.",
        },
        basarisizSonuc: {
          mesaj: "You spent the whole day thinking about the smell of that beer.",
        },
      },
    ],
  },
  komik_oc_sato_hendegi: {
    baslik: "The Moat-Jumping Bet",
    metin:
      "You've made a bet that you can leap the castle's dry moat in one bound. It's wider than it looks — and the bottom isn't soft at all.",
    secenekler: [
      {
        metin: "Back up, take a run at it.",
        ipucu: "Land it and you're a legend; fall short and you're covered in mud",
        basariliSonuc: {
          mesaj: "You landed right on the edge! The crowd screamed with applause and you won the bet.",
        },
        basarisizSonuc: {
          mesaj: "You landed in the middle, and it took you ten minutes to climb out of the mud.",
        },
      },
      {
        metin: "Turn down the bet.",
        ipucu: "Safe, though you'll be teased a bit",
        basariliSonuc: {
          mesaj: "'You're the smart one,' someone said, and you tried to believe it.",
        },
        basarisizSonuc: {
          mesaj: "The nickname 'coward' stuck around for a while.",
        },
      },
    ],
  },
  komik_oc_kral_taklidi: {
    baslik: "Impersonating the King",
    metin:
      "Your slightly drunk friends at the tavern are egging you on to climb a wooden podium and mimic the king's speaking style. They say the walls have ears.",
    secenekler: [
      {
        metin: "Do the impression, make everyone laugh.",
        ipucu: "Land the joke and you're a legend; someone takes it seriously and you're in trouble",
        basariliSonuc: {
          mesaj: "Your impression was so good the tavern erupted — some even said you sounded as 'stately' as the king himself.",
        },
        basarisizSonuc: {
          mesaj: "A snitch's ear caught wind of it, and you came close to being reported for 'disrespect.'",
        },
      },
      {
        metin: "Decline, step down from the podium.",
        ipucu: "Safe, but you miss the fun",
        basariliSonuc: {
          mesaj: "You stepped down and sat back; your friends called you 'crazy' but it passed harmlessly.",
        },
        basarisizSonuc: {
          mesaj: "They kept pushing and shoving, and you stormed off, irritated.",
        },
      },
    ],
  },
  komik_oc_falci_kadin: {
    baslik: "The Village Fortune Teller's Prophecy",
    metin:
      "The village fortune teller took your hand, looked into your eyes, and said with total seriousness: 'A donkey will bring you great misfortune!' Now the whole village seems to be keeping its donkeys away from you.",
    secenekler: [
      {
        metin: "Ignore the prophecy, keep working around donkeys as usual.",
        ipucu: "Could be an empty prophecy, or a direct hit",
        basariliSonuc: {
          mesaj: "Nothing happened — the prophecy turned out empty, and the villagers started calling you 'brave.'",
        },
        basarisizSonuc: {
          mesaj: "A donkey kicked you — exactly as the fortune teller said. The village believes in her even more now.",
        },
      },
      {
        metin: "Take it seriously, avoid donkeys for days.",
        ipucu: "Safe, but a comically nervous stretch",
        basariliSonuc: {
          mesaj: "You never went near a donkey and stayed safe, though everyone found you a bit odd.",
        },
        basarisizSonuc: {
          mesaj: "While fleeing from a donkey cart, you tripped and fell in front of everyone — not because of the prophecy, but pure fear.",
        },
      },
    ],
  },
  komik_oc_zirh_denemesi: {
    baslik: "Borrowed Armor",
    metin:
      "A soldier friend let you try on his full suit of armor. It's heavier than you expected — even standing up straight is a struggle.",
    secenekler: [
      {
        metin: "Try to take a few steps in the armor.",
        ipucu: "Pull it off and you look impressive; fail and you go down",
        basariliSonuc: {
          mesaj: "Wobbling but upright, you managed a few steps, and the onlookers were impressed.",
        },
        basarisizSonuc: {
          mesaj: "You toppled on the second step, the armor crashing down on top of you — it took two people to get you back up.",
        },
      },
      {
        metin: "Just wear it, don't move.",
        ipucu: "Safe, but no show to speak of",
        basariliSonuc: {
          mesaj: "You felt the weight of the armor and took it off safely.",
        },
        basarisizSonuc: {
          mesaj: "A strap caught your hand while taking it off, leaving a small scratch.",
        },
      },
    ],
  },
  komik_oc_ejderha_kemigi_satisi: {
    baslik: "The Fake Dragon Bone",
    metin:
      "A traveling peddler is trying to sell you an ox bone as a 'real dragon bone' — and now you're thinking of pulling the same trick on someone else.",
    secenekler: [
      {
        metin: "Buy the bone and resell it as a 'dragon bone.'",
        ipucu: "Convince someone and it's easy money; get exposed and it stains your name",
        basariliSonuc: {
          mesaj: "You sold it to a gullible traveler for three times the price — your conscience twinged a little, but your purse is full.",
        },
        basarisizSonuc: {
          mesaj: "The buyer showed the bone to a butcher, who recognized it; the nickname 'con artist' stuck around for a while.",
        },
      },
      {
        metin: "Tell the peddler you're onto his trick and don't buy it.",
        ipucu: "Safe and honest, but you leave empty-handed",
        basariliSonuc: {
          mesaj: "The peddler scowled, but you walked away with a clear conscience.",
        },
        basarisizSonuc: {
          mesaj: "The peddler sneered at you as 'tasteless,' which stung a little.",
        },
      },
    ],
  },
  komik_oc_hamamda_karisiklik: {
    baslik: "Mixed-Up Clothes at the Bathhouse",
    metin:
      "Leaving the bathhouse, you realize some of your clothes got mixed up with someone else's — and that person is still inside, impatiently looking for their things.",
    secenekler: [
      {
        metin: "Go explain the mix-up and swap the clothes.",
        ipucu: "Taken well, it's a funny memory; taken badly, it's embarrassing",
        basariliSonuc: {
          mesaj: "The other person laughed too, and you swapped clothes with a grin — you even made a new acquaintance.",
        },
        basarisizSonuc: {
          mesaj: "The man got angry and shouted at you in front of everyone as you left the bathhouse.",
        },
      },
      {
        metin: "Act like you noticed nothing and just leave.",
        ipucu: "Risky, but at least there's no confrontation",
        basariliSonuc: {
          mesaj: "No one noticed, and you breathed a sigh of relief.",
        },
        basarisizSonuc: {
          mesaj: "The man chased you down and caught you in front of everyone, shouting 'thief.'",
        },
      },
    ],
  },
  komik_oc_sahin_kacagi: {
    baslik: "The Noble's Escaped Falcon",
    metin:
      "A nobleman's hunting falcon slipped off his arm and perched in a tree — right above where you're standing. He's panicking and promises a reward if you bring it back.",
    secenekler: [
      {
        metin: "Climb the tree and try to catch the falcon.",
        ipucu: "Catch it and there's a nice reward; fail and its talons find you too",
        basariliSonuc: {
          mesaj: "You caught the falcon gently in your hand, and the nobleman gratefully filled your pocket.",
        },
        basarisizSonuc: {
          mesaj: "The falcon pecked your hand and you scrambled down the tree, hurt in both hands and pride.",
        },
      },
      {
        metin: "Watch from a distance, don't get involved.",
        ipucu: "Safe, no reward",
        basariliSonuc: {
          mesaj: "The nobleman's servants caught the falcon while you stayed a spectator.",
        },
        basarisizSonuc: {
          mesaj: "The nobleman shot you a dirty look, muttering 'you could have helped.'",
        },
      },
    ],
  },
  komik_oc_yemin_toreni_karisikligi: {
    baslik: "The Muddled Oath",
    metin:
      "You're asked to recite an oath of loyalty at a small ceremony, but just as your turn comes, you realize you never memorized the text — and the crowd is waiting.",
    secenekler: [
      {
        metin: "Improvise, speak with total confidence.",
        ipucu: "Sound convincing and no one notices; fumble it and everyone laughs",
        basariliSonuc: {
          mesaj: "Your improvised lines sounded so solid that no one even remembered the actual text.",
        },
        basarisizSonuc: {
          mesaj: "Your sentences tangled up, and a few people bit their lips to keep from laughing.",
        },
      },
      {
        metin: "Pause, ask someone for the text, wait a moment.",
        ipucu: "Safe, but it makes the scene a little awkward",
        basariliSonuc: {
          mesaj: "After a brief silence you read the correct text, and no one made much of it.",
        },
        basarisizSonuc: {
          mesaj: "The ceremony's mood soured during the wait, and a few people shifted uncomfortably.",
        },
      },
    ],
  },
  komik_oc_dilenci_kiligi_bahsi: {
    baslik: "The Beggar Disguise Bet",
    metin:
      "Your friends bet you can't dress as a beggar and collect a decent amount of alms in the square in a single day. Your pride takes a hit, but your purse might fill up.",
    secenekler: [
      {
        metin: "Put on the disguise, collect alms in the square.",
        ipucu: "Play it well and your purse fills up; get recognized and your pride is crushed",
        basariliSonuc: {
          mesaj: "You turned out to be a surprisingly convincing 'beggar' — your purse filled to the brim.",
        },
        basarisizSonuc: {
          mesaj: "Someone who knew you recognized you and told everyone; you were the talk of the town for days.",
        },
      },
      {
        metin: "Turn down the bet.",
        ipucu: "Safe, your pride stays intact",
        basariliSonuc: {
          mesaj: "Your friends were disappointed but respected the decision.",
        },
        basarisizSonuc: {
          mesaj: "They teased you a bit for being a 'coward.'",
        },
      },
    ],
  },
  komik_oc_ozan_yarismasi: {
    baslik: "The Minstrels' Contest",
    metin:
      "A last-minute spot opened up in the fair's minstrel contest. Your poetic talent is questionable, but the winner gets a fine prize.",
    secenekler: [
      {
        metin: "Get on stage and improvise a poem.",
        ipucu: "Land it and there's a prize; miss it and you might as well be pelted with tomatoes",
        basariliSonuc: {
          mesaj: "Your improvisation stunned everyone, and the judges declared you the winner.",
        },
        basarisizSonuc: {
          mesaj: "The rhymes didn't land, and the crowd politely smiled and applauded someone else instead.",
        },
      },
      {
        metin: "Give it up, stay in the audience.",
        ipucu: "Safe, no prize",
        basariliSonuc: {
          mesaj: "You enjoyed watching the contest, with nothing to prove to anyone.",
        },
        basarisizSonuc: {
          mesaj: "A pang of regret hit you — 'should I have tried?' you kept wondering.",
        },
      },
    ],
  },
  komik_oc_kutsal_su_satisi: {
    baslik: "The Fake Holy Water",
    metin:
      "A swindler is trying to sell you ordinary well water as 'holy spring water' — and now you're thinking about buying a bottle and reselling it yourself.",
    secenekler: [
      {
        metin: "Buy the bottle and resell it to someone else.",
        ipucu: "Easy money, or a risk of getting caught",
        basariliSonuc: {
          mesaj: "You sold it to a believer for three times the price — your conscience twinged a little, but your purse got heavier.",
        },
        basarisizSonuc: {
          mesaj: "The buyer drank it, got sick, and came looking for answers.",
        },
      },
      {
        metin: "Expose the swindler instead of buying.",
        ipucu: "Safe and honest, but no free applause",
        basariliSonuc: {
          mesaj: "The crowd chased the swindler off, calling you an 'honest man.'",
        },
        basarisizSonuc: {
          mesaj: "The swindler got away, and no one even thanked you.",
        },
      },
    ],
  },
  komik_oc_kacak_at_yarisi: {
    baslik: "The Illegal Midnight Horse Race",
    metin:
      "An illegal midnight horse race gives you a chance to place a bet. The payout is good, but getting caught means real trouble.",
    secenekler: [
      {
        metin: "Place the bet, watch the race.",
        ipucu: "Win and there's good money; a raid means a criminal mark",
        basariliSonuc: {
          mesaj: "You won the bet and your purse got heavier — but people around took note of you.",
        },
        basarisizSonuc: {
          mesaj: "You lost the money, and an informant spotted you on top of it.",
        },
      },
      {
        metin: "Stay away, go home.",
        ipucu: "Safe, a dull night",
        basariliSonuc: {
          mesaj: "You spent a quiet night at home, wondering about the excitement you'd missed.",
        },
        basarisizSonuc: {
          mesaj: "The next day, hearing about everyone's winnings gnawed at you a little.",
        },
      },
    ],
  },
  komik_oc_soytari_yerine_gecme: {
    baslik: "Filling In for the Sick Jester",
    metin:
      "When the jester hired for the feast suddenly falls ill, the panicked host asks you to take his place. The crowd is already lined up waiting.",
    secenekler: [
      {
        metin: "Accept, improvise some jokes.",
        ipucu: "Land it and it's a great night; miss it and there's an awkward silence",
        basariliSonuc: {
          mesaj: "Your improvisation landed so well everyone thought you were a real jester; the host paid you generously.",
        },
        basarisizSonuc: {
          mesaj: "Your jokes were met with silence; a dead quiet filled the room.",
        },
      },
      {
        metin: "Decline, help them find someone else.",
        ipucu: "Safe, but you miss the opportunity",
        basariliSonuc: {
          mesaj: "You helped find another entertainer, and everyone relaxed.",
        },
        basarisizSonuc: {
          mesaj: "No one could be found, and the feast fell a bit flat — the host gave you a resentful look.",
        },
      },
    ],
  },
  komik_oc_deniz_canavari_soylentisi: {
    baslik: "The Sea Monster Rumor",
    metin:
      "Everyone in the coastal village is talking about a 'sea monster' in the bay. Some say it's a giant fish, others an old shipwreck. Go take a look, or stay away?",
    secenekler: [
      {
        metin: "Take a boat out to the bay and find out the truth.",
        ipucu: "Solve it and you gain fame; fail and you're just a soggy disappointment",
        basariliSonuc: {
          mesaj: "The 'monster' turned out to be a beached whale carcass — the village thanked you.",
        },
        basarisizSonuc: {
          mesaj: "The boat capsized; soaked and empty-handed, you couldn't find the 'monster.'",
        },
      },
      {
        metin: "Believe the rumor, stay away.",
        ipucu: "Safe, but the mystery stays unsolved",
        basariliSonuc: {
          mesaj: "Like the other villagers, you kept your distance — the mystery remained a mystery.",
        },
        basarisizSonuc: {
          mesaj: "The children teased you a bit for being 'scared.'",
        },
      },
    ],
  },
  komik_oc_kilise_cani_sakasi: {
    baslik: "The Church Bell Prank",
    metin:
      "Your friends floated the idea of ringing the church bell at midnight to panic the whole village awake — 'just once,' they say.",
    secenekler: [
      {
        metin: "Ring the bell, run.",
        ipucu: "Get away with it and it's a legendary night's memory; get caught and it's a serious scolding",
        basariliSonuc: {
          mesaj: "The whole village burst outside in a panic while you watched from behind the bushes, roaring with laughter.",
        },
        basarisizSonuc: {
          mesaj: "The priest caught you red-handed; you spent days cleaning the church courtyard.",
        },
      },
      {
        metin: "Talk your friends out of it too.",
        ipucu: "Safe, though you'll get a bit of a 'boring' label",
        basariliSonuc: {
          mesaj: "Your friends were disappointed, but no one got into trouble.",
        },
        basarisizSonuc: {
          mesaj: "Your friends did the prank without you — you were left out.",
        },
      },
    ],
  },
  komik_oc_haci_kilik_degistirme: {
    baslik: "Dressing as a Pilgrim",
    metin:
      "At an inn, you noticed that travelers dressed as pilgrims get free food and lodging. With little money on you, the disguise is tempting.",
    secenekler: [
      {
        metin: "Dress as a pilgrim, try for free lodging.",
        ipucu: "Convince them and you eat for free; get exposed and your reputation takes a hit",
        basariliSonuc: {
          mesaj: "The innkeeper took you for a real pilgrim and hosted you well — your stomach is full, your conscience a little uneasy.",
        },
        basarisizSonuc: {
          mesaj: "The innkeeper questioned you and you fumbled the answers, thrown out in front of everyone.",
        },
      },
      {
        metin: "Pay honestly for what you can.",
        ipucu: "Safe, a clear conscience but a light purse",
        basariliSonuc: {
          mesaj: "You paid honestly despite having little money and spent the night in peace.",
        },
        basarisizSonuc: {
          mesaj: "You didn't have quite enough and paid short, a little embarrassed.",
        },
      },
    ],
  },
  komik_oc_esek_pazarligi: {
    baslik: "Haggling Over a Donkey",
    metin:
      "A merchant at the market is trying to sell you a 'young and strong' donkey, but there's a strange weariness in the animal's eyes. Buy it, or haggle harder?",
    secenekler: [
      {
        metin: "Haggle hard, drive the price down.",
        ipucu: "Succeed and you come out ahead; push too hard and the merchant turns on you",
        basariliSonuc: {
          mesaj: "You cut the price in half, and the merchant grudgingly accepted.",
        },
        basarisizSonuc: {
          mesaj: "The merchant got annoyed, cut off the haggling, and sold the donkey to someone else right in front of you.",
        },
      },
      {
        metin: "Pay the asking price, don't argue.",
        ipucu: "Safe, but you overpay",
        basariliSonuc: {
          mesaj: "You bought the donkey, but three days later it turned out not to be so 'young' after all.",
        },
        basarisizSonuc: {
          mesaj: "The donkey refused to walk before you'd even left the inn — the money's gone, and the donkey's going nowhere.",
        },
      },
    ],
  },
  komik_oc_kokusu_cikan_peynir: {
    baslik: "The Wildly Pungent Cheese Bet",
    metin:
      "A piece of the village's most 'mature' cheese has been put on the table, and its smell has already filled the room. Whoever finishes a slice wins a bottle of wine.",
    secenekler: [
      {
        metin: "Eat a slice, hold your breath.",
        ipucu: "Swallow it and you win the wine; your stomach might fight back",
        basariliSonuc: {
          mesaj: "You barely got it down, but you won the wine — the crowd applauded.",
        },
        basarisizSonuc: {
          mesaj: "You gave up after one bite, and your stomach took a while to recover.",
        },
      },
      {
        metin: "Politely decline.",
        ipucu: "Safe, no wine",
        basariliSonuc: {
          mesaj: "You declined comfortably, and everyone was understanding.",
        },
        basarisizSonuc: {
          mesaj: "They teased you a bit for being 'delicate.'",
        },
      },
    ],
  },
  komik_oc_yel_degirmeninde_mahsur: {
    baslik: "Trapped in the Windmill",
    metin:
      "The windmill you wandered into out of curiosity suddenly started turning in the wind and pinned you inside. Force the door, or shout for help?",
    secenekler: [
      {
        metin: "Try to slip out between the sails.",
        ipucu: "Pull it off and you're out fast; miss it and you get hurt",
        basariliSonuc: {
          mesaj: "You slipped out just in time — dusty, but in one piece.",
        },
        basarisizSonuc: {
          mesaj: "A sail clipped your shoulder, and you spent a few days sore.",
        },
      },
      {
        metin: "Shout for help, wait.",
        ipucu: "Safe, but embarrassing",
        basariliSonuc: {
          mesaj: "The miller came and opened the door; the village started calling you 'the man who got stuck in the mill.'",
        },
        basarisizSonuc: {
          mesaj: "No one heard you, and you had to wait a good while for the wind to die down.",
        },
      },
    ],
  },
  komik_oc_soylu_papagan_taklidi: {
    baslik: "The Nobleman's Talking Crow",
    metin:
      "A nobleman's trained crow keeps repeating your nickname, making everyone laugh. Teach it something new to escalate the joke, or quietly walk away?",
    secenekler: [
      {
        metin: "Teach the crow something even funnier.",
        ipucu: "Land it and everyone loves you; miss it and the nobleman gets angry",
        basariliSonuc: {
          mesaj: "The crow picked up the new phrase and had everyone in stitches — even the nobleman couldn't help laughing.",
        },
        basarisizSonuc: {
          mesaj: "The crow said what you taught it at the worst possible moment — right in front of the nobleman's guests.",
        },
      },
      {
        metin: "Walk away, don't get involved.",
        ipucu: "Safe, unremarkable",
        basariliSonuc: {
          mesaj: "The crow started repeating someone else's nickname, and you relaxed.",
        },
        basarisizSonuc: {
          mesaj: "The crow kept shouting your nickname anyway — walking away didn't help.",
        },
      },
    ],
  },
  komik_oc_kutsal_emanet_taklidi: {
    baslik: "The Fake Holy Relic Offer",
    metin:
      "A merchant is selling an ordinary bone as 'the finger bone of a saint' and now proposes a partnership: you sell it to the village's wealthiest man.",
    secenekler: [
      {
        metin: "Accept the offer, try to sell the bone.",
        ipucu: "Convince him and it's big money; get exposed and it's a serious hit to your reputation",
        basariliSonuc: {
          mesaj: "The wealthy villager bought the bone in an elaborate ceremony — your conscience is heavier, but so is your purse.",
        },
        basarisizSonuc: {
          mesaj: "A monk examined the bone and saw through the fake; you were humiliated in the village square.",
        },
      },
      {
        metin: "Refuse the offer, report the merchant.",
        ipucu: "Safe and honest, but you make an enemy of the merchant",
        basariliSonuc: {
          mesaj: "The merchant was driven out of the village, and you were praised for your honesty.",
        },
        basarisizSonuc: {
          mesaj: "Hardly anyone listened to you, and the merchant carried on his business in another village.",
        },
      },
    ],
  },
  komik_oc_kutsal_relik_kuyrugu: {
    baslik: "The Long Relic Line",
    metin:
      "You've been waiting in line for hours to see a holy relic. The man in front keeps shoving to hold his spot.",
    secenekler: [
      {
        metin: "Try to push forward, get into the shoving match.",
        ipucu: "Push forward and you save time; start a fight and you're thrown out",
        basariliSonuc: {
          mesaj: "You slipped forward skillfully and are now first in line to see the relic.",
        },
        basarisizSonuc: {
          mesaj: "The shoving escalated, and the guards threw both of you out of the line.",
        },
      },
      {
        metin: "Wait patiently for your turn.",
        ipucu: "Safe, but long and tedious",
        basariliSonuc: {
          mesaj: "After hours of waiting, you saw the relic in peace.",
        },
        basarisizSonuc: {
          mesaj: "The gates closed just as it was finally your turn — it'll have to wait until tomorrow.",
        },
      },
    ],
  },
  komik_oc_soytari_elbisesi_calinti: {
    baslik: "The Stolen Jester Costume",
    metin:
      "While walking around in a colorful jester costume you wore as a joke, the actual court jester spotted you and started shouting 'did you steal my costume?' — everyone's watching.",
    secenekler: [
      {
        metin: "Explain it was a joke and put on a funny show.",
        ipucu: "Convince him and you both laugh; fail and the scene turns into a fight",
        basariliSonuc: {
          mesaj: "The two of you improvised a show together, and the crowd loved it.",
        },
        basarisizSonuc: {
          mesaj: "The jester demanded the costume back, and you had to undress in front of everyone.",
        },
      },
      {
        metin: "Apologize and hand the costume over right away.",
        ipucu: "Safe, but a bit embarrassing",
        basariliSonuc: {
          mesaj: "You handed it over, the jester calmed down, and the matter was closed.",
        },
        basarisizSonuc: {
          mesaj: "You fumbled while taking the costume off and fell, and the crowd laughed.",
        },
      },
    ],
  },

  // ───────────────────────── INDUSTRIAL REVOLUTION (25) ─────────────────────────
  komik_sd_fabrika_hiz_bahsi: {
    baslik: "Racing the Machine",
    metin:
      "The factory workers are arguing over whether a person could ever beat the speed of the new steam machine. It's your turn now, and everyone's watching.",
    secenekler: [
      {
        metin: "Take on the machine in a race.",
        ipucu: "Win and you're a legend; lose and you're wrecked",
        basariliSonuc: {
          mesaj: "Unbelievable — you beat the machine! The factory talked about it for days.",
        },
        basarisizSonuc: {
          mesaj: "The machine crushed you badly, leaving your arms aching for days.",
        },
      },
      {
        metin: "Decline, get back to work.",
        ipucu: "Safe, no fanfare",
        basariliSonuc: {
          mesaj: "You went back to work, and people thought it a sensible choice.",
        },
        basarisizSonuc: {
          mesaj: "A few workers goaded you, calling you a 'coward.'",
        },
      },
    ],
  },
  komik_sd_balon_ucusu: {
    baslik: "The Hot Air Balloon Offer",
    metin:
      "A traveling inventor is offering you a short flight in his new invention, the hot air balloon — 'completely safe,' he says, though his voice doesn't sound so sure.",
    secenekler: [
      {
        metin: "Climb aboard and try the flight.",
        ipucu: "Go well and it's an unforgettable memory; go badly and it's a rough landing",
        basariliSonuc: {
          mesaj: "You saw the city from above! When you landed, everyone welcomed you as a 'sky traveler.'",
        },
        basarisizSonuc: {
          mesaj: "The balloon suddenly dropped, and the basket scraped hard against a rooftop on the way down.",
        },
      },
      {
        metin: "Politely decline the offer.",
        ipucu: "Safe, but you miss the sky",
        basariliSonuc: {
          mesaj: "You chose to stay on the ground, and the inventor found someone else.",
        },
        basarisizSonuc: {
          mesaj: "Watching the flight, a bit of regret stayed with you.",
        },
      },
    ],
  },
  komik_sd_foto_studyosu_pozu: {
    baslik: "The New Photography Camera",
    metin:
      "A newly opened photography studio in town is offering a free trial shot, but 'holding still' takes far longer than expected — the slightest twitch blurs the whole photo.",
    secenekler: [
      {
        metin: "Strike a serious pose and don't move.",
        ipucu: "Succeed and it's a fine keepsake; twitch and the photo turns out ridiculous",
        basariliSonuc: {
          mesaj: "A magnificent photo came out — you had it framed and hung it at home.",
        },
        basarisizSonuc: {
          mesaj: "You itched at exactly the wrong moment, coming out as a blurry ghost — and you couldn't get your money back either.",
        },
      },
      {
        metin: "Pose with a funny face.",
        ipucu: "Land it and everyone laughs; miss it and the photographer gets annoyed",
        basariliSonuc: {
          mesaj: "Even the photographer couldn't help laughing, and hung the photo in his shop window.",
        },
        basarisizSonuc: {
          mesaj: "The photographer said you ruined his 'serious art' and charged you extra.",
        },
      },
    ],
  },
  komik_sd_tren_at_arabasi_yarisi: {
    baslik: "Train or Carriage?",
    metin:
      "At the station, someone made a serious bet that a horse carriage could outrun the new train. You could put a small bet down on either side.",
    secenekler: [
      {
        metin: "Bet on the train winning.",
        ipucu: "A sensible bet, but not a guaranteed one",
        basariliSonuc: {
          mesaj: "The train won comfortably, and you pocketed the bet.",
        },
        basarisizSonuc: {
          mesaj: "The train broke down on the way, and the carriage rolled past laughing.",
        },
      },
      {
        metin: "Bet on the carriage — 'don't trust newfangled things.'",
        ipucu: "A low chance, but a good payout if you're right",
        basariliSonuc: {
          mesaj: "The train really did break down! Everyone was stunned, and you came out ahead.",
        },
        basarisizSonuc: {
          mesaj: "The train won easily, and they teased you a bit for being 'old-fashioned.'",
        },
      },
    ],
  },
  komik_sd_sirk_gosterisi_daveti: {
    baslik: "The Traveling Circus Invitation",
    metin:
      "The owner of a circus that just arrived in town says he needs a volunteer for his show and calls you up on stage — you'll be assisting with the fire-eating act.",
    secenekler: [
      {
        metin: "Go on stage and help with the act.",
        ipucu: "Go well and it's applause; go badly and it's a small burn",
        basariliSonuc: {
          mesaj: "The act went flawlessly, and the crowd gave you a standing ovation.",
        },
        basarisizSonuc: {
          mesaj: "A spark landed on your arm, and the show had to stop halfway through.",
        },
      },
      {
        metin: "Politely decline, stay in the audience.",
        ipucu: "Safe, an ordinary evening",
        basariliSonuc: {
          mesaj: "The circus owner found someone else, and you enjoyed watching.",
        },
        basarisizSonuc: {
          mesaj: "They teased you a bit for being a 'coward.'",
        },
      },
    ],
  },
  komik_sd_gazeteye_yalan_haber: {
    baslik: "An Exaggerated Story for the Paper",
    metin:
      "A local newspaper reporter wants a dramatic story from you. Your real story is unremarkable, but with a little exaggeration it could make the front page.",
    secenekler: [
      {
        metin: "Embellish the story, make the headline.",
        ipucu: "Land it and you gain fame; get exposed and you lose credibility",
        basariliSonuc: {
          mesaj: "The story made the front page and everyone's talking about you — you even got a small writer's fee.",
        },
        basarisizSonuc: {
          mesaj: "A reader proved the story false, and the paper apologized — you were humiliated.",
        },
      },
      {
        metin: "Tell your real, ordinary story.",
        ipucu: "Safe and honest, but a dull piece",
        basariliSonuc: {
          mesaj: "The story ran in a small corner, and hardly anyone cared — but you were honest.",
        },
        basarisizSonuc: {
          mesaj: "The reporter found your story 'too boring' and never ran it.",
        },
      },
    ],
  },
  komik_sd_muzikli_kutu_denemesi: {
    baslik: "The New Musical Box",
    metin:
      "A shop window has a newly invented musical box (a forerunner of the gramophone) on display, and the shopkeeper invites you to turn the crank and try it — a crowd has already gathered to watch.",
    secenekler: [
      {
        metin: "Turn the crank, dance along.",
        ipucu: "Land it and it's a fun moment; miss it and you break the crank",
        basariliSonuc: {
          mesaj: "As the music played you got swept up in it, and a few people started dancing along.",
        },
        basarisizSonuc: {
          mesaj: "You turned the crank too hard and jammed the mechanism, and had to pay the shopkeeper for the damage.",
        },
      },
      {
        metin: "Watch from a distance, don't touch it.",
        ipucu: "Safe, unremarkable",
        basariliSonuc: {
          mesaj: "You enjoyed the music without causing anyone any trouble.",
        },
        basarisizSonuc: {
          mesaj: "The shopkeeper kept pressing you to 'try it out,' which got a bit annoying.",
        },
      },
    ],
  },
  komik_sd_sahte_grev_sakasi: {
    baslik: "The Fake Strike Prank",
    metin:
      "Your coworkers suggest scaring the boss with a joke — shouting that a mass strike is starting — just to stir up a few minutes of chaos.",
    secenekler: [
      {
        metin: "Join in, shout along with everyone.",
        ipucu: "A fun memory, or serious friction with the boss",
        basariliSonuc: {
          mesaj: "The boss panicked at first, then burst out laughing once he realized it was a joke.",
        },
        basarisizSonuc: {
          mesaj: "The boss took it seriously and launched a real investigation — your name landed on the blacklist.",
        },
      },
      {
        metin: "Don't join in, get back to work.",
        ipucu: "Safe, but you miss the fun",
        basariliSonuc: {
          mesaj: "You stayed out of it, and the whole thing blew over quickly.",
        },
        basarisizSonuc: {
          mesaj: "Your coworkers teased you a bit for being a 'wet blanket.'",
        },
      },
    ],
  },
  komik_sd_telgraf_yanlisligi: {
    baslik: "The Telegraph Mix-Up",
    metin:
      "The telegraph clerk garbled your message — now the other party is expecting something you never meant at all. Fix it, or let it ride?",
    secenekler: [
      {
        metin: "Send a new telegraph to fix the mix-up.",
        ipucu: "An extra cost, but things get straightened out",
        basariliSonuc: {
          mesaj: "You cleared up the confusion, and the other party was understanding — it cost you a little.",
        },
        basarisizSonuc: {
          mesaj: "The second telegraph got garbled too, and things got even more tangled.",
        },
      },
      {
        metin: "Leave it as it is, see what happens.",
        ipucu: "A gamble — could go either way",
        basariliSonuc: {
          mesaj: "The mix-up worked out in your favor by pure luck, bringing an unexpected gain.",
        },
        basarisizSonuc: {
          mesaj: "The other party refused to do business, and people started calling you 'unreliable.'",
        },
      },
    ],
  },
  komik_sd_lokomotif_iskele_pozu: {
    baslik: "Posing in Front of the Locomotive",
    metin:
      "Your friends at the station want you to strike a 'bold pose' right in front of the massive, stationary locomotive — just as the train is about to depart.",
    secenekler: [
      {
        metin: "Step forward, strike a bold pose.",
        ipucu: "A great photo if it goes well; a dangerous dash if it doesn't",
        basariliSonuc: {
          mesaj: "The photo taken right as the whistle blew became legendary, and everyone wanted a copy.",
        },
        basarisizSonuc: {
          mesaj: "The train left earlier than expected, and you threw yourself clear at the last second, heart pounding.",
        },
      },
      {
        metin: "Pose from a safe distance.",
        ipucu: "Safe, but an unremarkable photo",
        basariliSonuc: {
          mesaj: "It turned out an ordinary but safe keepsake photo.",
        },
        basarisizSonuc: {
          mesaj: "Your friends teased you a bit for being a 'coward.'",
        },
      },
    ],
  },
  komik_sd_sokak_satici_taklidi: {
    baslik: "Impersonating a Street Vendor",
    metin:
      "For a laugh, you started mimicking a street vendor's exaggerated hawking style — and a few curious passersby actually gathered, wanting to buy something.",
    secenekler: [
      {
        metin: "Keep up the act, 'sell' your odds and ends.",
        ipucu: "Go well and you earn real money; get found out and it's embarrassing",
        basariliSonuc: {
          mesaj: "The joke turned into a real sale, and unexpected money landed in your pocket.",
        },
        basarisizSonuc: {
          mesaj: "The real vendor showed up and scolded you, and the customers scattered.",
        },
      },
      {
        metin: "End the joke, apologize.",
        ipucu: "Safe, no profit",
        basariliSonuc: {
          mesaj: "Everyone laughed, and you slipped away embarrassed but unharmed.",
        },
        basarisizSonuc: {
          mesaj: "A few customers got annoyed, thinking they'd been tricked.",
        },
      },
    ],
  },
  komik_sd_bisiklet_yarisi: {
    baslik: "The New-Fangled Bicycle Race",
    metin:
      "A small race is being organized with the newly arrived 'iron horses,' or bicycles. You've never ridden one, but the excitement is contagious.",
    secenekler: [
      {
        metin: "Hop on a bicycle and join the race.",
        ipucu: "Win and it's fame; fall and you're bruised",
        basariliSonuc: {
          mesaj: "Wobbly the whole way, but you were the first to cross the finish line!",
        },
        basarisizSonuc: {
          mesaj: "You never found your balance and fell three times — your knees ached for weeks.",
        },
      },
      {
        metin: "Watch from the sidelines, place a bet instead.",
        ipucu: "Safer, but less thrilling",
        basariliSonuc: {
          mesaj: "You bet on the right rider and made a small profit.",
        },
        basarisizSonuc: {
          mesaj: "You lost the bet — at least it was your purse and not your knees.",
        },
      },
    ],
  },
  komik_sd_muzedeki_heykel_taklidi: {
    baslik: "Mimicking the Museum Statue",
    metin:
      "You want to imitate the pose of a famous statue at the newly opened museum to make your friends laugh — but the attendant seems to be watching.",
    secenekler: [
      {
        metin: "Climb up on the pedestal, imitate the pose.",
        ipucu: "The attendant misses it and it's fun; he catches you and there's a scolding",
        basariliSonuc: {
          mesaj: "Your friends were in stitches, and the attendant didn't even notice.",
        },
        basarisizSonuc: {
          mesaj: "The attendant pulled you down off the pedestal and warned you in front of everyone.",
        },
      },
      {
        metin: "Skip it, just look at the statues.",
        ipucu: "Safe, an ordinary museum visit",
        basariliSonuc: {
          mesaj: "You calmly toured the statues — you didn't make anyone laugh, but you stayed out of trouble too.",
        },
        basarisizSonuc: {
          mesaj: "Your friends teased you a bit for being 'boring.'",
        },
      },
    ],
  },
  komik_sd_elektrik_deneyi_gonulluluk: {
    baslik: "Volunteering for the Electricity Experiment",
    metin:
      "A curious scientist is demonstrating a new electricity experiment in the square: 'Whoever touches this wire will see how their hair stands on end!' He's looking for a volunteer.",
    secenekler: [
      {
        metin: "Volunteer, touch the wire.",
        ipucu: "A harmless shock; a mild but funny jolt",
        basariliSonuc: {
          mesaj: "Your hair really did stand on end, and the crowd applauded with laughter.",
        },
        basarisizSonuc: {
          mesaj: "You got a stronger jolt than expected, and your hand went numb for a while.",
        },
      },
      {
        metin: "Watch from a distance.",
        ipucu: "Safe, but you miss the experience",
        basariliSonuc: {
          mesaj: "You watched the experiment safely and satisfied your curiosity.",
        },
        basarisizSonuc: {
          mesaj: "They teased you a bit for being a 'coward.'",
        },
      },
    ],
  },
  komik_sd_dans_salonu_yanlis_adim: {
    baslik: "A Wrong Step at the Dance Hall",
    metin:
      "At a fashionable dance hall you tried a new, trendy dance, but you don't know the steps at all. Everyone's watching — keep going, or sit down?",
    secenekler: [
      {
        metin: "Push through, improvise.",
        ipucu: "Land it and high society loves you; miss it and you're humiliated",
        basariliSonuc: {
          mesaj: "Your improvised steps were mistaken for a new 'trend' — a few people even started copying you.",
        },
        basarisizSonuc: {
          mesaj: "Your feet got tangled and you stepped on your partner's foot — the whole hall was whispering your name.",
        },
      },
      {
        metin: "Step aside, just watch.",
        ipucu: "Safe, but a bit out of touch with high society",
        basariliSonuc: {
          mesaj: "You watched happily from the side, and no one said a word.",
        },
        basarisizSonuc: {
          mesaj: "A few people kept asking why you weren't dancing, which got a bit tiresome.",
        },
      },
    ],
  },
  komik_sd_polis_kiyafeti_sakasi: {
    baslik: "The Borrowed Police Uniform",
    metin:
      "Walking around in a police uniform you borrowed for a costume party, a crowd took you seriously and started asking for help.",
    secenekler: [
      {
        metin: "Play the part, try to 'help.'",
        ipucu: "Handle it well and it's a funny memory; fail and you're up against a real officer",
        basariliSonuc: {
          mesaj: "You 'resolved' a simple dispute, and the crowd thanked you — no one caught on.",
        },
        basarisizSonuc: {
          mesaj: "A real officer arrived at the scene and caught you in the fake uniform.",
        },
      },
      {
        metin: "Take off the uniform right away and slip out.",
        ipucu: "Safe, though the funny memory slips away too",
        basariliSonuc: {
          mesaj: "You slipped away from the crowd and tucked the uniform into your bag.",
        },
        basarisizSonuc: {
          mesaj: "The buttons popped as you took it off, and you looked a bit odd for a moment.",
        },
      },
    ],
  },
  komik_sd_abartili_reklam_afisi: {
    baslik: "The Overhyped Advertisement",
    metin:
      "You went a little overboard on the poster advertising your own service — phrases like 'the best in the city' catch attention but don't win everyone over.",
    secenekler: [
      {
        metin: "Leave the poster as is, defend the claim.",
        ipucu: "Convince people and customers flood in; get exposed and you lose trust",
        basariliSonuc: {
          mesaj: "The poster caught attention, and curious customers showed up at your door.",
        },
        basarisizSonuc: {
          mesaj: "One disappointed customer complained to everyone — the nickname 'master of exaggeration' stuck.",
        },
      },
      {
        metin: "Change the poster to a more modest wording.",
        ipucu: "Safe and honest, but less eye-catching",
        basariliSonuc: {
          mesaj: "Fewer customers came, but the ones who did left satisfied.",
        },
        basarisizSonuc: {
          mesaj: "The fee you paid to change the poster went to waste — hardly anyone cared either way.",
        },
      },
    ],
  },
  komik_sd_maskeli_balo_karisikligi: {
    baslik: "Mistaken Identity at the Masquerade",
    metin:
      "At the masquerade, someone mistook you for another person and launched into a long, intimate conversation. Correct the mix-up, or keep the act going?",
    secenekler: [
      {
        metin: "Keep the act going, play along as that person.",
        ipucu: "A fun night, or an annoying exposure",
        basariliSonuc: {
          mesaj: "You played an entertaining role all evening, and in the end you both laughed and revealed the truth.",
        },
        basarisizSonuc: {
          mesaj: "The person realized your real identity and introduced you to everyone as a 'fraud.'",
        },
      },
      {
        metin: "Fix the mix-up right away.",
        ipucu: "Safe, though a bit of an awkward moment",
        basariliSonuc: {
          mesaj: "The person was embarrassed, and a short apology closed the matter.",
        },
        basarisizSonuc: {
          mesaj: "The person didn't believe you and kept trying to continue the old conversation — a little strange.",
        },
      },
    ],
  },
  komik_sd_yeni_icat_sunumu: {
    baslik: "The Odd Invention Demonstration",
    metin:
      "An inventor wants you to demonstrate his strange-looking device (a 'self-fanning hat') to the public — will you show it off in exchange for a commission?",
    secenekler: [
      {
        metin: "Get on stage, enthusiastically present the invention.",
        ipucu: "Sell it well and the commission is good; go badly and you look ridiculous",
        basariliSonuc: {
          mesaj: "People showed real interest in the device, and the inventor paid you generously.",
        },
        basarisizSonuc: {
          mesaj: "The device broke down mid-stage, and the hat flew straight into an onlooker's head.",
        },
      },
      {
        metin: "Decline the offer.",
        ipucu: "Safe, no commission",
        basariliSonuc: {
          mesaj: "The inventor found someone else, and you stayed out of it.",
        },
        basarisizSonuc: {
          mesaj: "When the invention drew a big crowd, you thought, 'I should have said yes.'",
        },
      },
    ],
  },
  komik_sd_kagit_gemi_yarismasi: {
    baslik: "The Paper Boat Race",
    metin:
      "The neighborhood kids are holding a paper boat race by the river and invite you to join — a bit childish for a grown-up, but it looks like fun.",
    secenekler: [
      {
        metin: "Join in, build your best paper boat.",
        ipucu: "Win and the kids call you a hero; lose and you still have a good time",
        basariliSonuc: {
          mesaj: "Your boat crossed the current first, and the kids hoisted you onto their shoulders.",
        },
        basarisizSonuc: {
          mesaj: "Your boat sank, but you had a great time laughing along with the kids.",
        },
      },
      {
        metin: "Decline, saying 'I'm too grown up for this.'",
        ipucu: "Safe, but you miss out on the fun",
        basariliSonuc: {
          mesaj: "The kids were disappointed, and while you kept your dignity, you felt a little regret.",
        },
        basarisizSonuc: {
          mesaj: "The kids teased you a bit for being a 'stuffy grown-up,' which got under your skin.",
        },
      },
    ],
  },
  komik_sd_yeni_asansor_denemesi: {
    baslik: "Trying the New Elevator",
    metin:
      "In a newly built building, the brand-new invention everyone's curious about but no one dares try — the 'elevator' — is waiting for you. Want to be the first to try it?",
    secenekler: [
      {
        metin: "Be the first to ride it.",
        ipucu: "Go smoothly and you earn a first-timer's title; break down and it's a scary moment",
        basariliSonuc: {
          mesaj: "It went up without a hitch, and you were remembered as 'the first person in the city to ride an elevator.'",
        },
        basarisizSonuc: {
          mesaj: "The elevator got stuck halfway up, and it took half an hour of struggle to get you out.",
        },
      },
      {
        metin: "Take the stairs, prefer to wait.",
        ipucu: "Safe, but tiring",
        basariliSonuc: {
          mesaj: "You made it up the stairs safely, tired but in one piece.",
        },
        basarisizSonuc: {
          mesaj: "They teased you a bit for being a 'coward.'",
        },
      },
    ],
  },
  komik_sd_terzi_yanlis_kiyafet: {
    baslik: "The Tailor's Mistake",
    metin:
      "The outfit you ordered for an important event came back with a strange, slightly ridiculous cut after the tailor made a mistake. Wear it anyway, or stay home?",
    secenekler: [
      {
        metin: "Wear the outfit, go to the event anyway.",
        ipucu: "Own it with confidence and it's mistaken for the latest fashion; hesitate and you're mocked",
        basariliSonuc: {
          mesaj: "Your confident bearing convinced everyone — a few even asked about the 'new style.'",
        },
        basarisizSonuc: {
          mesaj: "Everyone stared oddly, and whispers followed you all through the event.",
        },
      },
      {
        metin: "Go home, miss the event.",
        ipucu: "Safe, but you miss the opportunity",
        basariliSonuc: {
          mesaj: "You later learned you'd missed an important connection at the event.",
        },
        basarisizSonuc: {
          mesaj: "The tailor gave no compensation, so you missed both the event and the money.",
        },
      },
    ],
  },
  komik_sd_sirkten_kacan_hayvan: {
    baslik: "The Escaped Circus Animal",
    metin:
      "A strange animal that escaped from the traveling circus (maybe a zebra, maybe just a painted donkey) is running loose in the streets. Will you help catch it?",
    secenekler: [
      {
        metin: "Chase after it, try to catch it.",
        ipucu: "Catch it and there's a reward and fame; fail and there's more chaos",
        basariliSonuc: {
          mesaj: "You cornered the animal and caught it, and the circus owner paid you gratefully.",
        },
        basarisizSonuc: {
          mesaj: "The animal dragged you into a puddle and kept running.",
        },
      },
      {
        metin: "Watch from the sidelines, don't get involved.",
        ipucu: "Safe, but a bit dull",
        basariliSonuc: {
          mesaj: "You enjoyed watching the chaos while someone else caught the animal.",
        },
        basarisizSonuc: {
          mesaj: "The animal splashed mud on you as it ran right past.",
        },
      },
    ],
  },
  komik_sd_mucize_makine_satisi: {
    baslik: "The Fake Miracle Machine",
    metin:
      "A swindler is offering to sell you a noisy machine he calls 'a cure for everything' — and you're thinking about reselling it to someone else and pocketing the difference.",
    secenekler: [
      {
        metin: "Buy the machine, resell it as a 'miracle' to someone else.",
        ipucu: "Convince someone and it's easy money; get exposed and it stains your name",
        basariliSonuc: {
          mesaj: "A gullible buyer paid double for it — your purse is full, your conscience a little uneasy.",
        },
        basarisizSonuc: {
          mesaj: "The machine broke down almost explosively the first time it was switched on, and the buyer complained about you to everyone.",
        },
      },
      {
        metin: "Refuse the offer, warn the swindler.",
        ipucu: "Safe and honest, but no profit",
        basariliSonuc: {
          mesaj: "The swindler didn't give up, but you walked away with a clear conscience.",
        },
        basarisizSonuc: {
          mesaj: "The swindler sneered at you as 'tasteless,' which stung a little.",
        },
      },
    ],
  },
  komik_sd_fabrika_dumaninda_isim_yazma: {
    baslik: "The Smokestack Name-Writing Bet",
    metin:
      "The young workers are debating a silly theory that you could 'write in the sky' with the shape of the factory chimney's smoke — someone's put you in charge of proving it by working the damper.",
    secenekler: [
      {
        metin: "Play with the damper, try to shape the smoke.",
        ipucu: "Land it and it's a legendary 'invention'; get caught by the foreman and it's a serious scolding",
        basariliSonuc: {
          mesaj: "The smoke really did take on a strange shape, and everyone applauded you as the 'sky painter.'",
        },
        basarisizSonuc: {
          mesaj: "You misadjusted the damper and jammed the machine, and the foreman docked your pay for repairs.",
        },
      },
      {
        metin: "Laugh off the theory and get back to work.",
        ipucu: "Safe, an ordinary shift",
        basariliSonuc: {
          mesaj: "You got back to work, and the theory stayed up in the air where it belonged.",
        },
        basarisizSonuc: {
          mesaj: "They teased you a bit for 'having no imagination.'",
        },
      },
    ],
  },
};
