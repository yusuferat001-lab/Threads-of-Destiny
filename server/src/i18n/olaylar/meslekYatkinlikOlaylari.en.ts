import type { OlayCeviri } from "./index";

/** server/src/data/olaylar/meslekYatkinlikOlaylari.ts — İngilizce çevirileri. */
export const OLAYLAR_MESLEK_YATKINLIK_EN: Record<string, OlayCeviri> = {
  myk_asker_ordugah_meydan_okumasi: {
    baslik: "A Challenge",
    metin:
      "Camp boredom sparked a challenge: prove your skill with a blade before everyone. The crowd is watching.",
    secenekler: [
      {
        metin: "Floor your rival with a masterful blow.",
        kilitAciklamasi: "Not skilled enough; try something safer.",
        basariliSonuc: {
          mesaj: "You beat your rival before the crowd; your name was talked about for a while.",
        },
        basarisizSonuc: {
          mesaj: "The move landed but your timing was off; you hit the ground hard.",
        },
      },
      {
        metin: "Play safe, stay defensive.",
        basariliSonuc: {
          mesaj: "You impressed no one, but gave no one a laugh either.",
        },
        basarisizSonuc: {
          mesaj: "Even defending was a struggle; you took a few hard hits.",
        },
      },
      {
        metin: "Stay out of it.",
        basariliSonuc: {
          mesaj: "You stepped aside. No one said anything, but you knew.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_tuccar_ozel_teklif: {
    baslik: "For You Alone",
    metin:
      "Your sharp eye got noticed. A stranger, a trader, offers a low-risk, lucrative partnership, a chance not given to just anyone.",
    secenekler: [
      {
        metin: "Accept, put in your capital.",
        basariliSonuc: {
          mesaj: "Your instinct was right; the partnership paid off better than expected.",
        },
        basarisizSonuc: {
          mesaj: "The partnership wasn't so bright; part of your capital was lost.",
        },
      },
      {
        metin: "Politely decline.",
        basariliSonuc: {
          mesaj: "You turned it down, wondering \"what if\", but kept your money.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_din_gunahkarin_yuku: {
    baslik: "The Congregation's Doubt",
    metin:
      "Your sermons don't suit you; your inner contradictions spill from the pulpit. An old parishioner asks: 'Do you truly believe, my child?'",
    secenekler: [
      {
        metin: "Be honest, share your doubts.",
        basariliSonuc: {
          mesaj: "Your honesty surprised him, but won his respect.",
        },
        basarisizSonuc: {
          mesaj: "Your words spread through the congregation; the looks changed.",
        },
      },
      {
        metin: "Cling to your role, act devout.",
        basariliSonuc: {
          mesaj: "You were convincing, he left persuaded. You feel a bit more hollow.",
        },
        basarisizSonuc: {
          mesaj: "Your insincerity showed; he shook his head and left.",
        },
      },
    ],
  },

  myk_zanaatkar_ustalik_sinavi: {
    baslik: "A Test of Mastery",
    metin:
      "The guild left an unusual order: besides an ordinary repair, a chance to try an entirely new technique. Succeed and your name lives on.",
    secenekler: [
      {
        metin: "Try inventing a new technique.",
        kilitAciklamasi: "Your hand isn't skilled enough yet.",
        basariliSonuc: {
          mesaj: "It worked! The guild's masters talk of your invention.",
        },
        basarisizSonuc: {
          mesaj: "You wasted material; the technique isn't mature. No one blamed you.",
        },
      },
      {
        metin: "Play safe, do the ordinary repair.",
        basariliSonuc: {
          mesaj: "The job went smoothly; no one disappointed, no one amazed.",
        },
        basarisizSonuc: {
          mesaj: "Even the simple job hit a snag; you paid the guild small compensation.",
        },
      },
    ],
  },

  myk_asker_muhafiz_teklifi: {
    baslik: "An Offer to Join the King's Personal Guard",
    metin:
      "News of your battlefield skill reached the ruler. The court invites you to a trial for the personal guard.",
    secenekler: [
      {
        metin: "Accept, take the trial.",
        basariliSonuc: {
          mesaj: "You passed with ease; you now stand at the ruler's side.",
        },
        basarisizSonuc: {
          mesaj: "You failed; the court sent you politely back, and the camp gossiped.",
        },
      },
      {
        metin: "Politely decline, stay with your army.",
        basariliSonuc: {
          mesaj: "Your refusal made you more valued among your comrades.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_asker_efsanevi_duello: {
    baslik: "An Invitation to a Legendary Duel",
    metin:
      "A rival champion who heard of your fame challenges you to a single-strike duel before everyone.",
    secenekler: [
      {
        metin: "Accept the challenge.",
        basariliSonuc: {
          mesaj: "Your blade flashed, your rival knelt; your name became legend.",
        },
        basarisizSonuc: {
          mesaj: "You left badly wounded; news of the defeat spread through the camp.",
        },
      },
      {
        metin: "Decline with honor.",
        basariliSonuc: {
          mesaj: "You declined; some will call you a coward, but you acted wisely.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_tuccar_bas_tedarikci: {
    baslik: "An Offer to Become the Kingdom's Chief Supplier",
    metin:
      "The court steward heard of your trading instinct. He summons you to a major meeting to become the kingdom's chief supplier.",
    secenekler: [
      {
        metin: "Sign the big contract.",
        basariliSonuc: {
          mesaj: "Signed; both your coffers and your name grew.",
        },
        basarisizSonuc: {
          mesaj: "The terms were harsher than they looked; the deal cost you.",
        },
      },
      {
        metin: "Avoid risk, keep small deals.",
        basariliSonuc: {
          mesaj: "You carried on with smaller, safer business.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_tuccar_rakip_kiskancligi: {
    baslik: "The Envy of Rivals",
    metin:
      "Your success drew eyes. Rival traders spread dark rumors about you and try to sabotage your goods.",
    secenekler: [
      {
        metin: "Gather proof, defend your name.",
        basariliSonuc: {
          mesaj: "You found the source; once truth came out, everyone sided with you.",
        },
        basarisizSonuc: {
          mesaj: "No proof found; the rumors grew and hurt your business a while.",
        },
      },
      {
        metin: "Ignore it, mind your work.",
        basariliSonuc: {
          mesaj: "You ignored the rumors; some still believed, but they faded.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_din_kutsal_gorev: {
    baslik: "Chosen for a Holy Task",
    metin:
      "Your superiors, knowing your deep faith, chose you to guard a holy relic. A rare honor in the congregation.",
    secenekler: [
      {
        metin: "Accept the task.",
        basariliSonuc: {
          mesaj: "You completed it; the congregation now holds you in great respect.",
        },
        basarisizSonuc: {
          mesaj: "You made a grave mistake in the task; it shook you deeply.",
        },
      },
      {
        metin: "Humbly decline, unworthy.",
        basariliSonuc: {
          mesaj: "Your humility won quiet admiration in the congregation.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_din_mucize_soylentisi: {
    baslik: "Rumors of a Miracle",
    metin:
      "A rumor spreads of someone healed or at peace through your hands. Hopeful crowds gather at your door.",
    secenekler: [
      {
        metin: "Confirm the rumor, receive them.",
        basariliSonuc: {
          mesaj: "The rumor made you the region's most respected name.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't meet expectations; disappointment spread.",
        },
      },
      {
        metin: "Deny it, stay humble.",
        basariliSonuc: {
          mesaj: "You denied the miracle; some still believed, but you kept your peace.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_zanaatkar_saray_daveti: {
    baslik: "An Invitation to Become the Court's Chief Craftsman",
    metin:
      "Word of your craft reached the court. You're commissioned to make a magnificent piece for the palace.",
    secenekler: [
      {
        metin: "Accept, make your best work.",
        basariliSonuc: {
          mesaj: "Your piece won admiration at court; the nobility now speak your name.",
        },
        basarisizSonuc: {
          mesaj: "The piece fell short; the court didn't hide its disappointment.",
        },
      },
      {
        metin: "Avoid risk, keep ordinary orders.",
        basariliSonuc: {
          mesaj: "You carried on with smaller, safer orders.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },

  myk_zanaatkar_taklitciler: {
    baslik: "Imitators and Frauds",
    metin:
      "As your name grew, frauds began selling copies under your signature. Customers are confused.",
    secenekler: [
      {
        metin: "Hunt them down, expose them.",
        basariliSonuc: {
          mesaj: "You exposed the frauds; true craft was talked of again.",
        },
        basarisizSonuc: {
          mesaj: "You couldn't find them; your reputation suffered a while.",
        },
      },
      {
        metin: "Add a distinctive seal to your work.",
        basariliSonuc: {
          mesaj: "The new seal set your work apart; small cost, it worked.",
        },
        basarisizSonuc: { mesaj: "Not used." },
      },
    ],
  },
};
