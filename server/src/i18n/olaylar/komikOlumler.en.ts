import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/komikOlumler.ts — İngilizce çevirileri. */
export const OLAYLAR_KOMIK_OLUM_EN: Record<string, OlayCeviri> = {
  komik_fici_selale: {
    baslik: "Barrel Down the Falls",
    metin:
      "You made a bet at the tavern: no one dares climb into an empty wine barrel and ride it down the little waterfall. Everyone is watching. The barrel is ready.",
    secenekler: [
      {
        metin: "Get in the barrel and wait to be pushed off.",
        ipucu: "Succeed and you're a legend; fail and you're also a legend",
        basariliSonuc: {
          mesaj: "The barrel tumbled down, and you came out soaked but alive. The tavern spoke your name for weeks.",
          detay: "Some stupidities pay off.",
        },
        basarisizSonuc: {
          mesaj: "The barrel shattered on the first rock. The crowd laughed first, then fell silent.",
        },
      },
      {
        metin: "Turn down the bet, order another drink.",
        ipucu: "Safe; you'll get teased a bit",
        basariliSonuc: {
          mesaj: "You shrugged. A few called you a coward, but by morning they'd forgotten.",
        },
        basarisizSonuc: {
          mesaj: "Your retreat was a bit too hurried; for days you were 'the one afraid of barrels'.",
        },
      },
    ],
  },
  komik_en_aci_biber: {
    baslik: "The Hottest Pepper",
    metin:
      "A peddler opened a basket of 'dragon's breath' peppers from distant lands. 'Whoever eats a whole one raw gets the basket free,' he says. A crowd gathered.",
    secenekler: [
      {
        metin: "Into the mouth, chew, swallow. Don't blink.",
        ipucu: "Cheap fame or a very expensive lesson",
        basariliSonuc: {
          mesaj: "Your face went purple, tears burst from your eyes, but you swallowed it. The peddler handed over the basket with a grin.",
        },
        basarisizSonuc: {
          mesaj: "Your breath caught, then never came back. The doctor said 'I've never seen anything like it.'",
        },
      },
      {
        metin: "Just taste a slice, leave the rest.",
        ipucu: "Reasonable; the basket won't be yours",
        basariliSonuc: {
          mesaj: "One slice was more than enough. Your mouth burned, but you lived long enough to tell the tale.",
        },
        basarisizSonuc: {
          mesaj: "Even that one slice was too much; you couldn't eat for two days.",
        },
      },
    ],
  },
  komik_heykel_boyama: {
    baslik: "The Statue in the Square",
    metin:
      "Your friends are goading you to paint a funny moustache on the ruler's statue in the square at night. The ladder is ready, the paint is ready, the guards are just over there.",
    secenekler: [
      {
        metin: "Climb the ladder, paint the moustache.",
        ipucu: "A legendary prank or a very bad fall",
        basariliSonuc: {
          mesaj: "The moustache came out perfect. The city was in stitches by morning, and no one gave you up.",
        },
        basarisizSonuc: {
          mesaj: "The ladder slipped. Your last words were 'almost had it.'",
        },
      },
      {
        metin: "Give the paint to your friend, you keep watch.",
        ipucu: "Safer; less fame too",
        basariliSonuc: {
          mesaj: "You kept watch, the job got done, no one was caught. Your friend was the hero, but you laughed too.",
        },
        basarisizSonuc: {
          mesaj: "The patrol came early; running, you tripped over a cart and rolled. At least you weren't recognized.",
        },
      },
    ],
  },
  komik_ari_kovani: {
    baslik: "Free Honey",
    metin:
      "There's a huge beehive up in the tree, full of honey. From below it looks 'worth a few stings.'",
    secenekler: [
      {
        metin: "Climb the tree, poke the hive with a stick.",
        ipucu: "Sweet profit or a very angry swarm",
        basariliSonuc: {
          mesaj: "You got stung in a few places but brought down a bucket of honey. You treated everyone for days.",
        },
        basarisizSonuc: {
          mesaj: "The swarm made its opinion very clear. No one quite saw how you got down from the tree.",
        },
      },
      {
        metin: "Tell a beekeeper, ask for a share.",
        ipucu: "Little honey, sound body",
        basariliSonuc: {
          mesaj: "The beekeeper did it right, and a jar came your way. Not a single sting.",
        },
        basarisizSonuc: {
          mesaj: "The beekeeper said 'not my hive' and left. The honey stayed in the tree, and you on the ground.",
        },
      },
    ],
  },
  komik_nefes_tutma: {
    baslik: "I Can Hold My Breath the Longest",
    metin:
      "One word led to another at the bathhouse / tavern: who can hold their breath the longest? A wager was laid. Someone has already started counting.",
    secenekler: [
      {
        metin: "Fill your lungs, close your eyes, hold on.",
        ipucu: "A small bet, a small risk... usually",
        basariliSonuc: {
          mesaj: "Your face reddened, your veins throbbed, but you were the last one holding. You took the pot.",
        },
        basarisizSonuc: {
          mesaj: "You held, and held... then slumped onto the table. You didn't get up.",
        },
      },
      {
        metin: "Say 'I'll count' and stay out of the bet.",
        ipucu: "The smartest move",
        basariliSonuc: {
          mesaj: "You counted, laughed, slipped aside unnoticed. You were the healthiest man of the evening.",
        },
        basarisizSonuc: {
          mesaj: "You lost count, everyone got annoyed with you. You didn't die, but your standing took a knock.",
        },
      },
    ],
  },
  komik_dev_kabak: {
    baslik: "The Giant Pumpkin Contest",
    metin:
      "A contest in the market square: whoever brings the heaviest pumpkin wins the prize. There's a monster in your neighbor's field — whether one person can lift it, who knows.",
    secenekler: [
      {
        metin: "Hoist it on your back, carry it to the square.",
        ipucu: "Sweet prize, tender spine",
        basariliSonuc: {
          mesaj: "You came back from the brink of a slipped disc, but you got the pumpkin there and came first.",
        },
        basarisizSonuc: {
          mesaj: "The pumpkin slid off your shoulder, and you under it. You won the title of 'heaviest pumpkin' — but couldn't collect it.",
        },
      },
      {
        metin: "Rent a handcart, carry it that way.",
        ipucu: "A small expense, a sound spine",
        basariliSonuc: {
          mesaj: "You brought it easily on the handcart. You didn't come first, but a healthy third place isn't bad.",
        },
        basarisizSonuc: {
          mesaj: "The handcart's wheel couldn't bear the pumpkin's weight; it burst in the middle of the road.",
        },
      },
    ],
  },
  komik_buz_golu: {
    baslik: "The Frozen Lake",
    metin:
      "Midwinter. The lake looks frozen. The children on the bank are afraid to slide; one is taunting, 'would a grown man be scared?'",
    secenekler: [
      {
        metin: "Run toward the middle of the ice and slide.",
        ipucu: "A brief bit of fun or a very cold ending",
        basariliSonuc: {
          mesaj: "The ice held, you slid to the middle, the children applauded. A legend was born.",
        },
        basarisizSonuc: {
          mesaj: "Right in the middle you heard the crack. That was the last sound you heard.",
        },
      },
      {
        metin: "Take a turn near the bank, in the shallows.",
        ipucu: "Little fun, low chance of a soaking",
        basariliSonuc: {
          mesaj: "You took a few turns by the bank, laughed, went home dry. The children were happy anyway.",
        },
        basarisizSonuc: {
          mesaj: "Even in the shallows the ice broke; you went in to the knee in icy water and ran home shivering.",
        },
      },
    ],
  },
  komik_gulle_yaris: {
    baslik: "The Cannonball Carry",
    metin:
      "The soldiers / townsfolk invented a game: whoever carries the heaviest cannonball the farthest picks the evening meal. Your turn.",
    secenekler: [
      {
        metin: "Hug the biggest one and walk.",
        ipucu: "Honor or a hernia — maybe both",
        basariliSonuc: {
          mesaj: "Your face was crimson, your veins near bursting, but you carried it the farthest. The feast that night was yours.",
        },
        basarisizSonuc: {
          mesaj: "The ball slipped from your hands; where it landed is painful to say. The bleeding didn't stop.",
        },
      },
      {
        metin: "Pick a medium one, play it safe.",
        ipucu: "You won't win, but you'll survive",
        basariliSonuc: {
          mesaj: "A reasonable ball, a reasonable distance. You came second, feet intact.",
        },
        basarisizSonuc: {
          mesaj: "Even the medium one was heavy; you dropped it after a few steps, everyone laughed.",
        },
      },
    ],
  },
  komik_degirmen_kanadi: {
    baslik: "The Windmill's Sail",
    metin:
      "The village mill's sails turn in the wind. Someone dares you to grab a sail and ride it round once. From below it looks easy.",
    secenekler: [
      {
        metin: "Jump onto a sail, hold on tight.",
        ipucu: "One turn of fame or a one-way flight",
        basariliSonuc: {
          mesaj: "You went a full turn round, shouted 'I left my stomach up there' at the top, then came down safe and sound. The village is talking about you.",
        },
        basarisizSonuc: {
          mesaj: "At the top your hands came loose. The landing didn't go as planned.",
        },
      },
      {
        metin: "Touch the bottom tip of the sail, step back.",
        ipucu: "Brave enough, smart enough",
        basariliSonuc: {
          mesaj: "You touched the sail, everyone said 'we saw, we saw.' Brave enough, still in one piece.",
        },
        basarisizSonuc: {
          mesaj: "Your timing was off; the sail struck your hand and flung you to the ground. A sprained wrist, and pride.",
        },
      },
    ],
  },
  komik_yaban_domuz_yaris: {
    baslik: "Racing a Boar",
    metin:
      "At the fair a man has a wild boar on a rope: 'a prize to whoever beats the boar over a hundred paces.' The boar looks bad-tempered.",
    secenekler: [
      {
        metin: "Untie the rope, race the boar.",
        ipucu: "Quick money or a quick boar",
        basariliSonuc: {
          mesaj: "The boar was startled, you ran, you crossed the line first. You took the prize, and the boar bolted into a field.",
        },
        basarisizSonuc: {
          mesaj: "The boar took the race seriously. You didn't. That was the difference.",
        },
      },
      {
        metin: "Bargain with the man, just watch the boar.",
        ipucu: "No prize, but your legs stay attached",
        basariliSonuc: {
          mesaj: "You watched from the side, someone else ran, you laughed. You went home safe and sound.",
        },
        basarisizSonuc: {
          mesaj: "The boar snapped its rope, the crowd scattered; you were among the ones running.",
        },
      },
    ],
  },
  komik_kule_zipla: {
    baslik: "Flight on Cloth Wings",
    metin:
      "An eager inventor has sewn two cloth wings; 'jump from the tower and you'll glide,' he says. The wings look a bit loosely stitched.",
    secenekler: [
      {
        metin: "Strap on the wings, jump from the tower.",
        ipucu: "Enter history or become part of it",
        basariliSonuc: {
          mesaj: "For a few seconds you really did glide — then buried yourself in a haystack. But you flew. Everyone saw you fly.",
        },
        basarisizSonuc: {
          mesaj: "The wings opened, then folded. The haystack wasn't where it should have been this time.",
        },
      },
      {
        metin: "Throw a sack of stones first, test the wings.",
        ipucu: "A scientific approach saves lives",
        basariliSonuc: {
          mesaj: "The sack dropped like a stone. 'Maybe another day,' you said. The inventor was cross, but you're alive.",
        },
        basarisizSonuc: {
          mesaj: "Throwing the sack, you lost your balance and nearly fell yourself. That 'nearly' saved your life.",
        },
      },
    ],
  },
  komik_curuk_kopru: {
    baslik: "The Rotten Bridge",
    metin:
      "Half of the old wooden bridge over the stream is rotten. Instead of the long way round, they say 'if you cross fast it'll hold.'",
    secenekler: [
      {
        metin: "Cross at a run, don't look back.",
        ipucu: "A shortcut or a short life",
        basariliSonuc: {
          mesaj: "The planks creaked, but you were already on the other bank. You saved half a day off the winding road.",
        },
        basarisizSonuc: {
          mesaj: "Right in the middle the planks gave up. The stream was shallow but the rocks were not.",
        },
      },
      {
        metin: "Take the long way round.",
        ipucu: "Boring, but you live",
        basariliSonuc: {
          mesaj: "You walked half a day extra, your feet swelled, but you were the one sitting by the fire that night.",
        },
        basarisizSonuc: {
          mesaj: "You twisted your ankle on the long road; still better than the bridge.",
        },
      },
    ],
  },
  komik_yildirim_tepe: {
    baslik: "The Hill in the Storm",
    metin:
      "Thunder rumbles, everyone runs inside. Someone makes a claim: 'the bravest is whoever stands longest on the highest hill holding an iron rod.'",
    secenekler: [
      {
        metin: "Grab the iron rod, climb the hill.",
        ipucu: "A show of courage or a conductive ending",
        basariliSonuc: {
          mesaj: "The storm passed and you were still standing. They said 'mad but brave'; both were true.",
        },
        basarisizSonuc: {
          mesaj: "The sky accepted your claim. It answered very clearly.",
        },
      },
      {
        metin: "Shelter under the lean-to with everyone else.",
        ipucu: "The most boring, the smartest",
        basariliSonuc: {
          mesaj: "You waited dry under the lean-to. The fools were outside, you were in.",
        },
        basarisizSonuc: {
          mesaj: "The lean-to's tiles dripped, you got a little wet. That was the bill.",
        },
      },
    ],
  },
  komik_buhar_makinesi: {
    baslik: "A Matter of Pressure",
    metin:
      "The new steam boiler's valve is jammed at the factory. The foreman says 'give it one knock with a hammer, it'll open,' but the boiler is hissing dangerously.",
    secenekler: [
      {
        metin: "Take the hammer, give the valve a hard knock.",
        ipucu: "A shortcut fix or a shortcut disaster",
        basariliSonuc: {
          mesaj: "The valve went 'psst' and opened, the pressure dropped. The foreman patted your back, the overseer wrote you a bonus.",
        },
        basarisizSonuc: {
          mesaj: "The boiler gave its answer. Half the factory got the day off.",
        },
      },
      {
        metin: "Put out the fire, let the boiler cool, then check.",
        ipucu: "Slow, but your limbs stay attached",
        basariliSonuc: {
          mesaj: "You lost a shift, but once the boiler cooled the valve cleaned out easily. No one got burned.",
        },
        basarisizSonuc: {
          mesaj: "You lightly scalded your hand putting out the fire; still the right call.",
        },
      },
    ],
  },
};
