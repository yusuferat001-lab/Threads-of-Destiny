import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/aile.ts — İngilizce çevirileri. */
export const OLAYLAR_AILE_EN: Record<string, OlayCeviri> = {
  iliski_evlilik_teklifi: {
    baslik: "An Influential Bond",
    metin:
      "{dost} introduced you to someone from a powerful city family. The marriage would be loveless but open great doors.",
    secenekler: [
      {
        metin: "Accept the marriage of convenience.",
        basariliSonuc: {
          mesaj:
            "A grand ceremony. You belong to a powerful family, yet bed feels cold.",
        },
        basarisizSonuc: {
          mesaj: "The family found you lacking and cancelled the wedding. The city mocks you.",
        },
      },
      {
        metin: "Say you want love, refuse.",
        basariliSonuc: {
          mesaj:
            "You spurned influence and money. All call you mad, but your conscience is clear.",
        },
        basarisizSonuc: {
          mesaj:
            "You refused, but alone at night you wondered if you erred.",
        },
      },
    ],
  },

  iliski_cocuk_mujdesi: {
    baslik: "An Heir Is Coming",
    metin:
      "{es} brings news: the family will grow! But {es}'s constitution is weak; the birth is very risky.",
    secenekler: [
      {
        metin: "Hire the best midwife and doctor.",
        basariliSonuc: {
          mesaj:
            "You spared no coin; {es} and the child came through! The house celebrates.",
        },
        basarisizSonuc: {
          mesaj:
            "Money couldn't change fate. The child was born but {es} died in childbed.",
        },
      },
      {
        metin: "No money; trust the village midwife.",
        basariliSonuc: {
          mesaj:
            "A blessing! At no cost, by pure luck, a healthy child was born.",
        },
        basarisizSonuc: {
          mesaj:
            "The cheap midwife couldn't stop the bleeding. You lost {es} and the baby.",
        },
      },
    ],
  },

  soylu_saray_entrikasi: {
    baslik: "The Whisper of Dark Corridors",
    metin:
      "You heard your name whispered at court: a cousin or powerful rival resents your rise. A strange taste in your cup, men in shadow...",
    secenekler: [
      {
        metin: "Ignore it, double your guard.",
        basariliSonuc: {
          mesaj:
            "You kept calm. Your enemies backed off; your name is respected at court.",
        },
        basarisizSonuc: {
          mesaj:
            "A poisoned dagger came from the shadows. You barely lived; the wound never fully heals.",
        },
      },
      {
        metin: "Hire dark men, strike first.",
        basariliSonuc: {
          mesaj:
            "Your cousin died in 'a riding accident'. You're safe, but see a killer in the mirror.",
        },
        basarisizSonuc: {
          mesaj:
            "The hired men were inept and named you! The retaliation nearly killed you.",
        },
      },
    ],
  },

  cocuk_hastalik_sonucu_iyi: {
    baslik: "They Found Healing",
    metin: "Your child opened their eyes, the fever broke, and they asked for water.",
    secenekler: [
      {
        metin: "Rejoice, thank God.",
        basariliSonuc: {
          mesaj: "Fear gave way to tears. Your child lives!",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  cocuk_hastalik_sonucu_kotu: {
    baslik: "A Small Coffin",
    metin:
      "The dreaded came. The fever never broke; the small body grew cold. Even the physicians leave silently.",
    secenekler: [
      {
        metin: "Hold them, beg them to wake.",
        basariliSonuc: {
          mesaj:
            "Your tears fell on their face; they coughed and breathed! Only a deep coma!",
        },
        basarisizSonuc: {
          mesaj:
            "However you cried, those eyes never opened. You buried them yourself.",
        },
      },
      {
        metin: "Accept it, prepare the funeral.",
        basariliSonuc: {
          mesaj: "No strength even to weep. A part of you was buried with that coffin.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  cocuk_suctustu: {
    baslik: "Caught in the Act",
    metin:
      "A shout rose in the market: a cloth merchant drags your child by the collar, crying 'Thief!' Guards approach.",
    secenekler: [
      {
        metin: "Bribe the guards and the merchant.",
        basariliSonuc: {
          mesaj:
            "You pressed purses on them; 'a misunderstanding,' he said. Your child saw justice sold.",
        },
        basarisizSonuc: {
          mesaj:
            "They took the bribe but still branded your child a thief publicly. Your name is stained.",
        },
      },
      {
        metin: "Take the blame: 'On my orders.'",
        basariliSonuc: {
          mesaj:
            "You pushed your child aside, hands out. Chained, you heard them cry behind you.",
        },
        basarisizSonuc: {
          mesaj:
            "'We'll take you both,' they smirked. Both chained; their record is stained.",
        },
      },
      {
        metin: "Slap them publicly, hand them over.",
        basariliSonuc: {
          mesaj:
            "You slapped and surrendered them. The crowd praised you; you won't forget their hatred.",
        },
        basarisizSonuc: {
          mesaj: "You struck them, yet the merchant wasn't satisfied. You were both shamed in the street.",
        },
      },
    ],
  },

  cocuk_evlilik: {
    baslik: "Your Child's Wedding",
    metin:
      "Your child is to wed. The family expects a grand wedding, but times have been hard.",
    secenekler: [
      {
        metin: "Go into debt for a city-shaking wedding.",
        basariliSonuc: {
          mesaj: "A wedding talked of for weeks! Your child's smile was worth it all.",
        },
        basarisizSonuc: {
          mesaj: "Great expense, but rain ruined it and the guests grumbled. The money was wasted.",
        },
      },
      {
        metin: "A plain ceremony will do.",
        basariliSonuc: {
          mesaj: "A small, warm ceremony sent them off. You're at peace.",
        },
        basarisizSonuc: {
          mesaj: "The other family called the plainness 'stinginess' and grumbled throughout.",
        },
      },
    ],
  },

  cocuk_meslek_secimi: {
    baslik: "Passing On the Legacy",
    metin:
      "Your child is old enough to choose a trade. You want to pass on your business, but they long for the sea and adventure.",
    secenekler: [
      {
        metin: "Insist: 'You'll take over my business!'",
        basariliSonuc: {
          mesaj: "They obeyed, however unwillingly. Now they help you and earnings rose.",
        },
        basarisizSonuc: {
          mesaj: "You quarreled; they packed and fled. You kept the business, your pillow the tears.",
        },
      },
      {
        metin: "Let them choose, give an allowance.",
        basariliSonuc: {
          mesaj:
            "They hugged you as they boarded. You're proud of a child chasing dreams.",
        },
        basarisizSonuc: {
          mesaj: "Months without word. Perhaps pirates took them... Worry gnaws at you.",
        },
      },
    ],
  },

  cocuk_ziyaret: {
    baslik: "Old Age and Grandchildren",
    metin:
      "Years later your child visits with your grandchildren. The house rings with children's voices again.",
    secenekler: [
      {
        metin: "Give them your whole day, play games.",
        basariliSonuc: {
          mesaj: "Playing with the grandchildren made you ten years younger. This is life's meaning.",
        },
        basarisizSonuc: {
          mesaj: "You hurt your back playing, but it was worth it.",
        },
      },
      {
        metin: "Too frail; settle for a short chat.",
        basariliSonuc: {
          mesaj: "The noise tired you and you withdrew to your room. Solitude suits you.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  aile_tuccar_musteri: {
    baslik: "Your Father's Old Friend",
    metin:
      "A very old, ruthless, rich merchant came: 'I traded with your father. I'll leave you my network, but your child must wed my crippled, cruel heir.'",
    secenekler: [
      {
        metin: "My child isn't for sale! Refuse.",
        basariliSonuc: {
          mesaj:
            "You threw him out. Your child hugged you in tears. Not rich, but a wonderful parent.",
        },
        basarisizSonuc: {
          mesaj: "He turned your father's old partners against you. Your trade took a heavy blow.",
        },
      },
      {
        metin: "Business is business. Marry them off, take the network.",
        basariliSonuc: {
          mesaj:
            "You signed; the empire is yours. Your child ignored you at the wedding and erased you.",
        },
        basarisizSonuc: {
          mesaj: "Your child fled on the wedding night! You lost both the trade and your child.",
        },
      },
    ],
  },

  aile_soylu_davet: {
    baslik: "The Test of Noble Blood",
    metin:
      "Your kin, the lords, summoned you to a secret meeting: a cruel new tax on peasants. Will you stand by blood or the people?",
    secenekler: [
      {
        metin: "I won't betray my blood. Approve.",
        basariliSonuc: {
          mesaj:
            "You stamped your seal, the family's most respected. Peasants starve; your castle gleams.",
        },
        basarisizSonuc: {
          mesaj: "Peasants revolted and stoned your carriage. You escaped bloodied.",
        },
      },
      {
        metin: "This is tyranny! Oppose it.",
        basariliSonuc: {
          mesaj:
            "You overturned the table! Stripped of title, but thousands of peasants pray for you.",
        },
        basarisizSonuc: {
          mesaj:
            "Your family beat and expelled you, seizing your property. The people never knew.",
        },
      },
    ],
  },

  aile_asker_yoldas: {
    baslik: "Your Father's Bloody Sword",
    metin:
      "In the barracks a scarred old officer took you aside: 'Your father and I shared a trench. He'd want you safe.' He offers a palace guard post.",
    secenekler: [
      {
        metin: "Become a Palace Guard: warm bed, safe pay.",
        basariliSonuc: {
          mesaj:
            "Your father's name got you into the palace. Friends fight in mud while you drink wine.",
        },
        basarisizSonuc: {
          mesaj:
            "The commander saw you were a favorite and gave you sewer duty. Your reputation reset.",
        },
      },
      {
        metin: "Insist on your father's regiment (the Death Battalion).",
        basariliSonuc: {
          mesaj:
            "You joined the Death Battalion! Soldiers said your father's spirit returned.",
        },
        basarisizSonuc: {
          mesaj:
            "Pushing to leave your father's shadow, you were ambushed. Courage nearly cost your life.",
        },
      },
    ],
  },

  aile_kole_gecmis: {
    baslik: "The Mark of Chains",
    metin:
      "The son of the cruel master who once owned your father spotted you in a tavern. 'Our slave's brat?' he laughed, tossing gold to kiss his foot.",
    secenekler: [
      {
        metin: "Take the gold, kiss his foot. Pride feeds no one.",
        basariliSonuc: {
          mesaj:
            "You kissed his foot, shamed before all. Your purse filled; your soul stayed crushed.",
        },
        basarisizSonuc: {
          mesaj: "He kicked your face as you bent! You got little gold and lost your standing.",
        },
      },
      {
        metin: "Overturn the table, show you're no slave!",
        basariliSonuc: {
          mesaj:
            "Your punch floored him. The crowd admired your courage. None can mock your past now!",
        },
        basarisizSonuc: {
          mesaj: "His guards beat you senseless. But all saw you were an unbowed lion.",
        },
      },
    ],
  },

  aile_isci_grev: {
    baslik: "The Fire of Revolt",
    metin:
      "Workers rose at the factory where your father toiled, sickened and died; they mean to burn it. The union wants you as leader.",
    secenekler: [
      {
        metin: "Take the torch: 'You'll pay for my father!'",
        basariliSonuc: {
          mesaj:
            "Strike became revolution! Bosses knelt. Father avenged, you're the people's idol.",
        },
        basarisizSonuc: {
          mesaj:
            "Gendarmes showed no mercy; truncheons and horses crushed you. Branded traitor, jailed.",
        },
      },
      {
        metin: "Meet the boss secretly, sell out the revolt.",
        basariliSonuc: {
          mesaj:
            "You named the leaders; the revolt fell. Made manager, but your street spits on you.",
        },
        basarisizSonuc: {
          mesaj: "Workers saw you leave the boss's office! Guards saved you from lynching by seconds.",
        },
      },
    ],
  },

  aile_cellat_soyad: {
    baslik: "The Son of the Severing Blade",
    metin:
      "The family of your beloved learned your past: 'We won't give our child to an executioner's seed!' Disown your name or live without them.",
    secenekler: [
      {
        metin: "I'm ashamed of my father; I'll change my name.",
        basariliSonuc: {
          mesaj:
            "You denied your past and wed. Your father's sad eyes and a life of lies eat at you.",
        },
        basarisizSonuc: {
          mesaj: "They didn't believe you. 'Death is in your blood,' they said, throwing you out.",
        },
      },
      {
        metin: "I'll use your fears: become chief jailer.",
        basariliSonuc: {
          mesaj:
            "You forgot love and became the state's most feared jailer. That family now trembles.",
        },
        basarisizSonuc: {
          mesaj: "You tried to intimidate, but nobles crushed you at once. Jobless and alone.",
        },
      },
    ],
  },

  aile_hekim_hasta: {
    baslik: "The Price of Healing",
    metin:
      "An epidemic broke out. Your child/spouse burns with fever, ten orphans are dying too. Your mother's herbs suffice for one person or group.",
    secenekler: [
      {
        metin: "Only my family; I care not for others.",
        basariliSonuc: {
          mesaj:
            "Your family lived. At dawn ten small corpses left the orphanage; you shut your window.",
        },
        basarisizSonuc: {
          mesaj:
            "The medicine didn't fully work, but they live. The dead children's curse is on you.",
        },
      },
      {
        metin: "Herbs belong to all! Go to the orphanage.",
        basariliSonuc: {
          mesaj:
            "You saved the orphans! Your child gained immunity too. The city will raise your statue.",
        },
        basarisizSonuc: {
          mesaj:
            "The orphans lived... but you found your own child cold. A hero, with a dead soul.",
        },
      },
    ],
  },

  aile_kacakci_teklif: {
    baslik: "Bloody Gold",
    metin:
      "Your father's old underworld partners came: they want your tunnels to smuggle royal jewels stolen from the palace treasury out of the city.",
    secenekler: [
      {
        metin: "Smuggle the jewels, it's my father's legacy.",
        basariliSonuc: {
          mesaj:
            "You smuggled them out! The king raged, but you grew fabulously rich overnight.",
        },
        basarisizSonuc: {
          mesaj:
            "You were betrayed! Guards raided the tunnel, took your fortune and jailed you.",
        },
      },
      {
        metin: "I won't be a criminal like my father! Report them.",
        basariliSonuc: {
          mesaj: "You sold them to the king! He rewarded you and cleared your family's name.",
        },
        basarisizSonuc: {
          mesaj:
            "They learned of your report and put you to the sword at night. Honesty cost blood.",
        },
      },
    ],
  },

  aile_ciftci_kitlik: {
    baslik: "A Cry From the Village",
    metin:
      "A letter from your village: famine; your siblings and mother eat bark and ask for all your savings. You have a family to feed in the city too.",
    secenekler: [
      {
        metin: "Cut my child's food, send it to the village.",
        basariliSonuc: {
          mesaj:
            "The village lived on your money. Your child slept hungry for weeks, hating you.",
        },
        basarisizSonuc: {
          mesaj:
            "Bandits took the money on the road. Your family starved and the village died unaided.",
        },
      },
      {
        metin: "This is my home. The village must fend for itself.",
        basariliSonuc: {
          mesaj:
            "You kept your money; your children slept full. Months later: news your mother had died.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  genel_kayip_cocuk_arama: {
    baslik: "The Missing Child",
    metin:
      "A child is missing in the neighborhood; darkness falls and everyone gathers volunteers.",
    secenekler: [
      {
        metin: "Join the search.",
        basariliSonuc: {
          mesaj: "You found the child in an old mill; the family is grateful.",
          detay: "Every step that night was worth it.",
        },
        basarisizSonuc: {
          mesaj: "You searched all night; another group found the child.",
          detay: "The outcome stood, but your effort counted.",
        },
      },
      {
        metin: "Stay home, stay out.",
        basariliSonuc: {
          mesaj: "You stayed home; the child turned up by dawn.",
          detay: "It ended well, but guilt lingers.",
        },
        basarisizSonuc: {
          mesaj: "Neighbors asked: 'Everyone searched, where were you?'",
          detay: "Staying out has a price too.",
        },
      },
    ],
  },

  orgut_cocuk_katilimi: {
    baslik: "A Dark Legacy",
    metin:
      "Your secret order's leaders say they've watched your child for years and want them to join. This could bury your child's life in darkness.",
    secenekler: [
      {
        metin: "Take my child too; let my legacy live.",
        basariliSonuc: {
          mesaj: "Your child swore the oath and vanished into shadow. Your family became legend there.",
          detay: "You're mighty, but your child's innocence died.",
        },
        basarisizSonuc: {
          mesaj: "Your child panicked at the ritual and tried to flee. The order punished them.",
          detay: "You broke your child, and the order marked you inept.",
        },
      },
      {
        metin: "Never! My child won't touch this.",
        basariliSonuc: {
          mesaj: "You drew steel and defied the leaders. Expelled, but you saved your child.",
          detay: "Ordinary and endangered, yet proud of your parenting.",
        },
        basarisizSonuc: {
          mesaj: "You were attacked on the spot! Badly hurt, you barely fled with your child.",
          detay: "You left everything. Poor, but together.",
        },
      },
    ],
  },

  aile_ikilem_cocugun_egitimi: {
    baslik: "Your Child's Future",
    metin:
      "{cocuk} wants to train under a skilled master, but it would swallow most of your savings. Invest in them, or in your own future?",
    secenekler: [
      {
        metin: "Spend it on {cocuk}'s education.",
        basariliSonuc: {
          mesaj: "{cocuk} began training; the eagerness in their eyes was worth every coin.",
          detay: "Some investments bear fruit years later.",
        },
        basarisizSonuc: {
          mesaj: "Training began but {cocuk} struggles; still, they try.",
          detay: "Not every investment pays at once.",
        },
      },
      {
        metin: "Keep the money, secure your future.",
        basariliSonuc: {
          mesaj: "You kept it; {cocuk} was crushed but your purse is safe.",
          detay: "Security is sometimes bought with a loved one's dream.",
        },
        basarisizSonuc: {
          mesaj: "{cocuk} never forgot this; a silent distance grew between you.",
          detay: "Some choices are paid for years.",
        },
      },
    ],
  },

  aile_ikilem_yasli_ebeveyn_bakimi: {
    baslik: "Aging Hands",
    metin:
      "{baba} and {anne} are frail now; both need regular care, perhaps a helper. It costs money and time — but they raised you.",
    secenekler: [
      {
        metin: "Fund regular care, visit often.",
        basariliSonuc: {
          mesaj: "{anne} and {baba} are comfortable; their gratitude was worth every coin.",
          detay: "Some debts are paid in time.",
        },
        basarisizSonuc: {
          mesaj: "You did your best, but old age's troubles never end.",
          detay: "Some burdens never lighten, only shared.",
        },
      },
      {
        metin: "Focus on work and family, visit sometimes.",
        basariliSonuc: {
          mesaj: "You focused on work; {anne} and {baba} manage, but their voices sound sad.",
          detay: "Time can't be won back.",
        },
        basarisizSonuc: {
          mesaj:
            "Neighbors called you neglectful; {baba} said nothing, but you know it hurt.",
          detay: "Silent hurts run deepest.",
        },
      },
    ],
  },

  aile_ikilem_esin_hayali: {
    baslik: "Your Spouse's Dream",
    metin:
      "{es} has long dreamed of starting a business, needing much of your savings. Risky, but you see the light in their eyes.",
    secenekler: [
      {
        metin: "Give the savings, back the dream.",
        basariliSonuc: {
          mesaj: "{es} launched the business; their eyes shone as in years.",
          detay: "Some investments show in the marriage.",
        },
        basarisizSonuc: {
          mesaj: "The venture failed, the money's gone, but {es} is grateful you tried.",
          detay: "Sometimes support matters more than results.",
        },
      },
      {
        metin: "Say no, keep the savings.",
        basariliSonuc: {
          mesaj: "You refused; {es} understood, but the light in their eyes dimmed.",
          detay: "Safety is sometimes bought with a dream.",
        },
        basarisizSonuc: {
          mesaj: "{es} never forgot the refusal; an unspoken hurt grew between you.",
          detay: "Some no's scar a marriage.",
        },
      },
    ],
  },

  aile_ikilem_kardesin_borcu: {
    baslik: "A Gambling Debt",
    metin:
      "A relative is at your door: deep in gambling debt, creditors threatening. Unless you pay, they can't even say 'what might happen'.",
    secenekler: [
      {
        metin: "Pay the debt, keep family peace.",
        basariliSonuc: {
          mesaj: "You paid; your relative swore 'never again' in tears.",
          detay: "You've heard that vow often, yet paid.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but they were back at your door a month later.",
          detay: "Habits don't end in one go.",
        },
      },
      {
        metin: "Refuse; let them solve it.",
        basariliSonuc: {
          mesaj: "You refused; they left angry but solved it alone.",
          detay: "Sometimes tough love is right.",
        },
        basarisizSonuc: {
          mesaj: "Creditors escalated and the family name was tarnished locally.",
          detay: "Refusal may cost more later.",
        },
      },
    ],
  },

  aile_ikilem_cocugun_secimi: {
    baslik: "A Different Path",
    metin:
      "{cocuk} wants not your trade but an art society scorns (traveling theater, street music). You feel pride and fear.",
    secenekler: [
      {
        metin: "Support them, clear their way.",
        basariliSonuc: {
          mesaj: "{cocuk} hugged you, eyes brimming. Neighbors gossip, but your conscience is calm.",
          detay: "Some pride shines inside the home.",
        },
        basarisizSonuc: {
          mesaj: "They were glad, but neighbors called you 'unable to rein in your child'.",
          detay: "Not all support is applauded.",
        },
      },
      {
        metin: "Insist on the family trade.",
        basariliSonuc: {
          mesaj: "{cocuk} reluctantly took your path; the light in their eyes never returned.",
          detay: "Some victories are losses.",
        },
        basarisizSonuc: {
          mesaj: "{cocuk} left home; years without word.",
          detay: "Insisting can lose what you had.",
        },
      },
    ],
  },

  aile_ikilem_miras_kavgasi: {
    baslik: "A Share of the Inheritance",
    metin:
      "A distant relative died; relatives brawl ugly over the estate. You can defend your share fully or withdraw for peace.",
    secenekler: [
      {
        metin: "Hire a lawyer, fight to the end.",
        basariliSonuc: {
          mesaj: "The court ruled for you; you got your share, but the relative never called again.",
          detay: "Did the gold outweigh the kin lost?",
        },
        basarisizSonuc: {
          mesaj: "You lost; costs came from your pocket and you made a family enemy.",
          detay: "Some fights have no winner.",
        },
      },
      {
        metin: "Give up your share, choose peace.",
        basariliSonuc: {
          mesaj: "You yielded; the relative thanked you, stunned, and family bonds strengthened.",
          detay: "Some riches aren't gold.",
        },
        basarisizSonuc: {
          mesaj: "You yielded, but relatives called it 'weakness' and scorned you.",
          detay: "Kindness isn't always valued.",
        },
      },
    ],
  },

  aile_ikilem_ikisi_bir_arada: {
    baslik: "Two Invitations, One Day",
    metin:
      "{dost}'s most important day and your life's biggest business meeting fall on the same day. You can't do both.",
    secenekler: [
      {
        metin: "Be there for {dost}.",
        basariliSonuc: {
          mesaj: "You were there for {dost}; their joy outweighed the lost chance.",
          detay: "Some moments, like chances, never return.",
        },
        basarisizSonuc: {
          mesaj: "You were there, but regret for the lost chance lingers.",
          detay: "Even the right choice stings.",
        },
      },
      {
        metin: "Go to the business meeting.",
        basariliSonuc: {
          mesaj: "The meeting went superbly; you seized the chance. {dost} never called like before.",
          detay: "Career up, but one chair empty at your table.",
        },
        basarisizSonuc: {
          mesaj: "The meeting flopped, and you hurt {dost} too.",
          detay: "Some days cost both business and heart.",
        },
      },
    ],
  },

  aile_koken_kole_onyargi: {
    baslik: "An Old Shadow",
    metin:
      "The guild master refused you, citing your family's slave past: 'None of your line under this roof.' His words still ring.",
    secenekler: [
      {
        metin: "Defy him before everyone.",
        basariliSonuc: {
          mesaj: "Your words echoed through the guild; some members quietly backed you.",
          detay: "Some challenges bear fruit in time.",
        },
        basarisizSonuc: {
          mesaj: "The master called you 'insolent' and shut the guild to you forever.",
          detay: "Not every challenge is won.",
        },
      },
      {
        metin: "Withdraw quietly, work twice as hard.",
        basariliSonuc: {
          mesaj:
            "Years on, your solo work grew so famed the guild now wants you.",
          detay: "Patience is the sharpest answer.",
        },
        basarisizSonuc: {
          mesaj: "Progress was slow; the prejudice held.",
          detay: "Some walls don't fall alone.",
        },
      },
    ],
  },

  aile_koken_soylu_ayricalik: {
    baslik: "An Old Debt",
    metin:
      "An old farmer came: your great-grandfather unjustly took his land, he says, and the debt still burdens his family. He holds a yellowed document.",
    secenekler: [
      {
        metin: "Examine it; if he's right, compensate.",
        basariliSonuc: {
          mesaj: "The document was real; you paid and the old man thanked you in tears.",
          detay: "Some debts deserve paying across generations.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but the man never fully healed.",
          detay: "Money can't close some wounds.",
        },
      },
      {
        metin: "Use noble influence to drive him off.",
        basariliSonuc: {
          mesaj: "You had him thrown out; none opposed you, but something nags inside.",
          detay: "Privilege mutes conscience, never kills it.",
        },
        basarisizSonuc: {
          mesaj: "His story spread; rumors of a 'cruel noble' dog you.",
          detay: "Some truths can't be silenced.",
        },
      },
    ],
  },

  aile_koken_tefeci_borc_defteri: {
    baslik: "Your Father's Ledger",
    metin:
      "In your father's old ledger you found dozens of unpaid names, some now old, poor, helpless. It's still a collectible fortune.",
    secenekler: [
      {
        metin: "Collect every debt ruthlessly.",
        basariliSonuc: {
          mesaj: "You collected; your coffer filled, but your father's nickname stuck to you.",
          detay: "Some legacies carry hatred with gold.",
        },
        basarisizSonuc: {
          mesaj: "Some debtors openly cursed you; one even threatened you.",
          detay: "Ruthless collecting breeds enemies.",
        },
      },
      {
        metin: "Burn the ledger, free everyone.",
        basariliSonuc: {
          mesaj:
            "News of the burning spread; your father's stained name was cleared a little.",
          detay: "Some riches are worth burning.",
        },
        basarisizSonuc: {
          mesaj: "You burned it, but some debtors think it a trick and keep away.",
          detay: "Trust isn't built in a day.",
        },
      },
    ],
  },

  aile_koken_kacakci_eski_baglanti: {
    baslik: "An Old Face",
    metin:
      "In a dark street your father's old smuggling partner appeared. He wants a valuable forbidden cargo from across the border moved through you, no questions.",
    secenekler: [
      {
        metin: "Accept, return to the family trade.",
        basariliSonuc: {
          mesaj: "The cargo passed cleanly; your coffer filled, but you saw your father's steps in yours.",
          detay: "Some blood never changes.",
        },
        basarisizSonuc: {
          mesaj: "A patrol caught you; you barely fled, losing goods and money.",
          detay: "Old lives lure you into traps.",
        },
      },
      {
        metin: "Refuse, say you've left that life.",
        basariliSonuc: {
          mesaj: "You refused; he shrugged and vanished into the dark, and you felt lighter.",
          detay: "Refusing the past takes courage too.",
        },
        basarisizSonuc: {
          mesaj: "Word of your refusal spread: 'He's no longer one of us.'",
          detay: "A closed door stays closed.",
        },
      },
    ],
  },

  aile_koken_cellat_damgasi: {
    baslik: "A Duty Called By Blood",
    metin:
      "Officials, knowing your father's trade, want you to carry out an execution: 'It's in your blood.' Refusing looks odd; accepting brands you forever.",
    secenekler: [
      {
        metin: "Refuse, this fate isn't mine.",
        basariliSonuc: {
          mesaj: "You refused; another was found, and you stepped from your father's shadow.",
          detay: "Fate sometimes awaits refusal.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal became 'one who fled family duty'; doors closed.",
          detay: "Fleeing the past costs too.",
        },
      },
      {
        metin: "Accept, continue the family trade.",
        basariliSonuc: {
          mesaj: "You did the duty; officials are pleased, but even children whisper on the street.",
          detay: "Some legacies brand you forever.",
        },
        basarisizSonuc: {
          mesaj: "You barely finished; your sleep has been uneasy since.",
          detay: "In your blood or not, the weight is heavy.",
        },
      },
    ],
  },

  aile_koken_saray_sirlari: {
    baslik: "A Secret Your Mother Knew",
    metin:
      "You recalled a secret from your mother's palace days: a powerful noble's shameful past. It could be a great advantage, or deserve burial.",
    secenekler: [
      {
        metin: "Use the secret to extract favors.",
        basariliSonuc: {
          mesaj:
            "The noble, fearing exposure, yielded; you won but broke your mother's loyalty.",
          detay: "Some gains are built on an oath.",
        },
        basarisizSonuc: {
          mesaj: "The noble refused the blackmail and discredited you instead.",
          detay: "Some gambles backfire.",
        },
      },
      {
        metin: "Keep the secret, honor your mother's oath.",
        basariliSonuc: {
          mesaj: "You never used it; you kept alive the palace loyalty your mother taught.",
          detay: "Some legacies outvalue gold.",
        },
        basarisizSonuc: {
          mesaj: "Your silence gained nothing; you only kept your peace.",
          detay: "Virtue's reward isn't always tangible.",
        },
      },
    ],
  },

  aile_koken_surgun_geri_donus: {
    baslik: "A Forgiven Line",
    metin:
      "The ruler who exiled your family has a grandchild who issued a pardon. You may reclaim your ancestral land and legacy — leaving your present life.",
    secenekler: [
      {
        metin: "Leave all, return to ancestral land.",
        basariliSonuc: {
          mesaj:
            "Stepping on ancestral soil, your eyes filled; a generations-old longing eased.",
          detay: "Some journeys are measured in soul.",
        },
        basarisizSonuc: {
          mesaj:
            "The return disappointed; the land felt foreign, and you felt lost between two worlds.",
          detay: "Some homecomings disappoint.",
        },
      },
      {
        metin: "Stay here, keep the life you built.",
        basariliSonuc: {
          mesaj:
            "You declined the pardon; life went on, but never seeing ancestral land left an ache.",
          detay: "Some doors deserve to stay shut.",
        },
        basarisizSonuc: {
          mesaj: "The more you doubted your choice, the more unease grew.",
          detay: "Some questions stay unanswered for years.",
        },
      },
    ],
  },

  aile_koken_madenci_cokme_anisi: {
    baslik: "News From Underground",
    metin:
      "Like the mine that took your uncle, a nearby mine collapsed; dozens of workers trapped. You may join the rescue or donate from afar.",
    secenekler: [
      {
        metin: "Join the rescue team.",
        basariliSonuc: {
          mesaj:
            "You toiled for hours in dark tunnels; hauling workers out alive, you wept.",
          detay: "You gave others the help your uncle never got.",
        },
        basarisizSonuc: {
          mesaj: "The tunnel began caving on you too; you were dragged out badly hurt.",
          detay: "The underground tested your family again.",
        },
      },
      {
        metin: "Donate generously from afar.",
        basariliSonuc: {
          mesaj: "Your donation armed the rescuers; many workers were saved thanks to you.",
          detay: "Not all heroism happens underground.",
        },
        basarisizSonuc: {
          mesaj: "The rescue fell short despite your gift; your uncle's story repeated.",
          detay: "Some pains repeat through history.",
        },
      },
    ],
  },
};
