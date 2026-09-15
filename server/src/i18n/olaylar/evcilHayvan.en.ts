import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/evcilHayvan.ts — İngilizce çevirileri. */
export const OLAYLAR_EVCIL_HAYVAN_EN: Record<string, OlayCeviri> = {
  evcil_hayvan_hastalik: {
    baslik: "A Sick Friend",
    metin: "{hayvan} has had no appetite for a few days, is listless and not as cheerful as usual. You need to do something.",
    secenekler: [
      {
        metin: "Take them to an animal healer, whatever the cost.",
        basariliSonuc: {
          mesaj: "With the treatment the healer gave, {hayvan} was back to their old cheerful self within a few days.",
          detay: "Some expenses are made without hesitation.",
        },
        basarisizSonuc: {
          mesaj: "The healer did everything they could, but {hayvan} still isn't their old self.",
          detay: "Not every treatment gives results at once.",
        },
      },
      {
        metin: "Try to care for them at home with your own methods.",
        basariliSonuc: {
          mesaj: "Your patient care worked; {hayvan} slowly recovered.",
          detay: "Sometimes love and patience are more effective than money.",
        },
        basarisizSonuc: {
          mesaj: "Their condition worsened and {hayvan} could not be saved.",
          detay: "You won't forget the pain of this loss for a long time.",
        },
      },
    ],
  },

  evcil_hayvan_sadakat_ani: {
    baslik: "A Silent Loyalty",
    metin:
      "You came home tired after a hard day. {hayvan} was waiting for you at the door and nestled up to you as if they understood everything.",
    secenekler: [
      {
        metin: "Sit down with them, savor the moment.",
        basariliSonuc: {
          mesaj: "That silent moment set aside all the weariness of the day.",
          detay: "Sometimes the greatest comfort is the presence of a friend who doesn't speak.",
        },
        basarisizSonuc: {
          mesaj: "For a short while at least, you felt a little relieved.",
          detay: "Even small moments mean something.",
        },
      },
      {
        metin: "Use your tiredness as an excuse, go straight to sleep.",
        basariliSonuc: {
          mesaj: "You got a good sleep; but you felt a little that you'd missed that moment.",
          detay: "Rest is necessary too, but some moments don't come again.",
        },
        basarisizSonuc: {
          mesaj: "Sleep wouldn't come, and you resented having ignored your pet.",
          detay: "Some chances don't come back.",
        },
      },
    ],
  },

  evcil_hayvan_kaybolma: {
    baslik: "A Lost Friend",
    metin: "{hayvan} has been gone for two days. The neighbors don't think they've seen them, but you could look.",
    secenekler: [
      {
        metin: "Look to the sky and wait for your falcon.",
        basariliSonuc: {
          mesaj:
            "The falcon returned screeching on the morning of the third day. And in its talons is a valuable ruby necklace, probably snatched from some noble!",
          detay: "It chose to return to you, not to freedom. And it didn't come back empty-handed.",
        },
        basarisizSonuc: {
          mesaj:
            "The falcon came back a week later, exhausted and empty-taloned. Safe — but days of worrying over it wore you down.",
          detay: "This time the sky gave it nothing.",
        },
      },
      {
        metin: "Search street by street.",
        basariliSonuc: {
          mesaj: "After hours of searching you found {hayvan} in a side street; you came home safe and sound.",
          detay: "Your persistence paid off.",
        },
        basarisizSonuc: {
          mesaj: "No matter how you searched, you couldn't find {hayvan}; they were never seen again.",
          detay: "Some losses don't close, they only lighten with time.",
        },
      },
      {
        metin: "Hope they come back on their own.",
        basariliSonuc: {
          mesaj: "A few days later {hayvan} showed up at the door on their own.",
          detay: "Sometimes patience works better than searching.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} never came back.",
          detay: "Some farewells happen silently.",
        },
      },
    ],
  },

  evcil_hayvan_koruma_ani: {
    baslik: "A Loyal Watchman",
    metin:
      "A sound woke you at midnight: {hayvan} is growling at the door. Maybe a thief, maybe just a shadow.",
    secenekler: [
      {
        metin: "Get up, check outside.",
        basariliSonuc: {
          mesaj: "There really was a thief; thanks to {hayvan}'s warning you chased them off.",
          detay: "Tonight you understood the worth of a loyal friend once more.",
        },
        basarisizSonuc: {
          mesaj: "You bumped into something in the dark and fell; the thief got away, and you were left empty-handed.",
          detay: "Some nights don't go smoothly.",
        },
      },
      {
        metin: "Ignore it, go back to sleep.",
        basariliSonuc: {
          mesaj: "In the morning everything was in its place; maybe it really was just a shadow.",
          detay: "Sometimes the worry was for nothing.",
        },
        basarisizSonuc: {
          mesaj: "In the morning you noticed some things had been stolen from the storeroom.",
          detay: "You should have listened to {hayvan}'s warning.",
        },
      },
    ],
  },

  evcilhayvan_sahiplenme_teklifi_ortacag: {
    baslik: "A Friend, or Loneliness?",
    metin:
      "While wandering the market you noticed it: it might be time to add a small, loyal friend to your life. Or maybe you're more comfortable alone — the choice is yours.",
    secenekler: [
      {
        metin: "Get a puppy.",
        basariliSonuc: {
          mesaj: "You took a little puppy home; it started following you around, wagging its tail.",
          detay: "You're not alone anymore.",
        },
        basarisizSonuc: {
          mesaj: "The pup disappeared the first night, never to be seen again.",
          detay: "Some friendships end before they even begin.",
        },
      },
      {
        metin: "Get a cat.",
        basariliSonuc: {
          mesaj: "A little cat settled into your home; it even makes ignoring you charming.",
          detay: "There's another master in your house now — your cat.",
        },
        basarisizSonuc: {
          mesaj: "The cat left as quietly as it came one night, and never returned.",
          detay: "Some friendships end before they even begin.",
        },
      },
      {
        metin: "Get and train a falcon.",
        basariliSonuc: {
          mesaj:
            "Your patient work paid off; the falcon now sits on your shoulder and everyone looks at you with admiration.",
          detay: "Owning a falcon earns you a bit of respect in the streets.",
        },
        basarisizSonuc: {
          mesaj: "The falcon scratched your hand deeply during training and flew off.",
          detay: "Some animals hold freedom above captivity.",
        },
      },
      {
        metin: "No, I'm more comfortable alone.",
        basariliSonuc: {
          mesaj: "You've made your decision: for now, you prefer to stay alone.",
          detay: "Maybe you'll change your mind later.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  evcilhayvan_sahiplenme_teklifi_sanayi: {
    baslik: "A Friend, or Loneliness?",
    metin:
      "On your way out of the factory you saw a stall in the market selling small animals. It might be just the time to add a friend to your life — or you might prefer to stay alone.",
    secenekler: [
      {
        metin: "Get a puppy.",
        basariliSonuc: {
          mesaj: "You took a little puppy home; it started following you around, wagging its tail.",
          detay: "You're not alone anymore.",
        },
        basarisizSonuc: {
          mesaj: "The pup disappeared the first night, never to be seen again.",
          detay: "Some friendships end before they even begin.",
        },
      },
      {
        metin: "Get a cat.",
        basariliSonuc: {
          mesaj: "A little cat settled into your home; it even makes ignoring you charming.",
          detay: "There's another master in your house now — your cat.",
        },
        basarisizSonuc: {
          mesaj: "The cat left as quietly as it came one night, and never returned.",
          detay: "Some friendships end before they even begin.",
        },
      },
      {
        metin: "Buy a talking parrot.",
        basariliSonuc: {
          mesaj: "You bought a colorful parrot; before you even got home it started memorizing your curses.",
          detay: "With this bird, your life will never be quiet again.",
        },
        basarisizSonuc: {
          mesaj: "The parrot flew off the stall and escaped, and you couldn't get your money back either.",
          detay: "Some investments sprout wings and fly away.",
        },
      },
      {
        metin: "No, I'm more comfortable alone.",
        basariliSonuc: {
          mesaj: "You've made your decision: for now, you prefer to stay alone.",
          detay: "Maybe you'll change your mind later.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  evcil_hayvan_sahin_av: {
    baslik: "A Successful Hunt",
    metin:
      "You went hunting with {hayvan}; your falcon's sharp eyes don't look like they'll disappoint you today.",
    secenekler: [
      {
        metin: "Keep hunting, take the risk.",
        basariliSonuc: {
          mesaj: "{hayvan} caught two rabbits one after another; your table is rich this week.",
          detay: "Training your falcon paid off.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} clashed with an eagle; you both came back wounded.",
          detay: "The sky is sometimes not for sharing.",
        },
      },
      {
        metin: "Return early, don't take the risk.",
        basariliSonuc: {
          mesaj: "You settled for a small catch, but you both came back safe and sound.",
          detay: "Sometimes little but certain is better than a lot.",
        },
        basarisizSonuc: {
          mesaj: "You came back empty-handed, and {hayvan} looked as disappointed as you.",
          detay: "Not every day is a good hunting day.",
        },
      },
    ],
  },

  evcil_hayvan_sahin_kacis: {
    baslik: "The Call of Freedom",
    metin:
      "{hayvan} sprang off your arm today with a startling force and soared away into the distance; maybe just wandering, maybe never to return.",
    secenekler: [
      {
        metin: "Go after them, try to make yourself heard.",
        basariliSonuc: {
          mesaj: "Hours later {hayvan} landed back on your wrist; you were both relieved.",
          detay: "Your bond was stronger than you thought.",
        },
        basarisizSonuc: {
          mesaj: "You never saw {hayvan} again; the sky didn't give them back.",
          detay: "Some friendships lose out to freedom.",
        },
      },
      {
        metin: "Trust them, hope they return on their own.",
        basariliSonuc: {
          mesaj: "Toward evening {hayvan} came back of their own accord.",
          detay: "Sometimes waiting is enough.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} never came back.",
          detay: "Some farewells are silent.",
        },
      },
    ],
  },

  evcil_hayvan_papagan_agiz_kacirma: {
    baslik: "A Secret That Slipped Out",
    metin:
      "{hayvan} repeated a dark secret (or piece of gossip) you'd heard while visiting last week — right in front of exactly the wrong person! Everyone is looking at you now.",
    secenekler: [
      {
        metin: "Laugh it off, say 'the bird talks'.",
        basariliSonuc: {
          mesaj: "The room burst into laughter, the whole thing turned into a joke and was even found a bit endearing.",
          detay: "Thanks to {hayvan} you were the favorite of the gathering, at least for today.",
        },
        basarisizSonuc: {
          mesaj: "No one laughed; the subject of the gossip reached for their weapon.",
          detay: "You'll need to think twice before saying anything in front of {hayvan}.",
        },
      },
      {
        metin: "Be embarrassed and apologize, close the subject.",
        basariliSonuc: {
          mesaj: "A brief apology closed the matter; no one dwelt on it much.",
          detay: "Sometimes the best defense is a quick apology.",
        },
        basarisizSonuc: {
          mesaj: "Your apology didn't sound very convincing; a few people still suspect you.",
          detay: "{hayvan} is probably never going to learn to keep secrets.",
        },
      },
    ],
  },

  evcil_hayvan_papagan_taklit_yetenegi: {
    baslik: "A Little Star",
    metin:
      "{hayvan} started imitating the neighbors' voices so well that they gained a small fame in the street; some people are asking you for a show.",
    secenekler: [
      {
        metin: "Put on a small show in the square.",
        basariliSonuc: {
          mesaj: "{hayvan} had everyone in stitches; the onlookers even left you tips.",
          detay: "Who would have thought a bird would make you this famous.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} stubbornly didn't say a word that day, and the crowd dispersed mocking you.",
          detay: "Show animals sometimes get moody.",
        },
      },
      {
        metin: "Turn the offer down, protect your privacy.",
        basariliSonuc: {
          mesaj: "You politely declined the show; life went on calmly.",
          detay: "You don't have to chase every opportunity.",
        },
        basarisizSonuc: {
          mesaj: "Some neighbors were insistent, and you felt a bit overwhelmed.",
          detay: "Fame sometimes comes uninvited.",
        },
      },
    ],
  },

  evcil_hayvan_kedi_yikim: {
    baslik: "By Accident, or on Purpose?",
    metin:
      "When you got home you found {hayvan} among the shards of a valuable pot it had broken, looking straight at you without a hint of remorse.",
    secenekler: [
      {
        metin: "Don't get angry, clean it up and move on.",
        basariliSonuc: {
          mesaj: "You gathered the broken pieces; {hayvan} seemed to enjoy watching what was going on.",
          detay: "This is the price of living with cats, you told yourself.",
        },
        basarisizSonuc: {
          mesaj: "The pot really was valuable; having the break repaired cost money.",
          detay: "{hayvan} doesn't even care.",
        },
      },
      {
        metin: "Scold it, try to teach it a lesson.",
        basariliSonuc: {
          mesaj: "{hayvan} behaved for a while when it heard your voice, at least that day.",
          detay: "It counts as a small victory.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} ignored you completely and looked out the window.",
          detay: "Cats listen to no one, and you knew that.",
        },
      },
    ],
  },

  evcil_hayvan_kopek_kahramanlik: {
    baslik: "An Unexpected Hero",
    metin:
      "In the marketplace, {hayvan} chased down a thief who had snatched the bread from a child's hand, with a speed no one expected.",
    secenekler: [
      {
        metin: "Run after them, set things right.",
        basariliSonuc: {
          mesaj: "{hayvan} cornered the thief, the bread went back to its owner; the crowd cheered.",
          detay: "That day you were the favorite of the neighborhood — or rather it was {hayvan}.",
        },
        basarisizSonuc: {
          mesaj: "You bumped into a stall while running, and the thief got away.",
          detay: "Good intentions sometimes end in clumsiness.",
        },
      },
      {
        metin: "Don't get involved, mind your own business.",
        basariliSonuc: {
          mesaj: "You settled for watching; {hayvan} came back to you after a while.",
          detay: "Not every act of heroism has to be yours.",
        },
        basarisizSonuc: {
          mesaj: "Seeing the child cry, you felt a slight pang of conscience.",
          detay: "Sometimes watching is a choice too.",
        },
      },
    ],
  },

  evcil_hayvan_altin_kese: {
    baslik: "A Surprise in Its Mouth",
    metin:
      "{hayvan} came into the house with a different air than usual; there was a small, jingling purse in its mouth. A few coins gleam inside.",
    secenekler: [
      {
        metin: "Take the purse, don't wonder about the owner.",
        basariliSonuc: {
          mesaj: "You opened the purse; a few coins fell into your palm. {hayvan} wagged its tail (or wings) proudly.",
          detay: "You'll never learn where it found it.",
        },
        basarisizSonuc: {
          mesaj: "The purse was empty; only a few pebbles came out of it.",
          detay: "{hayvan} still looked very pleased with itself.",
        },
      },
      {
        metin: "Try to find the owner, give it back.",
        basariliSonuc: {
          mesaj: "You found the neighbor who lost the purse; their gratitude lasted a long time.",
          detay: "Your honesty was talked about in the neighborhood.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't find the owner; you left the purse in a charity box.",
          detay: "At least your conscience is at ease.",
        },
      },
    ],
  },

  evcil_hayvan_yeni_tanisiklik: {
    baslik: "An Encounter in the Park",
    metin:
      "{hayvan} ran toward an animal that someone else in the square also loved; your smiling efforts to apologize turned into a conversation.",
    secenekler: [
      {
        metin: "Extend the conversation, develop the acquaintance.",
        basariliSonuc: {
          mesaj: "After a long conversation you made a new acquaintance; {hayvan} was the secret hero of this meeting.",
          detay: "Sometimes the best introductions happen when an animal steps in.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't get past a brief greeting.",
          detay: "Still, it was a nice moment.",
        },
      },
      {
        metin: "Keep it short, go on your way.",
        basariliSonuc: {
          mesaj: "You said a polite goodbye and went on your way.",
          detay: "Not every encounter has to turn into a friendship.",
        },
        basarisizSonuc: {
          mesaj: "Afterward you thought you should have stayed a little longer.",
          detay: "Some chances don't come again.",
        },
      },
    ],
  },

  evcil_hayvan_kopek_ev_tahribati: {
    baslik: "The End of the Chair",
    metin:
      "When you got home you found {hayvan} gnawing the leg of your favorite chair; sawdust was scattered everywhere.",
    secenekler: [
      {
        metin: "Stay calm, have a new chair made.",
        basariliSonuc: {
          mesaj: "You had a new chair made; this time {hayvan} didn't even touch the table.",
          detay: "Some habits fade slowly.",
        },
        basarisizSonuc: {
          mesaj: "The new chair got notched within a few days too.",
          detay: "Some dogs never stop chewing.",
        },
      },
      {
        metin: "Get angry, try to train it.",
        basariliSonuc: {
          mesaj: "Your patient training worked; {hayvan} no longer touches the furniture.",
          detay: "Your persistence paid off.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} wagged its tail and thought it was a game instead of listening to you.",
          detay: "Some lessons aren't learned in one go.",
        },
      },
    ],
  },

  evcil_hayvan_kedi_komsu_zarari: {
    baslik: "The Neighbor's Pigeons",
    metin:
      "Your neighbor showed up at your door: {hayvan} chased one of the pigeons they carefully raise and plucked its feathers. The neighbor is quite angry.",
    secenekler: [
      {
        metin: "Apologize, pay for the damage.",
        basariliSonuc: {
          mesaj: "Your apology and small payment calmed your neighbor down.",
          detay: "Good neighborliness is sometimes kept for a few coins.",
        },
        basarisizSonuc: {
          mesaj: "Your apology was accepted but your neighbor was cold to you for a while.",
          detay: "Some resentments pass slowly.",
        },
      },
      {
        metin: "It's a cat's nature, defend it.",
        basariliSonuc: {
          mesaj: "Your neighbor let it go, though with some grumbling.",
          detay: "Cats answer to no one, and you knew that.",
        },
        basarisizSonuc: {
          mesaj: "Your neighbor stopped talking to you.",
          detay: "Some defenses make things worse.",
        },
      },
    ],
  },

  evcil_hayvan_kurt_vahsi_icgudu: {
    baslik: "Wild Instinct",
    metin:
      "{hayvan} suddenly attacked one of the neighbor's small animals; its wild nature came back in an instant. You need to intervene before things escalate.",
    secenekler: [
      {
        metin: "Step in, stop {hayvan}.",
        basariliSonuc: {
          mesaj: "Your hand got a little hurt but you pulled {hayvan} back in time; no one was seriously harmed.",
          detay: "This is sometimes the price of living with a wild animal.",
        },
        basarisizSonuc: {
          mesaj:
            "The matter escalated; you had to pay for the neighbor's loss and your name was spoken as 'dangerous' in the neighborhood.",
          detay: "Some people still shun you because of it.",
        },
      },
      {
        metin: "Don't get involved, let it follow its nature.",
        basariliSonuc: {
          mesaj: "You didn't get involved; {hayvan} calmed down on its own.",
          detay: "Sometimes being a bystander is a choice too.",
        },
        basarisizSonuc: {
          mesaj: "They blamed you for not intervening.",
          detay: "Staying silent has a price too.",
        },
      },
    ],
  },

  "evcil_hayvan_kurt_sürü_ozlemi": {
    baslik: "A Howl From Afar",
    metin:
      "In response to a wolf's howl coming from far away in the night, {hayvan} howled long and hard too; there's a longing in its eyes you've never seen before.",
    secenekler: [
      {
        metin: "Let it answer the call of its nature.",
        basariliSonuc: {
          mesaj: "The next morning {hayvan} was gone; you'd left the door open, and it chose its pack.",
          detay: "You let it go because you loved it; that was a love harder than keeping it.",
        },
        basarisizSonuc: {
          mesaj: "You left the door open but {hayvan} was by your side again in the morning.",
          detay: "Maybe this is its home now too.",
        },
      },
      {
        metin: "Go to it, calm it down.",
        basariliSonuc: {
          mesaj: "You sat beside it and stroked it; {hayvan} slowly calmed and laid its head on your shoulder.",
          detay: "Some bonds overcome even wild nature.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} paced restlessly all night, and you couldn't sleep a wink.",
          detay: "Some longings don't pass in one night.",
        },
      },
    ],
  },

  vahsi_kurt_yavrusu_bulma: {
    baslik: "Deep in the Forest",
    metin:
      "You lost your way and plunged deep into the forest. Beside a dead she-wolf you found a single still-breathing cub. In its eyes there is neither fear of you nor trust in you — only the instinct to survive.",
    secenekler: [
      {
        metin: "Take the cub, patiently try to tame it.",
        basariliSonuc: {
          mesaj: "The cub first growled, then accepted the meat from your hand. Weeks later it no longer leaves your side.",
          detay: "Owning a tame wolf isn't easy, but its loyalty is unmatched.",
        },
        basarisizSonuc: {
          mesaj: "The cub bit you and fled into the darkness of the forest.",
          detay: "Some wild spirits hold freedom above captivity.",
        },
      },
      {
        metin: "Count it as hunted for its pelt and teeth, prepare it for sale.",
        basariliSonuc: {
          mesaj: "You sold the cub to a furrier; you earned a few coins but a strange weight stayed in you.",
          detay: "Some gains always taste bitter.",
        },
        basarisizSonuc: {
          mesaj: "The furrier kept the price ridiculously low; your conscience ached and your pocket barely filled.",
          detay: "The worst case: you paid the price and got nothing back.",
        },
      },
      {
        metin: "Leave it to nature, don't get involved.",
        basariliSonuc: {
          mesaj: "You left the cub where it was; its fate is in its own hands.",
          detay: "Not making a decision is a decision too.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't bring yourself to turn back and look; you still remember that gaze at night.",
          detay: "Conscience sometimes torments you quietly.",
        },
      },
    ],
  },

  evcil_hayvan_kedi_hirsiz_hediyesi: {
    baslik: "The Cat's Loot",
    metin:
      "{hayvan} proudly purred and left a 'gift' on your bed: a shiny ring. Probably 'borrowed' from one of the neighboring houses through an open window.",
    secenekler: [
      {
        metin: "Keep the ring, ask no one.",
        basariliSonuc: {
          mesaj: "You quietly kept the ring; no one even suspected {hayvan}.",
          detay: "Cats have no conscience, and yours is now a little short too.",
        },
        basarisizSonuc: {
          mesaj: "The neighbor saw the ring in your house and accused you of theft!",
          detay: "The cat's crime landed on your back.",
        },
      },
      {
        metin: "Go around the neighborhood, find the owner and return it.",
        basariliSonuc: {
          mesaj: "You found the ring's owner; the grateful neighbor gave you a small reward.",
          detay: "Your honesty was talked about in the neighborhood.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't find the owner; the ring was forgotten in your drawer.",
          detay: "Some good intentions go unrewarded.",
        },
      },
    ],
  },

  evcil_hayvan_kedi_agactan_kurtarma: {
    baslik: "The Cat Stuck at the Top",
    metin:
      "{hayvan} climbed to the highest branch in the garden and now can't get down; it keeps meowing desperately. The neighbors are watching from their windows.",
    secenekler: [
      {
        metin: "Climb up yourself, take the risk.",
        basariliSonuc: {
          mesaj: "With difficulty you took {hayvan} into your arms; the neighborhood applauded you.",
          detay: "Sometimes being a hero is as simple as climbing a tree.",
        },
        basarisizSonuc: {
          mesaj: "The branch broke and you crashed to the ground! {hayvan}, meanwhile, jumped down on its own.",
          detay: "Your cat turned out far more capable than you.",
        },
      },
      {
        metin: "Give the neighbor's boy a few coins to climb up.",
        basariliSonuc: {
          mesaj: "The nimble boy got {hayvan} down within minutes.",
          detay: "Leaving some jobs to an expert is wise.",
        },
        basarisizSonuc: {
          mesaj: "The boy got scared too and came down halfway; {hayvan} stayed up there until evening.",
          detay: "Sometimes even money isn't a solution.",
        },
      },
    ],
  },

  evcil_hayvan_kopek_yarali_kahraman: {
    baslik: "The Watchman's Price",
    metin:
      "While chasing a thief at night, {hayvan} was badly wounded. The best animal healer in the city is expensive but reliable; otherwise you have to leave it to heal naturally.",
    secenekler: [
      {
        metin: "Get the best treatment, whatever it costs.",
        basariliSonuc: {
          mesaj: "The healer worked for hours; {hayvan} was back on its feet within a few days.",
          detay: "You didn't hesitate to repay its loyalty.",
        },
        basarisizSonuc: {
          mesaj: "Despite the best treatment the wounds were severe; {hayvan} barely healed, limping.",
          detay: "Sometimes even money doesn't guarantee everything.",
        },
      },
      {
        metin: "Try to care for it at home with your own means.",
        basariliSonuc: {
          mesaj: "You stayed by its side for nights; {hayvan} stubbornly healed.",
          detay: "Sometimes love is a stronger medicine than gold.",
        },
        basarisizSonuc: {
          mesaj: "The wounds were too deep; {hayvan} closed its eyes a few days later.",
          detay: "You'll never forget the price it paid to protect you.",
        },
      },
    ],
  },

  evcil_hayvan_kopek_asil_kavgasi: {
    baslik: "Whose Dog Is in the Right?",
    metin:
      "{hayvan} got into a fight in the square with the spoiled dog of an influential family. It's not clear who bit whom, but the family wants compensation from you, and they're raising their voices.",
    secenekler: [
      {
        metin: "Quietly pay the compensation, close the matter.",
        basariliSonuc: {
          mesaj: "You paid the money and the family left, though with grumbling.",
          detay: "In some fights being right isn't enough — money talks.",
        },
        basarisizSonuc: {
          mesaj: "You paid the money but the incident turned into neighborhood gossip.",
          detay: "Silence sometimes isn't enough.",
        },
      },
      {
        metin: "No, your dog was in the right — defend it to the end.",
        basariliSonuc: {
          mesaj: "The witnesses took your side; the family backed down.",
          detay: "Sometimes defending the truth works.",
        },
        basarisizSonuc: {
          mesaj:
            "The influential family got its way; you ended up paying the compensation anyway and being called 'insolent'.",
          detay: "Arguing with the powerful comes at a heavy price.",
        },
      },
    ],
  },

  evcil_hayvan_sahin_turnuva: {
    baslik: "The Falconry Contest",
    metin:
      "The region's best falconers have gathered; entering {hayvan} in this grand tournament could be a great door to fame. But on the most dangerous hunting course, a falcon can easily be lost or wounded.",
    secenekler: [
      {
        metin: "Enter the toughest course, aim for great fame.",
        basariliSonuc: {
          mesaj: "{hayvan} left its rivals behind and reached the top! Your name began to be spoken with falconry in the region.",
          detay: "Some risks pay off many times over.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} disappeared on the horizon chasing prey and never returned.",
          detay: "Fame sometimes costs you a loyal friend.",
        },
      },
      {
        metin: "Enter only an easy, modest demonstration.",
        basariliSonuc: {
          mesaj: "The small demonstration won some praise; {hayvan} returned safely to your shoulder.",
          detay: "Being cautious isn't always a bad thing.",
        },
        basarisizSonuc: {
          mesaj: "The demonstration was dull, no one paid much attention.",
          detay: "Some days aren't meant for shining.",
        },
      },
    ],
  },

  evcil_hayvan_sahin_dusman_mesaji: {
    baslik: "A Letter That Fell Into the Wrong Talon",
    metin:
      "Returning from the hunt, {hayvan} brought in its talons a sealed letter that doesn't belong to it — it could be a secret correspondence someone lost or had stolen.",
    secenekler: [
      {
        metin: "Break the seal, learn the secret inside.",
        basariliSonuc: {
          mesaj: "The secrets in the letter astonished you; this information could serve you later.",
          detay: "Reading someone else's secret is a heavy burden, even if it's profitable.",
        },
        basarisizSonuc: {
          mesaj: "You were caught reading the letter; rumors of a 'spy' spread.",
          detay: "Your curiosity left you in a tough spot.",
        },
      },
      {
        metin: "Without breaking the seal, find the owner and deliver it.",
        basariliSonuc: {
          mesaj: "You got the letter to its owner; the relief in the man's eyes was priceless.",
          detay: "Your honesty was quietly rewarded.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't find the owner; the letter gathered dust in your drawer.",
          detay: "Some good intentions don't reach their goal.",
        },
      },
    ],
  },

  evcil_hayvan_papagan_taklit_dolandiriciligi: {
    baslik: "The Mimic's Beak",
    metin:
      "You noticed {hayvan} can imitate your rival's voice almost perfectly. You could use this to pull a little scheme in the market, or leave the talent as mere entertainment.",
    secenekler: [
      {
        metin: "Have the parrot speak in your rival's voice and trick the customers.",
        basariliSonuc: {
          mesaj: "The customers fell for the strange offer coming from 'your rival's' mouth and headed to your stall!",
          detay: "You won, but you know it was a con.",
        },
        basarisizSonuc: {
          mesaj: "Your rival caught on to the game and you were humiliated in the middle of the square.",
          detay: "Trusting a parrot cost you dearly.",
        },
      },
      {
        metin: "Just put on a small show in the neighborhood for fun.",
        basariliSonuc: {
          mesaj: "The children and neighbors watched, laughing; {hayvan} was the star of the day.",
          detay: "Sometimes the best gain is just a laugh.",
        },
        basarisizSonuc: {
          mesaj: "The show didn't draw much interest, and {hayvan} sulked.",
          detay: "Not every trick gets applause.",
        },
      },
    ],
  },

  evcil_hayvan_papagan_hastalik_secimi: {
    baslik: "The Silent Beak",
    metin:
      "{hayvan} has been silent for a few days with a strange cough; that noisy voice is no longer heard. An expensive exotic-animal doctor from distant lands could be the cure, or you could leave it to nature and hope.",
    secenekler: [
      {
        metin: "Take it to the exotic doctor, pay whatever it takes.",
        basariliSonuc: {
          mesaj: "The drops the doctor gave worked; a few days later {hayvan} is making the whole house ring again.",
          detay: "When its voice came back you realized how quiet the house had been.",
        },
        basarisizSonuc: {
          mesaj: "Despite the expensive treatment, {hayvan}'s voice never was the same again.",
          detay: "Some things don't come back even with money.",
        },
      },
      {
        metin: "Let it rest at home, wait for natural healing.",
        basariliSonuc: {
          mesaj: "Your patience worked; {hayvan} slowly returned to its old cheerful self.",
          detay: "Sometimes time is the best medicine.",
        },
        basarisizSonuc: {
          mesaj: "{hayvan} was found motionless on its perch one morning.",
          detay: "The silence of the house is no longer as pleasant as before.",
        },
      },
    ],
  },

  evcil_hayvan_kurt_ticaret_korkusu: {
    baslik: "The Gaze That Scares Off Customers",
    metin:
      "While {hayvan} sits in front of your shop like a loyal guard, customers take fright at its yellow eyes and turn back before entering. Your earnings have dropped noticeably.",
    secenekler: [
      {
        metin: "Tie it in the back garden, put your business first.",
        basariliSonuc: {
          mesaj: "The customers came back and your till filled again. {hayvan}, meanwhile, keeps watching you from the window.",
          detay: "Your business is saved but there's a thorn in your conscience.",
        },
        basarisizSonuc: {
          mesaj: "The customers came back a little, but {hayvan}'s sad looks wrenched your heart.",
          detay: "Earnings sometimes demand a silent price.",
        },
      },
      {
        metin: "Never leave its side, accept the loss of customers.",
        basariliSonuc: {
          mesaj: "{hayvan} kept staying by your side; your earnings dropped but your heart is at ease.",
          detay: "Some friendships fit in no profit column.",
        },
        basarisizSonuc: {
          mesaj: "The customers dwindled badly, but the head {hayvan} rubbed against you was worth everything.",
          detay: "Your wallet got lighter, not your heart.",
        },
      },
    ],
  },
};
