import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/komikGaripOlaylar.ts — İngilizce çevirileri. */
export const OLAYLAR_KOMIK_GARIP_EN: Record<string, OlayCeviri> = {
  komik_yeme_yarismasi: {
    baslik: "The Eating Contest",
    metin:
      "An eating contest is heating up in the square. The winner gets a week of free meals, but the stack of plates is terrifying.",
    secenekler: [
      {
        metin: "Join the contest.",
        basariliSonuc: {
          mesaj: "You finished the last plate! The crowd cheered; a week of free food is yours.",
        },
        basarisizSonuc: {
          mesaj: "You quit halfway; your stomach sulked for days.",
        },
      },
      {
        metin: "Watch from the side.",
        basariliSonuc: {
          mesaj: "You watched in comfort; your stomach thanked you.",
        },
        basarisizSonuc: {
          mesaj: "They called you 'coward'; you heard it, ignored it.",
        },
      },
    ],
  },
  komik_yanlis_sarki: {
    baslik: "Song in the Square",
    metin:
      "A traveling bard calls you onto the stage: 'Sing us a song!' The crowd waits, and you barely remember the words.",
    secenekler: [
      {
        metin: "Get up, sing whatever comes.",
        basariliSonuc: {
          mesaj: "Your voice came out surprisingly good; the crowd applauded.",
        },
        basarisizSonuc: {
          mesaj: "You mangled the words; for days they teased you as 'the bard'.",
        },
      },
      {
        metin: "Blush, thank them, decline.",
        basariliSonuc: {
          mesaj: "You declined politely; the bard called up someone else.",
        },
        basarisizSonuc: {
          mesaj: "They pushed; you fled, left with a small regret.",
        },
      },
    ],
  },
  komik_garip_yanlis_cenaze: {
    baslik: "The Wrong Funeral",
    metin:
      "You joined a crowded funeral lament, then realized the dead man is a stranger. Everyone takes you for a mourner.",
    secenekler: [
      {
        metin: "Keep up the act, keep wailing.",
        basariliSonuc: {
          mesaj: "No one noticed; someone even called it a 'heartfelt farewell'.",
        },
        basarisizSonuc: {
          mesaj: "You said the wrong name; everyone turned. You slunk off in shame.",
        },
      },
      {
        metin: "Slip out quietly.",
        basariliSonuc: {
          mesaj: "You got away unseen; it became a sweet memory.",
        },
        basarisizSonuc: {
          mesaj: "You bumped a chair on the way out and drew every eye.",
        },
      },
    ],
  },
  komik_kopekle_banyo: {
    baslik: "The Stubborn Dog",
    metin:
      "The neighbor's huge mud-caked dog is chasing you, ready to pounce. Run or brace yourself.",
    secenekler: [
      {
        metin: "Wrestle the dog, calm it.",
        basariliSonuc: {
          mesaj: "You calmed the dog; it trotted beside you, tail wagging.",
        },
        basarisizSonuc: {
          mesaj: "The dog bowled you over; muddy clothes, cleaning on your coin.",
        },
      },
      {
        metin: "Run to the end of the street.",
        basariliSonuc: {
          mesaj: "You barely escaped; the dog found something else.",
        },
        basarisizSonuc: {
          mesaj: "You tripped over a basket; the dog thought it a game.",
        },
      },
    ],
  },
  komik_dedikodu_ikilemi: {
    baslik: "The Spreading Gossip",
    metin:
      "A half-joking remark of yours spread through the market, blown up. Correct it, or let it grow?",
    secenekler: [
      {
        metin: "Let the story grow, enjoy it.",
        basariliSonuc: {
          mesaj: "Everyone talks of your 'legend'; you liked it.",
        },
        basarisizSonuc: {
          mesaj: "You overdid it; someone called you a liar.",
        },
      },
      {
        metin: "Tell the truth and correct it.",
        basariliSonuc: {
          mesaj: "You told everyone one by one; tiring, conscience clear.",
        },
        basarisizSonuc: {
          mesaj: "No one believed you; your 'correction' spiced the story up.",
        },
      },
    ],
  },
  komik_agir_tas_kaldirma: {
    baslik: "The Strongman Show",
    metin:
      "Youths in the square offer a prize to whoever lifts a huge stone. It's heavier than it looks, and the crowd is big.",
    secenekler: [
      {
        metin: "Give it all you've got.",
        basariliSonuc: {
          mesaj: "You hoisted the stone; the crowd went wild, prize yours.",
        },
        basarisizSonuc: {
          mesaj: "Your back gave out, the stone didn't budge; you hobbled for days.",
        },
      },
      {
        metin: "Decline: 'some other day'.",
        basariliSonuc: {
          mesaj: "You shrugged; nobody minded.",
        },
        basarisizSonuc: {
          mesaj: "They goaded you as 'weak'; you swallowed it.",
        },
      },
    ],
  },
  komik_kimlik_gizleme: {
    baslik: "The Fake Identity Prank",
    metin:
      "Friends want to slip you into a group of strangers as a 'mysterious stranger', just for fun. It takes nerve.",
    secenekler: [
      {
        metin: "Play the mysterious stranger.",
        basariliSonuc: {
          mesaj: "The group truly believed it; your friends nearly died laughing.",
        },
        basarisizSonuc: {
          mesaj: "You fumbled a question; the joke was out and some felt hurt.",
        },
      },
      {
        metin: "Give up, introduce yourself as you are.",
        basariliSonuc: {
          mesaj: "An ordinary introduction; nobody was hurt.",
        },
        basarisizSonuc: {
          mesaj: "Your friends teased you as a 'coward'.",
        },
      },
    ],
  },
  komik_beklenmedik_dans: {
    baslik: "The Unexpected Dance Invitation",
    metin:
      "At a celebration, a stranger offers you a dance. Everyone's watching, and you have two left feet.",
    secenekler: [
      {
        metin: "Accept, try to keep rhythm.",
        basariliSonuc: {
          mesaj: "You kept the steps; a few people copied you.",
        },
        basarisizSonuc: {
          mesaj: "Your feet tangled and you fell flat; the crowd roared.",
        },
      },
      {
        metin: "Decline politely.",
        basariliSonuc: {
          mesaj: "You smiled and declined; they found someone else.",
        },
        basarisizSonuc: {
          mesaj: "You refused sharply under pressure; the mood tensed.",
        },
      },
    ],
  },
  komik_hirsiz_yanlisligi: {
    baslik: "Mistaken for a Thief",
    metin:
      "Playing 'thief' with a friend, a real watchman mistook you for one and gave chase. Explain or run?",
    secenekler: [
      {
        metin: "Stop, explain with a laugh.",
        basariliSonuc: {
          mesaj: "The watchman laughed too: 'be more careful next time'.",
        },
        basarisizSonuc: {
          mesaj: "He didn't believe you, fined you lightly; your pride took a hit.",
        },
      },
      {
        metin: "Run, don't make it worse.",
        basariliSonuc: {
          mesaj: "You lost him in the alleys, breathless but free.",
        },
        basarisizSonuc: {
          mesaj: "You got caught; running made you look guiltier.",
        },
      },
    ],
  },
  komik_yanlis_takma_sakal: {
    baslik: "The Fake Beard",
    metin:
      "At a fun fair everyone wears ridiculous fake beards. It's your turn: take the most outrageous one?",
    secenekler: [
      {
        metin: "Wear the wildest one, take the stage.",
        basariliSonuc: {
          mesaj: "The crowd named you the show's funniest moment.",
        },
        basarisizSonuc: {
          mesaj: "The beard fell off at the worst moment; they laughed at you.",
        },
      },
      {
        metin: "Decline politely, watch.",
        basariliSonuc: {
          mesaj: "You watched; the show was fun enough.",
        },
        basarisizSonuc: {
          mesaj: "Your friends teased you as 'stuck up'.",
        },
      },
    ],
  },

  // ───────────────────────── MIDDLE AGES (25) ─────────────────────────
  komik_oc_turnuva_soytarisi: {
    baslik: "The Jester's Duel Challenge",
    metin:
      "Before the knights' tournament, the court jester challenges you to a wooden-sword duel; a crowd gathers.",
    secenekler: [
      {
        metin: "Accept, duel him.",
        basariliSonuc: {
          mesaj: "You beat the jester; the crowd crowned you 'warm-up star'.",
        },
        basarisizSonuc: {
          mesaj: "The jester floored you in three moves; they mocked you as 'swordmaster'.",
        },
      },
      {
        metin: "Decline, focus on the tournament.",
        basariliSonuc: {
          mesaj: "The jester found someone else; you focused on the tournament.",
        },
        basarisizSonuc: {
          mesaj: "The jester announced you as a 'coward knight-hopeful'; it stung.",
        },
      },
    ],
  },
  komik_oc_manastir_bira_kacirma: {
    baslik: "The Monastery's Secret Beer",
    metin:
      "A barrel of the monks' private beer sits forgotten in the cellar corner. With no one around, a mug is tempting.",
    secenekler: [
      {
        metin: "Quietly fill a mug.",
        basariliSonuc: {
          mesaj: "The beer was delicious; no one noticed.",
        },
        basarisizSonuc: {
          mesaj: "The head monk caught you; you swept the courtyard for days.",
        },
      },
      {
        metin: "Give up, stay out of the cellar.",
        basariliSonuc: {
          mesaj: "You resisted temptation; conscience clear.",
        },
        basarisizSonuc: {
          mesaj: "You thought about that beer all day.",
        },
      },
    ],
  },
  komik_oc_sato_hendegi: {
    baslik: "The Moat-Jumping Bet",
    metin:
      "You bet you could leap the castle's dry moat in one bound. It's wider than it looks, and the bottom is hard.",
    secenekler: [
      {
        metin: "Run back, then leap.",
        basariliSonuc: {
          mesaj: "You landed right on the edge! The crowd cheered; you won.",
        },
        basarisizSonuc: {
          mesaj: "You fell in the middle; the mud took ten minutes to escape.",
        },
      },
      {
        metin: "Turn down the bet.",
        basariliSonuc: {
          mesaj: "Someone said 'smart'; you tried to believe it.",
        },
        basarisizSonuc: {
          mesaj: "The 'coward' nickname stuck for a while.",
        },
      },
    ],
  },
  komik_oc_kral_taklidi: {
    baslik: "Mimicking the King",
    metin:
      "At the tavern, tipsy friends push you onto a stand to mimic the king. They say walls have ears.",
    secenekler: [
      {
        metin: "Do the impression, make them laugh.",
        basariliSonuc: {
          mesaj: "The tavern rang; some said you sounded as 'commanding' as the king.",
        },
        basarisizSonuc: {
          mesaj: "An informant heard; you nearly got reported for 'disrespect'.",
        },
      },
      {
        metin: "Decline, step down.",
        basariliSonuc: {
          mesaj: "You stepped down; they called you 'no fun' but it stayed harmless.",
        },
        basarisizSonuc: {
          mesaj: "They kept shoving; you slunk off grumpily.",
        },
      },
    ],
  },
  komik_oc_falci_kadin: {
    baslik: "The Village Fortune-Teller's Prophecy",
    metin:
      "The village fortune-teller gravely says: 'A donkey will bring you great misfortune!' The whole village watches you.",
    secenekler: [
      {
        metin: "Ignore the prophecy, carry on.",
        basariliSonuc: {
          mesaj: "Nothing happened; villagers began calling you 'brave'.",
        },
        basarisizSonuc: {
          mesaj: "A donkey kicked you, just as she said. The village believes her more.",
        },
      },
      {
        metin: "Take it seriously, avoid donkeys.",
        basariliSonuc: {
          mesaj: "You never went near one and stayed safe; everyone found you odd.",
        },
        basarisizSonuc: {
          mesaj: "Fleeing a donkey cart, you fell and were shamed, by fear, not fate.",
        },
      },
    ],
  },
  komik_oc_zirh_denemesi: {
    baslik: "The Borrowed Armor",
    metin:
      "A soldier friend lets you try his full armor. It's heavier than you thought; standing is a struggle.",
    secenekler: [
      {
        metin: "Try a few steps in the armor.",
        basariliSonuc: {
          mesaj: "Wobbling, you took a few steps; onlookers were impressed.",
        },
        basarisizSonuc: {
          mesaj: "You toppled on the second step, armor on top; two people lifted you.",
        },
      },
      {
        metin: "Just wear it, don't move.",
        basariliSonuc: {
          mesaj: "You felt the weight and took it off safely.",
        },
        basarisizSonuc: {
          mesaj: "A strap pinched your hand coming off; small scratch.",
        },
      },
    ],
  },
  komik_oc_ejderha_kemigi_satisi: {
    baslik: "The Fake Dragon Bone",
    metin:
      "A peddler tries to sell you an ox bone as 'dragon bone'; you're thinking of pulling the same trick on someone else.",
    secenekler: [
      {
        metin: "Buy it, resell as 'dragon bone'.",
        basariliSonuc: {
          mesaj: "You sold it to a gullible traveler for triple; conscience twinged, purse filled.",
        },
        basarisizSonuc: {
          mesaj: "The buyer showed a butcher; 'con artist' stuck to you.",
        },
      },
      {
        metin: "Call out his trick, don't buy.",
        basariliSonuc: {
          mesaj: "The peddler scowled; you left with a clear conscience.",
        },
        basarisizSonuc: {
          mesaj: "He sneered that you had 'no taste'; it stung.",
        },
      },
    ],
  },
  komik_oc_hamamda_karisiklik: {
    baslik: "Clothes Mix-Up at the Bathhouse",
    metin:
      "Leaving the bathhouse, you find your clothes mixed up with someone else's. He's still inside, impatiently searching.",
    secenekler: [
      {
        metin: "Go back, explain, swap clothes.",
        basariliSonuc: {
          mesaj: "He laughed too and you swapped with a chuckle; a new acquaintance.",
        },
        basarisizSonuc: {
          mesaj: "He got angry and yelled at you in front of everyone.",
        },
      },
      {
        metin: "Act oblivious and leave.",
        basariliSonuc: {
          mesaj: "No one noticed; you breathed easy.",
        },
        basarisizSonuc: {
          mesaj: "He chased you and caught you before everyone, shouting 'thief!'",
        },
      },
    ],
  },
  komik_oc_sahin_kacagi: {
    baslik: "The Noble's Escaped Falcon",
    metin:
      "A nobleman's falcon escaped onto a tree. He's panicking, you're right below; he promises a reward for its return.",
    secenekler: [
      {
        metin: "Climb the tree, catch the falcon.",
        basariliSonuc: {
          mesaj: "You caught it gently; the noble filled your pocket.",
        },
        basarisizSonuc: {
          mesaj: "It pecked your hand and you scrambled down, hand and pride bruised.",
        },
      },
      {
        metin: "Watch from afar, stay out.",
        basariliSonuc: {
          mesaj: "His servants caught it; you only watched.",
        },
        basarisizSonuc: {
          mesaj: "The noble glared: 'you could have helped'.",
        },
      },
    ],
  },
  komik_oc_yemin_toreni_karisikligi: {
    baslik: "The Muddled Oath",
    metin:
      "At a ceremony you must swear a loyalty oath, but when your turn comes you realize you never learned the words. The crowd waits.",
    secenekler: [
      {
        metin: "Improvise, speak confidently.",
        basariliSonuc: {
          mesaj: "Your made-up lines sounded so solid no one recalled the real text.",
        },
        basarisizSonuc: {
          mesaj: "Your sentences tangled; a few bit their lips to stifle laughter.",
        },
      },
      {
        metin: "Pause, ask someone for the words.",
        basariliSonuc: {
          mesaj: "After a brief silence you read the right text; no one minded.",
        },
        basarisizSonuc: {
          mesaj: "The wait soured the mood; people shifted uneasily.",
        },
      },
    ],
  },
  komik_oc_dilenci_kiligi_bahsi: {
    baslik: "The Beggar's Disguise Bet",
    metin:
      "Friends bet you can't collect much alms in a day dressed as a beggar. Pride takes a hit, but your purse may fill.",
    secenekler: [
      {
        metin: "Put on the disguise, collect alms.",
        basariliSonuc: {
          mesaj: "You made a surprisingly good 'beggar'; the purse filled.",
        },
        basarisizSonuc: {
          mesaj: "Someone recognized you and told everyone; you were a joke for days.",
        },
      },
      {
        metin: "Turn down the bet.",
        basariliSonuc: {
          mesaj: "Your friends were disappointed but respected it.",
        },
        basarisizSonuc: {
          mesaj: "They teased you as a 'coward'.",
        },
      },
    ],
  },
  komik_oc_ozan_yarismasi: {
    baslik: "The Bards' Contest",
    metin:
      "A last-minute spot opened in the fair's bard contest. Your verse is doubtful, but the prize is fine.",
    secenekler: [
      {
        metin: "Take the stage, improvise a poem.",
        basariliSonuc: {
          mesaj: "Your improvisation stunned everyone; the judges named you winner.",
        },
        basarisizSonuc: {
          mesaj: "The rhymes failed; the crowd smiled politely and cheered another.",
        },
      },
      {
        metin: "Give up, stay a spectator.",
        basariliSonuc: {
          mesaj: "You enjoyed the contest with nothing to prove.",
        },
        basarisizSonuc: {
          mesaj: "A twinge of regret: 'should I have tried?'",
        },
      },
    ],
  },
  komik_oc_kutsal_su_satisi: {
    baslik: "Fake Holy Water",
    metin:
      "A con man sells plain well water as 'holy spring water'; you think of buying a bottle to resell.",
    secenekler: [
      {
        metin: "Buy the bottle, resell it.",
        basariliSonuc: {
          mesaj: "You sold it to a believer for triple; conscience twinged, purse grew heavy.",
        },
        basarisizSonuc: {
          mesaj: "The buyer drank it, fell ill, and came for you.",
        },
      },
      {
        metin: "Expose the con man, buy nothing.",
        basariliSonuc: {
          mesaj: "The crowd chased him off and called you 'honest'.",
        },
        basarisizSonuc: {
          mesaj: "The con man escaped; no one thanked you.",
        },
      },
    ],
  },
  komik_oc_kacak_at_yarisi: {
    baslik: "The Illegal Horse Race",
    metin:
      "A chance to bet on an illegal midnight horse race. Winnings are good, but getting caught means trouble.",
    secenekler: [
      {
        metin: "Place the bet, watch the race.",
        basariliSonuc: {
          mesaj: "You won, purse heavier; but people noted you.",
        },
        basarisizSonuc: {
          mesaj: "You lost the money and an informant saw you.",
        },
      },
      {
        metin: "Stay away, go home.",
        basariliSonuc: {
          mesaj: "A quiet night at home, wondering what you missed.",
        },
        basarisizSonuc: {
          mesaj: "Hearing the winnings next day stung.",
        },
      },
    ],
  },
  komik_oc_soytari_yerine_gecme: {
    baslik: "Standing In for the Sick Jester",
    metin:
      "The feast's jester fell ill, and the panicked host begs you to take his place. The crowd waits.",
    secenekler: [
      {
        metin: "Accept, improvise jokes.",
        basariliSonuc: {
          mesaj: "Your act landed so well they took you for a real jester; the host paid well.",
        },
        basarisizSonuc: {
          mesaj: "Your jokes met a dead silence.",
        },
      },
      {
        metin: "Decline, help find someone.",
        basariliSonuc: {
          mesaj: "You helped find another entertainer; all relaxed.",
        },
        basarisizSonuc: {
          mesaj: "No one turned up, the feast fizzled; the host resented you.",
        },
      },
    ],
  },
  komik_oc_deniz_canavari_soylentisi: {
    baslik: "The Sea Monster Rumor",
    metin:
      "In the coastal village everyone talks of a 'sea monster' in the cove; some say giant fish, some old wreck. Go look?",
    secenekler: [
      {
        metin: "Take a boat to the cove, investigate.",
        basariliSonuc: {
          mesaj: "The 'monster' was a beached whale carcass; the village thanked you.",
        },
        basarisizSonuc: {
          mesaj: "The boat capsized; you returned soaked and empty-handed.",
        },
      },
      {
        metin: "Believe the rumor, stay away.",
        basariliSonuc: {
          mesaj: "Like the others you stayed away; the mystery remained.",
        },
        basarisizSonuc: {
          mesaj: "The kids teased you as a 'coward'.",
        },
      },
    ],
  },
  komik_oc_kilise_cani_sakasi: {
    baslik: "The Church Bell Prank",
    metin:
      "Friends propose ringing the church bell at midnight to rouse the village: 'just this once'.",
    secenekler: [
      {
        metin: "Ring the bell, run.",
        basariliSonuc: {
          mesaj: "The village rushed out in panic; you laughed behind the bushes.",
        },
        basarisizSonuc: {
          mesaj: "The priest caught you red-handed; you cleaned the courtyard for days.",
        },
      },
      {
        metin: "Back out, talk them out of it.",
        basariliSonuc: {
          mesaj: "Your friends were disappointed, but no one got in trouble.",
        },
        basarisizSonuc: {
          mesaj: "They did the prank without you; you were left out.",
        },
      },
    ],
  },
  komik_oc_haci_kilik_degistirme: {
    baslik: "Dressing as a Pilgrim",
    metin:
      "At an inn, pilgrims eat and sleep free. With little money, a disguise is tempting.",
    secenekler: [
      {
        metin: "Dress as a pilgrim, get free lodging.",
        basariliSonuc: {
          mesaj: "The innkeeper took you for a real pilgrim; you ate well, conscience itching.",
        },
        basarisizSonuc: {
          mesaj: "You fumbled his questions and were thrown out before everyone.",
        },
      },
      {
        metin: "Pay honestly.",
        basariliSonuc: {
          mesaj: "Though poor, you paid and slept in peace.",
        },
        basarisizSonuc: {
          mesaj: "You were short, and paid the gap, embarrassed.",
        },
      },
    ],
  },
  komik_oc_esek_pazarligi: {
    baslik: "The Donkey Haggle",
    metin:
      "At the market a merchant sells you a 'young, strong' donkey, but its eyes look weary. Buy, or haggle on?",
    secenekler: [
      {
        metin: "Haggle hard.",
        basariliSonuc: {
          mesaj: "You halved the price; the merchant grumbled and agreed.",
        },
        basarisizSonuc: {
          mesaj: "The merchant got angry and sold the donkey to another before your eyes.",
        },
      },
      {
        metin: "Pay the asking price.",
        basariliSonuc: {
          mesaj: "You bought it; three days later it proved far from young.",
        },
        basarisizSonuc: {
          mesaj: "The donkey refused to walk past the inn; your money gone, it stayed.",
        },
      },
    ],
  },
  komik_oc_kokusu_cikan_peynir: {
    baslik: "The Overpoweringly Ripe Cheese",
    metin:
      "The village's 'most matured' cheese is on the table, its reek filling the room. Finish a slice, win a bottle of wine.",
    secenekler: [
      {
        metin: "Eat a slice, hold your breath.",
        basariliSonuc: {
          mesaj: "You barely swallowed it but won the wine; the crowd applauded.",
        },
        basarisizSonuc: {
          mesaj: "You quit after one bite; your stomach took a while to recover.",
        },
      },
      {
        metin: "Decline politely.",
        basariliSonuc: {
          mesaj: "You declined easily; all understood.",
        },
        basarisizSonuc: {
          mesaj: "They teased you as 'fussy'.",
        },
      },
    ],
  },
  komik_oc_yel_degirmeninde_mahsur: {
    baslik: "Trapped in the Windmill",
    metin:
      "Out of curiosity you entered a windmill, and its sail began turning, trapping you. Force your way out, or call for help?",
    secenekler: [
      {
        metin: "Slip between the sails.",
        basariliSonuc: {
          mesaj: "You slipped out just in time, dusty but sound.",
        },
        basarisizSonuc: {
          mesaj: "A sail clipped your shoulder; you ached for days.",
        },
      },
      {
        metin: "Shout for help, wait.",
        basariliSonuc: {
          mesaj: "The miller opened the door; you became 'the man stuck in the mill'.",
        },
        basarisizSonuc: {
          mesaj: "No one heard; you waited till the wind died.",
        },
      },
    ],
  },
  komik_oc_soylu_papagan_taklidi: {
    baslik: "The Noble's Talking Crow",
    metin:
      "A nobleman's trained crow keeps repeating your nickname, delighting the crowd. Teach it something funnier, or walk away?",
    secenekler: [
      {
        metin: "Teach the crow something funnier.",
        basariliSonuc: {
          mesaj: "The crow picked it up and amused all; even the noble chuckled.",
        },
        basarisizSonuc: {
          mesaj: "The crow blurted it out at the worst moment, before the noble's guests.",
        },
      },
      {
        metin: "Walk away, stay out.",
        basariliSonuc: {
          mesaj: "The crow moved on to someone else's nickname; you relaxed.",
        },
        basarisizSonuc: {
          mesaj: "The crow kept shouting your nickname; leaving didn't help.",
        },
      },
    ],
  },
  komik_oc_kutsal_emanet_taklidi: {
    baslik: "The Fake Holy Relic Offer",
    metin:
      "A merchant sells a plain bone as 'the saint's finger' and proposes you resell it to the village's rich man.",
    secenekler: [
      {
        metin: "Accept, try to sell the bone.",
        basariliSonuc: {
          mesaj: "The rich villager bought it in a grand ceremony; your conscience and purse grew heavy.",
        },
        basarisizSonuc: {
          mesaj: "A monk saw through the forgery; you were disgraced in the square.",
        },
      },
      {
        metin: "Refuse, report the merchant.",
        basariliSonuc: {
          mesaj: "The merchant was driven out; your honesty was praised.",
        },
        basarisizSonuc: {
          mesaj: "No one listened; he carried on in another village.",
        },
      },
    ],
  },
  komik_oc_kutsal_relik_kuyrugu: {
    baslik: "The Long Relic Queue",
    metin:
      "You've queued for hours to see a holy relic. The man ahead keeps shoving to hold his spot.",
    secenekler: [
      {
        metin: "Try to push ahead.",
        basariliSonuc: {
          mesaj: "You slipped ahead skillfully; you're first to see the relic.",
        },
        basarisizSonuc: {
          mesaj: "The scuffle grew; attendants threw you both out.",
        },
      },
      {
        metin: "Wait patiently for your turn.",
        basariliSonuc: {
          mesaj: "After hours of waiting, you saw the relic in peace.",
        },
        basarisizSonuc: {
          mesaj: "The gates closed just before your turn; it waits till tomorrow.",
        },
      },
    ],
  },
  komik_oc_soytari_elbisesi_calinti: {
    baslik: "The Stolen Jester Costume",
    metin:
      "Wearing a jester costume as a joke, you're spotted by the real court jester shouting 'did you steal my costume?' Everyone watches.",
    secenekler: [
      {
        metin: "Say it's a joke, put on a show.",
        basariliSonuc: {
          mesaj: "You two improvised a show; the crowd loved it.",
        },
        basarisizSonuc: {
          mesaj: "The jester demanded the costume; you had to strip before everyone.",
        },
      },
      {
        metin: "Apologize, hand it over.",
        basariliSonuc: {
          mesaj: "You handed it over, the jester calmed, the matter closed.",
        },
        basarisizSonuc: {
          mesaj: "You tripped taking it off; the crowd laughed.",
        },
      },
    ],
  },

  // ───────────────────────── INDUSTRIAL REVOLUTION (25) ─────────────────────────
  komik_sd_fabrika_hiz_bahsi: {
    baslik: "Racing the Machine",
    metin:
      "Factory workers debate whether a man can outrun the new steam machine. It's your turn, everyone watching.",
    secenekler: [
      {
        metin: "Race the machine.",
        basariliSonuc: {
          mesaj: "Unbelievable, you beat it! The factory talked for days.",
        },
        basarisizSonuc: {
          mesaj: "The machine beat you badly; your arms ached for days.",
        },
      },
      {
        metin: "Decline, go back to work.",
        basariliSonuc: {
          mesaj: "You returned to work, deemed sensible.",
        },
        basarisizSonuc: {
          mesaj: "A few workers goaded you as a 'coward'.",
        },
      },
    ],
  },
  komik_sd_balon_ucusu: {
    baslik: "The Hot Air Balloon Offer",
    metin:
      "A traveling inventor offers a flight in his new hot air balloon. 'Perfectly safe,' he says, not sounding sure.",
    secenekler: [
      {
        metin: "Climb in, try the flight.",
        basariliSonuc: {
          mesaj: "You saw the city from above! You landed to cries of 'sky traveler'.",
        },
        basarisizSonuc: {
          mesaj: "The balloon sank; the basket scraped a roof and landed hard.",
        },
      },
      {
        metin: "Politely decline.",
        basariliSonuc: {
          mesaj: "You stayed grounded; the inventor found another.",
        },
        basarisizSonuc: {
          mesaj: "Watching the flight, regret lingered.",
        },
      },
    ],
  },
  komik_sd_foto_studyosu_pozu: {
    baslik: "The New Photograph Camera",
    metin:
      "A new photo studio offers a free trial shot, but holding still takes long; one twitch blurs everything.",
    secenekler: [
      {
        metin: "Strike a serious pose, don't move.",
        basariliSonuc: {
          mesaj: "A magnificent photo; you framed it and hung it at home.",
        },
        basarisizSonuc: {
          mesaj: "You scratched at the wrong moment, a blurry ghost; no refund.",
        },
      },
      {
        metin: "Pull a funny face.",
        basariliSonuc: {
          mesaj: "Even the photographer laughed and hung it in his window.",
        },
        basarisizSonuc: {
          mesaj: "He said you ruined his 'serious art' and charged extra.",
        },
      },
    ],
  },
  komik_sd_tren_at_arabasi_yarisi: {
    baslik: "Train or Horse Cart?",
    metin:
      "At the station someone bet big that a horse cart can outrun the new train. You may place a small bet.",
    secenekler: [
      {
        metin: "Bet on the train.",
        basariliSonuc: {
          mesaj: "The train won easily; you pocketed the bet.",
        },
        basarisizSonuc: {
          mesaj: "The train broke down; the cart passed, roaring with laughter.",
        },
      },
      {
        metin: "Bet on the horse cart.",
        basariliSonuc: {
          mesaj: "The train truly broke down! Everyone stunned, you profited.",
        },
        basarisizSonuc: {
          mesaj: "The train won easily; they teased you as 'old-fashioned'.",
        },
      },
    ],
  },
  komik_sd_sirk_gosterisi_daveti: {
    baslik: "The Traveling Circus Invitation",
    metin:
      "The traveling circus owner needs a volunteer and calls you up to help with the fire-eating act.",
    secenekler: [
      {
        metin: "Take the stage, help out.",
        basariliSonuc: {
          mesaj: "The trick went flawlessly; a standing ovation.",
        },
        basarisizSonuc: {
          mesaj: "A spark leapt onto your arm; the show was cut short.",
        },
      },
      {
        metin: "Decline politely, watch.",
        basariliSonuc: {
          mesaj: "He found someone else; you enjoyed the show.",
        },
        basarisizSonuc: {
          mesaj: "They teased you a bit as a 'coward'.",
        },
      },
    ],
  },
  komik_sd_gazeteye_yalan_haber: {
    baslik: "The Exaggerated Newspaper Story",
    metin:
      "A local reporter wants a striking story. Yours is ordinary, but exaggerated it could make headlines.",
    secenekler: [
      {
        metin: "Dress up the story, make headlines.",
        basariliSonuc: {
          mesaj: "It made headlines, everyone talks of you; a small fee too.",
        },
        basarisizSonuc: {
          mesaj: "A reader proved it false, the paper apologized; you were disgraced.",
        },
      },
      {
        metin: "Tell your real, ordinary story.",
        basariliSonuc: {
          mesaj: "It got a small corner, little notice, but you stayed honest.",
        },
        basarisizSonuc: {
          mesaj: "The reporter found it 'boring' and never printed it.",
        },
      },
    ],
  },
  komik_sd_muzikli_kutu_denemesi: {
    baslik: "The New Music Box",
    metin:
      "A shop displays the new music box. The shopkeeper invites you to turn the crank; a crowd watches.",
    secenekler: [
      {
        metin: "Turn the crank, dance.",
        basariliSonuc: {
          mesaj: "The music swept you up; a few joined your dance.",
        },
        basarisizSonuc: {
          mesaj: "You cranked too hard and broke it; you paid damages.",
        },
      },
      {
        metin: "Watch from afar, don't touch.",
        basariliSonuc: {
          mesaj: "You enjoyed the music and harmed no one.",
        },
        basarisizSonuc: {
          mesaj: "The shopkeeper pressed you to try; it annoyed you.",
        },
      },
    ],
  },
  komik_sd_sahte_grev_sakasi: {
    baslik: "The Fake Strike Prank",
    metin:
      "Coworkers suggest scaring the boss with a fake 'mass strike', just a few minutes of chaos.",
    secenekler: [
      {
        metin: "Join the prank, shout along.",
        basariliSonuc: {
          mesaj: "The boss panicked, then laughed himself silly on realizing.",
        },
        basarisizSonuc: {
          mesaj: "He took it seriously, opened an inquiry, and blacklisted you.",
        },
      },
      {
        metin: "Don't join, mind your work.",
        basariliSonuc: {
          mesaj: "You stayed aside; it blew over quickly.",
        },
        basarisizSonuc: {
          mesaj: "Coworkers teased you as a 'stick in the mud'.",
        },
      },
    ],
  },
  komik_sd_telgraf_yanlisligi: {
    baslik: "The Telegraph Mix-Up",
    metin:
      "The telegraph clerk garbled your message; the other side now expects something you never meant. Fix it or leave it?",
    secenekler: [
      {
        metin: "Send a new telegram to fix it.",
        basariliSonuc: {
          mesaj: "You cleared it up and they understood; it cost a bit.",
        },
        basarisizSonuc: {
          mesaj: "The second telegram got garbled too; things got worse.",
        },
      },
      {
        metin: "Leave it, see what happens.",
        basariliSonuc: {
          mesaj: "The mix-up turned in your favor; an unexpected windfall.",
        },
        basarisizSonuc: {
          mesaj: "They refused to do business; you were called 'unreliable'.",
        },
      },
    ],
  },
  komik_sd_lokomotif_iskele_pozu: {
    baslik: "Posing in Front of the Locomotive",
    metin:
      "At the station, friends want a 'daring pose' in front of the huge locomotive, just as it's about to depart.",
    secenekler: [
      {
        metin: "Step forward, pose bravely.",
        basariliSonuc: {
          mesaj: "The photo taken as the whistle blew became legend; everyone wanted a copy.",
        },
        basarisizSonuc: {
          mesaj: "The train left early; you leapt clear at the last second, heart pounding.",
        },
      },
      {
        metin: "Pose from a safe distance.",
        basariliSonuc: {
          mesaj: "An ordinary but safe keepsake photo.",
        },
        basarisizSonuc: {
          mesaj: "Friends teased you as a 'coward'.",
        },
      },
    ],
  },
  komik_sd_sokak_satici_taklidi: {
    baslik: "The Street Vendor Impression",
    metin:
      "For fun you mimicked a street vendor's shouting, and a few curious people crowded round to actually buy.",
    secenekler: [
      {
        metin: "Keep up the act, 'sell' your odds and ends.",
        basariliSonuc: {
          mesaj: "The joke became a real sale; unexpected money in your pocket.",
        },
        basarisizSonuc: {
          mesaj: "The real vendor arrived and scolded you; customers scattered.",
        },
      },
      {
        metin: "End the joke, apologize.",
        basariliSonuc: {
          mesaj: "All laughed; you slipped away embarrassed but unharmed.",
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
      "A small race is held on the newly arrived 'iron horses', bicycles. You've never ridden one, but you're excited.",
    secenekler: [
      {
        metin: "Hop on, join the race.",
        basariliSonuc: {
          mesaj: "Wobbling and stumbling, you crossed the line first!",
        },
        basarisizSonuc: {
          mesaj: "You never found balance, fell three times; your knees ached for weeks.",
        },
      },
      {
        metin: "Watch from the side, bet instead.",
        basariliSonuc: {
          mesaj: "You backed the right rider and made a small profit.",
        },
        basarisizSonuc: {
          mesaj: "You lost the bet; at least your purse hurt, not your knees.",
        },
      },
    ],
  },
  komik_sd_muzedeki_heykel_taklidi: {
    baslik: "Mimicking the Museum Statue",
    metin:
      "You want to mimic a famous statue's pose at the new museum to amuse friends, but the attendant seems to be watching.",
    secenekler: [
      {
        metin: "Climb the pedestal, mimic the pose.",
        basariliSonuc: {
          mesaj: "Your friends cracked up; the attendant never noticed.",
        },
        basarisizSonuc: {
          mesaj: "The attendant pulled you down and warned you before everyone.",
        },
      },
      {
        metin: "Give up, just look.",
        basariliSonuc: {
          mesaj: "You toured calmly; no laughs, but no trouble.",
        },
        basarisizSonuc: {
          mesaj: "Friends teased you as 'boring'.",
        },
      },
    ],
  },
  komik_sd_elektrik_deneyi_gonulluluk: {
    baslik: "Electric Experiment Volunteer",
    metin:
      "A science buff in the square shows an electricity experiment: 'Touch this wire and watch your hair stand on end!' He wants a volunteer.",
    secenekler: [
      {
        metin: "Volunteer, touch the wire.",
        basariliSonuc: {
          mesaj: "Your hair stood on end; the crowd cheered with laughter.",
        },
        basarisizSonuc: {
          mesaj: "A stronger shock than expected; your hand went numb a while.",
        },
      },
      {
        metin: "Watch from afar.",
        basariliSonuc: {
          mesaj: "You watched safely and satisfied your curiosity.",
        },
        basarisizSonuc: {
          mesaj: "They teased you as a 'coward'.",
        },
      },
    ],
  },
  komik_sd_dans_salonu_yanlis_adim: {
    baslik: "The Wrong Step at the Dance Hall",
    metin:
      "At a fancy dance hall you tried a new fashionable dance without knowing the steps. Everyone watches: carry on or sit?",
    secenekler: [
      {
        metin: "Keep going, improvise.",
        basariliSonuc: {
          mesaj: "Your steps were mistaken for a new 'fashion'; a few copied you.",
        },
        basarisizSonuc: {
          mesaj: "Your feet tangled, you stepped on your partner; the hall whispered your name.",
        },
      },
      {
        metin: "Step aside, watch.",
        basariliSonuc: {
          mesaj: "You watched happily; no one said a word.",
        },
        basarisizSonuc: {
          mesaj: "Some kept asking 'why aren't you dancing'; it irked you.",
        },
      },
    ],
  },
  komik_sd_polis_kiyafeti_sakasi: {
    baslik: "The Borrowed Police Uniform",
    metin:
      "Strolling in a police uniform borrowed for a costume ball, a real crowd takes you seriously and asks for help.",
    secenekler: [
      {
        metin: "Play the part, 'help'.",
        basariliSonuc: {
          mesaj: "You 'settled' a dispute; the crowd thanked you, none the wiser.",
        },
        basarisizSonuc: {
          mesaj: "A real policeman arrived and caught you in the fake uniform.",
        },
      },
      {
        metin: "Strip the uniform, slip away.",
        basariliSonuc: {
          mesaj: "You slipped off and stuffed the uniform in your bag.",
        },
        basarisizSonuc: {
          mesaj: "Buttons popped off as you undressed; you looked odd.",
        },
      },
    ],
  },
  komik_sd_abartili_reklam_afisi: {
    baslik: "The Exaggerated Advertising Poster",
    metin:
      "Your own service poster oversells: 'best in the city' draws attention but not everyone is convinced.",
    secenekler: [
      {
        metin: "Leave the poster, defend the claim.",
        basariliSonuc: {
          mesaj: "The poster drew curious customers to your door.",
        },
        basarisizSonuc: {
          mesaj: "A disappointed customer complained to all; 'master of exaggeration' stuck.",
        },
      },
      {
        metin: "Reword the poster modestly.",
        basariliSonuc: {
          mesaj: "Fewer customers came, but they left satisfied.",
        },
        basarisizSonuc: {
          mesaj: "The fee for changing it was wasted; hardly anyone cared.",
        },
      },
    ],
  },
  komik_sd_maskeli_balo_karisikligi: {
    baslik: "Mistaken Identity at the Masked Ball",
    metin:
      "At a masked ball, someone mistakes you for another and starts an intimate chat. Correct it, or play along?",
    secenekler: [
      {
        metin: "Play along, act as that person.",
        basariliSonuc: {
          mesaj: "You played a fun role all night; finally you both laughed and revealed it.",
        },
        basarisizSonuc: {
          mesaj: "They realized who you were and introduced you as a 'fraud'.",
        },
      },
      {
        metin: "Correct the mistake at once.",
        basariliSonuc: {
          mesaj: "They were embarrassed; a brief apology ended it.",
        },
        basarisizSonuc: {
          mesaj: "They didn't believe you and kept chatting; it got strange.",
        },
      },
    ],
  },
  komik_sd_yeni_icat_sunumu: {
    baslik: "The Odd Invention Demonstration",
    metin:
      "An inventor asks you to demo his odd device, a 'self-fanning hat', to the public for a commission.",
    secenekler: [
      {
        metin: "Take the stage, demo the invention.",
        basariliSonuc: {
          mesaj: "People took real interest; the inventor paid you generously.",
        },
        basarisizSonuc: {
          mesaj: "It broke mid-demo and the hat flew into a spectator's face.",
        },
      },
      {
        metin: "Decline the offer.",
        basariliSonuc: {
          mesaj: "The inventor found someone else; you stayed out.",
        },
        basarisizSonuc: {
          mesaj: "When it drew interest, you thought 'I should have said yes'.",
        },
      },
    ],
  },
  komik_sd_kagit_gemi_yarismasi: {
    baslik: "The Paper Boat Race",
    metin:
      "Neighborhood kids hold a paper boat race by the river and invite you. Childish for a grown-up, but fun.",
    secenekler: [
      {
        metin: "Join in, build the best boat.",
        basariliSonuc: {
          mesaj: "Your boat crossed the current first; the kids hoisted you onto their shoulders.",
        },
        basarisizSonuc: {
          mesaj: "Your boat sank, but you had a blast laughing with the kids.",
        },
      },
      {
        metin: "Decline: 'I'm a grown-up'.",
        basariliSonuc: {
          mesaj: "The kids were disappointed; you kept your dignity, with some regret.",
        },
        basarisizSonuc: {
          mesaj: "The kids teased you as 'stuck up'; it annoyed you.",
        },
      },
    ],
  },
  komik_sd_yeni_asansor_denemesi: {
    baslik: "The New Invention Elevator",
    metin:
      "In a new building the 'elevator' intrigues everyone, but no one dares ride it. Be the first?",
    secenekler: [
      {
        metin: "Ride it first.",
        basariliSonuc: {
          mesaj: "A smooth ride; you're remembered as the city's first elevator rider.",
        },
        basarisizSonuc: {
          mesaj: "It stuck halfway; it took half an hour to get you out.",
        },
      },
      {
        metin: "Take the stairs, wait.",
        basariliSonuc: {
          mesaj: "You climbed the stairs, tired but safe.",
        },
        basarisizSonuc: {
          mesaj: "They teased you as a 'coward'.",
        },
      },
    ],
  },
  komik_sd_terzi_yanlis_kiyafet: {
    baslik: "The Tailor's Mistaken Cut",
    metin:
      "The outfit you ordered for an important invitation came out with a strange, ridiculous cut after the tailor's error. Wear it, or stay home?",
    secenekler: [
      {
        metin: "Wear it, go anyway.",
        basariliSonuc: {
          mesaj: "Your confidence convinced all; a few asked if it was a 'new style'.",
        },
        basarisizSonuc: {
          mesaj: "Everyone stared; whispers dogged you all evening.",
        },
      },
      {
        metin: "Go home, miss the invitation.",
        basariliSonuc: {
          mesaj: "You later learned you missed an important contact.",
        },
        basarisizSonuc: {
          mesaj: "The tailor paid nothing; you lost the party and the money.",
        },
      },
    ],
  },
  komik_sd_sirkten_kacan_hayvan: {
    baslik: "The Escaped Circus Animal",
    metin:
      "A strange animal escaped from the circus (a zebra, or a painted donkey?) is running loose in the streets. Help catch it?",
    secenekler: [
      {
        metin: "Chase and catch it.",
        basariliSonuc: {
          mesaj: "You cornered and caught it; the circus owner paid gratefully.",
        },
        basarisizSonuc: {
          mesaj: "It dragged you into a puddle and kept running.",
        },
      },
      {
        metin: "Watch from the side, stay out.",
        basariliSonuc: {
          mesaj: "You enjoyed the chaos; others caught it.",
        },
        basarisizSonuc: {
          mesaj: "It splashed mud on you as it ran past.",
        },
      },
    ],
  },
  komik_sd_mucize_makine_satisi: {
    baslik: "The Fake Miracle Machine",
    metin:
      "A con man sells a noisy 'cure-all' machine; you plan to resell it for the difference.",
    secenekler: [
      {
        metin: "Buy it, resell as a 'miracle'.",
        basariliSonuc: {
          mesaj: "A gullible buyer paid double; purse full, conscience twinged.",
        },
        basarisizSonuc: {
          mesaj: "The machine blew up at first start; the buyer complained everywhere.",
        },
      },
      {
        metin: "Refuse, warn the con man.",
        basariliSonuc: {
          mesaj: "He didn't relent, but you left with a clear conscience.",
        },
        basarisizSonuc: {
          mesaj: "He sneered that you had 'no taste'; it stung.",
        },
      },
    ],
  },
  komik_sd_fabrika_dumaninda_isim_yazma: {
    baslik: "The Smokestack Name-Writing Bet",
    metin:
      "Workers argue that smoke from the factory chimney can write a name in the sky; they dare you to prove it with the damper.",
    secenekler: [
      {
        metin: "Play with the damper, shape the smoke.",
        basariliSonuc: {
          mesaj: "The smoke took a strange shape; everyone cheered you as the 'sky painter'.",
        },
        basarisizSonuc: {
          mesaj: "You set the damper wrong and jammed the machine; the foreman docked your pay.",
        },
      },
      {
        metin: "Laugh off the theory, back to work.",
        basariliSonuc: {
          mesaj: "You went back to work; the theory hung unresolved.",
        },
        basarisizSonuc: {
          mesaj: "They teased you for having 'no imagination'.",
        },
      },
    ],
  },
};
