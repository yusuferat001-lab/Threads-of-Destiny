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
    metin: "A tavern arm-wrestling tournament is on. Free drinks for the winner, laughter for the loser.",
    secenekler: [
      {
        metin: "Take the challenge.",
        basariliSonuc: {
          mesaj: "You beat him! The tavern cheered; drinks were free.",
          detay: "Your arm ached, your name spread.",
        },
        basarisizSonuc: {
          mesaj: "Your arm slammed down; laughter rang in your ears.",
        },
      },
      {
        metin: "Watch and bet on the winner.",
        basariliSonuc: {
          mesaj: "You backed the right wrestler; {birim} in your pocket.",
        },
        basarisizSonuc: {
          mesaj: "Wrong wrestler; the tavern keeper kept your stake.",
        },
      },
    ],
  },
  sosyal_meyhane_kucuk_hirsiz: {
    baslik: "Nimble Fingers",
    metin: "In the crowd you spot a thin-fingered child reaching for your purse.",
    secenekler: [
      {
        metin: "Grab his wrist.",
        basariliSonuc: {
          mesaj: "You caught his wrist; he mumbled an apology and fled.",
          detay: "The tavern keeper stood you a drink.",
        },
        basarisizSonuc: {
          mesaj: "The child slipped free with a few {birim} from your purse.",
        },
      },
      {
        metin: "Ignore it.",
        basariliSonuc: {
          mesaj: "You ignored it; the child found someone hungrier.",
        },
        basarisizSonuc: {
          mesaj: "While you ignored him, your purse grew lighter.",
        },
      },
    ],
  },
  sosyal_meyhane_gizemli_yabanci: {
    baslik: "The Hooded Stranger",
    metin: "A hooded stranger in the corner calls you over: 'I need someone like you.'",
    secenekler: [
      {
        metin: "Sit and listen.",
        basariliSonuc: {
          mesaj: "The stranger spoke of distant lands and left a strange coin.",
          detay: "The world is bigger than you thought.",
        },
        basarisizSonuc: {
          mesaj: "Just a drunk sailor's tall tales; wasted time.",
        },
      },
      {
        metin: "Politely decline.",
        basariliSonuc: {
          mesaj: "You stayed cautious; he shrugged and slipped into the dark.",
        },
        basarisizSonuc: {
          mesaj: "He laughed strangely behind you; you felt uneasy.",
        },
      },
    ],
  },
  sosyal_meyhane_sarki_yarismasi: {
    baslik: "A Folk Song Contest",
    metin: "The bard starts a singing contest. The crowd has raised its cups; you're next.",
    secenekler: [
      {
        metin: "Take the stage and sing.",
        basariliSonuc: {
          mesaj: "Your voice rocked the tavern! Everyone sang along.",
          detay: "They whisper 'that singer' now.",
        },
        basarisizSonuc: {
          mesaj: "You sounded like a cat; you blushed and sat down.",
        },
      },
      {
        metin: "Just watch and clap.",
        basariliSonuc: {
          mesaj: "A nice night, no embarrassment.",
        },
        basarisizSonuc: {
          mesaj: "A forgettable night.",
        },
      },
    ],
  },
  sosyal_meyhane_masa_kavgasi: {
    baslik: "The Overturned Table",
    metin: "Two drunks argue over who drank more, then start flipping tables. Fists fly.",
    secenekler: [
      {
        metin: "Step in and break it up.",
        basariliSonuc: {
          mesaj: "You parted them; the tavern looked at you gratefully.",
        },
        basarisizSonuc: {
          mesaj: "A punch hit you as you stepped in; you never saw whose.",
        },
      },
      {
        metin: "Retreat to a corner.",
        basariliSonuc: {
          mesaj: "You watched from afar and saved your cup.",
        },
        basarisizSonuc: {
          mesaj: "A table crashed onto you; sore back, broken cup.",
        },
      },
    ],
  },
  sosyal_meyhane_kucuk_kumar: {
    baslik: "A Card Game Under the Table",
    metin: "A forbidden card game runs at the back table. They offer you a seat.",
    secenekler: [
      {
        metin: "Sit down and play.",
        basariliSonuc: {
          mesaj: "The cards fell your way; you left with a full purse.",
        },
        basarisizSonuc: {
          mesaj: "Bad hand; you left empty-handed, but no guards came.",
        },
      },
      {
        metin: "Thank them, don't join.",
        basariliSonuc: {
          mesaj: "You kept your head; purse and record stay clean.",
        },
        basarisizSonuc: {
          mesaj: "They called you a coward; you didn't care.",
        },
      },
    ],
  },
  sosyal_meyhane_meyhaneci_dedikodu: {
    baslik: "The Tavern Keeper's Whisper",
    metin: "The tavern keeper lowers his voice while pouring: he heard something interesting about {rakip}.",
    secenekler: [
      {
        metin: "Listen in; buy a round.",
        basariliSonuc: {
          mesaj: "Useful news; now you have leverage over {rakip}.",
        },
        basarisizSonuc: {
          mesaj: "Old gossip everyone knew. Money wasted.",
        },
      },
      {
        metin: "Say you're not interested.",
        basariliSonuc: {
          mesaj: "You skipped the gossip; he turned to someone else.",
        },
        basarisizSonuc: {
          mesaj: "Curiosity gnawed at you all night anyway.",
        },
      },
    ],
  },
  sosyal_meyhane_sarhos_filozof: {
    baslik: "The Drunk Philosopher",
    metin: "An old man sitting alone lectures on the meaning of life. No one listens but you.",
    secenekler: [
      {
        metin: "Sit and take him seriously.",
        basariliSonuc: {
          mesaj: "Behind the drunkenness, you found real wisdom.",
          detay: "'Few truly live,' he said.",
        },
        basarisizSonuc: {
          mesaj: "You realized he just loves his own voice.",
        },
      },
      {
        metin: "Smile; walk away.",
        basariliSonuc: {
          mesaj: "You left politely and spent the night in peace.",
        },
        basarisizSonuc: {
          mesaj: "He kept lecturing at your back.",
        },
      },
    ],
  },
  sosyal_meyhane_yarisma_iddiasi: {
    baslik: "The Legendary Drinking Bet",
    metin: "The tavern bully bets on who collapses first; the prize is the night's takings and a title.",
    secenekler: [
      {
        metin: "Accept the bet.",
        basariliSonuc: {
          mesaj: "Your rival collapsed, you stand! The tavern erupted.",
          detay: "Sore head, but now a legend.",
        },
        basarisizSonuc: {
          mesaj: "You collapsed at the tenth cup; days of headache.",
          detay: "Called 'yesterday's kid' for weeks.",
        },
      },
      {
        metin: "Wisely refuse.",
        basariliSonuc: {
          mesaj: "You kept your health; he called you dull, you shrugged.",
        },
        basarisizSonuc: {
          mesaj: "Some took your refusal for cowardice.",
        },
      },
    ],
  },
  sosyal_meyhane_eski_dost: {
    baslik: "The Face at the Other End of the Table",
    metin: "A drunk man sits at your table and chats at length. He seems capable, and he needs work.",
    secenekler: [
      {
        metin: "Offer him a place on your crew.",
        basariliSonuc: {
          mesaj: "He accepted; behind the drink was someone useful.",
        },
        basarisizSonuc: {
          mesaj: "He laughed: 'You won't remember me tomorrow.' He was right.",
        },
      },
      {
        metin: "Just chat.",
        basariliSonuc: {
          mesaj: "A pleasant chat, no strings attached.",
        },
        basarisizSonuc: {
          mesaj: "A scattered chat; you barely recalled it by morning.",
        },
      },
    ],
  },
  sosyal_meyhane_soguk_savas_husumeti: {
    baslik: "Stares from the Table Across",
    metin: "{rakip} sits across the room, eyes locked on you, raising a mocking cup.",
    secenekler: [
      {
        metin: "Raise your cup; challenge him.",
        basariliSonuc: {
          mesaj: "You won the war of words; {rakip} stormed out.",
        },
        basarisizSonuc: {
          mesaj: "{rakip}'s sharp tongue silenced you; you were humiliated.",
        },
      },
      {
        metin: "Ignore him.",
        basariliSonuc: {
          mesaj: "You didn't rise to it; {rakip} lost interest.",
        },
        basarisizSonuc: {
          mesaj: "Ignoring him only egged {rakip} on all night.",
        },
      },
    ],
  },
  sosyal_meyhane_yabanci_duello: {
    baslik: "A Matter of Honor",
    metin: "A drunk stranger uses your spilled drink as an excuse to call you outside. The crowd already bets.",
    secenekler: [
      {
        metin: "Accept; go outside.",
        basariliSonuc: {
          mesaj: "You floored him; the tavern carried you shoulder-high.",
        },
        basarisizSonuc: {
          mesaj: "His fists hit harder; you were bedridden for days.",
        },
      },
      {
        metin: "Apologize.",
        basariliSonuc: {
          mesaj: "You swallowed your pride and apologized; he grumbled off.",
        },
        basarisizSonuc: {
          mesaj: "He accepted, but the tavern now calls you a coward.",
        },
      },
    ],
  },
  sosyal_meyhane_ayilma: {
    baslik: "The Stranger in the Mirror",
    metin: "Same tavern, same stool. In the grimy mirror you don't recognize yourself; you think of quitting everything.",
    secenekler: [
      {
        metin: "Set the cup down; recover.",
        basariliSonuc: {
          mesaj: "You pushed the cup away, head high; you're recovering.",
          detay: "They can't be proven right anymore.",
        },
        basarisizSonuc: {
          mesaj: "The cup stayed in your hand; same headache next morning.",
        },
      },
      {
        metin: "Drown the thought with the cup.",
        basariliSonuc: {
          mesaj: "You drowned the thought. You'll be back tomorrow, you know.",
        },
        basarisizSonuc: {
          mesaj: "You kept drinking; the morning felt worse than ever.",
        },
      },
    ],
  },

  // ===== PUB =====
  sosyal_pub_dart_turnuvasi: {
    baslik: "A Darts Tournament",
    metin: "A small tournament is on at the dartboard. Everyone waits for their turn.",
    secenekler: [
      {
        metin: "Take your turn and throw.",
        basariliSonuc: {
          mesaj: "Bullseye! The bar raised their glasses to you.",
        },
        basarisizSonuc: {
          mesaj: "Your dart hit the ceiling. The whole pub roared.",
        },
      },
      {
        metin: "Watch, sipping beer.",
        basariliSonuc: {
          mesaj: "A calm evening, no embarrassment.",
        },
        basarisizSonuc: {
          mesaj: "An ordinary evening.",
        },
      },
    ],
  },
  sosyal_pub_isci_sohbeti: {
    baslik: "The Factory Workers' Table",
    metin: "Factory workers at the next table rage about hours and wages. One asks for your opinion.",
    secenekler: [
      {
        metin: "Take their side.",
        basariliSonuc: {
          mesaj: "They liked your words and bought you a beer.",
        },
        basarisizSonuc: {
          mesaj: "You were misunderstood; an argument, you changed tables.",
        },
      },
      {
        metin: "Stay neutral; just listen.",
        basariliSonuc: {
          mesaj: "You listened quietly and felt the city's pulse.",
        },
        basarisizSonuc: {
          mesaj: "Some took your silence for arrogance.",
        },
      },
    ],
  },
  sosyal_pub_gizemli_beyefendi: {
    baslik: "The Man in the Top Hat",
    metin: "A dapper man out of place in the pub sits down, hands you a card, and talks of a mysterious investment.",
    secenekler: [
      {
        metin: "Hear him out and invest.",
        basariliSonuc: {
          mesaj: "He was right; the envelope held a handsome profit.",
        },
        basarisizSonuc: {
          mesaj: "He vanished; even the name on the card was fake.",
        },
      },
      {
        metin: "Refuse politely.",
        basariliSonuc: {
          mesaj: "You trusted your instincts; he moved to another table.",
        },
        basarisizSonuc: {
          mesaj: "His stare still chilled you.",
        },
      },
    ],
  },
  sosyal_pub_bilardo: {
    baslik: "The Billiard Table",
    metin: "A spot opened at the billiard table. The local champion challenges you; small bets circulate.",
    secenekler: [
      {
        metin: "Play; show your skill.",
        basariliSonuc: {
          mesaj: "You sank the last ball! The table applauded.",
        },
        basarisizSonuc: {
          mesaj: "Your hand shook and you missed. The champion kept his title.",
        },
      },
      {
        metin: "Be content to watch.",
        basariliSonuc: {
          mesaj: "A good match, and your money stayed safe.",
        },
        basarisizSonuc: {
          mesaj: "A dull match; you left before the end.",
        },
      },
    ],
  },
  sosyal_pub_sarki_korosu: {
    baslik: "The Fireside Chorus",
    metin: "When the pianist starts an old folk song, the whole pub sings. Nobody's perfect, nobody cares.",
    secenekler: [
      {
        metin: "Let go and join the chorus.",
        basariliSonuc: {
          mesaj: "You raised your voice and forgot your troubles.",
        },
        basarisizSonuc: {
          mesaj: "You didn't know the words but had fun; nobody noticed.",
        },
      },
      {
        metin: "Sit aside and watch.",
        basariliSonuc: {
          mesaj: "Even watching from afar was fun.",
        },
        basarisizSonuc: {
          mesaj: "The noise gave you a headache.",
        },
      },
    ],
  },
  sosyal_pub_kavga_cikar: {
    baslik: "A Dispute at the Street Door",
    metin: "As you leave, two patrons' quarrel turns into a brawl, and you're right in the middle.",
    secenekler: [
      {
        metin: "Step between them.",
        basariliSonuc: {
          mesaj: "You barely parted them; the owner bought you a beer.",
        },
        basarisizSonuc: {
          mesaj: "A stray punch landed square on your face.",
        },
      },
      {
        metin: "Slip away; stay out of it.",
        basariliSonuc: {
          mesaj: "Wise move; the brawl ended on its own.",
        },
        basarisizSonuc: {
          mesaj: "Fleeing, some of your coins spilled and vanished.",
        },
      },
    ],
  },

  // ===== HAMAM / BATHHOUSE =====
  sosyal_hamam_dedikodu_agi: {
    baslik: "Whispers Behind the Steam",
    metin: "Lying on hot stone, two people nearby whisper the city's freshest gossip through the steam.",
    secenekler: [
      {
        metin: "Listen in quietly.",
        basariliSonuc: {
          mesaj: "What you heard was useful; your next step is clearer.",
        },
        basarisizSonuc: {
          mesaj: "Just wedding preparations; useless.",
        },
      },
      {
        metin: "Focus on your own peace.",
        basariliSonuc: {
          mesaj: "You enjoyed the heat and steam; your mind rested.",
        },
        basarisizSonuc: {
          mesaj: "The surrounding noise spoiled your rest a bit.",
        },
      },
    ],
  },
  sosyal_hamam_govde_gosterisi: {
    baslik: "The Cold Water Challenge",
    metin: "Youths bet on who can stay longest in the ice-cold pool. Your turn.",
    secenekler: [
      {
        metin: "Jump in and endure.",
        basariliSonuc: {
          mesaj: "You outlasted everyone and left to applause.",
        },
        basarisizSonuc: {
          mesaj: "Out in ten seconds, shivering; they mocked you.",
        },
      },
      {
        metin: "Smile and decline.",
        basariliSonuc: {
          mesaj: "You didn't fall for a foolish dare.",
        },
        basarisizSonuc: {
          mesaj: "They called you a coward; you didn't care.",
        },
      },
    ],
  },
  sosyal_hamam_evlilik_ciziligi: {
    baslik: "Matchmaking Whispers",
    metin: "An old person eyes you and whispers to a companion: looking for a match, eyeing you.",
    secenekler: [
      {
        metin: "Approach; ask whom they mean.",
        basariliSonuc: {
          mesaj: "They whispered names from a fine family; a promising lead.",
        },
        basarisizSonuc: {
          mesaj: "The old one disliked you and turned away, frowning.",
        },
      },
      {
        metin: "Smile; say you're not interested.",
        basariliSonuc: {
          mesaj: "You stayed out of matchmaking; your peace held.",
        },
        basarisizSonuc: {
          mesaj: "They kept whispering behind your back anyway.",
        },
      },
    ],
  },
  sosyal_hamam_tellak_sohbeti: {
    baslik: "The Bath Attendant's Hands",
    metin: "The attendant notices your fatigue and offers a long massage.",
    secenekler: [
      {
        metin: "Accept and pay.",
        basariliSonuc: {
          mesaj: "Weeks of fatigue melted; you left reborn.",
        },
        basarisizSonuc: {
          mesaj: "A bit rough, but it helped.",
        },
      },
      {
        metin: "Thank him; wash yourself.",
        basariliSonuc: {
          mesaj: "A simple but restful wash.",
        },
        basarisizSonuc: {
          mesaj: "A rushed wash; you felt little.",
        },
      },
    ],
  },
  sosyal_hamam_kaybolan_esya: {
    baslik: "The Empty Basket",
    metin: "Back at your basket after bathing, you notice your purse feels lighter.",
    secenekler: [
      {
        metin: "Ask the attendant; investigate.",
        basariliSonuc: {
          mesaj: "He recalled someone rummaging; you recovered part of it.",
        },
        basarisizSonuc: {
          mesaj: "Nobody saw anything. The loss is yours.",
        },
      },
      {
        metin: "Let it go.",
        basariliSonuc: {
          mesaj: "You swallowed the loss and spent the day in peace.",
        },
        basarisizSonuc: {
          mesaj: "You tried to let it go but couldn't.",
        },
      },
    ],
  },
  sosyal_hamam_yabanci_tuccar: {
    baslik: "A Merchant of Far Lands",
    metin: "A merchant with a strange accent beside you tells of the exotic goods his caravan brought.",
    secenekler: [
      {
        metin: "Join in; make a connection.",
        basariliSonuc: {
          mesaj: "You talked long; he left a gift and promised business.",
        },
        basarisizSonuc: {
          mesaj: "The language barrier hindered you, yet it felt warm.",
        },
      },
      {
        metin: "Don't prolong the chat.",
        basariliSonuc: {
          mesaj: "You enjoyed the bath instead.",
        },
        basarisizSonuc: {
          mesaj: "An ordinary bath.",
        },
      },
    ],
  },
  sosyal_hamam_asiri_sicak: {
    baslik: "Dizziness",
    metin: "You lingered too long in the hot room; dizzy, your vision darkens.",
    secenekler: [
      {
        metin: "Push through; stay longer.",
        basariliSonuc: {
          mesaj: "You pushed on and recovered; a fine warm-up.",
        },
        basarisizSonuc: {
          mesaj: "You fainted; they revived you with cold water, embarrassed.",
        },
      },
      {
        metin: "Move to the cool section.",
        basariliSonuc: {
          mesaj: "You acted in time and recovered.",
        },
        basarisizSonuc: {
          mesaj: "Still, you spent the day dizzy.",
        },
      },
    ],
  },
  sosyal_hamam_gizli_toplanti: {
    baslik: "The Council Behind the Steam",
    metin: "In the inner room a few people whisper gravely; you sense a dangerous plot against the city's rulers.",
    secenekler: [
      {
        metin: "Move closer and listen.",
        basariliSonuc: {
          mesaj: "You kept what you heard to yourself; it may prove useful.",
        },
        basarisizSonuc: {
          mesaj: "You were noticed; a menacing glare sent you away fast.",
        },
      },
      {
        metin: "Ignore it.",
        basariliSonuc: {
          mesaj: "You stayed out of trouble and kept bathing calmly.",
        },
        basarisizSonuc: {
          mesaj: "A few words stuck with you; you went home uneasy.",
        },
      },
    ],
  },

  // ===== KAHVEHANE / COFFEEHOUSE =====
  sosyal_kahvehane_meddah: {
    baslik: "The Storyteller's Tale",
    metin: "The meddah strikes his staff and begins: 'Once upon a time...' The coffeehouse falls silent.",
    secenekler: [
      {
        metin: "Sit up front; lose yourself.",
        basariliSonuc: {
          mesaj: "The tale carried you away; hours slipped by.",
        },
        basarisizSonuc: {
          mesaj: "A lovely tale, but your mind was elsewhere.",
        },
      },
      {
        metin: "Sip coffee; half-listen.",
        basariliSonuc: {
          mesaj: "A calm evening.",
        },
        basarisizSonuc: {
          mesaj: "An ordinary evening.",
        },
      },
    ],
  },
  sosyal_kahvehane_tavla: {
    baslik: "The Rattle of Backgammon",
    metin: "At the corner table they invite you to backgammon. Dice ready, onlookers gathering.",
    secenekler: [
      {
        metin: "Sit and play.",
        basariliSonuc: {
          mesaj: "The dice favored you; you won and got congratulations.",
        },
        basarisizSonuc: {
          mesaj: "The dice didn't help this time; you lost.",
        },
      },
      {
        metin: "Watch, don't join.",
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
    metin: "The old woman asks for your cup: 'Let me read your grounds, child.' You turn it and wait.",
    secenekler: [
      {
        metin: "Hand over the cup.",
        basariliSonuc: {
          mesaj: "She sees 'a long journey and unexpected gain.'",
          detay: "Your steps feel a bit lighter.",
        },
        basarisizSonuc: {
          mesaj: "She said 'better left unsaid'; curiosity gnawed at you.",
        },
      },
      {
        metin: "Thank her; decline.",
        basariliSonuc: {
          mesaj: "You left your fate out of a coffee cup.",
        },
        basarisizSonuc: {
          mesaj: "She seemed a little offended, but it's fine.",
        },
      },
    ],
  },
  sosyal_kahvehane_siyaset_tartismasi: {
    baslik: "An Argument Around the Newspaper",
    metin: "A passed-around newspaper sparks a heated coffeehouse debate. Your opinion is expected too.",
    secenekler: [
      {
        metin: "State your opinion.",
        basariliSonuc: {
          mesaj: "Some applauded, some cursed; but now you're known.",
        },
        basarisizSonuc: {
          mesaj: "It nearly turned to fists; the owner stepped in.",
        },
      },
      {
        metin: "Stay neutral; just listen.",
        basariliSonuc: {
          mesaj: "You kept your view to yourself and weighed others'.",
        },
        basarisizSonuc: {
          mesaj: "Nobody noticed your silence.",
        },
      },
    ],
  },
  sosyal_kahvehane_ticaret_firsati: {
    baslik: "An Overheard Opportunity",
    metin: "Merchants at the next table discuss a new shipment and a good price. You overheard.",
    secenekler: [
      {
        metin: "Join in; seize the chance.",
        basariliSonuc: {
          mesaj: "The deal was good; you got back more than you put in.",
        },
        basarisizSonuc: {
          mesaj: "The goods weren't as expected; your investment was lost.",
        },
      },
      {
        metin: "Just listen.",
        basariliSonuc: {
          mesaj: "You kept sipping coffee, risk-free.",
        },
        basarisizSonuc: {
          mesaj: "You may have missed out, but you don't regret it.",
        },
      },
    ],
  },
  sosyal_kahvehane_nargile_arkadasligi: {
    baslik: "A Shared Water Pipe",
    metin: "A lonely old man pushes his hookah toward you: 'Please.' The chat deepens with the smoke rings.",
    secenekler: [
      {
        metin: "Sit and chat.",
        basariliSonuc: {
          mesaj: "You talked for hours; his life story left a mark.",
        },
        basarisizSonuc: {
          mesaj: "A short chat, but pleasant.",
        },
      },
      {
        metin: "Thank him; return to your table.",
        basariliSonuc: {
          mesaj: "You spent a calm evening alone.",
        },
        basarisizSonuc: {
          mesaj: "His disappointed face stayed with you.",
        },
      },
    ],
  },
  sosyal_kahvehane_haber_soylentisi: {
    baslik: "News at the Door",
    metin: "Someone bursts in breathless with news from a distant district; everyone listens, and so do you.",
    secenekler: [
      {
        metin: "Draw near; learn the details.",
        basariliSonuc: {
          mesaj: "You felt the city's pulse; your next step will be wiser.",
        },
        basarisizSonuc: {
          mesaj: "The news was already inflated; the truth was mundane.",
        },
      },
      {
        metin: "Mind your own business.",
        basariliSonuc: {
          mesaj: "You didn't chase the gossip.",
        },
        basarisizSonuc: {
          mesaj: "A few words still reached your ears.",
        },
      },
    ],
  },

  // ===== KERVANSARAY / CARAVANSERAI =====
  sosyal_kervansaray_uzak_diyar_tuccari: {
    baslik: "A Silk Road Merchant",
    metin: "A merchant in the courtyard tells of deserts crossed for months. His bales hold dazzling fabrics.",
    secenekler: [
      {
        metin: "Haggle; buy goods.",
        basariliSonuc: {
          mesaj: "You haggled hard and resold the fabrics at a good price.",
        },
        basarisizSonuc: {
          mesaj: "You thought you won the haggle; the goods weren't as good.",
        },
      },
      {
        metin: "Just chat; hear his tales.",
        basariliSonuc: {
          mesaj: "His distant lands broadened your imagination.",
        },
        basarisizSonuc: {
          mesaj: "The weary merchant wasn't talkative.",
        },
      },
    ],
  },
  sosyal_kervansaray_gezgin_hikayeci: {
    baslik: "A Man Aged on the Roads",
    metin: "An old traveler by the fire tells of strange lands he has seen. His voice is hypnotic.",
    secenekler: [
      {
        metin: "Sit by the fire; listen.",
        basariliSonuc: {
          mesaj: "Fact and legend blurred; the world felt vast.",
        },
        basarisizSonuc: {
          mesaj: "The tales dragged on; you finally fell asleep.",
        },
      },
      {
        metin: "Turn in early; rest.",
        basariliSonuc: {
          mesaj: "You slept well.",
        },
        basarisizSonuc: {
          mesaj: "The caravanserai's noise kept you awake.",
        },
      },
    ],
  },
  sosyal_kervansaray_koruma_teklifi: {
    baslik: "A Caravan Guard Offer",
    metin: "A caravan master asks if you'll escort his convoy leaving at dawn. Tempting pay, dangerous road.",
    secenekler: [
      {
        metin: "Accept the offer.",
        basariliSonuc: {
          mesaj: "The caravan arrived safely; he paid more than promised.",
        },
        basarisizSonuc: {
          mesaj: "You fended off bandits and saved the caravan, but got hurt.",
        },
      },
      {
        metin: "Thank him; refuse.",
        basariliSonuc: {
          mesaj: "You chose a restful night.",
        },
        basarisizSonuc: {
          mesaj: "The master seemed a bit disappointed.",
        },
      },
    ],
  },
  sosyal_kervansaray_calinan_mal: {
    baslik: "A Shadow in the Dark",
    metin: "At midnight you spot a shadow among the bales. You're alone in the courtyard.",
    secenekler: [
      {
        metin: "Confront it; call out.",
        basariliSonuc: {
          mesaj: "The thief dropped the loot and fled; the owner thanked you.",
        },
        basarisizSonuc: {
          mesaj: "The shadow was gone; some goods were missing by morning.",
        },
      },
      {
        metin: "Ignore it; lock your door.",
        basariliSonuc: {
          mesaj: "You protected your own goods and stayed out.",
        },
        basarisizSonuc: {
          mesaj: "You took every sound for a thief and never slept.",
        },
      },
    ],
  },
  sosyal_kervansaray_dil_pazarligi: {
    baslik: "Searching for a Common Tongue",
    metin: "You try to strike a deal with a merchant sharing no language, using gestures and laughter.",
    secenekler: [
      {
        metin: "Keep haggling stubbornly.",
        basariliSonuc: {
          mesaj: "You struck a good price and shook hands laughing!",
        },
        basarisizSonuc: {
          mesaj: "No deal, but you laughed a lot.",
        },
      },
      {
        metin: "Give up; try another stall.",
        basariliSonuc: {
          mesaj: "You didn't waste your time.",
        },
        basarisizSonuc: {
          mesaj: "You may have been a bit rude.",
        },
      },
    ],
  },
  sosyal_kervansaray_deve_yarisi: {
    baslik: "A Camel Race in the Courtyard",
    metin: "Bored caravaners set up a courtyard camel race. Bets are open; the winner gets the night's best meal.",
    secenekler: [
      {
        metin: "Place a bet; pick your camel.",
        basariliSonuc: {
          mesaj: "Your camel kicked up dust! The best meal is yours.",
        },
        basarisizSonuc: {
          mesaj: "Your camel sat down halfway, but you laughed a lot.",
        },
      },
      {
        metin: "Watch and smile.",
        basariliSonuc: {
          mesaj: "You laughed without losing a thing.",
        },
        basarisizSonuc: {
          mesaj: "An ordinary evening.",
        },
      },
    ],
  },

  // ===== ORDUGAH CADIRI / CAMP TENT =====
  sosyal_ordugah_bilek_guresi_komutan: {
    baslik: "A Challenge by the Fire",
    metin: "Between watches, soldiers hold arm wrestling by the fire. The strongest points at you.",
    secenekler: [
      {
        metin: "Challenge him; show your strength.",
        basariliSonuc: {
          mesaj: "You beat him! The unit hoisted you; you earned respect.",
        },
        basarisizSonuc: {
          mesaj: "You lost but fought well; soldiers clapped your back.",
        },
      },
      {
        metin: "Watch and cheer.",
        basariliSonuc: {
          mesaj: "You had a pleasant evening.",
        },
        basarisizSonuc: {
          mesaj: "An ordinary evening.",
        },
      },
    ],
  },
  sosyal_ordugah_kart_oyunu: {
    baslik: "Cards Between Watches",
    metin: "In the tent a few soldiers stake their pay at cards. They make room for you.",
    secenekler: [
      {
        metin: "Sit and play.",
        basariliSonuc: {
          mesaj: "The cards favored you; you cleaned out the tent.",
        },
        basarisizSonuc: {
          mesaj: "A bad night; part of your pay stayed with them.",
        },
      },
      {
        metin: "Watch; don't join.",
        basariliSonuc: {
          mesaj: "You kept your pay.",
        },
        basarisizSonuc: {
          mesaj: "The soldiers teased you a bit; no matter.",
        },
      },
    ],
  },
  sosyal_ordugah_savas_hikayeleri: {
    baslik: "Exaggerated War Stories",
    metin: "As cups go round, the war stories grow. When your turn comes, all eyes are on you.",
    secenekler: [
      {
        metin: "Embellish your tale.",
        basariliSonuc: {
          mesaj: "Your tale silenced the tent; they raised cups to you.",
        },
        basarisizSonuc: {
          mesaj: "Your embellishment contradicted a comrade; all laughed.",
        },
      },
      {
        metin: "Stay modest; tell it plain.",
        basariliSonuc: {
          mesaj: "Your plain telling was found sincere.",
        },
        basarisizSonuc: {
          mesaj: "They found you dull, but it doesn't matter.",
        },
      },
    ],
  },
  sosyal_ordugah_kacak_icki: {
    baslik: "The Jug at the Back of the Tent",
    metin: "A soldier fishes out a hidden jug from under the tent; against the rules, but nobody seems to see.",
    secenekler: [
      {
        metin: "Hold out your cup; join in.",
        basariliSonuc: {
          mesaj: "Nobody saw; your bonds with the unit strengthened.",
        },
        basarisizSonuc: {
          mesaj: "The officer walked in; your name hit the discipline log.",
        },
      },
      {
        metin: "Obey the rules; decline.",
        basariliSonuc: {
          mesaj: "You kept discipline and avoided risk.",
        },
        basarisizSonuc: {
          mesaj: "The others teased you as 'a stickler'.",
        },
      },
    ],
  },
  sosyal_ordugah_nobetci_sakasi: {
    baslik: "A Prank on the Sentry",
    metin: "Your friends plan a prank on the most serious sentry and ask for your help.",
    secenekler: [
      {
        metin: "Join the plan; pull the prank.",
        basariliSonuc: {
          mesaj: "A perfect prank! The sentry's scream had the camp laughing.",
        },
        basarisizSonuc: {
          mesaj: "The sentry caught you; extra guard duty as punishment.",
        },
      },
      {
        metin: "Skip it; get some sleep.",
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
    metin: "On a truce night, an enemy soldier approaches your fire to share his drink. Commanders wouldn't like it.",
    secenekler: [
      {
        metin: "Share a cup; talk.",
        basariliSonuc: {
          mesaj: "Tonight you were just two men; war looks different now.",
        },
        basarisizSonuc: {
          mesaj: "The talk stalled; you each went back to your own fire.",
        },
      },
      {
        metin: "Keep your distance; leave.",
        basariliSonuc: {
          mesaj: "You obeyed orders and took no risk.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't forget that soldier's weary eyes.",
        },
      },
    ],
  },
  sosyal_ordugah_kehanetci_falci: {
    baslik: "The Camp Fortune-Teller",
    metin: "An old fortune-teller whispers a prophecy to each soldier whose palm she reads. Your turn.",
    secenekler: [
      {
        metin: "Offer your palm; listen.",
        basariliSonuc: {
          mesaj: "'Your name will live on,' she said; you felt sure.",
        },
        basarisizSonuc: {
          mesaj: "She read your palm, frowned, said nothing; you lost sleep.",
        },
      },
      {
        metin: "Refuse; no time for superstition.",
        basariliSonuc: {
          mesaj: "Your own sword decides your fate, not fortune-tellers.",
        },
        basarisizSonuc: {
          mesaj: "The soldiers' whispers still reached you.",
        },
      },
    ],
  },
  sosyal_ordugah_ates_basinda_yemin: {
    baslik: "An Oath of Brotherhood",
    metin: "As cups are raised, your comrades propose an oath to stand by each other, come what may.",
    secenekler: [
      {
        metin: "Raise your cup; swear.",
        basariliSonuc: {
          mesaj: "Cups clinked, vows were solemn; your bond won't break.",
        },
        basarisizSonuc: {
          mesaj: "The oath was messy, but the intent was good.",
        },
      },
      {
        metin: "Smile and just watch.",
        basariliSonuc: {
          mesaj: "You chose quiet respect over grand words.",
        },
        basarisizSonuc: {
          mesaj: "The others seemed a bit offended.",
        },
      },
    ],
  },

  // ===== DINI MECLIS / CONGREGATION TABLE =====
  sosyal_dini_gunah_itirafi: {
    baslik: "A Confession After the Meal",
    metin: "After the meal a young colleague wants to confess a sin he has told no one.",
    secenekler: [
      {
        metin: "Listen and counsel him.",
        basariliSonuc: {
          mesaj: "Your words gave him peace; your standing in the flock grew.",
        },
        basarisizSonuc: {
          mesaj: "You found no right words; he left more troubled.",
        },
      },
      {
        metin: "Say you have no time.",
        basariliSonuc: {
          mesaj: "You put your own peace first.",
        },
        basarisizSonuc: {
          mesaj: "The young colleague couldn't hide his disappointment.",
        },
      },
    ],
  },
  sosyal_dini_hayirsever_teklifi: {
    baslik: "A Wealthy Benefactor",
    metin: "A wealthy benefactor at the table asks if you'd join a new charity.",
    secenekler: [
      {
        metin: "Accept and contribute.",
        basariliSonuc: {
          mesaj: "Your gift was talked about; you're now known as generous.",
        },
        basarisizSonuc: {
          mesaj: "Your gift was collected but drew less notice than hoped.",
        },
      },
      {
        metin: "Politely decline.",
        basariliSonuc: {
          mesaj: "You kept your money and had a plain evening.",
        },
        basarisizSonuc: {
          mesaj: "The benefactor was a little disappointed.",
        },
      },
    ],
  },
  sosyal_dini_rakip_vaiz: {
    baslik: "A Doctrinal Argument",
    metin: "A preacher from another region defends a different interpretation at the table. The debate turns serious.",
    secenekler: [
      {
        metin: "Defend your view firmly.",
        basariliSonuc: {
          mesaj: "Your arguments won the table; the rival bowed his head.",
        },
        basarisizSonuc: {
          mesaj: "You lost the debate; colleagues looked disappointed.",
        },
      },
      {
        metin: "Change the subject.",
        basariliSonuc: {
          mesaj: "You avoided a needless clash.",
        },
        basarisizSonuc: {
          mesaj: "Some thought you ran; no matter.",
        },
      },
    ],
  },
  sosyal_dini_gizli_yazma: {
    baslik: "A Dusty Manuscript",
    metin: "In an old chest by the table you find a dusty manuscript no one noticed. Its pages are brittle.",
    secenekler: [
      {
        metin: "Examine and read it carefully.",
        basariliSonuc: {
          mesaj: "The manuscript revived a forgotten teaching.",
        },
        basarisizSonuc: {
          mesaj: "Most of the text had rotted; little left to read.",
        },
      },
      {
        metin: "Put it back; leave it.",
        basariliSonuc: {
          mesaj: "You curbed your curiosity and rejoined the table.",
        },
        basarisizSonuc: {
          mesaj: "You'll never learn what the chest held.",
        },
      },
    ],
  },
  sosyal_dini_cemaat_dedikodusu: {
    baslik: "Table Gossip",
    metin: "Your colleagues discuss a dispute between some families of the flock and ask your opinion.",
    secenekler: [
      {
        metin: "Offer to mediate.",
        basariliSonuc: {
          mesaj: "You bridged the two families; the flock called you wise.",
        },
        basarisizSonuc: {
          mesaj: "Your meddling worsened things; both sides drifted away.",
        },
      },
      {
        metin: "Stay out of it.",
        basariliSonuc: {
          mesaj: "You stayed out of the flock's affairs.",
        },
        basarisizSonuc: {
          mesaj: "Some expected more interest from you.",
        },
      },
    ],
  },
  sosyal_dini_mucize_soylentisi: {
    baslik: "A Rumor of a Miracle",
    metin: "A colleague excitedly says a sick child recovered after the prayer you read last month; a miracle.",
    secenekler: [
      {
        metin: "Stay humble; don't correct it.",
        basariliSonuc: {
          mesaj: "'God's work,' you said; your humility outdid the rumor.",
        },
        basarisizSonuc: {
          mesaj: "The rumor spread on; you felt uneasy.",
        },
      },
      {
        metin: "Let the rumor grow.",
        basariliSonuc: {
          mesaj: "The rumor spread; you're now called 'miraculous'.",
        },
        basarisizSonuc: {
          mesaj: "The family told the truth: coincidence. The rumor backfired.",
        },
      },
    ],
  },

  // ===== LONCA MECLISI / GUILD COUNCIL =====
  sosyal_lonca_fiyat_savasi: {
    baslik: "A Price Dispute",
    metin: "At the guild meeting some tradesmen propose a common price floor; others fiercely oppose. The call is yours.",
    secenekler: [
      {
        metin: "Back the shared price floor.",
        basariliSonuc: {
          mesaj: "Proposal passed; business became more predictable.",
        },
        basarisizSonuc: {
          mesaj: "Proposal rejected; some called you afraid of competition.",
        },
      },
      {
        metin: "Defend free competition.",
        basariliSonuc: {
          mesaj: "Free competition won; doors opened for bold tradesmen.",
        },
        basarisizSonuc: {
          mesaj: "Small tradesmen claimed you hurt them and sulked.",
        },
      },
    ],
  },
  sosyal_lonca_yeni_ortaklik: {
    baslik: "A Partnership Offer",
    metin: "A respected guild figure offers a joint venture. Profit-sharing, but risky.",
    secenekler: [
      {
        metin: "Accept and sign.",
        basariliSonuc: {
          mesaj: "Profit from month one; your guild standing rose.",
        },
        basarisizSonuc: {
          mesaj: "The expected profit never came; your capital melted.",
        },
      },
      {
        metin: "Decline for now; say you'll think.",
        basariliSonuc: {
          mesaj: "You didn't risk your capital.",
        },
        basarisizSonuc: {
          mesaj: "He found another partner and profited; you regret it.",
        },
      },
    ],
  },
  sosyal_lonca_rakip_husumeti: {
    baslik: "The Rival's Accusation",
    metin: "{rakip} accuses you of unfair competition before everyone at the meeting. All eyes are on you.",
    secenekler: [
      {
        metin: "Defend yourself; show evidence.",
        basariliSonuc: {
          mesaj: "Your evidence refuted it; {rakip} was shamed.",
        },
        basarisizSonuc: {
          mesaj: "Your defense failed; your name stayed tainted a while.",
        },
      },
      {
        metin: "Stay calm; don't answer.",
        basariliSonuc: {
          mesaj: "Your calm outweighed the charge; nobody took it seriously.",
        },
        basarisizSonuc: {
          mesaj: "Some took your silence for admission.",
        },
      },
    ],
  },
  sosyal_lonca_gizli_ticaret_yolu: {
    baslik: "A Whispered New Route",
    metin: "A tradesman knows a new trade route nobody else does, but wants something in return.",
    secenekler: [
      {
        metin: "Pay the price; get the info.",
        basariliSonuc: {
          mesaj: "The info was true; goods now arrive far cheaper.",
        },
        basarisizSonuc: {
          mesaj: "The route didn't exist or everyone knew it; money wasted.",
        },
      },
      {
        metin: "Refuse, suspicious.",
        basariliSonuc: {
          mesaj: "You didn't risk your money.",
        },
        basarisizSonuc: {
          mesaj: "Maybe you missed a valuable chance.",
        },
      },
    ],
  },
  sosyal_lonca_sahte_mal_iddiasi: {
    baslik: "An Accusation of Counterfeiting",
    metin: "A customer complained to the guild: one of your goods is fake. The council wants an explanation.",
    secenekler: [
      {
        metin: "Tell the truth; admit the mistake.",
        basariliSonuc: {
          mesaj: "You admitted the error and paid damages; the guild approved.",
        },
        basarisizSonuc: {
          mesaj: "Despite your confession, some tradesmen saw you differently.",
        },
      },
      {
        metin: "Deny it; blame your supplier.",
        basariliSonuc: {
          mesaj: "Unproven, case closed; uneasy, but your standing held.",
        },
        basarisizSonuc: {
          mesaj: "Your lie surfaced; your guild trust took a heavy blow.",
        },
      },
    ],
  },
  sosyal_lonca_baskanlik_adayligi: {
    baslik: "Talk of the Presidency",
    metin: "The guild's old chairman is thinking of retiring and your name is among the candidates. Run?",
    secenekler: [
      {
        metin: "Run; campaign.",
        basariliSonuc: {
          mesaj: "You won the vote! You're now among the guild's leading voices.",
        },
        basarisizSonuc: {
          mesaj: "You lost the vote; money and effort wasted, pride bruised.",
        },
      },
      {
        metin: "Step back for now.",
        basariliSonuc: {
          mesaj: "You felt your time hadn't come yet.",
        },
        basarisizSonuc: {
          mesaj: "Some think you missed your chance.",
        },
      },
    ],
  },

  // ===== PAZAR MEYDANI / MARKET SQUARE =====
  sosyal_pazar_soytari_gosterisi: {
    baslik: "The Square Jester",
    metin: "A jester draws a crowd in the square with acrobatics, then wants a volunteer from the audience.",
    secenekler: [
      {
        metin: "Volunteer; get on stage.",
        basariliSonuc: {
          mesaj: "You and the jester made the crowd laugh; the square cheered.",
        },
        basarisizSonuc: {
          mesaj: "Your clumsiness made all laugh, but at you, not with you.",
        },
      },
      {
        metin: "Stay in the crowd; watch.",
        basariliSonuc: {
          mesaj: "You enjoyed a fine show.",
        },
        basarisizSonuc: {
          mesaj: "An ordinary show.",
        },
      },
    ],
  },
  sosyal_pazar_kayip_cocuk: {
    baslik: "A Child Lost in the Crowd",
    metin: "A small crying child says he has lost his parent. No one stops to help.",
    secenekler: [
      {
        metin: "Take his hand; find his family.",
        basariliSonuc: {
          mesaj: "You found his family; the grateful parent hugged you.",
        },
        basarisizSonuc: {
          mesaj: "No family found; you left him with the square's guard.",
        },
      },
      {
        metin: "No time; walk on.",
        basariliSonuc: {
          mesaj: "You went on with your business.",
        },
        basarisizSonuc: {
          mesaj: "The child's tearful face stayed with you.",
        },
      },
    ],
  },
  sosyal_pazar_yankesici_kovalamaca: {
    baslik: "A Chase in the Square",
    metin: "A pickpocket snatches an old merchant's purse and runs through the square. Cries of 'Stop him!' rise.",
    secenekler: [
      {
        metin: "Chase and catch him.",
        basariliSonuc: {
          mesaj: "You caught him! The square hailed you a hero.",
        },
        basarisizSonuc: {
          mesaj: "He vanished in the crowd; you stood panting as all laughed.",
        },
      },
      {
        metin: "Stay out of it.",
        basariliSonuc: {
          mesaj: "You stayed out of it.",
        },
        basarisizSonuc: {
          mesaj: "Some thought you could have helped.",
        },
      },
    ],
  },
  sosyal_pazar_sarlatan_iksir: {
    baslik: "The Miracle Elixir Seller",
    metin: "A charlatan bawling from a colorful cart sells a 'miracle elixir' for every ailment. Very convincing.",
    secenekler: [
      {
        metin: "Buy a bottle; try it.",
        basariliSonuc: {
          mesaj: "Unbelievably, it worked! You feel livelier than in days.",
        },
        basarisizSonuc: {
          mesaj: "The elixir burned your throat and did nothing; he was gone.",
        },
      },
      {
        metin: "Walk away, suspicious.",
        basariliSonuc: {
          mesaj: "You used good sense.",
        },
        basarisizSonuc: {
          mesaj: "Perhaps it was a real chance missed.",
        },
      },
    ],
  },
  sosyal_pazar_halk_ozani: {
    baslik: "A Wandering Minstrel",
    metin: "In the square a minstrel sings a comic folk song about your region; the crowd laughs along.",
    secenekler: [
      {
        metin: "Tip him; make a request.",
        basariliSonuc: {
          mesaj: "The minstrel composed a verse just for you; the square smiled.",
        },
        basarisizSonuc: {
          mesaj: "The minstrel misheard and sang something odd, but fun.",
        },
      },
      {
        metin: "Listen from afar.",
        basariliSonuc: {
          mesaj: "A free bit of enjoyment.",
        },
        basarisizSonuc: {
          mesaj: "An ordinary moment.",
        },
      },
    ],
  },
  sosyal_pazar_kehanetci_kadin: {
    baslik: "The Seer in the Crowd",
    metin: "A mysterious woman in the square points at you: 'I see something in you, child. Come.'",
    secenekler: [
      {
        metin: "Sit with her.",
        basariliSonuc: {
          mesaj: "She said something vague but hopeful; it warmed you.",
        },
        basarisizSonuc: {
          mesaj: "Her words unsettled you and haunted your nights.",
        },
      },
      {
        metin: "Walk away; ignore her.",
        basariliSonuc: {
          mesaj: "You did not trust your fate to a stranger.",
        },
        basarisizSonuc: {
          mesaj: "You still felt her eyes on your back.",
        },
      },
    ],
  },
  sosyal_pazar_meydan_kavgasi: {
    baslik: "A Fight Between Stalls",
    metin: "A quarrel between two stallholders turns to shoving; fruit and vegetables fly.",
    secenekler: [
      {
        metin: "Step in and calm them.",
        basariliSonuc: {
          mesaj: "You calmed them both; the square applauded.",
        },
        basarisizSonuc: {
          mesaj: "A flying cabbage hit your face; stepping in was pointless.",
        },
      },
      {
        metin: "Watch from afar and enjoy.",
        basariliSonuc: {
          mesaj: "A funny sight, watched from safety.",
        },
        basarisizSonuc: {
          mesaj: "The fight ended by itself.",
        },
      },
    ],
  },

  // ===== SALON / NOBLE SALON =====
  sosyal_salon_entrika_fisiltisi: {
    baslik: "A Whisper Behind the Curtain",
    metin: "In a dim corner of the salon two nobles murmur of an intrigue. It may concern you too.",
    secenekler: [
      {
        metin: "Draw near and listen.",
        basariliSonuc: {
          mesaj: "What you heard showed you the salon's balance of power.",
        },
        basarisizSonuc: {
          mesaj: "You were noticed; being called an 'eavesdropper' stings.",
        },
      },
      {
        metin: "Carry on with your own talk.",
        basariliSonuc: {
          mesaj: "You stayed out of intrigues.",
        },
        basarisizSonuc: {
          mesaj: "Some of the whispers reached you anyway.",
        },
      },
    ],
  },
  sosyal_salon_dans_daveti: {
    baslik: "An Invitation to the Dance Floor",
    metin: "As the orchestra plays a waltz, a striking figure offers a hand and invites you to dance.",
    secenekler: [
      {
        metin: "Take the hand; dance.",
        basariliSonuc: {
          mesaj: "Your steps were fluid; the salon watched you.",
        },
        basarisizSonuc: {
          mesaj: "You trod on a foot and lost the rhythm; the salon smiled politely.",
        },
      },
      {
        metin: "Decline politely.",
        basariliSonuc: {
          mesaj: "You had a pleasant evening without dancing.",
        },
        basarisizSonuc: {
          mesaj: "An awkward silence followed.",
        },
      },
    ],
  },
  sosyal_salon_kumar_masasi: {
    baslik: "Gambling Among Crystal Glasses",
    metin: "A high-stakes card game runs in a corner of the salon. The nobles smile, but their eyes are doing sums.",
    secenekler: [
      {
        metin: "Sit down and play.",
        basariliSonuc: {
          mesaj: "The cards favored you; the salon whispered your name.",
        },
        basarisizSonuc: {
          mesaj: "A bad hand, a big loss; you kept smiling.",
        },
      },
      {
        metin: "Watch; do not join.",
        basariliSonuc: {
          mesaj: "You kept your money.",
        },
        basarisizSonuc: {
          mesaj: "You seemed dull, but it did not matter.",
        },
      },
    ],
  },
  sosyal_salon_skandal_soylentisi: {
    baslik: "A Rumor About You",
    metin: "Entering the salon you notice people staring and whispering. A rumor about you has spread.",
    secenekler: [
      {
        metin: "Confront it; refute the rumor.",
        basariliSonuc: {
          mesaj: "Your calm explanation put the rumor out.",
        },
        basarisizSonuc: {
          mesaj: "Your defense backfired; the rumor grew.",
        },
      },
      {
        metin: "Ignore it; hold your head high.",
        basariliSonuc: {
          mesaj: "Your indifference let the rumor die.",
        },
        basarisizSonuc: {
          mesaj: "Some took your silence for a confession.",
        },
      },
    ],
  },
  sosyal_salon_sanatci_kesfi: {
    baslik: "An Undiscovered Talent",
    metin: "In a corner, a young artist no one notices quietly shows their work. You cannot look away.",
    secenekler: [
      {
        metin: "Praise the work; offer support.",
        basariliSonuc: {
          mesaj: "Your support delighted the artist; you will be proud one day.",
        },
        basarisizSonuc: {
          mesaj: "You were kind, but the work did not interest you.",
        },
      },
      {
        metin: "Pass without noticing.",
        basariliSonuc: {
          mesaj: "You blended into the crowd.",
        },
        basarisizSonuc: {
          mesaj: "Perhaps you missed a real talent.",
        },
      },
    ],
  },
  sosyal_salon_duello_meydan_okumasi: {
    baslik: "A Dishonoring Word",
    metin: "As glasses clink, a jealous noble insults your family before everyone. The salon holds its breath.",
    secenekler: [
      {
        metin: "Challenge him to a duel.",
        basariliSonuc: {
          mesaj: "In a short duel your rival apologized; the salon whispered your name.",
        },
        basarisizSonuc: {
          mesaj: "The duel went badly; you were carried out badly wounded.",
        },
      },
      {
        metin: "Stay calm; do not reply.",
        basariliSonuc: {
          mesaj: "You defended honor with patience, not a sword; some approved.",
        },
        basarisizSonuc: {
          mesaj: "Some circles took your silence for cowardice.",
        },
      },
    ],
  },
};
