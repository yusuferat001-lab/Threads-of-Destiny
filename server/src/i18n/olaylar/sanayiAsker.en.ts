import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiAsker.ts — İngilizce çevirileri. */
export const OLAYLAR_SANAYI_ASKER_EN: Record<string, OlayCeviri> = {
  sd_asker_ayaklanma: {
    baslik: "The Workers' Uprising",
    metin:
      "The workers in the {bolge} factory district have built a barricade. Command has given the order to move in. Behind the barricade are not armed men but families asking for bread.",
    secenekler: [
      {
        metin: "Carry out the order, break the barricade.",
        basariliSonuc: {
          mesaj: "The barricade was broken; command put you on the promotion list.",
          detay:
            "You did not write in the report how many were hurt that day. The promotion came, and so did a woman in the district who spat in your face.",
        },
        basarisizSonuc: {
          mesaj: "The workers resisted; you were caught in the crowd and badly beaten.",
          detay:
            "Neither did the barricade break nor did you become a hero. While you lay in the infirmary, command filed the 'operation failed' report under your name.",
        },
      },
      {
        metin: "Delay the intervention, try to mediate.",
        basariliSonuc: {
          mesaj: "The talks worked; the barricade came down without bloodshed, no one died.",
          detay:
            "The workers carried you on their shoulders, while command noted 'delay in carrying out orders' on your record. You earned both.",
        },
        basarisizSonuc: {
          mesaj: "The talks collapsed; you were both too late and someone else did the crackdown.",
          detay:
            "Blood was spilled anyway and you had only delayed it. Command relieved you of duty, and the workers don't even know your name.",
        },
      },
      {
        metin: "Leave the post on a pretext of illness.",
        basariliSonuc: {
          mesaj: "You went on medical leave; you did not join the crackdown, and no one pressed the matter.",
          detay:
            "You kept your hands clean but watched someone else dirty theirs. You were struck off the promotion list, and you don't care — you think.",
        },
        basarisizSonuc: {
          mesaj: "Your report was found false; a record of 'shirking duty' was entered on your file.",
          detay:
            "You neither joined the crackdown nor honestly opposed it. Your file now reads both 'unreliable' and 'coward'.",
        },
      },
    ],
  },

  sd_asker_somurge: {
    baslik: "Colonial Duty",
    metin:
      "A revolt has broken out in a distant colony. Your regiment is being sent: the climate is deadly, the local people hostile, but land and rank are promised to those who return.",
    secenekler: [
      {
        metin: "Join the mission with full commitment.",
        basariliSonuc: {
          mesaj: "The revolt was put down; you received a medal, rank, and land in the colony.",
          detay:
            "Those who work the land you were given are the people who fought against you three years ago. You threw yourself into your work to avoid thinking about it.",
        },
        basarisizSonuc: {
          mesaj: "Malaria mowed down the regiment; you did not escape either, and were carried aboard the ship on a stretcher.",
          detay:
            "It was not a bullet but a mosquito that beat you. The fevers recurred for years, and that climate never left your body.",
        },
      },
      {
        metin: "Apply for a clerkship in the colonial administration.",
        basariliSonuc: {
          mesaj: "You got a clerkship in the administration building; you watched the war from a window.",
          detay:
            "You recorded the taxes and the confiscated land. You did not wield a sword, but your pen displaced more families.",
        },
        basarisizSonuc: {
          mesaj: "Your clerkship request was denied; you went to the front and were called 'a man who tried to run'.",
          detay:
            "The worst combination: you are both in danger and without respect. Your regiment mates now keep their distance.",
        },
      },
    ],
  },

  sd_asker_yeni_tufek_denemesi: {
    baslik: "The Experimental Rifle",
    metin:
      "The army has chosen you to test a new rifle prototype. The weapon is powerful, but some examples have suffered barrel bursts; not deadly, but risky.",
    secenekler: [
      {
        metin: "Volunteer to take on the test.",
        basariliSonuc: {
          mesaj: "The weapon worked without a hitch; your report was used in the army's decision-making.",
          detay: "You are now known as 'the man who tests new weapons first'.",
        },
        basarisizSonuc: {
          mesaj: "The barrel burst in your hand; your fingers were injured, but you received compensation.",
          detay: "The army logged it as a 'faulty batch'; you paid the price with your body.",
        },
      },
      {
        metin: "Refuse the test, keep to the old-model rifle.",
        basariliSonuc: {
          mesaj: "Your refusal was received as reasonable; another volunteer was found.",
          detay: "You prioritized your safety and no one used it against you.",
        },
        basarisizSonuc: {
          mesaj: "Your superiors read your refusal as 'being closed to progress'.",
          detay: "Sometimes even being cautious becomes grounds for accusation.",
        },
      },
    ],
  },

  sd_asker_muhbir_teklifi: {
    baslik: "A Secret Intelligence Offer",
    metin:
      "An officer offers you a secret assignment to infiltrate the workers' unions and gather information. There is good money, but you will have to spy on your friends.",
    secenekler: [
      {
        metin: "Accept the assignment, begin to infiltrate.",
        basariliSonuc: {
          mesaj: "You received a considerable payment for the information you gathered.",
          detay: "You remember the faces of the workers who came to the meetings; they had trusted you.",
        },
        basarisizSonuc: {
          mesaj: "Your identity was exposed; the workers beat you and threw you out.",
          detay: "You both betrayed and paid the price without ever getting its reward.",
        },
      },
      {
        metin: "Refuse the offer.",
        basariliSonuc: {
          mesaj: "Your refusal stayed as a note on your file, but your conscience is at ease.",
          detay: "Some doors will not open for you now, but at least you betrayed no one.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was read as 'unreliable'; you were struck off the promotion list.",
          detay: "Doing the right thing sometimes costs you your career.",
        },
      },
    ],
  },

  sd_asker_kislada_veba_karantina: {
    baslik: "An Outbreak in the Barracks",
    metin:
      "There are soldiers in the barracks showing signs of typhoid. Command wants to impose a quarantine, but that means cancelled leave and a collapse in morale.",
    secenekler: [
      {
        metin: "Lead the quarantine.",
        basariliSonuc: {
          mesaj: "The quarantine was effective; the outbreak did not spread beyond the barracks.",
          detay: "The soldiers grumbled at first, then thanked you.",
        },
        basarisizSonuc: {
          mesaj: "Despite the precautions, you fell ill too.",
          detay: "You imposed the quarantine and still could not escape the sickness.",
        },
      },
      {
        metin: "Don't cancel leave, put the sick in a separate tent.",
        basariliSonuc: {
          mesaj: "The soldiers kept their morale and the sickness did not spread; you were lucky.",
          detay: "You took the risk and this time it worked.",
        },
        basarisizSonuc: {
          mesaj: "The sickness spread fast; a third of the barracks took to bed, you included.",
          detay: "The risk you took for morale cost you your health.",
        },
      },
    ],
  },

  sd_asker_fabrika_koruma_gorevi: {
    baslik: "Factory Watch",
    metin:
      "A factory owner offers you a private payment to guard his factory against the striking workers. It's not your official duty, but your superiors turn a blind eye.",
    secenekler: [
      {
        metin: "Accept the offer, guard the factory.",
        basariliSonuc: {
          mesaj: "The factory was guarded without incident; the owner paid generously.",
          detay: "People stare at you now when you pass through the worker district; you have learned to ignore it.",
        },
        basarisizSonuc: {
          mesaj: "You were hurt in a scuffle with angry workers; you got your payment anyway.",
          detay: "The money is in your pocket, but your body paid for it.",
        },
      },
      {
        metin: "Refuse the offer, focus on your official duty.",
        basariliSonuc: {
          mesaj: "You stayed neutral; neither the workers nor the boss is angry with you.",
          detay: "You gave up the extra income, but your conscience and reputation stayed intact.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered the factory owner; he stopped giving you priority on military supply contracts.",
          detay: "Even your neutrality sometimes offends someone.",
        },
      },
    ],
  },

  sd_asker_madalya_sahtekarligi: {
    baslik: "False Heroism",
    metin:
      "You could claim you 'acted heroically' in a battle you never actually took part in and apply for a medal; the records are muddled and no one can fully check.",
    secenekler: [
      {
        metin: "Make the false application.",
        basariliSonuc: {
          mesaj: "The medal was given to you; no one questioned your story.",
          detay: "Every time you look at the medal on your chest, you are the only one who knows you did not earn it.",
        },
        basarisizSonuc: {
          mesaj: "A soldier who was actually there called you a liar; your fraud was heard army-wide.",
          detay: "The reputation you tried to win ended in its exact opposite.",
        },
      },
      {
        metin: "Don't apply, be content with your real service.",
        basariliSonuc: {
          mesaj: "You carried on with your ordinary service; no one questioned you.",
          detay: "Even without a medal, you can be proud of yourself.",
        },
        basarisizSonuc: {
          mesaj: "While others won medals with false applications, you came away empty-handed.",
          detay: "Honesty is not always rewarded, but it did not change you.",
        },
      },
    ],
  },

  "sd_asker_telgraf_hattı_sabotaji": {
    baslik: "The Cut Telegraph Line",
    metin:
      "The telegraph line between the front and headquarters has been sabotaged. You are asked to join the repair team, but the line runs through an area close to the enemy line.",
    secenekler: [
      {
        metin: "Use one of your foster children as a scout to repair the line safely.",
        basariliSonuc: {
          mesaj:
            "One of the foster children you raised knew the area like the back of his hand. Under his guidance you repaired the line without falling into an ambush.",
          detay: "The investment you made in the orphanage years ago saved your life today.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
      },
      {
        metin: "Join the repair team, fix the line.",
        basariliSonuc: {
          mesaj: "You repaired the line under enemy fire; communication was restored.",
          detay: "Command said this repair changed the course of the war.",
        },
        basarisizSonuc: {
          mesaj: "You were caught by sniper fire during the repair.",
          detay: "The line was fixed, but the price was heavy; two of your friends were wounded too.",
        },
      },
      {
        metin: "Deliver the message by hand as a courier.",
        basariliSonuc: {
          mesaj: "You delivered the message on horseback without approaching the enemy lines.",
          detay: "You were spent with exhaustion, but the mission was completed.",
        },
        basarisizSonuc: {
          mesaj: "Your horse stumbled on the road, the message arrived late; a chance to attack was missed.",
          detay: "You did what you could, but it was not enough.",
        },
      },
    ],
  },

  sd_asker_kislada_kumarhane: {
    baslik: "The Secret Gambling Den",
    metin:
      "A hidden gambling table runs in one of the back rooms of the barracks. Winners take real money, but the risk of being caught means a disciplinary penalty.",
    secenekler: [
      {
        metin: "Sit at the table, try your luck.",
        basariliSonuc: {
          mesaj: "It was a lucky night; you left the table with your pockets full.",
          detay: "The other soldiers eyed you warily and said 'I won't play again'.",
        },
        basarisizSonuc: {
          mesaj: "It was a bad night; you left most of your pay on the table.",
          detay: "You are thinking about how to get by until the end of the month.",
        },
      },
      {
        metin: "Stay away, keep your discipline.",
        basariliSonuc: {
          mesaj: "You did not get mixed up in the gambling; nothing happened to your money or your reputation.",
          detay: "Some of your friends call it 'boring', but you are content with your decision.",
        },
        basarisizSonuc: {
          mesaj: "They teased you as 'arrogant' for not joining.",
          detay: "Right decisions sometimes become the butt of jokes.",
        },
      },
    ],
  },

  sd_asker_gazeteci_roportaji: {
    baslik: "The War Correspondent",
    metin:
      "A newspaper correspondent wants to hear the real conditions at the front from you. What you say will either praise the army or turn into a sensational scandal.",
    secenekler: [
      {
        metin: "Tell the truth as it is.",
        basariliSonuc: {
          mesaj: "Your interview caused a great stir among the public; you became known for your honesty.",
          detay:
            "The real conditions of the soldiers were spoken about this openly for the first time; some improvements were even made.",
        },
        basarisizSonuc: {
          mesaj: "Your superiors found the interview 'demoralizing' and gave you a disciplinary penalty.",
          detay: "Telling the truth had a price, but the public supported you.",
        },
      },
      {
        metin: "Paint an optimistic picture that praises the army.",
        basariliSonuc: {
          mesaj: "Your superiors were pleased with the interview; you received a small reward.",
          detay: "What you said was not quite the truth, but no one questioned it.",
        },
        basarisizSonuc: {
          mesaj: "When the soldiers at the front read your exaggerated account, they lost their trust in you.",
          detay: "You pleased your superiors but disappointed your comrades.",
        },
      },
    ],
  },

  sd_asker_yeni_silah_denemesi: {
    baslik: "The Experimental Weapon",
    metin:
      "Your commander wants to test a new, as-yet-untested rapid-fire weapon on you in the field. Whether it is adopted by the army will be decided by your performance.",
    secenekler: [
      {
        metin: "Accept the test, use the weapon in the field.",
        basariliSonuc: {
          mesaj: "The weapon proved unexpectedly effective; your performance was talked about at command level.",
          detay: "Some risks put you into history.",
        },
        basarisizSonuc: {
          mesaj: "The weapon recoiled unexpectedly; you were badly injured.",
          detay: "What is experimental has a price.",
        },
      },
      {
        metin: "Refuse the test, keep your traditional weapon.",
        basariliSonuc: {
          mesaj: "You refused; your commander frowned, but your health is intact.",
          detay: "Some assurances are worth more than reputation.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was logged as 'cowardice'; you dropped back on the promotion list.",
          detay: "Not every cautious step is read the same way.",
        },
      },
    ],
  },

  sd_asker_grev_kirici_gorevi: {
    baslik: "On the Strike Line",
    metin:
      "You have been ordered to disperse the striking workers gathered outside the factory. Among them are even your childhood friends; the order is firm, but the tension in the square is at its peak.",
    secenekler: [
      {
        metin: "Carry out the order harshly, put down the strike.",
        basariliSonuc: {
          mesaj:
            "You dispersed the strike; command rewarded you, but no one in your district will meet your eye now.",
          detay: "Some duties make you a stranger to your own people.",
        },
        basarisizSonuc: {
          mesaj: "The intervention turned into a clash, stones and truncheons flew; you left wounded.",
          detay: "Harshness is sometimes met with harshness.",
        },
      },
      {
        metin: "Slow the intervention, try to lower the tension.",
        basariliSonuc: {
          mesaj:
            "You eased the tension, they dispersed without bloodshed; your old district still counts you as 'one of us'.",
          detay: "Some victories are won without blood.",
        },
        basarisizSonuc: {
          mesaj: "Your slowing down was counted as 'dereliction of duty'; you received a disciplinary penalty.",
          detay: "Your mercy sometimes has an official price.",
        },
      },
    ],
  },

  sd_asker_somurge_vicdan: {
    baslik: "A Test of Conscience in the Colony",
    metin:
      "In the colony where you are posted, you witnessed a local family's land being confiscated unjustly. Your superiors count it as 'the requirement of order'; speaking up may change nothing, but your conscience won't stay quiet.",
    secenekler: [
      {
        metin: "Defend the family, object to your superiors.",
        basariliSonuc: {
          mesaj: "Your objection drew the attention of some senior officers; part of the family got their land back.",
          detay: "Some voices work better than expected.",
        },
        basarisizSonuc: {
          mesaj: "Your objection was ignored, and on top of it you were flagged as 'undisciplined'.",
          detay: "You sometimes pay for your conscience with your career.",
        },
      },
      {
        metin: "Stay silent, follow orders and the order of things.",
        basariliSonuc: {
          mesaj:
            "You stayed silent, your career advanced without a hitch; but the helplessness in that family's eyes still won't leave your mind.",
          detay: "Some silences gnaw at you for years.",
        },
        basarisizSonuc: {
          mesaj: "You know your silence will come back to you one day as another test of conscience.",
          detay: "The reckonings you flee do not leave you.",
        },
      },
    ],
  },

  sd_asker_savas_muhabiri_gomulu: {
    baslik: "The Embedded Correspondent",
    metin:
      "A war correspondent from a major newspaper has been embedded with your battalion at the front, writing down your every move. It's your call how much you open up to him.",
    secenekler: [
      {
        metin: "Give him full access, speak to him candidly.",
        basariliSonuc: {
          mesaj: "What he wrote reached wide audiences; your name was spoken of with respect in the papers.",
          detay:
            "It cost you hospitality and time, but in return thousands saw a war through your eyes.",
        },
        basarisizSonuc: {
          mesaj: "He twisted your words to his own slant; the article troubled your superiors.",
          detay: "Candor, it turns out, also means losing control of your own words.",
        },
      },
      {
        metin: "Keep your distance, give only official information.",
        basariliSonuc: {
          mesaj: "The correspondent wrote a dry report; no one was praised, no one blamed.",
          detay: "You stayed safe, but someone else became the hero of the story.",
        },
        basarisizSonuc: {
          mesaj: "He read your distance as 'having something to hide' and wrote it that way.",
          detay: "Silence sometimes raises more questions than speaking would have.",
        },
      },
    ],
  },

  sd_asker_divani_harp: {
    baslik: "The Court-Martial",
    metin:
      "You sit on the tribunal judging a private who defied orders and pulled back from the front. Whether it was fear or a genuine tactical necessity is unclear; the verdict you give will decide a life.",
    secenekler: [
      {
        metin: "Hand down a harsh sentence, make an example of discipline.",
        basariliSonuc: {
          mesaj: "The sentence was made an example; discipline was restored, command praised you.",
          detay: "You can't help thinking about what will be written to that private's family.",
        },
        basarisizSonuc: {
          mesaj: "The verdict caused an uproar at the front; the soldiers found you merciless.",
          detay: "Being harsh made you neither more respected nor more at ease.",
        },
      },
      {
        metin: "Weigh the mitigating circumstances, give a lighter sentence.",
        basariliSonuc: {
          mesaj: "Your verdict was found just; the private got a second chance and earned it.",
          detay: "Justice sometimes takes courage; this time it paid off.",
        },
        basarisizSonuc: {
          mesaj: "Your superiors called your decision 'softness' and hit you with a disciplinary penalty.",
          detay: "Your mercy remained a stain on your own record.",
        },
      },
    ],
  },

  sd_asker_hastane_reformu: {
    baslik: "The Field Hospital Reform",
    metin:
      "Conditions at the field hospital are dreadful: filthy bandages, too few staff, a high death rate. A team of civilian nurses wants to change how things are run, but the top brass calls it 'needless expense'.",
    secenekler: [
      {
        metin: "Back the reform, contribute from your own resources.",
        basariliSonuc: {
          mesaj: "The reform went ahead; the hospital's death rate dropped noticeably.",
          detay: "The money out of your own pocket changed how many soldiers made it home alive.",
        },
        basarisizSonuc: {
          mesaj: "The funds weren't enough, the reform was left half-done; the nurses gave up and left.",
          detay: "Good will alone doesn't make bandages.",
        },
      },
      {
        metin: "Stick with the old way, reserve the funds for the war.",
        basariliSonuc: {
          mesaj: "The budget was preserved for the war; the hospital deaths remained just a statistic.",
          detay: "The numbers look fine, but you know the names behind those numbers.",
        },
        basarisizSonuc: {
          mesaj: "The filthy conditions turned into an outbreak at the hospital; you fell ill too.",
          detay: "Every coin you saved came back from somewhere else in the end.",
        },
      },
    ],
  },

  sd_asker_maas_isyani: {
    baslik: "Unpaid Wages",
    metin:
      "The soldiers' pay hasn't come for months; whispers of mutiny circle the barracks. The men come to you — either be their voice, or show your loyalty to your superiors.",
    secenekler: [
      {
        metin: "Carry the soldiers' demand up to your superiors, be their voice.",
        basariliSonuc: {
          mesaj:
            "Your demand was heard, wages were partly paid; you even gave some soldiers advances from your own pocket.",
          detay: "Speaking for them cost you dearly, but now the barracks trusts you.",
        },
        basarisizSonuc: {
          mesaj: "Your demand was labeled 'incitement'; a penalty was docked from your own pay.",
          detay: "Raising a rightful voice came out of your own pocket.",
        },
      },
      {
        metin: "Stay silent, call for obedience.",
        basariliSonuc: {
          mesaj:
            "Your superiors were pleased with your loyalty; among the soldiers you became known as 'not one of their own'.",
          detay: "Silence brought you a reward, and a loneliness.",
        },
        basarisizSonuc: {
          mesaj: "The whispers turned into a mutiny; you were wounded in the chaos that broke out.",
          detay: "Staying silent didn't stop the storm — it just left you inside it.",
        },
      },
    ],
  },

  sd_asker_silah_kacakciligi: {
    baslik: "The Black Market Arms Offer",
    metin:
      "A trader proposes that you sell rifles 'gone missing' from the armory to rebels and take a cut. There's a lot of money in it; but those weapons could one day be pointed at your own comrades.",
    secenekler: [
      {
        metin: "Accept the offer, smuggle the weapons.",
        basariliSonuc: {
          mesaj: "The weapons were delivered without a hitch; your pocket grew heavy overnight.",
          detay: "You'll never know whether one of your comrades will be shot with those very weapons.",
        },
        basarisizSonuc: {
          mesaj:
            "You were caught in the act of smuggling; at the front you faced interrogation and the threat of execution.",
          detay: "The scent of money arrived at the same time as the scent of death.",
        },
      },
      {
        metin: "Refuse the offer, report it to your superiors.",
        basariliSonuc: {
          mesaj: "Your report brought down the smuggling ring; the trader was arrested.",
          detay: "Some opportunities are worth more for being refused.",
        },
        basarisizSonuc: {
          mesaj: "Your report couldn't be proven; the trader slandered you and damaged your reputation.",
          detay: "You did the right thing and still ended up the accused.",
        },
      },
    ],
  },

  sd_asker_top_atisi_hatasi: {
    baslik: "A Fatal Mistake",
    metin:
      "An officer's miscalculated artillery coordinates hit your own position; several soldiers died. The officer wants you to alter the report and stay silent.",
    secenekler: [
      {
        metin: "Report the truth, expose the mistake.",
        basariliSonuc: {
          mesaj:
            "The truth was reported; the families of the dead soldiers at least learned what really happened.",
          detay: "Some officers never sat you at their table again, but your conscience is clear.",
        },
        basarisizSonuc: {
          mesaj: "The report was dismissed as 'an unproven accusation'; the officer's friends shut you out.",
          detay: "Telling the truth doesn't always mean the truth wins.",
        },
      },
      {
        metin: "Stay silent, alter the report together.",
        basariliSonuc: {
          mesaj: "You stayed silent; the officer was grateful, your name went on the promotion list.",
          detay: "When the promotion came, you also remembered the names of those who died.",
        },
        basarisizSonuc: {
          mesaj: "The truth came out from another witness; you were accused of falsification.",
          detay: "The truth you hid burst open, and pulled you in with it.",
        },
      },
    ],
  },

  sd_asker_gazi_emekli_maasi: {
    baslik: "The Fight Over a Veteran's Pension",
    metin:
      "An old comrade who lost an arm in the war has had his pension lost in the bureaucracy. You could push his file to the front of the line, but it would delay another veteran waiting his turn.",
    secenekler: [
      {
        metin: "Push your comrade's file to the front.",
        basariliSonuc: {
          mesaj: "Your comrade got his pension; his gratitude toward you never faded.",
          detay: "You paid off a debt, but you also learned the name of the veteran who lost his place in line.",
        },
        basarisizSonuc: {
          mesaj: "The bureaucracy turned you down as an 'irregular request'; your comrade is still waiting.",
          detay: "Your good will was no match for the paperwork.",
        },
      },
      {
        metin: "Follow the queue, wait your turn fairly for everyone.",
        basariliSonuc: {
          mesaj: "You were fair; your comrade waited for months, but the system worked for everyone.",
          detay: "Doing the right thing sometimes means upsetting someone you care about.",
        },
        basarisizSonuc: {
          mesaj: "Your comrade never forgot that you stayed quiet while he needed your help.",
          detay: "You stayed loyal to fairness and lost a friendship for it.",
        },
      },
    ],
  },

  sd_asker_topcu_denemesi: {
    baslik: "The New Cannon Trial",
    metin:
      "A factory is counting on your favorable report to get a new cannon approved by the army. The gun is powerful, but the trials showed some cracks in the barrel.",
    secenekler: [
      {
        metin: "Give the cannon a favorable report, back a fast approval.",
        basariliSonuc: {
          mesaj: "The cannon was approved quickly; the factory paid you a generous sum.",
          detay: "You didn't mention the cracks in your report; you know this silence will cost something.",
        },
        basarisizSonuc: {
          mesaj: "During a training shot a cannon barrel burst; several soldiers were wounded.",
          detay: "The crack you overlooked showed itself at the worst possible moment.",
        },
      },
      {
        metin: "Ask for additional tests, delay the approval.",
        basariliSonuc: {
          mesaj: "The additional tests found the flaw; the corrected cannon entered service safely.",
          detay: "You'll never fully know how many lives your patience will save down the line.",
        },
        basarisizSonuc: {
          mesaj: "The delay angered your superiors; the factory complained that you were 'slowing things down'.",
          detay: "Caution is sometimes mistaken for laziness.",
        },
      },
    ],
  },

  sd_asker_casus_teklifi: {
    baslik: "A Foreign Offer",
    metin:
      "An agent of a foreign power promises you a fortune in exchange for the army's movement plans. If you're caught, you'll be shot for treason.",
    secenekler: [
      {
        metin: "Accept the offer, sell the information.",
        basariliSonuc: {
          mesaj: "You handed over the information; in return you gained a fortune that would change your life.",
          detay: "Every night you feel like you hear a footstep at the door.",
        },
        basarisizSonuc: {
          mesaj: "Your espionage came to light; you were shot for treason.",
        },
      },
      {
        metin: "Refuse the offer, report it to your superiors.",
        basariliSonuc: {
          mesaj: "You had the agent caught; your loyalty was praised throughout the army.",
          detay: "Some betrayals turn into honor for you, for having been refused.",
        },
        basarisizSonuc: {
          mesaj: "Your report couldn't be proven; the agent got away, and your superiors eyed you with suspicion.",
          detay: "You did the right thing and still weren't fully trusted.",
        },
      },
    ],
  },
};
