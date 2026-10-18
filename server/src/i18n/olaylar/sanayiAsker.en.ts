import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/sanayiAsker.ts — İngilizce çevirileri. */
export const OLAYLAR_SANAYI_ASKER_EN: Record<string, OlayCeviri> = {
  sd_asker_ayaklanma: {
    baslik: "The Workers' Uprising",
    metin:
      "Workers in the {bolge} factory district built a barricade. Orders say move in; behind it are families asking for bread.",
    secenekler: [
      {
        metin: "Obey the order, break the barricade.",
        basariliSonuc: {
          mesaj: "The barricade fell; command put you on the promotion list.",
          detay:
            "The promotion came; a woman spat in your face.",
        },
        basarisizSonuc: {
          mesaj: "The workers resisted; you were caught in the crowd and beaten.",
          detay:
            "The failure report went out under your name.",
        },
      },
      {
        metin: "Delay, try to mediate.",
        basariliSonuc: {
          mesaj: "The barricade came down without blood; no one died.",
          detay:
            "Workers cheered you; your file noted 'delay'.",
        },
        basarisizSonuc: {
          mesaj: "Talks collapsed; someone else cracked down, blood spilled.",
          detay:
            "You were relieved; the workers don't know your name.",
        },
      },
      {
        metin: "Feign illness, leave your post.",
        basariliSonuc: {
          mesaj: "You went on sick leave; no one pressed it.",
          detay:
            "Hands clean; struck off the promotion list.",
        },
        basarisizSonuc: {
          mesaj: "Your report was found false; 'shirking duty' went on your file.",
          detay:
            "Your file now reads 'unreliable' and 'coward'.",
        },
      },
    ],
  },

  sd_asker_somurge: {
    baslik: "Colonial Duty",
    metin:
      "A revolt broke out in a distant colony. Your regiment is sent: deadly climate, hostile people, but land and rank for survivors.",
    secenekler: [
      {
        metin: "Join the mission wholeheartedly.",
        basariliSonuc: {
          mesaj: "The revolt was crushed; you won a medal, rank and land.",
          detay:
            "Your land is worked by your former enemies.",
        },
        basarisizSonuc: {
          mesaj: "Malaria mowed down the regiment; you were carried aboard on a stretcher.",
          detay:
            "A mosquito, not a bullet, beat you; fevers lingered.",
        },
      },
      {
        metin: "Seek a colonial clerkship.",
        basariliSonuc: {
          mesaj: "You got the clerkship; you watched the war from a window.",
          detay:
            "Your pen displaced more families than a sword.",
        },
        basarisizSonuc: {
          mesaj: "Clerkship denied; you went to the front, branded a deserter.",
          detay:
            "Both in danger and without respect.",
        },
      },
    ],
  },

  sd_asker_yeni_tufek_denemesi: {
    baslik: "The Experimental Rifle",
    metin:
      "The army chose you to test a new rifle prototype. Powerful, but some barrels have burst.",
    secenekler: [
      {
        metin: "Volunteer for the test.",
        basariliSonuc: {
          mesaj: "The rifle worked flawlessly; your report guided the decision.",
          detay: "You're now 'the man who tests new weapons first'.",
        },
        basarisizSonuc: {
          mesaj: "The barrel burst in your hand; fingers hurt, compensation paid.",
          detay: "Logged as a faulty batch; you paid the price.",
        },
      },
      {
        metin: "Refuse, keep the old rifle.",
        basariliSonuc: {
          mesaj: "Your refusal was seen as reasonable; another volunteer stepped in.",
          detay: "You chose safety; no one blamed you.",
        },
        basarisizSonuc: {
          mesaj: "Superiors read your refusal as 'closed to progress'.",
          detay: "Even caution can become an accusation.",
        },
      },
    ],
  },

  sd_asker_muhbir_teklifi: {
    baslik: "A Secret Intelligence Offer",
    metin:
      "An officer offers a secret job: infiltrate the workers' unions and report. Good money, but you'd spy on your friends.",
    secenekler: [
      {
        metin: "Accept, start infiltrating.",
        basariliSonuc: {
          mesaj: "You earned a handsome payment for your information.",
          detay: "You remember the faces of those who trusted you.",
        },
        basarisizSonuc: {
          mesaj: "You were exposed; the workers beat you and drove you out.",
          detay: "You betrayed them and paid anyway.",
        },
      },
      {
        metin: "Refuse the offer.",
        basariliSonuc: {
          mesaj: "A note stays on your file, but your conscience is clear.",
          detay: "Some doors closed; your conscience stayed open.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal read as 'unreliable'; struck off the promotion list.",
          detay: "Honesty sometimes costs a career.",
        },
      },
    ],
  },

  sd_asker_kislada_veba_karantina: {
    baslik: "An Outbreak in the Barracks",
    metin:
      "Soldiers in the barracks show typhoid signs. Command wants quarantine, meaning cancelled leave and crushed morale.",
    secenekler: [
      {
        metin: "Lead the quarantine.",
        basariliSonuc: {
          mesaj: "Quarantine worked; the outbreak stayed in the barracks.",
          detay: "The men grumbled, then thanked you.",
        },
        basarisizSonuc: {
          mesaj: "Despite precautions, you fell ill too.",
          detay: "You enforced it and still caught it.",
        },
      },
      {
        metin: "Keep leave, isolate the sick.",
        basariliSonuc: {
          mesaj: "Morale held and the sickness didn't spread; you were lucky.",
          detay: "You took the risk and it paid off.",
        },
        basarisizSonuc: {
          mesaj: "It spread; a third of the barracks fell ill, you included.",
          detay: "Your gamble for morale cost health.",
        },
      },
    ],
  },

  sd_asker_fabrika_koruma_gorevi: {
    baslik: "Factory Watch",
    metin:
      "A factory owner offers private pay to guard his plant from striking workers. Your superiors look the other way.",
    secenekler: [
      {
        metin: "Accept, guard the factory.",
        basariliSonuc: {
          mesaj: "The factory was guarded; the owner paid generously.",
          detay: "People stare at you in the worker district now.",
        },
        basarisizSonuc: {
          mesaj: "You were hurt in a scuffle with workers; you still got paid.",
          detay: "Money in your pocket, the cost in your body.",
        },
      },
      {
        metin: "Refuse, stick to official duty.",
        basariliSonuc: {
          mesaj: "You stayed neutral; neither workers nor boss is angry.",
          detay: "You gave up extra pay; your name is intact.",
        },
        basarisizSonuc: {
          mesaj: "The owner took offense; no more priority on supply contracts.",
          detay: "Even neutrality offends someone.",
        },
      },
    ],
  },

  sd_asker_madalya_sahtekarligi: {
    baslik: "False Heroism",
    metin:
      "You could claim 'heroism' in a battle you missed and apply for a medal; the records are muddled.",
    secenekler: [
      {
        metin: "File the false application.",
        basariliSonuc: {
          mesaj: "The medal was granted; no one questioned your story.",
          detay: "Only you know you didn't earn it.",
        },
        basarisizSonuc: {
          mesaj: "A soldier who was there called you a liar; the fraud spread.",
          detay: "You earned the opposite of the reputation you sought.",
        },
      },
      {
        metin: "Don't apply, rest on real service.",
        basariliSonuc: {
          mesaj: "You carried on with ordinary service; no one questioned you.",
          detay: "Even without a medal, you're proud.",
        },
        basarisizSonuc: {
          mesaj: "Others won medals with false claims while you got nothing.",
          detay: "Honesty goes unrewarded, but it didn't change you.",
        },
      },
    ],
  },

  "sd_asker_telgraf_hattı_sabotaji": {
    baslik: "The Cut Telegraph Line",
    metin:
      "The front-to-HQ telegraph line was sabotaged. You're asked to join the repair crew; the line runs near the enemy.",
    secenekler: [
      {
        metin: "Use your foster child as scout, repair safely.",
        basariliSonuc: {
          mesaj:
            "Your foster child knew the ground; you repaired it without an ambush.",
          detay: "Your orphanage investment saved your life.",
        },
        basarisizSonuc: {
          mesaj: "Not used.",
        },
      },
      {
        metin: "Join the repair crew.",
        basariliSonuc: {
          mesaj: "You fixed the line under fire; contact was restored.",
          detay: "They said the repair changed the war's course.",
        },
        basarisizSonuc: {
          mesaj: "Sniper fire caught you during the repair.",
          detay: "The line was fixed; two friends were wounded.",
        },
      },
      {
        metin: "Ride as courier, carry the message.",
        basariliSonuc: {
          mesaj: "You delivered the message on horseback, clear of the enemy.",
          detay: "Exhausted, but the mission is done.",
        },
        basarisizSonuc: {
          mesaj: "Your horse stumbled, the message came late; a chance was lost.",
          detay: "You did your best; it wasn't enough.",
        },
      },
    ],
  },

  sd_asker_kislada_kumarhane: {
    baslik: "The Secret Gambling Den",
    metin:
      "A secret gambling table runs in a back room of the barracks. Winners get real money; getting caught means discipline.",
    secenekler: [
      {
        metin: "Sit down, try your luck.",
        basariliSonuc: {
          mesaj: "A lucky night; you left with full pockets.",
          detay: "Others eyed you warily: 'never playing again'.",
        },
        basarisizSonuc: {
          mesaj: "A bad night; most of your pay stayed on the table.",
          detay: "You wonder how to last till month's end.",
        },
      },
      {
        metin: "Stay away, keep discipline.",
        basariliSonuc: {
          mesaj: "You skipped the gambling; money and name are intact.",
          detay: "They call you 'boring'; you're fine with it.",
        },
        basarisizSonuc: {
          mesaj: "They teased you as 'arrogant' for not joining.",
          detay: "Right choices sometimes draw mockery.",
        },
      },
    ],
  },

  sd_asker_gazeteci_roportaji: {
    baslik: "The War Correspondent",
    metin:
      "A newspaper correspondent wants the real front-line conditions from you. Your words will either praise the army or spark a scandal.",
    secenekler: [
      {
        metin: "Tell the truth as it is.",
        basariliSonuc: {
          mesaj: "Your interview caused a stir; you became known for honesty.",
          detay:
            "Soldiers' conditions were aired; some things improved.",
        },
        basarisizSonuc: {
          mesaj: "Superiors called it 'demoralizing' and punished you.",
          detay: "Truth had a price, but the public backed you.",
        },
      },
      {
        metin: "Paint a rosy picture of the army.",
        basariliSonuc: {
          mesaj: "Superiors were pleased; you got a small reward.",
          detay: "Not quite the truth, but no one questioned it.",
        },
        basarisizSonuc: {
          mesaj: "Soldiers at the front read your gloss and lost trust in you.",
          detay: "You pleased superiors and let comrades down.",
        },
      },
    ],
  },

  sd_asker_yeni_silah_denemesi: {
    baslik: "The Experimental Weapon",
    metin:
      "Your commander wants to field-test an untested rapid-fire weapon on you. Its fate rides on your performance.",
    secenekler: [
      {
        metin: "Accept, use the weapon in the field.",
        basariliSonuc: {
          mesaj: "The weapon proved remarkably effective; command talked of you.",
          detay: "Some risks put you in history.",
        },
        basarisizSonuc: {
          mesaj: "The weapon recoiled; you were badly hurt.",
          detay: "Experiments carry a price.",
        },
      },
      {
        metin: "Refuse, keep your old weapon.",
        basariliSonuc: {
          mesaj: "You refused; the commander frowned, but you're unhurt.",
          detay: "Some safeguards outweigh reputation.",
        },
        basarisizSonuc: {
          mesaj: "Logged as 'cowardice'; you slipped on the promotion list.",
          detay: "Not every caution is read alike.",
        },
      },
    ],
  },

  sd_asker_grev_kirici_gorevi: {
    baslik: "On the Strike Line",
    metin:
      "You're ordered to disperse strikers outside the factory. Childhood friends are among them; the order is firm, the square tense.",
    secenekler: [
      {
        metin: "Enforce the order harshly, crush the strike.",
        basariliSonuc: {
          mesaj:
            "You broke the strike; rewarded, but your district turned its back.",
          detay: "Some duties estrange you from your own people.",
        },
        basarisizSonuc: {
          mesaj: "It turned into a clash; you left wounded.",
          detay: "Harshness is sometimes met with harshness.",
        },
      },
      {
        metin: "Slow the move, calm the tension.",
        basariliSonuc: {
          mesaj:
            "They left without bloodshed; your district still calls you 'ours'.",
          detay: "Some victories are bloodless.",
        },
        basarisizSonuc: {
          mesaj: "Slowing down was called 'neglect of duty'; you were penalized.",
          detay: "Mercy sometimes has an official price.",
        },
      },
    ],
  },

  sd_asker_somurge_vicdan: {
    baslik: "A Test of Conscience in the Colony",
    metin:
      "In the colony, a local family's land is being seized unjustly. Superiors call it 'order'; your conscience won't be quiet.",
    secenekler: [
      {
        metin: "Defend the family, protest to superiors.",
        basariliSonuc: {
          mesaj: "Your protest drew notice; the family regained part of its land.",
          detay: "Some voices work better than expected.",
        },
        basarisizSonuc: {
          mesaj: "Your protest was ignored and you were flagged 'undisciplined'.",
          detay: "You sometimes pay for conscience with your career.",
        },
      },
      {
        metin: "Stay silent, follow orders.",
        basariliSonuc: {
          mesaj:
            "Your career advanced; the family's despair still haunts you.",
          detay: "Some silences gnaw for years.",
        },
        basarisizSonuc: {
          mesaj: "Your silence will return as another test of conscience.",
          detay: "Reckonings you flee keep following.",
        },
      },
    ],
  },

  sd_asker_savas_muhabiri_gomulu: {
    baslik: "The Embedded Correspondent",
    metin:
      "A newspaper correspondent is embedded with your battalion, noting every move. How open you are is up to you.",
    secenekler: [
      {
        metin: "Give full access, speak candidly.",
        basariliSonuc: {
          mesaj: "His writing reached wide audiences; your name was praised.",
          detay:
            "Thousands saw the war through your eyes.",
        },
        basarisizSonuc: {
          mesaj: "He twisted your words; the piece troubled your superiors.",
          detay: "Candor means losing control of your words.",
        },
      },
      {
        metin: "Keep distance, give official facts only.",
        basariliSonuc: {
          mesaj: "He wrote a dry report; no one praised or blamed.",
          detay: "You stayed safe, but someone else was the hero.",
        },
        basarisizSonuc: {
          mesaj: "He read your distance as 'hiding something' and wrote so.",
          detay: "Silence can raise more questions than speech.",
        },
      },
    ],
  },

  sd_asker_divani_harp: {
    baslik: "The Court-Martial",
    metin:
      "You sit on a tribunal judging a private who left the front unordered. Fear or tactics, unclear; your verdict decides a life.",
    secenekler: [
      {
        metin: "Hand down a harsh sentence, set an example.",
        basariliSonuc: {
          mesaj: "Discipline was restored; command praised you.",
          detay: "You wonder what will be written to his family.",
        },
        basarisizSonuc: {
          mesaj: "The verdict caused an uproar; soldiers found you merciless.",
          detay: "Harshness made you neither respected nor at ease.",
        },
      },
      {
        metin: "Give a light sentence, weigh the reasons.",
        basariliSonuc: {
          mesaj: "The verdict was just; the private earned his second chance.",
          detay: "Justice takes courage; this time it paid.",
        },
        basarisizSonuc: {
          mesaj: "Superiors called it 'softness' and penalized you.",
          detay: "Your mercy left a stain on your record.",
        },
      },
    ],
  },

  sd_asker_hastane_reformu: {
    baslik: "The Field Hospital Reform",
    metin:
      "The field hospital has filthy bandages, thin staff, high death rates. Nurses want reform; the brass calls it 'needless expense'.",
    secenekler: [
      {
        metin: "Back the reform, chip in your own money.",
        basariliSonuc: {
          mesaj: "The reform went through; the death rate dropped sharply.",
          detay: "Your own money saved many soldiers.",
        },
        basarisizSonuc: {
          mesaj: "Funds ran short, reform stalled; the nurses quit.",
          detay: "Good will alone doesn't make bandages.",
        },
      },
      {
        metin: "Keep the old way, funds to the war.",
        basariliSonuc: {
          mesaj: "Funds went to war; hospital deaths stayed statistics.",
          detay: "You know the names behind the numbers.",
        },
        basarisizSonuc: {
          mesaj: "Filth became an outbreak; you fell ill too.",
          detay: "Every coin saved came back elsewhere.",
        },
      },
    ],
  },

  sd_asker_maas_isyani: {
    baslik: "Unpaid Wages",
    metin:
      "Pay has been missing for months; mutiny whispers circle the barracks. Be their voice or show loyalty to your superiors.",
    secenekler: [
      {
        metin: "Carry the demand up, be their voice.",
        basariliSonuc: {
          mesaj:
            "Wages were partly paid; you advanced some men money yourself.",
          detay: "Speaking up cost you, but the men trust you.",
        },
        basarisizSonuc: {
          mesaj: "Your demand was called 'incitement'; a penalty was docked.",
          detay: "A rightful voice came out of your pocket.",
        },
      },
      {
        metin: "Stay silent, urge obedience.",
        basariliSonuc: {
          mesaj:
            "Superiors were pleased; the men saw you as 'not theirs'.",
          detay: "Silence brought a reward, and loneliness.",
        },
        basarisizSonuc: {
          mesaj: "Whispers became mutiny; you were hurt in the chaos.",
          detay: "Silence didn't stop the storm.",
        },
      },
    ],
  },

  sd_asker_silah_kacakciligi: {
    baslik: "The Black Market Arms Offer",
    metin:
      "A trader proposes selling rifles 'lost' from the armory to rebels for a cut. Big money; but they may turn on your comrades.",
    secenekler: [
      {
        metin: "Accept, smuggle the weapons.",
        basariliSonuc: {
          mesaj: "The weapons were delivered; your pockets filled overnight.",
          detay: "You'll never know who those guns shot.",
        },
        basarisizSonuc: {
          mesaj:
            "Caught smuggling; you faced interrogation and execution threats.",
          detay: "The scent of money came with the scent of death.",
        },
      },
      {
        metin: "Refuse, report to superiors.",
        basariliSonuc: {
          mesaj: "Your report broke the ring; the trader was arrested.",
          detay: "Some chances gain worth by being refused.",
        },
        basarisizSonuc: {
          mesaj: "Unproven; the trader slandered you and damaged your name.",
          detay: "You did right and still got blamed.",
        },
      },
    ],
  },

  sd_asker_top_atisi_hatasi: {
    baslik: "A Fatal Mistake",
    metin:
      "An officer's bad artillery coordinates hit your own position; soldiers died. He wants you to alter the report and stay quiet.",
    secenekler: [
      {
        metin: "Report the truth, expose the error.",
        basariliSonuc: {
          mesaj:
            "The truth was reported; the families learned what happened.",
          detay: "Some officers shunned you; your conscience is clear.",
        },
        basarisizSonuc: {
          mesaj: "Dismissed as 'unproven accusation'; the officer's friends shut you out.",
          detay: "Telling truth doesn't mean truth wins.",
        },
      },
      {
        metin: "Stay silent, alter the report together.",
        basariliSonuc: {
          mesaj: "You kept quiet; he was grateful, your name made the list.",
          detay: "At the promotion, you remembered the dead by name.",
        },
        basarisizSonuc: {
          mesaj: "Another witness exposed it; you were accused of falsifying.",
          detay: "The hidden truth burst and dragged you in.",
        },
      },
    ],
  },

  sd_asker_gazi_emekli_maasi: {
    baslik: "The Fight Over a Veteran's Pension",
    metin:
      "A comrade who lost an arm has his pension lost in bureaucracy. Pushing his file ahead would delay another veteran in line.",
    secenekler: [
      {
        metin: "Push your comrade's file ahead.",
        basariliSonuc: {
          mesaj: "Your comrade got his pension; his gratitude never faded.",
          detay: "You repaid a debt, and learned who lost his place.",
        },
        basarisizSonuc: {
          mesaj: "Turned down as an 'irregular request'; he's still waiting.",
          detay: "Good will lost to paperwork.",
        },
      },
      {
        metin: "Follow the queue, wait fairly.",
        basariliSonuc: {
          mesaj: "You were fair; he waited months, but the system held for all.",
          detay: "Doing right can mean hurting someone you love.",
        },
        basarisizSonuc: {
          mesaj: "He never forgot your silence when he needed help.",
          detay: "You kept faith with fairness and lost a friend.",
        },
      },
    ],
  },

  sd_asker_topcu_denemesi: {
    baslik: "The New Cannon Trial",
    metin:
      "A factory counts on your favorable report to get its new cannon approved. Powerful, but trials showed barrel cracks.",
    secenekler: [
      {
        metin: "Report favorably, back quick approval.",
        basariliSonuc: {
          mesaj: "The cannon was approved fast; the factory paid generously.",
          detay: "You left out the cracks; that will cost.",
        },
        basarisizSonuc: {
          mesaj: "A barrel burst in a training shot; several soldiers were hurt.",
          detay: "The ignored crack showed at the worst moment.",
        },
      },
      {
        metin: "Demand more tests, delay approval.",
        basariliSonuc: {
          mesaj: "More tests found the flaw; the fixed cannon entered service safely.",
          detay: "You'll never know how many lives your patience saved.",
        },
        basarisizSonuc: {
          mesaj: "The delay angered superiors; the factory complained of you.",
          detay: "Caution is sometimes mistaken for laziness.",
        },
      },
    ],
  },

  sd_asker_casus_teklifi: {
    baslik: "A Foreign Offer",
    metin:
      "A foreign agent offers a fortune for the army's movement plans. If caught, you'll be shot for treason.",
    secenekler: [
      {
        metin: "Accept, sell the information.",
        basariliSonuc: {
          mesaj: "You sold it; a life-changing fortune was yours.",
          detay: "Every night you hear footsteps at the door.",
        },
        basarisizSonuc: {
          mesaj: "Your spying was exposed; you were shot for treason.",
        },
      },
      {
        metin: "Refuse, report to superiors.",
        basariliSonuc: {
          mesaj: "The agent was caught; your loyalty was praised army-wide.",
          detay: "Some betrayals refused become honor.",
        },
        basarisizSonuc: {
          mesaj: "Unproven; the agent fled, and superiors eyed you with suspicion.",
          detay: "You did right and still weren't fully trusted.",
        },
      },
    ],
  },
};
