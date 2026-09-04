import type { OlayCeviri } from "./index";

/**
 * sosyallesme.ts — Sosyalleşme mekânı olaylarının İngilizce çevirisi (73 olay).
 * Türkçe kaynak kanonik; yalnız gösterim metinleri burada.
 * {birim} = para birimi, {rakip} = rakip adı — birebir korunur.
 */
export const OLAYLAR_SOSYALLESME_EN: Record<string, OlayCeviri> = {
  // ===== MEYHANE / TAVERN =====
  sosyal_meyhane_bilek_guresi: {
    baslik: "An Arm-Wrestling Bet",
    metin: "In the noisiest corner of the tavern an arm-wrestling tournament is running. Free drinks all night for the winner, laughter as a prize for the loser.",
    secenekler: [
      {
        metin: "Take the challenge; sit down at the table.",
        ipucu: "Win for renown and a cup, lose for a sore arm and wounded pride",
        basariliSonuc: {
          mesaj: "You slammed your opponent's arm to the table! The tavern cheered in your honor; the night's drinks were free.",
          detay: "Your arm ached the next day, but the number of people who know you on the street rose overnight.",
        },
        basarisizSonuc: {
          mesaj: "Your arm crashed to the table with a thud; the laughter around you rang in your ears.",
        },
      },
      {
        metin: "Watch from the side; bet on the winner.",
        ipucu: "Small risk, small gain",
        basariliSonuc: {
          mesaj: "You bet on the right wrestler; a few {birim} went into your pocket.",
        },
        basarisizSonuc: {
          mesaj: "You bet on the wrong wrestler; the tavern keeper pocketed your stake.",
        },
      },
    ],
  },
  sosyal_meyhane_kucuk_hirsiz: {
    baslik: "Nimble Fingers",
    metin: "In the crowd you noticed the hand of a thin-fingered child sliding toward your purse.",
    secenekler: [
      {
        metin: "Grab his wrist; go after him.",
        ipucu: "Catch him and you keep your money, if he runs a small loss",
        basariliSonuc: {
          mesaj: "You caught his wrist at the last moment; the child mumbled an apology in fear and melted into the dark.",
          detay: "The tavern keeper stood you a drink: 'Keep your eyes open always, lad.'",
        },
        basarisizSonuc: {
          mesaj: "The child freed his hand and vanished into the crowd with a few {birim} from your purse.",
        },
      },
      {
        metin: "Ignore it; you have little to lose anyway.",
        basariliSonuc: {
          mesaj: "You ignored it; clearly the poor child found someone hungrier.",
        },
        basarisizSonuc: {
          mesaj: "While you ignored it, your purse quietly grew a little lighter.",
        },
      },
    ],
  },
  sosyal_meyhane_gizemli_yabanci: {
    baslik: "The Hooded Stranger",
    metin: "A hooded stranger sitting at the corner table beckons you over. His face is in shadow, his voice speaks with a strange accent: 'I need someone like you.'",
    secenekler: [
      {
        metin: "Sit down; hear what he wants.",
        ipucu: "A mysterious acquaintance gained, or an empty threat",
        basariliSonuc: {
          mesaj: "The stranger whispered tales of a distant land; as he left he set down a coin marked with a strange symbol.",
          detay: "You still do not know who he was, but you felt once again that the world is larger than you thought.",
        },
        basarisizSonuc: {
          mesaj: "What he told was only the tall tales of a drunk sailor. You wasted your time.",
        },
      },
      {
        metin: "Decline politely; return to your own table.",
        basariliSonuc: {
          mesaj: "You did not drop your guard. The stranger shrugged and withdrew into the dark.",
        },
        basarisizSonuc: {
          mesaj: "Despite your refusal the man laughed strangely at your back; an unease settled inside you.",
        },
      },
    ],
  },
  sosyal_meyhane_sarki_yarismasi: {
    baslik: "A Folk Song Contest",
    metin: "The minstrel climbs onto a table and opens a contest for who can sing the best and loudest. The crowd has already raised its cups; you are next.",
    secenekler: [
      {
        metin: "Get up on stage; give it your all.",
        ipucu: "If it lands, great renown; if not, great embarrassment",
        basariliSonuc: {
          mesaj: "Your voice brought the tavern to its feet! Everyone sang the chorus with you.",
          detay: "After this night you started hearing 'there's that singer' whispered on the street.",
        },
        basarisizSonuc: {
          mesaj: "Your voice sounded like a screeching cat; the crowd fell about laughing, and you slumped back to your table, red-faced.",
        },
      },
      {
        metin: "Do not join in; just watch and applaud.",
        basariliSonuc: {
          mesaj: "You had a fine evening, and without the risk of embarrassment.",
        },
        basarisizSonuc: {
          mesaj: "It was an ordinary, forgettable evening.",
        },
      },
    ],
  },
  sosyal_meyhane_masa_kavgasi: {
    baslik: "The Overturned Table",
    metin: "Two drunks started arguing about who had drunk more; the argument quickly turned into a table-flipping contest. Fists are flying.",
    secenekler: [
      {
        metin: "Step in; break up the fight.",
        ipucu: "Succeed for renown and gratitude, fail for a loss of health",
        basariliSonuc: {
          mesaj: "You managed to pull the two fighters apart; the tavern looks at you with gratitude.",
        },
        basarisizSonuc: {
          mesaj: "As you stepped in, a fist landed on you too. You did not even see whose it was.",
        },
      },
      {
        metin: "Grab your table; retreat to a corner.",
        basariliSonuc: {
          mesaj: "You showed good sense, watched the fight from a distance and saved your cup.",
        },
        basarisizSonuc: {
          mesaj: "An overturned table came right down on you; your back ached and your cup broke.",
        },
      },
    ],
  },
  sosyal_meyhane_kucuk_kumar: {
    baslik: "A Card Game Under the Table",
    metin: "At the back table, out of sight, a forbidden card game is running. They point you to a chair too.",
    secenekler: [
      {
        metin: "Sit down; join the game.",
        ipucu: "Win money or lose money — plus a risk of getting caught",
        basariliSonuc: {
          mesaj: "The cards fell your way; you left the table with your pockets full.",
        },
        basarisizSonuc: {
          mesaj: "You drew a bad hand and left the table empty-handed. At least the guards did not come.",
        },
      },
      {
        metin: "Thank them; do not join.",
        basariliSonuc: {
          mesaj: "You kept your head; you touched neither your money nor your clean record.",
        },
        basarisizSonuc: {
          mesaj: "The players teased you as a coward, but you did not care.",
        },
      },
    ],
  },
  sosyal_meyhane_meyhaneci_dedikodu: {
    baslik: "The Tavern Keeper's Whisper",
    metin: "As he fills your cup the tavern keeper lowers his voice and says he has heard something interesting about {rakip}.",
    secenekler: [
      {
        metin: "Lend an ear; stand a round.",
        ipucu: "A small advantage against your rival",
        basariliSonuc: {
          mesaj: "What he told was the useful kind; you now have a card of your own against {rakip}.",
        },
        basarisizSonuc: {
          mesaj: "What he told was old gossip everyone already knew. Your money was wasted.",
        },
      },
      {
        metin: "Say you are not interested.",
        basariliSonuc: {
          mesaj: "You did not chase the gossip; the tavern keeper shrugged and turned to someone else.",
        },
        basarisizSonuc: {
          mesaj: "Though you seemed uninterested, curiosity gnawed at you all night.",
        },
      },
    ],
  },
  sosyal_meyhane_sarhos_filozof: {
    baslik: "The Drunk Philosopher",
    metin: "An old man sitting alone at his table launches, unasked, into an unbroken lecture on the meaning of life. No one is listening — you are.",
    secenekler: [
      {
        metin: "Sit down; take him seriously.",
        ipucu: "An unexpected wisdom, or an absurd waste of time",
        basariliSonuc: {
          mesaj: "Among his words you found a real flicker of wisdom behind the drunkenness.",
          detay: "'Everyone dies one day, but few truly live,' he said, and raised his cup; that sentence stayed with you.",
        },
        basarisizSonuc: {
          mesaj: "After an hour you understood the man just loved the sound of his own voice.",
        },
      },
      {
        metin: "Smile; walk away.",
        basariliSonuc: {
          mesaj: "You walked away politely and spent the rest of the evening in peace.",
        },
        basarisizSonuc: {
          mesaj: "Even as you walked away he kept shouting his lecture at your back.",
        },
      },
    ],
  },
  sosyal_meyhane_yarisma_iddiasi: {
    baslik: "The Legendary Drinking Bet",
    metin: "The tavern's tough guy proposes a bet on who collapses onto the table first; the prize is the whole night's takings and a title too.",
    secenekler: [
      {
        metin: "Accept the bet; go to the end.",
        ipucu: "Very risky — great renown or a very bad morning, or worse",
        basariliSonuc: {
          mesaj: "Your opponent collapsed onto the table, and you are still standing! The tavern screamed in your honor.",
          detay: "Your head split the next day, but you are a legendary name in this tavern now.",
        },
        basarisizSonuc: {
          mesaj: "After the tenth cup you collapsed onto the table; you woke with a headache lasting days.",
          detay: "The tavern keepers called you 'yesterday's child' for weeks.",
        },
      },
      {
        metin: "Use your head; refuse the bet.",
        basariliSonuc: {
          mesaj: "You did not risk your health; the tough guy labeled you 'smart but boring', and you did not care.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was read as cowardice in some circles.",
        },
      },
    ],
  },
  sosyal_meyhane_eski_dost: {
    baslik: "The Face at the Other End of the Table",
    metin: "A drunk man comes over to your table and talks with you at length. As you talk you realize he is both skilled and looking for work.",
    secenekler: [
      {
        metin: "Make him an offer; take him onto your crew.",
        ipucu: "A chance to gain a new crew member",
        basariliSonuc: {
          mesaj: "He accepted your offer; behind the drunkenness there really was someone useful.",
        },
        basarisizSonuc: {
          mesaj: "He laughed off your offer: 'You won't even remember me tomorrow.' He was right; you did not.",
        },
      },
      {
        metin: "Just chat; do not offer him work.",
        basariliSonuc: {
          mesaj: "You had a pleasant chat, without any obligation.",
        },
        basarisizSonuc: {
          mesaj: "The chat was scattered; in the morning you barely remembered what you talked about.",
        },
      },
    ],
  },
  sosyal_meyhane_soguk_savas_husumeti: {
    baslik: "Stares from the Table Across",
    metin: "{rakip} is sitting at the table across, not taking his eyes off you. He raises his cup and swings it mockingly in your direction.",
    secenekler: [
      {
        metin: "Raise your cup; challenge him.",
        ipucu: "The tension grows, but the crowd backs you — or you are humiliated",
        basariliSonuc: {
          mesaj: "You won the verbal duel; the crowd took your side and {rakip} stormed out in anger.",
        },
        basarisizSonuc: {
          mesaj: "{rakip}'s sharp tongue shut you up; you were humiliated in front of everyone.",
        },
      },
      {
        metin: "Ignore it; turn your back.",
        basariliSonuc: {
          mesaj: "You did not rise to the provocation; after a while {rakip} lost interest.",
        },
        basarisizSonuc: {
          mesaj: "Even your ignoring him only egged {rakip} on; he heckled you all night.",
        },
      },
    ],
  },
  sosyal_meyhane_yabanci_duello: {
    baslik: "A Matter of Honor",
    metin: "A drunk stranger, using a drink you spilled by accident as a pretext, calls you outside to settle the score. The crowd has already started betting.",
    secenekler: [
      {
        metin: "Accept; go outside.",
        ipucu: "Win for great renown, lose for a serious wound — there is a small risk of death",
        basariliSonuc: {
          mesaj: "After a short but hard fight the stranger was left on the ground; the tavern carried you on its shoulders.",
        },
        basarisizSonuc: {
          mesaj: "The stranger's fists were heavier than you expected; you could not get out of bed for days.",
        },
      },
      {
        metin: "Apologize; do not show your claws.",
        basariliSonuc: {
          mesaj: "You set your pride aside and apologized; the man grumbled and returned to his table.",
        },
        basarisizSonuc: {
          mesaj: "Though your apology was accepted, the tavern started calling you a 'coward'.",
        },
      },
    ],
  },
  sosyal_meyhane_ayilma: {
    baslik: "The Stranger in the Mirror",
    metin: "The same tavern again, the same stool again. As you hold your cup you see yourself in the tavern's dirty mirror and do not recognize the face. For a moment you think of giving it all up.",
    secenekler: [
      {
        metin: "Set the cup on the table; try to pull yourself together.",
        ipucu: "Hard, but if you succeed it eases the burden of your drunkenness",
        basariliSonuc: {
          mesaj: "You pushed the cup back and left the tavern that night empty-handed but with your head held high. It took months, but you started to look like yourself again.",
          detay: "Though everyone keeps talking about you, you no longer let them be proven right.",
        },
        basarisizSonuc: {
          mesaj: "You tried, but the cup would not leave your hand. The next morning you woke on the same stool, with the same headache.",
        },
      },
      {
        metin: "Sip this thought down along with the cup.",
        basariliSonuc: {
          mesaj: "You drowned the thought with the cup. You will be in the same place tomorrow, and you know it.",
        },
        basarisizSonuc: {
          mesaj: "You kept drinking; in the morning you felt worse than ever.",
        },
      },
    ],
  },

  // ===== PUB =====
  sosyal_pub_dart_turnuvasi: {
    baslik: "A Darts Tournament",
    metin: "A small tournament has formed in front of the dartboard on the wall. Beer glasses are lined up around the board; everyone waits their turn.",
    secenekler: [
      {
        metin: "Get in line; take your throw.",
        ipucu: "A good throw brings renown, a bad one only laughter",
        basariliSonuc: {
          mesaj: "You stuck the dart right in the bullseye! The pub raised a glass in your honor.",
        },
        basarisizSonuc: {
          mesaj: "The dart hit the ceiling, not the wall. The whole pub fell about laughing.",
        },
      },
      {
        metin: "Watch from the side, sipping a beer.",
        basariliSonuc: {
          mesaj: "You had a calm evening, without any risk of embarrassment.",
        },
        basarisizSonuc: {
          mesaj: "It was an ordinary evening; nothing worth remembering happened.",
        },
      },
    ],
  },
  sosyal_pub_isci_sohbeti: {
    baslik: "The Factory Workers' Table",
    metin: "A group of factory workers at the next table are talking angrily about working hours and wages. One of them turns to you and asks your opinion.",
    secenekler: [
      {
        metin: "Speak on their side; hear their grievances.",
        ipucu: "A good name in the eyes of the people, but unease in some circles",
        basariliSonuc: {
          mesaj: "Your words pleased the workers; they bought you a beer and told you their troubles at length.",
        },
        basarisizSonuc: {
          mesaj: "What you said was misunderstood and turned into a short argument. You had to change tables.",
        },
      },
      {
        metin: "Stay neutral; just listen.",
        basariliSonuc: {
          mesaj: "You listened quietly and took the pulse of the city.",
        },
        basarisizSonuc: {
          mesaj: "Your silence looked 'arrogant' to some, but it did not matter.",
        },
      },
    ],
  },
  sosyal_pub_gizemli_beyefendi: {
    baslik: "The Man in the Top Hat",
    metin: "A well-dressed man who does not fit the pub at all sits down beside you. He hands you a card-like piece of paper and talks of a mysterious investment opportunity.",
    secenekler: [
      {
        metin: "Hear the offer; invest a little.",
        ipucu: "Risky, but if you win, a good return",
        basariliSonuc: {
          mesaj: "The man's word held true; a few weeks later the envelope he sent to your door held more than your profit.",
        },
        basarisizSonuc: {
          mesaj: "The man never appeared again. Even the name on his card was false.",
        },
      },
      {
        metin: "Refuse politely.",
        basariliSonuc: {
          mesaj: "You trusted your instincts; the man shrugged and moved to another table.",
        },
        basarisizSonuc: {
          mesaj: "Despite your refusal, the man's stare sent a chill through you.",
        },
      },
    ],
  },
  sosyal_pub_bilardo: {
    baslik: "The Billiard Table",
    metin: "A spot has opened at the billiard table in the corner. The local champion challenges you; small bets are going around.",
    secenekler: [
      {
        metin: "Play; show your skill.",
        ipucu: "Win for the bet and renown, lose for just the bet",
        basariliSonuc: {
          mesaj: "You sank the last ball in the corner pocket! The table applauded your name.",
        },
        basarisizSonuc: {
          mesaj: "Your hand trembled and the ball missed the pocket. The champion kept his title.",
        },
      },
      {
        metin: "Be content to watch.",
        basariliSonuc: {
          mesaj: "You watched a good match without risking the money in your pocket.",
        },
        basarisizSonuc: {
          mesaj: "It was a dull match; you did not even wait for the end.",
        },
      },
    ],
  },
  sosyal_pub_sarki_korosu: {
    baslik: "The Fireside Chorus",
    metin: "When the pianist strikes up an old folk song the whole pub starts singing in one voice. The voices blur together, no one is perfect, but no one cares.",
    secenekler: [
      {
        metin: "Let yourself go; join the chorus.",
        ipucu: "An almost guaranteed moment of happiness",
        basariliSonuc: {
          mesaj: "You raised your voice and for a moment forgot all your troubles. Singing shoulder to shoulder with strangers felt good.",
        },
        basarisizSonuc: {
          mesaj: "Though you barely knew the words you had fun, and no one even noticed.",
        },
      },
      {
        metin: "Sit on the side; just watch.",
        basariliSonuc: {
          mesaj: "Even watching from a distance was pleasant.",
        },
        basarisizSonuc: {
          mesaj: "The noise started to give you a headache.",
        },
      },
    ],
  },
  sosyal_pub_kavga_cikar: {
    baslik: "A Dispute at the Street Door",
    metin: "As you leave, an argument between two customers quickly turns to blows; you are caught right in the middle.",
    secenekler: [
      {
        metin: "Step between them; break it up.",
        ipucu: "Succeed for gratitude and renown, fail for a loss of health",
        basariliSonuc: {
          mesaj: "You barely managed to pull the two apart; the pub owner stood you a beer in gratitude.",
        },
        basarisizSonuc: {
          mesaj: "As you stepped in, a stray fist landed square on your face.",
        },
      },
      {
        metin: "Slip away from the side; stay out of it.",
        basariliSonuc: {
          mesaj: "You acted wisely; the fight ended by itself before the police came.",
        },
        basarisizSonuc: {
          mesaj: "As you fled, some of the coins in your pocket spilled and were lost in the crowd.",
        },
      },
    ],
  },

  // ===== HAMAM / BATHHOUSE =====
  sosyal_hamam_dedikodu_agi: {
    baslik: "Whispers Behind the Steam",
    metin: "As you lie on the hot stones, a few steps away two people whisper the city's freshest gossip. Their voices carry clearly through the steam.",
    secenekler: [
      {
        metin: "Listen quietly; prick up your ears.",
        ipucu: "A scrap of information that could be useful",
        basariliSonuc: {
          mesaj: "What you heard was exactly the useful kind; you will take your next step more clearly.",
        },
        basarisizSonuc: {
          mesaj: "They were only talking about ordinary wedding preparations; it was of no use.",
        },
      },
      {
        metin: "Focus on your own peace; do not listen.",
        basariliSonuc: {
          mesaj: "You enjoyed the warmth and the steam; your mind rested.",
        },
        basarisizSonuc: {
          mesaj: "Though you tried to relax, the noise around you kept you a little tense.",
        },
      },
    ],
  },
  sosyal_hamam_govde_gosterisi: {
    baslik: "The Cold Water Challenge",
    metin: "A group of young people are daring each other over who can stay longest in the icy cooling pool. It is your turn.",
    secenekler: [
      {
        metin: "Jump in the pool; hold on.",
        ipucu: "Hold on for renown, fail and risk a chill",
        basariliSonuc: {
          mesaj: "You held on longer than anyone; when you came out you were met with applause.",
        },
        basarisizSonuc: {
          mesaj: "You leapt out shivering before ten seconds passed; the young ones mocked you.",
        },
      },
      {
        metin: "Smile; do not accept.",
        basariliSonuc: {
          mesaj: "You did not get pulled into a foolish dare.",
        },
        basarisizSonuc: {
          mesaj: "They teased you as a 'coward' but you did not care.",
        },
      },
    ],
  },
  sosyal_hamam_evlilik_ciziligi: {
    baslik: "Matchmaking Whispers",
    metin: "An elderly person keeps looking you over and whispering to the one beside them. Clearly they are seeking a suitable marriage prospect, and their eye is on you.",
    secenekler: [
      {
        metin: "Approach; ask who they have in mind.",
        ipucu: "An interesting name, a risk-free chat",
        basariliSonuc: {
          mesaj: "They whispered a few names from a well-rooted family; an interesting possibility waits at the door.",
        },
        basarisizSonuc: {
          mesaj: "The elderly lady did not take to you; she wrinkled her face and turned to the one beside her.",
        },
      },
      {
        metin: "Smile; make it clear you are not interested.",
        basariliSonuc: {
          mesaj: "You stayed out of the matchmaking and did not disturb your peace.",
        },
        basarisizSonuc: {
          mesaj: "They kept whispering behind your back all the same.",
        },
      },
    ],
  },
  sosyal_hamam_tellak_sohbeti: {
    baslik: "The Bath Attendant's Hands",
    metin: "The experienced bath attendant notices the weariness you have carried in your back for days and offers a long massage.",
    secenekler: [
      {
        metin: "Accept; pay for it.",
        ipucu: "An almost guaranteed rest",
        basariliSonuc: {
          mesaj: "Weeks of weariness melted under their hands; you left the bathhouse feeling newborn.",
        },
        basarisizSonuc: {
          mesaj: "They were a little rough, but it still did you good.",
        },
      },
      {
        metin: "Thank them; wash on your own.",
        basariliSonuc: {
          mesaj: "It was a plain but restful enough wash.",
        },
        basarisizSonuc: {
          mesaj: "You washed in a hurry and did not feel much.",
        },
      },
    ],
  },
  sosyal_hamam_kaybolan_esya: {
    baslik: "The Empty Basket",
    metin: "When you come out from washing and go back to the basket with your things, you notice a corner of your purse has grown lighter.",
    secenekler: [
      {
        metin: "Ask the bath attendant; look into it.",
        ipucu: "Maybe you get it back, maybe you just waste time",
        basariliSonuc: {
          mesaj: "The attendant remembered another customer had mixed up the baskets; you got part of your lost money back.",
        },
        basarisizSonuc: {
          mesaj: "No one saw anything, or pretended not to. The loss was yours.",
        },
      },
      {
        metin: "Let it go; it is not important.",
        basariliSonuc: {
          mesaj: "You took the loss on the chin and spent the rest of the day in peace.",
        },
        basarisizSonuc: {
          mesaj: "Though you tried to let it go, you could not quite shake it off.",
        },
      },
    ],
  },
  sosyal_hamam_yabanci_tuccar: {
    baslik: "A Merchant of Far Lands",
    metin: "A merchant sitting on the stone beside you, speaking with a strange accent, talks about the exotic goods his caravan has brought.",
    secenekler: [
      {
        metin: "Strike up a conversation; make a connection.",
        ipucu: "A new acquaintance and possible trade gain",
        basariliSonuc: {
          mesaj: "Your conversation ran long; as he left he gave you a small but valuable gift and promised to do business in the future.",
        },
        basarisizSonuc: {
          mesaj: "The language barrier kept you from understanding each other well, yet there was a strange warmth in your talk.",
        },
      },
      {
        metin: "Return to your own peace; do not drag out the talk.",
        basariliSonuc: {
          mesaj: "You enjoyed the wash and did not spend time on a new acquaintance.",
        },
        basarisizSonuc: {
          mesaj: "It was an ordinary wash.",
        },
      },
    ],
  },
  sosyal_hamam_asiri_sicak: {
    baslik: "Dizziness",
    metin: "You lingered too long in the hot room; your head began to spin, your vision to go dark.",
    secenekler: [
      {
        metin: "Push yourself; stay a little longer.",
        ipucu: "Hold on and nothing happens, fail and you faint",
        basariliSonuc: {
          mesaj: "Though you pushed yourself you recovered; it turned out to be a really good warm-up.",
        },
        basarisizSonuc: {
          mesaj: "You fainted and collapsed; they revived you with cold water, and you were ashamed in front of everyone.",
        },
      },
      {
        metin: "Move to the cool section at once.",
        basariliSonuc: {
          mesaj: "You acted in time and pulled yourself together.",
        },
        basarisizSonuc: {
          mesaj: "You spent the day with a bit of dizziness anyway.",
        },
      },
    ],
  },
  sosyal_hamam_gizli_toplanti: {
    baslik: "The Council Behind the Steam",
    metin: "In the innermost hot room you see a few people talking in low, serious voices. From their words you sense a dangerous plan concerning the city's government.",
    secenekler: [
      {
        metin: "Draw near; try to hear what they are saying.",
        ipucu: "Valuable information, but a risk of being caught",
        basariliSonuc: {
          mesaj: "You pocketed what you heard without telling anyone; you are sure it will be useful later.",
        },
        basarisizSonuc: {
          mesaj: "You were noticed. One of the men looked you over with a menacing stare; you moved away quickly.",
        },
      },
      {
        metin: "Ignore it; mind your own business.",
        basariliSonuc: {
          mesaj: "You did not get yourself into trouble and calmly continued your wash.",
        },
        basarisizSonuc: {
          mesaj: "The few words you heard would not leave your mind; you went home uneasy.",
        },
      },
    ],
  },

  // ===== KAHVEHANE / COFFEEHOUSE =====
  sosyal_kahvehane_meddah: {
    baslik: "The Storyteller's Tale",
    metin: "The storyteller taps his staff on the floor and begins: 'Once upon a time...' The coffeehouse sinks into a deep silence; everyone is listening to him.",
    secenekler: [
      {
        metin: "Sit up front; lose yourself in the story.",
        ipucu: "An almost guaranteed pleasant evening",
        basariliSonuc: {
          mesaj: "The story carried you into another world; you did not notice the hours pass.",
        },
        basarisizSonuc: {
          mesaj: "The story was fine but your mind was elsewhere.",
        },
      },
      {
        metin: "Sip your coffee; listen with half an ear.",
        basariliSonuc: {
          mesaj: "You had a calm evening.",
        },
        basarisizSonuc: {
          mesaj: "It was an ordinary evening.",
        },
      },
    ],
  },
  sosyal_kahvehane_tavla: {
    baslik: "The Rattle of Backgammon",
    metin: "Someone at the corner table invites you to backgammon. The dice are ready, the pieces set, and the crowd has quietly started to watch.",
    secenekler: [
      {
        metin: "Sit down; play.",
        ipucu: "Small bet, small risk",
        basariliSonuc: {
          mesaj: "The dice fell your way and you won the game. The onlookers congratulated you.",
        },
        basarisizSonuc: {
          mesaj: "The dice were no help this time; you lost the game.",
        },
      },
      {
        metin: "Watch; do not join.",
        basariliSonuc: {
          mesaj: "You made a pleasant spectator.",
        },
        basarisizSonuc: {
          mesaj: "Not much happened.",
        },
      },
    ],
  },
  sosyal_kahvehane_falci_telve: {
    baslik: "Shapes in the Grounds",
    metin: "When you finish your coffee the old woman beside you asks for your cup: 'Let me read your grounds, child.' You turn the cup over and wait.",
    secenekler: [
      {
        metin: "Hand over the cup; let her read your fortune.",
        ipucu: "A mysterious prediction that affects your mood",
        basariliSonuc: {
          mesaj: "The woman sees 'a long road and an unexpected gain' in the cup; what she says fills you with a strange hope.",
          detay: "You do not know if it is true or false, but your steps have been a little lighter since that day.",
        },
        basarisizSonuc: {
          mesaj: "The woman wrinkled her face and said 'better I not tell you today'; curiosity nagged at you all day.",
        },
      },
      {
        metin: "Thank her; do not have it read.",
        basariliSonuc: {
          mesaj: "You did not leave your fate to a cup of coffee grounds.",
        },
        basarisizSonuc: {
          mesaj: "The woman seemed a little offended, but it is not important.",
        },
      },
    ],
  },
  sosyal_kahvehane_siyaset_tartismasi: {
    baslik: "An Argument Around the Newspaper",
    metin: "A newspaper passed from hand to hand starts a sharp argument in the coffeehouse. Everyone defends their view at a shout, and you are expected to weigh in.",
    secenekler: [
      {
        metin: "State your opinion openly.",
        ipucu: "A bold stance brings renown but can also earn you an enemy",
        basariliSonuc: {
          mesaj: "Your words echoed around the table; some applauded you, some cursed — but you are known now.",
        },
        basarisizSonuc: {
          mesaj: "The argument grew and nearly came to blows. The coffeehouse keeper had to step in and calm everyone.",
        },
      },
      {
        metin: "Stay neutral; just listen.",
        basariliSonuc: {
          mesaj: "You weighed the different views in your mind without revealing your own to anyone.",
        },
        basarisizSonuc: {
          mesaj: "Your silence drew no one's attention.",
        },
      },
    ],
  },
  sosyal_kahvehane_ticaret_firsati: {
    baslik: "An Overheard Opportunity",
    metin: "The merchants at the next table are talking about a newly arrived batch of goods and a good price opportunity. You caught it by ear.",
    secenekler: [
      {
        metin: "Join the conversation; seize the opportunity.",
        ipucu: "A small investment, a chance of a good return",
        basariliSonuc: {
          mesaj: "The opportunity really was good; within days you got back more than you put in.",
        },
        basarisizSonuc: {
          mesaj: "The batch of goods did not turn out as expected; you could not get your money back.",
        },
      },
      {
        metin: "Just listen; do not join.",
        basariliSonuc: {
          mesaj: "You kept sipping your coffee without taking any risk.",
        },
        basarisizSonuc: {
          mesaj: "You may have missed the opportunity, but you have no regrets.",
        },
      },
    ],
  },
  sosyal_kahvehane_nargile_arkadasligi: {
    baslik: "A Shared Water Pipe",
    metin: "An old man sitting alone pushes his water pipe toward you and says 'help yourself'. The conversation deepens as the smoke rises in rings.",
    secenekler: [
      {
        metin: "Sit down; join the conversation.",
        ipucu: "A warm moment of friendship",
        basariliSonuc: {
          mesaj: "You talked for hours; the man's life story left a deep mark on you.",
        },
        basarisizSonuc: {
          mesaj: "The talk was short but pleasant all the same.",
        },
      },
      {
        metin: "Thank him; return to your own table.",
        basariliSonuc: {
          mesaj: "You spent a calm evening on your own.",
        },
        basarisizSonuc: {
          mesaj: "The man's disappointed face stayed on your mind.",
        },
      },
    ],
  },
  sosyal_kahvehane_haber_soylentisi: {
    baslik: "News at the Door",
    metin: "Someone bursts into the coffeehouse out of breath and tells of an incident in a distant neighborhood; everyone turns to listen, and you are curious too.",
    secenekler: [
      {
        metin: "Draw near; learn the details.",
        ipucu: "A gain of current information",
        basariliSonuc: {
          mesaj: "What was told helped you take the city's pulse; you will take your next step more knowingly.",
        },
        basarisizSonuc: {
          mesaj: "The news was already exaggerated; the truth was far more ordinary.",
        },
      },
      {
        metin: "Mind your own business; take no interest.",
        basariliSonuc: {
          mesaj: "You did not chase the gossip.",
        },
        basarisizSonuc: {
          mesaj: "A few words reached your ears anyway.",
        },
      },
    ],
  },

  // ===== KERVANSARAY / CARAVANSERAI =====
  sosyal_kervansaray_uzak_diyar_tuccari: {
    baslik: "A Silk Road Merchant",
    metin: "A merchant displaying his goods in the courtyard tells of the deserts and mountains he has crossed for months. His bales hold dazzling fabrics.",
    secenekler: [
      {
        metin: "Haggle; buy goods.",
        ipucu: "If you haggle well, a profitable trade",
        basariliSonuc: {
          mesaj: "After a hard bargain you came to terms; you sold the fabrics you bought at a good price in the city.",
        },
        basarisizSonuc: {
          mesaj: "You thought you came out ahead in the bargain, but the goods were not the quality they looked.",
        },
      },
      {
        metin: "Just talk; listen to his stories.",
        basariliSonuc: {
          mesaj: "The lands he described widened your imagination.",
        },
        basarisizSonuc: {
          mesaj: "The weary merchant was not very talkative.",
        },
      },
    ],
  },
  sosyal_kervansaray_gezgin_hikayeci: {
    baslik: "A Man Aged on the Roads",
    metin: "An old traveler sitting by the fire begins to tell of the strange lands he has seen and the odd people he has met. His voice is hypnotic.",
    secenekler: [
      {
        metin: "Sit by the fire; listen.",
        ipucu: "A pleasant, risk-free evening",
        basariliSonuc: {
          mesaj: "In his tales the line between truth and legend disappeared; you felt once again how large the world is.",
        },
        basarisizSonuc: {
          mesaj: "The stories dragged on and on; in the end you gave in to sleep.",
        },
      },
      {
        metin: "Turn in early; rest for your long road.",
        basariliSonuc: {
          mesaj: "You slept well.",
        },
        basarisizSonuc: {
          mesaj: "The noise of the caravanserai did not let you sleep much.",
        },
      },
    ],
  },
  sosyal_kervansaray_koruma_teklifi: {
    baslik: "A Caravan Guard Offer",
    metin: "A caravan chief asks whether you would join his party as an escort and guard when it sets out in the morning. The reward is tempting but the road is dangerous.",
    secenekler: [
      {
        metin: "Accept the offer.",
        ipucu: "A good earning, but there is a brigand risk",
        basariliSonuc: {
          mesaj: "The caravan reached the city safely; the chief paid you more than he promised.",
        },
        basarisizSonuc: {
          mesaj: "On the road you met a small brigand raid; you protected the caravan but not without taking a wound.",
        },
      },
      {
        metin: "Thank him; refuse.",
        basariliSonuc: {
          mesaj: "You preferred a comfortable night.",
        },
        basarisizSonuc: {
          mesaj: "The chief seemed a little disappointed.",
        },
      },
    ],
  },
  sosyal_kervansaray_calinan_mal: {
    baslik: "A Shadow in the Dark",
    metin: "In the middle of the night you notice a shadow moving among the bales. You are alone in this empty courtyard.",
    secenekler: [
      {
        metin: "Advance on him; call out.",
        ipucu: "Catch him for goods and renown, if he runs a loss",
        basariliSonuc: {
          mesaj: "The thief took fright and fled, leaving what he had stolen behind. In the morning the caravanserai owner thanked you.",
        },
        basarisizSonuc: {
          mesaj: "The shadow was already gone; in the morning you noticed some of your belongings were missing.",
        },
      },
      {
        metin: "Ignore it; lock your door tight.",
        basariliSonuc: {
          mesaj: "You protected your own things and did not meddle in someone else's trouble.",
        },
        basarisizSonuc: {
          mesaj: "You could not sleep all night, taking every sound for a thief.",
        },
      },
    ],
  },
  sosyal_kervansaray_dil_pazarligi: {
    baslik: "Searching for a Common Tongue",
    metin: "You try to come to terms with a merchant with whom you share no common language, using hand gestures and laughter.",
    secenekler: [
      {
        metin: "Keep haggling persistently.",
        ipucu: "A hard but fun bargain",
        basariliSonuc: {
          mesaj: "In the end you came to terms, and at a good price too! You both shook hands laughing.",
        },
        basarisizSonuc: {
          mesaj: "The deal did not quite land, but you laughed a lot along the way; at least it was a cultural experience.",
        },
      },
      {
        metin: "Give up; go to another stall.",
        basariliSonuc: {
          mesaj: "You did not waste your time.",
        },
        basarisizSonuc: {
          mesaj: "You may have been a little rude.",
        },
      },
    ],
  },
  sosyal_kervansaray_deve_yarisi: {
    baslik: "A Camel Race in the Courtyard",
    metin: "The bored caravan members have set up a small camel race in the courtyard. Bets are open, and the best meal of the night is promised to the winner.",
    secenekler: [
      {
        metin: "Place a bet; pick your camel.",
        ipucu: "Down to luck, a fun gamble",
        basariliSonuc: {
          mesaj: "The camel you picked kicked up dust! You won the best meal of the night.",
        },
        basarisizSonuc: {
          mesaj: "Your camel stubbornly sat down halfway, but you laughed a lot all the same.",
        },
      },
      {
        metin: "Watch from the side; smile.",
        basariliSonuc: {
          mesaj: "It was a fun sight; you laughed without losing anything.",
        },
        basarisizSonuc: {
          mesaj: "It was an ordinary evening.",
        },
      },
    ],
  },

  // ===== ORDUGAH CADIRI / CAMP TENT =====
  sosyal_ordugah_bilek_guresi_komutan: {
    baslik: "A Challenge by the Fire",
    metin: "Between watches the soldiers have gathered around the fire and set up an arm-wrestling tournament. When it is your turn, the strongest soldier points at you.",
    secenekler: [
      {
        metin: "Take the challenge; show your strength.",
        ipucu: "Win for standing within the unit, lose and only your pride is hurt",
        basariliSonuc: {
          mesaj: "You slammed his arm to the table! The unit hoisted you onto their shoulders; you are someone whose word carries weight among them now.",
        },
        basarisizSonuc: {
          mesaj: "You lost but put up a good fight; the soldiers slapped your back anyway.",
        },
      },
      {
        metin: "Watch from the side; cheer.",
        basariliSonuc: {
          mesaj: "You had a pleasant evening.",
        },
        basarisizSonuc: {
          mesaj: "It was an ordinary evening.",
        },
      },
    ],
  },
  sosyal_ordugah_kart_oyunu: {
    baslik: "Cards Between Watches",
    metin: "In the tent a few soldiers put their pay on the table and play cards. They make room for you too.",
    secenekler: [
      {
        metin: "Sit down; play.",
        ipucu: "Risky but fun",
        basariliSonuc: {
          mesaj: "The cards fell your way; everyone in the tent lost something from their pocket.",
        },
        basarisizSonuc: {
          mesaj: "You had a bad night; part of your pay stayed in the other soldiers' pockets.",
        },
      },
      {
        metin: "Watch; do not join.",
        basariliSonuc: {
          mesaj: "You kept your pay in your pocket.",
        },
        basarisizSonuc: {
          mesaj: "The soldiers teased you a little, but it did not matter.",
        },
      },
    ],
  },
  sosyal_ordugah_savas_hikayeleri: {
    baslik: "Exaggerated War Stories",
    metin: "As the cup goes around, everyone's war story grows a little bigger. When it is your turn, all eyes are on you.",
    secenekler: [
      {
        metin: "Tell your own story with embellishment.",
        ipucu: "Tell it well and you become a legend, exaggerate and you are humiliated",
        basariliSonuc: {
          mesaj: "Your story was so gripping the tent fell silent; in the end they raised a cup.",
        },
        basarisizSonuc: {
          mesaj: "When the detail you exaggerated clashed with what an old comrade-in-arms told, everyone started laughing.",
        },
      },
      {
        metin: "Stay modest; tell it plainly.",
        basariliSonuc: {
          mesaj: "Your plain telling was found sincere.",
        },
        basarisizSonuc: {
          mesaj: "It was found too dull, but it does not matter.",
        },
      },
    ],
  },
  sosyal_ordugah_kacak_icki: {
    baslik: "The Jug at the Back of the Tent",
    metin: "A soldier pulls out a jug he had hidden at the back of the tent; it is against the rules, but it seems no one will see.",
    secenekler: [
      {
        metin: "Hold out your cup; join in.",
        ipucu: "Friendship grows, but the risk of being caught leaves a small mark on your record",
        basariliSonuc: {
          mesaj: "No one saw; the night went well, and the bonds within the unit grew a little stronger.",
        },
        basarisizSonuc: {
          mesaj: "The officer on watch walked in at that very moment. Your name was written in the disciplinary book.",
        },
      },
      {
        metin: "Follow the rules; refuse.",
        basariliSonuc: {
          mesaj: "You kept your discipline and took no risk.",
        },
        basarisizSonuc: {
          mesaj: "The other soldiers teased you as a 'stickler'.",
        },
      },
    ],
  },
  sosyal_ordugah_nobetci_sakasi: {
    baslik: "A Prank on the Sentry",
    metin: "Your friends are planning a prank on the most serious sentry; they ask for your help too.",
    secenekler: [
      {
        metin: "Join the plan; pull off the prank.",
        ipucu: "Succeed and you become a legend in the unit, get caught and you are punished",
        basariliSonuc: {
          mesaj: "The prank worked perfectly! The sentry's scream made the whole camp laugh; it was talked about all night.",
        },
        basarisizSonuc: {
          mesaj: "The sentry caught you and came at you in a rage. As punishment you were put on extra watch.",
        },
      },
      {
        metin: "Do not join; get your sleep.",
        basariliSonuc: {
          mesaj: "You slept well.",
        },
        basarisizSonuc: {
          mesaj: "Your friends teased you as 'no fun'.",
        },
      },
    ],
  },
  sosyal_ordugah_yabanci_asker_dostlugu: {
    baslik: "The Night of the Truce",
    metin: "On the night of a briefly declared truce, a soldier from the other side comes near the fire too, wanting to share the drink in his hand. A moment your commanders would not like if they knew.",
    secenekler: [
      {
        metin: "Share your cup; talk.",
        ipucu: "A moment when humanity is remembered — risky but valuable",
        basariliSonuc: {
          mesaj: "Tomorrow you may draw swords on each other, but tonight you were only two people. That conversation made it impossible to see war the way you used to.",
        },
        basarisizSonuc: {
          mesaj: "The conversation stalled in a strange silence; you both went back to your own fires.",
        },
      },
      {
        metin: "Keep your distance; walk away.",
        basariliSonuc: {
          mesaj: "You stayed true to orders and took no risk.",
        },
        basarisizSonuc: {
          mesaj: "Even as you walked away you could not forget the weariness in that soldier's eyes.",
        },
      },
    ],
  },
  sosyal_ordugah_kehanetci_falci: {
    baslik: "The Camp Fortune-Teller",
    metin: "An old fortune-teller wandering among the troops whispers a prophecy to every soldier whose palm she reads by firelight. It is your turn.",
    secenekler: [
      {
        metin: "Hold out your palm; hear the prophecy.",
        ipucu: "A prediction that encourages or unsettles",
        basariliSonuc: {
          mesaj: "'Your name will be remembered in these lands for a long time,' the woman said; her words gave you an unexpected confidence.",
        },
        basarisizSonuc: {
          mesaj: "The woman looked at your palm, her face fell, and she let your hand go without a word. You did not sleep that night.",
        },
      },
      {
        metin: "You have no time for superstition; refuse.",
        basariliSonuc: {
          mesaj: "You believe your fate will be decided by your own sword, not by fortune-tellers.",
        },
        basarisizSonuc: {
          mesaj: "The whispers of the other soldiers reached your ears anyway.",
        },
      },
    ],
  },
  sosyal_ordugah_ates_basinda_yemin: {
    baslik: "An Oath of Brotherhood",
    metin: "As the cups are raised, a few of your comrades-in-arms propose swearing an oath to stand by each other no matter what.",
    secenekler: [
      {
        metin: "Raise your cup; swear the oath.",
        ipucu: "A strong and lasting bond of friendship",
        basariliSonuc: {
          mesaj: "The cups were clinked, the words were serious. After this night the bond between you will not be shaken even on the battlefield.",
        },
        basarisizSonuc: {
          mesaj: "The oath was a bit scattered, but the intent was good.",
        },
      },
      {
        metin: "Do not raise your cup; watch with a smile.",
        basariliSonuc: {
          mesaj: "You preferred quiet respect over grand words.",
        },
        basarisizSonuc: {
          mesaj: "The others seemed a little offended.",
        },
      },
    ],
  },

  // ===== DINI MECLIS / CONGREGATION TABLE =====
  sosyal_dini_gunah_itirafi: {
    baslik: "A Confession After the Meal",
    metin: "After the meal a young colleague approaches you, wanting to confess a sin he has told no one.",
    secenekler: [
      {
        metin: "Listen to him; give counsel.",
        ipucu: "Spiritual guidance strengthens your morals and your influence",
        basariliSonuc: {
          mesaj: "Your words gave him peace; this small moment quietly grew your standing within the congregation.",
        },
        basarisizSonuc: {
          mesaj: "You could not find the right words; the man left even more troubled.",
        },
      },
      {
        metin: "Say you have no time.",
        basariliSonuc: {
          mesaj: "You gave your own peace priority.",
        },
        basarisizSonuc: {
          mesaj: "Your young colleague could not hide his disappointment.",
        },
      },
    ],
  },
  sosyal_dini_hayirsever_teklifi: {
    baslik: "A Wealthy Benefactor",
    metin: "A wealthy benefactor sitting at the table asks whether you would like to join a new charitable work.",
    secenekler: [
      {
        metin: "Accept the offer; contribute.",
        ipucu: "Lasting standing in exchange for a sum of money",
        basariliSonuc: {
          mesaj: "Your donation was talked about at once; your name began to be spoken of for generosity within the congregation.",
        },
        basarisizSonuc: {
          mesaj: "Your donation was collected but drew less attention than you expected.",
        },
      },
      {
        metin: "Decline politely.",
        basariliSonuc: {
          mesaj: "You did not touch your money and spent a plain evening.",
        },
        basarisizSonuc: {
          mesaj: "The benefactor was a little disappointed.",
        },
      },
    ],
  },
  sosyal_dini_rakip_vaiz: {
    baslik: "A Doctrinal Argument",
    metin: "A preacher from another region begins to defend an interpretation different from yours at the table. The argument grows steadily more serious.",
    secenekler: [
      {
        metin: "Defend your view firmly.",
        ipucu: "Win and your influence grows, lose and your reputation is shaken",
        basariliSonuc: {
          mesaj: "Your arguments convinced those at the table; the rival preacher bowed his head in silence.",
        },
        basarisizSonuc: {
          mesaj: "You lost the argument; you saw disappointment in the eyes of some colleagues.",
        },
      },
      {
        metin: "Do not escalate; change the subject.",
        basariliSonuc: {
          mesaj: "You avoided a needless conflict.",
        },
        basarisizSonuc: {
          mesaj: "Some thought you backed down, but it did not matter.",
        },
      },
    ],
  },
  sosyal_dini_gizli_yazma: {
    baslik: "A Dusty Manuscript",
    metin: "In an old chest at the edge of the table you find a dusty manuscript no one has noticed. The pages are old and fragile.",
    secenekler: [
      {
        metin: "Examine it carefully; read it.",
        ipucu: "A gain of rare knowledge, or just an old notebook",
        basariliSonuc: {
          mesaj: "The lines in the manuscript shed light on a forgotten teaching; this knowledge will set you apart among your colleagues.",
        },
        basarisizSonuc: {
          mesaj: "Most of the writing has decayed; there is little left to read.",
        },
      },
      {
        metin: "Put it back; do not meddle.",
        basariliSonuc: {
          mesaj: "You held down your curiosity and returned to the table.",
        },
        basarisizSonuc: {
          mesaj: "You will never learn what the chest was hiding.",
        },
      },
    ],
  },
  sosyal_dini_cemaat_dedikodusu: {
    baslik: "Table Gossip",
    metin: "As the meal ends your colleagues start talking about a dispute between a few families in the congregation. Your opinion is asked too.",
    secenekler: [
      {
        metin: "Offer to mediate.",
        ipucu: "If you succeed you gain standing",
        basariliSonuc: {
          mesaj: "You built a bridge between the two families; the congregation began to speak of you as a wise mediator.",
        },
        basarisizSonuc: {
          mesaj: "Your stepping in only muddled things further; both sides drew away from you a little.",
        },
      },
      {
        metin: "Do not meddle; mind your own business.",
        basariliSonuc: {
          mesaj: "You did not get involved in congregation matters.",
        },
        basarisizSonuc: {
          mesaj: "Some expected more interest from you.",
        },
      },
    ],
  },
  sosyal_dini_mucize_soylentisi: {
    baslik: "A Rumor of a Miracle",
    metin: "A colleague excitedly tells you that after a prayer you read last month a sick child recovered, and that this was a miracle.",
    secenekler: [
      {
        metin: "Do not correct the rumor; stay humble.",
        ipucu: "Honesty is worth more in the long run",
        basariliSonuc: {
          mesaj: "'This was not mine, it was God's work,' you said; your humility was talked about more than the rumor itself.",
        },
        basarisizSonuc: {
          mesaj: "The rumor kept spreading, and you felt uncomfortable.",
        },
      },
      {
        metin: "Let the rumor grow.",
        ipucu: "Renown in the short run, but a loss of reputation if the truth comes out",
        basariliSonuc: {
          mesaj: "The rumor spread fast; the word 'miraculous' is now added to your name.",
        },
        basarisizSonuc: {
          mesaj: "The child's family told the truth — it turned out to be mere coincidence. The inflated rumor backfired.",
        },
      },
    ],
  },

  // ===== LONCA MECLISI / GUILD COUNCIL =====
  sosyal_lonca_fiyat_savasi: {
    baslik: "A Price Dispute",
    metin: "At the guild meeting some tradesmen propose tying prices to a common floor; others fiercely oppose it. The vote is yours.",
    secenekler: [
      {
        metin: "Support the common price floor.",
        ipucu: "It brings stability but angers some tradesmen",
        basariliSonuc: {
          mesaj: "The proposal was accepted; thanks to the stability in the guild your business became more predictable.",
        },
        basarisizSonuc: {
          mesaj: "The proposal was rejected; some tradesmen criticized you as 'afraid of competition'.",
        },
      },
      {
        metin: "Defend free competition.",
        ipucu: "Risky but it strengthens your entrepreneurial spirit",
        basariliSonuc: {
          mesaj: "Free competition won; doors opened wider for bold tradesmen like you.",
        },
        basarisizSonuc: {
          mesaj: "Some small tradesmen said they were harmed because of you and turned cold.",
        },
      },
    ],
  },
  sosyal_lonca_yeni_ortaklik: {
    baslik: "A Partnership Offer",
    metin: "One of the guild's respected names offers to set up a joint business with you. A profit-sharing but risky agreement.",
    secenekler: [
      {
        metin: "Accept the offer; sign.",
        ipucu: "High risk, high return",
        basariliSonuc: {
          mesaj: "The partnership turned a profit from the first month; your standing in the guild rose a rung too.",
        },
        basarisizSonuc: {
          mesaj: "The partnership did not bring the expected profit; the capital you put in melted away.",
        },
      },
      {
        metin: "Refuse for now; say you want to think it over.",
        basariliSonuc: {
          mesaj: "You did not risk your capital.",
        },
        basarisizSonuc: {
          mesaj: "The man found another partner and made a fine profit; a regret passed through you.",
        },
      },
    ],
  },
  sosyal_lonca_rakip_husumeti: {
    baslik: "The Rival's Accusation",
    metin: "In the middle of the meeting, in front of everyone, {rakip} accuses you of unfair competition. All eyes are on you.",
    secenekler: [
      {
        metin: "Defend yourself; show your evidence.",
        ipucu: "Win and your reputation grows, lose and it takes serious harm",
        basariliSonuc: {
          mesaj: "Your evidence demolished the accusation; {rakip} was humiliated before the guild.",
        },
        basarisizSonuc: {
          mesaj: "Your defense was not found convincing; your name stayed tarnished within the guild for a while.",
        },
      },
      {
        metin: "Stay calm; do not respond.",
        basariliSonuc: {
          mesaj: "Your composure was more convincing than the accusation; no one took it seriously.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was read by some as acceptance.",
        },
      },
    ],
  },
  sosyal_lonca_gizli_ticaret_yolu: {
    baslik: "A Whispered New Route",
    metin: "A tradesman you trust speaks of a new trade route no one knows about; but he wants something in return for sharing this information.",
    secenekler: [
      {
        metin: "Pay the price; take the information.",
        ipucu: "Valuable information, but there is a chance it turns out false",
        basariliSonuc: {
          mesaj: "The information was true; thanks to the new route you started bringing your goods in far cheaper.",
        },
        basarisizSonuc: {
          mesaj: "The route either did not exist or was already known to everyone. You wasted your money.",
        },
      },
      {
        metin: "Be suspicious; refuse.",
        basariliSonuc: {
          mesaj: "You did not risk your money.",
        },
        basarisizSonuc: {
          mesaj: "Perhaps you missed a truly valuable opportunity.",
        },
      },
    ],
  },
  sosyal_lonca_sahte_mal_iddiasi: {
    baslik: "An Accusation of Counterfeiting",
    metin: "A customer's complaint reached the guild: it is claimed that one of the goods you sold was counterfeit. The council expects an explanation from you.",
    secenekler: [
      {
        metin: "Tell the truth; admit your mistake.",
        ipucu: "Honesty is bitter in the short run but earns trust in the long run",
        basariliSonuc: {
          mesaj: "You admitted your mistake and paid the customer compensation; the guild appreciated your honesty.",
        },
        basarisizSonuc: {
          mesaj: "Despite your confession, some tradesmen never saw you the same way again.",
        },
      },
      {
        metin: "Deny it; put the blame on your supplier.",
        ipucu: "Risky — get away with it and your reputation stays intact, get caught and it is far worse",
        basariliSonuc: {
          mesaj: "The claim could not be proven and the matter was closed. Uneasy as you felt inside, your reputation stayed intact.",
        },
        basarisizSonuc: {
          mesaj: "Your lie came out. Your trustworthiness within the guild took a serious blow.",
        },
      },
    ],
  },
  sosyal_lonca_baskanlik_adayligi: {
    baslik: "Talk of the Presidency",
    metin: "The guild's old president is thinking of retiring, and your name is among the few being mentioned. Would you like to stand?",
    secenekler: [
      {
        metin: "Put yourself forward; run a campaign.",
        ipucu: "Win for a great political gain, lose and it is just the money spent",
        basariliSonuc: {
          mesaj: "You won the majority vote! You are now one of the guild's most influential names.",
        },
        basarisizSonuc: {
          mesaj: "You lost the election; the money and effort you spent were wasted, and your pride was a little hurt.",
        },
      },
      {
        metin: "Step back for now.",
        basariliSonuc: {
          mesaj: "You decided your time had not yet come.",
        },
        basarisizSonuc: {
          mesaj: "Some think you missed the opportunity.",
        },
      },
    ],
  },

  // ===== PAZAR MEYDANI / MARKET SQUARE =====
  sosyal_pazar_soytari_gosterisi: {
    baslik: "The Square Jester",
    metin: "In the middle of the square a jester gathers a crowd with his acrobatic act; at the end he wants to bring one of the spectators into the act.",
    secenekler: [
      {
        metin: "Volunteer; get on stage.",
        ipucu: "If it goes well, fun and renown; if not, embarrassment",
        basariliSonuc: {
          mesaj: "Together with the jester you managed to make the crowd laugh; the square applauded you.",
        },
        basarisizSonuc: {
          mesaj: "Your clumsiness during the act made everyone laugh — but at you, not with you.",
        },
      },
      {
        metin: "Stay in the crowd; just watch.",
        basariliSonuc: {
          mesaj: "You watched a pleasant show.",
        },
        basarisizSonuc: {
          mesaj: "It was an ordinary show.",
        },
      },
    ],
  },
  sosyal_pazar_kayip_cocuk: {
    baslik: "A Child Lost in the Crowd",
    metin: "A small child wandering in tears says he has lost his parent. No one stops to help.",
    secenekler: [
      {
        metin: "Take his hand; help find his family.",
        ipucu: "A good deed; it earns morals and renown",
        basariliSonuc: {
          mesaj: "After a long search you found his family; the grateful parent embraced you in tears.",
        },
        basarisizSonuc: {
          mesaj: "You could not find his family, but in the end you left the child with the square's watchman.",
        },
      },
      {
        metin: "You have no time; move on.",
        basariliSonuc: {
          mesaj: "You went on about your own business.",
        },
        basarisizSonuc: {
          mesaj: "The child's tearful face stayed on your mind.",
        },
      },
    ],
  },
  sosyal_pazar_yankesici_kovalamaca: {
    baslik: "A Chase in the Square",
    metin: "A pickpocket snatches an old merchant's purse and starts running through the square. Shouts of 'Stop him!' rise.",
    secenekler: [
      {
        metin: "Run after him; catch him.",
        ipucu: "Catch him for great renown, if he escapes you just get tired",
        basariliSonuc: {
          mesaj: "You cornered him behind a stall and caught him! The square declared you a hero.",
        },
        basarisizSonuc: {
          mesaj: "He vanished into the crowd; you were left gasping for breath while everyone laughed at you.",
        },
      },
      {
        metin: "Do not get involved; mind your own business.",
        basariliSonuc: {
          mesaj: "You stayed out of it.",
        },
        basarisizSonuc: {
          mesaj: "Some thought you could have helped too.",
        },
      },
    ],
  },
  sosyal_pazar_sarlatan_iksir: {
    baslik: "The Miracle Elixir Seller",
    metin: "A charlatan shouting from atop a gaudy wagon is selling a cure-all 'miracle elixir'. His pitch is more than convincing.",
    secenekler: [
      {
        metin: "Buy a bottle; try it.",
        ipucu: "Most likely wasted money, a small chance it works out",
        basariliSonuc: {
          mesaj: "Unbelievable, but it really worked! You feel more vigorous than you have in days.",
        },
        basarisizSonuc: {
          mesaj: "The elixir tasted awful, burned your throat, and did nothing. The charlatan had already moved to another neighborhood.",
        },
      },
      {
        metin: "Walk away in suspicion.",
        basariliSonuc: {
          mesaj: "You showed good sense.",
        },
        basarisizSonuc: {
          mesaj: "Perhaps it really was an opportunity you missed.",
        },
      },
    ],
  },
  sosyal_pazar_halk_ozani: {
    baslik: "A Wandering Minstrel",
    metin: "At the edge of the square a minstrel sings a strange and comic folk song about your region; the crowd joins in with laughter.",
    secenekler: [
      {
        metin: "Tip the minstrel; make a request.",
        ipucu: "A pleasant moment for a small price",
        basariliSonuc: {
          mesaj: "The minstrel composed a special verse just for you; the square looked at you with a smile.",
        },
        basarisizSonuc: {
          mesaj: "The minstrel misheard your request and sang a strange song. It was fun all the same.",
        },
      },
      {
        metin: "Listen from a distance; do not pay.",
        basariliSonuc: {
          mesaj: "You had a free bit of enjoyment.",
        },
        basarisizSonuc: {
          mesaj: "It was an ordinary moment.",
        },
      },
    ],
  },
  sosyal_pazar_kehanetci_kadin: {
    baslik: "The Seer in the Crowd",
    metin: "A mysterious woman sitting at the edge of the square points at you: 'I see something in you, child, come sit.' No one knows who she is.",
    secenekler: [
      {
        metin: "Go over; sit down.",
        ipucu: "A mysterious prediction that affects your mood",
        basariliSonuc: {
          mesaj: "She told you something vague but hopeful about your future. You could not quite make out what she meant, but it warmed you.",
        },
        basarisizSonuc: {
          mesaj: "What she said unsettled you deeply; her words would not leave your mind at night for a while.",
        },
      },
      {
        metin: "Walk away; take no interest.",
        basariliSonuc: {
          mesaj: "You did not entrust your fate to a stranger's words.",
        },
        basarisizSonuc: {
          mesaj: "You felt her watching you go all the same.",
        },
      },
    ],
  },
  sosyal_pazar_meydan_kavgasi: {
    baslik: "A Fight Between Stalls",
    metin: "A dispute between two stall owners quickly turns to shoving; fruit and vegetables fly through the air.",
    secenekler: [
      {
        metin: "Step in; calm them down.",
        ipucu: "Succeed for approval, fail for a wound",
        basariliSonuc: {
          mesaj: "You managed to calm both of them; the square's people applauded you.",
        },
        basarisizSonuc: {
          mesaj: "A flying cabbage hit you square in the face; your stepping in was of no use.",
        },
      },
      {
        metin: "Watch from a distance; enjoy it.",
        basariliSonuc: {
          mesaj: "It was a funny sight; you watched from a safe distance.",
        },
        basarisizSonuc: {
          mesaj: "The fight ended by itself in a short while.",
        },
      },
    ],
  },

  // ===== SALON / NOBLE SALON =====
  sosyal_salon_entrika_fisiltisi: {
    baslik: "A Whisper Behind the Curtain",
    metin: "In the dimmest corner of the salon two nobles, never setting down their cups, speak in low voices of an intrigue. Their words may concern you too.",
    secenekler: [
      {
        metin: "Draw near; eavesdrop.",
        ipucu: "Valuable information, but a risk of being noticed",
        basariliSonuc: {
          mesaj: "The few sentences you heard helped you understand the balance of power in the salon.",
        },
        basarisizSonuc: {
          mesaj: "You were noticed; being known as an 'eavesdropper' is not a pleasant thing.",
        },
      },
      {
        metin: "Continue your own conversation.",
        basariliSonuc: {
          mesaj: "You did not get mixed up in intrigues.",
        },
        basarisizSonuc: {
          mesaj: "Part of the whisper reached your ears anyway.",
        },
      },
    ],
  },
  sosyal_salon_dans_daveti: {
    baslik: "An Invitation to the Dance Floor",
    metin: "As the orchestra strikes up a waltz, a striking figure holds out a hand and invites you to dance.",
    secenekler: [
      {
        metin: "Take the hand; step onto the dance floor.",
        ipucu: "If it goes well, renown and happiness; if not, embarrassment",
        basariliSonuc: {
          mesaj: "Your steps were surprisingly fluid; the salon began to watch you.",
        },
        basarisizSonuc: {
          mesaj: "You stepped on their foot and never caught the rhythm. The salon tried to smile politely.",
        },
      },
      {
        metin: "Decline politely; stay on the side.",
        basariliSonuc: {
          mesaj: "You had a pleasant evening even without dancing.",
        },
        basarisizSonuc: {
          mesaj: "There was a slightly awkward silence.",
        },
      },
    ],
  },
  sosyal_salon_kumar_masasi: {
    baslik: "Gambling Among Crystal Glasses",
    metin: "In a corner of the salon a high-stakes card game is running. The nobles lay down their cards smiling, but their eyes are doing sums.",
    secenekler: [
      {
        metin: "Sit down at the table; play.",
        ipucu: "High stakes, high risk",
        basariliSonuc: {
          mesaj: "The cards were with you; as you rose from the table the salon was whispering your name.",
        },
        basarisizSonuc: {
          mesaj: "You drew a bad hand and the loss was large. You had to keep smiling.",
        },
      },
      {
        metin: "Stay a spectator; do not join.",
        basariliSonuc: {
          mesaj: "You did not touch your money.",
        },
        basarisizSonuc: {
          mesaj: "You were found dull, but it did not matter.",
        },
      },
    ],
  },
  sosyal_salon_skandal_soylentisi: {
    baslik: "A Rumor About You",
    metin: "The moment you enter the salon you notice it: a few people are looking at you and whispering. A strange rumor about you has spread.",
    secenekler: [
      {
        metin: "Confront it directly; refute the rumor.",
        ipucu: "Succeed and your reputation is saved, fail and it grows even more",
        basariliSonuc: {
          mesaj: "Your calm, clear explanation put out the rumor; the salon came around to your side.",
        },
        basarisizSonuc: {
          mesaj: "Your defense had the opposite effect and the rumor grew even more. You could not escape the whispers all night.",
        },
      },
      {
        metin: "Ignore it; hold your head high.",
        basariliSonuc: {
          mesaj: "Your unbothered air let the rumor die out on its own.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was taken by some as a confession.",
        },
      },
    ],
  },
  sosyal_salon_sanatci_kesfi: {
    baslik: "An Undiscovered Talent",
    metin: "In a corner of the salon a young artist no one is paying attention to quietly displays their work. Your eye sees nothing but it.",
    secenekler: [
      {
        metin: "Go over; praise the work and offer support.",
        ipucu: "A gain of goodwill for a small investment",
        basariliSonuc: {
          mesaj: "Your support made the artist's eyes shine; years later, when you hear their name spoken, you will be proud.",
        },
        basarisizSonuc: {
          mesaj: "Kind as you were, the work did not really interest you.",
        },
      },
      {
        metin: "Pass by without noticing.",
        basariliSonuc: {
          mesaj: "You blended into the salon crowd.",
        },
        basarisizSonuc: {
          mesaj: "Perhaps you missed a real talent.",
        },
      },
    ],
  },
  sosyal_salon_duello_meydan_okumasi: {
    baslik: "A Dishonoring Word",
    metin: "As the glasses are clinked, a jealous noble utters an insulting word about your family in front of everyone. The salon holds its breath and waits.",
    secenekler: [
      {
        metin: "Call him to a duel for your honor.",
        ipucu: "Very risky, but win and you become a legend; there is a small risk of death",
        basariliSonuc: {
          mesaj: "After a short and showy duel your opponent apologized. The salon spoke your name in whispers.",
        },
        basarisizSonuc: {
          mesaj: "The duel did not go as you expected; you were carried out of the salon badly wounded.",
        },
      },
      {
        metin: "Keep your composure; do not respond.",
        basariliSonuc: {
          mesaj: "You protected your honor with your patience, not your sword; some nobles appreciated it.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was read as cowardice in some circles.",
        },
      },
    ],
  },
};
