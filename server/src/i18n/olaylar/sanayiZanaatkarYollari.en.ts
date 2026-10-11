import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiZanaatkarYollari.ts — İngilizce çevirileri (45 olay). */
export const OLAYLAR_SANAYI_ZANAATKAR_YOLLARI_EN: Record<string, OlayCeviri> = {
  sd_zanaatkar_yol_ilk_makine: {
    baslik: "The First Machine",
    metin:
      "A steam machine arrived in your workshop; it does your handwork too. Your stance will shape your career.",
    secenekler: [
      {
        metin: "Run the machine at full capacity.",
        basariliSonuc: {
          mesaj: "Output multiplied; your workshop is among the city's most efficient.",
          detay: "Iron gears never tire.",
        },
        basarisizSonuc: {
          mesaj: "You misused the machine; a malfunction injured you.",
          detay: "No speed without learning.",
        },
      },
      {
        metin: "Set the machine aside; insist on handcraft.",
        basariliSonuc: {
          mesaj: "Your handwork impressed customers; you became a 'true master'.",
          detay: "Some things can't be imitated.",
        },
        basarisizSonuc: {
          mesaj: "Handwork couldn't keep up; you lost customers.",
          detay: "Resisting has its price.",
        },
      },
      {
        metin: "Organize the workers against the machine's conditions.",
        basariliSonuc: {
          mesaj: "Workers rallied behind you; the boss made small concessions.",
          detay: "Voices together are stronger.",
        },
        basarisizSonuc: {
          mesaj: "The effort was crushed, friends fired; your conscience aches.",
          detay: "Not every resistance wins, but it leaves a mark.",
        },
      },
      {
        metin: "Invest in the machine; grow your workshop.",
        basariliSonuc: {
          mesaj: "The investment paid off fast; your workshop grew far larger.",
          detay: "Capital grows in patient hands.",
        },
        basarisizSonuc: {
          mesaj: "The investment backfired; your debt grew.",
          detay: "Every venture takes a risk.",
        },
      },
    ],
  },

  // --- yol:zanaatkar:makineci ---
  sd_zanaatkar_makineci_1: {
    baslik: "A Second Machine",
    metin: "A chance to buy a second machine arose; risk and potential are both great.",
    secenekler: [
      {
        metin: "Buy the machine; grow production.",
        basariliSonuc: {
          mesaj: "The second machine doubled output; your workshop is among the region's biggest.",
          detay: "Growing takes courage.",
        },
        basarisizSonuc: {
          mesaj: "The machine kept breaking; the investment cost you for a while.",
          detay: "Every machine brings its own troubles.",
        },
      },
    ],
  },
  sd_zanaatkar_makineci_2: {
    baslik: "Workplace Accident",
    metin: "A machine malfunctioned; one of your workers was injured.",
    secenekler: [
      {
        metin: "Cover the costs; improve safety.",
        basariliSonuc: {
          mesaj: "Your workers' trust grew; loyalty took root in the workshop.",
          detay: "A master who takes responsibility earns trust.",
        },
        basarisizSonuc: {
          mesaj: "You fell short; the worker left angry and your name was tarnished.",
          detay: "Every accident is a test.",
        },
      },
    ],
  },
  sd_zanaatkar_makineci_3: {
    baslik: "A New Model",
    metin: "A new machine model made your old machines obsolete.",
    secenekler: [
      {
        metin: "Upgrade the old machines.",
        basariliSonuc: { mesaj: "The upgrade worked; your competitiveness grew.", detay: "Keeping pace with technology is survival." },
        basarisizSonuc: { mesaj: "The upgrade went wrong; production stopped for weeks.", detay: "Not every renewal goes smoothly." },
      },
    ],
  },
  sd_zanaatkar_makineci_4: {
    baslik: "Cutting the Workforce",
    metin: "Machines made some workers unnecessary; you could lay them off.",
    secenekler: [
      {
        metin: "Lay them off; cut costs.",
        basariliSonuc: { mesaj: "Costs dropped but the laid-off workers cursed you.", detay: "Efficiency sometimes forgets people." },
        basarisizSonuc: { mesaj: "The layoffs drew backlash; workers went on strike.", detay: "People aren't easily dispensed with." },
      },
      {
        metin: "Shift the workers to other roles.",
        basariliSonuc: { mesaj: "The workers adapted; their loyalty grew.", detay: "Investing in people pays off long-term." },
        basarisizSonuc: { mesaj: "They couldn't adapt; productivity dropped.", detay: "Not every transition is easy." },
      },
    ],
  },
  sd_zanaatkar_makineci_5: {
    baslik: "A Bank Loan",
    metin: "A chance arose to take a bank loan for a bigger fleet of machines.",
    secenekler: [
      {
        metin: "Take the loan; grow.",
        basariliSonuc: { mesaj: "The loan sped your growth; your workshop now counts as a factory.", detay: "Bold borrowing can pay off big." },
        basarisizSonuc: { mesaj: "The investment didn't return what you hoped; your debt grew heavier.", detay: "Every debt carries risk." },
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
          mesaj: "The stolen designs leapt your output forward.",
          detay: "Stolen knowledge helps, but eats at the conscience.",
        },
        basarisizSonuc: {
          mesaj: "You fell into a trap; the spy worked for the rival factory.",
          detay: "Easy opportunities are usually traps.",
        },
      },
      {
        metin: "Refuse the offer; stay honest.",
        basariliSonuc: { mesaj: "You refused; your conscience is at ease.", detay: "Some shortcuts spoil the path." },
        basarisizSonuc: { mesaj: "Refusing set you back a little, but you don't regret it.", detay: "Doing right can have a price." },
      },
    ],
  },
  sd_zanaatkar_makineci_7: {
    baslik: "Risk of a Boiler Explosion",
    metin: "The inspector says the steam boiler's maintenance is overdue and it could explode.",
    secenekler: [
      {
        metin: "Have the maintenance done now.",
        basariliSonuc: { mesaj: "Maintenance went smoothly; a disaster was averted.", detay: "Prevention is cheaper than repair." },
        basarisizSonuc: { mesaj: "A small accident during maintenance injured you.", detay: "Some jobs can't be done without danger." },
      },
    ],
  },
  sd_zanaatkar_makineci_8: {
    baslik: "An International Order",
    metin: "An overseas merchant wants to place a big order from your machine line.",
    secenekler: [
      {
        metin: "Accept the order.",
        basariliSonuc: {
          mesaj: "Delivered on time and in full; your name reached overseas markets.",
          detay: "Great opportunities demand preparation.",
        },
        basarisizSonuc: { mesaj: "You overreached your capacity and missed the deadline.", detay: "An opportunity can exceed your capacity." },
      },
    ],
  },
  sd_zanaatkar_makineci_9: {
    baslik: "Industry Award",
    metin: "The city awards the most efficient workshop; yours is a candidate.",
    secenekler: [
      {
        metin: "Enter the competition.",
        basariliSonuc: { mesaj: "You won the award; your workshop became the city's pride.", detay: "Efficiency sometimes gets recognized." },
        basarisizSonuc: { mesaj: "Another workshop won; you were disappointed.", detay: "Not every contest is won." },
      },
    ],
  },
  sd_zanaatkar_makineci_10: {
    baslik: "The Limit of Automation",
    metin: "Some jobs are too delicate for machines; skilled hands are still needed.",
    secenekler: [
      {
        metin: "Form a special team for delicate work.",
        basariliSonuc: { mesaj: "The team did what the machine couldn't; quality rose.", detay: "Machine and hand are stronger together." },
        basarisizSonuc: { mesaj: "The team missed the expected quality.", detay: "Skilled hands can't be replaced." },
      },
    ],
  },
  sd_zanaatkar_makineci_11: {
    baslik: "A Symbol of the Industrial Age",
    metin: "Your workshop is now among the region's biggest, most modern facilities.",
    secenekler: [
      {
        metin: "Celebrate; make your name known.",
        basariliSonuc: { mesaj: "Your name entered the industrial age's success stories.", detay: "Bold steps become great legacies." },
        basarisizSonuc: { mesaj: "The celebration drew less attention than hoped, but your success is real.", detay: "Not every success is celebrated loudly." },
      },
    ],
  },

  // --- yol:zanaatkar:gelenekci ---
  sd_zanaatkar_gelenekci_1: {
    baslik: "Praise for Handcraft",
    metin: "A journalist found you to write about the craftsmen resisting the machines.",
    secenekler: [
      {
        metin: "Give the interview; tell your story.",
        basariliSonuc: {
          mesaj: "Once published, your name was known beyond the city.",
          detay: "Resistance can become a story.",
        },
        basarisizSonuc: { mesaj: "The piece painted you as backward; you lost customers.", detay: "Not every light falls from the same angle." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_2: {
    baslik: "Factory Competition",
    metin: "A big factory nearby sells the same goods far below your prices.",
    secenekler: [
      {
        metin: "Highlight quality; target niche customers.",
        basariliSonuc: { mesaj: "Wealthy, refined customers kept choosing you.", detay: "You need the right customer, not everyone." },
        basarisizSonuc: { mesaj: "Most customers switched to the factory over price.", detay: "Competition can be merciless." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_3: {
    baslik: "A Wealthy Collector",
    metin: "A wealthy collector wants to commission a fully handmade, one-of-a-kind piece.",
    secenekler: [
      {
        metin: "Accept; make your very best.",
        basariliSonuc: { mesaj: "The collector was in awe and spoke of you everywhere.", detay: "Handcraft is valued by the right eye." },
        basarisizSonuc: { mesaj: "The piece didn't satisfy the collector; it was returned.", detay: "High expectations aren't always met." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_4: {
    baslik: "A Young Apprentice",
    metin: "A young apprentice came to learn handcraft — rare in the age of factories.",
    secenekler: [
      {
        metin: "Take him in; pass on the tradition.",
        basariliSonuc: { mesaj: "The apprentice honed his skill; the craft's future is secured.", detay: "A tradition can't live without a student." },
        basarisizSonuc: { mesaj: "The apprentice grew impatient and sought factory work.", detay: "Not everyone learns patience." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_5: {
    baslik: "The Press Interest Continues",
    metin: "Papers revived your name under the headline 'the last masters resisting the machines'.",
    secenekler: [
      {
        metin: "Use the attention; promote your workshop.",
        basariliSonuc: { mesaj: "The attention brought customers; your workshop is toured like a museum.", detay: "Nostalgia sometimes pays." },
        basarisizSonuc: { mesaj: "The attention was fleeting; no lasting benefit.", detay: "Not every headline lasts." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_6: {
    baslik: "The Pressure of the Electric Age",
    metin: "Electricity is coming to the city; handcraft's future grows even murkier.",
    secenekler: [
      {
        metin: "Stay your course despite the change.",
        basariliSonuc: { mesaj: "Your persistence set you apart as one of the few who resisted.", detay: "Some values resist time." },
        basarisizSonuc: { mesaj: "Customers switched to electric production; your work dwindled.", detay: "Time moves on mercilessly." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_7: {
    baslik: "A Small Compromise",
    metin: "Instead of working wholly by hand, you consider a small tool for some simple steps.",
    secenekler: [
      {
        metin: "Make a small compromise.",
        basariliSonuc: { mesaj: "The small change boosted efficiency; you lost nothing of your identity.", detay: "Flexibility isn't abandoning principles." },
        basarisizSonuc: { mesaj: "The compromise felt foreign; you gave it up.", detay: "Not everyone accepts every compromise." },
      },
      {
        metin: "Stay fully traditional; accept no tool.",
        basariliSonuc: { mesaj: "Your resolve made you more valued in customers' eyes.", detay: "Some masters never compromise." },
        basarisizSonuc: { mesaj: "Your resolve cost you a few jobs.", detay: "Principle sometimes has a price." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_8: {
    baslik: "A Museum Invitation",
    metin: "The city museum wants to exhibit your workshop as 'living artistic heritage'.",
    secenekler: [
      {
        metin: "Accept the invitation.",
        basariliSonuc: {
          mesaj: "Visitors flood your workshop; your name became a lasting legacy.",
          detay: "Keeping the past alive marks the future.",
        },
        basarisizSonuc: { mesaj: "The exhibit drew less attention than expected.", detay: "Not every legacy is recognized at once." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_9: {
    baslik: "One Last Resistance",
    metin: "Almost all your rivals went to the factory; you still produce by hand.",
    secenekler: [
      {
        metin: "Resist to the end.",
        basariliSonuc: { mesaj: "Your resistance became legend; they call you 'the last true master'.", detay: "Some resistance endures for meaning." },
        basarisizSonuc: { mesaj: "Resisting strained you financially; a few months were very hard.", detay: "Staying principled has its price." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_10: {
    baslik: "A Book Offer",
    metin: "A writer wants to write a book about your life and craft.",
    secenekler: [
      {
        metin: "Tell your story.",
        basariliSonuc: { mesaj: "Once published, your name was known nationwide.", detay: "A life sometimes fits in a book." },
        basarisizSonuc: { mesaj: "The book drew less attention than expected.", detay: "Not every story reaches wide audiences." },
      },
    ],
  },
  sd_zanaatkar_gelenekci_11: {
    baslik: "The Last Master's Legacy",
    metin: "You gave years to handcraft; time to think who will carry the tradition on.",
    secenekler: [
      {
        metin: "Hand the workshop to your most loyal apprentice.",
        basariliSonuc: {
          mesaj: "Your workshop lives on in trusted hands; your name is remembered in peace.",
          detay: "Keeping a tradition alive means entrusting it.",
        },
        basarisizSonuc: { mesaj: "You found no fit successor; the future stays uncertain.", detay: "Not every legacy is easily passed on." },
      },
    ],
  },

  // --- yol:zanaatkar:sendikaci ---
  sd_zanaatkar_sendikaci_1: {
    baslik: "Strike Call",
    metin: "Workers propose a strike for better conditions; they expect you to lead.",
    secenekler: [
      {
        metin: "Organize the strike; lead it.",
        basariliSonuc: {
          mesaj: "The strike succeeded; your name became legend among workers.",
          detay: "A bold stand sometimes wins.",
        },
        basarisizSonuc: {
          mesaj: "The strike was crushed; you were briefly unemployed.",
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
        metin: "Refuse; continue your cause.",
        basariliSonuc: {
          mesaj: "Refusing earned you the workers' respect.",
          detay: "Some prices aren't worth paying.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered the boss; a small penalty followed.",
          detay: "Staying principled can cost.",
        },
      },
    ],
  },
  sd_zanaatkar_sendikaci_3: {
    baslik: "Blacklist",
    metin: "Some bosses blacklisted you as a 'troublemaker'; finding work is getting harder.",
    secenekler: [
      {
        metin: "Don't yield; continue your cause.",
        basariliSonuc: { mesaj: "Your cause gained strength; you became a respected name among workers.", detay: "Pressure sometimes strengthens a cause." },
        basarisizSonuc: { mesaj: "You struggled to find work; months of hardship followed.", detay: "Resistance can cost dearly." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_4: {
    baslik: "Attempt to Found a Union",
    metin: "Time to form a formal union with the workers; a big step.",
    secenekler: [
      {
        metin: "Found the union.",
        basariliSonuc: { mesaj: "The union was formally founded; the workers' voice is stronger.", detay: "Organizing amplifies the voice." },
        basarisizSonuc: { mesaj: "The attempt was spotted early and blocked.", detay: "Not every attempt works the first time." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_5: {
    baslik: "Police Intervention",
    metin: "Police cracked down on workers at a demonstration; you were there.",
    secenekler: [
      {
        metin: "Help the injured workers.",
        basariliSonuc: { mesaj: "Your help was appreciated, but you took minor injuries.", detay: "Standing by others in hard moments is solidarity." },
        basarisizSonuc: { mesaj: "You were hurt in the chaos too.", detay: "Crowds can spiral out of control." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_6: {
    baslik: "A Journalist's Interest",
    metin: "A journalist wants to interview you about your fight for workers' rights.",
    secenekler: [
      {
        metin: "Give the interview.",
        basariliSonuc: { mesaj: "The piece caused a stir; your cause is known beyond the city.", detay: "A story can grow a movement." },
        basarisizSonuc: { mesaj: "The piece made you look harsh and dangerous; some workers kept their distance.", detay: "Not every light falls from the same angle." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_7: {
    baslik: "A Traitor Within",
    metin: "Someone in the union is suspected of leaking information to the bosses.",
    secenekler: [
      {
        metin: "Investigate quietly; gather evidence.",
        basariliSonuc: { mesaj: "You found and shut out the traitor; trust was renewed.", detay: "Catching betrayal early protects the cause." },
        basarisizSonuc: { mesaj: "You found no evidence; suspicion spread to everyone.", detay: "Mistrust rots an organization from within." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_8: {
    baslik: "Collective Agreement",
    metin: "After a long struggle, the bosses agreed to collective bargaining.",
    secenekler: [
      {
        metin: "Sit at the table; get the best deal.",
        basariliSonuc: { mesaj: "The agreement favored the workers; you won a historic victory.", detay: "Patient struggle bears fruit at the table." },
        basarisizSonuc: { mesaj: "The deal was weak; some workers were disappointed.", detay: "Not every table brings victory." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_9: {
    baslik: "A Political Offer",
    metin: "A local political movement wants to nominate you for the workers' cause.",
    secenekler: [
      {
        metin: "Accept the offer.",
        basariliSonuc: { mesaj: "Your candidacy gave the workers' movement new strength.", detay: "Some struggles reach parliament." },
        basarisizSonuc: { mesaj: "The exhausting campaign ended in defeat.", detay: "Not every political venture is won." },
      },
      {
        metin: "Refuse; stay in your workshop.",
        basariliSonuc: { mesaj: "You chose simplicity; your peace stayed intact.", detay: "Not every struggle goes to parliament." },
        basarisizSonuc: { mesaj: "Some comrades were disappointed by your refusal.", detay: "No decision pleases everyone." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_10: {
    baslik: "The Next Generation",
    metin: "Young workers want to learn unionizing from you.",
    secenekler: [
      {
        metin: "Pass on your experience.",
        basariliSonuc: { mesaj: "A new generation is ready to carry on your struggle.", detay: "A cause lives on through its students." },
        basarisizSonuc: { mesaj: "The young proved impatient; your experience wasn't fully passed on.", detay: "Not every lesson sinks in at once." },
      },
    ],
  },
  sd_zanaatkar_sendikaci_11: {
    baslik: "The Legacy of the Struggle",
    metin: "Your years of struggle are seen as a turning point in the city's workers' rights history.",
    secenekler: [
      {
        metin: "Accept your legacy with pride.",
        basariliSonuc: {
          mesaj: "Your name went down in history among the pioneers of workers' rights.",
          detay: "Some struggles outlast a lifetime.",
        },
        basarisizSonuc: { mesaj: "Your legacy wasn't recognized at once, but its effect endures.", detay: "History is sometimes written late." },
      },
    ],
  },

  // --- yol:zanaatkar:girisimci ---
  sd_zanaatkar_girisimci_1: {
    baslik: "A Partnership Offer",
    metin: "A wealthy merchant offers a partnership: capital in exchange for a share of control.",
    secenekler: [
      {
        metin: "Accept the partnership; speed up growth.",
        basariliSonuc: {
          mesaj: "The partnership turned your workshop into a large enterprise.",
          detay: "Growth sometimes means sharing control.",
        },
        basarisizSonuc: {
          mesaj: "You clashed with your partner; things got tangled.",
          detay: "Every partnership needs harmony.",
        },
      },
    ],
  },
  sd_zanaatkar_girisimci_2: {
    baslik: "A New Branch",
    metin: "You can open a branch in the neighboring town; big risk, big market.",
    secenekler: [
      {
        metin: "Open the branch.",
        basariliSonuc: {
          mesaj: "The branch turned a profit; your name spread to the next town.",
          detay: "Bold steps can bring big returns.",
        },
        basarisizSonuc: {
          mesaj: "The branch lost money; you had to close it.",
          detay: "Not every expansion succeeds.",
        },
      },
    ],
  },
  sd_zanaatkar_girisimci_3: {
    baslik: "An Offer to Buy Out a Rival",
    metin: "A chance arose to buy a small but promising rival workshop.",
    secenekler: [
      {
        metin: "Buy the workshop.",
        basariliSonuc: { mesaj: "The acquisition succeeded; your market share grew.", detay: "Sometimes the fastest growth is buying the rival." },
        basarisizSonuc: { mesaj: "The workshop wasn't worth it; your investment lost money.", detay: "Not every acquisition pays." },
      },
    ],
  },
  sd_zanaatkar_girisimci_4: {
    baslik: "A Stock Market Rumor",
    metin: "You can make a small investment in the city's new industrial exchange.",
    secenekler: [
      {
        metin: "Invest.",
        basariliSonuc: { mesaj: "The investment brought an unexpected profit.", detay: "Luck sometimes outspeaks capital." },
        basarisizSonuc: { mesaj: "The market crashed; your investment evaporated.", detay: "Speculation is always risky." },
      },
      {
        metin: "Skip the risk; put the money in your workshop.",
        basariliSonuc: { mesaj: "The safe investment brought small, steady growth.", detay: "Solid foundations pay off long-term." },
        basarisizSonuc: { mesaj: "The investment yielded less than hoped.", detay: "Even the safe path has no guarantee." },
      },
    ],
  },
  sd_zanaatkar_girisimci_5: {
    baslik: "Board of Directors",
    metin: "As the business grows, you must decide with a board, not alone.",
    secenekler: [
      {
        metin: "Form the board; professionalize.",
        basariliSonuc: { mesaj: "The board brought order and prestige to your business.", detay: "Growth sometimes means sharing control." },
        basarisizSonuc: { mesaj: "Disputes with board members slowed things down.", detay: "Every partnership needs harmony." },
      },
    ],
  },
  sd_zanaatkar_girisimci_6: {
    baslik: "Economic Crisis",
    metin: "A sudden economic crisis shook all industry; your business is at risk.",
    secenekler: [
      {
        metin: "Cut costs; weather the crisis.",
        basariliSonuc: { mesaj: "Tight measures got you through with little damage.", detay: "Crisis time is discipline time." },
        basarisizSonuc: { mesaj: "The crisis hit your business hard; big loss.", detay: "No two crises scar equally." },
      },
    ],
  },
  sd_zanaatkar_girisimci_7: {
    baslik: "Charity Work",
    metin: "You were asked to join a campaign for the city's poor working families.",
    secenekler: [
      {
        metin: "Donate generously.",
        basariliSonuc: { mesaj: "Your donation was praised; you were called a charitable businessman.", detay: "Wealth gains meaning when shared." },
        basarisizSonuc: { mesaj: "Your donation drew less notice than hoped.", detay: "Not every good deed is noticed at once." },
      },
      {
        metin: "Don't join; focus on business.",
        basariliSonuc: { mesaj: "You focused on business and skipped the campaign.", detay: "Everyone sets their own priorities." },
        basarisizSonuc: { mesaj: "Staying out drew criticism.", detay: "Some silences are heard loudly." },
      },
    ],
  },
  sd_zanaatkar_girisimci_8: {
    baslik: "International Expansion",
    metin: "A big investment chance lets you sell your goods in overseas markets.",
    secenekler: [
      {
        metin: "Invest; go international.",
        basariliSonuc: { mesaj: "The expansion succeeded greatly; your name crossed borders.", detay: "Great vision demands great risk." },
        basarisizSonuc: { mesaj: "The overseas market disappointed; you took a big loss.", detay: "Not every expansion ends as dreamed." },
      },
    ],
  },
  sd_zanaatkar_girisimci_9: {
    baslik: "An Industrial Empire",
    metin: "A journey begun in a small workshop has grown into an industrial empire.",
    secenekler: [
      {
        metin: "Celebrate; look to the future.",
        basariliSonuc: { mesaj: "Your name will be a great success story of the industrial age.", detay: "A great empire can grow from a small hammer." },
        basarisizSonuc: { mesaj: "The celebration fell flat, but your success is real.", detay: "Not every triumph is loudly celebrated." },
      },
    ],
  },
  sd_zanaatkar_girisimci_10: {
    baslik: "Going Public",
    metin: "You can take your business public; you might lose some control.",
    secenekler: [
      {
        metin: "Go public.",
        basariliSonuc: { mesaj: "The offering raised big capital; your company is among the city's largest.", detay: "Growth sometimes means sharing control." },
        basarisizSonuc: { mesaj: "The offering drew little interest; your reputation took a small hit.", detay: "Not every bold move finds a market." },
      },
    ],
  },
  sd_zanaatkar_girisimci_11: {
    baslik: "The Decision to Retire",
    metin: "You feel it's time to let go of the empire you built.",
    secenekler: [
      {
        metin: "Hand the company to a trusted manager.",
        basariliSonuc: { mesaj: "The handover went smoothly; your empire outlives you.", detay: "A good entrepreneur knows when to let go." },
        basarisizSonuc: { mesaj: "The handover brought uncertainty; your peace was disturbed.", detay: "Not every legacy passes easily." },
      },
    ],
  },
};
