import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/ortaCagAskerYollari.ts — İngilizce çevirileri (105 olay). */
export const OLAYLAR_ORTACAG_ASKER_YOLLARI_EN: Record<string, OlayCeviri> = {
  oc_asker_yol_ilk_emir: {
    baslik: "The First Order",
    metin:
      "Your corporal orders you to have a few youths forcibly conscripted from the village whipped on the pretext of 'insubordination' — though their only crime is being late. This is the first moment of your military life that truly tests you; how you react will shape the years ahead.",
    secenekler: [
      {
        metin: "Carry out the order to the letter, don't question it.",
        ipucu: "You become trustworthy in your superiors' eyes, your conscience pays a small price",
        basariliSonuc: {
          mesaj: "You carried out the order without hesitation; your corporal is pleased, and the youths never looked at you the same way again.",
          detay: "Some soldiers obey without thinking; you'll decide in time whether that's a virtue or a flaw.",
        },
        basarisizSonuc: {
          mesaj: "Your hand grew heavy, the whip came down harder than needed; even your corporal was uneasy with you.",
          detay: "Obedience can sometimes go too far.",
        },
      },
      {
        metin: "Object, refuse to carry out the order together with the other soldiers.",
        ipucu: "Saying no to injustice, it goes into your disciplinary file",
        basariliSonuc: {
          mesaj: "Your words emboldened the other soldiers too; your corporal backed down but wrote you into his notebook.",
          detay: "Saying no to injustice sometimes means striking a spark.",
        },
        basarisizSonuc: {
          mesaj: "Your objection went unheard, and you were beaten for it too; still, you know you said something to save the youths.",
          detay: "Some resistances are lost but not forgotten.",
        },
      },
      {
        metin: "Take the punishment on yourself to protect the youths.",
        ipucu: "Sacrifice can bring great fame, your back may hurt",
        basariliSonuc: {
          mesaj: "You took the punishment on your own back; the whip came down on you but the youths were let go. Your name spread fast through the barracks.",
          detay: "Some men become leaders by throwing themselves forward.",
        },
        basarisizSonuc: {
          mesaj: "Your sacrifice didn't soften the corporal; both you and the youths were punished.",
          detay: "Courage isn't always rewarded.",
        },
      },
      {
        metin: "Watch silently, assess the situation without being seen.",
        ipucu: "You stay neutral but you start learning who does what in the barracks",
        basariliSonuc: {
          mesaj: "You neither questioned the order nor objected; you just watched. You started learning very well who does what in this barracks.",
          detay: "Sometimes the most dangerous person is the one who takes no side.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was noticed; you started being called 'someone whose thoughts you can't read'.",
          detay: "Neutrality sometimes draws suspicion.",
        },
      },
    ],
  },

  oc_asker_yol_sadakat_sinavi: {
    baslik: "A Test of Loyalty",
    metin:
      "The commander gives you a personal task: to cover up a senior officer's corruption you have to sign a false report. Refusing means falling from your commander's favor; signing means surrendering one more piece of your conscience.",
    secenekler: [
      {
        metin: "Sign it, stay loyal to your commander to the end.",
        ipucu: "You gain trust and promotion, your conscience shrinks",
        basariliSonuc: {
          mesaj: "You signed it; your commander now trusts you blindly. You're a truly loyal soldier of this army now.",
          detay: "Obedience became your identity — without question, always.",
        },
        basarisizSonuc: {
          mesaj: "The report got caught in review and your name was dragged in; still, your commander protected you.",
          detay: "Your loyalty sometimes puts you at risk too.",
        },
      },
      {
        metin: "Refuse but stay silent, show your loyalty another way.",
        ipucu: "Your conscience eases, your commander may turn cold",
        basariliSonuc: {
          mesaj: "You didn't sign but you told no one either; your commander read it as a silent loyalty.",
          detay: "Being loyal doesn't always mean blind obedience.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered your commander; still, he didn't dismiss you, just treated you coldly for a long time.",
          detay: "You kept your conscience, and it had a price.",
        },
      },
    ],
  },

  oc_asker_yol_gizli_toplanti: {
    baslik: "A Secret Meeting",
    metin:
      "At midnight a soldier you trust calls you behind the stables: a group of soldiers tired of the commanders' arbitrary punishments has secretly organized and wants you to join them. Even if you don't join, knowing this secret puts you in danger.",
    secenekler: [
      {
        metin: "Join, become part of the mutiny.",
        ipucu: "You're not alone anymore but there's no going back",
        basariliSonuc: {
          mesaj: "You took the oath; you're part of this secret brotherhood now. You're not alone against injustice, but there's no turning back now either.",
          detay: "Once a mutiny begins, it carries you to the end.",
        },
        basarisizSonuc: {
          mesaj: "During the meeting a sentry nearly caught you; you scattered in panic but you'll have to be more careful now.",
          detay: "The first step is always the most dangerous.",
        },
      },
      {
        metin: "Report it, tell the commander about the situation.",
        ipucu: "You rise in your superiors' eyes, you get branded an 'informer'",
        basariliSonuc: {
          mesaj: "The commander rewarded your report; but there are people in the barracks who call you 'informer' now.",
          detay: "Loyalty has a price, you're learning that now.",
        },
        basarisizSonuc: {
          mesaj: "Your report wasn't taken seriously but it leaked; both the mutineers and the commander distrust you now.",
          detay: "Sometimes even your honesty gets no return.",
        },
      },
    ],
  },

  oc_asker_yol_cesaretin_bedeli: {
    baslik: "The Price of Courage",
    metin:
      "In a small clash your unit was ambushed; your commander is dead, the command vacuum is turning into panic. You have to do something — either throw yourself forward and take the risk, or look for a calculated, safe way out.",
    secenekler: [
      {
        metin: "Break the enemy line alone, try to save the unit.",
        ipucu: "If you succeed you become a legend, if you fail you could be taken prisoner",
        basariliSonuc: {
          mesaj: "With a wild move you broke the enemy line; your unit was saved thanks to you. Your name is turning into a legend in the barracks now.",
          detay: "Some moments turn a soldier into a hero — you lived that moment.",
        },
        basarisizSonuc: {
          mesaj: "Your move didn't work; an enemy patrol found you unconscious. When you opened your eyes you were in a prison camp.",
          detay: "Courage sometimes robs you of your freedom.",
        },
      },
      {
        metin: "Pull the unit back in a calculated way, reduce the losses.",
        ipucu: "Safer, a smaller share of fame",
        basariliSonuc: {
          mesaj: "Your composure saved the unit; no one died and everyone owes you. Heroism isn't always being reckless.",
          detay: "Calculated courage is courage too.",
        },
        basarisizSonuc: {
          mesaj: "During the retreat you lost a few men but the panic didn't grow; still, your conscience isn't at ease.",
          detay: "Even the best decisions sometimes aren't enough.",
        },
      },
    ],
  },

  oc_asker_yol_dusmanla_temas: {
    baslik: "Contact With the Enemy",
    metin:
      "During a night watch, someone from the enemy side emerges from the shadows and approaches you. In exchange for the garrison's defense plans he offers enough gold to live comfortably your whole life and a safe refuge when the war ends.",
    secenekler: [
      {
        metin: "Accept the offer, sell the information.",
        ipucu: "A great fortune, a heavy burden on the conscience",
        basariliSonuc: {
          mesaj: "You gave the information, the gold is in your purse; you live between two worlds now. Your conscience will never look at you the same way again.",
          detay: "Some decisions can't be taken back; this is one of them.",
        },
        basarisizSonuc: {
          mesaj: "The deal leaked, and you were interrogated too; the money came but now you fear every shadow.",
          detay: "The price of betrayal goes on being paid even after you've paid it.",
        },
      },
      {
        metin: "Refuse, try to catch the man.",
        ipucu: "You prove your loyalty, the man could get away",
        basariliSonuc: {
          mesaj: "You caught the man; your commander rewarded you. No one will know how close you came to being seduced.",
          detay: "Some tests are passed quietly.",
        },
        basarisizSonuc: {
          mesaj: "The man got away, and you were beaten on top of it; at least your conscience is at ease.",
          detay: "Doing the right thing isn't always easy.",
        },
      },
    ],
  },

  oc_asker_sadik_01: {
    baslik: "The Night Watch",
    metin:
      "You haven't slept for two days, but your name is on the watch roster. Your superior {amir} forbade you from handing your watch to someone else on the excuse of illness; rules are rules.",
    secenekler: [
      {
        metin: "Take the watch without questioning the order.",
        ipucu: "Duty despite an exhausted body, but your focus weakens",
        basariliSonuc: {
          mesaj: "You forced your eyes to stay open until morning; no one suspected you.",
          detay: "The next day {amir} quietly touched your shoulder, and even that was enough for you.",
        },
        basarisizSonuc: {
          mesaj: "Near dawn you fell asleep standing; a patrol found you like that.",
          detay: "You weren't punished but the shame weighed heavier than a whip.",
        },
      },
      {
        metin: "Secretly swap the watch with a comrade.",
        ipucu: "A chance to rest, a risk of disobeying the order",
        basariliSonuc: {
          mesaj: "No one noticed, you rested.",
          detay: "But you know you broke the order; next time you may not be so lucky.",
        },
        basarisizSonuc: {
          mesaj: "Your superior learned of the swap; he scolded you both in the square.",
          detay: "Your word doesn't carry as much weight anymore.",
        },
      },
    ],
  },

  oc_asker_sadik_02: {
    baslik: "An Innocent Arrest",
    metin:
      "Your superior ordered you to arrest an old carpenter who couldn't pay his tax debt. In the man's eyes there's no crime, only helplessness; but an order is an order.",
    secenekler: [
      {
        metin: "Carry out the order to the letter, hand the man over.",
        ipucu: "You complete your duty, your conscience aches",
        basariliSonuc: {
          mesaj: "You chained the carpenter and handed him to the garrison.",
          detay: "Your superior praised you; you couldn't forget the man's face at night.",
        },
        basarisizSonuc: {
          mesaj: "The man tried to run, in the confusion you got tangled and lost him.",
          detay: "You lost a little of your superior's trust.",
        },
      },
      {
        metin: "Pay the debt from your own pocket, try to have the arrest postponed.",
        ipucu: "Your conscience eases, your pocket and your obedience take a hit",
        basariliSonuc: {
          mesaj: "You cleared the debt, the man was released.",
          detay: "You know your superior wouldn't be happy if he found out, but you slept easy that night.",
        },
        basarisizSonuc: {
          mesaj: "You paid your money but the creditor wouldn't accept it, and they took the man anyway.",
          detay: "Your pocket emptied and nothing changed.",
        },
      },
      {
        metin: "Carry out the order but write a report and flag the situation.",
        ipucu: "Trusting the system makes the outcome uncertain",
        basariliSonuc: {
          mesaj: "Your report reached your superior's superior, and the man's sentence was lightened.",
          detay: "You saw you could change something by staying within the rules.",
        },
        basarisizSonuc: {
          mesaj: "Your report was thrown aside unread, the man served his sentence.",
          detay: "You tried the right way, the system didn't hear you.",
        },
      },
    ],
  },

  oc_asker_sadik_03: {
    baslik: "A Bribe at the Gate",
    metin:
      "On watch at the city gate a merchant secretly held out a purse of gold in exchange for a load not entered in the customs record. No one saw, no one will know — maybe.",
    secenekler: [
      {
        metin: "Refuse the bribe, report the merchant.",
        ipucu: "Your honor stays clean, you draw the merchant's anger onto yourself",
        basariliSonuc: {
          mesaj: "You had the merchant caught, your superior held up your honesty as an example.",
          detay: "But the merchant's men know your face now.",
        },
        basarisizSonuc: {
          mesaj: "The merchant got away, all you were left with was an empty purse.",
          detay: "No one blamed you but something felt missing inside, as if a reward had slipped away.",
        },
      },
      {
        metin: "Take the gold, ignore the load.",
        ipucu: "Easy money, a heavy price if caught",
        basariliSonuc: {
          mesaj: "The purse went into your pocket, the load entered the city quietly.",
          detay: "Before you slept that night you told yourself 'just this once'.",
        },
        basarisizSonuc: {
          mesaj: "Another sentry saw you, you had to answer for it before your superior.",
          detay: "You had to beg not to lose your rank.",
        },
      },
    ],
  },

  oc_asker_sadik_04: {
    baslik: "An Order to an Old Friend",
    metin:
      "You rose to the rank of man-at-arms and your first job was to send your childhood friend, still a private, to a harsh corvée. You saw the disappointment in his eyes before he turned his back.",
    secenekler: [
      {
        metin: "Give the order unchanged, show no favoritism.",
        ipucu: "Justice is kept, the friendship is damaged",
        basariliSonuc: {
          mesaj: "You gave the order, {dost} accepted it in silence.",
          detay: "You know you were fair but he doesn't laugh with you the way he used to.",
        },
        basarisizSonuc: {
          mesaj: "{dost} openly rebelled, accused you of favoritism in front of everyone — though you'd shown none.",
          detay: "You paid the price of doing the right thing alone.",
        },
      },
      {
        metin: "Lighten the duty, but let no one see it.",
        ipucu: "You protect the friendship, if discovered your reputation is shaken",
        basariliSonuc: {
          mesaj: "No one noticed, {dost} stayed grateful to you.",
          detay: "Deep down, you know you crossed the line with your very first order.",
        },
        basarisizSonuc: {
          mesaj: "The other soldiers noticed the inequality, your superior warned you.",
          detay: "Your rank is new, your trust newer — both were shaken.",
        },
      },
    ],
  },

  oc_asker_sadik_05: {
    baslik: "A Summons on the Wedding Night",
    metin:
      "Your wedding preparations were finished when an urgent call came from the border post; every sentry must return to duty. {es} is trying to hold back tears, the guests wait at the door.",
    secenekler: [
      {
        metin: "Leave the ceremony at once, rush to duty.",
        ipucu: "Duty comes first, your heart stays behind",
        basariliSonuc: {
          mesaj: "You leapt on your horse and reached the post; your superior never forgot your loyalty.",
          detay: "{es} forgave you, but there's always a memory missing, like a wedding portrait.",
        },
        basarisizSonuc: {
          mesaj: "You got caught in a storm halfway, reached the post late.",
          detay: "Your intent wasn't enough, only the effort counted.",
        },
      },
      {
        metin: "Finish the ceremony, set off at first light.",
        ipucu: "Your heart wins, a stain goes on your disciplinary record",
        basariliSonuc: {
          mesaj: "You completed your wedding, {es} never let go of your hand.",
          detay: "When you reached the garrison you answered for the delay, but you weren't sorry.",
        },
        basarisizSonuc: {
          mesaj: "Because you were late your superior scolded you in front of everyone.",
          detay: "Your happiness lasted one night, its stain much longer.",
        },
      },
    ],
  },

  oc_asker_sadik_06: {
    baslik: "The Shaky-Handed Recruit",
    metin:
      "A newly joined private can't even hold his sword right, and the others mock him. No one gave you an order, but training him is in your hands now.",
    secenekler: [
      {
        metin: "Set aside extra time in the evenings and train him.",
        ipucu: "It takes time and patience, the return is loyalty",
        basariliSonuc: {
          mesaj: "The young private came together quickly, and stayed grateful to you.",
          detay: "If one day you see him training someone too, you'll know this effort wasn't wasted.",
        },
        basarisizSonuc: {
          mesaj: "Your effort wasn't enough, the boy is still clumsy; some thought you'd wasted your time.",
          detay: "Still, you didn't give up trying.",
        },
      },
      {
        metin: "Leave him be, let discipline change him.",
        ipucu: "Little effort, but the boy is left alone",
        basariliSonuc: {
          mesaj: "The boy toughened up and learned on his own.",
          detay: "But he trusts no one now, not even you.",
        },
        basarisizSonuc: {
          mesaj: "The young private was badly hurt in a drill; maybe a little attention would have helped.",
          detay: "His pain left a share on your conscience too.",
        },
      },
      {
        metin: "Report the situation to the official trainer, don't spend your own time.",
        ipucu: "You share the responsibility, you don't form a personal bond with the boy",
        basariliSonuc: {
          mesaj: "The trainer took over, the boy came together in time.",
          detay: "You did your duty but no bond was ever formed between you.",
        },
        basarisizSonuc: {
          mesaj: "The trainer took little interest, the boy was left alone, and you never grew close.",
          detay: "Leaving responsibility to someone else sometimes does no one any good.",
        },
      },
    ],
  },

  oc_asker_sadik_07: {
    baslik: "An Unjust Punishment",
    metin:
      "Your superior punished you in front of everyone for a mistake you didn't make. The real culprit is another soldier, one of the superior's favorites. You have the right to object but it will have a price.",
    secenekler: [
      {
        metin: "Take your punishment in silence, show your obedience.",
        ipucu: "Your reputation is protected, the injustice stands",
        basariliSonuc: {
          mesaj: "You took your punishment without a word; your superior mistook your silence for discipline.",
          detay: "But you didn't forget the injustice, you only learned to swallow it.",
        },
        basarisizSonuc: {
          mesaj: "The anger inside you gave you away, the expression on your face during the punishment was noticed.",
          detay: "You obeyed, but your reluctance was recorded.",
        },
      },
      {
        metin: "Quietly tell your superior's superior about the situation.",
        ipucu: "Justice is possible, but the risk of skipping the chain of command is great",
        basariliSonuc: {
          mesaj: "The senior officer found the real culprit, your name was cleared.",
          detay: "But your superior will never see you the same way again.",
        },
        basarisizSonuc: {
          mesaj: "Your complaint backfired, you got called 'a soldier who skips the chain of command'.",
          detay: "Being right sometimes isn't enough.",
        },
      },
    ],
  },

  oc_asker_sadik_08: {
    baslik: "The Commander's Instinct",
    metin:
      "{amir} gave a strange order: the unit will spend the night in the swamp, though a safe hill stands right nearby. Trust the order, or trust your own head?",
    secenekler: [
      {
        metin: "Carry out the order without questioning.",
        ipucu: "Obedience could reward you or lead you the wrong way",
        basariliSonuc: {
          mesaj: "In the morning it turned out the hill was an ambush; {amir}'s instinct saved your lives.",
          detay: "You never forgot how valuable your obedience was that time.",
        },
        basarisizSonuc: {
          mesaj: "The night in the swamp brought sickness, there was no danger on the hill at all.",
          detay: "Sometimes obedience just means sharing in the bad luck.",
        },
      },
      {
        metin: "Voice your reservations to your superior gently.",
        ipucu: "You make yourself heard, a risk of being branded distrustful",
        basariliSonuc: {
          mesaj: "{amir} listened to you, changed the plan a little, you were both proven right.",
          detay: "You learned that making yourself heard isn't insubordination.",
        },
        basarisizSonuc: {
          mesaj: "{amir} cut you off and scolded you, carried out his order unchanged.",
          detay: "This time you learned it would have been wiser to stay silent.",
        },
      },
    ],
  },

  oc_asker_sadik_09: {
    baslik: "The Burden of the Model Soldier",
    metin:
      "As a man-at-arms your name is held up as an example at every drill. While this raises you in your superiors' eyes, you notice some of your comrades in the barracks are isolating you.",
    secenekler: [
      {
        metin: "Accept the praise quietly, focus on your work.",
        ipucu: "Your career grows, so does your loneliness",
        basariliSonuc: {
          mesaj: "Your superiors appreciated you more; but fewer people sat next to you at the evening table.",
          detay: "Being respected and being liked aren't the same, you learned.",
        },
        basarisizSonuc: {
          mesaj: "The jealousy turned to gossip, a few comrades openly shunned you.",
          detay: "You felt that even flawlessness has a price.",
        },
      },
      {
        metin: "Share your successes with your comrades, put them forward too.",
        ipucu: "Your bonds strengthen, your personal star dims a little",
        basariliSonuc: {
          mesaj: "Your comrades appreciated you, the coldness between you dispersed.",
          detay: "Instead of rising alone you chose to walk together.",
        },
        basarisizSonuc: {
          mesaj: "They mistook your humility for weakness, your standing was shaken a bit.",
          detay: "Good intentions aren't always read right.",
        },
      },
      {
        metin: "Ignore the jealousy, go your own way.",
        ipucu: "You don't face the problem, the tension quietly grows",
        basariliSonuc: {
          mesaj: "You didn't care about the jealousy, it died down in time.",
          detay: "You learned you don't have to please everyone.",
        },
        basarisizSonuc: {
          mesaj: "The tension you ignored turned into an open fight during a drill.",
          detay: "Some problems don't pass on their own.",
        },
      },
    ],
  },

  oc_asker_sadik_10: {
    baslik: "A Half-Healed Wound",
    metin:
      "The wound you took in a drill hadn't fully healed when the unit was called on campaign again. The physician says rest, your superior won't give you up.",
    secenekler: [
      {
        metin: "Join the campaign despite your wound.",
        ipucu: "You prove your obedience, you put your body at risk",
        basariliSonuc: {
          mesaj: "You gritted your teeth and joined the campaign, no one saw your weakness.",
          detay: "Your superior was proud of you; you were just trying to stay on your feet.",
        },
        basarisizSonuc: {
          mesaj: "Your wound reopened during the campaign, they carried you back on a stretcher.",
          detay: "You paid the price of your stubbornness with your body.",
        },
      },
      {
        metin: "Listen to the physician, ask for leave.",
        ipucu: "Your body heals, your obedient image takes a small shadow",
        basariliSonuc: {
          mesaj: "Leave was granted, you fully recovered.",
          detay: "Your superior showed understanding but you noticed the slight disappointment in his eyes.",
        },
        basarisizSonuc: {
          mesaj: "Your leave request was taken for an 'excuse', your reputation was shaken.",
          detay: "Your body rested but your name was spoken as 'lazy' for a while.",
        },
      },
    ],
  },

  oc_asker_sadik_11: {
    baslik: "Suspicion at the Border Post",
    metin:
      "At the post on the {bolge} border you're searching a caravan's load; there seem to be traces of weapons hidden under the bales of cloth. The caravan leader begs you to look the other way — he says his family will starve.",
    secenekler: [
      {
        metin: "Have the load searched properly, apply the rule.",
        ipucu: "The duty is fully done, a family's fate is in your hands",
        basariliSonuc: {
          mesaj: "You found the weapons, arrested the caravan; your superior rewarded you.",
          detay: "The caravan leader's begging voice didn't leave your ears for a long time.",
        },
        basarisizSonuc: {
          mesaj: "During the search a bale toppled, the weapons were smuggled off by another route.",
          detay: "All you were left with was an empty suspicion.",
        },
      },
      {
        metin: "Look the other way, let the caravan through.",
        ipucu: "One conscience eases, a big risk of betraying the order",
        basariliSonuc: {
          mesaj: "You let the caravan through, the caravan leader thanked you in tears.",
          detay: "But the lie you wrote in the post's ledger is part of you now.",
        },
        basarisizSonuc: {
          mesaj: "The weapons were seized at another post, and it came out the caravan you let through carried them.",
          detay: "You paid the price of your conscience with your rank.",
        },
      },
      {
        metin: "Apply the rule but help the caravan leader's family from your own pocket.",
        ipucu: "A partial answer to both duty and conscience, your pocket lightens",
        basariliSonuc: {
          mesaj: "You handed over the weapons, but secretly left money with the caravan leader's family.",
          detay: "Without breaking the rule you didn't fully ignore your conscience either.",
        },
        basarisizSonuc: {
          mesaj: "Your help was noticed, your superior recorded it as 'needless mercy'.",
          detay: "Your good intentions weren't appreciated this time.",
        },
      },
    ],
  },

  oc_asker_sadik_12: {
    baslik: "The Priest's Request",
    metin:
      "The garrison priest wants you to make confession before going to war and then take a holy oath — an oath that contains a conscience clause that could force you to question some of your superior's orders.",
    secenekler: [
      {
        metin: "Take the oath, bind your conscience to God.",
        ipucu: "Your soul eases, you take on a bond that could conflict with your obedience",
        basariliSonuc: {
          mesaj: "You took the oath, felt a strange peace inside.",
          detay: "But you'll have to think twice about every order now.",
        },
        basarisizSonuc: {
          mesaj: "During the oath the words knotted in your throat, the priest let you go with understanding.",
          detay: "Both you and he felt you weren't ready.",
        },
      },
      {
        metin: "Make only confession, gently refuse the oath.",
        ipucu: "You keep your simplicity, your spiritual bond stays incomplete",
        basariliSonuc: {
          mesaj: "You made your confession, and turned down the oath saying 'as a soldier I'm bound to my superior'.",
          detay: "The priest nodded, not without objection but with respect.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal offended the priest, you were spoken of coldly among the congregation.",
          detay: "You saw once more that you can't please everyone.",
        },
      },
    ],
  },

  oc_asker_sadik_13: {
    baslik: "The Burden of Command",
    metin:
      "You're a Commander now. Your first order isn't one you chose but one {amir} left you — you have to give a task you dislike to men you like. Rank means responsibility, not the freedom to choose, you understand now.",
    secenekler: [
      {
        metin: "Pass the order along unchanged, carry the weight of command.",
        ipucu: "Your authority is respected, some of the affection lessens",
        basariliSonuc: {
          mesaj: "You gave the order, no one objected but a coldness hung in the air.",
          detay: "You learned the price of being a commander from the first day.",
        },
        basarisizSonuc: {
          mesaj: "Your men openly grumbled, your authority was tested from the first day.",
          detay: "Your rank is new, your respect not yet earned.",
        },
      },
      {
        metin: "Take the task on yourself, spare your men.",
        ipucu: "Your men love you, your superiors may find you weak",
        basariliSonuc: {
          mesaj: "You did the task yourself, your men looked at you with devotion.",
          detay: "But {amir} thinks a commander shouldn't dirty his own hands.",
        },
        basarisizSonuc: {
          mesaj: "You were wounded during the task, and {amir} criticized it as 'needless heroics'.",
          detay: "Your good intentions were counted as naivety in authority's eyes.",
        },
      },
    ],
  },

  oc_asker_sadik_14: {
    baslik: "The Prisoner's Eyes",
    metin:
      "{amir} ordered the execution without trial of a captured young enemy soldier — by the rules this is forbidden but in wartime the rules are bent. The young man won't take his eyes off you.",
    secenekler: [
      {
        metin: "Carry out the order, show your obedience.",
        ipucu: "Your military discipline is complete, your conscience is never the same",
        basariliSonuc: {
          mesaj: "You carried out the order; {amir} nodded without a word.",
          detay: "The eyes you saw that night never left your dreams, even years later.",
        },
        basarisizSonuc: {
          mesaj: "Your hand trembled, the job wasn't done as ordered; {amir} looked at you with contempt.",
          detay: "You neither fully obeyed nor saved your conscience.",
        },
      },
      {
        metin: "Delay the order, look for a way to keep the prisoner alive.",
        ipucu: "You could save your conscience, open disobedience carries a great risk",
        basariliSonuc: {
          mesaj: "You managed to have the prisoner secretly recorded on the exchange list; {amir} was furious but your order was effectively changed.",
          detay: "You saved a life but you're an untrustworthy man in {amir}'s eyes now.",
        },
        basarisizSonuc: {
          mesaj: "Your attempt came to light, {amir} humiliated you in front of everyone, and the prisoner was killed anyway.",
          detay: "You could neither save the prisoner nor keep your obedient name.",
        },
      },
    ],
  },

  oc_asker_sadik_15: {
    baslik: "An Epidemic in the Barracks",
    metin:
      "A feverish illness is spreading in the barracks. Your superior orders you to lock a few soldiers suspected of being sick into a tent out in the open, away from the barracks — no one cares for them, they're just isolated.",
    secenekler: [
      {
        metin: "Carry out the order, keep the quarantine strict.",
        ipucu: "You stop the epidemic, you share in the sick men's suffering",
        basariliSonuc: {
          mesaj: "The quarantine worked, the rest of the barracks stayed healthy.",
          detay: "The sound of coughing from the tent is still in your ears at night.",
        },
        basarisizSonuc: {
          mesaj: "The illness spread anyway, the quarantine fell short.",
          detay: "You carried out the order but the outcome didn't change, only your conscience grew heavier.",
        },
      },
      {
        metin: "Secretly bring food and blankets to those in quarantine.",
        ipucu: "Your mercy eases them, there's a risk of breaking the order",
        basariliSonuc: {
          mesaj: "What you brought made a few lives easier, no one noticed.",
          detay: "You chose to follow the spirit of some orders, not the letter.",
        },
        basarisizSonuc: {
          mesaj: "A sentry caught you, your superior punished you for breaking the order.",
          detay: "Your kindness cost you dearly this time.",
        },
      },
    ],
  },

  oc_asker_sadik_16: {
    baslik: "The Young Private's Mistake",
    metin:
      "In the small detachment you command, a young private fell asleep on watch and let a thief slip into the fortress. The rules are clear: this offense demands a heavy punishment. But the boy is only sixteen.",
    secenekler: [
      {
        metin: "Apply the rule, report the offense to your superiors.",
        ipucu: "You keep your discipline, the boy's life takes a heavy wound",
        basariliSonuc: {
          mesaj: "You filed your report, the young private was hit with a heavy punishment.",
          detay: "You stayed true to the rules; the face of staying true is sometimes bitter.",
        },
        basarisizSonuc: {
          mesaj: "The other soldiers found you merciless, the trust between you was shaken.",
          detay: "You believe you did the right thing, but you were left alone.",
        },
      },
      {
        metin: "Lighten the punishment with your own authority, don't blow it up.",
        ipucu: "You give the boy a chance, you take the risk of bending the rules",
        basariliSonuc: {
          mesaj: "You punished the young private with your own authority, didn't escalate it to your superiors.",
          detay: "The boy never made the same mistake again, and stayed grateful to you for life.",
        },
        basarisizSonuc: {
          mesaj: "The matter reached your superiors by another route; you were questioned for both trying to hide the punishment and abusing your authority.",
          detay: "Your good intentions carried no weight against the rule.",
        },
      },
    ],
  },

  oc_asker_sadik_17: {
    baslik: "The Order to Close the Gate",
    metin:
      "You command a besieged fortress; provisions are running out. The order from {amir} is clear: close the gates, don't let the peasants left outside in — there's no room or food for them. Families with children wait before the gate.",
    secenekler: [
      {
        metin: "Carry out the order, close the gates.",
        ipucu: "You save those inside, you share in the fate of those outside",
        basariliSonuc: {
          mesaj: "You closed the gates; those inside the fortress survived.",
          detay: "The screams of those left outside stayed with you always, as part of the victory you won.",
        },
        basarisizSonuc: {
          mesaj: "The crowd forced the gate, in the confusion some of your soldiers were hurt, you barely restored order.",
          detay: "Even carrying out the order demanded a price from you.",
        },
      },
      {
        metin: "Secretly let a small number of children and elderly in.",
        ipucu: "You save a few lives, the risk of openly defying the order is great",
        basariliSonuc: {
          mesaj: "You let a few children and elderly in through a hidden gate; {amir} was furious when he found out but couldn't undo it.",
          detay: "You knowingly took the first big stain on your command, and you're not sorry.",
        },
        basarisizSonuc: {
          mesaj: "Your attempt was noticed, {amir} openly accused you of disregarding his authority.",
          detay: "Your conscience is at ease but your command took a big wound.",
        },
      },
    ],
  },

  oc_asker_sadik_18: {
    baslik: "Aching Shoulders",
    metin:
      "The armor you've worn for years no longer sits on your shoulders like it used to. The young privates call you 'old wolf', with respect but a bit of pity too. The thought of retirement crosses your mind for real for the first time.",
    secenekler: [
      {
        metin: "Stay in service, give what strength you have left.",
        ipucu: "You keep your honor, your body wears down more",
        basariliSonuc: {
          mesaj: "You stayed in service, the young privates kept learning from you.",
          detay: "Your honor is intact but your body reminds you of the price every morning.",
        },
        basarisizSonuc: {
          mesaj: "You lost your balance in a drill, your fall was in front of everyone.",
          detay: "You can't hide anymore that age has caught up with you.",
        },
      },
      {
        metin: "File for retirement, focus on passing your experience to the young privates.",
        ipucu: "A peaceful transition, a withdrawal from active service",
        basariliSonuc: {
          mesaj: "Your petition was accepted, you stay in the barracks as a trainer now.",
          detay: "You set down your sword but not what you know.",
        },
        basarisizSonuc: {
          mesaj: "Your petition was turned down as 'too early', you were asked to stay at the front a while longer.",
          detay: "Even if your body isn't ready, the system won't let you go yet.",
        },
      },
      {
        metin: "Test your limits by sparring with a young private.",
        ipucu: "You prove yourself but your body pays for it",
        basariliSonuc: {
          mesaj: "You showed you could still beat a young private, your standing in the barracks rose.",
          detay: "But when you got up the next morning you felt it was not a victory but a reminder.",
        },
        basarisizSonuc: {
          mesaj: "The young private beat you, and in front of everyone you felt your age for real for the first time.",
          detay: "Your pride was wounded worse than your body.",
        },
      },
    ],
  },

  oc_asker_sadik_19: {
    baslik: "Your Father's Last Wish",
    metin:
      "The news from the village is heavy: your father is on his deathbed and wants to see you. That same week your unit was called to an important drill, and a soldier who leaves without permission is severely punished.",
    secenekler: [
      {
        metin: "Ask for leave, don't set off until you have an answer.",
        ipucu: "You stay bound to the rules, time may not wait for your father",
        basariliSonuc: {
          mesaj: "Your leave was approved at the last moment, you made it to your father's last breath.",
          detay: "Staying bound to the rules didn't make you sorry this time.",
        },
        basarisizSonuc: {
          mesaj: "The leave answer came late, you lost your father without seeing him one last time.",
          detay: "Your obedience didn't take you to the right place, it just made you late.",
        },
      },
      {
        metin: "Go without permission, take the punishment.",
        ipucu: "Your conscience eases, your disciplinary record takes a heavy stain",
        basariliSonuc: {
          mesaj: "You got to hold your father's hand one last time, but a heavy punishment waited for you when you returned.",
          detay: "You're not sorry; some things are worth more than rank.",
        },
        basarisizSonuc: {
          mesaj: "You made it but your unauthorized departure got out, your model-soldier standing was shaken overnight.",
          detay: "Your heart did the right thing, your record didn't forgive it.",
        },
      },
    ],
  },

  oc_asker_sadik_20: {
    baslik: "The Legacy of Your Last Watch",
    metin:
      "You've reached the end of the obedient service you kept up for years. A young private asks you 'Did you ever have any regrets?' Your answer will decide the name you leave behind.",
    secenekler: [
      {
        metin: "Tell it honestly: obedience both saved you and cost you sleep some nights.",
        ipucu: "Your honesty is a lesson to the young, your flawless image is shaken",
        basariliSonuc: {
          mesaj: "The young private listened in silence, started speaking of you as 'a real soldier'.",
          detay: "Admitting you weren't flawless made you more respected still.",
        },
        basarisizSonuc: {
          mesaj: "Your words were misunderstood, some thought you doubted your own obedience.",
          detay: "Honesty is sometimes heard wrong.",
        },
      },
      {
        metin: "Just say 'staying true to orders is always right', don't confuse the boy.",
        ipucu: "You leave a simple, strong legacy, the truth stays more complicated",
        basariliSonuc: {
          mesaj: "The young private memorized your words, swore to become like you.",
          detay: "You didn't tell him the whole truth, but maybe that was the greatest kindness you could do for him.",
        },
        basarisizSonuc: {
          mesaj: "The young private sensed the gap in your words, started asking you more questions.",
          detay: "Simple answers don't satisfy a curious mind.",
        },
      },
    ],
  },

  oc_asker_isyanci_01: {
    baslik: "The Watch Roster",
    metin:
      "The organization wants its first real task of you: you have to copy the watch roster in the command tent so safe hours for secret meetings are known. Entering the tent without permission is forbidden — if you're caught you could be accused of theft.",
    secenekler: [
      {
        metin: "Distract the sentry, slip into the tent.",
        ipucu: "You win the organization's trust, a high risk of being caught",
        basariliSonuc: {
          mesaj: "You copied the roster, no one noticed; the organization trusts you more now.",
          detay: "You passed your first test quietly.",
        },
        basarisizSonuc: {
          mesaj: "The sentry noticed you, you barely got away; eyes are on you in the barracks now.",
          detay: "The first step is sometimes the most dangerous.",
        },
      },
      {
        metin: "Refuse the task, say it's too risky.",
        ipucu: "You stay safe, your standing in the organization is shaken",
        basariliSonuc: {
          mesaj: "You refused; your comrades understood but didn't hide the disappointment in their eyes.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal led to whispers of 'unreliable' within the organization.",
        },
      },
      {
        metin: "Persuade another comrade to take on the risk.",
        ipucu: "You share out the risk, it could damage trust within the organization",
        basariliSonuc: {
          mesaj: "Your comrade took on the task and succeeded; but you know you put him in danger.",
        },
        basarisizSonuc: {
          mesaj: "Your comrade was caught, he didn't give your name but the way he looked at you was never the same again.",
          detay: "Some debts are never paid.",
        },
      },
    ],
  },

  oc_asker_isyanci_02: {
    baslik: "A Newcomer at the Meeting",
    metin:
      "A newly joined soldier shows interest in the organization's meetings; his words are just right, and the questions he asks are too just right. Your comrades suspect him but there's no proof; they're waiting for a decision from you.",
    secenekler: [
      {
        metin: "Test him, with a piece of dangerous information.",
        ipucu: "You could reveal his true identity, if it turns out wrong you lose trust",
        basariliSonuc: {
          mesaj: "The false information you gave reached the commander's ear a day later; the man really was an informer, you warned the organization in time.",
          detay: "Suspicion is sometimes a weapon in itself.",
        },
        basarisizSonuc: {
          mesaj: "The man you tested was innocent; your suspicion deeply hurt him, the trust between you was never the same.",
        },
      },
      {
        metin: "Quietly ease him out of the organization, give no reason.",
        ipucu: "You reduce the risk, you may have hurt an innocent person",
        basariliSonuc: {
          mesaj: "The man quietly drifted away, no one reacted; the danger — maybe — was removed.",
        },
        basarisizSonuc: {
          mesaj: "The man was angered at being shunned and went to the commander; they started asking strange questions about you.",
        },
      },
      {
        metin: "Trust him, bring him fully into your ranks.",
        ipucu: "The organization grows, if it turns out wrong everyone is in danger",
        basariliSonuc: {
          mesaj: "The man really was your comrade in the cause; the organization grew stronger by one.",
        },
        basarisizSonuc: {
          mesaj: "The man really was an agent; two of your comrades were arrested, you feel the guilt.",
          detay: "Trust sometimes exacts the highest price.",
        },
      },
    ],
  },

  oc_asker_isyanci_03: {
    baslik: "The Notch and the Cipher",
    metin:
      "You learn that the secret sign the organization uses — a small notch in the barracks wall — is starting to be noticed. Either a new, more complex method must be found or the meetings must be stopped for a while.",
    secenekler: [
      {
        metin: "Develop a new sign system, take the risk.",
        ipucu: "You strengthen the organization, it's dangerous until the new method is tested",
        basariliSonuc: {
          mesaj: "The new signs worked; communication is far safer than before.",
        },
        basarisizSonuc: {
          mesaj: "While testing the new method a sentry grew suspicious; you barely got past it.",
        },
      },
      {
        metin: "Stop the meetings for a while, propose waiting.",
        ipucu: "Safe but the organization could lose its momentum",
        basariliSonuc: {
          mesaj: "Nothing happened during the silent period; but some comrades started to grow impatient.",
        },
        basarisizSonuc: {
          mesaj: "Even while waiting some comrades got careless; a small mistake nearly exposed everything.",
        },
      },
    ],
  },

  oc_asker_isyanci_04: {
    baslik: "The Granary Raid",
    metin:
      "The village near the barracks is struggling with hunger from heavy taxes. The organization plans to secretly get a quantity of provisions from the barracks granary to the village; if you're caught it's not theft but a mutiny charge that awaits you.",
    secenekler: [
      {
        metin: "Carry the provisions at midnight, take them to the village yourself.",
        ipucu: "You win the people's real support, a big risk of being caught",
        basariliSonuc: {
          mesaj: "The provisions reached the village; the women thanked you in tears, the organization's name started being whispered in the village.",
          detay: "The people's love sometimes outweighs a sword.",
        },
        basarisizSonuc: {
          mesaj: "A patrol caught you; you had to drop the provisions, the whip burned your back.",
        },
      },
      {
        metin: "Hand the task to another comrade, you keep watch.",
        ipucu: "You share out the risk, your share of the trust drops",
        basariliSonuc: {
          mesaj: "Your lookout work paid off, the provisions arrived without trouble; but someone else got the people's gratitude.",
        },
        basarisizSonuc: {
          mesaj: "You were late on lookout and your comrade was nearly caught; he threw you angry looks.",
        },
      },
      {
        metin: "Cancel the plan, say it's too risky.",
        ipucu: "You stay safe, the village is left alone with its hunger",
        basariliSonuc: {
          mesaj: "You stopped the plan; the village went hungry but the organization dodged another danger.",
        },
        basarisizSonuc: {
          mesaj: "Your decision to cancel angered some comrades; whispers of 'coward' reached your ears.",
        },
      },
    ],
  },

  oc_asker_isyanci_05: {
    baslik: "A Fork in the Road",
    metin:
      "The organization is splitting in two: one group wants to punish the commanders immediately, with violence; the other argues for patiently organizing the people and forcing change over time. You have to take a side between them.",
    secenekler: [
      {
        metin: "Support the violent, fast action.",
        ipucu: "A sense of instant justice, it could turn into an uncontrolled blood feud",
        basariliSonuc: {
          mesaj: "Your words emboldened the fast-action camp; the organization is a sharper knife now.",
        },
        basarisizSonuc: {
          mesaj: "The harshness you argued for scared some comrades; a few left the organization.",
        },
      },
      {
        metin: "Support the patient, organizing approach.",
        ipucu: "A safer way, its results come slowly",
        basariliSonuc: {
          mesaj: "Your words convinced the majority; the organization gave up hasty moves and decided to grow patiently.",
        },
        basarisizSonuc: {
          mesaj: "Some comrades mistook patience for cowardice; an invisible line formed between you.",
        },
      },
      {
        metin: "Stay neutral, try to reconcile the two.",
        ipucu: "You could hold the organization together, you may not fully please anyone",
        basariliSonuc: {
          mesaj: "Your conciliatory words worked; both groups listened to you, the organization stood without splitting.",
        },
        basarisizSonuc: {
          mesaj: "Your efforts to reconcile offended both sides; no one fully trusts you now.",
        },
      },
    ],
  },

  oc_asker_isyanci_06: {
    baslik: "Fallen Into a Sentry's Hands",
    metin:
      "One of your comrades was found suspicious by a night patrol and arrested. The corridor they're taking him to prison down is narrow and the sentries are few; but a rescue attempt could expose the whole organization.",
    secenekler: [
      {
        metin: "Stage a raid, free him by force.",
        ipucu: "Heroic but it could endanger the whole organization",
        basariliSonuc: {
          mesaj: "The raid worked, you spirited your comrade off into the dark; your hearts are still pounding.",
          detay: "Some nights show you the price of friendship.",
        },
        basarisizSonuc: {
          mesaj: "The raid fell apart, two more were caught; the organization took a heavy wound tonight.",
        },
      },
      {
        metin: "Stay silent, leave him to his fate.",
        ipucu: "You protect the organization, your conscience carries a heavy burden",
        basariliSonuc: {
          mesaj: "You did nothing; your comrade was taken to interrogation, the organization survived to the next day.",
        },
        basarisizSonuc: {
          mesaj: "Your silence branded you a coward in some comrades' eyes.",
        },
      },
      {
        metin: "Try to persuade the sentry with a bribe.",
        ipucu: "A bloodless solution, it risks your money and your trust",
        basariliSonuc: {
          mesaj: "The sentry pocketed the gold and closed his eyes; your comrade slipped away down the corridor.",
        },
        basarisizSonuc: {
          mesaj: "The sentry took the gold but didn't keep his word, and reported it to his superiors on top of that.",
        },
      },
    ],
  },

  oc_asker_isyanci_07: {
    baslik: "The Iron Room",
    metin:
      "On an informer's denunciation you're taken for interrogation. In the cold stone room the interrogation officer wants to learn who the organization is, who's in it; every silence of yours has a price.",
    secenekler: [
      {
        metin: "Grit your teeth, give no names.",
        ipucu: "You protect your comrades, you pay the price with your body",
        basariliSonuc: {
          mesaj: "You didn't say a word; in the end they let you go, but your body didn't heal for weeks.",
          detay: "Your silence was stronger than any word you could have said.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't hold on and fainted; you don't remember what you said, only that you woke in a cell.",
          detay: "You'll never fully learn what you said while unconscious.",
        },
      },
      {
        metin: "Give a small, unimportant name, protect the real organization.",
        ipucu: "Your chance of getting out rises, a stain stays on your conscience",
        basariliSonuc: {
          mesaj: "The false name you gave worked; the interrogators were satisfied, the organization stayed safe once more.",
          detay: "You got out but you'll always remember whose name you sacrificed.",
        },
        basarisizSonuc: {
          mesaj: "The name you gave turned out to be a real comrade; they arrested him because of you.",
        },
      },
      {
        metin: "Try to escape, seize the gap between interrogations.",
        ipucu: "If you succeed you're free, if you fail you pay a very heavy price",
        basariliSonuc: {
          mesaj: "You seized a sentry's momentary lapse and melted into the dark.",
        },
        basarisizSonuc: {
          mesaj: "Your escape attempt was noticed at the first step; the chains are tighter this time.",
        },
      },
    ],
  },

  oc_asker_isyanci_08: {
    baslik: "An Organization Left Without a Head",
    metin:
      "The man who founded the organization was badly wounded and had to go into hiding; no one dares take his place. Your comrades' eyes turn to you — maybe it's your turn.",
    secenekler: [
      {
        metin: "Take on the leadership, rally the organization.",
        ipucu: "You gain real power, every mistake is on your shoulders now",
        basariliSonuc: {
          mesaj: "Your comrades accepted you as leader; the organization went on without falling apart.",
          detay: "Every decision of yours affects many lives now.",
        },
        basarisizSonuc: {
          mesaj: "Your leadership caused disputes, some comrades broke away.",
        },
      },
      {
        metin: "Stay back, support another experienced comrade.",
        ipucu: "Safer, your say over the organization lessens",
        basariliSonuc: {
          mesaj: "The comrade you supported took the leadership, the organization went on unshaken.",
        },
        basarisizSonuc: {
          mesaj: "The man you supported wasn't ready for leadership; the organization drifted in indecision for weeks.",
        },
      },
      {
        metin: "Break the organization into small, independent cells, give up the single center.",
        ipucu: "You reduce the risk of being caught, coordination gets harder",
        basariliSonuc: {
          mesaj: "Splitting into cells worked; even if one cell is caught, the others stay safe.",
        },
        basarisizSonuc: {
          mesaj: "The split caused confusion; some cells didn't even recognize each other anymore.",
        },
      },
    ],
  },

  oc_asker_isyanci_09: {
    baslik: "An Encounter",
    metin:
      "{dost}, someone you once slept in the same tent with, is now a corporal who has risen among the loyal soldiers. Your eyes meet in the barracks courtyard; in his look there's both the old friendship and a deep suspicion.",
    secenekler: [
      {
        metin: "Talk to him, open up trusting the old friendship.",
        ipucu: "You could rebuild the bond, he could give you away",
        basariliSonuc: {
          mesaj: "{dost} listened to you, remembered the old days; he swore he'd say nothing to anyone.",
        },
        basarisizSonuc: {
          mesaj: "After hearing you out, {dost} walked away in silence; the next day your superiors summoned you.",
          detay: "Some friendships are crushed under the weight of loyalty.",
        },
      },
      {
        metin: "Act distant, give nothing away.",
        ipucu: "Safe but you lose the old friendship entirely",
        basariliSonuc: {
          mesaj: "You passed with a cold greeting; {dost} seemed to sense something but didn't dwell on it.",
        },
        basarisizSonuc: {
          mesaj: "Your distance was too obvious; {dost} suspects you now.",
        },
      },
    ],
  },

  oc_asker_isyanci_10: {
    baslik: "Contraband Swords",
    metin:
      "A weapons merchant you know outside the barracks whispers he could secretly sell the organization cheap swords and shields — for an extra fee, of course, and an oath of silence.",
    secenekler: [
      {
        metin: "Make a large purchase from the organization's common purse.",
        ipucu: "You arm the organization, the big expense could leave a trail",
        basariliSonuc: {
          mesaj: "The weapons were delivered secretly at midnight; the organization has the means to defend itself now.",
        },
        basarisizSonuc: {
          mesaj: "During the delivery a sentry nearly saw you; you had to abandon half the weapons.",
        },
      },
      {
        metin: "Buy a small, inconspicuous quantity.",
        ipucu: "Safe but an inadequate arming",
        basariliSonuc: {
          mesaj: "The small batch came without trouble; inadequate but at least a start.",
        },
        basarisizSonuc: {
          mesaj: "The merchant took the money but most of the goods were poor quality; you realized you'd been cheated.",
        },
      },
      {
        metin: "Refuse the offer, don't trust the merchant.",
        ipucu: "Safe but the organization stays unarmed",
        basariliSonuc: {
          mesaj: "You turned the offer down; the merchant shrugged and left, the organization a little more unarmed but safe.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal disappointed some comrades; they grumbled 'we missed the chance'.",
        },
      },
    ],
  },

  oc_asker_isyanci_11: {
    baslik: "Words on the Wall",
    metin:
      "The organization wants the people to hear the truth too: you have the idea of hanging a text on the market square wall telling of the commanders' arbitrary punishments. Risky but the most direct way to win the people's support.",
    secenekler: [
      {
        metin: "Hang the text yourself before dawn.",
        ipucu: "You become the people's voice, being caught is instant and dangerous",
        basariliSonuc: {
          mesaj: "In the morning you saw people gathered around the text in the market square; your words reached beyond the barracks for the first time.",
          detay: "Some words reach farther than a sword.",
        },
        basarisizSonuc: {
          mesaj: "The sentries caught you hanging the text; the blows you took while fleeing didn't heal for days.",
        },
      },
      {
        metin: "Have a trusted peasant do the job.",
        ipucu: "You protect yourself, you put the risk on someone else",
        basariliSonuc: {
          mesaj: "The peasant hung the text, no one suspected; the words reached the people anyway.",
        },
        basarisizSonuc: {
          mesaj: "The peasant was caught, he never gave your name but you put him in that danger.",
        },
      },
    ],
  },

  oc_asker_isyanci_12: {
    baslik: "A Drunk Mouth",
    metin:
      "In a tavern, a young soldier from the organization drank too much and is letting the organization's name slip. You don't know who the man at the next table is — an ordinary drunk, or an agent?",
    secenekler: [
      {
        metin: "Quietly get the young soldier outside, cover it up.",
        ipucu: "You limit the damage, you can't be fully sure",
        basariliSonuc: {
          mesaj: "You got the soldier out, the noise in the tavern seemed to have drowned the talk.",
        },
        basarisizSonuc: {
          mesaj: "Your exit drew attention; the stranger watched you leave, sizing you up.",
        },
      },
      {
        metin: "Follow the stranger, find out who he is.",
        ipucu: "You could see the danger coming, you could also expose your own identity",
        basariliSonuc: {
          mesaj: "You learned the man was an ordinary peddler; you felt a bit relieved.",
        },
        basarisizSonuc: {
          mesaj: "Your tailing was noticed; the man concealed his identity and disappeared, and you drew even more attention.",
        },
      },
      {
        metin: "Cut the young soldier off from the organization entirely, never trust him again.",
        ipucu: "You increase security, you lose a comrade",
        basariliSonuc: {
          mesaj: "You cut the young man off from the organization; he left sad but the organization took one more precaution.",
        },
        basarisizSonuc: {
          mesaj: "The young man, angered at being shunned, made threatening remarks; now you fear him too.",
        },
      },
    ],
  },

  oc_asker_isyanci_13: {
    baslik: "Confession",
    metin:
      "The barracks priest watches you carefully during confession; among his words you sense a subtle hint asking where you go at night. You don't know the priest's intent — will he report you, or is he as angry at injustice as you?",
    secenekler: [
      {
        metin: "Open up to him partly, try to feel out his side.",
        ipucu: "You could win an unexpected ally, you could give yourself away entirely",
        basariliSonuc: {
          mesaj: "The priest whispered that he shared your anger; the church now offers the organization a secret refuge.",
          detay: "Some allies wear unexpected robes.",
        },
        basarisizSonuc: {
          mesaj: "The priest reported your opening to his superiors; they watch your every step now.",
          detay: "Someone whose conscience you trusted gave you away.",
        },
      },
      {
        metin: "Say nothing, pass over your sins in general terms.",
        ipucu: "Safe but you miss a possible ally",
        basariliSonuc: {
          mesaj: "It was an ordinary confession; you left before the priest could learn anything.",
        },
        basarisizSonuc: {
          mesaj: "The priest grew suspicious of your silence; he became uneasy around you.",
        },
      },
    ],
  },

  oc_asker_isyanci_14: {
    baslik: "An Ambush in the Dark",
    metin:
      "The organization plans to seize one of the commanders who most oppresses the people at midnight and try him by its own justice. A bloody revenge, or a mistake that puts the organization in far greater danger — you can't tell.",
    secenekler: [
      {
        metin: "Join the plan, take part in the attempt to seize the commander.",
        ipucu: "You dispense justice yourself, failure could end the organization",
        basariliSonuc: {
          mesaj: "The commander was quietly taken from the barracks and his crimes read before the people; this time it was the superiors who felt the fear.",
          detay: "Justice sometimes waits for night.",
        },
        basarisizSonuc: {
          mesaj: "The plan fell apart, the guards came at you; those who could ran, and there's little hope for those left behind.",
        },
      },
      {
        metin: "Try to stop the plan, argue it's too risky.",
        ipucu: "You protect the organization, some comrades find you weak",
        basariliSonuc: {
          mesaj: "Your words convinced the majority, the plan was postponed; still, some accused you of a lack of courage.",
        },
        basarisizSonuc: {
          mesaj: "They didn't listen to you, the plan went ahead without your approval; you were held responsible for the outcome too.",
        },
      },
    ],
  },

  oc_asker_isyanci_15: {
    baslik: "Sleepless Nights",
    metin:
      "In recent weeks you jump at every shadow, you seem to hear your own name in every whisper. You struggle to meet even your comrades' eyes; your paranoia is taking your sleep now.",
    secenekler: [
      {
        metin: "Open up to a trusted comrade, share the burden.",
        ipucu: "You feel better, the person you trust could let you down",
        basariliSonuc: {
          mesaj: "Your comrade listened, reminded you that you weren't alone; the weight on your shoulders eased a little.",
        },
        basarisizSonuc: {
          mesaj: "The comrade you opened up to admitted he was as scared as you; you both left even more on edge.",
        },
      },
      {
        metin: "Grit your teeth, give nothing away, carry it alone.",
        ipucu: "You protect the organization, your own spirit wears down",
        basariliSonuc: {
          mesaj: "You gave nothing away; the organization stayed safe but the darkness inside you grew.",
          detay: "Some burdens are carried without ever being shared.",
        },
        basarisizSonuc: {
          mesaj: "One night on watch your hand trembled, your superiors noticed; they started asking 'are you ill?'",
        },
      },
    ],
  },

  oc_asker_isyanci_16: {
    baslik: "The Lost List",
    metin:
      "You learn that the command has drawn up a secret list of names of those being watched on suspicion of mutiny — if you get to it you can learn who's in danger and warn them. But getting close could mean getting your own name written on it.",
    secenekler: [
      {
        metin: "Sneak into the command tent, steal the list.",
        ipucu: "You could save the organization, you carry the biggest risk yourself",
        basariliSonuc: {
          mesaj: "You got the list; you warned everyone named in time, the organization was saved from a great blow.",
          detay: "Sometimes a scrap of paper means a dozen lives.",
        },
        basarisizSonuc: {
          mesaj: "You were caught leaving the tent; you're the top name on the list now.",
        },
      },
      {
        metin: "Get a clerk in the tent talking with a bribe.",
        ipucu: "A safer way, the information could be incomplete or wrong",
        basariliSonuc: {
          mesaj: "The clerk whispered a few names; at least you could warn those in most danger.",
        },
        basarisizSonuc: {
          mesaj: "The clerk took the money but what he said was a lie; you warned the wrong names and lost time.",
        },
      },
      {
        metin: "Ignore the list, let fate bring what it will.",
        ipucu: "You stay safe, your comrades are left in the dark",
        basariliSonuc: {
          mesaj: "You did nothing; a few weeks later two names on the list were arrested, you were left untouched.",
        },
        basarisizSonuc: {
          mesaj: "Your passivity got out; some comrades no longer see you as part of the organization.",
        },
      },
    ],
  },

  oc_asker_isyanci_17: {
    baslik: "A Poisoned Promotion",
    metin:
      "{amir} says he's thinking of promoting you to Commander — but this means a post that will tear you from the organization and make you a full 'man of the order'. The organization, though, wants you to use this chance as an ear on the inside.",
    secenekler: [
      {
        metin: "Accept the promotion, become the organization's secret eye.",
        ipucu: "You give the organization priceless information, the double life could wear you out",
        basariliSonuc: {
          mesaj: "The promotion was accepted; you live in two worlds now, but thanks to you the organization is a step ahead.",
          detay: "Power sometimes takes the most dangerous disguise.",
        },
        basarisizSonuc: {
          mesaj: "Your promotion came but the information you leaked was noticed before long; your comrades don't look at you the way they used to.",
        },
      },
      {
        metin: "Politely refuse the promotion, stay with the organization.",
        ipucu: "You keep your loyalty to the organization, you raise suspicion in your superiors' eyes",
        basariliSonuc: {
          mesaj: "Your refusal surprised {amir} but he didn't push; deep down you were relieved, your place in the organization stayed solid.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal raised questions of 'why does he want to stay an ordinary private'; you're watched more closely now.",
        },
      },
    ],
  },

  oc_asker_isyanci_18: {
    baslik: "The Night of the Uprising",
    metin:
      "After months of preparation the organization moves: an uprising begins to seize the barracks armory and topple the unjust commanders. Tonight either the change awaited comes, or the organization is silenced forever.",
    secenekler: [
      {
        metin: "Take the front ranks, lead the uprising.",
        ipucu: "You become the leader of a historic moment, if you lose the price is very heavy",
        basariliSonuc: {
          mesaj: "The armory was seized, the unjust commanders stripped of their ranks; your name is a word of hope in the barracks now.",
          detay: "This night will be told even years from now.",
        },
        basarisizSonuc: {
          mesaj: "The uprising was crushed; many of your comrades either died or were chained, and you survived by a miracle.",
          detay: "Some nights are never forgotten.",
        },
      },
      {
        metin: "Stay back, provide only support and communication.",
        ipucu: "Safer, your name isn't written into history as a leader",
        basariliSonuc: {
          mesaj: "The information you gave made the front group's job easier; the uprising succeeded, you stayed in the shadows.",
        },
        basarisizSonuc: {
          mesaj: "As the uprising was crushed you had to flee too; you survived but had to watch the organization's collapse from a distance.",
        },
      },
      {
        metin: "Pull back at the last moment, think the plan is too early.",
        ipucu: "You protect yourself, the organization may never forgive you",
        basariliSonuc: {
          mesaj: "You pulled back; the uprising went on without you and was crushed in blood, your survival weighed on you like guilt.",
        },
        basarisizSonuc: {
          mesaj: "Your pulling back was noticed; in the eyes of the surviving comrades you were a traitor now.",
        },
      },
    ],
  },

  oc_asker_isyanci_19: {
    baslik: "The Escape Tunnel",
    metin:
      "After the uprising the barracks hunt you like hounds. You know an old smuggler's tunnel that runs underground; but the tunnel may have collapsed and you don't know who waits at the exit.",
    secenekler: [
      {
        metin: "Try the tunnel, escape whatever it takes.",
        ipucu: "The only door to freedom, a risk of collapse or ambush",
        basariliSonuc: {
          mesaj: "You slipped under the fence and dove into the dark, swallowing the earth's breath; you came out into freedom with everything you left behind.",
          detay: "Freedom feels heavy even at the first breath.",
        },
        basarisizSonuc: {
          mesaj: "The tunnel collapsed halfway; when you struggled out from under the rubble the guards had surrounded you.",
        },
      },
      {
        metin: "Blend into the city and hide by concealing your identity.",
        ipucu: "Slow but a relatively calm way, the risk of being recognized continues",
        basariliSonuc: {
          mesaj: "You lived for months like an ordinary craftsman; those looking for you finally forgot you, but nothing was left of your old life.",
        },
        basarisizSonuc: {
          mesaj: "A neighbor grew suspicious and reported you; you were caught just as you tried to flee.",
        },
      },
      {
        metin: "Surrender, at least beg mercy for your comrades.",
        ipucu: "An honorable submission, you definitely lose your freedom",
        basariliSonuc: {
          mesaj: "You surrendered; your words saved some comrades' lives but your own freedom is no longer yours.",
          detay: "Some victories are won from behind chains.",
        },
        basarisizSonuc: {
          mesaj: "Your submission got no mercy; you were taken back to the interrogation room, harsher this time.",
        },
      },
    ],
  },

  oc_asker_isyanci_20: {
    baslik: "A New Dawn",
    metin:
      "After years of struggle the organization has reached a turning point: the command had to accept a new regulation lightening the punishments. But this victory is fragile; one wrong step could return everything to the old darkness.",
    secenekler: [
      {
        metin: "Protect the gain, quietly disband the organization, let no one suspect.",
        ipucu: "You make the gain lasting, the story of the struggle stays in the shadows",
        basariliSonuc: {
          mesaj: "The organization quietly disbanded; the injustice eased a little, no one ever learned the names behind it.",
          detay: "Some victories are won without applause.",
        },
        basarisizSonuc: {
          mesaj: "Some secrets leaked during the disbanding; the gain held but a few comrades' names are still on the suspect list.",
        },
      },
      {
        metin: "Announce the gain, tell the people the organization's name and cause.",
        ipucu: "You become a people's hero, the command could seek revenge",
        basariliSonuc: {
          mesaj: "The people learned the story of those who resisted injustice; your name is spoken outside the barracks now.",
          detay: "Some names live longer than chains.",
        },
        basarisizSonuc: {
          mesaj: "Your announcement drew the command's wrath; you barely escaped arrest, the organization had to withdraw into the shadows again.",
        },
      },
      {
        metin: "Keep fighting, don't count this small victory as enough.",
        ipucu: "A bigger change is possible, you risk the gain you have",
        basariliSonuc: {
          mesaj: "The organization set new goals; the small victory became just the first step of a bigger struggle.",
        },
        basarisizSonuc: {
          mesaj: "Excessive ambition wore out the organization, some comrades left saying 'enough already'; even the victory won was overshadowed.",
        },
      },
    ],
  },

  oc_asker_kahraman_01: {
    baslik: "The Birth of a Legend",
    metin:
      "When the unit you saved from the ambush returned to the barracks, a new title had been added before your name: hero. Your comrades exaggerate the story endlessly, and you still don't fully know why you dove into the enemy line.",
    secenekler: [
      {
        metin: "Correct what's being told, describe what happened as it was.",
        ipucu: "Less fame, but a solid name",
        basariliSonuc: {
          mesaj: "You told the truth; no one embellished the story as much anymore but they trusted you more.",
          detay: "Some heroism needs not exaggeration but honesty.",
        },
        basarisizSonuc: {
          mesaj: "No one believed you; the real story fell flat beside the invented one.",
          detay: "Sometimes the truth is less loved than the interesting thing.",
        },
      },
      {
        metin: "Let the story grow, stay silent.",
        ipucu: "Easy fame, but the shadow of the lie grows",
        basariliSonuc: {
          mesaj: "The legend grew on its own, you just watched.",
          detay: "The story everyone loves was a little different from the one you lived.",
        },
        basarisizSonuc: {
          mesaj: "The exaggerated story shrank you in some comrades' eyes; they whispered 'how much of it is real'.",
          detay: "The shadow of fame sometimes falls on your own comrades.",
        },
      },
    ],
  },

  oc_asker_kahraman_02: {
    baslik: "Barracks Ballads",
    metin:
      "A wandering bard stopped by the barracks and made a ballad of your escape from the ambush. Now the soldiers hum that ballad even at meals, and your name reaches the villages before you do.",
    secenekler: [
      {
        metin: "Host the bard, let him spread the ballad further.",
        ipucu: "Spreading fame, growing expectation",
        basariliSonuc: {
          mesaj: "The ballad was sung in inns and markets; your name isn't yours anymore, it belongs to the people.",
          detay: "This made you proud, but part of you was uneasy — everything you do now will be compared to that ballad.",
        },
        basarisizSonuc: {
          mesaj: "The bard took the money but twisted the ballad to his own advantage; there are things in your story you never did now.",
          detay: "Once a legend leaves the mouth it escapes its owner's hands.",
        },
      },
      {
        metin: "Send the bard off, protect your privacy.",
        ipucu: "Less fame, a bit of calm",
        basariliSonuc: {
          mesaj: "The bard left the barracks, you got some peace for a while.",
          detay: "Being a name everyone knows is tiring sometimes.",
        },
        basarisizSonuc: {
          mesaj: "The bard left but he'd already learned the ballad; even sending him off turned into a story of its own.",
          detay: "Fleeing fame is sometimes no different from growing it.",
        },
      },
      {
        metin: "Don't care, mind your own business.",
        ipucu: "No risk but no effect",
        basariliSonuc: {
          mesaj: "The ballad spread on its own, you carried on with your watch.",
          detay: "Not trying to change some things is a choice too.",
        },
        basarisizSonuc: {
          mesaj: "Even your indifference was read as 'the humble hero'; your fame grows without you.",
          detay: "Sometimes staying silent is the loudest answer.",
        },
      },
    ],
  },

  oc_asker_kahraman_03: {
    baslik: "Jealous Eyes",
    metin:
      "An officer senior to you started saying that the person who saved the unit wasn't you but his own strategy. The soldiers are confused about whose word to believe.",
    secenekler: [
      {
        metin: "Confront him openly, say the truth in front of everyone.",
        ipucu: "It saves your honor but you make an enemy",
        basariliSonuc: {
          mesaj: "The truth came out, the soldiers took your side.",
          detay: "But the hatred in the officer's eyes isn't hidden anymore.",
        },
        basarisizSonuc: {
          mesaj: "The confrontation got ugly, your superiors scolded you both.",
          detay: "Nothing was gained, only an enemy grew.",
        },
      },
      {
        metin: "Stay silent, trust that time will show the truth.",
        ipucu: "Patience, but your reputation could erode",
        basariliSonuc: {
          mesaj: "Your silence was seen as maturity, the other soldiers already knew the truth.",
          detay: "Some battles are won by staying silent.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was mistaken for weakness, the officer's lie went around for a while longer.",
          detay: "When the truth is late, the lie strengthens its position.",
        },
      },
      {
        metin: "Complain to {amir}, make it official.",
        ipucu: "A lasting solution, a risky path",
        basariliSonuc: {
          mesaj: "{amir} took your side, the officer was humiliated in front of his superiors.",
          detay: "The justice you won came at the price of a permanent hostility.",
        },
        basarisizSonuc: {
          mesaj: "{amir} said 'don't quarrel like two children' and punished you both.",
          detay: "You sought justice, you found only shame.",
        },
      },
    ],
  },

  oc_asker_kahraman_04: {
    baslik: "A Young Admirer",
    metin:
      "A sixteen-year-old recruit came up to you with trembling hands just for having seen you. He told you he ran from his village and enlisted to become like you.",
    secenekler: [
      {
        metin: "Make time for him, tell him what real war is.",
        ipucu: "A small investment, a big responsibility",
        basariliSonuc: {
          mesaj: "The light in the boy's eyes dimmed a little but something more solid came in its place: knowing the truth.",
          detay: "Maybe your greatest heroism was breaking someone's dream to keep him alive.",
        },
        basarisizSonuc: {
          mesaj: "Your words didn't reach him, he still thinks he'll be unbeatable like you.",
          detay: "Some lessons are learned only by living them.",
        },
      },
      {
        metin: "Pat his head briefly, get back to your work.",
        ipucu: "Easy but cold",
        basariliSonuc: {
          mesaj: "The boy went off without being disappointed.",
          detay: "You can't make time for everyone, you know that.",
        },
        basarisizSonuc: {
          mesaj: "The recruit read your indifference as coldness and started keeping his distance from you.",
          detay: "Some admiration turns to disappointment at the first cold shoulder.",
        },
      },
    ],
  },

  oc_asker_kahraman_05: {
    baslik: "Waking in the Shadows",
    metin:
      "You woke at midnight drenched in sweat; the screams of your ambushed comrades were still in your ears from the dream. You sat until morning without letting go of your sword.",
    secenekler: [
      {
        metin: "Tell no one, carry it in silence.",
        ipucu: "You keep your pride, you make the burden heavier",
        basariliSonuc: {
          mesaj: "No one noticed, and you went on living the same battle again every night.",
          detay: "Some wounds stay hidden under the armor.",
        },
        basarisizSonuc: {
          mesaj: "The sleeplessness started making your hand tremble, your comrades noticed but you denied it.",
          detay: "Shadows grow the more they're ignored.",
        },
      },
      {
        metin: "Tell an old comrade-in-arms, share the burden.",
        ipucu: "Hard but healing",
        basariliSonuc: {
          mesaj: "{dost} listened, fixed nothing, but sat beside you.",
          detay: "Some wounds close not with a sword but with words.",
        },
        basarisizSonuc: {
          mesaj: "What you told unsettled {dost} too; you couldn't comfort each other.",
          detay: "Some shared burdens don't split in two, they double.",
        },
      },
    ],
  },

  oc_asker_kahraman_06: {
    baslik: "The Man-at-Arms Warrant",
    metin:
      "The commander summoned you to his presence; for the unit you saved from the ambush and the fame that has followed since, he granted you the rank of man-at-arms. The mark you carry on your shoulder now is under everyone's eyes.",
    secenekler: [
      {
        metin: "Accept the rank with humility, stay silent at the ceremony.",
        ipucu: "A solid reputation, without display",
        basariliSonuc: {
          mesaj: "Your words were few but the soldiers read it as strength.",
          detay: "Some men are more respected the less they speak.",
        },
        basarisizSonuc: {
          mesaj: "At the ceremony your eyes drifted, some mistook it for arrogance.",
          detay: "Silence isn't always read right.",
        },
      },
      {
        metin: "Accept the rank, give a speech at once.",
        ipucu: "A big effect, a big risk",
        basariliSonuc: {
          mesaj: "Your words got the soldiers on their feet, but some officers found you too ambitious.",
          detay: "Applause doesn't always come from everyone.",
        },
        basarisizSonuc: {
          mesaj: "Your words stuck in your throat, the silence stretched embarrassingly.",
          detay: "Being a hero doesn't guarantee eloquence.",
        },
      },
      {
        metin: "Don't accept the rank, say you owe more to the soldiers first.",
        ipucu: "A rare humility, it surprises the commander",
        basariliSonuc: {
          mesaj: "Though the commander was surprised, this stance made you even greater; he declared the rank a joint victory of the unit.",
          detay: "Sometimes refusing the crown makes you the one who most deserves it.",
        },
        basarisizSonuc: {
          mesaj: "The commander mistook your stance for disrespect, gave you the rank anyway but coldly.",
          detay: "Good intentions aren't always understood right.",
        },
      },
    ],
  },

  oc_asker_kahraman_07: {
    baslik: "At the Head of the Vanguard",
    metin:
      "As the {bolge} army enters a great battle, the commander entrusted the vanguard to you. The soldiers want to walk not behind you but with you — you can't let that trust down.",
    secenekler: [
      {
        metin: "Push forward, break the line together.",
        ipucu: "A great victory, the loss could be heavy",
        basariliSonuc: {
          mesaj: "The line broke, the enemy scattered; but three soldiers beside you never rose again.",
          detay: "As the victory ballads were written you tried not to forget their names.",
        },
        basarisizSonuc: {
          mesaj: "The line didn't hold, you gave the order to retreat; some heard it from you for the first time.",
          detay: "Being a hero doesn't mean winning every battle.",
        },
      },
      {
        metin: "Advance cautiously, send scouts first.",
        ipucu: "A safer, slower victory",
        basariliSonuc: {
          mesaj: "You advanced with few losses, the victory wasn't brilliant but it was solid.",
          detay: "Calculated courage is a courage without display but real.",
        },
        basarisizSonuc: {
          mesaj: "Your caution looked like a missed chance, some soldiers grumbled 'where's the old hero'.",
          detay: "Some will always expect the same recklessness from you.",
        },
      },
    ],
  },

  oc_asker_kahraman_08: {
    baslik: "A Challenge",
    metin:
      "A knight who made himself out to be a giant stepped from the enemy ranks and offered to fight you alone instead of the armies. Both sides held their breath, because this is now not your battle but everyone's on the line.",
    secenekler: [
      {
        metin: "Accept the challenge.",
        ipucu: "It cements your legend or ends it",
        basariliSonuc: {
          mesaj: "The duel was short; when the knight fell to his knees your own army roared your name.",
          detay: "Even in the enemy ranks a few nodded their heads.",
        },
        basarisizSonuc: {
          mesaj: "The knight's blow laid you flat, you barely saved your life with your shield.",
          detay: "News of the defeat spread faster than you.",
        },
      },
      {
        metin: "Refuse, say it could be a trap.",
        ipucu: "Wise but it casts a shadow on your reputation",
        basariliSonuc: {
          mesaj: "The commander backed your decision, the battle went on its normal course.",
          detay: "You don't have to accept every challenge.",
        },
        basarisizSonuc: {
          mesaj: "Whispers of 'the hero got scared' started among the soldiers, and no matter how you explained it wouldn't die.",
          detay: "A legend, once made, doesn't forgive a step back.",
        },
      },
      {
        metin: "Propose a young soldier in your place, give him a chance.",
        ipucu: "You share out the risk, you can't fully control the outcome",
        basariliSonuc: {
          mesaj: "The young soldier won with an unexpected courage, and you stood proudly behind him.",
          detay: "Sometimes the greatest heroism is giving the stage to someone else.",
        },
        basarisizSonuc: {
          mesaj: "The young soldier didn't come back from the duel; some questioned your decision, you most of all.",
          detay: "You could have gone in his place, and the thought won't leave you.",
        },
      },
    ],
  },

  oc_asker_kahraman_09: {
    baslik: "A Needless Risk",
    metin:
      "To save a besieged tower you're thinking of climbing the walls alone though there's no need; you feel like everyone expects it of you, even though there's a safer way too.",
    secenekler: [
      {
        metin: "Climb the walls alone, confirm your image.",
        ipucu: "It grows the legend, it puts your life at risk",
        basariliSonuc: {
          mesaj: "You reached the walls, opened the gate from inside; while the unit cheered you, you just gave thanks you were still standing.",
          detay: "You told no one but you know you won't be this lucky again.",
        },
        basarisizSonuc: {
          mesaj: "During the climb an arrow pierced your shoulder, you fell.",
          detay: "Your survival was counted a miracle, but your arm isn't what it was.",
        },
      },
      {
        metin: "Follow the safe way planned with the team.",
        ipucu: "Less glory, more sense",
        basariliSonuc: {
          mesaj: "The tower was taken, no one was harmed but no one shouted your name either.",
          detay: "A smart victory sometimes gets no applause.",
        },
        basarisizSonuc: {
          mesaj: "Some soldiers said you were 'not as brave as before'; those words wounded you more than you expected.",
          detay: "Your legend sometimes wants more of you than you want of yourself.",
        },
      },
    ],
  },

  oc_asker_kahraman_10: {
    baslik: "A Comrade's Price",
    metin:
      "In a clash the young soldier beside you met a blow aimed at you with his own body. Now his blood is still on your armor, and you're alive, not him.",
    secenekler: [
      {
        metin: "Carry the news to his family with your own hand.",
        ipucu: "A heavy task, but the right one",
        basariliSonuc: {
          mesaj: "You'll never forget the look in his mother's eyes, but you didn't lie.",
          detay: "Some burdens aren't shared, only carried.",
        },
        basarisizSonuc: {
          mesaj: "You went as far as the door but couldn't go in; the words stuck in your throat, you left a letter and turned back.",
          detay: "Courage sometimes ends not at the enemy line but at a doorstep.",
        },
      },
      {
        metin: "Suppress the pain, carry on with duty.",
        ipucu: "It looks easy, it builds up inside",
        basariliSonuc: {
          mesaj: "The soldiers admired your resilience, no one saw the emptiness in your eyes.",
          detay: "The hero everyone saw carried a burden no one saw.",
        },
        basarisizSonuc: {
          mesaj: "The pain you suppressed kept you up at night, your hand trembled even holding a sword.",
          detay: "Nothing suppressed is really lost.",
        },
      },
    ],
  },

  oc_asker_kahraman_11: {
    baslik: "The Loneliness of a Hero",
    metin:
      "Your old comrades-in-arms don't joke with you the way they used to; they look at you like at a legend. Even sitting around the fire there's an invisible distance between you.",
    secenekler: [
      {
        metin: "Insist on acting like the old days, try to close the gap.",
        ipucu: "Hard but a real bond could be saved",
        basariliSonuc: {
          mesaj: "You laughed together for a night, the distance melted for a moment.",
          detay: "Some bonds are worth insisting on being remembered.",
        },
        basarisizSonuc: {
          mesaj: "Your efforts were kind but useless, they don't see you as one of them anymore.",
          detay: "Fame sometimes opens a door with no way back.",
        },
      },
      {
        metin: "Accept the distance, get used to your loneliness.",
        ipucu: "Easy but it hollows you out",
        basariliSonuc: {
          mesaj: "You withdrew to your tent without talking to anyone; your fame became a crown and a wall at once.",
          detay: "Someone everyone knows can be the loneliest person.",
        },
        basarisizSonuc: {
          mesaj: "The loneliness weighed heavier than you'd thought, the nights stretched on and on.",
          detay: "Saying you need no one doesn't make it true.",
        },
      },
      {
        metin: "Spend time with the new recruits, they don't judge you.",
        ipucu: "A different bond, but still a bond",
        basariliSonuc: {
          mesaj: "You could breathe a little among the young, even though they still see you only with admiring eyes.",
          detay: "A new bond, though it doesn't replace the old, is something.",
        },
        basarisizSonuc: {
          mesaj: "The young idealize you so much that even among them you felt alone.",
          detay: "Sometimes admiration can't replace friendship.",
        },
      },
    ],
  },

  oc_asker_kahraman_12: {
    baslik: "The Tower Alone",
    metin:
      "The garrison defending a small fortress scattered in a night raid; the only one who can hold the gate is you. As the number of enemies at the foot of the stairs grows, only two wounded soldiers are left behind you.",
    secenekler: [
      {
        metin: "Hold the narrow passage alone, wait for reinforcements.",
        ipucu: "A legendary stand, or it ends here",
        basariliSonuc: {
          mesaj: "You held until dawn; when the reinforcements came the passage was still yours.",
          detay: "Even years later you couldn't quite explain how you survived that night.",
        },
        basarisizSonuc: {
          mesaj: "Their numbers beat you, you had to pull back from the passage.",
          detay: "Your wounds are deep but the deepest is the account of the two soldiers you left behind.",
        },
      },
      {
        metin: "Abandon the passage, leave the fortress and retreat.",
        ipucu: "You survive, your reputation is shaken",
        basariliSonuc: {
          mesaj: "You lived, but the fortress fell; the nickname 'hero' started being said for the first time in a mocking tone.",
          detay: "Surviving is sometimes a harder choice than victory.",
        },
        basarisizSonuc: {
          mesaj: "You were caught even while retreating; the fortress fell and you were wounded fleeing.",
          detay: "Tonight was the kind of night the ballads will never tell.",
        },
      },
    ],
  },

  oc_asker_kahraman_13: {
    baslik: "The Villagers' Hope",
    metin:
      "The people of a village worn out by famine and enemy raids want you to camp near their borders just because you're there. As if your presence alone is a shield.",
    secenekler: [
      {
        metin: "Accept their request, stay in the village a few days.",
        ipucu: "You win the people's hearts, you delay your real duty",
        basariliSonuc: {
          mesaj: "The villagers slept easy, the children smiled even watching you from a distance.",
          detay: "Sometimes heroism protects something without swinging a sword.",
        },
        basarisizSonuc: {
          mesaj: "There were no attacks the whole time you stayed, but your superiors were displeased that you fell behind on your real duty.",
          detay: "Protecting one place means neglecting another.",
        },
      },
      {
        metin: "Politely refuse, say your real duty is waiting for you.",
        ipucu: "A sense of duty, a price in disappointment",
        basariliSonuc: {
          mesaj: "The villagers were disappointed but understood; you're a person, you can't be everywhere at once.",
          detay: "Even a legend can't be in two places at once.",
        },
        basarisizSonuc: {
          mesaj: "The village elders grumbled after you 'so even a legend gets tired', and the words reached your ears.",
          detay: "Expectations are sometimes unjust, but they still weigh.",
        },
      },
    ],
  },

  oc_asker_kahraman_14: {
    baslik: "The Shadow of Slander",
    metin:
      "A jealous officer spread a rumor that you escaped the ambush alone by actually sacrificing your comrades. The rumor is already going around the barracks.",
    secenekler: [
      {
        metin: "Go to your superiors with evidence and witnesses.",
        ipucu: "It brings justice but it takes time",
        basariliSonuc: {
          mesaj: "The testimonies cleared you, the officer who spread the slander got a sharp warning.",
          detay: "The truth won but the hostility became permanent.",
        },
        basarisizSonuc: {
          mesaj: "Some evidence was found insufficient, the doubt didn't fully lift; a few eyes still look at you differently.",
          detay: "A suspicion once cast may never fully lift.",
        },
      },
      {
        metin: "Ignore the rumor, answer with your conduct.",
        ipucu: "A patient but slow clearing",
        basariliSonuc: {
          mesaj: "In time the rumor died on its own, your conduct proved stronger than words.",
          detay: "Some answers are given by silence.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was mistaken for acceptance, the slander didn't let go for a long time.",
          detay: "Sometimes staying silent isn't enough.",
        },
      },
      {
        metin: "Threaten the officer privately, silence him.",
        ipucu: "A fast but dangerous method",
        basariliSonuc: {
          mesaj: "The officer got scared and took back the rumor, but he really hates you now.",
          detay: "A silenced enemy is more dangerous than a talking one.",
        },
        basarisizSonuc: {
          mesaj: "Your threat was overheard by others; your 'hero' image really cracked for the first time.",
          detay: "Legends can decay by their own methods.",
        },
      },
    ],
  },

  oc_asker_kahraman_15: {
    baslik: "A Wound That Won't Heal",
    metin:
      "An old war wound of yours reopened; the physician says if you keep fighting like this you could lose your arm entirely. But the army needs you right now.",
    secenekler: [
      {
        metin: "Listen to the physician's warning, rest.",
        ipucu: "Wise in the long run, it brings criticism in the short run",
        basariliSonuc: {
          mesaj: "Your wound closed, but because 'the hero' stayed away from the front for a while, gossip started.",
          detay: "Protecting your body sometimes risks your reputation.",
        },
        basarisizSonuc: {
          mesaj: "Your rest fell short, your impatience took you back to the front early.",
          detay: "Some wounds don't close until they've taken all the patience they demand.",
        },
      },
      {
        metin: "Ignore the warning, keep fighting.",
        ipucu: "It protects your image, it drains your body",
        basariliSonuc: {
          mesaj: "You stayed at the front, the soldiers' morale rose but your arm aches more every day.",
          detay: "The price of heroism is sometimes paid slowly, quietly.",
        },
        basarisizSonuc: {
          mesaj: "The arm gave out in the middle of a battle, your sword fell from your hand.",
          detay: "The physician being proven right never hurt this much.",
        },
      },
    ],
  },

  oc_asker_kahraman_16: {
    baslik: "The Commander's Seal",
    metin:
      "After years of courage and battles won, the Commander seal is presented to you in the lord's presence. The hall is full, everyone expects a speech — but you wonder whether you can carry the responsibility of lives under your command.",
    secenekler: [
      {
        metin: "Accept the seal, swear an oath of loyalty to your soldiers.",
        ipucu: "A solid foundation, a great burden",
        basariliSonuc: {
          mesaj: "Your oath shook the hall; you're not just a hero now, you're a commander.",
          detay: "From that day, every decision carries not just your life but the lives of those under your command.",
        },
        basarisizSonuc: {
          mesaj: "Your oath was found ordinary, a few old officers muttered 'words are easy, war is hard'.",
          detay: "Words prove nothing until they're tested on the battlefield.",
        },
      },
      {
        metin: "Accept the seal, propose a new campaign at once.",
        ipucu: "A bold beginning, a risky bet",
        basariliSonuc: {
          mesaj: "Your proposal was accepted, but some senior officers found you too green and too ambitious.",
          detay: "With your new rank came new enemies too.",
        },
        basarisizSonuc: {
          mesaj: "Your proposal was rejected, you felt humiliated during the ceremony.",
          detay: "Rank raises you but doesn't always protect you.",
        },
      },
      {
        metin: "Accept the seal quietly, return to your duty at once.",
        ipucu: "Without display but effective",
        basariliSonuc: {
          mesaj: "Even your slipping away from the ceremony turned into a legend: 'Even as a Commander, he chose the war over the ceremony.'",
          detay: "Some people win more respect in the moments they run.",
        },
        basarisizSonuc: {
          mesaj: "Your hasty exit was counted as disrespect by some.",
          detay: "Not every silence is read as humility.",
        },
      },
    ],
  },

  oc_asker_kahraman_17: {
    baslik: "One Who Wants to Be Like You",
    metin:
      "A young soldier under your command confessed he plans to dive into the enemy line alone the way you did — he wants to create his own legend. If you don't stop him he'll probably die.",
    secenekler: [
      {
        metin: "Pull him aside, tell him the real price.",
        ipucu: "A hard talk, a life you could save",
        basariliSonuc: {
          mesaj: "The young soldier listened to you, the fire in his eyes dimmed a little but his sense returned.",
          detay: "The one thing you didn't tell him was that you haven't slept the same since that night either.",
        },
        basarisizSonuc: {
          mesaj: "Your words didn't reach him; he still wants to be like you, he just learned to hide it from you.",
          detay: "Some fires go out not by warning but only by burning.",
        },
      },
      {
        metin: "Don't get involved, say everyone has the right to chart their own path.",
        ipucu: "Easy but it tests your conscience",
        basariliSonuc: {
          mesaj: "You didn't get involved, the soldier made his own decision; you'll see the outcome in time.",
          detay: "You can't make every decision, you know that, but it still gnaws at you.",
        },
        basarisizSonuc: {
          mesaj: "The young soldier followed your example and fell into an ambush; by the time they found him it was too late.",
          detay: "At his funeral no one asked what you felt — they all thought they already knew.",
        },
      },
    ],
  },

  oc_asker_kahraman_18: {
    baslik: "Commander of the Great Battle",
    metin:
      "The {bolge} army prepares for the biggest battle it has awaited for years; command of the right wing has been given entirely to you. Walking the ranks you see the soldiers no longer want an order but to hear your voice.",
    secenekler: [
      {
        metin: "Lead the front personally, fight at the very front.",
        ipucu: "A legendary victory, a heavy price",
        basariliSonuc: {
          mesaj: "The right wing scattered the enemy, the victory was spoken of with your name.",
          detay: "But at the victory celebrations you're aware of the missing voices too.",
        },
        basarisizSonuc: {
          mesaj: "Your wing fell apart, you were pulled from the front badly wounded.",
          detay: "The defeat overshadowed in an instant every victory you'd won.",
        },
      },
      {
        metin: "Command from the rear, trust your soldiers, spread the risk.",
        ipucu: "Less glory, more lives saved",
        basariliSonuc: {
          mesaj: "The wing advanced in order, the losses were few; the victory wasn't brilliant but it was solid.",
          detay: "Being a commander demands more now than running at the front.",
        },
        basarisizSonuc: {
          mesaj: "Some officers read your commanding from the rear as 'the old hero doesn't fight at the front anymore'.",
          detay: "As your rank grows, what's expected of you contradicts itself strangely.",
        },
      },
      {
        metin: "Strike the enemy from the flank with a risky maneuver, surprise the commanders.",
        ipucu: "A brilliant victory or a catastrophe",
        basariliSonuc: {
          mesaj: "The maneuver worked, you split the enemy ranks in two; it became a move for the history books.",
          detay: "Even years later this maneuver will be told in the barracks.",
        },
        basarisizSonuc: {
          mesaj: "The maneuver had been foreseen by the enemy, your wing took heavy losses.",
          detay: "Boldness isn't always rewarded.",
        },
      },
    ],
  },

  oc_asker_kahraman_19: {
    baslik: "The Weight of the Legacy",
    metin:
      "You visit the graves of the comrades you lost over the years; while the people immortalize you in songs, you try to remember their names one by one. As the legend grows, the real memories seem to shrink.",
    secenekler: [
      {
        metin: "Visit each grave one by one, speak their names aloud.",
        ipucu: "A heavy but honorable reckoning of conscience",
        basariliSonuc: {
          mesaj: "You spoke each name, the wind took your words but you made a place for them inside you.",
          detay: "The legend may belong to the people, but the memories were still only yours.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't remember some of the names; that hurt more than any sword stroke.",
          detay: "Forgetting is a thing too, as much as remembering.",
        },
      },
      {
        metin: "Leave the past behind, focus only on today.",
        ipucu: "An easy escape, an account that never fully closes",
        basariliSonuc: {
          mesaj: "You looked forward, your shoulders lightened; but at night some names still come back.",
          detay: "Looking forward doesn't mean forgetting what's behind entirely.",
        },
        basarisizSonuc: {
          mesaj: "Trying to forget didn't work, the past wouldn't let go.",
          detay: "Some accounts refuse to be closed.",
        },
      },
    ],
  },

  oc_asker_kahraman_20: {
    baslik: "A Name Carved in Stone",
    metin:
      "By the lord's order a monument bearing your name is raised in the barracks courtyard; future soldiers passing this stone will learn your story. Standing before it, you feel that though the name is yours, the story is bigger than you now.",
    secenekler: [
      {
        metin: "Speak at the ceremony, tell the story to future generations with your own voice.",
        ipucu: "A lasting legacy, a great responsibility",
        basariliSonuc: {
          mesaj: "Your words left a mark more lasting than the stone; there was a real fire in the young soldiers' eyes as they listened.",
          detay: "Maybe the greatest legacy you leave isn't the stone but the fire in those eyes.",
        },
        basarisizSonuc: {
          mesaj: "Your words couldn't match the grandeur of the stone, the ceremony stayed a cold ceremony.",
          detay: "Some stories want something beyond words.",
        },
      },
      {
        metin: "Stay silent before the monument, just watch.",
        ipucu: "Humble but distant",
        basariliSonuc: {
          mesaj: "Your silence said more than words; everyone bowed before the stone with respect.",
          detay: "Some moments are completed without speaking.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was mistaken for arrogance by some, they whispered 'he thinks too highly of himself'.",
          detay: "Even in the stone's shadow, there are those who read you wrong.",
        },
      },
      {
        metin: "Refuse the monument, ask that your name be carved not in stone but in the soldiers' memory.",
        ipucu: "A rare humility, a risk of offending the lord",
        basariliSonuc: {
          mesaj: "The lord was surprised at first, then appreciated your stance; the monument was raised anyway but your words echoed more among the soldiers.",
          detay: "You know your real legacy lives not in stone but in the memory of those who stood shoulder to shoulder with you.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal was counted as disrespect, the lord was offended; the monument was raised anyway, but you weren't invited to the ceremony.",
          detay: "Sometimes even humility can be misunderstood.",
        },
      },
    ],
  },

  oc_asker_firari_01: {
    baslik: "The Prison Camp",
    metin:
      "When you opened your eyes there were rust-crusted chains on your wrists and a roof of mud above you. The sentries shout in a language you don't understand, and even the prisoners beside you size you up. A moment ago you were on a battlefield; now your only concern is making it to morning.",
    secenekler: [
      {
        metin: "Bow your head, observe without being seen.",
        ipucu: "You stay safe but your honor shrinks",
        basariliSonuc: {
          mesaj: "You got through the day without drawing anyone's attention; the sentries can't even tell you apart from an ordinary prisoner.",
          detay: "Surviving sometimes means learning to be invisible.",
        },
        basarisizSonuc: {
          mesaj: "Even your silence wasn't enough; a sentry whipped you for an arbitrary reason.",
          detay: "There's no justice sought here, only the sentry's mood that day.",
        },
      },
      {
        metin: "Quietly build solidarity with the prisoners beside you.",
        ipucu: "You gain friendship, you could also draw attention",
        basariliSonuc: {
          mesaj: "A quiet trust grew between you and the prisoners you whispered with on empty stomachs.",
          detay: "Shared hunger is lighter than hunger borne alone.",
        },
        basarisizSonuc: {
          mesaj: "Your whispering drew a sentry's attention; you were all punished together.",
          detay: "Even trust costs dearly here.",
        },
      },
      {
        metin: "Do small services for a sentry, try to gain a privilege.",
        ipucu: "A small comfort, mistrust among the prisoners",
        basariliSonuc: {
          mesaj: "You made yourself useful to the sentry; in return you got an extra crust of bread and a little respect.",
          detay: "The other prisoners look at you differently now.",
        },
        basarisizSonuc: {
          mesaj: "The sentry didn't like your offer, and the other prisoners thought you a collaborator.",
          detay: "You neither gained nor lost anything, you just became isolated.",
        },
      },
    ],
  },

  oc_asker_firari_02: {
    baslik: "The Escape Plan",
    metin:
      "As the weeks passed you memorized the camp's routine: the watch-change hours, a loose fence post, the supply carts that come once a month. An escape is on your mind now — but will you act alone, or with a few prisoners you trust?",
    secenekler: [
      {
        metin: "Make the plan alone, tell no one.",
        ipucu: "The secret stays with you, you're left without help",
        basariliSonuc: {
          mesaj: "You quietly worked out an escape route on your own; no one knows, no one can betray you.",
          detay: "Loneliness is sometimes the most trustworthy confidant.",
        },
        basarisizSonuc: {
          mesaj: "While examining the fence you caught a sentry's eye; you're watched with suspicion now.",
          detay: "Planning alone can also mean making a mistake alone.",
        },
      },
      {
        metin: "Make a joint plan with a few prisoners you trust.",
        ipucu: "A stronger plan, the risk of being betrayed grows",
        basariliSonuc: {
          mesaj: "You secretly agreed with three prisoners; each of you has a separate task now.",
          detay: "A shared hope weighs less than one carried alone.",
        },
        basarisizSonuc: {
          mesaj: "One of you whispered the plan to the sentries for an extra ration.",
          detay: "Trust here sometimes turns into the costliest mistake.",
        },
      },
    ],
  },

  oc_asker_firari_03: {
    baslik: "The Escape Attempt",
    metin:
      "No moon, the sky pitch black; the noise of the supply cart has drawn the sentries' attention. The night you've waited for has finally come. With your heart pounding like a drum in your chest, you crawl toward the loose spot in the fence.",
    secenekler: [
      {
        metin: "Move now, take the risk.",
        ipucu: "Freedom or a very heavy price",
        basariliSonuc: {
          mesaj: "You slipped under the fence and dove into the dark; the camp lights behind you grew smaller and smaller.",
          detay: "Freedom feels heavy even at the first breath.",
        },
        basarisizSonuc: {
          mesaj: "A dog's bark gave you away; you were caught, and your chains are heavier this time.",
          detay: "Some nights don't take you where you want to go.",
        },
      },
      {
        metin: "Give it up, wait for a safer chance.",
        ipucu: "Safe but your hope is postponed",
        basariliSonuc: {
          mesaj: "You pulled back; 'not tonight' you told yourself, and still the fire in you didn't go out.",
          detay: "Patience is sometimes a harder choice than courage.",
        },
        basarisizSonuc: {
          mesaj: "Even while waiting your unease was noticed; the sentries watch you more closely now.",
          detay: "Sometimes even doing nothing has a price.",
        },
      },
    ],
  },

  oc_asker_firari_04: {
    baslik: "In Foreign Lands",
    metin:
      "You left the camp behind but the danger isn't over. Your clothes give you away, your speech carries a foreign accent. When you reach a border village you have to decide what to tell those who ask who you are.",
    secenekler: [
      {
        metin: "Take on the identity of a dead traveling merchant.",
        ipucu: "A new name, a risk of being discovered",
        basariliSonuc: {
          mesaj: "You took the papers off a body you found on the road; you're someone else now.",
          detay: "Setting your own name aside was easier than you thought.",
        },
        basarisizSonuc: {
          mesaj: "The papers weren't enough for the questioning; the villagers turned you away with suspicion.",
          detay: "However good the lie, sometimes there's no one to believe it.",
        },
      },
      {
        metin: "Hide your real past, say only 'a traveler fleeing the war'.",
        ipucu: "A simpler lie, less security",
        basariliSonuc: {
          mesaj: "The villagers gave you shelter for a night without questioning; no one asked too many questions.",
          detay: "In the war years, fugitives like you are not few.",
        },
        basarisizSonuc: {
          mesaj: "You were met with suspicion, they didn't even let you stay one night; you went on hungry and tired.",
          detay: "Not everyone trusts a fugitive.",
        },
      },
      {
        metin: "Knock on a monastery door, ask for sanctuary.",
        ipucu: "A temporary safety, it creates a religious debt",
        basariliSonuc: {
          mesaj: "The monks took you in without questions; you rested in a warm bed for a few days.",
          detay: "Some doors open without asking your past.",
        },
        basarisizSonuc: {
          mesaj: "The monastery turned you away on the grounds it was full; you took to the roads again.",
          detay: "Not every door opens for you.",
        },
      },
    ],
  },

  oc_asker_firari_05: {
    baslik: "A New Name",
    metin:
      "You've been on the roads for months; you seem to have forgotten your old name. In a port town a foreman who doesn't question your identity offers you cargo-hauling work — the wage is low but so are the questions.",
    secenekler: [
      {
        metin: "Take the job, work quietly.",
        ipucu: "Little gain, a safe cover",
        basariliSonuc: {
          mesaj: "Days passed with sacks on your back; no one looked at you and thought you were a soldier.",
          detay: "Callused hands were the best thing to hide your past.",
        },
        basarisizSonuc: {
          mesaj: "A heavy load hurt your back; the foreman still paid you short.",
          detay: "Even your labor doesn't get its full worth here.",
        },
      },
      {
        metin: "Bargain for a better wage.",
        ipucu: "More gain, a risk of drawing attention",
        basariliSonuc: {
          mesaj: "Your insistence worked; the foreman paid you more than you expected.",
          detay: "Sometimes surviving takes a little boldness too.",
        },
        basarisizSonuc: {
          mesaj: "Your bargaining angered the foreman; he fired you and hired someone else.",
          detay: "Drawing too much attention is a luxury for a fugitive.",
        },
      },
    ],
  },

  oc_asker_firari_06: {
    baslik: "Sword for Hire",
    metin:
      "A caravan owner realized from the calluses on your hands that you're a soldier; he wants to hire you as an escort. Girding on a weapon means one step closer to your old life — but hunger is just as real.",
    secenekler: [
      {
        metin: "Accept the offer, take up your sword again.",
        ipucu: "Good money, facing the ghosts of your old life",
        basariliSonuc: {
          mesaj: "You protected the caravan from bandits; however foreign the sword felt in your hand, it did its job.",
          detay: "Arms that once belonged to an army now serve a merchant.",
        },
        basarisizSonuc: {
          mesaj: "You were badly wounded in a raid; still, the caravan owner didn't abandon you on the road.",
          detay: "Fighting weighs the same even without a uniform.",
        },
      },
      {
        metin: "Refuse, look for unarmed work.",
        ipucu: "Safer, further from your past",
        basariliSonuc: {
          mesaj: "You didn't touch a weapon; instead you found small work in the warehouses.",
          detay: "Sometimes the greatest victory is being able to choose not to fight.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't find work and went hungry for a few days; your stomach paid for setting down your sword.",
          detay: "Your principles don't always feed you.",
        },
      },
    ],
  },

  oc_asker_firari_07: {
    baslik: "A Messenger",
    metin:
      "In a market you find a merchant heading to your homeland. You could send your family a few lines telling them you're alive — but every letter can also leave a trail for those looking for you.",
    secenekler: [
      {
        metin: "Send the letter, take the risk.",
        ipucu: "Your family's peace of mind, a risk to your own safety",
        basariliSonuc: {
          mesaj: "The letter reached your family; for the first time in years you could say 'I'm alive' to someone who wasn't hunting you.",
          detay: "Some words feel lighter than the heaviest chains.",
        },
        basarisizSonuc: {
          mesaj: "The merchant let it slip; a few weeks later strangers asking about you appeared in the village, and you had to move at once.",
          detay: "Even love sometimes gives you away.",
        },
      },
      {
        metin: "Give it up, keep your silence.",
        ipucu: "Safe but the loneliness grows heavier",
        basariliSonuc: {
          mesaj: "You tore up the letter without writing it; your safety outweighed your longing.",
          detay: "Some silences are born not of love but of fear.",
        },
        basarisizSonuc: {
          mesaj: "Your indecision ate at you for days; in the end you did nothing, only your regret grew.",
          detay: "Sometimes the worst choice is making no choice.",
        },
      },
    ],
  },

  oc_asker_firari_08: {
    baslik: "A Suspicious Favor",
    metin:
      "Your forged papers don't get past a border guard's eye; the man pulls you aside and asks for money 'to avoid trouble'. You have to trust this man who is neither the law nor a friend.",
    secenekler: [
      {
        metin: "Give him the money he wants, pass quietly.",
        ipucu: "It costs you money but leaves no trail",
        basariliSonuc: {
          mesaj: "You gave the money, the man winked and let you through; it was a cheap price.",
          detay: "Some doors open only with silver.",
        },
        basarisizSonuc: {
          mesaj: "He took the money but had you caught anyway; he'd told another guard more.",
          detay: "A bribe sometimes just sets the price of the next demand.",
        },
      },
      {
        metin: "Bargain with him, pay only half.",
        ipucu: "A cheap escape, a risk of angering him",
        basariliSonuc: {
          mesaj: "You bargained, the man agreed though grumbling; you kept a little money.",
          detay: "Sometimes boldness is worth more than thrift.",
        },
        basarisizSonuc: {
          mesaj: "Your bargaining angered the man; he took the money by force and had you beaten well.",
          detay: "You don't bargain with some men.",
        },
      },
      {
        metin: "Refuse, try to escape by blending into the crowd.",
        ipucu: "A free escape, a heavy risk",
        basariliSonuc: {
          mesaj: "You blended into the crowd; even if the man kept after you, he lost you.",
          detay: "Sometimes the only way out is your quick legs.",
        },
        basarisizSonuc: {
          mesaj: "You were caught, beaten and stripped of everything on you; still you barely saved your life.",
          detay: "Your pride is sometimes a price your body pays.",
        },
      },
    ],
  },

  oc_asker_firari_09: {
    baslik: "Bounty Hunters",
    metin:
      "In an inn you see a poster shouting your name and description: deserter, reward. Two men at the same inn are sizing you up too carefully — maybe coincidence, maybe not.",
    secenekler: [
      {
        metin: "Quietly leave the inn, disappear without a trace.",
        ipucu: "A safe exit, and a bit of lost cash",
        basariliSonuc: {
          mesaj: "You left your meal half-finished and slipped out the back door; you left the city before the two men noticed you.",
          detay: "Sometimes the best fight is the one you never enter.",
        },
        basarisizSonuc: {
          mesaj: "You were caught before reaching the door; after a short but hard fight you barely got away.",
          detay: "Even fleeing sometimes demands a price.",
        },
      },
      {
        metin: "Watch the men and deal with them first.",
        ipucu: "You remove the threat, a bloody business",
        basariliSonuc: {
          mesaj: "You finished it in a dark street; the bounty hunters will never hunt anyone again.",
          detay: "Surviving turns you into someone you didn't want to be.",
        },
        basarisizSonuc: {
          mesaj: "The plan went wrong, one of them wounded you; you barely saved your life and fled the city.",
          detay: "Not every calculation adds up.",
        },
      },
    ],
  },

  oc_asker_firari_10: {
    baslik: "A Reckoning in a Hut",
    metin:
      "Fleeing a storm, you take shelter in a monk's hut. As the old man gives you food he asks: 'Did you flee, or did you survive?' You can't even give yourself the answer.",
    secenekler: [
      {
        metin: "Tell him the truth, pour your heart out.",
        ipucu: "Your conscience lightens, one more person knows your secret",
        basariliSonuc: {
          mesaj: "The monk listened without judging you; 'surviving is not a sin,' he said.",
          detay: "Some words lighten a burden you've carried for years.",
        },
        basarisizSonuc: {
          mesaj: "What you told unsettled the monk; he didn't say he believed you, just nodded in silence.",
          detay: "Not every confession brings the peace you seek.",
        },
      },
      {
        metin: "Stay silent, leave his question unanswered.",
        ipucu: "Your secret stays safe, your loneliness grows",
        basariliSonuc: {
          mesaj: "You only nodded; the monk didn't press, held out another bowl of hot soup.",
          detay: "Some questions deserve to stay unanswered.",
        },
        basarisizSonuc: {
          mesaj: "Your silence said more than words; you turned your head away so as not to see the pity in the monk's eyes.",
          detay: "Sometimes silence speaks heavier than a confession.",
        },
      },
    ],
  },

  oc_asker_firari_11: {
    baslik: "The Old Commander",
    metin:
      "In a market square, among the crowd, a face catches your eye: your old commander, who survived the battle where you were taken prisoner. His eyes meet yours — you can't tell if he recognized you or not.",
    secenekler: [
      {
        metin: "Go up to him, explain yourself.",
        ipucu: "A chance to clear your past, a great risk",
        basariliSonuc: {
          mesaj: "Your commander heard you out; he said being taken prisoner wasn't cowardice, that he was there that day.",
          detay: "Sometimes one person's belief lightens a shame you've carried for years.",
        },
        basarisizSonuc: {
          mesaj: "Your commander declared you a deserter and called the guards; you barely got away.",
          detay: "The past sometimes doesn't forgive.",
        },
      },
      {
        metin: "Ignore him, blend into the crowd.",
        ipucu: "Safe but you never face your past",
        basariliSonuc: {
          mesaj: "You turned your head and walked off; your commander didn't notice you, or pretended not to.",
          detay: "Not facing some ghosts is a choice too.",
        },
        basarisizSonuc: {
          mesaj: "Even walking away you noticed you kept glancing at him from the corner of your eye; you didn't sleep at all that night.",
          detay: "What you flee sometimes only grows in your own mind.",
        },
      },
    ],
  },

  oc_asker_firari_12: {
    baslik: "Eyes That Recognize You",
    metin:
      "In a port city you come face to face with one of the sentries who beat you in the prison camp — he's out of uniform now too, clearly someone who fled that side as well. You each carry the other's secret.",
    secenekler: [
      {
        metin: "Talk to him, propose a kind of truce.",
        ipucu: "A shared secret, hard to trust",
        basariliSonuc: {
          mesaj: "You came to an understanding in a strange silence: you both pretended not to have seen each other.",
          detay: "Sometimes the hardest peace is the one never spoken.",
        },
        basarisizSonuc: {
          mesaj: "Your talking raised the tension; the man walked off angry, and you don't know if he'll report you.",
          detay: "The past sometimes doesn't want to make peace.",
        },
      },
      {
        metin: "Walk away without being noticed.",
        ipucu: "It postpones the risk but doesn't end it",
        basariliSonuc: {
          mesaj: "You blended into the crowd and vanished; still your heart raced for hours.",
          detay: "The past sometimes just waits for you to turn a corner.",
        },
        basarisizSonuc: {
          mesaj: "The man recognized you and ran after you; you barely slipped free.",
          detay: "Some faces find you even years later.",
        },
      },
    ],
  },

  oc_asker_firari_13: {
    baslik: "Forged Papers",
    metin:
      "At a city gate the guards ask everyone's identity; when your turn comes you'll see how sturdy the forged papers in your pocket are.",
    secenekler: [
      {
        metin: "Look calm, hand them over with confidence.",
        ipucu: "Composure helps, but there's no guarantee",
        basariliSonuc: {
          mesaj: "The guard glanced over the papers and let you go; even you were surprised your hands didn't tremble.",
          detay: "Sometimes the best weapon is the calm on your face.",
        },
        basarisizSonuc: {
          mesaj: "The guard found an inconsistency in the papers; they took you for questioning, but you got out with a bribe.",
          detay: "A lie can't always escape careful eyes.",
        },
      },
      {
        metin: "Blend into the crowd and slip out unnoticed.",
        ipucu: "Risky but a way out without papers",
        basariliSonuc: {
          mesaj: "With a carter's help you slipped through the back streets; it's as if you never went through the gate.",
          detay: "Sometimes the safest way is never being seen at all.",
        },
        basarisizSonuc: {
          mesaj: "You were caught fleeing; you were beaten and stripped of your money, but at least not thrown in the dungeon.",
          detay: "Trying to run is sometimes more dangerous than staying.",
        },
      },
    ],
  },

  oc_asker_firari_14: {
    baslik: "A New Flag",
    metin:
      "The army of a foreign lord is looking for experienced fighters; they don't question your identity, they only ask if you know how to use a sword. You don't know whether you can forget that you once fought under another flag.",
    secenekler: [
      {
        metin: "Join, become a mercenary.",
        ipucu: "Steady money, a sense of betraying your old oath",
        basariliSonuc: {
          mesaj: "You fought under a new flag; the pay is good, but in every battle you remembered your old oath.",
          detay: "For a soldier the flag can change, the conscience doesn't.",
        },
        basarisizSonuc: {
          mesaj: "You were badly wounded in the first clash; the foreign lord left you on the field without paying.",
          detay: "A disloyal army demands a disloyal price.",
        },
      },
      {
        metin: "Refuse, never raise your weapon for anyone again.",
        ipucu: "Your conscience is at ease, your pocket stays empty",
        basariliSonuc: {
          mesaj: "You turned the offer down; you may go hungry but at least you betrayed no one.",
          detay: "Some lines even hunger can't erode.",
        },
        basarisizSonuc: {
          mesaj: "Because you refused you couldn't find other work either; you spent your days begging.",
          detay: "Having principles doesn't fill your belly.",
        },
      },
      {
        metin: "Join only briefly, for a single one-off mission.",
        ipucu: "Limited risk, limited gain",
        basariliSonuc: {
          mesaj: "You completed the one-off mission, took your pay and left at once.",
          detay: "Sometimes the smartest choice is not committing.",
        },
        basarisizSonuc: {
          mesaj: "You were lightly wounded during the mission, and on top of that you got only half the promised pay.",
          detay: "Even short missions sometimes end heavy.",
        },
      },
    ],
  },

  oc_asker_firari_15: {
    baslik: "Road Fever",
    metin:
      "You've been walking in the rain for days; your body can't take it anymore, your fever is rising. You reach a village but you're short of money and a physician is hard to find — you have to ask for help without explaining who you are.",
    secenekler: [
      {
        metin: "Take the risk, go to a healer.",
        ipucu: "A hope of recovery, a risk of your identity coming out",
        basariliSonuc: {
          mesaj: "The healer woman cured you without asking questions, she just took the last of your money.",
          detay: "Some people care not about a stranger's past but only about his state right now.",
        },
        basarisizSonuc: {
          mesaj: "The healer asked questions as if she'd report you rather than give medicine; you took your money and hurried off.",
          detay: "Trusting is always a gamble here.",
        },
      },
      {
        metin: "Wait to heal on your own, hide.",
        ipucu: "No one sees you, but the fever may not break",
        basariliSonuc: {
          mesaj: "You shivered for days in an abandoned barn; the fever slowly broke but your body is still weak.",
          detay: "Falling ill alone is the coldest loneliness.",
        },
        basarisizSonuc: {
          mesaj: "Your fever worsened, you lay unconscious for days; a shepherd found you and brought you back to life.",
          detay: "You came back from the edge of death by chance.",
        },
      },
    ],
  },

  oc_asker_firari_16: {
    baslik: "A Chance to Clear Your Name",
    metin:
      "An innkeeper tells you that the ambush that got you captured that day was actually the betrayal of an officer in your unit; now that officer is being tried for another crime and your testimony could sink him — but it would expose you too.",
    secenekler: [
      {
        metin: "Go to the court, testify.",
        ipucu: "You could clear your name, you could also be caught as a deserter",
        basariliSonuc: {
          mesaj: "Your testimony brought the officer's betrayal to light; your name was spoken as 'victim', not 'fugitive'.",
          detay: "For the first time in years, you could make peace with your past.",
        },
        basarisizSonuc: {
          mesaj: "The court didn't hear your testimony, and arrested you as a deserter on top of it; you barely got away.",
          detay: "Sometimes speaking the truth pushes you into a deeper pit.",
        },
      },
      {
        metin: "Stay silent, protect your safety.",
        ipucu: "You stay safe, the chance won't come again",
        basariliSonuc: {
          mesaj: "You told the innkeeper you'd heard nothing and walked away; the chance slipped through your fingers.",
          detay: "Some chances never knock on your door again.",
        },
        basarisizSonuc: {
          mesaj: "Your silence ate at you; you still think about that officer's name at night.",
          detay: "Words you don't say carry a weight too.",
        },
      },
    ],
  },

  oc_asker_firari_17: {
    baslik: "A Secret Visit",
    metin:
      "Years later you pass along a road near your homeland. A detour of just a few hours would be enough to see your family one more time — but there could still be someone in your village who knows you.",
    secenekler: [
      {
        metin: "Go home secretly at night.",
        ipucu: "You reunite with your family, the risk of being recognized is great",
        basariliSonuc: {
          mesaj: "When you knocked, the astonishment in your mother's eyes was worth everything you'd carried for years.",
          detay: "Some moments forgive a whole life of fleeing.",
        },
        basarisizSonuc: {
          mesaj: "A neighbor noticed you and shouted; you had to flee into the dark without a word to your family.",
          detay: "Sometimes the moment you're closest to love is the most dangerous.",
        },
      },
      {
        metin: "Give it up, settle for looking from a distance.",
        ipucu: "Safe but the longing doesn't end",
        basariliSonuc: {
          mesaj: "From the hill you watched the smoke rising from your home's chimney, then quietly turned back.",
          detay: "Sometimes loving is accepting watching from a distance.",
        },
        basarisizSonuc: {
          mesaj: "Even looking from a distance tore you apart; for days you couldn't touch anything.",
          detay: "Distance doesn't always provide protection.",
        },
      },
    ],
  },

  oc_asker_firari_18: {
    baslik: "A New Life",
    metin:
      "In a small town they accepted you without asking about your past. With your savings you could open a small shop, build a rooted life under your false name — maybe you really are that man now.",
    secenekler: [
      {
        metin: "Open the shop, settle in the town.",
        ipucu: "A lasting life, your past always remains a shadow",
        basariliSonuc: {
          mesaj: "The shop opened, the townsfolk knew you as 'a quiet but honest man'.",
          detay: "Maybe identity isn't in the name you were born with but in the life you live.",
        },
        basarisizSonuc: {
          mesaj: "The first months were hard, you had to close the shop for lack of customers.",
          detay: "Building a new life costs more than you thought.",
        },
      },
      {
        metin: "Don't settle, keep moving.",
        ipucu: "Safer, you never have a permanent home",
        basariliSonuc: {
          mesaj: "A week later you threw your bag over your shoulder again; putting down roots still feels dangerous to you.",
          detay: "Some fugitives forget how to stop.",
        },
        basarisizSonuc: {
          mesaj: "The constant moving wore you out; you no longer knew what you were fleeing or what you were looking for.",
          detay: "Walking without stopping is a kind of prison too.",
        },
      },
      {
        metin: "Half-settle in the town but always keep your escape plan ready.",
        ipucu: "You strike a balance, you never reach full peace",
        basariliSonuc: {
          mesaj: "You chose to live half-rooted, half-ready; neither fully at peace nor fully on edge, but you found your balance.",
          detay: "For some people safety always means leaving an escape door.",
        },
        basarisizSonuc: {
          mesaj: "Being always on alert wore you out; you neither fully blended into the town nor counted as truly ready.",
          detay: "Being caught between two states is sometimes the most exhausting.",
        },
      },
    ],
  },

  oc_asker_firari_19: {
    baslik: "Caravan Guide",
    metin:
      "Your experience makes you one of the rare people who know the dangerous mountain passes. A merchant caravan is looking for a safe guide; the pay offered is good but on the road you'll face bandits, harsh nature, and your own past.",
    secenekler: [
      {
        metin: "Accept the guiding job.",
        ipucu: "Good pay and respect, an exhausting and dangerous road",
        basariliSonuc: {
          mesaj: "You brought the caravan safely through the pass; the merchant is grateful, your name spread along the road.",
          detay: "The one thing left from your army years turned out to be knowing these mountains like the back of your hand.",
        },
        basarisizSonuc: {
          mesaj: "An avalanche buried half the caravan; those you saved thanked you but your conscience isn't at ease.",
          detay: "Nature doesn't care who's a fugitive and who isn't.",
        },
      },
      {
        metin: "Refuse, look for calmer work.",
        ipucu: "Safe but an ordinary life",
        basariliSonuc: {
          mesaj: "You turned down the guiding job and found calmer work at the harbor.",
          detay: "Sometimes not seeking adventure is a form of courage too.",
        },
        basarisizSonuc: {
          mesaj: "The calm work didn't pan out either; you were left empty-handed for a few days.",
          detay: "Roads that look safe sometimes give you away too.",
        },
      },
    ],
  },

  oc_asker_firari_20: {
    baslik: "The Final Decision",
    metin:
      "With the 'deserter' mark you've carried on your shoulders for years, you're alone with a question you never stopped asking yourself: was fleeing that night cowardice, or the instinct to survive? Maybe the answer no longer matters as much as the question itself.",
    secenekler: [
      {
        metin: "Leave your past entirely behind, accept this new name as your real identity.",
        ipucu: "You find inner peace, your old identity is buried forever",
        basariliSonuc: {
          mesaj: "You don't wake with your old name at night anymore; this life became your real life.",
          detay: "Some people carry not the identity they lost but the new one they built.",
        },
        basarisizSonuc: {
          mesaj: "You tried to accept it but you still wake with your old name at night; some pasts refuse to be forgotten.",
          detay: "Peace doesn't always come with a decision.",
        },
      },
      {
        metin: "Face your past, look for a way to take up your real identity once more.",
        ipucu: "You could win back your honor, you put everything at risk",
        basariliSonuc: {
          mesaj: "You decided to carry your old name again; you're ready to pay the price for it now.",
          detay: "Some people stop fleeing and choose to return where they came from.",
        },
        basarisizSonuc: {
          mesaj: "Calling your past back also woke those who wanted to forget; you paid a heavy price.",
          detay: "Some doors close never to open again.",
        },
      },
    ],
  },

  oc_asker_hain_01: {
    baslik: "A Code Name",
    metin:
      "The enemy agent finds you a second time. This time it's not a one-off exchange; he teaches you a code name, a method of communicating with a stone sign, and a phrase to say in an emergency. You're part of a system now.",
    secenekler: [
      {
        metin: "Learn the system, follow the rules meticulously.",
        ipucu: "You win their trust, turning back gets harder at every step",
        basariliSonuc: {
          mesaj: "You memorized the instructions; the agent left satisfied. You're not on the side of this business now, you're part of it.",
          detay: "Being a cog in a machine makes getting free of it harder too.",
        },
        basarisizSonuc: {
          mesaj: "You mixed up the signs, the agent grew impatient; he told you to be more careful.",
          detay: "There's no margin for error in this work, you're learning that now.",
        },
      },
      {
        metin: "Learn the system but keep an escape plan in mind too.",
        ipucu: "You act cautiously, your focus wavers",
        basariliSonuc: {
          mesaj: "You took the instructions, but always kept an escape route hidden in a corner of your mind.",
          detay: "Maybe the spies who survive are the ones who never fully trust.",
        },
        basarisizSonuc: {
          mesaj: "Your distraction was noticed; the agent left suspicious of you.",
          detay: "Mistrust is a knife that cuts both ways.",
        },
      },
      {
        metin: "Learn the danger but make no further commitment, keep your distance.",
        ipucu: "You loosen the bond, the agent's trust doesn't fully form",
        basariliSonuc: {
          mesaj: "You learned the system but didn't fully hand yourself over; the agent sensed it, a cautious distance stayed between you.",
          detay: "A half commitment may be the smartest way to survive.",
        },
        basarisizSonuc: {
          mesaj: "Your distance looked like mistrust to the agent; your relationship started tense from the very beginning.",
          detay: "Caution sometimes raises as much suspicion as betrayal itself.",
        },
      },
    ],
  },

  oc_asker_hain_02: {
    baslik: "Hidden Gold",
    metin:
      "The gold you took sits like a crime growing heavier under your pillow. If you spend it, they'll ask where you found money many times a private's monthly wage; if you don't spend it, this weight keeps you awake at night.",
    secenekler: [
      {
        metin: "Bury the money in the ground, be patient.",
        ipucu: "Safe but your money does you no good",
        basariliSonuc: {
          mesaj: "You buried the gold one night in a place no one knows; at least it's safe for now.",
          detay: "Your wealth means nothing as long as you can't touch it.",
        },
        basarisizSonuc: {
          mesaj: "A flock of sheep trampled the spot you buried it; you dug up the earth and lost some of it.",
          detay: "Even the safest hiding place is at the mercy of luck.",
        },
      },
      {
        metin: "Spend it in small amounts, say you won it at gambling.",
        ipucu: "You can use your money, but your lie is a rotten foundation",
        basariliSonuc: {
          mesaj: "You said you won it at the dice table and spent a few coins; no one questioned it.",
          detay: "A small lie can cover a big secret — for now.",
        },
        basarisizSonuc: {
          mesaj: "A private said loudly that he'd never seen you gamble; the others laughed but you shuddered.",
          detay: "Every lie has a witness.",
        },
      },
    ],
  },

  oc_asker_hain_03: {
    baslik: "The First Doubt",
    metin:
      "{dost} has noticed you've been distracted lately, that you vanish when the night watch ends. When he asks he looks straight into your eyes; someone who's known you for years catches your lie at once.",
    secenekler: [
      {
        metin: "Tell him a partial truth, invent a love story.",
        ipucu: "Convincing but it could tie you down in the future",
        basariliSonuc: {
          mesaj: "{dost} believed you were meeting a secret lover and smiled; he swore he'd tell no one your secret.",
          detay: "A lie is sometimes more convincing than the truth.",
        },
        basarisizSonuc: {
          mesaj: "{dost} didn't believe your story; 'you're lying to me,' he said, and walked off.",
          detay: "An old friend's suspicion is heavier than an enemy's.",
        },
      },
      {
        metin: "Come out hard, tell him not to meddle in your private life.",
        ipucu: "You silence him but a distance grows between you",
        basariliSonuc: {
          mesaj: "Your words forced {dost} to back off; he never asked again but he doesn't look at you the way he used to.",
          detay: "Some bonds are cut to protect them.",
        },
        basarisizSonuc: {
          mesaj: "Your anger made {dost} even more suspicious; you feel he's watching you now.",
          detay: "A defensive anger is often guilt itself.",
        },
      },
      {
        metin: "Ask him for help too, share the danger.",
        ipucu: "Very risky but you might win your one true ally",
        basariliSonuc: {
          mesaj: "{dost} listened in shock but didn't give you away; you both carry this secret now.",
          detay: "Sharing a secret sometimes lightens it, sometimes doubles it.",
        },
        basarisizSonuc: {
          mesaj: "{dost} was horrified, torn between reporting you and staying loyal to you — and went to the commander.",
          detay: "Some secrets are too heavy to be shared.",
        },
      },
    ],
  },

  oc_asker_hain_04: {
    baslik: "A False Trail",
    metin:
      "The enemy agent wants one more thing: to make an innocent private look like the traitor to cover the leak. With a few forged letters and a little nerve, you could steer the suspicion onto someone else.",
    secenekler: [
      {
        metin: "Plant the false evidence, sacrifice the innocent private.",
        ipucu: "You protect yourself, you ruin another life",
        basariliSonuc: {
          mesaj: "The letters were found; the innocent private was sent to the gallows, and you were cleared of all suspicion.",
          detay: "Your conscience will never forget this night, but your neck is still on your shoulders.",
        },
        basarisizSonuc: {
          mesaj: "The evidence was found weak, the inquiry widened; the private who couldn't prove his innocence died looking at you with suspicion.",
          detay: "A bullet wasn't wasted but it fell on your conscience.",
        },
      },
      {
        metin: "Destroy the evidence, make up an excuse for the agent.",
        ipucu: "You protect your conscience, the agent's trust is shaken",
        basariliSonuc: {
          mesaj: "You threw the evidence in the fire; you lied to the agent, saying 'no one suspects anything'.",
          detay: "Saving a person doesn't make you one step less a traitor but it makes you a little less soiled.",
        },
        basarisizSonuc: {
          mesaj: "The agent caught your lie; you lost his trust and got a threat in return.",
          detay: "Giving neither side trust means making enemies of both.",
        },
      },
    ],
  },

  oc_asker_hain_05: {
    baslik: "A Caravan Route",
    metin:
      "This time the information asked for is more concrete: the route a supply caravan will take next week. This information means not just gold but perhaps the lives of the carters who will die on the road.",
    secenekler: [
      {
        metin: "Give the route, take the big payment in return.",
        ipucu: "The highest payment, the heaviest conscience",
        basariliSonuc: {
          mesaj: "You gave the information; the caravan fell into an ambush, and you took your biggest payment yet.",
          detay: "You never heard the carters scream but you can't stop imagining it.",
        },
        basarisizSonuc: {
          mesaj: "The caravan changed course at the last moment, the ambush came to nothing; the agent still paid but chewed you out sharply.",
          detay: "Even a failed betrayal leaves a stain.",
        },
      },
      {
        metin: "Distort the route, protect the caravan indirectly.",
        ipucu: "You ease your conscience, you risk the agent's trust",
        basariliSonuc: {
          mesaj: "The wrong information you gave accidentally saved the caravan; the agent thought it a mistake, and you breathed a quiet sigh of relief.",
          detay: "Sometimes the best betrayal is no betrayal at all.",
        },
        basarisizSonuc: {
          mesaj: "Your distortion was noticed; the agent suspected you'd misled him deliberately, your trust was shaken.",
          detay: "Lying beneath a lie is like stringing a rope over a rope.",
        },
      },
    ],
  },

  oc_asker_hain_06: {
    baslik: "A Night Interrogation",
    metin:
      "A watch officer has heard that information is leaking from the garrison; he's summoning everyone one by one and interrogating them. When your turn comes, even a shifty glance in your eyes could give you away.",
    secenekler: [
      {
        metin: "Stay cold, answer the questions clearly.",
        ipucu: "Your professionalism could save you",
        basariliSonuc: {
          mesaj: "Your voice didn't tremble, your answers were fluid; the officer took you off the list.",
          detay: "Learning to hide fear is the most painful skill of this work.",
        },
        basarisizSonuc: {
          mesaj: "A hesitation on one question caught the officer's attention; they detained you, the interrogation hardened.",
          detay: "A single moment is enough to lose their trust.",
        },
      },
      {
        metin: "Steer the interrogation to another name, spread the suspicion.",
        ipucu: "You save yourself, you darken someone's life",
        basariliSonuc: {
          mesaj: "You pointed to a private who'd acted strangely last week; the officer turned his attention to him.",
          detay: "Hiding in someone else's shadow is the easiest escape.",
        },
        basarisizSonuc: {
          mesaj: "The private you pointed to turned out innocent, the interrogation came back to you; you're watched twice as closely now.",
          detay: "A lie backfires when you least expect it.",
        },
      },
      {
        metin: "Confess a small, unimportant crime (e.g. a gambling debt), distract him.",
        ipucu: "You confess a small sin to hide the big one",
        basariliSonuc: {
          mesaj: "You confessed the gambling debt; the officer counted it a sufficient explanation and let you go.",
          detay: "A small truth is sometimes what best hides a big lie.",
        },
        basarisizSonuc: {
          mesaj: "The officer found your confession inadequate, dug deeper into the interrogation; questions about the real leak started coming.",
          detay: "A small confession sometimes gives birth to bigger suspicions.",
        },
      },
    ],
  },

  oc_asker_hain_07: {
    baslik: "The Enemy's Table",
    metin:
      "At the meeting point it's not the usual agent who greets you but someone in his place — young, sharp-eyed, as tired as you. Your conversation drifts quickly away from business.",
    secenekler: [
      {
        metin: "Keep your distance, finish the business and leave.",
        ipucu: "Safe but your loneliness grows",
        basariliSonuc: {
          mesaj: "You kept it short and left; you did what the work needed, allowed nothing more.",
          detay: "In this life loneliness is sometimes the only safe refuge.",
        },
        basarisizSonuc: {
          mesaj: "Your silence was found strange; the person across from you grew suspicious of you, the tension hung in the air.",
          detay: "Even coldness sometimes draws too much attention.",
        },
      },
      {
        metin: "Let the conversation happen, trust him a little.",
        ipucu: "You form a bond, both your secrets grow",
        basariliSonuc: {
          mesaj: "You talked for hours; for the first time you shared with someone the loneliness of being stuck between two worlds.",
          detay: "Talking with someone who carries the same darkness gives a strange peace.",
        },
        basarisizSonuc: {
          mesaj: "You opened up too much; the person across from you saw it as your weakness and tried to pry more information out of you.",
          detay: "In this world even trust can be a weapon.",
        },
      },
    ],
  },

  oc_asker_hain_08: {
    baslik: "The Price of the Man-at-Arms",
    metin:
      "The rank of man-at-arms cracked the door of the war council for you; the information you hear now isn't simple patrol routes but the whole plan of the coming campaign. The agent comes at you this time with a much bigger offer.",
    secenekler: [
      {
        metin: "Sell the entire campaign plan.",
        ipucu: "The biggest gain yet, the biggest risk",
        basariliSonuc: {
          mesaj: "You gave the plan in full; the agent called you 'a valuable partner' this time.",
          detay: "As your value rises, so does what you have to lose.",
        },
        basarisizSonuc: {
          mesaj: "Someone entering the council meeting may have seen you taking notes at the door; you held your breath for days.",
          detay: "The punishment for big information is big too.",
        },
      },
      {
        metin: "Give only a part that looks unimportant.",
        ipucu: "Less gain, less trail",
        basariliSonuc: {
          mesaj: "The piece you gave meant nothing on its own; the agent was a bit disappointed but made do.",
          detay: "Even small betrayals pile up somewhere.",
        },
        basarisizSonuc: {
          mesaj: "The agent said the information you gave was useless and chewed you out sharply; your trust was shaken a bit.",
          detay: "A half-done disloyalty pleases no side.",
        },
      },
    ],
  },

  oc_asker_hain_09: {
    baslik: "An Unpaid Debt",
    metin:
      "A moneylender checking the debt records going around the barracks notices you have no debt at all, yet don't look poor either. He asks you about the source of this 'hidden fortune'.",
    secenekler: [
      {
        metin: "Give him hush money.",
        ipucu: "Your secret stays, your pocket lightens",
        basariliSonuc: {
          mesaj: "You gave the moneylender a small sum; he swallowed his questions.",
          detay: "The price of silence is cheaper than the price of gossip.",
        },
        basarisizSonuc: {
          mesaj: "The hush money wasn't enough; the moneylender started spreading whispers about you.",
          detay: "Some mouths don't close even with gold.",
        },
      },
      {
        metin: "Threaten him, tell him he'll be sorry if he doesn't stay quiet.",
        ipucu: "A firm solution but you make an enemy",
        basariliSonuc: {
          mesaj: "Your threat worked; the moneylender wouldn't even come near you again.",
          detay: "Fear sometimes creates a more reliable silence than loyalty.",
        },
        basarisizSonuc: {
          mesaj: "The moneylender didn't bow to your threat, and went to the commander to complain about you on top of that.",
          detay: "Showing strength sometimes gives away your weakness.",
        },
      },
      {
        metin: "Bring him in on your business, share your secret.",
        ipucu: "You widen your network, your control lessens",
        basariliSonuc: {
          mesaj: "You brought the moneylender into your business; he answers some questions in your place now.",
          detay: "Every new partner is both a shield and a new weak point.",
        },
        basarisizSonuc: {
          mesaj: "The moneylender turned greedy, threatened you and demanded more.",
          detay: "Sharing a secret is sharing your control over it too.",
        },
      },
    ],
  },

  oc_asker_hain_10: {
    baslik: "An Offer to Come Back",
    metin:
      "An old officer at the garrison pulls you aside: garrison intelligence suspects a leak but doesn't want to accuse anyone. If you help him and knowingly send the enemy false information, maybe you can protect your own army just this once.",
    secenekler: [
      {
        metin: "Knowingly give the enemy wrong information, protect your own army.",
        ipucu: "You ease your conscience, the agent's trust could be shaken",
        basariliSonuc: {
          mesaj: "The false information you gave sent the enemy the wrong way; your own army was saved from a blow thanks to it.",
          detay: "Traitor though you are, tonight you stood on your own side once more.",
        },
        basarisizSonuc: {
          mesaj: "The agent noticed the false information; he made you pay a heavy price, your trust was seriously shaken.",
          detay: "Trying to fool both sides at once is the most dangerous game.",
        },
      },
      {
        metin: "Don't take the risk, carry on your business as usual.",
        ipucu: "You're safe but your conscience knows it missed a chance",
        basariliSonuc: {
          mesaj: "You didn't take the chance; business went on as usual, your purse filled.",
          detay: "Some nights, even doing nothing is a choice.",
        },
        basarisizSonuc: {
          mesaj: "The intelligence you gave that night really did cause heavy losses; this time your conscience never let you go.",
          detay: "Staying silent has a price too.",
        },
      },
    ],
  },

  oc_asker_hain_11: {
    baslik: "A Caught Courier",
    metin:
      "The courier who carried messages between you and the agent was caught by a border patrol. There's nothing on him that he was bringing to you, but there's no telling what he'll say if interrogated. Saving him is risky, abandoning him is a quiet killing.",
    secenekler: [
      {
        metin: "Bribe the patrol and save the courier.",
        ipucu: "You prove your loyalty, your pocket takes a serious hit",
        basariliSonuc: {
          mesaj: "You secretly paid the patrol commander; the courier was released, no one asked too many questions.",
          detay: "In this work sometimes the only trustworthy tongue is money.",
        },
        basarisizSonuc: {
          mesaj: "The bribe was refused, and your offer was noticed on top of it; they might call you in for questioning too now.",
          detay: "Trying to save someone you can sink yourself too.",
        },
      },
      {
        metin: "Leave the courier to his fate, stay silent.",
        ipucu: "You're safe but your conscience grows heavier",
        basariliSonuc: {
          mesaj: "The courier came out of the interrogation without talking, you were saved by chance; but you'll never forget that you abandoned him.",
          detay: "Some victories taste bitter even to the winner.",
        },
        basarisizSonuc: {
          mesaj: "Under pressure the courier gave your name; now you think they're coming for you at every footstep.",
          detay: "Someone you abandon can drag you down with them.",
        },
      },
      {
        metin: "Find the courier before the interrogation, tell him to stay silent.",
        ipucu: "The most direct solution, the highest risk",
        basariliSonuc: {
          mesaj: "You met the courier in the dark and persuaded him; he swore he'd stay silent and kept his word.",
          detay: "Sometimes the most dangerous way is the most honest one.",
        },
        basarisizSonuc: {
          mesaj: "Your meeting was noticed; now you and the courier are in the same interrogation room.",
          detay: "Direct intervention can pull you into the very heart of the crime.",
        },
      },
    ],
  },

  oc_asker_hain_12: {
    baslik: "The Promotion Feast",
    metin:
      "A small feast is being held in the barracks in honor of your promotion to man-at-arms; your commander praises you, your comrades-in-arms raise their cups. In the middle of this warmth, you realize just how alone you are.",
    secenekler: [
      {
        metin: "Live the moment, really feel like one of them.",
        ipucu: "A small happiness, but a deeper guilt",
        basariliSonuc: {
          mesaj: "You joined the laughter, raised a cup; for a moment you forgot you were a traitor.",
          detay: "Sometimes the most dangerous moment is when you truly feel you belong.",
        },
        basarisizSonuc: {
          mesaj: "The drink loosened your tongue; you let slip something you shouldn't have, then covered it in a panic.",
          detay: "Even joy can be a trap in this life.",
        },
      },
      {
        metin: "Stay distant, don't drink much, stay alert.",
        ipucu: "You're safe but your loneliness grows",
        basariliSonuc: {
          mesaj: "You raised your cup but your mind stayed alert; no one suspected you that night.",
          detay: "Staying alert is a habit of this life that isn't free.",
        },
        basarisizSonuc: {
          mesaj: "Your coldness was noticed; they talked behind your back 'he isn't even glad of his own promotion'.",
          detay: "Caution sometimes raises as much suspicion as joy.",
        },
      },
    ],
  },

  oc_asker_hain_13: {
    baslik: "An Unspoken Sin",
    metin:
      "A wandering monk coming to the barracks listens to those who want to confess. You kneel, open your mouth — but saying your real sin is heavy enough to hang you. You just list small, unimportant sins.",
    secenekler: [
      {
        metin: "Confess without telling the truth, act relieved.",
        ipucu: "An easy escape but a false peace",
        basariliSonuc: {
          mesaj: "The monk blessed you, you felt lighter; but the real burden inside you never lifted.",
          detay: "An unspoken sin is never really forgiven.",
        },
        basarisizSonuc: {
          mesaj: "The monk's look at you was strange; it was as if he sensed what you'd left out.",
          detay: "Some eyes hear the unspoken too.",
        },
      },
      {
        metin: "Refuse to kneel, miss your turn at confession.",
        ipucu: "You avoid a false peace, your loneliness grows",
        basariliSonuc: {
          mesaj: "You didn't stand in line; at least you didn't tell one more lie.",
          detay: "Some burdens must go on being carried.",
        },
        basarisizSonuc: {
          mesaj: "Your avoidance was noticed; some whispered 'faithless'.",
          detay: "Everything you flee leaves a question mark behind you.",
        },
      },
    ],
  },

  oc_asker_hain_14: {
    baslik: "The Price of a Comrade-in-Arms",
    metin:
      "The agent wants to know which unit will be sent to the area where the enemy plans a raid. You know the answer: your closest comrade-in-arms's unit. Saying it means sending him and dozens of men beside him to their deaths.",
    secenekler: [
      {
        metin: "Give the information, put your own life first.",
        ipucu: "You protect yourself, your comrade-in-arms's blood stays on your hands",
        basariliSonuc: {
          mesaj: "You gave the information; the unit fell into an ambush, {dost} never came back to the barracks.",
          detay: "Some nights are never forgotten, only suppressed.",
        },
        basarisizSonuc: {
          mesaj: "The information arrived late, the ambush was half-done; {dost} came back wounded but alive — and he looks at you with a strange gratitude.",
          detay: "Knowing he survived shrinks you even more.",
        },
      },
      {
        metin: "Give the information wrong, try to protect your friend.",
        ipucu: "You save your conscience, you put the agent's trust at great risk",
        basariliSonuc: {
          mesaj: "The wrong information you gave worked; {dost} survived, and the agent didn't notice.",
          detay: "Tonight you were at peace not because you're a traitor but because you couldn't stay one.",
        },
        basarisizSonuc: {
          mesaj: "The agent worked out your lie; he declared you 'unreliable' and left you facing a heavy threat.",
          detay: "Even trying to do good isn't free in this game.",
        },
      },
      {
        metin: "Give the information partly, manage both the agent and your friend.",
        ipucu: "You try to manage both sides, you walk a tightrope",
        basariliSonuc: {
          mesaj: "You gave the agent enough truth and {dost} enough of a hint; the unit moved carefully, the losses were fewer.",
          detay: "Sometimes the best betrayal is not fully selling anyone.",
        },
        basarisizSonuc: {
          mesaj: "The balance didn't hold; the agent grew suspicious of the half-information and the unit was caught unprepared.",
          detay: "Trying to stand on two horses at once usually drops you off both.",
        },
      },
    ],
  },

  oc_asker_hain_15: {
    baslik: "The Commander's Table",
    metin:
      "Since you rose to Commander every map on the war table, every sealed order passes through your hands. The agent no longer sees you as an information source but as a piece that could change the course of the war.",
    secenekler: [
      {
        metin: "Hand over the whole war strategy, deliver the enemy a victory.",
        ipucu: "The greatest betrayal, the greatest reward — and the greatest danger",
        basariliSonuc: {
          mesaj: "You gave the strategy in full; the agent counts you now not a 'partner' but almost an equal.",
          detay: "After rising this high, falling is that much deeper too.",
        },
        basarisizSonuc: {
          mesaj: "Some among the commanders started suspecting a leak; every day that passes without them lifting a finger feels like a miracle.",
          detay: "Every step at the summit brings you a little closer to the edge of the cliff.",
        },
      },
      {
        metin: "Leak only the non-critical part of the strategy, keep the balance.",
        ipucu: "Less risk, the agent's patience wears thin",
        basariliSonuc: {
          mesaj: "The piece you gave was valuable but didn't change the fate of the war; the agent made do.",
          detay: "Keeping the balance may be the only way to survive in this game.",
        },
        basarisizSonuc: {
          mesaj: "The agent expected more of you; he didn't hide his disappointment, left in a threat-laden silence.",
          detay: "A half-done disloyalty satisfies no side.",
        },
      },
    ],
  },

  oc_asker_hain_16: {
    baslik: "Sleepless Nights",
    metin:
      "The price of living between two worlds for months is building up in your body; your hands tremble, your sleep goes, you flinch at the slightest sound. One night on watch you notice you're muttering something as if in delirium — you're not sure what you said.",
    secenekler: [
      {
        metin: "Ask the barracks physician for help, feign illness.",
        ipucu: "You feel a bit better, the physician starts watching you closely",
        basariliSonuc: {
          mesaj: "The physician gave you a mixture of roots; you slept easy for a few nights.",
          detay: "Your body healed a little but your mind is still split two ways.",
        },
        basarisizSonuc: {
          mesaj: "The physician sensed your state was more than ordinary fatigue; his questions made you sweat.",
          detay: "Even asking for help isn't without risk in this life.",
        },
      },
      {
        metin: "Show no one, hold on alone.",
        ipucu: "No one suspects but your body wears down more",
        basariliSonuc: {
          mesaj: "You held on in silence; no one noticed but getting up each morning got a little harder.",
          detay: "Some burdens don't lighten unless shared, they just sink deeper.",
        },
        basarisizSonuc: {
          mesaj: "You fainted during a watch; those who found you wonder what you said.",
          detay: "The body will one day surely give back what the mind couldn't carry.",
        },
      },
    ],
  },

  oc_asker_hain_17: {
    baslik: "The Final Offer",
    metin:
      "The agent no longer speaks in code: the enemy command offers a rank across the border, a piece of land, and a real name. All they want in return — one last betrayal that will end this war, and that you never come back.",
    secenekler: [
      {
        metin: "Accept the offer, cross fully to the enemy side.",
        ipucu: "A new life, the complete erasure of your old one",
        basariliSonuc: {
          mesaj: "On a dark night you left the barracks; your name is spoken as 'traitor' in these lands now, but you live under a different sky with a new name.",
          detay: "Ending one life and building another is a lonelier thing than you thought.",
        },
        basarisizSonuc: {
          mesaj: "During your escape a border patrol noticed you; you barely saved your life, but now you're a suspect name to both sides.",
          detay: "Escape plans can collapse just when you trust them most.",
        },
      },
      {
        metin: "Refuse, decide you've gone far enough now.",
        ipucu: "You stay on your own side but the agent may not let go easily",
        basariliSonuc: {
          mesaj: "You turned the offer down; the agent left in disappointment but didn't threaten you.",
          detay: "To draw some lines you first have to see how far you've gone.",
        },
        basarisizSonuc: {
          mesaj: "Your refusal angered the agent; 'someone who knows this much can't go free,' he said, threatening you.",
          detay: "In this game even wanting to step away demands a price.",
        },
      },
      {
        metin: "Try to buy time, give no firm answer.",
        ipucu: "Uncertainty protects you but it can't last forever",
        basariliSonuc: {
          mesaj: "You told the agent you needed to think; he waited patiently but the trust in his eyes lessened.",
          detay: "Buying time is sometimes not a solution, just a postponed reckoning.",
        },
        basarisizSonuc: {
          mesaj: "Your indecision made the agent impatient; 'you're either with me or you're no one's,' he said and left.",
          detay: "In this game even your indecision has a price.",
        },
      },
    ],
  },

  oc_asker_hain_18: {
    baslik: "An Innocent Man",
    metin:
      "The private you accused years ago to shake off suspicion is still dragging a chain in a mine. His family petitioned the commander, the file is being reopened — and your name is among the witnesses.",
    secenekler: [
      {
        metin: "Use your influence to quietly close the file.",
        ipucu: "You protect yourself, you commit a second injustice",
        basariliSonuc: {
          mesaj: "The file was closed, the man stayed in the mine; no one blamed you but your own conscience had long since passed its verdict.",
          detay: "Some injustices multiply when you cover them up.",
        },
        basarisizSonuc: {
          mesaj: "Your intervention was noticed; they started asking 'why are you so interested'.",
          detay: "Trying to bury the past sometimes digs it up deeper.",
        },
      },
      {
        metin: "Bring the truth out with an anonymous letter, save the man.",
        ipucu: "You pay a debt of conscience, you put yourself in great danger",
        basariliSonuc: {
          mesaj: "Your letter had the file reopened; the man was freed, no one learned who the letter was from.",
          detay: "Righting a wrong even years later eases something inside you.",
        },
        basarisizSonuc: {
          mesaj: "Your handwriting was recognized; now they're after both your old lie and your new confession.",
          detay: "Trying to clear your conscience can drag you out of the very place you were hiding.",
        },
      },
    ],
  },

  oc_asker_hain_19: {
    baslik: "The Hidden Chest",
    metin:
      "A sudden search order came in the barracks; a senior officer is turning everyone's belongings inside out on suspicion of theft. At the bottom of your chest sit the gold you've hidden for years and a small seal the agent gave you.",
    secenekler: [
      {
        metin: "Secretly move the items elsewhere before the search.",
        ipucu: "You race against time, a high risk of being caught",
        basariliSonuc: {
          mesaj: "At the last moment you hid everything in a friend's saddlebag; the search passed you by entirely.",
          detay: "Your heart was in your throat but once more you got off cheap.",
        },
        basarisizSonuc: {
          mesaj: "While moving them you came eye to eye with a sentry; now you have to explain where you got what's in your hands.",
          detay: "Decisions made in panic leave the most traces.",
        },
      },
      {
        metin: "Don't take the risk, stay where you are, wait for the search.",
        ipucu: "You don't move but the chest sits there",
        basariliSonuc: {
          mesaj: "The officer rummaged through your chest sloppily and didn't notice the cloth under the gold.",
          detay: "Sometimes the best strategy is waiting without doing anything.",
        },
        basarisizSonuc: {
          mesaj: "The officer found the seal, his eyes hardened; now questions are being asked all the way up the command.",
          detay: "A small object can bring years of secrecy out in an instant.",
        },
      },
      {
        metin: "Confess a small privacy to the officer, distract him.",
        ipucu: "You sacrifice a small shame to hide the big secret",
        basariliSonuc: {
          mesaj: "You said there was a private letter in the chest and stalled the officer; you got him to go over the real search only on the surface.",
          detay: "Sometimes a small shame overshadows a big crime.",
        },
        basarisizSonuc: {
          mesaj: "The officer didn't believe your story and tightened the search further.",
          detay: "Attempts to distract sometimes have the opposite effect.",
        },
      },
    ],
  },

  oc_asker_hain_20: {
    baslik: "The Final Reckoning",
    metin:
      "Your hair has gone gray, your sword isn't as light as it was. One night the weight of the double life you've carried since your youth settles over you — you'll either take this secret to the grave, or tell the truth just once.",
    secenekler: [
      {
        metin: "Stay silent, carry the secret to your grave.",
        ipucu: "You're safe but you'll die alone",
        basariliSonuc: {
          mesaj: "You said nothing; you'll be remembered in the barracks as 'a loyal, silent soldier' — no one will know the truth.",
          detay: "Some truths mix with the earth along with the one who carried them.",
        },
        basarisizSonuc: {
          mesaj: "On your deathbed, delirious, you let a few words slip; those beside you put it down to fever ravings, one hopes so.",
          detay: "As your body weakens, so does your secret.",
        },
      },
      {
        metin: "Tell the truth one last time to someone you trust.",
        ipucu: "You feel lighter but one more person knows the truth",
        basariliSonuc: {
          mesaj: "You finally shared the burden you'd carried for years; the one across from you just listened without judging you.",
          detay: "Sometimes all you needed was for the truth to echo in another ear.",
        },
        basarisizSonuc: {
          mesaj: "Your confession spread faster than you'd thought; your name will go into history as 'traitor' now, but at least you died honest with yourself.",
          detay: "The truth, even when it comes late, has a price sooner or later.",
        },
      },
    ],
  },
};
