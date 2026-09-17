import type { OlayCeviri } from "./index";

/**
 * genel.ts — Meslek/çağdan bağımsız evrensel olayların İngilizce çevirisi (200 olay).
 * Türkçe kaynak kanonik; yalnız gösterim metinleri burada.
 * {dost}/{rakip}/{amir}/{ekip}/{bolge}/{yil} placeholder'ları birebir korunur.
 */
export const OLAYLAR_GENEL_EN: Record<string, OlayCeviri> = {
  kg_agir_idman: {
    baslik: "Pushing the Limits",
    metin: "You have felt weak lately. To bring your body back to its old resilience you could begin a hard training ritual that pushes your limits to the very end. But can your age and your body take it?",
    secenekler: [
      {
        metin: "Endure the pain, push past your limits.",
        basariliSonuc: {
          mesaj: "Your muscles turned to steel. Your body is now solid enough to withstand even the heaviest blows.",
        },
        basarisizSonuc: {
          mesaj: "Your body could not take the strain. The fibers in your knee tore; you now have a lasting ache that throbs even in rainy weather.",
        },
      },
      {
        metin: "Do not risk it, settle for light walks.",
        basariliSonuc: {
          mesaj: "You chose the safe path. You did not break a sweat, but you did not get hurt either.",
        },
        basarisizSonuc: {
          mesaj: "Even a light walk left you gasping for breath.",
        },
      },
    ],
  },
  kg_yasakli_kitap: {
    baslik: "The Sealed Book",
    metin: "In the market a strangely dressed stranger sold you a leather-bound, sealed book. It is quite clear the writings inside were banned by the local authorities (or the church). It may hold dangerous secrets.",
    secenekler: [
      {
        metin: "Break the seal and read the dark lore.",
        basariliSonuc: {
          mesaj: "What the book told changed how you see the world. You now know things ordinary people do not.",
        },
        basarisizSonuc: {
          mesaj: "As you turned the pages a neighbor saw you through the window and reported you. Your reputation was destroyed.",
        },
      },
      {
        metin: "Hand the book to the authorities (or the church) unread.",
        basariliSonuc: {
          mesaj: "You handed over the book. The authorities appreciated your loyalty and your faith.",
        },
        basarisizSonuc: {
          mesaj: "You gave up the book, but what was written in it stayed with you your whole life as a nagging curiosity.",
        },
      },
    ],
  },
  kg_meyhane_sirri: {
    baslik: "Whispers at Midnight",
    metin: "{dost} took you to the seediest tavern in the city. Later in the night, as everyone gets drunk, you notice the suspicious men at the next table are discussing very valuable commercial/political secrets.",
    secenekler: [
      {
        metin: "Buy them drinks and pump them for information.",
        basariliSonuc: {
          mesaj: "The drink loosened their tongues. You got wonderful intelligence about the city's future; you will not be making your moves blindly anymore.",
        },
        basarisizSonuc: {
          mesaj: "The men saw through your intent. They dragged you behind the tavern and gave you a thorough beating.",
        },
      },
      {
        metin: "Focus on your table, just drink with {dost}.",
        basariliSonuc: {
          mesaj: "You just drank and had fun. But as you scraped the bottom of your cup you notice you have grown a little too used to this life.",
        },
        basarisizSonuc: {
          mesaj: "Because your mind was at the next table, your conversation with {dost} was very flat.",
        },
      },
    ],
  },
  ekonomi_guvenli_yatirim: {
    baslik: "Your Sibling's Shop",
    metin: "A relative (your sibling or a close cousin) comes to you and offers you a share in the capital of the new smithy/weaver's shop they are setting up. It will not make you rich, but they say your money will not go to a stranger.",
    secenekler: [
      {
        metin: "Support the family, put up the capital.",
        basariliSonuc: {
          mesaj: "You put up the capital. The shop runs like clockwork; every year you take a regular, honest share from your family.",
        },
        basarisizSonuc: {
          mesaj: "The shop did not do the business you hoped. Whenever the subject comes up at family dinners, everyone's face falls.",
        },
      },
      {
        metin: "Do not mix blood ties with business, refuse.",
        basariliSonuc: {
          mesaj: "You kept your money in your pocket. Your sibling was a little put out, but at least you took no risk.",
        },
        basarisizSonuc: {
          mesaj: "Your sibling borrowed from someone else, opened the shop, and did very well. Now you quietly regret it.",
        },
      },
    ],
  },
  ekonomi_tefecilik_teklifi: {
    baslik: "A Desperate Friend",
    metin: "A very old and desperate friend asks you for a loan so as not to lose their shop. But they offer to repay you at a very high rate of interest. This offer is both profitable and morally questionable.",
    secenekler: [
      {
        metin: "Forget your morals, give the loan at high interest.",
        basariliSonuc: {
          mesaj: "You lent your friend money at interest. As you took the money you could not forget that look of mixed gratitude and hatred on their face.",
        },
        basarisizSonuc: {
          mesaj: "You had the contract signed, but it is very clear the friendship is completely over.",
        },
      },
      {
        metin: "I do not do moneylending, let me keep my money.",
        basariliSonuc: {
          mesaj: "You refused to lend your friend money at interest. Their shop went under, but your conscience and your money are intact.",
        },
        basarisizSonuc: {
          mesaj: "Your friend lost the shop and accused you of 'not being a friend in bad times'.",
        },
      },
    ],
  },
  ekonomi_tefecilik_sonucu: {
    baslik: "The Term Is Up",
    metin: "The term of the loan you gave your old friend is up. You went and knocked on their door, but weeping, they say business has gone badly and they have no money. You have two choices.",
    secenekler: [
      {
        metin: "Hire men, seize the shop and throw them out on the street.",
        basariliSonuc: {
          mesaj: "You sent your men. While your friend's family wept on the street, you took the keys to the shop. You won.",
        },
        basarisizSonuc: {
          mesaj: "You seized the shop by force, but the neighborhood jeered at you. Now they call you a 'bloodsucker' behind your back.",
        },
      },
      {
        metin: "Forgive the debt for old times' sake.",
        basariliSonuc: {
          mesaj: "You tore up the notes before their eyes. Your friend fell at your feet. You lost your money but regained your soul.",
        },
        basarisizSonuc: {
          mesaj: "You forgave the debt. Your conscience is at ease, but on the way home that evening you remembered how much you needed that money.",
        },
      },
    ],
  },
  ekonomi_kriz_donemi: {
    baslik: "The Bitter Face of the Crisis",
    metin: "The economic crisis has reached your home: there is no food left in the pantry, and your shop is on the edge of bankruptcy. You can spend your last capital on black-market food or on saving your business.",
    secenekler: [
      {
        metin: "Forget the business, buy food for my family with my last money.",
        basariliSonuc: {
          mesaj: "You closed the stall. You went bankrupt, your reputation reset to zero, but that evening your children/family are eating hot soup at the table.",
        },
        basarisizSonuc: {
          mesaj: "You spent your capital on food, but the black marketeer swindled you. You went bankrupt and stayed half-hungry.",
        },
      },
      {
        metin: "Let my family grit their teeth, spend the money saving my business.",
        basariliSonuc: {
          mesaj: "While everyone else went under, you stayed on your feet and grew rich! But when you got home you saw your family wasting away from malnutrition.",
        },
        basarisizSonuc: {
          mesaj: "You took the risk and lost. The crisis hit you too. Your last money is gone and your family was hospitalized from hunger.",
        },
      },
    ],
  },
  ekonomi_vergi_tahsildari: {
    baslik: "The Sly Collector",
    metin: "The sour-faced tax collector knocked on your door and is reading out the heavy figure in his ledger. But glancing around, he mutters, 'Perhaps I wrote it down wrong; a small mistake can be corrected.'",
    secenekler: [
      {
        metin: "Say 'I understand' and slip him a bribe under the table.",
        basariliSonuc: {
          mesaj: "Not used.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
        onTepki: {
          metin: "The collector smiles as he takes the purse you hold out. 'Very clever... But this amount only clears the ledger for this month. You understand, don't you?' The greedy man is trying to put you on a tribute.",
          geriCekilMetni: "Get angry and throw him out of the shop! (Back out of the bribe)",
          geriCekilSonucu: {
            mesaj: "You shouted at the man and drove him out! Then you went and paid your tax honestly into the state coffers. Your money is gone but your honor is saved.",
          },
          devamMetni: "Accept it quietly, get into the wheel of bribery.",
          devamSonucu: {
            mesaj: "You became the collector's man. You dodged the tax, but you are now a prisoner of this secret.",
          },
        },
      },
      {
        metin: "Pay the state's tax in full.",
        basariliSonuc: {
          mesaj: "The collector took the full tax with a scowl. Your pocket has a hole in it, but you did not bow to anyone.",
        },
        basarisizSonuc: {
          mesaj: "You paid your tax, but the collector marked you. Even your honest earnings will be made to look suspect.",
        },
      },
    ],
  },
  ekonomi_rusvet_teklifi: {
    baslik: "The Devil's Purse",
    metin: "One of the richest but darkest men in the city holds out a purse stuffed with gold in exchange for storing an illegal good in your warehouses.",
    secenekler: [
      {
        metin: "Take the gold and store the goods.",
        basariliSonuc: {
          mesaj: "You hid the purse in your robe. You grew rich, but now every time there's a knock at the door at night your heart will pound.",
        },
        basarisizSonuc: {
          mesaj: "While hiding the goods one of your apprentices saw you! You were reported, fined, and your reputation was stained.",
        },
      },
      {
        metin: "Refuse in anger and throw the man out.",
        basariliSonuc: {
          mesaj: "You drove the man out of your shop! The people are talking about your courage; you are the 'Man Who Cannot Be Bought'.",
        },
        basarisizSonuc: {
          mesaj: "The man narrowed his eyes as he took back the purse. From that day on he became your greatest and darkest enemy.",
        },
      },
    ],
  },
  rutbe_kumandan_karari: {
    baslik: "The Commander's Dilemma",
    metin: "You stand before the enemy lines. If you give the order to attack your chance of victory is high, but most of the young soldiers under your command will die. If you wait your soldiers live but the battle may be lost.",
    secenekler: [
      {
        metin: "We march to death! Give the order to attack.",
        basariliSonuc: {
          mesaj: "You crushed the enemy! You became the hero of the battle, but those young corpses on the battlefield began to invade your dreams.",
        },
        basarisizSonuc: {
          mesaj: "The attack turned into a massacre. You lost your soldiers and you were defeated.",
        },
      },
      {
        metin: "Fall back! I cannot sacrifice my soldiers.",
        basariliSonuc: {
          mesaj: "The enemy advanced; it looks like you lost the battle. But your soldiers are grateful to you; you saved their lives.",
        },
        basarisizSonuc: {
          mesaj: "The king declared you a coward. You are at risk of being stripped of your ranks.",
        },
      },
    ],
  },
  rutbe_lonca_ustasi_karari: {
    baslik: "The Power of the Guild Master",
    metin: "You are now the trade ruler of the city. You can put a monopoly on every good that enters the market and crush the small tradesmen, or share the goods with them and become the people's champion.",
    secenekler: [
      {
        metin: "Set up a monopoly, pull all goods into your own warehouses.",
        basariliSonuc: {
          mesaj: "You exploited everything in the market. While small tradesmen go bankrupt, you build towers of gold.",
        },
        basarisizSonuc: {
          mesaj: "The small tradesmen revolted and burned your warehouses! Greed ended in a great fire.",
        },
      },
      {
        metin: "Distribute the goods fairly, protect the small tradesmen.",
        basariliSonuc: {
          mesaj: "Every tradesman in the city prays for you. You did not grow rich, but you became the most loved and respected man in the city.",
        },
        basarisizSonuc: {
          mesaj: "You tried to be fair, but the other big merchants shut you out from among them.",
        },
      },
    ],
  },
  rutbe_basrahip_hukmu: {
    baslik: "Divine Justice",
    metin: "The richest noble in the city committed a great murder in your temple. You can excommunicate him and send him to execution, or forgive his sin in exchange for a hefty 'church donation'.",
    secenekler: [
      {
        metin: "God's justice is not for sale! Excommunicate him.",
        basariliSonuc: {
          mesaj: "The noble was clapped in chains in shock. The people applaud your courage on their feet!",
        },
        basarisizSonuc: {
          mesaj: "The noble's family did not accept this. One night they sent armed men to your temple. Your life is in danger!",
        },
      },
      {
        metin: "Quietly accept the donation and cleanse his sin.",
        basariliSonuc: {
          mesaj: "Chests of gold were carried into your cellar. The noble is free. The people look at you with hatred, and you cannot look at yourself in the mirror.",
        },
        basarisizSonuc: {
          mesaj: "It came out that you took a bribe. The other priests rose up, your title was shaken.",
        },
      },
    ],
  },
  asker_birlik_kaynak: {
    baslik: "The Unit's Rations",
    metin: "You were allotted gold for your unit's winter provisions and swords. You can either really spend this money on the soldiers, or pocket it with false records.",
    secenekler: [
      {
        metin: "Spend all the money on the soldiers' training and their stomachs.",
        basariliSonuc: {
          mesaj: "Your soldiers are fed, their swords sharp. In battle they will stand behind you like a wall.",
        },
        basarisizSonuc: {
          mesaj: "The merchants cheated you and the provisions came up short, but your intentions were good.",
        },
      },
      {
        metin: "Alter the record and keep the gold for yourself.",
        basariliSonuc: {
          mesaj: "You stashed the gold under your bed. Your soldiers drill with rusty swords; you don't care.",
        },
        basarisizSonuc: {
          mesaj: "The inspector found the false records! You were court-martialed and your reputation was destroyed.",
        },
      },
    ],
  },
  komik_kecinin_intikami: {
    baslik: "The Devilish Goat",
    metin: "Your neighbor's psychopath goat with the strange stare snapped its rope and charged straight into your garden, right among your laundry. The whole neighborhood is at their windows watching you.",
    secenekler: [
      {
        metin: "Let out a war cry and leap onto the goat!",
        basariliSonuc: {
          mesaj: "You soared through the air and pinned the goat to the ground by its horns! The neighborhood applauds you wildly.",
        },
        basarisizSonuc: {
          mesaj: "The goat juked you with a perfect move and sent you flying into a mud puddle. On top of that it ate your trousers.",
        },
      },
      {
        metin: "Don't get involved, run inside and lock the door.",
        basariliSonuc: {
          mesaj: "The goat chewed on your laundry a bit, then got bored and left. Your pride is hurt but you are unharmed.",
        },
        basarisizSonuc: {
          mesaj: "The goat wrecked the garden, and on top of that broke a window with its horns.",
        },
      },
    ],
  },
  ruh_uykusuzluk_hayaletleri: {
    baslik: "Sleepless Nights",
    metin: "You have not been able to sleep for days. When your eyelids grow heavy, shapes that are not there appear on the wall, the faces of dead old friends (or enemies).",
    secenekler: [
      {
        metin: "Go to the priests/imams and ask for prayers and an amulet.",
        basariliSonuc: {
          mesaj: "The prayers and incense worked. At last you had an unbroken sleep.",
        },
        basarisizSonuc: {
          mesaj: "The amulets did not work; the ghosts kept smiling at you from the walls.",
        },
      },
      {
        metin: "I'm losing my mind! I have to manage on my own.",
        basariliSonuc: {
          mesaj: "In time you fainted from exhaustion and your brain reset itself.",
        },
        basarisizSonuc: {
          mesaj: "From sleeplessness you fell down the stairs. The exhaustion is tearing you apart physically too.",
        },
      },
    ],
  },
  halk_ahlaksiz_dedigodusu: {
    baslik: "The People's Hatred",
    metin: "Your reputation and your morals are in the gutter. As you walk down the street people spit at you; the tradesmen don't want to sell you goods.",
    secenekler: [
      {
        metin: "Hand out free provisions in the square to fix your reputation.",
        basariliSonuc: {
          mesaj: "Your generosity reached people's stomachs. Those who used to spit now call you a 'benefactor'.",
        },
        basarisizSonuc: {
          mesaj: "The people took the provisions but still kept cursing you behind your back. Your money was wasted.",
        },
      },
      {
        metin: "Hold your head high, don't care about this herd.",
        basariliSonuc: {
          mesaj: "You don't care what they think. You went on your hard and merciless way.",
        },
        basarisizSonuc: {
          mesaj: "Though you pretended not to care, a thrown rotten tomato hit you in the head. You are collapsing inside.",
        },
      },
    ],
  },
  "halk_tanınmayan_yabanci": {
    baslik: "The Invisible Man",
    metin: "You have been in this land for years but you are still treated like a ghost. State doors close in your face, negotiations turn out against you.",
    secenekler: [
      {
        metin: "Show up at a big festival and draw all eyes to yourself.",
        basariliSonuc: {
          mesaj: "Thanks to your showy clothes and your generosity, some people finally learned your name!",
        },
        basarisizSonuc: {
          mesaj: "Your efforts went unnoticed. In the crowd you are just a nobody with a lighter purse.",
        },
      },
      {
        metin: "Enjoy the invisibility, do your work quietly.",
        basariliSonuc: {
          mesaj: "Being invisible is staying out of trouble. No one asked you for tax or bribes.",
        },
        basarisizSonuc: {
          mesaj: "Being ignored, day by day, turned into a heavy burden crushing your spirit.",
        },
      },
    ],
  },
  sezgi_gozlemci_yardimci: {
    baslik: "The Eye of the Dark Streets",
    metin: "A sharp-eyed (but dangerous) informant who hears everything on the streets, who knows who sleeps with whom and who sells goods for how much, offers to work for you.",
    secenekler: [
      {
        metin: "Hire him, let the city's secrets be yours.",
        basariliSonuc: {
          mesaj: "You hired the informant. Now you can predict in advance what your rivals will do on the moves you make.",
        },
        basarisizSonuc: {
          mesaj: "The man took the money and vanished the next day. You were swindled.",
        },
      },
      {
        metin: "My own instincts are enough for me, refuse.",
        basariliSonuc: {
          mesaj: "You were right not to trust such dark types. You carried on your business with your own wits.",
        },
        basarisizSonuc: {
          mesaj: "Later, when you lost a tender blindly, you said 'I wish I had hired that man'.",
        },
      },
    ],
  },
  eksen_ani_karar_ani: {
    baslik: "No Time to Delay",
    metin: "A suspicious fire broke out at the governor's mansion, and inside a huge chest of gold sits undefended. The roof will collapse in a few minutes. No time to think!",
    secenekler: [
      {
        metin: "Rush inside and grab that chest!",
        basariliSonuc: {
          mesaj: "You came out through the flames with the chest! You have burns, but you added a fortune to your fortune.",
        },
        basarisizSonuc: {
          mesaj: "A beam fell on your head! They carried you out like a corpse; you were in a coma for days.",
        },
      },
      {
        metin: "This is madness! Watch from a distance.",
        basariliSonuc: {
          mesaj: "As the building collapsed before your eyes you said 'good thing I didn't go in'. It's not worth your life.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
      },
    ],
  },
  eksen_dusmanin_insafina_kaldi: {
    baslik: "The Broken Enemy",
    metin: "The man who tormented you for years is now completely bankrupt, on his knees, begging you for a scrap of mercy. You can draw your sword or give him bread.",
    secenekler: [
      {
        metin: "Pity him, put gold in his pocket and tell him to go.",
        basariliSonuc: {
          mesaj: "You refused to drink the poison of revenge. Your enemy kissed your hands weeping and left the city.",
        },
        basarisizSonuc: {
          mesaj: "The moment you turned your back on him he stabbed a dagger into it! Your mercy nearly killed you.",
        },
      },
      {
        metin: "The price of the past is paid in blood! Punish him.",
        basariliSonuc: {
          mesaj: "You showed no mercy and sent him to the dungeons/death. No one in the city dares even speak your name anymore.",
        },
        basarisizSonuc: {
          mesaj: "Your cruelty made the people revolt; they stopped you and took the man from your hands.",
        },
      },
    ],
  },
  ekip_referansli_yardimci: {
    baslik: "A Master Swordsman",
    metin: "A master swordsman/bodyguard with battle experience and a scarred face offers to enter your service. The advance he wants is quite steep, but he swears to protect you from everything.",
    secenekler: [
      {
        metin: "I'm hiring you, be my shadow.",
        basariliSonuc: {
          mesaj: "The man started work. His presence alone was enough to keep the jackals around you away.",
        },
        basarisizSonuc: {
          mesaj: "The night he took the advance the man got drunk, lost it at gambling, and fled the city!",
        },
      },
      {
        metin: "You're too expensive, I don't need protection.",
        basariliSonuc: {
          mesaj: "You refused the offer. You keep your money in your pocket and go on walking around alone.",
        },
        basarisizSonuc: {
          mesaj: "Shortly after the man left, two thugs cornered you; 'it was obvious you had no guard,' they smirked.",
        },
      },
    ],
  },
  ekip_ucuz_belirsiz_yardimci: {
    baslik: "The Street Orphan",
    metin: "A youth raised on the streets, scrawny but with a sharp look, grabbed your leg. 'Give me a bowl of soup and I'll do any job for you,' he says. Whether there is a talent in him or just a thief is unclear.",
    secenekler: [
      {
        metin: "Come on then, try your luck.",
        basariliSonuc: {
          mesaj: "You took the boy on. In his first days he seems very loyal to you; time will show his real talent.",
        },
        basarisizSonuc: {
          mesaj: "On the very first day the boy stole 10 gold from your strongbox and vanished.",
        },
      },
      {
        metin: "Street rat! Stay away from me.",
        basariliSonuc: {
          mesaj: "You shoved the boy aside and went on your way. Your conscience stung a little.",
        },
        basarisizSonuc: {
          mesaj: "While chasing the boy off you noticed he had lifted a few coins from your pocket with quick fingers.",
        },
      },
    ],
  },
  ekip_yeni_taniski: {
    baslik: "A Traveling Companion",
    metin: "A traveler you met at an inn during a journey was very impressed by your goals. He wants to walk the same road as you. He is knowledgeable but hides his past.",
    secenekler: [
      {
        metin: "You can walk beside me.",
        basariliSonuc: {
          mesaj: "He picked up his pack and followed you. The stories he tells make your journey far more bearable.",
        },
        basarisizSonuc: {
          mesaj: "While you slept at night you noticed the man packing his things and leaving quietly.",
        },
      },
      {
        metin: "I walk my road alone.",
        basariliSonuc: {
          mesaj: "You parted ways at the inn. Walking alone is always the safest.",
        },
        basarisizSonuc: {
          mesaj: "The rest of the road was silent and long; you couldn't help thinking of the stories the traveler would have told.",
        },
      },
    ],
  },
  ekip_tehlikeli_kervan_yolu: {
    baslik: "The Cliff Pass",
    metin: "You have to bring a very valuable cargo through the 'Cliff Pass'. That pass is the haunt of bandits and predators. Will you risk your crew, or take the lead yourself?",
    secenekler: [
      {
        metin: "I'll take this risk! Lead the caravan.",
        basariliSonuc: {
          mesaj: "With your sword and your courage you brought the caravan through the cliff! The gain is enormous.",
        },
        basarisizSonuc: {
          mesaj: "The bandits ambushed you! You took an arrow in the belly, the goods were plundered.",
        },
      },
      {
        metin: "Order {ekip}: 'Bring the cargo through safe and sound.'",
        basariliSonuc: {
          mesaj: "Your crew was drenched in sweat but brought the goods through successfully. This is leadership.",
        },
        basarisizSonuc: {
          mesaj: "Days passed... Neither {ekip} nor the cargo came back. The wilderness swallowed them.",
        },
      },
    ],
  },
  ekip_riskli_gorev_teklifi: {
    baslik: "The Poison Courier",
    metin: "A mysterious man from the palace handed you a sealed letter. 'Get this to the enemy fortress. If you're caught, we don't know you,' he said. A very dangerous mission.",
    secenekler: [
      {
        metin: "I carry the secret. Go yourself.",
        basariliSonuc: {
          mesaj: "In the dark of night you delivered the letter. The palace now owes you a great deal.",
        },
        basarisizSonuc: {
          mesaj: "The border guards caught you! You were tortured; you barely escaped with your life.",
        },
      },
      {
        metin: "Let it be handled in the shadows, send {ekip}.",
        basariliSonuc: {
          mesaj: "{ekip} completed the mission in your name and returned safely.",
        },
        basarisizSonuc: {
          mesaj: "The helper you sent was caught at the border and hanged! Their blood is on your hands.",
        },
      },
    ],
  },
  ekip_koruma_kiralama: {
    baslik: "A Dark Shadow",
    metin: "Your enemies in the city are growing. In the corner of the inn, a mercenary with a scarred face offers you his services. He praises himself a lot, but only time will tell how skilled he really is.",
    secenekler: [
      {
        metin: "Hire him as your bodyguard.",
        basariliSonuc: {
          mesaj: "You paid the money. Now he follows you like a shadow.",
        },
        basarisizSonuc: {
          mesaj: "You gave the money but the man vanished at midnight.",
        },
      },
      {
        metin: "Refuse, fend for yourself.",
        basariliSonuc: {
          mesaj: "You refused the offer.",
        },
        basarisizSonuc: {
          mesaj: "It was as if the man you refused whispered to the three people waiting for you at the exit; you were ambushed in a dark alley.",
        },
      },
    ],
  },
  ekip_koruma_testi: {
    baslik: "The Test of Loyalty",
    metin: "In a night alley three thugs blocked your way. Their knives glint. You ordered your bodyguard to step forward and handle it. Now it is time to see his hidden talent.",
    secenekler: [
      {
        metin: "Wait for your bodyguard to fight.",
        basariliSonuc: {
          mesaj: "Your bodyguard moved like lightning and laid all three flat! The man you hired is a real killing machine.",
        },
        basarisizSonuc: {
          mesaj: "Your bodyguard saw the knives, took fright, and ran! The thugs beat you savagely and took your money.",
        },
      },
    ],
  },
  ekip_tuccar_yaveri: {
    baslik: "A Clever Apprentice",
    metin: "Your business is growing and you are thinking of hiring a clever-looking youth as an assistant to keep the accounts. He could earn you great sums or empty your strongbox.",
    secenekler: [
      {
        metin: "Make him your accountant.",
        basariliSonuc: {
          mesaj: "The youth sat down at his desk and began organizing the ledgers.",
        },
        basarisizSonuc: {
          mesaj: "The youth vanished the moment he collected his first week's wages. A few pages of the ledgers went with him.",
          detay: "Clever, yes — but at the wrong things.",
        },
      },
      {
        metin: "Keep doing the work yourself.",
        basariliSonuc: {
          mesaj: "The workload wore on your health a bit, but at least the key to the strongbox is yours.",
        },
        basarisizSonuc: {
          mesaj: "A winter buried in the ledgers wore you down badly; your eyes are blurred, your back stiff.",
          detay: "Carrying it all alone has its own price.",
        },
      },
    ],
  },
  ekip_tuccar_yaveri_testi: {
    baslik: "A Big Shipment",
    metin: "While you were out of town the management of a large shipment of goods fell to your accountant. When you got back you look at the state of the strongbox.",
    secenekler: [
      {
        metin: "Check the accounts.",
        basariliSonuc: {
          mesaj: "You couldn't believe your eyes! Your assistant made brilliant use of market gaps and doubled your profit.",
        },
        basarisizSonuc: {
          mesaj: "The strongbox is bone empty! Your assistant took all the cash and fled at midnight on a ship.",
        },
      },
    ],
  },
  hizip_asker_saflasma: {
    baslik: "A Split in the Barracks",
    metin: "The army is seething inside. The 'Old Guard' defends the general's rigid and noble rules, while the 'New Order' wants a root reform based on merit. Soon the weapons may turn on each other.",
    secenekler: [
      {
        metin: "Our traditions keep us alive! Join the Old Guard.",
        basariliSonuc: {
          mesaj: "You took your place beside the noble commanders. The traditionalists embraced you.",
        },
        basarisizSonuc: {
          mesaj: "You joined, but the young upstarts look at you as an enemy.",
        },
      },
      {
        metin: "This rotten order must change! Join the New Order.",
        basariliSonuc: {
          mesaj: "You entered the reformers' ranks like a young lion. The winds of change are blowing!",
        },
        basarisizSonuc: {
          mesaj: "You joined, but the noble general has already put your name on the blacklist.",
        },
      },
      {
        metin: "A soldier does not do politics. Stay neutral.",
        basariliSonuc: {
          mesaj: "You said 'my sword is only for the homeland'. Both sides respected you.",
        },
        basarisizSonuc: {
          mesaj: "Neutrality means getting caught between two warring sides and beaten. Both factions shut you out.",
        },
      },
    ],
  },
  hizip_tuccar_saflasma: {
    baslik: "Who Rules the Market?",
    metin: "The chamber of commerce has split in two. The Harbor Guild, backed by the nobility, defends monopoly; the Market Union defends the small tradesmen's right to free competition. If you don't pick a side you could go bankrupt.",
    secenekler: [
      {
        metin: "Wealth and power! Join the Harbor Guild.",
        basariliSonuc: {
          mesaj: "The noble merchants took you in among them. Tax cuts started at once.",
        },
        basarisizSonuc: {
          mesaj: "You joined, but the small tradesmen turned their backs on you.",
        },
      },
      {
        metin: "The people's power! Join the Market Union.",
        basariliSonuc: {
          mesaj: "You became the tradesmen's champion. The man on the street now shops at your stall.",
        },
        basarisizSonuc: {
          mesaj: "You joined, but the nobility slapped heavy customs duties on your goods.",
        },
      },
      {
        metin: "I only look after my own profit. Stay neutral.",
        basariliSonuc: {
          mesaj: "By trading under the table with both sides, you put your cunning to work.",
        },
        basarisizSonuc: {
          mesaj: "Because you stayed neutral, both guilds put an embargo on you!",
        },
      },
    ],
  },
  hizip_din_saflasma: {
    baslik: "The Holy Schism",
    metin: "The centers of faith have split in two. The Traditionalists want to bring back the ancient and rigid laws, while the Reformists demand that religion be translated into the people's language and enlightenment. Which side are you on?",
    secenekler: [
      {
        metin: "The rules cannot be bent! Join the Traditionalists.",
        basariliSonuc: {
          mesaj: "The old bishops appreciated you. You are the guardian of ancient knowledge.",
        },
        basarisizSonuc: {
          mesaj: "The young congregation accused you of bigotry and left the temple.",
        },
      },
      {
        metin: "Time for enlightenment! Join the Reformists.",
        basariliSonuc: {
          mesaj: "The squares overflow to hear you. You became the voice of the new age.",
        },
        basarisizSonuc: {
          mesaj: "The Inquisition / High Council is threatening to accuse you of heresy.",
        },
      },
      {
        metin: "Religion cannot be a tool of politics. Do not choose a side.",
        basariliSonuc: {
          mesaj: "There is only peace in your sermons. People come to you not for politics but to be cleansed.",
        },
        basarisizSonuc: {
          mesaj: "Because you did not choose a side, both groups began to stop taking your pulpit seriously.",
        },
      },
    ],
  },
  dunya_savas_biter: {
    baslik: "The End of the Bloody Mud",
    metin: "With the treaty signed in {yil}, the war finally ended. Comrades returning from the front missing limbs and with vacant stares are looking for work. The treasury is bone dry, the streets are full of veterans. Where will your place be in the new world order?",
    secenekler: [
      {
        metin: "Gather your old comrades, build a support network for veterans.",
        basariliSonuc: {
          mesaj: "You found work and food for hundreds of veterans. In the city you have a huge unofficial army more loyal to you than to their own fathers.",
          detay: "Most of these men can't read or write, but they'd give their lives for you.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't find the work you promised. Your old comrades-in-arms knocked on your door and accused you of 'peddling dreams'.",
          detay: "You will never be able to look a soldier in the face again.",
        },
      },
      {
        metin: "This is the chance! Snap up the ownerless lands left by the war for a pittance.",
        basariliSonuc: {
          mesaj: "You bought the fields of the fallen for a few coins and seized their deeds. The war is over and you are a landlord.",
          detay: "The widows of the former owners sometimes spit in your face at the market, while you count your gold.",
        },
        basarisizSonuc: {
          mesaj: "The real heirs of most of the lands you bought turned up. The court annulled your deeds.",
          detay: "The property of the dead did not bless you.",
        },
      },
      {
        metin: "Sell the names of old soldiers who might revolt to the new government.",
        basariliSonuc: {
          mesaj: "You handed over the list. That night dozens of your old comrades in the city were taken from their beds and thrown in the dungeons. Your purse is full but your hands are bloody.",
          detay: "You are now a secret hound of the new state.",
        },
        basarisizSonuc: {
          mesaj: "The list leaked before it reached the new government. Your old comrades learned who informed on them; now you fear every shadow — and you got not a single coin from the state.",
          detay: "Once the betrayal came out you lost both the money and your safety.",
        },
      },
    ],
  },
  dunya_savas_cephe_cagrisi: {
    baslik: "The Death Order",
    metin: "The war has entered its bloodiest phase. Your regiment is being driven straight into a redoubt that reeks of death. The commander is assigning duties in his tent at midnight. His eyes are on you.",
    secenekler: [
      {
        metin: "I'll be first to march to death! Sign up for the assault column.",
        basariliSonuc: {
          mesaj: "You turned the redoubt into a bloodbath and were the first to fall into it! The general pinned a medal on your chest himself.",
          detay: "You cannot forget the faces of the enemies you cut down that day, but the history books will write your name in gold letters.",
        },
        basarisizSonuc: {
          mesaj: "A cannonball blew you into the air. For days you lay among the corpses, taken for dead and left there.",
          detay: "When you woke you realized a part of your body was missing.",
        },
      },
      {
        metin: "Put me on the supply line, behind the front, commander.",
        basariliSonuc: {
          mesaj: "Hiding behind the sacks of provisions, you got through the war safe and sound.",
          detay: "Your returning comrades-in-arms no longer sit at the same table as you. That shame on your face will last your whole life.",
        },
        basarisizSonuc: {
          mesaj: "Enemy cavalry that broke through to the supply line put you to the sword. Your cowardice could not protect you.",
          detay: "You both fled and barely escaped being taken prisoner.",
        },
      },
    ],
  },
  dunya_savas_maas_kesintisi: {
    baslik: "Hungry Soldiers",
    metin: "As the war drags on the treasury has run dry. Not a single silver coin has been paid in three months. The soldiers' boots are holed, their bellies empty. Whispers of mutiny go around the barracks.",
    secenekler: [
      {
        metin: "Be the ringleader! Take the petition and march to the general's tent.",
        basariliSonuc: {
          mesaj: "You slammed your fist on the table. The general, fearing mutiny, distributed the treasury's last money to you all. You are a legend!",
          detay: "But the high command has filed you as a 'dangerous rebel'.",
        },
        basarisizSonuc: {
          mesaj: "The general didn't even listen to you. You were sentenced to the lash for inciting mutiny and thrown in the dungeon.",
          detay: "The soldiers behind you took fright and sold you out. You were left alone.",
        },
      },
      {
        metin: "Say 'you're right', but convince them to plunder the nearby villages.",
        basariliSonuc: {
          mesaj: "With the hungry soldiers you fell on the defenseless villages by night. You came back with gold and food, but the sky was blood-red that night.",
          detay: "The face of that weeping village woman is in your nightmares now.",
        },
        basarisizSonuc: {
          mesaj: "The villagers turned out tougher than you expected. With scythes and axes they ambushed the soldiers; you were badly wounded in the belly.",
          detay: "Being beaten by villagers while plundering finished your reputation forever.",
        },
      },
    ],
  },
  dunya_salgin_biter: {
    baslik: "The Retreat of Death",
    metin: "After months of horror the plague is retreating. A third of the population is gone. There are ownerless houses, shops, and orphans wandering hungry in the streets. The city is being reborn.",
    secenekler: [
      {
        metin: "Seize the ownerless properties by forging deeds.",
        basariliSonuc: {
          mesaj: "You moved into the dead's houses before their beds had cooled. You built a huge property empire, but in your nightmares you see those faces.",
        },
        basarisizSonuc: {
          mesaj: "The real heirs returned to town. You were tried for fraud, and the people tried to lynch you.",
        },
      },
      {
        metin: "Gather the orphans who survived the plague and build them a home.",
        basariliSonuc: {
          mesaj: "The orphans grew up in your hands. They are no longer just apprentices but your most loyal children.",
          detay: "Years later those children will carry your business empire on their backs.",
        },
        basarisizSonuc: {
          mesaj: "Caring for the children drained you financially. Some stole and ran off, but still your conscience is at ease.",
        },
      },
    ],
  },
  dunya_ekonomi_toparlanma: {
    baslik: "A New Era",
    metin: "The state minted new money, the roads opened. The heavy dust of the crisis is lifting. Whoever makes the first bold move will skim the cream of the market.",
    secenekler: [
      {
        metin: "Plunge into debt, buy up all the goods! Grow aggressively.",
        basariliSonuc: {
          mesaj: "While your rivals still trembled with fear, you filled your warehouses. You caught the recovery wave and your fortune soared!",
        },
        basarisizSonuc: {
          mesaj: "You rushed too much. When prices hit bottom once more, the debts throttled you. You lost everything you had.",
        },
      },
      {
        metin: "Be cautious, buy little by little.",
        basariliSonuc: {
          mesaj: "You moved forward with risk-free, solid steps. You did not get rich, but your feet are planted firmly on the ground.",
        },
        basarisizSonuc: {
          mesaj: "You waited too long; by the time you entered the market the big wolves had snapped up every tender.",
        },
      },
    ],
  },
  rusvet_teklif_geldi: {
    baslik: "The Offer Comes to You",
    metin: "Now that you are someone whose word carries weight, for the first time you are the one being offered a bribe. A contractor says that if you put in a word somewhere, the tender will be his. The purse is on the table.",
    secenekler: [
      {
        metin: "Take the purse, put in the word.",
        basariliSonuc: {
          mesaj: "The tender went to him, the purse to you. Nobody asked anything.",
          detay: "How easy it was frightened you. A week later a second purse arrived, and you're thinking about when saying 'no' became impossible.",
        },
        basarisizSonuc: {
          mesaj: "The contractor was caught and the first thing he did was give your name.",
          detay: "Your reputation collapsed. Everything you built over years fell apart with one statement; the bitterest part is that you can't even object, because it's true.",
        },
      },
      {
        metin: "Refuse and put the offer on record.",
        basariliSonuc: {
          mesaj: "You documented the offer; the contractor was tried, your name was cleared.",
          detay: "Your honesty is capital now. People entrust you with sensitive work. And there's a man behind you who will never forgive you.",
        },
        basarisizSonuc: {
          mesaj: "You refused; the contractor first slandered you, then sabotaged your business.",
          detay: "No one believed the offer existed, everyone believed in your feud. You did the right thing and you're paying for it alone.",
        },
      },
      {
        metin: "Neither take nor refuse — blackmail with the documents and take the tender for yourself.",
        basariliSonuc: {
          mesaj: "You threatened the contractor into withdrawing and took the tender yourself.",
          detay: "You didn't take a bribe, you just turned weakness into money. Now you write the rules of this game.",
        },
        basarisizSonuc: {
          mesaj: "The contractor didn't bow to your blackmail and sent hired killers to your house.",
          detay: "Trying to play cunning nearly cost you your life. All your connections were cut.",
        },
      },
    ],
  },
  rusvet_yargic: {
    baslik: "At the Courthouse Door",
    metin: "You are a defendant in a case brought against you unjustly. Your lawyer leaned to your ear: 'I spoke with the judge's clerk. A certain sum means a certain verdict. Or we trust the court and wait.'",
    secenekler: [
      {
        metin: "Pay the clerk, guarantee the verdict.",
        basariliSonuc: {
          mesaj: "The verdict came out in your favor; you were innocent anyway, but you bought it with money.",
          detay: "You were in the right and you had to buy your rightness. Your faith in justice stayed behind in that courtroom.",
        },
        basarisizSonuc: {
          mesaj: "The clerk took the money, the judge knew nothing; you lost the money and got the sentence.",
          detay: "You were swindled and couldn't even complain — because complaining would mean confessing you tried to bribe.",
        },
      },
      {
        metin: "Trust the court, defend yourself.",
        basariliSonuc: {
          mesaj: "You made your own defense and were acquitted; the courtroom applauded you.",
          detay: "The judge used the phrase 'the defendant's honesty' in the verdict. That phrase will make you stand out in the city for years.",
        },
        basarisizSonuc: {
          mesaj: "You were innocent but convicted; a few months in prison and a heavy fine.",
          detay: "The months in prison finished your health and your business. When you got out your shop was closed and no one wanted to hire you.",
        },
      },
    ],
  },
  genel_sehir_secimi: {
    baslik: "The Crossroads",
    metin: "Business is slow where you are. There are two options: the windy port city to the north — lively, risky, lucrative. Or the great market city to the south — crowded, competitive, stable.",
    secenekler: [
      {
        metin: "Move to the port city.",
        basariliSonuc: {
          mesaj: "You found work quickly in the port; sea trade pays.",
          detay: "The port never sleeps: ships, contraband goods, foreign tongues. Here money is made fast and lost fast.",
        },
        basarisizSonuc: {
          mesaj: "Holding on in the port was harder than you thought; your first year passed at a loss.",
          detay: "Everyone had a network and you had none. You started in a cheap room, amid damp and noise.",
        },
      },
      {
        metin: "Move to the market city.",
        basariliSonuc: {
          mesaj: "You set up a proper stall in the market city; business is slow but solid.",
          detay: "Here everyone knows everyone and reputation is worth more than anything. You move slowly but you stand firm.",
        },
        basarisizSonuc: {
          mesaj: "The market was full; finding a spot took months and ate your savings.",
          detay: "Every street corner was taken. In your first year you learned what it means to be invisible in a crowded city.",
        },
      },
    ],
  },
  liman_kacakcilik: {
    baslik: "A Night Cargo at the Harbor",
    metin: "A ship's captain offers you a partnership for a cargo that won't go in the customs ledger. Half the harbor does this work, the other half watches those who get caught.",
    secenekler: [
      {
        metin: "Become a partner, unload the cargo together.",
        basariliSonuc: {
          mesaj: "The cargo came in at night, was sold by morning; your share was bigger than you expected.",
          detay: "You're now part of the harbor circle that does 'those jobs'. Doors are opening, but the door you go through is hard to come back out of.",
        },
        basarisizSonuc: {
          mesaj: "Customs guards raided; the cargo was lost, your name went in the ledger.",
          detay: "The captain fled with the ship, you were left on the quay. You covered the loss and now every cargo of yours is searched twice.",
        },
      },
      {
        metin: "Refuse, try to get an official import license.",
        basariliSonuc: {
          mesaj: "The license came through; now you import in daylight and legally.",
          detay: "Your profit margin is lower than a smuggler's, but every night when there's a knock at the door your heart doesn't leap into your mouth. Only those who have lived it know that difference.",
        },
        basarisizSonuc: {
          mesaj: "Your license application dragged on for months and was rejected.",
          detay: "Fees were paid, files were lost. You wanted to go the right way and the system showed you the door.",
        },
      },
      {
        metin: "Sell the captain to the guards, seize the goods!",
        basariliSonuc: {
          mesaj: "You reported the captain and during the raid pulled half the goods into your own warehouse.",
          detay: "While the captain rots in a dungeon you grew rich. You can't walk the harbor streets without looking over your shoulder anymore.",
        },
        basarisizSonuc: {
          mesaj: "The captain realized your betrayal! With his crew he cornered you on the quay and threw you in the sea.",
          detay: "You barely swam free. The money is gone and a death warrant was written on you in the harbor.",
        },
      },
    ],
  },
  pazar_tezgah_kavgasi: {
    baslik: "A Stall Fight",
    metin: "The busiest corner of the market has come free. You and two rivals all want the same spot. The market boss says 'to the highest bidder' but the tradesmen say 'to whoever's turn it is'.",
    secenekler: [
      {
        metin: "Give the boss the highest bid, buy the spot.",
        basariliSonuc: {
          mesaj: "The corner is yours; foot traffic tripled.",
          detay: "The spot is great, the earnings are great. The neighboring tradesmen don't greet you but the customers do, and in the end that's who stays in the market.",
        },
        basarisizSonuc: {
          mesaj: "A higher bid came in; you lost both the money and the spot.",
          detay: "The boss told your rival your bid and he went one notch higher. The deposit didn't come back.",
        },
      },
      {
        metin: "Follow tradesman tradition, wait your turn and gather support.",
        basariliSonuc: {
          mesaj: "The tradesmen stood behind you; the boss backed down and the corner was given to you.",
          detay: "You won without paying money, through solidarity. Now if you have a problem in the market, thirty people stand behind you.",
        },
        basarisizSonuc: {
          mesaj: "The tradesmen supported you but the boss chose the money; the corner went to your rival.",
          detay: "Tradition lost against money. You didn't get the spot but among the tradesmen you became 'the man who plays by the rules'.",
        },
      },
      {
        metin: "Grab the boss by the collar, threaten him.",
        basariliSonuc: {
          mesaj: "Not used.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
        onTepki: {
          metin: "You grabbed the boss by the collar. The guards behind him went for their swords. One more step and there will be blood in the marketplace.",
          geriCekilMetni: "Let go, walk away in anger.",
          geriCekilSonucu: {
            mesaj: "You backed off at the last moment. You lost the spot and were humiliated in front of the boss.",
            detay: "Not being able to control your anger damaged your reputation.",
          },
          devamMetni: "Intimidate him: 'You WILL give me that spot!'",
          devamSonucu: {
            mesaj: "The boss feared your madness. He signaled the guards to stop and left the spot to you.",
            detay: "You won by bullying, but the market boss is your sworn enemy now.",
          },
        },
      },
    ],
  },
  genel_saray_firsati: {
    baslik: "The Palace Gate",
    metin: "A position has opened at the {bolge} palace. Your renown got you onto the shortlist. The palace means power and money; it is also a place where no one stays clean.",
    secenekler: [
      {
        metin: "Apply for the position, enter the palace world.",
        basariliSonuc: {
          mesaj: "You were admitted to the palace; you are now in the rooms where decisions are made.",
          detay: "In the first week you watched three people be finished off and said nothing. Staying silent is the first rule of survival here, and you've already started learning it.",
        },
        basarisizSonuc: {
          mesaj: "You were cut from the shortlist; the money and hope you spent went to waste.",
          detay: "Someone less talented than you but with better relatives got the position. You learned the palace's first lesson without even walking through the door.",
        },
      },
      {
        metin: "Do not apply, stay with your independent reputation.",
        basariliSonuc: {
          mesaj: "You refused the palace; among the people you became 'the man who cannot be bought'.",
          detay: "Those who entered the palace grew rich, some also disappeared. You became neither the first nor the second, and you sleep easy at night.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was taken as 'insolence'; the palace circle turned its back on you.",
          detay: "Apparently there's a rule that an invitation is not refused. No palace-connected work comes to you anymore, and that's more work than you thought.",
        },
      },
    ],
  },
  saray_entrika: {
    baslik: "Two Factions",
    metin: "Two factions are at war in the palace: one the old nobility, the other the new rich. Both want you to pick a side, and neutrality is not counted as an option here.",
    secenekler: [
      {
        metin: "Go with the old nobility — deep-rooted but declining power.",
        basariliSonuc: {
          mesaj: "The nobility won; your loyalty was rewarded with a title.",
          detay: "There's a title before your name now. You're in the last fortress of the old order, and the walls of this fortress crack a little more every year.",
        },
        basarisizSonuc: {
          mesaj: "The nobility lost; along with them, you were purged.",
          detay: "When the new rich entered the palace the first thing they did was clean out those in the old faction. Your room was emptied overnight.",
        },
      },
      {
        metin: "Go with the new rich — plenty of money, no roots.",
        basariliSonuc: {
          mesaj: "The new rich won; you took a large share of the commercial privileges.",
          detay: "The money flows but the old nobility still counts you a 'parvenu'. You're learning not to care, because there's no time left over from counting your money.",
        },
        basarisizSonuc: {
          mesaj: "The new rich were dispersed; along with your partners, you fell too.",
          detay: "You bet on the rising power and that power did not rise. Along with the money you invested you lost your place in the palace.",
        },
      },
      {
        metin: "Sell information to both sides, play your own game.",
        basariliSonuc: {
          mesaj: "You fed both factions against each other; you gained from both.",
          detay: "No one knows who works for whom, except you. This is the most dangerous and most profitable position you can hold.",
        },
        basarisizSonuc: {
          mesaj: "Both factions caught on to your game the same week. For those who play both sides at the palace there is only one solution, and it was carried out that night.",
        },
      },
    ],
  },
  genel_yatirim: {
    baslik: "An Investment Opportunity",
    metin: "There are three ways to make use of your savings: a high-risk partnership, a medium-risk purchase of goods, or low-yield but safe land/bonds.",
    secenekler: [
      {
        metin: "Enter the high-risk partnership.",
        basariliSonuc: {
          mesaj: "The partnership worked out; you got back more than double what you put in.",
          detay: "You took the risk and won. Now everyone asks 'how did you know'; you don't tell them you didn't.",
        },
        basarisizSonuc: {
          mesaj: "Your partner fled; every coin you put in vanished.",
          detay: "The contract you signed was worthless in any court. You lost your savings on a signature and a feeling of trust.",
        },
      },
      {
        metin: "Make a medium-risk purchase of goods.",
        basariliSonuc: {
          mesaj: "The goods you bought found a good price in season; you made a solid profit.",
          detay: "Neither exciting nor a disaster. You did your sums, you were patient, and you got your reward; most of trade is just this.",
        },
        basarisizSonuc: {
          mesaj: "Prices fell; you sold off the goods at a loss.",
          detay: "You read the market wrong. Not a great disaster, but this year's savings evaporated.",
        },
      },
      {
        metin: "Buy land/bonds — low yield, high safety.",
        basariliSonuc: {
          mesaj: "The land/bonds you bought started bringing in a regular income every year.",
          detay: "It won't make you rich but it's an income that will never leave you hungry. As you age you'll understand its value more.",
        },
        basarisizSonuc: {
          mesaj: "There was a problem with the deed of the land you bought; you couldn't get your money back.",
          detay: "Even the safest investment needs a document check. You learned that out of your own pocket.",
        },
      },
    ],
  },
  genel_ikilem_aile: {
    baslik: "An Ailing Parent",
    metin: "Your parent has fallen ill and needs care. Taking them in will eat your time and money; hiring a carer is expensive; doing nothing is a choice with no going back.",
    secenekler: [
      {
        metin: "Take them in, care for them yourself.",
        basariliSonuc: {
          mesaj: "You were beside them in their last years; when they went, their hand was in yours.",
          detay: "Your business faltered, your earnings dropped, and none of that matters now. This is one of the few decisions you can say 'thank goodness' about.",
        },
        basarisizSonuc: {
          mesaj: "The burden of care made you ill too; still, you were beside them to the end.",
          detay: "For months you barely slept. When you lost them you were grieving and exhausted and in debt.",
        },
      },
      {
        metin: "Hire a carer, keep working.",
        basariliSonuc: {
          mesaj: "You found a good carer; your business didn't falter and your parent wasn't left uncared for.",
          detay: "You visit twice a month. The carer says 'they're asking about you' every time, and you say 'work is busy' every time.",
        },
        basarisizSonuc: {
          mesaj: "The carer neglected them; your parent was in bad conditions and everyone blamed you for it.",
          detay: "When you went to visit you saw the state of the room. What you thought you'd solved with money was only postponed, not solved.",
        },
      },
    ],
  },
  komik_domuz: {
    baslik: "The Runaway Pig",
    metin: "A fat pig that got loose in the market square threw everything into chaos. The butcher promises a good reward and the crowd watches, laughing.",
    secenekler: [
      {
        metin: "Try to catch the pig, grab the reward.",
        basariliSonuc: {
          mesaj: "You caught the pig at the last moment; the market crowd applauded you.",
          detay: "The butcher kept his word and that day everyone in the market learned your name. Your title is comic but memorable.",
        },
        basarisizSonuc: {
          mesaj: "While running after the pig you tripped over a handcart and broke your neck. The city remembered you for years as 'the man who raced a pig and lost'.",
        },
      },
      {
        metin: "Step aside, cut off its escape and catch it quietly.",
        basariliSonuc: {
          mesaj: "You cut off the mouth of the alley; the pig fell into your lap.",
          detay: "You handled it without running or sweating. As the butcher paid the reward he said 'you're a smart man'.",
        },
        basarisizSonuc: {
          mesaj: "The pig didn't come down the alley you expected, it hit you from behind and knocked you over.",
          detay: "You skinned your knee, tore your trousers, and someone else caught the pig. At least you're alive.",
        },
      },
    ],
  },
  komik_icki_bahsi: {
    baslik: "A Bet at the Tavern",
    metin: "A drunk man loudly makes a bet in the tavern: whoever drinks more takes all the money on the table. The crowd cheers.",
    secenekler: [
      {
        metin: "Accept the bet, start drinking.",
        basariliSonuc: {
          mesaj: "You drank your opponent under the table; everyone in the tavern drank in your honor.",
          detay: "The next day you couldn't get up until noon and your head was splitting. But you started to get addicted to that sweet feeling of raising a cup.",
        },
        basarisizSonuc: {
          mesaj: "After the tenth jug you collapsed onto the table and never woke up. The tavern keepers started calling you 'the martyr of the mead'.",
        },
      },
      {
        metin: "Don't accept the bet but hold the stakes, act as bookmaker.",
        basariliSonuc: {
          mesaj: "You collected the bets; whoever won, the commission was yours.",
          detay: "The tavern shouted 'coward', you smiled while counting the commission. The next morning you were the only one without a headache.",
        },
        basarisizSonuc: {
          mesaj: "The losing side demanded their money back; the table was overturned, a brawl broke out.",
          detay: "Being a bookmaker in a tavern is no easy job. You lost the money and split your lip.",
        },
      },
    ],
  },
  komik_balon: {
    baslik: "The Balloon Trial",
    metin: "An inventor is holding a public flight trial with a hot-air balloon and is looking for a volunteer for good money. The crowd waits with bated breath.",
    secenekler: [
      {
        metin: "Volunteer, get in the balloon.",
        basariliSonuc: {
          mesaj: "The balloon soared; you became one of the first people to fly over the city.",
          detay: "The people on the ground looked like ants and in that moment you feared nothing. The newspapers wrote your name and the inventor offered you a partnership.",
        },
        basarisizSonuc: {
          mesaj: "The burner set the basket alight; the inventor jumped at the last moment but you couldn't undo your harness. The newspapers wrote 'a whim for the sky ended in disaster'.",
        },
      },
      {
        metin: "Don't fly but invest in the inventor.",
        basariliSonuc: {
          mesaj: "The balloon flew; as his partner you took a share of the income too.",
          detay: "Your feet never left the ground but your pocket filled. The best investment is one where someone else takes the risk.",
        },
        basarisizSonuc: {
          mesaj: "The balloon caught fire before it lifted off! Because you were watching from close by, the sparks flew into your face.",
          detay: "Standing over the wreckage, you were left with a permanent burn scar. At least you weren't in that basket.",
        },
      },
    ],
  },
  komik_sirk: {
    baslik: "The Traveling Circus",
    metin: "At the circus that has come to town, the owner challenges the crowd: whoever gets closest to the lion cage wins good money. Everyone is looking at you.",
    secenekler: [
      {
        metin: "Get close to the cage, take the reward.",
        basariliSonuc: {
          mesaj: "The lion stayed calm; the crowd was in awe of your courage.",
          detay: "The tamer later whispered 'that lion has no teeth'. The crowd doesn't know this and you won't correct them.",
        },
        basarisizSonuc: {
          mesaj: "You acted as if you hadn't heard the tamer's warning 'don't put your hand in the cage'. The circus never forgot the memory of the 'curious spectator' after that day.",
        },
      },
      {
        metin: "Make a deal with the circus, sell tickets to the show.",
        basariliSonuc: {
          mesaj: "You took a commission on ticket sales; no one looked at you but no one ate you either.",
          detay: "The circus owner said 'you know this business' and looks for you every time he comes to town. A small but recurring income.",
        },
        basarisizSonuc: {
          mesaj: "The show was cancelled by rain; you were left holding the tickets you had printed.",
          detay: "The circus left town the next day and didn't pay your commission. It was safer than getting near the lion, but not profitable.",
        },
      },
    ],
  },
  tarihi_fransa_prusya_ilan: {
    baslik: "War Declared on Prussia",
    metin: "The year {yil}. The tension between you and Prussia has finally turned into war. The newspapers write 'we'll be in Berlin in a few months'; the emperor will lead the army himself.",
    secenekler: [
      {
        metin: "Sign up as a volunteer, go to the front.",
        basariliSonuc: {
          mesaj: "In the first clashes you stood out with your courage.",
          detay: "The easy victory the newspapers promised is nowhere in sight yet, but your morale is high.",
        },
        basarisizSonuc: {
          mesaj: "The Prussian artillery was far stronger than you expected; you were badly wounded.",
          detay: "Lying in the field hospital you hear the officers' anxious whispers.",
        },
      },
      {
        metin: "Offer the army a supply contract.",
        basariliSonuc: {
          mesaj: "The army gave you the order for provisions and boots; the first payment has already come.",
          detay: "As the war goes on the order grows; for now you are both safe and profitable.",
        },
        basarisizSonuc: {
          mesaj: "The contract was signed but the state postponed payment until the war ends.",
          detay: "You delivered the goods; the money came out of your own pocket, not the treasury's, for now.",
        },
      },
      {
        metin: "Cross the border into a neutral country.",
        basariliSonuc: {
          mesaj: "You crossed the border without trouble; you'll follow the war from the newspapers.",
          detay: "When your neighbors ask 'where is he', no one can give a clear answer.",
        },
        basarisizSonuc: {
          mesaj: "The border was closed; you were turned back as a mobilization deserter.",
          detay: "Your name is on a list now; until the war ends this will take things from you.",
        },
      },
    ],
  },
  tarihi_fransa_prusya_yenilgi: {
    baslik: "After Sedan",
    metin: "The year {yil}. The emperor was captured at Sedan, the army fell apart. Prussian troops besieged Paris. The war is lost; bread is rationed, everyone's income visibly melted away.",
    secenekler: [
      {
        metin: "Share the hardship like everyone else, get by honestly.",
        basariliSonuc: {
          mesaj: "You waited in the same queue as your neighbors and shared the same bread.",
          detay: "It was a hard winter but a shared pain; no one said 'he's one of us too', everyone was in the same boat.",
        },
        basarisizSonuc: {
          mesaj: "Even the ration wasn't enough; you went hungry that winter.",
          detay: "The famine spared no one; being honest didn't feed you.",
        },
      },
      {
        metin: "Hoard provisions in the famine, sell at a high price.",
        basariliSonuc: {
          mesaj: "You sold bread to hungry people at three times the price; your strongbox has never been so full.",
          detay: "You saw a woman weep and still didn't lower the price. Part of your fortune comes from that winter's hunger.",
        },
        basarisizSonuc: {
          mesaj: "A hungry crowd stormed your warehouses; your goods are gone, you barely escaped a beating.",
          detay: "The neighborhood now calls you 'the man who tried to get rich in the famine', and that isn't easily forgotten.",
        },
      },
      {
        metin: "Protect your family, wait quietly.",
        basariliSonuc: {
          mesaj: "You shut your door, spent the winter at home; it was hard but you came out alive.",
          detay: "You heard about what happened outside later, from neighbors; staying in wore you down but it protected you.",
        },
        basarisizSonuc: {
          mesaj: "Staying home didn't protect you from hunger; your coal and provisions ran out.",
          detay: "Sometimes waiting exacts a price too; you just pay it quietly.",
        },
      },
    ],
  },
  tarihi_kirim_ilan_muttefik: {
    baslik: "Toward the Crimea",
    metin: "The year {yil}. Together with your allies you have gone to war against Russia's expansionism. A great fleet is setting out for the Crimea.",
    secenekler: [
      {
        metin: "Join the army/navy.",
        basariliSonuc: {
          mesaj: "You took a post on the siege line; hard but proud service.",
          detay: "The walls of Sevastopol still stand, but your morale is high; you believe you'll win.",
        },
        basarisizSonuc: {
          mesaj: "Cholera spread in the trenches; you too were burning with fever.",
          detay: "In this war disease kills more than bullets; the doctors can't keep up.",
        },
      },
      {
        metin: "Supply the fleet with provisions and coal.",
        basariliSonuc: {
          mesaj: "Your contract was approved; as long as the war lasts, so does the profit.",
          detay: "A new order every week at the harbor; war is a good business for some.",
        },
        basarisizSonuc: {
          mesaj: "A rival supplier gave a lower price; you lost the contract.",
          detay: "Your preparation costs were wasted; this time you didn't win from the war.",
        },
      },
      {
        metin: "Keep working, stay out of the war.",
        basariliSonuc: {
          mesaj: "You went on with your daily life; the war news comes from the newspapers.",
          detay: "While everyone talks about the front, you're at your stall; that's a choice too.",
        },
        basarisizSonuc: {
          mesaj: "The war rush hit trade too; customers dwindled.",
          detay: "Everyone's mind is at the front; your business took its share of that.",
        },
      },
    ],
  },
  tarihi_kirim_zafer: {
    baslik: "Sevastopol Has Fallen",
    metin: "The year {yil}. Sevastopol has fallen, Russia sued for peace. When news of the victory arrived the streets turned into a festival. New trade routes opened, war reparations breathed life into the economy.",
    secenekler: [
      {
        metin: "Throw yourself into the new trade opportunities the victory brought.",
        basariliSonuc: {
          mesaj: "You were the first into the new markets that opened; your earnings rose permanently.",
          detay: "The post-victory euphoria is still going and you turned that euphoria into money.",
        },
        basarisizSonuc: {
          mesaj: "Everyone rushed to the same opportunity; the competition melted prices and put you at a loss.",
          detay: "The victory gave everyone the same feeling and everyone ran to the same door; you got lost in the crowd.",
        },
      },
      {
        metin: "Join the victory celebrations, make connections.",
        basariliSonuc: {
          mesaj: "The names you met at the celebrations opened new doors for you.",
          detay: "Victory's intoxication makes everyone generous; you took your share of that.",
        },
        basarisizSonuc: {
          mesaj: "The celebrations cost a lot, and the connections you expected didn't pan out.",
          detay: "Everyone raised a glass, no one talked business; only the bill was left to you.",
        },
      },
    ],
  },
  tarihi_kirim_ilan_rusya: {
    baslik: "Against the Allies",
    metin: "The year {yil}. The alliance of the Ottomans, Britain and France landed troops in the Crimea. The Tsar demands sacrifice from the whole people.",
    secenekler: [
      {
        metin: "Join the army, defend Sevastopol.",
        basariliSonuc: {
          mesaj: "You contributed to the resistance on the walls; the commanders held you up as an example.",
          detay: "The siege grows heavier but for now the walls stand, and so do you.",
        },
        basarisizSonuc: {
          mesaj: "Allied artillery pounded the line; you fell back badly wounded.",
          detay: "You learned with your body that old tactics are no match for modern cannon.",
        },
      },
      {
        metin: "Supply the army with horses and provisions.",
        basariliSonuc: {
          mesaj: "You took a post on the supply line; for now you're making good money.",
          detay: "Half the caravans going to the front don't come back, but your job is behind the front.",
        },
        basarisizSonuc: {
          mesaj: "Payments were postponed until the war ends; the cost came out of your pocket.",
          detay: "The treasury is empty; the contract looks good on paper but the cash flow is zero.",
        },
      },
      {
        metin: "Withdraw to the countryside, stay out of the war.",
        basariliSonuc: {
          mesaj: "You stayed calm in the countryside; the noise of war reached you from a distance.",
          detay: "You became one of those who turned a deaf ear to the Tsar's call, and you told no one.",
        },
        basarisizSonuc: {
          mesaj: "It was noticed you dodged mobilization; you were shunned by the other families in your village.",
          detay: "In some places not going to war is not a choice but a crime.",
        },
      },
    ],
  },
  tarihi_kirim_yenilgi_rusya: {
    baslik: "The Fall of Sevastopol",
    metin: "The year {yil}. Sevastopol fell after a year-long siege. The Tsar was forced to sue for peace. The bill for the defeat is heavy: taxes rose, grain prices multiplied.",
    secenekler: [
      {
        metin: "Share the hardship with the people, get by honestly.",
        basariliSonuc: {
          mesaj: "You tightened your belt like everyone else; no one thought you were privileged.",
          detay: "The defeat is bitter but a shared pain; at least you're not alone.",
        },
        basarisizSonuc: {
          mesaj: "The tax hike was heavier than you expected; you barely got through the winter.",
          detay: "The bill for the defeat falls first on the poorest, and you were on that list.",
        },
      },
      {
        metin: "Stockpile wheat and sell it at a high price during the crisis.",
        basariliSonuc: {
          mesaj: "You sold wheat to hungry peasants at three times the price; your strongbox has never been so full.",
          detay: "Some nights those faces cost you your sleep; you tell no one.",
        },
        basarisizSonuc: {
          mesaj: "An angry mob stormed your warehouse; your goods were plundered, you were beaten.",
          detay: "They needed someone to take out the pain of the defeat on, and that person was you.",
        },
      },
    ],
  },
  zincir_asker_baslangic: {
    baslik: "Joining the Regiment",
    metin: "The first day you joined your regiment. At the barracks gate you changed clothes and fell into line; you are no longer a civilian, you are a soldier. The sergeant eyes the new arrivals coldly.",
    secenekler: [
      {
        metin: "Look disciplined, follow the rules to the letter.",
        basariliSonuc: {
          mesaj: "The sergeant took to you; you heard him say 'this one'll make a good soldier'.",
          detay: "The first day went well. You fell into the barracks' rhythm in the very first week.",
        },
        basarisizSonuc: {
          mesaj: "You looked clumsy in the first drill; the sergeant scolded you in front of everyone.",
          detay: "A bad start, but there's no going back now; you're in the regiment.",
        },
      },
      {
        metin: "Adapt in your own way, don't push too hard.",
        basariliSonuc: {
          mesaj: "You neither stood out nor fell behind; you blended quietly into the ranks.",
          detay: "No one knows your name yet. In the barracks that's sometimes the safest place.",
        },
        basarisizSonuc: {
          mesaj: "Your slackness was noticed; they said 'I've got my eye on you'.",
          detay: "Getting on the watch list on the first day is not a good sign.",
        },
      },
    ],
  },
  zincir_asker_pusu: {
    baslik: "The First Ambush",
    metin: "In your first year of service, on a routine patrol, your unit was ambushed. In the chaos you have to decide what to do in seconds.",
    secenekler: [
      {
        metin: "Charge forward, answer fire with fire.",
        basariliSonuc: {
          mesaj: "You helped beat back the attack; the commander noted your name.",
          detay: "Everyone who survived that day looks at each other differently now; you got through something together.",
        },
        basarisizSonuc: {
          mesaj: "A bullet grazed your shoulder; they dragged you back covered in blood.",
          detay: "Your first wound in your first year. The doctor said 'you're lucky'; you didn't quite feel it.",
        },
      },
      {
        metin: "Lead the retreat, gather the unit.",
        basariliSonuc: {
          mesaj: "You managed an orderly retreat; no one was lost.",
          detay: "It wasn't a brilliant victory, but everyone coming back alive was a success too.",
        },
        basarisizSonuc: {
          mesaj: "The retreat fell apart; a few soldiers went missing and they pinned the blame on you.",
          detay: "Some thought you panicked in your first test; that'll take time to live down.",
        },
      },
    ],
  },
  zincir_asker_terhis: {
    baslik: "The End of the Service Years",
    metin: "After years of service the commander summoned you: 'Your duty is done, son. Now you can decide your own path.'",
    secenekler: [
      {
        metin: "Stay in the army, become a career soldier.",
        basariliSonuc: {
          mesaj: "You signed on for a long term of service; you're a veteran soldier now.",
          detay: "Over the passing years you realized the regiment had become like a family to you. Civilian life has long since grown foreign, but this is the path you chose.",
        },
        basarisizSonuc: {
          mesaj: "You chose to stay, but the new commander doesn't take as much interest in you as the old one.",
          detay: "Years have passed and you're still the same rank. Some careers just quietly stall.",
        },
      },
      {
        metin: "Be discharged, return to civilian life.",
        basariliSonuc: {
          mesaj: "You took your retirement bonus and returned to civilian life; for the first time in years you're making your own decisions.",
          detay: "The city has changed a lot since you joined up. Walking, you still count your steps; your sleep is still on alert. But no one gives you orders anymore.",
        },
        basarisizSonuc: {
          mesaj: "Your discharge papers were delayed; part of your bonus got lost in the bureaucracy.",
          detay: "You served for years and got less than you expected in return. Still, you're free now; you understand that has a price.",
        },
      },
    ],
  },
  zincir_tuccar_teklif: {
    baslik: "A Big Order Offer",
    metin: "A merchant from a distant city offers a huge supply agreement that will run for years. If you accept you'll have tied most of your capital to this single relationship.",
    secenekler: [
      {
        metin: "Sign the agreement, enter the big game.",
        basariliSonuc: {
          mesaj: "The signatures were made; you're now in a partnership that will run for years.",
          detay: "Most of your capital is tied to this agreement. Either you'll win big or you'll lose everything.",
        },
        basarisizSonuc: {
          mesaj: "The contract terms turned out heavier than you thought, but there's no going back now.",
          detay: "Even the first costs were more than you expected; you already look at this venture with doubt.",
        },
      },
      {
        metin: "Refuse the offer, focus on your existing business.",
        basariliSonuc: {
          mesaj: "You took no risk; business went on calmly as always.",
          detay: "Maybe you missed a big opportunity, maybe you escaped a big disaster; you'll never know.",
        },
        basarisizSonuc: {
          mesaj: "The other merchant, hearing you refused, took the offer to your rival.",
          detay: "Hearing your rival grew with this deal isn't pleasant, but at least you took no risk.",
        },
      },
    ],
  },
  zincir_tuccar_kervan_sorunu: {
    baslik: "Trouble on the Road",
    metin: "The first load of your big order is on the road; the messenger arrived out of breath: 'The caravan was caught in a storm and a bandit raid; your partner is waiting for an urgent decision from you.'",
    secenekler: [
      {
        metin: "Send extra money and organize an armed rescue expedition.",
        basariliSonuc: {
          mesaj: "The rescue expedition worked; most of the load and your men were brought back safely.",
          detay: "Your partner saw your resolve; the agreement can move to its next stage.",
        },
        basarisizSonuc: {
          mesaj: "Despite the extra spending, most of the load was lost.",
          detay: "You both spent and lost; the future of the agreement is more uncertain now.",
        },
      },
      {
        metin: "Accept the losses, keep the contract as it is.",
        basariliSonuc: {
          mesaj: "Your partner was understanding; the contract continues with a small delay.",
          detay: "Such losses are in the nature of trade; your partner knows this and was patient.",
        },
        basarisizSonuc: {
          mesaj: "Your partner resented this indifference of yours; the relationship became strained.",
          detay: "The agreement continues but it isn't as warm as before.",
        },
      },
      {
        metin: "Use the loss as a pretext and pull fake insurance money from your guild.",
        basariliSonuc: {
          mesaj: "You drew up papers as if all the goods had burned. The guild paid you an enormous compensation.",
          detay: "You kept part of the load and gained an unjust fortune.",
        },
        basarisizSonuc: {
          mesaj: "The guild inspectors caught the fraud at once! You got a heavy fine and your reputation was stained.",
        },
      },
    ],
  },
  zincir_din_gorev_teklifi: {
    baslik: "A Distant Mission",
    metin: "The higher authority proposes you for a mission that will run for years, to a small congregation in a distant land. If you accept, you'll leave your life here behind.",
    secenekler: [
      {
        metin: "Accept the mission, set out.",
        basariliSonuc: {
          mesaj: "You packed your things, said farewell to your congregation, and set out.",
          detay: "Leaving this land was harder than you thought, but a long road lies ahead of you.",
        },
        basarisizSonuc: {
          mesaj: "The preparations for departure cost more than you expected.",
          detay: "Still, you've made your decision; you're on this mission now.",
        },
      },
      {
        metin: "Refuse the mission, stay with your congregation.",
        basariliSonuc: {
          mesaj: "Your congregation was glad of your decision; you didn't abandon them.",
          detay: "Maybe you missed a great experience, but there are people waiting for you here.",
        },
        basarisizSonuc: {
          mesaj: "The higher authority recorded your refusal as 'a lack of ambition'.",
          detay: "Your congregation is pleased, but the higher authorities may not consider you for big missions again.",
        },
      },
    ],
  },
  zincir_din_gorev_donus: {
    baslik: "Time to Return",
    metin: "After years of your distant mission the higher authority has recalled you. The mission is complete; now it is time to return to the life you left behind.",
    secenekler: [
      {
        metin: "Return to your old congregation.",
        basariliSonuc: {
          mesaj: "When you returned after years, your congregation welcomed you like a hero.",
          detay: "What you saw in distant lands has changed you. Your old congregation is the same but you're no longer as you were; that's both a gain and a loneliness.",
        },
        basarisizSonuc: {
          mesaj: "You returned, but most of your congregation had grown used to the new official who took your place.",
          detay: "This is the price of years away: when you come back your place belongs to someone else.",
        },
      },
      {
        metin: "Stay in the land where you served, build a new congregation.",
        basariliSonuc: {
          mesaj: "You stayed in that land and built your own congregation; over the years a small community formed.",
          detay: "Your old life is a distant memory now. Here you have something you built from scratch, and it's yours.",
        },
        basarisizSonuc: {
          mesaj: "The decision to stay came hard; unable to find enough support, you got by with a small congregation.",
          detay: "It wasn't easy, but you also know you left nothing behind; you have to build everything from the start.",
        },
      },
    ],
  },
  genel_pazar_yeri_soytarisi: {
    baslik: "The Traveling Jester",
    metin: "A masked jester who has come to the market square is trying to pull you out of the crowd as a 'volunteer' for his act.",
    secenekler: [
      {
        metin: "Join the act, do your best.",
        basariliSonuc: {
          mesaj: "Not used.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
        onTepki: {
          metin: "The moment you stepped into the square the jester shoved you down and started mocking your clothes. The crowd is laughing at you. This isn't a game, it's a humiliation show!",
          geriCekilMetni: "Control your anger, slip quietly into the crowd and get away.",
          geriCekilSonucu: {
            mesaj: "You were remembered as a coward who can't take a joke. You thought about that moment for days.",
            detay: "Sometimes slipping away is the greatest pain.",
          },
          devamMetni: "Rip the mask off his face and play your own joke on him!",
          devamSonucu: {
            mesaj: "When you pulled off the mask it turned out the man was a wanted swindler! You became a hero in the square.",
            detay: "You won't be mocked — you'll do the mocking!",
          },
        },
      },
      {
        metin: "Decline politely, step back from the crowd.",
        basariliSonuc: {
          mesaj: "Your refusal was accepted; the jester picked someone else.",
          detay: "You didn't take the risk of shame; your life went on calmly.",
        },
        basarisizSonuc: {
          mesaj: "The jester turned your refusal into a joke too and mocked you.",
          detay: "Trying to run away sometimes draws even more attention.",
        },
      },
    ],
  },
  genel_gokyuzunde_isik: {
    baslik: "A Light in the Sky",
    metin: "At night a bright light with a tail appeared in the sky. Rumors spread among the people that it's an 'omen of the apocalypse'; some are in a panic.",
    secenekler: [
      {
        metin: "Try to calm the people.",
        basariliSonuc: {
          mesaj: "Your calm manner soothed the panic; the people trusted you.",
          detay: "The light disappeared a few days later and everyone returned to daily life; but they remembered you.",
        },
        basarisizSonuc: {
          mesaj: "Some didn't listen to you; the panic lasted a little longer.",
          detay: "Fear is sometimes stronger than reason.",
        },
      },
      {
        metin: "Get swept up in the rumors too, make preparations.",
        basariliSonuc: {
          mesaj: "The provisions you stockpiled were of no use, but at least you were prepared.",
          detay: "The light disappeared, life went on; you were a little embarrassed but no harm done.",
        },
        basarisizSonuc: {
          mesaj: "Your panic buying became a joke among the neighbors.",
          detay: "The nickname 'the man waiting for the apocalypse' stuck to you for a while.",
        },
      },
    ],
  },
  genel_hastalikli_kis: {
    baslik: "A Harsh Winter",
    metin: "This year's winter is unusually harsh; the prices of wood and provisions have shot up, and many of your neighbors have fallen ill.",
    secenekler: [
      {
        metin: "Stockpile extra wood and provisions.",
        basariliSonuc: {
          mesaj: "You spent the winter warm and fed; you came out without falling ill.",
          detay: "While your neighbors fell sick, you were prepared.",
        },
        basarisizSonuc: {
          mesaj: "You got by with what you stockpiled, but prices were higher than you expected.",
          detay: "You got through the winter but your purse grew lighter.",
        },
      },
      {
        metin: "Get by frugally, economize.",
        basariliSonuc: {
          mesaj: "You were thrifty and got through the winter cheaply.",
          detay: "You were cold but you endured; sometimes little is enough.",
        },
        basarisizSonuc: {
          mesaj: "The cold made you ill; it turned into pneumonia.",
          detay: "Economizing, you economized on your health.",
        },
      },
    ],
  },
  genel_kisisel_hastalik: {
    baslik: "Burning with Fever",
    metin: "Your fever hasn't broken for days and you're getting worse. You have to make a decision — this illness doesn't seem like it'll pass on its own.",
    secenekler: [
      {
        metin: "Buy medicine (25 Gold), go to the best doctor.",
        basariliSonuc: {
          mesaj: "The medicine the doctor gave worked fast; you're on your feet within a few days.",
          detay: "The money's gone but your health came back; a good trade.",
        },
        basarisizSonuc: {
          mesaj: "The medicine helped, but the recovery went slower than you expected.",
          detay: "Not every treatment works like a miracle.",
        },
      },
      {
        metin: "Take a folk remedy (5 Gold), trust to luck.",
        basariliSonuc: {
          mesaj: "The strange-smelling mixture worked! Within a few days you pulled yourself together.",
          detay: "Sometimes village recipes really do work.",
        },
        basarisizSonuc: {
          mesaj: "The mixture didn't work at all, and your condition even got a little worse.",
          detay: "Cheap solutions sometimes cost more in the end.",
        },
      },
      {
        metin: "Do nothing, try to rest.",
        basariliSonuc: {
          mesaj: "Your body recovered on its own; you were lucky.",
          detay: "Sometimes the body finds its own way.",
        },
        basarisizSonuc: {
          mesaj: "The illness ran on untreated; your condition got much worse.",
          detay: "Some illnesses don't pass with rest.",
        },
      },
    ],
  },
  genel_esrarengiz_mektup: {
    baslik: "An Unsigned Letter",
    metin: "An unsigned letter was found under the door. Someone claims your spouse/partner is cheating on you, but offers no proof at all.",
    secenekler: [
      {
        metin: "Investigate the claim.",
        basariliSonuc: {
          mesaj: "Your investigation revealed the claim was baseless, the game of a jealous person.",
          detay: "Your peace came back but you'll always wonder who wrote that letter.",
        },
        basarisizSonuc: {
          mesaj: "Your investigation led to needless fights and mistrust.",
          detay: "Sometimes not asking gives a better result than asking.",
        },
      },
      {
        metin: "Tear up the letter, pay it no mind.",
        basariliSonuc: {
          mesaj: "You forgot the letter and life went on its normal course.",
          detay: "Some stones are better left unturned.",
        },
        basarisizSonuc: {
          mesaj: "Though you ignored the letter it never left your mind; mistrust settled in.",
          detay: "Ignoring something doesn't always mean forgetting it.",
        },
      },
    ],
  },
  genel_zar_oyunu_borcu: {
    baslik: "An Unpaid Gambling Debt",
    metin: "An acquaintance hasn't paid you a gambling debt and now changes direction when he sees you. You can demand your money in front of everyone or quietly forget it.",
    secenekler: [
      {
        metin: "Demand your money in front of everyone.",
        basariliSonuc: {
          mesaj: "Embarrassed, the man paid his debt right away.",
          detay: "No one asked you for a loan again, but you got the money.",
        },
        basarisizSonuc: {
          mesaj: "The man said he had no money and made a scene; you were humiliated.",
          detay: "Your insistence made you look ridiculous too.",
        },
      },
      {
        metin: "Quietly forget it, don't spoil the relationship.",
        basariliSonuc: {
          mesaj: "You forgot the money; your friendship wasn't spoiled.",
          detay: "A small loss is better than a big unease, you told yourself.",
        },
        basarisizSonuc: {
          mesaj: "Seeing you'd forgotten his debt, the man asked you for another loan.",
          detay: "Good will is sometimes taken advantage of.",
        },
      },
    ],
  },
  genel_meydan_okuyan_ressam: {
    baslik: "The Street Painter",
    metin: "A painter sitting in the square wants to do your portrait — for free, just because 'you have an interesting face'. You don't know what kind of picture will come out.",
    secenekler: [
      {
        metin: "Pose.",
        basariliSonuc: {
          mesaj: "The painting came out surprisingly beautiful; the painter put it in an exhibition and your name was mentioned too.",
          detay: "Being known in the city as 'the man in the painting' is a strange but pleasant feeling.",
        },
        basarisizSonuc: {
          mesaj: "The painting came out in a way that could hardly be called flattering; everyone laughed.",
          detay: "What the artist called an 'interesting face' wasn't much of a compliment after all.",
        },
      },
      {
        metin: "Decline politely.",
        basariliSonuc: {
          mesaj: "You declined and went on your way.",
          detay: "Maybe you missed an interesting memory, but you took no risk.",
        },
        basarisizSonuc: {
          mesaj: "The painter insisted and kept you standing in the square a long time; the rest of the day you were on edge.",
          detay: "A simple 'no' sometimes takes longer than you'd think.",
        },
      },
    ],
  },
  genel_fotografhane_reklami: {
    baslik: "An Advertising Photograph",
    metin: "A newly opened shop is looking for someone 'ordinary but trustworthy-looking' for an advertising photograph. You were chosen, but your photo will hang in the shop window.",
    secenekler: [
      {
        metin: "Accept the offer, pose.",
        basariliSonuc: {
          mesaj: "Your photo was hung in the window; your acquaintances laugh when they see you.",
          detay: "A small extra income and a fun reputation in the neighborhood.",
        },
        basarisizSonuc: {
          mesaj: "You closed your eyes when the camera flashed; a comical shot was hung in the window.",
          detay: "Everyone sees that shot and laughs; at least you got paid.",
        },
      },
      {
        metin: "Refuse the offer.",
        basariliSonuc: {
          mesaj: "You refused and went on with your ordinary life.",
          detay: "Appearing in shop windows isn't for everyone.",
        },
        basarisizSonuc: {
          mesaj: "The shop owner was persistent; to be rid of him you had to buy something small.",
          detay: "Sometimes even saying no comes with a price.",
        },
      },
    ],
  },
  genel_kurtlar_saldirisi: {
    baslik: "A Wolf Pack",
    metin: "Because of the harsh winter, a starving wolf pack has been spotted near the village; they attack livestock at night, and even in daytime one must be careful.",
    secenekler: [
      {
        metin: "Join the other villagers in a hunt.",
        basariliSonuc: {
          mesaj: "You scattered the pack; the village felt safe again.",
          detay: "When one of the wolves came near you, you flinched but you didn't retreat.",
        },
        basarisizSonuc: {
          mesaj: "A wolf bit you; the wound healed but it ached for a long time.",
          detay: "In this struggle with nature, this time you weren't the winner.",
        },
      },
      {
        metin: "Stay home, bring your animals inside.",
        basariliSonuc: {
          mesaj: "You brought your animals inside; the wolves turned to another house.",
          detay: "You stayed safe but your neighbor's animals were killed.",
        },
        basarisizSonuc: {
          mesaj: "Despite the precautions a wolf forced the barn door and got inside.",
          detay: "You lost one of your animals; nature sometimes doesn't heed precautions.",
        },
      },
    ],
  },
  genel_yeni_icat_saati: {
    baslik: "The Pocket Watch Fashion",
    metin: "A new, elegant pocket watch has become the fashion all over the city; those who don't own one are seen as 'backward'. The price is quite high.",
    secenekler: [
      {
        metin: "Buy the watch.",
        basariliSonuc: {
          mesaj: "Your watch drew attention; your circle began to see you as more 'modern'.",
          detay: "A small accessory made an unexpected impact in your social circle.",
        },
        basarisizSonuc: {
          mesaj: "The watch broke a week later; the repairman said its parts were fake.",
          detay: "Following fashion is sometimes an expensive lesson.",
        },
      },
      {
        metin: "Decide you don't need to buy it.",
        basariliSonuc: {
          mesaj: "You kept your money; the fashion changed after a while anyway.",
          detay: "Acting with common sense always pays.",
        },
        basarisizSonuc: {
          mesaj: "In some circles you were looked down on for 'not even having a watch'.",
          detay: "Being sensible sometimes carries a social price.",
        },
      },
    ],
  },
  genel_kutuphane_bulgusu: {
    baslik: "A Forgotten Manuscript",
    metin: "In an old library, among the dusty shelves, you found an old and valuable-looking manuscript no one had noticed. You can hand it over to where it belongs or keep it for yourself.",
    secenekler: [
      {
        metin: "Hand the manuscript to the authorities.",
        basariliSonuc: {
          mesaj: "The manuscript you handed over turned out to be a valuable historical document; your name went on record.",
          detay: "Not claiming what you found made you known in the city for your honesty.",
        },
        basarisizSonuc: {
          mesaj: "You handed it over but no one took much interest; it was an ordinary document.",
          detay: "Honesty isn't always rewarded with a great prize.",
        },
      },
      {
        metin: "Quietly keep it for yourself, maybe it's valuable.",
        basariliSonuc: {
          mesaj: "The manuscript really was valuable; you sold it secretly to a collector.",
          detay: "You got the money but you know whose it really was.",
        },
        basarisizSonuc: {
          mesaj: "The manuscript turned out to be a worthless copy; what you kept was a secret for nothing.",
          detay: "Sometimes taking a risk gains you nothing, only wears on your conscience.",
        },
      },
    ],
  },
  genel_deprem: {
    baslik: "The Earth's Wrath",
    metin: "At midnight the ground shook; some houses cracked, one collapsed entirely. In the morning the city is counting the damage and trying to tend its wounds.",
    secenekler: [
      {
        metin: "Help pull people out from under the rubble.",
        basariliSonuc: {
          mesaj: "You pulled a family alive from the collapsed house; the city is talking about you.",
          detay: "Your hands are covered in stone and dust but the lives you saved were worth it.",
        },
        basarisizSonuc: {
          mesaj: "During the rubble work a chunk of wall fell on you.",
          detay: "Trying to help, you got hurt yourself.",
        },
      },
      {
        metin: "Prioritize your own house and your family's safety.",
        basariliSonuc: {
          mesaj: "Your family is safe; you repaired the damage to your house.",
          detay: "You didn't help others, but first you protected your own hearth.",
        },
        basarisizSonuc: {
          mesaj: "Your house was damaged too, and on top of that your neighbors drew away from you for not helping.",
          detay: "Sometimes you can't protect both yourself and others.",
        },
      },
    ],
  },
  genel_yanlis_kimlik: {
    baslik: "They Mistook You for Someone Else",
    metin: "A group of men cornered you and named someone allegedly in debt. You aren't that person but apparently you look a lot like him.",
    secenekler: [
      {
        metin: "Stay calm, try to prove your identity.",
        basariliSonuc: {
          mesaj: "In the end they listened and understood you were the wrong person.",
          detay: "Your heart was racing but it ended well.",
        },
        basarisizSonuc: {
          mesaj: "The men didn't believe you; you were beaten and the money in your pocket was taken.",
          detay: "Because of a wrong resemblance you paid someone else's debt with your body.",
        },
      },
      {
        metin: "Distract the crowd, run.",
        basariliSonuc: {
          mesaj: "The crowd was startled for a moment and you slipped away.",
          detay: "By the time you got home with your heart pounding you couldn't stop laughing.",
        },
        basarisizSonuc: {
          mesaj: "You were caught while running; running made them even more suspicious.",
          detay: "Proving your innocence became much harder after you ran.",
        },
      },
    ],
  },
  genel_kutlama_daveti_yanlislikla: {
    baslik: "An Invitation Sent by Mistake",
    metin: "You received a magnificent invitation letter, not meant for you, addressed to your name probably by a clerical error. If you go, no one might notice.",
    secenekler: [
      {
        metin: "Go to the party, try your luck.",
        basariliSonuc: {
          mesaj: "No one noticed the mistake; you even met some impressive names.",
          detay: "Sometimes being in the right place matters more than whether you were invited.",
        },
        basarisizSonuc: {
          mesaj: "The host realized he didn't know you and had you shown out in front of everyone.",
          detay: "A few shame-filled minutes weren't forgotten for a long time.",
        },
      },
      {
        metin: "Send the invitation back, don't go.",
        basariliSonuc: {
          mesaj: "Your honesty brought a small but satisfying peace.",
          detay: "Maybe you missed an interesting evening but your conscience is clear.",
        },
        basarisizSonuc: {
          mesaj: "You sent the invitation back but curiosity gnawed at you for a long time.",
          detay: "You did the right thing, and still couldn't help thinking 'what if I'd gone'.",
        },
      },
    ],
  },
  genel_tarihi_veba_bilgini: {
    baslik: "Knowledge from Distant Lands",
    metin: "A traveler returning from the east tells that in his homeland, keeping the sick apart worked in fighting the disease. This is a new idea most people will find strange.",
    secenekler: [
      {
        metin: "Hear the idea out, try to apply it in your own circle.",
        basariliSonuc: {
          mesaj: "The simple measures you applied really did slow the spread of the disease in your neighborhood.",
          detay: "No one quite understood why it worked but the results are there; they started to see you differently.",
        },
        basarisizSonuc: {
          mesaj: "Your neighbors mocked the idea as 'foreign nonsense' and didn't apply it.",
          detay: "Getting a new idea accepted sometimes takes time; this time there wasn't enough of it.",
        },
      },
      {
        metin: "Take no interest, trust the traditional methods.",
        basariliSonuc: {
          mesaj: "You carried on with the usual methods; no one found you strange.",
          detay: "Maybe you passed over a useful idea but at least you stayed in step.",
        },
        basarisizSonuc: {
          mesaj: "That year disease spread faster than ever around you.",
          detay: "Maybe if you'd tried the new idea you could have made a difference; you'll never know.",
        },
      },
    ],
  },
  genel_sanayi_bulusu_hevesi: {
    baslik: "An Amateur Inventor",
    metin: "Your neighbor claims a strange machine of his own design will make life easier and asks you for a small investment. The machine looks odd but your neighbor is very sure.",
    secenekler: [
      {
        metin: "Make a small investment.",
        basariliSonuc: {
          mesaj: "The machine really worked! Your neighbor set up a partnership with you and together you started a small production.",
          detay: "While no one else would give this strange contraption a coin, you did, and you won.",
        },
        basarisizSonuc: {
          mesaj: "The machine fell apart on the first trial; your neighbor is sad but you're sadder.",
          detay: "Some enthusiasms are just enthusiasms.",
        },
      },
      {
        metin: "Refuse politely.",
        basariliSonuc: {
          mesaj: "You refused; your neighbor seemed a little put out but was understanding.",
          detay: "Some risks aren't worth taking.",
        },
        basarisizSonuc: {
          mesaj: "Your neighbor sold his machine to someone else and that person got rich.",
          detay: "Learning about the opportunity you missed stung a little.",
        },
      },
    ],
  },
  genel_kayip_mektup_yillar_sonra: {
    baslik: "A Letter That Came Years Later",
    metin: "The postman finally delivered to you a letter sent years ago that had gone to the wrong address. The sender was someone who, back then, was confessing their love for you.",
    secenekler: [
      {
        metin: "Try to find the person who sent it.",
        basariliSonuc: {
          mesaj: "You found the person; though they're married now, you parted with a good conversation and a mutual smile.",
          detay: "Making peace with a piece of your past felt strange but good.",
        },
        basarisizSonuc: {
          mesaj: "The person had long since moved to another city; you found no trace.",
          detay: "Some stories are doomed to stay unfinished.",
        },
      },
      {
        metin: "Read the letter and keep it as a memory.",
        basariliSonuc: {
          mesaj: "You read the letter, smiled, and carefully put it away in a box.",
          detay: "A small piece of your past is with you now; sometimes that's enough.",
        },
        basarisizSonuc: {
          mesaj: "The letter moved you more than you expected; you wandered around distracted for a few days.",
          detay: "The past sometimes crashes into the present uninvited.",
        },
      },
    ],
  },
  genel_sarhos_soylu_kavgasi: {
    baslik: "A Drunk Noble's Insolence",
    metin: "At an inn a drunk noble insulted you and everyone around is waiting for your reaction. If you answer back you keep your honor, if you don't you keep your peace.",
    secenekler: [
      {
        metin: "Answer back sharply.",
        basariliSonuc: {
          mesaj: "Your words drew the crowd's applause; the noble left embarrassed.",
          detay: "For a long time you were known at the inn as 'the man who silenced a noble'.",
        },
        basarisizSonuc: {
          mesaj: "The noble called his men and had you thrown out of the inn.",
          detay: "You stood up for your honor and there was a price.",
        },
      },
      {
        metin: "Ignore it, leave quietly.",
        basariliSonuc: {
          mesaj: "You left the inn before any scene.",
          detay: "You boiled inside a bit but you didn't get into trouble.",
        },
        basarisizSonuc: {
          mesaj: "Those at the inn read your silence as 'cowardice'.",
          detay: "Being sensible sometimes costs you reputation.",
        },
      },
    ],
  },
  genel_kutu_muze_esyasi: {
    baslik: "An Antique Curiosity",
    metin: "In the new fashion for 'antique collecting', you heard that an old family heirloom found in your attic might actually be valuable.",
    secenekler: [
      {
        metin: "Show it to an expert, learn its value.",
        basariliSonuc: {
          mesaj: "The item really was valuable; you sold it to a collector for a good price.",
          detay: "Something that sat in the attic for years became an unexpected source of income.",
        },
        basarisizSonuc: {
          mesaj: "The item turned out to be an ordinary imitation; you just paid the expert's fee.",
          detay: "Not every old thing is valuable.",
        },
      },
      {
        metin: "Keep it as a family heirloom, don't sell.",
        basariliSonuc: {
          mesaj: "You kept the item; it became a memory to pass to the next generation of your family.",
          detay: "Some things aren't measured in money.",
        },
        basarisizSonuc: {
          mesaj: "Years later you learned the item was very valuable but by then it was lost.",
          detay: "Sometimes even the right decision brings regret.",
        },
      },
    ],
  },
  kisilik_sinirli_hakaret: {
    baslik: "Patience Lost",
    metin: "In the marketplace someone shoved you deliberately and didn't even apologize. Something is boiling in you; holding back your anger is getting harder.",
    secenekler: [
      {
        metin: "Let your anger loose, put the man in his place.",
        basariliSonuc: {
          mesaj: "Your sharp response cornered the man; the crowd took your side.",
          detay: "Your anger worked this time; everyone saw you were in the right.",
        },
        basarisizSonuc: {
          mesaj: "The fight escalated, you were both beaten, and they fined you.",
          detay: "Your temper put you in a tight spot again; you noticed this once more.",
        },
      },
      {
        metin: "Grit your teeth, take a deep breath, and walk away.",
        basariliSonuc: {
          mesaj: "You barely held yourself back but you did it; a tension stayed inside you.",
          detay: "Despite your quick-tempered nature you came out on top this time; it had rarely been this hard.",
        },
        basarisizSonuc: {
          mesaj: "Even trying to stay calm, your anger boiled inside; you couldn't sleep that night.",
          detay: "You felt the anger you suppressed was waiting somewhere to explode.",
        },
      },
    ],
  },
  kisilik_sakin_kaos: {
    baslik: "In the Middle of the Storm",
    metin: "During a fire panic, while everyone screams and runs, you are strangely calm. This composure caught people's attention.",
    secenekler: [
      {
        metin: "Use your calm to direct the crowd.",
        basariliSonuc: {
          mesaj: "Your voice and your calm broke the panic; people evacuated in an orderly way.",
          detay: "Where everyone was screaming, your voice was heard, and that made you a natural leader.",
        },
        basarisizSonuc: {
          mesaj: "Your calm wasn't enough this time; the crowd didn't listen to you.",
          detay: "Sometimes even the calmest voice can't quell chaos.",
        },
      },
      {
        metin: "Quietly see to your own safety, don't step forward.",
        basariliSonuc: {
          mesaj: "You calmly moved somewhere safe; no one noticed you.",
          detay: "Your composure only helped yourself this time, and that was enough.",
        },
        basarisizSonuc: {
          mesaj: "Your staying calm led to you being questioned afterward: 'why didn't you help?'",
          detay: "Calm is sometimes misread as indifference.",
        },
      },
    ],
  },
  kisilik_kibirli_kucumseme: {
    baslik: "The Man You Looked Down On",
    metin: "You argued with a plainly dressed man and belittled him. Later you learned he was the head of one of the most influential families in the city — going about in disguise.",
    secenekler: [
      {
        metin: "Use his secret as blackmail! Your pride doesn't bend.",
        basariliSonuc: {
          mesaj: "You threatened to spread word of the noble going about in disguise. He paid you a hefty 'hush fee'.",
          detay: "Your pride made you rich, but you made a very powerful enemy in the shadows.",
        },
        basarisizSonuc: {
          mesaj: "The noble, unable to stomach the blackmail against his pride, sent assassins to your house that night. You paid for your pride with your life.",
        },
      },
      {
        metin: "Go and apologize, swallow your pride.",
        basariliSonuc: {
          mesaj: "Your apology was accepted; the man was understanding, but the damage was done.",
          detay: "Swallowing your pride was hard but at least you didn't gain a great enemy.",
        },
        basarisizSonuc: {
          mesaj: "Your apology wasn't found sincere enough; the man shut you out of his business.",
          detay: "Your pride cost you dearly this time.",
        },
      },
      {
        metin: "Don't care, it doesn't matter who he is.",
        basariliSonuc: {
          mesaj: "Surprisingly nothing happened; the man seems to have forgotten the matter.",
          detay: "This time your pride cost you nothing, but you shouldn't count on luck.",
        },
        basarisizSonuc: {
          mesaj: "Using his influence, the man made things hard for you in many circles.",
          detay: "Your pride gained you a powerful enemy you never knew.",
        },
      },
    ],
  },
  kisilik_alayci_dil: {
    baslik: "A Poisoned Joke",
    metin: "At a gathering you made a mocking joke aimed at an influential person; everyone laughed but the target didn't.",
    secenekler: [
      {
        metin: "Defend your joke, don't back down.",
        basariliSonuc: {
          mesaj: "The crowd backed you; your reputation for being 'blunt' grew.",
          detay: "Your sharp tongue earned you respect this time.",
        },
        basarisizSonuc: {
          mesaj: "The target turned out to be powerful; he quietly began sabotaging your business.",
          detay: "You started paying the price of your mockery over the long run.",
        },
      },
      {
        metin: "Say it was a joke, smooth things over.",
        basariliSonuc: {
          mesaj: "You eased the tension; though the man seemed offended the matter didn't grow.",
          detay: "You managed to rein in your sharp tongue this time.",
        },
        basarisizSonuc: {
          mesaj: "Your attempt to smooth it over looked even more smug; no one was convinced.",
          detay: "Sometimes the damage is already done.",
        },
      },
    ],
  },
  kisilik_umutlu_karanlikta_isik: {
    baslik: "A Light in the Dark",
    metin: "After a bad harvest/downturn everyone around you has lost hope. You still believe things will get better and you want to share that with people.",
    secenekler: [
      {
        metin: "Rally people, revive their hope.",
        basariliSonuc: {
          mesaj: "Your words gave people strength; you decided together to get through the hardship.",
          detay: "Your hope created a community spirit where most people had given up.",
        },
        basarisizSonuc: {
          mesaj: "Your optimism was criticized by some as 'out of touch with reality'.",
          detay: "Hope doesn't always convince everyone.",
        },
      },
      {
        metin: "Be content with your own hope, move on quietly.",
        basariliSonuc: {
          mesaj: "Your hope kept you standing without anyone seeing.",
          detay: "Sometimes hope, even unshared, is enough to keep one person on their feet.",
        },
        basarisizSonuc: {
          mesaj: "Your hope didn't match reality this time; you were disappointed.",
          detay: "Optimism isn't always rewarded, but it doesn't teach you to give up either.",
        },
      },
    ],
  },
  kisilik_umutsuz_neden_ugrasayim: {
    baslik: "Why Bother",
    metin: "A real opportunity has come your way but a voice inside says 'it's pointless anyway'. Trying costs time and effort, not trying means staying in the same place forever.",
    secenekler: [
      {
        metin: "Try anyway, maybe this time is different.",
        basariliSonuc: {
          mesaj: "Surprisingly it worked; maybe it isn't all pointless after all.",
          detay: "Despite the hopelessness inside you, trying turned out better than you thought.",
        },
        basarisizSonuc: {
          mesaj: "It went as you expected; it didn't work, and you thought that proved you right.",
          detay: "'I knew it,' you told yourself, but a small new disappointment piled up inside.",
        },
      },
      {
        metin: "Don't bother, it won't matter anyway.",
        basariliSonuc: {
          mesaj: "You let the opportunity pass; life went on in its usual course.",
          detay: "Something inside said 'what if I'd tried' but you didn't want to admit it.",
        },
        basarisizSonuc: {
          mesaj: "Seeing someone else succeed with the same opportunity stung.",
          detay: "The thing you didn't try blossoming in someone else's hands deepened your hopelessness.",
        },
      },
    ],
  },
  kisilik_depresif_agir_gunler: {
    baslik: "Heavy Days",
    metin: "For weeks there's been a toxic weight you can't shake off; even getting out of bed seems impossible now. Those around you say 'pull yourself together' but that dark pit is pulling you in.",
    secenekler: [
      {
        metin: "Ask for help, open up to someone.",
        basariliSonuc: {
          mesaj: "Opening up to someone wasn't as hard as you expected; the load lightened a little and you got on your feet.",
          detay: "A weight you don't carry alone became bearable.",
        },
        basarisizSonuc: {
          mesaj: "The person you opened up to didn't understand and said 'you're exaggerating'.",
          detay: "Opening up to the wrong person is sometimes heavier than not opening up at all.",
        },
      },
      {
        metin: "Tell no one, wait it out alone in your bed.",
        basariliSonuc: {
          mesaj: "You got through the days, hard as it was; no one noticed anything.",
          detay: "Carrying the weight alone wore you down, but by some miracle you survived.",
        },
        basarisizSonuc: {
          mesaj: "The weight swallowed you completely. You slept for days, lost your job, and your health quickly deteriorated.",
          detay: "The darkness inside you began to consume your body too.",
        },
      },
    ],
  },
  kisilik_cesur_kimsenin_girmedigi: {
    baslik: "Where No One Goes",
    metin: "There is said to be something valuable in a collapsed building/cave/ruin that everyone calls dangerous and impassable. No one dares to go.",
    secenekler: [
      {
        metin: "Go inside, take the risk.",
        basariliSonuc: {
          mesaj: "You really did find something valuable inside; you did what no one else dared.",
          detay: "Your courage paid off once more; in the city your name is spoken as 'the fearless one'.",
        },
        basarisizSonuc: {
          mesaj: "The structure collapsed; you barely escaped being buried under the rubble.",
          detay: "This time your courage nearly cost you your life.",
        },
      },
      {
        metin: "Act with common sense, don't take the risk this time.",
        basariliSonuc: {
          mesaj: "You suppressed the voice inside and kept away; with a strange unease you're safe.",
          detay: "You chose not to use your courage this time and that was a kind of strength too.",
        },
        basarisizSonuc: {
          mesaj: "Someone else went in and found the treasure; they teased you, 'why didn't you go in?'",
          detay: "This is a price of being known as brave: even when you don't go in, an explanation is expected.",
        },
      },
    ],
  },
  kisilik_huzunlu_gecmisin_golgesi: {
    baslik: "The Shadow of the Past",
    metin: "You came across a place/object/name that reminds you of an old pain. The sadness inside you came alive again and for a while those around you noticed.",
    secenekler: [
      {
        metin: "Face your sadness, accept that memory.",
        basariliSonuc: {
          mesaj: "Facing it was painful but somehow it eased you inside.",
          detay: "Accepting your sadness instead of suppressing it brought a peace you didn't expect.",
        },
        basarisizSonuc: {
          mesaj: "The confrontation was heavier than you expected; for a few days you couldn't speak to anyone.",
          detay: "Some memories don't pass easily, even faced.",
        },
      },
      {
        metin: "Hide your sadness, carry on with daily life.",
        basariliSonuc: {
          mesaj: "You kept your sadness inside and went on with your work; no one noticed.",
          detay: "Your sadness goes on being your silent companion.",
        },
        basarisizSonuc: {
          mesaj: "Trying to hide it wore you down further; your sadness turned into a physical weight.",
          detay: "Suppressed feelings sometimes find a place in your body.",
        },
      },
    ],
  },
  kisilik_sosyal_herkesin_tanidigi: {
    baslik: "A Face Everyone Knows",
    metin: "Thanks to your wide circle you heard about an opportunity you normally couldn't reach — an acquaintance of an acquaintance opened a special door for you.",
    secenekler: [
      {
        metin: "Use your connections, make the most of the opportunity.",
        basariliSonuc: {
          mesaj: "Thanks to your connections the door really did open; everyone showed once more the value of saying 'I know him'.",
          detay: "Your wide circle worked for you again; for some people, a network is worth more than capital.",
        },
        basarisizSonuc: {
          mesaj: "The opportunity wasn't as good as it looked; your time and hope went to waste.",
          detay: "Sometimes knowing too many people means being open to the wrong opportunities too.",
        },
      },
      {
        metin: "Offer the opportunity to a friend, let it go to them.",
        basariliSonuc: {
          mesaj: "Your friend made use of the opportunity and remained grateful to you for life.",
          detay: "Sometimes opening a door for someone else feels more valuable than opening it for yourself.",
        },
        basarisizSonuc: {
          mesaj: "Your friend couldn't make use of the opportunity; you were both a little disappointed.",
          detay: "Good intentions don't always give the result you want.",
        },
      },
    ],
  },
  kisilik_icedonuk_kalabaliktan_kacis: {
    baslik: "Escape from the Crowd",
    metin: "You're expected at a big, loud party; being there could help you meet important people, but even the thought of it exhausts you.",
    secenekler: [
      {
        metin: "Push yourself, go.",
        basariliSonuc: {
          mesaj: "Hard as it was, you went; you made a few valuable acquaintances.",
          detay: "The crowd wore you out but it wasn't entirely for nothing.",
        },
        basarisizSonuc: {
          mesaj: "You were overwhelmed in the crowd and left early; this was noticed.",
          detay: "Pushing yourself doesn't always work; this time the price was heavy.",
        },
      },
      {
        metin: "Decline with a polite excuse, protect your own peace.",
        basariliSonuc: {
          mesaj: "You spent a calm evening at home; you gathered yourself again.",
          detay: "Not everyone has to socialize; knowing your own peace is a strength too.",
        },
        basarisizSonuc: {
          mesaj: "An important opportunity was discussed at the party you didn't attend; you learned later that you'd missed it.",
          detay: "Your introversion protected you but it closed a door too.",
        },
      },
    ],
  },
  kisilik_sivridilli_soz_bedeli: {
    baslik: "The Price of Your Words",
    metin: "A sharp remark you made without thinking, aimed at an influential person, spread quickly. Some count it as courage, some as disrespect.",
    secenekler: [
      {
        metin: "Stand behind your words, don't back down.",
        basariliSonuc: {
          mesaj: "You became known for your honesty; many people, it turned out, were thinking the same thing.",
          detay: "Your sharp tongue was read this time as a mark of courage.",
        },
        basarisizSonuc: {
          mesaj: "The target turned out to be powerful; he quietly began making things hard for you.",
          detay: "Your words had a price and you're paying it now.",
        },
      },
      {
        metin: "Apologize, try to repair the relationship.",
        basariliSonuc: {
          mesaj: "Your apology was accepted; the relationship was repaired, though your pride took a little hit.",
          detay: "Reining in your sharp tongue was hard but it worked.",
        },
        basarisizSonuc: {
          mesaj: "Your apology wasn't found sincere enough; the relationship was already damaged.",
          detay: "Some words can't be taken back once spoken.",
        },
      },
    ],
  },
  kisilik_yumusakbasli_herkesin_sevdigi: {
    baslik: "Kindness Exploited",
    metin: "Thanks to your gentle nature everyone likes you, but this time someone is openly abusing your good will and making a very heavy, unfair demand of you.",
    secenekler: [
      {
        metin: "Say no gently but clearly.",
        basariliSonuc: {
          mesaj: "Your gentle but firm stance earned respect; the man gave up on what he wanted.",
          detay: "Being gentle doesn't mean being unable to set a boundary; you proved that.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was met with surprise by some: 'that's not like him'.",
          detay: "Setting a boundary may seem against your nature but sometimes it's necessary.",
        },
      },
      {
        metin: "Accept as always, don't disturb the peace.",
        basariliSonuc: {
          mesaj: "You accepted the request; the man left pleased but you diminished a little more.",
          detay: "Pleasing everyone sometimes reduces your own share.",
        },
        basarisizSonuc: {
          mesaj: "Your accepting opened the door for the man to use you again and again.",
          detay: "Your kindness got you exploited this time. When you look in the mirror you're angry at yourself.",
        },
      },
    ],
  },
  kisilik_rekabetci_kim_daha_iyi: {
    baslik: "Who Is Better",
    metin: "An acquaintance has openly started competing with you: who will earn more, who will be better known. This rivalry spurs you on.",
    secenekler: [
      {
        metin: "Accept the rivalry, lay everything on the line.",
        basariliSonuc: {
          mesaj: "You won the rivalry by a wide margin; even your rival had to congratulate you.",
          detay: "Your competitive nature put you out front once more.",
        },
        basarisizSonuc: {
          mesaj: "Your rival left you behind; losing felt heavier than ever.",
          detay: "Your competitive spirit sometimes pushes you into more risk than you should take and crushes you when you lose.",
        },
      },
      {
        metin: "Ignore the rivalry, go at your own pace.",
        basariliSonuc: {
          mesaj: "You didn't get into the rivalry; though there was an unease inside, your business went healthily.",
          detay: "Learning not to enter every race is a kind of maturity too.",
        },
        basarisizSonuc: {
          mesaj: "Your rival read your not competing as 'accepting defeat'.",
          detay: "Even your withdrawing was read by others as a result, and it hurt your pride.",
        },
      },
    ],
  },
  kisilik_hirsli_yeterince_degil: {
    baslik: "Never Enough",
    metin: "You have a business that's going well, but the voice inside you says 'not enough, there must be more'. A bigger move is risky but your ambition won't stop you.",
    secenekler: [
      {
        metin: "Take the risk to grow everything.",
        basariliSonuc: {
          mesaj: "Your big move paid off; your business jumped to a higher level.",
          detay: "Your ambition carried you forward once more; but the voice inside still says 'there must be more'.",
        },
        basarisizSonuc: {
          mesaj: "Your big move didn't work; you lost even part of your solid business.",
          detay: "Your ambition convinced you not to be content with enough this time, and you paid dearly for it.",
        },
      },
      {
        metin: "Be content with what you have, don't take the risk.",
        basariliSonuc: {
          mesaj: "You were content with what you had; despite the unease inside you, your business stayed stable.",
          detay: "You managed to rein in your ambition this time; it wasn't easy.",
        },
        basarisizSonuc: {
          mesaj: "Though you tried to be content, the dissatisfaction inside you kept you sleepless for days.",
          detay: "Having an ambitious nature turns saying 'enough' into a torment.",
        },
      },
    ],
  },
  kisilik_vicdanli_vicdanin_sesi: {
    baslik: "The Voice of Your Conscience",
    metin: "There's an easy and very profitable path no one would notice, but this path means an innocent person is unjustly harmed. Your conscience won't leave you alone.",
    secenekler: [
      {
        metin: "Listen to your conscience, refuse the easy path.",
        basariliSonuc: {
          mesaj: "You listened to the voice of your conscience; though no one knows, you're at peace with yourself.",
          detay: "Your conscientious nature steered you toward the right thing once more. You lay your head easy on the pillow.",
        },
        basarisizSonuc: {
          mesaj: "You did the right thing but it cost more than you expected.",
          detay: "Listening to your conscience sometimes has a concrete price.",
        },
      },
      {
        metin: "Tell yourself 'I have no choice this time', take the easy path.",
        basariliSonuc: {
          mesaj: "You won, but that innocent man's face won't leave your mind.",
          detay: "For a conscientious person, this choice left a poison far heavier than the money you gained.",
        },
        basarisizSonuc: {
          mesaj: "You neither got the gain you expected nor kept your conscience; it ate you alive.",
          detay: "Acting against your nature feels twice as heavy when you lose.",
        },
      },
    ],
  },
  yerlesim_sinir_baskini: {
    baslik: "A Raid on the Border",
    metin: "At midnight a small raiding party attacked your village on the border. You woke to gunshots, burning houses, and screams.",
    secenekler: [
      {
        metin: "Grab your weapon and run to the village's defense.",
        basariliSonuc: {
          mesaj: "You helped drive off the raid; the villagers were grateful to you.",
          detay: "You took your share of the spoils and the thanks.",
        },
        basarisizSonuc: {
          mesaj: "You were badly wounded in the fighting; it took weeks to heal.",
          detay: "The price of living on the border sometimes stays in your flesh.",
        },
      },
      {
        metin: "Take your family and flee to the forest, let the raid pass.",
        basariliSonuc: {
          mesaj: "You saved your life but when you returned half your house had been plundered.",
          detay: "Those who live on the border learn to choose life over property.",
        },
        basarisizSonuc: {
          mesaj: "While fleeing you ran into the raiders; you lost your belongings and took a few wounds.",
          detay: "On the border, peace is something rented for a short while.",
        },
      },
    ],
  },
  yerlesim_sehir_salgin_kalabaligi: {
    baslik: "The Crowded Bazaar",
    metin: "The bazaar in the city center is packed as always; but this month cases of feverish illness are rising fast. Standing in the crowd is risky, staying away means missing opportunities.",
    secenekler: [
      {
        metin: "Mingle in the bazaar, make the most of opportunities.",
        basariliSonuc: {
          mesaj: "You caught a good bargain in the crowd; the illness passed you by too.",
          detay: "This is the advantage of living in the city: opportunity is always in the crowd.",
        },
        basarisizSonuc: {
          mesaj: "After the bazaar your fever spiked; you spent days in bed.",
          detay: "In crowded cities illness spreads as fast as opportunity.",
        },
      },
      {
        metin: "Stay home, get through this month.",
        basariliSonuc: {
          mesaj: "You stayed home and were protected from the illness; but you missed the bazaar's opportunities.",
          detay: "Some months pass with just surviving.",
        },
        basarisizSonuc: {
          mesaj: "Despite staying home, one of the neighbors carried the illness; you got through it with a small expense.",
          detay: "Isolating completely in a city is nearly impossible.",
        },
      },
    ],
  },
  sanayi_fabrika_grevi: {
    baslik: "A Factory Strike",
    metin: "In the {bolge} factories the workers went on strike for a wage raise and humane conditions. The streets are full of tension; soldiers are on the way. Everyone expects you to pick a side.",
    secenekler: [
      {
        metin: "Support the strike, stand with the workers.",
        basariliSonuc: {
          mesaj: "The strike ended in a partial victory; the workers will count you on their side.",
          detay: "In the industrial age, taking the side of the oppressed is most often a proud decision with no going back.",
        },
        basarisizSonuc: {
          mesaj: "The strike was bloodily crushed; your name was named among the ringleaders. You were beaten.",
          detay: "Factory owners don't forget this kind of thing.",
        },
      },
      {
        metin: "Oppose it, take the side of the employers (capital).",
        basariliSonuc: {
          mesaj: "The employers showed their appreciation; your strongbox filled up a bit.",
          detay: "The winners of the industrial age are most often not the most merciful but those who pick the right side.",
        },
        basarisizSonuc: {
          mesaj: "The workers didn't forget your stance; one night walking down the street you were attacked.",
          detay: "Some choices bring a short-term gain and a long-term, painful price.",
        },
      },
    ],
  },
  sanayi_sendika_toplantisi: {
    baslik: "A Secret Union Meeting",
    metin: "A newly formed union in your neighborhood is secretly gathering members. {dost} suggests you join too; the solidarity is strong but in the state's eyes it's a risky allegiance.",
    secenekler: [
      {
        metin: "Join the union, act together with {dost}.",
        basariliSonuc: {
          mesaj: "The meeting went well; {dost} was glad you were beside him.",
          detay: "The age of solidarity rewards those who act together.",
        },
        basarisizSonuc: {
          mesaj: "The meeting ended in chaos with a police raid. You barely got away.",
          detay: "No organizing effort runs smoothly the first time.",
        },
      },
      {
        metin: "Don't join, prefer to stay independent and safe.",
        basariliSonuc: {
          mesaj: "You stayed independent; {dost} was a little disappointed but respected it.",
          detay: "Not every road has to be walked together.",
        },
        basarisizSonuc: {
          mesaj: "{dost} told people around that this decision made you a 'boss's toady'.",
          detay: "Independence is sometimes read as loneliness and betrayal.",
        },
      },
    ],
  },
  sanayi_gazete_haberi: {
    baslik: "A Newspaper Article",
    metin: "A local newspaper is preparing an article about you. The reporter asks whether you want an honest interview or an exaggerated, embellished heroic story.",
    secenekler: [
      {
        metin: "Give an honest interview, tell it as it is.",
        basariliSonuc: {
          mesaj: "The article was plain but effective; readers appreciated your sincerity.",
          detay: "In the age of the press, honesty leaves a more lasting reputation than showiness.",
        },
        basarisizSonuc: {
          mesaj: "The interview didn't get the attention you expected; it stayed on the back pages as an ordinary item.",
          detay: "Not every honest story makes the front page.",
        },
      },
      {
        metin: "Embellish the story, tell it like a hero.",
        basariliSonuc: {
          mesaj: "The article made a big splash in the city; your name is on everyone's lips.",
          detay: "The age of the press can put a well-told lie ahead of the truth.",
        },
        basarisizSonuc: {
          mesaj: "Your exaggerations came out; a rival newspaper declared you a 'liar'.",
          detay: "In the industrial age lies spread much faster than before and burn out quickly.",
        },
      },
    ],
  },
  sanayi_tren_yolculugu: {
    baslik: "A Train Journey",
    metin: "The newly opened railway line lets you reach a big opportunity in a distant city in a few hours. The ticket is expensive but the opportunity seems too good to miss.",
    secenekler: [
      {
        metin: "Buy the ticket, board the train and chase the opportunity.",
        basariliSonuc: {
          mesaj: "The journey paid off more than enough; the deal was signed.",
          detay: "The railway age rewards those who turn distances into opportunities.",
        },
        basarisizSonuc: {
          mesaj: "When you got to the city you learned the opportunity had already gone to someone else.",
          detay: "Sometimes the train arrives on time but the opportunity doesn't wait for you.",
        },
      },
      {
        metin: "Don't take the risk, keep your money, stay home.",
        basariliSonuc: {
          mesaj: "You kept your money; the opportunity got away but at least your purse didn't get lighter.",
          detay: "Missing every train opportunity may not be as bad a choice as it seems.",
        },
        basarisizSonuc: {
          mesaj: "Later, hearing how much those who took the opportunity made, it sank in.",
          detay: "Missed opportunities sometimes won't leave your mind for a long time.",
        },
      },
    ],
  },
  sanayi_gaz_lambasi_sokaklari: {
    baslik: "The Gaslit Streets",
    metin: "The city streets, lit by gas lamps, take on a new life at night: coffeehouses, gambling dens, salons where society gathers. You heard that {rakip} is out tonight too.",
    secenekler: [
      {
        metin: "Mingle in society too, make new connections.",
        basariliSonuc: {
          mesaj: "The evening was pleasant; you made a few valuable acquaintances.",
          detay: "The gaslit nights are the real social life of the industrial city.",
        },
        basarisizSonuc: {
          mesaj: "You crossed {rakip} during the night; not to mention the money you lost at the gambling table.",
          detay: "The city's night life can be as risky as it is alluring.",
        },
      },
      {
        metin: "Stay home, have a quiet evening.",
        basariliSonuc: {
          mesaj: "You had a calm evening; you woke rested the next day.",
          detay: "You don't have to go out every night.",
        },
        basarisizSonuc: {
          mesaj: "The next day, hearing everyone talk about the night's entertainment, you felt left out.",
          detay: "Sometimes staying home has a small social price too.",
        },
      },
    ],
  },
  rutbe3_asker_saldiri_karari: {
    baslik: "A Command Decision",
    metin: "You are a commander now. Your scouts reported a small enemy unit dug in in a nearby valley; they look weak but it could be a trap. You will give the order, and your unit trusts you.",
    secenekler: [
      {
        metin: "Forward! Order a raid at dawn.",
        basariliSonuc: {
          mesaj: "The raid hit dead on; the enemy unit scattered, the spoils were divided among your unit.",
          detay: "Your name is spoken like a legend now, not only in your own unit but in the command tier.",
        },
        basarisizSonuc: {
          mesaj: "It was a trap. Your unit took heavy losses and you barely got yourself off the front.",
          detay: "This decision left a deep mark on both your body and your reputation.",
        },
      },
      {
        metin: "Wait, gather intelligence first.",
        basariliSonuc: {
          mesaj: "Your patience paid off; it turned out to be a trap and you pulled your unit back without losses.",
          detay: "Cautious commanders write epics too, just more quietly.",
        },
        basarisizSonuc: {
          mesaj: "While you waited the opportunity slipped away; the high command questioned your indecision.",
          detay: "Sometimes even the right decision costs reputation when it's badly timed.",
        },
      },
    ],
  },
  rutbe3_tuccar_lonca_karari: {
    baslik: "A Guild Decision",
    metin: "As guild master you now set the prices of bread and grain. There is a famine; the people are in a hard spot, but keeping prices low means giving up your own profit.",
    secenekler: [
      {
        metin: "Keep prices low, stand with the people.",
        basariliSonuc: {
          mesaj: "Your decision was heard in the city; the people began to speak of you as the most just of the guild masters.",
          detay: "Though some of your guild partners are angry at this decision, your standing in the street has never been so high.",
        },
        basarisizSonuc: {
          mesaj: "Your intentions were good but carrying it out cost far more than you foresaw.",
          detay: "The guild's coffers paid the bill for this decision for a long time.",
        },
      },
      {
        metin: "Keep prices high, protect your profit.",
        basariliSonuc: {
          mesaj: "Your strongbox filled; but the number of people who turn their faces away when they hear your name rose too.",
          detay: "Wealth and being loved usually don't come at the same time.",
        },
        basarisizSonuc: {
          mesaj: "The people revolted, a few warehouses were plundered; most of the profit you expected evaporated.",
          detay: "Hunger can overturn even the most careful calculations overnight.",
        },
      },
    ],
  },
  rutbe3_din_vaiz_karari: {
    baslik: "A Pulpit Decision",
    metin: "You've become chief preacher; there is tension in your congregation. Some want a harsh sermon against neighbors of other faiths, some expect a call for tolerance. What you say from the pulpit will steer this city.",
    secenekler: [
      {
        metin: "Give a call for tolerance and unity.",
        basariliSonuc: {
          mesaj: "Your sermon echoed through the city; even different groups spoke of you with respect.",
          detay: "A measured word from the pulpit can outlast the sword.",
        },
        basarisizSonuc: {
          mesaj: "Some hardliners in the congregation declared you 'weak'; your word doesn't carry the weight it did.",
          detay: "A call for tolerance never pleases everyone at once.",
        },
      },
      {
        metin: "Give a harsh, exclusionary sermon.",
        basariliSonuc: {
          mesaj: "Your sermon fired up your congregation; their loyalty to you grew but so did the tension in the city.",
          detay: "The gap between your consolidated authority and your conscience grows wider every day.",
        },
        basarisizSonuc: {
          mesaj: "Your words turned into a clash in the streets; even some congregation members drew away from you.",
          detay: "A word from the pulpit sometimes turns into a fire beyond your control.",
        },
      },
    ],
  },
  tepki_amire_meydan_okuma: {
    baslik: "Your Patience Snapped",
    metin: "{amir} leveled another unfair criticism at you today, and in front of everyone. The anger inside you rose to your throat.",
    secenekler: [
      {
        metin: "Swallow it, say nothing.",
        basariliSonuc: {
          mesaj: "You swallowed it; your anger piled up somewhere inside.",
          detay: "Some battles are won with silence — or just postponed.",
        },
        basarisizSonuc: {
          mesaj: "You tried to swallow it but your hands shook and everyone noticed.",
          detay: "Suppressed anger sometimes becomes even more visible.",
        },
      },
      {
        metin: "Raise your voice, answer back.",
        basariliSonuc: {
          mesaj: "Not used.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
        onTepki: {
          metin: "{amir} looks at you in shock, and the people around have dropped what they were doing to watch. What you said can't be taken back, but whether to go further is in your hands.",
          geriCekilMetni: "Soften it at once: 'I didn't mean it that way.'",
          geriCekilSonucu: {
            mesaj: "You backed off at the last moment; the tension eased but a regret stayed inside you.",
            detay: "Sometimes the bravest thing is knowing when to stay silent.",
          },
          devamMetni: "No. Stand behind what you said.",
          devamSonucu: {
            mesaj: "You went all the way. {amir} walked off without a word, but your punishment wasn't slow to come.",
            detay: "Standing firm had a price, but at least you stayed true to yourself.",
          },
        },
      },
    ],
  },
  tepki_ticaret_sert_tehdit: {
    baslik: "Tension at the Table",
    metin: "A supplier you've worked with for a long time tried to raise the agreed price at the last moment. Your anger is rising; you're about to hurl a threat that would end the relationship.",
    secenekler: [
      {
        metin: "Stay calm, offer a new price.",
        basariliSonuc: {
          mesaj: "You found a reasonable middle ground; the relationship didn't cool.",
          detay: "Calm is sometimes the best negotiating tactic.",
        },
        basarisizSonuc: {
          mesaj: "The supplier didn't like your offer and drove a hard bargain.",
          detay: "Not every calm approach finds a reward.",
        },
      },
      {
        metin: "Slam the table, threaten to end the relationship.",
        basariliSonuc: {
          mesaj: "Not used.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
        onTepki: {
          metin: "The supplier's face falls. You're about to say 'we can end this relationship right here,' but that risks a bond you've built over years.",
          geriCekilMetni: "Calm down, pull back the threat.",
          geriCekilSonucu: {
            mesaj: "You softened at the last moment; the supplier appreciated it and gave a small discount.",
            detay: "Sometimes a step back is the shortest way forward.",
          },
          devamMetni: "No. Carry your threat all the way through.",
          devamSonucu: {
            mesaj: "The supplier didn't let you collapse the deal, and gave in — but he doesn't trust you anymore.",
            detay: "The bargain you won weighs the same as the trust you lost.",
          },
        },
      },
    ],
  },
  tepki_din_cemaat_meydan_okuma: {
    baslik: "A Moment at the Pulpit",
    metin: "During your sermon someone in the congregation raised their voice and openly questioned you. Everyone is looking at you; your next word will either consolidate your authority or shake it.",
    secenekler: [
      {
        metin: "Give a patient, measured answer.",
        basariliSonuc: {
          mesaj: "Your measured answer calmed the congregation; your standing rose.",
          detay: "Patience is one of the strongest weapons in the pulpit.",
        },
        basarisizSonuc: {
          mesaj: "Your answer wasn't found convincing enough; the murmuring continued.",
          detay: "Not every calm answer finds its reward.",
        },
      },
      {
        metin: "Remind them of your authority in a harsh tone.",
        basariliSonuc: {
          mesaj: "Not used.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
        onTepki: {
          metin: "Your voice hardens, the congregation falls silent. Continuing in this tone could consolidate your authority or split your congregation in two.",
          geriCekilMetni: "Soften your voice, close the argument.",
          geriCekilSonucu: {
            mesaj: "You softened your tone at the last moment; the tension eased.",
            detay: "Sometimes authority is shown by lowering your voice.",
          },
          devamMetni: "No. Keep your harsh tone.",
          devamSonucu: {
            mesaj: "Your words echoed through the pulpit; some respected you more, some left the congregation.",
            detay: "Authority sometimes comes with a split.",
          },
        },
      },
    ],
  },
  tepki_asker_amirine_itaatsizlik: {
    baslik: "Defying an Order",
    metin: "{amir} gave you an openly unjust, even dangerous order. Military discipline demands obedience but your conscience objects.",
    secenekler: [
      {
        metin: "Carry out the order without question.",
        basariliSonuc: {
          mesaj: "You carried out the order; your discipline was praised but an unease stayed inside you.",
          detay: "Sometimes obedience silences the voice of conscience.",
        },
        basarisizSonuc: {
          mesaj: "You carried out the order but things didn't go as planned.",
          detay: "Blind obedience has a price too.",
        },
      },
      {
        metin: "You're about to openly refuse the order.",
        basariliSonuc: {
          mesaj: "Not used.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
        onTepki: {
          metin: "{amir} narrows his eyes: 'Are you disobeying an order?' The answer you give to this question could change your military life.",
          geriCekilMetni: "Back down at the last moment, accept the order.",
          geriCekilSonucu: {
            mesaj: "You accepted the order at the last moment; {amir} passed without a word but a regret stayed inside you.",
            detay: "Sometimes instead of standing firm you choose to survive.",
          },
          devamMetni: "No. Openly refuse the order.",
          devamSonucu: {
            mesaj: "You refused the order; your conscience is eased but the disciplinary punishment wasn't slow to come.",
            detay: "Doing what you knew was right had a price, but you don't regret it.",
          },
        },
      },
    ],
  },
  zincir_asker_baskin_karari: {
    baslik: "The Moment of the Raid",
    metin: "Your unit raided a small enemy caravan. After a short clash the spoils were seized; but the commander turns to you and asks: 'Do we stop here?'",
    secenekler: [
      {
        metin: "Gather what was seized, fall back.",
        basariliSonuc: {
          mesaj: "You gathered what you seized and fell back safely.",
          detay: "The commander liked your decision: 'Greed is sometimes the greatest enemy.'",
        },
        basarisizSonuc: {
          mesaj: "The retreat got messy, a few soldiers were lightly wounded but the spoils stayed in your hands.",
          detay: "Still, it was a dangerous withdrawal.",
        },
      },
      {
        metin: "Push forward for more.",
        basariliSonuc: {
          mesaj: "You pushed on; you seized a second caravan too.",
          detay: "Your unit's morale is sky high, but how long will your luck last?",
        },
        basarisizSonuc: {
          mesaj: "You pushed on but were ambushed; a few soldiers were lost.",
          detay: "Greed had a heavy price.",
        },
      },
    ],
  },
  zincir_asker_ganimet_devami: {
    baslik: "Is This Enough?",
    metin: "The commander turns to the unit and asks: 'Is this much spoils enough, or do we attack again?' All eyes are on you; they await your decision.",
    secenekler: [
      {
        metin: "Enough. Let's go back with what we've won.",
        basariliSonuc: {
          mesaj: "You went back with what you'd won; the unit reached base safe and sound.",
          detay: "Sometimes the wisest victory is knowing when to stop.",
        },
        basarisizSonuc: {
          mesaj: "The decision to go back disappointed some of the soldiers.",
          detay: "Not everyone is of the same mind.",
        },
      },
      {
        metin: "No, let's attack for more.",
        basariliSonuc: {
          mesaj: "The second wave succeeded too; your unit's name spread through the region.",
          detay: "Your luck held this time too.",
        },
        basarisizSonuc: {
          mesaj: "The last attack ended in disaster; the unit took heavy losses.",
          detay: "The bill for greed was paid very heavily this time.",
        },
      },
    ],
  },
  zincir_asker_dusman_kacisi: {
    baslik: "The Fleeing Enemy",
    metin: "After a short clash the enemy unit scattered and fled. A few are wounded and moving slowly; if you chase them you can catch up.",
    secenekler: [
      {
        metin: "Let them go, hold your position.",
        basariliSonuc: {
          mesaj: "You held your position; the unit got a chance to rest.",
          detay: "Sometimes victory is protected by not chasing.",
        },
        basarisizSonuc: {
          mesaj: "The decision to wait was counted cowardice by some soldiers.",
          detay: "Not every cautious decision is appreciated.",
        },
      },
      {
        metin: "Go after them, finish the job.",
        basariliSonuc: {
          mesaj: "You caught the fleeing ones; the unit won a complete victory.",
          detay: "But you've entered unknown terrain now.",
        },
        basarisizSonuc: {
          mesaj: "While chasing, your formation broke; a few soldiers fell behind.",
          detay: "The hunger for victory sometimes turns into a trap.",
        },
      },
    ],
  },
  zincir_asker_takip_karari: {
    baslik: "Unknown Terrain",
    metin: "The chase dragged you into a forest you don't know. Something is moving ahead — maybe reinforcements, maybe just the wind. On or back?",
    secenekler: [
      {
        metin: "Turn back, don't take the risk.",
        basariliSonuc: {
          mesaj: "You turned back; the unit reached base safely.",
          detay: "Cautious commanders live long.",
        },
        basarisizSonuc: {
          mesaj: "The decision to go back was counted by some as missing an opportunity.",
          detay: "Pleasing everyone is impossible.",
        },
      },
      {
        metin: "Go in, take the danger.",
        basariliSonuc: {
          mesaj: "Inside you found an abandoned enemy camp; the spoils went to the unit.",
          detay: "Your courage was rewarded this time.",
        },
        basarisizSonuc: {
          mesaj: "The inside of the forest was a real trap; the unit took heavy losses.",
          detay: "It wasn't the wind.",
        },
      },
    ],
  },
  zincir_tuccar_agir_pazarlik: {
    baslik: "A Hard Offer",
    metin: "A big buyer wants to take your goods far below the market price. If you accept, a small but guaranteed profit; if you refuse, a bigger gain goes at risk.",
    secenekler: [
      {
        metin: "Accept the offer, secure the deal.",
        basariliSonuc: {
          mesaj: "You accepted the offer; the profit is low but guaranteed.",
          detay: "Sometimes a small but sure gain is worth more than taking a big risk.",
        },
        basarisizSonuc: {
          mesaj: "You accepted the offer but the buyer hardened the terms a little more at the last moment.",
          detay: "You can't always come out ahead at the table.",
        },
      },
      {
        metin: "Refuse, hold out for a better price.",
        basariliSonuc: {
          mesaj: "Your insistence worked, the buyer raised the price.",
          detay: "Your courage found its reward this time.",
        },
        basarisizSonuc: {
          mesaj: "The buyer gave up and turned to another merchant.",
          detay: "Insisting doesn't always pay off.",
        },
      },
    ],
  },
  zincir_tuccar_pazarlik_sonucu: {
    baslik: "The Buyer Came Back",
    metin: "The same buyer came back a few days later, this time offering a bigger order — but with even tighter terms. Do you want to tie yourself more to this relationship?",
    secenekler: [
      {
        metin: "Thank them, leave the relationship here.",
        basariliSonuc: {
          mesaj: "You politely refused; the relationship stayed balanced.",
          detay: "You don't have to seize every opportunity.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal offended the buyer; you lost a small customer.",
          detay: "Sometimes 'no' carries a price too.",
        },
      },
      {
        metin: "Accept the big order, take the risk.",
        basariliSonuc: {
          mesaj: "The big order was completed without a hitch; your trade grew a notch.",
          detay: "Some risks really do pay off.",
        },
        basarisizSonuc: {
          mesaj: "Something went wrong during the order and you took a loss.",
          detay: "Big opportunities come with big risk.",
        },
      },
    ],
  },
  genclik_kustahligi: {
    baslik: "Youthful Insolence",
    metin: "You openly disagree with the view of a respected elder. You're caught between raising your voice in front of everyone or not.",
    secenekler: [
      {
        metin: "Answer back, defend your view.",
        basariliSonuc: {
          mesaj: "Your courage was appreciated by some of the young people; you were called 'someone with a mind of their own'.",
          detay: "Young voices are sometimes the first spark of change.",
        },
        basarisizSonuc: {
          mesaj: "You were scolded as 'disrespectful'; the elders were cold toward you for a while.",
          detay: "Not every rebellion is understood right away.",
        },
      },
      {
        metin: "Be quiet, listen respectfully.",
        basariliSonuc: {
          mesaj: "Your staying silent was read as maturity.",
          detay: "Sometimes silence is a show of strength too.",
        },
        basarisizSonuc: {
          mesaj: "Swallowing what you felt left you uneasy; you had trouble falling asleep that night.",
          detay: "Swallowed words sometimes echo inside.",
        },
      },
    ],
  },
  arkadas_grubu_baskisi: {
    baslik: "Peer Pressure",
    metin: "Your friends want to drag you into a dangerous and slightly stupid midnight adventure. 'Don't come if you're scared,' they say, laughing.",
    secenekler: [
      {
        metin: "Join them, show your courage.",
        basariliSonuc: {
          mesaj: "The night turned into an unforgettable adventure; you became a legend in the group.",
          detay: "Some memories still make you smile years later.",
        },
        basarisizSonuc: {
          mesaj: "The adventure went wrong; you got home hurt and broke.",
          detay: "Courage is sometimes mixed with carelessness.",
        },
      },
      {
        metin: "Refuse, choose your own path.",
        basariliSonuc: {
          mesaj: "You turned the offer down; the next day, hearing what happened to your friends, you saw you'd been right.",
          detay: "Sometimes saying no is the wisest answer.",
        },
        basarisizSonuc: {
          mesaj: "They teased you as a 'coward' for a while.",
          detay: "Not every refusal is met with understanding.",
        },
      },
    ],
  },
  ilk_hayal_kirikligi: {
    baslik: "The First Great Disappointment",
    metin: "Something you worked at for months blew up in your hands — what you hoped for didn't happen. It feels like your first real failure.",
    secenekler: [
      {
        metin: "Try again, don't give up.",
        basariliSonuc: {
          mesaj: "You succeeded on your second try; you saw your first failure had made you stronger.",
          detay: "Some lessons are only learned by falling.",
        },
        basarisizSonuc: {
          mesaj: "The second try didn't work either; for a while you lost confidence in yourself.",
          detay: "Not every second chance brings victory.",
        },
      },
      {
        metin: "Accept it, turn to something else.",
        basariliSonuc: {
          mesaj: "You accepted the disappointment and turned your energy to another field.",
          detay: "Sometimes the wisest move is to give up.",
        },
        basarisizSonuc: {
          mesaj: "You gave up but a nagging 'what if' stayed with you for a long time.",
          detay: "Abandoned work sometimes won't let you go.",
        },
      },
    ],
  },
  genc_asker_ilk_darbe: {
    baslik: "The First Sword Blow",
    metin: "On the drill ground the sergeant puts you into a duel exercise with an experienced soldier. This is the first time you swing your sword against a real opponent.",
    secenekler: [
      {
        metin: "Attack with all your might, show what you've learned.",
        basariliSonuc: {
          mesaj: "You made a move that surprised your opponent; the sergeant didn't take his eyes off you.",
          detay: "First victories are the most remembered.",
        },
        basarisizSonuc: {
          mesaj: "The experienced soldier laid you out flat, in front of everyone.",
          detay: "Pain is sometimes the best teacher.",
        },
      },
      {
        metin: "Be cautious, only defend.",
        basariliSonuc: {
          mesaj: "Your cautious stance kept you standing; even the experienced soldier was surprised.",
          detay: "Sometimes surviving is worth more than winning.",
        },
        basarisizSonuc: {
          mesaj: "You were found too cautious; they teased you as 'gutless'.",
          detay: "Not every caution is appreciated.",
        },
      },
    ],
  },
  genc_tuccar_ilk_pazarlik: {
    baslik: "The First Negotiation",
    metin: "Not under your master's watch but entirely on your own, you're doing your first big negotiation. The merchant across from you is experienced and impatient.",
    secenekler: [
      {
        metin: "Boldly offer a high price.",
        basariliSonuc: {
          mesaj: "Your courage found its reward; you struck a deal at a good price.",
          detay: "You'll never forget the victory of your first big negotiation.",
        },
        basarisizSonuc: {
          mesaj: "The other side gave up on you, thinking you 'green', and made a deal with someone else.",
          detay: "Not every act of courage finds a reward.",
        },
      },
      {
        metin: "Start with a safe, modest offer.",
        basariliSonuc: {
          mesaj: "Your modest offer was accepted; you made a small but safe gain.",
          detay: "Sometimes the first step must be small.",
        },
        basarisizSonuc: {
          mesaj: "The negotiation went on a long time but in the end you reached no agreement.",
          detay: "Not every negotiation ends in a deal.",
        },
      },
    ],
  },
  genc_din_adami_ilk_vaaz: {
    baslik: "The First Pulpit",
    metin: "The head priest fell ill and you have to lead a small service. Small as the crowd is, this is your first real pulpit.",
    secenekler: [
      {
        metin: "Speak in your own words, sincerely.",
        basariliSonuc: {
          mesaj: "Your words moved the congregation deeply; they said 'this young one will be great one day'.",
          detay: "Sincerity is sometimes the most powerful sermon.",
        },
        basarisizSonuc: {
          mesaj: "You stammered from nerves; some whispered with a smile.",
          detay: "No first attempt is flawless.",
        },
      },
      {
        metin: "Read the classic text you memorized.",
        basariliSonuc: {
          mesaj: "Your safe choice worked; the service went without a hitch.",
          detay: "Sometimes the known road is the safest.",
        },
        basarisizSonuc: {
          mesaj: "Reciting the text by rote left you quietly unsatisfied; you felt you hadn't found your own voice.",
          detay: "Safety sometimes trades off against originality.",
        },
      },
    ],
  },
  genclik_hatiralari: {
    baslik: "Memories of Youth",
    metin: "By the fireside your grandchildren or young neighbors ask how your youth was. You have a lot to tell.",
    secenekler: [
      {
        metin: "Tell everyone your stories.",
        basariliSonuc: {
          mesaj: "Your stories enchanted everyone; you talked into the small hours.",
          detay: "A life shared is a life lived twice.",
        },
        basarisizSonuc: {
          mesaj: "Your stories didn't catch on; the young ones hurriedly changed the subject.",
          detay: "Not every generation is enchanted by the same stories.",
        },
      },
      {
        metin: "Live it quietly within yourself.",
        basariliSonuc: {
          mesaj: "You kept your memories to yourself, relived them in a quiet peace.",
          detay: "Some treasures are valuable even unshared.",
        },
        basarisizSonuc: {
          mesaj: "Your silence deepened your feeling of loneliness.",
          detay: "Sometimes not sharing carries a price too.",
        },
      },
    ],
  },
  bedenin_sinirlari: {
    baslik: "The Body's Limits",
    metin: "You noticed today that you couldn't do something you used to do easily. Your body is no longer what it was in your youth.",
    secenekler: [
      {
        metin: "Push yourself like in your youth.",
        basariliSonuc: {
          mesaj: "You did it! Your body can still respond like in the old days.",
          detay: "Will sometimes beats age.",
        },
        basarisizSonuc: {
          mesaj: "You overdid it and stayed bedridden for days.",
          detay: "The body sometimes overrules the will.",
        },
      },
      {
        metin: "Accept your age, slow down.",
        basariliSonuc: {
          mesaj: "Accepting your age was a more peaceful thing than you expected.",
          detay: "Wisdom is sometimes knowing your limits.",
        },
        basarisizSonuc: {
          mesaj: "Slowing down hurt your pride; you sighed, missing your old days.",
          detay: "Acceptance sometimes takes time.",
        },
      },
    ],
  },
  mirasin_ne_olacak: {
    baslik: "What Becomes of Your Legacy?",
    metin: "You can't help thinking about what you'll leave behind. The knowledge, wealth and experience you gathered over years — will they go with you?",
    secenekler: [
      {
        metin: "Pass your wealth and wisdom to someone young.",
        basariliSonuc: {
          mesaj: "The youth you chose listened to your teachings with full attention; knowing your legacy would live put you at ease.",
          detay: "The true legacy is knowledge more than gold.",
        },
        basarisizSonuc: {
          mesaj: "The person you chose abused your trust and wasted part of what you gave.",
          detay: "Not every trust is given to one who deserves it.",
        },
      },
      {
        metin: "Keep it for yourself, trust no one.",
        basariliSonuc: {
          mesaj: "You kept everything to yourself; the sense of security put you at ease.",
          detay: "Sometimes caution is a choice too.",
        },
        basarisizSonuc: {
          mesaj: "Your loneliness began to make you question the meaning of all you'd kept.",
          detay: "An unshared legacy sometimes loses its meaning.",
        },
      },
    ],
  },
  yasli_asker_son_nobet: {
    baslik: "The Last Watch",
    metin: "The commander asks, 'Would you stand watch one more time, one last time?' You're being asked to show a young soldier the way.",
    secenekler: [
      {
        metin: "Accept, put on your uniform one last time.",
        basariliSonuc: {
          mesaj: "What you taught the young soldier was knowledge that will save his life; you were full of pride.",
          detay: "Some watches last a lifetime.",
        },
        basarisizSonuc: {
          mesaj: "The cold night watch wore your body out too much.",
          detay: "An aging body doesn't give the old endurance.",
        },
      },
      {
        metin: "Decline politely, it's time to rest now.",
        basariliSonuc: {
          mesaj: "Your refusal was met with understanding; you chose the rest you deserve.",
          detay: "Someone who has served a lifetime has a right to rest.",
        },
        basarisizSonuc: {
          mesaj: "Some of the young ones met this with disappointment.",
          detay: "Not every retirement is applauded.",
        },
      },
    ],
  },
  yasli_tuccar_dukkani_devretmek: {
    baslik: "Handing Over the Shop",
    metin: "You wonder whether it's time to hand over the business you've poured effort into for years. A young assistant seems ready to take it over.",
    secenekler: [
      {
        metin: "Trust them, hand the business over.",
        basariliSonuc: {
          mesaj: "Your young assistant took over the business with great care; seeing your legacy continue made you proud.",
          detay: "Effort sometimes carries on in the best hands.",
        },
        basarisizSonuc: {
          mesaj: "The young assistant made some mistakes; a shadow fell on your years of reputation.",
          detay: "Not every handover goes flawlessly.",
        },
      },
      {
        metin: "No, keep the reins in your own hands.",
        basariliSonuc: {
          mesaj: "You kept running the business; habit gives you confidence.",
          detay: "For some people, work is life itself.",
        },
        basarisizSonuc: {
          mesaj: "Despite your age, carrying the whole weight of the business wore your body out.",
          detay: "Not letting go sometimes exacts a price.",
        },
      },
    ],
  },
  yasli_din_adami_son_vaaz: {
    baslik: "The Last Sermon",
    metin: "Your health isn't what it was and the congregation has invited you to the pulpit to give what may be your most important sermon. What you say could be remembered for many years.",
    secenekler: [
      {
        metin: "Share a lifetime of wisdom.",
        basariliSonuc: {
          mesaj: "Your words moved the congregation to tears; you gave a sermon that will be told for years.",
          detay: "The essence of a life can fit into a few sentences.",
        },
        basarisizSonuc: {
          mesaj: "Excitement and fatigue wore you out; you had to cut the sermon short.",
          detay: "The body sometimes can't keep up with the spirit's wish.",
        },
      },
      {
        metin: "Give a short, plain talk.",
        basariliSonuc: {
          mesaj: "Your plain words still came from the heart; the congregation was grateful.",
          detay: "Sometimes few words say much.",
        },
        basarisizSonuc: {
          mesaj: "You felt there was much you wanted to say but couldn't.",
          detay: "Some words, if not spoken in time, stay inside forever.",
        },
      },
    ],
  },
  derinlik_asker_agir_yara: {
    baslik: "Between the Swords",
    metin: "At the fiercest moment of the pitched battle, two enemy soldiers caught you in a pincer. Falling back stains your honor, but fighting to the end is very risky.",
    secenekler: [
      {
        metin: "Fall back, take cover behind your shield.",
        basariliSonuc: {
          mesaj: "You fell back in time; your shield protected you.",
          detay: "Surviving sometimes requires a step back.",
        },
        basarisizSonuc: {
          mesaj: "Even falling back you took a sword blow.",
          detay: "There is no safe corner on the battlefield.",
        },
      },
      {
        metin: "Fight to the end, stand against both.",
        basariliSonuc: {
          mesaj: "You bested them both; the unit welcomed you back like an epic hero.",
          detay: "This day will be remembered as the day your name became a legend on the battlefield.",
        },
        basarisizSonuc: {
          mesaj: "A sword blow left your arm useless; the surgeon couldn't save it.",
          detay: "You won't fight like you used to, but you're alive — and for today, that's enough.",
        },
      },
    ],
  },
  derinlik_asker_yakin_dovus: {
    baslik: "The Melee",
    metin: "Your unit is entering the close-combat line. The commander waits for your decision: will you fight in the front rank with both hands, or support from the back with a spear?",
    secenekler: [
      {
        metin: "Move to the front rank, wield your sword with both hands.",
        kilitAciklamasi: "Your body and your mind no longer allow it.",
        basariliSonuc: {
          mesaj: "The courage you showed in the front rank became the unit's morale.",
          detay: "No one dared to stand in front of you.",
        },
        basarisizSonuc: {
          mesaj: "The front rank exacted a heavy price; wounded but on your feet.",
          detay: "Your courage had a price.",
        },
      },
      {
        metin: "Stay in the back, support with a spear.",
        basariliSonuc: {
          mesaj: "Your support position held the unit's line.",
          detay: "Not every act of heroism has to be in the front rank.",
        },
        basarisizSonuc: {
          mesaj: "Even in the back, you took your share of the chaos of the clash.",
          detay: "There is no fully safe place on the battlefield.",
        },
      },
    ],
  },
  derinlik_asker_savas_travmasi: {
    baslik: "The End of the Siege",
    metin: "After a siege lasting weeks the city fell. What you saw in the streets showed you the ugliest face of war. Will these images stay with you?",
    secenekler: [
      {
        metin: "Suppress what you saw, carry on with your duty.",
        basariliSonuc: {
          mesaj: "You set aside what you saw and carried on with your duty.",
          detay: "Some soldiers can manage this, some only pretend to.",
        },
        basarisizSonuc: {
          mesaj: "What you saw shook you inside; the nights are no longer the same.",
          detay: "War sometimes wounds not the body but the mind — and that wound is invisible but deep.",
        },
      },
      {
        metin: "Step aside for a while, give yourself some leave.",
        basariliSonuc: {
          mesaj: "The time you gave yourself did you good; a few days later you came back stronger.",
          detay: "Being kind to yourself is not weakness.",
        },
        basarisizSonuc: {
          mesaj: "Your stepping back was counted weakness by some.",
          detay: "Not everyone meets emotional weight with the same understanding.",
        },
      },
    ],
  },
  derinlik_tuccar_lonca_ihanet: {
    baslik: "Turning Your Back on the Guild",
    metin: "You have a chance to break the guild's rules and make a very profitable deal secretly with a rival city. But if the guild finds out, it's counted a betrayal with no going back.",
    secenekler: [
      {
        metin: "Refuse the opportunity, stay loyal to the guild.",
        basariliSonuc: {
          mesaj: "You kept your loyalty; your place in the guild is solid.",
          detay: "Some opportunities aren't worth risking trust.",
        },
        basarisizSonuc: {
          mesaj: "You refused but the opportunity wouldn't leave your mind.",
          detay: "Some 'what ifs' linger a long time.",
        },
      },
      {
        metin: "Make the deal secretly.",
        basariliSonuc: {
          mesaj: "The deal went through unnoticed; your pocket swelled.",
          detay: "You were lucky this time, but this kind of luck doesn't last forever.",
        },
        basarisizSonuc: {
          mesaj: "Your betrayal came out; the guild threw you out of its doors forever.",
          detay: "The guild's protection and network are gone now; you have to run everything on your own.",
        },
      },
    ],
  },
  derinlik_din_papa_karsi_gelme: {
    baslik: "A Word Against the Church",
    metin: "You find a decision of the higher authorities to be against your conscience. To openly oppose it carries the risk of losing everything you have in the church.",
    secenekler: [
      {
        metin: "Stay silent, obey.",
        basariliSonuc: {
          mesaj: "You obeyed; your position is safe but there's a weight inside you.",
          detay: "Some silences pay a price, just an invisible one.",
        },
        basarisizSonuc: {
          mesaj: "Even though you obeyed, your conscience wouldn't leave you alone.",
          detay: "Some thoughts aren't easily silenced.",
        },
      },
      {
        metin: "Openly oppose it.",
        basariliSonuc: {
          mesaj: "Your courage drew attention; even some of the higher authorities quietly backed you.",
          detay: "Sometimes saying what you know is right wins you unexpected allies.",
        },
        basarisizSonuc: {
          mesaj: "Your opposition ended in excommunication; you have no place in official church circles anymore.",
          detay: "Your conscience is at ease, but you're on a completely different, far lonelier road now.",
        },
      },
    ],
  },
  derinlik_asker_krala_karsi: {
    baslik: "A Stand Against the King",
    metin: "The king gave an openly unjust and cruel order: the punishment of an innocent village. Your conscience wants you to oppose it but the price could be very heavy.",
    secenekler: [
      {
        metin: "Carry out the order quietly.",
        basariliSonuc: {
          mesaj: "You carried out the order; the king is pleased but your conscience will never be the same.",
          detay: "Some orders, even carried out, don't leave a person as they were.",
        },
        basarisizSonuc: {
          mesaj: "You carried out the order but the villagers' cries will break your sleep.",
          detay: "Some duties, even won, feel like a defeat.",
        },
      },
      {
        metin: "Openly refuse the order.",
        basariliSonuc: {
          mesaj: "Your refusal became an example of courage; some of your unit stood on your side.",
          detay: "Sometimes one person's courage emboldens others.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was reported to the king; you were officially declared 'the king's enemy'.",
          detay: "Your conscience is at peace, but you live a life where you could lose your head at any moment now.",
        },
      },
    ],
  },
  derinlik_tuccar_ipek_ticareti: {
    baslik: "Silk from Distant Lands",
    metin: "A caravan from the east brought silk of unmatched quality. If you put your whole fortune into this one shipment, either a legendary gain or a great loss awaits you.",
    secenekler: [
      {
        metin: "Put all your capital into the silk.",
        basariliSonuc: {
          mesaj: "The silk sold at an incredible price in the market; your name is now spoken among the richest merchants in the city.",
          detay: "People started calling you not just by your name but 'the Silk King'.",
        },
        basarisizSonuc: {
          mesaj: "Most of the silk fell prey to damp on the road; your investment was largely wasted.",
          detay: "Big dreams sometimes end in big losses.",
        },
      },
      {
        metin: "Buy a small amount, stay cautious.",
        basariliSonuc: {
          mesaj: "Your small investment brought a safe gain.",
          detay: "Caution isn't always the most exciting, but it's safe.",
        },
        basarisizSonuc: {
          mesaj: "Even your small investment didn't turn out as you'd hoped.",
          detay: "Some days the market's pulse slips away.",
        },
      },
    ],
  },
  derinlik_asker_destansi_zafer: {
    baslik: "An Epic Defense",
    metin: "Your small unit was tasked with defending a pass against a far larger enemy wave. This is a day that will go to legend or to oblivion.",
    secenekler: [
      {
        metin: "Defend the pass to the end.",
        basariliSonuc: {
          mesaj: "You held the pass by yourselves; the enemy finally fell back. This day became the stuff of epics.",
          detay: "The soldiers speak of you as 'Brave Heart' now.",
        },
        basarisizSonuc: {
          mesaj: "The pass fell but your resistance cost the enemy heavy losses.",
          detay: "Even a defeat can sometimes be honorable.",
        },
      },
      {
        metin: "Fall back in good order.",
        basariliSonuc: {
          mesaj: "You fell back; you reached the safe zone without losses.",
          detay: "Not every day has to be epic.",
        },
        basarisizSonuc: {
          mesaj: "There was a small skirmish during the retreat.",
          detay: "Even roads that look safe can carry risk.",
        },
      },
    ],
  },
  derinlik_din_mucize_sifa: {
    baslik: "A Hopeless Case",
    metin: "A patient the doctors gave up on was brought to you. You could try to give him hope with prayer and care, but the outcome isn't guaranteed.",
    secenekler: [
      {
        metin: "Don't leave his side day or night, pray.",
        basariliSonuc: {
          mesaj: "The patient recovered unexpectedly; the people told it as a miracle.",
          detay: "They call you 'the Healer' now; you just know you did what you could.",
        },
        basarisizSonuc: {
          mesaj: "Despite all your effort the patient couldn't be saved.",
          detay: "Some losses can't be prevented no matter how hard you try.",
        },
      },
      {
        metin: "Do what you can but don't give too much hope.",
        basariliSonuc: {
          mesaj: "Your measured approach did both the patient and you good.",
          detay: "You don't always have to be at the extreme.",
        },
        basarisizSonuc: {
          mesaj: "The patient couldn't be saved but you know you did what you could.",
          detay: "Peace of conscience is sometimes the only consolation.",
        },
      },
    ],
  },
  derinlik_soylu_olumu: {
    baslik: "A Moment of Fate",
    metin: "A dispute turned into a violent clash; the man across from you was the son of a powerful and populous noble family. Without meaning to, you caused his death.",
    secenekler: [
      {
        metin: "Try to hide it, stay silent.",
        basariliSonuc: {
          mesaj: "You managed to cover it up, but your conscience and the fear inside won't leave you.",
          detay: "Some secrets weigh on you even while they wait quietly.",
        },
        basarisizSonuc: {
          mesaj: "The truth came out quickly; the family has its eye on you now.",
          detay: "Some secrets spread faster the harder you try to hide them.",
        },
      },
      {
        metin: "Send word to the family openly, give an account.",
        basariliSonuc: {
          mesaj: "Your honesty softened the family a little; you reached a settlement by paying blood money.",
          detay: "Some accounts can be closed with money — but not all.",
        },
        basarisizSonuc: {
          mesaj: "Your honesty didn't soften the family; their anger only grew.",
          detay: "For some families no apology is ever enough.",
        },
      },
    ],
  },
  derinlik_kan_davasi_suikast: {
    baslik: "From the Dark of Night",
    metin: "Years later, the blood feud you thought you'd forgotten found you. In a dark alley an assassin attacked you.",
    secenekler: [
      {
        metin: "Fight back.",
        basariliSonuc: {
          mesaj: "You put the assassin out of action; the blood feud is finally closed.",
          detay: "A burden you carried on your shoulders for years ended tonight.",
        },
        basarisizSonuc: {
          mesaj: "You were badly wounded but the assassin fled too; at least the threat pulled back for a while.",
          detay: "You survived tonight, but the price was heavy.",
        },
      },
      {
        metin: "Flee, call for help.",
        basariliSonuc: {
          mesaj: "You managed to get away; afterward you reached a secret settlement with the family, and the blood feud closed.",
          detay: "Some battles can be won by running too.",
        },
        basarisizSonuc: {
          mesaj: "You were caught while fleeing; there was a short but violent clash, and the assassin finally gave up and left.",
          detay: "The blood feud still hangs over you like a shadow.",
        },
      },
    ],
  },
  derinlik_din_veba_bakimi: {
    baslik: "Among the Plague-Stricken",
    metin: "Plague is spreading in the city and there's no one left to care for the sick. Caring for them could expose you to the disease too, but with time your medical knowledge could give you immunity or a gift for healing.",
    secenekler: [
      {
        metin: "Tend the sick yourself, hone your techniques.",
        basariliSonuc: {
          mesaj: "After weeks of care you learned the finer points of treating the disease.",
          detay: "Now you don't just pray, you can really give healing.",
        },
        basarisizSonuc: {
          mesaj: "You fell ill too, but your body won the fight; you're immune to the plague now.",
          detay: "The hard ordeal you went through, strangely, made you stronger.",
        },
      },
      {
        metin: "Pray from a distance, don't take the risk.",
        basariliSonuc: {
          mesaj: "You prayed from a distance; you stayed safe.",
          detay: "Not every act of courage requires taking a risk.",
        },
        basarisizSonuc: {
          mesaj: "Your keeping away was criticized by some congregation members.",
          detay: "Not everyone expects the same measure of courage, though some do.",
        },
      },
    ],
  },
  derinlik_veba_salgini_ikinci_dalga: {
    baslik: "The Plague's Second Wave",
    metin: "The plague has picked up speed again. The hospital is overflowing, and helping hands have grown even fewer.",
    secenekler: [
      {
        metin: "Trust your immunity and help the sick freely.",
        kilitAciklamasi: "You have no immunity; approaching this freely would be far too risky.",
        basariliSonuc: {
          mesaj: "Thanks to your immunity you helped the sick fearlessly; the people saw you as a hero.",
          detay: "Your past pain now helps you save others.",
        },
        basarisizSonuc: {
          mesaj: "Your immunity protected you but exhaustion took over.",
          detay: "The body may be durable but the spirit can tire.",
        },
      },
      {
        metin: "Use your healer's knowledge to tend the sick.",
        kilitAciklamasi: "You do not know this technique.",
        basariliSonuc: {
          mesaj: "Thanks to your knowledge you healed many patients.",
          detay: "The techniques you learned served you exactly at a moment like this.",
        },
        basarisizSonuc: {
          mesaj: "Despite your knowledge this wave was even more merciless.",
          detay: "Not every knowledge can stop every disaster.",
        },
      },
      {
        metin: "Keep your distance, only pray.",
        basariliSonuc: {
          mesaj: "You kept your distance; you stayed safe.",
          detay: "Some days just surviving is enough.",
        },
        basarisizSonuc: {
          mesaj: "Staying safe disturbed you inside; you blamed yourself for not being able to help.",
          detay: "Some safe choices can trouble the conscience.",
        },
      },
    ],
  },
  derinlik_afyon_teklifi: {
    baslik: "A Painkilling Offer",
    metin: "After a hard period an acquaintance offers you opium extract to ease your pains. It's certainly soothing, but so is the risk of addiction.",
    secenekler: [
      {
        metin: "Try it once, you want relief.",
        basariliSonuc: {
          mesaj: "Your pain eased for a while; you felt lighter.",
          detay: "The relief is real but temporary.",
        },
        basarisizSonuc: {
          mesaj: "The relief felt so good you used it again and again. You can't easily give it up now.",
          detay: "The thing that eased your pain quietly turned into a new pain.",
        },
      },
      {
        metin: "Refuse, deal with the pain another way.",
        basariliSonuc: {
          mesaj: "You refused; you chose to deal with your pain by other means.",
          detay: "The hard road is often the more solid one.",
        },
        basarisizSonuc: {
          mesaj: "Refusing wasn't easy; your pain went on a while longer.",
          detay: "Some hardships are overcome without an escape.",
        },
      },
    ],
  },
  derinlik_bagimliliktan_kurtulma: {
    baslik: "A Moment of Awakening",
    metin: "Looking at yourself in the mirror, you saw what your addiction has made of you. Maybe it's time to change now.",
    secenekler: [
      {
        metin: "Fight your addiction with willpower.",
        basariliSonuc: {
          mesaj: "After a long and hellish struggle you got completely free of your addiction.",
          detay: "This is one of the hardest but most valuable victories you've won in life.",
        },
        basarisizSonuc: {
          mesaj: "You fought but couldn't withstand the withdrawal crises; you returned to your old habit in tears.",
          detay: "Some chains don't break on the first try.",
        },
      },
      {
        metin: "Put it off for now, leave it for another day.",
        basariliSonuc: {
          mesaj: "You decided to put off the change; maybe another day.",
          detay: "The right moment for some decisions may not have come yet.",
        },
        basarisizSonuc: {
          mesaj: "The decision to put it off left a dark unease inside you.",
          detay: "Sometimes putting things off carries its own weight.",
        },
      },
    ],
  },
  global_kitlik_baslangici: {
    baslik: "The Shadow of Drought",
    metin: "This year the rains came late and the crops burned. Signs heralding a famine are appearing in the region.",
    secenekler: [
      {
        metin: "Share your surplus with your neighbors.",
        basariliSonuc: {
          mesaj: "You shared what you had; the famine is beginning but at least your conscience is at ease.",
          detay: "Hard days are near, but you're not alone.",
        },
        basarisizSonuc: {
          mesaj: "Your sharing wasn't found enough; the famine is beginning.",
          detay: "A hard time is at the door.",
        },
      },
      {
        metin: "Protect your own stores, look after yourself first.",
        basariliSonuc: {
          mesaj: "You protected your own share; the famine is engulfing the region all the same.",
          detay: "Your selfishness will keep you a little safer.",
        },
        basarisizSonuc: {
          mesaj: "Your selfishness was noticed and your reputation was shaken.",
          detay: "Hard times bring out people's true faces.",
        },
      },
    ],
  },
  global_isyan_baslangici: {
    baslik: "Tension in the Streets",
    metin: "Anger at the taxes and the government has spilled into the streets. Small demonstrations may be the herald of a great revolt.",
    secenekler: [
      {
        metin: "Quietly turn a blind eye to the demonstrations, stay out of it.",
        basariliSonuc: {
          mesaj: "You stayed out of it; but the tension grew into a revolt.",
          detay: "Some storms can't be stopped, only waited out.",
        },
        basarisizSonuc: {
          mesaj: "Even out of it, you took your share of the chaos.",
          detay: "The streets aren't safe anymore.",
        },
      },
      {
        metin: "Warn the authorities, ask them to take precautions.",
        basariliSonuc: {
          mesaj: "Your warning was heeded; small measures calmed the tension for a while.",
          detay: "This time the disaster was postponed.",
        },
        basarisizSonuc: {
          mesaj: "Your warning wasn't heeded; the tension turned into a revolt.",
          detay: "Some warnings go unheard.",
        },
      },
    ],
  },
  global_altin_cag_baslangici: {
    baslik: "The Start of Abundance",
    metin: "A bountiful harvest, new trade routes and a peaceful period have all come together. The region seems to be entering an age of prosperity.",
    secenekler: [
      {
        metin: "Take your share of this bounty too.",
        basariliSonuc: {
          mesaj: "You joined in the bountiful period; the region is entering a golden age.",
          detay: "Some periods bring abundance to everyone.",
        },
        basarisizSonuc: {
          mesaj: "Though you couldn't fully make use of the opportunity, abundance is beginning across the region.",
          detay: "Not everyone benefits at the same pace.",
        },
      },
      {
        metin: "Be cautious, assume this abundance is temporary.",
        basariliSonuc: {
          mesaj: "Even staying cautious, the region is entering a golden age.",
          detay: "Some good times deserve to be met without caution.",
        },
        basarisizSonuc: {
          mesaj: "Your caution kept you from some opportunities.",
          detay: "Not everyone enjoys this abundance the same way.",
        },
      },
    ],
  },
  nemesis_fiyat_kirma: {
    baslik: "The Rival's Game",
    metin: "Just as you're on the verge of a deal with an important customer, {rakip} suddenly appears and announces he's cut his price to half of yours. The customer is now hesitating.",
    secenekler: [
      {
        metin: "Cut your price too, accept the fight.",
        basariliSonuc: {
          mesaj: "You kept the customer but your profit margin melted because of {rakip}.",
          detay: "You won this fight, but it cost you.",
        },
        basarisizSonuc: {
          mesaj: "The price war wore you out too, and the customer still went to {rakip}.",
          detay: "Some fights are doomed to be lost.",
        },
      },
      {
        metin: "Hold your price, put your quality forward.",
        basariliSonuc: {
          mesaj: "The customer appreciated your quality and didn't fall for {rakip}'s cheap game.",
          detay: "Sometimes it's not price but trust that wins.",
        },
        basarisizSonuc: {
          mesaj: "The customer was lured by the cheap price and went to {rakip}.",
          detay: "Not every customer cares about quality.",
        },
      },
    ],
  },
  nemesis_muhafiz_ihbari: {
    baslik: "The Rival's Report",
    metin: "{rakip} reported you to the guards for a small illegality — most of it exaggerated, some of it true. Now you have to answer for it.",
    secenekler: [
      {
        metin: "Tell the guards openly, speak the truth.",
        basariliSonuc: {
          mesaj: "Your honesty convinced the guards; {rakip}'s report came to nothing.",
          detay: "The truth is often the best defense.",
        },
        basarisizSonuc: {
          mesaj: "Your explanation wasn't found enough; you paid a small fine.",
          detay: "Some reports don't come to nothing entirely.",
        },
      },
      {
        metin: "Bribe the guards to close the matter.",
        basariliSonuc: {
          mesaj: "The bribe worked, the matter was closed.",
          detay: "Some problems can be hushed with money — but your conscience knows.",
        },
        basarisizSonuc: {
          mesaj: "Your bribe attempt was noticed; you lost both money and reputation.",
          detay: "Not every bribe stays hidden.",
        },
      },
    ],
  },
  kelebek_multeci_kurtarma: {
    baslik: "The Stranger by the Road",
    metin: "By the roadside you saw a stranger, hungry and worn out — a refugee fleeing war or famine. Helping him is a small expense, but your time is short.",
    secenekler: [
      {
        metin: "Give him food, provide shelter for a night.",
        basariliSonuc: {
          mesaj: "You helped the stranger; he went on his way without even asking your name.",
          detay: "Some kindnesses leave a mark somewhere, even if who they were for is forgotten.",
        },
        basarisizSonuc: {
          mesaj: "Your help was a little clumsy but you still held out your hand.",
          detay: "Intent sometimes means more than execution.",
        },
      },
      {
        metin: "Ignore it, carry on your way.",
        basariliSonuc: {
          mesaj: "You ignored it and carried on.",
          detay: "Some moments pass unnoticed.",
        },
        basarisizSonuc: {
          mesaj: "Ignoring it troubled you a little inside.",
          detay: "Some things ignored leave a mark on the conscience.",
        },
      },
    ],
  },
  kelebek_multeci_vali_donusu: {
    baslik: "A Familiar Face, a New Title",
    metin: "At the reception for the newly appointed governor, you realized he is that worn-out stranger you helped years ago. He recognized you too.",
    secenekler: [
      {
        metin: "Remind him, speak of the old days.",
        basariliSonuc: {
          mesaj: "The governor welcomed you warmly; your kindness years ago wasn't forgotten. He gave you a generous return.",
          detay: "Some kindnesses come back at the most unexpected time.",
        },
        basarisizSonuc: {
          mesaj: "The governor remembered you but the crowd intervened and the conversation was cut short.",
          detay: "Some opportunities can't quite be grasped, yet they remain a warm memory.",
        },
      },
      {
        metin: "Stay humble, ask for nothing.",
        basariliSonuc: {
          mesaj: "You withdrew without asking for anything; the governor didn't forget this humility, and your name was spoken well of.",
          detay: "Sometimes the best return is expecting no return.",
        },
        basarisizSonuc: {
          mesaj: "Your withdrawing wasn't even noticed.",
          detay: "Not every act of humility is noticed, but it's valuable all the same.",
        },
      },
    ],
  },
  istihbarat_dedikoducu: {
    baslik: "A Well-Connected Gossip",
    metin: "A gossip you know at the tavern says he can leak you 'inside information' about an upcoming event — for a price, of course.",
    secenekler: [
      {
        metin: "Buy the information.",
        basariliSonuc: {
          mesaj: "The gossip gave you clear information about the next opportunity.",
          detay: "You'll make your decision looking at a clearer picture now.",
        },
        basarisizSonuc: {
          mesaj: "The gossip took the money but what he said wasn't much use.",
          detay: "Not every source of information is reliable.",
        },
      },
      {
        metin: "Take no interest, trust your own instincts.",
        basariliSonuc: {
          mesaj: "You refused the offer, chose to trust your own instincts.",
          detay: "Sometimes your own gut is the best guide.",
        },
        basarisizSonuc: {
          mesaj: "You refused but afterward you couldn't help wondering.",
          detay: "Curiosity sometimes won't let go.",
        },
      },
    ],
  },
  efsanevi_olum_kuyu: {
    baslik: "The Pit You Dug Yourself",
    metin: "A well you've been digging in your garden for a long time is nearly done. You want to strike one last blow this evening, though it's gotten dark.",
    secenekler: [
      {
        metin: "Keep going even in the dark.",
        basariliSonuc: {
          mesaj: "You finished the well even in the dark; finding water was talked about in the village.",
          detay: "Your persistence was rewarded this time.",
        },
        basarisizSonuc: {
          mesaj: "In the dark your foot slipped and you fell into the well you dug yourself.",
          detay: "The villagers will tell this story for years — an instructive, slightly comic end.",
        },
      },
      {
        metin: "Wait for daylight, do it in the morning.",
        basariliSonuc: {
          mesaj: "You waited for morning; the well was safely finished the next day.",
          detay: "Patience is sometimes the wisest choice.",
        },
        basarisizSonuc: {
          mesaj: "The wait annoyed you but you were safe.",
          detay: "Some impatience isn't free of cost.",
        },
      },
    ],
  },
  efsanevi_olum_keci_kovalama: {
    baslik: "The Runaway Goat",
    metin: "Your most stubborn goat snapped its rope and bolted into the middle of town. You were the one who ran after it, but the goat is dragging you into the busiest part of the market square.",
    secenekler: [
      {
        metin: "Chase it at full speed, try to catch it.",
        basariliSonuc: {
          mesaj: "You caught the goat to a big round of applause; the town talked about it for days.",
          detay: "Some victories are small but unforgettable.",
        },
        basarisizSonuc: {
          mesaj: "While chasing the goat you burst into the street and were run over by a fast-approaching caravan cart.",
          detay: "The townsfolk will tell this unlucky but equally comic end for years.",
        },
      },
      {
        metin: "Give up, leave the goat to its own devices.",
        basariliSonuc: {
          mesaj: "You gave up chasing the goat; someone found it and brought it to you.",
          detay: "Sometimes giving up works too.",
        },
        basarisizSonuc: {
          mesaj: "You never saw the goat again.",
          detay: "Some losses are small but sad all the same.",
        },
      },
    ],
  },
  din_katolik_gunah_cikarma: {
    baslik: "Confession",
    metin: "The priest called you to the confession box. Pouring your heart out can bring peace, but some of your secrets might slip out too.",
    secenekler: [
      {
        metin: "Tell everything as it is.",
        basariliSonuc: {
          mesaj: "Pouring your heart out lifted a great weight; for the first time in days you slept easy.",
          detay: "The priest swore to carry your secret to the grave.",
        },
        basarisizSonuc: {
          mesaj: "The priest let it slip; what you said reached one or two people.",
          detay: "Some secrets can leak even from the confession pulpit, it seems.",
        },
      },
      {
        metin: "Keep it superficial, hide your real sin.",
        basariliSonuc: {
          mesaj: "You attended the service but the real weight stayed inside you.",
          detay: "Telling some things only to yourself isn't enough.",
        },
        basarisizSonuc: {
          mesaj: "The priest sensed you were hiding something and gave you a strange look.",
          detay: "Half-truths are sometimes more unsettling than a full lie.",
        },
      },
      {
        metin: "Instead of your own sin, whisper the secret the priest is hiding.",
        basariliSonuc: {
          mesaj: "You whispered that you knew about the priest's dirty dealings with that wine merchant. He gave you the church's alms box as hush money.",
          detay: "You managed to play the devil's advocate even in a holy place.",
        },
        basarisizSonuc: {
          mesaj: "The priest shouted in anger and threatened to excommunicate you. You had to leave the church.",
        },
      },
    ],
  },
  din_katolik_hac_daveti: {
    baslik: "An Invitation to the Holy Land",
    metin: "A pilgrim caravan is setting out for the holy land; joining is both costly and dangerous but promises a great spiritual transformation.",
    secenekler: [
      {
        metin: "Join the caravan, set out.",
        basariliSonuc: {
          mesaj: "You reached the holy land; when you returned you were a different person.",
          detay: "Even your voice changes when you tell of this journey.",
        },
        basarisizSonuc: {
          mesaj: "The road made you ill; you had to turn back halfway.",
          detay: "Some journeys teach you something even without being finished.",
        },
      },
      {
        metin: "Don't join, stay with your congregation.",
        basariliSonuc: {
          mesaj: "You chose to stay home; the caravan set out without you.",
          detay: "Maybe another year.",
        },
        basarisizSonuc: {
          mesaj: "As you watched the caravan leave you felt a faint regret inside.",
          detay: "Some opportunities don't come again.",
        },
      },
    ],
  },
  din_ortodoks_ikona_mucizesi: {
    baslik: "Before the Icon",
    metin: "The old icon in the church is said to work miracles. Kneeling before it and making a wish is something most of the people do.",
    secenekler: [
      {
        metin: "Kneel, pray sincerely.",
        basariliSonuc: {
          mesaj: "The peace that filled you as you prayed lasted for days.",
          detay: "You don't know whether the miracle is real, but what you felt was real.",
        },
        basarisizSonuc: {
          mesaj: "You didn't find the peace you expected; an emptiness stayed inside you.",
          detay: "Some days even faith isn't enough.",
        },
      },
      {
        metin: "Wait for night and steal the votive gold!",
        basariliSonuc: {
          mesaj: "You hid the gold in your robe without anyone seeing. You left the church a rich man.",
          detay: "You stole God's money. Your conscience has gone completely blind.",
        },
        basarisizSonuc: {
          mesaj: "The priest caught you red-handed! You were disgraced before the whole church and excommunicated.",
          detay: "Your name is spoken with the devil's now.",
        },
      },
      {
        metin: "Watch from a distance, don't take part.",
        basariliSonuc: {
          mesaj: "You chose to stay outside the rite and watched the crowd.",
          detay: "Not everyone's way of believing is the same.",
        },
        basarisizSonuc: {
          mesaj: "Some of your neighbors noticed your distance and whispered behind your back.",
          detay: "Not being seen in the congregation sometimes exacts a price.",
        },
      },
    ],
  },
  din_ortodoks_buyuk_perhiz: {
    baslik: "The Great Fast",
    metin: "The long fasting weeks have begun; meat, milk and eggs are forbidden. Your neighbor secretly invited you to a plate of meat, 'no one will see' he says.",
    secenekler: [
      {
        metin: "Turn down the invitation, keep the fast.",
        basariliSonuc: {
          mesaj: "You kept the fast fully; you began to be spoken of in the congregation as 'strong in faith'.",
          detay: "Going hungry is sometimes a matter of pride.",
        },
        basarisizSonuc: {
          mesaj: "Refusing wasn't easy; your hunger made you irritable.",
          detay: "Willpower sometimes comes out weaker than your stomach.",
        },
      },
      {
        metin: "Slip off to the invitation, eat a plate of meat.",
        basariliSonuc: {
          mesaj: "You filled your belly without anyone seeing; your conscience stung a little but the plate was empty.",
          detay: "Some sins are at least tasty.",
        },
        basarisizSonuc: {
          mesaj: "The priest caught you eating meat right at the door; word spread through the whole neighborhood.",
          detay: "The nickname 'Fast-Breaker' won't leave you alone for a while.",
        },
      },
    ],
  },
  din_sunni_cuma_hutbesi: {
    baslik: "The Friday Sermon",
    metin: "The imam's sermon is longer than usual today; you're sitting in the front rows and your eyes are getting heavy.",
    secenekler: [
      {
        metin: "Pinch yourself, gather your attention.",
        basariliSonuc: {
          mesaj: "You sat upright to the end; after the talk the imam praised you.",
          detay: "Some victories are just staying awake.",
        },
        basarisizSonuc: {
          mesaj: "Despite your resistance your eyes closed for a few seconds; nobody noticed, probably.",
          detay: "Sleep sometimes comes out stronger than willpower.",
        },
      },
      {
        metin: "Let yourself go, let your eyes close.",
        basariliSonuc: {
          mesaj: "You caught a little nap; nobody noticed.",
          detay: "Sometimes you take a risk and win.",
        },
        basarisizSonuc: {
          mesaj: "Your snoring echoed through the mosque; everyone turned to look at you.",
          detay: "This story will be told in the neighborhood for a long time.",
        },
      },
    ],
  },
  din_sunni_zekat_zamani: {
    baslik: "Time for Alms",
    metin: "Your yearly alms time has come. Setting aside part of your savings for the needy is both a religious duty and a matter of conscience.",
    secenekler: [
      {
        metin: "Give generously, don't count it.",
        basariliSonuc: {
          mesaj: "What you gave was just enough to get a family through the winter.",
          detay: "Even a kindness no one knows about warms you inside.",
        },
        basarisizSonuc: {
          mesaj: "You gave, but you never learned who received the money.",
          detay: "Some kindnesses go unanswered; so be it.",
        },
      },
      {
        metin: "Give the minimum amount, keep the rest.",
        basariliSonuc: {
          mesaj: "You did your duty and didn't touch the rest.",
          detay: "You followed the rules; at least this much is enough, you told yourself.",
        },
        basarisizSonuc: {
          mesaj: "Your neighbors noticed how little you gave and talked behind your back.",
          detay: "Generosity sometimes turns into a matter of show.",
        },
      },
    ],
  },
  din_anglikan_kilise_cayi: {
    baslik: "Church Tea",
    metin: "After the Sunday service the congregation, as always, drinks tea from little cups and pries into each other's affairs. This week the subject is you.",
    secenekler: [
      {
        metin: "Join the conversation, defend yourself.",
        basariliSonuc: {
          mesaj: "In a jokey tone you turned the situation around; everyone laughed and dropped the subject.",
          detay: "Behind English politeness there lies a strong sense of humor, it seems.",
        },
        basarisizSonuc: {
          mesaj: "Your defense had the opposite effect and the gossip grew.",
          detay: "Some cups of tea make some people's lives harder.",
        },
      },
      {
        metin: "Drink your tea quietly, act like you don't hear.",
        basariliSonuc: {
          mesaj: "You sat quietly and finished your tea; the gossip died out on its own.",
          detay: "Sometimes the best answer is not to answer.",
        },
        basarisizSonuc: {
          mesaj: "Your silence looked to some like 'admitting the fault'.",
          detay: "Church tea is sometimes no different from a courtroom.",
        },
      },
    ],
  },
  din_anglikan_piskopos_ziyareti: {
    baslik: "The Bishop's Visit",
    metin: "The regional bishop will attend the service; making a good impression could open doors in your social circle.",
    secenekler: [
      {
        metin: "Prepare carefully, meet the bishop.",
        basariliSonuc: {
          mesaj: "The bishop had a short but warm chat with you; your name is spoken of in his circle now.",
          detay: "Small moments like this sometimes open big doors.",
        },
        basarisizSonuc: {
          mesaj: "Your preparation went to waste; the bishop didn't even notice you.",
          detay: "Some investments go unrewarded.",
        },
      },
      {
        metin: "Blend into the crowd, don't stand out.",
        basariliSonuc: {
          mesaj: "You attended the service as an ordinary congregation member.",
          detay: "You don't have to chase every opportunity.",
        },
        basarisizSonuc: {
          mesaj: "Seeing others meet the bishop, you felt a faint jealousy.",
          detay: "Missed opportunities stick in the mind more.",
        },
      },
    ],
  },
  asker_kucuk_baskin_ganimeti: {
    baslik: "A Small Raid",
    metin: "On patrol you ran into a small band of brigands; after a short clash the spoils you seized are being divided among you.",
    secenekler: [
      {
        metin: "Join the fight bravely.",
        basariliSonuc: {
          mesaj: "With your share of the spoils your pocket swelled a bit; the commander noticed you too.",
          detay: "Small victories count too.",
        },
        basarisizSonuc: {
          mesaj: "You took a scratch in the fight and not much fell to your share.",
          detay: "Not every raid turns a profit.",
        },
      },
      {
        metin: "Stay back, keep lookout.",
        basariliSonuc: {
          mesaj: "You did your lookout duty well; a small share was set aside for you too.",
          detay: "You don't always have to be in the front rank.",
        },
        basarisizSonuc: {
          mesaj: "Staying back wasn't well received by some of your comrades.",
          detay: "Some choices are quietly judged.",
        },
      },
    ],
  },
  dinadami_minnettar_ziyaretci: {
    baslik: "A Grateful Visitor",
    metin: "A congregation member whose troubles you listened to last month came to your door with a small gift to show his gratitude.",
    secenekler: [
      {
        metin: "Accept the gift gladly.",
        basariliSonuc: {
          mesaj: "The small gift felt like a return for the effort you'd given.",
          detay: "Sometimes the smallest gestures carry the most worth.",
        },
        basarisizSonuc: {
          mesaj: "The gift was modest but the thought was kind.",
          detay: "It doesn't always have to be big.",
        },
      },
      {
        metin: "Decline politely, say you helped without expecting anything.",
        basariliSonuc: {
          mesaj: "Your refusal spread through the congregation; you became known for your humility.",
          detay: "Some kinds of standing can't be bought with money.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was taken a bit strangely; the visitor left embarrassed.",
          detay: "Sometimes even good will can be misunderstood.",
        },
      },
    ],
  },
  sehir_yonetim_asker_baslangic: {
    baslik: "A Power Above the Army",
    metin: "They are choosing who will manage the city's defense budget; a rival general is after the same seat. If you win, you'll have a say not only over the army but over the city's economy too.",
    secenekler: [
      {
        metin: "Enter the contest, aim for the seat.",
        basariliSonuc: {
          mesaj: "You left the rival general behind; part of the city's defense budget is in your hands now.",
          detay: "Being a commander is no longer an end but the start of a new race.",
        },
        basarisizSonuc: {
          mesaj: "The rival general won this round, but the race isn't over; your name is known in this circle now.",
          detay: "Your first try failed but you're in the game now.",
        },
      },
      {
        metin: "Refuse, be content with your command.",
        basariliSonuc: {
          mesaj: "You turned the offer down; you chose to be content with your current position.",
          detay: "Maybe another day you'll change your mind.",
        },
        basarisizSonuc: {
          mesaj: "You regretted your refusal a little; the rival general took the seat without you.",
          detay: "Some opportunities don't come again the same way.",
        },
      },
    ],
  },
  sehir_yonetim_tuccar_baslangic: {
    baslik: "Beyond the Guild",
    metin: "Guild mastery is no longer a ceiling for you but a start. A seat has come free on the city's trade council; a rival merchant is after the same seat. If you win, you'll run not just your own business but a part of the city's economy.",
    secenekler: [
      {
        metin: "Enter the contest, aim for the seat.",
        basariliSonuc: {
          mesaj: "You left the rival merchant behind; you have a voice on the city's trade council now.",
          detay: "Guild mastery is no longer an end but the start of a new race.",
        },
        basarisizSonuc: {
          mesaj: "The rival merchant won this round, but the race isn't over; your name is known on the council now.",
          detay: "Your first try failed but you're in the game now.",
        },
      },
      {
        metin: "Refuse, be content with your existing business.",
        basariliSonuc: {
          mesaj: "You turned the offer down; you chose to be content with your current position.",
          detay: "Maybe another day you'll change your mind.",
        },
        basarisizSonuc: {
          mesaj: "You regretted your refusal a little; the rival merchant took the seat without you.",
          detay: "Some opportunities don't come again the same way.",
        },
      },
    ],
  },
  sehir_yonetim_dinadami_baslangic: {
    baslik: "Beyond the Pulpit",
    metin: "Being head priest is no longer a ceiling for you but a start. There's a debate over who will run the city's great endowments; a rival priest is after the same office. If you win, you'll run not just the congregation but a part of the city's economy too.",
    secenekler: [
      {
        metin: "Enter the contest, aim for the office.",
        basariliSonuc: {
          mesaj: "You left the rival priest behind; you have a voice in the city's great endowments now.",
          detay: "Being head priest is no longer an end but the start of a new race.",
        },
        basarisizSonuc: {
          mesaj: "The rival priest won this round, but the race isn't over; your name is known in the assembly now.",
          detay: "Your first try failed but you're in the game now.",
        },
      },
      {
        metin: "Refuse, be content with your pulpit.",
        basariliSonuc: {
          mesaj: "You turned the offer down; you chose to be content with your current position.",
          detay: "Maybe another day you'll change your mind.",
        },
        basarisizSonuc: {
          mesaj: "You regretted your refusal a little; the rival priest took the office without you.",
          detay: "Some opportunities don't come again the same way.",
        },
      },
    ],
  },
  sehir_yonetim_asker_savunma_butcesi: {
    baslik: "The Defense Budget Fight",
    metin: "This year's split of the city's defense budget is up for review again; the rival general is doing all he can to enlarge his share.",
    secenekler: [
      {
        metin: "Fight on the council to enlarge your share.",
        basariliSonuc: {
          mesaj: "You managed to steer most of the budget to your own troops.",
          detay: "The rival general will keep watching you, but you won this round.",
        },
        basarisizSonuc: {
          mesaj: "The rival general won this round; your share shrank.",
          detay: "The race isn't over yet.",
        },
      },
      {
        metin: "Blackmail him with exposing the rival general's secrets.",
        basariliSonuc: {
          mesaj: "Using the general's weak point you cornered him. Nearly the whole budget was transferred to you.",
          detay: "Politics is sometimes sharper than the sword.",
        },
        basarisizSonuc: {
          mesaj: "Your blackmail backfired! The general ambushed you and had his men beat you. You lost the budget entirely.",
        },
      },
      {
        metin: "Pull back, build up strength.",
        basariliSonuc: {
          mesaj: "This time you chose to stay in the background.",
          detay: "Patience is sometimes the best strategy.",
        },
        basarisizSonuc: {
          mesaj: "Your staying back disappointed some of your supporters.",
          detay: "You don't always have to be watching.",
        },
      },
    ],
  },
  sehir_yonetim_asker_sinir_kampanyasi: {
    baslik: "A Border Expansion Campaign",
    metin: "Leadership of the campaign to secure the city's border trade routes is under debate; this means both a military and an economic victory.",
    secenekler: [
      {
        metin: "Take on leadership of the campaign.",
        basariliSonuc: {
          mesaj: "The campaign ended successfully; the border trade routes are under your watch now.",
          detay: "Your share in the city's economy keeps growing.",
        },
        basarisizSonuc: {
          mesaj: "The campaign went harder than expected; you came back with losses.",
          detay: "Build up your strength for the next opportunity.",
        },
      },
      {
        metin: "Leave it to someone else, don't take the risk.",
        basariliSonuc: {
          mesaj: "You left the leadership to someone else.",
          detay: "You don't have to win every battle.",
        },
        basarisizSonuc: {
          mesaj: "Watching the campaign's success from a distance, you felt a faint regret.",
          detay: "Some opportunities don't come again.",
        },
      },
    ],
  },
  sehir_yonetim_tuccar_ticaret_yollari: {
    baslik: "New Trade Routes",
    metin: "There's a vote on the council for the concession on the city's newly opened trade route; the rival merchant is after the same concession.",
    secenekler: [
      {
        metin: "Lobby aggressively for the concession.",
        basariliSonuc: {
          mesaj: "You won the concession; the new trade route runs with your caravans now.",
          detay: "Your share in the city's economy keeps growing.",
        },
        basarisizSonuc: {
          mesaj: "The rival merchant won the concession; the effort you put in went to waste.",
          detay: "The race isn't over yet.",
        },
      },
      {
        metin: "Pull back this time.",
        basariliSonuc: {
          mesaj: "You chose not to go for this concession.",
          detay: "You don't have to chase every opportunity.",
        },
        basarisizSonuc: {
          mesaj: "Hearing your rival won, you were resentful.",
          detay: "Some opportunities don't come again.",
        },
      },
    ],
  },
  sehir_yonetim_tuccar_vergi_imtiyazi: {
    baslik: "The Tax Collection Concession",
    metin: "The concession to collect the city's market taxes went to tender again this year; the rival merchant is preparing a bid.",
    secenekler: [
      {
        metin: "Bid high, snatch the concession.",
        basariliSonuc: {
          mesaj: "You won the tender; the market's tax income is in your hands to a degree now.",
          detay: "Your share in the city's economy keeps growing.",
        },
        basarisizSonuc: {
          mesaj: "The rival merchant won the tender; your bid went to waste.",
          detay: "The race isn't over yet.",
        },
      },
      {
        metin: "Offer to collect taxes by strong-arming.",
        basariliSonuc: {
          mesaj: "The council quietly approved your offer. With your club-carrying men you collected the taxes mercilessly.",
          detay: "The people hate you but your strongbox has never been so full.",
        },
        basarisizSonuc: {
          mesaj: "The council didn't dare go this far and left you out of the tender.",
        },
      },
      {
        metin: "Don't enter the tender.",
        basariliSonuc: {
          mesaj: "You chose not to enter this tender.",
          detay: "You don't have to chase every opportunity.",
        },
        basarisizSonuc: {
          mesaj: "Hearing your rival won, you were resentful.",
          detay: "Some opportunities don't come again.",
        },
      },
    ],
  },
  sehir_yonetim_dinadami_vakif_yonetimi: {
    baslik: "Running the Great Endowment",
    metin: "A seat has come free on the board of the city's largest religious endowment; the rival priest is after the same seat.",
    secenekler: [
      {
        metin: "Fight for the seat.",
        basariliSonuc: {
          mesaj: "You won the seat; the endowment's resources are partly under your watch now.",
          detay: "Your share in the city's economy keeps growing.",
        },
        basarisizSonuc: {
          mesaj: "The rival priest won the seat; your effort went to waste.",
          detay: "The race isn't over yet.",
        },
      },
      {
        metin: "Pull back this time.",
        basariliSonuc: {
          mesaj: "You chose not to go for this seat.",
          detay: "You don't have to chase every opportunity.",
        },
        basarisizSonuc: {
          mesaj: "Hearing your rival won, you were resentful.",
          detay: "Some opportunities don't come again.",
        },
      },
    ],
  },
  sehir_yonetim_dinadami_kutsal_emanet: {
    baslik: "Guardianship of the Holy Relic",
    metin: "There's a debate over the guardianship of a valuable holy relic brought to the city; this title means both great influence and a great source of income. The rival priest wants this title too.",
    secenekler: [
      {
        metin: "Step forward for the guardianship.",
        basariliSonuc: {
          mesaj: "The guardianship was given to you; pilgrims flock to your pulpit now.",
          detay: "Your share in the city's economy keeps growing.",
        },
        basarisizSonuc: {
          mesaj: "The title was given to the rival priest; your effort went to waste.",
          detay: "The race isn't over yet.",
        },
      },
      {
        metin: "Pull back this time.",
        basariliSonuc: {
          mesaj: "You chose not to go for this title.",
          detay: "You don't have to chase every opportunity.",
        },
        basarisizSonuc: {
          mesaj: "Hearing your rival won, you were resentful.",
          detay: "Some opportunities don't come again.",
        },
      },
    ],
  },
  saray_kral_daveti: {
    baslik: "An Invitation from the King",
    metin: "An unexpected messenger knocked on your door: your name and fame have reached the king. You are invited to the palace in person.",
    secenekler: [
      {
        metin: "Accept the invitation with honor.",
        basariliSonuc: {
          mesaj: "You came before the king; you're now someone spoken of with respect in palace circles.",
          detay: "This invitation is a moment you'll tell of your whole life.",
        },
        basarisizSonuc: {
          mesaj: "Your words got a little tangled from nerves but you were still admitted to the palace.",
          detay: "It wasn't perfect but it was an unforgettable day.",
        },
      },
      {
        metin: "Humbly decline, carry on your own life.",
        basariliSonuc: {
          mesaj: "You politely turned the invitation down; no one pressed too hard.",
          detay: "You chose to carry on your ordinary life.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was read at the palace as 'insolence'; your name was spoken ill of for a while.",
          detay: "Saying no to the king had a price.",
        },
      },
    ],
  },
  saray_ic_entrika: {
    baslik: "A Palace Intrigue",
    metin: "An influential noble pulled you aside and asked for your help to make a rival look bad to the king. In return he promises a great favor.",
    secenekler: [
      {
        metin: "Join the intrigue, carry out the plan.",
        basariliSonuc: {
          mesaj: "The plan worked; the noble owes you now, the rival fell from favor.",
          detay: "At the palace, power is sometimes gained this way.",
        },
        basarisizSonuc: {
          mesaj: "The intrigue came out; it was understood you had a hand in it, and your reputation was damaged.",
          detay: "Palace intrigues can burn anyone.",
        },
      },
      {
        metin: "Decline politely, stay out of it.",
        basariliSonuc: {
          mesaj: "You politely turned the offer down; your hands stayed clean.",
          detay: "Not everyone at the palace has to get mixed up in intrigue.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal didn't please the noble; he started being cold toward you.",
          detay: "Some refusals are paid for quietly.",
        },
      },
    ],
  },
  saray_balosu: {
    baslik: "The Royal Ball",
    metin: "You were invited to one of the palace's most magnificent balls. Making a good impression could carry you a step ahead in palace circles.",
    secenekler: [
      {
        metin: "Move to the center, meet everyone.",
        basariliSonuc: {
          mesaj: "Your grace and your conversation were talked about in the ballroom; everyone wanted to meet you.",
          detay: "In one night you became known in palace circles.",
        },
        basarisizSonuc: {
          mesaj: "A clumsy moment of yours happened in front of everyone; it was joked about for a while.",
          detay: "At the palace even small mistakes echo loud.",
        },
      },
      {
        metin: "Stay at the edge, don't draw attention.",
        basariliSonuc: {
          mesaj: "You were content to watch the ball from the edge.",
          detay: "You don't have to shine every night.",
        },
        basarisizSonuc: {
          mesaj: "Your staying at the edge was noticed; you were called 'dull'.",
          detay: "Sometimes not being seen exacts a price too.",
        },
      },
      {
        metin: "Chat with the foreign envoys in their own languages.",
        basariliSonuc: {
          mesaj: "You chatted with the foreign envoys in their own languages, well versed in their customs; the salon watched you in astonishment.",
          detay: "The bonds you built over years with people from different worlds served you exactly tonight.",
        },
        basarisizSonuc: {
          mesaj: "The conversation didn't flow as well as you'd hoped, but the envoys still listened to you with respect.",
          detay: "The bonds you built with people from different worlds don't always give a perfect result, but they get noticed.",
        },
      },
    ],
  },
  saray_dedikodu: {
    baslik: "Palace Gossip",
    metin: "From a servant you learned of a secret affair of one of the palace's most powerful families. This information is both dangerous and valuable.",
    secenekler: [
      {
        metin: "Sell the information to the right person for a gain.",
        basariliSonuc: {
          mesaj: "You got a fine reward for the information; no one suspected you.",
          detay: "Trading in secrets has always existed at the palace.",
        },
        basarisizSonuc: {
          mesaj: "Your source became known; no one speaks freely around you at the palace anymore.",
          detay: "Once trust is broken it's hard to repair.",
        },
      },
      {
        metin: "Share the secret with no one, try to forget it.",
        basariliSonuc: {
          mesaj: "You decided to forget what you heard; you told no one anything.",
          detay: "Some secrets aren't worth carrying.",
        },
        basarisizSonuc: {
          mesaj: "You kept the secret but curiosity troubled you for a while.",
          detay: "Knowing is sometimes a burden.",
        },
      },
    ],
  },
  saray_av_daveti: {
    baslik: "The King's Hunt Invitation",
    metin: "The king is going on a great hunt with the palace notables and invites you too. Joining is prestigious but not without danger.",
    secenekler: [
      {
        metin: "Join the hunt, take the risk.",
        basariliSonuc: {
          mesaj: "The courage you showed on the hunt caught the king's eye; you took your share of the game too.",
          detay: "The king said he'd invite you again.",
        },
        basarisizSonuc: {
          mesaj: "You had a bad accident during the hunt; you were embarrassed in front of everyone.",
          detay: "Some hunts don't go as planned.",
        },
      },
      {
        metin: "Politely give an excuse, don't join.",
        basariliSonuc: {
          mesaj: "Your excuse was accepted; you had a safe day.",
          detay: "You don't have to run to every invitation.",
        },
        basarisizSonuc: {
          mesaj: "For not joining, you felt shut out by some circles.",
          detay: "It's easy to be talked about behind your back at the palace.",
        },
      },
    ],
  },
  saray_suikast_duyumu: {
    baslik: "A Dark Rumor",
    metin: "From a conversation you overheard by chance, you understood a plot is being prepared against the king. You must choose carefully what to do with this information.",
    secenekler: [
      {
        metin: "Report it to the king or his guards.",
        basariliSonuc: {
          mesaj: "Your report turned out true; you were spoken of as the one who saved the king's life.",
          detay: "This will be the greatest thing said of you at the palace.",
        },
        basarisizSonuc: {
          mesaj: "Your rumor turned out baseless; you were humiliated for creating a panic for nothing.",
          detay: "Some voices are misheard.",
        },
      },
      {
        metin: "Stay out of it, keep silent.",
        basariliSonuc: {
          mesaj: "You told no one what you heard; the matter was resolved without your involvement or never happened.",
          detay: "Sometimes not knowing is more comfortable.",
        },
        basarisizSonuc: {
          mesaj: "The plot happened; your silence gnawed at you for a long time.",
          detay: "You understand now that silence has a price.",
        },
      },
    ],
  },
  saray_mutfak_kazasi: {
    baslik: "A Small Accident at the Feast",
    metin: "At a great palace feast, a flustered servant spilled hot soup on you. The whole hall is looking at you now.",
    secenekler: [
      {
        metin: "Laugh it off, ease the mood.",
        basariliSonuc: {
          mesaj: "Laughing at yourself, you turned it into a joke; the hall talked about your composure.",
          detay: "Sometimes the best impression comes not from perfection but from grace.",
        },
        basarisizSonuc: {
          mesaj: "Your smile came out forced; a few people whispered behind your back.",
          detay: "Not every accident turns into a joke.",
        },
      },
      {
        metin: "Get angry, scold the servant.",
        basariliSonuc: {
          mesaj: "Your anger was found justified, the servant apologized.",
          detay: "Some thought you were in the right.",
        },
        basarisizSonuc: {
          mesaj: "Your sharp reaction was spoken of as 'cruel'; a few people began to keep their distance.",
          detay: "A small accident turned into a stain on your reputation.",
        },
      },
    ],
  },
  oc_kervan_katilma_karari: {
    baslik: "A Caravan to Distant Lands",
    metin: "A great trade caravan is setting out from the city for distant lands. Joining could be both dangerous and a great opportunity.",
    secenekler: [
      {
        metin: "Join the caravan, set out.",
        basariliSonuc: {
          mesaj: "You packed your goods and joined the caravan; the months ahead will pass on dusty roads.",
          detay: "This journey will change you; it'll either make you rich or teach you a great deal.",
        },
        basarisizSonuc: {
          mesaj: "Your preparations were rushed but you still joined the caravan.",
          detay: "You'll pay for setting out on this road unprepared.",
        },
      },
      {
        metin: "Don't join, stay in the city.",
        basariliSonuc: {
          mesaj: "You chose to stay in the city; the caravan set out without you.",
          detay: "Maybe another caravan will come another day.",
        },
        basarisizSonuc: {
          mesaj: "As you watched the caravan's dust from a distance you felt a regret inside.",
          detay: "Some opportunities don't come again the same way.",
        },
      },
    ],
  },
  oc_kervan_soygun_riski: {
    baslik: "Ambush in the Desert",
    metin: "The caravan fell into a bandit ambush in a desolate pass. The caravan master wants everyone to join the defense.",
    secenekler: [
      {
        metin: "Defend your goods, stand against the bandits.",
        basariliSonuc: {
          mesaj: "The caravan held and drove off the bandits; with your share of the spoils you grew even richer.",
          detay: "This pass is spoken of with your courage now.",
        },
        basarisizSonuc: {
          mesaj: "The bandits took most of your goods, and you got away wounded.",
          detay: "This journey cost more than you thought.",
        },
      },
      {
        metin: "Leave your goods, save your life.",
        basariliSonuc: {
          mesaj: "You left part of your goods and fell back; at least you survived.",
          detay: "Sometimes accepting a loss is the wisest choice.",
        },
        basarisizSonuc: {
          mesaj: "Despite falling back, the bandits took nearly everything.",
          detay: "Some losses can't be prevented.",
        },
      },
    ],
  },
  oc_kervan_uzak_diyar_ticareti: {
    baslik: "The Market of a Distant Land",
    metin: "The caravan reached the market of a city you'd never seen. Exotic spices, silks, and languages you don't know fill the place.",
    secenekler: [
      {
        metin: "Haggle boldly, make big purchases.",
        basariliSonuc: {
          mesaj: "The deal you made turned out incredibly profitable; back home everyone will talk about this trade.",
          detay: "The connection you made with distant lands will open new doors for you.",
        },
        basarisizSonuc: {
          mesaj: "The local merchants cheated you; the deal didn't turn out as you hoped.",
          detay: "Inexperience in a foreign market costs dearly.",
        },
      },
      {
        metin: "Be cautious, do small deals.",
        basariliSonuc: {
          mesaj: "You settled for a small but safe gain.",
          detay: "Sometimes little but sure beats a lot.",
        },
        basarisizSonuc: {
          mesaj: "You made no gain worth mentioning but at least you didn't lose either.",
          detay: "Not every journey brings a profit.",
        },
      },
    ],
  },
  oc_kervan_evde_kalanin_pismanligi: {
    baslik: "Tales of the Returned Caravan",
    metin: "The caravan returned to the city months later; those who joined grew rich and came back with exotic stories. You stayed in the city.",
    secenekler: [
      {
        metin: "Listen to the stories, prepare for the next caravan.",
        basariliSonuc: {
          mesaj: "The stories told made you keener for the next opportunity.",
          detay: "Maybe next time you'll join too.",
        },
        basarisizSonuc: {
          mesaj: "Thinking about the opportunity you missed made you wistful.",
          detay: "Some regrets sink in.",
        },
      },
      {
        metin: "Don't care, be content with your safe life.",
        basariliSonuc: {
          mesaj: "You knew the value of your safe life; not everyone has to take risks.",
          detay: "Peace is a kind of wealth too.",
        },
        basarisizSonuc: {
          mesaj: "Though you tried not to care, deep down you were curious.",
          detay: "Some curiosities never pass.",
        },
      },
    ],
  },
  sd_fabrika_grev_karari: {
    baslik: "A Strike at the Factory Gate",
    metin: "Against long working hours and low wages, the workers decided to strike. The crowd gathered at the factory gate expects you to pick a side too.",
    secenekler: [
      {
        metin: "Join the strike, defend workers' rights.",
        basariliSonuc: {
          mesaj: "You stood shoulder to shoulder with the other workers; at the gate you shouted 'Justice!'",
          detay: "You're part of the workers' movement now; this choice will shape the years ahead of you.",
        },
        basarisizSonuc: {
          mesaj: "You joined the strike but you were jostled about in the crowd.",
          detay: "Solidarity isn't always easy.",
        },
      },
      {
        metin: "Don't join, keep working.",
        basariliSonuc: {
          mesaj: "You walked through the gate and sat down at your bench; the job is your bread and you didn't want to risk it.",
          detay: "This decision will make you privileged in the boss's eyes.",
        },
        basarisizSonuc: {
          mesaj: "As you went in a few strikers shouted 'traitor' at you.",
          detay: "This choice looks like it'll have a price.",
        },
      },
    ],
  },
  sd_grev_polis_mudahalesi: {
    baslik: "Clubs and Shouts",
    metin: "The strike is in its third week; the factory owner called the gendarmerie. The crowd isn't dispersing, the tension is climbing.",
    secenekler: [
      {
        metin: "Fall back, move to the rear of the crowd.",
        basariliSonuc: {
          mesaj: "You fell back; the strike went on without you.",
          detay: "You don't have to be in the front rank of every struggle.",
        },
        basarisizSonuc: {
          mesaj: "As the crowd broke up you took a scratch in the jostling.",
          detay: "Chaos protects no one entirely.",
        },
      },
      {
        metin: "Stay in the front rank, don't fall back.",
        basariliSonuc: {
          mesaj: "Not used.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
        onTepki: {
          metin: "Suddenly mounted gendarmes began charging the crowd! Clubs rose in the air. You're at the very front — you can run or you can meet the clubs.",
          geriCekilMetni: "Run! I didn't come here to die in the street.",
          geriCekilSonucu: {
            mesaj: "You turned and ran before the club came down. You saved your life but in the workers' eyes you're a coward.",
            detay: "Some heroic urges last only until the gendarmes show up.",
          },
          devamMetni: "Build the barricade! I'll never turn back!",
          devamSonucu: {
            mesaj: "You were caught under the clubs and horses' hooves but you didn't step back for even a second. You became an undying symbol of the whole working class.",
            detay: "Your body was broken but your spirit grew huge.",
          },
        },
      },
    ],
  },
  sd_grev_kazanim: {
    baslik: "They're Coming to the Table",
    metin: "After a long resistance the factory owner agreed to meet with the workers' representatives. The demands were put on the table.",
    secenekler: [
      {
        metin: "Hold firm alongside the representatives.",
        basariliSonuc: {
          mesaj: "The boss backed down; wages and working hours were improved. This became your lasting gain too.",
          detay: "You got the return for your resistance.",
        },
        basarisizSonuc: {
          mesaj: "The boss gave nothing; the strike lasting weeks came to nothing.",
          detay: "Not every struggle ends in a gain.",
        },
      },
      {
        metin: "Compromise, accept the middle ground.",
        basariliSonuc: {
          mesaj: "You settled for a small wage improvement; everyone went back to work.",
          detay: "It wasn't quite what you wanted but it was a gain.",
        },
        basarisizSonuc: {
          mesaj: "Even your compromise offer was rejected; everyone went back to work empty-handed.",
          detay: "Some bosses won't agree to anything.",
        },
      },
    ],
  },
  sd_fabrika_sadik_isci: {
    baslik: "The Boss's Trust",
    metin: "Staying on the job during the strike caught the factory owner's eye; he wants to reward you.",
    secenekler: [
      {
        metin: "Accept the promotion, get closer to the boss.",
        basariliSonuc: {
          mesaj: "You got a small foreman's offer; your wage rose permanently.",
          detay: "But your old workmates don't talk to you like they used to.",
        },
        basarisizSonuc: {
          mesaj: "You got a small bonus but the other workers noticed.",
          detay: "Being the boss's favorite has a price.",
        },
      },
      {
        metin: "Decline politely, stay an ordinary worker.",
        basariliSonuc: {
          mesaj: "You politely turned the offer down; your workmates appreciated it.",
          detay: "Some opportunities aren't worth accepting.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal surprised the boss but he didn't repeat the offer.",
          detay: "Some doors open only once.",
        },
      },
    ],
  },
  sd_fabrika_disliyanlar: {
    baslik: "The Empty Chair",
    metin: "At the lunch break, when you sat at the usual table no one met your eye; that you stayed on the job during the strike still isn't forgotten.",
    secenekler: [
      {
        metin: "Speak openly, try to mend things.",
        basariliSonuc: {
          mesaj: "You spoke sincerely; some met it with understanding and the ice thawed a little.",
          detay: "Honesty is sometimes the best bridge.",
        },
        basarisizSonuc: {
          mesaj: "Your words made the tension worse.",
          detay: "Some grievances aren't mended with words.",
        },
      },
      {
        metin: "Pay it no mind, eat your meal alone.",
        basariliSonuc: {
          mesaj: "You got used to eating alone; in time it came to feel normal.",
          detay: "Some prices are paid quietly.",
        },
        basarisizSonuc: {
          mesaj: "The loneliness bothers you more and more.",
          detay: "People can't bear being alone for long.",
        },
      },
    ],
  },
  sd_icat_yatirim_firsati: {
    baslik: "An Inventor's Offer",
    metin: "An inventor you know is looking for a partner for a new steam-powered machine. With the little money you have you could invest in this invention.",
    secenekler: [
      {
        metin: "Invest, trust the inventor.",
        basariliSonuc: {
          mesaj: "The machine really worked; factories started placing orders and your investment came back many times over.",
          detay: "Being part of this invention put you in the history books.",
        },
        basarisizSonuc: {
          mesaj: "The machine never worked properly; the inventor abandoned the project.",
          detay: "Not every invention succeeds.",
        },
      },
      {
        metin: "Don't take the risk, hold on to your money.",
        basariliSonuc: {
          mesaj: "You turned the offer down; you didn't touch your money.",
          detay: "It's wiser not to trust some opportunities.",
        },
        basarisizSonuc: {
          mesaj: "When the machine actually worked, you felt a faint regret inside.",
          detay: "You kept thinking 'I wish I'd taken the risk'.",
        },
      },
    ],
  },
  sd_icat_kendi_bulusu: {
    baslik: "An Idea You Had",
    metin: "To solve a recurring problem in your work you designed a simple but clever contraption. Maybe it'll be useful, maybe no one will care.",
    secenekler: [
      {
        metin: "Present the idea to your boss/guild.",
        basariliSonuc: {
          mesaj: "Your contraption worked; your name began to be spoken as 'a clever one'.",
          detay: "Small ideas sometimes make a big difference.",
        },
        basarisizSonuc: {
          mesaj: "Your idea was found 'silly'; you became a bit of a laughingstock.",
          detay: "Not every idea is appreciated.",
        },
      },
      {
        metin: "Keep it to yourself, use it only in your own work.",
        basariliSonuc: {
          mesaj: "The contraption made your own work easier; you shared it with no one but your work got lighter.",
          detay: "Some ideas can stay yours alone.",
        },
        basarisizSonuc: {
          mesaj: "The contraption wasn't much use; you gave up trying.",
          detay: "Not every idea works perfectly.",
        },
      },
    ],
  },
  komik_kecinin_donusu: {
    baslik: "The Devil Returns",
    metin: "That 'Devilish Goat' you caught epically in the market square years ago has come back to town. It's staring straight at you with hate-filled eyes and stamping its hooves. It wants a rematch!",
    secenekler: [
      {
        metin: "Accept the challenge! I'll take it down one more time.",
        basariliSonuc: {
          mesaj: "When the dust cloud settled the goat was at your feet, beaten! The crowd applauds you wildly.",
          detay: "The history books will write you with this absurd but tremendous victory.",
        },
        basarisizSonuc: {
          mesaj: "Over the years the goat has learned new martial arts! It horned you into the mud and bleated in triumph.",
          detay: "You lost your title. It is the new king.",
        },
      },
      {
        metin: "Run! This goat isn't what it used to be!",
        basariliSonuc: {
          mesaj: "You turned and fled screaming to your shop and locked the door.",
          detay: "Your Conqueror title is crossed out but at least your bones are intact.",
        },
        basarisizSonuc: {
          mesaj: "Two steps from the door the goat rammed you from behind and laid you face-down in the mud. The crowd howled with laughter.",
          detay: "Turns out even running takes skill.",
        },
      },
    ],
  },
  is_ikilem_amirin_haksiz_emri: {
    baslik: "An Unjust Order",
    metin: "{amir} wants you to unjustly accuse an innocent person — so his own mistake gets covered up. If you obey there's a promise of promotion, if you don't you fear retaliation.",
    secenekler: [
      {
        metin: "Carry out the order, stay silent.",
        basariliSonuc: {
          mesaj: "You carried out the order; {amir} is pleased, an innocent person paid the price but your record looks spotless.",
          detay: "Some promotions come on someone else's back.",
        },
        basarisizSonuc: {
          mesaj: "Your lie came out; you suffered both the guilt and a loss of reputation.",
          detay: "Dirty work rarely stays clean.",
        },
      },
      {
        metin: "Refuse the order, tell the truth.",
        basariliSonuc: {
          mesaj: "You told the truth; the innocent person was cleared, {amir} bore you a grudge but no one can take the peace inside you.",
          detay: "Some victories are worth more than a promotion.",
        },
        basarisizSonuc: {
          mesaj: "{amir} punished you for 'insubordination'; your career stalled but your conscience is spotless.",
          detay: "Telling the truth had a price, and you paid it.",
        },
      },
    ],
  },
  is_ikilem_meslektas_hatasi: {
    baslik: "Someone Else's Mistake",
    metin: "{ekip} made a serious mistake; if it's noticed you could both be in trouble. If you take the blame and cover for them you pay the price; if you report it, they do.",
    secenekler: [
      {
        metin: "Take the blame, cover for {ekip}.",
        basariliSonuc: {
          mesaj: "You took the blame; {ekip} was grateful to you for life but a stain formed on your record.",
          detay: "Some loyalties cost dearly, and still they're worth it.",
        },
        basarisizSonuc: {
          mesaj: "You took the blame but the truth came out; you lost both your reputation and {ekip}'s trust.",
          detay: "Some sacrifices go to waste.",
        },
      },
      {
        metin: "Report the situation to your superiors.",
        basariliSonuc: {
          mesaj: "You reported it, {ekip} was fired; your record stayed clean but your name in the team became 'untrustworthy'.",
          detay: "You protected yourself but there was a price.",
        },
        basarisizSonuc: {
          mesaj: "Your report wasn't taken seriously, and on top of that you were called a 'snitch'.",
          detay: "Some reports don't reach their aim.",
        },
      },
    ],
  },
  is_ikilem_rakibin_sirri: {
    baslik: "Your Rival's Secret",
    metin: "You learned a dark secret about {rakip} that could finish him completely. If you spread it his reputation collapses and you clear away your greatest obstacle. But it's like a weapon; it can backfire too.",
    secenekler: [
      {
        metin: "Spread the secret to everyone, finish {rakip}.",
        basariliSonuc: {
          mesaj: "The secret spread through the city; {rakip} lost his reputation overnight. Your path is clear but you won't forget how it cleared.",
          detay: "The taste of some victories leaves bitterness in the mouth.",
        },
        basarisizSonuc: {
          mesaj: "It came out that you were the source of the secret; you got the 'slanderer' brand, and {rakip} grew stronger in the victim's role.",
          detay: "Dark weapons sometimes go off in your hand.",
        },
      },
      {
        metin: "Keep the secret, compete the honest way.",
        basariliSonuc: {
          mesaj: "You never used the secret; somewhere inside you know this is the right thing.",
          detay: "Never drawing some weapons is a strength too.",
        },
        basarisizSonuc: {
          mesaj: "You stayed silent but {rakip} noticed this 'weakness' of yours and grew bolder.",
          detay: "Kindness is sometimes turned into an opportunity.",
        },
      },
    ],
  },
  is_ikilem_ekip_istifa: {
    baslik: "A Resignation Letter",
    metin: "{ekip} said he got a better offer and handed in his resignation. If you want to keep him you'll have to raise his wage considerably.",
    secenekler: [
      {
        metin: "Raise his wage, keep him.",
        basariliSonuc: {
          mesaj: "{ekip} accepted the offer and stayed; his loyalty was proven once more.",
          detay: "Some investments buy not just gold but trust.",
        },
        basarisizSonuc: {
          mesaj: "Despite the raise, {ekip} left anyway; you lost the money and the experience.",
          detay: "Sometimes no offer is enough.",
        },
      },
      {
        metin: "Let him go, you'll find someone new.",
        basariliSonuc: {
          mesaj: "{ekip} left on good terms; filling his place will take a little time.",
          detay: "Every parting is one door closing and another opening.",
        },
        basarisizSonuc: {
          mesaj: "As he left, {ekip} carried some of your secrets to your rivals.",
          detay: "Some partings don't stay quiet.",
        },
      },
    ],
  },
  is_ikilem_sahte_evrak: {
    baslik: "An Offer of a Forged Seal",
    metin: "A clerk you know says he can 'fix' the necessary documents with a forged seal — it would get you past the long, tedious bureaucracy ahead of you in one night. The risk of being caught is low but not zero.",
    secenekler: [
      {
        metin: "Accept the offer, take the shortcut.",
        basariliSonuc: {
          mesaj: "The forged seal worked without a hitch; the matter was settled in one night and no one noticed anything.",
          detay: "The shortcut got you to the goal but your conscience knows.",
        },
        basarisizSonuc: {
          mesaj: "The forgery came out! You were left with a heavy fine and a destroyed reputation.",
          detay: "Some shortcuts run along the edge of a cliff.",
        },
      },
      {
        metin: "Refuse, go the long but honest way.",
        basariliSonuc: {
          mesaj: "You got through the long bureaucracy patiently; slow but solid progress.",
          detay: "Honesty sometimes takes patience.",
        },
        basarisizSonuc: {
          mesaj: "The bureaucracy took even longer than you thought; you lost a lot of time and temper.",
          detay: "The honest road isn't always easy.",
        },
      },
    ],
  },
  is_ikilem_fazla_mesai: {
    baslik: "Working by Candlelight",
    metin: "An extra job promises extra earnings but it'll eat your nights too. Your body deserves rest but the money is tempting.",
    secenekler: [
      {
        metin: "Work extra, go without sleep.",
        basariliSonuc: {
          mesaj: "You slept little for weeks but in the end your strongbox filled considerably.",
          detay: "Your body pays for some gains.",
        },
        basarisizSonuc: {
          mesaj: "From exhaustion you fainted at work one day; most of the money you earned went on medicine.",
          detay: "The body sends the bill sooner or later.",
        },
      },
      {
        metin: "Refuse, choose to rest.",
        basariliSonuc: {
          mesaj: "You refused and rested well; your body is thanking you.",
          detay: "Sometimes the best gain is a rested body.",
        },
        basarisizSonuc: {
          mesaj: "You rested but there's a faint regret inside you about missing the opportunity.",
          detay: "Not every right choice is without regret.",
        },
      },
    ],
  },
};
