import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/gecikmisTakip.ts — İngilizce çevirileri (90 olay: 30 tetikleyici + 60 sonuç). */
export const OLAYLAR_GECIKMIS_TAKIP_EN: Record<string, OlayCeviri> = {
  // ============================================================
  // ORTA ÇAĞ (15 tema × 3)
  // ============================================================

  gt_oc01_dilenci: {
    baslik: "The Beggar in the Street",
    metin: "At the entrance to the market square, an old beggar in tattered clothes holds out his hand to you. There's a strange dignity in his eyes — neither pleading nor begging.",
    secenekler: [
      { metin: "Hand him the few coins in your pocket.", basariliSonuc: { mesaj: "You handed the beggar a few coins; you saw a spark of hope in his eyes as he thanked you sincerely." } },
      { metin: "Shrug and go on your way.", basariliSonuc: { mesaj: "You ignored him and went on your way; the beggar muttered something behind you." } },
    ],
  },
  gt_oc01_dilenci_iyi: {
    baslik: "The Beggar Returns",
    metin: "The beggar you once gave money to in the market has arrived at your door, dressed neatly, on horseback. He has become one of the city's wealthiest merchants — he never forgot the alms you gave that day.",
    secenekler: [
      { metin: "Accept his gratitude sincerely.", basariliSonuc: { mesaj: "The man emptied his purse before you: \"You treated me like a human being that day — I'm repaying my debt now.\"" } },
      { metin: "Humbly accept a small gift instead.", basariliSonuc: { mesaj: "You turned down the large gift and settled for a small one; the man was struck by your humility." } },
    ],
  },
  gt_oc01_dilenci_kotu: {
    baslik: "The Beggar Who Never Forgot",
    metin: "The beggar you ignored that day has shown up at your door, shaming you in front of the crowd: \"This man wouldn't spare me even a crumb!\"",
    secenekler: [
      { metin: "Apologize to him, hand over what money you have.", basariliSonuc: { mesaj: "You apologized and handed over what money you had; the crowd dispersed, but you were left in shame." } },
      { metin: "Stand your ground, don't back down.", basariliSonuc: { mesaj: "You didn't back down; but the crowd kept talking about you, and your name suffered for a while." } },
    ],
  },

  gt_oc02_yarali_yolcu: {
    baslik: "The Injured Man by the Road",
    metin: "By the city road, a traveler lies robbed and beaten. No one stops to look at him; everyone turns their head and walks past.",
    secenekler: [
      { metin: "Take him to your home and tend to his wounds.", basariliSonuc: { mesaj: "You took the injured man to your home and tended his wounds; a few days later he recovered and went on his way." } },
      { metin: "Turn your head and walk past like the others.", basariliSonuc: { mesaj: "You turned your head and walked past like everyone else; your conscience troubled you for a while." } },
    ],
  },
  gt_oc02_yarali_yolcu_iyi: {
    baslik: "The Recovered Traveler's Visit",
    metin: "The traveler whose wounds you tended that day is now a respected physician in the region. He arrives at your door and says he wants to personally look after your health and your family's.",
    secenekler: [
      { metin: "Gladly accept his offer.", basariliSonuc: { mesaj: "The physician examined you from head to toe and left valuable medicines; you felt healthier than you had in years." } },
      { metin: "Just talk with him, save the treatment for someone else.", basariliSonuc: { mesaj: "You directed the treatment to someone more in need; the physician admired the gesture, and your friendship grew stronger." } },
    ],
  },
  gt_oc02_yarali_yolcu_kotu: {
    baslik: "The Grudge-Bearing Stranger",
    metin: "The injured man you didn't help that day recovered — but he holds a grudge. He's now an influential man in the city, spreading dark rumors about you.",
    secenekler: [
      { metin: "Try to disprove the rumors.", basariliSonuc: { mesaj: "You spent a fair amount of money and time trying to disprove the rumors, without fully succeeding." } },
      { metin: "Don't bother, say it will be forgotten in time.", basariliSonuc: { mesaj: "You ignored it, but the rumors clung on for a while, and your name took a small hit." } },
    ],
  },

  gt_oc03_bogulan_cocuk: {
    baslik: "The Drowning Child in the River",
    metin: "Passing by the riverbank, you see a small child swept up by the current, thrashing in the water. No one else moves.",
    secenekler: [
      { metin: "Throw yourself into the water, save the child.", basariliSonuc: { mesaj: "You threw yourself into the cold water and pulled the child from drowning at the last moment; the family thanked you through tears." } },
      { metin: "You can't bring yourself to go in, just watch.", basariliSonuc: { mesaj: "You couldn't bring yourself to go into the water; luckily someone else got there in time, but you always felt guilty." } },
    ],
  },
  gt_oc03_bogulan_cocuk_iyi: {
    baslik: "The Child You Saved Grew Up",
    metin: "The child you pulled from the river years ago is now a respected commander/guild master in the region. They say they never forgot you, and will be by your side whenever you need them.",
    secenekler: [
      { metin: "Gladly accept their patronage.", basariliSonuc: { mesaj: "You gained an influential friend; your name began to be spoken of with respect in the city." } },
      { metin: "Accept only their gratitude, ask for nothing more.", basariliSonuc: { mesaj: "You didn't ask for anything extra, just remembered that day together; you felt a deep peace inside." } },
    ],
  },
  gt_oc03_bogulan_cocuk_kotu: {
    baslik: "The Guilt Returns",
    metin: "You always blamed yourself for not going into the water that day. Now you've run into the child's family; the disappointment in the man's eyes is still there.",
    secenekler: [
      { metin: "Finally apologize, get it off your chest.", basariliSonuc: { mesaj: "Years later, you apologized; even without full forgiveness, the weight inside you lifted a little." } },
      { metin: "Close the subject, don't dig up the past.", basariliSonuc: { mesaj: "You closed the subject, but that look stayed on your mind for a long time." } },
    ],
  },

  gt_oc04_tuccar_borc: {
    baslik: "A Merchant in a Hard Time",
    metin: "A young merchant you know is on the verge of bankruptcy after his caravan was robbed. He asks you for a loan, swearing he'll pay you back honestly.",
    secenekler: [
      { metin: "Lend him the money.", basariliSonuc: { mesaj: "You lent him money from your own savings; his eyes held both hope and shame." } },
      { metin: "You can't risk it, refuse.", basariliSonuc: { mesaj: "You couldn't risk it and refused; the man went off to try other doors." } },
    ],
  },
  gt_oc04_tuccar_borc_iyi: {
    baslik: "The Wealthy Merchant's Loyalty",
    metin: "The young merchant you lent money to that day now travels between cities with his own caravans, a wealthy man. He returned your loan many times over, with interest.",
    secenekler: [
      { metin: "Accept the repayment in full, and then some.", basariliSonuc: { mesaj: "He repaid you threefold: \"I wouldn't have survived that day without you,\" he said." } },
      { metin: "Take only the principal back, refuse the rest.", basariliSonuc: { mesaj: "You didn't want more than what was owed; the man admired your attitude and became a lifelong friend." } },
    ],
  },
  gt_oc04_tuccar_borc_kotu: {
    baslik: "The Rejected Merchant's Grudge",
    metin: "The merchant you didn't lend to that day went bankrupt, then clawed his way back into a rival business — and now competes with you in the very same market, still resenting you.",
    secenekler: [
      { metin: "Try to mend things between you.", basariliSonuc: { mesaj: "You tried to mend things between you, and partly succeeded, but it cost you a fair amount." } },
      { metin: "Brace yourself for the competition.", basariliSonuc: { mesaj: "You braced yourself for the competition; the struggle in the market wore on you too." } },
    ],
  },

  gt_oc05_yetim_himaye: {
    baslik: "An Orphan Alone",
    metin: "A small orphan, having lost their family to plague or war, waits at your door, hungry and cold. There's no one to look after them.",
    secenekler: [
      { metin: "Take them into your home, become their guardian.", basariliSonuc: { mesaj: "You took the little orphan into your home, giving them a roof and a warm meal." } },
      { metin: "You have troubles of your own, turn them away.", basariliSonuc: { mesaj: "You decided your own troubles were enough and turned the child away; they didn't look back as they walked from your door." } },
    ],
  },
  gt_oc05_yetim_himaye_iyi: {
    baslik: "The Orphan You Raised Grew Up",
    metin: "The orphan you took in years ago now stands on their own two feet, a respected craftsman/soldier. They've come to visit, carrying a carefully prepared gift.",
    secenekler: [
      { metin: "Invite them in, celebrate together.", basariliSonuc: { mesaj: "You reminisced about the old days together; you felt as proud of them as if they were your own." } },
      { metin: "Don't ask for their help, just be glad to see them.", basariliSonuc: { mesaj: "You asked for nothing in return; seeing them grow into a good person was enough for you." } },
    ],
  },
  gt_oc05_yetim_himaye_kotu: {
    baslik: "Anger Raised on the Street",
    metin: "The orphan you turned away that day grew up on the streets and fell in with the city's dark circles. Now they've come to collect the price of the kindness you once withheld.",
    secenekler: [
      { metin: "Give them what they want to save your own skin.", basariliSonuc: { mesaj: "You gave them what they wanted to save your own skin; but a threat like this shook you badly." } },
      { metin: "Refuse to bow to the threats.", basariliSonuc: { mesaj: "You refused to bow; the man lingered around you for a while, keeping you on edge." } },
    ],
  },

  gt_oc06_esir_cocuk: {
    baslik: "A Child from the Enemy Ranks",
    metin: "After a clash, a small child from the enemy ranks has been taken captive. The soldiers ask you what should be done with them.",
    secenekler: [
      { metin: "Show mercy, arrange for their safe return to their family.", basariliSonuc: { mesaj: "You showed mercy to the child and made sure they were sent safely back to their own side." } },
      { metin: "It's the way of war, don't get involved.", basariliSonuc: { mesaj: "You told yourself it was the way of war and didn't get involved; you never learned what became of the child." } },
    ],
  },
  gt_oc06_esir_cocuk_iyi: {
    baslik: "The Old Enemy's Gratitude",
    metin: "The child you showed mercy to that day has grown into an important leader on the enemy side. Now they send you a token of gratitude and an offer of peace through envoys.",
    secenekler: [
      { metin: "Accept the gift and the offer of peace.", basariliSonuc: { mesaj: "You accepted the gift; thanks to you, a small bridge of peace was built between the two sides." } },
      { metin: "Accept only the message of friendship.", basariliSonuc: { mesaj: "You returned the material gift and accepted only the friendship; this gesture earned you respect on both sides." } },
    ],
  },
  gt_oc06_esir_cocuk_kotu: {
    baslik: "A Growing Vengeance",
    metin: "The child you abandoned to their fate that day has grown into a powerful enemy commander, and is now planning a raid with you as the target.",
    secenekler: [
      { metin: "Strengthen your defenses, prepare for the threat.", basariliSonuc: { mesaj: "Strengthening your defenses was costly and exhausting, but you fended off the worst of it." } },
      { metin: "Try to appease them through diplomacy.", basariliSonuc: { mesaj: "You tried to appease them through diplomacy; you partly succeeded, but your reputation took a small hit." } },
    ],
  },

  gt_oc07_kesise_sadaka: {
    baslik: "A Hungry Monk",
    metin: "By the roadside, a young monk who hasn't eaten in days asks you for alms, offering a prayer in return.",
    secenekler: [
      { metin: "Give him food and a few coins.", basariliSonuc: { mesaj: "You gave the monk food and a few coins; he offered you a heartfelt prayer." } },
      { metin: "Mind your own business, don't bother.", basariliSonuc: { mesaj: "You minded your own business and didn't bother; the monk went silently on his way." } },
    ],
  },
  gt_oc07_kesise_sadaka_iyi: {
    baslik: "The Monastery's Gratitude",
    metin: "The young monk you fed that day is now the abbot of an influential monastery. He informs you that the monastery's doors will always be open to you, and that he'll help you whenever you're in need.",
    secenekler: [
      { metin: "Accept the monastery's patronage.", basariliSonuc: { mesaj: "The monastery took you under its wing; you began to be spoken of among the people as an honest, generous man." } },
      { metin: "Accept only his friendship, ask for no patronage.", basariliSonuc: { mesaj: "You accepted only his friendship without asking for patronage; the bond between you lasted for years." } },
    ],
  },
  gt_oc07_kesise_sadaka_kotu: {
    baslik: "The Church's Cold Stare",
    metin: "The monk you turned away that day now holds an influential position in the monastery. Rumors are spreading that you're a stingy, merciless man.",
    secenekler: [
      { metin: "Make amends with a large donation to the church.", basariliSonuc: { mesaj: "You tried to make amends with a large donation; the rumors died down after a while." } },
      { metin: "Ignore it, wait for the gossip to pass.", basariliSonuc: { mesaj: "You ignored it, but the gossip circulated among the congregation for a while." } },
    ],
  },

  gt_oc08_hasta_yabanci: {
    baslik: "A Stranger Falls Ill",
    metin: "A stranger staying at the caravanserai lies burning with fever. No one wants to go near him, afraid it might be something contagious.",
    secenekler: [
      { metin: "Go to him, give him care.", basariliSonuc: { mesaj: "Ignoring the fear, you went to him and gave him care; within a few days he was back on his feet." } },
      { metin: "Don't take the risk, keep your distance.", basariliSonuc: { mesaj: "You didn't take the risk and kept your distance; you never learned what became of the man." } },
    ],
  },
  gt_oc08_hasta_yabanci_iyi: {
    baslik: "The Recovered Stranger's Word",
    metin: "The stranger whose care you took on that day turns out to be a respected nobleman. He now sends you a letter, saying he wishes to host you at his court.",
    secenekler: [
      { metin: "Accept the invitation, go to his court.", basariliSonuc: { mesaj: "You accepted the invitation; he hosted you generously and spoke your name with praise among his circle." } },
      { metin: "Thank him kindly, but don't go.", basariliSonuc: { mesaj: "You chose not to go, but built a warm friendship through letters." } },
    ],
  },
  gt_oc08_hasta_yabanci_kotu: {
    baslik: "The Dead Stranger's Family",
    metin: "The stranger you kept your distance from that day died, since no one cared for him. Now his family has come to ask why you left him alone.",
    secenekler: [
      { metin: "Tell them honestly what happened, apologize.", basariliSonuc: { mesaj: "You told them honestly what happened; the family left resentful, but at least you didn't lie." } },
      { metin: "Don't take on the blame.", basariliSonuc: { mesaj: "You didn't take on the blame; the family never forgot it, and your name was spoken of poorly for a while." } },
    ],
  },

  gt_oc09_gezgin_fal: {
    baslik: "A Traveling Fortune-Teller",
    metin: "A traveling fortune-teller who has come to town asks for a few coins to read your palm. The people around eye her with suspicion.",
    secenekler: [
      { metin: "Give in to curiosity, pay the coin.", basariliSonuc: { mesaj: "You gave in to curiosity and paid the coin; the woman looked at your palm and whispered a few mysterious words." } },
      { metin: "Call it superstition, walk away.", basariliSonuc: { mesaj: "You called it superstition and walked away; the woman shrugged and turned to someone else." } },
    ],
  },
  gt_oc09_gezgin_fal_iyi: {
    baslik: "The Fortune-Teller's True Warning",
    metin: "Years ago, the woman whose palm you had her read turned out to have truly sharp instincts. Now she appears before you, warning of a real danger approaching.",
    secenekler: [
      { metin: "Take her warning seriously, take precautions.", basariliSonuc: { mesaj: "You took her warning seriously and took precautions; you narrowly avoided a great misfortune that could have befallen you." } },
      { metin: "Stay skeptical, but listen anyway.", basariliSonuc: { mesaj: "Even without fully believing it, you kept her words in mind; they proved useful in the days that followed." } },
    ],
  },
  gt_oc09_gezgin_fal_kotu: {
    baslik: "She Turned Out to Be a Fraud",
    metin: "The woman you called superstition and walked away from turned out to be a skilled con artist. Now it's come to light that she's been using your name to deceive people around you.",
    secenekler: [
      { metin: "Work to clear your name.", basariliSonuc: { mesaj: "You worked hard to clear your name, and partly succeeded, but it cost you dearly." } },
      { metin: "Let it go, it will be forgotten on its own.", basariliSonuc: { mesaj: "You let it go, but the rumor clung on for a while." } },
    ],
  },

  gt_oc10_ciraklik: {
    baslik: "A Talented Apprentice Candidate",
    metin: "The son of a poor family shows you his talent with small wooden carvings, asking for a chance at an apprenticeship. Most masters have turned him away.",
    secenekler: [
      { metin: "Give him a chance, take him on as an apprentice.", basariliSonuc: { mesaj: "You gave him a chance and took him on as an apprentice; the excitement in his eyes warmed your heart." } },
      { metin: "You have no time, turn him away.", basariliSonuc: { mesaj: "You said you had no time and turned him away; the boy walked off in disappointment." } },
    ],
  },
  gt_oc10_ciraklik_iyi: {
    baslik: "The Old Apprentice Who Mastered the Craft",
    metin: "The boy you gave a chance to that day is now one of the most sought-after masters in the region. He gives you a special, valuable piece he made with his own hands.",
    secenekler: [
      { metin: "Accept the gift with pride.", basariliSonuc: { mesaj: "You accepted the gift with pride; the value of the piece, and the story behind it, moved you." } },
      { metin: "Propose working together.", basariliSonuc: { mesaj: "He accepted your proposal to work together; your partnership brought both of you added standing." } },
    ],
  },
  gt_oc10_ciraklik_kotu: {
    baslik: "The Rival Master's Shadow",
    metin: "The boy you turned away that day trained under another master, and has now become your greatest rival — taking your customers away.",
    secenekler: [
      { metin: "Improve your business to keep up with the competition.", basariliSonuc: { mesaj: "Improving your business cost you dearly; you barely managed to keep pace with the competition." } },
      { metin: "Accept the loss, scale down.", basariliSonuc: { mesaj: "You accepted the loss and scaled down your business; you missed the old days." } },
    ],
  },

  gt_oc11_esir_asker: {
    baslik: "A Captured Soldier",
    metin: "A young enemy soldier taken captive in a clash begs you for his life. The other soldiers want to execute him.",
    secenekler: [
      { metin: "Set him free.", basariliSonuc: { mesaj: "You set him free; the other soldiers were surprised, but respected your decision." } },
      { metin: "That's the rule of war, don't interfere.", basariliSonuc: { mesaj: "You said that was the rule of war and didn't interfere; you never concerned yourself with the man's fate again." } },
    ],
  },
  gt_oc11_esir_asker_iyi: {
    baslik: "The Old Captive's Loyalty",
    metin: "The young soldier you set free that day is now a respected commander in his own army. He has sought you out, wanting to repay his debt.",
    secenekler: [
      { metin: "Accept his offer of valuable help.", basariliSonuc: { mesaj: "He offered you valuable assistance: \"You spared my life, this is how I repay my debt,\" he said." } },
      { metin: "Ask only for a military tip-off/warning.", basariliSonuc: { mesaj: "You asked only for a valuable warning from him; it later saved you from a great danger." } },
    ],
  },
  gt_oc11_esir_asker_kotu: {
    baslik: "Anger That Never Faded",
    metin: "The captive soldier you didn't interfere for was executed. Years later, his family finds you and asks why you did nothing that day.",
    secenekler: [
      { metin: "Answer honestly, share their grief.", basariliSonuc: { mesaj: "You answered honestly; the family left resentful, but at least you didn't run from it." } },
      { metin: "Say it was the rule of war, move on.", basariliSonuc: { mesaj: "You said it was the rule of war and moved on; but the encounter troubled you for a long time." } },
    ],
  },

  gt_oc12_kitlik_komsu: {
    baslik: "A Neighbor in Famine",
    metin: "In a year of famine, the neighboring family's granary has run empty, their children weak with hunger. They ask you for grain.",
    secenekler: [
      { metin: "Give grain from your own granary.", basariliSonuc: { mesaj: "You gave some of your own granary to your neighbor; your own share shrank, but your conscience eased." } },
      { metin: "Your own family comes first, refuse.", basariliSonuc: { mesaj: "You said your own family came first and refused; your neighbor left with their head bowed." } },
    ],
  },
  gt_oc12_kitlik_komsu_iyi: {
    baslik: "The Recovering Neighbor's Gratitude",
    metin: "The neighbor you helped in that famine year is now one of the wealthiest farmers in the region. Every year, they set aside a share of their harvest for you.",
    secenekler: [
      { metin: "Gladly accept the yearly share.", basariliSonuc: { mesaj: "They brought their yearly share: \"You gave us life that day, and we never forgot you,\" they said." } },
      { metin: "Refuse the share, the friendship is enough.", basariliSonuc: { mesaj: "You refused the share, wanting only their friendship; this gesture strengthened the bond between you even further." } },
    ],
  },
  gt_oc12_kitlik_komsu_kotu: {
    baslik: "A Stolen Claim",
    metin: "The neighbor you refused in that famine year never forgot the slight; now grown stronger, they're trying to seize part of your field with a boundary claim.",
    secenekler: [
      { metin: "Defend your claim in court/before the guild.", basariliSonuc: { mesaj: "Defending your claim was costly, but you managed to protect your field." } },
      { metin: "Let a small portion go, avoid a fight.", basariliSonuc: { mesaj: "To avoid a fight, you let a small portion go; it stung a little inside." } },
    ],
  },

  gt_oc13_firtinada_denizci: {
    baslik: "A Sailor Fleeing the Storm",
    metin: "At the harbor lies an exhausted sailor, washed ashore fleeing a storm. His clothes are in tatters, and he recognizes no one.",
    secenekler: [
      { metin: "Take him to your home, warm him and feed him.", basariliSonuc: { mesaj: "You took the sailor to your home, warmed and fed him; a few days later he recovered and left with thanks." } },
      { metin: "Let him stay at the harbor, don't get involved.", basariliSonuc: { mesaj: "You let him stay at the harbor and didn't get involved; you never learned what became of him." } },
    ],
  },
  gt_oc13_firtinada_denizci_iyi: {
    baslik: "The Sailor Who Became Captain's Visit",
    metin: "The sailor you saved that day is now the captain of his own ship; he's dropped anchor at the harbor with a wealthy merchant fleet. He's come to find you and offer his thanks.",
    secenekler: [
      { metin: "Enter into trade with him.", basariliSonuc: { mesaj: "You entered into a small trade venture with him; your earnings grew considerably." } },
      { metin: "Accept only his friendship.", basariliSonuc: { mesaj: "You didn't enter into trade, just accepted his friendship; he visited you every time he came to port." } },
    ],
  },
  gt_oc13_firtinada_denizci_kotu: {
    baslik: "The Sunken Ship's Accusation",
    metin: "The sailor you left at the harbor that day actually died in the next storm. When his family hears you didn't help him that day, they blame you.",
    secenekler: [
      { metin: "Offer the family financial support.", basariliSonuc: { mesaj: "You tried to ease your conscience by offering the family financial support." } },
      { metin: "Don't accept the blame.", basariliSonuc: { mesaj: "You didn't accept the blame; but the memory of that night stayed with you for a long time." } },
    ],
  },

  gt_oc14_ceyiz_yardimi: {
    baslik: "A Girl Left Without a Dowry",
    metin: "A poor family's daughter cannot marry because she has no dowry. Ashamed, her family comes to ask you for help.",
    secenekler: [
      { metin: "Contribute to her dowry.", basariliSonuc: { mesaj: "You generously contributed to her dowry; the gratitude in the family's eyes was priceless." } },
      { metin: "Not your problem, refuse.", basariliSonuc: { mesaj: "You said it wasn't your problem and refused; the family left in embarrassment." } },
    ],
  },
  gt_oc14_ceyiz_yardimi_iyi: {
    baslik: "The Girl Who Married Well",
    metin: "The girl whose dowry you helped with that day has now married into a respected and wealthy family. Her father-in-law has come to pay you a visit of gratitude.",
    secenekler: [
      { metin: "Accept his visit and his gift.", basariliSonuc: { mesaj: "The father-in-law came with a valuable gift: \"We never forgot the kindness you showed our daughter,\" he said." } },
      { metin: "Accept only his well wishes.", basariliSonuc: { mesaj: "You didn't accept the gift, only his friendly visit; the family always remembered you." } },
    ],
  },
  gt_oc14_ceyiz_yardimi_kotu: {
    baslik: "The Resentful Family's Gossip",
    metin: "The family you didn't help that day had to marry off their daughter too late and under poor conditions. Now they're going around telling everyone how stingy you are.",
    secenekler: [
      { metin: "Offer help, even if it's late.", basariliSonuc: { mesaj: "You offered help, even if it was late; the family was surprised but accepted, and the gossip slowly faded." } },
      { metin: "Don't bother, leave them to it.", basariliSonuc: { mesaj: "You didn't bother, but the rumors circulated around you for a while." } },
    ],
  },

  gt_oc15_kacak_yardim: {
    baslik: "A Fugitive in Hiding",
    metin: "A fugitive knocks on your door at midnight, asking for a night's shelter and a bit of food. You don't know who they are or what they've done.",
    secenekler: [
      { metin: "Help them secretly.", basariliSonuc: { mesaj: "You helped them secretly; the fugitive slipped away quietly before dawn, full of gratitude." } },
      { metin: "You can't take the risk, turn them away.", basariliSonuc: { mesaj: "You said you couldn't take the risk and turned them away; the man vanished into the darkness." } },
    ],
  },
  gt_oc15_kacak_yardim_iyi: {
    baslik: "The Old Fugitive Who Became Respected",
    metin: "The fugitive you helped in secret that night turns out to have been wrongly accused. Now, their name cleared, they've reached a respected position and want to repay their debt to you.",
    secenekler: [
      { metin: "Accept their help.", basariliSonuc: { mesaj: "Using their influence, they opened an important door for you: \"You trusted me that night, and I trust you now,\" they said." } },
      { metin: "Accept only their friendship.", basariliSonuc: { mesaj: "You wanted nothing material; this friendship reaching across the years moved you deeply." } },
    ],
  },
  gt_oc15_kacak_yardim_kotu: {
    baslik: "The Threat of a Hardened Criminal",
    metin: "The fugitive who knocked on your door that night was actually a genuinely dangerous criminal; now it seems they've marked you as a target for turning them away that night.",
    secenekler: [
      { metin: "Ask the guards for protection.", basariliSonuc: { mesaj: "You asked the guards for protection; it was costly, but it prevented the worst." } },
      { metin: "Face it on your own.", basariliSonuc: { mesaj: "You tried to face it on your own; you got away from a small skirmish with cuts and bruises." } },
    ],
  },

  // ============================================================
  // SANAYİ DEVRİMİ (15 tema × 3)
  // ============================================================

  gt_sd01_sokak_cocugu: {
    baslik: "The Child at the Factory Gate",
    metin: "In front of the factory, a small street child in rags begs for work or a few coins.",
    secenekler: [
      { metin: "Give them work or donate some money.", basariliSonuc: { mesaj: "You gave the child a small job and a few coins; a tiny smile appeared on their face." } },
      { metin: "Everyone asks for this, walk past.", basariliSonuc: { mesaj: "You thought everyone was asking the same thing and walked past; the child turned to another door." } },
    ],
  },
  gt_sd01_sokak_cocugu_iyi: {
    baslik: "The Child Who Became a Factory Owner",
    metin: "The child you gave a small job to that day now owns their own factory. They've come to find you for that day's kindness.",
    secenekler: [
      { metin: "Form a business partnership with them.", basariliSonuc: { mesaj: "You formed a small business partnership with them; your earnings pleased you both." } },
      { metin: "Don't ask for a partnership, just congratulate them.", basariliSonuc: { mesaj: "You congratulated them without seeking anything for yourself; you became even more valuable in their eyes." } },
    ],
  },
  gt_sd01_sokak_cocugu_kotu: {
    baslik: "The Child Drawn into Crime",
    metin: "The child you turned away that day grew up on the streets and got mixed up in a gang's business. Now they've shown up demanding payment for your past indifference.",
    secenekler: [
      { metin: "Give them what they want to get rid of them.", basariliSonuc: { mesaj: "You gave them what they wanted to get rid of them; but this encounter left you uneasy for a long time." } },
      { metin: "Report it to the police/authorities.", basariliSonuc: { mesaj: "You reported the situation to the authorities; the matter was resolved, but your name was mentioned on the streets for a while." } },
    ],
  },

  gt_sd02_grevci_isci: {
    baslik: "A Striking Worker",
    metin: "A young worker leading a strike at the factory faces the threat of being fired. They ask for your support.",
    secenekler: [
      { metin: "Stand by them, offer your support.", basariliSonuc: { mesaj: "You stood by them and offered your support; management didn't like it at all, but the worker kept their job." } },
      { metin: "Don't ask for trouble, keep your distance.", basariliSonuc: { mesaj: "You kept your distance to avoid trouble; the worker left disappointed." } },
    ],
  },
  gt_sd02_grevci_isci_iyi: {
    baslik: "They Became a Union Leader",
    metin: "The young worker you supported that day is now the leader of a powerful union. They've found you to say they'll stand behind you whenever you need it.",
    secenekler: [
      { metin: "Accept the union's backing.", basariliSonuc: { mesaj: "The support from the union opened unexpected doors in your affairs." } },
      { metin: "Accept only their friendship.", basariliSonuc: { mesaj: "You accepted their friendship without seeking any advantage; they never forgot you, even years later." } },
    ],
  },
  gt_sd02_grevci_isci_kotu: {
    baslik: "The Old Worker's Grudge",
    metin: "The worker you didn't support that day has grown powerful in the union; now they're deliberately putting obstacles in your business, settling the score for that old resentment.",
    secenekler: [
      { metin: "Try to mend things between you.", basariliSonuc: { mesaj: "You met to try to mend things; they softened somewhat, but full trust never returned." } },
      { metin: "Push through despite the obstacles.", basariliSonuc: { mesaj: "You pushed through despite the obstacles; your business suffered a setback for a while." } },
    ],
  },

  gt_sd03_genc_mucit: {
    baslik: "An Inventor Without Capital",
    metin: "A young inventor asks for a small amount of capital for an invention that looks promising but that no one believes in.",
    secenekler: [
      { metin: "Give them a small amount of capital.", basariliSonuc: { mesaj: "You gave them a small amount of capital; the excitement in their eyes filled you with hope too." } },
      { metin: "It looks too risky, refuse.", basariliSonuc: { mesaj: "You called it too risky and refused; the inventor went off to try other doors." } },
    ],
  },
  gt_sd03_genc_mucit_iyi: {
    baslik: "They Became a Wealthy Industrialist",
    metin: "The young inventor you gave capital to that day has become a wealthy industrialist through their invention. Now they want to make you a partner.",
    secenekler: [
      { metin: "Accept the partnership.", basariliSonuc: { mesaj: "You accepted the partnership; as part of their industry, your earnings grew significantly." } },
      { metin: "Just take back the return on your investment.", basariliSonuc: { mesaj: "You didn't enter the partnership, just took back more than your investment was worth." } },
    ],
  },
  gt_sd03_genc_mucit_kotu: {
    baslik: "The Price of a Stolen Invention",
    metin: "The inventor you didn't help that day couldn't find the money to protect their invention; it was stolen by a rival, which ended up hurting you in the market too.",
    secenekler: [
      { metin: "Try to make up for the loss.", basariliSonuc: { mesaj: "You tried to make up for the loss, and partly succeeded." } },
      { metin: "Accept the loss, move on.", basariliSonuc: { mesaj: "You accepted the loss; you couldn't help thinking you should have helped that day." } },
    ],
  },

  gt_sd04_yetimhane: {
    baslik: "A Donation to the Orphanage",
    metin: "The orphanage in the city's poorer quarter is on the verge of shutting down. Its director is going door to door collecting donations.",
    secenekler: [
      { metin: "Make a generous donation.", basariliSonuc: { mesaj: "You made a generous donation; the director couldn't hold back tears." } },
      { metin: "You don't have much to spare, turn them away.", basariliSonuc: { mesaj: "You said you didn't have much to spare and turned them away; the director left disappointed." } },
    ],
  },
  gt_sd04_yetimhane_iyi: {
    baslik: "A Doctor You Helped Raise",
    metin: "A girl who grew up in the orphanage your donation saved that day is now a respected doctor/teacher in the city. She's come to visit you.",
    secenekler: [
      { metin: "Accept her medical/educational help.", basariliSonuc: { mesaj: "She offered you her care/counsel free of charge: \"If that orphanage hadn't survived, I wouldn't be here today,\" she said." } },
      { metin: "Just take pride in it, ask for no help.", basariliSonuc: { mesaj: "You asked for nothing; seeing that she'd grown into a good person was enough for you." } },
    ],
  },
  gt_sd04_yetimhane_kotu: {
    baslik: "The Trace of a Closed Orphanage",
    metin: "The orphanage you didn't donate to that day eventually closed; one of the children who came out of it runs into you on the street and lets out their old anger.",
    secenekler: [
      { metin: "Try to make amends now.", basariliSonuc: { mesaj: "Late as it was, you tried to make amends; even without full forgiveness, your conscience eased." } },
      { metin: "Leave the past in the past.", basariliSonuc: { mesaj: "You left the past in the past; but that angry look didn't leave your mind." } },
    ],
  },

  gt_sd05_yarali_gazeteci: {
    baslik: "A Beaten Journalist",
    metin: "In the street lies a young journalist, beaten for something he wrote. No one dares to help, afraid of getting into trouble themselves.",
    secenekler: [
      { metin: "Help him, take him somewhere safe.", basariliSonuc: { mesaj: "You took him somewhere safe and had his wounds tended; he looked at you with gratitude." } },
      { metin: "Don't ask for trouble, walk past.", basariliSonuc: { mesaj: "You didn't want trouble and walked past; you never learned what became of the journalist." } },
    ],
  },
  gt_sd05_yarali_gazeteci_iyi: {
    baslik: "A Famous Pen's Gratitude",
    metin: "The young journalist you helped that day is now one of the most-read writers in the city. In his columns, he praises you as a model citizen.",
    secenekler: [
      { metin: "Accept the praise and the attention it brings.", basariliSonuc: { mesaj: "His column drew great attention; your name soon started being spoken of in a positive light." } },
      { metin: "Stay humble, decline the attention.", basariliSonuc: { mesaj: "You declined the attention and stayed humble; this made you even more valuable in the journalist's eyes." } },
    ],
  },
  gt_sd05_yarali_gazeteci_kotu: {
    baslik: "A Pen Turned Enemy",
    metin: "The journalist you didn't help that day survived, but wrote you down among those who stood by indifferently. Now his pen is criticizing you harshly.",
    secenekler: [
      { metin: "Meet with him, try to explain.", basariliSonuc: { mesaj: "You met with him and tried to explain; he wasn't fully convinced, but his writing softened a little." } },
      { metin: "Don't mind the criticism.", basariliSonuc: { mesaj: "You didn't mind the criticism; but you didn't enjoy your name being spoken of poorly for a while." } },
    ],
  },

  gt_sd06_muhacir_aile: {
    baslik: "An Immigrant Family",
    metin: "A newly arrived immigrant family, with nowhere to stay, asks permission to stay temporarily in your attic.",
    secenekler: [
      { metin: "Give them shelter.", basariliSonuc: { mesaj: "You gave them temporary shelter in your attic; they expressed their gratitude again and again." } },
      { metin: "There's no room in your home, turn them away.", basariliSonuc: { mesaj: "You said there was no room in your home and turned them away; the family went to look for another door." } },
    ],
  },
  gt_sd06_muhacir_aile_iyi: {
    baslik: "The Reward of a Business Built",
    metin: "The head of the family you sheltered that day now runs his own business, a well-earning shopkeeper. He's come to pay you a visit of gratitude.",
    secenekler: [
      { metin: "Become a small partner in his business.", basariliSonuc: { mesaj: "You became a small partner in his business; the earnings pleased you both." } },
      { metin: "Accept only his visit.", basariliSonuc: { mesaj: "You didn't ask for a partnership, just accepted his friendly visit." } },
    ],
  },
  gt_sd06_muhacir_aile_kotu: {
    baslik: "Betrayed Trust",
    metin: "A member of the family you turned away that day fell in with bad company, and is now using your name to scam people.",
    secenekler: [
      { metin: "Report the situation to the authorities.", basariliSonuc: { mesaj: "You reported the situation to the authorities; the matter was resolved, but you didn't like your name being mentioned." } },
      { metin: "Quietly track it, don't intervene.", basariliSonuc: { mesaj: "You quietly kept track without intervening, but the fraud continued a while longer, and your name suffered for it." } },
    ],
  },

  gt_sd07_hasta_isci: {
    baslik: "A Sick Factory Worker",
    metin: "A worker you work alongside at the factory has fallen seriously ill, but has no money for medicine. They ask you for help.",
    secenekler: [
      { metin: "Cover the cost of the medicine.", basariliSonuc: { mesaj: "You covered the cost of the medicine; the worker thanked you through tears." } },
      { metin: "Not your problem, refuse.", basariliSonuc: { mesaj: "You decided it wasn't your problem and refused; the worker walked away without hope." } },
    ],
  },
  gt_sd07_hasta_isci_iyi: {
    baslik: "The Recovered Worker's Loyalty",
    metin: "The worker whose medicine you covered that day made a full recovery and is now a foreman. They say they'll always remain loyal to you.",
    secenekler: [
      { metin: "Make them one of your close associates.", basariliSonuc: { mesaj: "You brought them into your close circle; their loyalty and skill quickly contributed to your affairs." } },
      { metin: "Accept only their friendship.", basariliSonuc: { mesaj: "You didn't offer them a job, just accepted their friendship; the bond lasted for years." } },
    ],
  },
  gt_sd07_hasta_isci_kotu: {
    baslik: "The Family's Resentment",
    metin: "The worker you didn't help that day succumbed to the illness. When his family runs into you, they throw your indifference back in your face.",
    secenekler: [
      { metin: "Try to support the family.", basariliSonuc: { mesaj: "Late as it was, you tried to support the family; you partly eased their feelings." } },
      { metin: "Don't feel guilty, move on.", basariliSonuc: { mesaj: "You tried not to feel guilty, but that look stayed on your mind for a long time." } },
    ],
  },

  gt_sd08_genc_kadin_egitim: {
    baslik: "A Young Woman Who Wants to Study",
    metin: "A young woman wants to study despite the customs of her time, but can't afford books and lessons. She asks you for support.",
    secenekler: [
      { metin: "Support her education.", basariliSonuc: { mesaj: "You supported her education; the determination in her eyes moved you." } },
      { metin: "Not your business, refuse.", basariliSonuc: { mesaj: "You said it wasn't your business and refused; the woman left disappointed." } },
    ],
  },
  gt_sd08_genc_kadin_egitim_iyi: {
    baslik: "The Woman Who Became a Teacher/Writer",
    metin: "The woman whose education you supported that day is now a respected teacher/writer. She's sent you an open letter of thanks and a small gift.",
    secenekler: [
      { metin: "Accept the gift and the thanks.", basariliSonuc: { mesaj: "Many people read the letter; your name began to be spoken of positively in society." } },
      { metin: "Stay humble, just take pride in it.", basariliSonuc: { mesaj: "You stayed humble without drawing attention to it; but deep down, you felt great pride." } },
    ],
  },
  gt_sd08_genc_kadin_egitim_kotu: {
    baslik: "A Scandalous Name Mentioned",
    metin: "The woman you didn't support that day went through hard times and eventually fell into a disreputable circle. Now your name is being mentioned in a scandal too — as if you were to blame.",
    secenekler: [
      { metin: "Work to clear your name.", basariliSonuc: { mesaj: "You worked hard to clear your name, and eventually partly succeeded." } },
      { metin: "Say it will be forgotten with time.", basariliSonuc: { mesaj: "You thought it would be forgotten with time; but the gossip bothered you for a while." } },
    ],
  },

  gt_sd09_borclu_esnaf: {
    baslik: "A Shopkeeper on the Verge of Closing",
    metin: "A small shopkeeper is about to close their shop, unable to pay their debts. They ask you to co-sign a loan or lend them money.",
    secenekler: [
      { metin: "Co-sign for them / lend them money.", basariliSonuc: { mesaj: "You co-signed and lent him money; the man thanked you unable to hold back tears." } },
      { metin: "You can't risk it, refuse.", basariliSonuc: { mesaj: "You couldn't risk it and refused; the shopkeeper went back to his shop without hope." } },
    ],
  },
  gt_sd09_borclu_esnaf_iyi: {
    baslik: "The Reward of a Recovered Business",
    metin: "The shopkeeper you supported that day got his business back on its feet and now owns several branches as a merchant. He's come to repay his debt many times over.",
    secenekler: [
      { metin: "Accept the extra repayment.", basariliSonuc: { mesaj: "He repaid you threefold: \"You saved me that day,\" he said." } },
      { metin: "Take only the principal.", basariliSonuc: { mesaj: "You didn't want more; this attitude made you even more valuable in the man's eyes." } },
    ],
  },
  gt_sd09_borclu_esnaf_kotu: {
    baslik: "The Ruined Shopkeeper's Anger",
    metin: "The shopkeeper you didn't support that day went bankrupt and lost everything. Now he's shown up asking why you didn't help him that day, blaming you.",
    secenekler: [
      { metin: "Do something, even if it's late.", basariliSonuc: { mesaj: "Late as it was, you tried to help; the man softened a little, even without fully forgiving you." } },
      { metin: "Don't accept the blame.", basariliSonuc: { mesaj: "You didn't accept the blame; but the encounter troubled you for a while." } },
    ],
  },

  gt_sd10_savas_gazisi: {
    baslik: "A War Veteran Looking for Work",
    metin: "A veteran, disabled from the war, wanders the streets unable to find work. He asks you to give him a job.",
    secenekler: [
      { metin: "Find him a job.", basariliSonuc: { mesaj: "You found him a job suited to his abilities; a hope you hadn't seen in his eyes in a long time appeared." } },
      { metin: "There's no place for him at your workplace, refuse.", basariliSonuc: { mesaj: "You said there was no place for him at your workplace and refused; the veteran walked away with his head bowed." } },
    ],
  },
  gt_sd10_savas_gazisi_iyi: {
    baslik: "A Loyal Helper",
    metin: "The veteran you gave a job to that day has been one of your most loyal employees for years. Now he wants to repay you with a special service.",
    secenekler: [
      { metin: "Accept his service.", basariliSonuc: { mesaj: "His loyalty and experience contributed valuably to your affairs." } },
      { metin: "Accept only his friendship.", basariliSonuc: { mesaj: "You didn't want anything extra, just accepted his friendship; your bond lasted for years." } },
    ],
  },
  gt_sd10_savas_gazisi_kotu: {
    baslik: "A Problem Born of Trauma",
    metin: "The veteran you turned away that day, unable to get treatment for his trauma, became someone with serious problems. Now your name has become entangled in an incident involving him.",
    secenekler: [
      { metin: "Help him now, fix the situation.", basariliSonuc: { mesaj: "Late as it was, you tried to help him and fix the situation." } },
      { metin: "Keep yourself away from the matter.", basariliSonuc: { mesaj: "You kept yourself away from the matter, but didn't enjoy your name being mentioned." } },
    ],
  },

  gt_sd11_ustabasi_firsati: {
    baslik: "A Talented Young Worker",
    metin: "A young, hardworking worker at your factory asks for your support for a chance to become foreman. The other candidates are more senior.",
    secenekler: [
      { metin: "Give him the chance, support him.", basariliSonuc: { mesaj: "You gave him the chance and supported him; the young worker promised not to let your trust down." } },
      { metin: "There's a seniority order, refuse.", basariliSonuc: { mesaj: "You said there was a seniority order and refused; the young worker turned away disappointed." } },
    ],
  },
  gt_sd11_ustabasi_firsati_iyi: {
    baslik: "A Loyal Foreman",
    metin: "The young worker you supported that day is now a reliable and successful foreman. For years, he's been your loyal right hand, lifting you up.",
    secenekler: [
      { metin: "Grow your business together with him.", basariliSonuc: { mesaj: "You grew the business together; his skill reflected directly in your earnings." } },
      { metin: "Just appreciate his loyalty.", basariliSonuc: { mesaj: "You didn't ask for anything extra; you simply valued his loyalty." } },
    ],
  },
  gt_sd11_ustabasi_firsati_kotu: {
    baslik: "Talent Lost to a Rival",
    metin: "The young worker you didn't give a chance to that day went to your rival and became foreman there. Now he's using his old knowledge to hurt your business.",
    secenekler: [
      { metin: "Update your work methods, adapt to the competition.", basariliSonuc: { mesaj: "Updating your work methods was costly, but you kept up with the competition." } },
      { metin: "Accept the loss.", basariliSonuc: { mesaj: "You accepted the loss; not having given him a chance that day nagged at you." } },
    ],
  },

  gt_sd12_muhendis_laboratuvar: {
    baslik: "An Engineer Wanting a Small Laboratory",
    metin: "A young engineer wants a small workshop/laboratory for a machine design he's developed. No one takes him seriously.",
    secenekler: [
      { metin: "Provide him with a small facility.", basariliSonuc: { mesaj: "You provided him with a small workshop; he set to work at once." } },
      { metin: "Call it wasted money, refuse.", basariliSonuc: { mesaj: "You called it wasted money and refused; the engineer went to look for other doors." } },
    ],
  },
  gt_sd12_muhendis_laboratuvar_iyi: {
    baslik: "Partner in a Great Invention",
    metin: "The engineer you supported that day has achieved great success with the machine he developed. He remembers you as his first investor and wants to give you your share.",
    secenekler: [
      { metin: "Accept your share.", basariliSonuc: { mesaj: "You accepted your share as his first investor, many times over; your earnings grew considerably." } },
      { metin: "Just take back the return on your investment.", basariliSonuc: { mesaj: "You didn't want more, just took back the return on your investment." } },
    ],
  },
  gt_sd12_muhendis_laboratuvar_kotu: {
    baslik: "The Price of a Failed Experiment",
    metin: "The engineer you didn't support that day, lacking the means, rushed a hasty experiment that went badly wrong; the incident turned into an inquiry that mentions your name too.",
    secenekler: [
      { metin: "Tell the truth in the inquiry.", basariliSonuc: { mesaj: "You told the truth in the inquiry; it cost you, but your name stayed clean." } },
      { metin: "Try to stay away from the affair.", basariliSonuc: { mesaj: "You tried to stay away from it; still, you didn't like your name being mentioned." } },
    ],
  },

  gt_sd13_kimsesiz_cocuk_fabrika: {
    baslik: "An Orphaned Child Working at the Factory",
    metin: "An orphaned child working at your factory has fallen ill from the heavy labor. It's in your hands to send them to school and stop working them.",
    secenekler: [
      { metin: "Protect them, send them to school.", basariliSonuc: { mesaj: "You took the child off the heavy work and sent them to school; a spark of hope appeared in their little eyes." } },
      { metin: "Don't disrupt the factory's workings, keep them working.", basariliSonuc: { mesaj: "To avoid disrupting the factory's workings, you kept the child working." } },
    ],
  },
  gt_sd13_kimsesiz_cocuk_fabrika_iyi: {
    baslik: "The Child Who Became a Doctor/Engineer",
    metin: "The child you sent to school that day is now a respected doctor/engineer. They've found you to say thanks, and want to offer you special help.",
    secenekler: [
      { metin: "Accept their help.", basariliSonuc: { mesaj: "You accepted their help; both your health and your affairs benefited from it." } },
      { metin: "Just take pride in it.", basariliSonuc: { mesaj: "You asked for nothing in return; seeing how they turned out was enough for you." } },
    ],
  },
  gt_sd13_kimsesiz_cocuk_fabrika_kotu: {
    baslik: "A Child Dragged into Crime",
    metin: "The child you kept working that day fled the harsh conditions and ended up on the street, eventually falling in with a small gang. Now they're causing trouble at your factory.",
    secenekler: [
      { metin: "Take an interest in them, try to fix the situation.", basariliSonuc: { mesaj: "Late as it was, you took an interest and tried to fix the situation." } },
      { metin: "Take security measures, keep them away.", basariliSonuc: { mesaj: "You took security measures and kept them away; but your conscience wouldn't let you rest." } },
    ],
  },

  gt_sd14_yangin_komsu: {
    baslik: "A Neighbor Whose House Burned Down",
    metin: "A fire has left the neighboring family homeless. They ask to stay temporarily at your house/property.",
    secenekler: [
      { metin: "Make room for them, help them.", basariliSonuc: { mesaj: "You made room for them and helped; the family wept with gratitude." } },
      { metin: "Don't let your own order be disrupted, refuse.", basariliSonuc: { mesaj: "You didn't want your own order disrupted and refused; the family went to look for another door." } },
    ],
  },
  gt_sd14_yangin_komsu_iyi: {
    baslik: "The Recovered Neighbor Family's Kindness",
    metin: "The neighboring family you helped that day now has their own business, back on their feet. They come with a gesture showing they'll always be grateful to you.",
    secenekler: [
      { metin: "Accept their gesture.", basariliSonuc: { mesaj: "They came with a small but meaningful gift: \"You gave us life that day,\" they said." } },
      { metin: "Just keep up the neighborly bond.", basariliSonuc: { mesaj: "You didn't want a gift, just kept up the good neighborliness; the bond stayed warm for years." } },
    ],
  },
  gt_sd14_yangin_komsu_kotu: {
    baslik: "The Old Neighbor Turned Rival",
    metin: "The neighboring family you refused that day struggled to get back on their feet, until someone else finally helped them. Now, in partnership with that person, they've become your greatest rival.",
    secenekler: [
      { metin: "Build good relations despite the competition.", basariliSonuc: { mesaj: "You tried to build good relations despite the competition, and partly succeeded." } },
      { metin: "Respond to the competition harshly.", basariliSonuc: { mesaj: "You responded to the competition harshly; the struggle wore on you too." } },
    ],
  },

  gt_sd15_sokak_muzisyeni: {
    baslik: "A Talented Street Musician",
    metin: "A young musician playing the violin on the corner is about to sell his instrument, unable to earn any money. He asks you for help.",
    secenekler: [
      { metin: "Give him money so he doesn't sell the instrument.", basariliSonuc: { mesaj: "You gave him money; he gave up on selling his instrument and played you a piece in gratitude." } },
      { metin: "Call it chasing empty dreams, walk past.", basariliSonuc: { mesaj: "You thought he was chasing empty dreams and walked past; the musician walked away sadly." } },
    ],
  },
  gt_sd15_sokak_muzisyeni_iyi: {
    baslik: "The Street Musician Who Became Famous",
    metin: "The young musician whose instrument you saved that day is now one of the city's most famous artists. He invites you to a special concert of his and honors you from the stage.",
    secenekler: [
      { metin: "Accept the invitation, be honored.", basariliSonuc: { mesaj: "He mentioned your name from the stage at the concert; the hall gave you a standing ovation." } },
      { metin: "Watch quietly, don't step into the spotlight.", basariliSonuc: { mesaj: "You watched quietly without stepping into the spotlight; but the pride inside you never faded." } },
    ],
  },
  gt_sd15_sokak_muzisyeni_kotu: {
    baslik: "The Musician Who Fell into Bad Ways",
    metin: "The musician you didn't help that day sold his instrument, then fell in with bad company. Now he's caught up in a scandal that mentions your name too.",
    secenekler: [
      { metin: "Give him another chance.", basariliSonuc: { mesaj: "Late as it was, you gave him another chance; it was a small support toward getting back on his feet." } },
      { metin: "Stay completely away from the affair.", basariliSonuc: { mesaj: "You tried to stay completely away from it, but didn't like your name being mentioned." } },
    ],
  },
};
