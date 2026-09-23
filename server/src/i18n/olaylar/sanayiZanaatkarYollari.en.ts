import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiZanaatkarYollari.ts — İngilizce çevirileri (45 olay). */
export const OLAYLAR_SANAYI_ZANAATKAR_YOLLARI_EN: Record<string, OlayCeviri> = {
  sd_zanaatkar_yol_ilk_makine: {
    baslik: "The First Machine",
    metin:
      "They brought a new steam machine into your workshop; the work you used to do by hand can now be done by this iron beast too. How you treat this machine will determine the rest of your career.",
    secenekler: [
      {
        metin: "Use the machine to full capacity, grow your production with it.",
        basariliSonuc: {
          mesaj: "Your production multiplied with the machine; your workshop became one of the city's most efficient.",
          detay: "Iron gears are hands that never tire.",
        },
        basarisizSonuc: {
          mesaj: "You didn't handle the machine correctly, a malfunction injured you too.",
          detay: "New technology doesn't give speed without being learned.",
        },
      },
      {
        metin: "Set the machine aside, insist on handcraft.",
        basariliSonuc: {
          mesaj: "The quality of your handwork impressed customers; you began to be called a 'true master'.",
          detay: "Some things can't be imitated by a machine.",
        },
        basarisizSonuc: {
          mesaj: "Manual production couldn't keep up with your rivals; you lost customers.",
          detay: "Resisting has its price too.",
        },
      },
      {
        metin: "Organize with other workers against the machine's conditions.",
        basariliSonuc: {
          mesaj: "The workers rallied behind you; the boss made small but real concessions.",
          detay: "Voices speaking together are stronger than one alone.",
        },
        basarisizSonuc: {
          mesaj: "The attempt was crushed, a few of your friends were fired; your conscience isn't at ease.",
          detay: "Not every act of resistance wins, but it leaves a mark.",
        },
      },
      {
        metin: "Invest in the machine and try to grow your own small workshop.",
        basariliSonuc: {
          mesaj: "Your investment paid off quickly; your workshop is now much bigger than before.",
          detay: "Capital grows in patient hands.",
        },
        basarisizSonuc: {
          mesaj: "The investment backfired; your debt burden grew.",
          detay: "Every venture takes on risk.",
        },
      },
    ],
  },

  // --- yol:zanaatkar:makineci ---
  sd_zanaatkar_makineci_1: {
    baslik: "A Second Machine",
    metin: "The opportunity arose to buy a second machine with the money you earned; the risk is great, but so is the potential.",
    secenekler: [
      {
        metin: "Buy the machine, grow production.",
        basariliSonuc: {
          mesaj: "The second machine doubled your production; your workshop is now one of the biggest in the region.",
          detay: "Growing takes courage.",
        },
        basarisizSonuc: {
          mesaj: "The machine kept breaking down; your investment cost you for a while.",
          detay: "Every machine brings its own troubles too.",
        },
      },
    ],
  },
  sd_zanaatkar_makineci_2: {
    baslik: "Workplace Accident",
    metin: "One of the machines malfunctioned unexpectedly; one of your workers was injured.",
    secenekler: [
      {
        metin: "Cover the treatment costs, improve safety.",
        basariliSonuc: {
          mesaj: "Your workers' trust in you grew; a culture of loyalty formed in your workshop.",
          detay: "A master who takes responsibility earns trust.",
        },
        basarisizSonuc: {
          mesaj: "You fell short, the worker left angry; your name was tarnished for a while.",
          detay: "Every accident is a kind of test.",
        },
      },
    ],
  },
  sd_zanaatkar_makineci_3: {
    baslik: "A New Model",
    metin: "A new machine model hitting the market is making your old machines obsolete.",
    secenekler: [
      {
        metin: "Upgrade the old machines.",
        basariliSonuc: { mesaj: "The upgrade worked; your competitiveness grew.", detay: "Keeping pace with technology is staying alive." },
        basarisizSonuc: { mesaj: "The upgrade turned out troublesome, production stopped for a few weeks.", detay: "Not every renewal goes smoothly." },
      },
    ],
  },
  sd_zanaatkar_makineci_4: {
    baslik: "Cutting the Workforce",
    metin: "The machines are making some workers' jobs unnecessary; you could lay them off.",
    secenekler: [
      {
        metin: "Lay them off, cut costs.",
        basariliSonuc: { mesaj: "Your costs dropped but the workers you laid off cursed you.", detay: "Efficiency sometimes forgets people." },
        basarisizSonuc: { mesaj: "The layoffs were met with backlash, a few workers launched a strike.", detay: "People aren't easily dispensed with." },
      },
      {
        metin: "Shift the workers to different roles.",
        basariliSonuc: { mesaj: "The workers adapted to their new roles; their loyalty grew.", detay: "Investing in people pays off in the long run." },
        basarisizSonuc: { mesaj: "Adapting to the new roles didn't work, productivity dropped.", detay: "Not every transition is easy." },
      },
    ],
  },
  sd_zanaatkar_makineci_5: {
    baslik: "A Bank Loan",
    metin: "The chance arose to take a bank loan for a bigger fleet of machines.",
    secenekler: [
      {
        metin: "Take the loan, grow.",
        basariliSonuc: { mesaj: "The loan accelerated your growth; your workshop now counts as a factory.", detay: "Bold borrowing sometimes pays off big." },
        basarisizSonuc: { mesaj: "The investment didn't bring the return you expected, your debt burden grew heavier.", detay: "Every debt carries risk with it." },
      },
    ],
  },
  sd_zanaatkar_makineci_6: {
    baslik: "A Spy From a Rival Factory",
    metin: "An employee of a rival factory offers to sell you their machine designs.",
    secenekler: [
      {
        metin: "Accept the offer.",
        basariliSonuc: {
          mesaj: "The stolen designs leapt your production forward in one move.",
          detay: "Stolen knowledge is an advantage too — but it eats at the conscience.",
        },
        basarisizSonuc: {
          mesaj: "You fell into a trap; the spy turned out to actually work for the rival factory.",
          detay: "Easy opportunities are usually a trap.",
        },
      },
      {
        metin: "Refuse the offer, stay honest.",
        basariliSonuc: { mesaj: "You turned the offer down; your conscience is at ease.", detay: "Some shortcuts spoil the path itself." },
        basarisizSonuc: { mesaj: "Refusing left you a little behind but you don't regret it.", detay: "Doing right can have a price." },
      },
    ],
  },
  sd_zanaatkar_makineci_7: {
    baslik: "Risk of a Boiler Explosion",
    metin: "The inspector says maintenance on the steam boiler has been delayed, and it carries a risk of explosion.",
    secenekler: [
      {
        metin: "Have the maintenance done immediately.",
        basariliSonuc: { mesaj: "The maintenance was completed without trouble; a great disaster was prevented.", detay: "Prevention is always cheaper than repair." },
        basarisizSonuc: { mesaj: "A small accident happened during the maintenance, you got injured.", detay: "Some jobs can't be done without danger." },
      },
    ],
  },
  sd_zanaatkar_makineci_8: {
    baslik: "An International Order",
    metin: "An overseas merchant wants to place a big order from your machine-driven production line.",
    secenekler: [
      {
        metin: "Accept the order.",
        basariliSonuc: {
          mesaj: "The order was delivered on time and in full; your name became known in overseas markets.",
          detay: "Great opportunities demand great preparation.",
        },
        basarisizSonuc: { mesaj: "You overreached your capacity, couldn't finish the order on time.", detay: "Every opportunity can exceed your capacity." },
      },
    ],
  },
  sd_zanaatkar_makineci_9: {
    baslik: "Industry Award",
    metin: "The city is giving an award to the most efficient workshop; your workshop is among the candidates.",
    secenekler: [
      {
        metin: "Enter the competition.",
        basariliSonuc: { mesaj: "You won the award; your workshop became the pride of the city.", detay: "Efficiency sometimes gets recognized too." },
        basarisizSonuc: { mesaj: "Another workshop won the award, you were disappointed.", detay: "Not every competition is won." },
      },
    ],
  },
  sd_zanaatkar_makineci_10: {
    baslik: "The Limit of Automation",
    metin: "Some jobs are too delicate for machines to do; skilled hands are still needed for them.",
    secenekler: [
      {
        metin: "Set up a special team for delicate work.",
        basariliSonuc: { mesaj: "The special team took on the work the machine couldn't do; quality rose.", detay: "Machine and hand together are stronger." },
        basarisizSonuc: { mesaj: "The team couldn't hit the expected quality.", detay: "Skilled hands can't be replaced." },
      },
    ],
  },
  sd_zanaatkar_makineci_11: {
    baslik: "A Symbol of the Industrial Age",
    metin: "Your workshop is now one of the biggest, most modern production facilities in the region.",
    secenekler: [
      {
        metin: "Celebrate your success, make your name known.",
        basariliSonuc: { mesaj: "Your name entered the industrial age's stories of success.", detay: "Bold steps can become a great legacy." },
        basarisizSonuc: { mesaj: "The celebration didn't get the attention you expected but your success is real.", detay: "Not every success is celebrated loudly." },
      },
    ],
  },

  // --- yol:zanaatkar:gelenekci ---
  sd_zanaatkar_gelenekci_1: {
    baslik: "Praise for Handcraft",
    metin: "A journalist found you to write about the craftsmen resisting the machines.",
    secenekler: [
      {
        metin: "Give the interview, tell your story.",
        basariliSonuc: {
          mesaj: "When the piece was published, your name became known outside the city too.",
          detay: "Sometimes resisting becomes a story of its own.",
        },
        basarisizSonuc: { mesaj: "The piece painted you as backward; you lost a few customers.", detay: "Not every light falls from the same angle." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_2: {
    baslik: "Factory Competition",
    metin: "A big factory opened near you and started selling the same goods far below your prices.",
    secenekler: [
      {
        metin: "Focus on niche customers, highlighting your quality.",
        basariliSonuc: { mesaj: "Wealthy customers with refined taste kept choosing you.", detay: "You don't need everyone, just the right customer." },
        basarisizSonuc: { mesaj: "Most of your customers switched to the factory over price.", detay: "Competition can be merciless." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_3: {
    baslik: "A Wealthy Collector",
    metin: "A wealthy collector wants to commission a fully handmade, one-of-a-kind piece.",
    secenekler: [
      {
        metin: "Accept the commission, make your very best.",
        basariliSonuc: { mesaj: "The collector was in awe, and spoke of you far and wide.", detay: "Handcraft is always valued by the right eye." },
        basarisizSonuc: { mesaj: "The piece didn't satisfy the collector, it was returned.", detay: "High expectations aren't always met." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_4: {
    baslik: "A Young Apprentice",
    metin: "A young apprentice wanting to learn handcraft came to your door — a rare request in the age of factories.",
    secenekler: [
      {
        metin: "Take him in, pass on the tradition.",
        basariliSonuc: { mesaj: "The apprentice developed his skill; the next generation of the craft is secured.", detay: "A tradition can't live without a student." },
        basarisizSonuc: { mesaj: "The apprentice grew impatient and decided to look for work at a factory.", detay: "Not everyone learns patience." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_5: {
    baslik: "The Press Interest Continues",
    metin: "The papers brought you back into the news under the headline 'the last masters resisting the machines'.",
    secenekler: [
      {
        metin: "Make the most of the attention, promote your workshop.",
        basariliSonuc: { mesaj: "The attention brought new customers; your workshop became a place visited like a museum.", detay: "Nostalgia sometimes pays." },
        basarisizSonuc: { mesaj: "The attention was fleeting, you didn't see a lasting benefit.", detay: "Not every headline lasts long." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_6: {
    baslik: "The Pressure of the Electric Age",
    metin: "Electricity is coming to the city; the future of handcraft grows even more uncertain.",
    secenekler: [
      {
        metin: "Continue on your path despite the change.",
        basariliSonuc: { mesaj: "Your persistence set you apart as one of the few masters resisting change.", detay: "Some values resist time." },
        basarisizSonuc: { mesaj: "Most of your customers switched to electric production, your work dwindled.", detay: "Time sometimes moves on mercilessly." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_7: {
    baslik: "A Small Compromise",
    metin: "Instead of continuing to produce entirely by hand, you're considering using a small tool for some simple steps.",
    secenekler: [
      {
        metin: "Make a small compromise.",
        basariliSonuc: { mesaj: "The small change boosted your efficiency, you lost nothing of your identity.", detay: "Flexibility isn't compromising your principles." },
        basarisizSonuc: { mesaj: "The compromise felt foreign to you, you gave it up.", detay: "Not everyone can accept every compromise." },
      },
      {
        metin: "Stay entirely traditional, accept no tool.",
        basariliSonuc: { mesaj: "Your resolve made you even more valued in your customers' eyes.", detay: "Some masters never compromise their principles." },
        basarisizSonuc: { mesaj: "Your resolve cost you a few jobs.", detay: "Principle sometimes carries a price." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_8: {
    baslik: "A Museum Invitation",
    metin: "The city museum wants to exhibit your workshop as a 'living artistic heritage'.",
    secenekler: [
      {
        metin: "Accept the invitation.",
        basariliSonuc: {
          mesaj: "Your workshop now draws a flood of visitors; your name became a lasting legacy.",
          detay: "Keeping the past alive is sometimes leaving a mark on the future.",
        },
        basarisizSonuc: { mesaj: "The exhibit didn't get the attention you expected.", detay: "Not every legacy is recognized right away." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_9: {
    baslik: "One Last Resistance",
    metin: "Almost all your rivals have switched to the factory; you're still producing by hand.",
    secenekler: [
      {
        metin: "Keep resisting to the end.",
        basariliSonuc: { mesaj: "Your resistance became legend; you began to be called 'the last true master'.", detay: "Some resistances endure not to win, but for meaning." },
        basarisizSonuc: { mesaj: "Your resistance put you under financial strain, a few months were very hard.", detay: "Staying principled has its price." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_10: {
    baslik: "A Book Offer",
    metin: "A writer wants to write a book about your life and craft.",
    secenekler: [
      {
        metin: "Tell your story.",
        basariliSonuc: { mesaj: "When the book was published, your name became known across the country.", detay: "A life sometimes fits into a book." },
        basarisizSonuc: { mesaj: "The book didn't get the attention you expected.", detay: "Not every story reaches wide audiences." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_11: {
    baslik: "The Last Master's Legacy",
    metin: "You've devoted years to handcraft; now it's time to think about who will carry on this tradition.",
    secenekler: [
      {
        metin: "Hand your workshop over to your most loyal apprentice.",
        basariliSonuc: {
          mesaj: "Your workshop will carry on into the future in trustworthy hands; your name will be remembered with peace.",
          detay: "The most beautiful way to keep a tradition alive is to entrust it to someone.",
        },
        basarisizSonuc: { mesaj: "You couldn't find a suitable successor, the future remains uncertain.", detay: "Not every legacy is easily passed on." },
      },
    ],
  },

  // --- yol:zanaatkar:sendikaci ---
  sd_zanaatkar_sendikaci_1: {
    baslik: "Strike Call",
    metin: "The workers suggest striking for better conditions; they expect you to lead it.",
    secenekler: [
      {
        metin: "Organize the strike and lead it.",
        basariliSonuc: {
          mesaj: "The strike succeeded; your name became legend among the workers.",
          detay: "A bold stand sometimes wins.",
        },
        basarisizSonuc: {
          mesaj: "The strike was crushed, you were temporarily unemployed.",
          detay: "Not every struggle is won, but none is forgotten.",
        },
      },
    ],
  },
  sd_zanaatkar_sendikaci_2: {
    baslik: "The Boss's Offer",
    metin: "The boss offers you a special raise in exchange for your silence.",
    secenekler: [
      {
        metin: "Refuse the offer, continue your cause.",
        basariliSonuc: {
          mesaj: "Refusing earned you respect among the workers.",
          detay: "Some prices aren't worth paying.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered the boss; a small penalty was imposed.",
          detay: "Staying principled can have a price.",
        },
      },
    ],
  },
  sd_zanaatkar_sendikaci_3: {
    baslik: "Blacklist",
    metin: "Some bosses put you on a blacklist as a 'troublemaking worker'; finding work is getting harder.",
    secenekler: [
      {
        metin: "Don't give up, continue your cause.",
        basariliSonuc: { mesaj: "Despite the hardships your cause gained strength; you became a respected name among the workers.", detay: "Pressure sometimes strengthens a cause." },
        basarisizSonuc: { mesaj: "You had serious trouble finding work, a few months of financial hardship followed.", detay: "The price of resistance is sometimes heavy." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_4: {
    baslik: "Attempt to Found a Union",
    metin: "It's time to form a formal union together with the workers; a big step.",
    secenekler: [
      {
        metin: "Found the union.",
        basariliSonuc: { mesaj: "The union was officially founded; the workers' voice is now stronger.", detay: "Organizing means amplifying the voice." },
        basarisizSonuc: { mesaj: "The attempt was noticed early and blocked.", detay: "Not every attempt succeeds the first time." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_5: {
    baslik: "Police Intervention",
    metin: "During a demonstration, the police intervened harshly against the workers; you were there too.",
    secenekler: [
      {
        metin: "Help the injured workers.",
        basariliSonuc: { mesaj: "Your help was appreciated but you also took some minor injuries.", detay: "Being there in hard moments is the greatest solidarity." },
        basarisizSonuc: { mesaj: "You got injured in the chaos too.", detay: "Crowds sometimes spiral out of control." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_6: {
    baslik: "A Journalist's Interest",
    metin: "A journalist wants to interview you about your fight for workers' rights.",
    secenekler: [
      {
        metin: "Give the interview.",
        basariliSonuc: { mesaj: "The piece caused a wide stir; your cause is now known outside the city too.", detay: "A story can grow a movement." },
        basarisizSonuc: { mesaj: "The piece portrayed you as harsh and dangerous; some workers kept their distance.", detay: "Not every light falls from the same angle." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_7: {
    baslik: "A Traitor Within",
    metin: "Someone in the union is suspected of leaking information to the bosses.",
    secenekler: [
      {
        metin: "Investigate quietly, gather evidence.",
        basariliSonuc: { mesaj: "You found the traitor and shut him out; trust was renewed within the union.", detay: "Catching betrayal early protects the cause." },
        basarisizSonuc: { mesaj: "You couldn't find evidence, suspicion spread among everyone.", detay: "Mistrust rots an organization from within." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_8: {
    baslik: "Collective Agreement",
    metin: "After a long struggle the bosses agreed to sit down for a collective bargaining agreement.",
    secenekler: [
      {
        metin: "Sit at the table, get the best deal.",
        basariliSonuc: { mesaj: "The agreement was signed in the workers' favor; you won a historic victory.", detay: "A patient struggle bears fruit at the table." },
        basarisizSonuc: { mesaj: "The agreement turned out weaker than expected, some workers were disappointed.", detay: "Not every table brings victory." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_9: {
    baslik: "A Political Offer",
    metin: "A local political movement wants to nominate you to represent the workers' cause.",
    secenekler: [
      {
        metin: "Accept the offer.",
        basariliSonuc: { mesaj: "Your candidacy gave the workers' movement new strength.", detay: "Some struggles reach all the way to parliament." },
        basarisizSonuc: { mesaj: "Stepping into politics put you through an exhausting campaign, the result was disappointing.", detay: "Not every political venture is won." },
      },
      {
        metin: "Refuse the offer, choose to stay in your workshop.",
        basariliSonuc: { mesaj: "You chose simplicity, your peace of mind stayed intact.", detay: "Not every struggle has to be carried into parliament." },
        basarisizSonuc: { mesaj: "Some of your comrades met your refusal with disappointment.", detay: "Not every decision pleases everyone." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_10: {
    baslik: "The Next Generation",
    metin: "Young workers want to learn unionizing from you.",
    secenekler: [
      {
        metin: "Pass on your experience to them.",
        basariliSonuc: { mesaj: "A new generation is ready to carry your struggle forward.", detay: "A cause lives on through its students." },
        basarisizSonuc: { mesaj: "The young ones turned out impatient, your experience couldn't be fully passed on.", detay: "Not every lesson is absorbed right away." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_11: {
    baslik: "The Legacy of the Struggle",
    metin: "Your years-long struggle is now remembered as a turning point in the city's history of workers' rights.",
    secenekler: [
      {
        metin: "Accept your legacy with pride.",
        basariliSonuc: {
          mesaj: "Your name went down in history as one of the pioneers of the workers' rights struggle.",
          detay: "Some struggles outlast a single lifetime.",
        },
        basarisizSonuc: { mesaj: "Your legacy wasn't recognized right away, but its effect endures.", detay: "History is sometimes written late." },
      },
    ],
  },

  // --- yol:zanaatkar:girisimci ---
  sd_zanaatkar_girisimci_1: {
    baslik: "A Partnership Offer",
    metin: "A wealthy merchant offers to become your workshop's partner — in exchange for capital, he wants a share of control.",
    secenekler: [
      {
        metin: "Accept the partnership, speed up growth.",
        basariliSonuc: {
          mesaj: "The partnership turned your workshop into a large enterprise.",
          detay: "Sometimes growing requires sharing control.",
        },
        basarisizSonuc: {
          mesaj: "You fell into disagreement with your partner; things got tangled.",
          detay: "Every partnership needs harmony.",
        },
      },
    ],
  },
  sd_zanaatkar_girisimci_2: {
    baslik: "A New Branch",
    metin: "You have the opportunity to open a branch in the neighboring town; the risk is great but so is the market.",
    secenekler: [
      {
        metin: "Open the branch.",
        basariliSonuc: {
          mesaj: "The branch started turning a profit quickly; your name became known in the neighboring town too.",
          detay: "Bold steps sometimes bring big returns.",
        },
        basarisizSonuc: {
          mesaj: "The branch lost money, you had to close it.",
          detay: "Not every expansion ends in success.",
        },
      },
    ],
  },
  sd_zanaatkar_girisimci_3: {
    baslik: "An Offer to Buy Out a Rival",
    metin: "The chance arose to buy out a small but promising rival workshop.",
    secenekler: [
      {
        metin: "Buy the workshop.",
        basariliSonuc: { mesaj: "The acquisition succeeded; your market share grew.", detay: "The fastest way to grow is sometimes buying the rival." },
        basarisizSonuc: { mesaj: "The workshop wasn't worth what you expected, your investment took a loss.", detay: "Not every acquisition pays off." },
      },
    ],
  },
  sd_zanaatkar_girisimci_4: {
    baslik: "A Stock Market Rumor",
    metin: "You have the chance to make a small investment in the city's new industrial stock exchange.",
    secenekler: [
      {
        metin: "Make the investment.",
        basariliSonuc: { mesaj: "Your investment brought an unexpected profit.", detay: "Sometimes luck speaks louder than capital." },
        basarisizSonuc: { mesaj: "The market crashed, your investment evaporated.", detay: "Speculation is always risky." },
      },
      {
        metin: "Don't take the risk, put the money into your workshop.",
        basariliSonuc: { mesaj: "The safe investment brought small but steady growth.", detay: "Solid foundations pay off in the long run." },
        basarisizSonuc: { mesaj: "Your investment didn't yield as much as you hoped.", detay: "Not even the safe path is a guarantee." },
      },
    ],
  },
  sd_zanaatkar_girisimci_5: {
    baslik: "Board of Directors",
    metin: "As the business grows, you now have to make decisions with a board of directors instead of alone.",
    secenekler: [
      {
        metin: "Set up the board, get professional.",
        basariliSonuc: { mesaj: "The board brought new order and prestige to your business.", detay: "Growing sometimes requires sharing control." },
        basarisizSonuc: { mesaj: "Disagreements with board members slowed things down.", detay: "Every partnership needs harmony." },
      },
    ],
  },
  sd_zanaatkar_girisimci_6: {
    baslik: "Economic Crisis",
    metin: "A sudden economic crisis shook the entire industrial sector; your business is at risk too.",
    secenekler: [
      {
        metin: "Cut costs, weather the crisis.",
        basariliSonuc: { mesaj: "With tight measures you weathered the crisis with little damage.", detay: "Crisis time is discipline time." },
        basarisizSonuc: { mesaj: "The crisis hit your business hard, you took a big loss.", detay: "Not every crisis leaves an equal scar." },
      },
    ],
  },
  sd_zanaatkar_girisimci_7: {
    baslik: "Charity Work",
    metin: "You were asked to join a campaign helping the city's poor working families.",
    secenekler: [
      {
        metin: "Donate generously.",
        basariliSonuc: { mesaj: "Your donation was appreciated; your name was spoken of as a charitable businessman.", detay: "Wealth gains meaning as it's shared." },
        basarisizSonuc: { mesaj: "Your donation didn't get the attention you expected.", detay: "Not every good deed is noticed right away." },
      },
      {
        metin: "Don't join, focus on your business.",
        basariliSonuc: { mesaj: "You focused on your business, didn't join the campaign.", detay: "Everyone sets their own priorities." },
        basarisizSonuc: { mesaj: "Not joining drew criticism.", detay: "Some silences are heard loudly." },
      },
    ],
  },
  sd_zanaatkar_girisimci_8: {
    baslik: "International Expansion",
    metin: "You're facing a big investment opportunity to sell your products in overseas markets.",
    secenekler: [
      {
        metin: "Make the investment, go international.",
        basariliSonuc: { mesaj: "The expansion brought great success; your name now crosses the country's borders.", detay: "Great vision requires great risk." },
        basarisizSonuc: { mesaj: "The overseas market didn't turn out as you hoped, you took a big loss.", detay: "Not every expansion ends the way you dreamed." },
      },
    ],
  },
  sd_zanaatkar_girisimci_9: {
    baslik: "An Industrial Empire",
    metin: "The journey that started from a small workshop has now become a great industrial empire.",
    secenekler: [
      {
        metin: "Celebrate your success, look to the future.",
        basariliSonuc: { mesaj: "Your name will be remembered as one of the greatest success stories of the industrial age.", detay: "A great empire can be born from a small hammer." },
        basarisizSonuc: { mesaj: "The celebration didn't go as you expected but your success is real.", detay: "Not every triumph is celebrated loudly." },
      },
    ],
  },
  sd_zanaatkar_girisimci_10: {
    baslik: "Going Public",
    metin: "You're facing the opportunity to turn your business into a publicly traded company; you might lose some of your control.",
    secenekler: [
      {
        metin: "Go public.",
        basariliSonuc: { mesaj: "The public offering brought great capital; your company is now one of the biggest in the city.", detay: "Sometimes growing requires sharing control." },
        basarisizSonuc: { mesaj: "The public offering didn't get the interest expected, your reputation took a small hit.", detay: "Not every bold move finds a response in the market." },
      },
    ],
  },
  sd_zanaatkar_girisimci_11: {
    baslik: "The Decision to Retire",
    metin: "You feel the time has come to let go of the empire you built.",
    secenekler: [
      {
        metin: "Hand the company over to a trusted manager.",
        basariliSonuc: { mesaj: "The handover went smoothly; the empire you built will live on after you.", detay: "A good entrepreneur also knows when to let go." },
        basarisizSonuc: { mesaj: "Uncertainties arose during the handover, your peace was disturbed for a while.", detay: "Not every legacy is easily passed on." },
      },
    ],
  },
};
