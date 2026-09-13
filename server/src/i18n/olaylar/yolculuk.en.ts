import type { OlayCeviri } from "./index";

/**
 * yolculuk.ts — "Büyük yolculuk" zincirlerinin İngilizce çevirisi (87 olay).
 * Türkçe kaynak kanonik; yalnız gösterim metinleri burada.
 */
export const OLAYLAR_YOLCULUK_EN: Record<string, OlayCeviri> = {
  hac_sunni_karar: {
    baslik: "Intent for the Hajj",
    metin: "The vow money you have saved for years is finally enough. It may be time to set out on a Hajj pilgrimage to Mecca, to the Kaaba. A caravan leaves overland next month; a ship bound for Jeddah is also moored at the harbor.",
    secenekler: [
      {
        metin: "Join the caravan and set out overland toward Mecca.",
        ipucu: "The greatest journey of your life begins — the desert's harsh but familiar road",
        basariliSonuc: {
          mesaj: "You packed your things and said farewell to your congregation. The caravan left through the city gate at dawn.",
          detay: "This is no ordinary journey; it will be one of the turning points of your life.",
        },
        basarisizSonuc: {
          mesaj: "The preparations cost far more than you expected, but you set out with the caravan all the same.",
          detay: "Your purse grew lighter, but your intent is still rock solid.",
        },
      },
      {
        metin: "Board the ship to Jeddah and go by sea.",
        ipucu: "More expensive but faster — the Red Sea has dangers of its own",
        basariliSonuc: {
          mesaj: "You packed your things and said farewell to your congregation. The ship left the harbor at dawn.",
          detay: "Much faster than the caravan, but the sea has its own trials.",
        },
        basarisizSonuc: {
          mesaj: "Ticket prices rose at the last moment, but you boarded the ship anyway.",
          detay: "Your purse grew lighter, but your intent is still rock solid.",
        },
      },
      {
        metin: "Not this year; your congregation's needs come first.",
        ipucu: "Safe, but the longing inside you grows",
        basariliSonuc: {
          mesaj: "Your congregation met your delay with appreciation; you did not abandon them.",
          detay: "Maybe next year, you told yourself.",
        },
        basarisizSonuc: {
          mesaj: "As you watched the caravan's dust, a longing grew inside you.",
          detay: "Some vows are forced to wait their time.",
        },
      },
    ],
  },
  hac_sunni_yolda: {
    baslik: "The Desert's Trial",
    metin: "The caravan has pushed on for days under the scorching sun. A sandstorm rises on the horizon and the waterskins have grown worryingly light.",
    secenekler: [
      {
        metin: "Trust the caravan master's experience; hold tight and press on together.",
        ipucu: "An experienced guide lowers the risk, but the desert is merciless",
        basariliSonuc: {
          mesaj: "You weathered the storm together with the caravan; weary but safe and sound.",
          detay: "You passed the desert's trial. The holy city is no longer far.",
        },
        basarisizSonuc: {
          mesaj: "The storm scattered the caravan; you regrouped parched and exhausted.",
          detay: "Your body is worn out but your resolve still holds.",
        },
      },
      {
        metin: "Share your waterskin with an old, weary pilgrim.",
        ipucu: "Peace of conscience, but your own thirst grows",
        basariliSonuc: {
          mesaj: "You shared your water; the old pilgrim kissed your hand and prayed for you.",
          detay: "Your thirst grew, but your conscience had never been so light.",
        },
        basarisizSonuc: {
          mesaj: "The water you shared was not enough; both of you pressed on, worn down by thirst.",
          detay: "You paid for your kindness with your body, but you have no regrets.",
        },
      },
    ],
  },
  hac_sunni_varis: {
    baslik: "In the Presence of the Kaaba",
    metin: "The moment you first saw the Kaaba, all the weariness of months on the road melted away at once. Thousands of pilgrims around you share the same feeling.",
    secenekler: [
      {
        metin: "Complete the circumambulation patiently, with tears.",
        ipucu: "The most transformative moment of your life",
        basariliSonuc: {
          mesaj: "You circled the Kaaba seven times; you cannot put into words the peace inside you.",
          detay: "You are no longer merely a clergyman but a Hadji. In your congregation's eyes, this title will change you forever.",
        },
        basarisizSonuc: {
          mesaj: "Your head spun for a moment in the crowd, but the pilgrims beside you carried you to the end of the circuit.",
          detay: "Your body weakened but your worship was completed; you earned the title of Hadji.",
        },
      },
      {
        metin: "Pray quietly, a little apart from the crowd.",
        ipucu: "A calm, inward choice",
        basariliSonuc: {
          mesaj: "A little outside the crowd, in your own silence, you prayed; your peace was deep and personal.",
          detay: "You chose a worship free of show, but the Hajj is complete; you are now a Hadji.",
        },
        basarisizSonuc: {
          mesaj: "A little outside the crowd, in your own silence, you prayed; your peace was deep and personal.",
          detay: "You chose a worship free of show, but the Hajj is complete; you are now a Hadji.",
        },
      },
    ],
  },
  hac_katolik_karar: {
    baslik: "The Jerusalem Vow",
    metin: "You have carried a vow for years: to see the Holy Sepulchre, to see Jerusalem with your own eyes. A merchant ship is preparing to set sail for the holy lands; there is also a pilgrim caravan going overland.",
    secenekler: [
      {
        metin: "Board the ship and set sail for Jerusalem by sea.",
        ipucu: "The greatest journey of your life begins — fast, but with the risks of the sea",
        basariliSonuc: {
          mesaj: "You packed your things and said farewell to your congregation. The ship left the harbor at dawn.",
          detay: "This is no ordinary journey; it will be one of the turning points of your life.",
        },
        basarisizSonuc: {
          mesaj: "The preparations cost far more than you expected, but you set out by ship all the same.",
          detay: "Your purse grew lighter, but your intent is still rock solid.",
        },
      },
      {
        metin: "Join the caravan and go overland through the Balkans.",
        ipucu: "Cheaper but a much longer and wearier road",
        basariliSonuc: {
          mesaj: "You packed your things and said farewell to your congregation. The caravan left through the city gate at dawn.",
          detay: "Cheaper than a ship's ticket, but the road will take far longer.",
        },
        basarisizSonuc: {
          mesaj: "The preparations cost far more than you expected, but you set out with the caravan all the same.",
          detay: "Your purse grew lighter, but your intent is still rock solid.",
        },
      },
      {
        metin: "Not this year; your congregation's needs come first.",
        ipucu: "Safe, but the longing inside you grows",
        basariliSonuc: {
          mesaj: "Your congregation met your delay with appreciation; you did not abandon them.",
          detay: "Maybe next year, you told yourself.",
        },
        basarisizSonuc: {
          mesaj: "As you watched the ship depart, a longing grew inside you.",
          detay: "Some vows are forced to wait their time.",
        },
      },
    ],
  },
  hac_katolik_yolda: {
    baslik: "The Sea and Pirates",
    metin: "As you cross the Mediterranean a suspicious sail appears on the horizon; the captain whispers it may be a pirate ship. At the same time the sky has begun to darken.",
    secenekler: [
      {
        metin: "Trust the captain; face the storm and the danger together.",
        ipucu: "An experienced captain lowers the risk, but the sea is merciless",
        basariliSonuc: {
          mesaj: "You left the storm and the suspicious ship behind; weary but safe and sound.",
          detay: "You passed the sea's trial. The holy city is no longer far.",
        },
        basarisizSonuc: {
          mesaj: "The storm drove the ship off course; after days adrift you barely recovered.",
          detay: "Your body is worn out but your resolve still holds.",
        },
      },
      {
        metin: "Give your own medicine and provisions to a sick passenger.",
        ipucu: "Peace of conscience, but your own strength wanes",
        basariliSonuc: {
          mesaj: "You shared your medicine; the passenger recovered and prayed for you.",
          detay: "Your strength waned, but your conscience had never been so light.",
        },
        basarisizSonuc: {
          mesaj: "The help you gave was not enough; both of you carried on, weakened.",
          detay: "You paid for your kindness with your body, but you have no regrets.",
        },
      },
    ],
  },
  hac_katolik_varis: {
    baslik: "Before the Holy Sepulchre",
    metin: "When you reach Jerusalem your first stop is the Church of the Holy Sepulchre. All the weariness of months on the road melts away the moment you step through the door.",
    secenekler: [
      {
        metin: "Kneel and pray at length, with tears.",
        ipucu: "The most transformative moment of your life",
        basariliSonuc: {
          mesaj: "You knelt before the Holy Sepulchre; you cannot put into words the peace inside you.",
          detay: "You are no longer merely a clergyman but a Pilgrim of Jerusalem. In your congregation's eyes, this title will change you forever.",
        },
        basarisizSonuc: {
          mesaj: "Your head spun for a moment in the crowd, but the pilgrims beside you carried you to the service.",
          detay: "Your body weakened but your visit was completed; you earned the title of Pilgrim of Jerusalem.",
        },
      },
      {
        metin: "Pray quietly, a little apart from the crowd.",
        ipucu: "A calm, inward choice",
        basariliSonuc: {
          mesaj: "A little outside the crowd, in your own silence, you prayed; your peace was deep and personal.",
          detay: "You chose a worship free of show, but the visit is complete; you are now a Pilgrim of Jerusalem.",
        },
        basarisizSonuc: {
          mesaj: "A little outside the crowd, in your own silence, you prayed; your peace was deep and personal.",
          detay: "You chose a worship free of show, but the visit is complete; you are now a Pilgrim of Jerusalem.",
        },
      },
    ],
  },
  hac_ortodoks_karar: {
    baslik: "A Vow of Holy Pilgrimage",
    metin: "You have carried a vow for years: to see the Holy Sepulchre, to see Jerusalem with your own eyes. A group of pilgrims is gathering to travel to the holy lands along the caravan road; there is also a ship leaving from Constantinople.",
    secenekler: [
      {
        metin: "Join the group and set out overland toward Jerusalem.",
        ipucu: "The greatest journey of your life begins — a familiar but long overland road",
        basariliSonuc: {
          mesaj: "You packed your things and said farewell to your congregation. The caravan set out at dawn.",
          detay: "This is no ordinary journey; it will be one of the turning points of your life.",
        },
        basarisizSonuc: {
          mesaj: "The preparations cost far more than you expected, but you set out with the caravan all the same.",
          detay: "Your purse grew lighter, but your intent is still rock solid.",
        },
      },
      {
        metin: "Board the ship leaving Constantinople and go by sea.",
        ipucu: "Faster, but the Mediterranean has dangers of its own",
        basariliSonuc: {
          mesaj: "You packed your things and said farewell to your congregation. The ship left the Bosphorus at dawn.",
          detay: "Faster than the overland road, but the sea has its own trials.",
        },
        basarisizSonuc: {
          mesaj: "Ticket prices rose at the last moment, but you boarded the ship anyway.",
          detay: "Your purse grew lighter, but your intent is still rock solid.",
        },
      },
      {
        metin: "Not this year; your congregation's needs come first.",
        ipucu: "Safe, but the longing inside you grows",
        basariliSonuc: {
          mesaj: "Your congregation met your delay with appreciation; you did not abandon them.",
          detay: "Maybe next year, you told yourself.",
        },
        basarisizSonuc: {
          mesaj: "As you watched the caravan depart, a longing grew inside you.",
          detay: "Some vows are forced to wait their time.",
        },
      },
    ],
  },
  hac_ortodoks_yolda: {
    baslik: "Danger in the Mountain Pass",
    metin: "As the caravan passes through a narrow mountain pass a snowstorm sets in. A little ahead, the shadows of a band of brigands holding the pass can be made out.",
    secenekler: [
      {
        metin: "Move quietly along the hidden trail your guide knows.",
        ipucu: "An experienced guide lowers the risk, but the mountain is merciless",
        basariliSonuc: {
          mesaj: "You slipped past the brigands unseen along the hidden trail; weary but safe and sound.",
          detay: "You passed the mountain's trial. The holy city is no longer far.",
        },
        basarisizSonuc: {
          mesaj: "The snowstorm scattered the caravan; you regrouped frozen and exhausted.",
          detay: "Your body is worn out but your resolve still holds.",
        },
      },
      {
        metin: "Carry an old pilgrim who can no longer walk on your back.",
        ipucu: "Peace of conscience, but your own strength wanes",
        basariliSonuc: {
          mesaj: "You carried the old pilgrim on your back; at the end of the pass he prayed for you in tears.",
          detay: "Your strength waned, but your conscience had never been so light.",
        },
        basarisizSonuc: {
          mesaj: "Both of you collapsed exhausted under the weight you tried to carry, but you crossed the pass.",
          detay: "You paid for your kindness with your body, but you have no regrets.",
        },
      },
    ],
  },
  hac_ortodoks_varis: {
    baslik: "Kneeling at the Holy Sepulchre",
    metin: "When you reach Jerusalem your first stop is the Church of the Holy Sepulchre. All the weariness of months on the road melts away the moment you step through the door.",
    secenekler: [
      {
        metin: "Kneel and pray at length, with tears.",
        ipucu: "The most transformative moment of your life",
        basariliSonuc: {
          mesaj: "You knelt before the Holy Sepulchre; you cannot put into words the peace inside you.",
          detay: "You are no longer merely a clergyman but a Pilgrim of the Holy Land. In your congregation's eyes, this title will change you forever.",
        },
        basarisizSonuc: {
          mesaj: "Your head spun for a moment in the crowd, but the pilgrims beside you carried you to the service.",
          detay: "Your body weakened but your visit was completed; you earned the title of Pilgrim of the Holy Land.",
        },
      },
      {
        metin: "Pray quietly, a little apart from the crowd.",
        ipucu: "A calm, inward choice",
        basariliSonuc: {
          mesaj: "A little outside the crowd, in your own silence, you prayed; your peace was deep and personal.",
          detay: "You chose a worship free of show, but the visit is complete; you are now a Pilgrim of the Holy Land.",
        },
        basarisizSonuc: {
          mesaj: "A little outside the crowd, in your own silence, you prayed; your peace was deep and personal.",
          detay: "You chose a worship free of show, but the visit is complete; you are now a Pilgrim of the Holy Land.",
        },
      },
    ],
  },
  hac_anglikan_karar: {
    baslik: "Expedition to the Holy Land",
    metin: "A travel company is organizing a tour to Jerusalem: crossing the Mediterranean by steamship and visiting the holy sites. An overland route through Europe by train and horse-carriage is also just being introduced.",
    secenekler: [
      {
        metin: "Pay for the ticket and board the steamship.",
        ipucu: "The greatest journey of your life begins — fast, but with the risks of the sea",
        basariliSonuc: {
          mesaj: "You packed your things and said farewell to your congregation. The ship left the harbor.",
          detay: "This is no ordinary journey; it will be one of the turning points of your life.",
        },
        basarisizSonuc: {
          mesaj: "The preparations cost far more than you expected, but you boarded the ship all the same.",
          detay: "Your purse grew lighter, but your intent is still rock solid.",
        },
      },
      {
        metin: "Go overland through Europe on the new railway line.",
        ipucu: "Modern but a route not yet settled — it has its own disruptions",
        basariliSonuc: {
          mesaj: "You packed your things and said farewell to your congregation. The train left the station right on time.",
          detay: "The railway is an exciting novelty but has yet to prove its reliability.",
        },
        basarisizSonuc: {
          mesaj: "Ticket prices rose at the last moment, but you boarded the train anyway.",
          detay: "Your purse grew lighter, but your intent is still rock solid.",
        },
      },
      {
        metin: "Not this year; your congregation's needs come first.",
        ipucu: "Safe, but the longing inside you grows",
        basariliSonuc: {
          mesaj: "Your congregation met your delay with appreciation; you did not abandon them.",
          detay: "Maybe next year, you told yourself.",
        },
        basarisizSonuc: {
          mesaj: "As you watched the ship depart, a longing grew inside you.",
          detay: "Some vows are forced to wait their time.",
        },
      },
    ],
  },
  hac_anglikan_yolda: {
    baslik: "Quarantine Harbor",
    metin: "When the ship docks at an Ottoman port, suspicion of cholera spreads across the deck. Harbor officials say they may hold the ship in quarantine for days.",
    secenekler: [
      {
        metin: "Follow the rules and wait out the quarantine patiently.",
        ipucu: "A safe but wearying wait",
        basariliSonuc: {
          mesaj: "You endured the quarantine patiently; everyone continued the journey in good health.",
          detay: "You passed the trial of waiting. The holy city is no longer far.",
        },
        basarisizSonuc: {
          mesaj: "A few real cases did break out on board during the quarantine; you waited anxiously for days and weakened.",
          detay: "Your body is worn out but your resolve still holds.",
        },
      },
      {
        metin: "Give your own medicine and provisions to a sick passenger.",
        ipucu: "Peace of conscience, but your own strength wanes",
        basariliSonuc: {
          mesaj: "You shared your medicine; the passenger recovered and remained grateful to you.",
          detay: "Your strength waned, but your conscience had never been so light.",
        },
        basarisizSonuc: {
          mesaj: "The help you gave was not enough; both of you carried on, weakened.",
          detay: "You paid for your kindness with your body, but you have no regrets.",
        },
      },
    ],
  },
  hac_anglikan_varis: {
    baslik: "The View from the Mount of Olives",
    metin: "When you reach Jerusalem you climb the Mount of Olives and look down on the holy city from above. All the weariness of months on the road melts away before this view.",
    secenekler: [
      {
        metin: "Sit quietly and live the moment in long prayer and gratitude.",
        ipucu: "The most transformative moment of your life",
        basariliSonuc: {
          mesaj: "As you watched the sunset from the Mount of Olives, you cannot put into words the peace inside you.",
          detay: "You are no longer merely a clergyman but a Traveler of the Holy Land. In your congregation's eyes, this title will change you forever.",
        },
        basarisizSonuc: {
          mesaj: "Weariness overwhelmed you for a moment, but your travel companions supported you to the end of the visit.",
          detay: "Your body weakened but your visit was completed; you earned the title of Traveler of the Holy Land.",
        },
      },
      {
        metin: "Quietly write down what you see in your small notebook.",
        ipucu: "A calm, inward choice",
        basariliSonuc: {
          mesaj: "You quietly noted what you saw in your notebook; your peace was deep and personal.",
          detay: "You chose a worship free of show, but the visit is complete; you are now a Traveler of the Holy Land.",
        },
        basarisizSonuc: {
          mesaj: "You quietly noted what you saw in your notebook; your peace was deep and personal.",
          detay: "You chose a worship free of show, but the visit is complete; you are now a Traveler of the Holy Land.",
        },
      },
    ],
  },
  oc_hacli_sefer_karari: {
    baslik: "The Call of the Holy Lands",
    metin: "In the square a monk is calling for a campaign to take back the holy lands; the priests promise the forgiveness of sins, but many do not return from this road. The army will set out both overland and by sea aboard Venetian ships.",
    secenekler: [
      {
        metin: "Take up the cross and join the campaign overland.",
        ipucu: "A dangerous and long overland road that will change your life",
        basariliSonuc: {
          mesaj: "With the red cross sewn onto your robe, you looked one last time at the life you were leaving behind. The army took to the overland road at dawn.",
          detay: "You are a crusader now; the years ahead will be shaped by this decision.",
        },
        basarisizSonuc: {
          mesaj: "Though hesitation gnawed at you, in the end you took the cross; the equipment cost more than expected.",
          detay: "This journey, begun reluctantly, will weigh on you all the more.",
        },
      },
      {
        metin: "Take up the cross and join the campaign by sea on Venetian ships.",
        ipucu: "More expensive but away from the dangers of the overland road",
        basariliSonuc: {
          mesaj: "With the red cross sewn onto your robe, you looked one last time at the life you were leaving behind. The ship left the harbor at dawn.",
          detay: "You are a crusader now; the years ahead will be shaped by this decision.",
        },
        basarisizSonuc: {
          mesaj: "Though hesitation gnawed at you, in the end you took the cross; the Venetians demanded more gold for passage than expected.",
          detay: "This journey, begun reluctantly, will weigh on you all the more.",
        },
      },
      {
        metin: "Refuse and go on with your own life.",
        ipucu: "Safe, but some may judge you",
        basariliSonuc: {
          mesaj: "You turned the call away; you decided your life is here, on this land.",
          detay: "Not everyone thinks as you do, but your conscience is clear.",
        },
        basarisizSonuc: {
          mesaj: "In some circles your refusal was read as 'cowardice'.",
          detay: "Still, you stand by your own choice.",
        },
      },
    ],
  },
  oc_hacli_sefer_asker_cagrisi: {
    baslik: "You Have Been Mobilized",
    metin: "The commander assembled the regiment: your unit is marching to take back the holy lands, and you are not asked whether you will join but which column you will march with. The army will set out both overland and by sea aboard Venetian ships.",
    secenekler: [
      {
        metin: "Take your place in the main column going overland.",
        ipucu: "A long and grueling overland journey awaits you",
        basariliSonuc: {
          mesaj: "You gathered your equipment and took to the overland road with your unit at dawn. You did not even have time to say goodbye to your family.",
          detay: "To be a soldier is to march out without being asked.",
        },
        basarisizSonuc: {
          mesaj: "The equipment distribution was a mess and you had to make up the difference from your own purse; still, the column set out on time.",
          detay: "An order is an order, ready or not.",
        },
      },
      {
        metin: "Take your place in the sea column going on Venetian ships.",
        ipucu: "Away from the dangers of the overland road, but the sea carries its own risks",
        basariliSonuc: {
          mesaj: "You were put aboard ship; the harbor fell behind at dawn.",
          detay: "To be a soldier is to march out without being asked.",
        },
        basarisizSonuc: {
          mesaj: "The Venetians demanded more gold for passage than expected; still, the ship left on time.",
          detay: "An order is an order, ready or not.",
        },
      },
    ],
  },
  oc_hacli_kara_1: {
    baslik: "Ambush in the Mountain Pass",
    metin: "As the army advances through the mountain pass, word comes that the vanguard has been ambushed. Whether it is local brigands or the enemy's scouts is unclear.",
    secenekler: [
      {
        metin: "Rush to help the vanguard.",
        ipucu: "Great renown at stake but dangerous",
        basariliSonuc: {
          mesaj: "Your help broke the ambush; the vanguard counts you among their rescuers.",
          detay: "Your courage is being talked about throughout the army.",
        },
        basarisizSonuc: {
          mesaj: "The ambush prevailed, and you ended up among the wounded.",
          detay: "The passes of the mountain were never safe.",
        },
      },
      {
        metin: "Stay safe with the main army and leave the vanguard to its fate.",
        ipucu: "Safe but it weighs on your conscience",
        basariliSonuc: {
          mesaj: "You stayed safe; the vanguard saved itself at heavy cost.",
          detay: "You survived, but there is a shadow on your conscience.",
        },
        basarisizSonuc: {
          mesaj: "The vanguard was almost entirely wiped out; a wave of anger swept through the army.",
          detay: "Some decisions follow you for life.",
        },
      },
    ],
  },
  oc_hacli_yolculuk_zorlugu: {
    baslik: "On the Scorching Roads",
    metin: "The army is crossing a parched, scorching land. Provisions dwindle, sickness spreads; every day a few more soldiers are left behind.",
    secenekler: [
      {
        metin: "Grit your teeth and keep marching.",
        ipucu: "Risk of collapse, but you will not fall behind the army",
        basariliSonuc: {
          mesaj: "You marched exhausted but determined; the commanders noticed your endurance.",
          detay: "This journey both wore you down and hardened you.",
        },
        basarisizSonuc: {
          mesaj: "Thirst and heat laid you low; you lay in fever for days.",
          detay: "You are paying the price of this campaign with your body.",
        },
      },
      {
        metin: "Help those left behind and move slowly.",
        ipucu: "Safer but it slows you too",
        basariliSonuc: {
          mesaj: "You carried water to your fallen comrades and hauled them along; this solidarity made you well loved in the army.",
          detay: "The mercy you showed in hard days was not forgotten.",
        },
        basarisizSonuc: {
          mesaj: "While helping others you caught the sickness too.",
          detay: "Sometimes there is a price for doing good.",
        },
      },
    ],
  },
  oc_hacli_deniz_1: {
    baslik: "The Fleet in the Storm",
    metin: "The Venetian fleet was caught in a sudden storm in the Adriatic. Some ships are drifting off course; the captain shouts that you must hold tight formation.",
    secenekler: [
      {
        metin: "Obey orders and keep formation.",
        ipucu: "Safe, disciplined",
        basariliSonuc: {
          mesaj: "The fleet held its formation and you weathered the storm together.",
          detay: "Discipline saves lives at sea too.",
        },
        basarisizSonuc: {
          mesaj: "The storm drove your ship off course and you drifted lost for days.",
          detay: "The sea looks down even on an army.",
        },
      },
      {
        metin: "Try to calm the panicking soldiers.",
        ipucu: "Earns renown but risky",
        basariliSonuc: {
          mesaj: "Your calm bearing prevented panic; the commanders noticed you.",
          detay: "Leadership in a crisis is worth the renown won on the battlefield.",
        },
        basarisizSonuc: {
          mesaj: "You lost your balance on deck and were badly hurt.",
          detay: "Your courage cost you dearly this time.",
        },
      },
    ],
  },
  oc_hacli_deniz_2: {
    baslik: "The Venetian Moneylender's Offer",
    metin: "You put in at a Byzantine port for supplies. A Venetian merchant offers to 'secure' your remaining gold at an exorbitant rate of interest — supposedly against the risk of it being lost.",
    secenekler: [
      {
        metin: "Refuse the offer and carry your gold on you.",
        ipucu: "Safe, but the risk of carrying it is on you",
        basariliSonuc: {
          mesaj: "You turned the offer away; your gold is still on your own belt.",
          detay: "Some 'securities' are only someone else's profit.",
        },
        basarisizSonuc: {
          mesaj: "You fell victim to a small theft in the harbor.",
          detay: "The gold you carry is not always safe.",
        },
      },
      {
        metin: "Accept the offer and pass the risk to the moneylender.",
        ipucu: "Heavy interest but your risk of loss drops",
        basariliSonuc: {
          mesaj: "You paid the interest, but knowing your gold was safe put you at ease.",
          detay: "Some peace of mind comes at a heavy price.",
        },
        basarisizSonuc: {
          mesaj: "On the way back from the campaign the moneylender claimed he had 'gone bankrupt'; you never saw most of your gold again.",
          detay: "Some securities are really traps.",
        },
      },
    ],
  },
  oc_hacli_kutsal_topraklar_savasi: {
    baslik: "Before the Walls",
    metin: "The army launches an assault on a besieged fortress. The ladders are against the walls; the commander points out a spot for you too.",
    secenekler: [
      {
        metin: "Fight in the front rank and show your courage.",
        ipucu: "Great renown or a great wound",
        basariliSonuc: {
          mesaj: "You were one of the first to climb the walls; your name spread through the whole army.",
          detay: "This tale of your courage will be told for years.",
        },
        basarisizSonuc: {
          mesaj: "You were badly wounded under a rain of arrows; they pulled you back.",
          detay: "This siege cost you dearly.",
        },
      },
      {
        metin: "Stay back and support the archers.",
        ipucu: "Safer, less renown",
        basariliSonuc: {
          mesaj: "You did your duty quietly; the fortress finally fell.",
          detay: "Every victory is won not only by those out front but also by those who stand behind.",
        },
        basarisizSonuc: {
          mesaj: "A stone bounced off a catapult and grazed you.",
          detay: "Even standing back offers no safety in this war.",
        },
      },
    ],
  },
  oc_hacli_ganimet_yagma: {
    baslik: "The Spoils of the Fallen City",
    metin: "In the captured city the army has begun to plunder. Houses, temples, merchant shops all lie open before you; no one is stopping you.",
    secenekler: [
      {
        metin: "Join the plunder and take what you can.",
        ipucu: "Great gain, a heavy burden on the conscience",
        basariliSonuc: {
          mesaj: "You filled your arms full; but some screams will never leave your ears.",
          detay: "You returned rich but you no longer sleep as you used to.",
        },
        basarisizSonuc: {
          mesaj: "You managed to grab only a little, and on top of that guilt gripped you.",
          detay: "You neither gained nor kept your conscience.",
        },
      },
      {
        metin: "Stay out of it and only pray.",
        ipucu: "Clear conscience, empty pockets",
        basariliSonuc: {
          mesaj: "You did not join the plunder; all you could do was pray for what was happening around you.",
          detay: "Even in this war you managed to keep your hands clean.",
        },
        basarisizSonuc: {
          mesaj: "Merely watching the savagery around you shook you to the core.",
          detay: "Some things carry a price just to witness.",
        },
      },
    ],
  },
  oc_hacli_ordu_dagiliyor: {
    baslik: "The Army's Collapse",
    metin: "An unexpected enemy counterattack tore the army apart. The chain of command collapsed; everyone is fending for themselves. Around you are comrades either fleeing or laying down their weapons and surrendering — it is your turn.",
    secenekler: [
      {
        metin: "Run! Use the cover of night and slip away.",
        ipucu: "You keep your freedom but there is a risk of being pursued",
        basariliSonuc: {
          mesaj: "You melted into the darkness and got clear of the front; your heart is pounding.",
          detay: "Now your only aim is to survive.",
        },
        basarisizSonuc: {
          mesaj: "An enemy patrol spotted you as you fled, but you barely slipped away in the dark.",
          detay: "Your escape was hard from the very start.",
        },
      },
      {
        metin: "Surrender and lay down your weapon.",
        ipucu: "A safer first moment, but a life of captivity awaits you",
        basariliSonuc: {
          mesaj: "You threw down your weapon and raised your hands; enemy soldiers took you prisoner.",
          detay: "You are alive but you are no longer free.",
        },
        basarisizSonuc: {
          mesaj: "A soldier beat you as you surrendered, but in the end you were taken prisoner.",
          detay: "Even surrender was not without a price.",
        },
      },
    ],
  },
  oc_hacli_kacis_1: {
    baslik: "Under Pursuit",
    metin: "Enemy cavalry are hunting down deserters. You have to walk by night and hide by day; your provisions are nearly gone.",
    secenekler: [
      {
        metin: "Take a risk and ask a village for food.",
        ipucu: "You may gain provisions but there is a risk of being given away",
        basariliSonuc: {
          mesaj: "A merciful villager gave you bread and cheese and swore not to tell anyone.",
          detay: "Some strangers risk danger to help.",
        },
        basarisizSonuc: {
          mesaj: "The villagers took you for an enemy soldier and chased you off; you fled hungry and wounded.",
          detay: "Not every stranger is a friend.",
        },
      },
      {
        metin: "Show yourself to no one; live off the land and keep going.",
        ipucu: "Safer but your body wears down",
        basariliSonuc: {
          mesaj: "You got by on wild herbs and stream water; you weakened but showed yourself to no one.",
          detay: "Survival sometimes comes with very little.",
        },
        basarisizSonuc: {
          mesaj: "You ate a poisonous plant and wrestled with your stomach for days.",
          detay: "Nature is sometimes crueler than the enemy.",
        },
      },
    ],
  },
  oc_hacli_kacis_2: {
    baslik: "An Abandoned Monastery",
    metin: "You took shelter in an abandoned monastery to hide. Inside are a few other crusaders on the run like you; they are arguing whether to move together or whether a group draws attention.",
    secenekler: [
      {
        metin: "Band together with them; seek safety in numbers.",
        ipucu: "Stronger together but more easily noticed",
        basariliSonuc: {
          mesaj: "Moving together raised your spirits; you supported one another.",
          detay: "You are not alone anymore.",
        },
        basarisizSonuc: {
          mesaj: "Your large group caught a patrol's attention and you had to scatter in a skirmish.",
          detay: "Numbers sometimes mean danger, not safety.",
        },
      },
      {
        metin: "Carry on alone; spread the risk.",
        ipucu: "Quieter but alone",
        basariliSonuc: {
          mesaj: "You carried on alone; the loneliness was heavy but you left no trace.",
          detay: "Sometimes the safest thing is to trust no one.",
        },
        basarisizSonuc: {
          mesaj: "The solitude dragged you toward despair; you pressed on weak and irresolute.",
          detay: "A lone escape wears down the spirit too.",
        },
      },
    ],
  },
  oc_hacli_kacis_3: {
    baslik: "Reaching the Border",
    metin: "After weeks of flight you reached friendly land. The soldiers at the border post are questioning you; you have to prove your story is true.",
    secenekler: [
      {
        metin: "Tell the truth; say openly what became of the army.",
        ipucu: "Honest but a shameful confession",
        basariliSonuc: {
          mesaj: "The soldiers who heard your story pitied you; you are grateful to have returned home alive.",
          detay: "You lost honor but you are alive, and that too counts as a victory.",
        },
        basarisizSonuc: {
          mesaj: "Some soldiers sneered at you as a 'deserter', but it did not stop them from letting you in.",
          detay: "You came home, but this return was not met with applause.",
        },
      },
      {
        metin: "Embellish your story; tell it as a heroic escape.",
        ipucu: "It protects your pride, but if the lie comes out your reputation is battered further",
        basariliSonuc: {
          mesaj: "The story you told spread quickly through the town; you were spoken of as a 'heroic escape'.",
          detay: "The truth was a little different, but no one will ever learn it — you hope.",
        },
        basarisizSonuc: {
          mesaj: "The inconsistencies in your story were noticed; the 'liar' brand weighed heavier than any battle you lost.",
          detay: "You came home, but your reputation is more damaged than it has ever been.",
        },
      },
    ],
  },
  oc_hacli_esaret_1: {
    baslik: "Conditions of Captivity",
    metin: "Conditions in the prison camp are merciless: little food, hard labor, constant humiliation. One of the guards hints that if you do extra work he will treat you a little better.",
    secenekler: [
      {
        metin: "Accept the extra work and get in the guard's good graces.",
        ipucu: "Your conditions improve but the other prisoners may shun you",
        basariliSonuc: {
          mesaj: "The guard gave you a little more bread; but the other prisoners eye you as a 'collaborator'.",
          detay: "The price of survival is sometimes loneliness.",
        },
        basarisizSonuc: {
          mesaj: "The extra work wore your body down further and you got nothing in return.",
          detay: "Some promises are not kept.",
        },
      },
      {
        metin: "Stay in solidarity with the other prisoners.",
        ipucu: "Solidarity gives strength but conditions stay harsh",
        basariliSonuc: {
          mesaj: "You shared your provisions and your hope with the other prisoners; enduring together kept you strong.",
          detay: "In hard days, solidarity is more filling than bread.",
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
    metin: "Word reached you that your family may be able to pay a ransom; but gathering it could take months. That same night, at the changing of the watch, you also spotted a chance to escape.",
    secenekler: [
      {
        metin: "Send word of the ransom and wait patiently.",
        ipucu: "Safe but expensive and long",
        basariliSonuc: {
          mesaj: "Months later the ransom arrived; the guards set you free.",
          detay: "Your freedom had a price, and your family paid it.",
        },
        basarisizSonuc: {
          mesaj: "The ransom negotiations dragged on, and in that time conditions grew far harsher.",
          detay: "Some waits are paid for with your body.",
        },
      },
      {
        metin: "Seize the chance at the changing of the watch and try to escape.",
        ipucu: "Free but a heavy price if caught",
        basariliSonuc: {
          mesaj: "Leaping from shadow to shadow in the dark, you managed to escape the camp!",
          detay: "Your heart is still pounding but you are free.",
        },
        basarisizSonuc: {
          mesaj: "Your escape attempt was noticed and you were given a severe punishment.",
          detay: "Some chances are not as open as they look.",
        },
      },
    ],
  },
  oc_hacli_esaret_3: {
    baslik: "Homecoming",
    metin: "Years later, after captivity or escape, you finally reached your home, your own land. As you walk through your door the familiar faces struggle to recognize you — only now do you understand how much you have changed.",
    secenekler: [
      {
        metin: "Tell what you went through as it was; face the past.",
        ipucu: "A hard but healing honesty",
        basariliSonuc: {
          mesaj: "As you told it your burden grew lighter; though your family listened in horror, they held you closer than ever.",
          detay: "Some wounds only heal once they are put into words.",
        },
        basarisizSonuc: {
          mesaj: "Telling it was not as easy as you thought; some nights you still wake up in that prison camp.",
          detay: "You came home, but some journeys never end.",
        },
      },
      {
        metin: "Leave the past behind; never speak of it.",
        ipucu: "It looks easy but you bottle it up",
        basariliSonuc: {
          mesaj: "You quietly returned to your old life; no one asked, and you did not tell.",
          detay: "Some silences are a shield.",
        },
        basarisizSonuc: {
          mesaj: "It grew inside your silence; at night you still wake from the nightmare of those days.",
          detay: "Pain left unspoken sometimes takes deeper root.",
        },
      },
    ],
  },
  oc_hacli_geride_kalanlar: {
    baslik: "The Life of Those Left Behind",
    metin: "The families of those who went on the campaign are struggling, with no one left to plow their fields or run their businesses. It is within your power to help them.",
    secenekler: [
      {
        metin: "Help your neighbors with their work.",
        ipucu: "A little effort, great gratitude",
        basariliSonuc: {
          mesaj: "You plowed the fields of those who went and watched over their children; the village is grateful to you.",
          detay: "Even without being at the front, you were of use somehow.",
        },
        basarisizSonuc: {
          mesaj: "You did what you could but could not keep up alone.",
          detay: "Good intentions are not always enough.",
        },
      },
      {
        metin: "Focus on your own affairs; stay out of it.",
        ipucu: "Safe, selfish",
        basariliSonuc: {
          mesaj: "You focused on your own affairs; in a time when everyone was busy with their own troubles, you came out ahead.",
          detay: "Your conscience stung a little but your pocket filled up.",
        },
        basarisizSonuc: {
          mesaj: "When it became clear you did not help, some of your neighbors drew away from you.",
          detay: "You pay for some choices with your reputation.",
        },
      },
    ],
  },
  oc_hacli_korkak_damgasi: {
    baslik: "Whispers",
    metin: "A few who did not join the campaign are called 'cowards'; your name has begun to come up among these whispers too.",
    secenekler: [
      {
        metin: "Push back; stand behind your decision.",
        ipucu: "A brave stance, but you may not convince everyone",
        basariliSonuc: {
          mesaj: "You explained the reasons for your decision openly; some found you in the right.",
          detay: "Raising your voice is sometimes stronger than staying silent.",
        },
        basarisizSonuc: {
          mesaj: "Your defense convinced no one; the whispers continued.",
          detay: "Some prejudices are not broken with words.",
        },
      },
      {
        metin: "Ignore it; let time pass.",
        ipucu: "Safe, requires patience",
        basariliSonuc: {
          mesaj: "You paid no mind to the whispers; in time another rumor took the spotlight.",
          detay: "Every storm dies down.",
        },
        basarisizSonuc: {
          mesaj: "Though you tried not to care, the words worked their way inside you.",
          detay: "Some silences exact a price.",
        },
      },
    ],
  },
  sd_somurge_gitme_karari: {
    baslik: "An Overseas Opportunity",
    metin: "A company is looking for volunteers to work in the colonies; the promised earnings are high. The company wants diplomats to build trade networks by agreement with the local people, while the army wants soldiers to 'secure' the territory.",
    secenekler: [
      {
        metin: "Go for diplomacy and trade; make agreements with the locals.",
        ipucu: "Slower earnings but a lighter moral burden",
        basariliSonuc: {
          mesaj: "You packed your things and boarded the ship at the harbor; you left your country behind.",
          detay: "You do not know what lies ahead, but there is no turning back now.",
        },
        basarisizSonuc: {
          mesaj: "The voyage was stormy and hard; you were worn down before you even arrived.",
          detay: "This venture weighed on you before it began.",
        },
      },
      {
        metin: "Go by military force; conquer the territory.",
        ipucu: "Greater earning potential but a far heavier moral price",
        basariliSonuc: {
          mesaj: "You buckled on your weapon and boarded the ship with your unit; you left your country behind.",
          detay: "You do not know what lies ahead, but there is no turning back now.",
        },
        basarisizSonuc: {
          mesaj: "The voyage was stormy and hard; you were worn down before you even arrived.",
          detay: "This venture weighed on you before it began.",
        },
      },
      {
        metin: "Choose to stay; build your life in your own country.",
        ipucu: "Safe, the opportunity slips away",
        basariliSonuc: {
          mesaj: "You turned the offer away; you preferred to stay on your own land.",
          detay: "Throwing yourself into an unknown life is not for everyone.",
        },
        basarisizSonuc: {
          mesaj: "As the ship left the harbor you felt a faint regret inside.",
          detay: "Some decisions keep a person thinking for a long time.",
        },
      },
    ],
  },
  sd_somurge_diplomasi_1: {
    baslik: "First Contact with the Local Leader",
    metin: "Your first meeting with the region's local leader was arranged. Your gifts are modest but your intent is sincere; the leader studies you carefully.",
    secenekler: [
      {
        metin: "Propose a balanced agreement based on mutual respect.",
        ipucu: "Builds trust in the long run",
        basariliSonuc: {
          mesaj: "The leader found your offer fair; a bridge of trust was built between you.",
          detay: "Partnerships that begin balanced last longer.",
        },
        basarisizSonuc: {
          mesaj: "The leader was cautious; the agreement was harder to reach.",
          detay: "Trust is not built in a day.",
        },
      },
      {
        metin: "Offer harsh terms that put the company's interest first.",
        ipucu: "Advantageous in the short run but it has a moral price",
        basariliSonuc: {
          mesaj: "The leader accepted the terms but you noticed the distrust in his eyes.",
          detay: "You won, but you know how you won.",
        },
        basarisizSonuc: {
          mesaj: "The leader rejected the harsh terms; the meeting ended coldly.",
          detay: "Greed sometimes overturns the table.",
        },
      },
    ],
  },
  sd_somurge_diplomasi_2: {
    baslik: "The Fine Print of the Trade Agreement",
    metin: "The company's head office added small but heavy clauses against the locals to the agreement without your knowledge. You noticed them before signing.",
    secenekler: [
      {
        metin: "Get it signed without them noticing the clauses; please the company.",
        ipucu: "Your career is safe, your conscience is stained",
        basariliSonuc: {
          mesaj: "The agreement was signed; the head office rewarded you but something inside you is uneasy.",
          detay: "Some signatures stay on the conscience for years.",
        },
        basarisizSonuc: {
          mesaj: "The local clerk noticed the clauses; trust was badly shaken.",
          detay: "Hidden clauses come out sooner or later.",
        },
      },
      {
        metin: "State the clauses openly; propose a fair version.",
        ipucu: "Your conscience stays clear but the company may punish you",
        basariliSonuc: {
          mesaj: "You proposed the fair version; the leader remained grateful and your trust was strengthened.",
          detay: "Honesty is sometimes the best trade strategy.",
        },
        basarisizSonuc: {
          mesaj: "The head office was furious at your decision; you lost part of your bonuses.",
          detay: "Doing the right thing had a price.",
        },
      },
    ],
  },
  sd_somurge_askeri_1: {
    baslik: "Establishing the Garrison",
    metin: "The unit was ordered to establish a garrison on the coast. Part of the local villagers' land is also needed for the construction.",
    secenekler: [
      {
        metin: "Pay the villagers a fair price and buy their land.",
        ipucu: "Costlier but a lighter moral burden",
        basariliSonuc: {
          mesaj: "You paid the villagers fairly; the garrison was established peacefully.",
          detay: "Some beginnings are more solid with justice.",
        },
        basarisizSonuc: {
          mesaj: "Despite the payment some villagers did not want to leave their land, and tension persisted.",
          detay: "Money does not always win hearts.",
        },
      },
      {
        metin: "Seize the land by force; speed up the work.",
        ipucu: "Fast and free but a heavy moral price",
        basariliSonuc: {
          mesaj: "The garrison went up quickly; you ignored the villagers' angry stares.",
          detay: "You gained speed, you lost trust.",
        },
        basarisizSonuc: {
          mesaj: "The seizure attempt turned into a small skirmish; a few soldiers were wounded.",
          detay: "Everything taken by force has a price.",
        },
      },
    ],
  },
  sd_somurge_askeri_2: {
    baslik: "Native Resistance",
    metin: "A group of local people, enraged by the garrison, took up armed resistance. Your commander wants your advice: should he sit down to negotiate, or crush the resistance by force?",
    secenekler: [
      {
        metin: "Propose negotiation; try to prevent a clash.",
        ipucu: "It could be solved without bloodshed but it is not guaranteed",
        basariliSonuc: {
          mesaj: "A negotiating table was set up; the sides reached a ceasefire, tense as it was.",
          detay: "Some victories are won unarmed.",
        },
        basarisizSonuc: {
          mesaj: "You fell into an ambush during the negotiation attempt and barely got away.",
          detay: "Good intentions are not always answered in kind.",
        },
      },
      {
        metin: "Crush the resistance by force.",
        ipucu: "A quick result but a heavy moral price",
        basariliSonuc: {
          mesaj: "The resistance was crushed quickly; your superiors rewarded you but you did not sleep at all that night.",
          detay: "The sound of some victories never falls silent.",
        },
        basarisizSonuc: {
          mesaj: "The resistance proved stronger than expected; the clash dragged on and you were badly wounded.",
          detay: "Force does not always give a quick result.",
        },
      },
    ],
  },
  sd_somurge_ahlaki_ikilem: {
    baslik: "The Order Given",
    metin: "They ordered a cruel measure against the native workers; if you object you could lose your job, if you carry it out you will grow rich but your conscience will not leave you in peace.",
    secenekler: [
      {
        metin: "Carry out the order; think of your earnings.",
        ipucu: "Great gain, a heavy burden on the conscience",
        basariliSonuc: {
          mesaj: "You carried out the order; the company rewarded you but something inside you changed forever.",
          detay: "You grew rich but looking in the mirror is getting harder.",
        },
        basarisizSonuc: {
          mesaj: "You carried out the order but things did not go as planned; your conscience was stained all the same.",
          detay: "You neither fully gained nor kept your conscience.",
        },
      },
      {
        metin: "Object; refuse the order.",
        ipucu: "Your conscience stays clear but you could lose your job",
        basariliSonuc: {
          mesaj: "Your objection was heard; some managers admired you and you kept your job.",
          detay: "Listening to the voice of your conscience sometimes works out too.",
        },
        basarisizSonuc: {
          mesaj: "You were dismissed from your job but your conscience stayed spotless.",
          detay: "Doing the right thing had a price, but you have no regrets.",
        },
      },
    ],
  },
  sd_somurge_tropik_hastalik: {
    baslik: "An Unknown Fever",
    metin: "An illness you are not used to laid you low; a local healer suggests a strange mixture of herbs, but the colonial doctor also wants to do what he can.",
    secenekler: [
      {
        metin: "Trust the local healer.",
        ipucu: "Unknown, but sometimes more effective than colonial medicine",
        basariliSonuc: {
          mesaj: "The local knowledge worked; you were back on your feet within a few days.",
          detay: "This land holds its own wisdom, it seems.",
        },
        basarisizSonuc: {
          mesaj: "The mixture did not work; your condition worsened.",
          detay: "Not every cure suits every patient.",
        },
      },
      {
        metin: "Go to the colonial doctor.",
        ipucu: "More familiar but limited means",
        basariliSonuc: {
          mesaj: "The doctor's treatment was slow but effective; you recovered.",
          detay: "Familiar methods sometimes give confidence.",
        },
        basarisizSonuc: {
          mesaj: "The doctor's means fell short here.",
          detay: "Falling ill in these lands is a great risk.",
        },
      },
    ],
  },
  sd_somurge_donus: {
    baslik: "Return to the Country",
    metin: "Your term of service in the colony has ended. With what you gained (or lost), you return to your country a changed person.",
    secenekler: [
      {
        metin: "Tell what you went through as it was, the good and the bad.",
        ipucu: "Honest but a hard reckoning",
        basariliSonuc: {
          mesaj: "As you told it your burden grew lighter; listeners were sometimes horrified, sometimes captivated.",
          detay: "Some truths only lighten once they are shared.",
        },
        basarisizSonuc: {
          mesaj: "Telling it was not as easy as you thought; some memories still trouble you.",
          detay: "You came home, but some journeys never end.",
        },
      },
      {
        metin: "Tell only the success stories; keep the rest hidden.",
        ipucu: "It protects your pride but it weighs on your conscience",
        basariliSonuc: {
          mesaj: "Your polished story spread quickly through the neighborhood; you were spoken of as a 'successful colonial man'.",
          detay: "The truth was a little different, but no one knows it.",
        },
        basarisizSonuc: {
          mesaj: "The mismatch between your words and your behavior was noticed; a few people began to keep their distance.",
          detay: "Some secrets are not kept as well as you think.",
        },
      },
    ],
  },
  sd_somurge_evde_kalanlar: {
    baslik: "Overseas Letters",
    metin: "The letters from those who went to the colonies tell sometimes of wealth, sometimes of bitter stories. You go on building your own life.",
    secenekler: [
      {
        metin: "Focus on growing your own business.",
        ipucu: "A steady, patient path",
        basariliSonuc: {
          mesaj: "You grew your own business patiently; even without risk, your earnings are steady.",
          detay: "Not everyone has to cross an ocean.",
        },
        basarisizSonuc: {
          mesaj: "Things did not go as you hoped, but at least you are safe.",
          detay: "Stability is a kind of gain too.",
        },
      },
      {
        metin: "Read the letters and daydream.",
        ipucu: "Safe, a wistful satisfaction",
        basariliSonuc: {
          mesaj: "Reading the tales of far lands became a small escape for you.",
          detay: "Sometimes it is enough just to imagine.",
        },
        basarisizSonuc: {
          mesaj: "The letters only made you dwell more on the opportunity you missed.",
          detay: "Some curiosities never pass.",
        },
      },
    ],
  },
  hac_sunni_kara_2: {
    baslik: "Oasis Halt",
    metin: "For the first time in days the caravan reached green: a small oasis. The Bedouins who live here demand a 'hospitality tax' for the right of passage; they say that if you do not pay, they will not let you draw water from the well.",
    secenekler: [
      {
        metin: "Pay the fee demanded and secure the water.",
        ipucu: "A small expense, guaranteed water",
        basariliSonuc: {
          mesaj: "You paid the fee; the caravan filled its vessels to overflowing and continued the road refreshed.",
          detay: "In the desert, water is worth more than gold.",
        },
        basarisizSonuc: {
          mesaj: "You paid the fee but the well was nearly dry; little water fell to your share.",
          detay: "Some oases are not as generous as you hope.",
        },
      },
      {
        metin: "Haggle; try to bring the fee down.",
        ipucu: "Risky but if you succeed it is nearly free",
        basariliSonuc: {
          mesaj: "Your persistent haggling worked; you got your water for far less.",
          detay: "The caravan master admired your skill.",
        },
        basarisizSonuc: {
          mesaj: "The haggling turned tense; the Bedouins angrily closed the well, and you had to continue the road parched.",
          detay: "Some bargains backfire.",
        },
      },
    ],
  },
  hac_sunni_kara_3: {
    baslik: "The Last Stage",
    metin: "A few days' distance from Mecca, on the road, you came upon a small group of pilgrims worn out, their water and food gone. The caravan master wants to press on without losing time.",
    secenekler: [
      {
        metin: "Stop the caravan and help them.",
        ipucu: "Peace of conscience, a small delay",
        basariliSonuc: {
          mesaj: "You shared your provisions; the pilgrims, weeping with gratitude, continued the road with you.",
          detay: "This kindness will make your arrival all the more meaningful.",
        },
        basarisizSonuc: {
          mesaj: "While helping them your own provisions dwindled too; everyone pressed on a little hungrier, a little thirstier.",
          detay: "You paid for your kindness with your body.",
        },
      },
      {
        metin: "Obey the caravan master and continue the road.",
        ipucu: "Fast but it weighs on your conscience",
        basariliSonuc: {
          mesaj: "The caravan pressed on without stopping; the looks you left behind are still on your mind.",
          detay: "You arrived on time but a shadow remained on your conscience.",
        },
        basarisizSonuc: {
          mesaj: "You continued the road but those pilgrims' cries did not leave your ears for a long time.",
          detay: "Some memories will not let you go.",
        },
      },
    ],
  },
  hac_sunni_deniz_1: {
    baslik: "Storm on the Red Sea",
    metin: "The ship bound for Jeddah was caught in a sudden storm in the middle of the Red Sea. Waves pound the deck; the captain orders everyone below into the hold.",
    secenekler: [
      {
        metin: "Obey the order and take shelter in the hold.",
        ipucu: "Safe but cramped",
        basariliSonuc: {
          mesaj: "Cramped but safe, you waited in the hold and rode out the storm.",
          detay: "You passed the sea's trial.",
        },
        basarisizSonuc: {
          mesaj: "The ship pitched violently; there were injuries in the hold.",
          detay: "The storm was merciless.",
        },
      },
      {
        metin: "Stay on deck and help the frightened passengers.",
        ipucu: "Brave but dangerous",
        basariliSonuc: {
          mesaj: "You calmed the panicking passengers and got them down into the hold; the captain admired your courage.",
          detay: "Sharing fear lightens it.",
        },
        basarisizSonuc: {
          mesaj: "A wave threw you down from the deck and you were badly hurt.",
          detay: "Your courage cost you dearly this time.",
        },
      },
    ],
  },
  hac_sunni_deniz_2: {
    baslik: "Fear of Plague on Board",
    metin: "One of the passengers took to bed in a fever; the captain whispers 'it may be plague', and some passengers suggest throwing the sick man into the sea.",
    secenekler: [
      {
        metin: "Protect the sick man; isolate him and take on his care.",
        ipucu: "Merciful but risky",
        basariliSonuc: {
          mesaj: "You isolated the sick passenger and tended him yourself; a few days later his fever broke — it was not plague.",
          detay: "Your mercy proved stronger than the crowd's panic.",
        },
        basarisizSonuc: {
          mesaj: "While tending him you fell ill too; luckily it was a simple fever, and you both recovered.",
          detay: "You took the risk but it ended well.",
        },
      },
      {
        metin: "Stay silent; do not get involved.",
        ipucu: "Safe but it may weigh on your conscience",
        basariliSonuc: {
          mesaj: "You did not get involved; the sick man recovered on his own a few days later.",
          detay: "Sometimes standing by is a choice too.",
        },
        basarisizSonuc: {
          mesaj: "The crowd really did throw the sick man into the sea; your silence did not stop it, and your conscience is not at ease.",
          detay: "Some silences are complicity in a crime.",
        },
      },
    ],
  },
  hac_sunni_deniz_3: {
    baslik: "Jeddah Harbor",
    metin: "The ship finally docked at Jeddah Harbor. Customs officers question everyone one by one; from some passengers they demand an 'extra levy'.",
    secenekler: [
      {
        metin: "Pay the levy demanded quietly.",
        ipucu: "A small expense, a trouble-free passage",
        basariliSonuc: {
          mesaj: "You paid the levy and passed customs without trouble.",
          detay: "Some roads open with money.",
        },
        basarisizSonuc: {
          mesaj: "The officer demanded more than expected but in the end let you pass.",
          detay: "Not every bargain ends as you hope.",
        },
      },
      {
        metin: "Say the levy is unjust and object.",
        ipucu: "Risky but it could be free",
        basariliSonuc: {
          mesaj: "A senior officer found your objection justified and let you pass without the levy.",
          detay: "Sometimes raising your voice works.",
        },
        basarisizSonuc: {
          mesaj: "Your objection was not welcomed; they held you a while and took more money.",
          detay: "Arguing with bureaucracy is risky.",
        },
      },
    ],
  },
  hac_katolik_deniz_2: {
    baslik: "Repairs on the Island of Rhodes",
    metin: "The ship, damaged by the storm, put in at Rhodes for repairs. The captain says the work will take a long time and that anyone who wishes may see the island in the meantime.",
    secenekler: [
      {
        metin: "See the island; visit the Hospital of the Knights.",
        ipucu: "Enriching but the harbor has its dangers",
        basariliSonuc: {
          mesaj: "You wandered the ancient corridors of the Knights Hospitaller; your spirit was refreshed.",
          detay: "An unexpected halt added an unexpected richness.",
        },
        basarisizSonuc: {
          mesaj: "While wandering, a swindler tricked you and lightened your purse.",
          detay: "Every harbor carries its own dangers.",
        },
      },
      {
        metin: "Stay on the ship; rest and pray.",
        ipucu: "Safe, dull",
        basariliSonuc: {
          mesaj: "You rested quietly; you prepared yourself stronger for the rest of the journey.",
          detay: "Sometimes the best thing is to do nothing.",
        },
        basarisizSonuc: {
          mesaj: "You wanted to rest but the noise of the repairs on the ship never stopped.",
          detay: "Peace sometimes cannot be found.",
        },
      },
    ],
  },
  hac_katolik_deniz_3: {
    baslik: "Putting In at Jaffa Harbor",
    metin: "As the ship approaches Jaffa Harbor, it is said there are dangerous reefs in the shallow water. The captain asks your opinion too on whether to take a risky shortcut or the safe but long route.",
    secenekler: [
      {
        metin: "Propose the risky shortcut; save time.",
        ipucu: "Saves time but dangerous",
        basariliSonuc: {
          mesaj: "The captain maneuvered skillfully, skirting the reefs, and you reached the harbor on time.",
          detay: "The risk paid off this time.",
        },
        basarisizSonuc: {
          mesaj: "The ship scraped a reef and started taking on water; you reached the harbor, though only with difficulty.",
          detay: "The shortcut cost dearly.",
        },
      },
      {
        metin: "Propose the safe, long route.",
        ipucu: "Safe but slow",
        basariliSonuc: {
          mesaj: "By the long but safe route you reached the harbor calmly.",
          detay: "Patience is most often the best guide.",
        },
        basarisizSonuc: {
          mesaj: "The long route took even longer than expected; everyone's patience was near its end.",
          detay: "Safety is sometimes dull.",
        },
      },
    ],
  },
  hac_katolik_kara_1: {
    baslik: "The Alpine Passes",
    metin: "The caravan is trying to cross the snowy Alpine passes. The guide says the pass carries an avalanche risk this season, but that waiting will also cost weeks.",
    secenekler: [
      {
        metin: "Take the risk and cross the pass at once.",
        ipucu: "Fast but there is an avalanche risk",
        basariliSonuc: {
          mesaj: "You crossed the pass out of breath; a small avalanche fell behind you but no one was harmed.",
          detay: "Your courage was rewarded.",
        },
        basarisizSonuc: {
          mesaj: "A small avalanche swept away part of the caravan; you saved everyone only with difficulty.",
          detay: "The mountain knows no mercy.",
        },
      },
      {
        metin: "Wait a few days in the village for the weather to improve.",
        ipucu: "Safe but costly",
        basariliSonuc: {
          mesaj: "You waited a few days and crossed safely once the weather cleared.",
          detay: "Patience is sometimes the cheapest insurance.",
        },
        basarisizSonuc: {
          mesaj: "The wait dragged on and lodging costs mounted, but in the end you crossed safely.",
          detay: "Safety sometimes comes at a price.",
        },
      },
    ],
  },
  hac_katolik_kara_2: {
    baslik: "A Stopover in Constantinople",
    metin: "The caravan halts in Constantinople. The city's great cathedral (Hagia Sophia) is still open to Christian pilgrims; but with the rising tension in the city, going out into the streets may be risky.",
    secenekler: [
      {
        metin: "Visit the cathedral; take the risk.",
        ipucu: "Unforgettable but risky",
        basariliSonuc: {
          mesaj: "You prayed beneath the magnificent dome of Hagia Sophia; it was an unforgettable moment.",
          detay: "Some moments are worth the risk.",
        },
        basarisizSonuc: {
          mesaj: "You got caught up in a small disturbance in the city and lost some of your belongings.",
          detay: "Every city carries its own danger.",
        },
      },
      {
        metin: "Stay at the inn; do not take the risk.",
        ipucu: "Safe but you miss the chance",
        basariliSonuc: {
          mesaj: "You rested safely at the inn and had a trouble-free stopover.",
          detay: "Sometimes caution is the wisest course.",
        },
        basarisizSonuc: {
          mesaj: "Staying at the inn was safe but you carried the disappointment of never seeing the city.",
          detay: "Safety sometimes closes off an opportunity too.",
        },
      },
    ],
  },
  hac_katolik_kara_3: {
    baslik: "At the Edge of the Syrian Desert",
    metin: "On the final approach to Jerusalem, the caravan faces the risk of a brigand raid in an arid region. A local guide knows a safe but winding road.",
    secenekler: [
      {
        metin: "Follow the guide's winding road.",
        ipucu: "Safe but wearying",
        basariliSonuc: {
          mesaj: "The winding road kept you clear of the brigands; weary but safe, you drew near Jerusalem.",
          detay: "Caution paid off once again.",
        },
        basarisizSonuc: {
          mesaj: "The winding road took long, your provisions dwindled, but you pressed on safely.",
          detay: "Safety sometimes takes patience.",
        },
      },
      {
        metin: "Continue directly, by the short road.",
        ipucu: "Fast but there is a brigand risk",
        basariliSonuc: {
          mesaj: "Luck was with you; you took the short road without meeting brigands.",
          detay: "Sometimes risk pays.",
        },
        basarisizSonuc: {
          mesaj: "Brigands stopped the caravan and would not let you go without taking part of your goods.",
          detay: "The price of the shortcut was heavy.",
        },
      },
    ],
  },
  hac_ortodoks_kara_2: {
    baslik: "Guests at the Monastery",
    metin: "The caravan spends the night at an old monastery in the mountains. The abbot asks you to attend a long service, but some pilgrims need rest.",
    secenekler: [
      {
        metin: "Attend the service all night.",
        ipucu: "It feeds the spirit but is wearying",
        basariliSonuc: {
          mesaj: "The long service moved your spirit deeply; your body is weary but there is a great peace inside you.",
          detay: "Some weariness feeds the spirit.",
        },
        basarisizSonuc: {
          mesaj: "Standing through the service grew hard; you barely made it to morning.",
          detay: "The body sometimes cannot keep up with the spirit's pace.",
        },
      },
      {
        metin: "Ask leave politely; choose to rest.",
        ipucu: "It protects your body",
        basariliSonuc: {
          mesaj: "You rested well; you are refreshed for tomorrow's hard road.",
          detay: "Listening to your body is a virtue too.",
        },
        basarisizSonuc: {
          mesaj: "The abbot seemed a little put out but received it with understanding.",
          detay: "Every choice may carry a small price.",
        },
      },
    ],
  },
  hac_ortodoks_kara_3: {
    baslik: "At the Jordan River",
    metin: "On the final approach to Jerusalem the caravan halts at the Jordan River. Some pilgrims want to enter the water where Jesus was baptized; the river is cold and fast this season.",
    secenekler: [
      {
        metin: "Enter the water; carry out the holy tradition.",
        ipucu: "A deep meaning but the current is dangerous",
        basariliSonuc: {
          mesaj: "As you entered the cold water a shiver and a deep peace filled you at once.",
          detay: "Some colds warm the spirit.",
        },
        basarisizSonuc: {
          mesaj: "The current dragged you off; those in the caravan saved you only with difficulty.",
          detay: "Even holy waters are not without danger.",
        },
      },
      {
        metin: "Watch from the bank; be content to pray.",
        ipucu: "Safe, calm",
        basariliSonuc: {
          mesaj: "You prayed quietly from the bank; your peace was calmer but still deep.",
          detay: "Not every act of worship has to take the same form.",
        },
        basarisizSonuc: {
          mesaj: "A small regret remained inside you; not having entered the water gave you pause.",
          detay: "Some decisions are questioned afterward.",
        },
      },
    ],
  },
  hac_ortodoks_deniz_1: {
    baslik: "Lost Bearings in the Aegean",
    metin: "The ship was caught in a thick fog in the Aegean Sea; even the compass seems to have gone astray. The captain wants you to decide whether to anchor at the next island and wait, or to press on blindly.",
    secenekler: [
      {
        metin: "Drop anchor and wait until the fog lifts.",
        ipucu: "Safe but costly",
        basariliSonuc: {
          mesaj: "You waited, and once the fog lifted you continued the road safely.",
          detay: "Patience is safer than reefs.",
        },
        basarisizSonuc: {
          mesaj: "The wait dragged on and provisions dwindled, but you carried on safely.",
          detay: "Safety sometimes takes patience.",
        },
      },
      {
        metin: "Keep going blindly, carefully.",
        ipucu: "Fast but there is a risk of reefs",
        basariliSonuc: {
          mesaj: "You took the risk but the fog lifted early, and you pressed on without losing time.",
          detay: "Sometimes courage is rewarded.",
        },
        basarisizSonuc: {
          mesaj: "The ship scraped a shallow reef; you lost precious time and money on repairs.",
          detay: "The fog turned out to be a merciless teacher.",
        },
      },
    ],
  },
  hac_ortodoks_deniz_2: {
    baslik: "An Acquaintance on the Rumelian Coast",
    metin: "At a harbor you came upon a young pilgrim far from home, his money gone. He asks for your company on the road and perhaps a little support.",
    secenekler: [
      {
        metin: "Help him; take him along with you.",
        ipucu: "A small expense, a new friend",
        basariliSonuc: {
          mesaj: "You helped the young pilgrim; for the rest of the road he was a loyal companion to you.",
          detay: "Some friendships are born on the road.",
        },
        basarisizSonuc: {
          mesaj: "You helped him but the young man quietly vanished at the next harbor.",
          detay: "Not every kindness turns into a bond.",
        },
      },
      {
        metin: "Focus on your own road; take no interest.",
        ipucu: "Safe but it weighs on the conscience",
        basariliSonuc: {
          mesaj: "You carried on your road; a faint sting of conscience remained inside you.",
          detay: "Every journey carries a trial.",
        },
        basarisizSonuc: {
          mesaj: "You could not forget the young man's eyes watching you go for a while.",
          detay: "Some sights will not let you go.",
        },
      },
    ],
  },
  hac_ortodoks_deniz_3: {
    baslik: "Arrival at Jaffa",
    metin: "As the ship approaches Jaffa Harbor a thanksgiving service is held on deck; everyone gives thanks for a safe voyage. The captain asks you for a few words too.",
    secenekler: [
      {
        metin: "Give a heartfelt speech of gratitude before the crowd.",
        ipucu: "A shared moment",
        basariliSonuc: {
          mesaj: "Your words moved everyone; the ship anchored at the harbor with joy.",
          detay: "A shared moment made the journey all the more meaningful.",
        },
        basarisizSonuc: {
          mesaj: "Your words came out halting with emotion but your intent was understood by all.",
          detay: "Not every speech has to be flawless.",
        },
      },
      {
        metin: "Decline politely; prefer to pray in silence.",
        ipucu: "Calm, inward",
        basariliSonuc: {
          mesaj: "You said your own prayer in silence; you joined the crowd's gratitude wholeheartedly.",
          detay: "Not every act of worship has to be spoken.",
        },
        basarisizSonuc: {
          mesaj: "Some took your standing aside in silence for arrogance; the captain frowned.",
          detay: "Silence is not always read the right way.",
        },
      },
    ],
  },
  hac_anglikan_deniz_2: {
    baslik: "Waiting at Suez",
    metin: "The ship passes near the still-unfinished Suez Canal works; for a while you wait in the same waters as the canal workers. One of the engineers offers to show you around the canal.",
    secenekler: [
      {
        metin: "Accept the offer; tour the construction.",
        ipucu: "Interesting but wearying",
        basariliSonuc: {
          mesaj: "Seeing the enormous canal works left you astonished; you felt how fast the age is changing.",
          detay: "Even on a holy journey you saw the marks of progress.",
        },
        basarisizSonuc: {
          mesaj: "You felt a little faint in the hot, dusty construction site, but what you saw was worth it.",
          detay: "Curiosity sometimes makes the body pay.",
        },
      },
      {
        metin: "Stay on the ship; rest.",
        ipucu: "Safe, dull",
        basariliSonuc: {
          mesaj: "You rested quietly; you prepared for the rest of the journey.",
          detay: "Sometimes the best thing is to do nothing.",
        },
        basarisizSonuc: {
          mesaj: "You wanted to rest but the hot cabin made it hard.",
          detay: "Peace sometimes cannot be found.",
        },
      },
    ],
  },
  hac_anglikan_deniz_3: {
    baslik: "Arrival at Jaffa Harbor",
    metin: "As the ship approaches Jaffa Harbor the tour company's representative makes a final announcement on deck: the last leg to Jerusalem can be made by an extra-fee 'first class' horse-carriage or by the free, crowded shared carriages.",
    secenekler: [
      {
        metin: "Pay the extra fee and travel in comfort.",
        ipucu: "Comfortable but costly",
        basariliSonuc: {
          mesaj: "Resting in the comfortable carriage, you drew near Jerusalem.",
          detay: "Comfort is sometimes a small luxury but a deserved one.",
        },
        basarisizSonuc: {
          mesaj: "Despite the extra fee the carriage broke down on the road and was delayed a few hours.",
          detay: "Money does not always guarantee comfort.",
        },
      },
      {
        metin: "Prefer the free, crowded carriage.",
        ipucu: "Free but wearying",
        basariliSonuc: {
          mesaj: "You traveled chatting with the other pilgrims in the crowded carriage; you made new friendships.",
          detay: "Sometimes the plain road leaves richer memories.",
        },
        basarisizSonuc: {
          mesaj: "The crowded carriage was jolting and wearying; you were worn out.",
          detay: "Thrift is sometimes paid for with the body.",
        },
      },
    ],
  },
  hac_anglikan_kara_1: {
    baslik: "The Train's Delay",
    metin: "The train was stuck for days in the Balkans due to a bridge repair. Some passengers suggest waiting in the nearby town, others suggest walking to reach the next station.",
    secenekler: [
      {
        metin: "Wait patiently in the town.",
        ipucu: "Safe but costly",
        basariliSonuc: {
          mesaj: "You spent a few days in the small town; the warmth of the local people eased your weariness.",
          detay: "Some delays carry unexpected beauties.",
        },
        basarisizSonuc: {
          mesaj: "The wait dragged on and lodging costs mounted quickly.",
          detay: "Delays sometimes cost dearly.",
        },
      },
      {
        metin: "Try to reach the next station on foot.",
        ipucu: "Free but wearying",
        basariliSonuc: {
          mesaj: "After a hard walk you reached the next station and caught the train there.",
          detay: "Your resolve gained you time.",
        },
        basarisizSonuc: {
          mesaj: "The road turned out longer and harder than you thought; you reached the station worn out and hurt.",
          detay: "Some shortcuts are not.",
        },
      },
    ],
  },
  hac_anglikan_kara_2: {
    baslik: "An Argument in Belgrade",
    metin: "While changing trains in Belgrade, a local journalist gets into a sharp argument with you about colonialism and missionary work; a curious crowd gathers around you.",
    secenekler: [
      {
        metin: "Hold a calm and respectful dialogue.",
        ipucu: "Eye-opening but it could grow tense",
        basariliSonuc: {
          mesaj: "The argument turned into a respectful conversation; you both learned something from each other.",
          detay: "Some bridges are built at train stations.",
        },
        basarisizSonuc: {
          mesaj: "The argument grew tense and the crowd split in two; you caught your train's departure at the last moment.",
          detay: "Not every dialogue ends in peace.",
        },
      },
      {
        metin: "Avoid the argument; walk away quietly.",
        ipucu: "Safe but you miss the chance",
        basariliSonuc: {
          mesaj: "You stayed clear of the argument and continued your road calmly.",
          detay: "You do not have to fight every battle.",
        },
        basarisizSonuc: {
          mesaj: "In some circles your retreat was read as 'having no principles'.",
          detay: "Sometimes silence carries a price too.",
        },
      },
    ],
  },
  hac_anglikan_kara_3: {
    baslik: "At the Threshold of the Sinai Desert",
    metin: "On the last leg of the overland journey, at the edge of the Sinai Desert, the provisions are nearly gone. A small nearby Bedouin caravan offers to sell extra provisions, but at an outrageous price.",
    secenekler: [
      {
        metin: "Buy the provisions even at the outrageous price.",
        ipucu: "Expensive but safe",
        basariliSonuc: {
          mesaj: "Expensive as it was, you bought the provisions; you finished the rest of the road comfortably.",
          detay: "Sometimes money is cheaper than health.",
        },
        basarisizSonuc: {
          mesaj: "You bought the provisions but the quality was poor; still, they got you through.",
          detay: "Not every purchase turns out as you hope.",
        },
      },
      {
        metin: "Refuse; try to manage with what you have.",
        ipucu: "Free but risky",
        basariliSonuc: {
          mesaj: "By rationing carefully your provisions lasted to the last day.",
          detay: "Thrift sometimes works out.",
        },
        basarisizSonuc: {
          mesaj: "The provisions ran out on the last day; hungry and thirsty, you pressed on only with difficulty.",
          detay: "Thrift can carry a price too.",
        },
      },
    ],
  },
  yolculuk_savunma_teklif: {
    baslik: "The Shadow of the Crusaders",
    metin: "News that a crusader army from the west is approaching the coasts shook the region; the commander summoned his unit to the border defense. You are not asked whether you will join but which line you will be assigned to — coastal watch, or the main defense in the inner citadel.",
    secenekler: [
      {
        metin: "Join the coastal watch; watch for a landing from the sea.",
        ipucu: "Dangerous — you will face the first ones to hit the shore",
        basariliSonuc: {
          mesaj: "You buckled on your armor and said farewell to your family. You rode toward the coastal watchtower.",
          detay: "This land is yours; defending it is not a choice but a debt.",
        },
        basarisizSonuc: {
          mesaj: "Your equipment cost more than expected but you set out all the same.",
          detay: "Reluctant as its start may be, this duty awaits you.",
        },
      },
      {
        metin: "Join the main defense line in the inner citadel.",
        ipucu: "A less risky first step but a long siege awaits you",
        basariliSonuc: {
          mesaj: "You buckled on your armor and said farewell to your family. You set out toward the inner citadel with the caravan.",
          detay: "This land is yours; defending it is not a choice but a debt.",
        },
        basarisizSonuc: {
          mesaj: "Your equipment cost more than expected but you set out all the same.",
          detay: "Reluctant as its start may be, this duty awaits you.",
        },
      },
    ],
  },
  yolculuk_savunma_deniz_1: {
    baslik: "Sails on the Horizon",
    metin: "The sails of dozens of crusader ships appeared on the horizon. As the coastal watch you must sound the first warning, but the beacon tower's signal system is broken.",
    secenekler: [
      {
        metin: "Jump on a horse and carry word to the inner citadel yourself.",
        ipucu: "Fast but a wearying and dangerous gallop",
        basariliSonuc: {
          mesaj: "You became the messenger; the citadel garrison began its preparations on time.",
          detay: "This warning will save many lives.",
        },
        basarisizSonuc: {
          mesaj: "The horse threw you, but wounded as you were, you got the word to the messengers.",
          detay: "The duty was done but your body paid the price.",
        },
      },
      {
        metin: "Try to repair the tower quickly and give the signal from there.",
        ipucu: "If you succeed the whole region is alerted at once",
        basariliSonuc: {
          mesaj: "You repaired the tower at the last moment; the beacon signal echoed all along the coast.",
          detay: "The whole region is prepared thanks to you.",
        },
        basarisizSonuc: {
          mesaj: "Your repair efforts fell short; the tower did not light in time.",
          detay: "Some efforts cannot keep up.",
        },
      },
    ],
  },
  yolculuk_savunma_deniz_2: {
    baslik: "Repelling the Landing",
    metin: "Crusader soldiers are trying to reach the shore in boats; you have to fight among the waves, in water up to your knees.",
    secenekler: [
      {
        metin: "Dive into the water; meet the first boats before they even touch the shore.",
        ipucu: "Great renown at stake, very dangerous",
        basariliSonuc: {
          mesaj: "You drove the first boats back; the soldiers carried you on their shoulders.",
          detay: "The coast was protected by your courage.",
        },
        basarisizSonuc: {
          mesaj: "Amid the waves and the arrows you were badly wounded and had to fall back.",
          detay: "The sea is as merciless as the enemy.",
        },
      },
      {
        metin: "Form an orderly defensive line along the coast.",
        ipucu: "Safer, disciplined",
        basariliSonuc: {
          mesaj: "Thanks to the orderly line the landing slowed and your losses were few.",
          detay: "Discipline is sometimes more effective than heroism.",
        },
        basarisizSonuc: {
          mesaj: "The line was breached at one point; a short but sharp clash broke out.",
          detay: "Not every formation holds when it is tested.",
        },
      },
    ],
  },
  yolculuk_savunma_kara_1: {
    baslik: "A Trap in the Pass",
    metin: "In the mountain pass leading to the inner citadel, you were tasked with laying a trap for the advancing crusader vanguard. Timing is everything.",
    secenekler: [
      {
        metin: "Bring down the rocks when the vanguard is right in the middle of the pass.",
        ipucu: "A great blow, but wrong timing exposes you",
        basariliSonuc: {
          mesaj: "The rocks came down right on time; the vanguard scattered and the pass was closed for days.",
          detay: "A small group managed to delay a whole army.",
        },
        basarisizSonuc: {
          mesaj: "The trap went off early; the enemy was ready, and you fell back fighting.",
          detay: "Timing was everything, and this time it did not hold.",
        },
      },
      {
        metin: "Wait patiently; only scout and gather information.",
        ipucu: "Safe, valuable intelligence",
        basariliSonuc: {
          mesaj: "You learned the enemy army's strength and direction; this information is very valuable to the citadel.",
          detay: "Sometimes the best blow is to strike none at all.",
        },
        basarisizSonuc: {
          mesaj: "You were spotted during the scouting and fell back in a short clash.",
          detay: "Concealment does not always last.",
        },
      },
    ],
  },
  yolculuk_savunma_kara_2: {
    baslik: "Preparing for the Siege",
    metin: "Before the fortress comes under siege, water and provisions must be stockpiled and the walls strengthened; time is running short and everyone is looking to you for direction.",
    secenekler: [
      {
        metin: "Mobilize the people; work day and night.",
        ipucu: "Wearying but it makes the fortress far more prepared",
        basariliSonuc: {
          mesaj: "The people worked alongside you; the fortress is more prepared than it has ever been.",
          detay: "Shared labor is worth as much as the soundest wall.",
        },
        basarisizSonuc: {
          mesaj: "The pace of work exhausted you and many others; the preparations were left half done.",
          detay: "Some preparations are never enough.",
        },
      },
      {
        metin: "With military discipline, prepare only the garrison.",
        ipucu: "Less wearying but the people are on their own",
        basariliSonuc: {
          mesaj: "The garrison was prepared in good order; the people managed with their own means.",
          detay: "Military order did its job.",
        },
        basarisizSonuc: {
          mesaj: "Part of the people was caught unprepared; panic gripped the fortress briefly.",
          detay: "Thinking of everyone is a commander's job too.",
        },
      },
    ],
  },
  yolculuk_savunma_savas_ortak: {
    baslik: "The Defense of the Walls",
    metin: "The crusader army besieged the fortress; catapults rain fire on the walls, and the first great wave of assault has begun. You must take your place.",
    secenekler: [
      {
        metin: "Fight in the front rank at the most critical breach.",
        ipucu: "Great renown or a great wound",
        basariliSonuc: {
          mesaj: "You held the breach almost single-handedly for as long as anyone could; your name became a legend in the fortress.",
          detay: "This resistance will be told for years.",
        },
        basarisizSonuc: {
          mesaj: "The assault wave wounded you badly; your comrades pulled you back only with difficulty.",
          detay: "This siege cost you dearly.",
        },
      },
      {
        metin: "Stay back and direct the archers and catapults.",
        ipucu: "Safer, less renown",
        basariliSonuc: {
          mesaj: "The archers you directed broke much of the assault wave.",
          detay: "Every victory is won not only by those out front but also by those who stand behind.",
        },
        basarisizSonuc: {
          mesaj: "A catapult stone fell right beside you; you got away with scratches.",
          detay: "Even standing back offers no safety in this war.",
        },
      },
    ],
  },
  yolculuk_savunma_kale_dusuyor: {
    baslik: "The Fallen Wall",
    metin: "After a siege lasting days, a section of the wall finally collapsed and crusader soldiers are pouring in through the breach. The commander shouts one last order but now everyone has to make their own decision.",
    secenekler: [
      {
        metin: "Fight to the end; do not fall back.",
        ipucu: "Honorable but it could be fatal",
        basariliSonuc: {
          mesaj: "You formed one last line before the breach and kept fighting.",
          detay: "You will stand to the end for this land.",
        },
        basarisizSonuc: {
          mesaj: "Wounded as you were, you did not leave your place; your sword is still in your hand.",
          detay: "Resistance is pushing the limits of your body.",
        },
      },
      {
        metin: "Lay down your weapon; accept being taken prisoner.",
        ipucu: "A safer first moment, but a life of captivity awaits you",
        basariliSonuc: {
          mesaj: "You threw down your weapon and raised your hands; crusader soldiers took you prisoner.",
          detay: "You are alive but you are no longer free.",
        },
        basarisizSonuc: {
          mesaj: "A soldier beat you as you surrendered, but in the end you were taken prisoner.",
          detay: "Even surrender was not without a price.",
        },
      },
    ],
  },
  yolculuk_savunma_direnis_1: {
    baslik: "On the Fallen Walls",
    metin: "You are among a small group holding the last line at the breach. Comrades falling around you, crusader soldiers advancing; every second your next breath could be your last.",
    secenekler: [
      {
        metin: "Charge forward; take command yourself.",
        ipucu: "It rallies the group but the greatest risk is on you",
        basariliSonuc: {
          mesaj: "Your voice gave the group order again; together you held the line a while longer.",
          detay: "Leadership is born even in the darkest moment.",
        },
        basarisizSonuc: {
          mesaj: "Charging forward made you a target and you were badly wounded.",
          detay: "Courage is not always rewarded.",
        },
      },
      {
        metin: "Focus on carrying the wounded to the rear.",
        ipucu: "Less renown but it saves lives",
        basariliSonuc: {
          mesaj: "You managed to carry a few wounded comrades to a safe corner.",
          detay: "Even in this chaos you chose to save lives.",
        },
        basarisizSonuc: {
          mesaj: "While carrying them you took a blow too, and you both fell.",
          detay: "The price of doing good is sometimes heavy.",
        },
      },
    ],
  },
  yolculuk_savunma_direnis_2: {
    baslik: "The Last Breath",
    metin: "Your group is melting away, your strength is spent. From far off, from the inner citadel, a horn sounds — are reinforcements coming, or is this one last hope?",
    secenekler: [
      {
        metin: "Keep fighting with your last strength; trust the horn.",
        ipucu: "Either a miracle or your end",
        basariliSonuc: {
          mesaj: "The horn was real! The Sultan's reinforcements arrived just in time.",
          detay: "Some hopes really do come.",
        },
        basarisizSonuc: {
          mesaj: "The reinforcements were too late, and you fell badly wounded.",
          detay: "Some hopes do not arrive in time.",
        },
      },
      {
        metin: "Have a small group evacuate the people through a hidden tunnel.",
        ipucu: "Little renown but it saves many lives",
        basariliSonuc: {
          mesaj: "You brought dozens of civilians out safely through the fortress's hidden tunnel.",
          detay: "Some victories are won not with the sword but with the conscience.",
        },
        basarisizSonuc: {
          mesaj: "A clash broke out during the evacuation; a few were lost but most were saved.",
          detay: "Not every rescue is without loss.",
        },
      },
    ],
  },
  yolculuk_savunma_direnis_3: {
    baslik: "After the Siege",
    metin: "The siege is over — either driven back by reinforcements, or you and those you saved reached safe ground. As you come before the Sultan you still feel the weight of what you went through.",
    secenekler: [
      {
        metin: "Tell what happened as it was; count the losses too.",
        ipucu: "Honest but a hard reckoning",
        basariliSonuc: {
          mesaj: "The Sultan listened to your story in silence; he grieved for your losses and honored you for your resistance.",
          detay: "The price of some victories stays in the memory of the winner.",
        },
        basarisizSonuc: {
          mesaj: "Your voice trembled as you told it; some nights you still hear the screams at that breach.",
          detay: "You came home, but some wars never end.",
        },
      },
      {
        metin: "Give a brief report; keep the rest inside.",
        ipucu: "It looks easy but you bottle it up",
        basariliSonuc: {
          mesaj: "Your short, terse report left the impression of a 'solid soldier'.",
          detay: "Not telling some things is a choice too.",
        },
        basarisizSonuc: {
          mesaj: "What you bottled up grew heavier in time; at night you still live through that siege.",
          detay: "Pain left unspoken sometimes takes deeper root.",
        },
      },
    ],
  },
  yolculuk_savunma_esaret_1: {
    baslik: "In Crusader Hands",
    metin: "Conditions in the prison camp are merciless: little food, hard labor, constant insults against your faith. A guard whispers that if you change your religion your conditions will improve.",
    secenekler: [
      {
        metin: "Refuse; do not compromise your faith.",
        ipucu: "It protects your honor but conditions grow harsher",
        basariliSonuc: {
          mesaj: "Your refusal stirred a quiet respect among the other prisoners; though conditions grew harsher, your honor is rock solid.",
          detay: "Some things are not for sale under any condition.",
        },
        basarisizSonuc: {
          mesaj: "You took a severe punishment for your refusal but you did not bow.",
          detay: "The price of your defiance is heavy, but you have no regrets.",
        },
      },
      {
        metin: "Pretend to accept; buy time.",
        ipucu: "A risky game; it improves conditions but has a moral price",
        basariliSonuc: {
          mesaj: "The guards swallowed your ruse; your conditions improved but there is a feeling of taint inside you.",
          detay: "Survival sometimes comes with a mask.",
        },
        basarisizSonuc: {
          mesaj: "Your ruse was seen through, and you lost the trust of both the guards and the other prisoners.",
          detay: "Some games turn everyone against you.",
        },
      },
    ],
  },
  yolculuk_savunma_esaret_2: {
    baslik: "Ransom or Escape?",
    metin: "Word reached you that ransom money has been set aside for prisoners from the Sultan's treasury; but your turn could be months away. That same night, at the changing of the watch, you also spotted a chance to escape.",
    secenekler: [
      {
        metin: "Wait your turn for the ransom patiently.",
        ipucu: "Safe but long and expensive",
        basariliSonuc: {
          mesaj: "Months later your ransom was paid; you walked free through the camp gate.",
          detay: "The Sultan's treasury saved you this time.",
        },
        basarisizSonuc: {
          mesaj: "The ransom negotiations dragged on, and in that time conditions grew far harsher.",
          detay: "Some waits are paid for with your body.",
        },
      },
      {
        metin: "Seize the chance at the changing of the watch and try to escape.",
        ipucu: "Free but a heavy price if caught",
        basariliSonuc: {
          mesaj: "Leaping from shadow to shadow in the dark, you managed to escape the camp!",
          detay: "Your heart is still pounding but you are free.",
        },
        basarisizSonuc: {
          mesaj: "Your escape attempt was noticed and you were given a severe punishment.",
          detay: "Some chances are not as open as they look.",
        },
      },
    ],
  },
  yolculuk_savunma_esaret_3: {
    baslik: "Homecoming",
    metin: "After captivity or escape you finally reached your own land. Being met with your family's tears lightens all the hardship you went through at once.",
    secenekler: [
      {
        metin: "Tell what you went through as it was; face the past.",
        ipucu: "A hard but healing honesty",
        basariliSonuc: {
          mesaj: "As you told it your burden grew lighter; though your family listened in horror, they held you closer than ever.",
          detay: "Some wounds only heal once they are put into words.",
        },
        basarisizSonuc: {
          mesaj: "Telling it was not as easy as you thought; some nights you still wake up in that prison camp.",
          detay: "You came home, but some journeys never end.",
        },
      },
      {
        metin: "Leave the past behind; never speak of it.",
        ipucu: "It looks easy but you bottle it up",
        basariliSonuc: {
          mesaj: "You quietly returned to your old life; no one asked, and you did not tell.",
          detay: "Some silences are a shield.",
        },
        basarisizSonuc: {
          mesaj: "It grew inside your silence; at night you still wake from the nightmare of those days.",
          detay: "Pain left unspoken sometimes takes deeper root.",
        },
      },
    ],
  },
  yolculuk_kesif_teklif: {
    baslik: "The Blank Corners of the Map",
    metin: "The geographical society is looking for a bold merchant-explorer to chart the regions still left blank on the maps. The unknown may be profitable, but those who do not return are not few. Whether you go by sea or by land is your decision.",
    secenekler: [
      {
        metin: "Fit out a ship and set sail for new coasts by sea.",
        ipucu: "Expensive but unknown coasts promise great gain",
        basariliSonuc: {
          mesaj: "You filled your ship with provisions, gathered your crew, and set sail toward the horizon.",
          detay: "You ignored the words 'here be monsters' written at the edge of the map.",
        },
        basarisizSonuc: {
          mesaj: "Fitting out the ship cost more than expected but you set out all the same.",
          detay: "This venture weighed on you before it began.",
        },
      },
      {
        metin: "Prepare a caravan and push into the interior by land.",
        ipucu: "Cheaper but unknown lands take patience",
        basariliSonuc: {
          mesaj: "You fitted out your caravan with camels and provisions; you set out toward where the map ends.",
          detay: "The land ahead has been charted by no merchant.",
        },
        basarisizSonuc: {
          mesaj: "Preparing the caravan cost more than expected but you set out all the same.",
          detay: "This venture weighed on you before it began.",
        },
      },
      {
        metin: "Refuse; be content with the known trade routes.",
        ipucu: "Safe, the opportunity slips away",
        basariliSonuc: {
          mesaj: "You turned the offer away; you chose to be content with the known roads.",
          detay: "The unknown is not always for everyone.",
        },
        basarisizSonuc: {
          mesaj: "When you heard the society had found another explorer you felt a faint regret inside.",
          detay: "Some decisions keep a person thinking for a long time.",
        },
      },
    ],
  },
  yolculuk_kesif_deniz_1: {
    baslik: "Uncharted Waters",
    metin: "You have passed the point where the known maps end; the compass behaves strangely, and whispers of unrest and mutiny grow among the crew.",
    secenekler: [
      {
        metin: "Convince the crew and keep going.",
        ipucu: "If you convince them morale rises; if not, there is a risk of mutiny",
        basariliSonuc: {
          mesaj: "Your speech calmed the crew; the spirit of unity returned.",
          detay: "Sometimes the best compass is the right words.",
        },
        basarisizSonuc: {
          mesaj: "Some of the crew are still grumbling but they did not rise in open mutiny.",
          detay: "The unrest did not fully pass, only got pushed down.",
        },
      },
      {
        metin: "Take the worries seriously; rest one night and reassess.",
        ipucu: "Safe but a loss of time",
        basariliSonuc: {
          mesaj: "One night's rest calmed everyone; in the morning you continued with a stronger morale.",
          detay: "Sometimes stopping is part of moving forward.",
        },
        basarisizSonuc: {
          mesaj: "The rest did not help much; the unrest lasted until morning.",
          detay: "Not every rest brings calm.",
        },
      },
    ],
  },
  yolculuk_kesif_deniz_2: {
    baslik: "First Contact",
    metin: "A coastline never seen on any map appeared on the horizon; there are local people on the shore watching you. Should you approach armed, or with gifts?",
    secenekler: [
      {
        metin: "Approach with gifts, unarmed.",
        ipucu: "Risky but if you succeed a valuable friendship is formed",
        basariliSonuc: {
          mesaj: "Your gifts were accepted; the local people invited you to their village.",
          detay: "Some bridges are built not with weapons but with trust.",
        },
        basarisizSonuc: {
          mesaj: "Your approach was misunderstood and a small clash broke out; you got back to the ship only with difficulty.",
          detay: "Good intentions are not always understood.",
        },
      },
      {
        metin: "Be cautious; send an armed group.",
        ipucu: "Safe but you may miss an opportunity",
        basariliSonuc: {
          mesaj: "The cautious approach passed safely; the locals were distant but not hostile.",
          detay: "Safety is sometimes the price of an opportunity.",
        },
        basarisizSonuc: {
          mesaj: "Your armed appearance frightened the locals and they left the village.",
          detay: "Some precautions create their own fear.",
        },
      },
    ],
  },
  yolculuk_kesif_deniz_3: {
    baslik: "The Wealth of the New Land",
    metin: "On the shore you found valuable spices, strange fruits, and perhaps traces of gold. Gathering it all takes time and risk; the time to return to the ship is also drawing near.",
    secenekler: [
      {
        metin: "Go deeper inland; search for more.",
        ipucu: "Great gain or a dangerous delay",
        basariliSonuc: {
          mesaj: "The valuable resources you found in the interior filled the ship; this discovery will make you rich.",
          detay: "Some risks turn into legendary gains.",
        },
        basarisizSonuc: {
          mesaj: "The team that went inland got lost in harsh terrain; you got back only with difficulty and lost time and resources.",
          detay: "Greed sometimes comes to nothing.",
        },
      },
      {
        metin: "Be content with what you have; return safely to the ship.",
        ipucu: "Safe, moderate gain",
        basariliSonuc: {
          mesaj: "You returned safely to the ship with what you gathered; a modest but guaranteed gain.",
          detay: "Sometimes enough is the wisest choice.",
        },
        basarisizSonuc: {
          mesaj: "On the way back some of the goods were damaged and your gain shrank.",
          detay: "Not every return is trouble-free.",
        },
      },
    ],
  },
  yolculuk_kesif_kara_1: {
    baslik: "Beyond the Silk Road",
    metin: "You reached the end of the known trade routes; ahead of you is a region never marked on any map. The travelers at the last caravanserai accuse you of 'madness'.",
    secenekler: [
      {
        metin: "Find and hire the most experienced guide at the caravanserai.",
        ipucu: "Costly but experience saves lives",
        basariliSonuc: {
          mesaj: "The guide sensed the region's dangers in advance and steered the caravan onto a safe route.",
          detay: "Some knowledge is worth more than gold.",
        },
        basarisizSonuc: {
          mesaj: "The guide you hired turned out not as experienced as he claimed, but at least he did no harm.",
          detay: "Not every investment turns out as you hope.",
        },
      },
      {
        metin: "Trust your own instincts; press on without a guide.",
        ipucu: "Free but far riskier",
        basariliSonuc: {
          mesaj: "Your instincts did not fail you; you led the caravan skillfully and everyone admired you.",
          detay: "Some leaders find the way even without a map.",
        },
        basarisizSonuc: {
          mesaj: "You took a wrong trail and, after wandering lost for days, found the road again.",
          detay: "Some instincts cost dearly.",
        },
      },
    ],
  },
  yolculuk_kesif_kara_2: {
    baslik: "Beyond the Mountain Pass",
    metin: "The caravan reached a mountain pass not on the maps. The pass looks dangerous, but going around it will take weeks.",
    secenekler: [
      {
        metin: "Cross the pass; take the risk.",
        ipucu: "Saves time but dangerous",
        basariliSonuc: {
          mesaj: "You crossed the hard pass; the caravan is weary but on schedule.",
          detay: "Your courage gained you time.",
        },
        basarisizSonuc: {
          mesaj: "Some of the pack animals fell on the pass and you lost part of your goods.",
          detay: "The mountain does not forgive haste.",
        },
      },
      {
        metin: "Go around by the long but safe road.",
        ipucu: "Safe but a loss of time",
        basariliSonuc: {
          mesaj: "The long road was wearying but the caravan is pressing on safe and sound.",
          detay: "Patience is the mountain's best opponent.",
        },
        basarisizSonuc: {
          mesaj: "The long road took even longer than expected and provision costs mounted.",
          detay: "Safety sometimes comes at a price.",
        },
      },
    ],
  },
  yolculuk_kesif_kara_3: {
    baslik: "The Palace of an Unknown Ruler",
    metin: "Your caravan reached a small kingdom that appears on no map. The local ruler receives you with curiosity and offers a trade agreement — but the terms are heavily in his own favor.",
    secenekler: [
      {
        metin: "Accept the terms; put the relationship first.",
        ipucu: "Your gain is small but future trade routes open up",
        basariliSonuc: {
          mesaj: "The ruler was pleased by your generosity; your name opened the first lasting trade route to this kingdom.",
          detay: "Some gains bear fruit years later.",
        },
        basarisizSonuc: {
          mesaj: "The terms you accepted turned out even harsher than expected; your caravan returned without profit.",
          detay: "Some good intentions cost dearly.",
        },
      },
      {
        metin: "Haggle; defend your own interest.",
        ipucu: "It could be more profitable but you may offend the ruler",
        basariliSonuc: {
          mesaj: "Your persistent haggling worked; you both turned a profit and won the ruler's respect.",
          detay: "Bold bargains sometimes win both.",
        },
        basarisizSonuc: {
          mesaj: "The ruler took your insistence for insolence and had you expelled within days.",
          detay: "Not every bargain ends as you hope.",
        },
      },
    ],
  },
  yolculuk_kesif_donus: {
    baslik: "Before the Society",
    metin: "After months of exploration you returned home. The geographical society is waiting for you to mark your discoveries on a map and write your name into history.",
    secenekler: [
      {
        metin: "Share what you found generously, for science.",
        ipucu: "A lasting renown but your material gain shrinks",
        basariliSonuc: {
          mesaj: "Your map was recorded in the society's archive with your name; your discovery will be remembered for generations.",
          detay: "Some wealth is measured in knowledge.",
        },
        basarisizSonuc: {
          mesaj: "Your contribution was appreciated but not met with the enthusiasm you expected.",
          detay: "Not every contribution is applauded at once.",
        },
      },
      {
        metin: "Keep what you discovered as your own trade secret.",
        ipucu: "A special advantage in the future but a loss of standing in the scientific community",
        basariliSonuc: {
          mesaj: "You kept your map under lock and key; the trade routes you discovered are now yours alone.",
          detay: "Some wealth grows without being shared.",
        },
        basarisizSonuc: {
          mesaj: "The society realized you were hiding your secret and criticized you as 'selfish'.",
          detay: "Some secrets are not kept as well as you think.",
        },
      },
    ],
  },
  yolculuk_mucit_teklif: {
    baslik: "The Fateful Moment of the Invention",
    metin: "The invention you developed in secret in your workshop for years is finally ready to be presented. Now the choice is yours: will you take it to the salons of the nobility, or to the factories of the industrialists?",
    secenekler: [
      {
        metin: "Take it to courts and nobles; seek prestige.",
        ipucu: "A slow but lasting reputation",
        basariliSonuc: {
          mesaj: "You carefully packed your model and set out for the mansion whose invitation came first.",
          detay: "The world of the nobility moves slowly but does not forget.",
        },
        basarisizSonuc: {
          mesaj: "The preparations cost more than expected but you set out all the same.",
          detay: "This tour weighed on you before it began.",
        },
      },
      {
        metin: "Take it to industrialists and investors; seek fast capital.",
        ipucu: "Fast but a merciless world",
        basariliSonuc: {
          mesaj: "You squeezed your model into a bag and jumped on the train to the factory district.",
          detay: "Industrialists waste no time; you either prove useful or you are forgotten.",
        },
        basarisizSonuc: {
          mesaj: "The preparations cost more than expected but you set out all the same.",
          detay: "This tour weighed on you before it began.",
        },
      },
      {
        metin: "Refuse; keep your invention in your drawer.",
        ipucu: "Safe, the opportunity slips away",
        basariliSonuc: {
          mesaj: "You locked your invention in your drawer; maybe one day, you told yourself.",
          detay: "Some kinds of courage gather over time.",
        },
        basarisizSonuc: {
          mesaj: "When you heard someone else had presented a similar invention, regret washed over you.",
          detay: "Some opportunities never come again.",
        },
      },
    ],
  },
  yolculuk_mucit_saray_1: {
    baslik: "Skeptical Nobles",
    metin: "Your first presentation is in a count's salon; the guests dismiss your invention as 'cheap conjuring'. You have to convince them patiently.",
    secenekler: [
      {
        metin: "Do a live, showy demonstration; take the risk.",
        ipucu: "A great effect but the invention could be damaged",
        basariliSonuc: {
          mesaj: "The demonstration left the salon astonished; your invention became the talk of the hour.",
          detay: "A bold demonstration is the best advertisement.",
        },
        basarisizSonuc: {
          mesaj: "The model malfunctioned during the demonstration; the guests left the salon snickering.",
          detay: "Some risks backfire on stage.",
        },
      },
      {
        metin: "Proceed with a calm, technical explanation.",
        ipucu: "Safe but less striking",
        basariliSonuc: {
          mesaj: "Your explanation drew the interest of a few curious nobles; a small but solid start.",
          detay: "Some impressions form slowly.",
        },
        basarisizSonuc: {
          mesaj: "The technical details lost the guests' attention and the salon grew bored.",
          detay: "Not every telling has the same effect.",
        },
      },
    ],
  },
  yolculuk_mucit_saray_2: {
    baslik: "A Patronage Negotiation",
    metin: "A duchess offers to give your invention generous funding — but in return she wants the invention to be known in the future 'under her name'.",
    secenekler: [
      {
        metin: "Accept; take the funding.",
        ipucu: "Great capital but you sacrifice your name",
        basariliSonuc: {
          mesaj: "You signed the agreement; your pocket filled but the invention is now known in the duchess's salons under her name.",
          detay: "The price of some gains is your own name.",
        },
        basarisizSonuc: {
          mesaj: "The agreement was signed but the duchess did not pay part of what she promised.",
          detay: "The word of nobles is not always kept.",
        },
      },
      {
        metin: "Refuse; insist on going forward under your own name.",
        ipucu: "Less capital but your name stays yours",
        basariliSonuc: {
          mesaj: "Your insistence impressed the duchess; you found a smaller support but under your own name.",
          detay: "Some principles are not up for negotiation.",
        },
        basarisizSonuc: {
          mesaj: "The duchess could not stomach the refusal to her pride and withdrew her support entirely.",
          detay: "Being principled sometimes costs dearly.",
        },
      },
    ],
  },
  yolculuk_mucit_saray_3: {
    baslik: "The Royal Exhibition",
    metin: "Your invention was accepted into the royal exhibition; you will give one last demonstration in the king's presence. The court's best inventors are watching you in the same hall.",
    secenekler: [
      {
        metin: "Give the boldest, riskiest demonstration.",
        ipucu: "Royal approval or a great fiasco in front of everyone",
        basariliSonuc: {
          mesaj: "Your demonstration enchanted the king; your invention earned the title 'royally approved'.",
          detay: "This moment became the turning point of your career.",
        },
        basarisizSonuc: {
          mesaj: "The demonstration failed before the court; an embarrassed silence filled the hall.",
          detay: "Some risks blow up in front of everyone.",
        },
      },
      {
        metin: "Give a safe, proven demonstration.",
        ipucu: "Less striking but a guaranteed approval",
        basariliSonuc: {
          mesaj: "Your demonstration went off without a hitch; the king nodded with satisfaction.",
          detay: "Sometimes being reliable is worth more than dazzling.",
        },
        basarisizSonuc: {
          mesaj: "The demonstration was found ordinary; the court's interest shifted to another inventor.",
          detay: "Playing it safe sometimes leads to being forgotten.",
        },
      },
    ],
  },
  yolculuk_mucit_sanayici_1: {
    baslik: "The Investors' Meeting",
    metin: "Hard-faced factory owners judge your invention by a single question: 'how much profit will it bring'. Emotional speeches do not work here.",
    secenekler: [
      {
        metin: "Stress the profit potential with concrete figures.",
        ipucu: "This is the language of this world",
        basariliSonuc: {
          mesaj: "Your figures came across as convincing; a few factory owners took interest at once.",
          detay: "Industrialists are moved by profit more than by feeling.",
        },
        basarisizSonuc: {
          mesaj: "Your figures did not fully convince them; you were met with cautious interest.",
          detay: "Not every calculation has the same effect.",
        },
      },
      {
        metin: "Explain the invention's social benefit and long-term vision.",
        ipucu: "Risky but if it lands, far greater support comes",
        basariliSonuc: {
          mesaj: "Your vision truly impressed some of the factory owners; they offered more than an ordinary investment.",
          detay: "Sometimes passion is more convincing than figures.",
        },
        basarisizSonuc: {
          mesaj: "Your vision was dismissed as 'unrealistic' and the meeting ended coldly.",
          detay: "In this world dreams sometimes do not pay.",
        },
      },
    ],
  },
  yolculuk_mucit_sanayici_2: {
    baslik: "The Risk of Your Idea Being Stolen",
    metin: "After the meeting, you noticed the men of a rival factory owner trying to sneak into your workshop to study the drawings.",
    secenekler: [
      {
        metin: "Lock the drawings away at once; speed up the official patent application.",
        ipucu: "Costly but it secures your invention",
        basariliSonuc: {
          mesaj: "Your patent application was completed on time; the invention is now legally yours.",
          detay: "Some safeguards come at just the right moment.",
        },
        basarisizSonuc: {
          mesaj: "Bureaucracy wore you out during the application process and you could not secure full protection.",
          detay: "Some protections stay incomplete.",
        },
      },
      {
        metin: "Ignore it; do not spoil the business relationship.",
        ipucu: "It looks safe but carries a great risk",
        basariliSonuc: {
          mesaj: "Luckily nothing was stolen this time; but an unease remained inside you.",
          detay: "You were lucky this time.",
        },
        basarisizSonuc: {
          mesaj: "The rival factory owner stole part of your design and put out a similar product within months.",
          detay: "Some negligence costs very dearly.",
        },
      },
    ],
  },
  yolculuk_mucit_sanayici_3: {
    baslik: "A Production Agreement",
    metin: "The largest factory owner offers a massive agreement to put your invention into mass production — but he puts production speed above everything, leaving quality and worker safety in second place.",
    secenekler: [
      {
        metin: "Sign the agreement; choose fast growth.",
        ipucu: "Great fortune but it has a moral price",
        basariliSonuc: {
          mesaj: "The agreement was signed; your invention went into mass production in the factories and your fortune multiplied.",
          detay: "Some wealth comes at the cost of quality sacrificed for speed.",
        },
        basarisizSonuc: {
          mesaj: "Production started troubled and a few defective batches were recalled, but the agreement still turned a profit.",
          detay: "Speed sometimes overshadows quality.",
        },
      },
      {
        metin: "Insist on quality and safe production; make a smaller agreement.",
        ipucu: "Less gain but your conscience and your invention's reputation are protected",
        basariliSonuc: {
          mesaj: "You insisted on your terms; you came to an agreement with a smaller but solid factory owner.",
          detay: "Some gains grow slow but solid.",
        },
        basarisizSonuc: {
          mesaj: "Your insistence put off most factory owners; finding an agreement was harder than you expected.",
          detay: "Being principled sometimes weakens your bargaining power.",
        },
      },
    ],
  },
  yolculuk_mucit_donus: {
    baslik: "At the End of the Tour",
    metin: "The tour is over. Your invention's fate is now becoming clear: the newspapers, your colleagues, and your rivals are all talking about you. Now it is time to go home, to your workshop.",
    secenekler: [
      {
        metin: "Start a new invention with what you earned.",
        ipucu: "An ambitious but wearying fresh start",
        basariliSonuc: {
          mesaj: "You went back to your workshop and immediately chased a new idea; this tour opened a new horizon for you.",
          detay: "When one invention ends, the mind is already looking for the next.",
        },
        basarisizSonuc: {
          mesaj: "Throwing yourself straight into a new idea wore you out; you realized you needed to rest for a while.",
          detay: "Not every ambition matches the body's pace.",
        },
      },
      {
        metin: "Rest for a while; enjoy the reputation you earned.",
        ipucu: "Peaceful but who knows if opportunities will wait",
        basariliSonuc: {
          mesaj: "You gave yourself time; the weariness of the tour slowly fell away.",
          detay: "The taste of some victories is savored by resting.",
        },
        basarisizSonuc: {
          mesaj: "Though you tried to rest, your mind was still on the tour and you could not find full peace.",
          detay: "Some excitements do not die down easily.",
        },
      },
    ],
  },

  // --- "Too few events" pass, Phase 3 (Path A): pooled alternates for the
  // middle step of each Hajj religion×route chain (see server-side comment).
  hac_sunni_kara_2b: {
    baslik: "A Dream",
    metin: "At the night's camp, an elderly pilgrim says he dreamed the pass ahead is dangerous, and asks the caravan master to try a longer, alternate route.",
    secenekler: [
      {
        metin: "Heed the dream; take the longer but safer road.",
        ipucu: "A loss of time, but caution is never wasted",
        basariliSonuc: {
          mesaj: "You took the long road; the crossing was tiring but calm.",
          detay: "Some instincts are worth resting on.",
        },
        basarisizSonuc: {
          mesaj: "The long road proved even more exhausting than expected, and the caravan fell behind.",
          detay: "Caution is not always free.",
        },
      },
      {
        metin: "Ignore the dream; continue on the planned short pass.",
        ipucu: "Fast but risky",
        basariliSonuc: {
          mesaj: "The pass was crossed without incident; the caravan pressed on without losing time.",
          detay: "Sometimes instincts are wrong.",
        },
        basarisizSonuc: {
          mesaj: "A rockslide really did happen at the pass; you continued on with a few injured.",
          detay: "You should have listened to the old pilgrim.",
        },
      },
    ],
  },
  hac_sunni_deniz_2b: {
    baslik: "Sickness Aboard",
    metin: "A feverish illness has broken out among several passengers on deck. The captain wants to isolate the sick in a separate hold, but some pilgrims object.",
    secenekler: [
      {
        metin: "Back the captain; have the sick isolated.",
        ipucu: "Harsh but protects the ship",
        basariliSonuc: {
          mesaj: "The isolation worked; the illness died out before spreading.",
          detay: "A hard call, but it saved the ship.",
        },
        basarisizSonuc: {
          mesaj: "Despite the isolation, the illness spread to a few more people.",
          detay: "Some precautions fall short.",
        },
      },
      {
        metin: "Tend to the sick yourself; don't leave their side.",
        ipucu: "Compassionate but risky",
        basariliSonuc: {
          mesaj: "You tended to the sick through the night; by morning their fevers had broken.",
          detay: "Your kindness is the talk of the ship.",
        },
        basarisizSonuc: {
          mesaj: "Caring for the sick, you caught a mild fever yourself — but they recovered.",
          detay: "You paid for your kindness with your own body.",
        },
      },
    ],
  },
  hac_katolik_kara_2b: {
    baslik: "Bandit Threat",
    metin: "In a narrow valley, an armed band of bandits blocks the caravan's path, demanding a heavy 'toll' for passage.",
    secenekler: [
      {
        metin: "Pay what they ask; save the caravan.",
        ipucu: "Costly but safe",
        basariliSonuc: {
          mesaj: "You made the payment; the bandits let you pass.",
          detay: "Some prices are only money.",
        },
        basarisizSonuc: {
          mesaj: "Despite the payment, the bandits seized a few more belongings.",
          detay: "Some deals get broken one-sidedly.",
        },
      },
      {
        metin: "Resist with the caravan master's armed men.",
        ipucu: "Free but dangerous",
        basariliSonuc: {
          mesaj: "After a brief clash, the bandits retreated.",
          detay: "Your courage will be talked about among the caravan.",
        },
        basarisizSonuc: {
          mesaj: "The clash went badly; you continued on with the wounded and lost belongings.",
          detay: "Resisting doesn't always pay off.",
        },
      },
    ],
  },
  hac_katolik_deniz_2b: {
    baslik: "A Shady Harbor",
    metin: "The ship anchors unexpectedly at a port; as cargo is quietly unloaded in the dark, it becomes clear the captain is dealing in smuggling.",
    secenekler: [
      {
        metin: "Look away; retreat to your own cabin.",
        ipucu: "Safe but weighs on your conscience",
        basariliSonuc: {
          mesaj: "You acted as if you'd seen nothing; the ship set sail before dawn.",
          detay: "Some things are easier not to know.",
        },
        basarisizSonuc: {
          mesaj: "Though you tried to look away, your conscience found no peace.",
          detay: "Silence is sometimes a heavy burden.",
        },
      },
      {
        metin: "Openly confront the captain; demand he stop.",
        ipucu: "Virtuous but risky",
        basariliSonuc: {
          mesaj: "The captain heeded you, had the cargo reloaded, and continued on.",
          detay: "Speaking up worked.",
        },
        basarisizSonuc: {
          mesaj: "The captain scolded you and sent you to your cabin; the smuggling continued anyway.",
          detay: "Not every objection changes anything.",
        },
      },
    ],
  },
  hac_ortodoks_kara_2b: {
    baslik: "The Relic Bearer",
    metin: "An elderly monk you meet on the road asks for your help delivering a holy relic safely to a monastery — a small detour from the caravan's route.",
    secenekler: [
      {
        metin: "Agree, and deliver the relic to the monastery.",
        ipucu: "A holy task, at the cost of a little time",
        basariliSonuc: {
          mesaj: "You delivered the relic safely; the monastery's monks sent you off with prayers.",
          detay: "Some tasks are holier than the road itself.",
        },
        basarisizSonuc: {
          mesaj: "The road proved harder than expected, but you delivered the relic all the same.",
          detay: "You paid for your kindness with your own body.",
        },
      },
      {
        metin: "Politely decline and continue with the caravan.",
        ipucu: "Safe, but leaves a lingering regret",
        basariliSonuc: {
          mesaj: "You gently said no to the monk; the caravan moved on without losing time.",
          detay: "You don't have to take on every task.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal saddened the monk; his gaze still lingers in your mind.",
          detay: "Some refusals leave a mark.",
        },
      },
    ],
  },
  hac_ortodoks_deniz_2b: {
    baslik: "A Birth at Sea",
    metin: "The wife of one of the pilgrims aboard has gone into labor; there is no experienced midwife on the ship, and every eye turns to you.",
    secenekler: [
      {
        metin: "Do your best; help with the birth.",
        ipucu: "A great risk, but the congregation is with you",
        basariliSonuc: {
          mesaj: "A healthy baby was born; cries of joy rose on deck.",
          detay: "This journey will now also be remembered for a birth.",
        },
        basarisizSonuc: {
          mesaj: "You did your best, but the labor was very hard; everyone was shaken.",
          detay: "Some nights are never forgotten.",
        },
      },
      {
        metin: "Admit your inexperience; just pray.",
        ipucu: "Safe but a passive choice",
        basariliSonuc: {
          mesaj: "While you prayed on the side, a woman aboard helped with the birth; everything went fine.",
          detay: "Sometimes the best help is stepping aside.",
        },
        basarisizSonuc: {
          mesaj: "The birth was difficult; you could only watch from the side.",
          detay: "Being unable to help wore you down.",
        },
      },
    ],
  },
  hac_anglikan_deniz_2b: {
    baslik: "Off Course",
    metin: "During a night storm the compass broke; by morning the ship realizes it has drifted seriously off course. The captain offers two options.",
    secenekler: [
      {
        metin: "Follow the safe but long backup route.",
        ipucu: "A loss of time but safe",
        basariliSonuc: {
          mesaj: "The backup route added a few days, but you proceeded without incident.",
          detay: "Patience is sometimes the fastest road.",
        },
        basarisizSonuc: {
          mesaj: "The backup route proved harder than expected too; morale dropped among everyone.",
          detay: "Some days simply pass slowly, patience or not.",
        },
      },
      {
        metin: "Try the shortcut, through unknown waters.",
        ipucu: "Risky but fast",
        basariliSonuc: {
          mesaj: "You bravely crossed the unknown waters; the lost time was made up.",
          detay: "Your courage will be talked about among the crew.",
        },
        basarisizSonuc: {
          mesaj: "The ship scraped against a shallow reef; everyone spent a frightening night.",
          detay: "Shortcuts sometimes cost more.",
        },
      },
    ],
  },
  hac_anglikan_kara_2b: {
    baslik: "The Dried-Up Well",
    metin: "You discover the well along the road has run completely dry; the nearest water source is a day away, but a local shepherd offers you a hidden shortcut.",
    secenekler: [
      {
        metin: "Trust the shepherd's shortcut.",
        ipucu: "Fast but an unknown path",
        basariliSonuc: {
          mesaj: "The shortcut really worked; the caravan continued on with fresh water.",
          detay: "Sometimes trusting a stranger pays off.",
        },
        basarisizSonuc: {
          mesaj: "The shortcut led you the wrong way; you spent an extra day without water.",
          detay: "Not every shortcut turns out as hoped.",
        },
      },
      {
        metin: "Continue on the known, longer but safe road.",
        ipucu: "Slow but safe",
        basariliSonuc: {
          mesaj: "You reached the water source by the long road; everyone tired but safe.",
          detay: "The known road rarely disappoints.",
        },
        basarisizSonuc: {
          mesaj: "The long road proved even more exhausting than expected, and the thirst grew worse.",
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
    metin: "A local shepherd says he can show the army a safer mountain pass than the one it knows — asking only a few coins in return. The commanders debate whether to trust him.",
    secenekler: [
      {
        metin: "Trust the guide; accept the offer.",
        ipucu: "Risky, but could save time",
        basariliSonuc: {
          mesaj: "The guide told the truth; the pass really was safer.",
          detay: "Sometimes trusting a stranger pays off.",
        },
        basarisizSonuc: {
          mesaj: "The guide led you into an ambush; you escaped with the loss of a few soldiers.",
          detay: "Not every stranger means well.",
        },
      },
      {
        metin: "Refuse; continue on the known but long road.",
        ipucu: "Slow but safe",
        basariliSonuc: {
          mesaj: "You advanced on the known road; a tiring but uneventful crossing.",
          detay: "Caution sometimes takes patience.",
        },
        basarisizSonuc: {
          mesaj: "The long road proved even more exhausting than expected, and the army wore down.",
          detay: "Some roads are simply long.",
        },
      },
    ],
  },
  oc_hacli_deniz_2b: {
    baslik: "Pirate Attack at Sea",
    metin: "Ships flying pirate colors appear on the horizon. Should the captain form the fleet into a defensive line, or try to outrun them with the faster ships?",
    secenekler: [
      {
        metin: "Form the fleet up and fight back.",
        ipucu: "Risky but honorable",
        basariliSonuc: {
          mesaj: "After a brief clash, the pirates withdrew.",
          detay: "Your courage will be talked about in the fleet.",
        },
        basarisizSonuc: {
          mesaj: "The clash went badly; you continued on with some losses and looted holds.",
          detay: "Resisting doesn't always pay off.",
        },
      },
      {
        metin: "Try to flee with the fastest ships.",
        ipucu: "Safe but the fleet may scatter",
        basariliSonuc: {
          mesaj: "The fleet got away from the pirates without scattering.",
          detay: "Sometimes fleeing is the wisest choice.",
        },
        basarisizSonuc: {
          mesaj: "The slowest ship was caught and looted while fleeing; the rest got away.",
          detay: "Not every escape saves everyone.",
        },
      },
    ],
  },
  sd_somurge_diplomasi_2b: {
    baslik: "A Local Dispute",
    metin: "A land dispute between the settlers and the local people is growing. Both sides ask you to mediate.",
    secenekler: [
      {
        metin: "Propose a fair compromise; hear both sides out.",
        ipucu: "Takes time but earns respect",
        basariliSonuc: {
          mesaj: "Your compromise satisfied both sides; your name is spoken of with respect in the region.",
          detay: "Justice is sometimes the best diplomacy.",
        },
        basarisizSonuc: {
          mesaj: "Your mediation attempt failed; neither side was pleased with you.",
          detay: "Not every mediation succeeds.",
        },
      },
      {
        metin: "Side with the settlers; decide quickly.",
        ipucu: "Fast but weighs on your conscience",
        basariliSonuc: {
          mesaj: "The settlers were pleased with your decision and sent you a gift.",
          detay: "Some decisions are quick but wear on the conscience.",
        },
        basarisizSonuc: {
          mesaj: "Your decision only made the tension worse; both sides left angry.",
          detay: "Hasty decisions sometimes backfire.",
        },
      },
    ],
  },
  sd_somurge_askeri_2b: {
    baslik: "A Night Raid",
    metin: "The sentries have noticed suspicious movement around the camp. There is talk that a local resistance group may be preparing a night raid.",
    secenekler: [
      {
        metin: "Prepare the camp's defenses; tighten the watch.",
        ipucu: "Cautious but an exhausting night",
        basariliSonuc: {
          mesaj: "The raid attempt was repelled by the tight watch.",
          detay: "Caution paid off tonight.",
        },
        basarisizSonuc: {
          mesaj: "The raid was fiercer than expected; you met the morning with a few wounded.",
          detay: "Not every precaution is enough.",
        },
      },
      {
        metin: "Take the initiative; scout the suspicious area yourself.",
        ipucu: "Risky but brings certain intelligence",
        basariliSonuc: {
          mesaj: "Your scouting revealed there was no real threat; the camp settled down.",
          detay: "Sometimes looking directly is best.",
        },
        basarisizSonuc: {
          mesaj: "You actually ran into a real clash while scouting; you returned wounded but alive.",
          detay: "Courage sometimes has a price.",
        },
      },
    ],
  },
  yolculuk_savunma_kara_2b: {
    baslik: "Spy Suspicion",
    metin: "Rumors are spreading that a spy leaking information to the enemy may be within the unit. Suspicion falls on a new soldier.",
    secenekler: [
      {
        metin: "Launch a fair investigation; gather evidence.",
        ipucu: "Takes time but preserves justice",
        basariliSonuc: {
          mesaj: "The investigation showed the soldier was innocent; trust within the unit grew.",
          detay: "Justice can be worth more than discipline.",
        },
        basarisizSonuc: {
          mesaj: "The investigation reached no conclusion, but the air of suspicion strains the unit.",
          detay: "Some suspicions never close.",
        },
      },
      {
        metin: "Detain the suspect immediately; interrogate.",
        ipucu: "Fast but harsh",
        basariliSonuc: {
          mesaj: "The harsh interrogation revealed the real spy was someone else.",
          detay: "Speed sometimes works.",
        },
        basarisizSonuc: {
          mesaj: "An innocent soldier suffered a harsh interrogation; unease grew within the unit.",
          detay: "Harshness sometimes hits the wrong target.",
        },
      },
    ],
  },
  yolculuk_savunma_deniz_2b: {
    baslik: "Naval Blockade",
    metin: "Enemy ships have blockaded the way to the harbor. The ships must either break through the blockade line or try a long, roundabout route.",
    secenekler: [
      {
        metin: "Try to break through the blockade line.",
        ipucu: "Risky but fast",
        basariliSonuc: {
          mesaj: "A bold maneuver broke the blockade; the fleet got through safely.",
          detay: "Your courage will be talked about among the crew.",
        },
        basarisizSonuc: {
          mesaj: "The blockade line was tighter than thought; you got through with heavy damage.",
          detay: "Not every maneuver turns out as hoped.",
        },
      },
      {
        metin: "Follow the long, roundabout route.",
        ipucu: "Slow but safe",
        basariliSonuc: {
          mesaj: "The roundabout route took time but the fleet advanced undamaged.",
          detay: "Patience is sometimes the safest weapon.",
        },
        basarisizSonuc: {
          mesaj: "The roundabout route also ran into a storm; everyone was worn out.",
          detay: "Some days are simply hard.",
        },
      },
    ],
  },
  yolculuk_kesif_kara_2b: {
    baslik: "A Lost Map",
    metin: "The caravan's guide has discovered a valley unmarked on any old map; he thinks there may be a rare mineral deposit here, but straying off route costs time.",
    secenekler: [
      {
        metin: "Make a small detour to investigate the valley.",
        ipucu: "Risky but a chance of great reward",
        basariliSonuc: {
          mesaj: "You really did find a valuable mineral deposit in the valley; your discovery went into the record.",
          detay: "Some detours bring great rewards.",
        },
        basarisizSonuc: {
          mesaj: "The valley turned out empty; morale dropped along with the lost time.",
          detay: "Not every trail leads to treasure.",
        },
      },
      {
        metin: "Stick to the plan, no detour.",
        ipucu: "Safe but risks missing an opportunity",
        basariliSonuc: {
          mesaj: "You stuck to the plan; the caravan advanced on schedule.",
          detay: "Some opportunities are worth letting go.",
        },
        basarisizSonuc: {
          mesaj: "Despite the guide's insistence you gave it up; there's mild disappointment in the caravan.",
          detay: "Caution sometimes leaves dissatisfaction.",
        },
      },
    ],
  },
  yolculuk_kesif_deniz_2b: {
    baslik: "An Uncharted Island",
    metin: "A small island unmarked on any map has been sighted. Does the crew want to land and explore it, or continue the voyage?",
    secenekler: [
      {
        metin: "Land and explore the island.",
        ipucu: "Risky but the find could be valuable",
        basariliSonuc: {
          mesaj: "The island was full of a valuable resource not on any map; your discovery will be talked about.",
          detay: "Some islands give up their secrets generously.",
        },
        basarisizSonuc: {
          mesaj: "The island turned out dangerous; you returned to the ship with some wounded.",
          detay: "Not every discovery is safe.",
        },
      },
      {
        metin: "Note the island's location; continue the voyage.",
        ipucu: "Safe but defers the opportunity",
        basariliSonuc: {
          mesaj: "You noted the island's location; maybe for another voyage.",
          detay: "Some discoveries are worth waiting for.",
        },
        basarisizSonuc: {
          mesaj: "The crew was disappointed by the decision, but the voyage went on.",
          detay: "Caution sometimes dampens morale.",
        },
      },
    ],
  },
  yolculuk_mucit_saray_2b: {
    baslik: "A Jealous Rival Inventor",
    metin: "Another inventor at court is spreading rumors that your invention was actually his idea. The matter has begun circulating among the nobles.",
    secenekler: [
      {
        metin: "Disprove the claim with a public demonstration.",
        ipucu: "Risky but clears your reputation",
        basariliSonuc: {
          mesaj: "The demonstration disproved the claims; it became clear you are the true inventor.",
          detay: "Some claims are only silenced by proof.",
        },
        basarisizSonuc: {
          mesaj: "The demonstration went wrong; the rumors grew even bigger.",
          detay: "Not every challenge works.",
        },
      },
      {
        metin: "Ignore it; focus on your work.",
        ipucu: "Safe but the rumor may linger",
        basariliSonuc: {
          mesaj: "You ignored the rumor; over time it died down on its own.",
          detay: "Some noise is best left to fade.",
        },
        basarisizSonuc: {
          mesaj: "Though ignored, the rumor kept circulating for a while longer.",
          detay: "Some voices don't quiet down easily.",
        },
      },
    ],
  },
  yolculuk_mucit_sanayici_2b: {
    baslik: "A Factory Accident",
    metin: "During a factory demonstration, one of the machines overheats and begins hissing dangerously. As the workers panic, you must decide.",
    secenekler: [
      {
        metin: "Approach the machine yourself and try to stop it.",
        ipucu: "Risky but heroic",
        basariliSonuc: {
          mesaj: "You stopped the machine in time; the workers applauded you.",
          detay: "Your courage will be talked about in the factory.",
        },
        basarisizSonuc: {
          mesaj: "Your intervention didn't work; a small blast injured you but no one died.",
          detay: "Not every act of heroism is rewarded.",
        },
      },
      {
        metin: "Have everyone evacuated; leave it to the factory workers.",
        ipucu: "Safe but a passive choice",
        basariliSonuc: {
          mesaj: "The evacuation went smoothly; the factory workers brought the machine under control.",
          detay: "Sometimes the best help is stepping aside.",
        },
        basarisizSonuc: {
          mesaj: "Some equipment was damaged during the evacuation, and you had to pay compensation.",
          detay: "Some accidents cost money.",
        },
      },
    ],
  },
};
