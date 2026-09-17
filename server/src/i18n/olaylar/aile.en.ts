import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/aile.ts — İngilizce çevirileri. */
export const OLAYLAR_AILE_EN: Record<string, OlayCeviri> = {
  iliski_evlilik_teklifi: {
    baslik: "An Influential Bond",
    metin:
      "{dost} introduced you to a member of a family with fairly powerful connections in the city. A cold but respectful bond formed between you. This marriage won't be full of love, but it could open great doors for you.",
    secenekler: [
      {
        metin: "Accept the marriage of convenience.",
        basariliSonuc: {
          mesaj:
            "The ceremony was quite grand. You are now part of a powerful family, but the only thing you feel when you get into bed is cold.",
        },
        basarisizSonuc: {
          mesaj: "At the last moment the family found your status insufficient and cancelled the wedding. You became a laughingstock in the city.",
        },
      },
      {
        metin: "Say you need love, and turn the offer down.",
        basariliSonuc: {
          mesaj:
            "You brushed aside influence and money. Everyone calls you mad, but your conscience is very much at ease.",
        },
        basarisizSonuc: {
          mesaj:
            "You refused the offer, but when you got into bed alone at night you couldn't help wondering 'did I make a mistake'.",
        },
      },
    ],
  },

  iliski_cocuk_mujdesi: {
    baslik: "An Heir Is Coming",
    metin:
      "{es} gives you news: your family will grow! But the doctors say {es}'s constitution is weak and the birth could be very risky.",
    secenekler: [
      {
        metin: "Hire the most expensive midwife and doctor (reduce the risks).",
        basariliSonuc: {
          mesaj:
            "You didn't spare the money and, with the doctors' help, both {es} and your child came through safely! There is a festive air in the house.",
        },
        basarisizSonuc: {
          mesaj:
            "No matter how much money you poured out, fate did not change. Your child was born, but {es} drew their last breath on the birthing bed.",
        },
      },
      {
        metin: "I have no money; we'll trust the village's old midwife.",
        basariliSonuc: {
          mesaj:
            "A blessing! With no expense at all, purely by chance, a healthy child was born.",
        },
        basarisizSonuc: {
          mesaj:
            "The cheap midwife couldn't stop the bleeding. On the darkest night of your life you lost both {es} and your unborn baby.",
        },
      },
    ],
  },

  soylu_saray_entrikasi: {
    baslik: "The Whisper of Dark Corridors",
    metin:
      "In the dark corridors of the palace you heard a whisper with your name in it: one of your cousins (or a powerful rival) is unhappy with your rise. The strange taste in your cup, the men waiting in the shadows... Your noble blood has made you a target.",
    secenekler: [
      {
        metin: "Ignore the threat, increase your guard.",
        basariliSonuc: {
          mesaj:
            "You kept your composure. Seeing you unafraid, your enemies backed off; your name is spoken with respect at the palace.",
        },
        basarisizSonuc: {
          mesaj:
            "One night a poisoned dagger from the shadows found you. You barely survived, but your wound will never fully heal.",
        },
      },
      {
        metin: "Hire dark men, be the first to eliminate the one you suspect.",
        basariliSonuc: {
          mesaj:
            "Your cousin/rival died in 'an unfortunate riding accident'. You are safe. But now when you look in the mirror you see a killer.",
        },
        basarisizSonuc: {
          mesaj:
            "The men you hired proved incompetent and talked, giving your name! The retaliation was harsh and nearly cost you your life.",
        },
      },
    ],
  },

  cocuk_hastalik_sonucu_iyi: {
    baslik: "They Found Healing",
    metin: "Your child finally opened their eyes, the fever broke, and they asked you for water.",
    secenekler: [
      {
        metin: "Share your joy, give thanks to God.",
        basariliSonuc: {
          mesaj: "The vast fear that filled you gave way to tears. Your child is alive!",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  cocuk_hastalik_sonucu_kotu: {
    baslik: "A Small Coffin",
    metin:
      "The dreaded thing happened. The fever never broke. Your child's small body began to grow cold in the bed. Even the physicians leave the room in silence.",
    secenekler: [
      {
        metin: "With one last hope, hold them and beg them to wake.",
        basariliSonuc: {
          mesaj:
            "As you wept your tears fell on their face. Suddenly they coughed and drew breath! They weren't dead, only in a deep coma!",
        },
        basarisizSonuc: {
          mesaj:
            "No matter how you cried out, those small eyes never opened again. You buried them with your own hands.",
        },
      },
      {
        metin: "Accept the truth, cover them and prepare the funeral.",
        basariliSonuc: {
          mesaj: "You don't even have the strength to cry. A part of you was buried with that coffin.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  cocuk_suctustu: {
    baslik: "Caught in the Act",
    metin:
      "A shout went up in the market. A cloth merchant is dragging your child by the collar: 'This little thief stole my goods!' The guards are about to close in.",
    secenekler: [
      {
        metin: "Secretly bribe the guards and the merchant (silence it).",
        basariliSonuc: {
          mesaj:
            "You pressed purses into their hands. The merchant said 'it was a misunderstanding'. Your child, seeing that justice could be bought with money, smiled a nasty smile.",
        },
        basarisizSonuc: {
          mesaj:
            "Even though they took the bribe, they branded your child a thief in front of everyone. Your family name was tarnished.",
        },
      },
      {
        metin: "Take the blame yourself! Say 'if they stole, they stole on my orders.'",
        basariliSonuc: {
          mesaj:
            "You pushed your child aside and held out your hands. As the guards chained you and dragged you to the dungeon, your child cried behind you.",
        },
        basarisizSonuc: {
          mesaj:
            "The guards smirked: 'We'll throw you both in.' Your child and you were both chained; their record is stained now.",
        },
      },
      {
        metin: "Slap the child in front of everyone and hand them over.",
        basariliSonuc: {
          mesaj:
            "You slapped them and handed them over to justice. The market crowd appreciated your honesty, but you will never forget the hatred your child threw at you as they were led to the guardhouse.",
        },
        basarisizSonuc: {
          mesaj: "You struck the child but the merchant still wasn't satisfied. They humiliated you both in the middle of the street.",
        },
      },
    ],
  },

  cocuk_evlilik: {
    baslik: "Your Child's Wedding",
    metin:
      "Your child has grown and will now build their own home. The family expects a big wedding, but things haven't been going well lately.",
    secenekler: [
      {
        metin: "Go into debt and throw a wedding that shakes the city.",
        basariliSonuc: {
          mesaj: "It was a wedding talked about for weeks! The smile on your child's face was worth everything.",
        },
        basarisizSonuc: {
          mesaj: "You spent a lot but it rained, the guests were miserable. The money was completely wasted.",
        },
      },
      {
        metin: "A plain ceremony is enough; there's no need for show.",
        basariliSonuc: {
          mesaj: "You sent them off with a small but warm ceremony. You are at peace.",
        },
        basarisizSonuc: {
          mesaj: "The other family saw this plainness as 'stinginess' and grumbled throughout the ceremony.",
        },
      },
    ],
  },

  cocuk_meslek_secimi: {
    baslik: "Passing On the Legacy",
    metin:
      "Your child has reached the age to choose a trade. You want to hand over the business you built, but they want to set sail and take to adventure.",
    secenekler: [
      {
        metin: "Object, insist: 'You will take over my business!'",
        basariliSonuc: {
          mesaj: "Even if by force, they listened to you. Now they help you, and the business earns more.",
        },
        basarisizSonuc: {
          mesaj: "You quarreled. They packed their things and ran from home. You were left with the business and your tears on your pillow.",
        },
      },
      {
        metin: "Let them choose their own path, give them an allowance.",
        basariliSonuc: {
          mesaj:
            "They hugged you as they boarded the ship. You feel the pride of having raised a child who follows their dreams.",
        },
        basarisizSonuc: {
          mesaj: "You heard nothing for months. Maybe they died in a pirate attack... The worry eats away at you.",
        },
      },
    ],
  },

  cocuk_ziyaret: {
    baslik: "Old Age and Grandchildren",
    metin:
      "Years later your child came to visit you with your grandchildren. The house filled with children's voices for the first time in a long while.",
    secenekler: [
      {
        metin: "Give them your whole day, play games.",
        basariliSonuc: {
          mesaj: "Playing with your grandchildren made you 10 years younger. This, you say, is the real meaning of life.",
        },
        basarisizSonuc: {
          mesaj: "You hurt your back while playing, but it was worth it anyway.",
        },
      },
      {
        metin: "Your old body can't take it; settle for a short chat.",
        basariliSonuc: {
          mesaj: "You tired quickly of the noise and withdrew to your room. Solitude suits you better.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  aile_tuccar_musteri: {
    baslik: "Your Father's Old Friend",
    metin:
      "A very old, ruthless and unbelievably rich merchant came. 'Your father and I did business for years. I could leave you this vast trade network — but on one condition: you will marry your child to my crippled and cruel heir.'",
    secenekler: [
      {
        metin: "My child's life is not for sale! Refuse the offer.",
        basariliSonuc: {
          mesaj:
            "You threw the old man out of your shop. Your child hugged you with tearful eyes. You are not rich, but you are a wonderful parent.",
        },
        basarisizSonuc: {
          mesaj: "The man was furious and turned all your father's old partners against you. Your trade took a heavy wound.",
        },
      },
      {
        metin: "Business is business. Marry your child off by force and take the network.",
        basariliSonuc: {
          mesaj:
            "You signed the contract. You took the helm of a trade empire. Your child didn't even look at you on the wedding day and erased you from their life.",
        },
        basarisizSonuc: {
          mesaj: "Your child fled the house on the wedding night! You got neither the trade nor your child ever again.",
        },
      },
    ],
  },

  aile_soylu_davet: {
    baslik: "The Test of Noble Blood",
    metin:
      "The council of lords, your kin, called you to a secret meeting. They are planning a new and very cruel tax on the peasants. Will you stand by your blood, or by the people?",
    secenekler: [
      {
        metin: "I won't sell out my own blood! Approve the tax.",
        basariliSonuc: {
          mesaj:
            "You stamped your seal. You became the most respected member of the family. While the peasants die of hunger on the roads, gold rains on your castle.",
        },
        basarisizSonuc: {
          mesaj: "When the peasants heard the decision they revolted and stoned your carriage. You barely escaped, covered in blood.",
        },
      },
      {
        metin: "This is tyranny! Oppose it and protect the people.",
        basariliSonuc: {
          mesaj:
            "You overturned the table! They stripped you of your noble title, but as you walk the streets thousands of peasants pray for you.",
        },
        basarisizSonuc: {
          mesaj:
            "Your family beat you and threw you out of the council, and seized your property. And the people never learned what you did.",
        },
      },
    ],
  },

  aile_asker_yoldas: {
    baslik: "Your Father's Bloody Sword",
    metin:
      "In the barracks a scar-faced old officer pulled you aside: 'Your father and I were in the same trench. He died bravely; he'd want me to keep you safe.' He offers to move you to the palace guard.",
    secenekler: [
      {
        metin: "Become a Palace Guard. A warm bed and safe pay.",
        basariliSonuc: {
          mesaj:
            "Using your father's name you slipped into the palace. While your friends fight in the mud, you drink wine.",
        },
        basarisizSonuc: {
          mesaj:
            "The palace commander realized you'd been pulled in by favor and gave you the worst sewer watches. Your reputation reset to zero.",
        },
      },
      {
        metin: "Insist on joining your father's old regiment (the Death Battalion).",
        basariliSonuc: {
          mesaj:
            "You joined the Death Battalion! When the soldiers saw you they said your father's spirit had returned. Your standing is of legendary proportions.",
        },
        basarisizSonuc: {
          mesaj:
            "You pushed yourself too hard to step out of your father's shadow and were ambushed. Your courage nearly cost you your life.",
        },
      },
    ],
  },

  aile_kole_gecmis: {
    baslik: "The Mark of Chains",
    metin:
      "The son of the cruel master who once owned your father saw you in a tavern. Laughing, saying 'Isn't this our slave's child?', he throws you a purse of gold to kiss his foot.",
    secenekler: [
      {
        metin: "Take the gold and kiss his foot. Pride doesn't fill a belly.",
        basariliSonuc: {
          mesaj:
            "You kissed his foot. You were humiliated in front of everyone in the tavern. Your purse filled, but your soul stayed crushed on that floor.",
        },
        basarisizSonuc: {
          mesaj: "As you bent down he kicked you in the face! You didn't get the full gold and your reputation was destroyed.",
        },
      },
      {
        metin: "Overturn the table and show him you are no slave!",
        basariliSonuc: {
          mesaj:
            "The punch you landed on his face knocked the man to the floor. The crowd admired your courage. No one can mock your past now!",
        },
        basarisizSonuc: {
          mesaj: "His guards beat you until you passed out. But everyone understood you were an unbowing lion.",
        },
      },
    ],
  },

  aile_isci_grev: {
    baslik: "The Fire of Revolt",
    metin:
      "The workers rose up at the factory where your father worked in blood and sweat for years and sickened and died. They are about to burn the factory down. The union wants to see you as their leader.",
    secenekler: [
      {
        metin: "Take up the torch! 'You will pay for what you did to my father!'",
        basariliSonuc: {
          mesaj:
            "You turned the strike into a revolution! The bosses knelt. You avenged your father and became the people's idol.",
        },
        basarisizSonuc: {
          mesaj:
            "The gendarmes showed no mercy. You were trampled under truncheons and horses. Branded a traitor, you were thrown in the dungeon.",
        },
      },
      {
        metin: "Meet secretly with the boss and sell out the revolt from within.",
        basariliSonuc: {
          mesaj:
            "You gave the boss the leaders' names. The revolt was put down. The boss made you a manager, but your own neighborhood spits in your face now.",
        },
        basarisizSonuc: {
          mesaj: "The workers saw you leaving the boss's office! Thanks to the guards you were saved from a lynching by seconds.",
        },
      },
    ],
  },

  aile_cellat_soyad: {
    baslik: "The Son of the Severing Blade",
    metin:
      "The family of the person you love with all your heart learned your past: 'We do not give our daughter/son to the seed of an executioner!' Either you disown your surname, or you live without them.",
    secenekler: [
      {
        metin: "Say 'I am ashamed of my father! I'm changing my surname.'",
        basariliSonuc: {
          mesaj:
            "You denied your past. You married, but your father's sad eyes and this life built on a lie eat away at you.",
        },
        basarisizSonuc: {
          mesaj: "You both denied it and they didn't believe you. Saying 'there's death in your blood', they threw you out.",
        },
      },
      {
        metin: "I will use your fears! Become the chief dungeon-keeper.",
        basariliSonuc: {
          mesaj:
            "You forgot about love. You became the state's most feared dungeon-keeper. That family who wouldn't give you their daughter now trembles in fear of you.",
        },
        basarisizSonuc: {
          mesaj: "You tried to intimidate, but the nobles crushed a lowlife like you instantly. You were left jobless and alone.",
        },
      },
    ],
  },

  aile_hekim_hasta: {
    baslik: "The Price of Healing",
    metin:
      "An epidemic has broken out in the region. Your own child/spouse is burning with fever, and at the same moment 10 children in the neighborhood orphanage are dying. The herbs your mother left you are enough for only 1 person or 1 group.",
    secenekler: [
      {
        metin: "Give it only to my own family (my child); I don't care about the others.",
        basariliSonuc: {
          mesaj:
            "You saved your own family. When morning came and 10 small corpses were carried from the orphanage, you shut your window tight.",
        },
        basarisizSonuc: {
          mesaj:
            "The medicine didn't fully work on your family, but at least they're alive. And the curse of those dead children is on you.",
        },
      },
      {
        metin: "These herbs are everyone's right! Go to the orphanage.",
        basariliSonuc: {
          mesaj:
            "You saved the orphans! As a blessing, your own child gained immunity too. The city is grateful enough to raise a statue in your name.",
        },
        basarisizSonuc: {
          mesaj:
            "The orphans lived... But when you got home you found your own child already cold. You became a hero, but your soul died.",
        },
      },
    ],
  },

  aile_kacakci_teklif: {
    baslik: "Bloody Gold",
    metin:
      "Your father's old underworld partners came. They want to use your tunnels to smuggle the royal jewels they stole from the palace treasury out of the city.",
    secenekler: [
      {
        metin: "Smuggle the jewels! This is my father's legacy.",
        basariliSonuc: {
          mesaj:
            "You smuggled the jewels out! The king went mad, but overnight you reached unimaginable wealth.",
        },
        basarisizSonuc: {
          mesaj:
            "You were reported! The guards raided the tunnel. They took your fortune and threw you in the dungeons.",
        },
      },
      {
        metin: "I will not be a criminal like my father! Report them.",
        basariliSonuc: {
          mesaj: "You sold the men to the king! The king rewarded you and cleared your family's name.",
        },
        basarisizSonuc: {
          mesaj:
            "They learned of your report. They raided your house at night and put you to the sword. You paid for your honesty in blood.",
        },
      },
    ],
  },

  aile_ciftci_kitlik: {
    baslik: "A Cry From the Village",
    metin:
      "There's a letter from your village: famine has struck, your siblings and mother are eating tree bark. They ask you to send your entire salary and savings. But you have a family in the city to provide for too.",
    secenekler: [
      {
        metin: "Cut my own child's/spouse's provisions and send it to the village.",
        basariliSonuc: {
          mesaj:
            "Your siblings in the village survived on your money. But your own child slept hungry for weeks and looked at you with hatred.",
        },
        basarisizSonuc: {
          mesaj:
            "You sent the money but bandits took it on the road. Both your own family went hungry and those in the village died without help.",
        },
      },
      {
        metin: "This is my home. Those in the village can fend for themselves.",
        basariliSonuc: {
          mesaj:
            "You kept your money for yourself. Your own children slept full. Months later, the only news from the village was that your mother had died.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  genel_kayip_cocuk_arama: {
    baslik: "The Missing Child",
    metin:
      "A child has gone missing in the neighborhood; darkness is falling and everyone is gathering volunteers for the search.",
    secenekler: [
      {
        metin: "Join the search.",
        basariliSonuc: {
          mesaj: "You found the child in an old mill; the family was grateful to you.",
          detay: "Every step you took that night was worth it; the mother's tears are still on your mind.",
        },
        basarisizSonuc: {
          mesaj: "You searched all night, and another group found the child.",
          detay: "You did what you could; it didn't change the outcome but it didn't make your effort worthless.",
        },
      },
      {
        metin: "Stay home, don't get involved.",
        basariliSonuc: {
          mesaj: "You stayed home; the child turned up on their own toward morning.",
          detay: "It ended well, but there's a slight guilt in you for not joining.",
        },
        basarisizSonuc: {
          mesaj: "Your neighbors asked, 'everyone searched, where were you?'",
          detay: "Sometimes not joining carries a price too.",
        },
      },
    ],
  },

  orgut_cocuk_katilimi: {
    baslik: "A Dark Legacy",
    metin:
      "The leaders of the secret organization you belong to met with you privately. They say they have been watching your own child for years and want to bring them into the organization too. This could bury your child's life in darkness forever.",
    secenekler: [
      {
        metin: "Take my child in too. Let my legacy continue.",
        basariliSonuc: {
          mesaj: "Your child took the oath and melted into the shadows. Within the organization your family's place became legendary.",
          detay: "You are very powerful. But now at dinner you see the innocence in your child's eyes has died.",
        },
        basarisizSonuc: {
          mesaj: "Your child grew frightened during the ritual and tried to run. The organization punished them.",
          detay: "You broke your child's heart and the organization marked you an incompetent parent.",
        },
      },
      {
        metin: "Never! My child will not touch this filthy business.",
        basariliSonuc: {
          mesaj: "You drew your weapon and defied the leaders. They excommunicated you from the organization, but you saved your child.",
          detay: "You are an ordinary person now, and in danger, but you are proud of your parenting.",
        },
        basarisizSonuc: {
          mesaj: "The moment you refused you were attacked! Badly wounded, you barely fled the city with your child.",
          detay: "You left everything behind. You are in poverty, but you are together.",
        },
      },
    ],
  },

  aile_ikilem_cocugun_egitimi: {
    baslik: "Your Child's Future",
    metin:
      "{cocuk} wants to train under a skilled master, but it will swallow most of the money you've saved. You either invest in this chance or keep the money for your own future.",
    secenekler: [
      {
        metin: "Spend the money, invest in {cocuk}'s education.",
        basariliSonuc: {
          mesaj: "{cocuk} began their training; the excitement in their eyes was worth every coin.",
          detay: "The fruit of some investments is harvested years later.",
        },
        basarisizSonuc: {
          mesaj: "The training began but {cocuk} struggled; still, they're doing their best.",
          detay: "Not every investment bears fruit at once.",
        },
      },
      {
        metin: "Keep the money, secure your own future.",
        basariliSonuc: {
          mesaj: "You kept the money; {cocuk} was disappointed but your finances are safe.",
          detay: "Some securities are traded for the dreams of those you love.",
        },
        basarisizSonuc: {
          mesaj: "{cocuk} never forgot this decision; a silent distance formed between you.",
          detay: "The price of some decisions is paid for years.",
        },
      },
    ],
  },

  aile_ikilem_yasli_ebeveyn_bakimi: {
    baslik: "Aging Hands",
    metin:
      "{baba} and {anne} are no longer as strong as before; both need regular care, perhaps a helper. It will take both your money and your time — but they are the ones who raised you.",
    secenekler: [
      {
        metin: "Set aside money for regular care, visit often.",
        basariliSonuc: {
          mesaj: "{anne} and {baba} are more comfortable now; the gratitude on their faces was worth every coin.",
          detay: "Some debts are paid not with money but with time.",
        },
        basarisizSonuc: {
          mesaj: "You did what you could but the troubles of old age never end.",
          detay: "Some burdens never lighten, they are only shared.",
        },
      },
      {
        metin: "Focus on your own work and family, drop by now and then.",
        basariliSonuc: {
          mesaj: "You focused on your work; {anne} and {baba} get by, but you notice the sadness in their voices.",
          detay: "Time is the one thing you can't get back.",
        },
        basarisizSonuc: {
          mesaj:
            "The neighbors began to talk of you as 'one who doesn't look after his family'; {baba} never said it to you, but you know he was hurt.",
          detay: "Silent hurts are the deepest.",
        },
      },
    ],
  },

  aile_ikilem_esin_hayali: {
    baslik: "Your Spouse's Dream",
    metin:
      "{es} wants to realize a dream they've held for years: to start their own business. For this they need a significant part of the family's savings. It's risky, but you see the light in their eyes.",
    secenekler: [
      {
        metin: "Give the savings, support their dream.",
        basariliSonuc: {
          mesaj: "{es} started their business; the excitement in their eyes was brighter than it had been in years.",
          detay: "Some investments show up not on the balance sheet but in the relationship.",
        },
        basarisizSonuc: {
          mesaj: "The venture didn't go as hoped; the money is gone but {es} is grateful, at least, that you tried.",
          detay: "Sometimes it's not the result but the support that matters.",
        },
      },
      {
        metin: "Say no, keep the savings safe.",
        basariliSonuc: {
          mesaj: "You refused; {es} took it with understanding, but the light in their eyes dimmed a little.",
          detay: "Safety is sometimes bought at the price of a dream.",
        },
        basarisizSonuc: {
          mesaj: "{es} never forgot this refusal; an unspoken hurt formed between you.",
          detay: "Some no's leave a mark on a marriage.",
        },
      },
    ],
  },

  aile_ikilem_kardesin_borcu: {
    baslik: "A Gambling Debt",
    metin:
      "A relative showed up at your door: they've fallen into a large gambling debt, the creditors are threatening. They ask you to clear the debt, or they won't even say 'what might happen'.",
    secenekler: [
      {
        metin: "Pay the debt, keep the family peace.",
        basariliSonuc: {
          mesaj: "You cleared the debt; your relative thanked you in tears and swore 'never again'.",
          detay: "You've lost count of how many times you've heard 'never again', but you did it anyway.",
        },
        basarisizSonuc: {
          mesaj: "You cleared the debt but your relative was back at your door a month later.",
          detay: "Some habits don't end in one go.",
        },
      },
      {
        metin: "Refuse, let them solve their own problem.",
        basariliSonuc: {
          mesaj: "You refused; your relative left in anger but solved the problem on their own.",
          detay: "Sometimes tough love is the right thing.",
        },
        basarisizSonuc: {
          mesaj: "The creditors escalated the matter and the family name was tarnished in the neighborhood.",
          detay: "A refusal sometimes comes back at a greater cost.",
        },
      },
    ],
  },

  aile_ikilem_cocugun_secimi: {
    baslik: "A Different Path",
    metin:
      "{cocuk} announced they want to choose not your trade but an art society doesn't much respect (traveling theater, street music). Hearing their decision, you feel both pride and fear.",
    secenekler: [
      {
        metin: "Support their decision, clear the way for them.",
        basariliSonuc: {
          mesaj: "{cocuk} hugged you with tearful eyes. There's some gossip in the neighborhood, but your conscience is at peace.",
          detay: "Some pride shines not in society's eyes but within the home.",
        },
        basarisizSonuc: {
          mesaj: "Your support pleased them but the neighbors criticized you as 'unable to control your child'.",
          detay: "Not every support is met with applause.",
        },
      },
      {
        metin: "Insistently steer them toward the family trade.",
        basariliSonuc: {
          mesaj: "{cocuk} chose your path, however reluctantly; the light in their eyes never came back as it was.",
          detay: "Some victories are no different from losing.",
        },
        basarisizSonuc: {
          mesaj: "{cocuk} left home; you heard nothing for years.",
          detay: "Insisting sometimes loses you what you had.",
        },
      },
    ],
  },

  aile_ikilem_miras_kavgasi: {
    baslik: "A Share of the Inheritance",
    metin:
      "A distant relative died and an ugly fight over the property they left broke out among the relatives. You can defend your share to the last, or withdraw for the sake of peace.",
    secenekler: [
      {
        metin: "Hire a lawyer, pursue your rights to the end.",
        basariliSonuc: {
          mesaj: "The court ruled in your favor; you got your share but your relative never contacted you again.",
          detay: "You can't tell whether the gold you won outweighed the kinship you lost.",
        },
        basarisizSonuc: {
          mesaj: "You lost the case; both the costs came out of your pocket and you made an enemy within the family.",
          detay: "In some fights no one wins.",
        },
      },
      {
        metin: "Give up your share, choose family peace.",
        basariliSonuc: {
          mesaj: "You gave up your share; your relative thanked you in surprise, and your family bonds grew stronger.",
          detay: "Some riches aren't measured in gold.",
        },
        basarisizSonuc: {
          mesaj: "You gave it up but the other relatives read it as 'weakness' and took you lightly.",
          detay: "Kindness is not always appreciated.",
        },
      },
    ],
  },

  aile_ikilem_ikisi_bir_arada: {
    baslik: "Two Invitations, One Day",
    metin:
      "{dost}'s most important day and the meeting for the greatest business opportunity of your life fell on exactly the same day. You can't make it to both.",
    secenekler: [
      {
        metin: "Be there for {dost}.",
        basariliSonuc: {
          mesaj: "You were there for {dost}; the happiness in their eyes was worth the opportunity you missed.",
          detay: "Some moments never come back, just like missed opportunities.",
        },
        basarisizSonuc: {
          mesaj: "You were there, but a regret stayed in you for missing the opportunity.",
          detay: "Even the right choice sometimes stings a little.",
        },
      },
      {
        metin: "Go to the business meeting.",
        basariliSonuc: {
          mesaj: "The meeting went wonderfully, you seized a great opportunity. {dost}, though, never contacted you like before.",
          detay: "Your career rose but there's an empty chair at your table now.",
        },
        basarisizSonuc: {
          mesaj: "The meeting didn't go as hoped either, and on top of it you hurt {dost}.",
          detay: "Some days lose you both business and heart.",
        },
      },
    ],
  },

  aile_koken_kole_onyargi: {
    baslik: "An Old Shadow",
    metin:
      "The master of the guild you wanted to join refused your membership, recalling your family's slave past: 'No one of your line comes under this roof,' he said. His words still ring in your ears.",
    secenekler: [
      {
        metin: "Defy him in front of everyone, defend your rights.",
        basariliSonuc: {
          mesaj: "Your words echoed within the guild; some members quietly showed their support.",
          detay: "Some challenges bear fruit with time.",
        },
        basarisizSonuc: {
          mesaj: "The master declared you 'insolent' and shut the guild doors to you forever.",
          detay: "Not every challenge is won.",
        },
      },
      {
        metin: "Withdraw quietly, work twice as hard and prove yourself another way.",
        basariliSonuc: {
          mesaj:
            "Over the years your independent work grew so renowned that the guild now wants you in its ranks.",
          detay: "Patience is sometimes the sharpest answer.",
        },
        basarisizSonuc: {
          mesaj: "Your efforts moved slowly; the prejudice was not easily broken.",
          detay: "Some walls don't come down alone.",
        },
      },
    ],
  },

  aile_koken_soylu_ayricalik: {
    baslik: "An Old Debt",
    metin:
      "An old farmer came to your door: he says your great-grandfather unjustly took his land and the debt is still on his family's back. He has an old, yellowed document in his hand.",
    secenekler: [
      {
        metin: "Examine the document; if he's right, pay compensation.",
        basariliSonuc: {
          mesaj: "The document was genuine; you paid the compensation and the old man thanked you in tears.",
          detay: "Some debts deserve to be paid even generations later.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but the man still couldn't fully get over his hurt.",
          detay: "Some wounds don't fully close with money.",
        },
      },
      {
        metin: "Use your noble influence to drive the man from your door.",
        basariliSonuc: {
          mesaj: "You had the man thrown out; no one could stand against you, but something bothered you inside.",
          detay: "Privilege sometimes silences the conscience, but does not kill it.",
        },
        basarisizSonuc: {
          mesaj: "The man's story spread through the neighborhood; rumors of a 'cruel noble' began to follow you.",
          detay: "Some truths can't be silenced.",
        },
      },
    ],
  },

  aile_koken_tefeci_borc_defteri: {
    baslik: "Your Father's Ledger",
    metin:
      "Going through the old debt ledger your father left, you saw dozens of names still unpaid — some now old, poor, helpless. The ledger still means a collectible fortune.",
    secenekler: [
      {
        metin: "Ruthlessly collect every debt in the ledger.",
        basariliSonuc: {
          mesaj: "You collected the debts one by one; your coffer filled, but your father's nickname stuck to you too in the neighborhood.",
          detay: "Some inheritances carry as much hatred as wealth.",
        },
        basarisizSonuc: {
          mesaj: "Some debtors cursed you openly, one even threatened you.",
          detay: "Ruthless collection sometimes stockpiles enemies.",
        },
      },
      {
        metin: "Burn the ledger, free everyone of their debt.",
        basariliSonuc: {
          mesaj:
            "News that you threw the ledger in the fire spread fast in the neighborhood; your father's tainted name was cleared a little thanks to you.",
          detay: "Some riches are worth burning.",
        },
        basarisizSonuc: {
          mesaj: "You burned the ledger but some old debtors thought it a trick and still keep their distance.",
          detay: "Trust isn't built in a day.",
        },
      },
    ],
  },

  aile_koken_kacakci_eski_baglanti: {
    baslik: "An Old Face",
    metin:
      "In a dark street, your father's old smuggling partner appeared before you. He wants to move a valuable but forbidden good from across the border through you, no questions asked.",
    secenekler: [
      {
        metin: "Accept the offer, return to the family trade.",
        basariliSonuc: {
          mesaj: "The goods passed through without trouble; your coffer filled, but you noticed you were walking in your father's footsteps.",
          detay: "Some blood just won't change.",
        },
        basarisizSonuc: {
          mesaj: "A patrol caught you at the last moment; you barely fled but lost the goods and the money.",
          detay: "Old lives sometimes draw you into a trap.",
        },
      },
      {
        metin: "Refuse, remind him you left that life behind.",
        basariliSonuc: {
          mesaj: "You refused the offer; the man shrugged and melted into the dark, and you felt lighter.",
          detay: "Refusing the past is a kind of courage too.",
        },
        basarisizSonuc: {
          mesaj: "Word of your refusal went round the old circle as 'he's not one of us anymore'.",
          detay: "Some doors, once closed, don't open again.",
        },
      },
    ],
  },

  aile_koken_cellat_damgasi: {
    baslik: "A Duty Called By Blood",
    metin:
      "The local authorities, knowing your father's old trade, want you to carry out an execution personally: 'This is already in your blood,' they say. Refusing will be seen as strange, but accepting will brand you forever.",
    secenekler: [
      {
        metin: "Refuse, say this fate is not yours.",
        basariliSonuc: {
          mesaj: "You refused; the authorities found someone else, and you stepped one more pace out of your father's shadow.",
          detay: "Fate is sometimes waiting to be refused.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal became a story of 'one who fled his family's duty', and some doors closed.",
          detay: "Fleeing the past has a price too.",
        },
      },
      {
        metin: "Accept, be the continuation of the family trade.",
        basariliSonuc: {
          mesaj: "You carried out the duty; the authorities are pleased, but now even children who see you on the street whisper.",
          detay: "Some inheritances label you forever.",
        },
        basarisizSonuc: {
          mesaj: "You barely finished the duty; since that night your sleep has been uneasy.",
          detay: "Even if it's in your blood, this weight is not light.",
        },
      },
    ],
  },

  aile_koken_saray_sirlari: {
    baslik: "A Secret Your Mother Knew",
    metin:
      "You remembered a secret from your mother's old palace days: a shameful past of an influential noble. This knowledge could give you a great advantage, or it might deserve to be quietly buried.",
    secenekler: [
      {
        metin: "Use the secret to wring an advantage from the noble.",
        basariliSonuc: {
          mesaj:
            "The noble, afraid of the secret coming out, gave you what you wanted; you won, but you broke the principle of loyalty your mother taught.",
          detay: "Some gains are built on an oath.",
        },
        basarisizSonuc: {
          mesaj: "Instead of bowing to the blackmail, the noble chose to discredit you.",
          detay: "Some gambles backfire.",
        },
      },
      {
        metin: "Keep the secret forever, stay true to your mother's oath of loyalty.",
        basariliSonuc: {
          mesaj: "You never used the secret; you kept alive that old palace loyalty your mother taught.",
          detay: "Some inheritances are worth more than gold.",
        },
        basarisizSonuc: {
          mesaj: "You gained nothing for your silence, only kept your peace.",
          detay: "Virtue's reward is not always concrete.",
        },
      },
    ],
  },

  aile_koken_surgun_geri_donus: {
    baslik: "A Forgiven Line",
    metin:
      "The grandchild of the ruler who exiled your family issued an official pardon for your family, to make up for the mistakes of the past. You can return to your ancestors' lands and reclaim your legacy — but you'll have to leave your present life here.",
    secenekler: [
      {
        metin: "Leave everything, return to your ancestors' lands.",
        basariliSonuc: {
          mesaj:
            "When you first set foot on your ancestors' lands your eyes filled; a longing carried for generations was finally soothed.",
          detay: "Some journeys are measured not in money but in soul.",
        },
        basarisizSonuc: {
          mesaj:
            "The return wasn't as you'd hoped; the old lands weren't familiar anymore, and you felt lost between two worlds.",
          detay: "Some homecomings end in disappointment.",
        },
      },
      {
        metin: "Stay here, protect the life you built.",
        basariliSonuc: {
          mesaj:
            "You didn't accept the pardon; your life went on here, but never having seen your ancestors' land left a slight emptiness in you.",
          detay: "Some doors deserve to stay closed too.",
        },
        basarisizSonuc: {
          mesaj: "The more you questioned your decision, the more the unease inside you grew.",
          detay: "Some questions stay unanswered for years.",
        },
      },
    ],
  },

  aile_koken_madenci_cokme_anisi: {
    baslik: "News From Underground",
    metin:
      "Like that old mine your uncle was buried in, a nearby mine collapsed; dozens of workers are trapped. You can volunteer for the rescue team or donate money from a safe distance.",
    secenekler: [
      {
        metin: "Join the rescue team yourself.",
        basariliSonuc: {
          mesaj:
            "You worked for hours in the dark tunnels; when you brought a few workers out alive you couldn't hold back your tears.",
          detay: "The help your uncle never got, you brought to others.",
        },
        basarisizSonuc: {
          mesaj: "The tunnel began to collapse on you too; you were brought out with difficulty, badly wounded.",
          detay: "The underground tested your family once more.",
        },
      },
      {
        metin: "Make a generous donation from a safe distance.",
        basariliSonuc: {
          mesaj: "Your donation strengthened the rescue team's equipment; many workers were saved thanks to you.",
          detay: "Not every act of heroism happens underground.",
        },
        basarisizSonuc: {
          mesaj: "Despite your donation the rescue fell short; you felt your uncle's story repeat once more.",
          detay: "Some pains repeat through history.",
        },
      },
    ],
  },
};
