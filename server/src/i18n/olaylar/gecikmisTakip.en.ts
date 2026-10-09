import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/gecikmisTakip.ts — İngilizce çevirileri (90 olay: 30 tetikleyici + 60 sonuç). */
export const OLAYLAR_GECIKMIS_TAKIP_EN: Record<string, OlayCeviri> = {
  // ============================================================
  // ORTA ÇAĞ (15 tema × 3)
  // ============================================================

  gt_oc01_dilenci: {
    baslik: "The Beggar in the Street",
    metin: "At the market entrance, an old beggar in rags holds out his hand. His eyes hold no pleading, only a strange dignity.",
    secenekler: [
      { metin: "Hand him a few coins.", basariliSonuc: { mesaj: "You gave him coins; he thanked you sincerely." } },
      { metin: "Shrug and walk on.", basariliSonuc: { mesaj: "You ignored him; he muttered behind you." } },
    ],
  },
  gt_oc01_dilenci_iyi: {
    baslik: "The Beggar Returns",
    metin: "The beggar you once gave money to arrives on horseback, now one of the city's wealthiest merchants. He never forgot your alms.",
    secenekler: [
      { metin: "Accept his gratitude.", basariliSonuc: { mesaj: "He emptied his purse: \"You treated me like a human; I repay my debt.\"" } },
      { metin: "Take a small gift.", basariliSonuc: { mesaj: "You declined the large gift for a small one; he admired your humility." } },
    ],
  },
  gt_oc01_dilenci_kotu: {
    baslik: "The Beggar Who Never Forgot",
    metin: "The beggar you ignored shames you before a crowd at your door: \"This man spared me not even a crumb!\"",
    secenekler: [
      { metin: "Apologize and pay him.", basariliSonuc: { mesaj: "You apologized and paid; the crowd left, the shame stayed." } },
      { metin: "Stand your ground.", basariliSonuc: { mesaj: "You stood firm; the crowd gossiped and your name suffered a while." } },
    ],
  },

  gt_oc02_yarali_yolcu: {
    baslik: "The Injured Man by the Road",
    metin: "A robbed, beaten traveler lies by the road. Everyone looks away and passes.",
    secenekler: [
      { metin: "Take him home and dress his wounds.", basariliSonuc: { mesaj: "You tended him at home; days later he recovered and left." } },
      { metin: "Look away like the rest.", basariliSonuc: { mesaj: "You passed like everyone else; your conscience nagged you." } },
    ],
  },
  gt_oc02_yarali_yolcu_iyi: {
    baslik: "The Recovered Traveler's Visit",
    metin: "The traveler you tended is now a respected physician. He offers to personally look after you and your family.",
    secenekler: [
      { metin: "Accept his offer.", basariliSonuc: { mesaj: "He examined you and left medicines; you feel healthier than in years." } },
      { metin: "Give the treatment to others.", basariliSonuc: { mesaj: "You sent the treatment to someone needier; he admired it and you grew close." } },
    ],
  },
  gt_oc02_yarali_yolcu_kotu: {
    baslik: "The Grudge-Bearing Stranger",
    metin: "The man you didn't help recovered and holds a grudge. Now influential, he spreads dark rumors about you.",
    secenekler: [
      { metin: "Refute the rumors.", basariliSonuc: { mesaj: "You spent money and time refuting them, without fully succeeding." } },
      { metin: "Ignore it.", basariliSonuc: { mesaj: "You ignored it; rumors lingered and your name took a hit." } },
    ],
  },

  gt_oc03_bogulan_cocuk: {
    baslik: "The Drowning Child in the River",
    metin: "A small child is swept up by the river current, thrashing. No one moves.",
    secenekler: [
      { metin: "Dive in and save the child.", basariliSonuc: { mesaj: "You dived in and saved the child at the last moment; the family wept with thanks." } },
      { metin: "You can't dare it; just watch.", basariliSonuc: { mesaj: "You couldn't go in; luckily another arrived, but you always felt guilty." } },
    ],
  },
  gt_oc03_bogulan_cocuk_iyi: {
    baslik: "The Child You Saved Grew Up",
    metin: "The child you rescued is now a respected commander/guild master. They say they never forgot you and will stand by you.",
    secenekler: [
      { metin: "Accept their patronage.", basariliSonuc: { mesaj: "You gained an influential friend; your name is now spoken with respect." } },
      { metin: "Accept only their gratitude.", basariliSonuc: { mesaj: "You asked for nothing and recalled that day together; deep peace filled you." } },
    ],
  },
  gt_oc03_bogulan_cocuk_kotu: {
    baslik: "The Guilt Returns",
    metin: "You always blamed yourself for not going in. Now you meet the child's family; the disappointment in the man's eyes remains.",
    secenekler: [
      { metin: "Apologize, unburden yourself.", basariliSonuc: { mesaj: "You apologized after years; without full forgiveness, your burden eased." } },
      { metin: "Close the subject.", basariliSonuc: { mesaj: "You closed it, but that look stayed with you." } },
    ],
  },

  gt_oc04_tuccar_borc: {
    baslik: "A Merchant in a Hard Time",
    metin: "A young merchant, his caravan robbed, is near bankruptcy. He asks for a loan and swears to repay honestly.",
    secenekler: [
      { metin: "Lend him money.", basariliSonuc: { mesaj: "You lent him from your savings; his eyes held hope and shame." } },
      { metin: "Refuse; too risky.", basariliSonuc: { mesaj: "You refused; he went to try other doors." } },
    ],
  },
  gt_oc04_tuccar_borc_iyi: {
    baslik: "The Wealthy Merchant's Loyalty",
    metin: "The young merchant you lent to now runs caravans between cities, rich. He brought your loan back with interest.",
    secenekler: [
      { metin: "Accept the generous repayment.", basariliSonuc: { mesaj: "He repaid threefold: \"I couldn't have survived without you.\"" } },
      { metin: "Take only the principal.", basariliSonuc: { mesaj: "You took no more; he admired it and became a lifelong friend." } },
    ],
  },
  gt_oc04_tuccar_borc_kotu: {
    baslik: "The Rejected Merchant's Grudge",
    metin: "The merchant you refused went bankrupt, recovered, and now rivals you in the same market, still hating you.",
    secenekler: [
      { metin: "Try to mend things.", basariliSonuc: { mesaj: "You partly mended things, at considerable cost." } },
      { metin: "Face the competition.", basariliSonuc: { mesaj: "You faced it; the struggle wore you down too." } },
    ],
  },

  gt_oc05_yetim_himaye: {
    baslik: "An Orphan Alone",
    metin: "An orphan who lost their family to plague or war waits at your door, hungry and cold. They have no one.",
    secenekler: [
      { metin: "Take them in as your ward.", basariliSonuc: { mesaj: "You took the orphan in with a roof and warm food." } },
      { metin: "Your own troubles suffice; refuse.", basariliSonuc: { mesaj: "You turned the child away; they didn't look back." } },
    ],
  },
  gt_oc05_yetim_himaye_iyi: {
    baslik: "The Orphan You Raised Grew Up",
    metin: "The orphan you took in is now a respected craftsman/soldier. They visit with a carefully prepared gift.",
    secenekler: [
      { metin: "Invite them in and celebrate.", basariliSonuc: { mesaj: "You recalled old days together, proud as a parent." } },
      { metin: "Ask nothing; just be glad.", basariliSonuc: { mesaj: "You asked nothing; seeing them grow up good was enough." } },
    ],
  },
  gt_oc05_yetim_himaye_kotu: {
    baslik: "Anger Raised on the Street",
    metin: "The orphan you turned away grew up on the streets among the city's underworld. Now they demand the price of your refusal.",
    secenekler: [
      { metin: "Pay them off.", basariliSonuc: { mesaj: "You paid them off, though the threat shook you." } },
      { metin: "Refuse to bow.", basariliSonuc: { mesaj: "You refused; the man lingered around, unsettling you." } },
    ],
  },

  gt_oc06_esir_cocuk: {
    baslik: "A Child from the Enemy Ranks",
    metin: "After a clash, a small child from the enemy ranks was captured. The soldiers ask what to do.",
    secenekler: [
      { metin: "Show mercy, send them home.", basariliSonuc: { mesaj: "You had the child sent safely back to their side." } },
      { metin: "That's war; don't interfere.", basariliSonuc: { mesaj: "You called it war and stayed out; you never learned the child's fate." } },
    ],
  },
  gt_oc06_esir_cocuk_iyi: {
    baslik: "The Old Enemy's Gratitude",
    metin: "The child you spared is now an important enemy leader. Through envoys, they send a gift of gratitude and a peace offer.",
    secenekler: [
      { metin: "Accept the gift and peace.", basariliSonuc: { mesaj: "You accepted the gift; thanks to you, a small bridge of peace formed." } },
      { metin: "Accept only friendship.", basariliSonuc: { mesaj: "You declined the gift, kept the friendship, and won respect on both sides." } },
    ],
  },
  gt_oc06_esir_cocuk_kotu: {
    baslik: "A Growing Vengeance",
    metin: "The child you abandoned is now a powerful enemy commander, planning a raid on you.",
    secenekler: [
      { metin: "Strengthen your defenses.", basariliSonuc: { mesaj: "Defense was costly and tiring, but you fended off the worst." } },
      { metin: "Appease them diplomatically.", basariliSonuc: { mesaj: "You partly appeased them, but your reputation suffered." } },
    ],
  },

  gt_oc07_kesise_sadaka: {
    baslik: "A Hungry Monk",
    metin: "By the road, a young monk starving for days asks alms in exchange for prayer.",
    secenekler: [
      { metin: "Give food and a few coins.", basariliSonuc: { mesaj: "You gave food and coins; he prayed for you sincerely." } },
      { metin: "Mind your own business.", basariliSonuc: { mesaj: "You ignored him; the monk went quietly on." } },
    ],
  },
  gt_oc07_kesise_sadaka_iyi: {
    baslik: "The Monastery's Gratitude",
    metin: "The young monk you fed is now abbot of an influential monastery. He says its doors are always open to you.",
    secenekler: [
      { metin: "Accept the patronage.", basariliSonuc: { mesaj: "The monastery took you under its wing; people see you as honest and generous." } },
      { metin: "Accept only his friendship.", basariliSonuc: { mesaj: "You asked no patronage, only friendship; the bond lasted years." } },
    ],
  },
  gt_oc07_kesise_sadaka_kotu: {
    baslik: "The Church's Cold Stare",
    metin: "The monk you turned away now holds sway in the monastery. Rumors spread that you are stingy and merciless.",
    secenekler: [
      { metin: "Donate heavily to the church.", basariliSonuc: { mesaj: "A large donation made amends; the rumors died down." } },
      { metin: "Ignore it; gossip passes.", basariliSonuc: { mesaj: "You ignored it, but rumors circled the congregation a while." } },
    ],
  },

  gt_oc08_hasta_yabanci: {
    baslik: "A Stranger Falls Ill",
    metin: "A stranger at the caravanserai lies burning with fever. No one goes near, fearing contagion.",
    secenekler: [
      { metin: "Go to him and nurse him.", basariliSonuc: { mesaj: "Ignoring fear, you nursed him; he was on his feet in days." } },
      { metin: "Keep your distance.", basariliSonuc: { mesaj: "You kept away; you never learned his fate." } },
    ],
  },
  gt_oc08_hasta_yabanci_iyi: {
    baslik: "The Recovered Stranger's Word",
    metin: "The stranger you nursed turns out to be a respected nobleman. His letter invites you to be his guest at court.",
    secenekler: [
      { metin: "Accept the invitation.", basariliSonuc: { mesaj: "You accepted; he hosted you generously and praised your name." } },
      { metin: "Thank him kindly, don't go.", basariliSonuc: { mesaj: "You didn't go, but built a warm friendship by letter." } },
    ],
  },
  gt_oc08_hasta_yabanci_kotu: {
    baslik: "The Dead Stranger's Family",
    metin: "The stranger you avoided died untended. His family comes to ask why you left him alone.",
    secenekler: [
      { metin: "Tell the truth and apologize.", basariliSonuc: { mesaj: "You were honest; the family left hurt, but you didn't lie." } },
      { metin: "Refuse the blame.", basariliSonuc: { mesaj: "You took no blame; the family didn't forget and your name suffered." } },
    ],
  },

  gt_oc09_gezgin_fal: {
    baslik: "A Traveling Fortune-Teller",
    metin: "A traveling fortune-teller in town wants a coin to read your palm. Onlookers eye her warily.",
    secenekler: [
      { metin: "Give in, pay the coin.", basariliSonuc: { mesaj: "You paid; she read your palm and whispered mysterious words." } },
      { metin: "Call it superstition; leave.", basariliSonuc: { mesaj: "You left; she shrugged and turned to someone else." } },
    ],
  },
  gt_oc09_gezgin_fal_iyi: {
    baslik: "The Fortune-Teller's True Warning",
    metin: "The woman who once read your palm has true instincts. She appears now to warn you of a real approaching danger.",
    secenekler: [
      { metin: "Heed the warning, take precautions.", basariliSonuc: { mesaj: "You took precautions and narrowly dodged great misfortune." } },
      { metin: "Listen, skeptically.", basariliSonuc: { mesaj: "Though doubtful, you remembered her words; they proved useful." } },
    ],
  },
  gt_oc09_gezgin_fal_kotu: {
    baslik: "She Turned Out to Be a Fraud",
    metin: "The woman you dismissed is a skilled con artist. She has been using your name to deceive people around you.",
    secenekler: [
      { metin: "Clear your name.", basariliSonuc: { mesaj: "You worked to clear your name, partly succeeding, at a cost." } },
      { metin: "Let it go; it'll fade.", basariliSonuc: { mesaj: "You let it go, but the rumor clung on a while." } },
    ],
  },

  gt_oc10_ciraklik: {
    baslik: "A Talented Apprentice Candidate",
    metin: "A poor family's son shows his wood carvings and asks for an apprenticeship. Most masters turned him away.",
    secenekler: [
      { metin: "Take him on.", basariliSonuc: { mesaj: "You took him on; the excitement in his eyes warmed you." } },
      { metin: "No time; turn him away.", basariliSonuc: { mesaj: "You said you had no time; the boy left disappointed." } },
    ],
  },
  gt_oc10_ciraklik_iyi: {
    baslik: "The Old Apprentice Who Mastered the Craft",
    metin: "The boy you gave a chance is now among the region's most sought-after masters. He gifts you a valuable piece he made himself.",
    secenekler: [
      { metin: "Accept the gift proudly.", basariliSonuc: { mesaj: "You accepted proudly; the story behind the piece moved you." } },
      { metin: "Propose working together.", basariliSonuc: { mesaj: "He agreed; the partnership raised both your standings." } },
    ],
  },
  gt_oc10_ciraklik_kotu: {
    baslik: "The Rival Master's Shadow",
    metin: "The boy you turned away trained under another master and is now your greatest rival, taking your customers.",
    secenekler: [
      { metin: "Improve your business and compete.", basariliSonuc: { mesaj: "Improving your business was costly; you barely kept pace." } },
      { metin: "Accept the loss; scale down.", basariliSonuc: { mesaj: "You scaled down and missed the old days." } },
    ],
  },

  gt_oc11_esir_asker: {
    baslik: "A Captured Soldier",
    metin: "A young enemy soldier captured in battle begs for his life. The others want him executed.",
    secenekler: [
      { metin: "Set him free.", basariliSonuc: { mesaj: "You freed him; the soldiers were surprised but respected it." } },
      { metin: "War's rule; don't interfere.", basariliSonuc: { mesaj: "You stayed out and never thought of his fate again." } },
    ],
  },
  gt_oc11_esir_asker_iyi: {
    baslik: "The Old Captive's Loyalty",
    metin: "The young soldier you freed is now a respected commander. He seeks you out to repay his debt.",
    secenekler: [
      { metin: "Accept his valuable help.", basariliSonuc: { mesaj: "He offered help: \"You spared my life; this is my debt.\"" } },
      { metin: "Ask only for a warning.", basariliSonuc: { mesaj: "You asked only for a warning; it later saved you from great danger." } },
    ],
  },
  gt_oc11_esir_asker_kotu: {
    baslik: "Anger That Never Faded",
    metin: "The captive you didn't defend was executed. Years later, his family asks why you did nothing.",
    secenekler: [
      { metin: "Answer honestly.", basariliSonuc: { mesaj: "You answered honestly; the family left hurt, but you didn't flee." } },
      { metin: "Say it was war; move on.", basariliSonuc: { mesaj: "You moved on, but the encounter troubled you long after." } },
    ],
  },

  gt_oc12_kitlik_komsu: {
    baslik: "A Neighbor in Famine",
    metin: "In a famine year, the neighbors' granary is empty and their children weak with hunger. They ask you for grain.",
    secenekler: [
      { metin: "Give grain from your granary.", basariliSonuc: { mesaj: "You gave grain; your share shrank, but your conscience eased." } },
      { metin: "Family first; refuse.", basariliSonuc: { mesaj: "You put your family first and refused; the neighbor left crestfallen." } },
    ],
  },
  gt_oc12_kitlik_komsu_iyi: {
    baslik: "The Recovering Neighbor's Gratitude",
    metin: "The neighbor you helped in the famine is now among the region's richest farmers. Each year he sets aside a share for you.",
    secenekler: [
      { metin: "Accept the yearly share.", basariliSonuc: { mesaj: "He brought it: \"You gave us life that day; we never forgot.\"" } },
      { metin: "Refuse; friendship is enough.", basariliSonuc: { mesaj: "You refused the share, wanting friendship; your bond grew stronger." } },
    ],
  },
  gt_oc12_kitlik_komsu_kotu: {
    baslik: "A Stolen Claim",
    metin: "The neighbor you refused never forgot; now stronger, he claims part of your field with a boundary dispute.",
    secenekler: [
      { metin: "Defend your claim in court.", basariliSonuc: { mesaj: "Defending it was costly, but you kept your field." } },
      { metin: "Give up a small portion.", basariliSonuc: { mesaj: "To avoid a fight you gave up a small part; it stung." } },
    ],
  },

  gt_oc13_firtinada_denizci: {
    baslik: "A Sailor Fleeing the Storm",
    metin: "At the harbor lies an exhausted sailor washed ashore from a storm, clothes in tatters, knowing no one.",
    secenekler: [
      { metin: "Take him home; warm and feed him.", basariliSonuc: { mesaj: "You warmed and fed him; days later he thanked you and left." } },
      { metin: "Leave him at the harbor.", basariliSonuc: { mesaj: "You stayed out and never learned what became of him." } },
    ],
  },
  gt_oc13_firtinada_denizci_iyi: {
    baslik: "The Sailor Who Became Captain's Visit",
    metin: "The sailor you saved is now captain of his own ship, anchored with a wealthy fleet. He comes to thank you.",
    secenekler: [
      { metin: "Trade with him.", basariliSonuc: { mesaj: "You joined a small venture; your earnings grew considerably." } },
      { metin: "Accept only his friendship.", basariliSonuc: { mesaj: "You skipped trade; he visited you at every port call." } },
    ],
  },
  gt_oc13_firtinada_denizci_kotu: {
    baslik: "The Sunken Ship's Accusation",
    metin: "The sailor you left at the harbor died in the next storm. Hearing you didn't help, his family blames you.",
    secenekler: [
      { metin: "Support the family financially.", basariliSonuc: { mesaj: "You tried to ease your conscience by supporting the family." } },
      { metin: "Reject the blame.", basariliSonuc: { mesaj: "You rejected the blame; that night's memory lingered." } },
    ],
  },

  gt_oc14_ceyiz_yardimi: {
    baslik: "A Girl Left Without a Dowry",
    metin: "A poor family's daughter can't marry without a dowry. Ashamed, her family asks you for help.",
    secenekler: [
      { metin: "Contribute to her dowry.", basariliSonuc: { mesaj: "You contributed generously; the family's gratitude was priceless." } },
      { metin: "Not your problem; refuse.", basariliSonuc: { mesaj: "You refused; the family left embarrassed." } },
    ],
  },
  gt_oc14_ceyiz_yardimi_iyi: {
    baslik: "The Girl Who Married Well",
    metin: "The girl whose dowry you helped married into a wealthy, respected family. Her father-in-law visits to thank you.",
    secenekler: [
      { metin: "Accept the visit and gift.", basariliSonuc: { mesaj: "He came with a fine gift: \"We never forgot your kindness.\"" } },
      { metin: "Accept only good wishes.", basariliSonuc: { mesaj: "You refused the gift but welcomed his visit; the family always remembered you." } },
    ],
  },
  gt_oc14_ceyiz_yardimi_kotu: {
    baslik: "The Resentful Family's Gossip",
    metin: "The family you didn't help had to marry off their daughter late and poorly. Now they tell everyone how stingy you are.",
    secenekler: [
      { metin: "Offer help, however late.", basariliSonuc: { mesaj: "You offered help; the family accepted, surprised, and gossip faded." } },
      { metin: "Ignore them.", basariliSonuc: { mesaj: "You ignored it; rumors circulated a while." } },
    ],
  },

  gt_oc15_kacak_yardim: {
    baslik: "A Fugitive in Hiding",
    metin: "A fugitive knocks at midnight, asking for a night's shelter and food. You don't know who they are.",
    secenekler: [
      { metin: "Help them secretly.", basariliSonuc: { mesaj: "You helped in secret; the fugitive left before dawn, grateful." } },
      { metin: "Too risky; turn them away.", basariliSonuc: { mesaj: "You turned them away; they vanished into the dark." } },
    ],
  },
  gt_oc15_kacak_yardim_iyi: {
    baslik: "The Old Fugitive Who Became Respected",
    metin: "The fugitive you hid was wrongly accused. Their name cleared, now in a respected position, they want to repay you.",
    secenekler: [
      { metin: "Accept their help.", basariliSonuc: { mesaj: "Using their influence, they opened a key door: \"You trusted me that night.\"" } },
      { metin: "Accept only their friendship.", basariliSonuc: { mesaj: "You asked nothing material; a friendship from across the years moved you." } },
    ],
  },
  gt_oc15_kacak_yardim_kotu: {
    baslik: "The Threat of a Hardened Criminal",
    metin: "The fugitive at your door was truly dangerous; they now seem to target you for turning them away.",
    secenekler: [
      { metin: "Ask the guards for protection.", basariliSonuc: { mesaj: "Protection was costly but prevented the worst." } },
      { metin: "Face it yourself.", basariliSonuc: { mesaj: "You faced it alone and escaped a skirmish bruised." } },
    ],
  },

  // ============================================================
  // SANAYİ DEVRİMİ (15 tema × 3)
  // ============================================================

  gt_sd01_sokak_cocugu: {
    baslik: "The Child at the Factory Gate",
    metin: "In front of the factory, a small street child in rags begs for work or a few coins.",
    secenekler: [
      { metin: "Give work or some money.", basariliSonuc: { mesaj: "You gave the child a small job and a few coins; they smiled." } },
      { metin: "Everyone asks; walk past.", basariliSonuc: { mesaj: "You walked past; the child tried another door." } },
    ],
  },
  gt_sd01_sokak_cocugu_iyi: {
    baslik: "The Child Who Became a Factory Owner",
    metin: "The child you once gave a small job now owns a factory. They've come to find you for that kindness.",
    secenekler: [
      { metin: "Form a partnership.", basariliSonuc: { mesaj: "You formed a small partnership; the profits pleased you both." } },
      { metin: "Skip partnership; congratulate.", basariliSonuc: { mesaj: "You congratulated without self-interest and rose in their esteem." } },
    ],
  },
  gt_sd01_sokak_cocugu_kotu: {
    baslik: "The Child Drawn into Crime",
    metin: "The child you turned away grew up on the streets and joined a gang. They demand payment for your indifference.",
    secenekler: [
      { metin: "Pay them off.", basariliSonuc: { mesaj: "You paid them off; the encounter left you uneasy for long." } },
      { metin: "Report to the authorities.", basariliSonuc: { mesaj: "You reported it; the matter ended, but your name was bandied about." } },
    ],
  },

  gt_sd02_grevci_isci: {
    baslik: "A Striking Worker",
    metin: "A young worker leading a strike faces dismissal. They ask for your support.",
    secenekler: [
      { metin: "Stand by them.", basariliSonuc: { mesaj: "You backed them; management disliked it, but the worker kept their job." } },
      { metin: "Avoid trouble; stay away.", basariliSonuc: { mesaj: "You kept away; the worker left disappointed." } },
    ],
  },
  gt_sd02_grevci_isci_iyi: {
    baslik: "They Became a Union Leader",
    metin: "The worker you backed now leads a powerful union. They promise to stand behind you whenever needed.",
    secenekler: [
      { metin: "Accept the union's backing.", basariliSonuc: { mesaj: "The union's support opened unexpected doors." } },
      { metin: "Accept only their friendship.", basariliSonuc: { mesaj: "You took friendship without self-interest; they never forgot you." } },
    ],
  },
  gt_sd02_grevci_isci_kotu: {
    baslik: "The Old Worker's Grudge",
    metin: "The worker you didn't back grew strong in the union and now deliberately obstructs your business over the old grievance.",
    secenekler: [
      { metin: "Try to mend things.", basariliSonuc: { mesaj: "You talked; they softened somewhat, but trust never fully returned." } },
      { metin: "Push on despite obstacles.", basariliSonuc: { mesaj: "You pushed on; your business stalled for a while." } },
    ],
  },

  gt_sd03_genc_mucit: {
    baslik: "An Inventor Without Capital",
    metin: "A young inventor asks for small capital for a promising invention no one believes in.",
    secenekler: [
      { metin: "Give small capital.", basariliSonuc: { mesaj: "You gave capital; the inventor's excitement gave you hope too." } },
      { metin: "Too risky; refuse.", basariliSonuc: { mesaj: "You refused as risky; the inventor tried other doors." } },
    ],
  },
  gt_sd03_genc_mucit_iyi: {
    baslik: "They Became a Wealthy Industrialist",
    metin: "The inventor you funded became a wealthy industrialist. Now they want you as a partner.",
    secenekler: [
      { metin: "Accept the partnership.", basariliSonuc: { mesaj: "You became a partner; your earnings rose notably." } },
      { metin: "Take back your investment.", basariliSonuc: { mesaj: "You declined partnership but got back well over your investment." } },
    ],
  },
  gt_sd03_genc_mucit_kotu: {
    baslik: "The Price of a Stolen Invention",
    metin: "The inventor you didn't help couldn't afford to protect the invention; a rival stole it, and the market hurt you too.",
    secenekler: [
      { metin: "Try to recoup the loss.", basariliSonuc: { mesaj: "You tried to recoup the loss and partly succeeded." } },
      { metin: "Accept the loss; move on.", basariliSonuc: { mesaj: "You accepted it, wishing you had helped that day." } },
    ],
  },

  gt_sd04_yetimhane: {
    baslik: "A Donation to the Orphanage",
    metin: "The orphanage in the poor quarter is nearly ruined. Its director collects donations door to door.",
    secenekler: [
      { metin: "Donate generously.", basariliSonuc: { mesaj: "You donated generously; the director wept." } },
      { metin: "Can't spare much; refuse.", basariliSonuc: { mesaj: "You said you couldn't spare much; the director left disappointed." } },
    ],
  },
  gt_sd04_yetimhane_iyi: {
    baslik: "A Doctor You Helped Raise",
    metin: "A girl raised in the orphanage your gift saved is now a respected doctor/teacher. She comes to visit.",
    secenekler: [
      { metin: "Accept her help.", basariliSonuc: { mesaj: "She offered free care/counsel: \"Without that orphanage, I wouldn't be here.\"" } },
      { metin: "Just take pride; ask nothing.", basariliSonuc: { mesaj: "You asked nothing; seeing her grow good was enough." } },
    ],
  },
  gt_sd04_yetimhane_kotu: {
    baslik: "The Trace of a Closed Orphanage",
    metin: "The orphanage you didn't fund closed; one of its children meets you on the street and unleashes old anger.",
    secenekler: [
      { metin: "Try to make amends.", basariliSonuc: { mesaj: "Late, you tried to make amends; though unforgiven, your conscience eased." } },
      { metin: "Leave the past behind.", basariliSonuc: { mesaj: "You left the past; but that angry look stayed in your mind." } },
    ],
  },

  gt_sd05_yarali_gazeteci: {
    baslik: "A Beaten Journalist",
    metin: "A young journalist lies beaten in the street over an article. No one helps, fearing trouble.",
    secenekler: [
      { metin: "Take him somewhere safe.", basariliSonuc: { mesaj: "You took him somewhere safe and had his wounds tended; he looked at you gratefully." } },
      { metin: "Avoid trouble; walk past.", basariliSonuc: { mesaj: "You walked past; you never learned the journalist's fate." } },
    ],
  },
  gt_sd05_yarali_gazeteci_iyi: {
    baslik: "A Famous Pen's Gratitude",
    metin: "The journalist you helped is now among the city's most-read writers. His columns praise you as a model citizen.",
    secenekler: [
      { metin: "Accept the praise and attention.", basariliSonuc: { mesaj: "His column drew attention; your name began to be spoken well of." } },
      { metin: "Stay humble; decline attention.", basariliSonuc: { mesaj: "You declined the attention; your humility raised you in his eyes." } },
    ],
  },
  gt_sd05_yarali_gazeteci_kotu: {
    baslik: "A Pen Turned Enemy",
    metin: "The journalist you didn't help survived and listed you among the indifferent. Now his pen criticizes you harshly.",
    secenekler: [
      { metin: "Meet and explain.", basariliSonuc: { mesaj: "You explained; not fully convinced, he softened his writing." } },
      { metin: "Ignore the criticism.", basariliSonuc: { mesaj: "You ignored it, but disliked your name being spoken poorly." } },
    ],
  },

  gt_sd06_muhacir_aile: {
    baslik: "An Immigrant Family",
    metin: "A newly arrived immigrant family with nowhere to stay asks to lodge temporarily in your attic.",
    secenekler: [
      { metin: "Give them shelter.", basariliSonuc: { mesaj: "You gave them your attic; they thanked you again and again." } },
      { metin: "No room; turn them away.", basariliSonuc: { mesaj: "You said there was no room; the family tried another door." } },
    ],
  },
  gt_sd06_muhacir_aile_iyi: {
    baslik: "The Reward of a Business Built",
    metin: "The head of the family you sheltered now runs a thriving shop. He visits to thank you.",
    secenekler: [
      { metin: "Become a small partner.", basariliSonuc: { mesaj: "You became a small partner; the earnings pleased you both." } },
      { metin: "Accept only his visit.", basariliSonuc: { mesaj: "You asked no partnership, just welcomed his visit." } },
    ],
  },
  gt_sd06_muhacir_aile_kotu: {
    baslik: "Betrayed Trust",
    metin: "A member of the family you turned away fell into crime and is scamming people in your name.",
    secenekler: [
      { metin: "Report to the authorities.", basariliSonuc: { mesaj: "You reported it; the matter ended, but being named was unpleasant." } },
      { metin: "Watch quietly; don't intervene.", basariliSonuc: { mesaj: "You stayed quiet; the fraud continued and your name suffered." } },
    ],
  },

  gt_sd07_hasta_isci: {
    baslik: "A Sick Factory Worker",
    metin: "A coworker at the factory is gravely ill with no money for medicine. They ask for your help.",
    secenekler: [
      { metin: "Cover the medicine.", basariliSonuc: { mesaj: "You paid for the medicine; the worker thanked you in tears." } },
      { metin: "Not your problem; refuse.", basariliSonuc: { mesaj: "You refused; the worker left hopeless." } },
    ],
  },
  gt_sd07_hasta_isci_iyi: {
    baslik: "The Recovered Worker's Loyalty",
    metin: "The worker whose medicine you paid for fully recovered and became a foreman. They vow lifelong loyalty.",
    secenekler: [
      { metin: "Make them a close aide.", basariliSonuc: { mesaj: "You took them on; their loyalty and skill quickly helped your affairs." } },
      { metin: "Accept only their friendship.", basariliSonuc: { mesaj: "You offered no job, just took friendship; the bond lasted years." } },
    ],
  },
  gt_sd07_hasta_isci_kotu: {
    baslik: "The Family's Resentment",
    metin: "The worker you didn't help succumbed to illness. His family confronts you with your indifference.",
    secenekler: [
      { metin: "Support the family.", basariliSonuc: { mesaj: "Though late, you supported the family and partly won them over." } },
      { metin: "Don't feel guilty; move on.", basariliSonuc: { mesaj: "You tried not to feel guilty, but that look stayed with you." } },
    ],
  },

  gt_sd08_genc_kadin_egitim: {
    baslik: "A Young Woman Who Wants to Study",
    metin: "A young woman wants to study despite the customs of her time, but can't afford books or lessons. She asks your support.",
    secenekler: [
      { metin: "Support her education.", basariliSonuc: { mesaj: "You supported her; the determination in her eyes moved you." } },
      { metin: "Not your business; refuse.", basariliSonuc: { mesaj: "You refused; she left disappointed." } },
    ],
  },
  gt_sd08_genc_kadin_egitim_iyi: {
    baslik: "The Woman Who Became a Teacher/Writer",
    metin: "The woman whose studies you supported is now a respected teacher/writer. She sent an open letter of thanks and a small gift.",
    secenekler: [
      { metin: "Accept the gift and thanks.", basariliSonuc: { mesaj: "Many read the letter; your name began to be spoken well of." } },
      { metin: "Stay humble; take pride.", basariliSonuc: { mesaj: "You stayed humble, though deeply proud." } },
    ],
  },
  gt_sd08_genc_kadin_egitim_kotu: {
    baslik: "A Scandalous Name Mentioned",
    metin: "The woman you didn't support fell on hard times into a disreputable circle. Your name surfaces in a scandal too, as if you were to blame.",
    secenekler: [
      { metin: "Clear your name.", basariliSonuc: { mesaj: "You worked to clear your name and partly succeeded." } },
      { metin: "Say time will fade it.", basariliSonuc: { mesaj: "You thought time would fade it; gossip bothered you a while." } },
    ],
  },

  gt_sd09_borclu_esnaf: {
    baslik: "A Shopkeeper on the Verge of Closing",
    metin: "A small shopkeeper, unable to pay his debts, is about to close shop. He asks you to co-sign or lend money.",
    secenekler: [
      { metin: "Co-sign / lend money.", basariliSonuc: { mesaj: "You co-signed and lent; he thanked you in tears." } },
      { metin: "Too risky; refuse.", basariliSonuc: { mesaj: "You refused; the shopkeeper returned hopeless." } },
    ],
  },
  gt_sd09_borclu_esnaf_iyi: {
    baslik: "The Reward of a Recovered Business",
    metin: "The shopkeeper you backed recovered and now runs several branches. He comes to repay far beyond his debt.",
    secenekler: [
      { metin: "Accept the extra.", basariliSonuc: { mesaj: "He repaid threefold: \"You saved me that day.\"" } },
      { metin: "Take only the principal.", basariliSonuc: { mesaj: "You wanted no more; you rose further in his esteem." } },
    ],
  },
  gt_sd09_borclu_esnaf_kotu: {
    baslik: "The Ruined Shopkeeper's Anger",
    metin: "The shopkeeper you didn't back went bankrupt and lost everything. He confronts you, blaming you for not helping.",
    secenekler: [
      { metin: "Do something, however late.", basariliSonuc: { mesaj: "You tried to help; he softened, though not fully forgiving." } },
      { metin: "Reject the blame.", basariliSonuc: { mesaj: "You took no blame; the encounter troubled you a while." } },
    ],
  },

  gt_sd10_savas_gazisi: {
    baslik: "A War Veteran Looking for Work",
    metin: "A war veteran, disabled, wanders the streets without work. He asks you for a job.",
    secenekler: [
      { metin: "Find him a job.", basariliSonuc: { mesaj: "You found him suitable work; a hope long absent lit his eyes." } },
      { metin: "No place for him; refuse.", basariliSonuc: { mesaj: "You said there was no place; the veteran left, head bowed." } },
    ],
  },
  gt_sd10_savas_gazisi_iyi: {
    baslik: "A Loyal Helper",
    metin: "The veteran you employed has been among your most loyal workers for years. He wants to repay you with a special service.",
    secenekler: [
      { metin: "Accept his service.", basariliSonuc: { mesaj: "His loyalty and experience contributed valuably." } },
      { metin: "Accept only his friendship.", basariliSonuc: { mesaj: "You asked no more, just friendship; your bond lasted years." } },
    ],
  },
  gt_sd10_savas_gazisi_kotu: {
    baslik: "A Problem Born of Trauma",
    metin: "The veteran you turned away, untreated for his trauma, fell into trouble. Your name is entangled in an incident.",
    secenekler: [
      { metin: "Help him and set it right.", basariliSonuc: { mesaj: "Though late, you tried to help and set it right." } },
      { metin: "Stay out of it.", basariliSonuc: { mesaj: "You stayed out, but disliked your name being mentioned." } },
    ],
  },

  gt_sd11_ustabasi_firsati: {
    baslik: "A Talented Young Worker",
    metin: "A young, hardworking worker asks your backing to become foreman. Other candidates are more senior.",
    secenekler: [
      { metin: "Give him a chance.", basariliSonuc: { mesaj: "You backed him; he vowed not to waste your trust." } },
      { metin: "Seniority comes first; refuse.", basariliSonuc: { mesaj: "You cited seniority and refused; the worker turned away disappointed." } },
    ],
  },
  gt_sd11_ustabasi_firsati_iyi: {
    baslik: "A Loyal Foreman",
    metin: "The worker you backed is now a reliable foreman, your loyal right hand lifting you for years.",
    secenekler: [
      { metin: "Grow the business together.", basariliSonuc: { mesaj: "You grew the business together; his skill showed in your earnings." } },
      { metin: "Just value his loyalty.", basariliSonuc: { mesaj: "You asked no more; you simply valued his loyalty." } },
    ],
  },
  gt_sd11_ustabasi_firsati_kotu: {
    baslik: "Talent Lost to a Rival",
    metin: "The worker you passed over joined your rival as foreman. Now he uses his old knowledge to hurt your business.",
    secenekler: [
      { metin: "Update your methods.", basariliSonuc: { mesaj: "Updating was costly, but you kept up with the competition." } },
      { metin: "Accept the loss.", basariliSonuc: { mesaj: "You accepted it; not having given him a chance nagged you." } },
    ],
  },

  gt_sd12_muhendis_laboratuvar: {
    baslik: "An Engineer Wanting a Small Laboratory",
    metin: "A young engineer wants a small workshop/lab for his machine design. No one takes him seriously.",
    secenekler: [
      { metin: "Provide a small facility.", basariliSonuc: { mesaj: "You provided a small workshop; he set to work at once." } },
      { metin: "Wasted money; refuse.", basariliSonuc: { mesaj: "You called it wasted money; the engineer tried other doors." } },
    ],
  },
  gt_sd12_muhendis_laboratuvar_iyi: {
    baslik: "Partner in a Great Invention",
    metin: "The engineer you backed achieved great success with his machine. He names you first investor and wants to give you your share.",
    secenekler: [
      { metin: "Accept your share.", basariliSonuc: { mesaj: "You received your share many times over as first investor; earnings rose considerably." } },
      { metin: "Take back your investment.", basariliSonuc: { mesaj: "You wanted no more, just your investment's return." } },
    ],
  },
  gt_sd12_muhendis_laboratuvar_kotu: {
    baslik: "The Price of a Failed Experiment",
    metin: "The engineer you didn't support rushed a hasty experiment that went badly; it became an inquiry naming you too.",
    secenekler: [
      { metin: "Tell the truth in the inquiry.", basariliSonuc: { mesaj: "You told the truth; it cost you, but your name stayed clean." } },
      { metin: "Stay away from it.", basariliSonuc: { mesaj: "You stayed away; still, being named was unpleasant." } },
    ],
  },

  gt_sd13_kimsesiz_cocuk_fabrika: {
    baslik: "An Orphaned Child Working at the Factory",
    metin: "An orphaned child at your factory has fallen ill from heavy labor. You could send them to school and stop working them.",
    secenekler: [
      { metin: "Protect them, send to school.", basariliSonuc: { mesaj: "You took the child off heavy work and sent them to school; hope lit their eyes." } },
      { metin: "Keep them working.", basariliSonuc: { mesaj: "To keep the factory running, you kept the child working." } },
    ],
  },
  gt_sd13_kimsesiz_cocuk_fabrika_iyi: {
    baslik: "The Child Who Became a Doctor/Engineer",
    metin: "The child you sent to school is now a respected doctor/engineer. They come to thank you and offer help.",
    secenekler: [
      { metin: "Accept the help.", basariliSonuc: { mesaj: "You accepted; both your health and your affairs benefited." } },
      { metin: "Just take pride.", basariliSonuc: { mesaj: "You asked for nothing; seeing how they turned out was enough." } },
    ],
  },
  gt_sd13_kimsesiz_cocuk_fabrika_kotu: {
    baslik: "A Child Dragged into Crime",
    metin: "The child you kept working ended up on the street and joined a small gang. Now they cause trouble at your factory.",
    secenekler: [
      { metin: "Step in, try to fix it.", basariliSonuc: { mesaj: "Late as it was, you stepped in and tried to fix things." } },
      { metin: "Take precautions, keep them away.", basariliSonuc: { mesaj: "You took precautions and kept them away; your conscience gave no rest." } },
    ],
  },

  gt_sd14_yangin_komsu: {
    baslik: "A Neighbor Whose House Burned Down",
    metin: "A fire left the neighboring family homeless. They ask to stay temporarily at your house/property.",
    secenekler: [
      { metin: "Make room, help them.", basariliSonuc: { mesaj: "You made room and helped; the family wept with gratitude." } },
      { metin: "Keep my order, refuse.", basariliSonuc: { mesaj: "You refused to keep your order; the family tried another door." } },
    ],
  },
  gt_sd14_yangin_komsu_iyi: {
    baslik: "The Recovered Neighbor Family's Kindness",
    metin: "The neighbors you helped have started their own business and recovered. They show their gratitude with a gesture.",
    secenekler: [
      { metin: "Accept the gesture.", basariliSonuc: { mesaj: "They brought a small, meaningful gift: \"You gave us life that day.\"" } },
      { metin: "Just stay good neighbors.", basariliSonuc: { mesaj: "You wanted no gift, just good neighborliness; the bond stayed warm for years." } },
    ],
  },
  gt_sd14_yangin_komsu_kotu: {
    baslik: "The Old Neighbor Turned Rival",
    metin: "The neighbors you refused struggled to recover until someone else helped. Now they're partners with that person, your greatest rival.",
    secenekler: [
      { metin: "Stay on good terms anyway.", basariliSonuc: { mesaj: "You tried to stay on good terms despite the rivalry, and partly succeeded." } },
      { metin: "Hit back hard.", basariliSonuc: { mesaj: "You hit back hard; the struggle wore on you too." } },
    ],
  },

  gt_sd15_sokak_muzisyeni: {
    baslik: "A Talented Street Musician",
    metin: "A young violinist on the corner can't earn a living and is about to sell his instrument. He asks you for help.",
    secenekler: [
      { metin: "Give money so he keeps it.", basariliSonuc: { mesaj: "You gave money; he kept the instrument and played you a piece in thanks." } },
      { metin: "Empty dreams, walk on.", basariliSonuc: { mesaj: "You dismissed it as empty dreams and walked on; he left sadly." } },
    ],
  },
  gt_sd15_sokak_muzisyeni_iyi: {
    baslik: "The Street Musician Who Became Famous",
    metin: "The young musician whose instrument you saved is now a famous artist. He invites you to a private concert and honors you from the stage.",
    secenekler: [
      { metin: "Accept the invitation.", basariliSonuc: { mesaj: "He named you from the stage; the hall gave you a standing ovation." } },
      { metin: "Watch quietly.", basariliSonuc: { mesaj: "You watched without stepping forward; your pride never faded." } },
    ],
  },
  gt_sd15_sokak_muzisyeni_kotu: {
    baslik: "The Musician Who Fell into Bad Ways",
    metin: "The musician you didn't help sold his instrument and fell in with bad company. Now a scandal mentions your name too.",
    secenekler: [
      { metin: "Give him another chance.", basariliSonuc: { mesaj: "Late as it was, you gave him a chance; it helped him recover a little." } },
      { metin: "Keep clear of it.", basariliSonuc: { mesaj: "You tried to keep clear, but seeing your name mentioned was unpleasant." } },
    ],
  },
};
