import type { OlayCeviri } from "./index";

/**
 * genel.ts — Meslek/çağdan bağımsız evrensel olayların İngilizce çevirisi (200 olay).
 * Türkçe kaynak kanonik; yalnız gösterim metinleri burada.
 * {dost}/{rakip}/{amir}/{ekip}/{bolge}/{yil} placeholder'ları birebir korunur.
 */
export const OLAYLAR_GENEL_EN: Record<string, OlayCeviri> = {
  kg_agir_idman: {
    baslik: "Pushing the Limits",
    metin: "You've grown weak lately. A brutal training regimen could restore your old resilience. But can your body take it?",
    secenekler: [
      {
        metin: "Endure the pain, push past your limits.",
        basariliSonuc: {
          mesaj: "Your muscles turned to steel. Your body can now withstand the heaviest blows.",
        },
        basarisizSonuc: {
          mesaj: "Your body broke under the strain. A torn knee leaves a lasting ache, even in the rain.",
        },
      },
      {
        metin: "Don't risk it; settle for light walks.",
        basariliSonuc: {
          mesaj: "You chose safety. No sweat, but no injury either.",
        },
        basarisizSonuc: {
          mesaj: "Even a light walk left you gasping.",
        },
      },
    ],
  },
  kg_yasakli_kitap: {
    baslik: "The Sealed Book",
    metin: "A strangely dressed stranger sold you a sealed, leather-bound book. Its contents are banned by the authorities; it may hold dangerous secrets.",
    secenekler: [
      {
        metin: "Break the seal, read the dark lore.",
        basariliSonuc: {
          mesaj: "The book changed how you see the world. You now know what ordinary people don't.",
        },
        basarisizSonuc: {
          mesaj: "A neighbor saw you reading through the window and reported you. Reputation ruined.",
        },
      },
      {
        metin: "Hand the book over unread.",
        basariliSonuc: {
          mesaj: "You handed it over. The authorities praised your loyalty and faith.",
        },
        basarisizSonuc: {
          mesaj: "You gave it up, but what it said haunts you as lifelong curiosity.",
        },
      },
    ],
  },
  kg_meyhane_sirri: {
    baslik: "Whispers at Midnight",
    metin: "{dost} took you to the seediest tavern in town. At the next table, shady men were discussing valuable commercial/political secrets.",
    secenekler: [
      {
        metin: "Buy them drinks, pump them for secrets.",
        basariliSonuc: {
          mesaj: "Drink loosened their tongues. You learned valuable things about the city's future.",
        },
        basarisizSonuc: {
          mesaj: "The men saw through you. They dragged you behind the tavern and beat you soundly.",
        },
      },
      {
        metin: "Mind your table; drink only with {dost}.",
        basariliSonuc: {
          mesaj: "You drank and had fun. But you realize you've grown a bit too used to this life.",
        },
        basarisizSonuc: {
          mesaj: "With your mind on the next table, talk with {dost} was flat.",
        },
      },
    ],
  },
  ekonomi_guvenli_yatirim: {
    baslik: "Your Sibling's Shop",
    metin: "A relative (sibling or cousin) asks you to co-fund a new smithy/weaver's shop. It won't make you rich, but the money stays in the family.",
    secenekler: [
      {
        metin: "Back the family, put up the capital.",
        basariliSonuc: {
          mesaj: "The shop runs like clockwork; each year you draw a steady, honest share.",
        },
        basarisizSonuc: {
          mesaj: "The shop underperformed. Whenever it comes up at family dinners, faces fall.",
        },
      },
      {
        metin: "Don't mix kin with business; refuse.",
        basariliSonuc: {
          mesaj: "Your money stayed in your pocket. Your sibling was put out, but you took no risk.",
        },
        basarisizSonuc: {
          mesaj: "Your sibling borrowed elsewhere, opened the shop, and thrived. You quietly regret it.",
        },
      },
    ],
  },
  ekonomi_tefecilik_teklifi: {
    baslik: "A Desperate Friend",
    metin: "A very old, desperate friend asks for a loan to save his shop, offering very high interest. The deal is profitable but morally dubious.",
    secenekler: [
      {
        metin: "Forget morals; lend at high interest.",
        basariliSonuc: {
          mesaj: "You lent at interest. You can't forget the gratitude and hatred on his face.",
        },
        basarisizSonuc: {
          mesaj: "You had the contract signed, but the friendship is clearly over.",
        },
      },
      {
        metin: "I'm no moneylender; I keep my money.",
        basariliSonuc: {
          mesaj: "You refused to lend at interest. His shop failed; your conscience and money are intact.",
        },
        basarisizSonuc: {
          mesaj: "Your friend lost the shop and accused you of abandoning him in bad times.",
        },
      },
    ],
  },
  ekonomi_tefecilik_sonucu: {
    baslik: "The Term Is Up",
    metin: "The loan to your old friend has come due. You went to his door; weeping, he says business is bad and he has no money.",
    secenekler: [
      {
        metin: "Hire men, seize the shop, throw him out.",
        basariliSonuc: {
          mesaj: "You sent your men. While his family wept in the street, you took the shop keys.",
        },
        basarisizSonuc: {
          mesaj: "You seized the shop by force, but the neighborhood jeered. They call you 'bloodsucker'.",
        },
      },
      {
        metin: "Forgive the debt for old times' sake.",
        basariliSonuc: {
          mesaj: "You tore up the notes before him. He fell at your feet. Money lost, soul regained.",
        },
        basarisizSonuc: {
          mesaj: "Debt forgiven. Conscience clear, but on the way home you remembered needing that money.",
        },
      },
    ],
  },
  ekonomi_kriz_donemi: {
    baslik: "The Bitter Face of the Crisis",
    metin: "The crisis has reached your home: the pantry is empty and your shop is near bankruptcy. Spend your last capital on food or on saving the business.",
    secenekler: [
      {
        metin: "Forget the business; buy food with my last money.",
        basariliSonuc: {
          mesaj: "You closed the stall. Bankrupt, reputation gone, but your family eats hot soup tonight.",
        },
        basarisizSonuc: {
          mesaj: "You spent your capital on food, but a black marketeer cheated you. Bankrupt, hungry.",
        },
      },
      {
        metin: "Let my family grit their teeth; save my business.",
        basariliSonuc: {
          mesaj: "While everyone sank, you grew rich! But your family wastes away from hunger.",
        },
        basarisizSonuc: {
          mesaj: "You gambled and lost. Your last money is gone and your family fell ill from hunger.",
        },
      },
    ],
  },
  ekonomi_vergi_tahsildari: {
    baslik: "The Sly Collector",
    metin: "The sour-faced tax collector stands at your door reading a hefty sum. Glancing around, he mutters, 'Maybe I wrote it wrong; a small error can be fixed.'",
    secenekler: [
      {
        metin: "Say 'I understand'; bribe him under the table.",
        basariliSonuc: {
          mesaj: "Not used.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
        onTepki: {
          metin: "He took it: 'This covers only this month.'",
          geriCekilMetni: "Get angry and throw him out! (Back out)",
          geriCekilSonucu: {
            mesaj: "You shouted him out and paid your tax honestly. Money gone, honor kept.",
          },
          devamMetni: "Quietly accept; join the bribery wheel.",
          devamSonucu: {
            mesaj: "You became his man. Tax dodged, but you're a prisoner of this secret.",
          },
        },
      },
      {
        metin: "Pay the tax in full.",
        basariliSonuc: {
          mesaj: "The collector scowled and took it all. Your pocket has a hole, but you bowed to no one.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but the collector marked you. Even your honest earnings will look suspect.",
        },
      },
    ],
  },
  ekonomi_rusvet_teklifi: {
    baslik: "The Devil's Purse",
    metin: "One of the city's richest and darkest men offers a purse stuffed with gold to store an illegal cargo in your warehouses.",
    secenekler: [
      {
        metin: "Take the gold; store the goods.",
        basariliSonuc: {
          mesaj: "You hid the purse in your robe. Rich now, but every night knock makes your heart pound.",
        },
        basarisizSonuc: {
          mesaj: "An apprentice saw you hiding the goods! Reported, fined, reputation stained.",
        },
      },
      {
        metin: "Refuse in anger; throw him out.",
        basariliSonuc: {
          mesaj: "You threw him out! The people praise your courage: the 'Man Who Cannot Be Bought'.",
        },
        basarisizSonuc: {
          mesaj: "He narrowed his eyes taking back the purse. Since then he's your darkest enemy.",
        },
      },
    ],
  },
  rutbe_kumandan_karari: {
    baslik: "The Commander's Dilemma",
    metin: "You face the enemy lines. Attack and victory is likely, but most of your young soldiers will die. Wait and they live, but the battle may be lost.",
    secenekler: [
      {
        metin: "We march to death! Order the attack.",
        basariliSonuc: {
          mesaj: "You crushed the enemy! A hero, but those young corpses now haunt your dreams.",
        },
        basarisizSonuc: {
          mesaj: "The attack became a massacre. You lost your soldiers and the battle.",
        },
      },
      {
        metin: "Fall back! I won't sacrifice my men.",
        basariliSonuc: {
          mesaj: "The enemy advanced; the battle seems lost. But your soldiers owe you their lives.",
        },
        basarisizSonuc: {
          mesaj: "The king branded you a coward. Your ranks are at risk.",
        },
      },
    ],
  },
  rutbe_lonca_ustasi_karari: {
    baslik: "The Power of the Guild Master",
    metin: "You now rule the city's trade. You can monopolize every good and crush the small traders, or share the goods and become the people's champion.",
    secenekler: [
      {
        metin: "Set up a monopoly; pull all goods into your warehouses.",
        basariliSonuc: {
          mesaj: "You exploited the whole market. While small traders go bust, you build towers of gold.",
        },
        basarisizSonuc: {
          mesaj: "The small traders revolted and burned your warehouses! Greed ended in a great fire.",
        },
      },
      {
        metin: "Distribute fairly; protect the small traders.",
        basariliSonuc: {
          mesaj: "The city's tradesmen pray for you. Not richer, but the most loved man in town.",
        },
        basarisizSonuc: {
          mesaj: "You tried to be fair, but the big merchants shut you out.",
        },
      },
    ],
  },
  rutbe_basrahip_hukmu: {
    baslik: "Divine Justice",
    metin: "The city's richest noble committed murder in your temple. Excommunicate him to execution, or pardon him for a hefty 'church donation'.",
    secenekler: [
      {
        metin: "God's justice is not for sale! Excommunicate him.",
        basariliSonuc: {
          mesaj: "The noble was chained in shock. The people give your courage a standing ovation!",
        },
        basarisizSonuc: {
          mesaj: "The noble's family sent armed men to your temple one night. Your life is in danger!",
        },
      },
      {
        metin: "Quietly take the donation; cleanse his sin.",
        basariliSonuc: {
          mesaj: "Gold filled your cellar; the noble walks free. People glare; you can't face the mirror.",
        },
        basarisizSonuc: {
          mesaj: "Your bribe came out. The other priests rose up; your title is shaken.",
        },
      },
    ],
  },
  asker_birlik_kaynak: {
    baslik: "The Unit's Rations",
    metin: "Gold was allotted for your unit's winter provisions and swords. You can truly spend it on the troops, or pocket it with false records.",
    secenekler: [
      {
        metin: "Spend it all on training and rations.",
        basariliSonuc: {
          mesaj: "Your soldiers are fed, their swords sharp. They'll stand behind you like a wall.",
        },
        basarisizSonuc: {
          mesaj: "Merchants cheated you and supplies came up short, but your intent was good.",
        },
      },
      {
        metin: "Falsify the record; keep the gold.",
        basariliSonuc: {
          mesaj: "You stashed the gold under your bed. Your men drill with rusty swords; you don't care.",
        },
        basarisizSonuc: {
          mesaj: "The inspector found the false records! Court-martialed, reputation destroyed.",
        },
      },
    ],
  },
  komik_kecinin_intikami: {
    baslik: "The Devilish Goat",
    metin: "Your neighbor's wild-eyed goat snapped its rope and charged into your garden, right through your laundry. The whole street watches from the windows.",
    secenekler: [
      {
        metin: "Let out a war cry, leap on the goat!",
        basariliSonuc: {
          mesaj: "You flew through the air and pinned the goat by its horns! The street applauds wildly.",
        },
        basarisizSonuc: {
          mesaj: "The goat flung you into a mud puddle. Then it ate your trousers.",
        },
      },
      {
        metin: "Stay out of it; run inside, lock the door.",
        basariliSonuc: {
          mesaj: "The goat chewed your laundry, got bored, and left. Pride hurt, body fine.",
        },
        basarisizSonuc: {
          mesaj: "The goat wrecked the garden and broke a window with its horns.",
        },
      },
    ],
  },
  ruh_uykusuzluk_hayaletleri: {
    baslik: "Sleepless Nights",
    metin: "You haven't slept for days. When your eyelids droop, shapes appear on the wall: the faces of dead friends (or enemies).",
    secenekler: [
      {
        metin: "Go to the priests/imams for prayers and an amulet.",
        basariliSonuc: {
          mesaj: "Prayers and incense worked. At last, unbroken sleep.",
        },
        basarisizSonuc: {
          mesaj: "The amulets failed; the ghosts kept grinning from the walls.",
        },
      },
      {
        metin: "I'm losing my mind! I must cope alone.",
        basariliSonuc: {
          mesaj: "You passed out from exhaustion and your mind reset.",
        },
        basarisizSonuc: {
          mesaj: "Sleepless, you fell down the stairs. Exhaustion is wrecking your body too.",
        },
      },
    ],
  },
  halk_ahlaksiz_dedigodusu: {
    baslik: "The People's Hatred",
    metin: "Your reputation and morals are in the gutter. People spit at you in the street; tradesmen won't sell to you.",
    secenekler: [
      {
        metin: "Hand out free provisions in the square.",
        basariliSonuc: {
          mesaj: "Your generosity reached their stomachs. Those who spat now call you 'benefactor'.",
        },
        basarisizSonuc: {
          mesaj: "They took the food but kept cursing you behind your back. Wasted money.",
        },
      },
      {
        metin: "Hold your head high; ignore the herd.",
        basariliSonuc: {
          mesaj: "You don't care what they think. You carried on, hard and merciless.",
        },
        basarisizSonuc: {
          mesaj: "Feigning indifference, you took a rotten tomato to the head. Inside, you're crumbling.",
        },
      },
    ],
  },
  "halk_tanınmayan_yabanci": {
    baslik: "The Invisible Man",
    metin: "You've lived here for years but are still treated like a ghost. State doors close in your face, deals go against you.",
    secenekler: [
      {
        metin: "Appear at a big festival; draw all eyes.",
        basariliSonuc: {
          mesaj: "Thanks to your flashy clothes and generosity, people finally learned your name!",
        },
        basarisizSonuc: {
          mesaj: "Your efforts went unnoticed. In the crowd you're a nobody with a lighter purse.",
        },
      },
      {
        metin: "Enjoy the invisibility; work quietly.",
        basariliSonuc: {
          mesaj: "Being invisible means staying out of trouble. No one asked for tax or bribes.",
        },
        basarisizSonuc: {
          mesaj: "Being ignored became a weight that crushes your spirit day by day.",
        },
      },
    ],
  },
  sezgi_gozlemci_yardimci: {
    baslik: "The Eye of the Dark Streets",
    metin: "A sharp-eyed (but dangerous) informant who hears everything on the streets and knows who sells what for how much offers to work for you.",
    secenekler: [
      {
        metin: "Hire him; make the city's secrets yours.",
        basariliSonuc: {
          mesaj: "You hired the informant. Now you can anticipate your rivals' moves.",
        },
        basarisizSonuc: {
          mesaj: "The man took the money and vanished next day. Swindled.",
        },
      },
      {
        metin: "My instincts suffice; refuse.",
        basariliSonuc: {
          mesaj: "You were right to distrust such types. You carried on by your own wits.",
        },
        basarisizSonuc: {
          mesaj: "Later, losing a tender blindly, you thought, 'I should have hired him.'",
        },
      },
    ],
  },
  eksen_ani_karar_ani: {
    baslik: "No Time to Delay",
    metin: "A suspicious fire broke out at the governor's mansion; a huge chest of gold sits defenseless inside. The roof will collapse in minutes. No time to think!",
    secenekler: [
      {
        metin: "Rush inside and grab that chest!",
        basariliSonuc: {
          mesaj: "You emerged from the flames with the chest! Burned, but richer by a fortune.",
        },
        basarisizSonuc: {
          mesaj: "A beam fell on your head! They carried you out for dead; you lay in a coma for days.",
        },
      },
      {
        metin: "This is madness! Watch from a distance.",
        basariliSonuc: {
          mesaj: "As it collapsed you said, 'Good thing I stayed out.' Gold isn't worth your life.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
      },
    ],
  },
  eksen_dusmanin_insafina_kaldi: {
    baslik: "The Broken Enemy",
    metin: "The man who tormented you for years is bankrupt now, on his knees begging mercy. You can draw your sword or give him bread.",
    secenekler: [
      {
        metin: "Pity him; put gold in his pocket; send him off.",
        basariliSonuc: {
          mesaj: "You refused the poison of revenge. Weeping, he kissed your hands and left the city.",
        },
        basarisizSonuc: {
          mesaj: "The moment you turned, he stabbed you in the back! Your mercy nearly killed you.",
        },
      },
      {
        metin: "The past is paid for in blood! Punish him.",
        basariliSonuc: {
          mesaj: "You showed no mercy and sent him to the dungeon/death. No one dares speak your name.",
        },
        basarisizSonuc: {
          mesaj: "Your cruelty roused the people; they stopped you and took the man.",
        },
      },
    ],
  },
  ekip_referansli_yardimci: {
    baslik: "A Master Swordsman",
    metin: "A scarred, battle-hardened swordsman/bodyguard offers his service. His advance is steep, but he swears to protect you from everything.",
    secenekler: [
      {
        metin: "You're hired; be my shadow.",
        basariliSonuc: {
          mesaj: "He started work. His presence alone kept the jackals away.",
        },
        basarisizSonuc: {
          mesaj: "The night he got the advance he got drunk, gambled it away, and fled the city!",
        },
      },
      {
        metin: "Too expensive; I need no guard.",
        basariliSonuc: {
          mesaj: "You refused. Money in your pocket, you keep walking alone.",
        },
        basarisizSonuc: {
          mesaj: "Right after he left, two thugs cornered you; 'clearly unguarded,' they smirked.",
        },
      },
    ],
  },
  ekip_ucuz_belirsiz_yardimci: {
    baslik: "The Street Orphan",
    metin: "A scrawny, sharp-eyed street boy clings to your leg: 'A bowl of soup and I'll do any job.' Talent or thief, who knows.",
    secenekler: [
      {
        metin: "Come on then, try your luck.",
        basariliSonuc: {
          mesaj: "You took the boy in. He seems loyal at first; time will show his true talent.",
        },
        basarisizSonuc: {
          mesaj: "On day one the boy stole 10 gold from your strongbox and vanished.",
        },
      },
      {
        metin: "Street rat! Stay away.",
        basariliSonuc: {
          mesaj: "You shoved him aside and walked on. Your conscience stung a little.",
        },
        basarisizSonuc: {
          mesaj: "Chasing him off, you noticed he'd lifted a few coins from your pocket.",
        },
      },
    ],
  },
  ekip_yeni_taniski: {
    baslik: "A Traveling Companion",
    metin: "A traveler you met at an inn is impressed by your goals and wants to walk with you. Knowledgeable, but hides his past.",
    secenekler: [
      {
        metin: "You may walk beside me.",
        basariliSonuc: {
          mesaj: "He shouldered his pack and followed. His stories make the road bearable.",
        },
        basarisizSonuc: {
          mesaj: "While you slept, you noticed him packing and slipping away.",
        },
      },
      {
        metin: "I walk my road alone.",
        basariliSonuc: {
          mesaj: "You parted at the inn. Walking alone is safest.",
        },
        basarisizSonuc: {
          mesaj: "The rest of the road was long and silent; you missed the traveler's stories.",
        },
      },
    ],
  },
  ekip_tehlikeli_kervan_yolu: {
    baslik: "The Cliff Pass",
    metin: "A very valuable cargo must cross 'Cliff Pass', haunt of bandits and predators. Risk your crew, or lead it yourself?",
    secenekler: [
      {
        metin: "I'll take the risk! Lead the caravan.",
        basariliSonuc: {
          mesaj: "With sword and courage you brought the caravan through! Enormous profit.",
        },
        basarisizSonuc: {
          mesaj: "Bandits ambushed you! An arrow in the belly, the goods plundered.",
        },
      },
      {
        metin: "Order {ekip}: 'Bring the cargo through safe.'",
        basariliSonuc: {
          mesaj: "Your crew arrived drenched in sweat but successful. That is leadership.",
        },
        basarisizSonuc: {
          mesaj: "Days passed... neither {ekip} nor the cargo returned. The wilds swallowed them.",
        },
      },
    ],
  },
  ekip_riskli_gorev_teklifi: {
    baslik: "The Poison Courier",
    metin: "A mysterious man from the palace hands you a sealed letter: 'Deliver this to the enemy fortress. If caught, we don't know you.' A deadly mission.",
    secenekler: [
      {
        metin: "I carry the secret. Go yourself.",
        basariliSonuc: {
          mesaj: "In the dead of night you delivered the letter. The palace owes you much.",
        },
        basarisizSonuc: {
          mesaj: "Border guards caught you! Tortured, you barely escaped alive.",
        },
      },
      {
        metin: "Handle it in the shadows; send {ekip}.",
        basariliSonuc: {
          mesaj: "{ekip} completed the mission in your name and returned safe.",
        },
        basarisizSonuc: {
          mesaj: "Your man was caught at the border and hanged! His blood is on your hands.",
        },
      },
    ],
  },
  ekip_koruma_kiralama: {
    baslik: "A Dark Shadow",
    metin: "Your enemies in the city are multiplying. In a corner of the inn, a scarred mercenary offers his services. He boasts, but only time will show his skill.",
    secenekler: [
      {
        metin: "Hire him as your bodyguard.",
        basariliSonuc: {
          mesaj: "You paid. Now he follows like a shadow.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but the man vanished at midnight.",
        },
      },
      {
        metin: "Refuse; fend for yourself.",
        basariliSonuc: {
          mesaj: "You refused the offer.",
        },
        basarisizSonuc: {
          mesaj: "The man you refused seemed to tip off those waiting; you were ambushed in a dark alley.",
        },
      },
    ],
  },
  ekip_koruma_testi: {
    baslik: "The Test of Loyalty",
    metin: "Three thugs blocked your way in a night alley, knives gleaming. You told your bodyguard to step up and handle it. Time to see his hidden talent.",
    secenekler: [
      {
        metin: "Wait for your bodyguard to fight.",
        basariliSonuc: {
          mesaj: "Your bodyguard moved like lightning and dropped all three! A real killing machine.",
        },
        basarisizSonuc: {
          mesaj: "Your bodyguard saw the knives and fled! The thugs beat you and took your money.",
        },
      },
    ],
  },
  ekip_tuccar_yaveri: {
    baslik: "A Clever Apprentice",
    metin: "Your business is growing; you consider hiring a clever-looking youth to keep accounts. He could earn you a fortune or empty your coffer.",
    secenekler: [
      {
        metin: "Make him your accountant.",
        basariliSonuc: {
          mesaj: "The youth sat at his desk and began sorting the ledgers.",
        },
        basarisizSonuc: {
          mesaj: "The youth vanished with his first week's wages, and a few ledger pages with him.",
          detay: "Clever, yes — at the wrong things.",
        },
      },
      {
        metin: "Keep doing the work yourself.",
        basariliSonuc: {
          mesaj: "The workload wore on you, but the strongbox key is yours.",
        },
        basarisizSonuc: {
          mesaj: "A winter buried in ledgers wore you out; blurred eyes, stiff back.",
          detay: "Carrying it all alone has a price.",
        },
      },
    ],
  },
  ekip_tuccar_yaveri_testi: {
    baslik: "A Big Shipment",
    metin: "While you were out of town, your accountant ran a big shipment. Back home, you look at the strongbox.",
    secenekler: [
      {
        metin: "Check the accounts.",
        basariliSonuc: {
          mesaj: "Unbelievable! Your assistant exploited market gaps and doubled the profit.",
        },
        basarisizSonuc: {
          mesaj: "The strongbox is bare! Your assistant took the cash and fled by ship at midnight.",
        },
      },
    ],
  },
  hizip_asker_saflasma: {
    baslik: "A Split in the Barracks",
    metin: "The army seethes. The 'Old Guard' defends the general's rigid, noble rules; the 'New Order' wants merit-based reform. Weapons may turn on each other.",
    secenekler: [
      {
        metin: "Tradition keeps us alive! Join the Old Guard.",
        basariliSonuc: {
          mesaj: "You sided with the noble commanders. The traditionalists embraced you.",
        },
        basarisizSonuc: {
          mesaj: "You joined, but the young upstarts see you as an enemy.",
        },
      },
      {
        metin: "The rotten order must change! Join the New Order.",
        basariliSonuc: {
          mesaj: "You joined the reformers like a young lion. Winds of change blow!",
        },
        basarisizSonuc: {
          mesaj: "You joined, but the noble general blacklisted your name.",
        },
      },
    ],
  },
  hizip_tuccar_saflasma: {
    baslik: "Who Rules the Market?",
    metin: "Trade split in two. The noble-backed Harbor Guild defends monopoly; the Market Union, free competition. Pick no side and you may go bankrupt.",
    secenekler: [
      {
        metin: "Wealth and power! Join the Harbor Guild.",
        basariliSonuc: {
          mesaj: "The noble merchants took you in. Tax cuts began at once.",
        },
        basarisizSonuc: {
          mesaj: "You joined, but the small traders turned their backs.",
        },
      },
      {
        metin: "The people's power! Join the Market Union.",
        basariliSonuc: {
          mesaj: "You became the tradesmen's champion. The street now buys from your stall.",
        },
        basarisizSonuc: {
          mesaj: "You joined, but the nobles slapped heavy duties on your goods.",
        },
      },
    ],
  },
  hizip_din_saflasma: {
    baslik: "The Holy Schism",
    metin: "Faith split in two. Traditionalists want the ancient, rigid laws; Reformists want religion in the people's tongue. Which side are you on?",
    secenekler: [
      {
        metin: "Rules can't bend! Join the Traditionalists.",
        basariliSonuc: {
          mesaj: "The old bishops approved. You guard ancient knowledge.",
        },
        basarisizSonuc: {
          mesaj: "The young congregation called you a bigot and left the temple.",
        },
      },
      {
        metin: "Time for enlightenment! Join the Reformists.",
        basariliSonuc: {
          mesaj: "Squares overflow to hear you. You became the voice of a new age.",
        },
        basarisizSonuc: {
          mesaj: "The Inquisition / High Council threatens to charge you with heresy.",
        },
      },
    ],
  },

  hizip_zanaatkar_saflasma: {
    baslik: "The Guild Is Torn Apart",
    metin: "The guild split: the Guild Council defends old ways and fixed prices; the Free Masters, setting your own. You must pick a side.",
    secenekler: [
      {
        metin: "Order and craft honor! Join the Guild Council.",
        basariliSonuc: {
          mesaj: "The master foremen embraced you. The guild's protection is behind you now.",
        },
        basarisizSonuc: {
          mesaj: "You joined, but the young journeymen shunned you as a fogey.",
        },
      },
      {
        metin: "My labor's worth is mine! Join the Free Masters.",
        basariliSonuc: {
          mesaj: "You began setting your own prices; your purse swelled within a week.",
        },
        basarisizSonuc: {
          mesaj: "You joined, but the guild cut your supplies; the first months were rough.",
        },
      },
    ],
  },
  dunya_savas_biter: {
    baslik: "The End of the Bloody Mud",
    metin: "The treaty of {yil} ended the war. Maimed comrades seek work. The treasury is dry, the streets full of veterans. Where is your place now?",
    secenekler: [
      {
        metin: "Gather old comrades; build a veterans' support network.",
        basariliSonuc: {
          mesaj: "You found work and bread for hundreds of veterans. Your army is loyal to the death.",
          detay: "Most can't read, but they'd die for you.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't find the promised work. Old comrades accused you of 'peddling dreams'.",
          detay: "You can never face a soldier again.",
        },
      },
      {
        metin: "Seize the chance! Snap up ownerless lands cheap.",
        basariliSonuc: {
          mesaj: "You bought the fallen's fields for pennies and took their deeds. You're a landlord now.",
          detay: "Widows spit at you in the market; you count gold.",
        },
        basarisizSonuc: {
          mesaj: "The real heirs of the lands you bought appeared. The court annulled your deeds.",
          detay: "The dead's property brought you no luck.",
        },
      },
      {
        metin: "Sell the names of possible rebel veterans to the state.",
        basariliSonuc: {
          mesaj: "You gave the list. That night dozens of comrades were jailed. Purse full, hands bloody.",
          detay: "You're now the new state's secret hound.",
        },
        basarisizSonuc: {
          mesaj: "The list leaked. Your comrades know who informed; you fear every shadow and got no coin.",
          detay: "Once exposed, you lost money and safety.",
        },
      },
    ],
  },
  dunya_savas_cephe_cagrisi: {
    baslik: "The Death Order",
    metin: "The war enters its bloodiest phase. Your regiment is sent into a death-reeking redoubt. The commander assigns duties at midnight, eyes on you.",
    secenekler: [
      {
        metin: "I'll march to death first! Join the assault column.",
        basariliSonuc: {
          mesaj: "You made the redoubt a bloodbath, first man in! The general pinned a medal on you.",
          detay: "You can't forget the faces; history notes your name.",
        },
        basarisizSonuc: {
          mesaj: "A cannonball blew you skyward. For days you lay among corpses, left for dead.",
          detay: "When you woke, part of your body was gone.",
        },
      },
      {
        metin: "Put me on the supply line, behind the front, commander.",
        basariliSonuc: {
          mesaj: "Hiding behind provision sacks, you survived the war unharmed.",
          detay: "Returning comrades won't sit with you. Lifelong shame.",
        },
        basarisizSonuc: {
          mesaj: "Enemy cavalry broke through the supply line and cut you down. Cowardice didn't save you.",
          detay: "You fled and barely escaped capture.",
        },
      },
    ],
  },
  dunya_savas_maas_kesintisi: {
    baslik: "Hungry Soldiers",
    metin: "As the war dragged on, the treasury ran dry. Not one silver coin in three months. Boots are holed, bellies empty. Whispers of mutiny roam the barracks.",
    secenekler: [
      {
        metin: "Be the ringleader! Take the petition to the general.",
        basariliSonuc: {
          mesaj: "You slammed your fist down. Fearing mutiny, the general paid the last coin. A legend!",
          detay: "But high command filed you as a 'dangerous rebel'.",
        },
        basarisizSonuc: {
          mesaj: "The general ignored you. Flogged for inciting mutiny, you were jailed.",
          detay: "The men behind you took fright and sold you out.",
        },
      },
      {
        metin: "Say 'you're right', but urge them to plunder villages.",
        basariliSonuc: {
          mesaj: "With hungry soldiers you raided villages by night. Loot in hand, the sky burned red.",
          detay: "The weeping village woman haunts your nightmares.",
        },
        basarisizSonuc: {
          mesaj: "The villagers proved tougher. Scythes and axes ambushed the soldiers; you were gutted.",
          detay: "Being beaten by villagers ended your reputation.",
        },
      },
    ],
  },
  dunya_salgin_biter: {
    baslik: "The Retreat of Death",
    metin: "After months of horror the plague retreats. A third of the people are gone. Empty homes and shops, hungry orphans. The city is reborn.",
    secenekler: [
      {
        metin: "Seize the ownerless properties by forging deeds.",
        basariliSonuc: {
          mesaj: "You moved into the dead's homes. A vast empire; those faces haunt you.",
        },
        basarisizSonuc: {
          mesaj: "The real heirs returned. You were tried for fraud and the mob tried to lynch you.",
        },
      },
      {
        metin: "Gather the plague orphans; build them a home.",
        basariliSonuc: {
          mesaj: "The orphans grew up in your hands: not just apprentices, but your loyal children.",
          detay: "Years on, those children will carry your business.",
        },
        basarisizSonuc: {
          mesaj: "Raising them drained you. Some stole and ran, but your conscience is clear.",
        },
      },
    ],
  },
  dunya_ekonomi_toparlanma: {
    baslik: "A New Era",
    metin: "The state minted new coin, roads reopened. The crisis dust is settling. Whoever moves boldly first skims the cream.",
    secenekler: [
      {
        metin: "Plunge into debt, buy up everything! Grow aggressively.",
        basariliSonuc: {
          mesaj: "While rivals trembled, you filled your warehouses. You caught the wave!",
        },
        basarisizSonuc: {
          mesaj: "You rushed. When prices hit bottom again, the debts strangled you. You lost everything.",
        },
      },
      {
        metin: "Be cautious; buy bit by bit.",
        basariliSonuc: {
          mesaj: "You advanced with safe, solid steps. Not rich, but firmly planted.",
        },
        basarisizSonuc: {
          mesaj: "You waited too long; by the time you entered, the big wolves had taken every tender.",
        },
      },
    ],
  },
  rusvet_teklif_geldi: {
    baslik: "The Offer Comes to You",
    metin: "As a man of influence, you're offered a bribe for the first time. A contractor says one word from you will win him the tender. The purse is on the table.",
    secenekler: [
      {
        metin: "Take the purse; put in the word.",
        basariliSonuc: {
          mesaj: "The tender went to him, the purse to you. Nobody asked a thing.",
          detay: "How easy it was scared you. A second purse will come.",
        },
        basarisizSonuc: {
          mesaj: "The contractor was caught and named you first.",
          detay: "Reputation collapsed; you can't object, it's true.",
        },
      },
      {
        metin: "Refuse; put the offer on record.",
        basariliSonuc: {
          mesaj: "You documented the offer; the contractor was tried, your name cleared.",
          detay: "Honesty is capital now. One man will never forgive you.",
        },
        basarisizSonuc: {
          mesaj: "You refused; the contractor slandered you, then sabotaged your business.",
          detay: "No one believed the offer. You did right, alone.",
        },
      },
      {
        metin: "Neither: blackmail him and take the tender.",
        basariliSonuc: {
          mesaj: "You threatened the contractor out and took the tender yourself.",
          detay: "You turned weakness into money. You write the rules.",
        },
        basarisizSonuc: {
          mesaj: "The contractor defied your blackmail and sent hired killers to your house.",
          detay: "Cunning nearly cost your life. Connections cut.",
        },
      },
    ],
  },
  rusvet_yargic: {
    baslik: "At the Courthouse Door",
    metin: "You're a defendant in an unjust case. Your lawyer whispers: 'I spoke with the judge's clerk. A sum buys a verdict. Or we trust the court and wait.'",
    secenekler: [
      {
        metin: "Pay the clerk; secure the verdict.",
        basariliSonuc: {
          mesaj: "The verdict favored you; you were innocent anyway, but you bought it.",
          detay: "You bought your rightness. Faith in justice died.",
        },
        basarisizSonuc: {
          mesaj: "The clerk took the money, the judge knew nothing; you lost money and got the sentence.",
          detay: "Swindled; complaining would confess the bribe attempt.",
        },
      },
      {
        metin: "Trust the court; defend yourself.",
        basariliSonuc: {
          mesaj: "You defended yourself and were acquitted; the courtroom applauded.",
          detay: "The verdict cites your honesty. It will help for years.",
        },
        basarisizSonuc: {
          mesaj: "Innocent, yet convicted: months in prison and a heavy fine.",
          detay: "Prison ruined health and trade. No one hired you.",
        },
      },
    ],
  },
  genel_sehir_secimi: {
    baslik: "The Crossroads",
    metin: "Business is slow here. North: a windy port city, lively, risky, lucrative. South: a great market city, crowded, competitive, stable.",
    secenekler: [
      {
        metin: "Move to the port city.",
        basariliSonuc: {
          mesaj: "You found port work fast; sea trade pays.",
          detay: "The port never sleeps. Money is made and lost fast.",
        },
        basarisizSonuc: {
          mesaj: "Holding on in the port was hard; your first year ran at a loss.",
          detay: "Everyone had a network; you didn't. A damp, cheap room.",
        },
      },
      {
        metin: "Move to the market city.",
        basariliSonuc: {
          mesaj: "You set up a steady stall in the market city; slow but solid.",
          detay: "Everyone knows everyone; reputation is all. Slow, firm.",
        },
        basarisizSonuc: {
          mesaj: "The market was full; finding a spot took months and ate your savings.",
          detay: "Every corner was taken. You stayed invisible.",
        },
      },
    ],
  },
  liman_kacakcilik: {
    baslik: "A Night Cargo at the Harbor",
    metin: "A captain offers a partnership in cargo that skips the customs ledger. Half the harbor does it; half watches the caught.",
    secenekler: [
      {
        metin: "Partner up, unload the cargo.",
        basariliSonuc: {
          mesaj: "Cargo landed at night, sold by morning; your share was big.",
          detay: "An easy door to enter, a hard one to leave.",
        },
        basarisizSonuc: {
          mesaj: "Guards raided; cargo lost, your name in the ledger.",
          detay: "Captain fled; your cargoes now get searched twice.",
        },
      },
      {
        metin: "Refuse, seek an official license.",
        basariliSonuc: {
          mesaj: "The license came; you now import legally, in daylight.",
          detay: "Less profit, but no racing heart at every knock.",
        },
        basarisizSonuc: {
          mesaj: "Your license application dragged on and was rejected.",
          detay: "Fees gone, files lost.",
        },
      },
      {
        metin: "Sell the captain out, seize the goods!",
        basariliSonuc: {
          mesaj: "You turned in the captain and took half the goods.",
          detay: "Rich now, always looking over your shoulder.",
        },
        basarisizSonuc: {
          mesaj: "The captain learned of it; his crew threw you into the sea.",
          detay: "You barely survived; money gone, death warrant out.",
        },
      },
    ],
  },
  pazar_tezgah_kavgasi: {
    baslik: "A Stall Fight",
    metin: "The market's best corner is free; three want it. The boss says 'highest bid', the traders say 'next in line'.",
    secenekler: [
      {
        metin: "Bid highest, buy the spot.",
        basariliSonuc: {
          mesaj: "The corner is yours; foot traffic tripled.",
          detay: "Neighbors won't greet you; customers will.",
        },
        basarisizSonuc: {
          mesaj: "A higher bid came; you lost money and spot.",
          detay: "The boss leaked your bid; deposit not returned.",
        },
      },
      {
        metin: "Follow tradition, wait your turn, gather support.",
        basariliSonuc: {
          mesaj: "Traders backed you; the boss yielded, corner yours.",
          detay: "Won free; thirty people now back you.",
        },
        basarisizSonuc: {
          mesaj: "Traders backed you; the boss took money. Rival got it.",
          detay: "No spot, but you're 'the man who plays fair'.",
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
          metin: "You grabbed his collar; guards drew swords.",
          geriCekilMetni: "Let go, storm off.",
          geriCekilSonucu: {
            mesaj: "You backed off; lost the spot and were humiliated.",
            detay: "Your temper hurt your reputation.",
          },
          devamMetni: "Threaten: 'You'll give me that spot!'",
          devamSonucu: {
            mesaj: "The boss flinched, called off his guards and ceded the spot.",
            detay: "Won by bullying; now he's your sworn enemy.",
          },
        },
      },
    ],
  },
  genel_saray_firsati: {
    baslik: "The Palace Gate",
    metin: "A post opened at the {bolge} palace; your renown made the shortlist. Power and money, but no one stays clean.",
    secenekler: [
      {
        metin: "Apply, enter the palace.",
        basariliSonuc: {
          mesaj: "Admitted; you're now where decisions are made.",
          detay: "You saw three ruined in week one and said nothing.",
        },
        basarisizSonuc: {
          mesaj: "Cut from the list; money and hope wasted.",
          detay: "Someone with better relatives got it.",
        },
      },
      {
        metin: "Don't apply; keep your independence.",
        basariliSonuc: {
          mesaj: "You refused the palace; people call you 'unbuyable'.",
          detay: "You sleep easy at night.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was called insolence; the court turned away.",
          detay: "No palace-linked work comes your way now.",
        },
      },
    ],
  },
  saray_entrika: {
    baslik: "Two Factions",
    metin: "Two factions war in the palace: old nobles and new rich. Both want you to choose; neutrality isn't an option.",
    secenekler: [
      {
        metin: "Back the old nobles: rooted but fading.",
        basariliSonuc: {
          mesaj: "The nobles won; your loyalty earned a title.",
          detay: "Last fortress of the old order; its walls crack.",
        },
        basarisizSonuc: {
          mesaj: "The nobles lost; you were purged with them.",
          detay: "The new rich cleaned out the old faction first.",
        },
      },
      {
        metin: "Back the new rich: wealthy but rootless.",
        basariliSonuc: {
          mesaj: "The new rich won; you got a big share of privileges.",
          detay: "Money flows; nobles call you a parvenu.",
        },
        basarisizSonuc: {
          mesaj: "The new rich were broken; you fell with them.",
          detay: "You backed a power that never rose; all lost.",
        },
      },
      {
        metin: "Sell information to both; play your own game.",
        basariliSonuc: {
          mesaj: "You pitted both factions against each other and profited.",
          detay: "Only you know who works for whom.",
        },
        basarisizSonuc: {
          mesaj: "Both factions caught on in one week; that night you paid.",
        },
      },
    ],
  },
  genel_yatirim: {
    baslik: "An Investment Opportunity",
    metin: "Three ways to use your savings: a risky partnership, a mid-risk goods purchase, or safe low-yield land/bonds.",
    secenekler: [
      {
        metin: "Join the risky partnership.",
        basariliSonuc: {
          mesaj: "It paid off; you got back over double your stake.",
          detay: "'How did you know?' You don't say you didn't.",
        },
        basarisizSonuc: {
          mesaj: "Your partner fled; every coin vanished.",
          detay: "The contract was worthless in any court.",
        },
      },
      {
        metin: "Buy goods at medium risk.",
        basariliSonuc: {
          mesaj: "The goods sold well in season; solid profit.",
          detay: "Sums, patience, reward: most of trade.",
        },
        basarisizSonuc: {
          mesaj: "Prices fell; you sold the goods at a loss.",
          detay: "You misread the market; savings evaporated.",
        },
      },
      {
        metin: "Buy land/bonds: low yield, safe.",
        basariliSonuc: {
          mesaj: "The land/bonds began paying steady yearly income.",
          detay: "Won't make you rich, won't leave you hungry.",
        },
        basarisizSonuc: {
          mesaj: "The land's deed had a problem; no refund.",
          detay: "Even safe investments need document checks.",
        },
      },
    ],
  },
  genel_ikilem_aile: {
    baslik: "An Ailing Parent",
    metin: "Your parent fell ill and needs care. Taking them in costs time and money; a carer is pricey; doing nothing can't be undone.",
    secenekler: [
      {
        metin: "Take them in, care yourself.",
        basariliSonuc: {
          mesaj: "You were with them at the end, hand in hand.",
          detay: "Work suffered, but you have no regrets.",
        },
        basarisizSonuc: {
          mesaj: "Caregiving made you ill too, yet you stayed to the end.",
          detay: "Months without sleep; grieving, drained and in debt.",
        },
      },
      {
        metin: "Hire a carer, keep working.",
        basariliSonuc: {
          mesaj: "A good carer: your work held, your parent was looked after.",
          detay: "Twice-monthly visits; always 'work is busy'.",
        },
        basarisizSonuc: {
          mesaj: "The carer neglected them; everyone blamed you.",
          detay: "Money hadn't solved it, only postponed it.",
        },
      },
    ],
  },
  komik_domuz: {
    baslik: "The Runaway Pig",
    metin: "A fat pig escaped in the market and threw it into chaos. The butcher offers a reward; the crowd laughs.",
    secenekler: [
      {
        metin: "Chase the pig, claim the reward.",
        basariliSonuc: {
          mesaj: "You caught the pig at the last second; the market cheered.",
          detay: "The butcher paid up; everyone learned your name.",
        },
        basarisizSonuc: {
          mesaj: "You tripped on a handcart and broke your neck: 'the man who lost to a pig'.",
        },
      },
      {
        metin: "Step aside, cut off its escape, catch it calmly.",
        basariliSonuc: {
          mesaj: "You cut off the alley; the pig fell into your arms.",
          detay: "No sweat; the butcher called you a smart man.",
        },
        basarisizSonuc: {
          mesaj: "The pig came from behind and knocked you down.",
          detay: "Skinned knee, someone else got the pig. You live.",
        },
      },
    ],
  },
  komik_icki_bahsi: {
    baslik: "A Bet at the Tavern",
    metin: "A drunk loudly bets in the tavern: whoever drinks most takes all the money on the table. The crowd cheers.",
    secenekler: [
      {
        metin: "Take the bet, start drinking.",
        basariliSonuc: {
          mesaj: "You drank your rival under the table; all toasted you.",
          detay: "Your head split, but you'd got a taste for the cup.",
        },
        basarisizSonuc: {
          mesaj: "After the tenth jug you collapsed and never woke: 'the martyr of the mead'.",
        },
      },
      {
        metin: "Decline, but hold the stakes as bookmaker.",
        basariliSonuc: {
          mesaj: "You collected the bets; the commission was yours either way.",
          detay: "Only you woke up without a headache.",
        },
        basarisizSonuc: {
          mesaj: "The loser wanted his money back; table overturned, brawl.",
          detay: "Money gone, lip split.",
        },
      },
    ],
  },
  komik_balon: {
    baslik: "The Balloon Trial",
    metin: "An inventor trials a hot-air balloon in public and seeks a paid volunteer. The crowd holds its breath.",
    secenekler: [
      {
        metin: "Volunteer, board the balloon.",
        basariliSonuc: {
          mesaj: "It rose; you were among the first to fly over the city.",
          detay: "Papers printed your name; he offered partnership.",
        },
        basarisizSonuc: {
          mesaj: "The burner lit the basket; the inventor jumped, you couldn't unbuckle.",
        },
      },
      {
        metin: "Don't fly; invest in the inventor.",
        basariliSonuc: {
          mesaj: "The balloon flew; as partner you took a share.",
          detay: "Feet on the ground, pocket full.",
        },
        basarisizSonuc: {
          mesaj: "It caught fire before liftoff; sparks hit your face.",
          detay: "You kept a burn scar; at least you weren't aboard.",
        },
      },
    ],
  },
  komik_sirk: {
    baslik: "The Traveling Circus",
    metin: "The circus owner dares the crowd: whoever nears the lion's cage wins good money. All eyes are on you.",
    secenekler: [
      {
        metin: "Approach the cage, claim the prize.",
        basariliSonuc: {
          mesaj: "The lion stayed calm; the crowd admired your courage.",
          detay: "The lion has no teeth; you won't correct them.",
        },
        basarisizSonuc: {
          mesaj: "You ignored the warning and reached in; the circus remembers 'the curious spectator'.",
        },
      },
      {
        metin: "Strike a deal, sell show tickets.",
        basariliSonuc: {
          mesaj: "You earned ticket commission; no one stared, no one ate you.",
          detay: "The owner seeks you out each time he's in town.",
        },
        basarisizSonuc: {
          mesaj: "Rain cancelled the show; the tickets stayed with you.",
          detay: "The circus left next day, commission unpaid.",
        },
      },
    ],
  },
  tarihi_fransa_prusya_ilan: {
    baslik: "War Declared on Prussia",
    metin: "{yil}. Tension with Prussia turned to war. Papers write 'Berlin in months'; the emperor will lead the army himself.",
    secenekler: [
      {
        metin: "Volunteer, go to the front.",
        basariliSonuc: {
          mesaj: "You stood out for courage in the first clashes.",
          detay: "No easy victory yet, but morale is high.",
        },
        basarisizSonuc: {
          mesaj: "Prussian artillery was far stronger; you were badly wounded.",
          detay: "In the ward you hear officers whispering worriedly.",
        },
      },
      {
        metin: "Offer the army a supply contract.",
        basariliSonuc: {
          mesaj: "Army orders for provisions and boots; first payment in.",
          detay: "Orders grow as the war goes on.",
        },
        basarisizSonuc: {
          mesaj: "Contract signed, but the state delayed payment until war's end.",
          detay: "You delivered; for now it's your pocket paying.",
        },
      },
      {
        metin: "Cross into a neutral country.",
        basariliSonuc: {
          mesaj: "Border crossed easily; you'll follow the war in the papers.",
          detay: "Neighbors ask where you are; nobody knows.",
        },
        basarisizSonuc: {
          mesaj: "The border was shut; turned back as a draft dodger.",
          detay: "Your name is on a list; it will cost you.",
        },
      },
    ],
  },
  tarihi_fransa_prusya_yenilgi: {
    baslik: "After Sedan",
    metin: "{yil}. The emperor was captured at Sedan, the army collapsed, Prussia besieged Paris. Bread is rationed; incomes melted.",
    secenekler: [
      {
        metin: "Share the hardship, stay honest.",
        basariliSonuc: {
          mesaj: "You queued with your neighbors and shared the same bread.",
          detay: "Hard winter, but everyone was in the same boat.",
        },
        basarisizSonuc: {
          mesaj: "Even rations fell short; you went hungry that winter.",
          detay: "Famine spared no one; honesty didn't feed you.",
        },
      },
      {
        metin: "Hoard provisions, sell dear in the famine.",
        basariliSonuc: {
          mesaj: "You sold bread at triple price; never been richer.",
          detay: "You saw a woman weep and kept the price.",
        },
        basarisizSonuc: {
          mesaj: "A hungry mob stormed your stores; goods gone, you were beaten.",
          detay: "The district calls you 'the famine profiteer'.",
        },
      },
      {
        metin: "Protect your family, wait quietly.",
        basariliSonuc: {
          mesaj: "You shut your door and wintered indoors; hard but alive.",
          detay: "Staying in wore you down but protected you.",
        },
        basarisizSonuc: {
          mesaj: "Staying home didn't spare you hunger; coal and food ran out.",
          detay: "Waiting has a price too, paid quietly.",
        },
      },
    ],
  },
  tarihi_kirim_ilan_muttefik: {
    baslik: "Toward the Crimea",
    metin: "{yil}. With allies you went to war against Russia. A great fleet is setting out for the Crimea.",
    secenekler: [
      {
        metin: "Join the army/navy.",
        basariliSonuc: {
          mesaj: "You served on the siege line; hard but proud.",
          detay: "Sevastopol's walls hold, but morale is high.",
        },
        basarisizSonuc: {
          mesaj: "Cholera spread in the trenches; you burned with fever.",
          detay: "In this war disease kills more than bullets.",
        },
      },
      {
        metin: "Supply the fleet with provisions and coal.",
        basariliSonuc: {
          mesaj: "Your contract was approved; profit lasts as long as the war.",
          detay: "New orders at the harbor every week.",
        },
        basarisizSonuc: {
          mesaj: "A rival undercut you; you lost the contract.",
          detay: "Your preparation costs were wasted.",
        },
      },
      {
        metin: "Keep working, stay out of the war.",
        basariliSonuc: {
          mesaj: "You carried on; war news comes from the papers.",
          detay: "While all talk of the front, you mind your stall.",
        },
        basarisizSonuc: {
          mesaj: "War jitters hit trade too; customers dwindled.",
          detay: "Minds are at the front; your business paid for it.",
        },
      },
    ],
  },
  tarihi_kirim_zafer: {
    baslik: "Sevastopol Has Fallen",
    metin: "{yil}. Sevastopol fell; Russia sued for peace. Streets turned festive, new trade routes opened, reparations fed the economy.",
    secenekler: [
      {
        metin: "Seize the new trade opportunities.",
        basariliSonuc: {
          mesaj: "You hit the new markets first; earnings rose for good.",
          detay: "You turned victory's euphoria into money.",
        },
        basarisizSonuc: {
          mesaj: "Everyone rushed in; competition ate prices, you lost.",
          detay: "Everyone ran to the same door; you got lost.",
        },
      },
      {
        metin: "Join the celebrations, network.",
        basariliSonuc: {
          mesaj: "Names you met at the celebrations opened doors.",
          detay: "Victory makes everyone generous.",
        },
        basarisizSonuc: {
          mesaj: "The celebrations cost a lot; the connections didn't pan out.",
          detay: "Everyone toasted; you were left the bill.",
        },
      },
    ],
  },
  tarihi_kirim_ilan_rusya: {
    baslik: "Against the Allies",
    metin: "{yil}. The Ottoman-British-French alliance landed troops in the Crimea. The Tsar demands sacrifice from all.",
    secenekler: [
      {
        metin: "Join the army, defend Sevastopol.",
        basariliSonuc: {
          mesaj: "You held the walls; commanders held you up as an example.",
          detay: "The siege weighs, but walls and you still stand.",
        },
        basarisizSonuc: {
          mesaj: "Allied guns pounded the line; you fell back badly wounded.",
          detay: "Old tactics failed against modern cannon.",
        },
      },
      {
        metin: "Supply the army with horses and provisions.",
        basariliSonuc: {
          mesaj: "You took a supply post; for now you earn well.",
          detay: "Your job is behind the front.",
        },
        basarisizSonuc: {
          mesaj: "Payment postponed till war's end; you paid the costs.",
          detay: "Treasury empty; contract good on paper, no cash.",
        },
      },
      {
        metin: "Withdraw to the countryside, avoid the war.",
        basariliSonuc: {
          mesaj: "Calm in the countryside; the war's noise stayed far.",
          detay: "You ignored the Tsar's call and told no one.",
        },
        basarisizSonuc: {
          mesaj: "Your draft dodging was noticed; the village shunned you.",
          detay: "In some places, skipping war is a crime.",
        },
      },
    ],
  },
  tarihi_kirim_yenilgi_rusya: {
    baslik: "The Fall of Sevastopol",
    metin: "{yil}. Sevastopol fell after a year-long siege; the Tsar sued for peace. Taxes rose, grain prices multiplied.",
    secenekler: [
      {
        metin: "Share the hardship, stay honest.",
        basariliSonuc: {
          mesaj: "You tightened your belt like everyone; no privilege.",
          detay: "Defeat is bitter but shared; you're not alone.",
        },
        basarisizSonuc: {
          mesaj: "The tax hike was heavy; you barely survived winter.",
          detay: "The bill hit the poor first; you were one.",
        },
      },
      {
        metin: "Stockpile wheat, sell high in the crisis.",
        basariliSonuc: {
          mesaj: "You sold wheat at triple price; your strongbox never fuller.",
          detay: "Some nights those faces cost you sleep.",
        },
        basarisizSonuc: {
          mesaj: "A mob stormed your warehouse; goods looted, you beaten.",
          detay: "They needed a scapegoat for the defeat: you.",
        },
      },
    ],
  },
  zincir_asker_baslangic: {
    baslik: "Joining the Regiment",
    metin: "First day in the regiment: you fell in line at the gate and are a soldier now. The sergeant eyes recruits coldly.",
    secenekler: [
      {
        metin: "Look disciplined, follow rules.",
        basariliSonuc: {
          mesaj: "The sergeant liked you: 'That one'll make a soldier.'",
          detay: "You matched the barracks' rhythm in a week.",
        },
        basarisizSonuc: {
          mesaj: "Clumsy at drill; the sergeant scolded you before all.",
          detay: "A bad start, but no going back.",
        },
      },
      {
        metin: "Fit in your own way.",
        basariliSonuc: {
          mesaj: "Neither standout nor laggard; you blended into the ranks.",
          detay: "No one knows your name; in barracks that's safe.",
        },
        basarisizSonuc: {
          mesaj: "Your slackness showed: 'I've got my eye on you.'",
          detay: "Day-one watch list is no good sign.",
        },
      },
    ],
  },
  zincir_asker_pusu: {
    baslik: "The First Ambush",
    metin: "In your first year, on routine patrol, your unit was ambushed. In the chaos you must decide in seconds.",
    secenekler: [
      {
        metin: "Charge, answer fire with fire.",
        basariliSonuc: {
          mesaj: "You helped repel the attack; the commander noted your name.",
          detay: "Survivors look at each other differently now.",
        },
        basarisizSonuc: {
          mesaj: "A bullet grazed your shoulder; you were dragged back bloody.",
          detay: "First wound, first year; 'you're lucky,' they said.",
        },
      },
      {
        metin: "Lead the retreat, gather the unit.",
        basariliSonuc: {
          mesaj: "An orderly retreat; nobody was lost.",
          detay: "No glory, but everyone came back alive.",
        },
        basarisizSonuc: {
          mesaj: "The retreat collapsed; men went missing, you took the blame.",
          detay: "Some think you panicked in your first test.",
        },
      },
    ],
  },
  zincir_asker_terhis: {
    baslik: "The End of the Service Years",
    metin: "After years of service the commander called you: 'Your duty is done, son. Choose your own path.'",
    secenekler: [
      {
        metin: "Stay in the army as a career soldier.",
        basariliSonuc: {
          mesaj: "You signed on long-term; you're a veteran now.",
          detay: "The regiment is family now; civilian life is foreign.",
        },
        basarisizSonuc: {
          mesaj: "You stayed, but the new commander pays you less heed.",
          detay: "Years passed, same rank. Some careers just stall.",
        },
      },
      {
        metin: "Be discharged, return to civilian life.",
        basariliSonuc: {
          mesaj: "You took your bonus; now you make your own decisions.",
          detay: "You still count your steps; but no more orders.",
        },
        basarisizSonuc: {
          mesaj: "Discharge delayed; part of your bonus lost to red tape.",
          detay: "Years served, less than expected; but you're free.",
        },
      },
    ],
  },
  zincir_tuccar_teklif: {
    baslik: "A Big Order Offer",
    metin: "A merchant from a far city offers a huge supply deal lasting years. Accepting ties up most of your capital.",
    secenekler: [
      {
        metin: "Sign, enter the big game.",
        basariliSonuc: {
          mesaj: "Signed; you're in a partnership that will run for years.",
          detay: "Your capital rides on it: big win or ruin.",
        },
        basarisizSonuc: {
          mesaj: "Terms were heavier than thought, but no turning back.",
          detay: "Even early costs were high; doubt sets in.",
        },
      },
      {
        metin: "Refuse, focus on your current business.",
        basariliSonuc: {
          mesaj: "You took no risk; business stayed calm as ever.",
          detay: "A missed chance or a dodged disaster? Unknowable.",
        },
        basarisizSonuc: {
          mesaj: "Hearing your refusal, he took the offer to your rival.",
          detay: "Your rival grew, but you took no risk.",
        },
      },
    ],
  },
  zincir_tuccar_kervan_sorunu: {
    baslik: "Trouble on the Road",
    metin: "The first load is on the road; the messenger gasps: 'The caravan hit a storm and bandits; your partner awaits your decision.'",
    secenekler: [
      {
        metin: "Send extra money, mount an armed rescue.",
        basariliSonuc: {
          mesaj: "The rescue worked; most of the load and your men were saved.",
          detay: "Your partner saw your resolve; the deal can go on.",
        },
        basarisizSonuc: {
          mesaj: "Despite extra spending, most of the load was lost.",
          detay: "You spent and lost; the deal's future is murkier.",
        },
      },
      {
        metin: "Accept the losses, keep the contract.",
        basariliSonuc: {
          mesaj: "Partner understood; contract continues, slightly delayed.",
          detay: "Such losses come with trade.",
        },
        basarisizSonuc: {
          mesaj: "Your partner resented your indifference; relations strained.",
          detay: "The deal continues, but not as warmly.",
        },
      },
      {
        metin: "Use the loss as a pretext; claim fake guild insurance.",
        basariliSonuc: {
          mesaj: "You filed papers as if all goods burned; the guild paid hugely.",
          detay: "You kept some cargo and an unjust fortune.",
        },
        basarisizSonuc: {
          mesaj: "Inspectors caught the fraud at once! Heavy fine, stained name.",
        },
      },
    ],
  },
  zincir_din_gorev_teklifi: {
    baslik: "A Distant Mission",
    metin: "Your superiors propose you for a years-long mission to a small, distant congregation. Your life here stays behind.",
    secenekler: [
      {
        metin: "Accept the mission, set out.",
        basariliSonuc: {
          mesaj: "You packed, bade your congregation farewell and set out.",
          detay: "Leaving was harder than expected; the road is long.",
        },
        basarisizSonuc: {
          mesaj: "Preparing to depart cost more than you expected.",
          detay: "Still, you decided; the mission is yours.",
        },
      },
      {
        metin: "Refuse the mission, stay with your congregation.",
        basariliSonuc: {
          mesaj: "Your congregation rejoiced; you didn't abandon them.",
          detay: "Missed experience, but people await you here.",
        },
        basarisizSonuc: {
          mesaj: "Your superiors logged your refusal as 'lack of ambition'.",
          detay: "Congregation pleased; superiors may overlook you.",
        },
      },
    ],
  },
  zincir_din_gorev_donus: {
    baslik: "Time to Return",
    metin: "After years on your distant mission, your superiors recalled you. Time to return to the life you left.",
    secenekler: [
      {
        metin: "Return to your old congregation.",
        basariliSonuc: {
          mesaj: "On your return the congregation welcomed you like a hero.",
          detay: "Distant lands changed you: gain and loneliness both.",
        },
        basarisizSonuc: {
          mesaj: "The congregation had grown used to your replacement.",
          detay: "The price of years away: your place is taken.",
        },
      },
      {
        metin: "Stay there, build a new congregation.",
        basariliSonuc: {
          mesaj: "You stayed and founded a small congregation of your own.",
          detay: "Your old life is a memory; this one is yours.",
        },
        basarisizSonuc: {
          mesaj: "Without enough support, you got by with a small flock.",
          detay: "Not easy; everything must be built from scratch.",
        },
      },
    ],
  },
  genel_pazar_yeri_soytarisi: {
    baslik: "The Traveling Jester",
    metin: "A masked jester in the market square tries to pull you from the crowd as a 'volunteer' for his act.",
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
          metin: "The jester shoved you down; the crowd laughs.",
          geriCekilMetni: "Hold your temper, slip away quietly.",
          geriCekilSonucu: {
            mesaj: "You were remembered as the coward who can't take a joke.",
            detay: "Sometimes slipping away hurts most.",
          },
          devamMetni: "Rip off his mask and turn the joke on him!",
          devamSonucu: {
            mesaj: "The mask fell: a wanted swindler! You're the square's hero.",
            detay: "Not mocked, you did the mocking!",
          },
        },
      },
      {
        metin: "Decline politely, step back.",
        basariliSonuc: {
          mesaj: "Your refusal was accepted; the jester picked someone else.",
          detay: "You dodged the shame; life went on calmly.",
        },
        basarisizSonuc: {
          mesaj: "The jester made your refusal a joke too and mocked you.",
          detay: "Trying to flee sometimes draws more attention.",
        },
      },
    ],
  },
  genel_gokyuzunde_isik: {
    baslik: "A Light in the Sky",
    metin: "A bright, tailed light appeared in the night sky. Rumors call it an 'omen of the apocalypse'; some are panicking.",
    secenekler: [
      {
        metin: "Try to calm the people.",
        basariliSonuc: {
          mesaj: "Your calm soothed the panic; people trusted you.",
          detay: "The light vanished; but they remembered you.",
        },
        basarisizSonuc: {
          mesaj: "Some wouldn't listen; the panic lasted a bit longer.",
          detay: "Fear is sometimes stronger than reason.",
        },
      },
      {
        metin: "Get swept up too, make preparations.",
        basariliSonuc: {
          mesaj: "Your stockpile was useless, but you were prepared.",
          detay: "The light vanished; a bit embarrassing, no harm.",
        },
        basarisizSonuc: {
          mesaj: "Your panic buying became a neighborhood joke.",
          detay: "The nickname 'apocalypse man' stuck a while.",
        },
      },
    ],
  },
  genel_hastalikli_kis: {
    baslik: "A Harsh Winter",
    metin: "This winter is unusually harsh; wood and provisions prices shot up and many neighbors fell ill.",
    secenekler: [
      {
        metin: "Stockpile extra wood and provisions.",
        basariliSonuc: {
          mesaj: "You wintered warm and fed, without falling ill.",
          detay: "Neighbors fell sick; you were prepared.",
        },
        basarisizSonuc: {
          mesaj: "Your stock got you by, but prices were higher than expected.",
          detay: "You survived winter, but your purse is lighter.",
        },
      },
      {
        metin: "Get by frugally, economize.",
        basariliSonuc: {
          mesaj: "You were thrifty and wintered cheaply.",
          detay: "Cold, but you endured; sometimes little is enough.",
        },
        basarisizSonuc: {
          mesaj: "The cold made you ill; it became pneumonia.",
          detay: "Economizing, you skimped on your health.",
        },
      },
    ],
  },
  genel_kisisel_hastalik: {
    baslik: "Burning with Fever",
    metin: "Your fever hasn't broken for days and you're worsening. You must decide; this won't pass on its own.",
    secenekler: [
      {
        metin: "Buy medicine (25 Gold), see the best doctor.",
        basariliSonuc: {
          mesaj: "The medicine worked fast; you're up within days.",
          detay: "Money gone, health back; a good trade.",
        },
        basarisizSonuc: {
          mesaj: "The medicine helped, but recovery was slow.",
          detay: "Not every cure is a miracle.",
        },
      },
      {
        metin: "Take a folk remedy (5 Gold), trust luck.",
        basariliSonuc: {
          mesaj: "The foul-smelling mixture worked! You recovered in days.",
          detay: "Village recipes sometimes really work.",
        },
        basarisizSonuc: {
          mesaj: "The mixture failed and you got a bit worse.",
          detay: "Cheap fixes can cost more in the end.",
        },
      },
      {
        metin: "Do nothing, just rest.",
        basariliSonuc: {
          mesaj: "Your body recovered by itself; you were lucky.",
          detay: "Sometimes the body finds its own way.",
        },
        basarisizSonuc: {
          mesaj: "The illness ran untreated; you grew much worse.",
          detay: "Some illnesses don't pass with rest.",
        },
      },
    ],
  },
  genel_esrarengiz_mektup: {
    baslik: "An Unsigned Letter",
    metin: "An unsigned letter was slipped under your door: someone says your spouse/partner is cheating, with no proof.",
    secenekler: [
      {
        metin: "Investigate the claim.",
        basariliSonuc: {
          mesaj: "The claim was baseless, a jealous person's game.",
          detay: "Peace is back; you'll always wonder who wrote it.",
        },
        basarisizSonuc: {
          mesaj: "Your digging caused needless fights and mistrust.",
          detay: "Sometimes not asking beats asking.",
        },
      },
      {
        metin: "Tear up the letter, ignore it.",
        basariliSonuc: {
          mesaj: "You forgot the letter; life went on normally.",
          detay: "Some stones are best left unturned.",
        },
        basarisizSonuc: {
          mesaj: "Ignored, but it never left your mind; mistrust set in.",
          detay: "Ignoring isn't the same as forgetting.",
        },
      },
    ],
  },
  genel_zar_oyunu_borcu: {
    baslik: "An Unpaid Gambling Debt",
    metin: "An acquaintance never paid his gambling debt and now dodges you. Demand it publicly or quietly forget it.",
    secenekler: [
      {
        metin: "Demand your money publicly.",
        basariliSonuc: {
          mesaj: "Embarrassed, the man paid at once.",
          detay: "No one asked you for a loan again; you got paid.",
        },
        basarisizSonuc: {
          mesaj: "He pleaded poverty and made a scene; you looked small.",
          detay: "Your insistence made you look ridiculous too.",
        },
      },
      {
        metin: "Quietly forget it, keep the friendship.",
        basariliSonuc: {
          mesaj: "You forgot the money; the friendship survived.",
          detay: "Small loss beats big unease, you told yourself.",
        },
        basarisizSonuc: {
          mesaj: "Seeing you'd forgotten the debt, he asked for another loan.",
          detay: "Good will gets taken advantage of.",
        },
      },
    ],
  },
  genel_meydan_okuyan_ressam: {
    baslik: "The Street Painter",
    metin: "A square painter offers a free portrait: 'you have an interesting face'. No telling how it'll turn out.",
    secenekler: [
      {
        metin: "Pose.",
        basariliSonuc: {
          mesaj: "A lovely portrait, exhibited with your name on it.",
          detay: "Being 'the man in the painting' feels odd but nice.",
        },
        basarisizSonuc: {
          mesaj: "The portrait was hardly flattering; everyone laughed.",
          detay: "'Interesting face' wasn't much of a compliment.",
        },
      },
      {
        metin: "Decline politely.",
        basariliSonuc: {
          mesaj: "You declined and went on your way.",
          detay: "Maybe a missed memory, but no risk taken.",
        },
        basarisizSonuc: {
          mesaj: "The painter held you up; you were on edge all day.",
          detay: "A simple 'no' can take a while.",
        },
      },
    ],
  },
  genel_fotografhane_reklami: {
    baslik: "An Advertising Photograph",
    metin: "A new shop wants someone 'ordinary but trustworthy-looking' for an ad photo. You were chosen; it'll hang in the window.",
    secenekler: [
      {
        metin: "Accept, pose.",
        basariliSonuc: {
          mesaj: "Your photo hung in the window; acquaintances laugh at you.",
          detay: "Small extra income and a funny local fame.",
        },
        basarisizSonuc: {
          mesaj: "You blinked at the flash; a comic shot hung in the window.",
          detay: "Everyone laughs; at least you got paid.",
        },
      },
      {
        metin: "Refuse the offer.",
        basariliSonuc: {
          mesaj: "You refused and went on with your ordinary life.",
          detay: "Shop windows aren't for everyone.",
        },
        basarisizSonuc: {
          mesaj: "The owner pushed; you bought something small to escape.",
          detay: "Even saying no sometimes has a price.",
        },
      },
    ],
  },
  genel_kurtlar_saldirisi: {
    baslik: "A Wolf Pack",
    metin: "Starving wolves from the harsh winter are raiding livestock near the village.",
    secenekler: [
      {
        metin: "Join the hunt.",
        basariliSonuc: {
          mesaj: "You scattered the pack; the village relaxed.",
          detay: "You flinched but held your ground.",
        },
        basarisizSonuc: {
          mesaj: "A wolf bit you; the wound ached for long.",
          detay: "This time nature won.",
        },
      },
      {
        metin: "Stay home, pen the animals in.",
        basariliSonuc: {
          mesaj: "Animals safe inside; wolves went to another house.",
          detay: "Your neighbor's animals died.",
        },
        basarisizSonuc: {
          mesaj: "A wolf forced the barn door and got in.",
          detay: "You lost an animal.",
        },
      },
    ],
  },
  genel_yeni_icat_saati: {
    baslik: "The Pocket Watch Fashion",
    metin: "A fine pocket watch is all the rage; those without one seem backward. It is costly.",
    secenekler: [
      {
        metin: "Buy the watch.",
        basariliSonuc: {
          mesaj: "The watch turned heads; your circle finds you more modern.",
          detay: "A small accessory, big impact.",
        },
        basarisizSonuc: {
          mesaj: "The watch broke in a week; its parts were fake.",
          detay: "Fashion was a costly lesson.",
        },
      },
      {
        metin: "Skip it.",
        basariliSonuc: {
          mesaj: "You kept your money; the fashion soon passed.",
          detay: "Sense pays off.",
        },
        basarisizSonuc: {
          mesaj: "Some circles sneered: 'not even a watch'.",
          detay: "Sense has a social price.",
        },
      },
    ],
  },
  genel_kutuphane_bulgusu: {
    baslik: "A Forgotten Manuscript",
    metin: "In an old library you found a valuable manuscript no one had noticed. Hand it in or keep it.",
    secenekler: [
      {
        metin: "Hand it in.",
        basariliSonuc: {
          mesaj: "It was a valuable historical document; your name was recorded.",
          detay: "You became known for honesty.",
        },
        basarisizSonuc: {
          mesaj: "You handed it in; it was ordinary and no one cared.",
          detay: "Honesty isn't always rewarded.",
        },
      },
      {
        metin: "Quietly keep it.",
        basariliSonuc: {
          mesaj: "It was valuable; you secretly sold it to a collector.",
          detay: "Money in hand, guilt on mind.",
        },
        basarisizSonuc: {
          mesaj: "A worthless copy; the secret was for nothing.",
          detay: "The risk only wore on your conscience.",
        },
      },
    ],
  },
  genel_deprem: {
    baslik: "The Earth's Wrath",
    metin: "A midnight earthquake cracked houses and collapsed one. By morning the city tends its wounds.",
    secenekler: [
      {
        metin: "Help dig people from the rubble.",
        basariliSonuc: {
          mesaj: "You pulled a family out alive; the city talks of you.",
          detay: "The lives saved were worth it.",
        },
        basarisizSonuc: {
          mesaj: "A chunk of wall fell on you in the rubble.",
          detay: "You were hurt helping.",
        },
      },
      {
        metin: "Protect your home and family first.",
        basariliSonuc: {
          mesaj: "Your family is safe; the house repaired.",
          detay: "You helped no one else.",
        },
        basarisizSonuc: {
          mesaj: "Your house was damaged and neighbors drew away.",
          detay: "Sometimes you can't protect anyone.",
        },
      },
    ],
  },
  genel_yanlis_kimlik: {
    baslik: "They Mistook You for Someone Else",
    metin: "Men corner you, naming a debtor. You aren't him, but you look just like him.",
    secenekler: [
      {
        metin: "Stay calm, prove who you are.",
        basariliSonuc: {
          mesaj: "They listened and saw you were the wrong man.",
          detay: "Your heart raced, but it ended well.",
        },
        basarisizSonuc: {
          mesaj: "They didn't believe you; they beat you and took your money.",
          detay: "You paid another's debt with your body.",
        },
      },
      {
        metin: "Distract the crowd, run.",
        basariliSonuc: {
          mesaj: "The crowd froze and you slipped away.",
          detay: "At home you couldn't stop laughing.",
        },
        basarisizSonuc: {
          mesaj: "You were caught running; fleeing raised suspicion.",
          detay: "Running made you look guilty.",
        },
      },
    ],
  },
  genel_kutlama_daveti_yanlislikla: {
    baslik: "An Invitation Sent by Mistake",
    metin: "A grand invitation arrived in your name, likely by clerical error. If you go, no one may notice.",
    secenekler: [
      {
        metin: "Go, try your luck.",
        basariliSonuc: {
          mesaj: "No one noticed; you met impressive people.",
          detay: "Being there mattered more than the invite.",
        },
        basarisizSonuc: {
          mesaj: "The host didn't know you and had you shown out.",
          detay: "The shame lingered a long time.",
        },
      },
      {
        metin: "Send the invitation back.",
        basariliSonuc: {
          mesaj: "Honesty brought a small peace.",
          detay: "Missed a night, conscience clear.",
        },
        basarisizSonuc: {
          mesaj: "You sent it back, but curiosity gnawed at you.",
          detay: "You wondered 'what if I'd gone'.",
        },
      },
    ],
  },
  genel_tarihi_veba_bilgini: {
    baslik: "Knowledge from Distant Lands",
    metin: "A traveler from the east says isolating the sick slows disease. Most find the idea strange.",
    secenekler: [
      {
        metin: "Hear him out, try it.",
        basariliSonuc: {
          mesaj: "Your measures slowed the disease in your neighborhood.",
          detay: "People began to see you differently.",
        },
        basarisizSonuc: {
          mesaj: "Neighbors mocked it as 'foreign nonsense' and ignored it.",
          detay: "New ideas take time; there wasn't enough.",
        },
      },
      {
        metin: "Ignore it, trust tradition.",
        basariliSonuc: {
          mesaj: "You kept to usual methods; no one found you odd.",
          detay: "You fit in, maybe missed a chance.",
        },
        basarisizSonuc: {
          mesaj: "That year disease spread faster than ever around you.",
          detay: "Maybe it would have helped; you'll never know.",
        },
      },
    ],
  },
  genel_sanayi_bulusu_hevesi: {
    baslik: "An Amateur Inventor",
    metin: "Your neighbor swears his odd machine will ease life and asks for a small investment. He is very sure.",
    secenekler: [
      {
        metin: "Invest a little.",
        basariliSonuc: {
          mesaj: "It worked! You and your neighbor started a small production.",
          detay: "You won where everyone else passed.",
        },
        basarisizSonuc: {
          mesaj: "The machine fell apart on first trial; you grieved most.",
          detay: "Some enthusiasm is only enthusiasm.",
        },
      },
      {
        metin: "Refuse politely.",
        basariliSonuc: {
          mesaj: "You refused; your neighbor was a bit put out but understood.",
          detay: "Some risks aren't worth it.",
        },
        basarisizSonuc: {
          mesaj: "He sold the machine to someone else, who got rich.",
          detay: "The missed chance stung.",
        },
      },
    ],
  },
  genel_kayip_mektup_yillar_sonra: {
    baslik: "A Letter That Came Years Later",
    metin: "The postman delivered a letter misdirected years ago. The sender had confessed love for you.",
    secenekler: [
      {
        metin: "Try to find the sender.",
        basariliSonuc: {
          mesaj: "You found them; married now, you parted after a warm talk.",
          detay: "Making peace with the past felt good.",
        },
        basarisizSonuc: {
          mesaj: "They had moved to another city; no trace.",
          detay: "Some stories stay unfinished.",
        },
      },
      {
        metin: "Read it, keep it as a memory.",
        basariliSonuc: {
          mesaj: "You read it, smiled and boxed it away.",
          detay: "Sometimes that's enough.",
        },
        basarisizSonuc: {
          mesaj: "The letter moved you; you wandered distracted for days.",
          detay: "The past barges in uninvited.",
        },
      },
    ],
  },
  genel_sarhos_soylu_kavgasi: {
    baslik: "A Drunk Noble's Insolence",
    metin: "A drunk noble insulted you at the inn and all await your reaction.",
    secenekler: [
      {
        metin: "Answer back sharply.",
        basariliSonuc: {
          mesaj: "Your words drew applause; the noble left abashed.",
          detay: "'The man who silenced a noble'.",
        },
        basarisizSonuc: {
          mesaj: "The noble had his men throw you out.",
          detay: "Honor had a price.",
        },
      },
      {
        metin: "Ignore it, leave quietly.",
        basariliSonuc: {
          mesaj: "You left the inn without a scene.",
          detay: "You simmered but stayed out of trouble.",
        },
        basarisizSonuc: {
          mesaj: "The inn took your silence for cowardice.",
          detay: "Sense sometimes costs reputation.",
        },
      },
    ],
  },
  genel_kutu_muze_esyasi: {
    baslik: "An Antique Curiosity",
    metin: "Antiques are in fashion; an old heirloom from your attic may be valuable.",
    secenekler: [
      {
        metin: "Show an expert.",
        basariliSonuc: {
          mesaj: "It was valuable; you sold it to a collector at a good price.",
          detay: "The attic paid off unexpectedly.",
        },
        basarisizSonuc: {
          mesaj: "A plain imitation; you only paid the expert's fee.",
          detay: "Not every old thing is valuable.",
        },
      },
      {
        metin: "Keep it as an heirloom.",
        basariliSonuc: {
          mesaj: "You kept it; a memory for the next generation.",
          detay: "Not everything is measured in money.",
        },
        basarisizSonuc: {
          mesaj: "Years later you learned it was very valuable, but it was lost.",
          detay: "Even the right choice can bring regret.",
        },
      },
    ],
  },
  kisilik_sinirli_hakaret: {
    baslik: "Patience Lost",
    metin: "In the market someone shoved you on purpose, no apology. You're seething.",
    secenekler: [
      {
        metin: "Let your anger out, put him in his place.",
        basariliSonuc: {
          mesaj: "He was cornered; the crowd sided with you.",
          detay: "Your anger worked this time.",
        },
        basarisizSonuc: {
          mesaj: "The fight grew; you were both beaten and fined.",
          detay: "Your temper burned you again.",
        },
      },
      {
        metin: "Grit your teeth, breathe, walk away.",
        basariliSonuc: {
          mesaj: "You barely held back, but did; tension lingers.",
          detay: "This time you won.",
        },
        basarisizSonuc: {
          mesaj: "Even holding back, you seethed and couldn't sleep.",
          detay: "Suppressed anger waits to explode.",
        },
      },
    ],
  },
  kisilik_sakin_kaos: {
    baslik: "In the Middle of the Storm",
    metin: "In a fire panic, while all scream, you stay calm. It drew attention.",
    secenekler: [
      {
        metin: "Use your calm to direct the crowd.",
        basariliSonuc: {
          mesaj: "Your calm broke the panic; people evacuated in order.",
          detay: "You became a natural leader.",
        },
        basarisizSonuc: {
          mesaj: "Calm wasn't enough; the crowd ignored you.",
          detay: "Even the calmest voice can't quell chaos.",
        },
      },
      {
        metin: "Quietly save yourself.",
        basariliSonuc: {
          mesaj: "You calmly reached safety unnoticed.",
          detay: "Calm was enough for you.",
        },
        basarisizSonuc: {
          mesaj: "Later they asked: 'why didn't you help?'",
          detay: "Calm is mistaken for indifference.",
        },
      },
    ],
  },
  kisilik_kibirli_kucumseme: {
    baslik: "The Man You Looked Down On",
    metin: "You belittled a plainly dressed man; he was a powerful family head in disguise.",
    secenekler: [
      {
        metin: "Blackmail him with his secret.",
        basariliSonuc: {
          mesaj: "You threatened to expose him; he paid a hefty hush fee.",
          detay: "Rich now, with a powerful enemy.",
        },
        basarisizSonuc: {
          mesaj: "The noble sent assassins; your pride cost you your life.",
        },
      },
      {
        metin: "Apologize, swallow your pride.",
        basariliSonuc: {
          mesaj: "Apology accepted; he was understanding.",
          detay: "At least you made no great enemy.",
        },
        basarisizSonuc: {
          mesaj: "He found the apology insincere and shut you out of business.",
          detay: "Your pride cost you dearly.",
        },
      },
      {
        metin: "Shrug it off, who he is doesn't matter.",
        basariliSonuc: {
          mesaj: "Nothing happened; he seems to have forgotten.",
          detay: "Don't count on luck.",
        },
        basarisizSonuc: {
          mesaj: "He used his influence to make life hard for you.",
          detay: "Your pride won you a powerful enemy.",
        },
      },
    ],
  },
  kisilik_alayci_dil: {
    baslik: "A Poisoned Joke",
    metin: "At a gathering you cracked a mocking joke at an influential man; all laughed but him.",
    secenekler: [
      {
        metin: "Defend your joke, don't back down.",
        basariliSonuc: {
          mesaj: "The crowd backed you; you're now known as blunt.",
          detay: "Your sharp tongue earned respect.",
        },
        basarisizSonuc: {
          mesaj: "He was powerful; he quietly began sabotaging your business.",
          detay: "You began paying for your mockery.",
        },
      },
      {
        metin: "Say it was a joke, smooth it over.",
        basariliSonuc: {
          mesaj: "Tension eased; he was offended but it went no further.",
          detay: "You reined in your tongue.",
        },
        basarisizSonuc: {
          mesaj: "Your attempt looked even more smug; no one was convinced.",
          detay: "Sometimes the damage is already done.",
        },
      },
    ],
  },
  kisilik_umutlu_karanlikta_isik: {
    baslik: "A Light in the Dark",
    metin: "After hard times everyone lost hope. You still believe things will improve.",
    secenekler: [
      {
        metin: "Rally people, revive hope.",
        basariliSonuc: {
          mesaj: "Your words gave strength; you resolved to endure together.",
          detay: "Your hope built a community spirit.",
        },
        basarisizSonuc: {
          mesaj: "Some called your optimism out of touch.",
          detay: "Hope doesn't convince everyone.",
        },
      },
      {
        metin: "Carry your hope quietly.",
        basariliSonuc: {
          mesaj: "Your hope kept you standing, unseen.",
          detay: "Unshared, hope still suffices.",
        },
        basarisizSonuc: {
          mesaj: "Reality didn't match your hope; you were let down.",
          detay: "Unrewarded, but you didn't give up.",
        },
      },
    ],
  },
  kisilik_umutsuz_neden_ugrasayim: {
    baslik: "Why Bother",
    metin: "A real chance appeared, but a voice says 'it's pointless anyway'.",
    secenekler: [
      {
        metin: "Try anyway.",
        basariliSonuc: {
          mesaj: "Surprisingly it worked; maybe not all is pointless.",
          detay: "Trying turned out better than expected.",
        },
        basarisizSonuc: {
          mesaj: "As expected, it failed.",
          detay: "'I knew it,' you said, but it hurt.",
        },
      },
      {
        metin: "Don't bother, it won't matter.",
        basariliSonuc: {
          mesaj: "You let it pass; life went on as usual.",
          detay: "You wouldn't admit 'what if'.",
        },
        basarisizSonuc: {
          mesaj: "Seeing someone else succeed with it stung.",
          detay: "Your hopelessness deepened.",
        },
      },
    ],
  },
  kisilik_depresif_agir_gunler: {
    baslik: "Heavy Days",
    metin: "For weeks a heavy weight won't lift; getting up seems impossible. They say 'pull yourself together', but the dark pulls you in.",
    secenekler: [
      {
        metin: "Ask for help, open up.",
        basariliSonuc: {
          mesaj: "Opening up wasn't hard; the load eased and you rose.",
          detay: "A shared load is lighter.",
        },
        basarisizSonuc: {
          mesaj: "They didn't understand: 'you're exaggerating'.",
          detay: "Opening up to the wrong person weighs more.",
        },
      },
      {
        metin: "Tell no one, wait it out in bed.",
        basariliSonuc: {
          mesaj: "You got through the days; no one noticed.",
          detay: "Carrying it alone wore you down, but you lived.",
        },
        basarisizSonuc: {
          mesaj: "It swallowed you; you lost your job and your health failed.",
          detay: "The darkness consumes your body too.",
        },
      },
    ],
  },
  kisilik_cesur_kimsenin_girmedigi: {
    baslik: "Where No One Goes",
    metin: "A collapsed ruin is said to hold something valuable, but all call it too dangerous.",
    secenekler: [
      {
        metin: "Go in, risk it.",
        basariliSonuc: {
          mesaj: "You found something valuable where no one dared go.",
          detay: "Called 'the fearless' in town.",
        },
        basarisizSonuc: {
          mesaj: "The ruin collapsed; you barely escaped the rubble.",
          detay: "Courage nearly cost your life.",
        },
      },
      {
        metin: "Be sensible, skip the risk.",
        basariliSonuc: {
          mesaj: "You stayed away; uneasy, but safe.",
          detay: "Not going in took strength too.",
        },
        basarisizSonuc: {
          mesaj: "Someone else took the treasure; they teased: 'why didn't you go?'",
          detay: "Even not going in needed explaining.",
        },
      },
    ],
  },
  kisilik_huzunlu_gecmisin_golgesi: {
    baslik: "The Shadow of the Past",
    metin: "A place, object or name recalled an old pain; your sadness stirred again.",
    secenekler: [
      {
        metin: "Face your sadness, accept the memory.",
        basariliSonuc: {
          mesaj: "Facing it hurt but eased you.",
          detay: "Acceptance brought unexpected peace.",
        },
        basarisizSonuc: {
          mesaj: "It was too heavy; you couldn't speak for days.",
          detay: "Some memories don't pass easily.",
        },
      },
      {
        metin: "Hide your sadness, carry on.",
        basariliSonuc: {
          mesaj: "You kept it inside and worked on; no one noticed.",
          detay: "Sadness stays your quiet companion.",
        },
        basarisizSonuc: {
          mesaj: "Hiding it wore you down; sadness became physical weight.",
          detay: "Suppressed feelings settle in the body.",
        },
      },
    ],
  },
  kisilik_sosyal_herkesin_tanidigi: {
    baslik: "A Face Everyone Knows",
    metin: "Your wide circle tipped you off to an opportunity you couldn't normally reach.",
    secenekler: [
      {
        metin: "Use your connections.",
        basariliSonuc: {
          mesaj: "The door opened thanks to your connections.",
          detay: "A network can beat capital.",
        },
        basarisizSonuc: {
          mesaj: "The chance wasn't as good as it looked; time wasted.",
          detay: "A wide circle also opens wrong doors.",
        },
      },
      {
        metin: "Offer it to a friend.",
        basariliSonuc: {
          mesaj: "Your friend seized it and stayed grateful.",
          detay: "Opening a door for others feels better.",
        },
        basarisizSonuc: {
          mesaj: "Your friend failed to use it; you were both let down.",
          detay: "Good intentions don't always work.",
        },
      },
    ],
  },
  kisilik_icedonuk_kalabaliktan_kacis: {
    baslik: "Escape from the Crowd",
    metin: "You're expected at a big, loud party; you could meet important people, but the thought exhausts you.",
    secenekler: [
      {
        metin: "Push yourself, go.",
        basariliSonuc: {
          mesaj: "Hard as it was, you went and made a few valuable contacts.",
          detay: "Draining, but not for nothing.",
        },
        basarisizSonuc: {
          mesaj: "Overwhelmed, you left early, and it was noticed.",
          detay: "Pushing yourself cost you dearly.",
        },
      },
      {
        metin: "Decline with a polite excuse.",
        basariliSonuc: {
          mesaj: "A calm evening at home restored you.",
          detay: "Knowing your peace is strength too.",
        },
        basarisizSonuc: {
          mesaj: "An important chance came up at the party; you missed it.",
          detay: "It protected you but closed a door.",
        },
      },
    ],
  },
  kisilik_sivridilli_soz_bedeli: {
    baslik: "The Price of Your Words",
    metin: "A sharp remark you blurted at an influential man spread fast. Some call it courage, some disrespect.",
    secenekler: [
      {
        metin: "Stand by your words.",
        basariliSonuc: {
          mesaj: "You became known for honesty; many thought the same.",
          detay: "Your sharp tongue read as courage.",
        },
        basarisizSonuc: {
          mesaj: "He was powerful; he quietly made things hard for you.",
          detay: "You're paying for your words now.",
        },
      },
      {
        metin: "Apologize, mend the relationship.",
        basariliSonuc: {
          mesaj: "Apology accepted; relations mended, pride dented.",
          detay: "Reining in your tongue worked.",
        },
        basarisizSonuc: {
          mesaj: "Apology found insincere; the damage was done.",
          detay: "Some words can't be taken back.",
        },
      },
    ],
  },
  kisilik_yumusakbasli_herkesin_sevdigi: {
    baslik: "Kindness Exploited",
    metin: "Everyone likes your gentle nature; someone abuses it with a heavy, unfair demand.",
    secenekler: [
      {
        metin: "Say no, gently but firmly.",
        basariliSonuc: {
          mesaj: "Your firm stance earned respect; he backed off.",
          detay: "Gentle doesn't mean boundaryless.",
        },
        basarisizSonuc: {
          mesaj: "Some were surprised: 'that's not like him'.",
          detay: "Boundaries are sometimes necessary.",
        },
      },
      {
        metin: "Accept as always.",
        basariliSonuc: {
          mesaj: "You agreed; he left pleased, you diminished.",
          detay: "Pleasing everyone shrinks your share.",
        },
        basarisizSonuc: {
          mesaj: "Your yes invited him to use you again and again.",
          detay: "Your kindness was exploited; you're angry at yourself.",
        },
      },
    ],
  },
  kisilik_rekabetci_kim_daha_iyi: {
    baslik: "Who Is Better",
    metin: "An acquaintance openly competes with you: who earns more, who is better known.",
    secenekler: [
      {
        metin: "Accept the rivalry, give your all.",
        basariliSonuc: {
          mesaj: "You won by a wide margin; even your rival congratulated you.",
          detay: "Your competitive streak paid off.",
        },
        basarisizSonuc: {
          mesaj: "Your rival left you behind; losing hit hard.",
          detay: "Rivalry sometimes pushes you into too much risk.",
        },
      },
      {
        metin: "Ignore the rivalry.",
        basariliSonuc: {
          mesaj: "You stayed out; uneasy, but business ran healthily.",
          detay: "Skipping some races is maturity.",
        },
        basarisizSonuc: {
          mesaj: "Your rival read your absence as conceding defeat.",
          detay: "Even withdrawing counted as defeat.",
        },
      },
    ],
  },
  kisilik_hirsli_yeterince_degil: {
    baslik: "Never Enough",
    metin: "Your business does well, but a voice says 'not enough, there must be more'. A big move is risky.",
    secenekler: [
      {
        metin: "Risk it to grow.",
        basariliSonuc: {
          mesaj: "The big move paid off; your business jumped a level.",
          detay: "Ambition carried you; the voice won't quiet.",
        },
        basarisizSonuc: {
          mesaj: "The move failed; you lost part of your solid business.",
          detay: "Ambition ignored enough; you paid dearly.",
        },
      },
      {
        metin: "Settle for what you have.",
        basariliSonuc: {
          mesaj: "You settled; uneasy, but your business stayed stable.",
          detay: "You reined in ambition this time.",
        },
        basarisizSonuc: {
          mesaj: "Even settled, dissatisfaction kept you sleepless for days.",
          detay: "For the ambitious, 'enough' is torment.",
        },
      },
    ],
  },
  kisilik_vicdanli_vicdanin_sesi: {
    baslik: "The Voice of Your Conscience",
    metin: "An easy, profitable path no one would notice would harm an innocent. Your conscience nags.",
    secenekler: [
      {
        metin: "Heed your conscience, refuse.",
        basariliSonuc: {
          mesaj: "You heeded your conscience; no one knows, but you're at peace.",
          detay: "You sleep easy.",
        },
        basarisizSonuc: {
          mesaj: "You did right, but it cost more than expected.",
          detay: "Conscience sometimes has a real price.",
        },
      },
      {
        metin: "Say 'I must', take the easy path.",
        basariliSonuc: {
          mesaj: "You won, but the innocent's face haunts you.",
          detay: "The money weighs less than the poison.",
        },
        basarisizSonuc: {
          mesaj: "You got neither the gain nor a clear conscience.",
          detay: "Acting against nature hurts twice.",
        },
      },
    ],
  },
  yerlesim_sinir_baskini: {
    baslik: "A Raid on the Border",
    metin: "At midnight raiders hit your border village. You woke to gunfire, burning houses and screams.",
    secenekler: [
      {
        metin: "Grab your weapon, defend the village.",
        basariliSonuc: {
          mesaj: "You helped repel the raid; villagers are grateful.",
          detay: "You got your share of spoils and thanks.",
        },
        basarisizSonuc: {
          mesaj: "Badly wounded in the fight; healing took weeks.",
          detay: "The border's price stays in your flesh.",
        },
      },
      {
        metin: "Take your family, flee to the forest.",
        basariliSonuc: {
          mesaj: "You saved your life; half your house was plundered.",
          detay: "Border folk choose life over property.",
        },
        basarisizSonuc: {
          mesaj: "You ran into raiders; lost belongings and took wounds.",
          detay: "On the border, peace is short-term rent.",
        },
      },
    ],
  },
  yerlesim_sehir_salgin_kalabaligi: {
    baslik: "The Crowded Bazaar",
    metin: "The bazaar is packed, but a fever illness is spreading. Going is risky; staying away costs chances.",
    secenekler: [
      {
        metin: "Join the bazaar, seize chances.",
        basariliSonuc: {
          mesaj: "You caught a good bargain and no illness.",
          detay: "Opportunity is in the crowd.",
        },
        basarisizSonuc: {
          mesaj: "Back from the bazaar your fever rose; days in bed.",
          detay: "Illness spreads as fast as opportunity.",
        },
      },
      {
        metin: "Stay home, get through the month.",
        basariliSonuc: {
          mesaj: "Safe from illness, but you missed the bazaar's chances.",
          detay: "Some months are just survival.",
        },
        basarisizSonuc: {
          mesaj: "A neighbor still brought the illness; a small expense got you through.",
          detay: "Total isolation in a city is near impossible.",
        },
      },
    ],
  },
  sanayi_fabrika_grevi: {
    baslik: "A Factory Strike",
    metin: "{bolge} factory workers struck for better pay and conditions. Streets are tense, soldiers are coming. Pick a side.",
    secenekler: [
      {
        metin: "Back the strike, stand with workers.",
        basariliSonuc: {
          mesaj: "The strike ended in partial victory; workers count you as theirs.",
          detay: "Siding with the oppressed is a proud choice.",
        },
        basarisizSonuc: {
          mesaj: "The strike was crushed; you were named a ringleader and beaten.",
          detay: "Factory owners don't forget.",
        },
      },
      {
        metin: "Side with the employers.",
        basariliSonuc: {
          mesaj: "Employers were pleased; your strongbox filled a bit.",
          detay: "Winners pick the right side.",
        },
        basarisizSonuc: {
          mesaj: "Workers didn't forget; you were attacked one night.",
          detay: "Short-term gain, long-term price.",
        },
      },
    ],
  },
  sanayi_sendika_toplantisi: {
    baslik: "A Secret Union Meeting",
    metin: "A new union secretly recruits in your neighborhood. {dost} urges you to join; strong solidarity, but risky in the state's eyes.",
    secenekler: [
      {
        metin: "Join, act together with {dost}.",
        basariliSonuc: {
          mesaj: "The meeting went well; {dost} is glad you're there.",
          detay: "Solidarity rewards unity.",
        },
        basarisizSonuc: {
          mesaj: "Police raided the meeting; you barely escaped.",
          detay: "First attempts rarely run smooth.",
        },
      },
      {
        metin: "Don't join; stay independent and safe.",
        basariliSonuc: {
          mesaj: "You stayed independent; {dost} was disappointed but respected it.",
          detay: "Not every road is walked together.",
        },
        basarisizSonuc: {
          mesaj: "{dost} called you a 'boss's toady' around town.",
          detay: "Independence can be read as betrayal.",
        },
      },
    ],
  },
  sanayi_gazete_haberi: {
    baslik: "A Newspaper Article",
    metin: "A local paper is writing about you. The reporter asks: an honest interview or an embellished hero tale?",
    secenekler: [
      {
        metin: "Give an honest interview.",
        basariliSonuc: {
          mesaj: "Plain but effective; readers liked your sincerity.",
          detay: "Honesty outlasts show.",
        },
        basarisizSonuc: {
          mesaj: "The interview drew no attention; it sat on the back pages.",
          detay: "Not every honest story makes the front page.",
        },
      },
      {
        metin: "Embellish it, play the hero.",
        basariliSonuc: {
          mesaj: "The article made a splash; your name is on every lip.",
          detay: "A well-told lie can outrun truth.",
        },
        basarisizSonuc: {
          mesaj: "Your exaggerations surfaced; a rival paper called you a 'liar'.",
          detay: "Lies spread fast and die fast.",
        },
      },
    ],
  },
  sanayi_tren_yolculugu: {
    baslik: "A Train Journey",
    metin: "The new railway reaches a big opportunity in a distant city in hours. The ticket is dear, but the chance seems unmissable.",
    secenekler: [
      {
        metin: "Buy the ticket, chase the chance.",
        basariliSonuc: {
          mesaj: "The trip paid off handsomely; the deal was signed.",
          detay: "Those who turn distance to chance win.",
        },
        basarisizSonuc: {
          mesaj: "On arrival you learned the chance had gone to someone else.",
          detay: "The train is on time; chances don't wait.",
        },
      },
      {
        metin: "Skip the risk, keep your money.",
        basariliSonuc: {
          mesaj: "You kept your money; the chance went but your purse didn't.",
          detay: "A missed chance isn't always a loss.",
        },
        basarisizSonuc: {
          mesaj: "Hearing what those who went earned, it stung.",
          detay: "Missed chances linger in the mind.",
        },
      },
    ],
  },
  sanayi_gaz_lambasi_sokaklari: {
    baslik: "The Gaslit Streets",
    metin: "Gaslit streets come alive at night: coffeehouses, gambling dens, society salons. You hear {rakip} is out too.",
    secenekler: [
      {
        metin: "Mingle in society, make contacts.",
        basariliSonuc: {
          mesaj: "A pleasant evening; you made a few valuable contacts.",
          detay: "The real social life starts at night.",
        },
        basarisizSonuc: {
          mesaj: "You clashed with {rakip} and lost money gambling.",
          detay: "Night life is as risky as it is alluring.",
        },
      },
      {
        metin: "Stay home, spend a quiet night.",
        basariliSonuc: {
          mesaj: "A calm night; you woke rested.",
          detay: "You needn't go out every night.",
        },
        basarisizSonuc: {
          mesaj: "Hearing everyone discuss the night, you felt left out.",
          detay: "Staying home has a small social price.",
        },
      },
    ],
  },
  rutbe3_asker_saldiri_karari: {
    baslik: "A Command Decision",
    metin: "You command now. Scouts report a weak-looking enemy unit in a nearby valley; it could be a trap.",
    secenekler: [
      {
        metin: "Forward! Order a dawn raid.",
        basariliSonuc: {
          mesaj: "The raid struck true; the enemy scattered, spoils shared.",
          detay: "Your name is legend in high command.",
        },
        basarisizSonuc: {
          mesaj: "A trap. Your unit took heavy losses; you barely escaped.",
          detay: "It scarred your body and reputation.",
        },
      },
      {
        metin: "Wait, gather intelligence first.",
        basariliSonuc: {
          mesaj: "Patience paid off; it was a trap, and you withdrew unscathed.",
          detay: "Cautious commanders write epics quietly.",
        },
        basarisizSonuc: {
          mesaj: "The chance slipped away; high command questioned your indecision.",
          detay: "A right decision made late still costs.",
        },
      },
    ],
  },
  rutbe3_tuccar_lonca_karari: {
    baslik: "A Guild Decision",
    metin: "As guild master you set bread and grain prices. Famine looms; low prices mean giving up profit.",
    secenekler: [
      {
        metin: "Keep prices low, stand with the people.",
        basariliSonuc: {
          mesaj: "Word spread; the people call you the guild's most just master.",
          detay: "Partners grumbled, but your standing peaked.",
        },
        basarisizSonuc: {
          mesaj: "Good intentions, but carrying it out cost far more.",
          detay: "The guild's coffers paid for long.",
        },
      },
      {
        metin: "Keep prices high, protect profit.",
        basariliSonuc: {
          mesaj: "Your strongbox filled, but more people turn from your name.",
          detay: "Wealth and love seldom come together.",
        },
        basarisizSonuc: {
          mesaj: "The people rioted, warehouses were looted; most profit vanished.",
          detay: "Hunger upends the most careful sums.",
        },
      },
    ],
  },
  rutbe3_din_vaiz_karari: {
    baslik: "A Pulpit Decision",
    metin: "You are chief preacher; the flock is tense. Some want a harsh sermon on other faiths, some tolerance.",
    secenekler: [
      {
        metin: "Call for tolerance and unity.",
        basariliSonuc: {
          mesaj: "Your sermon resonated; even other groups spoke of you with respect.",
          detay: "A measured word outlasts the sword.",
        },
        basarisizSonuc: {
          mesaj: "Hardliners called you 'weak'; your word carries less weight.",
          detay: "Tolerance never pleases everyone.",
        },
      },
      {
        metin: "Preach harsh and exclusionary.",
        basariliSonuc: {
          mesaj: "Your sermon fired up the flock; loyalty and tension rose.",
          detay: "Authority and conscience drift apart.",
        },
        basarisizSonuc: {
          mesaj: "Your words sparked street clashes; even the flock drew away.",
          detay: "A word can become a fire beyond control.",
        },
      },
    ],
  },
  tepki_amire_meydan_okuma: {
    baslik: "Your Patience Snapped",
    metin: "{amir} criticized you unfairly again, in front of everyone. Your anger rises.",
    secenekler: [
      {
        metin: "Swallow it, stay silent.",
        basariliSonuc: {
          mesaj: "You swallowed it; the anger piled up inside.",
          detay: "Silence wins, or just postpones.",
        },
        basarisizSonuc: {
          mesaj: "You tried to swallow it but shook; everyone noticed.",
          detay: "Suppressed anger shows even more.",
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
          metin: "{amir} is stunned; all are watching. Go on?",
          geriCekilMetni: "Soften it: 'I didn't mean it.'",
          geriCekilSonucu: {
            mesaj: "You backed off; tension eased, regret remained.",
            detay: "Sometimes the bravest thing is silence.",
          },
          devamMetni: "No. Stand by what you said.",
          devamSonucu: {
            mesaj: "You went all the way. {amir} walked off silent, but punishment came.",
            detay: "It cost you, but you stayed true.",
          },
        },
      },
    ],
  },
  tepki_ticaret_sert_tehdit: {
    baslik: "Tension at the Table",
    metin: "Your old supplier tries to raise the agreed price at the last moment. You're angry; you're about to threaten to end the relationship.",
    secenekler: [
      {
        metin: "Stay calm, offer a new price.",
        basariliSonuc: {
          mesaj: "You found a fair middle ground; the relationship held.",
          detay: "Calm is the best bargaining tactic.",
        },
        basarisizSonuc: {
          mesaj: "The supplier disliked your offer and held firm.",
          detay: "Calm doesn't always pay off.",
        },
      },
      {
        metin: "Slam the table, threaten to end it.",
        basariliSonuc: {
          mesaj: "Not used.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
        onTepki: {
          metin: "The supplier scowls. The threat risks the bond.",
          geriCekilMetni: "Calm down, take the threat back.",
          geriCekilSonucu: {
            mesaj: "You softened at the last moment; the supplier gave a small discount.",
            detay: "A step back is sometimes the shortest way.",
          },
          devamMetni: "No. Press the threat.",
          devamSonucu: {
            mesaj: "The supplier gave in, but he no longer trusts you.",
            detay: "You won the bargain, lost the trust.",
          },
        },
      },
    ],
  },
  tepki_din_cemaat_meydan_okuma: {
    baslik: "A Moment at the Pulpit",
    metin: "During your sermon someone openly questioned you. All eyes are on you; your word will bolster your authority or shake it.",
    secenekler: [
      {
        metin: "Give a patient, measured answer.",
        basariliSonuc: {
          mesaj: "Your measured answer calmed the flock; your standing rose.",
          detay: "Patience is the pulpit's strongest weapon.",
        },
        basarisizSonuc: {
          mesaj: "Your answer didn't convince; the murmuring went on.",
          detay: "A calm answer doesn't always pay off.",
        },
      },
      {
        metin: "Assert your authority sharply.",
        basariliSonuc: {
          mesaj: "Not used.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
        onTepki: {
          metin: "The flock hushes. Harshness may bolster or split.",
          geriCekilMetni: "Soften your voice, end the dispute.",
          geriCekilSonucu: {
            mesaj: "You softened your tone at the last moment; the tension eased.",
            detay: "Authority is sometimes a lowered voice.",
          },
          devamMetni: "No. Keep the harsh tone.",
          devamSonucu: {
            mesaj: "Your words echoed; some respected you more, some left the congregation.",
            detay: "Authority sometimes comes with a split.",
          },
        },
      },
    ],
  },
  tepki_asker_amirine_itaatsizlik: {
    baslik: "Defying an Order",
    metin: "{amir} gave you an openly unjust, even dangerous order. Discipline demands obedience but your conscience objects.",
    secenekler: [
      {
        metin: "Carry out the order unquestioned.",
        basariliSonuc: {
          mesaj: "You obeyed; your discipline was praised but unease remained.",
          detay: "Obedience sometimes silences conscience.",
        },
        basarisizSonuc: {
          mesaj: "You obeyed but things didn't go as planned.",
          detay: "Blind obedience has a price too.",
        },
      },
      {
        metin: "Openly defy the order.",
        basariliSonuc: {
          mesaj: "Not used.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
        onTepki: {
          metin: "{amir}: 'Disobeying?' Your answer shapes your fate.",
          geriCekilMetni: "Back down, accept the order.",
          geriCekilSonucu: {
            mesaj: "You accepted at the last moment; {amir} said nothing but regret remained.",
            detay: "Sometimes you choose survival over standing firm.",
          },
          devamMetni: "No. Refuse the order.",
          devamSonucu: {
            mesaj: "You refused; your conscience eased but the punishment was swift.",
            detay: "Doing right had a price; you don't regret it.",
          },
        },
      },
    ],
  },
  zincir_asker_baskin_karari: {
    baslik: "The Moment of the Raid",
    metin: "Your unit raided a small enemy caravan and took the spoils. The commander asks: 'Do we stop here?'",
    secenekler: [
      {
        metin: "Gather the spoils, fall back.",
        basariliSonuc: {
          mesaj: "You gathered the spoils and fell back safely.",
          detay: "Commander: 'Greed is the greatest enemy.'",
        },
        basarisizSonuc: {
          mesaj: "The retreat got messy, a few were wounded but the spoils stayed.",
          detay: "Still, a dangerous withdrawal.",
        },
      },
      {
        metin: "Push on for more.",
        basariliSonuc: {
          mesaj: "You pushed on and took a second caravan.",
          detay: "Morale is sky high, but how long will luck last?",
        },
        basarisizSonuc: {
          mesaj: "You were ambushed while pushing on; a few men were lost.",
          detay: "Greed's price was heavy.",
        },
      },
    ],
  },
  zincir_asker_ganimet_devami: {
    baslik: "Is This Enough?",
    metin: "The commander asks: 'Are these spoils enough, or do we strike again?' All eyes are on you.",
    secenekler: [
      {
        metin: "Enough. Let's go back with our gains.",
        basariliSonuc: {
          mesaj: "You returned with your gains; the unit reached base safe.",
          detay: "The wisest victory is knowing when to stop.",
        },
        basarisizSonuc: {
          mesaj: "Going back disappointed some of the soldiers.",
          detay: "Not everyone agrees.",
        },
      },
      {
        metin: "No, let's strike again.",
        basariliSonuc: {
          mesaj: "The second wave succeeded; your unit's name spread.",
          detay: "Luck held again.",
        },
        basarisizSonuc: {
          mesaj: "The last attack ended in disaster; the unit took heavy losses.",
          detay: "Greed's bill was heavy.",
        },
      },
    ],
  },
  zincir_asker_dusman_kacisi: {
    baslik: "The Fleeing Enemy",
    metin: "After a short clash the enemy scattered and fled. A few are wounded and slow; chase them and you'll catch up.",
    secenekler: [
      {
        metin: "Let them go, hold your position.",
        basariliSonuc: {
          mesaj: "You held your position; the unit rested.",
          detay: "Victory is sometimes kept by not chasing.",
        },
        basarisizSonuc: {
          mesaj: "Some soldiers called your waiting cowardice.",
          detay: "Caution isn't always praised.",
        },
      },
      {
        metin: "Go after them, finish it.",
        basariliSonuc: {
          mesaj: "You caught the fleeing men; a complete victory.",
          detay: "But now you're in unknown terrain.",
        },
        basarisizSonuc: {
          mesaj: "Your formation broke while chasing; a few men fell behind.",
          detay: "Hunger for victory becomes a trap.",
        },
      },
    ],
  },
  zincir_asker_takip_karari: {
    baslik: "Unknown Terrain",
    metin: "The chase dragged you into an unfamiliar forest. Something moves ahead: reinforcements or just wind? On or back?",
    secenekler: [
      {
        metin: "Turn back, don't risk it.",
        basariliSonuc: {
          mesaj: "You turned back; the unit reached base safely.",
          detay: "Cautious commanders live long.",
        },
        basarisizSonuc: {
          mesaj: "Some saw turning back as a missed chance.",
          detay: "Pleasing everyone is impossible.",
        },
      },
      {
        metin: "Go in, risk the danger.",
        basariliSonuc: {
          mesaj: "You found an abandoned enemy camp; the spoils were the unit's.",
          detay: "Courage was rewarded this time.",
        },
        basarisizSonuc: {
          mesaj: "The forest was a real trap; the unit took heavy losses.",
          detay: "It wasn't the wind.",
        },
      },
    ],
  },
  zincir_tuccar_agir_pazarlik: {
    baslik: "A Hard Offer",
    metin: "A big buyer wants your goods far below market price. Accept for a small sure profit; refuse and risk a bigger gain.",
    secenekler: [
      {
        metin: "Accept, secure the deal.",
        basariliSonuc: {
          mesaj: "You accepted; the profit is low but certain.",
          detay: "A small sure gain beats a big risk.",
        },
        basarisizSonuc: {
          mesaj: "You accepted but the buyer toughened the terms at the last moment.",
          detay: "You can't always come out ahead.",
        },
      },
      {
        metin: "Refuse, hold out for a better price.",
        basariliSonuc: {
          mesaj: "Your insistence worked; the buyer raised the price.",
          detay: "Courage paid off.",
        },
        basarisizSonuc: {
          mesaj: "The buyer gave up and went to another merchant.",
          detay: "Insisting doesn't always pay.",
        },
      },
    ],
  },
  zincir_tuccar_pazarlik_sonucu: {
    baslik: "The Buyer Came Back",
    metin: "The same buyer is back days later with a bigger order but tighter terms. Tie yourself further to this relationship?",
    secenekler: [
      {
        metin: "Thank them, leave it here.",
        basariliSonuc: {
          mesaj: "You politely refused; the relationship stayed balanced.",
          detay: "You needn't seize every chance.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal offended the buyer; you lost a small customer.",
          detay: "Sometimes 'no' has a price.",
        },
      },
      {
        metin: "Accept the big order.",
        basariliSonuc: {
          mesaj: "The order went smoothly; your trade grew a notch.",
          detay: "Some risks do pay off.",
        },
        basarisizSonuc: {
          mesaj: "Things went wrong with the order; you took a loss.",
          detay: "Big chances bring big risk.",
        },
      },
    ],
  },
  genclik_kustahligi: {
    baslik: "Youthful Insolence",
    metin: "You openly disagree with a respected elder. You're torn between raising your voice before everyone and staying silent.",
    secenekler: [
      {
        metin: "Answer back, defend your view.",
        basariliSonuc: {
          mesaj: "The young admired your courage: 'someone with a mind of their own'.",
          detay: "Young voices spark change.",
        },
        basarisizSonuc: {
          mesaj: "Scolded as 'disrespectful', the elders turned cold for a while.",
          detay: "Not every rebellion is understood at once.",
        },
      },
      {
        metin: "Be quiet, listen respectfully.",
        basariliSonuc: {
          mesaj: "Your silence was read as maturity.",
          detay: "Silence is a show of strength too.",
        },
        basarisizSonuc: {
          mesaj: "Swallowing it left you uneasy; you slept badly that night.",
          detay: "Swallowed words echo inside.",
        },
      },
    ],
  },
  arkadas_grubu_baskisi: {
    baslik: "Peer Pressure",
    metin: "Your friends want you in a dangerous, slightly stupid midnight adventure. 'Don't come if you're scared,' they laugh.",
    secenekler: [
      {
        metin: "Join in, show your courage.",
        basariliSonuc: {
          mesaj: "The night became an unforgettable adventure; you're a legend in the group.",
          detay: "Some memories make you smile for years.",
        },
        basarisizSonuc: {
          mesaj: "The adventure went wrong; you got home hurt and broke.",
          detay: "Courage is sometimes carelessness.",
        },
      },
      {
        metin: "Refuse, choose your own path.",
        basariliSonuc: {
          mesaj: "You refused; next day, hearing what befell them, you were proved right.",
          detay: "Saying no is sometimes wisest.",
        },
        basarisizSonuc: {
          mesaj: "They teased you as a 'coward' for a while.",
          detay: "Not every refusal is understood.",
        },
      },
    ],
  },
  ilk_hayal_kirikligi: {
    baslik: "The First Great Disappointment",
    metin: "Months of work blew up in your hands. It feels like your first real failure.",
    secenekler: [
      {
        metin: "Try again, don't give up.",
        basariliSonuc: {
          mesaj: "You succeeded the second time; failure made you stronger.",
          detay: "Some lessons are learned by falling.",
        },
        basarisizSonuc: {
          mesaj: "The second try failed too; your confidence was shaken.",
          detay: "A second chance brings no victory.",
        },
      },
      {
        metin: "Accept it, turn to something else.",
        basariliSonuc: {
          mesaj: "You accepted the disappointment and turned your energy elsewhere.",
          detay: "Sometimes the wisest move is giving up.",
        },
        basarisizSonuc: {
          mesaj: "You gave up but a 'what if' lingered for long.",
          detay: "Abandoned work won't let go.",
        },
      },
    ],
  },
  genc_asker_ilk_darbe: {
    baslik: "The First Sword Blow",
    metin: "On the drill ground the sergeant pits you in a duel against a veteran. Your first sword swing at a real opponent.",
    secenekler: [
      {
        metin: "Attack with all your might.",
        basariliSonuc: {
          mesaj: "Your move surprised your opponent; the sergeant never looked away.",
          detay: "First victories are remembered most.",
        },
        basarisizSonuc: {
          mesaj: "The veteran laid you flat in front of everyone.",
          detay: "Pain is the best teacher.",
        },
      },
      {
        metin: "Be cautious, only defend.",
        basariliSonuc: {
          mesaj: "Your caution kept you standing; even the veteran was surprised.",
          detay: "Surviving beats winning.",
        },
        basarisizSonuc: {
          mesaj: "Found too cautious, they teased you as 'gutless'.",
          detay: "Not all caution is praised.",
        },
      },
    ],
  },
  genc_tuccar_ilk_pazarlik: {
    baslik: "The First Negotiation",
    metin: "Without your master, on your own, you make your first big bargain. The merchant opposite is experienced and impatient.",
    secenekler: [
      {
        metin: "Boldly offer a high price.",
        basariliSonuc: {
          mesaj: "Your courage paid off; you struck a good price.",
          detay: "You'll never forget your first bargain win.",
        },
        basarisizSonuc: {
          mesaj: "Thinking you 'green', he dealt with someone else.",
          detay: "Not all courage pays.",
        },
      },
      {
        metin: "Start with a modest, safe offer.",
        basariliSonuc: {
          mesaj: "Your offer was accepted; a small but safe gain.",
          detay: "The first step should be small.",
        },
        basarisizSonuc: {
          mesaj: "The haggling dragged on; no deal was struck.",
          detay: "Not every bargain ends in a deal.",
        },
      },
    ],
  },
  genc_din_adami_ilk_vaaz: {
    baslik: "The First Pulpit",
    metin: "The head priest is ill; you must lead a small service. The crowd is small, but it is your first real pulpit.",
    secenekler: [
      {
        metin: "Speak in your own words, sincerely.",
        basariliSonuc: {
          mesaj: "Your words moved them: 'This young one will be great.'",
          detay: "Sincerity is the strongest sermon.",
        },
        basarisizSonuc: {
          mesaj: "You stammered from nerves; some whispered and smiled.",
          detay: "No first try is flawless.",
        },
      },
      {
        metin: "Read the classic text you memorized.",
        basariliSonuc: {
          mesaj: "The safe choice worked; the service went smoothly.",
          detay: "The known road is safest.",
        },
        basarisizSonuc: {
          mesaj: "Reciting by rote left you unsatisfied; you hadn't found your voice.",
          detay: "Safety sometimes costs originality.",
        },
      },
    ],
  },
  genclik_hatiralari: {
    baslik: "Memories of Youth",
    metin: "By the fire, grandchildren or young neighbors ask about your youth. You have much to tell.",
    secenekler: [
      {
        metin: "Tell your stories.",
        basariliSonuc: {
          mesaj: "Your stories enchanted all; you talked into the small hours.",
          detay: "A shared life is lived twice.",
        },
        basarisizSonuc: {
          mesaj: "Your stories fell flat; the young changed the subject.",
          detay: "Not every generation is enchanted.",
        },
      },
      {
        metin: "Live it quietly within yourself.",
        basariliSonuc: {
          mesaj: "You kept the memories and relived them in quiet peace.",
          detay: "Some treasures are worth more unshared.",
        },
        basarisizSonuc: {
          mesaj: "Your silence deepened your loneliness.",
          detay: "Not sharing has a price too.",
        },
      },
    ],
  },
  bedenin_sinirlari: {
    baslik: "The Body's Limits",
    metin: "Today you couldn't do what you once did easily. Your body is no longer what it was.",
    secenekler: [
      {
        metin: "Push yourself like in your youth.",
        basariliSonuc: {
          mesaj: "You did it! Your body still answers like in the old days.",
          detay: "Will sometimes beats age.",
        },
        basarisizSonuc: {
          mesaj: "You overdid it and lay bedridden for days.",
          detay: "The body overrules the will.",
        },
      },
      {
        metin: "Accept your age, slow down.",
        basariliSonuc: {
          mesaj: "Accepting your age was more peaceful than expected.",
          detay: "Wisdom is knowing your limits.",
        },
        basarisizSonuc: {
          mesaj: "Slowing down hurt your pride; you sighed for the old days.",
          detay: "Acceptance takes time.",
        },
      },
    ],
  },
  mirasin_ne_olacak: {
    baslik: "What Becomes of Your Legacy?",
    metin: "You think about what you'll leave behind. Will the knowledge, wealth and experience of years go with you?",
    secenekler: [
      {
        metin: "Pass wealth and wisdom to a young one.",
        basariliSonuc: {
          mesaj: "The youth you chose listened closely; your legacy will live.",
          detay: "The true legacy is knowledge, not gold.",
        },
        basarisizSonuc: {
          mesaj: "The one you chose abused your trust and wasted what you gave.",
          detay: "Not every trust goes to the worthy.",
        },
      },
      {
        metin: "Keep it, trust no one.",
        basariliSonuc: {
          mesaj: "You kept everything; the sense of security eased you.",
          detay: "Caution is a choice too.",
        },
        basarisizSonuc: {
          mesaj: "Loneliness made you question the meaning of all you kept.",
          detay: "An unshared legacy loses meaning.",
        },
      },
    ],
  },
  yasli_asker_son_nobet: {
    baslik: "The Last Watch",
    metin: "The commander asks: 'Stand watch one more time, one last time?' You're to guide a young soldier.",
    secenekler: [
      {
        metin: "Accept, don your uniform one last time.",
        basariliSonuc: {
          mesaj: "What you taught the young soldier will save his life; you were proud.",
          detay: "Some watches last a lifetime.",
        },
        basarisizSonuc: {
          mesaj: "The cold night watch wore your body out.",
          detay: "An aging body lacks the old endurance.",
        },
      },
      {
        metin: "Politely decline, time to rest.",
        basariliSonuc: {
          mesaj: "Your refusal was understood; you chose the rest you deserve.",
          detay: "A lifetime of service earns rest.",
        },
        basarisizSonuc: {
          mesaj: "Some of the young met it with disappointment.",
          detay: "Not every retirement is applauded.",
        },
      },
    ],
  },
  yasli_tuccar_dukkani_devretmek: {
    baslik: "Handing Over the Shop",
    metin: "Is it time to hand over the business you've built for years? A young assistant seems ready.",
    secenekler: [
      {
        metin: "Trust them, hand it over.",
        basariliSonuc: {
          mesaj: "Your assistant took over with great care; your legacy lives on, to your pride.",
          detay: "Effort lives on in the best hands.",
        },
        basarisizSonuc: {
          mesaj: "The assistant made mistakes; a shadow fell on your reputation.",
          detay: "Not every handover is flawless.",
        },
      },
      {
        metin: "No, keep the reins.",
        basariliSonuc: {
          mesaj: "You kept running it; habit reassures you.",
          detay: "For some, work is life itself.",
        },
        basarisizSonuc: {
          mesaj: "Carrying the whole load at your age wore you out.",
          detay: "Not letting go has a price.",
        },
      },
    ],
  },
  yasli_din_adami_son_vaaz: {
    baslik: "The Last Sermon",
    metin: "Your health is failing; the congregation invites you to the pulpit for perhaps your most important sermon. It may be remembered for years.",
    secenekler: [
      {
        metin: "Share a lifetime of wisdom.",
        basariliSonuc: {
          mesaj: "Your words moved them to tears; a sermon retold for years.",
          detay: "A life's essence fits in few sentences.",
        },
        basarisizSonuc: {
          mesaj: "Excitement and fatigue overcame you; you cut the sermon short.",
          detay: "The body can't keep up with the spirit.",
        },
      },
      {
        metin: "Give a short, plain talk.",
        basariliSonuc: {
          mesaj: "Your plain words came from the heart; they were grateful.",
          detay: "Few words say much.",
        },
        basarisizSonuc: {
          mesaj: "Much you wanted to say stayed unsaid.",
          detay: "Words unspoken in time stay inside.",
        },
      },
    ],
  },
  derinlik_asker_agir_yara: {
    baslik: "Between the Swords",
    metin: "At the battle's fiercest, two enemy soldiers pincer you. Retreat stains your honor; fighting on is risky.",
    secenekler: [
      {
        metin: "Fall back behind your shield.",
        basariliSonuc: {
          mesaj: "You fell back in time; your shield protected you.",
          detay: "Surviving sometimes needs a step back.",
        },
        basarisizSonuc: {
          mesaj: "Even retreating, you took a sword blow.",
          detay: "The battlefield has no safe corner.",
        },
      },
      {
        metin: "Fight on against both.",
        basariliSonuc: {
          mesaj: "You beat both; the unit welcomed you as an epic hero.",
          detay: "The day your name became legend.",
        },
        basarisizSonuc: {
          mesaj: "A blow ruined your arm; the surgeon couldn't save it.",
          detay: "You won't fight as before, but you live.",
        },
      },
    ],
  },
  derinlik_asker_yakin_dovus: {
    baslik: "The Melee",
    metin: "Your unit enters the melee. The commander asks: front rank with both hands, or back with a spear?",
    secenekler: [
      {
        metin: "Take the front, wield your sword two-handed.",
        kilitAciklamasi: "Your body and mind no longer allow it.",
        basariliSonuc: {
          mesaj: "Your courage in front became the unit's morale.",
          detay: "No one dared stand before you.",
        },
        basarisizSonuc: {
          mesaj: "The front rank took a heavy toll; wounded but standing.",
          detay: "Your courage had a price.",
        },
      },
      {
        metin: "Stay back, support with a spear.",
        basariliSonuc: {
          mesaj: "Your support held the unit's line.",
          detay: "Not all heroism is in front.",
        },
        basarisizSonuc: {
          mesaj: "Even in the back, you took your share of the chaos.",
          detay: "The battlefield has no fully safe place.",
        },
      },
    ],
  },
  derinlik_asker_savas_travmasi: {
    baslik: "The End of the Siege",
    metin: "After weeks of siege the city fell. What you saw in the streets was war's ugliest face. Will it stay with you?",
    secenekler: [
      {
        metin: "Suppress it, carry on.",
        basariliSonuc: {
          mesaj: "You set aside what you saw and carried on.",
          detay: "Some manage it; some only pretend.",
        },
        basarisizSonuc: {
          mesaj: "What you saw shook you inside; nights are no longer the same.",
          detay: "War wounds the mind; unseen but deep.",
        },
      },
      {
        metin: "Step aside for a while.",
        basariliSonuc: {
          mesaj: "The time you gave yourself helped; you returned stronger.",
          detay: "Kindness to yourself isn't weakness.",
        },
        basarisizSonuc: {
          mesaj: "Some counted your withdrawal as weakness.",
          detay: "Not everyone understands emotional weight.",
        },
      },
    ],
  },
  derinlik_tuccar_lonca_ihanet: {
    baslik: "Turning Your Back on the Guild",
    metin: "You could break guild rules and strike a very profitable secret deal with a rival city. If found out, it's a betrayal with no return.",
    secenekler: [
      {
        metin: "Refuse, stay loyal to the guild.",
        basariliSonuc: {
          mesaj: "You kept your loyalty; your place in the guild is solid.",
          detay: "Some chances aren't worth risking trust.",
        },
        basarisizSonuc: {
          mesaj: "You refused but the chance stayed on your mind.",
          detay: "Some 'what ifs' linger.",
        },
      },
      {
        metin: "Make the deal secretly.",
        basariliSonuc: {
          mesaj: "The deal went unnoticed; your purse swelled.",
          detay: "Such luck doesn't last forever.",
        },
        basarisizSonuc: {
          mesaj: "Your betrayal came out; the guild expelled you for good.",
          detay: "No guild protection now; everything is on you.",
        },
      },
    ],
  },
  derinlik_din_papa_karsi_gelme: {
    baslik: "A Word Against the Church",
    metin: "You find a decision of your superiors against your conscience. Open opposition risks everything you have in the church.",
    secenekler: [
      {
        metin: "Stay silent, obey.",
        basariliSonuc: {
          mesaj: "You obeyed; your position is safe but a weight remains.",
          detay: "Some silences have an unseen price.",
        },
        basarisizSonuc: {
          mesaj: "Though you obeyed, your conscience gave no rest.",
          detay: "Some thoughts aren't easily silenced.",
        },
      },
      {
        metin: "Oppose openly.",
        basariliSonuc: {
          mesaj: "Your courage drew notice; some superiors quietly backed you.",
          detay: "Speaking right wins unexpected allies.",
        },
        basarisizSonuc: {
          mesaj: "Your opposition ended in excommunication; no place in church circles remains.",
          detay: "Your conscience is clear, but your road is lonelier.",
        },
      },
    ],
  },
  derinlik_asker_krala_karsi: {
    baslik: "A Stand Against the King",
    metin: "The king gave an openly cruel order: punish an innocent village. Conscience urges defiance, but the price may be heavy.",
    secenekler: [
      {
        metin: "Carry out the order quietly.",
        basariliSonuc: {
          mesaj: "You obeyed; the king is pleased but your conscience won't be the same.",
          detay: "Some orders leave a person changed.",
        },
        basarisizSonuc: {
          mesaj: "You obeyed but the villagers' cries will haunt your sleep.",
          detay: "Some duties, won, feel like defeat.",
        },
      },
      {
        metin: "Openly refuse the order.",
        basariliSonuc: {
          mesaj: "Your refusal set an example; some of your unit stood with you.",
          detay: "One person's courage emboldens others.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal reached the king; you're now officially 'the king's enemy'.",
          detay: "Your conscience is at peace, but your head is at risk.",
        },
      },
    ],
  },
  derinlik_tuccar_ipek_ticareti: {
    baslik: "Silk from Distant Lands",
    metin: "A caravan from the east brought silk of unmatched quality. Stake your whole fortune on it and a legendary gain or a great loss awaits.",
    secenekler: [
      {
        metin: "Put all your capital in silk.",
        basariliSonuc: {
          mesaj: "The silk sold at an incredible price; your name is among the city's richest merchants.",
          detay: "They now call you 'the Silk King'.",
        },
        basarisizSonuc: {
          mesaj: "Most of the silk fell prey to damp on the road; your investment was largely wasted.",
          detay: "Big dreams bring big losses.",
        },
      },
      {
        metin: "Buy a little, stay cautious.",
        basariliSonuc: {
          mesaj: "Your small investment brought a safe gain.",
          detay: "Caution is unexciting but safe.",
        },
        basarisizSonuc: {
          mesaj: "Even your small investment didn't turn out as hoped.",
          detay: "Sometimes the market's pulse slips away.",
        },
      },
    ],
  },
  derinlik_asker_destansi_zafer: {
    baslik: "An Epic Defense",
    metin: "Your small unit must hold a pass against a far larger enemy wave. A day for legend or oblivion.",
    secenekler: [
      {
        metin: "Defend the pass to the end.",
        basariliSonuc: {
          mesaj: "You held the pass alone; the enemy fell back. The day became legend.",
          detay: "Soldiers call you 'Brave Heart'.",
        },
        basarisizSonuc: {
          mesaj: "The pass fell but your stand cost the enemy dearly.",
          detay: "Even defeat can be honorable.",
        },
      },
      {
        metin: "Withdraw in good order.",
        basariliSonuc: {
          mesaj: "You reached safety without losses.",
          detay: "Not every day must be epic.",
        },
        basarisizSonuc: {
          mesaj: "A small skirmish broke out during the retreat.",
          detay: "Even safe-looking roads carry risk.",
        },
      },
    ],
  },
  derinlik_din_mucize_sifa: {
    baslik: "A Hopeless Case",
    metin: "A patient the doctors gave up on is brought to you. You can try giving hope with prayer and care, but nothing is certain.",
    secenekler: [
      {
        metin: "Pray at his side day and night.",
        basariliSonuc: {
          mesaj: "The patient recovered unexpectedly; people called it a miracle.",
          detay: "They call you 'the Healer'; you did what you could.",
        },
        basarisizSonuc: {
          mesaj: "Despite all your effort the patient couldn't be saved.",
          detay: "Some losses can't be prevented.",
        },
      },
      {
        metin: "Do what you can, promise no hope.",
        basariliSonuc: {
          mesaj: "Your measured approach helped both patient and you.",
          detay: "You needn't always be at the extreme.",
        },
        basarisizSonuc: {
          mesaj: "The patient couldn't be saved, but you did what you could.",
          detay: "Peace of conscience is sometimes the only comfort.",
        },
      },
    ],
  },
  derinlik_soylu_olumu: {
    baslik: "A Moment of Fate",
    metin: "A dispute turned violent; your opponent was the son of a powerful, large noble family. You caused his death unintentionally.",
    secenekler: [
      {
        metin: "Try to hide it, stay silent.",
        basariliSonuc: {
          mesaj: "You covered it up, but your conscience and fear won't leave you.",
          detay: "Secrets weigh even in silence.",
        },
        basarisizSonuc: {
          mesaj: "The truth soon came out; the family has its eye on you.",
          detay: "A hidden secret spreads faster.",
        },
      },
      {
        metin: "Tell the family openly, answer for it.",
        basariliSonuc: {
          mesaj: "Your honesty softened the family; you settled with blood money.",
          detay: "Some debts close with money; not all.",
        },
        basarisizSonuc: {
          mesaj: "Your honesty didn't soften them; their anger grew.",
          detay: "For some families no apology is enough.",
        },
      },
    ],
  },
  derinlik_kan_davasi_suikast: {
    baslik: "From the Dark of Night",
    metin: "Years later, the blood feud you thought forgotten found you. An assassin attacked you in a dark alley.",
    secenekler: [
      {
        metin: "Fight back.",
        basariliSonuc: {
          mesaj: "You put the assassin down; the blood feud is closed.",
          detay: "A burden of years ended tonight.",
        },
        basarisizSonuc: {
          mesaj: "You were badly wounded and the assassin fled; the threat receded for a while.",
          detay: "You survived tonight, but at heavy cost.",
        },
      },
      {
        metin: "Flee, call for help.",
        basariliSonuc: {
          mesaj: "You escaped, then settled secretly with the family and closed the feud.",
          detay: "Some battles are won by running.",
        },
        basarisizSonuc: {
          mesaj: "Caught while fleeing, a brief violent clash ended with the assassin giving up.",
          detay: "The feud still hangs over you like a shadow.",
        },
      },
    ],
  },
  derinlik_din_veba_bakimi: {
    baslik: "Among the Plague-Stricken",
    metin: "Plague spreads through the city and no one tends the sick. Caring may infect you, but your medical knowledge may bring immunity or healing.",
    secenekler: [
      {
        metin: "Tend the sick yourself.",
        basariliSonuc: {
          mesaj: "After weeks of care you learned the finer points of treating the disease.",
          detay: "Now you don't just pray, you heal.",
        },
        basarisizSonuc: {
          mesaj: "You fell ill but your body won; you're immune to plague now.",
          detay: "The ordeal made you stronger.",
        },
      },
      {
        metin: "Pray from afar, avoid the risk.",
        basariliSonuc: {
          mesaj: "You prayed from afar and stayed safe.",
          detay: "Not all courage takes risks.",
        },
        basarisizSonuc: {
          mesaj: "Some congregants criticized your distance.",
          detay: "Not all expect the same courage; some do.",
        },
      },
    ],
  },
  derinlik_veba_salgini_ikinci_dalga: {
    baslik: "The Plague's Second Wave",
    metin: "The plague surged again. The hospital overflows and helping hands are fewer.",
    secenekler: [
      {
        metin: "Trust your immunity, help the sick.",
        kilitAciklamasi: "You have no immunity; this would be too risky.",
        basariliSonuc: {
          mesaj: "You helped the sick fearlessly; people saw you as a hero.",
          detay: "Your past pain now saves others.",
        },
        basarisizSonuc: {
          mesaj: "Immunity protected you but exhaustion weighed heavy.",
          detay: "The body may endure; the spirit tires.",
        },
      },
      {
        metin: "Use your healing knowledge on the sick.",
        kilitAciklamasi: "You don't know this technique.",
        basariliSonuc: {
          mesaj: "Thanks to your knowledge you healed many patients.",
          detay: "What you learned served in just such a moment.",
        },
        basarisizSonuc: {
          mesaj: "Despite your knowledge this wave was more merciless.",
          detay: "No knowledge stops every disaster.",
        },
      },
      {
        metin: "Keep your distance, only pray.",
        basariliSonuc: {
          mesaj: "You kept your distance and stayed safe.",
          detay: "Some days surviving is enough.",
        },
        basarisizSonuc: {
          mesaj: "Safety troubled you; you blamed yourself for not helping.",
          detay: "Safe choices can trouble conscience.",
        },
      },
    ],
  },
  derinlik_afyon_teklifi: {
    baslik: "A Painkilling Offer",
    metin: "After a hard time, an acquaintance offers opium extract to ease your pain. It soothes, but addiction is a risk.",
    secenekler: [
      {
        metin: "Try it once.",
        basariliSonuc: {
          mesaj: "Your pain eased for a while; you felt lighter.",
          detay: "Relief is real but temporary.",
        },
        basarisizSonuc: {
          mesaj: "It felt so good you used it again and again; now you can't quit.",
          detay: "What eased your pain became a new pain.",
        },
      },
      {
        metin: "Refuse, face the pain another way.",
        basariliSonuc: {
          mesaj: "You refused and chose other ways to face your pain.",
          detay: "The hard road is often sturdier.",
        },
        basarisizSonuc: {
          mesaj: "Refusing wasn't easy; the pain lasted longer.",
          detay: "Some hardships pass without escape.",
        },
      },
    ],
  },
  derinlik_bagimliliktan_kurtulma: {
    baslik: "A Moment of Awakening",
    metin: "In the mirror you saw what addiction has made of you. Perhaps it's time to change.",
    secenekler: [
      {
        metin: "Fight the addiction with willpower.",
        basariliSonuc: {
          mesaj: "After a hellish struggle you freed yourself of addiction.",
          detay: "One of life's hardest, most valuable victories.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't bear the withdrawal; you returned to the habit in tears.",
          detay: "Some chains don't break in one try.",
        },
      },
      {
        metin: "Put it off for now.",
        basariliSonuc: {
          mesaj: "You put off the change; maybe another day.",
          detay: "The right moment may not have come.",
        },
        basarisizSonuc: {
          mesaj: "Putting it off left a dark unease.",
          detay: "Delay has its own weight.",
        },
      },
    ],
  },
  global_kitlik_baslangici: {
    baslik: "The Shadow of Drought",
    metin: "The rains came late this year and crops scorched. Signs of famine appear in the region.",
    secenekler: [
      {
        metin: "Share your surplus with neighbors.",
        basariliSonuc: {
          mesaj: "You shared what you had; famine begins but your conscience is clear.",
          detay: "Hard days are near, but you're not alone.",
        },
        basarisizSonuc: {
          mesaj: "Your sharing wasn't enough; famine begins.",
          detay: "A hard time is at the door.",
        },
      },
      {
        metin: "Guard your stores, look after yourself.",
        basariliSonuc: {
          mesaj: "You guarded your share; famine still grips the region.",
          detay: "Selfishness keeps you a little safer.",
        },
        basarisizSonuc: {
          mesaj: "Your selfishness was noticed; your reputation suffered.",
          detay: "Hard times show true faces.",
        },
      },
    ],
  },
  global_isyan_baslangici: {
    baslik: "Tension in the Streets",
    metin: "Anger at taxes and rule has spilled into the streets. Small protests may herald a great revolt.",
    secenekler: [
      {
        metin: "Turn a blind eye, stay out.",
        basariliSonuc: {
          mesaj: "You stayed out; but the tension grew into revolt.",
          detay: "Some storms can't be stopped, only awaited.",
        },
        basarisizSonuc: {
          mesaj: "Even out of it, you took your share of the chaos.",
          detay: "The streets are no longer safe.",
        },
      },
      {
        metin: "Warn the authorities, ask for precautions.",
        basariliSonuc: {
          mesaj: "Your warning was heeded; the tension calmed for a while.",
          detay: "Disaster was postponed this time.",
        },
        basarisizSonuc: {
          mesaj: "Your warning went unheeded; tension turned to revolt.",
          detay: "Some warnings go unheard.",
        },
      },
    ],
  },
  global_altin_cag_baslangici: {
    baslik: "The Start of Abundance",
    metin: "A bountiful harvest, new trade routes and peace have come together. The region seems to enter prosperity.",
    secenekler: [
      {
        metin: "Take your share of the bounty.",
        basariliSonuc: {
          mesaj: "You joined the bountiful era; the region enters a golden age.",
          detay: "Some eras bring abundance to all.",
        },
        basarisizSonuc: {
          mesaj: "You missed part of the chance, but abundance begins across the region.",
          detay: "Not everyone benefits equally fast.",
        },
      },
      {
        metin: "Be cautious, it won't last.",
        basariliSonuc: {
          mesaj: "Even cautious, you see the region enter a golden age.",
          detay: "Some good times deserve less caution.",
        },
        basarisizSonuc: {
          mesaj: "Your caution cost you some chances.",
          detay: "Not all enjoy abundance equally.",
        },
      },
    ],
  },
  nemesis_fiyat_kirma: {
    baslik: "The Rival's Game",
    metin: "Just as you near a deal with an important customer, {rakip} appears and announces he's halved your price. The customer wavers.",
    secenekler: [
      {
        metin: "Cut your price too, accept the fight.",
        basariliSonuc: {
          mesaj: "You kept the customer but {rakip} melted your margin.",
          detay: "You won the fight, at a cost.",
        },
        basarisizSonuc: {
          mesaj: "The price war wore you out; the customer still went to {rakip}.",
          detay: "Some fights are doomed.",
        },
      },
      {
        metin: "Hold your price, stress quality.",
        basariliSonuc: {
          mesaj: "The customer valued your quality and ignored {rakip}'s cheap trick.",
          detay: "Trust wins, not price.",
        },
        basarisizSonuc: {
          mesaj: "The customer fell for the low price and went to {rakip}.",
          detay: "Not every customer values quality.",
        },
      },
    ],
  },
  nemesis_muhafiz_ihbari: {
    baslik: "The Rival's Report",
    metin: "{rakip} reported you to the guards for a minor offense; mostly exaggerated, partly true. You must answer for it.",
    secenekler: [
      {
        metin: "Tell the guards the truth.",
        basariliSonuc: {
          mesaj: "Your honesty convinced the guards; {rakip}'s report came to nothing.",
          detay: "Truth is often the best defense.",
        },
        basarisizSonuc: {
          mesaj: "Your account fell short; you paid a small fine.",
          detay: "Some reports don't fully fail.",
        },
      },
      {
        metin: "Bribe the guards.",
        basariliSonuc: {
          mesaj: "The bribe worked; the matter closed.",
          detay: "Money hushes; conscience knows.",
        },
        basarisizSonuc: {
          mesaj: "Your bribe was noticed; you lost money and reputation.",
          detay: "Not every bribe stays hidden.",
        },
      },
    ],
  },
  kelebek_multeci_kurtarma: {
    baslik: "The Stranger by the Road",
    metin: "By the road you saw a hungry, worn stranger, a refugee fleeing war or famine. Helping costs little, but your time is short.",
    secenekler: [
      {
        metin: "Give food and a night's shelter.",
        basariliSonuc: {
          mesaj: "You helped the stranger; he went on without asking your name.",
          detay: "Kindness leaves a mark even forgotten.",
        },
        basarisizSonuc: {
          mesaj: "Your help was clumsy, but you reached out.",
          detay: "Intent sometimes says more than deed.",
        },
      },
      {
        metin: "Ignore it, go on your way.",
        basariliSonuc: {
          mesaj: "You ignored him and went on.",
          detay: "Some moments pass unnoticed.",
        },
        basarisizSonuc: {
          mesaj: "Ignoring him troubled you inside.",
          detay: "Some neglect leaves a mark on conscience.",
        },
      },
    ],
  },
  kelebek_multeci_vali_donusu: {
    baslik: "A Familiar Face, a New Title",
    metin: "At the new governor's reception you realized he is the worn stranger you helped years ago. He recognized you too.",
    secenekler: [
      {
        metin: "Remind him, speak of old days.",
        basariliSonuc: {
          mesaj: "The governor welcomed you warmly; your kindness was remembered. He rewarded you.",
          detay: "Kindness returns when least expected.",
        },
        basarisizSonuc: {
          mesaj: "The governor remembered you but the crowd cut the talk short.",
          detay: "The chance slipped, a warm memory remains.",
        },
      },
      {
        metin: "Stay humble, ask nothing.",
        basariliSonuc: {
          mesaj: "You withdrew asking nothing; the governor remembered it and spoke well of you.",
          detay: "The best reward is expecting none.",
        },
        basarisizSonuc: {
          mesaj: "Your withdrawal went unnoticed.",
          detay: "Not all humility is seen, but it is valuable.",
        },
      },
    ],
  },
  istihbarat_dedikoducu: {
    baslik: "A Well-Connected Gossip",
    metin: "A gossip you know at the tavern says he can leak 'inside information' on an upcoming event, for a price.",
    secenekler: [
      {
        metin: "Buy the information.",
        basariliSonuc: {
          mesaj: "The gossip gave you clear word on the next opportunity.",
          detay: "Now you'll decide with a clearer picture.",
        },
        basarisizSonuc: {
          mesaj: "The gossip took the money but his information was useless.",
          detay: "Not every source is reliable.",
        },
      },
      {
        metin: "Ignore it, trust your instincts.",
        basariliSonuc: {
          mesaj: "You refused and trusted your own instincts.",
          detay: "Your gut is the best guide.",
        },
        basarisizSonuc: {
          mesaj: "You refused but couldn't help wondering later.",
          detay: "Curiosity won't let go.",
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
  sehir_yonetim_zanaatkar_baslangic: {
    baslik: "Beyond the Guild",
    metin:
      "Mastery is no longer a ceiling for you, but a start. A seat has opened on the city's craft council; a rival master is after the very same seat. If you win, you'll oversee not just your own workshop, but a part of the city's craft order.",
    secenekler: [
      {
        metin: "Enter the contest, aim for the seat.",
        basariliSonuc: {
          mesaj: "You left the rival master behind; you now have a voice on the city's craft council.",
          detay: "Mastery is no longer an end, but the start of a new race.",
        },
        basarisizSonuc: {
          mesaj: "The rival master won this round, but the race isn't over; your name is known on the council now.",
          detay: "Your first try failed but you're in the game now.",
        },
      },
      {
        metin: "Refuse, be content with your workshop.",
        basariliSonuc: {
          mesaj: "You turned the offer down; you chose to be content with your current position.",
          detay: "Maybe another day you'll change your mind.",
        },
        basarisizSonuc: {
          mesaj: "You regretted your refusal a little; the rival master took the seat without you.",
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
    metin: "You learned a dark secret that could finish {rakip}. Spreading it ruins his name, but it can backfire.",
    secenekler: [
      {
        metin: "Spread it, finish {rakip}.",
        basariliSonuc: {
          mesaj: "The secret spread; {rakip} lost his standing. Your path is clear, but it tastes bitter.",
          detay: "Some victories leave bitterness.",
        },
        basarisizSonuc: {
          mesaj: "You were exposed as the source; branded a slanderer, while {rakip} grew stronger.",
          detay: "Dark weapons go off in your hand.",
        },
      },
      {
        metin: "Keep it, compete honestly.",
        basariliSonuc: {
          mesaj: "You never used it; you know you did right.",
          detay: "An unused weapon is a strength.",
        },
        basarisizSonuc: {
          mesaj: "You stayed silent, but {rakip} saw weakness and grew bolder.",
          detay: "Kindness gets exploited.",
        },
      },
    ],
  },
  is_ikilem_ekip_istifa: {
    baslik: "A Resignation Letter",
    metin: "{ekip} got a better offer and resigned. To keep him, you must raise his wage considerably.",
    secenekler: [
      {
        metin: "Raise his wage, keep him.",
        basariliSonuc: {
          mesaj: "{ekip} accepted and stayed; his loyalty is proven.",
          detay: "Some investments buy trust too.",
        },
        basarisizSonuc: {
          mesaj: "Despite the raise, {ekip} left; money and experience both gone.",
          detay: "Sometimes no offer is enough.",
        },
      },
      {
        metin: "Let him go, find someone new.",
        basariliSonuc: {
          mesaj: "{ekip} left on good terms; replacing him will take time.",
          detay: "Every parting opens a new door.",
        },
        basarisizSonuc: {
          mesaj: "On leaving, {ekip} carried your secrets to rivals.",
          detay: "Some partings aren't quiet.",
        },
      },
    ],
  },
  is_ikilem_sahte_evrak: {
    baslik: "An Offer of a Forged Seal",
    metin: "A clerk says a forged seal can 'fix' your papers overnight. The risk of being caught is low, not zero.",
    secenekler: [
      {
        metin: "Accept, take the shortcut.",
        basariliSonuc: {
          mesaj: "The forged seal worked; it was done overnight and no one noticed.",
          detay: "The shortcut worked, but your conscience knows.",
        },
        basarisizSonuc: {
          mesaj: "The forgery came out! Heavy fine, reputation in ruins.",
          detay: "Some shortcuts skirt a cliff.",
        },
      },
      {
        metin: "Refuse, go the honest way.",
        basariliSonuc: {
          mesaj: "You outlasted the bureaucracy; slow but solid.",
          detay: "Honesty sometimes takes patience.",
        },
        basarisizSonuc: {
          mesaj: "The bureaucracy dragged on; you lost time and temper.",
          detay: "The honest road isn't always easy.",
        },
      },
    ],
  },
  is_ikilem_fazla_mesai: {
    baslik: "Working by Candlelight",
    metin: "An extra job promises more pay but will eat your nights. Your body wants rest; the money tempts.",
    secenekler: [
      {
        metin: "Work extra, lose sleep.",
        basariliSonuc: {
          mesaj: "You slept little for weeks, but your strongbox filled nicely.",
          detay: "Your body pays for the gain.",
        },
        basarisizSonuc: {
          mesaj: "You fainted at work from exhaustion; most earnings went on medicine.",
          detay: "The body bills you sooner or later.",
        },
      },
      {
        metin: "Refuse, rest.",
        basariliSonuc: {
          mesaj: "You refused and rested well; your body thanks you.",
          detay: "The best gain is a rested body.",
        },
        basarisizSonuc: {
          mesaj: "You rested, but faintly regret the missed chance.",
          detay: "Not every right choice is regret-free.",
        },
      },
    ],
  },
};
