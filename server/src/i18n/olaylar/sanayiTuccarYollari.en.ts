import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiTuccarYollari.ts — İngilizce çevirileri (45 olay). */
export const OLAYLAR_SANAYI_TUCCAR_YOLLARI_EN: Record<string, OlayCeviri> = {
  sd_tuccar_yol_ilk_karar: {
    baslik: "The First Big Decision",
    metin:
      "The small business you inherited from your father (or your master) is about to grow; to draw your first big loan from the bank you need to present a business plan. This plan will also determine what kind of industrialist you become.",
    secenekler: [
      {
        metin: "Present a plan with a reasonable profit margin and fair wages.",
        ipucu: "Slow growth, a solid reputation",
        basariliSonuc: {
          mesaj: "The bank found your plan trustworthy; the loan was approved, your first workers look at you with confidence.",
          detay: "Some foundations are laid slowly but never crack.",
        },
        basarisizSonuc: {
          mesaj: "The bank found your plan 'lacking ambition', the loan shrank, but it was still a start.",
          detay: "Honesty sometimes opens doors slowly.",
        },
      },
      {
        metin: "Present the most aggressive profit plan, one that drives wages to the bottom.",
        ipucu: "Fast growth, a heavy cost in workers and reputation",
        basariliSonuc: {
          mesaj: "The bank liked the numbers, the loan came generously; but your workers' looks toward you turned cold.",
          detay: "Some growth stories have a cost written in fine print.",
        },
        basarisizSonuc: {
          mesaj: "The plan was approved but word leaked; you started being known in the city as the 'ruthless boss'.",
          detay: "Cruelty sometimes leaves a name behind before it turns its back.",
        },
      },
      {
        metin: "Take the loan but try to grow the money on the stock market.",
        ipucu: "A gambler's start, big profit or ruin",
        basariliSonuc: {
          mesaj: "The risky move paid off; the loan doubled overnight, the business grew almost for free.",
          detay: "Some industrialists grow not with a factory, but with nerve.",
        },
        basarisizSonuc: {
          mesaj: "The investment sank; to pay back the loan you had to sell half the business.",
          detay: "At the gambling table, the loser always learns last.",
        },
      },
      {
        metin: "Set aside part of the profit for worker training and city charity work.",
        ipucu: "A small start, a great and lasting reputation",
        basariliSonuc: {
          mesaj: "The city papers praised your plan; you became known as 'the boss who invests in the future'.",
          detay: "Some industrialists grow not through machinery, but through people.",
        },
        basarisizSonuc: {
          mesaj: "Your charitable work stayed in the shadows for now, but your intent is already being talked about in the city.",
          detay: "Good deeds are sometimes planted quietly, then one day bear fruit.",
        },
      },
    ],
  },

  // ======================= FAIR (11) =======================
  sd_tuccar_yol_adil_sendika_masasi: {
    baslik: "The Union Table",
    metin:
      "The newly formed workers' union wants to sit down with you and discuss wages. Other factories throw them out the door; you could sit at the table and negotiate.",
    secenekler: [
      {
        metin: "Sit at the table, negotiate honestly.",
        ipucu: "A small profit loss, lasting trust",
        basariliSonuc: {
          mesaj: "The workers' representatives left the negotiation satisfied; the first strike threat at your factory died down this way.",
          detay: "A small raise, in {birim}, became the price of a loyalty that would last for years.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't reach an agreement but the talks ended respectfully; the workers said 'at least he listened'.",
          detay: "Not every table ends with a deal, some are just a beginning.",
        },
      },
      {
        metin: "Refuse the meeting, shut the door.",
        ipucu: "Cheap today, costly tomorrow",
        basariliSonuc: {
          mesaj: "Your profit rose for today, but in the factory corridors your name is no longer 'the fair boss'.",
          detay: "Rumor spreads fast; the door you closed today will meet you tomorrow as a different problem.",
        },
        basarisizSonuc: {
          mesaj: "The workers responded with a brief work slowdown; production came to a near standstill.",
          detay: "The door you closed left behind an anger.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_sagligi_klinik: {
    baslik: "Factory Clinic",
    metin:
      "A doctor tells you most of the workers have no access to treatment and suggests opening a small clinic at the factory. It has a cost, but could reduce workforce loss from illness.",
    secenekler: [
      {
        metin: "Build the clinic, hire the doctor.",
        ipucu: "An expense today, years of productivity",
        basariliSonuc: {
          mesaj: "The clinic opened; workers now get treated when they fall ill instead of being fired.",
          detay: "The factory's absence rate quietly started dropping.",
        },
        basarisizSonuc: {
          mesaj: "The clinic opened but the doctor turned out to be inadequate; the intention was good, the result mediocre.",
          detay: "Some good decisions don't bear fruit in their first year.",
        },
      },
      {
        metin: "Postpone it for now and put the money into production.",
        ipucu: "Safe in the short term, a small notch in your principles",
        basariliSonuc: {
          mesaj: "Production sped up but a small stone remained in your conscience.",
          detay: "The things you say 'I'll do later' sometimes never happen.",
        },
        basarisizSonuc: {
          mesaj: "Because of the postponed clinic, an outbreak brought the factory to a week-long standstill.",
          detay: "The money you saved was small next to the production you lost.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_kirli_teklif: {
    baslik: "A Dirty Offer",
    metin:
      "A merchant offers to sell you cheap, suspiciously sourced raw material of colonial origin, well below market price. Your profit margin would double, but you need to ask questions.",
    secenekler: [
      {
        metin: "Refuse the offer, stay loyal to your clean sources.",
        ipucu: "A big profit missed, a solid conscience",
        basariliSonuc: {
          mesaj: "You turned the offer down; a few months later it came out that raw material was produced under conditions of slavery.",
          detay: "The moments you say 'good thing' are usually noticed too late — you noticed early.",
        },
        basarisizSonuc: {
          mesaj: "You refused, but your rivals grabbed the offer and undercut you on price.",
          detay: "What's right isn't always what's most profitable.",
        },
      },
      {
        metin: "Just this once, take it without asking questions.",
        ipucu: "Fast profit, contrary to the spirit of your path",
        basariliSonuc: {
          mesaj: "The profit went into your pocket, but at night you can't help thinking about where that material came from.",
          detay: "One exception shows how solid a principle really is.",
        },
        basarisizSonuc: {
          mesaj: "The source leaked to the papers; your 'fair boss' image was questioned overnight.",
          detay: "One deviation cast a shadow over years of built reputation.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_kalite_yarisi: {
    baslik: "Competing on Quality",
    metin:
      "Rival factories are driving prices to the bottom; you decided to compete on quality instead of cutting materials. This is a more expensive path.",
    secenekler: [
      {
        metin: "Invest in quality production, emphasize 'honest craftsmanship' in marketing.",
        ipucu: "Expensive but a sustainable positioning",
        basariliSonuc: {
          mesaj: "Customers were tired of cheap, short-lived goods; your products made a difference.",
          detay: "'{aile}' being known for quality is worth more than an ad campaign on its own.",
        },
        basarisizSonuc: {
          mesaj: "The quality was recognized but the market wasn't ready yet; sales stayed below expectations.",
          detay: "The right idea sometimes comes at the wrong time.",
        },
      },
      {
        metin: "Join the price war a bit, keep the balance.",
        ipucu: "A safe middle path, a compromise to your identity",
        basariliSonuc: {
          mesaj: "You cut prices a little, sales rose, but some old customers said 'you've changed'.",
          detay: "A middle path never fully satisfies anyone.",
        },
        basarisizSonuc: {
          mesaj: "You neither won the price war nor kept your quality; you lost customers from both sides.",
          detay: "Whoever chases two rabbits may catch neither.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_grev_tehdidi: {
    baslik: "The Wind of Strike",
    metin:
      "A big strike broke out at other factories in the city. Your workers are calling for a day of work stoppage in support of the strike; you're known in this city as a fair boss.",
    secenekler: [
      {
        metin: "Openly say you support your workers, count the day as leave.",
        ipucu: "Loss today, loyalty in the long run",
        basariliSonuc: {
          mesaj: "Your workers were grateful; in the city you became known as 'the boss who shielded his own factory from the strike'.",
          detay: "Trust is a more lasting capital than a day's production.",
        },
        basarisizSonuc: {
          mesaj: "Your support drew the wrath of other bosses; a few supply deals cooled off.",
          detay: "Standing on the right side sometimes means standing alone.",
        },
      },
      {
        metin: "Stay neutral, keep the factory running normally.",
        ipucu: "Production safe, hesitation in your workers' eyes",
        basariliSonuc: {
          mesaj: "The factory ran normally but part of your workers were quietly disappointed.",
          detay: "Neutrality sometimes has as much consequence as choosing a side.",
        },
        basarisizSonuc: {
          mesaj: "Some workers joined anyway without permission; production was disrupted and they called you 'the indecisive boss'.",
          detay: "Trying to stand in the middle sometimes loses you both sides.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_ornek_fabrika: {
    baslik: "Model Factory",
    metin:
      "A government commission wants to examine your factory as a 'model workplace' in the industrial district. You could lead the way in turning your standards into a legal framework.",
    secenekler: [
      {
        metin: "Give the commission full support, open all your records.",
        ipucu: "Transparency has a cost, but your reputation grows",
        basariliSonuc: {
          mesaj: "Your report became a benchmark for other factories; your name is spoken of with respect in industrial circles.",
          detay: "Some standards are born from a single example.",
        },
        basarisizSonuc: {
          mesaj: "Small shortcomings were found in the review; it wasn't shameful, but it hurt your pride.",
          detay: "Claiming perfection requires flawlessness — you're merely good.",
        },
      },
      {
        metin: "Politely decline, keep the business private.",
        ipucu: "Privacy preserved, opportunity missed",
        basariliSonuc: {
          mesaj: "The examination didn't happen, things continued as usual.",
          detay: "Some opportunities never come again, but some peace is just as precious.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal led to rumors of 'what is he hiding' — even though there was nothing to hide.",
          detay: "Being transparent is sometimes safer than not being transparent.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_rakip_iflasi: {
    baslik: "The Rival's Collapse",
    metin:
      "{rakip} is close to bankruptcy from union pressure and a boycott over exploiting his workers. You could snap up his company cheaply, but you'd also leave his workers out on the street.",
    secenekler: [
      {
        metin: "Take over the company, rehire the workers on your own terms.",
        ipucu: "Expensive but the city will talk about you",
        basariliSonuc: {
          mesaj: "You saved dozens of workers; the city papers declared you 'the rescuer boss'.",
          detay: "Sometimes the biggest business move happens at the same moment as an act of humanity.",
        },
        basarisizSonuc: {
          mesaj: "The takeover wasn't as easy as you hoped; old debts and broken machines burned your pocket.",
          detay: "Good intentions sometimes come with a bad balance sheet.",
        },
      },
      {
        metin: "Don't get involved, just take the market share that opens up.",
        ipucu: "Trouble-free profit, a sting of conscience",
        basariliSonuc: {
          mesaj: "Your rival's customers came to you; your business grew but the fate of his old workers bothers you.",
          detay: "You don't have to take every opportunity, but this one was tempting.",
        },
        basarisizSonuc: {
          mesaj: "The market share came in less than you expected; other merchants saw the same opportunity.",
          detay: "Opportunities sometimes get crowded.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_cirak_okulu: {
    baslik: "Apprentice School",
    metin:
      "You want to build an apprentice school teaching literacy and craft in the evenings for the young people working at your factory. It will take time and money.",
    secenekler: [
      {
        metin: "Build the school, hire a teacher.",
        ipucu: "The investment returns, just not right away",
        basariliSonuc: {
          mesaj: "The first graduates became foremen; your factory no longer needs to look for outside masters.",
          detay: "The knowledge you invested returns with interest.",
        },
        basarisizSonuc: {
          mesaj: "The school opened but interest was low; most of the young people were too tired to come to classes.",
          detay: "A good idea moves slowly without the right conditions.",
        },
      },
      {
        metin: "Give it up for now, redirect the resources to production.",
        ipucu: "Safe but an opportunity missed",
        basariliSonuc: {
          mesaj: "Production rose, but the factory's future need for foremen still went unmet.",
          detay: "Saving today sometimes postpones tomorrow.",
        },
        basarisizSonuc: {
          mesaj: "A machine was mishandled due to unskilled labor, causing minor damage.",
          detay: "Untrained hands present cheapness's hidden bill later.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_konut_projesi: {
    baslik: "Workers' Neighborhood",
    metin:
      "Most of your workers live in damp, crowded slums. You're considering building decent, cheap rental homes next to the factory — the 'model village' idea sounds ambitious.",
    secenekler: [
      {
        metin: "Launch the project, rent at reasonable rates.",
        ipucu: "A big investment, lasting loyalty in the long run",
        basariliSonuc: {
          mesaj: "The first families moved into the new homes; the factory's absence rate dropped visibly.",
          detay: "People who sleep well work well — no one seemed to remember such a simple truth.",
        },
        basarisizSonuc: {
          mesaj: "The construction went over budget; the project was completed but at a much higher cost than expected.",
          detay: "Even well-intentioned projects collide with engineering realities.",
        },
      },
      {
        metin: "Postpone it for now, give a small rent subsidy.",
        ipucu: "Cheap but a symbolic gesture",
        basariliSonuc: {
          mesaj: "The rent subsidy was small but the workers were grateful; people say you 'care'.",
          detay: "Even a small gesture is better than no gesture at all.",
        },
        basarisizSonuc: {
          mesaj: "The help made no difference, most workers still live in hard conditions.",
          detay: "Symbolic steps sometimes remain just symbolic.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_gazeteci_ziyareti: {
    baslik: "The Journalist's Visit",
    metin:
      "A journalist researching industrial conditions wants to visit your factory looking for a 'good example'. The interview could boost your reputation, but every question could be uncomfortable.",
    secenekler: [
      {
        metin: "Accept the interview, give sincere answers.",
        ipucu: "Risky but an honest visibility",
        basariliSonuc: {
          mesaj: "The piece was published under the headline 'A light in the dark industrial age'; your name was heard outside the city too.",
          detay: "Honesty is the best strategy even in front of a camera.",
        },
        basarisizSonuc: {
          mesaj: "The journalist blew a shortcoming out of proportion; you expected praise, you got criticism.",
          detay: "Transparency is sometimes exactly what leaves you most open to criticism.",
        },
      },
      {
        metin: "Politely refuse, protect your privacy.",
        ipucu: "Safe but you stay quiet",
        basariliSonuc: {
          mesaj: "The interview didn't happen; your peace of mind stayed intact but your reputation gained nothing.",
          detay: "Not everyone needs to know; some good deeds are done quietly.",
        },
        basarisizSonuc: {
          mesaj: "The journalist read your refusal as 'hiding something'; it planted a small seed of suspicion.",
          detay: "Silence sometimes produces its own story.",
        },
      },
    ],
  },
  sd_tuccar_yol_adil_kariyer_onuru: {
    baslik: "The Conscience of Industry",
    metin:
      "Years have passed; young industrialists in the city now come to you for advice. The chamber of commerce proposes to call you 'the conscience of industry'.",
    secenekler: [
      {
        metin: "Accept the title, guide the young industrialists.",
        ipucu: "An honorable peak, but it brings responsibility too",
        basariliSonuc: {
          mesaj: "Now the city's youngest bosses sit at your table to learn.",
          detay: "The reputation you built over a lifetime finally turned into a title.",
        },
        basarisizSonuc: {
          mesaj: "The title was given but some young industrialists found you 'old-fashioned' and didn't heed your advice.",
          detay: "Every generation wants to learn from its own mistakes.",
        },
      },
      {
        metin: "Stay humble, decline the title.",
        ipucu: "Humility, a missed symbol",
        basariliSonuc: {
          mesaj: "You said 'I don't need a title, my work is enough'; even this attitude earned you respect.",
          detay: "Some people wear a bigger crown by refusing one.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was interpreted by some as 'showing off'; your intent was misread.",
          detay: "Even humility is sometimes read wrong.",
        },
      },
    ],
  },

  // ======================= EXPLOITATIVE (11) =======================
  sd_tuccar_yol_somurucu_cocuk_isci: {
    baslik: "Small Hands",
    metin:
      "Your foreman tells you children can slip between the machines more easily than adults, and their wages are lower too. He suggests hiring a few child workers.",
    secenekler: [
      {
        metin: "Accept, hire a few children.",
        ipucu: "Cheap labor, a heavy toll on your conscience",
        basariliSonuc: {
          mesaj: "Your production cost dropped; small shadows now wander between the machines.",
          detay: "Some decisions keep you awake at night — but come morning you go to the factory again.",
        },
        basarisizSonuc: {
          mesaj: "A child worker was injured by a machine; the incident was covered up but you couldn't forget it.",
          detay: "Cheapness has a cost, and sometimes someone else pays it.",
        },
      },
      {
        metin: "Refuse, hire only adult workers.",
        ipucu: "More expensive but a clear conscience",
        basariliSonuc: {
          mesaj: "Cost rose a little, but at least you feel at ease about this.",
          detay: "Even on the exploitative path, you don't have to make the same choice every time.",
        },
        basarisizSonuc: {
          mesaj: "Rival factories undercut you on price with cheap labor.",
          detay: "On this path even your conscience sometimes puts you at a bargaining disadvantage.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_ucret_kesme: {
    baslik: "Recession-Time Cuts",
    metin:
      "The market is shrinking; you're considering cutting workers' wages to protect your profit. The foreman warns 'they're already starving, don't anger them more'.",
    secenekler: [
      {
        metin: "Cut the wages, protect your profit margin.",
        ipucu: "A rescue in the short term, dangerous in the long term",
        basariliSonuc: {
          mesaj: "Your profit margin was protected; a silent anger is building up at the factory.",
          detay: "The numbers look good, the atmosphere doesn't.",
        },
        basarisizSonuc: {
          mesaj: "News of the cut spread through the city; the nickname 'the boss who starves you' stuck.",
          detay: "Some savings cost more than your reputation.",
        },
      },
      {
        metin: "Give up the cuts, save elsewhere.",
        ipucu: "Less profit but less risk",
        basariliSonuc: {
          mesaj: "You didn't touch the wages; the workers relaxed but your profit margin narrowed.",
          detay: "Even on the exploitative path, sometimes stepping back is sensible.",
        },
        basarisizSonuc: {
          mesaj: "The cuts you made elsewhere lowered production quality, orders came back returned.",
          detay: "Avoiding one hole can drop you into another.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_sendikaci: {
    baslik: "Crushing the Organizer",
    metin:
      "A worker at your factory is secretly trying to form a union. You could fire him to make an example for the others, or turn a blind eye and talk before the problem grows.",
    secenekler: [
      {
        metin: "Fire him, in front of everyone as an example.",
        ipucu: "Buys fear but grows hatred",
        basariliSonuc: {
          mesaj: "The other workers fell silent, but the look in their eyes is different now.",
          detay: "Silence built with fear postpones the explosion, doesn't prevent it.",
        },
        basarisizSonuc: {
          mesaj: "The fired worker went to the papers; the affair caused a big stir in the city.",
          detay: "Some attempts to silence someone produce the exact opposite result.",
        },
      },
      {
        metin: "Ignore it, don't draw attention to it.",
        ipucu: "A risky waiting game",
        basariliSonuc: {
          mesaj: "The organizing attempt died down on its own, for now.",
          detay: "Not every storm has to burst.",
        },
        basarisizSonuc: {
          mesaj: "The organizing grew, you faced a work slowdown that lasted a week.",
          detay: "Ignoring is sometimes just another way of letting the problem grow.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_guvenlik_kesme: {
    baslik: "Cutting Corners on Safety",
    metin:
      "The engineer says the machines' protective cages are costly, and removing them would speed up production. Accident risk would rise, but so would profit.",
    secenekler: [
      {
        metin: "Remove the protective cages, increase the speed.",
        ipucu: "High profit, high risk",
        basariliSonuc: {
          mesaj: "Production sped up, profit rose — no accident has happened yet.",
          detay: "The bill for risk doesn't always come right away.",
        },
        basarisizSonuc: {
          mesaj: "A worker lost his hand; the incident caused an uproar in the city, the compensation burned your pocket.",
          detay: "Every cut safety measure eventually finds payment in someone's body.",
        },
      },
      {
        metin: "Keep the protective cages, sacrifice some production.",
        ipucu: "Slower but safer",
        basariliSonuc: {
          mesaj: "Production stayed slow but so far there hasn't been a serious accident at your factory.",
          detay: "Even on the exploitative path, it's possible to protect some boundaries — you're still one of them.",
        },
        basarisizSonuc: {
          mesaj: "Because of slow production, a big order went to a rival.",
          detay: "Safety sometimes carries an opportunity cost.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_siyasi_rusvet: {
    baslik: "Silencing the Inspector",
    metin:
      "A new labor law will inspect your factory. If you leave a small 'gift' for the local council member, you could delay the inspection, maybe never have it happen at all.",
    secenekler: [
      {
        metin: "Pay the bribe, delay the inspection.",
        ipucu: "Expensive but an effective insurance",
        basariliSonuc: {
          mesaj: "The inspection was delayed a year; the council member is in your pocket now.",
          detay: "Some problems aren't solved with money, only postponed with it.",
        },
        basarisizSonuc: {
          mesaj: "Your bribery offer was refused and reported; your name entered an investigation file.",
          detay: "Some gambles come back doubled when lost.",
        },
      },
      {
        metin: "Allow the inspection, quickly 'fix up' the factory.",
        ipucu: "Risky but a chance to stay clean",
        basariliSonuc: {
          mesaj: "Last-minute cosmetic fixes got you through the inspection — by the skin of your teeth.",
          detay: "Sometimes changing the appearance is easier than changing the truth.",
        },
        basarisizSonuc: {
          mesaj: "The inspection found serious violations; a fine and bad press awaited you.",
          detay: "Cosmetic fixes don't escape a careful eye.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_gazeteci_arastirmasi: {
    baslik: "The Reporter on Your Trail",
    metin:
      "A journalist is investigating the conditions at your factory; he's even spoken with your former workers. You could try to silence him or take the risk of the story going out.",
    secenekler: [
      {
        metin: "Have your lawyers silence the journalist with the threat of a lawsuit.",
        ipucu: "Risky, could backfire",
        basariliSonuc: {
          mesaj: "The journalist backed off; but the matter continues to be whispered about in small circles.",
          detay: "Silencing one voice doesn't erase it entirely.",
        },
        basarisizSonuc: {
          mesaj: "The threat itself became the story; 'the boss trying to censor' hit the headlines.",
          detay: "Trying to suppress a voice sometimes turns it into a megaphone.",
        },
      },
      {
        metin: "Ignore it, let the story come out.",
        ipucu: "A short-term reputational blow, no lawsuit risk",
        basariliSonuc: {
          mesaj: "The story came out, it was talked about for a few weeks, then forgotten.",
          detay: "Some storms pass fastest when you let them go without reacting.",
        },
        basarisizSonuc: {
          mesaj: "The story caused a big stir; some customers stopped doing business with you.",
          detay: "Some storms don't pass even if you ignore them.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_vardiya_uzatma: {
    baslik: "Extending the Shift",
    metin:
      "For a big order you're considering extending your workers' shifts with mandatory overtime — without extra pay.",
    secenekler: [
      {
        metin: "Force the shifts longer, don't give extra pay.",
        ipucu: "High yield, tired and angry workers",
        basariliSonuc: {
          mesaj: "The order was met on time; your workers' eyes are sunken, but you're profiting.",
          detay: "Some victories are built on other people's exhaustion.",
        },
        basarisizSonuc: {
          mesaj: "A tired worker made a mistake, a whole batch of goods was damaged.",
          detay: "People are not machines; forgetting that came at a cost.",
        },
      },
      {
        metin: "Pay a small extra for the overtime.",
        ipucu: "Less profit but less resistance",
        basariliSonuc: {
          mesaj: "The workers are still tired, but at least somewhat satisfied.",
          detay: "Even exploitation has its own degrees.",
        },
        basarisizSonuc: {
          mesaj: "Despite the extra pay some workers slowed down; the order was delayed.",
          detay: "A small gesture is sometimes not seen as enough.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_reform_baskisi: {
    baslik: "The Reformer's Pressure",
    metin:
      "A reformist MP in parliament wants to legally limit working hours. Other industrialists are calling you to join their lobbying campaign.",
    secenekler: [
      {
        metin: "Join the lobby, try to block the law.",
        ipucu: "An expensive fight, but if you win the current order continues",
        basariliSonuc: {
          mesaj: "The lobbying campaign delayed the law for a while; among industrialists your name became 'a solid man'.",
          detay: "Some victories are won in the shadow of a broad front.",
        },
        basarisizSonuc: {
          mesaj: "The lobbying attempt leaked to the public; the reformer held you up as an example of bad intent.",
          detay: "Some fights are lost more the more money you spend on them.",
        },
      },
      {
        metin: "Don't get involved, let the law take its own course.",
        ipucu: "Safe but passive",
        basariliSonuc: {
          mesaj: "The debate over the law continues, but you chose to stay on the sidelines.",
          detay: "You don't have to join every fight.",
        },
        basarisizSonuc: {
          mesaj: "The law passed, working hours shortened; your production plans were thrown into disarray.",
          detay: "Standing aside keeps you from influencing the outcome.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_kaza_ortbas: {
    baslik: "The Boiler Blew",
    metin:
      "A steam boiler whose maintenance kept being postponed exploded; several workers were injured. You could quietly cover it up, or take responsibility and pay compensation.",
    secenekler: [
      {
        metin: "Cover up the incident, silence the officials.",
        ipucu: "A risky gamble, very costly if exposed",
        basariliSonuc: {
          mesaj: "The incident was covered up for now, but carrying this secret weighs heavily on you.",
          detay: "Some secrets slowly consume the one carrying them too.",
        },
        basarisizSonuc: {
          mesaj: "The cover-up attempt was exposed; the city started openly calling you 'the murderer boss'.",
          detay: "Some truths surface no matter how deep they're buried.",
        },
      },
      {
        metin: "Take responsibility, pay compensation to the injured.",
        ipucu: "Expensive but at least an honest reckoning",
        basariliSonuc: {
          mesaj: "You paid the compensation; your reputation took a hit but at least there's some peace in your conscience.",
          detay: "Even on this path, some moments keep you from losing yourself completely.",
        },
        basarisizSonuc: {
          mesaj: "You paid the compensation but the boiler's lack of maintenance leaked to the press; your reputation took a hit anyway.",
          detay: "Honesty isn't always a complete shield.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_isci_ayaklanmasi: {
    baslik: "Workers' Uprising",
    metin:
      "Years of accumulated anger exploded; some of your workers stood at the factory gates, shouting their demands. You could call the gendarmerie to crush it, or sit down at the table.",
    secenekler: [
      {
        metin: "Call the gendarmerie, crush the uprising harshly.",
        ipucu: "Momentary control, long-term grudge",
        basariliSonuc: {
          mesaj: "The uprising was crushed, the factory is running again — but some workers will never forget.",
          detay: "Silence bought with harshness comes back one day in another form.",
        },
        basarisizSonuc: {
          mesaj: "The intervention turned violent, several people were injured; the incident stirred up the whole city.",
          detay: "Some sparks grow the more you try to smother them.",
        },
      },
      {
        metin: "Open the gate, listen to their demands.",
        ipucu: "Late but a real chance at repair",
        basariliSonuc: {
          mesaj: "You accepted some of their demands; the anger didn't fully die down but at least a door opened.",
          detay: "Even a late apology is better than none at all.",
        },
        basarisizSonuc: {
          mesaj: "The negotiation didn't calm the anger; the workers said 'it's too late now'.",
          detay: "Some losses of trust aren't repaired by a single conversation.",
        },
      },
    ],
  },
  sd_tuccar_yol_somurucu_hesaplasma: {
    baslik: "The Reckoning of a Lifetime",
    metin:
      "You're getting old; looking back you see not just the fortune you accumulated, but the anger you accumulated too. You're considering fixing something in your will.",
    secenekler: [
      {
        metin: "Leave part of your fortune to your old workers/their families.",
        ipucu: "A late redress, a real peace",
        basariliSonuc: {
          mesaj: "When word of your will spread, some old workers forgave you — not all, but some.",
          detay: "Even a late redress is better than none at all.",
        },
        basarisizSonuc: {
          mesaj: "The gesture wasn't well received; those saying 'it's too late now' were the majority.",
          detay: "Some wounds aren't closed by any will.",
        },
      },
      {
        metin: "Keep your fortune as is, leave the past behind.",
        ipucu: "Safe but an uneasy legacy",
        basariliSonuc: {
          mesaj: "Your fortune stayed intact; but your nights are still full of those old faces.",
          detay: "Some decisions, however sensible, don't bring peace.",
        },
        basarisizSonuc: {
          mesaj: "Before your death, an old accident came back up; your name was tarnished once more.",
          detay: "The past can be waiting for you right where you thought you'd left it.",
        },
      },
    ],
  },

  // ======================= SPECULATOR (11) =======================
  sd_tuccar_yol_spek_demiryolu_hissesi: {
    baslik: "Railway Frenzy",
    metin:
      "Shares of the newly opened railway companies are on everyone's lips in the city. A broker whispers an 'inside' tip to you: a small line company is about to explode.",
    secenekler: [
      {
        metin: "Invest most of your cash in the shares.",
        ipucu: "A total gamble — win big or lose big",
        basariliSonuc: {
          mesaj: "The line company really did explode; your shares doubled in a week.",
          detay: "Some gambles sit on the right side of history.",
        },
        basarisizSonuc: {
          mesaj: "The line company lost its funding, the shares became worthless.",
          detay: "Not every whisper is worth its weight in gold.",
        },
      },
      {
        metin: "Invest just a small amount, be cautious.",
        ipucu: "Small gain or small loss",
        basariliSonuc: {
          mesaj: "Your small investment brought a small but real profit.",
          detay: "Even a cautious speculator is still a speculator.",
        },
        basarisizSonuc: {
          mesaj: "Your small investment melted away too, but at least it wasn't ruin.",
          detay: "Small losses are the cheap price of big lessons.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_doviz_arbitraji: {
    baslik: "The Exchange Gap",
    metin:
      "You've discovered a small gap in the currency exchange rates between two cities. You could benefit from this gap by quickly buying and selling large amounts of goods — but the market could close fast.",
    secenekler: [
      {
        metin: "Make a big arbitrage move.",
        ipucu: "Speed is everything; if you're late, you lose",
        basariliSonuc: {
          mesaj: "You completed the trade before the gap closed; the net profit went into your pocket.",
          detay: "Some opportunities only open for the fast.",
        },
        basarisizSonuc: {
          mesaj: "The exchange gap closed before you; you left the table with a big loss.",
          detay: "The market taught you to wait — an expensive lesson.",
        },
      },
      {
        metin: "Observe the opportunity, don't act.",
        ipucu: "Safe but no gain",
        basariliSonuc: {
          mesaj: "You missed the opportunity, but at least your capital stayed whole.",
          detay: "Sometimes the best move is no move — a speculator rarely accepts that.",
        },
        basarisizSonuc: {
          mesaj: "Realizing you missed the opportunity filled you with regret.",
          detay: "A gambler's soul is disturbed even by an empty table.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_icerden_bilgi: {
    baslik: "A Secret Overheard",
    metin:
      "A bank clerk, drunk, let slip a government decision to be announced tomorrow. You could take a position ahead of time with this information — illegal but tempting.",
    secenekler: [
      {
        metin: "Use the information, quickly take a large position.",
        ipucu: "Big profit, risk of being caught",
        basariliSonuc: {
          mesaj: "When the decision was announced your position brought a big profit; no one suspected, for now.",
          detay: "Some gains carry a quietly growing risk behind them.",
        },
        basarisizSonuc: {
          mesaj: "Your move drew attention; the exchange commissioners started examining your trades.",
          detay: "A dirty secret sometimes drags you into a dirty investigation.",
        },
      },
      {
        metin: "Don't use the information, stay clean.",
        ipucu: "A clear conscience, a missed opportunity",
        basariliSonuc: {
          mesaj: "You missed the opportunity, but at least you didn't stay a step ahead of the law.",
          detay: "Even some speculators know how to draw a line.",
        },
        basarisizSonuc: {
          mesaj: "Others made fortunes with that information; you suffered the pain of being left on the sidelines.",
          detay: "Doing the right thing is sometimes a reward only unto itself.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_banka_paniginde: {
    baslik: "Bank Panic",
    metin:
      "A bank in the city collapsed, panic is spreading; everyone is rushing to withdraw their deposits. You have two paths: withdraw your own money immediately, or gather cheap assets from the panic selling.",
    secenekler: [
      {
        metin: "Take advantage of the panic, gather assets going cheap.",
        ipucu: "Bold and dangerous — if the crisis grows, it swallows you too",
        basariliSonuc: {
          mesaj: "When the panic subsided, the assets you bought cheap reached three times their value.",
          detay: "Buying where blood runs in the streets is the work of the coldest-blooded speculators.",
        },
        basarisizSonuc: {
          mesaj: "The crisis went deeper than you expected; the assets you bought also became worthless.",
          detay: "Sometimes what you think is the bottom is just a step before the next bottom.",
        },
      },
      {
        metin: "Withdraw your own money, secure it.",
        ipucu: "Safe, opportunity missed",
        basariliSonuc: {
          mesaj: "You withdrew your money in time; you were safe while the panic grew.",
          detay: "Some victories are simply about surviving.",
        },
        basarisizSonuc: {
          mesaj: "You waited in the crowd, made it just before the bank shut its doors — but with a small loss.",
          detay: "In a moment of panic, everyone rushes to the same door.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_rakibe_karsi_bahis: {
    baslik: "Betting Against a Rival",
    metin:
      "You think {rakip}'s company will collapse soon. You could take a big 'short-selling' position against his shares — if you win, both of you will know it was your doing.",
    secenekler: [
      {
        metin: "Take a large short-selling position.",
        ipucu: "A personal gamble, a big reward or a big loss",
        basariliSonuc: {
          mesaj: "Your prediction proved right; {rakip} collapsed, you walked away with profit.",
          detay: "Some victories are built on someone else's ruin.",
        },
        basarisizSonuc: {
          mesaj: "{rakip} made an unexpected recovery; your position closed with a big loss.",
          detay: "Betting against someone sometimes means betting against yourself.",
        },
      },
      {
        metin: "Don't take the risk, focus on your normal trade.",
        ipucu: "Safe but unsatisfying",
        basariliSonuc: {
          mesaj: "You focused on your normal business; you don't regret not gambling.",
          detay: "Some opportunities deserve to be missed.",
        },
        basarisizSonuc: {
          mesaj: "{rakip} really did go bankrupt; you realized the size of the opportunity you missed.",
          detay: "Avoiding risk sometimes carries a cost too — the pain of a missed opportunity.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_kolonyal_emtia: {
    baslik: "Colonial Commodity",
    metin:
      "You've received intelligence that cotton prices from a distant colony are about to soar due to a short-term harvest shortage. You could sign a big futures contract.",
    secenekler: [
      {
        metin: "Enter into the large futures contract.",
        ipucu: "A distant gamble, much of it out of your control",
        basariliSonuc: {
          mesaj: "The shortage happened, prices soared; your contract turned into a small fortune.",
          detay: "Sometimes a harvest on the other side of the world decides the fortune in your own city.",
        },
        basarisizSonuc: {
          mesaj: "The harvest turned out better than expected, prices fell; your contract took a big loss.",
          detay: "An overseas gamble is, more often than not, outside your control.",
        },
      },
      {
        metin: "Take a small, balanced position.",
        ipucu: "Limited risk, limited reward",
        basariliSonuc: {
          mesaj: "Your small position brought a modest profit.",
          detay: "Even a disciplined speculator wins sometimes.",
        },
        basarisizSonuc: {
          mesaj: "Your small position closed with a small loss.",
          detay: "Measured gambles bring measured losses.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_kabarcik_patliyor: {
    baslik: "The Bubble Bursts",
    metin:
      "A railway stock bubble that had been inflating for years collapsed overnight. Your entire fortune is tied up in these shares; now you either have to sell and salvage what you can, or wait for a recovery.",
    secenekler: [
      {
        metin: "Sell immediately, salvage what you can.",
        ipucu: "A certain but bitter loss",
        basariliSonuc: {
          mesaj: "You sold early; you lost a large part of it but you weren't wiped out entirely.",
          detay: "Some victories are just about surviving.",
        },
        basarisizSonuc: {
          mesaj: "The line to sell was too long; by the time it was your turn the price was already near zero.",
          detay: "In a moment of panic, everyone rushes to the same door, and the door isn't enough for everyone.",
        },
      },
      {
        metin: "Wait for a recovery, hold on to the shares.",
        ipucu: "Either full salvation or total ruin",
        basariliSonuc: {
          mesaj: "Unexpectedly, the market recovered within the year; your shares regained their value.",
          detay: "Some waits get rewarded even though they seem impossible.",
        },
        basarisizSonuc: {
          mesaj: "The bubble never reinflated; the shares became worthless entirely, most of your fortune vanished into thin air.",
          detay: "Some gambles aren't won even with patience.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_yeniden_kurma: {
    baslik: "Rising From the Ashes",
    metin:
      "You lost most of your fortune once again. You could try building from scratch again, this time more cautiously — or go back to your old, more careful profession.",
    secenekler: [
      {
        metin: "Throw yourself into risky trade again, make up for the loss.",
        ipucu: "Be ready to walk through the same fire",
        basariliSonuc: {
          mesaj: "A new series of moves worked out; you made up for part of your losses.",
          detay: "Some souls want to come back all the more, the more they lose.",
        },
        basarisizSonuc: {
          mesaj: "The new venture didn't work out either; the hole got a little deeper.",
          detay: "Walking through the same fire twice burns harder the second time.",
        },
      },
      {
        metin: "Return to careful, ordinary trade.",
        ipucu: "Slow but steady recovery",
        basariliSonuc: {
          mesaj: "Ordinary trade brought a slow but solid recovery.",
          detay: "Sometimes the greatest maturity is choosing calm after the fire.",
        },
        basarisizSonuc: {
          mesaj: "The recovery went slower than you hoped, but at least the hole didn't deepen.",
          detay: "Patience sometimes only manages to stop the losses.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_komisyoncu_ortakligi: {
    baslik: "Broker Partnership",
    metin:
      "The boldest stock broker in the city offers you a partnership: combine your capital to take bigger, riskier positions. Profit and loss both double.",
    secenekler: [
      {
        metin: "Accept the partnership.",
        ipucu: "Big capital, sharing the big risk",
        basariliSonuc: {
          mesaj: "The partnership paid off nicely in its first year; the two of you are known in the city as 'the bold pair'.",
          detay: "Some partnerships grow through two gamblers emboldening each other.",
        },
        basarisizSonuc: {
          mesaj: "Your shared positions collapsed together; the partnership broke apart in a bitter argument.",
          detay: "Shared risk sometimes turns into shared regret.",
        },
      },
      {
        metin: "Refuse, keep working alone.",
        ipucu: "Less capital, less dependency",
        basariliSonuc: {
          mesaj: "You stayed independent; your gain is smaller but entirely your own.",
          detay: "Even some speculators avoid the dependency that comes with partnership.",
        },
        basarisizSonuc: {
          mesaj: "The broker partnered with someone else and they made big gains; watching the missed opportunity wore on you.",
          detay: "Sometimes even the right decision hurts when you see the opportunity slip away before your eyes.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_sigorta_kumari: {
    baslik: "The Marine Insurance Gamble",
    metin:
      "You've received an offer to join a consortium insuring a risky sea voyage: if the ship arrives safely the premium stays in your pocket, if it sinks you pay a huge compensation.",
    secenekler: [
      {
        metin: "Join the consortium, take the premium.",
        ipucu: "A tempting gamble if you trust the ship",
        basariliSonuc: {
          mesaj: "The ship weathered the storm and reached port; the premium stayed entirely yours.",
          detay: "Some gambles are betting on a captain's skill.",
        },
        basarisizSonuc: {
          mesaj: "The ship sank in a storm; paying the compensation burned your pocket badly.",
          detay: "The sea makes no promises to any insurer.",
        },
      },
      {
        metin: "Refuse the offer, protect your capital.",
        ipucu: "Safe but there's an opportunity cost",
        basariliSonuc: {
          mesaj: "You didn't join; the ship sank, and you were relieved you refused.",
          detay: "Sometimes avoidance is the best gamble.",
        },
        basarisizSonuc: {
          mesaj: "The ship arrived safely and the consortium earned a lot; the premium you missed upset you.",
          detay: "Avoiding risk sometimes comes with a regret too.",
        },
      },
    ],
  },
  sd_tuccar_yol_spek_efsanevi_servet: {
    baslik: "One Last Big Gamble",
    metin:
      "You're getting old; maybe it's time for the last big gamble of your career. You could put your entire savings into one massive railway-coal monopoly venture, or retire cautiously.",
    secenekler: [
      {
        metin: "Play the last big gamble, put everything on the line.",
        ipucu: "Legend or ruin — no middle ground",
        basariliSonuc: {
          mesaj: "The venture turned into a massive success; your name will be spoken of for years as 'the man who won that last big gamble'.",
          detay: "Some lives turn into legend with a single bold move.",
        },
        basarisizSonuc: {
          mesaj: "The venture collapsed; most of the fortune you built over a lifetime melted away overnight.",
          detay: "A gambler's soul can't help playing the last card — sometimes that's the most expensive lesson.",
        },
      },
      {
        metin: "Give up gambling, move to a cautious retirement.",
        ipucu: "A calm finale, no legend at all",
        basariliSonuc: {
          mesaj: "You decided to spend your last years in peace; your fortune is safe, your sleep is calm.",
          detay: "Some gamblers show their greatest maturity by refusing the last gamble.",
        },
        basarisizSonuc: {
          mesaj: "You retired, but reading about that monopoly you missed in the paper filled you with sorrow.",
          detay: "Some 'what ifs' don't let go until you die.",
        },
      },
    ],
  },

  // ======================= CHARITABLE (11) =======================
  sd_tuccar_yol_hayir_hastane_bagisi: {
    baslik: "City Hospital",
    metin:
      "The city's only hospital is falling short; big donors are being sought to build a new wing. You're offered to have your name given to a hospital wing.",
    secenekler: [
      {
        metin: "Make the large donation.",
        ipucu: "Expensive but a lasting legacy",
        basariliSonuc: {
          mesaj: "When the new wing opened, your name was written on its door; the city will remember you for years.",
          detay: "Some names become immortal by being carved into stone.",
        },
        basarisizSonuc: {
          mesaj: "The donation was made but construction was delayed; for now it remained only a pledge.",
          detay: "Good deeds sometimes require patience.",
        },
      },
      {
        metin: "Make a small, measured donation.",
        ipucu: "Affordable but a modest contribution",
        basariliSonuc: {
          mesaj: "Your donation was small but received sincerely.",
          detay: "Every drop makes the ocean bigger.",
        },
        basarisizSonuc: {
          mesaj: "Your donation made no difference, the hospital is still struggling.",
          detay: "Sometimes small kindnesses stay dim beside a great need.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_okul_kurma: {
    baslik: "Free School",
    metin:
      "Most of the children in the poor neighborhoods never go to school at all. You're considering founding a free school with your own money — a big investment, but a legacy that would last for years.",
    secenekler: [
      {
        metin: "Build the school, pay the teachers yourself.",
        ipucu: "A long-term investment",
        basariliSonuc: {
          mesaj: "When the school's first graduates came out, the city started calling you 'the father of education'.",
          detay: "Investing in a child's future is the most lasting capital there is.",
        },
        basarisizSonuc: {
          mesaj: "The school opened but not enough teachers could be found; the start was rocky.",
          detay: "Big dreams sometimes move forward in small steps.",
        },
      },
      {
        metin: "Donate to an existing school instead of founding your own.",
        ipucu: "Cheaper, a less visible contribution",
        basariliSonuc: {
          mesaj: "Your donation increased the existing school's capacity; a quiet but real contribution.",
          detay: "Not every contribution has to become a story.",
        },
        basarisizSonuc: {
          mesaj: "The donation went to administrative expenses, its direct impact was small.",
          detay: "Good intentions sometimes get caught up in bureaucracy.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_muhendis_mentorlugu: {
    baslik: "The Young Inventor",
    metin:
      "A poor young man came to your door with the prototype of a machine he designed himself; he has no money, only an idea. You could support him.",
    secenekler: [
      {
        metin: "Give the young inventor capital and workshop support.",
        ipucu: "Risky but potentially a big return",
        basariliSonuc: {
          mesaj: "The machine worked; the two of you patented it together, the gain was enough for both.",
          detay: "Some investments fill both your pocket and your heart.",
        },
        basarisizSonuc: {
          mesaj: "The machine didn't quite work, but the young inventor found the courage to keep trying.",
          detay: "Every failed attempt is the seed of the next discovery.",
        },
      },
      {
        metin: "Give a small gift, let him go on his way.",
        ipucu: "A cheap gesture, limited effect",
        basariliSonuc: {
          mesaj: "The small gift meant a great deal in the young man's eyes.",
          detay: "Sometimes a handful of money changes a life.",
        },
        basarisizSonuc: {
          mesaj: "The young inventor got a less fortunate response at another door; you never learned how it ended.",
          detay: "Some stories stay unfinished.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_hissedar_baskisi: {
    baslik: "Shareholder Pressure",
    metin:
      "Your business partners say your donations are eating into the profit margin; either you'll cut back on your charity work or bear the pressure they're putting on you.",
    secenekler: [
      {
        metin: "Continue the charity work, resist the shareholders.",
        ipucu: "Stay true to your principles, the partnership grows strained",
        basariliSonuc: {
          mesaj: "Your stance angered some partners, but your standing in the public eye rose.",
          detay: "Some principles are worth more than a partnership.",
        },
        basarisizSonuc: {
          mesaj: "One of your partners withdrew his shares; the company experienced a temporary capital shortage.",
          detay: "Principles sometimes have a price.",
        },
      },
      {
        metin: "Cut the charity budget, appease your partners.",
        ipucu: "Safe but touches your conscience",
        basariliSonuc: {
          mesaj: "The partnership was appeased, but as your donations shrank a discontent settled inside you.",
          detay: "Some compromises cost you something even when you come out ahead.",
        },
        basarisizSonuc: {
          mesaj: "News of the cuts leaked; you were criticized as 'the philanthropist who gave up his principles'.",
          detay: "Reputation sometimes shakes the moment you lose your consistency.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_bilimsel_destek: {
    baslik: "The Scientist's Request",
    metin:
      "A local scientist is seeking funding for his experiments; no one believes in him but his findings sound interesting. He comes to you because you're known as 'the risk-taking donor'.",
    secenekler: [
      {
        metin: "Fund the research.",
        ipucu: "An investment in the unknown — the reward could be great",
        basariliSonuc: {
          mesaj: "The scientist's discovery turned into a new method used in industry; your name is spoken of along with the invention.",
          detay: "Some investments are about buying the future today.",
        },
        basarisizSonuc: {
          mesaj: "The research came to nothing; the money is gone but the scientist's gratitude remains.",
          detay: "Not every scientific effort ends in a discovery.",
        },
      },
      {
        metin: "Give a small symbolic support, don't take the risk.",
        ipucu: "A cheap gesture, limited effect",
        basariliSonuc: {
          mesaj: "Your small support still gave the scientist's work a bit of breathing room.",
          detay: "Even a small contribution sometimes keeps a door ajar.",
        },
        basarisizSonuc: {
          mesaj: "The support wasn't enough, the research kept looking for another donor.",
          detay: "Some dreams don't wait for just one hand.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_kitliktan_koruma: {
    baslik: "Famine-Time Soup Kitchen",
    metin:
      "A bad harvest season struck the city; hunger has begun in the poor neighborhoods. You could open a soup kitchen from your own storehouse, or stay quiet to protect your business.",
    secenekler: [
      {
        metin: "Open a soup kitchen, distribute provisions from your storehouse.",
        ipucu: "Expensive but life-saving",
        basariliSonuc: {
          mesaj: "Hundreds of people fed at the soup kitchen; the city remembers you like a hero.",
          detay: "Some kindnesses become immortal in the memory of a winter.",
        },
        basarisizSonuc: {
          mesaj: "The provisions weren't enough for the famine, but it was far better than doing nothing at all.",
          detay: "Sometimes doing what you can is meaningful even if it isn't enough.",
        },
      },
      {
        metin: "Stay quiet, protect your own business.",
        ipucu: "Safe but out of character",
        basariliSonuc: {
          mesaj: "Your business stayed safe but ignoring the famine unsettled you.",
          detay: "For a charitable heart, some silences are the loudest regret.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was noticed; people started saying 'the philanthropist who vanished in hard times'.",
          detay: "An image is tested most in the moment it's needed most.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_kraliyet_nisani: {
    baslik: "An Offer of Honors",
    metin:
      "Word of your years of charity has reached the palace; you're offered an official honor/title. Accepting opens the door to a grand ceremony, and afterward to social expectations.",
    secenekler: [
      {
        metin: "Accept the honor, make the ceremony grand.",
        ipucu: "Prestige rises, so does responsibility",
        basariliSonuc: {
          mesaj: "The ceremony became the talk of the city; your name is now recorded officially with charity too.",
          detay: "Some titles also bring expectations that last for years.",
        },
        basarisizSonuc: {
          mesaj: "The ceremony was modest but the title still went into the record.",
          detay: "Not every honor needs to be crowned with a grand ceremony.",
        },
      },
      {
        metin: "Stay humble, politely refuse the honor.",
        ipucu: "Humility is a message in itself",
        basariliSonuc: {
          mesaj: "You said 'what I've done is its own reward'; this attitude made the public love you even more.",
          detay: "Some people earn a bigger title by refusing one.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal created mild disappointment at the palace, but the public still appreciated you.",
          detay: "Not every humility is received where it's expected.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_deprem_yardimi: {
    baslik: "The Neighboring City's Disaster",
    metin:
      "A great fire disaster struck a neighboring city; hundreds of families are left homeless. You could organize a relief caravan from your own city.",
    secenekler: [
      {
        metin: "Organize the caravan, add your own supplies too.",
        ipucu: "Expensive but an exemplary act of solidarity",
        basariliSonuc: {
          mesaj: "When the caravan reached the neighboring city, the people welcomed you in tears.",
          detay: "Some kindnesses cross city borders and turn into a legend.",
        },
        basarisizSonuc: {
          mesaj: "The caravan was delayed on the road, the aid arrived late but still made a difference.",
          detay: "Your intent is valuable regardless of timing.",
        },
      },
      {
        metin: "Send a small cash donation, don't join the caravan.",
        ipucu: "Less effort, a more limited effect",
        basariliSonuc: {
          mesaj: "Your donation was sent; it wasn't a grand gesture but it was a real contribution.",
          detay: "Not every contribution requires a caravan.",
        },
        basarisizSonuc: {
          mesaj: "Your donation got lost among thousands of others, no one noticed.",
          detay: "Some kindnesses are done quietly and unnoticed — that too is a kind of value.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_sanat_koruyuculugu: {
    baslik: "Patronage of the Arts",
    metin:
      "A poor painter can't paint because he can't afford canvas and paint. You could give him a studio and a regular salary, letting him continue his art.",
    secenekler: [
      {
        metin: "Give the painter a studio and a salary.",
        ipucu: "A cultural investment, an uncertain outcome",
        basariliSonuc: {
          mesaj: "The painter's works became known in the city; some paintings entered your own collection, their value multiplied.",
          detay: "An investment in art sometimes turns out to be not only beautiful, but profitable too.",
        },
        basarisizSonuc: {
          mesaj: "The painter's style wasn't well received but at least he could keep making art.",
          detay: "Not every patronage ends in a masterpiece.",
        },
      },
      {
        metin: "Give a one-time small gift.",
        ipucu: "Cheap and limited support",
        basariliSonuc: {
          mesaj: "Your small help kept the painter afloat for a few months.",
          detay: "Sometimes a small gesture means postponing a great promise.",
        },
        basarisizSonuc: {
          mesaj: "The help wasn't enough, the painter eventually had to give up his art.",
          detay: "Some dreams fade without finding enough support.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_miras_vakfi: {
    baslik: "A Lasting Foundation",
    metin:
      "You're getting old; you're considering founding a lasting foundation that will continue after your death — a structure devoting part of your fortune to charity forever.",
    secenekler: [
      {
        metin: "Found a large foundation, set aside a significant part of your fortune.",
        ipucu: "A lasting legacy, a serious share of your fortune",
        basariliSonuc: {
          mesaj: "Your foundation was established; it will reach those in need for generations after you.",
          detay: "Some names keep doing good even after their owner has died.",
        },
        basarisizSonuc: {
          mesaj: "The foundation was established but its management turned out weak; it couldn't show the expected impact in its early years.",
          detay: "A good intention can remain unfinished without good management.",
        },
      },
      {
        metin: "Leave your fortune to your family, make do with small donations.",
        ipucu: "A safer legacy plan",
        basariliSonuc: {
          mesaj: "Your family is secure; your charity continues, even at a small scale.",
          detay: "Not every legacy has to be a great foundation.",
        },
        basarisizSonuc: {
          mesaj: "After your death your family consumed part of the fortune quickly; the charitable legacy stayed weak.",
          detay: "The fate of some legacies is shaped by the hands that come after the owner.",
        },
      },
    ],
  },
  sd_tuccar_yol_hayir_kolera_salgini: {
    baslik: "Cholera and Clean Water",
    metin:
      "A cholera outbreak is spreading in the city; doctors blame the dirty well water. Laying a clean water aqueduct to the neighborhood around your factory is a big expense but could save lives.",
    secenekler: [
      {
        metin: "Fund the aqueduct from your own budget.",
        ipucu: "Expensive but a measurable life-saving act",
        basariliSonuc: {
          mesaj: "When the aqueduct was completed, the number of cases in the neighborhood visibly dropped; the doctors held you up as an example.",
          detay: "Some acts of charity leave not just a name, but a life.",
        },
        basarisizSonuc: {
          mesaj: "The aqueduct was completed late, the outbreak continued a while longer but eventually made a difference.",
          detay: "Good deeds sometimes race against time and lose — still not worthless.",
        },
      },
      {
        metin: "Only distribute boiled water and medicine, avoid a lasting investment.",
        ipucu: "Cheap and fast but a temporary solution",
        basariliSonuc: {
          mesaj: "The distributed water and medicine eased the outbreak's worst weeks.",
          detay: "Even a temporary solution is better than no solution at all.",
        },
        basarisizSonuc: {
          mesaj: "The distribution fell short; the outbreak continued in the neighborhood a few more weeks.",
          detay: "Some crises don't bow to half measures.",
        },
      },
    ],
  },
};
