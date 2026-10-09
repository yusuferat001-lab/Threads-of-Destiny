import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/komikOlumler.ts — İngilizce çevirileri. */
export const OLAYLAR_KOMIK_OLUM_EN: Record<string, OlayCeviri> = {
  komik_fici_selale: {
    baslik: "Barrel Down the Falls",
    metin:
      "In a tavern bet, no one dares ride an empty wine barrel down the waterfall. All eyes are on you.",
    secenekler: [
      {
        metin: "Get in the barrel; be pushed.",
        basariliSonuc: {
          mesaj: "Soaked but alive; the tavern talked of you for weeks.",
          detay: "Some stupidities pay off.",
        },
        basarisizSonuc: {
          mesaj: "The barrel shattered on the first rock; you were barely breathing.",
        },
      },
      {
        metin: "Decline; order another drink.",
        basariliSonuc: {
          mesaj: "You shrugged; the 'coward' jibes were forgotten by morning.",
        },
        basarisizSonuc: {
          mesaj: "You retreated in a flap; for days you were 'the barrel-fearer'.",
        },
      },
    ],
  },
  komik_en_aci_biber: {
    baslik: "The Hottest Pepper",
    metin:
      "A peddler offers 'dragon's breath' peppers: 'Eat one whole, raw, and the basket is free.' A crowd gathers.",
    secenekler: [
      {
        metin: "Chew, swallow, don't blink.",
        basariliSonuc: {
          mesaj: "Eyes streaming, you swallowed it; the peddler grinned and handed over the basket.",
        },
        basarisizSonuc: {
          mesaj: "You choked and lay in bed for days; the doctor had never seen the like.",
        },
      },
      {
        metin: "Taste a slice; leave the rest.",
        basariliSonuc: {
          mesaj: "One slice was plenty; your mouth burned, but you live.",
        },
        basarisizSonuc: {
          mesaj: "Even one slice was too much; you couldn't eat for two days.",
        },
      },
    ],
  },
  komik_heykel_boyama: {
    baslik: "The Statue in the Square",
    metin:
      "Your friends dare you to paint a moustache on the ruler's statue at night. Ladder and paint ready; guards nearby.",
    secenekler: [
      {
        metin: "Climb up and paint the moustache.",
        basariliSonuc: {
          mesaj: "The moustache was perfect; the city roared and no one betrayed you.",
        },
        basarisizSonuc: {
          mesaj: "The ladder slipped and you hit the stone. 'Almost done,' you mumbled.",
        },
      },
      {
        metin: "Hand over the paint; keep watch.",
        basariliSonuc: {
          mesaj: "The job was done, no one caught; your friend was the hero.",
        },
        basarisizSonuc: {
          mesaj: "The patrol came; you tripped over a cart but weren't recognized.",
        },
      },
    ],
  },
  komik_ari_kovani: {
    baslik: "Free Honey",
    metin:
      "A huge beehive full of honey sits atop the tree. From below, it looks 'worth a few stings.'",
    secenekler: [
      {
        metin: "Climb up and poke the hive.",
        basariliSonuc: {
          mesaj: "A few stings, but you brought down a bucket of honey.",
        },
        basarisizSonuc: {
          mesaj: "The swarm made its view clear; no one saw how you got down.",
        },
      },
      {
        metin: "Tell a beekeeper; ask a share.",
        basariliSonuc: {
          mesaj: "The beekeeper did it right; you got a jar, not one sting.",
        },
        basarisizSonuc: {
          mesaj: "The beekeeper said 'not my hive' and left; the honey stayed up.",
        },
      },
    ],
  },
  komik_nefes_tutma: {
    baslik: "I Can Hold My Breath the Longest",
    metin:
      "At the bathhouse / tavern talk turns to who can hold their breath longest. Bets are down; someone is already counting.",
    secenekler: [
      {
        metin: "Hold your breath; endure.",
        basariliSonuc: {
          mesaj: "Red-faced, you outlasted everyone and took the pot.",
        },
        basarisizSonuc: {
          mesaj: "You held and held... then slumped on the table and stayed down.",
        },
      },
      {
        metin: "Say 'I'll count'; stay out.",
        basariliSonuc: {
          mesaj: "You counted, laughed, slipped away: the soundest man of the evening.",
        },
        basarisizSonuc: {
          mesaj: "You lost count and everyone grumbled; your standing took a knock.",
        },
      },
    ],
  },
  komik_dev_kabak: {
    baslik: "The Giant Pumpkin Contest",
    metin:
      "Market contest: the heaviest pumpkin wins a prize. Your neighbor's field has a monster; can one person lift it?",
    secenekler: [
      {
        metin: "Hoist it on your back.",
        basariliSonuc: {
          mesaj: "Your back barely held, but you came first.",
        },
        basarisizSonuc: {
          mesaj: "The pumpkin slid and pinned you; no prize.",
        },
      },
      {
        metin: "Rent a handcart for it.",
        basariliSonuc: {
          mesaj: "You carried it easily; third place, not bad.",
        },
        basarisizSonuc: {
          mesaj: "The handcart wheel gave way; the pumpkin burst in the road.",
        },
      },
    ],
  },
  komik_buz_golu: {
    baslik: "The Frozen Lake",
    metin:
      "Midwinter; the lake looks frozen. The children fear sliding; one taunts, 'would a grown man be scared?'",
    secenekler: [
      {
        metin: "Run to the middle and slide.",
        basariliSonuc: {
          mesaj: "The ice held; you slid to the middle and the children cheered.",
        },
        basarisizSonuc: {
          mesaj: "Mid-lake you heard the crack. It was the last thing you heard.",
        },
      },
      {
        metin: "Take a turn in the shallows.",
        basariliSonuc: {
          mesaj: "A few turns by the bank, home dry.",
        },
        basarisizSonuc: {
          mesaj: "Even the shallow ice broke; knee-deep, you ran home shivering.",
        },
      },
    ],
  },
  komik_gulle_yaris: {
    baslik: "The Cannonball Carry",
    metin:
      "Soldiers / townsfolk set up a game: whoever carries the heaviest cannonball farthest picks supper. Your turn.",
    secenekler: [
      {
        metin: "Hug the biggest and walk.",
        basariliSonuc: {
          mesaj: "You carried it farthest; the feast was yours.",
        },
        basarisizSonuc: {
          mesaj: "The ball slipped from your hands; the bleeding wouldn't stop.",
        },
      },
      {
        metin: "Pick a medium one; play safe.",
        basariliSonuc: {
          mesaj: "A fair ball, a fair distance: second place, feet intact.",
        },
        basarisizSonuc: {
          mesaj: "Even the medium ball was heavy; you dropped it and all laughed.",
        },
      },
    ],
  },
  komik_degirmen_kanadi: {
    baslik: "The Windmill's Sail",
    metin:
      "The mill's sails turn in the wind. Someone dares you to cling to one for a full turn. It looks easy from below.",
    secenekler: [
      {
        metin: "Jump on a sail; hold tight.",
        basariliSonuc: {
          mesaj: "A full turn, a safe landing; the village is talking about you.",
        },
        basarisizSonuc: {
          mesaj: "Your hands let go at the top; you lay immobile for days.",
        },
      },
      {
        metin: "Touch a sail tip; step back.",
        basariliSonuc: {
          mesaj: "You touched it, everyone saw; brave enough, still in one piece.",
        },
        basarisizSonuc: {
          mesaj: "The sail struck your hand and flung you down; wrist and pride, both twisted.",
        },
      },
    ],
  },
  komik_yaban_domuz_yaris: {
    baslik: "Racing a Boar",
    metin:
      "At the fair a man holds a wild boar on a rope: 'Prize to whoever beats it over a hundred paces.' It looks ill-tempered.",
    secenekler: [
      {
        metin: "Untie it; race the boar.",
        basariliSonuc: {
          mesaj: "You crossed the line first and took the prize; the boar bolted into a field.",
        },
        basarisizSonuc: {
          mesaj: "The boar took the race seriously. You didn't. That was the difference.",
        },
      },
      {
        metin: "Haggle; just watch the boar.",
        basariliSonuc: {
          mesaj: "You watched and laughed from the side; home safe and sound.",
        },
        basarisizSonuc: {
          mesaj: "The boar snapped its rope and scattered the crowd; you ran too.",
        },
      },
    ],
  },
  komik_kule_zipla: {
    baslik: "Flight on Cloth Wings",
    metin:
      "An inventor has sewn two cloth wings: 'Jump from the tower and you'll glide.' They look loosely stitched.",
    secenekler: [
      {
        metin: "Strap on the wings; jump.",
        basariliSonuc: {
          mesaj: "You glided a few seconds, then landed in hay. But you flew!",
        },
        basarisizSonuc: {
          mesaj: "The wings folded; the hay was gone and you hit the ground.",
        },
      },
      {
        metin: "Test with a sack of stones first.",
        basariliSonuc: {
          mesaj: "The sack fell like a stone; the inventor sulked, but you live.",
        },
        basarisizSonuc: {
          mesaj: "You nearly fell throwing the sack; that near miss saved your life.",
        },
      },
    ],
  },
  komik_curuk_kopru: {
    baslik: "The Rotten Bridge",
    metin:
      "Half of the old bridge over the stream is rotten. Instead of the long way, they say 'cross fast and it'll hold.'",
    secenekler: [
      {
        metin: "Run across; don't look back.",
        basariliSonuc: {
          mesaj: "The planks creaked, but you were across; half a day saved.",
        },
        basarisizSonuc: {
          mesaj: "The planks gave way mid-bridge; the stream was shallow, the rocks weren't.",
        },
      },
      {
        metin: "Take the long way.",
        basariliSonuc: {
          mesaj: "Your feet swelled, but by evening you were by the fire.",
        },
        basarisizSonuc: {
          mesaj: "You twisted an ankle on the long road, still better than the bridge.",
        },
      },
    ],
  },
  komik_yildirim_tepe: {
    baslik: "The Hill in the Storm",
    metin:
      "Thunder rolls, everyone flees indoors. Someone claims: 'Whoever stands longest on the hill with an iron rod is bravest.'",
    secenekler: [
      {
        metin: "Grab the iron rod; climb the hill.",
        basariliSonuc: {
          mesaj: "The storm passed and you still stood: 'mad but brave,' they said.",
        },
        basarisizSonuc: {
          mesaj: "Lightning struck; you tumbled off the hill, hair reeking of soot.",
        },
      },
      {
        metin: "Shelter under the lean-to.",
        basariliSonuc: {
          mesaj: "You stayed dry; fools were outside, you were in.",
        },
        basarisizSonuc: {
          mesaj: "The tiles dripped and you got a bit wet. That was the bill.",
        },
      },
    ],
  },
  komik_buhar_makinesi: {
    baslik: "A Matter of Pressure",
    metin:
      "The new boiler's valve is jammed. The foreman says 'knock it with a hammer,' but the boiler hisses dangerously.",
    secenekler: [
      {
        metin: "Take the hammer; strike the valve.",
        basariliSonuc: {
          mesaj: "The valve opened, pressure fell; the overseer wrote you a bonus.",
        },
        basarisizSonuc: {
          mesaj: "The boiler answered; half the factory got the day off.",
        },
      },
      {
        metin: "Douse the fire; check once cool.",
        basariliSonuc: {
          mesaj: "A shift lost, but the valve cleared; no one burned.",
        },
        basarisizSonuc: {
          mesaj: "You lightly scalded your hand; still the right call.",
        },
      },
    ],
  },
};
