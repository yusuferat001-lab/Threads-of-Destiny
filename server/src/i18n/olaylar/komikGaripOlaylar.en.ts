import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/komikGaripOlaylar.ts — İngilizce çevirileri. */
export const OLAYLAR_KOMIK_GARIP_EN: Record<string, OlayCeviri> = {
  komik_yeme_yarismasi: {
    baslik: "The Eating Contest",
    metin:
      "An eating contest is heating up in the market square. The winner gets a week of free meals, but the stack of plates on the table is downright terrifying.",
    secenekler: [
      {
        metin: "Join the contest, take pride in your stomach.",
        basariliSonuc: {
          mesaj: "You finished the last plate! The crowd cheered — a week of free food is yours.",
        },
        basarisizSonuc: {
          mesaj: "You gave up halfway through; you and your stomach weren't on speaking terms for days.",
        },
      },
      {
        metin: "Watch from the side, settle for mocking them.",
        basariliSonuc: {
          mesaj: "You watched comfortably, and felt your stomach silently thank you.",
        },
        basarisizSonuc: {
          mesaj: "A few called you 'coward'; you didn't care, but you heard it.",
        },
      },
    ],
  },
  komik_yanlis_sarki: {
    baslik: "Song in the Square",
    metin:
      "A bard/traveling musician called you up onto the square's stage: 'Come on, sing a song!' The crowd is waiting, and you barely remember the words.",
    secenekler: [
      {
        metin: "Get up there, sing whatever comes out.",
        basariliSonuc: {
          mesaj: "Your voice came out surprisingly good, the crowd applauded.",
        },
        basarisizSonuc: {
          mesaj: "You mangled the words, the pitch wandered off; for days they teased you as 'the bard' — not as a compliment.",
        },
      },
      {
        metin: "Blush, thank them, decline.",
        basariliSonuc: {
          mesaj: "You declined politely, the bard shrugged and called up someone else.",
        },
        basarisizSonuc: {
          mesaj: "They kept pushing, you slipped away almost fleeing; a small regret lingered inside you.",
        },
      },
    ],
  },
  komik_garip_yanlis_cenaze: {
    baslik: "The Wrong Funeral",
    metin:
      "You joined a crowded mourning ceremony — but a few minutes in you realized this is the funeral of a total stranger. Everyone thinks they recognize you, and they're weeping.",
    secenekler: [
      {
        metin: "Keep up the act, keep wailing along.",
        basariliSonuc: {
          mesaj: "No one noticed a thing — someone even told you 'that was such a heartfelt farewell.'",
        },
        basarisizSonuc: {
          mesaj: "When you said the wrong name, everyone turned to stare. You slunk off in embarrassment.",
        },
      },
      {
        metin: "Slip out quietly, without being noticed.",
        basariliSonuc: {
          mesaj: "You got away unseen; the whole thing became a sweet little memory.",
        },
        basarisizSonuc: {
          mesaj: "On your way out you bumped into a chair and drew everyone's attention — the quiet escape wasn't so quiet.",
        },
      },
    ],
  },
  komik_kopekle_banyo: {
    baslik: "The Stubborn Dog",
    metin:
      "The neighbor's huge, mud-caked dog spotted you and gave chase — now it's waiting to jump on you. Run, or brace yourself?",
    secenekler: [
      {
        metin: "Wrestle with the dog, try to get it under control.",
        basariliSonuc: {
          mesaj: "You calmed the dog down, and even seemed to make a new friend — it walked beside you wagging its tail.",
        },
        basarisizSonuc: {
          mesaj: "The dog knocked you over, your clothes ended up covered in mud; the cleaning bill came out of your own pocket.",
        },
      },
      {
        metin: "Run, cross to the other end of the street.",
        basariliSonuc: {
          mesaj: "You barely got away, the dog moved on to something else.",
        },
        basarisizSonuc: {
          mesaj: "While running you tripped over a basket and fell — the dog thought it was a game.",
        },
      },
    ],
  },
  komik_dedikodu_ikilemi: {
    baslik: "The Spreading Gossip",
    metin:
      "A half-joking remark you made has spread through the marketplace, wildly exaggerated; now everyone tells a strange story about you. Correct it, or let the story grow?",
    secenekler: [
      {
        metin: "Let the story grow, enjoy it.",
        basariliSonuc: {
          mesaj: "Everyone started talking about your 'legend'; you kind of liked it.",
        },
        basarisizSonuc: {
          mesaj: "Your exaggeration went too far, and someone accused you of being a liar.",
        },
      },
      {
        metin: "Tell everyone the truth and set it straight.",
        basariliSonuc: {
          mesaj: "You explained the truth to everyone one by one; tiring, but your conscience is clear.",
        },
        basarisizSonuc: {
          mesaj: "No one believed you — your 'correction' just made the story even more colorful.",
        },
      },
    ],
  },
  komik_agir_tas_kaldirma: {
    baslik: "The Strongman Show",
    metin:
      "The young men in the square are promising a prize to whoever can lift a huge stone. The stone is heavier than it looks — but so is the crowd watching.",
    secenekler: [
      {
        metin: "Give it everything you've got.",
        basariliSonuc: {
          mesaj: "You finally hoisted the stone into the air, the crowd went wild — the prize is in your pocket.",
        },
        basarisizSonuc: {
          mesaj: "Your back gave out, the stone didn't budge an inch; for days you struggled just to bend over.",
        },
      },
      {
        metin: "Decline, say 'some other day'.",
        basariliSonuc: {
          mesaj: "You shrugged it off, nobody made much of it.",
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
      "Your friends suggest slipping you into a group who don't know you as a 'mysterious stranger' — just for fun. Playing the part takes some nerve.",
    secenekler: [
      {
        metin: "Take on the role, play the mysterious stranger.",
        basariliSonuc: {
          mesaj: "You played the role so well the group genuinely believed it — your friends nearly died laughing.",
        },
        basarisizSonuc: {
          mesaj: "You fumbled one question, everyone caught on to the joke, and some felt a bit hurt.",
        },
      },
      {
        metin: "Give up, introduce yourself as you are.",
        basariliSonuc: {
          mesaj: "It was an ordinary introduction, but at least nobody's feelings were hurt.",
        },
        basarisizSonuc: {
          mesaj: "Your friends teased you a bit for being a 'coward'.",
        },
      },
    ],
  },
  komik_beklenmedik_dans: {
    baslik: "The Unexpected Dance Invitation",
    metin:
      "At a celebration, a total stranger held out their hand and invited you to dance. Everyone is watching, and your feet are anything but a dancer's feet.",
    secenekler: [
      {
        metin: "Accept, try to keep the rhythm.",
        basariliSonuc: {
          mesaj: "Surprisingly, you kept the steps — a few people even tried to copy you.",
        },
        basarisizSonuc: {
          mesaj: "Your feet tangled and you fell flat; the crowd burst out laughing.",
        },
      },
      {
        metin: "Decline politely.",
        basariliSonuc: {
          mesaj: "You smiled and declined, the person asking found someone else.",
        },
        basarisizSonuc: {
          mesaj: "They kept insisting and you refused sharply; the mood got a bit tense.",
        },
      },
    ],
  },
  komik_hirsiz_yanlisligi: {
    baslik: "Mistaken for a Thief",
    metin:
      "While joking around with a friend, play-acting 'being a thief,' a real watchman mistook you for an actual thief and gave chase. Explain, or run?",
    secenekler: [
      {
        metin: "Stop, explain the situation with a laugh.",
        basariliSonuc: {
          mesaj: "The watchman couldn't help but laugh too, and warned you to 'be more careful next time'.",
        },
        basarisizSonuc: {
          mesaj: "He didn't believe you and let you off with a small fine — but your pride took a hit.",
        },
      },
      {
        metin: "Run, don't make a bigger deal of it.",
        basariliSonuc: {
          mesaj: "You lost him in the back alleys, breathless but free.",
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
      "At a fun fair everyone is walking around in ridiculous fake beards and moustaches. When it's your turn, do you go for the most exaggerated one, or turn it down?",
    secenekler: [
      {
        metin: "Put on the most exaggerated one, take the stage.",
        basariliSonuc: {
          mesaj: "The crowd declared you the funniest part of the whole show, applause found you.",
        },
        basarisizSonuc: {
          mesaj: "The beard stuck to your face and fell off at exactly the wrong moment — everyone laughed, but not with you.",
        },
      },
      {
        metin: "Decline politely, stay a spectator.",
        basariliSonuc: {
          mesaj: "You watched from the side, and found the show entertaining enough as it was.",
        },
        basarisizSonuc: {
          mesaj: "Your friends teased you a bit for being 'stuck up'.",
        },
      },
    ],
  },

  // ───────────────────────── MIDDLE AGES (25) ─────────────────────────
  komik_oc_turnuva_soytarisi: {
    baslik: "The Jester's Duel Challenge",
    metin:
      "Right before the knights' tournament, the court jester challenges you to a 'duel' with wooden swords — a crowd is already gathering.",
    secenekler: [
      {
        metin: "Accept, duel him with the wooden sword.",
        basariliSonuc: {
          mesaj: "You beat the jester with the wooden sword and the crowd went wild, declaring you the tournament's 'warm-up star'.",
        },
        basarisizSonuc: {
          mesaj: "The jester floored you in three moves; for days they mocked you as a 'master swordsman'.",
        },
      },
      {
        metin: "Decline, focus on the tournament.",
        basariliSonuc: {
          mesaj: "The jester shrugged and found someone else, and you focused on the tournament.",
        },
        basarisizSonuc: {
          mesaj: "The jester loudly introduced you as a 'coward knight-hopeful' — it stung a bit.",
        },
      },
    ],
  },
  komik_oc_manastir_bira_kacirma: {
    baslik: "The Monastery's Secret Beer",
    metin:
      "A barrel of the special beer the monks drink for themselves sits forgotten in the corner of the cellar. With no one around, filling a mug is tempting.",
    secenekler: [
      {
        metin: "Quietly fill a mug.",
        basariliSonuc: {
          mesaj: "The beer was delicious — no one noticed, and you kept your secret.",
        },
        basarisizSonuc: {
          mesaj: "The head monk caught you right at the mug; for days he had you sweeping the church courtyard.",
        },
      },
      {
        metin: "Give up, stay away from the cellar.",
        basariliSonuc: {
          mesaj: "You resisted the temptation, and your conscience stayed clear.",
        },
        basarisizSonuc: {
          mesaj: "All day long you couldn't stop thinking about that beer's smell.",
        },
      },
    ],
  },
  komik_oc_sato_hendegi: {
    baslik: "The Moat-Jumping Bet",
    metin:
      "You made a bet that you could clear the castle's dry moat in a single bound. The moat is wider than it looks — and the bottom is anything but soft.",
    secenekler: [
      {
        metin: "Run back, then leap.",
        basariliSonuc: {
          mesaj: "You landed right on the far edge! The crowd screamed with applause, and you won the bet.",
        },
        basarisizSonuc: {
          mesaj: "You landed in the middle; it took you ten minutes to climb out of the mud.",
        },
      },
      {
        metin: "Turn down the bet.",
        basariliSonuc: {
          mesaj: "Someone said 'smart move', and you tried hard to believe it yourself.",
        },
        basarisizSonuc: {
          mesaj: "The nickname 'coward' stuck around for a while.",
        },
      },
    ],
  },
  komik_oc_kral_taklidi: {
    baslik: "Mimicking the King",
    metin:
      "At the tavern, your slightly-too-drunk friends egg you on to climb onto a wooden stand and mimic the king's manner of speech. They say the walls have ears.",
    secenekler: [
      {
        metin: "Do the impression, make everyone laugh.",
        basariliSonuc: {
          mesaj: "Your impression was so good the tavern rang with laughter — some even said you sounded as 'commanding' as the king himself.",
        },
        basarisizSonuc: {
          mesaj: "An informant's ear caught wind of it; you came right to the edge of being reported for 'disrespect'.",
        },
      },
      {
        metin: "Decline, step down from the stand.",
        basariliSonuc: {
          mesaj: "You stepped down and sat back, your friends called you 'no fun' but it stayed harmless.",
        },
        basarisizSonuc: {
          mesaj: "They kept shoving and pushing you; you slunk away grumpily.",
        },
      },
    ],
  },
  komik_oc_falci_kadin: {
    baslik: "The Village Fortune-Teller's Prophecy",
    metin:
      "The village fortune-teller took your hand, looked into your eyes, and said gravely: 'Great misfortune awaits you because of a donkey!' Now the whole village seems to be watching you steer clear of donkeys.",
    secenekler: [
      {
        metin: "Ignore the prophecy, keep working with donkeys as usual.",
        basariliSonuc: {
          mesaj: "Nothing happened, the prophecy came to nothing; the villagers started calling you 'brave'.",
        },
        basarisizSonuc: {
          mesaj: "A donkey kicked you — exactly as the fortune-teller said. Now the village believes her even more.",
        },
      },
      {
        metin: "Take it seriously, avoid donkeys for days.",
        basariliSonuc: {
          mesaj: "You never went near a donkey, stayed safe, but everyone found you a little strange.",
        },
        basarisizSonuc: {
          mesaj: "While fleeing from a donkey cart, you fell and were embarrassed in front of everyone — not because of the prophecy, but because of your own fear.",
        },
      },
    ],
  },
  komik_oc_zirh_denemesi: {
    baslik: "The Borrowed Armor",
    metin:
      "A soldier friend let you try on his full suit of armor. It's heavier than you expected — even standing up straight is a struggle.",
    secenekler: [
      {
        metin: "Try to walk a few steps in the armor.",
        basariliSonuc: {
          mesaj: "Wobbling but upright, you took a few steps — those watching were impressed.",
        },
        basarisizSonuc: {
          mesaj: "You toppled over on the second step and the armor came down on top of you — it took two people to get you back up.",
        },
      },
      {
        metin: "Just put it on, don't move.",
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
        metin: "Buy the bone, sell it to someone else as a 'dragon bone'.",
        basariliSonuc: {
          mesaj: "You sold the bone to a gullible traveler for triple the price — your conscience twinged a little, but your purse filled up.",
        },
        basarisizSonuc: {
          mesaj: "The buyer showed the bone to a butcher, who identified it; the nickname 'con artist' followed you around for a while.",
        },
      },
      {
        metin: "Tell the peddler you're onto his trick, don't buy it.",
        basariliSonuc: {
          mesaj: "The peddler scowled, but you walked away at peace with your conscience.",
        },
        basarisizSonuc: {
          mesaj: "The peddler sneered at you for having 'no taste'; it annoyed you a bit.",
        },
      },
    ],
  },
  komik_oc_hamamda_karisiklik: {
    baslik: "Clothes Mix-Up at the Bathhouse",
    metin:
      "Leaving the bathhouse, you realize some of your clothes got mixed up with someone else's — and that person is still inside, impatiently looking for his own.",
    secenekler: [
      {
        metin: "Go back, explain the mix-up, swap the clothes.",
        basariliSonuc: {
          mesaj: "The other man laughed too, and you swapped the clothes with a chuckle — you even made a new acquaintance.",
        },
        basarisizSonuc: {
          mesaj: "The man got angry and yelled at you in front of everyone as you left the bathhouse.",
        },
      },
      {
        metin: "Act like you don't notice and just leave.",
        basariliSonuc: {
          mesaj: "No one noticed, and you breathed a sigh of relief.",
        },
        basarisizSonuc: {
          mesaj: "The man chased after you and caught you in front of everyone, shouting 'thief!'",
        },
      },
    ],
  },
  komik_oc_sahin_kacagi: {
    baslik: "The Noble's Escaped Falcon",
    metin:
      "A nobleman's hunting falcon slipped off his arm and landed in a tree. He's panicking, and you're right underneath — he promises a reward if you bring the falcon back.",
    secenekler: [
      {
        metin: "Climb the tree, try to catch the falcon.",
        basariliSonuc: {
          mesaj: "You caught the falcon gently in your hand, and the noble happily filled your pocket.",
        },
        basarisizSonuc: {
          mesaj: "The falcon pecked your hand, and you scrambled down out of the tree — both your hands and your pride are bruised.",
        },
      },
      {
        metin: "Watch from a distance, don't get involved.",
        basariliSonuc: {
          mesaj: "The noble's servants caught the falcon, you were just a spectator.",
        },
        basarisizSonuc: {
          mesaj: "The noble shot you a nasty look, muttering 'you could have helped'.",
        },
      },
    ],
  },
  komik_oc_yemin_toreni_karisikligi: {
    baslik: "The Muddled Oath",
    metin:
      "At a small ceremony you're asked to swear an oath of loyalty, but just when it's your turn you realize you never memorized the words — and the crowd is waiting.",
    secenekler: [
      {
        metin: "Improvise, speak with confidence.",
        basariliSonuc: {
          mesaj: "The words you made up sounded so solid that no one even remembered the real text.",
        },
        basarisizSonuc: {
          mesaj: "Your sentences got tangled up; a few people bit their lips to keep from laughing.",
        },
      },
      {
        metin: "Stop, ask someone for the words, wait a moment.",
        basariliSonuc: {
          mesaj: "After a brief silence you read the correct text, and no one made much of it.",
        },
        basarisizSonuc: {
          mesaj: "While you waited, the ceremony's mood soured, and a few people shifted uncomfortably.",
        },
      },
    ],
  },
  komik_oc_dilenci_kiligi_bahsi: {
    baslik: "The Beggar's Disguise Bet",
    metin:
      "Your friends made a bet with you: dress as a beggar and see how much alms you can collect in a day. Your pride takes a small hit, but your purse could fill up.",
    secenekler: [
      {
        metin: "Put on the disguise, collect alms in the square.",
        basariliSonuc: {
          mesaj: "You turned out to be a surprisingly convincing 'beggar' — your purse filled to the brim.",
        },
        basarisizSonuc: {
          mesaj: "Someone who knew you recognized you and told everyone; you were the butt of jokes for days.",
        },
      },
      {
        metin: "Turn down the bet.",
        basariliSonuc: {
          mesaj: "Your friends were disappointed but respected the choice.",
        },
        basarisizSonuc: {
          mesaj: "They teased you a bit for being a 'coward'.",
        },
      },
    ],
  },
  komik_oc_ozan_yarismasi: {
    baslik: "The Bards' Contest",
    metin:
      "A spot opened up at the last minute in the fair's bards' contest. Your gift for verse is questionable, but the winner gets a fine prize.",
    secenekler: [
      {
        metin: "Take the stage, improvise a poem.",
        basariliSonuc: {
          mesaj: "Your improvisation stunned everyone, the judges declared you the winner.",
        },
        basarisizSonuc: {
          mesaj: "The rhymes never landed; the crowd politely smiled and applauded someone else instead.",
        },
      },
      {
        metin: "Give up, stay a spectator.",
        basariliSonuc: {
          mesaj: "You enjoyed watching the contest, with nothing to prove to anyone.",
        },
        basarisizSonuc: {
          mesaj: "A twinge of regret passed through you — 'I wonder if I should have tried.'",
        },
      },
    ],
  },
  komik_oc_kutsal_su_satisi: {
    baslik: "Fake Holy Water",
    metin:
      "A con man is trying to sell you plain well water as 'holy spring water' — and now you're thinking of buying a bottle to resell to someone else.",
    secenekler: [
      {
        metin: "Buy the bottle, resell it to someone else.",
        basariliSonuc: {
          mesaj: "You sold it to a true believer for triple the price — your conscience twinged a little, your purse grew heavier.",
        },
        basarisizSonuc: {
          mesaj: "The buyer drank it, got sick, and came to you for answers.",
        },
      },
      {
        metin: "Expose the con man, don't buy anything.",
        basariliSonuc: {
          mesaj: "The crowd chased the con man off, and they called you an 'honest man'.",
        },
        basarisizSonuc: {
          mesaj: "The con man got away, and no one even thanked you.",
        },
      },
    ],
  },
  komik_oc_kacak_at_yarisi: {
    baslik: "The Illegal Horse Race",
    metin:
      "A chance came up to bet on a forbidden, midnight horse race. The winnings are good, but if you're caught you'll be in trouble.",
    secenekler: [
      {
        metin: "Place the bet, watch the race.",
        basariliSonuc: {
          mesaj: "You won the bet, your purse got heavier — but people around you took note of you.",
        },
        basarisizSonuc: {
          mesaj: "You lost the money, and an informant spotted you as well.",
        },
      },
      {
        metin: "Stay away, go home.",
        basariliSonuc: {
          mesaj: "You had a quiet evening at home, though you wondered about the excitement you missed.",
        },
        basarisizSonuc: {
          mesaj: "Hearing the next day how much everyone else won stung a little.",
        },
      },
    ],
  },
  komik_oc_soytari_yerine_gecme: {
    baslik: "Standing In for the Sick Jester",
    metin:
      "The jester hired for the feast suddenly fell ill, and the panicked host is begging you to take his place. The crowd is already lined up waiting.",
    secenekler: [
      {
        metin: "Accept, improvise some jokes.",
        basariliSonuc: {
          mesaj: "Your improvisation landed so well that everyone thought you were a real jester — the host paid generously.",
        },
        basarisizSonuc: {
          mesaj: "Your jokes fell flat; a dead silence filled the room.",
        },
      },
      {
        metin: "Decline, help them find someone else.",
        basariliSonuc: {
          mesaj: "You helped them find another entertainer, and everyone relaxed.",
        },
        basarisizSonuc: {
          mesaj: "No one could be found, the feast fell a bit flat — the host looked at you with resentment.",
        },
      },
    ],
  },
  komik_oc_deniz_canavari_soylentisi: {
    baslik: "The Sea Monster Rumor",
    metin:
      "Everyone in the coastal village is talking about the 'sea monster' in the cove. Some think it's a huge fish, others an old shipwreck. Go and look, or stay away?",
    secenekler: [
      {
        metin: "Take a boat to the cove, investigate the truth.",
        basariliSonuc: {
          mesaj: "The 'monster' turned out to be the carcass of a huge beached whale — the village thanked you.",
        },
        basarisizSonuc: {
          mesaj: "The boat capsized; you came back soaked and empty-handed, having never found the 'monster'.",
        },
      },
      {
        metin: "Believe the rumor, stay away.",
        basariliSonuc: {
          mesaj: "Like the other villagers, you stayed away, and the mystery remained a mystery.",
        },
        basarisizSonuc: {
          mesaj: "The children teased you a bit for being a 'coward'.",
        },
      },
    ],
  },
  komik_oc_kilise_cani_sakasi: {
    baslik: "The Church Bell Prank",
    metin:
      "Your friends propose an idea: ring the church bell at midnight and wake the whole village in a panic — 'just this once,' they say.",
    secenekler: [
      {
        metin: "Ring the bell, run.",
        basariliSonuc: {
          mesaj: "The whole village burst outside in a panic, while the two of you watched laughing from behind some bushes.",
        },
        basarisizSonuc: {
          mesaj: "The priest caught you red-handed; you spent days cleaning the church courtyard.",
        },
      },
      {
        metin: "Give up, talk your friends out of it too.",
        basariliSonuc: {
          mesaj: "Your friends were disappointed, but no one got in trouble.",
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
      "At an inn, you notice that travelers dressed as pilgrims get free food and a bed. With little money in your pocket, disguising yourself is a tempting idea.",
    secenekler: [
      {
        metin: "Dress as a pilgrim, try for the free lodging.",
        basariliSonuc: {
          mesaj: "The innkeeper took you for a real pilgrim and treated you well — your stomach was full, your conscience only mildly itching.",
        },
        basarisizSonuc: {
          mesaj: "You fumbled when the innkeeper questioned you, and were tossed out the door in front of everyone.",
        },
      },
      {
        metin: "Pay honestly.",
        basariliSonuc: {
          mesaj: "Even with little money, you paid honestly, and spent the night in peace.",
        },
        basarisizSonuc: {
          mesaj: "You didn't have quite enough money, and paid a shortfall, a little embarrassed.",
        },
      },
    ],
  },
  komik_oc_esek_pazarligi: {
    baslik: "The Donkey Haggle",
    metin:
      "At the market, a merchant is trying to sell you a 'young and strong' donkey, but there's a strange weariness in the animal's eyes. Will you buy it, or push the haggling further?",
    secenekler: [
      {
        metin: "Haggle hard, bring the price down.",
        basariliSonuc: {
          mesaj: "You got the price down by half, and the merchant grumbled his way to agreeing.",
        },
        basarisizSonuc: {
          mesaj: "The merchant got angry, cut off the haggling, and sold the donkey to someone else right in front of you.",
        },
      },
      {
        metin: "Pay the asking price, don't argue.",
        basariliSonuc: {
          mesaj: "You bought the donkey, but three days later it turned out to be nowhere near 'young'.",
        },
        basarisizSonuc: {
          mesaj: "The donkey refused to walk before it even left the inn — the money left your pocket, but the donkey stayed put.",
        },
      },
    ],
  },
  komik_oc_kokusu_cikan_peynir: {
    baslik: "The Overpoweringly Ripe Cheese",
    metin:
      "A piece of cheese billed as the village's 'most matured' is set on the table — its smell alone has filled the room. Whoever finishes a slice is promised a bottle of wine.",
    secenekler: [
      {
        metin: "Eat a slice, hold your breath.",
        basariliSonuc: {
          mesaj: "You barely swallowed it, but you won the wine, and the crowd applauded.",
        },
        basarisizSonuc: {
          mesaj: "You gave up after one bite, and your stomach took a while to recover.",
        },
      },
      {
        metin: "Decline politely.",
        basariliSonuc: {
          mesaj: "You declined comfortably, and everyone understood.",
        },
        basarisizSonuc: {
          mesaj: "They teased you a bit for being 'fussy'.",
        },
      },
    ],
  },
  komik_oc_yel_degirmeninde_mahsur: {
    baslik: "Trapped in the Windmill",
    metin:
      "Out of curiosity you went into a windmill, and its sail started turning in the wind, trapping you inside. Force the door, or shout for help?",
    secenekler: [
      {
        metin: "Try to slip through between the sails.",
        basariliSonuc: {
          mesaj: "You slipped through just in time, dusty but sound.",
        },
        basarisizSonuc: {
          mesaj: "A sail clipped your shoulder lightly; you walked around in pain for several days.",
        },
      },
      {
        metin: "Shout for help, wait.",
        basariliSonuc: {
          mesaj: "The miller came and opened the door; the village started calling you 'the man trapped in the mill'.",
        },
        basarisizSonuc: {
          mesaj: "No one heard you, and you had to wait a long while for the wind to die down.",
        },
      },
    ],
  },
  komik_oc_soylu_papagan_taklidi: {
    baslik: "The Noble's Talking Crow",
    metin:
      "A nobleman's trained crow keeps repeating your nickname, making everyone laugh. Teach it something new to make things even bigger, or quietly walk away?",
    secenekler: [
      {
        metin: "Teach the crow something even funnier.",
        basariliSonuc: {
          mesaj: "The crow picked up the new phrase and made everyone laugh — even the noble couldn't help but chuckle.",
        },
        basarisizSonuc: {
          mesaj: "The crow said what you taught it at the worst possible moment — right in front of the noble's guests.",
        },
      },
      {
        metin: "Walk away, don't get involved.",
        basariliSonuc: {
          mesaj: "The crow started repeating someone else's nickname instead, and you relaxed.",
        },
        basarisizSonuc: {
          mesaj: "The crow kept shouting your nickname; walking away didn't help.",
        },
      },
    ],
  },
  komik_oc_kutsal_emanet_taklidi: {
    baslik: "The Fake Holy Relic Offer",
    metin:
      "A merchant is selling a plain bone as 'the saint's finger bone' and proposes a partnership: sell it on to the village's wealthy man.",
    secenekler: [
      {
        metin: "Accept the offer, try to sell the bone.",
        basariliSonuc: {
          mesaj: "The wealthy villager bought the bone in a grand ceremony — your conscience grew heavier, but so did your purse.",
        },
        basarisizSonuc: {
          mesaj: "A monk examined the bone and saw through the forgery; you were disgraced in the village square.",
        },
      },
      {
        metin: "Refuse the offer, report the merchant.",
        basariliSonuc: {
          mesaj: "The merchant was driven out of the village, and you were praised for your honesty.",
        },
        basarisizSonuc: {
          mesaj: "Barely anyone listened to you, and the merchant continued his trade in another village.",
        },
      },
    ],
  },
  komik_oc_kutsal_relik_kuyrugu: {
    baslik: "The Long Relic Queue",
    metin:
      "You've been waiting in line for hours to see a holy relic. The man in front of you keeps shoving to hold his spot.",
    secenekler: [
      {
        metin: "Try to push ahead, get into the shoving match.",
        basariliSonuc: {
          mesaj: "You slipped ahead skillfully, and now you're first in line to see the relic.",
        },
        basarisizSonuc: {
          mesaj: "The scuffle escalated, and the attendants threw both of you out of the line.",
        },
      },
      {
        metin: "Wait patiently for your turn.",
        basariliSonuc: {
          mesaj: "After hours of waiting, you saw the relic in peace.",
        },
        basarisizSonuc: {
          mesaj: "The gates closed right when it was almost your turn; it was pushed to the next day.",
        },
      },
    ],
  },
  komik_oc_soytari_elbisesi_calinti: {
    baslik: "The Stolen Jester Costume",
    metin:
      "Walking around in a colorful jester costume you put on as a joke, the real court jester spots you and starts shouting 'did you steal my costume?' — everyone is watching.",
    secenekler: [
      {
        metin: "Say it was a joke, put on a funny little show.",
        basariliSonuc: {
          mesaj: "The two of you improvised a little show together, and the crowd loved it.",
        },
        basarisizSonuc: {
          mesaj: "The jester demanded his costume back, and you had to strip in front of everyone.",
        },
      },
      {
        metin: "Apologize, hand over the costume right away.",
        basariliSonuc: {
          mesaj: "You handed over the costume, the jester calmed down, and the matter was closed.",
        },
        basarisizSonuc: {
          mesaj: "You clumsily tripped while taking off the costume, and the crowd laughed.",
        },
      },
    ],
  },

  // ───────────────────────── INDUSTRIAL REVOLUTION (25) ─────────────────────────
  komik_sd_fabrika_hiz_bahsi: {
    baslik: "Racing the Machine",
    metin:
      "The workers at the factory are debating whether a person can beat the speed of the new steam machine. Now it's your turn, and everyone is watching.",
    secenekler: [
      {
        metin: "Race against the machine.",
        basariliSonuc: {
          mesaj: "Unbelievable — you beat the machine! The factory talked about it for days.",
        },
        basarisizSonuc: {
          mesaj: "The machine beat you badly, leaving your arms aching for days.",
        },
      },
      {
        metin: "Decline, go back to your work.",
        basariliSonuc: {
          mesaj: "You went back to work, which was seen as reasonable.",
        },
        basarisizSonuc: {
          mesaj: "A few workers goaded you, calling you a 'coward'.",
        },
      },
    ],
  },
  komik_sd_balon_ucusu: {
    baslik: "The Hot Air Balloon Offer",
    metin:
      "A traveling inventor offers you a short flight in his new invention, a hot air balloon — 'completely safe,' he says, though his voice doesn't sound so sure.",
    secenekler: [
      {
        metin: "Get in and try the flight.",
        basariliSonuc: {
          mesaj: "You saw the city from above! When you landed, everyone greeted you as the 'sky traveler'.",
        },
        basarisizSonuc: {
          mesaj: "The balloon suddenly descended, and the basket scraped across a roof before landing hard.",
        },
      },
      {
        metin: "Decline the offer politely.",
        basariliSonuc: {
          mesaj: "You chose to stay on the ground, and the inventor found someone else.",
        },
        basarisizSonuc: {
          mesaj: "Watching the flight, a bit of regret lingered inside you.",
        },
      },
    ],
  },
  komik_sd_foto_studyosu_pozu: {
    baslik: "The New Photograph Camera",
    metin:
      "The photo studio newly opened in town is offering a free trial shot, but 'holding still' takes a surprisingly long time — one twitch and the whole photo blurs.",
    secenekler: [
      {
        metin: "Strike a serious pose, don't move.",
        basariliSonuc: {
          mesaj: "A magnificent photograph came out; you had it framed and hung at home.",
        },
        basarisizSonuc: {
          mesaj: "You scratched an itch at the exact wrong moment, and appeared in the photo like a blurry ghost — you couldn't even get your money back.",
        },
      },
      {
        metin: "Pose with a funny face.",
        basariliSonuc: {
          mesaj: "Even the photographer couldn't help but laugh, and hung the photo in his shop window.",
        },
        basarisizSonuc: {
          mesaj: "The photographer said you'd ruined his 'serious art' and demanded an extra fee from you.",
        },
      },
    ],
  },
  komik_sd_tren_at_arabasi_yarisi: {
    baslik: "Train or Horse Cart?",
    metin:
      "At the station, someone made a big bet that a horse cart could outrun the new train. You could place a small bet on either side.",
    secenekler: [
      {
        metin: "Bet on the train winning.",
        basariliSonuc: {
          mesaj: "The train won comfortably, and you pocketed the bet.",
        },
        basarisizSonuc: {
          mesaj: "The train broke down along the way, and the horse cart passed with roars of laughter.",
        },
      },
      {
        metin: "Bet on the horse cart, 'don't trust newfangled things'.",
        basariliSonuc: {
          mesaj: "The train really did break down! Everyone was stunned, and you walked away with a profit.",
        },
        basarisizSonuc: {
          mesaj: "The train won easily, and they teased you a bit for being 'old-fashioned'.",
        },
      },
    ],
  },
  komik_sd_sirk_gosterisi_daveti: {
    baslik: "The Traveling Circus Invitation",
    metin:
      "The owner of the traveling circus that came to town says he needs a volunteer for his show and calls you up onto the stage — you'll be assisting with the fire-breathing act.",
    secenekler: [
      {
        metin: "Take the stage, help with the show.",
        basariliSonuc: {
          mesaj: "The trick went flawlessly, and the crowd gave you a standing ovation.",
        },
        basarisizSonuc: {
          mesaj: "A spark jumped onto your arm and the show was cut short.",
        },
      },
      {
        metin: "Decline politely, stay a spectator.",
        basariliSonuc: {
          mesaj: "The circus owner found someone else, and you enjoyed watching.",
        },
        basarisizSonuc: {
          mesaj: "They teased you a bit for being a 'coward'.",
        },
      },
    ],
  },
  komik_sd_gazeteye_yalan_haber: {
    baslik: "The Exaggerated Newspaper Story",
    metin:
      "A local newspaper reporter wants a striking story from you. Your real story is ordinary, but exaggerated a little it could make headlines.",
    secenekler: [
      {
        metin: "Dress up the story, make the headlines.",
        basariliSonuc: {
          mesaj: "The story made the headlines, everyone is talking about you — you even got a small writer's fee.",
        },
        basarisizSonuc: {
          mesaj: "A reader proved the story was false, the paper apologized — you were disgraced.",
        },
      },
      {
        metin: "Tell your real, ordinary story.",
        basariliSonuc: {
          mesaj: "The story got a small corner spot, no one paid much attention, but you stayed honest.",
        },
        basarisizSonuc: {
          mesaj: "The reporter found your story 'boring' and never published it at all.",
        },
      },
    ],
  },
  komik_sd_muzikli_kutu_denemesi: {
    baslik: "The New Music Box",
    metin:
      "A shop window is displaying the new invention — a music box (an ancestor of the gramophone). The shopkeeper invites you to turn the crank and try it, while a crowd gathers to watch.",
    secenekler: [
      {
        metin: "Turn the crank, dance.",
        basariliSonuc: {
          mesaj: "As the music played you got carried away, and a few people started dancing along with you.",
        },
        basarisizSonuc: {
          mesaj: "You turned the crank too hard and broke the mechanism, and had to pay the shopkeeper compensation.",
        },
      },
      {
        metin: "Watch from a distance, don't touch it.",
        basariliSonuc: {
          mesaj: "You enjoyed listening to the music, and didn't cause anyone any harm.",
        },
        basarisizSonuc: {
          mesaj: "The shopkeeper kept pressing you to try it, which annoyed you a bit.",
        },
      },
    ],
  },
  komik_sd_sahte_grev_sakasi: {
    baslik: "The Fake Strike Prank",
    metin:
      "Your coworkers suggest joking about 'a mass strike starting' just to scare the boss — to stir up a few minutes of chaos.",
    secenekler: [
      {
        metin: "Join the prank, shout along with everyone.",
        basariliSonuc: {
          mesaj: "The boss panicked at first, then couldn't stop laughing once he realized it was a joke.",
        },
        basarisizSonuc: {
          mesaj: "The boss took the joke seriously and launched a real investigation, putting your name on a blacklist.",
        },
      },
      {
        metin: "Don't join in, mind your own work.",
        basariliSonuc: {
          mesaj: "You stayed on the sidelines, and the whole thing blew over quickly.",
        },
        basarisizSonuc: {
          mesaj: "Your coworkers teased you a bit for being a 'stick in the mud'.",
        },
      },
    ],
  },
  komik_sd_telgraf_yanlisligi: {
    baslik: "The Telegraph Mix-Up",
    metin:
      "The telegraph clerk garbled your message — now the other party expects something you never meant at all. Fix it, or leave it as it is?",
    secenekler: [
      {
        metin: "Send a new telegraph to fix the situation.",
        basariliSonuc: {
          mesaj: "You cleared up the confusion, and the other party took it with understanding — it cost you a bit though.",
        },
        basarisizSonuc: {
          mesaj: "The second telegraph got garbled too, and things got even more tangled.",
        },
      },
      {
        metin: "Leave it as it is, see what happens.",
        basariliSonuc: {
          mesaj: "The misunderstanding coincidentally worked out in your favor, bringing an unexpected windfall.",
        },
        basarisizSonuc: {
          mesaj: "The other party refused to do business, and people started calling you 'unreliable'.",
        },
      },
    ],
  },
  komik_sd_lokomotif_iskele_pozu: {
    baslik: "Posing in Front of the Locomotive",
    metin:
      "At the station, your friends want you to strike a 'daring pose' right in front of the huge, stationary locomotive — just as the train is about to depart.",
    secenekler: [
      {
        metin: "Step forward, pose bravely.",
        basariliSonuc: {
          mesaj: "The photo taken just as the train's whistle blew became legendary — everyone wanted a copy.",
        },
        basarisizSonuc: {
          mesaj: "The train left earlier than expected; you jumped clear at the last second, your heart pounding.",
        },
      },
      {
        metin: "Pose from a safe distance.",
        basariliSonuc: {
          mesaj: "It was an ordinary but safe keepsake photo.",
        },
        basarisizSonuc: {
          mesaj: "Your friends teased you a bit for being a 'coward'.",
        },
      },
    ],
  },
  komik_sd_sokak_satici_taklidi: {
    baslik: "The Street Vendor Impression",
    metin:
      "For fun, you started mimicking a street vendor's exaggerated shouting style — and a few curious passersby actually gathered around to buy something.",
    secenekler: [
      {
        metin: "Keep up the act, 'sell' the odds and ends in your hands.",
        basariliSonuc: {
          mesaj: "The joke turned into a real sale, and unexpected money slipped into your pocket.",
        },
        basarisizSonuc: {
          mesaj: "The real vendor showed up and scolded you, and the customers scattered.",
        },
      },
      {
        metin: "End the joke, apologize.",
        basariliSonuc: {
          mesaj: "Everyone laughed, and you slipped away a bit embarrassed but unharmed.",
        },
        basarisizSonuc: {
          mesaj: "A few customers felt cheated and got angry.",
        },
      },
    ],
  },
  komik_sd_bisiklet_yarisi: {
    baslik: "The New Invention Bicycle Race",
    metin:
      "A small race is being organized with the newly arrived 'iron horses,' the bicycles. You've never ridden one, but the excitement carries you away.",
    secenekler: [
      {
        metin: "Jump on the bicycle, join the race.",
        basariliSonuc: {
          mesaj: "Wobbling and stumbling, you still crossed the finish line first!",
        },
        basarisizSonuc: {
          mesaj: "You never found your balance, fell three times — your knees ached for weeks.",
        },
      },
      {
        metin: "Watch from the side, place a small bet instead.",
        basariliSonuc: {
          mesaj: "You bet on the right rider and made a small profit.",
        },
        basarisizSonuc: {
          mesaj: "You lost the bet — at least it hit your purse, not your knees.",
        },
      },
    ],
  },
  komik_sd_muzedeki_heykel_taklidi: {
    baslik: "Mimicking the Museum Statue",
    metin:
      "You want to imitate the pose of a famous statue at the newly opened museum to make your friends laugh — but the attendant seems to be watching you.",
    secenekler: [
      {
        metin: "Step onto the pedestal, mimic the pose.",
        basariliSonuc: {
          mesaj: "Your friends couldn't stop laughing, and the attendant didn't even notice.",
        },
        basarisizSonuc: {
          mesaj: "The attendant pulled you down from the pedestal and warned you in front of everyone.",
        },
      },
      {
        metin: "Give up, just look at it.",
        basariliSonuc: {
          mesaj: "You calmly toured the statues; you didn't make anyone laugh, but you didn't get in trouble either.",
        },
        basarisizSonuc: {
          mesaj: "Your friends teased you a bit for being 'boring'.",
        },
      },
    ],
  },
  komik_sd_elektrik_deneyi_gonulluluk: {
    baslik: "Electric Experiment Volunteer",
    metin:
      "A science enthusiast in the square is demonstrating a new electricity experiment: 'Whoever touches this wire will see their hair stand on end!' He's looking for a volunteer.",
    secenekler: [
      {
        metin: "Volunteer, touch the wire.",
        basariliSonuc: {
          mesaj: "Your hair really did stand straight up, and the crowd cheered with laughter.",
        },
        basarisizSonuc: {
          mesaj: "You got a stronger shock than expected, and your hand went numb for a while.",
        },
      },
      {
        metin: "Watch from a distance.",
        basariliSonuc: {
          mesaj: "You watched the experiment safely and satisfied your curiosity.",
        },
        basarisizSonuc: {
          mesaj: "They teased you a bit for being a 'coward'.",
        },
      },
    ],
  },
  komik_sd_dans_salonu_yanlis_adim: {
    baslik: "The Wrong Step at the Dance Hall",
    metin:
      "At a fancy dance hall you attempted a new fashionable dance, but you have no idea what the steps actually are. Everyone's watching — keep going, or sit down?",
    secenekler: [
      {
        metin: "Keep going, improvise.",
        basariliSonuc: {
          mesaj: "Your improvised steps were mistaken for a new 'fashion,' and a few people even copied you.",
        },
        basarisizSonuc: {
          mesaj: "Your feet got tangled, you stepped on your partner's foot — the hall whispered your name.",
        },
      },
      {
        metin: "Step aside, just watch.",
        basariliSonuc: {
          mesaj: "You watched happily from the side, and no one said a word to you about it.",
        },
        basarisizSonuc: {
          mesaj: "A few people kept insistently asking 'why aren't you dancing,' which annoyed you a bit.",
        },
      },
    ],
  },
  komik_sd_polis_kiyafeti_sakasi: {
    baslik: "The Borrowed Police Uniform",
    metin:
      "Walking around in a police uniform you borrowed for a costume party, a real crowd took you seriously and started asking for help.",
    secenekler: [
      {
        metin: "Play the part, try to 'help'.",
        basariliSonuc: {
          mesaj: "You 'resolved' a simple dispute, and the crowd thanked you — no one realized the truth.",
        },
        basarisizSonuc: {
          mesaj: "A real policeman arrived at the scene and caught you in the fake uniform.",
        },
      },
      {
        metin: "Take off the uniform immediately, slip away.",
        basariliSonuc: {
          mesaj: "You slipped away from the crowd and stuffed the uniform into your bag.",
        },
        basarisizSonuc: {
          mesaj: "The buttons popped off while you were taking off the uniform, and you looked a bit odd.",
        },
      },
    ],
  },
  komik_sd_abartili_reklam_afisi: {
    baslik: "The Exaggerated Advertising Poster",
    metin:
      "In the poster you put up to advertise your own service, you exaggerated a bit too much — phrases like 'the best in the city' draw attention, but not everyone is convinced.",
    secenekler: [
      {
        metin: "Leave the poster as it is, defend the claim.",
        basariliSonuc: {
          mesaj: "The poster drew attention, and curious customers showed up at your door.",
        },
        basarisizSonuc: {
          mesaj: "A disappointed customer complained to everyone — the nickname 'master of exaggeration' stuck to you.",
        },
      },
      {
        metin: "Change the poster to more modest wording.",
        basariliSonuc: {
          mesaj: "Fewer customers came, but the ones who did left satisfied.",
        },
        basarisizSonuc: {
          mesaj: "The fee you paid to change the poster went to waste; hardly anyone was interested.",
        },
      },
    ],
  },
  komik_sd_maskeli_balo_karisikligi: {
    baslik: "Mistaken Identity at the Masked Ball",
    metin:
      "At a masked ball, someone mistook you for someone else and struck up a long, intimate conversation. Fix the mix-up, or keep playing along?",
    secenekler: [
      {
        metin: "Keep playing along, act like you're that person.",
        basariliSonuc: {
          mesaj: "You played an entertaining role all evening, and finally you both revealed the truth laughing.",
        },
        basarisizSonuc: {
          mesaj: "The person realized who you really were and introduced you to everyone as a 'fraud'.",
        },
      },
      {
        metin: "Correct the mistake right away.",
        basariliSonuc: {
          mesaj: "The person was embarrassed, and a brief apology closed the matter.",
        },
        basarisizSonuc: {
          mesaj: "The person didn't believe you and kept insisting on continuing the old conversation — it got a little strange.",
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
        metin: "Take the stage, enthusiastically demonstrate the invention.",
        basariliSonuc: {
          mesaj: "People really did show interest in the device, and the inventor paid your commission generously.",
        },
        basarisizSonuc: {
          mesaj: "The device broke right in the middle of the demonstration, and the hat went flying straight into a spectator's face.",
        },
      },
      {
        metin: "Decline the offer.",
        basariliSonuc: {
          mesaj: "The inventor found someone else, and you stayed out of it.",
        },
        basarisizSonuc: {
          mesaj: "When the invention drew great interest, you thought 'I should have said yes.'",
        },
      },
    ],
  },
  komik_sd_kagit_gemi_yarismasi: {
    baslik: "The Paper Boat Race",
    metin:
      "The neighborhood children are holding a paper boat race by the river and calling you to join them — a bit childish for a grown-up, but it looks like fun.",
    secenekler: [
      {
        metin: "Join in, build the best paper boat.",
        basariliSonuc: {
          mesaj: "Your boat was the first to cross the current, and the children hoisted you up on their shoulders.",
        },
        basarisizSonuc: {
          mesaj: "Even though your boat sank, you had a great time, laughing with the kids.",
        },
      },
      {
        metin: "Decline, say 'I'm a grown-up'.",
        basariliSonuc: {
          mesaj: "The children were disappointed, you kept your dignity but felt a little regret.",
        },
        basarisizSonuc: {
          mesaj: "The children teased you a bit for being 'stuck up,' which annoyed you.",
        },
      },
    ],
  },
  komik_sd_yeni_asansor_denemesi: {
    baslik: "The New Invention Elevator",
    metin:
      "In a newly built building, everyone is curious about but no one dares try the new invention — the 'elevator.' Do you want to be the first to test it?",
    secenekler: [
      {
        metin: "Get in first, try it out.",
        basariliSonuc: {
          mesaj: "You went up without a hitch, and were remembered as 'the first person in the city to ride an elevator'.",
        },
        basarisizSonuc: {
          mesaj: "The elevator got stuck halfway; it took half an hour to get you out with difficulty.",
        },
      },
      {
        metin: "Take the stairs instead, prefer to wait.",
        basariliSonuc: {
          mesaj: "You climbed the stairs, tired but safe.",
        },
        basarisizSonuc: {
          mesaj: "They teased you a bit for being a 'coward'.",
        },
      },
    ],
  },
  komik_sd_terzi_yanlis_kiyafet: {
    baslik: "The Tailor's Mistaken Cut",
    metin:
      "The outfit you ordered for an important invitation arrived with a strange, slightly ridiculous cut after the tailor made a mistake. Wear it anyway, or stay home?",
    secenekler: [
      {
        metin: "Wear the outfit, go to the invitation like this.",
        basariliSonuc: {
          mesaj: "Your confident bearing convinced everyone — a few people even asked if it was a 'new style'.",
        },
        basarisizSonuc: {
          mesaj: "Everyone stared strangely, and whispers followed you throughout the invitation.",
        },
      },
      {
        metin: "Go home, miss the invitation.",
        basariliSonuc: {
          mesaj: "You later learned you'd missed an important connection at the invitation.",
        },
        basarisizSonuc: {
          mesaj: "The tailor gave no compensation — you lost both the invitation and the money.",
        },
      },
    ],
  },
  komik_sd_sirkten_kacan_hayvan: {
    baslik: "The Escaped Circus Animal",
    metin:
      "A strange animal that escaped from the traveling circus (maybe a zebra, maybe just a painted donkey) is running loose through the streets. Will you help catch it?",
    secenekler: [
      {
        metin: "Chase after it, try to catch it.",
        basariliSonuc: {
          mesaj: "You cornered the animal and caught it — the circus owner paid you gratefully.",
        },
        basarisizSonuc: {
          mesaj: "The animal dragged you into a puddle and kept running.",
        },
      },
      {
        metin: "Watch from the side, don't get involved.",
        basariliSonuc: {
          mesaj: "You enjoyed watching the chaos, someone else caught the animal.",
        },
        basarisizSonuc: {
          mesaj: "The animal splashed mud on you as it ran right past you.",
        },
      },
    ],
  },
  komik_sd_mucize_makine_satisi: {
    baslik: "The Fake Miracle Machine",
    metin:
      "A con man offers to sell you a noisy machine he's billing as a 'cure for everything' — and you're thinking of selling it to someone else for a profit.",
    secenekler: [
      {
        metin: "Buy the machine, sell it to someone else as a 'miracle'.",
        basariliSonuc: {
          mesaj: "A gullible buyer bought the machine at double the price — your purse filled up, your conscience twinged a little.",
        },
        basarisizSonuc: {
          mesaj: "The machine practically exploded the first time it was switched on, and the buyer complained about you everywhere.",
        },
      },
      {
        metin: "Decline the offer, warn the con man.",
        basariliSonuc: {
          mesaj: "The con man didn't give up, but you left with a clear conscience.",
        },
        basarisizSonuc: {
          mesaj: "The con man sneered at you for having 'no taste', which annoyed you a bit.",
        },
      },
    ],
  },
  komik_sd_fabrika_dumaninda_isim_yazma: {
    baslik: "The Smokestack Name-Writing Bet",
    metin:
      "The young workers are arguing over a silly theory that you can 'write a name in the sky' with the shape of smoke from the factory chimney — someone put you in charge of proving it, by playing with the damper.",
    secenekler: [
      {
        metin: "Play with the damper, try to shape the smoke.",
        basariliSonuc: {
          mesaj: "The smoke really did take a strange shape, and everyone applauded you as the 'sky painter'.",
        },
        basarisizSonuc: {
          mesaj: "You set the damper wrong and jammed the machine, and the foreman docked the repair cost from your pay.",
        },
      },
      {
        metin: "Laugh off the theory and go back to work.",
        basariliSonuc: {
          mesaj: "You went back to work, and the theory hung in the air unresolved.",
        },
        basarisizSonuc: {
          mesaj: "They teased you a bit for 'having no imagination'.",
        },
      },
    ],
  },
};
