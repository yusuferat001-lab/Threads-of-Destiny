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
};
