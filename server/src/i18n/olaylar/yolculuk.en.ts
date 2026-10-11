import type { OlayCeviri } from "./index";

/**
 * yolculuk.ts — "Büyük yolculuk" zincirlerinin İngilizce çevirisi (87 olay).
 * Türkçe kaynak kanonik; yalnız gösterim metinleri burada.
 */
export const OLAYLAR_YOLCULUK_EN: Record<string, OlayCeviri> = {
  hac_sunni_karar: {
    baslik: "Intent for the Hajj",
    metin: "Your vow money is finally enough; it may be time for the Hajj to Mecca. A caravan leaves overland next month, and a ship sails for Jeddah.",
    secenekler: [
      {
        metin: "Join the caravan overland.",
        basariliSonuc: {
          mesaj: "You bade your congregation farewell; the caravan left the gate at dawn.",
          detay: "One of your life's turning points.",
        },
        basarisizSonuc: {
          mesaj: "Preparations cost more than expected, but you set out with the caravan.",
          detay: "Lighter purse, firm intent.",
        },
      },
      {
        metin: "Board the ship to Jeddah.",
        basariliSonuc: {
          mesaj: "You bade your congregation farewell; the ship left port at dawn.",
          detay: "Faster than the caravan, but the sea tests too.",
        },
        basarisizSonuc: {
          mesaj: "Ticket prices rose last minute, but you boarded anyway.",
          detay: "Lighter purse, firm intent.",
        },
      },
      {
        metin: "Not this year; your congregation comes first.",
        basariliSonuc: {
          mesaj: "Your congregation appreciated the delay.",
          detay: "Maybe next year.",
        },
        basarisizSonuc: {
          mesaj: "Watching the caravan's dust, longing grew in you.",
          detay: "Some vows must wait.",
        },
      },
    ],
  },
  hac_sunni_yolda: {
    baslik: "The Desert's Trial",
    metin: "The caravan has trudged for days under a scorching sun. A sandstorm rises and the waterskins run light.",
    secenekler: [
      {
        metin: "Trust the caravan master; press on together.",
        basariliSonuc: {
          mesaj: "You weathered the storm together; weary but alive.",
          detay: "Desert passed; the holy city is near.",
        },
        basarisizSonuc: {
          mesaj: "The storm scattered the caravan; you regrouped parched and spent.",
          detay: "Body weary, resolve intact.",
        },
      },
      {
        metin: "Share your water with an old, weary pilgrim.",
        basariliSonuc: {
          mesaj: "You shared your water; the old pilgrim kissed your hand and prayed.",
          detay: "Thirsty, yet your conscience is light.",
        },
        basarisizSonuc: {
          mesaj: "The water fell short; you both pressed on, spent.",
          detay: "You paid for kindness with your body, no regrets.",
        },
      },
    ],
  },
  hac_sunni_varis: {
    baslik: "In the Presence of the Kaaba",
    metin: "At your first sight of the Kaaba, months of weariness melted away. Thousands of pilgrims around you share the feeling.",
    secenekler: [
      {
        metin: "Complete the tawaf patiently, in tears.",
        basariliSonuc: {
          mesaj: "You circled the Kaaba seven times; the peace within is beyond words.",
          detay: "You are a Hadji now; the title will change you.",
        },
        basarisizSonuc: {
          mesaj: "Your head spun in the crowd, but pilgrims carried you through the circuit.",
          detay: "Body weakened, worship done; you are a Hadji.",
        },
      },
      {
        metin: "Pray quietly, apart from the crowd.",
        basariliSonuc: {
          mesaj: "You prayed in your own silence; the peace was deep and personal.",
          detay: "Quiet worship, yet the Hajj is done; you are a Hadji.",
        },
        basarisizSonuc: {
          mesaj: "You prayed in your own silence; the peace was deep and personal.",
          detay: "Quiet worship, yet the Hajj is done; you are a Hadji.",
        },
      },
    ],
  },
  hac_katolik_karar: {
    baslik: "The Jerusalem Vow",
    metin: "You have long carried a vow: to see the Holy Sepulchre. A ship sails for Jerusalem; a pilgrim caravan also goes overland.",
    secenekler: [
      {
        metin: "Board the ship and sail for Jerusalem.",
        basariliSonuc: {
          mesaj: "You bade your congregation farewell; the ship left port at dawn.",
          detay: "One of your life's turning points.",
        },
        basarisizSonuc: {
          mesaj: "Preparations cost more than expected, but you sailed anyway.",
          detay: "Lighter purse, firm intent.",
        },
      },
      {
        metin: "Join the caravan overland via the Balkans.",
        basariliSonuc: {
          mesaj: "You bade your congregation farewell; the caravan left the gate at dawn.",
          detay: "Cheaper than a ship, but far longer.",
        },
        basarisizSonuc: {
          mesaj: "Preparations cost more than expected, but you set out with the caravan.",
          detay: "Lighter purse, firm intent.",
        },
      },
      {
        metin: "Not this year; your congregation comes first.",
        basariliSonuc: {
          mesaj: "Your congregation appreciated the delay.",
          detay: "Maybe next year.",
        },
        basarisizSonuc: {
          mesaj: "Watching the ship leave, longing grew in you.",
          detay: "Some vows must wait.",
        },
      },
    ],
  },
  hac_katolik_yolda: {
    baslik: "The Sea and Pirates",
    metin: "Crossing the Mediterranean, a suspicious sail appears; the captain whispers of pirates. The sky is darkening too.",
    secenekler: [
      {
        metin: "Trust the captain; face the danger together.",
        basariliSonuc: {
          mesaj: "You left the storm and the suspicious ship behind; weary but alive.",
          detay: "Sea passed; the holy city is near.",
        },
        basarisizSonuc: {
          mesaj: "The storm drove the ship off course; you drifted for days.",
          detay: "Body weary, resolve intact.",
        },
      },
      {
        metin: "Give a sick passenger your medicine and food.",
        basariliSonuc: {
          mesaj: "You shared your medicine; the passenger recovered and prayed for you.",
          detay: "Weaker, but your conscience is light.",
        },
        basarisizSonuc: {
          mesaj: "The help fell short; you both carried on, weakened.",
          detay: "You paid for kindness with your body, no regrets.",
        },
      },
    ],
  },
  hac_katolik_varis: {
    baslik: "Before the Holy Sepulchre",
    metin: "In Jerusalem your first stop is the Church of the Holy Sepulchre. Stepping inside, months of weariness melt away.",
    secenekler: [
      {
        metin: "Kneel and pray long, in tears.",
        basariliSonuc: {
          mesaj: "You knelt before the Holy Sepulchre; the peace within is beyond words.",
          detay: "Now a Pilgrim of Jerusalem; it will change you.",
        },
        basarisizSonuc: {
          mesaj: "Your head spun in the crowd, but pilgrims carried you to the service.",
          detay: "Body weakened, but you are a Pilgrim of Jerusalem.",
        },
      },
      {
        metin: "Pray quietly, apart from the crowd.",
        basariliSonuc: {
          mesaj: "You prayed in your own silence; the peace was deep and personal.",
          detay: "Quiet worship made you a Pilgrim of Jerusalem.",
        },
        basarisizSonuc: {
          mesaj: "You prayed in your own silence; the peace was deep and personal.",
          detay: "Quiet worship made you a Pilgrim of Jerusalem.",
        },
      },
    ],
  },
  hac_ortodoks_karar: {
    baslik: "A Vow of Holy Pilgrimage",
    metin: "You have long carried a vow: to see the Holy Sepulchre. A pilgrim group gathers overland; a ship also leaves Constantinople.",
    secenekler: [
      {
        metin: "Join the group overland.",
        basariliSonuc: {
          mesaj: "You bade your congregation farewell; the group set out at dawn.",
          detay: "One of your life's turning points.",
        },
        basarisizSonuc: {
          mesaj: "Preparations cost more than expected, but you set out with the group.",
          detay: "Lighter purse, firm intent.",
        },
      },
      {
        metin: "Board the Constantinople ship and go by sea.",
        basariliSonuc: {
          mesaj: "You bade your congregation farewell; the ship left the Bosphorus at dawn.",
          detay: "Faster than the road, but the sea tests too.",
        },
        basarisizSonuc: {
          mesaj: "Ticket prices rose last minute, but you boarded anyway.",
          detay: "Lighter purse, firm intent.",
        },
      },
      {
        metin: "Not this year; your congregation comes first.",
        basariliSonuc: {
          mesaj: "Your congregation appreciated the delay.",
          detay: "Maybe next year.",
        },
        basarisizSonuc: {
          mesaj: "Watching the caravan leave, longing grew in you.",
          detay: "Some vows must wait.",
        },
      },
    ],
  },
  hac_ortodoks_yolda: {
    baslik: "Danger in the Mountain Pass",
    metin: "A snowstorm hits as the caravan crosses a narrow pass. Ahead, brigands' shadows hold the way.",
    secenekler: [
      {
        metin: "Slip along the guide's hidden trail.",
        basariliSonuc: {
          mesaj: "You slipped past the brigands unseen; weary but alive.",
          detay: "Mountain passed; the holy city is near.",
        },
        basarisizSonuc: {
          mesaj: "The blizzard scattered the caravan; you regrouped frozen and spent.",
          detay: "Body weary, resolve intact.",
        },
      },
      {
        metin: "Carry an old pilgrim who cannot walk.",
        basariliSonuc: {
          mesaj: "You carried the old pilgrim; at the pass's end he prayed for you in tears.",
          detay: "Weaker, but your conscience is light.",
        },
        basarisizSonuc: {
          mesaj: "You both collapsed under the load, but crossed the pass.",
          detay: "You paid for kindness with your body, no regrets.",
        },
      },
    ],
  },
  hac_ortodoks_varis: {
    baslik: "Kneeling at the Holy Sepulchre",
    metin: "In Jerusalem your first stop is the Church of the Holy Sepulchre. Stepping inside, months of weariness melt away.",
    secenekler: [
      {
        metin: "Kneel and pray long, in tears.",
        basariliSonuc: {
          mesaj: "You knelt before the Holy Sepulchre; the peace within is beyond words.",
          detay: "Now a Pilgrim of the Holy Land; it will change you.",
        },
        basarisizSonuc: {
          mesaj: "Your head spun in the crowd, but pilgrims carried you to the service.",
          detay: "Body weakened, but you are a Pilgrim of the Holy Land.",
        },
      },
      {
        metin: "Pray quietly, apart from the crowd.",
        basariliSonuc: {
          mesaj: "You prayed in your own silence; the peace was deep and personal.",
          detay: "Quiet worship made you a Pilgrim of the Holy Land.",
        },
        basarisizSonuc: {
          mesaj: "You prayed in your own silence; the peace was deep and personal.",
          detay: "Quiet worship made you a Pilgrim of the Holy Land.",
        },
      },
    ],
  },
  hac_anglikan_karar: {
    baslik: "Expedition to the Holy Land",
    metin: "A travel company runs a tour to Jerusalem by steamship across the Mediterranean. A new overland route by train through Europe is also on offer.",
    secenekler: [
      {
        metin: "Buy a ticket and board the steamship.",
        basariliSonuc: {
          mesaj: "You bade your congregation farewell; the ship left port.",
          detay: "One of your life's turning points.",
        },
        basarisizSonuc: {
          mesaj: "Preparations cost more than expected, but you boarded anyway.",
          detay: "Lighter purse, firm intent.",
        },
      },
      {
        metin: "Take the new railway through Europe.",
        basariliSonuc: {
          mesaj: "You bade your congregation farewell; the train left on time.",
          detay: "Exciting railway, but its reliability is unproven.",
        },
        basarisizSonuc: {
          mesaj: "Ticket prices rose last minute, but you boarded the train anyway.",
          detay: "Lighter purse, firm intent.",
        },
      },
      {
        metin: "Not this year; your congregation comes first.",
        basariliSonuc: {
          mesaj: "Your congregation appreciated the delay.",
          detay: "Maybe next year.",
        },
        basarisizSonuc: {
          mesaj: "Watching the ship leave, longing grew in you.",
          detay: "Some vows must wait.",
        },
      },
    ],
  },
  hac_anglikan_yolda: {
    baslik: "Quarantine Harbor",
    metin: "At an Ottoman port, cholera suspicion spreads on deck. Officials say the ship may be quarantined for days.",
    secenekler: [
      {
        metin: "Obey the rules; wait out the quarantine.",
        basariliSonuc: {
          mesaj: "You endured the quarantine; everyone continued in good health.",
          detay: "Waiting passed; the holy city is near.",
        },
        basarisizSonuc: {
          mesaj: "A few real cases broke out aboard; you waited anxiously and weakened.",
          detay: "Body weary, resolve intact.",
        },
      },
      {
        metin: "Give a sick passenger your medicine and food.",
        basariliSonuc: {
          mesaj: "You shared your medicine; the passenger recovered, grateful.",
          detay: "Weaker, but your conscience is light.",
        },
        basarisizSonuc: {
          mesaj: "The help fell short; you both carried on, weakened.",
          detay: "You paid for kindness with your body, no regrets.",
        },
      },
    ],
  },
  hac_anglikan_varis: {
    baslik: "The View from the Mount of Olives",
    metin: "In Jerusalem you climb the Mount of Olives and look down on the holy city. Months of weariness melt away.",
    secenekler: [
      {
        metin: "Sit quietly and pray in gratitude.",
        basariliSonuc: {
          mesaj: "Watching sunset on the Mount of Olives, the peace within is beyond words.",
          detay: "Now a Traveler of the Holy Land; it will change you.",
        },
        basarisizSonuc: {
          mesaj: "Weariness overwhelmed you, but companions supported you to the end.",
          detay: "Body weakened, but you are a Traveler of the Holy Land.",
        },
      },
      {
        metin: "Quietly write what you see in your notebook.",
        basariliSonuc: {
          mesaj: "You noted what you saw; your peace was deep and personal.",
          detay: "Quiet notes made you a Traveler of the Holy Land.",
        },
        basarisizSonuc: {
          mesaj: "You noted what you saw; your peace was deep and personal.",
          detay: "Quiet notes made you a Traveler of the Holy Land.",
        },
      },
    ],
  },
  oc_hacli_sefer_karari: {
    baslik: "The Call of the Holy Lands",
    metin: "A monk calls for a campaign to retake the holy lands: sins forgiven, but many never return. The army goes overland and by Venetian ship.",
    secenekler: [
      {
        metin: "Take the cross; march overland.",
        basariliSonuc: {
          mesaj: "With the red cross on your robe, you looked back once. The army marched at dawn.",
          detay: "A crusader now; this choice will shape your years.",
        },
        basarisizSonuc: {
          mesaj: "Doubt gnawed at you, yet you took the cross; gear cost dearly.",
          detay: "A reluctant road will weigh heavier.",
        },
      },
      {
        metin: "Take the cross; sail with the Venetians.",
        basariliSonuc: {
          mesaj: "With the red cross on your robe, you looked back once. The ship sailed at dawn.",
          detay: "A crusader now; this choice will shape your years.",
        },
        basarisizSonuc: {
          mesaj: "Doubt gnawed at you, yet you took the cross; the Venetians wanted more gold.",
          detay: "A reluctant road will weigh heavier.",
        },
      },
      {
        metin: "Refuse and carry on with your life.",
        basariliSonuc: {
          mesaj: "You refused; your life is here, on this land.",
          detay: "Not all agree, but your conscience is clear.",
        },
        basarisizSonuc: {
          mesaj: "Some read your refusal as 'cowardice'.",
          detay: "Still, you stand by your choice.",
        },
      },
    ],
  },
  oc_hacli_sefer_asker_cagrisi: {
    baslik: "You Have Been Mobilized",
    metin: "The commander assembled the regiment: your unit marches to retake the holy lands; the question is which column. Overland, or by Venetian ship.",
    secenekler: [
      {
        metin: "Join the main column overland.",
        basariliSonuc: {
          mesaj: "You gathered gear and marched at dawn with your unit; no time for farewells.",
          detay: "A soldier marches without being asked.",
        },
        basarisizSonuc: {
          mesaj: "Gear distribution failed; you covered the gap yourself, but the column left on time.",
          detay: "Orders are orders, ready or not.",
        },
      },
      {
        metin: "Join the sea column on Venetian ships.",
        basariliSonuc: {
          mesaj: "You were put aboard; the harbor fell behind at dawn.",
          detay: "A soldier marches without being asked.",
        },
        basarisizSonuc: {
          mesaj: "The Venetians demanded extra gold; the ship still sailed on time.",
          detay: "Orders are orders, ready or not.",
        },
      },
    ],
  },
  oc_hacli_kara_1: {
    baslik: "Ambush in the Mountain Pass",
    metin: "As the army crosses a pass, word comes the vanguard is ambushed — brigands or enemy scouts, unclear.",
    secenekler: [
      {
        metin: "Rush to help the vanguard.",
        basariliSonuc: {
          mesaj: "You broke the ambush together; the vanguard counts you a rescuer.",
          detay: "Your courage is the talk of the army.",
        },
        basarisizSonuc: {
          mesaj: "The ambush prevailed; you fell among the wounded.",
          detay: "Mountain passes were never safe.",
        },
      },
      {
        metin: "Stay with the main army; leave the vanguard.",
        basariliSonuc: {
          mesaj: "You stayed safe; the vanguard escaped at heavy cost.",
          detay: "Alive, but a shadow weighs on you.",
        },
        basarisizSonuc: {
          mesaj: "The vanguard was nearly wiped out; the army seethes.",
          detay: "Some choices follow you for life.",
        },
      },
    ],
  },
  oc_hacli_yolculuk_zorlugu: {
    baslik: "On the Scorching Roads",
    metin: "The army crosses parched, scorching land. Food dwindles, sickness spreads; each day more fall behind.",
    secenekler: [
      {
        metin: "Grit your teeth and keep marching.",
        basariliSonuc: {
          mesaj: "You marched on exhausted but determined; commanders noticed.",
          detay: "The road wore you down and hardened you.",
        },
        basarisizSonuc: {
          mesaj: "Thirst and heat laid you low; you lay feverish for days.",
          detay: "You pay for the campaign with your body.",
        },
      },
      {
        metin: "Help those left behind; go slowly.",
        basariliSonuc: {
          mesaj: "You carried water to fallen comrades; the army grew fond of you.",
          detay: "Your mercy was not forgotten.",
        },
        basarisizSonuc: {
          mesaj: "While helping, you caught the sickness too.",
          detay: "Kindness sometimes has a price.",
        },
      },
    ],
  },
  oc_hacli_deniz_1: {
    baslik: "The Fleet in the Storm",
    metin: "The Venetian fleet hits a sudden storm in the Adriatic. Ships drift off course; the captain shouts to hold formation.",
    secenekler: [
      {
        metin: "Obey orders; hold formation.",
        basariliSonuc: {
          mesaj: "The fleet held formation; you weathered the storm together.",
          detay: "Discipline saves lives at sea too.",
        },
        basarisizSonuc: {
          mesaj: "The storm drove your ship off course; you drifted for days.",
          detay: "The sea scorns even an army.",
        },
      },
      {
        metin: "Calm the panicking soldiers.",
        basariliSonuc: {
          mesaj: "Your calm stopped the panic; commanders noticed you.",
          detay: "Crisis leadership rivals battlefield renown.",
        },
        basarisizSonuc: {
          mesaj: "You lost your footing on deck and were badly hurt.",
          detay: "Your courage cost you dearly this time.",
        },
      },
    ],
  },
  oc_hacli_deniz_2: {
    baslik: "The Venetian Moneylender's Offer",
    metin: "You anchor at a Byzantine port. A Venetian merchant offers to 'secure' your remaining gold at exorbitant interest.",
    secenekler: [
      {
        metin: "Refuse; carry your gold.",
        basariliSonuc: {
          mesaj: "You refused; your gold is still on your belt.",
          detay: "Some 'securities' are another's profit.",
        },
        basarisizSonuc: {
          mesaj: "You fell victim to petty theft in the harbor.",
          detay: "Carried gold is not always safe.",
        },
      },
      {
        metin: "Accept; shift the risk to the moneylender.",
        basariliSonuc: {
          mesaj: "You paid the interest, but your gold's safety eased your mind.",
          detay: "Some peace comes dear.",
        },
        basarisizSonuc: {
          mesaj: "The moneylender claimed 'bankruptcy'; most of your gold is gone.",
          detay: "Some securities are traps.",
        },
      },
    ],
  },
  oc_hacli_kutsal_topraklar_savasi: {
    baslik: "Before the Walls",
    metin: "The army storms a besieged fortress. Ladders are on the walls; the commander points you to a spot.",
    secenekler: [
      {
        metin: "Fight in the front rank.",
        basariliSonuc: {
          mesaj: "You were among the first on the walls; your name spread through the army.",
          detay: "This tale will be told for years.",
        },
        basarisizSonuc: {
          mesaj: "Badly wounded under arrow fire, you were pulled back.",
          detay: "This siege cost you dearly.",
        },
      },
      {
        metin: "Stay back; support the archers.",
        basariliSonuc: {
          mesaj: "You did your duty quietly; the fortress finally fell.",
          detay: "Victory is won by those behind too.",
        },
        basarisizSonuc: {
          mesaj: "A stone from a catapult grazed you.",
          detay: "Even standing back is no safety.",
        },
      },
    ],
  },
  oc_hacli_ganimet_yagma: {
    baslik: "The Spoils of the Fallen City",
    metin: "The army plunders the captured city. Houses, temples, shops lie open; no one stops you.",
    secenekler: [
      {
        metin: "Join the plunder; take what you can.",
        basariliSonuc: {
          mesaj: "You filled your arms, but some screams will never leave your ears.",
          detay: "Rich, but you no longer sleep as before.",
        },
        basarisizSonuc: {
          mesaj: "You grabbed little, and guilt gripped you.",
          detay: "You gained nothing and kept no conscience.",
        },
      },
      {
        metin: "Stay out of it; only pray.",
        basariliSonuc: {
          mesaj: "You skipped the plunder; you could only pray for those around you.",
          detay: "Even in this war your hands stayed clean.",
        },
        basarisizSonuc: {
          mesaj: "Merely watching the savagery shook you.",
          detay: "Some sights carry a price.",
        },
      },
    ],
  },
  oc_hacli_ordu_dagiliyor: {
    baslik: "The Army's Collapse",
    metin: "A surprise counterattack shattered the army. Command collapsed; everyone fends for themselves. Comrades flee or surrender — your turn.",
    secenekler: [
      {
        metin: "Run! Slip away under cover of night.",
        basariliSonuc: {
          mesaj: "You melted into the dark and cleared the front; your heart pounds.",
          detay: "Now your only aim is survival.",
        },
        basarisizSonuc: {
          mesaj: "An enemy patrol spotted you; you barely slipped away in the dark.",
          detay: "Your escape started hard.",
        },
      },
      {
        metin: "Surrender; lay down your weapon.",
        basariliSonuc: {
          mesaj: "You threw down your weapon, hands raised; you were taken prisoner.",
          detay: "Alive, but no longer free.",
        },
        basarisizSonuc: {
          mesaj: "A soldier beat you as you surrendered; you were taken prisoner anyway.",
          detay: "Even surrender had a price.",
        },
      },
    ],
  },
  oc_hacli_kacis_1: {
    baslik: "Under Pursuit",
    metin: "Enemy cavalry hunt deserters. You walk by night, hide by day; your food is nearly gone.",
    secenekler: [
      {
        metin: "Risk it; ask a village for food.",
        basariliSonuc: {
          mesaj: "A kind villager gave you bread and cheese and swore silence.",
          detay: "Some strangers risk danger to help.",
        },
        basarisizSonuc: {
          mesaj: "Villagers took you for the enemy and chased you off, hungry and hurt.",
          detay: "Not every stranger is a friend.",
        },
      },
      {
        metin: "Stay hidden; live off the land.",
        basariliSonuc: {
          mesaj: "You got by on wild herbs and stream water; weak, but unseen.",
          detay: "Survival sometimes takes very little.",
        },
        basarisizSonuc: {
          mesaj: "You ate a poisonous plant and fought your stomach for days.",
          detay: "Nature is sometimes crueler than the enemy.",
        },
      },
    ],
  },
  oc_hacli_kacis_2: {
    baslik: "An Abandoned Monastery",
    metin: "You shelter in an abandoned monastery with other fleeing crusaders, arguing whether to move together or whether a group draws attention.",
    secenekler: [
      {
        metin: "Band together; seek safety in numbers.",
        basariliSonuc: {
          mesaj: "Moving together lifted your spirits; you supported each other.",
          detay: "You are not alone.",
        },
        basarisizSonuc: {
          mesaj: "The large group drew a patrol; you scattered in a skirmish.",
          detay: "Numbers can mean danger, not safety.",
        },
      },
      {
        metin: "Go alone; spread the risk.",
        basariliSonuc: {
          mesaj: "You went alone; the loneliness was heavy, but you left no trace.",
          detay: "Sometimes safest is trusting no one.",
        },
        basarisizSonuc: {
          mesaj: "Solitude pushed you toward despair; you pressed on weak and wavering.",
          detay: "A lone escape wears the spirit too.",
        },
      },
    ],
  },
  oc_hacli_kacis_3: {
    baslik: "Reaching the Border",
    metin: "After weeks of flight you reach friendly land. Border guards question you; you must prove your story.",
    secenekler: [
      {
        metin: "Tell the truth about the army's fate.",
        basariliSonuc: {
          mesaj: "The soldiers pitied your story; you are grateful to be home alive.",
          detay: "You lost honor but live; that too is victory.",
        },
        basarisizSonuc: {
          mesaj: "Some sneered 'deserter' but let you in.",
          detay: "You came home, but without applause.",
        },
      },
      {
        metin: "Embellish it; tell a heroic escape.",
        basariliSonuc: {
          mesaj: "Your tale spread; you were known for a 'heroic escape'.",
          detay: "The truth differed; no one will learn it, you hope.",
        },
        basarisizSonuc: {
          mesaj: "Inconsistencies were caught; the 'liar' brand outweighed your defeat.",
          detay: "You came home, your reputation worse than ever.",
        },
      },
    ],
  },
  oc_hacli_esaret_1: {
    baslik: "Conditions of Captivity",
    metin: "Camp conditions are merciless: little food, hard labor, humiliation. A guard hints he'll treat you better for extra work.",
    secenekler: [
      {
        metin: "Take the extra work; win the guard over.",
        basariliSonuc: {
          mesaj: "The guard gave more bread, but prisoners see you as a 'collaborator'.",
          detay: "Survival sometimes costs loneliness.",
        },
        basarisizSonuc: {
          mesaj: "The extra work wore you out and brought nothing.",
          detay: "Some promises are not kept.",
        },
      },
      {
        metin: "Stand in solidarity with the prisoners.",
        basariliSonuc: {
          mesaj: "You shared food and hope; enduring together kept you strong.",
          detay: "In hard days, solidarity feeds more than bread.",
        },
        basarisizSonuc: {
          mesaj: "Conditions worsened; your solidarity drew the guards' wrath.",
          detay: "Sometimes even unity is not enough.",
        },
      },
    ],
  },
  oc_hacli_esaret_2: {
    baslik: "Ransom or Escape?",
    metin: "Word came your family may pay ransom, though it could take months. That night you also spotted an escape chance at the watch change.",
    secenekler: [
      {
        metin: "Send word of ransom; wait patiently.",
        basariliSonuc: {
          mesaj: "Months later the ransom arrived; the guards freed you.",
          detay: "Your family paid for your freedom.",
        },
        basarisizSonuc: {
          mesaj: "Negotiations dragged on; conditions grew harsher.",
          detay: "Some waits are paid with the body.",
        },
      },
      {
        metin: "Try to escape at the watch change.",
        basariliSonuc: {
          mesaj: "Leaping from shadow to shadow, you escaped the camp!",
          detay: "Heart still pounding, but free.",
        },
        basarisizSonuc: {
          mesaj: "Your escape was noticed; you were severely punished.",
          detay: "Some chances are not as open as they look.",
        },
      },
    ],
  },
  oc_hacli_esaret_3: {
    baslik: "Homecoming",
    metin: "Years later you reach home after captivity or escape. Familiar faces struggle to recognize you; only now do you see how you changed.",
    secenekler: [
      {
        metin: "Tell what happened; face the past.",
        basariliSonuc: {
          mesaj: "Telling lightened your burden; your family listened in horror yet held you closer.",
          detay: "Some wounds heal once spoken.",
        },
        basarisizSonuc: {
          mesaj: "Telling was hard; some nights you still wake in that camp.",
          detay: "You're home, but some journeys never end.",
        },
      },
      {
        metin: "Leave the past; never speak of it.",
        basariliSonuc: {
          mesaj: "You slipped back into your old life; no one asked, you didn't tell.",
          detay: "Some silences are a shield.",
        },
        basarisizSonuc: {
          mesaj: "It grew in your silence; you still wake from nightmares.",
          detay: "Unspoken pain takes deeper root.",
        },
      },
    ],
  },
  oc_hacli_geride_kalanlar: {
    baslik: "The Life of Those Left Behind",
    metin: "Families of those on campaign struggle with no one to plow their fields. You can help.",
    secenekler: [
      {
        metin: "Help your neighbors with their work.",
        basariliSonuc: {
          mesaj: "You plowed their fields and watched their children; the village is grateful.",
          detay: "Not at the front, yet you were useful.",
        },
        basarisizSonuc: {
          mesaj: "You did what you could but couldn't keep up alone.",
          detay: "Good intentions don't always suffice.",
        },
      },
      {
        metin: "Mind your own affairs; stay out.",
        basariliSonuc: {
          mesaj: "You minded your own affairs; while others struggled, you profited.",
          detay: "Conscience stung, pocket filled.",
        },
        basarisizSonuc: {
          mesaj: "Seeing you didn't help, some neighbors drew away.",
          detay: "Some choices cost reputation.",
        },
      },
    ],
  },
  oc_hacli_korkak_damgasi: {
    baslik: "Whispers",
    metin: "Those who skipped the campaign are called 'cowards'; your name now surfaces in the whispers.",
    secenekler: [
      {
        metin: "Push back; stand by your decision.",
        basariliSonuc: {
          mesaj: "You explained your reasons openly; some found you right.",
          detay: "Speaking up is sometimes stronger than silence.",
        },
        basarisizSonuc: {
          mesaj: "Your defense convinced no one; the whispers went on.",
          detay: "Some prejudices don't break with words.",
        },
      },
      {
        metin: "Ignore it; let time pass.",
        basariliSonuc: {
          mesaj: "You ignored the whispers; soon another rumor took over.",
          detay: "Every storm dies down.",
        },
        basarisizSonuc: {
          mesaj: "Though you tried to ignore it, the words sank in.",
          detay: "Some silences exact a price.",
        },
      },
    ],
  },
  sd_somurge_gitme_karari: {
    baslik: "An Overseas Opportunity",
    metin: "A company seeks high-paid volunteers for the colonies: diplomats for trade networks, soldiers to 'secure' the territory.",
    secenekler: [
      {
        metin: "Go for diplomacy and trade.",
        basariliSonuc: {
          mesaj: "You packed, boarded the ship, and left your country behind.",
          detay: "You don't know what lies ahead; no turning back.",
        },
        basarisizSonuc: {
          mesaj: "The voyage was stormy; you were worn before arriving.",
          detay: "The venture weighed on you before it began.",
        },
      },
      {
        metin: "Go with military force; conquer the land.",
        basariliSonuc: {
          mesaj: "You armed yourself, boarded with your unit, and left your country.",
          detay: "You don't know what lies ahead; no turning back.",
        },
        basarisizSonuc: {
          mesaj: "The voyage was stormy; you were worn before arriving.",
          detay: "The venture weighed on you before it began.",
        },
      },
      {
        metin: "Stay; build your life at home.",
        basariliSonuc: {
          mesaj: "You declined; you chose to stay on your own land.",
          detay: "Leaping into the unknown isn't for everyone.",
        },
        basarisizSonuc: {
          mesaj: "As the ship left port, you felt faint regret.",
          detay: "Some decisions linger in the mind.",
        },
      },
    ],
  },
  sd_somurge_diplomasi_1: {
    baslik: "First Contact with the Local Leader",
    metin: "Your first meeting with the local leader. Your gifts are modest, your intent sincere; he studies you closely.",
    secenekler: [
      {
        metin: "Propose a balanced deal based on mutual respect.",
        basariliSonuc: {
          mesaj: "The leader found it fair; a bridge of trust was built.",
          detay: "Balanced partnerships last longer.",
        },
        basarisizSonuc: {
          mesaj: "The leader was wary; the deal came hard.",
          detay: "Trust isn't built in a day.",
        },
      },
      {
        metin: "Offer harsh terms favoring the company.",
        basariliSonuc: {
          mesaj: "The leader accepted, but you saw distrust in his eyes.",
          detay: "You won, but you know how.",
        },
        basarisizSonuc: {
          mesaj: "The leader refused the harsh terms; the meeting ended coldly.",
          detay: "Greed sometimes topples the table.",
        },
      },
    ],
  },
  sd_somurge_diplomasi_2: {
    baslik: "The Fine Print of the Trade Agreement",
    metin: "Head office slipped small but heavy clauses against the locals into the deal without telling you. You noticed before signing.",
    secenekler: [
      {
        metin: "Get it signed unnoticed; please the company.",
        basariliSonuc: {
          mesaj: "Signed; head office rewarded you, but something gnaws at you.",
          detay: "Some signatures haunt the conscience for years.",
        },
        basarisizSonuc: {
          mesaj: "The local clerk spotted the clauses; trust was badly shaken.",
          detay: "Hidden clauses surface sooner or later.",
        },
      },
      {
        metin: "Disclose the clauses; propose a fair version.",
        basariliSonuc: {
          mesaj: "You proposed a fair version; the leader was grateful, trust grew.",
          detay: "Honesty is sometimes the best trade strategy.",
        },
        basarisizSonuc: {
          mesaj: "Head office was furious; you lost part of your bonuses.",
          detay: "Doing right had a price.",
        },
      },
    ],
  },
  sd_somurge_askeri_1: {
    baslik: "Establishing the Garrison",
    metin: "The unit must build a coastal garrison. Part of the villagers' land is needed.",
    secenekler: [
      {
        metin: "Pay villagers a fair price for their land.",
        basariliSonuc: {
          mesaj: "You paid villagers fairly; the garrison rose peacefully.",
          detay: "Some beginnings are sturdier with justice.",
        },
        basarisizSonuc: {
          mesaj: "Despite payment, some villagers refused to leave; tension lingered.",
          detay: "Money doesn't always win hearts.",
        },
      },
      {
        metin: "Seize the land by force; speed things up.",
        basariliSonuc: {
          mesaj: "The garrison went up fast; you ignored the villagers' angry stares.",
          detay: "Gained speed, lost trust.",
        },
        basarisizSonuc: {
          mesaj: "The seizure became a skirmish; a few soldiers were hurt.",
          detay: "Everything taken by force has a price.",
        },
      },
    ],
  },
  sd_somurge_askeri_2: {
    baslik: "Native Resistance",
    metin: "Locals enraged by the garrison took up arms. Your commander wants advice: negotiate, or crush them by force?",
    secenekler: [
      {
        metin: "Propose talks; prevent a clash.",
        basariliSonuc: {
          mesaj: "Talks began; the sides reached a tense ceasefire.",
          detay: "Some victories are won unarmed.",
        },
        basarisizSonuc: {
          mesaj: "You were ambushed during talks and barely escaped.",
          detay: "Good intentions aren't always met in kind.",
        },
      },
      {
        metin: "Crush the resistance by force.",
        basariliSonuc: {
          mesaj: "Resistance crushed fast; superiors rewarded you, but you couldn't sleep.",
          detay: "Some victories never fall silent.",
        },
        basarisizSonuc: {
          mesaj: "Resistance proved stronger; the fight dragged on and you were badly hurt.",
          detay: "Force doesn't always bring quick results.",
        },
      },
    ],
  },
  sd_somurge_ahlaki_ikilem: {
    baslik: "The Order Given",
    metin: "A cruel measure against native workers is ordered; object and you may lose your job, comply and you'll profit, but conscience will haunt you.",
    secenekler: [
      {
        metin: "Obey the order; think of the gain.",
        basariliSonuc: {
          mesaj: "You obeyed; the company rewarded you, but something in you changed forever.",
          detay: "Richer, but the mirror is harder to face.",
        },
        basarisizSonuc: {
          mesaj: "You obeyed but it went poorly; your conscience was stained all the same.",
          detay: "You neither fully gained nor kept your conscience.",
        },
      },
      {
        metin: "Object; refuse the order.",
        basariliSonuc: {
          mesaj: "Your objection was heard; some managers admired you and you kept your job.",
          detay: "Listening to your conscience sometimes pays.",
        },
        basarisizSonuc: {
          mesaj: "You were fired, but your conscience stayed spotless.",
          detay: "Doing right had a price; no regrets.",
        },
      },
    ],
  },
  sd_somurge_tropik_hastalik: {
    baslik: "An Unknown Fever",
    metin: "An unfamiliar illness lays you low; a local healer offers a herbal mixture, and the colonial doctor wants to help too.",
    secenekler: [
      {
        metin: "Trust the local healer.",
        basariliSonuc: {
          mesaj: "Local knowledge worked; you were up in days.",
          detay: "These lands hold their own wisdom.",
        },
        basarisizSonuc: {
          mesaj: "The mixture failed; you grew worse.",
          detay: "Not every cure suits every patient.",
        },
      },
      {
        metin: "See the colonial doctor.",
        basariliSonuc: {
          mesaj: "The doctor's treatment was slow but effective; you recovered.",
          detay: "Familiar methods reassure.",
        },
        basarisizSonuc: {
          mesaj: "The doctor's means fell short here.",
          detay: "Falling ill here is a great risk.",
        },
      },
    ],
  },
  sd_somurge_donus: {
    baslik: "Return to the Country",
    metin: "Your colonial service is over. Gains or losses aside, you return home a changed person.",
    secenekler: [
      {
        metin: "Tell it all as it was.",
        basariliSonuc: {
          mesaj: "Telling it lightened you; listeners were shaken, and awed.",
          detay: "Truths lighten when shared.",
        },
        basarisizSonuc: {
          mesaj: "Telling it was hard; some memories still trouble you.",
          detay: "Some journeys never end.",
        },
      },
      {
        metin: "Tell only the successes.",
        basariliSonuc: {
          mesaj: "Your polished tale spread; you became 'a successful colonial'.",
          detay: "The truth was a bit different.",
        },
        basarisizSonuc: {
          mesaj: "Your words and deeds didn't match; a few people withdrew.",
          detay: "Secrets are poorly kept.",
        },
      },
    ],
  },
  sd_somurge_evde_kalanlar: {
    baslik: "Overseas Letters",
    metin: "Letters from the colonies tell of wealth, sometimes of misery. You keep building your own life.",
    secenekler: [
      {
        metin: "Focus on growing your business.",
        basariliSonuc: {
          mesaj: "You grew your business patiently; earnings small but steady.",
          detay: "Not everyone must cross an ocean.",
        },
        basarisizSonuc: {
          mesaj: "Things went poorly, but you are safe.",
          detay: "Stability is a gain too.",
        },
      },
      {
        metin: "Read the letters and dream.",
        basariliSonuc: {
          mesaj: "Tales of far lands were a small escape.",
          detay: "Sometimes dreaming is enough.",
        },
        basarisizSonuc: {
          mesaj: "The letters only reminded you of the chance you missed.",
          detay: "Some curiosity never fades.",
        },
      },
    ],
  },
  hac_sunni_kara_2: {
    baslik: "Oasis Halt",
    metin: "The caravan reaches a small oasis. The Bedouins demand a 'hospitality tax'; no payment, no water from the well.",
    secenekler: [
      {
        metin: "Pay the fee and secure the water.",
        basariliSonuc: {
          mesaj: "You paid; the vessels were filled and you set off refreshed.",
          detay: "In the desert, water outweighs gold.",
        },
        basarisizSonuc: {
          mesaj: "You paid, but the well was nearly dry.",
          detay: "Not every oasis is generous.",
        },
      },
      {
        metin: "Haggle the fee down.",
        basariliSonuc: {
          mesaj: "Haggling worked; you got the water far cheaper.",
          detay: "The caravan master was impressed.",
        },
        basarisizSonuc: {
          mesaj: "Haggling soured; the Bedouins shut the well and you left parched.",
          detay: "Some bargains backfire.",
        },
      },
    ],
  },
  hac_sunni_kara_3: {
    baslik: "The Last Stage",
    metin: "A few days from Mecca you meet a small band of pilgrims, starving and parched. The caravan master won't stop.",
    secenekler: [
      {
        metin: "Halt the caravan and help.",
        basariliSonuc: {
          mesaj: "You shared your provisions; grateful pilgrims joined you.",
          detay: "This kindness will deepen your arrival.",
        },
        basarisizSonuc: {
          mesaj: "Your own supplies dwindled; all pressed on hungrier and thirstier.",
          detay: "You paid for kindness with your body.",
        },
      },
      {
        metin: "Obey the master and move on.",
        basariliSonuc: {
          mesaj: "The caravan moved on; the eyes you left behind haunt you.",
          detay: "On time, but your conscience aches.",
        },
        basarisizSonuc: {
          mesaj: "Those pilgrims' cries stayed in your ears.",
          detay: "Some memories won't let go.",
        },
      },
    ],
  },
  hac_sunni_deniz_1: {
    baslik: "Storm on the Red Sea",
    metin: "A sudden storm hits the Jeddah-bound ship in the Red Sea. The captain orders everyone into the hold.",
    secenekler: [
      {
        metin: "Obey; shelter in the hold.",
        basariliSonuc: {
          mesaj: "Cramped but safe, you rode out the storm.",
          detay: "You passed the sea's trial.",
        },
        basarisizSonuc: {
          mesaj: "The ship pitched hard; some in the hold were hurt.",
          detay: "The storm was merciless.",
        },
      },
      {
        metin: "Stay on deck; help the frightened.",
        basariliSonuc: {
          mesaj: "You calmed the panicked and sent them below; the captain approved.",
          detay: "Sharing fear lightens it.",
        },
        basarisizSonuc: {
          mesaj: "A wave hurled you off the deck; you were badly hurt.",
          detay: "Courage cost you dearly.",
        },
      },
    ],
  },
  hac_sunni_deniz_2: {
    baslik: "Fear of Plague on Board",
    metin: "A passenger lies burning with fever. The captain whispers 'plague'; some want him thrown overboard.",
    secenekler: [
      {
        metin: "Protect him; isolate and nurse him.",
        basariliSonuc: {
          mesaj: "You nursed him yourself; the fever broke, not plague.",
          detay: "Mercy beat panic.",
        },
        basarisizSonuc: {
          mesaj: "You fell ill too; a simple fever, and you both recovered.",
          detay: "You took a risk and it ended well.",
        },
      },
      {
        metin: "Stay silent; stay out.",
        basariliSonuc: {
          mesaj: "You stayed out; he recovered on his own.",
          detay: "Standing by is a choice too.",
        },
        basarisizSonuc: {
          mesaj: "The crowd threw him overboard; your silence burdens your conscience.",
          detay: "Some silences are complicity.",
        },
      },
    ],
  },
  hac_sunni_deniz_3: {
    baslik: "Jeddah Harbor",
    metin: "The ship docks at Jeddah. Customs officers question everyone and demand an 'extra levy' from some.",
    secenekler: [
      {
        metin: "Quietly pay the levy.",
        basariliSonuc: {
          mesaj: "You paid and cleared customs easily.",
          detay: "Some roads open with money.",
        },
        basarisizSonuc: {
          mesaj: "The officer wanted more, but let you through.",
          detay: "Not every bargain goes as hoped.",
        },
      },
      {
        metin: "Object: the levy is unjust.",
        basariliSonuc: {
          mesaj: "A senior officer sided with you; you passed free.",
          detay: "Raising your voice sometimes works.",
        },
        basarisizSonuc: {
          mesaj: "Your objection was unwelcome; they held you and took more.",
          detay: "Arguing with bureaucracy is risky.",
        },
      },
    ],
  },
  hac_katolik_deniz_2: {
    baslik: "Repairs on the Island of Rhodes",
    metin: "The storm-damaged ship is repaired at Rhodes. The captain says passengers may tour the island.",
    secenekler: [
      {
        metin: "Tour the island; visit the Knights' Hospital.",
        basariliSonuc: {
          mesaj: "In the Hospitallers' ancient halls your spirit was refreshed.",
          detay: "An unplanned stop brought richness.",
        },
        basarisizSonuc: {
          mesaj: "A swindler tricked you and lightened your purse.",
          detay: "Every harbor has its dangers.",
        },
      },
      {
        metin: "Stay aboard; rest and pray.",
        basariliSonuc: {
          mesaj: "You rested and readied yourself for the road ahead.",
          detay: "Sometimes doing nothing is best.",
        },
        basarisizSonuc: {
          mesaj: "You wanted rest, but the repair noise never stopped.",
          detay: "Peace is sometimes elusive.",
        },
      },
    ],
  },
  hac_katolik_deniz_3: {
    baslik: "Putting In at Jaffa Harbor",
    metin: "Nearing Jaffa, reefs lurk in the shallows. The captain asks: risky shortcut or long safe route?",
    secenekler: [
      {
        metin: "Suggest the risky shortcut.",
        basariliSonuc: {
          mesaj: "The captain skimmed the reefs skillfully; you arrived on time.",
          detay: "The risk paid off.",
        },
        basarisizSonuc: {
          mesaj: "The ship scraped a reef and took water; you barely made port.",
          detay: "The shortcut cost dearly.",
        },
      },
      {
        metin: "Suggest the safe long route.",
        basariliSonuc: {
          mesaj: "By the long safe route you reached port calmly.",
          detay: "Patience is often the best guide.",
        },
        basarisizSonuc: {
          mesaj: "The long route ran longer than expected; patience wore thin.",
          detay: "Safety can be dull.",
        },
      },
    ],
  },
  hac_katolik_kara_1: {
    baslik: "The Alpine Passes",
    metin: "The caravan nears the snowy Alpine passes. The guide warns of avalanches, but waiting costs weeks.",
    secenekler: [
      {
        metin: "Risk it; cross now.",
        basariliSonuc: {
          mesaj: "You crossed; a small avalanche fell behind you, harming no one.",
          detay: "Courage was rewarded.",
        },
        basarisizSonuc: {
          mesaj: "A small avalanche swept the caravan; you saved all with difficulty.",
          detay: "The mountain knows no mercy.",
        },
      },
      {
        metin: "Wait in the village for clear weather.",
        basariliSonuc: {
          mesaj: "When the weather cleared you crossed safely.",
          detay: "Patience is the cheapest insurance.",
        },
        basarisizSonuc: {
          mesaj: "The wait dragged on and costs rose, but you crossed safely.",
          detay: "Safety sometimes costs.",
        },
      },
    ],
  },
  hac_katolik_kara_2: {
    baslik: "A Stopover in Constantinople",
    metin: "The caravan halts in Constantinople. Hagia Sophia is still open to Christian pilgrims, but tension makes the streets risky.",
    secenekler: [
      {
        metin: "Visit the cathedral; take the risk.",
        basariliSonuc: {
          mesaj: "You prayed beneath Hagia Sophia's dome; unforgettable.",
          detay: "Some moments are worth the risk.",
        },
        basarisizSonuc: {
          mesaj: "In a small street disturbance you lost some belongings.",
          detay: "Every city holds danger.",
        },
      },
      {
        metin: "Stay at the inn; avoid risk.",
        basariliSonuc: {
          mesaj: "You rested safely at the inn; a trouble-free stop.",
          detay: "Caution is wisest.",
        },
        basarisizSonuc: {
          mesaj: "Safe, but you carry the letdown of never seeing the city.",
          detay: "Safety can close doors too.",
        },
      },
    ],
  },
  hac_katolik_kara_3: {
    baslik: "At the Edge of the Syrian Desert",
    metin: "Near Jerusalem, brigands may raid the arid stretch. A local guide knows a safe but winding road.",
    secenekler: [
      {
        metin: "Follow the guide's winding road.",
        basariliSonuc: {
          mesaj: "The winding road avoided the brigands; weary but safe, you drew near.",
          detay: "Caution paid off again.",
        },
        basarisizSonuc: {
          mesaj: "The road ran long and supplies thinned, but you advanced safely.",
          detay: "Safety takes patience.",
        },
      },
      {
        metin: "Go straight by the short road.",
        basariliSonuc: {
          mesaj: "Luck held; you took the short road unmolested.",
          detay: "Sometimes risk pays.",
        },
        basarisizSonuc: {
          mesaj: "Brigands stopped the caravan and took part of your goods.",
          detay: "The shortcut's price was heavy.",
        },
      },
    ],
  },
  hac_ortodoks_kara_2: {
    baslik: "Guests at the Monastery",
    metin: "The caravan spends the night in an old mountain monastery. The abbot calls for a long service, but some pilgrims need rest.",
    secenekler: [
      {
        metin: "Attend the service all night.",
        basariliSonuc: {
          mesaj: "The service moved you deeply; body weary, soul at peace.",
          detay: "Some weariness feeds the spirit.",
        },
        basarisizSonuc: {
          mesaj: "Standing grew hard; you barely reached morning.",
          detay: "The body can't match the spirit.",
        },
      },
      {
        metin: "Politely beg leave and rest.",
        basariliSonuc: {
          mesaj: "You rested well, refreshed for tomorrow's road.",
          detay: "Heeding your body is a virtue.",
        },
        basarisizSonuc: {
          mesaj: "The abbot seemed put out, but understood.",
          detay: "Every choice has a small price.",
        },
      },
    ],
  },
  hac_ortodoks_kara_3: {
    baslik: "At the Jordan River",
    metin: "The caravan halts at the Jordan. Some pilgrims want to enter the water where Jesus was baptized; it is cold and swift.",
    secenekler: [
      {
        metin: "Enter the water; honor the tradition.",
        basariliSonuc: {
          mesaj: "In the cold water you shivered and felt deep peace.",
          detay: "Some cold warms the spirit.",
        },
        basarisizSonuc: {
          mesaj: "The current dragged you off; you were rescued with difficulty.",
          detay: "Even holy waters are dangerous.",
        },
      },
      {
        metin: "Watch from the bank and pray.",
        basariliSonuc: {
          mesaj: "You prayed from the bank; your peace was quieter but deep.",
          detay: "Worship has many forms.",
        },
        basarisizSonuc: {
          mesaj: "A small regret lingered at not entering the water.",
          detay: "Some choices are questioned later.",
        },
      },
    ],
  },
  hac_ortodoks_deniz_1: {
    baslik: "Lost Bearings in the Aegean",
    metin: "Thick fog in the Aegean; even the compass wavers. The captain asks: anchor and wait, or press on blind?",
    secenekler: [
      {
        metin: "Anchor until the fog lifts.",
        basariliSonuc: {
          mesaj: "You waited and sailed safely once the fog cleared.",
          detay: "Patience beats the reefs.",
        },
        basarisizSonuc: {
          mesaj: "The wait dragged on and supplies ran low, but you sailed safely on.",
          detay: "Safety takes patience.",
        },
      },
      {
        metin: "Press on blind, carefully.",
        basariliSonuc: {
          mesaj: "The fog lifted early; you lost no time.",
          detay: "Sometimes courage pays.",
        },
        basarisizSonuc: {
          mesaj: "The ship scraped a reef; repairs cost time and money.",
          detay: "The fog proved a harsh teacher.",
        },
      },
    ],
  },
  hac_ortodoks_deniz_2: {
    baslik: "An Acquaintance on the Rumelian Coast",
    metin: "At a port you meet a penniless young pilgrim. He asks for company on the road and a little help.",
    secenekler: [
      {
        metin: "Help him; take him along.",
        basariliSonuc: {
          mesaj: "You helped the young pilgrim; he became a loyal companion.",
          detay: "Some friendships are born on the road.",
        },
        basarisizSonuc: {
          mesaj: "You helped, but he vanished quietly at the next port.",
          detay: "Not every kindness becomes a bond.",
        },
      },
      {
        metin: "Mind your own road.",
        basariliSonuc: {
          mesaj: "You went on; a faint pang of conscience remained.",
          detay: "Every journey is a trial.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't forget his eyes watching you leave.",
          detay: "Some sights won't let go.",
        },
      },
    ],
  },
  hac_ortodoks_deniz_3: {
    baslik: "Arrival at Jaffa",
    metin: "As the ship nears Jaffa a thanksgiving service is held on deck. The captain asks you to say a few words.",
    secenekler: [
      {
        metin: "Give a heartfelt thanksgiving speech.",
        basariliSonuc: {
          mesaj: "Your words moved everyone; the ship anchored joyfully.",
          detay: "A shared moment gave the journey meaning.",
        },
        basarisizSonuc: {
          mesaj: "You faltered with nerves, but your intent was understood.",
          detay: "A speech needn't be flawless.",
        },
      },
      {
        metin: "Decline politely; pray in silence.",
        basariliSonuc: {
          mesaj: "You joined the crowd's gratitude with a silent prayer.",
          detay: "Worship needn't be spoken.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was taken for arrogance; the captain frowned.",
          detay: "Silence is not always understood.",
        },
      },
    ],
  },
  hac_anglikan_deniz_2: {
    baslik: "Waiting at Suez",
    metin: "The ship waits near the unfinished Suez Canal. An engineer offers to show you the works.",
    secenekler: [
      {
        metin: "Accept; tour the construction.",
        basariliSonuc: {
          mesaj: "The vast canal works amazed you; you felt the age's pace.",
          detay: "Even on a holy road, you saw progress.",
        },
        basarisizSonuc: {
          mesaj: "Heat and dust made you faint, but it was worth seeing.",
          detay: "Curiosity sometimes taxes the body.",
        },
      },
      {
        metin: "Stay aboard and rest.",
        basariliSonuc: {
          mesaj: "You rested and prepared for the journey ahead.",
          detay: "Sometimes doing nothing is best.",
        },
        basarisizSonuc: {
          mesaj: "You wanted rest, but the hot cabin spoiled it.",
          detay: "Peace is sometimes elusive.",
        },
      },
    ],
  },
  hac_anglikan_deniz_3: {
    baslik: "Arrival at Jaffa Harbor",
    metin: "At Jaffa the tour company announces: the last leg to Jerusalem by paid first-class carriage or free crowded coach.",
    secenekler: [
      {
        metin: "Pay extra and travel in comfort.",
        basariliSonuc: {
          mesaj: "Resting in comfort, you drew near Jerusalem.",
          detay: "Comfort: a small, earned luxury.",
        },
        basarisizSonuc: {
          mesaj: "The carriage broke down; hours were lost.",
          detay: "Money doesn't guarantee comfort.",
        },
      },
      {
        metin: "Take the free crowded coach.",
        basariliSonuc: {
          mesaj: "You chatted with pilgrims on the way and made friends.",
          detay: "Plain roads leave rich memories.",
        },
        basarisizSonuc: {
          mesaj: "The coach was jolting and wearying; you were worn out.",
          detay: "Thrift is paid for in body.",
        },
      },
    ],
  },
  hac_anglikan_kara_1: {
    baslik: "The Train's Delay",
    metin: "The train is stranded for days in the Balkans by a bridge repair. Some say wait in town, others walk to the next station.",
    secenekler: [
      {
        metin: "Wait patiently in town.",
        basariliSonuc: {
          mesaj: "In town, the locals' warmth eased your weariness.",
          detay: "Some delays bring beauty.",
        },
        basarisizSonuc: {
          mesaj: "The wait dragged on; lodging costs mounted fast.",
          detay: "Delays can cost dearly.",
        },
      },
      {
        metin: "Try walking to the next station.",
        basariliSonuc: {
          mesaj: "After a hard walk you caught the train at the next station.",
          detay: "Resolve saved you time.",
        },
        basarisizSonuc: {
          mesaj: "The road was longer than thought; you arrived worn and hurt.",
          detay: "Some shortcuts are not.",
        },
      },
    ],
  },
  hac_anglikan_kara_2: {
    baslik: "An Argument in Belgrade",
    metin: "Changing trains in Belgrade, a local journalist argues with you over colonialism and missions; a crowd gathers.",
    secenekler: [
      {
        metin: "Speak calmly and respectfully.",
        basariliSonuc: {
          mesaj: "The quarrel became respectful talk; you both learned something.",
          detay: "Some bridges are built at stations.",
        },
        basarisizSonuc: {
          mesaj: "It grew heated, the crowd split; you caught your train at the last moment.",
          detay: "Not every dialogue ends in peace.",
        },
      },
      {
        metin: "Avoid it; walk away.",
        basariliSonuc: {
          mesaj: "You skipped the argument and went on calmly.",
          detay: "Not every fight is yours.",
        },
        basarisizSonuc: {
          mesaj: "Some circles read your retreat as 'unprincipled'.",
          detay: "Silence has a price too.",
        },
      },
    ],
  },
  hac_anglikan_kara_3: {
    baslik: "At the Threshold of the Sinai Desert",
    metin: "At the edge of the Sinai, supplies are nearly gone. A Bedouin caravan offers provisions at an outrageous price.",
    secenekler: [
      {
        metin: "Buy it, however steep.",
        basariliSonuc: {
          mesaj: "Costly as it was, you bought it and finished the road easily.",
          detay: "Sometimes money is cheaper than health.",
        },
        basarisizSonuc: {
          mesaj: "The provisions were poor, but they sufficed.",
          detay: "Not every purchase turns out well.",
        },
      },
      {
        metin: "Refuse; make do with what you have.",
        basariliSonuc: {
          mesaj: "You rationed carefully; supplies lasted to the end.",
          detay: "Thrift sometimes works.",
        },
        basarisizSonuc: {
          mesaj: "Supplies ran out on the last day; hungry and parched, you struggled on.",
          detay: "Thrift can have a price.",
        },
      },
    ],
  },
  yolculuk_savunma_teklif: {
    baslik: "The Shadow of the Crusaders",
    metin: "Word that a crusader army nears the coast shook the region; the commander summons you. Coastal watch, or the inner citadel?",
    secenekler: [
      {
        metin: "Join the coastal watch; scan the sea.",
        basariliSonuc: {
          mesaj: "You armed up, said farewell, and rode for the coastal tower.",
          detay: "This land is yours; defending it is a debt.",
        },
        basarisizSonuc: {
          mesaj: "Gear cost more than expected, but you set out.",
          detay: "Reluctant or not, duty awaits.",
        },
      },
      {
        metin: "Join the main defense in the citadel.",
        basariliSonuc: {
          mesaj: "You armed up, said farewell, and set out for the citadel with the caravan.",
          detay: "This land is yours; defending it is a debt.",
        },
        basarisizSonuc: {
          mesaj: "Gear cost more than expected, but you set out.",
          detay: "Reluctant or not, duty awaits.",
        },
      },
    ],
  },
  yolculuk_savunma_deniz_1: {
    baslik: "Sails on the Horizon",
    metin: "Dozens of crusader sails rise on the horizon. You must sound the first warning, but the beacon is broken.",
    secenekler: [
      {
        metin: "Ride to the citadel with the news.",
        basariliSonuc: {
          mesaj: "You carried the news; the garrison readied in time.",
          detay: "This warning will save many lives.",
        },
        basarisizSonuc: {
          mesaj: "The horse threw you, but wounded, you delivered the news.",
          detay: "Duty done; your body paid.",
        },
      },
      {
        metin: "Repair the tower and signal from it.",
        basariliSonuc: {
          mesaj: "You fixed the tower in time; the beacon echoed down the coast.",
          detay: "The region is ready thanks to you.",
        },
        basarisizSonuc: {
          mesaj: "The repair fell short; the tower didn't light in time.",
          detay: "Some efforts come too late.",
        },
      },
    ],
  },
  yolculuk_savunma_deniz_2: {
    baslik: "Repelling the Landing",
    metin: "Crusaders try to land in boats; you must fight knee-deep in the surf.",
    secenekler: [
      {
        metin: "Dive in; meet the boats before they land.",
        basariliSonuc: {
          mesaj: "You drove the first boats back; the soldiers carried you aloft.",
          detay: "Your courage held the shore.",
        },
        basarisizSonuc: {
          mesaj: "Wounded badly amid waves and arrows, you fell back.",
          detay: "The sea is as merciless as the foe.",
        },
      },
      {
        metin: "Form an orderly line on the shore.",
        basariliSonuc: {
          mesaj: "The line slowed the landing; your losses were few.",
          detay: "Discipline sometimes beats heroism.",
        },
        basarisizSonuc: {
          mesaj: "The line broke at one point; a short, sharp clash followed.",
          detay: "Not every formation holds under test.",
        },
      },
    ],
  },
  yolculuk_savunma_kara_1: {
    baslik: "A Trap in the Pass",
    metin: "You are to ambush the crusader vanguard in the pass to the citadel. Timing is everything.",
    secenekler: [
      {
        metin: "Drop the rocks when the vanguard is mid-pass.",
        basariliSonuc: {
          mesaj: "The rocks fell on time; the vanguard scattered and the pass closed for days.",
          detay: "A small band delayed a whole army.",
        },
        basarisizSonuc: {
          mesaj: "The trap sprang early and the enemy was ready; you fell back fighting.",
          detay: "Timing failed this time.",
        },
      },
      {
        metin: "Wait; only scout and gather intel.",
        basariliSonuc: {
          mesaj: "You learned the enemy's strength and heading; vital for the citadel.",
          detay: "Sometimes the best blow is none.",
        },
        basarisizSonuc: {
          mesaj: "You were spotted scouting and fell back after a brief clash.",
          detay: "Stealth doesn't always last.",
        },
      },
    ],
  },
  yolculuk_savunma_kara_2: {
    baslik: "Preparing for the Siege",
    metin: "Before the siege, water and food must be stored and walls strengthened; time is short and all look to you.",
    secenekler: [
      {
        metin: "Rally the people; work day and night.",
        basariliSonuc: {
          mesaj: "The people worked with you; the fortress is readier than ever.",
          detay: "Shared labor is worth a strong wall.",
        },
        basarisizSonuc: {
          mesaj: "The pace exhausted you and many; preparations stayed unfinished.",
          detay: "Some preparations never suffice.",
        },
      },
      {
        metin: "Prepare only the garrison, with discipline.",
        basariliSonuc: {
          mesaj: "The garrison readied in order; the people managed alone.",
          detay: "Military order did its job.",
        },
        basarisizSonuc: {
          mesaj: "The people were caught unready; panic briefly gripped the fortress.",
          detay: "A commander must think of all.",
        },
      },
    ],
  },
  yolculuk_savunma_savas_ortak: {
    baslik: "The Defense of the Walls",
    metin: "The crusaders besiege the fortress; catapults pound the walls and the first great assault begins. Take your place.",
    secenekler: [
      {
        metin: "Fight in the front at the key breach.",
        basariliSonuc: {
          mesaj: "You held the breach almost alone; your name became legend.",
          detay: "This stand will be told for years.",
        },
        basarisizSonuc: {
          mesaj: "The assault wounded you badly; comrades dragged you back.",
          detay: "The siege cost you dearly.",
        },
      },
      {
        metin: "Stay back and direct the archers and catapults.",
        basariliSonuc: {
          mesaj: "Your archers broke much of the assault wave.",
          detay: "Victory is won by those behind too.",
        },
        basarisizSonuc: {
          mesaj: "A catapult stone landed beside you; you escaped with scrapes.",
          detay: "Even the rear isn't safe.",
        },
      },
    ],
  },
  yolculuk_savunma_kale_dusuyor: {
    baslik: "The Fallen Wall",
    metin: "A wall has fallen; crusaders pour through the breach. The commander shouts a last order, but each must choose.",
    secenekler: [
      {
        metin: "Fight to the end; don't fall back.",
        basariliSonuc: {
          mesaj: "You formed a last line at the breach and fought on.",
          detay: "You'll stand to the end for this land.",
        },
        basarisizSonuc: {
          mesaj: "Wounded, you held your place; your sword is still in hand.",
          detay: "Resistance strains the body.",
        },
      },
      {
        metin: "Drop your weapon; surrender.",
        basariliSonuc: {
          mesaj: "You threw down your weapon and raised your hands; the crusaders took you.",
          detay: "Alive, but no longer free.",
        },
        basarisizSonuc: {
          mesaj: "A soldier beat you as you surrendered; you were still taken.",
          detay: "Even surrender had a price.",
        },
      },
    ],
  },
  yolculuk_savunma_direnis_1: {
    baslik: "On the Fallen Walls",
    metin: "You are in a small group holding the last line at the breach. Comrades fall, crusaders advance; any breath may be your last.",
    secenekler: [
      {
        metin: "Charge ahead; take command.",
        basariliSonuc: {
          mesaj: "Your voice rallied the group; you held the line longer.",
          detay: "Leadership is born in the dark.",
        },
        basarisizSonuc: {
          mesaj: "Charging made you a target; you were badly wounded.",
          detay: "Courage isn't always rewarded.",
        },
      },
      {
        metin: "Focus on carrying the wounded back.",
        basariliSonuc: {
          mesaj: "You carried a few wounded comrades to safety.",
          detay: "Even in chaos you saved lives.",
        },
        basarisizSonuc: {
          mesaj: "You took a blow while carrying; you both went down.",
          detay: "Kindness can cost dearly.",
        },
      },
    ],
  },
  yolculuk_savunma_direnis_2: {
    baslik: "The Last Breath",
    metin: "Your group melts away, your strength fails. A horn sounds from the citadel — reinforcements, or one last hope?",
    secenekler: [
      {
        metin: "Fight on; trust the horn.",
        basariliSonuc: {
          mesaj: "The horn was real! The Sultan's reinforcements came just in time.",
          detay: "Some hopes do come true.",
        },
        basarisizSonuc: {
          mesaj: "Reinforcements were late; you fell badly wounded.",
          detay: "Some hopes arrive too late.",
        },
      },
      {
        metin: "Evacuate the people through the hidden tunnel.",
        basariliSonuc: {
          mesaj: "You led dozens of civilians out through the hidden tunnel.",
          detay: "Some victories are won by conscience.",
        },
        basarisizSonuc: {
          mesaj: "A clash broke out; a few were lost but most were saved.",
          detay: "No rescue is without loss.",
        },
      },
    ],
  },
  yolculuk_savunma_direnis_3: {
    baslik: "After the Siege",
    metin: "The siege is over — repelled by reinforcements, or you and your charges reached safety. Before the Sultan, you still bear its weight.",
    secenekler: [
      {
        metin: "Tell it as it was; count the dead.",
        basariliSonuc: {
          mesaj: "The Sultan listened in silence, grieved the losses, and honored you.",
          detay: "Victory's price stays in memory.",
        },
        basarisizSonuc: {
          mesaj: "Your voice shook; some nights you still hear the breach's screams.",
          detay: "Some wars never end.",
        },
      },
      {
        metin: "Report briefly; keep the rest inside.",
        basariliSonuc: {
          mesaj: "Your terse report left the image of a 'solid soldier'.",
          detay: "Staying silent is a choice too.",
        },
        basarisizSonuc: {
          mesaj: "What you bottled up grew heavy; nightly you relive the siege.",
          detay: "Unspoken pain takes deeper root.",
        },
      },
    ],
  },
  yolculuk_savunma_esaret_1: {
    baslik: "In Crusader Hands",
    metin: "The prison camp is merciless: little food, hard labor, constant insults. A guard whispers conditions improve if you convert.",
    secenekler: [
      {
        metin: "Refuse; don't compromise your faith.",
        basariliSonuc: {
          mesaj: "Your refusal won the prisoners' quiet respect; your honor stands.",
          detay: "Some things aren't for sale.",
        },
        basarisizSonuc: {
          mesaj: "You were harshly punished for refusing, but did not bow.",
          detay: "Heavy price, no regrets.",
        },
      },
      {
        metin: "Feign acceptance; buy time.",
        basariliSonuc: {
          mesaj: "The guards bought it; conditions improved, but you feel tainted.",
          detay: "Survival sometimes wears a mask.",
        },
        basarisizSonuc: {
          mesaj: "Your ruse was seen through; you lost guards' and prisoners' trust.",
          detay: "Some games turn all against you.",
        },
      },
    ],
  },
  yolculuk_savunma_esaret_2: {
    baslik: "Ransom or Escape?",
    metin: "The Sultan set aside ransom, but your turn may take months. At the watch change you spot a chance to escape.",
    secenekler: [
      {
        metin: "Wait patiently for the ransom.",
        basariliSonuc: {
          mesaj: "Months later your ransom was paid; you walked out free.",
          detay: "The Sultan's treasury saved you.",
        },
        basarisizSonuc: {
          mesaj: "Ransom talks dragged on; conditions worsened badly.",
          detay: "Some waits are paid in body.",
        },
      },
      {
        metin: "Try escaping at the watch change.",
        basariliSonuc: {
          mesaj: "Leaping shadow to shadow in the dark, you escaped!",
          detay: "Heart pounding, but free.",
        },
        basarisizSonuc: {
          mesaj: "Your escape was noticed; you were severely punished.",
          detay: "Chances aren't as open as they look.",
        },
      },
    ],
  },
  yolculuk_savunma_esaret_3: {
    baslik: "Homecoming",
    metin: "After captivity or escape you reach home. Your family's tearful welcome eases all you endured.",
    secenekler: [
      {
        metin: "Tell it as it was; face the past.",
        basariliSonuc: {
          mesaj: "Telling it lightened you; your family listened in horror and held you close.",
          detay: "Wounds heal once spoken.",
        },
        basarisizSonuc: {
          mesaj: "Telling it was hard; some nights you still wake in that camp.",
          detay: "Some journeys never end.",
        },
      },
      {
        metin: "Leave the past; don't speak of it.",
        basariliSonuc: {
          mesaj: "You returned quietly to your old life; none asked, you told nothing.",
          detay: "Some silences are shields.",
        },
        basarisizSonuc: {
          mesaj: "It grew in the silence; nightly you wake from those days' nightmare.",
          detay: "Unspoken pain takes deeper root.",
        },
      },
    ],
  },
  yolculuk_kesif_teklif: {
    baslik: "The Blank Corners of the Map",
    metin: "The geographical society seeks a bold merchant-explorer for the blank regions of the map. Profit awaits, and some never return. Sea or land?",
    secenekler: [
      {
        metin: "Fit out a ship; sail for new coasts.",
        basariliSonuc: {
          mesaj: "You stocked the ship, gathered a crew, and sailed for the horizon.",
          detay: "You ignored the 'here be monsters' note.",
        },
        basarisizSonuc: {
          mesaj: "Outfitting cost more than expected, but you set out.",
          detay: "The venture weighed on you early.",
        },
      },
      {
        metin: "Raise a caravan; push inland by land.",
        basariliSonuc: {
          mesaj: "You outfitted the caravan and marched to the map's edge.",
          detay: "These lands were never charted.",
        },
        basarisizSonuc: {
          mesaj: "The caravan cost more than expected, but you set out.",
          detay: "The venture weighed on you early.",
        },
      },
      {
        metin: "Refuse; stick to known routes.",
        basariliSonuc: {
          mesaj: "You declined and stayed on known roads.",
          detay: "The unknown isn't for everyone.",
        },
        basarisizSonuc: {
          mesaj: "Hearing the society found another explorer, you felt a faint regret.",
          detay: "Some choices linger in the mind.",
        },
      },
    ],
  },
  yolculuk_kesif_deniz_1: {
    baslik: "Uncharted Waters",
    metin: "You are past the edge of the maps; the compass wavers, and unrest and whispers of mutiny grow among the crew.",
    secenekler: [
      {
        metin: "Win over the crew; press on.",
        basariliSonuc: {
          mesaj: "Your speech calmed the crew; unity returned.",
          detay: "The best compass is the right word.",
        },
        basarisizSonuc: {
          mesaj: "Some still grumble, but no open mutiny.",
          detay: "Unrest was suppressed, not cured.",
        },
      },
      {
        metin: "Heed the fears; rest a night first.",
        basariliSonuc: {
          mesaj: "A night's rest calmed all; you set out at dawn with better morale.",
          detay: "Stopping is part of progress.",
        },
        basarisizSonuc: {
          mesaj: "The rest didn't help; unrest lasted till morning.",
          detay: "Not every rest brings calm.",
        },
      },
    ],
  },
  yolculuk_kesif_deniz_2: {
    baslik: "First Contact",
    metin: "A coast on no map appears; locals watch from the shore. Approach armed, or with gifts?",
    secenekler: [
      {
        metin: "Approach unarmed, with gifts.",
        basariliSonuc: {
          mesaj: "Your gifts were accepted; the locals invited you to their village.",
          detay: "Some bridges are built on trust.",
        },
        basarisizSonuc: {
          mesaj: "Misunderstood, you clashed and barely returned to the ship.",
          detay: "Good intent isn't always understood.",
        },
      },
      {
        metin: "Be cautious; send an armed party.",
        basariliSonuc: {
          mesaj: "The cautious approach was safe; the locals were distant, not hostile.",
          detay: "Safety can be the price of opportunity.",
        },
        basarisizSonuc: {
          mesaj: "Your armed look frightened the locals into abandoning the village.",
          detay: "Some precautions breed fear.",
        },
      },
    ],
  },
  yolculuk_kesif_deniz_3: {
    baslik: "The Wealth of the New Land",
    metin: "On the shore you found spices, strange fruit, perhaps gold. Gathering it all takes time and risk; the hour to return nears.",
    secenekler: [
      {
        metin: "Go deeper inland for more.",
        basariliSonuc: {
          mesaj: "Riches from the interior filled the ship; this will make you wealthy.",
          detay: "Some risks turn to fortune.",
        },
        basarisizSonuc: {
          mesaj: "The team got lost in harsh terrain; you barely returned, losing time and resources.",
          detay: "Greed sometimes comes to nothing.",
        },
      },
      {
        metin: "Settle for what you have; return.",
        basariliSonuc: {
          mesaj: "You returned safely with your haul; modest but sure gain.",
          detay: "Enough is the wisest.",
        },
        basarisizSonuc: {
          mesaj: "Goods were damaged on the way back; your gain shrank.",
          detay: "No return is trouble-free.",
        },
      },
    ],
  },
  yolculuk_kesif_kara_1: {
    baslik: "Beyond the Silk Road",
    metin: "You've reached the end of known trade routes; ahead lies an unmapped region. Travelers at the last caravanserai call you 'mad'.",
    secenekler: [
      {
        metin: "Hire the most experienced guide.",
        basariliSonuc: {
          mesaj: "The guide sensed the dangers and steered the caravan to a safe route.",
          detay: "Some knowledge outweighs gold.",
        },
        basarisizSonuc: {
          mesaj: "The guide wasn't as skilled as claimed, but did no harm.",
          detay: "Not every investment pays.",
        },
      },
      {
        metin: "Trust your instinct; go without a guide.",
        basariliSonuc: {
          mesaj: "Your instinct held; you led the caravan well and all praised you.",
          detay: "Some leaders find paths unmapped.",
        },
        basarisizSonuc: {
          mesaj: "You took a wrong trail and wandered lost for days before finding the road.",
          detay: "Some instincts cost dearly.",
        },
      },
    ],
  },
  yolculuk_kesif_kara_2: {
    baslik: "Beyond the Mountain Pass",
    metin: "The caravan reaches a pass not on the maps. It looks dangerous, but going around takes weeks.",
    secenekler: [
      {
        metin: "Cross the pass; take the risk.",
        basariliSonuc: {
          mesaj: "You crossed; the caravan is weary but on schedule.",
          detay: "Courage saved time.",
        },
        basarisizSonuc: {
          mesaj: "Pack animals fell on the pass; you lost part of your goods.",
          detay: "The mountain forgives no haste.",
        },
      },
      {
        metin: "Go the long, safe way around.",
        basariliSonuc: {
          mesaj: "The long road was tiring, but the caravan advances intact.",
          detay: "Patience is the mountain's best foe.",
        },
        basarisizSonuc: {
          mesaj: "The road ran longer; provision costs rose.",
          detay: "Safety sometimes costs.",
        },
      },
    ],
  },
  yolculuk_kesif_kara_3: {
    baslik: "The Palace of an Unknown Ruler",
    metin: "The caravan reaches a small kingdom on no map. The ruler welcomes you with curiosity and offers a trade deal, heavily in his favor.",
    secenekler: [
      {
        metin: "Accept the terms; value the relationship.",
        basariliSonuc: {
          mesaj: "The ruler was pleased; you opened the first lasting trade route to his kingdom.",
          detay: "Some gains ripen years later.",
        },
        basarisizSonuc: {
          mesaj: "The terms were harsher than expected; the caravan returned without profit.",
          detay: "Some good intent costs dearly.",
        },
      },
      {
        metin: "Haggle; defend your interest.",
        basariliSonuc: {
          mesaj: "Haggling worked; you profited and won the ruler's respect.",
          detay: "Bold bargains can win both.",
        },
        basarisizSonuc: {
          mesaj: "The ruler took your insistence for insolence and expelled you.",
          detay: "Not every bargain goes as hoped.",
        },
      },
    ],
  },
  yolculuk_kesif_donus: {
    baslik: "Before the Society",
    metin: "You returned from your expedition. The geographical society wants to map your finds and write your name into history.",
    secenekler: [
      {
        metin: "Share your finds for science.",
        basariliSonuc: {
          mesaj: "Your map entered the society's archive under your name; your find will be remembered.",
          detay: "Knowledge is wealth too.",
        },
        basarisizSonuc: {
          mesaj: "Your contribution was praised, but met without enthusiasm.",
          detay: "Not every gift is applauded at once.",
        },
      },
      {
        metin: "Keep your finds as a trade secret.",
        basariliSonuc: {
          mesaj: "You locked away your map; the trade routes are yours alone.",
          detay: "Some wealth grows unshared.",
        },
        basarisizSonuc: {
          mesaj: "The society noticed your secrecy and branded you 'selfish'.",
          detay: "Secrets aren't kept as well as you think.",
        },
      },
    ],
  },
  yolculuk_mucit_teklif: {
    baslik: "The Fateful Moment of the Invention",
    metin: "The invention you secretly built for years is ready. Take it to the nobles' salons or the industrialists' factories?",
    secenekler: [
      {
        metin: "Take it to courts and nobles; seek prestige.",
        basariliSonuc: {
          mesaj: "You packed your model and set out for the mansion that invited you first.",
          detay: "Nobles are slow but never forget.",
        },
        basarisizSonuc: {
          mesaj: "Preparations cost more than expected, but you set out anyway.",
          detay: "The tour weighed on you before it began.",
        },
      },
      {
        metin: "Take it to industrialists; seek fast capital.",
        basariliSonuc: {
          mesaj: "You squeezed your model into a bag and caught the train to the factory district.",
          detay: "Industrialists waste no time.",
        },
        basarisizSonuc: {
          mesaj: "Preparations cost more than expected, but you set out anyway.",
          detay: "The tour weighed on you before it began.",
        },
      },
      {
        metin: "Refuse; keep the invention in a drawer.",
        basariliSonuc: {
          mesaj: "You locked the invention away; maybe one day, you told yourself.",
          detay: "Courage gathers over time.",
        },
        basarisizSonuc: {
          mesaj: "Hearing someone else presented a similar invention, you felt regret.",
          detay: "Some chances never return.",
        },
      },
    ],
  },
  yolculuk_mucit_saray_1: {
    baslik: "Skeptical Nobles",
    metin: "Your first demo is in a count's salon; guests dismiss your invention as 'cheap conjuring'. You must win them over patiently.",
    secenekler: [
      {
        metin: "Give a live, showy demonstration.",
        basariliSonuc: {
          mesaj: "The salon was astonished; your invention became the talk of the hour.",
          detay: "A bold show is the best advertisement.",
        },
        basarisizSonuc: {
          mesaj: "The model broke down; guests left the salon snickering.",
          detay: "Some risks backfire on stage.",
        },
      },
      {
        metin: "Give a calm, technical explanation.",
        basariliSonuc: {
          mesaj: "A few curious nobles took interest; a small but solid start.",
          detay: "Impressions form slowly.",
        },
        basarisizSonuc: {
          mesaj: "The technical details bored the guests.",
          detay: "Not every telling lands the same.",
        },
      },
    ],
  },
  yolculuk_mucit_saray_2: {
    baslik: "A Patronage Negotiation",
    metin: "A duchess offers generous funding for your invention, but wants it known in future 'under her name'.",
    secenekler: [
      {
        metin: "Accept; take the funding.",
        basariliSonuc: {
          mesaj: "Your purse filled, but the invention now bears the duchess's name.",
          detay: "Some gains cost your own name.",
        },
        basarisizSonuc: {
          mesaj: "The deal was signed, but the duchess withheld part of her promise.",
          detay: "A noble's word isn't always kept.",
        },
      },
      {
        metin: "Refuse; insist on your own name.",
        basariliSonuc: {
          mesaj: "Your insistence impressed her; you got smaller support, under your own name.",
          detay: "Some principles aren't negotiable.",
        },
        basarisizSonuc: {
          mesaj: "The duchess resented the refusal and withdrew all support.",
          detay: "Principles sometimes cost dearly.",
        },
      },
    ],
  },
  yolculuk_mucit_saray_3: {
    baslik: "The Royal Exhibition",
    metin: "Your invention entered the royal exhibition; you give one last demo before the king. The court's best inventors are watching.",
    secenekler: [
      {
        metin: "Give the boldest, riskiest demonstration.",
        basariliSonuc: {
          mesaj: "Your demo enchanted the king; the invention was 'royally approved'.",
          detay: "The turning point of your career.",
        },
        basarisizSonuc: {
          mesaj: "The demo failed before the court; an embarrassed silence fell.",
          detay: "Some risks blow up in public.",
        },
      },
      {
        metin: "Give a safe, proven demonstration.",
        basariliSonuc: {
          mesaj: "Your demo went smoothly; the king nodded in approval.",
          detay: "Reliable can beat dazzling.",
        },
        basarisizSonuc: {
          mesaj: "The demo seemed ordinary; the court turned to another inventor.",
          detay: "Playing safe can mean being forgotten.",
        },
      },
    ],
  },
  yolculuk_mucit_sanayici_1: {
    baslik: "The Investors' Meeting",
    metin: "Hard-faced factory owners judge your invention by one question: 'how much profit?' Emotional speeches fail here.",
    secenekler: [
      {
        metin: "Stress profit with concrete figures.",
        basariliSonuc: {
          mesaj: "Your figures convinced them; a few owners took interest at once.",
          detay: "Industrialists respond to profit, not feeling.",
        },
        basarisizSonuc: {
          mesaj: "Your figures didn't fully convince; interest was cautious.",
          detay: "Not every calculation lands the same.",
        },
      },
      {
        metin: "Explain the social benefit and long-term vision.",
        basariliSonuc: {
          mesaj: "Your vision impressed some; they offered more than ordinary investment.",
          detay: "Passion can outpersuade figures.",
        },
        basarisizSonuc: {
          mesaj: "Your vision was dismissed as 'unrealistic'; the meeting ended cold.",
          detay: "Dreams sometimes don't pay.",
        },
      },
    ],
  },
  yolculuk_mucit_sanayici_2: {
    baslik: "The Risk of Your Idea Being Stolen",
    metin: "After the meeting, you noticed a rival factory owner's men trying to sneak into your workshop to study the drawings.",
    secenekler: [
      {
        metin: "Lock the drawings away; rush the patent.",
        basariliSonuc: {
          mesaj: "The patent was filed on time; the invention is legally yours.",
          detay: "Some safeguards arrive just in time.",
        },
        basarisizSonuc: {
          mesaj: "Bureaucracy wore you out; you couldn't secure full protection.",
          detay: "Some protections stay incomplete.",
        },
      },
      {
        metin: "Ignore it; keep the relationship.",
        basariliSonuc: {
          mesaj: "Nothing was stolen this time, but unease lingered.",
          detay: "You were lucky this time.",
        },
        basarisizSonuc: {
          mesaj: "The rival stole part of your design and launched a similar product within months.",
          detay: "Negligence costs dearly.",
        },
      },
    ],
  },
  yolculuk_mucit_sanayici_3: {
    baslik: "A Production Agreement",
    metin: "The biggest factory owner offers a huge mass-production deal, but puts speed above all; quality and worker safety come second.",
    secenekler: [
      {
        metin: "Sign; choose fast growth.",
        basariliSonuc: {
          mesaj: "The invention went into mass production and your fortune multiplied.",
          detay: "Some wealth is bought with quality.",
        },
        basarisizSonuc: {
          mesaj: "Production stumbled and defective batches were recalled, but the deal still paid.",
          detay: "Speed can overshadow quality.",
        },
      },
      {
        metin: "Demand quality; take a smaller deal.",
        basariliSonuc: {
          mesaj: "You held your terms and struck a deal with a smaller, solid owner.",
          detay: "Some gains grow slow but solid.",
        },
        basarisizSonuc: {
          mesaj: "Your insistence put off most owners; a deal was hard to find.",
          detay: "Principles can weaken bargaining power.",
        },
      },
    ],
  },
  yolculuk_mucit_donus: {
    baslik: "At the End of the Tour",
    metin: "The tour is over. Your invention's fate is clear: newspapers, colleagues and rivals all talk of you. Time to go home to your workshop.",
    secenekler: [
      {
        metin: "Start a new invention with your gains.",
        basariliSonuc: {
          mesaj: "Back in the workshop you chased a new idea; the tour opened a new horizon.",
          detay: "The mind always seeks the next one.",
        },
        basarisizSonuc: {
          mesaj: "Rushing into a new idea wore you out; you needed rest.",
          detay: "Ambition outpaces the body.",
        },
      },
      {
        metin: "Rest; enjoy your reputation.",
        basariliSonuc: {
          mesaj: "You gave yourself time; the tour's weariness slowly fell away.",
          detay: "Some victories are savored by resting.",
        },
        basarisizSonuc: {
          mesaj: "You tried to rest, but your mind was still on the tour.",
          detay: "Some excitement doesn't fade easily.",
        },
      },
    ],
  },

  // --- "Too few events" pass, Phase 3 (Path A): pooled alternates for the
  // middle step of each Hajj religion×route chain (see server-side comment).
  hac_sunni_kara_2b: {
    baslik: "A Dream",
    metin: "At camp, an elderly pilgrim says he dreamed the pass ahead is dangerous and asks the caravan master to take a longer route.",
    secenekler: [
      {
        metin: "Heed the dream; take the longer, safer road.",
        basariliSonuc: {
          mesaj: "You took the long road; tiring but calm.",
          detay: "Some instincts are worth heeding.",
        },
        basarisizSonuc: {
          mesaj: "The long road was more exhausting than expected; the caravan fell behind.",
          detay: "Caution isn't free.",
        },
      },
      {
        metin: "Ignore the dream; take the short pass.",
        basariliSonuc: {
          mesaj: "The pass was crossed without incident; no time lost.",
          detay: "Instincts can be wrong.",
        },
        basarisizSonuc: {
          mesaj: "A rockslide really hit the pass; you pressed on with a few injured.",
          detay: "You should have heard the old pilgrim.",
        },
      },
    ],
  },
  hac_sunni_deniz_2b: {
    baslik: "Sickness Aboard",
    metin: "A fever has broken out among several passengers. The captain wants to isolate the sick, but some pilgrims object.",
    secenekler: [
      {
        metin: "Back the captain; isolate the sick.",
        basariliSonuc: {
          mesaj: "The isolation worked; the illness died out.",
          detay: "A hard call, but it saved the ship.",
        },
        basarisizSonuc: {
          mesaj: "Despite isolation, the illness reached a few more.",
          detay: "Some precautions fall short.",
        },
      },
      {
        metin: "Tend to the sick yourself.",
        basariliSonuc: {
          mesaj: "You tended the sick all night; by dawn their fevers broke.",
          detay: "Your kindness is the talk of the ship.",
        },
        basarisizSonuc: {
          mesaj: "Nursing them, you caught a mild fever — but they recovered.",
          detay: "Your body paid for your kindness.",
        },
      },
    ],
  },
  hac_katolik_kara_2b: {
    baslik: "Bandit Threat",
    metin: "In a narrow valley, armed bandits block the caravan and demand a heavy 'toll' for passage.",
    secenekler: [
      {
        metin: "Pay what they ask; save the caravan.",
        basariliSonuc: {
          mesaj: "You paid; the bandits let you pass.",
          detay: "Some prices are only money.",
        },
        basarisizSonuc: {
          mesaj: "Despite payment, the bandits seized a few more belongings.",
          detay: "Some deals are broken one-sidedly.",
        },
      },
      {
        metin: "Resist with the armed men.",
        basariliSonuc: {
          mesaj: "After a brief clash, the bandits retreated.",
          detay: "Your courage will be talked about.",
        },
        basarisizSonuc: {
          mesaj: "The clash went badly; you pressed on wounded and short of goods.",
          detay: "Resisting doesn't always pay.",
        },
      },
    ],
  },
  hac_katolik_deniz_2b: {
    baslik: "A Shady Harbor",
    metin: "The ship anchors at an unexpected port; cargo is quietly unloaded in the dark. The captain is smuggling.",
    secenekler: [
      {
        metin: "Look away; retreat to your cabin.",
        basariliSonuc: {
          mesaj: "You acted as if you saw nothing; the ship sailed before dawn.",
          detay: "Some things are easier not to know.",
        },
        basarisizSonuc: {
          mesaj: "You looked away, but your conscience found no peace.",
          detay: "Silence can be a heavy burden.",
        },
      },
      {
        metin: "Confront the captain; demand he stop.",
        basariliSonuc: {
          mesaj: "The captain heeded you, reloaded the cargo and sailed on.",
          detay: "Speaking up worked.",
        },
        basarisizSonuc: {
          mesaj: "The captain scolded you and sent you below; the smuggling went on.",
          detay: "Not every objection changes anything.",
        },
      },
    ],
  },
  hac_ortodoks_kara_2b: {
    baslik: "The Relic Bearer",
    metin: "An elderly monk on the road asks you to deliver a holy relic to a safe monastery — a small detour from the caravan's route.",
    secenekler: [
      {
        metin: "Agree; deliver the relic.",
        basariliSonuc: {
          mesaj: "You delivered the relic safely; the monks sent you off with prayers.",
          detay: "Some tasks are holier than the road.",
        },
        basarisizSonuc: {
          mesaj: "The road was harder than expected, but you delivered it anyway.",
          detay: "Your body paid for your kindness.",
        },
      },
      {
        metin: "Politely decline; stay with the caravan.",
        basariliSonuc: {
          mesaj: "You gently refused the monk; the caravan lost no time.",
          detay: "You needn't take every task.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal saddened the monk; his gaze lingers.",
          detay: "Some refusals leave a mark.",
        },
      },
    ],
  },
  hac_ortodoks_deniz_2b: {
    baslik: "A Birth at Sea",
    metin: "A pilgrim's wife aboard has gone into labor; there's no experienced midwife, and every eye turns to you.",
    secenekler: [
      {
        metin: "Do your best; help with the birth.",
        basariliSonuc: {
          mesaj: "A healthy baby was born; cries of joy rose on deck.",
          detay: "The voyage will be remembered for a birth.",
        },
        basarisizSonuc: {
          mesaj: "You did your best, but the labor was very hard; all were shaken.",
          detay: "Some nights are never forgotten.",
        },
      },
      {
        metin: "Admit inexperience; just pray.",
        basariliSonuc: {
          mesaj: "As you prayed, a woman aboard helped with the birth; all went well.",
          detay: "Sometimes the best help is stepping aside.",
        },
        basarisizSonuc: {
          mesaj: "The birth was difficult; you could only watch.",
          detay: "Helplessness wore you down.",
        },
      },
    ],
  },
  hac_anglikan_deniz_2b: {
    baslik: "Off Course",
    metin: "In a night storm the compass broke; by morning the ship had drifted far off course. The captain offers two options.",
    secenekler: [
      {
        metin: "Follow the safe but long backup route.",
        basariliSonuc: {
          mesaj: "The backup route added days, but you proceeded without incident.",
          detay: "Patience is sometimes fastest.",
        },
        basarisizSonuc: {
          mesaj: "The backup route proved hard too; morale sank.",
          detay: "Some days drag on, patience or not.",
        },
      },
      {
        metin: "Take the shortcut through unknown waters.",
        basariliSonuc: {
          mesaj: "You crossed the unknown waters boldly; lost time was made up.",
          detay: "Your courage will be talked about.",
        },
        basarisizSonuc: {
          mesaj: "The ship scraped a shallow reef; a frightening night followed.",
          detay: "Shortcuts sometimes cost more.",
        },
      },
    ],
  },
  hac_anglikan_kara_2b: {
    baslik: "The Dried-Up Well",
    metin: "The well on your route has run dry; the nearest water is a day away, but a local shepherd offers a hidden shortcut.",
    secenekler: [
      {
        metin: "Trust the shepherd's shortcut.",
        basariliSonuc: {
          mesaj: "The shortcut worked; the caravan went on with fresh water.",
          detay: "Trusting a stranger sometimes pays.",
        },
        basarisizSonuc: {
          mesaj: "The shortcut led you astray; you spent an extra day without water.",
          detay: "Not every shortcut pays off.",
        },
      },
      {
        metin: "Take the known, longer, safe road.",
        basariliSonuc: {
          mesaj: "You reached water by the long road; tired but safe.",
          detay: "The known road rarely fails.",
        },
        basarisizSonuc: {
          mesaj: "The long road was more exhausting than expected; thirst worsened.",
          detay: "Some days are simply long.",
        },
      },
    ],
  },

  // --- "Too few events" pass, Phase 3.2: same pooling pattern applied to
  // the other 5 journey types (Crusade, Colonial, Defense, Exploration,
  // Invention Tour).
  oc_hacli_kara_2b: {
    baslik: "A Local Guide",
    metin: "A local shepherd says that for a few coins he can show the army a safer mountain pass. The commanders debate trusting him.",
    secenekler: [
      {
        metin: "Trust the guide; accept.",
        basariliSonuc: {
          mesaj: "The guide told the truth; the pass was safer.",
          detay: "Trusting a stranger sometimes pays.",
        },
        basarisizSonuc: {
          mesaj: "The guide led you into an ambush; you escaped with a few soldiers lost.",
          detay: "Not every stranger means well.",
        },
      },
      {
        metin: "Refuse; take the known, long road.",
        basariliSonuc: {
          mesaj: "You took the known road; tiring but uneventful.",
          detay: "Caution takes patience.",
        },
        basarisizSonuc: {
          mesaj: "The long road was more exhausting than expected; the army wore down.",
          detay: "Some roads are simply long.",
        },
      },
    ],
  },
  oc_hacli_deniz_2b: {
    baslik: "Pirate Attack at Sea",
    metin: "Ships flying pirate colors appear on the horizon. Form a defensive line, or outrun them with the faster ships?",
    secenekler: [
      {
        metin: "Form up and fight back.",
        basariliSonuc: {
          mesaj: "After a brief clash, the pirates withdrew.",
          detay: "Your courage will be talked about.",
        },
        basarisizSonuc: {
          mesaj: "The clash went badly; you went on with losses and looted holds.",
          detay: "Resisting doesn't always pay.",
        },
      },
      {
        metin: "Flee with the fastest ships.",
        basariliSonuc: {
          mesaj: "The fleet escaped the pirates without scattering.",
          detay: "Fleeing is sometimes wisest.",
        },
        basarisizSonuc: {
          mesaj: "The slowest ship was caught and looted; the rest escaped.",
          detay: "Not every escape saves everyone.",
        },
      },
    ],
  },
  sd_somurge_diplomasi_2b: {
    baslik: "A Local Dispute",
    metin: "A land dispute between settlers and locals is growing. Both sides ask you to mediate.",
    secenekler: [
      {
        metin: "Propose a fair compromise; hear both.",
        basariliSonuc: {
          mesaj: "Your compromise satisfied both; your name is spoken with respect.",
          detay: "Justice is the best diplomacy.",
        },
        basarisizSonuc: {
          mesaj: "Your mediation failed; neither side was pleased.",
          detay: "Not every mediation succeeds.",
        },
      },
      {
        metin: "Side with the settlers; decide fast.",
        basariliSonuc: {
          mesaj: "The settlers were pleased and sent you a gift.",
          detay: "Quick decisions wear on the conscience.",
        },
        basarisizSonuc: {
          mesaj: "Your ruling worsened the tension; both sides left angry.",
          detay: "Hasty decisions backfire.",
        },
      },
    ],
  },
  sd_somurge_askeri_2b: {
    baslik: "A Night Raid",
    metin: "Sentries spotted suspicious movement around the camp. A local resistance group may be planning a night raid.",
    secenekler: [
      {
        metin: "Tighten the watch; ready the camp.",
        basariliSonuc: {
          mesaj: "The raid was repelled by the tight watch.",
          detay: "Caution paid off tonight.",
        },
        basarisizSonuc: {
          mesaj: "The raid was fiercer than expected; you met dawn with a few wounded.",
          detay: "Not every precaution is enough.",
        },
      },
      {
        metin: "Take the initiative; scout it yourself.",
        basariliSonuc: {
          mesaj: "Your scouting showed no real threat; the camp settled.",
          detay: "Sometimes looking directly is best.",
        },
        basarisizSonuc: {
          mesaj: "You ran into a real clash while scouting; you returned wounded but alive.",
          detay: "Courage sometimes has a price.",
        },
      },
    ],
  },
  yolculuk_savunma_kara_2b: {
    baslik: "Spy Suspicion",
    metin: "Rumors say a spy is leaking information to the enemy within the unit. Suspicion falls on a new soldier.",
    secenekler: [
      {
        metin: "Open a fair investigation; gather proof.",
        basariliSonuc: {
          mesaj: "The soldier was innocent; trust in the unit grew.",
          detay: "Justice can outweigh discipline.",
        },
        basarisizSonuc: {
          mesaj: "The inquiry was inconclusive, but suspicion strains the unit.",
          detay: "Some suspicions never close.",
        },
      },
      {
        metin: "Detain the suspect; interrogate.",
        basariliSonuc: {
          mesaj: "The harsh interrogation revealed the real spy was someone else.",
          detay: "Speed sometimes works.",
        },
        basarisizSonuc: {
          mesaj: "An innocent soldier was harshly questioned; unease grew.",
          detay: "Harshness hits the wrong target.",
        },
      },
    ],
  },
  yolculuk_savunma_deniz_2b: {
    baslik: "Naval Blockade",
    metin: "Enemy ships blockade the way to the harbor. The fleet must break the line or take a long roundabout route.",
    secenekler: [
      {
        metin: "Try to break the blockade line.",
        basariliSonuc: {
          mesaj: "A bold maneuver broke the blockade; the fleet got through.",
          detay: "Your courage will be talked about.",
        },
        basarisizSonuc: {
          mesaj: "The line was tighter than thought; you got through heavily damaged.",
          detay: "Not every maneuver works out.",
        },
      },
      {
        metin: "Take the long roundabout route.",
        basariliSonuc: {
          mesaj: "The detour took time but the fleet advanced undamaged.",
          detay: "Patience is the safest weapon.",
        },
        basarisizSonuc: {
          mesaj: "A storm hit the detour too; everyone was worn out.",
          detay: "Some days are simply hard.",
        },
      },
    ],
  },
  yolculuk_kesif_kara_2b: {
    baslik: "A Lost Map",
    metin: "The guide found a valley missing from an old map; he thinks it may hold a rare mineral deposit, but straying costs time.",
    secenekler: [
      {
        metin: "Make a small detour to the valley.",
        basariliSonuc: {
          mesaj: "The valley held a valuable deposit; your find went on record.",
          detay: "Some detours bring great rewards.",
        },
        basarisizSonuc: {
          mesaj: "The valley was empty; morale sank with the lost time.",
          detay: "Not every trail leads to treasure.",
        },
      },
      {
        metin: "Stick to the plan; no detour.",
        basariliSonuc: {
          mesaj: "You stuck to the plan; the caravan stayed on schedule.",
          detay: "Some chances are worth letting go.",
        },
        basarisizSonuc: {
          mesaj: "You overruled the guide; mild disappointment lingers.",
          detay: "Caution can leave dissatisfaction.",
        },
      },
    ],
  },
  yolculuk_kesif_deniz_2b: {
    baslik: "An Uncharted Island",
    metin: "A small island unmarked on any map is sighted. Does the crew land to explore, or sail on?",
    secenekler: [
      {
        metin: "Land and explore the island.",
        basariliSonuc: {
          mesaj: "The island held a valuable resource off every map; your find will be talked about.",
          detay: "Some islands give up secrets freely.",
        },
        basarisizSonuc: {
          mesaj: "The island was dangerous; you returned to the ship with wounded.",
          detay: "Not every discovery is safe.",
        },
      },
      {
        metin: "Note the island; sail on.",
        basariliSonuc: {
          mesaj: "You noted its position; perhaps for another voyage.",
          detay: "Some discoveries can wait.",
        },
        basarisizSonuc: {
          mesaj: "The crew was disappointed, but the voyage went on.",
          detay: "Caution can dampen morale.",
        },
      },
    ],
  },
  yolculuk_mucit_saray_2b: {
    baslik: "A Jealous Rival Inventor",
    metin: "Another court inventor is spreading rumors that your invention was really his idea. The nobles have started talking.",
    secenekler: [
      {
        metin: "Disprove it with a public demo.",
        basariliSonuc: {
          mesaj: "The demo refuted the claims; you were clearly the true inventor.",
          detay: "Some claims are silenced only by proof.",
        },
        basarisizSonuc: {
          mesaj: "The demo went wrong; the rumors grew.",
          detay: "Not every challenge works.",
        },
      },
      {
        metin: "Ignore it; focus on your work.",
        basariliSonuc: {
          mesaj: "You ignored the rumor; it died down on its own.",
          detay: "Some noise is best left to fade.",
        },
        basarisizSonuc: {
          mesaj: "Though ignored, the rumor circulated a while longer.",
          detay: "Some voices don't quiet easily.",
        },
      },
    ],
  },
  yolculuk_mucit_sanayici_2b: {
    baslik: "A Factory Accident",
    metin: "During a factory demo, a machine overheats and starts hissing dangerously. Workers panic; you must decide.",
    secenekler: [
      {
        metin: "Approach the machine and stop it yourself.",
        basariliSonuc: {
          mesaj: "You stopped the machine in time; the workers applauded.",
          detay: "Your courage will be talked about.",
        },
        basarisizSonuc: {
          mesaj: "Your attempt failed; a small blast wounded you, but no one died.",
          detay: "Not every heroism is rewarded.",
        },
      },
      {
        metin: "Evacuate everyone.",
        basariliSonuc: {
          mesaj: "The evacuation went smoothly; the factory men controlled the machine.",
          detay: "Sometimes the best help is stepping aside.",
        },
        basarisizSonuc: {
          mesaj: "Some equipment was damaged in the evacuation; you paid compensation.",
          detay: "Some accidents cost money.",
        },
      },
    ],
  },

  // "Az olay var" turu Faz 4 (2026-09): pos2→pos3 branching alternates
  hac_sunni_kara_3b: {
    baslik: "Sandstorm",
    metin: "Darkening skies herald a sandstorm. The caravan leader can't choose between pitching tents or racing for the rocky pass; he asks you.",
    secenekler: [
      {
        metin: "Pitch tents, wait out the storm here.",
        basariliSonuc: {
          mesaj: "The tents held; everyone waited out the storm cramped but safe.",
          detay: "Caution is sometimes just patience.",
        },
        basarisizSonuc: {
          mesaj: "A tent pole snapped and sand got everywhere; a rough night.",
          detay: "Desert fury ignores canvas.",
        },
      },
      {
        metin: "Race for the rocky pass first.",
        basariliSonuc: {
          mesaj: "You reached the pass in time; you laughed behind the rocks as the storm howled.",
          detay: "A brave dash, sweetly rewarded.",
        },
        basarisizSonuc: {
          mesaj: "The storm caught you halfway; blinded by sand, you barely finished the trek.",
          detay: "Some bets are lost.",
        },
      },
    ],
  },
  hac_sunni_deniz_3b: {
    baslik: "Crowds at Jeddah Port",
    metin: "Approaching Jeddah, pushing breaks out on deck; everyone wants off first. The captain asks if he should enforce a line.",
    secenekler: [
      {
        metin: "Have the captain enforce a line.",
        basariliSonuc: {
          mesaj: "The line calmed everyone; disembarking was slow but peaceful.",
          detay: "Patience is sometimes fastest.",
        },
        basarisizSonuc: {
          mesaj: "The line broke down; you shoved ashore, more exhausted.",
          detay: "Order sometimes stays on paper.",
        },
      },
      {
        metin: "Fend for yourself; push through.",
        basariliSonuc: {
          mesaj: "You slipped through the crowd and were among the first ashore.",
          detay: "Agility sometimes pays.",
        },
        basarisizSonuc: {
          mesaj: "You fell in the crush and hurt your ankle, limping onto the dock.",
          detay: "Crowds show no mercy.",
        },
      },
    ],
  },
  hac_katolik_kara_3b: {
    baslik: "Avalanche Danger",
    metin: "The guide whispers that the snow above the pass is loose and must be crossed quietly. Some pilgrims want to pray aloud.",
    secenekler: [
      {
        metin: "Convince everyone to stay silent.",
        basariliSonuc: {
          mesaj: "You crossed step by step in silence; the snow never stirred.",
          detay: "Leadership sometimes means silence.",
        },
        basarisizSonuc: {
          mesaj: "Some still murmured prayers; you crossed tense but safe.",
          detay: "Full obedience is rare.",
        },
      },
      {
        metin: "Allow the prayers; trust faith.",
        basariliSonuc: {
          mesaj: "The prayers echoed but no avalanche came; the group called it a miracle.",
          detay: "Some moments strengthen faith.",
        },
        basarisizSonuc: {
          mesaj: "The vibration set off a small snow slide; a few were lightly hurt.",
          detay: "Nature is sometimes unforgiving.",
        },
      },
    ],
  },
  hac_katolik_deniz_3b: {
    baslik: "Mass on Deck",
    metin: "On the last night before arrival, the pilgrims want a thanksgiving mass on deck. The captain says weather will turn and everyone should stay below.",
    secenekler: [
      {
        metin: "Keep it short; gather all on deck.",
        basariliSonuc: {
          mesaj: "A short, deeply moving mass; everyone gave thanks in tears.",
          detay: "Some memories last a lifetime.",
        },
        basarisizSonuc: {
          mesaj: "An unexpected wave soaked the deck mid-mass; a few caught a chill.",
          detay: "The sea ignores plans.",
        },
      },
      {
        metin: "Obey the captain; hold it below.",
        basariliSonuc: {
          mesaj: "You held a calm mass below; modest but peaceful.",
          detay: "Safety can outweigh splendor.",
        },
        basarisizSonuc: {
          mesaj: "The mass was cut short in the cramped hold; all felt a little let down.",
          detay: "Not every ceremony ends as hoped.",
        },
      },
    ],
  },
  hac_ortodoks_kara_3b: {
    baslik: "A Youth Lost in the Woods",
    metin: "At a rest stop, a young pilgrim went into the woods for water and got lost. Night falls; the leader wants to move on, but the youth's family begs.",
    secenekler: [
      {
        metin: "Form a search party; find the youth.",
        basariliSonuc: {
          mesaj: "The youth was found, scared but unharmed; the family was endlessly grateful.",
          detay: "Saving a life gives a night meaning.",
        },
        basarisizSonuc: {
          mesaj: "Hours of searching found nothing; the caravan moved on in sorrow.",
          detay: "Not every search ends happily.",
        },
      },
      {
        metin: "Follow the leader; move on.",
        basariliSonuc: {
          mesaj: "The caravan moved on; the family's cries followed you for long.",
          detay: "Some decisions are paid in conscience.",
        },
        basarisizSonuc: {
          mesaj: "You moved on, but that night's weight stayed with you the whole journey.",
          detay: "Some burdens never lighten.",
        },
      },
    ],
  },
  hac_ortodoks_deniz_3b: {
    baslik: "Encounter with a Fishing Boat",
    metin: "A small fishing boat signals on the horizon: their supplies are gone. The captain says diverting will cause delay.",
    secenekler: [
      {
        metin: "Divert; give them supplies.",
        basariliSonuc: {
          mesaj: "The fishermen got supplies; they waved off gratefully.",
          detay: "Solidarity at sea is tradition.",
        },
        basarisizSonuc: {
          mesaj: "A crate fell overboard while helping, costing more than expected.",
          detay: "Kindness sometimes costs more.",
        },
      },
      {
        metin: "Hold course; pass without helping.",
        basariliSonuc: {
          mesaj: "The ship held course; the boat shrank into the horizon.",
          detay: "Some choices are practical but cold.",
        },
        basarisizSonuc: {
          mesaj: "You passed by, but some passengers quietly condemned it.",
          detay: "Every decision has an observer.",
        },
      },
    ],
  },
  hac_anglikan_kara_3b: {
    baslik: "Weary Horses",
    metin: "The caravan's horses have walked for days without rest; one now refuses to go on. The farrier wants rest, but time is short.",
    secenekler: [
      {
        metin: "Rest a day; let the horses recover.",
        basariliSonuc: {
          mesaj: "The rest refreshed the horses; you finished the journey safely.",
          detay: "Progress sometimes means stopping.",
        },
        basarisizSonuc: {
          mesaj: "The rest dragged on and everyone grew impatient, but you moved on.",
          detay: "Even rest has a cost.",
        },
      },
      {
        metin: "Swap the horse; press on now.",
        basariliSonuc: {
          mesaj: "The new horse fit in quickly; you went on without loss.",
          detay: "Money sometimes buys time.",
        },
        basarisizSonuc: {
          mesaj: "The new horse was stubborn too; a jolting, exhausting day.",
          detay: "Not every investment pays off.",
        },
      },
    ],
  },
  hac_anglikan_deniz_3b: {
    baslik: "Anchor Trouble",
    metin: "The ship anchored overnight finds its anchor wedged on a rock. A diver is risky; cutting it loose makes future anchoring harder.",
    secenekler: [
      {
        metin: "Send a diver; save the anchor.",
        basariliSonuc: {
          mesaj: "The diver freed the anchor skillfully; the ship went on without loss.",
          detay: "Some risks are taken with skill.",
        },
        basarisizSonuc: {
          mesaj: "The diver was hurt pulling free, and the anchor was lost anyway.",
          detay: "Some attempts cost twice.",
        },
      },
      {
        metin: "Cut the anchor loose; don't waste time.",
        basariliSonuc: {
          mesaj: "The anchor was cut and the ship sailed at once; a small loss.",
          detay: "Accepting a loss is the fastest fix.",
        },
        basarisizSonuc: {
          mesaj: "The rope snapped while cutting; a couple of sailors were grazed.",
          detay: "Even simple tasks can go wrong.",
        },
      },
    ],
  },

  // "Az olay var" turu Faz 5 (2026-09): second branch point for the remaining
  // 5 journey types
  oc_hacli_kutsal_topraklar_savasi_b: {
    baslik: "Night Raid",
    metin: "Rather than storm the walls, the commander proposes slipping through a tunnel at night and opening the gates from within. Risky, but bloodless.",
    secenekler: [
      {
        metin: "Join the infiltration team.",
        basariliSonuc: {
          mesaj: "You slipped in by tunnel and opened the gates; the fortress fell almost unopposed.",
          detay: "Some victories are won by silence.",
        },
        basarisizSonuc: {
          mesaj: "The tunnel collapsed, trapping some soldiers; the rest barely escaped.",
          detay: "This night raid cost dearly.",
        },
      },
      {
        metin: "Stay with the main force; keep besieging.",
        basariliSonuc: {
          mesaj: "You stayed with the main force; the fortress fell the conventional way.",
          detay: "Not every victory needs brilliance.",
        },
        basarisizSonuc: {
          mesaj: "You were lightly wounded in a counterattack during the siege.",
          detay: "Even ordinary duty is risky here.",
        },
      },
    ],
  },
  sd_somurge_ahlaki_ikilem_b: {
    baslik: "The Journalist's Question",
    metin: "A journalist from home asks you direct questions about colonial practices. What you say will be published.",
    secenekler: [
      {
        metin: "Defend the company; say all is well.",
        basariliSonuc: {
          mesaj: "The company was pleased and promised promotion; your words weigh on you.",
          detay: "Some words nag after being said.",
        },
        basarisizSonuc: {
          mesaj: "Your words seemed inconsistent; the journalist wrote skeptically.",
          detay: "Lies sometimes give themselves away.",
        },
      },
      {
        metin: "Tell the truth; take the risk.",
        basariliSonuc: {
          mesaj: "Your honest interview resonated back home; many admired you.",
          detay: "Truth is its own victory.",
        },
        basarisizSonuc: {
          mesaj: "The company disliked the interview and cut your bonuses.",
          detay: "The honest word had a cost.",
        },
      },
    ],
  },
  yolculuk_savunma_savas_ortak_b: {
    baslik: "The Wounded Behind the Front",
    metin: "The assault was repelled, but the rear fills with wounded and medics can't cope. Yet the watch must go on.",
    secenekler: [
      {
        metin: "Leave your post; help the wounded.",
        basariliSonuc: {
          mesaj: "You helped the wounded; a few lives were saved thanks to you.",
          detay: "This kindness will be remembered here.",
        },
        basarisizSonuc: {
          mesaj: "You did what you could, but some wounded died and you were left exhausted.",
          detay: "Not every effort succeeds.",
        },
      },
      {
        metin: "Stay at your post; keep watch.",
        basariliSonuc: {
          mesaj: "Your watch caught and stopped a sudden night attack.",
          detay: "Discipline is invisible but vital.",
        },
        basarisizSonuc: {
          mesaj: "You kept watch, but the screams behind you stayed in your ears.",
          detay: "Some sounds never fade.",
        },
      },
    ],
  },
  yolculuk_kesif_kara_3b: {
    baslik: "An Abandoned City",
    metin: "The caravan came upon the ruins of an abandoned city, on no map. Some want to search for treasure; the leader wants to press on.",
    secenekler: [
      {
        metin: "Stay briefly; explore the ruins.",
        basariliSonuc: {
          mesaj: "You found a forgotten treasure chamber; the caravan moved on richer.",
          detay: "Some finds hide in odd places.",
        },
        basarisizSonuc: {
          mesaj: "A few were lightly hurt in a collapsing tunnel; nothing was found.",
          detay: "Not every exploration pays.",
        },
      },
      {
        metin: "Don't stop; press on.",
        basariliSonuc: {
          mesaj: "The caravan pressed on; the city's secrets stayed behind.",
          detay: "Moving on suppresses curiosity.",
        },
        basarisizSonuc: {
          mesaj: "Some members grew restless, feeling the chance was missed.",
          detay: "Not every decision pleases everyone.",
        },
      },
    ],
  },
  yolculuk_kesif_deniz_3b: {
    baslik: "An Unmapped Island",
    metin: "A small island on no chart appeared on the horizon. The crew is eager to land, but the wind window is narrow.",
    secenekler: [
      {
        metin: "Anchor; make a brief exploration.",
        basariliSonuc: {
          mesaj: "You found a rare spice source on the island; a new route entered the ledger.",
          detay: "Some islands deserve remembering.",
        },
        basarisizSonuc: {
          mesaj: "The wind shifted and the ship barely escaped to open water; exploration cut short.",
          detay: "The sea won't wait for the curious.",
        },
      },
      {
        metin: "Hold course; leave the island.",
        basariliSonuc: {
          mesaj: "The ship held course; the island vanished into the horizon.",
          detay: "Some curiosity must be suppressed.",
        },
        basarisizSonuc: {
          mesaj: "The crew lamented the missed chance; morale dipped.",
          detay: "Cautious choices aren't always popular.",
        },
      },
    ],
  },
  yolculuk_mucit_saray_3b: {
    baslik: "The Rival Inventor's Trap",
    metin: "A rival inventor at court spread a malicious rumor about your invention right before your show. The hall buzzes with whispers.",
    secenekler: [
      {
        metin: "Ignore the rumor; focus on the show.",
        basariliSonuc: {
          mesaj: "Your show thoroughly refuted the rumor; the rival fell into shadow.",
          detay: "The best answer is doing your job well.",
        },
        basarisizSonuc: {
          mesaj: "The rumor lingered in some nobles' minds; your show passed in shadow.",
          detay: "Some whispers win before the show starts.",
        },
      },
      {
        metin: "Confront the rival before the hall.",
        basariliSonuc: {
          mesaj: "The confrontation cornered the rival; the hall took your side.",
          detay: "A bold confrontation is the best defense.",
        },
        basarisizSonuc: {
          mesaj: "The confrontation turned ugly; the hall disliked you both.",
          detay: "Not every confrontation favors you.",
        },
      },
    ],
  },
  yolculuk_mucit_sanayici_3b: {
    baslik: "A Patent Dispute",
    metin: "A factory owner claims part of your invention was his engineer's idea and demands a share. Court could cost time and money.",
    secenekler: [
      {
        metin: "Settle; give a small share.",
        basariliSonuc: {
          mesaj: "A small-share deal was struck; the invention kept in production.",
          detay: "Some disputes close for a small price.",
        },
        basarisizSonuc: {
          mesaj: "The owner didn't fully keep his word; production faltered.",
          detay: "Some deals stay on paper.",
        },
      },
      {
        metin: "Refuse; defend your right in court.",
        basariliSonuc: {
          mesaj: "The court ruled for you; the invention was credited wholly to your name.",
          detay: "Some rights are kept only by struggle.",
        },
        basarisizSonuc: {
          mesaj: "The court sided with the owner; you lost money and reputation.",
          detay: "Not every fight is won.",
        },
      },
    ],
  },

  // "Az olay var" turu Faz 6 (2026-09): second branch point for the Crusade's
  // escape/captivity branches and the Defense's resistance/captivity branches
  oc_hacli_kacis_2b: {
    baslik: "Hiding in a Hayloft",
    metin: "Patrols close in; ahead stands a farm hayloft. Hiding may save you, but the farmer could spot and report you.",
    secenekler: [
      {
        metin: "Hide in the hayloft; wait out the patrol.",
        basariliSonuc: {
          mesaj: "The patrol passed without noticing; you rested safely a few hours.",
          detay: "Some hideouts appear just in time.",
        },
        basarisizSonuc: {
          mesaj: "The farmer found you but showed mercy and stayed silent; you left uneasy.",
          detay: "Unshared secrets weigh too.",
        },
      },
      {
        metin: "Don't risk it; run across the open.",
        basariliSonuc: {
          mesaj: "You ran breathless across the open, but left the patrol behind.",
          detay: "Sometimes running saves you.",
        },
        basarisizSonuc: {
          mesaj: "The patrol spotted and chased you; you barely escaped, wounded.",
          detay: "Open ground is never safe.",
        },
      },
    ],
  },
  oc_hacli_kacis_3b: {
    baslik: "The Encounter at the Door",
    metin: "At your door, no one expected you; they thought you dead and mourned. Before knocking, you hear your family inside.",
    secenekler: [
      {
        metin: "Go in; face their shock.",
        basariliSonuc: {
          mesaj: "Shock first, then tearful embraces; you were truly home.",
          detay: "Some homecomings restart a life.",
        },
        basarisizSonuc: {
          mesaj: "The shock passed, but things weren't the same; you feel a stranger even at home.",
          detay: "Some absences leave a mark.",
        },
      },
      {
        metin: "Wait outside; prepare them first.",
        basariliSonuc: {
          mesaj: "You sent word through a neighbor first; your family greeted you prepared.",
          detay: "Even good news should come slowly.",
        },
        basarisizSonuc: {
          mesaj: "The message was misread and caused panic; everyone was still shaken when you entered.",
          detay: "Not every precaution works.",
        },
      },
    ],
  },
  oc_hacli_esaret_2b: {
    baslik: "The Clergyman in the Camp",
    metin: "An elderly clergyman, also a captive, secretly gathers a prayer circle at night. Joining lifts morale, but guards may call it 'plotting revolt'.",
    secenekler: [
      {
        metin: "Join the prayer circle; share hope.",
        basariliSonuc: {
          mesaj: "The secret circle gave you and the other captives hope; the guards noticed nothing.",
          detay: "Hope blossoms even behind walls.",
        },
        basarisizSonuc: {
          mesaj: "The circle was discovered and all were punished; still, you don't regret it.",
          detay: "Some hopes cost dearly.",
        },
      },
      {
        metin: "Stay away; don't risk it.",
        basariliSonuc: {
          mesaj: "You stayed quiet in your corner; safe, but your morale is low.",
          detay: "Safety sometimes comes with loneliness.",
        },
        basarisizSonuc: {
          mesaj: "Staying away isolated you in the other captives' eyes.",
          detay: "Every caution has a cost.",
        },
      },
    ],
  },
  oc_hacli_esaret_3b: {
    baslik: "Returning as a Changed Man",
    metin: "Back from captivity, your old friends barely recognize you: quieter, more guarded, different. Some ask about your old self.",
    secenekler: [
      {
        metin: "Admit you've changed; ask them to accept it.",
        basariliSonuc: {
          mesaj: "Your candor surprised your friends but earned respect; you were accepted as you are.",
          detay: "Some changes are understood with time.",
        },
        basarisizSonuc: {
          mesaj: "Some friends kept their distance from the new you; the old closeness never returned.",
          detay: "Not every change is welcomed.",
        },
      },
      {
        metin: "Try to act like your old self.",
        basariliSonuc: {
          mesaj: "You largely pulled off your old mannerisms; no one asked much.",
          detay: "Some masks work, for a while.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't keep the mask up; the change inside surfaced sooner or later.",
          detay: "You can't outrun yourself for long.",
        },
      },
    ],
  },
  yolculuk_savunma_direnis_2b: {
    baslik: "The Last Volley of Arrows",
    metin: "The archers' arrows are running out. Unload everything on the largest enemy group, or ration them to hold out?",
    secenekler: [
      {
        metin: "Unload all arrows on the largest group.",
        basariliSonuc: {
          mesaj: "The volley tore a huge gap in the enemy ranks; the breach held a while.",
          detay: "Some gambles pay off just in time.",
        },
        basarisizSonuc: {
          mesaj: "A counterattack came right as the arrows ran out; you barely fended it off.",
          detay: "Not every gamble pays off.",
        },
      },
      {
        metin: "Ration the arrows; strike small blows.",
        basariliSonuc: {
          mesaj: "Rationing kept the line standing a bit longer.",
          detay: "Patience works in this siege too.",
        },
        basarisizSonuc: {
          mesaj: "Rationing wasn't enough; the enemy advanced anyway.",
          detay: "Some tactics fall short.",
        },
      },
    ],
  },
  yolculuk_savunma_direnis_3b: {
    baslik: "The Medal Ceremony",
    metin: "The Sultan wants to honor you with a small ceremony for your resilience in the siege. But the spotlight also recalls the comrades you lost.",
    secenekler: [
      {
        metin: "Accept the ceremony; take the medal proudly.",
        basariliSonuc: {
          mesaj: "Your eyes welled up as the medal was pinned; pride and grief mixed.",
          detay: "Some honors come with pain.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't hold back your emotions; the hall watched in silence.",
          detay: "Memories return even at ceremonies.",
        },
      },
      {
        metin: "Politely decline; step back quietly.",
        basariliSonuc: {
          mesaj: "Your humility was quietly talked about among some soldiers.",
          detay: "Some honors are earned unaccepted.",
        },
        basarisizSonuc: {
          mesaj: "Some senior officers took your refusal as disrespect.",
          detay: "Humility isn't always understood.",
        },
      },
    ],
  },
  yolculuk_savunma_esaret_2b: {
    baslik: "Talking to an Enemy Captive",
    metin: "In camp, you share a tent with a Crusader soldier also taken captive. Despite the enmity, you both suffer the same pain.",
    secenekler: [
      {
        metin: "Talk to him; find shared humanity.",
        basariliSonuc: {
          mesaj: "You shared exhaustion more than enmity; an odd but real bond formed.",
          detay: "Friendship is born in odd places.",
        },
        basarisizSonuc: {
          mesaj: "The talk turned tense; old hostility got in the way.",
          detay: "Not every attempt at closeness works.",
        },
      },
      {
        metin: "Keep your distance; don't trust him.",
        basariliSonuc: {
          mesaj: "You kept your distance; neither friendship nor trouble came.",
          detay: "Some caution passes quietly.",
        },
        basarisizSonuc: {
          mesaj: "Your coldness strained the tent; the days felt heavier.",
          detay: "Every distance has a cost.",
        },
      },
    ],
  },
  yolculuk_savunma_esaret_3b: {
    baslik: "Return to the Garrison",
    metin: "Back at your garrison after captivity, someone else holds your post. As the commander seeks a new duty, he asks if you want the old post back.",
    secenekler: [
      {
        metin: "Ask for your old post; insist.",
        basariliSonuc: {
          mesaj: "Your insistence was accepted; you returned to your old post, with some tension.",
          detay: "Some rights must be reclaimed.",
        },
        basarisizSonuc: {
          mesaj: "Your insistence was refused; you started the new post resentful.",
          detay: "Not every insistence pays off.",
        },
      },
      {
        metin: "Accept a new duty; start over.",
        basariliSonuc: {
          mesaj: "You started the new duty open-minded; the garrison valued your flexibility.",
          detay: "Some fresh starts are well received.",
        },
        basarisizSonuc: {
          mesaj: "The new duty was harder than expected; settling in was rough.",
          detay: "Not every fresh start is easy.",
        },
      },
    ],
  },

  // "Az olay var" turu Faz 7 (2026-09): a third Crusade branch point
  oc_hacli_ganimet_yagma_b: {
    baslik: "The Captured Library",
    metin: "After the city falls, you see a monastery library must be saved from looting: its old manuscripts are valuable and fragile. Time is short.",
    secenekler: [
      {
        metin: "Save the manuscripts; give them to the church.",
        basariliSonuc: {
          mesaj: "You saved the library from fire and looting; the church long remembered your name.",
          detay: "Some victories are won with paper.",
        },
        basarisizSonuc: {
          mesaj: "Choking on smoke, you saved only a few volumes.",
          detay: "Some losses can't be undone.",
        },
      },
      {
        metin: "Keep the valuable volumes; sell them.",
        basariliSonuc: {
          mesaj: "You set aside the best volumes; selling them later filled your pocket.",
          detay: "You returned rich, but your conscience isn't clear.",
        },
        basarisizSonuc: {
          mesaj: "Most volumes you grabbed in haste were worthless, and guilt settled in.",
          detay: "You neither gained nor kept a clean conscience.",
        },
      },
    ],
  },
};
